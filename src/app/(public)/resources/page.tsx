'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Search, BookOpen, Code, Video, Brain, Wrench, Book, Languages, GitBranch, X, Target, Sparkles, CheckCircle } from 'lucide-react';
import GlassSurface from '@/components/ui/GlassSurface';
import BlurText from '@/components/ui/BlurText';

type ResourceType = 'all' | 'docs' | 'practice' | 'video' | 'mental' | 'tool' | 'book' | 'lang' | 'repo';

interface Resource {
    name: string;
    description: string;
    type: ResourceType;
    phase: string;
    url?: string;
    whatIs: string;
    purpose: string;
    features: string[];
}

const resources: Resource[] = [
    // The Foundation
    {
        name: 'LearnCPP.com',
        description: 'Tài liệu C++ chuẩn mực - Dễ hiểu và chi tiết',
        type: 'docs',
        phase: 'The Foundation',
        url: 'https://learncpp.com',
        whatIs: 'Website học C++ miễn phí được cộng đồng lập trình toàn cầu đánh giá cao nhất.',
        purpose: 'Học C++ từ cơ bản đến nâng cao với lý thuyết chi tiết và ví dụ thực hành.',
        features: ['Miễn phí 100%', 'Cập nhật chuẩn C++ mới nhất', 'Bài tập cuối mỗi chương', 'Giải thích chi tiết từng khái niệm']
    },
    {
        name: 'HackerRank C++',
        description: 'Bài tập thực hành từ dễ đến khó',
        type: 'practice',
        phase: 'The Foundation',
        url: 'https://hackerrank.com/domains/cpp',
        whatIs: 'Nền tảng luyện tập code online với hàng ngàn bài tập C++.',
        purpose: 'Rèn luyện kỹ năng giải quyết vấn đề và làm quen với format phỏng vấn.',
        features: ['Bài tập phân loại theo độ khó', 'Chấm điểm tự động', 'Có chứng chỉ', 'Phù hợp cho người mới']
    },
    {
        name: 'The Cherno C++',
        description: 'Video giải thích C++ cực hay (English)',
        type: 'video',
        phase: 'The Foundation',
        url: 'https://www.youtube.com/playlist?list=PLlrATfBNZ98dudnM48yfGUldqGD0S4FFb',
        whatIs: 'Kênh YouTube của game developer chuyên nghiệp với playlist C++ nổi tiếng.',
        purpose: 'Hiểu sâu về C++ qua góc nhìn của người làm game/graphics programming.',
        features: ['Giải thích trực quan', 'Focus vào "tại sao"', 'Ví dụ thực tế', 'Phong cách dễ hiểu']
    },
    {
        name: 'Growth Mindset',
        description: 'Tư duy phát triển - Quan trọng hơn kỹ thuật',
        type: 'mental',
        phase: 'The Foundation',
        url: 'https://www.mindsetworks.com/science/',
        whatIs: 'Nghiên cứu khoa học về tư duy phát triển của Carol Dweck (Stanford).',
        purpose: 'Xây dựng mindset đúng đắn để không bỏ cuộc khi học lập trình.',
        features: ['Dựa trên nghiên cứu khoa học', 'Ứng dụng vào học tập', 'Thay đổi cách nhìn về thất bại', 'Tăng khả năng kiên trì']
    },
    {
        name: 'Visualizing Pointers',
        description: 'Xem code chạy từng bước một',
        type: 'tool',
        phase: 'The Foundation',
        url: 'https://pythontutor.com/cpp.html',
        whatIs: 'Công cụ online giúp visualize cách code C++ chạy trong bộ nhớ.',
        purpose: 'Hiểu rõ con trỏ, stack, heap bằng cách "nhìn thấy" code chạy.',
        features: ['Miễn phí', 'Không cần cài đặt', 'Hỗ trợ nhiều ngôn ngữ', 'Mô phỏng bộ nhớ trực quan']
    },

    // The Algorithms
    {
        name: 'Abdul Bari',
        description: 'Thầy giáo dạy thuật toán hay nhất (English)',
        type: 'video',
        phase: 'The Algorithms',
        url: 'https://www.youtube.com/@abdul_bari',
        whatIs: 'Kênh YouTube của giảng viên đại học chuyên về thuật toán và DSA.',
        purpose: 'Học thuật toán với cách giải thích "trực giác" trước khi code.',
        features: ['Minh họa bằng hình vẽ', 'Giải thích cặn kẽ từng bước', 'Video nổi tiếng về Quy hoạch động (Dynamic Programming)', 'Phù hợp mọi trình độ']
    },
    {
        name: 'VisuAlgo',
        description: 'Xem thuật toán chạy bằng hình ảnh động',
        type: 'tool',
        phase: 'The Algorithms',
        url: 'https://visualgo.net',
        whatIs: 'Website mô phỏng thuật toán bằng animation từ NUS Singapore.',
        purpose: 'Hiểu thuật toán bằng cách "nhìn" nó chạy, không chỉ đọc code.',
        features: ['Hoạt hình (Animation) từng bước', 'Có bài trắc nghiệm (Quiz)', 'Hỗ trợ tiếng Việt', 'Bao gồm hầu hết thuật toán quan trọng']
    },
    {
        name: '28tech (VN)',
        description: 'Học thuật toán bằng tiếng Việt rất dễ hiểu',
        type: 'video',
        phase: 'The Algorithms',
        url: 'https://www.youtube.com/@28tech',
        whatIs: 'Kênh YouTube tiếng Việt chuyên về DSA và competitive programming.',
        purpose: 'Học thuật toán bằng tiếng mẹ đẻ, dễ tiếp thu hơn.',
        features: ['100% tiếng Việt', 'Danh sách bài học (Playlist) đầy đủ', 'Phù hợp sinh viên Việt Nam', 'Code C++ chuẩn mực']
    },
    {
        name: 'LeetCode Easy',
        description: 'Luyện tập các bài cơ bản hàng ngày',
        type: 'practice',
        phase: 'The Algorithms',
        url: 'https://leetcode.com/problemset/?difficulty=EASY',
        whatIs: 'Nền tảng luyện thuật toán số 1 thế giới, filter bài Easy.',
        purpose: 'Xây dựng thói quen giải bài mỗi ngày, chuẩn bị phỏng vấn.',
        features: ['Bài tập thực tế từ các công ty lớn', 'Mục thảo luận (Discussion) chất lượng', 'Hỗ trợ nhiều ngôn ngữ', 'Có cuộc thi (Contest) hàng tuần']
    },
    {
        name: 'NeetCode Roadmap',
        description: 'Lộ trình học thuật toán bài bản',
        type: 'docs',
        phase: 'The Algorithms',
        url: 'https://neetcode.io/roadmap',
        whatIs: 'Lộ trình học 150 bài LeetCode được sắp xếp khoa học.',
        purpose: 'Học thuật toán có hệ thống thay vì random.',
        features: ['Phân loại theo mẫu (Pattern)', 'Video giải thích chi tiết', 'Theo dõi tiến độ (Tracking)', 'Miễn phí phần lớn nội dung']
    },
    {
        name: 'Big-O Cheatsheet',
        description: 'Bảng tra cứu độ phức tạp thuật toán',
        type: 'docs',
        phase: 'The Algorithms',
        url: 'https://www.bigocheatsheet.com/',
        whatIs: 'Bảng tổng hợp Big-O của các thuật toán và cấu trúc dữ liệu phổ biến.',
        purpose: 'Tra cứu nhanh khi cần so sánh hiệu năng.',
        features: ['Tóm gọn trong một trang', 'Dễ dàng lưu lại (Bookmark)', 'Bao gồm Sắp xếp, Tìm kiếm, Cấu trúc dữ liệu', 'Có biểu đồ (Graph) trực quan']
    },

    // The Modern Tool
    {
        name: 'Corey Schafer',
        description: 'Kênh học Python số 1 (English)',
        type: 'video',
        phase: 'The Modern Tool',
        url: 'https://www.youtube.com/@coreyms',
        whatIs: 'Kênh YouTube với tutorial Python chất lượng cao nhất.',
        purpose: 'Học Python đúng cách từ cơ bản đến advanced topics.',
        features: ['Giải thích cặn kẽ', 'Bài học về OOP, Flask, Django', 'Code chuẩn môi trường thực tế (Production)', 'Cập nhật thường xuyên']
    },
    {
        name: 'Real Python',
        description: 'Bài viết hướng dẫn chất lượng cao',
        type: 'docs',
        phase: 'The Modern Tool',
        url: 'https://realpython.com',
        whatIs: 'Website với hàng ngàn bài tutorial Python từ cơ bản đến chuyên sâu.',
        purpose: 'Đọc bài viết chi tiết về bất kỳ topic Python nào.',
        features: ['Bài viết dài, chi tiết', 'Có video đi kèm', 'Câu hỏi ôn tập (Quiz) cuối bài', 'Cập nhật liên tục']
    },
    {
        name: 'Automate Boring Stuff',
        description: 'Sách hay về tự động hóa (Free)',
        type: 'book',
        phase: 'The Modern Tool',
        url: 'https://automatetheboringstuff.com',
        whatIs: 'Sách Python miễn phí nổi tiếng về tự động hóa công việc.',
        purpose: 'Học Python qua các project thực tế như xử lý file, scraping.',
        features: ['Đọc miễn phí trực tuyến', 'Dự án thực tế', 'Không yêu cầu kiến thức nền', 'Ứng dụng ngay được']
    },
    {
        name: 'Python Crash Course',
        description: 'Sách nhập môn Python toàn diện',
        type: 'book',
        phase: 'The Modern Tool',
        url: 'https://nostarch.com/python-crash-course-3rd-edition',
        whatIs: 'Sách best-seller về Python cho người mới bắt đầu.',
        purpose: 'Học Python một cách có hệ thống từ đầu.',
        features: ['Phần 1: Kiến thức cơ bản', 'Phần 2: Dự án (Game, Web, Data)', 'Nội dung cập nhật thường xuyên', 'Bài tập sau mỗi chương']
    },
    {
        name: 'FastAPI Docs',
        description: 'Tài liệu Framework làm web hiện đại',
        type: 'docs',
        phase: 'The Modern Tool',
        url: 'https://fastapi.tiangolo.com',
        whatIs: 'Tài liệu chính thức của FastAPI - framework Python nhanh nhất.',
        purpose: 'Học cách xây dựng REST API hiện đại với Python.',
        features: ['Hướng dẫn (Tutorial) từng bước', 'Tự động tạo tài liệu (Docs)', 'Gợi ý kiểu dữ liệu (Type hints)', 'Hỗ trợ bất đồng bộ (Async)']
    },
    {
        name: 'SQLAlchemy',
        description: 'Công cụ làm việc với Database',
        type: 'docs',
        phase: 'The Modern Tool',
        url: 'https://www.sqlalchemy.org',
        whatIs: 'ORM và SQL toolkit phổ biến nhất cho Python.',
        purpose: 'Làm việc với database mà không cần viết SQL thuần.',
        features: ['Ánh xạ quan hệ đối tượng (ORM) mạnh mẽ', 'Hỗ trợ nhiều loại cơ sở dữ liệu', 'Công cụ xây dựng truy vấn (Query builder) linh hoạt', 'Sẵn sàng cho môi trường thực tế (Production)']
    },

    // The Engineer
    {
        name: 'English4IT',
        description: 'Từ vựng tiếng Anh chuyên ngành',
        type: 'lang',
        phase: 'The Engineer',
        url: 'https://english4it.com',
        whatIs: 'Nền tảng học tiếng Anh chuyên ngành IT.',
        purpose: 'Nâng cao vốn từ vựng chuyên ngành để đọc tài liệu.',
        features: ['Từ vựng theo chủ đề', 'Có phát âm (Audio)', 'Bài kiểm tra (Quiz)', 'Nội dung chuyên nghành IT']
    },
    {
        name: 'NeetCode.io',
        description: 'Luyện tập các dạng bài phỏng vấn',
        type: 'practice',
        phase: 'The Engineer',
        url: 'https://neetcode.io',
        whatIs: 'Website luyện thuật toán với video giải thích chi tiết.',
        purpose: 'Chuẩn bị phỏng vấn kỹ thuật tại các công ty lớn.',
        features: ['150 bài tập chọn lọc', 'Video giải bài', 'Phân loại theo mẫu (Pattern)', 'Lộ trình (Roadmap) rõ ràng']
    },
    {
        name: 'System Design Primer',
        description: 'Kiến thức thiết kế hệ thống (Github)',
        type: 'repo',
        phase: 'The Engineer',
        url: 'https://github.com/donnemartin/system-design-primer',
        whatIs: 'Repo Github tổng hợp kiến thức System Design.',
        purpose: 'Học cách thiết kế hệ thống lớn như Netflix, Twitter.',
        features: ['Hơn 200k lượt thích (Stars)', 'Có bản dịch tiếng Việt', 'Thẻ ghi nhớ (Flashcards)', 'Ví dụ thực tế (Case studies)']
    },
    {
        name: "Hugging Face",
        description: "GitHub của thế giới AI",
        type: 'repo',
        phase: 'The Engineer',
        url: 'https://huggingface.co',
        whatIs: 'Nền tảng cộng đồng lớn nhất chia sẻ Models, Datasets và Demo App AI.',
        purpose: 'Tìm kiếm model, dataset để fine-tune hoặc chạy các ứng dụng AI local.',
        features: ['Kho Model khổng lồ (Llama 3, Mistral...)', 'Spaces để demo app trực tiếp', 'Dataset phong phú cho mọi ngành', 'Cộng đồng AI sôi động nhất thế giới']
    },
    {
        name: "LangChain",
        description: "Framework phát triển ứng dụng LLM",
        type: 'docs',
        phase: 'The Modern Tool',
        url: 'https://python.langchain.com',
        whatIs: 'Framework tiêu chuẩn để xây dựng ứng dụng sử dụng LLM.',
        purpose: 'Kết nối LLM với dữ liệu riêng (RAG) và tạo Agent thông minh.',
        features: ['Tích hợp mọi LLM (OpenAI, Anthropic...)', 'RAG Pipeline mạnh mẽ', 'Ecosystem phong phú (LangSmith, LangServe)', 'Cộng đồng AI Engineer lớn nhất']
    },
    {
        name: 'Tech Interview Handbook',
        description: 'Cẩm nang phỏng vấn xin việc',
        type: 'docs',
        phase: 'The Engineer',
        url: 'https://www.techinterviewhandbook.org',
        whatIs: 'Handbook toàn diện về chuẩn bị phỏng vấn tech.',
        purpose: 'Có chiến lược rõ ràng cho từng giai đoạn phỏng vấn.',
        features: ['Mẹo viết hồ sơ (Resume)', 'Câu hỏi hành vi (Behavioral)', 'Chiến thuật lập trình (Coding strategies)', 'Kỹ năng đàm phán lương']
    },
    {
        name: 'GitHub Profile README',
        description: 'Tạo hồ sơ Github chuyên nghiệp',
        type: 'docs',
        phase: 'The Engineer',
        url: 'https://github.com/abhisheknaiidu/awesome-github-profile-readme',
        whatIs: 'Tổng hợp các mẫu README profile đẹp trên Github.',
        purpose: 'Tạo ấn tượng tốt với nhà tuyển dụng qua Github profile.',
        features: ['Hơn 100 mẫu (Templates)', 'Có hướng dẫn chi tiết', 'Đa dạng phong cách', 'Sao chép và tùy chỉnh dễ dàng']
    },
    {
        name: 'Roadmap.sh',
        description: 'Bản đồ định hướng nghề nghiệp',
        type: 'docs',
        phase: 'The Engineer',
        url: 'https://roadmap.sh',
        whatIs: 'Website với các roadmap học tập cho mọi role trong IT.',
        purpose: 'Biết cần học gì tiếp theo theo từng career path.',
        features: ['Đầy đủ: Frontend, Backend, DevOps...', 'Cập nhật liên tục theo năm', 'Tương tác (Interactive)', 'Các quy chuẩn tốt nhất (Best practices)']
    },
    {
        name: 'CS50 (Harvard)',
        description: 'Khóa học KHMT hay nhất thế giới',
        type: 'video',
        phase: 'The Foundation',
        url: 'https://cs50.harvard.edu/x/',
        whatIs: 'Khóa học nhập môn Khoa học máy tính huyền thoại của ĐH Harvard.',
        purpose: 'Hiểu tận gốc rễ máy tính "nghĩ" như thế nào (Binary, Memory, Algorithms).',
        features: ['Phương pháp giảng dạy trực quan, thực tế', 'Dựng nền tảng tư duy KHMT (CS) vững chắc', 'Bài tập thực hành thử thách cao', 'Chứng chỉ từ Harvard (có phí)']
    },
    {
        name: '3Blue1Brown',
        description: 'Đại số tuyến tính qua hình ảnh',
        type: 'video',
        phase: 'The Foundation',
        url: 'https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab',
        whatIs: 'Series "Essence of Linear Algebra" giải thích toán học bằng animation đẹp mắt.',
        purpose: 'Hiểu bản chất hình học của Vector, Matrix thay vì chỉ tính toán khô khan.',
        features: ['Hiểu sâu bản chất toán học', 'Bắt buộc nếu học AI/Machine Learning', 'Nền tảng cho Đồ họa/Lập trình Game', 'Hỗ trợ đọc hiểu bài báo nghiên cứu']
    },
    {
        name: 'TrevTutor',
        description: 'Toán rời rạc trong 10 phút',
        type: 'video',
        phase: 'The Foundation',
        url: 'https://www.youtube.com/user/thetrevtutor',
        whatIs: 'Kênh giải thích Toán rời rạc (Logic, Set, Graph) ngắn gọn, dễ hiểu.',
        purpose: 'Ôn tập nhanh các kiến thức toán nền tảng cho thuật toán.',
        features: ['Video ngắn gọn, tập trung trọng tâm', 'Bao gồm Logic, Lý thuyết tập hợp, Đồ thị', 'Phù hợp ôn thi đại học', 'Giúp hiểu Big-O và chứng minh thuật toán']
    },
    {
        name: 'Google Comprehensive Rust',
        description: 'Khóa học Rust từ Google',
        type: 'docs',
        phase: 'The Engineer',
        url: 'https://google.github.io/comprehensive-rust/',
        whatIs: 'Giáo trình đào tạo Rust nội bộ của đội ngũ Android Google.',
        purpose: 'Học Rust bài bản, nhanh chóng để xây dựng nền tảng cho tương lai.',
        features: ['Giáo trình thực chiến từ Google', 'Học Ownership/Borrow Checker đúng cách', 'Hiểu sâu về an toàn bộ nhớ (Memory Safety)', 'Chuẩn bị cho Lập trình hệ thống (System Programming)']
    },
    {
        name: 'Rustlings',
        description: 'Bài tập thực hành Rust',
        type: 'practice',
        phase: 'The Engineer',
        url: 'https://github.com/rust-lang/rustlings',
        whatIs: 'Bộ bài tập nhỏ buộc bạn phải sửa code lỗi để trình biên dịch chấp nhận.',
        purpose: 'Làm quen với Borrow Checker và sự "khó tính" của Rust Compiler.',
        features: ['Học bằng cách sửa lỗi trình biên dịch (Compiler)', 'Hiểu các lỗi Rust thường gặp', 'Rèn luyện kỹ năng với Borrow Checker', 'Tiến trình rõ ràng từng bước']
    },
    {
        name: 'DevDocs.io',
        description: 'Tài liệu All-in-One',
        type: 'tool',
        phase: 'The Modern Tool',
        url: 'https://devdocs.io',
        whatIs: 'Tổng hợp tài liệu của mọi ngôn ngữ (C++, Python, React...) vào một giao diện.',
        purpose: 'Tra cứu nhanh mọi thứ ở một nơi, có thể chạy offline.',
        features: ['Tra cứu API cực nhanh (Fuzzy search)', 'Hoạt động offline khi mất mạng', 'Tổng hợp mọi ngôn ngữ', 'Tra cứu tập trung, tiết kiệm thời gian']
    },
    {
        name: 'Spiderum',
        description: 'Mở rộng tư duy đa chiều',
        type: 'mental',
        phase: 'The Engineer',
        url: 'https://spiderum.com',
        whatIs: 'Nền tảng viết lách và tranh luận của giới trẻ Việt Nam.',
        purpose: 'Rèn luyện tư duy phản biện và kiến thức xã hội, tránh trở thành "thợ code" vô cảm.',
        features: ['Rèn luyện tư duy phản biện', 'Hiểu đa chiều về xã hội/công nghệ', 'Tránh trở thành "thợ code" thiếu chiều sâu', 'Viết lách để hệ thống hóa suy nghĩ']
    },
];

const typeLabels: Record<ResourceType, string> = {
    all: 'Tất cả',
    docs: 'Docs',
    practice: 'Practice',
    video: 'Video',
    mental: 'Mental',
    tool: 'Tool',
    book: 'Book',
    lang: 'Lang',
    repo: 'Repo',
};

const typeIcons: Record<ResourceType, React.ReactNode> = {
    all: null,
    docs: <BookOpen className="w-3.5 h-3.5" />,
    practice: <Code className="w-3.5 h-3.5" />,
    video: <Video className="w-3.5 h-3.5" />,
    mental: <Brain className="w-3.5 h-3.5" />,
    tool: <Wrench className="w-3.5 h-3.5" />,
    book: <Book className="w-3.5 h-3.5" />,
    lang: <Languages className="w-3.5 h-3.5" />,
    repo: <GitBranch className="w-3.5 h-3.5" />,
};

import useLockBodyScroll from '@/hooks/useLockBodyScroll';

function ResourceDetailModal({ resource, onClose }: { resource: Resource | null; onClose: () => void }) {
    useLockBodyScroll(!!resource);
    if (!resource) return null;

    return (
        <AnimatePresence>
            {resource && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 pointer-events-auto"
                        onClick={onClose}
                    />
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-[#0f0f0f] w-full max-w-3xl rounded-2xl border border-white/10 shadow-2xl overflow-hidden pointer-events-auto max-h-[90vh] flex flex-col"
                        >
                            {/* Modal Header */}
                            <div className="relative p-6 md:p-8 border-b border-white/5 bg-gradient-to-b from-white/5 to-transparent">
                                <button
                                    onClick={onClose}
                                    className="absolute top-4 right-4 p-2 rounded-full bg-black/20 hover:bg-white/10 transition-colors border border-white/5"
                                >
                                    <X className="w-5 h-5 text-neutral-400 hover:text-white" />
                                </button>

                                <div className="flex items-start gap-3 mb-4">
                                    <span className="text-xs px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center gap-1.5 font-medium">
                                        {typeIcons[resource.type]}
                                        {typeLabels[resource.type]}
                                    </span>
                                    <span className="text-xs px-2.5 py-1 rounded-full bg-white/5 text-neutral-400 border border-white/10">
                                        {resource.phase}
                                    </span>
                                </div>

                                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">{resource.name}</h2>
                                <p className="text-neutral-400 text-base leading-relaxed max-w-xl">{resource.description}</p>
                            </div>

                            {/* Modal Body */}
                            <div className="p-6 md:p-8 space-y-6 max-h-[60vh] overflow-y-auto custom-scrollbar overscroll-contain [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:none]">
                                {/* Info Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="p-5 rounded-xl bg-white/[0.03] border border-white/5">
                                        <div className="flex items-center gap-2 mb-3">
                                            <Sparkles className="w-4 h-4 text-amber-400" />
                                            <h3 className="font-semibold text-white text-sm uppercase tracking-wider">Đây là gì?</h3>
                                        </div>
                                        <p className="text-neutral-300 text-sm leading-relaxed">
                                            {resource.whatIs}
                                        </p>
                                    </div>

                                    <div className="p-5 rounded-xl bg-white/[0.03] border border-white/5">
                                        <div className="flex items-center gap-2 mb-3">
                                            <Target className="w-4 h-4 text-emerald-400" />
                                            <h3 className="font-semibold text-white text-sm uppercase tracking-wider">Mục đích</h3>
                                        </div>
                                        <p className="text-neutral-300 text-sm leading-relaxed">
                                            {resource.purpose}
                                        </p>
                                    </div>
                                </div>

                                {/* Features */}
                                <div className="p-5 rounded-xl bg-blue-500/[0.03] border border-blue-500/10">
                                    <div className="flex items-center gap-2 mb-4">
                                        <CheckCircle className="w-4 h-4 text-blue-400" />
                                        <h3 className="font-semibold text-white text-sm uppercase tracking-wider">Tính năng nổi bật</h3>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        {resource.features.map((f, i) => (
                                            <div key={i} className="flex items-start gap-2.5">
                                                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                                                <span className="text-sm text-neutral-300 leading-relaxed">{f}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Modal Footer */}
                            <div className="p-6 border-t border-white/10 bg-[#0a0a0a]">
                                <a
                                    href={resource.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex items-center justify-center gap-2 w-full py-3.5 bg-white text-black font-bold rounded-xl hover:bg-neutral-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(255,255,255,0.2)]"
                                >
                                    Truy cập Tài Nguyên
                                    <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </a>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}

import Silk from '@/components/ui/Silk';

export default function ResourcesPage() {
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState<ResourceType>('all');
    const [selectedResource, setSelectedResource] = useState<Resource | null>(null);

    const filteredResources = resources.filter(r => {
        const matchesSearch = r.name.toLowerCase().includes(search.toLowerCase()) ||
            r.description.toLowerCase().includes(search.toLowerCase());
        const matchesFilter = filter === 'all' || r.type === filter;
        return matchesSearch && matchesFilter;
    });

    return (
        <main className="min-h-screen bg-[#0a0a0a] text-white pt-36 pb-16 relative overflow-hidden">
            {/* Background Effect */}
            <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
                <Silk
                    color="#1d4ed8" // Blue-700
                    speed={5.0}
                    scale={1.2}
                    noiseIntensity={0.5}
                />
            </div>

            <div className="container mx-auto px-6 max-w-6xl relative z-10">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight text-center">
                        <span className="bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-500 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(59,130,246,0.3)]">
                            TÀI NGUYÊN HỌC&nbsp;TẬP
                        </span>
                    </h1>
                    <p className="text-neutral-400 max-w-2xl mx-auto text-lg">
                        Tổng hợp tất cả tài liệu, video, và công cụ từ lộ trình học tập.
                    </p>
                </div>

                {/* Search */}
                <div className="relative mb-6">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500 group-focus-within:text-blue-400 transition-colors" />
                    <input
                        type="text"
                        placeholder="Tìm kiếm tài nguyên (C++, Python, DSA...)"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-neutral-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all"
                    />
                </div>

                {/* Filters */}
                <div className="flex flex-wrap gap-2 mb-8">
                    {(Object.keys(typeLabels) as ResourceType[]).map(type => (
                        <button
                            key={type}
                            onClick={() => setFilter(type)}
                            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all flex items-center gap-1.5 ${filter === type
                                ? 'bg-white text-black'
                                : 'bg-white/5 text-neutral-400 hover:bg-white/10'
                                }`}
                        >
                            {typeIcons[type]}
                            {typeLabels[type]}
                        </button>
                    ))}
                </div>

                {/* Resources Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ staggerChildren: 0.1 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {filteredResources.map((resource, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.05 }}
                            onClick={() => setSelectedResource(resource)}
                            className="h-full"
                        >
                            <GlassSurface
                                width="100%"
                                height="100%"
                                borderRadius={20}
                                opacity={0.3}
                                backgroundOpacity={0.05}
                                blur={10}
                                className="cursor-pointer hover:scale-[1.02] transition-transform duration-300 hover:border-blue-500/50 border border-white/10"
                            >
                                <div className="p-6 h-full flex flex-col w-full">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className={`p-2 rounded-lg bg-white/5 border border-white/10 text-blue-400 group-hover:text-white transition-colors`}>
                                            {typeIcons[resource.type]}
                                        </div>
                                        <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-1 rounded bg-white/5 text-neutral-500 border border-white/5">
                                            {resource.phase}
                                        </span>
                                    </div>

                                    <h3 className="font-bold text-xl text-white group-hover:text-blue-400 transition-colors mb-2">
                                        {resource.name}
                                    </h3>
                                    <p className="text-sm text-neutral-400 mb-4 flex-grow leading-relaxed">
                                        {resource.description}
                                    </p>

                                    <div className="flex items-center gap-2 mt-auto pt-4 border-t border-white/5">
                                        <span className="text-xs text-neutral-500 group-hover:text-neutral-300 transition-colors flex items-center gap-1.5">
                                            Xem chi tiết <ExternalLink className="w-3 h-3" />
                                        </span>
                                    </div>
                                </div>
                            </GlassSurface>
                        </motion.div>
                    ))}
                </motion.div>

                {filteredResources.length === 0 && (
                    <div className="text-center py-16 text-neutral-500">
                        Không tìm thấy tài nguyên phù hợp.
                    </div>
                )}
            </div>

            {/* Detail Modal */}
            <ResourceDetailModal
                resource={selectedResource}
                onClose={() => setSelectedResource(null)}
            />
        </main >
    );
}
