'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Code, Brain, Rocket } from 'lucide-react';
import GlassSurface from '@/components/ui/GlassSurface';
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
            <GlassSurface
                width="100%"
                height="auto"
                borderRadius={20}
                opacity={0.6}
                className="cursor-pointer hover:border-emerald-500/50 transition-all duration-300 hover:scale-[1.02] border border-white/10 group"
            >
                <div className="p-6 md:p-8 w-full">
                    <div className="flex flex-col md:flex-row gap-6 md:items-start mb-6">
                        {/* Icon Box */}
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/5 flex items-center justify-center border border-emerald-500/20 shrink-0 group-hover:scale-110 transition-transform duration-500 shadow-[0_0_20px_rgba(16,185,129,0.1)] group-hover:shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                            <div className="text-emerald-400">
                                {phaseIcons[phase.id]}
                            </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 space-y-2">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                    {phase.phase}
                                </span>
                            </div>
                            <h3 className="text-2xl font-bold text-white group-hover:text-emerald-300 transition-colors">{phase.title}</h3>
                            <p className="text-sm text-neutral-300 leading-relaxed">{phase.description}</p>
                        </div>
                    </div>

                    {/* Summary Preview */}
                    <div className="space-y-3 pl-2 border-l-2 border-white/5 group-hover:border-emerald-500/30 transition-colors">
                        {phase.summary.slice(0, 3).map((item, idx) => (
                            <div key={idx} className="flex items-start gap-3">
                                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-emerald-500/50 flex-shrink-0" />
                                <span className="text-sm text-neutral-400 group-hover:text-neutral-300 transition-colors">{item}</span>
                            </div>
                        ))}
                    </div>

                    <div className="mt-6 flex items-center text-xs text-emerald-500/70 font-medium opacity-60 group-hover:opacity-100 transition-opacity">
                        <span className="mr-2">Xem chi tiết lộ trình</span>
                        <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </div>
                </div>
            </GlassSurface>
        </motion.div>
    );
}

import Silk from '@/components/ui/Silk';
import TextType from '@/components/ui/TextType';
import BlurText from '@/components/ui/BlurText';

export default function RoadmapPage() {
    const [selectedStage, setSelectedStage] = useState<RoadmapPhase | null>(null);

    return (
        <main className="min-h-screen bg-[#0a0a0a] text-white pt-36 pb-16 relative overflow-hidden">
            {/* Background Effect */}
            <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
                <Silk
                    color="#047857" // Emerald-700
                    speed={5.0} // Faster
                    scale={1.2}
                    noiseIntensity={0.5}
                />
            </div>

            <div className="container mx-auto px-6 max-w-4xl relative z-10">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight text-center">
                        <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                            IT JOURNEY ROADMAP
                        </span>
                    </h1>

                    <div className="h-[60px] md:h-[40px] flex items-center justify-center">
                        <TextType
                            text={[
                                "Xây dựng nền tảng tư duy Khoa học Máy tính vững chắc.",
                                "Làm chủ công nghệ cốt lõi.",
                                "Trở thành kỹ sư phần mềm thực thụ."
                            ]}
                            typingSpeed={50}
                            deletingSpeed={30}
                            pauseDuration={2000}
                            loop={true}
                            cursorCharacter="|"
                            className="text-lg md:text-xl text-neutral-300 max-w-2xl mx-auto font-light leading-relaxed"
                        />
                    </div>    </div>

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
                        className="inline-block px-8 py-3 bg-white text-emerald-950 font-bold rounded-full hover:bg-emerald-50 transition-colors shadow-lg shadow-emerald-900/20"
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
