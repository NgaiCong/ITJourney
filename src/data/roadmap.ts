// data/roadmap.ts

export interface Resource {
  name: string;
  type: "Docs" | "Video" | "Practice" | "Tool" | "Book" | "Mental" | "Lang" | "Repo";
  link: string;
  note: string;
  icon?: string;
  features?: string[];
  usage?: string;
}

export interface PhaseData {
  id: string;
  phase: string;
  title: string;
  subtitle: string;
  duration: string;
  months: string;
  tagline: string;
  description: string;
  detailedDescription: string;
  color: string;
  gradientFrom: string;
  gradientTo: string;
  keywords: string[];
  keyAction: string;
  challenge: string;
  milestones: string[];
  resources: Resource[];
}

export const roadmapData: PhaseData[] = [
  {
    id: "phase-1",
    phase: "PHASE 01",
    title: "The Foundation",
    subtitle: "Xây Dựng Nền Tảng",
    duration: "Month 1 - 3",
    months: "01-03",
    tagline: "Purge the AI. Rebuild the Mind.",
    description: "Giai đoạn 'Detox'. Ngừng phụ thuộc vào AI. Học cách máy tính thực sự hoạt động qua C++.",
    detailedDescription: "Đây là lúc bạn 'cai nghiện' AI generation. Chúng ta sẽ học C++ không phải để làm khó mình, mà để hiểu rõ về bộ nhớ (Memory) và cách dữ liệu di chuyển trong máy tính. Khi hiểu được 'gốc rễ', mọi ngôn ngữ sau này đều trở nên dễ dàng.",
    color: "#ffffff",
    gradientFrom: "#ffffff",
    gradientTo: "#a3a3a3",
    keywords: ["C++ Basics", "Memory Logic", "No AI", "Problem Solving"],
    keyAction: "Học tư duy lập trình cốt lõi",
    challenge: "The Whiteboard: Viết code ra giấy trước khi gõ máy. Tập suy nghĩ logic mà không cần máy tính gợi ý.",
    milestones: [
      "Tuần 1-2: Cài đặt môi trường & Viết chương trình đầu tiên",
      "Tuần 3-4: Hiểu về Biến (Variables) & Hàm (Functions)",
      "Tuần 5-8: Làm quen với Hướng đối tượng (OOP) cơ bản",
      "Tuần 9-12: Quản lý lỗi & Làm dự án nhỏ (Mini projects)"
    ],
    resources: [
      { name: "LearnCPP.com", type: "Docs", link: "https://www.learncpp.com", note: "Tài liệu C++ chuẩn mực - Dễ hiểu và chi tiết" },
      { name: "HackerRank C++", type: "Practice", link: "https://www.hackerrank.com/domains/cpp", note: "Bài tập thực hành từ dễ đến khó" },
      { name: "The Cherno C++", type: "Video", link: "https://www.youtube.com/playlist?list=PLlrATfBNZ98dudnM48yfGUldqGD0S4FFb", note: "Video giải thích C++ cực hay (English)" },
      { name: "Growth Mindset", type: "Mental", link: "https://www.youtube.com/watch?v=hiiEeMN7vbQ", note: "Tư duy phát triển - Quan trọng hơn kỹ thuật" },
      { 
        name: "Visualizing Pointers", 
        type: "Tool", 
        link: "https://pythontutor.com/cpp.html", 
        note: "Xem code chạy từng bước một",
        features: [
          "Visualize code execution step-by-step",
          "View stack and heap memory allocation",
          "Debug logic errors visually"
        ],
        usage: "Paste your C++ code to see how variables are stored in memory and how pointers behave."
      },
    ]
  },
  {
    id: "phase-2",
    phase: "PHASE 02",
    title: "The Algorithms",
    subtitle: "Cấu Trúc & Giải Thuật",
    duration: "Month 4 - 6",
    months: "04-06",
    tagline: "Visualize the Invisible.",
    description: "Đừng học vẹt code. Hãy học cách tổ chức dữ liệu và giải quyết vấn đề thông minh hơn.",
    detailedDescription: "Data Structures (Cấu trúc dữ liệu) giống như các loại hộp chứa đồ khác nhau. Algorithms (Thuật toán) là cách sắp xếp đồ đạc sao cho lấy ra nhanh nhất. Bạn sẽ học cách 'nhìn thấy' luồng đi của dữ liệu thay vì chỉ gõ code vô hồn.",
    color: "#ffffff",
    gradientFrom: "#ffffff",
    gradientTo: "#e5e5e5",
    keywords: ["Data Structures", "Algorithms", "Logic Flow", "Visualization"],
    keyAction: "Hiểu bản chất, không học vẹt",
    challenge: "The Prediction: Dự đoán thuật toán chạy thế nào trên giấy trước khi bấm chạy trên máy.",
    milestones: [
      "Tuần 1-3: Mảng (Arrays) & Sắp xếp (Sorting) cơ bản",
      "Tuần 4-6: Danh sách liên kết (Linked Lists) & Ngăn xếp (Stack)",
      "Tuần 7-9: Đệ quy (Recursion) & Cây nhị phân (Trees)",
      "Tuần 10-12: Đồ thị (Graphs) & Tìm kiếm (Search)"
    ],
    resources: [
      { name: "Abdul Bari", type: "Video", link: "https://www.youtube.com/@abdul_bari", note: "Thầy giáo dạy thuật toán hay nhất (English)" },
      { 
        name: "VisuAlgo", 
        type: "Tool", 
        link: "https://visualgo.net", 
        note: "Xem thuật toán chạy bằng hình ảnh động",
        features: [
          "Animated visualization of data structures and algorithms",
          "Step-by-step execution",
          "Pseudo-code mapping"
        ],
        usage: "Select an algorithm (e.g., Sorting, BST) to watch how it processes data visually."
      },
      { name: "28tech (VN)", type: "Video", link: "https://www.youtube.com/@28tech", note: "Học thuật toán bằng tiếng Việt rất dễ hiểu" },
      { name: "LeetCode Easy", type: "Practice", link: "https://leetcode.com/problemset/?difficulty=EASY", note: "Luyện tập các bài cơ bản hàng ngày" },
      { name: "NeetCode Roadmap", type: "Docs", link: "https://neetcode.io/roadmap", note: "Lộ trình học thuật toán bài bản" },
      { name: "Big-O Cheatsheet", type: "Docs", link: "https://www.bigocheatsheet.com", note: "Bảng tra cứu độ phức tạp thuật toán" },
    ]
  },
  {
    id: "phase-3",
    phase: "PHASE 03",
    title: "The Modern Tool",
    subtitle: "Python & Tự Động Hóa",
    duration: "Month 7 - 9",
    months: "07-09",
    tagline: "From Hardship to Velocity.",
    description: "Dùng tư duy C++ để làm chủ Python. Biến ý tưởng thành sản phẩm thực tế nhanh chóng.",
    detailedDescription: "Sau khi đã 'khổ luyện' với C++, Python sẽ giống như một món quà. Bạn sẽ dùng Python để kết nối mọi thứ lại với nhau: xử lý dữ liệu, làm web, tự động hóa công việc. Đây là lúc bạn thấy sức mạnh của việc có nền tảng vững chắc.",
    color: "#ffffff",
    gradientFrom: "#ffffff",
    gradientTo: "#d4d4d4",
    keywords: ["Python", "Automation", "Web APIs", "Database"],
    keyAction: "Ứng dụng kiến thức vào thực tế",
    challenge: "The Automation: Viết một tool nhỏ tự động làm việc gì đó chán ngắt mà bạn hay phải làm.",
    milestones: [
      "Tuần 1-3: Làm quen Python & Cách viết code gọn gàng",
      "Tuần 4-6: Xử lý file, dữ liệu & Web scraping cơ bản",
      "Tuần 7-9: Làm việc với Cơ sở dữ liệu (Database) & API",
      "Tuần 10-12: Xây dựng Web Back-end nhỏ với Flask/FastAPI"
    ],
    resources: [
      { name: "Corey Schafer", type: "Video", link: "https://www.youtube.com/user/schafer5", note: "Kênh học Python số 1 (English)" },
      { name: "Real Python", type: "Docs", link: "https://realpython.com", note: "Bài viết hướng dẫn chất lượng cao" },
      { name: "Automate Boring Stuff", type: "Book", link: "https://automatetheboringstuff.com", note: "Sách hay về tự động hóa (Free)" },
      { name: "Python Crash Course", type: "Book", link: "https://nostarch.com/pythoncrashcourse2e", note: "Sách nhập môn Python toàn diện" },
      { name: "FastAPI Docs", type: "Docs", link: "https://fastapi.tiangolo.com", note: "Tài liệu Framework làm web hiện đại" },
      { name: "SQLAlchemy", type: "Docs", link: "https://www.sqlalchemy.org", note: "Công cụ làm việc với Database" },
    ]
  },
  {
    id: "phase-4",
    phase: "PHASE 04",
    title: "The Engineer",
    subtitle: "Sự Nghiệp & Dự Án Lớn",
    duration: "Month 10 - 12",
    months: "10-12",
    tagline: "Beyond the Code.",
    description: "Chuẩn bị bước ra thế giới thực. Học cách thiết kế hệ thống lớn và kỹ năng nghề nghiệp.",
    detailedDescription: "Bạn không chỉ là người viết code (Coder), bạn là người đưa ra giải pháp (Solution Provider). Giai đoạn này tập trung vào việc xây dựng một dự án lớn (Capstone Project) để chứng minh năng lực, đồng thời trau dồi tiếng Anh chuyên ngành và kỹ năng phỏng vấn.",
    color: "#ffffff",
    gradientFrom: "#ffffff",
    gradientTo: "#a3a3a3",
    keywords: ["System Design", "Career Prep", "English4IT", "Portfolio"],
    keyAction: "Hoàn thiện hồ sơ năng lực (Portfolio)",
    challenge: "The Capstone: Xây dựng một ứng dụng hoàn chỉnh, có tài liệu hướng dẫn tiếng Anh và đưa lên mạng (Deploy).",
    milestones: [
      "Tuần 1-3: Thuật toán nâng cao & Luyện đề phỏng vấn",
      "Tuần 4-6: Thiết kế hệ thống (System Design) cơ bản & Git",
      "Tuần 7-9: Phát triển dự án cuối khóa (Capstone Project)",
      "Tuần 10-12: Viết CV, Portfolio & Luyện phỏng vấn thử"
    ],
    resources: [
      { name: "English4IT", type: "Lang", link: "https://www.english4it.com", note: "Từ vựng tiếng Anh chuyên ngành" },
      { name: "NeetCode.io", type: "Practice", link: "https://neetcode.io", note: "Luyện tập các dạng bài phỏng vấn" },
      { name: "System Design Primer", type: "Repo", link: "https://github.com/donnemartin/system-design-primer", note: "Kiến thức thiết kế hệ thống (Github)" },
      { name: "Tech Interview Handbook", type: "Docs", link: "https://www.techinterviewhandbook.org", note: "Cẩm nang phỏng vấn xin việc" },
      { name: "GitHub Profile README", type: "Docs", link: "https://docs.github.com/en/account-and-profile", note: "Tạo hồ sơ Github chuyên nghiệp" },
      { name: "Roadmap.sh", type: "Docs", link: "https://roadmap.sh", note: "Bản đồ định hướng nghề nghiệp" },
    ]
  },
];

// Navigation data for quick access
export const navigationData = roadmapData.map(phase => ({
  id: phase.id,
  title: phase.title,
  months: phase.months,
  color: phase.color
}));