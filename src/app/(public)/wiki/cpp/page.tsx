'use client';

import React, { useState } from 'react';
import { Sparkles, ChevronRight, ArrowRight, Calendar, Building, ExternalLink, Quote, Code, Lightbulb, Users, Zap, BookOpen, Heart, Cpu, Layers, Shield, Rocket } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const InteractiveTimeline = () => {
    const [selectedYear, setSelectedYear] = useState<number | null>(null);

    const milestones = [
        { year: 1972, title: "C ra đời", desc: "Dennis Ritchie tạo ra C tại Bell Labs", detail: "C trở thành ngôn ngữ thống trị, viết lại toàn bộ Unix kernel." },
        { year: 1979, title: "C with Classes", desc: "Bjarne bắt đầu mở rộng C với OOP", detail: "Bjarne thêm Classes, inheritance, inline functions vào C." },
        { year: 1983, title: "Đổi tên C++", desc: "Rick Mascitti đề nghị cái tên mới", detail: "Tên chính thức là C++. Thêm virtual functions, references, const." },
        { year: 1998, title: "C++98", desc: "Tiêu chuẩn ISO đầu tiên", detail: "Templates, STL (Standard Template Library), Exception handling." },
        { year: 2011, title: "C++11 🔥", desc: "Cuộc phục hưng vĩ đại", detail: "Move semantics, Lambda expressions, auto, smart pointers, threads." },
        { year: 2020, title: "C++20", desc: "Kỷ nguyên hiện đại", detail: "Modules, Concepts, Coroutines, Ranges." }
    ];

    return (
        <div className="relative">
            {/* Connecting Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-900/0 via-blue-500/20 to-blue-900/0 hidden md:block" />

            <div className="space-y-8">
                {milestones.map((item, idx) => (
                    <motion.div
                        key={idx}
                        layout
                        onClick={() => setSelectedYear(selectedYear === idx ? null : idx)}
                        className={`relative flex flex-col md:flex-row gap-4 md:gap-8 items-center cursor-pointer group ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                    >
                        <div className="flex-1 md:text-right">
                            <div className={`p-6 rounded-2xl border transition-all duration-300 ${selectedYear === idx ? 'bg-blue-900/20 border-blue-500/50 shadow-[0_0_30px_rgba(59,130,246,0.2)]' : 'bg-[#111]/60 border-white/5 hover:border-blue-500/30'}`}>
                                <div className="text-blue-400 font-bold text-xl mb-1">{item.year}</div>
                                <div className="text-white font-bold text-lg mb-2">{item.title}</div>
                                <div className="text-neutral-400 text-sm">{item.desc}</div>

                                <AnimatePresence>
                                    {selectedYear === idx && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0, marginTop: 0 }}
                                            animate={{ height: 'auto', opacity: 1, marginTop: 12 }}
                                            exit={{ height: 0, opacity: 0, marginTop: 0 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="pt-3 border-t border-white/10 text-neutral-300 text-sm">
                                                {item.detail}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>

                        {/* Timeline Dot */}
                        <div className="relative z-10 hidden md:flex items-center justify-center w-12 h-12 flex-shrink-0">
                            <div className={`w-4 h-4 rounded-full transition-all duration-300 ${selectedYear === idx ? 'bg-blue-400 scale-150 shadow-[0_0_20px_rgba(59,130,246,0.8)]' : 'bg-neutral-700 group-hover:bg-blue-500'}`} />
                        </div>

                        <div className="flex-1 hidden md:block" />
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default function CppIntroPage() {
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

                {/* Hero Section */}
                <div className="relative mb-20">
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px] -z-10 pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-600/15 rounded-full blur-[100px] -z-10 pointer-events-none" />

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center max-w-5xl mx-auto"
                    >
                        {/* C++ Logo */}
                        <motion.div
                            whileHover={{ rotateY: 10, rotateX: -5 }}
                            className="relative inline-flex items-center justify-center w-32 h-32 mb-10 group perspective-1000"
                        >
                            <div className="absolute inset-0 bg-blue-600/30 rounded-full blur-[40px] group-hover:blur-[60px] transition-all duration-500" />
                            <div className="absolute inset-0 bg-purple-600/20 rounded-full blur-[40px] translate-x-2 translate-y-2 group-hover:translate-x-4 group-hover:translate-y-4 transition-all duration-500" />
                            <div className="relative z-10 w-28 h-28 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                                <Image
                                    src="https://upload.wikimedia.org/wikipedia/commons/1/18/ISO_C%2B%2B_Logo.svg"
                                    alt="C++ Logo"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        </motion.div>

                        <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-8 leading-tight">
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-blue-500 drop-shadow-[0_0_40px_rgba(59,130,246,0.4)]">
                                C++
                            </span>
                            <br />
                            <span className="text-3xl md:text-4xl text-white/80 font-light">
                                Gã khổng lồ thầm lặng suốt 4 thập kỷ
                            </span>
                        </h1>

                        {/* Compelling Opening Quote */}
                        <div className="relative max-w-4xl mx-auto mb-12">
                            <Quote className="absolute -top-4 -left-4 w-12 h-12 text-blue-500/20" />
                            <p className="text-xl md:text-2xl text-neutral-300 leading-relaxed italic">
                                "Đằng sau trình duyệt web, game 3D, Photoshop, Windows, MacOS... có một ngôn ngữ đã và đang vận hành thầm lặng. Nó đủ mạnh để tạo nên thế giới ảo, đủ tin cậy để xử lý giao dịch tài chính toàn cầu, và đủ bền để chạy trên mọi thứ — từ siêu máy tính đến tủ lạnh thông minh."
                            </p>
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/wiki/cpp-basics"
                                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl font-bold text-lg hover:shadow-[0_0_40px_rgba(59,130,246,0.4)] transition-all hover:scale-105"
                            >
                                ⚡ Bắt đầu học C++
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                            <a
                                href="https://isocpp.org/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-3 px-8 py-4 bg-white/5 border border-white/10 rounded-2xl font-bold text-lg hover:bg-white/10 transition-all"
                            >
                                ISO C++ Standard
                                <ExternalLink className="w-5 h-5" />
                            </a>
                        </div>
                    </motion.div>
                </div>

                {/* The Origin: Bell Labs & C */}
                <motion.section
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="mb-20"
                >
                    <div className="bg-gradient-to-br from-blue-950/40 to-purple-950/30 border border-blue-500/20 rounded-3xl p-10 md:p-14 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-[100px]" />

                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-6">
                                <Cpu className="w-8 h-8 text-blue-400" />
                                <h2 className="text-2xl font-bold text-blue-400">Nguồn gốc: Thánh địa Bell Labs</h2>
                            </div>

                            <p className="text-xl md:text-2xl text-white leading-relaxed mb-8">
                                Cuối thập niên 60, máy tính là những cỗ máy khổng lồ, đắt đỏ. Mỗi dòng máy có ngôn ngữ riêng — viết cho máy này không thể chạy trên máy khác. Tại <strong className="text-blue-400">Bell Labs</strong>, hai kỹ sư thiên tài <strong className="text-purple-400">Ken Thompson</strong> và <strong className="text-purple-400">Dennis Ritchie</strong> đã thay đổi tất cả...
                            </p>

                            <p className="text-lg text-neutral-400 leading-relaxed">
                                Năm 1972, Dennis Ritchie cho ra đời <strong className="text-white">ngôn ngữ C</strong> — cuộc cách mạng thực sự. C cung cấp tốc độ gần như Assembly, khả năng tương tác phần cứng trực tiếp, và tính khả chuyển (portability) chưa từng có. Toàn bộ hệ điều hành Unix được viết lại bằng C.
                            </p>
                        </div>
                    </div>
                </motion.section>

                {/* C's Philosophy */}
                <motion.section
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mb-20"
                >
                    <h2 className="text-3xl font-bold mb-10 text-center">
                        🔪 Triết lý của C: "Con dao phẫu thuật"
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-[#111]/80 backdrop-blur-xl border border-green-500/20 rounded-2xl p-6 text-center hover:border-green-500/40 transition-all">
                            <div className="text-3xl mb-4">⚡</div>
                            <h3 className="font-bold text-green-400 mb-2">Tốc độ</h3>
                            <p className="text-sm text-neutral-400">Biên dịch thành mã máy cực kỳ hiệu quả, gần như nhanh ngang Assembly</p>
                        </div>

                        <div className="bg-[#111]/80 backdrop-blur-xl border border-yellow-500/20 rounded-2xl p-6 text-center hover:border-yellow-500/40 transition-all">
                            <div className="text-3xl mb-4">🔧</div>
                            <h3 className="font-bold text-yellow-400 mb-2">Tương tác phần cứng</h3>
                            <p className="text-sm text-neutral-400">Truy cập trực tiếp bộ nhớ, thanh ghi — không che giấu điều gì</p>
                        </div>

                        <div className="bg-[#111]/80 backdrop-blur-xl border border-blue-500/20 rounded-2xl p-6 text-center hover:border-blue-500/40 transition-all">
                            <div className="text-3xl mb-4">🌍</div>
                            <h3 className="font-bold text-blue-400 mb-2">Khả chuyển (Portability)</h3>
                            <p className="text-sm text-neutral-400">Viết một lần, biên dịch lại để chạy trên mọi nền tảng</p>
                        </div>
                    </div>

                    <div className="text-center">
                        <div className="inline-block bg-gradient-to-r from-red-950/50 to-yellow-950/50 border border-red-500/20 rounded-2xl px-8 py-6">
                            <p className="text-lg text-neutral-300">
                                <strong className="text-red-400">⚠️ Nhưng C có vấn đề:</strong> Khi dự án có hàng triệu dòng code, việc quản lý trở thành <strong className="text-white">cơn ác mộng</strong>.
                                <br />
                                <span className="text-neutral-500">Lập trình viên cần một cách tốt hơn để tổ chức code...</span>
                            </p>
                        </div>
                    </div>
                </motion.section>

                {/* Bjarne's Story */}
                <motion.section
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="mb-20"
                >
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* The Pain */}
                        <div className="bg-[#111]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
                            <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                                <span className="text-3xl">😤</span>
                                Trải nghiệm đau thương của Bjarne
                            </h3>

                            <div className="space-y-4 text-neutral-300">
                                <p>
                                    Cuối những năm 70, <strong className="text-purple-400">Bjarne Stroustrup</strong> — nhà khoa học người Đan Mạch vừa hoàn thành tiến sĩ Cambridge — đang viết luận án mô phỏng.
                                </p>

                                <div className="p-4 bg-gradient-to-r from-red-500/10 to-transparent rounded-xl border-l-4 border-red-500">
                                    <p><strong className="text-white">Simula:</strong> Code thanh lịch, dễ quản lý... nhưng <strong className="text-red-400">quá chậm</strong>!</p>
                                </div>

                                <div className="p-4 bg-gradient-to-r from-yellow-500/10 to-transparent rounded-xl border-l-4 border-yellow-500">
                                    <p><strong className="text-white">BCPL:</strong> Chạy nhanh như gió... nhưng viết code là <strong className="text-yellow-400">cực hình</strong>!</p>
                                </div>

                                <p className="text-lg font-semibold text-white">
                                    "Tại sao phải chọn giữa thanh lịch và tốc độ? Tại sao không thể có cả hai?"
                                </p>
                            </div>
                        </div>

                        {/* The Solution */}
                        <div className="bg-[#111]/80 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-8">
                            <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                                <span className="text-3xl">💡</span>
                                Ý tưởng thiên tài
                            </h3>

                            <div className="space-y-4 text-neutral-300">
                                <p>
                                    Năm 1979, Bjarne gia nhập Bell Labs và làm việc với C. Ông ấn tượng bởi tốc độ và tính khả chuyển — nhưng C thiếu công cụ quản lý sự phức tạp.
                                </p>

                                <div className="p-6 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-xl border border-purple-500/20">
                                    <p className="text-lg text-center">
                                        <strong className="text-purple-400">Thay vì tạo ngôn ngữ mới từ số 0...</strong>
                                        <br />
                                        <span className="text-white text-xl">Đứng trên vai người khổng lồ!</span>
                                        <br />
                                        <span className="text-neutral-400 text-sm">Lấy tốc độ C + Thanh lịch Simula</span>
                                    </p>
                                </div>

                                <p className="text-center">
                                    <strong className="text-blue-400">1979:</strong> Ra đời <strong className="text-white">"C with Classes"</strong>
                                    <br />
                                    <strong className="text-blue-400">1983:</strong> Đổi tên thành <strong className="text-white">C++</strong>
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.section>

                {/* Why C++? */}
                <motion.section
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="mb-20"
                >
                    <div className="bg-gradient-to-br from-purple-950/40 to-blue-950/30 border border-purple-500/20 rounded-3xl p-10 text-center">
                        <h2 className="text-3xl font-bold mb-4">
                            Tại sao tên là <span className="text-purple-400">"C++"</span>?
                        </h2>

                        <div className="max-w-2xl mx-auto">
                            <div className="p-6 bg-black/40 rounded-xl font-mono text-xl mb-6">
                                <span className="text-neutral-500">// Trong C, toán tử ++ là "tăng lên 1"</span>
                                <br />
                                <span className="text-blue-400">int</span> c = <span className="text-yellow-400">1</span>;
                                <br />
                                c<span className="text-purple-400">++</span>; <span className="text-neutral-500">// c = 2</span>
                            </div>

                            <p className="text-lg text-neutral-300">
                                <strong className="text-white">C++</strong> = <em>"C được tăng lên một bậc"</em>
                                <br />
                                <span className="text-neutral-500">Cái tên ngắn gọn, đậm chất kỹ thuật</span>
                            </p>
                        </div>
                    </div>
                </motion.section>

                {/* Timeline */}
                <motion.section
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="mb-20"
                >
                    <h2 className="text-3xl font-bold mb-10 text-center flex items-center justify-center gap-3">
                        <Calendar className="w-8 h-8 text-blue-400" />
                        Hành trình 4 thập kỷ
                    </h2>

                    <InteractiveTimeline />
                </motion.section>

                {/* Key Features */}
                <motion.section
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="mb-20"
                >
                    <h2 className="text-3xl font-bold mb-10 text-center">
                        🔥 Vũ khí hạng nặng của C++
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                            { icon: Layers, title: "Classes & OOP", desc: "Nhóm dữ liệu và hàm vào một gói duy nhất. Tái sử dụng, dễ quản lý." },
                            { icon: Zap, title: "Virtual Functions", desc: "Đa hình (Polymorphism) — cùng lệnh, mỗi đối tượng phản ứng khác nhau." },
                            { icon: Code, title: "Operator Overloading", desc: "Định nghĩa lại +, -, *, / cho class của bạn." },
                            { icon: Shield, title: "Smart Pointers (C++11)", desc: "Quản lý bộ nhớ gần như tự động, thoát khỏi memory leak." },
                        ].map((feature, idx) => (
                            <motion.div
                                key={idx}
                                whileHover={{ scale: 1.05 }}
                                className="bg-[#111]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-blue-500/30 transition-all group"
                            >
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="p-3 bg-gradient-to-br from-blue-500/20 to-purple-500/10 rounded-xl border border-blue-500/20 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all">
                                        <feature.icon className="w-6 h-6 text-blue-400" />
                                    </div>
                                    <h3 className="text-lg font-bold text-white">{feature.title}</h3>
                                </div>
                                <p className="text-neutral-400">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </div>

                    {/* Zero Overhead Principle */}
                    <div className="mt-8 bg-gradient-to-r from-blue-950/40 to-purple-950/40 border border-blue-500/20 rounded-2xl p-8 text-center">
                        <h3 className="text-xl font-bold text-blue-400 mb-4">⚡ Zero Overhead Principle</h3>
                        <p className="text-lg text-neutral-300 max-w-3xl mx-auto">
                            <em>"Nếu bạn không sử dụng một tính năng, bạn không phải trả chi phí hiệu năng cho nó."</em>
                            <br />
                            <span className="text-neutral-500">Đây là lý do C++ vẫn nhanh như C dù có nhiều tính năng cao cấp.</span>
                        </p>
                    </div>
                </motion.section>

                {/* Where C++ is used */}
                <motion.section
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                    className="mb-20"
                >
                    <h2 className="text-3xl font-bold mb-4 text-center flex items-center justify-center gap-3">
                        <Building className="w-8 h-8 text-blue-400" />
                        C++ đang chạy ở đâu?
                    </h2>
                    <p className="text-center text-neutral-400 mb-10">
                        "Có hai loại ngôn ngữ: loại mà người ta phàn nàn, và loại mà không ai dùng." — Bjarne Stroustrup
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                            { icon: "🖥️", name: "Hệ điều hành", items: "Windows, MacOS, Linux kernel" },
                            { icon: "🎮", name: "Game Engines", items: "Unreal, Unity, CryEngine" },
                            { icon: "🌐", name: "Trình duyệt", items: "Chrome, Firefox, Edge" },
                            { icon: "🎨", name: "Phần mềm sáng tạo", items: "Photoshop, Premiere, Office" },
                            { icon: "💹", name: "Tài chính", items: "High-frequency trading, Bloomberg" },
                            { icon: "🗄️", name: "Database", items: "MySQL, Oracle, MongoDB" },
                            { icon: "🤖", name: "AI/ML", items: "TensorFlow core, PyTorch" },
                            { icon: "🚗", name: "Hệ thống nhúng", items: "Xe tự lái, thiết bị y tế, IoT" },
                        ].map((category, idx) => (
                            <motion.div
                                key={idx}
                                whileHover={{ scale: 1.05 }}
                                className="bg-[#111]/60 border border-white/5 rounded-xl p-4 hover:border-blue-500/30 transition-all"
                            >
                                <div className="text-2xl mb-2">{category.icon}</div>
                                <div className="font-bold text-white mb-1">{category.name}</div>
                                <div className="text-xs text-neutral-500">{category.items}</div>
                            </motion.div>
                        ))}
                    </div>
                </motion.section>

                {/* C++11 Renaissance */}
                <motion.section
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="mb-20"
                >
                    <div className="bg-gradient-to-r from-purple-950/40 to-blue-950/40 border border-purple-500/20 rounded-3xl p-10">
                        <Rocket className="w-16 h-16 text-purple-400 mx-auto mb-6" />
                        <h2 className="text-3xl font-bold mb-4 text-center">
                            Cuộc <span className="text-purple-400">phục hưng C++11</span>
                        </h2>

                        <p className="text-lg text-neutral-300 text-center mb-8 max-w-3xl mx-auto">
                            Đầu 2000s, Java, C#, Python trỗi dậy. Nhiều người nói <em>"C++ đã chết"</em>.
                            <br />
                            <strong className="text-white">Nhưng gã khổng lồ không chết — nó chỉ đang ngủ đông.</strong>
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {[
                                { title: "Smart Pointers", desc: "Quản lý bộ nhớ tự động" },
                                { title: "Lambda", desc: "Hàm ẩn danh ngắn gọn" },
                                { title: "auto", desc: "Tự suy luận kiểu dữ liệu" },
                                { title: "Multi-threading", desc: "Hỗ trợ đa luồng chuẩn" },
                            ].map((item, idx) => (
                                <motion.div
                                    key={idx}
                                    whileHover={{ y: -5 }}
                                    className="bg-black/30 rounded-xl p-4 border border-white/5 text-center"
                                >
                                    <div className="font-bold text-purple-400 mb-1">{item.title}</div>
                                    <div className="text-sm text-neutral-500">{item.desc}</div>
                                </motion.div>
                            ))}
                        </div>

                        <p className="text-center text-neutral-400 mt-8">
                            Các bản cập nhật <strong className="text-white">C++14, C++17, C++20, C++23</strong> tiếp tục hiện đại hóa ngôn ngữ.
                        </p>
                    </div>
                </motion.section>

                {/* CTA Section */}
                <motion.section
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.9 }}
                    className="text-center"
                >
                    <div className="bg-gradient-to-r from-blue-950/50 to-purple-950/50 border border-blue-500/30 rounded-3xl p-10 md:p-16 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px]" />

                        <div className="relative z-10">
                            <h2 className="text-4xl font-black mb-6">
                                Sẵn sàng chinh phục <span className="text-blue-400">C++</span>?
                            </h2>
                            <p className="text-lg text-neutral-400 mb-10 max-w-2xl mx-auto">
                                Khóa học C++ từ cơ bản đến nâng cao. OOP, Templates, STL, Smart Pointers và nhiều hơn nữa.
                            </p>
                            <Link
                                href="/wiki/cpp-basics"
                                className="inline-flex items-center gap-3 px-12 py-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl font-bold text-xl hover:shadow-[0_0_60px_rgba(59,130,246,0.5)] transition-all hover:scale-105"
                            >
                                ⚡ Bắt đầu học ngay
                                <ArrowRight className="w-6 h-6" />
                            </Link>
                        </div>
                    </div>
                </motion.section>
            </div>
        </main>
    );
}
