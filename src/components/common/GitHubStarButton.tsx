'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface GitHubStarButtonProps {
    className?: string;
}

export default function GitHubStarButton({ className }: GitHubStarButtonProps) {
    const [stars, setStars] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStars = async () => {
            try {
                // Fetching from NgaiCong/ITJourney repository
                const response = await fetch('https://api.github.com/repos/NgaiCong/ITJourney');
                if (response.ok) {
                    const data = await response.json();
                    setStars(data.stargazers_count);
                } else {
                    console.warn('Failed to fetch GitHub stars');
                }
            } catch (error) {
                console.error('Error fetching GitHub stars:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStars();
    }, []);

    return (
        <Link
            href="https://github.com/NgaiCong/ITJourney"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
                "relative flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-black/20 hover:bg-white/5 transition-all duration-300 group overflow-hidden",
                className
            )}
        >
            {/* Subtle Gradient Glow Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/0 via-yellow-500/5 to-yellow-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />

            <span className="hidden lg:inline-block font-medium text-neutral-300 group-hover:text-white transition-colors">
                Star on GitHub
            </span>

            <div className="hidden lg:block w-px h-3 bg-white/10" />

            <motion.div
                whileHover={{ scale: 1.1, rotate: 10 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
                <Star
                    className="w-4 h-4 text-yellow-500 fill-yellow-500/20 group-hover:fill-yellow-500 transition-colors duration-300"
                />
            </motion.div>

            <span className="text-sm font-medium text-neutral-300 group-hover:text-white transition-colors">
                {loading ? (
                    <span className="inline-block w-4 h-4 bg-white/10 rounded animate-pulse" />
                ) : (
                    stars !== null ? stars.toLocaleString() : 'Star'
                )}
            </span>
        </Link>
    );
}
