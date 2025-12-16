'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Terminal, Play, RotateCcw, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface TerminalLine {
    type: 'command' | 'output' | 'error' | 'system' | 'input-prompt';
    content: string;
}

interface InteractiveTerminalProps {
    title?: string;
    initialCode?: string;
}

declare global {
    interface Window {
        loadPyodide: (config?: { indexURL?: string }) => Promise<any>;
    }
}

const InteractiveTerminal: React.FC<InteractiveTerminalProps> = ({
    title = 'python3',
    initialCode
}) => {
    const [input, setInput] = useState('');
    const [history, setHistory] = useState<TerminalLine[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isRunning, setIsRunning] = useState(false);
    const [isWaitingForInput, setIsWaitingForInput] = useState(false);
    const [pyodideReady, setPyodideReady] = useState(false);
    const [currentPrompt, setCurrentPrompt] = useState('');

    const scrollRef = useRef<HTMLDivElement>(null);
    const pyodideRef = useRef<any>(null);
    const inputResolver = useRef<((value: string) => void) | null>(null);
    const inputQueue = useRef<string[]>([]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [history]);

    const addToHistory = useCallback((type: TerminalLine['type'], content: string) => {
        setHistory(prev => [...prev, { type, content }]);
    }, []);

    const loadPyodideRuntime = useCallback(async () => {
        if (pyodideRef.current) {
            setPyodideReady(true);
            return pyodideRef.current;
        }

        setIsLoading(true);
        addToHistory('system', 'Đang tải Python... (lần đầu mất vài giây)');

        try {
            if (!window.loadPyodide) {
                await new Promise<void>((resolve, reject) => {
                    const script = document.createElement('script');
                    script.src = 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/pyodide.js';
                    script.onload = () => resolve();
                    script.onerror = () => reject(new Error('Failed to load Pyodide'));
                    document.head.appendChild(script);
                });
            }

            const pyodide = await window.loadPyodide({
                indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/'
            });

            pyodideRef.current = pyodide;
            setPyodideReady(true);
            addToHistory('system', 'Python 3.11 sẵn sàng!');
            setIsLoading(false);
            return pyodide;
        } catch (error) {
            addToHistory('error', 'Không thể tải Python. Vui lòng refresh trang.');
            setIsLoading(false);
            throw error;
        }
    }, [addToHistory]);

    const runScript = useCallback(async () => {
        if (!initialCode || isRunning) return;

        setIsRunning(true);
        setHistory([{ type: 'system', content: '--- Đang chạy ví dụ ---' }]);
        inputQueue.current = [];

        try {
            const pyodide = await loadPyodideRuntime();

            // Set up stdout
            pyodide.setStdout({
                batched: (text: string) => {
                    addToHistory('output', text);
                }
            });

            pyodide.setStderr({
                batched: (text: string) => {
                    addToHistory('error', text);
                }
            });

            // Find all input() calls and collect prompts
            // Handles: var = input("..."), var = float(input("...")), var = int(input("..."))
            const inputRegex = /(\w+)\s*=\s*(?:float|int)?\s*\(?\s*input\((['"])(.*?)\2\)/g;
            const inputs: { varName: string; prompt: string; wrapper?: string }[] = [];
            let match;
            while ((match = inputRegex.exec(initialCode)) !== null) {
                inputs.push({ varName: match[1], prompt: match[3] });
            }

            // Collect all user inputs first
            for (const { varName, prompt } of inputs) {
                addToHistory('output', prompt);
                setCurrentPrompt(prompt);
                setIsWaitingForInput(true);

                const userValue = await new Promise<string>(resolve => {
                    inputResolver.current = resolve;
                });

                addToHistory('command', userValue);
                setIsWaitingForInput(false);

                // Set variable in Python globals
                pyodide.globals.set(varName, userValue);
            }

            // Now execute the code with input() replaced to use globals
            // Replace all input() calls with variable references
            let modifiedCode = initialCode.replace(
                /(\w+)\s*=\s*input\((['"])(.*?)\2\)/g,
                (match, varName) => `# ${varName} đã được nhập`
            );

            // Strip comments for cleaner execution but keep structure
            // Actually, let's just execute the original code structure
            // We need to redefine input() to return from our collected values

            // Build a simple input replacement that uses collected values
            const inputValuesSetup = inputs.map((inp, idx) =>
                `__input_values__["${inp.varName}"] = ${JSON.stringify(pyodide.globals.get(inp.varName))}`
            ).join('\n');

            const setupCode = `
__input_values__ = {}
${inputValuesSetup}
__input_counter__ = [0]
def __custom_input__(prompt=""):
    keys = list(__input_values__.keys())
    if __input_counter__[0] < len(keys):
        key = keys[__input_counter__[0]]
        __input_counter__[0] += 1
        return __input_values__[key]
    return ""
`;

            // Replace input() with __custom_input__() in user code
            const userCodeModified = initialCode.replace(
                /input\(/g,
                '__custom_input__('
            );

            const fullCode = setupCode + '\n' + userCodeModified;

            try {
                await pyodide.runPythonAsync(fullCode);
            } catch (error: any) {
                // Clean up error message
                const errorMsg = error.message || String(error);
                // Only show the relevant part
                const lines = errorMsg.split('\n');
                const relevantError = lines.filter((l: string) =>
                    !l.includes('_pyodide') &&
                    !l.includes('__custom_input__') &&
                    !l.includes('File "<exec>"')
                ).join('\n') || errorMsg;
                addToHistory('error', relevantError);
            }

            addToHistory('system', '--- Hoàn thành ---');
        } catch (error: any) {
            addToHistory('error', `Error: ${error.message || error}`);
        } finally {
            setIsRunning(false);
            setCurrentPrompt('');
        }
    }, [initialCode, isRunning, loadPyodideRuntime, addToHistory]);

    useEffect(() => {
        if (initialCode) {
            const timer = setTimeout(() => {
                runScript();
            }, 500);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            if (isWaitingForInput && inputResolver.current) {
                inputResolver.current(input);
                inputResolver.current = null;
                setInput('');
            }
        }
    };

    return (
        <div className="w-full rounded-xl overflow-hidden bg-[#1e1e1e] border border-white/10 shadow-2xl font-mono text-sm my-6 group">
            <div className="flex items-center justify-between px-4 py-2 bg-[#2d2d2d] border-b border-white/5">
                <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500/80" />
                        <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                        <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                    </div>
                    <div className="ml-3 flex items-center gap-2 text-neutral-400 text-xs font-medium">
                        <Terminal className="w-3.5 h-3.5" />
                        {title}
                        {pyodideReady && <span className="text-emerald-500 text-[10px]">● Ready</span>}
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={runScript}
                        disabled={isRunning || isLoading}
                        className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold transition-all ${isRunning || isLoading
                            ? 'bg-neutral-700 text-neutral-500 cursor-not-allowed'
                            : 'bg-green-600 hover:bg-green-500 text-white shadow-lg shadow-green-900/20'
                            }`}
                    >
                        {isLoading ? (
                            <Loader2 className="w-3 h-3 animate-spin" />
                        ) : (
                            <Play className="w-3 h-3 fill-current" />
                        )}
                        {isLoading ? 'Loading...' : 'Run Code'}
                    </button>
                    <button
                        onClick={() => setHistory([])}
                        className="p-1.5 rounded-md hover:bg-white/5 text-neutral-500 hover:text-white transition-colors"
                        title="Clear Terminal"
                    >
                        <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                </div>
            </div>

            <div
                ref={scrollRef}
                className="h-[300px] overflow-y-auto p-4 space-y-1 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10"
                onClick={() => document.getElementById('terminal-input')?.focus()}
            >
                <AnimatePresence initial={false}>
                    {history.map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -5 }}
                            animate={{ opacity: 1, x: 0 }}
                            className={`${item.type === 'error' ? 'text-red-400' :
                                item.type === 'command' ? 'text-white font-bold mt-2' :
                                    item.type === 'system' ? 'text-neutral-500 italic my-2' :
                                        'text-emerald-400/90'
                                } whitespace-pre-wrap leading-relaxed break-all`}
                        >
                            {item.type === 'command' && <span className="text-blue-400 mr-2">{'>'}</span>}
                            {item.content}
                        </motion.div>
                    ))}
                </AnimatePresence>

                {isWaitingForInput && (
                    <div className="flex items-center gap-2 mt-2">
                        <span className="text-yellow-400 font-bold">{'?'}</span>
                        <input
                            id="terminal-input"
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            autoComplete="off"
                            className="flex-1 bg-transparent border-none outline-none text-white placeholder-neutral-700 caret-indigo-500"
                            placeholder="Nhập câu trả lời và nhấn Enter..."
                            autoFocus
                        />
                    </div>
                )}
                <div className="h-1" />
            </div>
        </div>
    );
};

export default InteractiveTerminal;
