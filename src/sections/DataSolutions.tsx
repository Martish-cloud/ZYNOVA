import React, { useState, useEffect } from "react";
import { SectionHeading } from "../components/ui/SectionHeading";
import { MagneticButton } from "../components/ui/MagneticButton";
import { AnimatedMetricValue } from "../components/ui/AnimatedMetricValue";
import { useInViewAnimation } from "../hooks/useInViewAnimation";
import { useCursor } from "../context/useCursor";
import {
  FileSpreadsheet,
  BarChart3,
  Filter,
  TrendingUp,
  ArrowUpRight,
  Sparkles
} from "lucide-react";

export const DataSolutions: React.FC = () => {
  const { setCursor, resetCursor } = useCursor();
  const [activeTimeframe, setActiveTimeframe] = useState<"Q1" | "Q2" | "Q3" | "Q4">("Q4");
  const [quarterPulse, setQuarterPulse] = useState(false);

  const {
    ref: featureGridRef,
    isInView: isFeaturesInView,
    prefersReducedMotion
  } = useInViewAnimation<HTMLDivElement>({
    threshold: 0.15,
    rootMargin: "0px 0px -6% 0px",
    retrigger: true
  });

  const {
    ref: analyticsRef,
    isInView: isAnalyticsInView,
    triggerCount: analyticsTriggerCount
  } = useInViewAnimation<HTMLDivElement>({
    threshold: 0.18,
    rootMargin: "0px 0px -6% 0px",
    retrigger: true
  });

  // Simulated metrics based on timeframe
  const metricsData = {
    Q1: { processed: "420,000", speed: "99.4%", latency: "1.2s", accuracy: "99.98%" },
    Q2: { processed: "680,000", speed: "99.7%", latency: "1.0s", accuracy: "99.99%" },
    Q3: { processed: "890,000", speed: "99.8%", latency: "0.8s", accuracy: "100.0%" },
    Q4: { processed: "1,250,000+", speed: "99.9%", latency: "0.4s", accuracy: "100.0%" }
  };

  const currentMetric = metricsData[activeTimeframe];

  // Subtle card highlight pulse when switching between Q1-Q4
  useEffect(() => {
    if (prefersReducedMotion) return;
    setQuarterPulse(true);
    const timer = setTimeout(() => setQuarterPulse(false), 420);
    return () => clearTimeout(timer);
  }, [activeTimeframe, prefersReducedMotion]);

  const handleSelectTimeframe = (q: "Q1" | "Q2" | "Q3" | "Q4") => {
    setActiveTimeframe(q);
  };

  const counterTriggerKey = `${analyticsTriggerCount}-${activeTimeframe}`;

  return (
    <section id="data-solutions" className="py-14 sm:py-18 md:py-20 relative z-10 bg-transparent border-t border-slate-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="DATA &amp; BUSINESS INTELLIGENCE"
          title="Turn Business Data Into"
          highlightedTitle="Actionable Decisions."
          subtitle="Transform chaotic spreadsheets and scattered databases into automated executive dashboards, standardized cleaning pipelines, and high-impact Power BI models."
          badgeVariant="gold"
          subtitleVariant="typewriter"
        />

        {/* Top Feature Grid with Scroll-Triggered Staggered Reveal */}
        <div
          ref={featureGridRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4 mb-7 sm:mb-8"
        >
          {/* Card 1: Data Cleaning & Merging */}
          <div
            style={!prefersReducedMotion ? { transitionDelay: isFeaturesInView ? "0ms" : "0ms" } : undefined}
            className={`p-4 sm:p-4.5 rounded-xl sm:rounded-2xl bg-gradient-to-b from-white/90 to-slate-50/85 border border-slate-200/80 hover:border-amber-400/50 backdrop-blur-xl shadow-[0_10px_30px_rgba(15,23,42,0.05),inset_0_1px_0_rgba(255,255,255,0.9)] transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 group ${
              isFeaturesInView
                ? "opacity-100 translate-y-0 scale-100"
                : "opacity-0 translate-y-5 scale-[0.98]"
            }`}
          >
            <div className="w-8.5 h-8.5 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-amber-50/90 border border-amber-300/60 flex items-center justify-center text-amber-600 mb-2.5 group-hover:scale-105 transition-transform">
              <Filter className="w-4.5 h-4.5" />
            </div>
            <h3 className="font-heading text-sm sm:text-base font-bold text-slate-900 mb-1 tracking-tight">
              Data Cleaning &amp; Merging
            </h3>
            <p className="text-xs text-slate-600 leading-normal sm:leading-relaxed">
              Systematic elimination of duplicates, syntax sanitization, date/currency normalization, and multi-file master merging using advanced Excel Power Query.
            </p>
          </div>

          {/* Card 2: Professional Excel Dashboards */}
          <div
            style={!prefersReducedMotion ? { transitionDelay: isFeaturesInView ? "80ms" : "0ms" } : undefined}
            className={`p-4 sm:p-4.5 rounded-xl sm:rounded-2xl bg-gradient-to-b from-white/90 to-slate-50/85 border border-slate-200/80 hover:border-yellow-500/50 backdrop-blur-xl shadow-[0_10px_30px_rgba(15,23,42,0.05),inset_0_1px_0_rgba(255,255,255,0.9)] transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 group ${
              isFeaturesInView
                ? "opacity-100 translate-y-0 scale-100"
                : "opacity-0 translate-y-5 scale-[0.98]"
            }`}
          >
            <div className="w-8.5 h-8.5 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-yellow-50/90 border border-yellow-300/60 flex items-center justify-center text-amber-600 mb-2.5 group-hover:scale-105 transition-transform">
              <FileSpreadsheet className="w-4.5 h-4.5" />
            </div>
            <h3 className="font-heading text-sm sm:text-base font-bold text-slate-900 mb-1 tracking-tight">
              Automated Excel Dashboards
            </h3>
            <p className="text-xs text-slate-600 leading-normal sm:leading-relaxed">
              Bespoke operational dashboards featuring dynamic timeline slicers, automated KPI variance indicators, scenario toggles, and one-click refresh buttons.
            </p>
          </div>

          {/* Card 3: Advanced Power BI Reporting */}
          <div
            style={!prefersReducedMotion ? { transitionDelay: isFeaturesInView ? "160ms" : "0ms" } : undefined}
            className={`p-4 sm:p-4.5 rounded-xl sm:rounded-2xl bg-gradient-to-b from-white/90 to-slate-50/85 border border-slate-200/80 hover:border-amber-400/50 backdrop-blur-xl shadow-[0_10px_30px_rgba(15,23,42,0.05),inset_0_1px_0_rgba(255,255,255,0.9)] transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 group ${
              isFeaturesInView
                ? "opacity-100 translate-y-0 scale-100"
                : "opacity-0 translate-y-5 scale-[0.98]"
            }`}
          >
            <div className="w-8.5 h-8.5 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-amber-50/90 border border-amber-300/60 flex items-center justify-center text-amber-600 mb-2.5 group-hover:scale-105 transition-transform">
              <BarChart3 className="w-4.5 h-4.5" />
            </div>
            <h3 className="font-heading text-sm sm:text-base font-bold text-slate-900 mb-1 tracking-tight">
              Enterprise Power BI Models
            </h3>
            <p className="text-xs text-slate-600 leading-normal sm:leading-relaxed">
              Production-grade Star Schema modeling, complex DAX time-intelligence formulas (YoY, MoM, moving averages), drill-through views, and scheduled cloud sync.
            </p>
          </div>
        </div>

        {/* Interactive Simulated Dashboard Demonstration */}
        <div
          ref={analyticsRef}
          className={`relative rounded-2xl sm:rounded-3xl bg-white/85 border border-amber-400/35 backdrop-blur-2xl p-5 sm:p-6 lg:p-7 shadow-[0_24px_60px_-10px_rgba(15,23,42,0.08),0_0_40px_rgba(245,158,11,0.08),inset_0_1px_0_rgba(255,255,255,0.95)] overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isAnalyticsInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          {/* Subtle Demonstration Disclaimer Tag */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-200/80 mb-6">
            <div className="flex items-center gap-2.5">
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping" />
              <div>
                <h4 className="font-heading font-bold text-base text-slate-900">
                  SIMULATED ANALYTICS ENGINE &bull; DEMO INTERFACE
                </h4>
                <p className="text-xs text-slate-600">
                  Interactive architectural demonstration of our reporting modeling &amp; dashboard systems.
                </p>
              </div>
            </div>

            {/* Timeframe Filter Buttons (Q1-Q4) with Active Transitions & Press Microinteractions */}
            <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-100/90 border border-slate-200/90 shadow-inner">
              {(["Q1", "Q2", "Q3", "Q4"] as const).map((q) => {
                const isSelected = activeTimeframe === q;
                return (
                  <button
                    key={q}
                    type="button"
                    onClick={() => handleSelectTimeframe(q)}
                    onMouseEnter={() => setCursor("button")}
                    onMouseLeave={resetCursor}
                    aria-pressed={isSelected}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer active:scale-95 ${
                      isSelected
                        ? "bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 text-slate-950 font-bold border border-amber-400/70 shadow-[0_4px_14px_rgba(245,158,11,0.35)] scale-[1.03]"
                        : "text-slate-600 hover:text-slate-900 hover:bg-white/80 border border-transparent"
                    }`}
                  >
                    {q}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Metric Scorecards Row with Staggered Scroll & Quarter Counter Animations */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
            {/* Metric 1: Automated Records Processed */}
            <div
              style={!prefersReducedMotion ? { transitionDelay: isAnalyticsInView ? "0ms" : "0ms" } : undefined}
              className={`p-3 sm:p-3.5 rounded-xl bg-white/90 border transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                quarterPulse
                  ? "border-amber-400/70 bg-amber-50/40 shadow-[0_8px_24px_-6px_rgba(245,158,11,0.22)]"
                  : "border-slate-200/80 hover:border-amber-400/50 shadow-xs"
              } ${
                isAnalyticsInView
                  ? "opacity-100 translate-y-0 scale-100"
                  : "opacity-0 translate-y-4 scale-[0.97]"
              }`}
            >
              <span className="text-[9.5px] font-mono uppercase text-slate-500 block">
                Automated Records Processed
              </span>
              <div className="text-xl sm:text-2xl font-black font-heading text-slate-900 mt-1">
                <AnimatedMetricValue
                  value={currentMetric.processed}
                  isActive={isAnalyticsInView}
                  triggerKey={counterTriggerKey}
                  durationMs={1100}
                  staggerDelayMs={0}
                />
              </div>
              <span className="text-[10.5px] text-amber-600 font-mono mt-0.5 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> +38.4% Efficiency
              </span>
            </div>

            {/* Metric 2: Pipeline Accuracy Rate */}
            <div
              style={!prefersReducedMotion ? { transitionDelay: isAnalyticsInView ? "75ms" : "0ms" } : undefined}
              className={`p-3 sm:p-3.5 rounded-xl bg-white/90 border transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                quarterPulse
                  ? "border-amber-400/70 bg-amber-50/40 shadow-[0_8px_24px_-6px_rgba(245,158,11,0.22)]"
                  : "border-slate-200/80 hover:border-amber-400/50 shadow-xs"
              } ${
                isAnalyticsInView
                  ? "opacity-100 translate-y-0 scale-100"
                  : "opacity-0 translate-y-4 scale-[0.97]"
              }`}
            >
              <span className="text-[9.5px] font-mono uppercase text-slate-500 block">
                Pipeline Accuracy Rate
              </span>
              <div className="text-xl sm:text-2xl font-black font-heading text-amber-600 mt-1">
                <AnimatedMetricValue
                  value={currentMetric.accuracy}
                  isActive={isAnalyticsInView}
                  triggerKey={counterTriggerKey}
                  durationMs={1100}
                  staggerDelayMs={75}
                />
              </div>
              <span className="text-[10.5px] text-slate-500 font-mono mt-0.5 block">
                Zero formula errors
              </span>
            </div>

            {/* Metric 3: ETL Refresh Latency */}
            <div
              style={!prefersReducedMotion ? { transitionDelay: isAnalyticsInView ? "150ms" : "0ms" } : undefined}
              className={`p-3 sm:p-3.5 rounded-xl bg-white/90 border transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                quarterPulse
                  ? "border-amber-400/70 bg-amber-50/40 shadow-[0_8px_24px_-6px_rgba(245,158,11,0.22)]"
                  : "border-slate-200/80 hover:border-amber-400/50 shadow-xs"
              } ${
                isAnalyticsInView
                  ? "opacity-100 translate-y-0 scale-100"
                  : "opacity-0 translate-y-4 scale-[0.97]"
              }`}
            >
              <span className="text-[9.5px] font-mono uppercase text-slate-500 block">
                ETL Refresh Latency
              </span>
              <div className="text-xl sm:text-2xl font-black font-heading text-amber-700 mt-1">
                <AnimatedMetricValue
                  value={currentMetric.latency}
                  isActive={isAnalyticsInView}
                  triggerKey={counterTriggerKey}
                  durationMs={1050}
                  staggerDelayMs={150}
                />
              </div>
              <span className="text-[10.5px] text-amber-600 font-mono mt-0.5 block">
                Automated schedule
              </span>
            </div>

            {/* Metric 4: Data Consistency Index */}
            <div
              style={!prefersReducedMotion ? { transitionDelay: isAnalyticsInView ? "225ms" : "0ms" } : undefined}
              className={`p-3 sm:p-3.5 rounded-xl bg-white/90 border transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                quarterPulse
                  ? "border-amber-400/70 bg-amber-50/40 shadow-[0_8px_24px_-6px_rgba(245,158,11,0.22)]"
                  : "border-slate-200/80 hover:border-amber-400/50 shadow-xs"
              } ${
                isAnalyticsInView
                  ? "opacity-100 translate-y-0 scale-100"
                  : "opacity-0 translate-y-4 scale-[0.97]"
              }`}
            >
              <span className="text-[9.5px] font-mono uppercase text-slate-500 block">
                Data Consistency Index
              </span>
              <div className="text-xl sm:text-2xl font-black font-heading text-amber-600 mt-1">
                <AnimatedMetricValue
                  value={currentMetric.speed}
                  isActive={isAnalyticsInView}
                  triggerKey={counterTriggerKey}
                  durationMs={1100}
                  staggerDelayMs={225}
                />
              </div>
              <span className="text-[10.5px] text-slate-500 font-mono mt-0.5 block">
                Cleaned &amp; consolidated
              </span>
            </div>
          </div>

          {/* Bottom CTA for Data Consultations */}
          <div className="pt-5 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-xs text-slate-600 text-center sm:text-left">
              Need custom Excel cleaning or an enterprise Power BI model for your datasets?
            </span>
            <MagneticButton
              asAnchor
              href="#book-call"
              variant="outline"
              className="!py-2 !px-4 text-xs font-semibold"
              cursorLabel="DISCUSS"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Discuss Data Architecture</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
};

