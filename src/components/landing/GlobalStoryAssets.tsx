'use client';

import { motion, useScroll, useTransform } from 'framer-motion';

export default function GlobalStoryAssets() {
    const { scrollYProgress } = useScroll();

    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">

            {/* 1. Glasses - "Lạc Lối" - Spying from top left early on */}
            <motion.img
                src="/assets/glasses.png"
                alt="Pixel Glasses"
                className="absolute w-16 md:w-32 rotate-[-15deg] left-[5%] top-[15%]"
                style={{
                    opacity: useTransform(scrollYProgress, [0.02, 0.08, 0.15, 0.2], [0, 1, 1, 0]),
                    y: useTransform(scrollYProgress, [0.02, 0.2], [-50, 100]),
                    x: useTransform(scrollYProgress, [0.02, 0.2], [0, 30]),
                    rotate: useTransform(scrollYProgress, [0.02, 0.2], [-15, 0]),
                }}
            />

            {/* 2. Gun - "Khủng Hoảng/Tỉnh Thức" - Floating in the void */}
            <motion.img
                src="/assets/gun.gif"
                alt="Decoration"
                className="absolute left-[3%] bottom-[40%] w-24 md:w-56 mix-blend-screen"
                style={{
                    opacity: useTransform(scrollYProgress, [0.25, 0.3, 0.4, 0.5], [0, 0.6, 0.6, 0]),
                    x: useTransform(scrollYProgress, [0.25, 0.5], [-100, 50]),
                }}
            />

            {/* 3. Statue - "Kiến Tạo" - The classical foundation */}
            <motion.img
                src="/assets/statue.png"
                alt="Classical Statue"
                className="absolute right-[-25%] md:right-[-5%] bottom-[-10%] h-[45vh] md:h-[80vh] object-contain mix-blend-luminosity grayscale opacity-60"
                style={{
                    opacity: useTransform(scrollYProgress, [0.5, 0.6, 0.75, 0.85], [0, 0.5, 0.5, 0]),
                    y: useTransform(scrollYProgress, [0.5, 0.85], [100, -50]),
                    scale: useTransform(scrollYProgress, [0.5, 0.85], [1, 1.1]),
                }}
            />

            {/* 4. Phone - "Di Sản / Kết Nối" - The tools of the future */}
            <motion.img
                src="/assets/phone.png"
                alt="Retro Phone"
                className="absolute right-[20%] top-[40%] w-16 md:w-32 blur-[0.5px]"
                style={{
                    opacity: useTransform(scrollYProgress, [0.85, 0.9, 0.98, 1], [0, 1, 1, 0]),
                    y: useTransform(scrollYProgress, [0.85, 1], [50, -50]),
                    rotate: useTransform(scrollYProgress, [0.85, 1], [0, 25]),
                    scale: useTransform(scrollYProgress, [0.85, 1], [0.8, 1.2]),
                }}
            />
        </div>
    );
}
