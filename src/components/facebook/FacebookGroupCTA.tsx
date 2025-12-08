"use client";

import React from 'react';
import { Users, ArrowRight } from 'lucide-react';

interface FacebookGroupCTAProps {
  className?: string;
}

export default function FacebookGroupCTA({ className = "" }: FacebookGroupCTAProps) {
  return (
    <div className={`bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white shadow-lg ${className}`}>
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold flex items-center gap-2">
            <Users className="w-6 h-6" />
            Tham Gia Cộng Đồng
          </h3>
          <p className="text-blue-100 mt-2 max-w-md">
            Hơn 1,200 thành viên đang học cùng nhau! Hỏi đáp, chia sẻ tiến độ và tìm bạn học.
          </p>
          <div className="flex flex-wrap gap-3 mt-4 text-sm text-blue-100">
            <span className="flex items-center gap-1">✅ Hỏi đáp 24/7</span>
            <span className="flex items-center gap-1">✅ Tìm Study Buddy</span>
            <span className="flex items-center gap-1">✅ Review Code</span>
          </div>
        </div>
        
        <button 
          onClick={() => window.open('https://www.facebook.com/groups/719531714538364', '_blank')}
          className="px-6 py-3 bg-white text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition-colors flex items-center gap-2 shadow-sm whitespace-nowrap"
        >
          📱 Tham gia Group
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
