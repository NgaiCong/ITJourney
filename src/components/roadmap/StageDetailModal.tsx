'use client';

import { motion, AnimatePresence } from 'framer-motion';
import {
    X, Target, Lightbulb, CheckCircle, AlertTriangle,
    BookOpen, Code2, Video, Brain, Wrench, ExternalLink,
    Rocket, ListChecks, Clock, ChevronDown, ChevronUp
} from 'lucide-react';
import { RoadmapPhase, Resource, DetailedTopic, ComparisonTable } from '@/data/roadmap';
import { useState } from 'react';
import useLockBodyScroll from '@/hooks/useLockBodyScroll';

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
    book: <BookOpen className="w-4 h-4" />,
    repo: <Code2 className="w-4 h-4" />,
};

const resourceLabels: Record<Resource['type'], string> = {
    docs: 'Docs',
    practice: 'Practice',
    video: 'Video',
    mental: 'Mental',
    tool: 'Tool',
    book: 'Book',
    repo: 'Repo',
};

// Expandable Topic Component
function TopicSection({ topic, index }: { topic: DetailedTopic; index: number }) {
    const [isExpanded, setIsExpanded] = useState(index === 0);

    return (
        <div className="border border-white/10 rounded-xl overflow-hidden">
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 transition-colors"
            >
                <span className="font-semibold text-white text-left">{topic.topic}</span>
                {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-neutral-400" />
                ) : (
                    <ChevronDown className="w-5 h-5 text-neutral-400" />
                )}
            </button>

            {isExpanded && (
                <div className="p-4 space-y-4 bg-white/[0.02]">
                    {/* Why Learn This */}
                    <div>
                        <h5 className="text-sm font-bold text-amber-400 mb-2 flex items-center gap-2">
                            <Lightbulb className="w-4 h-4" />
                            Tại sao học điều này?
                        </h5>
                        <p className="text-neutral-300 text-sm leading-relaxed">{topic.whyLearnThis}</p>
                    </div>

                    {/* Key Concepts */}
                    <div>
                        <h5 className="text-sm font-bold text-blue-400 mb-2">Khái niệm cốt lõi:</h5>
                        <ul className="space-y-1">
                            {topic.keyConceptsExplained.map((concept, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-neutral-300 text-sm">
                                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                                    {concept}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Code Examples */}
                    {topic.codeExamples && topic.codeExamples.length > 0 && (
                        <div>
                            <h5 className="text-sm font-bold text-green-400 mb-2">Ví dụ code:</h5>
                            {topic.codeExamples.map((example, idx) => (
                                <div key={idx} className="mb-3">
                                    <pre className="bg-neutral-900 p-3 rounded-lg overflow-x-auto text-xs">
                                        <code className="text-neutral-300">{example.code}</code>
                                    </pre>
                                    <p className="text-xs text-neutral-400 mt-2 italic">{example.explanation}</p>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Practical Use Cases */}
                    <div>
                        <h5 className="text-sm font-bold text-purple-400 mb-2">Ứng dụng thực tế:</h5>
                        <ul className="space-y-1">
                            {topic.practicalUseCases.map((useCase, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-neutral-300 text-sm">
                                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-purple-400 flex-shrink-0" />
                                    {useCase}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Tasks */}
                    <div>
                        <h5 className="text-sm font-bold text-cyan-400 mb-2">Thực hành:</h5>
                        <ul className="space-y-1">
                            {topic.tasks.map((task, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-neutral-300 text-sm">
                                    <span className="text-cyan-400">□</span>
                                    {task}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
}

// Comparison Table Component
function ComparisonTableSection({ table }: { table: ComparisonTable }) {
    return (
        <div className="mb-4">
            <h4 className="text-sm font-bold text-white mb-2">{table.title}</h4>
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-white/10">
                            {table.headers.map((header, idx) => (
                                <th key={idx} className="text-left p-2 text-neutral-400 font-medium">
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {table.rows.map((row, rowIdx) => (
                            <tr key={rowIdx} className="border-b border-white/5">
                                {row.map((cell, cellIdx) => (
                                    <td key={cellIdx} className="p-2 text-neutral-300">
                                        {cell}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

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
                        className="fixed inset-4 md:inset-8 lg:inset-16 z-50 rounded-2xl bg-neutral-900 border border-white/10 shadow-2xl flex flex-col"
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                        >
                            <X className="w-5 h-5 text-white" />
                        </button>

                        {/* Content */}
                        <div
                            data-lenis-prevent
                            className="flex-1 overflow-y-auto p-6 md:p-10 overscroll-contain [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:none]"
                        >
                            {/* Header */}
                            <div className="mb-8">
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="text-xs font-bold tracking-widest uppercase text-white/50">
                                        {stage.phase}
                                    </span>
                                    <span className="flex items-center gap-1 text-xs text-neutral-400">
                                        <Clock className="w-3 h-3" />
                                        ~{stage.estimatedHoursPerWeek}h/tuần
                                    </span>
                                </div>
                                <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
                                    {stage.title}
                                </h2>
                                <p className="text-lg text-neutral-300 leading-relaxed max-w-3xl">
                                    {stage.description}
                                </p>
                            </div>

                            {/* Two Column Layout */}
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                {/* Left Column - Main Content */}
                                <div className="lg:col-span-2 space-y-8">

                                    {/* Why Important */}
                                    <section className="p-5 rounded-xl bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/20">
                                        <div className="flex items-center gap-2 mb-3">
                                            <Lightbulb className="w-5 h-5 text-amber-400" />
                                            <h3 className="text-lg font-bold text-white">Tại Sao Quan Trọng?</h3>
                                        </div>
                                        <p className="text-neutral-300 text-sm leading-relaxed">{stage.whyImportant}</p>
                                    </section>

                                    {/* Practical Applications */}
                                    <section>
                                        <div className="flex items-center gap-2 mb-4">
                                            <Target className="w-5 h-5 text-emerald-400" />
                                            <h3 className="text-lg font-bold text-white">Ứng Dụng Thực Tế</h3>
                                        </div>
                                        <ul className="space-y-2">
                                            {stage.practicalApplications.map((app, idx) => (
                                                <li key={idx} className="flex items-start gap-3 text-neutral-300">
                                                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                                                    {app}
                                                </li>
                                            ))}
                                        </ul>
                                    </section>

                                    {/* Goals */}
                                    <section>
                                        <div className="flex items-center gap-2 mb-4">
                                            <Rocket className="w-5 h-5 text-blue-400" />
                                            <h3 className="text-lg font-bold text-white">Mục Tiêu Chính</h3>
                                        </div>
                                        <ul className="space-y-2">
                                            {stage.goals.map((goal, idx) => (
                                                <li key={idx} className="flex items-start gap-3 text-neutral-300">
                                                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                                                    {goal}
                                                </li>
                                            ))}
                                        </ul>
                                    </section>

                                    {/* Detailed Topics */}
                                    <section>
                                        <div className="flex items-center gap-2 mb-4">
                                            <BookOpen className="w-5 h-5 text-purple-400" />
                                            <h3 className="text-lg font-bold text-white">Nội Dung Chi Tiết</h3>
                                        </div>
                                        <div className="space-y-3">
                                            {stage.detailedTopics.map((topic, idx) => (
                                                <TopicSection key={idx} topic={topic} index={idx} />
                                            ))}
                                        </div>
                                    </section>

                                    {/* Comparison Tables */}
                                    {stage.comparisonTables && stage.comparisonTables.length > 0 && (
                                        <section>
                                            <div className="flex items-center gap-2 mb-4">
                                                <ListChecks className="w-5 h-5 text-cyan-400" />
                                                <h3 className="text-lg font-bold text-white">So Sánh</h3>
                                            </div>
                                            {stage.comparisonTables.map((table, idx) => (
                                                <ComparisonTableSection key={idx} table={table} />
                                            ))}
                                        </section>
                                    )}

                                    {/* Real World Project */}
                                    <section className="p-5 rounded-xl bg-gradient-to-br from-purple-500/10 to-violet-500/10 border border-purple-500/20">
                                        <div className="flex items-center gap-2 mb-3">
                                            <Rocket className="w-5 h-5 text-purple-400" />
                                            <h3 className="text-lg font-bold text-white">Dự Án Thực Tế</h3>
                                        </div>
                                        <p className="text-sm font-semibold text-purple-300 mb-2">
                                            &ldquo;{stage.realWorldProject.name}&rdquo;
                                        </p>
                                        <p className="text-neutral-300 text-sm mb-3">{stage.realWorldProject.description}</p>

                                        <div className="flex flex-wrap gap-2 mb-3">
                                            {stage.realWorldProject.techStack.map((tech, idx) => (
                                                <span key={idx} className="px-2 py-1 bg-white/10 rounded text-xs text-neutral-300">
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>

                                        <h4 className="text-xs font-bold text-white/70 uppercase tracking-wider mb-2">Features:</h4>
                                        <ul className="space-y-1 mb-3">
                                            {stage.realWorldProject.features.map((feature, idx) => (
                                                <li key={idx} className="text-neutral-300 text-sm flex items-start gap-2">
                                                    <span className="text-purple-400">✓</span>
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>

                                        <h4 className="text-xs font-bold text-white/70 uppercase tracking-wider mb-2">Học được gì:</h4>
                                        <ul className="space-y-1">
                                            {stage.realWorldProject.learningOutcomes.map((outcome, idx) => (
                                                <li key={idx} className="text-neutral-300 text-sm flex items-start gap-2">
                                                    <span className="text-green-400">★</span>
                                                    {outcome}
                                                </li>
                                            ))}
                                        </ul>
                                    </section>
                                </div>

                                {/* Right Column - Sidebar */}
                                <div className="lg:col-span-1 space-y-6">
                                    {/* Prerequisites */}
                                    <section>
                                        <div className="flex items-center gap-2 mb-3">
                                            <CheckCircle className="w-4 h-4 text-green-400" />
                                            <h3 className="text-sm font-bold text-white">Yêu Cầu Trước</h3>
                                        </div>
                                        <ul className="space-y-2">
                                            {stage.prerequisites.map((prereq, idx) => (
                                                <li key={idx} className="text-sm text-neutral-400 flex items-start gap-2">
                                                    <span className="text-green-400">•</span>
                                                    {prereq}
                                                </li>
                                            ))}
                                        </ul>
                                    </section>

                                    {/* Checkpoints */}
                                    <section>
                                        <div className="flex items-center gap-2 mb-3">
                                            <ListChecks className="w-4 h-4 text-blue-400" />
                                            <h3 className="text-sm font-bold text-white">Tự Kiểm Tra</h3>
                                        </div>
                                        <ul className="space-y-2">
                                            {stage.checkpoints.map((checkpoint, idx) => (
                                                <li key={idx} className="text-sm text-neutral-400 flex items-start gap-2">
                                                    <span className="text-blue-400">□</span>
                                                    {checkpoint}
                                                </li>
                                            ))}
                                        </ul>
                                    </section>

                                    {/* Common Mistakes */}
                                    {stage.commonMistakes && stage.commonMistakes.length > 0 && (
                                        <section className="p-4 rounded-xl bg-red-500/10 border border-red-500/20">
                                            <div className="flex items-center gap-2 mb-3">
                                                <AlertTriangle className="w-4 h-4 text-red-400" />
                                                <h3 className="text-sm font-bold text-white">Lỗi Thường Gặp</h3>
                                            </div>
                                            <ul className="space-y-2">
                                                {stage.commonMistakes.map((mistake, idx) => (
                                                    <li key={idx} className="text-sm text-neutral-400 flex items-start gap-2">
                                                        <span className="text-red-400">✗</span>
                                                        {mistake}
                                                    </li>
                                                ))}
                                            </ul>
                                        </section>
                                    )}

                                    {/* Resources */}
                                    <section>
                                        <h3 className="text-sm font-bold text-white mb-3">Tài Liệu Chọn Lọc</h3>
                                        <div className="space-y-2">
                                            {stage.resources.map((resource, idx) => (
                                                <a
                                                    key={idx}
                                                    href={resource.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="block p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all group"
                                                >
                                                    <div className="flex items-center justify-between mb-1">
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
                                                    <p className="font-semibold text-white text-sm">{resource.name}</p>
                                                    <p className="text-xs text-neutral-400">{resource.description}</p>
                                                </a>
                                            ))}
                                        </div>
                                    </section>

                                    {/* Summary */}
                                    <section className="p-4 rounded-xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/20">
                                        <h3 className="text-sm font-bold text-white mb-2">Tóm Tắt</h3>
                                        <ul className="space-y-2">
                                            {stage.summary.map((item, idx) => (
                                                <li key={idx} className="text-sm text-neutral-300 flex items-start gap-2">
                                                    <span className="text-emerald-400">✓</span>
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </section>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
