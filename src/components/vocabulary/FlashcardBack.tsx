"use client";

import { Vocabulary } from "@/types/vocabulary";
import { Volume2 } from "lucide-react";

interface FlashcardBackProps {
  vocabulary: Vocabulary;
}

export default function FlashcardBack({ vocabulary }: FlashcardBackProps) {
  const playAudio = () => {
    const utterance = new SpeechSynthesisUtterance(vocabulary.term);
    utterance.lang = 'en-US';
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="w-full h-96 bg-blue-50 rounded-2xl shadow-lg border border-blue-100 flex flex-col p-8 relative">
      <div className="flex items-center justify-between mb-6 border-b border-blue-100 pb-4">
        <div className="flex items-center gap-3">
          <h3 className="text-2xl font-bold text-gray-900">{vocabulary.term}</h3>
          <button 
            onClick={playAudio}
            className="p-2 rounded-full hover:bg-blue-100 text-blue-600 transition-colors"
          >
            <Volume2 className="w-5 h-5" />
          </button>
        </div>
        <span className="text-sm text-gray-500 font-mono">/{vocabulary.pronunciation}/</span>
      </div>

      <div className="flex-1 overflow-y-auto space-y-6">
        <div>
          <h4 className="text-sm font-bold text-blue-600 uppercase tracking-wider mb-2">Định nghĩa</h4>
          <p className="text-lg text-gray-800 leading-relaxed">
            {vocabulary.definition}
          </p>
        </div>

        {vocabulary.example && (
          <div>
            <h4 className="text-sm font-bold text-blue-600 uppercase tracking-wider mb-2">Ví dụ</h4>
            <p className="text-gray-700 italic bg-white p-4 rounded-lg border border-blue-100">
              &quot;{vocabulary.example}&quot;
            </p>
            {vocabulary.translation && (
              <p className="text-gray-600 mt-2 ml-1">
                → {vocabulary.translation}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
