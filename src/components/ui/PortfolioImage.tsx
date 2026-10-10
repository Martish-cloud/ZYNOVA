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
}

export const PortfolioImage: React.FC<PortfolioImageProps> = ({
  src,
  alt,
  className = "",
  isPriority = false,
  width = 800,
  height = 500,
  platform,
  fallbackTitle,
  fallbackBadge
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [fallbackStage, setFallbackStage] = useState<number>(0);
  const [isPermanentlyFailed, setIsPermanentlyFailed] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (imgRef.current && imgRef.current.complete) {
      setIsLoaded(true);
    }
  }, [src]);

  // Compute WebP and PNG sources
  const { webpSrc, pngSrc, alternateSrc } = useMemo(() => {
    let cleanSrc = src.trim();
    let webp = cleanSrc;
    let png = cleanSrc;
    let altSource: string | null = null;

    if (cleanSrc.endsWith(".webp")) {
      png = cleanSrc.replace(/\.webp$/, ".png");
    } else if (cleanSrc.endsWith(".png")) {
      webp = cleanSrc.replace(/\.png$/, ".webp");
    }

    // Generate alternate URL for spaces vs hyphens
    if (cleanSrc.includes("-")) {
      altSource = cleanSrc.replace(/-/g, " ");
    } else if (cleanSrc.includes(" ")) {
      altSource = cleanSrc.replace(/ /g, "-");
    }

    return { webpSrc: webp, pngSrc: png, alternateSrc: altSource };
  }, [src]);

  // Current active source based on fallback stage
  const currentSrc = useMemo(() => {
    if (fallbackStage === 0) return webpSrc;
    if (fallbackStage === 1) return pngSrc;
    if (fallbackStage === 2 && alternateSrc) return alternateSrc;
    return pngSrc;
  }, [fallbackStage, webpSrc, pngSrc, alternateSrc]);

  const handleError = () => {
    if (fallbackStage === 0) {
      // Step 1: WebP failed -> switch to lossless PNG
      setFallbackStage(1);
    } else if (fallbackStage === 1 && alternateSrc) {
      // Step 2: PNG failed -> try naming variant
      setFallbackStage(2);
    } else {
      // Step 3: All network attempts exhausted -> render graceful card fallback
      setIsPermanentlyFailed(true);
    }
  };

  if (isPermanentlyFailed) {
    return (
      <div className="w-full h-full min-h-[144px] flex flex-col items-center justify-center p-4 bg-gradient-to-b from-slate-50 via-white to-slate-100 border-b border-amber-500/20 text-center select-none">
        <div className="p-2.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-600 mb-2 shadow-[0_2px_12px_rgba(245,158,11,0.15)]">
          {platform ? <Sparkles className="w-5 h-5" /> : <Layers className="w-5 h-5" />}
        </div>
        <p className="text-xs font-bold font-heading text-slate-900 tracking-wide">
          {fallbackTitle || alt.split(" - ")[0]}
        </p>
        <span className="text-[10px] font-mono text-amber-700 mt-0.5">
          {fallbackBadge || (platform ? `${platform} Showcase` : "Interactive Architecture")}
        </span>
      </div>
    );
  }

  return (
    <picture className="w-full h-full block">
      {/* Primary modern WebP source for high performance */}
      {fallbackStage === 0 && <source srcSet={webpSrc} type="image/webp" />}
      {/* Reliable PNG fallback source for older mobile browsers / WebViews */}
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
        onError={handleError}
        onLoad={() => setIsLoaded(true)}
        className={`${className} ${isLoaded || isPriority ? "opacity-100" : "opacity-90"} transition-opacity duration-300`}
        style={{
          aspectRatio: `${width} / ${height}`
        }}
      />
    </picture>
  );
};
