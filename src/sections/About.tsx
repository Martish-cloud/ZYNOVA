import React from "react";
import { SectionHeading } from "../components/ui/SectionHeading";
import { TypewriterText } from "../components/ui/TypewriterText";
import { useCursor } from "../context/useCursor";
import { useInViewAnimation } from "../hooks/useInViewAnimation";
import { ParallaxLayer } from "../components/motion/ParallaxLayer";
import { StaggerGrid } from "../components/motion/StaggerGrid";
import { CheckCircle2, Sparkles } from "lucide-react";
import { HeroFramePlayer } from "./HeroFramePlayer";

export const About: React.FC = () => {
  const { setCursor, resetCursor } = useCursor();

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
    ref: commitmentsRef
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
    <section id="about" className="py-14 sm:py-18 md:py-20 relative z-10 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="ENGINEERING EXCELLENCE"
          title="Practical Digital Engineering for"
          highlightedTitle="Ambitious Enterprises."
          subtitle="At ZYNOVA, software must be resilient, beautiful, and directly tied to business results. We combine modern full-stack development, mobile engineering, AI workflows, and precision data analytics to solve tangible challenges."
          subtitleVariant="ltr"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center pt-2">
          {/* Left Column: Mission & Capabilities */}
          <div ref={narrativeRef} className="lg:col-span-7 space-y-4 sm:space-y-5">
            {/* Step 1: Main Subheading */}
            <h3
              className={`text-xl sm:text-2xl md:text-[24px] font-bold font-heading text-[#292720] leading-snug border-l-3 border-[#B58A45] pl-3.5 sm:pl-4 ${
                !prefersReducedMotion
                  ? `transition-all duration-[680ms] ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[transform,opacity] ${
                      isNarrativeInView
                        ? "opacity-100 translate-y-0 scale-100"
                        : "opacity-0 translate-y-4 scale-[0.98]"
                    }`
                  : ""
              }`}
            >
              Committed to transparent deliverables &amp;{" "}
              <span className="bg-gradient-to-r from-[#B58A45] via-[#C99E56] to-[#9E7432] bg-clip-text text-transparent">
                high engineering standards.
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
            <div ref={commitmentsRef}>
              <StaggerGrid stagger={0.08} className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {commitments.map((item) => (
                  <div
                    key={item.title}
                    tabIndex={0}
                    role="region"
                    aria-label={item.title}
                    className="group p-3.5 rounded-xl bg-white border border-[#E5D9C8] hover:border-[#B58A45]/60 shadow-[0_2px_12px_rgba(41,39,32,0.04)] hover:shadow-[0_8px_24px_rgba(181,138,69,0.12)] flex items-start gap-2.5 transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B58A45]/80 h-full"
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
              </StaggerGrid>
            </div>
          </div>

          {/* Right Column: Priority 4 & 6 — Founder Visual Card with Reused Hero Animation & ZYNOVA Watermark */}
          <div
            ref={founderRef}
            style={
              !prefersReducedMotion
                ? { transitionDelay: isFounderInView ? "180ms" : "0ms" }
                : undefined
            }
            className={`lg:col-span-5 flex items-center justify-center ${
              !prefersReducedMotion
                ? `transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[transform,opacity] ${
                    isFounderInView
                      ? "opacity-100 translate-y-0 scale-100"
                      : "opacity-0 translate-y-6 scale-[0.97]"
                  }`
                : ""
            }`}
          >
            <div className="relative w-full">
              {/* Floating Accent Tag */}
              <div className="absolute -top-3 -right-2 z-20 pointer-events-none">
                <ParallaxLayer speed={0.16} rotate={-3}>
                  <div className="px-3 py-1 rounded-full bg-[#B58A45] text-white text-[10px] font-mono font-bold tracking-wider uppercase shadow-[0_4px_16px_rgba(181,138,69,0.4)] flex items-center gap-1.5 border border-white/20">
                    <Sparkles className="w-3 h-3 text-white" />
                    <span>FOUNDER DIRECT</span>
                  </div>
                </ParallaxLayer>
              </div>

              <div
                tabIndex={0}
                role="region"
                aria-label="ZYNOVA Engineering Visual Showcase"
                onMouseEnter={() => setCursor("project", "ZYNOVA")}
                onMouseLeave={resetCursor}
                className="w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B58A45]/80 rounded-2xl sm:rounded-3xl"
              >
                <HeroFramePlayer
                  containerClassName="relative w-full group"
                  cardClassName="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-[#292720] border-2 border-[#E5D9C8] hover:border-[#B58A45]/70 shadow-[0_16px_40px_rgba(41,39,32,0.12),0_4px_16px_rgba(181,138,69,0.12)] transition-all duration-500"
                  aspectRatioClass="aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3]"
                  showStatusPill={false}
                  watermark={true}
                  watermarkText="ZYNOVA"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
