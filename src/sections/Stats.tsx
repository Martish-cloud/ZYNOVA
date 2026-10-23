import React from "react";
import { useCountUp } from "../hooks/useCountUp";
import { useInViewAnimation } from "../hooks/useInViewAnimation";
import { CardBorderLight } from "../components/ui/CardBorderLight";
import { StaggerGrid } from "../components/motion/StaggerGrid";
import { Clock, Briefcase, Layers, ShieldCheck } from "lucide-react";

export const Stats: React.FC = () => {
  const { ref: containerRef, isInView, triggerCount } = useInViewAnimation<HTMLDivElement>({
    threshold: 0.16,
    rootMargin: "0px 0px -6% 0px"
  });

  const countHours = useCountUp(6, 1100, isInView);
  const countIndustries = useCountUp(8, 1250, isInView);
  const countProjects = useCountUp(35, 1400, isInView);
  const countOwnership = useCountUp(100, 1550, isInView);

  const stats = [
    {
      icon: Clock,
      value: `${countHours} Hours`,
      label: "Rapid Response Guarantee",
      subtext: "Agile, clear communication across time zones",
      color: "text-[#D0A04B]"
    },
    {
      icon: Briefcase,
      value: `${countIndustries}+`,
      label: "Industries Served",
      subtext: "E-commerce, Healthcare, SaaS, EdTech, Real Estate",
      color: "text-[#9BD7FF]"
    },
    {
      icon: Layers,
      value: `${countProjects}+`,
      label: "Solutions Engineered",
      subtext: "Web platforms, backend microservices, BI dashboards",
      color: "text-[#D0A04B]"
    },
    {
      icon: ShieldCheck,
      value: `${countOwnership}%`,
      label: "Client Ownership",
      subtext: "Complete source code, assets, and repository rights",
      color: "text-[#9BD7FF]"
    }
  ];

  return (
    <section
      id="stats"
      ref={containerRef}
      className="relative z-10 py-6 sm:py-8 md:py-10 bg-transparent"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <StaggerGrid stagger={0.06} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-3.5 lg:gap-4 items-stretch w-full">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="relative rounded-2xl overflow-hidden transition-all duration-300 shadow-[0_8px_24px_rgba(0,0,0,0.4)] hover:shadow-[0_12px_32px_rgba(208,160,75,0.18)] group hover:-translate-y-1 h-full"
              >
                {/* Synchronized Perimeter Border Light */}
                <CardBorderLight retriggerKey={triggerCount} />

                {/* Card Interior - Single Horizontal Baseline */}
                <div className="relative z-10 p-4 sm:p-4.5 lg:p-4 xl:p-5 rounded-2xl bg-[#171410] border border-[#D0A04B]/25 hover:border-[#D0A04B]/50 transition-colors h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2.5">
                      <div className="p-1.5 sm:p-2 rounded-xl bg-[#201B14] border border-[#D0A04B]/30 group-hover:scale-105 transition-transform">
                        <Icon className={`w-4 h-4 sm:w-4.5 sm:h-4.5 ${stat.color}`} />
                      </div>
                      <span className="font-mono text-[9px] uppercase text-[#A89F91] font-bold tracking-widest">
                        METRIC // 0{idx + 1}
                      </span>
                    </div>

                    <div className="text-2xl sm:text-2xl lg:text-[26px] xl:text-3xl font-extrabold font-heading text-white tracking-tight mb-1">
                      {stat.value}
                    </div>

                    <div className="text-xs sm:text-[13px] font-bold text-[#D0A04B] mb-1">
                      {stat.label}
                    </div>
                  </div>

                  <p className="text-[11px] sm:text-xs text-[#D4CEC4] font-normal leading-snug pt-2 border-t border-white/5">
                    {stat.subtext}
                  </p>
                </div>
              </div>
            );
          })}
        </StaggerGrid>
      </div>
    </section>
  );
};

export default Stats;
