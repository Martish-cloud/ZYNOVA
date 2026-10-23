import React, { useState, useMemo, useRef, useEffect } from "react";
import { Sparkles, Layers } from "lucide-react";

interface PortfolioImageProps {
  src: string;
  alt: string;
  className?: string;
  isPriority?: boolean;
  width?: number;
  height?: number;
  platform?: "iOS" | "Android";
  fallbackTitle?: string;
  fallbackBadge?: string;
  videoSrc?: string;
}

const resolveVideoSrc = (src: string, alt: string, explicitVideo?: string): string | null => {
  if (explicitVideo) return explicitVideo;
  const combined = (src + " " + alt).toLowerCase();
  if (combined.includes("aaranya") || combined.includes("silks") || combined.includes("saree")) {
    return "/videos/Aaranya%20Silks.mp4";
  }
  if (
    combined.includes("hamhold") ||
    combined.includes("emerald") ||
    combined.includes("jewellery") ||
    combined.includes("jewelry")
  ) {
    return "/videos/HAMHOLD.mp4";
  }
  if (
    combined.includes("tastybites") ||
    combined.includes("tasty bites") ||
    combined.includes("tasty-bites")
  ) {
    return "/videos/Tasty%20Bites.mp4";
  }
  return null;
};

export const PortfolioImage: React.FC<PortfolioImageProps> = React.memo(({
  src,
  alt,
  className = "",
  isPriority = false,
  width = 800,
  height = 500,
  platform,
  fallbackTitle,
  fallbackBadge,
  videoSrc: explicitVideo
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [fallbackStage, setFallbackStage] = useState<number>(0);
  const [isPermanentlyFailed, setIsPermanentlyFailed] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);

  const imgRef = useRef<HTMLImageElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeVideo = useMemo(() => {
    if (videoFailed) return null;
    return resolveVideoSrc(src, alt, explicitVideo);
  }, [src, alt, explicitVideo, videoFailed]);

  // Compute WebP and PNG sources for poster / fallback
  const { webpSrc, pngSrc, alternateSrc } = useMemo(() => {
    const cleanSrc = src.trim();
    let webp = cleanSrc;
    let png = cleanSrc;
    let altSource: string | null = null;

    if (cleanSrc.endsWith(".webp")) {
      png = cleanSrc.replace(/\.webp$/, ".png");
    } else if (cleanSrc.endsWith(".png")) {
      webp = cleanSrc.replace(/\.png$/, ".webp");
    }

    if (cleanSrc.includes("-")) {
      altSource = cleanSrc.replace(/-/g, " ");
    } else if (cleanSrc.includes(" ")) {
      altSource = cleanSrc.replace(/ /g, "-");
    }

    return { webpSrc: webp, pngSrc: png, alternateSrc: altSource };
  }, [src]);

  // Current active image source based on fallback stage
  const currentSrc = useMemo(() => {
    if (fallbackStage === 0) return webpSrc;
    if (fallbackStage === 1) return pngSrc;
    if (fallbackStage === 2 && alternateSrc) return alternateSrc;
    return pngSrc;
  }, [fallbackStage, webpSrc, pngSrc, alternateSrc]);

  const prevSrcRef = useRef(src);
  if (prevSrcRef.current !== src) {
    prevSrcRef.current = src;
    setFallbackStage(0);
    setIsPermanentlyFailed(false);
    setVideoFailed(false);
  }

  const prevVideoRef = useRef(explicitVideo);
  if (prevVideoRef.current !== explicitVideo) {
    prevVideoRef.current = explicitVideo;
    setVideoFailed(false);
  }

  // Lazy loading & playback management for project preview video
  useEffect(() => {
    if (!activeVideo) return;
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;

    const playVideo = () => {
      video.muted = true;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Autoplay policy or low power mode fallback
        });
      }
    };

    const pauseVideo = () => {
      video.pause();
    };

    // Trigger immediate playback attempt
    playVideo();

    let observer: IntersectionObserver | null = null;
    if (typeof IntersectionObserver !== "undefined" && containerRef.current) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              playVideo();
            } else {
              pauseVideo();
            }
          });
        },
        { threshold: 0.15, rootMargin: "100px" }
      );
      observer.observe(containerRef.current);
    }

    return () => {
      if (observer) observer.disconnect();
    };
  }, [activeVideo]);

  const handleImageError = () => {
    if (fallbackStage === 0) {
      setFallbackStage(1);
    } else if (fallbackStage === 1 && alternateSrc) {
      setFallbackStage(2);
    } else {
      setIsPermanentlyFailed(true);
    }
  };

  const handleVideoError = () => {
    // If video fails to load, gracefully fall back to the static image
    setVideoFailed(true);
  };

  if (isPermanentlyFailed) {
    return (
      <div className="w-full h-full min-h-[144px] flex flex-col items-center justify-center p-4 bg-[#120F0C] border-b border-[#D0A04B]/20 text-center select-none">
        <div className="p-2.5 rounded-full bg-[#D0A04B]/15 border border-[#D0A04B]/30 text-[#D0A04B] mb-2 shadow-sm">
          {platform ? <Sparkles className="w-5 h-5" /> : <Layers className="w-5 h-5" />}
        </div>
        <p className="text-xs font-bold font-heading text-white tracking-wide">
          {fallbackTitle || alt.split(" - ")[0]}
        </p>
        <span className="text-[10px] font-mono text-[#D0A04B] mt-0.5">
          {fallbackBadge || (platform ? `${platform} Showcase` : "Interactive Platform")}
        </span>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative w-full h-full overflow-hidden block">
      {activeVideo ? (
        <div className="w-full h-full relative bg-[#11100E]">
          <video
            key={activeVideo}
            ref={videoRef}
            src={activeVideo}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            onError={handleVideoError}
            onLoadedData={() => setIsLoaded(true)}
            className={`${className} w-full h-full object-cover transition-opacity duration-300 opacity-100`}
            style={{
              aspectRatio: `${width} / ${height}`,
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden"
            }}
          />
        </div>
      ) : (
        <picture className="w-full h-full block">
          {fallbackStage === 0 && <source srcSet={webpSrc} type="image/webp" />}
          {(fallbackStage === 0 || fallbackStage === 1) && <source srcSet={pngSrc} type="image/png" />}
          <img
            ref={imgRef}
            src={currentSrc}
            alt={alt}
            width={width}
            height={height}
            loading={isPriority ? "eager" : "lazy"}
            decoding="async"
            fetchPriority={isPriority ? "high" : "auto"}
            onError={handleImageError}
            onLoad={() => setIsLoaded(true)}
            className={`${className} ${isLoaded || isPriority ? "opacity-100" : "opacity-90"} transition-opacity duration-300`}
            style={{
              aspectRatio: `${width} / ${height}`,
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden"
            }}
          />
        </picture>
      )}
    </div>
  );
});

PortfolioImage.displayName = "PortfolioImage";
