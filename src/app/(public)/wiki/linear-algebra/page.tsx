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
    const [isDubbingEnabled, setIsDubbingEnabled] = useState(false);
    // Subtitle Offset State (seconds) - Allows user to fix sync issues
    const [subtitleOffset, setSubtitleOffset] = useState(0);
    // Portrait Hint State
    const [showPortraitHint, setShowPortraitHint] = useState(false);
    // Fake Fullscreen State (for iOS/Mobile fallback)
    const [isFakeFullscreen, setIsFakeFullscreen] = useState(false);

    // Scroll Lock Effect for Fake Fullscreen
    useEffect(() => {
        if (isFakeFullscreen) {
            document.body.style.overflow = 'hidden';
            // Specific fix for iOS overscroll
            document.body.style.position = 'fixed';
            document.body.style.width = '100%';
        } else {
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.width = '';
        }
        return () => {
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.width = '';
        };
    }, [isFakeFullscreen]);

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
    }, []); // v2 fix for iOS fullscreen crash

    const toggleFullscreen = async () => {
        if (!containerRef.current) return;

        try {
            const container = containerRef.current as any;
            const doc = document as any;

            const isFullscreen = doc.fullscreenElement || doc.webkitFullscreenElement || doc.mozFullScreenElement || doc.msFullscreenElement || isFakeFullscreen;

            if (!isFullscreen) {
                let enteredNative = false;
                if (container.requestFullscreen) {
                    await container.requestFullscreen();
                    enteredNative = true;
                } else if (container.webkitRequestFullscreen) { // Safari/Chrome
                    await container.webkitRequestFullscreen();
                    enteredNative = true;
                } else if (container.mozRequestFullScreen) { // Firefox
                    await container.mozRequestFullScreen();
                    enteredNative = true;
                } else if (container.msRequestFullscreen) { // IE/Edge
                    await container.msRequestFullscreen();
                    enteredNative = true;
                }

                // If native failed or not supported, use Fake Fullscreen
                if (!enteredNative) {
                    setIsFakeFullscreen(true);
                }

                // Attempt to lock orientation to landscape
                if (screen.orientation && 'lock' in screen.orientation) {
                    // @ts-ignore
                    await screen.orientation.lock('landscape').catch(() => {
                        console.log('Orientation lock not supported or failed');
                    });
                }
            } else {
                if (isFakeFullscreen) {
                    setIsFakeFullscreen(false);
                } else {
                    if (doc.exitFullscreen) {
                        await doc.exitFullscreen();
                    } else if (doc.webkitExitFullscreen) {
                        await doc.webkitExitFullscreen();
                    } else if (doc.mozCancelFullScreen) {
                        await doc.mozCancelFullScreen();
                    } else if (doc.msExitFullscreen) {
                        await doc.msExitFullscreen();
                    }
                }

                // Unlock orientation
                if (screen.orientation && 'unlock' in screen.orientation) {
                    screen.orientation.unlock();
                }
            }
        } catch (err) {
            console.error('Fullscreen toggle error:', err);
            // Fallback to fake fullscreen on error
            setIsFakeFullscreen(true);
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

                        {/* Main Content Area */}
                        <div className="space-y-8">
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

                            {/* Fake Fullscreen Backdrop */}
                            {isFakeFullscreen && (
                                <div className="fixed inset-0 bg-black z-[4999]" />
                            )}

                            {/* 2. Video Player with Subtitle Overlay */}
                            <div
                                ref={containerRef}
                                className={`relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black group transition-all duration-300 ${isFakeFullscreen
                                    ? 'fixed z-[5000] rounded-none portrait:w-[100dvh] portrait:h-[100vw] portrait:rotate-90 portrait:origin-center portrait:top-[28%] portrait:left-1/2 portrait:-translate-x-1/2 portrait:-translate-y-1/2 landscape:inset-0 landscape:w-[100vw] landscape:h-[100dvh]'
                                    : 'w-full aspect-video'
                                    }`}
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
                                <div className="absolute top-4 right-4 flex flex-col items-end gap-2 z-30 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">

                                    <div className="flex gap-2">
                                        {currentTranscript && (
                                            <button
                                                onClick={() => {
                                                    if (window.matchMedia("(orientation: portrait)").matches) {
                                                        setShowPortraitHint(true);
                                                    } else {
                                                        setIsDubbingEnabled(!isDubbingEnabled);
                                                    }
                                                }}
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
                                        )}


                                    </div>
                                </div>

                                {/* Portrait Hint Overlay */}
                                <AnimatePresence>
                                    {showPortraitHint && (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            onClick={() => setShowPortraitHint(false)}
                                            className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm text-center p-6 cursor-pointer"
                                        >
                                            <div className="flex items-center gap-4 mb-6">
                                                {/* Static Subtitle Icon */}
                                                <div className="p-3 bg-white/10 rounded-xl border border-white/20">
                                                    <Captions className="w-6 h-6 text-neutral-400" />
                                                </div>

                                                {/* Arrow */}
                                                <ChevronRight className="w-6 h-6 text-neutral-600" />

                                                {/* Glowing Fullscreen Icon */}
                                                <div className="relative">
                                                    <div className="absolute inset-0 bg-indigo-500 rounded-xl blur-md animate-pulse" />
                                                    <div className="relative p-3 bg-indigo-500 rounded-xl border border-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.5)] animate-bounce">
                                                        <Maximize className="w-6 h-6 text-white" />
                                                    </div>
                                                </div>
                                            </div>

                                            <h3 className="text-xl font-bold text-white mb-2">
                                                Chế độ Toàn màn hình
                                            </h3>
                                            <p className="text-neutral-300 text-sm max-w-sm leading-relaxed">
                                                Vui lòng ấn nút <span className="text-indigo-400 font-bold">Full Screen</span> bên cạnh nút phụ đề để có trải nghiệm xem tốt nhất.
                                            </p>
                                            <p className="text-neutral-500 text-xs mt-8">
                                                Chạm bất kỳ đâu để đóng
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
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
                        </div>
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

            {/* Global Portrait Hint Overlay */}
            <AnimatePresence>
                {
                    showPortraitHint && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowPortraitHint(false)}
                            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/95 backdrop-blur-xl text-center p-6 cursor-pointer"
                        >
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.1 }}
                                className="flex items-center gap-4 md:gap-8 mb-12 relative"
                            >
                                {/* Glowing Fullscreen Icon (Step 1) - Functional */}
                                <div
                                    className="flex flex-col items-center gap-4 group cursor-pointer"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        toggleFullscreen();
                                        setShowPortraitHint(false);
                                    }}
                                >
                                    <div className="relative">
                                        <div className="absolute inset-0 bg-indigo-500 rounded-2xl blur-xl animate-pulse opacity-40 group-hover:opacity-60 transition-opacity" />
                                        <div className="relative p-5 rounded-2xl bg-gradient-to-br from-neutral-800 to-black border border-indigo-500/50 text-white shadow-[0_0_30px_rgba(99,102,241,0.3)] group-hover:scale-105 active:scale-95 transition-transform duration-300">
                                            <Maximize className="w-8 h-8 md:w-10 md:h-10" />
                                        </div>
                                        <div className="absolute -top-3 -right-3 w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center text-xs font-bold border-2 border-black shadow-lg z-10">
                                            1
                                        </div>
                                    </div>
                                    <span className="text-sm md:text-base text-indigo-300 font-bold uppercase tracking-widest drop-shadow-sm">
                                        Bấm Vào Đây
                                    </span>
                                </div>

                                {/* Animated Arrows */}
                                <div className="flex flex-col gap-1 opacity-50">
                                    <ChevronRight className="w-6 h-6 text-neutral-500 animate-[pulse_1.5s_ease-in-out_infinite]" />
                                    <ChevronRight className="w-6 h-6 text-neutral-600 animate-[pulse_1.5s_ease-in-out_infinite_200ms]" />
                                    <ChevronRight className="w-6 h-6 text-neutral-700 animate-[pulse_1.5s_ease-in-out_infinite_400ms]" />
                                </div>

                                {/* Static Subtitle Icon (Step 2) */}
                                <div className="flex flex-col items-center gap-4 group">
                                    <div className="relative">
                                        <div className="relative p-5 rounded-2xl bg-neutral-900/80 border border-white/10 text-neutral-400 grayscale group-hover:grayscale-0 transition-all duration-300">
                                            <CaptionsOff className="w-8 h-8 md:w-10 md:h-10" />
                                        </div>
                                        <div className="absolute -top-3 -right-3 w-6 h-6 bg-neutral-700 rounded-full flex items-center justify-center text-xs font-bold border-2 border-black text-neutral-300 shadow-lg z-10">
                                            2
                                        </div>
                                    </div>
                                    <span className="text-sm md:text-base text-neutral-500 font-bold uppercase tracking-widest group-hover:text-neutral-300 transition-colors">Phụ Đề</span>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="space-y-4 max-w-md"
                            >
                                <h3 className="text-2xl md:text-4xl font-black text-white tracking-tight">
                                    Tối ưu <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Hiển thị</span>
                                </h3>
                                {/* Rotation Animation Graphic */}
                                <div className="mb-8 relative">
                                    <div className="w-12 h-20 border-2 border-neutral-600 rounded-xl mx-auto flex items-center justify-center animate-[spin_3s_ease-in-out_infinite] group-hover:border-indigo-500 transition-colors">
                                        <div className="w-8 h-12 border border-neutral-700 rounded-lg bg-neutral-900/50" />
                                    </div>
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                        <Maximize className="w-4 h-4 text-indigo-500 animate-pulse" />
                                    </div>
                                </div>

                                <p className="text-neutral-400 text-base md:text-lg leading-relaxed font-light">
                                    Vui lòng <b className="text-white">tắt khóa xoay</b> điện thoại, sau đó bấm nút bên dưới để phụ đề <span className="text-indigo-300">không che mất nội dung</span>.
                                </p>
                                <p className="text-xs text-neutral-500 mt-2 italic">
                                    * Phụ đề sẽ tự động tắt khi thoát toàn màn hình.
                                </p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="mt-16 animate-bounce"
                            >
                                <span className="text-xs text-neutral-600 font-mono tracking-widest uppercase">Chạm để đóng</span>
                            </motion.div>
                        </motion.div>
                    )
                }
            </AnimatePresence >
        </main >
    );
}
