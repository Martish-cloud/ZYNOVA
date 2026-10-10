import React, { useState } from "react";
import { processData } from "../data/process";
import { SectionHeading } from "../components/ui/SectionHeading";
import { useCursor } from "../context/useCursor";
import {
  Compass,
  Map,
  Palette,
  Code2,
  CheckCircle2,
  Rocket,
  LifeBuoy,
  Sparkles
} from "lucide-react";

export const Process: React.FC = () => {
  const { setCursor, resetCursor } = useCursor();
  const [activeStep, setActiveStep] = useState(0);

  const getIcon = (iconName: string) => {
    const props = { className: "w-5 h-5 text-amber-600 group-hover:text-amber-700 transition-colors" };
    switch (iconName) {
      case "Compass": return <Compass {...props} />;
      case "Map": return <Map {...props} />;
      case "Palette": return <Palette {...props} />;
      case "Code2": return <Code2 {...props} />;
      case "CheckCircle2": return <CheckCircle2 {...props} />;
      case "Rocket": return <Rocket {...props} />;
      case "LifeBuoy": return <LifeBuoy {...props} />;
      default: return <Sparkles {...props} />;
    }
  };

  return (
    <section id="process" className="py-14 sm:py-18 md:py-20 relative z-10 bg-transparent border-t border-white/25">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="HOW WE WORK"
          title="A Disciplined Seven-Step"
          highlightedTitle="Delivery Pipeline."
          subtitle="From initial discovery and architectural blueprinting to testing, release, and long-term support."
          subtitleVariant="typewriter"
        />

        {/* Interactive Timeline Stepper on Desktop */}
        <div className="hidden lg:flex items-center justify-between mb-10 sm:mb-12 relative">
          {/* Connecting line */}
          <div className="absolute top-1/2 left-4 right-4 h-0.5 bg-white/35 -translate-y-1/2 z-0" />
          
          {processData.map((step, idx) => {
            const isSelected = activeStep === idx;
            return (
              <button
                key={step.number}
                onClick={() => setActiveStep(idx)}
                onMouseEnter={() => setCursor("button")}
                onMouseLeave={resetCursor}
                className={`relative z-10 flex flex-col items-center group cursor-pointer transition-transform ${
                  isSelected ? "scale-105" : "opacity-85 hover:opacity-100"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center font-heading font-black text-xs transition-all duration-300 ${
                    isSelected
                      ? "bg-gradient-to-tr from-amber-300 via-yellow-400 to-amber-500 text-slate-950 font-bold shadow-[0_6px_18px_rgba(245,158,11,0.45)] border border-amber-300"
                      : "liquid-glass-pill text-slate-900 group-hover:border-amber-400/70"
                  }`}
                >
                  {step.number}
                </div>
                <span className="text-[10px] font-mono mt-1.5 font-bold tracking-wider text-white drop-shadow-[0_1px_6px_rgba(0,0,0,0.75)] uppercase">
                  {step.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Step Spotlight Banner */}
        <div className="hidden lg:block mb-10 sm:mb-12 p-5 sm:p-6 rounded-2xl liquid-glass-panel !border-amber-400/50">
          <div className="flex items-start justify-between gap-6">
            <div className="space-y-2.5 max-w-2xl">
              <div className="flex items-center gap-2.5">
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-amber-50/85 text-amber-900 border border-amber-400/55 font-bold">
                  STEP {processData[activeStep].number} OF 07
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold font-heading text-slate-900">
                  {processData[activeStep].title}
                </h3>
              </div>
              <p className="text-sm sm:text-base text-slate-900 font-semibold">
                {processData[activeStep].description}
              </p>
              <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                {processData[activeStep].details}
              </p>
            </div>

            <div className="w-14 h-14 rounded-xl bg-amber-50/80 border border-amber-300/75 flex items-center justify-center text-amber-600 shadow-[0_8px_20px_rgba(245,158,11,0.14),inset_0_1px_0_rgba(255,255,255,0.85)] shrink-0">
              {getIcon(processData[activeStep].icon)}
            </div>
          </div>
        </div>

        {/* Vertical Stepper for Mobile & Tablets */}
        <div className="lg:hidden space-y-3">
          {processData.map((step) => (
            <div
              key={step.number}
              className="p-4 sm:p-4.5 rounded-xl liquid-glass-card flex items-start gap-3.5"
            >
              <div className="w-8 h-8 rounded-lg bg-amber-50/85 border border-amber-400/55 text-amber-900 font-heading font-black flex items-center justify-center shrink-0 text-xs">
                {step.number}
              </div>
              <div>
                <h4 className="font-heading font-bold text-base text-slate-900 mb-1">
                  {step.title}
                </h4>
                <p className="text-xs text-slate-800 mb-1 font-semibold">
                  {step.description}
                </p>
                <p className="text-[11.5px] text-slate-700 font-medium leading-relaxed">
                  {step.details}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
