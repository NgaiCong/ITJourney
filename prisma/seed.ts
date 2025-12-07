import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding...');

  // 1. Seed Stages
  const stages = [
    {
      title: 'The Foundation',
      description: 'Xây dựng nền tảng tư duy máy tính và lập trình cơ bản với C++.',
      order: 1,
      slug: 'foundation',
      months: [
        { title: 'Month 1: Computer Science Basics', order: 1, slug: 'month-1' },
        { title: 'Month 2: C++ Programming', order: 2, slug: 'month-2' },
        { title: 'Month 3: Data Structures & Algorithms', order: 3, slug: 'month-3' },
      ],
    },
    {
      title: 'The Modern Web',
      description: 'Chuyển sang phát triển ứng dụng web hiện đại với JavaScript/TypeScript.',
      order: 2,
      slug: 'modern-web',
      months: [
        { title: 'Month 4: JavaScript Deep Dive', order: 4, slug: 'month-4' },
        { title: 'Month 5: React & Frontend', order: 5, slug: 'month-5' },
        { title: 'Month 6: Backend with Node.js', order: 6, slug: 'month-6' },
      ],
    },
    {
      title: 'The Professional',
      description: 'Các kỹ năng nâng cao: Database, DevOps, Architecture.',
      order: 3,
      slug: 'professional',
      months: [
        { title: 'Month 7: Databases & SQL', order: 7, slug: 'month-7' },
        { title: 'Month 8: DevOps & Deployment', order: 8, slug: 'month-8' },
        { title: 'Month 9: System Design', order: 9, slug: 'month-9' },
      ],
    },
    {
      title: 'The Expert',
      description: 'Chuyên sâu, dự án thực tế và chuẩn bị sự nghiệp.',
      order: 4,
      slug: 'expert',
      months: [
        { title: 'Month 10: Advanced Topics', order: 10, slug: 'month-10' },
        { title: 'Month 11: Capstone Project', order: 11, slug: 'month-11' },
        { title: 'Month 12: Career Prep', order: 12, slug: 'month-12' },
      ],
    },
  ];

  for (const stageData of stages) {
    const stage = await prisma.stage.upsert({
      where: { slug: stageData.slug },
      update: {},
      create: {
        title: stageData.title,
        description: stageData.description,
        order: stageData.order,
        slug: stageData.slug,
        months: {
          create: stageData.months.map((m) => ({
            title: m.title,
            order: m.order,
            slug: m.slug,
            weeks: {
              create: [1, 2, 3, 4].map((w) => ({
                title: `Week ${w}`,
                order: w,
                slug: `${m.slug}-week-${w}`,
              })),
            },
          })),
        },
      },
    });
    console.log(`Created stage: ${stage.title}`);
  }

  // 2. Seed Achievements
  const achievements = [
    // Progress
    { slug: 'first-steps', name: 'First Steps', description: 'Complete Week 1', category: 'PROGRESS', rarity: 'COMMON', icon: '👣', xpReward: 50, criteria: { type: 'week_complete', count: 1 } },
    { slug: 'month-master', name: 'Month Master', description: 'Complete any month 100%', category: 'PROGRESS', rarity: 'RARE', icon: '📅', xpReward: 200, criteria: { type: 'month_complete', count: 1 } },
    { slug: 'stage-champion', name: 'Stage Champion', description: 'Complete any stage 100%', category: 'PROGRESS', rarity: 'EPIC', icon: '🏆', xpReward: 500, criteria: { type: 'stage_complete', count: 1 } },
    { slug: 'graduation', name: 'Graduation', description: 'Complete all 4 stages', category: 'PROGRESS', rarity: 'LEGENDARY', icon: '🎓', xpReward: 2000, criteria: { type: 'all_stages_complete', count: 1 } },
    
    // Streak
    { slug: 'consistent-learner', name: 'Consistent Learner', description: '7 day streak', category: 'STREAK', rarity: 'COMMON', icon: '🔥', xpReward: 100, criteria: { type: 'streak_days', count: 7 } },
    { slug: 'dedicated-student', name: 'Dedicated Student', description: '30 day streak', category: 'STREAK', rarity: 'RARE', icon: '🗓️', xpReward: 500, criteria: { type: 'streak_days', count: 30 } },
    { slug: 'unstoppable', name: 'Unstoppable', description: '100 day streak', category: 'STREAK', rarity: 'EPIC', icon: '🚀', xpReward: 1500, criteria: { type: 'streak_days', count: 100 } },
    { slug: 'legend', name: 'Legend', description: '365 day streak', category: 'STREAK', rarity: 'LEGENDARY', icon: '👑', xpReward: 5000, criteria: { type: 'streak_days', count: 365 } },

    // Skill
    { slug: 'pointer-master', name: 'Pointer Master', description: 'Master all pointer concepts', category: 'SKILL', rarity: 'RARE', icon: '👉', xpReward: 300, criteria: { type: 'module_complete', id: 'pointers' } },
    { slug: 'oop-guru', name: 'OOP Guru', description: 'Complete OOP module 100%', category: 'SKILL', rarity: 'RARE', icon: '📦', xpReward: 300, criteria: { type: 'module_complete', id: 'oop' } },
    { slug: 'ds-hero', name: 'Data Structures Hero', description: 'Implement all DS from scratch', category: 'SKILL', rarity: 'EPIC', icon: '🌳', xpReward: 800, criteria: { type: 'ds_implementations', count: 10 } },
    { slug: 'algo-ninja', name: 'Algorithm Ninja', description: 'Solve 100 DSA problems', category: 'SKILL', rarity: 'EPIC', icon: '⚔️', xpReward: 1000, criteria: { type: 'problems_solved', count: 100 } },
    { slug: 'polyglot', name: 'Polyglot', description: 'Master 500 vocabulary words', category: 'SKILL', rarity: 'EPIC', icon: '🗣️', xpReward: 1000, criteria: { type: 'vocab_mastered', count: 500 } },

    // Project
    { slug: 'builder', name: 'Builder', description: 'Complete first project', category: 'PROJECT', rarity: 'COMMON', icon: '🔨', xpReward: 150, criteria: { type: 'projects_completed', count: 1 } },
    { slug: 'craftsman', name: 'Craftsman', description: 'Complete 5 projects', category: 'PROJECT', rarity: 'RARE', icon: '⚒️', xpReward: 600, criteria: { type: 'projects_completed', count: 5 } },
    { slug: 'architect', name: 'Architect', description: 'Complete 10 projects', category: 'PROJECT', rarity: 'EPIC', icon: '🏛️', xpReward: 1500, criteria: { type: 'projects_completed', count: 10 } },
    { slug: 'perfectionist', name: 'Perfectionist', description: 'Score 100% on any project', category: 'PROJECT', rarity: 'LEGENDARY', icon: '✨', xpReward: 1000, criteria: { type: 'project_score', value: 100 } },

    // Social/Special
    { slug: 'early-bird', name: 'Early Bird', description: 'Join in first month', category: 'SOCIAL', rarity: 'RARE', icon: '🐦', xpReward: 100, criteria: { type: 'join_date', before: '2024-02-01' } },
    { slug: 'night-owl', name: 'Night Owl', description: 'Study session after midnight', category: 'SOCIAL', rarity: 'COMMON', icon: '🦉', xpReward: 50, criteria: { type: 'study_time', after: '00:00', before: '04:00' } },
    { slug: 'speed-demon', name: 'Speed Demon', description: 'Complete week in 3 days', category: 'SOCIAL', rarity: 'RARE', icon: '⚡', xpReward: 300, criteria: { type: 'week_speed', days: 3 } },
    { slug: 'overachiever', name: 'Overachiever', description: '150% weekly goal 4 weeks in row', category: 'SOCIAL', rarity: 'EPIC', icon: '🌟', xpReward: 1000, criteria: { type: 'goal_exceeded', count: 4 } },
  ];

  for (const ach of achievements) {
    await prisma.achievement.upsert({
      where: { slug: ach.slug },
      update: {},
      create: ach,
    });
  }
  console.log('Seeded achievements');

  // 3. Seed Vocabulary
  const vocabularies = [
    {
      term: 'Algorithm',
      pronunciation: '/ˈæl.ɡə.rɪ.ðəm/',
      definition: 'A set of instructions for solving a problem or accomplishing a task.',
      example: 'The search algorithm sorts the results by relevance.',
      translation: 'Thuật toán',
      category: 'Computer Science',
    },
    {
      term: 'Variable',
      pronunciation: '/ˈveə.ri.ə.bəl/',
      definition: 'A data item that may take on more than one value during the runtime of a program.',
      example: 'You should declare the variable before using it.',
      translation: 'Biến',
      category: 'Programming',
    },
    {
      term: 'Database',
      pronunciation: '/ˈdeɪ.tə.beɪs/',
      definition: 'A structured set of data held in a computer, especially one that is accessible in various ways.',
      example: 'We need to migrate the database to a new server.',
      translation: 'Cơ sở dữ liệu',
      category: 'Data',
    },
    {
      term: 'Frontend',
      pronunciation: '/ˈfrʌnt.end/',
      definition: 'The part of a website or application that the user interacts with directly.',
      example: 'React is a popular library for frontend development.',
      translation: 'Giao diện người dùng (Frontend)',
      category: 'Web Development',
    },
    {
      term: 'Backend',
      pronunciation: '/ˈbæk.end/',
      definition: 'The part of a computer system or application that is not directly accessed by the user, typically responsible for storing and manipulating data.',
      example: 'Node.js is often used for backend services.',
      translation: 'Hậu cần (Backend)',
      category: 'Web Development',
    },
    {
      term: 'Recursion',
      pronunciation: '/rɪˈkɜː.ʃən/',
      definition: 'The process of defining a function or calculating a number by the repeated application of an algorithm.',
      example: 'Recursion is often used to traverse tree structures.',
      translation: 'Đệ quy',
      category: 'Computer Science',
    },
    {
      term: 'Compiler',
      pronunciation: '/kəmˈpaɪ.lər/',
      definition: 'A program that converts instructions into a machine-code or lower-level form so that they can be read and executed by a computer.',
      example: 'The C++ compiler optimizes the code for better performance.',
      translation: 'Trình biên dịch',
      category: 'Programming',
    },
    {
      term: 'Latency',
      pronunciation: '/ˈleɪ.tən.si/',
      definition: 'The delay before a transfer of data begins following an instruction for its transfer.',
      example: 'High latency can cause lag in online games.',
      translation: 'Độ trễ',
      category: 'Networking',
    },
    {
      term: 'Bandwidth',
      pronunciation: '/ˈbænd.wɪtθ/',
      definition: 'The maximum amount of data that can travel through a communication path in a given time, usually measured in seconds.',
      example: 'Video streaming requires high bandwidth.',
      translation: 'Băng thông',
      category: 'Networking',
    },
    {
      term: 'Authentication',
      pronunciation: '/ɔːˌθen.tɪˈkeɪ.ʃən/',
      definition: 'The process or action of verifying the identity of a user or process.',
      example: 'Two-factor authentication adds an extra layer of security.',
      translation: 'Xác thực',
      category: 'Security',
    }
  ];

  for (const vocab of vocabularies) {
    // Check if exists to avoid duplicates
    const exists = await prisma.vocabulary.findFirst({ where: { term: vocab.term } });
    if (!exists) {
      await prisma.vocabulary.create({
        data: vocab,
      });
    }
  }
  console.log('Seeded vocabulary');

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
