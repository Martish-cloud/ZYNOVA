import React, { useState, useEffect, useRef } from "react";
import { useReducedMotion } from "../../hooks/useReducedMotion";

interface TypewriterHeroHeadlineProps {
  className?: string;
}

const LINE_1 = "BUILD. AUTOMATE.";
const LINE_2 = "SCALE WHAT'S NEXT.";

export const TypewriterHeroHeadline: React.FC<TypewriterHeroHeadlineProps> = ({ className = "" }) => {
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLHeadingElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [isInView, setIsInView] = useState<boolean>(true);
  const [l1, setL1] = useState<string>(() => (prefersReducedMotion ? LINE_1 : ""));
  const [l2, setL2] = useState<string>(() => (prefersReducedMotion ? LINE_2 : ""));
  const [cursorLine, setCursorLine] = useState<1 | 2>(1);
  const [phase, setPhase] = useState<
    "TYPING_L1" | "TYPING_L2" | "HOLD" | "DEL_L2" | "DEL_L1"
  >("TYPING_L1");

  // Helper to safely clear active timer
  const clearActiveTimer = () => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  // 1. Viewport Intersection Observer (with clean reset on scroll-away)
  useEffect(() => {
    if (prefersReducedMotion) {
      setL1(LINE_1);
      setL2(LINE_2);
      setCursorLine(2);
      return;
    }

    const node = containerRef.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      setIsInView(true);
      return;
    }

    let isDisposed = false;

    // Fail-safe visibility timeout: guarantees headline is visible if observer lags
    const failSafeTimer = setTimeout(() => {
      if (!isDisposed && node) {
        const rect = node.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          setIsInView(true);
        }
      }
    }, 1500);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (isDisposed) return;
        if (entry.isIntersecting) {
          setIsInView(true);
        } else {
          // Scrolled away from Hero: cancel timers and reset for fresh start on return
          setIsInView(false);
          clearActiveTimer();
          setL1("");
          setL2("");
          setCursorLine(1);
          setPhase("TYPING_L1");
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px"
      }
    );

    observer.observe(node);

    return () => {
      isDisposed = true;
      clearTimeout(failSafeTimer);
      clearActiveTimer();
      observer.disconnect();
    };
  }, [prefersReducedMotion]);

  // 2. Typing Lifecycle (runs only when in viewport)
  useEffect(() => {
    if (prefersReducedMotion) {
      setL1(LINE_1);
      setL2(LINE_2);
      setCursorLine(2);
      return;
    }

    if (!isInView) {
      clearActiveTimer();
      return;
    }

    // Tab visibility handling
    if (typeof document !== "undefined" && document.hidden) {
      clearActiveTimer();
      const handleVisible = () => {
        if (!document.hidden) {
          document.removeEventListener("visibilitychange", handleVisible);
          // Restart clean typing cycle on tab refocus
          setPhase("TYPING_L1");
        }
      };
      document.addEventListener("visibilitychange", handleVisible);
      return () => {
        document.removeEventListener("visibilitychange", handleVisible);
        clearActiveTimer();
      };
    }

    clearActiveTimer();

    switch (phase) {
      case "TYPING_L1": {
        setCursorLine(1);
        if (l1.length < LINE_1.length) {
          const nextChar = LINE_1[l1.length];
          const delay = nextChar === "." ? 220 : 70;
          timerRef.current = setTimeout(() => {
            setL1(LINE_1.slice(0, l1.length + 1));
          }, delay);
        } else {
          // Pause briefly at end of line 1 before starting line 2
          timerRef.current = setTimeout(() => {
            setPhase("TYPING_L2");
          }, 360);
        }
        break;
      }

      case "TYPING_L2": {
        setCursorLine(2);
        if (l2.length < LINE_2.length) {
          const nextChar = LINE_2[l2.length];
          const delay = nextChar === "." ? 260 : 70;
          timerRef.current = setTimeout(() => {
            setL2(LINE_2.slice(0, l2.length + 1));
          }, delay);
        } else {
          // Both lines are fully typed! Hold for reading
          timerRef.current = setTimeout(() => {
            setPhase("HOLD");
          }, 100);
        }
        break;
      }

      case "HOLD": {
        setCursorLine(2);
        // Display the completed grand statement for 3.8 seconds
        timerRef.current = setTimeout(() => {
          setPhase("DEL_L2");
        }, 3800);
        break;
      }

      case "DEL_L2": {
        setCursorLine(2);
        if (l2.length > 0) {
          timerRef.current = setTimeout(() => {
            setL2(LINE_2.slice(0, l2.length - 1));
          }, 32);
        } else {
          // Pause briefly between deleting line 2 and line 1
          timerRef.current = setTimeout(() => {
            setPhase("DEL_L1");
          }, 180);
        }
        break;
      }

      case "DEL_L1": {
        setCursorLine(1);
        if (l1.length > 0) {
          timerRef.current = setTimeout(() => {
            setL1(LINE_1.slice(0, l1.length - 1));
          }, 32);
        } else {
          // Pause in empty state before starting next typing cycle
          timerRef.current = setTimeout(() => {
            setPhase("TYPING_L1");
          }, 550);
        }
        break;
      }
    }

    return clearActiveTimer;
  }, [isInView, l1, l2, phase, prefersReducedMotion]);

  return (
    <h1
      ref={containerRef}
      className={`text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.7)] max-w-4xl leading-[1.08] mb-4 flex flex-col items-center justify-center min-h-[105px] sm:min-h-[135px] md:min-h-[165px] lg:min-h-[185px] ${className}`}
      aria-label={`${LINE_1} ${LINE_2}`}
    >
      {/* Line 1: BUILD. AUTOMATE. */}
      <span className="inline-flex items-center justify-center min-h-[1.12em] text-white">
        <span>{prefersReducedMotion ? LINE_1 : l1}</span>
        {cursorLine === 1 && !prefersReducedMotion && (
          <span
            className="inline-block ml-1 sm:ml-1.5 w-[3px] sm:w-[4px] md:w-[6px] h-[0.78em] bg-amber-400 align-baseline animate-cursor-blink shadow-[0_0_12px_rgba(245,158,11,0.7)] rounded-[1px]"
            aria-hidden="true"
          />
        )}
      </span>

      {/* Line 2: SCALE WHAT'S NEXT. (Ocean Blue to Electric Sky Blue Effect) */}
      <span className="inline-flex items-center justify-center min-h-[1.12em]">
        <span className="bg-gradient-to-r from-[#7DD3FC] via-[#38BDF8] to-[#3B82F6] bg-clip-text text-transparent">
          {prefersReducedMotion ? LINE_2 : l2}
        </span>
        {cursorLine === 2 && !prefersReducedMotion && (
          <span
            className="inline-block ml-1 sm:ml-1.5 w-[3px] sm:w-[4px] md:w-[6px] h-[0.78em] bg-[#38BDF8] align-baseline animate-cursor-blink shadow-[0_0_12px_rgba(56,189,248,0.7)] rounded-[1px]"
            aria-hidden="true"
          />
        )}
      </span>
    </h1>
  );
};
