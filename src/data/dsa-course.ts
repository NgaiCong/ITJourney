export interface DsaVideo {
    title: string;
    index: number; // YouTube Playlist Index
    videoId?: string; // Specific YouTube Video ID (for better control)
    description?: string;
    application?: string;
    codeExample?: string;
    codeOutput?: string;
    codeExplanation?: string;
    codeLanguage?: string;
}

export interface DsaModule {
    id: string;
    title: string;
    description: string;
    playlistId: string;
    keyConcepts: string[];
    overview: string;
    complexity?: {
        time: string;
        space: string;
    };
    videos?: DsaVideo[];
}

export const dsaCourseData: DsaModule[] = [
    {
        id: 'core-ds',
        title: 'Core Data Structures (Cấu trúc dữ liệu)',
        description: 'Nền tảng quan trọng nhất: Array, Linked List, Big O...',
        playlistId: 'PLHf3nhIwMlOpKk_sJBquW4GBOKmQSvQdy',
        overview: 'Bắt đầu hành trình DSA với các cấu trúc dữ liệu cốt lõi. Hiểu về Big O để đánh giá hiệu năng code.',
        keyConcepts: ['Big O Notation', 'Abstract Data Types', 'Pointers', 'Memory Management'],
        videos: [
            {
                title: "Lộ trình & Tổng quan (Roadmap & Overview)",
                index: 1,
                description: "Cái nhìn tổng quan về lộ trình học Data Structures. Tại sao cần học DS? Các topic chính sẽ đi qua.",
                application: "Định hướng tư duy kỹ sư phần mềm."
            },
            {
                title: "Độ phức tạp thuật toán (Big O Notation)",
                index: 4,
                description: "Khái niệm quan trọng nhất trong lập trình. Phân biệt O(1), O(n), O(log n)... để viết code tối ưu.",
                application: "Phân tích hiệu năng hệ thống, database query, tối ưu API.",
                codeExample: "O(1): Truy cập mảng\nO(n): Duyệt vòng lặp\nO(log n): Binary Search"
            },
            {
                title: "Cấu trúc Linked List - Phần 1 (Lý thuyết)",
                index: 3,
                description: "Hiểu sâu về bộ nhớ máy tính (RAM) và cách Linked List hoạt động khác với Array như thế nào.",
                application: "Quản lý bộ nhớ động (Heap memory).",
                codeExample: `// Node đơn giản trong C/Java
class Node {
    int data;
    Node next;
}`
            },
            {
                title: "Cài đặt Linked List - Phần 2 (Thực hành)",
                index: 2,
                description: "Code chi tiết các operation: Insert, Delete, Traverse trên danh sách liên kết.",
                application: "Tự xây dựng thư viện Collections.",
                codeLanguage: 'java'
            },
            {
                title: "Danh sách liên kết đôi (Doubly Linked List)",
                index: 0,
                description: "Nâng cấp của Linked List: Duyệt 2 chiều. Ưu nhược điểm so với Single LL.",
                application: "Browser History (Back/Forward), Music Player list (Next/Prev).",
                codeExample: `class Node {
    int data;
    Node prev, next; // 2 con trỏ
}`
            }
        ]
    },
    {
        id: 'algorithms',
        title: 'Algorithms Foundations (Thuật toán)',
        description: 'Tư duy giải quyết vấn đề: Sliding Window, DP, Backtracking...',
        playlistId: 'PLHf3nhIwMlOqByOjcYvN52MAuIarAakyz',
        overview: 'Các kỹ thuật thuật toán nâng cao để giải quyết các bài toán phức tạp (Google/Facebook Interview Questions).',
        keyConcepts: ['Sliding Window', 'Dynamic Programming', 'Backtracking', 'Two Pointers'],
        complexity: {
            time: 'N/A',
            space: 'N/A'
        },
        videos: [
            {
                title: "Lộ trình học Thuật toán (Algorithms Roadmap)",
                index: 3,
                description: "Tổng quan các nhóm thuật toán cần nắm vững: Search, Sort, Graph, DP, Greedy.",
                application: "Chuẩn bị phỏng vấn Coding Interview."
            },
            {
                title: "Kỹ thuật Cửa sổ trượt (Sliding Window Explained)",
                index: 2,
                description: "Giải thích cơ chế hoạt động của Sliding Window. Khi nào dùng? (Bài toán mảng con liên tiếp).",
                application: "Xử lý dữ liệu Stream, Network packet analysis.",
                codeExample: `[ a b c d e ]
  ^---^
  window
-> [ b c d e f ]`
            },
            {
                title: "Áp dụng Sliding Window - Phần 2",
                index: 1,
                description: "Thực hành giải bài toán cụ thể. Cách tối ưu từ O(n^2) về O(n).",
                application: "Tính tổng/max/min trong k phần tử liên tiếp."
            },
            {
                title: "Leetcode 3: Longest Substring (Thực chiến)",
                index: 5,
                description: "Giải bài Hard/Medium trên Leetcode sử dụng Sliding Window và Hash Map.",
                application: "Xử lý chuỗi, Text Processing.",
                codeLanguage: 'java'
            },
            {
                title: "Quy hoạch động - Phần 1 (DP Intro)",
                index: 7,
                description: "Giới thiệu tư duy Dynamic Programming: Chia bài toán lớn thành bài toán con và lưu kết quả (Memoization).",
                application: "Tối ưu hóa tài nguyên.",
            },
            {
                title: "Quy hoạch động - Phần 2 (Fibonacci)",
                index: 4,
                description: "Minh họa DP qua bài toán Fibonacci. So sánh Top-down và Bottom-up.",
                application: "Bài toán cái túi, Dãy con tăng dài nhất.",
                codeExample: `F[i] = F[i-1] + F[i-2]`
            },
            {
                title: "Quay lui vs DFS (Backtracking vs DFS)",
                index: 0,
                description: "Phân biệt kỹ thuật Quay lui và Duyệt graph. Khi nào dùng cái nào?",
                application: "AI chơi cờ, giải Sudoku, tìm đường.",
                codeExample: "Try(i) -> if valid -> Try(i+1) -> else Backtrack"
            },
            {
                title: "Leetcode 141: Cycle Detection (Two Pointers)",
                index: 6,
                description: "Thuật toán Floyd's Tortoise and Hare để phát hiện vòng lặp.",
                application: "Detect Infinite Loop, Deadlock.",
                codeLanguage: 'java'
            }
        ]
    },
    {
        id: 'array',
        title: 'Arrays (Mảng)',
        description: 'Cấu trúc dữ liệu cơ bản nhất, lưu trữ các phần tử liên tiếp trong bộ nhớ.',
        playlistId: 'PLHf3nhIwMlOqeJHti8Y3x9EO0Sw8vvbZr',
        overview: 'Mảng là tập hợp các phần tử có cùng kiểu dữ liệu, được lưu trữ tại các ô nhớ liền kề. Truy cập phần tử cực nhanh qua index.',
        keyConcepts: ['Static vs Dynamic Arrays', 'Indexing', 'Sliding Window Technique', 'Two Pointers'],
        complexity: {
            time: 'Access: O(1), Search: O(n)',
            space: 'O(n)'
        }
    },
    {
        id: 'linked-list',
        title: 'Linked List Variants',
        description: 'Các biến thể khác của Linked List.',
        playlistId: 'PLHf3nhIwMlOrLbjR0g1lAI8lsntPCpG8m',
        overview: 'Khác với mảng, Linked List không yêu cầu bộ nhớ liên tiếp. Mỗi node chứa dữ liệu và con trỏ trỏ đến node tiếp theo.',
        keyConcepts: ['Circular Linked List', 'Skip List'],
        complexity: {
            time: 'Access: O(n), Insert/Delete: O(1)',
            space: 'O(n)'
        }
    },
    {
        id: 'stack-queue',
        title: 'Stack & Queue',
        description: 'Cấu trúc dữ liệu LIFO và FIFO.',
        playlistId: 'PLHf3nhIwMlOoJopoJgO8zq3DNYJVRq26A',
        overview: 'Stack (Ngăn xếp) hoạt động theo nguyên tắc Last-In-First-Out. Queue (Hàng đợi) hoạt động theo First-In-First-Out.',
        keyConcepts: ['LIFO vs FIFO', 'Push/Pop operations', 'BFS (Queue)', 'DFS (Stack)'],
        complexity: {
            time: 'Push/Pop: O(1)',
            space: 'O(n)'
        }
    },
    {
        id: 'searching',
        title: 'Searching Algorithms',
        description: 'Các thuật toán tìm kiếm phổ biến: Linear Search, Binary Search.',
        playlistId: 'PLHf3nhIwMlOqq0j81SPF9DpQRRrdeIvqm',
        overview: 'Tìm kiếm là thao tác cơ bản để lấy thông tin từ cấu trúc dữ liệu. Binary Search là thuật toán tối ưu trên dữ liệu đã sắp xếp.',
        keyConcepts: ['Linear Search', 'Binary Search', 'Interpolation Search', 'Exponential Search'],
        complexity: {
            time: 'Binary Search: O(log n)',
            space: 'O(1)'
        }
    },
    {
        id: 'hash-map',
        title: 'Hash Map & Hash Set',
        description: 'Cấu trúc dữ liệu Key-Value mạnh mẽ nhất.',
        playlistId: 'PLHf3nhIwMlOpV-65zQ_m5HHXj7fDNKSga',
        overview: 'Hash Map sử dụng hàm băm để ánh xạ key sang index, cho phép truy xuất dữ liệu gần như tức thời.',
        keyConcepts: ['Hashing', 'Collision Resolution', 'Chaining', 'Open Addressing'],
        complexity: {
            time: 'Insert/Delete/Access: O(1) average',
            space: 'O(n)'
        }
    },
    {
        id: 'heap',
        title: 'Heap & Priority Queue',
        description: 'Cấu trúc cây nhị phân đặc biệt để quản lý độ ưu tiên.',
        playlistId: 'PLHf3nhIwMlOpZw-poJMk5qMMgZvTBz9AE',
        overview: 'Heap thường được dùng để cài đặt Priority Queue, Heap Sort hoặc tìm Top K phần tử.',
        keyConcepts: ['Min Heap', 'Max Heap', 'Heapify', 'Priority Queue Operations'],
        complexity: {
            time: 'Insert/Extract Min: O(log n)',
            space: 'O(n)'
        }
    }
];
