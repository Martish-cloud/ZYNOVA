import React, { useEffect, useState, useRef } from "react";
import { useReducedMotion } from "../../hooks/useReducedMotion";

interface AnimatedCounterProps {
  value: number;
  prefix?: string;
  className?: string;
  durationMs?: number;
}

/**
 * Smooth, subtle count-up animation for financial figures.
 * Formats numbers in Indian notation (e.g. ₹1,250, ₹25,601).
 * Triggers only when the value actually changes.
 */
export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  prefix = "₹",
  className = "",
  durationMs = 900
}) => {
  const prefersReducedMotion = useReducedMotion();
  const [displayValue, setDisplayValue] = useState<number>(value);
  const prevValueRef = useRef<number>(value);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayValue(value);
      prevValueRef.current = value;
      return;
    }

    const startValue = prevValueRef.current;
    const endValue = value;

    // Do nothing if value hasn't changed
    if (startValue === endValue) {
      setDisplayValue(endValue);
      return;
    }

    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / durationMs, 1);

      // Ease-out cubic curve
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(startValue + (endValue - startValue) * easeOut);

      setDisplayValue((prev) => (prev !== current ? current : prev));

      if (progress < 1) {
        animFrameRef.current = requestAnimationFrame(animate);
      } else {
        setDisplayValue(endValue);
        prevValueRef.current = endValue;
      }
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animFrameRef.current !== null) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [value, durationMs, prefersReducedMotion]);

  return (
    <span className={`inline-block tabular-nums font-mono ${className}`}>
      {prefix}
      {displayValue.toLocaleString("en-IN")}
    </span>
  );
};
