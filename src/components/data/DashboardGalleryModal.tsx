import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import type { DashboardItem } from "../../data/dashboards";
import { DashboardImageViewer } from "./DashboardImageViewer";
import { PortfolioImage } from "../ui/PortfolioImage";
import { useCursor } from "../../context/useCursor";
import { X, Sparkles, Eye, ArrowUpRight, BarChart3, FileSpreadsheet } from "lucide-react";

interface DashboardGalleryModalProps {
  category: "excel" | "powerbi" | null;
  dashboards: DashboardItem[];
  isOpen: boolean;
  onClose: () => void;
}

export const DashboardGalleryModal: React.FC<DashboardGalleryModalProps> = ({
  category,
  dashboards,
  isOpen,
  onClose
}) => {
  const { setCursor, resetCursor } = useCursor();
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  // Prevent background scrolling while modal is open
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  // Handle ESC key for modal
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedImageIndex === null) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, selectedImageIndex]);

  if (!isOpen || !category) return null;

  const modalTitle =
    category === "excel" ? "Excel Dashboards" : "Power BI Dashboards";

  const modalSubtitle =
    category === "excel"
      ? "Advanced Excel Reporting & Data Analytics"
      : "Business Intelligence, KPI Reporting & Data Visualization";

  const categoryDescription =
    category === "excel"
      ? "Explore our portfolio of interactive Excel dashboards, automated reporting models, and analytical tools engineered for rapid business intelligence."
      : "Explore our enterprise Power BI dashboards featuring production-grade DAX modeling, drill-down operational reporting, and interactive visualizations.";

  const modalContent = (
    <>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 lg:p-10 bg-slate-900/35 backdrop-blur-xl animate-in fade-in duration-200"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="dashboard-gallery-title"
      >
        {/* Main Modal Container */}
        <div
          className="relative w-full max-w-6xl max-h-[90vh] flex flex-col rounded-3xl bg-white/95 backdrop-blur-2xl border border-slate-200/90 shadow-[0_25px_80px_rgba(15,23,42,0.18),0_0_50px_rgba(245,158,11,0.08)] overflow-hidden animate-in zoom-in-95 duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header Bar */}
          <div className="p-6 sm:p-8 border-b border-slate-200/90 flex items-start justify-between gap-4 shrink-0 bg-slate-50/80 backdrop-blur-md">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider bg-amber-50 text-amber-800 border border-amber-400/50 uppercase">
                  {category === "excel" ? (
                    <>
                      <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
                      Excel Solutions
                    </>
                  ) : (
                    <>
                      <BarChart3 className="w-3.5 h-3.5 text-amber-600" />
                      Power BI Intelligence
                    </>
                  )}
                </span>
                <span className="text-xs font-mono text-slate-500">
                  {dashboards.length} Interactive Showcase{dashboards.length !== 1 ? "s" : ""}
                </span>
              </div>

              <h2
                id="dashboard-gallery-title"
                className="text-2xl sm:text-3xl font-heading font-extrabold text-slate-900 tracking-wide"
              >
                {modalTitle}
              </h2>

              <p className="text-xs sm:text-sm font-semibold text-amber-700 font-mono">
                {modalSubtitle}
              </p>

              <p className="text-xs text-slate-600 max-w-2xl pt-1 leading-relaxed">
                {categoryDescription}
              </p>
            </div>

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              onMouseEnter={() => setCursor("button")}
              onMouseLeave={resetCursor}
              className="p-2.5 rounded-full bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:border-amber-400 hover:bg-slate-50 transition-all cursor-pointer shadow-sm shrink-0"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Gallery Content */}
          <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 custom-scrollbar">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dashboards.map((item, index) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedImageIndex(index)}
                  onMouseEnter={() => setCursor("project", "INSPECT")}
                  onMouseLeave={resetCursor}
                  className="group relative flex flex-col rounded-2xl bg-white/90 border border-slate-200/90 hover:border-amber-500/60 transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-[0_12px_30px_rgba(245,158,11,0.14)] cursor-pointer overflow-hidden"
                >
                  {/* Image Frame */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                    <PortfolioImage
                      src={item.image}
                      alt={item.title}
                      isPriority={index < 3}
                      fallbackTitle={item.title}
                      fallbackBadge={item.category === "excel" ? "Excel" : "Power BI"}
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Gradient Overlay & Hover Badge */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/35 via-transparent to-transparent opacity-50 group-hover:opacity-25 transition-opacity" />

                    <div className="absolute top-3 right-3 p-2 rounded-lg bg-white/95 backdrop-blur-md border border-amber-500/40 text-amber-700 opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-sm">
                      <Eye className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Caption & Metadata */}
                  <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
                    <div>
                      <h4 className="text-sm font-heading font-bold text-slate-900 group-hover:text-amber-700 transition-colors flex items-center justify-between">
                        <span>{item.title}</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-amber-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </h4>
                      {item.subtitle && (
                        <p className="text-[11px] font-mono text-slate-500 mt-0.5">
                          {item.subtitle}
                        </p>
                      )}
                    </div>

                    {item.tags && (
                      <div className="flex flex-wrap gap-1 pt-2">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200/80"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer note */}
          <div className="p-4 px-6 sm:px-8 border-t border-slate-200/90 bg-slate-50/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              Click any dashboard to inspect in full-screen detail
            </span>
            <span className="font-mono text-[11px] text-amber-700 font-semibold">
              ESC or outside click to exit
            </span>
          </div>
        </div>
      </div>

      {/* Nested Fullscreen Lightbox Image Viewer */}
      <DashboardImageViewer
        dashboards={dashboards}
        currentIndex={selectedImageIndex ?? 0}
        isOpen={selectedImageIndex !== null}
        onClose={() => setSelectedImageIndex(null)}
        onNavigate={(newIdx) => setSelectedImageIndex(newIdx)}
      />
    </>
  );

  return typeof document !== "undefined" ? createPortal(modalContent, document.body) : modalContent;
};
