import Link from 'next/link';
import { Heart } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-black border-t border-white/10 py-12 px-6">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-8">

                {/* Left Side: Logo & Credits */}
                <div className="flex flex-col gap-4">
                    {/* Logo */}
                    <Link href="/">
                        <img
                            src="/images/logongang.png"
                            alt="Tworice Studio"
                            className="h-14 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity"
                        />
                    </Link>

                    {/* Credits */}
                    <div className="flex items-center gap-1.5 text-neutral-400 text-sm">
                        <span>Created with</span>
                        <Heart className="w-3.5 h-3.5 fill-neutral-600 text-neutral-600" />
                        <span>by</span>
                        <a
                            href="https://github.com/NgaiCong"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white font-medium hover:text-indigo-400 transition-colors"
                        >
                            NgaiCong
                        </a>
                    </div>

                    {/* Copyright */}
                    <div className="text-neutral-600 text-xs mt-2">
                        © 2025 Tworice.Studio
                    </div>
                </div>

                {/* Right Side: Navigation Links */}
                <nav className="flex items-center gap-8 mt-2">
                    <a
                        href="https://github.com/NgaiCong"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-neutral-400 hover:text-white text-sm font-medium transition-colors"
                    >
                        GitHub
                    </a>
                    <a
                        href="https://www.youtube.com/@2ricestudio"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-neutral-400 hover:text-white text-sm font-medium transition-colors"
                    >
                        YouTube
                    </a>
                    <a
                        href="https://www.tiktok.com/@2ricestu"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-neutral-400 hover:text-white text-sm font-medium transition-colors"
                    >
                        TikTok
                    </a>
                </nav>
            </div>
        </footer>
    );
}
