"use client";

import { useEffect, useState } from "react";
import { DashboardData } from "@/types/dashboard";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import TodayProgress from "@/components/dashboard/TodayProgress";
import OverallStats from "@/components/dashboard/OverallStats";
import RoadmapProgress from "@/components/dashboard/RoadmapProgress";
import ContinueLearning from "@/components/dashboard/ContinueLearning";
import WeeklyGoals from "@/components/dashboard/WeeklyGoals";
import RecentActivity from "@/components/dashboard/RecentActivity";
import AchievementsBadge from "@/components/dashboard/AchievementsBadge";
import NotificationsList from "@/components/dashboard/NotificationsList";
import { Loader2 } from "lucide-react";

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/dashboard");
        if (!res.ok) {
          throw new Error("Failed to fetch dashboard data");
        }
        const jsonData = await res.json();
        setData(jsonData);
      } catch (err) {
        console.error(err);
        setError("Có lỗi xảy ra khi tải dữ liệu");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-800 mb-2">Đã có lỗi xảy ra</h2>
          <p className="text-gray-500">{error || "Không tìm thấy dữ liệu"}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Section */}
        <DashboardHeader 
          user={data.user} 
          streak={data.streaks.current} 
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Continue Learning & Today Progress */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ContinueLearning lesson={data.roadmap.currentLesson} />
              <TodayProgress 
                studyMinutes={data.today.studyMinutes}
                targetMinutes={data.today.targetMinutes}
                tasks={data.today.tasks}
              />
            </div>

            {/* Roadmap Progress */}
            <RoadmapProgress stages={data.roadmap.stages} />

            {/* Overall Stats */}
            <OverallStats stats={data.overall} />
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            <WeeklyGoals goals={data.goals.weekly} />
            <AchievementsBadge achievements={data.achievements} />
            <RecentActivity activities={data.recentActivities} />
            <NotificationsList notifications={data.notifications} />
          </div>
        </div>
      </div>
    </div>
  );
}
