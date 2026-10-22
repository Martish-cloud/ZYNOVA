import { useRef, useState, useEffect, useCallback, forwardRef, useImperativeHandle } from "react";
import { HeadphonesScrollCanvas } from "../components/ui/HeadphonesScrollCanvas";
import { useReducedMotion } from "../hooks/useReducedMotion";

export interface HeadphonesShowcaseProps {
  className?: string;
}

export const HeadphonesShowcase = forwardRef<HTMLElement, HeadphonesShowcaseProps>(({
  className = "",
}, forwardedRef) => {
  const containerRef = useRef<HTMLElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.innerWidth < 768;
  });
  const prefersReducedMotion = useReducedMotion();

  useImperativeHandle<HTMLElement | null, HTMLElement | null>(
    forwardedRef,
    () => containerRef.current
  );

  // Keep mobile state updated for responsive scroll runway
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Track section scroll progress to scrub the 240-frame sequence smoothly
  const handleScroll = useCallback(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const windowH = window.innerHeight;
    const totalH = containerRef.current.offsetHeight;

    // Scroll distance from when top of section enters sticky stage to runway completion
    const scrollDistance = Math.max(1, totalH - windowH);
    const currentScroll = -rect.top;

    // Allocate 88% of runway to scrub all 240 frames cleanly (advances forward on down-scroll, reverses on up-scroll)
    // The final 12% holds frame 240 firmly before the next section rises over it
    const animRatio = 0.88;
    const rawProgress = currentScroll / (scrollDistance * animRatio);
    const progress = Math.max(0, Math.min(1, rawProgress));
    setScrollProgress(progress);
  }, []);

  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [handleScroll]);

  return (
    <section
      id="headphones-showcase"
      ref={containerRef}
      className={`relative w-full bg-[#080706] text-white overflow-visible border-t border-[#D0A04B]/20 rounded-t-[36px] sm:rounded-t-[44px] md:rounded-t-[52px] shadow-[0_-12px_48px_rgba(0,0,0,0.75)] ${className}`}
      style={{
        // 280vh on desktop provides comfortable scroll travel for 240 frames; 220vh on mobile ensures no scroll fatigue
        minHeight: isMobile ? "220vh" : "280vh",
        zIndex: 18,
      }}
      aria-label="Apple Headphones Cinematic Scroll Showcase"
    >
      {/* Sticky Full-Viewport Visual Stage */}
      <div
        className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-[#080706]"
        style={{ position: "sticky", top: 0 }}
      >
        {/* Subtle Ambient Studio Lighting */}
        <div
          className="absolute inset-0 pointer-events-none z-0 overflow-hidden flex items-center justify-center"
          aria-hidden="true"
        >
          <div className="w-[900px] max-w-[90vw] h-[550px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(208,160,75,0.07)_0%,rgba(180,90,110,0.06)_40%,transparent_70%)] blur-3xl" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#080706]/50 via-transparent to-[#080706]/70" />
        </div>

        {/* Centered Headphones Visual Stage */}
        <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
          <div className="relative w-full max-w-5xl rounded-2xl sm:rounded-3xl overflow-hidden border border-[#D0A04B]/20 bg-[#0B0907] shadow-[0_25px_65px_rgba(0,0,0,0.85),0_0_40px_rgba(208,160,75,0.08)] transition-all duration-500 hover:border-[#D0A04B]/40 group">
            {/* Subtle Golden Inner Rim Lighting */}
            <div
              className="absolute inset-0 pointer-events-none z-10 rounded-2xl sm:rounded-3xl ring-1 ring-inset ring-white/10"
              aria-hidden="true"
            />

            {/* Reserved 16:9 Aspect Ratio Frame Container */}
            <div className="relative w-full aspect-video overflow-hidden bg-[#080706] flex items-center justify-center">
              <HeadphonesScrollCanvas
                progress={prefersReducedMotion ? 0 : scrollProgress}
                className="w-full h-full"
              />

              {/* Subtle cinematic edge vignette */}
              <div
                className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#080706]/35 via-transparent to-[#080706]/25 z-[5]"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

HeadphonesShowcase.displayName = "HeadphonesShowcase";

export default HeadphonesShowcase;
