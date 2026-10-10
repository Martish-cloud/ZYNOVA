import React, { useState, useEffect, useMemo } from "react";
import { createPortal } from "react-dom";
import type { FreelancePlatform, PlatformService } from "../../data/platforms";
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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      setExpandedGroupTitle(null);
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = originalOverflow;
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [isOpen, onClose]);

  const groupedServices = useMemo(() => {
    if (!platform || !platform.services) return [];
    return groupPlatformServices(platform.services);
  }, [platform]);

  if (!isOpen || !platform) return null;

  const IconComponent = iconMap[platform.id];

  const modalContent = (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/35 backdrop-blur-md transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Container */}
      <div
        className="relative w-full max-w-lg bg-white/95 backdrop-blur-2xl border border-slate-200/90 rounded-2xl shadow-[0_24px_60px_-15px_rgba(15,23,42,0.18),0_0_40px_rgba(245,158,11,0.08)] overflow-hidden z-10 transition-all my-auto max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 sm:py-4 border-b border-slate-200/90 bg-slate-50/80 shrink-0">
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center shadow-sm shrink-0"
              style={{ color: platform.brandColor }}
            >
              {IconComponent ? <IconComponent className="w-5 h-5 sm:w-6 sm:h-6" size={22} /> : null}
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold font-heading text-slate-900 tracking-wide uppercase">
                {platform.name} Services
              </h3>
              <p className="text-[10.5px] sm:text-xs text-slate-500 font-mono">
                Select a service to view on {platform.name}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-500 hover:text-slate-900 rounded-lg hover:bg-slate-200/70 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Services List Content */}
        <div className="p-3.5 sm:p-5 overflow-y-auto space-y-2.5">
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
                  className="group/item flex items-center justify-between p-2.5 sm:p-3 rounded-xl bg-slate-50/90 hover:bg-white border border-slate-200/90 hover:border-amber-500/50 transition-all duration-200 cursor-pointer shadow-sm"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="font-mono text-xs font-bold text-amber-700 px-2 py-0.5 rounded bg-amber-50 border border-amber-300/60 shrink-0">
                      {group.number}
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-slate-800 group-hover/item:text-amber-800 transition-colors truncate">
                      {group.title}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0 text-slate-500 group-hover/item:text-amber-700 ml-2">
                    <span className="text-[10.5px] font-mono font-medium hidden sm:inline">Open</span>
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
                    ? "bg-white border-amber-500/50 shadow-[0_4px_20px_-4px_rgba(245,158,11,0.12)]"
                    : "bg-slate-50/90 border-slate-200/90 hover:border-amber-500/50 hover:bg-white shadow-sm"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setExpandedGroupTitle(isExpanded ? null : group.title)}
                  className="w-full flex items-center justify-between p-2.5 sm:p-3 cursor-pointer text-left focus:outline-none"
                >
                  <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                    <span className="font-mono text-xs font-bold text-amber-700 px-2 py-0.5 rounded bg-amber-50 border border-amber-300/60 shrink-0">
                      {group.number}
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-slate-800 hover:text-amber-800 transition-colors truncate">
                      {group.title}
                    </span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-300/60 shrink-0 font-semibold">
                      {group.options.length} Options
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0 text-slate-500 ml-2">
                    <span className="text-[10.5px] font-mono text-slate-500 hidden sm:inline">
                      {isExpanded ? "Hide" : "Select"}
                    </span>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-amber-600" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-500" />
                    )}
                  </div>
                </button>

                {/* Expanded Sub-Services Selection */}
                {isExpanded && (
                  <div className="px-2.5 sm:px-3 pb-3 pt-1 border-t border-slate-200/80 bg-slate-50/70 space-y-2 animate-in fade-in duration-150">
                    <div className="text-[11px] font-mono font-semibold text-amber-700 px-1 pt-1 uppercase tracking-wider flex items-center gap-1.5">
                      <Layers className="w-3 h-3 text-amber-600" />
                      <span>Choose a Service:</span>
                    </div>
                    <div className="space-y-1.5">
                      {group.options.map((opt) => (
                        <a
                          key={opt.url}
                          href={opt.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/sub flex items-center justify-between p-2 sm:p-2.5 rounded-lg bg-white hover:bg-amber-50/40 border border-slate-200 hover:border-amber-500/60 transition-all cursor-pointer"
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <span className="font-mono text-[11px] font-bold text-amber-700 px-1.5 py-0.5 rounded bg-amber-50 border border-amber-300/60 shrink-0">
                              {opt.number}
                            </span>
                            <span className="text-xs sm:text-sm font-medium text-slate-800 group-hover/sub:text-amber-800 transition-colors truncate">
                              {opt.label}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 shrink-0 text-slate-500 group-hover/sub:text-amber-700 ml-2">
                            <span className="text-[10px] font-mono font-medium">Open</span>
                            <ExternalLink className="w-3 h-3 transform group-hover/sub:translate-x-0.5 group-hover/sub:-translate-y-0.5 transition-transform" />
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
        <div className="p-3.5 sm:p-4 border-t border-slate-200/90 bg-slate-50/80 shrink-0">
          <a
            href={platform.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 py-2 sm:py-2.5 px-4 rounded-xl bg-white hover:bg-amber-50/40 border border-slate-200 hover:border-amber-500/50 text-slate-700 hover:text-slate-900 text-xs font-mono font-semibold transition-all cursor-pointer group/prof shadow-sm"
          >
            <span>View {platform.name} Profile</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover/prof:text-amber-600" />
          </a>
        </div>
      </div>
    </div>
  );

  return typeof document !== "undefined" ? createPortal(modalContent, document.body) : modalContent;
};
