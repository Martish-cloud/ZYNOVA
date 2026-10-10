import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "cyan" | "purple" | "emerald" | "neutral" | "gold";
  className?: string;
  dot?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "gold",
  className = "",
  dot = true
}) => {
  let colorStyles = "";
  let dotColor = "";

  switch (variant) {
    case "gold":
      colorStyles = "bg-amber-50/90 text-amber-800 border-amber-400/50 shadow-[0_2px_12px_rgba(245,158,11,0.12)]";
      dotColor = "bg-amber-500 shadow-[0_0_6px_#f59e0b]";
      break;
    case "cyan":
      colorStyles = "bg-cyan-50/90 text-cyan-800 border-cyan-400/50 shadow-[0_2px_12px_rgba(6,182,212,0.1)]";
      dotColor = "bg-cyan-500";
      break;
    case "purple":
      colorStyles = "bg-purple-50/90 text-purple-800 border-purple-400/50 shadow-[0_2px_12px_rgba(168,85,247,0.1)]";
      dotColor = "bg-purple-500";
      break;
    case "emerald":
      colorStyles = "bg-emerald-50/90 text-emerald-800 border-emerald-400/50 shadow-[0_2px_12px_rgba(16,185,129,0.1)]";
      dotColor = "bg-emerald-500";
      break;
    case "neutral":
      colorStyles = "bg-white/90 text-slate-700 border-slate-300/80 shadow-sm";
      dotColor = "bg-slate-500";
      break;
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border backdrop-blur-md ${colorStyles} ${className}`}
    >
      {dot && (
        <span className={`w-1.5 h-1.5 rounded-full ${dotColor} animate-pulse`} />
      )}
      {children}
    </span>
  );
};
