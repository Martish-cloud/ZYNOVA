import React, { useState, useEffect } from "react";
import { useReducedMotion } from "../../hooks/useReducedMotion";

export const PersistentVerticalScrollText: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(true);

  // The exact phrase specified in the requirements
  const phrase = "We would always love to work with you";

  // Repetition array to ensure seamless infinite vertical scrolling at any screen height
  const repetitions = [0, 1, 2, 3, 4, 5];

  useEffect(() => {
    // Target sections:
    // 1. Hero (#hero)
    // 2. Build Around Your Vision (#vision)
    // 3. Practical Digital Engineering (#about)
    // Below section 3 (#about), this text must cleanly hide and stop rendering.
    const sectionIds = ["hero", "vision", "about"];
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    const intersectingMap = new Map<string, boolean>();
    sectionIds.forEach((id) => intersectingMap.set(id, false));

    const checkVisibility = () => {
      // If at top of the page, always show
      if (window.scrollY < 120) {
        setIsVisible(true);
        return;
      }

      // Check boundary of Section 3 (#about)
      const aboutEl = document.getElementById("about");
      if (aboutEl) {
        const aboutRect = aboutEl.getBoundingClientRect();
        // If the bottom of section 3 has scrolled past the top of the viewport, we are below Section 3
        if (aboutRect.bottom <= 40) {
          setIsVisible(false);
          return;
        }
      }

      // If any of the 3 sections is currently intersecting the viewport
      const anyIntersecting = Array.from(intersectingMap.values()).some(Boolean);
      setIsVisible(anyIntersecting);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          intersectingMap.set(entry.target.id, entry.isIntersecting);
        });
        checkVisibility();
      },
      {
        root: null,
        // Hand-off padding between consecutive sections
        rootMargin: "15% 0px 15% 0px",
        threshold: [0, 0.05, 0.1, 0.2],
      }
    );

    elements.forEach((el) => observer.observe(el));

    // Also observe #services to enforce disappearance once user moves deeper
    const servicesEl = document.getElementById("services");
    let servicesObserver: IntersectionObserver | null = null;
    if (servicesEl) {
      servicesObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio > 0.15) {
              const aboutEl = document.getElementById("about");
              const aboutRect = aboutEl?.getBoundingClientRect();
              if (aboutRect && aboutRect.bottom <= window.innerHeight * 0.35) {
                setIsVisible(false);
              }
            }
          });
        },
        { threshold: [0.15, 0.35] }
      );
      servicesObserver.observe(servicesEl);
    }

    const onScroll = () => {
      checkVisibility();
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // Initial evaluation
    checkVisibility();

    return () => {
      observer.disconnect();
      if (servicesObserver) servicesObserver.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <aside
      aria-hidden="true"
      className="fixed top-0 bottom-0 left-0 z-30 pointer-events-none select-none flex items-center justify-start overflow-hidden h-screen transition-all duration-500 ease-out"
      style={{
        width: "42px",
        transform: isVisible ? "translateX(-30%)" : "translateX(-120%)",
        opacity: isVisible ? 1 : 0,
        pointerEvents: "none",
        visibility: isVisible ? "visible" : "hidden",
      }}
    >
      {/* Subtle vertical guide line / ambient rail */}
      <div className="absolute right-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-[#B58A45]/20 to-transparent pointer-events-none" />

      {/* Infinite Scrolling Track */}
      <div
        className={`flex flex-col items-center will-change-transform ${
          prefersReducedMotion ? "" : "animate-vertical-marquee-down"
        }`}
        style={{
          writingMode: "vertical-rl",
          textOrientation: "mixed",
        }}
      >
        {/* Set 1 */}
        <div className="flex flex-col items-center gap-10 py-6 shrink-0">
          {repetitions.map((idx) => (
            <div
              key={`set1-${idx}`}
              className="flex items-center gap-4 text-[10px] sm:text-[11px] font-heading font-semibold uppercase tracking-[0.26em] text-[#B58A45]/70 hover:text-[#B58A45] transition-colors"
              style={{
                // Subtle elegant tilt for vertical/diagonal presentation
                transform: "rotate(-1deg)",
                textShadow: "0 1px 6px rgba(181, 138, 69, 0.15)",
              }}
            >
              <span className="whitespace-nowrap">{phrase}</span>
              <span className="text-[#C99E56]/40 text-[8px] font-mono select-none">✦</span>
            </div>
          ))}
        </div>

        {/* Set 2 (Identical duplicate for 100% seamless infinite loop) */}
        <div className="flex flex-col items-center gap-10 py-6 shrink-0">
          {repetitions.map((idx) => (
            <div
              key={`set2-${idx}`}
              className="flex items-center gap-4 text-[10px] sm:text-[11px] font-heading font-semibold uppercase tracking-[0.26em] text-[#B58A45]/70 hover:text-[#B58A45] transition-colors"
              style={{
                // Subtle elegant tilt for vertical/diagonal presentation
                transform: "rotate(-1deg)",
                textShadow: "0 1px 6px rgba(181, 138, 69, 0.15)",
              }}
            >
              <span className="whitespace-nowrap">{phrase}</span>
              <span className="text-[#C99E56]/40 text-[8px] font-mono select-none">✦</span>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default PersistentVerticalScrollText;
