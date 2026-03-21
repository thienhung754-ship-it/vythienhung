import { useSiteData } from "@/contexts/SiteDataContext";

const Footer = () => {
  const { siteData } = useSiteData();
  const footer = siteData.footer || { companyName: "MERCY TECH GLOBAL", copyrightName: "Vy Thiên Hùng" };

  return (
    <footer className="px-6 py-8 text-center border-t border-border">
      <p className="text-xs text-muted-foreground">{footer.companyName}</p>
      <p className="text-xs text-muted-foreground/60 mt-2">
        © {new Date().getFullYear()} {footer.copyrightName}. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;