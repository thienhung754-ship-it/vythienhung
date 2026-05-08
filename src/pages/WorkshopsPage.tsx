import { motion, useInView } from "framer-motion";
import { useRef, useState, useMemo } from "react";
import { Calendar, MapPin, Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useSiteData } from "@/contexts/SiteDataContext";
import { WorkshopEvent } from "@/lib/siteData";
import FomoNotification from "@/components/FomoNotification";
import ShareButton from "@/components/ShareButton";

const STATUS_LABELS: Record<string, string> = {
  upcoming: "Sắp diễn ra",
  ongoing: "Đang diễn ra",
  completed: "Đã kết thúc",
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
};

const formatPrice = (price: number) => price.toLocaleString("vi-VN") + "đ";

const WorkshopsPage = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const { siteData } = useSiteData();
  const workshops: WorkshopEvent[] = siteData.workshops || [];
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");

  const categories = useMemo(() => {
    const cats = new Set(workshops.map((w) => w.category));
    return ["Tất cả", ...Array.from(cats)];
  }, [workshops]);

  const filteredWorkshops = useMemo(() => {
    if (selectedCategory === "Tất cả") return workshops;
    return workshops.filter((w) => w.category === selectedCategory);
  }, [workshops, selectedCategory]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-12">
        <section className="section-padding" ref={ref}>
          <div className="max-w-5xl mx-auto">
            {/* Header — same style as CommunityPage */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
              className="text-center mb-6"
            >
              <p className="text-sm text-muted-foreground tracking-widest uppercase mb-3">
                Sự kiện
              </p>
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-6">
                Workshop & Sự Kiện
              </h1>
              <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Tham gia các workshop thực chiến, khoá học chuyên sâu và talkshow về AI —
                được dẫn dắt bởi đội ngũ chuyên gia của chúng tôi.
              </p>
            </motion.div>

            {/* Category Filter — minimal pills */}
            {categories.length > 2 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex items-center justify-center gap-2 mb-12 flex-wrap"
              >
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-xl text-xs font-medium transition-all duration-200 ${
                      selectedCategory === cat
                        ? "bg-foreground text-background"
                        : "bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </motion.div>
            )}

            {/* Event Cards — clean card style matching CommunityPage */}
            <div className="grid md:grid-cols-2 gap-6 mt-10">
              {filteredWorkshops.map((workshop, i) => (
                <motion.div
                  key={workshop.slug}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  animate={inView ? "visible" : "hidden"}
                >
                  <Link
                    to={`/workshops/${workshop.slug}`}
                    className="group relative flex flex-col rounded-2xl border border-border bg-background overflow-hidden hover:border-foreground/20 hover:shadow-xl transition-all duration-500 hover:-translate-y-1 h-full"
                  >
                    {/* Image */}
                    {workshop.image ? (
                      <div className="relative w-full aspect-[21/9] overflow-hidden bg-secondary/30">
                        <img
                          src={workshop.image}
                          alt={workshop.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                    {/* Status badge on image + share button */}
                        <div className="absolute top-3 left-3">
                          <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-background/90 backdrop-blur-sm text-foreground uppercase tracking-wider">
                            {STATUS_LABELS[workshop.status] || workshop.status}
                          </span>
                        </div>
                        <div className="absolute top-3 right-3">
                          <ShareButton slug={workshop.slug} title={workshop.title} compact />
                        </div>
                      </div>
                    ) : (
                      <div className="relative w-full aspect-[21/9] bg-secondary/30 flex items-center justify-center">
                        <Calendar className="w-12 h-12 text-muted-foreground/30" />
                        <div className="absolute top-3 left-3">
                          <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-background/90 text-foreground uppercase tracking-wider">
                            {STATUS_LABELS[workshop.status] || workshop.status}
                          </span>
                        </div>
                        <div className="absolute top-3 right-3">
                          <ShareButton slug={workshop.slug} title={workshop.title} compact />
                        </div>
                      </div>
                    )}

                    {/* Content */}
                    <div className="p-6 flex flex-col flex-1">
                      {/* Category */}
                      <span className="text-[10px] text-muted-foreground uppercase tracking-widest mb-2">
                        {workshop.category}
                      </span>

                      {/* Title */}
                      <h3 className="text-lg font-semibold text-foreground mb-1.5">
                        {workshop.title}
                      </h3>

                      {/* Subtitle */}
                      <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
                        {workshop.subtitle || workshop.description}
                      </p>

                      {/* Meta */}
                      <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-muted-foreground mb-4">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5" />
                          {workshop.date}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" />
                          {workshop.time}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5" />
                          {workshop.location}
                        </span>
                      </div>

                      {/* CTA + Rating */}
                      <div className="flex items-center justify-between pt-4 border-t border-border">
                        {/* 5-star rating + count */}
                        <div className="flex items-center gap-1.5">
                          <div className="flex items-center gap-0.5">
                            {[1,2,3,4,5].map((star) => (
                              <svg key={star} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-yellow-400">
                                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                              </svg>
                            ))}
                          </div>
                          {workshop.reviewCount && (
                            <span className="text-xs text-muted-foreground">({workshop.reviewCount})</span>
                          )}
                        </div>
                        <span className="inline-flex items-center gap-2 text-sm font-medium text-foreground group-hover:gap-3 transition-all duration-300">
                          Xem chi tiết
                          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            {filteredWorkshops.length === 0 && (
              <div className="text-center py-16">
                <p className="text-muted-foreground">Chưa có sự kiện nào trong mục này.</p>
              </div>
            )}
          </div>
        </section>
      </div>
      <Footer />
      <FomoNotification />
    </div>
  );
};

export default WorkshopsPage;
