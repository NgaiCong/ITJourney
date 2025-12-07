export interface Vocabulary {
  id: string;
  term: string;
  pronunciation?: string;
  definition: string;
  example?: string;
  translation?: string;
  category: string;
}

export interface UserVocabulary {
  id: string;
  vocabularyId: string;
  vocabulary: Vocabulary;
  easeFactor: number;
  interval: number;
  repetitions: number;
  nextReview: string;
}

export interface VocabularyStats {
  total: number;
  mastered: number;
  dueToday: number;
}
