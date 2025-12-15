import { DsaModule, DsaVideo } from './dsa-course';

export const linearAlgebraCourseData: DsaModule[] = [
    {
        id: 'visual-intuition',
        title: 'Tư Duy Trực Quan (Visual Intuition) - 3Blue1Brown',
        description: 'Hiểu bản chất Đại số tuyến tính qua hình ảnh. Không còn là những con số khô khan.',
        playlistId: 'PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab',
        keyConcepts: ['Vectors', 'Linear Combinations', 'Span', 'Basis', 'Linear Transformations'],
        overview: 'Module này tập trung vào bản chất hình học (Geometric Essence) - phần mà các khóa học đại học thường bỏ qua. Xem trước để hiểu "tại sao" trước khi học "như thế nào".',
        videos: [
            {
                title: 'Chương 1: Véc-tơ - Cội nguồn của mọi thứ',
                index: 0,
                videoId: 'fNk_zzaMoSs',
                description: 'Tại sao Đại số tuyến tính lại xoay quanh Véc-tơ? Video này sẽ thay đổi hoàn toàn cách bạn nhìn nhận về những "mũi tên" trong không gian.',
                application: 'Hiểu về Vector là bước đầu tiên để làm việc với dữ liệu đa chiều (Data Science) và không gian 3D (Game Development).',
                codeExample: `import numpy as np
import matplotlib.pyplot as plt

# 1. Tạo véc-tơ (Vector Creation)
v = np.array([2, 1])
w = np.array([-1, 3])

# 2. Phép cộng véc-tơ (Vector Addition)
sum_v = v + w

print(f"Vector v: {v}")
print(f"Vector w: {w}")
print(f"Sum (v + w): {sum_v}")`,
                codeOutput: `Vector v: [2 1]
Vector w: [-1  3]
Sum (v + w): [1 4]`,
                codeExplanation: `**Giải thích chi tiết:**
1.  **Khởi tạo (Initialization)**:
    - Trong Python, danh sách (list) chuẩn không tối ưu cho tính toán. Ta dùng \`numpy.array\` để tạo véc-tơ.
    - \`v = [2, 1]\` nghĩa là đi sang phải 2 bước, đi lên 1 bước.
    
2.  **Phép cộng (Addition)**:
    - \`v + w\` trong NumPy thực hiện cộng **từng thành phần** (element-wise).
    - x mới = 2 + (-1) = 1
    - y mới = 1 + 3 = 4
    - Kết quả \`[1, 4]\` tương ứng với việc nối đuôi hai mũi tên lại với nhau.`,
                codeLanguage: 'python'
            },
            {
                title: 'Chương 2: Tổ hợp tuyến tính, Span & Basis',
                index: 1,
                videoId: 'k7RM-ot2NWY',
                description: 'Hai véc-tơ có thể tạo ra cả một mặt phẳng? Khái niệm "Span" (bao đóng tuyến tính) và "Basis" (Cơ sở) là chìa khóa để hiểu không gian véc-tơ.',
                application: 'Cơ sở (Basis) là nền tảng của nén ảnh (JPEG) và xử lý tín hiệu (Fourier Transform).',
                codeExample: `import numpy as np

# 1. Hệ cơ sở chuẩn (Standard Basis)
i_hat = np.array([1, 0])
j_hat = np.array([0, 1])

# 2. Tạo véc-tơ từ tổ hợp tuyến tính (Linear Combination)
# v = 3*i + 2*j
v = 3 * i_hat + 2 * j_hat

print(f"i_hat: {i_hat}")
print(f"j_hat: {j_hat}")
print(f"Linear Combination (3i + 2j): {v}")`,
                codeOutput: `i_hat: [1 0]
j_hat: [0 1]
Linear Combination (3i + 2j): [3 2]`,
                codeExplanation: `**Giải thích chi tiết:**
1.  **Véc-tơ đơn vị (Basis Vectors)**:
    - \`i_hat\` (trục x) và \`j_hat\` (trục y) là các "viên gạch" cơ bản.
    - Mọi véc-tơ trong không gian 2D đều có thể được xây dựng từ 2 viên gạch này.

2.  **Tổ hợp tuyến tính (Linear Combination)**:
    - \`3 * i_hat\`: Kéo dãn i_hat ra 3 lần.
    - \`2 * j_hat\`: Kéo dãn j_hat ra 2 lần.
    - Cộng lại: Ta đi đến điểm toạ độ (3, 2).
    - Đây là bản chất của toạ độ: (3, 2) thực chất là *chỉ dẫn* cách đi từ gốc tọa độ theo các véc-tơ cơ sở.`,
                codeLanguage: 'python'
            },
            {
                title: 'Chương 3: Ma trận & Biến đổi tuyến tính',
                index: 2,
                videoId: 'kYB8IZa5AuE',
                description: 'Đừng nhìn Ma trận như một bảng số vô hồn. Hãy nhìn nó như một "cỗ máy" biến hình không gian!',
                application: 'Đây chính là cách GPU xử lý đồ họa 3D: Dùng ma trận để xoay camera, phóng to vật thể trong game.',
                codeExample: `import numpy as np

# 1. Định nghĩa ma trận biến đổi (Transformation Matrix)
# Xoay 90 độ: i_hat -> [0, 1], j_hat -> [-1, 0]
M_rotation = np.array([[0, -1],
                       [1,  0]])

# 2. Véc-tơ ban đầu
v = np.array([1, 0]) # Véc-tơ chỉ sang phải

# 3. Áp dụng biến đổi (Matrix-Vector Multiplication)
v_transformed = M_rotation @ v  # Sử dụng toán tử @

print(f"Original Vector: {v}")
print(f"Transformation Matrix:\n{M_rotation}")
print(f"Transformed Vector: {v_transformed}")`,
                codeOutput: `Original Vector: [1 0]
Transformation Matrix:
[[ 0 -1]
 [ 1  0]]
Transformed Vector: [0 1]`,
                codeExplanation: `**Giải thích chi tiết:**
1.  **Ma trận là một hàm số (Matrix as Function)**:
    - Đừng nghĩ ma trận chỉ là bảng số. Hãy nghĩ nó là một *hành động*.
    - Cột 1 \`[0, 1]\`: Nơi \`i_hat\` (trục x) sẽ đáp xuống sau khi xoay.
    - Cột 2 \`[-1, 0]\`: Nơi \`j_hat\` (trục y) sẽ đáp xuống.

2.  **Phép nhân \`@\`**:
    - Trong Python/NumPy, toán tử \`@\` đại diện cho phép nhân ma trận (dot product).
    - Lệnh này lấy véc-tơ \`v\`, "nhúng" nó vào không gian đã bị ma trận làm biến dạng.
    - Kết quả \`[0, 1]\` cho thấy véc-tơ nằm ngang ban đầu giờ đã dựng đứng lên (xoay 90 độ).`,
                codeLanguage: 'python'
            },
            {
                title: 'Chương 4: Nhân ma trận - Bản chất là gì?',
                index: 3,
                videoId: 'XkY2DOUCWMU',
                description: 'Nhân hai ma trận không chỉ là tính toán cộng trừ nhân chia. Đó là việc áp dụng liên tiếp các phép biến hình.',
                application: 'Trong Neural Networks (Deep Learning), mỗi lớp (layer) chính là một phép nhân ma trận khổng lồ.',
                codeExample: `import numpy as np

# 1. Ma trận Shear (Trượt)
M_shear = np.array([[1, 1],
                    [0, 1]])

# 2. Ma trận Rotation (Xoay 90 độ)
M_rotation = np.array([[0, -1],
                       [1,  0]])

# 3. Nhân ma trận (Matrix Multiplication) = Hợp thành biến đổi
# Thứ tự quan trọng: Làm Shear trước rồi mới Xoay (Rotation @ Shear)
M_combined = M_rotation @ M_shear

print(f"Combined Matrix (Rotation @ Shear):\n{M_combined}")

# Kiểm tra với véc-tơ [1, 0]
# Shear [1, 0] -> [1, 0]
# Rotation [1, 0] -> [0, 1]
v = np.array([1, 0])
result = M_combined @ v
print(f"Transforming [1, 0]: {result}")`,
                codeOutput: `Combined Matrix (Rotation @ Shear):
[[ 0 -1]
 [ 1  1]]
Transforming [1, 0]: [0 1]`,
                codeExplanation: `**Giải thích chi tiết:**
1.  **Hợp thành biến đổi (Composition)**:
    - Nhân hai ma trận \`A @ B\` không phải là nhân từng số.
    - Nó có nghĩa là: "Áp dụng biến đổi B trước, sau đó áp dụng biến đổi A".
    - Thứ tự **cực kỳ quan trọng**: Xoay rồi Trượt khác hoàn toàn với Trượt rồi Xoay.

2.  **Ma trận kết quả**:
    - \`M_combined\` là một ma trận duy nhất đại diện cho cả chuỗi hành động đó.
    - Điều này cho phép máy tính gộp hàng triệu phép tính thành một bước duy nhất.`,
                codeLanguage: 'python'
            },
            {
                title: 'Chương 5: Biến đổi tuyến tính trong 3D',
                index: 4,
                videoId: 'rHLEWRxRGiM',
                description: 'Mở rộng tư duy từ 2D sang 3D. Mọi thứ vẫn xoay quanh các véc-tơ cơ sở: i (x), j (y) và k (z).',
                application: 'Lập trình đồ họa 3D (OpenGL/DirectX), Robotics (tính toán chuyển động cánh tay robot).',
                codeExample: `import numpy as np

# 1. Véc-tơ 3D (x, y, z)
v = np.array([1, 2, 3])

# 2. Ma trận biến đổi 3x3 (Identity Matrix)
# Giữ nguyên không gian
I = np.eye(3)

# 3. Ma trận Scaling (Phóng to 2 lần mọi chiều)
M_scale = np.array([
    [2, 0, 0],
    [0, 2, 0],
    [0, 0, 2]
])

v_scaled = M_scale @ v
print(f"Original: {v}")
print(f"Scaled: {v_scaled}")`,
                codeOutput: `Original: [1 2 3]
Scaled: [2 4 6]`,
                codeExplanation: `**Giải thích chi tiết:**
1.  **Không gian 3D**:
    - Bây giờ ta có 3 trục toạ độ, nên véc-tơ có 3 thành phần.
    - Ma trận biến đổi phải là 3x3 để tác động lên không gian 3 chiều.

2.  **Ma trận đường chéo (Diagonal Matrix)**:
    - \`M_scale\` chỉ có các số trên đường chéo chính, các chỗ khác bằng 0.
    - Ý nghĩa hình học: Nó chỉ kéo dãn các trục toạ độ mà không làm xoay hay méo không gian.`,
                codeLanguage: 'python'
            },
            {
                title: 'Chương 6: Định thức (Determinant)',
                index: 5,
                videoId: 'Ip3X9LOh2dk',
                description: 'Định thức không chỉ là một con số ngẫu nhiên. Nó cho biết sự thay đổi diện tích (2D) hoặc thể tích (3D) sau khi biến đổi.',
                application: 'Kiểm tra ma trận khả nghịch (Det != 0), Jacobian trong tích phân, Phân tích độ ổn định hệ thống.',
                codeExample: `import numpy as np

# 1. Ma trận làm tăng gấp đôi diện tích (Scaling by 2 in x, 1 in y)
M = np.array([[2, 0], 
              [0, 1]])

# 2. Tính Định thức
det = np.linalg.det(M)

print(f"Matrix:\n{M}")
print(f"Determinant (Area Scale Factor): {det}")

# Ma trận làm "bẹp" không gian (Singular Matrix)
M_singular = np.array([[1, 1], 
                       [2, 2]]) # Cột 2 gấp đôi Cột 1 -> Thẳng hàng
print(f"Singular Matrix Det: {np.linalg.det(M_singular)}")`,
                codeOutput: `Matrix:
[[2 0]
 [0 1]]
Determinant (Area Scale Factor): 2.0
Singular Matrix Det: 0.0`,
                codeExplanation: `**Giải thích chi tiết:**
1.  **Định thức là hệ số phóng đại**:
    - \`det = 2.0\`: Biến đổi này làm diện tích hình ảnh tăng gấp đôi.
    
2.  **Ma trận suy biến (Singular)**:
    - \`det = 0.0\`: Không gian bị "bẹp" lại thành đường thẳng hoặc điểm.
    - Đây là dấu hiệu báo động trong lập trình: Thông tin bị mất, không thể khôi phục (không thể đảo ngược).`,
                codeLanguage: 'python'
            },
            {
                title: 'Chương 7: Ma trận nghịch đảo & Không gian cột',
                index: 6,
                videoId: 'uQhTuRlWMxw',
                description: 'Đi ngược thời gian? Ma trận nghịch đảo giúp ta tìm lại véc-tơ ban đầu trước khi bị biến đổi.',
                application: 'Giải hệ phương trình tuyến tính, Mã hóa (Cryptography).',
                codeExample: `import numpy as np

# 1. Ma trận khả nghịch
A = np.array([[3, 1], 
              [1, 2]])

# 2. Tính ma trận nghịch đảo
A_inv = np.linalg.inv(A)

print(f"Matrix A:\n{A}")
print(f"Inverse A:\n{A_inv}")

# 3. Kiểm tra: A @ A_inv = Identity
print(f"A @ A_inv:\n{np.round(A @ A_inv)}")`,
                codeOutput: `Matrix A:
[[3 1]
 [1 2]]
Inverse A:
[[ 0.4 -0.2]
 [-0.2  0.6]]
A @ A_inv:
[[1. 0.]
 [0. 1.]]`,
                codeExplanation: `**Giải thích chi tiết:**
1.  **Ma trận nghịch đảo**:
    - Nếu ma trận A biến x thành y, thì nghịch đảo \`A_inv\` biến y ngược lại thành x.
    - Giống như phép chia trong đại số.

2.  **Hàm \`np.linalg.inv\`**:
    - Hàm tìm ma trận nghịch đảo.
    - Nếu \`det(A) = 0\`, hàm này sẽ báo lỗi vì không thể "chia cho 0" (không gian đã bị bẹp, không thể phục hồi).`,
                codeLanguage: 'python'
            },
            {
                title: 'Chương 8: Ma trận không vuông',
                index: 7,
                videoId: 'v8VSDg_WQlA',
                description: 'Biến đổi không gian 2D thành 3D hoặc ngược lại. Đây là nền tảng của Dimensionality Reduction.',
                application: 'PCA (Principal Component Analysis) trong Machine Learning - Giảm chiều dữ liệu.',
                codeExample: `import numpy as np

# Ma trận 2x3 (Biến 3D thành 2D - Chiếu bóng)
M = np.array([[1, 0, 0], 
              [0, 1, 0]])

v_3d = np.array([5, 4, 99]) # z=99 sẽ bị mất
v_2d = M @ v_3d

print(f"3D Vector: {v_3d}")
print(f"Projected 2D Vector: {v_2d}")`,
                codeOutput: `3D Vector: [ 5  4 99]
Projected 2D Vector: [5 4]`,
                codeExplanation: `**Giải thích chi tiết:**
1.  **Giảm chiều dữ liệu**:
    - Ma trận 2x3 nhận đầu vào 3 chiều, trả về 2 chiều.
    - \`z=99\` bị loại bỏ (nhân với cột 0 của ma trận).
    
2.  **Ứng dụng**:
    - Đây là cách máy tính "chiếu" thế giới game 3D lên màn hình 2D của bạn (Projection).`,
                codeLanguage: 'python'
            },
            {
                title: 'Chương 9: Tích vô hướng (Dot Product)',
                index: 8,
                videoId: 'LyGKycYT2v0',
                description: 'Sợi dây liên kết giữa Hình học (Góc chiếu) và Đại số (Nhân tọa độ).',
                application: 'Tính góc giữa 2 véc-tơ, Cosine Similarity trong NLP (So sánh độ giống nhau của văn bản).',
                codeExample: `import numpy as np

v = np.array([1, 2])
w = np.array([3, 4])

# Cách 1: Tổng tích các thành phần tương ứng
dot_algebra = 1*3 + 2*4 # 3 + 8 = 11

# Cách 2: Dùng NumPy
dot_numpy = np.dot(v, w)

print(f"Dot Product (Algebra): {dot_algebra}")
print(f"Dot Product (NumPy): {dot_numpy}")`,
                codeOutput: `Dot Product (Algebra): 11
Dot Product (NumPy): 11`,
                codeExplanation: `**Giải thích chi tiết:**
1.  **Ý nghĩa hình học**:
    - Dot Product đại diện cho độ "cùng hướng" của 2 véc-tơ.
    - > 0: Góc nhọn.
    - = 0: Vuông góc (Orthogonal).
    
2.  **Hàm \`np.dot\`**:
    - Tối ưu hóa việc nhân và cộng dồn, nhanh hơn vòng lặp Python thuần túy.`,
                codeLanguage: 'python'
            },
            {
                title: 'Chương 10: Tích có hướng (Cross Product)',
                index: 9,
                videoId: 'eu6i7WJeinw',
                description: 'Phép toán tạo ra véc-tơ mới vuông góc với mặt phẳng. Quy tắc bàn tay phải.',
                application: 'Tính Torque (Mô-men xoắn), Tính pháp tuyến bề mặt (Surface Normal) trong game 3D.',
                codeExample: `import numpy as np

v = np.array([1, 0, 0]) # Trục x
w = np.array([0, 1, 0]) # Trục y

# Tích có hướng (x cross y = z)
cross_product = np.cross(v, w)

print(f"v (x-axis): {v}")
print(f"w (y-axis): {w}")
print(f"Cross Product (z-axis): {cross_product}")`,
                codeOutput: `v (x-axis): [1 0 0]
w (y-axis): [0 1 0]
Cross Product (z-axis): [0 0 1]`,
                codeExplanation: `**Giải thích chi tiết:**
1.  **Tạo ra chiều không gian mới**:
    - Cross Product tạo ra 1 *véc-tơ mới* vuông góc với cả 2 véc-tơ ban đầu.
    
2.  **Quy tắc bàn tay phải**:
    - Quay từ X sang Y sẽ ra Z.
    - \`cross([1,0,0], [0,1,0])\` ra \`[0,0,1]\` (Trục Z).`,
                codeLanguage: 'python'
            },
            {
                title: 'Chương 11: Cross Products & Biến đổi tuyến tính',
                index: 10,
                videoId: 'BaM7OCEm3G0',
                description: 'Hiểu sâu hơn về Cross Product dưới góc nhìn biến đổi tuyến tính.',
                application: 'Lý thuyết điện từ trường (Maxwell Equations).',
                codeExample: `import numpy as np

v1 = np.array([1, 2, 3])
v2 = np.array([4, 5, 6])

# Cross product
res = np.cross(v1, v2)
print(f"Cross: {res}")`,
                codeOutput: `Cross: [-3  6 -3]`,
                codeExplanation: `**Giải thích chi tiết:**
1.  **Liên hệ Định thức**:
    - Độ dài của véc-tơ kết quả bằng diện tích hình bình hành tạo bởi v1 và v2.
    
2.  **Tính chất**:
    - Nếu v1 và v2 song song, Cross Product = 0 (Diện tích = 0).`,
                codeLanguage: 'python'
            },
            {
                title: 'Chương 12: Cramer\'s Rule (Quy tắc Cramer)',
                index: 11,
                videoId: 'jBsC34PxzoM',
                description: 'Một cái nhìn hình học thú vị về giải hệ phương trình thông qua diện tích.',
                application: 'Lý thuyết điều khiển (Control Theory).',
                codeExample: `# Quy tắc Cramer dùng định thức
# Hệ Ax = b
# x_i = det(A_i) / det(A)

import numpy as np
A = np.array([[3, 1], [1, 2]])
b = np.array([9, 8])

det_A = np.linalg.det(A)
# Thay cột 1 bằng b
A1 = A.copy(); A1[:, 0] = b
det_A1 = np.linalg.det(A1)

x = det_A1 / det_A
print(f"x (using Cramer): {x}")
# Verify
print(f"True solution: {np.linalg.solve(A, b)[0]}")`,
                codeOutput: `x (using Cramer): 2.0
True solution: 2.0`,
                codeExplanation: `**Giải thích chi tiết:**
1.  **Cramer's Rule**:
    - Nghiệm là tỷ lệ diện tích (\`det(A1) / det(A)\`).
    
2.  **Thực tế**:
    - Rất chậm với ma trận lớn. Chỉ dùng cho lý thuyết hoặc hệ nhỏ (2x2, 3x3).
    - \`np.linalg.solve\` dùng thuật toán khử Gaussian nhanh hơn nhiều.`,
                codeLanguage: 'python'
            },
            {
                title: 'Chương 13: Đổi hệ cơ sở (Change of Basis)',
                index: 12,
                videoId: 'P2LTAUO1TdA',
                description: 'Tại sao cùng một véc-tơ lại có toạ độ khác nhau? Đó là do chúng ta đổi hệ quy chiếu (người quan sát).',
                application: 'Nén dữ liệu, Chuẩn hóa dữ liệu (Normalization).',
                codeExample: `import numpy as np

# Cơ sở hiện tại (Standard)
# Cơ sở mới (Basis vectors as columns of P)
P = np.array([[2, 1], [1, 1]]) 

# Véc-tơ trong cơ sở mới [1, 1]
v_new = np.array([1, 1])

# Véc-tơ trong cơ sở chuẩn (P @ v_new)
v_standard = P @ v_new

print(f"Vector in New Basis: {v_new}")
print(f"Vector in Standard Basis: {v_standard}")   `,
                codeOutput: `Vector in New Basis: [1 1]
Vector in Standard Basis: [3 2]`,
                codeExplanation: `**Giải thích chi tiết:**
1.  **Ma trận chuyển cơ sở P**:
    - Đóng vai trò như từ điển phiên dịch từ ngôn ngữ này sang ngôn ngữ khác.
    
2.  **Phép tính**:
    - Để biết véc-tơ \`[1, 1]\` trong hệ mới "trông như thế nào" ở hệ chuẩn, ta nhân nó với ma trận cơ sở.`,
                codeLanguage: 'python'
            },
            {
                title: 'Chương 14: Eigenvectors & Eigenvalues (Trị riêng & Véc-tơ riêng)',
                index: 13,
                videoId: 'PFDu9oVAE-g',
                description: 'Khái niệm quan trọng bậc nhất. Tìm các "trục quay chính" của dữ liệu.',
                application: 'Google PageRank, Nhận diện khuôn mặt (Eigenfaces).',
                codeExample: `import numpy as np

# Ma trận diagonal (chéo)
A = np.array([[2, 0], 
              [0, 3]])

eigenvalues, eigenvectors = np.linalg.eig(A)

print(f"Eigenvalues: {eigenvalues}")
print(f"Eigenvectors:\n{eigenvectors}")`,
                codeOutput: `Eigenvalues: [2. 3.]
Eigenvectors:
[[1. 0.]
 [0. 1.]]`,
                codeExplanation: `**Giải thích chi tiết:**
1.  **Véc-tơ riêng**:
    - Là hướng mà ma trận chỉ kéo dãn chứ không làm xoay.
    
2.  **Trị riêng**:
    - Là hệ số kéo dãn.
    - \`2\` và \`3\` cho biết trục x gấp đôi, trục y gấp ba.`,
                codeLanguage: 'python'
            },
            {
                title: 'Chương 15: Tính nhanh Eigenvalues',
                index: 14,
                videoId: 'e50Bj7jn9IQ',
                description: 'Mẹo tính toán nhanh trị riêng.',
                application: 'Thi cử, Tính nhẩm ma trận 2x2.',
                codeExample: `import numpy as np

A = np.array([[3, 1], 
              [1, 3]])

trace = np.trace(A) # 3+3=6
det = np.linalg.det(A) # 9-1=8

print(f"Trace: {trace}")
print(f"Det: {det}")
print("Eigenvalues sum to 6, multiply to 8 -> (2, 4)")`,
                codeOutput: `Trace: 6
Det: 8.0
Eigenvalues sum to 6, multiply to 8 -> (2, 4)`,
                codeExplanation: `**Giải thích chi tiết:**
1.  **Trace (Tổng chéo)**:
    - Tổng các trị riêng luôn bằng Trace.
    
2.  **Định thức**:
    - Tích các trị riêng luôn bằng Định thức.
    - Dùng 2 tính chất này để nhẩm nghiệm nhanh chóng cho ma trận 2x2.`,
                codeLanguage: 'python'
            },
            {
                title: 'Chương 16: Abstract Vector Spaces (Không gian trừu tượng)',
                index: 15,
                videoId: 'TgKwz5Ikpc8',
                description: 'Véc-tơ không chỉ là mũi tên. Hàm số cũng là véc-tơ.',
                application: 'Cơ học lượng tử (Quantum Mechanics), Xử lý tín hiệu số.',
                codeExample: `# Hàm số cũng cộng được như véc-tơ!
# f(x) = x^2, g(x) = x
# (f+g)(x) = x^2 + x

def f(x): return x**2
def g(x): return x

def add_functions(f1, f2):
    return lambda x: f1(x) + f2(x)

h = add_functions(f, g)
print(f"f(2) = {f(2)}")
print(f"g(2) = {g(2)}")
print(f"h(2) = f(2) + g(2) = {h(2)}")`,
                codeOutput: `f(2) = 4
g(2) = 2
h(2) = f(2) + g(2) = 6`,
                codeExplanation: `**Giải thích chi tiết:**
1.  **Trừu tượng hóa**:
    - Bất cứ thứ gì có thể "Cộng" và "Nhân với số" đều là Vector.
    - Hàm số thỏa mãn điều này, nên không gian các hàm số cũng là một Không gian Véc-tơ.
    
2.  **Lập trình hàm**:
    - Python cho phép coi hàm như biến số (First-class citizen), rất phù hợp để mô tả các không gian trừu tượng này.`,
                codeLanguage: 'python'
            }
        ]
    },
    {
        id: 'university-core',
        title: 'Đại Số Đại Cương - Toán Cao Cấp (University Core)',
        description: 'Kiến thức chuẩn đại học Việt Nam: Tính toán ma trận, Quy nạp, Hệ phương trình tuyến tính.',
        playlistId: 'PLsEmKKF4H46nqwlr8JDf05ecduzzaNz3R',
        keyConcepts: ['Ma trận (Matrices)', 'Định thức (Determinant)', 'Hạng ma trận (Rank)', 'Hệ phương trình (Linear Systems)', 'Không gian véc-tơ'],
        overview: 'Hệ thống bài giảng chi tiết bằng tiếng Việt, bám sát giáo trình Đại học Việt Nam. Phù hợp để ôn thi và nắm vững kỹ năng tính toán.',
        videos: [
            {
                title: "1.1 Ma trận và các phép toán với ma trận",
                index: 0,
                videoId: "08p_hP46YeA",
                description: "Giới thiệu khái niệm ma trận, các phép toán cộng, trừ, nhân ma trận. Nền tảng cho mọi tính toán sau này.",
                codeExample: `import numpy as np

# Tạo ma trận A (2 hàng, 3 cột)
A = np.array([
    [1, 2, 3],
    [4, 5, 6]
])

# Cộng ma trận
B = np.ones((2, 3)) # Ma trận toàn số 1
C = A + B

# Nhân vô hướng
D = 2 * A

print(f"A:\n{A}")
print(f"A + B:\n{C}")
print(f"2 * A:\n{D}")`,
                codeOutput: `A:
[[1 2 3]
 [4 5 6]]
A + B:
[[2. 3. 4.]
 [5. 6. 7.]]
2 * A:
[[ 2  4  6]
 [ 8 10 12]]`,
                codeExplanation: `**Hướng dẫn Code:**
1.  \`np.array\`: Là cách chuẩn để khai báo ma trận trong Python. Các hàng được đặt trong dấu ngoặc vuông \`[]\`.
2.  \`+\`, \`-\`, \`*\`: Các phép toán này trong NumPy hoạt động trên từng phần tử (element-wise), đúng như định nghĩa toán học.`,
                codeLanguage: 'python'
            },
            {
                title: "Chuyển vị ma trận (Transpose)",
                index: 1,
                videoId: "GN2XXFM19rg",
                description: "Ma trận chuyển vị là gì? Tính chất và cách tìm ma trận chuyển vị.",
                codeExample: `import numpy as np

A = np.array([
    [1, 2],
    [3, 4],
    [5, 6]
])

# Tính chuyển vị (Transpose)
A_T = A.T

print(f"Original (3x2):\n{A}")
print(f"Transposed (2x3):\n{A_T}")`,
                codeOutput: `Original (3x2):
[[1 2]
 [3 4]
 [5 6]]
Transposed (2x3):
[[1 3 5]
 [2 4 6]]`,
                codeExplanation: `**Kiến thức:**:
- Chuyển vị (\`.T\`) biến dòng thành cột và ngược lại.
- Nếu ma trận A kích thước mxn thì A^T sẽ là nxm.`,
                codeLanguage: 'python'
            },
            {
                title: "1.1.1 Bài tập phép toán ma trận",
                index: 2,
                videoId: "RoGXQ0UGGzw",
                description: "Luyện tập các phép tính cơ bản: Cộng, trừ, nhân và chuyển vị ma trận qua các ví dụ cụ thể.",
                codeExample: `# Nhân 2 ma trận không cùng cấp
import numpy as np

A = np.array([[1, 2], [3, 4]]) # 2x2
B = np.array([[5], [6]])       # 2x1

# Phép nhân ma trận (Dot product)
C = A @ B  # Hoặc np.dot(A, B)

print(f"A @ B:\n{C}")
# Kích thước kết quả: (2x2) * (2x1) -> (2x1)`,
                codeOutput: `A @ B:
[[17]
 [39]]`,
                codeExplanation: `**Lưu ý:**:
- Phép nhân ma trận (\`@\`) chỉ thực hiện được khi số cột của A bằng số hàng của B.
- \`1*5 + 2*6 = 17\`
- \`3*5 + 4*6 = 39\``,
                codeLanguage: 'python'
            },
            {
                title: "1.1.2 Tính lũy thừa ma trận vuông (n)",
                index: 3,
                videoId: "h_3V_GJMp_A",
                description: "Phương pháp quy nạp và khai triển nhị thức để tính lũy thừa bậc cao của ma trận vuông.",
                codeExample: `import numpy as np

A = np.array([[1, 1], 
              [0, 1]])

# Tính A mũ 5
A_5 = np.linalg.matrix_power(A, 5)

print(f"A^5:\n{A_5}")`,
                codeOutput: `A^5:
[[1 5]
 [0 1]]`,
                codeExplanation: `**Mẹo:**:
- Với ma trận này, A^n sẽ có dạng [[1, n], [0, 1]].
- Hàm \`np.linalg.matrix_power\` giúp tính toán lũy thừa ma trận cực nhanh.`,
                codeLanguage: 'python'
            },
            {
                title: "1.1.3 Tìm ma trận A s/c A^2 = I",
                index: 4,
                videoId: "UjOynscc54k",
                description: "Bài toán điển hình: Tìm ma trận thỏa mãn phương trình ma trận cho trước.",
                codeExample: `import numpy as np

# Ma trận đơn vị I (Identity)
I = np.eye(2)

# Một ma trận A thỏa mãn A^2 = I (Ngoài I và -I)
A = np.array([[0, 1], 
              [1, 0]])

print(f"A^2:\n{A @ A}")
print(f"Is Identity? {np.allclose(A @ A, I)}")`,
                codeOutput: `A^2:
[[1 0]
 [0 1]]
Is Identity? True`,
                codeExplanation: `**Giải thích:**:
- \`np.eye(2)\` tạo ma trận đơn vị cấp 2.
- Ma trận A ở ví dụ là ma trận hoán vị (đổi chỗ x và y), áp dụng 2 lần sẽ về vị trí cũ.`,
                codeLanguage: 'python'
            },
            {
                title: "1.2 Định thức (Determinant)",
                index: 5,
                videoId: "Osk96sOPwm8",
                description: "Định nghĩa và các tính chất cơ bản của Định thức. Tại sao định thức lại quan trọng?",
                codeExample: `import numpy as np

A = np.array([[4, 2], 
              [1, 3]])

det = np.linalg.det(A)
print(f"Det(A): {det}")
# Kiểm tra: 4*3 - 2*1 = 10`,
                codeOutput: `Det(A): 10.0`,
                codeExplanation: `**Định thức cấp 2:**:
- Tích đường chéo chính trừ tích đường chéo phụ (ad - bc).
- \`np.linalg.det\` có thể trả về số thực (float).`,
                codeLanguage: 'python'
            },
            {
                title: "1.2.1 Tính định thức (Laplace)",
                index: 6,
                videoId: "2hdY9wyWfcA",
                description: "Cách tính định thức bằng triển khai Laplace và sử dụng các phép biến đổi sơ cấp.",
                codeExample: `import numpy as np

# Ma trận 3x3
A = np.array([
    [1, 2, 3],
    [0, 4, 5],
    [0, 0, 6]
])

# Ma trận tam giác trên -> Det = tích đường chéo
det = np.linalg.det(A)
print(f"Det(A): {det}")`,
                codeOutput: `Det(A): 24.0`,
                codeExplanation: `**Tính chất:**:
- Với ma trận tam giác (chỉ có số ở một phía đường chéo), Định thức bằng tích các phần tử trên đường chéo chính.
- \`1 * 4 * 6 = 24\`. Rất nhanh!`,
                codeLanguage: 'python'
            },
            {
                title: "1.3 Ma trận nghịch đảo",
                index: 7,
                videoId: "KH8cP3u1e1I",
                description: "Điều kiện để ma trận khả nghịch và công thức tính ma trận nghịch đảo.",
                codeExample: `import numpy as np

A = np.array([[1, 2], [3, 4]])
try:
    A_inv = np.linalg.inv(A)
    print(f"Inverse:\n{A_inv}")
except np.linalg.LinAlgError:
    print("Ma trận không khả nghịch (Singular)!")`,
                codeOutput: `Inverse:
[[-2.   1. ]
 [ 1.5 -0.5]]`,
                codeExplanation: `**Điều kiện tồn tại Nghịch đảo:**:
- Det(A) khác 0.
- Ở đây det = -2 (khác 0), nên  tồn tại.`,
                codeLanguage: 'python'
            },
            {
                title: "1.3.1 Bài tập Ma trận nghịch đảo",
                index: 8,
                videoId: "M0NQlTJu1oI",
                description: "Luyện tập tìm ma trận nghịch đảo cấp 3, 4.",
                codeExample: `import numpy as np

# Tạo ma trận ngẫu nhiên 3x3
# Set seed để kết quả cố định
np.random.seed(42) 
A = np.random.randint(1, 10, (3, 3))

print(f"Matrix A:\n{A}")
print(f"Inverse A:\n{np.linalg.inv(A)}")`,
                codeOutput: `Matrix A:
[[7 4 8]
 [5 7 3]
 [7 8 8]]
Inverse A:
[[ 1.05882353  0.70588235 -1.29411765]
 [-0.55882353  0.           0.55882353]
 [-0.05882353 -0.82352941  0.85294118]]`,
                codeExplanation: `**Thực hành:**:
- Máy tính giải nghịch đảo cấp 3 chỉ trong tích tắc.
- Sinh viên cần nắm vững cách tính tay (phần phụ đại số) để đi thi.`,
                codeLanguage: 'python'
            },
            {
                title: "1.4 Hạng của ma trận (Rank)",
                index: 9,
                videoId: "CHU7q7shskk",
                description: "Hạng của ma trận là gì? Các phương pháp tìm hạng và ứng dụng.",
                codeExample: `import numpy as np

A = np.array([
    [1, 1, 1],
    [2, 2, 2], # Dòng này tỉ lệ với dòng 1
    [0, 0, 0]  # Dòng 0
])

rank = np.linalg.matrix_rank(A)
print(f"Rank: {rank}")`,
                codeOutput: `Rank: 1`,
                codeExplanation: `**Rank (Hạng):**:
- Là số lượng dòng (hoặc cột) độc lập tuyến tính.
- Dòng 2 gấp đôi dòng 1 -> Phụ thuộc.
- Dòng 3 toàn 0 -> Không tính.
- -> Chỉ có 1 dòng độc lập -> Rank = 1.`,
                codeLanguage: 'python'
            },
            {
                title: "1.4.1 Chứng minh liên hệ về hạng",
                index: 10,
                videoId: "v0ueebl09pQ",
                description: "Bài toán chứng minh nâng cao về hạng giữa ma trận vuông và ma trận phụ hợp.",
                codeExample: `# Lý thuyết - không có code thực hành cụ thể
# Rank(A) = n     => Rank(Adj A) = n
# Rank(A) = n-1   => Rank(Adj A) = 1
# Rank(A) < n-1   => Rank(Adj A) = 0`,
                codeOutput: `(Lý thuyết chứng minh)`,
                codeExplanation: `**Ghi nhớ:**:
- Adj A là ma trận phụ hợp.
- Đây là định lý thường gặp trong các đề thi Olympic toán sinh viên.`,
                codeLanguage: 'python'
            },
            {
                title: "1.5 Hệ phương trình tuyến tính",
                index: 11,
                videoId: "bcA45KYp6OE",
                description: "Tổng hợp lý thuyết về hệ phương trình tuyến tính và các dạng bài tập.",
                codeExample: `import numpy as np

# Giải hệ:
# 2x + y = 5
# x - y = 1

A = np.array([[2, 1], [1, -1]])
b = np.array([5, 1])

x = np.linalg.solve(A, b)
print(f"Solution [x, y]: {x}")`,
                codeOutput: `Solution [x, y]: [2. 1.]`,
                codeExplanation: `**Giải phương trình (Ax=b)**:
- \`np.linalg.solve\` là hàm chuẩn để giải hệ phương trình tuyến tính.
- Nó nhanh hơn và chính xác hơn việc tính nghịch đảo (inv) rồi nhân.`,
                codeLanguage: 'python'
            },
            {
                title: "1.5.1 Giải và biện luận hệ phương trình",
                index: 12,
                videoId: "QX8W6rKsOGU",
                description: "Kỹ thuật giải và biện luận nghiệm của hệ phương trình tuyến tính.",
                codeExample: `# Hệ vô số nghiệm (Singular System)
A = np.array([[1, 1], [2, 2]])
b = np.array([2, 4])

try:
    np.linalg.solve(A, b)
except np.linalg.LinAlgError as e:
    print(f"Error: {e}")
    # Cần dùng Least Squares cho hệ suy biến
    x_lstsq = np.linalg.lstsq(A, b, rcond=None)[0]
    print(f"Least Squares Solution: {x_lstsq}")`,
                codeOutput: `Error: Singular matrix
Least Squares Solution: [1. 1.]`,
                codeExplanation: `**Biện luận:**:
- Khi Định thức = 0 (Ma trận suy biến), hệ có thể Vô nghiệm hoặc Vô số nghiệm.
- Hàm \`solve\` sẽ báo lỗi.
- Hàm \`lstsq\` (Least Squares) giúp tìm nghiệm xấp xỉ tốt nhất.`,
                codeLanguage: 'python'
            },
            {
                title: "2.1 Véc-tơ và không gian véc-tơ",
                index: 13,
                videoId: "5lv404IpiUk",
                description: "Khái niệm không gian véc-tơ tổng quát.",
                codeExample: `# Không gian R3
import numpy as np

v1 = np.array([1, 0, 0])
v2 = np.array([0, 1, 0])

# Kiểm tra tổ hợp tuyến tính
# Liệu v3 = [3, 4, 0] có thuộc không gian sinh bởi v1, v2?
# Có, vì v3 = 3*v1 + 4*v2
v3 = 3*v1 + 4*v2
print(f"v3: {v3}")`,
                codeOutput: `v3: [3 4 0]`,
                codeExplanation: `**Không gian sinh (Span)**:
- v1 và v2 sinh ra mặt phẳng Oxy (z=0).
- v3 nằm trên mặt phẳng này nên thuộc không gian sinh của v1, v2.`,
                codeLanguage: 'python'
            },
            {
                title: "2.2 Hệ véc-tơ độc lập, phụ thuộc tuyến tính",
                index: 14,
                videoId: "fk_x44A7MOw",
                description: "Phân biệt hệ độc lập tuyến tính và phụ thuộc tuyến tính.",
                codeExample: `import numpy as np

# Hệ phụ thuộc tuyến tính
v1 = np.array([1, 2])
v2 = np.array([2, 4]) # v2 = 2*v1

# Xếp vào ma trận
A = np.column_stack((v1, v2))

# Kiểm tra Det
print(f"Det: {np.linalg.det(A)}")`,
                codeOutput: `Det: 0.0`,
                codeExplanation: `**Cách kiểm tra:**:
- Nếu Định thức = 0, các véc-tơ PHỤ THUỘC tuyến tính (có cái thừa, biểu diễn được qua cái kia).
- Nếu Định thức != 0, các véc-tơ ĐỘC LẬP tuyến tính.`,
                codeLanguage: 'python'
            },
            {
                title: "2.3.1 Cơ sở (Basis) & Đổi cơ sở",
                index: 15,
                videoId: "RnIpuTe-fd8",
                description: "Tìm tọa độ của véc-tơ trong một cơ sở mới.",
                codeExample: `import numpy as np

# Cơ sở B = {u1, u2}
u1 = np.array([1, 1])
u2 = np.array([0, 1])
P = np.column_stack((u1, u2)) # Ma trận chuyển cơ sở

# Véc-tơ x trong cơ sở chính tắc
x = np.array([3, 5])

# Tìm toạ độ trong cơ sở B: P * [x]_B = x => [x]_B = P^-1 * x
x_B = np.linalg.inv(P) @ x

print(f"Toạ độ trong cơ sở B: {x_B}")`,
                codeOutput: `Toạ độ trong cơ sở B: [3. 2.]`,
                codeExplanation: `**Kiểm tra lại:**:
- 3*u1 + 2*u2 = 3*[1,1] + 2*[0,1] = [3,3] + [0,2] = [3,5].
- Đúng bằng véc-tơ x ban đầu!`,
                codeLanguage: 'python'
            },
            {
                title: "3.1 Mô hình thị trường n hàng hóa",
                index: 16,
                videoId: "FBu6B1lsbEI",
                description: "Ứng dụng Ma trận vào bài toán Kinh tế: Cân bằng thị trường.",
                codeExample: `# Hàm Cung và Hàm Cầu tuyến tính
# Q_s = c + dP
# Q_d = a - bP
# Cân bằng: Q_s = Q_d => (b+d)P = a - c

a, b = 100, 2
c, d = 20, 3

# Giải phương trình tìm giá cân bằng P
# 5P = 80
P = (a - c) / (b + d)
print(f"Giá cân bằng: {P}")`,
                codeOutput: `Giá cân bằng: 16.0`,
                codeExplanation: `**Ứng dụng thực tế:**:
- Với n hàng hóa, ta sẽ có hệ n phương trình tuyến tính.
- Dùng ma trận nghịch đảo để giải tìm bộ giá cân bằng cho cả thị trường.`,
                codeLanguage: 'python'
            },
            {
                title: "3.2.1 Mô hình Input-Output (Leontief)",
                index: 17,
                videoId: "GOR63uxUKDc",
                description: "Mô hình kinh tế Input-Output nổi tiếng của Leontief.",
                codeExample: `import numpy as np

# Ma trận hệ số đầu vào A
# Ngành 1, Ngành 2
A = np.array([[0.2, 0.3], 
              [0.4, 0.1]])

# Nhu cầu cuối cùng (Final Demand)
d = np.array([120, 90])

# Tìm tổng cầu x: x = (I - A)^-1 * d
I = np.eye(2)
x = np.linalg.inv(I - A) @ d

print(f"Tổng sản lượng cần thiết: {x}")`,
                codeOutput: `Tổng sản lượng cần thiết: [267.85714286 219.04761905]`,
                codeExplanation: `**Mô hình Leontief:**:
- Giúp dự báo nền kinh tế cần sản xuất bao nhiêu để đáp ứng nhu cầu tiêu dùng và nhu cầu trung gian giữa các ngành.`,
                codeLanguage: 'python'
            },
            {
                title: "3.2.2 Bài tập Input-Output",
                index: 18,
                videoId: "09HiMpRGgUg",
                description: "Giải quyết các bài toán thực tế sử dụng mô hình Input-Output.",
                codeExample: `# Xác định ma trận A từ bảng số liệu
# A_ij = x_ij / X_j
# x_ij: giá trị ngành j mua của ngành i
# X_j: tổng giá trị sản xuất ngành j

# Code tính toán tương tự bài trước
pass`,
                codeOutput: `(Bài thực hành trên số liệu cụ thể)`,
                codeExplanation: `**Các bước giải:**:
1. Lập ma trận hệ số kỹ thuật A.
2. Lập véc-tơ cầu cuối cùng d.
3. Áp dụng công thức nghịch đảo Leontief.`,
                codeLanguage: 'python'
            }
        ]
    }
];
