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
    <Modal isOpen={isOpen} onClose={onClose} title={project.title} maxWidth="max-w-3xl" theme="dark">
      <div className="space-y-6 text-[#D4CEC4]">
        {/* Subtitle & Badge */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#D0A04B]/20 text-xs">
          <span className="text-[#D4CEC4] font-normal">{project.subtitle}</span>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-[#D0A04B]/10 text-[#D0A04B] border border-[#D0A04B]/30 font-mono font-bold">
              {project.badge}
            </span>
            <span className="px-2 py-0.5 rounded bg-[#171410] border border-[#D0A04B]/20 text-[#D4CEC4] font-semibold font-mono uppercase">
              {project.category}
            </span>
          </div>
        </div>

        {/* Visual Showcase with Real Project Mockup */}
        <div className="relative w-full h-64 sm:h-80 md:h-96 rounded-xl overflow-hidden bg-[#100D09] border border-[#D0A04B]/25 shadow-sm group">
          <PortfolioImage
            src={project.image}
            alt={project.title}
            isPriority={true}
            platform={project.platform}
            fallbackTitle={project.title}
            fallbackBadge={project.badge}
            videoSrc={project.videoSrc}
            width={1200}
            height={750}
            className={`w-full h-full ${
              project.platform ? "object-contain bg-[#100D09]" : "object-cover object-top"
            } transition-transform duration-700 group-hover:scale-[1.02]`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

          {/* Floating badge & External full preview button */}
          <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
            <div className="bg-[#171410]/90 backdrop-blur-md px-4 py-2.5 rounded-lg border border-[#D0A04B]/30 shadow-lg text-white">
              <span className="font-mono text-[10px] text-[#D0A04B] font-bold uppercase tracking-widest block mb-0.5">
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
              className="px-3 py-2 rounded-lg bg-[#171410]/90 hover:bg-[#201B14] text-xs font-mono font-bold text-[#D0A04B] border border-[#D0A04B]/30 backdrop-blur-md inline-flex items-center gap-1.5 transition-colors shadow-lg cursor-pointer"
            >
              <span>Full View</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Transparent Indicative Pricing & Tiers */}
        {project.pricing && (
          <div className="p-4 rounded-xl bg-[#171410] border border-[#D0A04B]/25 shadow-xs">
            <div className="flex flex-wrap items-baseline justify-between gap-2 mb-3">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#D0A04B] font-bold block">
                  {project.platform ? `${project.platform} Application Pricing` : "Project Pricing & Development Scope"}
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-xs text-[#D4CEC4] font-medium font-mono">Starting from:</span>
                  <span className="text-lg sm:text-xl font-extrabold font-mono text-[#D0A04B]">
                    {project.pricing.startingPrice}
                  </span>
                </div>
              </div>

              {project.demoUrl ? (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-[#D0A04B] via-[#E2B767] to-[#D0A04B] text-black font-mono font-bold text-xs flex items-center gap-1.5 hover:brightness-105 transition-all shadow-sm"
                >
                  <span>VISIT WEBSITE</span>
                  <ExternalLink className="w-3.5 h-3.5 text-black" />
                </a>
              ) : (
                <span className="px-3 py-1.5 rounded-lg bg-[#201B14] border border-[#D0A04B]/20 text-[10px] font-mono font-semibold text-[#D4CEC4]/60 select-none">
                  DEMO COMING SOON
                </span>
              )}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-mono">
              {project.pricing.basicPrice && (
                <div className="p-2 rounded-lg bg-[#201B14] border border-[#D0A04B]/20">
                  <span className="text-[10px] text-[#D4CEC4] block uppercase font-bold">Basic Tier</span>
                  <span className="font-bold text-white">{project.pricing.basicPrice}</span>
                </div>
              )}
              <div className="p-2 rounded-lg bg-[#201B14] border border-[#D0A04B]/20">
                <span className="text-[10px] text-[#D4CEC4] block uppercase font-bold">Standard Tier</span>
                <span className="font-bold text-white">{project.pricing.standardPrice}</span>
              </div>
              <div className="p-2 rounded-lg bg-[#D0A04B]/10 border border-[#D0A04B]/30">
                <span className="text-[10px] text-[#D0A04B] block uppercase font-bold">Premium Tier</span>
                <span className="font-bold text-[#D0A04B]">{project.pricing.premiumPrice}</span>
              </div>
              {project.pricing.customPrice && (
                <div className="col-span-2 sm:col-span-3 p-2 rounded-lg bg-[#201B14] border border-[#D0A04B]/20 flex items-center justify-between">
                  <span className="text-[10.5px] text-[#D4CEC4] uppercase font-bold">Custom Architecture &amp; Scale</span>
                  <span className="font-bold text-[#D0A04B]">{project.pricing.customPrice}</span>
                </div>
              )}
            </div>

            <p className="text-[10px] font-mono text-[#D4CEC4]/70 font-normal mt-2.5 leading-tight">
              *{project.pricing.pricingQualification || "Prices are indicative. Final pricing depends on features, integrations, content, design complexity and project requirements."}
            </p>
          </div>
        )}

        {/* Overview */}
        <div>
          <h4 className="text-xs font-mono uppercase tracking-wider text-[#9BD7FF] font-bold mb-1">
            Project Overview
          </h4>
          <p className="text-sm text-[#D4CEC4] font-normal leading-relaxed">
            {project.overview}
          </p>
        </div>

        {/* Challenge & Solution Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-red-950/30 border border-red-500/30">
            <h5 className="text-xs font-mono uppercase tracking-wider text-red-300 font-bold mb-1.5 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
              The Business Challenge
            </h5>
            <p className="text-xs text-[#D4CEC4] font-normal leading-relaxed">
              {project.challenge}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#201B14] border border-[#D0A04B]/30">
            <h5 className="text-xs font-mono uppercase tracking-wider text-[#D0A04B] font-bold mb-1.5 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D0A04B]" />
              Engineered Solution
            </h5>
            <p className="text-xs text-[#D4CEC4] font-normal leading-relaxed">
              {project.solution}
            </p>
          </div>
        </div>

        {/* Key Features */}
        <div>
          <h4 className="text-xs font-mono uppercase tracking-wider text-white font-bold mb-2.5 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#D0A04B]" />
            <span>Key Functional Highlights</span>
          </h4>
          <ul className="space-y-2">
            {project.keyFeatures.map((feat, idx) => (
              <li key={idx} className="flex items-start gap-2.5 p-2.5 rounded-lg bg-[#171410] border border-[#D0A04B]/20 text-xs text-[#D4CEC4] font-normal shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D0A04B] mt-1.5 shrink-0" />
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Technology Stack Tags */}
        <div>
          <h4 className="text-xs font-mono uppercase tracking-wider text-[#9BD7FF] font-bold mb-2 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-[#D0A04B]" />
            <span>Technologies Employed</span>
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {project.technologies.map((t) => (
              <span
                key={t}
                className="px-2.5 py-1 rounded text-xs font-mono font-semibold bg-[#201B14] border border-[#D0A04B]/20 text-[#D4CEC4]"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Footer Action */}
        <div className="pt-4 border-t border-[#D0A04B]/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-[#D4CEC4] font-normal">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
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
                <ExternalLink className="w-3.5 h-3.5 text-black" />
              </MagneticButton>
            ) : (
              <button
                type="button"
                disabled
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-[#201B14] border border-[#D0A04B]/20 text-[#D4CEC4]/60 text-xs font-mono cursor-not-allowed opacity-75 inline-flex items-center justify-center gap-2"
              >
                <span>DEMO COMING SOON</span>
              </button>
            )}

            <MagneticButton
              variant="outline"
              onClick={handleDiscuss}
              className="w-full sm:w-auto !py-2.5 !px-5 text-xs font-bold !rounded-xl border-[#D0A04B] text-[#D0A04B] hover:bg-[#D0A04B]/10"
              cursorLabel="DISCUSS"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#D0A04B]" />
              <span>Discuss Similar Project</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#D0A04B]" />
            </MagneticButton>
          </div>
        </div>
      </div>
    </Modal>
  );
};
