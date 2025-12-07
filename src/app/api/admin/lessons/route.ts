import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";
import { logAuditAction } from "@/lib/audit-logger";

export async function POST(request: Request) {
  try {
    const session = await requireAdmin();
    const body = await request.json();

    const lesson = await prisma.lesson.create({
      data: {
        title: body.title,
        slug: body.slug,
        type: body.type,
        content: body.content,
        weekId: body.weekId,
        order: parseInt(body.order),
        duration: parseInt(body.duration),
        xpReward: parseInt(body.xpReward)
      }
    });

    await logAuditAction({
      adminId: session.user.id,
      action: "CREATE_LESSON",
      entity: "LESSON",
      entityId: lesson.id,
      details: { title: lesson.title }
    });

    return NextResponse.json(lesson);
  } catch (error) {
    console.error("Create Lesson Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    await requireAdmin();
    const lessons = await prisma.lesson.findMany({
      orderBy: { updatedAt: 'desc' }
    });
    return NextResponse.json(lessons);
  } catch (error) {
    console.error("Get Lessons Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
