import React from "react";
import { SectionHeading } from "../components/ui/SectionHeading";
import { useInViewAnimation } from "../hooks/useInViewAnimation";
import { useCursor } from "../context/useCursor";
import { Clock, Cpu, Target, ShieldCheck, Sparkles } from "lucide-react";

export const WhyZynova: React.FC = () => {
  const { setCursor, resetCursor } = useCursor();
  const {
    ref: cardsRef,
    isInView: isCardsInView,
    prefersReducedMotion
  } = useInViewAnimation<HTMLDivElement>({
    threshold: 0.15,
    rootMargin: "0px 0px -6% 0px",
    retrigger: true
  });

  const reasons = [
    {
      number: "01",
      icon: Clock,
      title: "Fast Communication",
      highlight: "12h Response Guarantee",
      description: "Typical response time within 12 hours. Clear, proactive communication across project milestones with zero ambiguity.",
      accent: "from-amber-500/20 to-yellow-500/20",
      iconColor: "text-amber-300"
    },
    {
      number: "02",
      icon: Cpu,
      title: "Modern Technology",
      highlight: "Typed & Cloud-Native",
      description: "Solutions built using modern development, AI pipelines, and automation technologies designed for optimal velocity and durability.",
      accent: "from-yellow-500/20 to-amber-500/20",
      iconColor: "text-amber-300"
    },
    {
      number: "03",
      icon: Target,
      title: "Business-Focused",
      highlight: "Tied to Real Outcomes",
      description: "Technology is designed around practical business requirements — ensuring your software drives real conversions, operational speed, and savings.",
      accent: "from-amber-500/20 to-yellow-500/20",
      iconColor: "text-amber-300"
    },
    {
      number: "04",
      icon: ShieldCheck,
      title: "Client Ownership",
      highlight: "100% Code & Asset Rights",
      description: "100% client ownership. Every line of code, design asset, and cloud configuration belongs entirely to you upon completion.",
      accent: "from-yellow-500/20 to-amber-500/20",
      iconColor: "text-amber-300"
    }
  ];

  return (
    <section id="why-zynova" className="py-14 sm:py-18 md:py-20 relative z-10 bg-transparent border-t border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="WHY WORK WITH ZYNOVA"
          title="Engineered for Reliability and"
          highlightedTitle="Predictable Success."
          subtitle="We eliminate the uncertainty of software development through transparent milestones, fast communication, and modern engineering standards."
          subtitleVariant="ltr"
        />

        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-4.5 lg:gap-5"
        >
          {reasons.map((r, index) => {
            const Icon = r.icon;
            return (
              <div
                key={r.number}
                style={
                  !prefersReducedMotion
                    ? { transitionDelay: isCardsInView ? `${index * 80}ms` : "0ms" }
                    : undefined
                }
                className={`h-full ${
                  !prefersReducedMotion
                    ? `transition-all duration-[650ms] ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[transform,opacity] ${
                        isCardsInView
                          ? "opacity-100 translate-y-0 scale-100"
                          : "opacity-0 translate-y-5 scale-[0.97]"
                      }`
                    : ""
                }`}
              >
                <div
                  tabIndex={0}
                  role="region"
                  aria-label={r.title}
                  onMouseEnter={() => setCursor("project", r.title)}
                  onMouseLeave={resetCursor}
                  className="h-full group relative p-5 sm:p-5.5 rounded-xl liquid-glass-card !bg-gradient-to-br !from-slate-950/75 !via-slate-900/65 !to-slate-950/80 border border-white/20 hover:!border-amber-400/60 shadow-[0_8px_24px_rgba(0,0,0,0.32),inset_0_1px_0_rgba(255,255,255,0.20)] hover:shadow-[0_16px_36px_-8px_rgba(245,158,11,0.25),inset_0_1px_0_rgba(255,255,255,0.28)] transition-all duration-300 flex flex-col justify-between focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/80 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 cursor-pointer"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3.5 sm:mb-4">
                      <span className="font-mono text-xs font-bold text-amber-400/80 group-hover:text-amber-300 transition-colors">
                        // {r.number}
                      </span>
                      <div className="p-2.5 rounded-lg bg-amber-400/[0.18] border border-amber-400/40 shadow-[inset_0_1px_0_rgba(255,255,255,0.35)] group-hover:scale-105 group-hover:border-amber-300 transition-all duration-300">
                        <Icon className={`w-4 h-4 sm:w-4.5 sm:h-4.5 ${r.iconColor}`} />
                      </div>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold font-heading text-white mb-1.5 group-hover:text-amber-300 transition-colors">
                      {r.title}
                    </h3>

                    <div className="inline-block text-[10.5px] font-mono px-2 py-0.5 rounded bg-amber-400/[0.18] text-amber-300 mb-3 border border-amber-400/40 font-bold shadow-xs">
                      {r.highlight}
                    </div>

                    <p className="text-xs text-slate-200 font-normal leading-relaxed">
                      {r.description}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-white/15 flex items-center gap-2 text-[10.5px] font-mono font-semibold text-slate-200">
                    <Sparkles className="w-3 h-3 text-amber-400" />
                    <span>Standard on every engagement</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

