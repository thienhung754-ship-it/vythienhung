# PHẦN 2: CHUẨN BỊ CÔNG CỤ

---

# Chương 4: Cài Đặt Antigravity — Từ Zero Đến Ready

> *"Muốn nấu ăn thì trước hết phải có bếp."*

---

## 4.1. Yêu Cầu Hệ Thống

Trước khi bắt đầu, hãy kiểm tra máy tính của bạn đáp ứng các yêu cầu sau:

| Yêu cầu | Chi tiết |
|----------|----------|
| **Hệ điều hành** | Windows 10/11, macOS 12+, hoặc Linux |
| **RAM** | Tối thiểu 4GB (khuyến nghị 8GB) |
| **Dung lượng trống** | Ít nhất 2GB |
| **Kết nối Internet** | Bắt buộc (AI cần mạng để hoạt động) |
| **Trình duyệt** | Chrome hoặc Edge (để xem kết quả) |

> 💡 **Mẹo:** Nếu bạn không chắc cấu hình máy, hãy mở **Settings → System → About** trên Windows để xem thông tin.

---

## 4.2. Tải Và Cài Đặt Antigravity — Hướng Dẫn Từng Bước

### Bước 1: Truy cập trang tải Antigravity

Mở trình duyệt Chrome/Edge và truy cập:

👉 **https://antigravity.dev** (hoặc search Google: "Google Antigravity download")

> 📸 **[Hình 4.1]** Trang chủ Antigravity — Bấm nút Download
> *(Anh Hùng chụp lại trang download và thêm mũi tên đỏ chỉ vào nút Download)*

### Bước 2: Chọn phiên bản phù hợp

Trang download sẽ hiện 3 lựa chọn:
- **Windows** (.exe) — Cho máy Windows
- **macOS** (.dmg) — Cho máy Mac
- **Linux** (.AppImage) — Cho máy Linux

Bấm vào phiên bản phù hợp với máy bạn. File sẽ được tải về thư mục Downloads.

> 📸 **[Hình 4.2]** Chọn đúng phiên bản cho hệ điều hành của bạn

### Bước 3: Cài đặt (Windows)

1. **Mở file** vừa tải (VD: `Antigravity-Setup-x.x.x.exe`)
2. Windows có thể cảnh báo "Unknown publisher" — bấm **"Run anyway"**
3. Chọn **"Install for current user"** hoặc **"Install for all users"**
4. Bấm **Next → Next → Install → Finish**
5. Antigravity sẽ tự mở sau khi cài xong

> 📸 **[Hình 4.3 - 4.6]** Quá trình cài đặt từng bước (4 hình)

> ⚠️ **Lưu ý cho Mac:**
> Kéo icon Antigravity vào thư mục Applications. Lần đầu mở, nếu bị chặn: vào **System Preferences → Security → Open Anyway**

### Bước 4: Đăng nhập tài khoản Google

Lần đầu mở Antigravity, bạn sẽ thấy màn hình đăng nhập:

1. Bấm **"Sign in with Google"**
2. Chọn tài khoản Google của bạn
3. Cho phép các quyền truy cập

Xong! Bạn đã sẵn sàng.

> 📸 **[Hình 4.7]** Màn hình đăng nhập Google

---

## 4.3. Làm Quen Giao Diện Antigravity

Khi mở Antigravity, bạn sẽ thấy giao diện chia thành nhiều phần. Đừng hoảng — mình sẽ giải thích từng phần:

### 📌 Editor View (Giao diện chính)

Đây là nơi bạn sẽ dành phần lớn thời gian:

```
┌─────────────────────────────────────────────────────┐
│  [1] SIDEBAR        │  [2] CODE EDITOR              │
│                     │                               │
│  📁 Explorer        │  Hiển thị code                │
│  (Danh sách file)   │  (Bạn KHÔNG cần sửa ở đây)   │
│                     │                               │
│                     ├───────────────────────────────│
│                     │  [3] TERMINAL                 │
│                     │  (Cửa sổ dòng lệnh)          │
│                     │                               │
├─────────────────────┼───────────────────────────────│
│  [4] CHAT PANEL     │  Nơi bạn nói chuyện với AI    │
│  "Em ơi, tạo cho    │                               │
│   anh một trang..." │                               │
└─────────────────────┴───────────────────────────────┘
```

#### [1] Sidebar — "Kệ Sách"
- Hiển thị tất cả file và folder trong dự án
- Giống như File Explorer trên máy tính
- **Bạn sẽ ít khi cần đụng vào đây** — AI sẽ tự tạo và quản lý file

#### [2] Code Editor — "Bảng Vẽ"
- Hiển thị nội dung code của file đang mở
- AI sẽ viết code ở đây — bạn chỉ cần **xem** (không cần hiểu)
- Có syntax highlighting (tô màu code) để dễ nhìn

#### [3] Terminal — "Hộp Lệnh"
- Nơi AI chạy các lệnh (cài đặt, khởi chạy website...)
- Bạn sẽ thấy text chạy liên tục — đó là bình thường
- Nếu thấy chữ xanh lá = thành công ✅, chữ đỏ = có lỗi ❌

#### [4] Chat Panel — "Phòng Trò Chuyện" ⭐
- **Đây là nơi quan trọng nhất!**
- Bạn gõ yêu cầu ở đây (bằng tiếng Việt hoặc Anh)
- AI sẽ phản hồi, hỏi lại nếu cần, và bắt đầu làm việc

> 📸 **[Hình 4.8]** Giao diện Antigravity với chú thích từng vùng (mũi tên đỏ + số)

### 📌 Manager View — "Trung Tâm Điều Khiến"

Bấm vào icon ở góc trên để chuyển sang Manager View:
- Quản lý nhiều dự án cùng lúc
- Xem tổng quan tất cả agent đang chạy
- **Hiện tại bạn chưa cần dùng** — chỉ cần biết nó ở đó

---

## 4.4. Cài Đặt Node.js — "Nguyên Liệu" Cho Dự Án Web

Để website có thể chạy trên máy bạn, cần cài thêm một công cụ gọi là **Node.js**.

> 💡 **Node.js là gì?** Hãy nghĩ Node.js như "bộ nồi nấu bếp" — nếu Antigravity là đầu bếp, thì Node.js là bộ dụng cụ mà đầu bếp cần để nấu.

### Bước 1: Tải Node.js

Truy cập: 👉 **https://nodejs.org**

Trang web sẽ hiện 2 nút:
- **LTS** (Long Term Support) ← **CHỌN CÁI NÀY** (ổn định, ít lỗi)
- Current (phiên bản mới nhất — không cần)

> 📸 **[Hình 4.9]** Trang download Node.js — Bấm nút LTS

### Bước 2: Cài đặt Node.js

1. Mở file vừa tải (VD: `node-v22.x.x.msi`)
2. Bấm **Next** liên tục (giữ mặc định tất cả)
3. Bấm **Install**
4. Đợi vài phút → Bấm **Finish**

> 📸 **[Hình 4.10 - 4.11]** Quá trình cài đặt Node.js

### Bước 3: Kiểm tra cài đặt

Mở **Terminal** trong Antigravity (hoặc PowerShell trên Windows) và gõ:

```bash
node --version
```

Nếu hiện ra số phiên bản (VD: `v22.12.0`) → ✅ Thành công!

Gõ tiếp:

```bash
npm --version
```

Nếu hiện ra số (VD: `10.9.2`) → ✅ Thành công!

> 📸 **[Hình 4.12]** Terminal hiển thị version Node.js và npm

> ⚠️ **Nếu báo lỗi "not recognized":**
> Đóng Antigravity, mở lại. Nếu vẫn lỗi → khởi động lại máy.

---

## 4.5. Tạo Folder Dự Án Đầu Tiên

Bước cuối cùng trước khi bắt đầu Vibe Coding:

### Bước 1: Tạo folder mới

Trên máy tính, tạo một folder mới ở vị trí dễ nhớ. Ví dụ:

- **Windows:** `D:\Projects\my-first-website`
- **Mac:** `~/Documents/my-first-website`

> 💡 **Mẹo đặt tên folder:**
> - Dùng tiếng Anh, không dấu
> - Dùng dấu gạch ngang thay khoảng trắng
> - VD: `my-portfolio`, `coffee-shop-web`, `travel-blog`

### Bước 2: Mở folder trong Antigravity

1. Trong Antigravity, bấm **File → Open Folder**
2. Chọn folder vừa tạo
3. Bấm **Select Folder**
4. Antigravity sẽ mở folder — sidebar sẽ hiển thị folder trống

> 📸 **[Hình 4.13]** Mở folder trong Antigravity

### Bước 3: Sẵn sàng!

Bạn sẽ thấy:
- Sidebar: tên folder bạn vừa mở
- Editor: trống
- Chat panel: sẵn sàng nhận prompt đầu tiên

**Xin chúc mừng! Bạn đã sẵn sàng cho cuộc hành trình Vibe Coding! 🎉**

---

> **📦 TÓM TẮT CHƯƠNG 4**
>
> - Đã cài đặt **Google Antigravity** (IDE viết code với AI)
> - Đã cài đặt **Node.js** (công cụ chạy website)
> - Đã làm quen giao diện: **Sidebar, Editor, Terminal, Chat Panel**
> - Đã tạo folder dự án đầu tiên và mở trong Antigravity
> - **Chat Panel là nơi quan trọng nhất** — nơi bạn nói chuyện với AI

---

> **✏️ BÀI TẬP CHƯƠNG 4**
>
> 1. Cài đặt Antigravity và Node.js theo hướng dẫn
> 2. Mở Terminal và kiểm tra: `node --version` và `npm --version`
> 3. Tạo folder `my-first-website` và mở trong Antigravity
> 4. Gõ vào Chat Panel: "Xin chào em!" — xem AI phản hồi thế nào 😄

---
---

# Chương 5: Kỹ Nghệ Prompt — Nghệ Thuật Ra Lệnh Cho AI

> *"AI giỏi đến đâu cũng tùy thuộc vào cách bạn ra lệnh."*

---

## 5.1. Prompt Là Gì?

**Prompt** (đọc là "prôm") = **Lời yêu cầu bạn gửi cho AI**.

Nó đơn giản là câu bạn gõ vào Chat Panel của Antigravity. Ví dụ:

> *"Em tạo cho anh một trang web bán cà phê"*

Đó là một prompt. Nhưng đó là một prompt **chưa tốt**. Tại sao? Vì nó quá mơ hồ.

### Prompt Tốt vs. Prompt Dở

| 😐 Prompt Dở | 😍 Prompt Tốt |
|-------------|---------------|
| "Tạo trang web" | "Em tạo cho anh một trang web portfolio cá nhân, dark theme, có header với logo bên trái và menu bên phải" |
| "Làm cho đẹp hơn" | "Đổi nền thành gradient từ tím đậm (#1a0030) sang đen, thêm hiệu ứng glass morphism cho các card" |
| "Thêm nút" | "Thêm nút 'Liên hệ' ở góc phải header, bo tròn, nền trắng, chữ đen, có border 1px" |
| "Sửa lỗi" | "Em ơi, khi anh bấm nút 'Gửi' ở form liên hệ, trang bị reload mà không hiện thông báo. Em kiểm tra và sửa giúp anh" |

**Nguyên tắc vàng:** Càng chi tiết, kết quả càng chính xác.

---

## 5.2. Công Thức P.R.I.C.E — 5 Yếu Tố Của Prompt Hoàn Hảo

![Hình 5.1: Công thức P.R.I.C.E cho prompt hiệu quả](./hinh-anh/chuong-05-price-formula.png)

### **P** — Purpose (Mục đích)
*AI làm gì?*

Bắt đầu bằng hành động rõ ràng:
- "**Tạo** cho anh một..."
- "**Sửa** phần..."
- "**Thêm** tính năng..."
- "**Xóa** phần..."
- "**Đổi** màu..."

### **R** — Role (Vai trò)
*AI đóng vai gì?*

Gán vai trò để AI cho kết quả phù hợp hơn:
- "Em là một web designer chuyên nghiệp..."
- "Em là lập trình viên senior..."
- "Em là chuyên gia UX/UI..."

### **I** — Instructions (Hướng dẫn chi tiết)
*Cụ thể muốn gì?*

Mô tả chi tiết:
- Màu sắc: "nền đen, chữ trắng, accent màu vàng gold"
- Bố cục: "2 cột trên desktop, 1 cột trên mobile"
- Kích thước: "font 16px, padding 20px"
- Hiệu ứng: "fade in khi scroll, hover thì phóng to nhẹ"

### **C** — Context (Ngữ cảnh)
*Bối cảnh dự án?*

Cung cấp thông tin nền:
- "Đây là website bán cà phê, đối tượng là giới trẻ sành điệu"
- "Trang này cần khớp với style của các trang khác trong website"
- "Anh đang dùng React + Tailwind CSS"

### **E** — Examples (Ví dụ tham khảo)
*Có mẫu nào không?*

Nếu có website mẫu hoặc hình ảnh tham khảo:
- "Tham khảo style giống Apple.com"
- "Layout giống trang chủ của Notion"
- "Em xem hình này và tạo tương tự: [paste link hoặc mô tả hình]"

---

## 5.3. Áp Dụng P.R.I.C.E — Ví Dụ Thực Tế

### ❌ Prompt KHÔNG dùng P.R.I.C.E:
> *"Tạo trang web portfolio"*

### ✅ Prompt dùng P.R.I.C.E:

> **[P]** Em **tạo** cho anh một trang web portfolio cá nhân.
>
> **[R]** Em hãy thiết kế như một web designer chuyên nghiệp, ưu tiên sự tối giản và sang trọng.
>
> **[I]** Yêu cầu cụ thể:
> - Dark theme, nền gần đen (#0a0a0a)
> - Font chữ Inter hoặc Outfit
> - Hero section: avatar tròn ở giữa, tên lớn bên dưới, subtitle nhỏ hơn, 2 nút CTA
> - Section About: 2 cột (ảnh trái, text phải)
> - Section Projects: grid 3 cột, mỗi project là card có hover effect
> - Footer: social media icons, copyright
> - Responsive: hiển thị tốt trên mobile
>
> **[C]** Đây là trang cá nhân cho một CEO công ty tech, phong cách chuyên nghiệp, hiện đại.
>
> **[E]** Tham khảo phong cách thiết kế của Apple.com — clean, minimal, nhiều khoảng trắng.

**Thấy sự khác biệt chưa?** Prompt đầu cho kết quả "đại khái". Prompt sau cho kết quả **chính xác** với ý bạn.

---

## 5.4. Prompt Bằng Tiếng Việt — Tips & Tricks

Một trong những điểm mạnh của Antigravity là **hiểu tiếng Việt rất tốt**. Bạn hoàn toàn có thể viết prompt bằng tiếng Việt:

### ✅ Hoàn toàn tiếng Việt:
> *"Em tạo cho anh phần giới thiệu bản thân, có hình đại diện bên trái, thông tin bên phải, nền tối, chữ trắng"*

### ✅ Pha trộn Việt-Anh (khi cần dùng thuật ngữ kỹ thuật):
> *"Em thêm hover effect cho các card trong grid, khi di chuột vào thì card scale lên 1.05 và có box-shadow"*

### Khi nào nên dùng tiếng Anh?

Dùng thuật ngữ tiếng Anh khi nói về:
- Tên CSS: `padding`, `margin`, `border-radius`, `gradient`
- Tên hiệu ứng: `hover`, `fade-in`, `slide-up`
- Tên layout: `grid`, `flexbox`, `responsive`
- Tên component: `header`, `footer`, `sidebar`, `hero section`

> 💡 **Mẹo:** Bạn không cần nhớ các thuật ngữ này. AI sẽ hiểu nếu bạn mô tả bình thường. Ví dụ:
> - Thay vì `border-radius: 50%` → nói **"bo tròn"**
> - Thay vì `box-shadow` → nói **"có bóng đổ"**
> - Thay vì `gradient` → nói **"chuyển màu từ A sang B"**

---

## 5.5. 10 Prompt Mẫu — Dùng Ngay!

### 🟢 Prompt 1: Khởi tạo dự án
> *"Em tạo cho anh một dự án website portfolio cá nhân sử dụng React + Vite + TypeScript. Thiết kế tối giản, dark theme, responsive. Bắt đầu với hero section có avatar và tên."*

### 🟢 Prompt 2: Tạo Navigation Bar
> *"Em thêm thanh navigation bar phía trên trang. Bên trái là logo '@tên', bên phải là các menu: Giới thiệu, Blog, Cộng đồng, Thư viện. Trên mobile thì hiện hamburger menu."*

### 🟢 Prompt 3: Thêm Section
> *"Em thêm section 'Về tôi' bên dưới hero. Layout 2 cột: bên trái là đoạn giới thiệu 3-4 dòng, bên phải là danh sách kỹ năng dạng tag. Trên mobile thì stack xuống 1 cột."*

### 🟢 Prompt 4: Đổi màu sắc
> *"Em đổi color scheme toàn bộ website. Nền trắng tinh (#fafafa), chữ đen đậm (#1a1a1a), accent color là xanh dương nhạt (#3b82f6). Buttons dùng accent color."*

### 🟢 Prompt 5: Thêm animation
> *"Em thêm hiệu ứng fade-in cho mỗi section khi user scroll xuống. Dùng framer-motion, duration 0.8s, ease-out."*

### 🟢 Prompt 6: Sửa layout mobile
> *"Em ơi, trên điện thoại phần grid sản phẩm đang hiện 3 cột, bị quá nhỏ. Em chỉnh lại 2 cột trên tablet và 1 cột trên mobile nhé."*

### 🟢 Prompt 7: Thêm form liên hệ
> *"Em thêm form liên hệ ở cuối trang, có các field: Họ tên, Email, Tin nhắn. Nút Gửi màu đen, bo tròn. Khi gửi thành công thì hiện thông báo 'Đã gửi thành công!'"*

### 🟢 Prompt 8: Tạo trang Blog
> *"Em tạo trang Blog riêng (/blog), hiển thị danh sách bài viết dạng card. Mỗi card có: thumbnail, tiêu đề, mô tả ngắn, ngày đăng, tag category."*

### 🟢 Prompt 9: Sửa lỗi
> *"Em ơi, anh gặp lỗi khi chạy `npm run dev`: 'Module not found: @/components/Hero'. Em kiểm tra và sửa giúp anh."*

### 🟢 Prompt 10: Deploy website
> *"Em hướng dẫn anh cách deploy website này lên Vercel miễn phí. Hướng dẫn từng bước nhé."*

---

## 5.6. 5 Sai Lầm Chết Người Khi Viết Prompt

### ❌ Sai lầm 1: Quá mơ hồ
- Dở: *"Làm đẹp hơn"*
- Tốt: *"Đổi font thành Inter, tăng khoảng cách dòng lên 1.6, thêm gradient nhẹ cho background"*

### ❌ Sai lầm 2: Yêu cầu quá nhiều cùng lúc
- Dở: *"Tạo cả website hoàn chỉnh với 10 trang, database, admin panel, SEO, dark mode, multi-language"*
- Tốt: Chia thành nhiều prompt nhỏ, mỗi prompt 1 tính năng

### ❌ Sai lầm 3: Không cung cấp ngữ cảnh
- Dở: *"Thêm nút"* (nút gì? ở đâu? màu gì?)
- Tốt: *"Thêm nút 'Xem thêm' bên dưới section Blog, màu đen, chữ trắng, bo tròn"*

### ❌ Sai lầm 4: Không kiểm tra kết quả từng bước
- Dở: Gửi 5 prompt liên tiếp mà không xem kết quả
- Tốt: Gửi 1 prompt → Kiểm tra → Hài lòng → Gửi prompt tiếp

### ❌ Sai lầm 5: Nản khi AI làm sai
- AI không hoàn hảo — đôi khi cần 2-3 lần tinh chỉnh
- Nếu sai: mô tả lại rõ hơn, hoặc nói "Em sửa lại, cái vừa rồi không đúng ý anh"
- **Kiên nhẫn là chìa khóa!**

---

## 5.7. Mẹo Nâng Cao: "Nói Chuyện" Với AI Hiệu Quả

### 🎯 Mẹo 1: Xưng hô thân thiện
AI phản hồi tốt hơn khi bạn xưng hô tự nhiên:
> *"Em ơi..."*, *"Em giúp anh..."*, *"Em tạo cho anh..."*

### 🎯 Mẹo 2: Khen khi kết quả tốt
Nó không thay đổi AI, nhưng giúp bạn tạo thói quen giao tiếp tích cực:
> *"Đẹp lắm em! Bây giờ thêm cho anh phần footer nhé."*

### 🎯 Mẹo 3: Mô tả bằng hình ảnh so sánh
> *"Làm giống style Apple.com — nhiều khoảng trắng, font to, ít chữ"*
> *"Card giống kiểu Pinterest — masonry layout, hình chiếm phần lớn"*

### 🎯 Mẹo 4: Đọc Artifacts trước khi Approve
Khi AI tạo Implementation Plan, hãy đọc qua. Nếu thấy điều gì không đúng ý → nói AI sửa trước khi code.

### 🎯 Mẹo 5: Screenshot lỗi
Khi gặp lỗi trên trình duyệt, hãy chụp màn hình và mô tả:
> *"Em xem, trang web hiện như thế này [mô tả lỗi]. Em sửa giúp anh."*

---

> **📦 TÓM TẮT CHƯƠNG 5**
>
> - **Prompt** = lời yêu cầu gửi cho AI
> - Công thức **P.R.I.C.E**: Purpose, Role, Instructions, Context, Examples
> - Càng **chi tiết** → càng **chính xác**
> - **Tiếng Việt** hoàn toàn OK, pha thêm thuật ngữ Anh khi cần
> - Tránh 5 sai lầm: mơ hồ, quá nhiều, thiếu context, không check, nản
> - 10 prompt mẫu sẵn sàng dùng ngay

---

> **✏️ BÀI TẬP CHƯƠNG 5**
>
> Lấy ý tưởng website bạn đã chọn ở Chương 3, viết **3 prompt** theo công thức P.R.I.C.E:
>
> 1. Prompt **khởi tạo dự án** (tạo website với theme và style mong muốn)
> 2. Prompt **tạo hero section** (phần đầu trang với tiêu đề và hình ảnh)
> 3. Prompt **thêm section giới thiệu** (phần mô tả về bạn/sản phẩm)
>
> Giữ 3 prompt này — chúng ta sẽ dùng ngay ở Chương 6!
