import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const categories = ["Công nghệ & AI", "Quản trị Vận hành", "Sáng tạo & Thẩm mỹ"];

const posts = [
  {
    category: "Công nghệ & AI",
    title: "Physical AI: Khi trí tuệ nhân tạo bước ra thế giới thực",
    excerpt: "Khám phá xu hướng AI Vật lý và cách nó thay đổi tương tác giữa con người với máy móc.",
    date: "2026",
  },
  {
    category: "Quản trị Vận hành",
    title: "Đạt điểm hòa vốn trong 6 tháng — Chiến lược thực chiến",
    excerpt: "Chia sẻ framework quản trị giúp startup đạt break-even nhanh chóng với nguồn lực tối thiểu.",
    date: "2026",
  },
  {
    category: "Sáng tạo & Thẩm mỹ",
    title: "Ứng dụng AI trong thiết kế: Từ ý tưởng đến sản phẩm",
    excerpt: "Cách tận dụng AI generative để nâng cao quy trình sáng tạo và thiết kế sản phẩm số.",
    date: "2025",
  },
];

const Blog = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

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
              key={post.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
              className="group py-8 border-b border-border last:border-b-0 cursor-pointer"
            >
              <div className="flex items-start justify-between gap-4">
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
                <span className="text-xs text-muted-foreground mt-1 shrink-0">{post.date}</span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
