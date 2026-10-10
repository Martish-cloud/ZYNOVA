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
    <Modal isOpen={isOpen} onClose={onClose} title={service.title} maxWidth="max-w-2xl">
      <div className="space-y-6">
        {/* Number & Category */}
        <div className="flex items-center justify-between text-xs font-mono text-slate-700 pb-2 border-b border-white/60">
          <span className="text-amber-800 font-bold tracking-wider">
            SERVICE #{service.number}
          </span>
          <span className="uppercase px-2.5 py-1 rounded liquid-glass-subcard text-slate-800 font-bold">
            {service.category === "web-software" ? "Web & Software Development" : "Data & Business Solutions"}
          </span>
        </div>

        {/* Pricing Banner if available */}
        {service.pricing && (
          <div className="p-3.5 rounded-xl liquid-glass-subcard border-amber-400/50 flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow-xs">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-amber-800 font-bold block">
                Standard Investment Range
              </span>
              <span className="text-lg sm:text-xl font-bold font-mono text-amber-900">
                {service.pricing}
              </span>
            </div>
            {service.pricingNote && (
              <span className="text-xs text-slate-700 font-medium font-sans italic sm:text-right">
                *{service.pricingNote}
              </span>
            )}
          </div>
        )}

        {/* Detailed Description */}
        <div>
          <h4 className="text-sm font-bold uppercase tracking-wider text-slate-800 font-mono mb-2">
            Overview
          </h4>
          <p className="text-sm sm:text-base text-slate-800 font-medium leading-relaxed">
            {service.fullDesc}
          </p>
        </div>

        {/* Deliverables List */}
        <div>
          <h4 className="text-sm font-bold uppercase tracking-wider text-slate-800 font-mono mb-3 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-amber-600" />
            <span>Typical Deliverables</span>
          </h4>
          <ul className="space-y-2 text-sm text-slate-800 font-medium">
            {service.deliverables.map((deliv, idx) => (
              <li key={idx} className="flex items-start gap-2.5 p-2 rounded-lg liquid-glass-subcard">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-2" />
                <span className="text-xs sm:text-sm">{deliv}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Technologies */}
        <div>
          <h4 className="text-sm font-bold uppercase tracking-wider text-slate-800 font-mono mb-2.5 flex items-center gap-2">
            <Code className="w-4 h-4 text-amber-600" />
            <span>Core Technologies &amp; Standards</span>
          </h4>
          <div className="flex flex-wrap gap-2">
            {service.technologies.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 rounded-md text-xs font-semibold liquid-glass-subcard text-slate-800"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="pt-4 border-t border-white/60 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs text-slate-800 font-medium">
            Ready to engineer this solution for your business?
          </span>
          <MagneticButton
            variant="primary"
            onClick={handleDiscuss}
            className="w-full sm:w-auto !py-3 !px-6 text-sm font-bold"
            cursorLabel="DISCUSS"
          >
            <Sparkles className="w-4 h-4 text-slate-950" />
            <span>Discuss This Project</span>
            <ArrowRight className="w-4 h-4" />
          </MagneticButton>
        </div>
      </div>
    </Modal>
  );
};
