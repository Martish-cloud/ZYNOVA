import React, { useRef, useState, useEffect, useCallback } from "react";
import { SectionHeading } from "../components/ui/SectionHeading";
import { TypewriterText } from "../components/ui/TypewriterText";
import { useCursor } from "../context/useCursor";
import { useInViewAnimation } from "../hooks/useInViewAnimation";
import { ParallaxLayer } from "../components/motion/ParallaxLayer";
import { StaggerGrid } from "../components/motion/StaggerGrid";
import { CheckCircle2, Sparkles } from "lucide-react";
import { FounderScrollCanvas } from "../components/ui/FounderScrollCanvas";

export const About: React.FC = () => {
  const { setCursor, resetCursor } = useCursor();
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [founderProgress, setFounderProgress] = useState(0);

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

  // Track scroll progress across Practical Digital Engineering section to scrub Founder AAA frames
  const handleScroll = useCallback(() => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const windowH = window.innerHeight;
    const totalH = sectionRef.current.offsetHeight;

    // Progress advances smoothly as section passes through viewport
    const startY = windowH * 0.75;
    const currentY = startY - rect.top;
    const scrollTravel = totalH + windowH * 0.25;

    const progress = Math.max(0, Math.min(1, currentY / Math.max(1, scrollTravel)));
    setFounderProgress(progress);
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

  const commitments = [
    {
      title: "Full IP Transfer",
      description: "100% client ownership of repositories, code, design assets, and environments.",
      iconColor: "text-[#D0A04B]"
    },
    {
      title: "Clean Engineering",
      description: "Modern typed stacks, clean modular architecture, and zero unnecessary bloat.",
      iconColor: "text-[#9BD7FF]"
    },
    {
      title: "Agile Turnaround",
      description: "Guaranteed responses within 12 hours with transparent development milestones.",
      iconColor: "text-[#D0A04B]"
    },
    {
      title: "Actionable Analytics",
      description: "Deep mastery of Excel automation and Power BI to transform messy data into clarity.",
      iconColor: "text-[#9BD7FF]"
    }
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-12 sm:py-16 md:py-20 relative z-10 bg-transparent"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="ENGINEERING EXCELLENCE"
          title="Practical Digital Engineering for"
          highlightedTitle="Ambitious Entrepreneurs & Enterprises."
          subtitle="At ZYNOVA, software must be resilient, beautiful, and directly tied to business results. We combine modern full-stack development, mobile engineering, AI workflows, and precision data analytics to solve tangible challenges."
          subtitleVariant="ltr"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start pt-2">
          {/* Left Column: Mission & Capabilities */}
          <div ref={narrativeRef} className="lg:col-span-7 space-y-4 sm:space-y-5">
            {/* Step 1: Main Subheading */}
            <h3
              className={`text-xl sm:text-2xl md:text-[24px] font-bold font-heading text-white leading-snug border-l-3 border-[#D0A04B] pl-3.5 sm:pl-4 ${
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
              <span className="bg-gradient-to-r from-[#D0A04B] via-[#E2B768] to-[#A9792E] bg-clip-text text-transparent">
                high engineering standards.
              </span>
            </h3>

            {/* Supporting Narrative Panel */}
            <div className="p-5 rounded-2xl bg-[#171410] border border-[#D0A04B]/25 shadow-[0_8px_32px_rgba(0,0,0,0.4)] space-y-3.5">
              <p
                style={
                  !prefersReducedMotion
                    ? { transitionDelay: isNarrativeInView ? "140ms" : "0ms" }
                    : undefined
                }
                className={`text-[#D4CEC4] font-normal leading-relaxed text-xs sm:text-sm ${
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

              <div className="text-[#D4CEC4] font-normal leading-relaxed text-xs sm:text-sm pt-2.5 border-t border-white/10">
                <TypewriterText
                  text="Whether building an e-commerce platform from the ground up, engineering enterprise backend APIs, automating error-prone Excel workflows, or delivering high-level Power BI reporting models, our focus is uncompromising quality and long-term scalability."
                  isActive={isNarrativeInView}
                  triggerKey={narrativeTriggerCount}
                  startDelayMs={300}
                  durationMs={1350}
                  cursorColorClass="bg-[#D0A04B]"
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
                    className="group p-3.5 rounded-xl bg-[#171410] border border-[#D0A04B]/25 hover:border-[#D0A04B]/60 shadow-[0_4px_16px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_24px_rgba(208,160,75,0.14)] flex items-start gap-2.5 transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D0A04B]/80 h-full"
                  >
                    <CheckCircle2 className={`w-4 h-4 ${item.iconColor} shrink-0 mt-0.5 transition-transform duration-300 group-hover:scale-105`} />
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-[#D0A04B] transition-colors duration-200">
                        {item.title}
                      </h4>
                      <p className="text-[11px] sm:text-xs text-[#D4CEC4] font-normal mt-0.5 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </StaggerGrid>
            </div>
          </div>

          {/* Right Column: Headphones Scroll-Controlled 240-Frame Animation */}
          <div
            ref={founderRef}
            className={`lg:col-span-5 flex items-center justify-center sticky top-24 lg:top-28 self-start ${
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
              {/* Floating Accent Tag - Founder Identity */}
              <div className="absolute -top-3 -right-2 z-20 pointer-events-none">
                <ParallaxLayer speed={0.16} rotate={-3}>
                  <div className="px-3.5 py-1 rounded-full bg-gradient-to-r from-[#D0A04B] via-[#E2B768] to-[#D0A04B] text-[#080706] text-[10px] font-mono font-bold tracking-wider uppercase shadow-[0_4px_16px_rgba(208,160,75,0.4)] flex items-center gap-1.5 border border-white/20">
                    <Sparkles className="w-3 h-3 text-[#080706]" />
                    <span>FOUNDER IDENTITY</span>
                  </div>
                </ParallaxLayer>
              </div>

              <div
                tabIndex={0}
                role="region"
                aria-label="ZYNOVA Founder Identity - Executive Visual"
                onMouseEnter={() => setCursor("project", "ROTATE")}
                onMouseLeave={resetCursor}
                className="w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D0A04B]/80 rounded-2xl sm:rounded-3xl overflow-hidden bg-[#171410] border-2 border-[#D0A04B]/30 hover:border-[#D0A04B]/70 shadow-[0_16px_40px_rgba(0,0,0,0.6),0_4px_16px_rgba(208,160,75,0.12)] transition-all duration-500 aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3]"
              >
                <FounderScrollCanvas
                  progress={founderProgress}
                  className="w-full h-full"
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

