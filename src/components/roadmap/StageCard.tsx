"use client";

import { Stage } from "@/types/roadmap";
import { Lock, CheckCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

interface StageCardProps {
  stage: Stage;
  index: number;
}

export default function StageCard({ stage, index }: StageCardProps) {
  const isLocked = stage.isLocked;
  const progress = stage.progress || 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Link 
        href={isLocked ? "#" : `/roadmap/stage-${stage.id}`}
        className={`block relative group ${isLocked ? 'cursor-not-allowed' : 'cursor-pointer'}`}
      >
        <div className={`
          relative z-10 bg-white rounded-2xl p-6 border-2 transition-all duration-300
          ${isLocked 
            ? 'border-gray-100 bg-gray-50' 
            : 'border-gray-100 hover:border-blue-500 hover:shadow-lg'
          }
        `}>
          <div className="flex justify-between items-start mb-4">
            <div className={`
              w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold
              ${isLocked 
                ? 'bg-gray-200 text-gray-400' 
                : 'bg-blue-100 text-blue-600'
              }
            `}>
              {index + 1}
            </div>
            {isLocked ? (
              <Lock className="w-5 h-5 text-gray-400" />
            ) : progress >= 100 ? (
              <CheckCircle className="w-6 h-6 text-green-500" />
            ) : (
              <div className="flex items-center gap-1 text-blue-600 font-medium text-sm">
                {progress}%
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            )}
          </div>

          <h3 className={`text-xl font-bold mb-2 ${isLocked ? 'text-gray-400' : 'text-gray-800'}`}>
            {stage.title}
          </h3>
          
          <p className={`text-sm mb-6 line-clamp-2 ${isLocked ? 'text-gray-400' : 'text-gray-500'}`}>
            {stage.description}
          </p>

          {/* Progress Bar */}
          <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className={`h-full rounded-full ${isLocked ? 'bg-gray-300' : 'bg-blue-500'}`}
            />
          </div>
          
          <div className="mt-2 flex justify-between text-xs text-gray-400">
            <span>{stage.months?.length || 0} tháng</span>
            <span>{progress}% hoàn thành</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
