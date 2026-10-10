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
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#0a0806]" aria-hidden="true" style={{ contain: "strict" }}>
      {/* Effects Video - VDO (5) across entire background with 20% blur and Hardware GPU Acceleration */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="w-full h-full object-cover object-center pointer-events-none"
        style={{
          filter: "blur(4px)",
          WebkitFilter: "blur(4px)",
          transform: "scale(1.04) translate3d(0, 0, 0)",
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden"
        }}
        src="/videos/vdo-5.mp4"
      >
        <source src="/videos/vdo-5.mp4" type="video/mp4" />
        <source src="/Effects Video/VDO (5).mp4" type="video/mp4" />
      </video>

      {/* Subtle atmospheric contrast veil so Light Glassmorphism cards & headings pop over the 20% blurred video */}
      <div className="absolute inset-0 bg-black/15 pointer-events-none" />
    </div>
  );
};
