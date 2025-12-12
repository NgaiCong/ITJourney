"use client";

import React from 'react';
import { ExternalLink, ThumbsUp, MessageCircle } from 'lucide-react';

interface FacebookGroupWidgetProps {
  groupUrl?: string;
  memberCount?: number;
  className?: string;
}

export default function FacebookGroupWidget({ 
  groupUrl = "https://www.facebook.com/groups/719531714538364",
  memberCount = 1200,
  className = ""
}: FacebookGroupWidgetProps) {
  return (
    <div className={`bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden ${className}`}>
      <div className="h-24 bg-blue-600 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30" />
        <div className="absolute bottom-4 left-4 text-white">
          <h3 className="font-bold text-lg">KHÔNG BAO GIỜ LÀ MUỘN - ITJ</h3>
          <p className="text-xs opacity-90">{memberCount.toLocaleString()} thành viên</p>
        </div>
      </div>
      
      <div className="p-4">
        <div className="space-y-4">
          <div className="flex items-start gap-3 pb-4 border-b border-neutral-100 dark:border-neutral-800">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">
              🔥
            </div>
            <div>
              <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                "Cách tôi vượt qua Con trỏ trong 3 ngày"
              </p>
              <div className="flex items-center gap-3 mt-1 text-xs text-neutral-500">
                <span className="flex items-center gap-1"><ThumbsUp className="w-3 h-3" /> 89</span>
                <span className="flex items-center gap-1"><MessageCircle className="w-3 h-3" /> 24</span>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3 pb-4 border-b border-neutral-100 dark:border-neutral-800">
            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold text-xs">
              💼
            </div>
            <div>
              <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                5 công ty đang tuyển intern React/Next.js
              </p>
              <div className="flex items-center gap-3 mt-1 text-xs text-neutral-500">
                <span className="flex items-center gap-1"><ThumbsUp className="w-3 h-3" /> 45</span>
                <span className="flex items-center gap-1"><MessageCircle className="w-3 h-3" /> 12</span>
              </div>
            </div>
          </div>

          <button 
            onClick={() => window.open(groupUrl, '_blank')}
            className="w-full py-2 bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 font-medium rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors flex items-center justify-center gap-2 text-sm"
          >
            Xem thêm trong Group
            <ExternalLink className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
}
