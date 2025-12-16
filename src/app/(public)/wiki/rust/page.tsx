'use client';

import React, { useState } from 'react';
import { Shield, Zap, Users, Package, ChevronRight, ArrowRight, Calendar, Building, ExternalLink, AlertTriangle, Sparkles, Quote, Target, Heart, Lock, Unlock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const SafetyComparison = () => {
    const [mode, setMode] = useState<'unsafe' | 'safe'>('unsafe');

    const cppCode = `// C++ (Unsafe)
int* ptr = new int(10);
delete ptr;
*ptr = 20; // Use after free!
// 💥 SEGMENTATION FAULT
// (Runtime crash)`;

    const rustCode = `// Rust (Safe)
let ptr = Box::new(10);
drop(ptr);
*ptr = 20; // Compiler Error!
// 🛑 Won't even compile
// "value used here after move"`;

    return (
        <div className="bg-[#1e1e1e] rounded-xl overflow-hidden border border-white/10 shadow-2xl font-mono text-sm md:text-base max-w-4xl mx-auto">
            <div className="flex bg-[#2d2d2d] border-b border-white/5">
                <button
                    onClick={() => setMode('unsafe')}
                    className={`flex-1 py-3 px-4 font-bold transition-colors flex items-center justify-center gap-2 ${mode === 'unsafe' ? 'bg-red-900/40 text-red-400' : 'text-neutral-500 hover:text-white'}`}
                >
                    <AlertTriangle className="w-4 h-4" />
                    C++ (Unsafe)
                </button>
                <button
                    onClick={() => setMode('safe')}
                    className={`flex-1 py-3 px-4 font-bold transition-colors flex items-center justify-center gap-2 ${mode === 'safe' ? 'bg-green-900/40 text-green-400' : 'text-neutral-500 hover:text-white'}`}
                >
                    <Shield className="w-4 h-4" />
                    Rust (Safe)
                </button>
            </div>

            <div className="relative h-64 bg-[#0d0d0d] p-0 overflow-hidden">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={mode}
                        initial={{ opacity: 0, x: mode === 'safe' ? 20 : -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: mode === 'safe' ? -20 : 20 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 p-6 flex flex-col justify-center"
                    >
                        <pre className={`font-mono leading-relaxed ${mode === 'safe' ? 'text-green-300' : 'text-red-300'}`}>
                            {mode === 'unsafe' ? cppCode : rustCode}
                        </pre>

                        <div className={`mt-4 p-3 rounded-lg border ${mode === 'safe' ? 'bg-green-900/20 border-green-500/30 text-green-200' : 'bg-red-900/20 border-red-500/30 text-red-200'}`}>
                            {mode === 'unsafe' ? (
                                <div className="flex items-center gap-2">
                                    <AlertTriangle className="w-5 h-5 animate-pulse" />
                                    <span>Result: Chương trình crash khi đang chạy! (Nguy hiểm)</span>
                                </div>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <Lock className="w-5 h-5" />
                                    <span>Result: Trình biên dịch báo lỗi ngay lập tức. (An toàn)</span>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};

export default function RustIntroPage() {
    return (
        <main className="min-h-screen bg-[#0a0a0a] text-white pt-24 pb-16">
            <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
                {/* Back Button */}
                <Link
                    href="/wiki"
                    className="inline-flex items-center gap-2 text-sm font-medium text-neutral-400 hover:text-white mb-8 transition-colors group px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/5"
                >
                    <ChevronRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
                    Back to Wiki Library
                </Link>

                {/* Hero Section with Compelling Story Opening */}
                <div className="relative mb-20">
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-500/20 rounded-full blur-[120px] -z-10 pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-red-600/15 rounded-full blur-[100px] -z-10 pointer-events-none" />

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center max-w-5xl mx-auto"
                    >
                        {/* Rust Logo */}
                        <motion.div
                            className="relative inline-flex items-center justify-center w-32 h-32 mb-10 group"
                            whileHover={{ scale: 1.1, rotate: 5 }}
                        >
                            <div className="absolute inset-0 bg-orange-500/30 rounded-full blur-[40px] group-hover:blur-[60px] transition-all duration-500" />
                            <div className="absolute inset-0 bg-red-600/20 rounded-full blur-[40px] translate-x-2 translate-y-2 group-hover:translate-x-4 group-hover:translate-y-4 transition-all duration-500" />
                            <div className="relative z-10 w-28 h-28 drop-shadow-[0_0_15px_rgba(249,115,22,0.5)]">
                                <Image
                                    src="https://upload.wikimedia.org/wikipedia/commons/d/d5/Rust_programming_language_black_logo.svg"
                                    alt="Rust Logo"
                                    fill
                                    className="object-contain invert"
                                />
                            </div>
                        </motion.div>

                        <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-8 leading-tight">
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-red-500 to-orange-600 drop-shadow-[0_0_40px_rgba(249,115,22,0.4)]">
                                Rust
                            </span>
                            <br />
                            <span className="text-3xl md:text-4xl text-white/80 font-light">
                                Thứ đang làm thay đổi cả thế giới công nghệ
                            </span>
                        </h1>

                        {/* Compelling Opening Quote */}
                        <div className="relative max-w-4xl mx-auto mb-12">
                            <Quote className="absolute -top-4 -left-4 w-12 h-12 text-orange-500/20" />
                            <p className="text-xl md:text-2xl text-neutral-300 leading-relaxed italic">
                                "Trong thế giới lập trình có hai loại người. Những lập trình viên dám đánh đổi sự an toàn để ứng dụng chạy nhanh hơn, và những người chấp nhận chậm lại để ngủ yên mỗi đêm. Suốt hàng chục năm, ai cũng nghĩ rằng chúng ta không thể có cả hai..."
                            </p>
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/wiki/rust/learning"
                                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl font-bold text-lg hover:shadow-[0_0_40px_rgba(249,115,22,0.4)] transition-all hover:scale-105"
                            >
                                🦀 Bắt đầu học Rust
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                            <a
                                href="https://www.rust-lang.org/learn"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-3 px-8 py-4 bg-white/5 border border-white/10 rounded-2xl font-bold text-lg hover:bg-white/10 transition-all"
                            >
                                The Rust Book
                                <ExternalLink className="w-5 h-5" />
                            </a>
                        </div>
                    </motion.div>
                </div>

                {/* The Story: Origin Question */}
                <motion.section
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="mb-20"
                >
                    <div className="bg-gradient-to-br from-orange-950/40 to-red-950/30 border border-orange-500/20 rounded-3xl p-10 md:p-14 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-80 h-80 bg-orange-500/10 rounded-full blur-[100px]" />

                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-6">
                                <Sparkles className="w-8 h-8 text-orange-400" />
                                <h2 className="text-2xl font-bold text-orange-400">Câu hỏi thay đổi mọi thứ</h2>
                            </div>

                            <p className="text-xl md:text-2xl text-white leading-relaxed mb-8">
                                Cho đến khi một lập trình viên bình thường, trong một căn hộ nhỏ ở Canada, đặt ra một câu hỏi: <strong className="text-orange-400">"Tại sao chúng ta phải thỏa hiệp?"</strong>
                            </p>

                            <p className="text-lg text-neutral-400 leading-relaxed">
                                Vào năm 2006, <strong className="text-white">Graydon Hoare</strong>, một lập trình viên 29 tuổi tại Mozilla, đã mệt mỏi với những giới hạn của các công cụ hiện có. Một ngày, khi thang máy trong tòa nhà của anh bị hỏng — rất có thể do lỗi phần mềm C/C++ — một suy nghĩ lóe lên: <em>"Chương trình này có thể crash vì những lỗi ngu ngốc mà chúng ta đã biết cách phòng tránh từ hàng thập kỷ."</em>
                            </p>
                        </div>
                    </div>
                </motion.section>

                {/* Interactive Safety Comparison */}
                <motion.section
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ margin: "-100px" }}
                    className="mb-20"
                >
                    <h2 className="text-3xl font-bold mb-10 text-center flex items-center justify-center gap-3">
                        <Shield className="w-8 h-8 text-green-400" />
                        Sự khác biệt: Trải nghiệm thử
                    </h2>
                    <SafetyComparison />
                </motion.section>


                {/* The Pain: Two Worlds */}
                <motion.section
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mb-20"
                >
                    <h2 className="text-3xl font-bold mb-10 text-center flex items-center justify-center gap-3">
                        <AlertTriangle className="w-8 h-8 text-red-400" />
                        Nỗi đau của ngành lập trình trước Rust
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Kingdom 1: Performance */}
                        <div className="bg-[#111]/80 backdrop-blur-xl border border-red-500/20 rounded-2xl p-8 relative overflow-hidden group hover:border-red-500/40 transition-all">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-[60px] group-hover:bg-red-500/20 transition-colors" />

                            <div className="relative z-10">
                                <div className="text-4xl mb-4">⚔️</div>
                                <h3 className="text-xl font-bold text-red-400 mb-4">Vương quốc Hiệu năng</h3>
                                <p className="text-sm text-neutral-500 mb-4">C / C++</p>

                                <ul className="space-y-3 text-neutral-300">
                                    <li className="flex items-start gap-2">
                                        <span className="text-green-400 mt-1">✓</span>
                                        Nói chuyện trực tiếp với phần cứng
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-green-400 mt-1">✓</span>
                                        Vắt kiệt từng giọt hiệu năng cuối cùng
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-red-400 mt-1">✗</span>
                                        Phải tự quản lý từng byte bộ nhớ
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-red-400 mt-1">✗</span>
                                        <strong>70% lỗ hổng bảo mật</strong> từ lỗi bộ nhớ
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Kingdom 2: Safety */}
                        <div className="bg-[#111]/80 backdrop-blur-xl border border-blue-500/20 rounded-2xl p-8 relative overflow-hidden group hover:border-blue-500/40 transition-all">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-[60px] group-hover:bg-blue-500/20 transition-colors" />

                            <div className="relative z-10">
                                <div className="text-4xl mb-4">🛡️</div>
                                <h3 className="text-xl font-bold text-blue-400 mb-4">Vương quốc An toàn</h3>
                                <p className="text-sm text-neutral-500 mb-4">Java / Python / C#</p>

                                <ul className="space-y-3 text-neutral-300">
                                    <li className="flex items-start gap-2">
                                        <span className="text-green-400 mt-1">✓</span>
                                        Garbage Collector tự động dọn dẹp
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-green-400 mt-1">✓</span>
                                        Không lo lỗi con trỏ, tràn bộ đệm
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-red-400 mt-1">✗</span>
                                        GC gây độ trễ không thể đoán trước
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-red-400 mt-1">✗</span>
                                        Máy ảo làm giảm tốc độ vốn có
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </motion.section>

                {/* The Birth of Rust */}
                <motion.section
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="mb-20"
                >
                    <h2 className="text-3xl font-bold mb-10 text-center">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-500">
                            🦀 Sự ra đời của Rust
                        </span>
                    </h2>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Timeline */}
                        <div className="space-y-6">
                            {[
                                { year: "2006", title: "Khởi đầu bí mật", desc: "Graydon Hoare bắt đầu phát triển Rust trong căn hộ của mình, sau giờ làm việc tại Mozilla." },
                                { year: "2009", title: "Mozilla nhìn thấy tiềm năng", desc: "Graydon trình bày ý tưởng về Rust cho lãnh đạo Mozilla — công nghệ nền tảng cho trình duyệt tương lai." },
                                { year: "2010", title: "Tài trợ chính thức", desc: "Mozilla tài trợ cho Rust. Đội ngũ kỹ sư tài năng bắt đầu tham gia phát triển." },
                                { year: "2015", title: "Rust 1.0 ra đời", desc: "Lời hứa về sự ổn định. Mã viết cho 1.0 sẽ biên dịch được trên mọi phiên bản tương lai." },
                                { year: "2021", title: "Rust Foundation", desc: "AWS, Google, Microsoft, Mozilla, Huawei cùng thành lập tổ chức phi lợi nhuận." },
                            ].map((item, idx) => (
                                <motion.div
                                    key={idx}
                                    className="flex gap-6 group cursor-default"
                                    whileHover={{ x: 10 }}
                                >
                                    <div className="flex flex-col items-center">
                                        <div className="w-4 h-4 rounded-full bg-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.5)] group-hover:scale-125 transition-transform" />
                                        {idx < 4 && <div className="w-0.5 h-full bg-gradient-to-b from-orange-500/50 to-transparent" />}
                                    </div>
                                    <div className="pb-6">
                                        <div className="text-orange-400 font-bold text-lg">{item.year}</div>
                                        <div className="text-white font-semibold mb-1">{item.title}</div>
                                        <div className="text-neutral-400 text-sm">{item.desc}</div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Name Origin */}
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="bg-[#111]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8"
                        >
                            <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                                <span className="text-3xl">🦀</span>
                                Tại sao tên là "Rust"?
                            </h3>

                            <div className="space-y-4 text-neutral-300">
                                <p>
                                    Cái tên <strong className="text-orange-400">"Rust" (rỉ sét)</strong> không mang ý nghĩa tiêu cực. Graydon chọn nó vì nhiều lý do:
                                </p>

                                <ul className="space-y-3">
                                    <li className="flex items-start gap-3">
                                        <span className="text-orange-400">🍄</span>
                                        <span><strong>Rust Fungi</strong> — loại nấm bền bỉ, có khả năng sống sót và phát triển mạnh mẽ</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-orange-400">🔩</span>
                                        <span>Gợi cảm giác về <strong>kim loại</strong>, gần gũi với phần cứng</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-orange-400">🏗️</span>
                                        <span>Thứ được tạo ra để <strong>tồn tại lâu dài</strong>, xây dựng nền tảng vững chắc</span>
                                    </li>
                                </ul>

                                <div className="mt-6 p-4 bg-orange-500/10 rounded-xl border border-orange-500/20">
                                    <p className="text-sm italic text-orange-200">
                                        "Một cái tên hoàn hảo cho ngôn ngữ được thiết kế để mạnh mẽ, bền bỉ và xây dựng những hệ thống nền tảng."
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </motion.section>

                {/* The Heart: Borrow Checker */}
                <motion.section
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="mb-20"
                >
                    <div className="bg-gradient-to-br from-purple-950/40 to-orange-950/30 border border-purple-500/20 rounded-3xl p-10 md:p-14">
                        <h2 className="text-3xl font-bold mb-8 text-center">
                            <span className="text-purple-400">❤️</span> Trái tim của Rust: <span className="text-orange-400">Borrow Checker</span>
                        </h2>

                        <div className="max-w-4xl mx-auto">
                            <p className="text-lg text-neutral-300 leading-relaxed mb-8 text-center">
                                Hãy tưởng tượng bạn có một <strong className="text-white">cuốn sách quý</strong>...
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                                <motion.div whileHover={{ y: -5 }} className="bg-black/30 rounded-xl p-6 border border-white/5">
                                    <div className="text-3xl mb-4">📕</div>
                                    <h4 className="font-bold text-white mb-2">Ownership (Sở hữu)</h4>
                                    <p className="text-sm text-neutral-400">
                                        Khi cuốn sách thuộc về bạn, bạn là chủ sở hữu duy nhất. Khi không cần nữa, bạn có trách nhiệm cất nó đi.
                                    </p>
                                </motion.div>

                                <motion.div whileHover={{ y: -5 }} className="bg-black/30 rounded-xl p-6 border border-white/5">
                                    <div className="text-3xl mb-4">🎁</div>
                                    <h4 className="font-bold text-white mb-2">Move (Di chuyển)</h4>
                                    <p className="text-sm text-neutral-400">
                                        Khi bạn tặng cuốn sách cho người khác, bạn không còn quyền sử dụng nó nữa. Ngăn chặn lỗi <em>double free</em>.
                                    </p>
                                </motion.div>

                                <motion.div whileHover={{ y: -5 }} className="bg-black/30 rounded-xl p-6 border border-white/5">
                                    <div className="text-3xl mb-4">🤝</div>
                                    <h4 className="font-bold text-white mb-2">Borrow (Vay mượn)</h4>
                                    <p className="text-sm text-neutral-400">
                                        Cho mượn tạm với điều kiện trả lại nguyên vẹn. Nhiều người có thể mượn đọc, nhưng chỉ 1 người được chỉnh sửa.
                                    </p>
                                </motion.div>
                            </div>

                            <div className="bg-black/40 rounded-xl p-6 border border-orange-500/20">
                                <p className="text-center text-lg text-neutral-300">
                                    <strong className="text-orange-400">Borrow Checker</strong> là người thủ thư khó tính, thực thi tất cả các quy tắc này <strong className="text-white">tại thời điểm biên dịch</strong>.
                                    <br />
                                    <span className="text-neutral-500">Không phải runtime. Không có lỗi bộ nhớ. Không có data race.</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.section>

                {/* Features Grid */}
                <motion.section
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="mb-20"
                >
                    <h2 className="text-3xl font-bold mb-10 text-center">
                        Rust giải quyết <span className="text-orange-400">tất cả</span>
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { icon: Shield, title: "Memory Safety", desc: "Loại bỏ 100% lỗi bộ nhớ tại compile time" },
                            { icon: Zap, title: "Zero-Cost Abstraction", desc: "Code an toàn, hiệu năng = C/C++" },
                            { icon: Users, title: "Fearless Concurrency", desc: "Đa luồng an toàn, không data races" },
                            { icon: Package, title: "Cargo & Crates.io", desc: "Hệ sinh thái 100,000+ thư viện" },
                        ].map((feature, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                whileHover={{ scale: 1.05 }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-[#111]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-orange-500/30 transition-all group text-center cursor-default"
                            >
                                <div className="inline-flex p-4 bg-gradient-to-br from-orange-500/20 to-red-500/10 rounded-2xl border border-orange-500/20 group-hover:shadow-[0_0_30px_rgba(249,115,22,0.3)] transition-all mb-4">
                                    <feature.icon className="w-8 h-8 text-orange-400" />
                                </div>
                                <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                                <p className="text-sm text-neutral-400">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.section>

                {/* Companies Using Rust */}
                <motion.section
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="mb-20"
                >
                    <h2 className="text-3xl font-bold mb-4 text-center flex items-center justify-center gap-3">
                        <Building className="w-8 h-8 text-orange-400" />
                        Những gã khổng lồ đã vào cuộc
                    </h2>
                    <p className="text-center text-neutral-400 mb-10">Rust đang âm thầm xây dựng nền tảng của thế giới kỹ thuật số</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                            { name: "Microsoft", use: "Viết lại phần nhân Windows để giảm lỗ hổng bảo mật" },
                            { name: "Amazon AWS", use: "Firecracker - máy ảo siêu nhẹ cho Lambda & Fargate" },
                            { name: "Google", use: "Tích hợp vào Android và hệ điều hành Fuchsia" },
                            { name: "Meta", use: "Trình biên dịch và backend services" },
                            { name: "Discord", use: "Chuyển từ Go sang Rust để xử lý hàng triệu users" },
                            { name: "Dropbox", use: "Viết lại hệ thống lưu trữ, giảm chi phí vận hành" },
                            { name: "Mozilla", use: "Firefox Quantum - bước nhảy vọt về hiệu năng" },
                            { name: "Cloudflare", use: "Edge computing và bảo mật" },
                        ].map((company, idx) => (
                            <motion.div
                                key={idx}
                                whileHover={{ scale: 1.05 }}
                                className="bg-[#111]/60 border border-white/5 rounded-xl p-4 hover:border-orange-500/30 transition-all cursor-default"
                            >
                                <div className="font-bold text-white mb-1">{company.name}</div>
                                <div className="text-xs text-neutral-500">{company.use}</div>
                            </motion.div>
                        ))}
                    </div>
                </motion.section>

                {/* Most Loved Language */}
                <motion.section
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                    className="mb-20"
                >
                    <div className="bg-gradient-to-r from-pink-950/40 to-orange-950/40 border border-pink-500/20 rounded-3xl p-10 text-center relative overflow-hidden group">
                        <div className="absolute inset-0 bg-pink-500/5 group-hover:bg-pink-500/10 transition-colors" />
                        <Heart className="w-16 h-16 text-pink-400 mx-auto mb-6 animate-pulse" />
                        <h2 className="text-3xl font-bold mb-4 relative z-10">
                            Ngôn ngữ <span className="text-pink-400">được yêu thích nhất</span>
                        </h2>
                        <p className="text-xl text-neutral-300 mb-2 relative z-10">
                            <strong className="text-white">7 năm liên tiếp</strong> (2016-2023)
                        </p>
                        <p className="text-neutral-400 relative z-10">
                            theo khảo sát của Stack Overflow Developer Survey
                        </p>
                    </div>
                </motion.section>

                {/* CTA Section */}
                <motion.section
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="text-center"
                >
                    <div className="bg-gradient-to-r from-orange-950/50 to-red-950/50 border border-orange-500/30 rounded-3xl p-10 md:p-16 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/20 rounded-full blur-[100px] group-hover:bg-orange-500/30 transition-all duration-700" />

                        <div className="relative z-10">
                            <h2 className="text-4xl font-black mb-6">
                                Sẵn sàng chinh phục <span className="text-orange-400">Rust</span>?
                            </h2>
                            <p className="text-lg text-neutral-400 mb-10 max-w-2xl mx-auto">
                                Khóa học 25 video từ cơ bản đến nâng cao. Ownership, Borrowing, Traits, Async/Await và nhiều hơn nữa.
                            </p>
                            <Link
                                href="/wiki/rust/learning"
                                className="inline-flex items-center gap-3 px-12 py-6 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl font-bold text-xl hover:shadow-[0_0_60px_rgba(249,115,22,0.5)] transition-all hover:scale-105"
                            >
                                🦀 Bắt đầu học ngay
                                <ArrowRight className="w-6 h-6" />
                            </Link>
                        </div>
                    </div>
                </motion.section>
            </div>
        </main>
    );
}
