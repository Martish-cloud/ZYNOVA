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
            ? "py-2 sm:py-2.5 bg-white/85 backdrop-blur-xl border-b border-slate-200/90 shadow-[0_8px_30px_rgba(15,23,42,0.06)]"
            : "py-2.5 sm:py-3 bg-white/75 backdrop-blur-lg border-b border-slate-200/70 shadow-[0_2px_20px_rgba(15,23,42,0.04)]"
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
              <div className="w-full h-full bg-white rounded-[7px] flex items-center justify-center">
                <span className="font-heading font-black text-transparent bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-600 bg-clip-text text-base">
                  Z
                </span>
              </div>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-heading text-sm sm:text-base lg:text-lg font-extrabold tracking-wider text-slate-900 flex items-center gap-1 whitespace-nowrap">
                {siteConfig.brandName}
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 inline-block shadow-[0_0_6px_#f59e0b] shrink-0" />
              </span>
              <span className="text-[7.5px] sm:text-[8.5px] uppercase tracking-widest text-amber-700/80 font-mono hidden sm:block leading-none font-semibold">
                STUDIO &bull; EST. 2026
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-0.5 bg-slate-100/85 p-1 rounded-full border border-slate-200/90 backdrop-blur-md shadow-inner">
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
                      ? "text-amber-900 bg-white shadow-[0_2px_10px_rgba(245,158,11,0.2)] border border-amber-400/50"
                      : "text-slate-600 hover:text-slate-900 hover:bg-white/70 border border-transparent"
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
              className="lg:hidden p-2 rounded-xl bg-white/90 border border-slate-200/90 text-slate-700 hover:text-slate-900 shadow-sm transition-colors"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-amber-600" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 lg:hidden" role="dialog" aria-modal="true">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-900/25 backdrop-blur-md transition-opacity animate-in fade-in duration-200"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Menu Panel */}
          <div className="fixed top-20 right-4 left-4 max-w-sm ml-auto bg-white/95 backdrop-blur-2xl border border-slate-200/90 rounded-2xl shadow-[0_20px_50px_rgba(15,23,42,0.15)] p-6 overflow-hidden">
            <div className="flex flex-col gap-2">
              <span className="text-[10px] uppercase tracking-widest text-slate-500 font-mono mb-2 font-semibold">
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
                    className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-amber-50 text-amber-900 border border-amber-400/50 font-semibold"
                        : "text-slate-700 hover:bg-slate-100/80 hover:text-slate-900"
                    }`}
                  >
                    <span>{link.name}</span>
                    <ArrowUpRight className="w-4 h-4 opacity-50" />
                  </a>
                );
              })}

              <div className="pt-4 mt-2 border-t border-slate-200">
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
