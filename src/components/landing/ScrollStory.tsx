'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { AlertCircle, Layers, ZoomIn, Award } from 'lucide-react';

const phases = [
    {
        id: 1,
        title: "Lạc Lối & Mông Lung",
        subtitle: "Lost & Confused",
        description: "Bạn có từng thấy mình 'lạc trôi' giữa hàng tá công nghệ mới? Hôm nay học React, mai lại thấy trend khác. Code chạy được đấy, nhưng hễ lỗi là 'tắt điện' vì chẳng hiểu tại sao.",
        icon: <AlertCircle className="w-12 h-12 md:w-24 md:h-24 text-red-500/80" />,
        color: "#171717", // neutral-900 (darker)
        textColor: "text-red-200",
        visualClass: "bg-grid-small-white/[0.2] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]",

        animationType: "chaotic"
    },
    {
        id: 2,
        title: "Xây Dựng Gốc Rễ",
        subtitle: "Foundation Reconstruction",
        description: "Khoan vội chạy theo ngọn. Hãy quay về cái gốc: Memory hoạt động thế nào? Mạng (Network) gửi nhận ra sao? Khi nền móng vững, nhà (kiến thức) xây cao mấy cũng không sợ đổ.",
        icon: <Layers className="w-12 h-12 md:w-24 md:h-24 text-blue-500" />,
        color: "#0a0a0a", // black
        textColor: "text-blue-200",
        visualClass: "bg-grid-white/[0.05]",
        animationType: "structured"
    },
    {
        id: 3,
        title: "Chuyên Sâu Tư Duy",
        subtitle: "Deep Dive",
        description: "Code giỏi không phải là gõ nhanh, mà là nghĩ sâu. Tại sao dùng giải thuật này? Làm sao để tối ưu hệ thống? Đó là lúc bạn 'nâng trình' từ thợ code lên người giải quyết vấn đề.",
        icon: <ZoomIn className="w-12 h-12 md:w-24 md:h-24 text-purple-500" />,
        color: "#0a0a0a",
        textColor: "text-purple-200",
        visualClass: "bg-dot-white/[0.2]",
        animationType: "flow"
    },
    {
        id: 4,
        title: "Làm Chủ Công Nghệ",
        subtitle: "Engineering Mastery",
        description: "Khi hiểu bản chất, công nghệ chỉ là công cụ. Bạn không còn sợ thay đổi, mà tự tin điều khiển nó. Từ người làm theo, bạn trở thành người kiến tạo hệ thống và dẫn dắt người khác.",
        icon: <Award className="w-12 h-12 md:w-24 md:h-24 text-yellow-500" />,
        color: "#0a0a0a",
        textColor: "text-yellow-200",
        visualClass: "bg-grid-small-white/[0.1]",
        animationType: "premium"
    }
];

const Card = ({ phase, index }: { phase: typeof phases[0], index: number }) => {
    const isEven = index % 2 === 0;

    return (
        <div className={`relative w-full h-[60vh] md:h-screen md:w-[80vw] lg:w-[60vw] flex-shrink-0 flex items-center justify-center p-6 md:p-12 overflow-hidden`}>
            <div className={`absolute inset-0 z-0 ${phase.visualClass}`} />

            <div
                className="absolute inset-0 opacity-20"
                style={{
                    background: `radial-gradient(circle at center, ${phase.textColor.replace('text-', '') === 'text-white' ? 'white' : phase.textColor.includes('red') ? '#ef4444' : phase.textColor.includes('blue') ? '#3b82f6' : phase.textColor.includes('purple') ? '#a855f7' : '#eab308'} 0%, transparent 70%)`
                }}
            />

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ margin: "-20%" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative z-10 w-full max-w-3xl bg-neutral-900/80 backdrop-blur-xl border border-white/10 p-8 md:p-12 rounded-3xl md:rounded-[3rem] shadow-2xl flex flex-col md:flex-row gap-8 items-center"
            >
                <div className={`flex-shrink-0 p-6 rounded-full bg-white/5 border border-white/5 ${phase.animationType === 'chaotic' ? 'animate-pulse' : ''}`}>
                    {phase.icon}
                </div>

                <div className="flex-1 text-center md:text-left">
                    <span className={`inline-block mb-2 md:mb-4 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs md:text-sm tracking-widest uppercase ${phase.textColor}`}>
                        Phase {phase.id}
                    </span>
                    <h3 className="text-3xl md:text-5xl font-bold text-white mb-2 tracking-tight">
                        {phase.title}
                    </h3>
                    <p className={`text-lg md:text-xl font-light italic mb-6 opacity-70 ${phase.textColor}`}>
                        {phase.subtitle}
                    </p>
                    <p className="text-neutral-400 text-base md:text-lg leading-relaxed">
                        {phase.description}
                    </p>
                </div>
            </motion.div>
        </div>
    )
}

export default function ScrollStory() {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

    return (
        <section ref={targetRef} className="relative bg-neutral-950">
            <div className="hidden lg:block h-[300vh] relative">
                <div className="sticky top-0 h-screen overflow-hidden flex items-center">
                    <motion.div style={{ x }} className="flex">
                        {phases.map((phase, i) => (
                            <div key={i} className="w-screen h-screen flex items-center justify-center flex-shrink-0 relative">
                                <Card phase={phase} index={i} />
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>

            <div className="block lg:hidden flex flex-col gap-0">
                {phases.map((phase, i) => (
                    <Card key={i} phase={phase} index={i} />
                ))}
            </div>
        </section>
    );
}
