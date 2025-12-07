import { NextResponse } from "next/server";
import { auth } from "@/middleware"; // Or wherever your auth helper is
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const session = await auth();
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { lessonId } = await req.json();

    if (!lessonId) {
      return NextResponse.json({ error: "Missing lessonId" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Check if lesson exists and get XP reward
    const lesson = await prisma.lesson.findUnique({
      where: { id: lessonId },
      select: { id: true, xpReward: true, title: true }
    });

    if (!lesson) {
      return NextResponse.json({ error: "Lesson not found" }, { status: 404 });
    }

    // Check if already completed to avoid duplicate XP
    const existingProgress = await prisma.userProgress.findUnique({
      where: {
        userId_lessonId: {
          userId: user.id,
          lessonId: lessonId
        }
      }
    });

    if (existingProgress?.status === 'COMPLETED') {
      return NextResponse.json({ message: "Lesson already completed", completed: true, xpAwarded: 0 });
    }

    // Transaction to update progress, add XP, and log activity
    const result = await prisma.$transaction(async (tx) => {
      // 1. Upsert Progress
      const progress = await tx.userProgress.upsert({
        where: {
          userId_lessonId: {
            userId: user.id,
            lessonId: lessonId
          }
        },
        update: {
          status: 'COMPLETED',
          completedAt: new Date(),
        },
        create: {
          userId: user.id,
          lessonId: lessonId,
          status: 'COMPLETED',
          completedAt: new Date(),
        }
      });

      // 2. Add XP to User
      const updatedUser = await tx.user.update({
        where: { id: user.id },
        data: {
          xp: { increment: lesson.xpReward }
        }
      });

      // 3. Log Activity
      await tx.activityLog.create({
        data: {
          userId: user.id,
          action: 'LESSON_COMPLETE',
          metadata: {
            lessonId: lesson.id,
            lessonTitle: lesson.title,
            xpEarned: lesson.xpReward
          }
        }
      });

      return { progress, updatedUser, xpAwarded: lesson.xpReward };
    });

    return NextResponse.json({
      completed: true,
      xpAwarded: result.xpAwarded,
      newTotalXp: result.updatedUser.xp
    });

  } catch (error) {
    console.error("Complete Lesson Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
