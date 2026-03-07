import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const navItems = [
{ label: "Giới thiệu", href: "#about" },
{ label: "Hệ sinh thái", href: "#ecosystem" },
{ label: "Blog", href: "#blog" },
{ label: "Liên hệ", href: "#contact" }];


const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled ? "glass shadow-sm" : "bg-transparent"}`
      }>
      
      <div className="max-w-6xl mx-auto px-6 h-12 flex items-center justify-between">
        <a href="#" className="text-sm font-semibold tracking-tight text-foreground">

        </a>
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) =>
          <a
            key={item.href}
            href={item.href}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors duration-300">
            
              {item.label}
            </a>
          )}
        </div>
      </div>
    </motion.nav>);

};

export default Navbar;