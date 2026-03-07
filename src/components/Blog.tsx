import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

const categories = ["Công nghệ & AI", "Quản trị Vận hành", "Sáng tạo & Thẩm mỹ"];

const posts = [
  {
    category: "Công nghệ & AI",
    title: "Physical AI: Khi trí tuệ nhân tạo bước ra thế giới thực",
    excerpt: "Khám phá xu hướng AI Vật lý và cách nó thay đổi tương tác giữa con người với máy móc.",
    content: "Physical AI (AI Vật lý) đang mở ra một kỷ nguyên mới, nơi trí tuệ nhân tạo không chỉ tồn tại trong thế giới ảo mà còn tương tác trực tiếp với môi trường vật lý. Từ robot tự hành, drone giao hàng đến các thiết bị wearable thông minh — tất cả đều được điều khiển bởi AI có khả năng cảm nhận, phản ứng và học hỏi từ thế giới thực.\n\nTại MERCY TECH GLOBAL, chúng tôi tin rằng Physical AI sẽ là bước tiến tiếp theo trong cuộc cách mạng công nghệ. Việc tích hợp AI vào phần cứng không chỉ đơn thuần là gắn chip xử lý mạnh hơn — mà là tạo ra những hệ thống có khả năng tự thích ứng, tự tối ưu và tự học hỏi trong môi trường thực tế.\n\nChúng tôi đang nghiên cứu và phát triển các giải pháp AI Wearables, nơi công nghệ trở thành một phần tự nhiên của cuộc sống hàng ngày, giúp con người nâng cao năng suất và trải nghiệm sống.",
    date: "2026",
  },
  {
    category: "Quản trị Vận hành",
    title: "Đạt điểm hòa vốn trong 6 tháng — Chiến lược thực chiến",
    excerpt: "Chia sẻ framework quản trị giúp startup đạt break-even nhanh chóng với nguồn lực tối thiểu.",
    content: "Một trong những thách thức lớn nhất của bất kỳ startup nào là đạt được điểm hòa vốn (break-even point) trong thời gian ngắn nhất có thể. Với kinh nghiệm thực chiến, tôi chia sẻ framework đã giúp các dự án của mình đạt break-even chỉ trong 6 tháng.\n\nBước 1: Tối ưu hóa chi phí vận hành — Tự động hóa quy trình lên đến 90%, giảm thiểu nhân sự thừa và tập trung vào core competency.\n\nBước 2: Xây dựng dòng tiền nhanh — Tập trung vào sản phẩm MVP có khả năng monetize ngay lập tức, thay vì chạy theo tính năng hoàn hảo.\n\nBước 3: Engineering Excellence — Đảm bảo hệ thống kỹ thuật luôn vận hành ổn định với load time dưới 2 giây, giảm thiểu downtime và tối ưu trải nghiệm người dùng.\n\nTriết lý cốt lõi: Không cần nhiều tiền để bắt đầu, nhưng cần đúng chiến lược để tồn tại.",
    date: "2026",
  },
  {
    category: "Sáng tạo & Thẩm mỹ",
    title: "Ứng dụng AI trong thiết kế: Từ ý tưởng đến sản phẩm",
    excerpt: "Cách tận dụng AI generative để nâng cao quy trình sáng tạo và thiết kế sản phẩm số.",
    content: "AI Generative đang thay đổi hoàn toàn cách chúng ta tiếp cận thiết kế. Từ việc tạo concept art, wireframe đến hoàn thiện UI/UX — AI trở thành người đồng hành không thể thiếu của designer hiện đại.\n\nTại MERCY TECH GLOBAL, chúng tôi ứng dụng AI vào quy trình thiết kế theo 3 giai đoạn:\n\n1. Ideation: Sử dụng AI để brainstorm ý tưởng, tạo mood board và khám phá các hướng sáng tạo mới.\n\n2. Prototyping: AI giúp tăng tốc quá trình tạo prototype từ vài ngày xuống còn vài giờ.\n\n3. Refinement: Kết hợp thẩm mỹ của con người với khả năng xử lý của AI để tạo ra sản phẩm hoàn thiện.\n\nĐiều quan trọng: AI không thay thế sự sáng tạo của con người — nó khuếch đại nó. Người thiết kế vẫn là người đưa ra quyết định cuối cùng về thẩm mỹ và trải nghiệm.",
    date: "2025",
  },
];

const Blog = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

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
              key={post.title}
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
