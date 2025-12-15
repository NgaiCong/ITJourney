'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ManifestoReveal() {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        if (!textRef.current) return;

        const words = textRef.current.querySelectorAll('.word');

        gsap.fromTo(words,
            { opacity: 0.1 },
            {
                opacity: 1,
                stagger: 0.1,
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                    end: "bottom 50%",
                    scrub: true,
                }
            }
        );

    }, []);

    const text = "Chúng tôi tin rằng bất kỳ ai cũng có thể trở thành Kỹ sư phần mềm xuất sắc. Không cần IQ thiên tài, không cần đường tắt. Chỉ cần sự kiên trì, lộ trình đúng đắn và khát khao hiểu sâu vấn đề.";

    return (
        <section ref={containerRef} className="min-h-screen flex items-center justify-center bg-[#050505] py-20 px-4">
            <div className="max-w-5xl mx-auto text-center">
                <p ref={textRef} className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight text-white">
                    {text.split(" ").map((word, i) => (
                        <span key={i} className="word inline-block mr-3 opacity-10 transition-colors duration-200">
                            {word}
                        </span>
                    ))}
                </p>
                <div className="mt-20">
                    <button className="px-10 py-4 bg-white text-black rounded-full font-bold text-lg hover:scale-105 transition-transform">
                        Tham gia ngay
                    </button>
                </div>
            </div>
        </section>
    );
}
