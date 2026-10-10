import React, { useState, useEffect, useRef, useMemo } from "react";
import { useReducedMotion } from "../../hooks/useReducedMotion";

interface ParsedMetric {
  prefix: string;
  targetNumber: number;
  decimals: number;
  hasCommas: boolean;
  suffix: string;
}

function parseMetricString(raw: string): ParsedMetric {
  const match = raw.match(/^([^0-9]*?)([0-9][0-9,]*(?:\.[0-9]+)?)(.*)$/);
  if (!match) {
    return {
      prefix: "",
      targetNumber: 0,
      decimals: 0,
      hasCommas: false,
      suffix: raw
    };
  }

  const [, prefix, numPart, suffix] = match;
  const hasCommas = numPart.includes(",");
  const cleanNumStr = numPart.replace(/,/g, "");
  const dotIndex = cleanNumStr.indexOf(".");
  const decimals = dotIndex >= 0 ? cleanNumStr.length - dotIndex - 1 : 0;
  const targetNumber = parseFloat(cleanNumStr) || 0;

  return {
    prefix,
    targetNumber,
    decimals,
    hasCommas,
    suffix
  };
}

function formatMetricNumber(val: number, parsed: ParsedMetric): string {
  const fixed = val.toFixed(parsed.decimals);
  if (!parsed.hasCommas) {
    return `${parsed.prefix}${fixed}${parsed.suffix}`;
  }
  const [intPart, decPart] = fixed.split(".");
  const withCommas = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return `${parsed.prefix}${decPart !== undefined ? `${withCommas}.${decPart}` : withCommas}${parsed.suffix}`;
}

interface AnimatedMetricValueProps {
  value: string;
  isActive: boolean;
  triggerKey?: string | number;
  durationMs?: number;
  staggerDelayMs?: number;
  className?: string;
}

export const AnimatedMetricValue: React.FC<AnimatedMetricValueProps> = React.memo(({
  value,
  isActive,
  triggerKey = 0,
  durationMs = 1050,
  staggerDelayMs = 0,
  className = ""
}) => {
  const prefersReducedMotion = useReducedMotion();
  const parsed = useMemo(() => parseMetricString(value), [value]);

  const [displayText, setDisplayText] = useState<string>(() =>
    prefersReducedMotion ? value : formatMetricNumber(0, parsed)
  );
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  const rafRef = useRef<number | null>(null);
  const delayTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayText(value);
      setIsAnimating(false);
      return;
    }

    if (!isActive) {
      if (delayTimerRef.current) {
        clearTimeout(delayTimerRef.current);
        delayTimerRef.current = null;
      }
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      setDisplayText(formatMetricNumber(0, parsed));
      setIsAnimating(false);
      return;
    }

    setDisplayText(formatMetricNumber(0, parsed));
    setIsAnimating(true);

    let startTime: number | null = null;

    delayTimerRef.current = setTimeout(() => {
      const animate = (timestamp: number) => {
        if (startTime === null) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / durationMs, 1);

        // Smooth cubic ease-out
        const eased = 1 - Math.pow(1 - progress, 3);
        const currentVal = eased * parsed.targetNumber;

        if (progress < 1) {
          setDisplayText(formatMetricNumber(currentVal, parsed));
          rafRef.current = requestAnimationFrame(animate);
        } else {
          // Always settle on the exact configured string
          setDisplayText(value);
          setIsAnimating(false);
          rafRef.current = null;
        }
      };

      rafRef.current = requestAnimationFrame(animate);
    }, staggerDelayMs);

    return () => {
      if (delayTimerRef.current) {
        clearTimeout(delayTimerRef.current);
        delayTimerRef.current = null;
      }
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [value, parsed, isActive, triggerKey, durationMs, staggerDelayMs, prefersReducedMotion]);

  return (
    <span
      className={`inline-block tabular-nums transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isAnimating ? "scale-[1.03]" : "scale-100"
      } ${className}`}
    >
      {prefersReducedMotion ? value : displayText}
    </span>
  );
});
