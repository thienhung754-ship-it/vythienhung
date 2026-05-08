import { useSiteData } from "@/contexts/SiteDataContext";

const Footer = () => {
  const { siteData } = useSiteData();
  const footer = siteData.footer || { companyName: "THE BLUE OCEAN GROUP", copyrightName: "Nguyễn Trúc Anh" };

  return (
    <footer className="relative bg-[black] pt-16 pb-8 border-t border-[hsla(211,100%,50%,0.1)] overflow-hidden">
      {/* Glow effect at the top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-[hsla(211,100%,50%,0.3)] to-transparent" />
      
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold text-gradient-ocean mb-2">@trucanh</h3>
            <p className="text-sm text-muted-foreground/80">{footer.companyName}</p>
          </div>
          
          <div className="flex items-center gap-6">
            <a href="#about" className="text-sm font-medium text-muted-foreground hover:text-[hsl(211,100%,60%)] transition-colors">Giới thiệu</a>
            <a href="#ecosystem" className="text-sm font-medium text-muted-foreground hover:text-[hsl(211,100%,60%)] transition-colors">Dịch vụ</a>
            <a href="/blog" className="text-sm font-medium text-muted-foreground hover:text-[hsl(211,100%,60%)] transition-colors">Blog</a>
          </div>
        </div>
        
        <div className="w-full h-px bg-gradient-to-r from-transparent via-[hsla(211,100%,50%,0.1)] to-transparent mb-8" />
        
        <div className="text-center">
          <p className="text-xs text-muted-foreground/60">
            © {new Date().getFullYear()} {footer.copyrightName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;