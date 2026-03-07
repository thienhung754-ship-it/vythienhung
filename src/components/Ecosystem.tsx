import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Globe, Users, Layers } from "lucide-react";

const products = [
{
  icon: Globe,
  title: "MERCY TECH",
  subtitle: "GIẢI PHÁP CÔNG NGHỆ & KIẾN TRÚC HỆ THỐNG",
  description:
  "Đơn vị chuyên cung cấp dịch vụ Outsource giải pháp công nghệ B2B. Không chỉ tạo ra những Platform mạnh mẽ để tung ra thị trường, Mercy Tech còn đóng vai trò phát triển các ứng dụng bổ trợ, tối ưu hóa luồng dữ liệu và hạ tầng kỹ thuật cho Mercy Shop. Mọi dòng code đều tuân thủ nguyên tắc tối thượng: Minh bạch và vị nhân sinh."
},
{
  icon: Users,
  title: "MERCY SHOP",
  subtitle: "TRẠM PHÂN PHỐI ĐẶC QUYỀN",
  description:
  "Kênh thương mại điện tử và bán lẻ cao cấp. Mercy Shop là nơi phân phối trực tiếp các \"vũ khí\" phần cứng hữu hình của hệ sinh thái đến tay người dùng VIP: Từ các dòng Thẻ định danh NFC của Persona, đến Kính thông minh và thiết bị IoT bảo mật."
},
{
  icon: Layers,
  title: "MERCY PLATFORM",
  subtitle: "NỀN TẢNG ỨNG DỤNG & DỊCH VỤ",
  description:
  "\"Trạm cung cấp\" các nền tảng phần mềm lõi của hệ sinh thái. Nơi tập trung phát triển và phát hành các ứng dụng giải quyết triệt để những nhu cầu thiết yếu của cộng đồng, giúp mọi người dễ dàng tiếp cận với sự tiện lợi của công nghệ."
},
{
  icon: FlaskConical,
  title: "MERCY LABS",
  subtitle: "PHÒNG THÍ NGHIỆM & ĐỔI MỚI",
  description:
  "Trung tâm nghiên cứu và phát triển của hệ sinh thái. Mercy Labs là nơi ươm mầm những ý tưởng đột phá, thử nghiệm công nghệ tiên phong và kiến tạo các giải pháp sáng tạo trước khi đưa vào ứng dụng thực tế."
}];


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
          className="text-center mb-16">
          
          <p className="text-sm text-muted-foreground tracking-widest uppercase mb-3">Hệ sinh thái</p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
            MERCY TECH GLOBAL
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {products.map((product, i) =>
          <motion.div
            key={product.title}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            className="group p-8 rounded-2xl bg-secondary/50 hover:bg-secondary transition-colors duration-500 border-0">
            
              <product.icon className="w-8 h-8 text-foreground mb-6" strokeWidth={1.5} />
              <h3 className="text-lg font-semibold text-foreground mb-1">{product.title}</h3>
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-4">
                {product.subtitle}
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">{product.description}</p>
            </motion.div>
          )}
        </div>
      </div>
    </section>);

};

export default Ecosystem;