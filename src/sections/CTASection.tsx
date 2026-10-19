import React from "react";
import { MagneticButton } from "../components/ui/MagneticButton";
import { Badge } from "../components/ui/Badge";
import { TypewriterText } from "../components/ui/TypewriterText";
import { useInViewAnimation } from "../hooks/useInViewAnimation";
import { ArrowRight, ShieldCheck, Calendar, Sparkles } from "lucide-react";

export const CTASection: React.FC = () => {
  const { ref: sectionRef, isInView, triggerCount, prefersReducedMotion } = useInViewAnimation<HTMLElement>({
    threshold: 0.16,
    rootMargin: "0px 0px -6% 0px"
  });

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const isVisible = prefersReducedMotion || isInView;

  return (
    <section
      ref={sectionRef}
      className="py-14 sm:py-18 md:py-20 relative z-10 bg-transparent border-t border-[#E5D9C8] overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-[#B58A45]/15 via-[#F0E4D2]/30 to-[#B58A45]/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="rounded-3xl liquid-glass-panel !bg-white/95 border border-[#E5D9C8] p-7 sm:p-10 md:p-12 shadow-sm">
          <div
            className={`mb-3.5 flex justify-center transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2.5 pointer-events-none"
            }`}
          >
            <Badge variant="gold">INITIALIZE YOUR ARCHITECTURE</Badge>
          </div>

          <h2
            className={`text-2xl sm:text-4xl md:text-5xl font-black font-heading text-[#292720] tracking-tight mb-3.5 leading-tight transition-all duration-700 delay-75 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
            }`}
          >
            LET&apos;S BUILD SOMETHING{" "}
            <TypewriterText
              text="EXTRAORDINARY."
              isActive={isVisible}
              triggerKey={triggerCount}
              inline={true}
              startDelayMs={220}
              durationMs={750}
              cursorColorClass="bg-[#B58A45]"
              className="bg-gradient-to-r from-[#B58A45] via-[#C99D57] to-[#8C6527] bg-clip-text text-transparent"
            />
          </h2>

          <p
            className={`text-xs sm:text-sm md:text-base text-[#574F44] font-normal max-w-2xl mx-auto mb-6 sm:mb-8 leading-relaxed transition-all duration-700 delay-150 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isVisible ? "opacity-100 translate-x-0 translate-y-0" : "opacity-0 -translate-x-4 translate-y-2.5"
            }`}
          >
            Have an ambitious idea, legacy system to modernize, or high-volume business dataset to untangle? Let&apos;s engineer a scalable, durable digital solution.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <MagneticButton
              variant="gold"
              onClick={() => scrollToSection("book-call")}
              className="!px-5 sm:!px-6 !py-2.5 sm:!py-3 text-xs sm:text-sm font-bold shadow-md shadow-[#B58A45]/20"
              cursorLabel="CALL"
            >
              <Calendar className="w-4 h-4 text-white" />
              <span>Book a Discovery Call</span>
            </MagneticButton>

            <MagneticButton
              variant="secondary"
              onClick={() => scrollToSection("contact")}
              className="!px-5 sm:!px-6 !py-2.5 sm:!py-3 text-xs sm:text-sm font-semibold !border-[#E5D9C8] hover:!border-[#B58A45] hover:!text-[#B58A45] !text-[#292720] !bg-white shadow-xs"
              cursorLabel="INQUIRE"
            >
              <span>Send Direct Enquiry</span>
              <ArrowRight className="w-4 h-4 text-[#B58A45]" />
            </MagneticButton>
          </div>

          <div className="mt-7 sm:mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-[11px] sm:text-xs text-[#756C60] font-mono font-normal">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#B58A45]" />
              100% Client IP Ownership
            </span>
            <span>&bull;</span>
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#B58A45]" />
              Guaranteed 12h Response
            </span>
            <span>&bull;</span>
            <span className="text-[#292720] font-bold">
              Founded by Amit Halder
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
