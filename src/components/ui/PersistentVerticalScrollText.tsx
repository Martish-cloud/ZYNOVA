import React from "react";
import { useReducedMotion } from "../../hooks/useReducedMotion";

export const PersistentVerticalScrollText: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();

  // Exact phrase specified in the requirements (with exclamation mark)
  const phrase = "WE WOULD ALWAYS LOVE TO WORK WITH YOU!";

  // Repetition array for continuous smooth vertical movement
  const repetitions = [0, 1];

  const renderTrackSet = (keyPrefix: string, isAriaHidden: boolean = false) => (
    <div
      key={keyPrefix}
      aria-hidden={isAriaHidden}
      className="flex flex-col items-center gap-20 sm:gap-28 py-10 shrink-0 pointer-events-none select-none"
    >
      {repetitions.map((idx) => (
        <div
          key={`${keyPrefix}-${idx}`}
          className="flex items-center gap-10 text-3xl sm:text-5xl md:text-6xl lg:text-[66px] xl:text-[72px] font-heading font-black uppercase tracking-wider pointer-events-none select-none"
          style={{
            color: "#000000",
            WebkitTextStroke: "1.5px #FFFFFF",
            filter: "drop-shadow(0 0 5px rgba(216, 168, 62, 0.5)) drop-shadow(0 0 14px rgba(216, 168, 62, 0.28))",
          }}
        >
          <span className="whitespace-nowrap tracking-[0.14em]">{phrase}</span>
          <span
            className="text-base sm:text-lg font-mono select-none"
            style={{
              color: "#D8A83E",
              WebkitTextStroke: "0px transparent",
              filter: "drop-shadow(0 0 6px rgba(216, 168, 62, 0.7))",
            }}
          >
            ✦
          </span>
        </div>
      ))}
    </div>
  );

  return (
    <aside
      aria-hidden="true"
      tabIndex={-1}
      className="absolute top-0 bottom-0 left-1 sm:left-2 md:left-3 z-20 pointer-events-none select-none flex items-center justify-center overflow-hidden h-full"
      style={{
        width: "clamp(64px, 6.5vw, 96px)",
        pointerEvents: "none",
      }}
    >
      {/* Subtle vertical golden rail */}
      <div className="absolute right-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-[#D8A83E]/30 to-transparent pointer-events-none" />

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
