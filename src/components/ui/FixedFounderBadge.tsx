import React from "react";
import { MapPin, Clock, ShieldCheck } from "lucide-react";
import { useCursor } from "../../context/useCursor";

export const FixedFounderBadge: React.FC = () => {
  const { setCursor, resetCursor } = useCursor();

  const handleScrollToFounder = (e: React.MouseEvent) => {
    e.preventDefault();
    const founderSection = document.getElementById("about");
    if (founderSection) {
      founderSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <aside
      aria-label="Founder Information"
      className="fixed bottom-[80px] sm:bottom-[86px] right-4 sm:right-6 z-40 pointer-events-auto"
    >
      <a
        href="#about"
        onClick={handleScrollToFounder}
        onMouseEnter={() => setCursor("project", "FOUNDER")}
        onMouseLeave={resetCursor}
        className="group relative flex items-center gap-3 px-3.5 py-2.5 rounded-2xl bg-[#FFFDF8]/95 backdrop-blur-md border border-[#E5D9C8] hover:border-[#B58A45]/60 shadow-[0_8px_24px_rgba(41,39,32,0.08),0_2px_8px_rgba(181,138,69,0.06)] hover:shadow-[0_12px_28px_rgba(181,138,69,0.18)] transition-all duration-300 hover:-translate-y-0.5 cursor-pointer max-w-[240px] sm:max-w-xs focus:outline-none focus:ring-2 focus:ring-[#B58A45]/60"
        title="View Founder Identity details"
      >
        {/* Subtle left gold accent bar */}
        <div className="absolute left-0 inset-y-2 w-1 rounded-r bg-gradient-to-b from-[#C99E56] via-[#B58A45] to-[#9E7432]" />

        {/* Founder Monogram Avatar */}
        <div className="relative w-8 h-8 rounded-xl bg-gradient-to-tr from-[#C99E56] via-[#B58A45] to-[#9E7432] p-[1.5px] shrink-0 shadow-xs">
          <div className="w-full h-full bg-[#FAF7F0] rounded-[10px] flex items-center justify-center font-heading font-black text-xs text-transparent bg-gradient-to-r from-[#B58A45] to-[#9E7432] bg-clip-text">
            AH
          </div>
          {/* Active online / verified dot */}
          <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white" />
        </div>

        {/* Exact Required Founder Details */}
        <div className="flex flex-col text-left">
          {/* Line 1: Founded by Amit Halder */}
          <div className="flex items-center gap-1">
            <span className="text-xs sm:text-[13px] font-bold font-heading text-[#292720] group-hover:text-[#B58A45] transition-colors leading-tight">
              Founded by Amit Halder
            </span>
            <ShieldCheck className="w-3 h-3 text-[#B58A45] shrink-0" />
          </div>

          {/* Line 2: West Bengal, India */}
          <div className="flex items-center gap-1 mt-0.5 text-[10px] sm:text-[11px] text-[#756C60] font-medium leading-tight">
            <MapPin className="w-3 h-3 text-[#B58A45] shrink-0" />
            <span>West Bengal, India</span>
          </div>

          {/* Line 3: Within 12-hour response */}
          <div className="flex items-center gap-1 mt-0.5 text-[10px] sm:text-[11px] text-[#9E7432] font-semibold leading-tight font-mono">
            <Clock className="w-3 h-3 text-[#B58A45] shrink-0" />
            <span>Within 12-hour response</span>
          </div>
        </div>
      </a>
    </aside>
  );
};
