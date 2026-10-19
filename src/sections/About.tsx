import React, { useState, useRef, useEffect, Suspense } from "react";
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
  const founderVideoRef = useRef<HTMLVideoElement>(null);

  const {
    ref: narrativeRef,
    isInView: isNarrativeInView,
    triggerCount: narrativeTriggerCount,
    prefersReducedMotion
  } = useInViewAnimation<HTMLDivElement>({
    threshold: 0.16,
    rootMargin: "0px 0px -6% 0px"
  });

  const {
    ref: commitmentsRef,
    isInView: isCommitmentsInView
  } = useInViewAnimation<HTMLDivElement>({
    threshold: 0.15,
    rootMargin: "0px 0px -6% 0px"
  });

  const {
    ref: founderRef,
    isInView: isFounderInView
  } = useInViewAnimation<HTMLDivElement>({
    threshold: 0.15,
    rootMargin: "0px 0px -6% 0px"
  });

  // Ensure Video Project 7 plays reliably when in view
  useEffect(() => {
    const video = founderVideoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;

    if (isFounderInView) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [isFounderInView]);

  const commitments = [
    {
      title: "Full IP Transfer",
      description: "100% client ownership of repositories, code, design assets, and environments.",
      iconColor: "text-[#B58A45]"
    },
    {
      title: "Clean Engineering",
      description: "Modern typed stacks, clean modular architecture, and zero unnecessary bloat.",
      iconColor: "text-[#B58A45]"
    },
    {
      title: "Agile Turnaround",
      description: "Guaranteed responses within 12 hours with transparent development milestones.",
      iconColor: "text-[#B58A45]"
    },
    {
      title: "Actionable Analytics",
      description: "Deep mastery of Excel automation and Power BI to transform messy data into clarity.",
      iconColor: "text-[#B58A45]"
    }
  ];

  return (
    <section id="about" className="py-14 sm:py-18 md:py-20 relative z-10 bg-[#FFFDF8]/70 border-t border-[#E5D9C8]">
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
            {/* Step 1: Main Subheading */}
            <h3
              className={`text-xl sm:text-2xl md:text-[26px] font-bold font-heading text-[#292720] leading-snug border-l-3 border-[#B58A45] pl-3.5 sm:pl-4 ${
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
              <span className="bg-gradient-to-r from-[#B58A45] via-[#C99E56] to-[#9E7432] bg-clip-text text-transparent">
                ambitious entrepreneurs &amp; enterprises.
              </span>
            </h3>

            {/* Supporting Narrative Panel */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#E5D9C8] shadow-[0_4px_20px_rgba(41,39,32,0.05)] space-y-3.5">
              <p
                style={
                  !prefersReducedMotion
                    ? { transitionDelay: isNarrativeInView ? "140ms" : "0ms" }
                    : undefined
                }
                className={`text-[#574F44] font-normal leading-relaxed text-xs sm:text-sm ${
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

              <div className="text-[#574F44] font-normal leading-relaxed text-xs sm:text-sm pt-2.5 border-t border-[#E5D9C8]">
                <TypewriterText
                  text="Whether building an e-commerce platform from the ground up, engineering enterprise backend APIs, automating error-prone Excel workflows, or delivering high-level Power BI reporting models, our focus is uncompromising quality and long-term scalability."
                  isActive={isNarrativeInView}
                  triggerKey={narrativeTriggerCount}
                  startDelayMs={300}
                  durationMs={1350}
                  cursorColorClass="bg-[#B58A45]"
                  withUpwardMotion={true}
                />
              </div>
            </div>

            {/* Commitments Grid */}
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
                  className={`group p-3.5 rounded-xl bg-white border border-[#E5D9C8] hover:border-[#B58A45]/60 shadow-[0_2px_12px_rgba(41,39,32,0.04)] hover:shadow-[0_8px_24px_rgba(181,138,69,0.12)] flex items-start gap-2.5 transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B58A45]/80 ${
                    isCommitmentsInView
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                  }`}
                >
                  <CheckCircle2 className={`w-4 h-4 ${item.iconColor} shrink-0 mt-0.5 transition-transform duration-300 group-hover:scale-105`} />
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-[#292720] group-hover:text-[#B58A45] transition-colors duration-200">
                      {item.title}
                    </h4>
                    <p className="text-[11px] sm:text-xs text-[#756C60] font-normal mt-0.5 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Founder Card with Video Project 7 Background */}
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
              className="relative p-5 sm:p-6 rounded-2xl bg-white border border-[#E5D9C8] overflow-hidden group hover:border-[#B58A45]/70 shadow-[0_8px_32px_rgba(41,39,32,0.08)] hover:shadow-[0_16px_40px_rgba(181,138,69,0.18)] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B58A45]/80"
            >
              {/* Background Video: Video Project 7 (covers ~90% of the card background viewing area with 90-95% source clarity) */}
              <div className="absolute inset-[3.5%] rounded-xl overflow-hidden pointer-events-none z-0">
                <video
                  ref={founderVideoRef}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  className="w-full h-full object-cover object-center"
                  src="/videos/Video Project 7.mp4"
                />
                {/* Subtle balanced gradient overlay to preserve 90-95% perceived video clarity without muddying or heavy blur */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#FAF7F0]/35 via-transparent to-[#FAF7F0]/50" />
              </div>

              {/* Founder Card Foreground Content with refined legibility container */}
              <div className="relative z-10 bg-white/85 backdrop-blur-[1px] p-5 sm:p-6 rounded-xl border border-[#E5D9C8]/90 shadow-xs">
                {/* Heading & Badge */}
                <div className="flex items-center justify-between mb-5 border-b border-[#E5D9C8] pb-3">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-[#B58A45]" />
                    <span className="font-mono text-xs uppercase tracking-wider text-[#292720] font-bold">
                      FOUNDER IDENTITY
                    </span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#B58A45]/15 text-[#9E7432] border border-[#B58A45]/30 font-bold">
                    VERIFIED
                  </span>
                </div>

                {/* Founder Details */}
                <div className="space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#C99E56] via-[#B58A45] to-[#9E7432] p-[2px] shadow-[0_4px_16px_rgba(181,138,69,0.3)]">
                    <div className="w-full h-full bg-[#FAF7F0] rounded-[14px] flex items-center justify-center">
                      <span className="font-heading font-black text-2xl text-transparent bg-gradient-to-r from-[#B58A45] via-[#C99E56] to-[#9E7432] bg-clip-text">
                        AH
                      </span>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-2xl font-bold font-heading text-[#292720]">
                      {siteConfig.founder.name}
                    </h4>
                    <p className="text-sm font-bold text-[#B58A45] mt-0.5">
                      {siteConfig.founder.role}
                    </p>
                  </div>

                  <div className="space-y-2 text-xs text-[#574F44] font-medium font-mono pt-2">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#B58A45]" />
                      <span>Location: {siteConfig.founder.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#B58A45]" />
                      <span>Response Benchmark: {siteConfig.metrics.responseTime}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Cpu className="w-4 h-4 text-[#B58A45]" />
                      <span>Domain: Full-Stack Web, Mobile, Data Automation</span>
                    </div>
                  </div>

                  <p className="text-xs text-[#574F44] font-normal leading-relaxed pt-2 border-t border-[#E5D9C8]">
                    {siteConfig.founder.bio}
                  </p>

                  {/* Machine Learning & AI Portfolio Showcase */}
                  <div className="pt-2 space-y-2">
                    <div className="flex items-center justify-between pb-0.5">
                      <span className="text-[10.5px] font-mono uppercase tracking-wider text-[#292720] font-bold flex items-center gap-1.5">
                        <Cpu className="w-3.5 h-3.5 text-[#B58A45]" />
                        <span>PORTFOLIO SHOWCASE</span>
                      </span>
                      <span className="text-[10px] font-mono text-[#9E7432] bg-[#B58A45]/15 px-1.5 py-0.5 rounded border border-[#B58A45]/30 font-bold">
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
                      className="relative rounded-xl overflow-hidden border border-[#E5D9C8] hover:border-[#B58A45]/70 bg-[#FAF7F0] group/img cursor-pointer transition-all duration-300 hover:shadow-[0_8px_24px_rgba(181,138,69,0.2)] flex flex-col justify-end focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B58A45]/80"
                    >
                      <img
                        src="/projects/ml-portfolio-preview-v2.webp"
                        alt="Amit Halder — Machine Learning & AI Portfolio Showcase"
                        loading="lazy"
                        className="w-full h-36 sm:h-40 object-cover object-top opacity-95 group-hover/img:opacity-100 group-hover/img:scale-[1.02] transition-all duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#292720]/80 via-[#292720]/30 to-transparent pointer-events-none" />

                      {/* Top badge */}
                      <div className="absolute top-2.5 left-3 pointer-events-none">
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#FAF7F0]/90 text-[#9E7432] border border-[#B58A45]/40 backdrop-blur-md flex items-center gap-1 font-bold shadow-xs">
                          <Sparkles className="w-3 h-3 text-[#B58A45]" />
                          <span>AI / ML Portfolio</span>
                        </span>
                      </div>

                      <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between gap-2">
                        <span className="text-[11px] sm:text-xs font-mono text-white drop-shadow-sm truncate font-bold">
                          Machine Learning Engineer Portfolio
                        </span>
                        <span className="px-2.5 py-1 rounded text-[10.5px] font-mono bg-[#B58A45] text-white font-bold border border-[#9E7432] hover:brightness-110 transition-colors shrink-0 flex items-center gap-1 shadow-sm">
                          <span>Details</span>
                          <ExternalLink className="w-3 h-3 text-white" />
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center gap-2 text-xs text-[#574F44] font-normal">
                    <ShieldCheck className="w-4 h-4 text-[#B58A45]" />
                    <span>Committed to transparent deliverables &amp; high engineering standards.</span>
                  </div>
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
