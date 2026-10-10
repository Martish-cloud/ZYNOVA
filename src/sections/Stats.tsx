import React from "react";
import { useCountUp } from "../hooks/useCountUp";
import { useInViewAnimation } from "../hooks/useInViewAnimation";
import { Clock, Briefcase, Layers, ShieldCheck } from "lucide-react";

export const Stats: React.FC = () => {
  const { ref: containerRef, isInView } = useInViewAnimation<HTMLDivElement>({
    threshold: 0.15,
    rootMargin: "0px 0px -20px 0px",
    retrigger: true
  });

  const countHours = useCountUp(12, 1200, isInView);
  const countIndustries = useCountUp(8, 1400, isInView);
  const countProjects = useCountUp(35, 1600, isInView);
  const countOwnership = useCountUp(100, 1800, isInView);

  const stats = [
    {
      icon: Clock,
      value: `${countHours} Hours`,
      label: "Rapid Response Guarantee",
      subtext: "Agile, clear communication across time zones",
      color: "text-amber-600",
      borderGlow: "group-hover:border-amber-500/50"
    },
    {
      icon: Briefcase,
      value: `${countIndustries}+`,
      label: "Industries Served",
      subtext: "E-commerce, Healthcare, SaaS, EdTech, Real Estate",
      color: "text-amber-600",
      borderGlow: "group-hover:border-yellow-500/50"
    },
    {
      icon: Layers,
      value: `${countProjects}+`,
      label: "Solutions Engineered",
      subtext: "Web platforms, backend microservices, BI dashboards",
      color: "text-amber-600",
      borderGlow: "group-hover:border-amber-500/50"
    },
    {
      icon: ShieldCheck,
      value: `${countOwnership}%`,
      label: "Client Ownership",
      subtext: "Complete source code, assets, and repository rights",
      color: "text-amber-600",
      borderGlow: "group-hover:border-yellow-400/50"
    }
  ];

  return (
    <section
      id="stats"
      ref={containerRef}
      className="relative z-10 py-10 sm:py-12 bg-white/60 border-y border-slate-200/80 backdrop-blur-md"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-4.5">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="relative p-[1.5px] rounded-2xl overflow-hidden bg-slate-200/80 transition-all duration-300 shadow-[0_8px_28px_rgba(15,23,42,0.05)] hover:shadow-[0_14px_34px_-8px_rgba(245,158,11,0.2)] group hover:-translate-y-1"
              >
                {/* Continuous Animated Shimmer Stroke along Outer Border */}
                <div
                  className="absolute -inset-[150%] animate-border-beam-spin pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background:
                      "conic-gradient(from 0deg at 50% 50%, transparent 0deg, transparent 280deg, rgba(245, 158, 11, 0.25) 310deg, rgba(245, 158, 11, 0.9) 345deg, rgba(217, 119, 6, 1) 355deg, rgba(245, 158, 11, 0.9) 358deg, transparent 360deg)",
                    animationDelay: `${-idx * 2.25}s`
                  }}
                />

                {/* Card Interior */}
                <div className="relative z-10 p-4.5 sm:p-5 rounded-[calc(1rem-1.5px)] bg-gradient-to-b from-white/95 to-slate-50/95 backdrop-blur-xl h-full flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2 rounded-xl bg-amber-50/90 border border-amber-200/80 group-hover:scale-110 transition-transform">
                      <Icon className={`w-4.5 h-4.5 ${stat.color}`} />
                    </div>
                    <span className="font-mono text-[9px] uppercase text-slate-400 font-semibold tracking-widest">
                      METRIC // 0{idx + 1}
                    </span>
                  </div>

                  <div className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 tracking-tight mb-1">
                    {stat.value}
                  </div>

                  <div className="text-xs sm:text-sm font-semibold text-slate-800 mb-0.5">
                    {stat.label}
                  </div>

                  <p className="text-[11px] sm:text-xs text-slate-500 leading-snug">
                    {stat.subtext}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
