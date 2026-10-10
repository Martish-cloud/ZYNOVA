import React from "react";
import { Badge } from "./Badge";
import { useInViewAnimation } from "../../hooks/useInViewAnimation";

interface SectionHeadingProps {
  badge: string;
  title: string;
  highlightedTitle?: string;
  subtitle?: string;
  align?: "left" | "center";
  badgeVariant?: "cyan" | "purple" | "emerald" | "gold" | "neutral";
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
  className = "",
  fadeInOut = true
}) => {
  const isCenter = align === "center";
  const { ref, isInView, prefersReducedMotion } = useInViewAnimation<HTMLDivElement>({
    threshold: 0.15,
    rootMargin: "0px 0px -30px 0px",
    retrigger: true
  });

  const shouldAnimate = fadeInOut && !prefersReducedMotion;
  const isVisible = !shouldAnimate || isInView;

  return (
    <div
      ref={ref}
      className={`mb-8 sm:mb-10 md:mb-12 ${isCenter ? "text-center max-w-3xl mx-auto" : "max-w-2xl"} ${className}`}
    >
      {/* Badge with Entrance Motion */}
      <div
        className={`mb-2.5 sm:mb-3 flex ${isCenter ? "justify-center" : "justify-start"} ${
          shouldAnimate
            ? `transition-all duration-500 ease-out ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2.5 pointer-events-none"
              }`
            : ""
        }`}
      >
        <Badge variant={badgeVariant}>{badge}</Badge>
      </div>

      {/* Main Section Title */}
      <h2
        className={`text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white drop-shadow-[0_2px_16px_rgba(0,0,0,0.65)] mb-2.5 sm:mb-3 leading-snug ${
          shouldAnimate
            ? `transition-all duration-700 delay-75 ease-out ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
              }`
            : ""
        }`}
      >
        {title}{" "}
        {highlightedTitle && (
          <span className="bg-gradient-to-r from-[#FEF08A] via-[#FBBF24] to-[#F59E0B] bg-clip-text text-transparent">
            {highlightedTitle}
          </span>
        )}
      </h2>

      {/* Subtitle with Entrance Motion */}
      {subtitle && (
        <p
          className={`text-xs sm:text-sm md:text-base text-slate-200 drop-shadow-[0_1px_10px_rgba(0,0,0,0.65)] leading-relaxed max-w-2xl font-normal ${
            shouldAnimate
              ? `transition-all duration-700 delay-150 ease-out ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
                }`
              : ""
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
});
