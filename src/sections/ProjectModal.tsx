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
    <Modal isOpen={isOpen} onClose={onClose} title={project.title} maxWidth="max-w-3xl" theme="light">
      <div className="space-y-6">
        {/* Subtitle & Badge */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#E5D9C8] text-xs">
          <span className="text-[#574F44] font-normal">{project.subtitle}</span>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-[#B58A45]/10 text-[#8C6527] border border-[#B58A45]/30 font-mono font-bold">
              {project.badge}
            </span>
            <span className="px-2 py-0.5 rounded bg-[#FAF7F0] border border-[#E5D9C8] text-[#756C60] font-semibold font-mono uppercase">
              {project.category}
            </span>
          </div>
        </div>

        {/* Visual Showcase with Real Project Mockup */}
        <div className="relative w-full h-64 sm:h-80 md:h-96 rounded-xl overflow-hidden bg-[#F0E4D2]/40 border border-[#E5D9C8] shadow-sm group">
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
              project.platform ? "object-contain bg-[#FAF7F0]" : "object-cover object-top"
            } transition-transform duration-700 group-hover:scale-[1.02]`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

          {/* Floating badge & External full preview button */}
          <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
            <div className="bg-[#292720]/80 backdrop-blur-md px-4 py-2.5 rounded-lg border border-white/20 shadow-lg text-white">
              <span className="font-mono text-[10px] text-amber-300 font-bold uppercase tracking-widest block mb-0.5">
                {project.platform ? `${project.platform} Application • ${project.title}` : `${project.category} • ${project.badge}`}
              </span>
              <h3 className="text-lg sm:text-xl font-black font-heading text-white">
                {project.title}
              </h3>
            </div>

            <a
              href={project.image}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 rounded-lg bg-[#292720]/80 hover:bg-[#292720] text-xs font-mono font-bold text-amber-300 border border-white/20 backdrop-blur-md inline-flex items-center gap-1.5 transition-colors shadow-lg cursor-pointer"
            >
              <span>Full View</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Transparent Indicative Pricing & Tiers */}
        {project.pricing && (
          <div className="p-4 rounded-xl liquid-glass-subcard !bg-[#FAF7F0] border !border-[#E5D9C8] shadow-xs">
            <div className="flex flex-wrap items-baseline justify-between gap-2 mb-3">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#B58A45] font-bold block">
                  {project.platform ? `${project.platform} Application Pricing` : "Project Pricing & Development Scope"}
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-xs text-[#756C60] font-medium font-mono">Starting from:</span>
                  <span className="text-lg sm:text-xl font-extrabold font-mono text-[#B58A45]">
                    {project.pricing.startingPrice}
                  </span>
                </div>
              </div>

              {project.demoUrl ? (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-[#B58A45] via-[#C99D57] to-[#B58A45] text-white font-mono font-bold text-xs flex items-center gap-1.5 hover:brightness-105 transition-all shadow-sm"
                >
                  <span>VISIT WEBSITE</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              ) : (
                <span className="px-3 py-1.5 rounded-lg bg-white border border-[#E5D9C8] text-[10px] font-mono font-semibold text-[#756C60] select-none">
                  DEMO COMING SOON
                </span>
              )}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-mono">
              {project.pricing.basicPrice && (
                <div className="p-2 rounded-lg bg-white border border-[#E5D9C8]">
                  <span className="text-[10px] text-[#756C60] block uppercase font-bold">Basic Tier</span>
                  <span className="font-bold text-[#292720]">{project.pricing.basicPrice}</span>
                </div>
              )}
              <div className="p-2 rounded-lg bg-white border border-[#E5D9C8]">
                <span className="text-[10px] text-[#756C60] block uppercase font-bold">Standard Tier</span>
                <span className="font-bold text-[#292720]">{project.pricing.standardPrice}</span>
              </div>
              <div className="p-2 rounded-lg bg-[#B58A45]/10 border border-[#B58A45]/30">
                <span className="text-[10px] text-[#8C6527] block uppercase font-bold">Premium Tier</span>
                <span className="font-bold text-[#B58A45]">{project.pricing.premiumPrice}</span>
              </div>
              {project.pricing.customPrice && (
                <div className="col-span-2 sm:col-span-3 p-2 rounded-lg bg-white border border-[#E5D9C8] flex items-center justify-between">
                  <span className="text-[10.5px] text-[#756C60] uppercase font-bold">Custom Architecture &amp; Scale</span>
                  <span className="font-bold text-[#B58A45]">{project.pricing.customPrice}</span>
                </div>
              )}
            </div>

            <p className="text-[10px] font-mono text-[#756C60] font-normal mt-2.5 leading-tight">
              *{project.pricing.pricingQualification || "Prices are indicative. Final pricing depends on features, integrations, content, design complexity and project requirements."}
            </p>
          </div>
        )}

        {/* Overview */}
        <div>
          <h4 className="text-xs font-mono uppercase tracking-wider text-[#B58A45] font-bold mb-1">
            Project Overview
          </h4>
          <p className="text-sm text-[#574F44] font-normal leading-relaxed">
            {project.overview}
          </p>
        </div>

        {/* Challenge & Solution Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-rose-50/70 border border-rose-200">
            <h5 className="text-xs font-mono uppercase tracking-wider text-rose-800 font-bold mb-1.5 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-600" />
              The Business Challenge
            </h5>
            <p className="text-xs text-[#574F44] font-normal leading-relaxed">
              {project.challenge}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200">
            <h5 className="text-xs font-mono uppercase tracking-wider text-amber-800 font-bold mb-1.5 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B58A45]" />
              Engineered Solution
            </h5>
            <p className="text-xs text-[#574F44] font-normal leading-relaxed">
              {project.solution}
            </p>
          </div>
        </div>

        {/* Key Features */}
        <div>
          <h4 className="text-xs font-mono uppercase tracking-wider text-[#292720] font-bold mb-2.5 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#B58A45]" />
            <span>Key Functional Highlights</span>
          </h4>
          <ul className="space-y-2">
            {project.keyFeatures.map((feat, idx) => (
              <li key={idx} className="flex items-start gap-2.5 p-2.5 rounded-lg bg-white border border-[#E5D9C8] text-xs text-[#574F44] font-normal shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B58A45] mt-1.5 shrink-0" />
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Technology Stack Tags */}
        <div>
          <h4 className="text-xs font-mono uppercase tracking-wider text-[#756C60] font-bold mb-2 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-[#B58A45]" />
            <span>Technologies Employed</span>
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {project.technologies.map((t) => (
              <span
                key={t}
                className="px-2.5 py-1 rounded text-xs font-mono font-semibold bg-white border border-[#E5D9C8] text-[#574F44]"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Footer Action */}
        <div className="pt-4 border-t border-[#E5D9C8] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-[#574F44] font-normal">
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
                <ExternalLink className="w-3.5 h-3.5 text-white" />
              </MagneticButton>
            ) : (
              <button
                type="button"
                disabled
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-white border border-[#E5D9C8] text-[#756C60] text-xs font-mono cursor-not-allowed opacity-75 inline-flex items-center justify-center gap-2"
              >
                <span>DEMO COMING SOON</span>
              </button>
            )}

            <MagneticButton
              variant="outline"
              onClick={handleDiscuss}
              className="w-full sm:w-auto !py-2.5 !px-5 text-xs font-bold !rounded-xl border-[#B58A45] text-[#8C6527] hover:bg-[#B58A45]/10"
              cursorLabel="DISCUSS"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#B58A45]" />
              <span>Discuss Similar Project</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#B58A45]" />
            </MagneticButton>
          </div>
        </div>
      </div>
    </Modal>
  );
};
