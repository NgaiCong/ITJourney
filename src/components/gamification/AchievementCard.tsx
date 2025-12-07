"use client";

import { Lock, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface AchievementCardProps {
  achievement: {
    id: string;
    name: string;
    description: string;
    icon: string;
    xpReward: number;
    rarity: string;
    unlocked: boolean;
    earnedAt?: string | null;
  };
}

export default function AchievementCard({ achievement }: AchievementCardProps) {
  const rarityColors = {
    COMMON: "border-gray-200 bg-gray-50",
    RARE: "border-blue-200 bg-blue-50",
    EPIC: "border-purple-200 bg-purple-50",
    LEGENDARY: "border-yellow-200 bg-yellow-50"
  };

  const rarityTextColors = {
    COMMON: "text-gray-600",
    RARE: "text-blue-600",
    EPIC: "text-purple-600",
    LEGENDARY: "text-yellow-600"
  };

  return (
    <div className={cn(
      "relative p-4 rounded-xl border-2 transition-all duration-300",
      achievement.unlocked 
        ? rarityColors[achievement.rarity as keyof typeof rarityColors] 
        : "border-gray-100 bg-gray-50 opacity-70 grayscale"
    )}>
      <div className="flex items-start gap-4">
        <div className="text-4xl">{achievement.icon}</div>
        <div className="flex-1">
          <h3 className="font-bold text-gray-900">{achievement.name}</h3>
          <p className="text-sm text-gray-500 mt-1">{achievement.description}</p>
          
          <div className="flex items-center gap-3 mt-3">
            <span className={cn("text-xs font-bold px-2 py-1 rounded-full bg-white/50", rarityTextColors[achievement.rarity as keyof typeof rarityTextColors])}>
              {achievement.rarity}
            </span>
            <span className="text-xs font-medium text-gray-500">
              +{achievement.xpReward} XP
            </span>
          </div>
        </div>
        
        <div className="absolute top-4 right-4">
          {achievement.unlocked ? (
            <CheckCircle className="w-6 h-6 text-green-500" />
          ) : (
            <Lock className="w-6 h-6 text-gray-400" />
          )}
        </div>
      </div>
    </div>
  );
}
