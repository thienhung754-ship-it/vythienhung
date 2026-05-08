import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Users, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useSiteData } from "@/contexts/SiteDataContext";

const FloatingActions = () => {
  const [contactOpen, setContactOpen] = useState(false);
  const { siteData } = useSiteData();
  const fa = siteData.floatingActions;
  const contactZaloLink = fa?.contactZaloLink || siteData.zaloLinks?.contactZalo || "https://zalo.me/0763068614";

  return (
    <>
      {/* Floating Buttons */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-4 items-end">

        {/* Zalo Contact Button */}
        <button
          onClick={() => setContactOpen(!contactOpen)}
          className="relative bg-gradient-ocean text-white p-4 rounded-full shadow-[0_0_20px_hsla(211,100%,50%,0.4)] hover:shadow-[0_0_30px_hsla(211,100%,50%,0.6)] transition-all duration-300 hover:scale-105 overflow-hidden group"
          title="Liên hệ qua Zalo"
        >
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          <div className="relative z-10">
            {contactOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <>
                <MessageCircle className="w-6 h-6" />
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-[hsl(211,100%,40%)] animate-pulse" />
              </>
            )}
          </div>
        </button>
      </div>

      {/* Zalo Contact Popup */}
      <AnimatePresence>
        {contactOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed bottom-28 right-6 z-50 w-[320px] max-w-[calc(100vw-3rem)] rounded-[1.5rem] glass-card border border-[hsla(211,100%,50%,0.2)] shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-ocean text-white px-5 py-4 flex items-center gap-3 relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
              <div className="relative z-10 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div className="relative z-10 flex-1">
                <p className="text-sm font-bold tracking-wide">LIÊN HỆ</p>
                <p className="text-[10px] font-medium text-white/80 uppercase tracking-wider">KẾT NỐI TRỰC TIẾP</p>
              </div>
              <button
                onClick={() => setContactOpen(false)}
                className="relative z-10 p-1.5 rounded-lg hover:bg-white/20 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 space-y-5 bg-[black] relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[hsla(211,100%,50%,0.05)] rounded-full blur-2xl pointer-events-none" />
              
              <p className="text-sm text-muted-foreground/90 leading-relaxed relative z-10">
                Bạn muốn liên hệ trực tiếp với <strong className="text-[hsl(211,100%,80%)]">{siteData.hero?.name || 'chúng tôi'}</strong>? Nhắn tin qua Zalo để được hỗ trợ nhanh nhất!
              </p>
              
              <a
                href={contactZaloLink}
                target="_blank"
                rel="noopener noreferrer"
                className="relative z-10 flex items-center justify-center gap-3 w-full bg-gradient-ocean text-white py-3.5 px-5 rounded-[1rem] font-semibold text-sm hover:scale-105 active:scale-95 transition-all shadow-lg shadow-[hsla(211,100%,50%,0.2)] group overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <svg viewBox="0 0 48 48" className="w-5 h-5 fill-current relative z-10">
                  <path d="M24 4C12.954 4 4 12.954 4 24s8.954 20 20 20 20-8.954 20-20S35.046 4 24 4zm9.585 27.469c-.465.723-1.442 1.327-2.163 1.535-.721.208-1.652.372-4.808-.938-4.032-1.675-6.617-5.478-6.818-5.732-.2-.255-1.639-2.175-1.639-4.149s1.035-2.943 1.407-3.348c.372-.405.809-.507.1078-.507.135 0 .254.006.363.012.116.006.273-.044.427.325.163.39.556 1.356.604 1.455.049.098.082.213.016.344-.065.13-.098.213-.196.329-.098.116-.207.259-.295.348-.098.098-.2.205-.086.401.116.196.515.85 1.103 1.376.757.676 1.395 1.085 1.591 1.205.196.121.31.098.425-.065.116-.163.493-.576.624-.775.131-.196.262-.163.441-.098.18.065 1.139.537 1.334.634.196.098.326.147.375.228.049.082.049.47-.116 1.193z"/>
                </svg>
                <span className="relative z-10">Kết bạn qua Zalo</span>
              </a>

              <p className="text-[11px] font-medium text-[hsl(211,100%,60%)] text-center relative z-10 uppercase tracking-widest">
                Phản hồi trong vòng 24h
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingActions;
