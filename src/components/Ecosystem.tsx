import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { Globe, Users, Layers, FlaskConical, Cpu, Shield, Zap, Code, Database, Cloud, Target, TrendingUp, ShoppingBag, Video, Bot, RefreshCw, GraduationCap, X } from "lucide-react";
import { useSiteData } from "@/contexts/SiteDataContext";
import type { LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Globe, Users, Layers, FlaskConical, Cpu, Shield, Zap, Code, Database, Cloud, Target, TrendingUp, ShoppingBag, Video, Bot, RefreshCw, GraduationCap,
};

const Ecosystem = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { siteData } = useSiteData();
  const products = siteData.ecosystem;
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <section id="ecosystem" className="section-padding relative overflow-hidden" ref={ref}>
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full bg-[hsla(211,100%,50%,0.02)] blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full bg-[hsla(211,100%,30%,0.02)] blur-[80px] pointer-events-none" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-10 md:mb-16">
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-card mb-4 border border-[hsla(211,100%,50%,0.2)]">
            <div className="w-1.5 h-1.5 rounded-full bg-[hsl(211,100%,60%)] animate-pulse" />
            <span className="text-xs font-medium text-[hsl(211,100%,80%)] tracking-widest uppercase">Dịch vụ</span>
          </div>

          <h2 className="text-2xl md:text-5xl font-bold tracking-tight text-foreground">
            {siteData.footer?.companyName || 'THE BLUE OCEAN GROUP'}
          </h2>
        </motion.div>

        {/* 3x3 grid on ALL screens */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-5 lg:gap-6">
          {products.map((product, i) => {
            const IconComponent = iconMap[product.icon] || Globe;
            const isExpanded = expandedIndex === i;
            return (
              <motion.div
                key={product.title + i}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.06 }}
                onClick={() => setExpandedIndex(isExpanded ? null : i)}
                className="group relative p-3 sm:p-4 md:p-6 lg:p-8 rounded-xl sm:rounded-2xl md:rounded-[2rem] glass-card border-[hsla(211,100%,50%,0.1)] hover:border-[hsla(211,100%,50%,0.3)] flex flex-col items-center md:items-start text-center md:text-left h-full cursor-pointer active:scale-[0.97] transition-all duration-200"
              >
                {/* Glow effect on hover */}
                <div className="absolute inset-0 rounded-xl sm:rounded-2xl md:rounded-[2rem] bg-gradient-to-br from-[hsla(211,100%,50%,0.05)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative w-9 h-9 sm:w-10 sm:h-10 md:w-14 md:h-14 rounded-lg sm:rounded-xl md:rounded-2xl bg-[#111] border border-[hsla(211,100%,50%,0.2)] flex items-center justify-center mb-2 sm:mb-3 md:mb-6 group-hover:scale-110 group-hover:border-[hsla(211,100%,50%,0.5)] group-hover:shadow-[0_0_20px_hsla(211,100%,50%,0.2)] transition-all duration-300">
                  <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 md:w-7 md:h-7 text-[hsl(211,100%,60%)]" strokeWidth={1.5} />
                </div>
                
                <h3 className="text-[9px] sm:text-[10px] md:text-sm lg:text-lg font-bold text-foreground mb-0 md:mb-2 group-hover:text-[hsl(211,100%,60%)] transition-colors duration-300 relative z-10 leading-tight">{product.title}</h3>
                
                {/* Desktop: always show subtitle + description */}
                <p className="hidden md:block text-[10px] font-semibold text-[hsl(211,100%,60%)] uppercase tracking-wider mb-3 md:mb-4 relative z-10">
                  {product.subtitle}
                </p>
                <p className="hidden md:block text-xs lg:text-sm text-muted-foreground/90 leading-relaxed relative z-10 mt-auto">{product.description}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile expanded detail panel */}
        <AnimatePresence>
          {expandedIndex !== null && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="md:hidden overflow-hidden mt-3"
            >
              <div className="relative p-5 rounded-2xl glass-card border border-[hsla(211,100%,50%,0.2)]">
                <button
                  onClick={(e) => { e.stopPropagation(); setExpandedIndex(null); }}
                  className="absolute top-3 right-3 w-7 h-7 rounded-full bg-[hsla(211,100%,50%,0.1)] flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
                
                <div className="flex items-center gap-3 mb-3">
                  {(() => {
                    const product = products[expandedIndex];
                    const IconComp = iconMap[product.icon] || Globe;
                    return (
                      <>
                        <div className="w-10 h-10 rounded-xl bg-[#111] border border-[hsla(211,100%,50%,0.2)] flex items-center justify-center">
                          <IconComp className="w-5 h-5 text-[hsl(211,100%,60%)]" strokeWidth={1.5} />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-foreground">{product.title}</h4>
                          <p className="text-[10px] font-semibold text-[hsl(211,100%,60%)] uppercase tracking-wider">
                            {product.subtitle}
                          </p>
                        </div>
                      </>
                    );
                  })()}
                </div>
                <p className="text-xs text-muted-foreground/90 leading-relaxed">
                  {products[expandedIndex].description}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Ecosystem;