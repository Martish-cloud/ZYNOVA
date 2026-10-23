import React from "react";

export const FixedFounderBadge: React.FC = () => {
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
        className="group relative flex items-center gap-2 pl-3.5 pr-3 py-2 rounded-xl bg-[#FFFDF8]/95 backdrop-blur-md border border-[#E5D9C8] hover:border-[#B58A45]/60 shadow-[0_4px_16px_rgba(41,39,32,0.08),0_2px_6px_rgba(181,138,69,0.06)] hover:shadow-[0_8px_20px_rgba(181,138,69,0.18)] transition-all duration-300 hover:-translate-y-0.5 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#B58A45]/60"
        title="Founded by Amit Halder"
      >
        {/* Subtle left gold accent bar */}
        <div className="absolute left-0 inset-y-1.5 w-1 rounded-r bg-gradient-to-b from-[#C99E56] via-[#B58A45] to-[#9E7432]" />

        <span className="text-xs sm:text-[13px] font-bold font-heading text-[#292720] group-hover:text-[#B58A45] transition-colors leading-none tracking-tight">
          Founded by Amit Halder
        </span>

        {/* Meta-inspired blue verification badge */}
        <span
          aria-label="Verified"
          className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-[#1877F2] text-white shrink-0 shadow-[0_1px_3px_rgba(24,119,242,0.4)]"
        >
          <svg
            className="w-2.5 h-2.5 stroke-[3] stroke-current fill-none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </span>
      </a>
    </aside>
  );
};
