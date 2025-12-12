'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Code2, Database, GitBranch, Box, FileText, Laptop, Layout, X, ExternalLink, Target, Sparkles, CheckCircle } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';

interface Tool {
    name: string;
    desc: string;
    icon: React.ComponentType<{ className?: string }>;
    href: string;
    color: string;
    whatIs: string;
    purpose: string;
    features: string[];
}

interface ToolSection {
    category: string;
    items: Tool[];
}

const toolsSections: ToolSection[] = [
    {
        category: "Development Environment",
        items: [
            {
                name: "VS Code",
                desc: "Code Editor phổ biến nhất hiện nay.",
                icon: Code2,
                href: "https://code.visualstudio.com",
                color: "text-blue-400",
                whatIs: "Visual Studio Code là trình soạn thảo code miễn phí của Microsoft.",
                purpose: "Viết code, debug, quản lý dự án với giao diện hiện đại và extensions phong phú.",
                features: ["IntelliSense (Gợi ý code) thông minh", "Tích hợp sẵn Git", "Kho mở rộng (Extensions) khổng lồ", "Trình gỡ lỗi (Debugger) mạnh mẽ", "Tích hợp dòng lệnh (Terminal)"]
            },
            {
                name: "Windows Terminal",
                desc: "Terminal hiện đại cho Windows.",
                icon: Terminal,
                href: "https://aka.ms/terminal",
                color: "text-neutral-200",
                whatIs: "Ứng dụng terminal chính thức của Microsoft với giao diện đẹp.",
                purpose: "Thay thế CMD cũ, chạy PowerShell, WSL, và nhiều shell khác trong cùng 1 cửa sổ.",
                features: ["Hỗ trợ nhiều Tab", "GPU Rendering (Tăng tốc phần cứng)", "Tùy biến giao diện linh hoạt", "Hỗ trợ đầy đủ Unicode (Emoji, Font)", "Cấu hình (Profiles) đa dạng"]
            },
            {
                name: "WSL 2",
                desc: "Chạy Linux trên Windows.",
                icon: Laptop,
                href: "https://learn.microsoft.com/en-us/windows/wsl/install",
                color: "text-orange-400",
                whatIs: "Windows Subsystem for Linux - chạy Linux kernel thật trên Windows.",
                purpose: "Phát triển với môi trường Linux mà không cần dual-boot hoặc VM.",
                features: ["Chạy nhân Linux (Kernel) thật", "Tích hợp hoàn hảo với VS Code", "Truy cập file Windows dễ dàng", "Hỗ trợ Docker gốc", "Hiệu năng cao"]
            },
            {
                name: "Cursor",
                desc: "Code Editor tích hợp AI siêu mạnh.",
                icon: Code2,
                href: "https://cursor.sh",
                color: "text-purple-500",
                whatIs: "Fork của VS Code được tích hợp sâu AI vào lõi editor.",
                purpose: "Code nhanh hơn với AI Pair Programmer, Chat với codebase, và tự động sửa lỗi.",
                features: ["Chat với toàn bộ mã nguồn (Codebase)", "Tự động sửa lỗi (Auto-fix) thông minh", "Dùng lại được Extensions của VS Code", "AI giải thích logic code chi tiết", "Miễn phí cho sinh viên"]
            },
            {
                name: "Windsurf",
                desc: "IDE thấu hiểu ngữ cảnh dòng chảy (Flow).",
                icon: Layout,
                href: "https://windsurf.ai",
                color: "text-cyan-400",
                whatIs: "IDE tập trung vào khả năng hiểu sâu ngữ cảnh dự án và dòng chảy suy nghĩ.",
                purpose: "Hỗ trợ lập trình viên giữ mạch tư duy (Flow) với các gợi ý thông minh theo ngữ cảnh.",
                features: ["Hiểu sâu ngữ cảnh (Context) dự án", "Cascade: Gợi ý theo mạch suy nghĩ", "Giảm thiểu việc nhập lệnh (Prompt) lặp lại", "Tốt cho việc tái cấu trúc (Refactor) code cũ", "Gói cơ bản miễn phí"]
            },
            {
                name: "IntelliJ IDEA / CLion",
                desc: "IDE thông minh nhất thế giới từ JetBrains.",
                icon: Laptop,
                href: "https://www.jetbrains.com",
                color: "text-pink-500",
                whatIs: "Bộ công cụ IDE chuyên nghiệp: IntelliJ (Java), CLion (C/C++), PyCharm (Python).",
                purpose: "Phát triển phần mềm quy mô lớn với các tính năng refactoring và analysis mạnh mẽ.",
                features: ["Tự động hoàn thành mã (Auto-complete) thông minh nhất", "Tái cấu trúc (Refactoring) an toàn", "Gỡ lỗi (Debugger) trực quan", "Tích hợp sẵn Database, Docker", "Miễn phí tài khoản Pro với email .edu"]
            },
            {
                name: "Visual Studio",
                desc: "IDE chuẩn công nghiệp cho C++ và .NET.",
                icon: Layout,
                href: "https://visualstudio.microsoft.com",
                color: "text-purple-600",
                whatIs: "IDE toàn diện nhất của Microsoft cho phát triển ứng dụng Windows và C++.",
                purpose: "Làm game (Unreal Engine), ứng dụng Desktop, và hệ thống lớn.",
                features: ["Trình gỡ lỗi (Debugger) C++ mạnh nhất", "Công cụ đo lường (Profiler) tìm rò rỉ bộ nhớ", "Cần thiết nếu làm Unreal Engine", "Hỗ trợ CMake, vcpkg", "Bản Community miễn phí"]
            },
        ]
    },
    {
        category: "Version Control",
        items: [
            {
                name: "Git",
                desc: "Quản lý phiên bản mã nguồn.",
                icon: GitBranch,
                href: "https://git-scm.com",
                color: "text-red-400",
                whatIs: "Hệ thống quản lý phiên bản phân tán phổ biến nhất thế giới.",
                purpose: "Theo dõi thay đổi code, làm việc nhóm, và quản lý lịch sử dự án.",
                features: ["Phân nhánh (Branching) linh hoạt", "Hệ thống phân tán (Distributed)", "Gộp code (Merge) thông minh", "Vùng đệm (Staging Area) rõ ràng", "Nhẹ và nhanh"]
            },
            {
                name: "GitHub Desktop",
                desc: "Giao diện GUI cho Git.",
                icon: Layout,
                href: "https://desktop.github.com",
                color: "text-purple-300",
                whatIs: "Ứng dụng desktop giúp sử dụng Git mà không cần command line.",
                purpose: "Dành cho người mới hoặc khi cần thao tác Git nhanh với giao diện trực quan.",
                features: ["Kéo thả (Drag & drop) tiện lợi", "So sánh code (Diff) trực quan", "Giải quyết xung đột (Conflict) dễ dàng", "Kết nối GitHub mượt mà", "Đa nền tảng (Cross-platform)"]
            },
        ]
    },
    {
        category: "Backend & Database",
        items: [
            {
                name: "Docker",
                desc: "Container hóa ứng dụng.",
                icon: Box,
                href: "https://www.docker.com",
                color: "text-blue-500",
                whatIs: "Nền tảng container hóa giúp đóng gói ứng dụng cùng dependencies.",
                purpose: "Đảm bảo ứng dụng chạy giống nhau trên mọi môi trường (dev, staging, prod).",
                features: ["Container nhẹ và nhanh", "Quản lý đa dịch vụ với Docker Compose", "Kho chứa ảnh (Image Registry) đa dạng", "Cô lập (Isolation) môi trường hoàn hảo", "Dễ dàng tái tạo (Reproduce) môi trường"]
            },
            {
                name: "Postman",
                desc: "Test API.",
                icon: Box,
                href: "https://www.postman.com",
                color: "text-orange-500",
                whatIs: "Công cụ phổ biến nhất để test và phát triển API.",
                purpose: "Gửi request, kiểm tra response, và document API một cách trực quan.",
                features: ["Quản lý bộ thư viện (Collections)", "Biến môi trường (Environment Variables)", "Kiểm thử tự động (Automated Testing)", "Giả lập máy chủ (Mock Servers)", "Làm việc nhóm hiệu quả"]
            },
            {
                name: "DBeaver",
                desc: "Quản lý cơ sở dữ liệu đa năng.",
                icon: Database,
                href: "https://dbeaver.io",
                color: "text-emerald-400",
                whatIs: "Ứng dụng quản lý database đa năng, hỗ trợ hầu hết DBMS phổ biến.",
                purpose: "Truy vấn, quản lý schema, và visualize dữ liệu từ nhiều loại database.",
                features: ["Hỗ trợ đa cơ sở dữ liệu", "Trình soạn thảo SQL mạnh mẽ", "Biểu đồ quan hệ thực thể (ER Diagrams)", "Xuất dữ liệu (Data Export) đa định dạng", "Bản cộng đồng miễn phí"]
            },
        ]
    },
    {
        category: "Productivity",
        items: [
            {
                name: "Obsidian",
                desc: "Ghi chú và quản lý kiến thức (Second Brain).",
                icon: FileText,
                href: "https://obsidian.md",
                color: "text-purple-400",
                whatIs: "Ứng dụng ghi chú dạng Markdown với tính năng liên kết mạnh mẽ.",
                purpose: "Xây dựng \"Second Brain\" - hệ thống quản lý kiến thức cá nhân.",
                features: ["Lưu trữ cục bộ (Local-first) an toàn", "Liên kết ngược (Backlinks) hai chiều", "Biểu đồ kiến thức (Graph View)", "Kho Plugin cộng đồng phong phú", "Miễn phí cho cá nhân"]
            },
            {
                name: "Notion",
                desc: "Quản lý dự án và tài liệu.",
                icon: FileText,
                href: "https://www.notion.so",
                color: "text-white",
                whatIs: "All-in-one workspace kết hợp notes, tasks, databases, và wiki.",
                purpose: "Quản lý dự án cá nhân, ghi chú học tập, và tổ chức thông tin.",
                features: ["Các khối (Blocks) nội dung linh hoạt", "Kho mẫu (Templates) đa dạng", "Nhiều kiểu xem dữ liệu (Database Views)", "Cộng tác theo thời gian thực", "Tích hợp API mở rộng"]
            },
        ]
    }
];

import useLockBodyScroll from '@/hooks/useLockBodyScroll';

function ToolDetailModal({ tool, onClose }: { tool: Tool | null; onClose: () => void }) {
    useLockBodyScroll(!!tool);
    if (!tool) return null;
    const Icon = tool.icon;

    return (
        <AnimatePresence>
            {tool && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 pointer-events-auto"
                        onClick={onClose}
                    />
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-[#0f0f0f] w-full max-w-3xl rounded-2xl border border-white/10 shadow-2xl overflow-hidden pointer-events-auto max-h-[90vh] flex flex-col"
                        >
                            {/* Modal Header */}
                            <div className="relative p-6 md:p-8 border-b border-white/5 bg-gradient-to-b from-white/5 to-transparent">
                                <button
                                    onClick={onClose}
                                    className="absolute top-4 right-4 p-2 rounded-full bg-black/20 hover:bg-white/10 transition-colors border border-white/5"
                                >
                                    <X className="w-5 h-5 text-neutral-400 hover:text-white" />
                                </button>

                                <div className="flex items-start gap-5">
                                    <div className={`p-4 rounded-2xl bg-white/5 border border-white/10 ${tool.color} shadow-lg`}>
                                        <Icon className="w-10 h-10" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">{tool.name}</h2>
                                        <p className="text-neutral-400 text-base leading-relaxed max-w-md">{tool.desc}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Modal Body */}
                            <div className="p-6 md:p-8 space-y-6 max-h-[60vh] overflow-y-auto custom-scrollbar overscroll-contain [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:none]">
                                {/* Info Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="p-5 rounded-xl bg-white/[0.03] border border-white/5">
                                        <div className="flex items-center gap-2 mb-3">
                                            <Sparkles className="w-4 h-4 text-amber-400" />
                                            <h3 className="font-semibold text-white text-sm uppercase tracking-wider">Đây là gì?</h3>
                                        </div>
                                        <p className="text-neutral-300 text-sm leading-relaxed">
                                            {tool.whatIs}
                                        </p>
                                    </div>

                                    <div className="p-5 rounded-xl bg-white/[0.03] border border-white/5">
                                        <div className="flex items-center gap-2 mb-3">
                                            <Target className="w-4 h-4 text-emerald-400" />
                                            <h3 className="font-semibold text-white text-sm uppercase tracking-wider">Mục đích</h3>
                                        </div>
                                        <p className="text-neutral-300 text-sm leading-relaxed">
                                            {tool.purpose}
                                        </p>
                                    </div>
                                </div>

                                {/* Features */}
                                <div className="p-5 rounded-xl bg-blue-500/[0.03] border border-blue-500/10">
                                    <div className="flex items-center gap-2 mb-4">
                                        <CheckCircle className="w-4 h-4 text-blue-400" />
                                        <h3 className="font-semibold text-white text-sm uppercase tracking-wider">Tính năng nổi bật</h3>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        {tool.features.map((f, i) => (
                                            <div key={i} className="flex items-start gap-2.5">
                                                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                                                <span className="text-sm text-neutral-300 leading-relaxed">{f}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Modal Footer */}
                            <div className="p-6 border-t border-white/10 bg-[#0a0a0a]">
                                <a
                                    href={tool.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex items-center justify-center gap-2 w-full py-3.5 bg-white text-black font-bold rounded-xl hover:bg-neutral-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(255,255,255,0.2)]"
                                >
                                    Truy cập Công Cụ
                                    <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </a>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}

export default function ToolsPage() {
    const [selectedTool, setSelectedTool] = useState<Tool | null>(null);

    return (
        <main className="min-h-screen pt-32 pb-20 px-4 bg-neutral-950 text-white">
            <div className="container mx-auto max-w-6xl">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Công Cụ Lập Trình</h1>
                    <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
                        Bộ công cụ tiêu chuẩn được khuyên dùng cho lộ trình này.
                    </p>
                </div>

                <div className="space-y-16">
                    {toolsSections.map((section) => (
                        <section key={section.category}>
                            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2 border-l-4 border-indigo-500 pl-4">
                                {section.category}
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {section.items.map((tool) => {
                                    const Icon = tool.icon;
                                    return (
                                        <div
                                            key={tool.name}
                                            onClick={() => setSelectedTool(tool)}
                                            className="cursor-pointer group"
                                        >
                                            <GlassCard className="h-full hover:bg-white/10 transition-all">
                                                <div className="flex items-start gap-4">
                                                    <div className={`p-3 rounded-lg bg-white/5 border border-white/10 ${tool.color}`}>
                                                        <Icon className="w-8 h-8" />
                                                    </div>
                                                    <div>
                                                        <h3 className="text-lg font-bold mb-1 group-hover:text-indigo-400 transition-colors">
                                                            {tool.name}
                                                        </h3>
                                                        <p className="text-sm text-neutral-400">{tool.desc}</p>
                                                    </div>
                                                </div>
                                            </GlassCard>
                                        </div>
                                    );
                                })}
                            </div>
                        </section>
                    ))}
                </div>
            </div>

            {/* Detail Modal */}
            <ToolDetailModal
                tool={selectedTool}
                onClose={() => setSelectedTool(null)}
            />
        </main>
    );
}
