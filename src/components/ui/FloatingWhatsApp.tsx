import React from "react";
import { siteConfig } from "../../config/siteConfig";
import { useCursor } from "../../context/useCursor";
import { WhatsAppIcon } from "./WhatsAppIcon";

export const FloatingWhatsApp: React.FC = () => {
  const { setCursor, resetCursor } = useCursor();

  return (
    <div className="fixed bottom-6 right-6 z-40 pointer-events-auto">
      <a
        href={siteConfig.whatsappGroupURL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Join the ZYNOVA WhatsApp group"
        onMouseEnter={() => setCursor("button", "JOIN")}
        onMouseLeave={resetCursor}
        className="group relative flex items-center gap-2.5 h-12 px-3.5 sm:px-4 rounded-full bg-white/95 hover:bg-white backdrop-blur-xl border border-amber-400/60 hover:border-amber-500 shadow-[0_8px_28px_rgba(15,23,42,0.12),0_0_20px_rgba(212,175,55,0.2)] hover:shadow-[0_12px_35px_rgba(212,175,55,0.35)] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-500/60 cursor-pointer"
      >
        {/* Subtle pulsing indicator ring */}
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-white" />
        </span>

        {/* WhatsApp Icon */}
        <span className="text-[#16a34a] group-hover:scale-110 transition-transform duration-300 flex items-center justify-center">
          <WhatsAppIcon className="w-5 h-5" size={20} />
        </span>

        {/* Label (visible on hover for desktop, compact badge) */}
        <span className="max-w-0 overflow-hidden whitespace-nowrap opacity-0 group-hover:max-w-xs group-hover:opacity-100 transition-all duration-300 ease-out text-xs font-heading font-semibold text-slate-900 group-hover:text-amber-800">
          Join WhatsApp
        </span>
      </a>
    </div>
  );
};
