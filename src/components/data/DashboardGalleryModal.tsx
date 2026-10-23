import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import type { DashboardItem } from "../../data/dashboards";
import { DashboardImageViewer } from "./DashboardImageViewer";
import { PortfolioImage } from "../ui/PortfolioImage";
import { useCursor } from "../../context/useCursor";
import { useScrollLock } from "../../hooks/useScrollLock";
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

  // Background scroll lock and Lenis freeze
  useScrollLock(isOpen);

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
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 lg:p-10 bg-black/60 backdrop-blur-xl animate-in fade-in duration-200 overflow-hidden"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="dashboard-gallery-title"
        data-lenis-prevent="true"
        onWheel={(e) => {
          if (e.target === e.currentTarget) e.preventDefault();
        }}
        onTouchMove={(e) => {
          if (e.target === e.currentTarget) e.preventDefault();
        }}
      >
        {/* Main Modal Container */}
        <div
          className="relative w-full max-w-6xl max-h-[90vh] flex flex-col rounded-3xl bg-[#FFFDF8] border border-[#E5D9C8] overflow-hidden animate-in zoom-in-95 duration-200 shadow-[0_28px_72px_rgba(41,39,32,0.3)]"
          onClick={(e) => e.stopPropagation()}
          data-lenis-prevent="true"
        >
          {/* Header Bar */}
          <div className="p-6 sm:p-8 border-b border-[#E5D9C8] flex items-start justify-between gap-4 shrink-0 bg-[#F0E4D2]/40">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider bg-[#F0E4D2]/80 text-[#B58A45] border border-[#B58A45]/30 uppercase">
                  {category === "excel" ? (
                    <>
                      <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
                      Excel Solutions
                    </>
                  ) : (
                    <>
                      <BarChart3 className="w-3.5 h-3.5 text-[#B58A45]" />
                      Power BI Intelligence
                    </>
                  )}
                </span>
                <span className="text-xs font-mono font-semibold text-[#756C60]">
                  {dashboards.length} Interactive Showcase{dashboards.length !== 1 ? "s" : ""}
                </span>
              </div>

              <h2
                id="dashboard-gallery-title"
                className="text-2xl sm:text-3xl font-heading font-extrabold text-[#292720] tracking-wide"
              >
                {modalTitle}
              </h2>

              <p className="text-xs sm:text-sm font-bold text-[#B58A45] font-mono">
                {modalSubtitle}
              </p>

              <p className="text-xs text-[#756C60] font-normal max-w-2xl pt-1 leading-relaxed">
                {categoryDescription}
              </p>
            </div>

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              onMouseEnter={() => setCursor("button")}
              onMouseLeave={resetCursor}
              className="p-2.5 rounded-full bg-white border border-[#E5D9C8] text-[#756C60] hover:text-[#292720] hover:border-[#B58A45] transition-all cursor-pointer shadow-xs shrink-0"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Gallery Content */}
          <div
            className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 custom-scrollbar"
            style={{
              overscrollBehavior: "contain",
              WebkitOverflowScrolling: "touch"
            }}
            data-lenis-prevent="true"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dashboards.map((item, index) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedImageIndex(index)}
                  onMouseEnter={() => setCursor("project", "INSPECT")}
                  onMouseLeave={resetCursor}
                  className="group relative flex flex-col rounded-2xl bg-white border border-[#E5D9C8] hover:border-[#B58A45]/60 transition-all duration-300 hover:-translate-y-1 shadow-xs hover:shadow-[0_12px_30px_rgba(181,138,69,0.15)] cursor-pointer overflow-hidden"
                >
                  {/* Image Frame */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#F0E4D2]/40">
                    <PortfolioImage
                      src={item.image}
                      alt={item.title}
                      isPriority={index < 3}
                      fallbackTitle={item.title}
                      fallbackBadge={item.category === "excel" ? "Excel" : "Power BI"}
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Gradient Overlay & Hover Badge */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity" />

                    <div className="absolute top-3 right-3 p-2 rounded-lg bg-white/90 backdrop-blur-md border border-[#B58A45]/40 text-[#B58A45] opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-xs">
                      <Eye className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Caption & Metadata */}
                  <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
                    <div>
                      <h4 className="text-sm font-heading font-bold text-[#292720] group-hover:text-[#B58A45] transition-colors flex items-center justify-between">
                        <span>{item.title}</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-[#B58A45] opacity-0 group-hover:opacity-100 transition-opacity" />
                      </h4>
                      {item.subtitle && (
                        <p className="text-[11px] font-mono font-normal text-[#756C60] mt-0.5">
                          {item.subtitle}
                        </p>
                      )}
                    </div>

                    {item.tags && (
                      <div className="flex flex-wrap gap-1 pt-2">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-[#FAF7F0] border border-[#E5D9C8] text-[#756C60]"
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
          <div className="p-4 px-6 sm:px-8 border-t border-[#E5D9C8] bg-[#F0E4D2]/40 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#756C60] font-normal">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#B58A45]" />
              Click any dashboard to inspect in full-screen detail
            </span>
            <span className="font-mono text-[11px] text-[#B58A45] font-semibold">
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
