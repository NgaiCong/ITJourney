'use client';

import React, { useState } from 'react';
import { dsaCourseData, DsaModule } from '@/data/dsa-course';
import { Play, Database, Server, ChevronRight, Layers, Workflow, Network, Code, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function DsaCoursePage() {
    const [activeModule, setActiveModule] = useState<DsaModule>(dsaCourseData[0]);
    const [activeVideoIndex, setActiveVideoIndex] = useState<number>(0);
    const [viewMode, setViewMode] = useState<'modules' | 'videos'>('modules');

    const handleModuleClick = (module: DsaModule) => {
        setActiveModule(module);
        setActiveVideoIndex(0); // Reset to first video (which might not be index 0 if mapped differently, but usually safe to start playing)
        // Better: Set to the index of the first video in the sorted list?
        // But our state is 'activeVideoIndex' which is the YOUTUBE INDEX.
        // So we should set it to module.videos[0].index if exists.
        if (module.videos && module.videos.length > 0) {
            setActiveVideoIndex(module.videos[0].index);
            setViewMode('videos');
        } else {
            setActiveVideoIndex(0);
            setViewMode('modules');
        }
    };

    const handleVideoClick = (index: number) => {
        setActiveVideoIndex(index);
    };

    // Determine current video content if available
    // We need to find the video object that matches the activeVideoIndex (YouTube Index)
    const currentVideo = activeModule.videos?.find(v => v.index === activeVideoIndex);

    // Calculate display index (1-based) based on the sorted array order
    const currentVideoDisplayIndex = activeModule.videos
        ? activeModule.videos.findIndex(v => v.index === activeVideoIndex) + 1
        : 0;

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
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400">
                            Mastering
                        </span>{' '}
                        DSA
                    </h1>
                    <p className="text-neutral-400 max-w-3xl text-lg">
                        Nền tảng quan trọng nhất của mọi kỹ sư phần mềm. Học về thuật toán tối ưu và cấu trúc dữ liệu hiệu quả.
                    </p>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                    {/* Left Column: Video & Content */}
                    <div className="xl:col-span-2 space-y-8">
                        {/* Video Player */}
                        <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black">
                            <iframe
                                key={`${activeModule.id}-${activeVideoIndex}`}
                                className="w-full h-full"
                                src={`https://www.youtube.com/embed/videoseries?list=${activeModule.playlistId}&index=${activeVideoIndex}`}
                                title={currentVideo?.title || activeModule.title}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div>

                        {/* Content Detail */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={`${activeModule.id}-${activeVideoIndex}`}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                                className="bg-neutral-900/50 border border-white/10 rounded-2xl p-6 md:p-8"
                            >
                                {/* Breadcrumb / Context */}
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-3 bg-emerald-500/10 rounded-xl shrink-0">
                                        {currentVideo ? (
                                            <Play className="w-6 h-6 text-emerald-400 fill-current" />
                                        ) : (
                                            <Database className="w-6 h-6 text-emerald-400" />
                                        )}
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-white leading-tight">
                                            {currentVideo ? currentVideo.title : activeModule.title}
                                        </h2>
                                        <div className="flex items-center gap-2 text-sm text-neutral-400 mt-1">
                                            <Layers className="w-4 h-4" />
                                            <span>
                                                {activeModule.title}
                                                {currentVideo && activeModule.videos && (
                                                    ` • Bài ${currentVideoDisplayIndex}/${activeModule.videos.length}`
                                                )}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Dynamic Content Body */}
                                <div className="prose prose-invert max-w-none space-y-8">
                                    {/* Description */}
                                    <div>
                                        <p className="text-lg text-neutral-300 leading-relaxed">
                                            {currentVideo?.description || activeModule.overview}
                                        </p>
                                    </div>

                                    {/* Applications / Real World */}
                                    {currentVideo?.application && (
                                        <div className="bg-blue-500/5 border-l-4 border-blue-500 pl-4 py-2 rounded-r-lg">
                                            <h3 className="text-blue-400 font-bold text-sm uppercase flex items-center gap-2 mb-2">
                                                <Zap className="w-4 h-4" />
                                                Ứng dụng thực tế
                                            </h3>
                                            <p className="text-neutral-300 m-0">
                                                {currentVideo.application}
                                            </p>
                                        </div>
                                    )}

                                    {/* Code Example */}
                                    {currentVideo?.codeExample && (
                                        <div>
                                            <h3 className="text-emerald-400 font-bold text-sm uppercase flex items-center gap-2 mb-3">
                                                <Code className="w-4 h-4" />
                                                Code Minh Họa ({currentVideo.codeLanguage || 'Java'})
                                            </h3>
                                            <div className="relative group">
                                                <pre className="bg-[#1e1e1e] p-4 rounded-xl border border-white/5 overflow-x-auto text-sm font-mono text-neutral-300 leading-relaxed shadow-inner">
                                                    <code>{currentVideo.codeExample}</code>
                                                </pre>
                                            </div>
                                        </div>
                                    )}

                                    {/* Fallback to Module Info if no specific video content (Overview Mode) */}
                                    {!currentVideo && (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="bg-white/5 rounded-xl p-5 border border-white/5">
                                                <h3 className="text-sm uppercase tracking-wide text-emerald-400 font-bold mb-3 flex items-center gap-2">
                                                    <Workflow className="w-4 h-4" />
                                                    Key Concepts
                                                </h3>
                                                <ul className="space-y-2">
                                                    {activeModule.keyConcepts.map((point, idx) => (
                                                        <li key={idx} className="flex items-start gap-2 text-neutral-300 text-sm">
                                                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                                                            {point}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                            {activeModule.complexity && (
                                                <div className="bg-white/5 rounded-xl p-5 border border-white/5">
                                                    <h3 className="text-sm uppercase tracking-wide text-cyan-400 font-bold mb-3 flex items-center gap-2">
                                                        <Network className="w-4 h-4" />
                                                        Complexity (Big O)
                                                    </h3>
                                                    <div className="space-y-4">
                                                        <div>
                                                            <span className="text-xs text-neutral-500 uppercase block mb-1">Time Complexity</span>
                                                            <code className="text-cyan-300 font-mono bg-cyan-950/30 px-2 py-1 rounded">
                                                                {activeModule.complexity.time}
                                                            </code>
                                                        </div>
                                                        <div>
                                                            <span className="text-xs text-neutral-500 uppercase block mb-1">Space Complexity</span>
                                                            <code className="text-purple-300 font-mono bg-purple-950/30 px-2 py-1 rounded">
                                                                {activeModule.complexity.space}
                                                            </code>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Right Column: Dynamic Sidebar */}
                    <div className="xl:col-span-1">
                        <div className="bg-neutral-900/50 border border-white/10 rounded-2xl overflow-hidden sticky top-24 max-h-[calc(100vh-120px)] flex flex-col shadow-xl">
                            {/* Sidebar Header */}
                            <div className="p-5 border-b border-white/10 bg-neutral-900/90 backdrop-blur-md z-10 flex items-center justify-between">
                                {viewMode === 'videos' ? (
                                    <button
                                        onClick={() => setViewMode('modules')}
                                        className="text-sm text-neutral-400 hover:text-white flex items-center gap-2 transition-colors group font-medium"
                                    >
                                        <div className="p-1.5 rounded-lg bg-white/5 group-hover:bg-white/10 transition-colors">
                                            <ChevronRight className="w-4 h-4 rotate-180 group-hover:-translate-x-0.5 transition-transform" />
                                        </div>
                                        Back to Modules
                                    </button>
                                ) : (
                                    <h3 className="font-bold text-lg text-white flex items-center gap-3">
                                        <Server className="w-5 h-5 text-emerald-400" />
                                        Course Modules
                                    </h3>
                                )}
                            </div>

                            <div className="overflow-y-auto p-3 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10 hover:scrollbar-thumb-white/20">
                                {viewMode === 'modules' ? (
                                    // Modules List
                                    <div className="space-y-2">
                                        {dsaCourseData.map((module) => {
                                            const isActive = activeModule.id === module.id;
                                            return (
                                                <button
                                                    key={module.id}
                                                    onClick={() => handleModuleClick(module)}
                                                    className={`w-full text-left p-4 rounded-xl transition-all duration-300 group relative border ${isActive
                                                        ? 'bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border-emerald-500/30'
                                                        : 'bg-white/5 hover:bg-white/10 border-transparent hover:border-white/10'
                                                        }`}
                                                >
                                                    <div className="flex items-start gap-3">
                                                        <div className={`mt-0.5 p-2 rounded-lg transition-colors ${isActive ? 'bg-emerald-500/20 text-emerald-400' : 'bg-black/20 text-neutral-400 group-hover:text-white'}`}>
                                                            {isActive ? <Play className="w-4 h-4 fill-current" /> : <Database className="w-4 h-4" />}
                                                        </div>
                                                        <div>
                                                            <h4 className={`text-sm font-bold mb-1 ${isActive ? 'text-white' : 'text-neutral-300 group-hover:text-white'}`}>
                                                                {module.title}
                                                            </h4>
                                                            <p className="text-xs text-neutral-500 line-clamp-1 group-hover:text-neutral-400 transition-colors">
                                                                {module.description}
                                                            </p>
                                                            {module.videos && (
                                                                <span className="inline-flex items-center gap-1 mt-2 text-[10px] uppercase tracking-wider font-bold text-emerald-500/70 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                                                                    {module.videos.length} videos
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </button>
                                            );
                                        })}
                                    </div>
                                ) : (
                                    // Videos List
                                    <div className="space-y-1">
                                        <div className="px-1 pb-3 mb-2 border-b border-white/5">
                                            <h4 className="text-emerald-400 font-bold text-sm tracking-wide uppercase line-clamp-1">
                                                {activeModule.title}
                                            </h4>
                                            <p className="text-xs text-neutral-500 mt-1">
                                                Select a lesson to start watching
                                            </p>
                                        </div>
                                        {activeModule.videos?.map((video, idx) => {
                                            const isVideoActive = activeVideoIndex === video.index;
                                            return (
                                                <button
                                                    key={video.index}
                                                    onClick={() => handleVideoClick(video.index)}
                                                    className={`w-full text-left p-3 rounded-xl transition-all duration-200 group flex items-start gap-3 border ${isVideoActive
                                                        ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400 shadow-lg shadow-emerald-900/10'
                                                        : 'hover:bg-white/5 border-transparent text-neutral-400 hover:text-white'
                                                        }`}
                                                >
                                                    <span className={`text-xs font-mono mt-0.5 opacity-50 shrink-0 w-6 ${isVideoActive ? 'text-emerald-400' : ''}`}>
                                                        {(idx + 1).toString().padStart(2, '0')}
                                                    </span>
                                                    <span className="text-sm font-medium leading-snug line-clamp-2">
                                                        {video.title}
                                                    </span>
                                                    {isVideoActive && (
                                                        <div className="ml-auto mt-1 relative shrink-0">
                                                            <div className="absolute inset-0 bg-emerald-500 blur-sm opacity-50" />
                                                            <Play className="w-3 h-3 fill-current relative z-10" />
                                                        </div>
                                                    )}
                                                </button>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
