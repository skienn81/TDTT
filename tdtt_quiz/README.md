# TDTT Quiz App (Ứng dụng Ôn thi Python / Lập trình cơ bản)

Chào mừng bạn đến với **TDTT Quiz**, một ứng dụng web trắc nghiệm hỗ trợ ôn tập kiến thức Lập trình cơ bản, Python và Thuật toán. Dự án được xây dựng bằng các công nghệ hiện đại giúp đem lại trải nghiệm học tập mượt mà và trực quan nhất.

## 🚀 Tính năng nổi bật

- 📚 **Ngân hàng câu hỏi phong phú:** Cung cấp hàng trăm câu hỏi từ cơ bản đến nâng cao về lập trình Python, tư duy thuật toán và cấu trúc dữ liệu.
- 🏃 **Chế độ Luyện tập (Marathon):** Giải quyết câu hỏi liên tục, tích lũy điểm kinh nghiệm (XP) và duy trì chuỗi thắng (Streak).
- 🎓 **Chế độ Thi thử (Mock Exam):** Tự động sinh đề thi ngẫu nhiên gồm 50 câu (với tỉ lệ Dễ - Trung bình - Khó hợp lý), mô phỏng áp lực phòng thi thực tế với đồng hồ đếm ngược.
- 🔖 **Đánh dấu câu hỏi (Bookmark):** Lưu lại các câu khó hoặc hay để dễ dàng ôn tập lại sau này.
- 🔍 **Tìm kiếm và Lọc:** Lọc câu hỏi theo độ khó (Dễ, Trung bình, Khó) hoặc tìm kiếm theo từ khóa.
- 📈 **Thống kê tiến độ:** Theo dõi thành tích học tập qua điểm số (XP), streak, và lịch sử làm bài.

## 🛠️ Công nghệ sử dụng

- **[React 19](https://react.dev/):** Thư viện UI mạnh mẽ, phiên bản mới nhất.
- **[Vite](https://vitejs.dev/):** Công cụ build siêu tốc, HMR cực kỳ nhanh.
- **[Tailwind CSS (v4)](https://tailwindcss.com/):** Framework CSS tiện lợi cho việc styling nhanh chóng và đồng bộ.

## ⚙️ Hướng dẫn cài đặt và chạy cục bộ

Để chạy dự án trên máy tính của bạn, hãy làm theo các bước sau:

**Yêu cầu môi trường:** Cần cài đặt sẵn [Node.js](https://nodejs.org/).

1. **Clone repository và di chuyển vào thư mục dự án:**
   ```bash
   # Nếu bạn clone từ git, hãy cd vào thư mục
   cd tdtt_quiz
   ```

2. **Cài đặt các thư viện phụ thuộc (Dependencies):**
   ```bash
   npm install
   ```

3. **Chạy server phát triển (Development server):**
   ```bash
   npm run dev
   ```
   Sau khi chạy lệnh trên, terminal sẽ hiển thị một đường dẫn (thường là `http://localhost:5173/`). Nhấn vào đường dẫn đó để mở ứng dụng trên trình duyệt.

4. **Build dự án cho môi trường Production (Tuỳ chọn):**
   ```bash
   npm run build
   ```
   Dự án sau khi build sẽ nằm trong thư mục `dist`.

## 📜 Cấu trúc dự án cơ bản

- `src/App.jsx`: Chứa logic chính, quản lý state, giao diện, và hệ thống câu hỏi của ứng dụng.
- `package.json`: Cấu hình các lệnh scripts, thư viện cần thiết.
- `vite.config.js`: File cấu hình của Vite.

Chúc các bạn ôn tập thật tốt và đạt kết quả cao! 🎉