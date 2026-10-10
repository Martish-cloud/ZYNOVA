import React, { useRef } from "react";
import { useCursor } from "../../context/useCursor";

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "gold";
  pullStrength?: number;
  asAnchor?: boolean;
  href?: string;
  target?: string;
  rel?: string;
  cursorLabel?: string;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className = "",
  variant = "primary",
  pullStrength = 0.25,
  asAnchor = false,
  href,
  target,
  rel,
  cursorLabel = "CLICK",
  onClick,
  ...rest
}) => {
  const { setCursor, resetCursor } = useCursor();
  const buttonRef = useRef<HTMLDivElement>(null);
  const rectRef = useRef<{ left: number; top: number; width: number; height: number } | null>(null);
  const rafId = useRef<number | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!buttonRef.current) return;
    let rect = rectRef.current;
    if (!rect) {
      const r = buttonRef.current.getBoundingClientRect();
      rect = { left: r.left, top: r.top, width: r.width, height: r.height };
      rectRef.current = rect;
    }
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (e.clientX - centerX) * pullStrength;
    const deltaY = (e.clientY - centerY) * pullStrength;

    if (rafId.current) cancelAnimationFrame(rafId.current);
    rafId.current = requestAnimationFrame(() => {
      if (buttonRef.current) {
        buttonRef.current.style.transition = "none";
        buttonRef.current.style.transform = `translate3d(${deltaX}px, ${deltaY}px, 0)`;
      }
    });
  };

  const handleMouseEnter = () => {
    if (buttonRef.current) {
      const r = buttonRef.current.getBoundingClientRect();
      rectRef.current = { left: r.left, top: r.top, width: r.width, height: r.height };
    }
    setCursor("button", cursorLabel);
  };

  const handleMouseLeave = () => {
    rectRef.current = null;
    if (rafId.current) cancelAnimationFrame(rafId.current);
    if (buttonRef.current) {
      buttonRef.current.style.transition = "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)";
      buttonRef.current.style.transform = "translate3d(0px, 0px, 0)";
    }
    resetCursor();
  };

  let variantStyles = "";
  switch (variant) {
    case "primary":
      variantStyles = "bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 text-slate-950 font-bold shadow-[0_4px_20px_rgba(245,158,11,0.35)] hover:shadow-[0_6px_30px_rgba(245,158,11,0.5)] border border-amber-300/80 hover:brightness-105";
      break;
    case "gold":
      variantStyles = "bg-gradient-to-r from-[#F4E4BC] via-[#D4AF37] to-[#B89228] text-slate-950 font-bold shadow-[0_4px_24px_rgba(212,175,55,0.35)] hover:shadow-[0_6px_34px_rgba(212,175,55,0.55)] border border-amber-300/70 hover:brightness-105";
      break;
    case "secondary":
      variantStyles = "liquid-glass-card hover:bg-white/[0.24] text-white hover:text-amber-300 border border-white/30 hover:border-amber-400/60 shadow-[0_6px_20px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.35)]";
      break;
    case "outline":
      variantStyles = "liquid-glass-card text-amber-300 border border-amber-400/50 hover:bg-amber-400/20 hover:border-amber-300 shadow-[0_4px_14px_rgba(245,158,11,0.25)]";
      break;
    case "ghost":
      variantStyles = "bg-transparent text-slate-200 hover:text-amber-300 hover:bg-white/[0.12]";
      break;
  }

  const baseClasses = `inline-flex items-center justify-center gap-2 px-4.5 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-colors duration-200 cursor-pointer ${variantStyles} ${className}`;

  return (
    <div
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="inline-block will-change-transform"
    >
      {asAnchor && href ? (
        <a
          href={href}
          target={target}
          rel={rel}
          className={baseClasses}
          onClick={onClick as unknown as React.MouseEventHandler<HTMLAnchorElement>}
          {...(rest as unknown as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {children}
        </a>
      ) : (
        <button className={baseClasses} onClick={onClick} {...rest}>
          {children}
        </button>
      )}
    </div>
  );
};
