import React, { useRef, useState, useEffect, useCallback } from "react";
import { siteConfig } from "../config/siteConfig";
import { ZynovaHeroScrollCanvas } from "../components/ui/ZynovaHeroScrollCanvas";
import { PersistentVerticalScrollText } from "../components/ui/PersistentVerticalScrollText";
import { MagneticButton } from "../components/ui/MagneticButton";
import { Badge } from "../components/ui/Badge";
import { BlurFadeUp } from "../components/motion/BlurFadeUp";
import { useSmoothScroll } from "../components/motion/SmoothScroll";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { ArrowRight, Sparkles, Layers, ShieldCheck } from "lucide-react";

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const { scrollTo } = useSmoothScroll();

  const handleScrollTo = (id: string) => {
    scrollTo(`#${id}`);
  };

  // Scroll listener tracking Hero section progress to scrub frames smoothly
  const handleScroll = useCallback(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const windowH = window.innerHeight;
    const totalH = containerRef.current.offsetHeight;

    // Scroll range: from section top entering viewport to when section finishes runway
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
      id="hero"
      ref={containerRef}
      className="relative w-full bg-[#080706] text-white overflow-hidden"
      style={{
        // 175vh provides ~650-750px of comfortable tactile scroll travel for 234 frames
        // before BuildVision rises smoothly over it with zero dead gap
        minHeight: "175vh",
      }}
      aria-label="Home Hero"
    >
      {/* Sticky Full-Viewport Stage */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center pt-16 sm:pt-20 pb-8">
        {/* Priority 1: Persistent Left-Side Hero Scrolling Text - Confined Strictly to Hero */}
        <PersistentVerticalScrollText />

        {/* Full-Section Background Canvas: 234-Frame Zynova Hero Scroll-Driven Animation */}
        <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
          <ZynovaHeroScrollCanvas
            progress={prefersReducedMotion ? 0 : scrollProgress}
            className="w-full h-full"
          />

          {/* Restored Subtle Cyber Grid Pattern */}
          <div
            className="absolute inset-0 bg-cyber-grid opacity-25 pointer-events-none z-[1]"
            aria-hidden="true"
          />

          {/* Left-Side Dark Gradient Veil to Guarantee Crisp Text Readability while keeping Product Bright on Right */}
          <div
            className="absolute inset-0 pointer-events-none bg-gradient-to-r from-[#080706] via-[#080706]/92 md:via-[#080706]/78 lg:via-[#080706]/60 to-transparent z-[2]"
            aria-hidden="true"
          />

          {/* Subtle Top & Bottom Fade */}
          <div
            className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#080706] to-transparent pointer-events-none z-[2]"
            aria-hidden="true"
          />
          <div
            className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#080706] to-transparent pointer-events-none z-[2]"
            aria-hidden="true"
          />
        </div>

        {/* Foreground Content: Brand Headline, Narrative & CTAs on the Left */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-8 md:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-10 xl:gap-14 items-center">
            {/* Left Column: Far-Left Aligned Brand Headline, Narrative & CTAs */}
            <div className="lg:col-span-6 xl:col-span-6 flex flex-col items-start text-left pl-6 sm:pl-8 lg:pl-10">
              {/* Top Micro Badge with Official Brand Tagline */}
              <BlurFadeUp delay={0.05} y={-10} className="mb-3.5 sm:mb-4">
                <Badge
                  variant="gold"
                  className="py-1 px-3 sm:px-3.5 text-[10px] sm:text-xs font-semibold tracking-wide bg-[#D0A04B]/15 border-[#D0A04B]/35 text-[#D0A04B]"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#D0A04B]" />
                  <span>BUILDING DIGITAL SOLUTIONS &bull; EMPOWERING BUSINESS GROWTH</span>
                </Badge>
              </BlurFadeUp>

              {/* Priority 2: Restored Unclipped Hero Headline */}
              <div className="mb-4 sm:mb-5 w-full">
                <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-[78px] font-black font-heading tracking-tight leading-[1.08] text-white flex flex-col items-start pb-1">
                  <span className="text-white block whitespace-nowrap drop-shadow-sm">
                    BUILD. AUTOMATE.
                  </span>
                  <span className="bg-gradient-to-r from-[#D0A04B] via-[#E2B768] to-[#A9792E] bg-clip-text text-transparent block whitespace-nowrap">
                    SCALE WHAT'S NEXT.
                  </span>
                </h1>
              </div>

              {/* Supporting Copy */}
              <BlurFadeUp delay={0.25} y={15}>
                <p className="text-xs sm:text-sm md:text-base text-[#D4CEC4] max-w-xl leading-relaxed mb-4 sm:mb-5 font-normal">
                  {siteConfig.brandName} is a premium technology studio engineering high-performance websites, scalable software, mobile apps, intelligent automation workflows, and actionable business intelligence.
                </p>
              </BlurFadeUp>

              {/* Founder Credential Line */}
              <BlurFadeUp delay={0.4} y={15}>
                <div className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-white/10 text-[11px] sm:text-xs text-[#D4CEC4] font-medium mb-6 sm:mb-7 shadow-xs">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#D0A04B]" />
                  <span>
                    Founded by <span className="text-white font-bold">{siteConfig.founder.name}</span> &bull; {siteConfig.founder.location} &bull; <span className="text-[#D0A04B] font-semibold">{siteConfig.metrics.responseTime} Response</span>
                  </span>
                </div>
              </BlurFadeUp>

              {/* Primary Call To Actions */}
              <BlurFadeUp delay={0.5} y={15}>
                <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-7 sm:mb-8">
                  {/* Primary CTA with bespoke golden under-glow */}
                  <div className="relative group">
                    <div className="absolute -inset-1 rounded-full bg-[#D0A04B]/40 blur-lg group-hover:bg-[#D0A04B]/60 transition-all duration-300 pointer-events-none" />
                    <MagneticButton
                      asAnchor
                      href="#book-call"
                      onClick={(e) => {
                        e.preventDefault();
                        handleScrollTo("book-call");
                      }}
                      variant="gold"
                      className="relative !px-5 sm:!px-6 !py-2.5 sm:!py-3 text-xs sm:text-sm font-bold shadow-[0_0_28px_rgba(208,160,75,0.45)] hover:shadow-[0_0_42px_rgba(208,160,75,0.65)]"
                      cursorLabel="BOOK"
                    >
                      <Sparkles className="w-4 h-4 text-[#080706]" />
                      <span>Book a Discovery Call</span>
                    </MagneticButton>
                  </div>

                  <MagneticButton
                    asAnchor
                    href="#services"
                    onClick={(e) => {
                      e.preventDefault();
                      handleScrollTo("services");
                    }}
                    variant="secondary"
                    className="!px-5 sm:!px-6 !py-2.5 sm:!py-3 text-xs sm:text-sm font-semibold !bg-white/10 hover:!bg-white/15 !text-white !border-white/15"
                    cursorLabel="SERVICES"
                  >
                    <span>Explore Services</span>
                    <ArrowRight className="w-4 h-4 text-[#D0A04B]" />
                  </MagneticButton>

                  <MagneticButton
                    asAnchor
                    href="#projects"
                    onClick={(e) => {
                      e.preventDefault();
                      handleScrollTo("projects");
                    }}
                    variant="outline"
                    className="!px-4 sm:!px-5 !py-2.5 sm:!py-3 text-xs sm:text-sm font-semibold !bg-white/5 hover:!bg-white/10 !text-white/90 !border-white/15"
                    cursorLabel="WORK"
                  >
                    <Layers className="w-4 h-4 text-[#D0A04B]" />
                    <span>View Our Projects</span>
                  </MagneticButton>
                </div>
              </BlurFadeUp>

              {/* Scroll Down Indicator */}
              <BlurFadeUp delay={0.6} y={15}>
                <button
                  onClick={() => handleScrollTo("vision")}
                  className="inline-flex items-center gap-2.5 text-[#A89F91] hover:text-[#D0A04B] transition-colors cursor-pointer group"
                  aria-label="Scroll down to explore"
                >
                  <div className="w-5 h-8 rounded-full border-2 border-white/20 bg-white/5 flex items-start justify-center p-1 group-hover:border-[#D0A04B] transition-colors shadow-xs">
                    <span className="w-1.5 h-2 rounded-full bg-[#D0A04B] animate-bounce" />
                  </div>
                  <span className="text-[11px] font-mono tracking-widest uppercase group-hover:tracking-wider transition-all font-semibold">
                    SCROLL TO ADVANCE ANIMATION
                  </span>
                </button>
              </BlurFadeUp>
            </div>

            {/* Right Column: Kept as clear visual buffer so the animated product (laptop) shines through on the right */}
            <div className="hidden lg:block lg:col-span-6 pointer-events-none" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
