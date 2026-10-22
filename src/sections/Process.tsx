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
    const props = { className: "w-5 h-5 text-[#B58A45] group-hover:text-[#8C6527] transition-colors" };
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
    <section id="process" className="py-14 sm:py-18 md:py-20 relative z-10 bg-transparent">
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
          <div className="absolute top-1/2 left-4 right-4 h-0.5 bg-white/15 -translate-y-1/2 z-0" />
          
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
                      ? "bg-gradient-to-tr from-[#B58A45] via-[#C99D57] to-[#B58A45] text-white font-bold shadow-md border border-[#B58A45]"
                      : "bg-[#181410] border border-white/10 text-[#C5BCB0] group-hover:border-[#B58A45]"
                  }`}
                >
                  {step.number}
                </div>
                <span className="text-[10px] font-mono mt-1.5 font-bold tracking-wider text-[#A89F91] uppercase">
                  {step.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Step Spotlight Banner */}
        <div className="hidden lg:block mb-10 sm:mb-12 p-5 sm:p-6 rounded-2xl bg-[#181410]/90 border border-white/10 shadow-xl backdrop-blur-md">
          <div className="flex items-start justify-between gap-6">
            <div className="space-y-2.5 max-w-2xl">
              <div className="flex items-center gap-2.5">
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#B58A45]/15 text-[#D4AF37] border border-[#B58A45]/35 font-bold">
                  STEP {processData[activeStep].number} OF 07
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold font-heading text-[#FAF7F0]">
                  {processData[activeStep].title}
                </h3>
              </div>
              <p className="text-sm sm:text-base text-[#D4AF37] font-semibold">
                {processData[activeStep].description}
              </p>
              <p className="text-xs sm:text-sm text-[#C5BCB0] font-normal leading-relaxed">
                {processData[activeStep].details}
              </p>
            </div>

            <div className="w-14 h-14 rounded-xl bg-[#B58A45]/15 border border-[#B58A45]/35 flex items-center justify-center text-[#D4AF37] shadow-sm shrink-0">
              {getIcon(processData[activeStep].icon)}
            </div>
          </div>
        </div>

        {/* Vertical Stepper for Mobile & Tablets */}
        <div className="lg:hidden space-y-3">
          {processData.map((step) => (
            <div
              key={step.number}
              className="p-4 sm:p-4.5 rounded-xl bg-[#181410]/90 border border-white/10 flex items-start gap-3.5 shadow-sm"
            >
              <div className="w-8 h-8 rounded-lg bg-[#B58A45]/15 border border-[#B58A45]/35 text-[#D4AF37] font-heading font-black flex items-center justify-center shrink-0 text-xs">
                {step.number}
              </div>
              <div>
                <h4 className="font-heading font-bold text-base text-[#FAF7F0] mb-1">
                  {step.title}
                </h4>
                <p className="text-xs text-[#D4AF37] mb-1 font-semibold">
                  {step.description}
                </p>
                <p className="text-[11.5px] text-[#C5BCB0] font-normal leading-relaxed">
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
