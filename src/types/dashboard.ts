export interface Task {
  id: string;
  title: string;
  completed: boolean;
}

export interface Goal {
  id: string;
  title: string;
  current: number;
  target: number;
  unit: string;
}

export interface Activity {
  id: string;
  type: 'LESSON' | 'QUIZ' | 'PROJECT' | 'ACHIEVEMENT' | 'LOGIN';
  title: string;
  timestamp: string;
  xp?: number;
}

export interface Achievement {
  id: string;
  name: string;
  icon: string;
  earnedDate: string;
  xp: number;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'SYSTEM' | 'REMINDER' | 'ACHIEVEMENT';
  read: boolean;
  createdAt: string;
}

export interface DashboardData {
  user: {
    name: string;
    level: number;
    xp: number;
    nextLevelXp: number;
    avatar?: string;
  };
  streaks: {
    current: number;
    longest: number;
  };
  today: {
    studyMinutes: number;
    targetMinutes: number;
    tasksCompleted: number;
    totalTasks: number;
    tasks: Task[];
  };
  overall: {
    joinDate: string;
    totalHours: number;
    lessonsCompleted: number;
    exercisesCompleted: number;
    projectsCompleted: number;
    weeklyHours: { day: string; hours: number }[];
    heatmapData: { date: string; count: number }[];
  };
  roadmap: {
    stages: {
      id: string;
      title: string;
      completion: number;
      isLocked: boolean;
      slug: string;
    }[];
    currentLesson?: {
      title: string;
      slug: string;
      progress: number;
      estimatedMinutes: number;
      chapterTitle: string;
    };
  };
  goals: {
    weekly: Goal[];
  };
  recentActivities: Activity[];
  achievements: Achievement[];
  notifications: Notification[];
}
