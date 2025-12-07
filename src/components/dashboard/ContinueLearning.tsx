"use client";

import { PlayCircle, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";

interface ContinueLearningProps {
  lesson?: {
    title: string;
    slug: string;
    progress: number;
    estimatedMinutes: number;
    chapterTitle: string;
  };
}

export default function ContinueLearning({ lesson }: ContinueLearningProps) {
  if (!lesson) return null;

  return (
    <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-6 text-white shadow-lg relative overflow-hidden group">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-white/10 transition-colors" />
      
      <div className="relative z-10">
        <div className="flex items-center gap-2 text-blue-100 text-sm mb-3">
          <span className="bg-white/20 px-2 py-0.5 rounded text-xs font-medium">Đang học</span>
          <span>•</span>
          <span>{lesson.chapterTitle}</span>
        </div>

        <h3 className="text-xl font-bold mb-4 line-clamp-2">{lesson.title}</h3>

        <div className="flex items-center gap-4 text-sm text-blue-100 mb-6">
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            <span>{lesson.estimatedMinutes} phút</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-20 bg-black/20 rounded-full h-1.5">
              <div 
                className="bg-white h-1.5 rounded-full" 
                style={{ width: `${lesson.progress}%` }}
              />
            </div>
            <span>{lesson.progress}%</span>
          </div>
        </div>

        <Link 
          href={`/roadmap/${lesson.slug}`}
          className="inline-flex items-center gap-2 bg-white text-blue-600 px-5 py-2.5 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
        >
          <PlayCircle className="w-5 h-5" />
          Tiếp tục học
          <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
