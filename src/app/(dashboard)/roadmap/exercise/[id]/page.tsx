"use client";

import { useState } from "react";
import { Play, Send, RotateCcw, CheckCircle2, XCircle } from "lucide-react";

export default function ExercisePage() {
  const [code, setCode] = useState("// Viết code của bạn ở đây\nfunction solution() {\n  return true;\n}");
  const [output, setOutput] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  const handleRun = () => {
    setIsRunning(true);
    setOutput(null);
    
    // Mock execution
    setTimeout(() => {
      setIsRunning(false);
      setOutput("Test Case 1: Passed\nTest Case 2: Passed\nAll tests passed!");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      {/* Header */}
      <div className="h-16 border-b border-gray-800 flex items-center justify-between px-6 bg-gray-900">
        <h1 className="font-bold">Bài tập: Tính tổng hai số</h1>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setCode("// Reset code")}
            className="p-2 hover:bg-gray-800 rounded-lg text-gray-400"
            title="Reset Code"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
          <button 
            onClick={handleRun}
            disabled={isRunning}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors"
          >
            {isRunning ? <span className="animate-spin">⌛</span> : <Play className="w-4 h-4" />}
            Chạy thử
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg font-medium transition-colors">
            <Send className="w-4 h-4" />
            Nộp bài
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Problem Description */}
        <div className="w-1/3 border-r border-gray-800 bg-gray-900 p-6 overflow-y-auto">
          <h2 className="text-xl font-bold mb-4">Mô tả</h2>
          <div className="prose prose-invert">
            <p>Viết hàm <code>sum(a, b)</code> trả về tổng của hai số nguyên a và b.</p>
            <h3>Ví dụ:</h3>
            <pre className="bg-gray-800 p-3 rounded-lg">
              Input: a = 1, b = 2{"\n"}
              Output: 3
            </pre>
          </div>
        </div>

        {/* Code Editor Area */}
        <div className="flex-1 flex flex-col bg-[#1e1e1e]">
          <div className="flex-1 relative">
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-full bg-transparent text-gray-300 font-mono p-4 resize-none focus:outline-none"
              spellCheck={false}
            />
          </div>

          {/* Output Console */}
          <div className="h-1/3 border-t border-gray-800 bg-gray-900 p-4 font-mono text-sm overflow-y-auto">
            <div className="flex items-center gap-2 text-gray-400 mb-2">
              <span>Console Output</span>
            </div>
            {output ? (
              <pre className="text-green-400">{output}</pre>
            ) : (
              <span className="text-gray-600 italic">Kết quả chạy code sẽ hiện ở đây...</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
