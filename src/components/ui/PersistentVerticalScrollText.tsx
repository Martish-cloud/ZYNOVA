import React from "react";
import { useReducedMotion } from "../../hooks/useReducedMotion";

export const PersistentVerticalScrollText: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();

  // Exact phrase specified in the requirements
  const phrase = "WE WOULD ALWAYS LOVE TO WORK WITH YOU!";

  const renderTrackSet = (keyPrefix: string, isAriaHidden: boolean = false) => (
    <div
      key={keyPrefix}
      aria-hidden={isAriaHidden}
      className="flex flex-col items-center shrink-0 pointer-events-none select-none pb-[105vh]"
    >
      <div
        className="text-3xl sm:text-5xl md:text-6xl lg:text-[70px] xl:text-[78px] font-heading font-black uppercase tracking-tight text-white pointer-events-none select-none"
        style={{
          color: "#FFFFFF",
          textShadow: "0 2px 12px rgba(0, 0, 0, 0.75)",
        }}
      >
        <span className="whitespace-nowrap font-heading font-black text-white">
          {phrase}
        </span>
      </div>
    </div>
  );

  return (
    <aside
      aria-hidden="true"
      tabIndex={-1}
      className="absolute top-0 bottom-0 left-0 z-20 pointer-events-none select-none overflow-hidden h-full bg-transparent"
      style={{
        width: "clamp(75px, 7.5vw, 120px)",
        pointerEvents: "none",
      }}
    >
      {/* Dedicated clipping container: exactly 10% clipped at left edge, 90% visible. No black background or overlay */}
      <div
        className="w-full h-full relative pointer-events-none flex items-center justify-start bg-transparent"
        style={{
          transform: "translateX(-10%)",
        }}
      >
        {/* Continuous Top-to-Bottom Scrolling Track */}
        <div
          className={`flex flex-col items-center pointer-events-none will-change-transform bg-transparent ${
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
      </div>
    </aside>
  );
};

export default PersistentVerticalScrollText;
