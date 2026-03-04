const Footer = () => {
  return (
    <footer className="px-6 py-8 text-center border-t border-border">
      <p className="text-xs text-muted-foreground">
        MERCY TECH GLOBAL — Innovation through Automation.
      </p>
      <p className="text-xs text-muted-foreground/60 mt-2">
        © {new Date().getFullYear()} Vy Thiên Hùng. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
