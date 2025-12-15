'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const features = [
    {
        title: "Phase 1: The Foundation",
        desc: "C++, Memory Management, Algorithms.",
        color: "from-luxury-onyx to-luxury-charcoal"
    },
    {
        title: "Phase 2: The Architecture",
        desc: "System Design, Databases, Networking.",
        color: "from-luxury-charcoal to-luxury-onyx"
    },
    {
        title: "Phase 3: The Stack",
        desc: "Modern Web, Cloud Native, DevOps.",
        color: "from-luxury-onyx to-luxury-charcoal"
    },
    {
        title: "Phase 4: The Mastery",
        desc: "Contribution, Leadership, Innovation.",
        color: "from-luxury-charcoal to-luxury-onyx"
    }
]

export default function FeatureGallery() {
    const targetRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: targetRef,
    })

    const x = useTransform(scrollYProgress, [0, 1], ["1%", "-75%"])

    return (
        <section ref={targetRef} className="relative h-[300vh] bg-background">
            <div className="sticky top-0 flex h-screen items-center overflow-hidden">
                <motion.div style={{ x }} className="flex gap-12 px-12 md:px-24">

                    <div className="w-[50vw] md:w-[30vw] shrink-0 flex flex-col justify-center">
                        <h2 className="text-display-giant text-luxury-silver leading-[0.8]">
                            THE<br />PATH
                        </h2>
                        <p className="mt-8 text-muted-foreground text-xl">A 12-Month Odyssey.</p>
                    </div>

                    {features.map((feature, i) => (
                        <div
                            key={i}
                            className="group relative w-[80vw] md:w-[40vw] lg:w-[30vw] aspect-[3/4] shrink-0 overflow-hidden bg-card border border-white/5 p-8 flex flex-col justify-end transition-colors hover:border-luxury-gold/30"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                            <div className="relative z-10">
                                <span className="text-xs uppercase tracking-[0.3em] text-luxury-gold mb-4 block">Stage 0{i + 1}</span>
                                <h3 className="text-3xl md:text-4xl font-bold mb-4">{feature.title}</h3>
                                <p className="text-muted-foreground">{feature.desc}</p>
                            </div>


                            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-luxury-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-[0.16,1,0.3,1] origin-left" />
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
