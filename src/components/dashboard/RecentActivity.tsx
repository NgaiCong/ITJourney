"use client";

import { Activity } from "@/types/dashboard";
import { BookOpen, Trophy, Code, LogIn, HelpCircle } from "lucide-react";

interface RecentActivityProps {
  activities: Activity[];
}

const getActivityIcon = (type: Activity['type']) => {
  switch (type) {
    case 'LESSON':
      return <BookOpen className="w-4 h-4 text-blue-500" />;
    case 'ACHIEVEMENT':
      return <Trophy className="w-4 h-4 text-yellow-500" />;
    case 'PROJECT':
      return <Code className="w-4 h-4 text-purple-500" />;
    case 'QUIZ':
      return <HelpCircle className="w-4 h-4 text-green-500" />;
    default:
      return <LogIn className="w-4 h-4 text-gray-500" />;
  }
};

const getActivityColor = (type: Activity['type']) => {
  switch (type) {
    case 'LESSON': return 'bg-blue-100';
    case 'ACHIEVEMENT': return 'bg-yellow-100';
    case 'PROJECT': return 'bg-purple-100';
    case 'QUIZ': return 'bg-green-100';
    default: return 'bg-gray-100';
  }
};

export default function RecentActivity({ activities }: RecentActivityProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h3 className="font-bold text-gray-800 mb-6">Hoạt động gần đây</h3>
      
      <div className="relative pl-4 border-l-2 border-gray-100 space-y-8">
        {activities.map((activity) => (
          <div key={activity.id} className="relative">
            {/* Timeline dot */}
            <div className={`absolute -left-[25px] top-0 w-8 h-8 rounded-full border-4 border-white ${getActivityColor(activity.type)} flex items-center justify-center`}>
              {getActivityIcon(activity.type)}
            </div>

            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-800">{activity.title}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(activity.timestamp).toLocaleDateString('vi-VN', {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
              {activity.xp && (
                <span className="text-xs font-bold text-yellow-600 bg-yellow-50 px-2 py-1 rounded-full">
                  +{activity.xp} XP
                </span>
              )}
            </div>
          </div>
        ))}

        {activities.length === 0 && (
          <div className="text-center py-4 text-gray-500 text-sm">
            Chưa có hoạt động nào
          </div>
        )}
      </div>
    </div>
  );
}
