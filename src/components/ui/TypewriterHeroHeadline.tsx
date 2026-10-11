import React, { useState, useEffect, useRef } from "react";
import { useReducedMotion } from "../../hooks/useReducedMotion";

interface TypewriterHeroHeadlineProps {
  className?: string;
}

const LINE_1 = "BUILD. AUTOMATE.";
const ROTATING_PHRASES = [
  "SCALE WHAT'S NEXT.",
  "EMPOWER BUSINESS GROWTH.",
  "BUILD DIGITAL SOLUTIONS."
];

export const TypewriterHeroHeadline: React.FC<TypewriterHeroHeadlineProps> = ({ className = "" }) => {
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLHeadingElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [phraseIndex, setPhraseIndex] = useState<number>(0);
  const currentPhrase = ROTATING_PHRASES[phraseIndex];

  // LINE_1 is always visible immediately — no blank flashes!
  const [l2, setL2] = useState<string>(() => (prefersReducedMotion ? ROTATING_PHRASES[0] : ""));
  const [phase, setPhase] = useState<"TYPING" | "HOLD" | "DELETING">("TYPING");

  // Clear timer safely
  const clearActiveTimer = () => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  useEffect(() => {
    if (prefersReducedMotion) return;

    clearActiveTimer();

    switch (phase) {
      case "TYPING": {
        if (l2.length < currentPhrase.length) {
          const nextChar = currentPhrase[l2.length];
          const delay = nextChar === "." ? 200 : 55;
          timerRef.current = setTimeout(() => {
            setL2(currentPhrase.slice(0, l2.length + 1));
          }, delay);
        } else {
          timerRef.current = setTimeout(() => {
            setPhase("HOLD");
          }, 120);
        }
        break;
      }

      case "HOLD": {
        // Display full phrase for 4 seconds
        timerRef.current = setTimeout(() => {
          setPhase("DELETING");
        }, 4000);
        break;
      }

      case "DELETING": {
        if (l2.length > 0) {
          timerRef.current = setTimeout(() => {
            setL2(currentPhrase.slice(0, l2.length - 1));
          }, 24);
        } else {
          setPhraseIndex((prev) => (prev + 1) % ROTATING_PHRASES.length);
          timerRef.current = setTimeout(() => {
            setPhase("TYPING");
          }, 300);
        }
        break;
      }
    }

    return clearActiveTimer;
  }, [l2, phase, currentPhrase, prefersReducedMotion]);

  return (
    <h1
      ref={containerRef}
      className={`text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.7)] max-w-4xl leading-[1.08] mb-4 flex flex-col items-center justify-center min-h-[105px] sm:min-h-[135px] md:min-h-[165px] lg:min-h-[185px] ${className}`}
      aria-label={`${LINE_1} ${ROTATING_PHRASES[0]}`}
    >
      {/* Line 1: BUILD. AUTOMATE. (Permanent, bold, zero blink) */}
      <span className="inline-flex items-center justify-center min-h-[1.12em] text-white">
        <span>{LINE_1}</span>
      </span>

      {/* Line 2: Rotating Phrase (Ocean Blue to Electric Sky Blue Effect) */}
      <span className="inline-flex items-center justify-center min-h-[1.12em]">
        <span className="bg-gradient-to-r from-[#7DD3FC] via-[#38BDF8] to-[#3B82F6] bg-clip-text text-transparent">
          {prefersReducedMotion ? ROTATING_PHRASES[0] : l2}
        </span>
        {!prefersReducedMotion && (
          <span
            className="inline-block ml-1 sm:ml-1.5 w-[3px] sm:w-[4px] md:w-[6px] h-[0.78em] bg-[#38BDF8] align-baseline animate-cursor-blink shadow-[0_0_12px_rgba(56,189,248,0.7)] rounded-[1px]"
            aria-hidden="true"
          />
        )}
      </span>
    </h1>
  );
};
