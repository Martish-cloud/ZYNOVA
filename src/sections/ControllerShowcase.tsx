import React, { useRef, useEffect } from "react";

export const ControllerShowcase: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    // Autoplay when section enters viewport; pause when scrolled out of view to save GPU/battery
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {
              // Autoplay error handling for strict browser policies
            });
          } else {
            video.pause();
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: "50px 0px 50px 0px",
      }
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section
      id="controller-showcase"
      ref={containerRef}
      className="relative w-full py-12 sm:py-16 md:py-20 lg:py-24 bg-[#080706] text-white overflow-hidden flex items-center justify-center"
      aria-label="Evofox Gaming Controller Cinematic Showcase"
    >
      {/* Subtle Cinematic Ambient Glow behind controller */}
      <div
        className="absolute inset-0 pointer-events-none z-0 overflow-hidden flex items-center justify-center"
        aria-hidden="true"
      >
        <div className="w-[850px] max-w-[90vw] h-[500px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(208,160,75,0.08)_0%,rgba(14,24,42,0.15)_40%,transparent_70%)] blur-2xl" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#080706] via-transparent to-[#080706]" />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
        {/* Cinematic Video Showcase Frame */}
        <div className="relative w-full max-w-5xl rounded-2xl sm:rounded-3xl overflow-hidden border border-[#D0A04B]/20 bg-[#0B0907] shadow-[0_20px_60px_rgba(0,0,0,0.85),0_0_40px_rgba(208,160,75,0.07)] transition-all duration-500 hover:border-[#D0A04B]/40 group">
          {/* Subtle Golden Inner Rim Lighting */}
          <div
            className="absolute inset-0 pointer-events-none z-10 rounded-2xl sm:rounded-3xl ring-1 ring-inset ring-white/10"
            aria-hidden="true"
          />

          {/* Reserved 16:9 Aspect Ratio Container to completely eliminate layout shifts */}
          <div className="relative w-full aspect-video overflow-hidden bg-[#080706] flex items-center justify-center">
            <video
              ref={videoRef}
              src="/videos/Evofox_gaming_controller.mp4"
              poster="/videos/evofox_poster.jpg"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="w-full h-full object-contain object-center block transform scale-[1.002] transition-transform duration-700 will-change-transform"
              aria-label="Evofox Gaming Controller Product Video"
            />

            {/* Subtle cinematic edge vignette */}
            <div
              className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#080706]/40 via-transparent to-[#080706]/30 z-[5]"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ControllerShowcase;
