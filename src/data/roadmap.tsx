import {
    Calculator,
    Server,
    Layout,
    Shield,
    Rocket,
} from 'lucide-react';

// ==========================================
// NEW INTERFACES
// ==========================================

export interface Resource {
    type: 'docs' | 'practice' | 'video' | 'mental' | 'tool' | 'book' | 'repo';
    name: string;
    description: string;
    url?: string;
}

export interface CodeExample {
    language: string;
    code: string;
    explanation: string;
}

export interface ComparisonTable {
    title: string;
    headers: string[];
    rows: string[][];
}

export interface DetailedTopic {
    topic: string;
    whyLearnThis: string;
    keyConceptsExplained: string[];
    codeExamples?: CodeExample[];
    practicalUseCases: string[];
    tasks: string[];
}

export interface RealWorldProject {
    name: string;
    description: string;
    techStack: string[];
    features: string[];
    learningOutcomes: string[];
}

export interface RoadmapPhase {
    id: string;
    phase: string;
    title: string;
    duration: string;
    description: string;
    icon: React.ReactNode;
    color: string;

    // NEW: Why & Purpose
    whyImportant: string;
    practicalApplications: string[];
    prerequisites: string[];
    estimatedHoursPerWeek: number;

    // Goals & Checkpoints
    goals: string[];
    checkpoints: string[];
    commonMistakes?: string[];

    // Detailed Content
    detailedTopics: DetailedTopic[];
    comparisonTables?: ComparisonTable[];

    // Project
    realWorldProject: RealWorldProject;

    // Resources
    resources: Resource[];
    summary: string[];
}

// ==========================================
// PHASE 1: NỀN TẢNG KHOA HỌC MÁY TÍNH
// ==========================================

const phase1: RoadmapPhase = {
    id: 'phase-1',
    phase: 'Giai đoạn 01',
    title: 'Nền Tảng Khoa Học Máy Tính',
    duration: 'Tháng 1-3',
    description: 'Xây dựng "Hệ Miễn Dịch" của Kỹ sư AI: Toán đại số tuyến tính, ngôn ngữ C++ và Thuật toán nâng cao.',
    icon: <Calculator className="w-6 h-6" />,
    color: 'from-yellow-500 to-orange-500',

    whyImportant: `Không có nền tảng vững chắc, AI chỉ là "chiếc nạng" tạm thời. Mọi phép tính trong mô hình ngôn ngữ lớn (LLM) đều là nhân ma trận khổng lồ. Khi bạn dùng ChatGPT, nó đang thực hiện hàng tỷ phép nhân ma trận mỗi giây. Hiểu C++ giúp bạn nắm cách máy tính quản lý bộ nhớ - nền tảng của mọi hệ thống hiệu năng cao như Vector Database.`,

    practicalApplications: [
        'Vector Embeddings: Hiểu cách máy "nén" ý nghĩa văn bản/hình ảnh vào mảng 1536 số',
        'Tối ưu Vector Database: Giảm chi phí lưu trữ 80% nhờ hiểu Dimensionality Reduction',
        'AI Agent Planning: Thuật toán đệ quy/backtracking là nền tảng của AI tự động lập kế hoạch',
        'Performance Debugging: Hiểu memory layout để debug bottleneck trong hệ thống thực',
        'Transfer Learning: Hiểu cách fine-tune model mà vẫn giữ kiến thức gốc'
    ],

    prerequisites: [
        'Biết lập trình cơ bản (bất kỳ ngôn ngữ nào)',
        'Toán cấp 3: Đạo hàm, tích phân cơ bản',
        'Tiếng Anh đọc hiểu (tài liệu kỹ thuật)'
    ],

    estimatedHoursPerWeek: 20,

    goals: [
        'Đại số tuyến tính: Ma trận, Trị riêng, Giảm chiều dữ liệu',
        'Thuật toán và Cấu trúc dữ liệu nâng cao: Đồ thị, Quy hoạch động, Cửa sổ trượt',
        'Ngôn ngữ C++: Quản lý bộ nhớ, con trỏ, tối ưu hiệu năng',
        'Ngôn ngữ Python cho AI: Xây dựng quy trình nhúng vector'
    ],

    checkpoints: [
        'Có thể giải thích PCA (Principal Component Analysis) cho người mới?',
        'Viết được hàm nhân ma trận từ đầu không dùng thư viện?',
        'Hiểu được khi nào dùng Cosine vs Euclidean distance?',
        'Giải được 30+ bài LeetCode Medium về DSA?',
        'Viết được chương trình C++ quản lý bộ nhớ đúng cách?'
    ],

    commonMistakes: [
        'Học thuật toán mà không thực hành code - phải code mọi thứ từ đầu',
        'Bỏ qua đại số tuyến tính vì thấy khó - đây là ngôn ngữ của AI',
        'Chỉ học Python mà bỏ qua C++ - sẽ không hiểu được performance',
        'Học lý thuyết mà không làm project thực tế'
    ],

    detailedTopics: [
        {
            topic: 'Ma Trận và Chéo Hóa (Matrix Diagonalization)',
            whyLearnThis: 'Ma trận là cấu trúc dữ liệu nền tảng của mọi mạng neural. Mỗi layer trong GPT-4 là một phép nhân ma trận khổng lồ. Hiểu chéo hóa giúp bạn hiểu cách AI "nén" thông tin và tại sao một số chiều quan trọng hơn chiều khác.',
            keyConceptsExplained: [
                'Ma trận là bảng số m×n dùng để biến đổi vector từ không gian này sang không gian khác',
                'Chéo hóa ma trận: A = PDP⁻¹ (D là ma trận đường chéo) - giúp tính A^n cực nhanh',
                'Trị riêng (Eigenvalue): Cho biết hướng nào trong dữ liệu quan trọng nhất',
                'Vector riêng (Eigenvector): Hướng mà ma trận chỉ "kéo dãn" chứ không xoay'
            ],
            codeExamples: [
                {
                    language: 'python',
                    code: `import numpy as np
from sklearn.decomposition import PCA

# Embeddings từ OpenAI (1536 chiều)
embeddings = load_embeddings()  # Shape: (10000, 1536)

# PCA dựa trên eigenvalue decomposition
pca = PCA(n_components=256)
compressed = pca.fit_transform(embeddings)

# Giữ 95% thông tin, giảm 84% kích thước!
# → Tiết kiệm storage, tăng tốc search`,
                    explanation: 'PCA sử dụng eigenvalues để tìm các chiều quan trọng nhất. Với 256 chiều thay vì 1536, bạn tiết kiệm 84% bộ nhớ mà vẫn giữ 95% thông tin semantic.'
                }
            ],
            practicalUseCases: [
                'Nén embeddings từ 1536 → 256 chiều để tiết kiệm storage',
                'Tìm các "hướng" quan trọng trong dữ liệu (topic modeling)',
                'Tối ưu Vector Database queries'
            ],
            tasks: [
                'Viết hàm nhân ma trận từ đầu (không dùng numpy)',
                'Implement thuật toán PCA thủ công',
                'Visualize high-dim vectors trong 2D/3D bằng t-SNE'
            ]
        },
        {
            topic: 'Không Gian Vector và Embeddings',
            whyLearnThis: 'Mọi thực thể (văn bản, hình ảnh, code) trong AI đều được biểu diễn như một điểm trong không gian vector nhiều chiều. Đây là nền tảng của Semantic Search, RAG, và mọi ứng dụng AI hiện đại.',
            keyConceptsExplained: [
                'Vector embedding: Biến văn bản/hình ảnh thành mảng số (thường 1536 chiều)',
                'Cosine similarity: Đo góc giữa 2 vector, range [-1,1], tốt nhất cho văn bản',
                'Euclidean distance: Đo khoảng cách đường thẳng, tốt cho hình ảnh',
                'Dot product: Nhanh nhất nhưng cần vectors đã normalize'
            ],
            codeExamples: [
                {
                    language: 'python',
                    code: `import numpy as np

def cosine_similarity(a, b):
    """Đo góc giữa 2 vector. Best for: Text"""
    return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))

def euclidean_distance(a, b):
    """Đo khoảng cách đường thẳng. Best for: Images"""
    return np.linalg.norm(a - b)

def dot_product(a, b):
    """Nhanh nhất, cần vectors đã normalize"""
    return np.dot(a, b)`,
                    explanation: 'Chọn đúng metric rất quan trọng. Text dùng Cosine vì độ dài vector không quan trọng, chỉ quan tâm "hướng" (ý nghĩa).'
                }
            ],
            practicalUseCases: [
                'Semantic Search: Tìm documents tương tự về ý nghĩa',
                'Recommendation System: Suggest items similar to what user liked',
                'Duplicate Detection: Phát hiện nội dung trùng lặp'
            ],
            tasks: [
                'Viết 3 hàm đo khoảng cách bằng Python (NumPy)',
                'So sánh kết quả search với từng metric',
                'Visualize vectors trên biểu đồ 2D'
            ]
        },
        {
            topic: 'Cửa Sổ Trượt và Quản lý Ngữ cảnh LLM',
            whyLearnThis: 'LLM có giới hạn context window (128k tokens cho GPT-4). Thuật toán Sliding Window giúp bạn quản lý hội thoại dài mà không mất thông tin quan trọng. Đây là kỹ năng cần thiết khi xây dựng AI chatbot production.',
            keyConceptsExplained: [
                'Context Window: Số tokens tối đa LLM có thể "nhìn thấy" cùng lúc',
                'Sliding Window: Kỹ thuật giữ N tin nhắn gần nhất, bỏ tin cũ',
                'Summarization: Tóm tắt tin nhắn cũ để giữ context',
                'Token counting: Đếm tokens để không vượt giới hạn'
            ],
            codeExamples: [
                {
                    language: 'typescript',
                    code: `function manageContext(
  messages: Message[], 
  maxTokens: number = 128000
): Message[] {
  const SYSTEM_PROMPT_TOKENS = 500;
  const RESERVE_TOKENS = 4000; // For response
  
  let available = maxTokens - SYSTEM_PROMPT_TOKENS - RESERVE_TOKENS;
  
  // Sliding Window: Giữ tin nhắn mới nhất
  const result = [];
  for (let i = messages.length - 1; i >= 0; i--) {
    if (available - messages[i].tokens < 0) break;
    result.unshift(messages[i]);
    available -= messages[i].tokens;
  }
  
  return result;
}`,
                    explanation: 'Luôn dành sẵn tokens cho system prompt và response. Ưu tiên giữ tin nhắn mới nhất vì thường relevant nhất.'
                }
            ],
            practicalUseCases: [
                'Chatbot với hội thoại dài (customer support)',
                'Document Q&A với tài liệu lớn',
                'Code review AI giữ context của cả file'
            ],
            tasks: [
                'Giải 10 bài LeetCode về Sliding Window',
                'Implement context manager cho chatbot',
                'Thêm tính năng summarize tin nhắn cũ'
            ]
        }
    ],

    comparisonTables: [
        {
            title: 'Khi nào dùng Distance Metric nào?',
            headers: ['Metric', 'Text', 'Image', 'Audio', 'Cần Normalize?'],
            rows: [
                ['Cosine', '✅ Best', '⚠️ OK', '✅ Good', 'Không'],
                ['Euclidean', '⚠️ OK', '✅ Best', '⚠️ OK', 'Không'],
                ['Dot Product', '✅ Best', '⚠️ OK', '✅ Good', 'BẮT BUỘC']
            ]
        }
    ],

    realWorldProject: {
        name: 'Semantic Search Engine từ đầu',
        description: 'Xây dựng công cụ tìm kiếm ngữ nghĩa hoàn chỉnh: từ việc tạo embeddings đến visualize kết quả.',
        techStack: ['Python', 'NumPy', 'OpenAI API', 'Matplotlib'],
        features: [
            'Load dataset (Wikipedia articles)',
            'Generate embeddings với OpenAI API',
            'Implement 3 distance metrics từ đầu',
            'So sánh recall@k của từng metric',
            'Visualize vectors trong 2D (t-SNE)'
        ],
        learningOutcomes: [
            'Hiểu sâu cách embeddings hoạt động',
            'Biết chọn đúng distance metric cho use case',
            'Có project thực tế để show trong portfolio'
        ]
    },

    resources: [
        { type: 'video', name: 'Đại số tuyến tính', description: 'Video cốt lõi cho AI - học cách máy "nhìn" thế giới', url: 'https://www.youtube.com/watch?v=4fjurajl7Qg&list=PL9ThQmJDQxdhNBpz1VOPJv7odeG28LYpZ' },
        { type: 'video', name: 'Nền tảng C++', description: 'Hiểu sâu về cách máy tính lưu trữ và quản lý dữ liệu', url: 'https://www.youtube.com/watch?v=hu20Ld4Yf-A&list=PLux-_phi0Rz0Hq9fDP4TlOulBl8APKp79' },
        { type: 'docs', name: 'Tài liệu VNOI', description: 'Tài liệu thuật toán chuẩn mực bằng tiếng Việt', url: 'https://vnoi.info/wiki/Home' },
        { type: 'video', name: 'Học Python cơ bản', description: 'Ngôn ngữ số 1 cho AI và xử lý dữ liệu', url: 'https://www.youtube.com/watch?v=cZQ6m3W4OU4' },
        { type: 'practice', name: 'Luyện thuật toán', description: 'Luyện thuật toán hàng ngày - nền tảng phỏng vấn', url: 'https://leetcode.com' }
    ],

    summary: [
        'Toán: Ngôn ngữ để máy hiểu ngữ nghĩa văn bản/hình ảnh',
        'C++: Hiểu tận gốc cách máy tính hoạt động, tối ưu hiệu năng',
        'Thuật toán: Các mẫu giải quyết vấn đề trong hệ thống thực tế'
    ]
};

// ==========================================
// PHASE 2: BACKEND HIỆU NĂNG CAO
// ==========================================

const phase2: RoadmapPhase = {
    id: 'phase-2',
    phase: 'Giai đoạn 02',
    title: 'Backend Hiệu Năng Cao',
    duration: 'Tháng 4-6',
    description: 'Xây dựng Backend tốc độ cao với Bun (nhanh gấp 5-10 lần Node), Hono & Cơ sở dữ liệu Vector Supabase.',
    icon: <Server className="w-6 h-6" />,
    color: 'from-blue-600 to-indigo-600',

    whyImportant: `Tốc độ là tính năng số 1. Trong thế giới AI, mỗi millisecond đều quan trọng: Cold start 500ms của Node.js là 500ms người dùng phải chờ đợi. Bun khởi động trong 50ms - nhanh gấp 10 lần. Hono cho độ trễ 0.44ms thay vì Express 2.42ms. Vector Database là "bộ nhớ dài hạn" của AI - nơi lưu trữ và tìm kiếm embeddings với tốc độ O(log N).`,

    practicalApplications: [
        'AI Chatbot: Streaming responses realtime với độ trễ < 100ms',
        'RAG Pipeline: Tìm kiếm tài liệu liên quan trong < 50ms',
        'Serverless/Edge: Deploy API toàn cầu với cold start < 100ms',
        'Cost Optimization: Throughput gấp 5x = tiết kiệm 80% chi phí server',
        'Multi-tenant SaaS: Row Level Security để mỗi user chỉ thấy data của mình'
    ],

    prerequisites: [
        'Hoàn thành Phase 1 (Nền tảng CS)',
        'JavaScript/TypeScript cơ bản',
        'SQL cơ bản (SELECT, JOIN, INDEX)',
        'Hiểu HTTP, REST API'
    ],

    estimatedHoursPerWeek: 20,

    goals: [
        'Bun Runtime: Môi trường chạy tất-cả-trong-một (JavaScriptCore + Zig)',
        'Hono Framework: Định tuyến siêu nhanh O(1), Hỗ trợ Streaming, Edge',
        'Supabase pgvector: Cơ sở dữ liệu Vector cho AI (HNSW, Bảo mật RLS)',
        'Triển khai Docker & Giám sát (Sentry, Pino Logging)'
    ],

    checkpoints: [
        'API endpoint có latency < 10ms?',
        'Hiểu được HNSW index hoạt động thế nào?',
        'Có thể viết RLS policy để bảo vệ data?',
        'Deploy được Docker container lên cloud?',
        'Setup được monitoring với Sentry?'
    ],

    commonMistakes: [
        'Dùng Express thay vì Hono - chậm gấp 5 lần',
        'Không dùng connection pooling - gây bottleneck DB',
        'Quên setup HNSW index - vector search sẽ O(N) thay vì O(log N)',
        'Không dùng RLS - data leak giữa các users'
    ],

    detailedTopics: [
        {
            topic: 'Bun + Hono: Kiến trúc Hiệu năng Cao',
            whyLearnThis: 'Bun là runtime JavaScript mới viết bằng Zig, dùng JavaScriptCore engine (của Safari) thay vì V8 (của Chrome). Nó nhanh hơn Node.js 5-10 lần và là lựa chọn tối ưu cho AI APIs cần tốc độ cao.',
            keyConceptsExplained: [
                'JavaScriptCore vs V8: JSC tối ưu startup time, V8 tối ưu long-running. AI APIs cần fast startup.',
                'Zig: Ngôn ngữ system-level, memory-safe, compile to native code. Bun dùng Zig để tối ưu I/O.',
                'Hono RegExpRouter: Compile tất cả routes thành 1 RegExp → O(1) lookup thay vì O(N).',
                'Streaming: streamSSE() cho phép gửi từng token về client ngay khi có, không cần chờ đủ response.'
            ],
            codeExamples: [
                {
                    language: 'typescript',
                    code: `import { Hono } from 'hono';
import { streamSSE } from 'hono/streaming';
import { OpenAI } from 'openai';

const app = new Hono();
const openai = new OpenAI();

app.post('/api/chat', async (c) => {
  const { message } = await c.req.json();
  
  return streamSSE(c, async (stream) => {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: message }],
      stream: true,
    });
    
    for await (const chunk of completion) {
      const content = chunk.choices[0]?.delta?.content || '';
      if (content) {
        await stream.writeSSE({ data: JSON.stringify({ content }) });
      }
    }
  });
});`,
                    explanation: 'Streaming SSE cho phép gửi từng token về client ngay lập tức. User thấy AI "đang gõ" thay vì chờ đợi toàn bộ response.'
                }
            ],
            practicalUseCases: [
                'AI Chat API với streaming response',
                'Edge Functions trên Cloudflare Workers',
                'High-throughput webhook processors'
            ],
            tasks: [
                'Setup Bun project với Hono',
                'Benchmark: So sánh với Express',
                'Implement streaming AI chat endpoint'
            ]
        },
        {
            topic: 'PostgreSQL pgvector: Vector Database',
            whyLearnThis: 'Vector Database là "bộ nhớ dài hạn" của AI. Thay vì nhớ mọi thứ trong context window (có giới hạn), bạn lưu embeddings vào DB và tìm kiếm khi cần. pgvector tích hợp trực tiếp vào PostgreSQL, không cần thêm service riêng.',
            keyConceptsExplained: [
                'HNSW (Hierarchical Navigable Small World): Thuật toán tìm kiếm vector nhanh nhất, O(log N) complexity.',
                'Index parameters: m=16 (connections per node), ef_construction=64 (build quality).',
                'Row Level Security (RLS): PostgreSQL feature cho phép filter data ở database level, không cần code.',
                'Hybrid Search: Kết hợp semantic (vector) + keyword (full-text) để có kết quả tốt nhất.'
            ],
            codeExamples: [
                {
                    language: 'sql',
                    code: `-- Enable pgvector
CREATE EXTENSION IF NOT EXISTS vector;

-- Create table with vector column
CREATE TABLE documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  content text NOT NULL,
  embedding vector(1536), -- OpenAI dimension
  user_id uuid REFERENCES auth.users(id)
);

-- HNSW Index for fast similarity search
CREATE INDEX idx_embedding_hnsw ON documents 
USING hnsw (embedding vector_cosine_ops)
WITH (m = 16, ef_construction = 64);

-- Row Level Security
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users see own docs" ON documents
  FOR SELECT USING (auth.uid() = user_id);`,
                    explanation: 'HNSW index biến vector search từ O(N) thành O(log N). Với 1 triệu documents, từ 1000ms → 10ms. RLS đảm bảo mỗi user chỉ thấy data của mình.'
                }
            ],
            practicalUseCases: [
                'Semantic search cho documents',
                'RAG pipeline: Tìm context cho LLM',
                'Similar items recommendation'
            ],
            tasks: [
                'Setup Supabase project với pgvector',
                'Implement similarity search function',
                'Viết Hybrid Search (vector + keyword)'
            ]
        }
    ],

    comparisonTables: [
        {
            title: 'Bun vs Node.js Performance',
            headers: ['Metric', 'Node+Express', 'Bun+Hono', 'Improvement'],
            rows: [
                ['Requests/sec', '20,000', '111,000', '5.5x'],
                ['Latency p50', '2.42ms', '0.44ms', '5.5x'],
                ['Latency p99', '15ms', '2ms', '7.5x'],
                ['Memory', '80MB', '45MB', '1.8x'],
                ['Cold Start', '500ms', '50ms', '10x']
            ]
        }
    ],

    realWorldProject: {
        name: 'AI Proxy API',
        description: 'Xây dựng cổng AI hoàn chỉnh: Rate Limiting, Auth, Streaming, Usage Tracking.',
        techStack: ['Bun', 'Hono', 'Supabase', 'OpenAI API', 'Cloudflare Workers'],
        features: [
            'Rate limiting với Sliding Window algorithm',
            'JWT authentication',
            'Stream responses từ OpenAI/Claude',
            'Usage tracking per user',
            'Deploy lên Cloudflare Workers'
        ],
        learningOutcomes: [
            'Xây được high-performance API từ đầu',
            'Hiểu cách xử lý streaming trong production',
            'Experience với edge deployment'
        ]
    },

    resources: [
        { type: 'tool', name: 'Bun', description: 'Môi trường chạy JavaScript siêu nhanh', url: 'https://bun.sh' },
        { type: 'tool', name: 'Hono', description: 'Framework web nhẹ, tốc độ cao', url: 'https://hono.dev' },
        { type: 'docs', name: 'Supabase', description: 'Nền tảng Backend mã nguồn mở', url: 'https://supabase.com/docs' },
        { type: 'docs', name: 'pgvector', description: 'Mở rộng Vector cho PostgreSQL', url: 'https://github.com/pgvector/pgvector' }
    ],

    summary: [
        'Hiệu năng: Gấp 5.5 lần thông lượng so với Node+Express',
        'Edge: Triển khai lên Cloudflare Workers không cần cấu hình',
        'Dữ liệu: Tìm kiếm kết hợp (Ngữ nghĩa + Từ khóa)'
    ]
};

// ==========================================
// PHASE 3: FRONTEND AI-NATIVE
// ==========================================

const phase3: RoadmapPhase = {
    id: 'phase-3',
    phase: 'Giai đoạn 03',
    title: 'Frontend AI-Native',
    duration: 'Tháng 7-9',
    description: 'Viết code cùng AI (Vibe Coding): Next.js 15 (Turbopack <1s), React 19 (Server Actions), Shadcn v4 + MCP cho năng suất gấp 10.',
    icon: <Layout className="w-6 h-6" />,
    color: 'from-cyan-500 to-teal-500',

    whyImportant: `AI-Native = điều khiển AI, không chỉ sử dụng AI. MCP (Model Context Protocol) cho phép AI đọc tài liệu trực tiếp - không còn bịa đặt props hay APIs sai. Vibe Coding: AI viết 90% code giao diện, con người tập trung vào kiến trúc và logic nghiệp vụ. Đây là tương lai của lập trình - năng suất gấp 10 lần.`,

    practicalApplications: [
        'Vibe Coding: Xây landing page trong 30 phút thay vì 3 giờ',
        'Generative UI: AI tự động tạo dashboard từ mô tả',
        'Server Components: Giảm 70-80% JavaScript bundle size',
        'Streaming UI: User thấy AI "đang nghĩ" thay vì loading spinner',
        'MCP Integration: AI luôn dùng đúng API/props của Shadcn, Supabase'
    ],

    prerequisites: [
        'Hoàn thành Phase 2 (Backend)',
        'React cơ bản (components, hooks)',
        'CSS/Tailwind cơ bản',
        'Hiểu async/await, Promises'
    ],

    estimatedHoursPerWeek: 20,

    goals: [
        'Next.js 15: Turbopack, Server Components (0KB JS), Server Actions',
        'React 19: Không cần ForwardRef, useActionState mới',
        'Shadcn v4: Kiểu data-slots, Sở hữu code 100%',
        'Vibe Coding: Framework VIBE + Cline lập kế hoạch & thực thi'
    ],

    checkpoints: [
        'Có thể giải thích Server vs Client Components?',
        'Biết khi nào dùng Server Actions vs API Routes?',
        'Setup được MCP servers cho Cline?',
        'Có thể prompt AI để tạo UI hoàn chỉnh?',
        'Đã xây được 1 SaaS với 90% code từ AI?'
    ],

    commonMistakes: [
        'Dùng "use client" ở mọi nơi - mất lợi ích của Server Components',
        'Không setup MCP - AI sẽ bịa đặt props/APIs',
        'Prompt quá chung chung - kết quả 6/10 thay vì 9.5/10',
        'Không review code AI tạo - có thể có bugs ẩn'
    ],

    detailedTopics: [
        {
            topic: 'Next.js 15: Server Components & Streaming',
            whyLearnThis: 'Server Components là cuộc cách mạng trong React. Component chạy trên server, gửi HTML về client - 0KB JavaScript. Điều này có nghĩa: tải trang nhanh hơn, SEO tốt hơn, và có thể truy cập DB trực tiếp từ component.',
            keyConceptsExplained: [
                'Turbopack: Bundler mới viết bằng Rust, biên dịch trong 1.5s thay vì Webpack 15s.',
                'Server Components: Default trong Next.js 15. Không gửi JS, có thể await DB queries trực tiếp.',
                'Client Components: Thêm "use client" khi cần interactivity (onClick, useState, etc).',
                'Server Actions: Thêm "use server" để gọi server function từ client - không cần API routes.'
            ],
            codeExamples: [
                {
                    language: 'typescript',
                    code: `// Server Component (default) - 0KB JS sent to client!
async function ChatPage() {
  const supabase = createClient();
  
  // Direct DB access - no API needed
  const { data: history } = await supabase
    .from('messages')
    .select('*');
  
  return (
    <div>
      <h1>AI Chat</h1>
      {/* Client Component for interactivity */}
      <ChatInterface initialMessages={history} />
    </div>
  );
}`,
                    explanation: 'ChatPage là Server Component - chạy trên server, query DB trực tiếp, gửi HTML về client. ChatInterface là Client Component - có interactivity, cần "use client".'
                }
            ],
            practicalUseCases: [
                'Dashboard với data từ nhiều sources',
                'Landing pages SEO-optimized',
                'Forms với Server Actions'
            ],
            tasks: [
                'Convert 1 page từ full client sang hybrid server/client',
                'Implement Server Action cho form submission',
                'So sánh bundle size trước/sau'
            ]
        },
        {
            topic: 'MCP & Vibe Coding',
            whyLearnThis: 'MCP (Model Context Protocol) là cách AI đọc documentation trực tiếp. Thay vì bịa đặt props của Shadcn hay schema của Supabase, AI có access đến nguồn chính xác. Kết hợp với VIBE framework, output quality từ 6/10 lên 9.5/10.',
            keyConceptsExplained: [
                'MCP Servers: Cung cấp context cho AI - Shadcn docs, Supabase schema, custom APIs.',
                'VIBE Framework: V(Vibe/Style), I(Intent), B(Blocks), E(Enhancers) - cấu trúc prompt hiệu quả.',
                'Plan & Act Mode: AI đề xuất kế hoạch, bạn duyệt, AI thực thi - human-in-the-loop.',
                'Chain of Thought: Bảo AI "think step-by-step" để có kết quả tốt hơn.'
            ],
            codeExamples: [
                {
                    language: 'markdown',
                    code: `**VIBE:**
- Style: Modern, Clean, Linear-inspired
- Colors: Slate gray with blue accents

**INTENT:**
Create a landing page for an AI writing tool

**BLOCKS:**
1. Hero Section (headline, CTA, animated bg)
2. Features Grid (3 columns)
3. Waitlist Form (email + validation)

**ENHANCERS:**
- Responsive (mobile-first)
- Dark mode support
- WCAG AA accessibility`,
                    explanation: 'VIBE framework giúp cấu trúc prompt rõ ràng. AI output đạt 9.5/10 thay vì 6/10 với prompt chung chung.'
                }
            ],
            practicalUseCases: [
                'Tự động tạo dashboard từ mô tả',
                'Generate landing pages trong 30 phút',
                'Refactor codebase với AI assistance'
            ],
            tasks: [
                'Setup MCP servers cho Cline (Shadcn + Supabase)',
                'Thực hành VIBE prompts cho 5 UI components',
                'Xây 1 feature hoàn chỉnh với Plan & Act mode'
            ]
        }
    ],

    comparisonTables: [
        {
            title: 'Server vs Client Components',
            headers: ['Feature', 'Server Component', 'Client Component'],
            rows: [
                ['JS Bundle', '0 KB', 'Included'],
                ['Data Fetching', 'Direct DB', 'API required'],
                ['Secret Keys', '✅ Safe', '❌ Exposed'],
                ['Interactivity', '❌ Static', '✅ Dynamic'],
                ['Use Case', 'Layouts, Lists', 'Forms, Chat']
            ]
        }
    ],

    realWorldProject: {
        name: 'SaaS với 90% code từ AI',
        description: 'Xây dựng ứng dụng SaaS hoàn chỉnh sử dụng Vibe Coding methodology.',
        techStack: ['Next.js 15', 'React 19', 'Shadcn v4', 'Cline + MCP', 'Supabase'],
        features: [
            'Authentication với Supabase Auth',
            'Dashboard với data visualization',
            'CRUD operations với Server Actions',
            'Responsive design (mobile-first)',
            'Dark mode support'
        ],
        learningOutcomes: [
            'Thành thạo Vibe Coding workflow',
            'Hiểu sâu Server/Client Components',
            'Experience với MCP integration',
            'Đo được: năng suất gấp 10 lần so với code tay'
        ]
    },

    resources: [
        { type: 'docs', name: 'Next.js 15', description: 'App Router, Server Components, Server Actions', url: 'https://nextjs.org/docs' },
        { type: 'tool', name: 'Shadcn UI', description: 'Thư viện component copy-paste', url: 'https://ui.shadcn.com' },
        { type: 'tool', name: 'Cline', description: 'AI Agent tự động viết code', url: 'https://github.com/cline/cline' }
    ],

    summary: [
        'Tốc độ: Turbopack biên dịch <1s, hot reload <100ms',
        'Quy trình: Người duyệt (Lập kế hoạch → Xem xét → Thực thi)',
        'Chất lượng: AI tạo giao diện hoàn hảo nhờ MCP cung cấp ngữ cảnh'
    ]
};

// ==========================================
// PHASE 4: HỆ THỐNG NÂNG CAO & BẢO MẬT
// ==========================================

const phase4: RoadmapPhase = {
    id: 'phase-4',
    phase: 'Giai đoạn 04',
    title: 'Hệ thống Nâng cao & Bảo mật',
    duration: 'Tháng 10-12',
    description: 'Hiệu năng <10ms, Kiến trúc Microservices, Redis Cache, Tăng cường Bảo mật (Rate Limiting, Zod, RLS).',
    icon: <Shield className="w-6 h-6" />,
    color: 'from-red-600 to-rose-600',

    whyImportant: `Quy mô là tất cả: Code chỉ chiếm 20%, Kiến trúc chiếm 80% của một hệ thống production. Một endpoint chậm 1 giây = mất 7% conversions. Một lỗ hổng bảo mật = mất toàn bộ users. Ở giai đoạn này, bạn học cách xây dựng hệ thống chịu được hàng triệu requests và bảo vệ data của users.`,

    practicalApplications: [
        'Performance: Latency < 50ms cho mọi endpoint',
        'Scalability: Hệ thống chịu được traffic spikes',
        'Security: Bảo vệ khỏi SQL injection, XSS, rate limit attacks',
        'Reliability: 99.9% uptime với proper monitoring',
        'Cost: Tối ưu resources, giảm cloud bill 50%+'
    ],

    prerequisites: [
        'Hoàn thành Phase 3 (Frontend)',
        'Đã deploy ít nhất 1 app lên production',
        'Hiểu Docker basics',
        'SQL intermediate level'
    ],

    estimatedHoursPerWeek: 15,

    goals: [
        'Performance: Sửa N+1 queries, EXPLAIN ANALYZE, Cache strategies',
        'Caching: Redis/Upstash cho hot data, embedding cache',
        'System Design: Microservices, Message Queues, Kubernetes basics',
        'Security: Rate limiting, Input validation (Zod), CORS, RLS'
    ],

    checkpoints: [
        'Có thể phát hiện và sửa N+1 query problem?',
        'Đã setup Redis cache cho embeddings?',
        'Lighthouse score > 95?',
        'Đã implement rate limiting?',
        'Sentry monitoring hoạt động?'
    ],

    commonMistakes: [
        'Premature optimization - profile trước, optimize sau',
        'Cache everything - chỉ cache hot paths',
        'Microservices từ đầu - monolith first, split later',
        'Security as afterthought - phải built-in từ đầu'
    ],

    detailedTopics: [
        {
            topic: 'Database & Query Optimization',
            whyLearnThis: 'Database thường là bottleneck #1 của mọi ứng dụng. Một query N+1 biến 1 request thành 1000 queries. EXPLAIN ANALYZE giúp bạn "nhìn thấy" database đang làm gì và tối ưu đúng chỗ.',
            keyConceptsExplained: [
                'N+1 Problem: Fetch list rồi loop query từng item. Fix bằng JOIN hoặc batch loading.',
                'EXPLAIN ANALYZE: Xem query plan, execution time, index usage.',
                'Index Strategy: B-Tree cho range queries, Hash cho equality, GIN cho full-text, HNSW cho vectors.',
                'Connection Pooling: Reuse DB connections thay vì tạo mới mỗi request.'
            ],
            codeExamples: [
                {
                    language: 'sql',
                    code: `-- BAD: N+1 Query Problem  
SELECT * FROM posts; -- 1 query
-- Then for each post:
SELECT * FROM users WHERE id = post.user_id; -- N queries

-- GOOD: Single JOIN query
SELECT 
  posts.*,
  users.name as author_name
FROM posts
JOIN users ON posts.user_id = users.id;

-- Check query performance
EXPLAIN ANALYZE
SELECT * FROM documents
WHERE embedding <=> $1
ORDER BY embedding <=> $1
LIMIT 10;
-- Output: Index Scan using hnsw, Execution Time: 2.456ms`,
                    explanation: 'EXPLAIN ANALYZE cho thấy query đang dùng index hnsw và chạy trong 2.456ms - đạt target < 10ms.'
                }
            ],
            practicalUseCases: [
                'API endpoints với latency < 50ms',
                'Dashboard với complex queries',
                'Search với millions of records'
            ],
            tasks: [
                'Profile 1 slow endpoint, tìm N+1 và fix',
                'Analyze tất cả vector searches với EXPLAIN ANALYZE',
                'Setup pg_stat_statements để track slow queries'
            ]
        },
        {
            topic: 'Security Hardening',
            whyLearnThis: 'Một lỗ hổng bảo mật có thể phá hủy cả business. Rate limiting ngăn DDoS. Input validation ngăn injection. RLS ngăn data leaks. Đây không phải optional - đây là bắt buộc cho production.',
            keyConceptsExplained: [
                'Rate Limiting: Giới hạn requests/user/time window. Dùng Sliding Window algorithm.',
                'Input Validation: Zod schema để validate và sanitize mọi input.',
                'CORS: Chỉ cho phép requests từ trusted domains.',
                'Row Level Security: Database-level access control, không thể bypass từ code.'
            ],
            codeExamples: [
                {
                    language: 'typescript',
                    code: `import { Ratelimit } from '@upstash/ratelimit';
import { z } from 'zod';

// Rate Limiting
const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, '10 s'),
});

app.use('/api/*', async (c, next) => {
  const ip = c.req.header('x-forwarded-for') || 'anon';
  const { success } = await ratelimit.limit(ip);
  
  if (!success) return c.json({ error: 'Rate limited' }, 429);
  await next();
});

// Input Validation with Zod
const messageSchema = z.object({
  content: z.string().min(1).max(5000),
  replyTo: z.string().uuid().optional(),
});

app.post('/api/messages', async (c) => {
  const parsed = messageSchema.safeParse(await c.req.json());
  if (!parsed.success) return c.json({ error: parsed.error }, 400);
  // Safe to use parsed.data
});`,
                    explanation: 'Sliding window rate limiting cho 10 requests/10 giây. Zod đảm bảo input luôn hợp lệ trước khi xử lý.'
                }
            ],
            practicalUseCases: [
                'API công khai cần rate limiting',
                'User input validation',
                'Multi-tenant data isolation'
            ],
            tasks: [
                'Implement rate limiting với Upstash',
                'Add Zod validation cho tất cả endpoints',
                'Audit RLS policies trong Supabase'
            ]
        }
    ],

    realWorldProject: {
        name: 'Production Audit & Optimization',
        description: 'Audit và optimize ứng dụng đã xây ở Phase 3 để production-ready.',
        techStack: ['Redis/Upstash', 'Sentry', 'Pino Logger', 'Zod', 'Docker'],
        features: [
            'Sửa tất cả N+1 queries',
            'Setup Redis cache cho embeddings',
            'Implement rate limiting',
            'Add Zod validation cho all inputs',
            'Setup Sentry error tracking',
            'Configure Pino structured logging',
            'Docker deployment với health checks'
        ],
        learningOutcomes: [
            'Hiểu cách audit và optimize production app',
            'Experience với real monitoring tools',
            'Security mindset built-in'
        ]
    },

    resources: [
        { type: 'book', name: 'Designing Data-Intensive Apps', description: 'Kinh thánh Thiết kế hệ thống', url: '' },
        { type: 'tool', name: 'Sentry', description: 'Theo dõi lỗi ứng dụng', url: 'https://sentry.io' },
        { type: 'practice', name: 'System Design Primer', description: 'Tài liệu GitHub', url: 'https://github.com/donnemartin/system-design-primer' }
    ],

    summary: [
        'Quy mô: Hàng triệu requests (Optimization + Cache)',
        'An toàn: Rate limit, Input validation, RLS',
        'Đáng tin: Sentry monitoring, Structured logging'
    ]
};

// ==========================================
// PHASE 5: DỰ ÁN TỔNG HỢP - IDEAFORGE
// ==========================================

const phase5: RoadmapPhase = {
    id: 'phase-5',
    phase: 'Giai đoạn 05',
    title: 'Dự án Tổng hợp: IdeaForge',
    duration: 'Tháng 13-18',
    description: 'Nền tảng Ý tưởng Startup hỗ trợ AI: SaaS full-stack kết hợp toàn bộ kỹ năng đã học (Backend, Vector DB, Frontend, AI, Production).',
    icon: <Rocket className="w-6 h-6" />,
    color: 'from-purple-600 to-violet-600',

    whyImportant: `Mọi thứ hội tụ: Đây là lúc bạn chứng minh năng lực Kỹ sư AI-Native. Bạn sẽ xây một SaaS thực sự với người dùng thực, có thể tạo doanh thu. Backend Bun/Hono, tìm kiếm tương tự pgvector, giao diện Next.js, phân tích Claude qua MCP - tất cả kết hợp thành một sản phẩm hoàn chỉnh. Đây là portfolio tốt nhất cho career.`,

    practicalApplications: [
        'Full-stack SaaS: Từ idea đến product có users',
        'AI Integration: Embeddings, RAG, Claude Analysis',
        'Real-time Features: Supabase Realtime, collaborative editing',
        'Monetization: Stripe integration, subscription model',
        'Scale: Handle 1000+ active users'
    ],

    prerequisites: [
        'Hoàn thành Phase 1-4',
        'Có 1 production app đã deploy',
        'Hiểu cơ bản về business/startup',
        'Willing to market và get real users'
    ],

    estimatedHoursPerWeek: 25,

    goals: [
        'Kiến trúc Full-stack: Next.js + Bun + Supabase',
        'Cộng tác thời gian thực: Supabase Channels',
        'Phân tích AI: Claude 3.7 qua MCP + Prompt VIBE',
        'Ra mắt thực tế: 1000+ người dùng, Stripe, Phân tích dữ liệu'
    ],

    checkpoints: [
        'MVP hoàn chỉnh và deployed?',
        'AI Analysis feature hoạt động?',
        'Real-time commenting working?',
        'Stripe integration done?',
        'Có 100+ real users?',
        'Có revenue (tùy chọn)?'
    ],

    commonMistakes: [
        'Over-engineering từ đầu - build MVP first, optimize later',
        'Không marketing - product tốt vẫn cần marketing',
        'Ignore user feedback - iterate based on real usage',
        'Burn out - pace yourself, 6 months is a marathon'
    ],

    detailedTopics: [
        {
            topic: 'Architecture & MVP',
            whyLearnThis: 'Đây là lúc bạn apply tất cả kiến thức vào một dự án thực. Architecture quyết định 80% thành công của project. MVP mindset giúp bạn ship nhanh và iterate based on feedback.',
            keyConceptsExplained: [
                'Tech Stack Selection: Next.js 15 (Landing+Dashboard) + Bun+Hono (API) + Supabase (DB+Auth+Realtime)',
                'MVP Features: Chỉ build features cần thiết nhất, cut ruthlessly',
                'Idea Submission: Form → Embedding → Store → Queue similar search',
                'Similar Ideas Detection: Hybrid search (vector + keyword) với threshold 0.85'
            ],
            codeExamples: [
                {
                    language: 'typescript',
                    code: `// app/ideas/submit/actions.ts
'use server'

export async function submitIdea(formData: FormData) {
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  
  // Generate embedding
  const embedding = await openai.embeddings.create({
    model: 'text-embedding-3-large',
    input: \`\${title}\\n\\n\${description}\`,
  });
  
  // Store in DB
  const { data: idea } = await supabase.from('ideas').insert({
    title,
    description,
    embedding: embedding.data[0].embedding,
    user_id: (await getUser()).id,
  }).select().single();
  
  // Find similar ideas (background job)
  await embeddingQueue.add('find-similar', { ideaId: idea.id });
  
  return { success: true, ideaId: idea.id };
}`,
                    explanation: 'Server Action để submit idea: generate embedding, store, queue background job để tìm similar ideas. Non-blocking cho UX tốt.'
                }
            ],
            practicalUseCases: [
                'Idea submission với AI embedding',
                'Similar ideas detection',
                'User dashboard với real-time updates'
            ],
            tasks: [
                'Setup project với Next.js 15 + Bun + Supabase',
                'Build idea submission flow',
                'Implement similar ideas detection'
            ]
        },
        {
            topic: 'AI Analysis & Real-time',
            whyLearnThis: 'AI Analysis là killer feature của IdeaForge. Claude phân tích feasibility của startup ideas. Real-time features (commenting, voting) tạo engagement. Đây là những gì biến app thành product.',
            keyConceptsExplained: [
                'Claude Analysis: VIBE prompt để phân tích Market size, Competitors, Technical feasibility, Revenue model, Risks.',
                'Real-time Subscriptions: Supabase channel cho live comments, votes.',
                'Streaming Response: User thấy AI "đang phân tích" thay vì loading spinner.',
                'Background Jobs: Heavy tasks (embedding, analysis) chạy async.'
            ],
            codeExamples: [
                {
                    language: 'typescript',
                    code: `// Real-time collaboration
useEffect(() => {
  const channel = supabase
    .channel(\`idea:\${ideaId}\`)
    .on('postgres_changes', {
      event: '*',
      schema: 'public',
      table: 'comments',
      filter: \`idea_id=eq.\${ideaId}\`
    }, (payload) => {
      setComments(prev => [...prev, payload.new]);
    })
    .subscribe();
  
  return () => channel.unsubscribe();
}, [ideaId]);`,
                    explanation: 'Supabase Realtime subscription - khi có comment mới, UI update ngay lập tức. Latency < 50ms.'
                }
            ],
            practicalUseCases: [
                'AI-powered idea analysis',
                'Real-time commenting system',
                'Live voting and feedback'
            ],
            tasks: [
                'Implement Claude analysis với VIBE prompts',
                'Setup Supabase Realtime cho comments',
                'Add streaming response for analysis'
            ]
        },
        {
            topic: 'Launch & Scale',
            whyLearnThis: 'Product tốt không tự sell. Marketing, Stripe integration, analytics - đây là những gì biến side project thành real business. Bạn sẽ học cách launch và iterate based on real data.',
            keyConceptsExplained: [
                'Stripe Integration: Free tier (5 ideas/month), Pro ($10/month unlimited), Enterprise ($50/month team).',
                'Analytics: Track submissions, AI analyses, conversions (free→pro).',
                'SEO: Proper metadata, sitemap, Lighthouse 95+.',
                'Marketing: Product Hunt, Twitter, communities.'
            ],
            practicalUseCases: [
                'Subscription billing với Stripe',
                'Usage analytics dashboard',
                'SEO optimization for organic traffic'
            ],
            tasks: [
                'Setup Stripe với subscription tiers',
                'Build analytics dashboard',
                'Optimize for SEO (metadata, sitemap)',
                'Launch on Product Hunt'
            ]
        }
    ],

    realWorldProject: {
        name: 'IdeaForge: AI-Powered Startup Idea Platform',
        description: 'Nền tảng để submit startup ideas, AI phân tích feasibility, tìm similar ideas, và collaborate với community.',
        techStack: ['Next.js 15', 'Bun + Hono', 'Supabase (pgvector, RLS, Realtime)', 'Claude API', 'Stripe', 'Vercel'],
        features: [
            'Idea submission với AI embedding',
            'Similar ideas detection (Hybrid search)',
            'Claude AI analysis (Market, Tech, Revenue, Risks)',
            'Real-time commenting và voting',
            'Stripe subscriptions (Free/Pro/Enterprise)',
            'Analytics dashboard',
            'SEO optimized, Lighthouse 95+'
        ],
        learningOutcomes: [
            'Full-stack AI SaaS từ 0 đến production',
            'Real users, real feedback, real iteration',
            'Portfolio showcasing AI-Native Engineer skills',
            'Optional: Real revenue (MRR > $500)'
        ]
    },

    resources: [
        { type: 'mental', name: 'Indie Hackers', description: 'Tư duy sản phẩm & kiếm tiền', url: 'https://www.indiehackers.com' },
        { type: 'practice', name: 'LeetCode', description: 'Tiếp tục luyện thuật toán', url: 'https://leetcode.com' },
        { type: 'docs', name: 'Stripe Docs', description: 'Payment integration', url: 'https://stripe.com/docs' }
    ],

    summary: [
        'Sản phẩm: Từ ý tưởng đến Thị trường (Người dùng thực và Doanh thu)',
        'Tích hợp: Full Stack AI (tất cả kỹ năng kết hợp)',
        'Thành thạo: Portfolio chứng minh năng lực Kỹ sư AI-Native'
    ]
};

// Export all phases
export const roadmapData: RoadmapPhase[] = [phase1, phase2, phase3, phase4, phase5];

