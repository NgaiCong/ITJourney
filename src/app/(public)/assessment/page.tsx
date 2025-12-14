'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, ChevronRight, RotateCcw, Target, CheckCircle } from 'lucide-react';
import SpotlightCard from '@/components/ui/SpotlightCard';
import { StorageService } from '@/lib/storage';

const questions = [
    {
        id: 1,
        category: 'Math for AI',
        question: 'Phép tính nào sau đây KHÔNG giữ nguyên số chiều (dimensions) của ma trận/vector biến đổi?',
        options: [
            'Rotation (Xoay)',
            'Scaling (Co giãn)',
            'Dot Product (Tích vô hướng)',
            'Translation (Tịnh tiến)'
        ],
        correct: 2 // Dot product 2 vector trả về 1 scalar (giảm chiều)
    },
    {
        id: 2,
        category: 'Math for AI',
        question: 'Cosine Similarity giữa hai vector A và B đo lường điều gì?',
        options: [
            'Khoảng cách Euclid giữa hai điểm',
            'Góc giữa hai vector (hướng)',
            'Độ lớn (magnitude) của vector hiệu',
            'Diện tích hình bình hành tạo bởi hai vector'
        ],
        correct: 1
    },
    {
        id: 3,
        category: 'System Foundation',
        question: 'Tại sao Heap Memory chậm hơn Stack Memory?',
        options: [
            'Vì Heap nhỏ hơn Stack',
            'Vì Heap cần cơ chế tìm kiếm vùng nhớ trống (allocation) và garbage collection',
            'Vì Heap chỉ lưu trữ số nguyên',
            'Không, Heap nhanh hơn Stack'
        ],
        correct: 1
    },
    {
        id: 4,
        category: 'System Foundation',
        question: 'Trong kiến trúc Database hiện đại, cấu trúc dữ liệu nào tối ưu nhất cho Vector Search?',
        options: [
            'B-Tree',
            'Hash Table',
            'HNSW (Hierarchical Navigable Small World)',
            'Linked List'
        ],
        correct: 2
    },
    {
        id: 5,
        category: 'AI Engineering',
        question: 'Giới hạn "Context Window" của LLM ảnh hưởng đến điều gì nhất?',
        options: [
            'Tốc độ sinh token',
            'Dung lượng mô hình (Model size)',
            'Độ chính xác của từng từ',
            'Lượng thông tin đầu vào (input) mà mô hình có thể "nhớ" và xử lý cùng lúc'
        ],
        correct: 3
    },
    {
        id: 6,
        category: 'AI Engineering',
        question: 'Embedding là gì trong bối cảnh NLP?',
        options: [
            'Một file text nén',
            'Biểu diễn dữ liệu dưới dạng vector số thực trong không gian n-chiều',
            'Một plugin gắn vào trình duyệt',
            'Mã hóa ký tự sang ASCII'
        ],
        correct: 1
    },
    {
        id: 7,
        category: 'System Design',
        question: 'Để xử lý 100k request/giây cho AI API, kỹ thuật nào sau đây quan trọng nhất?',
        options: [
            'Dùng database lớn hơn',
            'Asynchronous Processing (Queue) & Rate Limiting',
            'Viết lại bằng Assembly',
            'Tăng RAM cho server'
        ],
        correct: 1
    },
    {
        id: 8,
        category: 'Modern Web',
        question: 'Server Components (RSC) trong React/Next.js giúp giải quyết vấn đề gì?',
        options: [
            'Làm đẹp UI',
            'Giảm Javascript bundle size gửi xuống client & bảo mật logic server',
            'Tăng tốc độ gõ phím',
            'Thay thế hoàn toàn HTML'
        ],
        correct: 1
    },
    {
        id: 9,
        category: 'Vibe Coding',
        question: 'Trong kỷ nguyên AI-Native, kỹ năng nào trở nên quan trọng hơn việc "thuộc cú pháp code"?',
        options: [
            'Gõ phím 10 ngón',
            'System Architecture Design & Prompt Engineering',
            'Ghi nhớ thư viện chuẩn',
            'Viết CSS thủ công'
        ],
        correct: 1
    },
    {
        id: 10,
        category: 'Logic',
        question: 'Nếu A implies B (A -> B), điều nào sau đây tương đương logic?',
        options: [
            'B implies A',
            'Not A implies Not B',
            'Not B implies Not A (Contrapositive)',
            'A and B are true'
        ],
        correct: 2
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
                                    <li>✓ Toán cho AI & Linear Algebra (2 câu)</li>
                                    <li>✓ System Design & Database (3 câu)</li>
                                    <li>✓ AI Engineering & LLM (3 câu)</li>
                                    <li>✓ Web & Vibe Coding (2 câu)</li>
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
                                {['Math for AI', 'System Foundation', 'AI Engineering', 'System Design', 'Modern Web', 'Vibe Coding', 'Logic'].map((cat) => {
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
