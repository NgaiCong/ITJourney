'use client';

import React, { useState, useRef } from 'react';
import { cppCourseData, CppChapter } from '@/data/cpp-course';
import { Play, BookOpen, Code, Clock, ChevronRight, Terminal } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

export default function CppCoursePage() {
    const [activeChapter, setActiveChapter] = useState<CppChapter>(cppCourseData[0]);
    const iframeRef = useRef<HTMLIFrameElement>(null);

    const handleChapterClick = (chapter: CppChapter) => {
        setActiveChapter(chapter);
        if (iframeRef.current && iframeRef.current.contentWindow) {
            // For playlist, we use playVideoAt(index)
            iframeRef.current.contentWindow.postMessage(
                JSON.stringify({
                    event: 'command',
                    func: 'playVideoAt',
                    args: [chapter.videoIndex]
                }),
                '*'
            );
        }
    };

    return (
        <main className="min-h-screen bg-[#0a0a0a] text-white pt-24 pb-10">
            <div className="max-w-[1600px] mx-auto px-4 lg:px-8">
                {/* Header */}
                <div className="mb-12 border-b border-white/10 pb-8 relative">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-[100px] -z-10 pointer-events-none" />

                    <Link
                        href="/wiki"
                        className="inline-flex items-center gap-2 text-sm font-medium text-neutral-400 hover:text-white mb-6 transition-colors group px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/5"
                    >
                        <ChevronRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
                        Back to Wiki Library
                    </Link>

                    <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6 leading-tight">
                        <span className="bg-clip-text text-transparent bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-cyan-200 via-cyan-400 to-blue-500 drop-shadow-[0_0_30px_rgba(34,211,238,0.3)]">
                            C++ Programming
                        </span>
                        <br />
                        <span className="text-white">Mastery Course</span>
                    </h1>

                    <p className="text-neutral-400 max-w-3xl text-xl leading-relaxed font-light">
                        Chinh phục ngôn ngữ lập trình hiệu năng cao. Từ cú pháp cơ bản đến kỹ thuật tối ưu bộ nhớ, OOP và tư duy hệ thống.
                    </p>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                    {/* Left Column: Video & Content */}
                    <div className="xl:col-span-2 space-y-8">
                        {/* Video Player */}
                        <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] bg-black group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 opacity-20 blur-xl group-hover:opacity-30 transition-opacity duration-1000" />
                            <iframe
                                ref={iframeRef}
                                className="w-full h-full relative z-10"
                                src={`https://www.youtube.com/embed/5vLkWRF-dpE?enablejsapi=1&rel=0&modestbranding=1&list=PLPt6-BtUI22rZ-lB276VBY85mUNeIFJf5`}
                                title="C++ Tutorial"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div>

                        {/* Content Detail */}
                        <motion.div
                            key={activeChapter.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                            className="bg-[#111]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px]" />

                            <div className="flex items-center gap-4 mb-8 relative z-10">
                                <div className="p-4 bg-gradient-to-br from-cyan-500/20 to-blue-500/10 rounded-2xl border border-cyan-500/20 shadow-lg shadow-cyan-900/20">
                                    <BookOpen className="w-8 h-8 text-cyan-400" />
                                </div>
                                <div>
                                    <h2 className="text-3xl font-bold text-white tracking-tight">{activeChapter.title}</h2>
                                    <div className="flex items-center gap-3 text-sm text-neutral-400 mt-2 font-mono">
                                        <div className="px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-bold">
                                            {activeChapter.time}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="prose prose-invert max-w-none relative z-10">
                                <p className="text-lg text-neutral-300 leading-relaxed mb-8">
                                    {activeChapter.mainContent}
                                </p>

                                {activeChapter.keyPoints && (
                                    <div className="mb-10 p-6 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/5">
                                        <h3 className="text-sm uppercase tracking-wider text-cyan-400 font-bold mb-4 flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
                                            Key Takeaways
                                        </h3>
                                        <ul className="grid md:grid-cols-2 gap-3">
                                            {activeChapter.keyPoints.map((point, idx) => (
                                                <li key={idx} className="flex items-center gap-3 text-neutral-300 bg-black/20 p-3 rounded-lg border border-white/5 hover:border-cyan-500/30 transition-colors">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-600 shrink-0" />
                                                    {point}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {activeChapter.code && (
                                    <div className="mt-10 rounded-2xl overflow-hidden border border-white/10 bg-[#0d0d0d] shadow-2xl">
                                        <div className="flex items-center justify-between px-5 py-3 bg-white/5 border-b border-white/5">
                                            <div className="flex items-center gap-3">
                                                <div className="p-1.5 bg-blue-500/20 rounded-md">
                                                    <Code className="w-4 h-4 text-blue-400" />
                                                </div>
                                                <span className="text-xs font-mono text-neutral-400 font-bold">example.cpp</span>
                                            </div>
                                            <div className="flex gap-2">
                                                <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/30" />
                                                <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/30" />
                                                <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/30" />
                                            </div>
                                        </div>
                                        <div className="p-6 md:p-8 overflow-x-auto custom-scrollbar">
                                            <pre className="font-mono text-sm leading-relaxed">
                                                <code className="text-cyan-100/90">{activeChapter.code}</code>
                                            </pre>
                                        </div>
                                    </div>
                                )}

                                {/* Note: C++ cannot be executed in browser like Python */}
                                {activeChapter.code && (
                                    <div className="mt-4 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
                                        <p className="text-sm text-amber-200/80">
                                            💡 <strong>Lưu ý:</strong> Để chạy code C++, bạn cần cài đặt Visual Studio hoặc GCC trên máy tính.
                                            Copy code ở trên và paste vào IDE để thử nghiệm.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column: Timeline / Playlist */}
                    <div className="xl:col-span-1">
                        <div className="bg-neutral-900/50 border border-white/10 rounded-2xl overflow-hidden sticky top-24 max-h-[calc(100vh-120px)] flex flex-col">
                            <div className="p-6 border-b border-white/10 bg-neutral-900/80 backdrop-blur-sm z-10">
                                <h3 className="font-bold text-lg text-white flex items-center gap-2">
                                    <Play className="w-5 h-5 text-cyan-400" />
                                    Danh sách bài học
                                </h3>
                                <p className="text-xs text-neutral-500 mt-1">
                                    {cppCourseData.length} bài học • Series C++ 2023
                                </p>
                            </div>

                            <div className="overflow-y-auto p-2 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10 hover:scrollbar-thumb-white/20">
                                <div className="space-y-1">
                                    {cppCourseData.map((chapter) => {
                                        const isActive = activeChapter.id === chapter.id;
                                        return (
                                            <button
                                                key={chapter.id}
                                                onClick={() => handleChapterClick(chapter)}
                                                className={`w-full text-left p-4 rounded-xl transition-all duration-200 group relative border ${isActive
                                                    ? 'bg-white/10 border-cyan-500/50 shadow-lg shadow-cyan-900/20'
                                                    : 'hover:bg-white/5 border-transparent hover:border-white/5'
                                                    }`}
                                            >
                                                <div className="flex items-start gap-4 uppercase">
                                                    <span className={`text-xs font-mono mt-0.5 ${isActive ? 'text-cyan-400 font-bold' : 'text-neutral-500 group-hover:text-neutral-400'}`}>
                                                        {chapter.time}
                                                    </span>
                                                    <div>
                                                        <h4 className={`text-sm font-medium leading-snug mb-0.5 ${isActive ? 'text-white' : 'text-neutral-300 group-hover:text-white'}`}>
                                                            {chapter.title}
                                                        </h4>
                                                    </div>
                                                </div>
                                                {isActive && (
                                                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-cyan-500 rounded-r-full" />
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
