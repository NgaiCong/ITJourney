'use client';

import { motion } from 'framer-motion';
import { Users, ArrowRight, ExternalLink } from 'lucide-react';
import SpotlightCard from '@/components/ui/SpotlightCard';

export default function Community() {
    return (
        <section className="py-24 bg-black relative overflow-hidden">
            <div className="container mx-auto px-6 max-w-5xl relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60 mb-6">
                        Cộng Đồng Của Chúng Ta
                    </h2>
                    <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
                        Đừng đi một mình. Hãy tham gia cộng đồng những người cùng chí hướng, cùng chia sẻ kiến thức và giúp đỡ nhau phát triển sự nghiệp.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="flex justify-center"
                >
                    <a
                        href="https://www.facebook.com/groups/719531714538364"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative w-full max-w-2xl"
                    >
                        <SpotlightCard
                            className="w-full bg-neutral-900/50 border-neutral-800"
                            spotlightColor="rgba(59, 130, 246, 0.2)"
                        >
                            <div className="p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
                                <div className="p-4 bg-blue-600/10 rounded-2xl border border-blue-600/20 group-hover:bg-blue-600/20 transition-colors">
                                    <Users className="w-12 h-12 text-blue-500" />
                                </div>

                                <div className="flex-1">
                                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors flex items-center justify-center md:justify-start gap-2">
                                        Tham gia Group Facebook
                                        <ExternalLink className="w-5 h-5 opacity-50 group-hover:opacity-100 transition-opacity" />
                                    </h3>
                                    <p className="text-neutral-400">
                                        Nơi thảo luận, hỏi đáp và cập nhật những xu hướng công nghệ mới nhất. Cùng nhau xây dựng nền tảng vững chắc.
                                    </p>
                                </div>

                                <div className="flex items-center justify-center w-12 h-12 rounded-full border border-white/10 bg-white/5 group-hover:scale-110 group-hover:bg-white/10 transition-all">
                                    <ArrowRight className="w-6 h-6 text-white group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        </SpotlightCard>
                    </a>
                </motion.div>
            </div>

            {/* Ambient Background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-900/20 blur-[120px] rounded-full pointer-events-none" />
        </section>
    );
}
