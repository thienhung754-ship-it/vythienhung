import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Globe, Users, Layers } from "lucide-react";

const products = [
  {
    icon: Globe,
    title: "Persona.vn",
    subtitle: "Nền tảng Định danh số",
    description:
      "Web Blog + NFC — Giúp cá nhân sở hữu \"Di sản số\" vĩnh viễn, thoát khỏi sự phụ thuộc vào mạng xã hội.",
  },
  {
    icon: Users,
    title: "Dedicated Team",
    subtitle: "Outsourcing cao cấp",
    description:
      "Cung cấp đội ngũ kỹ sư chuyên biệt cho các dự án công nghệ yêu cầu chất lượng cao nhất.",
  },
  {
    icon: Layers,
    title: "SaaS Platform",
    subtitle: "Giải pháp bán lẻ",
    description:
      "Phát triển các nền tảng SaaS tối ưu cho thị trường bán lẻ, tự động hóa vận hành.",
  },
];

const Ecosystem = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="ecosystem" className="section-padding" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-sm text-muted-foreground tracking-widest uppercase mb-3">Hệ sinh thái</p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
            MERCY TECH GLOBAL
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {products.map((product, i) => (
            <motion.div
              key={product.title}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="group p-8 rounded-2xl bg-secondary/50 hover:bg-secondary transition-colors duration-500"
            >
              <product.icon className="w-8 h-8 text-foreground mb-6" strokeWidth={1.5} />
              <h3 className="text-lg font-semibold text-foreground mb-1">{product.title}</h3>
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-4">
                {product.subtitle}
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">{product.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Ecosystem;
