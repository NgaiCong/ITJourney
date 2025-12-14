'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Search, X } from 'lucide-react';
import MagicBento, { BentoCardProps } from '@/components/ui/MagicBento';
import ContributionModal from '@/components/wiki/ContributionModal';

interface Topic {
    title: string;
    description: string;
    label: string;
    path: string;
    img?: string;
    color?: string;
    isExternal?: boolean;
    isContribution?: boolean;
    colSpan?: number;
}

export default function WikiPage() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');
    const [isContributionOpen, setIsContributionOpen] = useState(false);

    // Dynamic content topics
    const contentTopics: Topic[] = [
        {
            title: 'Vibe Coding',
            description: 'Khám phá phương pháp lập trình bằng cảm hứng với sự hỗ trợ của AI. Hiểu rõ cơ hội, rủi ro và cách làm chủ công nghệ.',
            label: 'Featured • New Era',
            path: '/wiki/vibecoding',
            img: 'https://nationalcioreview.com/wp-content/uploads/2025/09/TNCR-graphics-KB-2.gif',
            // Default size 1 for scalability
        },
        {
            title: 'Prompt Engineering',
            description: 'Nghệ thuật giao tiếp với AI: Từ cơ bản đến nâng cao để điều khiển LLM.',
            label: 'Technique',
            path: '/wiki/prompt-engineering',
            img: 'https://hackernoon.imgix.net/images/UVMjGHgzyLTVNpe8tVLGDGlCYw52-rm932rd.gif'
        },
        {
            title: 'DSA Foundations',
            description: 'Cấu trúc dữ liệu & Thuật toán cốt lõi. Array, Linked List, Heap, Graph và tư duy tối ưu.',
            label: 'Core • CS',
            path: '/learning/dsa',
            img: 'https://i.pinimg.com/originals/81/52/58/81525851413fac11dca44e57076b396a.gif',
        },
        {
            title: 'Linear Algebra',
            description: 'Tư duy hình học về vector, ma trận và không gian tuyến tính. Nền tảng của AI & Graphics.',
            label: 'Math • Visual',
            path: '/learning/linear-algebra',
            img: 'https://i.makeagif.com/media/4-14-2017/y2n4Hw.gif',
        },
        {
            title: 'Python Masters',
            description: 'Khóa học Python toàn diện từ con số 0. Video bài giảng kèm code mẫu và bài tập thực hành chi tiết.',
            label: 'Course • Free',
            path: '/learning/python-basics',
            img: 'https://topdev.vn/blog/wp-content/uploads/2017/12/python1.png',
        }
    ];

    // Special Community Topic (Always Footer)
    const communityTopic: Topic = {
        title: "Đóng góp chủ đề",
        description: "Cùng nhau xây dựng kho tàng kiến thức mở. Đóng góp bài viết, sửa lỗi và chia sẻ kinh nghiệm.",
        label: 'Open Source',
        path: '#',
        img: "http://i.pinimg.com/originals/d6/74/e7/d674e764a10d6b4f8cdd011f030c886f.gif",
        isContribution: true,
        colSpan: 3, // Full width
        color: '#7c3aed'
    };

    const filteredTopics = contentTopics.filter(topic =>
        topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        topic.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const cards: BentoCardProps[] = filteredTopics.map(topic => ({
        title: topic.title,
        description: topic.description,
        label: topic.label,
        colSpan: topic.colSpan || 1,
        rowSpan: 1,
        img: topic.img,
        color: topic.color || '#171717',
        onClick: topic.isContribution ? () => setIsContributionOpen(true) : () => router.push(topic.path),
        textAutoHide: false
    }));

    const communityCard: BentoCardProps = {
        title: communityTopic.title,
        description: communityTopic.description,
        label: communityTopic.label,
        colSpan: 3,
        rowSpan: 1,
        img: communityTopic.img,
        color: communityTopic.color,
        onClick: () => setIsContributionOpen(true),
        textAutoHide: false
    };

    return (
        <main className="min-h-screen bg-[#0a0a0a] text-white pt-24 pb-10">

            <div className="max-w-[1600px] mx-auto px-4 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-white/10 pb-8">
                    <div>
                        <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4">
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-red-400">
                                Wiki
                            </span>{' '}
                            Knowledge
                        </h1>
                        <p className="text-neutral-400 max-w-2xl text-lg">
                            Kho tàng kiến thức lập trình, thuật toán và công nghệ mới.
                            Được biên soạn và đóng góp bởi cộng đồng.
                        </p>
                    </div>

                    <div className="relative w-full md:w-96 group">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-neutral-500 group-focus-within:text-purple-400 transition-colors" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search topics..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="block w-full pl-10 pr-3 py-3 border border-white/10 rounded-xl leading-5 bg-white/5 text-neutral-300 placeholder-neutral-500 focus:outline-none focus:bg-white/10 focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 sm:text-sm transition-all shadow-lg"
                        />
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="mb-8">
                    {cards.length > 0 ? (
                        <MagicBento
                            items={cards}
                            enableStars={true}
                            enableSpotlight={true}
                            spotlightRadius={300}
                        />
                    ) : (
                        <div className="text-center py-20 bg-white/5 rounded-2xl border border-white/10">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 mb-4">
                                <Search className="w-8 h-8 text-neutral-500" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Không tìm thấy kết quả</h3>
                            <p className="text-neutral-400">Thử tìm kiếm với từ khóa khác xem sao.</p>
                        </div>
                    )}
                </div>

                {/* Persistent Community Section (Footer) */}
                <div className="mt-8 border-t border-white/5 pt-8">
                    <MagicBento
                        items={[communityCard]}
                        enableStars={true}
                        enableSpotlight={true}
                    />
                </div>
            </div>

            <ContributionModal
                isOpen={isContributionOpen}
                onClose={() => setIsContributionOpen(false)}
            />
        </main>
    );
}
