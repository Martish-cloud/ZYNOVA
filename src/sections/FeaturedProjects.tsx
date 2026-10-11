import React, { useState, useRef, useCallback, Suspense, lazy } from "react";
import { SectionHeading } from "../components/ui/SectionHeading";
import { PortfolioImage } from "../components/ui/PortfolioImage";
import { projectsData, type ProjectItem } from "../data/projects";
import {
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Layers,
  Globe,
  ArrowUpRight,
  Play,
  Pause
} from "lucide-react";

const ProjectModal = lazy(() =>
  import("./ProjectModal").then((m) => ({ default: m.ProjectModal }))
);

export interface FeaturedProject {
  id: string;
  title: string;
  category: string;
  description: string;
  url: string;
  image: string;
  badge: string;
  tech: string[];
}

const FEATURED_PROJECTS: FeaturedProject[] = [
  {
    id: "ml-ai-portfolio",
    title: "ML & AI Portfolio",
    category: "AI / Machine Learning",
    description: "Machine Learning, Generative AI, intelligent automation, and AI-powered solutions.",
    url: "https://amit-mlEngineer.zynova.co.in",
    image: "/projects/ml-portfolio-preview-v2.webp",
    badge: "Flagship AI",
    tech: ["PyTorch", "LLMs", "FastAPI", "Next.js"]
  },
  {
    id: "hamhold-jewellery",
    title: "HAMHOLD Jewellery",
    category: "Luxury E-Commerce",
    description: "A premium jewellery e-commerce experience featuring elegant product presentation and luxury-inspired design.",
    url: "https://hamhold.zynova.co.in",
    image: "/projects/hamhold-jewellery.webp",
    badge: "Luxury Brand",
    tech: ["React", "Tailwind CSS", "Cloudflare", "Framer"]
  },
  {
    id: "aaranya-silks",
    title: "Aaranya Silks",
    category: "Luxury Fashion / Saree E-commerce",
    description: "A premium Indian ethnic fashion and saree e-commerce website featuring elegant collections and a refined online shopping experience.",
    url: "https://aaranya-silks.zynova.co.in",
    image: "/projects/aaranya-silks.webp",
    badge: "Luxury Fashion",
    tech: ["React", "Tailwind CSS", "Cloudflare", "E-commerce"]
  },
  {
    id: "freshmart",
    title: "FreshMart",
    category: "Web Application",
    description: "A modern grocery shopping platform with an intuitive product discovery and shopping experience.",
    url: "https://fresh-mart-nu-cyan.vercel.app/",
    image: "/projects/FreshMart.webp",
    badge: "Live Platform",
    tech: ["TypeScript", "React", "Cloudflare", "Vite"]
  },
  {
    id: "bookverse",
    title: "BookVerse",
    category: "Digital Bookstore",
    description: "A modern online bookstore experience featuring curated books and a clean browsing interface.",
    url: "https://book-verse-gold-one.vercel.app/",
    image: "/projects/BookVerse.webp",
    badge: "Interactive Web",
    tech: ["React", "Modern UI/UX", "Tailwind", "Workers"]
  },
  {
    id: "mediwell",
    title: "MediWell",
    category: "Healthcare Platform",
    description: "A healthcare platform designed to make medical information and healthcare services easier to explore.",
    url: "https://medi-well-ten.vercel.app/",
    image: "/projects/MediWell.webp",
    badge: "HealthTech",
    tech: ["Next.js", "TypeScript", "Tailwind", "Vercel"]
  }
];

const getProjectModalItem = (featured: FeaturedProject): ProjectItem => {
  const found = projectsData.find((p) => p.id === featured.id);
  if (found) return found;

  return {
    id: featured.id,
    title: featured.title,
    subtitle: `${featured.category} • Production Release`,
    category: featured.category,
    filterCategory: "web",
    shortDesc: featured.description,
    overview: `${featured.title} is an engineered digital platform delivering high performance, responsive workflows, and modern cloud deployment standards.`,
    challenge: "Delivering modern user experiences with high performance, seamless transitions, and reliable production-grade infrastructure.",
    solution: "Designed and engineered an intuitive, component-driven architecture with optimized assets, clean code patterns, and sub-second load times.",
    technologies: featured.tech,
    keyFeatures: [
      "Responsive layout optimized across desktop, tablet, and mobile",
      "Modern full-stack technical architecture and automated builds",
      "Production-ready deployment with high availability and SSL",
      "Smooth micro-interactions and accessible component interfaces"
    ],
    gradientTheme: "from-amber-950/40 via-yellow-950/30 to-slate-900/50",
    badge: featured.badge,
    image: featured.image,
    pricing: {
      startingPrice: "$450",
      standardPrice: "$750",
      premiumPrice: "$1,500"
    },
    demoUrl: featured.url
  };
};

interface FeaturedCardProps {
  project: FeaturedProject;
  index: number;
  onOpenArchitecture: () => void;
  isDuplicate?: boolean;
}

const FeaturedCard: React.FC<FeaturedCardProps> = ({
  project,
  onOpenArchitecture,
  isDuplicate = false
}) => {
  return (
    <div
      className="w-[300px] sm:w-[360px] md:w-[395px] shrink-0 group relative rounded-2xl sm:rounded-3xl p-3.5 sm:p-4.5 liquid-glass-card flex flex-col justify-between select-none"
    >
      {/* Ambient subtle top glow */}
      <div className="absolute -top-px left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-amber-400/70 to-transparent pointer-events-none" />

      <div>
        {/* Card Browser-style Top Bar */}
        <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-white/20">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-400 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block" />
            <span className="text-[10px] text-slate-300 font-semibold font-mono ml-1.5 truncate max-w-[130px] sm:max-w-[160px]">
              {project.url.replace(/^https?:\/\//, "")}
            </span>
          </div>

          <div className="flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-400/[0.18] text-amber-300 border border-amber-400/40">
            <Sparkles className="w-2.5 h-2.5 text-amber-400" />
            <span>{project.badge}</span>
          </div>
        </div>

        {/* Project Preview Image */}
        <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-slate-950/60 border border-white/25 group-hover:border-amber-400/50 transition-colors">
          <PortfolioImage
            src={project.image}
            alt={`${project.title} Preview`}
            className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
          />

          {/* Image Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent opacity-60" />

          {/* Live Status indicator badge */}
          <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-md bg-slate-950/80 backdrop-blur-md border border-white/25 flex items-center gap-1.5 text-[10px] text-white font-bold shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Live Production</span>
          </div>
        </div>

        {/* Card Content Details */}
        <div className="pt-3.5 sm:pt-4">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] font-bold tracking-wider uppercase text-amber-300">
              {project.category}
            </span>
            <div className="flex items-center gap-1">
              {project.tech.slice(0, 2).map((t) => (
                <span
                  key={t}
                  className="text-[9px] font-mono font-medium px-1.5 py-0.5 rounded bg-white/[0.14] text-slate-200 border border-white/25"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <h3 className="font-heading text-base sm:text-lg font-bold text-[#9BD7FF] mb-1.5 tracking-tight group-hover:text-[#BAE6FD] transition-colors flex items-center justify-between">
            <span>{project.title}</span>
            <ArrowUpRight className="w-4 h-4 text-amber-400 opacity-80 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </h3>

          <p className="text-xs text-[#B7F0C1] font-normal leading-relaxed mb-4 line-clamp-2">
            {project.description}
          </p>
        </div>
      </div>

      {/* Action Buttons: Visit Website & View Architecture */}
      <div className="flex items-center gap-2 pt-2 border-t border-white/20">
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={isDuplicate ? -1 : 0}
          aria-hidden={isDuplicate ? "true" : undefined}
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-bold tracking-wide bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-slate-950 hover:from-amber-300 hover:to-yellow-400 shadow-md shadow-amber-500/20 transition-all duration-200 active:scale-[0.98]"
          onClick={(e) => e.stopPropagation()}
        >
          <Globe className="w-3.5 h-3.5" />
          <span>VISIT WEBSITE</span>
          <ExternalLink className="w-3 h-3 ml-0.5 opacity-80" />
        </a>

        <button
          type="button"
          onClick={onOpenArchitecture}
          tabIndex={isDuplicate ? -1 : 0}
          aria-hidden={isDuplicate ? "true" : undefined}
          className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-semibold text-slate-100 hover:text-amber-300 bg-white/[0.14] hover:bg-white/[0.22] border border-white/25 hover:border-amber-400/50 transition-all duration-200 active:scale-[0.98]"
          aria-label={`View architecture details for ${project.title}`}
        >
          <Layers className="w-3.5 h-3.5 text-amber-400" />
          <span className="hidden xs:inline">VIEW ARCHITECTURE</span>
          <span className="xs:hidden">DETAILS</span>
        </button>
      </div>
    </div>
  );
};

interface FeaturedProjectsProps {
  onDiscussProject?: (projectTitle: string) => void;
}

export const FeaturedProjects: React.FC<FeaturedProjectsProps> = ({ onDiscussProject }) => {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchPaused, setIsTouchPaused] = useState(false);
  const [isManuallyPaused, setIsManuallyPaused] = useState(false);
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const scrollTrackRef = useRef<HTMLDivElement>(null);

  const handleOpenModal = useCallback((project: FeaturedProject) => {
    setSelectedProject(getProjectModalItem(project));
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedProject(null);
  }, []);

  const handleDiscuss = useCallback(
    (brief: string) => {
      if (onDiscussProject) {
        onDiscussProject(brief);
      } else {
        const bookSection = document.getElementById("book-call");
        if (bookSection) {
          bookSection.scrollIntoView({ behavior: "smooth" });
        }
      }
    },
    [onDiscussProject]
  );

  // Manual nudge with Prev/Next buttons
  const handleNudge = (direction: "left" | "right") => {
    if (direction === "left") {
      setActiveProjectIndex((prev) => (prev - 1 + FEATURED_PROJECTS.length) % FEATURED_PROJECTS.length);
    } else {
      setActiveProjectIndex((prev) => (prev + 1) % FEATURED_PROJECTS.length);
    }
    // Temporarily pause animation on manual navigation to let user inspect
    setIsTouchPaused(true);
    setTimeout(() => setIsTouchPaused(false), 4000);
  };

  const isPaused = isHovered || isTouchPaused || isManuallyPaused;

  return (
    <section
      id="featured-projects"
      className="py-14 sm:py-20 md:py-24 relative z-10 bg-transparent border-t border-white/25 overflow-hidden"
      aria-label="Featured Projects Showcase"
    >
      {/* Background Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-r from-amber-500/8 via-yellow-500/10 to-amber-600/8 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <SectionHeading
          badge="SIGNATURE SHOWCASE"
          title="Featured"
          highlightedTitle="Projects & Products."
          subtitle="Explore a curated selection of digital products, intelligent solutions, and premium web experiences crafted by ZYNOVA."
          badgeVariant="gold"
          align="center"
        />

        {/* Project Selector Pills */}
        <div className="flex items-center justify-center gap-1.5 sm:gap-2.5 mb-8 sm:mb-10 flex-wrap">
          {FEATURED_PROJECTS.map((proj, idx) => {
            const isActive = idx === activeProjectIndex;
            return (
              <button
                key={proj.id}
                onClick={() => {
                  setActiveProjectIndex(idx);
                  handleOpenModal(proj);
                }}
                className={`group relative px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center gap-1.5 ${
                  isActive
                    ? "bg-amber-400/25 text-amber-300 border border-amber-400/60 shadow-[0_4px_15px_rgba(245,158,11,0.25)] font-bold backdrop-blur-md"
                    : "liquid-glass-pill text-slate-200 hover:text-white"
                }`}
                aria-label={`View ${proj.title} architecture`}
              >
                <span
                  className={`text-[10px] sm:text-xs font-mono font-bold ${
                    isActive ? "text-amber-400" : "text-slate-400 group-hover:text-slate-200"
                  }`}
                >
                  0{idx + 1}
                </span>
                <span>{proj.title}</span>
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse ml-0.5" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Full-width Automatic Left-to-Right Moving Showcase Container */}
      <div
        ref={containerRef}
        className="relative w-full overflow-hidden py-4 select-none"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={() => setIsTouchPaused(true)}
        onTouchEnd={() => {
          setTimeout(() => setIsTouchPaused(false), 3000);
        }}
      >
        {/* Soft Left and Right Edge Gradient Vignettes compatible with dark ambient video */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-6 sm:w-14 md:w-20 bg-gradient-to-r from-slate-950/35 to-transparent z-20" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-6 sm:w-14 md:w-20 bg-gradient-to-l from-slate-950/35 to-transparent z-20" />

        {/* Moving Dual-Track Flex Row */}
        <div
          ref={scrollTrackRef}
          className={`flex items-stretch w-max animate-showcase-ltr ${
            isPaused ? "is-paused" : ""
          }`}
          style={{ animationDuration: "50s" }}
        >
          {/* Track Set A (Primary Focusable Interactive Cards) */}
          <div className="flex items-stretch gap-4 sm:gap-6 pr-4 sm:pr-6 shrink-0">
            {FEATURED_PROJECTS.map((project, idx) => (
              <FeaturedCard
                key={`set-a-${project.id}`}
                project={project}
                index={idx}
                onOpenArchitecture={() => handleOpenModal(project)}
                isDuplicate={false}
              />
            ))}
          </div>

          {/* Track Set B (Seamless Infinite Loop Duplicate - hidden from screen-readers) */}
          <div
            aria-hidden="true"
            className="flex items-stretch gap-4 sm:gap-6 pr-4 sm:pr-6 shrink-0"
          >
            {FEATURED_PROJECTS.map((project, idx) => (
              <FeaturedCard
                key={`set-b-${project.id}`}
                project={project}
                index={idx}
                onOpenArchitecture={() => handleOpenModal(project)}
                isDuplicate={true}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Showcase Control Bar & Instructions */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 sm:mt-8">
        <div className="flex flex-wrap items-center justify-between gap-4 p-3.5 sm:p-4 rounded-xl liquid-glass-card">
          {/* Navigation Controls: Left, Pause/Play, Right */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleNudge("left")}
              className="p-2 sm:p-2.5 rounded-lg liquid-glass-subcard text-slate-200 hover:text-amber-300 transition-all hover:scale-105 active:scale-95"
              aria-label="Previous Project"
              title="Previous Project"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsManuallyPaused((prev) => !prev)}
              className="px-3 py-2 sm:py-2.5 rounded-lg liquid-glass-subcard text-slate-200 hover:text-amber-300 transition-all flex items-center gap-1.5 text-xs font-mono font-bold"
              aria-label={isManuallyPaused ? "Resume auto motion" : "Pause auto motion"}
              title={isManuallyPaused ? "Resume auto motion" : "Pause auto motion"}
            >
              {isManuallyPaused ? (
                <>
                  <Play className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400" />
                  <span>PLAY</span>
                </>
              ) : (
                <>
                  <Pause className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <span>PAUSE</span>
                </>
              )}
            </button>

            <button
              onClick={() => handleNudge("right")}
              className="p-2 sm:p-2.5 rounded-lg liquid-glass-subcard text-slate-200 hover:text-amber-300 transition-all hover:scale-105 active:scale-95"
              aria-label="Next Project"
              title="Next Project"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Helper Badge */}
          <p className="text-[11px] sm:text-xs text-slate-300 font-normal flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            <span>Hover or tap any card to pause • Continuous left-to-right showcase</span>
          </p>

          {/* Direct CTA */}
          <button
            onClick={() => handleOpenModal(FEATURED_PROJECTS[activeProjectIndex])}
            className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 transition-colors"
          >
            <span>View Architecture details</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Project Architecture & Details Modal */}
      {selectedProject && (
        <Suspense fallback={null}>
          <ProjectModal
            project={selectedProject}
            isOpen={!!selectedProject}
            onClose={handleCloseModal}
            onDiscussProject={handleDiscuss}
          />
        </Suspense>
      )}
    </section>
  );
};
