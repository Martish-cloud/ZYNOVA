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
      colorStyles = "bg-[#B58A45]/12 text-[#9E7432] border-[#B58A45]/35 shadow-[0_2px_8px_rgba(181,138,69,0.12)]";
      dotColor = "bg-[#B58A45] shadow-[0_0_6px_#b58a45]";
      break;
    case "cyan":
      colorStyles = "bg-sky-50 text-sky-800 border-sky-300 shadow-xs";
      dotColor = "bg-sky-500 shadow-[0_0_6px_#0284c7]";
      break;
    case "purple":
      colorStyles = "bg-purple-50 text-purple-800 border-purple-300 shadow-xs";
      dotColor = "bg-purple-500 shadow-[0_0_6px_#9333ea]";
      break;
    case "emerald":
      colorStyles = "bg-emerald-50 text-emerald-800 border-emerald-300 shadow-xs";
      dotColor = "bg-emerald-500 shadow-[0_0_6px_#059669]";
      break;
    case "neutral":
      colorStyles = "bg-stone-100 text-[#292720] border-[#E5D9C8] shadow-xs";
      dotColor = "bg-[#756C60] shadow-[0_0_6px_#756c60]";
      break;
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border backdrop-blur-md ${colorStyles} ${className}`}
    >
      {dot && (
        <span className={`w-1.5 h-1.5 rounded-full ${dotColor} animate-pulse`} />
      )}
      {children}
    </span>
  );
};
