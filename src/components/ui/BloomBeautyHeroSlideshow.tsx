import React, { useEffect, useState, useRef } from "react";
import { useReducedMotion } from "../../hooks/useReducedMotion";

export interface BloomBeautyHeroSlideshowProps {
  className?: string;
}

const BLOOM_SLIDES = [
  {
    id: 1,
    image: "/projects/bloom-beauty/slide-1.png",
    alt: "Bloom Beauty Velvet Lipstick Campaign",
  },
  {
    id: 2,
    image: "/projects/bloom-beauty/slide-2.png",
    alt: "Bloom Beauty Clinical Skincare Campaign",
  },
  {
    id: 3,
    image: "/projects/bloom-beauty/slide-3.png",
    alt: "Bloom Beauty Salon Hair Care Campaign",
  },
] as const;

// Transition matching Bloom Beauty's exact timing & cubic-bezier easing
const SLIDE_INTERVAL_MS = 5500;
const TRANSITION_DURATION_MS = 650;
const EASING = "cubic-bezier(0.25, 1, 0.5, 1)";

export const BloomBeautyHeroSlideshow: React.FC<BloomBeautyHeroSlideshowProps> = React.memo(
  ({ className = "" }) => {
    const prefersReducedMotion = useReducedMotion();
    const [currentIdx, setCurrentIdx] = useState(0);
    const [prevIdx, setPrevIdx] = useState<number | null>(null);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const transitionTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    // Eagerly preload all 3 slide images
    useEffect(() => {
      BLOOM_SLIDES.forEach((slide) => {
        const img = new Image();
        img.src = slide.image;
      });
    }, []);

    // Automatic cyclic slideshow
    useEffect(() => {
      if (prefersReducedMotion) return;

      timerRef.current = setInterval(() => {
        setCurrentIdx((curr) => {
          const next = (curr + 1) % BLOOM_SLIDES.length;
          setPrevIdx(curr);
          setIsTransitioning(true);

          if (transitionTimerRef.current) clearTimeout(transitionTimerRef.current);
          transitionTimerRef.current = setTimeout(() => {
            setIsTransitioning(false);
            setPrevIdx(null);
          }, TRANSITION_DURATION_MS + 50);

          return next;
        });
      }, SLIDE_INTERVAL_MS);

      return () => {
        if (timerRef.current) clearInterval(timerRef.current);
        if (transitionTimerRef.current) clearTimeout(transitionTimerRef.current);
      };
    }, [prefersReducedMotion]);

    return (
      <div
        className={`relative w-full h-full overflow-hidden bg-[#1a151a] ${className}`}
        aria-label="Bloom Beauty Hero Slideshow"
      >
        {BLOOM_SLIDES.map((slide, idx) => {
          const isCurrent = idx === currentIdx;
          const isPrev = idx === prevIdx;
          const isVisible = isCurrent || isPrev;

          let transform = "translateX(100%)";
          let zIndex = 1;
          let transition = "none";

          if (isCurrent) {
            transform = "translateX(0%)";
            zIndex = 2;
            if (isTransitioning) {
              transition = `transform ${TRANSITION_DURATION_MS}ms ${EASING}`;
            }
          } else if (isPrev) {
            transform = "translateX(-100%)";
            zIndex = 1;
            if (isTransitioning) {
              transition = `transform ${TRANSITION_DURATION_MS}ms ${EASING}`;
            }
          }

          return (
            <div
              key={slide.id}
              className="absolute inset-0 w-full h-full pointer-events-none will-change-transform"
              style={{
                transform,
                transition,
                zIndex,
                visibility: isVisible ? "visible" : "hidden",
              }}
              aria-hidden={!isCurrent}
            >
              {/* Layer 1: Ambient Blurred Backdrop (matches Bloom Beauty .hero-slide-bg) */}
              <img
                src={slide.image}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 w-full h-full object-cover blur-[24px] scale-110 opacity-40 pointer-events-none select-none"
              />

              {/* Layer 2: Pristine 16:9 Foreground Image (matches Bloom Beauty .hero-slide-fg) */}
              <img
                src={slide.image}
                alt={slide.alt}
                loading={idx === 0 ? "eager" : "lazy"}
                className="absolute inset-0 w-full h-full object-contain object-center pointer-events-none select-none"
              />
            </div>
          );
        })}
      </div>
    );
  }
);

BloomBeautyHeroSlideshow.displayName = "BloomBeautyHeroSlideshow";
export default BloomBeautyHeroSlideshow;
