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
  theme: _theme,
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

  const isFirst = index === 0;

  // Visual classes for dark theme surfaces
  const isEven = index % 2 === 0;
  const surfaceBg = isEven ? "bg-[#080706]" : "bg-[#100D09]";
  const themeClasses = `${surfaceBg} text-[#FFFFFF] selection:bg-[#D0A04B]/35 selection:text-white`;

  // Rounded top corners and shadow for rising sheets (sections after Hero)
  const sheetShadow = isFirst ? undefined : "0 -12px 48px rgba(0, 0, 0, 0.75)";

  const topBorderClass = isFirst
    ? ""
    : "border-t border-[#D0A04B]/20";

  const topCornerClass = isFirst
    ? ""
    : "rounded-t-[36px] sm:rounded-t-[44px] md:rounded-t-[52px]";

  return (
    <StackPanelContext.Provider value={{ theme: "dark", index }}>
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
          data-theme="dark"
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
            boxShadow: sheetShadow,
          }}
          className={`w-full overflow-hidden transition-colors duration-300 ${topCornerClass} ${topBorderClass} ${themeClasses} ${className}`}
        >
          {/* Subtle Ambient Grain & Golden Radial Lighting */}
          <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
            <div className="absolute -top-[15%] left-1/2 -translate-x-1/2 w-[900px] h-[550px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(208,160,75,0.06)_0%,transparent_70%)]" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#080706]/30 via-transparent to-[#040302]/70" />
          </div>

          {/* Content wrapper */}
          <div className="relative z-10 w-full">{children}</div>
        </motion.section>
      </div>
    </StackPanelContext.Provider>
  );
});

StackPanel.displayName = "StackPanel";
