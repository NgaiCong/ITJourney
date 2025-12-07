"use client";

import { Achievement } from "@/types/dashboard";
import { Award } from "lucide-react";

interface AchievementsBadgeProps {
  achievements: Achievement[];
}

export default function AchievementsBadge({ achievements }: AchievementsBadgeProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-gray-800">Thành tích nổi bật</h3>
        <span className="text-xs text-gray-500">{achievements.length} đã đạt được</span>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {achievements.slice(0, 4).map((achievement) => (
          <div 
            key={achievement.id}
            className="flex flex-col items-center text-center group cursor-pointer"
          >
            <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <span className="text-2xl">{achievement.icon}</span>
            </div>
            <p className="text-xs font-medium text-gray-700 line-clamp-2 group-hover:text-blue-600 transition-colors">
              {achievement.name}
            </p>
          </div>
        ))}

        {/* Placeholder slots if less than 4 achievements */}
        {Array.from({ length: Math.max(0, 4 - achievements.length) }).map((_, i) => (
          <div 
            key={`empty-${i}`}
            className="flex flex-col items-center text-center opacity-50"
          >
            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-2 border-2 border-dashed border-gray-300">
              <Award className="w-5 h-5 text-gray-400" />
            </div>
            <p className="text-xs text-gray-400">???</p>
          </div>
        ))}
      </div>
    </div>
  );
}
