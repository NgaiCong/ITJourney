// components/HeroSection.tsx
"use client";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowDown, Sparkles, Zap } from "lucide-react";
import { useEffect, useState, useRef, useCallback, useMemo } from "react";

// Matrix rain characters
const matrixChars = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF";

// Seeded random for consistent values
function seededRandom(seed: number) {
  const x = Math.sin(seed * 9999) * 10000;
  return x - Math.floor(x);
}

// Typewriter effect hook
function useTypewriter(text: string, speed: number = 50, delay: number = 0) {
  const [displayText, setDisplayText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    let currentIndex = 0;

    const startTyping = () => {
      if (currentIndex < text.length) {
        setDisplayText(text.slice(0, currentIndex + 1));
        currentIndex++;
        timeout = setTimeout(startTyping, speed);
      } else {
        setIsComplete(true);
      }
    };

    const delayTimeout = setTimeout(startTyping, delay);

    return () => {
      clearTimeout(timeout);
      clearTimeout(delayTimeout);
    };
  }, [text, speed, delay]);

  return { displayText, isComplete };
}

// Matrix Rain Column Component
function MatrixColumn({ delay, duration, seed }: { delay: number; duration: number; seed: number }) {
  const chars = useMemo(() => 
    Array.from({ length: 20 }, (_, i) => 
      matrixChars[Math.floor(seededRandom(seed + i) * matrixChars.length)]
    ), [seed]
  );

  return (
    <motion.div
      initial={{ y: "-100%" }}
      animate={{ y: "100%" }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "linear",
      }}
      className="absolute text-white/20 font-mono text-xs leading-tight whitespace-pre select-none"
    >
      {chars.map((char, i) => (
        <div
          key={i}
          style={{ opacity: 1 - i * 0.05 }}
          className={i === 0 ? "text-white" : ""}
        >
          {char}
        </div>
      ))}
    </motion.div>
  );
}

// Magnetic Button Component
function MagneticButton({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springConfig = { damping: 15, stiffness: 150 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    
    x.set(distanceX * 0.3);
    y.set(distanceY * 0.3);
  }, [x, y]);

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.button
      ref={ref}
      style={{ x: xSpring, y: ySpring }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="group relative px-8 py-4 bg-transparent border-2 border-white/20 rounded-full overflow-hidden transition-all duration-300"
    >
      {/* Glow effect */}
      <div className="absolute inset-0 bg-white/10 blur-xl group-hover:bg-white/20 transition-all duration-500" />
      
      {/* Animated border gradient */}
      <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-[-2px] rounded-full bg-linear-to-r from-white via-neutral-400 to-neutral-600 animate-spin-slow" />
        <div className="absolute inset-[2px] rounded-full bg-[#050505]" />
      </div>
      
      {/* Button content */}
      <span className="relative z-10 flex items-center gap-2 text-white font-semibold tracking-wider uppercase text-sm group-hover:text-white transition-colors">
        <Sparkles className="w-4 h-4" />
        {children}
        <Zap className="w-4 h-4" />
      </span>
      
      {/* Shine effect */}
      <motion.div
        className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-linear-to-r from-transparent via-white/20 to-transparent skew-x-12"
      />
    </motion.button>
  );
}

// Pre-computed particle data
const particleData = Array.from({ length: 50 }, (_, i) => ({
  id: i,
  initialX: seededRandom(i * 100) * 100,
  initialY: seededRandom(i * 200) * 100,
  animateY: seededRandom(i * 300) * -500,
  duration: seededRandom(i * 400) * 10 + 10,
  delay: seededRandom(i * 500) * 5,
}));

// Floating Particles
function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particleData.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-1 h-1 bg-white/20 rounded-full"
          style={{
            left: `${particle.initialX}%`,
            top: `${particle.initialY}%`,
          }}
          animate={{
            y: [0, particle.animateY],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
          }}
        />
      ))}
    </div>
  );
}

// Pre-computed matrix column data
const matrixColumnData = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  left: i * 3.33,
  delay: seededRandom(i * 10) * 2,
  duration: seededRandom(i * 20) * 3 + 2,
  seed: i * 100,
}));

// Code snippet that appears to be typing
const codeSnippet = `> Initializing Re-Engineer Protocol...
> Loading mindset: GROWTH_MODE
> Purging AI dependencies...
> status: READY_FOR_TRANSFORMATION`;

export default function HeroSection() {
  const { displayText, isComplete } = useTypewriter(codeSnippet, 30, 1500);
  const [showMatrix, setShowMatrix] = useState(true);

  // Hide matrix after initial animation
  useEffect(() => {
    const timer = setTimeout(() => setShowMatrix(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  const scrollToContent = () => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  };

  return (
    <section className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#050505]">
      {/* Matrix Rain Background */}
      {showMatrix && (
        <div className="absolute inset-0 overflow-hidden opacity-30">
          {matrixColumnData.map((col) => (
            <div
              key={col.id}
              className="absolute h-full"
              style={{ left: `${col.left}%` }}
            >
              <MatrixColumn delay={col.delay} duration={col.duration} seed={col.seed} />
            </div>
          ))}
        </div>
      )}

      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-size-[64px_64px]" />
      
      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#050505_70%)]" />

      {/* Multiple Lighting Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-white/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-neutral-400/5 blur-[100px] rounded-full pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-neutral-500/5 blur-[80px] rounded-full pointer-events-none animate-pulse-slow" style={{ animationDelay: '2s' }} />

      {/* Floating Particles */}
      <FloatingParticles />

      {/* Main Content */}
      <div className="z-10 text-center space-y-8 px-4 max-w-6xl mx-auto">
        {/* Terminal Code Block */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="relative mx-auto max-w-md"
        >
          <div className="bg-black/60 backdrop-blur-sm border border-white/10 rounded-lg p-4 font-mono text-xs text-left">
            <div className="flex gap-2 mb-3">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <pre className="text-neutral-300 whitespace-pre-wrap">
              {displayText}
              {!isComplete && <span className="animate-pulse">█</span>}
            </pre>
          </div>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-white tracking-[0.3em] text-xs md:text-sm uppercase font-mono"
        >
          From Knowledge Debt to Engineering Mastery
        </motion.p>

        {/* Main Title with Kinetic Typography */}
        <div className="relative">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 1 }}
            className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-white tracking-tighter leading-[0.85]"
          >
            <motion.span
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="block"
            >
              THE
            </motion.span>
            <motion.span
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
              className="block relative"
            >
              RE-ENGINEER
              {/* Glitch effect on hover */}
              <span className="absolute inset-0 text-white opacity-0 hover:opacity-100 transition-opacity" style={{ clipPath: 'inset(10% 0 60% 0)' }}>
                RE-ENGINEER
              </span>
            </motion.span>
            <motion.span
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.6, ease: [0.16, 1, 0.3, 1] }}
              className="block text-transparent bg-clip-text bg-linear-to-r from-white via-neutral-300 to-neutral-500 animate-gradient-x"
            >
              PATH.
            </motion.span>
          </motion.h1>
        </div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.8, y: 0 }}
          transition={{ duration: 1, delay: 2 }}
          className="max-w-2xl mx-auto text-gray-400 text-base md:text-lg lg:text-xl font-light leading-relaxed"
        >
          Hành trình <span className="text-white font-medium">12 tháng</span> tái cấu trúc tư duy lập trình từ con số 0.
          <span className="block mt-3 text-neutral-300 font-mono text-sm tracking-wider">
            KHÔNG ĐƯỜNG TẮT. KHÔNG LẠM DỤNG AI. CHỈ CÓ KỸ THUẬT THUẦN TÚY.
          </span>
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 2.5 }}
          className="pt-8"
        >
          <MagneticButton onClick={scrollToContent}>
            Bắt Đầu Hành Trình
          </MagneticButton>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 3 }}
          className="flex flex-wrap justify-center gap-8 md:gap-16 pt-12 text-center"
        >
          {[
            { value: "4", label: "Phases" },
            { value: "12", label: "Months" },
            { value: "∞", label: "Growth" },
          ].map((stat, i) => (
            <div key={i} className="group">
              <div className="text-3xl md:text-4xl font-bold text-white group-hover:text-white transition-colors">
                {stat.value}
              </div>
              <div className="text-xs text-gray-500 uppercase tracking-widest mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 3.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] text-gray-600 uppercase tracking-[0.3em] font-mono">Cuộn xuống để bắt đầu</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="w-5 h-5 text-white/50" />
        </motion.div>
      </motion.div>

      {/* Corner Decorations */}
      <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-white/10" />
      <div className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-white/10" />
      <div className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-white/10" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-white/10" />
    </section>
  );
}