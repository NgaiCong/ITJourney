'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, ChevronRight, RotateCcw, Target, CheckCircle } from 'lucide-react';
import SpotlightCard from '@/components/ui/SpotlightCard';
import { StorageService } from '@/lib/storage';

const questions = [
    {
        id: 1,
        category: 'C++ Cơ bản',
        question: 'Con trỏ (pointer) trong C++ dùng để làm gì?',
        options: [
            'Lưu trữ địa chỉ bộ nhớ của một biến khác',
            'Tạo vòng lặp vô hạn',
            'In ra màn hình',
            'Không biết'
        ],
        correct: 0
    },
    {
        id: 2,
        category: 'C++ Cơ bản',
        question: 'Sự khác biệt giữa Stack và Heap là gì?',
        options: [
            'Stack nhanh hơn, tự động giải phóng. Heap chậm hơn, cần giải phóng thủ công.',
            'Không có sự khác biệt',
            'Heap nhanh hơn Stack',
            'Không biết'
        ],
        correct: 0
    },
    {
        id: 3,
        category: 'DSA',
        question: 'Linked List khác Array như thế nào?',
        options: [
            'Linked List lưu trữ phân tán, Array lưu trữ liên tiếp',
            'Linked List nhanh hơn trong mọi trường hợp',
            'Array không thể lưu số nguyên',
            'Không biết'
        ],
        correct: 0
    },
    {
        id: 4,
        category: 'DSA',
        question: 'Big O của Binary Search là gì?',
        options: [
            'O(n)',
            'O(log n)',
            'O(n²)',
            'Không biết'
        ],
        correct: 1
    },
    {
        id: 5,
        category: 'DSA',
        question: 'BFS và DFS là thuật toán dùng cho cấu trúc dữ liệu nào?',
        options: [
            'Array',
            'Linked List',
            'Graph/Tree',
            'Không biết'
        ],
        correct: 2
    },
    {
        id: 6,
        category: 'Tư duy Logic',
        question: 'Với một mảng 1000 phần tử đã sắp xếp, cần bao nhiêu bước tối đa để tìm một phần tử (Binary Search)?',
        options: [
            '1000 bước',
            '500 bước',
            'Khoảng 10 bước',
            'Không biết'
        ],
        correct: 2
    },
    {
        id: 7,
        category: 'Tư duy Logic',
        question: 'Đệ quy (Recursion) là gì?',
        options: [
            'Hàm gọi chính nó với bài toán nhỏ hơn',
            'Vòng lặp vô hạn',
            'Biến toàn cục',
            'Không biết'
        ],
        correct: 0
    },
    {
        id: 8,
        category: 'Tiếng Anh IT',
        question: '"Deploy" nghĩa là gì?',
        options: [
            'Xóa code',
            'Triển khai ứng dụng lên server',
            'Viết comment',
            'Không biết'
        ],
        correct: 1
    },
    {
        id: 9,
        category: 'Tiếng Anh IT',
        question: '"Latency" trong hệ thống nghĩa là gì?',
        options: [
            'Dung lượng bộ nhớ',
            'Độ trễ',
            'Tốc độ CPU',
            'Không biết'
        ],
        correct: 1
    },
    {
        id: 10,
        category: 'Tiếng Anh IT',
        question: '"Technical Debt" là gì?',
        options: [
            'Tiền lương IT',
            'Nợ kỹ thuật - code tạm bợ cần sửa sau',
            'Vay tiền mua laptop',
            'Không biết'
        ],
        correct: 1
    }
];

function getLevel(score: number): { level: string; description: string; startPhase: number } {
    if (score <= 2) {
        return {
            level: 'Beginner',
            description: 'Bạn nên bắt đầu từ Giai đoạn 1 - học lại C++ từ đầu.',
            startPhase: 1
        };
    } else if (score <= 5) {
        return {
            level: 'Intermediate',
            description: 'Bạn có nền tảng cơ bản. Ôn lại C++ nhanh rồi chuyển sang DSA.',
            startPhase: 1
        };
    } else if (score <= 8) {
        return {
            level: 'Advanced',
            description: 'Bạn đã có kiến thức tốt. Tập trung vào DSA và Python.',
            startPhase: 2
        };
    } else {
        return {
            level: 'Expert',
            description: 'Xuất sắc! Bạn có thể bắt đầu từ Python và Portfolio.',
            startPhase: 3
        };
    }
}

export default function AssessmentPage() {
    const [started, setStarted] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState<number[]>([]);
    const [showResult, setShowResult] = useState(false);


    // ... (previous imports)

    // ...

    const handleAnswer = (optionIndex: number) => {
        const newAnswers = [...answers, optionIndex];
        setAnswers(newAnswers);

        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            // Quiz completed
            const finalScore = newAnswers.reduce((acc, ans, idx) => {
                return acc + (ans === questions[idx].correct ? 1 : 0);
            }, 0) + (optionIndex === questions[questions.length - 1].correct ? 1 : 0);

            const resultData = getLevel(finalScore);

            StorageService.saveQuizResult({
                score: finalScore,
                level: resultData.level,
                date: new Date().toISOString(),
                details: {} // Simplified for now
            });

            setShowResult(true);
        }
    };


    const score = answers.reduce((acc, answer, idx) => {
        return acc + (answer === questions[idx].correct ? 1 : 0);
    }, 0);

    const result = getLevel(score);

    const resetQuiz = () => {
        setStarted(false);
        setCurrentQuestion(0);
        setAnswers([]);
        setShowResult(false);
    };

    return (
        <main className="min-h-screen bg-neutral-950 text-white pt-24 pb-16">
            <div className="container mx-auto px-6 max-w-2xl">
                <AnimatePresence mode="wait">
                    {!started ? (
                        <motion.div
                            key="intro"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="text-center"
                        >
                            <Brain className="w-16 h-16 text-white/80 mx-auto mb-8" />
                            <h1 className="text-4xl font-bold mb-4">Đánh Giá Năng Lực</h1>
                            <p className="text-neutral-400 mb-8 max-w-md mx-auto">
                                Hoàn thành bài test 10 câu hỏi (~5 phút) để xác định điểm bắt đầu phù hợp cho bạn.
                            </p>

                            <div className="grid grid-cols-2 gap-4 mb-8 text-left max-w-sm mx-auto">
                                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                                    <p className="text-2xl font-bold text-white">10</p>
                                    <p className="text-xs text-neutral-400">Câu hỏi</p>
                                </div>
                                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                                    <p className="text-2xl font-bold text-white">~5</p>
                                    <p className="text-xs text-neutral-400">Phút</p>
                                </div>
                            </div>

                            <div className="text-left max-w-sm mx-auto mb-8">
                                <p className="text-sm text-neutral-500 mb-2">Bao gồm:</p>
                                <ul className="space-y-2 text-sm text-neutral-400">
                                    <li>✓ C++ cơ bản (2 câu)</li>
                                    <li>✓ DSA (3 câu)</li>
                                    <li>✓ Tư duy Logic (2 câu)</li>
                                    <li>✓ Tiếng Anh IT (3 câu)</li>
                                </ul>
                            </div>

                            <button
                                onClick={() => setStarted(true)}
                                className="px-8 py-3 bg-white text-neutral-950 font-semibold rounded-full hover:bg-neutral-200 transition-colors"
                            >
                                Bắt Đầu Test
                            </button>
                        </motion.div>
                    ) : showResult ? (
                        <motion.div
                            key="result"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="text-center"
                        >
                            <CheckCircle className="w-16 h-16 text-emerald-400 mx-auto mb-8" />
                            <h1 className="text-4xl font-bold mb-2">Kết Quả</h1>
                            <p className="text-neutral-400 mb-8">Bạn đã hoàn thành bài đánh giá</p>

                            <SpotlightCard className="!p-8 !bg-[#0a0a0a] mb-8">
                                <div className="text-center">
                                    <p className="text-6xl font-bold text-white mb-2">{score}/10</p>
                                    <p className="text-xl font-medium text-neutral-300 mb-4">Level: {result.level}</p>
                                    <p className="text-neutral-400">{result.description}</p>
                                </div>
                            </SpotlightCard>

                            <div className="space-y-3 text-left mb-8">
                                <p className="text-sm text-neutral-500">Chi tiết theo lĩnh vực:</p>
                                {['C++ Cơ bản', 'DSA', 'Tư duy Logic', 'Tiếng Anh IT'].map((cat) => {
                                    const catQuestions = questions.filter(q => q.category === cat);
                                    const catScore = catQuestions.reduce((acc, q, idx) => {
                                        const qIdx = questions.findIndex(qq => qq.id === q.id);
                                        return acc + (answers[qIdx] === q.correct ? 1 : 0);
                                    }, 0);
                                    const percentage = (catScore / catQuestions.length) * 100;

                                    return (
                                        <div key={cat} className="p-3 rounded-lg bg-white/5">
                                            <div className="flex justify-between text-sm mb-1">
                                                <span className="text-neutral-300">{cat}</span>
                                                <span className="text-neutral-400">{catScore}/{catQuestions.length}</span>
                                            </div>
                                            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-white transition-all"
                                                    style={{ width: `${percentage}%` }}
                                                />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="flex gap-4 justify-center">
                                <button
                                    onClick={resetQuiz}
                                    className="px-6 py-3 border border-white/20 text-white font-medium rounded-full hover:bg-white/5 transition-colors flex items-center gap-2"
                                >
                                    <RotateCcw className="w-4 h-4" />
                                    Làm lại
                                </button>
                                <a
                                    href="/roadmap"
                                    className="px-6 py-3 bg-white text-neutral-950 font-semibold rounded-full hover:bg-neutral-200 transition-colors flex items-center gap-2"
                                >
                                    Xem Lộ Trình
                                    <ChevronRight className="w-4 h-4" />
                                </a>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key={`question-${currentQuestion}`}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                        >
                            {/* Progress */}
                            <div className="mb-8">
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="text-neutral-400">Câu {currentQuestion + 1}/{questions.length}</span>
                                    <span className="text-neutral-500">{questions[currentQuestion].category}</span>
                                </div>
                                <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                                    <motion.div
                                        className="h-full bg-white"
                                        initial={{ width: `${(currentQuestion / questions.length) * 100}%` }}
                                        animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                                    />
                                </div>
                            </div>

                            {/* Question */}
                            <h2 className="text-2xl font-bold text-white mb-8">
                                {questions[currentQuestion].question}
                            </h2>

                            {/* Options */}
                            <div className="space-y-3">
                                {questions[currentQuestion].options.map((option, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => handleAnswer(idx)}
                                        className="w-full p-4 text-left rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all text-neutral-300 hover:text-white"
                                    >
                                        <span className="text-white/40 mr-3">{String.fromCharCode(65 + idx)}.</span>
                                        {option}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </main>
    );
}
