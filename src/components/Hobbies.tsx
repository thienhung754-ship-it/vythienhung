import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useSiteData } from "@/contexts/SiteDataContext";

const Hobbies = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { siteData } = useSiteData();
  const hobbies = siteData.hobbies;
  const imageSrc = hobbies.image;

  return (
    <section className="section-padding relative overflow-hidden bg-[black]" ref={ref}>
      <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-[hsla(211,100%,50%,0.1)] to-transparent" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-10 md:mb-16">
          
          <h2 className="text-2xl md:text-5xl font-bold tracking-tight text-foreground">Điểm Khác Biệt</h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-20 items-center">
          {/* Image column - always show with elegant placeholder when no image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative group h-full hidden md:block">
            
            <div className="absolute inset-0 bg-gradient-to-bl from-[hsl(211,100%,50%)] to-[hsl(211,100%,30%)] opacity-20 blur-2xl rounded-[2rem] -z-10 translate-y-4 -translate-x-4 group-hover:opacity-30 transition-all duration-700" />
            
            <div className="rounded-2xl md:rounded-[2rem] overflow-hidden glass-card p-2 border-[hsla(211,100%,50%,0.2)] h-full min-h-[400px] flex">
              <div className="relative overflow-hidden rounded-xl md:rounded-[1.5rem] w-full h-full flex items-center justify-center bg-[black]">
                {imageSrc ? (
                  <>
                    <img
                      src={imageSrc}
                      alt={`${siteData.hero?.name || 'Profile'}`}
                      className="w-full h-full min-h-[400px] object-cover grayscale-[0.3] contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                      loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[black] via-transparent to-transparent opacity-60" />
                  </>
                ) : (
                  <div className="w-full h-full min-h-[400px] rounded-xl md:rounded-[1.5rem] bg-gradient-to-br from-[hsl(211,100%,8%)] via-[hsl(220,60%,10%)] to-[hsl(211,80%,6%)] flex items-center justify-center border border-[hsla(211,100%,50%,0.08)]">
                    <div className="text-center space-y-3 opacity-40">
                      <div className="w-16 h-16 mx-auto rounded-2xl bg-[hsla(211,100%,50%,0.1)] flex items-center justify-center">
                        <div className="w-8 h-0.5 bg-[hsla(211,100%,50%,0.3)] rounded-full" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col justify-center space-y-4 md:space-y-6">
            
            {hobbies.sections.map((section, i) => (
              <motion.div 
                key={i}
                whileHover={{ x: 10 }}
                className="relative p-4 md:p-6 rounded-xl md:rounded-[1.5rem] glass-card border-[hsla(211,100%,50%,0.1)] hover:border-[hsla(211,100%,50%,0.3)] transition-all duration-300 group"
              >
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[hsl(211,100%,50%)] to-[hsl(211,100%,40%)] opacity-50 group-hover:opacity-100 rounded-l-xl md:rounded-l-[1.5rem] transition-opacity" />
                <div className="flex items-start gap-3 md:gap-4">
                  <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-[hsla(211,100%,50%,0.1)] flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-[hsl(211,100%,60%)] font-bold text-xs md:text-sm">0{i + 1}</span>
                  </div>
                  <div>
                    <h3 className="text-base md:text-xl font-bold text-foreground mb-1 md:mb-2 group-hover:text-[hsl(211,100%,60%)] transition-colors">{section.title}</h3>
                    <p className="text-xs md:text-sm text-muted-foreground/90 leading-relaxed">{section.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hobbies;