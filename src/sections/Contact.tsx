import React from "react";
import { siteConfig } from "../config/siteConfig";
import { MagneticButton } from "../components/ui/MagneticButton";
import { WhatsAppIcon } from "../components/ui/WhatsAppIcon";
import { WhatsAppQR } from "../components/ui/WhatsAppQR";

interface ContactProps {
  onSuccess?: (title: string, desc: string) => void;
}

export const Contact: React.FC<ContactProps> = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 sm:pb-18 md:pb-20 relative z-10">
      {/* WhatsApp Community / Group Card */}
      <div className="rounded-2xl bg-[#171410] border border-[#D0A04B]/25 p-5 sm:p-6 lg:p-7 transition-all duration-300 shadow-[0_4px_25px_rgba(0,0,0,0.4)]">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Left Side (Desktop) / Top (Mobile): Heading, Description, CTA Button */}
          <div className="md:col-span-7 lg:col-span-8 space-y-3 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D0A04B]/15 border border-[#D0A04B]/40 text-[11px] font-mono font-bold text-[#E5B558]">
              <WhatsAppIcon className="w-3.5 h-3.5 text-[#25D366]" />
              <span>OFFICIAL WHATSAPP COMMUNITY &amp; CHAT</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black font-heading tracking-tight text-[#FFFFFF]">
              CONNECT WITH ZYNOVA ON WHATSAPP
            </h3>

            <p className="text-xs sm:text-sm text-[#D4CEC4] font-normal leading-relaxed max-w-xl">
              Connect with ZYNOVA on WhatsApp for 1-on-1 project consultations, requirements discussions, updates, and direct communication.
            </p>

            <div className="pt-1.5 flex flex-wrap gap-3">
              <MagneticButton
                asAnchor
                href={siteConfig.whatsappChatURL}
                target="_blank"
                rel="noopener noreferrer"
                variant="gold"
                className="w-full sm:w-auto !py-2.5 sm:!py-3 !px-5 sm:!px-6 text-xs sm:text-sm font-bold shadow-[0_8px_25px_rgba(181,138,69,0.25)] cursor-pointer"
                cursorLabel="CHAT"
                aria-label="Chat directly on WhatsApp with ZYNOVA"
              >
                <WhatsAppIcon className="w-4 h-4 text-slate-950" />
                <span>CHAT 1-ON-1 ON WHATSAPP &rarr;</span>
              </MagneticButton>

              <MagneticButton
                asAnchor
                href={siteConfig.whatsappGroupURL}
                target="_blank"
                rel="noopener noreferrer"
                variant="outline"
                className="w-full sm:w-auto !py-2.5 sm:!py-3 !px-5 sm:!px-6 text-xs sm:text-sm font-bold border-[#D0A04B]/40 text-[#D0A04B] hover:bg-[#D0A04B]/10 cursor-pointer"
                cursorLabel="GROUP"
                aria-label="Join the ZYNOVA WhatsApp community group"
              >
                <span>JOIN WHATSAPP GROUP</span>
              </MagneticButton>
            </div>
          </div>

          {/* Right Side (Desktop) / Bottom (Mobile): QR Code Card */}
          <div className="md:col-span-5 lg:col-span-4 flex justify-center md:justify-end">
            <WhatsAppQR size={140} />
          </div>
        </div>
      </div>
    </div>
  );
};
