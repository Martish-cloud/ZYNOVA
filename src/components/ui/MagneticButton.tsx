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
    case "gold":
      variantStyles = "bg-gradient-to-r from-[#C99E56] via-[#B58A45] to-[#9E7432] text-white font-bold shadow-[0_4px_16px_rgba(181,138,69,0.25)] hover:shadow-[0_6px_24px_rgba(181,138,69,0.35)] border border-[#B58A45] hover:brightness-105";
      break;
    case "secondary":
      variantStyles = "bg-white hover:bg-[#FAF7F0] text-[#292720] hover:text-[#B58A45] border border-[#E5D9C8] hover:border-[#B58A45]/60 shadow-[0_4px_14px_rgba(41,39,32,0.06)]";
      break;
    case "outline":
      variantStyles = "bg-white/80 text-[#9E7432] border border-[#B58A45]/60 hover:bg-[#B58A45]/10 hover:border-[#B58A45] shadow-xs";
      break;
    case "ghost":
      variantStyles = "bg-transparent text-[#574F44] hover:text-[#B58A45] hover:bg-[#F0E4D2]/40";
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
