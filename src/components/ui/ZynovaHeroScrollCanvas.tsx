import React, { useEffect, useRef, useState, useCallback } from "react";
import { useReducedMotion } from "../../hooks/useReducedMotion";

export interface ZynovaHeroScrollCanvasProps {
  progress: number; // 0.0 to 1.0 mapped scroll progress
  className?: string;
}

const TOTAL_FRAMES = 234;
const INITIAL_PRELOAD_COUNT = 32;

/**
 * High-performance HTML5 Canvas renderer for the 234-frame Zynova Hero sequence.
 * Features:
 * - Direct scroll-driven frame scrubbing (advances on down-scroll, reverses on up-scroll)
 * - Dynamic right-aligned aspect-cover drawing so the product (laptop) stays cleanly on the right
 * - Progressive background preloading to ensure instant responsiveness without memory overload
 * - Clamped frame indexing to eliminate out-of-sequence errors and flickering
 * - Clean requestAnimationFrame scheduling
 * - Accessible static fallback under prefers-reduced-motion
 */
export const ZynovaHeroScrollCanvas: React.FC<ZynovaHeroScrollCanvasProps> = ({
  progress,
  className = "",
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  // Cached frame images indexed 0..233
  const imageCache = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FRAMES).fill(null));
  const currentRenderedFrame = useRef<number>(-1);
  const rafId = useRef<number | null>(null);
  const [initialLoaded, setInitialLoaded] = useState(false);

  // Helper to format frame path: frame_00001.jpg .. frame_00234.jpg
  const getFrameUrl = useCallback((index: number) => {
    const frameNum = String(index + 1).padStart(5, "0");
    return `/videos/zynova_hero/frame_${frameNum}.jpg`;
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

  // Draw image to canvas with right-aligned composition
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

    // Deep black base fill
    ctx.fillStyle = "#080706";
    ctx.fillRect(0, 0, width, height);

    // Composition calculation:
    // Source resolution: 1920 x 1080 (16:9).
    // The product/laptop sits in the center-right of the source frames.
    // On desktop, we scale and right-shift so the product stays prominently in the right half.
    let drawW: number;
    let drawH: number;
    let drawX: number;
    let drawY: number;

    if (width >= 1024) {
      // Desktop: Scale to cover, position laptop center at ~74% of canvas width (cleanly on the right half)
      const scale = Math.max(width / img.width, height / img.height) * 1.02;
      drawW = img.width * scale;
      drawH = img.height * scale;
      // Laptop center in 1920x1080 source image is at img.width * 0.5 (960px).
      // Placing laptop center at width * 0.74 guarantees clean separation from left-side text
      drawX = width * 0.74 - img.width * 0.5 * scale;
      drawY = (height - drawH) / 2;
    } else if (width >= 768) {
      // Tablet: Laptop center at ~70% of canvas width
      const scale = Math.max(width / img.width, height / img.height) * 1.02;
      drawW = img.width * scale;
      drawH = img.height * scale;
      drawX = width * 0.70 - img.width * 0.5 * scale;
      drawY = (height - drawH) / 2;
    } else {
      // Mobile: Balanced center crop
      const scale = Math.max(width / img.width, height / img.height);
      drawW = img.width * scale;
      drawH = img.height * scale;
      drawX = (width - drawW) * 0.5;
      drawY = (height - drawH) / 2;
    }

    ctx.drawImage(img, drawX, drawY, drawW, drawH);
    ctx.restore();
  }, []);

  // Main Draw function: right-aligned cover
  const drawFrame = useCallback(
    (frameIdx: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const img = imageCache.current[frameIdx];
      if (!img || !img.complete) {
        // Kick off immediate priority load of this exact frame
        loadFrame(frameIdx)
          .then((loadedImg) => {
            if (currentRenderedFrame.current === frameIdx) {
              renderImageToCanvas(canvas, loadedImg);
            }
          })
          .catch(() => {});

        // Preload immediate adjacent neighbors
        if (frameIdx + 1 < TOTAL_FRAMES) loadFrame(frameIdx + 1).catch(() => {});
        if (frameIdx + 2 < TOTAL_FRAMES) loadFrame(frameIdx + 2).catch(() => {});
        if (frameIdx - 1 >= 0) loadFrame(frameIdx - 1).catch(() => {});

        // Fallback to nearest loaded frame for zero flash while decoding
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
    [renderImageToCanvas, loadFrame]
  );

  // Eager preloader with concurrent worker streams so all 234 frames load within ~1.5s
  useEffect(() => {
    let isCancelled = false;

    // Load initial frames immediately in parallel
    const initialBatch: Promise<HTMLImageElement>[] = [];
    for (let i = 0; i < Math.min(INITIAL_PRELOAD_COUNT, TOTAL_FRAMES); i++) {
      initialBatch.push(loadFrame(i));
    }

    Promise.allSettled(initialBatch).then(() => {
      if (!isCancelled) {
        setInitialLoaded(true);
        drawFrame(0);
      }
    });

    // Concurrently stream all remaining frames in 12 parallel workers
    const queue = Array.from(
      { length: TOTAL_FRAMES - INITIAL_PRELOAD_COUNT },
      (_, i) => i + INITIAL_PRELOAD_COUNT
    );
    const CONCURRENCY = 12;

    const worker = async () => {
      while (queue.length > 0 && !isCancelled) {
        const nextIdx = queue.shift();
        if (nextIdx !== undefined) {
          try {
            await loadFrame(nextIdx);
          } catch {
            // Continue queue on any individual network glitch
          }
        }
      }
    };

    const workers = Array.from({ length: CONCURRENCY }, () => worker());
    Promise.all(workers);

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

  // Redraw when progress changes
  useEffect(() => {
    if (prefersReducedMotion) {
      drawFrame(0);
      return;
    }

    const clampedProgress = Math.max(0, Math.min(1, progress));
    const targetFrame = Math.min(TOTAL_FRAMES - 1, Math.max(0, Math.round(clampedProgress * (TOTAL_FRAMES - 1))));

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
      className={`relative w-full h-full overflow-hidden bg-[#080706] ${className}`}
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block object-cover"
        role="img"
        aria-label="Interactive scroll-driven 3D product animation"
      />

      {/* Fallback starting frame while initial frames decode */}
      {!initialLoaded && (
        <img
          src="/videos/zynova_hero/frame_00001.jpg"
          alt="ZYNOVA product animation preview"
          className="absolute inset-0 w-full h-full object-cover object-right pointer-events-none"
        />
      )}
    </div>
  );
};

export default ZynovaHeroScrollCanvas;
