export interface Stage {
  id: string;
  title: string;
  description: string | null;
  order: number;
  slug: string;
  months: Month[];
  isLocked?: boolean;
  progress?: number;
}

export interface Month {
  id: string;
  title: string;
  description: string | null;
  order: number;
  slug: string;
  weeks: Week[];
  isLocked?: boolean;
  progress?: number;
}

export interface Week {
  id: string;
  title: string;
  description: string | null;
  order: number;
  slug: string;
  lessons: Lesson[];
  isLocked?: boolean;
  progress?: number;
}

export type LessonType = 'VIDEO' | 'TEXT' | 'QUIZ' | 'PROJECT' | 'EXERCISE';

export interface Lesson {
  id: string;
  title: string;
  description: string | null;
  content: string | null;
  type: LessonType;
  duration: number | null;
  order: number;
  slug: string;
  xpReward: number;
  isCompleted?: boolean;
  isLocked?: boolean;
}

export interface Quiz {
  id: string;
  lessonId: string;
  questions: Question[];
  passScore: number;
}

export interface Question {
  id: string;
  text: string;
  type: 'MULTIPLE_CHOICE' | 'TRUE_FALSE' | 'CODE' | 'SHORT_ANSWER';
  options?: string[];
  correctAnswer: string | string[]; // Index or text
  explanation?: string;
  codeSnippet?: string;
}

export interface Exercise {
  id: string;
  lessonId: string;
  instructions: string;
  starterCode: string | null;
  testCases: TestCase[];
}

export interface TestCase {
  input: string;
  expectedOutput: string;
  isHidden?: boolean;
}

export interface QuizAttempt {
  id: string;
  score: number;
  passed: boolean;
  createdAt: string;
}

export interface ExerciseAttempt {
  id: string;
  passed: boolean;
  createdAt: string;
}
