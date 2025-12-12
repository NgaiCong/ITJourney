'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function NotFound() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);
    const [isBlinking, setIsBlinking] = useState(false);
    const [isIdle, setIsIdle] = useState(false);

    useEffect(() => {
        // Blinking Logic
        const blinkInterval = setInterval(() => {
            setIsBlinking(true);
            setTimeout(() => setIsBlinking(false), 200);
        }, 3000 + Math.random() * 2000);

        // Movement Logic
        let lastMoveTime = Date.now();
        let idleCheckInterval: NodeJS.Timeout;
        let wanderInterval: NodeJS.Timeout;

        const startWandering = () => {
            // Move eyes randomly
            setMousePosition({
                x: (Math.random() * 1.6 - 0.8),
                y: (Math.random() * 1.6 - 0.8)
            });
        };

        const handleMouseMove = (e: MouseEvent) => {
            lastMoveTime = Date.now();
            setIsIdle(false);

            // Normalize -1 to 1
            const x = (e.clientX / window.innerWidth) * 2 - 1;
            const y = (e.clientY / window.innerHeight) * 2 - 1;
            setMousePosition({ x, y });
        };

        // Detect Touch/Mobile explicitly or fallback to idle
        const isTouch = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);

        if (isTouch) {
            // Immediate random movement loop for touch devices
            setIsIdle(true);
            wanderInterval = setInterval(startWandering, 2000);
        } else {
            // Desktop: Watch for mouse, if no move for 3s, wander
            window.addEventListener('mousemove', handleMouseMove);

            idleCheckInterval = setInterval(() => {
                if (Date.now() - lastMoveTime > 3000) {
                    setIsIdle(true);
                    startWandering(); // Trigger a move immediately
                }
            }, 2000);
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            clearInterval(blinkInterval);
            clearInterval(idleCheckInterval);
            clearInterval(wanderInterval);
        };
    }, []);

    // Eye movement logic
    const eyeMovement = {
        x: mousePosition.x * (typeof window !== 'undefined' && window.innerWidth < 768 ? 15 : 30),
        y: mousePosition.y * (typeof window !== 'undefined' && window.innerWidth < 768 ? 15 : 30)
    };

    return (
        <main className="min-h-[100dvh] w-full bg-[#121212] text-white flex flex-col items-center justify-center relative overflow-hidden px-4 pb-[env(safe-area-inset-bottom)]">

            {/* Eyes Container */}
            <div className="flex gap-[4vmin] md:gap-[3vw] mb-[5vh] md:mb-12">
                {/* Left Eye */}
                <motion.div
                    className="w-[35vmin] h-[35vmin] max-w-[200px] max-h-[200px] md:w-[25vw] md:h-[25vw] md:max-w-[500px] md:max-h-[500px] bg-white rounded-full flex items-center justify-center overflow-hidden relative shadow-[0_0_50px_rgba(255,255,255,0.1)]"
                    animate={{ scaleY: isBlinking ? 0.1 : 1 }}
                    transition={{ duration: 0.1 }}
                >
                    <motion.div
                        className="w-[35%] h-[35%] bg-black rounded-full absolute"
                        animate={eyeMovement}
                        transition={{ type: 'spring', stiffness: 120, damping: 20 }}
                    />
                </motion.div>
                {/* Right Eye */}
                <motion.div
                    className="w-[35vmin] h-[35vmin] max-w-[200px] max-h-[200px] md:w-[25vw] md:h-[25vw] md:max-w-[500px] md:max-h-[500px] bg-white rounded-full flex items-center justify-center overflow-hidden relative shadow-[0_0_50px_rgba(255,255,255,0.1)]"
                    animate={{ scaleY: isBlinking ? 0.1 : 1 }}
                    transition={{ duration: 0.1 }}
                >
                    <motion.div
                        className="w-[35%] h-[35%] bg-black rounded-full absolute"
                        animate={eyeMovement}
                        transition={{ type: 'spring', stiffness: 120, damping: 20 }}
                    />
                </motion.div>
            </div>

            {/* Text Content */}
            <motion.div
                className="text-center z-10 space-y-6 md:space-y-8 max-w-[90vw] mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
            >
                <h1 className="text-[clamp(1.5rem,5vw,5rem)] font-bold tracking-tight text-[#e0e0e0] leading-tight">
                    404, Page Not Found.
                </h1>

                <Link
                    href="/"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    className="inline-block"
                >
                    <motion.button
                        className="px-6 py-3 md:px-8 md:py-4 bg-black text-white text-sm md:text-xl rounded-full border border-white/10 hover:bg-white hover:text-black transition-colors duration-300 relative overflow-hidden"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <span className="relative z-10 font-sans font-medium">Please Take Me Home</span>
                    </motion.button>
                </Link>
            </motion.div>

        </main>
    );
}
