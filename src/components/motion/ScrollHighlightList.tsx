import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useReducedMotion } from "../../hooks/useReducedMotion";

export interface ScrollHighlightItem {
  id: string | number;
  label: string;
  subtext?: string;
  tag?: string;
}

export interface ScrollHighlightListProps {
  items: ScrollHighlightItem[];
  className?: string;
  theme?: "dark" | "light";
}

interface ItemRowProps {
  item: ScrollHighlightItem;
  index: number;
  total: number;
  theme: "dark" | "light";
}

const ItemRow: React.FC<ItemRowProps> = ({ item, theme }) => {
  const itemRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  // Track each item's vertical progress relative to viewport center
  const { scrollYProgress } = useScroll({
    target: itemRef,
    offset: ["start end", "end start"],
  });

  // Highlight peaks when the item is near the middle of the viewport (0.4 to 0.6)
  const opacity = useTransform(scrollYProgress, [0, 0.35, 0.5, 0.65, 1], [0.35, 0.45, 1, 0.45, 0.35]);
  const scale = useTransform(scrollYProgress, [0, 0.35, 0.5, 0.65, 1], [0.98, 0.99, 1.02, 0.99, 0.98]);
  const x = useTransform(scrollYProgress, [0, 0.35, 0.5, 0.65, 1], [-8, -4, 4, -4, -8]);
  const bulletScale = useTransform(scrollYProgress, [0.35, 0.5, 0.65], [1, 1.4, 1]);

  const isDark = theme === "dark";

  if (prefersReducedMotion) {
    return (
      <div
        ref={itemRef}
        className={`py-4 px-5 rounded-2xl border transition-colors ${
          isDark
            ? "border-white/10 bg-white/[0.03] text-[#FAF7F0]"
            : "border-[#E5D9C8] bg-white/70 text-[#292720]"
        }`}
      >
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-[#B58A45]" />
          <h4 className="text-base sm:text-lg font-bold font-heading">{item.label}</h4>
        </div>
        {item.subtext && (
          <p className={`mt-1.5 text-xs sm:text-sm ${isDark ? "text-[#C5BCB0]" : "text-[#574F44]"}`}>
            {item.subtext}
          </p>
        )}
      </div>
    );
  }

  return (
    <motion.div
      ref={itemRef}
      style={{
        opacity,
        scale,
        x,
      }}
      className={`relative py-4 sm:py-5 px-5 sm:px-6 rounded-2xl border transition-all duration-200 ${
        isDark
          ? "border-white/10 bg-white/[0.04] backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.3)]"
          : "border-[#E5D9C8] bg-white/80 backdrop-blur-md shadow-[0_4px_20px_rgba(41,39,32,0.04)]"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <motion.span
            style={{
              scale: bulletScale,
            }}
            className="w-2.5 h-2.5 rounded-full bg-[#B58A45] shadow-[0_0_10px_rgba(181,138,69,0.8)] shrink-0"
          />
          <h4
            className={`text-sm sm:text-base md:text-lg font-bold font-heading tracking-tight ${
              isDark ? "text-white" : "text-[#292720]"
            }`}
          >
            {item.label}
          </h4>
        </div>

        {item.tag && (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase bg-[#B58A45]/15 text-[#B58A45] border border-[#B58A45]/30">
            {item.tag}
          </span>
        )}
      </div>

      {item.subtext && (
        <p
          className={`mt-2 text-xs sm:text-sm leading-relaxed pl-5.5 ${
            isDark ? "text-[#C5BCB0]" : "text-[#574F44]"
          }`}
        >
          {item.subtext}
        </p>
      )}
    </motion.div>
  );
};

export const ScrollHighlightList: React.FC<ScrollHighlightListProps> = ({
  items,
  className = "",
  theme = "dark",
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  return (
    <div ref={containerRef} className={`space-y-3 sm:space-y-4 ${className}`}>
      {items.map((item, idx) => (
        <ItemRow
          key={item.id}
          item={item}
          index={idx}
          total={items.length}
          theme={theme}
        />
      ))}
    </div>
  );
};

export default ScrollHighlightList;
