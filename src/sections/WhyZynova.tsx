import React from "react";
import { SectionHeading } from "../components/ui/SectionHeading";
import { useCursor } from "../context/useCursor";
import { Clock, Cpu, Target, ShieldCheck, Sparkles } from "lucide-react";

export const WhyZynova: React.FC = () => {
  const { setCursor, resetCursor } = useCursor();

  const reasons = [
    {
      number: "01",
      icon: Clock,
      title: "Fast Communication",
      highlight: "12h Response Guarantee",
      description: "Typical response time within 12 hours. Clear, proactive communication across project milestones with zero ambiguity.",
      accent: "from-amber-500/20 to-yellow-500/20",
      iconColor: "text-amber-600"
    },
    {
      number: "02",
      icon: Cpu,
      title: "Modern Technology",
      highlight: "Typed & Cloud-Native",
      description: "Solutions built using modern development, AI pipelines, and automation technologies designed for optimal velocity and durability.",
      accent: "from-yellow-500/20 to-amber-500/20",
      iconColor: "text-amber-600"
    },
    {
      number: "03",
      icon: Target,
      title: "Business-Focused",
      highlight: "Tied to Real Outcomes",
      description: "Technology is designed around practical business requirements — ensuring your software drives real conversions, operational speed, and savings.",
      accent: "from-amber-500/20 to-yellow-500/20",
      iconColor: "text-amber-600"
    },
    {
      number: "04",
      icon: ShieldCheck,
      title: "Client Ownership",
      highlight: "100% Code & Asset Rights",
      description: "100% client ownership. Every line of code, design asset, and cloud configuration belongs entirely to you upon completion.",
      accent: "from-yellow-500/20 to-amber-500/20",
      iconColor: "text-amber-600"
    }
  ];

  return (
    <section id="why-zynova" className="py-14 sm:py-18 md:py-20 relative z-10 bg-transparent border-t border-slate-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="WHY WORK WITH ZYNOVA"
          title="Engineered for Reliability and"
          highlightedTitle="Predictable Success."
          subtitle="We eliminate the uncertainty of software development through transparent milestones, fast communication, and modern engineering standards."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-4.5 lg:gap-5">
          {reasons.map((r, index) => {
            const Icon = r.icon;
            const floatClass = ["animate-subtle-float-1", "animate-subtle-float-2", "animate-subtle-float-3", "animate-subtle-float-4"][index % 4];
            return (
              <div key={r.number} className={`h-full ${floatClass}`}>
                <div
                  onMouseEnter={() => setCursor("project", r.title)}
                  onMouseLeave={resetCursor}
                  className="h-full group relative p-5 sm:p-5.5 rounded-xl bg-gradient-to-b from-white/90 to-slate-50/85 border border-slate-200/80 hover:border-amber-400/60 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 shadow-[0_10px_30px_rgba(15,23,42,0.05),inset_0_1px_0_rgba(255,255,255,0.9)] hover:shadow-[0_20px_40px_-15px_rgba(245,158,11,0.18)] flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3.5 sm:mb-4">
                      <span className="font-mono text-xs font-bold text-slate-400 group-hover:text-amber-600 transition-colors">
                        // {r.number}
                      </span>
                      <div className="p-2.5 rounded-lg bg-amber-50/80 border border-amber-200/80 group-hover:scale-110 group-hover:border-amber-400/50 transition-transform">
                        <Icon className={`w-4 h-4 sm:w-4.5 sm:h-4.5 ${r.iconColor}`} />
                      </div>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold font-heading text-slate-900 mb-1.5 group-hover:text-amber-700 transition-colors">
                      {r.title}
                    </h3>

                    <div className="inline-block text-[10.5px] font-mono px-2 py-0.5 rounded bg-amber-50/90 text-amber-800 mb-3 border border-amber-300/60 font-semibold">
                      {r.highlight}
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {r.description}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-200/80 flex items-center gap-2 text-[10.5px] font-mono text-slate-500">
                    <Sparkles className="w-3 h-3 text-amber-500" />
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
