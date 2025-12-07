"use client";

import { Flame, Calendar, Zap, Brain } from "lucide-react";

interface StreakWidgetProps {
  streaks: {
    type: string;
    currentCount: number;
    longestCount: number;
  }[];
}

export default function StreakWidget({ streaks }: StreakWidgetProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case 'LOGIN': return <Calendar className="w-5 h-5 text-blue-500" />;
      case 'STUDY': return <Brain className="w-5 h-5 text-purple-500" />;
      case 'AIDETOX': return <Zap className="w-5 h-5 text-yellow-500" />;
      case 'FLASHCARD': return <Flame className="w-5 h-5 text-orange-500" />;
      default: return <Flame className="w-5 h-5 text-gray-500" />;
    }
  };

  const getLabel = (type: string) => {
    switch (type) {
      case 'LOGIN': return 'Daily Login';
      case 'STUDY': return 'Study Session';
      case 'AIDETOX': return 'No AI Mode';
      case 'FLASHCARD': return 'Vocabulary';
      default: return type;
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
      <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
        <Flame className="w-5 h-5 text-orange-500" />
        Active Streaks
      </h3>
      
      <div className="space-y-4">
        {streaks.map((streak) => (
          <div key={streak.type} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-50 rounded-lg">
                {getIcon(streak.type)}
              </div>
              <div>
                <p className="font-medium text-gray-900">{getLabel(streak.type)}</p>
                <p className="text-xs text-gray-500">Best: {streak.longestCount} days</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xl font-bold text-gray-900">{streak.currentCount}</p>
              <p className="text-xs text-gray-500">days</p>
            </div>
          </div>
        ))}
        
        {streaks.length === 0 && (
          <p className="text-sm text-gray-500 text-center py-4">
            Start learning to build your streaks!
          </p>
        )}
      </div>
    </div>
  );
}
