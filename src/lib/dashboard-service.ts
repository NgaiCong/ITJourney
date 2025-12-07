import { prisma } from "@/lib/prisma";
import { DashboardData, Activity, Notification } from "@/types/dashboard";

export async function getDashboardData(userEmail: string): Promise<DashboardData> {
  const user = await prisma.user.findUnique({
    where: { email: userEmail },
    include: {
      streaks: {
        where: { type: 'LOGIN' }
      },
      progress: {
        include: {
          lesson: {
            include: {
              week: {
                include: {
                  month: {
                    include: {
                      stage: true
                    }
                  }
                }
              }
            }
          }
        },
        orderBy: { updatedAt: 'desc' },
        take: 20
      },
      achievements: {
        include: { achievement: true },
        orderBy: { earnedAt: 'desc' },
        take: 3
      },
      notifications: {
        orderBy: { createdAt: 'desc' },
        take: 5
      },
      goals: {
        where: { status: 'IN_PROGRESS' },
        take: 3
      },
      activityLogs: {
        orderBy: { createdAt: 'desc' },
        take: 10
      }
    }
  });

  if (!user) {
    throw new Error("User not found");
  }

  // Fetch all stages for roadmap calculation
  const allStages = await prisma.stage.findMany({
    orderBy: { order: 'asc' },
    include: {
      months: {
        include: {
          weeks: {
            include: {
              lessons: {
                select: { id: true }
              }
            }
          }
        }
      }
    }
  });

  // Calculate Roadmap Progress
  const allUserProgress = await prisma.userProgress.findMany({
    where: { userId: user.id, status: 'COMPLETED' },
    select: { lessonId: true }
  });
  const completedLessonIds = new Set(allUserProgress.map(p => p.lessonId));

  const roadmapStages = allStages.map((stage, index) => {
    const stageLessonIds = stage.months.flatMap(m => m.weeks.flatMap(w => w.lessons.map(l => l.id)));
    const totalLessons = stageLessonIds.length;
    const completedCount = stageLessonIds.filter(id => completedLessonIds.has(id)).length;
    const completion = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;
    
    const isLocked = index > 0 && completion === 0;

    return {
      id: stage.id,
      title: stage.title,
      completion,
      isLocked,
      slug: stage.slug
    };
  });

  // Current Lesson
  const lastProgress = user.progress[0];
  const currentLesson = lastProgress ? {
    title: lastProgress.lesson.title,
    slug: lastProgress.lesson.slug,
    progress: lastProgress.status === 'COMPLETED' ? 100 : 50,
    estimatedMinutes: lastProgress.lesson.duration || 30,
    chapterTitle: lastProgress.lesson.week.title
  } : undefined;

  // Recent Activities
  let recentActivities: Activity[] = user.activityLogs.map(log => {
    let type: Activity['type'] = 'LOGIN';
    if (log.action.includes('LESSON')) type = 'LESSON';
    else if (log.action.includes('QUIZ')) type = 'QUIZ';
    else if (log.action.includes('PROJECT')) type = 'PROJECT';
    else if (log.action.includes('ACHIEVEMENT')) type = 'ACHIEVEMENT';
    
    return {
      id: log.id,
      type,
      title: log.action, 
      timestamp: log.createdAt.toISOString(),
      xp: 0
    };
  });
  
  if (recentActivities.length === 0) {
     recentActivities = user.progress.slice(0, 5).map(p => ({
        id: p.id,
        type: 'LESSON',
        title: `Completed ${p.lesson.title}`,
        timestamp: p.updatedAt.toISOString(),
        xp: p.lesson.xpReward
     }));
  }

  // Streaks
  const loginStreak = user.streaks[0];
  
  const dashboardData: DashboardData = {
    user: {
      name: user.name || "User",
      level: user.level || 1,
      xp: user.xp || 0,
      nextLevelXp: (user.level || 1) * 1000,
      avatar: user.image || undefined,
    },
    streaks: {
      current: loginStreak?.currentCount || user.streak || 0,
      longest: loginStreak?.longestCount || user.streak || 0,
    },
    today: {
      studyMinutes: 0, 
      targetMinutes: 60,
      tasksCompleted: 0,
      totalTasks: 0,
      tasks: []
    },
    overall: {
      joinDate: user.createdAt.toISOString(),
      totalHours: 0,
      lessonsCompleted: completedLessonIds.size,
      exercisesCompleted: 0,
      projectsCompleted: 0,
      weeklyHours: [
        { day: 'T2', hours: 0 },
        { day: 'T3', hours: 0 },
        { day: 'T4', hours: 0 },
        { day: 'T5', hours: 0 },
        { day: 'T6', hours: 0 },
        { day: 'T7', hours: 0 },
        { day: 'CN', hours: 0 },
      ],
      heatmapData: []
    },
    roadmap: {
      stages: roadmapStages,
      currentLesson
    },
    goals: {
      weekly: user.goals.map(g => ({
        id: g.id,
        title: g.title,
        current: g.current,
        target: g.target,
        unit: 'units'
      }))
    },
    recentActivities,
    achievements: user.achievements.map(ua => ({
      id: ua.achievement.id,
      name: ua.achievement.name,
      icon: ua.achievement.icon,
      earnedDate: ua.earnedAt.toISOString(),
      xp: ua.achievement.xpReward
    })),
    notifications: user.notifications.map(n => ({
      id: n.id,
      title: n.title,
      message: n.message,
      type: n.type as Notification['type'],
      read: n.read,
      createdAt: n.createdAt.toISOString()
    }))
  };

  return dashboardData;
}
