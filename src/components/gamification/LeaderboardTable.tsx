"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Trophy, Medal } from "lucide-react";

interface LeaderboardUser {
  id: string;
  name: string | null;
  image: string | null;
  xp: number;
  level: number;
  rank: number;
}

interface LeaderboardTableProps {
  users: LeaderboardUser[];
  currentUserId: string;
}

export default function LeaderboardTable({ users, currentUserId }: LeaderboardTableProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50 border-b border-gray-100">
          <tr>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-16">Rank</th>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
            <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Level</th>
            <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">XP</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {users.map((user, index) => {
            const rank = index + 1;
            const isCurrentUser = user.id === currentUserId;
            
            return (
              <tr 
                key={user.id} 
                className={isCurrentUser ? "bg-blue-50" : "hover:bg-gray-50"}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center justify-center w-8 h-8 font-bold text-gray-700">
                    {rank === 1 && <Trophy className="w-5 h-5 text-yellow-500" />}
                    {rank === 2 && <Medal className="w-5 h-5 text-gray-400" />}
                    {rank === 3 && <Medal className="w-5 h-5 text-orange-400" />}
                    {rank > 3 && <span>{rank}</span>}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <Avatar className="h-8 w-8 mr-3">
                      <AvatarImage src={user.image || ""} />
                      <AvatarFallback>{user.name?.[0] || "U"}</AvatarFallback>
                    </Avatar>
                    <div className="text-sm font-medium text-gray-900">
                      {user.name || "Anonymous User"}
                      {isCurrentUser && <span className="ml-2 text-xs text-blue-600 font-normal">(You)</span>}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">
                  Lvl {user.level}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-bold text-gray-900">
                  {user.xp.toLocaleString()}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
