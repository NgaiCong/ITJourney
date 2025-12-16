export interface CppChapter {
    id: string;
    videoIndex: number;
    time: string;
    title: string;
    description: string;
    mainContent: string;
    code?: string;
    keyPoints?: string[];
}

export const cppCourseData: CppChapter[] = [
    {
        id: 'setup',
        videoIndex: 0,
        time: 'Bài 0',
        title: 'Khởi động - Cài đặt môi trường',
        description: 'Cài đặt Visual Studio và môi trường lập trình C++.',
        mainContent: 'Hướng dẫn cài đặt IDE Visual Studio và chuẩn bị môi trường để bắt đầu học C++.',
        keyPoints: ['Cài đặt Visual Studio Community', 'Cấu hình Desktop development with C++', 'Tạo Project đầu tiên'],
    },
    {
        id: 'hello-world',
        videoIndex: 1,
        time: 'Bài 1',
        title: 'Chương trình C++ đầu tiên | Hello World',
        description: 'Cấu trúc cơ bản và lệnh cout.',
        mainContent: 'Phân tích dòng code "Hello World", thư viện iostream và hàm main().',
        code: `#include <iostream>  // Thu vien xuat nhap
using namespace std;       // Su dung khong gian ten chuan

int main() {               // Ham chinh, diem bat dau chuong trinh
    cout << "Hello World!"; // In ra man hinh
    return 0;              // Ket thuc chuong trinh thanh cong
}`
    },
    {
        id: 'variables',
        videoIndex: 2,
        time: 'Bài 2',
        title: 'Biến trong C++',
        description: 'Khai báo và sử dụng biến.',
        mainContent: 'Biến là vùng nhớ để lưu trữ dữ liệu. Các quy tắc đặt tên biến trong C++.',
        code: `int tuoi = 20;      // Khai bao bien so nguyen ten 'tuoi', gan = 20
float diem = 8.5;    // Khai bao bien so thuc ten 'diem', gan = 8.5
// Luu y: Ten bien khong duoc bat dau bang so, khong dung ky tu dac biet`
    },
    {
        id: 'datatypes',
        videoIndex: 3,
        time: 'Bài 3',
        title: 'Kiểu dữ liệu trong C++',
        description: 'int, float, char, bool...',
        mainContent: 'Các kiểu dữ liệu cơ bản và kích thước bộ nhớ của chúng.',
        code: `// Các kiểu dữ liệu cơ bản
int soNguyen = 10;        // 4 bytes
float soThuc = 3.14f;     // 4 bytes
double soThucLon = 3.14159; // 8 bytes
char kyTu = 'A';          // 1 byte
bool luanLy = true;       // 1 byte`,
        keyPoints: ['Số nguyên (int)', 'Số thực (float, double)', 'Ký tự (char)', 'Luận lý (bool)']
    },
    {
        id: 'constants',
        videoIndex: 4,
        time: 'Bài 4',
        title: 'Hằng trong C++ | Const và #define',
        description: 'Biến không thay đổi giá trị.',
        mainContent: 'Cách sử dụng const và sự khác biệt với #define.',
        code: `const float PI = 3.14;  // Hang so - khong the thay doi gia tri
#define MAX 100          // Macro - thay the MAX bang 100 khi bien dich
// Khac biet: const co kieu du lieu, #define chi la thay the van ban`
    },
    {
        id: 'input-cin',
        videoIndex: 5,
        time: 'Bài 5',
        title: 'Nhập dữ liệu (cin)',
        description: 'Nhập dữ liệu từ bàn phím.',
        mainContent: 'Sử dụng lệnh cin để nhận input từ người dùng.',
        code: `int n;                   // Khai bao bien n
cout << "Nhap n: ";       // In loi nhac cho nguoi dung
cin >> n;                 // Doc gia tri tu ban phim, luu vao n
// Luu y: cin se dung lai o khoang trang dau tien`
    },
    {
        id: 'operators',
        videoIndex: 6,
        time: 'Bài 6',
        title: 'Toán tử trong C++',
        description: 'Cộng, trừ, nhân, chia, logic.',
        mainContent: 'Các phép toán số học và toán tử so sánh, logic trong C++.',
        code: `// Toan tu so hoc: + - * / %
int sum = a + b;          // Cong 2 so
int hieu = a - b;         // Tru
int tich = a * b;         // Nhan
int thuong = a / b;       // Chia (neu int thi lay phan nguyen)
int du = a % b;           // Chia lay du (modulo)

// Toan tu so sanh: > < >= <= == !=
bool check = a > b;       // Tra ve true neu a lon hon b`
    },
    {
        id: 'if-else',
        videoIndex: 7,
        time: 'Bài 7',
        title: 'Câu lệnh if else',
        description: 'Điều kiện rẽ nhánh.',
        mainContent: 'Cấu trúc điều khiển if-else để xử lý logic dựa trên điều kiện.',
        code: `// Cu phap: if (dieu_kien) { lenh } else { lenh_khac }
if (dtb >= 5)             // Neu diem TB >= 5
    cout << "Dau";        // -> In 'Dau'
else                      // Nguoc lai
    cout << "Rot";        // -> In 'Rot'`
    },
    {
        id: 'ex-if-else-1',
        videoIndex: 8,
        time: 'Bài 7.1',
        title: 'Giải bài tập 01 if else',
        description: 'Bài toán lãi suất ngân hàng.',
        mainContent: 'Vận dụng if-else để giải bài toán tính lãi suất ngân hàng.',
        code: `float tienGui, laiSuat;           // Khai bao 2 bien
cout << "Nhap so tien gui: ";      // Hien thi loi nhac
cin >> tienGui;                    // Doc so tien tu ban phim

// Xac dinh lai suat dua tren so tien gui
if (tienGui >= 100000000)          // Neu gui >= 100 trieu
    laiSuat = 0.08;                // -> Lai suat 8%
else if (tienGui >= 50000000)      // Neu gui >= 50 trieu
    laiSuat = 0.06;                // -> Lai suat 6%
else                               // Con lai
    laiSuat = 0.04;                // -> Lai suat 4%

cout << "Lai: " << tienGui * laiSuat;  // Tinh va in tien lai`
    },
    {
        id: 'ex-mini-challenges',
        videoIndex: 9,
        time: 'Bài 8',
        title: 'C++ Exercises | if else Challenges',
        description: 'Thử thách lập trình mini.',
        mainContent: 'Các bài tập nhỏ để luyện tập if-else.',
        code: `// Bai tap: Xep loai hoc luc dua tren diem trung binh
float dtb;                    // Khai bao bien diem TB
cin >> dtb;                   // Nhap diem tu ban phim

// Xep loai theo thang diem
if (dtb >= 8)                 // Diem >= 8
    cout << "Gioi";           // -> Gioi
else if (dtb >= 6.5)          // Diem >= 6.5
    cout << "Kha";            // -> Kha
else if (dtb >= 5)            // Diem >= 5
    cout << "TB";             // -> Trung binh
else                          // Diem < 5
    cout << "Yeu";            // -> Yeu`
    },
    {
        id: 'ex-odd-even',
        videoIndex: 10,
        time: 'Bài 8.1',
        title: 'Giải bài tập 02&03 if else',
        description: 'Kiểm tra số chẵn lẻ.',
        mainContent: 'Thuật toán kiểm tra số chẵn lẻ dùng toán tử %.',
        code: `int n;                        // Khai bao bien n
cin >> n;                      // Nhap so tu ban phim

// Dung toan tu % (chia lay du) de kiem tra
if (n % 2 == 0)                // Neu n chia 2 du 0
    cout << n << " la so chan";  // -> La so chan
else                           // Nguoc lai
    cout << n << " la so le";    // -> La so le`
    },
    {
        id: 'ex-pos-neg',
        videoIndex: 11,
        time: 'Bài 9.1',
        title: 'Giải bài tập 05 if else',
        description: 'Kiểm tra số âm dương.',
        mainContent: 'Kiểm tra một số là số âm, dương hay số 0.',
        code: `int n;                    // Khai bao bien n
cin >> n;                      // Nhap so tu ban phim

// So sanh voi 0 de xac dinh
if (n > 0)                     // Neu n lon hon 0
    cout << "So duong";        // -> So duong
else if (n < 0)                // Neu n nho hon 0
    cout << "So am";           // -> So am
else                           // n = 0
    cout << "So 0";            // -> So 0`
    },
    {
        id: 'ex-max-3',
        videoIndex: 12,
        time: 'Bài 9',
        title: 'Find largest of 3 numbers',
        description: 'Tìm số lớn nhất trong 3 số.',
        mainContent: 'Thuật toán tìm max của 3 biến a, b, c.',
        code: `int a, b, c, max;          // Khai bao 4 bien
cin >> a >> b >> c;            // Nhap 3 so tu ban phim

// Thuat toan tim max: gia su a la max, so sanh voi b, c
max = a;                       // Gia su a la lon nhat
if (b > max) max = b;          // Neu b > max thi cap nhat max = b
if (c > max) max = c;          // Neu c > max thi cap nhat max = c

cout << "Max = " << max;       // In ket qua`
    },
    {
        id: 'ex-bmi',
        videoIndex: 13,
        time: 'Bài 9.2',
        title: 'Giải bài tập 06 if else - BMI',
        description: 'Tính chỉ số BMI cơ thể.',
        mainContent: 'Viết chương trình tính BMI và đánh giá tình trạng cơ thể.',
        code: `float h, w, bmi;              // h: chieu cao (m), w: can nang (kg)
cin >> h >> w;                     // Nhap chieu cao va can nang

// Cong thuc BMI = can nang / (chieu cao ^ 2)
bmi = w / (h * h);                 // Tinh BMI

// Phan loai theo chi so BMI
if (bmi < 18.5)                    // BMI < 18.5
    cout << "Gay";                 // -> Gay
else if (bmi < 25)                 // 18.5 <= BMI < 25
    cout << "Binh thuong";         // -> Binh thuong
else                               // BMI >= 25
    cout << "Thua can";            // -> Thua can`
    },
    {
        id: 'ex-leap-year',
        videoIndex: 14,
        time: 'Bài 9.3',
        title: 'Giải bài tập 07 - Năm nhuận',
        description: 'Kiểm tra năm nhuận.',
        mainContent: 'Điều kiện để một năm là năm nhuận trong lịch dương.',
        code: `int nam;                      // Khai bao bien nam
cin >> nam;                        // Nhap nam tu ban phim

// Dieu kien nam nhuan:
// 1. Chia het cho 4 VA khong chia het cho 100, HOAC
// 2. Chia het cho 400
if ((nam % 4 == 0 && nam % 100 != 0) || nam % 400 == 0)
    cout << "Nam nhuan";           // -> La nam nhuan
else
    cout << "Khong nhuan";         // -> Khong phai`
    },
    {
        id: 'ex-days-month',
        videoIndex: 15,
        time: 'Bài 9.4',
        title: 'Giải bài tập 08 - Số ngày trong tháng',
        description: 'Tính số ngày của tháng.',
        mainContent: 'Dùng if-else hoặc switch để xác định số ngày của một tháng bất kỳ.',
        code: `int thang;
cin >> thang;
if (thang == 2) cout << "28 hoac 29 ngay";
else if (thang==4||thang==6||thang==9||thang==11)
    cout << "30 ngay";
else cout << "31 ngay";`
    },
    {
        id: 'ex-quadratic',
        videoIndex: 16,
        time: 'Bài 9.5',
        title: 'Giải bài tập 09 - PT bậc 2',
        description: 'Giải phương trình bậc 2.',
        mainContent: 'Biện luận nghiệm của phương trình ax^2 + bx + c = 0.',
        code: `float a, b, c, delta;         // He so va delta
cin >> a >> b >> c;                // Nhap he so a, b, c

// Tinh delta theo cong thuc: delta = b^2 - 4ac
delta = b*b - 4*a*c;

// Bien luan nghiem dua tren delta
if (delta < 0)                     // Delta am
    cout << "Vo nghiem";           // -> Vo nghiem thuc
else if (delta == 0)               // Delta = 0
    cout << "x = " << -b/(2*a);    // -> Nghiem kep
else                               // Delta > 0
    cout << "2 nghiem phan biet";  // -> 2 nghiem`
    },
    {
        id: 'ex-quarter',
        videoIndex: 17,
        time: 'Bài 9.6',
        title: 'Giải bài tập 10 - Kiểm tra quý',
        description: 'Xác định quý trong năm.',
        mainContent: 'Từ tháng suy ra quý tương ứng trong năm.',
        code: `int thang;                    // Khai bao bien thang
cin >> thang;                      // Nhap thang tu ban phim

// Cong thuc tinh quy: (thang - 1) / 3 + 1
// Vi du: thang 1,2,3 -> (1-1)/3+1=1 (quy 1)
int quy = (thang - 1) / 3 + 1;

cout << "Quy " << quy;             // In ket qua`
    },
    {
        id: 'ternary',
        videoIndex: 18,
        time: 'Bài 10',
        title: 'Toán tử 3 ngôi (Ternary Operator)',
        description: 'Cú pháp viết tắt của if-else.',
        mainContent: 'Sử dụng toán tử ? : để viết code gọn hơn.',
        code: `// Cu phap toan tu 3 ngoi: dieu_kien ? gia_tri_dung : gia_tri_sai
int a = 5, b = 10;

// Neu a > b thi max = a, nguoc lai max = b
int max = (a > b) ? a : b;         // max = 10

cout << "Max = " << max;           // In ket qua`
    },
    {
        id: 'ex-ternary',
        videoIndex: 19,
        time: 'Bài 10.1',
        title: 'Giải bài tập - Toán tử 3 ngôi',
        description: 'Luyện tập toán tử 3 ngôi.',
        mainContent: 'Giải các bài tập đơn giản bằng toán tử 3 ngôi.',
        code: `// Tìm số lớn hơn
int a = 5, b = 10;
int max = (a > b) ? a : b;
cout << "Max: " << max;`
    },
    {
        id: 'switch-case',
        videoIndex: 20,
        time: 'Bài 11',
        title: 'Câu lệnh Switch Case',
        description: 'Rẽ nhánh nhiều lựa chọn.',
        mainContent: 'Cú pháp switch-case và từ khóa break.',
        code: `// Cu phap switch-case
switch(x) {                        // Kiem tra gia tri cua x
    case 1:                        // Neu x == 1
        cout << "Mot";             // In "Mot"
        break;                     // Thoat khoi switch
    case 2:
        cout << "Hai";
        break;
    default:                       // Neu khong khop case nao
        cout << "Khac";            // Thuc hien default
}  // Luu y: Khong co break se 'roi' xuong case tiep theo`
    },
    {
        id: 'ex-switch',
        videoIndex: 21,
        time: 'Bài 11.1',
        title: 'Giải bài tập Switch Case',
        description: 'Làm máy tính bỏ túi đơn giản.',
        mainContent: 'Tạo máy tính mini thực hiện cộng trừ nhân chia.',
        code: `char phepToan;                 // Bien luu phep toan (+, -, *, /)
float a, b;                        // 2 so hang
cin >> a >> phepToan >> b;         // Nhap: 5 + 3

// Dung switch de kiem tra phep toan
switch(phepToan) {
    case '+':                      // Neu la phep cong
        cout << a + b;             // In tong
        break;                     // Thoat switch
    case '-':                      // Neu la phep tru
        cout << a - b;             // In hieu
        break;
    case '*':                      // Neu la phep nhan
        cout << a * b;             // In tich
        break;
    case '/':                      // Neu la phep chia
        cout << a / b;             // In thuong
        break;
}`
    },
    {
        id: 'for-loop',
        videoIndex: 22,
        time: 'Bài 12',
        title: 'Vòng lặp For',
        description: 'Lặp với số lần xác định.',
        mainContent: 'Cú pháp vòng lặp for và ứng dụng.',
        code: `// Cu phap: for(khoi_tao; dieu_kien; cap_nhat) { lenh }
for(int i = 0; i < 10; i++) {      // i chay tu 0 den 9
    cout << i << " ";              // In gia tri i
}  // Ket qua: 0 1 2 3 4 5 6 7 8 9

// Giai thich:
// int i = 0: khoi tao bien dem
// i < 10: dieu kien lap (lap khi dung)
// i++: tang i sau moi lan lap`
    },
    {
        id: 'ex-for',
        videoIndex: 23,
        time: 'Bài 12.1',
        title: 'Giải bài tập Vòng lặp For',
        description: 'Thực hành vòng lặp for.',
        mainContent: 'Các bài tập tính tổng dãy số, in dãy số.',
        code: `// Bai tap: Tinh tong 1 + 2 + ... + n
int n, tong = 0;                   // Khai bao n va bien tong (khoi tao = 0)
cin >> n;                          // Nhap n tu ban phim

// Dung vong lap for de tinh tong
for (int i = 1; i <= n; i++) {     // i chay tu 1 den n
    tong += i;                     // Cong i vao tong (tong = tong + i)
}

cout << "Tong = " << tong;         // In ket qua`
    },
    {
        id: 'while-loop',
        videoIndex: 24,
        time: 'Bài 13',
        title: 'Vòng lặp While',
        description: 'Lặp với điều kiện.',
        mainContent: 'Cấu trúc while và cách tránh vòng lặp vô hạn.',
        code: `// Cu phap: while (dieu_kien) { lenh }
// Vong lap chay KHI dieu_kien = true

int n = 5;                         // Khoi tao n = 5
while (n > 0) {                    // Lap khi n > 0
    cout << n << " ";              // In gia tri n
    n--;                           // Giam n di 1 (quan trong! tranh lap vo han)
}  // Ket qua: 5 4 3 2 1`
    },
    {
        id: 'ex-while',
        videoIndex: 25,
        time: 'Bài 13.1',
        title: 'Giải bài tập Vòng lặp While',
        description: 'Thực hành vòng lặp while.',
        mainContent: 'Các bài toán phù hợp với while.',
        code: `// Bai tap: Tinh giai thua n! = 1 * 2 * ... * n
int n, gt = 1;                     // gt (giai thua) khoi tao = 1
cin >> n;                          // Nhap n tu ban phim

// Tinh giai thua bang while
while (n > 1) {                    // Lap khi n > 1
    gt *= n;                       // gt = gt * n (nhan tich)
    n--;                           // Giam n
}

cout << "n! = " << gt;             // In ket qua`
    },
    {
        id: 'do-while',
        videoIndex: 26,
        time: 'Bài 14',
        title: 'Vòng lặp Do While',
        description: 'Chạy ít nhất 1 lần.',
        mainContent: 'Sự khác biệt giữa while và do-while.',
        code: `// Cu phap: do { lenh } while (dieu_kien);
// Khac voi while: THUC HIEN TRUOC, kiem tra dieu kien SAU
// => Dam bao chay IT NHAT 1 lan

int n;
do {
    cout << "Nhap so duong: ";     // Hien thi loi nhac
    cin >> n;                      // Nhap n
} while (n <= 0);                  // Lap lai NEU n <= 0 (nhap sai)
// Chi thoat vong lap khi nguoi dung nhap so duong`
    },
    {
        id: 'ex-do-while',
        videoIndex: 27,
        time: 'Bài 14.1',
        title: 'Giải bài tập Do While',
        description: 'Thực hành do-while.',
        mainContent: 'Kiểm tra input hợp lệ bằng do-while.',
        code: `int n;
do {
    cout << "Nhap so duong: ";
    cin >> n;
} while (n <= 0);
cout << "Ban da nhap: " << n;`
    },
    {
        id: 'break-continue',
        videoIndex: 28,
        time: 'Bài 15',
        title: 'Break, Continue & Goto',
        description: 'Điều khiển vòng lặp.',
        mainContent: 'Các câu lệnh nhảy để kiểm soát luồng vòng lặp.',
        code: `// break: thoat khoi vong lap NGAY LAP TUC
// continue: bo qua phan con lai, nhay sang lan lap tiep theo

for (int i = 0; i < 10; i++) {
    if (i == 5) break;             // Khi i = 5, thoat khoi vong lap
    cout << i << " ";              // Chi in: 0 1 2 3 4
}

// Vi du continue:
for (int i = 0; i < 5; i++) {
    if (i == 2) continue;          // Bo qua khi i = 2
    cout << i << " ";              // In: 0 1 3 4 (bo qua 2)
}`
    },
    {
        id: 'ex-break',
        videoIndex: 29,
        time: 'Bài 15.1',
        title: 'Giải bài tập Break Continue',
        description: 'Luyện tập lệnh nhảy.',
        mainContent: 'Ứng dụng break/continue trong tìm kiếm.',
        code: `// Tim so dau tien chia het cho 7 trong khoang 1-100
for (int i = 1; i <= 100; i++) {   // Duyet tu 1 den 100
    if (i % 7 == 0) {              // Neu i chia het cho 7
        cout << "Found: " << i;    // In so tim duoc
        break;                     // Thoat ngay, khong can tim tiep
    }
}  // Ket qua: Found: 7`
    },
    {
        id: 'debug',
        videoIndex: 30,
        time: 'Bài 16.1',
        title: 'Debug trong VS Code',
        description: 'Kỹ năng tìm lỗi.',
        mainContent: 'Hướng dẫn debug chương trình C++ trong VS Code.',
        code: `// Bước 1: Đặt breakpoint (click lề trái dòng code)
// Bước 2: Nhấn F5 hoặc Run > Start Debugging
// Bước 3: Dùng F10 (Step Over) hoặc F11 (Step Into)
// Bước 4: Xem giá trị biến tại panel Variables`
    },
    {
        id: 'errors',
        videoIndex: 31,
        time: 'Bài 16.2',
        title: 'Xử lý lỗi C++',
        description: 'Các lỗi C++ thường gặp.',
        mainContent: 'Error handling và cách đọc thông báo lỗi.',
        code: `// Các lỗi thường gặp:
// 1. Syntax Error: thiếu ; hoặc {}
// 2. Undeclared variable: chưa khai báo biến
// 3. Type mismatch: sai kiểu dữ liệu
// 4. Linker Error: thiếu thư viện`
    },
    {
        id: 'functions',
        videoIndex: 32,
        time: 'Bài 17',
        title: 'Hàm (Functions)',
        description: 'Khái niệm về hàm.',
        mainContent: 'Cách khai báo và gọi hàm trong C++.',
        code: `void sayHi() {
    cout << "Hi";
}`
    },
    {
        id: 'ex-functions-1',
        videoIndex: 33,
        time: 'Bài 17.1',
        title: 'Giải bài tập Hàm 01',
        description: 'Thực hành viết hàm.',
        mainContent: 'Bài tập cơ bản về hàm.',
        code: `// Hàm tính bình phương
int binhPhuong(int n) {
    return n * n;
}
int main() {
    cout << binhPhuong(5); // 25
}`
    },
    {
        id: 'ex-functions-2',
        videoIndex: 34,
        time: 'Bài 17.2',
        title: 'Giải bài tập Hàm 02',
        description: 'Bài tập nâng cao về hàm.',
        mainContent: 'Các bài toán phức tạp hơn dùng hàm.',
        code: `// Hàm kiểm tra số nguyên tố
bool laSNT(int n) {
    if (n < 2) return false;
    for (int i = 2; i <= n/2; i++)
        if (n % i == 0) return false;
    return true;
}`
    },
    {
        id: 'params',
        videoIndex: 35,
        time: 'Bài 18',
        title: 'Tham chiếu & Tham trị',
        description: 'Pass by value vs reference.',
        mainContent: 'Hiểu cơ chế truyền tham số trong C++.',
        code: `void swap(int &a, int &b) {
    int temp = a;
    a = b;
    b = temp;
}`
    },
    {
        id: 'default-params',
        videoIndex: 36,
        time: 'Bài 19',
        title: 'Tham số mặc định (Default Params)',
        description: 'Giá trị mặc định cho tham số.',
        mainContent: 'Cách tạo function có tham số tùy chọn.',
        code: `void greet(string name = "Guest") {
    cout << "Hello, " << name << "!";
}
greet();      // Hello, Guest!
greet("An"); // Hello, An!`
    },
    {
        id: 'recursion',
        videoIndex: 37,
        time: 'Bài 20',
        title: 'Đệ quy (Recursion)',
        description: 'Hàm gọi chính nó.',
        mainContent: 'Khái niệm và ví dụ về đệ quy (giai thừa, fibonacci).',
        code: `// Giai thừa dùng đệ quy
int giaiThua(int n) {
    if (n <= 1) return 1;
    return n * giaiThua(n - 1);
}
cout << giaiThua(5); // 120`
    },
    {
        id: 'arrays',
        videoIndex: 38,
        time: 'Bài 21.1',
        title: 'Mảng 1 chiều (Arrays)',
        description: 'Lưu trữ danh sách phần tử.',
        mainContent: 'Khai báo, khởi tạo và truy cập mảng.',
        code: `int arr[5] = {1, 2, 3, 4, 5};`
    },
    {
        id: 'arrays-2',
        videoIndex: 39,
        time: 'Bài 21.2',
        title: 'Mảng 1 chiều - Part 2',
        description: 'Thao tác với mảng.',
        mainContent: 'Duyệt mảng, nhập xuất mảng.',
        code: `// Nhập và in mảng
int arr[5];
for (int i = 0; i < 5; i++) {
    cin >> arr[i];
}
for (int i = 0; i < 5; i++) {
    cout << arr[i] << " ";
}`
    },
    {
        id: 'ex-arrays',
        videoIndex: 40,
        time: 'Bài 21.3',
        title: 'Giải bài tập Mảng 1 chiều',
        description: 'Luyện tập mảng.',
        mainContent: 'Các bài toán cơ bản về mảng.',
        code: `// Tìm giá trị lớn nhất trong mảng
int arr[5] = {3, 7, 2, 9, 4};
int max = arr[0];
for (int i = 1; i < 5; i++)
    if (arr[i] > max) max = arr[i];
cout << "Max: " << max;`
    },
    {
        id: '2d-arrays',
        videoIndex: 41,
        time: 'Bài 22.1',
        title: 'Mảng 2 chiều - Part 1',
        description: 'Ma trận trong C++.',
        mainContent: 'Khai báo và sử dụng mảng 2 chiều.',
        code: `// Mảng 2 chiều 3x3
int matrix[3][3] = {
    {1, 2, 3},
    {4, 5, 6},
    {7, 8, 9}
};`
    },
    {
        id: '2d-arrays-2',
        videoIndex: 42,
        time: 'Bài 22.2',
        title: 'Mảng 2 chiều - Part 2',
        description: 'Duyệt mảng 2 chiều.',
        mainContent: 'Vòng lặp lồng nhau duyệt ma trận.',
        code: `// In ma trận
for (int i = 0; i < 3; i++) {
    for (int j = 0; j < 3; j++) {
        cout << matrix[i][j] << " ";
    }
    cout << endl;
}`
    },
    {
        id: 'ex-2d-arrays',
        videoIndex: 43,
        time: 'Bài 22.3',
        title: 'Giải bài tập Mảng 2 chiều',
        description: 'Thực hành ma trận.',
        mainContent: 'Các bài tập về ma trận.',
        code: `// Tính tổng đường chéo chính
int tong = 0;
for (int i = 0; i < 3; i++)
    tong += matrix[i][i];
cout << "Tong: " << tong;`
    },
    {
        id: 'pointers',
        videoIndex: 44,
        time: 'Bài 23.1',
        title: 'Con trỏ (Pointers)',
        description: 'Khái niệm con trỏ.',
        mainContent: 'Địa chỉ bộ nhớ và biến con trỏ.',
        code: `int *ptr = &x;`
    },
    {
        id: 'pointers-2',
        videoIndex: 45,
        time: 'Bài 23.2',
        title: 'Con trỏ - Part 2',
        description: 'Thao tác với con trỏ.',
        mainContent: 'Dereferencing và thay đổi giá trị qua con trỏ.',
        code: `int x = 10;
int *ptr = &x;
*ptr = 20;  // Thay đổi x thông qua con trỏ
cout << x;  // In ra 20`
    },
    {
        id: 'pointers-null',
        videoIndex: 46,
        time: 'Bài 23.3',
        title: 'Con trỏ NULL & Double Pointer',
        description: 'Con trỏ trỏ đến con trỏ.',
        mainContent: 'NULL pointer và pointer to pointer.',
        code: `int *ptr = NULL;  // Con trỏ NULL
int x = 5;
int *p = &x;
int **pp = &p;   // Con trỏ trỏ đến con trỏ
cout << **pp;    // In ra 5`
    },
    {
        id: 'pointers-arrays',
        videoIndex: 47,
        time: 'Bài 23.4',
        title: 'Con trỏ & Mảng',
        description: 'Mối quan hệ giữa Pointer và Array.',
        mainContent: 'Tên mảng là một con trỏ hằng. Mảng động.',
        code: `int arr[5] = {1, 2, 3, 4, 5};
int *ptr = arr;  // arr tương đương &arr[0]
cout << *(ptr + 2);  // In ra 3 (phần tử thứ 3)`
    },
    {
        id: 'dynamic-mem',
        videoIndex: 48,
        time: 'Bài 23.5',
        title: 'Cấp phát động (Dynamic Memory)',
        description: 'new và delete.',
        mainContent: 'Quản lý bộ nhớ Heap trong C++.',
        code: `int *arr = new int[n];
delete[] arr;`
    },
    {
        id: 'ex-pointers',
        videoIndex: 49,
        time: 'Bài 23.6',
        title: 'Giải bài tập Con trỏ',
        description: 'Luyện tập con trỏ.',
        mainContent: 'Bài tập vận dụng con trỏ và cấp phát động.',
        code: `// Tạo mảng động n phần tử
int n;
cin >> n;
int *arr = new int[n];
for (int i = 0; i < n; i++) arr[i] = i * 2;
delete[] arr;  // Giải phóng bộ nhớ`
    },
    {
        id: 'char-arrays',
        videoIndex: 50,
        time: 'Bài 24.1',
        title: 'Mảng ký tự (C-Strings) - Part 1',
        description: 'Chuỗi kiểu C.',
        mainContent: 'Khai báo mảng char.',
        code: `char ten[20] = "Nguyen Van A";
cout << ten;  // In ra: Nguyen Van A`
    },
    {
        id: 'char-io',
        videoIndex: 51,
        time: 'Bài 24.2',
        title: 'Nhập xuất chuỗi C',
        description: 'cin.getline.',
        mainContent: 'Cách nhập chuỗi có khoảng trắng.',
        code: `char hoten[50];
cout << "Nhap ho ten: ";
cin.getline(hoten, 50);
cout << "Xin chao " << hoten;`
    },
    {
        id: 'char-copy',
        videoIndex: 52,
        time: 'Bài 24.3',
        title: 'Sao chép chuỗi (strcpy)',
        description: 'Copy chuỗi char.',
        mainContent: 'Sử dụng hàm strcpy.',
        code: `#include <cstring>
char src[] = "Hello";
char dest[20];
strcpy(dest, src);
cout << dest;  // Hello`
    },
    {
        id: 'char-concat',
        videoIndex: 53,
        time: 'Bài 24.4',
        title: 'Nối chuỗi (strcat)',
        description: 'Ghép chuỗi char.',
        mainContent: 'Sử dụng hàm strcat.',
        code: `char s1[20] = "Hello ";
char s2[] = "World";
strcat(s1, s2);
cout << s1;  // Hello World`
    },
    {
        id: 'char-search',
        videoIndex: 54,
        time: 'Bài 24.5',
        title: 'Tìm kiếm trong chuỗi (strstr)',
        description: 'Tìm substring.',
        mainContent: 'Sử dụng hàm strstr và strchr.',
        code: `char s[] = "Hello World";
char *found = strstr(s, "World");
if (found) cout << "Tim thay tai: " << found;`
    },
    {
        id: 'char-cmp',
        videoIndex: 55,
        time: 'Bài 24.6',
        title: 'So sánh chuỗi (strcmp)',
        description: 'So sánh 2 chuỗi.',
        mainContent: 'Sử dụng hàm strcmp.',
        code: `char s1[] = "abc";
char s2[] = "abd";
int kq = strcmp(s1, s2);
if (kq == 0) cout << "Bang nhau";
else cout << "Khac nhau";`
    },
    {
        id: 'char-len',
        videoIndex: 56,
        time: 'Bài 24.7',
        title: 'Độ dài chuỗi (strlen)',
        description: 'Đếm ký tự.',
        mainContent: 'Sử dụng hàm strlen.',
        code: `char s[] = "Hello";
cout << "Do dai: " << strlen(s);  // 5`
    },
    {
        id: 'std-string',
        videoIndex: 57,
        time: 'Bài 25.1',
        title: 'Lớp String trong C++',
        description: 'std::string hiện đại.',
        mainContent: 'Sử dụng thư viện <string> thay cho mảng char.',
        code: `string s = "Hello C++";`
    },
    {
        id: 'structs-1',
        videoIndex: 58,
        time: 'Bài 25.2',
        title: 'Struct C++ - Kiểu cấu trúc',
        description: 'Định nghĩa kiểu dữ liệu mới.',
        mainContent: 'Cách định nghĩa struct để nhóm các biến liên quan.',
        code: `struct SinhVien {
    string name;
    int age;
};`
    },
    {
        id: 'structs-nested',
        videoIndex: 59,
        time: 'Bài 25.3',
        title: 'Struct lồng nhau C++',
        description: 'Struct trong struct.',
        mainContent: 'Cách nhúng struct vào bên trong struct khác.',
        code: `struct DiaChi {
    string tinh;
    string huyen;
};
struct SinhVien {
    string ten;
    DiaChi dc;  // Struct lồng
};`
    },
    {
        id: 'structs-array',
        videoIndex: 60,
        time: 'Bài 25.4',
        title: 'Mảng Struct C++',
        description: 'Danh sách các cấu trúc.',
        mainContent: 'Khai báo và sử dụng mảng các struct.',
        code: `SinhVien dsSV[100];
for (int i = 0; i < n; i++) {
    cout << "Ho ten: ";
    getline(cin, dsSV[i].ten);
}`
    },
    {
        id: 'structs-pointer',
        videoIndex: 61,
        time: 'Bài 25.5',
        title: 'Con trỏ Struct C++',
        description: 'Con trỏ trỏ tới struct.',
        mainContent: 'Sử dụng toán tử -> để truy cập thành viên qua con trỏ.',
        code: `SinhVien sv = {"An", 20};
SinhVien *ptr = &sv;
cout << ptr->ten;    // Dung ->
cout << (*ptr).age;  // Hoac (*ptr).`
    },
    {
        id: 'ex-structs-1',
        videoIndex: 62,
        time: 'Bài 25.6',
        title: 'Giải bài tập C++ 27 - Struct',
        description: 'Bài tập struct 1.',
        mainContent: 'Vận dụng struct để giải bài toán quản lý.',
        code: `// Quản lý sinh viên
struct SinhVien {
    string mssv, hoten;
    float dtb;
};
void nhapSV(SinhVien &sv) {
    cin >> sv.mssv;
}`
    },
    {
        id: 'ex-structs-2',
        videoIndex: 63,
        time: 'Bài 25.7',
        title: 'Giải bài tập C++ 28 - Struct',
        description: 'Bài tập struct 2.',
        mainContent: 'Bài tập phức tạp hơn với struct.',
        code: `// Tìm sinh viên có điểm cao nhất
int idxMax = 0;
for (int i = 1; i < n; i++)
    if (dsSV[i].dtb > dsSV[idxMax].dtb)
        idxMax = i;
cout << dsSV[idxMax].hoten;`
    },
    {
        id: 'ex-structs-3',
        videoIndex: 64,
        time: 'Bài 25.8',
        title: 'Giải bài tập C++ 29 - Struct',
        description: 'Bài tập struct 3.',
        mainContent: 'Bài tập cuối về struct.',
        code: `// Sắp xếp sinh viên theo điểm
for (int i = 0; i < n-1; i++)
    for (int j = i+1; j < n; j++)
        if (dsSV[i].dtb < dsSV[j].dtb)
            swap(dsSV[i], dsSV[j]);`
    },
    {
        id: 'enum',
        videoIndex: 65,
        time: 'Bài 26',
        title: 'Enum C++ (Kiểu liệt kê)',
        description: 'Tạo tập hợp hằng số.',
        mainContent: 'Sử dụng enum để code dễ đọc hơn.',
        code: `enum Color { RED, GREEN, BLUE };`
    },
    {
        id: 'class',
        videoIndex: 66,
        time: 'Bài 27',
        title: 'Class trong C++ (OOP)',
        description: 'Hướng đối tượng C++.',
        mainContent: 'Khái niệm lớp và đối tượng - nền tảng của OOP.',
        code: `class HinhChuNhat {
    // defined
};`
    },
    {
        id: 'objects',
        videoIndex: 67,
        time: 'Bài 28',
        title: 'Object trong C++ (OOP)',
        description: 'Tạo và sử dụng đối tượng.',
        mainContent: 'Cách tạo object từ class.',
        code: `class HinhTron {
public:
    float r;
    float dienTich() { return 3.14 * r * r; }
};
HinhTron ht;   // Tạo object
ht.r = 5;
cout << ht.dienTich();`
    },
    {
        id: 'constructor-destructor',
        videoIndex: 68,
        time: 'Bài 29',
        title: 'Constructor & Destructor C++',
        description: 'Tạo và hủy đối tượng.',
        mainContent: 'Phương thức đặc biệt khi khởi tạo và hủy đối tượng.',
        code: `class SinhVien {
public:
    string ten;
    // Constructor
    SinhVien(string t) { ten = t; }
    // Destructor
    ~SinhVien() { cout << "Huy " << ten; }
};`
    }
];
