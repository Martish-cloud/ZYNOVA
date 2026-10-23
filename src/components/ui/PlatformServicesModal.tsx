import React, { useState, useEffect, useMemo } from "react";
import { createPortal } from "react-dom";
import type { FreelancePlatform, PlatformService } from "../../data/platforms";
import { useScrollLock } from "../../hooks/useScrollLock";
import {
  Upwork_Icon,
  Fiverr_Icon,
  Freelancer_Icon,
  PeoplePerHour_Icon,
  Truelancer_Icon
} from "../icons/PlatformIcons";
import { X, ExternalLink, ChevronDown, ChevronUp, Layers } from "lucide-react";

interface PlatformServicesModalProps {
  platform: FreelancePlatform | null;
  isOpen: boolean;
  onClose: () => void;
}

interface ServiceOption {
  number: string;
  label: string;
  url: string;
}

interface MergedServiceGroup {
  number: string;
  title: string;
  isDuplicate: boolean;
  options: ServiceOption[];
}

const iconMap: Record<string, React.FC<{ className?: string; size?: number }>> = {
  upwork: Upwork_Icon,
  fiverr: Fiverr_Icon,
  freelancer: Freelancer_Icon,
  peoplePerHour: PeoplePerHour_Icon,
  truelancer: Truelancer_Icon
};

const groupPlatformServices = (services: PlatformService[]): MergedServiceGroup[] => {
  const groupsMap = new Map<string, PlatformService[]>();

  for (const s of services) {
    const existing = groupsMap.get(s.title);
    if (existing) {
      existing.push(s);
    } else {
      groupsMap.set(s.title, [s]);
    }
  }

  const result: MergedServiceGroup[] = [];
  let groupIndex = 1;

  for (const [title, list] of groupsMap.entries()) {
    const groupNum = String(groupIndex).padStart(2, "0");
    groupIndex++;

    if (list.length === 1) {
      result.push({
        number: groupNum,
        title,
        isDuplicate: false,
        options: [
          {
            number: "01",
            label: title,
            url: list[0].url
          }
        ]
      });
    } else {
      const options: ServiceOption[] = list.map((item, idx) => {
        const optionNum = String(idx + 1).padStart(2, "0");
        let label = `${title} Service ${idx + 1}`;
        if (title.toLowerCase().includes("android/ios")) {
          label = `${title} — Service ${idx + 1}`;
        }
        return {
          number: optionNum,
          label,
          url: item.url
        };
      });

      result.push({
        number: groupNum,
        title,
        isDuplicate: true,
        options
      });
    }
  }

  return result;
};

export const PlatformServicesModal: React.FC<PlatformServicesModalProps> = ({
  platform,
  isOpen,
  onClose
}) => {
  const [expandedGroupTitle, setExpandedGroupTitle] = useState<string | null>(null);

  // Background scroll lock and Lenis freeze
  useScrollLock(isOpen);

  useEffect(() => {
    if (!isOpen) return;
    setExpandedGroupTitle(null);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const groupedServices = useMemo(() => {
    if (!platform || !platform.services) return [];
    return groupPlatformServices(platform.services);
  }, [platform]);

  if (!isOpen || !platform) return null;

  const IconComponent = iconMap[platform.id];

  const modalContent = (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-hidden"
      role="dialog"
      aria-modal="true"
      data-lenis-prevent="true"
      onWheel={(e) => {
        if (e.target === e.currentTarget) e.preventDefault();
      }}
      onTouchMove={(e) => {
        if (e.target === e.currentTarget) e.preventDefault();
      }}
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-md transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
        aria-hidden="true"
        data-lenis-prevent="true"
        style={{ touchAction: "none" }}
        onWheel={(e) => e.preventDefault()}
        onTouchMove={(e) => e.preventDefault()}
      />

      {/* Modal Container */}
      <div
        className="relative w-full max-w-lg bg-[#171410] border border-[#D0A04B]/25 rounded-2xl overflow-hidden z-10 transition-all my-auto flex flex-col text-[#D4CEC4] shadow-[0_24px_64px_rgba(0,0,0,0.8)]"
        style={{
          maxHeight: "min(88vh, 680px)",
          height: "auto"
        }}
        onClick={(e) => e.stopPropagation()}
        data-lenis-prevent="true"
      >
        {/* Header - Fixed & Never Scrolls */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 sm:py-4 border-b border-[#D0A04B]/20 bg-[#100D09] shrink-0">
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#201B14] border border-[#D0A04B]/25 flex items-center justify-center shadow-xs shrink-0"
              style={{ color: platform.brandColor }}
            >
              {IconComponent ? <IconComponent className="w-5 h-5 sm:w-6 sm:h-6" size={22} /> : null}
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold font-heading text-white tracking-wide uppercase">
                {platform.name} Services
              </h3>
              <p className="text-[10.5px] sm:text-xs text-[#D4CEC4] font-normal font-mono">
                Select a service to view on {platform.name}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-[#D4CEC4] hover:text-white rounded-lg hover:bg-[#201B14] transition-colors cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#D0A04B]"
            aria-label="Close modal"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Services List Content - Scrollable only when overflowing */}
        <div
          className="p-3.5 sm:p-5 overflow-y-auto flex-1 min-h-0 space-y-2.5 custom-scrollbar"
          style={{
            overscrollBehavior: "contain",
            WebkitOverflowScrolling: "touch"
          }}
          data-lenis-prevent="true"
        >
          {groupedServices.length === 0 ? (
            <div className="py-6 px-4 text-center rounded-xl bg-[#201B14]/60 border border-[#D0A04B]/20 space-y-2">
              <p className="text-sm font-semibold text-white">Direct Contract Engagement</p>
              <p className="text-xs text-[#D4CEC4] leading-relaxed">
                Connect directly through {platform.name} to initiate milestone-based contracts, hourly engagements, or custom scope requests.
              </p>
            </div>
          ) : null}
          {groupedServices.map((group) => {
            const isExpanded = expandedGroupTitle === group.title;

            // Unique service: open directly on click
            if (!group.isDuplicate) {
              return (
                <a
                  key={group.title}
                  href={group.options[0].url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/item flex items-center justify-between p-2.5 sm:p-3 rounded-xl bg-[#201B14] border border-[#D0A04B]/20 hover:border-[#D0A04B]/60 transition-all duration-200 cursor-pointer shadow-xs"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="font-mono text-xs font-bold text-[#D0A04B] px-2 py-0.5 rounded bg-[#100D09] border border-[#D0A04B]/30 shrink-0">
                      {group.number}
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-white group-hover/item:text-[#D0A04B] transition-colors truncate">
                      {group.title}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0 text-[#D4CEC4] group-hover/item:text-[#D0A04B] ml-2">
                    <span className="text-[10.5px] font-mono font-semibold hidden sm:inline">Open</span>
                    <ExternalLink className="w-3.5 h-3.5 transform group-hover/item:translate-x-0.5 group-hover/item:-translate-y-0.5 transition-transform" />
                  </div>
                </a>
              );
            }

            // Duplicated service: toggle sub-selection interface
            return (
              <div
                key={group.title}
                className={`rounded-xl border transition-all duration-200 overflow-hidden ${
                  isExpanded
                    ? "bg-[#201B14] !border-[#D0A04B]/60 shadow-[0_4px_20px_-4px_rgba(208,160,75,0.2)]"
                    : "bg-[#201B14] border-[#D0A04B]/20 hover:border-[#D0A04B]/60 shadow-xs"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setExpandedGroupTitle(isExpanded ? null : group.title)}
                  className="w-full flex items-center justify-between p-2.5 sm:p-3 cursor-pointer text-left focus:outline-none"
                >
                  <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                    <span className="font-mono text-xs font-bold text-[#D0A04B] px-2 py-0.5 rounded bg-[#100D09] border border-[#D0A04B]/30 shrink-0">
                      {group.number}
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-white hover:text-[#D0A04B] transition-colors truncate">
                      {group.title}
                    </span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#100D09] text-[#D0A04B] border border-[#D0A04B]/30 shrink-0 font-bold">
                      {group.options.length} Options
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0 text-[#D4CEC4] ml-2">
                    <span className="text-[10.5px] font-mono font-semibold hidden sm:inline">
                      {isExpanded ? "Hide" : "Select"}
                    </span>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-[#D0A04B]" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-[#D4CEC4]" />
                    )}
                  </div>
                </button>

                {/* Expanded Sub-Services Selection */}
                {isExpanded && (
                  <div className="px-2.5 sm:px-3 pb-3 pt-1 border-t border-[#D0A04B]/20 bg-[#100D09] space-y-2 animate-in fade-in duration-150">
                    <div className="text-[11px] font-mono font-bold text-[#D0A04B] px-1 pt-1 uppercase tracking-wider flex items-center gap-1.5">
                      <Layers className="w-3 h-3 text-[#D0A04B]" />
                      <span>Choose a Service:</span>
                    </div>
                    <div className="space-y-1.5">
                      {group.options.map((opt) => (
                        <a
                          key={opt.url}
                          href={opt.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/sub flex items-center justify-between p-2 sm:p-2.5 rounded-lg bg-[#171410] hover:bg-[#201B14] border border-[#D0A04B]/20 hover:border-[#D0A04B]/60 transition-all cursor-pointer"
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <span className="font-mono text-[11px] font-bold text-[#D0A04B] px-1.5 py-0.5 rounded bg-[#100D09] border border-[#D0A04B]/30 shrink-0">
                              {opt.number}
                            </span>
                            <span className="text-xs sm:text-sm font-semibold text-[#D4CEC4] group-hover/sub:text-[#D0A04B] transition-colors truncate">
                              {opt.label}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 shrink-0 text-[#D4CEC4] group-hover/sub:text-[#D0A04B] ml-2">
                            <span className="text-[10px] font-mono font-semibold">Open</span>
                            <ExternalLink className="w-3.5 h-3.5 transform group-hover/sub:translate-x-0.5 group-hover/sub:-translate-y-0.5 transition-transform" />
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer: View Full Profile */}
        <div className="p-3.5 sm:p-4 border-t border-[#D0A04B]/20 bg-[#100D09] shrink-0">
          <a
            href={platform.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 py-2 sm:py-2.5 px-4 rounded-xl bg-[#201B14] border border-[#D0A04B]/25 hover:border-[#D0A04B]/60 text-white hover:text-[#D0A04B] text-xs font-mono font-bold transition-all cursor-pointer group/prof shadow-xs"
          >
            <span>View {platform.name} Profile</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#D4CEC4] group-hover/prof:text-[#D0A04B]" />
          </a>
        </div>
      </div>
    </div>
  );

  return typeof document !== "undefined" ? createPortal(modalContent, document.body) : modalContent;
};
