import React, { useEffect, useRef, useState, useCallback } from "react";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { Sparkles } from "lucide-react";

const TOTAL_FRAMES = 277;
const TARGET_FPS = 24;
const FRAME_INTERVAL = 1000 / TARGET_FPS;
const INITIAL_BATCH_SIZE = 25;
const PARALLEL_LOAD_LIMIT = 4;

const getFrameUrl = (index: number): string => {
  const frameNum = String(index + 1).padStart(4, "0");
  return `/videos/frames/frame_${frameNum}.jpg`;
};

// Global shared frame cache across all player instances (Hero & Founder visual)
// Prevents duplicate network downloads and redundant memory decoding
const sharedImages: (HTMLImageElement | null)[] = new Array(TOTAL_FRAMES).fill(null);
const sharedIsLoaded: boolean[] = new Array(TOTAL_FRAMES).fill(false);
const frameLoadPromises = new Map<number, Promise<HTMLImageElement>>();
let globalLoadStarted = false;
let globalLoadProgress = 0;
const progressListeners = new Set<(progress: number) => void>();

const loadSingleFrameShared = (index: number): Promise<HTMLImageElement> => {
  if (sharedImages[index] && sharedIsLoaded[index]) {
    return Promise.resolve(sharedImages[index]!);
  }

  if (frameLoadPromises.has(index)) {
    return frameLoadPromises.get(index)!;
  }

  const promise = new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.decoding = "async";
    img.src = getFrameUrl(index);

    img.onload = () => {
      sharedImages[index] = img;
      sharedIsLoaded[index] = true;
      frameLoadPromises.delete(index);
      resolve(img);
    };

    img.onerror = () => {
      frameLoadPromises.delete(index);
      reject(new Error(`Failed to load frame ${index + 1}`));
    };
  });

  frameLoadPromises.set(index, promise);
  return promise;
};

const startGlobalPreload = async () => {
  if (globalLoadStarted) return;
  globalLoadStarted = true;

  // First load frame 0 immediately for instant display
  try {
    await loadSingleFrameShared(0);
  } catch {}

  // Preload priority initial batch
  const initialPromises: Promise<any>[] = [];
  let initialCount = 1;
  for (let i = 1; i < INITIAL_BATCH_SIZE; i++) {
    initialPromises.push(
      loadSingleFrameShared(i)
        .then(() => {
          initialCount++;
          globalLoadProgress = Math.floor((initialCount / TOTAL_FRAMES) * 100);
          progressListeners.forEach((fn) => fn(globalLoadProgress));
        })
        .catch(() => {})
    );
  }
  await Promise.all(initialPromises);

  // Progressive background queue for remaining frames
  let nextIndex = INITIAL_BATCH_SIZE;
  const loadNext = async () => {
    if (nextIndex >= TOTAL_FRAMES) return;
    const currentIndex = nextIndex++;
    try {
      await loadSingleFrameShared(currentIndex);
      globalLoadProgress = Math.floor((nextIndex / TOTAL_FRAMES) * 100);
      progressListeners.forEach((fn) => fn(globalLoadProgress));
    } catch {}
    if (nextIndex < TOTAL_FRAMES) {
      await loadNext();
    }
  };

  const workers = [];
  for (let i = 0; i < PARALLEL_LOAD_LIMIT; i++) {
    workers.push(loadNext());
  }
  await Promise.all(workers);
};

export interface HeroFramePlayerProps {
  className?: string;
  containerClassName?: string;
  cardClassName?: string;
  aspectRatioClass?: string;
  showStatusPill?: boolean;
  watermark?: boolean;
  watermarkText?: string;
}

export const HeroFramePlayer: React.FC<HeroFramePlayerProps> = ({
  className = "",
  containerClassName = "relative w-full max-w-2xl mx-auto lg:max-w-none group",
  cardClassName = "relative w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-[#292720] border-2 border-[#E5D9C8] hover:border-[#B58A45]/70 shadow-[0_20px_50px_rgba(41,39,32,0.12),0_4px_16px_rgba(181,138,69,0.1)] transition-all duration-500",
  aspectRatioClass = "aspect-[16/9]",
  showStatusPill = true,
  watermark = false,
  watermarkText = "ZYNOVA",
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const [isLoadingInitial, setIsLoadingInitial] = useState(() => !sharedIsLoaded[0]);
  const [loadProgress, setLoadProgress] = useState(globalLoadProgress);

  const currentFrameRef = useRef<number>(0);
  const lastRenderedFrameRef = useRef<number>(0);
  const isVisibleRef = useRef<boolean>(true);
  const animationFrameIdRef = useRef<number | null>(null);
  const lastTimestampRef = useRef<number>(0);
  const isUnmountedRef = useRef<boolean>(false);

  // Draw a frame image to the canvas preserving aspect ratio
  const drawFrame = useCallback((img: HTMLImageElement) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    if (canvasWidth === 0 || canvasHeight === 0) return;

    const imgWidth = img.naturalWidth || 1920;
    const imgHeight = img.naturalHeight || 1080;

    // Calculate cover fit dimensions
    const scale = Math.max(canvasWidth / imgWidth, canvasHeight / imgHeight);
    const drawWidth = imgWidth * scale;
    const drawHeight = imgHeight * scale;
    const drawX = (canvasWidth - drawWidth) / 2;
    const drawY = (canvasHeight - drawHeight) / 2;

    ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
  }, []);

  // Sync canvas size with high DPI support
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const rect = container.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const targetWidth = Math.floor(rect.width * dpr);
    const targetHeight = Math.floor(rect.height * dpr);

    if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
      canvas.width = targetWidth;
      canvas.height = targetHeight;

      const lastImg = sharedImages[lastRenderedFrameRef.current];
      if (lastImg && sharedIsLoaded[lastRenderedFrameRef.current]) {
        drawFrame(lastImg);
      }
    }
  }, [drawFrame]);

  // Initial setup and queue subscription
  useEffect(() => {
    isUnmountedRef.current = false;

    const handleProgress = (prog: number) => {
      if (!isUnmountedRef.current) {
        setLoadProgress(prog);
      }
    };
    progressListeners.add(handleProgress);

    // Initial frame 0 render
    loadSingleFrameShared(0).then((firstFrame) => {
      if (!isUnmountedRef.current) {
        resizeCanvas();
        drawFrame(firstFrame);
        setIsLoadingInitial(false);
      }
    }).catch(() => {
      if (!isUnmountedRef.current) setIsLoadingInitial(false);
    });

    if (!prefersReducedMotion) {
      startGlobalPreload();
    }

    return () => {
      isUnmountedRef.current = true;
      progressListeners.delete(handleProgress);
    };
  }, [resizeCanvas, drawFrame, prefersReducedMotion]);

  // Window resize observer
  useEffect(() => {
    window.addEventListener("resize", resizeCanvas);
    const observer = new ResizeObserver(() => resizeCanvas());
    if (containerRef.current) observer.observe(containerRef.current);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      observer.disconnect();
    };
  }, [resizeCanvas]);

  // IntersectionObserver to pause rendering when component is not in viewport
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisibleRef.current = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );

    observer.observe(container);

    const handleVisibilityChange = () => {
      isVisibleRef.current = document.visibilityState === "visible";
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  // Main continuous animation loop
  useEffect(() => {
    if (prefersReducedMotion) {
      const frame0 = sharedImages[0];
      if (frame0 && sharedIsLoaded[0]) {
        drawFrame(frame0);
      }
      return;
    }

    let accumulatedTime = 0;

    const animate = (timestamp: number) => {
      if (isUnmountedRef.current) return;

      if (!lastTimestampRef.current) {
        lastTimestampRef.current = timestamp;
      }

      const delta = timestamp - lastTimestampRef.current;
      lastTimestampRef.current = timestamp;

      // Only step forward when container is visible in viewport
      if (isVisibleRef.current) {
        accumulatedTime += delta;

        while (accumulatedTime >= FRAME_INTERVAL) {
          accumulatedTime -= FRAME_INTERVAL;
          currentFrameRef.current = (currentFrameRef.current + 1) % TOTAL_FRAMES;
        }

        const targetFrameIndex = currentFrameRef.current;
        const targetImg = sharedImages[targetFrameIndex];

        if (targetImg && sharedIsLoaded[targetFrameIndex]) {
          drawFrame(targetImg);
          lastRenderedFrameRef.current = targetFrameIndex;
        } else {
          // Maintain last good rendered frame if target frame is downloading
          const fallbackImg = sharedImages[lastRenderedFrameRef.current];
          if (fallbackImg && sharedIsLoaded[lastRenderedFrameRef.current]) {
            drawFrame(fallbackImg);
          }
        }
      }

      animationFrameIdRef.current = requestAnimationFrame(animate);
    };

    animationFrameIdRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameIdRef.current !== null) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, [drawFrame, prefersReducedMotion]);

  return (
    <div className={`${containerClassName} ${className}`}>
      {/* Ambient warm light aura behind player matching desk lamp glow */}
      <div
        className="absolute -inset-4 sm:-inset-6 rounded-3xl bg-[radial-gradient(circle_at_70%_40%,rgba(181,138,69,0.22)_0%,rgba(240,228,210,0.35)_45%,transparent_75%)] blur-2xl pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity duration-700"
        aria-hidden="true"
      />

      {/* Main Cinematic Video Player Card */}
      <div
        ref={containerRef}
        className={`${aspectRatioClass} ${cardClassName}`}
      >
        {/* HTML5 High-Performance Canvas */}
        <canvas
          ref={canvasRef}
          className="w-full h-full block object-cover object-center"
          aria-label="Cinematic developer engineering animation"
          role="img"
        />

        {/* Static Image Fallback for initial load */}
        {isLoadingInitial && (
          <img
            src="/videos/frames/frame_0001.jpg"
            alt="ZYNOVA engineering frame fallback"
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}

        {/* Subtle Ambient Vignette Overlay */}
        <div
          className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/25 via-transparent to-black/10"
          aria-hidden="true"
        />

        {/* Note: "277-FRAME SEQUENCE" badge completely removed per Priority 5 */}

        {/* Bottom-Left Status Pill (optional, default true) */}
        {showStatusPill && (
          <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 z-20 pointer-events-none">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-[#E5D9C8] text-[#292720] shadow-xs">
              <Sparkles className="w-3 h-3 text-[#B58A45]" />
              <span className="text-[10px] sm:text-xs font-heading font-bold tracking-wide">
                Engineering In Focus
              </span>
              {loadProgress < 100 && !prefersReducedMotion && (
                <span className="text-[9px] font-mono text-[#756C60] ml-1">
                  ({loadProgress}%)
                </span>
              )}
            </div>
          </div>
        )}

        {/* Priority 6: Small ZYNOVA Watermark in Bottom-Right Corner at ~80% Opacity */}
        {watermark && (
          <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 z-20 pointer-events-none select-none">
            <span
              className="font-heading font-black tracking-[0.24em] text-[10px] sm:text-[11px] uppercase text-[#FAF7F0] px-2.5 py-1 rounded-md bg-black/40 backdrop-blur-[2px] border border-white/15 shadow-sm"
              style={{
                opacity: 0.8,
                textShadow: "0 1px 4px rgba(0, 0, 0, 0.85)",
              }}
            >
              {watermarkText}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeroFramePlayer;
