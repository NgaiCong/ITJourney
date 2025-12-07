"use client";

import { VocabularyStats as StatsType } from "@/types/vocabulary";
import { Trophy, Book, Clock, Activity } from "lucide-react";

interface VocabularyStatsProps {
  stats: StatsType;
}

export default function VocabularyStats({ stats }: VocabularyStatsProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h3 className="font-bold text-gray-800 mb-4">Thống kê học tập</h3>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white rounded-full text-blue-600">
              <Book className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Tổng từ vựng</p>
              <p className="font-bold text-gray-800">{stats.total}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white rounded-full text-green-600">
              <Trophy className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Đã thành thạo</p>
              <p className="font-bold text-gray-800">{stats.mastered}</p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-xs font-bold text-green-600">
              {stats.total > 0 ? Math.round((stats.mastered / stats.total) * 100) : 0}%
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white rounded-full text-orange-600">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Cần ôn tập</p>
              <p className="font-bold text-gray-800">{stats.dueToday}</p>
            </div>
          </div>
        </div>
        
        <div className="pt-2 border-t border-gray-100">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500 flex items-center gap-1">
              <Activity className="w-4 h-4" /> Accuracy
            </span>
            <span className="font-bold text-gray-800">87%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
