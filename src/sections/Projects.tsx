import React, { useState, useMemo, useCallback, Suspense } from "react";
import { projectsData, mobileProjectsData } from "../data/projects";
import type { ProjectItem } from "../data/projects";
import { excelDashboards, powerBIDashboards } from "../data/dashboards";
import { SectionHeading } from "../components/ui/SectionHeading";
import { PortfolioImage } from "../components/ui/PortfolioImage";
import { useCursor } from "../context/useCursor";
import {
  FileSpreadsheet,
  BarChart3,
  ArrowRight,
  Sparkles,
  TrendingUp
} from "lucide-react";

const ProjectModal = React.lazy(() =>
  import("./ProjectModal").then((m) => ({ default: m.ProjectModal }))
);

const DashboardGalleryModal = React.lazy(() =>
  import("../components/data/DashboardGalleryModal").then((m) => ({ default: m.DashboardGalleryModal }))
);

interface ProjectsProps {
  onDiscussProject?: (brief: string) => void;
}

type WorkItem =
  | { type: "project"; data: ProjectItem }
  | { type: "excel" }
  | { type: "powerbi" };

// ============================================================
// CARD 1: EXCEL (Compact Medium Card) - Memoized
// ============================================================
const ExcelCard = React.memo<{ onSelect: () => void }>(({ onSelect }) => {
  const { setCursor, resetCursor } = useCursor();
  return (
    <div
      onClick={onSelect}
      onMouseEnter={() => setCursor("project", "VIEW")}
      onMouseLeave={resetCursor}
      style={{ contain: "content" }}
      className="group relative rounded-xl bg-white/80 backdrop-blur-xl border border-emerald-500/30 hover:border-emerald-500/60 transition-all duration-300 hover:-translate-y-1 shadow-[0_8px_28px_rgba(15,23,42,0.06)] hover:shadow-[0_15px_30px_-10px_rgba(16,185,129,0.2)] flex flex-col justify-between cursor-pointer overflow-hidden h-full"
    >
      {/* Subtle glow accent */}
      <div className="absolute -top-12 -right-12 w-28 h-28 bg-emerald-500/10 rounded-full blur-xl pointer-events-none group-hover:bg-emerald-400/20 transition-all duration-500" />

      <div>
        {/* Visual Header Representation */}
        <div className="w-full h-24 sm:h-28 md:h-32 relative overflow-hidden bg-slate-100 border-b border-slate-200/80 group-hover:border-emerald-400/40 transition-colors">
          <PortfolioImage
            src={excelDashboards[0]?.image || "/images/dashboards/excel/excel-dashboard-1.webp"}
            alt="Advanced Excel Dashboards & Analytics"
            isPriority={true}
            className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
            fallbackTitle="Excel Solutions"
            fallbackBadge="Data & BI"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent pointer-events-none" />

          {/* Top-left category tag */}
          <div className="absolute top-1.5 left-1.5 z-10">
            <span className="px-1 py-0.5 rounded text-[7.5px] sm:text-[8px] font-mono uppercase tracking-widest bg-white/95 backdrop-blur-md text-emerald-700 border border-emerald-500/30 flex items-center gap-1 shadow-sm font-semibold">
              <FileSpreadsheet className="w-2 h-2 text-emerald-600" />
              <span>EXCEL</span>
            </span>
          </div>

          {/* Category Pill on top-right */}
          <div className="absolute top-1.5 right-1.5 z-10">
            <span className="px-1.5 py-0.5 rounded-full text-[8px] sm:text-[8.5px] font-mono font-semibold bg-white/95 backdrop-blur-md text-emerald-700 border border-emerald-500/30 shadow-md">
              {excelDashboards.length} DASHBOARDS
            </span>
          </div>

          {/* Floating Tag over Visual */}
          <div className="absolute bottom-1 left-1.5 px-1 py-0.5 rounded bg-white/95 backdrop-blur-md border border-emerald-500/30 text-[7.5px] sm:text-[8px] font-mono text-emerald-700 flex items-center gap-1 pointer-events-none shadow-sm font-medium">
            <Sparkles className="w-2 h-2 text-emerald-600" />
            <span>Formulas &bull; Auto</span>
          </div>
        </div>

        {/* Card Content Area */}
        <div className="p-2 sm:p-2.5 md:p-3">
          <div className="flex items-center justify-between mb-0.5">
            <h3 className="text-xs sm:text-sm font-bold font-heading text-slate-900 group-hover:text-emerald-700 transition-colors truncate">
              Excel
            </h3>
            <span className="text-[7.5px] sm:text-[8px] font-mono px-1 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0 font-semibold">
              Data &amp; BI
            </span>
          </div>

          <p className="text-[9px] sm:text-[9.5px] font-semibold text-emerald-600 font-mono mb-0.5 truncate">
            Dashboards &amp; Analytics
          </p>

          <p className="text-[9.5px] sm:text-[10.5px] text-slate-600 leading-snug line-clamp-2 mb-1.5">
            Interactive Excel dashboards, automated reporting, Pivot Tables, formulas, data analysis and reporting.
          </p>

          {/* Technologies / Feature Chips */}
          <div className="flex flex-wrap gap-1 mb-1.5">
            {["Dashboards", "Pivot Tables", "Automation", "Formulas"].map((chip) => (
              <span
                key={chip}
                className="px-1 py-0.5 rounded text-[8px] sm:text-[8.5px] font-mono bg-slate-100/90 text-slate-700 border border-slate-200/80"
              >
                {chip}
              </span>
            ))}
          </div>

          {/* Direct Transparent Pricing Module */}
          <div className="pt-1.5 border-t border-slate-200/80">
            <div className="flex items-baseline justify-between gap-1 mb-1">
              <span className="text-[8px] sm:text-[8.5px] font-mono font-bold tracking-wider text-slate-500 uppercase">
                Starting From
              </span>
              <span className="text-xs sm:text-sm font-mono font-extrabold text-transparent bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 bg-clip-text">
                $18
              </span>
            </div>
            <div className="grid grid-cols-3 gap-0.5 text-center bg-slate-50/90 rounded-md p-1 border border-slate-200/80">
              <div className="px-0.5 py-0.5 rounded bg-white border border-slate-200/60">
                <span className="block text-[7px] font-mono uppercase text-slate-500 font-semibold">Basic</span>
                <span className="text-[10px] sm:text-[11px] font-mono font-bold text-emerald-700">$18</span>
              </div>
              <div className="px-0.5 py-0.5 rounded bg-white border border-slate-200/60">
                <span className="block text-[7px] font-mono uppercase text-slate-500 font-semibold">Std</span>
                <span className="text-[10px] sm:text-[11px] font-mono font-bold text-emerald-700">$65</span>
              </div>
              <div className="px-0.5 py-0.5 rounded bg-white border border-slate-200/60">
                <span className="block text-[7px] font-mono uppercase text-slate-500 font-semibold">Prem</span>
                <span className="text-[10px] sm:text-[11px] font-mono font-bold text-emerald-700">$176</span>
              </div>
            </div>
            <div className="mt-0.5 flex items-center justify-between text-[8px] sm:text-[8.5px] font-mono">
              <span className="text-slate-500">Range:</span>
              <span className="text-emerald-700 font-semibold">$18 – $176</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Action Line */}
      <div className="px-2 sm:px-2.5 md:px-3 pb-2 sm:pb-2.5 md:pb-3 pt-0.5">
        <div className="pt-1.5 border-t border-slate-200/80 flex items-center justify-between text-xs font-semibold text-emerald-600 group-hover:text-emerald-700 transition-colors">
          <span className="font-heading uppercase tracking-wider text-[8.5px] sm:text-[9.5px]">View Dashboards</span>
          <ArrowRight className="w-3 h-3 transform group-hover:translate-x-0.5 transition-transform" />
        </div>
      </div>
    </div>
  );
});
ExcelCard.displayName = "ExcelCard";

// ============================================================
// CARD 2: POWER BI (Compact Medium Card) - Memoized
// ============================================================
const PowerBICard = React.memo<{ onSelect: () => void }>(({ onSelect }) => {
  const { setCursor, resetCursor } = useCursor();
  return (
    <div
      onClick={onSelect}
      onMouseEnter={() => setCursor("project", "VIEW")}
      onMouseLeave={resetCursor}
      style={{ contain: "content" }}
      className="group relative rounded-xl bg-white/80 backdrop-blur-xl border border-amber-500/30 hover:border-amber-500/60 transition-all duration-300 hover:-translate-y-1 shadow-[0_8px_28px_rgba(15,23,42,0.06)] hover:shadow-[0_15px_30px_-10px_rgba(245,158,11,0.2)] flex flex-col justify-between cursor-pointer overflow-hidden h-full"
    >
      {/* Subtle glow accent */}
      <div className="absolute -top-12 -right-12 w-28 h-28 bg-amber-500/10 rounded-full blur-xl pointer-events-none group-hover:bg-amber-400/20 transition-all duration-500" />

      <div>
        {/* Visual Header Representation */}
        <div className="w-full h-24 sm:h-28 md:h-32 relative overflow-hidden bg-slate-100 border-b border-slate-200/80 group-hover:border-amber-400/40 transition-colors">
          <PortfolioImage
            src={powerBIDashboards[0]?.image || "/images/dashboards/powerbi/powerbi-dashboard-1.webp"}
            alt="Business Intelligence & Data Visualization"
            isPriority={true}
            className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
            fallbackTitle="Power BI Intelligence"
            fallbackBadge="Data & BI"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent pointer-events-none" />

          {/* Top-left category tag */}
          <div className="absolute top-1.5 left-1.5 z-10">
            <span className="px-1 py-0.5 rounded text-[7.5px] sm:text-[8px] font-mono uppercase tracking-widest bg-white/95 backdrop-blur-md text-amber-700 border border-amber-500/30 flex items-center gap-1 shadow-sm font-semibold">
              <BarChart3 className="w-2 h-2 text-amber-600" />
              <span>POWER BI</span>
            </span>
          </div>

          {/* Category Pill on top-right */}
          <div className="absolute top-1.5 right-1.5 z-10">
            <span className="px-1.5 py-0.5 rounded-full text-[8px] sm:text-[8.5px] font-mono font-semibold bg-white/95 backdrop-blur-md text-amber-700 border border-amber-500/30 shadow-md">
              {powerBIDashboards.length} DASHBOARDS
            </span>
          </div>

          {/* Floating Tag over Visual */}
          <div className="absolute bottom-1 left-1.5 px-1 py-0.5 rounded bg-white/95 backdrop-blur-md border border-amber-500/30 text-[7.5px] sm:text-[8px] font-mono text-amber-700 flex items-center gap-1 pointer-events-none shadow-sm font-medium">
            <TrendingUp className="w-2 h-2 text-amber-600" />
            <span>DAX &bull; BI Models</span>
          </div>
        </div>

        {/* Card Content Area */}
        <div className="p-2 sm:p-2.5 md:p-3">
          <div className="flex items-center justify-between mb-0.5">
            <h3 className="text-xs sm:text-sm font-bold font-heading text-slate-900 group-hover:text-amber-700 transition-colors truncate">
              Power BI
            </h3>
            <span className="text-[7.5px] sm:text-[8px] font-mono px-1 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200 shrink-0 font-semibold">
              Data &amp; BI
            </span>
          </div>

          <p className="text-[9px] sm:text-[9.5px] font-semibold text-amber-600 font-mono mb-0.5 truncate">
            Enterprise BI Dashboards
          </p>

          <p className="text-[9.5px] sm:text-[10.5px] text-slate-600 leading-snug line-clamp-2 mb-1.5">
            Interactive executive business intelligence dashboards, DAX metrics, data modeling, automated ETL &amp; KPIs.
          </p>

          {/* Technologies / Feature Chips */}
          <div className="flex flex-wrap gap-1 mb-1.5">
            {["Power BI", "DAX", "Data Modeling", "ETL Pipelines"].map((chip) => (
              <span
                key={chip}
                className="px-1 py-0.5 rounded text-[8px] sm:text-[8.5px] font-mono bg-slate-100/90 text-slate-700 border border-slate-200/80"
              >
                {chip}
              </span>
            ))}
          </div>

          {/* Direct Transparent Pricing Module */}
          <div className="pt-1.5 border-t border-slate-200/80">
            <div className="flex items-baseline justify-between gap-1 mb-1">
              <span className="text-[8px] sm:text-[8.5px] font-mono font-bold tracking-wider text-slate-500 uppercase">
                Starting From
              </span>
              <span className="text-xs sm:text-sm font-mono font-extrabold text-transparent bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-700 bg-clip-text">
                $21
              </span>
            </div>
            <div className="grid grid-cols-3 gap-0.5 text-center bg-slate-50/90 rounded-md p-1 border border-slate-200/80">
              <div className="px-0.5 py-0.5 rounded bg-white border border-slate-200/60">
                <span className="block text-[7px] font-mono uppercase text-slate-500 font-semibold">Basic</span>
                <span className="text-[10px] sm:text-[11px] font-mono font-bold text-amber-700">$21</span>
              </div>
              <div className="px-0.5 py-0.5 rounded bg-white border border-slate-200/60">
                <span className="block text-[7px] font-mono uppercase text-slate-500 font-semibold">Std</span>
                <span className="text-[10px] sm:text-[11px] font-mono font-bold text-amber-700">$95</span>
              </div>
              <div className="px-0.5 py-0.5 rounded bg-white border border-slate-200/60">
                <span className="block text-[7px] font-mono uppercase text-slate-500 font-semibold">Prem</span>
                <span className="text-[10px] sm:text-[11px] font-mono font-bold text-amber-700">$279</span>
              </div>
            </div>
            <div className="mt-0.5 flex items-center justify-between text-[8px] sm:text-[8.5px] font-mono">
              <span className="text-slate-500">Range:</span>
              <span className="text-amber-700 font-semibold">$21 – $279</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Action Line */}
      <div className="px-2 sm:px-2.5 md:px-3 pb-2 sm:pb-2.5 md:pb-3 pt-0.5">
        <div className="pt-1.5 border-t border-slate-200/80 flex items-center justify-between text-xs font-semibold text-amber-600 group-hover:text-amber-700 transition-colors">
          <span className="font-heading uppercase tracking-wider text-[8.5px] sm:text-[9.5px]">View Dashboards</span>
          <ArrowRight className="w-3 h-3 transform group-hover:translate-x-0.5 transition-transform" />
        </div>
      </div>
    </div>
  );
});
PowerBICard.displayName = "PowerBICard";

// ============================================================
// CARD 3: PROJECT & MOBILE APP CARD - Memoized
// ============================================================
const ProjectCard = React.memo<{
  project: ProjectItem;
  index: number;
  onSelect: (p: ProjectItem) => void;
}>(({ project, index, onSelect }) => {
  const { setCursor, resetCursor } = useCursor();
  return (
    <div
      onClick={() => {
        resetCursor();
        onSelect(project);
      }}
      onMouseEnter={() => setCursor("project", "VIEW")}
      onMouseLeave={resetCursor}
      style={{ contain: "content" }}
      className={`group relative rounded-xl bg-white/80 backdrop-blur-xl border ${
        project.platform === "iOS"
          ? "border-purple-500/30 hover:border-purple-500/60 hover:shadow-[0_15px_30px_-10px_rgba(168,85,247,0.2)]"
          : project.platform === "Android"
          ? "border-emerald-500/30 hover:border-emerald-500/60 hover:shadow-[0_15px_30px_-10px_rgba(16,185,129,0.2)]"
          : "border-slate-200/90 hover:border-amber-500/60 hover:shadow-[0_15px_30px_-10px_rgba(245,158,11,0.2)]"
      } shadow-[0_8px_28px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between cursor-pointer overflow-hidden h-full`}
    >
      <div>
        {/* Visual Header Representation with Real Project / App Mockup */}
        <div className="w-full h-24 sm:h-28 md:h-32 relative overflow-hidden bg-slate-100 border-b border-slate-200/80 group-hover:border-amber-400/40 transition-colors">
          <PortfolioImage
            src={project.image}
            alt={`${project.title} - ${project.subtitle}`}
            isPriority={index < 4}
            platform={project.platform}
            fallbackTitle={project.title}
            fallbackBadge={project.badge}
            className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
          />

          {/* Bottom gradient fade so image seamlessly transitions into card */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/35 via-transparent to-transparent pointer-events-none" />

          {/* Top-left category tag */}
          <div className="absolute top-1.5 left-1.5 z-10">
            <span
              className={`px-1 py-0.5 rounded text-[7.5px] sm:text-[8px] font-mono uppercase tracking-widest shadow-sm border font-semibold backdrop-blur-md ${
                project.platform === "iOS"
                  ? "bg-white/95 text-purple-700 border-purple-500/30"
                  : project.platform === "Android"
                  ? "bg-white/95 text-emerald-700 border-emerald-500/30"
                  : "bg-white/95 text-slate-800 border-slate-300"
              }`}
            >
              {project.platform ? `${project.platform} App` : project.category}
            </span>
          </div>

          {/* Category Pill on top-right */}
          <div className="absolute top-1.5 right-1.5 z-10">
            <span
              className={`px-1.5 py-0.5 rounded-full text-[8px] sm:text-[8.5px] font-mono font-semibold shadow-md border backdrop-blur-md ${
                project.platform === "iOS"
                  ? "bg-white/95 text-purple-700 border-purple-400/40"
                  : project.platform === "Android"
                  ? "bg-white/95 text-emerald-700 border-emerald-400/40"
                  : "bg-white/95 text-amber-700 border-amber-400/40"
              }`}
            >
              {project.badge}
            </span>
          </div>
        </div>

        {/* Card Content Area */}
        <div className="p-2 sm:p-2.5 md:p-3">
          <div className="flex items-center justify-between gap-1 mb-0.5">
            <h3 className="text-xs sm:text-sm font-bold font-heading text-slate-900 group-hover:text-amber-700 transition-colors line-clamp-1">
              {project.title}
            </h3>
            {project.platform && (
              <span
                className={`text-[7.5px] sm:text-[8px] font-mono font-bold px-1 py-0.5 rounded shrink-0 ${
                  project.platform === "iOS"
                    ? "text-purple-700 bg-purple-50 border border-purple-200"
                    : "text-emerald-700 bg-emerald-50 border border-emerald-200"
                }`}
              >
                {project.platform}
              </span>
            )}
          </div>

          <p className="text-[9px] sm:text-[9.5px] font-semibold text-slate-600 font-mono mb-0.5 line-clamp-1">
            {project.subtitle}
          </p>

          <p className="text-[9.5px] sm:text-[10.5px] text-slate-600 leading-snug line-clamp-2 mb-1.5">
            {project.shortDesc}
          </p>

          {/* Technologies Tags */}
          <div className="flex flex-wrap gap-1 mb-1.5">
            {project.technologies.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="px-1 py-0.5 rounded text-[8px] sm:text-[8.5px] font-mono bg-slate-100/90 text-slate-700 border border-slate-200/80"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 3 && (
              <span className="px-1 py-0.5 rounded text-[8px] sm:text-[8.5px] font-mono bg-slate-100/60 text-slate-500">
                +{project.technologies.length - 3}
              </span>
            )}
          </div>

          {/* Direct Transparent Pricing Module */}
          {project.platform ? (
            <div className="pt-1.5 border-t border-slate-200/80">
              <div className="grid grid-cols-3 gap-0.5 text-center bg-slate-50/90 rounded-md p-1 border border-slate-200/80">
                <div className="px-0.5 py-0.5 rounded bg-white border border-slate-200/60">
                  <span className="block text-[7px] font-mono uppercase text-slate-500 font-semibold">Basic</span>
                  <span className={`text-[10px] sm:text-[11px] font-mono font-bold ${project.platform === "iOS" ? "text-purple-700" : "text-emerald-700"}`}>
                    {project.pricing.basicPrice}
                  </span>
                </div>
                <div className="px-0.5 py-0.5 rounded bg-white border border-slate-200/60">
                  <span className="block text-[7px] font-mono uppercase text-slate-500 font-semibold">Std</span>
                  <span className={`text-[10px] sm:text-[11px] font-mono font-bold ${project.platform === "iOS" ? "text-purple-700" : "text-emerald-700"}`}>
                    {project.pricing.standardPrice}
                  </span>
                </div>
                <div className="px-0.5 py-0.5 rounded bg-white border border-slate-200/60">
                  <span className="block text-[7px] font-mono uppercase text-slate-500 font-semibold">Prem</span>
                  <span className="text-[10px] sm:text-[11px] font-mono font-bold text-amber-700">
                    {project.pricing.premiumPrice}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="pt-1.5 border-t border-slate-200/80">
              <div className="flex items-baseline justify-between gap-1 mb-1">
                <span className="text-[8px] sm:text-[8.5px] font-mono font-bold tracking-wider text-slate-500 uppercase">
                  Starting From
                </span>
                <span className="text-xs sm:text-sm font-mono font-extrabold text-transparent bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-700 bg-clip-text">
                  {project.pricing.startingPrice}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-0.5 text-[8.5px] sm:text-[9px] font-mono bg-slate-50/90 rounded-md p-1 border border-slate-200/80">
                <div className="truncate">
                  <span className="text-slate-500">Std: </span>
                  <span className="text-slate-800 font-semibold">{project.pricing.standardPrice}</span>
                </div>
                <div className="truncate text-right">
                  <span className="text-slate-500">Prem: </span>
                  <span className="text-amber-700 font-semibold">{project.pricing.premiumPrice}</span>
                </div>
              </div>
              {project.pricing.customPrice && (
                <div className="mt-0.5 flex items-center justify-between text-[8px] sm:text-[8.5px] font-mono">
                  <span className="text-slate-500">Custom Scope:</span>
                  <span className="text-amber-700 font-semibold">{project.pricing.customPrice}</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Bottom Action Line: VIEW ARCHITECTURE & VIEW DETAILS */}
      <div className="px-2 sm:px-2.5 md:px-3 pb-2 sm:pb-2.5 md:pb-3 pt-0.5">
        <div className="pt-1.5 border-t border-slate-200/80 flex items-center justify-between gap-1 text-xs">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSelect(project);
            }}
            className="font-heading uppercase tracking-wider text-[8.5px] sm:text-[9.5px] font-semibold text-slate-600 group-hover:text-amber-700 transition-colors flex items-center gap-0.5 cursor-pointer truncate"
          >
            <span>VIEW ARCHITECTURE</span>
            <ArrowRight className="w-2.5 h-2.5 text-slate-500 group-hover:text-amber-600 shrink-0" />
          </button>

          {project.demoUrl ? (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="px-1.5 py-0.5 rounded bg-amber-500/15 hover:bg-amber-500/25 text-amber-800 hover:text-amber-900 border border-amber-500/35 hover:border-amber-500/60 text-[8px] sm:text-[9px] font-mono font-bold flex items-center gap-0.5 transition-all cursor-pointer shrink-0"
            >
              <span>VISIT WEBSITE</span>
              <ArrowRight className="w-2.5 h-2.5" />
            </a>
          ) : (
            <span className="text-[7.5px] sm:text-[8px] font-mono text-slate-500 bg-slate-100/90 border border-slate-200/80 px-1 py-0.5 rounded select-none shrink-0">
              COMING SOON
            </span>
          )}
        </div>
      </div>
    </div>
  );
});
ProjectCard.displayName = "ProjectCard";

export const Projects: React.FC<ProjectsProps> = ({ onDiscussProject }) => {
  const { setCursor, resetCursor } = useCursor();
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [activeDashboardModal, setActiveDashboardModal] = useState<"excel" | "powerbi" | null>(null);

  const filters = [
    { label: "All Work", value: "All" },
    { label: "Mobile Apps", value: "mobile" },
    { label: "E-commerce", value: "ecommerce" },
    { label: "Business Portals", value: "business" },
    { label: "Data & BI", value: "data" }
  ];

  // Resolve work items according to the active category tab (memoized)
  // Ordered in exact Collections A -> B -> C -> D -> E -> F -> G sequence
  const workItems: WorkItem[] = useMemo(() => {
    if (activeFilter === "data") {
      return [{ type: "excel" }, { type: "powerbi" }];
    }

    if (activeFilter === "mobile" || activeFilter === "web") {
      return mobileProjectsData.map((p) => ({ type: "project", data: p }));
    }

    if (activeFilter === "All") {
      const items: WorkItem[] = [];
      // Collections A (Android App Collection 1 - SafeHer first), B (iOS App Collection 1), C (iOS App Collection 2)
      mobileProjectsData.forEach((app) => {
        items.push({ type: "project", data: app });
      });
      // Collections D (User-Friendly Websites), E (Premium Collection), F (UI-Optimized Collection) + preserved web projects
      const baseProjects = projectsData.filter((p) => !p.platform);
      baseProjects.forEach((project) => {
        items.push({ type: "project", data: project });
      });
      // Collection G (Data Analytics / Automation: 1. Excel, 2. Power BI)
      items.push({ type: "excel" });
      items.push({ type: "powerbi" });
      return items;
    }

    return projectsData
      .filter((p) => p.filterCategory === activeFilter && !p.platform)
      .map((p) => ({ type: "project", data: p }));
  }, [activeFilter]);

  const activeDashboards = useMemo(() => {
    return activeDashboardModal === "excel"
      ? excelDashboards
      : activeDashboardModal === "powerbi"
      ? powerBIDashboards
      : [];
  }, [activeDashboardModal]);

  const handleSelectExcel = useCallback(() => {
    setActiveDashboardModal("excel");
  }, []);

  const handleSelectPowerBI = useCallback(() => {
    setActiveDashboardModal("powerbi");
  }, []);

  const handleSelectProject = useCallback((project: ProjectItem) => {
    setSelectedProject(project);
  }, []);

  const handleCloseProjectModal = useCallback(() => {
    setSelectedProject(null);
  }, []);

  const handleCloseDashboardModal = useCallback(() => {
    setActiveDashboardModal(null);
  }, []);

  return (
    <section id="projects" className="py-14 sm:py-18 md:py-20 relative z-10 bg-transparent">
      <div className="max-w-7xl 2xl:max-w-[1536px] mx-auto px-3 sm:px-6 lg:px-8">
        <SectionHeading
          badge="SELECTED WORK"
          title="Digital Solutions Engineered for"
          highlightedTitle="Real World Impact."
          subtitle="Explore our portfolio of engineered web platforms, modern e-commerce systems, enterprise architectures, automated business tools, and executive BI dashboards."
        />

        {/* Filter Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 mb-6 sm:mb-8">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setActiveFilter(f.value)}
              onMouseEnter={() => setCursor("button")}
              onMouseLeave={resetCursor}
              className={`px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                activeFilter === f.value
                  ? "bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-slate-950 font-bold shadow-[0_4px_16px_rgba(245,158,11,0.3)]"
                  : "bg-white/80 backdrop-blur-md text-slate-600 border border-slate-200/90 hover:text-slate-900 hover:border-amber-400/50 shadow-sm"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Unified 5-Column Desktop, 3-Column Tablet, 2-Column Mobile Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-2.5 md:gap-3 xl:gap-3.5 animate-in fade-in duration-300">
          {workItems.map((item, index) => {
            const floatClass = ["animate-subtle-float-1", "animate-subtle-float-2", "animate-subtle-float-3", "animate-subtle-float-4"][index % 4];
            if (item.type === "excel") {
              return (
                <div key="dashboard-card-excel" className={`h-full ${floatClass}`}>
                  <ExcelCard onSelect={handleSelectExcel} />
                </div>
              );
            }
            if (item.type === "powerbi") {
              return (
                <div key="dashboard-card-powerbi" className={`h-full ${floatClass}`}>
                  <PowerBICard onSelect={handleSelectPowerBI} />
                </div>
              );
            }
            return (
              <div key={item.data.id} className={`h-full ${floatClass}`}>
                <ProjectCard
                  project={item.data}
                  index={index}
                  onSelect={handleSelectProject}
                />
              </div>
            );
          })}
        </div>

        {/* Subtle Pricing Disclaimer */}
        <div className="mt-8 text-center">
          <p className="text-[11px] sm:text-xs font-mono text-slate-600 max-w-2xl mx-auto flex items-center justify-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
            <span>Prices are indicative. Final pricing depends on features, integrations, content, design complexity and project requirements.</span>
          </p>
        </div>
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <Suspense fallback={null}>
          <ProjectModal
            project={selectedProject}
            isOpen={!!selectedProject}
            onClose={handleCloseProjectModal}
            onDiscussProject={(brief) => {
              if (onDiscussProject) onDiscussProject(brief);
            }}
          />
        </Suspense>
      )}

      {/* Interactive Dashboard Gallery Modal (Excel & Power BI) */}
      {activeDashboardModal && (
        <Suspense fallback={null}>
          <DashboardGalleryModal
            category={activeDashboardModal}
            dashboards={activeDashboards}
            isOpen={activeDashboardModal !== null}
            onClose={handleCloseDashboardModal}
          />
        </Suspense>
      )}
    </section>
  );
};
