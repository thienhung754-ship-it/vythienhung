import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Globe, Users, Layers, FlaskConical, Cpu, Shield, Zap, Code, Database, Cloud } from "lucide-react";
import { useSiteData } from "@/contexts/SiteDataContext";
import type { LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Globe, Users, Layers, FlaskConical, Cpu, Shield, Zap, Code, Database, Cloud,
};

const Ecosystem = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { siteData } = useSiteData();
  const products = siteData.ecosystem;

  return (
    <section id="ecosystem" className="section-padding" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16">
          
          <p className="text-sm text-muted-foreground tracking-widest uppercase mb-3">Hệ sinh thái</p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
            MERCY TECH GLOBAL
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 gap-3 md:gap-6">
          {products.map((product, i) => {
            const IconComponent = iconMap[product.icon] || Globe;
            return (
              <motion.div
                key={product.title + i}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="group p-4 md:p-8 rounded-2xl bg-secondary/50 hover:bg-secondary transition-colors duration-500 border-0">
                
                <IconComponent className="w-6 h-6 md:w-8 md:h-8 text-foreground mb-3 md:mb-6" strokeWidth={1.5} />
                <h3 className="text-sm md:text-lg font-semibold text-foreground mb-1">{product.title}</h3>
                <p className="text-[10px] md:text-xs text-muted-foreground uppercase tracking-wider mb-2 md:mb-4">
                  {product.subtitle}
                </p>
                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">{product.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>);

};

export default Ecosystem;