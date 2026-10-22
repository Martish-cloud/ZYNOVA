import { useState, useLayoutEffect, useEffect } from "react";
import { useScroll, useTransform, MotionValue } from "framer-motion";
import { motionConfig } from "../config/motionConfig";
import { useReducedMotion } from "./useReducedMotion";

export interface StackMotionValues {
  stickyTop: number;
  scale: MotionValue<number>;
  rotateX: MotionValue<number>;
  filter: MotionValue<string>;
  opacity: MotionValue<number>;
  borderRadius: MotionValue<string>;
  willChange: MotionValue<string>;
  isLastPanel: boolean;
  prefersReducedMotion: boolean;
}

export function useStackProgress(
  panelRef: React.RefObject<HTMLElement | null>,
  nextPanelRef?: React.RefObject<HTMLElement | null> | null,
  isFirst: boolean = false
): StackMotionValues {
  const prefersReducedMotion = useReducedMotion();
  const [stickyTop, setStickyTop] = useState<number>(0);
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.innerWidth < 768;
  });

  // Keep mobile flag up-to-date
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Calculate sticky top: 0 if first panel (Hero), else -(panelHeight - 100vh) if taller than viewport
  useLayoutEffect(() => {
    const updateStickyTop = () => {
      if (!panelRef.current) return;
      if (isFirst) {
        setStickyTop(0);
        return;
      }
      const vh = window.innerHeight;
      const h = panelRef.current.offsetHeight;
      if (h > vh) {
        setStickyTop(-(h - vh));
      } else {
        setStickyTop(0);
      }
    };

    updateStickyTop();
    const observer = new ResizeObserver(updateStickyTop);
    if (panelRef.current) {
      observer.observe(panelRef.current);
    }
    window.addEventListener("resize", updateStickyTop);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateStickyTop);
    };
  }, [panelRef]);

  // Hook to track the next panel's entry into the viewport
  const { scrollYProgress } = useScroll({
    target: nextPanelRef || undefined,
    offset: ["start end", "start start"],
  });

  const cfg = isMobile ? motionConfig.stack.mobile : motionConfig.stack;

  // Reduced motion: fall back to identity transforms
  const targetScale = prefersReducedMotion ? 1 : cfg.scaleTarget;
  const targetRotateX = prefersReducedMotion ? 0 : cfg.rotateXTarget;
  const targetBlur = prefersReducedMotion ? 0 : cfg.blurTarget;
  const targetOpacity = prefersReducedMotion ? 1 : cfg.opacityTarget;
  const targetRadius = prefersReducedMotion ? 0 : cfg.borderRadiusTarget;

  const isLast = !nextPanelRef;

  // When next panel is rising: scrollYProgress goes 0 -> 1
  const scale = useTransform(scrollYProgress, [0, 1], [1, isLast ? 1 : targetScale]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [0, isLast ? 0 : targetRotateX]);
  const blurVal = useTransform(scrollYProgress, [0, 1], [0, isLast ? 0 : targetBlur]);
  const filter = useTransform(blurVal, (b) => (b > 0.1 ? `blur(${b}px)` : "none"));
  const opacity = useTransform(scrollYProgress, [0, 1], [1, isLast ? 1 : targetOpacity]);
  const borderRadius = useTransform(
    scrollYProgress,
    [0, 1],
    ["0px", `${isLast ? 0 : targetRadius}px`]
  );

  // Apply willChange only while in transition
  const willChange = useTransform<number, string>(scrollYProgress, (v: number): string =>
    !isLast && v > 0.01 && v < 0.99 ? "transform, opacity, filter" : "auto"
  );

  return {
    stickyTop,
    scale,
    rotateX,
    filter,
    opacity,
    borderRadius,
    willChange,
    isLastPanel: isLast,
    prefersReducedMotion,
  };
}
