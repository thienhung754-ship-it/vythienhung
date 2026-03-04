import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Send } from "lucide-react";

const Contact = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="section-padding bg-secondary/40" ref={ref}>
      <div className="max-w-xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <p className="text-sm text-muted-foreground tracking-widest uppercase mb-3">Liên hệ</p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
            Kết nối
          </h2>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          {submitted ? (
            <div className="text-center py-12">
              <p className="text-foreground font-medium text-lg">Cảm ơn bạn đã liên hệ.</p>
              <p className="text-muted-foreground text-sm mt-2">Tôi sẽ phản hồi sớm nhất.</p>
            </div>
          ) : (
            <>
              <input
                type="text"
                placeholder="Họ tên"
                required
                className="w-full px-4 py-3 bg-background border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-1 focus:ring-foreground/20 transition"
              />
              <input
                type="email"
                placeholder="Email"
                required
                className="w-full px-4 py-3 bg-background border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-1 focus:ring-foreground/20 transition"
              />
              <textarea
                placeholder="Nội dung"
                rows={4}
                required
                className="w-full px-4 py-3 bg-background border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-1 focus:ring-foreground/20 transition resize-none"
              />
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-foreground text-primary-foreground rounded-xl text-sm font-medium hover:opacity-90 transition-opacity"
              >
                Gửi tin nhắn
                <Send className="w-4 h-4" />
              </button>
            </>
          )}
        </motion.form>
      </div>
    </section>
  );
};

export default Contact;
