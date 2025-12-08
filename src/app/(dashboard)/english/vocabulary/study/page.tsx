"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Loader2, ArrowLeft, CheckCircle, Trophy } from "lucide-react";
import FlashcardFront from "@/components/vocabulary/FlashcardFront";
import FlashcardBack from "@/components/vocabulary/FlashcardBack";
import ReviewButtons from "@/components/vocabulary/ReviewButtons";
import { Vocabulary, UserVocabulary } from "@/types/vocabulary";

function StudyContent() {
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode") || "review"; // 'new' or 'review'

  const [items, setItems] = useState<Vocabulary[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sessionComplete, setSessionComplete] = useState(false);
  const [results, setResults] = useState<{ correct: number; hard: number }>({ correct: 0, hard: 0 });

  useEffect(() => {
    const fetchWords = async () => {
      try {
        const endpoint = mode === "new" ? "/api/vocabulary/new?limit=10" : "/api/vocabulary/due";
        const res = await fetch(endpoint);
        if (res.ok) {
          const data = await res.json();
          // Normalize data: if it's UserVocabulary (review), it has a .vocabulary property
          // if it's Vocabulary (new), it is the object itself
          const normalizedItems = data.map((item: Vocabulary | UserVocabulary) => 
            'vocabulary' in item ? item.vocabulary : item
          );
          setItems(normalizedItems);
        }
      } catch (error) {
        console.error("Failed to fetch words", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWords();
  }, [mode]);

  const handleFlip = () => {
    setIsFlipped(true);
  };

  // ... rest of the component logic ...
  // I need to be careful not to cut off the rest of the component.
  // Since I am using replace_string_in_file, I should only replace the top part and the export.
  
  // Wait, replace_string_in_file replaces a specific string. 
  // I can't easily wrap the whole component if I don't read the whole file or if I don't replace the whole file content.
  // But I can rename the function and add the wrapper at the end?
  // Or I can rename the function at the top, and then change the export at the bottom?
  // But this file has `export default function StudyPage() {` at the top.
  
  // Let's look at the file content again.
  // It starts with `export default function StudyPage() {`.
  // I can change that to `function StudyContent() {`.
  // And then at the very end of the file, I can add `export default function StudyPage() { return <Suspense><StudyContent /></Suspense> }`.
  
  // However, I need to know where the end of the file is or where the component ends.
  // The file is 204 lines long. I only read 50 lines.
  
  // Let's read the end of the file to see how it ends.


  const handleRate = async (quality: number) => {
    const currentWord = items[currentIndex];
    
    // Optimistic update / Move to next card immediately
    const nextIndex = currentIndex + 1;
    
    // Update stats
    setResults(prev => ({
      correct: quality >= 3 ? prev.correct + 1 : prev.correct,
      hard: quality < 3 ? prev.hard + 1 : prev.hard
    }));

    // Send to API in background
    try {
      await fetch("/api/vocabulary/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          vocabularyId: currentWord.id,
          quality
        })
      });
    } catch (error) {
      console.error("Failed to submit review", error);
    }

    if (nextIndex < items.length) {
      setIsFlipped(false);
      setCurrentIndex(nextIndex);
    } else {
      setSessionComplete(true);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (items.length === 0 && !sessionComplete) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
        <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Tuyệt vời!</h2>
          <p className="text-gray-600 mb-6">
            {mode === 'new' 
              ? "Bạn đã học hết các từ mới hôm nay." 
              : "Bạn đã hoàn thành tất cả các từ cần ôn tập."}
          </p>
          <Link 
            href="/english/vocabulary"
            className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors w-full"
          >
            Quay lại Dashboard
          </Link>
        </div>
      </div>
    );
  }

  if (sessionComplete) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
        <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full text-center animate-in fade-in zoom-in duration-300">
          <Trophy className="w-20 h-20 text-yellow-500 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Hoàn thành!</h2>
          <p className="text-gray-600 mb-8">Bạn vừa học xong {items.length} từ vựng.</p>
          
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-green-50 p-4 rounded-xl">
              <p className="text-2xl font-bold text-green-600">{results.correct}</p>
              <p className="text-sm text-green-700">Đã thuộc</p>
            </div>
            <div className="bg-orange-50 p-4 rounded-xl">
              <p className="text-2xl font-bold text-orange-600">{results.hard}</p>
              <p className="text-sm text-orange-700">Cần ôn lại</p>
            </div>
          </div>

          <div className="space-y-3">
            <Link 
              href="/english/vocabulary"
              className="block w-full py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"
            >
              Về trang chủ
            </Link>
            <button 
              onClick={() => window.location.reload()}
              className="block w-full py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Học tiếp
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentWord = items[currentIndex];
  const progress = ((currentIndex) / items.length) * 100;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-4 flex items-center justify-between sticky top-0 z-10">
        <Link href="/english/vocabulary" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <ArrowLeft className="w-6 h-6 text-gray-600" />
        </Link>
        <div className="flex-1 mx-4 max-w-md">
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-600 transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs text-center text-gray-500 mt-1">
            {currentIndex + 1} / {items.length}
          </p>
        </div>
        <div className="w-10" /> {/* Spacer for centering */}
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-4 pb-24">
        <div className="w-full max-w-2xl perspective-1000">
          {!isFlipped ? (
            <FlashcardFront 
              vocabulary={currentWord} 
              onFlip={handleFlip} 
            />
          ) : (
            <FlashcardBack 
              vocabulary={currentWord} 
            />
          )}
        </div>
      </main>

      {/* Controls */}
      {isFlipped && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 pb-8 animate-in slide-in-from-bottom duration-300">
          <div className="max-w-2xl mx-auto">
            <ReviewButtons onReview={handleRate} />
          </div>
        </div>
      )}
    </div>
  );
}

export default function StudyPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen"><Loader2 className="w-8 h-8 animate-spin text-blue-600" /></div>}>
      <StudyContent />
    </Suspense>
  );
}
