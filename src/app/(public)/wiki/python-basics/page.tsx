'use client';

import React, { useState, useRef, useEffect } from 'react';
import { pythonCourseData, Chapter } from '@/data/python-course';
import { Play, BookOpen, Code, Clock, ChevronRight, Terminal } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import InteractiveTerminal from '@/components/wiki/InteractiveTerminal';

export default function PythonCoursePage() {
    const [activeChapter, setActiveChapter] = useState<Chapter>(pythonCourseData[0]);
    const iframeRef = useRef<HTMLIFrameElement>(null);

    const handleChapterClick = (chapter: Chapter) => {
        setActiveChapter(chapter);
        // Seek video using YouTube Iframe API postMessage
        if (iframeRef.current && iframeRef.current.contentWindow) {
            iframeRef.current.contentWindow.postMessage(
                JSON.stringify({
                    event: 'command',
                    func: 'seekTo',
                    args: [chapter.seconds, true]
                }),
                '*'
            );
            iframeRef.current.contentWindow.postMessage(
                JSON.stringify({
                    event: 'command',
                    func: 'playVideo',
                    args: []
                }),
                '*'
            );
        }
    };

    return (
        <main className="min-h-screen bg-[#0a0a0a] text-white pt-24 pb-10">
            <div className="max-w-[1600px] mx-auto px-4 lg:px-8">
                {/* Header */}
                <div className="mb-8 border-b border-white/10 pb-6">
                    <Link
                        href="/wiki"
                        className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-white mb-4 transition-colors group"
                    >
                        <ChevronRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
                        Back to Wiki
                    </Link>
                    <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-4">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-yellow-400">
                            Python
                        </span>{' '}
                        Programming Course
                    </h1>
                    <p className="text-neutral-400 max-w-3xl text-lg">
                        Làm chủ ngôn ngữ lập trình phổ biến nhất thế giới. Từ cơ bản đến nâng cao với ví dụ thực tế.
                    </p>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                    {/* Left Column: Video & Content */}
                    <div className="xl:col-span-2 space-y-8">
                        {/* Video Player */}
                        <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black">
                            <iframe
                                ref={iframeRef}
                                className="w-full h-full"
                                src={`https://www.youtube.com/embed/cZQ6m3W4OU4?enablejsapi=1&rel=0&modestbranding=1`}
                                title="Python Tutorial"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div>

                        {/* Content Detail */}
                        <motion.div
                            key={activeChapter.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className="bg-neutral-900/50 border border-white/10 rounded-2xl p-6 md:p-8"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-3 bg-blue-500/10 rounded-xl">
                                    <BookOpen className="w-6 h-6 text-blue-400" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-white">{activeChapter.title}</h2>
                                    <div className="flex items-center gap-2 text-sm text-neutral-400 mt-1">
                                        <Clock className="w-4 h-4" />
                                        <span>Timestamp: {activeChapter.time}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="prose prose-invert max-w-none">
                                <p className="text-lg text-neutral-300 leading-relaxed mb-6">
                                    {activeChapter.mainContent}
                                </p>

                                {activeChapter.keyPoints && (
                                    <div className="mb-8">
                                        <h3 className="text-sm uppercase tracking-wide text-neutral-500 font-bold mb-3">Key Takeaways</h3>
                                        <ul className="space-y-2">
                                            {activeChapter.keyPoints.map((point, idx) => (
                                                <li key={idx} className="flex items-start gap-2 text-neutral-300">
                                                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                                                    {point}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {activeChapter.code && (
                                    <>
                                        <div className="mt-8 rounded-xl overflow-hidden border border-white/10 bg-[#1e1e1e]">
                                            <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/5">
                                                <div className="flex items-center gap-2">
                                                    <Terminal className="w-4 h-4 text-neutral-400" />
                                                    <span className="text-xs font-mono text-neutral-400">example.py</span>
                                                </div>
                                                <div className="flex gap-1.5">
                                                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/20" />
                                                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20" />
                                                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/20" />
                                                </div>
                                            </div>
                                            <div className="p-6 overflow-x-auto">
                                                <pre className="font-mono text-sm leading-relaxed">
                                                    <code className="text-blue-100">{activeChapter.code}</code>
                                                </pre>
                                            </div>
                                        </div>
                                        <div className="mt-6">
                                            <h4 className="text-sm uppercase tracking-wide text-neutral-500 font-bold mb-3 flex items-center gap-2">
                                                <Terminal className="w-4 h-4" />
                                                Interactive Output
                                            </h4>
                                            <InteractiveTerminal
                                                title="python3"
                                                initialCode={activeChapter.code}
                                                welcomeMessage="Python 3.10.0 Interactive Shell. Type code to run."
                                            />
                                        </div>
                                    </>
                                )}
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column: Timeline */}
                    <div className="xl:col-span-1">
                        <div className="bg-neutral-900/50 border border-white/10 rounded-2xl overflow-hidden sticky top-24 max-h-[calc(100vh-120px)] flex flex-col">
                            <div className="p-6 border-b border-white/10 bg-neutral-900/80 backdrop-blur-sm z-10">
                                <h3 className="font-bold text-lg text-white flex items-center gap-2">
                                    <Play className="w-5 h-5 text-purple-400" />
                                    Course Timeline
                                </h3>
                                <p className="text-xs text-neutral-500 mt-1">
                                    {pythonCourseData.length} lessons • 4 hours 20 mins
                                </p>
                            </div>

                            <div className="overflow-y-auto p-2 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10 hover:scrollbar-thumb-white/20">
                                <div className="space-y-1">
                                    {pythonCourseData.map((chapter) => {
                                        const isActive = activeChapter.id === chapter.id;
                                        return (
                                            <button
                                                key={chapter.id}
                                                onClick={() => handleChapterClick(chapter)}
                                                className={`w-full text-left p-4 rounded-xl transition-all duration-200 group relative border ${isActive
                                                    ? 'bg-white/10 border-purple-500/50 shadow-lg shadow-purple-900/20'
                                                    : 'hover:bg-white/5 border-transparent hover:border-white/5'
                                                    }`}
                                            >
                                                <div className="flex items-start gap-4 uppercase">
                                                    <span className={`text-xs font-mono mt-0.5 ${isActive ? 'text-purple-400 font-bold' : 'text-neutral-500 group-hover:text-neutral-400'}`}>
                                                        {chapter.time}
                                                    </span>
                                                    <div>
                                                        <h4 className={`text-sm font-medium leading-snug mb-0.5 ${isActive ? 'text-white' : 'text-neutral-300 group-hover:text-white'}`}>
                                                            {chapter.title}
                                                        </h4>
                                                    </div>
                                                </div>
                                                {isActive && (
                                                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-purple-500 rounded-r-full" />
                                                )}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
