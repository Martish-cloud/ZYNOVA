import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useReducedMotion } from "../../hooks/useReducedMotion";

export interface ParallaxLayerProps {
  children: React.ReactNode;
  speed?: number; // e.g. 0.2 moves down slower, -0.2 moves up faster
  rotate?: number; // static or slight tilt
  className?: string;
  offset?: number; // px range
}

export const ParallaxLayer: React.FC<ParallaxLayerProps> = ({
  children,
  speed = 0.15,
  rotate = 0,
  className = "",
  offset = 50,
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const range = offset * speed;
  const y = useTransform(scrollYProgress, [0, 1], [-range, range]);

  if (prefersReducedMotion || speed === 0) {
    return (
      <div
        className={className}
        style={rotate !== 0 ? { transform: `rotate(${rotate}deg)` } : undefined}
      >
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      style={{
        y,
        rotate: rotate !== 0 ? rotate : undefined,
      }}
      className={`will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default ParallaxLayer;
