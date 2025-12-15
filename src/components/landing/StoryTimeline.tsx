'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

const phases = [
    {
        id: '01',
        title: 'Lạc Lối',
        description: 'Code chạy nhưng không hiểu tại sao. Copy paste vô hồn từ StackOverflow. Cảm giác mông lung mỗi khi gặp bug khó.',
        color: 'from-gray-500 to-slate-500'
    },
    {
        id: '02',
        title: 'Vỡ Mộng',
        description: 'Nhận ra Framework chỉ là công cụ. Khi công nghệ thay đổi, mình lại trở về vạch xuất phát. Sự tự tin chạm đáy.',
        color: 'from-red-600 to-red-500'
    },
    {
        id: '03',
        title: 'Tỉnh Thức',
        description: 'Quyết định dừng lại. Không chạy theo trend nữa. Quay về học những thứ cơ bản nhất: Memory, CPU, Network.',
        color: 'from-orange-500 to-amber-500'
    },
    {
        id: '04',
        title: 'Tu Luyện',
        description: 'Đắm mình trong Data Structures & Algorithms. Viết lại từng dòng code C/C++. Hiểu sâu sắc từng bit và byte.',
        color: 'from-yellow-400 to-yellow-600'
    },
    {
        id: '05',
        title: 'Ngộ Đạo',
        description: 'Mọi dòng code bắt đầu có ý nghĩa. Nhìn thấy bức tranh toàn cảnh của hệ thống. Bug trở thành bài toán thú vị.',
        color: 'from-green-500 to-emerald-600'
    },
    {
        id: '06',
        title: 'Kiến Tạo',
        description: 'Xây dựng những hệ thống phức tạp từ con số 0. Tự tin thiết kế architecture. Code đạt đến độ Clean và Performant.',
        color: 'from-blue-500 to-cyan-500'
    },
    {
        id: '07',
        title: 'Di Sản',
        description: 'Không chỉ là Code. Là tư duy, là văn hóa. Truyền lửa và kiến thức cho thế hệ kế tiếp. Xây dựng cộng đồng.',
        color: 'from-purple-500 to-violet-600'
    }
];

export default function StoryTimeline() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const pin = gsap.fromTo(
            sectionRef.current,
            {
                translateX: 0,
            },
            {
                translateX: "-900vw",
                ease: "none",
                duration: 1,
                scrollTrigger: {
                    trigger: triggerRef.current,
                    start: "top top",
                    end: "12000 top",
                    scrub: 1,
                    pin: true,
                },
            }
        );

        return () => {
            pin.kill();
        };
    }, []);

    return (
        <section className="overflow-hidden bg-[#050505] text-white">
            <div ref={triggerRef}>
                <div
                    ref={sectionRef}
                    className="h-screen w-[1050vw] flex flex-row relative"
                >
                    {phases.map((phase) => (
                        <div
                            key={phase.id}
                            className="w-[150vw] h-screen flex flex-col justify-center items-center p-10 border-r border-white/5 relative"
                        >

                            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[30vw] font-bold text-white/5 select-none z-0">
                                {phase.id}
                            </span>

                            <div className="relative z-10 max-w-4xl text-center">
                                <motion.div
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8 }}
                                    viewport={{ once: false }}
                                >
                                    <h3 className={`text-5xl md:text-8xl font-black tracking-tighter mb-4 md:mb-8 bg-gradient-to-r ${phase.color} bg-clip-text text-transparent`}>
                                        {phase.title}
                                    </h3>
                                    <p className="text-lg md:text-3xl text-neutral-400 font-light leading-relaxed max-w-sm md:max-w-2xl mx-auto">
                                        {phase.description}
                                    </p>
                                </motion.div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="w-full text-center py-4 bg-neutral-900/50 text-neutral-500 text-sm uppercase tracking-widest fixed bottom-0 left-0 z-50 pointer-events-none opacity-0">

            </div>
        </section>
    );
}
