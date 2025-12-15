"use client";

import { Lock, CheckCircle } from "lucide-react";
import Link from "next/link";

interface Stage {
  id: string;
  title: string;
  completion: number;
  isLocked: boolean;
  slug: string;
}

interface RoadmapProgressProps {
  stages: Stage[];
}

export default function RoadmapProgress({ stages }: RoadmapProgressProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Lộ trình của bạn</h2>
        <Link href="/roadmap" className="text-sm text-blue-500 hover:text-blue-600 font-medium">
          Xem chi tiết
        </Link>
      </div>

      <div className="space-y-6">
        {stages.map((stage, index) => (
          <div key={stage.id} className="relative">

            {index !== stages.length - 1 && (
              <div className="absolute left-6 top-10 bottom-[-24px] w-0.5 bg-gray-100 dark:bg-gray-700" />
            )}

            <div className="flex items-start gap-4">

              <div className={`
                w-12 h-12 rounded-full flex items-center justify-center shrink-0 z-10 border-4
                ${stage.completion === 100
                  ? 'bg-green-100 border-green-50 text-green-600 dark:bg-green-900/20 dark:border-green-900/50 dark:text-green-400'
                  : stage.isLocked
                    ? 'bg-gray-100 border-gray-50 text-gray-400 dark:bg-gray-800 dark:border-gray-700'
                    : 'bg-blue-100 border-blue-50 text-blue-600 dark:bg-blue-900/20 dark:border-blue-900/50 dark:text-blue-400'
                }
              `}>
                {stage.completion === 100 ? (
                  <CheckCircle className="w-6 h-6" />
                ) : stage.isLocked ? (
                  <Lock className="w-5 h-5" />
                ) : (
                  <span className="text-sm font-bold">{index + 1}</span>
                )}
              </div>


              <div className="flex-1 pt-1">
                <div className="flex justify-between items-center mb-2">
                  <h3 className={`font-medium ${stage.isLocked ? 'text-gray-400' : 'text-gray-900 dark:text-white'}`}>
                    {stage.title}
                  </h3>
                  {!stage.isLocked && (
                    <span className="text-xs font-medium text-gray-500">{stage.completion}%</span>
                  )}
                </div>

                {!stage.isLocked && (
                  <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-1000 ${stage.completion === 100 ? 'bg-green-500' : 'bg-blue-500'
                        }`}
                      style={{ width: `${stage.completion}%` }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
