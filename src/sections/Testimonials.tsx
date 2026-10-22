import React from "react";
import { SectionHeading } from "../components/ui/SectionHeading";
import { testimonialsData } from "../data/testimonials";
import { useInViewAnimation } from "../hooks/useInViewAnimation";
import { useCursor } from "../context/useCursor";
import { Star, CheckCircle2, Globe2, Sparkles } from "lucide-react";

const ClientAvatar: React.FC<{ name: string; avatar: string; image?: string }> = ({
  name,
  avatar,
  image
}) => {
  const [imgError, setImgError] = React.useState(false);

  return (
    <div className="relative w-10 h-10 rounded-full bg-gradient-to-tr from-amber-400 via-yellow-400 to-amber-600 p-[1.5px] shadow-[0_4px_12px_rgba(245,158,11,0.25)] shrink-0">
      <div className="w-full h-full rounded-full bg-amber-50 flex items-center justify-center overflow-hidden">
        {image && !imgError ? (
          <img
            src={image}
            alt={name}
            onError={() => setImgError(true)}
            className="w-full h-full rounded-full object-cover"
            loading="lazy"
          />
        ) : (
          <span className="font-heading font-extrabold text-xs text-transparent bg-gradient-to-r from-amber-700 via-amber-600 to-amber-800 bg-clip-text">
            {avatar}
          </span>
        )}
      </div>
    </div>
  );
};

const RatingStars: React.FC<{ rating: number }> = ({ rating }) => {
  return (
    <div className="flex items-center gap-1.5 shrink-0 pt-0.5">
      <div className="flex items-center gap-0.5 text-amber-400">
        {[1, 2, 3, 4, 5].map((starNum) => {
          const isFull = rating >= starNum;
          const isHalf = !isFull && rating >= starNum - 0.5;

          if (isFull) {
            return (
              <Star
                key={starNum}
                className="w-3.5 h-3.5 fill-amber-400 text-amber-400 drop-shadow-[0_0_4px_rgba(245,158,11,0.3)]"
              />
            );
          }
          if (isHalf) {
            return (
              <span key={starNum} className="relative inline-block w-3.5 h-3.5 overflow-hidden">
                <Star className="w-3.5 h-3.5 text-amber-400/35" />
                <span className="absolute inset-0 overflow-hidden w-[50%]">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 drop-shadow-[0_0_4px_rgba(245,158,11,0.3)]" />
                </span>
              </span>
            );
          }
          return (
            <Star
              key={starNum}
              className="w-3.5 h-3.5 text-amber-400/35"
            />
          );
        })}
      </div>
      <span className="text-[11px] font-mono font-bold text-amber-300 ml-0.5">
        {rating.toFixed(1)}
      </span>
    </div>
  );
};

export const Testimonials: React.FC = () => {
  const { setCursor, resetCursor } = useCursor();
  const {
    ref: gridRef,
    isInView: isGridInView,
    prefersReducedMotion
  } = useInViewAnimation<HTMLDivElement>({
    threshold: 0.14,
    rootMargin: "0px 0px -6% 0px"
  });

  const globalMarkets = [
    { name: "India", flag: "🇮🇳" },
    { name: "United Kingdom", flag: "🇬🇧" },
    { name: "United States", flag: "🇺🇸" },
    { name: "France", flag: "🇫🇷" }
  ];

  return (
    <section
      id="testimonials"
      className="py-14 sm:py-18 md:py-20 relative z-10 bg-transparent overflow-hidden text-white"
    >
      {/* Ambient background glow accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-b from-[#D0A04B]/10 via-[#100D09]/40 to-transparent rounded-full blur-[150px] pointer-events-none z-0" />
      <div className="absolute -bottom-20 right-10 w-96 h-96 bg-[#D0A04B]/5 rounded-full blur-[120px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <SectionHeading
          badge="CLIENT TESTIMONIALS"
          title="What Our Clients"
          highlightedTitle="Say."
          subtitle="Feedback from businesses and professionals who have worked with ZYNOVA across technology, automation, data analytics and digital solutions."
          badgeVariant="gold"
          subtitleVariant="ltr"
          align="center"
        />

        {/* Testimonials 3-Column Responsive Grid with Staggered Scroll Reveal */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mb-10 sm:mb-12"
        >
          {testimonialsData.map((item, index) => {
            const floatClass = ["animate-subtle-float-1", "animate-subtle-float-2", "animate-subtle-float-3", "animate-subtle-float-4"][index % 4];
            return (
              <div
                key={item.id}
                style={
                  !prefersReducedMotion
                    ? { transitionDelay: isGridInView ? `${index * 70}ms` : "0ms" }
                    : undefined
                }
                className={`h-full ${
                  !prefersReducedMotion
                    ? `transition-all duration-[650ms] ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[transform,opacity] ${
                        isGridInView
                          ? "opacity-100 translate-y-0 scale-100"
                          : "opacity-0 translate-y-5 scale-[0.97]"
                      }`
                    : ""
                }`}
              >
                <div className={`h-full ${floatClass}`}>
                  <div
                    onMouseEnter={() => setCursor("project", "READ")}
                    onMouseLeave={resetCursor}
                    className="h-full group relative flex flex-col justify-between rounded-2xl bg-[#171410] border border-[#D0A04B]/20 hover:border-[#D0A04B]/60 p-4.5 sm:p-5 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01] shadow-[0_4px_20px_rgba(0,0,0,0.35)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.6)] overflow-hidden"
                  >
                    {/* Large Subtle Decorative Quotation Watermark */}
                    <span
                      aria-hidden="true"
                      className="absolute -top-3 right-4 font-serif text-6xl sm:text-7xl text-[#D0A04B]/10 group-hover:text-[#D0A04B]/20 transition-colors pointer-events-none select-none leading-none z-0"
                    >
                      &ldquo;
                    </span>

                    {/* Inner Card Top Content */}
                    <div className="relative z-10 space-y-3">
                      {/* Client Profile Header & Rating */}
                      <div className="flex items-start justify-between gap-3 border-b border-[#D0A04B]/20 pb-3">
                        <div className="flex items-center gap-2.5">
                          <ClientAvatar
                            name={item.name}
                            avatar={item.avatar}
                            image={item.image}
                          />

                          <div>
                            <h3 className="font-heading text-sm sm:text-base font-bold text-white group-hover:text-[#D0A04B] transition-colors flex items-center gap-1.5">
                              <span>{item.name}</span>
                              {!item.isSample && (
                                <span
                                  title="Verified Client"
                                  className="text-[#D0A04B] inline-flex items-center"
                                >
                                  <CheckCircle2 className="w-3.5 h-3.5" />
                                </span>
                              )}
                            </h3>
                            <p className="text-[11.5px] text-[#9BD7FF] font-semibold">
                              {item.role}
                            </p>
                            <p className="text-[10.5px] font-mono text-[#D4CEC4] flex items-center gap-1 mt-0.5 font-normal">
                              <span>{item.company}</span>
                              <span>&bull;</span>
                              <span>{item.flag}</span>
                            </p>
                          </div>
                        </div>

                        <RatingStars rating={item.rating} />
                      </div>

                      {/* Review Narrative Quote */}
                      <p className="text-xs text-[#D4CEC4] leading-relaxed italic font-sans font-normal pt-0.5">
                        &ldquo;{item.review}&rdquo;
                      </p>
                    </div>

                    {/* Card Footer: Service Pill Badge */}
                    <div className="relative z-10 pt-3.5 mt-3 border-t border-[#D0A04B]/20 flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10.5px] font-mono font-bold bg-[#201B14] text-[#D0A04B] border border-[#D0A04B]/30 group-hover:border-[#D0A04B] transition-colors">
                        {item.service.includes("📱") ? (
                          <span className="text-[11px] leading-none select-none">📱</span>
                        ) : (
                          <Sparkles className="w-3 h-3 text-[#D0A04B]" />
                        )}
                        <span>{item.service.replace("📱", "").trim()}</span>
                      </span>

                      <span className="text-[10.5px] font-mono text-[#D4CEC4] font-medium">
                        {item.country}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Global Market Footprint Trust Indicator */}
        <div className="p-4 sm:p-5 rounded-xl bg-[#171410] border border-[#D0A04B]/25 shadow-sm max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 text-xs font-bold text-white font-heading mb-2.5">
            <Globe2 className="w-4 h-4 text-[#D0A04B]" />
            <span>Supporting clients across India &amp; global markets</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {globalMarkets.map((market) => (
              <span
                key={market.name}
                className="px-2.5 py-1 rounded-lg bg-[#201B14] border border-[#D0A04B]/20 text-[11px] font-mono text-[#D4CEC4] font-medium flex items-center gap-1.5 shadow-xs"
              >
                <span>{market.flag}</span>
                <span>{market.name}</span>
              </span>
            ))}
          </div>

          <p className="text-[10.5px] text-[#D4CEC4]/80 font-mono font-normal mt-2.5">
            Available for remote collaboration, contract engagements, and international client projects.
          </p>
        </div>
      </div>
    </section>
  );
};

