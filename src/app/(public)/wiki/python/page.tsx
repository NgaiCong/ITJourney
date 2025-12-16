'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, ChevronRight, ArrowRight, Calendar, Building, ExternalLink, Quote, Code, Lightbulb, Users, Zap, BookOpen, Heart, Gift, Terminal } from 'lucide-react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const HeroParallax = () => {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 50, damping: 10 });
    const mouseY = useSpring(y, { stiffness: 50, damping: 10 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const { left, top, width, height } = ref.current?.getBoundingClientRect() ?? { left: 0, top: 0, width: 0, height: 0 };
        const center = { x: left + width / 2, y: top + height / 2 };
        x.set((e.clientX - center.x) / 30);
        y.set((e.clientY - center.y) / 30);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => { x.set(0); y.set(0); }}
            className="text-center max-w-5xl mx-auto cursor-default perspective-1000"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
        >
            <motion.div
                style={{ rotateX: mouseY, rotateY: mouseX }}
                className="relative inline-flex items-center justify-center w-40 h-40 mb-10 group"
            >
                <div className="absolute inset-0 bg-blue-500/30 rounded-full blur-[50px] group-hover:blur-[80px] transition-all duration-700" />
                <div className="absolute inset-0 bg-yellow-500/20 rounded-full blur-[50px] translate-x-4 translate-y-4 group-hover:translate-x-8 group-hover:translate-y-8 transition-all duration-700" />
                <motion.div
                    className="relative z-10 w-32 h-32 drop-shadow-[0_0_25px_rgba(59,130,246,0.6)]"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                >
                    <Image
                        src="https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg"
                        alt="Python Logo"
                        fill
                        className="object-contain"
                    />
                </motion.div>
            </motion.div>

            <h1 className="text-5xl md:text-8xl font-black tracking-tight mb-8 leading-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-400 to-yellow-400 drop-shadow-[0_0_40px_rgba(59,130,246,0.4)]">
                    Python
                </span>
                <br />
                <span className="text-3xl md:text-4xl text-white/80 font-light block mt-4">
                    Từ dự án Giáng sinh <br className="hidden md:block" /> đến thống trị thế giới AI
                </span>
            </h1>
        </motion.div>
    );
};

const InteractiveTerminal = () => {
    const [lines, setLines] = useState<string[]>([]);
    const [isRunning, setIsRunning] = useState(false);

    const zen = [
        "Beautiful is better than ugly.",
        "Explicit is better than implicit.",
        "Simple is better than complex.",
        "Complex is better than complicated.",
        "Readability counts.",
        "There should be one-- and preferably only one --obvious way to do it.",
    ];

    const runZen = async () => {
        if (isRunning) return;
        setIsRunning(true);
        setLines(["> python3", ">>> import this"]);

        for (let i = 0; i < zen.length; i++) {
            await new Promise(r => setTimeout(r, 800));
            setLines(prev => [...prev, zen[i]]);
        }
        await new Promise(r => setTimeout(r, 1000));
        setLines(prev => [...prev, ">>> "]);
        setIsRunning(false);
    };

    return (
        <div className="bg-[#1e1e1e] rounded-xl overflow-hidden border border-white/10 shadow-2xl font-mono text-sm md:text-base max-w-3xl mx-auto text-left group hover:border-blue-500/30 transition-all">
            <div className="flex items-center gap-2 px-4 py-3 bg-[#2d2d2d] border-b border-white/5">
                <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <div className="text-neutral-400 ml-2 text-xs">zen_of_python.py</div>
                <button
                    onClick={runZen}
                    disabled={isRunning}
                    className="ml-auto flex items-center gap-1.5 px-3 py-1 bg-green-600/20 text-green-400 hover:bg-green-600/30 rounded text-xs transition-colors disabled:opacity-50"
                >
                    <Terminal className="w-3 h-3" />
                    {isRunning ? 'Running...' : 'Run'}
                </button>
            </div>
            <div className="p-6 h-[320px] overflow-y-auto text-neutral-300 space-y-2">
                {!lines.length && !isRunning && (
                    <div className="flex flex-col items-center justify-center h-full text-neutral-500 gap-4">
                        <Terminal className="w-12 h-12 opacity-50" />
                        <p>Click "Run" to reveal The Zen of Python</p>
                    </div>
                )}
                {lines.map((line, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={line.startsWith('>') || line.startsWith('>>>') ? "text-blue-400 font-bold" : "text-green-300"}
                    >
                        {line}
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

const TiltCard = ({ children, className }: { children: React.ReactNode, className?: string }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useTransform(y, [-100, 100], [10, -10]);
    const rotateY = useTransform(x, [-100, 100], [-10, 10]);

    function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
        const rect = event.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct * 200);
        y.set(yPct * 200);
    }

    function handleMouseLeave() {
        x.set(0);
        y.set(0);
    }

    return (
        <motion.div
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={`relative transition-all duration-200 ease-linear ${className}`}
        >
            <div style={{ transform: "translateZ(20px)" }}>
                {children}
            </div>
        </motion.div>
    );
};

export default function PythonIntroPage() {
    return (
        <main className="min-h-screen bg-[#0a0a0a] text-white pt-24 pb-16 overflow-hidden">
            <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
                {/* Back Button */}
                <Link
                    href="/wiki"
                    className="inline-flex items-center gap-2 text-sm font-medium text-neutral-400 hover:text-white mb-8 transition-colors group px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/5"
                >
                    <ChevronRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
                    Back to Wiki Library
                </Link>

                {/* Hero Section */}
                <div className="relative mb-32">
                    <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-[120px] -z-10 pointer-events-none animate-pulse" />
                    <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-yellow-500/10 rounded-full blur-[100px] -z-10 pointer-events-none" />

                    <HeroParallax />

                    {/* Compelling Opening Quote */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 1 }}
                        className="relative max-w-4xl mx-auto mb-12"
                    >
                        <Quote className="absolute -top-6 -left-6 w-16 h-16 text-blue-500/10 rotate-12" />
                        <p className="text-xl md:text-2xl text-neutral-300 leading-relaxed italic text-center px-8">
                            "Trong khi những ngôn ngữ khác ra đời từ các tập đoàn tỷ đô, Python lại khởi đầu từ một kỳ nghỉ Giáng sinh rảnh rỗi của một người đàn ông."
                        </p>
                    </motion.div>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                    >
                        <Link
                            href="/wiki/python-basics"
                            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl font-bold text-lg hover:shadow-[0_0_40px_rgba(59,130,246,0.4)] transition-all hover:scale-105 active:scale-95"
                        >
                            🐍 Bắt đầu học Python
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                        <a
                            href="https://docs.python.org/3/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-3 px-8 py-4 bg-white/5 border border-white/10 rounded-2xl font-bold text-lg hover:bg-white/10 transition-all hover:scale-105 active:scale-95"
                        >
                            Official Docs
                            <ExternalLink className="w-5 h-5" />
                        </a>
                    </motion.div>
                </div>

                {/* The Story: Christmas Project */}
                <motion.section
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="mb-32"
                >
                    <TiltCard className="bg-gradient-to-br from-blue-950/40 to-cyan-950/30 border border-blue-500/20 rounded-3xl p-10 md:p-14 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-[100px] group-hover:bg-blue-500/20 transition-all duration-700" />

                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-6">
                                <Gift className="w-8 h-8 text-yellow-400 animate-bounce" />
                                <h2 className="text-2xl font-bold text-blue-400">Món quà Giáng sinh năm 1989</h2>
                            </div>

                            <p className="text-xl md:text-2xl text-white leading-relaxed mb-8">
                                Tại Amsterdam, trong những ngày cuối năm 1989, <strong className="text-yellow-400">Guido van Rossum</strong> — một lập trình viên với cặp kính đặc trưng — cảm thấy buồn chán trong văn phòng vắng vẻ. Ông tìm kiếm một dự án <em>"cho vui"</em> để lấp đầy thời gian rảnh rỗi...
                            </p>

                            <p className="text-lg text-neutral-400 leading-relaxed">
                                Guido không có ý định tạo ra một cuộc cách mạng. Ông chỉ muốn xây dựng thứ gì đó thú vị — một ngôn ngữ kịch bản đơn giản như Shell, nhưng lại có cú pháp rõ ràng và đủ mạnh mẽ như C. Và thế là trong sự yên tĩnh của kỳ nghỉ lễ, ông bắt đầu viết những dòng code đầu tiên...
                            </p>
                        </div>
                    </TiltCard>
                </motion.section>

                {/* The Pain Before Python */}
                <section className="mb-32">
                    <h2 className="text-3xl font-bold mb-10 text-center">
                        🤔 Vấn đề mà Guido muốn giải quyết
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* C Language */}
                        <TiltCard className="bg-[#111]/80 backdrop-blur-xl border border-red-500/20 rounded-2xl p-8 relative overflow-hidden group hover:border-red-500/40 transition-all h-full">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-[60px] group-hover:bg-red-500/20 transition-colors" />
                            <div className="relative z-10">
                                <div className="text-4xl mb-4">⚙️</div>
                                <h3 className="text-xl font-bold text-red-400 mb-4">Ngôn ngữ C</h3>
                                <ul className="space-y-3 text-neutral-300">
                                    <li className="flex items-start gap-2"><span className="text-green-400 mt-1">✓</span> Mạnh mẽ, tốc độ cao</li>
                                    <li className="flex items-start gap-2"><span className="text-red-400 mt-1">✗</span> Quản lý bộ nhớ thủ công</li>
                                    <li className="flex items-start gap-2"><span className="text-red-400 mt-1">✗</span> Khai báo biến dài dòng</li>
                                    <li className="flex items-start gap-2"><span className="text-red-400 mt-1">✗</span> Biên dịch chậm chạp</li>
                                </ul>
                            </div>
                        </TiltCard>

                        {/* Shell Script */}
                        <TiltCard className="bg-[#111]/80 backdrop-blur-xl border border-yellow-500/20 rounded-2xl p-8 relative overflow-hidden group hover:border-yellow-500/40 transition-all h-full">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/10 rounded-full blur-[60px] group-hover:bg-yellow-500/20 transition-colors" />
                            <div className="relative z-10">
                                <div className="text-4xl mb-4">📜</div>
                                <h3 className="text-xl font-bold text-yellow-400 mb-4">Shell Script (Bash)</h3>
                                <ul className="space-y-3 text-neutral-300">
                                    <li className="flex items-start gap-2"><span className="text-green-400 mt-1">✓</span> Tự động hóa tốt</li>
                                    <li className="flex items-start gap-2"><span className="text-red-400 mt-1">✗</span> Yếu với logic phức tạp</li>
                                    <li className="flex items-start gap-2"><span className="text-red-400 mt-1">✗</span> Cú pháp khó đọc</li>
                                    <li className="flex items-start gap-2"><span className="text-red-400 mt-1">✗</span> Ít cấu trúc dữ liệu</li>
                                </ul>
                            </div>
                        </TiltCard>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="mt-12 text-center"
                    >
                        <div className="inline-block bg-gradient-to-r from-blue-950/50 via-cyan-950/50 to-yellow-950/50 border border-white/10 rounded-2xl px-10 py-8 hover:border-blue-500/30 transition-all cursor-pointer">
                            <p className="text-xl text-neutral-300">
                                Guido hình dung về <strong className="text-blue-400">cây cầu nối giữa hai thế giới</strong>
                                <br />
                                <span className="text-white mt-2 block font-bold text-2xl">⚡ Đơn giản như Shell + Mạnh mẽ như C</span>
                            </p>
                        </div>
                    </motion.div>
                </section>

                {/* The Zen of Python - Interactive */}
                <motion.section
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="mb-32"
                >
                    <div className="text-center mb-10">
                        <h2 className="text-4xl font-bold mb-4">
                            <span className="text-cyan-400">🧘</span> The Zen of Python
                        </h2>
                        <p className="text-neutral-400">
                            Triết lý thiết kế làm nên sự khác biệt. Hãy thử chạy nó xem!
                        </p>
                    </div>

                    <InteractiveTerminal />
                </motion.section>

                {/* BDFL & Community */}
                <section className="mb-32">
                    <h2 className="text-3xl font-bold mb-10 text-center flex items-center justify-center gap-3">
                        <Users className="w-8 h-8 text-blue-400" />
                        Guido và Cộng đồng
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <TiltCard className="bg-[#111]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 text-center h-full">
                            <div className="text-5xl mb-4">👑</div>
                            <h3 className="text-xl font-bold text-yellow-400 mb-2">BDFL</h3>
                            <p className="text-neutral-500 text-sm mb-4">Benevolent Dictator For Life</p>
                            <p className="text-neutral-300">
                                "Nhà độc tài nhân từ trọn đời" — danh hiệu cộng đồng phong cho Guido.
                                Ông có tiếng nói cuối cùng nhưng luôn <strong className="text-white">lắng nghe và hợp tác</strong>.
                            </p>
                        </TiltCard>

                        <TiltCard className="bg-[#111]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 text-center h-full">
                            <div className="text-5xl mb-4">📝</div>
                            <h3 className="text-xl font-bold text-blue-400 mb-2">PEP</h3>
                            <p className="text-neutral-500 text-sm mb-4">Python Enhancement Proposal</p>
                            <p className="text-neutral-300">
                                Bất kỳ ai cũng có thể đề xuất cải tiến Python. Đề xuất được <strong className="text-white">thảo luận công khai</strong> trước khi quyết định.
                            </p>
                        </TiltCard>
                    </div>
                </section>

                {/* Companies Using Python */}
                <section className="mb-32">
                    <h2 className="text-3xl font-bold mb-4 text-center flex items-center justify-center gap-3">
                        <Building className="w-8 h-8 text-blue-400" />
                        Ai đang dùng Python?
                    </h2>
                    <p className="text-center text-neutral-400 mb-10">
                        Triết lý Google: <em>"Python where we can, C++ where we must"</em>
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                            { name: "Google", use: "YouTube, internal tools, AI research" },
                            { name: "Netflix", use: "Recommendation engine, data analysis" },
                            { name: "Instagram", use: "Backend Django, 500M+ users" },
                            { name: "Spotify", use: "Data analysis, backend services" },
                            { name: "Dropbox", use: "Desktop client, infrastructure" },
                            { name: "NASA", use: "Scientific computing, simulations" },
                            { name: "Pixar", use: "Animation pipeline automation" },
                            { name: "Tesla", use: "Autopilot AI training" },
                        ].map((company, idx) => (
                            <motion.div
                                key={idx}
                                whileHover={{ scale: 1.05, borderColor: "rgba(59,130,246,0.5)" }}
                                className="bg-[#111]/60 border border-white/5 rounded-xl p-4 transition-all cursor-default"
                            >
                                <div className="font-bold text-white mb-1">{company.name}</div>
                                <div className="text-xs text-neutral-500">{company.use}</div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Most Loved */}
                <motion.section
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="mb-20"
                >
                    <div className="bg-gradient-to-r from-blue-950/40 to-yellow-950/40 border border-blue-500/20 rounded-3xl p-10 text-center relative overflow-hidden group">
                        <div className="absolute inset-0 bg-blue-500/5 group-hover:bg-blue-500/10 transition-colors duration-500" />
                        <Heart className="w-16 h-16 text-red-500 mx-auto mb-6 animate-pulse" />
                        <h2 className="text-3xl font-bold mb-4 relative z-10">
                            Ngôn ngữ <span className="text-yellow-400">phổ biến nhất</span> thế giới
                        </h2>
                        <p className="text-xl text-neutral-300 mb-2 relative z-10">
                            <strong className="text-white">#1 trên TIOBE Index</strong>
                        </p>
                        <p className="text-neutral-400 relative z-10">
                            Dễ học nhất cho người mới bắt đầu
                        </p>
                    </div>
                </motion.section>

                {/* CTA Section */}
                <motion.section
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center"
                >
                    <div className="bg-gradient-to-r from-blue-950/50 to-cyan-950/50 border border-blue-500/30 rounded-3xl p-10 md:p-16 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px] group-hover:bg-blue-500/30 transition-all duration-700" />

                        <div className="relative z-10">
                            <h2 className="text-4xl font-black mb-6">
                                Sẵn sàng học <span className="text-blue-400">Python</span>?
                            </h2>
                            <p className="text-lg text-neutral-400 mb-10 max-w-2xl mx-auto">
                                Khóa học Python từ cơ bản đến nâng cao với interactive terminal — chạy code trực tiếp trên trình duyệt!
                            </p>
                            <Link
                                href="/wiki/python-basics"
                                className="inline-flex items-center gap-3 px-12 py-6 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl font-bold text-xl hover:shadow-[0_0_60px_rgba(59,130,246,0.5)] transition-all hover:scale-105"
                            >
                                🐍 Bắt đầu học ngay
                                <ArrowRight className="w-6 h-6" />
                            </Link>
                        </div>
                    </div>
                </motion.section>
            </div>
        </main>
    );
}
