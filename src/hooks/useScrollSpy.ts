import { useState, useEffect, useRef, useCallback } from "react";

// Physical document order of the primary navigation sections
export const PHYSICAL_SECTION_ORDER = [
  "hero",
  "about",
  "services",
  "projects",
  "why-zynova",
  "process",
  "contact"
] as const;

export function useScrollSpy(
  navSectionIds: string[] = [...PHYSICAL_SECTION_ORDER],
  headerOffset = 80,
  lockDuration = 1400
) {
  // Check hash on initial load
  const getInitialActiveId = () => {
    if (typeof window !== "undefined" && window.location.hash) {
      const hashId = window.location.hash.replace("#", "");
      if (navSectionIds.includes(hashId)) {
        return hashId;
      }
    }
    return navSectionIds[0] || "hero";
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

    // Helper to get measuring element in document flow (StackPanel wrapper div or root section)
    const getFlowElement = (id: string): HTMLElement | null => {
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

    const checkState = () => {
      const currentScrollY = window.scrollY;

      // 1. Header background styling check (threshold: 20px)
      const nextScrolled = currentScrollY > 20;
      if (isScrolledRef.current !== nextScrolled) {
        isScrolledRef.current = nextScrolled;
        setIsScrolled(nextScrolled);
      }

      // If locked during a manual link-click smooth scroll, honor the clicked target
      if (Date.now() < ignoreUntilRef.current && manualTargetRef.current) {
        ticking = false;
        return;
      }

      // 2. Active section detection
      // Top of page guarantee: if user is in hero head area, hero is active
      if (currentScrollY < 120) {
        if (activeIdRef.current !== "hero") {
          activeIdRef.current = "hero";
          setActiveId("hero");
        }
        ticking = false;
        return;
      }

      // Bottom of page guarantee: if user is scrolled near bottom of page, contact is active
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      if (windowHeight + currentScrollY >= docHeight - 90) {
        if (activeIdRef.current !== "contact") {
          activeIdRef.current = "contact";
          setActiveId("contact");
        }
        ticking = false;
        return;
      }

      // Natural focal line for reading (comfortably below the 70px fixed header)
      const focalY = Math.min(windowHeight * 0.35, 260);

      // Collect sections present in DOM according to physical page sequence
      type SectionId = (typeof PHYSICAL_SECTION_ORDER)[number];
      const sectionElements: { id: SectionId; el: HTMLElement }[] = [];
      for (const id of PHYSICAL_SECTION_ORDER) {
        const el = getFlowElement(id);
        if (el) {
          sectionElements.push({ id, el });
        }
      }

      if (sectionElements.length === 0) {
        ticking = false;
        return;
      }

      // Scan in reverse physical order: find the latest section whose top has crossed above focalY
      let matchedId: string | null = null;
      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const item = sectionElements[i];
        const rect = item.el.getBoundingClientRect();
        if (rect.top <= focalY) {
          matchedId = item.id;
          break;
        }
      }

      if (!matchedId) {
        matchedId = sectionElements[0].id;
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

    // Initial evaluation
    checkState();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [navSectionIds, headerOffset, lockDuration]);

  return {
    activeSection: activeId,
    activeId,
    isScrolled,
    manualNavigate,
    setActiveSection: setActiveId
  };
}
