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
import { ExternalLink, Layers } from "lucide-react";

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

  return (
    <section id="platforms" className="py-14 sm:py-18 md:py-20 relative z-10 bg-transparent border-t border-slate-200/70">
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
            const url = plat.hasServiceList ? undefined : siteConfig.freelancePlatforms[plat.configKey];
            const IconComponent = platformIconMap[plat.id];

            const cardContent = (
              <>
                {/* Brand Color Ambient Glow on Hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none rounded-xl"
                  style={{ backgroundColor: plat.brandColor }}
                />

                {/* Top-right Indicator Icon */}
                <div className="absolute top-2.5 right-2.5 text-slate-400 group-hover:text-amber-600 transition-colors">
                  {plat.hasServiceList ? (
                    <Layers className="w-3.5 h-3.5 text-amber-500" />
                  ) : (
                    <ExternalLink className="w-3.5 h-3.5" />
                  )}
                </div>

                {/* Prominent Platform Brand Icon */}
                <div
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-slate-900/95 border border-slate-800 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:border-amber-400/50 shadow-sm mb-2.5"
                  style={{ color: plat.brandColor }}
                >
                  {IconComponent ? <IconComponent className="w-6 h-6 sm:w-7 sm:h-7" size={28} /> : null}
                </div>

                {/* Clean Platform Name */}
                <span className="font-heading font-bold text-xs sm:text-sm text-slate-800 group-hover:text-amber-700 transition-colors tracking-wide">
                  {plat.name}
                </span>

                {plat.hasServiceList && (
                  <span className="text-[9px] font-mono text-amber-600 mt-1 font-semibold tracking-tight">
                    View Services
                  </span>
                )}
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
                  className="group relative p-4 sm:p-5 rounded-xl bg-white/80 border border-slate-200/80 hover:border-amber-400/60 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 shadow-[0_8px_24px_rgba(15,23,42,0.05),inset_0_1px_0_rgba(255,255,255,0.9)] hover:shadow-[0_20px_40px_-15px_rgba(245,158,11,0.18)] flex flex-col items-center justify-center text-center cursor-pointer overflow-hidden w-full"
                >
                  {cardContent}
                </button>
              );
            }

            return (
              <a
                key={plat.name}
                href={url}
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => setCursor("project", plat.name)}
                onMouseLeave={resetCursor}
                className="group relative p-4 sm:p-5 rounded-xl bg-white/80 border border-slate-200/80 hover:border-amber-400/60 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 shadow-[0_8px_24px_rgba(15,23,42,0.05),inset_0_1px_0_rgba(255,255,255,0.9)] hover:shadow-[0_20px_40px_-15px_rgba(245,158,11,0.18)] flex flex-col items-center justify-center text-center cursor-pointer overflow-hidden"
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
