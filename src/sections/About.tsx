import React, { useState, Suspense } from "react";
import { siteConfig } from "../config/siteConfig";
import { SectionHeading } from "../components/ui/SectionHeading";
import { useCursor } from "../context/useCursor";
import { useInViewAnimation } from "../hooks/useInViewAnimation";
import { ShieldCheck, MapPin, Terminal, Cpu, Clock, CheckCircle2, Sparkles, ExternalLink } from "lucide-react";

const PortfolioShowcaseModal = React.lazy(() =>
  import("../components/portfolio/PortfolioShowcaseModal").then((m) => ({ default: m.PortfolioShowcaseModal }))
);

export const About: React.FC = () => {
  const { setCursor, resetCursor } = useCursor();
  const [isPortfolioModalOpen, setIsPortfolioModalOpen] = useState(false);

  const { ref: commitmentsRef, isInView: isCommitmentsInView } = useInViewAnimation<HTMLDivElement>({
    threshold: 0.15,
    rootMargin: "0px 0px -20px 0px",
    retrigger: true
  });

  const commitments = [
    {
      title: "Full IP Transfer",
      description: "100% client ownership of repositories, code, design assets, and environments.",
      iconColor: "text-amber-600"
    },
    {
      title: "Clean Engineering",
      description: "Modern typed stacks, clean modular architecture, and zero unnecessary bloat.",
      iconColor: "text-amber-600"
    },
    {
      title: "Agile Turnaround",
      description: "Guaranteed responses within 12 hours with transparent development milestones.",
      iconColor: "text-amber-600"
    },
    {
      title: "Actionable Analytics",
      description: "Deep mastery of Excel automation and Power BI to transform messy data into clarity.",
      iconColor: "text-amber-600"
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
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Column: Mission & Capabilities */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-5">
            <h3 className="text-xl sm:text-2xl font-bold font-heading text-slate-900 leading-snug">
              Practical digital engineering for ambitious entrepreneurs &amp; enterprises.
            </h3>

            <p className="text-slate-600 leading-relaxed text-xs sm:text-sm">
              At ZYNOVA, we believe software must be resilient, beautiful, and directly tied to business results. We combine modern full-stack development, mobile engineering, AI workflows, and precision data analytics to solve tangible challenges.
            </p>

            <p className="text-slate-600 leading-relaxed text-xs sm:text-sm">
              Whether building an e-commerce platform from the ground up, engineering enterprise backend APIs, automating error-prone Excel workflows, or delivering high-level Power BI reporting models, our focus is uncompromising quality and long-term scalability.
            </p>

            {/* Core Values / Commitments with Popup/Floating & Entrance Animations */}
            <div ref={commitmentsRef} className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {commitments.map((item, idx) => (
                <div
                  key={item.title}
                  style={{
                    transitionDelay: `${idx * 120}ms`
                  }}
                  className={`p-3.5 rounded-xl bg-white/80 backdrop-blur-xl border border-slate-200/90 hover:border-amber-500/60 hover:bg-white flex items-start gap-2.5 transition-all duration-500 ease-out hover:-translate-y-2 hover:scale-[1.025] shadow-[0_8px_24px_rgba(15,23,42,0.05)] hover:shadow-[0_16px_32px_-8px_rgba(245,158,11,0.2)] active:scale-[0.98] active:-translate-y-0.5 cursor-pointer ${
                    isCommitmentsInView
                      ? "opacity-100 translate-y-0 scale-100"
                      : "opacity-0 translate-y-6 scale-95"
                  }`}
                >
                  <CheckCircle2 className={`w-4 h-4 ${item.iconColor} shrink-0 mt-0.5 transition-transform duration-300 group-hover:scale-110`} />
                  <div>
                    <h4 className="text-xs sm:text-sm font-semibold text-slate-900 transition-colors duration-200">
                      {item.title}
                    </h4>
                    <p className="text-[11px] sm:text-xs text-slate-600 mt-0.5 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Founder Card */}
          <div className="lg:col-span-5">
            <div
              onMouseEnter={() => setCursor("project", "FOUNDER")}
              onMouseLeave={resetCursor}
              className="relative p-6 sm:p-7 rounded-2xl bg-white/85 backdrop-blur-2xl border border-amber-400/50 shadow-[0_20px_50px_rgba(15,23,42,0.08)] overflow-hidden group hover:border-amber-500/70 transition-all duration-300"
            >
              {/* Corner decorative light */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center justify-between mb-6 border-b border-slate-200/90 pb-4">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-amber-600" />
                  <span className="font-mono text-xs uppercase tracking-wider text-slate-700 font-semibold">
                    FOUNDER IDENTITY
                  </span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-400/40 font-semibold">
                  VERIFIED
                </span>
              </div>

              {/* Founder Details */}
              <div className="space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-400 via-yellow-400 to-amber-600 p-[2px] shadow-[0_4px_20px_rgba(245,158,11,0.3)]">
                  <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center">
                    <span className="font-heading font-black text-2xl text-transparent bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-700 bg-clip-text">
                      AH
                    </span>
                  </div>
                </div>

                <div>
                  <h4 className="text-2xl font-bold font-heading text-slate-900">
                    {siteConfig.founder.name}
                  </h4>
                  <p className="text-sm font-semibold text-amber-700 mt-0.5">
                    {siteConfig.founder.role}
                  </p>
                </div>

                <div className="space-y-2 text-xs text-slate-700 font-mono pt-2">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-amber-600" />
                    <span>Location: {siteConfig.founder.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-amber-600" />
                    <span>Response Benchmark: {siteConfig.metrics.responseTime}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-amber-600" />
                    <span>Domain: Full-Stack Web, Mobile, Data Automation</span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed pt-2 border-t border-slate-200/80">
                  {siteConfig.founder.bio}
                </p>

                {/* Machine Learning & AI Portfolio Showcase */}
                <div className="pt-2 space-y-2">
                  <div className="flex items-center justify-between pb-0.5">
                    <span className="text-[10.5px] font-mono uppercase tracking-wider text-slate-600 font-semibold flex items-center gap-1.5">
                      <Cpu className="w-3.5 h-3.5 text-amber-600" />
                      <span>PORTFOLIO SHOWCASE</span>
                    </span>
                    <span className="text-[10px] font-mono text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-400/40 font-semibold">
                      Machine Learning &bull; AI
                    </span>
                  </div>

                  <div
                    onClick={() => {
                      resetCursor();
                      setIsPortfolioModalOpen(true);
                    }}
                    onMouseEnter={() => setCursor("project", "VIEW")}
                    onMouseLeave={resetCursor}
                    className="relative rounded-xl overflow-hidden border border-slate-200/90 hover:border-amber-500/60 bg-slate-100 group/img cursor-pointer transition-all duration-300 hover:shadow-[0_12px_28px_-10px_rgba(245,158,11,0.25)] flex flex-col justify-end"
                  >
                    <img
                      src="/projects/ml-portfolio-preview-v2.webp"
                      alt="Amit Halder — Machine Learning & AI Portfolio Showcase"
                      loading="lazy"
                      className="w-full h-36 sm:h-40 object-cover object-top opacity-95 group-hover/img:opacity-100 group-hover/img:scale-[1.02] transition-all duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/65 via-slate-900/20 to-transparent pointer-events-none" />

                    {/* Top badge */}
                    <div className="absolute top-2.5 left-3 pointer-events-none">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/95 text-amber-800 border border-amber-400/50 backdrop-blur-sm flex items-center gap-1 font-semibold shadow-sm">
                        <Sparkles className="w-3 h-3 text-amber-600" />
                        <span>AI / ML Portfolio</span>
                      </span>
                    </div>

                    <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between gap-2">
                      <span className="text-[11px] sm:text-xs font-mono text-white drop-shadow-sm truncate font-semibold">
                        Machine Learning Engineer Portfolio
                      </span>
                      <span className="px-2.5 py-1 rounded text-[10.5px] font-mono bg-amber-400 text-slate-950 font-bold border border-amber-300 hover:brightness-110 transition-colors shrink-0 flex items-center gap-1 shadow-sm">
                        <span>Details</span>
                        <ExternalLink className="w-3 h-3 text-slate-950" />
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex items-center gap-2 text-xs text-slate-600">
                  <ShieldCheck className="w-4 h-4 text-amber-600" />
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
