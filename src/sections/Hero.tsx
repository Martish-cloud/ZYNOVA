import React from "react";
import { siteConfig } from "../config/siteConfig";
import { HeroFramePlayer } from "./HeroFramePlayer";
import { MagneticButton } from "../components/ui/MagneticButton";
import { Badge } from "../components/ui/Badge";
import { TypewriterHeroHeadline } from "../components/ui/TypewriterHeroHeadline";
import { useInViewAnimation } from "../hooks/useInViewAnimation";
import { ArrowRight, Sparkles, Layers, ShieldCheck } from "lucide-react";

export const Hero: React.FC = () => {
  const { ref: heroRef, isInView, prefersReducedMotion } = useInViewAnimation<HTMLElement>({
    threshold: 0.05,
    rootMargin: "0px"
  });

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const isVisible = prefersReducedMotion || isInView;

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-14 sm:pt-32 sm:pb-18 md:py-28 overflow-hidden bg-[#FAF7F0]"
    >
      {/* Subtle Warm Ivory Light Ambient Background Wash */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-[10%] right-[5%] w-[650px] h-[650px] rounded-full bg-[radial-gradient(circle,rgba(240,228,210,0.65)_0%,transparent_70%)]" />
        <div className="absolute bottom-[5%] left-[0%] w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(181,138,69,0.06)_0%,transparent_70%)]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-10 xl:gap-14 items-center">
          {/* Left Column: Far-Left Aligned Brand Headline, Narrative & CTAs */}
          <div className="lg:col-span-6 xl:col-span-6 flex flex-col items-start text-left">
            {/* Top Micro Badge with Official Brand Tagline */}
            <div
              className={`mb-3.5 sm:mb-4 transition-all duration-700 ease-out ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3 pointer-events-none"
              }`}
            >
              <Badge variant="gold" className="py-1 px-3 sm:px-3.5 text-[10px] sm:text-xs font-semibold tracking-wide">
                <Sparkles className="w-3.5 h-3.5 text-[#B58A45]" />
                <span>BUILDING DIGITAL SOLUTIONS &bull; EMPOWERING BUSINESS GROWTH</span>
              </Badge>
            </div>

            {/* Cinematic Main Headline with Left Alignment */}
            <TypewriterHeroHeadline align="left" className="!mb-3 sm:!mb-4" />

            {/* Supporting Copy */}
            <p
              className={`text-xs sm:text-sm md:text-base text-[#574F44] max-w-xl leading-relaxed mb-4 sm:mb-5 font-normal transition-all duration-700 delay-100 ease-out ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
              }`}
            >
              {siteConfig.brandName} is a premium technology studio engineering high-performance websites, scalable software, mobile apps, intelligent automation workflows, and actionable business intelligence.
            </p>

            {/* Founder Credential Line */}
            <div
              className={`inline-flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-full bg-white/90 border border-[#E5D9C8] text-[11px] sm:text-xs text-[#574F44] font-medium mb-6 sm:mb-7 shadow-xs transition-all duration-700 delay-150 ease-out ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#B58A45]" />
              <span>
                Founded by <span className="text-[#292720] font-bold">{siteConfig.founder.name}</span> &bull; {siteConfig.founder.location} &bull; <span className="text-[#9E7432] font-semibold">{siteConfig.metrics.responseTime} Response</span>
              </span>
            </div>

            {/* Primary Call To Actions */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-7 sm:mb-8">
              <MagneticButton
                asAnchor
                href="#book-call"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("book-call");
                }}
                variant="gold"
                className="!px-5 sm:!px-6 !py-2.5 sm:!py-3 text-xs sm:text-sm font-bold"
                cursorLabel="BOOK"
              >
                <Sparkles className="w-4 h-4 text-white" />
                <span>Book a Discovery Call</span>
              </MagneticButton>

              <MagneticButton
                asAnchor
                href="#services"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("services");
                }}
                variant="secondary"
                className="!px-5 sm:!px-6 !py-2.5 sm:!py-3 text-xs sm:text-sm font-semibold"
                cursorLabel="SERVICES"
              >
                <span>Explore Services</span>
                <ArrowRight className="w-4 h-4 text-[#B58A45]" />
              </MagneticButton>

              <MagneticButton
                asAnchor
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("projects");
                }}
                variant="outline"
                className="!px-4 sm:!px-5 !py-2.5 sm:!py-3 text-xs sm:text-sm font-semibold"
                cursorLabel="WORK"
              >
                <Layers className="w-4 h-4 text-[#B58A45]" />
                <span>View Our Projects</span>
              </MagneticButton>
            </div>

            {/* Subtle Scroll Down Indicator */}
            <button
              onClick={() => scrollToSection("stats")}
              className="inline-flex items-center gap-2.5 text-[#756C60] hover:text-[#B58A45] transition-colors cursor-pointer group"
              aria-label="Scroll down to explore"
            >
              <div className="w-5 h-8 rounded-full border-2 border-[#E5D9C8] bg-white flex items-start justify-center p-1 group-hover:border-[#B58A45] transition-colors shadow-xs">
                <span className="w-1.5 h-2 rounded-full bg-[#B58A45] animate-bounce" />
              </div>
              <span className="text-[11px] font-mono tracking-widest uppercase group-hover:tracking-wider transition-all font-semibold">
                SCROLL TO EXPLORE
              </span>
            </button>
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
