import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { useSiteData } from "@/contexts/SiteDataContext";

const Blog = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const { siteData } = useSiteData();
  const posts = siteData.blog;

  const categories = [...new Set(posts.map((p) => p.category))];

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section id="blog" className="section-padding bg-secondary/40" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <p className="text-sm text-muted-foreground tracking-widest uppercase mb-3">Góc nhìn</p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
            Chuyên gia chia sẻ
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((cat) => (
            <span
              key={cat}
              className="px-4 py-1.5 text-xs font-medium rounded-full border border-border text-muted-foreground"
            >
              {cat}
            </span>
          ))}
        </motion.div>

        <div className="space-y-1">
          {posts.map((post, i) => (
            <motion.article
              key={post.title + i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
              className="py-8 border-b border-border last:border-b-0"
            >
              <div
                className="flex items-start justify-between gap-4 cursor-pointer group"
                onClick={() => toggleExpand(i)}
              >
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
                    {post.category}
                  </p>
                  <h3 className="text-lg md:text-xl font-semibold text-foreground group-hover:text-apple-blue transition-colors duration-300 mb-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
                    {post.excerpt}
                  </p>
                </div>
                <div className="flex items-center gap-3 mt-1 shrink-0">
                  <span className="text-xs text-muted-foreground">{post.date}</span>
                  <motion.div
                    animate={{ rotate: expandedIndex === i ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                  >
                    <ChevronDown className="w-5 h-5 text-muted-foreground" />
                  </motion.div>
                </div>
              </div>

              <AnimatePresence>
                {expandedIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="overflow-hidden"
                  >
                    <div className="pt-6 pb-2 pl-0 md:pl-0">
                      <div className="bg-background/60 rounded-xl p-6 md:p-8 border border-border/50">
                        {post.content.split("\n\n").map((paragraph, pIdx) => (
                          <p
                            key={pIdx}
                            className="text-sm md:text-base text-muted-foreground leading-relaxed mb-4 last:mb-0"
                          >
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
