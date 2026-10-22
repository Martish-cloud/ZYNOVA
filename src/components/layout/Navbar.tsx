import React, { useState } from "react";
import { motion } from "framer-motion";
import { siteConfig } from "../../config/siteConfig";
import { useScrollSpy } from "../../hooks/useScrollSpy";
import { useCursor } from "../../context/useCursor";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { MagneticButton } from "../ui/MagneticButton";
import { useSmoothScroll } from "../motion/SmoothScroll";
import { Menu, X, Sparkles } from "lucide-react";

// Static Section IDs for scrollspy (stable reference)
const SECTION_IDS = [
  "hero",
  "services",
  "projects",
  "about",
  "process",
  "why-zynova",
  "contact"
];

const NAV_LINKS = [
  { name: "Home", href: "#hero", id: "hero" },
  { name: "Services", href: "#services", id: "services" },
  { name: "Projects", href: "#projects", id: "projects" },
  { name: "About", href: "#about", id: "about" },
  { name: "Process", href: "#process", id: "process" },
  { name: "Why Us", href: "#why-zynova", id: "why-zynova" },
  { name: "Contact", href: "#contact", id: "contact" }
];

export const Navbar: React.FC = () => {
  const { setCursor, resetCursor } = useCursor();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollTo } = useSmoothScroll();
  const prefersReducedMotion = useReducedMotion();

  const { activeSection, isScrolled, manualNavigate } = useScrollSpy(SECTION_IDS, 140);

  const handleLinkClick = (href: string, id: string) => {
    setMobileMenuOpen(false);
    manualNavigate(id);
    scrollTo(href);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "py-2 sm:py-2.5 bg-[#080706]/90 backdrop-blur-xl border-b border-[#D0A04B]/20 shadow-[0_4px_24px_rgba(0,0,0,0.6)]"
            : "py-2.5 sm:py-3 bg-[#080706]/75 backdrop-blur-xl border-b border-[#D0A04B]/15 shadow-[0_2px_12px_rgba(0,0,0,0.4)]"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick("#hero", "hero");
            }}
            onMouseEnter={() => setCursor("link")}
            onMouseLeave={resetCursor}
            className="group flex items-center gap-2 cursor-pointer"
          >
            <div className="relative w-8 h-8 rounded-lg bg-gradient-to-tr from-[#D0A04B] via-[#E2B767] to-[#A9792E] p-[1.5px] transition-transform duration-300 group-hover:scale-105 shadow-[0_4px_14px_rgba(208,160,75,0.3)]">
              <div className="w-full h-full rounded-[7px] flex items-center justify-center bg-[#080706] transition-colors duration-300">
                <span className="font-heading font-black text-transparent bg-gradient-to-r from-[#D0A04B] via-[#E2B767] to-[#A9792E] bg-clip-text text-base">
                  Z
                </span>
              </div>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-heading text-sm sm:text-base lg:text-lg font-extrabold tracking-wider flex items-center gap-1 whitespace-nowrap text-white transition-colors duration-300">
                {siteConfig.brandName}
                <span className="w-1.5 h-1.5 rounded-full bg-[#D0A04B] inline-block shadow-[0_0_8px_#D0A04B] shrink-0" />
              </span>
              <span className="text-[7.5px] sm:text-[8.5px] uppercase tracking-widest text-[#D0A04B] font-mono hidden sm:block leading-none font-bold">
                STUDIO &bull; EST. 2026
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav
            role="navigation"
            aria-label="Primary Navigation"
            className="hidden lg:flex items-center gap-1 p-1 rounded-full border border-[#D0A04B]/20 bg-[#171410]/85 backdrop-blur-xl shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
          >
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(link.href, link.id);
                  }}
                  onMouseEnter={() => setCursor("link")}
                  onMouseLeave={resetCursor}
                  aria-current={isActive ? "page" : undefined}
                  className={`group relative px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide cursor-pointer transition-all duration-200 select-none outline-none focus-visible:ring-2 focus-visible:ring-[#D0A04B] focus-visible:ring-offset-2 focus-visible:ring-offset-[#080706] ${
                    isActive
                      ? "text-[#080706] font-bold"
                      : "text-[#D4CEC4] hover:text-white hover:-translate-y-0.5 active:translate-y-0 hover:bg-[#D0A04B]/10 hover:shadow-[0_4px_14px_rgba(208,160,75,0.18)] active:scale-[0.97]"
                  }`}
                >
                  {/* Sliding active pill indicator with Framer Motion */}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavPill"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-[#D0A04B] via-[#E2B767] to-[#C4923E] border border-[#F3CF8A]/40 shadow-[0_2px_14px_rgba(208,160,75,0.45),inset_0_1px_1px_rgba(255,255,255,0.4)] z-0"
                      transition={
                        prefersReducedMotion
                          ? { duration: 0 }
                          : { type: "spring", stiffness: 400, damping: 32 }
                      }
                    />
                  )}
                  {/* Text Label */}
                  <span className="relative z-10 transition-colors duration-200 block drop-shadow-[0_1px_1px_rgba(0,0,0,0.25)]">
                    {link.name}
                  </span>
                </a>
              );
            })}
          </nav>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center gap-2.5">
            <MagneticButton
              asAnchor
              href="#book-call"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick("#book-call", "contact");
              }}
              variant="gold"
              className="group hidden sm:inline-flex !py-1.5 !px-3.5 text-xs font-bold shadow-[0_4px_16px_rgba(208,160,75,0.25)] hover:shadow-[0_6px_22px_rgba(208,160,75,0.35)] cursor-pointer"
              cursorLabel="BOOK"
              aria-label="Book a discovery call with ZYNOVA"
            >
              <Sparkles className="w-3 h-3 text-black transition-transform duration-300 group-hover:scale-110" />
              <span>BOOK A CALL</span>
            </MagneticButton>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              onMouseEnter={() => setCursor("button")}
              onMouseLeave={resetCursor}
              className="lg:hidden p-2 rounded-xl border border-[#D0A04B]/20 bg-[#171410] text-white hover:text-[#D0A04B] shadow-sm transition-colors cursor-pointer"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-[#D0A04B]" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-b border-[#D0A04B]/20 px-4 pt-2 pb-6 space-y-2 shadow-lg animate-in slide-in-from-top-2 duration-200 bg-[#080706]">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(link.href, link.id);
                  }}
                  aria-current={isActive ? "page" : undefined}
                  className={`block px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-[#D0A04B] ${
                    isActive
                      ? "bg-gradient-to-r from-[#D0A04B] via-[#E2B767] to-[#C4923E] text-[#080706] font-bold shadow-[0_2px_12px_rgba(208,160,75,0.35)]"
                      : "text-[#D4CEC4] hover:bg-[#171410] hover:text-white active:scale-[0.98]"
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
            <div className="pt-2">
              <a
                href="#book-call"
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick("#book-call", "contact");
                }}
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold bg-gradient-to-r from-[#D0A04B] via-[#E2B767] to-[#C4923E] text-black shadow-[0_2px_12px_rgba(208,160,75,0.35)] transition-transform active:scale-[0.98]"
              >
                <Sparkles className="w-3.5 h-3.5 text-black" />
                <span>BOOK A CALL</span>
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Navbar;
