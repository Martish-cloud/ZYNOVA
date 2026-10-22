import React from "react";
import { useReducedMotion } from "../../hooks/useReducedMotion";

export const PersistentVerticalScrollText: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();

  // Exact phrase specified in the requirements
  const phrase = "WE WOULD ALWAYS LOVE TO WORK WITH YOU!";

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
        {/* Continuous Top-to-Bottom Scrolling Track — Exactly ONE visible scrolling text instance */}
        <div
          className={`flex items-center pointer-events-none will-change-transform bg-transparent ${
            prefersReducedMotion ? "" : "animate-vertical-marquee-down"
          }`}
          style={{
            writingMode: "vertical-rl",
            textOrientation: "mixed",
            pointerEvents: "none",
          }}
        >
          <div className="flex flex-col items-center shrink-0 pointer-events-none select-none">
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
        </div>
      </div>
    </aside>
  );
};

export default PersistentVerticalScrollText;
