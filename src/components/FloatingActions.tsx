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
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3 items-end">
        {/* Zalo Community Button */}
        <Link
          to={fa?.communityLink || "/community/vibe-coding"}
          className="group flex items-center gap-2 bg-foreground text-background p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          title="Tham gia cộng đồng"
        >
          <Users className="w-5 h-5" />
          <span className="max-w-0 overflow-hidden group-hover:max-w-[140px] transition-all duration-300 text-sm font-medium whitespace-nowrap">
            {fa?.communityLabel || "Cộng đồng"}
          </span>
        </Link>

        {/* Zalo Contact Button */}
        <button
          onClick={() => setContactOpen(!contactOpen)}
          className="relative bg-foreground text-background p-3.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          title="Liên hệ qua Zalo"
        >
          {contactOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <>
              <MessageCircle className="w-5 h-5" />
              <span className="absolute top-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
            </>
          )}
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
            className="fixed bottom-24 right-6 z-50 w-[320px] max-w-[calc(100vw-3rem)] rounded-2xl border border-border bg-background shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-foreground text-background px-5 py-4 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-background/20 flex items-center justify-center">
                <MessageCircle className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold">Liên hệ</p>
                <p className="text-xs opacity-70">Kết nối trực tiếp</p>
              </div>
              <button
                onClick={() => setContactOpen(false)}
                className="p-1 rounded-lg hover:bg-background/10 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <div className="p-5 space-y-4">
              <p className="text-sm text-muted-foreground leading-relaxed">
                Bạn muốn liên hệ trực tiếp với <strong className="text-foreground">Vy Thiên Hùng</strong>? Nhắn tin qua Zalo để được hỗ trợ nhanh nhất!
              </p>
              
              <a
                href={contactZaloLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full bg-foreground text-background py-3.5 px-5 rounded-xl font-medium text-sm hover:opacity-90 transition-opacity"
              >
                <svg viewBox="0 0 48 48" className="w-5 h-5 fill-current">
                  <path d="M24 4C12.954 4 4 12.954 4 24s8.954 20 20 20 20-8.954 20-20S35.046 4 24 4zm9.585 27.469c-.465.723-1.442 1.327-2.163 1.535-.721.208-1.652.372-4.808-.938-4.032-1.675-6.617-5.478-6.818-5.732-.2-.255-1.639-2.175-1.639-4.149s1.035-2.943 1.407-3.348c.372-.405.809-.507.1078-.507.135 0 .254.006.363.012.116.006.273-.044.427.325.163.39.556 1.356.604 1.455.049.098.082.213.016.344-.065.13-.098.213-.196.329-.098.116-.207.259-.295.348-.098.098-.2.205-.086.401.116.196.515.85 1.103 1.376.757.676 1.395 1.085 1.591 1.205.196.121.31.098.425-.065.116-.163.493-.576.624-.775.131-.196.262-.163.441-.098.18.065 1.139.537 1.334.634.196.098.326.147.375.228.049.082.049.47-.116 1.193z"/>
                </svg>
                Kết bạn qua Zalo
              </a>

              <p className="text-xs text-muted-foreground text-center">
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
