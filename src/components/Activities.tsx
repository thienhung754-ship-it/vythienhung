import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useSiteData } from "@/contexts/SiteDataContext";

const Activities = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { siteData } = useSiteData();
  const networkingPhotos = siteData.networkingPhotos || [];

  if (networkingPhotos.length === 0) return null;

  return (
    <section className="section-padding relative bg-[black]" ref={ref}>
      <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-[hsla(211,100%,50%,0.1)] to-transparent" />
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-card mb-4 border border-[hsla(211,100%,50%,0.2)]">
            <div className="w-1.5 h-1.5 rounded-full bg-[hsl(211,100%,60%)] animate-pulse" />
            <span className="text-xs font-medium text-[hsl(211,100%,80%)] tracking-widest uppercase">Hoạt động</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
            Các hoạt động của {siteData.hero?.name || 'chúng tôi'}
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {networkingPhotos.map((photo, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-bl from-[hsl(211,100%,50%)] to-[hsl(211,100%,30%)] opacity-0 group-hover:opacity-20 blur-xl rounded-[1.5rem] transition-opacity duration-500" />
              <div className="relative aspect-[4/3] rounded-[1.5rem] overflow-hidden glass-card p-1">
                <img
                  src={photo.image}
                  alt={photo.caption}
                  className="w-full h-full object-cover rounded-[1.2rem] transition-transform duration-700 group-hover:scale-105 group-hover:rotate-1"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[black] via-transparent to-transparent opacity-60 rounded-[1.2rem] pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 text-center">
                  <p className="text-sm font-medium text-white drop-shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
                    {photo.caption}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Activities;
