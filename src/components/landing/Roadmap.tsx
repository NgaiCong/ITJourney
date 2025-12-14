'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { cn } from '@/lib/utils'
import { ChevronDown } from 'lucide-react'
import { landingRoadmapData } from '@/data/landing-roadmap'
import SpotlightCard from '../ui/SpotlightCard'

export default function Roadmap() {
    const containerRef = useRef(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end end"]
    })

    const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1])

    return (
        <section id="roadmap" className="relative py-32 px-4 md:px-0 bg-neutral-950 overflow-hidden" ref={containerRef}>
            {/* Subtle background glow - black/white theme */}
            <div className="absolute top-1/4 right-0 w-[30vw] h-[30vw] bg-white/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-1/4 left-0 w-[30vw] h-[30vw] bg-white/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-6xl mx-auto relative">
                {/* Timeline - black/white gradient */}
                <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] md:w-[2px] bg-neutral-800 -translate-x-1/2">
                    <motion.div
                        style={{ scaleY, transformOrigin: "top" }}
                        className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white via-neutral-400 to-neutral-800"
                    />
                </div>

                {landingRoadmapData.map((item, index) => (
                    <RoadmapNode key={item.id} data={item} index={index} />
                ))}
            </div>
        </section>
    )
}

const RoadmapNode = ({ data, index }: { data: any, index: number }) => {
    const ref = useRef(null)
    const [isOpen, setIsOpen] = useState(false)
    const hasSelectionRef = useRef(false)

    return (
        <div ref={ref} className={cn("relative flex flex-col md:flex-row items-center justify-between w-full mb-24 md:mb-40", index % 2 === 0 ? '' : 'md:flex-row-reverse')}>

            {/* Timeline Connector Dot */}
            <div className="absolute left-4 md:left-1/2 top-0 -translate-x-1/2 flex items-center justify-center w-8 h-8 md:w-12 md:h-12 rounded-full bg-neutral-950 border border-white/20 z-20">
                <div className="w-3 h-3 rounded-full bg-white" />
            </div>

            {/* Content Card with SpotlightCard */}
            <motion.div
                className={cn("w-full md:w-[42%] relative z-10 cursor-pointer pl-12 md:pl-0")}
                initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.8, delay: index * 0.1, type: "spring", bounce: 0.4 }}
                viewport={{ once: true, margin: "-50px" }}
                onMouseDown={() => {
                    const selection = window.getSelection();
                    hasSelectionRef.current = !!selection && selection.toString().length > 0;
                }}
                onClick={(e) => {
                    const selection = window.getSelection();
                    const isSelecting = !!selection && selection.toString().length > 0;

                    // Prevent toggle if currently selecting OR if clicked to clear an existing selection
                    if (isSelecting || hasSelectionRef.current) return;

                    setIsOpen(!isOpen);
                }}
            >
                <SpotlightCard
                    className="!p-0 !bg-[#111] !border-[#222]"
                    spotlightColor="rgba(255, 255, 255, 0.15)"
                >
                    {/* Top accent line */}
                    <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-white/30 to-transparent" />

                    <div className="p-6 md:p-8">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-xs font-bold tracking-widest uppercase text-white/60">
                                {data.phase}
                            </span>
                            <span className="text-xs font-mono text-neutral-500">{data.duration}</span>
                        </div>

                        <h3 className="text-2xl font-bold text-white mb-3 flex items-center gap-3">
                            {data.title}
                            <ChevronDown className={cn("w-5 h-5 text-white/50 transition-transform", isOpen && "rotate-180")} />
                        </h3>

                        <p className="text-neutral-400 text-sm leading-relaxed mb-6">
                            {data.description}
                        </p>

                        {/* Summary View */}
                        {!isOpen && (
                            <div className="space-y-3">
                                {data.summary.map((detail: string, idx: number) => (
                                    <div key={idx} className="flex items-start gap-3">
                                        <div className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 bg-white/40" />
                                        <span className="text-sm text-neutral-300 font-light line-clamp-1">{detail}</span>
                                    </div>
                                ))}
                                <div className="mt-4 text-xs text-neutral-500 font-mono">
                                    (Ấn để xem chi tiết từng tháng)
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Expanded View */}
                    <AnimatePresence>
                        {isOpen && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden border-t border-white/10 bg-black/30 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:none]"
                            >
                                <div className="p-8 space-y-8">
                                    {data.detailedRoadmap.map((month: any, mIdx: number) => (
                                        <div key={mIdx} className="relative pl-6 border-l border-white/20">
                                            <div className="absolute left-[-5px] top-0 w-2.5 h-2.5 rounded-full bg-white" />
                                            <h4 className="text-sm font-bold text-white mb-1 uppercase tracking-wider">{month.time}</h4>
                                            <h5 className="text-lg font-medium text-neutral-200 mb-3">{month.focus}</h5>
                                            <ul className="space-y-2">
                                                {month.tasks.map((task: string, tIdx: number) => (
                                                    <li key={tIdx} className="text-sm text-neutral-400 leading-relaxed flex items-start gap-2">
                                                        <span className="mt-1.5 w-1 h-1 rounded-full bg-neutral-500 flex-shrink-0" />
                                                        {task}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </SpotlightCard>
            </motion.div>

            {/* Empty Div for Layout Balance */}
            <div className="hidden md:block w-[42%]" />
        </div>
    )
}
