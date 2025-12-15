
"use client";
import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";
import { useRef } from "react";

interface GlowingLineProps {
  className?: string;
}


function DecorativeNode({
  position,
  smoothProgress
}: {
  position: number;
  smoothProgress: MotionValue<number>;
}) {
  const opacity = useTransform(
    smoothProgress,
    [position - 0.1, position, position + 0.1],
    [0.2, 1, 0.2]
  );

  return (
    <motion.div
      style={{
        top: `${position * 100}%`,
        opacity,
      }}
      className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2"
    >
      <div
        className="w-2 h-2 rounded-full border border-white/50"
        style={{
          boxShadow: "0 0 10px rgba(255,255,255,0.3)",
        }}
      />
    </motion.div>
  );
}

export default function GlowingLine({ className }: GlowingLineProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });


  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const height = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);
  const glowOpacity = useTransform(smoothProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0.5]);

  return (
    <div
      ref={containerRef}
      className={`absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 ${className}`}
    >

      <div className="absolute inset-0 w-full bg-linear-to-b from-transparent via-white/5 to-transparent" />


      <motion.div
        style={{ height }}
        className="relative w-full overflow-hidden"
      >

        <div className="absolute inset-0 w-full bg-linear-to-b from-white via-neutral-400 to-neutral-600" />


        <motion.div
          style={{ opacity: glowOpacity }}
          className="absolute inset-0 w-full bg-linear-to-b from-white via-neutral-400 to-neutral-600 blur-sm"
        />


        <motion.div
          style={{ opacity: glowOpacity }}
          className="absolute inset-[-4px] bg-linear-to-b from-white/50 via-neutral-400/50 to-neutral-600/50 blur-md"
        />


        <motion.div
          className="absolute inset-0 w-full"
          style={{
            background: "linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)",
            height: "50px",
          }}
          animate={{
            y: ["-50px", "100%"],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </motion.div>


      <motion.div
        style={{
          top: height,
          opacity: glowOpacity,
        }}
        className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2"
      >

        <div className="absolute -inset-3 bg-white/30 rounded-full blur-lg animate-pulse" />


        <div className="absolute -inset-2 bg-white/50 rounded-full blur-md" />


        <div className="relative w-3 h-3 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
      </motion.div>


      {[0.25, 0.5, 0.75].map((position, index) => (
        <DecorativeNode
          key={index}
          position={position}
          smoothProgress={smoothProgress}
        />
      ))}
    </div>
  );
}


export function GlowingLineHorizontal({ className }: GlowingLineProps) {
  const { scrollXProgress } = useScroll();

  const smoothProgress = useSpring(scrollXProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const width = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  return (
    <div className={`absolute top-1/2 left-0 right-0 h-px -translate-y-1/2 ${className}`}>
      <div className="absolute inset-0 h-full bg-linear-to-r from-transparent via-white/5 to-transparent" />

      <motion.div
        style={{ width }}
        className="relative h-full overflow-hidden"
      >
        <div className="absolute inset-0 h-full bg-linear-to-r from-white via-neutral-400 to-neutral-600" />
        <div className="absolute inset-0 h-full bg-linear-to-r from-white via-neutral-400 to-neutral-600 blur-sm" />
      </motion.div>
    </div>
  );
}
