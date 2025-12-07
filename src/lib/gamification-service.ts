import { prisma } from "@/lib/prisma";

export const XP_VALUES = {
  lesson_completed: 10,
  quiz_passed: 20,
  quiz_perfect: 50,
  exercise_completed: 15,
  project_submitted: 100,
  project_perfect: 200,
  daily_goal_met: 30,
  weekly_goal_met: 100,
  streak_7_days: 50,
  streak_30_days: 200,
  streak_100_days: 500,
  vocabulary_mastered: 5,
  achievement_unlocked: 0 // Varies by achievement
};

export function calculateLevel(totalXP: number): number {
  // Formula: XP required = level * 150 (cumulative)
  // Level 1: 0-150
  // Level 2: 151-450 (150 + 300)
  // Simplified: Level = floor(sqrt(totalXP / 75)) + 1 ? No, let's stick to the user's request or a simple linear/quadratic curve.
  // User said: "XP required = level * 150". This usually means to get from L to L+1.
  
  let level = 1;
  let xpForNext = 150;
  let currentTotal = 0;

  while (totalXP >= currentTotal + xpForNext) {
    currentTotal += xpForNext;
    level++;
    xpForNext = level * 150;
  }
  
  return level;
}

export function getXPForNextLevel(level: number): number {
  return level * 150;
}

export function getLevelProgress(totalXP: number) {
  let level = 1;
  let xpForNext = 150;
  let currentTotal = 0;

  while (totalXP >= currentTotal + xpForNext) {
    currentTotal += xpForNext;
    level++;
    xpForNext = level * 150;
  }

  const xpInCurrentLevel = totalXP - currentTotal;
  return {
    level,
    currentXP: xpInCurrentLevel,
    requiredXP: xpForNext,
    progress: (xpInCurrentLevel / xpForNext) * 100
  };
}

export async function awardXP(userId: string, amount: number, source: string, metadata?: any) {
  // 1. Log the activity
  await prisma.activityLog.create({
    data: {
      userId,
      action: "XP_EARNED",
      metadata: { amount, source, ...metadata }
    }
  });

  // 2. Update User
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) return null;

  const newXP = user.xp + amount;
  const oldLevel = user.level;
  const newLevel = calculateLevel(newXP);

  await prisma.user.update({
    where: { id: userId },
    data: {
      xp: newXP,
      level: newLevel
    }
  });

  return {
    newXP,
    newLevel,
    leveledUp: newLevel > oldLevel
  };
}

export async function updateStreak(userId: string, type: string = "LOGIN") {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  
  const streak = await prisma.streak.findUnique({
    where: {
      userId_type: {
        userId,
        type
      }
    }
  });

  if (!streak) {
    // First time
    return await prisma.streak.create({
      data: {
        userId,
        type,
        startDate: now,
        currentCount: 1,
        longestCount: 1,
        lastActivityDate: now
      }
    });
  }

  const lastDate = new Date(streak.lastActivityDate);
  const lastDateNormalized = new Date(lastDate.getFullYear(), lastDate.getMonth(), lastDate.getDate());
  
  const diffTime = Math.abs(today.getTime() - lastDateNormalized.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    // Already updated today
    return streak;
  } else if (diffDays === 1) {
    // Consecutive day
    const newCount = streak.currentCount + 1;
    return await prisma.streak.update({
      where: { id: streak.id },
      data: {
        currentCount: newCount,
        longestCount: Math.max(newCount, streak.longestCount),
        lastActivityDate: now
      }
    });
  } else {
    // Streak broken
    return await prisma.streak.update({
      where: { id: streak.id },
      data: {
        currentCount: 1,
        lastActivityDate: now,
        startDate: now // Reset start date
      }
    });
  }
}

export async function checkAchievements(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      achievements: true,
      streaks: true,
      vocabularies: true,
      progress: true
    }
  });

  if (!user) return [];

  const earnedAchievementIds = new Set(user.achievements.map(ua => ua.achievementId));
  const allAchievements = await prisma.achievement.findMany();
  const newUnlocked = [];

  for (const achievement of allAchievements) {
    if (earnedAchievementIds.has(achievement.id)) continue;

    let unlocked = false;
    const criteria = achievement.criteria as any;

    if (!criteria) continue;

    switch (criteria.type) {
      case 'streak_days':
        const streak = user.streaks.find(s => s.type === 'LOGIN'); // Default to login streak
        if (streak && streak.currentCount >= criteria.count) unlocked = true;
        break;
      
      case 'vocab_mastered':
        // Count words with interval > 21 days (considered mastered)
        const masteredCount = user.vocabularies.filter(v => v.interval > 21).length;
        if (masteredCount >= criteria.count) unlocked = true;
        break;

      case 'week_complete':
        // Simplified check
        const completedLessons = user.progress.filter(p => p.status === 'COMPLETED').length;
        if (completedLessons >= 5) unlocked = true; // Placeholder logic
        break;
        
      // Add more cases as needed
    }

    if (unlocked) {
      await prisma.userAchievement.create({
        data: {
          userId,
          achievementId: achievement.id
        }
      });
      
      // Award XP for achievement
      await awardXP(userId, achievement.xpReward, 'ACHIEVEMENT_UNLOCKED', { achievementId: achievement.id });
      
      newUnlocked.push(achievement);
    }
  }

  return newUnlocked;
}
