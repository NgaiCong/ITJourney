'use client'

import Noise from '@/components/ui/Noise';
import ScrollReveal from '@/components/ui/ScrollReveal';
import LogoLoop from '@/components/ui/LogoLoop';
import { SiCplusplus, SiPython, SiRust, SiOpencv, SiTensorflow, SiPytorch, SiLinux, SiGit } from 'react-icons/si';

const techLogos = [
    { node: <SiCplusplus className="text-neutral-400 group-hover:text-white transition-colors" />, title: "C++", href: "https://isocpp.org/" },
    { node: <SiPython className="text-neutral-400 group-hover:text-white transition-colors" />, title: "Python", href: "https://www.python.org/" },
    { node: <SiRust className="text-neutral-400 group-hover:text-white transition-colors" />, title: "Rust", href: "https://www.rust-lang.org/" },
    { node: <SiOpencv className="text-neutral-400 group-hover:text-white transition-colors" />, title: "OpenCV", href: "https://opencv.org/" },
    { node: <SiTensorflow className="text-neutral-400 group-hover:text-white transition-colors" />, title: "TensorFlow", href: "https://www.tensorflow.org/" },
    { node: <SiPytorch className="text-neutral-400 group-hover:text-white transition-colors" />, title: "PyTorch", href: "https://pytorch.org/" },
    { node: <SiLinux className="text-neutral-400 group-hover:text-white transition-colors" />, title: "Linux", href: "https://www.kernel.org/" },
    { node: <SiGit className="text-neutral-400 group-hover:text-white transition-colors" />, title: "Git", href: "https://git-scm.com/" },
];




export default function Manifesto() {
    return (
        <>
            <section className="py-24 border-t border-white/5 bg-neutral-900/30 relative overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Noise
                        patternSize={350}
                        patternScaleX={1}
                        patternScaleY={1}
                        patternRefreshInterval={2}
                        patternAlpha={15}
                    />
                </div>

                <div className="max-w-4xl mx-auto text-center relative z-10 flex flex-col items-center px-6">

                    <div className="mb-10">
                        <ScrollReveal
                            baseOpacity={0}
                            enableBlur={true}
                            baseRotation={5}
                            blurStrength={10}
                            textClassName="text-3xl md:text-5xl font-bold text-white tracking-tight text-center"
                            rotationEnd="bottom 60%"
                            wordAnimationEnd="bottom 60%"
                        >
                            &ldquo;Giá trị cốt lõi của lập trình viên không nằm ở những dòng code, mà ở chiều sâu của tư duy giải quyết vấn đề&rdquo;
                        </ScrollReveal>
                    </div>

                    <p className="text-neutral-400 text-lg md:text-xl leading-relaxed mb-12 italic max-w-2xl mx-auto">
                        Công cụ chỉ mạnh khi người dùng nó đủ sâu sắc. Đừng để sự tiện lợi của AI cướp đi cơ hội rèn luyện tư duy của chính bạn.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-neutral-400">
                            Kỷ Luật
                        </span>
                        <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-neutral-400">
                            Kiên Nhẫn
                        </span>
                        <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-neutral-400">
                            Nền Tảng Vững
                        </span>
                    </div>
                </div>

                <div className="mt-20 w-full relative z-10 opacity-70">
                    <LogoLoop
                        logos={techLogos}
                        speed={80}
                        direction="left"
                        logoHeight={40}
                        gap={60}
                        hoverSpeed={20}
                        scaleOnHover={false}
                        fadeOut
                        ariaLabel="Technology partners"
                        className="mask-linear-fade"
                    />
                </div>
            </section>
        </>
    )
}
