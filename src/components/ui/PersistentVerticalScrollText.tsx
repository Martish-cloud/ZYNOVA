import React from "react";
import { useReducedMotion } from "../../hooks/useReducedMotion";

export const PersistentVerticalScrollText: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();

  // Exact phrase specified in the requirements
  const phrase = "WE WOULD ALWAYS LOVE TO WORK WITH YOU!";

  // Repetition array for continuous smooth vertical movement
  const repetitions = [0, 1];

  const renderTrackSet = (keyPrefix: string, isAriaHidden: boolean = false) => (
    <div
      key={keyPrefix}
      aria-hidden={isAriaHidden}
      className="flex flex-col items-center shrink-0 pointer-events-none select-none"
    >
      {repetitions.map((idx) => (
        <div
          key={`${keyPrefix}-${idx}`}
          className="flex items-center gap-8 sm:gap-12 pb-24 sm:pb-32 text-3xl sm:text-5xl md:text-6xl lg:text-[70px] xl:text-[78px] font-heading font-black uppercase tracking-tight pointer-events-none select-none"
          style={{
            color: "#FFFFFF",
            WebkitTextStroke: "none",
            textShadow: "0 2px 24px rgba(0, 0, 0, 0.95), 0 0 12px rgba(208, 160, 75, 0.22)",
          }}
        >
          <span className="whitespace-nowrap text-white font-heading font-black">
            {phrase}
          </span>
          <span
            className="text-lg sm:text-2xl font-mono select-none"
            style={{
              color: "#D0A04B",
              textShadow: "0 0 10px rgba(208, 160, 75, 0.65)",
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
      className="absolute top-0 bottom-0 left-0 z-20 pointer-events-none select-none overflow-hidden h-full"
      style={{
        width: "clamp(75px, 7.5vw, 120px)",
        pointerEvents: "none",
      }}
    >
      {/* Subtle vertical golden rail */}
      <div className="absolute right-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-[#D0A04B]/30 to-transparent pointer-events-none" />

      {/* Dedicated clipping container: exactly 10% clipped at left edge, 90% visible */}
      <div
        className="w-full h-full relative pointer-events-none flex items-center justify-start"
        style={{
          transform: "translateX(-10%)",
        }}
      >
        {/* Continuous Top-to-Bottom Scrolling Track */}
        <div
          className={`flex flex-col items-center pointer-events-none will-change-transform ${
            prefersReducedMotion ? "" : "animate-vertical-marquee-down"
          }`}
          style={{
            writingMode: "vertical-rl",
            textOrientation: "mixed",
            animationDuration: "35s",
            pointerEvents: "none",
          }}
        >
          {renderTrackSet("set-1", false)}
          {renderTrackSet("set-2", true)}
        </div>
      </div>
    </aside>
  );
};

export default PersistentVerticalScrollText;
