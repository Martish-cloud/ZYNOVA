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
      colorStyles = "bg-amber-50/72 text-amber-900 border-amber-400/60 shadow-[0_4px_14px_rgba(245,158,11,0.14),inset_0_1px_0_rgba(255,255,255,0.8)]";
      dotColor = "bg-amber-500 shadow-[0_0_6px_#f59e0b]";
      break;
    case "cyan":
      colorStyles = "bg-cyan-50/72 text-cyan-900 border-cyan-400/60 shadow-[0_4px_14px_rgba(6,182,212,0.12),inset_0_1px_0_rgba(255,255,255,0.8)]";
      dotColor = "bg-cyan-500";
      break;
    case "purple":
      colorStyles = "bg-purple-50/72 text-purple-900 border-purple-400/60 shadow-[0_4px_14px_rgba(168,85,247,0.12),inset_0_1px_0_rgba(255,255,255,0.8)]";
      dotColor = "bg-purple-500";
      break;
    case "emerald":
      colorStyles = "bg-emerald-50/72 text-emerald-900 border-emerald-400/60 shadow-[0_4px_14px_rgba(16,185,129,0.12),inset_0_1px_0_rgba(255,255,255,0.8)]";
      dotColor = "bg-emerald-500";
      break;
    case "neutral":
      colorStyles = "bg-white/62 text-slate-800 border-white/70 shadow-[0_4px_12px_rgba(15,23,42,0.06),inset_0_1px_0_rgba(255,255,255,0.82)]";
      dotColor = "bg-slate-600";
      break;
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border backdrop-blur-md saturate-150 ${colorStyles} ${className}`}
    >
      {dot && (
        <span className={`w-1.5 h-1.5 rounded-full ${dotColor} animate-pulse`} />
      )}
      {children}
    </span>
  );
};
