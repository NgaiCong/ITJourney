import { prisma } from "@/lib/prisma";
import { Stage, Month, Week, Lesson } from "@/types/roadmap";

// Helper to calculate progress percentage
function calculateProgress(completed: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((completed / total) * 100);
}

export async function getRoadmapData(userId: string) {
  // Fetch all stages with hierarchy
  const stages = await prisma.stage.findMany({
    include: {
      months: {
        include: {
          weeks: {
            include: {
              lessons: {
                include: {
                  progress: {
                    where: { userId }
                  }
                },
                orderBy: { order: 'asc' }
              }
            },
            orderBy: { order: 'asc' }
          }
        },
        orderBy: { order: 'asc' }
      }
    },
    orderBy: { order: 'asc' }
  });

  // Process stages to add progress and lock status
  // Logic: Stage 1 unlocked. Stage N unlocked if Stage N-1 progress >= 80%
  
  let previousStageProgress = 100; // First stage always unlocked (simulated by prev=100)

  const processedStages = stages.map((stage) => {
    let stageTotalLessons = 0;
    let stageCompletedLessons = 0;

    const processedMonths = stage.months.map((month) => {
      let monthTotalLessons = 0;
      let monthCompletedLessons = 0;

      const processedWeeks = month.weeks.map((week) => {
        const totalLessons = week.lessons.length;
        const completedLessons = week.lessons.filter(
          (l) => l.progress.length > 0 && l.progress[0].status === 'COMPLETED'
        ).length;

        monthTotalLessons += totalLessons;
        monthCompletedLessons += completedLessons;

        return {
          ...week,
          progress: calculateProgress(completedLessons, totalLessons),
          isLocked: false, // We'll refine week locking logic if needed, usually based on previous week
          lessons: week.lessons.map(l => ({
            ...l,
            isCompleted: l.progress.length > 0 && l.progress[0].status === 'COMPLETED',
            isLocked: false // Individual lesson locking logic can be added here
          }))
        };
      });

      stageTotalLessons += monthTotalLessons;
      stageCompletedLessons += monthCompletedLessons;

      return {
        ...month,
        weeks: processedWeeks,
        progress: calculateProgress(monthCompletedLessons, monthTotalLessons),
        isLocked: false // Refine month locking
      };
    });

    const stageProgress = calculateProgress(stageCompletedLessons, stageTotalLessons);
    const isLocked = previousStageProgress < 80;
    
    previousStageProgress = stageProgress;

    return {
      ...stage,
      months: processedMonths,
      progress: stageProgress,
      isLocked: stage.order === 1 ? false : isLocked
    };
  });

  return processedStages;
}

export async function getStageDetail(stageId: string, userId: string) {
  const stage = await prisma.stage.findUnique({
    where: { id: stageId },
    include: {
      months: {
        include: {
          weeks: {
            include: {
              lessons: {
                include: {
                  progress: {
                    where: { userId }
                  }
                },
                orderBy: { order: 'asc' }
              }
            },
            orderBy: { order: 'asc' }
          }
        },
        orderBy: { order: 'asc' }
      }
    }
  });

  if (!stage) return null;

  // Similar processing as getRoadmapData but for a single stage
  // ... (simplified for brevity, ideally reuse logic)
  
  return stage;
}

export async function getLessonDetail(lessonId: string, userId: string) {
  const lesson = await prisma.lesson.findUnique({
    where: { id: lessonId },
    include: {
      quiz: true,
      exercise: true,
      progress: {
        where: { userId }
      },
      week: {
        include: {
          lessons: {
            select: { id: true, title: true, slug: true, type: true, order: true }
          }
        }
      }
    }
  });

  return lesson;
}
