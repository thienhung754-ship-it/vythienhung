import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { useSiteData } from "@/contexts/SiteDataContext";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const } }
};

const About = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [expanded, setExpanded] = useState(false);
  const { siteData } = useSiteData();
  const about = siteData.about;
  const imageSrc = about.image;

  return (
    <section id="about" className="section-padding bg-black relative overflow-hidden" ref={ref}>
      {/* Top glow divider */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center mb-10 md:mb-16">
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-card mb-4 border border-[hsla(211,100%,50%,0.2)]">
            <div className="w-1.5 h-1.5 rounded-full bg-[hsl(211,100%,60%)] animate-pulse" />
            <span className="text-xs font-medium text-[hsl(211,100%,80%)] tracking-widest uppercase">{about.sectionLabel}</span>
          </div>
          
          <h2 className="text-2xl md:text-5xl font-bold tracking-tight text-foreground">
            {about.heading}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-20 items-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="order-2 md:order-1">
            
            <div className="space-y-5 md:space-y-6 text-sm md:text-base leading-relaxed text-muted-foreground/90">
              {/* Always visible paragraphs */}
              {about.paragraphsVisible.map((p, i) => (
                <p key={`v-${i}`}>{p}</p>
              ))}

              {/* Collapsible content */}
              <AnimatePresence>
                {expanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="overflow-hidden space-y-5 md:space-y-6"
                  >
                    {about.paragraphsCollapsed.map((p, i) => (
                      <p key={`c-${i}`}>{p}</p>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Toggle button */}
              {about.paragraphsCollapsed.length > 0 && (
                <button
                  onClick={() => setExpanded(!expanded)}
                  className="flex items-center gap-2 text-sm font-medium text-[hsl(211,100%,60%)] hover:text-[hsl(211,100%,80%)] transition-colors duration-300 group mt-4"
                >
                  {expanded ? "Thu gọn" : "Đọc thêm"}
                  <motion.div
                    animate={{ rotate: expanded ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform duration-200" />
                  </motion.div>
                </button>
              )}
            </div>
          </motion.div>

          {/* Image column - always show, elegant placeholder when no image */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            transition={{ delay: 0.2 }}
            className="order-1 md:order-2 relative group h-full">
            
            {/* Glow behind image */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[hsl(211,100%,50%)] to-[hsl(211,100%,30%)] opacity-20 blur-2xl rounded-[2rem] -z-10 translate-y-4 translate-x-4 group-hover:opacity-30 group-hover:translate-y-2 group-hover:translate-x-2 transition-all duration-700" />
            
            <div className="rounded-2xl md:rounded-[2rem] overflow-hidden glass-card p-2 border-[hsla(211,100%,50%,0.2)] h-full min-h-[280px] md:min-h-[400px] flex">
              {imageSrc ? (
                <img
                  src={imageSrc}
                  alt={about.heading}
                  className="w-full h-auto object-cover rounded-xl md:rounded-[1.5rem] grayscale-[0.2] contrast-125 hover:grayscale-0 transition-all duration-700"
                  loading="lazy" />
              ) : (
                <div className="w-full h-full min-h-[280px] md:min-h-[400px] rounded-xl md:rounded-[1.5rem] bg-gradient-to-br from-[hsl(211,100%,8%)] via-[hsl(220,60%,10%)] to-[hsl(211,80%,6%)] flex items-center justify-center border border-[hsla(211,100%,50%,0.08)]">
                  <div className="text-center space-y-3 opacity-40">
                    <div className="w-16 h-16 mx-auto rounded-2xl bg-[hsla(211,100%,50%,0.1)] flex items-center justify-center">
                      <div className="w-8 h-0.5 bg-[hsla(211,100%,50%,0.3)] rounded-full" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;