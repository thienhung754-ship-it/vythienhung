import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { MessageCircle } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

const ZALO_LINK = "https://zalo.me/0763068614";

const Contact = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [showQR, setShowQR] = useState(false);

  return (
    <section id="contact" className="section-padding bg-secondary/40" ref={ref}>
      <div className="max-w-xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <p className="text-sm text-muted-foreground tracking-widest uppercase mb-3">Liên hệ</p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
            Kết nối
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col items-center"
        >
          <button
            onClick={() => setShowQR(!showQR)}
            className="flex items-center gap-3 px-8 py-4 bg-foreground text-primary-foreground rounded-2xl text-sm font-medium hover:opacity-90 transition-opacity"
          >
            <MessageCircle className="w-5 h-5" />
            {showQR ? "Ẩn mã QR" : "Kết bạn qua Zalo"}
          </button>

          <AnimatePresence>
            {showQR && (
              <motion.div
                initial={{ opacity: 0, height: 0, scale: 0.9 }}
                animate={{ opacity: 1, height: "auto", scale: 1 }}
                exit={{ opacity: 0, height: 0, scale: 0.9 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="mt-8 flex flex-col items-center"
              >
                <div className="bg-background p-6 rounded-2xl border border-border shadow-lg">
                  <QRCodeSVG
                    value={ZALO_LINK}
                    size={200}
                    bgColor="transparent"
                    fgColor="hsl(var(--foreground))"
                    level="H"
                  />
                </div>
                <p className="text-muted-foreground text-sm mt-4">
                  Quét mã QR để kết bạn Zalo
                </p>
                <a
                  href={ZALO_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-muted-foreground/60 mt-2 hover:text-foreground transition-colors underline"
                >
                  Hoặc bấm vào đây
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
