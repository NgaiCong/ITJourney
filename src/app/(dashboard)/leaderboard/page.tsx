"use client";

import { useEffect, useState } from "react";
import { Loader2, Crown } from "lucide-react";
import LeaderboardTable from "@/components/gamification/LeaderboardTable";
import { useSession } from "next-auth/react";

export default function LeaderboardPage() {
  const { data: session } = useSession();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await fetch("/api/gamification/leaderboard?limit=50");
        if (res.ok) {
          const data = await res.json();
          setUsers(data);
        }
      } catch (error) {
        console.error("Failed to fetch leaderboard", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8 max-w-5xl mx-auto">
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-100 rounded-full mb-4">
          <Crown className="w-8 h-8 text-yellow-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Bảng Xếp Hạng</h1>
        <p className="text-gray-500 mt-2">Top những học viên xuất sắc nhất cộng đồng.</p>
      </div>

      <LeaderboardTable 
        users={users} 
        currentUserId={session?.user?.id || ""} 
      />
    </div>
  );
}
