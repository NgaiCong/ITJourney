
import { Terminal, Layers, Rocket, Users } from 'lucide-react';

export const landingRoadmapData = [
    {
        id: 'step-1',
        phase: 'Bước 01',
        title: 'Tư Duy & Nền Tảng',
        duration: 'Tháng 1-2',
        description: 'Xây dựng gốc rễ vững chắc với Khoa học máy tính và Tư duy AI Native.',
        icon: Terminal,
        summary: [
            'Hiểu bản chất Internet, HTTP, DNS',
            'Thành thạo Đại số tuyến tính & Giải thuật',
            'Sử dụng AI làm trợ lý (Pair Programmer)'
        ],
        detailedRoadmap: [
            {
                time: 'Khởi động',
                focus: 'Core Foundations',
                tasks: [
                    'Làm chủ tư duy Logic với JavaScript',
                    'Hiểu sâu về Cấu trúc dữ liệu',
                    'Thiết lập môi trường Dev 2026 (Ghostty/Cline)'
                ]
            }
        ]
    },
    {
        id: 'step-2',
        phase: 'Bước 02',
        title: 'Làm Chủ Tech Stack',
        duration: 'Tháng 3-6',
        description: 'Học bộ công cụ "2026 AI-Native" để xây dựng ứng dụng tốc độ cao.',
        icon: Layers,
        summary: [
            'Frontend: Vibe Coding với Tailwind v4 & Shadcn',
            'Fullstack: Next.js 15 & Server Components',
            'Backend: Bun, Hono & Supabase (Edge)'
        ],
        detailedRoadmap: [
            {
                time: 'Thực chiến',
                focus: 'Building Apps',
                tasks: [
                    'Clone các dự án thực tế (Linear, Vercel)',
                    'Xây dựng hệ thống SaaS hoàn chỉnh',
                    'Tối ưu hiệu năng và UX (Pixel Perfect)'
                ]
            }
        ]
    },
    {
        id: 'step-3',
        phase: 'Bước 03',
        title: 'AI Engineering Gap',
        duration: 'Tháng 7+',
        description: 'Nâng tầm kỹ năng: Tích hợp AI và Khoa học dữ liệu vào sản phẩm.',
        icon: Rocket,
        summary: [
            'Python & FastAPI cho xử lý dữ liệu',
            'Xây dựng hệ thống RAG (Chat with Data)',
            'Hiểu về Vector Database & Embeddings'
        ],
        detailedRoadmap: [
            {
                time: 'Nâng cao',
                focus: 'AI Integration',
                tasks: [
                    'Tự chạy Local LLM với Ollama',
                    'Xây dựng "Second Brain" AI',
                    'Kết hợp sức mạnh Code + Data'
                ]
            }
        ]
    },
    {
        id: 'step-4',
        phase: 'Bước 04',
        title: 'Sự Nghiệp & Cộng Đồng',
        duration: 'Vô hạn',
        description: 'Không chỉ là Code. Xây dựng thương hiệu và đóng góp giá trị.',
        icon: Users,
        summary: [
            'System Design cho hệ thống lớn',
            'Đóng góp Open Source',
            'Xây dựng Personal Brand & Networking'
        ],
        detailedRoadmap: [
            {
                time: 'Phát triển',
                focus: 'Career Growth',
                tasks: [
                    'Review code và Mentoring',
                    'Chia sẻ kiến thức (Blog/Video)',
                    'Tham gia cộng đồng IT chất lượng'
                ]
            }
        ]
    }
];
