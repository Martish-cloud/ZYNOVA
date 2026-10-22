import React, { useEffect, useRef, useState, useCallback } from "react";
import { useReducedMotion } from "../../hooks/useReducedMotion";

export interface FounderScrollCanvasProps {
  progress: number; // 0.0 to 1.0 mapped scroll progress
  className?: string;
}

const TOTAL_FRAMES = 277;
const INITIAL_PRELOAD_COUNT = 16;

/**
 * High-performance HTML5 Canvas renderer for the 277-frame Founder visual sequence from video/AAA.
 * Features:
 * - Scroll-controlled frame progression (advances on down-scroll, reverses on up-scroll)
 * - Sourced from public/videos/aaa/frame_0001.jpg .. frame_0277.jpg (1920x1080)
 * - Progressive background preloading to ensure smooth rendering without memory overload
 * - RAM caching with requestAnimationFrame drawing
 * - Instant display of initial frame with zero flash
 * - Respects prefers-reduced-motion with static initial frame
 */
export const FounderScrollCanvas: React.FC<FounderScrollCanvasProps> = ({
  progress,
  className = "",
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  // Cached frame images indexed 0..276
  const imageCache = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FRAMES).fill(null));
  const currentRenderedFrame = useRef<number>(-1);
  const rafId = useRef<number | null>(null);
  const [initialLoaded, setInitialLoaded] = useState(false);

  // Helper to format frame path: frame_0001.jpg .. frame_0277.jpg
  const getFrameUrl = useCallback((index: number) => {
    const frameNum = String(index + 1).padStart(4, "0");
    return `/videos/aaa/frame_${frameNum}.jpg`;
  }, []);

  // Preload an individual frame
  const loadFrame = useCallback(
    (index: number): Promise<HTMLImageElement> => {
      return new Promise((resolve, reject) => {
        if (imageCache.current[index]) {
          resolve(imageCache.current[index]!);
          return;
        }
        const img = new Image();
        img.src = getFrameUrl(index);
        img.onload = () => {
          imageCache.current[index] = img;
          resolve(img);
        };
        img.onerror = reject;
      });
    },
    [getFrameUrl]
  );

  // Draw image to canvas with cover composition
  const renderImageToCanvas = useCallback((canvas: HTMLCanvasElement, img: HTMLImageElement) => {
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    if (canvas.width !== Math.round(width * dpr) || canvas.height !== Math.round(height * dpr)) {
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
    }

    ctx.save();
    ctx.scale(dpr, dpr);

    // Deep dark base fill
    ctx.fillStyle = "#100D09";
    ctx.fillRect(0, 0, width, height);

    // Source resolution: 1920 x 1080 (16:9)
    // Scale to cover container while preserving aspect ratio
    const scale = Math.max(width / img.width, height / img.height);
    const drawW = img.width * scale;
    const drawH = img.height * scale;
    const drawX = (width - drawW) / 2;
    const drawY = (height - drawH) / 2;

    ctx.drawImage(img, drawX, drawY, drawW, drawH);
    ctx.restore();
  }, []);

  // Main draw function
  const drawFrame = useCallback(
    (frameIdx: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const img = imageCache.current[frameIdx];
      if (!img || !img.complete) {
        // Fallback to nearest loaded frame if target frame is still loading
        let nearest: HTMLImageElement | null = null;
        for (let dist = 1; dist < TOTAL_FRAMES; dist++) {
          if (frameIdx - dist >= 0 && imageCache.current[frameIdx - dist]?.complete) {
            nearest = imageCache.current[frameIdx - dist];
            break;
          }
          if (frameIdx + dist < TOTAL_FRAMES && imageCache.current[frameIdx + dist]?.complete) {
            nearest = imageCache.current[frameIdx + dist];
            break;
          }
        }
        if (!nearest) return;
        renderImageToCanvas(canvas, nearest);
        return;
      }

      renderImageToCanvas(canvas, img);
      currentRenderedFrame.current = frameIdx;
    },
    [renderImageToCanvas]
  );

  // Phase 1: Load initial frames immediately for crisp instant render
  useEffect(() => {
    let isCancelled = false;

    const loadInitialBatch = async () => {
      try {
        const promises: Promise<HTMLImageElement>[] = [];
        for (let i = 0; i < INITIAL_PRELOAD_COUNT; i++) {
          promises.push(loadFrame(i));
        }
        await Promise.all(promises);
        if (!isCancelled) {
          setInitialLoaded(true);
          drawFrame(0);
        }
      } catch {
        if (!isCancelled) {
          setInitialLoaded(true);
          drawFrame(0);
        }
      }
    };

    loadInitialBatch();

    return () => {
      isCancelled = true;
    };
  }, [loadFrame, drawFrame]);

  // Ensure initial frame renders as soon as initialLoaded is set
  useEffect(() => {
    if (initialLoaded) {
      drawFrame(currentRenderedFrame.current >= 0 ? currentRenderedFrame.current : 0);
    }
  }, [initialLoaded, drawFrame]);

  // Phase 2: Progressively load remaining frames in idle / batches
  useEffect(() => {
    if (!initialLoaded) return;
    let isCancelled = false;

    const loadRemainingProgressively = () => {
      let currentIndex = INITIAL_PRELOAD_COUNT;
      const BATCH_SIZE = 8;

      const scheduleNextBatch = () => {
        if (isCancelled || currentIndex >= TOTAL_FRAMES) return;

        const batchPromises: Promise<HTMLImageElement>[] = [];
        const limit = Math.min(currentIndex + BATCH_SIZE, TOTAL_FRAMES);

        for (let i = currentIndex; i < limit; i++) {
          batchPromises.push(loadFrame(i));
        }

        currentIndex = limit;

        Promise.allSettled(batchPromises).then(() => {
          if (!isCancelled && currentIndex < TOTAL_FRAMES) {
            if ("requestIdleCallback" in window) {
              (window as unknown as { requestIdleCallback: (cb: () => void) => void }).requestIdleCallback(
                scheduleNextBatch
              );
            } else {
              setTimeout(scheduleNextBatch, 30);
            }
          }
        });
      };

      scheduleNextBatch();
    };

    loadRemainingProgressively();

    return () => {
      isCancelled = true;
    };
  }, [initialLoaded, loadFrame]);

  // Redraw when progress changes
  useEffect(() => {
    if (prefersReducedMotion) {
      drawFrame(0);
      return;
    }

    const clampedProgress = Math.max(0, Math.min(1, progress));
    const targetFrame = Math.min(
      TOTAL_FRAMES - 1,
      Math.max(0, Math.round(clampedProgress * (TOTAL_FRAMES - 1)))
    );

    if (targetFrame === currentRenderedFrame.current) return;

    if (rafId.current) cancelAnimationFrame(rafId.current);
    rafId.current = requestAnimationFrame(() => {
      drawFrame(targetFrame);
    });

    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [progress, prefersReducedMotion, drawFrame]);

  // Window resize handler to maintain sharp scaling
  useEffect(() => {
    const handleResize = () => {
      const frame = currentRenderedFrame.current >= 0 ? currentRenderedFrame.current : 0;
      drawFrame(frame);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [drawFrame]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden bg-[#100D09] ${className}`}
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block object-cover"
        role="img"
        aria-label="Founder Identity animation from AAA frames"
      />

      {/* Fallback starting frame while initial frames decode */}
      {!initialLoaded && (
        <img
          src="/videos/aaa/frame_0001.jpg"
          alt="Founder visual preview"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />
      )}
    </div>
  );
};

export default FounderScrollCanvas;
