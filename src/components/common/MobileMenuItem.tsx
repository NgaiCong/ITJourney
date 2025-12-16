'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface MobileMenuItemProps {
    href: string;
    label: string;
    icon?: LucideIcon;
    index: number;
    onClick?: () => void;
}

export default function MobileMenuItem({ href, label, icon: Icon, index, onClick }: MobileMenuItemProps) {
    return (
        <motion.li
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ delay: index * 0.05 + 0.1, duration: 0.3 }}
            className="w-full"
        >
            <Link
                href={href}
                onClick={onClick}
                className="group flex items-center gap-4 py-4 px-4 rounded-xl hover:bg-white/5 active:bg-white/10 transition-colors w-full"
            >
                {Icon && (
                    <div className="p-2 rounded-lg bg-white/5 border border-white/10 group-hover:bg-white/10 group-hover:border-white/20 transition-colors">
                        <Icon className="w-5 h-5 text-neutral-400 group-hover:text-white transition-colors" />
                    </div>
                )}
                <span className="text-xl md:text-2xl font-light tracking-wide text-neutral-300 group-hover:text-white transition-colors">
                    {label}
                </span>
                <div className="ml-auto opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300 text-white/50">
                    →
                </div>
            </Link>
        </motion.li>
    );
}
