import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Subtitle } from '@/data/transcripts/linear-algebra-1';

interface SubtitleOverlayProps {
    currentTime: number;
    transcript?: Subtitle[];
    isEnabled: boolean;
}

export default function SubtitleOverlay({ currentTime, transcript, isEnabled }: SubtitleOverlayProps) {
    if (!isEnabled || !transcript) return null;

    const currentSubtitle = useMemo(() => {
        return transcript.find(sub => currentTime >= sub.start && currentTime < sub.end);
    }, [currentTime, transcript]);

    return (
        <div className="absolute bottom-16 left-0 right-0 z-20 pointer-events-none flex justify-center px-4">
            <AnimatePresence mode="wait">
                {currentSubtitle && (
                    <motion.div
                        key={currentSubtitle.text}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="bg-black/70 backdrop-blur-md px-6 py-3 rounded-xl border border-white/10 shadow-2xl max-w-3xl text-center"
                    >
                        <p className="text-xl md:text-2xl font-medium text-yellow-300 drop-shadow-md leading-relaxed">
                            {currentSubtitle.text}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
