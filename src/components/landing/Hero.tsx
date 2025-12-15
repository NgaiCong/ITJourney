'use client'

import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import LightRays from '@/components/ui/LightRays'
import RotatingText from '@/components/ui/RotatingText'


export default function Hero() {
    return (
        <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden bg-black">
            <div className="absolute inset-0 bg-black">
                <div className="absolute inset-0 z-0 opacity-100">
                    <LightRays
                        raysOrigin="top-center"
                        raysColor="#ffffff"
                        raysSpeed={1.5}
                        lightSpread={0.8}
                        rayLength={1.2}
                        followMouse={true}
                        mouseInfluence={0.1}
                        noiseAmount={0.0}
                        distortion={0.0}
                        className="w-full h-full"
                    />
                </div>
            </div>

            <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                </motion.div>

                <motion.h1
                    className="text-4xl md:text-7xl font-bold tracking-tighter text-white mb-10 leading-[1.2] flex flex-row flex-wrap items-center justify-center gap-x-3 md:gap-x-4"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.2, type: "spring" }}
                >
                    <span className="">Xây Dựng Lại</span>
                    <div className="flex items-center justify-center gap-2 md:gap-4 overflow-hidden py-2" style={{ minWidth: '300px' }}>
                        <RotatingText
                            texts={['Gốc Rễ', 'Tư Duy', 'Tương Lai', 'Sự Nghiệp']}
                            mainClassName="bg-white text-black px-3 md:px-6 py-2 md:py-3 rounded-xl md:rounded-2xl overflow-hidden justify-center"

                            staggerFrom="last"
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            exit={{ y: "-120%" }}
                            staggerDuration={0.025}
                            splitLevelClassName="overflow-hidden py-1 sm:py-2"

                            transition={{ type: "spring", damping: 30, stiffness: 400 }}
                            rotationInterval={2000}
                        />
                    </div>
                </motion.h1>



                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="flex items-center justify-center gap-6"
                >
                    <a
                        href="#roadmap"
                        className="px-8 py-3 bg-white text-neutral-950 font-semibold rounded-full hover:bg-neutral-200 transition-colors"
                    >
                        Bắt đầu ngay
                    </a>
                    <a
                        href="/roadmap"
                        className="px-8 py-3 bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold rounded-full hover:bg-white/20 transition-all hover:scale-105 active:scale-95"
                    >
                        Xem chi tiết lộ trình
                    </a>
                </motion.div>
            </div>

            <motion.div
                className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/30"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                <ChevronDown className="w-6 h-6" />
            </motion.div>
        </section>
    )
}
