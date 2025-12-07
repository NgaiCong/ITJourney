import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { awardXP } from "@/lib/gamification-service";

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { amount, source, metadata } = body;

    if (!amount || !source) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const result = await awardXP(session.user.id || "", amount, source, metadata);
    return NextResponse.json(result);
  } catch (error) {
    console.error("XP Award Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
