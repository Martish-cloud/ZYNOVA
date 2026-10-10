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
      className="group relative rounded-xl liquid-glass-card !border-emerald-400/40 hover:!border-emerald-400/80 hover:!shadow-[0_16px_38px_-10px_rgba(16,185,129,0.28)] flex flex-col justify-between cursor-pointer overflow-hidden h-full gpu-layer"
    >
      {/* Top border light sweep on hover */}
      <div className="absolute -top-px left-1/2 -translate-x-1/2 w-3/4 h-[1.5px] bg-gradient-to-r from-transparent via-emerald-400/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20" />

      <div>
        {/* Visual Header Representation */}
        <div className="w-full h-32 sm:h-36 md:h-40 relative overflow-hidden bg-slate-950/60 border-b border-white/20 group-hover:border-emerald-400/50 transition-colors">
          <PortfolioImage
            src={excelDashboards[0]?.image || "/images/dashboards/excel/excel-dashboard-1.webp"}
            alt="Excel Dashboard Analytics"
            isPriority={false}
            className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.04]"
            fallbackTitle="Excel Dashboard Analytics"
            fallbackBadge="Data & BI"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent pointer-events-none" />

          {/* Top-left category tag */}
          <div className="absolute top-2 left-2 z-10">
            <span className="px-1.5 py-0.5 rounded text-[8px] sm:text-[8.5px] font-mono uppercase tracking-widest bg-slate-950/80 backdrop-blur-md text-emerald-300 border border-emerald-400/40 flex items-center gap-1 shadow-xs font-bold">
              <FileSpreadsheet className="w-2.5 h-2.5 text-emerald-400" />
              <span>EXCEL</span>
            </span>
          </div>

          {/* Category Pill on top-right */}
          <div className="absolute top-2 right-2 z-10">
            <span className="px-2 py-0.5 rounded-full text-[8px] sm:text-[9px] font-mono font-bold bg-slate-950/80 backdrop-blur-md text-emerald-300 border border-emerald-400/40 shadow-xs">
              {excelDashboards.length} DASHBOARDS
            </span>
          </div>

          {/* Floating Tag over Visual */}
          <div className="absolute bottom-1.5 left-2 px-1.5 py-0.5 rounded bg-slate-950/80 backdrop-blur-md border border-emerald-400/40 text-[8px] sm:text-[8.5px] font-mono text-emerald-300 flex items-center gap-1 pointer-events-none shadow-xs font-semibold">
            <Sparkles className="w-2.5 h-2.5 text-emerald-400" />
            <span>Formulas &bull; Auto</span>
          </div>
        </div>

        {/* Card Content Area */}
        <div className="p-3 sm:p-3.5 md:p-4">
          <div className="flex items-center justify-between gap-1.5 mb-1">
            <h3 className="text-xs sm:text-sm md:text-base font-bold font-heading text-[#9BD7FF] group-hover:text-[#BAE6FD] transition-colors truncate">
              Excel Dashboard Analytics
            </h3>
            <span className="text-[8px] sm:text-[8.5px] font-mono px-1.5 py-0.5 rounded bg-emerald-400/[0.18] text-emerald-300 border border-emerald-400/40 shrink-0 font-bold">
              Data &amp; BI
            </span>
          </div>

          <p className="text-[9.5px] sm:text-[10.5px] font-bold text-emerald-400 font-mono mb-1 truncate">
            Dashboards &amp; Analytics
          </p>

          <p className="text-[10.5px] sm:text-xs text-[#B7F0C1] font-normal leading-relaxed line-clamp-2 mb-2.5">
            Interactive Excel dashboards, automated reporting, Pivot Tables, formulas, data analysis and reporting.
          </p>

          {/* Technologies / Feature Chips */}
          <div className="flex flex-wrap gap-1 mb-2.5">
            {["Dashboards", "Pivot Tables", "Automation", "Formulas"].map((chip) => (
              <span
                key={chip}
                className="px-1.5 py-0.5 rounded text-[8.5px] sm:text-[9px] font-mono font-medium bg-white/[0.14] text-slate-200 border border-white/25 shadow-[inset_0_1px_0_rgba(255,255,255,0.3)]"
              >
                {chip}
              </span>
            ))}
          </div>

          {/* Direct Transparent Pricing Module */}
          <div className="pt-2 border-t border-white/20">
            <div className="flex items-baseline justify-between gap-1 mb-1.5">
              <span className="text-[8.5px] sm:text-[9px] font-mono font-bold tracking-wider text-slate-300 uppercase">
                Starting From
              </span>
              <span className="text-sm sm:text-base font-mono font-extrabold text-emerald-300">
                $18
              </span>
            </div>
            <div className="grid grid-cols-3 gap-1 text-center liquid-glass-subcard rounded-lg p-1.5">
              <div className="px-1 py-0.5 rounded bg-white/[0.12] border border-white/25">
                <span className="block text-[7.5px] font-mono uppercase text-slate-300 font-bold">Basic</span>
                <span className="text-[10.5px] sm:text-xs font-mono font-bold text-emerald-300">$18</span>
              </div>
              <div className="px-1 py-0.5 rounded bg-white/[0.12] border border-white/25">
                <span className="block text-[7.5px] font-mono uppercase text-slate-300 font-bold">Std</span>
                <span className="text-[10.5px] sm:text-xs font-mono font-bold text-emerald-300">$65</span>
              </div>
              <div className="px-1 py-0.5 rounded bg-white/[0.12] border border-white/25">
                <span className="block text-[7.5px] font-mono uppercase text-slate-300 font-bold">Prem</span>
                <span className="text-[10.5px] sm:text-xs font-mono font-bold text-emerald-300">$176</span>
              </div>
            </div>
            <div className="mt-1 flex items-center justify-between text-[8.5px] sm:text-[9.5px] font-mono">
              <span className="text-slate-300 font-medium">Range:</span>
              <span className="text-emerald-300 font-bold">$18 – $176</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Action Line */}
      <div className="px-3 sm:px-3.5 md:px-4 pb-3 sm:pb-3.5 pt-0.5">
        <div className="pt-2 border-t border-white/20 flex items-center justify-between text-xs font-bold text-emerald-400 group-hover:text-emerald-300 transition-colors">
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
      className="group relative rounded-xl liquid-glass-card !border-amber-400/40 hover:!border-amber-400/80 hover:!shadow-[0_16px_38px_-10px_rgba(245,158,11,0.28)] flex flex-col justify-between cursor-pointer overflow-hidden h-full gpu-layer"
    >
      {/* Top border light sweep on hover */}
      <div className="absolute -top-px left-1/2 -translate-x-1/2 w-3/4 h-[1.5px] bg-gradient-to-r from-transparent via-amber-400/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20" />

      <div>
        {/* Visual Header Representation */}
        <div className="w-full h-32 sm:h-36 md:h-40 relative overflow-hidden bg-slate-950/60 border-b border-white/20 group-hover:border-amber-400/50 transition-colors">
          <PortfolioImage
            src={powerBIDashboards[0]?.image || "/images/dashboards/powerbi/powerbi-dashboard-1.webp"}
            alt="Power BI Dashboards — Professional"
            isPriority={false}
            className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.04]"
            fallbackTitle="Power BI Dashboards"
            fallbackBadge="Data & BI"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent pointer-events-none" />

          {/* Top-left category tag */}
          <div className="absolute top-2 left-2 z-10">
            <span className="px-1.5 py-0.5 rounded text-[8px] sm:text-[8.5px] font-mono uppercase tracking-widest bg-slate-950/80 backdrop-blur-md text-amber-300 border border-amber-400/40 flex items-center gap-1 shadow-xs font-bold">
              <BarChart3 className="w-2.5 h-2.5 text-amber-400" />
              <span>POWER BI</span>
            </span>
          </div>

          {/* Category Pill on top-right */}
          <div className="absolute top-2 right-2 z-10">
            <span className="px-2 py-0.5 rounded-full text-[8px] sm:text-[9px] font-mono font-bold bg-slate-950/80 backdrop-blur-md text-amber-300 border border-amber-400/40 shadow-xs">
              {powerBIDashboards.length} DASHBOARDS
            </span>
          </div>

          {/* Floating Tag over Visual */}
          <div className="absolute bottom-1.5 left-2 px-1.5 py-0.5 rounded bg-slate-950/80 backdrop-blur-md border border-amber-400/40 text-[8px] sm:text-[8.5px] font-mono text-amber-300 flex items-center gap-1 pointer-events-none shadow-xs font-semibold">
            <TrendingUp className="w-2.5 h-2.5 text-amber-400" />
            <span>DAX &bull; BI Models</span>
          </div>
        </div>

        {/* Card Content Area */}
        <div className="p-3 sm:p-3.5 md:p-4">
          <div className="flex items-center justify-between gap-1.5 mb-1">
            <h3 className="text-xs sm:text-sm md:text-base font-bold font-heading text-[#9BD7FF] group-hover:text-[#BAE6FD] transition-colors truncate">
              Power BI Dashboards — Professional
            </h3>
            <span className="text-[8px] sm:text-[8.5px] font-mono px-1.5 py-0.5 rounded bg-amber-400/[0.18] text-amber-300 border border-amber-400/40 shrink-0 font-bold">
              Data &amp; BI
            </span>
          </div>

          <p className="text-[9.5px] sm:text-[10.5px] font-bold text-amber-400 font-mono mb-1 truncate">
            Enterprise BI Dashboards
          </p>

          <p className="text-[10.5px] sm:text-xs text-[#B7F0C1] font-normal leading-relaxed line-clamp-2 mb-2.5">
            Interactive executive business intelligence dashboards, DAX metrics, data modeling, automated ETL &amp; KPIs.
          </p>

          {/* Technologies / Feature Chips */}
          <div className="flex flex-wrap gap-1 mb-2.5">
            {["Power BI", "DAX", "Data Modeling", "ETL Pipelines"].map((chip) => (
              <span
                key={chip}
                className="px-1.5 py-0.5 rounded text-[8.5px] sm:text-[9px] font-mono font-medium bg-white/[0.14] text-slate-200 border border-white/25 shadow-[inset_0_1px_0_rgba(255,255,255,0.3)]"
              >
                {chip}
              </span>
            ))}
          </div>

          {/* Direct Transparent Pricing Module */}
          <div className="pt-2 border-t border-white/20">
            <div className="flex items-baseline justify-between gap-1 mb-1.5">
              <span className="text-[8.5px] sm:text-[9px] font-mono font-bold tracking-wider text-slate-300 uppercase">
                Starting From
              </span>
              <span className="text-sm sm:text-base font-mono font-extrabold text-amber-300">
                $21
              </span>
            </div>
            <div className="grid grid-cols-3 gap-1 text-center liquid-glass-subcard rounded-lg p-1.5">
              <div className="px-1 py-0.5 rounded bg-white/[0.12] border border-white/25">
                <span className="block text-[7.5px] font-mono uppercase text-slate-300 font-bold">Basic</span>
                <span className="text-[10.5px] sm:text-xs font-mono font-bold text-amber-300">$21</span>
              </div>
              <div className="px-1 py-0.5 rounded bg-white/[0.12] border border-white/25">
                <span className="block text-[7.5px] font-mono uppercase text-slate-300 font-bold">Std</span>
                <span className="text-[10.5px] sm:text-xs font-mono font-bold text-amber-300">$95</span>
              </div>
              <div className="px-1 py-0.5 rounded bg-white/[0.12] border border-white/25">
                <span className="block text-[7.5px] font-mono uppercase text-slate-300 font-bold">Prem</span>
                <span className="text-[10.5px] sm:text-xs font-mono font-bold text-amber-300">$279</span>
              </div>
            </div>
            <div className="mt-1 flex items-center justify-between text-[8.5px] sm:text-[9.5px] font-mono">
              <span className="text-slate-300 font-medium">Range:</span>
              <span className="text-amber-300 font-bold">$21 – $279</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Action Line */}
      <div className="px-3 sm:px-3.5 md:px-4 pb-3 sm:pb-3.5 pt-0.5">
        <div className="pt-2 border-t border-white/20 flex items-center justify-between text-xs font-bold text-amber-400 group-hover:text-amber-300 transition-colors">
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
      className={`group relative rounded-xl liquid-glass-card ${
        project.platform === "iOS"
          ? "!border-purple-400/50 hover:!border-purple-500/80 hover:!shadow-[0_16px_34px_-10px_rgba(168,85,247,0.26)]"
          : project.platform === "Android"
          ? "!border-emerald-400/50 hover:!border-emerald-500/80 hover:!shadow-[0_16px_34px_-10px_rgba(16,185,129,0.26)]"
          : "hover:!border-amber-500/75"
      } flex flex-col justify-between cursor-pointer overflow-hidden h-full gpu-layer`}
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
        <div className="w-full h-28 sm:h-32 md:h-36 relative overflow-hidden bg-slate-950/60 border-b border-white/20 group-hover:border-amber-400/50 transition-colors">
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
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent pointer-events-none" />

          {/* Top-left category tag */}
          <div className="absolute top-1.5 left-1.5 z-10">
            <span
              className={`px-1.5 py-0.5 rounded text-[7.5px] sm:text-[8px] font-mono uppercase tracking-widest shadow-xs border font-bold backdrop-blur-md ${
                project.platform === "iOS"
                  ? "bg-slate-950/80 text-purple-300 border-purple-400/40"
                  : project.platform === "Android"
                  ? "bg-slate-950/80 text-emerald-300 border-emerald-400/40"
                  : "bg-slate-950/80 text-white border-white/25"
              }`}
            >
              {project.platform ? `${project.platform} App` : project.category}
            </span>
          </div>

          {/* Category Pill on top-right */}
          <div className="absolute top-1.5 right-1.5 z-10">
            <span
              className={`px-1.5 py-0.5 rounded-full text-[8px] sm:text-[8.5px] font-mono font-bold shadow-xs border backdrop-blur-md ${
                project.platform === "iOS"
                  ? "bg-slate-950/80 text-purple-300 border-purple-400/40"
                  : project.platform === "Android"
                  ? "bg-slate-950/80 text-emerald-300 border-emerald-400/40"
                  : "bg-slate-950/80 text-amber-300 border-amber-400/40"
              }`}
            >
              {project.badge}
            </span>
          </div>
        </div>

        {/* Card Content Area */}
        <div className="p-2.5 sm:p-3 md:p-3.5">
          <div className="flex items-center justify-between gap-1 mb-0.5">
            <h3 className="text-xs sm:text-sm font-bold font-heading text-[#9BD7FF] group-hover:text-[#BAE6FD] transition-colors line-clamp-1">
              {project.title}
            </h3>
            {project.platform && (
              <span
                className={`text-[7.5px] sm:text-[8px] font-mono font-bold px-1 py-0.5 rounded shrink-0 ${
                  project.platform === "iOS"
                    ? "text-purple-300 bg-purple-400/[0.18] border border-purple-400/40"
                    : "text-emerald-300 bg-emerald-400/[0.18] border border-emerald-400/40"
                }`}
              >
                {project.platform}
              </span>
            )}
          </div>

          <p className="text-[9px] sm:text-[9.5px] font-medium text-slate-300 font-mono mb-1 line-clamp-1">
            {project.subtitle}
          </p>

          <p className="text-[9.5px] sm:text-[10.5px] text-[#B7F0C1] font-normal leading-snug line-clamp-2 mb-2">
            {project.shortDesc}
          </p>

          {/* Technologies Tags */}
          <div className="flex flex-wrap gap-1 mb-2">
            {project.technologies.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="px-1 py-0.5 rounded text-[8px] sm:text-[8.5px] font-mono font-medium bg-white/[0.14] text-slate-200 border border-white/25 shadow-[inset_0_1px_0_rgba(255,255,255,0.3)]"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 3 && (
              <span className="px-1 py-0.5 rounded text-[8px] sm:text-[8.5px] font-mono font-semibold bg-white/[0.10] text-slate-300 border border-white/20">
                +{project.technologies.length - 3}
              </span>
            )}
          </div>

          {/* Direct Transparent Pricing Module */}
          {project.platform ? (
            <div className="pt-1.5 border-t border-white/20">
              <div className="grid grid-cols-3 gap-0.5 text-center liquid-glass-subcard rounded-md p-1">
                <div className="px-0.5 py-0.5 rounded bg-white/[0.12] border border-white/25">
                  <span className="block text-[7px] font-mono uppercase text-slate-300 font-bold">Basic</span>
                  <span className={`text-[10px] sm:text-[11px] font-mono font-bold ${project.platform === "iOS" ? "text-purple-300" : "text-emerald-300"}`}>
                    {project.pricing.basicPrice}
                  </span>
                </div>
                <div className="px-0.5 py-0.5 rounded bg-white/[0.12] border border-white/25">
                  <span className="block text-[7px] font-mono uppercase text-slate-300 font-bold">Std</span>
                  <span className={`text-[10px] sm:text-[11px] font-mono font-bold ${project.platform === "iOS" ? "text-purple-300" : "text-emerald-300"}`}>
                    {project.pricing.standardPrice}
                  </span>
                </div>
                <div className="px-0.5 py-0.5 rounded bg-white/[0.12] border border-white/25">
                  <span className="block text-[7px] font-mono uppercase text-slate-300 font-bold">Prem</span>
                  <span className="text-[10px] sm:text-[11px] font-mono font-bold text-amber-300">
                    {project.pricing.premiumPrice}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="pt-1.5 border-t border-white/20">
              <div className="flex items-baseline justify-between gap-1 mb-1">
                <span className="text-[8px] sm:text-[8.5px] font-mono font-bold tracking-wider text-slate-300 uppercase">
                  Starting From
                </span>
                <span className="text-xs sm:text-sm font-mono font-extrabold text-amber-300">
                  {project.pricing.startingPrice}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-0.5 text-[8.5px] sm:text-[9px] font-mono liquid-glass-subcard rounded-md p-1">
                <div className="truncate">
                  <span className="text-slate-300 font-normal">Std: </span>
                  <span className="text-white font-bold">{project.pricing.standardPrice}</span>
                </div>
                <div className="truncate text-right">
                  <span className="text-slate-300 font-normal">Prem: </span>
                  <span className="text-amber-300 font-bold">{project.pricing.premiumPrice}</span>
                </div>
              </div>
              {project.pricing.customPrice && (
                <div className="mt-0.5 flex items-center justify-between text-[8px] sm:text-[8.5px] font-mono">
                  <span className="text-slate-300 font-medium">Custom Scope:</span>
                  <span className="text-amber-300 font-bold">{project.pricing.customPrice}</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Bottom Action Line: VIEW ARCHITECTURE & VISIT WEBSITE */}
      <div className="px-2.5 sm:px-3 md:px-3.5 pb-2.5 sm:pb-3 pt-0.5">
        <div className="pt-1.5 border-t border-white/20 flex items-center justify-between gap-1 text-xs">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSelect(project);
            }}
            className="font-heading uppercase tracking-wider text-[8.5px] sm:text-[9.5px] font-bold text-slate-200 group-hover:text-amber-300 transition-colors flex items-center gap-0.5 cursor-pointer truncate focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded"
          >
            <span>VIEW ARCHITECTURE</span>
            <ArrowRight className="w-2.5 h-2.5 text-slate-300 group-hover:text-amber-300 shrink-0" />
          </button>

          {project.demoUrl ? (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="px-1.5 py-0.5 rounded bg-amber-400/20 hover:bg-amber-400/30 active:scale-[0.97] text-amber-300 hover:text-amber-200 border border-amber-400/40 hover:border-amber-400/60 text-[8px] sm:text-[9px] font-mono font-bold flex items-center gap-0.5 transition-[background-color,border-color,transform] cursor-pointer shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
            >
              <span>VISIT WEBSITE</span>
              <ArrowRight className="w-2.5 h-2.5" />
            </a>
          ) : (
            <span className="text-[7.5px] sm:text-[8px] font-mono font-semibold text-slate-300 bg-white/[0.10] border border-white/20 px-1 py-0.5 rounded select-none shrink-0">
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
      className="group relative rounded-2xl liquid-glass-panel !border-amber-400/40 hover:!border-amber-400/70 transition-[transform,border-color,box-shadow] duration-300 ease-out hover:-translate-y-1.5 p-5 sm:p-6 md:p-7 cursor-pointer overflow-hidden gpu-layer"
    >
      {/* Top border light sweep */}
      <div className="absolute -top-px left-1/2 -translate-x-1/2 w-3/4 h-[1.5px] bg-gradient-to-r from-transparent via-amber-400/90 to-transparent opacity-80 group-hover:opacity-100 transition-opacity pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left Column: Service Overview & Tech Stack */}
        <div className="lg:col-span-7 space-y-3.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider bg-amber-400/[0.18] text-amber-300 border border-amber-400/40">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>SERVICE // {service.number} &bull; WEB3 ARCHITECTURE</span>
            </span>
            {service.pricing && (
              <span className="px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-mono font-bold bg-white/[0.14] text-white border border-white/25">
                {service.pricing}
              </span>
            )}
          </div>

          <h3 className="text-lg sm:text-xl md:text-2xl font-bold font-heading text-[#9BD7FF] group-hover:text-[#BAE6FD] transition-colors">
            {service.title}
          </h3>

          <p className="text-xs sm:text-sm text-[#B7F0C1] font-medium leading-relaxed">
            {service.shortDesc}
          </p>

          <p className="text-xs text-slate-200 font-normal leading-relaxed">
            {service.fullDesc}
          </p>

          {/* Technologies */}
          <div className="pt-1">
            <span className="block text-[10px] font-mono uppercase tracking-wider text-slate-300 font-bold mb-1.5">
              Core Protocols &amp; Technologies
            </span>
            <div className="flex flex-wrap gap-1.5">
              {service.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-md text-[10px] sm:text-xs font-mono font-semibold bg-white/[0.14] text-slate-100 border border-white/25 shadow-[inset_0_1px_0_rgba(255,255,255,0.3)]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Deliverables & Preserved Pricing Tiers */}
        <div className="lg:col-span-5 space-y-4 liquid-glass-subcard rounded-xl p-4 sm:p-5">
          {/* Pricing Module */}
          {service.pricing && (
            <div className="pb-3.5 border-b border-white/20">
              <div className="flex items-baseline justify-between gap-2 mb-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-300 font-bold">
                  Investment Range
                </span>
                <span className="text-base sm:text-lg font-mono font-extrabold text-amber-300">
                  {service.pricing}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-1.5 text-center">
                <div className="p-1.5 rounded-lg bg-white/[0.12] border border-white/25">
                  <span className="block text-[8px] font-mono uppercase text-slate-300 font-bold">Basic</span>
                  <span className="text-xs font-mono font-bold text-white">$480</span>
                </div>
                <div className="p-1.5 rounded-lg bg-white/[0.12] border border-white/25">
                  <span className="block text-[8px] font-mono uppercase text-slate-300 font-bold">Standard</span>
                  <span className="text-xs font-mono font-bold text-white">$1,200</span>
                </div>
                <div className="p-1.5 rounded-lg bg-white/[0.14] border border-amber-400/50">
                  <span className="block text-[8px] font-mono uppercase text-amber-300 font-bold">Premium</span>
                  <span className="text-xs font-mono font-bold text-amber-300">$2,400</span>
                </div>
              </div>
            </div>
          )}

          {/* Deliverables */}
          <div>
            <span className="block text-[10px] font-mono uppercase tracking-wider text-slate-300 font-bold mb-2">
              Verified Deliverables
            </span>
            <ul className="space-y-1.5">
              {service.deliverables.map((item) => (
                <li key={item} className="flex items-start gap-2 text-xs text-slate-200 font-normal">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
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
              className="flex-1 py-2 px-3 rounded-lg bg-white/[0.14] hover:bg-white/[0.22] text-white hover:text-amber-300 border border-white/25 hover:border-amber-400/60 text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
            >
              <Layers className="w-3.5 h-3.5 text-amber-400" />
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
      className="group relative rounded-2xl liquid-glass-panel !border-amber-400/40 hover:!border-amber-400/70 transition-[transform,border-color,box-shadow] duration-300 ease-out hover:-translate-y-1.5 p-5 sm:p-6 md:p-7 cursor-pointer overflow-hidden gpu-layer"
    >
      {/* Top border light sweep */}
      <div className="absolute -top-px left-1/2 -translate-x-1/2 w-3/4 h-[1.5px] bg-gradient-to-r from-transparent via-amber-400/90 to-transparent opacity-80 group-hover:opacity-100 transition-opacity pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        <div className="lg:col-span-7 space-y-3.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider bg-amber-400/[0.18] text-amber-300 border border-amber-400/40">
              <Megaphone className="w-3.5 h-3.5 text-amber-400" />
              <span>DIGITAL MARKETING &bull; ADVISORY &amp; GROWTH</span>
            </span>
            <span className="px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-mono font-bold bg-white/[0.14] text-slate-200 border border-white/25">
              Custom Consultation Scope
            </span>
          </div>

          <h3 className="text-lg sm:text-xl md:text-2xl font-bold font-heading text-[#9BD7FF] group-hover:text-[#BAE6FD] transition-colors">
            Digital Marketing &amp; Search Visibility Engineering
          </h3>

          <p className="text-xs sm:text-sm text-[#B7F0C1] font-medium leading-relaxed">
            Technical SEO architecture, conversion-focused landing funnels, email marketing integrations, and digital brand positioning tailored to your business goals.
          </p>

          <p className="text-xs text-slate-200 font-normal leading-relaxed">
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
                className="px-2.5 py-1 rounded-md text-[10px] sm:text-xs font-mono font-semibold bg-white/[0.14] text-slate-100 border border-white/25 shadow-[inset_0_1px_0_rgba(255,255,255,0.3)]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5 space-y-4 liquid-glass-subcard rounded-xl p-4 sm:p-5">
          <div className="pb-3 border-b border-white/20">
            <span className="block text-[10px] font-mono uppercase tracking-wider text-amber-300 font-bold mb-1">
              Portfolio &amp; Engagement Status
            </span>
            <p className="text-xs text-slate-200 font-normal leading-relaxed">
              Dedicated Digital Marketing campaigns and growth roadmaps are scoped individually based on your target market, channels, and existing web infrastructure.
            </p>
          </div>

          <ul className="space-y-1.5 text-xs text-slate-200 font-normal">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
              <span>Custom semantic markup &amp; search-friendly site architecture</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
              <span>High-converting landing pages &amp; lead capture workflows</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
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
                      ? "bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-slate-950 font-bold border border-amber-300 shadow-[0_6px_20px_rgba(245,158,11,0.32)]"
                      : "liquid-glass-pill text-slate-200 hover:text-white"
                  }`}
                >
                  <Icon
                    className={`w-3.5 h-3.5 shrink-0 transition-colors ${
                      isActive ? "text-slate-950" : "text-amber-400 group-hover:text-amber-300"
                    }`}
                  />
                  <span className="hidden sm:inline">{cat.label}</span>
                  <span className="sm:hidden">{cat.shortLabel}</span>
                  <span
                    className={`px-1.5 py-0.2 rounded-full text-[9.5px] font-mono font-bold transition-colors ${
                      isActive
                        ? "bg-slate-950/20 text-slate-950"
                        : "bg-white/[0.14] text-slate-300 group-hover:bg-amber-400/20 group-hover:text-amber-300"
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
              className="inline-flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 p-1.5 rounded-2xl liquid-glass-card"
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
                        ? "bg-amber-400/25 text-amber-300 border border-amber-400/60 font-bold shadow-[0_3px_12px_rgba(245,158,11,0.25)]"
                        : "text-slate-200 hover:text-white hover:bg-white/[0.14] border border-transparent"
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        isSubActive ? "bg-amber-400 shadow-[0_0_8px_#f59e0b]" : "bg-slate-400"
                      }`}
                    />
                    <span>{sub.label}</span>
                    <span
                      className={`text-[9.5px] font-mono px-1.5 py-0.5 rounded-md ${
                        isSubActive
                          ? "bg-amber-400/20 text-amber-300 font-bold"
                          : "bg-white/[0.12] text-slate-300 font-semibold"
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
              className="inline-flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 p-1.5 rounded-2xl liquid-glass-card"
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
                        ? "bg-amber-400/25 text-amber-300 border border-amber-400/60 font-bold shadow-[0_3px_12px_rgba(245,158,11,0.25)]"
                        : "text-slate-200 hover:text-white hover:bg-white/[0.14] border border-transparent"
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        isSubActive ? "bg-amber-400 shadow-[0_0_8px_#f59e0b]" : "bg-slate-400"
                      }`}
                    />
                    <span>{sub.label}</span>
                    <span
                      className={`text-[9.5px] font-mono px-1.5 py-0.5 rounded-md ${
                        isSubActive
                          ? "bg-amber-400/20 text-amber-300 font-bold"
                          : "bg-white/[0.12] text-slate-300 font-semibold"
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
          className="mb-5 sm:mb-6 px-3.5 sm:px-4 py-2.5 rounded-xl liquid-glass-card flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 animate-project-grid-enter"
        >
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2 py-0.5 rounded text-[9.5px] font-mono font-bold uppercase tracking-wider bg-amber-400/[0.18] text-amber-300 border border-amber-400/40">
              {activeCollectionMeta.badge}
            </span>
            <h3 className="text-xs sm:text-sm font-bold font-heading text-white">
              {activeCollectionMeta.label}
            </h3>
          </div>
          <p className="text-[11px] sm:text-xs text-slate-200 font-normal leading-snug">
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
          <p className="inline-flex items-center justify-center gap-2 px-3.5 py-1.5 rounded-full liquid-glass-pill text-[11px] sm:text-xs font-mono font-normal text-slate-300 max-w-2xl mx-auto">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
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
