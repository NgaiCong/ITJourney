export interface SM2Card {
  easeFactor: number;
  interval: number;
  repetitions: number;
}

export interface ReviewResult {
  easeFactor: number;
  interval: number;
  repetitions: number;
  nextReviewDate: Date;
}

/**
 * Calculates the next review schedule using the SM-2 algorithm.
 * 
 * @param card Current state of the card (easeFactor, interval, repetitions)
 * @param quality Quality of the review (0-5)
 *   0: Complete blackout (Again)
 *   1: Incorrect response; the correct one remembered
 *   2: Incorrect response; where the correct one seemed easy to recall
 *   3: Correct response recalled with serious difficulty (Hard)
 *   4: Correct response after a hesitation (Good)
 *   5: Perfect response (Easy)
 */
export function calculateSM2(card: SM2Card, quality: number): ReviewResult {
  let { easeFactor, interval, repetitions } = card;

  if (quality >= 3) {
    // Correct response
    if (repetitions === 0) {
      interval = 1;
    } else if (repetitions === 1) {
      interval = 6;
    } else {
      interval = Math.round(interval * easeFactor);
    }
    repetitions += 1;
  } else {
    // Incorrect response
    repetitions = 0;
    interval = 1;
  }

  // Update Ease Factor
  // EF' = EF + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02))
  easeFactor = easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
  
  // Ease Factor lower bound is 1.3
  if (easeFactor < 1.3) {
    easeFactor = 1.3;
  }

  const nextReviewDate = new Date();
  nextReviewDate.setDate(nextReviewDate.getDate() + interval);
  // Set to start of day to avoid time drift issues
  nextReviewDate.setHours(0, 0, 0, 0);

  return {
    easeFactor,
    interval,
    repetitions,
    nextReviewDate
  };
}
