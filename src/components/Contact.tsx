import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { MessageCircle, ScanQrCode } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { useSiteData } from "@/contexts/SiteDataContext";

const Contact = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [showQR, setShowQR] = useState(false);
  const { siteData } = useSiteData();
  const ZALO_LINK = siteData.contact.zaloLink;

  return (
    <section id="contact" className="section-padding relative overflow-hidden bg-[black]" ref={ref}>
      {/* Background elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[hsla(211,100%,50%,0.03)] blur-[100px] pointer-events-none" />
      
      <div className="max-w-xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-card mb-4 border border-[hsla(211,100%,50%,0.2)]">
            <div className="w-1.5 h-1.5 rounded-full bg-[hsl(211,100%,60%)] animate-pulse" />
            <span className="text-xs font-medium text-[hsl(211,100%,80%)] tracking-widest uppercase">Liên hệ</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground mb-4">
            Kết Nối <span className="text-gradient-ocean">Ngay</span>
          </h2>
          <p className="text-muted-foreground/80">Sẵn sàng để bắt đầu dự án tiếp theo của bạn?</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col items-center"
        >
          <button
            onClick={() => setShowQR(!showQR)}
            className="group relative flex items-center gap-3 px-8 py-4 bg-gradient-ocean text-white rounded-full text-base font-semibold hover:scale-105 active:scale-95 transition-all duration-300 shadow-[0_0_40px_hsla(211,100%,50%,0.3)] overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <MessageCircle className="w-6 h-6 relative z-10" />
            <span className="relative z-10">{showQR ? "Ẩn mã QR Zalo" : "Nhắn tin qua Zalo"}</span>
          </button>

          <AnimatePresence>
            {showQR && (
              <motion.div
                initial={{ opacity: 0, height: 0, scale: 0.9 }}
                animate={{ opacity: 1, height: "auto", scale: 1 }}
                exit={{ opacity: 0, height: 0, scale: 0.9 }}
                transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="mt-12 flex flex-col items-center"
              >
                <div className="relative group p-1 rounded-3xl bg-gradient-to-br from-[hsl(211,100%,50%)] to-[hsl(211,100%,30%)]">
                  <div className="bg-[black] p-8 rounded-[1.35rem]">
                    <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-ocean rounded-full flex items-center justify-center shadow-lg shadow-[hsla(211,100%,50%,0.4)] animate-bounce">
                      <ScanQrCode className="w-6 h-6 text-white" />
                    </div>
                    <QRCodeSVG
                      value={ZALO_LINK}
                      size={220}
                      bgColor="transparent"
                      fgColor="hsl(211,100%,60%)"
                      level="H"
                    />
                  </div>
                </div>
                
                <p className="text-muted-foreground/90 font-medium text-sm mt-6">
                  Mở ứng dụng Zalo để quét mã
                </p>
                <a
                  href={ZALO_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 px-6 py-2 rounded-full glass-card text-xs font-semibold text-[hsl(211,100%,60%)] hover:bg-[hsla(211,100%,50%,0.1)] transition-colors"
                >
                  Mở trực tiếp ứng dụng
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
