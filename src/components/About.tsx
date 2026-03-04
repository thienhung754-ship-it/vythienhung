import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import hungOffice from "@/assets/hung-office.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const } },
};

const About = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section-padding bg-secondary/40" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <p className="text-sm text-muted-foreground tracking-widest uppercase mb-3">Tiểu sử</p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
            About Vy Thiên Hùng
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="order-2 md:order-1"
          >
            <div className="space-y-6 text-base leading-relaxed text-muted-foreground">
              <p>
                <span className="text-foreground font-semibold">Vy Thiên Hùng</span> (sinh ngày 31/12/2001) là một doanh nhân trẻ và chuyên gia kỹ thuật dày dặn kinh nghiệm thực chiến.
              </p>
              <p>
                Chuyên tâm nghiên cứu về <span className="text-foreground font-medium">AI Vật lý (Physical AI)</span> và <span className="text-foreground font-medium">AI Wearables</span>, đưa trí tuệ nhân tạo tích hợp sâu vào đời sống thực tế.
              </p>
              <p>
                Triết lý quản trị tập trung vào <span className="text-foreground font-medium">"Engineering Excellence"</span> – Tối ưu hiệu suất kỹ thuật tuyệt đối, tự động hóa quy trình lên đến 90% và cam kết tốc độ load hệ thống dưới 2 giây.
              </p>
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            transition={{ delay: 0.2 }}
            className="order-1 md:order-2"
          >
            <div className="rounded-2xl overflow-hidden">
              <img
                src={hungOffice}
                alt="Vy Thiên Hùng tại văn phòng"
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
