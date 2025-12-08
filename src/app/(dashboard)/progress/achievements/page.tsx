"use client";

import { useEffect, useState } from "react";
import { Loader2, Trophy } from "lucide-react";
import AchievementCard from "@/components/gamification/AchievementCard";
import { cn } from "@/lib/utils";

interface Achievement {
  id: string;
  name: string;
  description: string;
  category: string;
  rarity: string;
  icon: string;
  xpReward: number;
  unlocked: boolean;
  earnedAt?: string;
}

export default function AchievementsPage() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("ALL");

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const res = await fetch("/api/gamification/achievements");
        if (res.ok) {
          const data = await res.json();
          setAchievements(data);
        }
      } catch (error) {
        console.error("Failed to fetch achievements", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAchievements();
  }, []);

  const categories = ["ALL", "PROGRESS", "STREAK", "SKILL", "PROJECT"];
  
  const filteredAchievements = filter === "ALL" 
    ? achievements 
    : achievements.filter(a => a.category === filter);

  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const totalCount = achievements.length;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
          <Trophy className="w-8 h-8 text-yellow-500" />
          Thành tựu
        </h1>
        <p className="text-gray-500 mt-2">Mở khóa các huy hiệu bằng cách hoàn thành các cột mốc quan trọng.</p>
      </div>

      {/* Stats Header */}
      <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-gray-800">Tiến độ tổng quan</h2>
          <span className="text-2xl font-bold text-blue-600">{unlockedCount}/{totalCount}</span>
        </div>
        <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-blue-600 transition-all duration-500"
            style={{ width: `${(unlockedCount / totalCount) * 100}%` }}
          />
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
              filter === cat 
                ? "bg-blue-600 text-white" 
                : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
            )}
          >
            {cat === "ALL" ? "Tất cả" : cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAchievements.map(achievement => (
          <AchievementCard key={achievement.id} achievement={achievement} />
        ))}
      </div>
    </div>
  );
}
