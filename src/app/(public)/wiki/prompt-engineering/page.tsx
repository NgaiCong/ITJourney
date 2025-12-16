'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, BookOpen, ChevronRight, MessageSquare, Target, Zap, Layout, Code, Image as ImageIcon, Sparkles, Brain, Cpu, Globe, Users, FileText, Lightbulb, CheckCircle, RefreshCw, Layers, Star, Play, X, List, Palette, GraduationCap, Database, Stethoscope, Scale, TrendingUp, ChevronUp, Eye, Search, AlertTriangle, Shield, Settings, Menu, Smile, ArrowLeft, GitBranch, Mic, Video, Wand2, XCircle } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import { cn } from '@/lib/utils';
import { motion, useScroll, useSpring } from 'framer-motion';

// DATA: Introduction
const introContent = {
    title: 'Prompt Engineering là gì?',
    description: 'Prompt Engineering là nghệ thuật và khoa học tạo ra các câu hỏi hoặc hướng dẫn phù hợp để AI tạo ra phản hồi chính xác và hữu ích nhất. Giống như việc đưa ra hướng dẫn rõ ràng cho GPS - hướng đi càng rõ ràng, tuyến đường càng chính xác.',
    analogy: 'Hãy tưởng tượng bạn đang hướng dẫn một đầu bếp nấu ăn. Nếu chỉ nói "làm bữa tối", kết quả sẽ ngẫu nhiên. Nhưng nếu nói "làm món pasta Ý cho 4 người, không có hải sản, phong cách gia đình", bạn sẽ có đúng những gì cần.'
};

// DATA: Anatomy of a Good Prompt
const promptAnatomy = [
    { component: 'Bối cảnh (Context)', description: 'Thông tin nền tảng giúp AI hiểu tình huống', example: 'Tôi là nhân viên mới, cần viết email xin nghỉ phép...', icon: BookOpen, color: 'text-blue-400' },
    { component: 'Nhiệm vụ (Task)', description: 'Việc cụ thể bạn muốn AI thực hiện', example: 'Hãy viết một email ngắn gọn, lịch sự', icon: Target, color: 'text-green-400' },
    { component: 'Vai trò (Persona)', description: 'Đóng vai ai để có giọng văn phù hợp', example: 'Đóng vai một người quản lý nhân sự chuyên nghiệp...', icon: Users, color: 'text-purple-400' },
    { component: 'Định dạng (Format)', description: 'Cách trình bày kết quả mong muốn', example: 'Trình bày dưới dạng danh sách gạch đầu dòng', icon: FileText, color: 'text-yellow-400' },
    { component: 'Ví dụ (Example)', description: 'Mẫu câu trả lời để AI bắt chước', example: 'Ví dụ: "Kính gửi anh/chị [Tên], tôi viết mail này để..."', icon: Lightbulb, color: 'text-orange-400' },
    { component: 'Giọng điệu (Tone)', description: 'Thái độ và cảm xúc của câu trả lời', example: 'Trang trọng, chân thành nhưng không quá cứng nhắc', icon: MessageSquare, color: 'text-pink-400' }
];

// DATA: Weak vs Strong Prompts
const promptComparison = [
    {
        weak: 'Kể cho tôi về AI',
        weakIssues: ['Mơ hồ, không rõ muốn biết gì về AI', 'Quá rộng, AI sẽ trả lời lan man', 'Không có định dạng cụ thể'],
        strong: 'Giải thích khái niệm AI cho học sinh lớp 10 dễ hiểu, dùng 3 gạch đầu dòng',
        strongBenefits: ['Đối tượng rõ ràng (học sinh lớp 10)', 'Định dạng cụ thể (3 gạch đầu dòng)', 'Yêu cầu dễ hiểu']
    },
    {
        weak: 'Viết bài đăng về làm việc',
        weakIssues: ['Không biết đăng ở đâu (Facebook hay LinkedIn?)', 'Không có phong cách viết', 'Thiếu bối cảnh'],
        strong: 'Đóng vai chuyên gia năng suất. Viết bài LinkedIn về "quản lý xao nhãng khi làm tại nhà". Giọng văn chuyên nghiệp, ngắn gọn dưới 3 đoạn.',
        strongBenefits: ['Vai trò rõ ràng (chuyên gia)', 'Nền tảng cụ thể (LinkedIn)', 'Có giới hạn độ dài và giọng văn']
    },
    {
        weak: 'Viết blog về AI trong giáo dục',
        weakIssues: ['Không có góc nhìn cụ thể', 'Không biết độ dài bao nhiêu', 'Không có cấu trúc bài viết'],
        strong: 'Bước 1: Gợi ý 3 tiêu đề hấp dẫn về AI trong giáo dục. Bước 2: Chọn tiêu đề hay nhất và viết mở bài 200 từ. Bước 3: Lên dàn ý chi tiết cho thân bài.',
        strongBenefits: ['Quy trình từng bước (Step-by-step)', 'Kiểm soát được kết quả từng phần', 'Dễ dàng chỉnh sửa']
    }
];

// DATA: Use Cases by Industry
const useCases = [
    { industry: 'Sáng tạo nội dung', icon: Palette, tasks: ['Viết blog, bài quảng cáo, kịch bản', 'Lên ý tưởng bài đăng mạng xã hội', 'Tối ưu hóa bài viết cho SEO', 'Soạn lời thoại video/podcast'], color: 'from-pink-500 to-rose-500' },
    { industry: 'Chăm sóc khách hàng', icon: MessageSquare, tasks: ['Tự động trả lời tin nhắn', 'Xử lý khiếu nại mẫu', 'Soạn tài liệu đào tạo nhân viên', 'Tạo bộ câu hỏi thường gặp (FAQ)'], color: 'from-blue-500 to-cyan-500' },
    { industry: 'Lập trình', icon: Code, tasks: ['Viết code theo yêu cầu', 'Tìm lỗi và sửa lỗi (Debug)', 'Viết tài liệu hướng dẫn kỹ thuật', 'Giải thích đoạn code phức tạp'], color: 'from-green-500 to-emerald-500' },
    { industry: 'Giáo dục', icon: GraduationCap, tasks: ['Tạo bài trắc nghiệm và đề thi', 'Giải thích khái niệm khó', 'Lên kế hoạch bài giảng', 'Gợi ý lộ trình học tập cá nhân'], color: 'from-purple-500 to-violet-500' },
    { industry: 'Phân tích dữ liệu', icon: Database, tasks: ['Tóm tắt báo cáo số liệu', 'Gợi ý biểu đồ phù hợp', 'Rút ra insight từ bảng dữ liệu', 'Tự động viết nhận xét'], color: 'from-orange-500 to-amber-500' },
    { industry: 'Y tế & Sức khỏe', icon: Stethoscope, tasks: ['Tóm tắt hồ sơ bệnh án', 'Tra cứu thông tin thuốc', 'Lên thực đơn dinh dưỡng', 'Soạn hướng dẫn chăm sóc tại nhà'], color: 'from-red-500 to-pink-500' },
    { industry: 'Pháp lý', icon: Scale, tasks: ['Tóm tắt văn bản luật', 'Rà soát hợp đồng cơ bản', 'Tra cứu quy định pháp luật', 'Soạn thảo email pháp lý'], color: 'from-indigo-500 to-blue-500' },
    { industry: 'Marketing', icon: TrendingUp, tasks: ['Nghiên cứu từ khóa', 'Viết lời quảng cáo (Ad Copy)', 'Lên kế hoạch chiến dịch', 'Tạo nội dung cho A/B testing'], color: 'from-teal-500 to-cyan-500' }
];

// DATA: How AI Understands Prompts
const aiUnderstanding = [
    { concept: 'Token hóa (Chia từ)', description: 'AI không đọc từng từ như người, mà đọc các mảnh ký tự gọi là "token". Ví dụ: "Xin chào" có thể là 2-3 token. Càng nhiều token, AI càng cần xử lý nhiều.', icon: Layers },
    { concept: 'Cửa sổ ngữ cảnh (Bộ nhớ)', description: 'AI có trí nhớ ngắn hạn giới hạn. Nếu cuộc trò chuyện quá dài, nó sẽ "quên" phần đầu. Giống như bạn không thể nhớ nguyên văn cuốn sách vừa đọc.', icon: Brain },
    { concept: 'Dự đoán từ tiếp theo', description: 'AI thực chất là cỗ máy đoán chữ siêu việt. Nó tính toán xem từ nào hợp lý nhất để xuất hiện tiếp theo dựa trên hàng tỷ văn bản nó đã đọc.', icon: Cpu },
    { concept: 'Nhiệt độ (Độ sáng tạo)', description: 'Thông số chỉnh độ "bay bổng" của AI. Thấp (0.1) thì AI trả lời rập khuôn, chính xác. Cao (0.8) thì AI sáng tạo hơn nhưng dễ sai sót hơn.', icon: Settings }
];

// DATA: Google 5-Step Framework (TCREI)
const googleFramework = [
    { step: 'Task (Nhiệm vụ)', description: 'Xác định rõ bạn muốn AI làm gì', example: 'Gợi ý quà sinh nhật liên quan đến anime cho bạn tôi', icon: Target, color: 'text-green-400' },
    { step: 'Context (Bối cảnh)', description: 'Cung cấp thông tin bổ sung giúp AI trả lời chính xác hơn', example: 'Bạn tôi 29 tuổi, thích Naruto, Solo Leveling, Shangri-La Frontier...', icon: BookOpen, color: 'text-blue-400' },
    { step: 'References (Tham khảo)', description: 'Đưa ví dụ hoặc dữ liệu mẫu để AI hiểu rõ yêu cầu', example: 'Ví dụ: mô hình Naruto giá khoảng $50, truyện tranh bộ...', icon: FileText, color: 'text-purple-400' },
    { step: 'Evaluate (Đánh giá)', description: 'Kiểm tra kết quả có đúng ý muốn không', example: 'Đánh giá: Gợi ý này có khả thi để mua online không?', icon: CheckCircle, color: 'text-yellow-400' },
    { step: 'Iterate (Cải tiến)', description: 'Chỉnh sửa câu lệnh dựa trên kết quả để có đáp án tốt hơn', example: 'Thêm yêu cầu: "Chỉ chọn món dưới $50 và có bán ở Việt Nam"', icon: RefreshCw, color: 'text-cyan-400' }
];

// DATA: Zero-shot vs Few-shot
const shotLearning = {
    zeroShot: {
        title: 'Prompt không ví dụ (Zero-Shot)',
        description: 'Hỏi trực tiếp, để AI tự trả lời dựa trên kiến thức có sẵn',
        example: 'Giáng sinh ở Mỹ là ngày nào?',
        pros: ['Nhanh, đơn giản', 'Tốt cho câu hỏi kiến thức chung'],
        cons: ['Khó kiểm soát cách trả lời', 'Dễ bị sai ý nếu câu hỏi phức tạp']
    },
    fewShot: {
        title: 'Prompt có ví dụ (Few-Shot)',
        description: 'Đưa kèm 2-3 ví dụ mẫu để AI hiểu cách trả lời mong muốn',
        example: 'Sở thích: ăn chay. VD1: Phở Bò → Không phù hợp. VD2: Pizza nấm → Phù hợp. Câu hỏi: Bánh mì gà?',
        pros: ['Kiểm soát kết quả tốt hơn', 'AI học theo mẫu rất nhanh'],
        cons: ['Viết câu lệnh dài hơn', 'Cần nghĩ ví dụ chuẩn']
    }
};

// DATA: AI Hallucinations & Bias
const aiIssues = [
    {
        issue: 'Ảo giác (Hallucination)',
        description: 'AI tự "bịa" ra thông tin sai lệch nhưng nói rất tự tin',
        example: 'AI bịa ra tên một cuốn sách không tồn tại hoặc trích dẫn luật sai',
        solution: 'Luôn kiểm tra lại thông tin quan trọng (Fact-check), cung cấp tài liệu nguồn cho AI',
        color: 'text-red-400'
    },
    {
        issue: 'Thiên kiến (Bias)',
        description: 'AI học từ dữ liệu con người nên có thể hấp thụ cả những định kiến xấu',
        example: 'AI mặc định "giám đốc" là nam giới, "thư ký" là nữ giới',
        solution: 'Rà soát kết quả, yêu cầu AI xem xét nhiều góc nhìn khác nhau',
        color: 'text-orange-400'
    }
];

// DATA: Advanced Techniques (Expanded)
const advancedTechniques = [
    {
        technique: 'Suy luận theo chuỗi (Chain of Thought)',
        description: 'Yêu cầu AI giải thích từng bước suy nghĩ trước khi đưa ra đáp án cuối cùng',
        example: '"Hãy suy nghĩ từng bước: Bước 1 - Phân tích. Bước 2 - Tính toán. Bước 3 - Kết luận..."',
        benefit: 'Tăng độ chính xác đáng kể cho các bài toán logic, toán học',
        icon: GitBranch
    },
    {
        technique: 'Cây suy luận (Tree of Thought)',
        description: 'Yêu cầu AI thử nhiều hướng giải quyết khác nhau cùng lúc',
        example: '"Hãy đưa ra 3 phương án giải quyết vấn đề này, sau đó phân tích ưu nhược điểm từng cái"',
        benefit: 'Tuyệt vời cho các công việc sáng tạo, lên ý tưởng',
        icon: GitBranch
    },
    {
        technique: 'Chuỗi câu lệnh (Prompt Chaining)',
        description: 'Chia một việc lớn thành nhiều câu lệnh nhỏ nối tiếp nhau',
        example: 'Lệnh 1: Tóm tắt bài báo. Lệnh 2: Dùng tóm tắt để viết bài đăng Facebook.',
        benefit: 'Kiểm soát chất lượng tốt hơn, tránh việc AI bị "loạn" khi làm việc quá lớn',
        icon: ArrowRight
    },
    {
        technique: 'Học qua ví dụ (Few-Shot)',
        description: 'Cung cấp mẫu để AI làm theo',
        example: '"Ví dụ 1: [Đầu vào] -> [Đầu ra]. Bây giờ làm tương tự cho [Đầu vào mới]"',
        benefit: 'Giúp AI hiểu đúng định dạng và văn phong bạn cần',
        icon: Lightbulb
    },
    {
        technique: 'Nhập vai (Role Prompting)',
        description: 'Gán cho AI một "nhân cách" hoặc chức danh cụ thể',
        example: '"Bạn là chuyên gia dinh dưỡng với 10 năm kinh nghiệm..."',
        benefit: 'Lời khuyên sẽ chuyên sâu và phù hợp ngữ cảnh hơn',
        icon: Users
    },
    {
        technique: 'Siêu Prompt (Meta-Prompting)',
        description: 'Nhờ AI viết lại câu lệnh cho chính nó',
        example: '"Hãy giúp tôi viết một prompt tốt hơn để yêu cầu AI lập kế hoạch du lịch"',
        benefit: 'Dùng AI để tối ưu hóa cách hỏi AI',
        icon: RefreshCw
    }
];

// DATA: Context Engineering vs Vibe Coding
const contextVsVibe = {
    vibeCoding: {
        title: 'Code theo cảm tính (Vibe Coding)',
        description: 'Ra lệnh sơ sài, hy vọng AI tự hiểu ý mình',
        issues: ['AI tự bịa hàm code không chạy được', 'Code khó bảo trì và mở rộng', 'Dễ sinh lỗi (bug) tiềm ẩn', 'Không đáng tin cậy cho dự án thật'],
        example: '"Viết cho tôi cái app to-do list"'
    },
    contextEngineering: {
        title: 'Kỹ thuật ngữ cảnh (Context Engineering)',
        description: 'Cung cấp đầy đủ luật lệ, dữ liệu mẫu, công cụ và cấu trúc mong muốn',
        benefits: ['AI hiểu rõ logic thay vì đoán mò', 'Kết quả nhất quán, dễ dự đoán', 'Code sạch, dễ nâng cấp', 'Ứng dụng được vào thực tế'],
        example: '"Dùng TypeScript. Đây là tài liệu API mẫu. Hãy trả về kết quả dạng JSON..."'
    }
};

// DATA: Tools Comparison
const toolsComparison = [
    { tool: 'ChatGPT', model: 'GPT-4 Turbo', contextWindow: '128K tokens', strengths: 'Suy luận giỏi, làm code tốt', weaknesses: 'Đôi khi vẫn ảo giác', bestFor: 'Đa dụng, Lên ý tưởng, Viết code' },
    { tool: 'Claude', model: 'Claude 3.5', contextWindow: '200K tokens', strengths: 'Viết văn hay, ngữ cảnh dài, an toàn', weaknesses: 'Đôi khi quá thận trọng', bestFor: 'Viết lách, Tóm tắt tài liệu dài' },
    { tool: 'Gemini', model: 'Gemini Pro', contextWindow: '1M tokens', strengths: 'Xử lý hình ảnh/video tốt, nhanh', weaknesses: 'Đôi khi thiếu nhất quán', bestFor: 'Xử lý đa phương thức, Google Workspace' },
    { tool: 'GitHub Copilot', model: 'Codex-based', contextWindow: 'File context', strengths: 'Tích hợp sâu vào trình soạn code', weaknesses: 'Chỉ chuyên về code', bestFor: 'Lập trình viên, Pair programming' }
];

// DATA: Multimodal Prompting
const multimodalTypes = [
    { type: 'Text', icon: FileText, description: 'Ngôn ngữ viết - prompts, documents', color: 'text-blue-400' },
    { type: 'Image', icon: Eye, description: 'Nội dung visual - photos, charts, diagrams', color: 'text-green-400' },
    { type: 'Audio', icon: Mic, description: 'Sound-based input - speech, music', color: 'text-purple-400' },
    { type: 'Video', icon: Video, description: 'Time-based visual và audio content', color: 'text-orange-400' }
];

// DATA: Iteration Methods (4 cách cải tiến prompt)
const iterationMethods = [
    { method: 'Rà soát Framework', description: 'Kiểm tra xem đã đủ Bối cảnh, Nhiệm vụ, hay Vai trò chưa?', example: 'Thêm: "Bạn là chuyên gia marketing..." hoặc thêm mẫu output' },
    { method: 'Chia nhỏ vấn đề', description: 'Tách câu lệnh phức tạp thành các bước nhỏ hơn, dễ hiểu hơn', example: 'Thay vì 1 đoạn dài → Tách thành 3 gạch đầu dòng rõ ràng' },
    { method: 'Diễn đạt lại', description: 'Thử dùng từ ngữ khác hoặc so sánh ẩn dụ để AI hiểu ý', example: 'Thay "viết blog" → "hãy kể một câu chuyện đầy cảm hứng về..."' },
    { method: 'Thêm ràng buộc (Constraints)', description: 'Giới hạn phạm vi để AI không đi lạc đề', example: 'Thêm: "dưới 200 từ", "chỉ dùng số liệu năm 2024", "không dùng từ ngữ chuyên ngành"' }
];

// DATA: AI Agents
const aiAgents = {
    description: 'AI được thiết kế như một nhân viên ảo chuyên trách, có tính cách riêng và khả năng thực hiện chuỗi nhiệm vụ',
    types: [
        {
            type: 'Mô phỏng (Simulation)',
            description: 'Giả lập tình huống thực tế để luyện tập kỹ năng',
            example: 'AI đóng vai nhà tuyển dụng khó tính phỏng vấn bạn, sau đó nhận xét về câu trả lời của bạn',
            useCase: 'Luyện phỏng vấn, học ngoại ngữ, tập bán hàng'
        },
        {
            type: 'Cố vấn chuyên gia (Expert Feedback)',
            description: 'Đóng vai chuyên gia để đưa ra lời khuyên sâu sắc',
            example: 'AI đóng vai Giám đốc Marketing, review bản kế hoạch của bạn và chỉ ra lỗ hổng',
            useCase: 'Đánh giá ý tưởng, sửa bài viết, tư vấn chiến lược'
        }
    ],
    creationSteps: [
        'Xác định vai trò (Persona)',
        'Cung cấp thông tin nền (Context)',
        'Mô tả cách thức tương tác',
        'Đặt từ khóa dừng (nếu cần)',
        'Yêu cầu tổng kết sau khi hoàn thành'
    ]
};

// DATA: Best Practices
const bestPractices = [
    { practice: 'Viết rõ ràng như nói với một người thông minh nhưng chưa biết gì', example: 'Thay vì nói cụt lủn, hãy giải thích bối cảnh và mong muốn cụ thể' },
    { practice: 'Luôn gán vai trò (Persona) cho AI', example: '"Bạn là giáo viên tiếng Anh..." sẽ tốt hơn là chỉ hỏi "Dịch câu này"' },
    { practice: 'Tương tác qua lại (Iterative)', example: 'Đừng mong kết quả hoàn hảo ngay lần đầu. Hãy nói chuyện và chỉnh sửa dần với AI' },
    { practice: 'Tránh câu hỏi định hướng thiên lệch', example: 'Thay vì hỏi "AI có xấu không?", hãy hỏi "Phân tích mặt tốt và xấu của AI"' },
    { practice: 'Chia nhỏ vấn đề phức tạp', example: 'Đừng bắt AI giải quyết cả thế giới trong 1 câu lệnh. Tách thành từng bước nhỏ' },
    { practice: 'Quy định rõ định dạng đầu ra', example: 'Muốn bảng biểu? Muốn JSON? Muốn danh sách? Hãy nói rõ điều đó' }
];

// DATA: Common Pitfalls
const commonPitfalls = [
    { pitfall: 'Prompt quá dài dòng, lan man', consequence: 'AI bị "trôi" thông tin, quên mất yêu cầu chính', solution: 'Tóm tắt lại, đưa thông tin cần thiết nhất lên đầu hoặc cuối' },
    { pitfall: 'Yêu cầu mâu thuẫn nhau', consequence: 'AI bối rối, trả lời không đầu không đuôi', solution: 'Ưu tiên yêu cầu quan trọng nhất, kiểm tra lại logic của câu lệnh' },
    { pitfall: 'Không đưa ví dụ cho việc khó', consequence: 'AI không hiểu format bạn muốn', solution: 'Luôn đưa 1-2 ví dụ mẫu (Few-shot) nếu nhiệm vụ phức tạp' },
    { pitfall: 'Không quy định format', consequence: 'AI trả về văn bản tràn lan khó đọc', solution: 'Yêu cầu rõ: "trả lời bằng gạch đầu dòng" hoặc "tạo bảng so sánh"' },
    { pitfall: 'Câu hỏi quá mơ hồ', consequence: 'AI phải đoán mò, kết quả chung chung', solution: 'Áp dụng công thức 5W1H (Ai, Cái gì, Ở đâu, Khi nào, Tại sao, Như thế nào)' },
    { pitfall: 'Tin tưởng tuyệt đối vào AI', consequence: 'Dùng sai thông tin bịa đặt (ảo giác)', solution: 'Luôn kiểm chứng lại số liệu và sự kiện quan trọng' }
];

// DATA: Key Takeaways (Comprehensive)
const keyTakeaways = [
    'Prompt Engineering là kỹ năng giao tiếp cốt lõi với AI - hãy nói chuyện với nó rõ ràng như với một đồng nghiệp.',
    'Dùng Framework Google (TCREI): Nhiệm vụ -> Bối cảnh -> Tham khảo -> Đánh giá -> Cải tiến.',
    '6 yếu tố của Prompt chuẩn: Bối cảnh, Nhiệm vụ, Vai trò, Định dạng, Ví dụ, Giọng điệu.',
    'Dùng Zero-shot (hỏi luôn) cho việc dễ. Dùng Few-shot (kèm ví dụ) cho việc khó.',
    'Chain of Thought: Yêu cầu AI "suy nghĩ từng bước" để nó thông minh hơn.',
    'Nhớ rằng AI có thể "bịa chuyện" (Hallucination) - luôn phải kiểm tra lại thông tin quan trọng.',
    'Context Engineering quan trọng hơn Vibe Coding: Hãy cung cấp đủ dữ liệu và luật lệ thay vì chỉ ra lệnh xuề xòa.',
    'AI Agents: Bạn có thể biến AI thành "nhân viên ảo" với tính cách và nhiệm vụ chuyên biệt.',
    'Mỗi công cụ có thế mạnh riêng: ChatGPT đa năng, Claude văn hay, Gemini xử lý ảnh tốt.',
    'Hãy kiên nhẫn và thử lại (Iterate). Không ai viết prompt hoàn hảo ngay lần đầu tiên.'
];

// DATA: Glossary (Expanded)
const glossary = [
    { term: 'Token', definition: 'Đơn vị xử lý văn bản của AI. Một từ tiếng Việt thường tốn 2-3 token.' },
    { term: 'Context Window (Cửa sổ ngữ cảnh)', definition: 'Bộ nhớ tạm thời của AI trong một cuộc hội thoại. Hết bộ nhớ này AI sẽ quên những gì đã nói lúc đầu.' },
    { term: 'Hallucination (Ảo giác)', definition: 'Hiện tượng AI tự bịa ra thông tin sai sự thật nhưng trình bày rất thuyết phục.' },
    { term: 'Zero-Shot', definition: 'Hỏi AI mà không đưa ra ví dụ mẫu nào.' },
    { term: 'Few-Shot', definition: 'Đưa ra một vài ví dụ mẫu để AI hiểu cách làm trước khi yêu cầu nó thực hiện.' },
    { term: 'Chain of Thought', definition: 'Kỹ thuật yêu cầu AI "suy nghĩ từng bước" để giải quyết vấn đề logic tốt hơn.' },
    { term: 'Prompt', definition: 'Câu lệnh hoặc yêu cầu đầu vào mà bạn gửi cho AI.' },
    { term: 'RAG', definition: 'Kỹ thuật cho phép AI tra cứu thêm tài liệu bên ngoài để trả lời chính xác hơn.' },
    { term: 'AI Agent', definition: 'Một "nhân viên AI" có tính cách, vai trò cụ thể và khả năng thực hiện nhiệm vụ tự chủ.' }
];

// TOC Items (Expanded)
const tocItems = [
    { id: 'intro', label: '1. Giới thiệu' },
    { id: 'google-framework', label: '2. Công thức Google (TCREI)' },
    { id: 'anatomy', label: '3. Cấu trúc Prompt chuẩn' },
    { id: 'weak-strong', label: '4. Prompt Tốt vs Xấu' },
    { id: 'ai-understanding', label: '5. Cách AI hiểu ngôn ngữ' },
    { id: 'shot-learning', label: '6. Zero-Shot & Few-Shot' },
    { id: 'advanced', label: '7. Kỹ thuật nâng cao' },
    { id: 'ai-issues', label: '8. Ảo giác & Thiên kiến' },
    { id: 'iteration', label: '9. Cách cải tiến Prompt' },
    { id: 'best-practices', label: '10. Lời khuyên cốt lõi' },
    { id: 'ai-agents', label: '11. Tạo AI Agents' },
    { id: 'context-engineering', label: '12. Kỹ thuật ngữ cảnh' },
    { id: 'tools', label: '13. So sánh công cụ' },
    { id: 'multimodal', label: '14. Đa phương thức' },
    { id: 'pitfalls', label: '15. Lỗi thường gặp' },
    { id: 'use-cases', label: '16. Ứng dụng thực tế' },
    { id: 'glossary', label: '17. Từ điển thuật ngữ' },
    { id: 'takeaways', label: '18. Tổng kết' }
];

// COMPONENT: Main Page
export default function PromptEngineeringPage() {
    const [activeSection, setActiveSection] = useState('intro');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

    useEffect(() => {
        const handleScroll = () => {
            const sections = tocItems.map(item => document.getElementById(item.id));
            const scrollPosition = window.scrollY + 150;
            for (let i = sections.length - 1; i >= 0; i--) {
                const section = sections[i];
                if (section && section.offsetTop <= scrollPosition) {
                    setActiveSection(tocItems[i].id);
                    break;
                }
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-950">
            {/* Progress Bar */}
            <motion.div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 origin-left z-50" style={{ scaleX }} />

            {/* Mobile TOC Toggle */}
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="lg:hidden fixed bottom-6 right-6 z-50 p-4 bg-purple-600 rounded-full shadow-lg shadow-purple-600/30 hover:bg-purple-500 transition-colors">
                {isMobileMenuOpen ? <X className="w-6 h-6 text-white" /> : <List className="w-6 h-6 text-white" />}
            </button>

            {/* Mobile TOC */}
            {isMobileMenuOpen && (
                <div className="lg:hidden fixed inset-0 z-40 bg-slate-950/95 p-6 overflow-y-auto">
                    <h3 className="text-xl font-bold text-white mb-4">Mục lục</h3>
                    <nav className="space-y-2">
                        {tocItems.map(item => (
                            <a key={item.id} href={`#${item.id}`} onClick={() => setIsMobileMenuOpen(false)}
                                className={cn("block py-2 px-3 rounded-lg transition-colors", activeSection === item.id ? "bg-purple-600 text-white" : "text-slate-400 hover:text-white")}>
                                {item.label}
                            </a>
                        ))}
                    </nav>
                </div>
            )}

            <div className="max-w-7xl mx-auto px-4 pt-32 pb-12 lg:grid lg:grid-cols-[300px_1fr] lg:gap-12">
                {/* Desktop TOC */}
                <aside className="hidden lg:block h-full relative">
                    <div className="sticky top-0 h-screen flex flex-col justify-center py-8">
                        <Link href="/wiki" className="inline-flex items-center justify-center w-full gap-2 text-slate-400 hover:text-white transition-colors mb-8 group">
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Quay lại Wiki
                        </Link>

                        <div className="p-4 rounded-2xl bg-slate-900/50 backdrop-blur-xl border border-white/5 shadow-2xl max-h-[80vh] flex flex-col">
                            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 px-3 text-center">Mục lục nội dung</h3>
                            <nav className="space-y-1 overflow-y-auto pr-2 custom-scrollbar text-center [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
                                {tocItems.map(item => (
                                    <a key={item.id} href={`#${item.id}`}
                                        className={cn("block py-2.5 px-3 text-sm rounded-lg transition-all duration-300 relative overflow-hidden",
                                            activeSection === item.id
                                                ? "bg-gradient-to-r from-purple-500/20 to-blue-500/10 text-white font-medium shadow-inner border border-purple-500/20"
                                                : "text-slate-400 hover:text-slate-200 hover:bg-white/5 active:scale-[0.98]")}>
                                        {activeSection === item.id && (
                                            <motion.div layoutId="activeSection" className="absolute left-0 top-0 bottom-0 w-1 bg-purple-500 rounded-full" />
                                        )}
                                        <span className={cn("relative z-10", activeSection === item.id && "pl-2")}>{item.label}</span>
                                    </a>
                                ))}
                            </nav>
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="space-y-16">
                    {/* Hero */}
                    <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-12">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/20 rounded-full text-purple-300 text-sm mb-6">
                            <Sparkles className="w-4 h-4" /> Hướng dẫn toàn tập
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent mb-4 pb-2">
                            Prompt Engineering
                        </h1>
                        <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                            Nghệ thuật và khoa học tạo prompts hiệu quả để khai thác tối đa sức mạnh của AI
                        </p>
                    </motion.section>

                    {/* Section 1: Introduction */}
                    {/* Section 1: Introduction */}
                    <motion.section id="intro" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="space-y-6 scroll-mt-32">
                        <h2 className="text-3xl font-bold text-white flex items-center gap-3 py-1">
                            <BookOpen className="w-8 h-8 text-purple-400" /> {introContent.title}
                        </h2>
                        <GlassCard className="p-6">
                            <p className="text-slate-300 text-lg leading-relaxed mb-4">{introContent.description}</p>
                            <div className="p-4 bg-purple-500/10 rounded-lg border border-purple-500/30">
                                <p className="text-purple-300 italic">💡 {introContent.analogy}</p>
                            </div>
                        </GlassCard>
                    </motion.section>

                    {/* Section 2: Google 5-Step Framework */}
                    {/* Section 2: Google 5-Step Framework */}
                    <motion.section id="google-framework" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="space-y-6 scroll-mt-32">
                        <h2 className="text-3xl font-bold text-white flex items-center gap-3 py-1">
                            <Sparkles className="w-8 h-8 text-cyan-400" /> Google Framework (TCREI)
                        </h2>
                        <p className="text-slate-400">Framework 5 bước từ khóa học Google Prompting Essentials:</p>
                        <div className="grid md:grid-cols-5 gap-4">
                            {googleFramework.map((item, idx) => (
                                <GlassCard key={idx} className="p-5 text-center relative pt-8">
                                    <div className="absolute top-0 left-0 w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-br-xl rounded-tl-xl flex items-center justify-center text-white font-bold text-sm shadow-lg">{idx + 1}</div>
                                    <item.icon className={cn("w-8 h-8 mx-auto mb-3", item.color)} />
                                    <h3 className="text-lg font-semibold text-white mb-2">{item.step}</h3>
                                    <p className="text-slate-400 text-xs mb-2">{item.description}</p>
                                    <p className="text-xs text-slate-500 italic">{item.example}</p>
                                </GlassCard>
                            ))}
                        </div>
                        <GlassCard className="p-4 bg-cyan-500/10 border-cyan-500/30">
                            <p className="text-cyan-300 text-sm">💡 <strong>Mnemonic:</strong> &quot;Tiny Crabs Rarely Eat Insects&quot; = Task, Context, References, Evaluate, Iterate</p>
                        </GlassCard>
                    </motion.section>

                    {/* Section 3: Anatomy of a Good Prompt */}
                    {/* Section 3: Anatomy of a Good Prompt */}
                    <motion.section id="anatomy" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="space-y-6 scroll-mt-32">
                        <h2 className="text-3xl font-bold text-white flex items-center gap-3 py-1">
                            <Target className="w-8 h-8 text-blue-400" /> Cấu trúc của một Prompt tốt
                        </h2>
                        <p className="text-slate-400">6 thành phần chính tạo nên một prompt hiệu quả:</p>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {promptAnatomy.map((item, idx) => (
                                <GlassCard key={idx} className="p-5">
                                    <div className="flex items-center gap-3 mb-3">
                                        <item.icon className={cn("w-6 h-6", item.color)} />
                                        <h3 className="text-lg font-semibold text-white">{item.component}</h3>
                                    </div>
                                    <p className="text-slate-400 text-sm mb-3">{item.description}</p>
                                    <p className="text-xs text-slate-500 italic">VD: {item.example}</p>
                                </GlassCard>
                            ))}
                        </div>
                    </motion.section>

                    {/* Section 3: Weak vs Strong Prompts */}
                    {/* Section 4: Weak vs Strong Prompts */}
                    <motion.section id="weak-strong" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="space-y-6 scroll-mt-32">
                        <h2 className="text-3xl font-bold text-white flex items-center gap-3 py-1">
                            <Zap className="w-8 h-8 text-yellow-400" /> So sánh Prompt Tốt và Xấu
                        </h2>
                        <div className="space-y-6">
                            {promptComparison.map((item, idx) => (
                                <GlassCard key={idx} className="p-6">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-3">
                                            <div className="flex items-center gap-2 text-red-400"><XCircle className="w-5 h-5" /> Weak Prompt</div>
                                            <p className="text-slate-300 font-mono text-sm bg-slate-800/50 p-3 rounded">"{item.weak}"</p>
                                            <ul className="text-sm text-slate-500 space-y-1">
                                                {item.weakIssues.map((issue, i) => <li key={i}>• {issue}</li>)}
                                            </ul>
                                        </div>
                                        <div className="space-y-3">
                                            <div className="flex items-center gap-2 text-green-400"><CheckCircle className="w-5 h-5" /> Strong Prompt</div>
                                            <p className="text-slate-300 font-mono text-sm bg-green-900/20 p-3 rounded border border-green-500/30">"{item.strong}"</p>
                                            <ul className="text-sm text-green-400/80 space-y-1">
                                                {item.strongBenefits.map((benefit, i) => <li key={i}>✓ {benefit}</li>)}
                                            </ul>
                                        </div>
                                    </div>
                                </GlassCard>
                            ))}
                        </div>
                    </motion.section>

                    {/* Section 4: How AI Understands Prompts */}
                    {/* Section 5: How AI Understands Language */}
                    <motion.section id="ai-understanding" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="space-y-6 scroll-mt-32">
                        <h2 className="text-3xl font-bold text-white flex items-center gap-3 py-1">
                            <Brain className="w-8 h-8 text-pink-400" /> AI Hiểu Prompts Như Thế Nào?
                        </h2>
                        <div className="grid md:grid-cols-2 gap-4">
                            {aiUnderstanding.map((item, idx) => (
                                <GlassCard key={idx} className="p-5">
                                    <div className="flex items-center gap-3 mb-3">
                                        <item.icon className="w-6 h-6 text-pink-400" />
                                        <h3 className="text-lg font-semibold text-white">{item.concept}</h3>
                                    </div>
                                    <p className="text-slate-400 text-sm">{item.description}</p>
                                </GlassCard>
                            ))}
                        </div>
                    </motion.section>

                    {/* Section 6: Zero-Shot vs Few-Shot */}
                    {/* Section 6: Zero-Shot vs Few-Shot */}
                    <motion.section id="shot-learning" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="space-y-6 scroll-mt-32">
                        <h2 className="text-3xl font-bold text-white flex items-center gap-3 py-1">
                            <Lightbulb className="w-8 h-8 text-amber-400" /> Kỹ thuật Zero-Shot & Few-Shot
                        </h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <GlassCard className="p-6">
                                <h3 className="text-xl font-bold text-blue-400 mb-3">{shotLearning.zeroShot.title}</h3>
                                <p className="text-slate-400 mb-4">{shotLearning.zeroShot.description}</p>
                                <div className="p-3 bg-blue-900/20 rounded-lg font-mono text-sm text-slate-300 mb-4">&quot;{shotLearning.zeroShot.example}&quot;</div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-xs text-green-400 mb-2">✓ Pros</p>
                                        {shotLearning.zeroShot.pros.map((p, i) => <p key={i} className="text-sm text-slate-400">• {p}</p>)}
                                    </div>
                                    <div>
                                        <p className="text-xs text-red-400 mb-2">✗ Cons</p>
                                        {shotLearning.zeroShot.cons.map((c, i) => <p key={i} className="text-sm text-slate-400">• {c}</p>)}
                                    </div>
                                </div>
                            </GlassCard>
                            <GlassCard className="p-6 border-amber-500/30">
                                <h3 className="text-xl font-bold text-amber-400 mb-3">{shotLearning.fewShot.title}</h3>
                                <p className="text-slate-400 mb-4">{shotLearning.fewShot.description}</p>
                                <div className="p-3 bg-amber-900/20 rounded-lg font-mono text-xs text-slate-300 mb-4">&quot;{shotLearning.fewShot.example}&quot;</div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-xs text-green-400 mb-2">✓ Pros</p>
                                        {shotLearning.fewShot.pros.map((p, i) => <p key={i} className="text-sm text-slate-400">• {p}</p>)}
                                    </div>
                                    <div>
                                        <p className="text-xs text-red-400 mb-2">✗ Cons</p>
                                        {shotLearning.fewShot.cons.map((c, i) => <p key={i} className="text-sm text-slate-400">• {c}</p>)}
                                    </div>
                                </div>
                            </GlassCard>
                        </div>
                        <GlassCard className="p-4 bg-amber-500/10 border-amber-500/30">
                            <p className="text-amber-300 text-sm">💡 <strong>Khi nào dùng Few-Shot?</strong> Khi cần kiểm soát format output, làm task không phổ biến, hoặc cần AI follow pattern cụ thể.</p>
                        </GlassCard>
                    </motion.section>

                    {/* Section 6: Advanced Techniques */}
                    {/* Section 6: Advanced Techniques */}
                    <motion.section id="advanced" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="space-y-6 scroll-mt-32">
                        <h2 className="text-3xl font-bold text-white flex items-center gap-3 py-1">
                            <Sparkles className="w-8 h-8 text-amber-400" /> Kỹ thuật nâng cao
                        </h2>
                        <div className="space-y-4">
                            {advancedTechniques.map((item, idx) => (
                                <GlassCard key={idx} className="p-6">
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 bg-amber-500/20 rounded-xl">
                                            <item.icon className="w-6 h-6 text-amber-400" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-xl font-semibold text-white mb-2">{item.technique}</h3>
                                            <p className="text-slate-400 mb-3">{item.description}</p>
                                            <div className="p-3 bg-slate-800/50 rounded-lg font-mono text-sm text-cyan-300 mb-3">{item.example}</div>
                                            <p className="text-sm text-green-400">✓ {item.benefit}</p>
                                        </div>
                                    </div>
                                </GlassCard>
                            ))}
                        </div>
                    </motion.section>

                    {/* Section 8: AI Hallucinations & Bias */}
                    {/* Section 8: AI Hallucinations & Bias */}
                    <motion.section id="ai-issues" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="space-y-6 scroll-mt-32">
                        <h2 className="text-3xl font-bold text-white flex items-center gap-3 py-1">
                            <AlertTriangle className="w-8 h-8 text-red-400" /> Ảo giác & Thiên kiến AI
                        </h2>
                        <p className="text-slate-400">Hai vấn đề quan trọng cần biết khi sử dụng AI - luôn áp dụng Human-in-the-Loop:</p>
                        <div className="grid md:grid-cols-2 gap-6">
                            {aiIssues.map((item, idx) => (
                                <GlassCard key={idx} className="p-6">
                                    <h3 className={cn("text-xl font-bold mb-3", item.color)}>{item.issue}</h3>
                                    <p className="text-slate-400 mb-4">{item.description}</p>
                                    <div className="p-3 bg-slate-800/50 rounded-lg text-sm text-slate-300 mb-4">
                                        <strong>Ví dụ:</strong> {item.example}
                                    </div>
                                    <p className="text-sm text-green-400">✓ Giải pháp: {item.solution}</p>
                                </GlassCard>
                            ))}
                        </div>
                    </motion.section>

                    {/* Section 9: Iteration Methods */}
                    {/* Section 9: Iteration Methods */}
                    <motion.section id="iteration" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="space-y-6 scroll-mt-32">
                        <h2 className="text-3xl font-bold text-white flex items-center gap-3 py-1">
                            <RefreshCw className="w-8 h-8 text-emerald-400" /> 4 Cách Cải Tiến Prompt (Iteration)
                        </h2>
                        <p className="text-slate-400">Không ai viết perfect prompt lần đầu. Đây là 4 phương pháp iterate để cải thiện:</p>
                        <div className="grid md:grid-cols-2 gap-4">
                            {iterationMethods.map((item, idx) => (
                                <GlassCard key={idx} className="p-5">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center text-emerald-400 font-bold">{idx + 1}</div>
                                        <h3 className="text-lg font-semibold text-white">{item.method}</h3>
                                    </div>
                                    <p className="text-slate-400 text-sm mb-2">{item.description}</p>
                                    <p className="text-xs text-cyan-300 font-mono bg-slate-800/50 p-2 rounded">{item.example}</p>
                                </GlassCard>
                            ))}
                        </div>
                    </motion.section>

                    {/* Section 10: Best Practices */}
                    {/* Section 10: Best Practices */}
                    <motion.section id="best-practices" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="space-y-6 scroll-mt-32">
                        <h2 className="text-3xl font-bold text-white flex items-center gap-3 py-1">
                            <Shield className="w-8 h-8 text-blue-400" /> Lời khuyên cốt lõi
                        </h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {bestPractices.map((item, idx) => (
                                <GlassCard key={idx} className="p-5">
                                    <div className="flex items-center gap-2 mb-3">
                                        <CheckCircle className="w-5 h-5 text-blue-400" />
                                        <h3 className="font-semibold text-white text-sm">{item.practice}</h3>
                                    </div>
                                    <p className="text-xs text-slate-500 font-mono bg-slate-800/50 p-2 rounded">{item.example}</p>
                                </GlassCard>
                            ))}
                        </div>
                    </motion.section>

                    {/* Section 11: AI Agents */}
                    {/* Section 11: AI Agents */}
                    <motion.section id="ai-agents" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="space-y-6 scroll-mt-32">
                        <h2 className="text-3xl font-bold text-white flex items-center gap-3 py-1">
                            <Users className="w-8 h-8 text-violet-400" /> Tạo AI Agents
                        </h2>
                        <p className="text-slate-400">{aiAgents.description}</p>
                        <div className="grid md:grid-cols-2 gap-6">
                            {aiAgents.types.map((agent, idx) => (
                                <GlassCard key={idx} className="p-6">
                                    <h3 className="text-lg font-bold text-violet-400 mb-2">{agent.type}</h3>
                                    <p className="text-slate-400 text-sm mb-3">{agent.description}</p>
                                    <div className="p-3 bg-violet-900/20 rounded-lg text-sm text-slate-300 mb-3">{agent.example}</div>
                                    <p className="text-xs text-slate-500">Use case: {agent.useCase}</p>
                                </GlassCard>
                            ))}
                        </div>
                        <GlassCard className="p-6 bg-violet-500/10 border-violet-500/30">
                            <h4 className="font-bold text-violet-300 mb-3">📋 5 Bước Tạo AI Agent:</h4>
                            <ol className="grid md:grid-cols-5 gap-4">
                                {aiAgents.creationSteps.map((step, idx) => (
                                    <li key={idx} className="flex items-center gap-2 text-sm text-slate-300">
                                        <span className="w-6 h-6 bg-violet-500/30 rounded-full flex items-center justify-center text-violet-300 text-xs font-bold">{idx + 1}</span>
                                        {step}
                                    </li>
                                ))}
                            </ol>
                        </GlassCard>
                    </motion.section>

                    {/* Section 12: Context Engineering */}
                    {/* Section 12: Context Engineering */}
                    <motion.section id="context-engineering" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="space-y-6 scroll-mt-32">
                        <h2 className="text-3xl font-bold text-white flex items-center gap-3 py-1">
                            <Layers className="w-8 h-8 text-violet-400" /> Kỹ thuật ngữ cảnh vs Code cảm tính
                        </h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <GlassCard className="p-6 border-red-500/30">
                                <h3 className="text-xl font-bold text-red-400 mb-3">{contextVsVibe.vibeCoding.title}</h3>
                                <p className="text-slate-400 mb-4">{contextVsVibe.vibeCoding.description}</p>
                                <div className="p-3 bg-red-900/20 rounded-lg font-mono text-sm text-slate-300 mb-4">"{contextVsVibe.vibeCoding.example}"</div>
                                <ul className="text-sm text-red-400/80 space-y-2">
                                    {contextVsVibe.vibeCoding.issues.map((issue, i) => <li key={i}>❌ {issue}</li>)}
                                </ul>
                            </GlassCard>
                            <GlassCard className="p-6 border-green-500/30">
                                <h3 className="text-xl font-bold text-green-400 mb-3">{contextVsVibe.contextEngineering.title}</h3>
                                <p className="text-slate-400 mb-4">{contextVsVibe.contextEngineering.description}</p>
                                <div className="p-3 bg-green-900/20 rounded-lg font-mono text-sm text-slate-300 mb-4">"{contextVsVibe.contextEngineering.example}"</div>
                                <ul className="text-sm text-green-400/80 space-y-2">
                                    {contextVsVibe.contextEngineering.benefits.map((benefit, i) => <li key={i}>✓ {benefit}</li>)}
                                </ul>
                            </GlassCard>
                        </div>
                    </motion.section>

                    {/* Section 8: Tools Comparison */}
                    {/* Section 13: Tools Comparison */}
                    <motion.section id="tools" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="space-y-6 scroll-mt-32">
                        <h2 className="text-3xl font-bold text-white flex items-center gap-3 py-1">
                            <Cpu className="w-8 h-8 text-teal-400" /> So sánh các công cụ
                        </h2>
                        <GlassCard className="p-6 overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="text-left text-slate-400 border-b border-slate-700">
                                        <th className="pb-3 pr-4">Công cụ</th>
                                        <th className="pb-3 pr-4">Mô hình</th>
                                        <th className="pb-3 pr-4">Bộ nhớ ngữ cảnh</th>
                                        <th className="pb-3 pr-4">Điểm mạnh</th>
                                        <th className="pb-3">Phù hợp nhất</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {toolsComparison.map((tool, idx) => (
                                        <tr key={idx} className="border-b border-slate-800 text-slate-300">
                                            <td className="py-3 pr-4 font-semibold text-teal-400">{tool.tool}</td>
                                            <td className="py-3 pr-4">{tool.model}</td>
                                            <td className="py-3 pr-4">{tool.contextWindow}</td>
                                            <td className="py-3 pr-4">{tool.strengths}</td>
                                            <td className="py-3">{tool.bestFor}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </GlassCard>
                    </motion.section>

                    {/* Section 9: Multimodal Prompting */}
                    {/* Section 14: Multimodal */}
                    <motion.section id="multimodal" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="space-y-6 scroll-mt-32">
                        <h2 className="text-3xl font-bold text-white flex items-center gap-3 py-1">
                            <Eye className="w-8 h-8 text-indigo-400" /> Prompt đa phương thức
                        </h2>
                        <GlassCard className="p-6">
                            <p className="text-slate-300 mb-6">Multimodal prompting cho phép AI xử lý và phản hồi với nhiều loại input khác nhau, tạo ra responses giàu context hơn.</p>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {multimodalTypes.map((item, idx) => (
                                    <div key={idx} className="text-center p-4 bg-slate-800/50 rounded-xl">
                                        <item.icon className={cn("w-10 h-10 mx-auto mb-3", item.color)} />
                                        <h4 className="font-semibold text-white mb-1">{item.type}</h4>
                                        <p className="text-xs text-slate-500">{item.description}</p>
                                    </div>
                                ))}
                            </div>
                        </GlassCard>
                    </motion.section>

                    {/* Section 10: Common Pitfalls */}
                    {/* Section 15: Common Pitfalls */}
                    <motion.section id="pitfalls" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="space-y-6 scroll-mt-32">
                        <h2 className="text-3xl font-bold text-white flex items-center gap-3 py-1">
                            <AlertTriangle className="w-8 h-8 text-orange-400" /> Các lỗi thường gặp
                        </h2>
                        <div className="space-y-4">
                            {commonPitfalls.map((item, idx) => (
                                <GlassCard key={idx} className="p-5">
                                    <div className="flex items-start gap-4">
                                        <div className="p-2 bg-orange-500/20 rounded-lg">
                                            <AlertTriangle className="w-5 h-5 text-orange-400" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-white mb-1">{item.pitfall}</h4>
                                            <p className="text-sm text-red-400/80 mb-2">→ {item.consequence}</p>
                                            <p className="text-sm text-green-400">✓ Fix: {item.solution}</p>
                                        </div>
                                    </div>
                                </GlassCard>
                            ))}
                        </div>
                    </motion.section>

                    {/* Section 16: Use Cases */}
                    {/* Section 16: Use Cases */}
                    <motion.section id="use-cases" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="space-y-6 scroll-mt-32">
                        <h2 className="text-3xl font-bold text-white flex items-center gap-3 py-1">
                            <Wand2 className="w-8 h-8 text-cyan-400" /> Ứng dụng theo ngành nghề
                        </h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {useCases.map((item, idx) => (
                                <GlassCard key={idx} className="p-5 hover:scale-105 transition-transform">
                                    <div className={cn("w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center mb-4", item.color)}>
                                        <item.icon className="w-6 h-6 text-white" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-white mb-3">{item.industry}</h3>
                                    <ul className="text-sm text-slate-400 space-y-1">
                                        {item.tasks.map((task, i) => <li key={i}>• {task}</li>)}
                                    </ul>
                                </GlassCard>
                            ))}
                        </div>
                    </motion.section>

                    {/* Section 17: Glossary */}
                    {/* Section 17: Glossary */}
                    <motion.section id="glossary" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="space-y-6 scroll-mt-32">
                        <h2 className="text-3xl font-bold text-white flex items-center gap-3 py-1">
                            <BookOpen className="w-8 h-8 text-rose-400" /> Từ điển thuật ngữ
                        </h2>
                        <GlassCard className="p-6">
                            <div className="grid md:grid-cols-2 gap-4">
                                {glossary.map((item, idx) => (
                                    <div key={idx} className="p-4 bg-slate-800/50 rounded-lg">
                                        <h4 className="font-semibold text-rose-400 mb-1">{item.term}</h4>
                                        <p className="text-sm text-slate-400">{item.definition}</p>
                                    </div>
                                ))}
                            </div>
                        </GlassCard>
                    </motion.section>

                    {/* Section 13: Key Takeaways */}
                    {/* Section 18: Key Takeaways */}
                    <motion.section id="takeaways" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="space-y-6 scroll-mt-32">
                        <h2 className="text-3xl font-bold text-white flex items-center gap-3 py-1">
                            <Lightbulb className="w-8 h-8 text-yellow-400" /> Tổng kết bài học
                        </h2>
                        <GlassCard className="p-6">
                            <ol className="space-y-3">
                                {keyTakeaways.map((item, idx) => (
                                    <li key={idx} className="flex items-start gap-3">
                                        <span className="flex-shrink-0 w-6 h-6 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center text-white text-xs font-bold">{idx + 1}</span>
                                        <span className="text-slate-300">{item}</span>
                                    </li>
                                ))}
                            </ol>
                        </GlassCard>
                    </motion.section>

                    {/* Back to Top */}
                    <div className="text-center pt-8">
                        <button onClick={scrollToTop} className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-full transition-colors">
                            <ChevronUp className="w-5 h-5" /> Lên đầu trang
                        </button>
                    </div>
                </main>
            </div>
        </div>
    );
}
