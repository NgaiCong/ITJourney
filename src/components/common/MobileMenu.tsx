'use client';

import { motion, AnimatePresence } from 'framer-motion';
import MobileMenuItem from './MobileMenuItem';
import { LucideIcon, Facebook, Youtube, Share2 } from 'lucide-react';

interface NavItem {
    name: string;
    href: string;
    icon: LucideIcon;
}

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
    navItems: NavItem[];
}

export default function MobileMenu({ isOpen, onClose, navItems }: MobileMenuProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-md z-[90]"
                    />

                    {/* Menu Content */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="fixed inset-x-0 top-[72px] bottom-0 z-[95] bg-black/80 backdrop-blur-xl border-t border-white/10 flex flex-col p-6 overflow-y-auto"
                    >
                        <nav className="flex-1 flex flex-col gap-2">
                            <ul className="space-y-1">
                                {navItems.map((item, index) => (
                                    <MobileMenuItem
                                        key={item.name}
                                        index={index}
                                        {...item}
                                        label={item.name}
                                        onClick={onClose}
                                    />
                                ))}
                            </ul>
                        </nav>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="mt-8 pt-8 border-t border-white/10"
                        >
                            <h3 className="text-sm font-medium text-neutral-500 mb-4 uppercase tracking-wider">Socials</h3>
                            <div className="flex gap-4">
                                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 rounded-full text-neutral-400 hover:text-white hover:bg-white/10 transition-colors">
                                    <Facebook className="w-5 h-5" />
                                </a>
                                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 rounded-full text-neutral-400 hover:text-white hover:bg-white/10 transition-colors">
                                    <Youtube className="w-5 h-5" />
                                </a>
                                <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 rounded-full text-neutral-400 hover:text-white hover:bg-white/10 transition-colors">
                                    <Share2 className="w-5 h-5" />
                                </a>
                            </div>
                            <div className="mt-8 text-neutral-600 text-xs">
                                © 2024 IT Journey. All rights reserved.
                            </div>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
