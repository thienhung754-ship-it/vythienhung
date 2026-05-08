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

  if (!pressItems || pressItems.length === 0) return null;

  return (
    <section id="press" className="section-padding bg-[black] relative" ref={ref}>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[hsla(211,100%,50%,0.2)] to-transparent" />
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-card mb-4 border border-[hsla(211,100%,50%,0.2)]">
            <div className="w-1.5 h-1.5 rounded-full bg-[hsl(211,100%,60%)] animate-pulse" />
            <span className="text-xs font-medium text-[hsl(211,100%,80%)] tracking-widest uppercase">Truyền thông</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
            Báo chí nói gì về {siteData.hero?.name || 'chúng tôi'}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
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
                className="group block rounded-[1.5rem] glass-card overflow-hidden hover:border-[hsla(211,100%,50%,0.3)] transition-all duration-500 hover:-translate-y-2 relative"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-[black] via-transparent to-transparent opacity-80 z-10" />
                
                {/* Thumbnail Image */}
                <div className="relative w-full h-48 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
                    loading="lazy"
                  />
                  <div className={`absolute top-4 left-4 z-20 inline-flex items-center justify-center w-10 h-10 rounded-xl glass-card border border-[hsla(211,100%,50%,0.2)] shadow-lg`}>
                    <IconComponent className={`w-5 h-5 ${item.iconColor || 'text-[hsl(211,100%,60%)]'}`} />
                  </div>
                </div>

                {/* Content */}
                <div className="relative z-20 p-6 -mt-8 bg-gradient-to-b from-transparent to-[black]">
                  <p className="text-xs font-semibold text-[hsl(211,100%,60%)] uppercase tracking-wider mb-2 drop-shadow-md">
                    {item.source}
                  </p>

                  <h3 className="text-lg font-bold text-foreground mb-3 group-hover:text-[hsl(211,100%,60%)] transition-colors duration-300 leading-snug line-clamp-2">
                    {item.title}
                  </h3>

                  <p className="text-sm text-muted-foreground/90 leading-relaxed mb-4 line-clamp-2">
                    {item.description}
                  </p>

                  <div className="inline-flex items-center text-sm font-medium text-muted-foreground group-hover:text-[hsl(211,100%,80%)] transition-colors duration-300">
                    Đọc thêm
                    <svg className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
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
