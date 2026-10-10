import React, { useState, Suspense } from "react";
import { siteConfig } from "../config/siteConfig";
import { SectionHeading } from "../components/ui/SectionHeading";
import { TypewriterText } from "../components/ui/TypewriterText";
import { useCursor } from "../context/useCursor";
import { useInViewAnimation } from "../hooks/useInViewAnimation";
import { ShieldCheck, MapPin, Terminal, Cpu, Clock, CheckCircle2, Sparkles, ExternalLink } from "lucide-react";

const PortfolioShowcaseModal = React.lazy(() =>
  import("../components/portfolio/PortfolioShowcaseModal").then((m) => ({ default: m.PortfolioShowcaseModal }))
);

export const About: React.FC = () => {
  const { setCursor, resetCursor } = useCursor();
  const [isPortfolioModalOpen, setIsPortfolioModalOpen] = useState(false);

  const {
    ref: narrativeRef,
    isInView: isNarrativeInView,
    triggerCount: narrativeTriggerCount,
    prefersReducedMotion
  } = useInViewAnimation<HTMLDivElement>({
    threshold: 0.16,
    rootMargin: "0px 0px -6% 0px",
    retrigger: true
  });

  const {
    ref: commitmentsRef,
    isInView: isCommitmentsInView
  } = useInViewAnimation<HTMLDivElement>({
    threshold: 0.15,
    rootMargin: "0px 0px -6% 0px",
    retrigger: true
  });

  const {
    ref: founderRef,
    isInView: isFounderInView
  } = useInViewAnimation<HTMLDivElement>({
    threshold: 0.15,
    rootMargin: "0px 0px -6% 0px",
    retrigger: true
  });

  const commitments = [
    {
      title: "Full IP Transfer",
      description: "100% client ownership of repositories, code, design assets, and environments.",
      iconColor: "text-amber-400"
    },
    {
      title: "Clean Engineering",
      description: "Modern typed stacks, clean modular architecture, and zero unnecessary bloat.",
      iconColor: "text-amber-400"
    },
    {
      title: "Agile Turnaround",
      description: "Guaranteed responses within 12 hours with transparent development milestones.",
      iconColor: "text-amber-400"
    },
    {
      title: "Actionable Analytics",
      description: "Deep mastery of Excel automation and Power BI to transform messy data into clarity.",
      iconColor: "text-amber-400"
    }
  ];

  return (
    <section id="about" className="py-14 sm:py-18 md:py-20 relative z-10 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="WHO WE ARE"
          title="Technology Built Around"
          highlightedTitle="Your Vision."
          subtitle="ZYNOVA is a digital technology brand focused on building modern software, websites, applications, automation systems, and data-driven business solutions."
          subtitleVariant="ltr"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Column: Mission & Capabilities */}
          <div ref={narrativeRef} className="lg:col-span-7 space-y-4 sm:space-y-5">
            {/* Step 1: High-Contrast Main Subheading with Slide-Up / Pop-Up Reveal */}
            <h3
              className={`text-xl sm:text-2xl md:text-[26px] font-bold font-heading text-white drop-shadow-[0_2px_16px_rgba(0,0,0,0.8)] leading-snug border-l-3 border-amber-400 pl-3.5 sm:pl-4 ${
                !prefersReducedMotion
                  ? `transition-all duration-[680ms] ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[transform,opacity] ${
                      isNarrativeInView
                        ? "opacity-100 translate-y-0 scale-100"
                        : "opacity-0 translate-y-4 scale-[0.98]"
                    }`
                  : ""
              }`}
            >
              Practical digital engineering for{" "}
              <span className="bg-gradient-to-r from-[#FEF08A] via-[#FBBF24] to-[#F59E0B] bg-clip-text text-transparent">
                ambitious entrepreneurs &amp; enterprises.
              </span>
            </h3>

            {/* Supporting Narrative Glass Panel for High Readability */}
            <div className="p-4 sm:p-5 rounded-2xl liquid-glass-panel !bg-gradient-to-br !from-slate-950/75 !via-slate-900/65 !to-slate-950/80 border border-white/20 shadow-[0_12px_32px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.22)] space-y-3.5">
              {/* Step 2: First Supporting Paragraph — Left-to-Right + Subtle Upward Reveal */}
              <p
                style={
                  !prefersReducedMotion
                    ? { transitionDelay: isNarrativeInView ? "140ms" : "0ms" }
                    : undefined
                }
                className={`text-slate-100 font-normal leading-relaxed text-xs sm:text-sm ${
                  !prefersReducedMotion
                    ? `transition-all duration-[680ms] ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[transform,opacity] ${
                        isNarrativeInView
                          ? "opacity-100 translate-x-0 translate-y-0"
                          : "opacity-0 -translate-x-5 translate-y-2.5"
                      }`
                    : ""
                }`}
              >
                At ZYNOVA, we believe software must be resilient, beautiful, and directly tied to business results. We combine modern full-stack development, mobile engineering, AI workflows, and precision data analytics to solve tangible challenges.
              </p>

              {/* Step 3: Second Supporting Paragraph — Typewriter + Story-Like Upward Reveal */}
              <div className="text-slate-100 font-normal leading-relaxed text-xs sm:text-sm pt-2.5 border-t border-white/15">
                <TypewriterText
                  text="Whether building an e-commerce platform from the ground up, engineering enterprise backend APIs, automating error-prone Excel workflows, or delivering high-level Power BI reporting models, our focus is uncompromising quality and long-term scalability."
                  isActive={isNarrativeInView}
                  triggerKey={narrativeTriggerCount}
                  startDelayMs={300}
                  durationMs={1350}
                  cursorColorClass="bg-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.6)]"
                  withUpwardMotion={true}
                />
              </div>
            </div>

            {/* Step 4: Core Values / Commitments with Controlled Staggered Sequence */}
            <div ref={commitmentsRef} className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {commitments.map((item, idx) => (
                <div
                  key={item.title}
                  tabIndex={0}
                  role="region"
                  aria-label={item.title}
                  style={
                    !prefersReducedMotion
                      ? {
                          transitionDelay: isCommitmentsInView ? `${idx * 80}ms` : "0ms"
                        }
                      : undefined
                  }
                  className={`group p-3.5 rounded-xl liquid-glass-card !bg-gradient-to-br !from-slate-950/75 !via-slate-900/65 !to-slate-950/80 border border-white/20 hover:!border-amber-400/50 shadow-[0_8px_20px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.18)] hover:shadow-[0_12px_28px_-8px_rgba(245,158,11,0.22),inset_0_1px_0_rgba(255,255,255,0.25)] flex items-start gap-2.5 transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/80 ${
                    isCommitmentsInView
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                  }`}
                >
                  <CheckCircle2 className={`w-4 h-4 ${item.iconColor} shrink-0 mt-0.5 transition-transform duration-300 group-hover:scale-105`} />
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-amber-300 transition-colors duration-200">
                      {item.title}
                    </h4>
                    <p className="text-[11px] sm:text-xs text-slate-200 font-normal mt-0.5 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Founder Card with Scroll-Triggered Reveal */}
          <div
            ref={founderRef}
            style={
              !prefersReducedMotion
                ? { transitionDelay: isFounderInView ? "180ms" : "0ms" }
                : undefined
            }
            className={`lg:col-span-5 ${
              !prefersReducedMotion
                ? `transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[transform,opacity] ${
                    isFounderInView
                      ? "opacity-100 translate-y-0 scale-100"
                      : "opacity-0 translate-y-6 scale-[0.97]"
                  }`
                : ""
            }`}
          >
            <div
              tabIndex={0}
              role="region"
              aria-label="Founder Identity"
              onMouseEnter={() => setCursor("project", "FOUNDER")}
              onMouseLeave={resetCursor}
              className="relative p-6 sm:p-7 rounded-2xl liquid-glass-panel !bg-gradient-to-br !from-slate-950/80 !via-slate-900/70 !to-slate-950/85 !border-amber-400/40 overflow-hidden group hover:!border-amber-400/70 shadow-[0_16px_40px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.22)] hover:shadow-[0_20px_48px_-10px_rgba(245,158,11,0.25),inset_0_1px_0_rgba(255,255,255,0.28)] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/80"
            >
              {/* Corner decorative light */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/15 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center justify-between mb-6 border-b border-white/15 pb-4">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-amber-400" />
                  <span className="font-mono text-xs uppercase tracking-wider text-slate-100 font-bold">
                    FOUNDER IDENTITY
                  </span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-400/[0.18] text-amber-300 border border-amber-400/40 font-bold">
                  VERIFIED
                </span>
              </div>

              {/* Founder Details */}
              <div className="space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-400 via-yellow-400 to-amber-600 p-[2px] shadow-[0_4px_20px_rgba(245,158,11,0.3)]">
                  <div className="w-full h-full bg-slate-950/80 rounded-[14px] flex items-center justify-center">
                    <span className="font-heading font-black text-2xl text-transparent bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 bg-clip-text">
                      AH
                    </span>
                  </div>
                </div>

                <div>
                  <h4 className="text-2xl font-bold font-heading text-white">
                    {siteConfig.founder.name}
                  </h4>
                  <p className="text-sm font-bold text-amber-300 mt-0.5">
                    {siteConfig.founder.role}
                  </p>
                </div>

                <div className="space-y-2 text-xs text-slate-200 font-medium font-mono pt-2">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-amber-400" />
                    <span>Location: {siteConfig.founder.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-amber-400" />
                    <span>Response Benchmark: {siteConfig.metrics.responseTime}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-amber-400" />
                    <span>Domain: Full-Stack Web, Mobile, Data Automation</span>
                  </div>
                </div>

                <p className="text-xs text-slate-100 font-normal leading-relaxed pt-2 border-t border-white/15">
                  {siteConfig.founder.bio}
                </p>

                {/* Machine Learning & AI Portfolio Showcase */}
                <div className="pt-2 space-y-2">
                  <div className="flex items-center justify-between pb-0.5">
                    <span className="text-[10.5px] font-mono uppercase tracking-wider text-slate-100 font-bold flex items-center gap-1.5">
                      <Cpu className="w-3.5 h-3.5 text-amber-400" />
                      <span>PORTFOLIO SHOWCASE</span>
                    </span>
                    <span className="text-[10px] font-mono text-amber-300 bg-amber-400/[0.18] px-1.5 py-0.5 rounded border border-amber-400/40 font-bold">
                      Machine Learning &bull; AI
                    </span>
                  </div>

                  <div
                    tabIndex={0}
                    role="button"
                    aria-label="View Amit Halder Machine Learning & AI Portfolio Showcase Details"
                    onClick={() => {
                      resetCursor();
                      setIsPortfolioModalOpen(true);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        resetCursor();
                        setIsPortfolioModalOpen(true);
                      }
                    }}
                    onMouseEnter={() => setCursor("project", "VIEW")}
                    onMouseLeave={resetCursor}
                    className="relative rounded-xl overflow-hidden border border-white/20 hover:border-amber-400/70 bg-slate-950/80 group/img cursor-pointer transition-all duration-300 hover:shadow-[0_12px_28px_-10px_rgba(245,158,11,0.28)] flex flex-col justify-end focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/80"
                  >
                    <img
                      src="/projects/ml-portfolio-preview-v2.webp"
                      alt="Amit Halder — Machine Learning & AI Portfolio Showcase"
                      loading="lazy"
                      className="w-full h-36 sm:h-40 object-cover object-top opacity-95 group-hover/img:opacity-100 group-hover/img:scale-[1.02] transition-all duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent pointer-events-none" />

                    {/* Top badge */}
                    <div className="absolute top-2.5 left-3 pointer-events-none">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-950/80 text-amber-300 border border-amber-400/50 backdrop-blur-md flex items-center gap-1 font-bold shadow-sm">
                        <Sparkles className="w-3 h-3 text-amber-400" />
                        <span>AI / ML Portfolio</span>
                      </span>
                    </div>

                    <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between gap-2">
                      <span className="text-[11px] sm:text-xs font-mono text-white drop-shadow-sm truncate font-bold">
                        Machine Learning Engineer Portfolio
                      </span>
                      <span className="px-2.5 py-1 rounded text-[10.5px] font-mono bg-amber-400 text-slate-950 font-bold border border-amber-300 hover:brightness-110 transition-colors shrink-0 flex items-center gap-1 shadow-sm">
                        <span>Details</span>
                        <ExternalLink className="w-3 h-3 text-slate-950" />
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex items-center gap-2 text-xs text-slate-200 font-normal">
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  <span>Committed to transparent deliverables &amp; high engineering standards.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Internal ML / AI Portfolio Details Modal */}
      {isPortfolioModalOpen && (
        <Suspense fallback={null}>
          <PortfolioShowcaseModal
            isOpen={isPortfolioModalOpen}
            onClose={() => setIsPortfolioModalOpen(false)}
          />
        </Suspense>
      )}
    </section>
  );
};
