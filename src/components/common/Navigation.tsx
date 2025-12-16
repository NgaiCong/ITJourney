'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Home, Map, Library, Wrench, Book } from 'lucide-react';
import GitHubStarButton from '@/components/common/GitHubStarButton';
import MobileNavbar from '@/components/common/MobileNavbar';

const navItems = [
  { name: 'Trang Chủ', href: '/', icon: Home },
  { name: 'Lộ Trình', href: '/roadmap', icon: Map },
  { name: 'Tài Nguyên', href: '/resources', icon: Library },
  { name: 'Wiki', href: '/wiki', icon: Book },
  { name: 'Công Cụ', href: '/tools', icon: Wrench },
];

const socialItems = [
  { label: 'Facebook', link: 'https://facebook.com' },
  { label: 'YouTube', link: 'https://youtube.com' },
  { label: 'TikTok', link: 'https://tiktok.com' }
];

export default function Navigation() {
  const pathname = usePathname();
  const [hoveredTab, setHoveredTab] = React.useState<string | null>(null);

  const menuItems = navItems.map(item => ({
    label: item.name,
    link: item.href,
    ariaLabel: item.name
  }));

  return (
    <>

      <MobileNavbar />


      <div className="hidden xl:flex fixed top-0 left-0 w-full z-50 items-center justify-between px-6 py-6 pointer-events-none">


        <Link href="/" className="pointer-events-auto transition-transform hover:scale-105">
          <img
            src="/images/logongang.png"
            alt="IT Journey Logo"
            className="h-20 w-auto object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
          />
        </Link>


        <div className="pointer-events-auto flex items-center gap-2 p-1.5 rounded-full border border-white/10 bg-black/20 backdrop-blur-md shadow-[0_0_20px_rgba(255,255,255,0.05)] ring-1 ring-white/5">
          <nav
            className="flex items-center gap-1"
            onMouseLeave={() => setHoveredTab(null)}
          >
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onMouseEnter={() => setHoveredTab(item.href)}
                  className={cn(
                    "relative px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 flex items-center gap-2",
                    isActive ? "text-white" : "text-neutral-400 hover:text-white"
                  )}
                >
                  <Icon className={cn("w-4 h-4 transition-colors", isActive ? "text-white" : "group-hover:text-white")} />
                  <span className="relative z-10">{item.name}</span>


                  {hoveredTab === item.href && !isActive && (
                    <motion.div
                      layoutId="nav-hover"
                      className="absolute inset-0 rounded-full bg-white/5 -z-10"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}


                  {isActive && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-white/10 backdrop-blur-md shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] border border-white/10 -z-10"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    >
                      <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/10 to-transparent opacity-50" />
                    </motion.div>
                  )}
                </Link>
              );
            })}


            <div className="w-px h-6 bg-white/10 mx-2" />


            <GitHubStarButton />
          </nav>
        </div>
      </div>
    </>
  );
}
