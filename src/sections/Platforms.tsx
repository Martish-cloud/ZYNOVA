import React, { useState } from "react";
import { platformsData } from "../data/platforms";
import type { FreelancePlatform } from "../data/platforms";
import { siteConfig } from "../config/siteConfig";
import { SectionHeading } from "../components/ui/SectionHeading";
import { PlatformServicesModal } from "../components/ui/PlatformServicesModal";
import { useCursor } from "../context/useCursor";
import {
  Upwork_Icon,
  Fiverr_Icon,
  Freelancer_Icon,
  PeoplePerHour_Icon,
  Truelancer_Icon
} from "../components/icons/PlatformIcons";
import { ExternalLink, Layers, ArrowRight } from "lucide-react";

const platformIconMap: Record<string, React.FC<{ className?: string; size?: number }>> = {
  upwork: Upwork_Icon,
  fiverr: Fiverr_Icon,
  freelancer: Freelancer_Icon,
  peoplePerHour: PeoplePerHour_Icon,
  truelancer: Truelancer_Icon
};

export const Platforms: React.FC = () => {
  const { setCursor, resetCursor } = useCursor();
  const [selectedPlatform, setSelectedPlatform] = useState<FreelancePlatform | null>(null);

  const handleCardClick = (plat: FreelancePlatform, e: React.MouseEvent) => {
    if (plat.hasServiceList) {
      e.preventDefault();
      resetCursor();
      setSelectedPlatform(plat);
    }
  };

  const scrollToContact = () => {
    const el = document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="platforms" className="py-14 sm:py-18 md:py-20 relative z-10 bg-transparent border-t border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="FIND US ONLINE"
          title="Available on Leading"
          highlightedTitle="Freelance &amp; Contract Hubs."
          subtitle="ZYNOVA is available through leading freelancing platforms, providing flexible escrow security and milestone-based engagements worldwide."
        />

        {/* Icons-Only Platform Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 max-w-5xl mx-auto">
          {platformsData.map((plat) => {
            const rawUrl = plat.hasServiceList ? undefined : siteConfig.freelancePlatforms[plat.configKey];
            const hasExternalUrl = Boolean(rawUrl && rawUrl !== "#");
            const IconComponent = platformIconMap[plat.id];

            const cardContent = (
              <>
                {/* Brand Color Ambient Glow on Hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none rounded-xl"
                  style={{ backgroundColor: plat.brandColor }}
                />

                {/* Top-right Indicator Icon */}
                <div className="absolute top-2.5 right-2.5 text-slate-400 group-hover:text-amber-300 transition-colors">
                  {plat.hasServiceList ? (
                    <Layers className="w-3.5 h-3.5 text-amber-300" />
                  ) : hasExternalUrl ? (
                    <ExternalLink className="w-3.5 h-3.5" />
                  ) : (
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-300" />
                  )}
                </div>

                {/* Prominent Platform Brand Icon */}
                <div
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-white/[0.14] border border-white/25 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:border-amber-300 shadow-sm mb-2.5"
                  style={{ color: plat.brandColor }}
                >
                  {IconComponent ? <IconComponent className="w-6 h-6 sm:w-7 sm:h-7" size={28} /> : null}
                </div>

                {/* Clean Platform Name */}
                <span className="font-heading font-bold text-xs sm:text-sm text-white group-hover:text-amber-300 transition-colors tracking-wide">
                  {plat.name}
                </span>

                {plat.hasServiceList ? (
                  <span className="text-[9px] font-mono text-amber-300 mt-1 font-bold tracking-tight">
                    View Services
                  </span>
                ) : !hasExternalUrl ? (
                  <span className="text-[9px] font-mono text-slate-400 group-hover:text-amber-300 mt-1 font-semibold tracking-tight">
                    Contract on Request
                  </span>
                ) : null}
              </>
            );

            if (plat.hasServiceList) {
              return (
                <button
                  key={plat.name}
                  type="button"
                  onClick={(e) => handleCardClick(plat, e)}
                  onMouseEnter={() => setCursor("project", "SERVICES")}
                  onMouseLeave={resetCursor}
                  className="group relative p-4 sm:p-5 rounded-xl liquid-glass-card hover:border-amber-400/60 transition-all duration-300 hover:-translate-y-1.5 flex flex-col items-center justify-center text-center cursor-pointer overflow-hidden w-full"
                >
                  {cardContent}
                </button>
              );
            }

            if (!hasExternalUrl) {
              return (
                <button
                  key={plat.name}
                  type="button"
                  onClick={scrollToContact}
                  onMouseEnter={() => setCursor("project", "ENQUIRE")}
                  onMouseLeave={resetCursor}
                  className="group relative p-4 sm:p-5 rounded-xl liquid-glass-card hover:border-amber-400/60 transition-all duration-300 hover:-translate-y-1.5 flex flex-col items-center justify-center text-center cursor-pointer overflow-hidden w-full"
                  aria-label={`${plat.name} contract available on request - contact ZYNOVA`}
                >
                  {cardContent}
                </button>
              );
            }

            return (
              <a
                key={plat.name}
                href={rawUrl}
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => setCursor("project", plat.name)}
                onMouseLeave={resetCursor}
                className="group relative p-4 sm:p-5 rounded-xl liquid-glass-card hover:border-amber-400/60 transition-all duration-300 hover:-translate-y-1.5 flex flex-col items-center justify-center text-center cursor-pointer overflow-hidden"
              >
                {cardContent}
              </a>
            );
          })}
        </div>
      </div>

      {/* Platform Services Modal for Upwork / Fiverr */}
      <PlatformServicesModal
        platform={selectedPlatform}
        isOpen={!!selectedPlatform}
        onClose={() => setSelectedPlatform(null)}
      />
    </section>
  );
};
