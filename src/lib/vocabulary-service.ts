import { prisma } from "@/lib/prisma";
import { calculateSM2 } from "@/lib/algorithms/spaced-repetition";

export async function getDueWords(userId: string) {
  const now = new Date();
  // Set to end of day to include everything due today
  const endOfDay = new Date(now);
  endOfDay.setHours(23, 59, 59, 999);

  return await prisma.userVocabulary.findMany({
    where: {
      userId,
      nextReview: {
        lte: endOfDay
      }
    },
    include: {
      vocabulary: true
    },
    orderBy: {
      nextReview: 'asc'
    }
  });
}

export async function getNewWords(userId: string, limit: number = 10) {
  // Find words that the user hasn't started learning yet
  // This is a bit tricky with Prisma. We need to find Vocabulary items 
  // where there is NO corresponding UserVocabulary record for this user.
  
  // 1. Get IDs of words user is already learning
  const learningWords = await prisma.userVocabulary.findMany({
    where: { userId },
    select: { vocabularyId: true }
  });
  
  const learningIds = learningWords.map(w => w.vocabularyId);

  // 2. Find words not in that list
  return await prisma.vocabulary.findMany({
    where: {
      id: {
        notIn: learningIds
      }
    },
    take: limit,
    orderBy: {
      // Randomize or order by difficulty/category if we had those fields
      term: 'asc' 
    }
  });
}

export async function reviewWord(userId: string, vocabularyId: string, quality: number) {
  // 1. Find existing progress or create new if it's the first time (though usually we'd create it when "learning" starts)
  // But for simplicity, let's assume if we review it, we are tracking it.
  
  let userVocab = await prisma.userVocabulary.findUnique({
    where: {
      userId_vocabularyId: {
        userId,
        vocabularyId
      }
    }
  });

  // If not found, it's a new word being reviewed for the first time
  if (!userVocab) {
    // Initial state
    userVocab = await prisma.userVocabulary.create({
      data: {
        userId,
        vocabularyId,
        easeFactor: 2.5,
        interval: 0,
        repetitions: 0,
        nextReview: new Date() // Will be updated below
      }
    });
  }

  // 2. Calculate next review
  const result = calculateSM2(
    {
      easeFactor: userVocab.easeFactor,
      interval: userVocab.interval,
      repetitions: userVocab.repetitions
    },
    quality
  );

  // 3. Update database
  const updated = await prisma.userVocabulary.update({
    where: { id: userVocab.id },
    data: {
      easeFactor: result.easeFactor,
      interval: result.interval,
      repetitions: result.repetitions,
      nextReview: result.nextReviewDate,
      lastReviewed: new Date()
    },
    include: {
      vocabulary: true
    }
  });

  return updated;
}

export async function getUserStats(userId: string) {
  const total = await prisma.userVocabulary.count({ where: { userId } });
  
  const mastered = await prisma.userVocabulary.count({
    where: {
      userId,
      interval: { gt: 21 } // Arbitrary threshold for "mastered" (e.g., > 3 weeks interval)
    }
  });

  const dueToday = await prisma.userVocabulary.count({
    where: {
      userId,
      nextReview: {
        lte: new Date()
      }
    }
  });

  return {
    total,
    mastered,
    dueToday
  };
}
