import { useEffect, useRef } from "react";
import { useSmoothScroll } from "../components/motion/SmoothScroll";

// Global reference counter to support multiple/nested modals safely
let globalLockCount = 0;
let originalBodyOverflow = "";
let originalHtmlOverflow = "";
let originalBodyPaddingRight = "";
let savedScrollY = 0;

export function useScrollLock(isOpen: boolean) {
  const { lenis } = useSmoothScroll();
  const lenisRef = useRef(lenis);
  lenisRef.current = lenis;

  useEffect(() => {
    if (!isOpen || typeof window === "undefined" || typeof document === "undefined") {
      return;
    }

    if (globalLockCount === 0) {
      // First modal opening: capture initial state
      savedScrollY = window.scrollY;
      originalBodyOverflow = document.body.style.overflow;
      originalHtmlOverflow = document.documentElement.style.overflow;
      originalBodyPaddingRight = document.body.style.paddingRight;

      // 1. Freeze smooth scrolling via Lenis
      lenisRef.current?.stop();

      // 2. Calculate scrollbar width to prevent page jump
      const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
      if (scrollBarWidth > 0) {
        document.body.style.paddingRight = `${scrollBarWidth}px`;
      }

      // 3. Lock standard body and root overflow
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      document.body.classList.add("modal-scroll-locked");
      document.documentElement.classList.add("modal-scroll-locked");
    }

    globalLockCount++;

    return () => {
      globalLockCount = Math.max(0, globalLockCount - 1);

      if (globalLockCount === 0) {
        // Last modal closing: restore everything
        document.body.style.overflow = originalBodyOverflow;
        document.documentElement.style.overflow = originalHtmlOverflow;
        document.body.style.paddingRight = originalBodyPaddingRight;
        document.body.classList.remove("modal-scroll-locked");
        document.documentElement.classList.remove("modal-scroll-locked");

        // Restore Lenis smooth scrolling
        lenisRef.current?.start();

        // Restore scroll position if displaced
        if (Math.abs(window.scrollY - savedScrollY) > 2) {
          window.scrollTo({ top: savedScrollY, behavior: "instant" as ScrollBehavior });
        }
      }
    };
  }, [isOpen]);
}
