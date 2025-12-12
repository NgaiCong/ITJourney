export interface VocabularyItem {
    term: string;
    meaning: string;
    example: string;
    type: string; // noun, verb, adjective, etc.
    ipa: string;
}

export const vocabularyData: Record<string, VocabularyItem[]> = {
    'Phần cứng & Hệ thống': [
        { term: 'Latency', meaning: 'Độ trễ', example: 'Reduce latency to improve user experience.', type: 'noun', ipa: '/ˈleɪ.tən.si/' },
        { term: 'Throughput', meaning: 'Thông lượng', example: 'The server can handle high throughput.', type: 'noun', ipa: '/ˈθruː.pʊt/' },
        { term: 'Cache', meaning: 'Bộ nhớ đệm', example: 'Clear the cache to see changes.', type: 'noun/verb', ipa: '/kæʃ/' },
        { term: 'Register', meaning: 'Thanh ghi', example: 'CPU registers store temporary data.', type: 'noun', ipa: '/ˈredʒ.ɪ.stər/' },
        { term: 'Buffer', meaning: 'Bộ đệm', example: 'Data is stored in the buffer temporarily.', type: 'noun', ipa: '/ˈbʌf.ər/' },
        { term: 'Stack', meaning: 'Ngăn xếp', example: 'Local variables are stored on the stack.', type: 'noun', ipa: '/stæk/' },
        { term: 'Heap', meaning: 'Vùng nhớ đống', example: 'Dynamic memory is allocated on the heap.', type: 'noun', ipa: '/hiːp/' },
        { term: 'Pointer', meaning: 'Con trỏ', example: 'A pointer stores the memory address.', type: 'noun', ipa: '/ˈpɔɪn.tər/' },
        { term: 'Thread', meaning: 'Luồng', example: 'Multi-threaded apps run faster.', type: 'noun', ipa: '/θred/' },
        { term: 'Process', meaning: 'Tiến trình', example: 'Each process has its own memory space.', type: 'noun', ipa: '/ˈprəʊ.ses/' },
    ],
    'Phát triển Phần mềm': [
        { term: 'Deploy', meaning: 'Triển khai', example: 'Deploy the app to production server.', type: 'verb', ipa: '/dɪˈplɔɪ/' },
        { term: 'Repository', meaning: 'Kho mã nguồn', example: 'Push your code to the repository.', type: 'noun', ipa: '/rɪˈpɒz.ɪ.tər.i/' },
        { term: 'Commit', meaning: 'Lưu thay đổi', example: 'Commit your changes before pushing.', type: 'verb/noun', ipa: '/kəˈmɪt/' },
        { term: 'Merge Conflict', meaning: 'Xung đột mã', example: 'Resolve the merge conflict first.', type: 'noun', ipa: '/mɜːdʒ ˈkɒn.flɪkt/' },
        { term: 'Dependency', meaning: 'Thư viện phụ thuộc', example: 'Install all dependencies.', type: 'noun', ipa: '/dɪˈpen.dən.si/' },
        { term: 'Refactor', meaning: 'Tái cấu trúc', example: 'Refactor the code for readability.', type: 'verb', ipa: '/ˌriːˈfæk.tər/' },
        { term: 'Debug', meaning: 'Gỡ lỗi', example: 'Debug the function to find the bug.', type: 'verb', ipa: '/ˌdiːˈbʌɡ/' },
        { term: 'API', meaning: 'Giao diện lập trình', example: 'Call the REST API to get data.', type: 'noun', ipa: '/ˌeɪ.piːˈaɪ/' },
        { term: 'Framework', meaning: 'Khung phần mềm', example: 'React is a popular framework.', type: 'noun', ipa: '/ˈfreɪm.wɜːk/' },
        { term: 'Library', meaning: 'Thư viện', example: 'Import the math library.', type: 'noun', ipa: '/ˈlaɪ.brər.i/' },
    ],
    'Dữ liệu & Logic': [
        { term: 'Query', meaning: 'Truy vấn', example: 'Write a SQL query to fetch data.', type: 'noun/verb', ipa: '/ˈkwɪə.ri/' },
        { term: 'Schema', meaning: 'Cấu trúc dữ liệu', example: 'Define the database schema first.', type: 'noun', ipa: '/ˈskiː.mə/' },
        { term: 'Normalization', meaning: 'Chuẩn hóa', example: 'Normalize the database to reduce redundancy.', type: 'noun', ipa: '/ˌnɔː.mə.laɪˈzeɪ.ʃən/' },
        { term: 'Recursion', meaning: 'Đệ quy', example: 'Use recursion for tree traversal.', type: 'noun', ipa: '/rɪˈkɜː.ʃən/' },
        { term: 'Iteration', meaning: 'Lặp', example: 'Use iteration instead of recursion.', type: 'noun', ipa: '/ˌɪt.əˈreɪ.ʃən/' },
        { term: 'Exception', meaning: 'Ngoại lệ', example: 'Handle the exception gracefully.', type: 'noun', ipa: '/ɪkˈsep.ʃən/' },
        { term: 'Algorithm', meaning: 'Thuật toán', example: 'Implement a sorting algorithm.', type: 'noun', ipa: '/ˈæl.ɡə.rɪ.ðəm/' },
        { term: 'Complexity', meaning: 'Độ phức tạp', example: 'The time complexity is O(n log n).', type: 'noun', ipa: '/kəmˈplek.sə.ti/' },
        { term: 'Boolean', meaning: 'Kiểu đúng/sai', example: 'A boolean value is true or false.', type: 'noun/adj', ipa: '/ˈbuː.li.ən/' },
        { term: 'Variable', meaning: 'Biến', example: 'Declare a variable to store data.', type: 'noun', ipa: '/ˈveə.ri.ə.bəl/' },
    ],
    'Quy trình & Agile': [
        { term: 'Scalability', meaning: 'Khả năng mở rộng', example: 'Design for scalability from the start.', type: 'noun', ipa: '/ˌskeɪ.ləˈbɪl.ə.ti/' },
        { term: 'Maintainability', meaning: 'Khả năng bảo trì', example: 'Good code has high maintainability.', type: 'noun', ipa: '/meɪnˌteɪ.nəˈbɪl.ə.ti/' },
        { term: 'Technical Debt', meaning: 'Nợ kỹ thuật', example: 'Accumulating technical debt slows development.', type: 'noun', ipa: '/ˌtek.nɪ.kəl ˈdet/' },
        { term: 'Sprint', meaning: 'Giai đoạn ngắn', example: 'We complete features in 2-week sprints.', type: 'noun', ipa: '/sprɪnt/' },
        { term: 'Backlog', meaning: 'Danh sách việc cần làm', example: 'Add the task to the product backlog.', type: 'noun', ipa: '/ˈbæk.lɒɡ/' },
        { term: 'Standup', meaning: 'Họp nhanh hàng ngày', example: 'We have a standup every morning.', type: 'noun', ipa: '/ˈstænd.ʌp/' },
        { term: 'Retrospective', meaning: 'Họp nhìn lại', example: 'Discuss improvements in the retrospective.', type: 'noun', ipa: '/ˌret.rəˈspek.tɪv/' },
        { term: 'MVP', meaning: 'Sản phẩm khả dụng tối thiểu', example: 'Launch the MVP first, then iterate.', type: 'abbreviation', ipa: '/ˌem.viːˈpiː/' },
        { term: 'Deployment Pipeline', meaning: 'Quy trình triển khai', example: 'The CI/CD pipeline automates deployment.', type: 'noun', ipa: '/dɪˈplɔɪ.mənt ˈpaɪp.laɪn/' },
        { term: 'Code Review', meaning: 'Đánh giá mã', example: 'Request a code review before merging.', type: 'noun', ipa: '/kəʊd rɪˈvjuː/' },
    ],
};
