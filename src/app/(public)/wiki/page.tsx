'use client';

import { useRouter } from 'next/navigation';
import MagicBento, { BentoCardProps } from '@/components/ui/MagicBento';

const futureTopics = [
    { title: 'Prompt Engineering', description: 'Nghệ thuật giao tiếp với AI', label: 'Technique' },
    { title: 'System Design for AI', description: 'Kiến trúc hệ thống quy mô lớn', label: 'Architecture' },
    { title: 'LLM Fine-tuning', description: 'Tối ưu hóa mô hình riêng', label: 'Deep Learning' },
];

export default function WikiPage() {
    const router = useRouter();

    const cards: BentoCardProps[] = [
        {
            title: 'Vibe Coding',
            description: 'Khám phá phương pháp lập trình bằng cảm hứng với sự hỗ trợ của AI. Hiểu rõ cơ hội, rủi ro và cách làm chủ công nghệ.',
            label: 'Featured • New Era',
            colSpan: 2,
            rowSpan: 2,
            img: 'https://substackcdn.com/image/fetch/$s_!SRp9!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F4ccfea8c-00b1-4f59-9f80-14e8cb197b4e_1286x646.gif',
            onClick: () => router.push('/wiki/vibecoding'),
            textAutoHide: false
        },
        ...futureTopics.map(topic => ({
            title: topic.title,
            description: topic.description,
            label: topic.label,
            colSpan: 1,
            rowSpan: 1,
            color: '#171717' // Neutral-900 equivalent
        })),
        {
            title: 'Community Contribution',
            description: 'Bạn muốn đóng góp chủ đề? Hãy gửi yêu cầu ngay.',
            label: 'Join Us',
            colSpan: 1,
            rowSpan: 1,
            color: '#262626',
            onClick: () => window.open('https://github.com/your-repo', '_blank')
        }
    ];

    return (
        <main className="min-h-screen pt-32 pb-20 px-4 md:px-12 bg-[#0a0a0a] text-white relative overflow-hidden">
            {/* Background Effects */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-[20%] right-[20%] w-96 h-96 bg-purple-500/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-[20%] left-[20%] w-96 h-96 bg-pink-500/10 rounded-full blur-[100px]" />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-white/10 pb-8">
                    <div>
                        <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4">
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                                Wiki <span className="text-white">Knowledge</span>
                            </span>
                        </h1>
                        <p className="text-neutral-400 max-w-xl text-lg">
                            Tổng hợp kiến thức, kỹ năng và tư duy lập trình trong kỷ nguyên trí tuệ nhân tạo.
                        </p>
                    </div>
                </div>

                {/* Magic Bento Grid */}
                <MagicBento
                    items={cards}
                    enableStars={true}
                    enableSpotlight={true}
                    spotlightRadius={400}
                    glowColor="168, 85, 247" // Purple-500
                    particleCount={20}
                />
            </div>

            {/* Footer */}
            <footer className="mt-20 border-t border-neutral-800 py-6 text-center text-xs text-neutral-600">
                <p>© 2024 VIBE CODING WIKI. OPEN KNOWLEDGE BASE.</p>
            </footer>
        </main>
    );
}
