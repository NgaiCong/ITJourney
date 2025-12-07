import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getLessonDetail } from "@/lib/roadmap-service";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const lesson = await getLessonDetail(params.id, session.user.id || "user-id-placeholder");
    
    if (!lesson) {
      return NextResponse.json({ error: "Lesson not found" }, { status: 404 });
    }

    return NextResponse.json(lesson);
  } catch (error) {
    console.error("Lesson API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
