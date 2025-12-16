'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Map, Library, Book, Wrench, Github, Youtube, Facebook } from 'lucide-react';

const navItems = [
    { name: 'Trang Chủ', href: '/', icon: Home },
    { name: 'Lộ Trình', href: '/roadmap', icon: Map },
    { name: 'Tài Nguyên', href: '/resources', icon: Library },
    { name: 'Wiki', href: '/wiki', icon: Book },
    { name: 'Công Cụ', href: '/tools', icon: Wrench },
];

const socialItems = [
    { icon: Facebook, href: 'https://www.facebook.com/thankscong/' },
    { icon: Github, href: 'https://github.com/NgaiCong' },
];

const customCubic: any = [0.4, 0.01, 0.165, 0.99];

export default function MobileNavbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isOpen]);

    return (
        <div className="xl:hidden">
            <motion.header
                className={`fixed top-0 left-0 w-full z-[100] overflow-hidden ${isOpen ? 'bg-black' : (scrolled ? 'bg-black/60 backdrop-blur-xl border-b border-white/10' : 'bg-transparent')}`}
                initial={false}
                animate={{
                    height: isOpen ? '100dvh' : '70px',
                    backgroundColor: isOpen ? '#050505' : (scrolled ? 'rgba(5,5,5,0.6)' : 'rgba(0,0,0,0)')
                }}
                transition={{
                    duration: 0.6,
                    ease: customCubic,
                }}
            >
                <div className="relative h-[70px] flex items-center justify-between px-6 z-[102] safe-area-top">
                    <div className="flex items-center">
                        <Link href="/" onClick={() => setIsOpen(false)} className={`transition-all duration-500 ${isOpen ? 'opacity-0 -translate-x-4 pointer-events-none' : 'opacity-100 translate-x-0'}`}>
                            <img
                                src="/images/logongang.png"
                                alt="IT Journey"
                                className="h-9 w-auto object-contain drop-shadow-lg"
                            />
                        </Link>
                    </div>

                    <div
                        className="relative w-[50px] h-[50px] flex items-center justify-center cursor-pointer group"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <div className="relative w-[24px] h-[10px]">
                            {/* Top Bar */}
                            <motion.span
                                className="absolute block w-full h-[1.5px] bg-white top-0 rounded-full"
                                animate={{
                                    y: isOpen ? 5 : 0,
                                    rotate: isOpen ? 45 : 0,
                                    backgroundColor: isOpen ? '#ffffff' : '#ffffff'
                                }}
                                transition={{ duration: 0.4, ease: customCubic }}
                            />
                            {/* Bottom Bar */}
                            <motion.span
                                className="absolute block w-full h-[1.5px] bg-white bottom-0 rounded-full"
                                animate={{
                                    y: isOpen ? -3.5 : 0,
                                    rotate: isOpen ? -45 : 0,
                                    backgroundColor: isOpen ? '#ffffff' : '#ffffff'
                                }}
                                transition={{ duration: 0.4, ease: customCubic }}
                            />
                        </div>
                    </div>
                </div>

                {/* Menu Items Container */}
                <div className="absolute top-0 left-0 w-full h-full pt-[110px] pb-10 px-8 flex flex-col justify-between">
                    <ul className={`list-none p-0 m-0 flex flex-col gap-4 ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
                        {navItems.map((item, i) => (
                            <motion.li
                                key={item.name}
                                className="border-b border-white/5 pb-2"
                                initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
                                animate={{
                                    opacity: isOpen ? 1 : 0,
                                    y: isOpen ? 0 : 40,
                                    filter: isOpen ? "blur(0px)" : "blur(10px)"
                                }}
                                transition={{
                                    duration: 0.7,
                                    ease: customCubic,
                                    delay: isOpen ? (0.1 * i + 0.2) : 0
                                }}
                            >
                                <Link
                                    href={item.href}
                                    onClick={() => setIsOpen(false)}
                                    className="flex items-center gap-4 text-white hover:text-white/70 transition-colors group"
                                >
                                    <span className="font-sans text-3xl md:text-4xl font-bold tracking-tight">{item.name}</span>
                                    <motion.div
                                        className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                                    >
                                        <item.icon className="w-6 h-6 text-neutral-400" />
                                    </motion.div>
                                </Link>
                            </motion.li>
                        ))}
                    </ul>

                    {/* Socials / Extra Content */}
                    <div className={`flex flex-col gap-6 ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
                        <motion.div
                            className="bg-white/5 rounded-2xl p-6 border border-white/10 backdrop-blur-sm"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : 20 }}
                            transition={{ delay: 0.6, duration: 0.6 }}
                        >
                            <p className="text-neutral-400 text-sm mb-4 uppercase tracking-widest font-medium">Connect Socials</p>
                            <div className="flex gap-6">
                                {socialItems.map((s, i) => (
                                    <a
                                        key={i}
                                        href={s.href}
                                        target="_blank"
                                        className="text-white hover:text-neutral-300 transition-colors p-2 bg-white/5 rounded-full hover:bg-white/10"
                                    >
                                        <s.icon size={24} />
                                    </a>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </motion.header>
        </div>
    );
}
