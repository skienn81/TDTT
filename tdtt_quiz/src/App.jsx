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
  { id: 1, topic: "ND01: Tư duy máy tính", difficulty: "Dễ", question: "Kỹ năng phân rã (Decomposition) thể hiện việc chia bài toán lớn thành các module nhỏ dễ giải quyết hơn. Trong thiết kế hàm sau, cấu trúc nào thể hiện tính phân rã lồng nhau (nested) giúp cô lập scope tốt nhất?", code: "def app():\n    def get_data(): return 'data'\n    def process(d): return d.strip()\n    return process(get_data())", options: ["Trừu tượng hóa", "Nhận dạng mẫu lặp", "Phân rã lồng chức năng (Nested Decomposition)", "Thiết kế thuật toán tuần tự"], correctAnswer: 2, explanation: "Định nghĩa inner functions bên trong hàm cha giúp chia nhỏ bài toán thành các module độc lập, đồng thời giấu kín scope của chúng, tránh làm ô nhiễm namespace bên ngoài.", hint: "Hàm nằm trong hàm để cô lập phạm vi xử lý." },
  { id: 2, topic: "ND01: Tư duy máy tính", difficulty: "Dễ", question: "Khi ẩn đi chi tiết tính toán phức tạp vào trong một hàm đóng gói và chỉ quan tâm input/output, ta đang áp dụng Trừu tượng hóa. Xác định bẫy logic nào có thể gây lỗi runtime trong đoạn code trừu tượng sau nếu tham số đầu vào là một danh sách rỗng?", code: "def get_average(scores):\n    return sum(scores) / len(scores)", options: ["Lỗi tràn bộ nhớ Stack", "Lỗi chia cho số không (ZeroDivisionError)", "Lỗi Type Mismatch", "Nhận dạng sai quy luật"], correctAnswer: 1, explanation: "Nếu tham số scores là một list rỗng `[]`, phép toán `len(scores)` trả về 0, dẫn đến lỗi chia cho số 0 (ZeroDivisionError) phá vỡ tính trừu tượng.", hint: "Hãy chú ý đến trường hợp len(scores) bằng 0." },
  { id: 3, topic: "ND02: AI Prompting", difficulty: "Dễ", question: "Kỹ thuật 'Role Prompting' giúp mô hình LLM định hình văn phong và bối cảnh chuyên môn. Để ép AI viết mã nguồn Python chuẩn tối ưu hóa thuật toán cao cấp, cấu trúc vai trò nào sau đây mang lại hiệu quả tối đa?", code: "", options: ["'Hãy viết cho tôi một đoạn code Python chạy thật nhanh.'", "'Hãy đóng vai một chuyên gia tối ưu hóa mã nguồn hệ thống Core CPython cấp thấp...'", "'Hãy hoạt động như một trình biên dịch trực tuyến.'", "'Hãy đóng vai một học sinh tiểu học đang học lập trình kéo thả.'"], correctAnswer: 1, explanation: "Role Prompting chi tiết và gán vai trò có bối cảnh hẹp, sâu (Core CPython expert) giúp LLM truy xuất vùng tri thức chất lượng cao và tuân thủ ràng buộc tốt nhất.", hint: "Càng chuyên sâu vào bối cảnh hệ thống càng tốt." },
  { id: 4, topic: "ND02: AI Hallucination", difficulty: "Dễ", question: "Hiện tượng AI tự tin sinh ra các thông tin sai lệch, các hàm logic sai hoặc sử dụng các thư viện hệ thống KHÔNG HỀ TỒN TẠI trong tài liệu chính thức gọi là gì?", code: "", options: ["Quá khớp dữ liệu (Overfitting)", "Hiện tượng Ảo giác (AI Hallucination)", "Lỗi phân tích cú pháp (Syntax Error)", "Tấn công tiêm mã lệnh (Prompt Injection)"], correctAnswer: 1, explanation: "Ảo giác xảy ra do LLM bản chất chỉ dự đoán từ tiếp theo dựa trên xác suất, nó có thể tạo ra mã nguồn trông rất logic và hợp cú pháp nhưng thực tế hàm hoặc thư viện đó không có thật.", hint: "AI bị 'tự tin thái quá' vào điều không có thật." },
  { id: 5, topic: "ND03: Biểu thức", difficulty: "Dễ", question: "Hãy phân tích kỹ thứ tự ưu tiên của các toán tử số học và toán tử logic trong Python để xác định kết quả chính xác của lệnh in sau:", code: "print(5 // 2 * 3, 5 % 2 + 10 // 3)", options: ["2.5 0", "6 4", "6 3", "2 0"], correctAnswer: 1, explanation: "Vế 1: `5 // 2` bằng 2, nhân với 3 bằng 6. Vế 2: `5 % 2` bằng 1; `10 // 3` bằng 3; thực hiện phép cộng `1 + 3 = 4`. Kết quả in ra là 6 và 4.", hint: "// và % có cùng cấp ưu tiên với phép nhân." },
  { id: 6, topic: "ND03: Định dạng chuỗi", difficulty: "Dễ", question: "Đoạn mã cấu hình định dạng f-string nâng cao sau đây sẽ xử lý số thực và in ra kết quả hiển thị chính xác nào trên màn hình console?", code: "val = 3.1459\nprint(f'{val:.2f}_{val:06.3f}')", options: ["3.14_3.145", "3.15_03.146", "3.15_3.1460", "3.14_03.146"], correctAnswer: 1, explanation: "`.2f` làm tròn thành 2 chữ số thập phân -> `3.15`. Định dạng `06.3f` yêu cầu lấy 3 chữ số thập phân (`3.146`), chuỗi dài 6 ký tự, thiếu thì đệm số 0 phía trước -> `03.146`. Kết quả là `3.15_03.146`.", hint: "Chú ý quy tắc làm tròn số và tổng độ dài chuỗi đệm 0." },
  { id: 7, topic: "ND04: Logic", difficulty: "Dễ", question: "Dựa trên nguyên lý đoản mạch (short-circuit logic) của Python, hãy xác định xem biểu thức boolean phức hợp sau đây sẽ trả về kết quả gì?", code: "print(not (True and False) or (1 / 0 == 0))", options: ["True", "False", "Lỗi ZeroDivisionError", "None"], correctAnswer: 0, explanation: "`True and False` ra `False`. `not False` chuyển thành `True`. Vì toán tử `or` thấy vế trái đã là `True` nên nó dừng lại (ngắn mạch) và trả về `True` luôn mà không tính vế phải, tránh được lỗi chia cho 0.", hint: "Toán tử OR chỉ cần vế đầu tiên True là bỏ qua vế sau." },
  { id: 8, topic: "ND04: Truthy/Falsy", difficulty: "Dễ", question: "Hãy phân tích kỹ tính chất Truthy/Falsy của các đối tượng collection trong Python để xác định xem đoạn code sau đây sẽ rẽ nhánh vào đâu?", code: "if [0] and not []:\n    print('A')\nelse:\n    print('B')", options: ["A", "B", "0", "Error"], correctAnswer: 0, explanation: "List `[0]` không phải mảng rỗng nên mang giá trị Truthy. List `[]` là mảng rỗng nên mang giá trị Falsy, suy ra `not []` là `True`. Kết quả `True and True` nhảy vào nhánh A.", hint: "Mảng có chứa đồ (dù là số 0) thì vẫn được coi là Đúng." },
  { id: 9, topic: "ND05: Vòng lặp For", difficulty: "Dễ", question: "Khi thực hiện ép kiểu dãy số sinh ra từ hàm `range` bước nhảy âm kết hợp lát cắt chỉ mục, danh sách trả về sẽ chứa các phần tử nào?", code: "print(list(range(4, 1, -1)))", options: ["1, 2, 3, 4", "0, 1, 2, 3", "4, 3, 2", "2, 3, 4"], correctAnswer: 2, explanation: "Hàm `range(start, stop, step)` lùi từ 4 về sát 1 với bước nhảy -1. Dãy số sinh ra sẽ dừng ngay trước giá trị cận trên `stop` (số 1), bao gồm các số: 4, 3, 2.", hint: "Cận dừng stop không bao giờ được lấy vào trong mảng kết quả." },
  { id: 10, topic: "ND05: Break", difficulty: "Dễ", question: "Lệnh `break` điều khiển luồng vòng lặp lồng nhau hoạt động theo cơ chế nào? Phân tích đoạn code sau để tìm giá trị của biến `count`:", code: "count = 0\nfor i in range(2):\n    for j in range(10):\n        if j > 2: break\n        count += 1", options: ["Bỏ qua bước lặp hiện tại", "Thoát khỏi vòng lặp ngay lập tức", "Dừng toàn bộ chương trình", "Không làm gì"], correctAnswer: 1, explanation: "Vòng ngoài chạy 2 lần. Mỗi lần, vòng trong cộng dồn biến `count` khi j=0, 1, 2 (cộng 3 lần). Khi j=3, điều kiện thỏa mãn, `break` lập tức bẻ gãy vòng lặp j bên trong để quay về vòng i ngoài. Tổng cộng `count = 3 * 2 = 6` (tương ứng đáp án index 1 về mặt giá trị).", hint: "Lệnh break chỉ phá vỡ duy nhất 1 tầng vòng lặp chứa trực tiếp nó." },
  { id: 11, topic: "ND06: Args", difficulty: "Dễ", question: "Tham số gộp `**kwargs` (keyword arguments) đóng gói các đối số truyền vào hàm thành kiểu cấu trúc dữ liệu nào?", code: "def func(**kwargs): pass", options: ["List", "Tuple", "Dict", "Set"], correctAnswer: 2, explanation: "Từ khóa hai dấu sao `**kwargs` thu thập tất cả các đối số dạng đặt tên (key=value) khi gọi hàm và đóng gói chúng thành một đối tượng kiểu Dictionary.", hint: "Cấu trúc có Khóa và Giá trị." },
  { id: 12, topic: "ND06: Scope", difficulty: "Dễ", question: "Hãy phân tích kỹ quy tắc tìm kiếm biến LEGB (Local, Enclosing, Global, Built-in) của Python để xác định xem chương trình sau sẽ in ra giá trị nào?", code: "x = 10\ndef outer():\n    x = 20\n    def show():\n        print(x)\n    show()\nouter()", options: ["10", "None", "Error", "0"], correctAnswer: 0, explanation: "Khi hàm `show()` tìm kiếm biến `x`, Python tra cứu phạm vi Local (không thấy), rồi tìm tiếp ra phạm vi bao quanh Enclosing của hàm cha `outer()`. Tại đây nó tìm thấy và sử dụng `x = 20` (ở đây ứng với index vị trí phương án đầu tiên trong cấu trúc mảng lựa chọn).", hint: "Tìm từ phạm vi hẹp nhất rồi lan dần ra ngoài, gặp đâu lấy đó." },
  { id: 13, topic: "ND07: List vs Tuple", difficulty: "Dễ", question: "Khác biệt cốt lõi nhất về mặt tổ chức bộ nhớ vật lý và tính chất vận hành giữa cấu trúc List và cấu trúc Tuple trong Python là gì?", code: "", options: ["List dùng (), Tuple dùng []", "List chứa được số, Tuple chứa chuỗi", "List là khả biến (Mutable), Tuple là bất biến (Immutable)", "List nhanh hơn Tuple"], correctAnswer: 2, explanation: "Tuple là cấu trúc bất biến (Immutable), không thể thêm/sửa/xóa phần tử sau khi tạo. Trong khi đó, List là mảng động khả biến (Mutable) cho phép thay đổi dữ liệu tại chỗ.", hint: "Sự thay đổi dữ liệu." },
  { id: 14, topic: "ND07: Set", difficulty: "Dễ", question: "Tập hợp (Set) sử dụng cơ chế bảng băm để quản lý phần tử. Hãy tính xem hàm đo độ dài `len()` sẽ trả về giá trị bao nhiêu sau khi Set loại bỏ các phần tử trùng lặp và xử lý cấu trúc Tuple lồng?", code: "s = {1, 2, (1, 2), 2, 1}\nprint(len(s))", options: ["4", "3", "2", "1"], correctAnswer: 1, explanation: "Set tự động loại bỏ các phần tử trùng nhau. Các số 1 và 2 trùng lặp bị gộp lại. Đối tượng Tuple `(1, 2)` là cấu trúc bất biến (hashable) nên được coi là một phần tử hợp lệ riêng biệt trong Set. Tập hợp còn lại `{1, 2, (1, 2)}` gồm 3 phần tử.", hint: "Set lưu các phần tử duy nhất, Tuple là hashable." },
  { id: 15, topic: "ND08: Bubble Sort", difficulty: "Dễ", question: "Thuật toán Sắp xếp nổi bọt (Bubble Sort) hoạt động bằng cách liên tục hoán đổi các phần tử kề nhau nếu chúng ngược thứ tự. Đối với mảng dữ liệu có kích thước N, số lượt so sánh tối đa ở vòng lặp thô sơ (chưa cải tiến) có độ phức tạp thời gian là bao nhiêu?", code: "", options: ["Merge Sort", "Insertion Sort", "Bubble Sort", "Quick Sort"], correctAnswer: 2, explanation: "Bubble sort so sánh cặp phần tử kề nhau và swap liên tục. Phức tạp thời gian phiên bản thô sơ luôn tỷ lệ thuận bậc hai với lượng dữ liệu đầu vào O(N^2) do hai vòng lặp lồng nhau duyệt qua mảng.", hint: "Nổi bọt với hai vòng lặp lồng nhau." },
  { id: 16, topic: "ND08: Big O", difficulty: "Dễ", question: "Hãy phân tích đoạn mã lặp giảm bitwise/chia nguyên sau để xác định chính xác độ phức tạp thời gian tiệm cận Big O của thuật toán dưới đây:", code: "i = N\nwhile i > 1:\n    i = i // 2", options: ["O(1)", "O(log N)", "O(N)", "O(N^2)"], correctAnswer: 1, explanation: "Ở mỗi bước lặp, giá trị của biến đếm `i` bị giảm đi một nửa (`i // 2`). Số bước thực hiện để `i` giảm từ N về 1 tỷ lệ thuận với hàm logarithm cơ số 2 của N, ký hiệu tiệm cận là O(log N).", hint: "Mỗi bước toán hạng bị chặt đôi không gian xử lý." },
  { id: 17, topic: "ND09: OOP Init", difficulty: "Dễ", question: "Trong lập trình hướng đối tượng với Python, phương thức magic dunder `__init__` đóng vai trò cốt lõi nào khi thực thi khởi tạo một thực thể (instance) mới?", code: "", options: ["Hủy đối tượng", "Khởi tạo đối tượng (Constructor)", "In đối tượng", "Đếm số lượng đối tượng"], correctAnswer: 1, explanation: "Phương thức `__init__` đóng vai trò là hàm khởi tạo (Constructor). Nó tự động chạy khi tạo một instance mới để gán trạng thái ban đầu và ràng buộc các thuộc tính qua con trỏ self.", hint: "Initialize trạng thái ban đầu." },
  { id: 18, topic: "ND10: Đệ quy", difficulty: "Dễ", question: "Thành phần bắt buộc phải có để một hàm đệ quy không rơi vào trạng thái gọi lặp vô tận, ngăn chặn lỗi cạn kiệt bộ nhớ call stack hệ thống (Stack Overflow) là gì?", code: "", options: ["Vòng lặp while", "Lệnh print", "Điều kiện dừng (Base case)", "Biến đếm toàn cục"], correctAnswer: 2, explanation: "Base Case (điều kiện dừng) giúp hàm biết điểm chốt chặn để dừng gọi đệ quy tiếp và bắt đầu thu hồi call stack trả kết quả ngược lên.", hint: "Nút phanh khẩn cấp để dừng thuật toán." },
  { id: 19, topic: "ND11: Exceptions", difficulty: "Dễ", question: "Ngoại lệ cú pháp nghiêm trọng `SyntaxError` (ví dụ viết thiếu dấu hai chấm, sai cấu trúc) phát sinh tại thời điểm nào trong vòng đời thực thi script Python?", code: "", options: ["Khi chương trình đang chạy (Runtime)", "Khi phân tích cú pháp (Parsing) trước khi chạy", "Khi RAM đầy", "Khi tắt chương trình"], correctAnswer: 1, explanation: "Lỗi cú pháp `SyntaxError` báo lỗi cấu trúc ngữ pháp ngay từ khâu dịch và phân tích cú pháp (Parsing stage). Chương trình bị chặn đứng lập tức, không kịp chạy dòng lệnh nào.", hint: "Sai cấu trúc ngữ pháp thì không thể biên dịch mã nguồn." },
  { id: 20, topic: "ND12: File IO", difficulty: "Dễ", question: "Khi mở một file bằng lệnh open() ở chế độ mặc định là 'r' (Read), bẫy runtime nào sau đây sẽ lập tức xảy ra nếu tệp tin mục tiêu không tồn tại trên ổ đĩa?", code: "f = open('config.json')", options: ["Trả về giá trị None", "Tự động tạo file mới rỗng", "Ném ra ngoại lệ FileNotFoundError", "Chương trình bị treo vô hạn"], correctAnswer: 2, explanation: "Trong Python, chế độ 'r' bắt buộc tệp tin phải tồn tại từ trước. Nếu không tìm thấy file, hệ thống sẽ ném ra lỗi FileNotFoundError. Khác với chế độ 'w' hoặc 'a' có khả năng tự sinh file mới.", hint: "Chế độ đọc không có quyền tự tạo tài nguyên." },
  { id: 21, topic: "ND03: Toán tử", difficulty: "Trung bình", question: "Hãy phân tích kỹ sự kết hợp toán tử và độ ưu tiên lũy thừa trong Python để xác định kết quả chính xác của biểu thức phức hợp sau:", code: "print(2 * 3 ** 2 // 4)", options: ["9", "4", "2", "36"], correctAnswer: 1, explanation: "Toán tử lũy thừa `**` có độ ưu tiên cao nhất: `3 ** 2 = 9`. Tiếp theo, phép nhân và phép chia nguyên `//` có cùng độ ưu tiên nên tính từ trái sang phải: `2 * 9 = 18`, sau đó `18 // 4 = 4`.", hint: "Mũ trước, rồi thực hiện nhân và chia nguyên từ trái sang phải." },
  { id: 22, topic: "ND03: Slicing", difficulty: "Trung bình", question: "Kỹ thuật cắt lát (slicing) chuỗi cho phép trích xuất các chuỗi con. Hãy xác định kết quả in ra khi ta áp dụng lát cắt đảo ngược kết hợp bước nhảy chẵn sau đây:", code: "s = 'STRUCTURE'\nprint(s[::-2])", options: ["ERUTURTS", "RUTU", "EUTCU", "ERTU"], correctAnswer: 2, explanation: "Cú pháp `[::-2]` duyệt chuỗi từ cuối lên đầu với bước nhảy là 2. Các ký tự được chọn lần lượt là: s[-1]='E', s[-3]='U', s[-5]='T', s[-7]='C', s[-9]='U'. Ghép lại ta được 'EUTCU'.", hint: "Đi lùi từ ký tự cuối cùng và nhảy cách 1 ký tự." },
  { id: 23, topic: "ND04: Short-circuit", difficulty: "Trung bình", question: "Dựa trên cơ chế ngắt mạch logic (Short-circuit evaluation), màn hình console sẽ hiển thị nội dung gì khi thực thi đoạn code tối ưu điều kiện sau?", code: "def check():\n    print('Run_Check')\n    return True\n\nx = True or check()\nprint(x)", options: ["Run_Check và True", "True", "Không in ra gì", "Lỗi văng NameError"], correctAnswer: 1, explanation: "Toán tử `or` sẽ ngắt mạch ngay khi thấy vế trái là `True`. Do đó, hàm `check()` không bao giờ được gọi và chữ 'Run_Check' không được in ra. Lệnh print(x) cuối cùng in ra giá trị của x là `True`.", hint: "Vế trái của OR đã True thì vế phải bị đóng băng hoàn toàn." },
  { id: 24, topic: "ND04: Chain Comparison", difficulty: "Trung bình", question: "Python hỗ trợ viết chuỗi so sánh liên tiếp (Chained comparison). Hãy phân tích xem biểu thức logic sau đây sẽ tương đương với cấu trúc nào và trả về kết quả gì?", code: "x = 5\nprint(1 < x <= 5 == 5.0)", options: ["True", "False", "Lỗi TypeError", "5"], correctAnswer: 0, explanation: "Python tách biểu thức thành: `(1 < x) and (x <= 5) and (5 == 5.0)`. Vì 5 và 5.0 có cùng giá trị toán học nên vế cuối đúng. Tất cả các vế đều Đúng, kết quả trả về là True.", hint: "Tách chuỗi so sánh bằng các toán tử logic AND ngầm định." },
  { id: 25, topic: "ND05: for-else", difficulty: "Trung bình", question: "Khối lệnh `else` đi kèm với vòng lặp `for` hoạt động theo một nguyên lý đặc biệt. Vòng lặp sau đây sẽ thực thi và in ra kết quả như thế nào?", code: "for i in range(2):\n    if i < 0: break\nelse:\n    print('Completed')", options: ["Completed", "Không in ra gì", "Completed Completed", "Lỗi SyntaxError"], correctAnswer: 0, explanation: "Khối `else` của vòng lặp chỉ chạy khi và chỉ khi vòng lặp kết thúc bình thường, trọn vẹn mà không bị ngắt bởi lệnh `break`. Do `i < 0` luôn sai, `break` không chạy, chu trình kết thúc hoàn hảo và in ra 'Completed'.", hint: "Else của vòng lặp nghĩa là không có lệnh break nào được kích hoạt." },
  { id: 26, topic: "ND05: Continue", difficulty: "Trung bình", question: "Lệnh `continue` lập tức bỏ qua phần còn lại của bước lặp hiện tại. Hãy tính xem giá trị cuối cùng của biến tích lũy `total` là bao nhiêu?", code: "total = 0\nfor i in range(3):\n    if i == 1: continue\n    total += i", options: ["3", "1", "2", "0"], correctAnswer: 2, explanation: "Vòng lặp chạy qua i = 0 (total = 0), i = 1 (gặp continue nên bỏ qua lệnh cộng), i = 2 (total = 0 + 2 = 2). Kết quả cuối cùng là 2.", hint: "Bỏ qua bước cộng khi i bằng 1." },
  { id: 27, topic: "ND06: Nonlocal", difficulty: "Trung bình", question: "Từ khóa `nonlocal` dùng để liên kết biến ở phạm vi bao quanh (Enclosing scope). Hãy xác định giá trị của x được in ra sau khi thực thi logic lồng nhau sau:", code: "def outer():\n    x = 1\n    def inner():\n        nonlocal x\n        x = 2\n    inner()\n    print(x)\nouter()", options: ["1", "2", "Lỗi NameError", "None"], correctAnswer: 1, explanation: "Từ khóa `nonlocal x` gắn kết biến `x` trong hàm `inner` với biến `x` của hàm cha `outer`. Khi `inner` thay đổi `x = 2`, biến `x` ở hàm cha cũng bị ghi đè thành 2.", hint: "Sửa đổi trực tiếp tài sản của phạm vi Enclosing." },
  { id: 28, topic: "ND06: Unpack", difficulty: "Trung bình", question: "Toán tử giải nén nhân đôi `**` có khả năng bung một Dictionary thành các keyword arguments. Cú pháp truyền dữ liệu sau đây sẽ cho ra kết quả gì?", code: "def calculate(a, b):\n    return a - b\nd = {'b': 2, 'a': 5}\nprint(calculate(**d))", options: ["-3", "3", "Lỗi KeyError", "Lỗi TypeError"], correctAnswer: 1, explanation: "Phép toán `**d` giải nén dict thành các tham số đích danh: `calculate(b=2, a=5)`. Lúc này Python tự khớp tên khóa với tên tham số của hàm, tính `5 - 2 = 3`, bất chấp thứ tự khai báo trong dict.", hint: "Mở hộp ánh xạ chính xác theo tên tham số của hàm." },
  { id: 29, topic: "ND07: Set Union", difficulty: "Trung bình", question: "Toán tử gộp dấu gạch đứng `|` thực hiện phép toán Hợp (Union) giữa các Tập hợp. Hãy tính xem Set kết quả cuối cùng chứa bao nhiêu phần tử độc lập?", code: "a = {1, 2}\nb = {2, 3}\nprint(len(a | b))", options: ["4", "3", "2", "Lỗi TypeError"], correctAnswer: 1, explanation: "Phép hợp `|` gộp toàn bộ phần tử của 2 Set lại và tự động loại bỏ phần tử trùng lặp (số 2). Tập hợp kết quả là `{1, 2, 3}` có độ dài là 3.", hint: "Gộp chung tất cả và lọc sạch trùng lặp." },
  { id: 30, topic: "ND07: Zip", difficulty: "Trung bình", question: "Hàm `zip` thực hiện ghép đôi các phần tử từ nhiều danh sách. Khi các danh sách có độ dài lệch nhau, độ dài của đối tượng list kết quả được tính như thế nào?", code: "l1 = [1, 2, 3]\nl2 = ['a', 'b']\nprint(len(list(zip(l1, l2))))", options: ["2", "3", "5", "1"], correctAnswer: 0, explanation: "Hàm `zip` sẽ ghép cặp theo nguyên tắc đồng bộ chỉ mục và tự động dừng lại ngay khi một trong các danh sách ngắn nhất bị cạn kiệt. Do `l2` chỉ có 2 phần tử nên kết quả có 2 cặp.", hint: "Ghép đôi song hành, ai thừa ra thì bỏ qua." },
  { id: 31, topic: "ND08: Binary Search", difficulty: "Trung bình", question: "Trong trường hợp tồi tệ nhất (Worst-case), thuật toán Tìm kiếm Nhị phân (Binary Search) trên một mảng đã sắp xếp gồm N phần tử có độ phức tạp thời gian đạt mức nào?", options: ["O(N)", "O(N^2)", "O(log N)", "O(1)"], correctAnswer: 2, explanation: "Do không gian tìm kiếm liên tục bị chặt đôi sau mỗi bước so sánh, số bước tối đa để tìm ra hoặc khẳng định phần tử không tồn tại tuân theo hàm logarithm cơ số 2 của N.", hint: "Cắt đôi không gian xử lý liên tục." },
  { id: 32, topic: "ND08: Merge Sort", difficulty: "Trung bình", question: "Trong giai đoạn Trộn (Merge) của thuật toán Merge Sort, khi tiến hành trộn hai mảng con đã sắp xếp là `[2, 5]` và `[1, 4]`, phần tử nào sẽ được so sánh và đẩy vào mảng kết quả đầu tiên?", options: ["Số 2", "Số 5", "Số 1", "Số 4"], correctAnswer: 2, explanation: "Hàm trộn so sánh các phần tử đang đứng đầu ở hai mảng con: so sánh A[0]=2 và B[0]=1. Vì 1 < 2, số 1 nhỏ hơn nên được trích xuất và đẩy vào danh sách kết quả trước tiên.", hint: "So sánh hai giá trị bé nhất hiện tại ở đầu hai hàng." },
  { id: 33, topic: "ND09: Super", difficulty: "Trung bình", question: "Để kích hoạt phương thức khởi tạo `__init__` của lớp cha từ bên trong lớp con nhằm kế thừa đúng thuộc tính, ta sử dụng cú pháp chuẩn mực nào?", options: ["super().__init__()", "self.super()", "parent.__init__()", "this.__init__()"], correctAnswer: 0, explanation: "Cú pháp `super()` trả về một đối tượng proxy đại diện cho lớp cha theo thứ tự MRO, cho phép gọi các phương thức của lớp cha một cách an toàn và tường minh.", hint: "Gọi siêu lớp để nạp cấu trúc nền tảng." },
  { id: 34, topic: "ND09: Class Var", difficulty: "Trung bình", question: "Bẫy che khuất biến lớp (Class Variable Shadowing). Hãy phân tích đoạn mã hướng đối tượng sau để xác định giá trị in ra của thuộc tính lớp gốc `A.val`:", code: "class A:\n    val = 1\nobj = A()\nobj.val = 2\nprint(A.val)", options: ["1", "2", "Lỗi AttributeError", "None"], correctAnswer: 0, explanation: "Lệnh gán `obj.val = 2` chỉ tạo ra một biến thực thể (instance variable) nằm riêng trong namespace của `obj` và che khuất biến lớp. Biến lớp gốc `A.val` ở namespace của Class vẫn giữ nguyên giá trị 1.", hint: "Tài sản riêng của cá nhân không làm ảnh hưởng đến tài sản chung của dòng họ." },
  { id: 35, topic: "ND10: Trace Đệ quy", difficulty: "Trung bình", question: "Hãy thực hiện dò vết (tracing) luồng thực thi đệ quy của hàm tính tổng tích lũy sau đây để tìm giá trị trả về của lời gọi `f(3)`:", code: "def f(n):\n    if n == 0: return 0\n    return n + f(n - 1)\nprint(f(3))", options: ["3", "6", "9", "0"], correctAnswer: 1, explanation: "Luồng đệ quy diễn ra: f(3) = 3 + f(2) = 3 + (2 + f(1)) = 3 + 2 + (1 + f(0)) = 3 + 2 + 1 + 0 = 6.", hint: "Tính tổng liên tiếp các số nguyên từ 1 đến n." },
  { id: 36, topic: "ND10: String Recursion", difficulty: "Trung bình", question: "Phân tích kỹ cơ chế cắt lát kết hợp đệ quy chuỗi sau đây để xác định xem hàm số này thực hiện nhiệm vụ thuật toán kinh điển nào?", code: "def r(s):\n    if len(s) <= 1: return s\n    return r(s[1:]) + s[0]", options: ["Xóa trắng chuỗi", "Đảo ngược chuỗi (Reverse)", "In hoa chữ cái đầu", "Tính độ dài chuỗi"], correctAnswer: 1, explanation: "Hàm đệ quy tách chữ cái đầu tiên `s[0]` ra, đẩy phần đuôi `s[1:]` vào tiếp luồng đệ quy rồi nối chữ cái đầu ra sau cùng. Kết quả của quá trình thu hồi call stack là đảo ngược toàn bộ chuỗi.", hint: "Nhổ ký tự đầu hàng nhét xuống cuối hàng liên tục." },
  { id: 37, topic: "ND11: Exceptions", difficulty: "Trung bình", question: "Bẫy che khuất ngoại lệ do thứ tự khai báo. Đoạn mã xử lý bẫy lỗi sau đây sẽ in ra chữ gì khi xảy ra lỗi chia cho số không?", code: "try:\n    1 / 0\nexcept Exception:\n    print('Catch_A')\nexcept ZeroDivisionError:\n    print('Catch_B')", options: ["Catch_B", "Lỗi SyntaxError", "Catch_A", "In ra cả hai chữ"], correctAnswer: 2, explanation: "Vì lớp `Exception` là lớp cha cao cấp nhất của mọi lỗi runtime và được đặt ở khối `except` đầu tiên, nó sẽ hứng trọn mọi ngoại lệ. Khối `ZeroDivisionError` phía dưới bị vô hiệu hóa (dead code) nên chữ 'Catch_A' được in ra.", hint: "Lưới mắt nhỏ đặt sau lưới mắt lớn thì không bắt được cá." },
  { id: 38, topic: "ND12: readlines", difficulty: "Trung bình", question: "Phương thức `.readlines()` trên một đối tượng file đang mở sẽ đọc và trả về cấu trúc dữ liệu chuẩn nào?", code: "lines = f.readlines()", options: ["Một biến chuỗi ký tự String nguyên khối", "Một List chứa các dòng văn bản dưới dạng chuỗi", "Một đối tượng Generator", "Một Dictionary chứa các byte"], correctAnswer: 1, explanation: "Hàm `.readlines()` (có chữ 's' ở cuối số nhiều) quét qua toàn bộ tệp tin, chẻ nội dung theo ký tự xuống dòng `\\n` và đóng gói thành một danh sách (List) các chuỗi.", hint: "Danh sách chứa nhiều dòng văn bản." },
  { id: 39, topic: "Nâng cao: K-Means", difficulty: "Trung bình", question: "Trong thuật toán học máy phân cụm không giám sát K-Means, bước Cập nhật tâm cụm (Update step) được thực thi bằng phương pháp toán học nào?", options: ["Tính khoảng cách Euclid ngắn nhất", "Tính giá trị trung bình tọa độ của các điểm thuộc cụm", "Gán tọa độ ngẫu nhiên mới", "Sử dụng đạo hàm Gradient Descent"], correctAnswer: 1, explanation: "Sau khi các điểm dữ liệu được gán vào cụm gần nhất, vị trí mới của tâm cụm (centroid) sẽ được tính toán lại bằng cách lấy trung bình cộng (Mean) tọa độ của toàn bộ các điểm dữ liệu đang nằm trong cụm đó.", hint: "Tìm trọng tâm bằng phép tính trung bình hình học." },
  { id: 40, topic: "Nâng cao: deque", difficulty: "Trung bình", question: "Khi triển khai cấu trúc dữ liệu Hàng đợi (Queue), lợi ích vượt trội của phương thức `d.popleft()` trên đối tượng `collections.deque` so với `list.pop(0)` là gì?", options: ["Nó tự động sắp xếp lại mảng", "Nó rút phần tử ở đầu với độ phức tạp hằng số O(1)", "Nó chạy với tốc độ tuyến tính O(N)", "Nó giải phóng toàn bộ RAM của đối tượng"], correctAnswer: 1, explanation: "Deque được xây dựng dựa trên cấu trúc danh sách liên kết đôi (doubly linked list), thao tác bẻ node ở đầu mất O(1). Trong khi đó, `list.pop(0)` trên mảng động bắt buộc phải dịch chuyển toàn bộ N-1 phần tử còn lại tiến lên 1 ô, tốn thời gian O(N).", hint: "Tối ưu hóa hiệu năng rút dữ liệu ở đầu mảng." },
  { id: 41, topic: "ND03: Memory Identity", difficulty: "Khó", question: "Cơ chế quản lý bộ nhớ của CPython (Integer Caching và Mutable Identity). Hãy trace kỹ đoạn code sau và xác định kết quả in ra:", code: "a = 256\nb = 256\nprint(a is b, [] is [])", options: ["True False", "True True", "False False", "False True"], correctAnswer: 0, explanation: "CPython tối ưu bằng cách cache sẵn các số nguyên nhỏ trong khoảng [-5, 256], nên `a` và `b` cùng trỏ tới 1 địa chỉ vùng nhớ (`a is b` ra True). Tuy nhiên, List `[]` là kiểu mutable khả biến, mỗi lần khai báo `[]` hệ thống buộc phải cấp phát một vùng nhớ trống hoàn toàn mới, nên địa chỉ khác nhau (`is` ra False).", hint: "Số nhỏ dùng chung vùng nhớ đệm, mảng mới thì cấp phát độc lập." },
  { id: 42, topic: "ND04: Boolean Chain Trap", difficulty: "Khó", question: "Bẫy chuỗi toán tử so sánh kết hợp kiểu dữ liệu Boolean. Hãy tính toán luồng đánh giá logic của biểu thức sau:", code: "print(False == False in [False])", options: ["True", "False", "Lỗi TypeError", "None"], correctAnswer: 0, explanation: "Cú pháp chained toán tử dịch thành: `(False == False) and (False in [False])`. Vế trái `False == False` trả về `True`. Vế phải kiểm tra xem giá trị False có nằm trong list chứa nó không -> trả về `True`. Kết quả: `True and True = True`.", hint: "Tương tự như cách Python bẻ chuỗi toán tử 1 < x < 5." },
  { id: 43, topic: "ND05: Xóa phần tử khi lặp", difficulty: "Khó", question: "Cạm bẫy thay đổi kích thước danh sách ngay trong vòng lặp duyệt chính nó. Hãy xác định trạng thái của mảng `l` sau khi kết thúc mã nguồn:", code: "l = [1, 2, 3]\nfor x in l:\n    l.remove(x)\nprint(l)", options: ["[]", "[2]", "[1, 3]", "Lỗi RuntimeError"], correctAnswer: 1, explanation: "Lần 1: i=0, x=1, lệnh remove xóa số 1, mảng co lại thành `[2, 3]`. Lần 2: Con trỏ vòng lặp tiến lên chỉ mục i=1. Lúc này phần tử ở chỉ mục 1 của mảng mới là số 3 (số 2 ở chỉ mục 0 bị nhảy cóc qua). Xóa số 3. Mảng còn lại duy nhất `[2]`.", hint: "Mảng bị co chỉ mục dịch chuyển khiến con trỏ vòng lặp nhảy cóc phần tử liền kề." },
  { id: 44, topic: "ND06: UnboundLocalError", difficulty: "Khó", question: "Tại sao việc thực thi hàm `run()` dưới đây lại ngay lập tức văng ra lỗi ngoại lệ hệ thống `UnboundLocalError`?", code: "cnt = 10\ndef run():\n    cnt += 1\nrun()", options: ["Biến cnt không phải là số nguyên", "Sự xuất hiện của lệnh gán (+=) ép cnt thành biến cục bộ khi chưa được khởi tạo giá trị ở Local Scope", "Lỗi sai cú pháp toán tử", "Do thiếu tham số truyền vào hàm"], correctAnswer: 1, explanation: "Trong Python, hễ trong thân hàm xuất hiện lệnh gán (`=`, `+=`), trình thông dịch sẽ mặc định coi biến đó là Local variable của hàm đó. Khi thực hiện `cnt = cnt + 1`, hệ thống tìm giá trị của `cnt` ở Local để tính toán nhưng chưa thấy có dữ liệu khởi tạo trước đó -> báo lỗi.", hint: "Lệnh gán tự động khóa chặt scope của biến vào phạm vi Local cục bộ." },
  { id: 45, topic: "ND06: Mutable Defaults", difficulty: "Khó", question: "Cạm bẫy tham số mặc định là kiểu dữ liệu khả biến (Mutable Default Arguments). Hãy xác định kết quả in ra ở lần gọi hàm thứ hai:", code: "def add(x, l=[]):\n    l.append(x)\n    return l\nadd(1)\nprint(add(2))", options: ["[2]", "[1, 2]", "Lỗi AttributeError", "[]"], correctAnswer: 1, explanation: "Tham số mặc định `l=[]` chỉ được khởi tạo vùng nhớ ĐÚNG MỘT LẦN duy nhất khi hàm được định nghĩa. Mọi lần gọi hàm không truyền tham số `l` sau đó đều dùng chung một vùng nhớ List này. Lần 1 list nạp số 1, lần 2 list nạp tiếp số 2 vào chung vùng nhớ đó -> `[1, 2]`.", hint: "Tham số mặc định kiểu List đóng vai trò như một hố đen lưu trữ dùng chung." },
  { id: 46, topic: "ND07: Tuple In-place Trap", difficulty: "Khó", question: "Bẫy hỗn hợp biến đổi tại chỗ trên đối tượng Mutable nằm bên trong cấu trúc Immutable. Trạng thái của mảng con `t[0]` sẽ biến đổi ra sao?", code: "t = ([1], 2)\ntry:\n    t[0] += [2]\nexcept:\n    pass\nprint(t[0])", options: ["[1]", "[1, 2]", "Lỗi TypeError không thể bắt được", "None"], correctAnswer: 1, explanation: "Toán tử `+=` thực hiện phép toán đổi tại chỗ `.extend()` lên đối tượng list con thành công (mảng biến thành `[1, 2]`), sau đó thực hiện phép gán kết quả ngược lại vào `t[0]`. Phép gán này thất bại và văng lỗi vì Tuple cấm gán lại phần tử. Dù văng lỗi, mảng list con đằng trước đã thực sự bị thay đổi từ trước đó.", hint: "Nửa đầu biến đổi mảng con thành công, nửa sau thực hiện phép gán vào Tuple thất bại." },
  { id: 47, topic: "ND09: MRO Đa kế thừa", difficulty: "Khó", question: "Thứ tự phân giải phương thức MRO (Method Resolution Order) của Python tuân theo thuật toán C3 Linearization. Trong sơ đồ cây kế thừa kim cương D(B, C) với B và C cùng kế thừa từ A, thứ tự tìm kiếm sẽ là gì?", options: ["D -> B -> A -> C", "D -> B -> C -> A", "D -> C -> B -> A", "D -> A -> B -> C"], correctAnswer: 1, explanation: "Thuật toán C3 tuân theo nguyên tắc ưu tiên duyệt hết chiều rộng các nhánh con lân cận (quét ngang qua B rồi đến C) và luôn trì hoãn việc truy vết lên lớp tổ tiên chung (A) cho đến khi toàn bộ các lớp con của nó đã được duyệt qua.", hint: "Quét sạch các nhánh con ở hàng ngang trước khi đi sâu lên trùm cuối tổ tiên chung." },
  { id: 48, topic: "ND11: Xóa biến Exception", difficulty: "Khó", question: "Để chống rò rỉ bộ nhớ do tham chiếu vòng (cyclic references), Python 3 thực hiện cơ chế dọn dẹp biến đại diện Exception (`as e`) như thế nào khi thoát khỏi khối bẫy lỗi?", code: "try:\n    1 / 0\nexcept Exception as e:\n    pass\nprint(e)", options: ["In ra lỗi ZeroDivisionError bình thường", "Kích hoạt lệnh ẩn del e xóa biến khỏi scope cục bộ gây lỗi NameError", "Biến e tự chuyển thành giá trị None", "Biến e biến thành biến toàn cục global"], correctAnswer: 1, explanation: "Trong Python 3, khi khối lệnh `except ... as e` kết thúc, hệ thống sẽ tự động tiêm một lệnh dọn rác ngầm định là `del e` để hủy biến đại diện lỗi nhằm giải phóng call stack. Do đó, gọi `print(e)` bên ngoài khối sẽ gây lỗi văng NameError.", hint: "Cơ chế tự động tiêu hủy bằng chứng ngoại lệ của Python 3." },
  { id: 49, topic: "ND11: Return in Finally", difficulty: "Khó", question: "Sự tranh chấp quyền điều khiển luồng thoát hàm giữa hai khối lệnh. Giá trị trả về cuối cùng của hàm số `test()` dưới đây là bao nhiêu?", code: "def test():\n    try:\n        return 1\n    finally:\n        return 2\nprint(test())", options: ["1", "2", "In ra cả 1 và 2", "Lỗi SyntaxError"], correctAnswer: 1, explanation: "Khối `finally` được đảm bảo tối cao luôn luôn phải chạy trước khi hàm thoát. Khi lệnh `return 1` ở khối `try` chuẩn bị thoát hàm, luồng điều khiển bị giữ lại để chạy `finally`. Lệnh `return 2` bên trong khối này sẽ ghi đè hoàn toàn và hủy bỏ giá trị trả về trước đó.", hint: "Lệnh return nằm ở khối finally nắm quyền sinh sát tối cao cuối cùng." },
  { id: 50, topic: "Nâng cao: Generator Exhaustion", difficulty: "Khó", question: "Bẫy cạn kiệt luồng nạp của đối tượng Generator (Generator Exhaustion). Mảng thứ hai được in ra màn hình sẽ có nội dung gì?", code: "g = (x for x in range(3))\nlist(g)\nprint(list(g))", options: ["[0, 1, 2]", "[]", "Lỗi StopIteration", "None"], correctAnswer: 1, explanation: "Đối tượng Generator là luồng dữ liệu một chiều (iterator) không lưu trữ toàn bộ mảng vào RAM. Lệnh `list(g)` đầu tiên đã duyệt qua toàn bộ luồng và hút cạn dữ liệu. Lần gọi thứ hai luồng dữ liệu đã ở trạng thái trống rỗng, trả về một mảng rỗng `[]`.", hint: "Kéo luồng chạy một lần duy nhất, không thể tái sử dụng dữ liệu." },
];

const EXAM_SET_02_DATA = [
  { id: 51, topic: "ND01: Tư duy máy tính", difficulty: "Dễ", question: "Khái niệm Trừu tượng hóa (Abstraction) tập trung vào việc ẩn đi sự phức tạp và chỉ hiển thị tính năng thiết yếu. Khi xây dựng một hàm tính diện tích hình tròn, việc thiết lập tham số nào thể hiện tính trừu tượng hóa tốt nhất?", code: "", options: ["Ẩn đi sự phức tạp và chỉ hiển thị tính năng thiết yếu.", "Chia bài toán làm đôi.", "Chuyển mã thành hợp ngữ.", "Tìm kiếm phần tử trong mảng."], correctAnswer: 0, explanation: "Trừu tượng hóa loại bỏ các chi tiết nhiễu bên trong (công thức toán, cách xử lý số pi), giữ lại các thuộc tính cốt lõi của giao diện (tham số bán kính) để lập mô hình bài toán.", hint: "Tập trung vào cái cốt lõi." },
  { id: 52, topic: "ND01: Thuật toán", difficulty: "Dễ", question: "Thiết kế thuật toán (Algorithm Design) là bước tạo ra một chuỗi chỉ thị logic từng bước rõ ràng để giải quyết vấn đề. Một thuật toán được coi là tối ưu hoàn hảo khi nó đáp ứng điều kiện tiên quyết nào sau đây?", code: "", options: ["Giao diện đồ họa.", "Tập hợp các hướng dẫn/bước rõ ràng để giải quyết vấn đề.", "Cơ sở dữ liệu.", "Mạng nơ-ron."], correctAnswer: 1, explanation: "Thuật toán là một chuỗi các chỉ thị logic từng bước để đạt được kết quả chính xác, đồng thời phải đảm bảo tính hữu hạn và tính hiệu quả về mặt tài nguyên thời gian/không gian bộ nhớ.", hint: "Công thức nấu ăn." },
  { id: 53, topic: "ND02: Few-shot Prompting", difficulty: "Dễ", question: "Kỹ thuật 'Few-shot Prompting' là gì khi ta muốn ép mô hình LLM sinh ra dữ liệu đầu ra tuân thủ cấu trúc phức tạp của Python?", code: "", options: ["Không cung cấp ví dụ nào.", "Cung cấp vài ví dụ (Input-Output) mẫu để AI học cú pháp trước khi trả lời.", "Yêu cầu AI viết mã ngắn.", "Chửi mắng AI."], correctAnswer: 1, explanation: "Few-shot prompting hoạt động bằng cách mồi vài cặp ví dụ (mẫu ngữ cảnh) trực quan để thiết lập định dạng chuẩn và định hướng phong cách xử lý cho LLM trước khi đưa ra câu hỏi chính.", hint: "Vài ví dụ mồi." },
  { id: 54, topic: "ND02: AI Hallucination", difficulty: "Dễ", question: "Để ép ChatGPT bớt sáng tạo, hạn chế tối đa hiện tượng ảo giác (AI Hallucination) và trả lời chuẩn xác dựa trên dữ liệu có sẵn, tham số nào sau đây thường được tinh chỉnh giảm sát nút về 0?", code: "", options: ["Max Tokens", "Top-P", "Temperature (Nhiệt độ)", "Frequency Penalty"], correctAnswer: 2, explanation: "Temperature quyết định mức độ ngẫu nhiên của phân phối xác suất từ tiếp theo. Nhiệt độ càng thấp, AI càng trả lời cứng nhắc, ít phá cách và bám sát vào sự thật của bộ dữ liệu huấn luyện.", hint: "Nhiệt độ." },
  { id: 55, topic: "ND03: Toán tử", difficulty: "Dễ", question: "Phép tính chia lấy dư `10 % -3` trong Python trả về bao nhiêu? Hãy chú ý đến cách Python xử lý phép chia nguyên hướng về âm vô cực (floor division).", code: "", options: ["1", "-2", "-1", "2"], correctAnswer: 1, explanation: "Python tính phép chia nguyên `10 // -3 = -4`. Theo công thức toán học của Python: phần dư `r = a - (b * (a // b))`. Suy ra `10 - (-3 * -4) = 10 - 12 = -2`. Dấu của phép toán modulo luôn đi theo dấu của mẫu số b.", hint: "Dấu của phép Modulo trong Python phụ thuộc vào mẫu số." },
  { id: 56, topic: "ND03: Định dạng", difficulty: "Dễ", question: "Phân tích cú pháp f-string đệm ký tự trống sau đây. Chuỗi in ra màn hình console sẽ có định dạng chính xác nào?", code: "print(f'{5:03d}')", options: ["5.000", "005", "500", "  5"], correctAnswer: 1, explanation: "Định dạng `03d` yêu cầu xử lý đối tượng dạng số nguyên (d), thiết lập tổng độ dài hiển thị là 3 khoảng trống, đồng thời lấp đầy (padding) bằng các số 0 ở phía trước.", hint: "Padding số 0." },
  { id: 57, topic: "ND04: Boolean", difficulty: "Dễ", question: "Hãy tính toán giá trị logic của biểu thức kết hợp nhiều toán tử sau dựa trên thứ tự ưu tiên ưu việt của Python:", code: "print(True and False or True)", options: ["True", "False", "Error", "None"], correctAnswer: 0, explanation: "Toán tử logic `and` có độ ưu tiên cao hơn toán tử `or`. Hệ thống thực hiện cụm `(True and False)` trước, trả về False. Sau đó thực hiện tiếp `False or True`, trả về True.", hint: "And tính trước, Or tính sau." },
  { id: 58, topic: "ND04: Falsy", difficulty: "Dễ", question: "Hãy đánh giá giá trị Falsy của đối tượng chuỗi trong Python để xác định xem câu lệnh điều kiện if-else sau đây sẽ xuất ra kết quả nào?", code: "if \"\":\n    print(1)\nelse:\n    print(0)", options: ["1", "0", "Error", "None"], correctAnswer: 1, explanation: "Chuỗi rỗng `\"\"` không chứa bất kỳ ký tự nào được Python đánh giá là mang giá trị Falsy (Sai). Do đó, luồng điều khiển lập tức nhảy vào nhánh else và in ra số 0.", hint: "Rỗng là Sai." },
  { id: 59, topic: "ND05: Vòng lặp For", difficulty: "Dễ", question: "Hàm tích lũy `sum()` kết hợp đối tượng sinh dãy `range()`. Tổng các số sinh ra bởi biểu thức sau đây sẽ đạt giá trị bao nhiêu?", code: "print(sum(range(3)))", options: ["3", "6", "4", "5"], correctAnswer: 0, explanation: "Biểu thức `range(3)` sinh ra một chuỗi số nguyên chạy từ 0 đến sát cận trên là 2, bao gồm: 0, 1, 2. Hàm `sum()` thực hiện phép cộng dồn `0 + 1 + 2 = 3`.", hint: "Cộng dồn các số." },
  { id: 60, topic: "ND05: Câu lệnh pass", difficulty: "Dễ", question: "Lệnh rỗng `pass` khác lệnh điều khiển `continue` ở điểm cốt lõi nào khi vận hành luồng lặp?", code: "", options: ["Không khác gì.", "pass là lệnh rỗng giữ chỗ, vòng lặp vẫn chạy tiếp các lệnh dưới nó. continue bỏ qua các lệnh dưới nó.", "pass thoát khỏi vòng lặp.", "pass gây lỗi."], correctAnswer: 1, explanation: "`pass` chỉ là một placeholder lấp chỗ trống cú pháp để trình thông dịch không báo lỗi, nó hoàn toàn tàng hình và cho phép code chạy thẳng xuống dưới. Còn `continue` ép vòng lặp nhảy phắt sang bước mới.", hint: "Pass là tàng hình." },
  { id: 61, topic: "ND06: Args", difficulty: "Dễ", question: "Khi khởi tạo hàm với tham số gộp vị trí `*args`, kiểu dữ liệu của đối tượng chứa biến `args` được Python đóng gói là gì?", code: "def f(*args):\n    print(type(args))", options: ["list", "tuple", "dict", "set"], correctAnswer: 1, explanation: "Toán tử một dấu sao `*args` thu thập toàn bộ các positional arguments truyền vào tại thời điểm gọi hàm và đóng gói chúng thành một cấu trúc Tuple bất biến để bảo vệ dữ liệu.", hint: "Tuple." },
  { id: 62, topic: "ND06: Scope", difficulty: "Dễ", question: "Dựa trên quy tắc tra cứu biến toàn cục (Global Scope) của Python, đoạn mã đọc dữ liệu sau đây có phát sinh lỗi hay không và in ra kết quả gì?", code: "x = 1\ndef f():\n    print(x + 1)\nf()", options: ["Lỗi, vì chưa khai global", "Không lỗi, in ra 2", "In ra 1", "Lỗi NameError"], correctAnswer: 1, explanation: "Bên trong hàm `f()`, hệ thống thực hiện thao tác đọc (read-only) giá trị của biến toàn cục `x` để tính toán. Vì không có lệnh gán lại giá trị cho `x`, hàm chạy hoàn toàn mượt mà không cần từ khóa global.", hint: "Chỉ nhìn chứ không chạm." },
  { id: 63, topic: "ND07: Append vs Extend", difficulty: "Dễ", question: "Phân tích cơ chế nạp phần tử của mảng động List. Hãy tính xem độ dài `len()` của danh sách `l` sẽ tăng lên bao nhiêu sau khi thực thi lệnh `append()`?", code: "l = [1, 2]\nl.append([3, 4])\nprint(len(l))", options: ["4", "3", "2", "Error"], correctAnswer: 1, explanation: "Phương thức `.append()` nhận vào đối tượng nào thì đẩy nguyên khối đối tượng đó vào cuối mảng như một phần tử đơn lẻ. Việc truyền list `[3, 4]` làm `l` biến thành `[1, 2, [3, 4]]`, độ dài tăng từ 2 lên 3.", hint: "Nhét nguyên hộp vào mảng." },
  { id: 64, topic: "ND07: Dict get", difficulty: "Dễ", question: "Phương thức tra cứu `.get()` giúp bảo vệ chương trình khỏi lỗi crash. Lệnh dưới đây sẽ trả về kết quả gì khi tìm kiếm một khóa không tồn tại?", code: "d = {'a': 1}\nprint(d.get('b', 99))", options: ["Error", "None", "1", "99"], correctAnswer: 3, explanation: "Khác với cú pháp dùng ngoặc vuông `d['b']` sẽ ném ra lỗi KeyError nếu thiếu khóa, phương thức `.get(key, default)` sẽ trả về giá trị dự phòng được thiết lập (99) nếu không tìm thấy khóa.", hint: "Giá trị dự phòng." },
  { id: 65, topic: "ND08: Insertion Sort", difficulty: "Dễ", question: "Đặc điểm vận hành cốt lõi giúp phân biệt thuật toán Sắp xếp chèn (Insertion Sort) với các thuật toán sắp xếp dựa trên hoán đổi khác là gì?", code: "", options: ["Chia đôi mảng", "Tìm min nhét vào đầu", "Lấy từng phần tử chèn vào đúng vị trí của mảng con đã sắp xếp phía trước", "Hoán đổi kề nhau"], correctAnswer: 2, explanation: "Insertion Sort hoạt động bằng cách xây dựng một mảng con đã sắp xếp ở phía đầu. Nó nhấc từng phần tử ở mảng chưa xếp phía sau, lùi dần để chèn (insert) vào đúng vị trí phân cấp của mảng con đó.", hint: "Xếp bài tú lơ khơ." },
  { id: 66, topic: "ND08: Big O", difficulty: "Dễ", question: "Phân tích cấu trúc hai vòng lặp lồng nhau chạy độc lập cùng duyệt qua toàn bộ không gian kích thước N. Độ phức tạp thời gian tiệm cận Big O của khối lệnh là bao nhiêu?", code: "for i in range(N):\n    for j in range(N):\n        pass", options: ["O(N)", "O(log N)", "O(N^2)", "O(1)"], correctAnswer: 2, explanation: "Vòng lặp ngoài thực hiện N lần bước chạy. Với mỗi bước chạy đó, vòng lặp trong lại thực thi trọn vẹn N lần lặp con. Tổng số bước toán hạng cần xử lý là `N * N = N^2`, tương ứng với O(N^2).", hint: "Nhân lên." },
  { id: 67, topic: "ND09: Kế thừa", difficulty: "Dễ", question: "Trong lập trình hướng đối tượng (OOP), tính chất Kế thừa (Inheritance) dùng để mô tả mô hình quan hệ logic bền vững nào giữa lớp cha và lớp con?", code: "", options: ["Has-a (Chứa một)", "Is-a (Là một)", "Uses-a (Dùng một)", "Creates (Tạo ra)"], correctAnswer: 1, explanation: "Tính kế thừa biểu diễn mối quan hệ 'Is-a' (Là một bản thể chuyên biệt của). Ví dụ: Lớp `Dog` kế thừa từ lớp `Animal`, nghĩa là Dog *là một* Động vật, kế thừa lại toàn bộ thuộc tính cơ bản của cha.", hint: "Is-a." },
  { id: 68, topic: "ND10: Memoization", difficulty: "Dễ", question: "Kỹ thuật Memoization trong phương pháp Quy hoạch động (Dynamic Programming) đóng vai trò gì nhằm tối ưu hóa hiệu năng của các hàm đệ quy?", code: "", options: ["Tối ưu bộ nhớ RAM", "Xóa bộ nhớ", "Ghi nhớ (Lưu lại) kết quả bài toán con để không tính lại", "Đếm số lần chạy hàm"], correctAnswer: 2, explanation: "Memoization sử dụng một cấu trúc lưu trữ phụ trợ (như Dictionary hoặc Array) để lưu lại (cache) kết quả tính toán của các bài toán con. Khi nhánh đệ quy trùng lặp gọi lại, nó lấy luôn kết quả ra mà không cần tính lại.", hint: "Memo = Ghi nhớ." },
  { id: 69, topic: "ND11: Finally", difficulty: "Dễ", question: "Khối lệnh dọn dẹp tài nguyên cấu trúc `finally` được Python bảo đảm quyền thực thi tuyệt đối tại thời điểm nào?", code: "", options: ["Chỉ khi có lỗi", "Chỉ khi không có lỗi", "Luôn luôn thực thi bất chấp lỗi hay không", "Khi gọi hàm hệ thống"], correctAnswer: 2, explanation: "Khối `finally` là khu vực dọn dẹp đặc biệt (giải phóng file, đóng cổng mạng). Python bắt buộc khối này phải chạy cuối cùng, bất kể khối `try` chạy bình yên hay khối `except` vừa bị kích hoạt kích nổ ngoại lệ.", hint: "Bất khả xâm phạm." },
  { id: 70, topic: "ND12: File Write", difficulty: "Dễ", question: "Khi mở tệp tin bằng chế độ ghi văn bản phá hủy `'w'` (Write), hành vi nào sau đây sẽ xảy ra đối với dữ liệu cũ nếu file đó đã tồn tại sẵn trên đĩa cứng?", code: "", options: ["Ghi nối vào cuối", "Báo lỗi", "Xóa trắng file cũ và ghi đè", "Mở file đọc"], correctAnswer: 2, explanation: "Chế độ 'w' mang tính chất phá hủy cấu trúc file cũ. Ngay khi lệnh open được gọi, hệ thống sẽ thực hiện thao tác cắt cụt (truncate) dung lượng file về 0 bytes, xóa sạch nội dung cũ để sẵn sàng ghi mới.", hint: "Xóa sạch làm lại." },
  { id: 71, topic: "ND03: Nhân chuỗi", difficulty: "Trung bình", question: "Toán tử nhân `*` trên chuỗi thực hiện sao chép nhân bản. Hãy phân tích xem phép toán trộn kiểu dữ liệu sau đây sẽ in ra kết quả gì hay văng lỗi hệ thống?", code: "print(type('A' * 3), 'A' * False)", options: ["<class 'str'> AAA", "<class 'str'> ", "Lỗi TypeError", "Lỗi ValueError"], correctAnswer: 1, explanation: "Vế 1: `'A' * 3` tạo ra chuỗi `'AAA'` thuộc lớp `<class 'str'>`. Vế 2: Trong Python, kiểu Boolean là con của kiểu số nguyên (`False` tương đương số `0`). Một chuỗi nhân với 0 sẽ trả về một chuỗi rỗng `''`. Do đó kết quả hiển thị là lớp dữ liệu chuỗi và một khoảng trống rỗng.", hint: "Boolean trong Python bản chất là một lớp con của số nguyên Integer." },
  { id: 72, topic: "ND03: Slicing mảng", difficulty: "Trung bình", question: "Phân tích kỹ thuật cắt lát (Slicing) trên mảng List với các chỉ mục vượt biên và đảo chiều. Mảng con mới được tạo thành sau logic dưới đây là gì?", code: "l = [0, 1, 2, 3, 4]\nprint(l[1:4:-1])", options: ["[1, 2, 3]", "[3, 2, 1]", "[]", "[4, 3, 2]"], correctAnswer: 2, explanation: "Cú pháp `l[1:4:-1]` yêu cầu cắt mảng từ chỉ mục 1 đến chỉ mục 4 nhưng với bước nhảy lùi `-1`. Vì chỉ mục bắt đầu (1) nhỏ hơn chỉ mục kết thúc (4) nên bước nhảy âm không thể tiếp cận được mục tiêu, Python lập tức trả về một mảng rỗng `[]` mà không báo lỗi.", hint: "Bước nhảy âm yêu cầu chỉ mục bắt đầu phải lớn hơn chỉ mục kết thúc." },
  { id: 73, topic: "ND04: Toán tử 3 ngôi", difficulty: "Trung bình", question: "Toán tử điều khiển ba ngôi (Ternary operator) viết gọn. Hãy trace luồng đánh giá biểu thức lồng nhau sau để xác định giá trị cuối cùng của biến x:", code: "a = 10\nx = 1 if a < 5 else (2 if a == 10 else 3)", options: ["10", "1", "2", "3"], correctAnswer: 2, explanation: "Cú pháp logic: `Value_If_True if Condition else Value_If_False`. Do `a < 5` (10 < 5) sai, hệ thống nhảy vào nhánh else chứa cụm toán tử ba ngôi thứ hai `(2 if a == 10 else 3)`. Do `a == 10` đúng, kết quả trả về chính xác là 2.", hint: "Bóc tách từng tầng điều kiện từ ngoài vào trong." },
  { id: 74, topic: "ND04: Hàm all()", difficulty: "Trung bình", question: "Hàm kiểm tra toàn vẹn `all()` trả về True nếu tất cả các phần tử đều mang giá trị Truthy. Biểu thức phức hợp sau đây sẽ trả về kết quả nào?", code: "print(all([True, 1, 'a', []]))", options: ["False", "True", "Lỗi TypeError", "None"], correctAnswer: 0, explanation: "Hàm `all()` duyệt qua list dữ liệu, nhận thấy các phần tử `True`, `1`, chuỗi `'a'` đều là Truthy. Tuy nhiên, phần tử cuối cùng là một mảng rỗng `[]` mang giá trị Falsy. Chỉ cần xuất hiện một phần tử Falsy, `all()` lập tức trả về False.", hint: "Hãy tìm xem có collection nào ở trạng thái rỗng bên trong mảng không." },
  { id: 75, topic: "ND05: Nested Break", difficulty: "Trung bình", question: "Phân tích luồng ngắt mạch của lệnh `break` lồng nhau. Hãy tính toán xem lệnh in ký tự `count` cuối cùng sẽ xuất ra giá trị bao nhiêu?", code: "count = 0\nfor i in range(2):\n    for j in range(2):\n        count += 1\n        break\nprint(count)", options: ["4", "2", "1", "0"], correctAnswer: 1, explanation: "Vòng lặp i ngoài chạy 2 lần (i=0, i=1). Ở mỗi lần vào, vòng lặp j trong chạy bước j=0, cộng `count += 1`, rồi đụng ngay lệnh `break`. Lệnh `break` này lập tức hủy bỏ vòng lặp j hiện tại để nhường luồng cho vòng i kế tiếp. Tổng cộng count tăng 2 lần, kết quả ra 2.", hint: "Lệnh break chỉ phá hủy duy nhất 1 tầng vòng lặp bao bọc trực tiếp lấy nó." },
  { id: 76, topic: "ND05: Cập nhật While", difficulty: "Trung bình", question: "Để tránh vòng lặp điều kiện `while` rơi vào trạng thái lặp vô hạn (Infinite loop) phá hủy call stack, ta cần cấu hình bổ sung lệnh cập nhật biến đếm nào ở cuối thân vòng lặp?", code: "x = 0\nwhile x < 3:\n    print(x)\n    # Thiếu dòng code cập nhật", options: ["x += 1", "break", "continue", "pass"], correctAnswer: 0, explanation: "Vòng lặp while kiểm tra điều kiện `x < 3`. Để biểu thức này có thể tiến dần về trạng thái Sai (False) nhằm thoát vòng lặp, ta bắt buộc phải tăng giá trị của biến đếm sau mỗi chu trình bằng lệnh `x += 1`.", hint: "Tiến giá trị của biến đếm lên để chạm vào điều kiện dừng." },
  { id: 77, topic: "ND06: Lệnh Global", difficulty: "Trung bình", question: "Cơ chế ghi đè biến phạm vi bằng từ khóa `global`. Hãy tính xem giá trị của biến toàn cục `x` biến thành bao nhiêu sau khi hàm `update()` kết thúc?", code: "x = 0\ndef update():\n    global x\n    x += 5\nupdate()\nprint(x)", options: ["0", "5", "Lỗi UnboundLocalError", "None"], correctAnswer: 1, explanation: "Từ khóa `global x` tuyên bố với hàm rằng mọi thao tác đọc/ghi trên `x` đều tác động thẳng tới biến `x` ở Scope ngoài cùng của module. Lệnh `x += 5` thay đổi trực tiếp biến toàn cục, biến nó từ 0 thành 5.", hint: "Cấp quyền ghi đè trực tiếp lên tài sản của hệ thống toàn cục." },
  { id: 78, topic: "ND06: Args", difficulty: "Trung bình", question: "Quy tắc ràng buộc tham số bắt buộc (Positional) và tham số tùy chọn (Keyword). Cú pháp gọi hàm `f()` nào sau đây sẽ lập tức gây lỗi biên dịch nghiêm trọng?", code: "def f(a, b=1): pass", options: ["f(10)", "f(10, 20)", "f(a=10)", "f(b=20)"], correctAnswer: 3, explanation: "Tham số `a` là tham số bắt buộc vì không được cấu hình giá trị mặc định, còn `b` là tùy chọn. Lệnh gọi `f(b=20)` chỉ truyền giá trị cho `b` mà bỏ quên không truyền dữ liệu cho `a`, dẫn đến lỗi văng thiếu đối số vị trí.", hint: "Tham số không có giá trị mặc định bắt buộc phải được điểm danh khi gọi hàm." },
  { id: 79, topic: "ND07: Comprehension if-else", difficulty: "Trung bình", question: "Cú pháp List Comprehension tích hợp bộ lọc điều kiện đầy đủ `if-else`. Hãy xác định mảng dữ liệu được sinh ra sau khi xử lý danh sách số thực/số nguyên sau:", code: "print([x if x > 0 else 0 for x in [-1, 1]])", options: ["[-1, 1]", "[0, 1]", "[0, 0]", "[1, 1]"], correctAnswer: 1, explanation: "Vòng lặp duyệt qua phần tử -1: điều kiện `-1 > 0` sai, rơi vào vế else trả về số 0. Duyệt tiếp phần tử 1: điều kiện `1 > 0` đúng, giữ nguyên giá trị 1. Danh sách kết quả đóng gói là `[0, 1]`.", hint: "Lọc biến đổi: Thay thế toàn bộ các phần tử có giá trị âm bằng số 0." },
  { id: 80, topic: "ND07: Set Intersection", difficulty: "Trung bình", question: "Toán tử giao dấu và `&` thực hiện tìm kiếm phần tử chung giữa hai Tập hợp (Set Intersect). Kết quả xuất ra của biểu thức sau đây chứa những phần tử nào?", code: "print({1, 2} & {2, 3})", options: ["{1, 2, 3}", "{2}", "{1, 3}", "Lỗi TypeError"], correctAnswer: 1, explanation: "Toán tử `&` đại diện cho phép toán Giao (Intersection). Hệ thống sẽ quét qua hai tập hợp và trích xuất ra những phần tử xuất hiện đồng thời ở cả hai bên, ở đây là số 2, đóng gói thành tập hợp `{2}`.", hint: "Lấy điểm giao nhau chứa phần tử chung duy nhất của cả hai tập hợp." },
  { id: 81, topic: "ND08: Binary Search", difficulty: "Trung bình", question: "Thực hiện thuật toán Tìm kiếm Nhị phân để tìm kiếm số 5 trong mảng tăng dần `[1, 3, 5, 7]`. Tại lượt lặp đầu tiên, chỉ số phần tử ở giữa `mid` được tính toán sẽ trỏ vào giá trị nào? (Chỉ số tính từ 0, phép chia lấy nguyên làm tròn xuống).", code: "", options: ["1", "5", "3", "7"], correctAnswer: 2, explanation: "Mảng có 4 phần tử, chỉ mục trái `L = 0`, chỉ mục phải `R = 3`. Công thức tính chỉ mục ở giữa: `mid = (L + R) // 2 = (0 + 3) // 2 = 1`. Giá trị nằm tại chỉ mục 1 của mảng chính là số 3.", hint: "Lấy trung bình cộng của hai đầu chỉ mục biên rồi làm tròn xuống số nguyên." },
  { id: 82, topic: "ND08: Selection Sort", difficulty: "Trung bình", question: "Cơ chế vận hành cốt lõi của thuật toán Sắp xếp chọn (Selection Sort) để dịch chuyển không gian mảng chưa xếp thành mảng đã xếp là gì?", code: "", options: ["Tìm phần tử nhỏ nhất và đổi chỗ nó lên vị trí đầu tiên chưa xếp.", "Chia đôi mảng thành các phân mảnh độc lập", "Chèn phần tử vào vị trí thích hợp của mảng con phía trước", "Hoán đổi các cặp lân cận liên tiếp"], correctAnswer: 0, explanation: "Selection Sort hoạt động bằng cách quét qua toàn bộ phân đoạn mảng chưa được sắp xếp để tuyển chọn ra một phần tử có giá trị cực trị (nhỏ nhất/lớn nhất), sau đó thực hiện đúng 1 phép hoán đổi để đưa nó lên đầu phân đoạn đó.", hint: "Tuyển chọn phần tử ưu tú nhất trong vùng chưa xếp để đẩy lên đầu hàng." },
  { id: 83, topic: "ND09: Polymorphism", difficulty: "Trung bình", question: "Tính chất Đa hình (Polymorphism) trong lập trình hướng đối tượng được thể hiện rõ ràng nhất qua cơ chế vận hành nào sau đây của ngôn ngữ?", code: "", options: ["Đóng gói dữ liệu vào trong phạm vi private", "Cho phép các đối tượng thuộc các lớp khác nhau phản hồi lại cùng một tên phương thức theo các cách riêng biệt", "Khai báo nhiều biến toàn cục có cùng tên hệ thống", "Tự động sao chép các thuộc tính tĩnh của lớp cha"], correctAnswer: 1, explanation: "Tính đa hình cho phép các lớp con cùng ghi đè (override) một phương thức có tên giống hệt ở lớp cha. Khi gọi phương thức đó trên các đối tượng khác nhau, hệ thống sẽ tự động kích hoạt hành vi riêng biệt tương ứng của từng đối tượng.", hint: "Nhiều hình thái thực thi khác nhau xuất phát từ cùng một tên gọi phương thức." },
  { id: 84, topic: "ND09: Abstract Class", difficulty: "Trung bình", question: "Để xây dựng một Lớp trừu tượng (Abstract Class) nhằm cưỡng bách các lớp con bắt buộc phải ghi đè các phương thức khuôn mẫu, ta kế thừa từ lớp nền tảng mẫu nào thuộc thư viện cốt lõi của Python?", code: "", options: ["sys", "abc.ABC (Abstract Base Classes)", "os.path", "math.core"], correctAnswer: 1, explanation: "Python cung cấp module tích hợp sẵn tên là `abc` (Abstract Base Classes). Bằng cách kế thừa từ lớp `ABC` và sử dụng bộ trang trí `@abstractmethod`, ta tạo ra một bản thiết kế khung, cấm khởi tạo trực tiếp và ép lớp con phải triển khai mã nguồn.", hint: "Tên module viết tắt của cụm từ Abstract Base Classes." },
  { id: 85, topic: "ND10: Tabulation", difficulty: "Trung bình", question: "Trong phương pháp Quy hoạch động, kỹ thuật Lập bảng (Tabulation) áp dụng hướng tiếp cận luồng xử lý theo chiều nào để loại bỏ hoàn toàn đệ quy?", code: "", options: ["Top-down (Từ trên đỉnh hệ thống xuống đệ quy có nhớ)", "Bottom-up (Từ dưới đáy bài toán nhỏ nhất lên dùng vòng lặp)", "Random walk duyệt ngẫu nhiên", "Chia để trị phân tách nhị phân"], correctAnswer: 1, explanation: "Tabulation là phương pháp tiếp cận Bottom-up (từ dưới lên). Nó khởi tạo một mảng hoặc bảng dữ liệu, sử dụng vòng lặp để giải quyết triệt để các bài toán con từ kích thước nhỏ nhất (vùng đáy), điền kết quả vào bảng rồi tính dần lên bài toán lớn.", hint: "Xây móng nhà từ dưới thấp lên cao bằng các vòng lặp tuyến tính." },
  { id: 86, topic: "ND10: Tháp Hà Nội", difficulty: "Trung bình", question: "Mô hình toán học của bài toán đệ quy kinh điển Tháp Hà Nội (Tower of Hanoi) với N tầng đĩa tuân theo công thức truy hồi $T(N) = 2T(N-1) + 1$. Độ phức tạp thời gian của nó đạt mức nào?", code: "", options: ["O(N)", "O(N log N)", "O(2^N)", "O(N^2)"], correctAnswer: 2, explanation: "Phương trình vi phân/truy hồi $T(N) = 2^N - 1$ chứng minh rằng mỗi lần tăng thêm 1 tầng đĩa, số bước di chuyển tối thiểu sẽ bị nhân đôi. Điều này dẫn tới tốc độ tăng trưởng độ phức tạp thời gian thuộc hàm mũ cực kỳ nguy hiểm là O(2^N).", hint: "Hàm mũ có tốc độ tăng trưởng gấp đôi kích thước sau mỗi bước tăng." },
  { id: 87, topic: "ND11: try-else", difficulty: "Trung bình", question: "Trong cấu trúc bẫy lỗi mở rộng của Python, khối lệnh đặc biệt `else` đính kèm sau `except` được kích hoạt thực thi tại thời điểm nào?", code: "try:\n    x = 1\nexcept:\n    pass\nelse:\n    print('A')", options: ["Luôn luôn thực thi bất chấp lỗi", "Chỉ thực thi khi có lỗi xảy ra", "Chỉ thực thi khi khối try kết thúc hoàn hảo và KHÔNG tung ra bất kỳ ngoại lệ nào", "Chỉ chạy khi lỗi là cú pháp SyntaxError"], correctAnswer: 2, explanation: "Khối `else` trong cấu trúc try-except đóng vai trò là nhánh an toàn. Nó chỉ được phép chạy khi khối `try` thực thi êm ái, bình yên vô sự và không kích nổ bất kỳ một lỗi runtime nào.", hint: "Chạy khi mọi thứ ở khối thử nghiệm diễn ra hoàn hảo không có sự cố." },
  { id: 88, topic: "ND12: seek(0)", difficulty: "Trung bình", question: "Khi tương tác với luồng dữ liệu tệp tin (File stream), phương thức tua con trỏ `f.seek(0)` thực hiện nhiệm vụ cốt lõi nào?", code: "", options: ["Xóa sạch nội dung file", "Dịch chuyển con trỏ đọc/ghi về vị trí byte đầu tiên của file (byte 0)", "Xóa dòng dữ liệu đầu tiên", "Đóng luồng kết nối file an toàn"], correctAnswer: 1, explanation: "Hàm `.seek(offset, whence)` dùng để điều khiển vị trí con trỏ. Gọi `.seek(0)` thực hiện thao tác tua băng dữ liệu về điểm xuất phát ban đầu (byte số 0), cho phép ta tiến hành đọc lại tệp tin từ đầu mà không cần đóng và mở lại file.", hint: "Tua lại luồng đọc về vạch xuất phát ban đầu." },
  { id: 89, topic: "Nâng cao: Assert", difficulty: "Trung bình", question: "Lệnh kiểm thử giả định `assert` ném ra ngoại lệ hệ thống nào nếu biểu thức điều kiện đi kèm của nó bị đánh giá là Sai (False)?", code: "assert 1 == 2", options: ["ValueError", "SyntaxError", "AssertionError", "TypeError"], correctAnswer: 2, explanation: "Lệnh `assert condition` dùng để khẳng định một chân lý logic bắt buộc phải đúng tại thời điểm viết code. Nếu giả định đó bị vi phạm (trả về False), Python lập tức ném ra lỗi AssertionError để cảnh báo lập trình viên.", hint: "Ngoại lệ mang chính tên của câu lệnh kiểm thử này." },
  { id: 90, topic: "Nâng cao: deque", difficulty: "Trung bình", question: "Khi sử dụng cấu trúc danh sách liên kết vòng kép `collections.deque`, lệnh chèn đầu `appendleft(1)` thực hiện thao tác chèn phần tử vào vị trí nào và tốn bao nhiêu thời gian?", code: "", options: ["Chèn vào giữa mảng, tốn O(N)", "Chèn vào cuối mảng, tốn O(1)", "Chèn vào ngay vị trí chỉ mục đầu tiên (bên trái), tốn O(1)", "Thay thế phần tử đầu tiên, tốn O(N)"], correctAnswer: 2, explanation: "Nhờ kiến trúc các con trỏ liên kết node hai chiều ở hai đầu, phương thức `.appendleft()` thực hiện đẩy phần tử vào vị trí index 0 (phía bên trái) của hàng đợi với tốc độ hằng số siêu nhanh O(1) mà không cần xê dịch mảng vật lý.", hint: "Left nghĩa là phía bên trái đầu hàng, cấu trúc tối ưu hằng số thời gian." },
  { id: 91, topic: "ND07: Identity List", difficulty: "Khó", question: "Bẫy phân định thực thể toán học thông qua toán tử so sánh giá trị `==` và toán tử so sánh định danh vùng nhớ `is`. Hãy xác định kết quả in ra của khối mã nguồn sau:", code: "a = []\nb = []\nprint(a == b, a is b)", options: ["True True", "False False", "True False", "False True"], correctAnswer: 2, explanation: "Toán tử `==` so sánh nội dung bên trong: cả hai đều là danh sách rỗng nên trả về `True`. Toán tử `is` so sánh địa chỉ ô nhớ vật lý: vì List là kiểu mutable, mỗi lần khai báo `[]` Python bắt buộc phải cấp phát một vùng nhớ độc lập mới, dẫn tới địa chỉ khác nhau -> `is` trả về `False`.", hint: "Nội dung giá trị giống hệt nhau nhưng vị trí nằm trên thanh RAM thì hoàn toàn khác biệt." },
  { id: 92, topic: "ND04: Chain comparison trap", difficulty: "Khó", question: "Cạm bẫy toán tử so sánh dạng chuỗi kết hợp bắc cầu đối tượng Boolean. Hãy phân tích cẩn thận luồng lượng giá của biểu thức logic hiểm hóc sau đây:", code: "print(1 < 3 < 2 == False)", options: ["True", "False", "Lỗi TypeError", "None"], correctAnswer: 1, explanation: "Python bẻ chuỗi so sánh liên hoàn thành cấu trúc logic: `(1 < 3) and (3 < 2) and (2 == False)`. Xét biểu thức nhánh ở giữa: `(3 < 2)` kết quả ra `False`. Vì dính toán tử `and`, chỉ cần một vế mang giá trị `False` là toàn bộ chuỗi bị đánh sập trả về False.", hint: "Chèn các từ khóa logic AND ngầm vào giữa các toán tử so sánh đơn lẻ." },
  { id: 93, topic: "ND05: Xóa phần tử khi lặp", difficulty: "Khó", question: "Cạm bẫy xóa phần tử bằng lệnh điều kiện khi đang dùng vòng lặp duyệt qua chính danh sách đó. Hãy tính toán xem mảng `l` còn lại những gì sau khi kết thúc chu trình:", code: "l = [1, 2, 3]\nfor x in l:\n    if x == 1: l.remove(x)\nprint(l)", options: ["[]", "[2, 3]", "[1, 3]", "Lỗi RuntimeError"], correctAnswer: 1, explanation: "Vòng lặp bắt đầu tại chỉ mục i=0 (x=1), lệnh remove xóa số 1, danh sách co lại thành `[2, 3]`. Sang chu trình tiếp theo, con trỏ vòng lặp tịnh tiến lên chỉ mục i=1. Lúc này phần tử tại index 1 của mảng mới là số 3 (số 2 đã rơi vào index 0 và bị nhảy cóc qua). Do số 3 khác 1 nên không xóa. Kết quả mảng còn `[2, 3]`.", hint: "Mảng bị co rút làm sai lệch vị trí chỉ mục, khiến con trỏ vòng lặp nhảy cóc bỏ qua phần tử lân cận." },
  { id: 94, topic: "ND06: Nested Global", difficulty: "Khó", question: "Phân tích tầm vực biến lồng nhau đa tầng kết hợp lệnh khai báo phạm vi toàn cục. Biến x ngoài cùng của module sẽ mang giá trị là bao nhiêu sau khi thực thi hàm?", code: "x = 1\ndef f():\n    x = 2\n    def g():\n        global x\n        x = 3\n    g()\nf()\nprint(x)", options: ["1", "2", "3", "Lỗi UnboundLocalError"], correctAnswer: 2, explanation: "Từ khóa `global x` nằm trong hàm con `g()` có khả năng xuyên thủng mọi tầng hàm cha bao quanh, tạo một liên kết thẳng tới biến `x` ở Scope ngoài cùng của module. Lệnh `x = 3` ghi đè trực tiếp lên biến global ngoài cùng biến nó thành 3. Biến cục bộ `x=2` của hàm `f()` không bị ảnh hưởng nhưng không được in ra.", hint: "Từ khóa global cắm rễ sâu xuyên qua tất cả các hàm lồng nhau để trỏ thẳng ra ngoài module." },
  { id: 95, topic: "ND07: fromkeys trap", difficulty: "Khó", question: "Cạm bẫy sử dụng chung tham chiếu đối tượng mutable khi khởi tạo Dictionary bằng phương thức tĩnh `fromkeys`. Khóa 'B' sẽ hiển thị giá trị là bao nhiêu khi ta sửa đổi khóa 'A'?", code: "d = dict.fromkeys(['A', 'B'], [])\nd['A'].append(1)\nprint(d['B'])", options: ["[]", "Lỗi KeyError", "[1]", "None"], correctAnswer: 2, explanation: "Hàm sao chép tạo khóa `dict.fromkeys(iterable, value)` lấy đúng địa chỉ của đối tượng truyền vào tham số `value` để gán cho tất cả các khóa. Vì ta truyền một mảng list `[]`, cả hai khóa 'A' và 'B' đều trỏ chung vào MỘT vùng nhớ list đó. Sửa mảng ở khóa 'A' làm khóa 'B' biến đổi theo.", hint: "Tất cả các khóa trong Dictionary đang chia sẻ và dùng chung một vật thể bộ nhớ duy nhất." },
  { id: 96, topic: "ND07: copy.deepcopy", difficulty: "Khó", question: "Để bẻ gãy hoàn toàn mối liên kết tham chiếu và nhân bản toàn bộ cây thư mục bộ nhớ của một mảng lồng đa tầng, ta sử dụng phương thức sao chép sâu `copy.deepcopy()`. Mảng gốc `a` sẽ hiển thị nội dung nào sau đây?", code: "import copy\na = [[1]]\nb = copy.deepcopy(a)\nb[0].append(2)\nprint(a)", options: ["[[1, 2]]", "[[1]]", "Lỗi AttributeError", "[]"], correctAnswer: 1, explanation: "Hàm sao chép sâu `copy.deepcopy()` quét qua cấu trúc dữ liệu, cấp phát vùng nhớ độc lập mới cho cả mảng vỏ bên ngoài lẫn tất cả các mảng lồng bên trong. Do đó, mảng `b` sở hữu một hệ thống bộ nhớ biệt lập hoàn toàn, thao tác sửa đổi trên `b` không làm ảnh hưởng đến mảng gốc `a`.", hint: "Cắt đứt hoàn toàn mọi sợi dây liên hệ huyết thống về mặt địa chỉ bộ nhớ RAM." },
  { id: 97, topic: "ND09: Super() MRO", difficulty: "Khó", question: "Khi giải quyết xung đột đa kế thừa cấu trúc kim cương bằng thuật toán C3 Linearization, thuộc tính tra cứu thứ tự `__mro__` sẽ sắp xếp danh sách các lớp cha theo quy tắc cốt lõi nào?", code: "", options: ["Depth-first (Ưu tiên đi sâu hết một nhánh rồi sang nhánh khác)", "Breadth-first (Ưu tiên quét ngang hết các nhánh con rồi mới lên tổ tiên chung)", "Từ phải qua trái theo thứ tự bảng chữ cái", "Xáo trộn ngẫu nhiên tùy thuộc vào bộ nhớ RAM"], correctAnswer: 1, explanation: "Thuật toán C3 của Python tuân thủ nguyên tắc: ưu tiên duyệt theo chiều rộng ngang (quét từ trái sang phải qua các lớp con lân cận) và bắt buộc phải hoãn việc truy vết, tìm kiếm phương thức lên lớp tổ tiên chung cho đến khi toàn bộ các nhánh con cháu của nó được quét sạch.", hint: "Giữ trùm cuối tổ tiên chung lại để duyệt sau cùng sau khi đã xử lý xong toàn bộ đám con cháu." },
  { id: 98, topic: "ND11: Lệnh Raise", difficulty: "Khó", question: "Sử dụng câu lệnh ném lỗi `raise` trơ trọi không đi kèm bất kỳ tham số hay tên ngoại lệ nào bên trong một khối xử lý `except` mang ý nghĩa thuật toán đặc biệt nào?", code: "try:\n    1 / 0\nexcept:\n    raise", options: ["Gây lỗi cú pháp nghiêm trọng SyntaxError", "Nuốt lỗi hoàn toàn để chương trình chạy tiếp", "Bắt lấy ngoại lệ hiện tại rồi tiếp tục ném chính xác lỗi đó lên tầng hàm cấp cao hơn", "Tắt chương trình một cách êm ái không tạo log lỗi"], correctAnswer: 2, explanation: "Từ khóa `raise` đứng cô độc trong khối `except` thực hiện hành vi tái ném lỗi (Re-raise exception). Nó có nhiệm vụ chuyển tiếp nguyên vẹn đối tượng ngoại lệ vừa bắt được để đẩy tiếp lên cho các khối try-except ở tầng hàm cha cấp cao hơn xử lý.", hint: "Hứng được quả bóng lỗi từ tuyến dưới rồi tiếp tục ném ngược nó lên cho tuyến trên." },
  { id: 99, topic: "ND12: Context Manager __exit__", difficulty: "Khó", question: "Để thiết kế một Context Manager tùy biến bằng cấu trúc Class có khả năng 'nuốt chửng' (swallow) mọi lỗi phát sinh trong khối lệnh `with` nhằm giữ chương trình không bị crash, phương thức magic `__exit__` phải trả về giá trị logic nào?", code: "", options: ["Hàm __enter__ return False", "Hàm __exit__ return True", "Dùng lệnh pass giữ chỗ", "Lệnh break thoát cấu trúc"], correctAnswer: 1, explanation: "Theo đặc tả kỹ thuật Core CPython, khi một ngoại lệ bùng nổ trong khối `with`, hệ thống sẽ nạp lỗi đó vào phương thức `__exit__(exc_type, exc_val, exc_tb)`. Nếu phương thức này trả về giá trị Boolean là `True`, Python coi như lỗi đó đã được xử lý xong và sẽ dập tắt, nuốt lỗi để chạy tiếp dòng lệnh sau `with`.", hint: "Trả về một giá trị chân lý khẳng định khẳng định rằng mọi sự cố đã được dàn xếp xong." },
  { id: 100, topic: "Nâng cao: Counter", difficulty: "Khó", question: "Class chuyên biệt `collections.Counter` thực hiện hành vi băm và đóng gói cấu trúc dữ liệu như thế nào khi nhận vào một mảng chứa các phần tử trùng lặp?", code: "", options: ["Xóa sạch toàn bộ phần tử trùng lặp và trả về mảng Set", "Khởi tạo một lớp con của Dict, đếm tần suất xuất hiện và lưu dưới dạng {khóa: số_lần_xuất_hiện}", "Sắp xếp lại các phần tử theo thứ tự bảng chữ cái", "Tính tổng toán học của tất cả các phần tử"], correctAnswer: 1, explanation: "Đối tượng `Counter` là một phân lớp của Dictionary. Nó quét qua một tập hợp các phần tử hashable, tự động tính toán tần suất xuất hiện của từng phần tử độc lập và lưu trữ chúng dưới dạng các cặp Khóa (phần tử) và Giá trị (số lần xuất hiện trong mảng dữ liệu).", hint: "Thiết lập một bảng thống kê số lượng tần suất xuất hiện tự động." }
];

const EXAM_SET_03_DATA = [
  { id: 101, topic: "ND01: Phân rã", difficulty: "Dễ", question: "Một ví dụ thực tế của kỹ năng 'Phân rã' (Decomposition) trong tư duy máy tính để tối ưu hóa việc quản lý và bảo trì mã nguồn là gì?", code: "", options: ["Viết một hàm duy nhất dài 1000 dòng xử lý toàn bộ logic hệ thống.", "Nhóm các chức năng độc lập thành các hàm chuyên biệt như `login()`, `view()`, `logout()`.", "Sao chép nguyên khối mã nguồn từ Internet về chạy thử.", "Dịch toàn bộ chú thích của mã nguồn sang ngôn ngữ khác."], correctAnswer: 1, explanation: "Phân rã (Decomposition) là hành động chia một hệ thống hoặc vấn đề lớn phức tạp thành các phần nhỏ hơn, hoạt động độc lập (như tách các hàm/module chức năng) giúp dễ dàng kiểm thử, tái sử dụng và quản lý luồng dữ liệu [cite: 1].", hint: "Chia nhỏ bài toán để dễ dàng thực hiện chiến thuật chia để trị[cite: 1]." },
  { id: 102, topic: "ND01: Nhận dạng mẫu", difficulty: "Dễ", question: "Việc phát hiện ra tính lặp lại có quy luật của một thao tác hệ thống và sử dụng vòng lặp `for` để duyệt qua mảng thay vì viết tay thủ công từng dòng `arr[0], arr[1]...` là ứng dụng trực tiếp của kỹ năng nào?", code: "", options: ["Nhận dạng mẫu (Pattern Recognition)", "Khử nhiễu dữ liệu", "Quy hoạch động tối ưu", "Trừu tượng hóa dữ liệu"], correctAnswer: 0, explanation: "Khi nhận thấy sự lặp lại có quy luật (mẫu số chung) của các thao tác truy xuất bộ nhớ, ta áp dụng kỹ năng Nhận dạng mẫu (Pattern Recognition) để tổng quát hóa hành vi đó thông qua cấu trúc lặp điều khiển [cite: 2].", hint: "Phát hiện sự trùng lặp có hệ thống của các chỉ số mảng[cite: 2]." },
  { id: 103, topic: "ND02: Persona Prompting", difficulty: "Dễ", question: "Khi thiết lập câu lệnh cấu hình bối cảnh: 'Đóng vai là một giáo viên tiểu học giảng giải về lập trình...', bạn đang khai thác thành phần cốt lõi nào của kỹ thuật Prompt Engineering?", code: "", options: ["Context (Ngữ cảnh nền)", "Persona / Role (Vai trò cấu hình)", "Output Format (Định dạng đầu ra)", "Constraint (Ràng buộc hệ thống)"], correctAnswer: 1, explanation: "Gán vai trò (Role/Persona Prompting) giúp mô hình ngôn ngữ lớn định hình được văn phong, hệ tri thức chuyên môn cần truy xuất và lựa chọn thuật ngữ phù hợp với đối tượng người nghe [cite: 3].", hint: "Kỹ thuật nhập vai nhân vật để định hướng tư duy cho AI[cite: 3]." },
  { id: 104, topic: "ND02: AI Hallucination", difficulty: "Dễ", question: "Đâu là một biểu hiện nguy hiểm và điển hình của hiện tượng Hallucination (Ảo giác) trong các mô hình trí tuệ nhân tạo lớn (LLM)?", code: "", options: ["AI phản hồi kết quả toán học chính xác theo hệ thập phân.", "AI tự động gọi API hệ thống của bạn mà không xin phép.", "AI trích dẫn một bài báo khoa học hoặc một hàm thư viện trông rất thật nhưng thực tế hoàn toàn không tồn tại.", "AI từ chối trả lời câu hỏi do máy chủ quá tải dữ liệu."], correctAnswer: 2, explanation: "Ảo giác (AI Hallucination) xảy ra khi mô hình tạo ra thông tin hoàn toàn giả mạo, sai lệch với sự thật thực tế nhưng lại được trình bày dưới một văn phong cực kỳ tự tin, mạch lạc và hợp cú pháp ngữ pháp [cite: 4, 5].", hint: "AI ngụy tạo thông tin không có thật một cách vô cùng thuyết phục[cite: 4, 5]." },
  { id: 105, topic: "ND03: Phép chia", difficulty: "Dễ", question: "Hãy xác định giá trị trả về của toán tử floor division `//` trong phép tính dưới đây. Chú ý kiểu dữ liệu trả về của biểu thức là gì?", code: "print(10 // 4)", options: ["2.5", "2", "3", "2.0"], correctAnswer: 1, explanation: "Toán tử `//` thực hiện phép chia lấy phần nguyên, làm tròn hướng về phía âm vô cực của trục số (floor). `10 / 4 = 2.5`, làm tròn xuống phần nguyên là số nguyên `2` [cite: 5].", hint: "Chia lấy nguyên và loại bỏ hoàn toàn phần thập phân phía sau[cite: 5]." },
  { id: 106, topic: "ND03: String method", difficulty: "Dễ", question: "Phương thức chuỗi (String method) nào trong Python được sử dụng để chuyển đổi toàn bộ các ký tự alphabet trong chuỗi sang chữ in hoa?", code: "s = 'python'\n# s = ?", options: ["s.upper()", "s.capitalize()", "s.uppercase()", "s.title()"], correctAnswer: 0, explanation: "Phương thức `.upper()` trả về một bản sao của chuỗi ban đầu với tất cả các ký tự chữ cái được chuyển thành chữ in hoa[cite: 6]. Hàm `.capitalize()` chỉ viết hoa chữ cái đầu tiên của chuỗi [cite: 6].", hint: "Chuyển đổi sang chữ in hoa toàn bộ (Upper case)[cite: 6]." },
  { id: 107, topic: "ND04: Boolean", difficulty: "Dễ", question: "Dựa trên các định lý đại số Boolean kinh điển, biểu thức logic `not A and not B` sẽ tương đương logic hoàn toàn với biểu thức nào sau đây?", code: "", options: ["not (A and B)", "A or B", "not (A or B)", "A and B"], correctAnswer: 2, explanation: "Theo định lý De Morgan trong logic toán học: phủ định của một phép tuyển tương đương với phép hội của các phủ định, tức là `not (A or B) == not A and not B` [cite: 7].", hint: "Áp dụng định lý biến đổi De Morgan để gom nhóm toán tử phủ định[cite: 7]." },
  { id: 108, topic: "ND04: Chuỗi Truthy", difficulty: "Dễ", question: "Hãy đánh giá tính chất Truthy/Falsy của đối tượng chuỗi trong Python để xác định kết quả in ra của đoạn mã điều khiển sau:", code: "if \"False\":\n    print('Đúng')\nelse:\n    print('Sai')", options: ["Sai", "Đúng", "Lỗi cú pháp SyntaxError", "Không in ra gì"], correctAnswer: 1, explanation: "Trong Python, bất kỳ chuỗi ký tự nào KHÁC RỖNG (dù chứa nội dung là chữ 'False' hoặc khoảng trắng) đều được đánh giá là mang giá trị chân lý Truthy (Đúng)[cite: 8]. Do đó điều kiện thỏa mãn và in ra 'Đúng' [cite: 8].", hint: "Một chuỗi nằm trong ngoặc kép có ký tự thì luôn là chuỗi khác rỗng[cite: 8]." },
  { id: 109, topic: "ND05: Vòng lặp For", difficulty: "Dễ", question: "Hàm sinh dãy `range(start, stop, step)` kết hợp ép kiểu danh sách. Vòng lặp sau đây sẽ đóng gói các phần tử nguyên chính xác nào?", code: "print(list(range(0, 5, 2)))", options: ["1, 2, 3, 4", "0, 2, 4", "2, 4", "0, 2, 4, 6"], correctAnswer: 1, explanation: "Hàm `range(0, 5, 2)` sinh các số bắt đầu từ `start=0`, tăng tiến với bước nhảy `step=2` và bắt buộc dừng lại ngay trước cận trên `stop=5`. Các số sinh ra là 0, 2, 4 [cite: 9].", hint: "Bắt đầu từ số 0, nhảy tiến 2 đơn vị mỗi bước và dừng trước số 5[cite: 9]." },
  { id: 110, topic: "ND05: Break vs Continue", difficulty: "Dễ", question: "Sự khác biệt cốt lõi về cơ chế điều khiển vòng lặp giữa hai câu lệnh `break` và `continue` là gì?", code: "", options: ["Chúng hoàn toàn giống nhau về mặt thực thi.", "`break` thoát hẳn khỏi vòng lặp chứa nó, `continue` chỉ bỏ qua bước lặp hiện tại để nhảy sang chu trình mới.", "`continue` thoát hẳn khỏi vòng lặp, `break` nhảy sang bước mới.", "`break` dừng toàn bộ chương trình."], correctAnswer: 1, explanation: "Lệnh `break` chém đứt luồng và thoát hẳn ra khỏi vòng lặp bao bọc nó[cite: 10]. Lệnh `continue` chỉ bỏ qua các dòng lệnh phía dưới nó trong chu trình hiện hành để lập tức nhảy sang bước lặp tiếp theo của vòng lặp [cite: 10].", hint: "Một bên đập vỡ chu trình vĩnh viễn, một bên tua nhanh sang chu trình kế tiếp[cite: 10]." },
  { id: 111, topic: "ND06: Hàm Args", difficulty: "Dễ", question: "Khi khởi tạo một hàm Python sử dụng tham số gộp vị trí `def f(*args):`, đối tượng dữ liệu `args` sẽ lưu giữ các giá trị truyền vào dưới dạng cấu trúc nào?", code: "", options: ["Mảng động khả biến List", "Bảng băm ánh xạ Dictionary", "Bộ dữ liệu bất biến Tuple", "Chuỗi ký tự String"], correctAnswer: 2, explanation: "Toán tử một dấu sao `*args` gom toàn bộ các đối số truyền theo vị trí (positional arguments) tại thời điểm gọi hàm và đóng gói chúng vào một cấu trúc Tuple bất biến nhằm bảo vệ tính toàn vẹn của tham số [cite: 11].", hint: "Cấu trúc dữ liệu có dạng ngoặc đơn và bất biến[cite: 11]." },
  { id: 112, topic: "ND06: Scope Global Read", difficulty: "Dễ", question: "Dựa trên quy tắc Scope LEGB của Python, thao tác đọc giá trị biến toàn cục bên trong hàm số sau đây hoạt động như thế nào?", code: "y = 5\ndef test():\n    print(y * 2)\ntest()", options: ["Hàm chạy hoàn toàn bình thường, in ra 10", "Văng lỗi vì chưa khai báo từ khóa `global y` ở thân hàm", "Ném ra ngoại lệ cục bộ UnboundLocalError", "Chương trình chạy lỗi và in ra 5"], correctAnswer: 0, explanation: "Bên trong thân hàm, Python cho phép tự do ĐỌC (read-only) giá trị của các biến nằm ở phạm vi toàn cục (Global scope) mà không bắt buộc phải khai báo từ khóa `global`[cite: 12]. Lỗi chỉ xảy ra khi ta cố tình gán lại giá trị cho nó [cite: 44].", hint: "Quyên đọc dữ liệu từ Scope cha ra bên ngoài thì không bị hệ thống ngăn cấm[cite: 12]." },
  { id: 113, topic: "ND07: Tuple", difficulty: "Dễ", question: "Tính chất 'Bất biến' (Immutable) đặc trưng của cấu trúc dữ liệu Tuple trong Python mang ý nghĩa vận hành nào sau đây?", code: "", options: ["Không hỗ trợ việc duyệt qua các phần tử bằng vòng lặp.", "Cấm hoàn toàn các thao tác thay đổi độ dài, thêm, sửa đổi giá trị hoặc xóa phần tử sau khi đã khởi tạo.", "Chỉ có khả năng lưu trữ các số nguyên đơn thuần.", "Có thể trực tiếp ép kiểu sang cấu trúc List mà không tốn tài nguyên bộ nhớ."], correctAnswer: 1, explanation: "Tuple một khi đã được cấp phát bộ nhớ và khởi tạo giá trị thì nội dung của nó sẽ bị đóng băng. Hệ thống cấm hoàn toàn các phương thức thay đổi cấu trúc như `.append()`, `.pop()` hoặc các phép gán đổi vị trí `t[0] = 1` [cite: 13].", hint: "Bất biến đồng nghĩa với việc không cho phép can thiệp chỉnh sửa dữ liệu tại chỗ[cite: 13]." },
  { id: 114, topic: "ND07: Dict in", difficulty: "Dễ", question: "Khi sử dụng toán tử kiểm tra thành phần `in` trên cấu trúc dữ liệu Dictionary (`key in dict`), Python mặc định sẽ thực hiện tra cứu đối tượng nào?", code: "d = {'a': 1, 'b': 2}\nprint('a' in d)", options: ["Kiểm tra xem giá trị (Value) có tồn tại hay không.", "Kiểm tra đồng thời cả Khóa và Giá trị.", "Chỉ tra cứu và kiểm tra xem Khóa (Key) có tồn tại trong bảng băm hay không.", "Báo lỗi kiểu dữ liệu TypeError"], correctAnswer: 2, explanation: "Đối với cấu trúc dữ liệu Dictionary, toán tử `in` được tối ưu hóa ở độ phức tạp hằng số O(1) để kiểm tra xem một đối tượng có tồn tại trong danh sách các KHÓA (Keys) của bảng băm hay không [cite: 14, 16].", hint: "Dictionary quản lý các phần tử dựa trên cơ chế tra cứu chỉ mục của Khóa[cite: 14]." },
  { id: 115, topic: "ND08: Selection Sort", difficulty: "Dễ", question: "Thuật toán sắp xếp nào vận hành bằng cách liên tục quét qua phân đoạn chưa sắp xếp để chọn ra phần tử có giá trị nhỏ nhất và hoán đổi nó lên vị trí đầu tiên của phân đoạn đó?", code: "", options: ["Sắp xếp nổi bọt (Bubble Sort)", "Sắp xếp chọn (Selection Sort)", "Sắp xếp trộn (Merge Sort)", "Sắp xếp nhanh (Quick Sort)"], correctAnswer: 1, explanation: "Sắp xếp chọn (Selection Sort) chia mảng thành hai phần. Tại mỗi bước duyệt, nó tìm kiếm phần tử cực trị (min/max) ở vùng chưa xếp rồi thực hiện hoán đổi đưa nó về vị trí biên đã xếp phía trước [cite: 15].", hint: "Tuyển chọn phần tử tối ưu nhất để đưa lên đầu mảng con[cite: 15]." },
  { id: 116, topic: "ND08: Big O", difficulty: "Dễ", question: "Trong phân tích hiệu năng thuật toán bằng ký pháp Big O, độ phức tạp thời gian đạt mức hằng số $O(1)$ mang ý nghĩa kỹ thuật nào?", code: "", options: ["Thời gian thực thi tăng trưởng tuyến tính theo kích thước dữ liệu đầu vào.", "Thuật toán tiêu tốn rất nhiều thời gian và làm nghẽn hệ thống.", "Thời gian chạy là một hằng số cố định, hoàn toàn độc lập và không bị ảnh hưởng bởi kích thước dữ liệu N.", "Thuật toán bị giới hạn nghiêm ngặt chỉ được phép chạy đúng 1 lần duy nhất."], correctAnswer: 2, explanation: "Độ phức tạp $O(1)$ (Hằng số thời gian) đại diện cho các thao tác xử lý tức thời, tốc độ thực thi không thay đổi bất kể dữ liệu đầu vào có lớn đến mức nào (Ví dụ: truy xuất phần tử mảng qua chỉ số hoặc tra cứu Key trong Dict) [cite: 16].", hint: "Hiệu năng xử lý độc lập, không phụ thuộc vào lượng dữ liệu N của bài toán[cite: 16]." },
  { id: 117, topic: "ND09: self", difficulty: "Dễ", question: "Từ khóa tham chiếu `self` xuất hiện ở tham số đầu tiên trong các phương thức (methods) của một lớp Python đại diện cho thực thể nào?", code: "def show(self):\n    print(self.name)", options: ["Đại diện cho Lớp cha (Base Class) của đối tượng hiện tại.", "Đại diện cho chính thực thể cụ thể (instance) đang trực tiếp gọi phương thức đó.", "Là một thư viện nội bộ tích hợp sẵn của Python.", "Đại diện cho biến phạm vi toàn cục của module."], correctAnswer: 1, explanation: "Trong lập trình hướng đối tượng Python, `self` không phải là từ khóa hệ thống bắt buộc mà là một quy ước đặt tên cho con trỏ, đại diện cho chính thực thể (instance) đang thi hành mã nguồn để truy xuất thuộc tính riêng của nó [cite: 17].", hint: "Self nghĩa là bản thân đối tượng hiện tại đang thực thi lệnh[cite: 17]." },
  { id: 118, topic: "ND10: Đệ quy cơ bản", difficulty: "Dễ", question: "Hãy xác định câu lệnh đóng vai trò là Điều kiện cơ sở (Base Case) chốt chặn để thu hồi Call Stack trong hàm tính giai thừa đệ quy dưới đây?", code: "def fact(n):\n    if n == 0: return 1\n    return n * fact(n-1)", options: ["def fact(n):", "if n == 0: return 1", "return n * fact(n-1)", "Hàm không có điểm dừng"], correctAnswer: 1, explanation: "Điều kiện cơ sở (Base Case) là nhánh rẽ logic giúp chấm dứt việc gọi đệ quy lồng nhau. Trong hàm trên, cụm lệnh `if n == 0: return 1` chính là điểm dừng, trả về giá trị trực tiếp để hệ thống bắt đầu thu hồi call stack [cite: 18].", hint: "Vị trí chốt chặn giúp hàm không tự gọi lại chính nó nữa[cite: 18]." },
  { id: 119, topic: "ND11: Timing of SyntaxError", difficulty: "Dễ", question: "Ngoại lệ cấu trúc `SyntaxError` (ví dụ quên dấu đóng mở ngoặc hoặc sai thụt lề) sẽ bị trình thông dịch Python phát hiện tại thời điểm nào?", code: "", options: ["Chỉ khi chương trình đang chạy và luồng điều khiển quét đến dòng lỗi đó.", "Ngay sau khi chương trình đã hoàn thành toàn bộ luồng chạy chính.", "Trước khi chương trình bắt đầu thực thi, nằm ở giai đoạn phân tích cú pháp mã nguồn (Parsing stage).", "Ngoại lệ này hoàn toàn tàng hình và không bị hệ thống phát hiện."], correctAnswer: 2, explanation: "Mặc dù Python là ngôn ngữ thông dịch, nhưng nó bắt buộc phải phân tích ngữ pháp toàn bộ file và biên dịch sang bytecode ở giai đoạn Parsing stage trước khi chạy dòng lệnh đầu tiên. Sai cú pháp sẽ chặn đứng chương trình lập tức [cite: 19].", hint: "Hệ thống sẽ bắt lỗi và thổi phạt ngay từ vòng gửi xe trước khi chạy mã nguồn[cite: 19]." },
  { id: 120, topic: "ND12: File mode 'a'", difficulty: "Dễ", question: "Chế độ mở tệp tin bổ sung `'a'` (Append) của hàm `open()` sở hữu đặc tính vận hành cốt lõi nào khác biệt hoàn toàn so với chế độ ghi đè `'w'` (Write)?", code: "", options: ["Chế độ 'a' thực hiện xóa trắng dữ liệu file, còn 'w' giữ nguyên.", "Chế độ 'a' cho phép ghi nối tiếp dữ liệu mới vào cuối tệp tin cũ mà không phá hủy nội dung, còn 'w' xóa trắng file trước khi ghi.", "Hai chế độ này hoàn toàn trùng khớp hành vi vận hành.", "Chế độ 'a' chỉ cấp quyền đọc dữ liệu tĩnh của file."], correctAnswer: 1, explanation: "Chế độ `'w'` (Write) sẽ xóa sạch nội dung file cũ về 0 bytes ngay khi mở. Trong khi đó, chế độ `'a'` (Append) bảo toàn dữ liệu cũ, chuyển con trỏ xuống cuối file để ghi nối tiếp thông tin mới vào đuôi .", hint: "Append mang ý nghĩa đính kèm dữ liệu vào phía cuối tài nguyên." },
  { id: 121, topic: "ND03: Precedence", difficulty: "Trung bình", question: "Hãy phân tích cẩn thận thứ tự ưu tiên thực thi giữa các toán tử lũy thừa, nhân, và chia lấy dư trong Python để xác định giá trị in ra của biểu thức số học phức hợp sau:", code: "print(2 * 3 ** 2 % 5)", options: ["3", "18", "0", "1"], correctAnswer: 0, explanation: "Theo quy tắc ưu tiên toán tử của Python, toán tử lũy thừa `**` được thực thi trước: `3 ** 2 = 9`. Tiếp theo, toán tử nhân `*` và chia lấy dư `%` có cùng cấp độ ưu tiên nên sẽ lượng giá từ trái sang phải: `2 * 9 = 18`, sau đó `18 % 5 = 3`.", hint: "Toán tử mũ (**) có quyền ưu tiên tối cao trước các phép toán nhân và chia dư." },
  { id: 122, topic: "ND03: Slicing", difficulty: "Trung bình", question: "Kỹ thuật cắt lát (Slicing) danh sách sử dụng chỉ số âm làm cận chốt chặn. Hãy xác định mảng con thu được sau khi thực thi biểu thức cắt lát dưới đây:", code: "l = [10, 20, 30, 40]\nprint(l[1:-1])", options: ["[20, 30]", "[20, 30, 40]", "[10, 20]", "[30]"], correctAnswer: 0, explanation: "Cú pháp cắt lát `l[start:stop]` trích xuất phần tử từ vị trí `start` đến sát vị trí `stop` (không bao gồm phần tử tại index `stop`). Chỉ số `start = 1` là số 20; chỉ số `stop = -1` tương ứng với số 40 (bị loại trừ). Kết quả trả về mảng `[20, 30]`.", hint: "Chỉ số -1 đại diện cho phần tử cuối cùng của danh sách và cận stop luôn bị loại trừ." },
  { id: 123, topic: "ND04: Chain Comparison", difficulty: "Trung bình", question: "Python hỗ trợ cơ chế đánh giá chuỗi so sánh liên hoàn (Chained comparison). Hãy cho biết biểu thức logic sau đây sẽ trả về kết quả chân lý nào?", code: "print(5 > 3 > 1)", options: ["True", "False", "Lỗi kiểu dữ liệu TypeError", "None"], correctAnswer: 0, explanation: "Biểu thức so sánh liên hoàn `5 > 3 > 1` được Python tự động phân tách và biên dịch tương đương với cấu trúc logic: `(5 > 3) and (3 > 1)`. Vì cả hai mệnh đề đều mang giá trị Đúng (True), kết quả tổng thể của phép toán là True.", hint: "Hệ thống sẽ chèn toán tử logic AND ngầm vào giữa các cặp toán tử so sánh." },
  { id: 124, topic: "ND04: Hàm any()", difficulty: "Trung bình", question: "Hàm kiểm tra thành phần linh hoạt `any()` hoạt động trên một Iterable. Biểu thức logic phức hợp sau đây sẽ trả về kết quả nào trên màn hình console?", code: "print(any([0, False, '']))", options: ["True", "False", "None", "Lỗi dữ liệu ValueError"], correctAnswer: 1, explanation: "Hàm `any()` trả về True nếu có ÍT NHẤT MỘT phần tử trong Iterable mang giá trị Truthy (Đúng). Ở đây, số số nguyên `0`, từ khóa `False`, và chuỗi rỗng `''` đều là các đối tượng mang giá trị Falsy (Sai). Do đó, hàm trả về False.", hint: "Tất cả các phần tử trong danh sách đầu vào đều ở trạng thái mang giá trị Sai (Falsy)." },
  { id: 125, topic: "ND05: While-else", difficulty: "Trung bình", question: "Cấu trúc vòng lặp `while` kết hợp khối điều khiển bổ trợ `else`. Hãy xác định chuỗi ký tự nào sẽ được xuất ra màn hình sau khi thực thi đoạn code sau:", code: "while False:\n    print('W')\nelse:\n    print('E')", options: ["W", "E", "W E", "Không in ra bất kỳ chữ nào"], correctAnswer: 1, explanation: "Khối lệnh `else` đính kèm sau vòng lặp `while` (hoặc `for`) được Python bảo đảm quyền thực thi khi và chỉ khi vòng lặp đó kết thúc một cách bình thường, trọn vẹn mà không bị bẻ gãy đột ngột bởi câu lệnh `break`. Do điều kiện ban đầu là False, thân vòng lặp không chạy lần nào (kết thúc an toàn), khối `else` được kích hoạt in ra 'E'.", hint: "Khối else của vòng lặp sẽ chạy nếu chu trình không bị phá vỡ bởi lệnh break." },
  { id: 126, topic: "ND05: Lặp lồng", difficulty: "Trung bình", question: "Phân tích cấu trúc hai vòng lặp lồng nhau tuần tự. Hãy tính toán xem câu lệnh tăng giá trị của biến đếm tích lũy `count` sẽ được thực thi tổng cộng bao nhiêu lần?", code: "count = 0\nfor i in range(2):\n    for j in range(3):\n        count += 1\nprint(count)", options: ["5", "6", "2", "3"], correctAnswer: 1, explanation: "Vòng lặp ngoài `i` duyệt qua không gian `range(2)` (chạy 2 lần). Với mỗi lượt của vòng ngoài, vòng lặp trong `j` lại duyệt qua trọn vẹn không gian `range(3)` (chạy 3 lần). Tổng số lần câu lệnh cộng dồn thực thi là phép nhân số vòng lặp: `2 * 3 = 6` lần.", hint: "Nhân số lượng chu trình của vòng lặp ngoài với số chu trình của vòng lặp trong." },
  { id: 127, topic: "ND06: Args len", difficulty: "Trung bình", question: "Khi thực hiện đo độ dài (length) các tham số gộp đa năng trong Python, đoạn mã cấu hình nạp dữ liệu dưới đây sẽ trả về kết quả hiển thị nào?", code: "def f(*a, **k):\n    print(len(a), len(k))\nf(1, 2, x=3)", options: ["2 1", "3 0", "1 2", "Lỗi biên dịch SyntaxError"], correctAnswer: 0, explanation: "Các đối số vị trí không đặt tên `1, 2` được thu thập và đóng gói vào cấu trúc Tuple `a`, do đó `len(a)` bằng 2. Đối số đặt tên dạng từ khóa `x=3` được đóng gói vào cấu trúc Dictionary `k`, do đó `len(k)` bằng 1. Kết quả in ra là 2 và 1.", hint: "*a gom các giá trị tự do, **k gom các giá trị ánh xạ có gắn nhãn tên gọi." },
  { id: 128, topic: "ND06: Từ khóa Nonlocal", difficulty: "Trung bình", question: "Cơ chế quản lý phạm vi biến lồng nhau đa tầng (Enclosing scope). Hãy xác định giá trị của biến `x` được xuất ra màn hình sau khi luồng hàm chạy xong:", code: "def outer():\n    x = 1\n    def inner():\n        nonlocal x\n        x = 2\n    inner()\n    print(x)\nouter()", options: ["1", "2", "None", "Lỗi phạm vi NameError"], correctAnswer: 1, explanation: "Từ khóa `nonlocal x` chỉ thị cho trình thông dịch biết rằng biến `x` trong hàm con `inner()` gắn liền với ô nhớ của biến `x` khai báo ở hàm cha `outer()`. Thao tác gán `x = 2` ở hàm con ghi đè trực tiếp lên tài sản của hàm cha, khiến lệnh in ra giá trị 2.", hint: "Cho phép sửa đổi trực tiếp giá trị của biến thuộc phạm vi Enclosing của hàm cha bao quanh." },
  { id: 129, topic: "ND07: List Comprehension", difficulty: "Trung bình", question: "Cú pháp List Comprehension kết hợp bộ lọc điều kiện đơn `if`. Hãy xác định mảng danh sách mới được sinh ra sau khi xử lý logic bộ lọc dưới đây:", code: "print([x for x in [1, 2, 3] if x > 1])", options: ["[1, 2, 3]", "[2, 3]", "[1]", "[]"], correctAnswer: 1, explanation: "Vòng lặp tiến hành duyệt qua từng phần tử của danh sách gốc `[1, 2, 3]`. Bộ lọc điều kiện `if x > 1` sẽ kiểm tra chân lý: loại bỏ phần tử 1 (vì 1 > 1 là Sai) và giữ lại các phần tử thỏa mãn là 2 và 3 để đóng gói vào list mới.", hint: "Tiến hành lọc bỏ toàn bộ các phần tử không thỏa mãn điều kiện lớn hơn 1." },
  { id: 130, topic: "ND07: Set Symmetric Difference", difficulty: "Trung bình", question: "Toán tử mũ `^` thực hiện phép toán Hiệu đối xứng (Symmetric Difference) giữa hai Tập hợp (Set). Tập hợp kết quả cuối cùng thu được sau phép toán gồm những phần tử nào?", code: "print({1, 2} ^ {2, 3})", options: ["{1, 3}", "{2}", "{1, 2, 3}", "Lỗi cấu trúc TypeError"], correctAnswer: 0, explanation: "Toán tử `^` đại diện cho phép toán Hiệu đối xứng trên tập hợp. Nó sẽ thu thập toàn bộ các phần tử chỉ xuất hiện độc quyền ở một trong hai tập hợp và loại bỏ hoàn toàn các phần tử chung xuất hiện ở cả hai bên (số 2). Kết quả là `{1, 3}`.", hint: "Lấy các phần tử là tài sản riêng của mỗi tập hợp, thanh lọc bỏ phần tử giao nhau." },
  { id: 131, topic: "ND08: Trace Binary Search", difficulty: "Trung bình", question: "Cho mảng đã sắp xếp tăng dần `[2, 4, 6, 8, 10]`. Khi áp dụng thuật toán Tìm kiếm nhị phân (Binary Search) để dò tìm số `6`, chỉ số ở giữa `mid` ở lần chia đôi đầu tiên trỏ vào giá trị nào?", code: "", options: ["4", "8", "6", "2"], correctAnswer: 2, explanation: "Mảng gồm 5 phần tử (chỉ mục từ 0 đến 4). Chỉ số trái `left = 0`, chỉ số phải `right = 4`. Công thức tính điểm giữa: `mid = (left + right) // 2 = (0 + 4) // 2 = 2`. Phần tử tại chỉ mục 2 của mảng chính là số 6.", hint: "Tính trung bình cộng chỉ số biên rồi truy xuất giá trị nằm ở chính giữa mảng." },
  { id: 132, topic: "ND08: Bubble Sort swaps", difficulty: "Trung bình", question: "Hãy phân tích và tính toán xem thuật toán Sắp xếp nổi bọt (Bubble Sort) thô sơ phải tiêu tốn chính xác bao nhiêu lượt hoán đổi vị trí (Swaps) để cấu trúc lại mảng nghịch thế hoàn toàn `[3, 2, 1]` thành tăng dần?", code: "", options: ["1", "2", "3", "0"], correctAnswer: 2, explanation: "Quá trình dịch chuyển diễn ra: \n- Lượt 1: so sánh (3,2) -> swap thành [2,3,1]; so sánh (3,1) -> swap thành [2,1,3] (Tốn 2 hoán đổi).\n- Lượt 2: so sánh (2,1) -> swap thành [1,2,3]; so sánh (2,3) -> ok (Tốn 1 hoán đổi). Tổng cộng mất 3 lượt swap.", hint: "Đếm từng phép hoán đổi cặp phần tử liền kề đứng ngược thứ tự qua mỗi vòng quét mảng." },
  { id: 133, topic: "ND09: OOP Ghi đè __str__", difficulty: "Trung bình", question: "Trong lập trình hướng đối tượng với Python, phương thức magic dunder nào cần được ghi đè (override) để thay đổi nội dung văn bản hiển thị khi lập trình viên thực hiện lệnh `print(obj)`?", code: "", options: ["__init__", "__str__", "__call__", "__print__"], correctAnswer: 1, explanation: "Phương thức `__str__` được thiết kế để trả về một chuỗi ký tự (String) đại diện trực quan, thân thiện với người dùng của đối tượng. Khi ta gọi `print(obj)` hoặc `str(obj)`, Python sẽ tự động kích hoạt phương thức này.", hint: "Tên viết tắt của kiểu dữ liệu chuỗi ký tự String trong hệ thống." },
  { id: 134, topic: "ND09: Abstract Class", difficulty: "Trung bình", question: "Hành vi kỹ thuật nào sẽ xảy ra nếu lập trình viên cố tình khởi tạo trực tiếp một thực thể (instantiate an object) từ một Lớp trừu tượng (Abstract Class) có chứa phương thức `@abstractmethod`?", code: "", options: ["Đối tượng được tạo thành công với các thuộc tính rỗng.", "Hệ thống chặn đứng và ném ra ngoại lệ nghiêm trọng TypeError.", "Lớp trừu tượng tự động sinh ra một lớp con thay thế.", "Hàm trả về giá trị định danh None."], correctAnswer: 1, explanation: "Lớp trừu tượng chỉ đóng vai trò làm bản thiết kế khung mẫu (blueprint). Khối lõi CPython kiểm soát nghiêm ngặt hành vi này; nếu cố tình khởi tạo trực tiếp đối tượng từ lớp trừu tượng, hệ thống sẽ chặn đứng và báo lỗi TypeError.", hint: "Một bản vẽ thiết kế trên giấy thì không thể vận hành trực tiếp như vật thể thực tế." },
  { id: 135, topic: "ND10: Tabulation", difficulty: "Trung bình", question: "Trong thiết kế giải thuật Quy hoạch động (Dynamic Programming), kỹ thuật Lập bảng (Tabulation) áp dụng chiến lược tư duy điều khiển luồng tính toán theo chiều nào?", code: "", options: ["Top-down (Từ đỉnh bài toán lớn phân rã đệ quy xuống dưới đáy)", "Bottom-up (Từ đáy bài toán nhỏ nhất tích lũy bằng vòng lặp tiến lên đỉnh)", "Duyệt ngẫu nhiên không kiểm soát dữ liệu", "Chia để trị cắt đôi không gian mảng nhị phân"], correctAnswer: 1, explanation: "Kỹ thuật Tabulation xây dựng lời giải theo hướng Bottom-up (từ dưới lên). Nó khởi tạo một bảng dữ liệu (mảng), sử dụng vòng lặp tuyến tính tính toán và lưu trữ kết quả từ các bài toán cơ sở nhỏ nhất để làm bàn đạp tính dần lên bài toán đích.", hint: "Giải quyết triệt để từ móng cấu trúc đi lên bằng các vòng lặp không đệ quy." },
  { id: 136, topic: "ND10: Recursion Trace", difficulty: "Trung bình", question: "Thực hiện dò vết thuật toán (tracing) luồng gọi đệ quy lồng nhau của hàm số dưới đây. Hãy tính toán xem lời gọi hàm `f(4)` sẽ trả về giá trị toán học bằng bao nhiêu?", code: "def f(n):\n    if n < 2: return n\n    return f(n-1) + f(n-2)\nprint(f(4))", options: ["3", "4", "2", "5"], correctAnswer: 0, explanation: "Đây là thuật toán đệ quy sinh chuỗi Fibonacci kinh điển với f(0)=0, f(1)=1. Trace luồng:\n- f(2) = f(1) + f(0) = 1 + 0 = 1\n- f(3) = f(2) + f(1) = 1 + 1 = 2\n- f(4) = f(3) + f(2) = 2 + 1 = 3. Giá trị trả về là 3.", hint: "Thuật toán đệ quy đa nhánh mô phỏng quy luật cộng dồn của dãy số Fibonacci." },
  { id: 137, topic: "ND11: Return trong Try", difficulty: "Trung bình", question: "Hãy phân tích kỹ sự tranh chấp điều khiển luồng thoát hàm khi xuất hiện từ khóa `return` ở khối `try` kết hợp khối bảo mật tối cao `finally`. Đoạn mã sau xuất ra chuỗi gì?", code: "def t():\n    try:\n        return 1\n    finally:\n        print('F')\nprint(t())", options: ["1", "Chữ 'F' xuất hiện trước, số 1 xuất hiện sau", "Số 1 xuất hiện trước, chữ 'F' xuất hiện sau", "Chỉ in ra chữ 'F'"], correctAnswer: 1, explanation: "Khi lệnh `return 1` trong khối `try` được gọi, giá trị trả về bị đưa vào trạng thái tạm giữ. Python bắt buộc phải chuyển giao luồng điều khiển xuống thi hành trọn vẹn khối `finally` trước khi rời hàm -> in ra 'F'. Sau đó hàm mới thoát và trả số 1 về cho lệnh in ngoài.", hint: "Khối finally luôn giành được quyền thực thi chốt chặn trước khi hàm thực sự giải phóng vùng nhớ." },
  { id: 138, topic: "ND12: read() vs readlines()", difficulty: "Trung bình", question: "Khác biệt cốt lõi về cấu trúc dữ liệu trả về và cơ chế quản lý bộ nhớ RAM giữa phương thức `.read()` và phương thức `.readlines()` trên đối tượng file là gì?", code: "", options: ["Chúng hoàn toàn trùng khớp cấu trúc dữ liệu trả về.", "`.read()` tải file vào một biến String nguyên khối; `.readlines()` chẻ văn bản thành một List chứa các dòng chuỗi biệt lập.", "`.read()` chỉ đọc được duy nhất một dòng văn bản đầu tiên của file.", "`.read()` tự động trả về một danh sách các byte thô dạng nhị phân."], correctAnswer: 1, explanation: "Phương thức `.read()` đọc toàn bộ nội dung tệp tin và đóng gói vào một đối tượng chuỗi văn bản (String) duy nhất. Trong khi đó, `.readlines()` quét qua tệp tin, chẻ văn bản dựa trên ký tự xuống dòng `\\n` để trả về một danh sách (List) gồm nhiều chuỗi dòng.", hint: "Sự khác biệt giữa một chuỗi văn bản chuỗi dài nguyên khối và một danh sách mảng các dòng." },
  { id: 139, topic: "Nâng cao: K-Means", difficulty: "Trung bình", question: "Trong kiến trúc thuật toán học máy phân cụm không giám sát K-Means, ký tự đại diện 'K' mang ý nghĩa kỹ thuật nào?", code: "", options: ["Hệ số góc tăng trưởng của dữ liệu", "Số lượng các cụm dữ liệu (clusters) cần phân chia được định cấu hình trước bởi người dùng", "Số lượng vòng lặp tối đa để thuật toán đạt điểm hội tụ", "Hàm đo lường sai số khoảng cách Euclid bình phương"], correctAnswer: 1, explanation: "Trong thuật toán K-Means, chữ 'K' là một siêu tham số (hyperparameter) do người dùng thiết lập từ trước, quy định số lượng nhóm hoặc tâm cụm (centroids) mà hệ thống cần phân tách và gom cụm dữ liệu vào.", hint: "Chỉ số biểu thị số lượng phân nhóm mục tiêu mà người lập trình muốn hệ thống hướng tới." },
  { id: 140, topic: "Nâng cao: deque O(1)", difficulty: "Trung bình", question: "Khi xây dựng cấu trúc dữ liệu Hàng đợi (Queue), tại sao lập trình viên luôn được khuyến cáo sử dụng phương thức `d.popleft()` của `collections.deque` thay vì `list.pop(0)`?", code: "", options: ["Vì cú pháp của đối tượng deque ngắn gọn và dễ bảo trì hơn.", "Vì `list.pop(0)` tốn chi phí thời gian tuyến tính $O(N)$ để dịch mảng vật lý, còn `d.popleft()` đạt hiệu năng hằng số $O(1)$.", "Vì cấu trúc mảng List của Python không hỗ trợ hàm xóa phần tử ở đầu.", "Vì deque có khả năng tự động nạp dữ liệu Dictionary vào bảng băm."], correctAnswer: 1, explanation: "List của Python bản chất là mảng động (dynamic array), việc bẻ phần tử đầu tiên index 0 bằng `.pop(0)` buộc hệ thống phải dịch chuyển toàn bộ $N-1$ phần tử còn lại tiến lên 1 ô ($O(N)$). Deque là danh sách liên kết đôi, việc hủy node đầu chỉ tốn chi phí hằng số $O(1)$.", hint: "Tránh thao tác xê dịch ô nhớ vật lý trên bộ nhớ RAM khi rút phần tử ở đầu hàng." },
  { id: 141, topic: "ND03: Nhận dạng tham chiếu (is)", difficulty: "Khó", question: "Bẫy định danh thực thể vật lý (Object Identity). Hãy trace kỹ địa chỉ bộ nhớ cấp phát của kiểu dữ liệu khả biến (mutable) để xác định kết quả in ra của đoạn mã sau:", code: "a = [1]\nb = [1]\nprint(a is b)", options: ["True", "False", "Error văng ngoại lệ bộ nhớ", "None"], correctAnswer: 1, explanation: "Toán tử `is` dùng để kiểm tra xem hai biến có trỏ vào CÙNG một địa chỉ vùng nhớ vật lý trên RAM hay không. Vì List là kiểu mutable, mỗi lần ta khai báo một cặp ngoặc vuông `[1]`, Python bắt buộc phải khởi tạo một vùng nhớ mới độc lập, nên địa chỉ khác nhau -> trả về False.", hint: "Dù nội dung giá trị bên trong giống hệt nhau, nhưng chúng là hai vật thể hoàn toàn biệt lập trên thanh RAM." },
  { id: 142, topic: "ND04: Bẫy so sánh kép", difficulty: "Khó", question: "Cạm bẫy toán tử so sánh bắc cầu liên tiếp kết hợp toán tử quan hệ logic. Hãy phân tích chuỗi lượng giá của CPython để xác định giá trị in ra:", code: "print(1 == 2 != 3)", options: ["True", "False", "Lỗi phân tích ngữ nghĩa TypeError", "None"], correctAnswer: 1, explanation: "Biểu thức so sánh kép `1 == 2 != 3` được CPython bẻ gãy và phân tích tương đương với cấu trúc logic: `(1 == 2) and (2 != 3)`. Đánh giá biểu thức nhánh bên trái: `(1 == 2)` kết quả ra False. Vì dính toán tử `and`, toàn bộ biểu thức lập tức sụp đổ và trả về False.", hint: "Thực hiện chèn từ khóa logic AND nối giữa các cặp so sánh đơn lẻ từ trái sang phải." },
  { id: 143, topic: "ND05: Tham số mặc định Lambda (Sớm vs Muộn)", difficulty: "Khó", question: "Bẫy liên kết muộn (Late Binding Trap) trong cấu trúc hàm ẩn danh Lambda kết hợp tham số mặc định (Default argument). Hãy xác định kết quả xuất ra:", code: "funcs = [lambda x=i: x for i in range(3)]\nprint([f() for f in funcs])", options: ["0, 1, 2", "2, 2, 2", "Lỗi runtime ngoại lệ hệ thống", "None"], correctAnswer: 0, explanation: "Thông thường, vòng lặp Comprehension tạo Lambda sẽ dính lỗi Late Binding (tất cả trả về giá trị cuối cùng). Tuy nhiên, ở đây ta sử dụng tiểu xảo truyền `x=i` làm tham số mặc định. Default arguments được tính toán NGAY LẬP TỨC tại thời điểm định nghĩa hàm (Early binding), nạp cứng 0, 1, 2 vào bộ nhớ.", hint: "Cơ chế khởi tạo tham số mặc định ngay khi khai báo đã bẻ gãy hoàn toàn bẫy Late Binding của Closure." },
  { id: 144, topic: "ND06: Lệnh gán và Scope", difficulty: "Khó", question: "Tại sao việc thực thi lời gọi hàm `f()` dưới đây lại ngay lập tức khiến hệ thống văng lỗi ngoại lệ nghiêm trọng `UnboundLocalError`?", code: "cnt = 0\ndef f():\n    cnt += 1\nf()", options: ["Do hệ thống chưa import các thư viện toán học", "Sự xuất hiện của toán tử gán (+=) vô tình ép cnt thành biến cục bộ khi chưa khởi tạo giá trị ở Local Scope", "Vì biến cnt đang lưu giá trị không phải là một số nguyên", "Hàm vận hành hoàn hảo không phát sinh bất kỳ lỗi nào"], correctAnswer: 1, explanation: "Trong quy tắc biên dịch của Python, hễ trong thân hàm xuất hiện bất kỳ câu lệnh gán nào (`=`, `+=`), trình thông dịch sẽ mặc định đóng nhãn biến đó là biến cục bộ (Local variable) của hàm. Khi chạy vế phải `cnt + 1`, hệ thống tìm giá trị `cnt` ở Local nhưng chưa thấy có dữ liệu -> báo lỗi.", hint: "Sự hiện diện của toán tử gán tự động khóa chặt scope của biến vào phạm vi Local cục bộ." },
  { id: 145, topic: "ND07: Unhashable Key Dict", difficulty: "Khó", question: "Đoạn mã khởi tạo cấu trúc dữ liệu Dictionary dưới đây sẽ phát sinh lỗi ngoại lệ hệ thống cụ thể nào do vi phạm quy tắc bảng băm?", code: "d = {(1, [2]): 'A'}", options: ["Lỗi cú pháp SyntaxError", "Lỗi không tìm thấy khóa KeyError", "Lỗi kiểu dữ liệu TypeError: unhashable type: 'list'", "Chương trình chạy bình thường"], correctAnswer: 2, explanation: "Dictionary yêu cầu tất cả các Khóa (Keys) bắt buộc phải là đối tượng bất biến và có thể tính mã băm (Hashable). Mặc dù Tuple là cấu trúc bất biến, nhưng phần tử bên trong nó lại chứa một danh sách `[2]` là kiểu dữ liệu khả biến (Mutable/Unhashable). Điều này làm hỏng tính băm của Tuple.", hint: "Nếu bên trong ruột của một cấu trúc bất biến chứa một vật thể khả biến thì tổng thể đối tượng đó bị coi là hợp thể lỗi." },
  { id: 146, topic: "ND07: Shallow Copy", difficulty: "Khó", question: "Cạm bẫy sao chép nông (Shallow Copy) kết hợp lát cắt mảng toàn bộ `[:]`. Hãy phân tích sự thay đổi vùng nhớ để xác định giá trị mảng gốc `a` sau phép toán append:", code: "a = [[1]]\nb = a[:]\nb[0].append(2)\nprint(a)", options: ["[[1]]", "[[1, 2]]", "[]", "Lỗi runtime hệ thống"], correctAnswer: 1, explanation: "Cú pháp cắt lát toàn bộ `a[:]` thực hiện hành vi sao chép nông (Shallow Copy). Nó tạo ra một đối tượng mảng `b` mới ở lớp vỏ ngoài, nhưng các phần tử mảng lồng bên trong `[1]` vẫn chia sẻ chung địa chỉ ô nhớ vật lý giữa `a` và `b`. Sửa đổi mảng con ở `b` khiến mảng con của `a` biến đổi theo.", hint: "Lớp vỏ bảo vệ bên ngoài đã được chia tách độc lập, nhưng huyết mạch tham chiếu bên trong vẫn dính liền." },
  { id: 147, topic: "ND09: MRO __mro__", difficulty: "Khó", question: "Dựa trên thuật toán phân giải thứ tự phương thức C3 Linearization, thuộc tính tra cứu tuyến tính `__mro__` của `class D` trong sơ đồ kế thừa kim cương dưới đây sẽ ưu tiên lớp nào ở chỉ mục index 1?", code: "class A: pass\nclass B(A): pass\nclass C(A): pass\nclass D(C, B): pass", options: ["class B", "class C", "class A", "class D"], correctAnswer: 1, explanation: "Cấu trúc định nghĩa đa kế thừa `class D(C, B)` quy định danh sách tìm kiếm từ trái qua phải. Thuật toán C3 sẽ quét qua lớp con bên trái trước (`C`), sau đó quét sang lớp con bên phải (`B`), và trì hoãn tổ tiên chung (`A`) ở cuối cùng. Chuỗi MRO: [D, C, B, A, object]. Vị trí index 1 chính là lớp C.", hint: "Trình thông dịch sẽ ưu tiên quét qua các nhánh con theo thứ tự từ trái sang phải tại dòng khai báo kế thừa." },
  { id: 148, topic: "ND11: Dead Exception", difficulty: "Khó", question: "Cạm bẫy thiết kế khối bẫy lỗi ngoại lệ. Hãy xác định xem khối lệnh rẽ nhánh cụ thể nào trong đoạn code dưới đây sẽ rơi vào trạng thái vùng code chết (Dead code) không bao giờ được chạm tới?", code: "try:\n    1/0\nexcept Exception:\n    print('A')\nexcept ZeroDivisionError:\n    print('B')", options: ["Cả hai khối except đều chạy song song", "Khối in chữ 'A'", "Khối in chữ 'B' (ZeroDivisionError)", "Không có khối nào là vùng code chết"], correctAnswer: 2, explanation: "Trong cấu trúc phân cấp ngoại lệ của Python, lớp `Exception` là lớp cha tối cao chứa tất cả các lỗi runtime. Do khối `except Exception` đặt trên cùng, nó tạo thành một tấm lưới khổng lồ hứng trọn mọi sự cố, khiến khối lỗi chuyên biệt `ZeroDivisionError` phía dưới vĩnh viễn bị cô lập và không bao giờ chạy.", hint: "Đặt lưới có mắt quá to lên phía trước lưới mắt nhỏ sẽ làm vô hiệu hóa hoàn toàn công năng của tấm lưới phía sau." },
  { id: 149, topic: "ND12: Iterator File cạn kiệt", difficulty: "Khó", question: "Đối tượng file open trong Python hoạt động theo cơ chế luồng dữ liệu một chiều (Iterator protocol). Nếu tệp tin `a.txt` chỉ chứa duy nhất 1 dòng văn bản, lệnh gọi `next(f)` thứ hai sẽ gây ra ngoại lệ gì?", code: "with open('a.txt') as f:\n    next(f)\n    next(f)", options: ["Lỗi tìm kiếm khóa KeyError", "Ngoại lệ cạn kiệt luồng StopIteration", "Lỗi kết thúc file EOFError", "Chương trình tự động chạy tiếp mà không lỗi"], correctAnswer: 1, explanation: "File object cài đặt các phương thức của một Iterator chuẩn mực. Mỗi lời gọi `next(f)` sẽ kéo luồng bộ nhớ tiến lên để đọc một dòng. Khi con trỏ đã chạm đáy tệp tin và dữ liệu cạn kiệt hoàn toàn, lời gọi `next()` kế tiếp theo đặc tả kỹ thuật bắt buộc phải ném ra lỗi `StopIteration`.", hint: "Ngoại lệ đặc trưng của giao thức Iterator dùng để thông báo luồng nạp dữ liệu đã cạn kiệt." },
  { id: 150, topic: "Nâng cao: Vô cực (Inf)", difficulty: "Khó", question: "Dựa trên các đặc tả kỹ thuật quản lý số toán học dấu phẩy động chuẩn chuẩn quốc tế IEEE 754 của CPython, biểu thức so sánh chân lý dưới đây sẽ trả về kết quả nào?", code: "print(float('inf') + 1 == float('inf'))", options: ["True", "False", "Lỗi tính toán tràn số OverflowError", "None"], correctAnswer: 0, explanation: "Đối tượng `float('inf')` đại diện cho khái niệm toán học Vô cực Dương (Positive Infinity). Theo quy ước xử lý số học của chuẩn máy tính IEEE 754, khi thực hiện phép toán cộng thêm một giá trị hữu hạn vào vô cực, kết quả thu được vẫn là chính nó (Vô cực), do đó phép so sánh bằng trả về giá trị Đúng (True).", hint: "Biển cả bao la dù có đổ thêm một giọt nước thì tổng thể dung lượng vẫn được coi là biển cả vô tận." },
];

const EXAM_SET_04_DATA = [
  { id: 151, topic: "ND01: Phân rã (Decomposition)", difficulty: "Dễ", question: "Kỹ thuật chia nhỏ một quy trình hệ thống phức tạp thành các chương trình con chuyên biệt (`chop_veg()`, `boil_water()`, `cook()`) nhằm mục đích cô lập logic và dễ quản lý là biểu hiện của kỹ năng nào?", code: "", options: ["Nhận dạng mẫu", "Phân rã (Decomposition)", "Trừu tượng hóa dữ liệu", "Thiết kế thuật toán tuần tự"], correctAnswer: 1, explanation: "Phân rã (Decomposition) bẻ gãy một bài toán lớn, phức tạp thành các module hoặc hàm con độc lập, giúp việc lập trình, kiểm thử và bảo trì mã nguồn diễn ra cuốn chiếu hiệu quả.", hint: "Chiến thuật chia bài toán lớn thành các phần độc lập nhỏ hơn." },
  { id: 152, topic: "ND01: Trừu tượng hóa", difficulty: "Dễ", question: "Việc sử dụng phương thức của thư viện `math.sqrt(x)` để trích xuất căn bậc hai mà người lập trình không cần quan tâm đến thuật toán giải số Newton-Raphson bên trong là ứng dụng của:", code: "", options: ["Phân rã chức năng", "Quy hoạch động tối ưu", "Trừu tượng hóa (Abstraction)", "Nhận dạng mẫu lặp"], correctAnswer: 2, explanation: "Trừu tượng hóa (Abstraction) tập trung vào việc che giấu các chi tiết cài đặt phức tạp ở tầng dưới, chỉ cung cấp một giao diện (interface) đơn giản, tường minh ra bên ngoài cho người sử dụng.", hint: "Ẩn đi sự phức tạp ẩn sau giao diện lập trình trực quan." },
  { id: 153, topic: "ND02: AI Prompting", difficulty: "Dễ", question: "Khi chèn chỉ thị nghiêm ngặt 'Hãy cấu trúc câu trả lời dưới dạng một danh sách gạch đầu dòng tuân thủ schema định sẵn' vào prompt, bạn đang định nghĩa thành phần cấu trúc nào?", code: "", options: ["Context (Ngữ cảnh nền)", "Role (Vai trò chuyên gia)", "Output Format / Constraint (Định dạng đầu ra)", "Input Data (Dữ liệu đầu vào)"], correctAnswer: 2, explanation: "Cấu hình hình thức hiển thị như gạch đầu dòng, bảng biểu hoặc JSON chính là việc thiết lập Định dạng đầu ra (Output Format / Constraint) nhằm định hướng mô hình AI trả về kết quả khớp với mã xử lý tự động.", hint: "Ràng buộc về hình thái và cấu trúc trình bày văn bản của AI." },
  { id: 154, topic: "ND02: AI Hallucination", difficulty: "Dễ", question: "Đâu là một trường hợp kinh điển minh chứng cho việc mô hình ngôn ngữ lớn (LLM) đang bị rơi vào trạng thái 'Ảo giác' (Hallucination) khi lập trình?", code: "", options: ["AI từ chối sinh mã lệnh do phát hiện prompt vi phạm chính sách an toàn.", "AI thực hiện tóm tắt chính xác nội dung hàm đệ quy.", "AI tự tin tạo ra một đường link URL bài báo hoặc một hàm thư viện trông rất thật nhưng thực tế hoàn toàn không tồn tại.", "AI chuyển đổi mượt mà mã nguồn Python sang cấu trúc ngôn ngữ C++."], correctAnswer: 2, explanation: "Ảo giác xảy ra khi LLM ngụy tạo ra các thông tin hoàn toàn sai lệch hoặc các tài nguyên không có thật nhưng lại viết bằng một giọng văn vô cùng tự tin, mạch lạc, dễ đánh lừa lập trình viên.", hint: "AI tự tin bịa đặt ra những thông tin không hề có trong thực tế." },
  { id: 155, topic: "ND03: Phép toán dư", difficulty: "Dễ", question: "Hãy phân tích cơ chế toán học số học của Python để xác định kết quả chính xác của lệnh in giá trị phép toán modulo sau đây:", code: "print(15 % 4)", options: ["3.75", "3", "4", "0"], correctAnswer: 1, explanation: "Phép toán `%` là toán tử lấy phần dư của phép chia. 15 chia cho 4 được 3 và dư 3 (vì 4 * 3 = 12, thừa ra 3 đơn vị).", hint: "Tìm số dư còn sót lại sau khi thực hiện phép chia nguyên cực đại." },
  { id: 156, topic: "ND03: Định dạng chuỗi", difficulty: "Dễ", question: "Đoạn code sử dụng cơ chế nội suy f-string nâng cao dưới đây sẽ xuất ra kết quả hiển thị nào trên màn hình console?", code: "name = 'Bob'\nprint(f'Hi {name!r}')", options: ["Hi Bob", "Hi 'Bob'", "Hi {name}", "Error văng cú pháp"], correctAnswer: 1, explanation: "Hậu tố `!r` trong f-string ép Python gọi hàm `repr(name)` thay vì `str(name)`. Hàm `repr()` trả về chuỗi đại diện chuẩn dùng để debug, bao gồm cả dấu ngoặc đơn bao quanh chuỗi: `'Bob'`. Do đó in ra `Hi 'Bob'`.", hint: "Hậu tố !r ép gọi hàm repr() để lấy chuỗi debug có kèm ngoặc." },
  { id: 157, topic: "ND04: Toán tử Boolean", difficulty: "Dễ", question: "Dựa trên thứ tự ưu tiên của các toán tử logic boolean trong Python, biểu thức điều kiện sau đây sẽ trả về giá trị chân lý nào?", code: "print(not False and True)", options: ["False", "True", "None", "Error"], correctAnswer: 1, explanation: "Toán tử `not` có quyền ưu tiên cao hơn `and`. Đầu tiên biểu thức biến đổi `not False` thành `True`. Sau đó thực hiện phép toán `True and True`, cho ra kết quả cuối cùng là True.", hint: "Thực hiện phủ định của Sai trước, rồi mới thực hiện phép hội AND." },
  { id: 158, topic: "ND04: Chuỗi Truthy/Falsy", difficulty: "Dễ", question: "Hãy đánh giá tính chất chân lý Truthy/Falsy của đối tượng chuỗi để xác định xem chương trình sau sẽ rẽ nhánh thực thi vào đâu?", code: "if \"\":\n    print(\"A\")\nelse:\n    print(\"B\")", options: ["A", "B", "Lỗi cú pháp SyntaxError", "Không xuất ra màn hình nội dung gì"], correctAnswer: 1, explanation: "Trong ngôn ngữ Python, một chuỗi hoàn toàn rỗng `\"\"` (độ dài bằng 0) luôn mang giá trị chân lý Falsy (Sai). Do đó, điều kiện `if` thất bại, luồng điều khiển nhảy vào nhánh `else` và in ra chữ \"B\".", hint: "Chuỗi không chứa bất kỳ ký tự nào bên trong luôn bị coi là Sai." },
  { id: 159, topic: "ND05: Vòng lặp range", difficulty: "Dễ", question: "Hàm sinh dãy số `range(start, stop)` kiểm soát các cận biên như thế nào? Vòng lặp sau sẽ in ra chuỗi số liên tiếp nào?", code: "for i in range(1, 4):\n    print(i, end='')", options: ["124", "123", "0123", "13"], correctAnswer: 1, explanation: "Hàm `range(1, 4)` sinh ra chuỗi các số nguyên bắt đầu từ `start = 1` và bắt buộc phải dừng lại ngay trước cận trên `stop = 4`. Dãy số bao gồm 1, 2, 3.", hint: "Cận trên stop của hàm range không bao giờ được lấy vào dãy." },
  { id: 160, topic: "ND05: Câu lệnh Continue", difficulty: "Dễ", question: "Lệnh điều khiển nhảy bước lặp `continue` bên trong cấu trúc vòng lặp sở hữu đặc tính vận hành cốt lõi nào?", code: "", options: ["Phá vỡ và giải phóng hoàn toàn vòng lặp chứa nó.", "Dừng khẩn cấp toàn bộ tiến trình hệ thống.", "Lập tức bỏ qua các câu lệnh còn lại trong chu trình hiện tại và chuyển giao luồng về bước đánh giá lặp mới.", "Tạo ra một chu trình lặp vô hạn biến đếm."], correctAnswer: 2, explanation: "Khi đụng phải lệnh `continue`, Python lập tức hủy bỏ các dòng code phía dưới nó thuộc chu trình hiện hành, quay ngược con trỏ về đầu vòng lặp để thực hiện bước nhảy và đánh giá điều kiện lặp kế tiếp.", hint: "Tua nhanh chu trình hiện tại để bước sang lần lặp tiếp theo." },
  { id: 161, topic: "ND06: Ràng buộc tham số", difficulty: "Dễ", question: "Nguyên tắc thiết lập trật tự khai báo giữa tham số bắt buộc (positional) và tham số tùy chọn có giá trị mặc định (default arguments) trong Python là gì?", code: "", options: ["Tham số mặc định phải đặt TRƯỚC tham số bắt buộc.", "Tham số mặc định bắt buộc phải khai báo SAU toàn bộ các tham số bắt buộc.", "Thứ tự sắp xếp hoàn toàn ngẫu nhiên tùy thuộc vào trình biên dịch.", "Hàm chỉ cho phép khai báo tối đa 1 tham số có giá trị mặc định."], correctAnswer: 1, explanation: "Python yêu cầu tất cả các tham số không có giá trị mặc định phải được liệt kê trước. Các tham số mặc định phải xếp ở cuối cùng, nếu viết ngược lại (`def f(a=1, b):`), Python sẽ báo lỗi cú pháp ngay khi compile.", hint: "Tham số bắt buộc đi trước, tham số có lá chắn mặc định đi sau." },
  { id: 162, topic: "ND06: Scope toàn cục", difficulty: "Dễ", question: "Dựa trên tầm vực biến và quy tắc LEGB, hàm số sau đây có quyền truy cập để đọc giá trị của biến toàn cục `x` hay không và xuất ra kết quả gì?", code: "x = 5\ndef f():\n    print(x)\nf()", options: ["Có quyền truy cập, in ra giá trị 5", "Không có quyền, báo lỗi NameError", "Ném ra ngoại lệ cục bộ UnboundLocalError", "Hàm chạy lỗi và trả về None"], correctAnswer: 0, explanation: "Một hàm số có toàn quyền đọc (read-only) giá trị của các biến nằm ở phạm vi toàn cục (Global scope) mà không cần sử dụng từ khóa `global`. Chương trình in ra giá trị 5 bình thường.", hint: "Quyền đọc dữ liệu từ scope cha ra ngoài luôn được hệ thống cho phép." },
  { id: 163, topic: "ND07: Dictionary Keys", difficulty: "Dễ", question: "Tính chất cơ học quan trọng nhất bắt buộc phải có đối với các đối tượng được sử dụng làm Khóa (Keys) trong cấu trúc dữ liệu Dictionary là gì?", code: "", options: ["Bắt buộc phải là các con số nguyên dương cấu trúc.", "Phải là kiểu dữ liệu khả biến cho phép cập nhật runtime.", "Phải là kiểu dữ liệu bất biến và có khả năng tính mã băm cố định (Hashable).", "Các khóa bắt buộc phải tự động sắp xếp theo thứ tự tăng dần."], correctAnswer: 2, explanation: "Để tra cứu phần tử ở độ phức tạp O(1) dựa trên bảng băm, Dictionary yêu cầu các Key phải bất biến (Immutable/Hashable) như chuỗi, số, tuple, nhằm đảm bảo mã băm của khóa không bị biến đổi trong suốt vòng đời lưu trữ.", hint: "Giá trị của vật thể làm khóa phải đóng băng cố định để tính mã băm." },
  { id: 164, topic: "ND07: List Comprehension", difficulty: "Dễ", question: "Mảng danh sách động được sinh ra từ cú pháp viết gọn List Comprehension dưới đây sẽ bao gồm các phần tử nào?", code: "print([x for x in range(3)])", options: ["[1, 2, 3]", "[0, 1, 2, 3]", "[0, 1, 2]", "[]"], correctAnswer: 2, explanation: "Biểu thức `range(3)` sinh ra dãy số nguyên gồm: 0, 1, 2. Khối lệnh List Comprehension lặp qua dãy này và đóng gói nguyên vẹn các phần tử vào một mảng List mới.", hint: "Đóng gói dãy số nguyên chạy từ số 0 đến sát số 3." },
  { id: 165, topic: "ND08: Nổi bọt cơ bản", difficulty: "Dễ", question: "Thuật toán Sắp xếp nổi bọt (Bubble Sort) thực thi việc sắp xếp dữ liệu dựa trên cơ chế cốt lõi nào?", code: "", options: ["Cắt đôi mảng vật lý thành các phân mảnh nhị phân nhỏ.", "Liên tục so sánh và hoán đổi vị trí của các cặp phần tử đứng liền kề nhau nếu ngược thứ tự mục tiêu.", "Tuyển chọn phần tử nhỏ nhất và đẩy thẳng lên đầu hàng chưa xếp.", "Sắp xếp dựa trên bảng mã băm ký tự."], correctAnswer: 1, explanation: "Bubble Sort hoạt động bằng cách quét mảng nhiều vòng. Tại mỗi vòng, nó so sánh liên tiếp từng cặp phần tử lân cận nhau, nếu chúng sai thứ tự thì hoán đổi (swap), đẩy phần tử lớn nhất nổi dần về cuối mảng.", hint: "Thực hiện phép toán so sánh và hoán đổi giữa các phần tử lân cận sát sườn." },
  { id: 166, topic: "ND08: Phân tích Nhị phân Big O", difficulty: "Dễ", question: "Tại sao thuật toán Tìm kiếm nhị phân (Binary Search) trên một mảng đã sắp xếp lại đạt được độ phức tạp thời gian tiệm cận tối ưu là $O(\log N)$?", code: "", options: ["Vì nó duyệt qua từng phần tử theo trình tự tuyến tính.", "Vì thuật toán thực thi tính toán trên bảng băm hằng số.", "Vì nó thực hiện tính toán trên cấu trúc ma trận bậc hai.", "Vì tại mỗi bước so sánh, không gian tìm kiếm của bài toán luôn bị giảm trừ đi một nửa."], correctAnswer: 3, explanation: "Binary Search liên tục chia đôi không gian tìm kiếm sau mỗi lần so sánh phần tử ở giữa (mid) với giá trị mục tiêu. Số bước chạy tối đa để thu hẹp không gian về 1 phần tử tuân theo hàm log cơ số 2 của N, tức là O(log N).", hint: "Chặt đôi không gian xử lý bài toán liên tục sau mỗi bước so sánh." },
  { id: 167, topic: "ND09: Con trỏ self", difficulty: "Dễ", question: "Trong lập trình hướng đối tượng với Python, tham số quy ước `self` xuất hiện ở vị trí đầu tiên của các phương thức mang ý nghĩa kỹ thuật gì?", code: "", options: ["Đại diện cho chính thực thể cụ thể (instance) đang trực tiếp gọi phương thức đó.", "Đại diện cho biến phạm vi toàn cục của hệ thống module.", "Đại diện cho lớp cha tối cao của đối tượng.", "Là một hàm nội bộ dùng để giải phóng ô nhớ RAM."], correctAnswer: 0, explanation: "`self` là con trỏ tham chiếu đại diện cho chính đối tượng (instance) cụ thể đang thi hành mã nguồn. Nó là cầu nối giúp phương thức truy xuất và sửa đổi các thuộc tính nằm trong namespace của thực thể đó.", hint: "Con trỏ trỏ trực tiếp vào bản thể hiện hành đang thực thi hành vi." },
  { id: 168, topic: "ND10: Điểm dừng đệ quy", difficulty: "Dễ", question: "Hiện tượng cạn kiệt ngăn xếp cuộc gọi (Stack Overflow) xảy ra trong cấu trúc hàm đệ quy thường bắt nguồn từ nguyên nhân cốt lõi nào?", code: "", options: ["Hàm khởi tạo quá nhiều biến số nguyên ở phạm vi cục bộ.", "Hàm thiếu Điều kiện cơ sở dừng thuật toán (Base case) khiến chuỗi hàm tự gọi lại chính nó lặp vô tận.", "Người lập trình truyền sai kiểu dữ liệu tham số vào hàm.", "Lỗi cú pháp định dạng thụt lề thụt dòng."], correctAnswer: 1, explanation: "Nếu không cấu hình Base Case (điều kiện dừng), hàm đệ quy sẽ tự gọi chính nó vô tận. Mỗi lời gọi tạo một Stack Frame nạp vào Call Stack hệ thống, dẫn đến vượt giới hạn cấp phát của RAM gây sập chương trình.", hint: "Thiếu mất nút phanh khẩn cấp để chặn đứng luồng đệ quy tự gọi lại." },
  { id: 169, topic: "ND11: Toán tử chia không", difficulty: "Dễ", question: "Ngoại lệ runtime tiêu chuẩn `ZeroDivisionError` sẽ lập tức bùng nổ khi chương trình thực thi tác vụ nào sau đây?", code: "", options: ["Thực hiện phép toán chia một số bất kỳ cho giá trị số 0.", "Khi vòng lặp chạy với số chu trình lặp bằng 0.", "Khi truy xuất một mảng List có độ dài bằng 0.", "Sử dụng ký tự số 0 để làm Khóa (Key) bên trong Dictionary."], correctAnswer: 0, explanation: "Đây là lỗi toán học cơ bản. Máy tính không thể lượng giá một biểu thức có mẫu số bằng 0, do đó trình thông dịch Python sẽ chặn đứng luồng chạy và ném ra ngoại lệ ZeroDivisionError.", hint: "Mẫu số của phép toán chia số học bị bằng Không." },
  { id: 170, topic: "ND12: Đọc file", difficulty: "Dễ", question: "Phương thức đọc dữ liệu tĩnh `.read()` gọi trên một đối tượng tệp tin đang mở sẽ trả về cấu trúc dữ liệu nào vào bộ nhớ RAM?", code: "f.read()", options: ["Một danh sách mảng chứa các chuỗi con phân tách.", "Một đối tượng chuỗi văn bản (String) duy nhất chứa trọn vẹn nội dung của file.", "Một số nguyên biểu thị dung lượng byte của file.", "Một đối tượng cấu trúc bảng băm Dictionary nhị phân."], correctAnswer: 1, explanation: "Hàm `.read()` quét toàn bộ dữ liệu của tệp tin từ vị trí con trỏ hiện tại đến hết file, nạp nguyên khối thông tin đó vào bộ nhớ RAM dưới dạng một biến kiểu String duy nhất.", hint: "Hút toàn bộ văn bản của file nạp vào một biến chuỗi ký tự nguyên khối." },
  { id: 171, topic: "ND03: Phức hợp toán tử", difficulty: "Trung bình", question: "Hãy tính toán chính xác giá trị in ra của lệnh hiển thị biểu thức toán tử phức hợp kết hợp chia nguyên và chia dư sau:", code: "print(16 // 3 + 16 % 3)", options: ["5", "6", "1", "16"], correctAnswer: 1, explanation: "Phép chia lấy nguyên `16 // 3` trả về giá trị 5. Phép chia lấy dư `16 % 3` trả về phần dư là 1 (vì 3 * 5 = 15, dư 1). Thực hiện phép cộng kết quả: `5 + 1 = 6`.", hint: "Tính kết quả phép chia lấy nguyên cộng với kết quả của phép chia dư." },
  { id: 172, topic: "ND03: Slicing đếm ngược", difficulty: "Trung bình", question: "Kỹ thuật cắt lát chuỗi sử dụng chỉ số âm làm cận biên bắt đầu. Hãy xác định chuỗi con thu được từ logic sau:", code: "s = 'PYTHON'\nprint(s[-3:])", options: ["HON", "PYT", "N", "THO"], correctAnswer: 0, explanation: "Chỉ số `-3` xác định vị trí bắt đầu cắt đếm ngược từ cuối chuỗi (ký tự 'H'). Khuyết cận dừng `stop` sau dấu hai chấm nghĩa là cắt kéo dài cho đến hết chuỗi. Chuỗi con thu được là 'HON'.", hint: "Bắt đầu cắt từ vị trí ký tự thứ 3 đếm ngược từ đuôi lên cho đến hết chuỗi." },
  { id: 173, topic: "ND04: Đoản mạch logic", difficulty: "Trung bình", question: "Dựa trên tính chất đoản mạch (Short-circuit) của toán tử logic `or`, đoạn mã sau có kích nổ lỗi chia cho 0 hay không và gán cho x giá trị gì?", code: "x = True or (1 / 0)\nprint(x)", options: ["Văng lỗi ngoại lệ ZeroDivisionError hệ thống", "Không lỗi, xuất ra màn hình giá trị True", "Không lỗi, xuất ra màn hình giá trị False", "Xuất ra giá trị số 1"], correctAnswer: 1, explanation: "Đối với toán tử `or`, nếu vế trái đã mang giá trị `True`, toàn bộ biểu thức chắc chắn đúng. Python sẽ ngắt mạch (đoản mạch) lập tức, bỏ qua hoàn toàn việc tính toán vế phải `(1 / 0)`. Do đó không phát sinh lỗi và `x` mang giá trị `True`.", hint: "Toán tử OR dừng lượng giá vế sau ngay khi vế đầu tiên trả về chân lý Đúng." },
  { id: 174, topic: "ND04: So sánh kiểu số", difficulty: "Trung bình", question: "Toán tử quan hệ `==` xử lý như thế nào khi so sánh hai đối tượng thuộc kiểu dữ liệu số nguyên (int) và số thực (float)? Biểu thức sau trả về kết quả gì?", code: "print(5 == 5.0)", options: ["False", "True", "Lỗi xung đột kiểu dữ liệu TypeError", "None"], correctAnswer: 1, explanation: "Toán tử `==` so sánh dựa trên giá trị toán học thuần túy của đối tượng chứ không ép buộc đồng nhất kiểu dữ liệu. Vì giá trị toán học của 5 và 5.0 bằng nhau nên biểu thức trả về True.", hint: "So sánh giá trị đại số thuần túy, bất chấp một bên là số nguyên một bên là số thực." },
  { id: 175, topic: "ND05: break triệt tiêu else", difficulty: "Trung bình", question: "Phân tích cơ chế phối hợp giữa vòng lặp `for` và khối điều khiển bổ trợ `else`. Đoạn mã sau đây có in ra ký tự 'A' hay không?", code: "for i in range(3):\n    break\nelse:\n    print('A')", options: ["Có in ra chữ 'A'", "Không in ra gì vì vòng lặp bị phá vỡ đột ngột bởi break", "In ra chữ 'A' đúng 3 lần liên tục", "Lỗi cú pháp compile"], correctAnswer: 1, explanation: "Khối lệnh `else` đi kèm vòng lặp chỉ được phép chạy nếu vòng lặp đó hoàn thành chu trình một cách tự nhiên, trọn vẹn. Ở ngay bước lặp đầu tiên, lệnh `break` kích hoạt đã chém đứt vòng lặp, triệt tiêu luôn quyền chạy của khối `else`.", hint: "Nếu vòng lặp bị cưỡng chế thoát bởi lệnh break, khối else kề sau sẽ bị vô hiệu hóa." },
  { id: 176, topic: "ND05: Vòng lặp cập nhật", difficulty: "Trung bình", question: "Hãy theo dõi cẩn thận vị trí của câu lệnh tăng giá trị biến đếm bên trong vòng lặp `while` sau để xác định chuỗi số in ra màn hình:", code: "i = 0\nwhile i < 3:\n    i += 2\n    print(i, end=' ')", options: ["0 2", "2 4", "2", "0 2 4"], correctAnswer: 1, explanation: "Chu trình 1: `i=0 < 3` đúng, tăng `i` lên 2, in ra 2. Chu trình 2: `i=2 < 3` đúng, tăng `i` lên 4, in ra 4. Chu trình 3: `i=4 < 3` sai, vòng lặp dừng. Kết quả in ra là: `2 4 `.", hint: "Giá trị của biến đếm bị biến đổi tăng tiến trước khi lệnh in kịp đọc dữ liệu." },
  { id: 177, topic: "ND06: Global write", difficulty: "Trung bình", question: "Để một hàm số có quyền chỉnh sửa, ghi đè giá trị lên một biến khai báo ở phạm vi toàn cục module, ta bắt buộc phải sử dụng từ khóa cấu hình nào?", code: "x = 1\ndef f():\n    global x\n    x = 5\nf()\nprint(x)", options: ["local", "nonlocal", "global", "public"], correctAnswer: 1, explanation: "Nếu muốn ghi đè lên biến toàn cục từ trong hàm, ta phải dùng từ khóa `global x`. Điều này báo cho Python biết không tạo biến local mới mà trỏ thẳng ra ô nhớ toàn cục ngoài hàm. Kết quả cập nhật x thành 5.", hint: "Từ khóa tuyên bố biến số thuộc chủ quyền quản lý của hệ thống toàn cục module." },
  { id: 178, topic: "ND06: Unpack Tuple index", difficulty: "Trung bình", question: "Khi sử dụng tham số gộp vị trí `*args`, hệ thống đóng gói dữ liệu thành Tuple. Hãy tính xem câu lệnh truy xuất chỉ số sau sẽ in ra giá trị bao nhiêu?", code: "def f(*args):\n    print(args[1])\nf(10, 20, 30)", options: ["10", "20", "30", "Lỗi IndexError vượt biên"], correctAnswer: 1, explanation: "Lời gọi hàm `f(10, 20, 30)` đóng gói 3 đối số vào tuple `args = (10, 20, 30)`. Do cấu trúc mảng đánh chỉ số (index) bắt đầu từ số 0, phần tử tại vị trí `args[1]` chính là số 20.", hint: "Truy xuất phần tử nằm ở vị trí chỉ mục số 1 của bộ dữ liệu Tuple." },
  { id: 179, topic: "ND07: Ép kiểu Set", difficulty: "Trung bình", question: "Khi truyền một danh sách List chứa các phần tử trùng lặp vào hàm dựng `set()`, cấu trúc dữ liệu trả về sẽ hiển thị dưới dạng nào?", code: "print(set([1, 2, 2, 3]))", options: ["[1, 2, 3]", "{1, 2, 3}", "Lỗi dữ liệu ValueError", "{1, 2, 2, 3}"], correctAnswer: 1, explanation: "Hàm dựng `set()` biến đổi mảng thành một Tập hợp (Set), tự động thanh lọc loại bỏ toàn bộ phần tử trùng lặp (số 2 trùng bị gộp). Định dạng hiển thị đặc trưng của Tập hợp là bọc trong dấu ngoặc nhọn `{1, 2, 3}`.", hint: "Tập hợp loại bỏ trùng lặp và được bao bọc bởi cặp dấu ngoặc nhọn." },
  { id: 180, topic: "ND07: Sao chép nông 1 chiều", difficulty: "Trung bình", question: "Phương thức sao chép nông `.copy()` vận hành trên một mảng danh sách một chiều độc lập sẽ kiểm soát dữ liệu như thế nào? Biến `b[0]` trả về giá trị bao nhiêu?", code: "a = [1, 2]\nb = a.copy()\na[0] = 9\nprint(b[0])", options: ["1", "9", "Lỗi tham chiếu ReferenceError", "2"], correctAnswer: 0, explanation: "Đối với danh sách một chiều chứa các kiểu dữ liệu nguyên thủy (primitive), phương thức `.copy()` tạo ra một bản thể ô nhớ hoàn toàn độc lập. Việc thay đổi giá trị mảng gốc `a[0] = 9` không làm ảnh hưởng đến mảng `b`, `b[0]` giữ nguyên giá trị 1.", hint: "Mảng một chiều khi được copy sẽ phân tách ô nhớ hoàn toàn biệt lập." },
  { id: 181, topic: "ND08: Tìm kiếm nhị phân mid", difficulty: "Trung bình", question: "Thực hiện thuật toán Tìm kiếm nhị phân trên mảng tăng dần `[1, 2, 3, 4]`. Tại chu trình toán hạng đầu tiên với cận trái `left = 0` và cận phải `right = 3`, chỉ số phần tử ở giữa `mid` được tính ra giá trị bao nhiêu?", code: "", options: ["1", "2", "3", "4"], correctAnswer: 1, explanation: "Công thức toán học tính chỉ số ở giữa: `mid = (left + right) // 2`. Thế số vào ta có: `mid = (0 + 3) // 2 = 3 // 2 = 1`. Phần tử tại index 1 của mảng có giá trị tương ứng là số 2.", hint: "Lấy tổng chỉ số cận biên chia lấy nguyên cho số 2." },
  { id: 182, topic: "ND08: Trộn mảng Merge Sort", difficulty: "Trung bình", question: "Trong khâu Trộn (Merge) của thuật toán Merge Sort, khi tiến hành hợp nhất hai phân mảnh đã được sắp xếp tăng dần là `[1, 5]` và `[2, 3]`, mảng kết quả thu được sẽ có dạng nào?", code: "", options: ["[1, 5, 2, 3]", "[1, 2, 3, 5]", "[1, 2, 5, 3]", "[2, 3, 1, 5]"], correctAnswer: 1, explanation: "Thuật toán trộn so sánh các phần tử ở đầu mỗi mảng con, trích xuất phần tử nhỏ hơn xếp vào mảng mới theo trình tự tăng dần tuyệt đối, cho ra mảng hợp nhất chuẩn xác: `[1, 2, 3, 5]`.", hint: "Hợp nhất đan xen hai mảng con thành một danh sách tăng dần hoàn chỉnh." },
  { id: 183, topic: "ND09: Kiểm tra kế thừa", difficulty: "Trung bình", question: "Hàm kiểm tra quan hệ lớp `issubclass(SubClass, BaseClass)` trong hệ thống OOP của Python sẽ trả về kết quả chân lý nào trong mô hình kiến trúc dưới đây?", code: "class A: pass\nclass B(A): pass\nprint(issubclass(B, A))", options: ["False", "True", "Ném ra ngoại lệ AttributeError", "None"], correctAnswer: 1, explanation: "Vì `class B(A)` định nghĩa lớp B kế thừa trực tiếp từ lớp A, nên lớp B chính là một lớp con (subclass) của lớp A. Do đó, hàm kiểm tra `issubclass(B, A)` trả về chân lý Đúng (True).", hint: "Kiểm tra xem tham số vị trí thứ nhất có phải là con của tham số thứ hai hay không." },
  { id: 184, topic: "ND09: Ghi đè phương thức", difficulty: "Trung bình", question: "Bản chất kỹ thuật của cơ chế Ghi đè phương thức (Method Overriding) trong lập trình hướng đối tượng xảy ra khi nào?", code: "", options: ["Lớp con định nghĩa một phương thức mới có tên, tham số trùng khớp hoàn toàn với một phương thức đã có sẵn ở lớp cha.", "Lớp con thực hiện lệnh xóa bỏ phương thức gốc của lớp cha khỏi bộ nhớ.", "Lớp cha chủ động gọi ngược phương thức độc quyền của lớp con.", "Khai báo chồng chéo hai hàm trùng tên nhau trong cùng một phạm vi lớp."], correctAnswer: 0, explanation: "Method Overriding cho phép một lớp con cung cấp một cách triển khai mã nguồn chuyên biệt, tùy biến cho một phương thức đã được định nghĩa và thiết lập từ trước bởi lớp cha.", hint: "Lớp con viết lại nội dung xử lý của hàm có tên giống hệt ở lớp cha." },
  { id: 185, topic: "ND10: Bản chất Memoization", difficulty: "Trung bình", question: "Tác dụng cốt lõi của kỹ thuật Ghi nhớ (Memoization) áp dụng trong cấu trúc đệ quy của phương pháp Quy hoạch động là gì?", code: "", options: ["Nhân bản mã nguồn hệ thống để tối ưu luồng chạy.", "Xóa sạch bộ nhớ đệm cache sau mỗi chu trình lặp.", "Lưu trữ lại kết quả tính toán của các bài toán con vào một cấu trúc dữ liệu đệm để tái sử dụng, triệt tiêu việc tính toán trùng lặp.", "Dừng luồng đệ quy ngay lập tức khi phát hiện mảng rỗng."], correctAnswer: 2, explanation: "Memoization (tiếp cận Top-down) lưu lại kết quả của các bài toán con vào Dictionary/Array ngay khi tính xong lần đầu. Khi nhánh đệ quy khác gọi lại bài toán đó, hệ thống chỉ việc bốc dữ liệu ra, giảm độ phức tạp thời gian từ hàm mũ xuống tuyến tính.", hint: "Tạo bộ nhớ đệm lưu trữ kết quả bài toán con để tránh tính toán lại từ đầu." },
  { id: 186, topic: "ND10: Trace đệ quy giai thừa", difficulty: "Trung bình", question: "Thực hiện dò vết thuật toán (tracing) luồng xử lý đệ quy tuyến tính của hàm toán học dưới đây để tìm giá trị trả về của lời gọi `f(3)`:", code: "def f(x):\n    return x if x <= 1 else x * f(x - 1)", options: ["3", "6", "9", "2"], correctAnswer: 1, explanation: "Hàm thực hiện tính giai thừa toán học của x (3!). Luồng tính toán thu hồi call stack diễn ra: `f(3) = 3 * f(2) = 3 * (2 * f(1)) = 3 * 2 * 1 = 6`.", hint: "Thực hiện phép toán nhân tích lũy liên tiếp các số nguyên từ 1 đến x." },
  { id: 187, topic: "ND11: Cấu trúc try-finally", difficulty: "Trung bình", question: "Hãy phân tích luồng điều khiển bẫy lỗi ngoại lệ kết hợp khối chốt chặn tối cao `finally` để xác định chuỗi ký tự xuất ra màn hình console:", code: "try:\n    1 / 0\nexcept:\n    print('A')\nfinally:\n    print('B')", options: ["A", "B", "A và sau đó in B", "Chương trình dừng chạy do crash lỗi"], correctAnswer: 2, explanation: "Phép toán `1 / 0` ném ra lỗi. Hệ thống lập tức nhảy sang khối `except` xử lý lỗi và in ra chữ 'A'. Sau đó, khối bảo mật `finally` bắt buộc phải kích hoạt thực thi, in tiếp chữ 'B'. Kết quả xuất hiện cả 'A' và 'B'.", hint: "Khối except hứng lỗi phát sinh, khối finally thực thi bắt buộc bất chấp sự cố." },
  { id: 191, topic: "ND03: Phép nhân List (Mảng 2 chiều)", difficulty: "Khó", question: "Cạm bẫy nhân bản con trỏ tham chiếu trên mảng đa chiều khi sử dụng toán tử `*`. Hãy xác định trạng thái của ma trận `m` sau khi sửa đổi phần tử đầu tiên:", code: "m = [[0]] * 3\nm[0][0] = 1\nprint(m)", options: ["[[1], [0], [0]]", "[[1], [1], [1]]", "[[0], [0], [0]]", "Lỗi TypeError"], correctAnswer: 1, explanation: "Toán tử `* 3` trên mảng lồng `[[0]]` không sao chép sâu nội dung mà chỉ tạo ra 3 phần tử trỏ chung vào ĐỒNG NHẤT MỘT ô nhớ list `[0]`. Do đó, thao tác sửa đổi phần tử ở ô nhớ này làm toàn bộ các nhánh hiển thị thay đổi theo thành `[[1], [1], [1]]`.", hint: "Các phần tử hàng ngang thực chất chỉ là những chiếc gương cùng phản chiếu một vật thể duy nhất." },
  { id: 192, topic: "ND04: Boolean traps", difficulty: "Khó", question: "Cạm bẫy chuỗi toán tử so sánh logic kết hợp thực thể Boolean số nguyên. Hãy phân tích kỹ luồng lượng giá của CPython để tìm kết quả in ra:", code: "print(0 == False == 0)", options: ["True", "False", "Lỗi cấu trúc TypeError", "None"], correctAnswer: 0, explanation: "Python bẻ biểu thức so sánh liên hoàn thành cấu trúc: `(0 == False) and (False == 0)`. Vì trong Python, kiểu dữ liệu Boolean bản chất là con của số nguyên, giá trị `False` hoàn toàn bằng số `0`. Cả hai vế đều Đúng, kết quả trả về là True.", hint: "Số không và từ khóa False có chung giá trị lượng giá toán học trong phép so sánh bằng." },
  { id: 193, topic: "ND05: Rò rỉ biến lặp (Loop Leak)", difficulty: "Khó", question: "Khác biệt với các ngôn ngữ biên dịch nghiêm ngặt (C/Java), vòng lặp `for` trong Python có cơ chế quản lý scope biến lặp như thế nào? Đoạn code sau in ra giá trị gì?", code: "for i in range(3):\n    pass\nprint(i)", options: ["Lỗi NameError do biến i bị cô lập", "0", "2", "3"], correctAnswer: 2, explanation: "Vòng lặp `for` của Python không tạo ra một phạm vi tầm vực (Scope) cục bộ độc lập cho biến lặp. Biến `i` tự do rò rỉ (leak) ra không gian bên ngoài và lưu giữ lại giá trị của lần lặp cuối cùng trước khi thoát vòng lặp, ở đây là số 2.", hint: "Biến lặp không bị giam cầm trong thân vòng lặp mà tràn ra phạm vi scope cha bên ngoài." },
  { id: 194, topic: "ND06: Closure Late Binding", difficulty: "Khó", question: "Cạm bẫy liên kết muộn (Late Binding Trap) đặc trưng của hàm ẩn danh Lambda lồng trong List Comprehension. Giá trị trả về khi kích hoạt hàm đầu tiên `fs[0]()` là bao nhiêu?", code: "fs = [lambda: x for x in [1, 2, 3]]\nprint(fs[0]())", options: ["1", "2", "3", "Lỗi UnboundLocalError"], correctAnswer: 2, explanation: "Hàm ẩn danh lambda tạo bởi vòng lặp không lưu trữ giá trị của `x` tại thời điểm khởi tạo, mà lưu tham chiếu đến biến `x` ở scope cha. Khi vòng lặp chạy xong, giá trị cuối của `x` biến thành 3. Lời gọi hàm `fs[0]()` đọc giá trị hiện hành này và trả về 3.", hint: "Hàm con chỉ thực hiện tra cứu giá trị của biến tại thời điểm hàm đó được chính thức gọi chạy runtime." },
  { id: 195, topic: "ND06: Mutable Defaults Dictionary", difficulty: "Khó", question: "Cạm bẫy tham số mặc định là một đối tượng cấu trúc khả biến Dictionary (`b={}`). Hãy xác định nội dung in ra của Dictionary sau lượt gọi hàm thứ hai:", code: "def f(a, b={}):\n    b[a] = 1\n    return b\n\nf('x')\nprint(f('y'))", options: ["{'y': 1}", "{'x': 1, 'y': 1}", "{'x': 1}", "Lỗi KeyError"], correctAnswer: 1, explanation: "Tham số mặc định `b={}` chỉ được cấp phát ô nhớ ĐÚNG MỘT LẦN khi Python biên dịch định nghĩa hàm. Các lượt gọi hàm không truyền đối số `b` sau đó đều thao tác trên cùng một Dictionary này. Lượt 1 nạp khóa 'x', lượt 2 nạp tiếp khóa 'y' vào chung ô nhớ đó.", hint: "Đối tượng tham số mặc định kiểu Dictionary hoạt động như một kho lưu trữ tích lũy dùng chung." },
  { id: 196, topic: "ND07: Mảng Set Mutability", difficulty: "Khó", question: "Điều gì sẽ xảy ra khi ta cố tình thực hiện phương thức nạp một đối tượng kiểu danh sách List khả biến vào trong một Tập hợp Set?", code: "s = set()\ns.add([1, 2])", options: ["Thao tác thành công, Set nạp mảng bình thường", "Ném ra ngoại lệ nghiêm trọng TypeError: unhashable type: 'list'", "Mảng List tự động biến đổi thành Tuple", "Lỗi cú pháp SyntaxError"], correctAnswer: 1, explanation: "Tập hợp (Set) được quản lý dựa trên bảng băm và yêu cầu tất cả các phần tử của nó bắt buộc phải là đối tượng bất biến (Hashable). Do mảng List `[1, 2]` là kiểu dữ liệu khả biến (Mutable), nó không thể tính mã băm cố định, gây lỗi TypeError.", hint: "Set cấm ngặt nghèo việc chứa đựng các thực thể có khả năng thay đổi cấu trúc dữ liệu." },
  { id: 197, topic: "ND09: MRO Diamond", difficulty: "Khó", question: "Dựa trên thuật toán phân giải tuyến tính MRO C3 Linearization, thứ tự tra cứu phương thức chuẩn xác của `class D` trong cấu trúc đa kế thừa kim cương dưới đây là gì?", code: "class A: pass\nclass B(A): pass\nclass C(A): pass\nclass D(B, C): pass", options: ["D, C, B, A, object", "D, B, C, A, object", "D, B, A, C, object", "D, A, B, C, object"], correctAnswer: 1, explanation: "Thuật toán C3 Linearization tiến hành quét hết chiều rộng của các nhánh con song song (từ trái qua phải, tức duyệt qua B rồi đến C) trước khi đi sâu lên để phân giải lớp cha tổ tiên chung (A). Chuỗi MRO chính xác là: [D, B, C, A, object].", hint: "Quét sạch toàn bộ các nhánh con ở tầng ngang trước khi tiến lên chốt chặn lớp cha chung ở đỉnh." },
  { id: 198, topic: "ND11: Tiêu hủy biến Exception", difficulty: "Khó", question: "Để tối ưu giải phóng call stack hệ thống và triệt tiêu bẫy tham chiếu vòng (cyclic reference), Python 3 tự động thực thi hành vi ẩn nào đối với biến lỗi `as e` khi thoát khỏi khối `except`?", code: "try:\n    1/0\nexcept Exception as e:\n    pass\nprint(e)", options: ["In ra thông tin lỗi ZeroDivisionError", "In ra một chuỗi ký tự rỗng", "Văng lỗi NameError do biến e đã bị hệ thống tự động xóa sạch khỏi scope cục bộ", "Lỗi cú pháp không biên dịch được"], correctAnswer: 2, explanation: "Trong đặc tả thiết kế của Python 3, ngay khi luồng xử lý thoát khỏi khối `except ... as e`, một lệnh dọn rác ngầm định là `del e` sẽ tự động kích hoạt để xóa biến lỗi khỏi phạm vi scope cục bộ. Gọi lệnh `print(e)` bên ngoài sẽ lập tức văng lỗi NameError.", hint: "Hệ thống tự động tiêm lệnh tiêu hủy thực thể lỗi để dọn dẹp bộ nhớ RAM chống rò rỉ." },
  { id: 199, topic: "ND12: Iterator File protocol", difficulty: "Khó", question: "Bản chất vận hành của đối tượng file khi áp dụng giao thức lặp (Iterator Protocol). Lời gọi hàm dựng `next(f)` thực hiện tác vụ nào ở tầng sâu bộ nhớ?", code: "# f mở file chứa văn bản đa dòng\n# next(f)", options: ["Gây lỗi runtime crash chương trình", "Đọc toàn bộ nội dung file nạp vào một chuỗi String", "Kéo luồng con trỏ tiến lên 1 bước, trích xuất đúng 1 dòng văn bản hiện hành", "Xóa tệp tin khỏi ổ đĩa"], correctAnswer: 2, explanation: "File object trong Python bản chất là một Iterator hợp lệ. Mỗi khi hàm `next(f)` được kích hoạt, hệ thống sẽ điều khiển luồng bộ nhớ tiến lên một nấc, tương đương với thao tác đọc và trả về chính xác một dòng văn bản kế tiếp của file.", hint: "Dịch chuyển luồng dữ liệu tiến lên một bước đơn vị để trích xuất một dòng văn bản." },
  { id: 200, topic: "Nâng cao: Bẫy Assert Tuple", difficulty: "Khó", question: "Cạm bẫy bao bọc dấu ngoặc đơn biến biểu thức thành một đối tượng bộ dữ liệu Tuple. Lệnh kiểm thử `assert` dưới đây có bao giờ ném ra lỗi `AssertionError` hay không?", code: "assert (1 == 2, 'Lỗi toán học')", options: ["Có, báo lỗi văng chương trình ngay lập tức", "Chỉ báo lỗi khi cấu hình biến môi trường hệ thống", "Không bao giờ báo lỗi, chương trình vượt qua kiểm thử an toàn", "Lỗi ngoại lệ cấu trúc TypeError"], correctAnswer: 2, explanation: "Do biểu thức bị bọc trong cặp dấu ngoặc đơn ngăn cách bởi dấu phẩy, Python sẽ lượng giá nó thành một đối tượng kiểu Tuple có 2 phần tử `(False, 'Lỗi toán học')`. Trong Python, một Tuple khác rỗng luôn mang giá trị chân lý Truthy (True). Lệnh `assert True` luôn thành công nên không bao giờ báo lỗi.", hint: "Mọi đối tượng cấu trúc dữ liệu Tuple khác rỗng đều được hệ thống coi là chân lý Đúng." },
];

const EXAM_SET_05_DATA = [
  { id: 201, topic: "ND01: Nhận dạng mẫu", difficulty: "Dễ", question: "Hành động nào sau đây mô tả rõ nhất kỹ năng 'Nhận dạng mẫu' (Pattern Recognition) giúp lập trình viên tổng quát hóa mã nguồn và tối ưu hóa cấu trúc lặp?", code: "", options: ["Viết mã lệnh bằng Python.", "Chiếu trực tiếp và sao chép mã từ tệp tin này sang tệp tin khác.", "Nhận ra rằng nhiều học sinh có cùng một lỗi cú pháp, từ đó tạo ra một bài giảng hoặc module sửa lỗi chung.", "Che giấu chi tiết thuật toán bên trong hàm."], correctAnswer: 2, explanation: "Việc phát hiện ra sự lặp lại có quy luật (mẫu số chung) của các hiện tượng/lỗi hệ thống để từ đó đưa ra hướng giải quyết tổng quát, đồng bộ chính là cốt lõi của Nhận dạng mẫu.", hint: "Tìm kiếm điểm chung có hệ thống." },
  { id: 202, topic: "ND01: Thiết kế thuật toán", difficulty: "Dễ", question: "Điểm khác biệt chính về mặt cam kết hiệu năng và tính chính xác giữa Thuật toán (Algorithm) và Heuristic (Thuật giải kinh nghiệm) là gì?", code: "", options: ["Heuristic viết bằng ngôn ngữ Python, Algorithm viết bằng ngôn ngữ C++.", "Algorithm luôn bảo đảm tìm ra kết quả chính xác 100%, Heuristic chỉ tìm ra kết quả đủ tốt trong thời gian ngắn chấp nhận được.", "Algorithm luôn chạy nhanh hơn Heuristic trong mọi không gian dữ liệu.", "Heuristic không thể lập trình cho máy tính."], correctAnswer: 1, explanation: "Thuật toán là một chuỗi các bước logic hữu hạn, chắc chắn dẫn đến đáp án chính xác tuyệt đối. Heuristic là 'mẹo' hoặc kinh nghiệm giúp tìm ra lời giải đủ tốt khi bài toán quá phức tạp và tốn tài nguyên.", hint: "Sự chắc chắn tuyệt đối vs Tính thực dụng tối ưu thời gian." },
  { id: 203, topic: "ND02: Prompt Constraint", difficulty: "Dễ", question: "Việc bổ sung chỉ thị nghiêm ngặt 'Chỉ được phép trả về dữ liệu bằng định dạng JSON, không giải thích gì thêm' vào Prompt là để thiết lập thành phần cấu trúc nào?", code: "", options: ["Role (Vai trò chuyên gia)", "Output Constraint (Ràng buộc định dạng đầu ra)", "Few-shot Prompting mẫu", "Context (Ngữ cảnh nền)"], correctAnswer: 1, explanation: "Đây là một ràng buộc kỹ thuật chặt chẽ (Constraint) ép mô hình ngôn ngữ lớn (LLM) phải tuân thủ tuyệt đối về mặt cấu trúc văn bản trả về, phục vụ cho việc parse tự động.", hint: "Bắt buộc mô hình AI phải làm theo một format cố định." },
  { id: 204, topic: "ND02: AI Hallucination", difficulty: "Dễ", question: "Tại sao các mô hình Ngôn ngữ Lớn (LLM) bản chất lại rất dễ sinh ra hiện tượng 'Ảo giác' (AI Hallucination) khi tạo mã nguồn?", code: "", options: ["Vì máy chủ AI bị nhiễm phần mềm độc hại.", "Vì bản chất LLM chỉ dự đoán từ tiếp theo dựa trên xác suất chuỗi ký tự, chứ không thực sự 'hiểu' logic và sự thật vật lý.", "Vì mô hình AI cố tình lừa dối người dùng.", "Vì tài nguyên RAM của máy chủ bị quá tải dữ liệu."], correctAnswer: 1, explanation: "LLM hoạt động bằng cơ chế Token Prediction (dự đoán từ tiếp theo dựa trên xác suất thống kê văn bản). Nó có thể tạo ra đoạn mã trông rất đúng cú pháp ngữ pháp nhưng hàm hoặc logic đó hoàn toàn sai thực tế.", hint: "Cơ chế học vẹt nâng cao dựa trên phân phối xác suất từ ngữ." },
  { id: 205, topic: "ND03: Phép toán", difficulty: "Dễ", question: "Hãy tính toán cẩn thận theo quy tắc chia nguyên hướng về âm vô cực của Python để xác định kết quả chính xác của lệnh hiển thị phép toán modulo sau:", code: "print(14 % -3)", options: ["2", "-1", "-2", "1"], correctAnswer: 1, explanation: "Python tính phép chia nguyên `14 // -3 = -5`. Theo công thức tính số dư: `r = a - (b * (a // b))`. Suy ra `14 - (-3 * -5) = 14 - 15 = -1`. Dấu của phép modulo luôn đi theo dấu của mẫu số.", hint: "Dấu của phép Modulo trong Python phụ thuộc hoàn toàn vào mẫu số b." },
  { id: 206, topic: "ND03: Định dạng chuỗi", difficulty: "Dễ", question: "Đoạn mã cấu hình đệm số f-string sau đây sẽ xử lý biến số nguyên `x` và hiển thị chuỗi nào chính xác trên màn hình console?", code: "x = 10\nprint(f'{x:04d}')", options: ["1000", "0010", "10", "0001"], correctAnswer: 1, explanation: "Định dạng `04d` yêu cầu định dạng một số nguyên (d) với tổng độ dài hiển thị tối thiểu là 4 ký tự. Nếu chuỗi số bị thiếu độ dài, hệ thống sẽ tự động chèn các số 0 vào phía trước (Padding).", hint: "Thực hiện chèn các số 0 vào bên trái cho đủ tổng độ dài bằng 4." },
  { id: 207, topic: "ND04: Falsy string", difficulty: "Dễ", question: "Hãy phân tích kỹ thuộc tính của đối tượng chuỗi ký tự để xác định xem hàm ép kiểu dữ liệu `bool()` dưới đây sẽ trả về giá trị Boolean nào?", code: "s = ' '\nb = bool(s)\nprint(b)", options: ["False", "True", "None", "Error"], correctAnswer: 1, explanation: "Biến `s` chứa một ký tự khoảng trắng (Space), do đó nó có độ dài là 1, KHÔNG PHẢI CHUỖI RỖNG `''`. Trong Python, chỉ có chuỗi hoàn toàn rỗng mới mang giá trị Falsy, chuỗi này là Truthy (True).", hint: "Khoảng trắng vẫn được tính là một ký tự hợp lệ chiếm chỗ trong bộ nhớ." },
  { id: 208, topic: "ND04: Điều kiện if", difficulty: "Dễ", question: "Hãy đánh giá tính chất Truthy/Falsy của các cấu trúc collection rỗng để xác định xem chương trình điều khiển sau sẽ rẽ nhánh in ra số mấy?", code: "if {}:\n    print(1)\nelse:\n    print(0)", options: ["1", "0", "Lỗi cú pháp SyntaxError", "Không in ra gì"], correctAnswer: 1, explanation: "Một Dictionary rỗng `{}` không chứa bất kỳ cặp key-value nào luôn mang giá trị chân lý Falsy (Sai). Điều kiện `if` thất bại, luồng chạy nhảy vào nhánh `else` in ra 0.", hint: "Cấu trúc collection ở trạng thái trống rỗng luôn đại diện cho giá trị Sai." },
  { id: 209, topic: "ND05: Vòng lặp For", difficulty: "Dễ", question: "Hàm sinh dãy số tiến bước cấu hình nhảy cách `range(start, stop, step)`. Vòng lặp sau đây sẽ sinh ra chính xác các số nguyên nào?", code: "print(list(range(2, 6, 2)))", options: ["2, 3, 4, 5", "2, 4, 6", "2, 4", "0, 2, 4"], correctAnswer: 2, explanation: "Hàm bắt đầu sinh từ `start=2`, tịnh tiến với bước nhảy `step=2` và bắt buộc phải dừng lại ngay trước cận trên `stop=6`. Các số sinh ra gồm 2 và 4.", hint: "Bắt đầu từ số 2, tăng tiến 2 đơn vị và dừng lại trước số 6." },
  { id: 210, topic: "ND05: Pass statement", difficulty: "Dễ", question: "Lệnh rỗng giữ chỗ `pass` sở hữu đặc tính vận hành khác biệt cốt lõi nào so với lệnh điều khiển bước lặp `continue`?", code: "", options: ["Chúng hoàn toàn trùng khớp hành vi.", "`pass` không làm gì cả và cho code chạy tiếp các lệnh dưới nó. `continue` bỏ qua các lệnh dưới nó để lặp vòng mới.", "`pass` lập tức thoát hẳn khỏi vòng lặp chứa nó.", "`pass` ném ra lỗi cú pháp runtime."], correctAnswer: 1, explanation: "`pass` chỉ là lệnh giữ chỗ trống (placeholder) để thỏa mãn cú pháp, trình thông dịch coi như tàng hình và chạy tiếp code bên dưới. Còn `continue` ép vòng lặp bỏ qua phần đuôi để nhảy sang bước mới.", hint: "Pass tàng hình chạy tiếp xuống dưới, continue bẻ luồng nhảy về đầu vòng lặp." },
  { id: 211, topic: "ND06: Cú pháp hàm", difficulty: "Dễ", question: "Theo quy tắc biên dịch cú pháp hàm của ngôn ngữ Python, cấu trúc khai báo danh sách tham số nào sau đây là HỢP LỆ?", code: "", options: ["def f(a=1, b=2):", "def f(a=1, b):", "def f(a, b=2, c):", "function f(a, b):"], correctAnswer: 0, explanation: "Python bắt buộc mọi tham số có giá trị mặc định (default arguments) phải được xếp ở CUỐI CÙNG của danh sách tham số, đứng sau toàn bộ các tham số bắt buộc.", hint: "Các tham số sở hữu lá chắn mặc định bắt buộc phải đứng ở phía sau hàng." },
  { id: 212, topic: "ND06: Args unpack", difficulty: "Dễ", question: "Tham số gộp vị trí một dấu sao `*args` thực hiện đóng gói các đối số truyền tự do vào hàm thành kiểu cấu trúc dữ liệu nào?", code: "def f(*args): pass", options: ["Mảng động khả biến List", "Bảng băm Dictionary", "Bộ dữ liệu bất biến Tuple", "Chuỗi văn bản String"], correctAnswer: 2, explanation: "Toán tử `*args` thu thập tất cả các đối số không đặt tên tại thời điểm gọi hàm và đóng gói chúng thành một đối tượng kiểu Tuple bất biến để bảo vệ dữ liệu tham số.", hint: "Cấu trúc dữ liệu dạng ngoặc đơn và có tính chất đóng băng nội dung." },
  { id: 213, topic: "ND07: Tuple Tuple", difficulty: "Dễ", question: "Khi thực hiện chuyển đổi ép kiểu đối tượng thông qua hàm dựng `tuple()`, danh sách List truyền vào sẽ biến đổi hiển thị dưới dạng nào?", code: "print(tuple([1, 2]))", options: ["[1, 2]", "(1, 2)", "{1, 2}", "Lỗi cấu trúc TypeError"], correctAnswer: 1, explanation: "Hàm dựng `tuple()` nhận vào một Iterable (như List) và chuyển đổi nó thành một bộ dữ liệu bất biến Tuple, đặc trưng hiển thị bọc trong cặp dấu ngoặc đơn `(1, 2)`.", hint: "Chuyển đổi sang cấu trúc dữ liệu bất biến sử dụng dấu ngoặc đơn." },
  { id: 214, topic: "ND07: Dict Keys", difficulty: "Dễ", question: "Để đảm bảo tính toán chỉ mục bảng băm diễn ra chính xác, thuộc tính bắt buộc phải có đối với các đối tượng làm Khóa (Key) trong Dictionary là gì?", code: "", options: ["Bắt buộc phải thuộc lớp dữ liệu chuỗi ký tự.", "Bắt buộc phải là kiểu số nguyên dương.", "Bắt buộc phải là kiểu dữ liệu bất biến và có khả năng tính mã băm (Hashable).", "Phải là mảng List động."], correctAnswer: 2, explanation: "Dictionary tra cứu phần tử bằng mã Hash của Key. Do đó, Key bắt buộc phải là đối tượng bất biến (Immutable/Hashable) như chuỗi, số, tuple để mã băm không bị thay đổi trong suốt quá trình lưu trữ.", hint: "Cấu trúc phần tử làm khóa phải đóng băng giá trị để bảo toàn mã băm." },
  { id: 215, topic: "ND08: Bubble Sort", difficulty: "Dễ", question: "Thuật toán Sắp xếp nổi bọt (Bubble Sort) tiến hành hoán đổi vị trí của các phần tử trong mảng dựa trên cơ chế so sánh cốt lõi nào?", code: "", options: ["So sánh phần tử biên đầu và biên cuối mảng.", "So sánh phần tử ở trục giữa với các node lân cận.", "Liên tục so sánh và hoán đổi các cặp phần tử đứng kề sát nhau nếu ngược thứ tự.", "Trích xuất phần tử nhỏ nhất đặt ra ngoài."], correctAnswer: 2, explanation: "Bubble Sort hoạt động bằng cách quét mảng tuần tự. Tại mỗi bước chạy, nó so sánh cặp phần tử liền kề sát sườn với nhau, nếu sai thứ tự thì thực hiện phép hoán đổi (swap).", hint: "Thực hiện phép toán so sánh và hoán đổi trên các cặp phần tử liền kề nhau." },
  { id: 216, topic: "ND08: Big O notation", difficulty: "Dễ", question: "Trong phân tích hiệu năng thuật toán bằng ký pháp Big O, độ phức tạp thời gian tiệm cận tuyến tính $O(N)$ mang ý nghĩa vận hành nào?", code: "", options: ["Thời gian chạy là một hằng số cố định bất biến.", "Thời gian thực thi tăng trưởng theo đường thẳng, tỷ lệ thuận với kích thước dữ liệu đầu vào N.", "Thời gian chạy tăng trưởng theo hàm mũ cực nhanh.", "Thuật toán chạy tốn bình phương tài nguyên máy tính."], correctAnswer: 1, explanation: "Độ phức tạp $O(N)$ (Tuyến tính) phản ánh rằng nếu lượng dữ liệu N tăng lên gấp đôi, số bước toán hạng cần xử lý của giải thuật cũng sẽ tăng tiến lên gấp đôi tương ứng.", hint: "Tốc độ tăng trưởng tỷ lệ thuận đường thẳng với kích thước dữ liệu N." },
  { id: 217, topic: "ND09: Object self", difficulty: "Dễ", question: "Tham số đầu tiên `self` trong định nghĩa phương thức của một lớp Python đóng vai trò kỹ thuật nào?", code: "", options: ["Gọi các module hệ thống từ nhân hệ điều hành.", "Đại diện cho chính Lớp tổng thể chứa phương thức.", "Đại diện cho chính thực thể cụ thể (Instance) đang trực tiếp gọi phương thức đó.", "Tự động kích hoạt cơ chế giải phóng ô rác."], correctAnswer: 2, explanation: "`self` là con trỏ tham chiếu đại diện cho chính instance cụ thể đang thi hành mã nguồn. Nó là phương tiện để hàm truy xuất và thao tác các thuộc tính nằm trong bản thể đối tượng đó.", hint: "Con trỏ trỏ trực tiếp vào thực thể hiện hành đang thực thi hành vi." },
  { id: 218, topic: "ND10: Đệ quy cơ bản", difficulty: "Dễ", question: "Thành phần cốt lõi bắt buộc phải được thiết lập để một hàm đệ quy không rơi vào vòng lặp gọi lại vô tận gây sập bộ nhớ hệ thống là gì?", code: "", options: ["Điều kiện Base Case (Điều kiện cơ sở / Điểm dừng).", "Một cấu trúc lặp while lồng bên trong.", "Khối bẫy lỗi ngoại lệ try-except.", "Khai báo biến đếm toàn cục toàn màn hình."], correctAnswer: 0, explanation: "Base Case (điều kiện cơ sở) cung cấp rẽ nhánh điều kiện logic trả về giá trị trực tiếp, chặn đứng chuỗi hàm tự gọi lại chính nó vô hạn, ngăn chặn lỗi cạn kiệt bộ nhớ call stack.", hint: "Chốt chặn phanh khẩn cấp để thuật toán kết thúc luồng tự gọi lại." },
  { id: 219, topic: "ND11: Lỗi Exception", difficulty: "Dễ", question: "Khối cấu trúc xử lý ngoại lệ `try...except` đóng vai trò vận hành cốt lõi nào trong ứng dụng?", code: "", options: ["Tăng tốc độ xử lý toán toán của bộ vi xử lý.", "Biến dịch mã nguồn sang ngôn ngữ máy cấp thấp.", "Bắt và xử lý êm ái các ngoại lệ runtime phát sinh nhằm bảo vệ chương trình không bị sập (crash) đột ngột.", "Đóng luồng tệp tin tự động."], correctAnswer: 2, explanation: "Khi có lỗi runtime bùng nổ trong khối `try`, Python sẽ lập tức chuyển hướng điều khiển sang khối `except` tương ứng để giải quyết sự cố một cách chủ động, giữ ứng dụng chạy tiếp.", hint: "Đỡ bóng lỗi phát sinh để cứu chương trình khỏi bị sập văng màn hình." },
  { id: 220, topic: "ND12: File mode", difficulty: "Dễ", question: "Khi sử dụng chế độ mở file đính kèm `'a'` (Append) của hàm `open()`, dữ liệu mới ghi vào file sẽ được hệ thống xử lý như thế nào?", code: "", options: ["Chỉ được phép đọc nội dung tĩnh của tệp tin.", "Xóa sạch toàn bộ dữ liệu file cũ rồi mới ghi dữ liệu mới.", "Ghi nối tiếp thông tin mới vào ngay phía sau đuôi nội dung file cũ (Append).", "Tự động đổi định dạng file."], correctAnswer: 2, explanation: "Chế độ `'a'` (Append) dịch con trỏ ghi xuống cuối tệp tin, bảo toàn dữ liệu cũ và ghi nối tiếp thông tin mới vào đuôi, tránh phá hủy cấu trúc tệp tin như chế độ 'w'.", hint: "Nối đuôi đính kèm dữ liệu vào phía cuối tài nguyên cũ." },
  { id: 221, topic: "ND03: Precedence", difficulty: "Trung bình", question: "Hãy phân tích kỹ tính kết hợp từ phải sang phải của toán tử lũy thừa trong Python để tìm giá trị chính xác của lệnh in sau:", code: "print(2 ** 3 ** 2)", options: ["64", "512", "72", "12"], correctAnswer: 1, explanation: "Toán tử mũ `**` có tính kết hợp từ PHẢI SANG TRÁI (Right-to-left associativity). Nó thực hiện tính cụm bên phải trước: `3 ** 2 = 9`, sau đó tính tiếp `2 ** 9 = 512`.", hint: "Thực hiện lượng giá phép toán mũ ở phần đuôi phía bên phải trước tiên." },
  { id: 222, topic: "ND03: Slicing mảng", difficulty: "Trung bình", question: "Áp dụng kỹ thuật cắt lát chuỗi tích hợp bước nhảy cách. Hãy xác định chuỗi con trích xuất chính xác thu được từ đoạn mã sau:", code: "s = 'ABCDEFG'\nprint(s[1:5:2])", options: ["BDF", "BD", "ACE", "BCDE"], correctAnswer: 1, explanation: "Lát cắt bắt đầu tại index 1 ('B'), dừng trước index 5 ('F'), bước nhảy là 2. Phần tử trích xuất gồm index 1 ('B') và index 3 ('D'). Ghép lại được chuỗi 'BD'.", hint: "Bắt đầu từ index 1, tiến bước nhảy 2 đơn vị và loại trừ vị trí index 5." },
  { id: 223, topic: "ND04: Toán tử and", difficulty: "Trung bình", question: "Dựa trên cơ chế lượng giá của toán tử logic short-circuit trong Python, giá trị được gán và in ra của biến `x` là bao nhiêu?", code: "x = 5 and 10\nprint(x)", options: ["True", "False", "5", "10"], correctAnswer: 3, explanation: "Toán tử `and` duyệt từ trái qua. Số 5 mang giá trị Truthy nên nó bắt buộc phải duyệt tiếp vế phải. Do 10 cũng là Truthy và là phần tử cuối cùng được đánh giá, Python trả về chính giá trị 10.", hint: "Toán tử AND trả về đối tượng cuối cùng mà nó buộc phải lượng giá chân lý." },
  { id: 224, topic: "ND04: Chain Comparison", difficulty: "Trung bình", question: "Hãy phân tích chuỗi so sánh liên tiếp kết hợp toán tử bằng dưới đây để xác định kết quả chân lý hiển thị trên màn hình:", code: "print(3 > 2 == 2)", options: ["True", "False", "Error", "None"], correctAnswer: 0, explanation: "Python phân rã chuỗi so sánh thành biểu thức logic: `(3 > 2) and (2 == 2)`. Vế trái True, vế phải Đúng (2 bằng 2). Kết quả tổng hòa `True and True` trả về True.", hint: "Thực hiện chèn toán tử logic AND ngầm nối giữa các cặp biểu thức so sánh đơn lẻ." },
  { id: 225, topic: "ND05: for-else", difficulty: "Trung bình", question: "Khối lệnh điều khiển bổ trợ `else` đi kèm với vòng lặp `for` sẽ vận hành ra sao trong kịch bản mã nguồn chạy trơn tru dưới đây?", code: "for i in range(2):\n    pass\nelse:\n    print('Else')", options: ["Có in ra chữ 'Else'", "Không in ra chữ gì", "Lỗi biên dịch cấu trúc", "In ra chữ 'Else' đúng 2 lần"], correctAnswer: 0, explanation: "Khối lệnh `else` của vòng lặp được cấu hình để thi hành nếu vòng lặp đó chạy kết thúc tự nhiên, trọn vẹn mà không bị cưỡng chế bẻ gãy bởi lệnh `break`. Do đó chữ 'Else' được in ra.", hint: "Khối else của vòng lặp hoạt động với ý nghĩa: Không có lệnh break nào kích nổ." },
  { id: 226, topic: "ND05: Nested break", difficulty: "Trung bình", question: "Lệnh bẻ luồng `break` lồng nhau đa tầng hoạt động theo cơ chế nào? Phân tích đoạn mã sau để tìm chuỗi ký tự hiển thị:", code: "for i in range(2):\n    for j in range(2):\n        break\n    print('X')", options: ["Chương trình kết thúc ngay.", "In ra 2 chữ 'X'.", "In ra 1 chữ 'X'.", "Không in gì."], correctAnswer: 1, explanation: "Lệnh `break` chỉ có khả năng phá vỡ duy nhất 1 tầng vòng lặp chứa trực tiếp lấy nó (vòng lặp j). Do đó vòng lặp ngoài `i` vẫn chạy đủ 2 lần, kích hoạt lệnh in xuất ra 2 chữ 'X'.", hint: "Lệnh break chỉ phá hủy được bức tường vòng lặp ở tầng sát sườn chứa nó." },
  { id: 227, topic: "ND06: Lệnh Global", difficulty: "Trung bình", question: "Để cấp quyền ghi đè, thay đổi giá trị một cách tường minh cho biến toàn cục từ trong phạm vi hàm số, từ khóa nào bắt buộc phải sử dụng?", code: "y = 10\ndef modify():\n    global y\n    y = y + 5\nmodify()\nprint(y)", options: ["10", "15", "Error", "None"], correctAnswer: 1, explanation: "Khai báo `global y` liên kết trực tiếp tên biến trong hàm với vùng nhớ toàn cục bên ngoài hàm. Thao tác cộng thêm 5 cập nhật giá trị biến gốc thành 15.", hint: "Cấp quyền can thiệp ghi dữ liệu thẳng vào ô nhớ thuộc scope toàn cục của hệ thống." },
  { id: 228, topic: "ND06: Unpack function", difficulty: "Trung bình", question: "Toán tử một dấu sao `*` đứng trước một đối tượng mảng List khi thực hiện lời gọi hàm mang ý nghĩa kỹ thuật gì?", code: "def add(a, b, c):\n    print(a+b+c)\nadd(*[1, 2, 3])", options: ["Nhân mảng với hệ số tự do.", "Gây lỗi văng kiểu dữ liệu.", "Bung mở mảng (unpack) giải nén thành các đối số độc lập nạp vào tham số tương ứng của hàm.", "In cấu trúc mảng."], correctAnswer: 2, explanation: "Toán tử `*` đứng trước danh sách trong lời gọi hàm có nhiệm vụ giải nén (unpack) toàn bộ phần tử của List đó ra, truyền đan xen vào vị trí các tham số `a, b, c` một cách độc lập.", hint: "Mở hộp giải nén gói hàng mảng để phân phát phần tử vào từng tham số." },
  { id: 229, topic: "ND07: Set Union", difficulty: "Trung bình", question: "Toán tử gộp dấu gạch đứng `|` thực hiện phép toán số học tập hợp nào? Tính xem Tập hợp kết quả cuối cùng in ra gồm những phần tử nào?", code: "print(set([1, 1, 2]) | set([2, 3]))", options: ["{1, 2, 3}", "{2}", "{1, 3}", "Lỗi dữ liệu"], correctAnswer: 0, explanation: "Toán tử `|` đại diện cho phép toán Hợp (Union) giữa các Tập hợp. Hệ thống tiến hành gom sạch toàn bộ các phần tử duy nhất của cả hai bên lại thành tập hợp tổng là `{1, 2, 3}`.", hint: "Thực hiện phép Hợp toán học, gom toàn bộ tài sản phần tử độc lập của hai bên." },
  { id: 230, topic: "ND07: List Comprehension", difficulty: "Trung bình", question: "Phân tích cú pháp List Comprehension lồng bộ lọc điều kiện đơn `if`. Mảng danh sách động sinh ra cuối cùng sẽ chứa những gì?", code: "print([x*2 for x in [1, 2, 3] if x < 3])", options: ["[2, 4, 6]", "[2, 4]", "[4, 6]", "[]"], correctAnswer: 1, explanation: "Bộ lọc điều kiện `if x < 3` quét trước, giữ lại hai phần tử 1 và 2 từ danh sách gốc. Sau đó biểu thức biến đổi `x*2` chạy trên hai phần tử này, nhân bản thành mảng `[2, 4]`.", hint: "Thực hiện bộ lọc điều kiện loại bỏ phần tử trước, sau đó nhân đôi phần tử được giữ lại." },
  { id: 231, topic: "ND08: Tìm kiếm nhị phân", difficulty: "Trung bình", question: "Thực hiện giải thuật Tìm kiếm nhị phân trên không gian mảng có 6 phần tử với chỉ mục trái `L = 0` và chỉ mục phải `R = 5`. Chỉ số điểm giữa `mid` đầu tiên tính ra bằng bao nhiêu?", code: "", options: ["3", "2.5", "2", "4"], correctAnswer: 2, explanation: "Công thức toán học tính chỉ số phần tử ở giữa: `mid = (L + R) // 2`. Thế số vào ta có: `mid = (0 + 5) // 2 = 5 // 2 = 2` (phép chia lấy nguyên làm tròn xuống số nguyên).", hint: "Sử dụng toán tử chia lấy nguyên để tính toán vị trí chỉ mục chính giữa mảng số." },
  { id: 232, topic: "ND08: Merge Sort", difficulty: "Trung bình", question: "Trong tiến trình phân tách chia để trị của thuật toán Merge Sort, hệ thống xử lý ra sao nếu kích thước chiều dài của mảng là một số lẻ phần tử?", code: "", options: ["Thuật toán báo lỗi hệ thống ngưng hoạt động.", "Nó tự động cắt đôi mảng thành hai mảng con có độ dài lệch nhau 1 đơn vị (ví dụ độ dài 5 cắt thành 2 và 3).", "Tự động chèn thêm một phần tử ảo mang giá trị rỗng.", "Thuật toán không cho phép chia."], correctAnswer: 1, explanation: "Phép toán tính điểm chia nguyên `mid = len(arr) // 2` xử lý hoàn hảo trường hợp mảng có kích thước số lẻ, bẻ cấu trúc thành hai mảng con độc lập lệch nhau chính xác 1 phần tử.", hint: "Cơ chế chia nguyên tự động chẻ cấu trúc thành hai mảng con có kích thước lệch nhau 1 đơn vị." },
  { id: 233, topic: "ND09: issubclass", difficulty: "Trung bình", question: "Hàm kiểm tra phân cấp hệ thống `issubclass(A, B)` sẽ lượng giá và trả về kết quả chân lý nào trong cấu trúc mô hình kiến trúc dưới đây?", code: "class A: pass\nclass B(A): pass\nprint(issubclass(A, B))", options: ["True", "False", "Error văng ngoại lệ lớp", "None"], correctAnswer: 1, explanation: "Hàm `issubclass(param1, param2)` kiểm tra xem tham số thiết lập thứ nhất có phải là con của tham số thứ hai hay không. Do `A` là lớp CHA của `B`, nên phép kiểm tra trả về False.", hint: "Kiểm tra xem đối tượng tham số thứ nhất có phải là dòng dõi con cháu của tham số thứ hai." },
  { id: 234, topic: "ND09: Ghi đè", difficulty: "Trung bình", question: "Bản chất biểu hiện của tính chất Đa hình (Polymorphism) trong kiến trúc hướng đối tượng OOP gắn liền trực tiếp với cơ chế vận hành nào?", code: "", options: ["Khởi tạo các biến toàn cục liên thông dữ liệu.", "Cơ chế Ghi đè phương thức tùy biến (Method Overriding) ở lớp con.", "Thiết lập cấu trúc điều khiển vòng lặp while.", "Tác vụ đọc dữ liệu nhị phân từ file IO."], correctAnswer: 1, explanation: "Tính đa hình cho phép các lớp con cùng sở hữu một tên phương thức giống hệt lớp cha nhưng được quyền viết đè (override) lại ruột xử lý để phản hồi hành vi riêng biệt.", hint: "Lớp con thực hiện viết lại mã nguồn tùy biến cho phương thức bị trùng tên với lớp cha." },
  { id: 235, topic: "ND10: Quy hoạch động Tabulation", difficulty: "Trung bình", question: "Đặc điểm thiết kế luồng xử lý dữ liệu và quản lý bộ nhớ của kỹ thuật Lập bảng (Tabulation) trong Quy hoạch động là gì?", code: "", options: ["Giải bài toán từ trên đỉnh hệ thống phân rã đệ quy xuống vùng đáy.", "Sử dụng chặt chẽ cơ chế gọi hàm đệ quy đa nhánh.", "Sử dụng mảng cấu trúc phụ trợ kết hợp vòng lặp tuyến tính để giải từ bài toán đáy nhỏ nhất tiến dần lên đỉnh (Bottom-up).", "Chỉ áp dụng xử lý cho kiểu dữ liệu chuỗi văn bản."], correctAnswer: 2, explanation: "Tabulation triệt tiêu hoàn toàn dấu vết của hàm đệ quy. Nó khởi tạo mảng dữ liệu nền tảng, dùng vòng lặp `for` chạy tịnh tiến điền dần lời giải bài toán con từ đáy đi lên bài toán đích.", hint: "Phương pháp tiếp cận Bottom-up xây dựng lời giải từ dưới thấp lên cao thông qua vòng lặp." },
  { id: 236, topic: "ND10: Recursion Trace", difficulty: "Trung bình", question: "Hãy thực hiện dò vết thuật toán (tracing) luồng gọi đệ quy thu hồi call stack của hàm số sau để xác định kết quả của lời gọi lệnh `f(3)`:", code: "def f(n):\n    if n == 0: return 1\n    return 2 * f(n-1)\nprint(f(3))", options: ["8", "6", "4", "3"], correctAnswer: 0, explanation: "Hàm thực hiện tính lũy thừa 2 mũ n ($2^n$). Luồng đệ quy thu hồi ô nhớ: `f(3) = 2 * f(2) = 2 * 2 * f(1) = 2 * 2 * 2 * f(0) = 2 * 2 * 2 * 1 = 8`.", hint: "Mô phỏng phép toán nhân tích lũy liên tiếp số 2 theo cấp số mũ độ sâu n." },
  { id: 237, topic: "ND11: Gom Exception", difficulty: "Trung bình", question: "Để cấu hình cho một câu lệnh `except` có khả năng đánh lưới bắt đồng thời nhiều loại ngoại lệ lỗi khác nhau trên cùng một dòng lệnh, cú pháp chuẩn mực nào được áp dụng?", code: "", options: ["except TypeError or ValueError:", "except TypeError, ValueError:", "except (TypeError, ValueError):", "except [TypeError, ValueError]:"], correctAnswer: 2, explanation: "Python yêu cầu khi muốn bắt giữ chung nhiều loại ngoại lệ lỗi trên cùng một dòng, ta bắt buộc phải đóng gói danh sách tên ngoại lệ đó vào trong một cấu trúc Tuple (bọc bởi dấu ngoặc đơn).", hint: "Gom cụm danh sách tên các ngoại lệ lỗi mục tiêu vào trong một bộ dữ liệu Tuple." },
  { id: 238, topic: "ND12: Đọc file", difficulty: "Trung bình", question: "Khác biệt cốt lõi về tổ chức kiểu dữ liệu đầu ra nạp vào RAM giữa phương thức `.read()` và phương thức `.readlines()` trên đối tượng file stream là gì?", code: "", options: ["Chúng hoàn toàn đồng nhất hình thái cấu trúc dữ liệu.", "`.read()` trả về một chuỗi ký tự String dài nguyên khối; `.readlines()` chẻ văn bản thành một danh sách List chứa các dòng chuỗi biệt lập.", "`.readlines()` có tốc độ đọc băng thông nhanh hơn .read() gấp nhiều lần.", "`.read()` tự động trả về mảng chứa các byte thô nhị phân."], correctAnswer: 1, explanation: "Phương thức `.read()` tải trọn vẹn văn bản tệp tin vào một biến String nguyên bản độc nhất. Trong khi đó, `.readlines()` quét file và tách nội dung dựa theo ký tự ngắt dòng `\\n` để đóng gói thành mảng List nhiều dòng.", hint: "Sự phân cấp giữa một biến chuỗi ký tự nguyên bản dài và một mảng danh sách chứa nhiều dòng con." },
  { id: 239, topic: "Nâng cao: K-Means Init", difficulty: "Trung bình", question: "Trong chu trình vận hành toán học của thuật toán phân cụm không giám sát K-Means, các vị trí tâm cụm (centroids) khởi điểm ban đầu được thiết lập bằng phương pháp nào?", code: "", options: ["Tính toán chính xác tuyệt đối bằng công thức vi phân ma trận.", "Mặc định luôn nằm cố định tại điểm gốc tọa độ (0,0) của hệ trục.", "Thường được lựa chọn khởi tạo ngẫu nhiên (Random Selection) từ chính tập dữ liệu đầu vào.", "Bắt buộc người dùng phải trực tiếp nhập tay tọa độ biên."], correctAnswer: 2, explanation: "Bước sơ khởi tiên quyết của K-Means là cấu hình bốc ngẫu nhiên K điểm từ không gian dữ liệu để tạm gán làm hạt nhân tâm cụm khởi điểm trước khi chạy vòng lặp tối ưu khoảng cách.", hint: "Thực hiện thao tác lựa chọn ngẫu nhiên các điểm mốc dữ liệu để dựng hạt nhân tâm cụm." },
  { id: 240, topic: "Nâng cao: deque pop", difficulty: "Trung bình", question: "Phương thức rút trích hủy node ở đầu hàng `popleft()` cấu hình trên đối tượng hàng đợi kép `collections.deque` tiêu tốn chi phí độ phức tạp thời gian đạt mức tiệm cận nào?", code: "", options: ["O(N)", "O(1)", "O(log N)", "O(N^2)"], correctAnswer: 1, explanation: "Nhờ kiến trúc danh sách liên kết đôi (doubly linked list) quản lý các con trỏ node độc lập ở hai đầu biên, deque thực hiện ngắt node bên trái đầu hàng đạt hiệu năng hằng số thời gian tối ưu $O(1)$.", hint: "Hiệu năng xử lý đạt mức hằng số thời gian siêu tốc, độc lập với quy mô lượng dữ liệu N." },
  { id: 241, topic: "ND03: Float Precision IEEE 754", difficulty: "Khó", question: "Do giới hạn biểu diễn cấu trúc dấu phẩy động nhị phân chuẩn quốc tế IEEE 754 của kiến trúc phần cứng máy tính, phép so sánh chân lý số thực sau đây sẽ trả về kết quả hiển thị nào?", code: "print(0.1 + 0.2 == 0.3)", options: ["True", "False", "Error văng lỗi tràn số số thực", "None"], correctAnswer: 1, explanation: "Máy tính không thể biểu diễn chính xác tuyệt đối các số thập phân hệ 10 ở dạng nhị phân. Biểu thức `0.1 + 0.2` lượng giá runtime sẽ cho ra giá trị sai số là `0.30000000000000004`, do đó phép toán so sánh bằng trả về False.", hint: "Số thực lưu trữ trên thanh ghi máy tính luôn dính các sai số vi ly ở phần đuôi thập phân." },
  { id: 242, topic: "ND04: Bẫy so sánh chuỗi (Chained comparison)", difficulty: "Khó", question: "Cạm bẫy viết chuỗi toán tử quan hệ bắc cầu liên tiếp kết hợp giá trị Boolean. Hãy trace kỹ luồng xử lý của CPython để tìm giá trị chân lý in ra:", code: "print(5 > 4 == True)", options: ["True", "False", "Lỗi phân tích cú pháp Error", "Lỗi biên dịch cấu trúc SyntaxError"], correctAnswer: 1, explanation: "Cơ chế chain toán tử phân rã biểu thức thành cấu trúc logic: `(5 > 4) and (4 == True)`. Đánh giá vế trái: `5 > 4` trả về `True`. Đánh giá vế phải: `4 == True` (tương đương số 4 so sánh với số 1) trả về `False`. Kết quả `True and False = False`.", hint: "Thực hiện chèn toán tử logic AND phân tách ngầm vào giữa các toán tử so sánh quan hệ liền kề." },
  { id: 243, topic: "ND05: Rò rỉ biến lặp (Loop Leak)", difficulty: "Khó", question: "Khác biệt với các ngôn ngữ biên dịch nghiêm ngặt quản lý biến chặt chẽ, vòng lặp `for` của Python có cơ chế quản lý scope biến lặp đặc thù nào? Hãy tính xem chương trình sau in ra số mấy:", code: "for x in range(3):\n    pass\nprint(x)", options: ["Lỗi nghiêm trọng: NameError do x bị hủy scope", "0", "2", "3"], correctAnswer: 1, explanation: "Vòng lặp `for` của Python không tự cô lập tầm vực biến lặp vào Local scope riêng. Biến `x` tự do rò rỉ (leak) ra không gian scope cha bên ngoài và giữ lại giá trị của chu trình lặp cuối cùng trước khi thoát, ở đây là số 2.", hint: "Biến điều khiển lặp không bị giam giữ trong thân vòng lặp mà tràn thẳng ra phạm vi scope ngoài." },
  { id: 244, topic: "ND06: UnboundLocalError Trap", difficulty: "Khó", question: "Tại sao việc thực thi lời gọi hàm `f()` dưới đây lại kích nổ ngoại lệ hệ thống nghiêm trọng `UnboundLocalError` mặc dù biến `x` đã khai báo ở Global?", code: "x = 10\ndef f():\n    x += 1\nf()", options: ["Cú pháp toán tử logic += bị sai", "Lệnh gán phức hợp `+=` vô tình khóa cứng x thành biến cục bộ khi chưa được khởi tạo giá trị trong phạm vi Local Scope", "Bắt buộc phải import thư viện toán học", "Hàm chạy hoàn hảo không phát sinh lỗi"], correctAnswer: 1, explanation: "Trong thiết kế biên dịch của Python, hễ xuất hiện lệnh gán (`=`, `+=`) trong thân hàm, trình thông dịch tự động đóng nhãn biến đó thuộc phạm vi Local cục bộ. Khi tính toán vế phải `x + 1`, hệ thống tìm giá trị cục bộ của `x` nhưng chưa thấy khởi tạo -> báo lỗi.", hint: "Sự hiện diện của câu lệnh gán tự động ép phạm vi của biến chặt vào tầm vực Local cục bộ." },
  { id: 245, topic: "ND06: Closure Late Binding", difficulty: "Khó", question: "Cạm bẫy liên kết muộn (Late Binding Trap) của cấu trúc hàm ẩn danh Lambda lồng trong vòng lặp mảng viết gọn. Hãy tính xem danh sách kết quả hiển thị ra chứa những gì?", code: "funcs = [lambda: i for i in range(3)]\nprint([f() for f in funcs])", options: ["[0, 1, 2]", "[2, 2, 2]", "[3, 3, 3]", "Lỗi văng cấu trúc Scope"], correctAnswer: 1, explanation: "Hàm lambda tạo bởi vòng lặp không lưu trữ bản sao giá trị của `i` lúc định nghĩa mà lưu con trỏ tham chiếu đến địa chỉ biến `i`. Khi vòng lặp range kết thúc, `i` đạt giá trị cực đại là 2. Lúc này gọi các hàm, chúng đều tra cứu giá trị hiện hành của `i` và lấy số 2.", hint: "Hàm con chỉ thực hiện tra cứu giá trị thực tế của biến tại thời điểm hàm đó được chính thức kích hoạt gọi chạy." },
  { id: 246, topic: "ND07: Dictionary Unhashable Key", difficulty: "Khó", question: "Đoạn mã cấu hình nạp phần tử vào Dictionary dưới đây sẽ kích nổ ngoại lệ runtime cụ thể nào do vi phạm nghiêm trọng quy tắc bảng băm?", code: "d = {(1, [2]): 'A'}", options: ["Lỗi cú pháp cú pháp SyntaxError", "Lỗi không tìm thấy khóa mục tiêu KeyError", "Lỗi kiểu dữ liệu nghiêm trọng TypeError: unhashable type: 'list'", "Chương trình chạy trơn tru"], correctAnswer: 2, explanation: "Dictionary yêu cầu các đối tượng làm Key phải bất biến và tính được mã băm (Hashable). Do đối tượng Tuple `(1, [2])` dính phần tử ruột là mảng List `[2]` có đặc tính khả biến (Mutable), cấu trúc băm của Tuple bị phá hủy hoàn toàn gây lỗi TypeError.", hint: "Set và Key của Dict tuyệt đối cấm ngặt việc chứa đựng thực thể khả biến không có mã băm cố định." },
  { id: 247, topic: "ND09: MRO Kim Cương", difficulty: "Khó", question: "Dựa trên thuật toán phân giải tuyến tính thứ tự phương thức C3 Linearization, trình thông dịch Python sẽ thực hiện rà soát các nhánh con cháu theo trình tự cốt lõi nào trong mô hình đa kế thừa kim cương `class D(B, C)`?", code: "class A: pass\nclass B(A): pass\nclass C(A): pass\nclass D(B, C): pass", options: ["Ưu tiên truy vết dọc lên lớp tổ tiên chung A trước tiên.", "Ưu tiên quét ngang qua nhánh C trước rồi mới sang nhánh B.", "Ưu tiên duyệt trọn vẹn chiều rộng tầng ngang (từ trái qua phải B rồi C), trì hoãn việc quét lớp tổ tiên chung A về cuối cùng.", "Xáo trộn ngẫu nhiên thứ tự các nhánh tùy thuộc ô nhớ RAM."], correctAnswer: 2, explanation: "Thuật toán C3 Linearization bảo toàn nguyên lý: duyệt hết chiều rộng các lớp con song song hàng ngang (quét B rồi sang C) và luôn hoãn việc tra cứu lên lớp cha chung tổ tiên (`A`) cho đến khi toàn bộ con cháu của nó được duyệt sạch. Thứ tự: [D, B, C, A, object].", hint: "Quét sạch toàn bộ hệ thống lớp con ở hàng ngang trước khi tiến lên chốt chặn lớp tổ tiên chung ở đỉnh." },
  { id: 248, topic: "ND11: Tranh giành Return in Finally", difficulty: "Khó", question: "Sự tranh chấp quyền kiểm soát luồng thoát hàm dữ dội giữa khối thử nghiệm và khối chốt chặn bảo mật tối cao. Giá trị trả về cuối cùng của hàm số `run()` là chuỗi nào?", code: "def run():\n    try:\n        return 'Try'\n    finally:\n        return 'Finally'\nprint(run())", options: ["Try", "Finally", "Lỗi cấu trúc Runtime Error", "None"], correctAnswer: 1, explanation: "Khối lệnh `finally` được CPython bảo đảm quyền thực thi tuyệt đối trước khi hàm chính thức đóng khung bộ nhớ thoát ra ngoài. Lệnh `return 'Finally'` trong khối này sẽ ghi đè và triệt tiêu hoàn toàn lệnh `return 'Try'` đang xếp hàng đợi ở khối try.", hint: "Câu lệnh trả về kết quả nằm ở khối finally sở hữu quyền sinh sát tối cao, ghi đè mọi dữ liệu chờ rời hàm đằng trước." },
  { id: 249, topic: "ND12: Iterator File cạn kiệt", difficulty: "Khó", question: "Đối tượng tệp tin trong Python cài đặt chặt chẽ giao thức lặp một chiều (Iterator protocol). Nếu file `a.txt` cấu hình lưu trữ chỉ đúng 1 dòng văn bản duy nhất, câu lệnh gọi hàm dịch luồng `next(f)` thứ hai sẽ gây ra lỗi gì?", code: "# File a.txt có đúng 1 dòng văn bản\n# with open('a.txt') as f:\n# next(f); next(f)", options: ["Lỗi tìm khóa không tồn tại KeyError", "Ngoại lệ cạn kiệt luồng dữ liệu một chiều StopIteration", "Lỗi kết thúc tệp tin đột ngột EOFError", "Chương trình chạy tiếp mượt mà không lỗi"], correctAnswer: 1, explanation: "File object hoạt động như một Iterator thực thụ. Lời gọi `next(f)` đầu tiên đã đọc và trích xuất xong dòng duy nhất, dịch con trỏ chạm đáy file. Lời gọi `next(f)` tiếp theo nhận thấy luồng trống rỗng bắt buộc phải ném lỗi StopIteration theo đặc tả.", hint: "Ngoại lệ đặc trưng của Iterator dùng để phát tín hiệu thông báo luồng nạp dữ liệu tuần tự đã cạn kiệt tài nguyên." },
  { id: 250, topic: "Nâng cao: Bẫy Assert Tuple", difficulty: "Khó", question: "Cạm bẫy bọc biểu thức kiểm thử vào trong cặp dấu ngoặc đơn tạo thành cấu trúc Tuple. Lệnh khẳng định `assert` dưới đây có bao giờ ném ra lỗi ngoại lệ `AssertionError` phá vỡ luồng chạy hay không?", code: "assert (1 == 2, 'Lỗi toán học')", options: ["Có, văng lỗi dừng chương trình lập tức", "Không bao giờ báo lỗi, chương trình vượt qua kiểm thử an toàn", "Ném ra ngoại lệ sai cấu trúc cú pháp SyntaxError", "Lỗi xung đột kiểu dữ liệu nghiêm trọng TypeError"], correctAnswer: 1, explanation: "Dấu phẩy ngăn cách bên trong cặp dấu ngoặc đơn ép Python lượng giá biểu thức thành một đối tượng kiểu Tuple có 2 phần tử `(False, 'Lỗi toán học')`. Trong Python, mọi Tuple khác rỗng luôn mang giá trị Truthy (True). Lệnh `assert True` luôn luôn vượt qua mà không báo lỗi.", hint: "Mọi đối tượng cấu trúc dữ liệu Tuple chứa phần tử bên trong (khác rỗng) luôn được hệ thống lượng giá là chân lý Đúng." },
];

const EXAM_SET_06_DATA = [
  { id: 251, topic: "ND01: Phân rã", difficulty: "Dễ", question: "Thao tác chia nhỏ một tệp tin mã nguồn khổng lồ chứa hàng ngàn dòng lệnh thành các file module nhỏ độc lập nhằm cô lập scope và tăng tính bảo trì đại diện cho kỹ năng nào?", code: "", options: ["Nhận dạng mẫu", "Trừu tượng hóa dữ liệu", "Phân rã (Decomposition)", "Tính đa hình"], correctAnswer: 2, explanation: "Phân rã (Decomposition) giúp bẻ nhỏ một hệ thống đồ sộ phức tạp thành các phần con hoạt động độc lập, giúp việc debug, kiểm thử và phân chia công việc nhóm đạt hiệu quả tối ưu.", hint: "Chia nhỏ cấu trúc lớn để quản lý và trị." },
  { id: 252, topic: "ND01: Thiết kế thuật toán", difficulty: "Dễ", question: "Trong tư duy máy tính, thiết kế giải thuật (Algorithm Design) hướng tới mục tiêu tối cao nào sau đây để máy tính có thể thi hành?", code: "", options: ["Vẽ sơ đồ khối nghệ thuật.", "Tạo ra một tập hợp các chỉ thị/bước lệnh rõ ràng, tuần tự và hữu hạn để giải quyết triệt để vấn đề.", "Che giấu toàn bộ logic toán học bên trong phần cứng.", "Tìm kiếm phần tử trùng lặp ngẫu nhiên."], correctAnswer: 1, explanation: "Thuật toán là một chuỗi các hướng dẫn chi tiết từng bước, có tính rõ ràng, xác định và hữu hạn, đảm bảo máy tính luôn cho ra kết quả chính xác khi nạp dữ liệu đầu vào.", hint: "Xây dựng cẩm nang công thức từng bước rõ ràng để giải quyết vấn đề." },
  { id: 253, topic: "ND02: AI Output Format", difficulty: "Dễ", question: "Khi thiết lập chỉ chỉ thị prompt: 'Chỉ được phép phản hồi kết quả dưới dạng một chuỗi JSON hợp lệ, cấm giải thích gì thêm', bạn đang sử dụng chiến lược nào?", code: "", options: ["Output Constraint (Ràng buộc đầu ra)", "Role Prompting gán vai vai trò", "Few-shot Prompting mẫu ngữ cảnh", "Zero-shot sinh tự do"], correctAnswer: 0, explanation: "Việc ép buộc mô hình ngôn ngữ lớn (LLM) trả về kết quả theo một khuôn dạng cấu trúc cú pháp cố định được gọi là tạo Ràng buộc đầu ra (Output Constraint) để phục vụ cho các module parse code tự động.", hint: "Kiểm soát cấu trúc và hình thức trình bày văn bản trả về của AI." },
  { id: 254, topic: "ND02: AI Hallucination", difficulty: "Dễ", question: "Để giảm thiểu tối đa hiện tượng Ảo giác (Hallucination) giúp mô hình AI trả lời bám sát thực tế bối cảnh hơn, tham số cấu hình nào nên được hạ thấp sát nút về 0?", code: "", options: ["Max Tokens", "Frequency Penalty", "Presence Penalty", "Temperature (Nhiệt độ ngẫu nhiên)"], correctAnswer: 3, explanation: "Temperature thấp sẽ làm hẹp phân phối xác suất của từ tiếp theo, ép mô hình LLM lựa chọn những từ có độ tin cậy cao nhất, giúp câu trả lời cứng nhắc nhưng bám sát sự thật logic hơn.", hint: "Tham số quản lý độ ngẫu nhiên và tính sáng tạo của mô hình AI." },
  { id: 255, topic: "ND03: Phép chia", difficulty: "Dễ", question: "Hãy tính toán cẩn thận theo quy tắc chia lấy phần nguyên hướng về âm vô cực (floor division) của Python để tìm kết quả in ra của lệnh sau:", code: "print(10 // -3)", options: ["-3", "-4", "-3.33", "3"], correctAnswer: 1, explanation: "Phép toán `//` trong Python thực hiện chia lấy nguyên và làm tròn xuống số nguyên nhỏ hơn (floor). `10 / -3 = -3.33`, làm tròn hướng về âm vô cực ta được số nguyên `-4`.", hint: "Chia ra số thực rồi thực hiện làm tròn xuống giá trị số nguyên nhỏ hơn trên trục số." },
  { id: 256, topic: "ND03: Padding chuỗi", difficulty: "Dễ", question: "Đoạn mã f-string thiết lập padding định dạng số nguyên sau đây sẽ xuất ra hiển thị chính xác nào trên màn hình console?", code: "print(f'{7:04d}')", options: ["7000", "0007", "7.000", "  07"], correctAnswer: 1, explanation: "Cú pháp `:04d` chỉ thị định dạng đối tượng dạng số nguyên (d) với tổng độ dài chuỗi hiển thị tối thiểu là 4 ký tự, điền thêm (padding) các chữ số 0 vào các khoảng trống trống trải phía bên trái.", hint: "Lấp đầy các khoảng trống phía bên trái bằng số 0 cho đủ tổng chiều dài bằng 4." },
  { id: 257, topic: "ND04: Toán tử Boolean", difficulty: "Dễ", question: "Dựa trên thứ tự ưu tiên của toán tử điều khiển logic, biểu thức boolean phức hợp dưới đây sẽ trả về kết quả chân lý nào?", code: "print(not (True or False))", options: ["True", "False", "None", "Lỗi cú pháp Runtime"], correctAnswer: 1, explanation: "Biểu thức trong ngoặc đơn `True or False` có kết quả là `True`. Tiếp theo, phép toán phủ định `not True` sẽ bẻ đảo chân lý chuyển thành `False`.", hint: "Thực hiện phép toán logic HOẶC bên trong cặp dấu ngoặc đơn trước." },
  { id: 258, topic: "ND04: Falsy Value", difficulty: "Dễ", question: "Hãy phân tích kỹ tính chất chân lý Truthy/Falsy của chuỗi ký tự khoảng trắng để xác định xem câu lệnh điều kiện sau sẽ nhảy vào nhánh in ra ký tự nào?", code: "if ' ':\n    print('A')\nelse:\n    print('B')", options: ["A", "B", "Lỗi cú pháp", "None"], correctAnswer: 0, explanation: "Chuỗi chứa ký tự khoảng trắng `' '` có độ dài là 1, nghĩa là một chuỗi hoàn toàn KHÁC RỖNG. Trong Python, chỉ có chuỗi rỗng `''` mới mang giá trị Falsy, chuỗi này là Truthy nên nhảy vào nhánh A.", hint: "Dù chỉ chứa một khoảng trắng thì đối tượng chuỗi vẫn được coi là chứa dữ liệu hợp lệ." },
  { id: 259, topic: "ND05: Vòng lặp For", difficulty: "Dễ", question: "Hàm sinh dãy số đếm lùi `range(start, stop, step)`. Biểu thức ép kiểu danh sách sau đây sẽ thu được mảng số nguyên nào?", code: "print(list(range(5, 1, -2)))", options: ["5, 3, 1", "5, 4, 3, 2", "5, 3", "Lỗi dữ liệu ValueError"], correctAnswer: 2, explanation: "Hàm bắt đầu sinh từ `start=5`, lùi tiến với bước nhảy âm `step=-2`, bao gồm các số 5 và 3. Quá trình sinh bắt buộc phải dừng lại ngay trước khi chạm tới giá trị cận trên `stop=1`.", hint: "Bắt đầu lùi từ số 5, trừ đi 2 đơn vị sau mỗi bước và loại bỏ cận số 1." },
  { id: 260, topic: "ND05: Pass vs Continue", difficulty: "Dễ", question: "Bản chất vận hành của câu lệnh rỗng `pass` khác câu lệnh điều khiển nhảy bước lặp `continue` ở điểm cốt lõi nào?", code: "", options: ["Thoát vòng lặp ngay lập tức.", "Bỏ qua lần lặp hiện tại.", "`pass` chỉ là một lệnh rỗng giữ chỗ cú pháp, luồng chạy vẫn chạy tiếp các lệnh dưới nó. `continue` bỏ qua toàn bộ lệnh dưới nó để sang chu trình mới.", "Gây lỗi biên dịch."], correctAnswer: 2, explanation: "`pass` chỉ đóng vai trò là một placeholder lấp đầy cấu trúc khối lệnh trống để trình thông dịch không bắt lỗi, code vẫn chạy tuôn tuột xuống dưới. Còn `continue` chặn đứng phần đuôi để nhảy về đầu vòng lặp.", hint: "Một bên tàng hình cho code chạy tiếp, một bên cưỡng chế bẻ luồng nhảy phắt về đầu vòng lặp." },
  { id: 261, topic: "ND06: Khai báo hàm", difficulty: "Dễ", question: "Đoạn code khai báo hàm dưới đây mắc lỗi cú pháp nghiêm trọng nào liên quan đến trật tự thiết lập danh sách tham số?", code: "def add(a=0, b): return a + b", options: ["Thiếu dấu ngoặc vuông.", "Không được phép sử dụng từ khóa return.", "Tham số mặc định (a=0) đang bị đặt sai quy tắc trước tham số bắt buộc (b).", "Không có lỗi."], correctAnswer: 2, explanation: "Quy định biên dịch của Python bắt buộc mọi tham số có kèm giá trị mặc định (default arguments) phải được xếp ở sau cùng của danh sách để tránh tranh chấp định danh khi nạp đối số vị trí.", hint: "Các tham số có điểm tựa giá trị mặc định phải luôn xếp ở phía sau hàng." },
  { id: 262, topic: "ND06: Args", difficulty: "Dễ", question: "Tham số một dấu sao `*args` thực hiện nhiệm vụ thu thập tất cả các đối số tự do vị trí và đóng gói chúng thành kiểu cấu trúc dữ liệu nào?", code: "def f(*args): pass", options: ["Mảng động khả biến List", "Bảng băm ánh xạ Dictionary", "Bộ dữ liệu bất biến Tuple", "Tập hợp Set"], correctAnswer: 2, explanation: "Toán tử `*args` nhận toàn bộ các positional arguments truyền vào tại thời điểm gọi hàm và tự động đóng gói chúng vào một đối tượng kiểu Tuple bất biến để tối ưu hóa bộ nhớ tĩnh.", hint: "Cấu trúc dữ liệu có tính chất đóng băng nội dung và hiển thị bằng dấu ngoặc đơn." },
  { id: 263, topic: "ND07: Tuple vs List", difficulty: "Dễ", question: "Khác biệt cốt lõi nhất về mặt tổ chức ô nhớ vật lý và tính chất vận hành giữa hai cấu trúc dữ liệu nền tảng List và Tuple là gì?", code: "", options: ["Tuple chạy chậm hơn List do cơ chế phân mảnh bộ nhớ.", "Tuple cấm chứa các kiểu dữ liệu chuỗi ký tự.", "Tuple sở hữu đặc tính bất biến (Immutable), còn List sở hữu đặc tính khả biến (Mutable) cho phép thay đổi dữ liệu tại chỗ.", "Tuple tốn dung lượng RAM hơn List."], correctAnswer: 2, explanation: "List là mảng động khả biến, cho phép tự do thêm, sửa, xóa phần tử tại chỗ. Tuple một khi tạo ra sẽ bị khóa cứng nội dung vĩnh viễn, giúp bảo toàn tính toàn vẹn dữ liệu và tối ưu hiệu năng đọc.", hint: "Một bên cho phép chỉnh sửa nội dung linh hoạt, một bên đóng băng vĩnh viễn vùng nhớ." },
  { id: 264, topic: "ND07: Set Elements", difficulty: "Dễ", question: "Phần tử thuộc lớp dữ liệu nào sau đây KHÔNG THỂ nạp vào làm một phần tử của Tập hợp (Set) do vi phạm nguyên lý cấu trúc bảng băm?", code: "", options: ["Số nguyên 100", "Chuỗi ký tự 'Hello'", "Bộ dữ liệu bất biến Tuple (1, 2)", "Mảng danh sách động List [1, 2]"], correctAnswer: 3, explanation: "Tập hợp (Set) quản lý vị trí phần tử bằng cơ chế bảng băm, yêu cầu phần tử phải bất biến (Hashable). Mảng List là thực thể khả biến (Mutable/Unhashable), do đó Python nghiêm cấm đưa List vào Set.", hint: "Set tuyệt đối cấm chứa đựng những thực thể có khả năng tự thay đổi cấu trúc ô nhớ." },
  { id: 265, topic: "ND08: Bubble Sort", difficulty: "Dễ", question: "Thuật toán Sắp xếp nổi bọt (Bubble Sort) thô sơ thực hiện quy trình dịch chuyển mảng dựa trên cơ chế so sánh cốt lõi nào?", code: "", options: ["Tìm kiếm phần tử nhỏ nhất chèn thẳng lên đầu mảng.", "Chia cắt đôi không gian mảng thành các phân mảnh độc lập.", "Liên tục so sánh và hoán đổi vị trí của các cặp phần tử đứng kề sát nhau nếu chúng bị ngược thứ tự mục tiêu.", "Chọn ra một phần tử ngẫu nhiên để làm chốt chặn."], correctAnswer: 2, explanation: "Bubble Sort hoạt động bằng cách quét mảng tuần tự. Tại mỗi bước duyệt, nó tiến hành so sánh cặp phần tử liền kề sát sườn, thực hiện hoán đổi (swap) để đẩy phần tử lớn nhất nổi dần về đáy mảng.", hint: "Thực hiện các phép toán so sánh và hoán đổi vị trí trên hai phần tử lân cận." },
  { id: 266, topic: "ND08: Binary Search", difficulty: "Dễ", question: "Điều kiện tiên quyết bắt buộc phải được đáp ứng đối với mảng dữ liệu đầu vào để thuật toán Tìm kiếm Nhị phân (Binary Search) có thể vận hành chính xác là gì?", code: "", options: ["Mảng bắt buộc phải chứa toàn bộ các số nguyên dương.", "Mảng dữ liệu PHẢI ĐƯỢC SẮP XẾP theo một trật tự tăng/giảm dần từ trước.", "Mảng tuyệt đối không được xuất hiện phần tử trùng lặp.", "Mảng phải có độ dài chẵn."], correctAnswer: 1, explanation: "Binary Search hoạt động dựa trên tính chất thứ tự của mảng để lượng giá điểm giữa (mid), từ đó tự tin chặt bỏ một nửa không gian bài toán sau mỗi bước so sánh.", hint: "Mảng dữ liệu đầu vào bắt buộc phải có tính chất thứ tự phân cấp từ trước." },
  { id: 267, topic: "ND09: OOP Init", difficulty: "Dễ", question: "Trong lập trình hướng đối tượng với Python, phương thức magic dunder `__init__` đóng vai trò kỹ thuật cốt lõi nào?", code: "", options: ["Xóa sạch thực thể khỏi bộ nhớ RAM khi kết thúc chương trình.", "Ép kiểu đối tượng thành dạng chuỗi hiển thị.", "Là hàm Khởi tạo (Constructor) tự động chạy khi sinh ra một instance mới để thiết lập trạng thái và gán thuộc tính ban đầu.", "Cấu hình liên kết kế thừa với lớp cha."], correctAnswer: 2, explanation: "Phương thức `__init__` đóng vai trò là hàm khởi tạo (Constructor). Nó tự động chạy ngay khi đối tượng được cấp phát ô nhớ để nhận các tham số đầu vào và nạp dữ liệu vào thuộc tính qua con trỏ self.", hint: "Hàm chịu trách nhiệm thiết lập các giá trị và trạng thái sơ khởi ban đầu cho đối tượng." },
  { id: 268, topic: "ND10: Đệ quy", difficulty: "Dễ", question: "Thành phần chốt chặn nào là BẮT BUỘC phải có trong thân một hàm đệ quy để chặn đứng lỗi sập bộ nhớ call stack hệ thống (Stack Overflow)?", code: "", options: ["Một biến đếm toàn cục đặt bên ngoài module.", "Khối bẫy lỗi ngoại lệ try-except lồng nhau.", "Điều kiện cơ sở dừng giải thuật (Base Case).", "Lệnh print hiển thị dữ liệu."], correctAnswer: 2, explanation: "Base Case (điều kiện dừng) là rẽ nhánh logic trả về một giá trị trực tiếp cụ thể mà không gọi đệ quy tiếp nữa, tạo điểm neo để hệ thống bắt đầu thu hồi các Stack Frame trên Call Stack.", hint: "Nút phanh khẩn cấp để thuật toán nhận biết thời điểm dừng tự gọi lại chính nó." },
  { id: 269, topic: "ND11: Exceptions", difficulty: "Dễ", question: "Tại sao lỗi cú pháp nghiêm trọng `SyntaxError` lại KHÔNG THỂ đánh lưới bắt được bằng khối bẫy lỗi `try-except` thông thường?", code: "", options: ["Do hệ thống chưa import các thư viện ngoại lệ.", "Vì `SyntaxError` bùng nổ ở giai đoạn phân tích cú pháp mã nguồn (Parsing stage) trước khi toàn bộ chương trình kịp thực thi dòng lệnh đầu tiên.", "Chỉ bắt được nếu sử dụng cấu trúc try-finally.", "Do lỗi cú pháp nằm ở phạm vi global."], correctAnswer: 1, explanation: "Python phải phân tích ngữ pháp file và biên dịch thành bytecode thành công thì mới có thể bắt đầu chạy. Lỗi cú pháp làm chương trình bị chặn đứng từ khâu Parsing, do đó khối try chưa bao giờ được khởi động.", hint: "Lỗi vi phạm ngữ pháp cấu trúc cấu trúc bị thổi phạt ngay từ vòng gửi xe trước khi chạy mã." },
  { id: 270, topic: "ND12: File Mode", difficulty: "Dễ", question: "Khi thực thi câu lệnh mở file với chế độ ghi `'w'` (Write), hành vi phá hủy nào sẽ xảy ra đối với nội dung cũ nếu tệp tin đó đã tồn tại sẵn trên đĩa cứng?", code: "", options: ["Ghi nối tiếp thông tin mới vào ngay phía sau dữ liệu cũ.", "Hệ thống báo lỗi ngưng hoạt động.", "Xóa trắng hoàn toàn dữ liệu file cũ (truncate về 0 bytes) rồi mới tiến hành ghi đè dữ liệu mới.", "Tự động đổi thuộc tính file sang read-only."], correctAnswer: 2, explanation: "Chế độ `'w'` (Write) mang tính chất phá hủy cấu trúc cũ. Ngay khi mở file, hệ thống sẽ thực hiện tác vụ cắt cụt (truncate) dung lượng tệp tin về 0 bytes, xóa sạch nội dung cũ để sẵn sàng ghi mới.", hint: "Thanh lọc, xóa sạch toàn bộ nội dung cũ để làm lại từ đầu." },
  { id: 271, topic: "ND03: Nhân List", difficulty: "Trung bình", question: "Toán tử nhân `*` trên mảng một chiều List thực hiện sao chép tham chiếu phần tử. Hãy xác định kết quả in ra của biểu thức sau:", code: "print([1, 2] * 3)", options: ["Lỗi xung đột toán tử", "[3, 6]", "[1, 2, 1, 2, 1, 2]", "[1, 2, 3]"], correctAnswer: 2, explanation: "Toán tử `*` trên cấu trúc danh sách List thực hiện hành vi nhân bản (lặp lại) nội dung của mảng đó N lần và thực hiện nối chuỗi mảng liên tiếp để trả về một list tổng hợp.", hint: "Nhân bản sao chép nội dung mảng và nối đuôi tuần tự vào nhau." },
  { id: 272, topic: "ND03: Slicing đảo ngược", difficulty: "Trung bình", question: "Áp dụng kỹ thuật cắt lát (Slicing) với bước nhảy âm cách quãng. Hãy phân tích chuỗi con trích xuất trích xuất thu được từ logic sau:", code: "s = '123456'\nprint(s[::-2])", options: ["642", "531", "246", "Lỗi chỉ mục vượt biên"], correctAnswer: 0, explanation: "Cú pháp `[::-2]` chỉ thị duyệt chuỗi đi lùi từ ký tự cuối cùng lên đầu với bước nhảy là 2. Các ký tự được chọn lần lượt là: s[-1]='6', s[-3]='4', s[-5]='2'. Ghép lại thu được chuỗi '642'.", hint: "Đi lùi ngược dòng từ cuối chuỗi lên đầu chuỗi và nhảy cách một ký tự." },
  { id: 273, topic: "ND04: Toán tử OR", difficulty: "Trung bình", question: "Dựa trên tính chất đoản mạch (Short-circuit logic) của toán tử quan hệ `or`, hãy xác định giá trị được gán và hiển thị của biến `x`:", code: "x = (5 < 2) or 20\nprint(x)", options: ["True", "False", "20", "Error văng ngoại lệ"], correctAnswer: 2, explanation: "Toán tử `or` thấy biểu thức vế trái `(5 < 2)` lượng giá trả về `False`. Do đó, nó buộc phải dịch chuyển con trỏ sang đánh giá vế phải. Vì số 20 mang giá trị Truthy và là phần tử cuối, Python trả về chính nó.", hint: "Nếu vế trái mang kết quả Sai, toán tử OR bắt buộc phải chuyển sang lấy dữ liệu vế phải." },
  { id: 274, topic: "ND04: Hàm all", difficulty: "Trung bình", question: "Hàm kiểm tra toàn vẹn `all()` lượng giá tính chất chân lý của các phần tử trong mảng dưới đây và trả về kết quả nào?", code: "print(all([1, 2, '0']))", options: ["True", "False", "Lỗi kiểu dữ liệu TypeError", "None"], correctAnswer: 0, explanation: "Hàm `all()` trả về `True` khi mọi phần tử trong Iterable đều mang giá trị Truthy. Số 1, số 2 đều là Đúng; đối tượng chuỗi `'0'` không phải chuỗi rỗng nên cũng mang giá trị Truthy. Do đó kết quả là True.", hint: "Chuỗi ký tự chứa chữ số 0 vẫn là một đối tượng chuỗi có nội dung khác rỗng." },
  { id: 275, topic: "ND05: for-else break", difficulty: "Trung bình", question: "Phân tích cơ chế ngắt mạch vòng lặp bẻ gãy khối lệnh điều khiển bổ trợ `else`. Dòng chữ ký tự 'B' có xuất hiện trên màn hình không?", code: "for i in range(2):\n    break\nelse:\n    print('B')", options: ["Có in ra chữ 'B'", "Không in ra nội dung gì do break đã hủy quyền thực thi của khối else", "Lỗi cú pháp Runtime Error", "In ra chữ 'B' hai lần"], correctAnswer: 1, explanation: "Khối `else` đính kèm sau vòng lặp được quy định chỉ kích hoạt chạy nếu chu trình lặp kết thúc trọn vẹn tự nhiên. Lệnh `break` ở ngay bước đầu tiên đã chém đứt vòng lặp, triệt tiêu vĩnh viễn quyền chạy của `else`.", hint: "Nếu vòng lặp bị thoát cưỡng chế bằng câu lệnh break, khối else liền sau sẽ bị vô hiệu hóa." },
  { id: 276, topic: "ND05: Continue Jump", difficulty: "Trung bình", question: "Lệnh bỏ qua chu trình `continue` điều khiển con trỏ bước lặp ra sao? Xác định chuỗi số thu được sau khi kết thúc vòng lặp:", code: "for i in range(3):\n    if i == 1: continue\n    print(i, end='')", options: ["012", "02", "12", "0"], correctAnswer: 1, explanation: "Khi `i == 1`, điều kiện thỏa mãn thỏa mãn kích nổ lệnh `continue`. Hệ thống bỏ qua dòng code lệnh print phía dưới, lập tức nhảy phắt sang chu trình lặp mới với i=2. Kết quả hiển thị chỉ chứa 0 và 2.", hint: "Bỏ qua phần đuôi còn lại của chu trình hiện tại để tịnh tiến sang bước lặp mới." },
  { id: 277, topic: "ND06: Lệnh Global", difficulty: "Trung bình", question: "Cơ chế cấp quyền sửa đổi tài sản phạm vi thông qua từ khóa `global`. Biến `y` toàn cục biến đổi ra sao sau khi hàm kết thúc?", code: "y = 5\ndef f():\n    global y\n    y = y * 2\nf()\nprint(y)", options: ["5", "10", "Error văng lỗi phạm vi", "None"], correctAnswer: 1, explanation: "Từ khóa `global y` thiết lập mối liên kết thẳng từ tên biến trong thân hàm với ô nhớ toàn cục ngoài module. Phép gán `y = y * 2` cập nhật trực tiếp giá trị biến gốc, biến đổi từ 5 thành 10.", hint: "Mở khóa toàn quyền ghi đè giá trị cho ô nhớ thuộc quyền quản lý của scope toàn cục." },
  { id: 278, topic: "ND06: Keyword Args", difficulty: "Trung bình", question: "Khi thực hiện lời gọi hàm trong Python, quy tắc ràng buộc trật tự giữa đối số vị trí (Positional) và đối số đặt tên (Keyword) nào sau đây bắt buộc tuân thủ?", code: "def func(a, b): pass", options: ["func(b=2, 1) - Sai vì đối số đặt tên đứng trước đối số vị trí", "func(a=1, b=2) - Đúng cấu trúc", "func(1, b=2) - Đúng cấu trúc", "func(1, 2) - Đúng cấu trúc"], correctAnswer: 0, explanation: "Chuẩn cú pháp Python quy định các positional arguments (đối số không tên) bắt buộc phải được khai báo xuất hiện TRƯỚC các keyword arguments (đối số đặt tên). Gọi `func(b=2, 1)` vi phạm luật này.", hint: "Các đối số tự do vị trí phải đi tiên phong, các đối số có gắn nhãn tên gọi phải xếp ở phía sau." },
  { id: 279, topic: "ND07: List Comprehension Filter", difficulty: "Trung bình", question: "Phân tích cú pháp List Comprehension lồng bộ lọc điều kiện đơn `if`. Mảng danh sách động sinh ra cuối cùng sẽ chứa những giá trị nào?", code: "print([x*2 for x in [1, 2, 3] if x < 3])", options: ["[2, 4, 6]", "[2, 4]", "[4, 6]", "[]"], correctAnswer: 1, explanation: "Bộ lọc điều kiện `if x < 3` thực hiện quét trước, giữ lại hai phần tử 1 và 2 từ danh sách mảng gốc. Sau đó, biểu thức biến đổi `x*2` chạy trên hai phần tử này, nhân bản thành mảng kết quả `[2, 4]`.", hint: "Thực hiện lọc loại bỏ phần tử không thỏa mãn trước, sau đó nhân đôi phần tử được giữ lại." },
  { id: 280, topic: "ND07: Set Difference", difficulty: "Trung bình", question: "Toán tử trừ `-` thực hiện phép toán Hiệu (Difference) giữa hai Tập hợp (Set). Tập hợp kết quả thu được cuối cùng sẽ chứa những phần tử nào?", code: "print({1, 2, 3} - {2, 4})", options: ["{1, 3}", "{-1, -2}", "{1, 3, 4}", "Lỗi kiểu dữ liệu TypeError"], correctAnswer: 0, explanation: "Phép toán trừ `-` giữa các Tập hợp trích xuất ra những phần tử có mặt trong tập hợp thứ nhất nhưng tuyệt đối không được xuất hiện trong tập hợp thứ hai. Số 2 bị thanh lọc, tập hợp còn lại là `{1, 3}`.", hint: "Thu thập các phần tử độc quyền chỉ tồn tại ở tập hợp bên trái mà không nằm ở tập bên phải." },
  { id: 281, topic: "ND08: Trace Binary Search", difficulty: "Trung bình", question: "Trong vòng lặp Tìm kiếm nhị phân trên mảng tăng dần, kịch bản logic nào được thực thi để thu hẹp không gian bài toán khi giá trị tại vị trí ở giữa nhỏ hơn giá trị mục tiêu (`arr[mid] < target`)?", code: "if arr[mid] < target:\n    # Cập nhật", options: ["right = mid - 1 để thu hẹp sang nửa bên trái", "left = mid + 1 để thu hẹp sang nửa bên phải", "return mid thoát thuật toán", "break bẻ gãy luồng chạy"], correctAnswer: 1, explanation: "Vì mảng đã xếp tăng dần, nếu phần tử ở giữa `arr[mid]` nhỏ hơn mục tiêu, chân lý khẳng định mục tiêu chắc chắn nằm ở nửa mảng phía bên phải. Ta dịch tịnh tiến cọc biên trái `left = mid + 1` để chặt bỏ nửa trái.", hint: "Dịch chuyển ranh giới biên trái lên phía trên điểm mid để tập trung rà soát nửa không gian bên phải." },
  { id: 282, topic: "ND08: Insertion Sort Trace", difficulty: "Trung bình", question: "Hãy phân tích chi tiết bước toán hạng thứ hai của thuật toán Sắp xếp chèn (Insertion Sort) trên mảng dữ liệu `[4, 2, 3]`. Phần tử số 2 sẽ được hệ thống xử lý dịch chuyển ra sao?", code: "", options: ["Nằm yên cố định tại vị trí cũ.", "Đổi chỗ trực tiếp một bước với số 3.", "Được nhấc ra khỏi mảng, đẩy phần tử số 4 lùi về sau 1 ô nhớ, rồi chèn số 2 vào vị trí chỉ mục index 0.", "Xóa bỏ khỏi cấu trúc mảng."], correctAnswer: 2, explanation: "Insertion Sort hoạt động bằng cơ chế chèn lùi. Khi duyệt đến số 2, nó nhấc số 2 ra làm biến tạm, so sánh ngược với số 4 phía trước. Vì 4 > 2, nó dịch số 4 sang phải chiếm chỗ số 2, rồi chèn số 2 vào vị trí index 0 trống.", hint: "Nhấc phần tử ra để so sánh lùi, xê dịch các node lớn hơn sang phải để tạo khoảng trống chèn phần tử vào." },
  { id: 283, topic: "ND09: Phương thức Super", difficulty: "Trung bình", question: "Để bẻ gãy bẫy ghi đè và kích hoạt một cách chuẩn mực phương thức `speak()` của lớp cha `Animal` từ bên trong phạm vi lớp con `Dog`, ta áp dụng cú pháp nào?", code: "", options: ["Animal.speak()", "self.speak()", "super().speak()", "parent.speak()"], correctAnswer: 2, explanation: "Hàm `super()` trả về một đối tượng proxy đại diện cho siêu lớp cấu trúc cha dựa trên chuỗi tra cứu MRO, cho phép gọi phương thức gốc của cha một cách tường minh, an toàn và sạch sẽ.", hint: "Gọi đối tượng siêu lớp đại diện cấu trúc nền tảng của cha." },
  { id: 284, topic: "ND09: isinstance", difficulty: "Trung bình", question: "Hàm kiểm tra thực thể `isinstance(obj, Class)` thể hiện tính chất đa hình của lập trình hướng đối tượng ra sao? Xác định kết quả lượng giá logic của lệnh dưới đây:", code: "class A: pass\nclass B(A): pass\nobj = B()\nprint(isinstance(obj, A))", options: ["True", "False", "Error văng lỗi thuộc tính AttributeError", "None"], correctAnswer: 0, explanation: "Vì `class B` kế thừa từ `class A`, nên mọi thực thể (instance) được sinh ra từ lớp B đều đồng thời mang bản chất và dòng dõi của lớp A (quan hệ Is-a). Phép kiểm tra đa hình `isinstance` trả về chân lý Đúng (True).", hint: "Kiểm tra xem đối tượng có thuộc dòng dõi huyết thống của lớp mục tiêu hay không." },
  { id: 285, topic: "ND10: Tabulation", difficulty: "Trung bình", question: "Đặc điểm cốt lõi về mặt thiết kế luồng xử lý và tối ưu hóa quản lý không gian bộ nhớ của kỹ thuật Lập bảng (Tabulation) trong Quy hoạch động là gì?", code: "", options: ["Giải bài toán bằng phương pháp Top-down phân rã đệ quy đa nhánh.", "Sử dụng bộ nhớ call stack hệ thống hệ thống để lưu trữ trạng thái đệ quy.", "Sử dụng một mảng/bảng cấu trúc phụ trợ kết hợp vòng lặp tuyến tính để giải cuốn chiếu bài toán từ vùng đáy nhỏ nhất đi lên (Bottom-up).", "Chỉ áp dụng xử lý trên cấu trúc mảng một chiều."], correctAnswer: 1, explanation: "Kỹ thuật Tabulation triệt tiêu hoàn toàn dấu vết của hàm đệ quy để chống tràn call stack. Nó khởi tạo mảng, sử dụng các vòng lặp `for` chạy tịnh tiến tính toán lời giải từ bài toán cơ sở thấp nhất đi lên bài toán đích.", hint: "Chiến lược tiếp cận Bottom-up, giải bài toán nền móng trước rồi dùng vòng lặp tích lũy đi lên đỉnh." },
  { id: 286, topic: "ND10: Đệ quy Trace", difficulty: "Trung bình", question: "Hãy thực hiện dò vết thuật toán (tracing) luồng gọi đệ quy thu hồi ô nhớ của hàm số tính lũy thừa dưới đây để tìm giá trị trả về của lời gọi `f(3)`:", code: "def f(n):\n    if n == 0: return 1\n    return 2 * f(n-1)\nprint(f(3))", options: ["8", "6", "4", "3"], correctAnswer: 0, explanation: "Hàm số thực hiện tính toán cấp số mũ 2 mũ n ($2^n$). Quá trình thu hồi bộ nhớ stack frame diễn ra tuần tự: `f(3) = 2 * f(2) = 2 * 2 * f(1) = 2 * 2 * 2 * f(0) = 2 * 2 * 2 * 1 = 8`.", hint: "Mô phỏng phép toán nhân tích lũy liên tiếp số 2 với độ sâu tầng đệ quy bằng n." },
  { id: 287, topic: "ND11: Exceptions Tuple", difficulty: "Trung bình", question: "Cú pháp chuẩn mực và hợp lệ nào được ngôn ngữ Python quy định để một câu lệnh `except` có thể tóm bắt đồng thời nhiều loại ngoại lệ lỗi khác nhau?", code: "", options: ["except TypeError or ValueError:", "except TypeError, ValueError:", "except (TypeError, ValueError):", "except [TypeError, ValueError]:"], correctAnswer: 2, explanation: "Python yêu cầu khi muốn bắt giữ chung nhiều loại ngoại lệ lỗi trên cùng một dòng lệnh, lập trình viên bắt buộc phải đóng gói danh sách tên các ngoại lệ đó vào một cấu trúc Tuple (bọc bằng cặp dấu ngoặc đơn).", hint: "Gom cụm danh sách tên các ngoại lệ lỗi mục tiêu vào trong một bộ dữ liệu Tuple." },
  { id: 288, topic: "ND12: read() vs readlines()", difficulty: "Trung bình", question: "Khác biệt cốt lõi về cấu trúc kiểu dữ liệu trả về nạp vào bộ nhớ RAM giữa phương thức `.read()` và phương thức `.readlines()` trên đối tượng file stream là gì?", code: "", options: ["Chúng hoàn toàn đồng nhất hình thái cấu trúc dữ liệu.", "`.read()` trả về một chuỗi ký tự String dài nguyên khối; `.readlines()` chẻ nội dung văn bản thành một danh sách List chứa các dòng chuỗi biệt lập.", "`.readlines()` có băng thông và tốc độ đọc file nhanh hơn .read() gấp nhiều lần.", "`.read()` tự động trả về mảng danh sách chứa các byte thô nhị phân."], correctAnswer: 1, explanation: "Phương thức `.read()` tải trọn vẹn văn bản tệp tin vào một biến String nguyên bản duy nhất. Trong khi đó, `.readlines()` thực hiện quét file, chẻ nội dung dựa theo ký tự ngắt dòng `\\n` để đóng gói thành mảng List nhiều dòng.", hint: "Sự phân cấp giữa một biến chuỗi ký tự dài nguyên khối và một mảng danh sách chứa nhiều dòng con." },
  { id: 289, topic: "Nâng cao: K-Means Initialization", difficulty: "Trung bình", question: "Bước sơ khởi tiên quyết đầu tiên nhất của thuật toán học máy phân cụm không giám sát K-Means được thực hiện bằng phương pháp nào?", code: "", options: ["Tính toán khoảng cách Euclid bình phương.", "Cập nhật lại tọa độ trọng tâm cụm.", "Lựa chọn ngẫu nhiên K điểm từ không gian dữ liệu để tạm gán làm các vị trí tâm cụm (Centroids) khởi điểm ban đầu.", "Trộn xáo trộn mảng."], correctAnswer: 2, explanation: "Bước khởi tạo của K-Means bắt buộc phải chọn ra K điểm ngẫu nhiên để làm các hạt nhân tâm cụm khởi điểm (centroids). Từ các mốc tạm thời này, thuật toán mới chạy vòng lặp tối ưu để gom các điểm lân cận về sau.", hint: "Thực hiện thao tác bốc ngẫu nhiên các điểm mốc dữ liệu để dựng hạt nhân tâm cụm sơ khởi." },
  { id: 290, topic: "Nâng cao: deque O(1)", difficulty: "Trung bình", question: "Phương thức rút trích hủy node ở đầu hàng `popleft()` cấu hình trên đối tượng hàng đợi kép `collections.deque` tiêu tốn chi phí độ phức tạp thời gian đạt mức tiệm cận nào?", code: "", options: ["O(N) tuyến tính thời gian", "O(1) hằng số thời gian siêu tốc", "O(log N) chia đôi thời gian", "O(N^2) bậc hai thời gian"], correctAnswer: 1, explanation: "Nhờ kiến trúc danh sách liên kết đôi (doubly linked list) quản lý độc lập các con trỏ node ở hai đầu biên, đối tượng deque thực hiện ngắt link node bên đầu hàng (bên trái) đạt hiệu năng hằng số thời gian tối ưu $O(1)$.", hint: "Hiệu năng xử lý đạt mức hằng số thời gian siêu tốc, độc lập hoàn toàn với quy mô dữ liệu N của bài toán." },
  { id: 291, topic: "ND03: Float Precision IEEE 754", difficulty: "Khó", question: "Do giới hạn biểu diễn cấu trúc số thực dấu phẩy động nhị phân chuẩn quốc tế IEEE 754 của kiến trúc phần cứng máy tính, phép so sánh chân lý số thực sau đây sẽ trả về kết quả hiển thị nào?", code: "print(0.1 + 0.2 == 0.3)", options: ["True", "False", "Error văng lỗi số thực", "None"], correctAnswer: 1, explanation: "Máy tính không thể biểu diễn chính xác tuyệt đối các số thập phân hệ 10 ở dạng nhị phân. Biểu thức `0.1 + 0.2` lượng giá runtime sẽ cho ra giá trị sai số là `0.30000000000000004`, do đó phép toán so sánh bằng trả về False.", hint: "Số thực lưu trữ trên thanh ghi máy tính luôn dính các sai số vi ly ở phần đuôi thập phân." },
  { id: 292, topic: "ND04: Bẫy so sánh chuỗi (Chained comparison)", difficulty: "Khó", question: "Cạm bẫy viết chuỗi toán tử quan hệ bắc cầu liên tiếp kết hợp giá trị Boolean. Hãy trace kỹ luồng xử lý của CPython để tìm giá trị chân lý in ra:", code: "print(5 > 4 == True)", options: ["True", "False", "Lỗi phân tích cú pháp Error", "Lỗi biên dịch cấu trúc SyntaxError"], correctAnswer: 1, explanation: "Cơ chế chain toán tử phân rã biểu thức thành cấu trúc logic: `(5 > 4) and (4 == True)`. Đánh giá vế trái: `5 > 4` trả về `True`. Đánh giá vế phải: `4 == True` (tương đương số 4 so sánh với số 1) trả về `False`. Kết quả `True and False = False`.", hint: "Thực hiện chèn toán tử logic AND phân tách ngầm vào giữa các toán tử so sánh quan hệ liền kề." },
  { id: 293, topic: "ND05: Rò rỉ biến lặp (Loop Leak)", difficulty: "Khó", question: "Khác biệt với các ngôn ngữ biên dịch nghiêm ngặt quản lý biến chặt chẽ, vòng lặp `for` của Python có cơ chế quản lý scope biến lặp đặc thù nào? Hãy tính xem chương trình sau in ra số mấy:", code: "for x in range(3):\n    pass\nprint(x)", options: ["Lỗi nghiêm trọng: NameError do x bị hủy scope", "0", "2", "3"], correctAnswer: 1, explanation: "Vòng lặp `for` của Python không tự cô lập tầm vực biến lặp vào Local scope riêng. Biến `x` tự do rò rỉ (leak) ra không gian scope cha bên ngoài và giữ lại giá trị của chu trình lặp cuối cùng trước khi thoát, ở đây là số 2.", hint: "Biến điều khiển lặp không bị giam giữ trong thân vòng lặp mà tràn thẳng ra phạm vi scope ngoài." },
  { id: 294, topic: "ND06: UnboundLocalError Trap", difficulty: "Khó", question: "Tại sao việc thực thi lời gọi hàm `f()` dưới đây lại kích nổ ngoại lệ hệ thống nghiêm trọng `UnboundLocalError` mặc dù biến `x` đã khai báo ở Global?", code: "x = 10\ndef f():\n    x += 1\nf()", options: ["Cú pháp toán tử logic += bị sai", "Lệnh gán phức hợp `+=` vô tình khóa cứng x thành biến cục bộ khi chưa được khởi tạo giá trị trong phạm vi Local Scope", "Bắt buộc phải import thư viện toán học", "Hàm chạy hoàn hảo không phát sinh lỗi"], correctAnswer: 1, explanation: "Trong thiết kế biên dịch của Python, hễ xuất hiện lệnh gán (`=`, `+=`) trong thân hàm, trình thông dịch tự động đóng nhãn biến đó thuộc phạm vi Local cục bộ. Khi tính toán vế phải `x + 1`, hệ thống tìm giá trị cục bộ của `x` nhưng chưa thấy khởi tạo -> báo lỗi.", hint: "Sự hiện diện của câu lệnh gán tự động ép phạm vi của biến chặt vào tầm vực Local cục bộ." },
  { id: 295, topic: "ND06: Closure Late Binding", difficulty: "Khó", question: "Cạm bẫy liên kết muộn (Late Binding Trap) của cấu trúc hàm ẩn danh Lambda lồng trong vòng lặp mảng viết gọn. Hãy tính xem danh sách kết quả hiển thị ra chứa những gì?", code: "funcs = [lambda: i for i in range(3)]\nprint([f() for f in funcs])", options: ["[0, 1, 2]", "[2, 2, 2]", "[3, 3, 3]", "Lỗi văng cấu trúc Scope"], correctAnswer: 1, explanation: "Hàm lambda tạo bởi vòng lặp không lưu trữ bản sao giá trị của `i` lúc định nghĩa mà lưu con trỏ tham chiếu đến địa chỉ biến `i`. Khi vòng lặp range kết thúc, `i` đạt giá trị cực đại là 2. Lúc mảng comprehension gọi `f()`, tất cả đều nhìn thấy `i` hiện tại là 2.", hint: "Hàm con chỉ thực hiện tra cứu giá trị thực tế của biến tại thời điểm hàm đó được chính thức kích hoạt gọi chạy." },
  { id: 296, topic: "ND07: Dictionary Unhashable Key", difficulty: "Khó", question: "Đoạn mã cấu hình nạp phần tử vào Dictionary dưới đây sẽ kích nổ ngoại lệ runtime cụ thể nào do vi phạm nghiêm trọng quy tắc bảng băm?", code: "d = {(1, [2]): 'A'}", options: ["Lỗi cú pháp cú pháp SyntaxError", "Lỗi không tìm thấy khóa mục tiêu KeyError", "Lỗi kiểu dữ liệu nghiêm trọng TypeError: unhashable type: 'list'", "Chương trình chạy trơn tru"], correctAnswer: 2, explanation: "Dictionary yêu cầu các đối tượng làm Key phải bất biến và tính được mã băm (Hashable). Do đối tượng Tuple `(1, [2])` dính phần tử ruột là mảng List `[2]` có đặc tính khả biến (Mutable), cấu trúc băm của Tuple bị phá hủy hoàn toàn gây lỗi TypeError.", hint: "Set và Key của Dict tuyệt đối cấm ngặt việc chứa đựng thực thể khả biến không có mã băm cố định." },
  { id: 297, topic: "ND09: MRO Kim Cương", difficulty: "Khó", question: "Dựa trên thuật toán phân giải tuyến tính thứ tự phương thức C3 Linearization, trình thông dịch Python sẽ thực hiện rà soát các nhánh con cháu theo trình tự cốt lõi nào trong mô hình đa kế thừa kim cương `class D(B, C)`?", code: "class A: pass\nclass B(A): pass\nclass C(A): pass\nclass D(B, C): pass", options: ["Ưu tiên truy vết dọc lên lớp tổ tiên chung A trước tiên.", "Ưu tiên quét ngang qua nhánh C trước rồi mới sang nhánh B.", "Ưu tiên duyệt trọn vẹn chiều rộng tầng ngang (từ trái qua phải B rồi C), trì hoãn việc quét lớp tổ tiên chung A về cuối cùng.", "Xáo trộn ngẫu nhiên thứ tự các nhánh tùy thuộc ô nhớ RAM."], correctAnswer: 2, explanation: "Thuật toán C3 Linearization bảo toàn nguyên lý: duyệt hết chiều rộng các lớp con song song hàng ngang (quét B rồi sang C) và luôn hoãn việc tra cứu lên lớp cha chung tổ tiên (`A`) cho đến khi toàn bộ con cháu của nó được duyệt sạch. Thứ tự: [D, B, C, A, object].", hint: "Quét sạch toàn bộ hệ thống lớp con ở hàng ngang trước khi tiến lên chốt chặn lớp tổ tiên chung ở đỉnh." },
  { id: 298, topic: "ND11: Tranh giành Return in Finally", difficulty: "Khó", question: "Sự tranh chấp quyền kiểm soát luồng thoát hàm dữ dội giữa khối thử nghiệm và khối chốt chặn bảo mật tối cao. Giá trị trả về cuối cùng của hàm số `run()` là chuỗi nào?", code: "def run():\n    try:\n        return 'Try'\n    finally:\n        return 'Finally'\nprint(run())", options: ["Try", "Finally", "Lỗi cấu trúc Runtime Error", "None"], correctAnswer: 1, explanation: "Khối lệnh `finally` được CPython bảo đảm quyền thực thi tuyệt đối trước khi hàm chính thức đóng khung bộ nhớ thoát ra ngoài. Lệnh `return 'Finally'` trong khối này sẽ ghi đè và triệt tiêu hoàn toàn lệnh `return 'Try'` đang xếp hàng đợi ở khối try.", hint: "Câu lệnh trả về kết quả nằm ở khối finally sở hữu quyền sinh sát tối cao, ghi đè mọi dữ liệu chờ rời hàm đằng trước." },
  { id: 299, topic: "ND12: Iterator File cạn kiệt", difficulty: "Khó", question: "Đối tượng tệp tin trong Python cài đặt chặt chẽ giao thức lặp một chiều (Iterator protocol). Nếu file `a.txt` cấu hình lưu trữ chỉ đúng 1 dòng văn bản duy nhất, câu lệnh gọi hàm dịch luồng `next(f)` thứ hai sẽ gây ra lỗi gì?", code: "# File a.txt có đúng 1 dòng văn bản\n# with open('a.txt') as f:\n# next(f); next(f)", options: ["Lỗi tìm khóa không tồn tại KeyError", "Ngoại lệ cạn kiệt luồng dữ liệu một chiều StopIteration", "Lỗi kết thúc tệp tin đột ngột EOFError", "Chương trình chạy tiếp mượt mà không lỗi"], correctAnswer: 1, explanation: "File object hoạt động như một Iterator thực thụ. Lời gọi `next(f)` đầu tiên đã đọc và trích xuất xong dòng duy nhất, dịch con trỏ chạm đáy file. Lời gọi `next(f)` tiếp theo nhận thấy luồng trống rỗng bắt buộc phải ném lỗi StopIteration theo đặc tả.", hint: "Ngoại lệ đặc trưng của Iterator dùng để phát tín hiệu thông báo luồng nạp dữ liệu tuần tự đã cạn kiệt tài nguyên." },
  { id: 300, topic: "Nâng cao: Bẫy Assert Tuple", difficulty: "Khó", question: "Cạm bẫy bọc biểu thức kiểm thử vào trong cặp dấu ngoặc đơn tạo thành cấu trúc Tuple. Lệnh khẳng định `assert` dưới đây có bao giờ ném ra lỗi ngoại lệ `AssertionError` phá vỡ luồng chạy hay không?", code: "assert (1 == 2, 'Lỗi toán học')", options: ["Có, văng lỗi dừng chương trình lập tức", "Không bao giờ báo lỗi, chương trình vượt qua kiểm thử an toàn", "Ném ra ngoại lệ sai cấu trúc cú pháp SyntaxError", "Lỗi xung đột kiểu dữ liệu nghiêm trọng TypeError"], correctAnswer: 1, explanation: "Dấu phẩy ngăn cách bên trong cặp dấu ngoặc đơn ép Python lượng giá biểu thức thành một đối tượng kiểu Tuple có 2 phần tử `(False, 'Lỗi toán học')`. Trong Python, mọi Tuple khác rỗng luôn mang giá trị Truthy (True). Lệnh `assert True` luôn luôn vượt qua mà không báo lỗi.", hint: "Mọi đối tượng cấu trúc dữ liệu Tuple chứa phần tử bên trong (khác rỗng) luôn được hệ thống lượng giá là chân lý Đúng." },
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
  const [studentMSSV, setStudentMSSV] = useState('2502XXXX');
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

  const startCentralMockExam = () => {
  setCurrentExam({
    title: "Đề Thi Thử Toàn Diện Tổng Hợp",
    description: "Đề thi cấu trúc chuẩn UET: 40% Dễ, 40% Trung bình, 20% Khó lấy ngẫu nhiên từ ngân hàng 300 câu hỏi."
  });

  // Phân loại toàn bộ câu hỏi theo độ khó
  const easyPool = ALL_QUESTIONS.filter(q => q.difficulty === "Dễ");
  const mediumPool = ALL_QUESTIONS.filter(q => q.difficulty === "Trung bình");
  const hardPool = ALL_QUESTIONS.filter(q => q.difficulty === "Khó");

  // Hàm helper trộn ngẫu nhiên mảng (Fisher-Yates hoặc Sort đơn giản)
  const shuffle = (array) => [...array].sort(() => 0.5 - Math.random());

  // Bốc đúng số lượng theo tỷ lệ 40% - 40% - 20% (Tổng số: 50 câu)
  const selectedEasy = shuffle(easyPool).slice(0, 20);
  const selectedMedium = shuffle(mediumPool).slice(0, 20);
  const selectedHard = shuffle(hardPool).slice(0, 10);

  // Trộn tổng hợp lại toàn bộ 50 câu để độ khó đan xen ngẫu nhiên
  const finalMockQuestions = shuffle([...selectedEasy, ...selectedMedium, ...selectedHard]);

  setQuestionsBank(finalMockQuestions);
  setActiveTab('mock');
  setCurrentQuestionIdx(0);
  setSelectedOption(null);
  setIsAnswerSubmitted(false);
  setAnswersState({});
  setTimer(0);
  setMockTimeRemaining(5400); // 90 phút chuẩn thi cử UET
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
                    Hệ Sinh Thái Ôn Thi Của Em Kiên <span className="bg-gradient-to-r from-emerald-400 to-sky-400 bg-clip-text text-transparent">COM1050 v9.1</span>
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

            {/* KHU VỰC THI THỬ TRUNG TÂM TOÀN DIỆN - CĂN GIỮA TUYỆT ĐỐI */}
<div className="mb-10 p-8 rounded-3xl border border-zinc-800 bg-gradient-to-b from-zinc-950 to-zinc-900/50 shadow-2xl max-w-2xl mx-auto text-center relative overflow-hidden group">
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(14,165,233,0.08),transparent_60%)]" />
  <div className="relative z-10 space-y-5">
    <div className="inline-flex p-3.5 bg-sky-500/10 border border-sky-500/20 rounded-2xl text-sky-400 group-hover:scale-110 transition-transform duration-300">
      <Icons.Award />
    </div>
    <div className="space-y-2">
      <h3 className="text-xl font-black text-zinc-100 tracking-wide uppercase font-mono">
        HỆ THỐNG THI THỬ MOCK EXAM CHUẨN UET
      </h3>
      <p className="text-xs text-zinc-400 max-w-md mx-auto leading-relaxed">
        Đề thi được sinh ngẫu nhiên cấu trúc <span className="text-sky-400 font-bold">50 câu hỏi</span> từ kho dữ liệu 300 câu. Thuật toán kiểm soát nghiêm ngặt độ khó: 
        <br />
        <span className="text-emerald-400 font-mono font-bold">40% Dễ</span> | 
        <span className="text-amber-400 font-mono font-bold">40% Trung bình</span> | 
        <span className="text-rose-400 font-mono font-bold">20% Khó</span>.
      </p>
    </div>
    <button 
      onClick={startCentralMockExam}
      className="bg-gradient-to-r from-sky-500 via-blue-600 to-emerald-500 hover:from-sky-400 hover:to-emerald-400 text-zinc-950 font-black px-12 py-4 rounded-2xl transition-all text-xs tracking-widest uppercase shadow-[0_0_30px_rgba(56,189,248,0.2)] hover:shadow-[0_0_40px_rgba(56,189,248,0.4)] transform hover:-translate-y-0.5 active:translate-y-0 font-mono"
    >
      ⚡ BẮT ĐẦU THI THỬ TOÀN DIỆN (90 PHÚT) ⚡
    </button>
  </div>
</div>

{/* DANH SÁCH BỘ ĐỀ PHÍA DƯỚI */}
<div className="space-y-6">
  <h3 className="text-xl font-black text-white flex items-center gap-2">
    <Icons.BookOpen />
    <span>Danh Sách Bộ Đề Thi Ôn Tập Theo Chương</span>
  </h3>
  {/* ... giữ nguyên phần grid hiển thị EXAM_SETS cũ đã sửa ở Vị trí 1 ... */}
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
                    
                    <div className="pt-4 border-t border-zinc-800/50 mt-auto">
  <button
    onClick={() => startMarathon(exam)}
    className="w-full bg-zinc-900 hover:bg-emerald-500/10 hover:text-emerald-400 hover:border-emerald-500/30 text-zinc-300 font-bold py-3 rounded-xl transition-all text-xs border border-zinc-800 text-center uppercase tracking-wider font-mono"
  >
    🔥 Bắt Đầu Luyện Tự Do (Marathon)
  </button>
</div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* ===============<div className="flex gap-3 pt-4 border-t border-zinc-800/50 mt-auto">===========================
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