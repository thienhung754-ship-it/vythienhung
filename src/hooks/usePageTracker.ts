import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { trackEvent } from "@/lib/analytics";

/**
 * Hook to automatically track page views, clicks, scroll depth,
 * external links, and downloads on public pages.
 */
export function usePageTracker() {
  const location = useLocation();
  const scrollTracked = useRef<Set<number>>(new Set());

  // Track page view on route change
  useEffect(() => {
    trackEvent("session_start", location.pathname, "");
    trackEvent("pageview", location.pathname, document.title);
    scrollTracked.current = new Set();
  }, [location.pathname]);

  // Track scroll depth (25%, 50%, 75%, 100%)
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;
      const pct = Math.round((scrollTop / docHeight) * 100);

      const milestones = [25, 50, 75, 100];
      for (const m of milestones) {
        if (pct >= m && !scrollTracked.current.has(m)) {
          scrollTracked.current.add(m);
          trackEvent("scroll_depth", location.pathname, `${m}%`);
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  // Track clicks on links and buttons
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");
      const button = target.closest("button");

      if (anchor) {
        const href = anchor.getAttribute("href") || "";
        const isExternal = href.startsWith("http") && !href.includes(window.location.hostname);
        if (isExternal) {
          trackEvent("external_link", location.pathname, href);
        } else if (href.endsWith(".pdf") || href.startsWith("data:application/pdf")) {
          trackEvent("download", location.pathname, anchor.textContent?.trim() || href);
        } else {
          trackEvent("click", location.pathname, anchor.textContent?.trim().slice(0, 50) || href);
        }
      } else if (button) {
        const text = button.textContent?.trim().slice(0, 50) || "button";
        trackEvent("click", location.pathname, text);
      }
    };

    document.addEventListener("click", handleClick, { passive: true });
    return () => document.removeEventListener("click", handleClick);
  }, [location.pathname]);

  // Track section views with IntersectionObserver
  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    if (sections.length === 0) return;

    const observed = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("id") || "";
            if (id && !observed.has(id)) {
              observed.add(id);
              trackEvent("section_view", location.pathname, `#${id}`);
            }
          }
        });
      },
      { threshold: 0.3 }
    );

    // Small delay to let DOM render
    const timer = setTimeout(() => {
      sections.forEach((s) => observer.observe(s));
    }, 500);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [location.pathname]);
}
