"use client";

import { CheckCircle2, Circle, Clock } from "lucide-react";
import { Task } from "@/types/dashboard";

interface TodayProgressProps {
  studyMinutes: number;
  targetMinutes: number;
  tasks: Task[];
}

export default function TodayProgress({ studyMinutes, targetMinutes, tasks }: TodayProgressProps) {
  const progress = Math.min((studyMinutes / targetMinutes) * 100, 100);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 h-full">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
        <Clock className="w-5 h-5 text-blue-500" />
        Tiến độ hôm nay
      </h2>

      {/* Time Progress */}
      <div className="mb-6">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-gray-500 dark:text-gray-400">Thời gian học</span>
          <span className="font-medium text-gray-900 dark:text-white">
            {studyMinutes}/{targetMinutes} phút
          </span>
        </div>
        <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-blue-500 to-cyan-400 h-3 rounded-full transition-all duration-1000"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Tasks List */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
          Nhiệm vụ
        </h3>
        <div className="space-y-2">
          {tasks.map((task) => (
            <div 
              key={task.id}
              className="flex items-center gap-3 p-2 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg transition-colors cursor-pointer group"
            >
              {task.completed ? (
                <CheckCircle2 className="w-5 h-5 text-green-500" />
              ) : (
                <Circle className="w-5 h-5 text-gray-300 dark:text-gray-600 group-hover:text-blue-500" />
              )}
              <span className={`text-sm ${task.completed ? 'text-gray-400 line-through' : 'text-gray-700 dark:text-gray-200'}`}>
                {task.title}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
