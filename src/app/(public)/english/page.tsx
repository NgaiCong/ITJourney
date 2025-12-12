'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Languages, ChevronLeft, ChevronRight, RotateCcw, Check, BookOpen } from 'lucide-react';
import SpotlightCard from '@/components/ui/SpotlightCard'; // Keeping SpotlightCard here for Flashcards as user only asked to remove it from Dashboard
import { StorageService } from '@/lib/storage';
import { vocabularyData } from '@/data/vocabulary';

type Category = keyof typeof vocabularyData;

export default function EnglishPage() {
    const [selectedCategory, setSelectedCategory] = useState<Category>('Phần cứng & Hệ thống');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);

    // Load progress from Storage
    const [progress, setProgress] = useState(() => StorageService.getFlashcardProgress());

    const cards = vocabularyData[selectedCategory];
    const currentCard = cards[currentIndex];

    // Calculate stats derived from progress
    const knownCount = Object.values(progress).filter(p => p.status === 'mastered' || p.status === 'review').length;
    const learningCount = Object.values(progress).filter(p => p.status === 'learning').length;

    const nextCard = () => {
        setIsFlipped(false);
        setTimeout(() => {
            setCurrentIndex((prev) => (prev + 1) % cards.length);
        }, 150);
    };

    const prevCard = () => {
        setIsFlipped(false);
        setTimeout(() => {
            setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
        }, 150);
    };

    const markAsKnown = () => {
        StorageService.updateFlashcard(currentCard.term, 5); // 5 = Perfect
        setProgress(StorageService.getFlashcardProgress()); // Refresh state
        nextCard();
    };

    const markAsLearning = () => {
        StorageService.updateFlashcard(currentCard.term, 1); // 1 = Wrong
        setProgress(StorageService.getFlashcardProgress()); // Refresh state
        nextCard();
    };

    const totalCards = Object.values(vocabularyData).flat().length;

    // Helper to check status of current card for spotlight color
    const getCardStatus = (term: string) => {
        const p = progress[term];
        if (!p) return 'new';
        if (p.status === 'mastered' || p.status === 'review') return 'known';
        return 'learning';
    };


    return (
        <main className="min-h-screen bg-neutral-950 text-white pt-24 pb-16">
            <div className="container mx-auto px-6 max-w-4xl">
                {/* Header */}
                <div className="text-center mb-12">
                    <Languages className="w-12 h-12 text-white/80 mx-auto mb-4" />
                    <h1 className="text-4xl font-bold mb-2">Flashcards Từ Vựng IT</h1>
                    <p className="text-neutral-400">Học {totalCards} từ vựng tiếng Anh chuyên ngành quan trọng nhất</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                    <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
                        <p className="text-2xl font-bold text-white">{totalCards}</p>
                        <p className="text-xs text-neutral-400">Tổng từ</p>
                    </div>
                    <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-center">
                        <p className="text-2xl font-bold text-emerald-400">{knownCount}</p>
                        <p className="text-xs text-neutral-400">Đã thuộc</p>
                    </div>
                    <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-center">
                        <p className="text-2xl font-bold text-amber-400">{learningCount}</p>
                        <p className="text-xs text-neutral-400">Đang học</p>
                    </div>
                </div>

                {/* Category Tabs */}
                <div className="flex flex-wrap gap-2 mb-8 justify-center">
                    {(Object.keys(vocabularyData) as Category[]).map((cat) => (
                        <button
                            key={cat}
                            onClick={() => {
                                setSelectedCategory(cat);
                                setCurrentIndex(0);
                                setIsFlipped(false);
                            }}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedCategory === cat
                                ? 'bg-white text-neutral-900'
                                : 'bg-white/5 text-neutral-400 hover:bg-white/10'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Flashcard */}
                <div className="flex justify-center mb-8">
                    <div
                        className="relative w-full max-w-md h-64 cursor-pointer perspective-1000"
                        onClick={() => setIsFlipped(!isFlipped)}
                    >
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={`${currentCard.term}-${isFlipped}`}
                                initial={{ rotateY: isFlipped ? -90 : 90, opacity: 0 }}
                                animate={{ rotateY: 0, opacity: 1 }}
                                exit={{ rotateY: isFlipped ? 90 : -90, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="absolute inset-0"
                            >
                                <SpotlightCard
                                    className="!h-full !bg-[#0a0a0a] flex flex-col items-center justify-center p-8"
                                    spotlightColor={
                                        getCardStatus(currentCard.term) === 'known'
                                            ? 'rgba(16, 185, 129, 0.2)'
                                            : getCardStatus(currentCard.term) === 'learning'
                                                ? 'rgba(245, 158, 11, 0.2)'
                                                : 'rgba(255, 255, 255, 0.1)'
                                    }
                                >
                                    {!isFlipped ? (
                                        <div className="text-center">
                                            <p className="text-xs text-neutral-500 mb-4 uppercase tracking-wider">Thuật ngữ</p>
                                            <h2 className="text-4xl font-bold text-white mb-3">{currentCard.term}</h2>

                                            {/* New: IPA & Type */}
                                            <div className="flex items-center gap-3 justify-center mb-6">
                                                <span className="text-neutral-400 font-serif text-lg italic tracking-wider">[{currentCard.ipa}]</span>
                                                <span className="px-2 py-0.5 rounded-md bg-white/10 text-xs font-medium text-neutral-300 uppercase">{currentCard.type}</span>
                                            </div>

                                            <p className="text-sm text-neutral-600 animate-pulse">Chạm để lật</p>
                                        </div>
                                    ) : (
                                        <div className="text-center">
                                            <p className="text-xs text-neutral-500 mb-2 uppercase tracking-wider">Định nghĩa</p>
                                            <h2 className="text-2xl font-bold text-white mb-4 leading-relaxed">{currentCard.meaning}</h2>
                                            <div className="w-12 h-[1px] bg-white/10 mx-auto my-4"></div>
                                            <p className="text-base text-neutral-300 italic">"{currentCard.example}"</p>
                                        </div>
                                    )}
                                </SpotlightCard>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                {/* Controls */}
                <div className="flex items-center justify-center gap-4 mb-8">
                    <button
                        onClick={prevCard}
                        className="p-3 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>

                    <span className="text-neutral-400 text-sm font-mono min-w-[60px] text-center">
                        {currentIndex + 1} / {cards.length}
                    </span>

                    <button
                        onClick={nextCard}
                        className="p-3 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>

                {/* Actions */}
                <div className="flex justify-center gap-4">
                    <button
                        onClick={markAsLearning}
                        className="flex items-center gap-2 px-6 py-3 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 hover:bg-amber-500/20 transition-colors"
                    >
                        <RotateCcw className="w-4 h-4" />
                        Chưa thuộc
                    </button>
                    <button
                        onClick={markAsKnown}
                        className="flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 transition-colors"
                    >
                        <Check className="w-4 h-4" />
                        Đã thuộc
                    </button>
                </div>

                {/* Tips */}
                <div className="mt-12 p-6 rounded-xl bg-white/5 border border-white/10">
                    <div className="flex items-center gap-2 mb-3">
                        <BookOpen className="w-5 h-5 text-neutral-400" />
                        <h3 className="font-medium text-white">Mẹo học từ vựng</h3>
                    </div>
                    <ul className="text-sm text-neutral-400 space-y-2">
                        <li>• Học 10 từ mới mỗi ngày, ôn lại 25 từ cũ</li>
                        <li>• Đọc to ví dụ theo phiên âm IPA</li>
                        <li>• Viết các từ vào comment khi code để ghi nhớ tốt hơn</li>
                        <li>• Xem tài liệu tiếng Anh và chủ động tìm các từ đã học</li>
                    </ul>
                </div>
            </div>
        </main>
    );
}
