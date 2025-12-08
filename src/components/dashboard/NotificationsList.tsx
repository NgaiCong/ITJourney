"use client";

import { Notification } from "@/types/dashboard";
import { Bell, Info, Trophy, Clock } from "lucide-react";

interface NotificationsListProps {
  notifications: Notification[];
}

const getNotificationIcon = (type: Notification['type']) => {
  switch (type) {
    case 'ACHIEVEMENT':
      return <Trophy className="w-4 h-4 text-yellow-500" />;
    case 'REMINDER':
      return <Clock className="w-4 h-4 text-orange-500" />;
    default:
      return <Info className="w-4 h-4 text-gray-500" />;
  }
};

export default function NotificationsList({ notifications }: NotificationsListProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-gray-800">Thông báo</h3>
        <button className="text-xs text-blue-600 hover:underline">
          Đánh dấu đã đọc
        </button>
      </div>

      <div className="space-y-4">
        {notifications.map((notification) => (
          <div 
            key={notification.id}
            className={`flex gap-3 p-3 rounded-lg transition-colors ${
              notification.read ? 'bg-white' : 'bg-blue-50/50'
            } hover:bg-gray-50`}
          >
            <div className={`mt-1 w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
              notification.read ? 'bg-gray-100' : 'bg-white shadow-sm'
            }`}>
              {getNotificationIcon(notification.type)}
            </div>
            
            <div>
              <h4 className={`text-sm font-medium ${notification.read ? 'text-gray-700' : 'text-gray-900'}`}>
                {notification.title}
              </h4>
              <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">
                {notification.message}
              </p>
              <span className="text-[10px] text-gray-400 mt-1 block">
                {new Date(notification.createdAt).toLocaleDateString('vi-VN')}
              </span>
            </div>
          </div>
        ))}

        {notifications.length === 0 && (
          <div className="flex flex-col items-center justify-center py-8 text-gray-500">
            <Bell className="w-8 h-8 mb-2 text-gray-300" />
            <p className="text-sm">Không có thông báo mới</p>
          </div>
        )}
      </div>
    </div>
  );
}
