import React, { useEffect, useRef, useState } from "react";
import { useCursorState } from "../../context/useCursor";

export const CustomCursor: React.FC = () => {
  const { cursorType, cursorText } = useCursorState();
  
  const [isVisible, setIsVisible] = useState(false);
  const [clickPos, setClickPos] = useState<{ x: number; y: number } | null>(null);

  // Detect touch device or reduced motion directly in state initializer
  const [isTouchDevice] = useState(() => {
    if (typeof window === "undefined") return false;
    return (
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia("(pointer: coarse)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  });

  // Target mouse coordinates
  const mousePos = useRef({ x: -100, y: -100 });
  
  // Interpolated dot coordinates (snappy)
  const dotPos = useRef({ x: -100, y: -100 });
  
  // Interpolated ring coordinates (smooth lag)
  const ringPos = useRef({ x: -100, y: -100 });

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const isVisibleRef = useRef(false);

  useEffect(() => {
    if (isTouchDevice) return;

    let animationFrameId: number | null = null;
    let isRunning = false;

    const render = () => {
      // Smooth lerp physics
      const dotFactor = 0.45;
      const ringFactor = 0.14;

      const dotDx = mousePos.current.x - dotPos.current.x;
      const dotDy = mousePos.current.y - dotPos.current.y;
      const ringDx = mousePos.current.x - ringPos.current.x;
      const ringDy = mousePos.current.y - ringPos.current.y;

      dotPos.current.x += dotDx * dotFactor;
      dotPos.current.y += dotDy * dotFactor;

      ringPos.current.x += ringDx * ringFactor;
      ringPos.current.y += ringDy * ringFactor;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dotPos.current.x}px, ${dotPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      // If motion has settled to sub-pixel accuracy, stop the loop to eliminate idle CPU drain
      if (
        Math.abs(ringDx) < 0.15 &&
        Math.abs(ringDy) < 0.15 &&
        Math.abs(dotDx) < 0.15 &&
        Math.abs(dotDy) < 0.15
      ) {
        isRunning = false;
        animationFrameId = null;
        return;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    const wakeLoop = () => {
      if (!isRunning) {
        isRunning = true;
        animationFrameId = requestAnimationFrame(render);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisibleRef.current) {
        isVisibleRef.current = true;
        setIsVisible(true);
      }
      wakeLoop();
    };

    const handleMouseLeave = () => {
      isVisibleRef.current = false;
      setIsVisible(false);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
      isRunning = false;
    };

    const handleMouseEnter = () => {
      isVisibleRef.current = true;
      setIsVisible(true);
      wakeLoop();
    };

    const handleMouseDown = (e: MouseEvent) => {
      setClickPos({ x: e.clientX, y: e.clientY });
      setTimeout(() => setClickPos(null), 320);
    };

    const handleVisibility = () => {
      if (document.hidden) {
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
          animationFrameId = null;
        }
        isRunning = false;
      } else {
        wakeLoop();
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("visibilitychange", handleVisibility);

    wakeLoop();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("visibilitychange", handleVisibility);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [isTouchDevice]);

  if (isTouchDevice) return null;

  // Determine ring styling and size based on active cursor state (Light Theme)
  let ringClasses = "border border-[#B58A45]/60 bg-[#B58A45]/10";
  let ringSize = "w-9 h-9";
  let showLabel = Boolean(cursorText);

  switch (cursorType) {
    case "project":
    case "image":
      ringSize = "w-20 h-20";
      ringClasses = "border-2 border-[#B58A45] bg-[#FFFDF8]/90 backdrop-blur-md shadow-[0_8px_25px_rgba(181,138,69,0.35)]";
      showLabel = true;
      break;
    case "button":
      ringSize = cursorText ? "w-20 h-20" : "w-14 h-14";
      ringClasses = "border-2 border-[#B58A45] bg-[#FFFDF8]/90 backdrop-blur-md shadow-[0_6px_20px_rgba(181,138,69,0.35)] scale-110";
      break;
    case "link":
      ringSize = cursorText ? "w-18 h-18" : "w-12 h-12";
      ringClasses = "border border-[#B58A45]/80 bg-[#B58A45]/20 backdrop-blur-sm scale-105";
      break;
    case "input":
      ringSize = "w-8 h-8";
      ringClasses = "border border-[#B58A45]/70 bg-transparent";
      break;
    default:
      ringSize = "w-9 h-9";
      ringClasses = "border border-[#B58A45]/60 bg-[#B58A45]/15 backdrop-blur-xs";
  }

  return (
    <div 
      className={`fixed inset-0 pointer-events-none z-99999 transition-opacity duration-300 ${isVisible ? "opacity-100" : "opacity-0"}`}
      aria-hidden="true"
    >
      {/* Center glowing dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-[#B58A45] shadow-[0_0_8px_#B58A45] pointer-events-none will-change-transform z-10"
      />

      {/* Smooth lagging follower ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 rounded-full flex items-center justify-center pointer-events-none will-change-transform transition-[width,height,background-color,border-color] duration-200 ease-out z-0 ${ringSize} ${ringClasses} ${
          clickPos ? "scale-90 opacity-80" : ""
        }`}
      >
        {showLabel && (
          <span className="text-[10px] font-black tracking-widest text-[#292720] uppercase select-none">
            {cursorText || (cursorType === "project" ? "VIEW" : "OPEN")}
          </span>
        )}
      </div>

      {/* Click ripple animation */}
      {clickPos && (
        <div
          style={{
            transform: `translate3d(${clickPos.x}px, ${clickPos.y}px, 0) translate(-50%, -50%)`
          }}
          className="fixed top-0 left-0 w-12 h-12 rounded-full border border-amber-500/60 animate-ping pointer-events-none"
        />
      )}
    </div>
  );
};
