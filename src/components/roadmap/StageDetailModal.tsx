'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Target, Zap, Calendar, BookOpen, Code2, Video, Brain, Wrench, ExternalLink } from 'lucide-react';
import { RoadmapPhase, Resource } from '@/data/roadmap';

interface StageDetailModalProps {
    stage: RoadmapPhase | null;
    onClose: () => void;
}

const resourceIcons: Record<Resource['type'], React.ReactNode> = {
    docs: <BookOpen className="w-4 h-4" />,
    practice: <Code2 className="w-4 h-4" />,
    video: <Video className="w-4 h-4" />,
    mental: <Brain className="w-4 h-4" />,
    tool: <Wrench className="w-4 h-4" />,
};

const resourceLabels: Record<Resource['type'], string> = {
    docs: 'Docs',
    practice: 'Practice',
    video: 'Video',
    mental: 'Mental',
    tool: 'Tool',
};

import useLockBodyScroll from '@/hooks/useLockBodyScroll';

export default function StageDetailModal({ stage, onClose }: StageDetailModalProps) {
    useLockBodyScroll(!!stage);
    if (!stage) return null;

    return (
        <AnimatePresence>
            {stage && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="fixed inset-4 md:inset-8 lg:inset-16 z-50 overflow-hidden rounded-2xl bg-neutral-900 border border-white/10 shadow-2xl"
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                        >
                            <X className="w-5 h-5 text-white" />
                        </button>

                        {/* Content */}
                        <div className="h-full overflow-y-auto p-6 md:p-10 overscroll-contain [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:none]">
                            {/* Header */}
                            <div className="mb-8">
                                <span className="text-xs font-bold tracking-widest uppercase text-white/50 mb-2 block">
                                    {stage.phase}
                                </span>
                                <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
                                    {stage.title}
                                </h2>
                                <p className="text-lg text-neutral-300 leading-relaxed max-w-3xl">
                                    {stage.philosophy}
                                </p>
                            </div>

                            {/* Two Column Layout */}
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                {/* Left Column - Main Content */}
                                <div className="lg:col-span-2 space-y-8">
                                    {/* Goals */}
                                    <section>
                                        <div className="flex items-center gap-2 mb-4">
                                            <Target className="w-5 h-5 text-emerald-400" />
                                            <h3 className="text-lg font-bold text-white">Mục Tiêu Chính</h3>
                                        </div>
                                        <ul className="space-y-2">
                                            {stage.goals.map((goal, idx) => (
                                                <li key={idx} className="flex items-start gap-3 text-neutral-300">
                                                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                                                    {goal}
                                                </li>
                                            ))}
                                        </ul>
                                    </section>

                                    {/* Challenge */}
                                    <section className="p-5 rounded-xl bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/20">
                                        <div className="flex items-center gap-2 mb-3">
                                            <Zap className="w-5 h-5 text-amber-400" />
                                            <h3 className="text-lg font-bold text-white">Thử Thách</h3>
                                        </div>
                                        <p className="text-sm font-semibold text-amber-300 mb-1">"{stage.challenge.name}"</p>
                                        <p className="text-neutral-300 text-sm">{stage.challenge.description}</p>
                                    </section>

                                    {/* Weekly Milestones */}
                                    <section>
                                        <div className="flex items-center gap-2 mb-4">
                                            <Calendar className="w-5 h-5 text-blue-400" />
                                            <h3 className="text-lg font-bold text-white">Cột Mốc Hàng Tuần</h3>
                                        </div>
                                        <div className="space-y-3">
                                            {stage.weeklyMilestones.map((milestone, idx) => (
                                                <div key={idx} className="flex items-start gap-4 p-3 rounded-lg bg-white/5">
                                                    <span className="text-xs font-mono text-blue-400 whitespace-nowrap min-w-[80px]">
                                                        {milestone.time}
                                                    </span>
                                                    <span className="text-neutral-300 text-sm">{milestone.title}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </section>
                                </div>

                                {/* Right Column - Resources */}
                                <div className="lg:col-span-1">
                                    <h3 className="text-lg font-bold text-white mb-4">Tài Liệu Chọn Lọc</h3>
                                    <div className="space-y-3">
                                        {stage.resources.map((resource, idx) => (
                                            <a
                                                key={idx}
                                                href={resource.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="block p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all group"
                                            >
                                                <div className="flex items-center justify-between mb-2">
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-neutral-400 group-hover:text-white transition-colors">
                                                            {resourceIcons[resource.type]}
                                                        </span>
                                                        <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                                                            {resourceLabels[resource.type]}
                                                        </span>
                                                    </div>
                                                    <ExternalLink className="w-3 h-3 text-neutral-500 group-hover:text-white transition-colors" />
                                                </div>
                                                <p className="font-semibold text-white text-sm mb-1">{resource.name}</p>
                                                <p className="text-xs text-neutral-400">{resource.description}</p>
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
