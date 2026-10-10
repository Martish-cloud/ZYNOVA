import React, { useState, useEffect, useRef } from "react";
import { useReducedMotion } from "../../hooks/useReducedMotion";

interface TypewriterTextProps {
  text: string;
  isActive?: boolean;
  triggerKey?: number | string;
  startDelayMs?: number;
  durationMs?: number;
  className?: string;
  cursorColorClass?: string;
  withUpwardMotion?: boolean;
  inline?: boolean;
}

export const TypewriterText: React.FC<TypewriterTextProps> = React.memo(({
  text,
  isActive = true,
  triggerKey = 0,
  startDelayMs = 150,
  durationMs,
  className = "",
  cursorColorClass = "bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.7)]",
  withUpwardMotion = false,
  inline = false
}) => {
  const prefersReducedMotion = useReducedMotion();
  const [charCount, setCharCount] = useState<number>(() =>
    prefersReducedMotion ? text.length : 0
  );
  const [isTyping, setIsTyping] = useState<boolean>(false);

  const rafRef = useRef<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Compute balanced typing duration based on text length (650ms - 1400ms)
  const effectiveDuration = durationMs ?? Math.min(Math.max(text.length * 7.5, 650), 1400);

  useEffect(() => {
    if (prefersReducedMotion) {
      setCharCount(text.length);
      setIsTyping(false);
      return;
    }

    if (!isActive) {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      setCharCount(0);
      setIsTyping(false);
      return;
    }

    setCharCount(0);
    setIsTyping(true);

    let startTime: number | null = null;

    timerRef.current = setTimeout(() => {
      const step = (timestamp: number) => {
        if (startTime === null) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / effectiveDuration, 1);

        const nextChars = Math.floor(progress * text.length);
        setCharCount(nextChars);

        if (progress < 1) {
          rafRef.current = requestAnimationFrame(step);
        } else {
          setCharCount(text.length);
          setIsTyping(false);
          rafRef.current = null;
        }
      };

      rafRef.current = requestAnimationFrame(step);
    }, startDelayMs);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [text, isActive, triggerKey, startDelayMs, effectiveDuration, prefersReducedMotion]);

  const displayedText = prefersReducedMotion ? text : text.slice(0, charCount);
  const showCursor = !prefersReducedMotion && isTyping && charCount < text.length;
  const displayMode = inline ? "inline-block align-bottom" : "block";

  return (
    <span
      aria-label={text}
      className={`relative ${displayMode} ${
        withUpwardMotion && !prefersReducedMotion
          ? `transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
            }`
          : ""
      }`}
    >
      {/* Invisible full text reserves exact multi-line height/width so layout never shifts */}
      <span aria-hidden="true" className={`invisible select-none pointer-events-none ${displayMode}`}>
        {text}
      </span>

      {/* Progressive typewriter overlay */}
      <span aria-hidden="true" className={`absolute inset-0 ${displayMode}`}>
        <span className={className}>{displayedText}</span>
        {showCursor && (
          <span
            className={`inline-block w-[2px] h-[0.95em] ml-[2px] align-[-0.12em] rounded-full animate-cursor-blink ${cursorColorClass}`}
          />
        )}
      </span>
    </span>
  );
});
