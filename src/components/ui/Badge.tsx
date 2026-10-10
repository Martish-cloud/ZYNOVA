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
      colorStyles = "bg-amber-400/[0.16] text-amber-300 border-amber-400/40 shadow-[0_4px_16px_rgba(245,158,11,0.18),inset_0_1px_0_rgba(255,255,255,0.45)]";
      dotColor = "bg-amber-400 shadow-[0_0_8px_#f59e0b]";
      break;
    case "cyan":
      colorStyles = "bg-cyan-400/[0.16] text-cyan-200 border-cyan-400/40 shadow-[0_4px_16px_rgba(6,182,212,0.18),inset_0_1px_0_rgba(255,255,255,0.45)]";
      dotColor = "bg-cyan-300 shadow-[0_0_8px_#06b6d4]";
      break;
    case "purple":
      colorStyles = "bg-purple-400/[0.16] text-purple-200 border-purple-400/40 shadow-[0_4px_16px_rgba(168,85,247,0.18),inset_0_1px_0_rgba(255,255,255,0.45)]";
      dotColor = "bg-purple-300 shadow-[0_0_8px_#c084fc]";
      break;
    case "emerald":
      colorStyles = "bg-emerald-400/[0.16] text-emerald-200 border-emerald-400/40 shadow-[0_4px_16px_rgba(16,185,129,0.18),inset_0_1px_0_rgba(255,255,255,0.45)]";
      dotColor = "bg-emerald-300 shadow-[0_0_8px_#34d399]";
      break;
    case "neutral":
      colorStyles = "bg-white/[0.16] text-slate-100 border-white/30 shadow-[0_4px_14px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.45)]";
      dotColor = "bg-slate-300 shadow-[0_0_8px_#cbd5e1]";
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
