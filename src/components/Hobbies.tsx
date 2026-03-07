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
          className="text-center mb-16">
          
          <p className="text-sm text-muted-foreground tracking-widest uppercase mb-3">Bản sắc</p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">BẢN SẮC & TƯ DUY LÃNH ĐẠO

          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-2xl overflow-hidden">
            
            <img

              alt="Vy Thiên Hùng tại sự kiện"
              className="w-full h-80 object-cover"
              loading="lazy" src="/lovable-uploads/33ac4f62-98c8-482a-98cc-0ccaf4e55ee3.jpg" />
            
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col justify-center space-y-6">
            
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Nỗi ám ảnh về Trải nghiệm & Thẩm mỹ (UX/UI Excellence)</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">Sự yêu thích việc ứng dụng AI Generative không chỉ dừng ở đồ họa cá nhân, mà được tôi chuyển hóa thành tiêu chuẩn khắt khe cho mọi sản phẩm B2B. Tôi tin rằng một nền tảng doanh nghiệp (SaaS) xuất sắc không chỉ cần luồng code chạy mượt, mà sự hoàn hảo trong từng pixel hiển thị mới là thứ định vị đẳng cấp thương hiệu của đối tác.

              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Linh hoạt & Phá vỡ Giới hạn</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">Thói quen tùy biến (customization) trong đời sống cá nhân rèn luyện cho tôi khả năng không bao giờ chấp nhận các bộ khung có sẵn. Tôi liên tục đập bỏ và tái cấu trúc các giải pháp phần mềm để chúng có thể Scale-up (mở rộng) không giới hạn cùng doanh nghiệp.

              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>);

};

export default Hobbies;