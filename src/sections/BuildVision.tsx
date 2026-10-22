import React from "react";
import { MagneticButton } from "../components/ui/MagneticButton";
import { useSmoothScroll } from "../components/motion/SmoothScroll";
import { ArrowRight, Sparkles, Code2, Cpu, BarChart3, Workflow, ShieldCheck } from "lucide-react";

export const BuildVision: React.FC = () => {
  const { scrollTo } = useSmoothScroll();

  const handleScrollTo = (id: string) => {
    scrollTo(`#${id}`);
  };

  return (
    <section
      id="vision"
      className="relative w-full bg-[#100D09] text-white py-20 sm:py-24 md:py-28 overflow-hidden border-t border-[#D0A04B]/20"
      aria-label="Build Around Your Vision"
    >
      {/* Deep Ambient Background Lighting matching Dark Theme */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/4 left-1/3 -translate-x-1/2 w-[700px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(208,160,75,0.06)_0%,transparent_70%)]" />
        <div className="absolute bottom-10 right-10 w-[500px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(155,215,255,0.03)_0%,transparent_70%)]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Heading, Narrative & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
            {/* Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#D0A04B]/15 border border-[#D0A04B]/35 text-[#D0A04B] text-[10px] sm:text-xs font-semibold tracking-wider uppercase shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D0A04B] animate-pulse" />
              <span>WHO WE ARE</span>
            </div>

            {/* Section Heading */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-black font-heading tracking-tight leading-[1.08] text-white">
              Technology Built Around{" "}
              <span className="bg-gradient-to-r from-[#D0A04B] via-[#E2B768] to-[#A9792E] bg-clip-text text-transparent">
                Your Vision.
              </span>
            </h2>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-[#D4CEC4] max-w-2xl font-normal leading-relaxed">
              ZYNOVA is a digital technology brand focused on building modern software, websites, applications, automation systems, and data-driven business solutions.
            </p>

            {/* Key Capabilities Pills Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 w-full max-w-xl">
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[#171410] border border-[#D0A04B]/20 text-xs sm:text-[13px] text-[#D4CEC4]">
                <Code2 className="w-4 h-4 text-[#D0A04B] shrink-0" />
                <span>Modern full-stack web &amp; mobile</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[#171410] border border-[#D0A04B]/20 text-xs sm:text-[13px] text-[#D4CEC4]">
                <Cpu className="w-4 h-4 text-[#9BD7FF] shrink-0" />
                <span>Scalable cloud backend APIs</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[#171410] border border-[#D0A04B]/20 text-xs sm:text-[13px] text-[#D4CEC4]">
                <BarChart3 className="w-4 h-4 text-[#D0A04B] shrink-0" />
                <span>Actionable Power BI dashboards</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[#171410] border border-[#D0A04B]/20 text-xs sm:text-[13px] text-[#D4CEC4]">
                <Workflow className="w-4 h-4 text-[#9BD7FF] shrink-0" />
                <span>Automated workflow pipelines</span>
              </div>
            </div>

            {/* Preserved CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-4">
              <div className="relative group">
                <div className="absolute -inset-1 rounded-full bg-[#D0A04B]/30 blur-md group-hover:bg-[#D0A04B]/50 transition-all duration-300 pointer-events-none" />
                <MagneticButton
                  asAnchor
                  href="#services"
                  onClick={(e) => {
                    e.preventDefault();
                    handleScrollTo("services");
                  }}
                  variant="gold"
                  className="relative !px-5 sm:!px-6 !py-2.5 sm:!py-3 text-xs sm:text-sm font-bold shadow-[0_0_24px_rgba(208,160,75,0.35)]"
                  cursorLabel="SERVICES"
                >
                  <span>Explore Services</span>
                  <ArrowRight className="w-4 h-4 text-[#080706]" />
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
                <Sparkles className="w-4 h-4 text-[#D0A04B]" />
                <span>Discuss Your Project</span>
              </MagneticButton>
            </div>
          </div>

          {/* Right Column: Architectural Pillar Cards */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="p-6 rounded-2xl bg-[#171410] border border-[#D0A04B]/25 shadow-lg relative overflow-hidden group hover:border-[#D0A04B]/50 transition-all duration-300">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#D0A04B]/5 rounded-full blur-2xl pointer-events-none" />
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2.5 rounded-xl bg-[#201B14] border border-[#D0A04B]/30 text-[#D0A04B]">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-base text-white">Production-Grade Standards</h3>
                  <span className="text-[11px] font-mono text-[#D0A04B]">ENTERPRISE ARCHITECTURE</span>
                </div>
              </div>
              <p className="text-xs text-[#D4CEC4] leading-relaxed">
                Engineered with typed TypeScript architectures, zero-downtime CI/CD workflows, automated testing suites, and hardened cloud security.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#171410] border border-[#D0A04B]/25 shadow-lg relative overflow-hidden group hover:border-[#D0A04B]/50 transition-all duration-300">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#9BD7FF]/5 rounded-full blur-2xl pointer-events-none" />
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2.5 rounded-xl bg-[#201B14] border border-[#9BD7FF]/30 text-[#9BD7FF]">
                  <Workflow className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-base text-white">Commercial Agility</h3>
                  <span className="text-[11px] font-mono text-[#9BD7FF]">SPEED TO MARKET</span>
                </div>
              </div>
              <p className="text-xs text-[#D4CEC4] leading-relaxed">
                From initial whiteboard concept to production release in weeks, not quarters. Transparent timelines and milestone accountability.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BuildVision;
