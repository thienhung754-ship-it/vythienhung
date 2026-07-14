import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Newspaper, Shield, Tv, Radio, Globe, Camera } from "lucide-react";
import { useSiteData } from "@/contexts/SiteDataContext";
import type { LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Newspaper, Shield, Tv, Radio, Globe, Camera,
};

const Press = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { siteData } = useSiteData();
  const pressItems = siteData.press;

  return (
    <section id="press" className="section-padding bg-secondary/40" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-sm text-muted-foreground tracking-widest uppercase mb-3">
            Truyền thông
          </p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
            Báo chí nói gì về Vy Thiên Hùng
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {pressItems.map((item, i) => {
            const IconComponent = iconMap[item.iconName] || Newspaper;
            return (
              <motion.a
                key={item.title + i}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.15 }}
                className="group block rounded-2xl border border-border bg-background/80 backdrop-blur-sm overflow-hidden hover:border-foreground/20 hover:shadow-lg transition-all duration-500 hover:-translate-y-1"
              >
                {/* Thumbnail Image */}
                <div className="relative w-full h-48 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className={`absolute top-3 left-3 inline-flex items-center justify-center w-9 h-9 rounded-lg bg-background/90 backdrop-blur-sm shadow-sm`}>
                    <IconComponent className={`w-4 h-4 ${item.iconColor}`} />
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2 font-medium">
                    {item.source}
                  </p>

                  <h3 className="text-base font-semibold text-foreground mb-3 group-hover:text-apple-blue transition-colors duration-300 leading-snug line-clamp-2">
                    {item.title}
                  </h3>

                  <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2">
                    {item.description}
                  </p>

                  <span className="inline-flex items-center text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                    Đọc thêm
                    <svg className="w-3.5 h-3.5 ml-1.5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Press;
