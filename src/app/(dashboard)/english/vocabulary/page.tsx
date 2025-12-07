"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Loader2, Play, BookOpen, Flame } from "lucide-react";
import VocabularyStats from "@/components/vocabulary/VocabularyStats";
import { VocabularyStats as StatsType } from "@/types/vocabulary";

export default function VocabularyPage() {
  const [stats, setStats] = useState<StatsType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/vocabulary/stats");
        if (res.ok) {
          const data = await res.json();
          setStats(data);
        }
      } catch (error) {
        console.error("Failed to fetch stats", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 lg:p-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Flashcards Từ vựng</h1>
          <p className="text-gray-500 mt-2">Học từ vựng chuyên ngành với phương pháp Spaced Repetition</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Action Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Streak Banner */}
            <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-xl p-6 text-white flex items-center justify-between shadow-lg">
              <div>
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <Flame className="w-8 h-8 fill-white" />
                  15 Ngày
                </h2>
                <p className="text-orange-100">Chuỗi học tập liên tục. Cố lên!</p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold">234</p>
                <p className="text-sm text-orange-100">Từ đã học</p>
              </div>
            </div>

            {/* Action Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link 
                href="/english/vocabulary/study?mode=new"
                className="group bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all hover:border-blue-200"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-4 group-hover:scale-110 transition-transform">
                  <BookOpen className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-1">Học từ mới</h3>
                <p className="text-sm text-gray-500">10 từ vựng mới mỗi ngày</p>
              </Link>

              <Link 
                href="/english/vocabulary/study?mode=review"
                className="group bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all hover:border-green-200"
              >
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-green-600 mb-4 group-hover:scale-110 transition-transform">
                  <Play className="w-6 h-6 ml-1" />
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-1">Ôn tập ngay</h3>
                <p className="text-sm text-gray-500">
                  {stats?.dueToday || 0} từ cần ôn tập hôm nay
                </p>
              </Link>
            </div>

            {/* Categories Preview */}
            <div className="bg-white rounded-xl p-6 border border-gray-100">
              <h3 className="font-bold text-gray-800 mb-4">Chủ đề từ vựng</h3>
              <div className="grid grid-cols-2 gap-3">
                {['Hardware & System', 'Software Development', 'Data & Logic', 'Agile & Process'].map((cat) => (
                  <div key={cat} className="p-3 bg-gray-50 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 cursor-pointer">
                    {cat}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Stats */}
          <div className="space-y-6">
            {stats && <VocabularyStats stats={stats} />}
            
            {/* Mini Leaderboard or Tips could go here */}
            <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
              <h4 className="font-bold text-blue-800 mb-2">Mẹo học tập</h4>
              <p className="text-sm text-blue-600">
                Học vào cùng một thời điểm mỗi ngày giúp não bộ ghi nhớ tốt hơn 20%.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
