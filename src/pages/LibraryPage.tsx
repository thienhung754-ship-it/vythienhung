import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useMemo } from "react";
import { Download, X, ArrowRight, Users, Search, ExternalLink, Check, Tag, Grid3X3, List } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useSiteData } from "@/contexts/SiteDataContext";
import { ToolItem, EbookItem } from "@/lib/siteData";

// Unified product type: either a tool or an ebook
interface UnifiedProduct {
  type: "tool" | "ebook";
  name: string;
  category: string;
  description: string;
  features: string[];
  duration: string;
  price: number;
  originalPrice: number;
  badge: string;
  affiliateLink: string;
  // Ebook-specific
  ebook?: EbookItem;
}

const BADGE_STYLES: Record<string, string> = {
  "MIỄN PHÍ": "bg-neutral-800 text-white dark:bg-neutral-200 dark:text-neutral-900",
  "BEST SELLER": "bg-[#D4AF37] text-white",
  "ADD-ON": "bg-neutral-600 text-white dark:bg-neutral-400 dark:text-neutral-900",
  "HOT": "bg-neutral-700 text-white dark:bg-neutral-300 dark:text-neutral-900",
  "PRO": "bg-neutral-700 text-white dark:bg-neutral-300 dark:text-neutral-900",
};

const formatPrice = (price: number) =>
  price.toLocaleString("vi-VN") + "đ";

const LibraryPage = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const { siteData } = useSiteData();

  // State
  const tools = siteData.tools || [];
  const ebooks = siteData.ebooks || [];
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Ebook download popup state
  const [showPopup, setShowPopup] = useState(false);
  const [currentEbook, setCurrentEbook] = useState<EbookItem | null>(null);
  const zaloGroupLink = siteData.zaloLinks?.ebookGroupZalo || "https://zalo.me/g/ljzjzz617";
  const zaloQR = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(zaloGroupLink)}`;

  // Merge ebooks + tools into one unified list (ebooks first = funnel)
  const allProducts: UnifiedProduct[] = useMemo(() => {
    const ebookProducts: UnifiedProduct[] = ebooks.map((eb) => ({
      type: "ebook" as const,
      name: eb.title,
      category: "Tài liệu",
      description: eb.description,
      features: [`${eb.format} — ${eb.pages}`, "Tải về miễn phí", "Không cần đăng ký"],
      duration: "",
      price: 0,
      originalPrice: 0,
      badge: "MIỄN PHÍ",
      affiliateLink: "",
      ebook: eb,
    }));

    const toolProducts: UnifiedProduct[] = tools.map((t) => ({
      type: "tool" as const,
      name: t.name,
      category: t.category,
      description: t.description,
      features: t.features,
      duration: t.duration,
      price: t.price,
      originalPrice: t.originalPrice,
      badge: t.badge,
      affiliateLink: t.affiliateLink,
    }));

    // Ebooks first (funnel), then tools
    return [...ebookProducts, ...toolProducts];
  }, [ebooks, tools]);

  // Categories from all products
  const categories = useMemo(() => {
    const cats = new Set(allProducts.map((p) => p.category));
    return ["Tất cả", ...Array.from(cats)];
  }, [allProducts]);

  // Filtered products
  const filteredProducts = useMemo(() => {
    return allProducts.filter((p) => {
      const matchCat = selectedCategory === "Tất cả" || p.category === selectedCategory;
      const matchSearch = !searchQuery ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [allProducts, selectedCategory, searchQuery]);

  const handleProductClick = (product: UnifiedProduct) => {
    if (product.type === "ebook" && product.ebook) {
      setCurrentEbook(product.ebook);
      setShowPopup(true);
    } else if (product.type === "tool" && product.affiliateLink && product.affiliateLink !== "#") {
      window.open(product.affiliateLink, "_blank");
    }
  };

  const triggerDownload = () => {
    if (currentEbook && currentEbook.file && currentEbook.file !== "#") {
      const safeName = currentEbook.fileName || `${(currentEbook.title || "ebook").replace(/\s+/g, "_")}.pdf`;
      const downloadUrl = `${currentEbook.file}?name=${encodeURIComponent(safeName)}`;
      window.open(downloadUrl, "_self");
    }
    setShowPopup(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-12">
        <section className="section-padding" ref={ref}>
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
              className="text-center mb-12"
            >
              <p className="text-sm text-muted-foreground tracking-widest uppercase mb-3">
                Thư viện
              </p>
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
                Công cụ & Tài liệu
              </h1>
              <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Tài liệu miễn phí, công cụ AI & sáng tạo nội dung — tất cả tại một nơi.
              </p>
            </motion.div>

            {/* Filter Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col md:flex-row items-stretch md:items-center gap-4 mb-8"
            >
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Tìm sản phẩm..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-secondary/50 border border-border text-foreground text-sm focus:outline-none focus:border-foreground/30 transition-colors placeholder:text-muted-foreground"
                />
              </div>

              {/* Category filters */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`whitespace-nowrap px-4 py-2.5 rounded-xl text-xs font-medium transition-all duration-200 ${
                      selectedCategory === cat
                        ? "bg-foreground text-background shadow-md"
                        : "bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* View toggle + count */}
              <div className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground whitespace-nowrap">
                  {filteredProducts.length} sản phẩm
                </span>
                <div className="flex rounded-lg border border-border overflow-hidden">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 transition-colors ${viewMode === "grid" ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"}`}
                  >
                    <Grid3X3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 transition-colors ${viewMode === "list" ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"}`}
                  >
                    <List className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Unified Product Grid */}
            <div className={viewMode === "grid" ? "grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6" : "flex flex-col gap-4"}>
              {filteredProducts.map((product, i) => (
                <motion.div
                  key={product.name + i}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.05 + i * 0.06 }}
                  onClick={() => handleProductClick(product)}
                  className="relative group rounded-xl border border-border bg-background overflow-hidden transition-all duration-200 hover:-translate-y-0.5 cursor-pointer active:scale-[0.98] flex flex-col hover:shadow-md"
                >
                  {/* Badge */}
                  {product.badge && (
                    <div className="absolute top-3 right-3 z-10">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        BADGE_STYLES[product.badge] || "bg-neutral-700 text-white"
                      }`}>
                        {product.badge}
                      </span>
                    </div>
                  )}

                  {/* Product Image */}
                  {product.type === "tool" && product.affiliateLink !== "" && (() => {
                    const toolItem = (siteData.tools || []).find(t => t.name === product.name);
                    return toolItem?.image ? (
                      <div className="w-full aspect-[16/9] bg-secondary/30 overflow-hidden">
                        <img src={toolItem.image} alt={product.name} className="w-full h-full object-cover" />
                      </div>
                    ) : null;
                  })()}

                  {/* Content */}
                  <div className="p-3 md:p-5 flex flex-col flex-1">
                    {/* Category */}
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[9px] md:text-[10px] text-muted-foreground uppercase tracking-wider">{product.category}</span>
                    </div>

                    {/* Name */}
                    <h3 className="text-xs md:text-base font-bold text-foreground mb-1.5 leading-snug pr-10">
                      {product.name}
                    </h3>

                    {/* Duration (only for tools) */}
                    {product.duration && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-secondary text-muted-foreground text-[11px] font-semibold mb-4 w-fit">
                        <Tag className="w-3 h-3" />
                        {product.duration}
                      </span>
                    )}

                    {/* Description */}
                    <p className="text-[11px] md:text-sm text-muted-foreground leading-relaxed mb-2 line-clamp-2">
                      {product.description}
                    </p>

                    {/* Features (hide on small mobile) */}
                    <div className="space-y-1 mb-3 flex-1 hidden md:block">
                      {product.features.map((f, fi) => (
                        <div key={fi} className="flex items-start gap-1.5">
                          <Check className="w-3 h-3 text-neutral-400 mt-0.5 shrink-0" />
                          <span className="text-xs text-muted-foreground">{f}</span>
                        </div>
                      ))}
                    </div>

                    {/* Price + CTA */}
                    {product.type === "ebook" ? (
                      <>
                        <div className="mb-2">
                          <span className="text-sm md:text-xl font-bold text-foreground">Miễn phí</span>
                        </div>
                        <div className="flex items-center justify-center gap-2 w-full px-3 py-2 md:py-3 rounded-lg bg-foreground text-background text-[11px] md:text-sm font-semibold transition-all duration-200 group-hover:opacity-90">
                          <Download className="w-3.5 h-3.5" />
                          Tải miễn phí
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="mb-2">
                          <span className="text-sm md:text-xl font-bold text-foreground">{formatPrice(product.price)}</span>
                          {product.originalPrice > product.price && (
                            <span className="text-[9px] md:text-xs text-muted-foreground line-through ml-1">{formatPrice(product.originalPrice)}</span>
                          )}
                        </div>
                        <div className="flex items-center justify-center gap-2 w-full px-3 py-2 md:py-3 rounded-lg bg-foreground text-background text-[11px] md:text-sm font-semibold transition-all duration-200 hover:opacity-90">
                          Tìm hiểu thêm
                          <ExternalLink className="w-3 h-3" />
                        </div>
                      </>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-16">
                <p className="text-muted-foreground">Không tìm thấy sản phẩm phù hợp.</p>
              </div>
            )}
          </div>
        </section>
      </div>

      {/* Ebook Download Popup */}
      <AnimatePresence>
        {showPopup && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
            >
              <div className="bg-background rounded-2xl border border-border shadow-2xl max-w-sm w-full pointer-events-auto">
                <div className="flex justify-end p-4 pb-0">
                  <button
                    onClick={triggerDownload}
                    className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="px-6 pb-6 text-center">
                  <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4">
                    <Download className="w-6 h-6 text-foreground" />
                  </div>
                  {currentEbook && (
                    <p className="text-sm text-muted-foreground mb-2">
                      Tài liệu: <span className="text-foreground font-medium">{currentEbook.title}</span>
                    </p>
                  )}
                  <h3 className="text-xl font-bold text-foreground mb-2 mt-4">
                    Tham gia cộng đồng Vibe Coding!
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                    Kết nối với hàng trăm người đang học AI coding — chia sẻ kiến thức, hỏi đáp và cùng nhau phát triển!
                  </p>
                  <div className="bg-white rounded-xl p-4 inline-block mb-5">
                    <img src={zaloQR} alt="QR Code tham gia nhóm Zalo" className="w-40 h-40" />
                  </div>
                  <p className="text-xs text-muted-foreground mb-5">Quét QR hoặc bấm nút bên dưới</p>
                  <a
                    href={zaloGroupLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={triggerDownload}
                    className="inline-flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl bg-foreground text-background text-sm font-semibold transition-all duration-300 hover:opacity-90"
                  >
                    <Users className="w-4 h-4" />
                    Tham gia nhóm Zalo & Tải tài liệu
                    <ArrowRight className="w-4 h-4" />
                  </a>
                  <button
                    onClick={triggerDownload}
                    className="text-xs text-muted-foreground hover:text-foreground mt-4 block mx-auto transition-colors underline"
                  >
                    Bỏ qua, tải tài liệu luôn
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default LibraryPage;
