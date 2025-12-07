"use client";

import { motion } from "framer-motion";
import { Flame, Trophy, Target } from "lucide-react";

interface DashboardHeaderProps {
  user: {
    name: string;
    level: number;
    xp: number;
    nextLevelXp: number;
  };
  streak: number;
}

export default function DashboardHeader({ user, streak }: DashboardHeaderProps) {
  const xpProgress = (user.xp / user.nextLevelXp) * 100;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Chào mừng trở lại, {user.name}! 👋
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Hôm nay là một ngày tuyệt vời để học điều gì đó mới.
          </p>
        </div>

        <div className="flex gap-4 w-full md:w-auto">
          {/* Streak Badge */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 bg-orange-50 dark:bg-orange-900/20 px-4 py-2 rounded-lg border border-orange-100 dark:border-orange-800"
          >
            <Flame className="w-5 h-5 text-orange-500 fill-orange-500" />
            <div>
              <p className="text-xs text-orange-600 dark:text-orange-400 font-medium">Streak</p>
              <p className="text-lg font-bold text-orange-700 dark:text-orange-300">{streak} ngày</p>
            </div>
          </motion.div>

          {/* Level Badge */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 bg-blue-50 dark:bg-blue-900/20 px-4 py-2 rounded-lg border border-blue-100 dark:border-blue-800 flex-1 md:flex-none min-w-[140px]"
          >
            <Trophy className="w-5 h-5 text-blue-500" />
            <div className="w-full">
              <div className="flex justify-between items-center mb-1">
                <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">Level {user.level}</p>
                <span className="text-[10px] text-blue-500">{Math.round(xpProgress)}%</span>
              </div>
              <div className="w-full bg-blue-200 dark:bg-blue-800 rounded-full h-1.5">
                <div 
                  className="bg-blue-500 h-1.5 rounded-full transition-all duration-500"
                  style={{ width: `${xpProgress}%` }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
