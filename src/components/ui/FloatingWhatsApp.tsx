import React from "react";
import { siteConfig } from "../../config/siteConfig";
import { useCursor } from "../../context/useCursor";
import { WhatsAppIcon } from "./WhatsAppIcon";

export const FloatingWhatsApp: React.FC = () => {
  const { setCursor, resetCursor } = useCursor();

  return (
    <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-40 pointer-events-auto">
      <a
        href={siteConfig.whatsappGroupURL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Join the ZYNOVA WhatsApp group"
        onMouseEnter={() => setCursor("button", "JOIN")}
        onMouseLeave={resetCursor}
        className="group relative flex items-center gap-2.5 h-12 px-3.5 sm:px-4 rounded-full bg-[#FFFDF8]/95 backdrop-blur-md hover:bg-white border border-[#E5D9C8] hover:border-[#25D366]/60 shadow-[0_8px_24px_rgba(41,39,32,0.1),0_2px_8px_rgba(37,211,102,0.12)] hover:shadow-[0_12px_32px_rgba(37,211,102,0.22)] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#25D366]/60 cursor-pointer"
      >
        {/* Subtle pulsing indicator ring */}
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-white" />
        </span>

        {/* WhatsApp Icon */}
        <span className="text-[#25D366] group-hover:scale-110 transition-transform duration-300 flex items-center justify-center">
          <WhatsAppIcon className="w-5 h-5 text-[#25D366]" size={20} />
        </span>

        {/* Label (visible on hover for desktop, compact badge) */}
        <span className="max-w-0 overflow-hidden whitespace-nowrap opacity-0 group-hover:max-w-xs group-hover:opacity-100 transition-all duration-300 ease-out text-xs font-heading font-bold text-[#292720] group-hover:text-[#128C7E]">
          Join WhatsApp
        </span>
      </a>
    </div>
  );
};
