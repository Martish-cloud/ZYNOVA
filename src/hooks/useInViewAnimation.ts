import { useState, useEffect, useRef } from "react";
import { useReducedMotion } from "./useReducedMotion";

interface UseInViewAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  retrigger?: boolean;
}

export function useInViewAnimation<T extends HTMLElement = HTMLDivElement>(
  options: UseInViewAnimationOptions = {}
) {
  const {
    threshold = 0.16,
    rootMargin = "0px 0px -6% 0px",
    retrigger = false
  } = options;

  const ref = useRef<T | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const [isInView, setIsInView] = useState<boolean>(() => prefersReducedMotion);
  const [hasEnteredView, setHasEnteredView] = useState<boolean>(() => prefersReducedMotion);
  const [triggerCount, setTriggerCount] = useState<number>(() => (prefersReducedMotion ? 1 : 0));
  const inViewRef = useRef<boolean>(prefersReducedMotion);

  useEffect(() => {
    if (prefersReducedMotion) {
      inViewRef.current = true;
      setIsInView(true);
      setHasEnteredView(true);
      setTriggerCount((c) => (c === 0 ? 1 : c));
      return;
    }

    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      inViewRef.current = true;
      setIsInView(true);
      setHasEnteredView(true);
      setTriggerCount(1);
      return;
    }

    // Immediate check if element is already within viewport on mount
    const rect = node.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      if (!inViewRef.current) {
        inViewRef.current = true;
        setIsInView(true);
        setHasEnteredView(true);
        setTriggerCount((c) => (c === 0 ? 1 : c));
      }
      if (!retrigger) return;
    }

    let isDisposed = false;
    const enterThreshold = Math.min(Math.max(threshold, 0.05), 0.5);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (isDisposed || !entry) return;

        if (entry.isIntersecting && entry.intersectionRatio >= enterThreshold) {
          if (!inViewRef.current) {
            inViewRef.current = true;
            setIsInView(true);
            setHasEnteredView(true);
            setTriggerCount((prev) => prev + 1);
            if (!retrigger) {
              observer.disconnect();
            }
          }
        } else if (!entry.isIntersecting && entry.intersectionRatio <= 0.01) {
          if (retrigger && inViewRef.current) {
            inViewRef.current = false;
            setIsInView(false);
          }
        }
      },
      {
        threshold: [0, enterThreshold],
        rootMargin
      }
    );

    observer.observe(node);

    return () => {
      isDisposed = true;
      observer.disconnect();
    };
  }, [threshold, rootMargin, retrigger, prefersReducedMotion]);

  return {
    ref,
    isInView: prefersReducedMotion ? true : (hasEnteredView || isInView),
    isDirectlyInViewport: isInView,
    triggerCount: prefersReducedMotion ? 1 : triggerCount,
    prefersReducedMotion
  };
}

