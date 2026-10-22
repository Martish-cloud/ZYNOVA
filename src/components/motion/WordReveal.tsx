import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { motionConfig } from "../../config/motionConfig";

export interface WordRevealProps {
  text: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
  className?: string;
  wordClassName?: string;
  highlightWords?: string[];
  highlightClassName?: string;
  stagger?: number;
  initialDelay?: number;
  once?: boolean;
}

export const WordReveal: React.FC<WordRevealProps> = ({
  text,
  as: Component = "h1",
  className = "",
  wordClassName = "",
  highlightWords = [],
  highlightClassName = "bg-gradient-to-r from-[#B58A45] via-[#C99E56] to-[#9E7432] bg-clip-text text-transparent",
  stagger = motionConfig.hero.wordStagger,
  initialDelay = 0.1,
  once = true,
}) => {
  const prefersReducedMotion = useReducedMotion();

  const words = useMemo(() => text.trim().split(/\s+/), [text]);

  // Clean words for comparison with highlight list
  const cleanHighlightSet = useMemo(() => {
    return new Set(
      highlightWords.map((w) => w.toLowerCase().replace(/[^a-z0-9]/g, ""))
    );
  }, [highlightWords]);

  if (prefersReducedMotion) {
    return (
      <Component className={className}>
        {words.map((word, i) => {
          const clean = word.toLowerCase().replace(/[^a-z0-9]/g, "");
          const isHighlight = cleanHighlightSet.has(clean);
          return (
            <span
              key={i}
              className={`${wordClassName} ${isHighlight ? highlightClassName : ""}`}
            >
              {word}{" "}
            </span>
          );
        })}
      </Component>
    );
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

  const wordVariants = {
    hidden: {
      opacity: motionConfig.hero.wordInitialOpacity,
      filter: `blur(${motionConfig.hero.wordInitialBlur}px)`,
      y: 12,
      scale: 0.98,
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      scale: 1,
      transition: {
        duration: 0.65,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-10%" }}
      className={`inline-block ${className}`}
    >
      <Component className="inline">
        {words.map((word, i) => {
          const clean = word.toLowerCase().replace(/[^a-z0-9]/g, "");
          const isHighlight = cleanHighlightSet.has(clean);

          return (
            <motion.span
              key={`${word}-${i}`}
              variants={wordVariants}
              className={`inline-block mr-[0.25em] will-change-[transform,opacity,filter] ${wordClassName} ${
                isHighlight ? highlightClassName : ""
              }`}
            >
              {word}
            </motion.span>
          );
        })}
      </Component>
    </motion.div>
  );
};

export default WordReveal;
