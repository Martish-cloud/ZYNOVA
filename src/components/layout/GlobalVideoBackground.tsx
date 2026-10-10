import React, { useEffect, useRef } from "react";

export const GlobalVideoBackground: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // In case browser power-saving interrupts initial autoplay, retry on user interaction
        const handleInteraction = () => {
          video.play().catch(() => {});
          window.removeEventListener("scroll", handleInteraction);
          window.removeEventListener("click", handleInteraction);
          window.removeEventListener("touchstart", handleInteraction);
        };
        window.addEventListener("scroll", handleInteraction, { passive: true, once: true });
        window.addEventListener("click", handleInteraction, { once: true });
        window.addEventListener("touchstart", handleInteraction, { passive: true, once: true });
      });
    }

    const handleVisibilityChange = () => {
      if (document.hidden) {
        video.pause();
      } else {
        video.play().catch(() => {});
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#f8fafc]" aria-hidden="true" style={{ contain: "strict" }}>
      {/* Tech 02 Video with Direct Hardware GPU Acceleration (Subtle frosted light-glass motion backdrop) */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        className="w-full h-full object-cover object-center pointer-events-none opacity-[0.12] saturate-50"
        style={{
          transform: "translate3d(0, 0, 0)",
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden"
        }}
        src="/videos/tech-02.mp4"
      >
        <source src="/videos/tech-02.mp4" type="video/mp4" />
        <source src="/videos/Tech 02.mp4" type="video/mp4" />
      </video>

      {/* Frosted Pearl-White & Soft Neutral Radial Glass Veil */}
      <div className="absolute inset-0 bg-white/80 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.65)_20%,#f8fafc_90%)] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-white/75 via-[#f8fafc]/60 to-[#f1f5f9]/85 pointer-events-none" />
    </div>
  );
};
