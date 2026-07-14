import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import hungOffice from "@/assets/hung-office.jpg";
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
  const imageSrc = about.image || hungOffice;

  return (
    <section id="about" className="section-padding bg-secondary/40" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center mb-16">
          
          <p className="text-sm text-muted-foreground tracking-widest uppercase mb-3">{about.sectionLabel}</p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
            {about.heading}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="order-2 md:order-1">
            
            <div className="space-y-6 text-base leading-relaxed text-muted-foreground">
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
                    className="overflow-hidden space-y-6"
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
                  className="flex items-center gap-2 text-sm font-medium text-foreground/70 hover:text-foreground transition-colors duration-300 group"
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

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            transition={{ delay: 0.2 }}
            className="order-1 md:order-2">
            
            <div className="rounded-2xl overflow-hidden">
              <img
                src={imageSrc}
                alt={about.heading}
                className="w-full h-auto object-cover"
                loading="lazy" />
              
            </div>
          </motion.div>
        </div>
      </div>
    </section>);

};

export default About;