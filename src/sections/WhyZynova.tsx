import React, { useEffect, useRef } from "react";
import { SectionHeading } from "../components/ui/SectionHeading";
import { useInViewAnimation } from "../hooks/useInViewAnimation";
import { useCursor } from "../context/useCursor";
import { ScrollHighlightList } from "../components/motion/ScrollHighlightList";
import type { ScrollHighlightItem } from "../components/motion/ScrollHighlightList";
import { StaggerGrid } from "../components/motion/StaggerGrid";
import { Clock, Cpu, Target, ShieldCheck } from "lucide-react";

const HIGHLIGHT_STATEMENTS: ScrollHighlightItem[] = [
  {
    id: 1,
    label: "Guaranteed 6-Hour Communication Turnaround",
    subtext: "Proactive project tracking across milestones with clear, zero-ambiguity status reporting across time zones.",
    tag: "RESPONSIVENESS"
  },
  {
    id: 2,
    label: "100% Client Source Code & Asset Ownership",
    subtext: "Every repository, Docker image, database schema, and Figma file belongs strictly to you upon milestone delivery.",
    tag: "IP OWNERSHIP"
  },
  {
    id: 3,
    label: "Typed, Cloud-Native, Production-Grade Engineering",
    subtext: "Built using strict TypeScript, modern frameworks, and scalable cloud architectures designed for velocity.",
    tag: "ARCHITECTURE"
  },
  {
    id: 4,
    label: "Tied Directly to Measurable Commercial Outcomes",
    subtext: "Technology engineered to drive conversions, automate repetitive manual workflows, and scale your business.",
    tag: "BUSINESS ROI"
  }
];

export const WhyZynova: React.FC = () => {
  const { setCursor, resetCursor } = useCursor();
  const sectionRef = useRef<HTMLElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const {
    ref: cardsRef,
  } = useInViewAnimation<HTMLDivElement>({
    threshold: 0.15,
    rootMargin: "0px 0px -6% 0px"
  });

  // Efficient playback observer: plays videos when section approaches viewport, pauses off-screen
  useEffect(() => {
    const sectionEl = sectionRef.current;
    if (!sectionEl) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            videoRefs.current.forEach((video) => {
              if (video && video.paused) {
                const playPromise = video.play();
                if (playPromise !== undefined) {
                  playPromise.catch(() => {
                    // Autoplay policy safely handled
                  });
                }
              }
            });
          } else {
            videoRefs.current.forEach((video) => {
              if (video && !video.paused) {
                video.pause();
              }
            });
          }
        });
      },
      { threshold: 0.05, rootMargin: "150px 0px" }
    );

    observer.observe(sectionEl);

    return () => {
      observer.disconnect();
      videoRefs.current.forEach((video) => {
        if (video) video.pause();
      });
    };
  }, []);

  const reasons = [
    {
      number: "01",
      icon: Clock,
      title: "First Communication",
      highlight: "6h Response Guarantee",
      description: "Typical response time within 6 hours. Clear, proactive communication across project milestones with zero ambiguity.",
      accent: "from-amber-500/20 to-yellow-500/20",
      iconColor: "text-amber-300",
      videoSrc: "/videos/why_us/Fast%20Communication.mp4"
    },
    {
      number: "02",
      icon: Cpu,
      title: "Modern Technology",
      highlight: "Typed & Cloud-Native",
      description: "Solutions built using modern development, AI pipelines, and automation technologies designed for optimal velocity and durability.",
      accent: "from-yellow-500/20 to-amber-500/20",
      iconColor: "text-amber-300",
      videoSrc: "/videos/why_us/Modern%20Technology.mp4"
    },
    {
      number: "03",
      icon: Target,
      title: "Business Focused",
      highlight: "Tied to Real Outcomes",
      description: "Technology is designed around practical business requirements — ensuring your software drives real conversions, operational speed, and savings.",
      accent: "from-amber-500/20 to-yellow-500/20",
      iconColor: "text-amber-300",
      videoSrc: "/videos/why_us/Business-Focused.mp4"
    },
    {
      number: "04",
      icon: ShieldCheck,
      title: "Client Ownership",
      highlight: "100% Code & Asset Rights",
      description: "100% client ownership. Every line of code, design asset, and cloud configuration belongs entirely to you upon completion.",
      accent: "from-yellow-500/20 to-amber-500/20",
      iconColor: "text-amber-300",
      videoSrc: "/videos/why_us/Client%20Ownership.mp4"
    }
  ];

  return (
    <section ref={sectionRef} className="py-14 sm:py-18 md:py-20 relative z-10 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="WHY WORK WITH ZYNOVA"
          title="Engineered for Reliability and"
          highlightedTitle="Predictable Success."
          subtitle="We eliminate the uncertainty of software development through transparent milestones, fast communication, and modern engineering standards."
          subtitleVariant="ltr"
        />

        {/* 4 Core Pillars Grid */}
        <div ref={cardsRef}>
          <StaggerGrid stagger={0.08} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-4.5 lg:gap-5">
            {reasons.map((r, idx) => {
              const Icon = r.icon;
              return (
                <div
                  key={r.number}
                  tabIndex={0}
                  role="region"
                  aria-label={r.title}
                  onMouseEnter={() => setCursor("project", r.title)}
                  onMouseLeave={resetCursor}
                  className="h-full group relative p-5 sm:p-5.5 rounded-xl bg-[#171410] border border-[#D0A04B]/20 hover:border-[#D0A04B]/60 shadow-[0_4px_20px_rgba(0,0,0,0.35)] hover:shadow-[0_8px_32px_rgba(208,160,75,0.18)] transition-all duration-300 flex flex-col justify-between focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D0A04B] cursor-pointer overflow-hidden min-h-[350px] sm:min-h-[390px]"
                >
                  {/* Card Background Video: 70% opacity, contained within rounded card boundary */}
                  <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
                    <video
                      ref={(el) => {
                        videoRefs.current[idx] = el;
                      }}
                      src={r.videoSrc}
                      muted
                      playsInline
                      loop
                      preload="metadata"
                      className="w-full h-full object-cover object-center opacity-70 filter brightness-[0.85] contrast-[1.05] transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    {/* Subtle dark gradient overlay: clear in middle for video visibility, darker at bottom for crisp text contrast */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#171410]/95 via-[#171410]/35 to-[#171410]/55 pointer-events-none" />
                  </div>

                  {/* Foreground Content Layer */}
                  <div className="relative z-10 flex flex-col justify-between h-full">
                    {/* Top Bar: Number (slashes removed) & Category Icon */}
                    <div className="flex items-center justify-between mb-auto">
                      <span className="font-mono text-xs font-bold text-[#D0A04B] px-2 py-0.5 rounded bg-[#201B14]/80 border border-[#D0A04B]/25 backdrop-blur-xs">
                        {r.number}
                      </span>
                      <div className="p-2 sm:p-2.5 rounded-lg bg-[#201B14]/85 border border-[#D0A04B]/35 group-hover:scale-105 transition-all duration-300 shadow-sm backdrop-blur-xs">
                        <Icon className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#D0A04B]" />
                      </div>
                    </div>

                    {/* Middle clearance area keeping video clearly visible */}
                    <div className="min-h-[100px] sm:min-h-[130px]" aria-hidden="true" />

                    {/* Compact Bottom Group: Title, Highlight Badge, and Description */}
                    <div className="pt-2">
                      <h3 className="text-sm sm:text-base font-bold font-heading text-white mb-1 group-hover:text-[#D0A04B] transition-colors leading-snug">
                        {r.title}
                      </h3>

                      <div className="inline-block text-[10px] sm:text-[10.5px] font-mono px-2 py-0.5 rounded bg-[#D0A04B]/15 text-[#D0A04B] mb-2 border border-[#D0A04B]/35 font-bold shadow-xs backdrop-blur-xs">
                        {r.highlight}
                      </div>

                      <p className="text-[11px] sm:text-xs text-[#D4CEC4] font-normal leading-relaxed">
                        {r.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </StaggerGrid>
        </div>

        {/* Dynamic Scroll-Highlighted Guarantees */}
        <div className="mt-12 sm:mt-16 max-w-3xl mx-auto">
          <div className="text-center mb-6">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#D0A04B] font-bold">
              // SCROLL-ACTIVE COMMITMENTS
            </span>
            <h4 className="text-lg sm:text-xl font-bold font-heading text-white mt-1">
              Guarantees That Anchor Every Project
            </h4>
          </div>
          <ScrollHighlightList items={HIGHLIGHT_STATEMENTS} theme="dark" />
        </div>
      </div>
    </section>
  );
};

export default WhyZynova;
