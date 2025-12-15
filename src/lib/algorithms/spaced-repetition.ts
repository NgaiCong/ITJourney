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


export function calculateSM2(card: SM2Card, quality: number): ReviewResult {
  let { easeFactor, interval, repetitions } = card;

  if (quality >= 3) {
    if (repetitions === 0) {
      interval = 1;
    } else if (repetitions === 1) {
      interval = 6;
    } else {
      interval = Math.round(interval * easeFactor);
    }
    repetitions += 1;
  } else {
    repetitions = 0;
    interval = 1;
  }

  easeFactor = easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));

  if (easeFactor < 1.3) {
    easeFactor = 1.3;
  }

  const nextReviewDate = new Date();
  nextReviewDate.setDate(nextReviewDate.getDate() + interval);
  nextReviewDate.setHours(0, 0, 0, 0);

  return {
    easeFactor,
    interval,
    repetitions,
    nextReviewDate
  };
}
