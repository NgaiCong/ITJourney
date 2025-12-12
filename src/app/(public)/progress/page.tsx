'use client';

import React, { useEffect, useState } from 'react';
import {
    Flame, Trophy, Target, Clock, BookOpen,
    CheckCircle, Circle, ChevronRight, Calendar,
    TrendingUp, Star, Zap
} from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import { StorageService, UserProfile, TaskProgress } from '@/lib/storage';

const phases = [
    { id: 1, name: 'Giai đoạn 1: C++ Nền tảng', progress: 0, total: 100 },
    { id: 2, name: 'Giai đoạn 2: DSA', progress: 0, total: 100, locked: true },
    { id: 3, name: 'Giai đoạn 3: Python', progress: 0, total: 100, locked: true },
    { id: 4, name: 'Giai đoạn 4: Portfolio', progress: 0, total: 100, locked: true },
];

const defaultTasks = [
    { id: 1, text: 'Hoàn thành bài đánh giá năng lực', link: '/assessment' },
    { id: 2, text: 'Xem lộ trình 12 tháng', link: '/roadmap' },
    { id: 3, text: 'Học 10 từ vựng IT mới', link: '/english' },
    { id: 4, text: 'Đọc Chapter 0 trên learncpp.com', link: '/resources' },
];

const achievements = [
    { id: 1, name: 'First Steps', description: 'Hoàn thành bài đánh giá', icon: '🎯', earned: false },
    { id: 2, name: 'Streak 7', description: '7 ngày liên tiếp', icon: '🔥', earned: false },
    { id: 3, name: 'Vocabulary 100', description: 'Học 100 từ vựng', icon: '📚', earned: false },
    { id: 4, name: 'AI Detox Week', description: '7 ngày không AI', icon: '🧠', earned: false },
];

const weekDays = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];

export default function ProgressPage() {
    const [user, setUser] = useState<UserProfile | null>(null);
    const [tasks, setTasks] = useState<TaskProgress[]>([]);

    useEffect(() => {
        const storedUser = StorageService.getUser();
        setUser(storedUser);
        setTasks(StorageService.getTasks());
    }, []);

    const handleToggleTask = (id: number) => {
        StorageService.toggleTask(id);
        setTasks(StorageService.getTasks());
    };

    // Dynamic Phases based on Level
    const getUnlockedPhases = (level: string) => {
        const levels = ['Newbie', 'Beginner', 'Intermediate', 'Advanced', 'Expert'];
        const userLevelIdx = levels.indexOf(level) !== -1 ? levels.indexOf(level) : 0;

        return phases.map(p => ({
            ...p,
            locked: p.id > (userLevelIdx < 1 ? 1 : userLevelIdx) // Beginner(1) -> Phase 1. Int(2) -> Phase 2.
        }));
    };

    const dynamicPhases = user ? getUnlockedPhases(user.level) : phases;

    // Derived state
    const completedTaskCount = tasks.filter(t => t.completed).length;
    const taskList = defaultTasks.map(dt => {
        const progress = tasks.find(t => t.id === dt.id);
        return { ...dt, completed: progress?.completed || false };
    });

    // Check if Achievement 1 is earned (Assessment task completed)
    const achievementsWithStatus = achievements.map(ach => {
        if (ach.id === 1 && tasks.find(t => t.id === 1)?.completed) {
            return { ...ach, earned: true };
        }
        return ach;
    });

    const earnedAchievements = achievementsWithStatus.filter(a => a.earned).length;

    if (!user) {
        return (
            <main className="min-h-screen bg-neutral-950 text-white pt-32 pb-16 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-3xl font-bold mb-4">Chưa đăng nhập</h1>
                    <p className="text-neutral-400 mb-8">Vui lòng đăng nhập để theo dõi tiến độ.</p>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-neutral-950 text-white pt-24 pb-16">
            <div className="container mx-auto px-6 max-w-5xl">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold mb-1">👋 Xin chào, {user.name}!</h1>
                        <p className="text-neutral-400">Hãy bắt đầu hành trình học tập của bạn</p>
                    </div>
                    <div className="flex items-center gap-4 mt-4 md:mt-0">
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/30">
                            <Flame className="w-5 h-5 text-orange-400" />
                            <span className="font-bold text-orange-400">{user.streak}</span>
                            <span className="text-xs text-neutral-400">ngày</span>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/30">
                            <Trophy className="w-5 h-5 text-purple-400" />
                            <span className="text-sm text-purple-400">Lv.{user.level}</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Quick Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <GlassCard className="p-4">
                                <Clock className="w-5 h-5 text-neutral-400 mb-2" />
                                <p className="text-2xl font-bold">2.5h</p>
                                <p className="text-xs text-neutral-500">Tổng thời gian</p>
                            </GlassCard>
                            <GlassCard className="p-4">
                                <Target className="w-5 h-5 text-neutral-400 mb-2" />
                                <p className="text-2xl font-bold">1.2h</p>
                                <p className="text-xs text-neutral-500">Tuần này / 15h</p>
                            </GlassCard>
                            <GlassCard className="p-4">
                                <CheckCircle className="w-5 h-5 text-neutral-400 mb-2" />
                                <p className="text-2xl font-bold">{completedTaskCount}/{defaultTasks.length}</p>
                                <p className="text-xs text-neutral-500">Nhiệm vụ hôm nay</p>
                            </GlassCard>
                            <GlassCard className="p-4">
                                <Star className="w-5 h-5 text-neutral-400 mb-2" />
                                <p className="text-2xl font-bold">{earnedAchievements}</p>
                                <p className="text-xs text-neutral-500">Thành tựu</p>
                            </GlassCard>
                        </div>

                        {/* Weekly Activity */}
                        <GlassCard>
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="font-bold flex items-center gap-2">
                                    <Calendar className="w-5 h-5 text-neutral-400" />
                                    Hoạt động tuần này
                                </h2>
                            </div>
                            <div className="flex justify-between gap-2">
                                {weekDays.map((day, idx) => (
                                    <div key={day} className="flex-1 text-center">
                                        <div className="h-20 bg-white/5 rounded-lg mb-2 relative overflow-hidden">
                                            <div
                                                className="absolute bottom-0 left-0 right-0 bg-white/20 transition-all"
                                                style={{ height: idx === 6 ? '30%' : '10%' }}
                                            />
                                        </div>
                                        <span className="text-xs text-neutral-500">{day}</span>
                                    </div>
                                ))}
                            </div>
                        </GlassCard>

                        {/* Progress Overview */}
                        <GlassCard>
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="font-bold flex items-center gap-2">
                                    <TrendingUp className="w-5 h-5 text-neutral-400" />
                                    Tiến độ Lộ trình
                                </h2>
                                <a href="/roadmap" className="text-sm text-neutral-400 hover:text-white flex items-center gap-1">
                                    Xem chi tiết <ChevronRight className="w-4 h-4" />
                                </a>
                            </div>
                            <div className="space-y-4">
                                {dynamicPhases.map((phase) => (
                                    <div key={phase.id} className={phase.locked ? 'opacity-50' : ''}>
                                        <div className="flex justify-between text-sm mb-1">
                                            <span className="text-neutral-300 flex items-center gap-2">
                                                {phase.locked ? <span className="text-neutral-500">🔒</span> : null}
                                                {phase.name}
                                            </span>
                                            <span className="text-neutral-500">{phase.progress}%</span>
                                        </div>
                                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-white transition-all"
                                                style={{ width: `${phase.progress}%` }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </GlassCard>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Today's Tasks */}
                        <GlassCard>
                            <h2 className="font-bold flex items-center gap-2 mb-4">
                                <Zap className="w-5 h-5 text-yellow-400" />
                                Nhiệm vụ hôm nay
                            </h2>
                            <div className="space-y-3">
                                {taskList.map((task) => (
                                    <div
                                        key={task.id}
                                        className="flex items-start gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
                                        onClick={() => handleToggleTask(task.id)}
                                    >
                                        {task.completed ? (
                                            <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                                        ) : (
                                            <Circle className="w-5 h-5 text-neutral-500 flex-shrink-0 mt-0.5" />
                                        )}
                                        <div className="flex-1">
                                            <p className={`text-sm ${task.completed ? 'text-neutral-500 line-through' : 'text-neutral-300'}`}>
                                                {task.text}
                                            </p>
                                            <a
                                                href={task.link}
                                                className="text-xs text-neutral-500 hover:text-white"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                Đi đến →
                                            </a>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </GlassCard>

                        {/* Achievements */}
                        <GlassCard>
                            <h2 className="font-bold flex items-center gap-2 mb-4">
                                <Trophy className="w-5 h-5 text-purple-400" />
                                Thành tựu
                            </h2>
                            <div className="space-y-3">
                                {achievementsWithStatus.map((ach) => (
                                    <div
                                        key={ach.id}
                                        className={`flex items-center gap-3 p-3 rounded-lg ${ach.earned
                                                ? 'bg-purple-500/10 border border-purple-500/30'
                                                : 'bg-white/5 opacity-50'
                                            }`}
                                    >
                                        <span className="text-2xl">{ach.icon}</span>
                                        <div>
                                            <p className="text-sm font-medium text-white">{ach.name}</p>
                                            <p className="text-xs text-neutral-500">{ach.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <p className="text-center text-neutral-500 text-xs mt-4">
                                {earnedAchievements}/50 thành tựu đã mở khóa
                            </p>
                        </GlassCard>

                        {/* CTA */}
                        <a
                            href="/roadmap"
                            className="block p-6 rounded-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 hover:border-white/20 transition-colors text-center"
                        >
                            <BookOpen className="w-8 h-8 text-white/80 mx-auto mb-3" />
                            <p className="font-bold text-white mb-1">Tiếp tục học</p>
                            <p className="text-xs text-neutral-400">Bắt đầu Giai đoạn 1</p>
                        </a>
                    </div>
                </div>
            </div>
        </main>
    );
}
