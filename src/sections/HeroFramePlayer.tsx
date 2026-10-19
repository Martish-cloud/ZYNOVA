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

export const HeroFramePlayer: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const [isLoadingInitial, setIsLoadingInitial] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);

  // Array of cached image elements
  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FRAMES).fill(null));
  const isLoadedRef = useRef<boolean[]>(new Array(TOTAL_FRAMES).fill(false));
  const currentFrameRef = useRef<number>(0);
  const lastRenderedFrameRef = useRef<number>(0);
  const isVisibleRef = useRef<boolean>(true);
  const animationFrameIdRef = useRef<number | null>(null);
  const lastTimestampRef = useRef<number>(0);
  const isUnmountedRef = useRef<boolean>(false);

  // Draw a frame image to the canvas preserving 16:9 aspect ratio
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

      // Re-draw last known frame after resize
      const lastImg = imagesRef.current[lastRenderedFrameRef.current];
      if (lastImg && isLoadedRef.current[lastRenderedFrameRef.current]) {
        drawFrame(lastImg);
      }
    }
  }, [drawFrame]);

  // Load an individual frame
  const loadSingleFrame = useCallback((index: number): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      if (imagesRef.current[index] && isLoadedRef.current[index]) {
        resolve(imagesRef.current[index]!);
        return;
      }

      const img = new Image();
      img.decoding = "async";
      img.src = getFrameUrl(index);

      img.onload = () => {
        if (isUnmountedRef.current) return;
        imagesRef.current[index] = img;
        isLoadedRef.current[index] = true;
        resolve(img);
      };

      img.onerror = () => {
        if (isUnmountedRef.current) return;
        reject(new Error(`Failed to load frame ${index + 1}`));
      };
    });
  }, []);

  // Progressive background queue for remaining frames
  const loadRemainingFrames = useCallback(async () => {
    let nextIndex = INITIAL_BATCH_SIZE;

    const loadNext = async () => {
      if (isUnmountedRef.current || nextIndex >= TOTAL_FRAMES) return;
      const currentIndex = nextIndex++;
      try {
        await loadSingleFrame(currentIndex);
        setLoadProgress(Math.floor((nextIndex / TOTAL_FRAMES) * 100));
      } catch {
        // Continue even if a single frame fails
      }
      if (!isUnmountedRef.current && nextIndex < TOTAL_FRAMES) {
        await loadNext();
      }
    };

    // Run parallel workers up to PARALLEL_LOAD_LIMIT
    const workers = [];
    for (let i = 0; i < PARALLEL_LOAD_LIMIT; i++) {
      workers.push(loadNext());
    }
    await Promise.all(workers);
  }, [loadSingleFrame]);

  // Initial setup and priority batch preloading
  useEffect(() => {
    isUnmountedRef.current = false;
    let initialCount = 0;

    const loadInitialBatch = async () => {
      // First load frame 0 immediately for instant poster display
      try {
        const firstFrame = await loadSingleFrame(0);
        if (!isUnmountedRef.current) {
          resizeCanvas();
          drawFrame(firstFrame);
          setIsLoadingInitial(false);
        }
      } catch {
        setIsLoadingInitial(false);
      }

      // Preload next initial batch frames
      const initialPromises = [];
      for (let i = 1; i < INITIAL_BATCH_SIZE; i++) {
        initialPromises.push(
          loadSingleFrame(i).then(() => {
            initialCount++;
            if (!isUnmountedRef.current) {
              setLoadProgress(Math.floor((initialCount / TOTAL_FRAMES) * 100));
            }
          }).catch(() => {})
        );
      }

      await Promise.all(initialPromises);

      // Once initial batch is in place, trigger progressive background queue
      if (!isUnmountedRef.current && !prefersReducedMotion) {
        loadRemainingFrames();
      }
    };

    loadInitialBatch();

    return () => {
      isUnmountedRef.current = true;
    };
  }, [loadSingleFrame, resizeCanvas, drawFrame, loadRemainingFrames, prefersReducedMotion]);

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

  // IntersectionObserver to pause rendering when hero is not visible
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
      // For reduced motion: render static frame 0 only
      const frame0 = imagesRef.current[0];
      if (frame0 && isLoadedRef.current[0]) {
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
        const targetImg = imagesRef.current[targetFrameIndex];

        if (targetImg && isLoadedRef.current[targetFrameIndex]) {
          drawFrame(targetImg);
          lastRenderedFrameRef.current = targetFrameIndex;
        } else {
          // If the target frame is still downloading, maintain last good rendered frame
          const fallbackImg = imagesRef.current[lastRenderedFrameRef.current];
          if (fallbackImg && isLoadedRef.current[lastRenderedFrameRef.current]) {
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
    <div className="relative w-full max-w-2xl mx-auto lg:max-w-none group">
      {/* Ambient warm light aura behind player matching desk lamp glow */}
      <div
        className="absolute -inset-4 sm:-inset-6 rounded-3xl bg-[radial-gradient(circle_at_70%_40%,rgba(181,138,69,0.22)_0%,rgba(240,228,210,0.35)_45%,transparent_75%)] blur-2xl pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity duration-700"
        aria-hidden="true"
      />

      {/* Main Cinematic Video Player Card */}
      <div
        ref={containerRef}
        className="relative w-full aspect-[16/9] rounded-2xl sm:rounded-3xl overflow-hidden bg-[#292720] border-2 border-[#E5D9C8] hover:border-[#B58A45]/70 shadow-[0_20px_50px_rgba(41,39,32,0.12),0_4px_16px_rgba(181,138,69,0.1)] transition-all duration-500"
      >
        {/* HTML5 High-Performance Canvas */}
        <canvas
          ref={canvasRef}
          className="w-full h-full block object-cover object-center"
          aria-label="Cinematic 277-frame developer engineering animation"
          role="img"
        />

        {/* Static Image Fallback for initial load or errors */}
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

        {/* Top-Right Premium Badge */}
        <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 pointer-events-none">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#292720]/80 backdrop-blur-md border border-[#E5D9C8]/40 shadow-xs text-white">
            <span className="w-2 h-2 rounded-full bg-[#B58A45] animate-pulse" />
            <span className="text-[10px] sm:text-[11px] font-mono tracking-wider font-bold">
              {prefersReducedMotion ? "STILL FRAME" : "277-FRAME SEQUENCE"}
            </span>
          </div>
        </div>

        {/* Bottom-Left Status Pill */}
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
      </div>
    </div>
  );
};
