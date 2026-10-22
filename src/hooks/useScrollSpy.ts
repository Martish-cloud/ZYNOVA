import { useState, useEffect, useRef, useCallback } from "react";

export function useScrollSpy(
  sectionIds: string[],
  offset = 140,
  lockDuration = 900
) {
  // Check hash on initial load
  const getInitialActiveId = () => {
    if (typeof window !== "undefined" && window.location.hash) {
      const hashId = window.location.hash.replace("#", "");
      if (sectionIds.includes(hashId)) {
        return hashId;
      }
    }
    return sectionIds[0] || "hero";
  };

  const [activeId, setActiveId] = useState<string>(getInitialActiveId);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  const activeIdRef = useRef<string>(activeId);
  const isScrolledRef = useRef<boolean>(false);
  const ignoreUntilRef = useRef<number>(0);
  const manualTargetRef = useRef<string | null>(null);

  // Manual navigation trigger (e.g. on link click) to immediately highlight and lock during smooth scroll
  const manualNavigate = useCallback(
    (id: string) => {
      activeIdRef.current = id;
      setActiveId(id);
      manualTargetRef.current = id;
      ignoreUntilRef.current = Date.now() + lockDuration;
    },
    [lockDuration]
  );

  useEffect(() => {
    let ticking = false;

    // Helper to get measuring element (the StackPanel relative wrapper or section)
    const getTargetElement = (id: string): HTMLElement | null => {
      const el = document.getElementById(id);
      if (!el) return null;
      if (
        el.parentElement &&
        el.parentElement.tagName === "DIV" &&
        el.parentElement.classList.contains("relative") &&
        el.parentElement.parentElement?.tagName === "MAIN"
      ) {
        return el.parentElement;
      }
      return el;
    };

    // Release lock early if user interacts manually with wheel or touch
    const handleUserInteraction = () => {
      ignoreUntilRef.current = 0;
      manualTargetRef.current = null;
    };

    const checkState = () => {
      const currentScrollY = window.scrollY;

      // 1. Unified header scroll state check (threshold: 20px)
      const nextScrolled = currentScrollY > 20;
      if (isScrolledRef.current !== nextScrolled) {
        isScrolledRef.current = nextScrolled;
        setIsScrolled(nextScrolled);
      }

      // If locked during a manual link-click smooth scroll, honor the target
      if (Date.now() < ignoreUntilRef.current && manualTargetRef.current) {
        ticking = false;
        return;
      }

      // 2. Active section detection
      if (sectionIds.length === 0) {
        ticking = false;
        return;
      }

      // If at the very top of the page, hero is always active
      if (currentScrollY < 60) {
        const topId = sectionIds.includes("hero") ? "hero" : sectionIds[0];
        if (activeIdRef.current !== topId) {
          activeIdRef.current = topId;
          setActiveId(topId);
        }
        ticking = false;
        return;
      }

      // Check if at the very bottom of the page
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      const isAtBottom = windowHeight + currentScrollY >= docHeight - 60;

      // Collect present DOM elements and sort them by physical DOM position
      const validElements = sectionIds
        .map((id) => ({ id, el: getTargetElement(id) }))
        .filter((item): item is { id: string; el: HTMLElement } => Boolean(item.el));

      if (validElements.length === 0) {
        ticking = false;
        return;
      }

      validElements.sort((a, b) => {
        const pos = a.el.compareDocumentPosition(b.el);
        if (pos & Node.DOCUMENT_POSITION_FOLLOWING) return -1;
        if (pos & Node.DOCUMENT_POSITION_PRECEDING) return 1;
        return 0;
      });

      if (isAtBottom) {
        const lastSectionId = validElements[validElements.length - 1].id;
        if (activeIdRef.current !== lastSectionId) {
          activeIdRef.current = lastSectionId;
          setActiveId(lastSectionId);
        }
        ticking = false;
        return;
      }

      // Scan in reverse DOM order to find the latest section whose top has crossed into the viewport
      let matchedId: string | null = null;
      for (let i = validElements.length - 1; i >= 0; i--) {
        const item = validElements[i];
        const rect = item.el.getBoundingClientRect();
        if (rect.top <= offset) {
          matchedId = item.id;
          break;
        }
      }

      if (!matchedId) {
        matchedId = validElements[0].id;
      }

      if (matchedId && matchedId !== activeIdRef.current) {
        activeIdRef.current = matchedId;
        setActiveId(matchedId);
      }

      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(checkState);
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    window.addEventListener("wheel", handleUserInteraction, { passive: true });
    window.addEventListener("touchstart", handleUserInteraction, { passive: true });

    // Initial check
    checkState();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      window.removeEventListener("wheel", handleUserInteraction);
      window.removeEventListener("touchstart", handleUserInteraction);
    };
  }, [sectionIds, offset]);

  return {
    activeSection: activeId,
    activeId,
    isScrolled,
    manualNavigate,
    setActiveSection: setActiveId
  };
}
