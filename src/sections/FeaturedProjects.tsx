import React, { useState, useRef, useCallback, useEffect, Suspense, lazy } from "react";
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
  ArrowUpRight
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
    id: "tastybites",
    title: "TastyBites",
    category: "Restaurant / Food Ordering",
    description: "Restaurant website with digital menu, online food ordering and customer enquiries.",
    url: "https://tastybites.zynova.co.in",
    image: "/projects/tastybites.webp",
    badge: "Food Ordering",
    tech: ["React.js", "Node.js", "Tailwind CSS", "Express.js"]
  },
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
}

const FeaturedCard: React.FC<FeaturedCardProps> = ({
  project,
  index: _index,
  onOpenArchitecture
}) => {
  return (
    <div
      onClick={onOpenArchitecture}
      className="group relative h-full rounded-2xl p-3 sm:p-3.5 liquid-glass-card flex flex-col justify-between select-none border border-[#E5D9C8] hover:border-[#B58A45]/50 transition-all duration-200 ease-out hover:-translate-y-1.5 hover:scale-[1.01] hover:shadow-[0_12px_28px_rgba(181,138,69,0.16)] motion-reduce:hover:translate-y-0 motion-reduce:hover:scale-100 motion-reduce:transition-none cursor-pointer"
    >
      {/* Ambient subtle top glow */}
      <div className="absolute -top-px left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-[#B58A45]/50 to-transparent pointer-events-none" />

      <div>
        {/* Card Browser-style Top Bar */}
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#E5D9C8]">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-red-400 inline-block" />
            <span className="w-2 h-2 rounded-full bg-amber-400 inline-block" />
            <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
            <span className="text-[10px] text-[#756C60] font-semibold font-mono ml-1 truncate max-w-[110px] xl:max-w-[140px]">
              {project.url.replace(/^https?:\/\//, "")}
            </span>
          </div>

          <div className="flex items-center gap-1 text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#B58A45]/10 text-[#8C6527] border border-[#B58A45]/30">
            <Sparkles className="w-2.5 h-2.5 text-[#B58A45]" />
            <span>{project.badge}</span>
          </div>
        </div>

        {/* Project Preview Image / Video */}
        <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-[#11100E] border border-[#E5D9C8] group-hover:border-[#B58A45]/40 transition-colors">
          <PortfolioImage
            src={project.image}
            alt={`${project.title} Preview`}
            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />

          {/* Image Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-40 pointer-events-none" />

          {/* Live Status indicator badge */}
          <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded-md bg-[#292720]/80 backdrop-blur-md border border-white/20 flex items-center gap-1 text-[9px] text-white font-bold shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Live Production</span>
          </div>
        </div>

        {/* Card Content Details */}
        <div className="pt-2.5">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-bold tracking-wider uppercase text-[#B58A45] truncate">
              {project.category}
            </span>
            <div className="flex items-center gap-1 shrink-0">
              {project.tech.slice(0, 2).map((t) => (
                <span
                  key={t}
                  className="text-[9px] font-mono font-medium px-1.5 py-0.5 rounded bg-[#FAF7F0] text-[#574F44] border border-[#E5D9C8]"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <h3 className="font-heading text-sm xl:text-base font-bold text-[#292720] mb-1 tracking-tight group-hover:text-[#B58A45] transition-colors flex items-center justify-between">
            <span className="truncate">{project.title}</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#B58A45] opacity-80 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0 ml-1" />
          </h3>

          <p className="text-[11px] xl:text-xs text-[#574F44] font-normal leading-snug mb-2 line-clamp-2 min-h-[2.4em]">
            {project.description}
          </p>
        </div>
      </div>

      {/* Action Buttons: Visit Website & Details */}
      <div className="flex items-center gap-1.5 pt-2 border-t border-[#E5D9C8] mt-auto">
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 inline-flex items-center justify-center gap-1 py-2 px-2 rounded-lg text-[11px] font-bold tracking-wide bg-gradient-to-r from-[#B58A45] via-[#C99D57] to-[#B58A45] text-white hover:brightness-105 shadow-sm shadow-[#B58A45]/20 transition-all duration-200 active:scale-[0.98]"
          onClick={(e) => e.stopPropagation()}
        >
          <Globe className="w-3 h-3" />
          <span className="truncate">VISIT WEBSITE</span>
          <ExternalLink className="w-2.5 h-2.5 ml-0.5 opacity-80 shrink-0" />
        </a>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onOpenArchitecture();
          }}
          className="inline-flex items-center justify-center gap-1 py-2 px-2.5 rounded-lg text-[11px] font-semibold text-[#292720] hover:text-[#B58A45] bg-white hover:bg-[#FAF7F0] border border-[#E5D9C8] hover:border-[#B58A45]/50 transition-all duration-200 active:scale-[0.98] shadow-sm shrink-0"
          aria-label={`View architecture details for ${project.title}`}
        >
          <Layers className="w-3 h-3 text-[#B58A45]" />
          <span>DETAILS</span>
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
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

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

  const updateScrollState = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);

    // Update active project index based on leftmost visible card
    let closestIdx = 0;
    let minDistance = Infinity;
    cardRefs.current.forEach((card, idx) => {
      if (!card) return;
      const distance = Math.abs(card.offsetLeft - el.offsetLeft - scrollLeft);
      if (distance < minDistance) {
        minDistance = distance;
        closestIdx = idx;
      }
    });
    setActiveProjectIndex(closestIdx);
  }, []);

  useEffect(() => {
    updateScrollState();
    const handleResize = () => updateScrollState();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [updateScrollState]);

  const handleScroll = () => {
    updateScrollState();
  };

  const scrollCarousel = (direction: "left" | "right") => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const firstCard = cardRefs.current[0];
    const cardStep = firstCard ? firstCard.offsetWidth + 16 : 340;
    const targetScroll = direction === "left" ? el.scrollLeft - cardStep : el.scrollLeft + cardStep;
    el.scrollTo({ left: targetScroll, behavior: "smooth" });
  };

  const scrollToProject = (index: number) => {
    const el = scrollContainerRef.current;
    const card = cardRefs.current[index];
    if (!el || !card) return;
    const targetLeft = card.offsetLeft - el.offsetLeft;
    el.scrollTo({ left: targetLeft, behavior: "smooth" });
    setActiveProjectIndex(index);
  };

  return (
    <section
      id="featured-projects"
      className="py-8 sm:py-10 md:py-12 relative z-10 bg-transparent overflow-hidden"
      aria-label="Featured Projects Showcase"
    >
      {/* Background Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-r from-[#B58A45]/8 via-[#F0E4D2]/40 to-[#B58A45]/8 blur-[120px] rounded-full pointer-events-none -z-10" />

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
        <div className="flex items-center justify-center gap-1.5 sm:gap-2 mb-5 sm:mb-6 flex-wrap">
          {FEATURED_PROJECTS.map((proj, idx) => {
            const isActive = idx === activeProjectIndex;
            return (
              <button
                key={proj.id}
                onClick={() => scrollToProject(idx)}
                className={`group relative px-3 sm:px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 flex items-center gap-1.5 ${
                  isActive
                    ? "bg-[#B58A45] text-white border border-[#B58A45] shadow-[0_4px_15px_rgba(181,138,69,0.25)] font-bold"
                    : "liquid-glass-pill text-[#574F44] hover:text-[#292720]"
                }`}
                aria-label={`View ${proj.title} architecture`}
              >
                <span
                  className={`text-[10px] font-mono font-bold ${
                    isActive ? "text-amber-100" : "text-[#756C60] group-hover:text-[#292720]"
                  }`}
                >
                  0{idx + 1}
                </span>
                <span>{proj.title}</span>
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse ml-0.5" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Projects Showcase Container with Left & Right Arrows */}
      <div className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
        {/* Left Navigation Arrow */}
        <button
          type="button"
          onClick={() => scrollCarousel("left")}
          disabled={!canScrollLeft}
          aria-label="Previous projects"
          className="absolute left-1 sm:left-2 lg:left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center bg-white/95 hover:bg-[#FAF7F0] text-[#292720] hover:text-[#B58A45] border border-[#E5D9C8] hover:border-[#B58A45]/60 shadow-[0_4px_16px_rgba(41,39,32,0.12)] hover:shadow-[0_6px_20px_rgba(181,138,69,0.25)] transition-all duration-200 active:scale-95 disabled:opacity-20 disabled:pointer-events-none disabled:shadow-none"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Carousel Scroll Track - 4 cards side by side in desktop row */}
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex items-stretch gap-4 overflow-x-auto scrollbar-none scroll-smooth py-2 px-1"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {FEATURED_PROJECTS.map((project, idx) => (
            <div
              key={project.id}
              ref={(el) => {
                cardRefs.current[idx] = el;
              }}
              style={{ scrollSnapAlign: "start" }}
              className="w-[85vw] sm:w-[calc((100%-1rem)/2)] md:w-[calc((100%-2*1rem)/3)] lg:w-[calc((100%-3*1rem)/4)] shrink-0"
            >
              <FeaturedCard
                project={project}
                index={idx}
                onOpenArchitecture={() => handleOpenModal(project)}
              />
            </div>
          ))}
        </div>

        {/* Right Navigation Arrow */}
        <button
          type="button"
          onClick={() => scrollCarousel("right")}
          disabled={!canScrollRight}
          aria-label="Next projects"
          className="absolute right-1 sm:right-2 lg:right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center bg-white/95 hover:bg-[#FAF7F0] text-[#292720] hover:text-[#B58A45] border border-[#E5D9C8] hover:border-[#B58A45]/60 shadow-[0_4px_16px_rgba(41,39,32,0.12)] hover:shadow-[0_6px_20px_rgba(181,138,69,0.25)] transition-all duration-200 active:scale-95 disabled:opacity-20 disabled:pointer-events-none disabled:shadow-none"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
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
