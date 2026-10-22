import React, { useState, useEffect } from "react";
import { siteConfig } from "../../config/siteConfig";
import { useScrollSpy } from "../../hooks/useScrollSpy";
import { useCursor } from "../../context/useCursor";
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
  const [activeTheme, setActiveTheme] = useState<"dark" | "light">("dark");

  const { activeSection, isScrolled } = useScrollSpy(SECTION_IDS, 150);

  // Dynamic surface theme detection based on the panel under the navbar
  useEffect(() => {
    const detectSurfaceTheme = () => {
      const panels = Array.from(document.querySelectorAll<HTMLElement>("[data-stack-index]"));
      if (panels.length === 0) return;

      let detectedTheme: "dark" | "light" = "dark";
      let highestZ = -1;

      for (const panel of panels) {
        const rect = panel.getBoundingClientRect();
        const z = Number(panel.getAttribute("data-stack-index") || 0);
        if (rect.top <= 65 && rect.bottom > 65) {
          if (z >= highestZ) {
            highestZ = z;
            const theme = panel.getAttribute("data-theme") as "dark" | "light";
            if (theme) detectedTheme = theme;
          }
        }
      }

      setActiveTheme(detectedTheme);
    };

    detectSurfaceTheme();
    window.addEventListener("scroll", detectSurfaceTheme, { passive: true });
    return () => window.removeEventListener("scroll", detectSurfaceTheme);
  }, []);

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    scrollTo(href);
  };

  const isDark = activeTheme === "dark";

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? isDark
              ? "py-2 sm:py-2.5 bg-[#0a0806]/85 backdrop-blur-xl border-b border-white/10 shadow-[0_4px_24px_rgba(0,0,0,0.5)]"
              : "py-2 sm:py-2.5 bg-[#FAF7F0]/92 backdrop-blur-xl border-b border-[#E5D9C8] shadow-[0_4px_24px_rgba(41,39,32,0.06)]"
            : isDark
            ? "py-2.5 sm:py-3 bg-[#0a0806]/70 backdrop-blur-xl border-b border-white/[0.08] shadow-[0_2px_12px_rgba(0,0,0,0.3)]"
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
              <div
                className={`w-full h-full rounded-[7px] flex items-center justify-center transition-colors duration-300 ${
                  isDark ? "bg-[#0a0806]" : "bg-[#FAF7F0]"
                }`}
              >
                <span className="font-heading font-black text-transparent bg-gradient-to-r from-[#B58A45] via-[#C99E56] to-[#9E7432] bg-clip-text text-base">
                  Z
                </span>
              </div>
            </div>
            <div className="flex flex-col min-w-0">
              <span
                className={`font-heading text-sm sm:text-base lg:text-lg font-extrabold tracking-wider flex items-center gap-1 whitespace-nowrap transition-colors duration-300 ${
                  isDark ? "text-[#FAF7F0]" : "text-[#292720]"
                }`}
              >
                {siteConfig.brandName}
                <span className="w-1.5 h-1.5 rounded-full bg-[#B58A45] inline-block shadow-[0_0_8px_#b58a45] shrink-0" />
              </span>
              <span className="text-[7.5px] sm:text-[8.5px] uppercase tracking-widest text-[#B58A45] font-mono hidden sm:block leading-none font-bold">
                STUDIO &bull; EST. 2026
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav
            className={`hidden lg:flex items-center gap-0.5 p-1 rounded-full border backdrop-blur-md shadow-xs transition-colors duration-300 ${
              isDark
                ? "bg-[#181410]/75 border-white/10"
                : "bg-[#F0E4D2]/60 border-[#E5D9C8]"
            }`}
          >
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
                      : isDark
                      ? "text-[#C5BCB0] hover:text-white hover:bg-white/10 border border-transparent"
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
              className={`lg:hidden p-2 rounded-xl border shadow-sm transition-colors ${
                isDark
                  ? "bg-[#181410] border-white/15 text-[#FAF7F0] hover:text-[#B58A45]"
                  : "bg-white border-[#E5D9C8] text-[#292720] hover:text-[#B58A45]"
              }`}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-[#B58A45]" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        {mobileMenuOpen && (
          <div
            className={`lg:hidden border-b px-4 pt-2 pb-6 space-y-2 shadow-lg animate-in slide-in-from-top-2 duration-200 transition-colors ${
              isDark
                ? "bg-[#0a0806] border-white/10"
                : "bg-[#FAF7F0] border-[#E5D9C8]"
            }`}
          >
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
                      : isDark
                      ? "text-[#C5BCB0] hover:bg-white/10 hover:text-white"
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

export default Navbar;
