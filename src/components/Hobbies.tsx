import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import hungEvent from "@/assets/hung-event.jpg";

const Hobbies = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-padding" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-sm text-muted-foreground tracking-widest uppercase mb-3">Bản sắc</p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
            Sở thích & Phong cách
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-2xl overflow-hidden"
          >
            <img
              src={hungEvent}
              alt="Vy Thiên Hùng tại sự kiện"
              className="w-full h-80 object-cover"
              loading="lazy"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col justify-center space-y-6"
          >
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Nhiếp ảnh Cinematic</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Đam mê ánh sáng Chiaroscuro — tương phản mạnh giữa sáng và tối, tạo nên những bức ảnh mang chiều sâu cảm xúc và tính nghệ thuật cao.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Thẩm mỹ phương tiện</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Tùy biến Yamaha R15 với Custom Decals — thể hiện cá tính qua từng chi tiết thiết kế, biến phương tiện thành tác phẩm nghệ thuật di động.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hobbies;
