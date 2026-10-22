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
      color: "text-[#B58A45]"
    },
    {
      icon: Briefcase,
      value: `${countIndustries}+`,
      label: "Industries Served",
      subtext: "E-commerce, Healthcare, SaaS, EdTech, Real Estate",
      color: "text-[#B58A45]"
    },
    {
      icon: Layers,
      value: `${countProjects}+`,
      label: "Solutions Engineered",
      subtext: "Web platforms, backend microservices, BI dashboards",
      color: "text-[#B58A45]"
    },
    {
      icon: ShieldCheck,
      value: `${countOwnership}%`,
      label: "Client Ownership",
      subtext: "Complete source code, assets, and repository rights",
      color: "text-[#B58A45]"
    }
  ];

  return (
    <section
      id="stats"
      ref={containerRef}
      className="relative z-10 py-10 sm:py-12 bg-transparent"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <StaggerGrid stagger={0.08} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-4.5">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="relative rounded-2xl overflow-hidden transition-all duration-300 shadow-[0_4px_16px_rgba(41,39,32,0.04)] hover:shadow-[0_12px_32px_rgba(181,138,69,0.16)] group hover:-translate-y-1 h-full"
              >
                {/* Synchronized Perimeter Border Light */}
                <CardBorderLight retriggerKey={triggerCount} />

                {/* Card Interior */}
                <div className="relative z-10 p-4.5 sm:p-5 rounded-2xl bg-white border border-[#E5D9C8] h-full flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2 rounded-xl bg-[#B58A45]/12 border border-[#B58A45]/30 group-hover:scale-110 transition-transform">
                      <Icon className={`w-4.5 h-4.5 ${stat.color}`} />
                    </div>
                    <span className="font-mono text-[9px] uppercase text-[#756C60] font-bold tracking-widest">
                      METRIC // 0{idx + 1}
                    </span>
                  </div>

                  <div className="text-2xl sm:text-3xl font-extrabold font-heading text-[#292720] tracking-tight mb-1">
                    {stat.value}
                  </div>

                  <div className="text-xs sm:text-sm font-bold text-[#292720] mb-0.5">
                    {stat.label}
                  </div>

                  <p className="text-[11px] sm:text-xs text-[#756C60] font-normal leading-snug">
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
