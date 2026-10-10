import React, { useState } from "react";
import { technologiesData } from "../data/technologies";
import { SectionHeading } from "../components/ui/SectionHeading";
import { useCursor } from "../context/useCursor";
import {
  OpenAI_Icon,
  Claude_Icon,
  Gemini_Icon,
  N8N_Icon,
  Python_Icon,
  PowerBI_Icon,
  Excel_Icon,
  React_Icon,
  Nextjs_Icon,
  TypeScript_Icon,
  JavaScript_Icon,
  HTML5_Icon,
  CSS3_Icon,
  Nodejs_Icon,
  Express_Icon,
  NestJS_Icon,
  PHP_Icon,
  Laravel_Icon,
  WordPress_Icon,
  Git_Icon
} from "../components/icons/TechIcons";

const iconMap: Record<string, React.FC<{ className?: string; size?: number }>> = {
  openai: OpenAI_Icon,
  claude: Claude_Icon,
  gemini: Gemini_Icon,
  n8n: N8N_Icon,
  python: Python_Icon,
  powerbi: PowerBI_Icon,
  excel: Excel_Icon,
  react: React_Icon,
  nextjs: Nextjs_Icon,
  reactnative: React_Icon,
  typescript: TypeScript_Icon,
  javascript: JavaScript_Icon,
  html: HTML5_Icon,
  css: CSS3_Icon,
  nodejs: Nodejs_Icon,
  express: Express_Icon,
  nestjs: NestJS_Icon,
  php: PHP_Icon,
  laravel: Laravel_Icon,
  wordpress: WordPress_Icon,
  git: Git_Icon
};

export const TechStack: React.FC = () => {
  const { setCursor, resetCursor } = useCursor();
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = ["All", "AI & Automation", "Frontend", "Backend", "Ecosystem & CMS"];

  const filteredTech = activeCategory === "All"
    ? technologiesData
    : technologiesData.filter((t) => t.category === activeCategory);

  // For infinite marquee: repeat array
  const marqueeList = [...technologiesData, ...technologiesData];

  return (
    <section id="tech-stack" className="py-14 sm:py-18 md:py-20 relative z-10 bg-transparent border-t border-slate-200/70 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="OUR TECHNOLOGY STACK"
          title="Engineered With High-Performance"
          highlightedTitle="Modern Tools."
          subtitle="We build resilient digital architectures utilizing leading-edge frameworks, typed systems, AI pipelines, and battle-tested databases."
        />

        {/* Category Pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-7 sm:mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              onMouseEnter={() => setCursor("button")}
              onMouseLeave={resetCursor}
              className={`px-3.5 sm:px-4 py-1.5 rounded-full text-[11px] sm:text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                activeCategory === cat
                  ? "bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 text-slate-950 font-bold shadow-[0_6px_18px_rgba(245,158,11,0.3)]"
                  : "bg-white/80 text-slate-600 border border-slate-200/90 hover:text-slate-900 hover:bg-white hover:border-amber-400/50 backdrop-blur-md shadow-sm"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Filtered Icon Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-2.5 sm:gap-3 mb-12 sm:mb-14">
          {filteredTech.map((tech) => {
            const IconComponent = iconMap[tech.id];
            return (
              <div
                key={tech.id}
                onMouseEnter={() => setCursor("project", tech.name)}
                onMouseLeave={resetCursor}
                className="group relative p-3 sm:p-3.5 rounded-xl bg-white/80 border border-slate-200/80 hover:border-amber-400/60 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col items-center justify-center text-center cursor-pointer overflow-hidden shadow-[0_8px_24px_rgba(15,23,42,0.05),inset_0_1px_0_rgba(255,255,255,0.9)] hover:shadow-[0_14px_30px_rgba(245,158,11,0.14)]"
              >
                {/* Dynamic Brand Glow on Hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none rounded-xl"
                  style={{ backgroundColor: tech.brandColor }}
                />
                
                {/* Icon Container */}
                <div
                  className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-slate-900/95 border border-slate-800 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:border-amber-400/50 shadow-sm mb-2"
                  style={{ color: tech.brandColor }}
                >
                  {IconComponent ? (
                    <IconComponent className="w-5 h-5 sm:w-6 sm:h-6" size={24} />
                  ) : null}
                </div>

                {/* Clean Label */}
                <span className="font-heading font-semibold text-[11px] sm:text-xs text-slate-700 group-hover:text-amber-700 transition-colors tracking-wide truncate max-w-full">
                  {tech.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Infinite Smooth Scrolling Marquee Bar */}
      <div className="relative w-full overflow-hidden border-y border-slate-200/80 py-3 sm:py-3.5 bg-white/75 backdrop-blur-xl shadow-sm">
        {/* Subtle Edge Fades */}
        <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-[#f8fafc] to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-[#f8fafc] to-transparent z-10 pointer-events-none" />

        <div className="animate-marquee flex gap-8 items-center whitespace-nowrap">
          {marqueeList.map((item, idx) => {
            const MarqueeIcon = iconMap[item.id];
            return (
              <div
                key={idx}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/90 border border-slate-200/90 text-slate-700 font-mono text-xs font-semibold tracking-wider hover:border-amber-400/60 hover:text-amber-700 transition-colors shadow-xs"
              >
                {MarqueeIcon && <MarqueeIcon className="w-3.5 h-3.5" size={14} />}
                <span>{item.name}</span>
                <span className="text-[10px] text-slate-500">&bull; {item.category}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
