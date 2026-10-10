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
      <div className="flex items-center gap-0.5 text-amber-500">
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
      <span className="text-[11px] font-mono font-bold text-amber-700 ml-0.5">
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
    rootMargin: "0px 0px -6% 0px",
    retrigger: true
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
      className="py-14 sm:py-18 md:py-20 relative z-10 bg-transparent border-t border-slate-200/70 overflow-hidden text-slate-800"
    >
      {/* Ambient background glow accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-b from-amber-300/15 via-yellow-200/10 to-transparent rounded-full blur-[150px] pointer-events-none z-0" />
      <div className="absolute -bottom-20 right-10 w-96 h-96 bg-amber-300/10 rounded-full blur-[120px] pointer-events-none z-0" />

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
                    className="h-full group relative flex flex-col justify-between rounded-2xl bg-gradient-to-b from-white/90 via-white/85 to-slate-50/85 border border-slate-200/80 hover:border-amber-400/60 backdrop-blur-xl p-4.5 sm:p-5 shadow-[0_12px_36px_rgba(15,23,42,0.06),inset_0_1px_0_rgba(255,255,255,0.95)] hover:shadow-[0_20px_50px_rgba(245,158,11,0.14)] transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01] overflow-hidden"
                  >
                    {/* Large Subtle Decorative Quotation Watermark */}
                    <span
                      aria-hidden="true"
                      className="absolute -top-3 right-4 font-serif text-6xl sm:text-7xl text-amber-500/[0.08] group-hover:text-amber-500/[0.15] transition-colors pointer-events-none select-none leading-none z-0"
                    >
                      &ldquo;
                    </span>

                    {/* Inner Card Top Content */}
                    <div className="relative z-10 space-y-3">
                      {/* Client Profile Header & Rating */}
                      <div className="flex items-start justify-between gap-3 border-b border-slate-200/80 pb-3">
                        <div className="flex items-center gap-2.5">
                          <ClientAvatar
                            name={item.name}
                            avatar={item.avatar}
                            image={item.image}
                          />

                          <div>
                            <h3 className="font-heading text-sm sm:text-base font-bold text-slate-900 group-hover:text-amber-700 transition-colors flex items-center gap-1.5">
                              <span>{item.name}</span>
                              {!item.isSample && (
                                <span
                                  title="Verified Client"
                                  className="text-amber-500 inline-flex items-center"
                                >
                                  <CheckCircle2 className="w-3.5 h-3.5" />
                                </span>
                              )}
                            </h3>
                            <p className="text-[11.5px] text-slate-600 font-medium">
                              {item.role}
                            </p>
                            <p className="text-[10.5px] font-mono text-slate-500 flex items-center gap-1 mt-0.5">
                              <span>{item.company}</span>
                              <span>&bull;</span>
                              <span>{item.flag}</span>
                            </p>
                          </div>
                        </div>

                        <RatingStars rating={item.rating} />
                      </div>

                      {/* Review Narrative Quote */}
                      <p className="text-xs text-slate-700 leading-relaxed italic font-sans font-normal pt-0.5">
                        &ldquo;{item.review}&rdquo;
                      </p>
                    </div>

                    {/* Card Footer: Service Pill Badge */}
                    <div className="relative z-10 pt-3.5 mt-3 border-t border-slate-200/80 flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10.5px] font-mono font-semibold bg-amber-50/90 text-amber-800 border border-amber-300/60 group-hover:border-amber-400 transition-colors">
                        {item.service.includes("📱") ? (
                          <span className="text-[11px] leading-none select-none">📱</span>
                        ) : (
                          <Sparkles className="w-3 h-3 text-amber-500" />
                        )}
                        <span>{item.service.replace("📱", "").trim()}</span>
                      </span>

                      <span className="text-[10.5px] font-mono text-slate-500">
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
        <div className="p-4 sm:p-5 rounded-xl bg-gradient-to-r from-white/90 via-amber-50/40 to-white/90 border border-amber-400/35 backdrop-blur-xl max-w-4xl mx-auto text-center shadow-[0_12px_32px_rgba(15,23,42,0.06)]">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-800 font-heading mb-2.5">
            <Globe2 className="w-4 h-4 text-amber-600" />
            <span>Supporting clients across India &amp; global markets</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {globalMarkets.map((market) => (
              <span
                key={market.name}
                className="px-2.5 py-1 rounded-lg bg-white border border-slate-200/90 text-[11px] font-mono text-slate-700 flex items-center gap-1.5 shadow-xs"
              >
                <span>{market.flag}</span>
                <span>{market.name}</span>
              </span>
            ))}
          </div>

          <p className="text-[10.5px] text-slate-600 font-mono mt-2.5">
            Available for remote collaboration, contract engagements, and international client projects.
          </p>
        </div>
      </div>
    </section>
  );
};

