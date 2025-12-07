"use client";

import { Month } from "@/types/roadmap";
import { ChevronDown, ChevronUp, Lock } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import WeekItem from "./WeekItem";

interface MonthAccordionProps {
  month: Month;
  index: number;
}

export default function MonthAccordion({ month, index }: MonthAccordionProps) {
  const [isOpen, setIsOpen] = useState(index === 0 && !month.isLocked);

  return (
    <div className={`border rounded-xl overflow-hidden mb-4 ${month.isLocked ? 'bg-gray-50 border-gray-100' : 'bg-white border-gray-200'}`}>
      <button
        onClick={() => !month.isLocked && setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between p-4 ${month.isLocked ? 'cursor-not-allowed' : 'cursor-pointer hover:bg-gray-50'}`}
      >
        <div className="flex items-center gap-4">
          <div className={`
            w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm
            ${month.isLocked ? 'bg-gray-200 text-gray-400' : 'bg-blue-50 text-blue-600'}
          `}>
            M{index + 1}
          </div>
          <div className="text-left">
            <h4 className={`font-bold ${month.isLocked ? 'text-gray-400' : 'text-gray-800'}`}>
              {month.title}
            </h4>
            <p className="text-xs text-gray-500">{month.weeks?.length || 0} tuần • {month.progress}% hoàn thành</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {month.isLocked ? (
            <Lock className="w-5 h-5 text-gray-400" />
          ) : (
            isOpen ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />
          )}
        </div>
      </button>

      <AnimatePresence>
        {isOpen && !month.isLocked && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-gray-100"
          >
            <div className="p-4 space-y-4 bg-gray-50/50">
              {month.weeks?.map((week, idx) => (
                <WeekItem key={week.id} week={week} index={idx} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
