import React from "react";
import { MagneticButton } from "../components/ui/MagneticButton";
import { Badge } from "../components/ui/Badge";
import { TypewriterText } from "../components/ui/TypewriterText";
import { useInViewAnimation } from "../hooks/useInViewAnimation";
import { ArrowRight, ShieldCheck, Calendar, Sparkles } from "lucide-react";

export const CTASection: React.FC = () => {
  const { ref: sectionRef, isInView, prefersReducedMotion } = useInViewAnimation<HTMLElement>({
    threshold: 0.15,
    rootMargin: "0px 0px -30px 0px",
    retrigger: true
  });

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const isVisible = prefersReducedMotion || isInView;

  return (
    <section
      ref={sectionRef}
      className="py-14 sm:py-18 md:py-20 relative z-10 bg-transparent border-t border-slate-200/70 overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-amber-300/20 via-yellow-200/15 to-amber-300/20 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div
          className={`mb-3.5 flex justify-center transition-all duration-500 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2.5 pointer-events-none"
          }`}
        >
          <Badge variant="gold">INITIALIZE YOUR ARCHITECTURE</Badge>
        </div>

        <h2
          className={`text-2xl sm:text-4xl md:text-5xl font-black font-heading text-slate-900 tracking-tight mb-3.5 leading-tight transition-all duration-700 delay-75 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
          }`}
        >
          LET&apos;S BUILD SOMETHING{" "}
          <TypewriterText
            text="EXTRAORDINARY."
            className="bg-gradient-to-r from-[#b45309] via-[#d97706] to-[#92400e] bg-clip-text text-transparent drop-shadow-[0_2px_18px_rgba(217,119,6,0.2)]"
          />
        </h2>

        <p
          className={`text-xs sm:text-sm md:text-base text-slate-600 max-w-2xl mx-auto mb-6 sm:mb-8 leading-relaxed transition-all duration-700 delay-150 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
          }`}
        >
          Have an ambitious idea, legacy system to modernize, or high-volume business dataset to untangle? Let&apos;s engineer a scalable, durable digital solution.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <MagneticButton
            variant="gold"
            onClick={() => scrollToSection("book-call")}
            className="!px-5 sm:!px-6 !py-2.5 sm:!py-3 text-xs sm:text-sm font-bold shadow-[0_8px_28px_rgba(245,158,11,0.3)]"
            cursorLabel="CALL"
          >
            <Calendar className="w-4 h-4 text-slate-950" />
            <span>Book a Discovery Call</span>
          </MagneticButton>

          <MagneticButton
            variant="secondary"
            onClick={() => scrollToSection("contact")}
            className="!px-5 sm:!px-6 !py-2.5 sm:!py-3 text-xs sm:text-sm font-semibold !border-amber-500/35 hover:!border-amber-500/80 hover:!text-amber-800"
            cursorLabel="INQUIRE"
          >
            <span>Send Direct Enquiry</span>
            <ArrowRight className="w-4 h-4 text-amber-600" />
          </MagneticButton>
        </div>

        <div className="mt-7 sm:mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-[11px] sm:text-xs text-slate-600 font-mono">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
            100% Client IP Ownership
          </span>
          <span>&bull;</span>
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            Guaranteed 12h Response
          </span>
          <span>&bull;</span>
          <span className="text-slate-700 font-semibold">
            Founded by Amit Halder
          </span>
        </div>
      </div>
    </section>
  );
};
