'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
    ArrowLeft, Sparkles, AlertTriangle, CheckCircle, XCircle, Brain, Shield,
    AlertCircle, Menu, ChevronUp, Clock, Zap
} from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import { cn } from '@/lib/utils';
import { motion, useScroll, useSpring } from 'framer-motion';


// DATA: Khái niệm chính

const keyConcepts = [
    {
        term: 'Vibe Coding',
        definition: 'Lập trình bằng cảm hứng, không cần hiểu code, chỉ cần ra lệnh cho AI. Thuật ngữ "vibe" ám chỉ cảm giác thoải mái, thư giãn - trái ngược với căng thẳng truyền thống của lập trình.',
        icon: Sparkles,
        color: 'text-purple-400'
    },
    {
        term: 'Ảo giác (Hallucinations)',
        definition: 'AI tạo ra thông tin, mã giả mạo hoặc không tồn tại nhưng trình bày rất tự tin. AI không hiểu ý nghĩa mà chỉ dự đoán từ tiếp theo dựa trên dữ liệu lớn.',
        icon: AlertTriangle,
        color: 'text-amber-400'
    },
    {
        term: 'AI Slop',
        definition: 'Thuật ngữ chỉ mã số, nội dung kỹ thuật do AI tạo ra có chất lượng thấp, nhiều lỗi, không an toàn. Nguồn gốc: AI học từ mã chất lượng kém trên internet.',
        icon: XCircle,
        color: 'text-red-400'
    },
    {
        term: 'Nợ bảo mật (Security Debt)',
        definition: 'Tích tụ các lỗi bảo mật do sao chép mã không hiểu rõ nguyên nhân, dẫn đến rủi ro lớn cho hệ thống (API key bị lộ, khóa API bị mã hóa cứng...).',
        icon: Shield,
        color: 'text-orange-400'
    },
    {
        term: 'Privilege Escalation',
        definition: 'Lỗ hổng cho phép người dùng bình thường có quyền truy cập quản trị, gây nguy hiểm nghiêm trọng cho hệ thống.',
        icon: AlertCircle,
        color: 'text-red-500'
    },
    {
        term: 'AI-Assisted Programming',
        definition: 'Mô hình đúng đắn: AI là công cụ hỗ trợ, con người là người kiểm soát và xác định mã. Hiểu trước - dùng sau.',
        icon: CheckCircle,
        color: 'text-emerald-400'
    }
];


// DATA: Bảng so sánh

const comparisonData = [
    { criteria: 'Vai trò con người', vibe: 'Ra lệnh và sao chép mã AI tạo', assisted: 'Là người điều khiển, xác minh và chỉnh sửa mã' },
    { criteria: 'Tính an toàn', vibe: 'Thấp, nhiều lỗi bảo mật và ảo giác', assisted: 'Cao hơn, kiểm tra kỹ lưỡng và đảm bảo chất lượng' },
    { criteria: 'Phát triển kỹ năng', vibe: 'Thụ động, mất trải nghiệm sửa lỗi và hiểu sâu về mã', assisted: 'Tăng cường kỹ năng nhờ AI hỗ trợ nhưng vẫn duy trì kiến thức nền tảng' },
    { criteria: 'Chi phí lỗi', vibe: 'Cao do mã chất lượng kém, thiếu kiểm soát', assisted: 'Ít hơn do có sự kiểm soát của người dùng và AI hỗ trợ' },
    { criteria: 'Tác động lâu dài', vibe: 'Gây hổng nhân sự, mất kỹ năng lập trình trung cấp', assisted: 'Duy trì sự phát triển bền vững về kỹ năng và ngành công nghiệp' }
];


// DATA: Case Studies thực tế

const caseStudies = [
    {
        name: 'Leo',
        issue: 'Xây dựng ứng dụng nhanh nhờ AI nhưng bị tấn công, lộ API key, bị spam cơ sở dữ liệu.',
        result: 'Phải đóng dịch vụ',
        icon: '💀'
    },
    {
        name: 'Jack Fry',
        issue: 'Ứng dụng bị hack tạo ra 12.000 tài khoản giả.',
        result: 'Phải tắt máy chủ',
        icon: '🔥'
    },
    {
        name: 'Jinyang',
        issue: 'Thiếu kinh nghiệm triển khai và giám sát.',
        result: 'Hóa đơn cloud tăng 24.000% ($96,000 USD)',
        icon: '💸'
    }
];


// DATA: Các vấn đề phân tích

const analysisProblems = [
    {
        title: 'Ảo giác AI và tính toán không chính xác',
        content: 'AI không hiểu ý nghĩa mà chỉ dự đoán từ tiếp theo dựa trên dữ liệu lớn, dẫn đến việc tạo ra nhiều lỗi, ví dụ như chức năng không tồn tại hoặc bịa đặt các tham số cài đặt.'
    },
    {
        title: 'Nguồn dữ liệu huấn luyện chất lượng thấp',
        content: 'AI học từ nguồn mở trên internet, phần lớn là mã chất lượng kém, ví dụ mã cá nhân, hướng dẫn sai, hay viết ẩu, dẫn đến việc sao chép các thói quen xấu như khóa API bị mã hóa cứng.'
    },
    {
        title: 'Nghiên cứu từ Stanford',
        content: 'Lập trình viên sử dụng mã viết bởi AI thường cảm thấy an tâm hơn nhưng lại tin tưởng quá mức vào chất lượng mã đó, tạo ra một vòng lặp nguy hiểm giữa tự động hóa và thiếu kỹ năng thực sự.'
    },
    {
        title: 'Tác động tiêu cực tới lập trình viên',
        content: 'AI làm mất đi những trải nghiệm quan trọng với các nhiệm vụ lặp lại, giúp lập trình viên mới xây dựng trực giác kỹ thuật và kỹ năng sửa lỗi. Hậu quả là mất đi nguồn nhân lực kỹ sư trung cấp, xương sống của ngành công nghệ.'
    },
    {
        title: 'Rủi ro khi AI tự hành động',
        content: 'Các ví dụ AI có quyền tự chủ như nền tảng Rabbit hay AI Claudius cho thấy nguy cơ AI gây ra thiệt hại lớn khi hành xử không kiểm soát, thậm chí nói dối, bịa đặt trong các tình huống thảo luận.'
    }
];


// DATA: Ưu điểm của Vibe Coding

const advantages = [
    {
        title: 'Tốc độ cực nhanh',
        content: 'AI có thể tạo cấu trúc, hàm, chương trình nhanh hơn nhiều lần so với tự viết từng dòng mã.'
    },
    {
        title: 'Phù hợp giai đoạn đầu dự án',
        content: 'Dựng khung, viết đoạn mã lặp đi lặp lại hoặc tạo bản demo, nguyên mẫu nhanh chóng để trình bày ý tưởng.'
    },
    {
        title: 'Giảm rào cản gia nhập',
        content: 'Giúp người mới, người không chuyên biến ý tưởng thành sản phẩm chạy được mà không cần hiểu sâu về kỹ thuật.'
    },
    {
        title: 'Vượt qua giai đoạn bí ý tưởng',
        content: 'Khi không biết bắt đầu từ đâu, AI sẽ tạo ra mã mẫu để tham khảo, kích thích tư duy, mở ra hướng tiếp cận mới.'
    }
];


// DATA: Nguy cơ và rủi ro

const risks = [
    {
        title: 'Mất gốc kiến thức nền tảng',
        content: 'Bỏ qua quá trình nghiên cứu, thực hành, vật lộn với khái niệm khó để hiểu bản chất kỹ thuật.'
    },
    {
        title: 'Thói quen "lười tư duy"',
        content: 'AI quá tiện lợi làm người dùng ỷ lại, dẫn đến khả năng chuyên môn bị thui chột, mất kỹ năng khi không còn tự mã nữa.'
    },
    {
        title: 'Nguy hiểm trong lĩnh vực an toàn cao',
        content: 'Trong phát triển phần mềm cho ô tô – nơi yêu cầu an toàn cao và độ chính xác tuyệt đối, một lỗi nhỏ có thể đe dọa tính mạng người dùng.'
    },
    {
        title: 'AI đập đi viết lại thay vì sửa cục bộ',
        content: 'Không phù hợp với môi trường sản xuất phần mềm phức tạp, yêu cầu bảo trì lâu dài.'
    }
];


// DATA: Nguyên tắc làm việc với AI

const principles = [
    {
        number: '01',
        title: 'Hiểu bản thân trước khi tin AI',
        description: 'Cần có kiến thức nền tảng về lập trình (ví dụ C/C++) và hiểu rõ các đoạn mã mình làm. AI có thể sai sót về khả năng đánh giá ý nghĩa, mức độ tối ưu.',
        color: 'text-purple-400'
    },
    {
        number: '02',
        title: 'AI chỉ là công cụ hỗ trợ',
        description: 'AI dựa trên xác suất và dữ liệu lớn, chưa có độ sâu logic hay nhận thức an toàn như con người. Luôn nhận thức giới hạn và khả năng sai sót của AI.',
        color: 'text-pink-400'
    },
    {
        number: '03',
        title: 'Giữ vai trò chủ động, đưa ra quyết định',
        description: 'Lập trình viên là người điều khiển, đưa ra yêu cầu, phân tích vấn đề nhỏ, có thể chọn phương án thay vì phó mặc cho AI. AI chỉ là driver hỗ trợ hệ thống.',
        color: 'text-blue-400'
    },
    {
        number: '04',
        title: 'Kiểm tra nghiêm ngặt (Verify)',
        description: 'Đọc và hiểu từng dòng code do AI viết, kiểm tra tính logic, an toàn, chuẩn mã hóa. Thực hiện kiểm tra kỹ lưỡng trong nhiều điều kiện trước khi tích hợp vào dự án.',
        color: 'text-emerald-400'
    },
    {
        number: '05',
        title: 'Biến AI thành "gia sư cá nhân"',
        description: 'Dùng AI để tìm kiếm, tổng hợp kiến thức, giải thích khái niệm phức tạp, so sánh ưu điểm, review code để cải thiện. Tập trung hỏi "tại sao", "như thế nào" để đào sâu kiến thức.',
        color: 'text-amber-400'
    },
    {
        number: '06',
        title: 'Sử dụng Git hiệu quả',
        description: 'Lưu lại lịch sử commit để hỗ trợ rollback khi AI code sai hoặc sai ý, tránh mất mã. Git là công cụ hỗ trợ thiết yếu khi sử dụng AI Agent trong dự án.',
        color: 'text-cyan-400'
    },
    {
        number: '07',
        title: 'Chuẩn bị spec chi tiết',
        description: 'Cần chuẩn bị chi tiết thông số kỹ thuật (bảng đặc tả), rõ ràng về hệ thống để tác nhân AI thực hiện đúng yêu cầu. Phân chia nhiệm vụ nhỏ, cụ thể.',
        color: 'text-violet-400'
    },
    {
        number: '08',
        title: 'Phân biệt Engineer vs Developer',
        description: 'Kỹ sư (Engineer) thiết kế, vận hành, bảo trì hệ thống toàn diện. Coder chỉ viết mã đơn thuần. Hãy hướng tới việc trở thành kỹ sư với tư duy hệ thống.',
        color: 'text-rose-400'
    }
];


// DATA: Công cụ AI

const aiTools = [
    { name: 'Builder', type: 'Plugin Figma', use: 'Tạo mã giao diện từ file thiết kế Figma', pros: 'Tự động tạo HTML/CSS/JS responsive; hỗ trợ nhiều framework', cons: 'Giới hạn token (~1000 từ); thích hợp cho thành phần nhỏ' },
    { name: 'Lovable', type: 'Full Project Builder', use: 'Tạo giao diện, code frontend và backend fullstack', pros: 'Tạo dự án hoàn thiện, responsive, animation, dark mode, backend (Supabase)', cons: 'Giới hạn bản miễn phí; cần trả phí $20-50/tháng' },
    { name: 'Cursor AI', type: 'AI IDE', use: 'Hỗ trợ viết, gỡ lỗi, tạo mã trực tiếp trong IDE', pros: 'Chat AI giúp viết và sửa code nhanh; Dễ dùng cho dev quen IDE', cons: 'Bản miễn phí giới hạn tính năng; AI chưa hoàn hảo' },
    { name: 'Windsurf', type: 'AI IDE', use: 'Context-aware, hiểu dự án sâu, quản lý Flow state', pros: 'Hiểu ngữ cảnh dự án tốt; Tự động đề xuất thay đổi phù hợp', cons: 'Cần cung cấp context/rules tốt' },
    { name: 'V0 (Vercel)', type: 'UI Generator', use: 'Tạo UI components nhanh chóng', pros: 'Tích hợp React/Next.js; Phản hồi tốt trên nhiều thiết bị', cons: 'Chuyên về UI, không phải full project' },
    { name: 'ChatGPT', type: 'General AI', use: 'Tư duy tổng quát, giải thích khái niệm, lên khung sườn', pros: 'Đa năng; Có thể hỏi đáp vòng lặp', cons: 'Cần prompt chính xác' },
    { name: 'Claude 3.5', type: 'Coding AI', use: 'Viết code (Coding logic) được đánh giá tốt hơn ChatGPT', pros: 'Logic code mạnh; Hiểu context dài', cons: 'Có thể chậm hơn' },
    { name: 'Blackbox AI', type: 'Code Extractor', use: 'Copy code từ video hoặc ảnh', pros: 'Tiện lợi khi học từ video', cons: 'Chuyên dụng, hạn chế chức năng' },
    { name: 'Perplexity', type: 'AI Search', use: 'Tìm thông tin và tổng hợp có dẫn chứng nguồn', pros: 'Đỡ bị tin giả; Có nguồn tham khảo', cons: 'Không chuyên về code' }
];


// DATA: Lộ trình xây dựng ứng dụng

const buildRoadmap = [
    {
        step: '1',
        title: 'Tư duy giải quyết vấn đề',
        content: 'Xem mình là người giải quyết vấn đề, không chỉ là lập trình viên. Người dùng sẵn sàng thanh toán nếu bạn giúp họ: Giải quyết nỗi đau, Tiết kiệm thời gian, Giúp họ kiếm nhiều tiền hơn.'
    },
    {
        step: '2',
        title: 'Đặt mục tiêu rõ ràng',
        content: '"Tôi muốn tạo một ứng dụng làm X để giải quyết vấn đề Y cho nhóm người dùng Z." Tập trung phát triển v1 với: Simple (đơn giản), Lovable (đáng yêu), Complete (hoàn chỉnh).'
    },
    {
        step: '3',
        title: 'Chọn công nghệ phù hợp',
        content: 'Khi đã chọn ngôn ngữ và tech stack, hãy triển khai theo cảm giác thay vì nhảy qua nhiều ngôn ngữ, tránh "Shiny Object Syndrome". Sử dụng Roadmap.sh và Scrimba để học.'
    },
    {
        step: '4',
        title: 'Mô hình kiếm tiền',
        content: 'One-time payment: Thu tiền nhanh. Subscription: Thu nhập định kỳ, vững chắc. Nền tảng: Stripe (phổ biến), Lemon Squeezy (Indie Dev), Paddle (quản lý thuế quốc tế).'
    },
    {
        step: '5',
        title: 'Triển khai ứng dụng',
        content: 'Web: Vercel, Netlify, AWS Amplify. Mobile: App Store, Google Play. Extension: Chrome Web Store, Firefox Add-ons.'
    },
    {
        step: '6',
        title: 'Landing Page & Marketing',
        content: 'Tạo tiêu đề rõ ràng, hình ảnh/demo minh họa, bằng chứng xã hội (Social Proof). Quảng bá: Reddit, Product Hunt, Twitter. Chia sẻ câu chuyện thực tế, tránh quảng cáo quá đà.'
    },
    {
        step: '7',
        title: 'Thu thập phản hồi & Cải tiến',
        content: 'Ưu tiên xử lý dựa trên: Tần suất (được nhắc nhiều), Nỗ lực thực thi (dễ hay khó), Tác động (giá trị mang lại). Yếu tố then chốt là tốc độ – phát hành bản cập nhật thường xuyên.'
    }
];


// DATA: Bảng thuật ngữ

const glossary = [
    { term: 'Vibe Coding', definition: 'Phương pháp lập trình sử dụng tác nhân AI để tự động sinh mã từ yêu cầu thay vì viết thủ công.' },
    { term: 'Tác nhân AI (AI Agent)', definition: 'Hệ thống AI tự động thực hiện các tác vụ cài đặt dựa trên lệnh và đặc tả của người dùng.' },
    { term: 'LLM', definition: 'Mô hình ngôn ngữ lớn giúp tạo văn bản hoặc mã tự động dựa trên dữ liệu đầu vào.' },
    { term: 'Kỹ sư (Engineer)', definition: 'Người thiết kế, vận hành, bảo trì hệ thống phần mềm toàn diện.' },
    { term: 'Lập trình viên (Developer)', definition: 'Người viết mã thuần túy, ít tham gia thiết kế hệ thống hoặc vận hành.' },
    { term: 'Triển khai (Deployment)', definition: 'Quá trình đưa ứng dụng lên môi trường sản xuất để sử dụng thực tế.' },
    { term: 'Giám sát (Monitoring)', definition: 'Theo dõi hoạt động của hệ thống sau khi khai trương.' },
    { term: 'MVP', definition: 'Sản phẩm khả thi tối thiểu, phiên bản đầu tiên để thử nghiệm ý tưởng.' },
    { term: 'POC', definition: 'Bằng chứng về tính khả thi của ý tưởng hoặc công nghệ.' }
];


// DATA: Key Takeaways

const keyTakeaways = [
    'Vibe Coding là công cụ hỗ trợ, không phải giải pháp toàn diện.',
    'Kiến thức nền tảng và tư duy hệ thống vẫn rất cần thiết trong việc phát triển phần mềm.',
    'Phân chia nhiệm vụ nhỏ, chuẩn bị spec chi tiết và sử dụng Git hiệu quả giúp tăng kiểm soát khi ứng dụng AI Agent.',
    'Tránh ảo tưởng về việc AI có thể thay thế toàn bộ người lập trình.',
    'Vibe Coding phù hợp cho dự án nhỏ, MVP, học hỏi – không nên kỳ vọng thành công nhanh ở quy mô lớn.',
    'Bảo mật, vận hành, triển khai, giám sát là những yếu tố không thể bỏ qua khi phát triển phần mềm thực tế.',
    'Vibecoding không thay thế lập trình viên mà đang phá bỏ các kỹ năng và nghề nghiệp của họ.',
    'Mô hình tương thích là lập trình được AI hỗ trợ có kiểm soát, nơi người dùng là người điều khiển.',
    'Mục tiêu sự nghiệp CNTT là trở thành kỹ sư hoặc kiến trúc sư phần mềm, không chỉ là lập trình viên.',
    'AI là bước tiến công nghệ lớn, không thể đứng ngoài cuộc, nhưng phải biết đi theo dòng chảy AI một cách tỉnh táo và kiểm soát chặt chẽ.'
];

// TOC Structure
const tocItems = [
    { id: 'concepts', label: '1. Khái niệm chính' },
    { id: 'history', label: '2. Nguồn gốc & Lịch sử' },
    { id: 'analysis', label: '3. Vấn đề phân tích' },
    { id: 'comparison', label: '4. So sánh' },
    { id: 'case-studies', label: '5. Case Studies' },
    { id: 'advantages', label: '6. Ưu điểm' },
    { id: 'risks', label: '7. Nguy cơ & Rủi ro' },
    { id: 'principles', label: '8. Nguyên tắc' },
    { id: 'tools', label: '9. Công cụ AI' },
    { id: 'roadmap', label: '10. Lộ trình' },
    { id: 'glossary', label: '11. Thuật ngữ' },
    { id: 'takeaways', label: '12. Ghi nhớ' },
];

export default function VibeCodingPage() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const [activeSection, setActiveSection] = useState('concepts');
    const [isTocOpen, setIsTocOpen] = useState(false);

    // Animation Variants
    const fadeInUp = {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };
    useEffect(() => {
        const handleScroll = () => {
            const sections = tocItems.map(item => document.getElementById(item.id));
            const scrollPosition = window.scrollY + 200; // Offset for better detection

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

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <main className="min-h-screen pt-32 pb-20 px-4 md:px-12 bg-[#0a0a0a] text-white relative overflow-hidden">

            {/* Reading Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 z-50 origin-left"
                style={{ scaleX }}
            />

            {/* Background Effects */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-[15%] left-[50%] w-[500px] h-[500px] bg-purple-500/05 rounded-full blur-[120px]" />
                <div className="absolute bottom-[30%] right-[15%] w-96 h-96 bg-pink-500/05 rounded-full blur-[100px]" />
            </div>

            <div className="max-w-7xl mx-auto relative z-10 flex flex-col lg:flex-row gap-12">

                {/* Sidebar / TOC */}
                <aside className={`
                     lg:w-64 fixed lg:sticky top-24 left-0 h-screen lg:h-[calc(100vh-8rem)]
                     bg-neutral-900/95 lg:bg-transparent backdrop-blur-xl lg:backdrop-blur-none
                     border-r lg:border-none border-white/10 z-40 transition-transform duration-300
                     ${isTocOpen ? 'translate-x-0 w-3/4 p-6' : '-translate-x-full lg:translate-x-0 w-0 lg:w-64'}
                `}>
                    <div className="h-full overflow-y-auto no-scrollbar pb-10">
                        <h4 className="font-bold text-neutral-500 uppercase text-xs tracking-wider mb-4 px-4 hidden lg:block">
                            MỤC LỤC
                        </h4>
                        <nav className="space-y-1">
                            {tocItems.map((item) => (
                                <Link
                                    key={item.id}
                                    href={`#${item.id}`}
                                    onClick={() => setIsTocOpen(false)}
                                    className={cn(
                                        "block px-4 py-2 text-sm rounded-lg transition-all duration-200",
                                        activeSection === item.id
                                            ? "bg-white/10 text-white font-medium border-l-2 border-purple-500"
                                            : "text-neutral-400 hover:text-white hover:bg-white/5"
                                    )}
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </nav>
                    </div>
                </aside>

                {/* Mobile TOC Toggle */}
                <button
                    onClick={() => setIsTocOpen(!isTocOpen)}
                    className="lg:hidden fixed bottom-6 right-6 z-50 p-4 rounded-full bg-purple-600 text-white shadow-lg shadow-purple-900/50"
                >
                    <Menu className="w-6 h-6" />
                </button>

                {/* Back to Top */}
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-24 right-6 lg:bottom-12 lg:right-12 z-40 p-3 rounded-full bg-neutral-800 text-neutral-400 border border-white/10 hover:bg-white/10 hover:text-white transition-all shadow-lg"
                    title="Về đầu trang"
                >
                    <ChevronUp className="w-5 h-5" />
                </button>

                {/* Main Content Area */}
                <div className="flex-1 min-w-0">
                    {/* Back Link */}
                    <Link href="/wiki" className="inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors mb-8">
                        <ArrowLeft className="w-4 h-4" />
                        <span>Quay lại Wiki</span>
                    </Link>

                    {/* HERO */}
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={fadeInUp}
                        className="flex flex-col lg:flex-row gap-12 items-center mb-20"
                    >
                        <div className="flex-1">
                            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight leading-tight">
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 animate-gradient-x">
                                    Vibe Coding
                                </span>
                            </h1>
                            <p className="text-lg md:text-xl text-neutral-300 leading-relaxed mb-6">
                                Tổng hợp kiến thức về Vibe Coding và Lập trình AI. Lập trình bằng cảm hứng trong kỷ nguyên AI – Hiểu đúng để sử dụng đúng.
                            </p>
                            <div className="flex flex-wrap gap-4 text-sm text-neutral-500 border-l-2 border-purple-500/50 pl-4 bg-white/5 p-4 rounded-r-lg hover:bg-white/10 transition-colors">
                                <p>📌 <strong>Thuật ngữ:</strong> Andrej Karpathy (OpenAI)</p>
                                <p>📅 <strong>Ra mắt:</strong> 02/2024</p>
                                <p>💡 <strong>"Vibe":</strong> Cảm giác thoải mái, thư giãn</p>
                            </div>
                        </div>

                        <div className="w-full lg:w-1/3">
                            <div className="relative rounded-xl overflow-hidden shadow-2xl group cursor-pointer perspective-1000">
                                <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-xl blur-lg opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
                                <div className="relative rounded-xl overflow-hidden bg-[#0a0a0a] transform transition-transform duration-500 group-hover:scale-[1.02] group-hover:rotate-1">
                                    <Image
                                        src="https://miro.medium.com/v2/0*bvpc804iUyVH1KI7.jpg"
                                        alt="Vibe Coding"
                                        width={600}
                                        height={400}
                                        className="w-full h-auto object-cover"
                                    />
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* SECTIONS */}
                    <div className="space-y-24">

                        {/* 1. Concepts */}
                        <motion.section
                            id="concepts"
                            className="scroll-mt-32"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            variants={fadeInUp}
                        >
                            <div className="flex items-center gap-3 mb-8">
                                <span className="text-4xl font-black text-white/5">01</span>
                                <h2 className="text-3xl font-bold border-l-4 border-purple-500 pl-4">Các Khái Niệm Chính</h2>
                            </div>
                            <motion.div
                                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                                variants={staggerContainer}
                            >
                                {keyConcepts.map((concept) => {
                                    const Icon = concept.icon;
                                    return (
                                        <motion.div variants={fadeInUp} key={concept.term}>
                                            <GlassCard className="group hover:bg-white/10 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-purple-500/10 cursor-default">
                                                <div className="flex items-center gap-3 mb-3">
                                                    <div className="p-2 rounded-lg bg-white/5 group-hover:bg-white/10 transition-colors">
                                                        <Icon className={`w-6 h-6 ${concept.color}`} />
                                                    </div>
                                                    <h3 className="text-lg font-bold text-white">{concept.term}</h3>
                                                </div>
                                                <p className="text-neutral-400 text-sm leading-relaxed group-hover:text-neutral-300 transition-colors">
                                                    {concept.definition}
                                                </p>
                                            </GlassCard>
                                        </motion.div>
                                    );
                                })}
                            </motion.div>
                        </motion.section>

                        {/* 2. History */}
                        <motion.section
                            id="history"
                            className="scroll-mt-32"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            variants={fadeInUp}
                        >
                            <div className="flex items-center gap-3 mb-8">
                                <span className="text-4xl font-black text-white/5">02</span>
                                <h2 className="text-3xl font-bold border-l-4 border-blue-500 pl-4">Nguồn Gốc & Lịch Sử</h2>
                            </div>
                            <GlassCard className="prose prose-invert max-w-none hover:bg-white/5 transition-colors duration-300">
                                <ul className="space-y-4 list-none pl-0">
                                    <li className="flex gap-4">
                                        <Clock className="w-6 h-6 text-blue-400 flex-shrink-0" />
                                        <div>
                                            <strong className="text-white block mb-1">Trước AI hiện đại</strong>
                                            <span className="text-neutral-400">Lập trình thủ công hoàn toàn: Viết mã, kiểm tra, triển khai từng bước.</span>
                                        </div>
                                    </li>
                                    <li className="flex gap-4">
                                        <Zap className="w-6 h-6 text-yellow-400 flex-shrink-0" />
                                        <div>
                                            <strong className="text-white block mb-1">Kỷ nguyên LLM</strong>
                                            <span className="text-neutral-400">Các mô hình ngôn ngữ lớn (GitHub Copilot, Cursor) cho phép chuyển đổi ngôn ngữ tự nhiên thành mã.</span>
                                        </div>
                                    </li>
                                    <li className="flex gap-4">
                                        <Brain className="w-6 h-6 text-purple-400 flex-shrink-0" />
                                        <div>
                                            <strong className="text-white block mb-1">Cột mốc 02/2024</strong>
                                            <span className="text-neutral-400">Andrej Karpathy giới thiệu thuật ngữ "Vibe Coding" khi dùng AI để làm các dự án nhỏ một cách thư giãn.</span>
                                        </div>
                                    </li>
                                </ul>
                            </GlassCard>
                        </motion.section>

                        {/* 3. Analysis */}
                        <motion.section
                            id="analysis"
                            className="scroll-mt-32"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            variants={fadeInUp}
                        >
                            <div className="flex items-center gap-3 mb-8">
                                <span className="text-4xl font-black text-white/5">03</span>
                                <h2 className="text-3xl font-bold border-l-4 border-amber-500 pl-4">Vấn Đề Phân Tích</h2>
                            </div>
                            <motion.div
                                className="space-y-4"
                                variants={staggerContainer}
                            >
                                {analysisProblems.map((problem, idx) => (
                                    <motion.div variants={fadeInUp} key={idx} className="bg-neutral-900/50 border border-white/5 rounded-xl p-6 hover:border-amber-500/30 transition-colors cursor-default hover:bg-white/5">
                                        <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                                            <AlertTriangle className="w-5 h-5 text-amber-500/80" />
                                            {problem.title}
                                        </h3>
                                        <p className="text-neutral-400 leading-relaxed">{problem.content}</p>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </motion.section>

                        {/* 4. Comparison */}
                        <motion.section
                            id="comparison"
                            className="scroll-mt-32"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            variants={fadeInUp}
                        >
                            <div className="flex items-center gap-3 mb-8">
                                <span className="text-4xl font-black text-white/5">04</span>
                                <h2 className="text-3xl font-bold border-l-4 border-pink-500 pl-4">So Sánh</h2>
                            </div>
                            <div className="overflow-x-auto rounded-xl border border-white/10 bg-neutral-900/50 hover:border-white/20 transition-colors">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-white/5 border-b border-white/10">
                                            <th className="py-4 px-6 text-neutral-400 font-medium">Tiêu chí</th>
                                            <th className="py-4 px-6 text-red-400 font-medium bg-red-900/10">Vibe Coding ❌</th>
                                            <th className="py-4 px-6 text-emerald-400 font-medium bg-emerald-900/10">AI-Assisted ✅</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {comparisonData.map((row, idx) => (
                                            <tr key={idx} className="border-b last:border-0 border-white/5 hover:bg-white/5 transition-colors">
                                                <td className="py-4 px-6 text-white font-medium">{row.criteria}</td>
                                                <td className="py-4 px-6 text-neutral-400 bg-red-900/5">{row.vibe}</td>
                                                <td className="py-4 px-6 text-neutral-300 bg-emerald-900/5">{row.assisted}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </motion.section>

                        {/* 5. Case Studies */}
                        <motion.section
                            id="case-studies"
                            className="scroll-mt-32"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            variants={fadeInUp}
                        >
                            <div className="flex items-center gap-3 mb-8">
                                <span className="text-4xl font-black text-white/5">05</span>
                                <h2 className="text-3xl font-bold border-l-4 border-red-500 pl-4">Case Studies</h2>
                            </div>
                            <motion.div
                                className="grid grid-cols-1 md:grid-cols-3 gap-6"
                                variants={staggerContainer}
                            >
                                {caseStudies.map((study) => (
                                    <motion.div variants={fadeInUp} key={study.name} className="bg-red-950/20 border border-red-900/30 rounded-xl p-6 hover:bg-red-900/20 transition-colors cursor-pointer group">
                                        <div className="text-4xl mb-4 grayscale group-hover:grayscale-0 transition-all duration-300 scale-100 group-hover:scale-110">{study.icon}</div>
                                        <h3 className="text-xl font-bold text-white mb-2">{study.name}</h3>
                                        <p className="text-neutral-400 text-sm mb-4 min-h-[60px]">{study.issue}</p>
                                        <div className="inline-block px-3 py-1 rounded bg-red-900/30 text-red-400 text-xs font-bold uppercase tracking-wider group-hover:bg-red-900/50 transition-colors">
                                            {study.result}
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                            <p className="mt-4 text-center text-neutral-500 text-sm italic">
                                *Bài học: Thiếu kiến thức nền tảng về bảo mật & vận hành gây hậu quả nghiêm trọng.
                            </p>
                        </motion.section>

                        {/* 6. Advantages */}
                        <motion.section
                            id="advantages"
                            className="scroll-mt-32"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            variants={fadeInUp}
                        >
                            <div className="flex items-center gap-3 mb-8">
                                <span className="text-4xl font-black text-white/5">06</span>
                                <h2 className="text-3xl font-bold border-l-4 border-green-500 pl-4">Ưu Điểm</h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {advantages.map((adv, idx) => (
                                    <GlassCard key={idx} className="hover:border-green-500/30 hover:bg-white/5 transition-all duration-300 hover:-translate-y-1">
                                        <div className="flex items-start gap-4">
                                            <div className="p-2 rounded-lg bg-green-500/10 text-green-400">
                                                <CheckCircle className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-bold text-white mb-2">{adv.title}</h3>
                                                <p className="text-neutral-400 text-sm">{adv.content}</p>
                                            </div>
                                        </div>
                                    </GlassCard>
                                ))}
                            </div>
                        </motion.section>

                        {/* 7. Risks */}
                        <motion.section
                            id="risks"
                            className="scroll-mt-32"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            variants={fadeInUp}
                        >
                            <div className="flex items-center gap-3 mb-8">
                                <span className="text-4xl font-black text-white/5">07</span>
                                <h2 className="text-3xl font-bold border-l-4 border-orange-500 pl-4">Nguy Cơ & Rủi Ro</h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {risks.map((risk, idx) => (
                                    <GlassCard key={idx} className="!border-orange-500/20 hover:!border-orange-500/40 hover:bg-white/5 transition-all duration-300 hover:-translate-y-1">
                                        <div className="flex items-start gap-4">
                                            <div className="p-2 rounded-lg bg-orange-500/10 text-orange-400">
                                                <AlertTriangle className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-bold text-white mb-2">{risk.title}</h3>
                                                <p className="text-neutral-400 text-sm">{risk.content}</p>
                                            </div>
                                        </div>
                                    </GlassCard>
                                ))}
                            </div>
                        </motion.section>

                        {/* 8. Principles */}
                        <motion.section
                            id="principles"
                            className="scroll-mt-32"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            variants={fadeInUp}
                        >
                            <div className="flex items-center gap-3 mb-8">
                                <span className="text-4xl font-black text-white/5">08</span>
                                <h2 className="text-3xl font-bold border-l-4 border-emerald-500 pl-4">Nguyên Tắc Làm Việc</h2>
                            </div>
                            <motion.div
                                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                                variants={staggerContainer}
                            >
                                {principles.map((practice) => (
                                    <motion.div variants={fadeInUp} key={practice.number} className="relative p-6 rounded-xl border border-white/10 bg-neutral-900/30 hover:bg-neutral-900/50 transition-colors group overflow-hidden hover:shadow-lg hover:shadow-emerald-900/10">
                                        <div className={`absolute top-0 right-0 p-4 text-4xl font-black opacity-10 ${practice.color} group-hover:opacity-20 transition-opacity`}>
                                            {practice.number}
                                        </div>
                                        <h3 className={`text-lg font-bold mb-3 ${practice.color} group-hover:brightness-125 transition-all`}>
                                            {practice.title}
                                        </h3>
                                        <p className="text-neutral-400 text-sm leading-relaxed">
                                            {practice.description}
                                        </p>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </motion.section>

                        {/* 9. Tools */}
                        <motion.section
                            id="tools"
                            className="scroll-mt-32"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            variants={fadeInUp}
                        >
                            <div className="flex items-center gap-3 mb-8">
                                <span className="text-4xl font-black text-white/5">09</span>
                                <h2 className="text-3xl font-bold border-l-4 border-blue-500 pl-4">Công Cụ AI</h2>
                            </div>
                            <div className="overflow-x-auto rounded-xl border border-white/10 bg-neutral-900/50 hover:border-white/20 transition-colors">
                                <table className="w-full text-left text-sm border-collapse">
                                    <thead>
                                        <tr className="bg-white/5 border-b border-white/10">
                                            <th className="py-3 px-4 text-neutral-300 font-medium">Công cụ</th>
                                            <th className="py-3 px-4 text-neutral-400 font-medium">Loại</th>
                                            <th className="py-3 px-4 text-neutral-400 font-medium">Chức năng</th>
                                            <th className="py-3 px-4 text-emerald-400 font-medium">Ưu điểm</th>
                                            <th className="py-3 px-4 text-red-400 font-medium">Nhược điểm</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {aiTools.map((tool) => (
                                            <tr key={tool.name} className="border-b last:border-0 border-white/5 hover:bg-white/5 transition-colors">
                                                <td className="py-3 px-4 text-white font-bold">{tool.name}</td>
                                                <td className="py-3 px-4 text-neutral-400">{tool.type}</td>
                                                <td className="py-3 px-4 text-neutral-300">{tool.use}</td>
                                                <td className="py-3 px-4 text-emerald-400/80">{tool.pros}</td>
                                                <td className="py-3 px-4 text-neutral-500">{tool.cons}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </motion.section>

                        {/* 10. Roadmap */}
                        <motion.section
                            id="roadmap"
                            className="scroll-mt-32"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            variants={fadeInUp}
                        >
                            <div className="flex items-center gap-3 mb-8">
                                <span className="text-4xl font-black text-white/5">10</span>
                                <h2 className="text-3xl font-bold border-l-4 border-violet-500 pl-4">Lộ Trình Solo Startup</h2>
                            </div>
                            <div className="relative border-l-2 border-white/10 ml-4 space-y-8 pb-4">
                                {buildRoadmap.map((item) => (
                                    <div key={item.step} className="pl-8 relative group">
                                        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-violet-500 border-4 border-[#0a0a0a] group-hover:scale-125 transition-transform" />
                                        <span className="text-xs uppercase tracking-wider text-violet-400 mb-1 block">Bước {item.step}</span>
                                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-violet-300 transition-colors">{item.title}</h3>
                                        <p className="text-neutral-400 text-sm leading-relaxed max-w-2xl">{item.content}</p>
                                    </div>
                                ))}
                            </div>
                        </motion.section>

                        {/* 11. Glossary */}
                        <motion.section
                            id="glossary"
                            className="scroll-mt-32"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            variants={fadeInUp}
                        >
                            <div className="flex items-center gap-3 mb-8">
                                <span className="text-4xl font-black text-white/5">11</span>
                                <h2 className="text-3xl font-bold border-l-4 border-cyan-500 pl-4">Bảng Thuật Ngữ</h2>
                            </div>
                            <div className="grid grid-cols-1 gap-4">
                                {glossary.map((item) => (
                                    <div key={item.term} className="flex flex-col md:flex-row gap-2 md:gap-6 md:items-baseline border-b border-white/5 pb-4 last:border-0 hover:bg-white/5 p-2 rounded-lg transition-colors">
                                        <span className="text-cyan-400 font-bold min-w-[200px]">{item.term}</span>
                                        <span className="text-neutral-300 text-sm">{item.definition}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.section>

                        {/* 12. Takeaways / Core Message */}
                        <motion.section
                            id="takeaways"
                            className="scroll-mt-32"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            variants={fadeInUp}
                        >
                            <GlassCard className="!bg-gradient-to-br !from-purple-900/20 !to-pink-900/10 !border-purple-500/30 mb-12 hover:scale-[1.01] transition-transform duration-500">
                                <div className="text-center max-w-4xl mx-auto py-8">
                                    <Brain className="w-12 h-12 text-purple-400 mx-auto mb-6 animate-pulse" />
                                    <blockquote className="text-2xl md:text-3xl font-bold text-white mb-6 leading-relaxed">
                                        "Cuộc cách mạng Vibe Coding đã thất bại trong việc thay thế con người, nhưng lại mang lại bài học về sự quan trọng của trí tuệ và kinh nghiệm con người."
                                    </blockquote>
                                    <div className="flex flex-wrap gap-3 justify-center">
                                        <span className="px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-sm hover:bg-purple-500/20 cursor-default transition-colors">Hiểu trước - Dùng sau</span>
                                        <span className="px-4 py-2 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-300 text-sm hover:bg-pink-500/20 cursor-default transition-colors">Tư duy Logic-First</span>
                                        <span className="px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-sm hover:bg-blue-500/20 cursor-default transition-colors">Kiểm soát chủ động</span>
                                    </div>
                                </div>
                            </GlassCard>

                            <div className="flex items-center gap-3 mb-8">
                                <span className="text-4xl font-black text-white/5">12</span>
                                <h2 className="text-3xl font-bold text-amber-500">Ghi Nhớ Quan Trọng</h2>
                            </div>
                            <ul className="space-y-4">
                                {keyTakeaways.map((item, idx) => (
                                    <li key={idx} className="flex items-start gap-4 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-transparent hover:border-amber-500/20">
                                        <CheckCircle className="w-5 h-5 text-emerald-400 mt-1 flex-shrink-0" />
                                        <span className="text-neutral-200">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.section>

                        {/* Footer */}
                        <div className="border-t border-neutral-800 pt-8 flex justify-between items-end text-xs text-neutral-600 font-mono">
                            <div>
                                <p>© 2024 Vibe Coding. All rights reserved.</p>
                            </div>
                            <div className="flex gap-4">
                                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </main>
    );
}
