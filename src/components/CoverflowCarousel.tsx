import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface CaseStudyItem {
  id: string;
  title: string;
  category: string;
  image: string;
  description?: string;
  link?: string;
}

interface CoverflowCarouselProps {
  items: CaseStudyItem[];
  categories?: string[];
}

const CARD_W = 260;
const GAP    = 140;

const mod = (n: number, m: number) => ((n % m) + m) % m;

export default function CoverflowCarousel({ items, categories }: CoverflowCarouselProps) {
  const [active,    setActive]    = useState(0);
  const [cat,       setCat]       = useState("Tất cả");
  const [direction, setDirection] = useState<1 | -1>(1); // 1 = next (→), -1 = prev (←)
  const dragX    = useRef(0);
  const isDrag   = useRef(false);


  const allCats = categories ?? [
    "Tất cả",
    ...Array.from(new Set(items.map(i => i.category))),
  ];

  const list = cat === "Tất cả" ? items : items.filter(i => i.category === cat);
  const n    = list.length;

  const goTo = useCallback((idx: number, dir?: 1 | -1) => {
    const next = ((idx % n) + n) % n;
    if (dir !== undefined) setDirection(dir);
    else setDirection(next > active ? 1 : -1);
    setActive(next);
  }, [n, active]);

  const changeCat = (c: string) => { setCat(c); setActive(0); };


  const onDown = (e: React.PointerEvent) => { isDrag.current = false; dragX.current = e.clientX; };
  const onMove = (e: React.PointerEvent) => { if (Math.abs(e.clientX - dragX.current) > 8) isDrag.current = true; };
  const onUp   = (e: React.PointerEvent) => {
    const d = e.clientX - dragX.current;
    if (isDrag.current && Math.abs(d) > 40) {
      d < 0 ? goTo(active + 1, 1) : goTo(active - 1, -1);
    }
  };

  const half    = Math.floor(n / 2);
  const offsets = Array.from({ length: n }, (_, k) => k - half);

  const styleFor = (offset: number) => {
    const abs = Math.abs(offset);
    const adjOffset = n % 2 === 0 ? offset + 0.5 : offset;
    return {
      x          : adjOffset * GAP,
      rotateY    : offset * 50,
      scale      : abs === 0 ? 1.08 : Math.max(0.55, 1.08 - abs * 0.14),
      zIndex     : n - abs,
      opacity    : Math.max(0.35, 1 - abs * 0.18),
      brightness : Math.max(0.4, 1 - abs * 0.18),
    };
  };

  if (n === 0) return null;

  // Direction-aware enter/exit for the center card
  const enterX  = direction * 320;
  const exitX   = direction * -320;

  return (
    <div className="w-full">
      {/* Category pills */}
      {allCats.length > 2 && (
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {allCats.map(c => (
            <button
              key={c}
              onClick={() => changeCat(c)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all border ${
                c === cat
                  ? "bg-foreground text-background border-foreground"
                  : "bg-transparent text-muted-foreground border-border hover:border-foreground/40 hover:text-foreground"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      )}

      {/* Full-bleed stage */}
      <div className="relative w-screen left-1/2 -translate-x-1/2" style={{ height: 580 }}>

        {/* Arrows */}
        <button
          onClick={() => goTo(active - 1, -1)}
          aria-label="Previous"
          className="absolute left-[3%] top-1/2 -translate-y-1/2 z-50 w-10 h-10 rounded-full bg-background/90 border border-border shadow-lg flex items-center justify-center hover:bg-foreground hover:text-background transition-all duration-200"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => goTo(active + 1, 1)}
          aria-label="Next"
          className="absolute right-[3%] top-1/2 -translate-y-1/2 z-50 w-10 h-10 rounded-full bg-background/90 border border-border shadow-lg flex items-center justify-center hover:bg-foreground hover:text-background transition-all duration-200"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Cards layer — background cards (non-center) */}
        <div
          className="relative w-full h-full flex items-center justify-center select-none cursor-grab active:cursor-grabbing"
          style={{ perspective: "1200px" }}
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
        >
          {offsets.map(offset => {
            const itemIdx  = mod(active + offset, n);
            const item     = list[itemIdx];
            const { x, rotateY, scale, zIndex, opacity, brightness } = styleFor(offset);
            const isCenter = offset === 0 || (n % 2 === 0 && offset === -1);

            return (
              <motion.div
                key={`${cat}-${offset}`}
                className="absolute"
                style={{ zIndex, transformStyle: "preserve-3d" }}
                animate={{ x, rotateY, scale, opacity, filter: `brightness(${brightness})` }}
                transition={{ type: "spring", stiffness: 280, damping: 32, mass: 0.9 }}
                onClick={() => {
                  if (!isDrag.current) {
                    if (!isCenter) goTo(active + offset, offset > 0 ? 1 : -1);
                    else if (item.link) window.open(item.link, "_blank");
                  }
                }}
              >
                <motion.div
                  className="group relative rounded-2xl overflow-hidden shadow-2xl"
                  style={{ width: CARD_W }}
                  whileHover={isCenter ? { scale: 1.04, y: -8, boxShadow: "0 40px 80px rgba(0,0,0,0.28)" } : {}}
                  transition={{ duration: 0.22 }}
                >
                  {/* Portrait image — direction-aware transition for center card */}
                  <div className="overflow-hidden bg-secondary/50" style={{ aspectRatio: "9/16" }}>
                    {isCenter ? (
                      <AnimatePresence mode="popLayout" custom={direction}>
                        <motion.img
                          key={`center-${item.id}-${cat}`}
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover object-top"
                          draggable={false}
                          custom={direction}
                          initial={{ x: enterX, rotateY: direction * 45, scale: 0.82, opacity: 0, filter: "blur(8px)" }}
                          animate={{ x: 0,      rotateY: 0,               scale: 1,    opacity: 1, filter: "blur(0px)" }}
                          exit={{    x: exitX,  rotateY: direction * -45,  scale: 0.82, opacity: 0, filter: "blur(8px)" }}
                          transition={{ type: "spring", stiffness: 260, damping: 28, mass: 0.85 }}
                          style={{ transformStyle: "preserve-3d" }}
                        />
                      </AnimatePresence>
                    ) : (
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover object-top"
                        draggable={false}
                      />
                    )}
                  </div>

                  {/* Label */}
                  <div className={`absolute bottom-0 inset-x-0 px-4 py-3 transition-all duration-300 ${
                    isCenter
                      ? "bg-foreground text-background"
                      : "bg-black/75 text-white/80 backdrop-blur-sm"
                  }`}>
                    <p className="text-[9px] uppercase tracking-widest opacity-60 mb-0.5">{item.category}</p>
                    <p className="text-[11px] font-bold uppercase truncate">{item.title}</p>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Dots */}
      {n > 1 && (
        <div className="flex items-center justify-center gap-1.5 mt-6">
          {list.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i, i > active ? 1 : -1)}
              className={`rounded-full transition-all duration-300 ${
                i === active ? "w-5 h-1.5 bg-foreground" : "w-1.5 h-1.5 bg-border hover:bg-foreground/40"
              }`}
            />
          ))}
        </div>
      )}

      {/* Description */}
      <AnimatePresence mode="wait" custom={direction}>
        {list[active]?.description && (
          <motion.p
            key={`d-${active}-${cat}`}
            custom={direction}
            initial={{ opacity: 0, x: direction * 30, filter: "blur(4px)" }}
            animate={{ opacity: 1, x: 0,              filter: "blur(0px)" }}
            exit={{    opacity: 0, x: direction * -30, filter: "blur(4px)" }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="text-center text-sm text-muted-foreground mt-4 max-w-md mx-auto px-4"
          >
            {list[active].description}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
