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
    <section id="tech-stack" className="py-14 sm:py-18 md:py-20 relative z-10 bg-transparent border-t border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="OUR TECHNOLOGY STACK"
          title="Engineered With High-Performance"
          highlightedTitle="Modern Tools."
          subtitle="We build resilient digital architectures utilizing leading-edge frameworks, typed systems, AI pipelines, and battle-tested databases."
        />

        {/* Priority 6: Category Tabs with White Background and Dark Charcoal Text */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mb-8 sm:mb-10">
          {categories.map((cat) => {
            const isSelected = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                onMouseEnter={() => setCursor("button")}
                onMouseLeave={resetCursor}
                className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-[13px] font-semibold tracking-wide transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B58A45] ${
                  isSelected
                    ? "bg-white text-[#22201C] font-bold border-2 border-[#B58A45] shadow-[0_4px_16px_rgba(181,138,69,0.22)] ring-1 ring-[#B58A45]/30"
                    : "bg-white/95 hover:bg-white text-[#454037] hover:text-[#22201C] border border-[#E5D9C8] hover:border-[#B58A45]/60 shadow-xs"
                }`}
                aria-pressed={isSelected}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Priority 5: Technology Tag Grid with White/Warm-White Backgrounds and Dark Charcoal Text (#22201C) */}
        <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-3 sm:gap-3.5 mb-12 sm:mb-14">
          {filteredTech.map((tech) => {
            const IconComponent = iconMap[tech.id];
            return (
              <div
                key={tech.id}
                onMouseEnter={() => setCursor("project", tech.name)}
                onMouseLeave={resetCursor}
                className="group relative p-3 sm:p-3.5 rounded-xl bg-white border border-[#E5D9C8] hover:border-[#B58A45]/70 hover:shadow-[0_8px_24px_rgba(181,138,69,0.15)] transition-all duration-200 hover:-translate-y-1 flex flex-col items-center justify-center text-center cursor-pointer overflow-hidden shadow-xs"
              >
                {/* Subtle Brand Glow on Hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-200 pointer-events-none rounded-xl"
                  style={{ backgroundColor: tech.brandColor }}
                />

                {/* Icon Container with Warm Clean Surface */}
                <div
                  className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#FAF7F0] border border-[#E5D9C8] group-hover:border-[#B58A45]/50 flex items-center justify-center transition-transform duration-200 group-hover:scale-105 shadow-xs mb-2"
                  style={{ color: tech.brandColor }}
                >
                  {IconComponent ? (
                    <IconComponent className="w-5 h-5 sm:w-6 sm:h-6" size={24} />
                  ) : null}
                </div>

                {/* Priority 5: High-Contrast Dark Charcoal Tag Text (#22201C) */}
                <span className="font-heading font-bold text-xs sm:text-[13px] text-[#22201C] group-hover:text-[#B58A45] transition-colors tracking-tight truncate max-w-full">
                  {tech.name}
                </span>

                {/* Category Subtext for Additional Clarity */}
                <span className="text-[10px] font-mono text-[#756C60] mt-0.5 truncate max-w-full">
                  {tech.category}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Infinite Smooth Scrolling Marquee Bar with High-Contrast Charcoal Text on Warm White */}
      <div className="relative w-full overflow-hidden border-y border-[#E5D9C8] py-3.5 bg-white/90 backdrop-blur-md shadow-xs">
        {/* Subtle Edge Fades */}
        <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <div className="animate-marquee flex gap-6 items-center whitespace-nowrap">
          {marqueeList.map((item, idx) => {
            const MarqueeIcon = iconMap[item.id];
            return (
              <div
                key={idx}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#FAF7F0] border border-[#E5D9C8] text-[#22201C] font-mono text-xs font-semibold tracking-wide hover:border-[#B58A45] hover:text-[#B58A45] transition-colors shadow-xs"
              >
                {MarqueeIcon && <MarqueeIcon className="w-3.5 h-3.5" size={14} />}
                <span className="font-bold">{item.name}</span>
                <span className="text-[10px] text-[#756C60]">&bull; {item.category}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
