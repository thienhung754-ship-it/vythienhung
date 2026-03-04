import { motion } from "framer-motion";
import hungPortrait from "@/assets/hung-portrait.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center section-padding overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-secondary/30" />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-8"
        >
          <div className="w-32 h-32 md:w-40 md:h-40 mx-auto rounded-full overflow-hidden mb-10 ring-1 ring-border">
            <img
              src={hungPortrait}
              alt="Vy Thiên Hùng"
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-foreground mb-4"
        >
          Vy Thiên Hùng
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-muted-foreground font-medium mb-6"
        >
          Engineering Manager · Founder @ MERCY TECH GLOBAL
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-base md:text-lg text-muted-foreground/80 max-w-xl mx-auto mb-10 leading-relaxed"
        >
          Kỹ sư công nghệ tiên phong trong lĩnh vực AI Vật lý và Định danh số.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#about"
            className="px-8 py-3 bg-foreground text-primary-foreground rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Tìm hiểu thêm
          </a>
          <a
            href="#ecosystem"
            className="px-8 py-3 border border-border rounded-full text-sm font-medium text-foreground hover:bg-secondary transition-colors"
          >
            Khám phá dự án
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
