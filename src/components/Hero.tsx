import { motion } from "framer-motion";
import { useSiteData } from "@/contexts/SiteDataContext";
import { ArrowDown } from "lucide-react";

const Hero = () => {
  const { siteData } = useSiteData();
  const hero = siteData.hero;
  const stats = (siteData as any).stats;
  const avatarSrc = hero.avatar;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden ocean-mesh">
      {/* Deep gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-[black]" />

      {/* Floating accent orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[hsla(211,100%,50%,0.03)] blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-[hsla(211,100%,40%,0.03)] blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[hsla(211,100%,30%,0.02)] blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-5 md:px-6 text-center">
        {/* Avatar with glow ring */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-8 md:mb-10"
        >
          <div className="relative w-28 h-28 md:w-44 md:h-44 mx-auto">
            {/* Glow ring */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[hsl(211,100%,50%)] via-[hsl(211,100%,40%)] to-[hsl(211,100%,30%)] opacity-30 blur-lg animate-pulse" />
            <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-[hsla(211,100%,50%,0.3)] p-[2px] bg-[black]">
              {avatarSrc ? (
                <img
                  src={avatarSrc}
                  alt={hero.name}
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <div className="w-full h-full rounded-full bg-gradient-to-br from-[hsl(211,100%,12%)] via-[hsl(220,80%,10%)] to-[hsl(211,100%,6%)] border border-[hsla(211,100%,50%,0.1)]" />
              )}
            </div>
            {/* Status dot */}
            <div className="absolute bottom-2 right-2 glow-dot" />
          </div>
        </motion.div>


        {/* Name with gradient */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-4xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-3 md:mb-4"
        >
          <span className="text-gradient-ocean">{hero.name}</span>
        </motion.h1>

        {/* Title */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="text-sm md:text-xl font-medium text-muted-foreground mb-4 md:mb-6"
        >
          {hero.title}
        </motion.p>

        {/* Bio */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="text-sm md:text-lg text-muted-foreground/70 max-w-2xl mx-auto mb-8 md:mb-12 leading-relaxed"
        >
          {hero.bio}
        </motion.p>

        {/* Stats Bar */}
        {stats && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.65 }}
            className="inline-flex items-center rounded-2xl glass-card overflow-hidden mb-8 md:mb-12"
          >
            {stats.experience && (
              <div className="stat-item">
                <p className="text-2xl md:text-4xl font-bold text-gradient-ocean">{stats.experience}</p>
                <p className="text-[10px] md:text-xs text-muted-foreground mt-1">{stats.experienceLabel}</p>
              </div>
            )}
            {stats.clients && (
              <div className="stat-item">
                <p className="text-2xl md:text-4xl font-bold text-gradient-ocean">{stats.clients}</p>
                <p className="text-[10px] md:text-xs text-muted-foreground mt-1">{stats.clientsLabel}</p>
              </div>
            )}
            {stats.projects && (
              <div className="stat-item">
                <p className="text-2xl md:text-4xl font-bold text-gradient-ocean">{stats.projects}</p>
                <p className="text-[10px] md:text-xs text-muted-foreground mt-1">{stats.projectsLabel}</p>
              </div>
            )}
          </motion.div>
        )}

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.75 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4"
        >
          <a
            href="#ecosystem"
            className="w-full sm:w-auto px-8 py-3 md:py-3.5 bg-gradient-ocean text-white rounded-full text-sm font-semibold hover:opacity-90 transition-all duration-300 shadow-lg shadow-[hsla(211,100%,50%,0.2)] text-center"
          >
            Dịch vụ của tôi
          </a>
          <a
            href="#about"
            className="w-full sm:w-auto px-8 py-3 md:py-3.5 glass-card rounded-full text-sm font-medium text-foreground hover:border-[hsla(211,100%,50%,0.3)] transition-all duration-300 flex items-center justify-center gap-2"
          >
            Tìm hiểu thêm
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </a>
        </motion.div>
      </div>

      {/* Bottom glow line */}
      <div className="absolute bottom-0 left-0 right-0 glow-line" />
    </section>
  );
};

export default Hero;