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
      className={`relative w-full bg-[#c3766f] overflow-visible border-t border-[#D0A04B]/20 rounded-t-[36px] sm:rounded-t-[44px] md:rounded-t-[52px] shadow-[0_-12px_48px_rgba(0,0,0,0.75)] ${className}`}
      style={{
        minHeight: isMobile ? "220vh" : "280vh",
        zIndex: 18,
      }}
      aria-label="Apple Headphones Cinematic Scroll Showcase"
    >
      {/* Sticky Full-Viewport Stage: Edge-to-edge seamless pink background, no floating card */}
      <div
        className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-[#c3766f]"
        style={{ position: "sticky", top: 0 }}
      >
        {/* Full-Section Edge-to-Edge Canvas */}
        <HeadphonesScrollCanvas
          progress={prefersReducedMotion ? 0 : scrollProgress}
          className="absolute inset-0 w-full h-full"
        />
      </div>
    </section>
  );
});

HeadphonesShowcase.displayName = "HeadphonesShowcase";

export default HeadphonesShowcase;
