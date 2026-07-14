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
    <section className="section-padding" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-sm text-muted-foreground tracking-widest uppercase mb-3">
            Hoạt động
          </p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
            Các hoạt động của Vy Thiên Hùng
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5">
          {networkingPhotos.map((photo, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
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
      </div>
    </section>
  );
};

export default Activities;
