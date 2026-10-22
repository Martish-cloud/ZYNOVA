import React from "react";
import type { ServiceItem } from "../data/services";
import { Modal } from "../components/ui/Modal";
import { MagneticButton } from "../components/ui/MagneticButton";
import { CheckCircle2, Sparkles, ArrowRight, Code } from "lucide-react";

interface ServiceModalProps {
  service: ServiceItem | null;
  isOpen: boolean;
  onClose: () => void;
  onSelectServiceForBooking: (serviceTitle: string) => void;
}

export const ServiceModal: React.FC<ServiceModalProps> = ({
  service,
  isOpen,
  onClose,
  onSelectServiceForBooking
}) => {
  if (!service) return null;

  const handleDiscuss = () => {
    onSelectServiceForBooking(service.title);
    onClose();
    const bookSection = document.getElementById("book-call");
    if (bookSection) {
      bookSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={service.title} maxWidth="max-w-2xl" theme="dark">
      <div className="space-y-6 text-[#F8F5EF]">
        {/* Number & Category Badge */}
        <div className="flex items-center justify-between text-xs font-mono pb-3 border-b border-white/12">
          <span className="text-[#D0A04B] font-bold tracking-wider">
            SERVICE #{service.number}
          </span>
          <span className="uppercase px-2.5 py-1 rounded-md bg-[#191713] border border-[#D0A04B]/30 text-[#C9C1B5] font-semibold text-[11px] tracking-wide">
            {service.category === "web-software" ? "Web & Software Development" : "Data & Business Solutions"}
          </span>
        </div>

        {/* Pricing Banner if configured */}
        {service.pricing && (
          <div className="p-4 rounded-xl bg-[#191713] border border-[#D0A04B]/35 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 shadow-sm">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#D0A04B] font-bold block">
                Standard Investment Range
              </span>
              <span className="text-lg sm:text-xl font-bold font-mono text-[#F8F5EF]">
                {service.pricing}
              </span>
            </div>
            {service.pricingNote && (
              <span className="text-xs text-[#C9C1B5] font-normal italic sm:text-right">
                *{service.pricingNote}
              </span>
            )}
          </div>
        )}

        {/* Detailed Overview */}
        <div>
          <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#9BD7FF] font-mono mb-2 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#9BD7FF]" />
            <span>Overview</span>
          </h4>
          <p className="text-sm sm:text-[15px] text-[#F8F5EF] font-normal leading-relaxed">
            {service.fullDesc}
          </p>
        </div>

        {/* Typical Deliverables */}
        <div>
          <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#9BD7FF] font-mono mb-3 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#D0A04B]" />
            <span>Typical Deliverables</span>
          </h4>
          <ul className="space-y-2.5 text-sm text-[#F8F5EF]">
            {service.deliverables.map((deliv, idx) => (
              <li
                key={idx}
                className="flex items-start gap-3 p-3 rounded-xl bg-[#191713] border border-white/10 hover:border-[#D0A04B]/35 transition-colors"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#D0A04B] shrink-0 mt-2" />
                <span className="text-xs sm:text-sm text-[#F8F5EF] leading-relaxed">{deliv}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Core Technologies & Standards */}
        <div>
          <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#9BD7FF] font-mono mb-2.5 flex items-center gap-2">
            <Code className="w-4 h-4 text-[#D0A04B]" />
            <span>Core Technologies &amp; Standards</span>
          </h4>
          <div className="flex flex-wrap gap-2">
            {service.technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#211E18] border border-[#D0A04B]/25 text-[#F8F5EF] hover:border-[#D0A04B]/50 transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Closing Action Footer */}
        <div className="pt-4 border-t border-white/12 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs text-[#C9C1B5] font-normal text-center sm:text-left">
            Ready to engineer this solution for your business?
          </span>
          <MagneticButton
            variant="gold"
            onClick={handleDiscuss}
            className="w-full sm:w-auto !py-3 !px-6 text-xs sm:text-sm font-bold !bg-[#D0A04B] hover:!bg-[#A9792E] !text-[#11100E] shadow-md shadow-[#D0A04B]/20"
            cursorLabel="DISCUSS"
          >
            <Sparkles className="w-4 h-4 text-[#11100E]" />
            <span>Discuss This Project</span>
            <ArrowRight className="w-4 h-4 text-[#11100E]" />
          </MagneticButton>
        </div>
      </div>
    </Modal>
  );
};

export default ServiceModal;
