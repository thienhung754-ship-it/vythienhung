import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { ghiSuKien, layTenMuc } from "@/lib/analytics";

/**
 * Component tự động theo dõi hành vi user trên trang public.
 * Không hiển thị gì — chỉ ghi nhận sự kiện.
 * Bỏ qua các trang /admin.
 */
const PageTracker = () => {
  const location = useLocation();
  const scrollTracked = useRef<Set<number>>(new Set());
  const lastScrollPct = useRef(0);
  const isAdmin = location.pathname.startsWith("/adminhungdz");

  // Ghi nhận xem trang khi đổi route
  useEffect(() => {
    if (isAdmin) return;
    ghiSuKien("trang_moi", location.pathname, "Bắt đầu phiên truy cập");
    ghiSuKien("xem_trang", location.pathname, document.title);
    scrollTracked.current = new Set();
    lastScrollPct.current = 0;
  }, [location.pathname, isAdmin]);

  // Ghi nhận rời trang
  useEffect(() => {
    if (isAdmin) return;

    const handleBeforeUnload = () => {
      const pct = lastScrollPct.current;
      ghiSuKien("roi_trang", location.pathname, `Dừng lại ở ${pct}% trang`, `Cuộn được ${pct}% trước khi rời`);
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [location.pathname, isAdmin]);

  // Ghi nhận cuộn trang (25%, 50%, 75%, 100%)
  useEffect(() => {
    if (isAdmin) return;

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;
      const pct = Math.round((scrollTop / docHeight) * 100);
      lastScrollPct.current = pct;

      const milestones = [25, 50, 75, 100];
      for (const m of milestones) {
        if (pct >= m && !scrollTracked.current.has(m)) {
          scrollTracked.current.add(m);
          ghiSuKien("cuon_trang", location.pathname, `${m}%`, `Đã cuộn đến ${m}% chiều dài trang`);
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname, isAdmin]);

  // Ghi nhận click — chi tiết vị trí bấm
  useEffect(() => {
    if (isAdmin) return;

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");
      const button = target.closest("button");

      if (anchor) {
        const href = anchor.getAttribute("href") || "";
        const text = anchor.textContent?.trim().slice(0, 80) || "";
        const isExternal = href.startsWith("http") && !href.includes(window.location.hostname);

        if (isExternal) {
          ghiSuKien(
            "click_lien_ket_ngoai",
            location.pathname,
            href,
            `Bấm vào liên kết "${text}" → ra ngoài: ${href}`
          );
        } else if (href.endsWith(".pdf") || href.startsWith("data:application/pdf")) {
          ghiSuKien(
            "tai_file",
            location.pathname,
            text || href,
            `Tải file: "${text}"`
          );
        } else {
          // Link nội bộ
          const section = anchor.closest("section");
          const sectionId = section?.getAttribute("id") || "";
          const sectionName = sectionId ? ` (trong mục ${layTenMuc(sectionId)})` : "";
          ghiSuKien(
            "click_lien_ket",
            location.pathname,
            text,
            `Bấm vào "${text}"${sectionName} → ${href}`
          );
        }
      } else if (button) {
        const text = button.textContent?.trim().slice(0, 80) || "";
        const section = button.closest("section");
        const sectionId = section?.getAttribute("id") || "";
        const sectionName = sectionId ? ` trong mục "${layTenMuc(sectionId)}"` : "";
        const ariaLabel = button.getAttribute("aria-label") || "";

        ghiSuKien(
          "click_nut",
          location.pathname,
          text || ariaLabel,
          `Bấm nút "${text || ariaLabel}"${sectionName}`
        );
      }
    };

    document.addEventListener("click", handleClick, { passive: true });
    return () => document.removeEventListener("click", handleClick);
  }, [location.pathname, isAdmin]);

  // Ghi nhận xem section — IntersectionObserver
  useEffect(() => {
    if (isAdmin) return;
    const observed = new Set<string>();
    let observer: IntersectionObserver | null = null;

    const timer = setTimeout(() => {
      const sections = document.querySelectorAll("section[id]");
      if (sections.length === 0) return;

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const id = entry.target.getAttribute("id") || "";
              if (id && !observed.has(id)) {
                observed.add(id);
                const tenMuc = layTenMuc(id);
                ghiSuKien(
                  "xem_muc",
                  location.pathname,
                  tenMuc,
                  `User cuộn đến và xem mục "${tenMuc}" (#${id})`
                );
              }
            }
          });
        },
        { threshold: 0.3 }
      );

      sections.forEach((s) => observer!.observe(s));
    }, 500);

    return () => {
      clearTimeout(timer);
      if (observer) observer.disconnect();
    };
  }, [location.pathname, isAdmin]);

  return null;
};

export default PageTracker;
