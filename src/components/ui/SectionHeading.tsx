import React, { useMemo } from "react";
import { Badge } from "./Badge";
import { TypewriterText } from "./TypewriterText";
import { useInViewAnimation } from "../../hooks/useInViewAnimation";

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
  fadeInOut = true
}) => {
  const isCenter = align === "center";
  const { ref, isInView, triggerCount, prefersReducedMotion } = useInViewAnimation<HTMLDivElement>({
    threshold: 0.16,
    rootMargin: "0px 0px -6% 0px",
    retrigger: true
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
      {/* Badge with Controlled Slide-Up Reveal */}
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

      {/* Main Section Title with Word-Staggered Slide-Up / Pop-Up Reveal */}
      <h2
        className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white drop-shadow-[0_2px_16px_rgba(0,0,0,0.65)] mb-2.5 sm:mb-3 leading-snug"
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
                className={`inline-block bg-gradient-to-r from-[#FEF08A] via-[#FBBF24] to-[#F59E0B] bg-clip-text text-transparent ${
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

      {/* Supporting Description: Typewriter or Left-to-Right + Upward Reveal */}
      {subtitle && (
        <div
          className={`text-xs sm:text-sm md:text-base text-slate-200 drop-shadow-[0_1px_10px_rgba(0,0,0,0.65)] leading-relaxed max-w-2xl font-normal ${
            isCenter ? "mx-auto" : ""
          }`}
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

