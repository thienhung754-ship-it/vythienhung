# PHẦN 3: DỰ ÁN THỰC HÀNH ĐẦU TIÊN

> 💡 **Dự án xuyên suốt:** Xây dựng **Website Cá Nhân / Portfolio** hoàn chỉnh từ con số 0, không viết một dòng code nào.

---

# Chương 6: Prompt Đầu Tiên — Từ Folder Trống Đến Website

> *"Hành trình vạn dặm bắt đầu từ một dòng prompt."*

---

## 6.1. Lên Ý Tưởng Với AI

Trước khi code, hãy **brainstorm** (suy nghĩ ý tưởng) với AI. Mở Antigravity, chắc chắn bạn đã mở folder mới (xem Chương 4), rồi gõ vào Chat Panel:

> *"Em ơi, anh muốn tạo một website cá nhân / portfolio. Em gợi ý cho anh cấu trúc website nên có những phần gì nhé."*

AI sẽ đề xuất cấu trúc, ví dụ:

```
Gợi ý cấu trúc website portfolio:
1. Hero Section — Phần đầu trang ấn tượng
2. About Me — Giới thiệu bản thân
3. Skills — Kỹ năng / Dịch vụ
4. Projects / Portfolio — Trưng bày dự án
5. Testimonials — Lời chứng thực
6. Blog — Bài viết chia sẻ
7. Contact — Thông tin liên hệ
8. Footer — Chân trang
```

Bạn xem danh sách và **chọn lọc** — không cần lấy hết. Ví dụ: "OK em, anh sẽ bắt đầu với Hero, About, Projects, Contact và Footer thôi."

> 📸 **[Hình 6.1]** Prompt brainstorm với AI — AI đề xuất cấu trúc

---

## 6.2. Prompt Đầu Tiên — Khởi Tạo Dự Án

Đây là khoảnh khắc quan trọng nhất — prompt đầu tiên "khai sinh" cho website:

```
Em tạo cho anh một dự án website portfolio cá nhân với các thông tin sau:

Công nghệ: React + Vite + TypeScript + Tailwind CSS
Theme: Tối giản, sáng (light theme), chuyên nghiệp  
Font: Inter hoặc Outfit

Cấu trúc ban đầu:
1. Hero Section: Avatar tròn ở giữa, tên lớn phía dưới, subtitle, 
   2 nút CTA ("Tìm hiểu thêm" và "Xem dự án")
2. Responsive trên mobile
3. Có smooth scroll animation

Thông tin cá nhân:
- Tên: [TÊN CỦA BẠN]
- Chức danh: [VD: "Digital Creator & Coffee Lover"]
- Bio: [VD: "Đam mê sáng tạo nội dung và khám phá công nghệ mới"]

Em khởi tạo dự án và chạy thử luôn nhé.
```

> ⚠️ **THAY ĐỔI** thông tin trong dấu ngoặc vuông `[]` thành thông tin thật của bạn!

### Điều gì xảy ra tiếp theo?

Sau khi gửi prompt, Antigravity sẽ:

1. **Tạo Implementation Plan** — Bạn sẽ thấy AI liệt kê kế hoạch:
   - "Em sẽ tạo dự án React mới..."
   - "Em sẽ cấu hình Tailwind CSS..."
   - "Em sẽ tạo component Hero..."
   
2. **Hỏi bạn approve** — AI hỏi "Anh approve kế hoạch này không?"
   → Bấm **Approve** (hoặc gõ "OK triển khai đi em")

3. **Bắt đầu làm việc** — AI sẽ:
   - Chạy lệnh tạo dự án trong Terminal
   - Tự tạo các file và folder
   - Viết code cho Hero section
   - Cài đặt các thư viện cần thiết
   - Chạy `npm run dev` để khởi động

4. **Báo cáo kết quả** — "Em đã hoàn thành, website đang chạy tại localhost:5173"

> 📸 **[Hình 6.2]** AI tạo Implementation Plan
> 📸 **[Hình 6.3]** Terminal đang cài đặt dependencies
> 📸 **[Hình 6.4]** Terminal chạy npm run dev thành công

---

## 6.3. Khoảnh Khắc WOW Đầu Tiên 🎉

Mở trình duyệt Chrome, truy cập:

👉 **http://localhost:5173**

Và bạn sẽ thấy... **WEBSITE ĐẦU TIÊN CỦA BẠN!**

Có thể nó chưa hoàn hảo — nhưng đó là TÁC PHẨM CỦA BẠN. Bạn vừa tạo ra một trang web mà trước đó bạn nghĩ mình không bao giờ làm được.

> 📸 **[Hình 6.5]** Website đầu tiên hiển thị trên trình duyệt — **CHỤP HÌNH NÀY!** 🤩

> 💡 **localhost là gì?**
> `localhost` = máy tính của bạn. Khi website chạy ở `localhost:5173`, nghĩa là nó đang chạy ngay trên máy bạn, chỉ mình bạn thấy. Sau này chúng ta sẽ "deploy" để ai cũng xem được (Chương 10).

---

## 6.4. Hiểu Cấu Trúc Dự Án (Chỉ Cần Hiểu, Không Cần Nhớ)

Nhìn vào Sidebar bên trái, bạn sẽ thấy nhiều file và folder. Đừng hoảng! Đây là giải thích đơn giản:

```
📁 my-first-website/
├── 📁 node_modules/     ← "Kho nguyên liệu" — ĐỪNG ĐỤNG VÀO
├── 📁 public/            ← Hình ảnh, favicon (logo tab)
├── 📁 src/               ← ⭐ "Bếp nấu ăn" — code chính ở đây
│   ├── 📁 components/    ← Các "mảnh ghép" giao diện
│   │   ├── Hero.tsx      ← Phần hero section
│   │   ├── Navbar.tsx    ← Thanh menu
│   │   └── ...
│   ├── 📁 pages/         ← Các trang
│   ├── App.tsx           ← "Sơ đồ tổng thể" website
│   ├── main.tsx          ← "Công tắc điện" khởi chạy app
│   └── index.css         ← "Hộp sơn" tùy chỉnh màu
├── index.html            ← "Khung nhà" cơ bản
├── package.json          ← "Danh sách nguyên liệu"
├── tailwind.config.ts    ← Cấu hình màu sắc, font chữ
└── vite.config.ts        ← Cấu hình build tool
```

> 💡 **Quy tắc vàng:** Bạn KHÔNG cần mở, đọc hay sửa bất kỳ file nào. AI sẽ làm hết. Bạn chỉ cần nói chuyện qua Chat Panel.

---

## 6.5. Artifacts — Cách AI "Báo Cáo" Công Việc

Mỗi khi AI làm việc, nó tạo ra các **artifacts** (sản phẩm phụ). Hãy làm quen vì bạn sẽ gặp chúng liên tục:

### 📋 Task List
Danh sách việc cần làm, AI tự track progress:
```
- [x] Tạo dự án React mới
- [x] Cài đặt Tailwind CSS
- [/] Tạo Hero component
- [ ] Tạo About component
- [ ] Responsive design
```
(`[x]` = xong, `[/]` = đang làm, `[ ]` = chưa làm)

### 📝 Implementation Plan
Kế hoạch chi tiết trước khi code. **Hãy đọc qua trước khi approve!**

### 📊 Walkthrough
Tóm tắt sau khi hoàn thành: thay đổi gì, file nào, kết quả ra sao.

### 📸 Screenshots & Recordings
Hình chụp và video quay lại quá trình làm việc.

---

> **📦 TÓM TẮT CHƯƠNG 6**
>
> - Bắt đầu bằng **brainstorm** với AI về cấu trúc website
> - Prompt đầu tiên nên **chi tiết**: công nghệ, theme, cấu trúc, thông tin cá nhân
> - AI tự **tạo dự án → cài thư viện → code → chạy**
> - Kết quả xem tại **localhost:5173**
> - File Code nằm trong folder `src/` — nhưng **bạn không cần đụng vào**
> - Artifacts giúp bạn theo dõi AI đang làm gì

---

> **✏️ BÀI TẬP CHƯƠNG 6**
>
> 1. Mở folder dự án trong Antigravity
> 2. Gửi prompt khởi tạo (dùng mẫu ở mục 6.2, thay thông tin của bạn)
> 3. Approve kế hoạch của AI
> 4. Mở browser tại `localhost:5173` và **chụp ảnh kết quả đầu tiên!** 📸
> 5. (Bonus) Thử gõ thêm: "Em đổi màu nền thành xanh dương nhạt"

---
---

# Chương 7: Thiết Kế Giao Diện — Đẹp Từ Prompt

> *"Một website đẹp không cần designer — chỉ cần prompt tốt."*

---

## 7.1. Header & Navigation — "Bảng Hiệu" Của Website

### Prompt:
> *"Em tạo thanh navigation bar (navbar) cố định phía trên trang. Bên trái là logo text '@tencuaban'. Bên phải là menu: Giới thiệu, Blog, Liên hệ. Khi scroll xuống, navbar có hiệu ứng backdrop blur (nền mờ). Trên mobile, menu collapse thành hamburger icon."*

### Kết quả:
Bạn sẽ có một thanh menu chuyên nghiệp, cố định luôn hiện ở trên cùng bất kể scroll xuống đâu.

> 📸 **[Hình 7.1]** Navbar trên desktop — logo trái, menu phải
> 📸 **[Hình 7.2]** Navbar trên mobile — hamburger menu

### Tinh chỉnh:
Nếu chưa ưng, bạn có thể nói:
- *"Đổi font logo thành đậm hơn"*
- *"Thêm hiệu ứng underline khi hover vào menu"*
- *"Đổi background navbar thành trong suốt khi ở trên cùng"*

---

## 7.2. Hero Section — Ấn Tượng Đầu Tiên

Hero section là phần đầu tiên mọi người nhìn thấy — nó phải **WOW**.

### Prompt nâng cao:
> *"Em chỉnh hero section: thêm gradient nhẹ từ trên xuống dưới (từ nền chính xuống màu phụ nhạt), avatar có ring border mỏng, tên hiện với animation fade-up mượt, subtitle delay 0.2s, bio delay 0.4s, buttons delay 0.6s. Font tiêu đề cỡ 7xl trên desktop, 5xl trên mobile."*

### Kết quả mong đợi:
Khi tải trang, các thành phần sẽ lần lượt xuất hiện từ trên xuống dưới với animation mượt mà — tạo cảm giác chuyên nghiệp như website Apple.

> 📸 **[Hình 7.3]** Hero section hoàn chỉnh với animation

---

## 7.3. About Section — Kể Câu Chuyện Của Bạn

### Prompt:
> *"Em thêm section 'Giới thiệu' (About) bên dưới hero. Layout: tiêu đề 'Về Tôi' ở trên, bên dưới chia 2 cột. Cột trái: đoạn văn giới thiệu 4-5 dòng. Cột phải: danh sách kỹ năng/sở thích dạng thẻ tag bo tròn. Khi scroll xuống, section fade-in. Trên mobile stack thành 1 cột."*

### Nội dung mẫu:
Bạn cần chuẩn bị sẵn thông tin:
- **Đoạn giới thiệu:** 3-5 câu về bạn, công việc, đam mê
- **Kỹ năng/Sở thích:** "AI", "Marketing", "Photography", "Coffee Lover"...

> 💡 **Mẹo:** Nếu chưa biết viết gì, nhờ AI:
> *"Em viết cho anh đoạn giới thiệu bản thân phù hợp cho portfolio, anh là [nghề nghiệp], đam mê [sở thích], phong cách chuyên nghiệp nhưng thân thiện."*

> 📸 **[Hình 7.4]** About section — 2 cột desktop
> 📸 **[Hình 7.5]** About section — 1 cột mobile

---

## 7.4. Projects / Portfolio — Khoe Thành Quả

### Prompt:
> *"Em tạo section 'Dự Án' hiển thị các project dạng grid 3 cột. Mỗi project là một card bo góc, có: hình thumbnail vj bên trên (16:9), tiêu đề đậm, mô tả 2 dòng, thẻ tag công nghệ. Khi hover: card nhô lên nhẹ (translateY -4px) và có shadow. Dùng ít nhất 6 projects mẫu. Trên tablet: 2 cột. Mobile: 1 cột."*

### Thêm nội dung project:
Sau khi có layout, thêm nội dung thật:
> *"Em đổi nội dung 6 projects sang: [liệt kê tên dự án, mô tả ngắn, tags cho mỗi cái]"*

Hoặc nếu bạn chưa có project:
> *"Em tạo 6 projects mẫu cho một portfolio của digital creator, có hình placeholder đẹp"*

> 📸 **[Hình 7.6]** Grid projects — hover effect

---

## 7.5. Contact & Footer — Kết Thúc Trọn Vẹn

### Prompt cho Contact:
> *"Em thêm section 'Liên Hệ' cuối trang, có: tiêu đề 'Kết Nối Với Tôi', mô tả ngắn 'Bạn có ý tưởng? Hãy liên hệ!', form có 3 field (Họ tên, Email, Nội dung tin nhắn), nút Gửi màu đen bo tròn. Bên dưới form là các icon social media (Facebook, LinkedIn, GitHub, Instagram)."*

### Prompt cho Footer:
> *"Em tạo footer đơn giản: dòng copyright '© 2026 [Tên bạn]. All rights reserved.', căn giữa, font nhỏ, màu xám nhạt."*

> 📸 **[Hình 7.7]** Contact form + Social icons
> 📸 **[Hình 7.8]** Footer đơn giản, sạch sẽ

---

## 7.6. Responsive Design — Đẹp Trên Mọi Thiết Bị

Một website hiện đại **bắt buộc** phải hiển thị đẹp trên điện thoại. May mắn là AI thường tự xử lý responsive, nhưng đôi khi cần tinh chỉnh.

### Kiểm tra responsive:
1. Mở website trên Chrome
2. Bấm **F12** (Developer Tools)
3. Bấm icon **📱** (Toggle device toolbar) ở góc trên
4. Chọn kích thước điện thoại (iPhone 14, Samsung Galaxy...)

### Nếu layout bị vỡ trên mobile:
> *"Em ơi, trên mobile phần grid projects đang hiện 3 cột bị quá nhỏ. Em chỉnh 2 cột trên tablet (md breakpoint) và 1 cột trên mobile (sm breakpoint) nhé."*

### Prompt kiểm tra tổng thể:
> *"Em review lại toàn bộ responsive design cho website. Kiểm tra trên 3 kích thước: mobile (375px), tablet (768px), desktop (1280px). Fix tất cả vấn đề layout nếu có."*

> 📸 **[Hình 7.9]** So sánh desktop vs. mobile

---

> **📦 TÓM TẮT CHƯƠNG 7**
>
> - Xây dựng website từng phần: **Navbar → Hero → About → Projects → Contact → Footer**
> - Mỗi phần = **1 prompt chi tiết**
> - Luôn kiểm tra **responsive** trên mobile (F12 → device toggle)
> - AI có thể tự xử lý responsive, nhưng đôi khi cần **tinh chỉnh**
> - Tinh chỉnh = gửi prompt bổ sung mô tả cụ thể điều cần sửa

---

> **✏️ BÀI TẬP CHƯƠNG 7**
>
> 1. Tạo đầy đủ các section cho website cá nhân: Navbar, Hero, About, Projects, Contact, Footer
> 2. Kiểm tra responsive bằng DevTools (F12)
> 3. Chọn 2 section bạn thích nhất và tinh chỉnh thêm 2-3 lần
> 4. Thử thay đổi color scheme: *"Em đổi toàn bộ sang dark theme"*
> 5. **Chụp ảnh trước/sau** mỗi lần tinh chỉnh (đây sẽ là kỷ niệm đẹp!)

---
---

# Chương 8: Thêm Tính Năng — Từ Đơn Giản Đến Phức Tạp

> *"Một website tĩnh thì ai cũng tạo được. Thêm tính năng mới là lúc sức mạnh Vibe Coding thể hiện."*

---

## 8.1. Blog — Chia Sẻ Kiến Thức

### Tạo hệ thống Blog:
> *"Em tạo trang Blog riêng (/blog). Trang chính hiển thị danh sách bài viết dạng card gồm: thumbnail, tiêu đề, mô tả ngắn, ngày đăng, tag category. Tạo sẵn 5 bài mẫu. Có thanh filter theo category."*

### Thêm trang chi tiết bài viết:
> *"Em tạo trang chi tiết bài viết (/blog/:id). Hiển thị full nội dung bài viết với typography đẹp, heading, paragraph, image, code block. Có nút 'Quay lại' ở trên."*

### Thêm menu Blog vào Navbar:
> *"Em thêm mục 'Blog' vào navbar, link tới /blog"*

> 📸 **[Hình 8.1]** Trang Blog — danh sách bài viết chuyên nghiệp

---

## 8.2. Trang Sản Phẩm / Thư Viện

Nếu bạn có sản phẩm, ebooks, hoặc công cụ muốn chia sẻ:

### Prompt:
> *"Em tạo trang Thư Viện (/thu-vien). Hiển thị sản phẩm dạng grid 3 cột. Mỗi sản phẩm có: category tag (Tài liệu / Công cụ), badge 'MIỄN PHÍ' hoặc giá, tiêu đề đậm, mô tả, danh sách đặc điểm (bullet points), nút hành động (Tải miễn phí / Mua ngay). Có thanh search và filter theo category."*

Đây chính xác là trang Thư Viện trên VyThienHung.blog:

> 📸 **[Hình 8.2]** Trang Thư Viện với products, filter, search — từ dự án thực tế

---

## 8.3. Trang Admin — Quản Lý Nội Dung

Đây là tính năng nâng cao, nhưng với Vibe Coding thì chỉ cần 1 prompt:

### Prompt:
> *"Em tạo trang Admin (/admin) với các tính năng:
> 1. Trang đăng nhập: form username + password, dark theme, glassmorphism
> 2. Sau khi đăng nhập: dashboard với tabs để quản lý Hero, About, Blog, Products
> 3. Mỗi tab: form chỉnh sửa thông tin + nút Lưu
> 4. Upload hình ảnh cho sản phẩm
> 5. Nút Save chung: khi thay đổi gì thì buffer lại, nhấn Save mới lưu
> 6. Đăng nhập mặc định: admin / admin123"*

AI sẽ tạo ra hệ thống admin hoàn chỉnh, bao gồm:
- Trang đăng nhập bảo mật
- CRUD (Create, Read, Update, Delete) cho nội dung
- Upload hình ảnh
- Buffer & Save thay đổi

> 📸 **[Hình 8.3]** Trang đăng nhập Admin — dark theme, glassmorphism
> 📸 **[Hình 8.4]** Dashboard admin — quản lý nội dung

---

## 8.4. Kết Nối Database — Lưu Trữ Dữ Liệu

### Database là gì?
Hãy nghĩ database (cơ sở dữ liệu) như một **tủ hồ sơ thông minh**:
- Bạn cất giấy tờ vào → dữ liệu được lưu
- Bạn tìm hồ sơ → lấy dữ liệu ra
- Bạn sửa thông tin → cập nhật dữ liệu
- Ngay cả khi tắt máy → dữ liệu vẫn còn

### Tại sao cần database?
Không có database thì:
- Mỗi lần refresh trang → mất hết thay đổi
- Blog posts chỉ là dữ liệu "cứng" trong code
- Admin panel thay đổi → restart server là mất

### Prompt kết nối database:
> *"Em thiết lập backend server với Express.js, kết nối MySQL database. Tạo các API endpoints cho CRUD operations: GET, POST, PUT, DELETE cho blog posts và products. Tạo file server.js, cấu hình CORS, và file defaultData.json chứa dữ liệu mặc định để seed database khi khởi tạo."*

AI sẽ tạo cho bạn:
- `server.js` — Máy chủ xử lý yêu cầu
- `db.js` — Kết nối database
- `defaultData.json` — Dữ liệu mặc định
- API endpoints — "Cửa sổ" để website nói chuyện với database

> 💡 **Bạn không cần hiểu code ở đây.** Chỉ cần biết: AI tạo ra "bộ não" cho website, giúp lưu trữ dữ liệu.

> 📸 **[Hình 8.5]** Cấu trúc file server-side (đơn giản)

---

> **📦 TÓM TẮT CHƯƠNG 8**
>
> - Thêm **Blog**: trang danh sách + chi tiết bài viết
> - Thêm **Thư Viện**: sản phẩm/ebooks với filter & search
> - Thêm **Admin Panel**: quản lý nội dung website
> - Thêm **Database**: lưu trữ dữ liệu lâu dài
> - Mỗi tính năng = **1 prompt** (có thể cần tinh chỉnh 2-3 lần)

---

> **✏️ BÀI TẬP CHƯƠNG 8**
>
> Chọn **1 tính năng** phù hợp với website của bạn và thêm vào:
> - Nếu website portfolio → thêm Blog
> - Nếu website bán hàng → thêm trang Sản phẩm
> - Nếu cả hai → thêm Admin Panel để quản lý nội dung
> - (Nâng cao) Thử kết nối database

---
---

# Chương 9: Xử Lý Lỗi — Bình Tĩnh & Tin AI

> *"Bug (lỗi) là bạn, không phải thù. Mỗi bug bạn sửa được = một bài học mới."*

---

## 9.1. Lỗi Là Bình Thường — Đừng Hoảng!

Trước tiên, hãy nhớ điều này:

> **🔥 Ngay cả lập trình viên có 20 năm kinh nghiệm cũng gặp lỗi MỖI NGÀY.**

Lỗi không có nghĩa bạn "dở" — nó có nghĩa bạn đang **xây dựng thứ gì đó thật**. Lỗi chỉ xảy ra khi bạn **hành động**, và hành động luôn tốt hơn đứng yên.

Trong hành trình Vibe Coding, bạn SẼ gặp lỗi. Nhưng tin vui: **AI sẽ giúp bạn sửa**.

---

## 9.2. Các Loại Lỗi Thường Gặp

### 🔴 Lỗi 1: "npm ERR!" hoặc "Module not found"
**Nguyên nhân:** Thiếu package (thư viện) hoặc đường dẫn file sai
**Cách xử lý:**
> *"Em ơi, anh gặp lỗi 'Module not found: @/components/Hero'. Em kiểm tra và sửa giúp anh."*

### 🔴 Lỗi 2: Trang trắng / không hiển thị gì
**Nguyên nhân:** Lỗi compile hoặc import sai
**Cách xử lý:**
> *"Em ơi, trang web hiện trắng không có gì. Em kiểm tra Console (F12) và sửa giúp anh. Lỗi hiện là: [paste lỗi từ console]"*

### 🔴 Lỗi 3: Layout vỡ trên mobile
**Nguyên nhân:** Responsive CSS chưa đúng
**Cách xử lý:**
> *"Em ơi, trên mobile phần [tên section] bị tràn ra ngoài màn hình / chồng lên nhau. Em fix responsive giúp anh."*

### 🔴 Lỗi 4: Server không chạy
**Nguyên nhân:** Port bị chiếm, config sai, hoặc thiếu dependencies
**Cách xử lý:**
> *"Em ơi, khi chạy `npm run dev` bị lỗi: [paste lỗi]. Em xem và sửa giúp anh."*

### 🔴 Lỗi 5: Dữ liệu không lưu / mất khi refresh
**Nguyên nhân:** Chưa kết nối database hoặc API endpoint sai
**Cách xử lý:**
> *"Em ơi, anh thay đổi nội dung ở Admin nhưng sau khi refresh thì mất hết. Em kiểm tra xem data có được lưu vào database không."*

---

## 9.3. "Template" Xử Lý Lỗi — Copy & Paste

Khi gặp bất kỳ lỗi nào, dùng template này:

```
Em ơi, anh gặp lỗi.

🔴 Lỗi: [Paste thông báo lỗi ở đây]

📍 Ở đâu: [Mô tả bạn đang làm gì khi gặp lỗi]
   VD: "Khi anh mở trang /thu-vien trên mobile"

🔄 Trước đó: [Nói bạn đã làm gì gần nhất]
   VD: "Vừa thêm tính năng filter sản phẩm"

Em kiểm tra và sửa giúp anh nhé.
```

**AI sẽ:**
1. Đọc lỗi
2. Tìm nguyên nhân
3. Sửa file code
4. Chạy lại để kiểm tra
5. Báo cáo kết quả

---

## 9.4. Case Study: Lỗi Thực Tế Từ Dự Án VyThienHung.blog

### Case 1: Logo Biến Mất 🖼️
**Tình huống:** Sau khi cập nhật, logo ở Navbar không hiển thị nữa.
**Prompt xử lý:** *"Em ơi, logo trên navbar không hiện. Em kiểm tra đường dẫn file và component Navbar giúp anh."*
**Nguyên nhân:** Đường dẫn import hình sai sau khi restructure folder.
**Bài học:** Khi di chuyển file, đường dẫn import có thể bị thay đổi.

### Case 2: Server Không Khởi Động 🔌
**Tình huống:** Chạy `npm start` nhưng server không phản hồi.
**Prompt xử lý:** *"Em ơi, anh chạy npm start nhưng terminal không hiện gì cả, không có lỗi nhưng cũng không chạy."*
**Nguyên nhân:** Script start trong `package.json` bị configure sai.
**Bài học:** Kiểm tra file `package.json` nếu lệnh start không hoạt động.

### Case 3: Dữ Liệu Mất Khi Deploy 📊
**Tình huống:** Thay đổi ở Admin panel bị mất khi deploy phiên bản mới.
**Prompt xử lý:** *"Em ơi, data anh thay đổi ở admin bị mất mỗi lần deploy. Em kiểm tra flow data persistence."*
**Nguyên nhân:** File `defaultData.json` ghi đè dữ liệu mỗi lần seed database.
**Bài học:** Cần phân biệt giữa "dữ liệu mặc định" và "dữ liệu thực tế".

### Case 4: Apache "Service Unavailable" 🌐
**Tình huống:** Website chạy OK ở local nhưng báo lỗi 503 trên VPS.
**Prompt xử lý:** *"Em ơi, website deploy lên VPS bị lỗi 503 Service Unavailable. Server chạy ở port 45451, Apache proxy ở port 80."*
**Nguyên nhân:** Apache proxy settings chưa đúng, cần enable modules mod_proxy.
**Bài học:** Deploy lên VPS cần cấu hình web server (Apache/Nginx).

---

## 9.5. Git — "Nút Ctrl+Z" Cho Code

### Git là gì?
Nếu Word có Ctrl+Z (Undo), thì lập trình có **Git**. Git giúp bạn:
- **Lưu lại** mỗi phiên bản code (gọi là "commit")
- **Quay lại** bất kỳ phiên bản nào trước đó
- **So sánh** sự khác biệt giữa các phiên bản

### Tại sao cần Git?
Tưởng tượng bạn đang sửa website, AI vô tình xóa mất một section quan trọng. Không có Git → mất trắng. Có Git → dùng 1 lệnh để **quay lại** phiên bản trước đó.

### Git cơ bản (chỉ cần 3 lệnh):

#### Lệnh 1: "Save game"
```bash
git add . && git commit -m "Mô tả thay đổi"
```
Ví dụ:
```bash
git add . && git commit -m "Hoàn thành hero section"
git add . && git commit -m "Thêm trang blog"
git add . && git commit -m "Fix responsive mobile"
```

#### Lệnh 2: "Xem lịch sử"
```bash
git log --oneline -10
```
Hiển thị 10 "save" gần nhất.

#### Lệnh 3: "Quay lại" (khi cần)
```bash
git revert HEAD
```
Quay lại commit trước đó.

### Hoặc nhờ AI:
> *"Em giúp anh khởi tạo git repo cho dự án và commit hiện tại với message 'Initial commit'"*

> *"Em giúp anh revert về phiên bản trước, cái commit trước đó em xóa nhầm section About"*

> 💡 **Quy tắc:** Commit **mỗi khi** có kết quả tốt. Đừng đợi đến cuối ngày!

---

> **📦 TÓM TẮT CHƯƠNG 9**
>
> - **Lỗi là bình thường** — ngay cả developer senior cũng gặp lỗi mỗi ngày
> - 5 loại lỗi thường gặp: npm error, trang trắng, layout vỡ, server fail, data mất
> - Dùng **template xử lý lỗi** để mô tả lỗi cho AI
> - Học từ **case study thực tế** từ dự án VyThienHung.blog
> - **Git = Ctrl+Z cho code** — commit thường xuyên để có đường lùi

---

> **✏️ BÀI TẬP CHƯƠNG 9**
>
> 1. Khởi tạo Git cho dự án: *"Em giúp anh khởi tạo git và commit lần đầu"*
> 2. Thử **cố ý** gây lỗi (VD: yêu cầu AI xóa một file quan trọng), rồi dùng Git revert
> 3. Ghi lại **3 lỗi** bạn đã gặp trong quá trình thực hành, cùng cách xử lý
> 4. Tạo thói quen: mỗi khi hoàn thành 1 tính năng → `git commit`
