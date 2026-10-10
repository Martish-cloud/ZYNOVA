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
                  : "liquid-glass-pill text-slate-800 hover:text-slate-950 hover:border-amber-400/55"
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
                className="group relative p-3 sm:p-3.5 rounded-xl liquid-glass-card hover:border-amber-400/60 transition-all duration-300 hover:-translate-y-1.5 flex flex-col items-center justify-center text-center cursor-pointer overflow-hidden"
              >
                {/* Dynamic Brand Glow on Hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-15 transition-opacity duration-300 pointer-events-none rounded-xl"
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
                <span className="font-heading font-bold text-[11px] sm:text-xs text-slate-900 group-hover:text-amber-800 transition-colors tracking-wide truncate max-w-full">
                  {tech.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Infinite Smooth Scrolling Marquee Bar */}
      <div className="relative w-full overflow-hidden border-y border-white/45 py-3 sm:py-3.5 bg-white/35 backdrop-blur-xl saturate-150 shadow-sm">
        {/* Subtle Edge Fades */}
        <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-slate-950/35 to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-slate-950/35 to-transparent z-10 pointer-events-none" />

        <div className="animate-marquee flex gap-8 items-center whitespace-nowrap">
          {marqueeList.map((item, idx) => {
            const MarqueeIcon = iconMap[item.id];
            return (
              <div
                key={idx}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl liquid-glass-subcard text-slate-900 font-mono text-xs font-semibold tracking-wider hover:border-amber-400/60 hover:text-amber-800 transition-colors shadow-xs"
              >
                {MarqueeIcon && <MarqueeIcon className="w-3.5 h-3.5" size={14} />}
                <span>{item.name}</span>
                <span className="text-[10px] text-slate-700">&bull; {item.category}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
