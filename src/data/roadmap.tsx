import { Cpu, Layers, Terminal, GitBranch, Globe, BrainCircuit, BookOpen, Code2, Video, Brain, Wrench } from 'lucide-react';

export interface Resource {
  type: 'docs' | 'practice' | 'video' | 'mental' | 'tool';
  name: string;
  description: string;
  url?: string;
}

export interface WeeklyMilestone {
  time: string;
  title: string;
}

export interface RoadmapPhase {
  id: string;
  phase: string;
  title: string;
  duration: string;
  description: string;
  philosophy: string;
  icon: React.ReactNode;
  color: string;
  goals: string[];
  challenge: {
    name: string;
    description: string;
  };
  weeklyMilestones: WeeklyMilestone[];
  resources: Resource[];
  summary: string[];
  detailedRoadmap: {
    time: string;
    focus: string;
    tasks: string[];
  }[];
}

export const roadmapData: RoadmapPhase[] = [
  {
    id: 'phase-1',
    phase: 'Giai đoạn 01',
    title: 'Nền Tảng Toán & Tư Duy',
    duration: 'Tháng 1',
    description: 'Xây dựng bộ não của kỹ sư: Logic, Rời rạc và Tuyến tính.',
    philosophy: 'Công nghệ thay đổi, nhưng Toán học thì không. Tư duy Logic và Toán rời rạc là nền móng vĩnh cửu để bạn hiểu sâu về cách máy tính vận hành, chứ không chỉ học vẹt syntax.',
    icon: <BrainCircuit className="w-6 h-6" />,
    color: 'from-orange-600 to-amber-600',
    goals: [
      'Tư duy Logic & Chứng minh toán học',
      'Đại số tuyến tính (Ma trận/Vector) cho AI',
      'Lý thuyết đồ thị & Tập hợp'
    ],
    challenge: {
      name: 'Paper Computer',
      description: 'Mô phỏng thuật toán trên giấy (Tracing). Hiểu từng bước máy tính chạy mà không cần mở IDE.'
    },
    weeklyMilestones: [
      { time: 'Tuần 1', title: 'Logic mệnh đề & Tư duy phản biện' },
      { time: 'Tuần 2', title: 'Lý thuyết tập hợp & Hàm số' },
      { time: 'Tuần 3', title: 'Ma trận & Không gian Vector' },
      { time: 'Tuần 4', title: 'Lý thuyết Đồ thị & Cây cơ bản' }
    ],
    resources: [
      { type: 'video', name: 'TrevTutor', description: 'Toán rời rạc dễ hiểu nhất', url: 'https://www.youtube.com/user/TrevTutor' },
      { type: 'video', name: '3Blue1Brown', description: 'Vẻ đẹp của Đại số tuyến tính', url: 'https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab' },
      { type: 'docs', name: 'Khan Academy', description: 'Luyện tập gốc rễ', url: 'https://www.khanacademy.org/' }
    ],
    summary: [
      'Logic: Viết điều kiện If/Else không bao giờ sai',
      'Graph: Hiểu mạng xã hội và Google Maps hoạt động thế nào',
      'Linear Algebra: Ngôn ngữ của AI và Graphics'
    ],
    detailedRoadmap: [
      {
        time: 'Tuần 1-2',
        focus: 'Tư Duy Rời Rạc',
        tasks: [
          'Học cách máy tính "nghĩ" qua Logic 0/1.',
          'Biểu diễn dữ liệu thực tế bằng Tập hợp và Đồ thị.',
          'Chứng minh quy nạp: Cơ sở của thuật toán đệ quy.'
        ]
      },
      {
        time: 'Tuần 3-4',
        focus: 'Đại Số & Số Học',
        tasks: [
          'Thao tác với Ma trận - Kiểu dữ liệu của AI.',
          'Hiểu xác suất cơ bản để không bị số liệu đánh lừa.',
          'Luyện tập tư duy đếm (Counting) để tính độ phức tạp.'
        ]
      }
    ]
  },
  {
    id: 'phase-2',
    phase: 'Giai đoạn 02',
    title: 'C++ & Quản Lý Bộ Nhớ',
    duration: 'Tháng 2',
    description: 'Chạm tay vào phần cứng: Stack, Heap và Pointers.',
    philosophy: 'Muốn đi nhanh, hãy học Python. Muốn đi xa và hiểu sâu, hãy bắt đầu với C++. Bạn sẽ học cách trân trọng từng byte bộ nhớ và hiểu cái giá của sự tiện lợi.',
    icon: <Cpu className="w-6 h-6" />,
    color: 'from-red-600 to-rose-600',
    goals: [
      'Hiểu tường tận Stack vs Heap',
      'Làm chủ Con trỏ (Pointers) & Tham chiếu',
      'Tự cài đặt cấu trúc dữ liệu từ số 0'
    ],
    challenge: {
      name: 'Memory Master',
      description: 'Implement lại std::vector và std::string của C++ mà không để xảy ra Memory Leak.'
    },
    weeklyMilestones: [
      { time: 'Tuần 1', title: 'C++ Core & Memory Layout' },
      { time: 'Tuần 2', title: 'Pointers & Dynamic Allocation' },
      { time: 'Tuần 3', title: 'OOP & RAII (Resource Management)' },
      { time: 'Tuần 4', title: 'Templates & STL Practice' }
    ],
    resources: [
      { type: 'video', name: 'Cherno C++', description: 'C++ cho Game Developer', url: 'https://www.youtube.com/c/TheChernoProject' },
      { type: 'docs', name: 'LearnCpp.com', description: 'Kinh thánh C++ hiện đại', url: 'https://www.learncpp.com/' },
      { type: 'video', name: '28tech', description: 'Giải thuật C++ chuẩn Việt Nam', url: '' }
    ],
    summary: [
      'Pointer: Quyền năng tối thượng truy cập phần cứng',
      'Memory: Hiểu tại sao Chrome ngốn RAM',
      'Performance: Viết code chạy nhanh nhất có thể'
    ],
    detailedRoadmap: [
      {
        time: 'Tháng 2',
        focus: 'Low Level Thinking',
        tasks: [
          'Vẽ sơ đồ bộ nhớ Stack/Heap khi chạy code.',
          'Debug lỗi Segmentation Fault - ác mộng của Coder.',
          'Hiểu Reference Counting qua Smart Pointers.'
        ]
      }
    ]
  },
  {
    id: 'phase-3',
    phase: 'Giai đoạn 03',
    title: 'Cấu Trúc Dữ Liệu & Giải Thuật',
    duration: 'Tháng 3',
    description: 'Vũ khí tối thượng của Interview: DSA.',
    philosophy: 'Code chạy được là chuyện nhỏ. Code tối ưu, chịu tải lớn, xử lý hàng triệu record trong tích tắc mới là chuyện lớn. DSA phân loại thợ code và kỹ sư.',
    icon: <Layers className="w-6 h-6" />,
    color: 'from-purple-600 to-fuchsia-600',
    goals: [
      'Phân tích độ phức tạp Big-O',
      'Làm chủ Hash Map, Tree, Graph',
      'Giải quyết các bài toán LeetCode Medium'
    ],
    challenge: {
      name: 'LeetCode Streak',
      description: '30 ngày liên tục leo rank LeetCode. Mỗi ngày 1 bài Medium. Không copy solution.'
    },
    weeklyMilestones: [
      { time: 'Tuần 1', title: 'Sorting & Searching Algorithms' },
      { time: 'Tuần 2', title: 'Hash Table & Linked List' },
      { time: 'Tuần 3', title: 'Tree, Heap & Recursion' },
      { time: 'Tuần 4', title: 'Graph Traversal (BFS/DFS)' }
    ],
    resources: [
      { type: 'video', name: 'Abdul Bari', description: 'Thầy giáo quốc dân về thuật toán', url: 'https://www.youtube.com/channel/UCZCFT11CWBi3MHNlGf019nw' },
      { type: 'practice', name: 'LeetCode', description: 'Sân tập phỏng vấn toàn cầu', url: 'https://leetcode.com/' },
      { type: 'tool', name: 'Visualgo', description: 'Nhìn thuật toán chạy như phim', url: 'https://visualgo.net/' }
    ],
    summary: [
      'Optimization: Biến O(n²) thành O(n log n)',
      'Problem Solving: Nhìn vấn đề nào cũng ra cấu trúc dữ liệu',
      'Interview Ready: Tự tin trước các câu hỏi Hacking'
    ],
    detailedRoadmap: [
      {
        time: 'Tháng 3',
        focus: 'Hard Engineering',
        tasks: [
          'So sánh hiệu năng HashMap vs BST.',
          'Dùng Stack để xử lý biểu thức toán học.',
          'Dùng Graph để tìm đường đi ngắn nhất (Shortest Path).'
        ]
      }
    ]
  },
  {
    id: 'phase-4',
    phase: 'Giai đoạn 04',
    title: 'Python & Automation',
    duration: 'Tháng 4',
    description: 'Làm việc thông minh hơn: Tooling & Scripting.',
    philosophy: 'Đừng dùng C++ đi chợ mua rau. Học Python để tự động hóa những việc nhàm chán, xử lý dữ liệu lớn và prototype ý tưởng trong tích tắc.',
    icon: <Terminal className="w-6 h-6" />,
    color: 'from-amber-500 to-yellow-500',
    goals: [
      'Viết code Pythonic (ngắn gọn, đẹp)',
      'Tự động hóa file system & web scraping',
      'Xử lý dữ liệu với Pandas/Numpy'
    ],
    challenge: {
      name: 'Lazy Engineer',
      description: 'Viết Tool tự động: Cào tin tức, đổi tên file hàng loạt, hoặc auto-reply email.'
    },
    weeklyMilestones: [
      { time: 'Tuần 1', title: 'Python Syntax & Data Structures' },
      { time: 'Tuần 2', title: 'OOP & Modules' },
      { time: 'Tuần 3', title: 'Web Scraping & APIs' },
      { time: 'Tuần 4', title: 'Data Processing Basics' }
    ],
    resources: [
      { type: 'video', name: 'Mosh Hamedani', description: 'Python trong 1 giờ', url: 'https://www.youtube.com/c/programmingwithmosh' },
      { type: 'practice', name: 'Automate the Boring Stuff', description: 'Sách gối đầu giường về Python thực chiến', url: 'https://automatetheboringstuff.com/' }
    ],
    summary: [
      'Productivity: Code 10 dòng Python thay vì 100 dòng C++',
      'Data: Nền tảng cho AI/Machine Learning',
      'Scripting: Sai vặt máy tính làm việc cho mình'
    ],
    detailedRoadmap: [
      {
        time: 'Tháng 4',
        focus: 'Smart Coding',
        tasks: [
          'Viết Crawler lấy giá vàng/chứng khoán.',
          'Viết Script dọn dẹp thư mục Download.',
          'Dùng Python kết nối Database và Excel.'
        ]
      }
    ]
  },
  {
    id: 'phase-5',
    phase: 'Tại sao phải học Rust?',
    title: 'Rust & Tương Lai Hệ Thống',
    duration: 'Tháng 5',
    description: 'Ngôn ngữ được yêu thích nhất thế giới 7 năm liền. Tại sao?',
    philosophy: 'Tại sao Rust? Vì C++ quá nguy hiểm còn các ngôn ngữ khác quá chậm. Rust mang lại sự an toàn tuyệt đối về bộ nhớ mà không cần Garbage Collector. Đây là ngôn ngữ của Linux Kernel, của các hệ thống Blockchain, và là tương lai của High-Performance Computing.',
    icon: <Wrench className="w-6 h-6" />,
    color: 'from-orange-700 to-amber-700',
    goals: [
      'Hiểu Ownership & Borrowing (trái tim của Rust)',
      'Viết code Concurrency an toàn (Fearless Concurrency)',
      'Xây dựng CLI Tool hiệu năng cao'
    ],
    challenge: {
      name: 'Rewrite It In Rust',
      description: 'Viết lại một tool Python/Nodejs cũ bằng Rust. So sánh tốc độ và ram tiêu thụ (Thường giảm 10-50 lần).'
    },
    weeklyMilestones: [
      { time: 'Tuần 1', title: 'Tại sao Rust? & Cài đặt Environmental' },
      { time: 'Tuần 2', title: 'Ownership, Borrowing & Lifetimes' },
      { time: 'Tuần 3', title: 'Structs, Enums & Pattern Matching' },
      { time: 'Tuần 4', title: 'Traits & Error Handling' }
    ],
    resources: [
      { type: 'docs', name: 'The Rust Book', description: 'Tài liệu tốt nhất để học Rust', url: 'https://doc.rust-lang.org/book/' },
      { type: 'practice', name: 'Rustlings', description: 'Bài tập sửa lỗi Compiler cực hay', url: 'https://github.com/rust-lang/rustlings' }
    ],
    summary: [
      'Memory Safety: Không bao giờ có lỗi Null Pointer hay Data Race',
      'Performance: Nhanh ngang ngửa C++',
      'Eco-system: Cargo package manager xịn nhất thế giới'
    ],
    detailedRoadmap: [
      {
        time: 'Tháng 5',
        focus: 'Modern Systems',
        tasks: [
          'Đánh nhau với Borrow Checker để hiểu quản lý bộ nhớ.',
          'Viết CLI Tool "grep" phiên bản Rust.',
          'Cảm nhận sự sướng khi Compiler bắt hết lỗi logic.'
        ]
      }
    ]
  },
  {
    id: 'phase-6',
    phase: 'Giai đoạn 06',
    title: 'Kỹ Năng AI & Mềm',
    duration: 'Vô hạn',
    description: 'Vượt lên trên Code: English, AI Tools & Soft Skills.',
    philosophy: 'Code chỉ là công cụ. Tư duy giải quyết vấn đề, khả năng tự học tiếng Anh và kỹ năng giao tiếp mới là thứ giúp bạn thăng tiến và không bị AI thay thế.',
    icon: <Globe className="w-6 h-6" />,
    color: 'from-stone-500 to-neutral-400',
    goals: [
      'Tiếng Anh chuyên ngành (Đọc Doc, Nghe Youtube)',
      'Sử dụng AI (Cursor, ChatGPT) làm trợ lý',
      'Xây dựng Portfolio & Personal Brand'
    ],
    challenge: {
      name: 'Go Global',
      description: 'Tham gia một dự án Open Source hoặc viết một bài blog kỹ thuật bằng tiếng Anh.'
    },
    weeklyMilestones: [
      { time: 'Tuần 1', title: 'AI-Assisted Coding (Cursor/Copilot)' },
      { time: 'Tuần 2', title: 'English for Developers' },
      { time: 'Tuần 3', title: 'Git, Github & Open Source' },
      { time: 'Tuần 4', title: 'Career Path & Interview Prep' }
    ],
    resources: [
      { type: 'video', name: 'English For IT', description: 'Kênh học tiếng Anh ngành IT', url: '' },
      { type: 'tool', name: 'Cursor', description: 'IDE tích hợp AI tốt nhất', url: 'https://cursor.sh/' }
    ],
    summary: [
      'AI: Code nhanh hơn x10 lần nhưng phải hiểu code',
      'English: Chìa khóa ra biển lớn',
      'Soft Skills: Biết code là thợ, biết giao tiếp là thầy'
    ],
    detailedRoadmap: [
      {
        time: 'Tương lai',
        focus: 'Continuous Growth',
        tasks: [
          'Dùng Cursor để pair programming, review code.',
          'Học tiếng Anh mỗi ngày 30 phút với English For IT.',
          'Tham gia cộng đồng (Reddit, Viblo) để chia sẻ và học hỏi.'
        ]
      }
    ]
  }
];