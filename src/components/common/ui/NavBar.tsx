"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { 
  Home, 
  Map, 
  Library,
  Wrench,
  User,
  LogIn
} from "lucide-react";

export const NavBar = () => {
  const pathname = usePathname();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const navItems = [
    { name: "Trang Chủ", url: "/", icon: Home },
    { name: "Lộ Trình", url: "/roadmap", icon: Map },
    { name: "Tài Nguyên", url: "/resources", icon: Library },
    { name: "Công Cụ", url: "/tools", icon: Wrench },
    user 
      ? { name: "Hồ sơ", url: "/profile", icon: User }
      : { name: "Đăng nhập", url: "/auth/login", icon: LogIn },
  ];

  return (
    <div className="fixed top-6 inset-x-0 max-w-fit mx-auto z-50">
      <nav className="relative rounded-full border border-white/10 bg-neutral-900/80 backdrop-blur-md shadow-lg px-4 py-2 flex items-center gap-2">
        {navItems.map((item, index) => {
          const isActive = pathname === item.url || (item.url !== '/' && pathname.startsWith(item.url));
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.url}
              className={`relative px-3 py-2 rounded-full text-sm font-medium transition-colors duration-200 flex items-center gap-2
                ${isActive ? "text-white" : "text-neutral-400 hover:text-white"}
              `}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <AnimatePresence>
                {hoveredIndex === index && (
                  <motion.span
                    className="absolute inset-0 rounded-full bg-neutral-800"
                    layoutId="hoverBackground"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, transition: { duration: 0.15 } }}
                    exit={{ opacity: 0, transition: { duration: 0.15, delay: 0.2 } }}
                  />
                )}
              </AnimatePresence>
              
              <span className="relative z-10 flex items-center gap-2">
                <Icon className="w-4 h-4" />
                <span className="hidden md:inline">{item.name}</span>
              </span>
              
              {isActive && (
                <motion.span
                  layoutId="activeIndicator"
                  className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-white to-transparent"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};
