import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "10");
    const period = searchParams.get("period") || "all"; // 'week', 'month', 'all'

    // For simplicity, we'll just return all-time XP leaderboard for now
    // To do period-based, we'd need to aggregate ActivityLog or have separate XP counters
    
    const leaderboard = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        image: true,
        xp: true,
        level: true,
        streak: true // This is the legacy streak field, maybe we should use the new relation?
      },
      orderBy: {
        xp: 'desc'
      },
      take: limit
    });

    return NextResponse.json(leaderboard);
  } catch (error) {
    console.error("Leaderboard API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
