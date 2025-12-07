"use client";

import { CheckCircle2, Circle, Plus } from "lucide-react";
import { Goal } from "@/types/dashboard";
import { motion } from "framer-motion";

interface WeeklyGoalsProps {
  goals: Goal[];
}

export default function WeeklyGoals({ goals }: WeeklyGoalsProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-gray-800">Mục tiêu tuần này</h3>
        <button className="text-blue-600 hover:bg-blue-50 p-1.5 rounded-lg transition-colors">
          <Plus className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-3">
        {goals.map((goal) => (
          <div 
            key={goal.id}
            className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group cursor-pointer"
          >
            <button className="mt-0.5 text-gray-400 group-hover:text-blue-600 transition-colors">
              {goal.current >= goal.target ? (
                <CheckCircle2 className="w-5 h-5 text-green-500" />
              ) : (
                <Circle className="w-5 h-5" />
              )}
            </button>
            
            <div className="flex-1">
              <p className={`text-sm font-medium ${goal.current >= goal.target ? 'text-gray-400 line-through' : 'text-gray-700'}`}>
                {goal.title}
              </p>
              {goal.target > 1 && (
                <div className="mt-2">
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>Tiến độ</span>
                    <span>{goal.current}/{goal.target}</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-1.5">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${(goal.current / goal.target) * 100}%` }}
                      className="bg-blue-500 h-1.5 rounded-full"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}

        {goals.length === 0 && (
          <div className="text-center py-8 text-gray-500 text-sm">
            Chưa có mục tiêu nào cho tuần này
          </div>
        )}
      </div>
    </div>
  );
}
