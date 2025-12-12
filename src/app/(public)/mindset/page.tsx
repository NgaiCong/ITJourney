import React from 'react';
import Navigation from '@/components/common/Navigation';

export default function MindsetPage() {
    return (
        <main className="min-h-screen bg-neutral-950 text-white pt-24">
            <div className="container mx-auto px-6">
                <h1 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-rose-400">
                    Tái Lập Trình Tư Duy
                </h1>
                <div className="prose prose-invert max-w-none">
                    <p className="text-xl text-neutral-400 mb-8">
                        "Thành công trong ngành kỹ thuật không bắt đầu bằng dòng code, nó bắt đầu bằng cách bạn nhìn nhận vấn đề."
                    </p>

                    <section className="mb-12">
                        <h2 className="text-2xl font-bold mb-4">1. Growth Mindset (Tư duy Phát triển)</h2>
                        <p className="mb-4">
                            Đừng nói "Tôi dốt toán". Hãy nói "Tôi chưa giỏi toán". Sự khác biệt nằm ở chữ <strong>chưa</strong>.
                            Trí thông minh không phải là cố định. Khoa học thần kinh chứng minh não bộ có thể thay đổi liên tục.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-bold mb-4">2. Zero AI Generation</h2>
                        <div className="bg-red-500/10 border border-red-500/20 p-6 rounded-lg">
                            <h3 className="text-lg font-bold text-red-400 mb-2">Quy tắc tối thượng:</h3>
                            <p>Trong 6 tháng đầu tiên, TUYỆT ĐỐI KHÔNG dùng AI để viết code hộ. Bạn chỉ được dùng AI để:</p>
                            <ul className="list-disc ml-6 mt-2">
                                <li>Giải thích khái niệm khó</li>
                                <li>Gợi ý lộ trình</li>
                                <li>Review code ĐÃ VIẾT xong</li>
                            </ul>
                        </div>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-bold mb-4">3. Embracing the Struggle</h2>
                        <p>
                            Lỗi biên dịch (Error) không phải là thất bại. Nó là manh mối. Mỗi khi bạn gặp lỗi đỏ lòm, đó là cơ hội học tập quý giá nhất.
                            Đừng nản. Debugging chính là lập trình.
                        </p>
                    </section>
                </div>
            </div>
        </main>
    );
}
