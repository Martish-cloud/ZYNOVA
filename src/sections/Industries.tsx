import React from "react";
import { industriesData } from "../data/industries";
import { SectionHeading } from "../components/ui/SectionHeading";
import { useInViewAnimation } from "../hooks/useInViewAnimation";
import { useCursor } from "../context/useCursor";
import {
  ShoppingBag,
  Cpu,
  HeartPulse,
  GraduationCap,
  Compass,
  UtensilsCrossed,
  Activity,
  Building2,
  Briefcase,
  Rocket
} from "lucide-react";

export const Industries: React.FC = () => {
  const { setCursor, resetCursor } = useCursor();
  const {
    ref: gridRef,
    isInView: isGridInView,
    prefersReducedMotion
  } = useInViewAnimation<HTMLDivElement>({
    threshold: 0.14,
    rootMargin: "0px 0px -6% 0px",
    retrigger: true
  });

  const getIcon = (iconName: string) => {
    const props = { className: "w-4 h-4 text-amber-600 group-hover:text-amber-700 transition-colors" };
    switch (iconName) {
      case "ShoppingBag": return <ShoppingBag {...props} />;
      case "Cpu": return <Cpu {...props} />;
      case "HeartPulse": return <HeartPulse {...props} />;
      case "GraduationCap": return <GraduationCap {...props} />;
      case "Compass": return <Compass {...props} />;
      case "UtensilsCrossed": return <UtensilsCrossed {...props} />;
      case "Activity": return <Activity {...props} />;
      case "Building2": return <Building2 {...props} />;
      case "Briefcase": return <Briefcase {...props} />;
      case "Rocket": return <Rocket {...props} />;
      default: return <Cpu {...props} />;
    }
  };

  return (
    <section id="industries" className="py-14 sm:py-18 md:py-20 relative z-10 bg-transparent border-t border-white/25">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="INDUSTRIES WE SERVE"
          title="Digital Solutions Engineered for"
          highlightedTitle="Diverse Sectors."
          subtitle="Tailored digital architectures and reporting pipelines designed to meet the unique operational challenges of modern industry verticals."
          subtitleVariant="ltr"
        />

        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-3.5"
        >
          {industriesData.map((ind, idx) => (
            <div
              key={ind.name}
              style={
                !prefersReducedMotion
                  ? { transitionDelay: isGridInView ? `${idx * 60}ms` : "0ms" }
                  : undefined
              }
              onMouseEnter={() => setCursor("project", ind.name)}
              onMouseLeave={resetCursor}
              className={`group p-4 sm:p-4.5 rounded-xl liquid-glass-card transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-2 hover:scale-[1.025] active:scale-[0.98] active:-translate-y-0.5 flex flex-col justify-between cursor-pointer ${
                isGridInView
                  ? "opacity-100 translate-y-0 scale-100"
                  : "opacity-0 translate-y-5 scale-[0.96]"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 rounded-lg bg-amber-50/75 border border-amber-300/75 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] group-hover:scale-110 group-hover:border-amber-400 transition-all">
                    {getIcon(ind.icon)}
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-50/85 text-amber-900 border border-amber-400/55 font-bold">
                    {ind.tag}
                  </span>
                </div>

                <h3 className="font-heading font-bold text-sm sm:text-[15px] text-slate-900 group-hover:text-amber-800 transition-colors mb-1.5">
                  {ind.name}
                </h3>

                <p className="text-[11.5px] sm:text-xs text-slate-700 font-medium leading-relaxed">
                  {ind.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

