import React, { useState, useMemo, useCallback, useEffect, useRef, Suspense } from "react";
import {
  PREMIUM_WEBSITES_COLLECTION,
  BUSINESS_WEBSITES_COLLECTION,
  UI_OPTIMIZED_WEBSITES_COLLECTION,
  ANDROID_APPS_COLLECTION,
  IOS_LIFESTYLE_WELLNESS_COLLECTION,
  IOS_PRODUCTIVITY_EVERYDAY_COLLECTION
} from "../data/projects";
import type { ProjectItem } from "../data/projects";
import { servicesData } from "../data/services";
import type { ServiceItem } from "../data/services";
import { excelDashboards, powerBIDashboards } from "../data/dashboards";
import { SectionHeading } from "../components/ui/SectionHeading";
import { PortfolioImage } from "../components/ui/PortfolioImage";
import { useCursor } from "../context/useCursor";
import {
  FileSpreadsheet,
  BarChart3,
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  TrendingUp,
  Globe,
  Smartphone,
  AppWindow,
  Megaphone,
  ShieldCheck,
  CheckCircle2,
  Layers
} from "lucide-react";

const ProjectModal = React.lazy(() =>
  import("./ProjectModal").then((m) => ({ default: m.ProjectModal }))
);

const ServiceModal = React.lazy(() =>
  import("./ServiceModal").then((m) => ({ default: m.ServiceModal }))
);

const DashboardGalleryModal = React.lazy(() =>
  import("../components/data/DashboardGalleryModal").then((m) => ({ default: m.DashboardGalleryModal }))
);

interface ProjectsProps {
  onDiscussProject?: (brief: string) => void;
}

type PrimaryCategoryId =
  | "websites"
  | "android-apps"
  | "ios-apps"
  | "data-analytics"
  | "digital-marketing"
  | "blockchain";

type WebsiteCollectionId =
  | "premium-websites"
  | "business-websites"
  | "ui-optimized-websites";

type IosCollectionId =
  | "lifestyle-wellness"
  | "productivity-everyday";

interface PrimaryCategoryTab {
  id: PrimaryCategoryId;
  label: string;
  shortLabel: string;
  icon: React.FC<{ className?: string }>;
  countLabel: string;
}

interface SubCollectionTab<T extends string> {
  id: T;
  label: string;
  badge: string;
  description: string;
  count: number;
}

// ============================================================
// STATIC NAVIGATION CONFIGURATION (Module-level, zero re-allocations)
// ============================================================
const PRIMARY_CATEGORIES: readonly PrimaryCategoryTab[] = [
  {
    id: "websites",
    label: "Websites",
    shortLabel: "Websites",
    icon: Globe,
    countLabel: "13"
  },
  {
    id: "android-apps",
    label: "Android Apps",
    shortLabel: "Android Apps",
    icon: Smartphone,
    countLabel: "4"
  },
  {
    id: "ios-apps",
    label: "iOS Apps",
    shortLabel: "iOS Apps",
    icon: AppWindow,
    countLabel: "8"
  },
  {
    id: "data-analytics",
    label: "Data Analytics & Automation",
    shortLabel: "Data & Automation",
    icon: BarChart3,
    countLabel: "2"
  },
  {
    id: "digital-marketing",
    label: "Digital Marketing",
    shortLabel: "Digital Marketing",
    icon: Megaphone,
    countLabel: "Service"
  },
  {
    id: "blockchain",
    label: "Blockchain Development",
    shortLabel: "Blockchain",
    icon: ShieldCheck,
    countLabel: "Web3"
  }
];

const WEBSITE_COLLECTIONS: readonly SubCollectionTab<WebsiteCollectionId>[] = [
  {
    id: "premium-websites",
    label: "Premium Websites",
    badge: "COLLECTION A",
    description: "Editorial luxury e-commerce, bespoke brand campaigns, interactive culinary ordering, and real estate platforms.",
    count: PREMIUM_WEBSITES_COLLECTION.length
  },
  {
    id: "business-websites",
    label: "Business Websites",
    badge: "COLLECTION B",
    description: "High-converting corporate websites, fashion storefronts, travel booking systems, healthcare portals, and LMS platforms.",
    count: BUSINESS_WEBSITES_COLLECTION.length
  },
  {
    id: "ui-optimized-websites",
    label: "UI-Optimized Websites",
    badge: "COLLECTION C",
    description: "Precision-crafted interfaces engineered for effortless product discovery, comparison workflows, and rapid checkout.",
    count: UI_OPTIMIZED_WEBSITES_COLLECTION.length
  }
];

const IOS_COLLECTIONS: readonly SubCollectionTab<IosCollectionId>[] = [
  {
    id: "lifestyle-wellness",
    label: "Lifestyle & Wellness Apps",
    badge: "COLLECTION A",
    description: "Native iOS experiences for nutritional intelligence, AI daily planning, live event discovery, and connected healthcare.",
    count: IOS_LIFESTYLE_WELLNESS_COLLECTION.length
  },
  {
    id: "productivity-everyday",
    label: "Productivity & Everyday Apps",
    badge: "COLLECTION B",
    description: "Refined iOS companions for multi-pet care, guided mindfulness & sleep, focused task management, and offline trail GPS.",
    count: IOS_PRODUCTIVITY_EVERYDAY_COLLECTION.length
  }
];

const BLOCKCHAIN_SERVICE: ServiceItem | undefined = servicesData.find(
  (s) => s.id === "blockchain-development"
);

const FLOAT_CLASSES = [
  "animate-subtle-float-1",
  "animate-subtle-float-2",
  "animate-subtle-float-3",
  "animate-subtle-float-4"
] as const;

// ============================================================
// CARD 1: EXCEL DASHBOARD ANALYTICS CARD - Memoized
// ============================================================
const ExcelCard = React.memo<{ onSelect: () => void }>(({ onSelect }) => {
  const { setCursor, resetCursor } = useCursor();
  return (
    <div
      onClick={onSelect}
      onMouseEnter={() => setCursor("project", "VIEW")}
      onMouseLeave={resetCursor}
      style={{ contain: "content" }}
      className="group relative rounded-xl bg-white/85 backdrop-blur-md border border-emerald-500/35 hover:border-emerald-500/70 transition-[transform,border-color,box-shadow] duration-300 ease-out hover:-translate-y-1.5 shadow-[0_8px_28px_rgba(15,23,42,0.06)] hover:shadow-[0_16px_34px_-10px_rgba(16,185,129,0.22)] flex flex-col justify-between cursor-pointer overflow-hidden h-full gpu-layer"
    >
      {/* Top border light sweep on hover */}
      <div className="absolute -top-px left-1/2 -translate-x-1/2 w-3/4 h-[1.5px] bg-gradient-to-r from-transparent via-emerald-400/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20" />

      <div>
        {/* Visual Header Representation */}
        <div className="w-full h-32 sm:h-36 md:h-40 relative overflow-hidden bg-slate-100 border-b border-slate-200/80 group-hover:border-emerald-400/40 transition-colors">
          <PortfolioImage
            src={excelDashboards[0]?.image || "/images/dashboards/excel/excel-dashboard-1.webp"}
            alt="Excel Dashboard Analytics"
            isPriority={false}
            className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.04]"
            fallbackTitle="Excel Dashboard Analytics"
            fallbackBadge="Data & BI"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent pointer-events-none" />

          {/* Top-left category tag */}
          <div className="absolute top-2 left-2 z-10">
            <span className="px-1.5 py-0.5 rounded text-[8px] sm:text-[8.5px] font-mono uppercase tracking-widest bg-white/95 text-emerald-700 border border-emerald-500/30 flex items-center gap-1 shadow-xs font-semibold">
              <FileSpreadsheet className="w-2.5 h-2.5 text-emerald-600" />
              <span>EXCEL</span>
            </span>
          </div>

          {/* Category Pill on top-right */}
          <div className="absolute top-2 right-2 z-10">
            <span className="px-2 py-0.5 rounded-full text-[8px] sm:text-[9px] font-mono font-semibold bg-white/95 text-emerald-700 border border-emerald-500/30 shadow-xs">
              {excelDashboards.length} DASHBOARDS
            </span>
          </div>

          {/* Floating Tag over Visual */}
          <div className="absolute bottom-1.5 left-2 px-1.5 py-0.5 rounded bg-white/95 border border-emerald-500/30 text-[8px] sm:text-[8.5px] font-mono text-emerald-700 flex items-center gap-1 pointer-events-none shadow-xs font-medium">
            <Sparkles className="w-2.5 h-2.5 text-emerald-600" />
            <span>Formulas &bull; Auto</span>
          </div>
        </div>

        {/* Card Content Area */}
        <div className="p-3 sm:p-3.5 md:p-4">
          <div className="flex items-center justify-between gap-1.5 mb-1">
            <h3 className="text-xs sm:text-sm md:text-base font-bold font-heading text-slate-900 group-hover:text-emerald-700 transition-colors truncate">
              Excel Dashboard Analytics
            </h3>
            <span className="text-[8px] sm:text-[8.5px] font-mono px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0 font-semibold">
              Data &amp; BI
            </span>
          </div>

          <p className="text-[9.5px] sm:text-[10.5px] font-semibold text-emerald-600 font-mono mb-1 truncate">
            Dashboards &amp; Analytics
          </p>

          <p className="text-[10.5px] sm:text-xs text-slate-600 leading-relaxed line-clamp-2 mb-2.5">
            Interactive Excel dashboards, automated reporting, Pivot Tables, formulas, data analysis and reporting.
          </p>

          {/* Technologies / Feature Chips */}
          <div className="flex flex-wrap gap-1 mb-2.5">
            {["Dashboards", "Pivot Tables", "Automation", "Formulas"].map((chip) => (
              <span
                key={chip}
                className="px-1.5 py-0.5 rounded text-[8.5px] sm:text-[9px] font-mono bg-slate-100/90 text-slate-700 border border-slate-200/80"
              >
                {chip}
              </span>
            ))}
          </div>

          {/* Direct Transparent Pricing Module */}
          <div className="pt-2 border-t border-slate-200/80">
            <div className="flex items-baseline justify-between gap-1 mb-1.5">
              <span className="text-[8.5px] sm:text-[9px] font-mono font-bold tracking-wider text-slate-500 uppercase">
                Starting From
              </span>
              <span className="text-sm sm:text-base font-mono font-extrabold text-transparent bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 bg-clip-text">
                $18
              </span>
            </div>
            <div className="grid grid-cols-3 gap-1 text-center bg-slate-50/90 rounded-lg p-1.5 border border-slate-200/80">
              <div className="px-1 py-0.5 rounded bg-white border border-slate-200/60">
                <span className="block text-[7.5px] font-mono uppercase text-slate-500 font-semibold">Basic</span>
                <span className="text-[10.5px] sm:text-xs font-mono font-bold text-emerald-700">$18</span>
              </div>
              <div className="px-1 py-0.5 rounded bg-white border border-slate-200/60">
                <span className="block text-[7.5px] font-mono uppercase text-slate-500 font-semibold">Std</span>
                <span className="text-[10.5px] sm:text-xs font-mono font-bold text-emerald-700">$65</span>
              </div>
              <div className="px-1 py-0.5 rounded bg-white border border-slate-200/60">
                <span className="block text-[7.5px] font-mono uppercase text-slate-500 font-semibold">Prem</span>
                <span className="text-[10.5px] sm:text-xs font-mono font-bold text-emerald-700">$176</span>
              </div>
            </div>
            <div className="mt-1 flex items-center justify-between text-[8.5px] sm:text-[9.5px] font-mono">
              <span className="text-slate-500">Range:</span>
              <span className="text-emerald-700 font-semibold">$18 – $176</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Action Line */}
      <div className="px-3 sm:px-3.5 md:px-4 pb-3 sm:pb-3.5 pt-0.5">
        <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between text-xs font-semibold text-emerald-600 group-hover:text-emerald-700 transition-colors">
          <span className="font-heading uppercase tracking-wider text-[9.5px] sm:text-[10.5px]">View Dashboards</span>
          <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" />
        </div>
      </div>
    </div>
  );
});
ExcelCard.displayName = "ExcelCard";

// ============================================================
// CARD 2: POWER BI DASHBOARDS — PROFESSIONAL CARD - Memoized
// ============================================================
const PowerBICard = React.memo<{ onSelect: () => void }>(({ onSelect }) => {
  const { setCursor, resetCursor } = useCursor();
  return (
    <div
      onClick={onSelect}
      onMouseEnter={() => setCursor("project", "VIEW")}
      onMouseLeave={resetCursor}
      style={{ contain: "content" }}
      className="group relative rounded-xl bg-white/85 backdrop-blur-md border border-amber-500/35 hover:border-amber-500/70 transition-[transform,border-color,box-shadow] duration-300 ease-out hover:-translate-y-1.5 shadow-[0_8px_28px_rgba(15,23,42,0.06)] hover:shadow-[0_16px_34px_-10px_rgba(245,158,11,0.22)] flex flex-col justify-between cursor-pointer overflow-hidden h-full gpu-layer"
    >
      {/* Top border light sweep on hover */}
      <div className="absolute -top-px left-1/2 -translate-x-1/2 w-3/4 h-[1.5px] bg-gradient-to-r from-transparent via-amber-400/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20" />

      <div>
        {/* Visual Header Representation */}
        <div className="w-full h-32 sm:h-36 md:h-40 relative overflow-hidden bg-slate-100 border-b border-slate-200/80 group-hover:border-amber-400/40 transition-colors">
          <PortfolioImage
            src={powerBIDashboards[0]?.image || "/images/dashboards/powerbi/powerbi-dashboard-1.webp"}
            alt="Power BI Dashboards — Professional"
            isPriority={false}
            className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.04]"
            fallbackTitle="Power BI Dashboards"
            fallbackBadge="Data & BI"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent pointer-events-none" />

          {/* Top-left category tag */}
          <div className="absolute top-2 left-2 z-10">
            <span className="px-1.5 py-0.5 rounded text-[8px] sm:text-[8.5px] font-mono uppercase tracking-widest bg-white/95 text-amber-700 border border-amber-500/30 flex items-center gap-1 shadow-xs font-semibold">
              <BarChart3 className="w-2.5 h-2.5 text-amber-600" />
              <span>POWER BI</span>
            </span>
          </div>

          {/* Category Pill on top-right */}
          <div className="absolute top-2 right-2 z-10">
            <span className="px-2 py-0.5 rounded-full text-[8px] sm:text-[9px] font-mono font-semibold bg-white/95 text-amber-700 border border-amber-500/30 shadow-xs">
              {powerBIDashboards.length} DASHBOARDS
            </span>
          </div>

          {/* Floating Tag over Visual */}
          <div className="absolute bottom-1.5 left-2 px-1.5 py-0.5 rounded bg-white/95 border border-amber-500/30 text-[8px] sm:text-[8.5px] font-mono text-amber-700 flex items-center gap-1 pointer-events-none shadow-xs font-medium">
            <TrendingUp className="w-2.5 h-2.5 text-amber-600" />
            <span>DAX &bull; BI Models</span>
          </div>
        </div>

        {/* Card Content Area */}
        <div className="p-3 sm:p-3.5 md:p-4">
          <div className="flex items-center justify-between gap-1.5 mb-1">
            <h3 className="text-xs sm:text-sm md:text-base font-bold font-heading text-slate-900 group-hover:text-amber-700 transition-colors truncate">
              Power BI Dashboards — Professional
            </h3>
            <span className="text-[8px] sm:text-[8.5px] font-mono px-1.5 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200 shrink-0 font-semibold">
              Data &amp; BI
            </span>
          </div>

          <p className="text-[9.5px] sm:text-[10.5px] font-semibold text-amber-600 font-mono mb-1 truncate">
            Enterprise BI Dashboards
          </p>

          <p className="text-[10.5px] sm:text-xs text-slate-600 leading-relaxed line-clamp-2 mb-2.5">
            Interactive executive business intelligence dashboards, DAX metrics, data modeling, automated ETL &amp; KPIs.
          </p>

          {/* Technologies / Feature Chips */}
          <div className="flex flex-wrap gap-1 mb-2.5">
            {["Power BI", "DAX", "Data Modeling", "ETL Pipelines"].map((chip) => (
              <span
                key={chip}
                className="px-1.5 py-0.5 rounded text-[8.5px] sm:text-[9px] font-mono bg-slate-100/90 text-slate-700 border border-slate-200/80"
              >
                {chip}
              </span>
            ))}
          </div>

          {/* Direct Transparent Pricing Module */}
          <div className="pt-2 border-t border-slate-200/80">
            <div className="flex items-baseline justify-between gap-1 mb-1.5">
              <span className="text-[8.5px] sm:text-[9px] font-mono font-bold tracking-wider text-slate-500 uppercase">
                Starting From
              </span>
              <span className="text-sm sm:text-base font-mono font-extrabold text-transparent bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-700 bg-clip-text">
                $21
              </span>
            </div>
            <div className="grid grid-cols-3 gap-1 text-center bg-slate-50/90 rounded-lg p-1.5 border border-slate-200/80">
              <div className="px-1 py-0.5 rounded bg-white border border-slate-200/60">
                <span className="block text-[7.5px] font-mono uppercase text-slate-500 font-semibold">Basic</span>
                <span className="text-[10.5px] sm:text-xs font-mono font-bold text-amber-700">$21</span>
              </div>
              <div className="px-1 py-0.5 rounded bg-white border border-slate-200/60">
                <span className="block text-[7.5px] font-mono uppercase text-slate-500 font-semibold">Std</span>
                <span className="text-[10.5px] sm:text-xs font-mono font-bold text-amber-700">$95</span>
              </div>
              <div className="px-1 py-0.5 rounded bg-white border border-slate-200/60">
                <span className="block text-[7.5px] font-mono uppercase text-slate-500 font-semibold">Prem</span>
                <span className="text-[10.5px] sm:text-xs font-mono font-bold text-amber-700">$279</span>
              </div>
            </div>
            <div className="mt-1 flex items-center justify-between text-[8.5px] sm:text-[9.5px] font-mono">
              <span className="text-slate-500">Range:</span>
              <span className="text-amber-700 font-semibold">$21 – $279</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Action Line */}
      <div className="px-3 sm:px-3.5 md:px-4 pb-3 sm:pb-3.5 pt-0.5">
        <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between text-xs font-semibold text-amber-600 group-hover:text-amber-700 transition-colors">
          <span className="font-heading uppercase tracking-wider text-[9.5px] sm:text-[10.5px]">View Dashboards</span>
          <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" />
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
  onSelect: (p: ProjectItem) => void;
}>(({ project, onSelect }) => {
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
      className={`group relative rounded-xl bg-white/85 backdrop-blur-md border ${
        project.platform === "iOS"
          ? "border-purple-500/30 hover:border-purple-500/65 hover:shadow-[0_15px_30px_-10px_rgba(168,85,247,0.2)]"
          : project.platform === "Android"
          ? "border-emerald-500/30 hover:border-emerald-500/65 hover:shadow-[0_15px_30px_-10px_rgba(16,185,129,0.2)]"
          : "border-slate-200/90 hover:border-amber-500/65 hover:shadow-[0_15px_30px_-10px_rgba(245,158,11,0.2)]"
      } shadow-[0_8px_28px_rgba(15,23,42,0.06)] transition-[transform,border-color,box-shadow] duration-300 ease-out hover:-translate-y-1.5 flex flex-col justify-between cursor-pointer overflow-hidden h-full gpu-layer`}
    >
      {/* Subtle top-edge light sweep on hover */}
      <div
        className={`absolute -top-px left-1/2 -translate-x-1/2 w-3/4 h-[1.5px] bg-gradient-to-r from-transparent ${
          project.platform === "iOS"
            ? "via-purple-400/80"
            : project.platform === "Android"
            ? "via-emerald-400/80"
            : "via-amber-400/80"
        } to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20`}
      />

      <div>
        {/* Visual Header Representation with Real Project / App Mockup */}
        <div className="w-full h-28 sm:h-32 md:h-36 relative overflow-hidden bg-slate-100 border-b border-slate-200/80 group-hover:border-amber-400/40 transition-colors">
          <PortfolioImage
            src={project.image}
            alt={`${project.title} - ${project.subtitle}`}
            isPriority={false}
            platform={project.platform}
            fallbackTitle={project.title}
            fallbackBadge={project.badge}
            className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.04]"
          />

          {/* Bottom gradient fade so image seamlessly transitions into card */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/35 via-transparent to-transparent pointer-events-none" />

          {/* Top-left category tag */}
          <div className="absolute top-1.5 left-1.5 z-10">
            <span
              className={`px-1.5 py-0.5 rounded text-[7.5px] sm:text-[8px] font-mono uppercase tracking-widest shadow-xs border font-semibold ${
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
              className={`px-1.5 py-0.5 rounded-full text-[8px] sm:text-[8.5px] font-mono font-semibold shadow-xs border ${
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
        <div className="p-2.5 sm:p-3 md:p-3.5">
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

          <p className="text-[9px] sm:text-[9.5px] font-semibold text-slate-600 font-mono mb-1 line-clamp-1">
            {project.subtitle}
          </p>

          <p className="text-[9.5px] sm:text-[10.5px] text-slate-600 leading-snug line-clamp-2 mb-2">
            {project.shortDesc}
          </p>

          {/* Technologies Tags */}
          <div className="flex flex-wrap gap-1 mb-2">
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

      {/* Bottom Action Line: VIEW ARCHITECTURE & VISIT WEBSITE */}
      <div className="px-2.5 sm:px-3 md:px-3.5 pb-2.5 sm:pb-3 pt-0.5">
        <div className="pt-1.5 border-t border-slate-200/80 flex items-center justify-between gap-1 text-xs">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSelect(project);
            }}
            className="font-heading uppercase tracking-wider text-[8.5px] sm:text-[9.5px] font-semibold text-slate-600 group-hover:text-amber-700 transition-colors flex items-center gap-0.5 cursor-pointer truncate focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded"
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
              className="px-1.5 py-0.5 rounded bg-amber-500/15 hover:bg-amber-500/25 active:scale-[0.97] text-amber-800 hover:text-amber-900 border border-amber-500/35 hover:border-amber-500/60 text-[8px] sm:text-[9px] font-mono font-bold flex items-center gap-0.5 transition-[background-color,border-color,transform] cursor-pointer shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
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

// ============================================================
// CARD 4: BLOCKCHAIN DEVELOPMENT SERVICE CARD - Memoized
// Reuses existing Blockchain Solutions & Web3 Integration service data
// ============================================================
const BlockchainShowcaseCard = React.memo<{
  service: ServiceItem;
  onOpenServiceModal: (service: ServiceItem) => void;
  onDiscuss: (brief: string) => void;
}>(({ service, onOpenServiceModal, onDiscuss }) => {
  const { setCursor, resetCursor } = useCursor();

  const handleConsultClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDiscuss(`Inquiry regarding ${service.title}`);
    const bookSection = document.getElementById("book-call");
    if (bookSection) {
      bookSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      onClick={() => {
        resetCursor();
        onOpenServiceModal(service);
      }}
      onMouseEnter={() => setCursor("project", "EXPAND")}
      onMouseLeave={resetCursor}
      style={{ contain: "content" }}
      className="group relative rounded-2xl bg-white/88 backdrop-blur-md border border-amber-400/45 hover:border-amber-500/75 shadow-[0_12px_36px_rgba(15,23,42,0.07)] hover:shadow-[0_18px_42px_-10px_rgba(245,158,11,0.22)] transition-[transform,border-color,box-shadow] duration-300 ease-out hover:-translate-y-1.5 p-5 sm:p-6 md:p-7 cursor-pointer overflow-hidden gpu-layer"
    >
      {/* Top border light sweep */}
      <div className="absolute -top-px left-1/2 -translate-x-1/2 w-3/4 h-[1.5px] bg-gradient-to-r from-transparent via-amber-400/90 to-transparent opacity-80 group-hover:opacity-100 transition-opacity pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left Column: Service Overview & Tech Stack */}
        <div className="lg:col-span-7 space-y-3.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider bg-amber-50 text-amber-800 border border-amber-400/50">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
              <span>SERVICE // {service.number} &bull; WEB3 ARCHITECTURE</span>
            </span>
            {service.pricing && (
              <span className="px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-mono font-bold bg-slate-100 text-slate-800 border border-slate-200/90">
                {service.pricing}
              </span>
            )}
          </div>

          <h3 className="text-lg sm:text-xl md:text-2xl font-bold font-heading text-slate-900 group-hover:text-amber-700 transition-colors">
            {service.title}
          </h3>

          <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
            {service.shortDesc}
          </p>

          <p className="text-xs text-slate-600 leading-relaxed">
            {service.fullDesc}
          </p>

          {/* Technologies */}
          <div className="pt-1">
            <span className="block text-[10px] font-mono uppercase tracking-wider text-slate-500 font-semibold mb-1.5">
              Core Protocols &amp; Technologies
            </span>
            <div className="flex flex-wrap gap-1.5">
              {service.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-md text-[10px] sm:text-xs font-mono font-medium bg-slate-100 text-slate-800 border border-slate-200/90"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Deliverables & Preserved Pricing Tiers */}
        <div className="lg:col-span-5 space-y-4 bg-slate-50/90 rounded-xl p-4 sm:p-5 border border-slate-200/90">
          {/* Pricing Module */}
          {service.pricing && (
            <div className="pb-3.5 border-b border-slate-200/80">
              <div className="flex items-baseline justify-between gap-2 mb-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold">
                  Investment Range
                </span>
                <span className="text-base sm:text-lg font-mono font-extrabold text-amber-700">
                  {service.pricing}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-1.5 text-center">
                <div className="p-1.5 rounded-lg bg-white border border-slate-200/80">
                  <span className="block text-[8px] font-mono uppercase text-slate-500 font-semibold">Basic</span>
                  <span className="text-xs font-mono font-bold text-slate-900">$480</span>
                </div>
                <div className="p-1.5 rounded-lg bg-white border border-slate-200/80">
                  <span className="block text-[8px] font-mono uppercase text-slate-500 font-semibold">Standard</span>
                  <span className="text-xs font-mono font-bold text-slate-900">$1,200</span>
                </div>
                <div className="p-1.5 rounded-lg bg-white border border-amber-300/70">
                  <span className="block text-[8px] font-mono uppercase text-amber-700 font-semibold">Premium</span>
                  <span className="text-xs font-mono font-bold text-amber-700">$2,400</span>
                </div>
              </div>
            </div>
          )}

          {/* Deliverables */}
          <div>
            <span className="block text-[10px] font-mono uppercase tracking-wider text-slate-500 font-semibold mb-2">
              Verified Deliverables
            </span>
            <ul className="space-y-1.5">
              {service.deliverables.map((item) => (
                <li key={item} className="flex items-start gap-2 text-xs text-slate-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Actions */}
          <div className="pt-2 flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onOpenServiceModal(service);
              }}
              className="flex-1 py-2 px-3 rounded-lg bg-white hover:bg-amber-50 text-slate-800 hover:text-amber-800 border border-slate-200/90 hover:border-amber-400/60 text-xs font-mono font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
            >
              <Layers className="w-3.5 h-3.5 text-amber-600" />
              <span>VIEW DETAILS</span>
            </button>
            <button
              type="button"
              onClick={handleConsultClick}
              className="flex-1 py-2 px-3 rounded-lg bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-slate-950 font-mono font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm hover:brightness-105 active:scale-[0.98] transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
            >
              <span>DISCUSS PROJECT</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});
BlockchainShowcaseCard.displayName = "BlockchainShowcaseCard";

// ============================================================
// CARD 5: DIGITAL MARKETING SERVICE & CONSULTATION CARD - Memoized
// Uses existing Digital Marketing service domain from BookCall/Contact
// without fabricating completed projects, metrics, or unsupported claims.
// ============================================================
const DigitalMarketingShowcaseCard = React.memo<{
  onDiscuss: (brief: string) => void;
}>(({ onDiscuss }) => {
  const { setCursor, resetCursor } = useCursor();

  const handleBookConsultation = () => {
    resetCursor();
    onDiscuss("Inquiry regarding Digital Marketing & Growth Strategy services");
    const bookSection = document.getElementById("book-call");
    if (bookSection) {
      bookSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      onClick={handleBookConsultation}
      onMouseEnter={() => setCursor("project", "DISCUSS")}
      onMouseLeave={resetCursor}
      style={{ contain: "content" }}
      className="group relative rounded-2xl bg-white/88 backdrop-blur-md border border-amber-400/45 hover:border-amber-500/75 shadow-[0_12px_36px_rgba(15,23,42,0.07)] hover:shadow-[0_18px_42px_-10px_rgba(245,158,11,0.22)] transition-[transform,border-color,box-shadow] duration-300 ease-out hover:-translate-y-1.5 p-5 sm:p-6 md:p-7 cursor-pointer overflow-hidden gpu-layer"
    >
      {/* Top border light sweep */}
      <div className="absolute -top-px left-1/2 -translate-x-1/2 w-3/4 h-[1.5px] bg-gradient-to-r from-transparent via-amber-400/90 to-transparent opacity-80 group-hover:opacity-100 transition-opacity pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        <div className="lg:col-span-7 space-y-3.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider bg-amber-50 text-amber-800 border border-amber-400/50">
              <Megaphone className="w-3.5 h-3.5 text-amber-600" />
              <span>DIGITAL MARKETING &bull; ADVISORY &amp; GROWTH</span>
            </span>
            <span className="px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-mono font-semibold bg-slate-100 text-slate-700 border border-slate-200/90">
              Custom Consultation Scope
            </span>
          </div>

          <h3 className="text-lg sm:text-xl md:text-2xl font-bold font-heading text-slate-900 group-hover:text-amber-700 transition-colors">
            Digital Marketing &amp; Search Visibility Engineering
          </h3>

          <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
            Technical SEO architecture, conversion-focused landing funnels, email marketing integrations, and digital brand positioning tailored to your business goals.
          </p>

          <p className="text-xs text-slate-600 leading-relaxed">
            Available as a dedicated service through our consultation &amp; discovery workflow. We integrate technical SEO best practices, Core Web Vitals optimization, and marketing automation directly into your digital presence.
          </p>

          <div className="flex flex-wrap gap-1.5 pt-1">
            {[
              "Technical SEO Structure",
              "Core Web Vitals 90+",
              "Conversion Optimization",
              "Email Marketing Integration",
              "Brand Positioning"
            ].map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-md text-[10px] sm:text-xs font-mono font-medium bg-slate-100 text-slate-800 border border-slate-200/90"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5 space-y-4 bg-slate-50/90 rounded-xl p-4 sm:p-5 border border-slate-200/90">
          <div className="pb-3 border-b border-slate-200/80">
            <span className="block text-[10px] font-mono uppercase tracking-wider text-amber-700 font-bold mb-1">
              Portfolio &amp; Engagement Status
            </span>
            <p className="text-xs text-slate-600 leading-relaxed">
              Dedicated Digital Marketing campaigns and growth roadmaps are scoped individually based on your target market, channels, and existing web infrastructure.
            </p>
          </div>

          <ul className="space-y-1.5 text-xs text-slate-700">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
              <span>Custom semantic markup &amp; search-friendly site architecture</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
              <span>High-converting landing pages &amp; lead capture workflows</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
              <span>Direct consultation &amp; custom scope planning with ZYNOVA</span>
            </li>
          </ul>

          <div className="pt-2">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleBookConsultation();
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-slate-950 font-mono font-bold text-xs flex items-center justify-center gap-1.5 shadow-[0_4px_15px_rgba(245,158,11,0.3)] hover:brightness-105 active:scale-[0.98] transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
            >
              <Sparkles className="w-3.5 h-3.5 text-slate-950" />
              <span>DISCUSS DIGITAL MARKETING</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});
DigitalMarketingShowcaseCard.displayName = "DigitalMarketingShowcaseCard";

// ============================================================
// MAIN PROJECTS & SERVICES SHOWCASE SECTION
// ============================================================
export const Projects: React.FC<ProjectsProps> = ({ onDiscussProject }) => {
  const { setCursor, resetCursor } = useCursor();

  // Level 1: Primary Service Category State
  const [activeCategory, setActiveCategory] = useState<PrimaryCategoryId>("websites");

  // Level 2: Conditional Subcollection States
  const [activeWebsiteCollection, setActiveWebsiteCollection] =
    useState<WebsiteCollectionId>("premium-websites");
  const [activeIosCollection, setActiveIosCollection] =
    useState<IosCollectionId>("lifestyle-wellness");

  // Modal States
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [activeDashboardModal, setActiveDashboardModal] = useState<"excel" | "powerbi" | null>(null);

  // Offscreen observer to pause continuous floating card animations when scrolled away
  const sectionRef = useRef<HTMLElement>(null);
  const [isSectionInView, setIsSectionInView] = useState(true);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSectionInView(entry.isIntersecting);
      },
      { rootMargin: "200px 0px 200px 0px", threshold: 0.01 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Primary category selection handler: resets conditional subcollection appropriately
  const handleSelectCategory = useCallback((categoryId: PrimaryCategoryId) => {
    setActiveCategory(categoryId);
    if (categoryId === "websites") {
      setActiveWebsiteCollection("premium-websites");
    } else if (categoryId === "ios-apps") {
      setActiveIosCollection("lifestyle-wellness");
    }
  }, []);

  // Keyboard navigation for Level 1 Primary Category Tabs
  const handlePrimaryKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLButtonElement>, currentIndex: number) => {
      let nextIndex: number | null = null;
      if (e.key === "ArrowRight") {
        nextIndex = (currentIndex + 1) % PRIMARY_CATEGORIES.length;
      } else if (e.key === "ArrowLeft") {
        nextIndex = (currentIndex - 1 + PRIMARY_CATEGORIES.length) % PRIMARY_CATEGORIES.length;
      } else if (e.key === "Home") {
        nextIndex = 0;
      } else if (e.key === "End") {
        nextIndex = PRIMARY_CATEGORIES.length - 1;
      }

      if (nextIndex !== null) {
        e.preventDefault();
        const nextCategory = PRIMARY_CATEGORIES[nextIndex];
        handleSelectCategory(nextCategory.id);
        const btn = document.getElementById(`primary-tab-${nextCategory.id}`);
        btn?.focus();
      }
    },
    [handleSelectCategory]
  );

  // Resolve current project list for project-based categories (O(1) constant reference)
  const activeProjects: ProjectItem[] = useMemo(() => {
    if (activeCategory === "websites") {
      switch (activeWebsiteCollection) {
        case "premium-websites":
          return PREMIUM_WEBSITES_COLLECTION;
        case "business-websites":
          return BUSINESS_WEBSITES_COLLECTION;
        case "ui-optimized-websites":
          return UI_OPTIMIZED_WEBSITES_COLLECTION;
      }
    }
    if (activeCategory === "android-apps") {
      return ANDROID_APPS_COLLECTION;
    }
    if (activeCategory === "ios-apps") {
      return activeIosCollection === "lifestyle-wellness"
        ? IOS_LIFESTYLE_WELLNESS_COLLECTION
        : IOS_PRODUCTIVITY_EVERYDAY_COLLECTION;
    }
    return [];
  }, [activeCategory, activeWebsiteCollection, activeIosCollection]);

  // Active subcollection metadata for header bar
  const activeCollectionMeta = useMemo(() => {
    if (activeCategory === "websites") {
      return WEBSITE_COLLECTIONS.find((c) => c.id === activeWebsiteCollection) || WEBSITE_COLLECTIONS[0];
    }
    if (activeCategory === "ios-apps") {
      return IOS_COLLECTIONS.find((c) => c.id === activeIosCollection) || IOS_COLLECTIONS[0];
    }
    if (activeCategory === "android-apps") {
      return {
        badge: "ANDROID PORTFOLIO",
        label: "Android Applications",
        description: "Native-grade Android applications engineered for personal safety, on-demand learning, creative storytelling, and fitness tracking.",
        count: ANDROID_APPS_COLLECTION.length
      };
    }
    if (activeCategory === "data-analytics") {
      return {
        badge: "DATA & BI SOLUTIONS",
        label: "Data Analytics & Automation",
        description: "Interactive Excel dashboards, automated reporting pipelines, and enterprise Power BI business intelligence models.",
        count: 2
      };
    }
    if (activeCategory === "digital-marketing") {
      return {
        badge: "GROWTH & VISIBILITY",
        label: "Digital Marketing",
        description: "Search-optimized web architectures, conversion-focused landing systems, and custom digital growth advisory.",
        count: 1
      };
    }
    return {
      badge: "WEB3 & SMART CONTRACTS",
      label: "Blockchain Development",
      description: "Secure smart contract design, decentralized application (dApp) interfaces, and Web3 protocol integrations.",
      count: 1
    };
  }, [activeCategory, activeWebsiteCollection, activeIosCollection]);

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

  const handleOpenServiceModal = useCallback((service: ServiceItem) => {
    setSelectedService(service);
  }, []);

  const handleCloseServiceModal = useCallback(() => {
    setSelectedService(null);
  }, []);

  const handleCloseDashboardModal = useCallback(() => {
    setActiveDashboardModal(null);
  }, []);

  const handleDiscuss = useCallback(
    (brief: string) => {
      if (onDiscussProject) {
        onDiscussProject(brief);
      }
    },
    [onDiscussProject]
  );

  // Unique transition key so switching categories/collections triggers a smooth fade+slide
  const viewKey =
    activeCategory === "websites"
      ? `websites-${activeWebsiteCollection}`
      : activeCategory === "ios-apps"
      ? `ios-${activeIosCollection}`
      : activeCategory;

  // Balanced responsive grid column classes based on collection card count
  const projectGridColumnsClass =
    activeProjects.length === 5
      ? "grid-cols-1 min-[360px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-5"
      : "grid-cols-1 min-[360px]:grid-cols-2 md:grid-cols-2 lg:grid-cols-4";

  return (
    <section
      id="projects"
      ref={sectionRef}
      className={`py-14 sm:py-18 md:py-20 relative z-10 bg-transparent ${
        isSectionInView ? "" : "is-offscreen"
      }`}
    >
      <div className="max-w-7xl 2xl:max-w-[1536px] mx-auto px-3 sm:px-6 lg:px-8">
        {/* Protected Section Heading */}
        <SectionHeading
          badge="SELECTED WORK"
          title="Digital Solutions Engineered for"
          highlightedTitle="Real World Impact."
          subtitle="Explore our portfolio of engineered web platforms, modern e-commerce systems, enterprise architectures, automated business tools, and executive BI dashboards."
          subtitleVariant="typewriter"
        />

        {/* ============================================================ */}
        {/* LEVEL 1: PRIMARY SERVICE CATEGORIES NAVIGATION               */}
        {/* ============================================================ */}
        <div className="mb-5 sm:mb-6">
          <div
            role="tablist"
            aria-label="Primary Service Categories"
            className="flex items-center justify-start sm:justify-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar pb-1.5 sm:pb-0 sm:flex-wrap"
          >
            {PRIMARY_CATEGORIES.map((cat, idx) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  id={`primary-tab-${cat.id}`}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`projects-panel-${cat.id}`}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => handleSelectCategory(cat.id)}
                  onKeyDown={(e) => handlePrimaryKeyDown(e, idx)}
                  onMouseEnter={() => setCursor("button")}
                  onMouseLeave={resetCursor}
                  className={`group relative shrink-0 inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full text-xs font-semibold tracking-wide transition-[transform,background-color,border-color,color,box-shadow] duration-250 cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-1 active:scale-[0.98] ${
                    isActive
                      ? "bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-slate-950 font-bold border border-amber-400/90 shadow-[0_6px_20px_rgba(245,158,11,0.32)]"
                      : "bg-white/85 backdrop-blur-md text-slate-700 border border-slate-200/90 hover:text-slate-950 hover:bg-white/95 hover:border-amber-400/60 shadow-xs"
                  }`}
                >
                  <Icon
                    className={`w-3.5 h-3.5 shrink-0 transition-colors ${
                      isActive ? "text-slate-950" : "text-amber-600 group-hover:text-amber-700"
                    }`}
                  />
                  <span className="hidden sm:inline">{cat.label}</span>
                  <span className="sm:hidden">{cat.shortLabel}</span>
                  <span
                    className={`px-1.5 py-0.2 rounded-full text-[9.5px] font-mono font-bold transition-colors ${
                      isActive
                        ? "bg-slate-950/15 text-slate-950"
                        : "bg-slate-100 text-slate-600 group-hover:bg-amber-50 group-hover:text-amber-800"
                    }`}
                  >
                    {cat.countLabel}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ============================================================ */}
        {/* LEVEL 2: CONDITIONAL SUBCOLLECTION SELECTOR                  */}
        {/* Displayed for "Websites" (3 collections) & "iOS Apps" (2)    */}
        {/* ============================================================ */}
        {activeCategory === "websites" && (
          <div className="mb-6 sm:mb-7 flex justify-center animate-project-grid-enter">
            <div
              role="tablist"
              aria-label="Website Collections"
              className="inline-flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 p-1.5 rounded-2xl bg-white/80 backdrop-blur-md border border-slate-200/90 shadow-[0_8px_24px_rgba(15,23,42,0.05)]"
            >
              {WEBSITE_COLLECTIONS.map((sub) => {
                const isSubActive = activeWebsiteCollection === sub.id;
                return (
                  <button
                    key={sub.id}
                    type="button"
                    role="tab"
                    aria-selected={isSubActive}
                    onClick={() => setActiveWebsiteCollection(sub.id)}
                    onMouseEnter={() => setCursor("button")}
                    onMouseLeave={resetCursor}
                    className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-[11px] sm:text-xs font-semibold transition-[transform,background-color,border-color,color,box-shadow] duration-200 cursor-pointer flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 active:scale-[0.98] ${
                      isSubActive
                        ? "bg-gradient-to-r from-amber-50 via-amber-100/80 to-amber-50 text-amber-950 border border-amber-400/80 font-bold shadow-[0_3px_12px_rgba(245,158,11,0.18)]"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/70 border border-transparent"
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        isSubActive ? "bg-amber-500 shadow-[0_0_6px_#f59e0b]" : "bg-slate-300"
                      }`}
                    />
                    <span>{sub.label}</span>
                    <span
                      className={`text-[9.5px] font-mono px-1.5 py-0.5 rounded-md ${
                        isSubActive
                          ? "bg-amber-500/20 text-amber-900 font-bold"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {sub.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {activeCategory === "ios-apps" && (
          <div className="mb-6 sm:mb-7 flex justify-center animate-project-grid-enter">
            <div
              role="tablist"
              aria-label="iOS App Collections"
              className="inline-flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 p-1.5 rounded-2xl bg-white/80 backdrop-blur-md border border-slate-200/90 shadow-[0_8px_24px_rgba(15,23,42,0.05)]"
            >
              {IOS_COLLECTIONS.map((sub) => {
                const isSubActive = activeIosCollection === sub.id;
                return (
                  <button
                    key={sub.id}
                    type="button"
                    role="tab"
                    aria-selected={isSubActive}
                    onClick={() => setActiveIosCollection(sub.id)}
                    onMouseEnter={() => setCursor("button")}
                    onMouseLeave={resetCursor}
                    className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-[11px] sm:text-xs font-semibold transition-[transform,background-color,border-color,color,box-shadow] duration-200 cursor-pointer flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 active:scale-[0.98] ${
                      isSubActive
                        ? "bg-gradient-to-r from-amber-50 via-amber-100/80 to-amber-50 text-amber-950 border border-amber-400/80 font-bold shadow-[0_3px_12px_rgba(245,158,11,0.18)]"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/70 border border-transparent"
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        isSubActive ? "bg-amber-500 shadow-[0_0_6px_#f59e0b]" : "bg-slate-300"
                      }`}
                    />
                    <span>{sub.label}</span>
                    <span
                      className={`text-[9.5px] font-mono px-1.5 py-0.5 rounded-md ${
                        isSubActive
                          ? "bg-amber-500/20 text-amber-900 font-bold"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {sub.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Active Collection Context Header Bar */}
        <div
          key={`meta-${viewKey}`}
          className="mb-5 sm:mb-6 px-3.5 sm:px-4 py-2.5 rounded-xl bg-white/80 backdrop-blur-md border border-slate-200/90 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 animate-project-grid-enter"
        >
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2 py-0.5 rounded text-[9.5px] font-mono font-bold uppercase tracking-wider bg-amber-50 text-amber-800 border border-amber-400/50">
              {activeCollectionMeta.badge}
            </span>
            <h3 className="text-xs sm:text-sm font-bold font-heading text-slate-900">
              {activeCollectionMeta.label}
            </h3>
          </div>
          <p className="text-[11px] sm:text-xs text-slate-600 leading-snug">
            {activeCollectionMeta.description}
          </p>
        </div>

        {/* ============================================================ */}
        {/* ACTIVE CATEGORY / COLLECTION CARDS DISPLAY                   */}
        {/* ============================================================ */}
        <div
          key={viewKey}
          id={`projects-panel-${activeCategory}`}
          role="tabpanel"
          className="animate-project-grid-enter min-h-[340px]"
        >
          {/* 1. Websites, Android Apps, and iOS Apps Collections */}
          {(activeCategory === "websites" ||
            activeCategory === "android-apps" ||
            activeCategory === "ios-apps") && (
            <div
              className={`grid ${projectGridColumnsClass} gap-2.5 sm:gap-3 md:gap-3.5 xl:gap-4`}
            >
              {activeProjects.map((project, index) => {
                const floatClass = FLOAT_CLASSES[index % 4];
                return (
                  <div key={project.id} className={`h-full ${floatClass}`}>
                    <ProjectCard
                      project={project}
                      onSelect={handleSelectProject}
                    />
                  </div>
                );
              })}
            </div>
          )}

          {/* 2. Data Analytics & Automation (2 Separate Main Service Cards) */}
          {activeCategory === "data-analytics" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 max-w-4xl mx-auto">
              <div key="dashboard-card-excel" className={`h-full ${FLOAT_CLASSES[0]}`}>
                <ExcelCard onSelect={handleSelectExcel} />
              </div>
              <div key="dashboard-card-powerbi" className={`h-full ${FLOAT_CLASSES[1]}`}>
                <PowerBICard onSelect={handleSelectPowerBI} />
              </div>
            </div>
          )}

          {/* 3. Digital Marketing */}
          {activeCategory === "digital-marketing" && (
            <div className="max-w-4xl mx-auto">
              <DigitalMarketingShowcaseCard onDiscuss={handleDiscuss} />
            </div>
          )}

          {/* 4. Blockchain Development */}
          {activeCategory === "blockchain" && BLOCKCHAIN_SERVICE && (
            <div className="max-w-4xl mx-auto">
              <BlockchainShowcaseCard
                service={BLOCKCHAIN_SERVICE}
                onOpenServiceModal={handleOpenServiceModal}
                onDiscuss={handleDiscuss}
              />
            </div>
          )}
        </div>

        {/* Subtle Pricing Disclaimer */}
        <div className="mt-8 text-center">
          <p className="inline-flex items-center justify-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-slate-200/80 text-[11px] sm:text-xs font-mono text-slate-700 max-w-2xl mx-auto shadow-xs">
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

      {/* Service Detail Modal (for Blockchain Solutions & Web3 Integration) */}
      {selectedService && (
        <Suspense fallback={null}>
          <ServiceModal
            service={selectedService}
            isOpen={!!selectedService}
            onClose={handleCloseServiceModal}
            onSelectServiceForBooking={(title) => {
              if (onDiscussProject) {
                onDiscussProject(`Inquiry regarding service: ${title}`);
              }
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
