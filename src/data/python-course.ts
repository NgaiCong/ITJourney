export interface Chapter {
    id: string;
    time: string;
    seconds: number;
    title: string;
    description: string;
    mainContent: string;
    code?: string;
    keyPoints?: string[];
}

const timeToSeconds = (time: string): number => {
    const parts = time.split(':').map(Number);
    if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
    if (parts.length === 2) return parts[0] * 60 + parts[1];
    return 0;
};

export const pythonCourseData: Chapter[] = [
    {
        id: 'intro',
        time: '00:00:00',
        title: 'Giới thiệu về Python',
        description: 'Tổng quan về ngôn ngữ lập trình Python và lý do nên học nó.',
        mainContent: 'Python là ngôn ngữ lập trình bậc cao, đa năng, dễ đọc và dễ học. Nó được sử dụng rộng rãi trong Web Development, Data Science, AI, và Automation.',
        keyPoints: ['Ngôn ngữ thông dịch (Interpreted)', 'Cú pháp rõ ràng, giống tiếng Anh', 'Cộng đồng lớn và thư viện phong phú'],
        seconds: timeToSeconds('00:00:00')
    },
    {
        id: 'install',
        time: '00:01:43',
        title: 'Cài đặt Python và PyCharm',
        description: 'Hướng dẫn cài đặt môi trường phát triển (IDE).',
        mainContent: 'Để lập trình Python, bạn cần cài đặt Python interpreter từ python.org và một IDE mạnh mẽ như PyCharm hoặc VS Code.',
        keyPoints: ['Download Python version mới nhất', 'Cài đặt PyCharm Community (Free)', 'Thiết lập biến môi trường (Path)'],
        seconds: timeToSeconds('00:01:43')
    },
    {
        id: 'hello-world',
        time: '00:04:04',
        title: 'Viết chương trình Python đầu tiên',
        description: 'Chương trình Hello World kinh điển.',
        mainContent: 'Trong Python, chúng ta sử dụng hàm `print()` để xuất dữ liệu ra màn hình. Đây là lệnh cơ bản nhất.',
        code: `print("Hello World")
print("Tôi đang học Python")`,
        seconds: timeToSeconds('00:04:04')
    },
    {
        id: 'variables',
        time: '00:06:59',
        title: 'Biến và Kiểu dữ liệu',
        description: 'Cách lưu trữ và quản lý dữ liệu.',
        mainContent: 'Biến (Variable) giống như một cái hộp chứa giá trị. Python tự động nhận diện kiểu dữ liệu (Dynamic Typing).',
        code: `character_name = "John"
character_age = 35
print("Tên tôi là " + character_name)
print("Tôi", character_age, "tuổi")`,
        keyPoints: ['String (Chuỗi): "Text"', 'Integer (Số nguyên): 10', 'Float (Số thực): 3.14', 'Boolean: True/False'],
        seconds: timeToSeconds('00:06:59')
    },
    {
        id: 'strings',
        time: '00:15:10',
        title: 'Thao tác với string',
        description: 'Xử lý chuỗi ký tự nâng cao.',
        mainContent: 'String trong Python là một chuỗi các ký tự. Bạn có thể nối chuỗi, chuyển đổi chữ hoa/thường, hoặc lấy độ dài.',
        code: `phrase = "Học Viện Giraffe"
print(phrase.lower()) # Chữ thường
print(phrase.upper()) # Chữ hoa
print(len(phrase))    # Độ dài
print(phrase[0])      # Lấy ký tự đầu tiên`,
        seconds: timeToSeconds('00:15:10')
    },
    {
        id: 'numbers',
        time: '00:23:38',
        title: 'Dữ liệu dạng số và hàm toán học',
        description: 'Làm việc với số học trong Python.',
        mainContent: 'Python hỗ trợ các phép toán cộng, trừ, nhân, chia, chia lấy dư... và các hàm toán học nâng cao qua thư viện math.',
        code: `from math import *
print(2 * 3)       # 6
print(10 % 3)      # 1 (Chia lấy dư)
print(abs(-5))     # 5 (Giá trị tuyệt đối)
print(pow(3, 2))   # 9 (Lũy thừa)
print(sqrt(36))    # 6 (Căn bậc 2)`,
        seconds: timeToSeconds('00:23:38')
    },
    {
        id: 'input',
        time: '00:32:08',
        title: 'Nhận dữ liệu người dùng',
        description: 'Tương tác với người dùng qua input().',
        mainContent: 'Hàm `input()` cho phép chương trình dừng lại và chờ người dùng nhập liệu từ bàn phím. Kết quả trả về luôn là string.',
        code: `name = input("Nhập tên của bạn: ")
age = input("Nhập tuổi: ")
print("Xin chào " + name + ", bạn " + age + " tuổi!")`,
        seconds: timeToSeconds('00:32:08')
    },
    {
        id: 'calculator-basic',
        time: '00:36:07',
        title: 'Build ứng dụng máy tính cơ bản',
        description: 'Dự án thực hành đầu tiên.',
        mainContent: 'Kết hợp input() và chuyển đổi kiểu dữ liệu (ép kiểu) để thực hiện phép cộng 2 số.',
        code: `num1 = input("Nhập số thứ nhất: ")
num2 = input("Nhập số thứ hai: ")
result = float(num1) + float(num2)
print(result)`,
        keyPoints: ['input() trả về string', 'Dùng int() hoặc float() để ép kiểu sang số'],
        seconds: timeToSeconds('00:36:07')
    },
    {
        id: 'string-format',
        time: '00:40:04',
        title: 'Nối chuỗi với hàm format()',
        description: 'Cách chuyên nghiệp để chèn biến vào chuỗi.',
        mainContent: 'Thay vì dùng dấu +, f-string (Python 3.6+) hoặc .format() giúp code gọn gàng và dễ đọc hơn.',
        code: `name = "Alice"
age = 25
# Cách cũ
print("Tên: " + name + ", Tuổi: " + str(age))

# F-String (Khuyên dùng)
print(f"Tên: {name}, Tuổi: {age}")`,
        seconds: timeToSeconds('00:40:04')
    },
    {
        id: 'lists',
        time: '00:45:11',
        title: 'Dữ liệu dạng danh sách (List)',
        description: 'Cấu trúc dữ liệu quan trọng nhất.',
        mainContent: 'List cho phép lưu trữ nhiều giá trị trong một biến duy nhất. Các phần tử có thể khác kiểu dữ liệu.',
        code: `friends = ["Kevin", "Karen", "Jim", "Oscar"]
print(friends[0])   # Kevin
print(friends[-1])  # Oscar (Phần tử cuối)
print(friends[1:3]) # ["Karen", "Jim"]`,
        seconds: timeToSeconds('00:45:11')
    },
    {
        id: 'list-functions',
        time: '00:51:56',
        title: 'Các hàm thao tác với List',
        description: 'Thêm, sửa, xóa phần tử trong List.',
        mainContent: 'Python cung cấp nhiều method tiện lợi để thao tác với List.',
        code: `lucky_numbers = [4, 8, 15, 16, 23, 42]
friends = ["Kevin", "Karen", "Jim"]

friends.extend(lucky_numbers)  # Nối list
friends.append("Creed")        # Thêm vào cuối
friends.insert(1, "Kelly")     # Chèn vào vị trí index 1
friends.remove("Jim")          # Xóa phần tử
friends.pop()                  # Xóa phần tử cuối
print(friends.index("Kevin"))  # Tìm vị trí`,
        seconds: timeToSeconds('00:51:56')
    },
    {
        id: 'tuples',
        time: '01:00:32',
        title: 'Tuples',
        description: 'Danh sách bất biến (Immutable).',
        mainContent: 'Tuple giống List nhưng không thể thay đổi giá trị sau khi tạo. Dùng cho dữ liệu cố định (ví dụ tọa độ).',
        code: `coordinates = (4, 5)
# coordinates[0] = 10 -> Lỗi! Không thể sửa
print(coordinates[0])`,
        keyPoints: ['Dùng ngoặc tròn ()', 'Immutable (Bất biến)', 'Nhanh hơn List'],
        seconds: timeToSeconds('01:00:32')
    },
    {
        id: 'functions',
        time: '01:05:20',
        title: 'Hàm (Functions)',
        description: 'Tổ chức code thành các khối tái sử dụng.',
        mainContent: 'Hàm giúp chia nhỏ chương trình thành các tác vụ cụ thể. Dùng từ khóa `def`.',
        code: `def say_hi(name, age):
    print(f"Xin chào {name}, bạn {age} tuổi")

say_hi("Mike", 35)
say_hi("Steve", 70)`,
        seconds: timeToSeconds('01:05:20')
    },
    {
        id: 'return',
        time: '01:14:06',
        title: 'Lệnh return trong hàm',
        description: 'Trả về giá trị từ hàm.',
        mainContent: 'Hàm có thể trả về dữ liệu để sử dụng tiếp. Code sau lệnh return sẽ không được thực thi.',
        code: `def cube(num):
    return num * num * num

result = cube(4)
print(result) # 64`,
        seconds: timeToSeconds('01:14:06')
    },
    {
        id: 'if-statements',
        time: '01:18:39',
        title: 'Lệnh if, elif và else',
        description: 'Câu lệnh điều kiện.',
        mainContent: 'Điều khiển luồng chương trình dựa trên điều kiện logic.',
        code: `is_male = True
is_tall = False

if is_male and is_tall:
    print("Bạn là nam cao")
elif is_male and not is_tall:
    print("Bạn là nam thấp")
else:
    print("Bạn không phải nam")`,
        seconds: timeToSeconds('01:18:39')
    },
    {
        id: 'logic-operators',
        time: '01:23:18',
        title: 'So sánh và Toán tử logic',
        description: 'So sánh giá trị.',
        mainContent: 'Tạo các hàm so sánh phức tạp hơn.',
        code: `def max_num(num1, num2, num3):
    if num1 >= num2 and num1 >= num3:
        return num1
    elif num2 >= num1 and num2 >= num3:
        return num2
    else:
        return num3

print(max_num(3, 40, 5))`,
        seconds: timeToSeconds('01:23:18')
    },
    {
        id: 'calculator-v2',
        time: '01:28:59',
        title: 'Cải tiến ứng dụng máy tính',
        description: 'Máy tính đầy đủ chức năng.',
        mainContent: 'Kết hợp if/else để xử lý phép tính +, -, *, /.',
        code: `num1 = float(input("Số thứ nhất: "))
op = input("Phép toán (+ - * /): ")
num2 = float(input("Số thứ hai: "))

if op == "+":
    print(num1 + num2)
elif op == "-":
    print(num1 - num2)
elif op == "/":
    print(num1 / num2)
elif op == "*":
    print(num1 * num2)
else:
    print("Phép toán không hợp lệ")`,
        seconds: timeToSeconds('01:28:59')
    },
    {
        id: 'dictionaries',
        time: '01:32:52',
        title: 'Dictionary (Từ điển)',
        description: 'Lưu trữ Key-Value pairs.',
        mainContent: 'Dictionary cho phép lưu dữ liệu theo cặp khóa-giá trị, giống JSON hay Map.',
        code: `monthConversions = {
    "Jan": "January",
    "Feb": "February",
    "Mar": "March",
}
print(monthConversions["Jan"])
print(monthConversions.get("Dec", "Not Found"))`,
        seconds: timeToSeconds('01:32:52')
    },
    {
        id: 'while-loop',
        time: '01:37:44',
        title: 'Vòng lặp While',
        description: 'Lặp theo điều kiện.',
        mainContent: 'Thực thi khối code lặp đi lặp lại miễn là điều kiện còn đúng.',
        code: `i = 1
while i <= 10:
    print(i)
    i += 1
print("Done loop")`,
        seconds: timeToSeconds('01:37:44')
    },
    {
        id: 'guessing-game',
        time: '01:43:49',
        title: 'Trò chơi đoán từ',
        description: 'Game đơn giản sử dụng While Loop.',
        mainContent: 'User nhập từ để đoán bí mật, có giới hạn số lần thử.',
        code: `secret_word = "giraffe"
guess = ""
guess_count = 0
guess_limit = 3
out_of_guesses = False

while guess != secret_word and not out_of_guesses:
    if guess_count < guess_limit:
        guess = input("Nhập từ đoán: ")
        guess_count += 1
    else:
        out_of_guesses = True

if out_of_guesses:
    print("Bạn thua!")
else:
    print("Bạn thắng!")`,
        seconds: timeToSeconds('01:43:49')
    },
    {
        id: 'for-loop',
        time: '01:54:40',
        title: 'Vòng lặp For',
        description: 'Duyệt qua danh sách hoặc chuỗi.',
        mainContent: 'For loop dùng để duyệt qua từng phần tử của một tập hợp (List, String, Range).',
        code: `for letter in "Giraffe Academy":
    print(letter)

friends = ["Jim", "Karen", "Kevin"]
for friend in friends:
    print(friend)

for index in range(10):
    print(index) # 0 đến 9`,
        seconds: timeToSeconds('01:54:40')
    },
    {
        id: 'exponent-function',
        time: '01:59:46',
        title: 'Build hàm tính lũy thừa',
        description: 'Thuật toán với vòng lặp For.',
        mainContent: 'Tự viết hàm tính lũy thừa mà không dùng math.pow(), một bài tập tư duy thuật toán.',
        code: `def raise_to_power(base_num, pow_num):
    result = 1
    for index in range(pow_num):
        result = result * base_num
    return result

print(raise_to_power(3, 2)) # 9`,
        seconds: timeToSeconds('01:59:46')
    },
    {
        id: '2d-lists',
        time: '02:04:35',
        title: 'Mảng 2 chiều & Loop lồng nhau',
        description: 'Nested Loops.',
        mainContent: 'Xử lý dữ liệu dạng bảng (Ma trận).',
        code: `number_grid = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [0]
]

for row in number_grid:
    for col in row:
        print(col)`,
        seconds: timeToSeconds('02:04:35')
    },
    {
        id: 'translator',
        time: '02:10:20',
        title: 'Ứng dụng dịch ngôn ngữ',
        description: 'Xử lý chuỗi và vòng lặp.',
        mainContent: 'Ví dụ đổi tất cả nguyên âm thành chữ "g".',
        code: `def translate(phrase):
    translation = ""
    for letter in phrase:
        if letter.lower() in "aeiou":
            if letter.isupper():
                translation = translation + "G"
            else:
                translation = translation + "g"
        else:
            translation = translation + letter
    return translation

print(translate(input("Nhập câu: ")))`,
        seconds: timeToSeconds('02:10:20')
    },
    {
        id: 'comments',
        time: '02:20:37',
        title: 'Comments',
        description: 'Ghi chú cho code.',
        mainContent: 'Comment giúp code dễ hiểu hơn cho con người, Python sẽ bỏ qua dòng này khi chạy.',
        code: `# Đây là comment
print("Comments are fun") # Comment ở cuối dòng`,
        seconds: timeToSeconds('02:20:37')
    },
    {
        id: 'try-except',
        time: '02:24:20',
        title: 'Xử lý ngoại lệ (Try/Except)',
        description: 'Bắt lỗi để chương trình không bị crash.',
        mainContent: 'Dùng try/except để xử lý các lỗi runtime như chia cho 0 hoặc nhập sai kiểu dữ liệu.',
        code: `try:
    number = int(input("Nhập 1 số: "))
    print(number)
except ZeroDivisionError:
    print("Lỗi chia cho 0")
except ValueError:
    print("Lỗi nhập liệu không phải số")`,
        seconds: timeToSeconds('02:24:20')
    },
    {
        id: 'read-files',
        time: '02:31:42',
        title: 'Đọc File',
        description: 'Làm việc với file hệ thống.',
        mainContent: 'Mở file, đọc nội dung và đóng file.',
        code: `employee_file = open("employees.txt", "r")
for employee in employee_file.readlines():
    print(employee)
employee_file.close()`,
        keyPoints: ['"r": Read', '"w": Write', '"a": Append', '"r+": Read & Write'],
        seconds: timeToSeconds('02:31:42')
    },
    {
        id: 'write-files',
        time: '02:39:24',
        title: 'Ghi dữ liệu vào File',
        description: 'Tạo hoặc ghi thêm vào file.',
        mainContent: 'Cẩn thận với mode "w" vì nó sẽ ghi đè toàn bộ file cũ.',
        code: `employee_file = open("employees.txt", "a") # Append
employee_file.write("\\nToby - Human Resources")
employee_file.close()`,
        seconds: timeToSeconds('02:39:24')
    },
    {
        id: 'modules',
        time: '02:44:43',
        title: 'Modules và Pip',
        description: 'Sử dụng thư viện.',
        mainContent: 'Module là file python khác mà ta có thể import vào. Pip là trình quản lý gói để cài thư viện bên thứ 3.',
        code: `import useful_tools
print(useful_tools.roll_dice(10))`,
        seconds: timeToSeconds('02:44:43')
    },
    {
        id: 'classes',
        time: '02:55:47',
        title: 'Class và Object',
        description: 'Lập trình hướng đối tượng (OOP).',
        mainContent: 'Class là bản thiết kế (blueprint), Object là thực thể cụ thể. Giúp mô hình hóa dữ liệu thực tế.',
        code: `class Student:
    def __init__(self, name, major, gpa):
        self.name = name
        self.major = major
        self.gpa = gpa

student1 = Student("Jim", "Business", 3.1)
print(student1.name)`,
        seconds: timeToSeconds('02:55:47')
    },
    {
        id: 'quiz-app',
        time: '03:07:16',
        title: 'Project: Thi trắc nghiệm',
        description: 'Ứng dụng OOP hoàn chỉnh.',
        mainContent: 'Xây dựng game trắc nghiệm sử dụng Class Question.',
        code: `question_prompts = [
    "Táo màu gì?\\n(a) Đỏ\\n(b) Tím\\n(c) Cam\\n\\n",
    "Chuối màu gì?\\n(a) Đỏ\\n(b) Vàng\\n(c) Xanh\\n\\n"
]

questions = [
    Question(question_prompts[0], "a"),
    Question(question_prompts[1], "b")
]

def run_test(questions):
    score = 0
    for question in questions:
        answer = input(question.prompt)
        if answer == question.answer:
            score += 1
    print("Bạn đúng " + str(score) + "/" + str(len(questions)))

run_test(questions)`,
        seconds: timeToSeconds('03:07:16')
    }
];
