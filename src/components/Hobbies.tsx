import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import hungEvent from "@/assets/hung-event.jpg";
import { useSiteData } from "@/contexts/SiteDataContext";

const Hobbies = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { siteData } = useSiteData();
  const hobbies = siteData.hobbies;
  const imageSrc = hobbies.image || hungEvent;

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
              src={imageSrc}
              alt="Vy Thiên Hùng tại sự kiện"
              className="w-full h-80 object-cover"
              loading="lazy" />
            
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col justify-center space-y-6">
            
            {hobbies.sections.map((section, i) => (
              <div key={i}>
                <h3 className="text-lg font-semibold text-foreground mb-2">{section.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{section.description}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>);

};

export default Hobbies;