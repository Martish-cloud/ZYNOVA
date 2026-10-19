import React, { useState } from "react";
import { siteConfig } from "../../config/siteConfig";
import { useScrollSpy } from "../../hooks/useScrollSpy";
import { useCursor } from "../../context/useCursor";
import { MagneticButton } from "../ui/MagneticButton";
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
            ? "py-2 sm:py-2.5 bg-[#FAF7F0]/92 backdrop-blur-xl border-b border-[#E5D9C8] shadow-[0_4px_24px_rgba(41,39,32,0.06)]"
            : "py-2.5 sm:py-3 bg-[#FAF7F0]/80 backdrop-blur-xl border-b border-[#E5D9C8]/70 shadow-[0_2px_12px_rgba(41,39,32,0.03)]"
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
            <div className="relative w-8 h-8 rounded-lg bg-gradient-to-tr from-[#C99E56] via-[#B58A45] to-[#9E7432] p-[1.5px] transition-transform duration-300 group-hover:scale-105 shadow-[0_4px_14px_rgba(181,138,69,0.3)]">
              <div className="w-full h-full bg-[#FAF7F0] rounded-[7px] flex items-center justify-center">
                <span className="font-heading font-black text-transparent bg-gradient-to-r from-[#B58A45] via-[#C99E56] to-[#9E7432] bg-clip-text text-base">
                  Z
                </span>
              </div>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-heading text-sm sm:text-base lg:text-lg font-extrabold tracking-wider text-[#292720] flex items-center gap-1 whitespace-nowrap">
                {siteConfig.brandName}
                <span className="w-1.5 h-1.5 rounded-full bg-[#B58A45] inline-block shadow-[0_0_8px_#b58a45] shrink-0" />
              </span>
              <span className="text-[7.5px] sm:text-[8.5px] uppercase tracking-widest text-[#B58A45] font-mono hidden sm:block leading-none font-bold">
                STUDIO &bull; EST. 2026
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-0.5 bg-[#F0E4D2]/60 p-1 rounded-full border border-[#E5D9C8] backdrop-blur-md shadow-xs">
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
                      ? "text-white bg-[#B58A45] font-bold shadow-[0_2px_10px_rgba(181,138,69,0.3)] border border-[#9E7432]"
                      : "text-[#574F44] hover:text-[#292720] hover:bg-white/70 border border-transparent"
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
              href="#book-call"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick("#book-call");
              }}
              variant="gold"
              className="group hidden sm:inline-flex !py-1.5 !px-3.5 text-xs font-bold shadow-[0_4px_16px_rgba(181,138,69,0.25)] hover:shadow-[0_6px_22px_rgba(181,138,69,0.35)] cursor-pointer"
              cursorLabel="BOOK"
              aria-label="Book a discovery call with ZYNOVA"
            >
              <Sparkles className="w-3 h-3 text-white transition-transform duration-300 group-hover:scale-110" />
              <span>BOOK A CALL</span>
            </MagneticButton>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              onMouseEnter={() => setCursor("button")}
              onMouseLeave={resetCursor}
              className="lg:hidden p-2 rounded-xl bg-white border border-[#E5D9C8] text-[#292720] hover:text-[#B58A45] shadow-sm transition-colors"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-[#B58A45]" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#FAF7F0] border-b border-[#E5D9C8] px-4 pt-2 pb-6 space-y-2 shadow-lg animate-in slide-in-from-top-2 duration-200">
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
                  className={`block px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                    isActive
                      ? "bg-[#B58A45] text-white font-bold"
                      : "text-[#574F44] hover:bg-[#F0E4D2]/60 hover:text-[#292720]"
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
                  handleLinkClick("#book-call");
                }}
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold bg-[#B58A45] text-white shadow-sm"
              >
                <Sparkles className="w-3.5 h-3.5 text-white" />
                <span>BOOK A CALL</span>
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
