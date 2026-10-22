import React, { useRef, useState, useEffect, useCallback } from "react";
import { ZynovaHeroScrollCanvas } from "../components/ui/ZynovaHeroScrollCanvas";
import { MagneticButton } from "../components/ui/MagneticButton";
import { useSmoothScroll } from "../components/motion/SmoothScroll";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { ArrowRight, Sparkles, Layers } from "lucide-react";

export const BuildVision: React.FC = () => {
  const containerRef = useRef<HTMLElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const { scrollTo } = useSmoothScroll();

  const handleScrollTo = (id: string) => {
    scrollTo(`#${id}`);
  };

  // Scroll listener tracking section progress to scrub frames smoothly
  const handleScroll = useCallback(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const windowH = window.innerHeight;
    const totalH = containerRef.current.offsetHeight;

    // Scroll range: from when the section top enters viewport top (or sticky point)
    // to when the section finishes its runway
    const scrollDistance = Math.max(1, totalH - windowH);
    const currentScroll = -rect.top;

    const progress = Math.max(0, Math.min(1, currentScroll / scrollDistance));
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
      id="vision"
      ref={containerRef}
      className="relative w-full bg-[#080706] text-[#FAF7F0] border-t border-white/10 overflow-hidden"
      style={{
        // 145vh gives ~400-500px of comfortable tactile scroll travel for 234 frames
        minHeight: "145vh",
      }}
      aria-label="Build Around Your Vision"
    >
      {/* Sticky Full-Viewport Stage */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center">
        {/* Full-Section Background Canvas: 234-Frame Zynova Hero Scroll-Driven Animation */}
        <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
          <ZynovaHeroScrollCanvas
            progress={prefersReducedMotion ? 0 : scrollProgress}
            className="w-full h-full"
          />

          {/* Left-Side Dark Gradient Veil to Guarantee Crisp Text Readability while keeping Product Bright on Right */}
          <div
            className="absolute inset-0 pointer-events-none bg-gradient-to-r from-[#080706] via-[#080706]/90 md:via-[#080706]/75 lg:via-[#080706]/55 to-transparent"
            aria-hidden="true"
          />

          {/* Subtle Top & Bottom Fade for Seamless Surface Blending */}
          <div
            className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#080706] to-transparent pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#080706] to-transparent pointer-events-none"
            aria-hidden="true"
          />
        </div>

        {/* Foreground Content: Clean Left-Side Text & Action Buttons */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Heading, Descriptions & CTAs (Product visual remains visible on the right) */}
            <div className="lg:col-span-6 xl:col-span-6 flex flex-col items-start text-left space-y-5 sm:space-y-6">
              {/* Eyebrow Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B58A45]/15 border border-[#B58A45]/35 text-[#D4AF37] text-[10px] sm:text-xs font-semibold tracking-wider uppercase shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
                <span>WHO WE ARE</span>
              </div>

              {/* Exact Section Heading Preserved */}
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-black font-heading tracking-tight leading-[1.08] text-[#FAF7F0]">
                Technology Built Around{" "}
                <span className="bg-gradient-to-r from-[#D4AF37] via-[#C99E56] to-[#B58A45] bg-clip-text text-transparent">
                  Your Vision.
                </span>
              </h2>

              {/* Exact Subtitle Preserved */}
              <p className="text-sm sm:text-base md:text-lg text-[#C5BCB0] max-w-xl font-normal leading-relaxed">
                ZYNOVA is a digital technology brand focused on building modern software, websites, applications, automation systems, and data-driven business solutions.
              </p>

              {/* Key Capabilities Bullet Points */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 w-full max-w-lg">
                <div className="flex items-center gap-2 text-xs sm:text-[13px] text-[#A89F91]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B58A45] shrink-0" />
                  <span>Modern full-stack web &amp; mobile</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-[13px] text-[#A89F91]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B58A45] shrink-0" />
                  <span>Scalable cloud backend APIs</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-[13px] text-[#A89F91]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B58A45] shrink-0" />
                  <span>Actionable Power BI dashboards</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-[13px] text-[#A89F91]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B58A45] shrink-0" />
                  <span>Automated workflow pipelines</span>
                </div>
              </div>

              {/* Preserved CTA Buttons with standard interaction */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
                <div className="relative group">
                  <div className="absolute -inset-1 rounded-full bg-[#B58A45]/30 blur-md group-hover:bg-[#B58A45]/50 transition-all duration-300 pointer-events-none" />
                  <MagneticButton
                    asAnchor
                    href="#services"
                    onClick={(e) => {
                      e.preventDefault();
                      handleScrollTo("services");
                    }}
                    variant="gold"
                    className="relative !px-5 sm:!px-6 !py-2.5 sm:!py-3 text-xs sm:text-sm font-bold shadow-[0_0_24px_rgba(181,138,69,0.35)]"
                    cursorLabel="SERVICES"
                  >
                    <span>Explore Services</span>
                    <ArrowRight className="w-4 h-4 text-white" />
                  </MagneticButton>
                </div>

                <MagneticButton
                  asAnchor
                  href="#book-call"
                  onClick={(e) => {
                    e.preventDefault();
                    handleScrollTo("book-call");
                  }}
                  variant="secondary"
                  className="!px-5 sm:!px-6 !py-2.5 sm:!py-3 text-xs sm:text-sm font-semibold !bg-white/10 hover:!bg-white/15 !text-white !border-white/15"
                  cursorLabel="BOOK"
                >
                  <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                  <span>Discuss Your Project</span>
                </MagneticButton>
              </div>

              {/* Scroll indicator for the frame progression */}
              <div className="pt-2 flex items-center gap-2 text-[11px] font-mono text-[#756C60]">
                <Layers className="w-3.5 h-3.5 text-[#B58A45]" />
                <span className="tracking-wider uppercase">SCROLL TO ADVANCE ANIMATION</span>
              </div>
            </div>

            {/* Right Column: Kept open as positioning buffer so the product remains completely visible */}
            <div className="hidden lg:block lg:col-span-6 pointer-events-none" aria-hidden="true">
              {/* The high-res 3D product animation in the background canvas fills this visual space */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BuildVision;
