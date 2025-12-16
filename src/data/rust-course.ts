export interface RustChapter {
    id: string;
    videoIndex: number;
    time: string;
    title: string;
    description: string;
    mainContent: string;
    code?: string;
    keyPoints?: string[];
}

export const rustCourseData: RustChapter[] = [
    {
        id: 'setup',
        videoIndex: 0,
        time: 'Bài 1',
        title: 'Cài đặt môi trường Rust',
        description: 'Hướng dẫn cài đặt Rust và VS Code.',
        mainContent: 'Cài đặt Rustup, công cụ quản lý phiên bản Rust, và cấu hình VS Code với extension rust-analyzer.',
        code: `// Cài đặt Rust trên Windows/macOS/Linux
// Chạy lệnh sau trong terminal:
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

// Kiểm tra phiên bản Rust
rustc --version
cargo --version`,
        keyPoints: ['Cài đặt Rustup', 'Cấu hình VS Code', 'Extension rust-analyzer']
    },
    {
        id: 'hello-world',
        videoIndex: 1,
        time: 'Bài 2',
        title: 'Hello World với Rust',
        description: 'Chương trình Rust đầu tiên.',
        mainContent: 'Tạo project Rust đầu tiên với Cargo và viết chương trình Hello World.',
        code: `// Tạo project mới với Cargo
// cargo new hello_rust

fn main() {                    // Hàm main - điểm bắt đầu chương trình
    println!("Hello, Rust!"); // Macro in ra màn hình
}  // Biên dịch: cargo build, Chạy: cargo run`
    },
    {
        id: 'variables',
        videoIndex: 2,
        time: 'Bài 3',
        title: 'Biến và Tính bất biến (Variables)',
        description: 'Khai báo biến với let và mut.',
        mainContent: 'Rust mặc định biến là immutable (bất biến). Dùng mut để tạo biến có thể thay đổi.',
        code: `let x = 5;           // Biến bất biến (immutable)
// x = 10;            // LỖI! Không thể thay đổi

let mut y = 5;       // Biến có thể thay đổi (mutable)
y = 10;              // OK - Có thể thay đổi giá trị

// Shadowing: khai báo lại biến cùng tên
let x = x + 1;       // x bây giờ = 6
let x = "hello";     // Có thể đổi cả kiểu dữ liệu!`
    },
    {
        id: 'datatypes',
        videoIndex: 3,
        time: 'Bài 4',
        title: 'Kiểu dữ liệu (Data Types)',
        description: 'Scalar và Compound types.',
        mainContent: 'Rust là ngôn ngữ statically typed - phải biết kiểu dữ liệu tại thời điểm biên dịch.',
        code: `// Scalar types: đại diện một giá trị đơn
let a: i32 = 42;        // Số nguyên 32-bit có dấu
let b: u64 = 100;       // Số nguyên 64-bit không dấu
let c: f64 = 3.14;      // Số thực 64-bit
let d: bool = true;     // Boolean
let e: char = '🦀';     // Character (4 bytes, Unicode)

// Compound types: nhóm nhiều giá trị
let tuple: (i32, f64, char) = (42, 3.14, 'R');
let array: [i32; 5] = [1, 2, 3, 4, 5];`
    },
    {
        id: 'functions',
        videoIndex: 4,
        time: 'Bài 5',
        title: 'Hàm (Functions)',
        description: 'Định nghĩa và gọi hàm trong Rust.',
        mainContent: 'Rust sử dụng snake_case cho tên hàm. Hàm có thể trả về giá trị mà không cần từ khóa return.',
        code: `// Định nghĩa hàm với tham số và kiểu trả về
fn add(a: i32, b: i32) -> i32 {  // -> i32: kiểu trả về
    a + b                         // Không có ; = expression, tự return
}

fn greet(name: &str) {           // Không trả về gì (void)
    println!("Xin chào, {}!", name);
}

fn main() {
    let result = add(5, 3);      // Gọi hàm: result = 8
    greet("Rust");               // In: Xin chào, Rust!
}`
    },
    {
        id: 'control-flow',
        videoIndex: 5,
        time: 'Bài 6',
        title: 'Luồng điều khiển (Control Flow)',
        description: 'if/else, loop, while, for.',
        mainContent: 'Rust có các cấu trúc điều khiển quen thuộc nhưng với một số điểm khác biệt quan trọng.',
        code: `// if/else - điều kiện phải là bool, không cần ()
let number = 7;
if number < 5 {
    println!("Nhỏ hơn 5");
} else if number == 5 {
    println!("Bằng 5");
} else {
    println!("Lớn hơn 5");
}

// if là expression - có thể gán vào biến
let result = if number > 0 { "dương" } else { "không dương" };

// Vòng lặp for với range
for i in 1..=5 {         // 1..=5 là inclusive range (1 đến 5)
    println!("{}", i);
}`
    },
    {
        id: 'ownership',
        videoIndex: 6,
        time: 'Bài 7',
        title: 'Ownership (Quyền sở hữu)',
        description: 'Khái niệm cốt lõi của Rust.',
        mainContent: 'Ownership là tính năng độc đáo giúp Rust quản lý bộ nhớ an toàn mà không cần Garbage Collector.',
        code: `// Quy tắc Ownership:
// 1. Mỗi giá trị có duy nhất 1 owner
// 2. Chỉ có 1 owner tại một thời điểm
// 3. Khi owner ra khỏi scope, giá trị bị drop

let s1 = String::from("hello");  // s1 sở hữu string
let s2 = s1;                     // MOVE: s2 là owner mới
// println!("{}", s1);            // LỖI! s1 không còn hợp lệ

// Clone để sao chép deep copy
let s3 = s2.clone();             // s3 là bản sao độc lập
println!("{} {}", s2, s3);       // OK - cả hai đều hợp lệ`,
        keyPoints: ['Move semantics', 'Clone vs Copy', 'Scope và drop']
    },
    {
        id: 'borrowing',
        videoIndex: 7,
        time: 'Bài 8',
        title: 'Borrowing & References',
        description: 'Mượn tham chiếu thay vì chuyển ownership.',
        mainContent: 'References cho phép sử dụng dữ liệu mà không lấy ownership. Borrow checker đảm bảo an toàn.',
        code: `// Immutable reference (&): có thể có nhiều
fn calculate_length(s: &String) -> usize {  // &String: mượn không thay đổi
    s.len()                         // Không lấy ownership
}

let s1 = String::from("hello");
let len = calculate_length(&s1);  // &s1: tạo reference
println!("{} có {} ký tự", s1, len);  // s1 vẫn hợp lệ!

// Mutable reference (&mut): chỉ được 1 tại một thời điểm
fn change(s: &mut String) {
    s.push_str(" world");
}

let mut s2 = String::from("hello");
change(&mut s2);  // Mượn có thể thay đổi`
    },
    {
        id: 'structs',
        videoIndex: 8,
        time: 'Bài 9',
        title: 'Struct',
        description: 'Định nghĩa kiểu dữ liệu tùy chỉnh.',
        mainContent: 'Struct giúp nhóm các dữ liệu liên quan thành một kiểu có ý nghĩa.',
        code: `// Định nghĩa struct
struct User {
    username: String,
    email: String,
    active: bool,
}

// Tạo instance
let user1 = User {
    username: String::from("rust_fan"),
    email: String::from("rust@example.com"),
    active: true,
};

// Truy cập field
println!("User: {}", user1.username);

// Tuple struct
struct Color(i32, i32, i32);
let black = Color(0, 0, 0);`
    },
    {
        id: 'enums',
        videoIndex: 9,
        time: 'Bài 10',
        title: 'Enum & Pattern Matching',
        description: 'Liệt kê các trạng thái có thể.',
        mainContent: 'Enum trong Rust mạnh mẽ hơn nhiều ngôn ngữ khác - có thể chứa dữ liệu bên trong variant.',
        code: `// Enum đơn giản
enum Direction {
    North, South, East, West
}

// Enum với dữ liệu
enum Message {
    Quit,                       // Không có dữ liệu
    Move { x: i32, y: i32 },   // Named fields
    Write(String),             // Tuple variant
}

// Pattern matching với match
let msg = Message::Move { x: 10, y: 20 };

match msg {
    Message::Quit => println!("Thoát"),
    Message::Move { x, y } => println!("Di chuyển đến ({}, {})", x, y),
    Message::Write(text) => println!("Viết: {}", text),
}`
    },
    {
        id: 'option-result',
        videoIndex: 10,
        time: 'Bài 11',
        title: 'Option & Result',
        description: 'Xử lý giá trị có thể rỗng và lỗi.',
        mainContent: 'Rust không có null. Thay vào đó dùng Option<T> và Result<T, E> để xử lý an toàn.',
        code: `// Option<T>: có thể có giá trị (Some) hoặc không (None)
fn find_user(id: u32) -> Option<String> {
    if id == 1 {
        Some(String::from("Rust Fan"))  // Có giá trị
    } else {
        None                            // Không có giá trị
    }
}

// Xử lý Option với match hoặc if let
if let Some(name) = find_user(1) {
    println!("Tìm thấy: {}", name);
}

// Result<T, E>: thành công (Ok) hoặc lỗi (Err)
fn divide(a: f64, b: f64) -> Result<f64, String> {
    if b == 0.0 {
        Err(String::from("Không thể chia cho 0!"))
    } else {
        Ok(a / b)
    }
}`
    },
    {
        id: 'collections',
        videoIndex: 11,
        time: 'Bài 12',
        title: 'Collections (Vec, HashMap)',
        description: 'Cấu trúc dữ liệu động.',
        mainContent: 'Rust cung cấp các collection mạnh mẽ như Vector, HashMap, HashSet trong thư viện chuẩn.',
        code: `// Vector: mảng động
let mut vec: Vec<i32> = Vec::new();
vec.push(1);
vec.push(2);
vec.push(3);

// Macro vec! để khởi tạo nhanh
let v = vec![1, 2, 3, 4, 5];

// Truy cập phần tử
println!("{}", v[0]);    // Có thể panic nếu out of bounds
println!("{:?}", v.get(10));  // Trả về Option, an toàn hơn

// HashMap
use std::collections::HashMap;
let mut scores = HashMap::new();
scores.insert(String::from("Blue"), 10);
scores.insert(String::from("Red"), 50);`
    },
    {
        id: 'error-handling',
        videoIndex: 12,
        time: 'Bài 13',
        title: 'Xử lý lỗi (Error Handling)',
        description: 'Recoverable và Unrecoverable errors.',
        mainContent: 'Rust phân biệt lỗi có thể phục hồi (Result) và lỗi nghiêm trọng (panic!).',
        code: `use std::fs::File;
use std::io::Read;

// Cách 1: Match Result
fn read_file_v1() -> Result<String, std::io::Error> {
    let file = File::open("hello.txt");
    match file {
        Ok(mut f) => {
            let mut contents = String::new();
            f.read_to_string(&mut contents)?;  // ? propagate lỗi
            Ok(contents)
        }
        Err(e) => Err(e),
    }
}

// Cách 2: Dùng toán tử ? (ngắn gọn hơn)
fn read_file_v2() -> Result<String, std::io::Error> {
    let mut file = File::open("hello.txt")?;  // ? = nếu Err thì return
    let mut contents = String::new();
    file.read_to_string(&mut contents)?;
    Ok(contents)
}`
    },
    {
        id: 'traits',
        videoIndex: 13,
        time: 'Bài 14',
        title: 'Traits',
        description: 'Định nghĩa hành vi chung.',
        mainContent: 'Trait tương tự interface trong các ngôn ngữ khác, định nghĩa các phương thức mà type phải implement.',
        code: `// Định nghĩa trait
trait Summary {
    fn summarize(&self) -> String;
    
    // Default implementation
    fn author(&self) -> String {
        String::from("Unknown")
    }
}

// Implement trait cho struct
struct Article {
    title: String,
    content: String,
}

impl Summary for Article {
    fn summarize(&self) -> String {
        format!("{}: {}...", self.title, &self.content[..20])
    }
}

// Trait bound: yêu cầu type phải implement trait
fn notify(item: &impl Summary) {
    println!("Breaking news! {}", item.summarize());
}`
    },
    {
        id: 'generics',
        videoIndex: 14,
        time: 'Bài 15',
        title: 'Generics',
        description: 'Lập trình tổng quát.',
        mainContent: 'Generics cho phép viết code có thể hoạt động với nhiều kiểu dữ liệu khác nhau.',
        code: `// Hàm generic: hoạt động với nhiều kiểu
fn largest<T: PartialOrd>(list: &[T]) -> &T {
    let mut largest = &list[0];
    for item in list {
        if item > largest {
            largest = item;
        }
    }
    largest
}

// Struct generic
struct Point<T> {
    x: T,
    y: T,
}

// Có thể có nhiều type parameter
struct Pair<T, U> {
    first: T,
    second: U,
}

let int_point = Point { x: 5, y: 10 };
let float_point = Point { x: 1.0, y: 4.0 };`
    },
    {
        id: 'lifetimes',
        videoIndex: 15,
        time: 'Bài 16',
        title: 'Lifetimes',
        description: 'Đảm bảo references hợp lệ.',
        mainContent: 'Lifetime annotation giúp Rust đảm bảo references không tồn tại lâu hơn dữ liệu chúng trỏ đến.',
        code: `// Lifetime annotation: 'a
// Đảm bảo output sống ít nhất bằng input ngắn nhất
fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {
    if x.len() > y.len() { x } else { y }
}

// Struct chứa reference cần lifetime
struct Excerpt<'a> {
    part: &'a str,  // part phải sống ít nhất bằng Excerpt
}

fn main() {
    let novel = String::from("Call me Ishmael...");
    let first_sentence = novel.split('.').next().unwrap();
    let excerpt = Excerpt { part: first_sentence };
    println!("{}", excerpt.part);
}`
    },
    {
        id: 'closures',
        videoIndex: 16,
        time: 'Bài 17',
        title: 'Closures',
        description: 'Hàm ẩn danh capture environment.',
        mainContent: 'Closures là anonymous functions có thể capture biến từ scope bao quanh.',
        code: `// Closure cơ bản
let add_one = |x: i32| x + 1;
println!("{}", add_one(5));  // 6

// Closure capture biến từ environment
let x = 4;
let equal_to_x = |z| z == x;  // capture x
println!("{}", equal_to_x(4));  // true

// Closure với move: lấy ownership
let s = String::from("hello");
let closure = move || {
    println!("{}", s);  // Closure sở hữu s
};
// println!("{}", s);  // LỖI! s đã bị move

// Closure làm tham số (thường dùng với iterators)
let numbers = vec![1, 2, 3, 4, 5];
let doubled: Vec<i32> = numbers.iter().map(|x| x * 2).collect();`
    },
    {
        id: 'iterators',
        videoIndex: 17,
        time: 'Bài 18',
        title: 'Iterators',
        description: 'Xử lý tuần tự hiệu quả.',
        mainContent: 'Iterator pattern trong Rust mạnh mẽ và hiệu năng cao (zero-cost abstraction).',
        code: `let v = vec![1, 2, 3, 4, 5];

// Iterator methods (lazy - chỉ chạy khi consume)
let result: Vec<i32> = v.iter()
    .map(|x| x * 2)        // Nhân đôi mỗi phần tử
    .filter(|x| *x > 4)    // Lọc > 4
    .collect();            // Thu thập thành Vec

println!("{:?}", result);  // [6, 8, 10]

// Các phương thức hữu ích
let sum: i32 = v.iter().sum();  // Tổng: 15
let product: i32 = v.iter().product();  // Tích: 120
let any_even = v.iter().any(|x| x % 2 == 0);  // Có số chẵn: true
let all_positive = v.iter().all(|x| *x > 0);  // Tất cả dương: true`
    },
    {
        id: 'modules',
        videoIndex: 18,
        time: 'Bài 19',
        title: 'Modules & Crates',
        description: 'Tổ chức code.',
        mainContent: 'Rust sử dụng module system để tổ chức code và kiểm soát visibility.',
        code: `// Định nghĩa module
mod front_of_house {
    pub mod hosting {          // pub: public, có thể truy cập từ ngoài
        pub fn add_to_waitlist() {}
    }
    
    mod serving {              // private mặc định
        fn take_order() {}
    }
}

// Sử dụng module
use front_of_house::hosting;  // Import vào scope

pub fn eat_at_restaurant() {
    hosting::add_to_waitlist();
    
    // Hoặc đường dẫn đầy đủ
    crate::front_of_house::hosting::add_to_waitlist();
}`
    },
    {
        id: 'cargo',
        videoIndex: 19,
        time: 'Bài 20',
        title: 'Cargo & Crates.io',
        description: 'Quản lý dự án và dependencies.',
        mainContent: 'Cargo là build tool và package manager của Rust. Crates.io là registry chính thức.',
        code: `// Cargo.toml - file cấu hình dự án
// [package]
// name = "my_project"
// version = "0.1.0"
// edition = "2021"
//
// [dependencies]
// serde = "1.0"          # Thêm dependency
// tokio = { version = "1", features = ["full"] }

// Các lệnh Cargo thường dùng:
// cargo new project_name    # Tạo project mới
// cargo build              # Build project
// cargo build --release    # Build optimized
// cargo run                # Build và chạy
// cargo test               # Chạy tests
// cargo doc --open         # Tạo và mở documentation
// cargo add serde          # Thêm dependency (cargo-edit)`
    },
    {
        id: 'testing',
        videoIndex: 20,
        time: 'Bài 21',
        title: 'Testing trong Rust',
        description: 'Viết và chạy unit tests.',
        mainContent: 'Rust có hỗ trợ testing tích hợp sẵn. Dùng cargo test để chạy tất cả tests.',
        code: `// Unit test trong cùng file
fn add(a: i32, b: i32) -> i32 {
    a + b
}

#[cfg(test)]  // Chỉ compile khi test
mod tests {
    use super::*;  // Import từ parent module
    
    #[test]
    fn test_add() {
        assert_eq!(add(2, 2), 4);  // Kiểm tra bằng
    }
    
    #[test]
    fn test_add_negative() {
        assert_eq!(add(-1, 1), 0);
    }
    
    #[test]
    #[should_panic]  // Test này phải panic
    fn test_panic() {
        panic!("This test should panic!");
    }
}`
    },
    {
        id: 'smart-pointers',
        videoIndex: 21,
        time: 'Bài 22',
        title: 'Smart Pointers',
        description: 'Box, Rc, RefCell.',
        mainContent: 'Smart pointers cung cấp tính năng bổ sung ngoài references thông thường.',
        code: `// Box<T>: lưu trữ data trên heap
let b = Box::new(5);  // 5 được lưu trên heap
println!("{}", b);

// Rc<T>: Reference Counting - multiple ownership
use std::rc::Rc;
let a = Rc::new(String::from("shared"));
let b = Rc::clone(&a);  // Tăng reference count
let c = Rc::clone(&a);
println!("Count: {}", Rc::strong_count(&a));  // 3

// RefCell<T>: Interior mutability - mutable borrow at runtime
use std::cell::RefCell;
let data = RefCell::new(5);
*data.borrow_mut() += 1;  // Mutable borrow
println!("{}", data.borrow());  // Immutable borrow: 6`
    },
    {
        id: 'concurrency',
        videoIndex: 22,
        time: 'Bài 23',
        title: 'Concurrency (Đa luồng)',
        description: 'Threads và message passing.',
        mainContent: 'Rust đảm bảo fearless concurrency nhờ ownership và type system.',
        code: `use std::thread;
use std::sync::mpsc;  // Multiple Producer, Single Consumer

// Tạo thread
let handle = thread::spawn(|| {
    for i in 1..5 {
        println!("Thread: {}", i);
    }
});
handle.join().unwrap();  // Đợi thread kết thúc

// Message passing với channel
let (tx, rx) = mpsc::channel();

thread::spawn(move || {
    tx.send(String::from("Hello từ thread!")).unwrap();
});

let received = rx.recv().unwrap();
println!("Nhận: {}", received);`
    },
    {
        id: 'async-await',
        videoIndex: 23,
        time: 'Bài 24',
        title: 'Async/Await',
        description: 'Lập trình bất đồng bộ.',
        mainContent: 'Rust hỗ trợ async programming với async/await syntax, cần runtime như Tokio.',
        code: `// Cần thêm tokio = { version = "1", features = ["full"] }
use tokio;

async fn fetch_data() -> String {
    // Giả lập network request
    tokio::time::sleep(tokio::time::Duration::from_secs(1)).await;
    String::from("Data received!")
}

#[tokio::main]  // Cần macro này cho async main
async fn main() {
    let result = fetch_data().await;  // Đợi async function
    println!("{}", result);
    
    // Chạy nhiều async tasks song song
    let (a, b) = tokio::join!(
        fetch_data(),
        fetch_data()
    );
}`
    },
    {
        id: 'macros',
        videoIndex: 24,
        time: 'Bài 25',
        title: 'Macros',
        description: 'Metaprogramming trong Rust.',
        mainContent: 'Macros cho phép viết code sinh code. Rust có declarative và procedural macros.',
        code: `// Declarative macro với macro_rules!
macro_rules! say_hello {
    () => {
        println!("Hello!");
    };
    ($name:expr) => {
        println!("Hello, {}!", $name);
    };
}

say_hello!();           // Hello!
say_hello!("Rust");     // Hello, Rust!

// Custom macro tạo vector với log
macro_rules! vec_log {
    ( $( $x:expr ),* ) => {
        {
            let mut temp_vec = Vec::new();
            $(
                println!("Thêm: {}", $x);
                temp_vec.push($x);
            )*
            temp_vec
        }
    };
}

let v = vec_log![1, 2, 3];  // In log và tạo vec`
    }
];

// Thông tin giới thiệu Rust
export const rustIntroData = {
    title: "Rust Programming Language",
    subtitle: "An toàn, nhanh, đáng tin cậy. Chọn cả 3!",
    description: "Rust là ngôn ngữ lập trình hệ thống hiện đại, kết hợp hiệu năng của C/C++ với sự an toàn bộ nhớ. Được Mozilla phát triển và yêu thích bởi cộng đồng lập trình viên toàn cầu.",

    painPoints: [
        {
            title: "Trước Rust: Thế lưỡng nan",
            items: [
                "C/C++: Hiệu năng cao nhưng dễ gây lỗi bộ nhớ nghiêm trọng",
                "Java/Python: An toàn nhưng đánh đổi hiệu năng với Garbage Collector",
                "70% lỗ hổng bảo mật đến từ lỗi quản lý bộ nhớ"
            ]
        }
    ],

    features: [
        {
            icon: "Shield",
            title: "Memory Safety",
            desc: "Ownership & Borrow Checker loại bỏ lỗi bộ nhớ tại compile time"
        },
        {
            icon: "Zap",
            title: "Zero-Cost Abstraction",
            desc: "Code an toàn, hiệu năng tương đương C/C++"
        },
        {
            icon: "Users",
            title: "Fearless Concurrency",
            desc: "Đa luồng an toàn, không data races"
        },
        {
            icon: "Package",
            title: "Cargo & Crates.io",
            desc: "Hệ sinh thái phong phú với hàng nghìn thư viện"
        }
    ],

    companies: [
        "Mozilla", "Microsoft", "Google", "Amazon AWS", "Meta", "Discord", "Dropbox", "Cloudflare"
    ],

    history: [
        { year: "2006", event: "Graydon Hoare bắt đầu project Rust" },
        { year: "2010", event: "Mozilla tài trợ chính thức" },
        { year: "2015", event: "Rust 1.0 phát hành" },
        { year: "2021", event: "Thành lập Rust Foundation" }
    ]
};
