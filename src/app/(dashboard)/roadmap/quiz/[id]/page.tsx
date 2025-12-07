"use client";

import { useState } from "react";
import { Loader2, CheckCircle, XCircle, ArrowRight } from "lucide-react";

// Mock data for quiz
const mockQuiz = {
  id: "quiz-1",
  title: "Kiểm tra kiến thức React Hooks",
  questions: [
    {
      id: "q1",
      text: "Hook nào được sử dụng để quản lý state trong functional component?",
      type: "MULTIPLE_CHOICE",
      options: ["useEffect", "useState", "useContext", "useReducer"],
      correctAnswer: "useState"
    },
    {
      id: "q2",
      text: "useEffect chạy sau mỗi lần render theo mặc định?",
      type: "TRUE_FALSE",
      options: ["True", "False"],
      correctAnswer: "True"
    }
  ]
};

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const handleSelectOption = (option: string) => {
    if (submitted) return;
    setAnswers({
      ...answers,
      [mockQuiz.questions[currentQuestion].id]: option
    });
  };

  const handleSubmit = () => {
    let correctCount = 0;
    mockQuiz.questions.forEach(q => {
      if (answers[q.id] === q.correctAnswer) {
        correctCount++;
      }
    });
    setScore((correctCount / mockQuiz.questions.length) * 100);
    setSubmitted(true);
  };

  const question = mockQuiz.questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-blue-600 p-6 text-white">
          <h1 className="text-xl font-bold">{mockQuiz.title}</h1>
          <div className="flex justify-between mt-2 text-blue-100 text-sm">
            <span>Câu hỏi {currentQuestion + 1}/{mockQuiz.questions.length}</span>
            <span>Thời gian: --:--</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          {!submitted ? (
            <>
              <h2 className="text-lg font-medium text-gray-800 mb-6">
                {question.text}
              </h2>

              <div className="space-y-3">
                {question.options.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleSelectOption(option)}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all
                      ${answers[question.id] === option 
                        ? 'border-blue-500 bg-blue-50 text-blue-700' 
                        : 'border-gray-100 hover:border-gray-200 hover:bg-gray-50'
                      }
                    `}
                  >
                    {option}
                  </button>
                ))}
              </div>

              <div className="mt-8 flex justify-between">
                <button
                  onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                  disabled={currentQuestion === 0}
                  className="px-6 py-2 text-gray-500 hover:bg-gray-100 rounded-lg disabled:opacity-50"
                >
                  Quay lại
                </button>
                
                {currentQuestion < mockQuiz.questions.length - 1 ? (
                  <button
                    onClick={() => setCurrentQuestion(currentQuestion + 1)}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Tiếp theo
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-bold"
                  >
                    Nộp bài
                  </button>
                )}
              </div>
            </>
          ) : (
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl font-bold text-blue-600">{Math.round(score)}%</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {score >= 70 ? "Chúc mừng! Bạn đã vượt qua" : "Hãy thử lại nhé"}
              </h2>
              <p className="text-gray-500 mb-8">
                Bạn đã trả lời đúng {Math.round((score / 100) * mockQuiz.questions.length)}/{mockQuiz.questions.length} câu hỏi.
              </p>
              
              <button 
                onClick={() => window.location.href = '/roadmap'}
                className="px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 inline-flex items-center gap-2"
              >
                Tiếp tục học <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
