import React from "react";
import { useReducedMotion } from "../../hooks/useReducedMotion";

export const PersistentVerticalScrollText: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();

  // The exact phrase specified in the requirements
  const phrase = "We would always love to work with you";

  // Repetition array to ensure seamless infinite vertical scrolling at any screen height
  const repetitions = [0, 1, 2, 3, 4, 5];

  return (
    <aside
      aria-hidden="true"
      className="fixed top-0 bottom-0 left-0 z-30 pointer-events-none select-none flex items-center justify-start overflow-hidden h-screen"
      style={{
        width: "42px",
        // Approximately 70% inside viewport, ~30% extends beyond the left edge
        transform: "translateX(-30%)",
      }}
    >
      {/* Subtle vertical guide line / ambient rail */}
      <div className="absolute right-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-[#B58A45]/20 to-transparent pointer-events-none" />

      {/* Infinite Scrolling Track */}
      <div
        className={`flex flex-col items-center will-change-transform ${
          prefersReducedMotion ? "" : "animate-vertical-marquee-down"
        }`}
        style={{
          writingMode: "vertical-rl",
          textOrientation: "mixed",
        }}
      >
        {/* Set 1 */}
        <div className="flex flex-col items-center gap-10 py-6 shrink-0">
          {repetitions.map((idx) => (
            <div
              key={`set1-${idx}`}
              className="flex items-center gap-4 text-[10px] sm:text-[11px] font-heading font-semibold uppercase tracking-[0.26em] text-[#B58A45]/70 hover:text-[#B58A45] transition-colors"
              style={{
                // Subtle elegant tilt for vertical/diagonal presentation
                transform: "rotate(-1deg)",
                textShadow: "0 1px 6px rgba(181, 138, 69, 0.15)",
              }}
            >
              <span className="whitespace-nowrap">{phrase}</span>
              <span className="text-[#C99E56]/40 text-[8px] font-mono select-none">✦</span>
            </div>
          ))}
        </div>

        {/* Set 2 (Identical duplicate for 100% seamless infinite loop) */}
        <div className="flex flex-col items-center gap-10 py-6 shrink-0">
          {repetitions.map((idx) => (
            <div
              key={`set2-${idx}`}
              className="flex items-center gap-4 text-[10px] sm:text-[11px] font-heading font-semibold uppercase tracking-[0.26em] text-[#B58A45]/70 hover:text-[#B58A45] transition-colors"
              style={{
                // Subtle elegant tilt for vertical/diagonal presentation
                transform: "rotate(-1deg)",
                textShadow: "0 1px 6px rgba(181, 138, 69, 0.15)",
              }}
            >
              <span className="whitespace-nowrap">{phrase}</span>
              <span className="text-[#C99E56]/40 text-[8px] font-mono select-none">✦</span>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default PersistentVerticalScrollText;
