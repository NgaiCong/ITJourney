// components/Navigation.tsx
"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect } from "react";
import { Menu, X, Sparkles } from "lucide-react";
import AuthButton from "./AuthButton";
import { navigationData } from "@/data/roadmap";
import { cn } from "@/lib/utils";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  
  // Background opacity based on scroll
  const bgOpacity = useTransform(scrollY, [0, 100], [0, 0.95]);
  const borderOpacity = useTransform(scrollY, [0, 100], [0, 0.1]);

  // Close menu on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (isMenuOpen) setIsMenuOpen(false);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMenuOpen]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
      setIsMenuOpen(false);
    }
  };

  return (
    <>
      <motion.header
        style={{
          backgroundColor: `rgba(5, 5, 5, ${bgOpacity.get()})`,
          borderBottomColor: `rgba(255, 255, 255, ${borderOpacity.get()})`,
        }}
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg border-b transition-colors duration-300"
      >
        <nav className="container mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href="#"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 group"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <div className="w-8 h-8 rounded-lg bg-linear-to-br from-white to-neutral-400 flex items-center justify-center group-hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-shadow duration-300">
              <Sparkles className="w-4 h-4 text-black" />
            </div>
            <span className="font-bold text-white text-sm tracking-tight hidden sm:block">
              RE-ENGINEER
            </span>
          </motion.a>

          {/* Desktop Navigation */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="hidden md:flex items-center gap-1"
          >
            {navigationData.map((phase) => (
              <button
                key={phase.id}
                onClick={() => scrollToSection(phase.id)}
                className="group relative px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors"
              >
                <span className="relative z-10">{phase.title}</span>
                <span 
                  className="absolute bottom-1 left-4 right-4 h-px scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                  style={{ backgroundColor: phase.color }}
                />
              </button>
            ))}
          </motion.div>

          {/* Right side */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center gap-4"
          >
            <AuthButton />
            
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </motion.div>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={{
          opacity: isMenuOpen ? 1 : 0,
          pointerEvents: isMenuOpen ? "auto" : "none",
        }}
        className="fixed inset-0 z-40 md:hidden"
      >
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/80 backdrop-blur-xl"
          onClick={() => setIsMenuOpen(false)}
        />
        
        {/* Menu Content */}
        <motion.nav
          initial={{ x: "100%" }}
          animate={{ x: isMenuOpen ? 0 : "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="absolute right-0 top-0 bottom-0 w-80 bg-[#0a0a0a] border-l border-white/10 p-6 pt-24"
        >
          <div className="space-y-2">
            {navigationData.map((phase, index) => (
              <motion.button
                key={phase.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: isMenuOpen ? 1 : 0, x: isMenuOpen ? 0 : 20 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => scrollToSection(phase.id)}
                className={cn(
                  "w-full flex items-center gap-4 p-4 rounded-xl text-left",
                  "bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 hover:border-white/10",
                  "transition-all duration-300"
                )}
              >
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold"
                  style={{ backgroundColor: `${phase.color}20`, color: phase.color }}
                >
                  {String(index + 1).padStart(2, '0')}
                </div>
                <div>
                  <div className="text-white font-medium">{phase.title}</div>
                  <div className="text-gray-500 text-xs">{phase.months}</div>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Mobile CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isMenuOpen ? 1 : 0 }}
            transition={{ delay: 0.4 }}
            className="mt-8 pt-8 border-t border-white/10"
          >
            <button className="w-full py-3 bg-linear-to-r from-white to-neutral-400 text-black font-bold rounded-full">
              Bắt Đầu Ngay
            </button>
          </motion.div>
        </motion.nav>
      </motion.div>
    </>
  );
}
