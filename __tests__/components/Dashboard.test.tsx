import { render, screen } from '@testing-library/react';
import Dashboard from '@/app/(dashboard)/dashboard/page';

// Mock the dashboard service fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({
      user: { name: 'Test User', level: 1, xp: 100, nextLevelXp: 1000 },
      streaks: { current: 5, longest: 10 },
      today: { studyMinutes: 30, targetMinutes: 60, tasksCompleted: 1, totalTasks: 3, tasks: [] },
      overall: { joinDate: '2023-01-01', totalHours: 10, lessonsCompleted: 5, exercisesCompleted: 2, projectsCompleted: 0, weeklyHours: [], heatmapData: [] },
      roadmap: { stages: [], currentLesson: undefined },
      goals: { weekly: [] },
      recentActivities: [],
      achievements: [],
      notifications: []
    }),
  })
) as jest.Mock;

describe('Dashboard', () => {
  it('renders welcome message', async () => {
    // We need to await the component rendering because it fetches data
    // However, Dashboard is a client component that fetches in useEffect.
    // Testing Library's `render` is synchronous, but we can wait for elements.
    
    render(<Dashboard />);
    
    // Wait for loading to finish
    expect(await screen.findByText(/chào mừng/i)).toBeInTheDocument();
  });
  
  it('displays streak counter', async () => {
    render(<Dashboard />);
    expect(await screen.findByText(/streak/i)).toBeInTheDocument();
  });
});
