'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Code, Brain, Rocket } from 'lucide-react';
import SpotlightCard from '@/components/ui/SpotlightCard';
import StageDetailModal from '@/components/roadmap/StageDetailModal';
import { roadmapData, RoadmapPhase } from '@/data/roadmap';

// Map icons since roadmapData has JSX icons that might not serialize
const phaseIcons: Record<string, React.ReactNode> = {
    'phase-1': <Cpu className="w-6 h-6" />,
    'phase-2': <Brain className="w-6 h-6" />,
    'phase-3': <Code className="w-6 h-6" />,
    'phase-4': <Rocket className="w-6 h-6" />,
    'phase-5': <Code className="w-6 h-6" />,
    'phase-6': <Brain className="w-6 h-6" />,
};

function PhaseCard({ phase, index, onSelect }: { phase: RoadmapPhase; index: number; onSelect: () => void }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            onClick={onSelect}
        >
            <SpotlightCard
                className="!p-0 !bg-[#0a0a0a] !border-white/10 cursor-pointer hover:!border-white/20 transition-colors"
                spotlightColor="rgba(255, 255, 255, 0.1)"
            >
                {/* Header */}
                <div className="p-6 md:p-8">
                    <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white">
                                {phaseIcons[phase.id] || phase.icon}
                            </div>
                            <div>
                                <span className="text-xs font-bold tracking-widest uppercase text-white/40">
                                    {phase.phase}
                                </span>
                                <h3 className="text-xl font-bold text-white">{phase.title}</h3>
                                <p className="text-sm text-neutral-400">{phase.description}</p>
                            </div>
                        </div>
                        <span className="text-xs font-mono text-neutral-500 hidden sm:block">{phase.duration}</span>
                    </div>

                    {/* Summary Preview */}
                    <div className="space-y-2 mt-4">
                        {phase.summary.slice(0, 2).map((item, idx) => (
                            <div key={idx} className="flex items-start gap-2">
                                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-white/30 flex-shrink-0" />
                                <span className="text-sm text-neutral-400 line-clamp-1">{item}</span>
                            </div>
                        ))}
                    </div>

                    <div className="mt-4 text-xs text-neutral-500 font-mono">
                        (Ấn để xem chi tiết)
                    </div>
                </div>
            </SpotlightCard>
        </motion.div>
    );
}

export default function RoadmapPage() {
    const [selectedStage, setSelectedStage] = useState<RoadmapPhase | null>(null);

    return (
        <main className="min-h-screen bg-neutral-950 text-white pt-24 pb-16">
            <div className="container mx-auto px-6 max-w-4xl">
                {/* Header */}
                <div className="text-center mb-16">
                    <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-white/60 mb-6">
                        LỘ TRÌNH 12 THÁNG
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        Từ "Mất Gốc" đến Kỹ Sư IT
                    </h1>
                    <p className="text-neutral-400 max-w-2xl mx-auto">
                        Lộ trình 12 tháng xây dựng lại nền tảng CNTT từ con số không. Không đi tắt, không phụ thuộc AI.
                    </p>
                </div>

                {/* Timeline */}
                <div className="space-y-6">
                    {roadmapData.map((phase, index) => (
                        <PhaseCard
                            key={phase.id}
                            phase={phase}
                            index={index}
                            onSelect={() => setSelectedStage(phase)}
                        />
                    ))}
                </div>

                {/* CTA */}
                <div className="text-center mt-16">
                    <p className="text-neutral-500 text-sm mb-4">Sẵn sàng bắt đầu hành trình?</p>
                    <a
                        href="/assessment"
                        className="inline-block px-8 py-3 bg-white text-neutral-950 font-semibold rounded-full hover:bg-neutral-200 transition-colors"
                    >
                        Đánh giá năng lực ngay
                    </a>
                </div>
            </div>

            {/* Stage Detail Modal */}
            <StageDetailModal
                stage={selectedStage}
                onClose={() => setSelectedStage(null)}
            />
        </main>
    );
}
