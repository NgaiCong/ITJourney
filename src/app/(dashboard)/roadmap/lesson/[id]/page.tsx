"use client";

import { useEffect, useState } from "react";
import { Lesson } from "@/types/roadmap";
import VideoPlayer from "@/components/roadmap/VideoPlayer";
import { Loader2, CheckCircle, ArrowLeft, ArrowRight, FileText, Code } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

export default function LessonDetailPage() {
  const params = useParams();
  const router = useRouter();
  const lessonId = params?.id as string;

  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);
  const [completing, setCompleting] = useState(false);

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const res = await fetch(`/api/roadmap/lesson/${lessonId}`);
        if (res.ok) {
          const data = await res.json();
          setLesson(data);
        }
      } catch (error) {
        console.error("Failed to fetch lesson", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLesson();
  }, [lessonId]);

  const handleComplete = async () => {
    setCompleting(true);
    try {
      // Call API to mark complete
      // await fetch(`/api/roadmap/lesson/${lessonId}/complete`, { method: 'POST' });
      
      // Optimistic update
      if (lesson) {
        setLesson({ ...lesson, isCompleted: true });
      }
    } catch (error) {
      console.error("Failed to complete lesson", error);
    } finally {
      setCompleting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!lesson) {
    return <div>Lesson not found</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Top Navigation Bar */}
      <div className="border-b px-6 py-4 flex items-center justify-between sticky top-0 bg-white z-20">
        <div className="flex items-center gap-4">
          <button onClick={() => router.back()} className="p-2 hover:bg-gray-100 rounded-full">
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div>
            <h1 className="font-bold text-gray-900 line-clamp-1">{lesson.title}</h1>
            <p className="text-xs text-gray-500">Chương: {lesson.slug}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={handleComplete}
            disabled={lesson.isCompleted || completing}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors
              ${lesson.isCompleted 
                ? 'bg-green-100 text-green-700 cursor-default' 
                : 'bg-blue-600 text-white hover:bg-blue-700'
              }
            `}
          >
            {completing ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : lesson.isCompleted ? (
              <CheckCircle className="w-4 h-4" />
            ) : (
              <CheckCircle className="w-4 h-4" />
            )}
            {lesson.isCompleted ? 'Đã hoàn thành' : 'Hoàn thành'}
          </button>
        </div>
      </div>

      <div className="flex h-[calc(100vh-73px)]">
        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-6 lg:p-10">
          <div className="max-w-4xl mx-auto space-y-8">
            {lesson.type === 'VIDEO' && lesson.content && (
              <VideoPlayer url={lesson.content} />
            )}

            <div className="prose max-w-none">
              <h2 className="text-2xl font-bold mb-4">Nội dung bài học</h2>
              <div className="text-gray-700 leading-relaxed">
                {/* Render markdown content here */}
                {lesson.description || "Chưa có mô tả chi tiết."}
              </div>
            </div>

            {/* Resources / Attachments */}
            <div className="border-t pt-6">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Tài liệu đính kèm
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <a href="#" className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50">
                  <div className="w-10 h-10 bg-red-100 rounded flex items-center justify-center text-red-600 font-bold text-xs">PDF</div>
                  <div>
                    <p className="font-medium text-sm">Slide bài giảng</p>
                    <p className="text-xs text-gray-500">2.5 MB</p>
                  </div>
                </a>
                <a href="#" className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50">
                  <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center text-gray-600 font-bold text-xs">
                    <Code className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Source code mẫu</p>
                    <p className="text-xs text-gray-500">GitHub</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar (Optional - List of lessons in week) */}
        <div className="w-80 border-l bg-gray-50 overflow-y-auto hidden xl:block p-4">
          <h3 className="font-bold text-gray-700 mb-4 px-2">Nội dung tuần này</h3>
          {/* We would map through week lessons here if we fetched them */}
          <div className="space-y-2">
            <div className="p-3 bg-blue-50 text-blue-700 rounded-lg border border-blue-100 text-sm font-medium">
              1. {lesson.title}
            </div>
            <div className="p-3 hover:bg-white text-gray-600 rounded-lg border border-transparent hover:border-gray-200 text-sm cursor-pointer">
              2. Bài học tiếp theo...
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
