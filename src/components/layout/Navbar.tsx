import React, { useState } from "react";
import { siteConfig } from "../../config/siteConfig";
import { useScrollSpy } from "../../hooks/useScrollSpy";
import { useCursor } from "../../context/useCursor";
import { MagneticButton } from "../ui/MagneticButton";
import { Menu, X, ArrowUpRight, Phone } from "lucide-react";

// Static Section IDs for scrollspy (stable reference)
const SECTION_IDS = [
  "hero",
  "services",
  "data-solutions",
  "projects",
  "about",
  "process",
  "why-zynova",
  "gives-back",
  "contact"
];

const NAV_LINKS = [
  { name: "Home", href: "#hero", id: "hero" },
  { name: "Services", href: "#services", id: "services" },
  { name: "Data & BI", href: "#data-solutions", id: "data-solutions" },
  { name: "Projects", href: "#projects", id: "projects" },
  { name: "About", href: "#about", id: "about" },
  { name: "Process", href: "#process", id: "process" },
  { name: "Give Back", href: "#gives-back", id: "gives-back" },
  { name: "Contact", href: "#contact", id: "contact" }
];

export const Navbar: React.FC = () => {
  const { setCursor, resetCursor } = useCursor();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { activeSection, isScrolled } = useScrollSpy(SECTION_IDS, 150);

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "py-2 sm:py-2.5 bg-white/[0.14] backdrop-blur-xl saturate-150 border-b border-white/25 shadow-[0_8px_32px_rgba(0,0,0,0.22),inset_0_1px_0_rgba(255,255,255,0.35)]"
            : "py-2.5 sm:py-3 bg-white/[0.10] backdrop-blur-xl saturate-150 border-b border-white/20 shadow-[0_4px_24px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.25)]"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick("#hero");
            }}
            onMouseEnter={() => setCursor("link")}
            onMouseLeave={resetCursor}
            className="group flex items-center gap-2 cursor-pointer"
          >
            <div className="relative w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-400 via-yellow-400 to-amber-600 p-[1.5px] transition-transform duration-300 group-hover:scale-105 shadow-[0_4px_14px_rgba(245,158,11,0.35)]">
              <div className="w-full h-full bg-slate-950/80 rounded-[7px] flex items-center justify-center">
                <span className="font-heading font-black text-transparent bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 bg-clip-text text-base">
                  Z
                </span>
              </div>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-heading text-sm sm:text-base lg:text-lg font-extrabold tracking-wider text-white flex items-center gap-1 whitespace-nowrap">
                {siteConfig.brandName}
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block shadow-[0_0_8px_#f59e0b] shrink-0" />
              </span>
              <span className="text-[7.5px] sm:text-[8.5px] uppercase tracking-widest text-amber-300 font-mono hidden sm:block leading-none font-bold">
                STUDIO &bull; EST. 2026
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-0.5 bg-white/[0.12] p-1 rounded-full border border-white/25 backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_4px_16px_rgba(0,0,0,0.18)]">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(link.href);
                  }}
                  onMouseEnter={() => setCursor("link")}
                  onMouseLeave={resetCursor}
                  className={`relative px-3 sm:px-3.5 py-1 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "text-slate-950 bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-400 font-bold shadow-[0_2px_12px_rgba(245,158,11,0.35)] border border-amber-200"
                      : "text-slate-200 hover:text-white hover:bg-white/[0.18] border border-transparent"
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </nav>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center gap-2.5">
            <MagneticButton
              asAnchor
              href={`tel:${siteConfig.phoneTel}`}
              variant="primary"
              className="group hidden sm:inline-flex !py-1.5 !px-3.5 text-xs font-bold shadow-[0_4px_18px_rgba(245,158,11,0.3)] hover:shadow-[0_6px_24px_rgba(245,158,11,0.45)] cursor-pointer"
              cursorLabel="CALL"
              aria-label={`Call ZYNOVA at ${siteConfig.phone}`}
            >
              <Phone className="w-3 h-3 text-slate-950 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
              <span>BOOK A CALL</span>
            </MagneticButton>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              onMouseEnter={() => setCursor("button")}
              onMouseLeave={resetCursor}
              className="lg:hidden p-2 rounded-xl bg-white/[0.14] border border-white/25 text-white hover:text-amber-300 shadow-sm transition-colors"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-amber-400" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 lg:hidden" role="dialog" aria-modal="true">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-md transition-opacity animate-in fade-in duration-200"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Menu Panel */}
          <div className="fixed top-20 right-4 left-4 max-w-sm ml-auto liquid-glass-panel rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.35)] p-6 overflow-hidden border border-white/25">
            <div className="flex flex-col gap-2">
              <span className="text-[10px] uppercase tracking-widest text-slate-300 font-mono mb-2 font-bold">
                Navigation
              </span>
              {NAV_LINKS.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(link.href);
                    }}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                      isActive
                        ? "bg-amber-400/20 text-amber-300 border border-amber-400/50 shadow-sm"
                        : "text-slate-200 hover:bg-white/[0.16] hover:text-white"
                    }`}
                  >
                    <span>{link.name}</span>
                    <ArrowUpRight className="w-4 h-4 opacity-60" />
                  </a>
                );
              })}

              <div className="pt-4 mt-2 border-t border-white/20">
                <a
                  href={`tel:${siteConfig.phoneTel}`}
                  aria-label={`Call ZYNOVA at ${siteConfig.phone}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="group w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 text-slate-950 font-bold text-sm shadow-[0_4px_18px_rgba(245,158,11,0.3)] hover:shadow-[0_6px_25px_rgba(245,158,11,0.45)] min-h-[44px] transition-all cursor-pointer"
                >
                  <Phone className="w-4 h-4 text-slate-950 transition-transform duration-300 group-hover:rotate-12" />
                  <span>BOOK A CALL</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
