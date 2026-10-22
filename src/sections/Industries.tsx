import React, { useEffect, useRef, useState } from "react";
import { industriesData } from "../data/industries";
import type { IndustryItem } from "../data/industries";
import { SectionHeading } from "../components/ui/SectionHeading";
import { useInViewAnimation } from "../hooks/useInViewAnimation";
import { useCursor } from "../context/useCursor";
import type { CursorType } from "../context/cursorState";
import {
  ShoppingBag,
  Cpu,
  HeartPulse,
  GraduationCap,
  Compass,
  UtensilsCrossed,
  Activity,
  Building2,
  Briefcase,
  Rocket
} from "lucide-react";

interface CarouselRowProps {
  items: IndustryItem[];
  direction: "ltr" | "rtl";
  speed?: number; // pixels per second
  isSectionInView: boolean;
  prefersReducedMotion: boolean;
  setCursor: (type: CursorType, text?: string) => void;
  resetCursor: () => void;
  getIcon: (iconName: string) => React.ReactNode;
}

const IndustryCarouselRow: React.FC<CarouselRowProps> = ({
  items,
  direction,
  speed = 46,
  isSectionInView,
  prefersReducedMotion,
  setCursor,
  resetCursor,
  getIcon
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Internal repeat count for seamless infinite wrapping:
  // 4 sets of 5 items = 20 cards.
  // Set 1 (indices 5-9) is the primary accessible set for screen readers.
  const REPEAT_SETS = 4;
  const repeatedCards = Array.from({ length: REPEAT_SETS }, () => items).flat();

  // Metrics (measured on mount and resize)
  const [metrics, setMetrics] = useState({
    cardWidth: 236,
    gap: 14,
    containerWidth: 1200
  });

  const isSlowedRef = useRef(false);
  const txRef = useRef(0);
  const lastTimeRef = useRef<number | null>(null);
  const rafIdRef = useRef<number | null>(null);

  // Measure container and compute optimal card width & gap
  useEffect(() => {
    const updateMetrics = () => {
      if (!containerRef.current) return;
      const cw = containerRef.current.clientWidth;

      let cardW = 236;
      let gapW = 14;

      if (cw < 480) {
        cardW = Math.max(220, Math.min(260, cw - 48));
        gapW = 10;
      } else if (cw < 768) {
        cardW = 226;
        gapW = 12;
      } else if (cw < 1024) {
        cardW = 232;
        gapW = 14;
      } else {
        cardW = 236;
        gapW = 14;
      }

      setMetrics((prev) => {
        if (
          prev.cardWidth === cardW &&
          prev.gap === gapW &&
          Math.abs(prev.containerWidth - cw) <= 1
        ) {
          return prev;
        }
        return {
          cardWidth: cardW,
          gap: gapW,
          containerWidth: cw
        };
      });

      // Initialize txRef to -1 full set length so cards immediately fill the container
      const setLength = items.length * (cardW + gapW);
      if (txRef.current === 0) {
        txRef.current = -setLength;
      }
    };

    updateMetrics();

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined" && containerRef.current) {
      resizeObserver = new ResizeObserver(() => {
        updateMetrics();
      });
      resizeObserver.observe(containerRef.current);
    }

    window.addEventListener("resize", updateMetrics);
    return () => {
      window.removeEventListener("resize", updateMetrics);
      if (resizeObserver) resizeObserver.disconnect();
    };
  }, [items.length]);

  // Main animation loop: runs continuously without freezing
  useEffect(() => {
    if (prefersReducedMotion) {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
      return;
    }

    const { cardWidth, gap, containerWidth } = metrics;
    const slotWidth = cardWidth + gap;
    const setLength = items.length * slotWidth;

    const animate = (time: number) => {
      if (!lastTimeRef.current) {
        lastTimeRef.current = time;
      }
      const dt = Math.min((time - lastTimeRef.current) / 1000, 0.1);
      lastTimeRef.current = time;

      // Only advance position when tab is visible
      if (document.visibilityState === "visible") {
        // When card is actively hovered, glide at subtle half-speed for easy reading without freezing
        const currentSpeed = isSlowedRef.current ? speed * 0.35 : speed;

        if (direction === "ltr") {
          txRef.current += currentSpeed * dt;
          // When tx reaches 0, wrap back seamlessly by exactly 1 set length
          if (txRef.current >= 0) {
            txRef.current -= setLength;
          }
        } else {
          txRef.current -= currentSpeed * dt;
          // When tx reaches -2 * setLength, wrap forward seamlessly by 1 set length
          if (txRef.current <= -2 * setLength) {
            txRef.current += setLength;
          }
        }
      }

      // 1. Move track
      if (trackRef.current) {
        trackRef.current.style.transform = `translate3d(${txRef.current.toFixed(2)}px, 0, 0)`;
      }

      // 2. Position-dependent card scaling and opacity
      const center = containerWidth / 2;
      const halfWidth = containerWidth / 2;
      const currentTx = txRef.current;

      for (let i = 0; i < cardRefs.current.length; i++) {
        const cardEl = cardRefs.current[i];
        if (!cardEl) continue;

        const cardLeft = currentTx + i * slotWidth;
        const cardCenter = cardLeft + cardWidth / 2;
        const distFromCenter = Math.abs(cardCenter - center);

        // If card is far offscreen outside the container bounds, hide
        if (cardLeft > containerWidth + 80 || cardLeft + cardWidth < -80) {
          cardEl.style.opacity = "0";
          cardEl.style.visibility = "hidden";
          continue;
        } else {
          cardEl.style.visibility = "visible";
        }

        const normDist = Math.min(1, distFromCenter / Math.max(1, halfWidth));

        // Subtle, restrained scale-depth effect (0.88 - 1.00)
        // Center cards are closest to normal size (1.00), edge cards slightly smaller (0.88)
        const scale = 1.00 - 0.12 * Math.pow(normDist, 1.35);

        // Opacity smoothly transitions from 1.00 at center to ~0.82 near edges
        const opacity = 1.00 - 0.18 * Math.pow(normDist, 1.25);

        cardEl.style.transform = `scale(${scale.toFixed(3)}) translateZ(0)`;
        cardEl.style.opacity = Math.max(0.70, opacity).toFixed(3);
      }

      rafIdRef.current = requestAnimationFrame(animate);
    };

    rafIdRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
      lastTimeRef.current = null;
    };
  }, [metrics, direction, speed, isSectionInView, prefersReducedMotion, items.length]);

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden py-2 sm:py-2.5 select-none"
      style={{
        maskImage: "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)"
      }}
    >
      <div
        ref={trackRef}
        className="flex items-center will-change-transform"
        style={{ width: "max-content" }}
      >
        {repeatedCards.map((ind, idx) => {
          // Only Set 1 (items 5 to 9) is accessible to screen readers to prevent duplication
          const isPrimaryAccessible = idx >= items.length && idx < items.length * 2;

          return (
            <div
              key={`${ind.name}-${idx}`}
              ref={(el) => {
                cardRefs.current[idx] = el;
              }}
              style={{
                width: `${metrics.cardWidth}px`,
                minWidth: `${metrics.cardWidth}px`,
                marginRight: `${metrics.gap}px`,
                willChange: "transform, opacity",
                transformOrigin: "center center"
              }}
              className="flex-shrink-0"
              aria-hidden={!isPrimaryAccessible}
            >
              <div
                tabIndex={isPrimaryAccessible ? 0 : -1}
                onMouseEnter={() => {
                  isSlowedRef.current = true;
                  setCursor("project", ind.name);
                }}
                onMouseLeave={() => {
                  isSlowedRef.current = false;
                  resetCursor();
                }}
                className="group p-4 sm:p-4.5 rounded-xl liquid-glass-card !bg-white/95 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 active:scale-[0.98] flex flex-col justify-between cursor-pointer min-h-[178px] sm:min-h-[188px] border border-[#E5D9C8] hover:border-[#B58A45]/50 shadow-sm hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2 rounded-lg bg-[#B58A45]/10 border border-[#B58A45]/30 group-hover:scale-110 transition-all">
                      {getIcon(ind.icon)}
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#B58A45]/10 text-[#8C6527] border border-[#B58A45]/30 font-bold">
                      {ind.tag}
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-sm sm:text-[15px] text-[#292720] group-hover:text-[#B58A45] transition-colors mb-1.5">
                    {ind.name}
                  </h3>

                  <p className="text-[11.5px] sm:text-xs text-[#574F44] font-normal leading-relaxed">
                    {ind.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const Industries: React.FC = () => {
  const { setCursor, resetCursor } = useCursor();
  const {
    ref: sectionRef,
    isInView: isSectionInView,
    prefersReducedMotion
  } = useInViewAnimation<HTMLDivElement>({
    threshold: 0.05,
    rootMargin: "150px 0px 150px 0px",
    retrigger: false
  });

  // Top row: Exactly items 0 to 4
  const topRowItems = industriesData.slice(0, 5);
  // Bottom row: Exactly items 5 to 9
  const bottomRowItems = industriesData.slice(5, 10);

  const getIcon = (iconName: string) => {
    const props = { className: "w-4 h-4 text-[#B58A45] group-hover:text-[#8C6527] transition-colors" };
    switch (iconName) {
      case "ShoppingBag": return <ShoppingBag {...props} />;
      case "Cpu": return <Cpu {...props} />;
      case "HeartPulse": return <HeartPulse {...props} />;
      case "GraduationCap": return <GraduationCap {...props} />;
      case "Compass": return <Compass {...props} />;
      case "UtensilsCrossed": return <UtensilsCrossed {...props} />;
      case "Activity": return <Activity {...props} />;
      case "Building2": return <Building2 {...props} />;
      case "Briefcase": return <Briefcase {...props} />;
      case "Rocket": return <Rocket {...props} />;
      default: return <Cpu {...props} />;
    }
  };

  return (
    <section id="industries" className="py-14 sm:py-18 md:py-20 relative z-10 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="INDUSTRIES WE SERVE"
          title="Digital Solutions Engineered for"
          highlightedTitle="Diverse Sectors."
          subtitle="Tailored digital architectures and reporting pipelines designed to meet the unique operational challenges of modern industry verticals."
          subtitleVariant="ltr"
        />

        <div ref={sectionRef} className="w-full">
          {/* Coordinated Two-Row Horizontal Carousel Animation */}
          <div className="space-y-3 sm:space-y-4">
            {/* TOP ROW: Moves Left to Right */}
            <IndustryCarouselRow
              items={topRowItems}
              direction="ltr"
              speed={46}
              isSectionInView={isSectionInView}
              prefersReducedMotion={prefersReducedMotion}
              setCursor={setCursor}
              resetCursor={resetCursor}
              getIcon={getIcon}
            />

            {/* BOTTOM ROW: Moves Right to Left */}
            <IndustryCarouselRow
              items={bottomRowItems}
              direction="rtl"
              speed={46}
              isSectionInView={isSectionInView}
              prefersReducedMotion={prefersReducedMotion}
              setCursor={setCursor}
              resetCursor={resetCursor}
              getIcon={getIcon}
            />
          </div>
        </div>
      </div>
    </section>
  );
};


