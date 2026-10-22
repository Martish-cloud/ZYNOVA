import React from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { motionConfig } from "../../config/motionConfig";

export interface BlurFadeUpProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  y?: number;
  blur?: number;
  className?: string;
  once?: boolean;
}

export const BlurFadeUp: React.FC<BlurFadeUpProps> = ({
  children,
  delay = 0,
  duration = 0.7,
  y = 30,
  blur = motionConfig.inPanel.headingBlur,
  className = "",
  once = true,
}) => {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{
        opacity: 0,
        filter: `blur(${blur}px)`,
        y,
      }}
      whileInView={{
        opacity: 1,
        filter: "blur(0px)",
        y: 0,
      }}
      viewport={{ once, margin: "-8%" }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`will-change-[transform,opacity,filter] ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default BlurFadeUp;
