import { motion, useInView } from "framer-motion";
import { useParams, Link } from "react-router-dom";
import { useRef, useState } from "react";
import { saveRegistration } from "@/lib/registrations";
import type { Registration } from "@/lib/registrations";
import PaymentModal from "@/components/PaymentModal";
import {
  Calendar,
  MapPin,
  Clock,
  ArrowLeft,
  ArrowDown,
  ExternalLink,
  CheckCircle2,
  User,
  Gift,
  Zap,
  Star,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useSiteData } from "@/contexts/SiteDataContext";
import CoverflowCarousel, { CaseStudyItem } from "@/components/CoverflowCarousel";
import FomoNotification from "@/components/FomoNotification";

const formatPrice = (price: number) => price.toLocaleString("vi-VN") + "đ";

const StarRating = ({ filled, total = 5 }: { filled: number; total?: number }) => (
  <span className="inline-flex items-center gap-0.5">
    {Array.from({ length: total }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < filled
            ? "text-yellow-400 fill-yellow-400"
            : "text-yellow-400/30"
        }`}
      />
    ))}
  </span>
);

const CASE_STUDIES: CaseStudyItem[] = [
  {
    id: "1",
    title: "PET ADOPTION APP",
    category: "App",
    image: "/casestudy/cs-pet-app.png",
    description: "App nhận nuôi & giao thú cưng MOCHI — thiết kế UI/UX đầy đủ từ onboarding, browse listing đến real-time delivery tracking.",
  },
  {
    id: "2",
    title: "GROCERY DELIVERY APP",
    category: "App",
    image: "/casestudy/cs-grocery-app.png",
    description: "App mua sắm thực phẩm tươi sống Gronur — đặt hàng, theo dõi đơn hàng và thanh toán tích hợp trong một trải nghiệm mượt mà.",
  },
  {
    id: "3",
    title: "E-COMMERCE WEBSITE",
    category: "Website",
    image: "/casestudy/cs-ecommerce-web.png",
    description: "Website bán lẻ đa danh mục Stuffsus — giỏ hàng, hệ thống đánh giá và gợi ý sản phẩm thông minh, xây bằng AI trong 3 ngày.",
  },
  {
    id: "4",
    title: "HEADPHONE LANDING PAGE",
    category: "Landing Page",
    image: "/casestudy/cs-headphone-web.png",
    description: "Landing page sản phẩm Fiha Headphones — dark mode ấn tượng, showcase tính năng nổi bật và section testimonial tối ưu chuyển đổi.",
  },
  {
    id: "5",
    title: "AUDIO SHOP WEBSITE",
    category: "Website",
    image: "/casestudy/cs-audio-shop-web.png",
    description: "Website bán thiết bị âm thanh Crescendo — phân loại sản phẩm rõ ràng, UX tối ưu từ browse đến checkout với đầy đủ tính năng.",
  },
];


// --- Registration Form ---
const RegistrationForm = ({ workshopSlug, workshopTitle }: { workshopSlug: string; workshopTitle: string }) => {
  const [form, setForm] = useState({ name: "", phone: "", email: "", timeSlot: "Sáng 9h00–10h30" as "Sáng 9h00–10h30" | "Tối 20h30–21h30" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [pendingReg, setPendingReg] = useState<Registration | null>(null);
  const [allDone, setAllDone] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Vui lòng nhập họ và tên";
    if (!form.phone.trim()) e.phone = "Vui lòng nhập số điện thoại";
    if (!form.email.trim()) e.email = "Vui lòng nhập email";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Email không hợp lệ";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    const reg = saveRegistration({ ...form, workshopSlug, workshopTitle });
    setPendingReg(reg);
  };

  // Final success screen
  if (allDone) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-8 text-center">
        <div className="w-14 h-14 rounded-full bg-green-500/10 flex items-center justify-center">
          <CheckCircle2 className="w-7 h-7 text-green-500" />
        </div>
        <div>
          <h4 className="text-lg font-bold text-foreground mb-1">Đăng ký thành công!</h4>
          <p className="text-sm text-muted-foreground">Đội ngũ sẽ gửi Email thông báo và tài liệu sau khi xác nhận thanh toán.</p>
        </div>
      </div>
    );
  }

  const inputClass = (field: string) =>
    `w-full px-4 py-2.5 rounded-xl border text-sm bg-background text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-purple-500/30 transition-all ${errors[field] ? "border-red-400" : "border-border"}`;

  return (
    <>
      {/* Payment Modal */}
      {pendingReg && (
        <PaymentModal
          registration={pendingReg}
          onSuccess={() => { setPendingReg(null); setAllDone(true); }}
          onClose={() => setPendingReg(null)}
        />
      )}

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <p className="text-xs font-semibold text-foreground uppercase tracking-widest">Điền thông tin đăng ký</p>
        {/* Name */}
        <div>
          <label className="text-xs text-muted-foreground mb-1.5 block">Họ và Tên <span className="text-red-400">*</span></label>
          <input type="text" placeholder="Nguyễn Văn A" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className={inputClass("name")} />
          {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name}</p>}
        </div>
        {/* Phone */}
        <div>
          <label className="text-xs text-muted-foreground mb-1.5 block">Số điện thoại (Zalo) <span className="text-red-400">*</span></label>
          <input type="tel" placeholder="0912 345 678" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} className={inputClass("phone")} />
          {errors.phone && <p className="text-xs text-red-400 mt-1">{errors.phone}</p>}
        </div>
        {/* Email */}
        <div>
          <label className="text-xs text-muted-foreground mb-1.5 block">Địa chỉ Email <span className="text-red-400">*</span></label>
          <input type="email" placeholder="email@gmail.com" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} className={inputClass("email")} />
          {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email}</p>}
        </div>
        {/* Time slot */}
        <div>
          <label className="text-xs text-muted-foreground mb-2 block">Thời gian có thể học <span className="text-red-400">*</span></label>
          <div className="flex flex-col gap-2">
            {(["Sáng 9h00–10h30", "Tối 20h30–21h30"] as const).map((slot) => (
              <label key={slot} className={`flex items-center gap-3 px-4 py-3 rounded-xl border cursor-pointer transition-all ${form.timeSlot === slot ? "border-purple-500 bg-purple-500/5" : "border-border hover:border-foreground/20"}`}>
                <input type="radio" name="timeSlot" value={slot} checked={form.timeSlot === slot} onChange={() => setForm(f => ({ ...f, timeSlot: slot }))} className="accent-purple-500" />
                <span className="text-sm font-medium text-foreground">{slot}</span>
              </label>
            ))}
          </div>
        </div>
        {/* Submit */}
        <button type="submit" className="w-full py-4 rounded-xl bg-foreground text-background text-sm font-black hover:opacity-90 transition-opacity uppercase tracking-wide">
          Đăng ký ngay
        </button>
        <p className="text-xs text-center text-muted-foreground">Đội ngũ sẽ gửi Email thông báo và tài liệu sau khi đăng ký thành công.</p>
      </form>
    </>
  );
};

const WorkshopDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { siteData } = useSiteData();
  const workshops = siteData.workshops || [];
  const workshop = workshops.find((w) => w.slug === slug);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  if (!workshop) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-12 flex flex-col items-center justify-center min-h-[60vh]">
          <h2 className="text-2xl font-bold text-foreground mb-2">Không tìm thấy sự kiện</h2>
          <p className="text-muted-foreground mb-6">Sự kiện này không tồn tại hoặc đã bị xoá.</p>
          <Link
            to="/workshops"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-foreground text-background text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            <ArrowLeft className="w-4 h-4" /> Quay lại
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const isCompleted = workshop.status === "completed";
  const hasBonuses = workshop.bonuses && workshop.bonuses.length > 0;
  const hasDiscount = workshop.originalPrice && workshop.originalPrice > 0;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-12">
        <section className="section-padding" ref={ref}>
          <div className="max-w-4xl mx-auto">
            {/* Back link */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <Link
                to="/workshops"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Tất cả sự kiện
              </Link>
            </motion.div>

            {/* Banner Image */}
            {workshop.image && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
                className="rounded-2xl overflow-hidden border border-border mb-8 aspect-[21/9] w-full"
              >
                <img src={workshop.image} alt={workshop.title} className="w-full h-full object-cover" />
              </motion.div>
            )}

            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-8"
            >
              <span className="text-[10px] text-muted-foreground uppercase tracking-widest mb-2 block">
                {workshop.category}
              </span>
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-3">
                {workshop.title}
              </h1>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl">
                {workshop.subtitle}
              </p>
            </motion.div>

            {/* Meta info — simple row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground mb-8 pb-8 border-b border-border"
            >
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" /> {workshop.date}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" /> {workshop.time}
              </span>
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4" /> {workshop.location}
              </span>
            </motion.div>

            {/* CTA button (price hidden) */}
            {!isCompleted && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.25 }}
                className="mb-8"
              >
                <button
                  onClick={() => document.getElementById("dang-ky")?.scrollIntoView({ behavior: "smooth" })}
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-foreground text-background text-sm font-bold hover:opacity-90 transition-opacity"
                >
                  Tìm hiểu ngay
                  <ArrowDown className="w-4 h-4" />
                </button>
              </motion.div>
            )}

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mb-12"
            >
              <p className="text-base text-muted-foreground leading-relaxed">
                {workshop.description}
              </p>
            </motion.div>

            {/* Highlights */}
            {workshop.highlights.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.35 }}
                className="mb-12"
              >
                <h2 className="text-2xl md:text-4xl font-black text-foreground mb-8 uppercase tracking-tight leading-tight">
                  Bạn sẽ nhận được gì sau<br className="hidden md:block" /> 7 ngày khoá học?
                </h2>
                {/* Illustration image */}
                <div className="rounded-2xl overflow-hidden mb-8 border border-border">
                  <img
                    src="/TNCR-graphics-KB-2.gif"
                    alt="Vibe Coding highlights illustration"
                    className="w-full object-cover"
                  />
                </div>
                {/* Rich bullet list */}
                <ul className="space-y-5">
                  {[
                    {
                      bold: "Xây dựng website, miniapp cơ bản hoàn chỉnh từ 0",
                      desc: " bằng AI mà không cần biết code — từ ý tưởng đến sản phẩm thực tế trong vài ngày.",
                    },
                    {
                      bold: "Làm chủ bộ công cụ Vibe Coding hàng đầu như:",
                      desc: " Anti Gravity, Cursor, Lovable, Replit — biết chọn đúng tool cho đúng việc.",
                    },
                    {
                      bold: "Prompt Engineering thực chiến",
                      desc: " để AI hiểu đúng ý đồ và tạo ra sản phẩm đúng như bạn mong muốn.",
                    },
                    {
                      bold: "Tiết kiệm 90% thời gian & chi phí",
                      desc: " phát triển sản phẩm số bằng cách tận dụng tối đa sức mạnh của AI.",
                    },
                    {
                      bold: "Tư duy kiếm tiền từ kỹ năng Vibe Coding",
                      desc: " — biết cách biến sản phẩm AI thành nguồn thu nhập thực tế: freelance, SaaS mini, dịch vụ số.",
                    },
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="mt-1.5 w-2.5 h-2.5 rounded-full bg-purple-500 shrink-0" />
                      <p className="text-sm md:text-base text-foreground leading-relaxed">
                        <span className="font-bold">{item.bold}</span>
                        {item.desc}
                      </p>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {/* Bonuses — for paid courses */}
            {hasBonuses && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mb-12"
              >
                <div className="rounded-2xl border border-border bg-secondary/30 p-6 md:p-8">
                  <div className="flex items-center gap-2 mb-5">
                    <Gift className="w-5 h-5 text-foreground" />
                    <h2 className="text-xl md:text-2xl font-bold text-foreground">
                      Được tặng kèm bộ công cụ trị giá &gt;15.000.000đ
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                    {workshop.bonuses!.map((bonus, i) => (
                      <div key={i} className="flex items-start gap-3 py-2.5 px-4 rounded-xl bg-background/60 border border-border/50">
                        <CheckCircle2 className="w-3.5 h-3.5 text-purple-500 mt-1 shrink-0" />
                        <span className="text-sm text-foreground">{bonus}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Agenda */}
            {workshop.agenda.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.45 }}
                className="mb-12"
              >
                <h2 className="text-xl md:text-2xl font-bold text-foreground mb-6">
                  Lịch trình
                </h2>
                <div className="space-y-0 border-l-2 border-border ml-2">
                  {workshop.agenda.map((item, i) => (
                    <div key={i} className="relative pl-6 py-3">
                      <div className="absolute left-[-5px] top-4 w-2 h-2 rounded-full bg-foreground" />
                      <span className="text-xs text-muted-foreground font-mono">{item.time}</span>
                      <p className="text-sm text-foreground font-medium mt-0.5">{item.title}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Speaker */}
            {workshop.speaker?.name && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="mb-12"
              >
                <h2 className="text-xl md:text-2xl font-bold text-foreground mb-6">Diễn giả</h2>
                <div className="flex items-center gap-4 p-5 rounded-2xl bg-secondary/30 border border-border">
                  <div className="w-14 h-14 rounded-full overflow-hidden bg-secondary flex items-center justify-center shrink-0">
                    {workshop.speaker.avatar ? (
                      <img src={workshop.speaker.avatar} alt={workshop.speaker.name} className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-6 h-6 text-muted-foreground" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-foreground">{workshop.speaker.name}</h3>
                    <p className="text-sm text-muted-foreground">{workshop.speaker.title}</p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Case Studies Section */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.55 }}
              className="mb-12"
            >
              <h2 className="text-xl md:text-2xl font-bold text-foreground mb-2">
                Học viên đã làm được gì?
              </h2>
              <p className="text-sm text-muted-foreground mb-8">
                Những sản phẩm thực tế được xây dựng bằng Vibe Coding — từ zero đến sản phẩm hoàn chỉnh.
              </p>
              <CoverflowCarousel
                categories={["Tất cả", "Website", "App", "Landing Page"]}
                items={CASE_STUDIES}
              />
            </motion.div>

            {/* Comparison Table */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mb-12"
            >
              <h2 className="text-2xl md:text-4xl font-black text-foreground text-center mb-8 tracking-tight uppercase">
                Lựa chọn nào tối ưu cho bạn?
              </h2>
              <div className="overflow-x-auto rounded-2xl border border-border">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left px-5 py-4 font-semibold text-muted-foreground w-[28%]">Tiêu chí</th>
                      <th className="text-center px-5 py-4 font-semibold text-muted-foreground">Tài liệu / PDF</th>
                      <th className="text-center px-5 py-4 font-semibold text-muted-foreground">Youtube / Free</th>
                      <th className="text-center px-5 py-4 font-bold text-purple-500">Khoá học</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        label: "Chi phí",
                        pdf: "Miễn phí / Trả phí",
                        yt: "Miễn phí",
                        ws: "693.000 VNĐ",
                      },
                      {
                        label: "Thời gian học",
                        pdf: "Không có lộ trình",
                        yt: "Hàng tháng trời",
                        ws: "7 ngày thực chiến",
                      },
                      {
                        label: "Hỗ trợ trực tiếp",
                        pdf: "Không có",
                        yt: "Không có",
                        ws: "Hỏi đáp trực tiếp 1:1",
                      },
                      {
                        label: "Tính thực chiến",
                        pdf: "Lý thuyết là chính",
                        yt: "Rời rạc, lý thuyết",
                        ws: "Ứng dụng ngay lập tức",
                      },
                      {
                        label: "Cập nhật AI mới nhất",
                        pdf: "Thường bị lỗi thời",
                        yt: "Thường bị lỗi thời",
                        ws: "Cập nhật real-time",
                      },
                      {
                        label: "Công cụ hỗ trợ",
                        pdf: "Không có",
                        yt: "Không có",
                        ws: "Đầy đủ công cụ AI",
                      },
                      {
                        label: "Tài liệu giáo trình",
                        pdf: "Rời rạc, không hệ thống",
                        yt: "Không có",
                        ws: "Giáo trình hoàn chỉnh",
                      },
                    ].map((row, i) => (
                      <tr key={i} className="border-b border-border last:border-0 hover:bg-secondary/20 transition-colors">
                        <td className="px-5 py-4 font-medium text-foreground">{row.label}</td>
                        <td className="px-5 py-4 text-center text-muted-foreground">{row.pdf}</td>
                        <td className="px-5 py-4 text-center text-muted-foreground">{row.yt}</td>
                        <td className="px-5 py-4 text-center font-semibold text-purple-500">{row.ws}</td>
                      </tr>
                    ))}
                    <tr className="bg-secondary/30">
                      <td className="px-5 py-4" />
                      <td className="px-5 py-5 text-center">
                        <span className="text-xl text-red-400 font-bold">✗</span>
                      </td>
                      <td className="px-5 py-5 text-center">
                        <span className="text-xl text-red-400 font-bold">✗</span>
                      </td>
                      <td className="px-5 py-5 text-center">
                        <span className="text-2xl text-purple-500 font-bold">✓</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </motion.div>

            {!isCompleted && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.55 }}
                className="mb-8"
              >
                {/* Registration card */}
                <div id="dang-ky" className="rounded-2xl border border-border overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    {/* Left — info panel */}
                    <div className="md:w-5/12 bg-foreground text-background p-8 md:p-10 flex flex-col justify-between gap-8">
                      <div>
                        <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-widest bg-background/15 text-background px-3 py-1 rounded-full mb-6">
                          <span className="w-1.5 h-1.5 rounded-full bg-background inline-block" />
                          Khoá học Thông Tin
                        </span>
                        <h3 className="text-2xl md:text-3xl font-black uppercase leading-tight tracking-tight">
                          Đừng để kỹ năng bị bỏ lỡ trong kỷ nguyên AI
                        </h3>
                      </div>
                      <div className="space-y-5 text-sm">
                        <div className="flex items-start gap-3">
                          <Calendar className="w-4 h-4 mt-0.5 opacity-70 shrink-0" />
                          <div>
                            <p className="text-background/60 text-[11px] uppercase tracking-widest mb-0.5">Thời gian</p>
                            <p className="font-semibold">{workshop.date} • {workshop.time}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <MapPin className="w-4 h-4 mt-0.5 opacity-70 shrink-0" />
                          <div>
                            <p className="text-background/60 text-[11px] uppercase tracking-widest mb-0.5">Hình thức</p>
                            <p className="font-semibold">{workshop.location}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="w-4 h-4 mt-0.5 opacity-70 shrink-0" />
                          <div>
                            <p className="text-background/60 text-[11px] uppercase tracking-widest mb-0.5">Xác nhận</p>
                            <p className="text-background/80 leading-relaxed">Link tham gia & tài liệu sẽ được gửi qua Email ngay sau khi đăng ký thành công.</p>
                          </div>
                        </div>
                      </div>
                      {/* Benefits */}
                      <div className="space-y-2 text-sm">
                        <p className="text-[11px] uppercase tracking-widest text-background/60 mb-2">Quyền lợi khi đăng ký</p>
                        {[
                          "7 ngày thực chiến — 2 buổi/tuần",
                          "Full Ebook & Giáo trình Vibe Coding",
                          "Anti Gravity + công cụ AI >15.000.000đ",
                          "Hỏi đáp 1:1 với mentor",
                          "Record vĩnh viễn",
                          "Cộng đồng VIP member",
                        ].map((b, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 text-background/70 shrink-0" />
                            <span className="text-background/80">{b}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Right — price + registration form */}
                    <div className="md:w-7/12 bg-background p-8 md:p-10 flex flex-col gap-5">
                      {/* Price */}
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-widest mb-2">Học phí</p>
                        <div className="flex items-baseline gap-3 mb-1">
                          <span className="text-3xl md:text-4xl font-black text-foreground">693.000đ</span>
                          <span className="text-base text-muted-foreground line-through">19.000.000đ</span>
                        </div>
                        <p className="text-xs text-muted-foreground">Đã bao gồm VAT • Thanh toán một lần, trọn đời học lại</p>
                        {/* Slogan stars */}
                        <p className="text-sm font-semibold text-foreground mt-3 flex items-center gap-1.5 flex-wrap">
                          <span>Sản phẩm chất lượng</span>
                          <span className="inline-flex items-center gap-0.5">
                            {Array.from({ length: 5 }, (_, i) => (
                              <Star key={i} className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                            ))}
                          </span>
                          <span>giá</span>
                          <span className="inline-flex items-center gap-0.5">
                            {Array.from({ length: 4 }, (_, i) => (
                              <Star key={i} className="w-3.5 h-3.5 text-yellow-400/30" />
                            ))}
                            <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                          </span>
                        </p>
                      </div>

                      <hr className="border-border" />

                      {/* Registration Form */}
                      <RegistrationForm
                        workshopSlug={workshop.slug}
                        workshopTitle={workshop.title}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </section>
      </div>
      <Footer />
      <FomoNotification isTalkshow={workshop.category?.toLowerCase().includes("talkshow")} />
    </div>
  );
};

export default WorkshopDetailPage;
