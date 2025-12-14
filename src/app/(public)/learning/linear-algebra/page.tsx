'use client';

import React, { useState, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { linearAlgebraCourseData } from '@/data/linear-algebra-course';
import { DsaModule } from '@/data/dsa-course';
import { Play, Database, Server, ChevronRight, Layers, Workflow, Network, Code, Zap, Cpu, Sigma, Captions, CaptionsOff, Maximize } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { linearAlgebraTranscript1 } from '@/data/transcripts/linear-algebra-1';
import { linearAlgebraTranscript2 } from '@/data/transcripts/linear-algebra-2';
import { linearAlgebraTranscript3 } from '@/data/transcripts/linear-algebra-3';
import { linearAlgebraTranscript4 } from '@/data/transcripts/linear-algebra-4';
import { linearAlgebraTranscript5 } from '@/data/transcripts/linear-algebra-5';
import { linearAlgebraTranscript6 } from '@/data/transcripts/linear-algebra-6';
import { linearAlgebraTranscript7 } from '@/data/transcripts/linear-algebra-7';
import { linearAlgebraTranscript8 } from '@/data/transcripts/linear-algebra-8';
import { linearAlgebraTranscript9 } from '@/data/transcripts/linear-algebra-9';
import { linearAlgebraTranscript10 } from '@/data/transcripts/linear-algebra-10';
import { linearAlgebraTranscript11 } from '@/data/transcripts/linear-algebra-11';
import { linearAlgebraTranscript12 } from '@/data/transcripts/linear-algebra-12';
import { linearAlgebraTranscript13 } from '@/data/transcripts/linear-algebra-13';
import { linearAlgebraTranscript14 } from '@/data/transcripts/linear-algebra-14';
import { linearAlgebraTranscript15 } from '@/data/transcripts/linear-algebra-15';
import { linearAlgebraTranscript16 } from '@/data/transcripts/linear-algebra-16';
import YouTube, { YouTubeProps } from 'react-youtube';

export default function LinearAlgebraCoursePage() {
    const [activeModule, setActiveModule] = useState<DsaModule>(linearAlgebraCourseData[0]);
    const [activeVideoIndex, setActiveVideoIndex] = useState<number>(0);
    const [viewMode, setViewMode] = useState<'modules' | 'videos'>('modules');
    const [currentTime, setCurrentTime] = useState(0);

    // Subtitle Toggle State
    const [isDubbingEnabled, setIsDubbingEnabled] = useState(true);
    // Subtitle Offset State (seconds) - Allows user to fix sync issues
    const [subtitleOffset, setSubtitleOffset] = useState(0);

    // Player Ref (stores the YouTube Player instance)
    const playerRef = useRef<any>(null);

    // Video Container Ref for Fullscreen
    const containerRef = useRef<HTMLDivElement>(null);

    const handleModuleClick = (module: DsaModule) => {
        setActiveModule(module);
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

    const currentVideo = activeModule.videos?.find(v => v.index === activeVideoIndex);
    const currentVideoDisplayIndex = activeModule.videos
        ? activeModule.videos.findIndex(v => v.index === activeVideoIndex) + 1
        : 0;

    // Select transcript based on video index
    let currentTranscript = undefined;
    if (activeModule.id === 'visual-intuition') {
        const transcripts = [
            linearAlgebraTranscript1, linearAlgebraTranscript2, linearAlgebraTranscript3, linearAlgebraTranscript4,
            linearAlgebraTranscript5, linearAlgebraTranscript6, linearAlgebraTranscript7, linearAlgebraTranscript8,
            linearAlgebraTranscript9, linearAlgebraTranscript10, linearAlgebraTranscript11, linearAlgebraTranscript12,
            linearAlgebraTranscript13, linearAlgebraTranscript14, linearAlgebraTranscript15, linearAlgebraTranscript16
        ];
        // Ensure index is within bounds [0, 15]
        if (activeVideoIndex >= 0 && activeVideoIndex < transcripts.length) {
            currentTranscript = transcripts[activeVideoIndex];
        }
    }

    // Polling for Current Time
    useEffect(() => {
        const interval = setInterval(() => {
            if (playerRef.current && typeof playerRef.current.getCurrentTime === 'function') {
                setCurrentTime(playerRef.current.getCurrentTime());
            }
        }, 100); // Fast polling for smooth subtitles
        return () => clearInterval(interval);
    }, []);

    const toggleFullscreen = () => {
        if (!containerRef.current) return;
        if (document.fullscreenElement) {
            document.exitFullscreen();
        } else {
            containerRef.current.requestFullscreen();
        }
    };

    const onPlayerReady: YouTubeProps['onReady'] = (event) => {
        playerRef.current = event.target;
    };

    // YouTube Options
    const opts: YouTubeProps['opts'] = {
        height: '100%',
        width: '100%',
        playerVars: {
            autoplay: 1,
            modestbranding: 1,
            rel: 0,
        },
    };

    return (
        <main className="min-h-screen bg-[#0a0a0a] text-white pt-32 pb-10">
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
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-blue-400">
                            Linear
                        </span>{' '}
                        Algebra
                    </h1>
                    <p className="text-neutral-400 max-w-3xl text-lg">
                        Ngôn ngữ của vũ trụ số. Từ đồ họa máy tính, AI đến xử lý tín hiệu.
                    </p>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                    {/* Left Column: Content Flow (Intro -> Video -> Details) */}
                    <div className="xl:col-span-2 space-y-8">

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={`${activeModule.id}-${activeVideoIndex}`}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                                className="space-y-8"
                            >
                                {/* 1. Introduction & Context (Blog Style Intro) */}
                                <div className="bg-neutral-900/50 border border-white/10 rounded-2xl p-6 md:p-8">
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="flex items-center gap-3">
                                            <div className="p-3 bg-indigo-500/10 rounded-xl shrink-0">
                                                {currentVideo ? (
                                                    <Play className="w-6 h-6 text-indigo-400 fill-current" />
                                                ) : (
                                                    <Sigma className="w-6 h-6 text-indigo-400" />
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
                                    </div>

                                    {/* Intro Body Text */}
                                    <div className="prose prose-invert max-w-none">
                                        <p className="text-lg text-neutral-300 leading-relaxed font-light">
                                            {currentVideo?.description || activeModule.overview}
                                        </p>
                                    </div>
                                </div>

                                {/* 2. Video Player with Subtitle Overlay */}
                                <div
                                    ref={containerRef}
                                    className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black group"
                                >
                                    {/* React Youtube Player */}
                                    {currentVideo?.videoId ? (
                                        <YouTube
                                            videoId={currentVideo.videoId}
                                            opts={opts}
                                            onReady={onPlayerReady}
                                            className="w-full h-full absolute top-0 left-0"
                                            iframeClassName="w-full h-full"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-neutral-500">
                                            Video not found
                                        </div>
                                    )}

                                    {/* Subtitle Overlay */}
                                    {isDubbingEnabled && currentTranscript && (() => {
                                        // Apply Offset to logic
                                        const adjustedTime = currentTime - subtitleOffset;
                                        const currentSubtitle = currentTranscript.find(sub => adjustedTime >= sub.start && adjustedTime < sub.end);

                                        return (
                                            <div className="absolute bottom-16 left-0 right-0 z-20 flex justify-center px-8 pointer-events-none">
                                                <AnimatePresence mode="wait">
                                                    {currentSubtitle && (
                                                        <motion.div
                                                            key={currentSubtitle.start}
                                                            initial={{ opacity: 0, y: 10 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            exit={{ opacity: 0, y: -5 }}
                                                            transition={{ duration: 0.2 }}
                                                            className="bg-black/30 backdrop-blur-md px-6 py-4 rounded-xl text-center shadow-lg"
                                                        >
                                                            <p className="text-xl md:text-2xl font-medium text-white drop-shadow-md leading-relaxed tracking-wide">
                                                                {currentSubtitle.text}
                                                            </p>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        );
                                    })()}

                                    {/* Custom Controls (Overlay) */}
                                    {currentTranscript && (
                                        <div className="absolute top-4 right-4 flex flex-col items-end gap-2 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">

                                            {/* Sync Controls Removed */}

                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => setIsDubbingEnabled(!isDubbingEnabled)}
                                                    className={`flex items-center gap-2 px-3 py-2 rounded-lg backdrop-blur-md border transition-all ${isDubbingEnabled
                                                        ? 'bg-indigo-500/90 border-indigo-400 text-white shadow-lg shadow-indigo-500/20'
                                                        : 'bg-black/60 border-white/20 text-neutral-300 hover:text-white hover:bg-black/80'
                                                        }`}
                                                    title="Bật/Tắt Phụ Đề Tiếng Việt"
                                                >
                                                    {isDubbingEnabled ? <Captions className="w-4 h-4" /> : <CaptionsOff className="w-4 h-4" />}
                                                    <span className="text-xs font-bold uppercase tracking-wider">
                                                        {isDubbingEnabled ? 'Phụ Đề' : 'Phụ Đề'}
                                                    </span>
                                                </button>

                                                <button
                                                    onClick={toggleFullscreen}
                                                    className="p-2 rounded-lg bg-black/60 backdrop-blur-md border border-white/20 text-neutral-300 hover:text-white transition-colors"
                                                    title="Cinema Mode"
                                                >
                                                    <Maximize className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {currentTranscript && (
                                    <p className="text-center text-sm text-neutral-500 italic">
                                        * Tính năng <span className="text-indigo-400 font-bold">Phụ Đề (Subtitles)</span> đang khả dụng. Bật lên để xem dịch nghĩa Tiếng Việt trực tiếp.
                                    </p>
                                )}

                                {/* 3. Deep Dive / Key Takeaways / Code (Further Reading) */}
                                {(currentVideo?.application || currentVideo?.codeExample) && (
                                    <div className="bg-neutral-900/50 border border-white/10 rounded-2xl p-6 md:p-8 space-y-8">

                                        {/* Applications */}
                                        {currentVideo?.application && (
                                            <div className="bg-blue-500/5 border-l-4 border-blue-500 pl-4 py-3 rounded-r-lg">
                                                <h3 className="text-blue-400 font-bold text-sm uppercase flex items-center gap-2 mb-2">
                                                    <Cpu className="w-4 h-4" />
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
                                                <h3 className="text-indigo-400 font-bold text-sm uppercase flex items-center gap-2 mb-3">
                                                    <Code className="w-4 h-4" />
                                                    Code Minh Họa ({currentVideo.codeLanguage?.toUpperCase() || 'PYTHON'})
                                                </h3>
                                                <div className="relative group">
                                                    <pre className="bg-[#1e1e1e] p-4 rounded-xl border border-white/5 overflow-x-auto text-sm font-mono text-neutral-300 leading-relaxed shadow-inner">
                                                        <code>{currentVideo.codeExample}</code>
                                                    </pre>
                                                </div>

                                                {/* Code Output Block */}
                                                {currentVideo.codeOutput && (
                                                    <div className="mt-4">
                                                        <h4 className="text-emerald-400 font-bold text-xs uppercase mb-2 flex items-center gap-2">
                                                            <Workflow className="w-3 h-3" />
                                                            Terminal Output
                                                        </h4>
                                                        <pre className="bg-emerald-900/10 p-4 rounded-xl border border-emerald-500/20 text-emerald-300/90 text-sm font-mono leading-relaxed select-all">
                                                            <code>{currentVideo.codeOutput}</code>
                                                        </pre>
                                                    </div>
                                                )}

                                                {/* Code Explanation Block */}
                                                {currentVideo.codeExplanation && (
                                                    <div className="mt-6 pt-6 border-t border-white/10">
                                                        <h4 className="text-amber-400 font-bold text-xs uppercase mb-3 flex items-center gap-2">
                                                            <Zap className="w-3 h-3" />
                                                            Phân tích Code & Kiến thức
                                                        </h4>
                                                        <div className="text-neutral-300 text-sm leading-7 whitespace-pre-line font-light">
                                                            {currentVideo.codeExplanation}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Right Column: Sidebar */}
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
                                        <Server className="w-5 h-5 text-indigo-400" />
                                        Course Modules
                                    </h3>
                                )}
                            </div>

                            <div className="overflow-y-auto p-3 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10 hover:scrollbar-thumb-white/20">
                                {viewMode === 'modules' ? (
                                    <div className="space-y-2">
                                        {linearAlgebraCourseData.map((module) => {
                                            const isActive = activeModule.id === module.id;
                                            return (
                                                <button
                                                    key={module.id}
                                                    onClick={() => handleModuleClick(module)}
                                                    className={`w-full text-left p-4 rounded-xl transition-all duration-300 group relative border ${isActive
                                                        ? 'bg-gradient-to-r from-indigo-500/10 to-blue-500/10 border-indigo-500/30'
                                                        : 'bg-white/5 hover:bg-white/10 border-transparent hover:border-white/10'
                                                        }`}
                                                >
                                                    <div className="flex items-start gap-3">
                                                        <div className={`mt-0.5 p-2 rounded-lg transition-colors ${isActive ? 'bg-indigo-500/20 text-indigo-400' : 'bg-black/20 text-neutral-400 group-hover:text-white'}`}>
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
                                                                <span className="inline-flex items-center gap-1 mt-2 text-[10px] uppercase tracking-wider font-bold text-indigo-500/70 bg-indigo-500/10 px-2 py-0.5 rounded-full">
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
                                    <div className="space-y-1">
                                        <div className="px-1 pb-3 mb-2 border-b border-white/5">
                                            <h4 className="text-indigo-400 font-bold text-sm tracking-wide uppercase line-clamp-1">
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
                                                        ? 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400 shadow-lg shadow-indigo-900/10'
                                                        : 'hover:bg-white/5 border-transparent text-neutral-400 hover:text-white'
                                                        }`}
                                                >
                                                    <span className={`text-xs font-mono mt-0.5 opacity-50 shrink-0 w-6 ${isVideoActive ? 'text-indigo-400' : ''}`}>
                                                        {(idx + 1).toString().padStart(2, '0')}
                                                    </span>
                                                    <span className="text-sm font-medium leading-snug line-clamp-2">
                                                        {video.title}
                                                    </span>
                                                    {isVideoActive && (
                                                        <div className="ml-auto mt-1 relative shrink-0">
                                                            <div className="absolute inset-0 bg-indigo-500 blur-sm opacity-50" />
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
