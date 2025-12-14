'use client';

import { motion } from 'framer-motion';
import { Compass, Map, Target, Zap } from 'lucide-react';
import SpotlightCard from '@/components/ui/SpotlightCard';

const features = [
    {
        icon: <Compass className="w-8 h-8 text-blue-400" />,
        title: "Định Hướng Rõ Ràng",
        description: "Không còn mông lung giữa rừng công nghệ. Bắt đầu từ những nền tảng cốt lõi nhất mà mọi kỹ sư IT đều cần."
    },
    {
        icon: <Map className="w-8 h-8 text-purple-400" />,
        title: "Lộ Trình Toàn Diện",
        description: "Từ tư duy máy tính, phần cứng, mạng đến lập trình. Xây dựng gốc rễ vững chắc trước khi chọn chuyên ngành."
    },
    {
        icon: <Target className="w-8 h-8 text-green-400" />,
        title: "Đa Dạng Hướng Đi",
        description: "Dù bạn muốn làm Web, Game, Mobile hay Security, nền tảng này sẽ là bệ phóng vững chắc nhất."
    },
    {
        icon: <Zap className="w-8 h-8 text-yellow-400" />,
        title: "Thực Chiến Ngay",
        description: "Học đi đôi với hành. Các bài tập Lab và dự án thực tế giúp bạn có kinh nghiệm ngay từ ngày đầu."
    }
];

export default function Introduction() {
    return (
        <section className="py-24 bg-neutral-950 relative overflow-hidden">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

            <div className="container mx-auto px-6 max-w-6xl relative z-10">
                <div className="text-center mb-16 space-y-4">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-bold text-white tracking-tight"
                    >
                        Khởi Đầu Sự Nghiệp IT Của Bạn
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-lg text-neutral-400 max-w-2xl mx-auto"
                    >
                        JourneyOfIT là bản đồ chỉ đường dành cho người mới bắt đầu.
                        Chúng tôi tập trung vào những kiến thức nền tảng "bất biến" giúp bạn đi xa hơn trong ngành công nghệ.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <SpotlightCard className="h-full bg-neutral-900/40 border-neutral-800" spotlightColor="rgba(255,255,255,0.05)">
                                <div className="p-8">
                                    <div className="mb-6 p-4 bg-white/5 w-fit rounded-2xl border border-white/10">
                                        {feature.icon}
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                                    <p className="text-neutral-400 leading-relaxed">
                                        {feature.description}
                                    </p>
                                </div>
                            </SpotlightCard>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
