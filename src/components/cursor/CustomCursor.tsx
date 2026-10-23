import React, { useEffect, useRef } from "react";

interface TrailPoint {
  x: number;
  y: number;
  time: number;
  isTouch?: boolean;
}

export const CustomCursor: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // Respect user's motion preferences
    if (typeof window === "undefined") return;
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let points: TrailPoint[] = [];
    let animationFrameId: number | null = null;
    let isRunning = false;
    let isTouchActive = false;

    // Device Pixel Ratio scaling for crisp lines on Retina/HiDPI screens
    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });

    // Constants for trail aesthetics
    const DESKTOP_MAX_AGE = 340; // ms
    const TOUCH_MAX_AGE = 260; // ms
    const DESKTOP_MAX_WIDTH = 4.2; // px
    const TOUCH_MAX_WIDTH = 3.6; // px
    const BLUE_COLOR = "#12A9F5"; // Vivid electric blue / cyan

    const render = (currentTime: number) => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      // Filter out points older than their maximum age
      points = points.filter((p) => {
        const maxAge = p.isTouch ? TOUCH_MAX_AGE : DESKTOP_MAX_AGE;
        return currentTime - p.time < maxAge;
      });

      if (points.length > 1) {
        // Draw the smooth curved tapering tail
        for (let i = 0; i < points.length - 1; i++) {
          const p1 = points[i];
          const p2 = points[i + 1];

          // Compute age progress for interpolation (1.0 = newest, 0.0 = oldest)
          const maxAge = p2.isTouch ? TOUCH_MAX_AGE : DESKTOP_MAX_AGE;
          const age = currentTime - p2.time;
          const ageFactor = Math.max(0, 1 - age / maxAge);

          // Position ratio along the trail (0 at tail, 1 at head)
          const trailRatio = (i + 1) / points.length;
          const progress = trailRatio * ageFactor;

          const width = Math.max(0.6, (p2.isTouch ? TOUCH_MAX_WIDTH : DESKTOP_MAX_WIDTH) * progress);
          const alpha = Math.min(0.9, 0.95 * progress);

          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);

          // Use quadratic curve through midpoint for organic curvature
          if (i < points.length - 2) {
            const p3 = points[i + 2];
            const midX = (p2.x + p3.x) / 2;
            const midY = (p2.y + p3.y) / 2;
            ctx.quadraticCurveTo(p2.x, p2.y, midX, midY);
          } else {
            ctx.lineTo(p2.x, p2.y);
          }

          ctx.strokeStyle = `rgba(18, 169, 245, ${alpha.toFixed(3)})`;
          ctx.lineWidth = width;
          ctx.lineCap = "round";
          ctx.lineJoin = "round";
          ctx.shadowColor = BLUE_COLOR;
          ctx.shadowBlur = p2.isTouch ? 4 : 6;
          ctx.stroke();
        }

        // Draw a subtle soft tip at the current head position for touch or active drag
        const head = points[points.length - 1];
        if (head && (head.isTouch || isTouchActive)) {
          const tipAge = currentTime - head.time;
          const tipAlpha = Math.max(0, (1 - tipAge / (head.isTouch ? TOUCH_MAX_AGE : DESKTOP_MAX_AGE)) * 0.85);
          if (tipAlpha > 0.05) {
            ctx.beginPath();
            ctx.arc(head.x, head.y, 2.5, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(18, 169, 245, ${tipAlpha.toFixed(3)})`;
            ctx.shadowColor = BLUE_COLOR;
            ctx.shadowBlur = 6;
            ctx.fill();
          }
        }
      }

      // If trail has completely faded and no touch is currently active, halt RAF loop to save 100% idle CPU
      if (points.length === 0 && !isTouchActive) {
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

    const addPoint = (x: number, y: number, isTouch = false) => {
      const now = performance.now();
      const lastPoint = points[points.length - 1];

      // Avoid duplicate points at identical coordinates
      if (lastPoint) {
        const dx = x - lastPoint.x;
        const dy = y - lastPoint.y;
        if (dx * dx + dy * dy < 4) {
          // Update timestamp of last point if pointer is holding still
          lastPoint.time = now;
          wakeLoop();
          return;
        }
      }

      // Limit max points for memory & performance efficiency
      const maxPoints = isTouch ? 14 : 22;
      if (points.length >= maxPoints) {
        points.shift();
      }

      points.push({ x, y, time: now, isTouch });
      wakeLoop();
    };

    // --- Desktop / Mouse Events ---
    const handleMouseMove = (e: MouseEvent) => {
      // Ignore simulated mouse events from touch to avoid duplicate trails
      if (isTouchActive) return;
      addPoint(e.clientX, e.clientY, false);
    };

    const handleMouseLeave = () => {
      // Fade out naturally
    };

    // --- Mobile / Touchscreen Events (Strictly passive to guarantee fluid native scrolling) ---
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        isTouchActive = true;
        const touch = e.touches[0];
        addPoint(touch.clientX, touch.clientY, true);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        isTouchActive = true;
        const touch = e.touches[0];
        addPoint(touch.clientX, touch.clientY, true);
      }
    };

    const handleTouchEnd = () => {
      isTouchActive = false;
      // Loop continues rendering until remaining points fade out naturally
    };

    // Pause animation when tab is hidden to save energy
    const handleVisibility = () => {
      if (document.hidden) {
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
          animationFrameId = null;
        }
        isRunning = false;
        points = [];
      }
    };

    // Passive listeners throughout the entire document
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    window.addEventListener("touchcancel", handleTouchEnd, { passive: true });
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("touchcancel", handleTouchEnd);
      document.removeEventListener("visibilitychange", handleVisibility);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[99999] select-none"
      aria-hidden="true"
    />
  );
};
