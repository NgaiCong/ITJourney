'use client';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Home, Map, Library, Wrench, Book } from 'lucide-react';
import StaggeredMenu from '@/components/ui/StaggeredMenu';
import GitHubStarButton from '@/components/common/GitHubStarButton';

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

  const menuItems = navItems.map(item => ({
    label: item.name,
    link: item.href,
    ariaLabel: item.name
  }));

  return (
    <>
      {/* Mobile Navigation (Staggered Menu) */}
      <div className="md:hidden">
        <StaggeredMenu
          items={menuItems}
          socialItems={socialItems}
          logoUrl="/images/logongang.png"
          accentColor="#fff"
          menuButtonColor="#fff"
          openMenuButtonColor="#fff"
        />
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex fixed top-0 left-0 w-full z-50 items-center justify-between px-6 py-6 pointer-events-none">

        {/* Logo - Left */}
        <Link href="/" className="pointer-events-auto transition-transform hover:scale-105">
          <img
            src="/images/logongang.png"
            alt="IT Journey Logo"
            className="h-20 w-auto object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
          />
        </Link>

        {/* Navigation Links - Right */}
        <div className="pointer-events-auto flex items-center gap-2 p-1.5 rounded-full border border-white/10 bg-neutral-900/50 backdrop-blur-xl shadow-[0_0_20px_rgba(255,255,255,0.15)] ring-1 ring-white/10">
          <nav className="flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 group",
                    isActive
                      ? "text-white bg-white/10"
                      : "text-neutral-400 hover:text-white hover:bg-white/5"
                  )}
                >
                  <Icon className={cn("w-4 h-4 transition-colors", isActive ? "text-white" : "group-hover:text-white")} />
                  <span className="inline-block">{item.name}</span>

                  {/* Active Indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-neutral-800 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] border border-white/5 -z-10"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    >
                      <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/5 to-transparent opacity-50" />
                    </motion.div>
                  )}
                </Link>
              );
            })}

            {/* Separator */}
            <div className="w-px h-6 bg-white/10 mx-2" />

            {/* GitHub Star Button */}
            <GitHubStarButton />
          </nav>
        </div>
      </div>
    </>
  );
}
