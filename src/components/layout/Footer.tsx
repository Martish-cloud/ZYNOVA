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
    <footer className="relative bg-white/80 backdrop-blur-xl border-t border-slate-200/90 pt-12 sm:pt-14 pb-8 sm:pb-10 overflow-hidden text-slate-600 shadow-[0_-4px_30px_rgba(15,23,42,0.03)]">
      {/* Ambient glow accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-gradient-to-b from-amber-400/10 via-cyan-500/8 to-transparent blur-3xl pointer-events-none z-[1]" />

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
                <div className="w-full h-full bg-white rounded-[6px] flex items-center justify-center">
                  <span className="font-heading font-black text-transparent bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-xs sm:text-sm">
                    Z
                  </span>
                </div>
              </div>
              <span className="font-heading text-lg sm:text-xl lg:text-2xl font-extrabold tracking-wider text-slate-900 flex items-center gap-1">
                {siteConfig.brandName}
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 inline-block shadow-[0_0_6px_#f59e0b]" />
              </span>
            </a>

            <p className="text-xs sm:text-sm text-slate-600 max-w-sm leading-relaxed">
              Premium digital technology and software solutions studio. We engineer resilient digital architectures, automated systems, and data intelligence that drive tangible business growth.
            </p>

            <div className="pt-1.5 space-y-1.5 text-xs font-mono">
              {/* Email */}
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-cyan-600 shrink-0" />
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  aria-label={`Email ZYNOVA at ${siteConfig.contact.email}`}
                  onMouseEnter={() => setCursor("link")}
                  onMouseLeave={resetCursor}
                  className="footer-contact-link text-slate-700 hover:text-cyan-700 focus:outline-none focus:ring-1 focus:ring-cyan-500/50 rounded py-0.5 inline-flex items-center min-h-[44px] sm:min-h-0"
                >
                  {siteConfig.contact.email}
                </a>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-cyan-600 shrink-0" />
                <a
                  href={`tel:${siteConfig.contact.phoneTel}`}
                  aria-label={`Call ZYNOVA at ${siteConfig.contact.phone}`}
                  onMouseEnter={() => setCursor("link")}
                  onMouseLeave={resetCursor}
                  className="footer-contact-link text-slate-700 hover:text-cyan-700 focus:outline-none focus:ring-1 focus:ring-cyan-500/50 rounded py-0.5 inline-flex items-center min-h-[44px] sm:min-h-0"
                >
                  {siteConfig.contact.phone}
                </a>
              </div>

              {/* WhatsApp Community */}
              <div className="flex items-center gap-2">
                <WhatsAppIcon className="w-3.5 h-3.5 text-[#16a34a] shrink-0" />
                <a
                  href={siteConfig.whatsappGroupURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Join the ZYNOVA WhatsApp group"
                  onMouseEnter={() => setCursor("button", "JOIN")}
                  onMouseLeave={resetCursor}
                  className="footer-contact-link text-slate-700 hover:text-cyan-700 focus:outline-none focus:ring-1 focus:ring-cyan-500/50 rounded py-0.5 inline-flex items-center min-h-[44px] sm:min-h-0"
                >
                  Join our WhatsApp Group &rarr;
                </a>
              </div>

              {/* Location */}
              <div className="flex items-center gap-2 text-slate-700 py-0.5">
                <MapPin className="w-3.5 h-3.5 text-cyan-600 shrink-0" />
                <span>{siteConfig.contact.location}</span>
              </div>

              {/* Response Time */}
              <div className="flex items-center gap-2 text-slate-700 py-0.5">
                <Clock className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                <span>Response Guarantee: {siteConfig.contact.responseGuarantee}</span>
              </div>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h4 className="font-heading text-xs sm:text-sm font-semibold text-slate-900 uppercase tracking-wider mb-2.5 sm:mb-3 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-cyan-600" />
              <span>Navigation</span>
            </h4>
            <ul className="space-y-1.5 text-xs sm:text-sm">
              {navLinks.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    onMouseEnter={() => setCursor("link")}
                    onMouseLeave={resetCursor}
                    className="footer-interactive-link text-slate-600"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Specialized Capabilities */}
          <div>
            <h4 className="font-heading text-xs sm:text-sm font-semibold text-slate-900 uppercase tracking-wider mb-2.5 sm:mb-3 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-purple-600" />
              <span>Capabilities</span>
            </h4>
            <ul className="space-y-1.5 text-xs sm:text-sm">
              {serviceLinks.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    onMouseEnter={() => setCursor("link")}
                    onMouseLeave={resetCursor}
                    className="footer-capability-link text-slate-600"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Available Platforms */}
          <div>
            <h4 className="font-heading text-xs sm:text-sm font-semibold text-slate-900 uppercase tracking-wider mb-2.5 sm:mb-3 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Freelance Hubs</span>
            </h4>
            <p className="text-xs text-slate-600 mb-2.5">
              Engage ZYNOVA securely via leading contract and freelance platforms:
            </p>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {platformKeys.map((key) => {
                const url = siteConfig.freelancePlatforms[key];
                return (
                  <a
                    key={key}
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    onMouseEnter={() => setCursor("link")}
                    onMouseLeave={resetCursor}
                    className="footer-hub-badge px-2.5 py-1 rounded-md text-xs font-medium bg-white/90 backdrop-blur-sm border border-slate-200/90 text-slate-700 capitalize shadow-sm"
                  >
                    {key}
                  </a>
                );
              })}
            </div>
            <div className="mt-4 pt-3 border-t border-slate-200/80 space-y-2">
              <span className="text-[11px] text-slate-500 block font-medium">
                Direct Inquiries:
              </span>
              <div className="space-y-1 font-mono text-xs">
                <div className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-cyan-600 shrink-0" />
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    aria-label={`Email ZYNOVA at ${siteConfig.contact.email}`}
                    onMouseEnter={() => setCursor("link")}
                    onMouseLeave={resetCursor}
                    className="footer-contact-link text-cyan-700 hover:text-cyan-800 focus:outline-none focus:ring-1 focus:ring-cyan-500/50 rounded inline-flex items-center min-h-[44px] sm:min-h-0"
                  >
                    {siteConfig.contact.email}
                  </a>
                </div>
                <div className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-cyan-600 shrink-0" />
                  <a
                    href={`tel:${siteConfig.contact.phoneTel}`}
                    aria-label={`Call ZYNOVA at ${siteConfig.contact.phone}`}
                    onMouseEnter={() => setCursor("link")}
                    onMouseLeave={resetCursor}
                    className="footer-contact-link text-slate-700 hover:text-cyan-700 focus:outline-none focus:ring-1 focus:ring-cyan-500/50 rounded inline-flex items-center min-h-[44px] sm:min-h-0"
                  >
                    {siteConfig.contact.phone}
                  </a>
                </div>
              </div>

              {/* WhatsApp Community */}
              <div className="pt-2 border-t border-slate-200/80">
                <span className="text-[11px] text-slate-500 block mb-1 font-medium">
                  WhatsApp Community
                </span>
                <a
                  href={siteConfig.whatsappGroupURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Join the ZYNOVA WhatsApp group"
                  onMouseEnter={() => setCursor("button", "JOIN")}
                  onMouseLeave={resetCursor}
                  className="footer-contact-link text-xs text-amber-700 hover:text-amber-800 font-mono font-semibold inline-flex items-center gap-1.5 py-0.5 min-h-[44px] sm:min-h-0 focus:outline-none focus:ring-1 focus:ring-amber-500/50 rounded cursor-pointer"
                >
                  <WhatsAppIcon className="w-3.5 h-3.5 text-[#16a34a]" />
                  <span>Join our WhatsApp Group &rarr;</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-5 mt-5 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-slate-600">
            <span>&copy; 2026 {siteConfig.brandName}. All rights reserved.</span>
            <span className="hidden sm:inline">&bull;</span>
            <span className="text-slate-700 font-medium">
              Founded by <span className="text-slate-900 font-semibold">{siteConfig.founder.name}</span>
            </span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <span className="font-mono text-[11px] text-slate-500 font-semibold">
              BUILD &bull; AUTOMATE &bull; SCALE
            </span>
            <button
              onClick={scrollToTop}
              onMouseEnter={() => setCursor("button")}
              onMouseLeave={resetCursor}
              className="p-1.5 sm:p-2 rounded-full bg-white border border-slate-200 hover:border-cyan-500 hover:text-cyan-700 text-slate-600 transition-all shadow-sm cursor-pointer"
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
