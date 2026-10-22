import React, { useEffect, useRef, useState, useCallback } from "react";
import { useReducedMotion } from "../../hooks/useReducedMotion";

interface HeadphonesScrollCanvasProps {
  progress: number; // 0.0 to 1.0 driven by section scroll
  className?: string;
}

const TOTAL_FRAMES = 240;
const INITIAL_PRELOAD_COUNT = 15;

const getFrameUrl = (frameIndex: number): string => {
  const padded = String(frameIndex).padStart(5, "0");
  return `/videos/headphones/frame_${padded}.jpg`;
};

export const HeadphonesScrollCanvas: React.FC<HeadphonesScrollCanvasProps> = ({
  progress,
  className = "",
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const [isFirstFrameLoaded, setIsFirstFrameLoaded] = useState(false);

  // Cache for loaded frame HTMLImageElements to prevent re-fetching/decoding
  const framesCacheRef = useRef<Map<number, HTMLImageElement>>(new Map());
  const activeFrameIndexRef = useRef<number>(1);
  const rafIdRef = useRef<number | null>(null);

  // Preload initial frames for instantaneous render
  useEffect(() => {
    let isCancelled = false;

    // Load initial frames eagerly
    for (let i = 1; i <= INITIAL_PRELOAD_COUNT; i++) {
      const img = new Image();
      img.src = getFrameUrl(i);
      img.onload = () => {
        if (isCancelled) return;
        framesCacheRef.current.set(i, img);
        if (i === 1) {
          setIsFirstFrameLoaded(true);
        }
      };
    }

    // Progressively preload remaining frames in background batches
    const preloadRemaining = () => {
      let currentBatchStart = INITIAL_PRELOAD_COUNT + 1;
      const batchSize = 12;

      const loadNextBatch = () => {
        if (isCancelled || currentBatchStart > TOTAL_FRAMES) return;

        const end = Math.min(currentBatchStart + batchSize, TOTAL_FRAMES + 1);
        for (let i = currentBatchStart; i < end; i++) {
          if (!framesCacheRef.current.has(i)) {
            const img = new Image();
            img.src = getFrameUrl(i);
            img.onload = () => {
              if (!isCancelled) {
                framesCacheRef.current.set(i, img);
              }
            };
          }
        }
        currentBatchStart += batchSize;

        if (currentBatchStart <= TOTAL_FRAMES) {
          if ("requestIdleCallback" in window) {
            (window as unknown as { requestIdleCallback: (cb: () => void) => void }).requestIdleCallback(loadNextBatch);
          } else {
            setTimeout(loadNextBatch, 80);
          }
        }
      };

      if ("requestIdleCallback" in window) {
        (window as unknown as { requestIdleCallback: (cb: () => void) => void }).requestIdleCallback(loadNextBatch);
      } else {
        setTimeout(loadNextBatch, 150);
      }
    };

    preloadRemaining();

    return () => {
      isCancelled = true;
    };
  }, []);

  // Draw current frame to canvas respecting aspect ratio
  const drawFrame = useCallback((frameNum: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let img = framesCacheRef.current.get(frameNum);

    // If target frame hasn't loaded yet, find nearest cached frame as fallback
    if (!img || !img.complete) {
      for (let offset = 1; offset <= 30; offset++) {
        const prev = framesCacheRef.current.get(frameNum - offset);
        if (prev && prev.complete) {
          img = prev;
          break;
        }
        const next = framesCacheRef.current.get(frameNum + offset);
        if (next && next.complete) {
          img = next;
          break;
        }
      }
    }

    if (!img || !img.complete || img.naturalWidth === 0) return;

    // High DPI canvas scaling
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const displayWidth = canvas.clientWidth;
    const displayHeight = canvas.clientHeight;

    const neededWidth = Math.floor(displayWidth * dpr);
    const neededHeight = Math.floor(displayHeight * dpr);

    if (canvas.width !== neededWidth || canvas.height !== neededHeight) {
      canvas.width = neededWidth;
      canvas.height = neededHeight;
    }

    // Cover or Contain sizing (maintain 16:9 / natural aspect ratio centered)
    const imgWidth = img.naturalWidth;
    const imgHeight = img.naturalHeight;
    const scale = Math.min(canvas.width / imgWidth, canvas.height / imgHeight);

    const destWidth = imgWidth * scale;
    const destHeight = imgHeight * scale;
    const destX = (canvas.width - destWidth) / 2;
    const destY = (canvas.height - destHeight) / 2;

    // Background fill
    ctx.fillStyle = "#171410";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.drawImage(img, destX, destY, destWidth, destHeight);
  }, []);

  // Scrub frame according to progress
  useEffect(() => {
    const targetProgress = prefersReducedMotion ? 0 : Math.max(0, Math.min(1, progress));
    const targetFrameIndex = Math.min(
      TOTAL_FRAMES,
      Math.max(1, Math.round(targetProgress * (TOTAL_FRAMES - 1)) + 1)
    );

    if (activeFrameIndexRef.current === targetFrameIndex && isFirstFrameLoaded) {
      return;
    }

    activeFrameIndexRef.current = targetFrameIndex;

    // Ensure target frame is loading if not already cached
    if (!framesCacheRef.current.has(targetFrameIndex)) {
      const img = new Image();
      img.src = getFrameUrl(targetFrameIndex);
      img.onload = () => {
        framesCacheRef.current.set(targetFrameIndex, img);
        if (activeFrameIndexRef.current === targetFrameIndex) {
          drawFrame(targetFrameIndex);
        }
      };
    }

    if (rafIdRef.current !== null) {
      cancelAnimationFrame(rafIdRef.current);
    }

    rafIdRef.current = requestAnimationFrame(() => {
      drawFrame(targetFrameIndex);
    });

    return () => {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [progress, drawFrame, prefersReducedMotion, isFirstFrameLoaded]);

  // Handle window resizing
  useEffect(() => {
    const handleResize = () => {
      drawFrame(activeFrameIndexRef.current);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [drawFrame]);

  return (
    <div className={`relative w-full h-full overflow-hidden flex items-center justify-center ${className}`}>
      <canvas
        ref={canvasRef}
        className="w-full h-full object-contain block"
      />
    </div>
  );
};

export default HeadphonesScrollCanvas;
