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

    // Device Pixel Ratio & exact bounding rect scaling for pixel-perfect coordinates
    const handleResize = () => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const displayWidth = Math.round(rect.width * dpr);
      const displayHeight = Math.round(rect.height * dpr);

      if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
        canvas.width = displayWidth;
        canvas.height = displayHeight;
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });

    // Constants for trail aesthetics (strictly preserved)
    const DESKTOP_MAX_AGE = 340; // ms
    const TOUCH_MAX_AGE = 260; // ms
    const DESKTOP_MAX_WIDTH = 4.2; // px
    const TOUCH_MAX_WIDTH = 3.6; // px
    const BLUE_COLOR = "#12A9F5"; // Vivid electric blue / cyan

    // Map screen pointer coordinates directly into canvas space
    const getCoordinates = (clientX: number, clientY: number) => {
      if (!canvas) return { x: clientX, y: clientY };
      const rect = canvas.getBoundingClientRect();
      return {
        x: clientX - rect.left,
        y: clientY - rect.top,
      };
    };

    const render = (currentTime: number) => {
      // Clear entire physical buffer cleanly regardless of transform
      ctx.save();
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.restore();

      // Filter out points older than maximum lifespan
      points = points.filter((p) => {
        const maxAge = p.isTouch ? TOUCH_MAX_AGE : DESKTOP_MAX_AGE;
        return currentTime - p.time < maxAge;
      });

      const len = points.length;

      if (len > 1) {
        if (len === 2) {
          // Exactly two points: direct crisp segment
          const p0 = points[0];
          const p1 = points[1];
          const maxAge = p1.isTouch ? TOUCH_MAX_AGE : DESKTOP_MAX_AGE;
          const age = currentTime - p1.time;
          const progress = Math.max(0, 1 - age / maxAge);
          const width = Math.max(0.6, (p1.isTouch ? TOUCH_MAX_WIDTH : DESKTOP_MAX_WIDTH) * progress);
          const alpha = Math.min(0.92, 0.95 * progress);

          ctx.beginPath();
          ctx.moveTo(p0.x, p0.y);
          ctx.lineTo(p1.x, p1.y);
          ctx.strokeStyle = `rgba(18, 169, 245, ${alpha.toFixed(3)})`;
          ctx.lineWidth = width;
          ctx.lineCap = "round";
          ctx.lineJoin = "round";
          ctx.shadowColor = BLUE_COLOR;
          ctx.shadowBlur = p1.isTouch ? 4 : 6;
          ctx.stroke();
        } else {
          // Continuous spline rendering using chained midpoints:
          // Every segment i starts EXACTLY where segment i-1 ended, guaranteeing 100% path continuity with zero gaps
          const midpoints: { x: number; y: number }[] = [];
          for (let i = 0; i < len - 1; i++) {
            midpoints.push({
              x: (points[i].x + points[i + 1].x) / 2,
              y: (points[i].y + points[i + 1].y) / 2,
            });
          }

          const numSegments = len - 1;

          for (let i = 0; i < numSegments; i++) {
            const p = points[i + 1];
            const maxAge = p.isTouch ? TOUCH_MAX_AGE : DESKTOP_MAX_AGE;
            const age = currentTime - p.time;
            const ageFactor = Math.max(0, 1 - age / maxAge);
            const trailRatio = (i + 1) / numSegments;
            const progress = trailRatio * ageFactor;

            const width = Math.max(0.6, (p.isTouch ? TOUCH_MAX_WIDTH : DESKTOP_MAX_WIDTH) * progress);
            const alpha = Math.min(0.92, 0.95 * progress);

            ctx.beginPath();

            if (i === 0) {
              // Tail segment: starts from tail endpoint points[0] to first midpoint
              ctx.moveTo(points[0].x, points[0].y);
              ctx.quadraticCurveTo(points[0].x, points[0].y, midpoints[0].x, midpoints[0].y);
            } else if (i === numSegments - 1) {
              // Head segment: starts from previous midpoint and terminates directly at cursor tracking point
              ctx.moveTo(midpoints[i - 1].x, midpoints[i - 1].y);
              ctx.quadraticCurveTo(points[i].x, points[i].y, points[i + 1].x, points[i + 1].y);
            } else {
              // Intermediate segment: starts at midpoints[i - 1] and ends at midpoints[i]
              ctx.moveTo(midpoints[i - 1].x, midpoints[i - 1].y);
              ctx.quadraticCurveTo(points[i].x, points[i].y, midpoints[i].x, midpoints[i].y);
            }

            ctx.strokeStyle = `rgba(18, 169, 245, ${alpha.toFixed(3)})`;
            ctx.lineWidth = width;
            ctx.lineCap = "round";
            ctx.lineJoin = "round";
            ctx.shadowColor = BLUE_COLOR;
            ctx.shadowBlur = p.isTouch ? 4 : 6;
            ctx.stroke();
          }
        }

        // Soft subtle glowing tip for touch or active interaction
        const head = points[points.length - 1];
        if (head && (head.isTouch || isTouchActive)) {
          const tipAge = currentTime - head.time;
          const tipAlpha = Math.max(
            0,
            (1 - tipAge / (head.isTouch ? TOUCH_MAX_AGE : DESKTOP_MAX_AGE)) * 0.85
          );
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

    const addRawPoint = (x: number, y: number, isTouch = false) => {
      const now = performance.now();
      const lastPoint = points[points.length - 1];

      if (lastPoint) {
        const dx = x - lastPoint.x;
        const dy = y - lastPoint.y;
        const distSq = dx * dx + dy * dy;

        // Skip micro-jitter (< 1px)
        if (distSq < 1) {
          lastPoint.time = now;
          wakeLoop();
          return;
        }

        const dist = Math.sqrt(distSq);

        // Distance-aware sampling: interpolate intermediate points during fast pointer movement
        // so that rapid mouse flicks form smooth, unbroken curves without gaps or angular breaks
        if (dist > 6) {
          const steps = Math.min(Math.floor(dist / 6), 6);
          for (let s = 1; s <= steps; s++) {
            const t = s / (steps + 1);
            points.push({
              x: lastPoint.x + dx * t,
              y: lastPoint.y + dy * t,
              time: lastPoint.time + (now - lastPoint.time) * t,
              isTouch,
            });
          }
        }
      }

      // Memory & performance bounds
      const maxPoints = isTouch ? 24 : 45;
      if (points.length >= maxPoints) {
        points.splice(0, points.length - maxPoints + 1);
      }

      points.push({ x, y, time: now, isTouch });
      wakeLoop();
    };

    // --- Desktop / Pointer Events ---
    const handlePointerMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return; // Touch handled by touch events
      if (e.getCoalescedEvents) {
        const events = e.getCoalescedEvents();
        if (events && events.length > 0) {
          for (let i = 0; i < events.length; i++) {
            const ce = events[i];
            const coords = getCoordinates(ce.clientX, ce.clientY);
            addRawPoint(coords.x, coords.y, false);
          }
          return;
        }
      }
      const coords = getCoordinates(e.clientX, e.clientY);
      addRawPoint(coords.x, coords.y, false);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (isTouchActive) return;
      const coords = getCoordinates(e.clientX, e.clientY);
      addRawPoint(coords.x, coords.y, false);
    };

    const handleMouseLeave = () => {
      // Allow trail to fade out naturally
    };

    // --- Mobile / Touchscreen Events (Strictly passive for native scrolling performance) ---
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        isTouchActive = true;
        const touch = e.touches[0];
        const coords = getCoordinates(touch.clientX, touch.clientY);
        addRawPoint(coords.x, coords.y, true);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        isTouchActive = true;
        const touch = e.touches[0];
        const coords = getCoordinates(touch.clientX, touch.clientY);
        addRawPoint(coords.x, coords.y, true);
      }
    };

    const handleTouchEnd = () => {
      isTouchActive = false;
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

    // Register listeners
    if (window.PointerEvent) {
      window.addEventListener("pointermove", handlePointerMove, { passive: true });
    } else {
      window.addEventListener("mousemove", handleMouseMove, { passive: true });
    }
    document.addEventListener("mouseleave", handleMouseLeave, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    window.addEventListener("touchcancel", handleTouchEnd, { passive: true });
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (window.PointerEvent) {
        window.removeEventListener("pointermove", handlePointerMove);
      } else {
        window.removeEventListener("mousemove", handleMouseMove);
      }
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

export default CustomCursor;
