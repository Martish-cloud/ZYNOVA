import React from "react";
import { siteConfig } from "../config/siteConfig";
import { HeroFramePlayer } from "./HeroFramePlayer";
import { MagneticButton } from "../components/ui/MagneticButton";
import { Badge } from "../components/ui/Badge";
import { WordReveal } from "../components/motion/WordReveal";
import { BlurFadeUp } from "../components/motion/BlurFadeUp";
import { useInViewAnimation } from "../hooks/useInViewAnimation";
import { useSmoothScroll } from "../components/motion/SmoothScroll";
import { ArrowRight, Sparkles, Layers, ShieldCheck } from "lucide-react";

export const Hero: React.FC = () => {
  const { ref: heroRef, isInView, prefersReducedMotion } = useInViewAnimation<HTMLElement>({
    threshold: 0.05,
    rootMargin: "0px",
  });
  const { scrollTo } = useSmoothScroll();

  const handleScrollTo = (id: string) => {
    scrollTo(`#${id}`);
  };

  const isVisible = prefersReducedMotion || isInView;

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-[95vh] lg:min-h-screen flex items-center justify-center pt-28 pb-16 sm:pt-32 sm:pb-20 md:py-28 overflow-hidden bg-transparent"
    >
      {/* Espresso Deep Ambient Lighting */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        <div className="absolute top-[10%] left-[15%] w-[650px] h-[650px] rounded-full bg-[radial-gradient(circle,rgba(181,138,69,0.08)_0%,transparent_70%)]" />
        <div className="absolute bottom-[5%] right-[5%] w-[550px] h-[550px] rounded-full bg-[radial-gradient(circle,rgba(181,138,69,0.05)_0%,transparent_70%)]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-10 xl:gap-14 items-center">
          {/* Left Column: Far-Left Aligned Brand Headline, Narrative & CTAs */}
          <div className="lg:col-span-6 xl:col-span-6 flex flex-col items-start text-left">
            {/* Top Micro Badge with Official Brand Tagline */}
            <BlurFadeUp delay={0.05} y={-10} className="mb-3.5 sm:mb-4">
              <Badge
                variant="gold"
                className="py-1 px-3 sm:px-3.5 text-[10px] sm:text-xs font-semibold tracking-wide bg-[#B58A45]/15 border-[#B58A45]/35 text-[#D4AF37]"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#B58A45]" />
                <span>BUILDING DIGITAL SOLUTIONS &bull; EMPOWERING BUSINESS GROWTH</span>
              </Badge>
            </BlurFadeUp>

            {/* Massive Cinematic Word-Reveal Headline */}
            <div className="mb-4 sm:mb-5">
              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl font-black font-heading tracking-tighter leading-[0.98] text-[#FAF7F0] flex flex-col items-start">
                <WordReveal
                  text="BUILD. AUTOMATE."
                  as="span"
                  wordClassName="text-[#FAF7F0]"
                  stagger={0.07}
                  initialDelay={0.1}
                />
                <WordReveal
                  text="SCALE WHAT'S NEXT."
                  as="span"
                  highlightWords={["SCALE", "WHAT'S", "NEXT."]}
                  highlightClassName="bg-gradient-to-r from-[#D4AF37] via-[#C99E56] to-[#B58A45] bg-clip-text text-transparent"
                  stagger={0.07}
                  initialDelay={0.25}
                />
              </h1>
            </div>

            {/* Supporting Copy */}
            <BlurFadeUp delay={0.3} y={15}>
              <p className="text-xs sm:text-sm md:text-base text-[#C5BCB0] max-w-xl leading-relaxed mb-4 sm:mb-5 font-normal">
                {siteConfig.brandName} is a premium technology studio engineering high-performance websites, scalable software, mobile apps, intelligent automation workflows, and actionable business intelligence.
              </p>
            </BlurFadeUp>

            {/* Founder Credential Line */}
            <BlurFadeUp delay={0.4} y={15}>
              <div className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-white/10 text-[11px] sm:text-xs text-[#C5BCB0] font-medium mb-6 sm:mb-7 shadow-xs">
                <ShieldCheck className="w-3.5 h-3.5 text-[#B58A45]" />
                <span>
                  Founded by <span className="text-white font-bold">{siteConfig.founder.name}</span> &bull; {siteConfig.founder.location} &bull; <span className="text-[#D4AF37] font-semibold">{siteConfig.metrics.responseTime} Response</span>
                </span>
              </div>
            </BlurFadeUp>

            {/* Primary Call To Actions */}
            <BlurFadeUp delay={0.5} y={15}>
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-7 sm:mb-8">
                {/* Primary CTA with bespoke golden under-glow */}
                <div className="relative group">
                  <div className="absolute -inset-1 rounded-full bg-[#B58A45]/40 blur-lg group-hover:bg-[#B58A45]/60 transition-all duration-300 pointer-events-none" />
                  <MagneticButton
                    asAnchor
                    href="#book-call"
                    onClick={(e) => {
                      e.preventDefault();
                      handleScrollTo("book-call");
                    }}
                    variant="gold"
                    className="relative !px-5 sm:!px-6 !py-2.5 sm:!py-3 text-xs sm:text-sm font-bold shadow-[0_0_28px_rgba(181,138,69,0.45)] hover:shadow-[0_0_42px_rgba(181,138,69,0.65)]"
                    cursorLabel="BOOK"
                  >
                    <Sparkles className="w-4 h-4 text-white" />
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
                  <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
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
                  <Layers className="w-4 h-4 text-[#D4AF37]" />
                  <span>View Our Projects</span>
                </MagneticButton>
              </div>
            </BlurFadeUp>

            {/* Subtle Scroll Down Indicator */}
            <BlurFadeUp delay={0.6} y={15}>
              <button
                onClick={() => handleScrollTo("stats")}
                className="inline-flex items-center gap-2.5 text-[#A89F91] hover:text-[#D4AF37] transition-colors cursor-pointer group"
                aria-label="Scroll down to explore"
              >
                <div className="w-5 h-8 rounded-full border-2 border-white/20 bg-white/5 flex items-start justify-center p-1 group-hover:border-[#B58A45] transition-colors shadow-xs">
                  <span className="w-1.5 h-2 rounded-full bg-[#B58A45] animate-bounce" />
                </div>
                <span className="text-[11px] font-mono tracking-widest uppercase group-hover:tracking-wider transition-all font-semibold">
                  SCROLL TO EXPLORE
                </span>
              </button>
            </BlurFadeUp>
          </div>

          {/* Right Column: 277-Frame Cinematic Animation Player */}
          <div
            className={`lg:col-span-6 xl:col-span-6 w-full flex items-center justify-center transition-all duration-700 delay-200 ease-out ${
              isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-6 scale-[0.98]"
            }`}
          >
            <HeroFramePlayer />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
