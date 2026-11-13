import React, { useEffect, useState, useRef, useCallback } from "react";
import { useReducedMotion } from "../../hooks/useReducedMotion";

export interface BloomBeautyHeroSlideshowProps {
  className?: string;
}

const BLOOM_SLIDES = [
  {
    id: 1,
    webpImage: "/projects/bloom-beauty/slide-1.webp",
    pngImage: "/projects/bloom-beauty/slide-1.png",
    remoteImage: "https://bloombeauty.zynova.co.in/Header%20Images/1.png",
    alt: "Bloom Beauty Velvet Lipstick Campaign",
    themeBg: "#a76542",
  },
  {
    id: 2,
    webpImage: "/projects/bloom-beauty/slide-2.webp",
    pngImage: "/projects/bloom-beauty/slide-2.png",
    remoteImage: "https://bloombeauty.zynova.co.in/Header%20Images/2.png",
    alt: "Bloom Beauty Clinical Skincare Campaign",
    themeBg: "#c0c0cc",
  },
  {
    id: 3,
    webpImage: "/projects/bloom-beauty/slide-3.webp",
    pngImage: "/projects/bloom-beauty/slide-3.png",
    remoteImage: "https://bloombeauty.zynova.co.in/Header%20Images/3.png",
    alt: "Bloom Beauty Salon Hair Care Campaign",
    themeBg: "#5a5655",
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
    
    // Dynamic image source map with fallback hierarchy: local WebP -> local PNG -> remote live CDN URL
    const [activeSrcs, setActiveSrcs] = useState<Record<number, string>>(() => ({
      1: BLOOM_SLIDES[0].webpImage,
      2: BLOOM_SLIDES[1].webpImage,
      3: BLOOM_SLIDES[2].webpImage,
    }));

    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const transitionTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    // Resilient fallback handler to ensure images ALWAYS display without showing broken alt text
    const handleImageError = useCallback((id: number) => {
      setActiveSrcs((prev) => {
        const current = prev[id];
        const slide = BLOOM_SLIDES.find((s) => s.id === id);
        if (!slide) return prev;
        if (current === slide.webpImage) {
          return { ...prev, [id]: slide.pngImage };
        }
        if (current === slide.pngImage) {
          return { ...prev, [id]: slide.remoteImage };
        }
        return prev;
      });
    }, []);

    // Eagerly preload all 3 slide images
    useEffect(() => {
      BLOOM_SLIDES.forEach((slide) => {
        const imgWebp = new Image();
        imgWebp.src = slide.webpImage;
        const imgPng = new Image();
        imgPng.src = slide.pngImage;
      });
    }, []);

    // Automatic cyclic slideshow matching source website behavior
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

          const currentSrc = activeSrcs[slide.id] || slide.webpImage;

          return (
            <div
              key={slide.id}
              className="absolute inset-0 w-full h-full pointer-events-none will-change-transform"
              style={{
                transform,
                transition,
                zIndex,
                visibility: isVisible ? "visible" : "hidden",
                backgroundColor: slide.themeBg,
              }}
              aria-hidden={!isCurrent}
            >
              {/* Layer 1: Ambient Extended Backdrop - fills complete container width seamlessly */}
              <img
                src={currentSrc}
                alt=""
                aria-hidden="true"
                loading={idx === 0 ? "eager" : "lazy"}
                decoding="async"
                onError={() => handleImageError(slide.id)}
                className="absolute inset-0 w-full h-full object-cover blur-[20px] scale-[1.25] pointer-events-none select-none"
              />

              {/* Layer 2: Pristine 16:9 Foreground Image - uncropped, unzoomed, natural aspect */}
              <picture className="relative z-10 w-full h-full flex items-center justify-center pointer-events-none select-none">
                <source type="image/webp" srcSet={slide.webpImage} />
                <source type="image/png" srcSet={slide.pngImage} />
                <img
                  src={currentSrc}
                  alt={slide.alt}
                  loading={idx === 0 ? "eager" : "lazy"}
                  decoding="async"
                  onError={() => handleImageError(slide.id)}
                  className="w-full h-full object-contain object-center pointer-events-none select-none"
                />
              </picture>
            </div>
          );
        })}
      </div>
    );
  }
);

BloomBeautyHeroSlideshow.displayName = "BloomBeautyHeroSlideshow";
export default BloomBeautyHeroSlideshow;
