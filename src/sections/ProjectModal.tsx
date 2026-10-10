import React from "react";
import type { ProjectItem } from "../data/projects";
import { Modal } from "../components/ui/Modal";
import { MagneticButton } from "../components/ui/MagneticButton";
import { PortfolioImage } from "../components/ui/PortfolioImage";
import { CheckCircle2, Sparkles, ArrowRight, ShieldCheck, Layers, ExternalLink } from "lucide-react";

interface ProjectModalProps {
  project: ProjectItem | null;
  isOpen: boolean;
  onClose: () => void;
  onDiscussProject: (projectTitle: string) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  isOpen,
  onClose,
  onDiscussProject
}) => {
  if (!project) return null;

  const handleDiscuss = () => {
    onDiscussProject(`Inquiry regarding project architecture similar to: ${project.title}`);
    onClose();
    const bookSection = document.getElementById("book-call");
    if (bookSection) {
      bookSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={project.title} maxWidth="max-w-3xl">
      <div className="space-y-6">
        {/* Subtitle & Badge */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-200 text-xs">
          <span className="text-slate-600 font-medium">{project.subtitle}</span>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-400/50 font-mono font-semibold">
              {project.badge}
            </span>
            <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200 font-mono uppercase">
              {project.category}
            </span>
          </div>
        </div>

        {/* Visual Showcase with Real Project Mockup */}
        <div className="relative w-full h-64 sm:h-80 md:h-96 rounded-xl overflow-hidden bg-slate-100 border border-slate-200/90 shadow-lg group">
          <PortfolioImage
            src={project.image}
            alt={project.title}
            isPriority={true}
            platform={project.platform}
            fallbackTitle={project.title}
            fallbackBadge={project.badge}
            width={1200}
            height={750}
            className={`w-full h-full ${
              project.platform ? "object-contain bg-slate-900" : "object-cover object-top"
            } transition-transform duration-700 group-hover:scale-[1.02]`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent pointer-events-none" />

          {/* Floating badge & External full preview button */}
          <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
            <div className="bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-lg border border-amber-500/30 shadow-lg">
              <span className="font-mono text-[10px] text-amber-700 font-semibold uppercase tracking-widest block mb-0.5">
                {project.platform ? `${project.platform} Application • ${project.title}` : `${project.category} • ${project.badge}`}
              </span>
              <h3 className="text-lg sm:text-xl font-black font-heading text-slate-900">
                {project.title}
              </h3>
            </div>

            <a
              href={project.image}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 rounded-lg bg-white/95 hover:bg-amber-50 text-xs font-mono font-semibold text-amber-800 border border-amber-500/40 backdrop-blur-md inline-flex items-center gap-1.5 transition-colors shadow-lg cursor-pointer"
            >
              <span>Full View</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Transparent Indicative Pricing & Tiers */}
        {project.pricing && (
          <div className="p-4 rounded-xl bg-gradient-to-r from-amber-50/80 via-white to-amber-50/50 border border-amber-400/40 shadow-xs">
            <div className="flex flex-wrap items-baseline justify-between gap-2 mb-3">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-amber-700 font-semibold block">
                  {project.platform ? `${project.platform} Application Pricing` : "Project Pricing & Development Scope"}
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-xs text-slate-600 font-mono">Starting from:</span>
                  <span className="text-lg sm:text-xl font-extrabold font-mono text-transparent bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-700 bg-clip-text">
                    {project.pricing.startingPrice}
                  </span>
                </div>
              </div>

              {project.demoUrl ? (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-slate-950 font-mono font-bold text-xs flex items-center gap-1.5 hover:brightness-105 transition-all shadow-[0_4px_15px_rgba(245,158,11,0.3)]"
                >
                  <span>VISIT WEBSITE</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              ) : (
                <span className="px-3 py-1.5 rounded-lg bg-slate-100 border border-slate-200 text-[10px] font-mono text-slate-500 select-none">
                  DEMO COMING SOON
                </span>
              )}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-mono">
              {project.pricing.basicPrice && (
                <div className="p-2 rounded-lg bg-white border border-slate-200/90">
                  <span className="text-[10px] text-slate-500 block uppercase font-semibold">Basic Tier</span>
                  <span className="font-bold text-slate-900">{project.pricing.basicPrice}</span>
                </div>
              )}
              <div className="p-2 rounded-lg bg-white border border-slate-200/90">
                <span className="text-[10px] text-slate-500 block uppercase font-semibold">Standard Tier</span>
                <span className="font-bold text-slate-900">{project.pricing.standardPrice}</span>
              </div>
              <div className="p-2 rounded-lg bg-white border border-amber-300/60">
                <span className="text-[10px] text-amber-700 block uppercase font-semibold">Premium Tier</span>
                <span className="font-bold text-amber-700">{project.pricing.premiumPrice}</span>
              </div>
              {project.pricing.customPrice && (
                <div className="col-span-2 sm:col-span-3 p-2 rounded-lg bg-white border border-slate-200/90 flex items-center justify-between">
                  <span className="text-[10.5px] text-slate-600 uppercase font-medium">Custom Architecture &amp; Scale</span>
                  <span className="font-bold text-amber-700">{project.pricing.customPrice}</span>
                </div>
              )}
            </div>

            <p className="text-[10px] font-mono text-slate-500 mt-2.5 leading-tight">
              *{project.pricing.pricingQualification || "Prices are indicative. Final pricing depends on features, integrations, content, design complexity and project requirements."}
            </p>
          </div>
        )}

        {/* Overview */}
        <div>
          <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 font-semibold mb-1">
            Project Overview
          </h4>
          <p className="text-sm text-slate-700 leading-relaxed">
            {project.overview}
          </p>
        </div>

        {/* Challenge & Solution Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-50/90 border border-slate-200">
            <h5 className="text-xs font-mono uppercase tracking-wider text-rose-600 font-semibold mb-1.5 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
              The Business Challenge
            </h5>
            <p className="text-xs text-slate-600 leading-relaxed">
              {project.challenge}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-200/80">
            <h5 className="text-xs font-mono uppercase tracking-wider text-amber-700 font-semibold mb-1.5 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shadow-[0_0_6px_#f59e0b]" />
              Engineered Solution
            </h5>
            <p className="text-xs text-slate-600 leading-relaxed">
              {project.solution}
            </p>
          </div>
        </div>

        {/* Key Features */}
        <div>
          <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 font-semibold mb-2.5 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-amber-600" />
            <span>Key Functional Highlights</span>
          </h4>
          <ul className="space-y-2">
            {project.keyFeatures.map((feat, idx) => (
              <li key={idx} className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50/80 border border-slate-200/80 text-xs text-slate-700">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Technology Stack Tags */}
        <div>
          <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 font-semibold mb-2 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-amber-600" />
            <span>Technologies Employed</span>
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {project.technologies.map((t) => (
              <span
                key={t}
                className="px-2.5 py-1 rounded text-xs font-mono bg-slate-100 text-slate-700 border border-slate-200/90"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Footer Action */}
        <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Fully customizable codebase with complete IP transfer</span>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full sm:w-auto">
            {project.demoUrl ? (
              <MagneticButton
                asAnchor
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="gold"
                className="w-full sm:w-auto !py-2.5 !px-5 text-xs font-bold font-mono !rounded-xl"
                cursorLabel="VISIT"
              >
                <span>VISIT WEBSITE</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-950" />
              </MagneticButton>
            ) : (
              <button
                type="button"
                disabled
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-500 text-xs font-mono cursor-not-allowed opacity-75 inline-flex items-center justify-center gap-2"
              >
                <span>DEMO COMING SOON</span>
              </button>
            )}

            <MagneticButton
              variant="outline"
              onClick={handleDiscuss}
              className="w-full sm:w-auto !py-2.5 !px-5 text-xs font-bold !rounded-xl border-amber-500/40 text-amber-800 hover:bg-amber-50"
              cursorLabel="DISCUSS"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Discuss Similar Project</span>
              <ArrowRight className="w-3.5 h-3.5 text-amber-600" />
            </MagneticButton>
          </div>
        </div>
      </div>
    </Modal>
  );
};
