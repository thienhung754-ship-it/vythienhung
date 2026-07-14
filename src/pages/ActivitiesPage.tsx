import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useSiteData } from "@/contexts/SiteDataContext";

const ActivitiesPage = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const { siteData } = useSiteData();
  const networkingPhotos = siteData.networkingPhotos || [];

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
                Hoạt động
              </p>
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-6">
                Các hoạt động của Vy Thiên Hùng
              </h1>
              <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Những khoảnh khắc đáng nhớ trong hành trình kết nối cộng đồng, chia sẻ kiến thức và đóng góp cho xã hội.
              </p>
            </motion.div>

            {/* Photo Gallery */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5 mt-16">
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
      </div>
      <Footer />
    </div>
  );
};

export default ActivitiesPage;
