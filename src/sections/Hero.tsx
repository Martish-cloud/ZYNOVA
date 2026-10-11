import React from "react";
import { siteConfig } from "../config/siteConfig";
import { HeroBackground } from "./HeroBackground";
import { MagneticButton } from "../components/ui/MagneticButton";
import { Badge } from "../components/ui/Badge";
import { TypewriterHeroHeadline } from "../components/ui/TypewriterHeroHeadline";
import { useInViewAnimation } from "../hooks/useInViewAnimation";
import { ArrowRight, Sparkles, Layers, ShieldCheck } from "lucide-react";

export const Hero: React.FC = () => {
  const { ref: heroRef, isInView, prefersReducedMotion } = useInViewAnimation<HTMLElement>({
    threshold: 0.1,
    rootMargin: "0px",
    retrigger: true
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
      className="relative min-h-screen flex items-center justify-center pt-24 pb-12 md:py-24 overflow-hidden"
    >
      {/* Dynamic Animated Canvas & Ambient Backing */}
      <HeroBackground />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Top Micro Badge with Official Brand Tagline */}
        <div
          className={`mb-3.5 sm:mb-4 transition-all duration-700 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3 pointer-events-none"
          }`}
        >
          <Badge variant="gold" className="py-1 px-3.5 text-[11px] sm:text-xs font-semibold tracking-wide">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>BUILDING DIGITAL SOLUTIONS &bull; EMPOWERING BUSINESS GROWTH</span>
          </Badge>
        </div>

        {/* Cinematic Main Headline */}
        <TypewriterHeroHeadline />

        {/* Supporting Copy */}
        <p
          className={`text-xs sm:text-sm md:text-base text-slate-100 drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)] max-w-2xl leading-relaxed mb-4 sm:mb-5 font-normal transition-all duration-700 delay-100 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
          }`}
        >
          {siteConfig.brandName} is a premium technology studio engineering high-performance websites, scalable software, mobile apps, intelligent automation workflows, and actionable business intelligence.
        </p>

        {/* Founder Credential Line */}
        <div
          className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full liquid-glass-pill text-[11px] sm:text-xs text-slate-200 font-medium mb-6 sm:mb-7 transition-all duration-700 delay-150 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
          <span>
            Founded by <span className="text-white font-bold">{siteConfig.founder.name}</span> &bull; {siteConfig.founder.location} &bull; <span className="text-amber-300 font-semibold">{siteConfig.metrics.responseTime} Response</span>
          </span>
        </div>

        {/* Primary Call To Actions */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-8 sm:mb-10">
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
            <Sparkles className="w-4 h-4 text-slate-950" />
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
            className="!px-5 sm:!px-6 !py-2.5 sm:!py-3 text-xs sm:text-sm font-semibold !text-slate-100 !border-amber-400/50 hover:!border-amber-400 hover:!text-amber-300"
            cursorLabel="SERVICES"
          >
            <span>Explore Services</span>
            <ArrowRight className="w-4 h-4 text-amber-400" />
          </MagneticButton>

          <MagneticButton
            asAnchor
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("projects");
            }}
            variant="ghost"
            className="!px-4 sm:!px-5 !py-2.5 sm:!py-3 text-xs sm:text-sm font-semibold liquid-glass-pill !text-slate-100 hover:!border-amber-400/60 hover:!text-amber-300"
            cursorLabel="WORK"
          >
            <Layers className="w-4 h-4 text-slate-300" />
            <span>View Projects</span>
          </MagneticButton>
        </div>

        {/* Subtle Scroll Down Indicator */}
        <button
          onClick={() => scrollToSection("stats")}
          className="inline-flex flex-col items-center gap-2 text-slate-200 hover:text-amber-300 drop-shadow-[0_1px_8px_rgba(0,0,0,0.7)] transition-colors cursor-pointer group"
          aria-label="Scroll down to explore"
        >
          <span className="text-[11px] font-mono tracking-widest uppercase group-hover:tracking-wider transition-all font-semibold">
            SCROLL TO EXPLORE
          </span>
          <div className="w-6 h-9 rounded-full border-2 border-white/40 bg-white/[0.14] backdrop-blur-md flex items-start justify-center p-1 group-hover:border-amber-400 transition-colors shadow-sm">
            <span className="w-1.5 h-2 rounded-full bg-amber-400 animate-bounce" />
          </div>
        </button>
      </div>
    </section>
  );
};
