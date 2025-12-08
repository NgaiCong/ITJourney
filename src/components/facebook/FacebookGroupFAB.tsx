"use client";

import React from 'react';
import { MessageCircle } from 'lucide-react';

interface FacebookGroupFABProps {
  groupUrl?: string;
}

export default function FacebookGroupFAB({ groupUrl = "https://www.facebook.com/groups/719531714538364" }: FacebookGroupFABProps) {
  return (
    <div className="fixed bottom-6 right-6 z-50 group">
      <button 
        onClick={() => window.open(groupUrl, '_blank')}
        className="flex items-center gap-2 px-5 py-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all hover:scale-105 active:scale-95"
      >
        <MessageCircle className="w-5 h-5" />
        <span className="font-medium">Cần giúp đỡ?</span>
      </button>
      
      <div className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full border-2 border-white dark:border-neutral-900 animate-pulse">
        142 online
      </div>
    </div>
  );
}
