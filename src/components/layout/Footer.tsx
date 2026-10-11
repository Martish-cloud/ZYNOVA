import React from "react";
import { siteConfig } from "../../config/siteConfig";
import { useCursor } from "../../context/useCursor";
import { ArrowUp, Sparkles, MapPin, Clock, Mail, Phone } from "lucide-react";
import { WhatsAppIcon } from "../ui/WhatsAppIcon";

export const Footer: React.FC = () => {
  const { setCursor, resetCursor } = useCursor();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navLinks = [
    { name: "Home", href: "#hero" },
    { name: "Services", href: "#services" },
    { name: "Data & BI", href: "#data-solutions" },
    { name: "Projects", href: "#projects" },
    { name: "About", href: "#about" },
    { name: "Process", href: "#process" },
    { name: "Why Us", href: "#why-zynova" },
    { name: "ZYNOVA Gives Back", href: "#gives-back" },
    { name: "Contact", href: "#contact" }
  ];

  const serviceLinks = [
    { name: "Full-Stack MERN Development", href: "#services" },
    { name: "Mobile Apps (Flutter & React Native)", href: "#services" },
    { name: "Enterprise Backend Architecture", href: "#services" },
    { name: "Excel Data Cleaning & Automation", href: "#data-solutions" },
    { name: "Advanced Power BI Dashboards", href: "#data-solutions" },
    { name: "Blockchain & Web3 Integrations", href: "#services" },
    { name: "Shopify & E-Commerce Engineering", href: "#services" }
  ];

  const platformKeys: Array<keyof typeof siteConfig.freelancePlatforms> = [
    "upwork",
    "fiverr",
    "freelancer",
    "peoplePerHour",
    "truelancer"
  ];

  return (
    <footer className="relative bg-white/[0.12] backdrop-blur-2xl saturate-150 border-t border-white/25 pt-12 sm:pt-14 pb-8 sm:pb-10 overflow-hidden text-slate-200 shadow-[0_-8px_32px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.35)]">
      {/* Ambient glow accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-gradient-to-b from-amber-400/15 via-cyan-500/10 to-transparent blur-3xl pointer-events-none z-[1]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10 mb-10 sm:mb-12">
          {/* Column 1: Brand Info & Contact */}
          <div className="lg:col-span-2 space-y-3">
            <a
              href="#hero"
              onMouseEnter={() => setCursor("link")}
              onMouseLeave={resetCursor}
              className="inline-flex items-center gap-2.5"
            >
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-tr from-amber-400 via-yellow-500 to-amber-600 p-[1.5px] shadow-sm">
                <div className="w-full h-full bg-slate-950/80 rounded-[6px] flex items-center justify-center">
                  <span className="font-heading font-black text-transparent bg-gradient-to-r from-amber-400 to-yellow-400 bg-clip-text text-xs sm:text-sm">
                    Z
                  </span>
                </div>
              </div>
              <span className="font-heading text-lg sm:text-xl lg:text-2xl font-extrabold tracking-wider text-white flex items-center gap-1">
                {siteConfig.brandName}
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block shadow-[0_0_8px_#f59e0b]" />
              </span>
            </a>

            <p className="text-xs sm:text-sm text-slate-300 font-normal max-w-sm leading-relaxed">
              Premium digital technology and software solutions studio. We engineer resilient digital architectures, automated systems, and data intelligence that drive tangible business growth.
            </p>

            <div className="pt-1.5 space-y-1.5 text-xs font-mono">
              {/* Email */}
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  aria-label={`Email ZYNOVA at ${siteConfig.contact.email}`}
                  onMouseEnter={() => setCursor("link")}
                  onMouseLeave={resetCursor}
                  className="footer-contact-link text-slate-200 font-medium hover:text-cyan-300 focus:outline-none focus:ring-1 focus:ring-cyan-500/50 rounded py-0.5 inline-flex items-center min-h-[44px] sm:min-h-0"
                >
                  {siteConfig.contact.email}
                </a>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <a
                  href={`tel:${siteConfig.contact.phoneTel}`}
                  aria-label={`Call ZYNOVA at ${siteConfig.contact.phone}`}
                  onMouseEnter={() => setCursor("link")}
                  onMouseLeave={resetCursor}
                  className="footer-contact-link text-slate-200 font-medium hover:text-cyan-300 focus:outline-none focus:ring-1 focus:ring-cyan-500/50 rounded py-0.5 inline-flex items-center min-h-[44px] sm:min-h-0"
                >
                  {siteConfig.contact.phone}
                </a>
              </div>

              {/* WhatsApp Community */}
              <div className="flex items-center gap-2">
                <WhatsAppIcon className="w-3.5 h-3.5 text-[#22c55e] shrink-0" />
                <a
                  href={siteConfig.whatsappGroupURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Join the ZYNOVA WhatsApp group"
                  onMouseEnter={() => setCursor("button", "JOIN")}
                  onMouseLeave={resetCursor}
                  className="footer-contact-link text-slate-200 font-medium hover:text-cyan-300 focus:outline-none focus:ring-1 focus:ring-cyan-500/50 rounded py-0.5 inline-flex items-center min-h-[44px] sm:min-h-0"
                >
                  Join our WhatsApp Group &rarr;
                </a>
              </div>

              {/* Location */}
              <div className="flex items-center gap-2 text-slate-300 font-medium py-0.5">
                <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>{siteConfig.contact.location}</span>
              </div>

              {/* Response Time */}
              <div className="flex items-center gap-2 text-slate-300 font-medium py-0.5">
                <Clock className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                <span>Response Guarantee: {siteConfig.contact.responseGuarantee}</span>
              </div>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h4 className="font-heading text-xs sm:text-sm font-bold text-white uppercase tracking-wider mb-2.5 sm:mb-3 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Navigation</span>
            </h4>
            <ul className="space-y-1.5 text-xs sm:text-sm">
              {navLinks.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    onMouseEnter={() => setCursor("link")}
                    onMouseLeave={resetCursor}
                    className="footer-interactive-link text-slate-300 hover:text-white font-medium transition-colors"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Specialized Capabilities */}
          <div>
            <h4 className="font-heading text-xs sm:text-sm font-bold text-white uppercase tracking-wider mb-2.5 sm:mb-3 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span>Capabilities</span>
            </h4>
            <ul className="space-y-1.5 text-xs sm:text-sm">
              {serviceLinks.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    onMouseEnter={() => setCursor("link")}
                    onMouseLeave={resetCursor}
                    className="footer-capability-link text-slate-300 hover:text-white font-medium transition-colors"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Available Platforms */}
          <div>
            <h4 className="font-heading text-xs sm:text-sm font-bold text-white uppercase tracking-wider mb-2.5 sm:mb-3 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Freelance Hubs</span>
            </h4>
            <p className="text-xs text-slate-300 font-normal mb-2.5">
              Engage ZYNOVA securely via leading contract and freelance platforms:
            </p>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {platformKeys.map((key) => {
                const url = siteConfig.freelancePlatforms[key];
                const isExternal = url && url !== "#";
                return (
                  <a
                    key={key}
                    href={isExternal ? url : "#platforms"}
                    {...(isExternal ? { target: "_blank", rel: "noreferrer" } : {})}
                    onMouseEnter={() => setCursor("link")}
                    onMouseLeave={resetCursor}
                    className="footer-hub-badge px-2.5 py-1 rounded-md text-xs font-semibold liquid-glass-subcard text-slate-200 hover:text-white hover:border-amber-400/50 capitalize transition-colors"
                  >
                    {key}
                  </a>
                );
              })}
            </div>
            <div className="mt-4 pt-3 border-t border-white/20 space-y-2">
              <span className="text-[11px] text-slate-300 block font-bold">
                Direct Inquiries:
              </span>
              <div className="space-y-1 font-mono text-xs">
                <div className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    aria-label={`Email ZYNOVA at ${siteConfig.contact.email}`}
                    onMouseEnter={() => setCursor("link")}
                    onMouseLeave={resetCursor}
                    className="footer-contact-link text-cyan-300 font-semibold hover:text-cyan-200 focus:outline-none focus:ring-1 focus:ring-cyan-500/50 rounded inline-flex items-center min-h-[44px] sm:min-h-0"
                  >
                    {siteConfig.contact.email}
                  </a>
                </div>
                <div className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <a
                    href={`tel:${siteConfig.contact.phoneTel}`}
                    aria-label={`Call ZYNOVA at ${siteConfig.contact.phone}`}
                    onMouseEnter={() => setCursor("link")}
                    onMouseLeave={resetCursor}
                    className="footer-contact-link text-slate-200 font-medium hover:text-cyan-300 focus:outline-none focus:ring-1 focus:ring-cyan-500/50 rounded inline-flex items-center min-h-[44px] sm:min-h-0"
                  >
                    {siteConfig.contact.phone}
                  </a>
                </div>
              </div>

              {/* WhatsApp Community */}
              <div className="pt-2 border-t border-white/20">
                <span className="text-[11px] text-slate-300 block mb-1 font-bold">
                  WhatsApp Community
                </span>
                <a
                  href={siteConfig.whatsappGroupURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Join the ZYNOVA WhatsApp group"
                  onMouseEnter={() => setCursor("button", "JOIN")}
                  onMouseLeave={resetCursor}
                  className="footer-contact-link text-xs text-amber-300 hover:text-amber-200 font-mono font-bold inline-flex items-center gap-1.5 py-0.5 min-h-[44px] sm:min-h-0 focus:outline-none focus:ring-1 focus:ring-amber-500/50 rounded cursor-pointer"
                >
                  <WhatsAppIcon className="w-3.5 h-3.5 text-[#22c55e]" />
                  <span>Join our WhatsApp Group &rarr;</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-5 mt-5 border-t border-white/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-slate-300 font-normal">
            <span>&copy; 2026 {siteConfig.brandName}. All rights reserved.</span>
            <span className="hidden sm:inline">&bull;</span>
            <span className="text-slate-300 font-normal">
              Founded by <span className="text-white font-bold">{siteConfig.founder.name}</span>
            </span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <span className="font-mono text-[10.5px] sm:text-[11px] text-slate-300 font-semibold tracking-wide">
              {siteConfig.tagline}
            </span>
            <button
              onClick={scrollToTop}
              onMouseEnter={() => setCursor("button")}
              onMouseLeave={resetCursor}
              className="p-1.5 sm:p-2 rounded-full liquid-glass-subcard hover:border-cyan-400 hover:text-cyan-300 text-slate-200 transition-all cursor-pointer"
              aria-label="Back to top"
            >
              <ArrowUp className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
