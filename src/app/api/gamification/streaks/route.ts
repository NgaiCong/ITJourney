import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { updateStreak } from "@/lib/gamification-service";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const streaks = await prisma.streak.findMany({
      where: { userId: session.user.id }
    });

    return NextResponse.json(streaks);
  } catch (error) {
    console.error("Streaks API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { type } = body;

    const result = await updateStreak(session.user.id || "", type);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Update Streak Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
