"use client";

import { useEffect } from "react";

interface ReviewButtonsProps {
  onReview: (quality: number) => void;
  disabled?: boolean;
}

export default function ReviewButtons({ onReview, disabled }: ReviewButtonsProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (disabled) return;
      
      switch (e.key) {
        case '1': onReview(0); break; // Again
        case '2': onReview(2); break; // Hard
        case '3': onReview(4); break; // Good
        case '4': onReview(5); break; // Easy
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onReview, disabled]);

  return (
    <div className="grid grid-cols-4 gap-4 w-full max-w-2xl mx-auto mt-8">
      <button
        onClick={() => onReview(0)}
        disabled={disabled}
        className="flex flex-col items-center p-4 rounded-xl bg-red-50 text-red-700 hover:bg-red-100 transition-colors border border-red-100"
      >
        <span className="font-bold text-lg">Không biết</span>
        <span className="text-xs opacity-70 mt-1">&lt; 1 phút</span>
        <span className="text-[10px] font-mono mt-2 bg-white/50 px-2 py-0.5 rounded">Phím 1</span>
      </button>

      <button
        onClick={() => onReview(2)}
        disabled={disabled}
        className="flex flex-col items-center p-4 rounded-xl bg-orange-50 text-orange-700 hover:bg-orange-100 transition-colors border border-orange-100"
      >
        <span className="font-bold text-lg">Khó</span>
        <span className="text-xs opacity-70 mt-1">~ 1 ngày</span>
        <span className="text-[10px] font-mono mt-2 bg-white/50 px-2 py-0.5 rounded">Phím 2</span>
      </button>

      <button
        onClick={() => onReview(4)}
        disabled={disabled}
        className="flex flex-col items-center p-4 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors border border-blue-100"
      >
        <span className="font-bold text-lg">Được</span>
        <span className="text-xs opacity-70 mt-1">~ 3 ngày</span>
        <span className="text-[10px] font-mono mt-2 bg-white/50 px-2 py-0.5 rounded">Phím 3</span>
      </button>

      <button
        onClick={() => onReview(5)}
        disabled={disabled}
        className="flex flex-col items-center p-4 rounded-xl bg-green-50 text-green-700 hover:bg-green-100 transition-colors border border-green-100"
      >
        <span className="font-bold text-lg">Dễ</span>
        <span className="text-xs opacity-70 mt-1">~ 5 ngày</span>
        <span className="text-[10px] font-mono mt-2 bg-white/50 px-2 py-0.5 rounded">Phím 4</span>
      </button>
    </div>
  );
}
