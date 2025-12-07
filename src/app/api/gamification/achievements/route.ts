import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { checkAchievements } from "@/lib/gamification-service";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id || "";

    // Get all achievements
    const allAchievements = await prisma.achievement.findMany({
      orderBy: { xpReward: 'asc' }
    });

    // Get user's earned achievements
    const userAchievements = await prisma.userAchievement.findMany({
      where: { userId },
      select: { achievementId: true, earnedAt: true }
    });

    const earnedMap = new Map(userAchievements.map(ua => [ua.achievementId, ua.earnedAt]));

    const result = allAchievements.map(ach => ({
      ...ach,
      unlocked: earnedMap.has(ach.id),
      earnedAt: earnedMap.get(ach.id) || null
    }));

    return NextResponse.json(result);
  } catch (error) {
    console.error("Achievements API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST() {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const newUnlocked = await checkAchievements(session.user.id || "");
    return NextResponse.json({ newUnlocked });
  } catch (error) {
    console.error("Check Achievements Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
