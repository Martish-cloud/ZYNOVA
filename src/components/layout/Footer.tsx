import React, { useEffect, useRef } from "react";
import { siteConfig } from "../../config/siteConfig";
import { useCursor } from "../../context/useCursor";
import { useSmoothScroll } from "../motion/SmoothScroll";
import { ArrowUp, Sparkles, MapPin, Clock, Mail, Phone } from "lucide-react";
import { WhatsAppIcon } from "../ui/WhatsAppIcon";

export const Footer: React.FC = () => {
  const { setCursor, resetCursor } = useCursor();
  const { scrollTo } = useSmoothScroll();
  const footerRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const footerEl = footerRef.current;
    const videoEl = videoRef.current;
    if (!footerEl || !videoEl) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            videoEl.currentTime = 0;
            const playPromise = videoEl.play();
            if (playPromise !== undefined) {
              playPromise.catch(() => {
                // Autoplay safely ignored if blocked by browser
              });
            }
          } else {
            videoEl.pause();
            videoEl.currentTime = 0;
          }
        });
      },
      { threshold: 0.05 }
    );

    observer.observe(footerEl);

    return () => {
      observer.disconnect();
      if (videoEl) {
        videoEl.pause();
      }
    };
  }, []);

  const scrollToTop = () => {
    scrollTo(0);
  };

  const navLinks = [
    { name: "Home", href: "#hero" },
    { name: "Services", href: "#services" },
    { name: "Projects", href: "#projects" },
    { name: "About", href: "#about" },
    { name: "Process", href: "#process" },
    { name: "Why Us", href: "#why-zynova" },
    { name: "Contact", href: "#contact" }
  ];

  const serviceLinks = [
    { name: "Full-Stack Web Development", href: "#services" },
    { name: "Mobile Apps (Flutter & React Native)", href: "#services" },
    { name: "Enterprise Backend Architecture", href: "#services" },
    { name: "Excel Data Cleaning & Automation", href: "#services" },
    { name: "Advanced Power BI Dashboards", href: "#services" },
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
    <footer
      ref={footerRef}
      className="relative bg-[#080706] border-t border-[#D0A04B]/20 pt-14 sm:pt-16 pb-10 sm:pb-12 overflow-hidden text-[#D4CEC4]"
    >
      {/* Background Video Layer */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <video
          ref={videoRef}
          src="/videos/Footer.mp4"
          muted
          playsInline
          loop
          preload="metadata"
          className="w-full h-full object-cover object-center opacity-70 filter brightness-[0.88] contrast-[1.05]"
        />
        {/* Balanced dark overlay ensuring ~70% video prominence while guaranteeing 100% text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#080706]/85 via-[#080706]/50 to-[#080706]/85 pointer-events-none" />
        {/* Ambient subtle warm gold accent */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-gradient-to-b from-[#D0A04B]/15 via-transparent to-transparent blur-3xl pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10 mb-10 sm:mb-12">
          {/* Column 1: Brand Info & Contact */}
          <div className="lg:col-span-2 space-y-3.5">
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                scrollTo("#hero");
              }}
              onMouseEnter={() => setCursor("link")}
              onMouseLeave={resetCursor}
              className="inline-flex items-center gap-2.5"
            >
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-tr from-[#D0A04B] via-[#E2B767] to-[#A9792E] p-[1.5px] shadow-sm">
                <div className="w-full h-full bg-[#080706] rounded-[6px] flex items-center justify-center">
                  <span className="font-heading font-black text-transparent bg-gradient-to-r from-[#D0A04B] to-[#A9792E] bg-clip-text text-xs sm:text-sm">
                    Z
                  </span>
                </div>
              </div>
              <span className="font-heading text-lg sm:text-xl lg:text-2xl font-extrabold tracking-wider text-white flex items-center gap-1">
                {siteConfig.brandName}
                <span className="w-1.5 h-1.5 rounded-full bg-[#D0A04B] inline-block shadow-[0_0_8px_#D0A04B]" />
              </span>
            </a>

            <p className="text-xs sm:text-sm text-[#D4CEC4] font-normal max-w-sm leading-relaxed">
              Premium digital technology and software solutions studio. We engineer resilient digital architectures, automated systems, and data intelligence that drive tangible business growth.
            </p>

            <div className="pt-1.5 space-y-2 text-xs font-mono">
              {/* Email */}
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#D0A04B] shrink-0" />
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  aria-label={`Email ZYNOVA at ${siteConfig.contact.email}`}
                  onMouseEnter={() => setCursor("link")}
                  onMouseLeave={resetCursor}
                  className="footer-contact-link text-[#D4CEC4] font-medium hover:text-[#D0A04B] focus:outline-none focus:ring-1 focus:ring-[#D0A04B]/50 rounded py-0.5 inline-flex items-center min-h-[44px] sm:min-h-0 transition-colors"
                >
                  {siteConfig.contact.email}
                </a>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#D0A04B] shrink-0" />
                <a
                  href={`tel:${siteConfig.contact.phoneTel}`}
                  aria-label={`Call ZYNOVA at ${siteConfig.contact.phone}`}
                  onMouseEnter={() => setCursor("link")}
                  onMouseLeave={resetCursor}
                  className="footer-contact-link text-[#D4CEC4] font-medium hover:text-[#D0A04B] focus:outline-none focus:ring-1 focus:ring-[#D0A04B]/50 rounded py-0.5 inline-flex items-center min-h-[44px] sm:min-h-0 transition-colors"
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
                  className="footer-contact-link text-[#D4CEC4] font-medium hover:text-[#D0A04B] focus:outline-none focus:ring-1 focus:ring-[#D0A04B]/50 rounded py-0.5 inline-flex items-center min-h-[44px] sm:min-h-0 transition-colors"
                >
                  Join our WhatsApp Group &rarr;
                </a>
              </div>

              {/* Location */}
              <div className="flex items-center gap-2 text-[#D4CEC4]/80 font-medium py-0.5">
                <MapPin className="w-3.5 h-3.5 text-[#D0A04B] shrink-0" />
                <span>{siteConfig.contact.location}</span>
              </div>

              {/* Response Time */}
              <div className="flex items-center gap-2 text-[#D4CEC4]/80 font-medium py-0.5">
                <Clock className="w-3.5 h-3.5 text-[#D0A04B] shrink-0" />
                <span>Response Guarantee: {siteConfig.contact.responseGuarantee}</span>
              </div>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h4 className="font-heading text-xs sm:text-sm font-bold text-white uppercase tracking-wider mb-2.5 sm:mb-3 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#D0A04B]" />
              <span>Navigation</span>
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              {navLinks.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo(item.href);
                    }}
                    onMouseEnter={() => setCursor("link")}
                    onMouseLeave={resetCursor}
                    className="footer-interactive-link text-[#D4CEC4]/80 hover:text-[#D0A04B] font-medium transition-colors cursor-pointer"
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
              <Sparkles className="w-3.5 h-3.5 text-[#D0A04B]" />
              <span>Capabilities</span>
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              {serviceLinks.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo(item.href);
                    }}
                    onMouseEnter={() => setCursor("link")}
                    onMouseLeave={resetCursor}
                    className="footer-capability-link text-[#D4CEC4]/80 hover:text-[#D0A04B] font-medium transition-colors cursor-pointer"
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
              <Sparkles className="w-3.5 h-3.5 text-[#D0A04B]" />
              <span>Freelance Hubs</span>
            </h4>
            <p className="text-xs text-[#D4CEC4]/80 font-normal mb-2.5">
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
                    className="footer-hub-badge px-2.5 py-1 rounded-md text-xs font-semibold bg-[#201B14] border border-[#D0A04B]/20 text-[#D4CEC4] hover:text-white hover:border-[#D0A04B]/60 capitalize transition-colors shadow-xs"
                  >
                    {key}
                  </a>
                );
              })}
              {/* Strictly non-clickable informational badge matching platform aesthetic */}
              <span
                className="px-2.5 py-1 rounded-md text-xs font-semibold bg-[#201B14] border border-[#D0A04B]/20 text-[#D0A04B] select-none cursor-default shadow-xs"
                aria-label="5 additional platforms supported"
              >
                +5 Platforms More
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-5 mt-5 border-t border-[#D0A04B]/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-[#D4CEC4]/80 font-normal">
            <span>&copy; 2026 {siteConfig.brandName}. All rights reserved.</span>
            <span className="hidden sm:inline">&bull;</span>
            <span className="text-[#D4CEC4]/80 font-normal">
              Founded by <span className="text-white font-bold">{siteConfig.founder.name}</span>
            </span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <span className="font-mono text-[10.5px] sm:text-[11px] text-[#D4CEC4]/80 font-semibold tracking-wide">
              {siteConfig.tagline}
            </span>
            <button
              onClick={scrollToTop}
              onMouseEnter={() => setCursor("button")}
              onMouseLeave={resetCursor}
              className="p-1.5 sm:p-2 rounded-full bg-[#201B14] border border-[#D0A04B]/25 hover:border-[#D0A04B] hover:text-[#D0A04B] text-white transition-all cursor-pointer shadow-xs"
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

export default Footer;
