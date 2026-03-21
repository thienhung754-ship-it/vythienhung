import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { Download, X, ArrowRight, Users } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useSiteData } from "@/contexts/SiteDataContext";

const EbookPage = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [showPopup, setShowPopup] = useState(false);
  const { siteData } = useSiteData();
  const ebooks = siteData.ebooks;
  const [currentEbook, setCurrentEbook] = useState<typeof ebooks[number] | null>(null);
  const zaloGroupLink = siteData.zaloLinks?.ebookGroupZalo || "https://zalo.me/g/ljzjzz617";
  const zaloQR = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(zaloGroupLink)}`;

  const handleDownload = (ebook: typeof ebooks[number]) => {
    setCurrentEbook(ebook);
    setShowPopup(true);
  };

  const triggerDownload = () => {
    if (currentEbook && currentEbook.file && currentEbook.file !== "#") {
      const safeName = currentEbook.fileName || `${(currentEbook.title || "ebook").replace(/\s+/g, "_")}.pdf`;
      const downloadUrl = `${currentEbook.file}?name=${encodeURIComponent(safeName)}`;
      window.open(downloadUrl, "_self");
    }
    setShowPopup(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-12">
        <section className="section-padding" ref={ref}>
          <div className="max-w-5xl mx-auto">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
              className="text-center mb-6"
            >
              <p className="text-sm text-muted-foreground tracking-widest uppercase mb-3">
                Tài liệu
              </p>
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-6">
                Ebook miễn phí
              </h1>
              <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Tải ngay các tài liệu chất lượng về AI, Vibe Coding và Công nghệ — hoàn toàn miễn phí, không cần đăng ký.
              </p>
            </motion.div>

            {/* Ebook Cards */}
            <div className="grid md:grid-cols-3 gap-6 mt-16">
              {ebooks.map((ebook, i) => (
                <motion.div
                  key={ebook.title + i}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.1 + i * 0.15 }}
                  onClick={() => handleDownload(ebook)}
                  className="group flex flex-col rounded-2xl border border-border bg-background overflow-hidden hover:border-foreground/20 hover:shadow-xl transition-all duration-500 hover:-translate-y-1 cursor-pointer active:scale-[0.98]"
                >
                  {/* Book cover placeholder */}
                  <div className="relative w-full h-40 bg-neutral-900 flex items-center justify-center">
                    <div className="text-center px-6">
                      <Download className="w-8 h-8 text-white/30 mx-auto mb-3" />
                      <p className="text-white/80 text-sm font-semibold">{ebook.format}</p>
                      <p className="text-white/50 text-xs mt-1">{ebook.pages}</p>
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-lg font-semibold text-foreground mb-2 leading-snug">
                      {ebook.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">
                      {ebook.description}
                    </p>

                    <div className="inline-flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl bg-foreground text-background text-sm font-semibold transition-all duration-300 group-hover:opacity-90">
                      <Download className="w-4 h-4" />
                      Tải miễn phí
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Promo Popup */}
      <AnimatePresence>
        {showPopup && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
            >
              <div className="bg-background rounded-2xl border border-border shadow-2xl max-w-sm w-full pointer-events-auto">
                <div className="flex justify-end p-4 pb-0">
                  <button
                    onClick={triggerDownload}
                    className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="px-6 pb-6 text-center">
                  <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4">
                    <Download className="w-6 h-6 text-foreground" />
                  </div>

                  {currentEbook && (
                    <p className="text-sm text-muted-foreground mb-2">
                      Tài liệu: <span className="text-foreground font-medium">{currentEbook.title}</span>
                    </p>
                  )}

                  <h3 className="text-xl font-bold text-foreground mb-2 mt-4">
                    Tham gia cộng đồng Vibe Coding!
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                    Kết nối với hàng trăm người đang học AI coding — chia sẻ kiến thức, hỏi đáp và cùng nhau phát triển!
                  </p>

                  {/* QR Code */}
                  <div className="bg-white rounded-xl p-4 inline-block mb-5">
                    <img
                      src={zaloQR}
                      alt="QR Code tham gia nhóm Zalo"
                      className="w-40 h-40"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mb-5">
                    Quét QR hoặc bấm nút bên dưới
                  </p>

                  {/* Join button */}
                  <a
                    href={zaloGroupLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={triggerDownload}
                    className="inline-flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl bg-foreground text-background text-sm font-semibold transition-all duration-300 hover:opacity-90"
                  >
                    <Users className="w-4 h-4" />
                    Tham gia nhóm Zalo & Tải tài liệu
                    <ArrowRight className="w-4 h-4" />
                  </a>

                  <button
                    onClick={triggerDownload}
                    className="text-xs text-muted-foreground hover:text-foreground mt-4 block mx-auto transition-colors underline"
                  >
                    Bỏ qua, tải tài liệu luôn
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default EbookPage;
