"use client";

import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Calendar, BookOpen, Code2 } from "lucide-react";

interface OverallStatsProps {
  stats: {
    joinDate: string;
    totalHours: number;
    lessonsCompleted: number;
    projectsCompleted: number;
    weeklyHours: { day: string; hours: number }[];
  };
}

export default function OverallStats({ stats }: OverallStatsProps) {
  const statCards = [
    { label: "Giờ học", value: stats.totalHours, icon: Calendar, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-900/20" },
    { label: "Bài học", value: stats.lessonsCompleted, icon: BookOpen, color: "text-green-500", bg: "bg-green-50 dark:bg-green-900/20" },
    { label: "Dự án", value: stats.projectsCompleted, icon: Code2, color: "text-purple-500", bg: "bg-purple-50 dark:bg-purple-900/20" },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Thống kê tổng quan</h2>

      {/* Stat Cards */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {statCards.map((stat, index) => (
          <div key={index} className="flex flex-col items-center p-3 rounded-lg bg-gray-50 dark:bg-gray-700/30">
            <div className={`p-2 rounded-full ${stat.bg} mb-2`}>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">{stat.value}</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</span>
          </div>
        ))}
      </div>

      {/* Weekly Chart */}
      <div className="h-[200px] w-full">
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">Thời gian học tuần này</p>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={stats.weeklyHours}>
            <XAxis 
              dataKey="day" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 12, fill: '#9CA3AF' }} 
            />
            <Tooltip 
              cursor={{ fill: 'transparent' }}
              contentStyle={{ 
                backgroundColor: '#1F2937', 
                border: 'none', 
                borderRadius: '8px', 
                color: '#fff',
                fontSize: '12px'
              }}
            />
            <Bar dataKey="hours" radius={[4, 4, 0, 0]}>
              {stats.weeklyHours.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.hours > 0 ? '#3B82F6' : '#E5E7EB'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
