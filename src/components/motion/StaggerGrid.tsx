import React from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { motionConfig } from "../../config/motionConfig";

export interface StaggerGridProps {
  children: React.ReactNode;
  stagger?: number;
  initialDelay?: number;
  className?: string;
  itemClassName?: string;
  once?: boolean;
}

export const StaggerGrid: React.FC<StaggerGridProps> = ({
  children,
  stagger = motionConfig.inPanel.cardStaggerDelay,
  initialDelay = 0.1,
  className = "",
  itemClassName = "",
  once = true,
}) => {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: initialDelay,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: motionConfig.inPanel.cardRiseDistance,
      scale: motionConfig.inPanel.cardInitialScale,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-5%" }}
      className={className}
    >
      {React.Children.map(children, (child, idx) => {
        if (!React.isValidElement(child)) return child;
        return (
          <motion.div
            key={child.key || idx}
            variants={itemVariants}
            className={`will-change-[transform,opacity] ${itemClassName}`}
          >
            {child}
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default StaggerGrid;
