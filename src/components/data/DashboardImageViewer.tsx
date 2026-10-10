import React, { useEffect, useCallback } from "react";
import type { DashboardItem } from "../../data/dashboards";
import { PortfolioImage } from "../ui/PortfolioImage";
import { useCursor } from "../../context/useCursor";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface DashboardImageViewerProps {
  dashboards: DashboardItem[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export const DashboardImageViewer: React.FC<DashboardImageViewerProps> = ({
  dashboards,
  currentIndex,
  isOpen,
  onClose,
  onNavigate
}) => {
  const { setCursor, resetCursor } = useCursor();

  const currentItem = dashboards[currentIndex];

  const handlePrev = useCallback(() => {
    if (dashboards.length <= 1) return;
    const newIndex = (currentIndex - 1 + dashboards.length) % dashboards.length;
    onNavigate(newIndex);
  }, [currentIndex, dashboards.length, onNavigate]);

  const handleNext = useCallback(() => {
    if (dashboards.length <= 1) return;
    const newIndex = (currentIndex + 1) % dashboards.length;
    onNavigate(newIndex);
  }, [currentIndex, dashboards.length, onNavigate]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, handlePrev, handleNext]);

  if (!isOpen || !currentItem) return null;

  return (
    <div
      className="fixed inset-0 z-[70] flex flex-col items-center justify-between bg-black/80 backdrop-blur-2xl p-4 sm:p-6 select-none animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={currentItem.title}
    >
      {/* Top Controls Bar */}
      <div
        className="w-full max-w-7xl flex items-center justify-between z-10 pt-2"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-amber-400/[0.16] text-amber-300 border border-amber-400/35">
            {currentItem.category === "excel" ? "EXCEL" : "POWER BI"}
          </span>
          <span className="text-xs font-mono text-slate-300">
            {currentIndex + 1} of {dashboards.length}
          </span>
        </div>

        <button
          type="button"
          onClick={onClose}
          onMouseEnter={() => setCursor("button")}
          onMouseLeave={resetCursor}
          className="p-2.5 rounded-full liquid-glass-subcard text-slate-300 hover:text-white hover:border-amber-300 transition-all cursor-pointer shadow-md"
          aria-label="Close image viewer"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Image Stage */}
      <div
        className="relative w-full max-w-7xl flex-1 flex items-center justify-center py-4 px-2"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Previous Button */}
        {dashboards.length > 1 && (
          <button
            type="button"
            onClick={handlePrev}
            onMouseEnter={() => setCursor("button")}
            onMouseLeave={resetCursor}
            className="absolute left-2 sm:left-4 z-20 p-3 rounded-full liquid-glass-panel hover:bg-white/[0.2] border border-white/25 text-white hover:border-amber-300 hover:text-amber-300 transition-all shadow-lg cursor-pointer"
            aria-label="Previous dashboard"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        {/* Dashboard Image Display */}
        <div className="relative max-w-full max-h-[80vh] flex items-center justify-center">
          <PortfolioImage
            src={currentItem.image}
            alt={currentItem.title}
            isPriority={true}
            fallbackTitle={currentItem.title}
            fallbackBadge={currentItem.category === "excel" ? "Excel" : "Power BI"}
            width={1200}
            height={800}
            className="max-w-full max-h-[78vh] object-contain rounded-xl border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.5),0_0_30px_rgba(245,158,11,0.15)]"
          />
        </div>

        {/* Next Button */}
        {dashboards.length > 1 && (
          <button
            type="button"
            onClick={handleNext}
            onMouseEnter={() => setCursor("button")}
            onMouseLeave={resetCursor}
            className="absolute right-2 sm:right-4 z-20 p-3 rounded-full liquid-glass-panel hover:bg-white/[0.2] border border-white/25 text-white hover:border-amber-300 hover:text-amber-300 transition-all shadow-lg cursor-pointer"
            aria-label="Next dashboard"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}
      </div>

      {/* Bottom Caption & Information */}
      <div
        className="w-full max-w-4xl text-center pb-2 z-10"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-base sm:text-lg font-heading font-bold text-white tracking-wide">
          {currentItem.title}
        </h3>
        {currentItem.subtitle && (
          <p className="text-xs text-amber-300 font-semibold font-mono mt-0.5">
            {currentItem.subtitle}
          </p>
        )}
        {currentItem.description && (
          <p className="text-xs text-slate-200 max-w-2xl mx-auto mt-1 leading-relaxed hidden sm:block">
            {currentItem.description}
          </p>
        )}
      </div>
    </div>
  );
};
