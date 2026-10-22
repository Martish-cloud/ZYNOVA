import React, { useMemo } from "react";
import { Badge } from "./Badge";
import { TypewriterText } from "./TypewriterText";
import { useInViewAnimation } from "../../hooks/useInViewAnimation";
import { useStackPanelTheme } from "../motion/StackPanel";

interface SectionHeadingProps {
  badge: string;
  title: string;
  highlightedTitle?: string;
  subtitle?: string;
  align?: "left" | "center";
  badgeVariant?: "cyan" | "purple" | "emerald" | "gold" | "neutral";
  subtitleVariant?: "typewriter" | "ltr" | "slide-up";
  className?: string;
  fadeInOut?: boolean;
  theme?: "dark" | "light";
}

export const SectionHeading: React.FC<SectionHeadingProps> = React.memo(({
  badge,
  title,
  highlightedTitle,
  subtitle,
  align = "center",
  badgeVariant = "gold",
  subtitleVariant = "ltr",
  className = "",
  fadeInOut = true,
  theme
}) => {
  const isCenter = align === "center";
  const panelContext = useStackPanelTheme();
  const isDark = (theme || panelContext?.theme) === "dark";
  const { ref, isInView, triggerCount, prefersReducedMotion } = useInViewAnimation<HTMLDivElement>({
    threshold: 0.16,
    rootMargin: "0px 0px -6% 0px",
    retrigger: false
  });

  const shouldAnimate = fadeInOut && !prefersReducedMotion;
  const isVisible = !shouldAnimate || isInView;

  const titleWords = useMemo(() => title.trim().split(/\s+/), [title]);
  const highlightWords = useMemo(
    () => (highlightedTitle ? highlightedTitle.trim().split(/\s+/) : []),
    [highlightedTitle]
  );

  return (
    <div
      ref={ref}
      className={`mb-8 sm:mb-10 md:mb-12 ${isCenter ? "text-center max-w-3xl mx-auto" : "max-w-2xl"} ${className}`}
    >
      {/* Badge with Slide-Up Reveal */}
      <div
        className={`mb-2.5 sm:mb-3 flex ${isCenter ? "justify-center" : "justify-start"} ${
          shouldAnimate
            ? `transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isVisible
                  ? "opacity-100 translate-y-0 scale-100"
                  : "opacity-0 translate-y-3 scale-95 pointer-events-none"
              }`
            : ""
        }`}
      >
        <Badge variant={badgeVariant}>{badge}</Badge>
      </div>

      {/* Main Section Title */}
      <h2
        className={`text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-2.5 sm:mb-3 leading-snug ${
          isDark ? "text-[#FAF7F0]" : "text-[#292720]"
        }`}
      >
        {titleWords.map((word, idx) => (
          <React.Fragment key={`t-${idx}-${word}`}>
            <span
              style={
                shouldAnimate
                  ? {
                      transitionDelay: isVisible ? `${40 + idx * 42}ms` : "0ms"
                    }
                  : undefined
              }
              className={`inline-block ${
                shouldAnimate
                  ? `transition-all duration-[650ms] ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[transform,opacity] ${
                      isVisible
                        ? "opacity-100 translate-y-0 scale-100"
                        : "opacity-0 translate-y-4 scale-[0.97]"
                    }`
                  : ""
              }`}
            >
              {word}
            </span>{" "}
          </React.Fragment>
        ))}

        {highlightWords.map((word, idx) => {
          const wordDelay = 40 + (titleWords.length + idx) * 42;
          return (
            <React.Fragment key={`h-${idx}-${word}`}>
              <span
                style={
                  shouldAnimate
                    ? {
                        transitionDelay: isVisible ? `${wordDelay}ms` : "0ms"
                      }
                    : undefined
                }
                className={`inline-block bg-gradient-to-r from-[#B58A45] via-[#C99E56] to-[#9E7432] bg-clip-text text-transparent ${
                  shouldAnimate
                    ? `transition-all duration-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[transform,opacity] ${
                        isVisible
                          ? "opacity-100 translate-y-0 scale-100 brightness-105"
                          : "opacity-0 translate-y-4 scale-[0.96] brightness-75"
                      }`
                    : ""
                }`}
              >
                {word}
              </span>
              {idx < highlightWords.length - 1 ? " " : ""}
            </React.Fragment>
          );
        })}
      </h2>

      {/* Supporting Description */}
      {subtitle && (
        <div
          className={`text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl font-normal ${
            isDark ? "text-[#C5BCB0]" : "text-[#756C60]"
          } ${isCenter ? "mx-auto" : ""}`}
        >
          {subtitleVariant === "typewriter" ? (
            <TypewriterText
              text={subtitle}
              isActive={isVisible}
              triggerKey={triggerCount}
              startDelayMs={220}
              withUpwardMotion={true}
            />
          ) : (
            <p
              style={
                shouldAnimate
                  ? {
                      transitionDelay: isVisible ? "180ms" : "0ms"
                    }
                  : undefined
              }
              className={
                shouldAnimate
                  ? `transition-all duration-[680ms] ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[transform,opacity] ${
                      isVisible
                        ? "opacity-100 translate-x-0 translate-y-0"
                        : subtitleVariant === "ltr"
                        ? "opacity-0 -translate-x-5 translate-y-2.5"
                        : "opacity-0 translate-y-3.5"
                    }`
                  : ""
              }
            >
              {subtitle}
            </p>
          )}
        </div>
      )}
    </div>
  );
});

SectionHeading.displayName = "SectionHeading";
