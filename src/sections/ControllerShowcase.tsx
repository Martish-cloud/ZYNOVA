import React, { useRef, useEffect } from "react";

export const ControllerShowcase: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    // Autoplay when section enters viewport; pause when scrolled out of view to conserve GPU
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {
              // Gracefully handle strict browser autoplay policies
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
      className="relative w-full min-h-[75vh] md:min-h-[85vh] lg:min-h-[92vh] overflow-hidden flex items-center justify-center text-white"
      style={{
        // Seamless matching background gradient matching the Evofox video's studio blue lighting
        background: "radial-gradient(ellipse 85% 75% at 50% 50%, #3e629b 0%, #253b62 45%, #182845 75%, #0f192b 100%)",
      }}
      aria-label="Evofox Gaming Controller Showcase"
    >
      {/* Edge-to-Edge Seamless Video Stage - No floating card, no card borders, no panel shadows */}
      <div
        className="relative w-full max-w-[1400px] aspect-video max-h-[90vh] overflow-hidden flex items-center justify-center"
        style={{
          // Soft edge blending that dissolves video edges seamlessly into the section background
          maskImage: "radial-gradient(ellipse 96% 94% at 50% 50%, black 82%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 96% 94% at 50% 50%, black 82%, transparent 100%)",
        }}
      >
        <video
          ref={videoRef}
          src="/videos/Evofox_gaming_controller.mp4"
          poster="/videos/evofox_poster.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          // Height set to 104.5% with top alignment to cleanly crop out the bottom-right watermark without distorting or zooming in on the controller
          className="w-full h-[104.5%] object-cover object-[center_top] block will-change-transform"
          aria-label="Evofox Gaming Controller Product Video"
        />
      </div>
    </section>
  );
};

export default ControllerShowcase;
