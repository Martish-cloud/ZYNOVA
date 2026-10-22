import React, { createContext, useContext, forwardRef, useImperativeHandle, useRef } from "react";
import { motion } from "framer-motion";
import { useStackProgress } from "../../hooks/useStackProgress";
import { motionConfig } from "../../config/motionConfig";

export interface StackPanelContextType {
  theme: "dark" | "light";
  index: number;
}

const StackPanelContext = createContext<StackPanelContextType>({
  theme: "dark",
  index: 0,
});

export const useStackPanelTheme = () => useContext(StackPanelContext);

export interface StackPanelProps {
  id?: string;
  theme: "dark" | "light";
  index: number;
  nextPanelRef?: React.RefObject<HTMLElement | null> | null;
  className?: string;
  children: React.ReactNode;
}

export const StackPanel = forwardRef<HTMLElement, StackPanelProps>(({
  id,
  theme,
  index,
  nextPanelRef = null,
  className = "",
  children,
}, forwardedRef) => {
  const localRef = useRef<HTMLElement | null>(null);

  useImperativeHandle<HTMLElement | null, HTMLElement | null>(
    forwardedRef,
    () => localRef.current
  );

  const {
    stickyTop,
    scale,
    rotateX,
    filter,
    opacity,
    borderRadius,
    willChange,
    isLastPanel,
    prefersReducedMotion,
  } = useStackProgress(localRef, nextPanelRef);

  const isDark = theme === "dark";
  const isFirst = index === 0;

  // Visual classes for alternating surfaces
  const themeClasses = isDark
    ? "bg-[#0a0806] text-[#FAF7F0] selection:bg-[#B58A45]/35 selection:text-white"
    : "bg-[#FAF7F0] text-[#292720] selection:bg-[#B58A45]/25 selection:text-[#292720]";

  // Rounded top corners and shadow for rising sheets (sections after Hero)
  const sheetShadow = isDark
    ? motionConfig.stack.darkShadow
    : motionConfig.stack.lightShadow;

  const topBorderClass = isFirst
    ? ""
    : isDark
    ? "border-t border-[#B58A45]/25"
    : "border-t border-[#E5D9C8]";

  const topCornerClass = isFirst
    ? ""
    : "rounded-t-[36px] sm:rounded-t-[44px] md:rounded-t-[52px]";

  return (
    <StackPanelContext.Provider value={{ theme, index }}>
      <div
        className="relative w-full"
        style={{
          perspective: `${motionConfig.stack.perspective}px`,
          zIndex: 10 + index,
        }}
      >
        <motion.section
          ref={localRef}
          id={id}
          data-stack-index={index}
          data-theme={theme}
          style={{
            position: "sticky",
            top: `${stickyTop}px`,
            scale: isLastPanel || prefersReducedMotion ? 1 : scale,
            rotateX: isLastPanel || prefersReducedMotion ? 0 : rotateX,
            filter: isLastPanel || prefersReducedMotion ? "none" : filter,
            opacity: isLastPanel || prefersReducedMotion ? 1 : opacity,
            borderRadius: isLastPanel || prefersReducedMotion ? undefined : borderRadius,
            willChange: isLastPanel || prefersReducedMotion ? "auto" : willChange,
            transformOrigin: "top center",
            transformStyle: "preserve-3d",
            boxShadow: isFirst ? undefined : sheetShadow,
          }}
          className={`w-full overflow-hidden transition-colors duration-300 ${topCornerClass} ${topBorderClass} ${themeClasses} ${className}`}
        >
          {/* Subtle Ambient Grain & Lighting on Dark Panels */}
          {isDark && (
            <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
              {/* Golden radial wash */}
              <div className="absolute -top-[15%] left-1/2 -translate-x-1/2 w-[900px] h-[550px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(181,138,69,0.08)_0%,transparent_70%)]" />
              {/* Deep espresso vignette */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#0a0806]/40 via-transparent to-[#050403]/80" />
            </div>
          )}

          {/* Subtle Ambient Warmth on Light Panels */}
          {!isDark && (
            <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
              <div className="absolute top-[5%] right-[-5%] w-[650px] h-[650px] rounded-full bg-[radial-gradient(circle,rgba(240,228,210,0.5)_0%,transparent_70%)]" />
              <div className="absolute bottom-[5%] left-[-5%] w-[550px] h-[550px] rounded-full bg-[radial-gradient(circle,rgba(181,138,69,0.04)_0%,transparent_70%)]" />
            </div>
          )}

          {/* Content wrapper */}
          <div className="relative z-10 w-full">{children}</div>
        </motion.section>
      </div>
    </StackPanelContext.Provider>
  );
});

StackPanel.displayName = "StackPanel";
