"use client";

import { motion } from "framer-motion";

interface XPProgressBarProps {
  currentXP: number;
  level: number;
  nextLevelXP: number;
  prevLevelXP: number;
}

export default function XPProgressBar({ currentXP, level, nextLevelXP, prevLevelXP }: XPProgressBarProps) {

  const xpInLevel = currentXP - prevLevelXP;
  const xpRequiredForLevel = nextLevelXP - prevLevelXP;
  const progress = Math.min(100, Math.max(0, (xpInLevel / xpRequiredForLevel) * 100));

  return (
    <div className="w-full">
      <div className="flex justify-between text-xs mb-1">
        <span className="font-bold text-blue-600">Level {level}</span>
        <span className="text-gray-500">{Math.floor(xpInLevel)} / {xpRequiredForLevel} XP</span>
      </div>
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
