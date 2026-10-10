import React from "react";
import { useCountUp } from "../hooks/useCountUp";
import { useInViewAnimation } from "../hooks/useInViewAnimation";
import { Clock, Briefcase, Layers, ShieldCheck } from "lucide-react";

export const Stats: React.FC = () => {
  const { ref: containerRef, isInView, prefersReducedMotion } = useInViewAnimation<HTMLDivElement>({
    threshold: 0.16,
    rootMargin: "0px 0px -6% 0px",
    retrigger: true
  });

  const countHours = useCountUp(12, 1100, isInView);
  const countIndustries = useCountUp(8, 1250, isInView);
  const countProjects = useCountUp(35, 1400, isInView);
  const countOwnership = useCountUp(100, 1550, isInView);

  const stats = [
    {
      icon: Clock,
      value: `${countHours} Hours`,
      label: "Rapid Response Guarantee",
      subtext: "Agile, clear communication across time zones",
      color: "text-amber-400",
      borderGlow: "group-hover:border-amber-400/50"
    },
    {
      icon: Briefcase,
      value: `${countIndustries}+`,
      label: "Industries Served",
      subtext: "E-commerce, Healthcare, SaaS, EdTech, Real Estate",
      color: "text-amber-400",
      borderGlow: "group-hover:border-yellow-400/50"
    },
    {
      icon: Layers,
      value: `${countProjects}+`,
      label: "Solutions Engineered",
      subtext: "Web platforms, backend microservices, BI dashboards",
      color: "text-amber-400",
      borderGlow: "group-hover:border-amber-400/50"
    },
    {
      icon: ShieldCheck,
      value: `${countOwnership}%`,
      label: "Client Ownership",
      subtext: "Complete source code, assets, and repository rights",
      color: "text-amber-400",
      borderGlow: "group-hover:border-yellow-300/50"
    }
  ];

  return (
    <section
      id="stats"
      ref={containerRef}
      className="relative z-10 py-10 sm:py-12 bg-transparent border-y border-white/15"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-4.5">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                style={
                  !prefersReducedMotion
                    ? { transitionDelay: isInView ? `${idx * 75}ms` : "0ms" }
                    : undefined
                }
                className={`relative p-[1.5px] rounded-2xl overflow-hidden bg-white/20 transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-[0_10px_32px_rgba(0,0,0,0.25)] hover:shadow-[0_16px_38px_-8px_rgba(245,158,11,0.35)] group hover:-translate-y-1 ${
                  isInView
                    ? "opacity-100 translate-y-0 scale-100"
                    : "opacity-0 translate-y-4 scale-[0.97]"
                }`}
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
                <div className="relative z-10 p-4.5 sm:p-5 rounded-[calc(1rem-1.5px)] bg-gradient-to-br from-white/[0.18] via-white/[0.14] to-white/[0.10] backdrop-blur-xl saturate-150 border border-white/25 shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_8px_32px_rgba(0,0,0,0.2)] h-full flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2 rounded-xl bg-amber-400/[0.18] border border-amber-400/40 shadow-[inset_0_1px_0_rgba(255,255,255,0.45)] group-hover:scale-110 transition-transform">
                      <Icon className={`w-4.5 h-4.5 ${stat.color}`} />
                    </div>
                    <span className="font-mono text-[9px] uppercase text-slate-300 font-bold tracking-widest">
                      METRIC // 0{idx + 1}
                    </span>
                  </div>

                  <div className="text-2xl sm:text-3xl font-extrabold font-heading text-white tracking-tight mb-1">
                    {stat.value}
                  </div>

                  <div className="text-xs sm:text-sm font-bold text-white mb-0.5">
                    {stat.label}
                  </div>

                  <p className="text-[11px] sm:text-xs text-slate-200 font-normal leading-snug">
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
