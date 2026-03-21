import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useSiteData } from "@/contexts/SiteDataContext";

const VibeCodingPage = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const { siteData } = useSiteData();
  const groups = siteData.vibeCodingGroups || [];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-12">
        <section className="section-padding" ref={ref}>
          <div className="max-w-4xl mx-auto">
            {/* Back link */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Link
                to="/community"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 mb-8"
              >
                <ArrowLeft className="w-4 h-4" />
                Quay lại Cộng đồng
              </Link>
            </motion.div>

            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
              className="text-center mb-6"
            >
              {/* Banner */}
              <div className="rounded-2xl overflow-hidden mb-10 max-w-2xl mx-auto">
                <img
                  src="/vibe-coding.jpg"
                  alt="Vibe Coding Community"
                  className="w-full h-auto"
                  loading="lazy"
                />
              </div>

              <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">
                Cộng Đồng Chia Sẻ Vibe Coding
              </h1>
              <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Chọn nhóm phù hợp với trình độ của bạn để nhận được sự hỗ trợ tốt nhất trên hành trình Vibe Coding cùng AI.
              </p>
            </motion.div>

            {/* Group cards */}
            <div className="grid md:grid-cols-2 gap-6 mt-12">
              {groups.map((group, i) => (
                <motion.a
                  key={group.title + i}
                  href={group.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
                  className="group relative flex flex-col rounded-2xl border border-border bg-background overflow-hidden hover:border-foreground/20 hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
                >
                  <div className="p-7 flex flex-col flex-1">
                    {/* Title */}
                    <h3 className="text-xl font-bold text-foreground mb-1">
                      {group.title}
                    </h3>
                    <p className="text-sm text-muted-foreground font-medium mb-4">
                      {group.subtitle}
                    </p>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                      {group.description}
                    </p>

                    {/* Features */}
                    <div className="space-y-2.5 mb-6 flex-1">
                      {group.features.map((feature) => (
                        <div key={feature} className="flex items-center gap-2.5">
                          <div className="w-1.5 h-1.5 rounded-full bg-foreground/40 shrink-0" />
                          <span className="text-sm text-muted-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* CTA */}
                    <div className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-foreground text-background text-sm font-semibold transition-all duration-300 group-hover:opacity-90 group-hover:gap-3">
                      {group.linkText}
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default VibeCodingPage;
