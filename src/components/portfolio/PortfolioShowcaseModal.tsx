import React from "react";
import { Modal } from "../ui/Modal";
import { ExternalLink, Award, Sparkles, Cpu, CheckCircle2 } from "lucide-react";

interface PortfolioShowcaseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const keySkills = [
  "Machine Learning",
  "Generative AI",
  "AI / ML Engineering",
  "Python",
  "NLP",
  "Prompt Engineering",
  "AI Workflow Automation",
  "Data Analysis"
];

const certifications = [
  { title: "AI Upskilling Certification", provider: "Qualcomm" },
  { title: "Claude Code Certification", provider: "Anthropic" },
  { title: "Prompt Engineering", provider: "IBM" },
  { title: "Python for Data Analysis", provider: "IBM SkillsBuild" },
  { title: "n8n Automation — No-Code AI Builder", provider: "Simplilearn" },
  { title: "Python 101 for Data Science", provider: "IBM" }
];

const highlights = [
  "LLM conversational workflows, few-shot prompt architectures, and NLP optimization.",
  "Production AI workflow orchestration utilizing REST APIs and automation pipelines.",
  "Executive business intelligence dashboards, statistical data modeling, and KPI tracking."
];

export const PortfolioShowcaseModal: React.FC<PortfolioShowcaseModalProps> = ({
  isOpen,
  onClose
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Machine Learning Engineer Portfolio"
      maxWidth="max-w-3xl"
    >
      <div className="space-y-4 sm:space-y-5 text-slate-800">
        {/* Subtitle & Category Badges */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-slate-200 text-xs">
          <span className="text-slate-600 font-mono font-medium">
            Amit Halder &bull; Founder &amp; Technology Specialist
          </span>
          <div className="flex items-center gap-1.5">
            <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-400/50 font-mono text-[10.5px] font-semibold flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-600" />
              <span>Machine Learning / AI / GenAI</span>
            </span>
          </div>
        </div>

        {/* Visual Preview Screenshot (Preserving existing preview image, No iframe) */}
        <div className="relative rounded-xl overflow-hidden border border-slate-200/90 bg-slate-100 shadow-lg group">
          <img
            src="/projects/ml-portfolio-preview-v2.webp"
            alt="Amit Halder — Machine Learning & AI Portfolio Showcase"
            loading="lazy"
            className="w-full h-44 sm:h-56 md:h-64 object-cover object-top transition-transform duration-500 group-hover:scale-[1.01]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent pointer-events-none" />

          <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between">
            <span className="text-[10px] sm:text-xs font-mono font-semibold text-amber-800 bg-white/95 backdrop-blur-md px-2 py-0.5 rounded border border-amber-400/50 shadow-sm">
              Live Interactive Portfolio Preview
            </span>
            <a
              href="/projects/ml-portfolio-preview-v2.webp"
              target="_blank"
              rel="noopener noreferrer"
              className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/95 hover:bg-white text-slate-700 hover:text-slate-900 border border-slate-300 transition-colors inline-flex items-center gap-1 shadow-sm font-medium"
            >
              <span>Full Image</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Professional Description */}
        <div className="p-3.5 sm:p-4 rounded-xl bg-slate-50/90 border border-slate-200/90">
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            This is Amit Halder’s dedicated personal Machine Learning &amp; AI portfolio, showcasing specialized engineering capabilities across Large Language Model integrations, prompt engineering architectures, automated intelligence workflows, and deep business data analytics.
          </p>
        </div>

        {/* Key Skills */}
        <div>
          <div className="flex items-center gap-1.5 mb-2">
            <Cpu className="w-4 h-4 text-amber-600" />
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-800">
              KEY SKILLS
            </h4>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {keySkills.map((skill) => (
              <span
                key={skill}
                className="px-2.5 py-1 rounded-lg text-[11px] sm:text-xs font-mono bg-white text-slate-700 border border-slate-200 hover:border-amber-500/50 transition-colors shadow-2xs"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div>
          <div className="flex items-center gap-1.5 mb-2">
            <Award className="w-4 h-4 text-amber-600" />
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-800">
              CERTIFICATIONS
            </h4>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {certifications.map((cert) => (
              <div
                key={cert.title}
                className="p-2 sm:p-2.5 rounded-lg bg-slate-50/90 border border-slate-200 flex items-start gap-2 text-xs"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 mt-0.5 shrink-0" />
                <div className="min-w-0">
                  <div className="font-semibold text-slate-800 truncate text-[11.5px] sm:text-xs">
                    {cert.title}
                  </div>
                  <div className="text-[10px] font-mono text-amber-700 font-medium">
                    {cert.provider}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Portfolio Highlights */}
        <div>
          <div className="flex items-center gap-1.5 mb-2">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-800">
              PORTFOLIO HIGHLIGHTS
            </h4>
          </div>
          <ul className="space-y-1.5 text-xs text-slate-600">
            {highlights.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Primary CTA Button: VISIT PORTFOLIO */}
        <div className="pt-3 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-[11px] font-mono text-slate-500 text-center sm:text-left">
            Direct access to interactive projects &amp; case studies
          </span>
          <a
            href="https://k-zynova2.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-slate-950 font-heading font-bold text-xs sm:text-sm tracking-wider uppercase flex items-center justify-center gap-2 hover:brightness-105 active:scale-[0.98] transition-all shadow-[0_4px_20px_rgba(245,158,11,0.3)] cursor-pointer"
          >
            <span>VISIT PORTFOLIO</span>
            <ExternalLink className="w-4 h-4 text-slate-950" />
          </a>
        </div>
      </div>
    </Modal>
  );
};
