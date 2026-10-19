import React, { useState, useEffect, useRef } from "react";
import { useReducedMotion } from "../../hooks/useReducedMotion";

interface TypewriterHeroHeadlineProps {
  className?: string;
  align?: "left" | "center";
}

const LINE_1 = "BUILD. AUTOMATE.";
const ROTATING_PHRASES = [
  "SCALE WHAT'S NEXT.",
  "EMPOWER BUSINESS GROWTH.",
  "BUILD DIGITAL SOLUTIONS."
];

export const TypewriterHeroHeadline: React.FC<TypewriterHeroHeadlineProps> = ({
  className = "",
  align = "center"
}) => {
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLHeadingElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [phraseIndex, setPhraseIndex] = useState<number>(0);
  const currentPhrase = ROTATING_PHRASES[phraseIndex];

  // LINE_1 is always visible immediately — zero flicker
  const [l2, setL2] = useState<string>(() => (prefersReducedMotion ? ROTATING_PHRASES[0] : ""));
  const [phase, setPhase] = useState<"TYPING" | "HOLD" | "DELETING">("TYPING");

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

  const isLeft = align === "left";

  return (
    <h1
      ref={containerRef}
      className={`text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-black tracking-tight text-[#292720] max-w-4xl leading-[1.08] mb-4 flex flex-col ${
        isLeft ? "items-start justify-start text-left" : "items-center justify-center text-center"
      } min-h-[90px] sm:min-h-[115px] md:min-h-[135px] lg:min-h-[145px] ${className}`}
      aria-label={`${LINE_1} ${ROTATING_PHRASES[0]}`}
    >
      {/* Line 1: BUILD. AUTOMATE. */}
      <span className={`inline-flex items-center ${isLeft ? "justify-start" : "justify-center"} min-h-[1.12em] text-[#292720]`}>
        <span>{LINE_1}</span>
      </span>

      {/* Line 2: Rotating Phrase */}
      <span className={`inline-flex items-center ${isLeft ? "justify-start" : "justify-center"} min-h-[1.12em]`}>
        <span className="bg-gradient-to-r from-[#B58A45] via-[#C99E56] to-[#9E7432] bg-clip-text text-transparent">
          {prefersReducedMotion ? ROTATING_PHRASES[0] : l2}
        </span>
        {!prefersReducedMotion && (
          <span
            className="inline-block ml-1 sm:ml-1.5 w-[3px] sm:w-[4px] md:w-[6px] h-[0.78em] bg-[#B58A45] align-baseline animate-cursor-blink shadow-[0_0_8px_rgba(181,138,69,0.5)] rounded-[1px]"
            aria-hidden="true"
          />
        )}
      </span>
    </h1>
  );
};
