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
  const [isTall, setIsTall] = useState<boolean>(false);
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
        setIsTall(false);
        return;
      }
      const vh = window.innerHeight;
      const h = panelRef.current.offsetHeight;
      if (h > vh * 1.15) {
        setStickyTop(-(h - vh));
        setIsTall(true);
      } else {
        setStickyTop(0);
        setIsTall(false);
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
  }, [panelRef, isFirst]);

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

  // Section-aware reading plateau:
  // For standard sections, hold 100% opacity, 0px blur, and 1.0 scale until next panel covers 45%.
  // For tall sections (where user just reached the bottom text), hold full clarity until 60%.
  // This guarantees visitors can read all text comfortably without premature dimming or blurring.
  const scale = useTransform(scrollYProgress, (v) => {
    if (isLast || prefersReducedMotion) return 1;
    const fadeStart = isTall ? 0.60 : 0.45;
    if (v <= fadeStart) return 1;
    const t = (v - fadeStart) / (1 - fadeStart);
    return 1 - t * (1 - targetScale);
  });

  const rotateX = useTransform(scrollYProgress, (v) => {
    if (isLast || prefersReducedMotion) return 0;
    const fadeStart = isTall ? 0.60 : 0.45;
    if (v <= fadeStart) return 0;
    const t = (v - fadeStart) / (1 - fadeStart);
    return t * targetRotateX;
  });

  const blurVal = useTransform(scrollYProgress, (v) => {
    if (isLast || prefersReducedMotion) return 0;
    const fadeStart = isTall ? 0.60 : 0.45;
    if (v <= fadeStart) return 0;
    const t = (v - fadeStart) / (1 - fadeStart);
    return t * targetBlur;
  });

  const filter = useTransform(blurVal, (b) => (b > 0.2 ? `blur(${b.toFixed(1)}px)` : "none"));

  const opacity = useTransform(scrollYProgress, (v) => {
    if (isLast || prefersReducedMotion) return 1;
    const fadeStart = isTall ? 0.60 : 0.45;
    if (v <= fadeStart) return 1;
    const t = (v - fadeStart) / (1 - fadeStart);
    return 1 - t * (1 - targetOpacity);
  });

  const borderRadius = useTransform(scrollYProgress, (v) => {
    if (isLast || prefersReducedMotion) return "0px";
    const fadeStart = isTall ? 0.60 : 0.45;
    if (v <= fadeStart) return "0px";
    const t = (v - fadeStart) / (1 - fadeStart);
    return `${Math.round(t * targetRadius)}px`;
  });

  // Apply willChange only while actively undergoing the stack transition
  const willChange = useTransform<number, string>(scrollYProgress, (v: number): string => {
    if (isLast || prefersReducedMotion) return "auto";
    const fadeStart = isTall ? 0.60 : 0.45;
    return v > fadeStart && v < 0.99 ? "transform, opacity, filter" : "auto";
  });

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
