// ============================================================
// Site Data Layer — TypeScript interfaces + API + localStorage cache
// ============================================================

// --- Interfaces ---

export interface HeroData {
  avatar: string;       // base64 or URL
  name: string;
  title: string;
  bio: string;
}

export interface AboutData {
  sectionLabel: string;
  heading: string;
  paragraphsVisible: string[];
  paragraphsCollapsed: string[];
  image: string;        // base64 or import path
}

export interface EcosystemProduct {
  icon: string;         // lucide icon name
  title: string;
  subtitle: string;
  description: string;
}

export interface BlogPost {
  category: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
}

export interface PressItem {
  source: string;
  title: string;
  description: string;
  url: string;
  image: string;
  color: string;
  iconColor: string;
  iconName: string;
}

export interface HobbiesSection {
  title: string;
  description: string;
}

export interface HobbiesData {
  image: string;
  sections: HobbiesSection[];
}

export interface ContactData {
  zaloLink: string;
}

export interface EbookItem {
  title: string;
  description: string;
  pages: string;
  format: string;
  file: string;         // server URL or link
  fileName?: string;    // original PDF filename for display
}

export interface ToolItem {
  name: string;
  category: string;
  description: string;
  features: string[];
  duration: string;
  price: number;
  originalPrice: number;
  badge: string;          // "BEST SELLER" | "ADD-ON" | "HOT" | "PRO" | ""
  affiliateLink: string;
  image?: string;
}

export interface CommunityItem {
  name: string;
  description: string;
  members: string;
  color: string;
  link: string;
  linkText: string;
  image: string;
  internal: boolean;
}

export interface SeoSettings {
  siteTitle: string;
  metaDescription: string;
  ogImage: string;
}

export interface FooterData {
  companyName: string;
  copyrightName: string;
}

export interface NetworkingPhoto {
  image: string;        // URL or base64
  caption: string;
}

export interface VibeCodingGroup {
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  link: string;
  linkText: string;
}

export interface ZaloLinks {
  contactZalo: string;       // Zalo cá nhân
  ebookGroupZalo: string;    // Zalo group cho ebook promo popup
}

export interface FloatingActionsData {
  contactZaloLink: string;  // Zalo link liên hệ trực tiếp
  communityLink: string;
  communityLabel: string;
}

export interface WorkshopAgendaItem {
  time: string;
  title: string;
}

export interface WorkshopSpeaker {
  name: string;
  title: string;
  avatar: string;
}

export interface WorkshopEvent {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  date: string;
  time: string;
  location: string;
  image: string;
  category: string;       // "Workshop" | "Khoá học" | "Talkshow"
  status: string;         // "upcoming" | "ongoing" | "completed"
  highlights: string[];
  agenda: WorkshopAgendaItem[];
  speaker: WorkshopSpeaker;
  price: string;          // display price e.g. "Miễn phí" or "594.000đ"
  priceValue?: number;    // numeric price for formatting
  originalPrice?: number; // original price for strikethrough
  slogan?: string;        // e.g. "Sản phẩm 5* giá 1*"
  bonuses?: string[];     // list of bonus items
  ctaText: string;
  ctaLink: string;
  reviewCount?: number;  // e.g. 328
}

export interface SiteData {
  hero: HeroData;
  about: AboutData;
  ecosystem: EcosystemProduct[];
  blog: BlogPost[];
  press: PressItem[];
  hobbies: HobbiesData;
  contact: ContactData;
  ebooks: EbookItem[];
  tools: ToolItem[];
  communities: CommunityItem[];
  seo: SeoSettings;
  footer: FooterData;
  networkingPhotos: NetworkingPhoto[];
  vibeCodingGroups: VibeCodingGroup[];
  zaloLinks: ZaloLinks;
  floatingActions: FloatingActionsData;
  workshops: WorkshopEvent[];
  lastUpdated: string;
}

// --- Default Data (copied from existing hardcoded components) ---

export const DEFAULT_SITE_DATA: SiteData = {
  hero: {
    avatar: "",  // will fallback to imported asset
    name: "Vy Thiên Hùng",
    title: "Founder, Director, CEO @ MERCY TECH GLOBAL",
    bio: "Nhà điều hành Mercy Tech Global – nơi công nghệ lõi giải quyết các bài toán thực chiến. Tập trung phát triển hệ sinh thái SaaS và phần cứng thông minh với cam kết tuyệt đối về bảo mật dữ liệu, mang đến sự tăng trưởng bền vững cho doanh nghiệp.",
  },
  about: {
    sectionLabel: "Lời ngỏ",
    heading: "Lời ngỏ từ Vy Thiên Hùng",
    paragraphsVisible: [
      'Chúng ta đang đứng giữa một cuộc cách mạng chưa từng có — khi Trí tuệ Nhân tạo không còn là viễn tưởng, mà đã trở thành đồng nghiệp, trở thành đối thủ, và đôi khi — trở thành người thay thế.',
      'AI viết code nhanh hơn lập trình viên. AI thiết kế logo đẹp hơn designer. AI phân tích dữ liệu chính xác hơn cả một đội ngũ analyst. Vậy câu hỏi đặt ra không phải là "AI có thể làm gì?" — mà là "Bạn sẽ đứng ở đâu trong kỷ nguyên này?"',
    ],
    paragraphsCollapsed: [
      'Tôi tin rằng: con người không thua AI ở trí thông minh — mà thua ở tốc độ thích nghi. Người chiến thắng không phải người giỏi nhất, mà là người dám học lại từ đầu, dám phá vỡ lối mòn, và dám biến công nghệ thành vũ khí của chính mình.',
      'Đó là lý do tôi xây dựng MERCY TECH GLOBAL — một hệ sinh thái nơi công nghệ phục vụ con người, nơi AI không thay thế bạn mà khuếch đại bạn. Từ nghiên cứu AI tiên phong tại Mercy Labs, đến đào tạo thực chiến giúp doanh nghiệp và cá nhân làm chủ trí tuệ nhân tạo — mọi thứ tôi làm đều hướng về một sứ mệnh duy nhất:',
      'Giúp bạn không chỉ tồn tại, mà tỏa sáng trong kỷ nguyên AI.',
      'Phiên bản mạnh mẽ nhất của bạn không nằm ở thuật toán — nó nằm ở tư duy dám thay đổi. Và hành trình đó bắt đầu ngay bây giờ.',
    ],
    image: "",  // will fallback to imported asset
  },
  ecosystem: [
    {
      icon: "Globe",
      title: "MERCY TECH",
      subtitle: "GIẢI PHÁP CÔNG NGHỆ & KIẾN TRÚC HỆ THỐNG",
      description: "Đơn vị chuyên cung cấp dịch vụ Outsource giải pháp công nghệ B2B. Không chỉ tạo ra những Platform mạnh mẽ để tung ra thị trường, Mercy Tech còn đóng vai trò phát triển các ứng dụng bổ trợ, tối ưu hóa luồng dữ liệu và hạ tầng kỹ thuật cho Mercy Shop. Mọi dòng code đều tuân thủ nguyên tắc tối thượng: Minh bạch và vị nhân sinh.",
    },
    {
      icon: "Users",
      title: "MERCY SHOP",
      subtitle: "TRẠM PHÂN PHỐI ĐẶC QUYỀN",
      description: 'Kênh thương mại điện tử và bán lẻ cao cấp. Mercy Shop là nơi phân phối trực tiếp các "vũ khí" phần cứng hữu hình của hệ sinh thái đến tay người dùng VIP: Từ các dòng Thẻ định danh NFC của Persona, đến Kính thông minh và thiết bị IoT bảo mật.',
    },
    {
      icon: "Layers",
      title: "MERCY PLATFORM",
      subtitle: "NỀN TẢNG ỨNG DỤNG & DỊCH VỤ",
      description: '"Trạm cung cấp" các nền tảng phần mềm lõi của hệ sinh thái. Nơi tập trung phát triển và phát hành các ứng dụng giải quyết triệt để những nhu cầu thiết yếu của cộng đồng, giúp mọi người dễ dàng tiếp cận với sự tiện lợi của công nghệ.',
    },
    {
      icon: "FlaskConical",
      title: "MERCY LABS",
      subtitle: "NGHIÊN CỨU & ĐÀO TẠO AI",
      description: "Trung tâm nghiên cứu chuyên sâu và đào tạo về Trí tuệ Nhân tạo, quy tụ đội ngũ chuyên gia hàng đầu dưới sự dẫn dắt trực tiếp của Vy Thiên Hùng. Mercy Labs tập trung vào R&D các mô hình AI tiên phong, đồng thời tổ chức các chương trình đào tạo thực chiến — giúp doanh nghiệp và cá nhân nắm bắt, ứng dụng AI một cách hiệu quả nhất vào vận hành và sản phẩm thực tế.",
    },
  ],
  blog: [
    {
      category: "Công nghệ & AI",
      title: "Physical AI: Khi trí tuệ nhân tạo bước ra thế giới thực",
      excerpt: "Khám phá xu hướng AI Vật lý và cách nó thay đổi tương tác giữa con người với máy móc.",
      content: "Physical AI (AI Vật lý) đang mở ra một kỷ nguyên mới, nơi trí tuệ nhân tạo không chỉ tồn tại trong thế giới ảo mà còn tương tác trực tiếp với môi trường vật lý. Từ robot tự hành, drone giao hàng đến các thiết bị wearable thông minh — tất cả đều được điều khiển bởi AI có khả năng cảm nhận, phản ứng và học hỏi từ thế giới thực.\n\nTại MERCY TECH GLOBAL, chúng tôi tin rằng Physical AI sẽ là bước tiến tiếp theo trong cuộc cách mạng công nghệ. Việc tích hợp AI vào phần cứng không chỉ đơn thuần là gắn chip xử lý mạnh hơn — mà là tạo ra những hệ thống có khả năng tự thích ứng, tự tối ưu và tự học hỏi trong môi trường thực tế.\n\nChúng tôi đang nghiên cứu và phát triển các giải pháp AI Wearables, nơi công nghệ trở thành một phần tự nhiên của cuộc sống hàng ngày, giúp con người nâng cao năng suất và trải nghiệm sống.",
      date: "2026",
    },
    {
      category: "Quản trị Vận hành",
      title: "Đạt điểm hòa vốn trong 6 tháng — Chiến lược thực chiến",
      excerpt: "Chia sẻ framework quản trị giúp startup đạt break-even nhanh chóng với nguồn lực tối thiểu.",
      content: "Một trong những thách thức lớn nhất của bất kỳ startup nào là đạt được điểm hòa vốn (break-even point) trong thời gian ngắn nhất có thể. Với kinh nghiệm thực chiến, tôi chia sẻ framework đã giúp các dự án của mình đạt break-even chỉ trong 6 tháng.\n\nBước 1: Tối ưu hóa chi phí vận hành — Tự động hóa quy trình lên đến 90%, giảm thiểu nhân sự thừa và tập trung vào core competency.\n\nBước 2: Xây dựng dòng tiền nhanh — Tập trung vào sản phẩm MVP có khả năng monetize ngay lập tức, thay vì chạy theo tính năng hoàn hảo.\n\nBước 3: Engineering Excellence — Đảm bảo hệ thống kỹ thuật luôn vận hành ổn định với load time dưới 2 giây, giảm thiểu downtime và tối ưu trải nghiệm người dùng.\n\nTriết lý cốt lõi: Không cần nhiều tiền để bắt đầu, nhưng cần đúng chiến lược để tồn tại.",
      date: "2026",
    },
    {
      category: "Sáng tạo & Thẩm mỹ",
      title: "Ứng dụng AI trong thiết kế: Từ ý tưởng đến sản phẩm",
      excerpt: "Cách tận dụng AI generative để nâng cao quy trình sáng tạo và thiết kế sản phẩm số.",
      content: "AI Generative đang thay đổi hoàn toàn cách chúng ta tiếp cận thiết kế. Từ việc tạo concept art, wireframe đến hoàn thiện UI/UX — AI trở thành người đồng hành không thể thiếu của designer hiện đại.\n\nTại MERCY TECH GLOBAL, chúng tôi ứng dụng AI vào quy trình thiết kế theo 3 giai đoạn:\n\n1. Ideation: Sử dụng AI để brainstorm ý tưởng, tạo mood board và khám phá các hướng sáng tạo mới.\n\n2. Prototyping: AI giúp tăng tốc quá trình tạo prototype từ vài ngày xuống còn vài giờ.\n\n3. Refinement: Kết hợp thẩm mỹ của con người với khả năng xử lý của AI để tạo ra sản phẩm hoàn thiện.\n\nĐiều quan trọng: AI không thay thế sự sáng tạo của con người — nó khuếch đại nó. Người thiết kế vẫn là người đưa ra quyết định cuối cùng về thẩm mỹ và trải nghiệm.",
      date: "2025",
    },
  ],
  press: [
    {
      source: "Báo Đồng Nai",
      title: "Báo Đồng Nai nói về Vy Thiên Hùng",
      description: "Người trẻ làm sách nói — câu chuyện khởi nghiệp và đam mê công nghệ của Vy Thiên Hùng được Báo Đồng Nai đưa tin.",
      url: "https://baodongnai.com.vn/xa-hoi/202504/nguoi-tre-lam-sach-noi-ea65435/",
      image: "https://baodongnai.com.vn/file/e7837c02876411cd0187645a2551379f/042025/hung_2_20250409213306.jpg?width=600&height=-&type=resize",
      color: "from-blue-500/10 to-blue-600/5",
      iconColor: "text-blue-500",
      iconName: "Newspaper",
    },
    {
      source: "Báo Công An Nhân Dân",
      title: "Vy Thiên Hùng cảnh báo lừa đảo được Báo Bộ Công An đưa tin",
      description: "Cảnh báo thủ đoạn lừa đảo nhắm vào những người viết văn chương — thông tin quan trọng được Báo Công An Nhân Dân ghi nhận.",
      url: "https://congan.com.vn/vu-an/canh-giac/canh-bao-thu-doan-lua-dao-nham-vao-nhung-nguoi-viet-van-chuong_180096.html",
      image: "https://cloud.tienlenquyetthang.com/thumbnail/CATP-480-2025-7-6/fd8c6fe6e7b851e608a9_655_393_270.jpg",
      color: "from-red-500/10 to-red-600/5",
      iconColor: "text-red-500",
      iconName: "Shield",
    },
    {
      source: "HTV - Truyền hình TP.HCM",
      title: "Vy Thiên Hùng góp mặt trong Hội sách Tết 2025 trên truyền hình HTV",
      description: "Xuất hiện trên sóng truyền hình HTV trong chương trình Hội sách Tết 2025, chia sẻ về hành trình sách nói và công nghệ.",
      url: "https://www.youtube.com/watch?v=P-G-LlRkBk8",
      image: "https://img.youtube.com/vi/P-G-LlRkBk8/maxresdefault.jpg",
      color: "from-purple-500/10 to-purple-600/5",
      iconColor: "text-purple-500",
      iconName: "Tv",
    },
  ],
  hobbies: {
    image: "",  // will fallback to imported asset
    sections: [
      {
        title: "Nỗi ám ảnh về Trải nghiệm & Thẩm mỹ (UX/UI Excellence)",
        description: "Sự yêu thích việc ứng dụng AI Generative không chỉ dừng ở đồ họa cá nhân, mà được tôi chuyển hóa thành tiêu chuẩn khắt khe cho mọi sản phẩm B2B. Tôi tin rằng một nền tảng doanh nghiệp (SaaS) xuất sắc không chỉ cần luồng code chạy mượt, mà sự hoàn hảo trong từng pixel hiển thị mới là thứ định vị đẳng cấp thương hiệu của đối tác.",
      },
      {
        title: "Linh hoạt & Phá vỡ Giới hạn",
        description: "Thói quen tùy biến (customization) trong đời sống cá nhân rèn luyện cho tôi khả năng không bao giờ chấp nhận các bộ khung có sẵn. Tôi liên tục đập bỏ và tái cấu trúc các giải pháp phần mềm để chúng có thể Scale-up (mở rộng) không giới hạn cùng doanh nghiệp.",
      },
    ],
  },
  contact: {
    zaloLink: "https://zalo.me/0763068614",
  },
  ebooks: [
    {
      title: "Nhập môn Vibe Coding với AI",
      description: "Hướng dẫn từ A-Z cách sử dụng AI để lập trình mà không cần kiến thức coding truyền thống. Phù hợp cho người mới bắt đầu.",
      pages: "32 trang",
      format: "PDF",
      file: "#",
    },
    {
      title: "Prompt Engineering cho Developer",
      description: "Kỹ thuật viết prompt hiệu quả khi làm việc với Gemini AI, ChatGPT, Cursor và các công cụ AI coding khác.",
      pages: "28 trang",
      format: "PDF",
      file: "#",
    },
    {
      title: "AI trong Doanh nghiệp — Ứng dụng thực tế",
      description: "Case study và chiến lược triển khai AI vào vận hành doanh nghiệp, tối ưu quy trình và tăng năng suất lên đến 300%.",
      pages: "45 trang",
      format: "PDF",
      file: "#",
    },
  ],
  communities: [
    {
      name: "Cộng Đồng Chia Sẻ Vibe Coding",
      description: "Cộng đồng Zalo dành cho những ai đam mê lập trình cùng AI — chia sẻ kinh nghiệm Vibe Coding với Gemini AI, Cursor, GitHub Copilot và các công cụ AI coding hàng đầu.",
      members: "500+",
      color: "from-blue-500 to-blue-600",
      link: "/community/vibe-coding",
      linkText: "Chọn nhóm phù hợp",
      image: "/vibe-coding.jpg",
      internal: true,
    },
    {
      name: "Facebook Group",
      description: 'Nhóm Facebook dành cho cộng đồng yêu thích AI & Công nghệ — chia sẻ thực chiến, case study và networking cùng những người đam mê đổi mới sáng tạo.',
      members: "1,000+",
      color: "from-indigo-500 to-purple-600",
      link: "https://www.facebook.com/groups/vibecoding007",
      linkText: "Tham gia Group",
      image: "/facebook-group.png",
      internal: false,
    },
    {
      name: "Mercy Labs — AI Training",
      description: "Cộng đồng học viên Mercy Labs — nơi đào tạo thực chiến về Trí tuệ Nhân tạo, hỗ trợ doanh nghiệp & cá nhân ứng dụng AI vào công việc và cuộc sống.",
      members: "Đang mở đăng ký",
      color: "from-emerald-500 to-teal-600",
      link: "https://oshioxi.com/pages/vibe-coding",
      linkText: "Tìm hiểu thêm",
      image: "/mercy-labs.png",
      internal: false,
    },
  ],
  seo: {
    siteTitle: "Vy Thiên Hùng — Founder & CEO @ MERCY TECH GLOBAL",
    metaDescription: "Trang cá nhân của Vy Thiên Hùng — Nhà sáng lập Mercy Tech Global, chuyên gia AI & Công nghệ.",
    ogImage: "",
  },
  footer: {
    companyName: "MERCY TECH GLOBAL",
    copyrightName: "Vy Thiên Hùng",
  },
  networkingPhotos: [
    { image: "/networking/photo-1.jpg", caption: "Ký kết hợp tác cùng Đại học Đồng Nai" },
    { image: "/networking/photo-2.jpg", caption: "Tặng sách cho trẻ em khó khăn cùng TT Hỗ trợ việc làm Thủ Đức" },
    { image: "/networking/photo-3.jpg", caption: "Thiện nguyện tặng Sách nói cho trẻ em khiếm thị" },
    { image: "/networking/photo-4.jpg", caption: "Talkshow tại ĐH Khoa học Xã hội & Nhân văn TP.HCM" },
    { image: "/networking/photo-5.jpg", caption: "Giám khảo Chung kết Khởi nghiệp tại ĐH Nam Cần Thơ" },
    { image: "/networking/photo-6.jpg", caption: "Mercy đồng hành Ngày hội Việc làm TP. Thủ Đức" },
  ],
  vibeCodingGroups: [
    {
      title: "Người mới bắt đầu",
      subtitle: "Dành cho bạn chưa có kinh nghiệm coding",
      description: "Bạn mới tìm hiểu về Vibe Coding và AI? Đây là nơi lý tưởng để bắt đầu! Cộng đồng sẽ hướng dẫn bạn từ con số 0.",
      features: ["Hướng dẫn cơ bản từ A-Z", "Hỗ trợ tận tình từ mentor", "Tài liệu dành cho người mới", "Không yêu cầu kinh nghiệm"],
      link: "https://zalo.me/g/ljzjzz617",
      linkText: "Tham gia nhóm Beginner",
    },
    {
      title: "Đã có kinh nghiệm",
      subtitle: "Dành cho bạn đã biết coding hoặc đã dùng AI",
      description: "Bạn đã có nền tảng lập trình? Tham gia nhóm nâng cao để chia sẻ case study thực chiến và networking.",
      features: ["Thảo luận kỹ thuật chuyên sâu", "Case study & dự án thực tế", "Networking với developer", "Cập nhật xu hướng AI coding"],
      link: "https://zalo.me/g/knfhm1bqcempjbodwfwa",
      linkText: "Tham gia nhóm Advanced",
    },
  ],
  tools: [
    {
      name: "ChatGPT Plus",
      category: "AI Chat",
      description: "GPT-5.4, Codex 5.4, DALL-E 3, Browsing, Plugins",
      features: ["Truy cập GPT-5.4 không giới hạn", "Codex 5.4 hỗ trợ lập trình", "DALL-E 3 tạo ảnh AI", "Browsing & Plugins"],
      duration: "1 tháng",
      price: 525000,
      originalPrice: 525000,
      badge: "BEST SELLER",
      affiliateLink: "https://openai.com/chatgpt/pricing/",
    },
    {
      name: "CapCut Pro",
      category: "Design & Video",
      description: "CapCut Pro — Chỉnh sửa video chuyên nghiệp, xuất 4K, AI Tools, toàn bộ thư viện Premium.",
      features: ["Xuất video 4K không watermark", "Toàn bộ thư viện hiệu ứng Premium", "Công cụ AI chỉnh sửa nâng cao", "Template & Font Pro độc quyền"],
      duration: "1 tháng",
      price: 199000,
      originalPrice: 199000,
      badge: "PRO",
      affiliateLink: "https://www.capcut.com/pricing",
    },
    {
      name: "30TB / Antigravity Ultra / Gemini Ultra / Cli Claude / Cli Gemini",
      category: "Gemini",
      description: "Gói siêu cấp 1 Slot: Gemini Ultra + Antigravity Ultra + Veo 3 + 30TB Drive",
      features: ["Truy cập Gemini Ultra không giới hạn", "Antigravity Ultra (Claude Max Opus 4.6)", "CLI Claude — Lập trình AI dòng lệnh", "Kho lưu trữ 30TB Google Drive"],
      duration: "1 tháng",
      price: 6000000,
      originalPrice: 6000000,
      badge: "BEST SELLER",
      affiliateLink: "https://one.google.com/explore-plan/gemini-advanced",
    },
  ],
  zaloLinks: {
    contactZalo: "https://zalo.me/0763068614",
    ebookGroupZalo: "https://zalo.me/g/ljzjzz617",
  },
  floatingActions: {
    contactZaloLink: "https://zalo.me/0763068614",
    communityLink: "/community/vibe-coding",
    communityLabel: "Cộng đồng",
  },
  workshops: [
    {
      slug: "talkshow-vibe-coding-loi-hay-hai",
      title: "Talkshow: Vibe Coding — Lợi hay Hại?",
      subtitle: "Góc nhìn đa chiều về Vibe Coding và tác động của AI đến ngành lập trình",
      description: "Buổi talkshow thảo luận sâu về Vibe Coding — xu hướng lập trình bằng AI đang gây tranh cãi: Liệu nó là công cụ giải phóng sáng tạo hay mối nguy cho developer?",
      date: "04/04/2026",
      time: "19:00 - 21:00",
      location: "Online qua Zoom",
      image: "/workshop-talkshow.png",
      category: "Talkshow",
      status: "upcoming",
      highlights: [
        "Phân tích ưu & nhược điểm thực tế của Vibe Coding",
        "Chia sẻ từ người đã xây dựng sản phẩm thực bằng AI",
        "Thảo luận mở: Developer cần thích nghi thế nào?",
        "Q&A trực tiếp với diễn giả"
      ],
      agenda: [
        { time: "19:00 - 19:15", title: "Khai mạc & Giới thiệu" },
        { time: "19:15 - 20:00", title: "Keynote: Vibe Coding — Lợi hay Hại?" },
        { time: "20:00 - 20:40", title: "Panel Discussion & Case Study thực tế" },
        { time: "20:40 - 21:00", title: "Q&A & Networking" }
      ],
      speaker: {
        name: "Vy Thiên Hùng",
        title: "Founder & CEO @ MERCY TECH GLOBAL",
        avatar: ""
      },
      price: "Miễn phí",
      ctaText: "Đăng ký tham gia",
      ctaLink: "https://zalo.me/0763068614",
      reviewCount: 328
    },
    {
      slug: "khoa-hoc-vibe-coding-a-z",
      title: "Khoá học Vibe Coding từ A-Z",
      subtitle: "7 ngày thực chiến (2 buổi/tuần) — Từ zero đến tạo sản phẩm thực tế bằng AI",
      description: "Khoá học chuyên sâu 7 ngày, 2 buổi/tuần, hướng dẫn bạn làm chủ Vibe Coding — xây dựng website, ứng dụng hoàn chỉnh chỉ bằng AI mà không cần biết code.",
      date: "26/04/2026",
      time: "2 buổi/tuần",
      location: "Online",
      image: "/workshop-khoa-hoc.png",
      category: "Khoá học",
      status: "upcoming",
      highlights: [
        "7 ngày thực chiến — 2 buổi/tuần",
        "Xây dựng sản phẩm thực tế từ A-Z bằng AI",
        "Được xem lại toàn bộ Record",
        "Hỗ trợ 1-1 từ mentor trong suốt khoá học"
      ],
      agenda: [
        { time: "Buổi 1-2", title: "Nhập môn Vibe Coding & Setup công cụ AI" },
        { time: "Buổi 3-4", title: "Tạo giao diện website với AI" },
        { time: "Buổi 5-6", title: "Backend, Database & API" },
        { time: "Buổi 7", title: "Deploy, tối ưu & Bảo vệ dự án" }
      ],
      speaker: {
        name: "Vy Thiên Hùng",
        title: "Founder & CEO @ MERCY TECH GLOBAL",
        avatar: ""
      },
      price: "693.000đ (đã bao gồm VAT)",
      priceValue: 693000,
      originalPrice: 19000000,
      slogan: "Sản phẩm 5⭐ giá 1⭐",
      bonuses: [
        "Tài khoản Anti Gravity (Hot)",
        "Full bộ Ebook/Giáo trình Vibe Coding",
        "Tài khoản học Vibecoding trên nền tảng Elearning",
        "Được xem lại Record",
        "Gemini Ultra",
        "25.000 Credit Veo 3.1",
        "Hạn mức cao nhất Notebook LM",
        "Gemini trong tài liệu, Gmail và nhiều công cụ khác",
        "30TB Google Drive",
        "ChatGPT Plus",
        "Capcut Pro",
        "Canva Pro",
        "Cơ hội nhận thêm: Youtube Premium, Kling AI, Perplexity Pro, Loveable Pro",
        "Vào cộng đồng VIP member chất lượng — Cam kết không loãng"
      ],
      ctaText: "Tìm hiểu thêm",
      ctaLink: "https://zalo.me/0763068614",
      reviewCount: 286
    }
  ],
  lastUpdated: new Date().toISOString(),
};

// --- LocalStorage Cache (fallback) ---

const STORAGE_KEY = "vythienhung_site_data";

export function loadSiteData(): SiteData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<SiteData>;
      return { ...DEFAULT_SITE_DATA, ...parsed };
    }
  } catch (e) {
    console.warn("Failed to load site data from localStorage:", e);
  }
  return { ...DEFAULT_SITE_DATA };
}

export function saveSiteData(data: SiteData): void {
  try {
    data.lastUpdated = new Date().toISOString();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error("Failed to save site data to localStorage:", e);
  }
}

export function resetSiteData(): SiteData {
  localStorage.removeItem(STORAGE_KEY);
  return { ...DEFAULT_SITE_DATA, lastUpdated: new Date().toISOString() };
}

export function exportSiteData(): string {
  const data = loadSiteData();
  return JSON.stringify(data, null, 2);
}

export function importSiteData(json: string): SiteData {
  const data = JSON.parse(json) as SiteData;
  saveSiteData(data);
  return data;
}

// --- API Functions (MySQL backend) ---

export async function fetchSiteDataFromAPI(): Promise<SiteData> {
  try {
    const res = await fetch("/api/site-data");
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (data && typeof data === "object" && data.hero) {
      // Cache in localStorage
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      return { ...DEFAULT_SITE_DATA, ...data };
    }
  } catch (e) {
    console.warn("Failed to fetch site data from API, using cache:", e);
  }
  // Fallback to localStorage cache
  return loadSiteData();
}

export async function saveSiteDataToAPI(data: SiteData): Promise<boolean> {
  data.lastUpdated = new Date().toISOString();
  // Always cache to localStorage first
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));

  const res = await fetch("/api/site-data", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorBody = await res.text().catch(() => "");
    throw new Error(`Lưu thất bại (HTTP ${res.status}): ${errorBody}`);
  }

  return true;
}
