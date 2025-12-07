import { calculateNextReview } from '@/lib/algorithms/spaced-repetition';

describe('SM-2 Algorithm', () => {
  it('increases interval on correct answer', () => {
    const card = {
      easeFactor: 2.5,
      interval: 1,
      repetitions: 0,
      lastReviewed: new Date(),
      nextReview: new Date(),
    };
    
    const result = calculateNextReview(card, 4); // Good
    expect(result.interval).toBeGreaterThan(1);
  });
  
  it('resets interval on wrong answer', () => {
    const card = {
      easeFactor: 2.5,
      interval: 7,
      repetitions: 3,
      lastReviewed: new Date(),
      nextReview: new Date(),
    };
    
    const result = calculateNextReview(card, 0); // Again
    expect(result.interval).toBe(1);
    expect(result.repetitions).toBe(0);
  });
});
