import React from "react";
import { industriesData } from "../data/industries";
import { SectionHeading } from "../components/ui/SectionHeading";
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
    <section id="industries" className="py-14 sm:py-18 md:py-20 relative z-10 bg-transparent border-t border-slate-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="INDUSTRIES WE SERVE"
          title="Digital Solutions Engineered for"
          highlightedTitle="Diverse Sectors."
          subtitle="Tailored digital architectures and reporting pipelines designed to meet the unique operational challenges of modern industry verticals."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-3.5">
          {industriesData.map((ind) => (
            <div
              key={ind.name}
              onMouseEnter={() => setCursor("project", ind.name)}
              onMouseLeave={resetCursor}
              className="group p-4 sm:p-4.5 rounded-xl bg-white/80 border border-slate-200/80 hover:border-amber-400/60 hover:bg-white/95 backdrop-blur-xl transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-[1.025] shadow-[0_8px_24px_rgba(15,23,42,0.05),inset_0_1px_0_rgba(255,255,255,0.9)] hover:shadow-[0_20px_40px_-12px_rgba(245,158,11,0.18)] active:scale-[0.98] active:-translate-y-0.5 flex flex-col justify-between cursor-pointer"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 rounded-lg bg-amber-50/80 border border-amber-200/80 group-hover:scale-110 group-hover:border-amber-400/50 transition-all">
                    {getIcon(ind.icon)}
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-50/90 text-amber-800 border border-amber-300/60 font-semibold">
                    {ind.tag}
                  </span>
                </div>

                <h3 className="font-heading font-bold text-sm sm:text-[15px] text-slate-900 group-hover:text-amber-700 transition-colors mb-1.5">
                  {ind.name}
                </h3>

                <p className="text-[11.5px] sm:text-xs text-slate-600 leading-relaxed">
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
