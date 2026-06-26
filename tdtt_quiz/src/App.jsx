import React, { useState, useEffect, useMemo } from 'react';

// ==========================================
// 1. HỆ THỐNG ICON CHẤT LƯỢNG CAO (SVG)
// ==========================================
const Icons = {
  Trophy: () => (
    <svg className="w-10 h-10 text-yellow-400 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l4-2.5V9l-4 2.5L8 9v2.5l4 2.5z" />
    </svg>
  ),
  Streak: () => (
    <svg className="w-5 h-5 text-orange-500 animate-pulse shrink-0" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
    </svg>
  ),
  Clock: () => (
    <svg className="w-5 h-5 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Bookmark: ({ marked }) => (
    <svg className={`w-5 h-5 transition-all ${marked ? 'fill-sky-400 text-sky-400 scale-110' : 'text-zinc-400 hover:text-sky-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
    </svg>
  ),
  Back: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
  ),
  Next: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  ),
  Brain: () => (
    <svg className="w-7 h-7 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  ),
  Info: () => (
    <svg className="w-5 h-5 text-sky-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Home: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  ),
  User: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  ),
  BookOpen: () => (
    <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  ),
  Award: () => (
    <svg className="w-6 h-6 text-yellow-500 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
    </svg>
  ),
  Search: () => (
    <svg className="w-4 h-4 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  ),
  Filter: () => (
    <svg className="w-4 h-4 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
    </svg>
  )
};

// ==========================================
// 2. DATA BLOCKS: BỘ CÂU HỎI CHUẨN (300 CÂU)
// ==========================================
const EXAM_SET_01_DATA = [
  { id: 1, topic: "ND01: Tư duy máy tính", difficulty: "Dễ", question: "Kỹ năng nào thể hiện việc chia bài toán lớn thành các module nhỏ dễ giải quyết hơn?", code: "def app():\n    get_data()\n    process_data()\n    show_ui()", options: ["Trừu tượng hóa", "Nhận dạng mẫu", "Phân rã (Decomposition)", "Thiết kế thuật toán"], correctAnswer: 2, explanation: "Phân rã (Decomposition) là hành động chia nhỏ (divide) hệ thống thành các hàm/thành phần con.", hint: "Divide and Conquer." },
  { id: 2, topic: "ND01: Tư duy máy tính", difficulty: "Dễ", question: "Khi ẩn đi chi tiết tính toán phức tạp vào trong một hàm và chỉ quan tâm input/output, ta đang áp dụng:", code: "", options: ["Phân rã", "Trừu tượng hóa (Abstraction)", "Đa hình", "Nhận dạng mẫu"], correctAnswer: 1, explanation: "Trừu tượng hóa giúp che giấu sự phức tạp, chỉ hiển thị giao diện cần thiết.", hint: "Nhìn bề ngoài thay vì soi chi tiết." },
  { id: 3, topic: "ND02: AI Prompting", difficulty: "Dễ", question: "Kỹ thuật 'Role Prompting' khi dùng ChatGPT có tác dụng gì?", code: "", options: ["Giảm độ dài câu trả lời", "Bắt AI đóng vai chuyên gia để trả lời chuẩn bối cảnh", "Tạo ra vòng lặp vô hạn", "Bắt AI viết mã nguồn C++"], correctAnswer: 1, explanation: "Gán vai trò (Role) giúp mô hình AI định hình được văn phong và kiến thức chuyên môn cần sử dụng.", hint: "Đóng vai (Role-play)." },
  { id: 4, topic: "ND02: AI Hallucination", difficulty: "Dễ", question: "Hiện tượng AI tự tin sinh ra các thông tin hoặc đoạn code sử dụng thư viện KHÔNG TỒN TẠI gọi là gì?", code: "", options: ["Overfitting", "Ảo giác (Hallucination)", "Underfitting", "Prompt Injection"], correctAnswer: 1, explanation: "Ảo giác xảy ra khi LLM dự đoán từ tiếp theo sai lệch với thực tế nhưng ngữ pháp vẫn rất hợp lý.", hint: "AI bị 'ảo tưởng'." },
  { id: 5, topic: "ND03: Biểu thức", difficulty: "Dễ", question: "Kết quả của lệnh in sau là gì?", code: "print(5 // 2, 5 % 2)", options: ["2.5 0", "2 1", "2.5 1", "2 0"], correctAnswer: 1, explanation: "Toán tử `//` chia lấy nguyên (2), toán tử `%` chia lấy dư (1).", hint: "// là nguyên, % là dư." },
  { id: 6, topic: "ND03: Định dạng chuỗi", difficulty: "Dễ", question: "f-string sau sẽ in ra chuỗi gì?", code: "pi = 3.1415\nprint(f'{pi:.2f}')", options: ["3.1", "3.14", "3.15", "3.1415"], correctAnswer: 1, explanation: "`.2f` yêu cầu làm tròn đến 2 chữ số phần thập phân.", hint: "Làm tròn 2 số cuối." },
  { id: 7, topic: "ND04: Logic", difficulty: "Dễ", question: "Kết quả của biểu thức boolean này là gì?", code: "print(not (True and False))", options: ["True", "False", "None", "Error"], correctAnswer: 0, explanation: "`True and False` là False. `not False` là True.", hint: "Tính trong ngoặc trước." },
  { id: 8, topic: "ND04: Truthy/Falsy", difficulty: "Dễ", question: "Đoạn code sau in ra gì?", code: "if [0]:\n    print('A')\nelse:\n    print('B')", options: ["A", "B", "0", "Error"], correctAnswer: 0, explanation: "Một List có chứa phần tử (số 0) không phải là mảng rỗng, nên nó mang giá trị Truthy (True). In 'A'.", hint: "Hộp chứa đồ (dù là số 0) vẫn là hộp có đồ." },
  { id: 9, topic: "ND05: Vòng lặp For", difficulty: "Dễ", question: "Dãy số sinh ra từ hàm `range` này là gì?", code: "list(range(1, 4))", options: ["1, 2, 3, 4", "0, 1, 2, 3", "1, 2, 3", "2, 3, 4"], correctAnswer: 2, explanation: "Hàm range(start, stop) dừng lại ngay TRƯỚC giá trị stop. Dãy là 1, 2, 3.", hint: "Chạm cận trên là dừng." },
  { id: 10, topic: "ND05: Break", difficulty: "Dễ", question: "Lệnh `break` trong vòng lặp có tác dụng gì?", code: "", options: ["Bỏ qua bước lặp hiện tại", "Thoát khỏi vòng lặp ngay lập tức", "Dừng toàn bộ chương trình", "Không làm gì"], correctAnswer: 1, explanation: "`break` phá vỡ và thoát hẳn ra khỏi vòng lặp chứa nó.", hint: "Đập vỡ vòng lặp." },
  { id: 11, topic: "ND06: Args", difficulty: "Dễ", question: "Tham số `**kwargs` đóng gói các đối số thành kiểu dữ liệu nào?", code: "def func(**kwargs): pass", options: ["List", "Tuple", "Dict", "Set"], correctAnswer: 2, explanation: "`**kwargs` gom các đối số truyền theo dạng keyword (key=value) vào một Dictionary.", hint: "Cấu trúc có Khóa và Giá trị." },
  { id: 12, topic: "ND06: Scope", difficulty: "Dễ", question: "Hàm sau in ra gì?", code: "x = 10\ndef show():\n    print(x)\nshow()", options: ["10", "None", "Error", "0"], correctAnswer: 0, explanation: "Hàm có thể tự do truy cập (đọc) biến toàn cục `x` ở scope bên ngoài.", hint: "Chỉ đọc thì không cần khai báo global." },
  { id: 13, topic: "ND07: List vs Tuple", difficulty: "Dễ", question: "Khác biệt cốt lõi nhất giữa List và Tuple là gì?", code: "", options: ["List dùng (), Tuple dùng []", "List chứa được số, Tuple chứa chuỗi", "List là khả biến (Mutable), Tuple là bất biến (Immutable)", "List nhanh hơn Tuple"], correctAnswer: 2, explanation: "Tuple một khi tạo ra sẽ không thể thay đổi giá trị (thêm, sửa, xóa).", hint: "Sự thay đổi." },
  { id: 14, topic: "ND07: Set", difficulty: "Dễ", question: "Hàm `len()` trả về bao nhiêu?", code: "s = {1, 2, 2, 3}\nprint(len(s))", options: ["4", "3", "2", "1"], correctAnswer: 1, explanation: "Set tự động loại bỏ các phần tử trùng lặp. Tập chỉ còn {1, 2, 3}.", hint: "Set lưu các phần tử duy nhất." },
  { id: 15, topic: "ND08: Bubble Sort", difficulty: "Dễ", question: "Thuật toán sắp xếp nào hoạt động bằng cách liên tục hoán đổi 2 phần tử kề nhau nếu chúng ngược thứ tự?", code: "", options: ["Merge Sort", "Insertion Sort", "Bubble Sort", "Quick Sort"], correctAnswer: 2, explanation: "Bubble Sort so sánh cặp phần tử kề nhau và swap liên tục để phần tử lớn 'nổi' lên cuối mảng.", hint: "Nổi bọt." },
  { id: 16, topic: "ND08: Big O", difficulty: "Dễ", question: "Độ phức tạp thời gian của vòng lặp duyệt qua mảng N phần tử là bao nhiêu?", code: "for x in arr:\n    print(x)", options: ["O(1)", "O(log N)", "O(N)", "O(N^2)"], correctAnswer: 2, explanation: "Duyệt qua N phần tử mất N bước, tỷ lệ thuận tuyến tính O(N).", hint: "Tuyến tính." },
  { id: 17, topic: "ND09: OOP Init", difficulty: "Dễ", question: "Phương thức `__init__` dùng để làm gì?", code: "", options: ["Hủy đối tượng", "Khởi tạo đối tượng (Constructor)", "In đối tượng", "Đếm số lượng đối tượng"], correctAnswer: 1, explanation: "`__init__` tự động chạy khi tạo một instance mới để gán trạng thái ban đầu.", hint: "Initialize." },
  { id: 18, topic: "ND10: Đệ quy", difficulty: "Dễ", question: "Thành phần bắt buộc phải có để hàm đệ quy không bị lặp vô hạn là gì?", code: "", options: ["Vòng lặp while", "Lệnh print", "Điều kiện dừng (Base case)", "Biến đếm toàn cục"], correctAnswer: 2, explanation: "Base case giúp hàm biết điểm dừng để thu hồi call stack.", hint: "Điểm chốt chặn." },
  { id: 19, topic: "ND11: Exceptions", difficulty: "Dễ", question: "Lỗi `SyntaxError` xảy ra ở giai đoạn nào?", code: "", options: ["Khi chương trình đang chạy (Runtime)", "Khi phân tích cú pháp (Parsing) trước khi chạy", "Khi RAM đầy", "Khi tắt chương trình"], correctAnswer: 1, explanation: "SyntaxError báo lỗi cấu trúc ngữ pháp ngay từ lúc biên dịch/phân tích, chương trình chưa kịp chạy.", hint: "Sai ngữ pháp thì không dịch được." },
  { id: 20, topic: "ND12: File IO", difficulty: "Dễ", question: "Mode `'r'` trong hàm open() dùng để làm gì?", code: "open('file.txt', 'r')", options: ["Ghi file", "Đọc file", "Xóa file", "Thêm vào cuối file"], correctAnswer: 1, explanation: "Chế độ 'r' (Read) chỉ cấp quyền đọc nội dung file.", hint: "Read." },
  { id: 21, topic: "ND03: Toán tử", difficulty: "Trung bình", question: "Kết quả của biểu thức sau là?", code: "print(2 * 3 ** 2)", options: ["36", "18", "64", "12"], correctAnswer: 1, explanation: "Lũy thừa `**` ưu tiên cao hơn nhân `*`. Tính 3**2 = 9. Sau đó 2 * 9 = 18.", hint: "Mũ trước, nhân sau." },
  { id: 22, topic: "ND03: Slicing", difficulty: "Trung bình", question: "Đoạn code in ra chuỗi gì?", code: "s = 'PYTHON'\nprint(s[::-1])", options: ["NOHTYP", "PYTHON", "P", "N"], correctAnswer: 0, explanation: "Cắt lát với bước nhảy -1 `[::-1]` sẽ đảo ngược toàn bộ chuỗi.", hint: "Đi lùi từ cuối lên đầu." },
  { id: 23, topic: "ND04: Short-circuit", difficulty: "Trung bình", question: "Màn hình in ra chữ gì?", code: "def f():\n    print('Run')\n    return True\n\nx = True or f()", options: ["Run", "True", "Không in gì", "Error"], correctAnswer: 2, explanation: "Toán tử `or` thấy vế trái là True nên nó ngắt mạch luôn, không gọi hàm `f()`. Do x chỉ lưu kết quả chứ không print, màn hình trống trơn.", hint: "Or chỉ cần 1 vế True là đủ." },
  { id: 24, topic: "ND04: Chain Comparison", difficulty: "Trung bình", question: "Biểu thức này in ra gì?", code: "x = 5\nprint(1 < x <= 5)", options: ["False", "True", "Error", "5"], correctAnswer: 1, explanation: "Python tách thành `(1 < x) and (x <= 5)`. Cả 2 đều True.", hint: "Viết sao hiểu vậy." },
  { id: 25, topic: "ND05: for-else", difficulty: "Trung bình", question: "Vòng lặp này in ra gì?", code: "for i in range(2):\n    pass\nelse:\n    print('Done')", options: ["Done", "Không in gì", "Done Done", "Error"], correctAnswer: 0, explanation: "Khối `else` chạy khi vòng lặp kết thúc bình thường (không bị break). Do chỉ có `pass`, vòng lặp chạy trọn vẹn và in 'Done'.", hint: "Else = No break." },
  { id: 26, topic: "ND05: Continue", difficulty: "Trung bình", question: "Giá trị của biến count là?", code: "count = 0\nfor i in range(3):\n    continue\n    count += 1\nprint(count)", options: ["3", "1", "0", "Error"], correctAnswer: 2, explanation: "Lệnh `continue` bỏ qua mọi lệnh bên dưới nó. `count += 1` không bao giờ chạy.", hint: "Bỏ qua vòng hiện tại." },
  { id: 27, topic: "ND06: Nonlocal", difficulty: "Trung bình", question: "In ra giá trị nào?", code: "def outer():\n    x = 1\n    def inner():\n        nonlocal x\n        x = 2\n    inner()\n    print(x)\nouter()", options: ["1", "2", "Error", "None"], correctAnswer: 1, explanation: "`nonlocal` cho phép `inner` sửa đổi trực tiếp biến `x` của hàm cha `outer`. Kết quả là 2.", hint: "Sửa tài sản của cha." },
  { id: 28, topic: "ND06: Unpack", difficulty: "Trung bình", question: "Toán tử `**` ở đây làm gì?", code: "def f(a, b):\n    print(a+b)\nd = {'a': 1, 'b': 2}\nf(**d)", options: ["Lỗi", "In ra 3", "In ra dict", "In ra 12"], correctAnswer: 1, explanation: "`**d` giải nén Dictionary thành các keyword arguments `a=1, b=2` đưa vào hàm.", hint: "Mở hộp." },
  { id: 29, topic: "ND07: Set Union", difficulty: "Trung bình", question: "Toán tử `|` làm gì?", code: "print({1, 2} | {2, 3})", options: ["{2}", "{1, 2, 3}", "{1, 3}", "Error"], correctAnswer: 1, explanation: "Toán tử `|` là phép HỢP (Union), gộp các phần tử của 2 Set lại.", hint: "Gộp chung." },
  { id: 30, topic: "ND07: Zip", difficulty: "Trung bình", question: "Độ dài của list kết quả là?", code: "l1 = [1, 2, 3]\nl2 = ['a', 'b']\nprint(len(list(zip(l1, l2))))", options: ["2", "3", "5", "1"], correctAnswer: 0, explanation: "Hàm `zip` sẽ cắt phần thừa của mảng dài hơn, dừng lại theo độ dài của mảng NGẮN NHẤT (là 2).", hint: "Ghép đôi, ai ế thì bỏ." },
  { id: 31, topic: "ND08: Binary Search", difficulty: "Trung bình", question: "Độ phức tạp tệ nhất của Tìm kiếm Nhị phân là?", code: "", options: ["O(N)", "O(N^2)", "O(log N)", "O(1)"], correctAnswer: 2, explanation: "Do mỗi bước chia đôi mảng, số bước tối đa là log cơ số 2 của N.", hint: "Cắt đôi liên tục." },
  { id: 32, topic: "ND08: Merge Sort", difficulty: "Trung bình", question: "Khi trộn `[2, 5]` và `[1, 4]`, số nào vào trước?", code: "", options: ["2", "5", "1", "4"], correctAnswer: 2, explanation: "Merge so sánh phần tử đầu của 2 mảng. 1 nhỏ hơn 2 nên số 1 được đẩy vào mảng kết quả trước tiên.", hint: "So sánh 2 giá trị đang đứng đầu hàng." },
  { id: 33, topic: "ND09: Super", difficulty: "Trung bình", question: "Lệnh nào gọi phương thức `__init__` của lớp cha?", code: "", options: ["super().__init__()", "self.super()", "parent.__init__()", "this()"], correctAnswer: 0, explanation: "`super()` trả về đại diện của lớp cha, chuẩn mực để gọi method bị ghi đè.", hint: "Siêu lớp." },
  { id: 34, topic: "ND09: Class Var", difficulty: "Trung bình", question: "Code in ra gì?", code: "class A:\n    val = 1\nobj = A()\nobj.val = 2\nprint(A.val)", options: ["1", "2", "Error", "None"], correctAnswer: 0, explanation: "Gán `obj.val = 2` tạo một biến thực thể (instance) che khuất biến lớp. Biến lớp gốc `A.val` vẫn là 1.", hint: "Tài sản riêng không ảnh hưởng tài sản chung." },
  { id: 35, topic: "ND10: Trace Đệ quy", difficulty: "Trung bình", question: "Hàm trả về giá trị nào?", code: "def f(n):\n    if n==0: return 0\n    return n + f(n-1)\nprint(f(3))", options: ["3", "6", "9", "0"], correctAnswer: 1, explanation: "f(3) = 3+f(2) = 3+2+f(1) = 3+2+1+f(0) = 6.", hint: "Tính tổng từ 1 đến 3." },
  { id: 36, topic: "ND10: String Recursion", difficulty: "Trung bình", question: "Hàm này làm gì?", code: "def r(s):\n    if len(s)<=1: return s\n    return r(s[1:]) + s[0]", options: ["Xóa chuỗi", "Đảo ngược chuỗi", "Lấy chữ cái đầu", "Lỗi"], correctAnswer: 1, explanation: "Đệ quy cắt lấy phần đuôi rồi đẩy chữ cái đầu ra sau cùng, kết quả là đảo ngược chuỗi.", hint: "Kéo đầu xuống đuôi." },
  { id: 37, topic: "ND11: Exceptions", difficulty: "Trung bình", question: "Bẫy logic nào đang xảy ra?", code: "try:\n    1/0\nexcept Exception:\n    print('A')\nexcept ZeroDivisionError:\n    print('B')", options: ["In 'B'", "Lỗi Syntax", "In 'A'", "In cả 2"], correctAnswer: 2, explanation: "Lớp cha `Exception` hứng mọi lỗi. Nó chặn đứng trên cùng nên lớp con `ZeroDivisionError` ở dưới không bao giờ được chạy (dead code).", hint: "Lưới to hứng trước lưới nhỏ." },
  { id: 38, topic: "ND12: readlines", difficulty: "Trung bình", question: "Hàm `readlines()` trả về cấu trúc gì?", code: "f.readlines()", options: ["String", "List các dòng", "Tuple", "Dict"], correctAnswer: 1, explanation: "Hàm có chữ 's' (lines) sẽ đọc toàn bộ file và cắt mỗi dòng thành 1 phần tử trong List.", hint: "Danh sách các dòng." },
  { id: 39, topic: "Nâng cao: K-Means", difficulty: "Trung bình", question: "Thuật toán K-Means cập nhật (Update) tâm cụm bằng cách nào?", code: "", options: ["Tính khoảng cách Euclid", "Lấy trung bình tọa độ các điểm trong cụm", "Gán ngẫu nhiên", "Dùng Gradient Descent"], correctAnswer: 1, explanation: "Vị trí tâm cụm mới được cập nhật bằng cách tính giá trị trung bình (mean) của toàn bộ điểm dữ liệu đã gán vào cụm đó.", hint: "Tính trung bình (Mean)." },
  { id: 40, topic: "Nâng cao: deque", difficulty: "Trung bình", question: "Lợi ích của lệnh `d.popleft()` trên cấu trúc deque là gì?", code: "", options: ["Nó tự sắp xếp mảng", "Nó lấy phần tử đầu mảng với độ phức tạp siêu nhanh O(1)", "Nó chạy O(N)", "Nó xóa mọi phần tử"], correctAnswer: 1, explanation: "Deque là danh sách liên kết đôi, thao tác rút/thêm ở hai đầu mảng đều là O(1), khác với List pop(0) là O(N).", hint: "Nhanh ở cả 2 đầu." },
  { id: 41, topic: "ND03: Memory Identity", difficulty: "Khó", question: "Kết quả in ra là gì?", code: "a = 256\nb = 256\nprint(a is b, [] is [])", options: ["True False", "True True", "False False", "False True"], correctAnswer: 0, explanation: "CPython cache số nguyên nhỏ [-5, 256] nên a và b trỏ cùng địa chỉ (True). Nhưng List là kiểu khả biến (mutable), mỗi cặp `[]` cấp phát một vùng nhớ hoàn toàn mới (False).", hint: "Số nhỏ dùng chung, mảng mới thì cấp riêng." },
  { id: 42, topic: "ND04: Boolean Chain Trap", difficulty: "Khó", question: "Cạm bẫy chain logic này in ra gì?", code: "print(False == False in [False])", options: ["True", "False", "Error", "None"], correctAnswer: 0, explanation: "Chuỗi so sánh ngầm dịch thành `(False == False) and (False in [False])`. Vế trái True, vế phải True. Kết quả True.", hint: "Giống như 1 < x < 5." },
  { id: 43, topic: "ND05: Xóa phần tử khi lặp", difficulty: "Khó", question: "Mảng sau khi chạy vòng lặp còn lại gì?", code: "l = [1, 2, 3]\nfor x in l:\n    l.remove(x)\nprint(l)", options: ["[]", "[2]", "[1, 3]", "Error"], correctAnswer: 1, explanation: "Khi vòng lặp xóa số 1 (index 0), mảng co lại `[2, 3]`. Vòng lặp tiến lên index 1 (lúc này là số 3, số 2 bị nhảy cóc). Xóa số 3. Mảng còn `[2]`.", hint: "Dịch chuyển chỉ mục làm vòng lặp nhảy cóc." },
  { id: 44, topic: "ND06: UnboundLocalError", difficulty: "Khó", question: "Tại sao lệnh `cnt += 1` gây lỗi?", code: "cnt = 10\ndef run():\n    cnt += 1\nrun()", options: ["cnt không phải là số", "cnt += 1 là lệnh gán, khiến Python coi cnt là biến cục bộ nhưng chưa được khởi tạo.", "Lỗi cú pháp", "Không có lỗi"], correctAnswer: 1, explanation: "Bất kỳ lệnh gán nào (+=, =) cũng tự động ép biến đó thành Local variable của hàm. Tuy nhiên lúc này Local `cnt` chưa có giá trị để tính `cnt + 1`, dẫn tới UnboundLocalError.", hint: "Lệnh gán khóa chặt biến vào scope Local." },
  { id: 45, topic: "ND06: Mutable Defaults", difficulty: "Khó", question: "Lần gọi hàm thứ hai in ra gì?", code: "def add(x, l=[]):\n    l.append(x)\n    return l\nadd(1)\nprint(add(2))", options: ["[2]", "[1, 2]", "Error", "[]"], correctAnswer: 1, explanation: "Tham số mặc định `l=[]` chỉ khởi tạo MỘT LẦN khi định nghĩa hàm. Mọi lần gọi không truyền `l` đều dùng chung một vùng nhớ List đó. List chứa sẵn số 1, giờ thêm số 2.", hint: "Tham số mặc định List là một cái hố đen chung." },
  { id: 46, topic: "ND07: Tuple In-place Trap", difficulty: "Khó", question: "Chuyện gì xảy ra với lệnh `+=` trên List nằm trong Tuple?", code: "t = ([1], 2)\ntry:\n    t[0] += [2]\nexcept:\n    pass\nprint(t[0])", options: ["[1]", "[1, 2]", "Error", "None"], correctAnswer: 1, explanation: "Toán tử `+=` thực hiện `.extend()` lên list (thành công -> `[1,2]`), sau đó cố GÁN lại vào `t[0]` (thất bại văng Exception vì Tuple bất biến). Dù văng lỗi, List bên trong ĐÃ thực sự bị thay đổi.", hint: "Nửa thành công (biến đổi list), nửa thất bại (gán vào tuple)." },
  { id: 47, topic: "ND09: MRO Đa kế thừa", difficulty: "Khó", question: "Thứ tự tìm kiếm (MRO) của Python đi theo mô hình nào cho cây kế thừa kim cương D(B, C) (B và C cùng kế thừa A)?", code: "", options: ["D -> B -> A -> C", "D -> B -> C -> A", "D -> C -> B -> A", "D -> A -> B -> C"], correctAnswer: 1, explanation: "Thuật toán C3 Linearization ưu tiên độ rộng trước. Nó sẽ duyệt nhánh trái (B), nhánh phải (C) rồi mới đi sâu lên tổ tiên chung (A).", hint: "Duyệt ngang hết các lớp con rồi mới lên lớp cha chung." },
  { id: 48, topic: "ND11: Xóa biến Exception", difficulty: "Khó", question: "Lệnh print cuối cùng gây lỗi NameError ở Python 3 vì sao?", code: "try:\n    1/0\nexcept Exception as e:\n    pass\nprint(e)", options: ["Lệnh pass xóa e", "Python 3 tự động xóa biến 'e' (del e) khi thoát khối except để chống rò rỉ bộ nhớ.", "Không có lỗi", "e là global"], correctAnswer: 1, explanation: "Trong Python 3, biến gán cho Exception (`as e`) bị xóa khỏi scope cục bộ ngay lập tức sau khi kết thúc khối except để dọn dẹp cyclic references.", hint: "Tính năng dọn rác tự động của Python 3." },
  { id: 49, topic: "ND11: Return in Finally", difficulty: "Khó", question: "Hàm trả về giá trị nào?", code: "def test():\n    try:\n        return 1\n    finally:\n        return 2\nprint(test())", options: ["1", "2", "1 và 2", "Error"], correctAnswer: 1, explanation: "Khối `finally` luôn chạy cuối cùng. Lệnh `return 2` bên trong nó sẽ hủy bỏ và GHI ĐÈ bất cứ lệnh `return 1` nào đang chờ thoát ở khối try.", hint: "Finally nắm quyền sinh sát cuối cùng." },
  { id: 50, topic: "Nâng cao: Generator Exhaustion", difficulty: "Khó", question: "Code in ra gì?", code: "g = (x for x in range(3))\nlist(g)\nprint(list(g))", options: ["[0, 1, 2]", "[]", "Error", "None"], correctAnswer: 1, explanation: "Generator là luồng dữ liệu một chiều chạy 1 lần. Lệnh `list(g)` đầu tiên đã hút cạn dữ liệu. Lần gọi thứ 2 generator đã trống rỗng (exhausted), trả về mảng rỗng `[]`.", hint: "Vắt chanh bỏ vỏ, không xài lại được." }
];

const EXAM_SET_02_DATA = [
  { id: 51, topic: "ND01: Tư duy máy tính", difficulty: "Dễ", question: "Khái niệm Trừu tượng hóa (Abstraction) tập trung vào việc gì?", code: "", options: ["Ẩn đi sự phức tạp và chỉ hiển thị tính năng thiết yếu.", "Chia bài toán làm đôi.", "Chuyển mã thành hợp ngữ.", "Tìm kiếm phần tử trong mảng."], correctAnswer: 0, explanation: "Trừu tượng hóa loại bỏ các chi tiết nhiễu, giữ lại các thuộc tính cốt lõi để lập mô hình bài toán.", hint: "Tập trung vào cái cốt lõi." },
  { id: 52, topic: "ND01: Thuật toán", difficulty: "Dễ", question: "Thiết kế thuật toán (Algorithm Design) là bước tạo ra cái gì?", code: "", options: ["Giao diện đồ họa.", "Tập hợp các hướng dẫn/bước rõ ràng để giải quyết vấn đề.", "Cơ sở dữ liệu.", "Mạng nơ-ron."], correctAnswer: 1, explanation: "Thuật toán là một chuỗi các chỉ thị logic từng bước để đạt được kết quả.", hint: "Công thức nấu ăn." },
  { id: 53, topic: "ND02: Few-shot Prompting", difficulty: "Dễ", question: "Kỹ thuật 'Few-shot Prompting' là gì?", code: "", options: ["Không cung cấp ví dụ nào.", "Cung cấp vài ví dụ (Input-Output) mẫu để AI học cú pháp trước khi trả lời.", "Yêu cầu AI viết mã ngắn.", "Chửi mắng AI."], correctAnswer: 1, explanation: "Few-shot là mồi vài ví dụ để thiết lập định dạng chuẩn cho LLM.", hint: "Vài ví dụ mồi." },
  { id: 54, topic: "ND02: AI Hallucination", difficulty: "Dễ", question: "Để ép ChatGPT bớt sáng tạo và trả lời chuẩn xác (ít ảo giác), tham số nào thường được tinh chỉnh giảm xuống?", code: "", options: ["Max Tokens", "Top-P", "Temperature (Nhiệt độ)", "Frequency Penalty"], correctAnswer: 2, explanation: "Temperature quyết định độ ngẫu nhiên. Nhiệt độ càng thấp, AI càng trả lời cứng nhắc và bám sát sự thật.", hint: "Nhiệt độ." },
  { id: 55, topic: "ND03: Toán tử", difficulty: "Dễ", question: "Phép tính `10 % -3` trong Python trả về bao nhiêu?", code: "", options: ["1", "-2", "-1", "2"], correctAnswer: 1, explanation: "Python tính `10 // -3 = -4`. Vậy phần dư là `10 - (-3 * -4) = 10 - 12 = -2`.", hint: "Dấu của phép Modulo trong Python phụ thuộc vào mẫu số." },
  { id: 56, topic: "ND03: Định dạng", difficulty: "Dễ", question: "Chuỗi in ra là gì?", code: "print(f'{5:03d}')", options: ["5.000", "005", "500", "  5"], correctAnswer: 1, explanation: "Định dạng `03d` yêu cầu số nguyên (d) chiếm 3 khoảng trống, lấp đầy bằng số 0 ở trước.", hint: "Padding số 0." },
  { id: 57, topic: "ND04: Boolean", difficulty: "Dễ", question: "Kết quả của `True and False or True` là?", code: "", options: ["True", "False", "Error", "None"], correctAnswer: 0, explanation: "`and` ưu tiên cao hơn `or`. `(True and False)` là False. `False or True` là True.", hint: "And tính trước, Or tính sau." },
  { id: 58, topic: "ND04: Falsy", difficulty: "Dễ", question: "Câu lệnh if này in ra gì?", code: "if \"\":\n    print(1)\nelse:\n    print(0)", options: ["1", "0", "Error", "None"], correctAnswer: 1, explanation: "Chuỗi rỗng `\"\"` được đánh giá là False (Falsy). Nhảy vào nhánh else in ra 0.", hint: "Rỗng là Sai." },
  { id: 59, topic: "ND05: Vòng lặp For", difficulty: "Dễ", question: "Tổng các số sinh ra bởi `range(3)` là bao nhiêu?", code: "print(sum(range(3)))", options: ["3", "6", "4", "5"], correctAnswer: 0, explanation: "`range(3)` sinh ra 0, 1, 2. Tổng là 3.", hint: "Cộng dồn các số." },
  { id: 60, topic: "ND05: Câu lệnh pass", difficulty: "Dễ", question: "Lệnh `pass` khác `continue` ở điểm nào?", code: "", options: ["Không khác gì.", "pass là lệnh rỗng giữ chỗ, vòng lặp vẫn chạy tiếp các lệnh dưới nó. continue bỏ qua các lệnh dưới nó.", "pass thoát khỏi vòng lặp.", "pass gây lỗi."], correctAnswer: 1, explanation: "`pass` chỉ lấp chỗ trống cú pháp, trình thông dịch coi như không có gì và chạy thẳng xuống lệnh tiếp theo.", hint: "Pass là tàng hình." },
  { id: 61, topic: "ND06: Args", difficulty: "Dễ", question: "Kiểu dữ liệu của `*args` là gì?", code: "def f(*args):\n    print(type(args))", options: ["list", "tuple", "dict", "set"], correctAnswer: 1, explanation: "`*args` đóng gói tất cả positional arguments thành một Tuple bất biến.", hint: "Tuple." },
  { id: 62, topic: "ND06: Scope", difficulty: "Dễ", question: "Code chạy có lỗi không?", code: "x = 1\ndef f():\n    print(x + 1)\nf()", options: ["Lỗi, vì chưa khai global", "Không lỗi, in ra 2", "In ra 1", "Lỗi NameError"], correctAnswer: 1, explanation: "Chỉ đọc và tính toán (không gán giá trị lại cho x) thì không cần khai báo `global`.", hint: "Chỉ nhìn chứ không chạm." },
  { id: 63, topic: "ND07: Append vs Extend", difficulty: "Dễ", question: "Độ dài mảng sau khi append là bao nhiêu?", code: "l = [1, 2]\nl.append([3, 4])\nprint(len(l))", options: ["4", "3", "2", "Error"], correctAnswer: 1, explanation: "`append` đẩy NGGUYÊN CỤC mảng `[3, 4]` vào làm 1 phần tử duy nhất. Độ dài mảng tăng từ 2 lên 3.", hint: "Nhét nguyên hộp vào mảng." },
  { id: 64, topic: "ND07: Dict get", difficulty: "Dễ", question: "Lệnh `get` này trả về gì?", code: "d = {'a': 1}\nprint(d.get('b', 99))", options: ["Error", "None", "1", "99"], correctAnswer: 3, explanation: "Nếu key không tồn tại, `.get()` trả về giá trị mặc định được cung cấp (99).", hint: "Giá trị dự phòng." },
  { id: 65, topic: "ND08: Insertion Sort", difficulty: "Dễ", question: "Đặc điểm của Insertion Sort là gì?", code: "", options: ["Chia đôi mảng", "Tìm min nhét vào đầu", "Lấy từng phần tử chèn vào đúng vị trí của mảng con đã sắp xếp phía trước", "Hoán đổi kề nhau"], correctAnswer: 2, explanation: "Thuật toán chèn lấy từng thẻ bài và lùi dần để chèn (insert) vào dãy đã xếp trên tay.", hint: "Xếp bài tú lơ khơ." },
  { id: 66, topic: "ND08: Big O", difficulty: "Dễ", question: "Hai vòng lặp lồng nhau duyệt mảng N phần tử có độ phức tạp là?", code: "for i in range(N):\n    for j in range(N):\n        pass", options: ["O(N)", "O(log N)", "O(N^2)", "O(1)"], correctAnswer: 2, explanation: "Lặp N lần, mỗi lần lặp lại N bước con => N * N = O(N^2).", hint: "Nhân lên." },
  { id: 67, topic: "ND09: Kế thừa", difficulty: "Dễ", question: "Kế thừa OOP thể hiện mối quan hệ gì?", code: "", options: ["Has-a (Chứa một)", "Is-a (Là một)", "Uses-a (Dùng một)", "Creates (Tạo ra)"], correctAnswer: 1, explanation: "Kế thừa là quan hệ Is-a (VD: Chó *là một* Động vật).", hint: "Is-a." },
  { id: 68, topic: "ND10: Memoization", difficulty: "Dễ", question: "Khái niệm Memoization trong Quy hoạch động có nghĩa là?", code: "", options: ["Tối ưu bộ nhớ RAM", "Xóa bộ nhớ", "Ghi nhớ (Lưu lại) kết quả bài toán con để không tính lại", "Đếm số lần chạy hàm"], correctAnswer: 2, explanation: "Memoization dùng Dictionary/Array để cache lại kết quả các nhánh đệ quy trùng lặp.", hint: "Memo = Ghi nhớ." },
  { id: 69, topic: "ND11: Finally", difficulty: "Dễ", question: "Khối `finally` hoạt động khi nào?", code: "", options: ["Chỉ khi có lỗi", "Chỉ khi không có lỗi", "Luôn luôn thực thi bất chấp lỗi hay không", "Khi gọi hàm hệ thống"], correctAnswer: 2, explanation: "Khối finally là khu vực dọn dẹp, được thiết kế để luôn chạy sau khối try/except.", hint: "Bất khả xâm phạm." },
  { id: 70, topic: "ND12: File Write", difficulty: "Dễ", question: "Chế độ `'w'` làm gì nếu file đã tồn tại?", code: "", options: ["Ghi nối vào cuối", "Báo lỗi", "Xóa trắng file cũ và ghi đè", "Mở file đọc"], correctAnswer: 2, explanation: "Chế độ Write mang tính phá hủy, nó truncate file về 0 bytes trước khi ghi.", hint: "Xóa sạch làm lại." },
  { id: 71, topic: "ND03: Nhân chuỗi", difficulty: "Trung bình", question: "Code in ra gì?", code: "print('A' * 3)", options: ["A3", "Error", "AAA", "3A"], correctAnswer: 2, explanation: "Toán tử nhân `*` trên chuỗi sẽ lặp lại chuỗi đó N lần.", hint: "Nhân bản." },
  { id: 72, topic: "ND03: Slicing mảng", difficulty: "Trung bình", question: "Mảng mới tạo thành là gì?", code: "l = [0, 1, 2, 3, 4]\nprint(l[1:4])", options: ["[1, 2, 3]", "[1, 2, 3, 4]", "[0, 1, 2]", "[2, 3, 4]"], correctAnswer: 0, explanation: "Cắt từ index 1 đến cận index 4 (tức là 1, 2, 3).", hint: "Lấy cận dưới, bỏ cận trên." },
  { id: 73, topic: "ND04: Toán tử 3 ngôi", difficulty: "Trung bình", question: "Giá trị của x là bao nhiêu?", code: "a = 10\nx = 1 if a < 5 else 2", options: ["10", "1", "2", "Error"], correctAnswer: 2, explanation: "Cú pháp `Value_If_True if Condition else Value_If_False`. Do 10 < 5 sai, trả về 2.", hint: "Ternary operator." },
  { id: 74, topic: "ND04: Hàm all()", difficulty: "Trung bình", question: "Hàm `all()` trả về gì?", code: "print(all([True, 1, 'a']))", options: ["False", "True", "Error", "None"], correctAnswer: 1, explanation: "`all()` trả về True nếu TẤT CẢ phần tử trong iterable đều là Truthy. True, 1, 'a' đều Truthy.", hint: "Tất cả đều phải đúng." },
  { id: 75, topic: "ND05: Nested Break", difficulty: "Trung bình", question: "Code in ra chữ gì?", code: "for i in range(2):\n    for j in range(2):\n        break\n        print('A')", options: ["AA", "Không in gì", "A", "AAAA"], correctAnswer: 1, explanation: "Lệnh break chém đứt vòng lặp j ngay lập tức. Lệnh print('A') không bao giờ được chạm tới.", hint: "Break chặn mọi thứ bên dưới." },
  { id: 76, topic: "ND05: Cập nhật While", difficulty: "Trung bình", question: "Để tránh lặp vô hạn, ta cần sửa biến nào?", code: "x = 0\nwhile x < 3:\n    print(x)\n    # Thiếu dòng code", options: ["x += 1", "break", "continue", "pass"], correctAnswer: 0, explanation: "Vòng lặp while cần lệnh cập nhật biến đếm (`x += 1`) để tiến dần tới điều kiện dừng.", hint: "Tiến lên." },
  { id: 77, topic: "ND06: Lệnh Global", difficulty: "Trung bình", question: "Biến x toàn cục biến thành bao nhiêu?", code: "x = 0\ndef update():\n    global x\n    x += 5\nupdate()", options: ["0", "5", "Error", "None"], correctAnswer: 1, explanation: "`global x` cấp quyền ghi cho hàm. `x += 5` đổi biến x ngoài cùng thành 5.", hint: "Sửa đồ của nhà nước." },
  { id: 78, topic: "ND06: Args", difficulty: "Trung bình", question: "Hàm `f()` được gọi bằng cú pháp nào là SAI?", code: "def f(a, b=1): pass", options: ["f(10)", "f(10, 20)", "f(a=10)", "f(b=20)"], correctAnswer: 3, explanation: "Tham số `a` là bắt buộc (không có giá trị mặc định). Lệnh `f(b=20)` thiếu giá trị cho `a` nên báo lỗi.", hint: "Bắt buộc phải điểm danh." },
  { id: 79, topic: "ND07: Comprehension if-else", difficulty: "Trung bình", question: "Mảng sinh ra là?", code: "print([x if x > 0 else 0 for x in [-1, 1]])", options: ["[-1, 1]", "[0, 1]", "[0, 0]", "[1, 1]"], correctAnswer: 1, explanation: "Duyệt -1: do -1 < 0, rơi vào else thành 0. Duyệt 1: 1 > 0, giữ nguyên 1. Mảng là [0, 1].", hint: "Thay số âm bằng 0." },
  { id: 80, topic: "ND07: Set Intersection", difficulty: "Trung bình", question: "Lệnh `&` in ra gì?", code: "print({1,2} & {2,3})", options: ["{1,2,3}", "{2}", "{1,3}", "Error"], correctAnswer: 1, explanation: "Toán tử `&` là phép GIAO, lấy các phần tử chung (số 2).", hint: "Giao điểm." },
  { id: 81, topic: "ND08: Binary Search", difficulty: "Trung bình", question: "Tìm số 5 trong `[1,3,5,7]`. Lần lặp đầu tiên, phần tử `mid` là số mấy?", code: "", options: ["1", "5", "3", "7"], correctAnswer: 2, explanation: "Trục index: L=0, R=3. mid = (0+3)//2 = 1. Giá trị ở index 1 là 3.", hint: "Lấy trung bình cộng index." },
  { id: 82, topic: "ND08: Selection Sort", difficulty: "Trung bình", question: "Bước chính của Selection Sort là gì?", code: "", options: ["Tìm phần tử nhỏ nhất và đổi chỗ nó lên vị trí đầu tiên chưa xếp.", "Chia đôi mảng", "Chèn vào mảng đã xếp", "Trộn mảng"], correctAnswer: 0, explanation: "Selection sort (Sắp xếp chọn) 'chọn' phần tử cực trị (min/max) ở mảng chưa xếp và nhét lên đầu.", hint: "Tuyển chọn người giỏi nhất lên đầu." },
  { id: 83, topic: "ND09: Polymorphism", difficulty: "Trung bình", question: "Việc 2 lớp con có cùng 1 tên hàm `speak()` nhưng thực thi khác nhau gọi là tính chất gì?", code: "", options: ["Đóng gói", "Đa hình (Polymorphism)", "Kế thừa", "Trừu tượng"], correctAnswer: 1, explanation: "Đa hình cho phép đối tượng thuộc các lớp khác nhau phản hồi lại cùng một lời gọi hàm theo những cách riêng biệt.", hint: "Nhiều hình thái." },
  { id: 84, topic: "ND09: Abstract Class", difficulty: "Trung bình", question: "Lớp trừu tượng (Abstract class) trong Python thừa kế từ module nào?", code: "", options: ["sys", "abc (ABC, abstractmethod)", "os", "math"], correctAnswer: 1, explanation: "Thư viện `abc` (Abstract Base Classes) dùng để tạo khuôn mẫu bắt buộc lớp con phải ghi đè hàm.", hint: "A-B-C." },
  { id: 85, topic: "ND10: Tabulation", difficulty: "Trung bình", question: "Quy hoạch động dạng Tabulation là phương pháp tiếp cận theo chiều nào?", code: "", options: ["Top-down (Từ trên xuống đệ quy)", "Bottom-up (Từ dưới lên dùng vòng lặp)", "Random", "Chia để trị"], correctAnswer: 1, explanation: "Tabulation giải các bài toán con nhỏ nhất trước (lập bảng array) rồi dùng vòng lặp tính dần lên bài toán lớn.", hint: "Bottom-up." },
  { id: 86, topic: "ND10: Tháp Hà Nội", difficulty: "Trung bình", question: "Độ phức tạp thời gian giải bài toán Tháp Hà Nội bằng đệ quy là?", code: "", options: ["O(N)", "O(N log N)", "O(2^N)", "O(N^2)"], correctAnswer: 2, explanation: "Công thức truy hồi T(N) = 2T(N-1) + 1 sinh ra độ phức tạp hàm mũ O(2^N).", hint: "Hàm mũ gấp đôi mỗi bước." },
  { id: 87, topic: "ND11: try-else", difficulty: "Trung bình", question: "Khối `else` chạy khi nào?", code: "try:\n    x = 1\nexcept:\n    pass\nelse:\n    print('A')", options: ["Luôn chạy", "Chạy khi có lỗi", "Chạy khi khối try KHÔNG tung ra lỗi nào", "Lỗi cú pháp"], correctAnswer: 2, explanation: "Else chạy nếu try kết thúc hoàn hảo, bình yên vô sự.", hint: "Bình yên vô sự." },
  { id: 88, topic: "ND12: seek(0)", difficulty: "Trung bình", question: "Lệnh `f.seek(0)` làm gì?", code: "", options: ["Xóa file", "Chuyển con trỏ về đầu file (byte 0)", "Xóa dòng 0", "Tắt file"], correctAnswer: 1, explanation: "Seek(0) tua lại băng cát sét về điểm xuất phát để đọc lại từ đầu.", hint: "Tua lại (Rewind)." },
  { id: 89, topic: "Nâng cao: Assert", difficulty: "Trung bình", question: "Ngoại lệ nào bị ném ra nếu điều kiện `assert` bị sai?", code: "assert 1 == 2", options: ["ValueError", "SyntaxError", "AssertionError", "TypeError"], correctAnswer: 2, explanation: "Lệnh assert ném ra AssertionError để báo hiệu giả định của lập trình viên đã bị vi phạm.", hint: "Assertion." },
  { id: 90, topic: "Nâng cao: deque", difficulty: "Trung bình", question: "Lệnh `appendleft(1)` thực hiện chèn số 1 vào vị trí nào của Deque?", code: "", options: ["Giữa mảng", "Cuối mảng", "Đầu mảng (Bên trái)", "Thay thế phần tử đầu"], correctAnswer: 2, explanation: "Chèn vào ngay vị trí index 0 với độ phức tạp O(1) mà không cần xê dịch các phần tử khác.", hint: "Left = Trái/Đầu." },
  { id: 91, topic: "ND07: Identity List", difficulty: "Khó", question: "So sánh identity này in ra gì?", code: "a = []\nb = []\nprint(a == b, a is b)", options: ["True True", "False False", "True False", "False True"], correctAnswer: 2, explanation: "`==` so sánh giá trị (đều là rỗng -> True). `is` so sánh địa chỉ bộ nhớ. Python cấp phát vùng nhớ độc lập cho mỗi list rỗng -> False.", hint: "List luôn tạo vùng nhớ mới." },
  { id: 92, topic: "ND04: Chain comparison trap", difficulty: "Khó", question: "In ra giá trị gì?", code: "print(1 < 3 < 2 == False)", options: ["True", "False", "Error", "None"], correctAnswer: 1, explanation: "Dịch thành `(1 < 3) and (3 < 2) and (2 == False)`. Chỗ `(3 < 2)` là False, nên cả biểu thức là False.", hint: "Chuỗi toán tử bẻ gãy bằng các chữ AND." },
  { id: 93, topic: "ND05: Xóa phần tử khi lặp", difficulty: "Khó", question: "Mảng sau khi chạy vòng lặp còn lại gì?", code: "l = [1, 2, 3]\nfor x in l:\n    if x == 1: l.remove(x)\nprint(l)", options: ["[]", "[2, 3]", "[1, 3]", "Error"], correctAnswer: 1, explanation: "Xóa số 1, mảng còn `[2, 3]`. Vòng lặp tiến lên index 1 (là số 3). Số 2 bị nhảy cóc bỏ qua. Do số 3 khác 1 nên không xóa. Kết quả `[2, 3]`.", hint: "Dịch chuyển chỉ mục làm vòng lặp nhảy cóc." },
  { id: 94, topic: "ND06: Nested Global", difficulty: "Khó", question: "Biến x in ra là mấy?", code: "x = 1\ndef f():\n    x = 2\n    def g():\n        global x\n        x = 3\n    g()\nf()\nprint(x)", options: ["1", "2", "3", "Error"], correctAnswer: 2, explanation: "`global x` xuyên thủng mọi hàm cha để trỏ thẳng tới biến `x` ngoài cùng của module. Lệnh `x = 3` đổi biến global thành 3. (Biến x=2 ở `f()` bị phớt lờ).", hint: "Global cắm rễ thẳng ra ngoài module." },
  { id: 95, topic: "ND07: fromkeys trap", difficulty: "Khó", question: "Bẫy tham chiếu dùng chung. d in ra gì?", code: "d = dict.fromkeys(['A', 'B'], [])\nd['A'].append(1)\nprint(d['B'])", options: ["[]", "Error", "[1]", "None"], correctAnswer: 2, explanation: "Hàm `fromkeys` lấy đúng CÙNG MỘT đối tượng List `[]` gắn cho mọi khóa. Sửa list ở khóa 'A' thì khóa 'B' cũng thấy sự thay đổi vì xài chung 1 list.", hint: "Dùng chung đồ đạc." },
  { id: 96, topic: "ND07: copy.deepcopy", difficulty: "Khó", question: "Hàm `deepcopy` bảo vệ mảng gốc như thế nào?", code: "import copy\na = [[1]]\nb = copy.deepcopy(a)\nb[0].append(2)\nprint(a)", options: ["[[1, 2]]", "[[1]]", "Error", "[]"], correctAnswer: 1, explanation: "Deepcopy nhân bản toàn bộ cây tham chiếu, bao gồm cả list con. Sửa `b` hoàn toàn vô hại đối với `a`. `a` vẫn là `[[1]]`.", hint: "Cắt đứt mọi liên hệ máu mủ." },
  { id: 97, topic: "ND09: Super() MRO", difficulty: "Khó", question: "MRO (Thứ tự phân giải) của Python đi theo nguyên tắc nào?", code: "", options: ["Depth-first (Ưu tiên sâu)", "Breadth-first (Ưu tiên rộng) có tinh chỉnh giữ lớp cha chung ở cuối", "Từ phải qua trái", "Random"], correctAnswer: 1, explanation: "Thuật toán C3 Linearization quét theo chiều rộng ngang (trái sang phải) và đảm bảo không duyệt tổ tiên chung cho đến khi duyệt hết tất cả lớp con của nó.", hint: "Giữ trùm cuối ở lại sau cùng." },
  { id: 98, topic: "ND11: Lệnh Raise", difficulty: "Khó", question: "Lệnh `raise` KHÔNG đối số nằm trong khối except làm nhiệm vụ gì?", code: "try:\n    1/0\nexcept:\n    raise", options: ["Gây lỗi Syntax", "Bỏ qua lỗi", "Ném LẠI chính xác exception vừa bắt được lên trên", "Tắt chương trình êm ái"], correctAnswer: 2, explanation: "Dùng `raise` trơ trọi trong khối except sẽ Re-raise (đẩy tiếp) exception đang xử lý lên cho hàm cấp cao hơn bắt.", hint: "Bắt được bóng rồi ném tiếp lên trên." },
  { id: 99, topic: "ND12: Context Manager __exit__", difficulty: "Khó", question: "Làm sao để Context Manager 'nuốt' (swallow) lỗi và không làm văng chương trình?", code: "", options: ["Hàm __enter__ return False", "Hàm __exit__ return True", "Dùng lệnh pass", "Lệnh break"], correctAnswer: 1, explanation: "Theo đặc tả Python, nếu hàm `__exit__` của một Context Manager trả về giá trị `True`, nó báo hiệu rằng Exception sinh ra trong khối `with` ĐÃ ĐƯỢC XỬ LÝ và Python sẽ nuốt lỗi đó.", hint: "True = Đã xử lý xong, cứ đi tiếp." },
  { id: 100, topic: "Nâng cao: Counter", difficulty: "Khó", question: "Module collections.Counter thực hiện việc gì trên đoạn `[1, 1, 2]`?", code: "", options: ["Xóa phần tử", "Lập một Dictionary đếm tần suất xuất hiện: {1: 2, 2: 1}", "Sắp xếp mảng", "Tính tổng"], correctAnswer: 1, explanation: "`Counter` là một class con của Dict, dùng để đếm số lần xuất hiện của các phần tử hashable.", hint: "Đếm số lượng." }
];

const EXAM_SET_03_DATA = [
  { id: 101, topic: "ND01: Phân rã", difficulty: "Dễ", question: "Một ví dụ thực tế của 'Phân rã' trong lập trình là gì?", code: "", options: ["Viết một hàm duy nhất dài 1000 dòng.", "Nhóm các chức năng độc lập thành các hàm `login()`, `view()`, `logout()`.", "Sao chép mã từ Internet.", "Dịch mã sang tiếng Anh."], correctAnswer: 1, explanation: "Phân rã (Decomposition) là hành động chia một vấn đề lớn thành các phần nhỏ hơn, độc lập (như các hàm) để dễ quản lý.", hint: "Chia nhỏ để trị." },
  { id: 102, topic: "ND01: Nhận dạng mẫu", difficulty: "Dễ", question: "Việc sử dụng vòng lặp `for` để duyệt qua từng phần tử của mảng thay vì viết tay từng dòng `arr[0], arr[1]...` là ứng dụng của kỹ năng nào?", code: "", options: ["Nhận dạng mẫu (Pattern Recognition)", "Khử nhiễu", "Quy hoạch động", "Trừu tượng hóa"], correctAnswer: 0, explanation: "Khi nhận thấy sự lặp lại có quy luật (mẫu) của một thao tác, ta dùng vòng lặp để xử lý chung.", hint: "Phát hiện sự lặp lại." },
  { id: 103, topic: "ND02: Persona Prompting", difficulty: "Dễ", question: "Khi viết câu lệnh: 'Đóng vai là một giáo viên tiểu học...', bạn đang khai thác thành phần nào của Prompt?", code: "", options: ["Context (Ngữ cảnh)", "Persona / Role (Vai trò)", "Output Format (Định dạng)", "Constraint (Ràng buộc)"], correctAnswer: 1, explanation: "Gán Role/Persona giúp mô hình AI định hình được giọng văn và đối tượng người nghe phù hợp.", hint: "Nhập vai nhân vật." },
  { id: 104, topic: "ND02: AI Hallucination", difficulty: "Dễ", question: "Đâu là một dấu hiệu điển hình của Hallucination (ảo giác) trong AI?", code: "", options: ["AI in ra kết quả tính toán chính xác.", "AI tự động gọi API của bạn.", "AI trích dẫn một bài báo khoa học trông rất thật nhưng thực tế không hề tồn tại.", "AI từ chối trả lời do quá tải."], correctAnswer: 2, explanation: "Ảo giác là khi AI tạo ra thông tin giả mạo nhưng được trình bày một cách cực kỳ tự tin và logic.", hint: "AI nói dối một cách tự tin." },
  { id: 105, topic: "ND03: Phép chia", difficulty: "Dễ", question: "Lệnh `10 // 4` in ra kết quả gì?", code: "print(10 // 4)", options: ["2.5", "2", "3", "0"], correctAnswer: 1, explanation: "Toán tử `//` là phép chia lấy phần nguyên. 10 chia 4 được 2.5, lấy phần nguyên là 2.", hint: "Chia lấy nguyên (bỏ phần thập phân)." },
  { id: 106, topic: "ND03: String method", difficulty: "Dễ", question: "Hàm nào dùng để chuyển toàn bộ chuỗi sang chữ in hoa?", code: "s = 'python'\n# s = ?", options: ["s.upper()", "s.capitalize()", "s.uppercase()", "s.title()"], correctAnswer: 0, explanation: "Phương thức `.upper()` chuyển tất cả ký tự trong chuỗi thành chữ in hoa.", hint: "Chữ Hoa (Upper)." },
  { id: 107, topic: "ND04: Boolean", difficulty: "Dễ", question: "Biểu thức `not A and not B` tương đương logic với biểu thức nào?", code: "", options: ["not (A and B)", "A or B", "not (A or B)", "A and B"], correctAnswer: 2, explanation: "Theo định lý De Morgan: `not A and not B` == `not (A or B)`.", hint: "Định lý De Morgan." },
  { id: 108, topic: "ND04: Chuỗi Truthy", difficulty: "Dễ", question: "Câu lệnh này in ra gì?", code: "if \"False\":\n    print('Đúng')\nelse:\n    print('Sai')", options: ["Sai", "Đúng", "Lỗi cú pháp", "Không in gì"], correctAnswer: 1, explanation: "Chuỗi `\"False\"` là một chuỗi KHÁC RỖNG, do đó trong Python nó được đánh giá là Truthy (Đúng).", hint: "Chữ gì nằm trong ngoặc kép cũng là chuỗi khác rỗng." },
  { id: 109, topic: "ND05: Vòng lặp For", difficulty: "Dễ", question: "Vòng lặp này sinh ra các số nào?", code: "list(range(0, 5, 2))", options: ["0, 1, 2, 3, 4", "0, 2, 4", "2, 4", "0, 2, 4, 6"], correctAnswer: 1, explanation: "`range(start, stop, step)`. Bắt đầu từ 0, nhảy 2 bước, dừng trước 5. Các số là 0, 2, 4.", hint: "Bước nhảy là 2." },
  { id: 110, topic: "ND05: Break vs Continue", difficulty: "Dễ", question: "Sự khác biệt giữa `break` và `continue`?", code: "", options: ["Giống nhau.", "`break` thoát hẳn vòng lặp, `continue` chỉ thoát bước lặp hiện tại để sang bước mới.", "`continue` thoát hẳn, `break` sang bước mới.", "`break` gây lỗi."], correctAnswer: 1, explanation: "`break` phá vỡ toàn bộ chu trình. `continue` chỉ bỏ qua phần đuôi của chu trình hiện hành.", hint: "Đập vỡ vs Tiếp tục bước sau." },
  { id: 111, topic: "ND06: Hàm Args", difficulty: "Dễ", question: "Khi gọi hàm `f(1, 2, 3)` với `def f(*args):`, `args` sẽ lưu dữ liệu dưới dạng gì?", code: "", options: ["List [1, 2, 3]", "Dictionary {1:2:3}", "Tuple (1, 2, 3)", "String '123'"], correctAnswer: 2, explanation: "`*args` thu thập tất cả tham số vị trí vào một Tuple.", hint: "Tuple bất biến." },
  { id: 112, topic: "ND06: Scope Global Read", difficulty: "Dễ", question: "Hàm này có chạy được không?", code: "y = 5\ndef test():\n    print(y * 2)\ntest()", options: ["Chạy được, in ra 10", "Lỗi vì chưa khai `global y`", "Lỗi UnboundLocal", "In ra 5"], correctAnswer: 0, explanation: "Bên trong hàm có thể tự do ĐỌC các biến toàn cục (global) bên ngoài mà không cần từ khóa `global`.", hint: "Chỉ đọc thì không bị cấm." },
  { id: 113, topic: "ND07: Tuple", difficulty: "Dễ", question: "Tính chất 'Bất biến' (Immutable) của Tuple có nghĩa là gì?", code: "", options: ["Không thể duyệt qua bằng vòng lặp.", "Không thể thay đổi độ dài, thêm, sửa hay xóa phần tử sau khi đã tạo.", "Chỉ lưu được số nguyên.", "Có thể ép kiểu sang List."], correctAnswer: 1, explanation: "Tuple khi sinh ra đã bị khóa chặt nội dung, không hỗ trợ các hàm như `.append()` hay gán `t[0] = 1`.", hint: "Bất biến = Không thay đổi." },
  { id: 114, topic: "ND07: Dict in", difficulty: "Dễ", question: "Toán tử `in` kiểm tra cái gì trên Dictionary?", code: "d = {'a': 1, 'b': 2}\nprint('a' in d)", options: ["Kiểm tra Giá trị (Value)", "Kiểm tra cả Khóa và Giá trị", "Kiểm tra Khóa (Key)", "Báo lỗi"], correctAnswer: 2, explanation: "Trên Dict, toán tử `in` mặc định chỉ tra cứu xem một KHÓA (Key) có tồn tại hay không.", hint: "Dictionary là bảng băm của các Key." },
  { id: 115, topic: "ND08: Selection Sort", difficulty: "Dễ", question: "Thuật toán sắp xếp nào hoạt động bằng cách quét tìm phần tử nhỏ nhất và chèn nó lên đầu mảng?", code: "", options: ["Bubble Sort", "Selection Sort (Sắp xếp chọn)", "Merge Sort", "Quick Sort"], correctAnswer: 1, explanation: "Selection sort duyệt mảng chưa xếp, 'chọn' ra phần tử min/max và đổi chỗ nó lên vị trí đầu tiên chưa xếp.", hint: "Tuyển chọn." },
  { id: 116, topic: "ND08: Big O", difficulty: "Dễ", question: "Độ phức tạp O(1) mang ý nghĩa gì?", code: "", options: ["Thời gian chạy tăng tuyến tính theo dữ liệu.", "Thời gian chạy rất lâu.", "Thời gian chạy là một hằng số, không bị ảnh hưởng bởi kích thước dữ liệu (chạy ngay lập tức).", "Thuật toán chỉ chạy 1 lần."], correctAnswer: 2, explanation: "O(1) đại diện cho thời gian thực thi tức thời (hằng số), ví dụ tra cứu Dictionary bằng Key.", hint: "Không phụ thuộc vào lượng dữ liệu." },
  { id: 117, topic: "ND09: self", difficulty: "Dễ", question: "Từ khóa `self` trong các phương thức của lớp Python đại diện cho điều gì?", code: "def show(self):\n    print(self.name)", options: ["Lớp cha của đối tượng.", "Bản thân đối tượng (instance) đang gọi phương thức đó.", "Một thư viện của Python.", "Biến toàn cục."], correctAnswer: 1, explanation: "`self` là con trỏ tham chiếu đến chính thực thể (instance) đang thi hành mã.", hint: "Self = Bản thân." },
  { id: 118, topic: "ND10: Đệ quy cơ bản", difficulty: "Dễ", question: "Lệnh nào là Base Case (Điều kiện dừng) trong hàm đệ quy giai thừa sau?", code: "def fact(n):\n    if n == 0: return 1\n    return n * fact(n-1)", options: ["def fact(n):", "if n == 0: return 1", "return n * fact(n-1)", "Không có"], correctAnswer: 1, explanation: "Base case là rẽ nhánh `if` giúp hàm không gọi đệ quy tiếp, ở đây là `n == 0`.", hint: "Điểm kết thúc." },
  { id: 119, topic: "ND11: Timing of SyntaxError", difficulty: "Dễ", question: "Lỗi `SyntaxError` (ví dụ quên đóng ngoặc) sẽ bị phát hiện khi nào?", code: "", options: ["Lúc chương trình chạy đến dòng đó.", "After khi chương trình kết thúc.", "Trước khi chương trình chạy, trong lúc phân tích cú pháp (Parsing).", "Không bị phát hiện."], correctAnswer: 2, explanation: "Python phải đọc và hiểu (parse) toàn bộ mã trước khi chạy. Sai ngữ pháp thì không thể bắt đầu chạy.", hint: "Bắt lỗi ngay từ vòng gửi xe." },
  { id: 120, topic: "ND12: File mode 'a'", difficulty: "Dễ", question: "Chế độ `'a'` (Append) của hàm `open()` khác gì với `'w'` (Write)?", code: "", options: ["'a' xóa file, 'w' giữ nguyên.", "'a' ghi nối vào cuối file cũ mà không xóa, 'w' xóa trắng file cũ rồi mới ghi.", "Giống hệt nhau.", "'a' chỉ cho đọc."], correctAnswer: 1, explanation: "Append nghĩa là nối thêm vào đuôi. Write là ghi đè, phá hủy nội dung cũ.", hint: "Append = Nối thêm." },
  { id: 121, topic: "ND03: Precedence", difficulty: "Trung bình", question: "Kết quả in ra là bao nhiêu?", code: "print(2 * 3 ** 2 % 5)", options: ["3", "18", "0", "1"], correctAnswer: 0, explanation: "Thứ tự: Lũy thừa -> Nhân -> Chia lấy dư. `3**2 = 9`. `2 * 9 = 18`. `18 % 5 = 3`.", hint: "Mũ -> Nhân -> Modulo." },
  { id: 122, topic: "ND03: Slicing", difficulty: "Trung bình", question: "Cắt lát mảng này in ra kết quả gì?", code: "l = [10, 20, 30, 40]\nprint(l[1:-1])", options: ["[20, 30]", "[20, 30, 40]", "[10, 20]", "[30]"], correctAnswer: 0, explanation: "`[start:stop]`. start là index 1 (số 20). stop là index -1 (số 40, không lấy số này). Mảng lấy là `[20, 30]`.", hint: "-1 là phần tử cuối cùng (không bao gồm nó)." },
  { id: 123, topic: "ND04: Chain Comparison", difficulty: "Trung bình", question: "Biểu thức này trả về True hay False?", code: "print(5 > 3 > 1)", options: ["True", "False", "Error", "None"], correctAnswer: 0, explanation: "Tách thành `(5 > 3) and (3 > 1)`. Cả hai đều True.", hint: "Logic toán học thông thường." },
  { id: 124, topic: "ND04: Hàm any()", difficulty: "Trung bình", question: "Hàm `any()` trong trường hợp này trả về gì?", code: "print(any([0, False, '']))", options: ["True", "False", "None", "Error"], correctAnswer: 1, explanation: "`any()` trả về True nếu có ÍT NHẤT MỘT phần tử là Truthy. Ở đây `0`, `False`, chuỗi rỗng `''` đều là Falsy. Nên trả về False.", hint: "Tất cả đều sai thì any() cũng bó tay." },
  { id: 125, topic: "ND05: While-else", difficulty: "Trung bình", question: "Dòng chữ nào được in ra?", code: "while False:\n    print('W')\nelse:\n    print('E')", options: ["W", "E", "W E", "Không in gì"], correctAnswer: 1, explanation: "Vòng lặp while không chạy lần nào (kết thúc bình thường, không dính lệnh break). Do đó khối `else` được quyền chạy và in ra 'E'.", hint: "Không bị break thì else sẽ chạy." },
  { id: 126, topic: "ND05: Lặp lồng", difficulty: "Trung bình", question: "Lệnh `print` này chạy tổng cộng bao nhiêu lần?", code: "count = 0\nfor i in range(2):\n    for j in range(3):\n        count += 1\nprint(count)", options: ["5", "6", "2", "3"], correctAnswer: 1, explanation: "Vòng lặp ngoài chạy 2 lần. Mỗi lần đó, vòng lặp trong chạy 3 lần. Tổng cộng 2 * 3 = 6 lần.", hint: "Nhân số lần lặp với nhau." },
  { id: 127, topic: "ND06: Args len", difficulty: "Trung bình", question: "Code in ra gì?", code: "def f(*a, **k): pass\n# Trả về len", options: ["2 1", "3 0", "1 2", "Error"], correctAnswer: 0, explanation: "Positional args: `1, 2` gói vào tuple `a` (dài 2). Keyword arg: `x=3` gói vào dict `k` (dài 1).", hint: "a lấy biến không tên, k lấy biến có tên." },
  { id: 128, topic: "ND06: Từ khóa Nonlocal", difficulty: "Trung bình", question: "Biến x in ra là mấy?", code: "def outer():\n    x = 1\n    def inner():\n        nonlocal x\n        x = 2\n    inner()\n    print(x)\nouter()", options: ["1", "2", "None", "Error"], correctAnswer: 1, explanation: "Từ khóa `nonlocal x` cấp quyền cho hàm con `inner` ghi đè biến `x` của hàm cha. Hàm cha in ra x đã bị đổi thành 2.", hint: "Sửa biến của cha." },
  { id: 129, topic: "ND07: List Comprehension", difficulty: "Trung bình", question: "Mảng mới sinh ra là?", code: "print([x for x in [1, 2, 3] if x > 1])", options: ["[1, 2, 3]", "[2, 3]", "[1]", "[]"], correctAnswer: 1, explanation: "Vòng lặp duyệt 1, 2, 3. Bộ lọc `if x > 1` giữ lại 2, 3.", hint: "Lọc các số lớn hơn 1." },
  { id: 130, topic: "ND07: Set Symmetric Difference", difficulty: "Trung bình", question: "Toán tử `^` trên Set in ra gì?", code: "print({1, 2} ^ {2, 3})", options: ["{1, 3}", "{2}", "{1, 2, 3}", "Error"], correctAnswer: 0, explanation: "Toán tử `^` là phép HIỆU ĐỐI XỨNG (Symmetric Difference), lấy các phần tử chỉ xuất hiện ở 1 trong 2 tập hợp (loại bỏ phần chung 2).", hint: "Lấy phần riêng, bỏ phần chung." },
  { id: 131, topic: "ND08: Trace Binary Search", difficulty: "Trung bình", question: "Trong mảng `[2, 4, 6, 8, 10]`, tìm số `6` bằng Tìm kiếm nhị phân. `mid` đầu tiên là số mấy?", code: "", options: ["4", "8", "6", "2"], correctAnswer: 2, explanation: "Trục index: left=0, right=4. mid = (0+4)//2 = 2. Mảng có index 2 là giá trị 6. Tình cờ trùng luôn đáp án ở bước đầu.", hint: "Chính giữa mảng." },
  { id: 132, topic: "ND08: Bubble Sort swaps", difficulty: "Trung bình", question: "Bubble sort sẽ tốn bao nhiêu lượt Swap (hoán đổi) để xếp mảng `[3, 2, 1]` thành tăng dần?", code: "", options: ["1", "2", "3", "0"], correctAnswer: 2, explanation: "Bước 1: 3>2 -> swap(3,2) -> [2,3,1]. Bước 2: 3>1 -> swap(3,1) -> [2,1,3]. Bước 3 (vòng mới): 2>1 -> swap(2,1) -> [1,2,3]. Tổng 3 swap.", hint: "Trace từng cặp một." },
  { id: 133, topic: "ND09: OOP Ghi đè __str__", difficulty: "Trung bình", question: "Phương thức magic nào được ghi đè để thay đổi chuỗi in ra khi gọi `print(obj)`?", code: "", options: ["__init__", "__str__", "__call__", "__print__"], correctAnswer: 1, explanation: "Phương thức `__str__` xác định cách một object được biểu diễn dưới dạng chuỗi thân thiện với con người khi gọi `print()`.", hint: "Str = String." },
  { id: 134, topic: "ND09: Abstract Class", difficulty: "Trung bình", question: "Điều gì xảy ra nếu cố khởi tạo (instantiate) một Lớp Trừu tượng (Abstract Class) có chứa abstractmethod?", code: "", options: ["Tạo thành công", "Báo lỗi TypeError", "Nó tự sinh ra lớp con", "Nó trả về None"], correctAnswer: 1, explanation: "Python cấm khởi tạo một Lớp trừu tượng. Lớp này chỉ đóng vai trò làm bản thiết kế (blueprint) để các lớp con kế thừa.", hint: "Bản vẽ thì không thể lái được như xe thật." },
  { id: 135, topic: "ND10: Tabulation", difficulty: "Trung bình", question: "Kỹ thuật Tabulation trong Quy hoạch động là tiếp cận theo chiều nào?", code: "", options: ["Top-down", "Bottom-up", "Random", "Recursive"], correctAnswer: 1, explanation: "Tabulation (Lập bảng) dùng vòng lặp giải các bài toán nhỏ gọn ở 'đáy' trước, rồi điền dần lên bài toán lớn ở 'đỉnh' (Bottom-up).", hint: "Xây từ móng lên (Bottom-up)." },
  { id: 136, topic: "ND10: Recursion Trace", difficulty: "Trung bình", question: "Hàm này trả về gì?", code: "def f(n):\n    if n < 2: return n\n    return f(n-1) + f(n-2)\nprint(f(4))", options: ["3", "4", "2", "5"], correctAnswer: 0, explanation: "Đây là chuỗi Fibonacci. f(0)=0, f(1)=1. f(2)=1. f(3)=2. f(4)=f(3)+f(2) = 2+1 = 3.", hint: "Dãy Fibonacci: 0, 1, 1, 2, 3..." },
  { id: 137, topic: "ND11: Return trong Try", difficulty: "Trung bình", question: "Hàm in ra gì?", code: "def t():\n    try:\n        return 1\n    finally:\n        print('F')\nprint(t())", options: ["1", "F rồi 1", "1 rồi F", "F"], correctAnswer: 1, explanation: "Lệnh `return 1` bị 'tạm giữ'. Python nhảy xuống thi hành `finally` in ra 'F' trước. Sau đó mới cho phép thoát hàm và trả về số 1 cho `print()`.", hint: "Finally luôn chạy TRƯỚC khi thực sự thoát hàm." },
  { id: 138, topic: "ND12: read() vs readlines()", difficulty: "Trung bình", question: "Hàm `read()` khác `readlines()` ở điểm nào?", code: "", options: ["Giống nhau", "`read()` trả về 1 chuỗi String nguyên khối. `readlines()` cắt file thành List các dòng.", "`read()` đọc 1 dòng, `readlines()` đọc nhiều dòng.", "Báo lỗi"], correctAnswer: 1, explanation: "read() tải toàn bộ file vào một biến String duy nhất. readlines() biến mỗi dòng thành 1 element trong List.", hint: "Lines số nhiều là mảng List." },
  { id: 139, topic: "Nâng cao: K-Means", difficulty: "Trung bình", question: "Chữ 'K' trong K-Means clustering đại diện cho cái gì?", code: "", options: ["Hệ số góc", "Số lượng tâm cụm (clusters) cần phân chia.", "Số vòng lặp tối đa.", "Sai số cho phép."], correctAnswer: 1, explanation: "Thuật toán K-Means yêu cầu người dùng định trước số lượng K cụm để thuật toán gom nhóm dữ liệu vào.", hint: "Số lượng nhóm." },
  { id: 140, topic: "Nâng cao: deque O(1)", difficulty: "Trung bình", question: "Vì sao nên dùng `deque.popleft()` thay vì `list.pop(0)` khi làm Hàng đợi (Queue)?", code: "", options: ["Vì deque code ngắn hơn.", "Vì list.pop(0) tốn thời gian O(N) do phải dịch chuyển toàn bộ mảng. deque tốn O(1).", "Vì list không có hàm pop.", "Vì deque lưu được dict."], correctAnswer: 1, explanation: "Deque là danh sách liên kết đôi, ngắt node ở đầu mảng mất O(1). List là mảng động, lấy phần tử đầu bắt buộc phải đẩy toàn bộ đuôi mảng lùi về 1 ô (O(N)).", hint: "Tối ưu hiệu năng O(1)." },
  { id: 141, topic: "ND03: Nhận dạng tham chiếu (is)", difficulty: "Khó", question: "Lệnh in này xuất ra gì?", code: "a = [1]\nb = [1]\nprint(a is b)", options: ["True", "False", "Error", "None"], correctAnswer: 1, explanation: "Toán tử `is` so sánh xem 2 biến có trỏ chung CÙNG 1 ĐỊA CHỈ BỘ NHỚ hay không. `[]` sinh ra một List mới tinh, nên `a` và `b` trỏ vào 2 vùng nhớ độc lập -> False.", hint: "Bề ngoài giống nhau nhưng là 2 vật thể khác biệt." },
  { id: 142, topic: "ND04: Bẫy so sánh kép", difficulty: "Khó", question: "Trace kỹ: Biểu thức này True hay False?", code: "print(1 == 2 != 3)", options: ["True", "False", "Error", "None"], correctAnswer: 1, explanation: "Python chain comparison dịch thành `(1 == 2) and (2 != 3)`. Vế `(1 == 2)` là False, nên toàn bộ AND là False.", hint: "Chèn chữ AND vào giữa." },
  { id: 143, topic: "ND05: Tham số mặc định Lambda (Sớm vs Muộn)", difficulty: "Khó", question: "Đoạn mã này dường như dính lỗi Late Binding, nhưng có một tiểu xảo. Nó in ra gì?", code: "funcs = [lambda x=i: x for i in range(3)]\nprint([f() for f in funcs])", options: ["0, 1, 2", "2, 2, 2", "Error", "None"], correctAnswer: 0, explanation: "Tiểu xảo: Truyền `i` vào MẶC ĐỊNH (default argument) `x=i`. Default args được tính toán NGAY LẬP TỨC lúc tạo hàm (Early binding), nên nó lưu cứng giá trị 0, 1, 2 thay vì Late Binding.", hint: "Tham số mặc định phá giải bẫy Late Binding." },
  { id: 144, topic: "ND06: Lệnh gán và Scope", difficulty: "Khó", question: "Tại sao gọi `f()` gây văng lỗi `UnboundLocalError`?", code: "cnt = 0\ndef f():\n    cnt += 1\nf()", options: ["Chưa import thư viện", "Vì có lệnh gán `+=`, cnt bị khóa thành biến cục bộ, nhưng nó chưa có dữ liệu để tính `cnt + 1`.", "Vì cnt không phải là số.", "Không có lỗi."], correctAnswer: 1, explanation: "Python thấy lệnh Gán (`cnt = ...`) trong thân hàm thì mặc định cnt là Local. Lúc chạy `cnt + 1`, nó tìm `cnt` trong Local nhưng chưa có -> văng lỗi.", hint: "Gán = Biến thành Local." },
  { id: 145, topic: "ND07: Unhashable Key Dict", difficulty: "Khó", question: "Đoạn code khởi tạo Dictionary sau mắc lỗi gì?", code: "d = {(1, [2]): 'A'}", options: ["Lỗi SyntaxError", "Lỗi KeyError", "Lỗi TypeError: unhashable type: 'list'", "Chạy bình thường"], correctAnswer: 2, explanation: "Tuple `(1, [2])` chứa 1 List khả biến bên trong. Do đó bản thân Tuple này cũng trở thành Không thể băm (Unhashable), cấm dùng làm Key cho Dict.", hint: "Trong ruột có chứa list thì tổng thể cũng hỏng." },
  { id: 146, topic: "ND07: Shallow Copy", difficulty: "Khó", question: "Trace sự thay đổi vùng nhớ. Mảng `a` in ra là gì?", code: "a = [[1]]\nb = a[:]\nb[0].append(2)\nprint(a)", options: ["[[1]]", "[[1, 2]]", "[]", "Error"], correctAnswer: 1, explanation: "Cú pháp `a[:]` là sao chép nông (Shallow Copy). Nó tạo mảng `b` mới ở vỏ ngoài, nhưng List con `[1]` bên trong vẫn DÙNG CHUNG địa chỉ giữa `a` và `b`. Sửa `b` làm `a` đổi theo.", hint: "Bên ngoài cắt đứt, bên trong vẫn dính liền." },
  { id: 147, topic: "ND09: MRO __mro__", difficulty: "Khó", question: "Thuộc tính `__mro__` của class D trong sơ đồ kim cương này chứa các lớp theo thứ tự nào?", code: "class A: pass\nclass B(A): pass\nclass C(A): pass\nclass D(C, B): pass", options: ["class B", "class C", "class A", "class D"], correctAnswer: 1, explanation: "Cây MRO của `class D(C, B)` ưu tiên duyệt từ trái qua phải. MRO list: [D, C, B, A, object]. Index 1 là class C.", hint: "Ưu tiên duyệt từ trái sang phải ở dòng khai báo." },
  { id: 148, topic: "ND11: Dead Exception", difficulty: "Khó", question: "Khối lệnh nào KHÔNG BAO GIỜ được thi hành (Dead code)?", code: "try:\n    1/0\nexcept Exception:\n    print('A')\nexcept ZeroDivisionError:\n    print('B')", options: ["Cả 2 khối", "Khối in 'A'", "Khối in 'B'", "Không có dead code"], correctAnswer: 2, explanation: "Khối `except Exception` bao trùm MỌI lỗi và nằm trên cùng. Mọi lỗi đều bị nó hứng hết, lệnh in 'B' bên dưới vĩnh viễn không thể chạy.", hint: "Lưới khổng lồ cản đường lưới nhỏ." },
  { id: 149, topic: "ND12: Iterator File cạn kiệt", difficulty: "Khó", question: "Hàm `next()` thứ 2 sinh ra lỗi gì nếu file chỉ có 1 dòng?", code: "# File a.txt có 1 dòng\nwith open('a.txt') as f:\n    next(f)\n    next(f)", options: ["KeyError", "StopIteration", "EOFError", "Không lỗi"], correctAnswer: 1, explanation: "File object là một Iterator. Khi gọi `next()` vượt quá số dòng hiện có (đáy file), nó sẽ ném ra ngoại lệ `StopIteration`.", hint: "Hết dữ liệu để sinh ra." },
  { id: 150, topic: "Nâng cao: Vô cực (Inf)", difficulty: "Khó", question: "Biểu thức cộng vô cực này đúng hay sai?", code: "print(float('inf') + 1 == float('inf'))", options: ["True", "False", "Error", "None"], correctAnswer: 0, explanation: "Trong toán học chuẩn IEEE 754, Vô cực cộng với một hằng số hữu hạn vẫn là chính nó (Vô cực).", hint: "Biển cả thêm một giọt nước vẫn là biển cả." }
];

const EXAM_SET_04_DATA = [
  { id: 151, topic: "ND01: Phân rã (Decomposition)", difficulty: "Dễ", question: "Kỹ thuật chia một quy trình phức tạp thành các hàm nhỏ (`chop_veg()`, `boil_water()`, `cook()`) là biểu hiện của kỹ năng nào?", code: "", options: ["Nhận dạng mẫu", "Phân rã", "Trừu tượng hóa", "Thiết kế thuật toán"], correctAnswer: 1, explanation: "Phân rã chia nhỏ vấn đề lớn thành các module/hàm dễ quản lý.", hint: "Chia nhỏ để trị." },
  { id: 152, topic: "ND01: Trừu tượng hóa", difficulty: "Dễ", question: "Việc sử dụng thư viện `math.sqrt(x)` để tính căn bậc hai mà không cần quan tâm đến cách nó tính toán bên trong là ứng dụng của:", code: "", options: ["Phân rã", "Quy hoạch động", "Trừu tượng hóa", "Nhận dạng mẫu"], correctAnswer: 2, explanation: "Trừu tượng hóa che giấu sự phức tạp thực thi, chỉ cung cấp kết quả qua một giao diện đơn giản.", hint: "Nhìn vẻ bề ngoài." },
  { id: 153, topic: "ND02: AI Prompting", difficulty: "Dễ", question: "Khi thêm yêu cầu 'Hãy trả lời dưới dạng danh sách gạch đầu dòng' vào prompt, bạn đang định nghĩa phần nào?", code: "", options: ["Context (Ngữ cảnh)", "Role (Vai trò)", "Output Format (Định dạng đầu ra)", "Input Data (Dữ liệu đầu vào)"], correctAnswer: 2, explanation: "Định dạng đầu ra hướng dẫn AI cấu trúc văn bản trả về theo mong muốn.", hint: "Danh sách gạch đầu dòng là một dạng cấu trúc." },
  { id: 154, topic: "ND02: AI Hallucination", difficulty: "Dễ", question: "Đâu là một trường hợp mô hình AI bị 'Ảo giác' (Hallucination)?", code: "", options: ["AI từ chối trả lời vì câu hỏi vi phạm chính sách.", "AI tóm tắt chính xác một đoạn văn dài.", "AI viện dẫn một đường link URL bài báo trông rất thật nhưng click vào thì báo lỗi 404 (không tồn tại).", "AI dịch tiếng Anh sang tiếng Việt."], correctAnswer: 2, explanation: "AI tự tin tạo ra thông tin giả mạo (URL không có thật) là ví dụ kinh điển của Hallucination.", hint: "Chuyện không có thật nhưng nói rất tự tin." },
  { id: 155, topic: "ND03: Phép toán", difficulty: "Dễ", question: "Kết quả của lệnh in sau là gì?", code: "print(15 % 4)", options: ["3.75", "3", "4", "15"], correctAnswer: 1, explanation: "15 chia 4 được 3 dư 3. Phép `%` lấy phần dư.", hint: "Phép chia lấy dư." },
  { id: 156, topic: "ND03: Định dạng chuỗi", difficulty: "Dễ", question: "Đoạn code dùng f-string này in ra kết quả nào?", code: "name = 'Bob'\nprint(f'Hi {name}')", options: ["Hi Bob", "Hi {name}", "Error", "Bob"], correctAnswer: 0, explanation: "f-string thay thế biến `{name}` bằng giá trị của nó là 'Bob'.", hint: "Nội suy chuỗi (String interpolation)." },
  { id: 157, topic: "ND04: Boolean", difficulty: "Dễ", question: "Biểu thức này trả về giá trị gì?", code: "print(not False and True)", options: ["False", "True", "None", "Error"], correctAnswer: 1, explanation: "`not False` là `True`. `True and True` trả về `True`.", hint: "not False là gì?" },
  { id: 158, topic: "ND04: Truthy/Falsy", difficulty: "Dễ", question: "Đoạn mã sau in ra gì?", code: "if \"\":\n    print(\"A\")\nelse:\n    print(\"B\")", options: ["A", "B", "Lỗi cú pháp", "Không in gì"], correctAnswer: 1, explanation: "Chuỗi rỗng `\"\"` được Python đánh giá là Falsy (Sai).", hint: "Rỗng là sai." },
  { id: 159, topic: "ND05: Vòng lặp for", difficulty: "Dễ", question: "Vòng lặp này sẽ in ra những số nào?", code: "for i in range(1, 4):\n    print(i, end='')", options: ["1234", "123", "0123", "13"], correctAnswer: 1, explanation: "`range(1, 4)` sinh ra các số 1, 2, 3 (dừng trước 4).", hint: "Dừng lại trước stop." },
  { id: 160, topic: "ND05: Continue", difficulty: "Dễ", question: "Lệnh `continue` bên trong vòng lặp làm nhiệm vụ gì?", code: "", options: ["Ngắt toàn bộ vòng lặp.", "Dừng chương trình.", "Bỏ qua các lệnh còn lại trong vòng lặp hiện tại và chuyển sang lần lặp tiếp theo.", "Tạo ra một vòng lặp vô hạn."], correctAnswer: 2, explanation: "`continue` bỏ qua phần thân còn lại và nhảy về điều kiện để tiếp tục bước lặp mới.", hint: "Tiếp tục chạy bước tiếp theo." },
  { id: 161, topic: "ND06: Hàm", difficulty: "Dễ", question: "Nguyên tắc khai báo tham số mặc định (default arguments) trong Python là gì?", code: "def f(a=1, b): pass", options: ["Tham số mặc định phải đặt TRƯỚC tham số bắt buộc.", "Tham số mặc định phải đặt SAU tham số bắt buộc.", "Thứ tự không quan trọng.", "Chỉ cho phép 1 tham số mặc định."], correctAnswer: 1, explanation: "Trong khai báo hàm, tham số không có giá trị mặc định phải đứng trước, tham số có giá trị mặc định phải xếp ở cuối.", hint: "Bắt buộc đi trước, tùy chọn đi sau." },
  { id: 162, topic: "ND06: Tầm vực (Scope)", difficulty: "Dễ", question: "Hàm có thể in ra biến toàn cục `x` được không?", code: "x = 5\ndef f():\n    print(x)\nf()", options: ["Có, in ra 5.", "Không, báo lỗi NameError.", "Lỗi UnboundLocalError.", "In ra None."], correctAnswer: 0, explanation: "Hàm có quyền ĐỌC (read) bất kỳ biến toàn cục nào ở bên ngoài nó mà không cần khai báo `global`.", hint: "Chỉ nhìn thì không bị cấm." },
  { id: 163, topic: "ND07: Dictionary", difficulty: "Dễ", question: "Tính chất quan trọng nhất của các Khóa (Keys) trong Dictionary là gì?", code: "", options: ["Phải là các con số.", "Phải là dữ liệu khả biến (Mutable).", "Phải là dữ liệu bất biến, có thể băm được (Hashable).", "Phải được sắp xếp tăng dần."], correctAnswer: 2, explanation: "Các Khóa của Dictionary phải được tính mã băm (Hash) để lưu trữ, do đó chúng phải bất biến (vd: chuỗi, số, tuple).", hint: "Không được thay đổi giá trị." },
  { id: 164, topic: "ND07: List Comprehension", difficulty: "Dễ", question: "Mảng sinh ra là gì?", code: "print([x for x in range(3)])", options: ["[1, 2, 3]", "[0, 1, 2, 3]", "[0, 1, 2]", "[]"], correctAnswer: 2, explanation: "Vòng lặp `range(3)` trả về 0, 1, 2. Biểu thức tạo ra list tương ứng.", hint: "Sinh mảng từ 0 đến 2." },
  { id: 165, topic: "ND08: Thuật toán sắp xếp", difficulty: "Dễ", question: "Thuật toán sắp xếp nổi bọt (Bubble Sort) hoạt động như thế nào?", code: "", options: ["Chia đôi mảng thành nhiều phần nhỏ.", "Liên tục so sánh và hoán đổi vị trí của các cặp phần tử kề nhau.", "Chọn phần tử nhỏ nhất và đẩy lên đầu.", "Sắp xếp theo bảng chữ cái."], correctAnswer: 1, explanation: "Bubble sort duyệt mảng nhiều lần, mỗi lần đẩy phần tử lớn nhất nổi lên cuối mảng thông qua swap kề nhau.", hint: "Hoán đổi vị trí kề nhau." },
  { id: 166, topic: "ND08: Big O", difficulty: "Dễ", question: "Độ phức tạp thời gian của thuật toán Tìm kiếm nhị phân (Binary Search) là bao nhiêu?", code: "", options: ["O(N)", "O(1)", "O(N^2)", "O(log N)"], correctAnswer: 3, explanation: "Vì mỗi bước không gian tìm kiếm bị cắt đi một nửa, nên độ phức tạp là log cơ số 2 của N.", hint: "Cắt đôi liên tục." },
  { id: 167, topic: "ND09: OOP", difficulty: "Dễ", question: "Tham số `self` xuất hiện đầu tiên trong các phương thức của một Class ám chỉ điều gì?", code: "", options: ["Bản thân đối tượng (instance) đang gọi phương thức.", "Biến toàn cục.", "Lớp cha của đối tượng.", "Một biến tên là self."], correctAnswer: 0, explanation: "`self` là con trỏ đại diện cho chính đối tượng hiện tại để truy xuất các thuộc tính của nó.", hint: "Self = Bản thân." },
  { id: 168, topic: "ND10: Đệ quy", difficulty: "Dễ", question: "Tràn ngăn xếp cuộc gọi (Stack Overflow) xảy ra trong hàm đệ quy do nguyên nhân chính nào?", code: "", options: ["Hàm sử dụng quá nhiều biến cục bộ.", "Hàm thiếu Điều kiện dừng (Base case) dẫn đến lặp vô hạn.", "Truyền nhầm kiểu dữ liệu.", "Lỗi cú pháp."], correctAnswer: 1, explanation: "Nếu không có base case, hàm sẽ đệ quy liên tục cho đến khi bộ nhớ call stack bị cạn kiệt.", hint: "Không có điểm dừng." },
  { id: 169, topic: "ND11: Exceptions", difficulty: "Dễ", question: "Lỗi `ZeroDivisionError` xuất hiện khi nào?", code: "", options: ["Khi chia một số cho 0.", "Khi vòng lặp chạy 0 lần.", "Khi mảng có độ dài là 0.", "Khi dùng số 0 làm khóa dict."], correctAnswer: 0, explanation: "Đây là lỗi toán học tiêu chuẩn khi thực hiện phép chia cho 0.", hint: "Chia cho số Không." },
  { id: 170, topic: "ND12: Đọc file", difficulty: "Dễ", question: "Phương thức `.read()` trên đối tượng file trả về cái gì?", code: "f.read()", options: ["Một danh sách các chuỗi.", "Một chuỗi (String) duy nhất chứa toàn bộ nội dung file.", "Số lượng byte trong file.", "Một đối tượng JSON."], correctAnswer: 1, explanation: "Hàm `.read()` hút toàn bộ nội dung của tệp tin vào RAM và trả về dưới dạng một chuỗi văn bản dài.", hint: "Đọc nguyên khối." },
  { id: 171, topic: "ND03: Biểu thức", difficulty: "Trung bình", question: "Kết quả in ra là gì?", code: "print(16 // 3 + 16 % 3)", options: ["5", "6", "1", "16"], correctAnswer: 1, explanation: "`16 // 3 = 5`. `16 % 3 = 1`. Tổng `5 + 1 = 6`.", hint: "Lấy nguyên cộng lấy dư." },
  { id: 172, topic: "ND03: Slicing", difficulty: "Trung bình", question: "Đoạn cắt lát này lấy phần nào của chuỗi?", code: "s = 'PYTHON'\nprint(s[-3:])", options: ["HON", "PYT", "N", "THO"], correctAnswer: 0, explanation: "Cắt từ chỉ mục -3 (chữ H đếm ngược từ đuôi) cho đến hết chuỗi, thu được 'HON'.", hint: "-3 là đếm ngược 3 ký tự từ cuối." },
  { id: 173, topic: "ND04: Short-circuit", difficulty: "Trung bình", question: "Code có văng lỗi chia cho 0 không?", code: "x = True or (1 / 0)\nprint(x)", options: ["Có lỗi ZeroDivisionError", "Không, in ra True", "In ra False", "In ra 1"], correctAnswer: 1, explanation: "Toán tử `or` có tính chất đoản mạch. Vế trái `True` đã đủ làm toàn biểu thức `True`, vế phải `(1/0)` bị bỏ qua không tính đến.", hint: "Or chỉ cần 1 vế True là bỏ qua vế sau." },
  { id: 174, topic: "ND04: So sánh", difficulty: "Trung bình", question: "Biểu thức này trả về gì?", code: "print(5 == 5.0)", options: ["False", "True", "Error", "None"], correctAnswer: 1, explanation: "Toán tử `==` so sánh giá trị toán học. Số nguyên 5 và số thực 5.0 có cùng giá trị nên trả về True.", hint: "So sánh giá trị toán học." },
  { id: 175, topic: "ND05: Vòng lặp For-else", difficulty: "Trung bình", question: "Dòng chữ 'A' có được in ra không?", code: "for i in range(3):\n    break\nelse:\n    print('A')", options: ["Có", "Không, vì vòng lặp bị break", "In ra 3 lần", "Lỗi cú pháp"], correctAnswer: 1, explanation: "Khối `else` của vòng lặp chỉ chạy nếu vòng lặp kết thúc tự nhiên mà không đụng phải lệnh `break`.", hint: "Else có nghĩa là 'Không bị break'." },
  { id: 176, topic: "ND05: Vòng lặp While", difficulty: "Trung bình", question: "Vòng lặp in ra những số nào?", code: "i = 0\nwhile i < 3:\n    i += 2\n    print(i, end=' ')", options: ["0 2", "2 4", "2", "0 2 4"], correctAnswer: 1, explanation: "Lần lặp 1: `i=0 -> i=2`, in 2. Lần lặp 2: Điều kiện `2<3` đúng, `i=2 -> i=4`, in 4. Điều kiện `4<3` sai, dừng vòng lặp.", hint: "Chú ý vị trí lệnh print." },
  { id: 177, topic: "ND06: Lệnh Global", difficulty: "Trung bình", question: "Code in ra gì?", code: "x = 1\ndef f():\n    global x\n    x = 5\nf()\nprint(x)", options: ["1", "5", "Error", "None"], correctAnswer: 1, explanation: "Từ khóa `global x` cho phép hàm sửa đổi trực tiếp biến `x` ở bên ngoài. Giá trị x cập nhật thành 5.", hint: "Sửa đổi biến ngoài." },
  { id: 178, topic: "ND06: Unpack args", difficulty: "Trung bình", question: "Giá trị in ra là bao nhiêu?", code: "def f(*args):\n    print(args[1])\nf(10, 20, 30)", options: ["10", "20", "30", "Error"], correctAnswer: 1, explanation: "`*args` nhận vào một Tuple `(10, 20, 30)`. Phần tử ở chỉ mục 1 là 20.", hint: "Chỉ mục (index) đếm từ 0." },
  { id: 179, topic: "ND07: Set", difficulty: "Trung bình", question: "Đoạn code in ra gì?", code: "print(set([1, 2, 2, 3]))", options: ["[1, 2, 3]", "{1, 2, 3}", "Error", "{1, 2, 2, 3}"], correctAnswer: 1, explanation: "Hàm `set()` loại bỏ các phần tử trùng lặp của List và trả về một tập hợp (có ngoặc nhọn).", hint: "Set dùng ngoặc nhọn và không có phần tử trùng." },
  { id: 180, topic: "ND07: Shallow Copy", difficulty: "Trung bình", question: "Bản sao nông (Shallow copy) thể hiện thế nào ở đây?", code: "a = [1, 2]\nb = a.copy()\na[0] = 9\nprint(b[0])", options: ["1", "9", "Error", "2"], correctAnswer: 0, explanation: "Hàm `.copy()` tạo ra một bản sao mới (cho danh sách 1 chiều). Sửa mảng `a` không làm ảnh hưởng đến mảng `b`. `b[0]` vẫn là 1.", hint: "Copy tạo ra mảng mới (với dữ liệu 1 chiều)." },
  { id: 181, topic: "ND08: Tìm kiếm Nhị phân", difficulty: "Trung bình", question: "Trong Tìm kiếm nhị phân trên mảng `[1, 2, 3, 4]`, phần tử `mid` đầu tiên là gì?", code: "", options: ["1", "2", "3", "4"], correctAnswer: 1, explanation: "Chỉ mục `left=0`, `right=3`. Tính `mid = (0 + 3) // 2 = 1`. Giá trị tại index 1 là 2.", hint: "Lấy trung bình cộng index." },
  { id: 182, topic: "ND08: Merge Sort", difficulty: "Trung bình", question: "Kết quả của bước trộn (Merge) hai mảng `[1, 5]` và `[2, 3]` là gì?", code: "", options: ["[1, 5, 2, 3]", "[1, 2, 3, 5]", "[1, 2, 5, 3]", "[2, 3, 1, 5]"], correctAnswer: 1, explanation: "Thuật toán Merge so sánh các phần tử từ đầu 2 mảng để xếp thành 1 mảng tăng dần hoàn chỉnh: `[1, 2, 3, 5]`.", hint: "Trộn lại thành mảng tăng dần." },
  { id: 183, topic: "ND09: Kế thừa", difficulty: "Trung bình", question: "Hàm `issubclass(B, A)` trả về gì trong trường hợp này?", code: "class A: pass\nclass B(A): pass\nprint(issubclass(B, A))", options: ["False", "True", "Error", "None"], correctAnswer: 1, explanation: "Lớp B kế thừa từ A, nên B là lớp con (subclass) của A. Trả về True.", hint: "Kiểm tra quan hệ cha - con." },
  { id: 184, topic: "ND09: Overriding", difficulty: "Trung bình", question: "Phương thức Overriding (Ghi đè) xảy ra khi nào?", code: "", options: ["Lớp con tạo một phương thức có cùng tên với phương thức ở lớp cha.", "Lớp con xóa phương thức của lớp cha.", "Lớp cha gọi phương thức của lớp con.", "Tạo 2 hàm cùng tên trong cùng một lớp."], correctAnswer: 0, explanation: "Ghi đè cho phép lớp con cung cấp một cách triển khai riêng biệt cho một phương thức đã được định nghĩa ở lớp cha.", hint: "Viết đè lên bản cũ." },
  { id: 185, topic: "ND10: Memoization", difficulty: "Trung bình", question: "Tác dụng của Kỹ thuật Memoization trong đệ quy là gì?", code: "", options: ["Nhân bản mã nguồn.", "Xóa cache bộ nhớ.", "Lưu trữ kết quả của các hàm đã chạy để tái sử dụng, tránh tính toán trùng lặp.", "Dừng đệ quy ngay lập tức."], correctAnswer: 2, explanation: "Memoization (Ghi nhớ) dùng Dictionary để cache lại kết quả các nhánh đệ quy, giảm độ phức tạp từ Hàm mũ xuống Tuyến tính.", hint: "Cache (Bộ nhớ đệm)." },
  { id: 186, topic: "ND10: Trace Đệ quy", difficulty: "Trung bình", question: "Giá trị của `f(3)` là bao nhiêu?", code: "def f(x):\n    return x if x<=1 else x * f(x-1)", options: ["3", "6", "9", "2"], correctAnswer: 1, explanation: "Hàm tính giai thừa. `f(3) = 3 * f(2) = 3 * 2 * f(1) = 3 * 2 * 1 = 6`.", hint: "Tính giai thừa." },
  { id: 187, topic: "ND11: Cấu trúc try-finally", difficulty: "Trung bình", question: "Màn hình in ra gì?", code: "try:\n    1 / 0\nexcept:\n    print('A')\nfinally:\n    print('B')", options: ["A", "B", "A B", "Lỗi"], correctAnswer: 2, explanation: "Gặp lỗi chia cho 0, nhảy vào `except` in 'A'. Sau đó `finally` chắc chắn chạy, in 'B'.", hint: "Finally luôn chạy." },
  { id: 188, topic: "ND12: Context Manager", difficulty: "Trung bình", question: "Câu lệnh `with open('a.txt') as f:` có ưu điểm gì so với `f = open('a.txt')`?", code: "", options: ["Tăng tốc độ đọc file.", "Tự động đóng tệp tin (f.close()) khi thoát khỏi khối lệnh, dù có lỗi hay không.", "Chỉ cho phép đọc.", "Mở file dưới quyền Admin."], correctAnswer: 1, explanation: "Context manager đảm bảo tài nguyên hệ thống (file handles) luôn được giải phóng (đóng lại) an toàn.", hint: "Quản lý tài nguyên an toàn." },
  { id: 189, topic: "Nâng cao: K-Means", difficulty: "Trung bình", question: "Bước 'Gán cụm' (Assignment step) trong K-Means thực hiện việc gì?", code: "", options: ["Xóa các điểm nhiễu.", "Tính lại trung bình tọa độ cụm.", "Gán mỗi điểm dữ liệu vào tâm cụm (centroid) có khoảng cách gần nó nhất.", "Nhân bản dữ liệu."], correctAnswer: 2, explanation: "Trong K-Means, các điểm dữ liệu sẽ tìm tâm cụm gần nhất và tự nhận mình thuộc về cụm đó.", hint: "Tìm về nơi gần nhất." },
  { id: 190, topic: "Nâng cao: deque", difficulty: "Trung bình", question: "Kết quả in ra là gì?", code: "from collections import deque\nd = deque([1, 2])\nd.appendleft(0)\nprint(d[0])", options: ["1", "0", "2", "Error"], correctAnswer: 1, explanation: "Lệnh `appendleft(0)` đẩy số 0 vào vị trí đầu tiên (bên trái) của hàng đợi. Giá trị tại `d[0]` giờ là 0.", hint: "Thêm vào bên trái." },
  { id: 191, topic: "ND03: Phép nhân List (Mảng 2 chiều)", difficulty: "Khó", question: "Bẫy tham chiếu mảng lồng nhau. Mảng `m` sau khi sửa in ra gì?", code: "m = [[0]] * 3\nm[0][0] = 1\nprint(m)", options: ["[[1], [0], [0]]", "[[1], [1], [1]]", "[[0], [0], [0]]", "Error"], correctAnswer: 1, explanation: "Toán tử `*` trên List lồng nhau không tạo ra bản sao sâu (deep copy) mà chỉ tạo 3 con trỏ cùng trỏ đến MỘT list `[0]` duy nhất. Đổi 1 chỗ là đổi tất cả.", hint: "Nhân bản tham chiếu." },
  { id: 192, topic: "ND04: Boolean traps", difficulty: "Khó", question: "Bạn hãy trace cẩn thận Chain comparison này. Kết quả là?", code: "print(0 == False == 0)", options: ["True", "False", "Error", "None"], correctAnswer: 0, explanation: "Python bẻ thành `(0 == False) and (False == 0)`. Số 0 tương đương giá trị False. Do đó `True and True` => True.", hint: "0 bằng False." },
  { id: 193, topic: "ND05: Rò rỉ biến lặp (Loop Leak)", difficulty: "Khó", question: "Biến `i` có tồn tại sau vòng lặp không? Code in ra gì?", code: "for i in range(3):\n    pass\nprint(i)", options: ["Error: name 'i' is not defined", "0", "2", "3"], correctAnswer: 2, explanation: "Khác với các ngôn ngữ C/Java, vòng lặp `for` trong Python KHÔNG đóng gói (isolate) biến lặp. Biến `i` rò rỉ ra ngoài với giá trị cuối cùng của vòng lặp là 2.", hint: "Biến lặp tràn ra ngoài." },
  { id: 194, topic: "ND06: Closure Late Binding", difficulty: "Khó", question: "Bẫy liên kết muộn cực kỳ nổi tiếng. Hàm `f()` đầu tiên trả về gì?", code: "fs = [lambda: x for x in [1, 2, 3]]\nprint(fs[0]())", options: ["1", "2", "3", "Error"], correctAnswer: 2, explanation: "Các hàm `lambda` không lưu giá trị `x` lúc khởi tạo mà chỉ lưu 'địa chỉ' của biến `x`. Khi vòng lặp kết thúc, `x = 3`. Khi gọi `fs[0]()`, nó lấy giá trị hiện tại của `x` là 3.", hint: "Tra cứu giá trị tại thời điểm hàm chạy." },
  { id: 195, topic: "ND06: Mutable Defaults", difficulty: "Khó", question: "Giá trị của Dict in ra là gì?", code: "def f(a, b={}):\n    b[a] = 1\n    return b\n\nf('x')\nprint(f('y'))", options: ["{'y': 1}", "{'x': 1, 'y': 1}", "{'x': 1}", "Error"], correctAnswer: 1, explanation: "Tham số mặc định `b={}` chỉ tạo 1 lần. Các lần gọi hàm chia sẻ chung cái Dict này. Lần 1 nạp key 'x'. Lần 2 nạp key 'y' vào cùng Dict đó.", hint: "Hố đen lưu trữ dùng chung." },
  { id: 196, topic: "ND07: Mảng Set Mutability", difficulty: "Khó", question: "Lệnh thêm phần tử này có hoạt động không?", code: "s = set()\ns.add([1, 2])", options: ["Thành công", "Lỗi TypeError: unhashable type: 'list'", "Tạo ra tuple", "Lỗi SyntaxError"], correctAnswer: 1, explanation: "Tập hợp (Set) yêu cầu các phần tử phải có mã Hash bất biến. List `[1, 2]` là khả biến (có thể sửa) nên không thể đưa vào Set.", hint: "Set chỉ chứa vật cứng (bất biến)." },
  { id: 197, topic: "ND09: MRO __mro__", difficulty: "Khó", question: "Thuộc tính `__mro__` của class D trong sơ đồ kim cương này chứa các lớp theo thứ tự nào?", code: "class A: pass\nclass B(A): pass\nclass C(A): pass\nclass D(B, C): pass", options: ["D, C, B, A, object", "D, B, C, A, object", "D, B, A, C, object", "D, A, B, C, object"], correctAnswer: 1, explanation: "Thuật toán C3 của Python duyệt từ trái qua phải của nhánh khai báo `(B, C)` nhưng hoãn lớp tổ tiên chung `A` lại cho đến khi các lớp con được duyệt hết. (D, B, C, A).", hint: "Quét ngang trước khi quét dọc lên gốc." },
  { id: 198, topic: "ND11: Scope của biến Exception", difficulty: "Khó", question: "Chuyện gì xảy ra với biến `e` trong Python 3?", code: "try:\n    1/0\nexcept Exception as e:\n    pass\nprint(e)", options: ["In ra lỗi ZeroDivisionError", "In ra rỗng", "Lỗi NameError do biến e bị hủy", "Lỗi SyntaxError"], correctAnswer: 2, explanation: "Để ngăn lỗi rò rỉ vùng nhớ, Python 3 tự động tiêm lệnh `del e` vào cuối khối except để dọn rác. Nên bên ngoài gọi `e` sẽ văng NameError.", hint: "Hủy chứng cứ." },
  { id: 199, topic: "ND12: Iterator File", difficulty: "Khó", question: "Hàm `next()` trên đối tượng file làm nhiệm vụ gì?", code: "# f mở file chứa 'A\\nB\\n'\n# next(f)", options: ["Báo lỗi", "Đọc toàn bộ file", "Đọc dòng đầu tiên của file ('A\\n')", "Xóa file"], correctAnswer: 2, explanation: "File object trong Python là một Iterator. Gọi `next(f)` sẽ kéo luồng dữ liệu tiến lên 1 bước, tương đương đọc 1 dòng (line).", hint: "Tiến lên 1 bước." },
  { id: 200, topic: "Nâng cao: Lệnh Assert trap", difficulty: "Khó", question: "Lệnh assert này có bao giờ báo lỗi (AssertionError) không?", code: "assert (1 == 2, 'Lỗi toán học')", options: ["Có, báo ngay lập tức", "Chỉ báo khi biến môi trường tắt", "Không bao giờ báo lỗi", "Lỗi Syntax"], correctAnswer: 2, explanation: "Do bọc trong ngoặc đơn, biểu thức được đánh giá là một TUPLE KHÁC RỖNG (có 2 phần tử). Mọi Tuple khác rỗng đều Truthy (True). Nên `assert True` luôn thành công.", hint: "Tuple khác rỗng luôn là True." }
];

const EXAM_SET_05_DATA = [
  { id: 201, topic: "ND01: Nhận dạng mẫu", difficulty: "Dễ", question: "Hành động nào sau đây mô tả rõ nhất kỹ năng 'Nhận dạng mẫu' (Pattern Recognition)?", code: "", options: ["Viết mã lệnh bằng Python.", "Sao chép mã từ file này sang file khác.", "Nhận ra rằng nhiều học sinh có cùng một lỗi cú pháp, từ đó tạo ra một bài giảng chung sửa lỗi đó.", "Che giấu chi tiết của thuật toán."], correctAnswer: 2, explanation: "Việc phát hiện ra sự lặp lại (quy luật chung) để đưa ra hướng giải quyết tổng quát chính là Nhận dạng mẫu.", hint: "Tìm điểm chung." },
  { id: 202, topic: "ND01: Thiết kế thuật toán", difficulty: "Dễ", question: "Điểm khác biệt chính giữa Thuật toán (Algorithm) và Heuristic (Thuật giải kinh nghiệm) là gì?", code: "", options: ["Heuristic viết bằng Python, Algorithm viết bằng C++.", "Algorithm luôn đảm bảo tìm ra kết quả chính xác 100%, Heuristic chỉ tìm ra kết quả đủ tốt trong thời gian ngắn.", "Algorithm chạy nhanh hơn Heuristic.", "Heuristic không dùng cho máy tính."], correctAnswer: 1, explanation: "Thuật toán là các bước logic chắc chắn dẫn đến đáp án đúng. Heuristic là 'mẹo' để giải quyết nhanh khi thuật toán tốn quá nhiều thời gian (chấp nhận kết quả gần đúng).", hint: "Sự chắc chắn vs Tính thực dụng." },
  { id: 203, topic: "ND02: Prompt Constraint", difficulty: "Dễ", question: "Việc thêm câu lệnh 'Chỉ trả lời bằng định dạng JSON' vào Prompt là để thiết lập thành phần nào?", code: "", options: ["Role (Vai trò)", "Output Constraint (Ràng buộc đầu ra)", "Few-shot", "Context (Ngữ cảnh)"], correctAnswer: 1, explanation: "Đây là một ràng buộc (Constraint) nghiêm ngặt về mặt định dạng mà AI bắt buộc phải tuân theo.", hint: "Bắt buộc làm theo một format." },
  { id: 204, topic: "ND02: AI Hallucination", difficulty: "Dễ", question: "Tại sao mô hình Ngôn ngữ Lớn (LLM) lại dễ sinh ra 'Ảo giác' (Hallucination)?", code: "", options: ["Vì AI bị nhiễm virus.", "Vì bản chất AI chỉ dự đoán các từ tiếp theo dựa trên xác suất, chứ không thực sự 'hiểu' sự thật vật lý.", "Vì AI ghét người dùng.", "Vì máy chủ quá tải."], correctAnswer: 1, explanation: "LLM hoạt động dựa trên xác suất thống kê văn bản (Predict next word) nên có thể ghép các từ nghe rất hợp lý nhưng sai hoàn toàn về sự thật.", hint: "Học vẹt nâng cao." },
  { id: 205, topic: "ND03: Phép toán", difficulty: "Dễ", question: "Kết quả của lệnh in sau là gì?", code: "print(14 % -3)", options: ["2", "-1", "-2", "1"], correctAnswer: 1, explanation: "Trong Python, dấu của phép Modulo `%` luôn đi theo dấu của mẫu số. `14 // -3 = -5`. Suy ra `14 - (-3 * -5) = 14 - 15 = -1`.", hint: "Dấu của số bị chia." },
  { id: 206, topic: "ND03: Định dạng chuỗi", difficulty: "Dễ", question: "Đoạn code f-string này in ra chuỗi nào?", code: "x = 10\nprint(f'{x:04d}')", options: ["1000", "0010", "10", "0001"], correctAnswer: 1, explanation: "Định dạng `04d` yêu cầu số nguyên (d) phải chiếm đúng 4 ký tự, nếu thiếu thì chèn các số 0 vào phía trước (Padding).", hint: "Chèn số 0 cho đủ độ dài." },
  { id: 207, topic: "ND04: Falsy string", difficulty: "Dễ", question: "Biến `b` sẽ mang giá trị Boolean nào?", code: "s = ' '\nb = bool(s)\nprint(b)", options: ["False", "True", "None", "Error"], correctAnswer: 1, explanation: "Chuỗi `s` chứa một ký tự khoảng trắng (Space), KHÔNG PHẢI LÀ CHUỖI RỖNG `''`. Do đó nó là Truthy (True).", hint: "Khoảng trắng cũng là một ký tự." },
  { id: 208, topic: "ND04: Điều kiện if", difficulty: "Dễ", question: "Chương trình sẽ in ra số mấy?", code: "if {}:\n    print(1)\nelse:\n    print(0)", options: ["1", "0", "Lỗi cú pháp", "Không in gì"], correctAnswer: 1, explanation: "Một Dictionary rỗng `{}` được đánh giá là Falsy (Sai). Chương trình sẽ nhảy vào nhánh else in ra 0.", hint: "Hộp không có gì bên trong." },
  { id: 209, topic: "ND05: Vòng lặp For", difficulty: "Dễ", question: "Hàm `range(2, 6, 2)` sinh ra những số nào?", code: "", options: ["2, 3, 4, 5", "2, 4, 6", "2, 4", "0, 2, 4"], correctAnswer: 2, explanation: "Bắt đầu từ 2, nhảy 2 bước, dừng trước 6. Kết quả là 2 và 4.", hint: "Nhảy cóc 2 bước." },
  { id: 210, topic: "ND05: Pass statement", difficulty: "Dễ", question: "Lệnh `pass` khác gì với `continue`?", code: "", options: ["Chúng giống hệt nhau.", "`pass` không làm gì cả và chạy tiếp các lệnh dưới nó. `continue` bỏ qua các lệnh dưới nó để lặp vòng mới.", "`pass` gây lỗi nếu đứng một mình.", "`pass` dùng để đóng file."], correctAnswer: 1, explanation: "`pass` chỉ là lệnh giữ chỗ để lấp đầy khối lệnh rỗng, nó hoàn toàn vô hại và không can thiệp vào luồng chạy.", hint: "Tàng hình." },
  { id: 211, topic: "ND06: Cú pháp hàm", difficulty: "Dễ", question: "Định nghĩa hàm nào dưới đây là HỢP LỆ trong Python?", code: "", options: ["def f(a=1, b=2):", "def f(a=1, b):", "def f(a, b=2, c):", "function f():"], correctAnswer: 0, explanation: "Trong Python, các tham số có giá trị mặc định phải luôn xếp ở CUỐI CÙNG (sau các tham số bắt buộc).", hint: "Ai có ô thì xếp sau cùng." },
  { id: 212, topic: "ND06: Args unpack", difficulty: "Dễ", question: "Tham số `*args` đóng gói dữ liệu thành kiểu cấu trúc nào?", code: "def f(*args): pass", options: ["List", "Dictionary", "Tuple", "String"], correctAnswer: 2, explanation: "`*args` (arguments) nhận tất cả các đối số không tên và gói chúng vào một Tuple (Bất biến).", hint: "Dữ liệu không thể thay đổi." },
  { id: 213, topic: "ND07: Tuple Tuple", difficulty: "Dễ", question: "Đoạn code ép kiểu sang Tuple này trả về gì?", code: "print(tuple([1, 2]))", options: ["[1, 2]", "(1, 2)", "{1, 2}", "Lỗi TypeError"], correctAnswer: 1, explanation: "Hàm `tuple()` nhận một Iterable (như List) và chuyển đổi nó thành một Tuple (đóng trong ngoặc đơn).", hint: "Ngoặc đơn." },
  { id: 214, topic: "ND07: Dict Keys", difficulty: "Dễ", question: "Đặc điểm bắt buộc của Key (Khóa) trong Dictionary là gì?", code: "", options: ["Phải là chuỗi (String).", "Phải là số nguyên.", "Phải là kiểu dữ liệu có thể băm (Hashable - thường là immutable).", "Phải là List."], correctAnswer: 2, explanation: "Để xây dựng bảng băm (Hash table), Python yêu cầu Key phải bất biến để mã hash không bị thay đổi trong quá trình lưu trữ.", hint: "Cứng như đá." },
  { id: 215, topic: "ND08: Bubble Sort", difficulty: "Dễ", question: "Thuật toán Bubble Sort so sánh các phần tử theo cách nào?", code: "", options: ["So sánh phần tử đầu và cuối.", "So sánh phần tử ở giữa với các phần tử khác.", "Liên tục so sánh và hoán đổi các cặp phần tử đứng liền kề nhau.", "Chọn phần tử nhỏ nhất ra ngoài."], correctAnswer: 2, explanation: "Cơ chế của Bubble Sort là rà soát qua mảng và đổi chỗ (swap) 2 phần tử cạnh nhau nếu chúng ngược thứ tự.", hint: "So sánh lân cận." },
  { id: 216, topic: "ND08: Big O notation", difficulty: "Dễ", question: "Độ phức tạp O(N) được gọi là gì?", code: "", options: ["Độ phức tạp Hằng số (Constant).", "Độ phức tạp Tuyến tính (Linear).", "Độ phức tạp Hàm mũ (Exponential).", "Độ phức tạp Bậc hai (Quadratic)."], correctAnswer: 1, explanation: "O(N) nghĩa là thời gian chạy tăng theo đường thẳng (tuyến tính) tương ứng với kích thước dữ liệu đầu vào N.", hint: "Đường thẳng." },
  { id: 217, topic: "ND09: Object self", difficulty: "Dễ", question: "Tham số `self` trong OOP Python được dùng để làm gì?", code: "", options: ["Gọi các thư viện bên ngoài.", "Đại diện cho Lớp (Class) chứa nó.", "Truy cập đến chính đối tượng (Instance) đang gọi phương thức.", "Tự động xóa bộ nhớ."], correctAnswer: 2, explanation: "`self` là con trỏ tham chiếu trỏ vào bản thể của đối tượng, giúp lưu trữ và truy cập các thuộc tính riêng của đối tượng đó.", hint: "Bản thể hiện tại." },
  { id: 218, topic: "ND10: Đệ quy cơ bản", difficulty: "Dễ", question: "Một hàm đệ quy bắt buộc phải có thành phần nào để không bị lỗi Stack Overflow?", code: "", options: ["Điều kiện Base Case (Điều kiện cơ sở / Điểm dừng).", "Vòng lặp while.", "Câu lệnh try-except.", "Biến toàn cục."], correctAnswer: 0, explanation: "Base case quy định khi nào hàm không được gọi đệ quy tiếp nữa, giúp chương trình kết thúc và thu hồi bộ nhớ.", hint: "Nút phanh khẩn cấp." },
  { id: 219, topic: "ND11: Lỗi Exception", difficulty: "Dễ", question: "Khối `try...except` dùng để làm gì?", code: "", options: ["Tối ưu hóa tốc độ vòng lặp.", "Chuyển mã Python sang C++.", "Bắt và xử lý các lỗi (Runtime Error) để chương trình không bị crash (văng).", "Đọc dữ liệu từ ổ cứng."], correctAnswer: 2, explanation: "Khi khối `try` xảy ra lỗi, chương trình không bị dừng đột ngột mà sẽ ném luồng điều khiển sang khối `except` để xử lý êm ái.", hint: "Đỡ bóng lỗi." },
  { id: 220, topic: "ND12: File mode", difficulty: "Dễ", question: "Chế độ `'a'` trong hàm mở file `open('file.txt', 'a')` có tác dụng gì?", code: "", options: ["Chỉ đọc file.", "Xóa trắng file rồi mới ghi.", "Ghi nối dữ liệu mới vào cuối nội dung file đã có (Append).", "Đổi tên file."], correctAnswer: 2, explanation: "Chế độ 'a' (Append) cho phép thêm dữ liệu mà không làm mất đi những nội dung trước đó của tệp tin.", hint: "Nối đuôi." },
  { id: 221, topic: "ND03: Precedence", difficulty: "Trung bình", question: "Luồng chạy của biểu thức sau in ra số mấy?", code: "print(2 ** 3 ** 2)", options: ["64", "512", "72", "12"], correctAnswer: 1, explanation: "Toán tử mũ `**` có tính kết hợp từ PHẢI SANG TRÁI. Nó tính `3**2 = 9`, sau đó `2**9 = 512`.", hint: "Tính phần đuôi trước." },
  { id: 222, topic: "ND03: Slicing mảng", difficulty: "Trung bình", question: "Cắt lát chuỗi này in ra kết quả gì?", code: "s = 'ABCDEFG'\nprint(s[1:5:2])", options: ["BDF", "BD", "ACE", "BCDE"], correctAnswer: 1, explanation: "Bắt đầu từ index 1 ('B'), dừng trước index 5 ('F'), bước nhảy 2. Lấy được index 1 ('B'), index 3 ('D'). Kết quả 'BD'.", hint: "Bước nhảy là 2." },
  { id: 223, topic: "ND04: Toán tử and", difficulty: "Trung bình", question: "Biến x lưu trữ giá trị gì?", code: "x = 5 and 10\nprint(x)", options: ["True", "False", "5", "10"], correctAnswer: 3, explanation: "Toán tử `and` trả về phần tử Truthy cuối cùng nó đánh giá. Vì 5 là True, nó đánh giá tiếp 10 và trả về 10.", hint: "And cần duyệt đến tận cùng nếu mọi thứ đều đúng." },
  { id: 224, topic: "ND04: Chain Comparison", difficulty: "Trung bình", question: "Đoạn so sánh chuỗi này trả về True hay False?", code: "print(3 > 2 == 2)", options: ["True", "False", "Error", "None"], correctAnswer: 0, explanation: "Python bẻ thành `(3 > 2) and (2 == 2)`. Cả 2 đều True. Kết quả True.", hint: "Thêm chữ AND vào giữa." },
  { id: 225, topic: "ND05: for-else", difficulty: "Trung bình", question: "Vòng lặp này có in ra chữ 'Else' không?", code: "for i in range(2):\n    pass\nelse:\n    print('Else')", options: ["Có", "Không", "Error", "In ra 2 lần"], correctAnswer: 0, explanation: "Khối `else` đính kèm vòng lặp sẽ thi hành nếu vòng lặp kết thúc tự nhiên (không bị break). Do chỉ có pass, vòng lặp kết thúc tốt đẹp và in ra 'Else'.", hint: "Else = Vòng lặp an toàn." },
  { id: 226, topic: "ND05: Nested break", difficulty: "Trung bình", question: "Lệnh break ảnh hưởng thế nào?", code: "for i in range(2):\n    for j in range(2):\n        break\n    print('X')", options: ["Chương trình kết thúc ngay.", "In ra 2 chữ 'X'.", "In ra 1 chữ 'X'.", "Không in gì."], correctAnswer: 1, explanation: "Lệnh `break` chỉ đập vỡ được 1 vòng lặp chứa nó trực tiếp (vòng lặp j). Vòng lặp `i` vẫn chạy 2 lần và in ra 2 chữ 'X'.", hint: "Break chỉ phá được 1 bức tường." },
  { id: 227, topic: "ND06: Lệnh Global", difficulty: "Trung bình", question: "Hàm này sửa đổi biến toàn cục như thế nào?", code: "y = 10\ndef modify():\n    global y\n    y = y + 5\nmodify()\nprint(y)", options: ["10", "15", "Error", "None"], correctAnswer: 1, explanation: "`global y` cho phép hàm tham chiếu và GHI ĐÈ lên biến `y` ngoài cùng. `y` tăng thêm 5 thành 15.", hint: "Sửa tận gốc." },
  { id: 228, topic: "ND06: Unpack function", difficulty: "Trung bình", question: "Toán tử `*` làm gì ở đây?", code: "def add(a, b, c):\n    print(a+b+c)\nadd(*[1, 2, 3])", options: ["Nhân 3 số", "Gây lỗi", "Bung mảng [1,2,3] thành 3 đối số độc lập truyền vào hàm", "In ra mảng"], correctAnswer: 2, explanation: "Dấu `*` đứng trước List khi gọi hàm sẽ bung (unpack) List đó ra thành các phần tử riêng lẻ nạp vào tham số `a, b, c`. Kết quả là 6.", hint: "Mở gói hàng." },
  { id: 229, topic: "ND07: Set Union", difficulty: "Trung bình", question: "Toán tử `|` giữa 2 Set trả về gì?", code: "print(set([1, 1, 2]) | set([2, 3]))", options: ["{1, 2, 3}", "{2}", "{1, 3}", "Error"], correctAnswer: 0, explanation: "Toán tử `|` là phép HỢP (Union). Gộp chung `{1, 2}` và `{2, 3}` thành `{1, 2, 3}`.", hint: "Gom hết tài sản." },
  { id: 230, topic: "ND07: List Comprehension", difficulty: "Trung bình", question: "Mảng sinh ra là?", code: "print([x*2 for x in [1, 2, 3] if x < 3])", options: ["[2, 4, 6]", "[2, 4]", "[4, 6]", "[]"], correctAnswer: 1, explanation: "Lọc `x < 3` giữ lại 1 và 2. Biểu thức `x*2` biến chúng thành 2 và 4.", hint: "Lọc trước, tính sau." },
  { id: 231, topic: "ND08: Tìm kiếm nhị phân", difficulty: "Trung bình", question: "Trong Tìm kiếm nhị phân trên mảng 6 phần tử `L=0, R=5`. Chỉ mục `mid` đầu tiên là?", code: "", options: ["3", "2.5", "2", "4"], correctAnswer: 2, explanation: "`mid = (L + R) // 2`. Do `(0 + 5) // 2 = 2`. Chỉ mục mid đầu tiên là 2.", hint: "Lấy phần nguyên." },
  { id: 232, topic: "ND08: Merge Sort", difficulty: "Trung bình", question: "Trong thuật toán Merge Sort, nếu mảng là số lẻ phần tử thì sao?", code: "", options: ["Báo lỗi.", "Nó cắt làm 2 mảng lệch nhau (vd 5 phần tử cắt thành 2 và 3).", "Tự động thêm 1 phần tử ảo.", "Không thể chia được."], correctAnswer: 1, explanation: "Phép chia lấy nguyên `mid = len(arr)//2` sẽ xử lý đẹp mảng lẻ, chia ra 1 bên ngắn, 1 bên dài hơn 1 phần tử.", hint: "Luôn cắt đôi được bằng phép chia nguyên." },
  { id: 233, topic: "ND09: issubclass", difficulty: "Trung bình", question: "Hàm `issubclass` kiểm tra điều gì?", code: "class A: pass\nclass B(A): pass\nprint(issubclass(A, B))", options: ["True", "False", "Error", "None"], correctAnswer: 1, explanation: "Kiểm tra xem tham số 1 (A) có phải lớp con của tham số 2 (B) không. Ở đây A là CHA của B, không phải là con. Nên trả về False.", hint: "Tham số 1 có phải là con của tham số 2 không?" },
  { id: 234, topic: "ND09: Ghi đè", difficulty: "Trung bình", question: "Tính chất Đa hình (Polymorphism) liên quan chặt chẽ nhất đến cơ chế nào?", code: "", options: ["Tạo biến global", "Ghi đè phương thức (Method Overriding)", "Vòng lặp while", "Đọc file IO"], correctAnswer: 1, explanation: "Đa hình thường được thể hiện qua việc lớp con ghi đè phương thức của lớp cha, cho ra hành vi riêng biệt dựa trên cùng một tên hàm.", hint: "Nhiều hình thái của cùng 1 hàm." },
  { id: 235, topic: "ND10: Quy hoạch động Tabulation", difficulty: "Trung bình", question: "Đặc điểm của kỹ thuật Tabulation là gì?", code: "", options: ["Giải bài toán từ đỉnh xuống đáy (Top-down).", "Sử dụng đệ quy.", "Sử dụng mảng/bảng và vòng lặp for để giải từ đáy lên đỉnh (Bottom-up).", "Chỉ dùng cho chuỗi."], correctAnswer: 2, explanation: "Tabulation khởi tạo mảng tĩnh và duyệt vòng lặp dần lên đến N, hoàn toàn loại bỏ đệ quy.", hint: "Lập bảng bằng vòng lặp." },
  { id: 236, topic: "ND10: Recursion Trace", difficulty: "Trung bình", question: "Hàm này in ra gì?", code: "def f(n):\n    if n == 0: return 1\n    return 2 * f(n-1)\nprint(f(3))", options: ["8", "6", "4", "3"], correctAnswer: 0, explanation: "f(3) = 2 * f(2) = 2 * 2 * f(1) = 2 * 2 * 2 * f(0) = 8. Đây là hàm tính 2^N.", hint: "2 mũ 3." },
  { id: 237, topic: "ND11: Gom Exception", difficulty: "Trung bình", question: "Cách viết nào để bắt 2 loại lỗi khác nhau trong cùng 1 dòng except?", code: "", options: ["except TypeError or ValueError:", "except TypeError, ValueError:", "except (TypeError, ValueError):", "except [TypeError, ValueError]:"], correctAnswer: 2, explanation: "Python yêu cầu gom nhiều Exception muốn bắt chung vào một đối tượng Tuple (có ngoặc đơn).", hint: "Dùng Tuple." },
  { id: 238, topic: "ND12: Đọc file", difficulty: "Trung bình", question: "Khác biệt giữa `.read()` và `.readlines()` là gì?", code: "", options: ["Giống hệt nhau.", ".read() trả về 1 chuỗi dài, .readlines() trả về 1 list chứa các chuỗi đại diện từng dòng.", ".readlines() đọc nhanh hơn.", ".read() trả về list."], correctAnswer: 1, explanation: ".read() trả về dạng String nguyên khối. .readlines() chẻ khối đó ra thành List theo ký tự xuống dòng `\\n`.", hint: "Lines số nhiều là mảng List." },
  { id: 239, topic: "Nâng cao: K-Means Init", difficulty: "Trung bình", question: "Trong K-Means, các tâm cụm (centroids) ban đầu được sinh ra như thế nào?", code: "", options: ["Tính toán chính xác bằng công thức.", "Luôn nằm ở tọa độ (0,0).", "Thường được khởi tạo ngẫu nhiên từ dữ liệu.", "Được nhập tay bởi người dùng."], correctAnswer: 2, explanation: "Bước 1 của K-Means là chọn ngẫu nhiên K điểm làm tâm cụm khởi điểm trước khi bắt đầu vòng lặp gom cụm.", hint: "Khởi tạo Random." },
  { id: 240, topic: "Nâng cao: deque pop", difficulty: "Trung bình", question: "Hàm `popleft()` của `collections.deque` có độ phức tạp thời gian là?", code: "", options: ["O(N)", "O(1)", "O(log N)", "O(N^2)"], correctAnswer: 1, explanation: "Nhờ cấu trúc danh sách liên kết kép, deque lấy và xóa phần tử ở 2 đầu đều tốn thời gian hằng số O(1).", hint: "Rất nhanh." },
  { id: 241, topic: "ND03: Float Precision IEEE 754", difficulty: "Khó", question: "Phép so sánh số thực này trả về gì?", code: "print(0.1 + 0.2 == 0.3)", options: ["True", "False", "Error", "None"], correctAnswer: 1, explanation: "Do giới hạn biểu diễn dấu phẩy động nhị phân (IEEE 754), 0.1 + 0.2 trong máy tính ra 0.30000000000000004, nên không bằng đúng 0.3.", hint: "Số thực trên máy tính bị sai số vi ly." },
  { id: 242, topic: "ND04: Bẫy so sánh chuỗi (Chained comparison)", difficulty: "Khó", question: "Luồng chạy của toán tử bẻ gãy này in ra gì?", code: "print(5 > 4 == True)", options: ["True", "False", "Error", "SyntaxError"], correctAnswer: 1, explanation: "Python chain comparison ngầm chèn chữ 'and'. Cú pháp dịch thành `(5 > 4) and (4 == True)`. Vế trái là True, nhưng vế phải `4 == 1` là False. Nên kết quả là False.", hint: "Nhét thêm chữ AND vào giữa số 4." },
  { id: 243, topic: "ND05: Rò rỉ biến lặp (Loop Leak)", difficulty: "Khó", question: "Biến `x` có tồn tại sau vòng lặp không?", code: "for x in range(3):\n    pass\nprint(x)", options: ["Không, lỗi NameError", "Có, in ra 2", "Có, in ra 3", "Có, in ra 0"], correctAnswer: 1, explanation: "Vòng lặp for của Python KHÔNG tạo scope cục bộ. Biến `x` bị rò rỉ (leak) ra môi trường bên ngoài mang giá trị của lần lặp cuối cùng (số 2).", hint: "Biến lặp không bị giam giữ." },
  { id: 244, topic: "ND06: UnboundLocalError Trap", difficulty: "Khó", question: "Tại sao gọi hàm `f()` văng lỗi?", code: "x = 10\ndef f():\n    x += 1\nf()", options: ["Cú pháp += sai", "Lệnh gán `+=` khóa x thành biến cục bộ, nhưng nó chưa có giá trị ở cục bộ để tính phép cộng.", "Phải import thư viện", "Không có lỗi"], correctAnswer: 1, explanation: "Hễ có lệnh GÁN (`=`, `+=`) trong hàm, Python mặc định biến đó là Local. Lúc thi hành vế phải `x + 1`, local x chưa được khởi tạo giá trị -> UnboundLocalError.", hint: "Lệnh gán tự động tạo biến Local." },
  { id: 245, topic: "ND06: Closure Late Binding", difficulty: "Khó", question: "Mảng closure này dính bẫy Late Binding. Nó in ra gì?", code: "funcs = [lambda: i for i in range(3)]\nprint([f() for f in funcs])", options: ["[0, 1, 2]", "[2, 2, 2]", "[3, 3, 3]", "Lỗi"], correctAnswer: 1, explanation: "Các hàm `lambda` không lưu cứng giá trị `i` lúc tạo, mà trỏ đến địa chỉ của biến `i`. Khi vòng lặp range chạy xong, `i=2`. Lúc mảng comprehension gọi `f()`, tất cả đều nhìn thấy `i` hiện tại là 2.", hint: "Chỉ lấy giá trị tại thời điểm thực thi hàm." },
  { id: 246, topic: "ND07: Dictionary Unhashable Key", difficulty: "Khó", question: "Lỗi phát sinh ở đây là gì?", code: "d = {(1, [2]): 'A'}", options: ["Lỗi SyntaxError", "Lỗi KeyError", "Lỗi TypeError: unhashable type: 'list'", "Chạy bình thường"], correctAnswer: 2, explanation: "Tuple `(1, [2])` chứa 1 List khả biến bên trong. Do đó bản thân Tuple này bị nhiễm bẩn trở thành Không thể băm (Unhashable), cấm dùng làm Key cho Dict.", hint: "Trong ruột có chứa list thì tổng thể cũng hỏng." },
  { id: 247, topic: "ND09: MRO Kim Cương", difficulty: "Khó", question: "MRO quét nhánh nào trước trong cấu trúc Đa kế thừa `class D(B, C)`?", code: "class A: pass\nclass B(A): pass\nclass C(A): pass\nclass D(B, C): pass", options: ["Quét A trước", "Quét C trước", "Quét B trước, rồi C, cuối cùng mới lên A", "Quét ngẫu nhiên"], correctAnswer: 2, explanation: "Thuật toán C3 của Python quét ngang các nhánh (từ trái qua phải B rồi C) và luôn hoãn quét lớp tổ tiên chung (A) cho đến khi duyệt hết đám con cháu nhánh ngang của nó.", hint: "Quét ngang xong mới quét dọc." },
  { id: 248, topic: "ND11: Tranh giành Return in Finally", difficulty: "Khó", question: "Hàm này trả về kết quả gì?", code: "def run():\n    try:\n        return 'Try'\n    finally:\n        return 'Finally'\nprint(run())", options: ["Try", "Finally", "Lỗi", "None"], correctAnswer: 1, explanation: "Khối `finally` có quyền lực tối cao. Lệnh `return 'Finally'` bên trong nó sẽ HỦY BỎ và GHI ĐÈ bất cứ lệnh `return` nào đang chờ ở khối Try trước khi thực sự thoát hàm.", hint: "Kẻ nói sau cùng luôn đúng." },
  { id: 249, topic: "ND12: Iterator File cạn kiệt", difficulty: "Khó", question: "Hàm `next()` thứ 2 sinh ra lỗi gì nếu file chỉ có 1 dòng văn bản?", code: "# File a.txt có 1 dòng\n# with open('a.txt') as f:\n# next(f); next(f)", options: ["KeyError", "StopIteration", "EOFError", "Không lỗi"], correctAnswer: 1, explanation: "File object là một Iterator. Khi gọi `next()` vượt quá số dòng hiện có (đáy file), nó sẽ ném ra ngoại lệ `StopIteration` đặc trưng của Iterator.", hint: "Hết dữ liệu để sinh ra." },
  { id: 250, topic: "Nâng cao: Bẫy Assert Tuple", difficulty: "Khó", question: "Lệnh `assert` này có bao giờ báo lỗi (AssertionError) không?", code: "assert (1 == 2, 'Lỗi toán học')", options: ["Có, văng lỗi ngay", "Không, chương trình chạy tiếp", "Lỗi SyntaxError", "Lỗi TypeError"], correctAnswer: 1, explanation: "Do bọc trong ngoặc đơn, biểu thức được đánh giá là một TUPLE KHÁC RỖNG (chứa giá trị False và chuỗi). Mọi Tuple khác rỗng đều mang giá trị Truthy. Do đó `assert True` luôn vượt qua thành công mà không báo lỗi.", hint: "Một Tuple có dữ liệu luôn được đánh giá là True." }
];

const EXAM_SET_06_DATA = [
  { id: 251, topic: "ND01: Phân rã", difficulty: "Dễ", question: "Thao tác chia một file code khổng lồ thành nhiều file module con nhỏ gọn hơn đại diện cho kỹ năng nào?", code: "", options: ["Nhận dạng mẫu", "Trừu tượng hóa", "Phân rã (Decomposition)", "Đa hình"], correctAnswer: 2, explanation: "Phân rã giúp bẻ nhỏ một hệ thống đồ sộ thành các phần độc lập, dễ bảo trì.", hint: "Chia nhỏ để quản lý." },
  { id: 252, topic: "ND01: Thiết kế thuật toán", difficulty: "Dễ", question: "Thiết kế thuật toán (Algorithm Design) nhằm mục đích gì?", code: "", options: ["Vẽ sơ đồ tư duy.", "Tạo ra một tập hợp các bước lệnh rõ ràng để giải quyết triệt để một vấn đề.", "Ẩn đi chi tiết của hệ thống.", "Tìm kiếm phần tử trùng lặp."], correctAnswer: 1, explanation: "Thuật toán là chuỗi các hướng dẫn chi tiết từng bước để đạt được kết quả.", hint: "Công thức nấu ăn." },
  { id: 253, topic: "ND02: AI Output Format", difficulty: "Dễ", question: "Khi yêu cầu ChatGPT: 'Chỉ được phép trả về kết quả là một đoạn mã JSON', bạn đang sử dụng chiến lược gì?", code: "", options: ["Output Constraint (Ràng buộc đầu ra)", "Role Prompting", "Few-shot Prompting", "Zero-shot"], correctAnswer: 0, explanation: "Việc bắt buộc AI trả về theo một định dạng cụ thể là hình thức tạo ràng buộc (Constraint).", hint: "Kiểm soát hình thức trả lời." },
  { id: 254, topic: "ND02: AI Hallucination", difficulty: "Dễ", question: "Để giảm thiểu ảo giác (Hallucination) ở AI, tham số nào sau đây nên được điều chỉnh giảm xuống?", code: "", options: ["Max Tokens", "Frequency Penalty", "Presence Penalty", "Temperature"], correctAnswer: 3, explanation: "Temperature thấp giúp mô hình bớt sáng tạo và trở nên cứng nhắc, bám sát xác suất cao nhất (hợp logic thực tế hơn).", hint: "Nhiệt độ." },
  { id: 255, topic: "ND03: Phép chia", difficulty: "Dễ", question: "Kết quả in ra của phép chia lấy nguyên này là gì?", code: "print(10 // -3)", options: ["-3", "-4", "-3.33", "3"], correctAnswer: 1, explanation: "Phép `//` (floor division) luôn làm tròn XUỐNG số nguyên nhỏ hơn. `10 / -3 = -3.33`, làm tròn xuống là -4.", hint: "Làm tròn xuống giá trị nhỏ hơn." },
  { id: 256, topic: "ND03: Padding chuỗi", difficulty: "Dễ", question: "Cú pháp định dạng này sẽ in ra kết quả nào?", code: "print(f'{7:04d}')", options: ["7000", "0007", "7.000", "  07"], correctAnswer: 1, explanation: "Định dạng `04d` yêu cầu in số nguyên chiếm 4 ký tự, điền thêm các số 0 vào khoảng trống bên trái.", hint: "Điền số 0 cho đủ 4 ô." },
  { id: 257, topic: "ND04: Toán tử Boolean", difficulty: "Dễ", question: "Kết quả của biểu thức `not (True or False)` là?", code: "", options: ["True", "False", "None", "Lỗi"], correctAnswer: 1, explanation: "`True or False` là True. Phủ định `not True` là False.", hint: "Tính trong ngoặc trước." },
  { id: 258, topic: "ND04: Falsy Value", difficulty: "Dễ", question: "Điều kiện `if` này đánh giá chuỗi là Đúng hay Sai?", code: "if ' ':\n    print('A')\nelse:\n    print('B')", options: ["A", "B", "Lỗi", "None"], correctAnswer: 0, explanation: "Chuỗi chứa khoảng trắng `' '` là một chuỗi có nội dung (khác rỗng), do đó nó mang giá trị Truthy.", hint: "Khoảng trắng cũng là ký tự." },
  { id: 259, topic: "ND05: Vòng lặp For", difficulty: "Dễ", question: "Hàm `range(5, 1, -2)` sẽ sinh ra các số nào?", code: "", options: ["5, 3, 1", "5, 4, 3, 2", "5, 3", "Lỗi"], correctAnswer: 2, explanation: "Bắt đầu từ 5, giảm đi 2 mỗi bước (5, 3). Dừng ngay trước số 1. Kết quả là 5, 3.", hint: "Chạm cận trên là dừng." },
  { id: 260, topic: "ND05: Pass vs Continue", difficulty: "Dễ", question: "Lệnh `pass` trong Python có ý nghĩa gì?", code: "", options: ["Thoát vòng lặp.", "Bỏ qua lần lặp hiện tại.", "Là một câu lệnh rỗng, không làm gì cả, chỉ để lấp đầy khối lệnh cho đúng cú pháp.", "Gây ra lỗi chạy chương trình."], correctAnswer: 2, explanation: "`pass` không cản trở hay thay đổi luồng chạy của code, nó chỉ là placeholder.", hint: "Lệnh tàng hình." },
  { id: 261, topic: "ND06: Khai báo hàm", difficulty: "Dễ", question: "Lỗi sai trong dòng khai báo hàm này là gì?", code: "def add(a=0, b): return a + b", options: ["Thiếu dấu ngoặc.", "Không được return phép cộng.", "Tham số mặc định (a=0) không được đặt trước tham số bắt buộc (b).", "Không có lỗi."], correctAnswer: 2, explanation: "Python bắt buộc mọi tham số có giá trị mặc định phải nằm ở phía sau (cuối danh sách) các tham số thông thường.", hint: "Ai có ô thì xếp hàng sau." },
  { id: 262, topic: "ND06: Args", difficulty: "Dễ", question: "Tham số `*args` đóng gói các phần tử truyền vào dưới dạng cấu trúc gì?", code: "def f(*args): pass", options: ["List", "Dictionary", "Tuple", "Set"], correctAnswer: 2, explanation: "`*args` nhận vô số các tham số vị trí và gói gọn chúng vào một đối tượng Tuple (bất biến).", hint: "Ngoặc đơn bất biến." },
  { id: 263, topic: "ND07: Tuple vs List", difficulty: "Dễ", question: "Khác biệt cốt lõi nhất giữa Tuple và List là gì?", code: "", options: ["Tuple chạy chậm hơn.", "Tuple không chứa được chuỗi.", "Tuple có tính bất biến (Immutable), List thì khả biến (Mutable).", "Tuple tốn nhiều RAM hơn."], correctAnswer: 2, explanation: "Tuple một khi khởi tạo sẽ bị khóa cứng, không thể thêm/sửa/xóa phần tử.", hint: "Sự thay đổi." },
  { id: 264, topic: "ND07: Set Elements", difficulty: "Dễ", question: "Phần tử nào sau đây KHÔNG THỂ được thêm vào một tập hợp (Set)?", code: "", options: ["100", "'Hello'", "(1, 2)", "[1, 2]"], correctAnswer: 3, explanation: "Set yêu cầu phần tử phải bất biến (Hashable). List `[1, 2]` là khả biến nên không có mã hash cố định.", hint: "Set không chứa vật thể thay đổi hình dạng." },
  { id: 265, topic: "ND08: Bubble Sort", difficulty: "Dễ", question: "Sắp xếp nổi bọt (Bubble Sort) hoạt động dựa trên cơ chế nào?", code: "", options: ["Tìm phần tử nhỏ nhất và chèn lên đầu.", "Chia đôi mảng liên tục.", "Liên tục so sánh và hoán đổi vị trí của các cặp phần tử liền kề nhau.", "Chọn phần tử ngẫu nhiên làm chốt."], correctAnswer: 2, explanation: "Bubble sort quét qua mảng và đổi chỗ (swap) 2 phần tử cạnh nhau nếu chúng ngược thứ tự.", hint: "Hoán đổi lân cận." },
  { id: 266, topic: "ND08: Binary Search", difficulty: "Dễ", question: "Điều kiện tiên quyết để thuật toán Tìm kiếm Nhị phân hoạt động đúng là gì?", code: "", options: ["Mảng phải chứa toàn số dương.", "Mảng PHẢI ĐƯỢC SẮP XẾP từ trước.", "Mảng không có phần tử trùng lặp.", "Mảng phải có độ dài chẵn."], correctAnswer: 1, explanation: "Binary search dựa vào tính thứ tự của dữ liệu để loại bỏ một nửa không gian tìm kiếm ở mỗi bước.", hint: "Có thứ tự mới chặt đôi được." },
  { id: 267, topic: "ND09: OOP Init", difficulty: "Dễ", question: "Phương thức `__init__` đóng vai trò gì trong Class?", code: "", options: ["Xóa đối tượng khỏi bộ nhớ.", "In đối tượng ra màn hình.", "Là hàm Khởi tạo (Constructor) tự động gán trạng thái ban đầu cho đối tượng mới.", "Kế thừa lớp cha."], correctAnswer: 2, explanation: "`__init__` chạy ngay lập tức khi một instance mới được sinh ra để nạp các thuộc tính (properties).", hint: "Hàm sinh." },
  { id: 268, topic: "ND10: Đệ quy", difficulty: "Dễ", question: "Thành phần nào là BẮT BUỘC để ngăn đệ quy rơi vào vòng lặp vô hạn gây Stack Overflow?", code: "", options: ["Biến đếm toàn cục.", "Khối try-except.", "Điều kiện dừng (Base case).", "Lệnh print."], correctAnswer: 2, explanation: "Base case là chốt chặn giúp hàm nhận biết thời điểm dừng gọi lại chính nó và bắt đầu trả kết quả ngược lên.", hint: "Điểm kết thúc." },
  { id: 269, topic: "ND11: Exceptions", difficulty: "Dễ", question: "Lỗi `SyntaxError` có thể bị bắt bằng khối `try-except` thông thường không?", code: "", options: ["Có, luôn bắt được.", "Không, vì nó xảy ra ở khâu biên dịch (Parsing) trước khi mã nguồn thực sự chạy.", "Chỉ bắt được nếu dùng except Exception.", "Có, nhưng chỉ bắt được 1 lần."], correctAnswer: 1, explanation: "Lỗi cú pháp làm chương trình không thể thông dịch, nên mã bên trong khối try chưa bao giờ được khởi động để mà bắt lỗi.", hint: "Lỗi từ vòng gửi xe." },
  { id: 270, topic: "ND12: File Mode", difficulty: "Dễ", question: "Lệnh `open('log.txt', 'w')` sẽ làm gì nếu file `log.txt` đã có sẵn nội dung?", code: "", options: ["Ghi nối tiếp vào đuôi file.", "Báo lỗi.", "Xóa sạch toàn bộ nội dung cũ (truncate) và sẵn sàng ghi mới từ đầu.", "Chỉ cho phép đọc file."], correctAnswer: 2, explanation: "Chế độ 'w' (Write) có tính phá hủy, nó luôn làm sạch tệp tin về 0 bytes trước khi thao tác.", hint: "Xóa làm lại từ đầu." },
  { id: 271, topic: "ND03: Nhân List", difficulty: "Trung bình", question: "Toán tử `*` hoạt động thế nào trên List?", code: "print([1, 2] * 3)", options: ["Lỗi", "[3, 6]", "[1, 2, 1, 2, 1, 2]", "[1, 2, 3]"], correctAnswer: 2, explanation: "Toán tử `*` trên List sẽ nhân bản (lặp lại) các phần tử của List đó lên N lần và nối vào nhau.", hint: "Clone mảng." },
  { id: 272, topic: "ND03: Slicing đảo ngược", difficulty: "Trung bình", question: "Cú pháp Slicing sau trả về chuỗi gì?", code: "s = '123456'\nprint(s[::-2])", options: ["642", "531", "246", "Lỗi"], correctAnswer: 0, explanation: "Cú pháp `[::-2]` duyệt toàn bộ chuỗi từ cuối lên đầu với bước nhảy 2. Lấy 6, bỏ 5, lấy 4, bỏ 3, lấy 2.", hint: "Lùi 2 bước từ dưới lên." },
  { id: 273, topic: "ND04: Toán tử OR", difficulty: "Trung bình", question: "Biến x nhận giá trị nào?", code: "x = (5 < 2) or 20\nprint(x)", options: ["True", "False", "20", "Error"], correctAnswer: 2, explanation: "`5 < 2` là False. Toán tử `or` thấy vế trái False nên nó lập tức chuyển sang đánh giá và trả về vế phải là 20.", hint: "Trái sai thì lấy Phải." },
  { id: 274, topic: "ND04: Hàm all", difficulty: "Trung bình", question: "Hàm `all()` in ra gì?", code: "print(all([1, 2, '0']))", options: ["True", "False", "Error", "None"], correctAnswer: 0, explanation: "Chuỗi `'0'` là một chuỗi có nội dung (khác rỗng), nên nó Truthy. Mọi phần tử trong List đều Truthy nên `all()` trả về True.", hint: "Chuỗi chứa số 0 vẫn là chuỗi hợp lệ." },
  { id: 275, topic: "ND05: for-else break", difficulty: "Trung bình", question: "Dòng chữ 'B' có được in ra không?", code: "for i in range(2):\n    break\nelse:\n    print('B')", options: ["Có", "Không", "Error", "In 2 lần"], correctAnswer: 1, explanation: "Khối `else` chỉ kích hoạt nếu vòng lặp kết thúc mà KHÔNG BỊ NGẮT. Lệnh `break` triệt tiêu khối `else`.", hint: "Break tiêu diệt Else." },
  { id: 276, topic: "ND05: Continue Jump", difficulty: "Trung bình", question: "Chương trình in ra những số nào?", code: "for i in range(3):\n    if i == 1: continue\n    print(i, end='')", options: ["012", "02", "12", "0"], correctAnswer: 1, explanation: "Khi `i == 1`, lệnh `continue` bỏ qua lệnh `print` và nhảy thẳng sang bước lặp i=2. Kết quả chỉ in 0 và 2.", hint: "Nhảy cóc." },
  { id: 277, topic: "ND06: Lệnh Global", difficulty: "Trung bình", question: "Giá trị của y sau khi gọi hàm là?", code: "y = 5\ndef f():\n    global y\n    y = y * 2\nf()\nprint(y)", options: ["5", "10", "Error", "None"], correctAnswer: 1, explanation: "Từ khóa `global y` cho phép hàm sửa đổi trực tiếp biến y ở môi trường ngoài cùng. `5 * 2 = 10`.", hint: "Cập quyền ghi (write) cho biến global." },
  { id: 278, topic: "ND06: Keyword Args", difficulty: "Trung bình", question: "Cách truyền đối số nào là SAI chuẩn Python?", code: "def func(a, b): pass", options: ["func(b=2, 1)", "func(a=1, b=2)", "func(1, b=2)", "func(1, 2)"], correctAnswer: 0, explanation: "Khi gọi hàm, các Positional arguments (đối số không tên) phải ĐỨNG TRƯỚC Keyword arguments (đối số có tên). `func(b=2, 1)` vi phạm luật này.", hint: "Từ khóa luôn đi sau." },
  { id: 279, topic: "ND07: List Comprehension Filter", difficulty: "Trung bình", question: "Mảng sinh ra là?", code: "print([x*2 for x in [1, 2, 3] if x < 3])", options: ["[2, 4, 6]", "[2, 4]", "[4, 6]", "[]"], correctAnswer: 1, explanation: "Lọc `x < 3` giữ lại 1 và 2. Sau đó áp dụng biểu thức `x*2` biến chúng thành 2 và 4.", hint: "Lọc (if) trước, Biến đổi (x*2) sau." },
  { id: 280, topic: "ND07: Set Difference", difficulty: "Trung bình", question: "Toán tử trừ `-` trên Set trả về gì?", code: "print({1, 2, 3} - {2, 4})", options: ["{1, 3}", "{-1, -2}", "{1, 3, 4}", "Error"], correctAnswer: 0, explanation: "Phép TRỪ (Hiệu) loại bỏ các phần tử của tập thứ nhất có mặt trong tập thứ hai. Số 2 bị loại, còn lại 1 và 3.", hint: "Có ở A mà không có ở B." },
  { id: 281, topic: "ND08: Trace Binary Search", difficulty: "Trung bình", question: "Trong vòng lặp Tìm kiếm nhị phân mảng tăng dần, nếu `arr[mid] < target`, ta cập nhật biến gì?", code: "if arr[mid] < target:\n    # Cập nhật", options: ["right = mid - 1", "left = mid + 1", "return mid", "break"], correctAnswer: 1, explanation: "Vì giá trị ở giữa nhỏ hơn mục tiêu, mục tiêu chắc chắn nằm ở NỬA PHẢI. Ta phải dời cọc `left` qua bên phải của `mid`.", hint: "Chặt bỏ nửa trái." },
  { id: 282, topic: "ND08: Insertion Sort Trace", difficulty: "Trung bình", question: "Ở bước thứ 2 của Insertion Sort trên mảng `[4, 2, 3]`, số 2 sẽ được xử lý ra sao?", code: "", options: ["Nằm yên", "Đổi chỗ với 3", "Rút ra, đẩy số 4 lùi về sau 1 ô, rồi chèn số 2 vào vị trí index 0", "Xóa đi"], correctAnswer: 2, explanation: "Insertion Sort sẽ nhấc số 2 ra, so sánh với số 4 trước nó, thấy 4 > 2 nên dịch 4 qua phải và chèn 2 vào ô trống đầu tiên.", hint: "Chèn vào chỗ trống." },
  { id: 283, topic: "ND09: Phương thức Super", difficulty: "Trung bình", question: "Để lớp con `Dog` gọi hàm `speak()` của lớp cha `Animal`, ta dùng cú pháp nào?", code: "", options: ["Animal.speak()", "self.speak()", "super().speak()", "parent.speak()"], correctAnswer: 2, explanation: "Hàm `super()` trả về một proxy đại diện cho lớp cha (theo đúng MRO), giúp gọi method gốc an toàn ngay cả khi nó đã bị ghi đè ở lớp con.", hint: "Siêu lớp." },
  { id: 284, topic: "ND09: isinstance", difficulty: "Trung bình", question: "Hàm `isinstance` in ra gì?", code: "class A: pass\nclass B(A): pass\nobj = B()\nprint(isinstance(obj, A))", options: ["True", "False", "Error", "None"], correctAnswer: 0, explanation: "Lớp B kế thừa A, do đó một thực thể của B cũng đồng thời mang bản chất của A. Tính đa hình trả về True.", hint: "Chó cũng là Động vật." },
  { id: 285, topic: "ND10: Tabulation", difficulty: "Trung bình", question: "Đặc điểm của kỹ thuật Tabulation (Quy hoạch động) là gì?", code: "", options: ["Sử dụng đệ quy từ trên xuống (Top-down).", "Dùng vòng lặp for và bảng lưu trữ giải từ bài toán nhỏ nhất lên bài toán lớn (Bottom-up).", "Gán ngẫu nhiên.", "Chỉ dùng cho mảng 1 chiều."], correctAnswer: 1, explanation: "Tabulation (Lập bảng) hoàn toàn loại bỏ đệ quy, nó dùng vòng lặp điền dần kết quả từ dưới đáy lên trên đỉnh.", hint: "Xây nhà từ móng (Bottom-up)." },
  { id: 286, topic: "ND10: Đệ quy Trace", difficulty: "Trung bình", question: "Hàm này in ra kết quả gì?", code: "def f(n):\n    if n == 0: return 1\n    return 2 * f(n-1)\nprint(f(3))", options: ["8", "6", "4", "3"], correctAnswer: 0, explanation: "f(3) = 2 * f(2) = 2 * 2 * f(1) = 2 * 2 * 2 * f(0) = 8. Đây là hàm tính 2^N.", hint: "Tính 2 mũ 3." },
  { id: 287, topic: "ND11: Exceptions Tuple", difficulty: "Trung bình", question: "Cú pháp đúng để bắt 2 loại lỗi khác nhau trong cùng 1 khối except là gì?", code: "", options: ["except TypeError or ValueError:", "except TypeError, ValueError:", "except (TypeError, ValueError):", "except [TypeError, ValueError]:"], correctAnswer: 2, explanation: "Python yêu cầu gom nhóm nhiều Exception muốn bắt chung vào một đối tượng Tuple (có ngoặc đơn).", hint: "Gói vào Tuple." },
  { id: 288, topic: "ND12: read() vs readlines()", difficulty: "Trung bình", question: "Khác biệt giữa `.read()` và `.readlines()` là gì?", code: "", options: ["Giống hệt nhau.", ".read() trả về 1 chuỗi String nguyên khối. .readlines() cắt file thành List các dòng.", ".readlines() đọc nhanh hơn.", ".read() trả về list."], correctAnswer: 1, explanation: ".read() trả về dạng String. .readlines() chẻ khối đó ra thành một Mảng (List) dựa trên các ký tự xuống dòng `\\n`.", hint: "Lines số nhiều là mảng List." },
  { id: 289, topic: "Nâng cao: K-Means Initialization", difficulty: "Trung bình", question: "Bước ĐẦU TIÊN NHẤT của thuật toán phân cụm K-Means là gì?", code: "", options: ["Tính khoảng cách Euclid.", "Cập nhật tâm cụm.", "Lựa chọn K điểm ngẫu nhiên để làm các tâm cụm (Centroids) ban đầu.", "Trộn mảng."], correctAnswer: 2, explanation: "K-Means bắt buộc phải Khởi tạo (Initialize) ngẫu nhiên vị trí của K tâm cụm trước khi có thể bắt đầu các vòng lặp gom nhóm.", hint: "Phải có hạt nhân trước." },
  { id: 290, topic: "Nâng cao: deque O(1)", difficulty: "Trung bình", question: "Thao tác `popleft()` trên `collections.deque` có độ phức tạp thời gian là bao nhiêu?", code: "", options: ["O(N)", "O(1)", "O(log N)", "O(N^2)"], correctAnswer: 1, explanation: "Nhờ cấu trúc danh sách liên kết kép (doubly linked list), deque lấy và xóa phần tử ở cả 2 đầu mảng đều tốn thời gian hằng số cực nhanh O(1).", hint: "Nhanh như chớp." },
  { id: 291, topic: "ND03: Float Precision IEEE 754", difficulty: "Khó", question: "Phép so sánh số thực này trả về gì?", code: "print(0.1 + 0.2 == 0.3)", options: ["True", "False", "Error", "None"], correctAnswer: 1, explanation: "Do giới hạn biểu diễn dấu phẩy động nhị phân (IEEE 754), 0.1 + 0.2 trong máy tính ra 0.30000000000000004, nên không bằng đúng 0.3.", hint: "Số thực trên máy tính bị sai số vi ly." },
  { id: 292, topic: "ND04: Bẫy so sánh chuỗi (Chained comparison)", difficulty: "Khó", question: "Luồng chạy của toán tử bẻ gãy này in ra gì?", code: "print(5 > 4 == True)", options: ["True", "False", "Error", "SyntaxError"], correctAnswer: 1, explanation: "Python chain comparison ngầm chèn chữ 'and'. Cú pháp dịch thành `(5 > 4) and (4 == True)`. Vế trái là True, nhưng vế phải `4 == 1` là False. Nên kết quả là False.", hint: "Nhét thêm chữ AND vào giữa số 4." },
  { id: 293, topic: "ND05: Rò rỉ biến lặp (Loop Leak)", difficulty: "Khó", question: "Biến `x` có tồn tại sau vòng lặp không?", code: "for x in range(3):\n    pass\nprint(x)", options: ["Không, lỗi NameError", "Có, in ra 2", "Có, in ra 3", "Có, in ra 0"], correctAnswer: 1, explanation: "Vòng lặp for của Python KHÔNG tạo scope cục bộ. Biến `x` bị rò rỉ (leak) ra môi trường bên ngoài mang giá trị của lần lặp cuối cùng (số 2).", hint: "Biến lặp không bị giam giữ." },
  { id: 294, topic: "ND06: UnboundLocalError Trap", difficulty: "Khó", question: "Tại sao gọi hàm `f()` văng lỗi?", code: "x = 10\ndef f():\n    x += 1\nf()", options: ["Cú pháp += sai", "Lệnh gán `+=` khóa x thành biến cục bộ, nhưng nó chưa có giá trị ở cục bộ để tính phép cộng.", "Phải import thư viện", "Không có lỗi"], correctAnswer: 1, explanation: "Hễ có lệnh GÁN (`=`, `+=`) trong hàm, Python mặc định biến đó là Local. Lúc thi hành vế phải `x + 1`, local x chưa được khởi tạo giá trị -> UnboundLocalError.", hint: "Lệnh gán tự động tạo biến Local." },
  { id: 295, topic: "ND06: Closure Late Binding", difficulty: "Khó", question: "Mảng closure này dính bẫy Late Binding. Nó in ra gì?", code: "funcs = [lambda: i for i in range(3)]\nprint([f() for f in funcs])", options: ["[0, 1, 2]", "[2, 2, 2]", "[3, 3, 3]", "Lỗi"], correctAnswer: 1, explanation: "Các hàm `lambda` không lưu cứng giá trị `i` lúc tạo, mà trỏ đến địa chỉ của biến `i`. Khi vòng lặp range chạy xong, `i=2`. Lúc mảng comprehension gọi `f()`, tất cả đều nhìn thấy `i` hiện tại là 2.", hint: "Chỉ lấy giá trị tại thời điểm thực thi hàm." },
  { id: 296, topic: "ND07: Dictionary Unhashable Key", difficulty: "Khó", question: "Lỗi phát sinh ở đây là gì?", code: "d = {(1, [2]): 'A'}", options: ["Lỗi SyntaxError", "Lỗi KeyError", "Lỗi TypeError: unhashable type: 'list'", "Chạy bình thường"], correctAnswer: 2, explanation: "Tuple `(1, [2])` chứa 1 List khả biến bên trong. Do đó bản thân Tuple này bị nhiễm bẩn trở thành Không thể băm (Unhashable), cấm dùng làm Key cho Dict.", hint: "Trong ruột có chứa list thì tổng thể cũng hỏng." },
  { id: 297, topic: "ND09: MRO Kim Cương", difficulty: "Khó", question: "MRO quét nhánh nào trước trong cấu trúc Đa kế thừa `class D(B, C)`?", code: "class A: pass\nclass B(A): pass\nclass C(A): pass\nclass D(B, C): pass", options: ["Quét A trước", "Quét C trước", "Quét B trước, rồi C, cuối cùng mới lên A", "Quét ngẫu nhiên"], correctAnswer: 2, explanation: "Thuật toán C3 của Python quét ngang các nhánh (từ trái qua phải B rồi C) và luôn hoãn quét lớp tổ tiên chung (A) cho đến khi duyệt hết đám con cháu nhánh ngang của nó.", hint: "Quét ngang xong mới quét dọc." },
  { id: 298, topic: "ND11: Tranh giành Return in Finally", difficulty: "Khó", question: "Hàm này trả về kết quả gì?", code: "def run():\n    try:\n        return 'Try'\n    finally:\n        return 'Finally'\nprint(run())", options: ["Try", "Finally", "Lỗi", "None"], correctAnswer: 1, explanation: "Khối `finally` có quyền lực tối cao. Lệnh `return 'Finally'` bên trong nó sẽ HỦY BỎ và GHI ĐÈ bất cứ lệnh `return` nào đang chờ ở khối Try trước khi thực sự thoát hàm.", hint: "Kẻ nói sau cùng luôn đúng." },
  { id: 299, topic: "ND12: Iterator File cạn kiệt", difficulty: "Khó", question: "Hàm `next()` thứ 2 sinh ra lỗi gì nếu file chỉ có 1 dòng văn bản?", code: "# File a.txt có 1 dòng\n# with open('a.txt') as f:\n# next(f); next(f)", options: ["KeyError", "StopIteration", "EOFError", "Không lỗi"], correctAnswer: 1, explanation: "File object là một Iterator. Khi gọi `next()` vượt quá số dòng hiện có (đáy file), nó sẽ ném ra ngoại lệ `StopIteration` đặc trưng của Iterator.", hint: "Hết dữ liệu để sinh ra." },
  { id: 300, topic: "Nâng cao: Bẫy Assert Tuple", difficulty: "Khó", question: "Lệnh `assert` này có bao giờ báo lỗi (AssertionError) không?", code: "assert (1 == 2, 'Lỗi toán học')", options: ["Có, văng lỗi ngay", "Không, chương trình chạy tiếp", "Lỗi SyntaxError", "Lỗi TypeError"], correctAnswer: 1, explanation: "Do bọc trong ngoặc đơn, biểu thức được đánh giá là một TUPLE KHÁC RỖNG (chứa giá trị False và chuỗi). Mọi Tuple khác rỗng đều mang giá trị Truthy. Do đó `assert True` luôn vượt qua thành công mà không báo lỗi.", hint: "Một Tuple có dữ liệu luôn được đánh giá là True." }
];

const EXAM_SETS = [
  { id: "SET_01", title: "Bộ Đề 01: ", description: "Ngân hàng 50 câu hỏi truy xuất luồng chạy, tập trung vào vòng lặp, scope, list dict và OOP cơ bản.", questionCount: 50, data: EXAM_SET_01_DATA },
  { id: "SET_02", title: "Bộ Đề 02: ", description: "Đi sâu vào Identity is/==, bẫy Mutable Defaults, Generator, MRO và K-Means.", questionCount: 50, data: EXAM_SET_02_DATA },
  { id: "SET_03", title: "Bộ Đề 03: ", description: "Khai thác De Morgan, Slicing nâng cao, Late vs Early Binding, Dead Exception và IEEE 754.", questionCount: 50, data: EXAM_SET_03_DATA },
  { id: "SET_04", title: "Bộ Đề 04: ", description: "Xoáy sâu vào rò rỉ biến (Loop leak), mảng 2 chiều nhân bản, và toán tử đoản mạch hiểm hóc.", questionCount: 50, data: EXAM_SET_04_DATA },
  { id: "SET_05", title: "Bộ Đề 05: ", description: "Khám phá ảo thuật Boolean, List Comprehension filter, File EOF và Class Scope.", questionCount: 50, data: EXAM_SET_05_DATA },
  { id: "SET_06", title: "Bộ Đề 06: ", description: "50 câu hỏi tinh hoa kiểm tra Float Precision, MRO phức tạp và cạm bẫy Assert Tuple.", questionCount: 50, data: EXAM_SET_06_DATA }
];

// Tất cả câu hỏi gom chung phục vụ Bookmark và Master Map
const ALL_QUESTIONS = [
  ...EXAM_SET_01_DATA,
  ...EXAM_SET_02_DATA,
  ...EXAM_SET_03_DATA,
  ...EXAM_SET_04_DATA,
  ...EXAM_SET_05_DATA,
  ...EXAM_SET_06_DATA
];

export default function App() {
  const [activeTab, setActiveTab] = useState('home'); // 'home', 'marathon', 'mock', 'results', 'bookmarks', 'profile'
  const [currentExam, setCurrentExam] = useState(null);
  const [questionsBank, setQuestionsBank] = useState([]);
  
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [answersState, setAnswersState] = useState({}); 
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [scoreXP, setScoreXP] = useState(0);
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [showHint, setShowHint] = useState(false);

  // Bộ lọc danh sách câu hỏi bên trái
  const [qSearchText, setQSearchText] = useState('');
  const [qDifficultyFilter, setQDifficultyFilter] = useState('Tất cả');

  // Quản lý Bookmark toàn cục tiện lợi
  const [globalBookmarks, setGlobalBookmarks] = useState({});

  // Mock Exam States
  const [mockActive, setMockActive] = useState(false);
  const [mockTimeRemaining, setMockTimeRemaining] = useState(3000);

  // Thông tin sinh viên UET
  const [studentName, setStudentName] = useState('Em Kien vibe ra cai linh tinh nay');
  const [studentMSSV, setStudentMSSV] = useState('25022299');
  const [studentTitle, setStudentTitle] = useState('Lập trình viên tập sự');

  // Đọc dữ liệu cá nhân từ LocalStorage (nếu có)
  useEffect(() => {
    const savedName = localStorage.getItem('uet_student_name');
    const savedMSSV = localStorage.getItem('uet_student_mssv');
    const savedTitle = localStorage.getItem('uet_student_title');
    const savedXP = localStorage.getItem('uet_student_xp');
    if (savedName) setStudentName(savedName);
    if (savedMSSV) setStudentMSSV(savedMSSV);
    if (savedTitle) setStudentTitle(savedTitle);
    if (savedXP) setScoreXP(parseInt(savedXP, 10));
  }, []);

  const saveProfile = (name, mssv, title) => {
    setStudentName(name);
    setStudentMSSV(mssv);
    setStudentTitle(title);
    localStorage.setItem('uet_student_name', name);
    localStorage.setItem('uet_student_mssv', mssv);
    localStorage.setItem('uet_student_title', title);
  };

  // Đồng hồ tính giờ
  useEffect(() => {
    let interval = null;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimer(prev => prev + 1);
        if (mockActive) {
          setMockTimeRemaining(prev => {
            if (prev <= 1) {
              clearInterval(interval);
              handleMockSubmit();
              return 0;
            }
            return prev - 1;
          });
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, mockActive]);

  // ==========================================
  // 3. XỬ LÝ PHÍM TẮT BÀN PHÍM (KEYBOARD NAVIGATION)
  // ==========================================
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Chỉ hoạt động khi đang ở chế độ thi / luyện tập và không tập trung vào ô input
      if (activeTab !== 'marathon' && activeTab !== 'mock') return;
      if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') return;

      const key = e.key.toLowerCase();
      
      // Chọn đáp án A, B, C, D (hoặc 1, 2, 3, 4)
      if (['a', '1'].includes(key)) handleSelectKeyOption(0);
      else if (['b', '2'].includes(key)) handleSelectKeyOption(1);
      else if (['c', '3'].includes(key)) handleSelectKeyOption(2);
      else if (['d', '4'].includes(key)) handleSelectKeyOption(3);
      
      // Xác nhận hoặc Qua câu tiếp theo bằng Enter / Space
      else if (key === 'enter') {
        e.preventDefault();
        if (!isAnswerSubmitted && selectedOption !== null && !mockActive) {
          handleAnswerSubmit();
        } else if (isAnswerSubmitted || mockActive) {
          nextQuestion();
        }
      }
      
      // Bật/Ẩn gợi ý bằng phím 'H'
      else if (key === 'h') {
        e.preventDefault();
        setShowHint(prev => !prev);
      }

      // Đánh dấu Bookmark bằng phím 'k'
      else if (key === 'k') {
        e.preventDefault();
        if (questionsBank[currentQuestionIdx]) {
          toggleBookmark(questionsBank[currentQuestionIdx].id);
        }
      }

      // Lùi câu bằng Mũi tên trái, Tiến câu bằng Mũi tên phải
      else if (e.key === 'ArrowLeft') {
        prevQuestion();
      } else if (e.key === 'ArrowRight') {
        nextQuestion();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeTab, currentQuestionIdx, selectedOption, isAnswerSubmitted, questionsBank, mockActive]);

  const handleSelectKeyOption = (optionIndex) => {
    if (isAnswerSubmitted && !mockActive) return; // Đã submit và không phải thi thử thì khóa
    setSelectedOption(optionIndex);
    if (mockActive) {
      // Lưu luôn trạng thái câu trả lời đối với chế độ thi thử
      const question = questionsBank[currentQuestionIdx];
      setAnswersState(prev => ({
        ...prev,
        [question.id]: {
          selected: optionIndex,
          isCorrect: optionIndex === question.correctAnswer,
          bookmarked: prev[question.id]?.bookmarked || false
        }
      }));
    }
  };

  const startMarathon = (examSet) => {
    setCurrentExam(examSet);
    setQuestionsBank(examSet.data);
    setActiveTab('marathon');
    setCurrentQuestionIdx(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setAnswersState({});
    setStreak(0);
    setScoreXP(prev => prev);
    setTimer(0);
    setIsTimerRunning(true);
    setMockActive(false);
  };

  const startMockExam = (examSet) => {
    setCurrentExam(examSet);
    const shuffled = [...examSet.data].sort(() => 0.5 - Math.random());
    setQuestionsBank(shuffled);
    setActiveTab('mock');
    setCurrentQuestionIdx(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setAnswersState({});
    setTimer(0);
    setMockTimeRemaining(1800); // Đề thi thử UET chuẩn: 30 phút (1800 giây)
    setIsTimerRunning(true);
    setMockActive(true);
  };

  const handleMockSubmit = () => {
    setIsTimerRunning(false);
    setMockActive(false);
    setActiveTab('results');
  };

  const handleAnswerSubmit = () => {
    if (selectedOption === null) return;
    
    const question = questionsBank[currentQuestionIdx];
    const isCorrect = selectedOption === question.correctAnswer;
    
    if (isCorrect) {
      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak > maxStreak) setMaxStreak(newStreak);
      const addedXP = 100 + (newStreak >= 3 ? 50 : 0);
      setScoreXP(prev => {
        const nextXP = prev + addedXP;
        localStorage.setItem('uet_student_xp', nextXP.toString());
        return nextXP;
      });
    } else {
      setStreak(0);
    }

    setAnswersState(prev => ({
      ...prev,
      [question.id]: {
        selected: selectedOption,
        isCorrect: isCorrect,
        bookmarked: prev[question.id]?.bookmarked || globalBookmarks[question.id] || false
      }
    }));

    setIsAnswerSubmitted(true);
  };

  const toggleBookmark = (qId) => {
    setGlobalBookmarks(prev => {
      const updated = { ...prev, [qId]: !prev[qId] };
      // Đồng bộ vào trạng thái câu hỏi hiện thời
      setAnswersState(old => {
        if (old[qId]) {
          return { ...old, [qId]: { ...old[qId], bookmarked: updated[qId] } };
        }
        return old;
      });
      return updated;
    });
  };

  const nextQuestion = () => {
    if (currentQuestionIdx < questionsBank.length - 1) {
      setCurrentQuestionIdx(prev => prev + 1);
      const nextQ = questionsBank[currentQuestionIdx + 1];
      const saved = answersState[nextQ.id];
      if (saved) {
        setSelectedOption(saved.selected);
        setIsAnswerSubmitted(!mockActive);
      } else {
        setSelectedOption(null);
        setIsAnswerSubmitted(false);
      }
      setShowHint(false);
    } else if (!mockActive) {
      setIsTimerRunning(false);
      setActiveTab('results');
    }
  };

  const prevQuestion = () => {
    if (currentQuestionIdx > 0) {
      setCurrentQuestionIdx(prev => prev - 1);
      const prevQ = questionsBank[currentQuestionIdx - 1];
      const saved = answersState[prevQ.id];
      setSelectedOption(saved ? saved.selected : null);
      setIsAnswerSubmitted(!!saved);
      setShowHint(false);
    }
  };

  // Tính toán kết quả
  const resultsMetrics = useMemo(() => {
    let correct = 0;
    let wrong = 0;
    let total = questionsBank.length;
    const topicStats = {};
    
    questionsBank.forEach(q => {
      if (!topicStats[q.topic]) {
        topicStats[q.topic] = { total: 0, correct: 0 };
      }
      topicStats[q.topic].total += 1;

      const state = answersState[q.id];
      if (state) {
        if (state.isCorrect) {
          correct += 1;
          topicStats[q.topic].correct += 1;
        } else {
          wrong += 1;
        }
      }
    });

    const unanswered = total - (correct + wrong);
    return { correct, wrong, unanswered, total, topicStats };
  }, [answersState, questionsBank]);

  // Bộ lọc danh sách câu hỏi ở thanh điều hướng bên trái
  const filteredQuestionsBank = useMemo(() => {
    return questionsBank.map((q, idx) => ({ ...q, originalIndex: idx })).filter(q => {
      const matchSearch = q.question.toLowerCase().includes(qSearchText.toLowerCase()) || q.topic.toLowerCase().includes(qSearchText.toLowerCase());
      const matchDifficulty = qDifficultyFilter === 'Tất cả' || q.difficulty === qDifficultyFilter;
      return matchSearch && matchDifficulty;
    });
  }, [questionsBank, qSearchText, qDifficultyFilter]);

  // Thống kê tiến độ học tập toàn bộ các đề
  const globalMasteryStats = useMemo(() => {
    const total = ALL_QUESTIONS.length;
    const bookmarksCount = Object.values(globalBookmarks).filter(Boolean).length;
    return { total, bookmarksCount };
  }, [globalBookmarks]);

  // Mở khóa danh hiệu UET vui nhộn dựa trên câu đúng
  const unlockedAchievements = useMemo(() => {
    const list = [];
    const savedAnswers = Object.values(answersState);
    const correctCount = savedAnswers.filter(a => a.isCorrect).length;

    if (scoreXP >= 100) {
      list.push({ title: "Chiến binh Hello World", desc: "Đạt được 100 XP đầu tiên." });
    }
    if (maxStreak >= 5) {
      list.push({ title: "Combo Sấm Sét", desc: "Đạt chuỗi trả lời đúng liên tiếp từ 5 câu trở lên." });
    }
    if (Object.values(globalBookmarks).filter(Boolean).length >= 5) {
      list.push({ title: "UET Siêng Năng", desc: "Đánh dấu lưu trữ hơn 5 câu hỏi khó để nghiên cứu." });
    }
    // Tìm hiểu xem có đúng câu Khó (UnboundLocal hay diamond)
    const solvedHardCount = Object.keys(answersState).filter(qId => {
      const q = ALL_QUESTIONS.find(item => item.id.toString() === qId.toString());
      return q && q.difficulty === 'Khó' && answersState[qId].isCorrect;
    }).length;

    if (solvedHardCount >= 1) {
      list.push({ title: "Phá Giải Ảo Giác", desc: "Trả lời đúng chính xác ít nhất 1 câu hỏi cấp độ Khó." });
    }
    if (solvedHardCount >= 5) {
      list.push({ title: "Trùm Phân Phối C3", desc: "Chiến thắng 5 cạm bẫy vùng nhớ và MRO kim cương!" });
    }
    return list;
  }, [scoreXP, maxStreak, globalBookmarks, answersState]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // ==========================================
  // RENDER: GIAO DIỆN LÀM BÀI QUY CHUẨN
  // ==========================================
  const renderQuizInterface = () => {
    if (!questionsBank.length) return null;
    const question = questionsBank[currentQuestionIdx];
    const isQuestionSaved = answersState[question.id];
    const savedAnswer = isQuestionSaved ? isQuestionSaved.selected : null;
    const isAnswerCorrect = isQuestionSaved ? isQuestionSaved.isCorrect : false;

    return (
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 animate-fadeIn">
        
        {/* PANEL TRÁI: DANH SÁCH CÂU HỎI & BỘ LỌC */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-zinc-950/90 border border-zinc-800 rounded-2xl p-5 space-y-4 shadow-xl">
            <div className="space-y-1">
              <h3 className="font-bold text-zinc-300 text-xs uppercase tracking-wider line-clamp-1">
                {currentExam?.title}
              </h3>
              <p className="text-[10px] text-emerald-400 font-mono">Chế độ: {mockActive ? 'Thi thử 30p' : 'Marathon tự do'}</p>
            </div>
            
            <div className="w-full bg-zinc-900 rounded-full h-1.5 overflow-hidden">
              <div 
                className="bg-emerald-500 h-full transition-all duration-300 shadow-[0_0_8px_rgba(16,185,129,0.5)]" 
                style={{ width: `${((currentQuestionIdx + 1) / questionsBank.length) * 100}%` }} 
              />
            </div>
            <div className="flex justify-between items-center text-xs text-zinc-400">
              <span>Tiến độ</span>
              <span className="font-mono text-zinc-200 font-bold">{currentQuestionIdx + 1}/{questionsBank.length} câu</span>
            </div>

            {/* BỘ LỌC CÂU HỎI TIỆN LỢI */}
            <div className="space-y-2 pt-2 border-t border-zinc-900">
              <div className="flex items-center gap-1.5 bg-zinc-900/60 border border-zinc-800 px-2.5 py-1.5 rounded-lg">
                <Icons.Search />
                <input 
                  type="text" 
                  placeholder="Tìm câu hỏi/chủ đề..." 
                  value={qSearchText}
                  onChange={(e) => setQSearchText(e.target.value)}
                  className="bg-transparent border-none text-xs focus:ring-0 w-full text-zinc-200 outline-none"
                />
              </div>

              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">Lọc độ khó:</span>
                <select 
                  value={qDifficultyFilter} 
                  onChange={(e) => setQDifficultyFilter(e.target.value)}
                  className="bg-zinc-900 border border-zinc-800 rounded px-1.5 py-0.5 text-[10px] text-zinc-300 focus:outline-none"
                >
                  <option value="Tất cả">Tất cả</option>
                  <option value="Dễ">Dễ</option>
                  <option value="Trung bình">Trung bình</option>
                  <option value="Khó">Khó</option>
                </select>
              </div>
            </div>

            {/* GRID HIỂN THỊ CÁC Ô SỐ CÂU HỎI */}
            <div className="grid grid-cols-5 gap-1.5 pt-2 overflow-y-auto max-h-[220px] pr-1 scrollbar-thin scrollbar-thumb-zinc-800">
              {filteredQuestionsBank.map((q) => {
                const qState = answersState[q.id];
                const isBookmarked = globalBookmarks[q.id];
                let btnStyle = "bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700";
                
                if (qState) {
                  if (mockActive) {
                    btnStyle = "bg-sky-600/30 border-sky-500 text-sky-400 font-bold";
                  } else {
                    btnStyle = qState.isCorrect 
                      ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400 font-bold" 
                      : "bg-rose-500/10 border-rose-500/30 text-rose-400 font-bold";
                  }
                }
                if (q.originalIndex === currentQuestionIdx) {
                  btnStyle += " ring-2 ring-emerald-400 ring-offset-2 ring-offset-[#09090b]";
                }

                return (
                  <button
                    key={q.id}
                    onClick={() => {
                      setCurrentQuestionIdx(q.originalIndex);
                      const saved = answersState[q.id];
                      setSelectedOption(saved ? saved.selected : null);
                      setIsAnswerSubmitted(mockActive ? false : !!saved);
                      setShowHint(false);
                    }}
                    className={`h-9 w-full rounded-lg border text-xs font-mono transition-all flex items-center justify-center relative ${btnStyle}`}
                  >
                    {q.originalIndex + 1}
                    {isBookmarked && (
                      <span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 bg-sky-400 rounded-full" />
                    )}
                  </button>
                );
              })}
            </div>

            {filteredQuestionsBank.length === 0 && (
              <p className="text-[10px] text-zinc-500 text-center py-2">Không tìm thấy câu hỏi phù hợp bộ lọc.</p>
            )}

            <div className="pt-3 border-t border-zinc-900 grid grid-cols-2 gap-2 text-[9px] text-zinc-400">
              <div className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-emerald-500" /><span>Chính xác</span></div>
              <div className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-rose-500" /><span>Chưa đúng</span></div>
              <div className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-sky-500" /><span>Đã chọn</span></div>
              <div className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-zinc-700" /><span>Chưa làm</span></div>
            </div>

            {mockActive && (
              <button 
                onClick={handleMockSubmit}
                className="w-full bg-rose-600 hover:bg-rose-500 text-zinc-950 font-black py-3 rounded-xl transition-all text-xs tracking-wider uppercase mt-4"
              >
                Nộp Bài Thi Ngay
              </button>
            )}
          </div>

          {/* TIPS PHÍM TẮT BAN ĐÊM CHO DÂN CÔNG NGHỆ */}
          <div className="bg-zinc-950/60 border border-zinc-800 rounded-2xl p-4 space-y-2 text-[11px] text-zinc-400">
            <span className="font-bold text-zinc-200 block uppercase tracking-wider text-[10px]">💡 Phím tắt Pro Coder:</span>
            <ul className="space-y-1 font-mono">
              <li>• <span className="text-emerald-400 font-bold">A, B, C, D</span>: Chọn đáp án</li>
              <li>• <span className="text-emerald-400 font-bold">Enter</span>: Gửi / Tiếp tục</li>
              <li>• <span className="text-emerald-400 font-bold">H</span>: Xem gợi ý</li>
              <li>• <span className="text-emerald-400 font-bold">K</span>: Bookmark câu hỏi</li>
              <li>• <span className="text-emerald-400 font-bold">← / →</span>: Lùi / Tiến câu hỏi</li>
            </ul>
          </div>
        </div>

        {/* DIỆN TÍCH CHÍNH: CHI TIẾT CÂU HỎI VÀ ĐÁP ÁN */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-6 relative shadow-2xl">
            
            <div className="flex items-center justify-between text-xs gap-2">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full font-bold">
                  {question.topic}
                </span>
                <span className={`px-2.5 py-0.5 rounded-md font-semibold ${
                  question.difficulty === 'Khó' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' : 
                  question.difficulty === 'Trung bình' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 
                  'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                }`}>
                  {question.difficulty}
                </span>
              </div>
              <button 
                onClick={() => toggleBookmark(question.id)} 
                className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-colors shrink-0"
                title="Đánh dấu xem lại (K)"
              >
                <Icons.Bookmark marked={globalBookmarks[question.id]} />
              </button>
            </div>

            <div className="space-y-4">
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-wide leading-relaxed">
                <span className="text-emerald-400 font-mono mr-2">Câu {currentQuestionIdx + 1}:</span>
                {question.question}
              </h2>

              {question.code && (
                <div className="rounded-2xl border border-zinc-800 bg-[#040405] p-5 font-mono text-xs sm:text-sm text-sky-300 overflow-x-auto shadow-inner whitespace-pre leading-relaxed">
                  {question.code}
                </div>
              )}
            </div>

            {/* LỰA CHỌN PHƯƠNG ÁN */}
            <div className="grid grid-cols-1 gap-3.5 pt-2">
              {question.options.map((option, idx) => {
                const isSelected = selectedOption === idx;
                let cardStyle = "border-zinc-800 bg-zinc-900/40 text-zinc-300 hover:bg-zinc-900 hover:border-zinc-700";

                if (mockActive) {
                  if (isSelected) {
                    cardStyle = "border-sky-500 bg-sky-950/20 text-sky-200 ring-1 ring-sky-500";
                  }
                } else {
                  if (isAnswerSubmitted) {
                    if (idx === question.correctAnswer) {
                      cardStyle = "border-emerald-500 bg-emerald-950/30 text-emerald-300 ring-1 ring-emerald-500";
                    } else if (isSelected) {
                      cardStyle = "border-rose-500 bg-rose-950/30 text-rose-300 ring-1 ring-rose-500";
                    } else {
                      cardStyle = "border-zinc-900 bg-zinc-950/20 text-zinc-600 cursor-not-allowed";
                    }
                  } else if (isSelected) {
                    cardStyle = "border-emerald-500 bg-emerald-950/20 text-emerald-300 ring-1 ring-emerald-500";
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={isAnswerSubmitted && !mockActive}
                    onClick={() => handleSelectKeyOption(idx)}
                    className={`p-4 rounded-xl border flex items-start gap-3.5 text-left text-xs sm:text-sm tracking-wide font-medium transition-all duration-200 ${cardStyle}`}
                  >
                    <span className="w-6 h-6 rounded-lg bg-zinc-800 text-zinc-400 font-mono text-xs font-bold flex items-center justify-center shrink-0">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="mt-0.5 leading-normal">{option}</span>
                  </button>
                );
              })}
            </div>

            {/* KHU VỰC THAO TÁC DI CHUYỂN */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-zinc-800">
              <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
                <button 
                  disabled={currentQuestionIdx === 0} 
                  onClick={prevQuestion} 
                  className="p-3 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800 text-zinc-200 rounded-xl transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center"
                  title="Mũi tên trái"
                >
                  <Icons.Back />
                </button>

                {activeTab !== 'mock' && !isAnswerSubmitted && (
                  <button 
                    onClick={() => setShowHint(!showHint)}
                    className="text-xs font-bold text-sky-400 hover:text-sky-300 py-2.5 px-4 rounded-lg bg-sky-500/5 hover:bg-sky-500/10 transition-colors"
                  >
                    {showHint ? "Ẩn gợi ý" : "Xem gợi ý (H)"}
                  </button>
                )}
              </div>

              <div className="w-full sm:w-auto flex justify-end">
                {mockActive ? (
                  <button
                    onClick={nextQuestion}
                    className="w-full sm:w-auto bg-zinc-100 hover:bg-white text-zinc-950 font-black px-6 py-3 rounded-xl transition-all text-xs tracking-wider uppercase flex items-center justify-center gap-2"
                  >
                    {currentQuestionIdx === questionsBank.length - 1 ? 'Xem lại toàn bộ đề' : 'Câu tiếp theo'}
                    <Icons.Next />
                  </button>
                ) : (
                  !isAnswerSubmitted ? (
                    <button
                      disabled={selectedOption === null}
                      onClick={handleAnswerSubmit}
                      className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 disabled:hover:bg-emerald-500 text-zinc-950 font-black px-8 py-3 rounded-xl transition-all text-xs tracking-wider uppercase shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                    >
                      Xác Nhận Đáp Án
                    </button>
                  ) : (
                    <button
                      onClick={nextQuestion}
                      className="w-full sm:w-auto bg-zinc-100 hover:bg-white text-zinc-950 font-black px-8 py-3 rounded-xl transition-all text-xs tracking-wider uppercase flex items-center justify-center gap-2"
                    >
                      {currentQuestionIdx === questionsBank.length - 1 ? 'Hoàn thành / Xem Kết quả' : 'Câu tiếp theo'}
                      <Icons.Next />
                    </button>
                  )
                )}
              </div>
            </div>

            {/* GỢI Ý */}
            {showHint && question.hint && (
              <div className="p-4 bg-sky-950/20 border border-sky-900/50 rounded-xl text-xs text-sky-400 flex gap-2.5 items-start">
                <Icons.Info />
                <span>Gợi ý: {question.hint}</span>
              </div>
            )}

            {/* GIẢI THÍCH CHI TIẾT SAU KHI SUBMIT CHẾ ĐỘ MARATHON */}
            {isAnswerSubmitted && !mockActive && (
              <div className="mt-6 pt-6 border-t border-zinc-800 space-y-4 animate-slideUp">
                <div className="flex items-center gap-2.5">
                  {selectedOption === question.correctAnswer ? (
                    <div className="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center font-bold">✓</div>
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20 flex items-center justify-center font-bold">✗</div>
                  )}
                  <div>
                    <h3 className={`font-black text-sm uppercase tracking-wider ${selectedOption === question.correctAnswer ? 'text-emerald-400 animate-pulse' : 'text-rose-400'}`}>
                      {selectedOption === question.correctAnswer ? 'ĐÁP ÁN CHÍNH XÁC! (+100 XP)' : 'HƠI TIẾC MỘT CHÚT, HÃY ĐỌC KỸ LÝ THUYẾT!'}
                    </h3>
                    <p className="text-zinc-500 text-xs mt-0.5">Phân tích logic lập trình Python chuẩn CPython</p>
                  </div>
                </div>

                <div className="p-5 bg-zinc-900/20 rounded-2xl border border-zinc-900 text-xs sm:text-sm leading-relaxed space-y-3">
                  <div className="flex items-start gap-2.5">
                    <Icons.Info />
                    <p className="text-zinc-300">
                      <span className="font-bold text-sky-400">Giải thích chi tiết: </span> 
                      {question.explanation}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 font-sans selection:bg-emerald-500 selection:text-black pb-12">
      
      {/* ==========================================
          HEADER: NAV BAR & CHỈ SỐ NHANH
         ========================================== */}
      <header className="border-b border-zinc-800 bg-[#09090b]/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => { setActiveTab('home'); setIsTimerRunning(false); setMockActive(false); }}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-sky-600 flex items-center justify-center font-bold text-lg text-white shadow-lg shadow-emerald-500/20">
              UET
            </div>
            <div>
              <h1 className="font-bold text-zinc-50 tracking-wide text-xs sm:text-sm md:text-base">COM1050 - Galaxy Engine</h1>
              <p className="text-[10px] text-emerald-400 font-mono font-bold">UET v9.1 Cosmic Pack</p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            {isTimerRunning && (
              <div className="flex items-center gap-1.5 bg-zinc-900/80 px-2.5 py-1.5 rounded-lg border border-zinc-800 text-xs font-mono">
                <Icons.Clock />
                <span className="text-zinc-300 font-bold">{mockActive ? `Còn: ${formatTime(mockTimeRemaining)}` : `${formatTime(timer)}`}</span>
              </div>
            )}
            
            <div className="flex items-center gap-2 text-xs bg-emerald-950/40 text-emerald-400 px-3 py-1.5 rounded-lg border border-emerald-800/50">
              <span className="font-bold font-mono">{scoreXP}</span>
              <span className="text-emerald-500 font-medium text-[10px]">XP</span>
            </div>

            {streak > 0 && (
              <div className="hidden sm:flex items-center gap-1 bg-orange-950/40 text-orange-400 px-2.5 py-1.5 rounded-lg border border-orange-800/50 text-xs">
                <Icons.Streak />
                <span className="font-bold text-[11px]">{streak} Combo!</span>
              </div>
            )}
            
            {activeTab !== 'home' && (
              <button 
                onClick={() => { setActiveTab('home'); setIsTimerRunning(false); setMockActive(false); }}
                className="text-xs text-zinc-400 hover:text-zinc-100 transition-colors py-1.5 px-3 border border-zinc-800 rounded-lg hover:bg-zinc-900"
              >
                Trang Chủ
              </button>
            )}
          </div>
        </div>
      </header>

      {/* TẬP TRUNG MENU DI CHUYỂN PHỤ */}
      <div className="bg-zinc-950 border-b border-zinc-900 py-2.5">
        <div className="max-w-7xl mx-auto px-4 flex gap-3 overflow-x-auto text-xs font-medium">
          <button 
            onClick={() => { setActiveTab('home'); setMockActive(false); setIsTimerRunning(false); }}
            className={`px-3 py-1 rounded-md transition-colors ${activeTab === 'home' ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-zinc-100'}`}
          >
            Bộ Đề Ôn Thi
          </button>
          <button 
            onClick={() => setActiveTab('bookmarks')}
            className={`px-3 py-1 rounded-md transition-colors flex items-center gap-1.5 ${activeTab === 'bookmarks' ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-zinc-100'}`}
          >
            Đã Đánh Dấu ({globalMasteryStats.bookmarksCount})
          </button>
          <button 
            onClick={() => setActiveTab('profile')}
            className={`px-3 py-1 rounded-md transition-colors flex items-center gap-1.5 ${activeTab === 'profile' ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-zinc-100'}`}
          >
            Hồ Sơ & Danh Hiệu
          </button>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-8">
        
        {/* ==========================================
            TAB: HOME (DANH SÁCH BỘ ĐỀ & THỐNG KÊ TIẾN ĐỘ)
           ========================================== */}
        {activeTab === 'home' && (
          <div className="space-y-10 animate-fadeIn">
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* QUẢNG CÁO GALAXY ENGINE BANNER */}
              <div className="lg:col-span-2 relative rounded-3xl overflow-hidden border border-zinc-800 bg-gradient-to-r from-zinc-950 to-zinc-900 py-10 px-6 sm:px-10 shadow-2xl flex flex-col justify-between">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.08),transparent_50%)]" />
                <div className="relative z-10 space-y-4">
                  <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-full text-xs font-semibold tracking-wider uppercase border border-emerald-500/20">
                    UET-VNU Computational Thinking & Python
                  </span>
                  <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                    Hệ Sinh Thái Ôn Thi <span className="bg-gradient-to-r from-emerald-400 to-sky-400 bg-clip-text text-transparent">COM1050 v9.1</span>
                  </h2>
                  <p className="text-zinc-400 max-w-xl text-xs sm:text-sm leading-relaxed">
                    Trang ôn tập khổng lồ gồm 6 bộ đề (Tổng 300 câu hỏi) bao quát toàn bộ lý thuyết, thuật toán và cạm bẫy nâng cao của Python. Chạy độc lập và tương tác hiệu quả trên mọi thiết bị.
                  </p>
                </div>

                <div className="pt-6 relative z-10 grid grid-cols-2 sm:grid-cols-3 gap-4 border-t border-zinc-800/60 mt-6">
                  <div>
                    <span className="text-[10px] text-zinc-500 block uppercase font-mono">Tác vụ bàn phím</span>
                    <span className="text-xs text-zinc-300 font-bold">A - B - C - D</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-zinc-500 block uppercase font-mono">Tổng câu hỏi</span>
                    <span className="text-xs text-emerald-400 font-bold">300 Câu Trắc Nghiệm</span>
                  </div>
                  <div className="hidden sm:block">
                    <span className="text-[10px] text-zinc-500 block uppercase font-mono">Mã Số Sinh Viên</span>
                    <span className="text-xs text-sky-400 font-bold">{studentMSSV}</span>
                  </div>
                </div>
              </div>

              {/* CARD THỐNG KÊ QUÁ TRÌNH TỰ HỌC */}
              <div className="bg-zinc-950/80 border border-zinc-800 rounded-3xl p-6 flex flex-col justify-between space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Icons.Brain />
                    <span>Mastery Map</span>
                  </h3>
                  <p className="text-xs text-zinc-500 mt-1">Hệ thống đo lường tiến độ giải quyết 300 cạm bẫy CPython.</p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-zinc-400">
                      <span>Tổng tiến trình</span>
                      <span className="font-bold text-zinc-200">300 câu hỏi</span>
                    </div>
                    <div className="h-2 w-full bg-zinc-900 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500" style={{ width: '100%' }} />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div className="bg-zinc-900/40 p-3 rounded-xl border border-zinc-900">
                      <span className="text-[10px] text-zinc-500 block">MSSV</span>
                      <span className="text-xs text-zinc-300 font-bold truncate block">{studentMSSV}</span>
                    </div>
                    <div className="bg-zinc-900/40 p-3 rounded-xl border border-zinc-900">
                      <span className="text-[10px] text-zinc-500 block">Kinh Nghiệm</span>
                      <span className="text-xs text-emerald-400 font-bold block">{scoreXP} XP</span>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => setActiveTab('profile')}
                  className="w-full bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-zinc-200 py-2.5 rounded-xl transition-colors text-xs font-bold"
                >
                  Cập nhật Profile & Đổi Danh Hiệu
                </button>
              </div>

            </div>

            {/* DANH SÁCH BỘ ĐỀ */}
            <div className="space-y-6">
              <h3 className="text-xl font-black text-white flex items-center gap-2">
                <Icons.BookOpen />
                <span>Danh Sách Bộ Đề Thi (Exam Sets)</span>
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {EXAM_SETS.map((exam) => (
                  <div key={exam.id} className="bg-zinc-950/60 border border-zinc-800 rounded-3xl p-6 hover:border-emerald-500/40 transition-colors group flex flex-col shadow-lg shadow-black/40">
                    <div className="flex justify-between items-start mb-4">
                      <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform duration-300">
                        <Icons.Brain />
                      </div>
                      <span className="px-3 py-1 bg-zinc-900 text-zinc-400 border border-zinc-800 text-xs rounded-full font-mono font-bold">
                        {exam.questionCount} Câu Hỏi
                      </span>
                    </div>
                    <h4 className="text-lg font-bold text-zinc-100 mb-2 group-hover:text-emerald-400 transition-colors">{exam.title}</h4>
                    <p className="text-xs text-zinc-500 mb-6 flex-1 leading-relaxed line-clamp-3">{exam.description}</p>
                    
                    <div className="flex gap-3 pt-4 border-t border-zinc-800/50 mt-auto">
                      <button 
                        onClick={() => startMarathon(exam)} 
                        className="flex-1 bg-emerald-500/10 text-emerald-400 font-bold py-2.5 rounded-xl hover:bg-emerald-500 hover:text-zinc-950 transition-all border border-emerald-500/20 text-xs text-center"
                      >
                        Luyện Tự Do
                      </button>
                      <button 
                        onClick={() => startMockExam(exam)} 
                        className="flex-1 bg-sky-500/10 text-sky-400 font-bold py-2.5 rounded-xl hover:bg-sky-500 hover:text-zinc-950 transition-all border border-sky-500/20 text-xs text-center"
                      >
                        Thi Thử
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* ==========================================
            TAB: THI THỬ & LUYỆN TẬP INTERFACE ACTIVE
           ========================================== */}
        {(activeTab === 'marathon' || activeTab === 'mock') && renderQuizInterface()}

        {/* ==========================================
            TAB: KẾT QUẢ THI THỬ (RESULTS)
           ========================================== */}
        {activeTab === 'results' && (
          <div className="space-y-8 max-w-4xl mx-auto animate-slideUp">
            <div className="relative rounded-3xl overflow-hidden border border-zinc-800 bg-gradient-to-b from-zinc-950 to-zinc-900 p-8 sm:p-12 text-center shadow-2xl animate-fadeIn">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-500 to-sky-500" />
              <div className="max-w-md mx-auto space-y-6">
                <div className="flex justify-center">
                  <Icons.Trophy />
                </div>
                <div className="space-y-2">
                  <h2 className="text-2xl sm:text-3xl font-black text-white">Luyện tập Hoàn Tất!</h2>
                  <p className="text-zinc-400 text-xs sm:text-sm">Hệ thống đã ghi nhận toàn bộ kết quả của bạn cho {currentExam?.title}.</p>
                </div>

                <div className="grid grid-cols-3 gap-4 py-4">
                  <div className="bg-zinc-900/50 border border-zinc-800 p-4 rounded-2xl">
                    <span className="block text-2xl font-black text-emerald-400 font-mono">{resultsMetrics.correct}</span>
                    <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-semibold">Chính xác</span>
                  </div>
                  <div className="bg-zinc-900/50 border border-zinc-800 p-4 rounded-2xl">
                    <span className="block text-2xl font-black text-rose-400 font-mono">{resultsMetrics.wrong}</span>
                    <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-semibold">Bị Sai</span>
                  </div>
                  <div className="bg-zinc-900/50 border border-zinc-800 p-4 rounded-2xl">
                    <span className="block text-xl font-black text-sky-400 font-mono">{resultsMetrics.unanswered}</span>
                    <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-semibold">Bỏ qua</span>
                  </div>
                </div>

                <div className="bg-zinc-900/30 border border-zinc-800 p-4 rounded-xl text-xs flex justify-between text-zinc-400">
                  <span>Tổng thời gian thực hiện:</span>
                  <span className="font-mono text-zinc-200 font-bold">{formatTime(timer)}</span>
                </div>
              </div>
            </div>

            {/* PHÂN TÍCH THEO CHỦ ĐỀ */}
            <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Icons.Brain />
                <span>Hiệu Suất Theo Chủ Đề</span>
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(resultsMetrics.topicStats).map(([topic, stats], idx) => {
                  const percent = Math.round((stats.correct / stats.total) * 100) || 0;
                  let barColor = 'bg-rose-500';
                  if (percent >= 80) barColor = 'bg-emerald-500';
                  else if (percent >= 50) barColor = 'bg-amber-500';
                  
                  return (
                    <div key={idx} className="space-y-2 bg-zinc-900/20 p-3.5 rounded-xl border border-zinc-900">
                      <div className="flex items-center justify-between text-xs sm:text-sm">
                        <span className="font-bold text-zinc-300 truncate max-w-[200px] block" title={topic}>{topic}</span>
                        <span className="font-semibold text-zinc-400 shrink-0 font-mono">{stats.correct}/{stats.total} ({percent}%)</span>
                      </div>
                      <div className="h-2 w-full bg-zinc-900 rounded-full overflow-hidden">
                        <div className={`h-full ${barColor} transition-all duration-500`} style={{ width: `${percent}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex justify-center gap-4">
              <button 
                onClick={() => startMarathon(currentExam)}
                className="bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-black px-6 py-3 rounded-xl transition-all shadow-lg text-xs tracking-wider uppercase"
              >
                Làm Lại Đề Này
              </button>
              <button 
                onClick={() => setActiveTab('home')}
                className="bg-zinc-900 hover:bg-zinc-800 text-zinc-100 font-bold px-6 py-3 rounded-xl border border-zinc-800 transition-all text-xs tracking-wider uppercase"
              >
                Về Trang Chủ
              </button>
            </div>
          </div>
        )}

        {/* ==========================================
            TAB: BOOKMARKS TẬP TRUNG (QUẢN LÝ BOOKMARKS)
           ========================================== */}
        {activeTab === 'bookmarks' && (
          <div className="space-y-6 max-w-4xl mx-auto animate-fadeIn">
            <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Icons.Bookmark marked={true} />
                <span>Kho Câu Hỏi Khó Đã Lưu</span>
              </h2>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Nơi tập hợp tất cả các câu hỏi bạn đã click vào nút bookmark trong quá trình làm bài thi hoặc luyện đề độc lập. Bạn có thể xem nhanh giải thích tại đây.
              </p>
            </div>

            <div className="space-y-4">
              {ALL_QUESTIONS.filter(q => globalBookmarks[q.id]).map((q, idx) => (
                <div key={q.id} className="bg-zinc-950 border border-zinc-900 rounded-2xl p-5 space-y-4 hover:border-zinc-800 transition-colors">
                  <div className="flex justify-between items-start gap-4">
                    <span className="text-[10px] bg-sky-500/10 text-sky-400 border border-sky-500/20 px-2 py-0.5 rounded-full font-bold">
                      {q.topic}
                    </span>
                    <button 
                      onClick={() => toggleBookmark(q.id)}
                      className="text-xs text-rose-400 hover:text-rose-300 transition-colors"
                    >
                      Bỏ Đánh Dấu
                    </button>
                  </div>

                  <h3 className="text-sm font-bold text-zinc-100 leading-relaxed">{q.question}</h3>
                  
                  {q.code && (
                    <pre className="p-4 bg-black/60 rounded-xl font-mono text-xs text-sky-300 overflow-x-auto leading-relaxed">{q.code}</pre>
                  )}

                  <div className="pt-3 border-t border-zinc-900/60 text-xs text-zinc-400 space-y-1.5">
                    <p><span className="text-emerald-400 font-bold">Đáp án chính xác: </span>{q.options[q.correctAnswer]}</p>
                    <p className="bg-zinc-900/40 p-3 rounded-lg text-[11px] text-zinc-300 leading-relaxed mt-2">
                      <span className="font-bold text-sky-400 block mb-1">💡 Giải thích:</span> {q.explanation}
                    </p>
                  </div>
                </div>
              ))}

              {ALL_QUESTIONS.filter(q => globalBookmarks[q.id]).length === 0 && (
                <div className="p-12 border border-dashed border-zinc-800 text-center rounded-2xl">
                  <p className="text-sm text-zinc-500">Bạn chưa đánh dấu câu hỏi nào. Hãy nhấp vào biểu tượng Bookmark khi đang làm bài thi để xem lại tại đây nhé!</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ==========================================
            TAB: PROFILE & DANH HIỆU
           ========================================== */}
        {activeTab === 'profile' && (
          <div className="space-y-8 max-w-4xl mx-auto animate-fadeIn">
            
            {/* THAY ĐỔI THÔNG TIN */}
            <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Icons.User />
                  <span>Hồ Sơ Sinh Viên UET</span>
                </h2>
                <p className="text-xs text-zinc-500 mt-1">Cá nhân hóa trải nghiệm học tập của bạn trên hệ thống.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] text-zinc-400 uppercase font-mono font-bold">Họ Tên Sinh Viên</label>
                  <input 
                    type="text" 
                    value={studentName} 
                    onChange={(e) => saveProfile(e.target.value, studentMSSV, studentTitle)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-zinc-400 uppercase font-mono font-bold">Mã Số Sinh Viên (MSSV)</label>
                  <input 
                    type="text" 
                    value={studentMSSV} 
                    onChange={(e) => saveProfile(studentName, e.target.value, studentTitle)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-zinc-400 uppercase font-mono font-bold">Lựa Chọn Danh Hiệu Chiến Thần</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {[
                    'Lập trình viên tập sự',
                    'Chiến thần gõ phím',
                    'C3 Linearization Master',
                    'UET Pro Coder',
                    'Kẻ Thách Thức Điểm 10'
                  ].map((title) => (
                    <button
                      key={title}
                      onClick={() => saveProfile(studentName, studentMSSV, title)}
                      className={`p-3 text-xs font-semibold rounded-xl border transition-all text-left ${studentTitle === title ? 'border-emerald-500 bg-emerald-950/20 text-emerald-400 ring-1 ring-emerald-500' : 'border-zinc-800 text-zinc-400 hover:border-zinc-700'}`}
                    >
                      {title}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* DANH HIỆU ĐÃ MỞ KHÓA */}
            <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Icons.Award />
                <span>Danh Hiệu Trận Chiến (Achievements)</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {unlockedAchievements.map((ach, idx) => (
                  <div key={idx} className="bg-zinc-900/30 border border-emerald-500/20 p-4 rounded-2xl flex items-start gap-3.5 shadow-lg">
                    <div className="p-2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-xl">
                      <Icons.Award />
                    </div>
                    <div>
                      <h4 className="font-bold text-zinc-100 text-sm">{ach.title}</h4>
                      <p className="text-xs text-zinc-500 mt-1">{ach.desc}</p>
                    </div>
                  </div>
                ))}

                {unlockedAchievements.length === 0 && (
                  <p className="text-xs text-zinc-500 text-center py-6 col-span-2">Hãy bắt đầu ôn luyện và trả lời đúng nhiều câu hỏi để mở khóa các danh hiệu chiến hữu nhé!</p>
                )}
              </div>
            </div>

          </div>
        )}

      </main>
    </div>
  );
}