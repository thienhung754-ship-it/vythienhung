import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { Users, MessageCircle, Globe, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useSiteData } from "@/contexts/SiteDataContext";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
};

const CardInner = ({ community }: { community: { name: string; description: string; members: string; image: string; linkText: string } }) => (
  <>
    {community.image ? (
      <div className="relative w-full h-40 overflow-hidden bg-neutral-900">
        <img
          src={community.image}
          alt={community.name}
          className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>
    ) : null}

    <div className="p-6 flex flex-col flex-1">
      <h3 className="text-lg font-semibold text-foreground mb-2">{community.name}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed mb-5 flex-1">{community.description}</p>
      <div className="flex items-center gap-2 mb-5">
        <Users className="w-4 h-4 text-muted-foreground" />
        <span className="text-xs font-medium text-muted-foreground">{community.members} thành viên</span>
      </div>
      <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-foreground text-background text-sm font-medium transition-all duration-300 group-hover:opacity-90 group-hover:gap-3">
        {community.linkText}
        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
      </div>
    </div>
  </>
);

const CommunityPage = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [showQR, setShowQR] = useState(false);
  const { siteData } = useSiteData();
  const communities = siteData.communities;
  const networkingPhotos = siteData.networkingPhotos || [];
  const zaloContact = siteData.zaloLinks?.contactZalo || "https://zalo.me/0763068614";

  const cardClass = "group relative flex flex-col rounded-2xl border border-border bg-background overflow-hidden hover:border-foreground/20 hover:shadow-xl transition-all duration-500 hover:-translate-y-1";

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
                Kết nối
              </p>
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-6">
                Cộng đồng của tôi
              </h1>
              <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Tham gia cộng đồng để cùng nhau học hỏi, chia sẻ kiến thức về AI và Công nghệ,
                kết nối với những người cùng chí hướng trên hành trình làm chủ kỷ nguyên số.
              </p>
            </motion.div>

            {/* Community Cards */}
            <div className="grid md:grid-cols-3 gap-6 mt-16">
              {communities.map((community, i) =>
                community.internal ? (
                  <motion.div
                    key={community.name + i}
                    custom={i}
                    variants={fadeUp}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                  >
                    <Link to={community.link} className={cardClass + " h-full"}>
                      <CardInner community={community} />
                    </Link>
                  </motion.div>
                ) : (
                  <motion.a
                    key={community.name + i}
                    href={community.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    custom={i}
                    variants={fadeUp}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    className={cardClass}
                  >
                    <CardInner community={community} />
                  </motion.a>
                )
              )}
            </div>

            {/* Photo Gallery */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-20"
            >
              <div className="text-center mb-10">
                <p className="text-sm text-muted-foreground tracking-widest uppercase mb-3">
                  Hoạt động
                </p>
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
                  Khoảnh khắc hoạt động
                </h2>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                {networkingPhotos.map((photo, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                    className="group"
                  >
                    <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-border bg-secondary/40">
                      <img
                        src={photo.image}
                        alt={photo.caption}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                    <p className="text-sm text-muted-foreground text-center mt-3 px-2 leading-snug">
                      {photo.caption}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Bottom Contact Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-20 text-center"
            >
              <div className="inline-block rounded-2xl bg-secondary/60 border border-border px-8 py-8 md:px-12 md:py-10">
                <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3">
                  Bạn muốn hợp tác hoặc có câu hỏi?
                </h3>
                <p className="text-sm text-muted-foreground mb-6 max-w-md mx-auto">
                  Liên hệ trực tiếp với Vy Thiên Hùng để trao đổi về cơ hội hợp tác, tư vấn AI hoặc bất kỳ thắc mắc nào.
                </p>

                <button
                  onClick={() => setShowQR(!showQR)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-foreground text-background text-sm font-medium hover:opacity-90 transition-opacity duration-300"
                >
                  <MessageCircle className="w-4 h-4" />
                  {showQR ? "Ẩn mã QR" : "Kết bạn qua Zalo"}
                </button>

                <AnimatePresence>
                  {showQR && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, scale: 0.9 }}
                      animate={{ opacity: 1, height: "auto", scale: 1 }}
                      exit={{ opacity: 0, height: 0, scale: 0.9 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="mt-6 flex flex-col items-center"
                    >
                      <div className="bg-background p-6 rounded-2xl border border-border shadow-lg">
                        <QRCodeSVG
                          value={zaloContact}
                          size={180}
                          bgColor="transparent"
                          fgColor="hsl(var(--foreground))"
                          level="H"
                        />
                      </div>
                      <p className="text-muted-foreground text-sm mt-4">
                        Quét mã QR để kết bạn Zalo
                      </p>
                      <a
                        href={zaloContact}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-muted-foreground/60 mt-2 hover:text-foreground transition-colors underline"
                      >
                        Hoặc bấm vào đây
                      </a>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default CommunityPage;
