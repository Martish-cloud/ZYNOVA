import React from "react";
import { useReducedMotion } from "../../hooks/useReducedMotion";

export const PersistentVerticalScrollText: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();

  // Exact phrase specified in the requirements (in uppercase)
  const phrase = "WE WOULD ALWAYS LOVE TO WORK WITH YOU";

  // Repetition array for continuous smooth vertical movement
  const repetitions = [0, 1];

  const renderTrackSet = (keyPrefix: string, isAriaHidden: boolean = false) => (
    <div
      key={keyPrefix}
      aria-hidden={isAriaHidden}
      className="flex flex-col items-center gap-24 py-12 shrink-0 pointer-events-none select-none"
    >
      {repetitions.map((idx) => (
        <div
          key={`${keyPrefix}-${idx}`}
          className="flex items-center gap-8 text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-heading font-black uppercase tracking-widest text-white pointer-events-none select-none"
          style={{
            textShadow: "0 2px 18px rgba(0, 0, 0, 0.95), 0 0 6px rgba(208, 160, 75, 0.35)",
          }}
        >
          <span className="whitespace-nowrap tracking-[0.16em]">{phrase}</span>
          <span className="text-[#D0A04B] text-base font-mono select-none">✦</span>
        </div>
      ))}
    </div>
  );

  return (
    <aside
      aria-hidden="true"
      tabIndex={-1}
      className="absolute top-0 bottom-0 left-0 z-20 pointer-events-none select-none flex items-center justify-start overflow-hidden h-full"
      style={{
        width: "clamp(60px, 6.5vw, 92px)",
        // Approximately 72% visible within viewport, 28% beyond left edge
        transform: "translateX(-28%)",
        pointerEvents: "none",
      }}
    >
      {/* Subtle vertical golden rail */}
      <div className="absolute right-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-[#D0A04B]/30 to-transparent pointer-events-none" />

      {/* Continuous Top-to-Bottom Scrolling Track - Non-pausing, pointer-events none */}
      <div
        className={`flex flex-col items-center pointer-events-none will-change-transform ${
          prefersReducedMotion ? "" : "animate-vertical-marquee-down"
        }`}
        style={{
          writingMode: "vertical-rl",
          textOrientation: "mixed",
          animationDuration: "28s",
          pointerEvents: "none",
        }}
      >
        {renderTrackSet("set-1", false)}
        {renderTrackSet("set-2", true)}
      </div>
    </aside>
  );
};

export default PersistentVerticalScrollText;
