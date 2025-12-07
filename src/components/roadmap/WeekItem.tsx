"use client";

import { Week } from "@/types/roadmap";
import { Lock, CheckCircle2, Circle } from "lucide-react";
import Link from "next/link";

interface WeekItemProps {
  week: Week;
  index: number;
}

export default function WeekItem({ week, index }: WeekItemProps) {
  return (
    <div className={`bg-white rounded-lg border p-4 ${week.isLocked ? 'border-gray-100 opacity-75' : 'border-gray-200'}`}>
      <div className="flex items-center justify-between mb-3">
        <h5 className={`font-semibold ${week.isLocked ? 'text-gray-400' : 'text-gray-800'}`}>
          Tuần {index + 1}: {week.title}
        </h5>
        {week.isLocked && <Lock className="w-4 h-4 text-gray-400" />}
      </div>

      <div className="space-y-2">
        {week.lessons?.map((lesson) => (
          <Link 
            key={lesson.id}
            href={week.isLocked || lesson.isLocked ? "#" : `/roadmap/lesson/${lesson.id}`}
            className={`
              flex items-center gap-3 p-2 rounded-md transition-colors
              ${week.isLocked || lesson.isLocked 
                ? 'cursor-not-allowed text-gray-400' 
                : 'hover:bg-blue-50 cursor-pointer text-gray-700'
              }
            `}
          >
            {lesson.isCompleted ? (
              <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
            ) : (
              <Circle className={`w-4 h-4 shrink-0 ${week.isLocked ? 'text-gray-300' : 'text-gray-400'}`} />
            )}
            <span className="text-sm truncate">{lesson.title}</span>
            <span className="ml-auto text-xs text-gray-400 border px-1.5 py-0.5 rounded">
              {lesson.type}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
