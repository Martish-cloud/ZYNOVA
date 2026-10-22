import React, { useState, useEffect } from "react";
import { useReducedMotion } from "../../hooks/useReducedMotion";

export const PersistentVerticalScrollText: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(true);

  // Exact phrase specified in the requirements
  const phrase = "We would always love to work with you";

  // Repetition array for continuous smooth vertical movement
  const repetitions = [0, 1, 2, 3];

  useEffect(() => {
    // Only visible in:
    // 1. #hero ("BUILD. AUTOMATE. SCALE WHAT'S NEXT.")
    // 2. #vision ("Build Around Your Vision")
    // Completely absent in About, Services, Projects, Process, Why Us, Contact, Footer, etc.
    const heroEl = document.getElementById("hero");
    const visionEl = document.getElementById("vision");

    let heroIntersecting = true;
    let visionIntersecting = false;

    const evaluateVisibility = () => {
      // If either hero or vision is currently intersecting
      const inAllowedSection = heroIntersecting || visionIntersecting;

      // Double-check bounding rect of vision section:
      // If the bottom of #vision has scrolled above the top of viewport, we are strictly below vision
      if (visionEl) {
        const visionRect = visionEl.getBoundingClientRect();
        if (visionRect.bottom <= 20) {
          setIsVisible(false);
          return;
        }
      }

      // If at top of page (scrollY < 100), hero is visible
      if (window.scrollY < 100) {
        setIsVisible(true);
        return;
      }

      setIsVisible(inAllowedSection);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target.id === "hero") {
            heroIntersecting = entry.isIntersecting;
          } else if (entry.target.id === "vision") {
            visionIntersecting = entry.isIntersecting;
          }
        });
        evaluateVisibility();
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: [0, 0.05, 0.1, 0.25],
      }
    );

    if (heroEl) observer.observe(heroEl);
    if (visionEl) observer.observe(visionEl);

    // Also observe the next section (#about) to guarantee immediate disappearance
    const aboutEl = document.getElementById("about");
    let aboutObserver: IntersectionObserver | null = null;
    if (aboutEl) {
      aboutObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio > 0.05) {
              // Once #about enters, check if vision is done
              const vRect = visionEl?.getBoundingClientRect();
              if (vRect && vRect.bottom <= window.innerHeight * 0.5) {
                setIsVisible(false);
              }
            }
          });
        },
        { threshold: [0.05, 0.2] }
      );
      aboutObserver.observe(aboutEl);
    }

    const onScroll = () => {
      evaluateVisibility();
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    evaluateVisibility();

    return () => {
      observer.disconnect();
      if (aboutObserver) aboutObserver.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <aside
      aria-hidden="true"
      tabIndex={-1}
      className="fixed top-0 bottom-0 left-0 z-30 pointer-events-none select-none flex items-center justify-start overflow-hidden h-screen"
      style={{
        width: "clamp(54px, 6vw, 84px)",
        // Approximately 70% visible within viewport, 30% beyond left edge
        transform: isVisible ? "translateX(-30%)" : "translateX(-130%)",
        opacity: isVisible ? 1 : 0,
        pointerEvents: "none",
        visibility: isVisible ? "visible" : "hidden",
        transition: "transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.45s ease-out, visibility 0.45s",
      }}
    >
      {/* Subtle vertical golden rail */}
      <div className="absolute right-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-[#D0A04B]/25 to-transparent pointer-events-none" />

      {/* Continuous Top-to-Bottom Scrolling Track - Non-pausing, pointer-events none */}
      <div
        className={`flex flex-col items-center pointer-events-none will-change-transform ${
          prefersReducedMotion ? "" : "animate-vertical-marquee-down"
        }`}
        style={{
          writingMode: "vertical-rl",
          textOrientation: "mixed",
          animationDuration: "36s",
        }}
      >
        {/* Set 1 */}
        <div className="flex flex-col items-center gap-14 py-8 shrink-0 pointer-events-none">
          {repetitions.map((idx) => (
            <div
              key={`set1-${idx}`}
              className="flex items-center gap-6 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-heading font-black uppercase tracking-wider text-white/90 pointer-events-none select-none"
              style={{
                transform: "rotate(-1deg)",
                textShadow: "0 2px 14px rgba(0, 0, 0, 0.9), 0 0 4px rgba(208, 160, 75, 0.3)",
              }}
            >
              <span className="whitespace-nowrap">{phrase}</span>
              <span className="text-[#D0A04B]/60 text-sm font-mono select-none">✦</span>
            </div>
          ))}
        </div>

        {/* Set 2 (Seamless loop duplicate) */}
        <div className="flex flex-col items-center gap-14 py-8 shrink-0 pointer-events-none" aria-hidden="true">
          {repetitions.map((idx) => (
            <div
              key={`set2-${idx}`}
              className="flex items-center gap-6 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-heading font-black uppercase tracking-wider text-white/90 pointer-events-none select-none"
              style={{
                transform: "rotate(-1deg)",
                textShadow: "0 2px 14px rgba(0, 0, 0, 0.9), 0 0 4px rgba(208, 160, 75, 0.3)",
              }}
            >
              <span className="whitespace-nowrap">{phrase}</span>
              <span className="text-[#D0A04B]/60 text-sm font-mono select-none">✦</span>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default PersistentVerticalScrollText;
