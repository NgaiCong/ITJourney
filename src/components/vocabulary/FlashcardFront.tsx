"use client";

import { Vocabulary } from "@/types/vocabulary";
import { Volume2 } from "lucide-react";

interface FlashcardFrontProps {
  vocabulary: Vocabulary;
  onFlip: () => void;
}

export default function FlashcardFront({ vocabulary, onFlip }: FlashcardFrontProps) {
  const playAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    const utterance = new SpeechSynthesisUtterance(vocabulary.term);
    utterance.lang = 'en-US';
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div 
      onClick={onFlip}
      className="w-full h-96 bg-white rounded-2xl shadow-lg border border-gray-100 flex flex-col items-center justify-center cursor-pointer hover:shadow-xl transition-all p-8 relative group"
    >
      <div className="text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">{vocabulary.term}</h2>
        {vocabulary.pronunciation && (
          <p className="text-xl text-gray-500 font-mono mb-6">/{vocabulary.pronunciation}/</p>
        )}
        
        <button 
          onClick={playAudio}
          className="p-3 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
        >
          <Volume2 className="w-6 h-6" />
        </button>
      </div>

      <div className="absolute bottom-6 text-gray-400 text-sm animate-bounce">
        Click or Space to flip
      </div>
      
      <div className="absolute top-6 right-6">
        <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
          {vocabulary.category}
        </span>
      </div>
    </div>
  );
}
