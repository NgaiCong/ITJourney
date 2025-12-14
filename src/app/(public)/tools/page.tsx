'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Code2, Database, GitBranch, Box, FileText, Laptop, Layout, X, ExternalLink, Target, Sparkles, CheckCircle, Brain } from 'lucide-react';
import SpotlightCard from '@/components/ui/SpotlightCard';

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
                name: "VS Code (Agentic)",
                desc: "Code Editor + AI Agents (Cline/Supermaven).",
                icon: Code2,
                href: "https://code.visualstudio.com",
                color: "text-blue-400",
                whatIs: "Visual Studio Code được 'độ' thêm các AI Agent như Cline để tự động hóa code.",
                purpose: "Môi trường lập trình tích hợp AI, giúp bạn code ít hơn và quản lý nhiều hơn.",
                features: ["Hệ sinh thái Extensions vô địch", "Tích hợp Cline (Autonomous Agent)", "Supermaven (1M Context Cache)", "Remote Development (WSL/SSH)", "Terminal tích hợp"]
            },
            {
                name: "Ghostty / Warp",
                desc: "Terminal thế hệ mới (GPU Accelerated).",
                icon: Terminal,
                href: "https://mitchellh.com/ghostty",
                color: "text-neutral-200",
                whatIs: "Terminal emulator hiện đại, sử dụng GPU để render, siêu mượt và nhanh.",
                purpose: "Thay thế Terminal cũ kỹ. Ghostty (Nhanh, Minimal) hoặc Warp (AI tích hợp).",
                features: ["GPU Rendering (60FPS+)", "Giao diện hiện đại", "AI Command Suggestions (Warp)", "Hỗ trợ Ligatures & Emoji đẹp", "Cross-platform"]
            },
            {
                name: "TablePlus",
                desc: "GUI quản lý Database tốt nhất (All-in-one).",
                icon: Database,
                href: "https://tableplus.com",
                color: "text-blue-300",
                whatIs: "Công cụ quản lý cơ sở dữ liệu (SQL/NoSQL) với giao diện Native cực nhanh.",
                purpose: "Quản lý Supabase, Postgres, MySQL, Redis... tất cả trong một ứng dụng.",
                features: ["Native App (Không phải Electron)", "Khởi động trong tích tắc", "Hỗ trợ đa Database", "Giao diện Dark Mode đẹp mắt", "Bảo mật cao (End-to-end encryption)"]
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
            }
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
                name: "Bun",
                desc: "JavaScript Runtime siêu tốc độ (All-in-one).",
                icon: Box,
                href: "https://bun.sh",
                color: "text-orange-200",
                whatIs: "Runtime thay thế Node.js, tích hợp sẵn package manager và bundler.",
                purpose: "Chạy JS/TS nhanh gấp 4 lần Node.js, cài package trong tích tắc.",
                features: ["Tốc độ khởi động tức thì", "Hỗ trợ TypeScript mặc định", "Tương thích 90% với Node.js API", "Cài package nhanh nhất thế giới", "Bundler tích hợp sẵn"]
            },
            {
                name: "Hono",
                desc: "Web Framework siêu nhẹ cho kỷ nguyên Edge.",
                icon: Box,
                href: "https://hono.dev",
                color: "text-orange-500",
                whatIs: "Framework web chuẩn mực mới: Nhanh, Nhẹ, chạy mọi nơi (Cloudflare, Bun, Node).",
                purpose: "Viết API cực nhanh, deploy ra Edge để giảm độ trễ tối đa.",
                features: ["Siêu nhẹ (<14kb)", "Hỗ trợ TypeScript tốt nhất", "Chạy trên Cloudflare Workers/Bun", "Cú pháp giống Express nhưng hiện đại hơn", "AI viết code Hono cực chuẩn"]
            },
            {
                name: "Supabase",
                desc: "Backend-as-a-Service (Firebase thay thế).",
                icon: Database,
                href: "https://supabase.com",
                color: "text-emerald-400",
                whatIs: "Nền tảng Backend dựa trên PostgreSQL, cung cấp sẵn Auth, Realtime, Storage.",
                purpose: "Có ngay Backend xịn trong 2 phút mà không cần setup server.",
                features: ["PostgreSQL đầy đủ sức mạnh", "Authentication tích hợp sẵn", "Realtime Subscriptions", "Auto-generated API", "Dashboard quản lý cực đẹp"]
            },
            {
                name: "Bruno",
                desc: "API Client mã nguồn mở, nhẹ và Git-friendly.",
                icon: Box,
                href: "https://www.usebruno.com",
                color: "text-orange-500",
                whatIs: "Công cụ test API thế hệ mới, lưu collection trực tiếp trong folder dự án.",
                purpose: "Test API nhanh chóng, không bắt buộc Cloud, dễ dàng commit vào Git.",
                features: ["Lưu trữ cấu hình ngay trong Repo", "Hoạt động Offline 100%", "Giao diện sạch, không Bloatware", "Hỗ trợ Scripting mạnh mẽ", "Thay thế hoàn hảo cho Postman"]
            },
            {
                name: "Docker",
                desc: "Container hóa ứng dụng.",
                icon: Box,
                href: "https://www.docker.com",
                color: "text-blue-500",
                whatIs: "Nền tảng container hóa giúp đóng gói ứng dụng cùng dependencies.",
                purpose: "Đảm bảo ứng dụng chạy giống nhau trên mọi môi trường (dev, staging, prod).",
                features: ["Container nhẹ và nhanh", "Quản lý đa dịch vụ với Docker Compose", "Kho chứa ảnh (Image Registry) đa dạng", "Cô lập (Isolation) môi trường hoàn hảo", "Dễ dàng tái tạo (Reproduce) môi trường"]
            }
        ]
    },
    {
        category: "AI Engineering & Local LLMs",
        items: [
            {
                name: "Cline (Claude Dev)",
                desc: "Biến VS Code thành AI Agent thực thụ.",
                icon: Brain,
                href: "https://github.com/cline/cline",
                color: "text-purple-400",
                whatIs: "Extension biến VS Code thành Autonomous Coding Agent.",
                purpose: "Giao việc cho AI: 'Tạo file API, viết test, fix bug', và nó tự động chạy terminal/sửa file.",
                features: ["Tự động chạy lệnh Terminal", "Tự động tạo/sửa file", "Hỗ trợ Claude 3.5 Sonnet & Local LLM", "Agentic Workflow (Làm việc tự chủ)", "Open Source"]
            },
            {
                name: "Supermaven",
                desc: "Copilot siêu tốc độ với bộ nhớ khổng lồ.",
                icon: Sparkles,
                href: "https://supermaven.com",
                color: "text-yellow-400",
                whatIs: "Công cụ gợi ý code AI nhanh nhất hiện nay với Context Window 1 triệu token.",
                purpose: "Gợi ý code tức thì, nhớ code bạn viết từ tuần trước.",
                features: ["Tốc độ gợi ý cực nhanh", "Context Window 1.000.000 tokens", "Hiểu toàn bộ dự án", "Free Tier rất hào phóng", "Low Latency"]
            },
            {
                name: "Ollama",
                desc: "Chạy LLM (AI) ngay trên máy cá nhân.",
                icon: Terminal,
                href: "https://ollama.com",
                color: "text-white",
                whatIs: "Công cụ giúp chạy các model AI (Llama 3, Deepseek Coder) offline.",
                purpose: "Code, Chat với AI miễn phí, riêng tư, không cần internet.",
                features: ["Chạy model Local (Offline)", "Hỗ trợ nhiều Model (Llama 3, Mistral)", "API tương thích OpenAI", "Tích hợp tốt với Cline/Extensions", "Bảo mật dữ liệu tuyệt đối"]
            },
            {
                name: "Pinecone",
                desc: "Vector Database cho ứng dụng AI.",
                icon: Database,
                href: "https://www.pinecone.io",
                color: "text-cyan-400",
                whatIs: "Cơ sở dữ liệu Vector (Vector Database) hàng đầu để xây dựng ứng dụng LLM.",
                purpose: "Lưu trữ và tìm kiếm vector (embeddings) cho RAG, Semantic Search.",
                features: ["Tìm kiếm tương đồng (Similarity Search) cực nhanh", "Tích hợp sẵn với LangChain/OpenAI", "Serverless (Không cần quản lý server)", "Miễn phí gói Starter", "Chuẩn mực cho AI Engineer 2026"]
            }
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
                    {toolsSections.map((section, sectionIdx) => (
                        <motion.section
                            key={section.category}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: sectionIdx * 0.1 }}
                        >
                            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2 border-l-4 border-indigo-500 pl-4">
                                {section.category}
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {section.items.map((tool, toolIdx) => {
                                    const Icon = tool.icon;
                                    return (
                                        <motion.div
                                            key={tool.name}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: toolIdx * 0.05 }}
                                            onClick={() => setSelectedTool(tool)}
                                            className="cursor-pointer h-full"
                                        >
                                            <SpotlightCard className="h-full hover:scale-[1.02] transition-transform duration-300" spotlightColor="rgba(99, 102, 241, 0.2)">
                                                <div className="p-6 h-full flex flex-col items-start gap-4">
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
                                            </SpotlightCard>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </motion.section>
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
