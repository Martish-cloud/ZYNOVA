import React, { useState, useMemo, useCallback, Suspense } from "react";
import { createPortal } from "react-dom";
import { servicesData } from "../data/services";
import type { ServiceItem } from "../data/services";
import { SectionHeading } from "../components/ui/SectionHeading";
import { useInViewAnimation } from "../hooks/useInViewAnimation";
import { CardBorderLight } from "../components/ui/CardBorderLight";
import { useCursor } from "../context/useCursor";
import {
  Layout,
  Layers,
  Server,
  Smartphone,
  AppWindow,
  Cpu,
  ShieldCheck,
  Code2,
  FileCode,
  ShoppingBag,
  FileSpreadsheet,
  Filter,
  GitMerge,
  BarChart3,
  PieChart,
  LineChart,
  Activity,
  ArrowUpRight,
  ArrowRight,
  Sparkles,
  Code,
  Database,
  Plus,
  Minus,
  Trash2,
  X
} from "lucide-react";

const ServiceModal = React.lazy(() =>
  import("./ServiceModal").then((m) => ({ default: m.ServiceModal }))
);

const renderServiceIcon = (iconName: string) => {
  const props = { className: "w-4 h-4 text-amber-400 group-hover:text-amber-300 transition-colors" };
  switch (iconName) {
    case "Layout": return <Layout {...props} />;
    case "Layers": return <Layers {...props} />;
    case "Server": return <Server {...props} />;
    case "Smartphone": return <Smartphone {...props} />;
    case "AppWindow": return <AppWindow {...props} />;
    case "Cpu": return <Cpu {...props} />;
    case "ShieldCheck": return <ShieldCheck {...props} />;
    case "Code2": return <Code2 {...props} />;
    case "FileCode": return <FileCode {...props} />;
    case "ShoppingBag": return <ShoppingBag {...props} />;
    case "FileSpreadsheet": return <FileSpreadsheet {...props} />;
    case "Filter": return <Filter {...props} />;
    case "GitMerge": return <GitMerge {...props} />;
    case "BarChart3": return <BarChart3 {...props} />;
    case "PieChart": return <PieChart {...props} />;
    case "LineChart": return <LineChart {...props} />;
    case "Activity": return <Activity {...props} />;
    default: return <Sparkles {...props} />;
  }
};

interface ServiceCardProps {
  service: ServiceItem;
  quantity: number;
  onOpenDetails: (service: ServiceItem) => void;
  onAddToCart: (service: ServiceItem, e: React.MouseEvent) => void;
  onUpdateQuantity: (id: string, delta: number, e: React.MouseEvent) => void;
  retriggerKey?: string | number;
}

const ServiceCard = React.memo<ServiceCardProps>(({
  service,
  quantity,
  onOpenDetails,
  onAddToCart,
  onUpdateQuantity,
  retriggerKey
}) => {
  const { setCursor, resetCursor } = useCursor();

  return (
    <div
      tabIndex={0}
      role="button"
      aria-label={`View details for ${service.title}`}
      onClick={() => onOpenDetails(service)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpenDetails(service);
        }
      }}
      onMouseEnter={() => setCursor("project", "EXPAND")}
      onMouseLeave={resetCursor}
      className="group relative rounded-xl overflow-hidden liquid-glass-card shadow-[0_8px_28px_rgba(0,0,0,0.32)] hover:shadow-[0_16px_36px_-10px_rgba(245,158,11,0.28)] transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col justify-between focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/80 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
    >
      {/* Synchronized Perimeter-Only Border Light (Zero interior bleed) */}
      <CardBorderLight retriggerKey={retriggerKey} />

      {/* Inner Card Content */}
      <div className="relative z-10 p-2 sm:p-2.5 md:p-3 rounded-xl bg-gradient-to-br from-slate-950/75 via-slate-900/65 to-slate-950/80 backdrop-blur-xl saturate-150 border border-white/20 group-hover:border-amber-400/40 shadow-[inset_0_1px_0_rgba(255,255,255,0.22),0_8px_24px_rgba(0,0,0,0.35)] h-full flex flex-col justify-between overflow-hidden transition-colors duration-300">
        <div>
        {/* Header with Number and Icon */}
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center gap-1">
            <span className="font-mono text-[9px] sm:text-[10px] font-bold text-slate-300 group-hover:text-amber-300 transition-colors">
              // {service.number}
            </span>
            {service.pricing && (
              <span className="px-1 py-0.5 rounded text-[7.5px] sm:text-[8px] font-mono font-bold bg-amber-400/[0.18] text-amber-300 border border-amber-400/40">
                {service.pricing}
              </span>
            )}
          </div>
          <div className="p-1 sm:p-1.5 rounded-lg bg-amber-400/[0.18] border border-amber-400/40 shadow-[inset_0_1px_0_rgba(255,255,255,0.35)] group-hover:scale-105 group-hover:border-amber-300 transition-transform">
            {renderServiceIcon(service.icon)}
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xs sm:text-sm font-bold font-heading text-white group-hover:text-amber-300 transition-colors mb-1 leading-snug line-clamp-2">
          {service.title}
        </h3>

        {/* Short Description */}
        <p className="text-[10px] sm:text-[11px] text-slate-200 font-normal leading-relaxed mb-2 line-clamp-2 sm:line-clamp-3">
          {service.shortDesc}
        </p>

        {/* Pricing Box */}
        {service.pricing && (
          <div className="mb-1.5 px-1.5 py-1 rounded-md bg-slate-950/50 border border-amber-400/35 shadow-[inset_0_1px_0_rgba(255,255,255,0.18)]">
            <div className="flex items-baseline justify-between gap-1">
              <span className="text-[7.5px] sm:text-[8px] font-mono uppercase tracking-wider text-amber-300 font-bold truncate">
                From {service.pricing.split(" ")[0]}
              </span>
              <span className="text-[10px] sm:text-[11px] font-mono font-extrabold text-white shrink-0">
                {service.pricing}
              </span>
            </div>
            {service.pricingNote && (
              <span className="text-[7.5px] sm:text-[8px] text-slate-300 font-normal italic block truncate mt-0.5">
                {service.pricingNote}
              </span>
            )}
          </div>
        )}
      </div>

      <div>
        {/* Tech Tags */}
        <div className="flex flex-wrap gap-0.5 sm:gap-1 mb-1.5">
          {service.technologies.slice(0, 2).map((tech) => (
            <span
              key={tech}
              className="px-1 py-0.5 rounded text-[7.5px] sm:text-[8px] font-mono font-medium bg-white/[0.12] text-slate-100 border border-white/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]"
            >
              {tech}
            </span>
          ))}
          {service.technologies.length > 2 && (
            <span className="px-1 py-0.5 rounded text-[7.5px] sm:text-[8px] font-mono font-semibold bg-white/[0.08] text-slate-300 border border-white/15">
              +{service.technologies.length - 2}
            </span>
          )}
        </div>

        {/* Bottom Action Line: Deliverables + Quick Cart Action */}
        <div className="pt-1.5 border-t border-white/15 flex items-center justify-between gap-1">
          <span className="text-[9px] sm:text-[10px] font-bold text-slate-200 group-hover:text-amber-300 transition-colors flex items-center gap-0.5">
            <span>Details</span>
            <ArrowUpRight className="w-2.5 h-2.5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </span>

          {/* Add to Cart / Quantity controls on card */}
          {quantity > 0 ? (
            <div
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-0.5 bg-amber-400/20 border border-amber-400/50 rounded-md px-1 py-0.5"
            >
              <button
                type="button"
                onClick={(e) => onUpdateQuantity(service.id, -1, e)}
                className="w-3.5 h-3.5 rounded flex items-center justify-center text-amber-300 hover:bg-amber-400/30 text-[9px]"
                title="Decrease"
              >
                <Minus className="w-2 h-2" />
              </button>
              <span className="text-[9px] font-mono font-bold text-white px-0.5">
                {quantity}
              </span>
              <button
                type="button"
                onClick={(e) => onUpdateQuantity(service.id, 1, e)}
                className="w-3.5 h-3.5 rounded flex items-center justify-center text-amber-300 hover:bg-amber-400/30 text-[9px]"
                title="Increase"
              >
                <Plus className="w-2 h-2" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={(e) => onAddToCart(service, e)}
              className="px-1.5 py-0.5 rounded-md bg-amber-400/[0.18] hover:bg-amber-400 text-amber-300 hover:text-slate-950 border border-amber-400/50 text-[9px] font-mono font-bold flex items-center gap-0.5 transition-all cursor-pointer"
              title="Add service to inquiry cart"
            >
              <Plus className="w-2 h-2" />
              <span>Add</span>
            </button>
          )}
        </div>
      </div>
    </div>
  </div>
  );
});

interface ServicesProps {
  onSelectServiceForBooking?: (serviceTitle: string) => void;
}

interface CartItem {
  id: string;
  title: string;
  category: string;
  quantity: number;
  price: number;
  pricingString: string;
}

export const Services: React.FC<ServicesProps> = ({ onSelectServiceForBooking }) => {
  const { setCursor, resetCursor } = useCursor();
  const [activeCategory, setActiveCategory] = useState<"web-software" | "data-business">("web-software");
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);

  const { ref: sectionRef, isInView, triggerCount, prefersReducedMotion } = useInViewAnimation<HTMLElement>({
    threshold: 0.1,
    rootMargin: "0px 0px -5% 0px",
    retrigger: true
  });

  const filteredServices = useMemo(
    () => servicesData.filter((s) => s.category === activeCategory),
    [activeCategory]
  );

  // Cart operations
  const addToCart = useCallback((service: ServiceItem, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const price = service.basePrice || 150;
    setCart((prev) => {
      const existing = prev.find((item) => item.id === service.id);
      if (existing) {
        return prev.map((item) =>
          item.id === service.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prev,
        {
          id: service.id,
          title: service.title,
          category: service.category === "web-software" ? "Web / App" : "Data / BI",
          quantity: 1,
          price,
          pricingString: service.pricing || `$${price}`
        }
      ];
    });
  }, []);

  const updateQuantity = useCallback((id: string, delta: number, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  }, []);

  const removeFromCart = useCallback((id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCart((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const clearCart = useCallback((e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCart([]);
    setIsCartModalOpen(false);
  }, []);

  const getCartTotal = () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const getCartCount = () => cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleOpenDetails = useCallback((service: ServiceItem) => {
    setSelectedService(service);
  }, []);

  const checkoutToBookCall = () => {
    const summary = cart.map((item) => `${item.title} (×${item.quantity})`).join(", ");
    const fullBrief = `Selected Services: ${summary} | Estimated Base Total: $${getCartTotal().toLocaleString()}`;
    if (onSelectServiceForBooking) {
      onSelectServiceForBooking(fullBrief);
    }
    setIsCartModalOpen(false);
    const bookSection = document.getElementById("book-call");
    if (bookSection) {
      bookSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="services" ref={sectionRef} className="py-12 sm:py-16 md:py-20 relative z-10 bg-transparent">
      <div className="max-w-7xl 2xl:max-w-[1536px] mx-auto px-3 sm:px-6 lg:px-8">
        <SectionHeading
          badge="WHAT WE BUILD"
          title="Engineered Solutions Built Around"
          highlightedTitle="Your Business."
          subtitle="From responsive client experiences and resilient backend architectures to advanced Power BI dashboards and Excel automation models."
          subtitleVariant="typewriter"
        />

        {/* Category Switcher Tabs */}
        <div className="flex justify-center mb-6 sm:mb-7">
          <div className="inline-flex p-1 rounded-full liquid-glass-pill">
            <button
              onClick={() => setActiveCategory("web-software")}
              onMouseEnter={() => setCursor("button")}
              onMouseLeave={resetCursor}
              className={`flex items-center gap-1.5 px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                activeCategory === "web-software"
                  ? "bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 text-slate-950 font-bold shadow-[0_4px_15px_rgba(245,158,11,0.35)]"
                  : "text-slate-200 hover:text-white"
              }`}
            >
              <Code className="w-3.5 h-3.5" />
              <span>Web &amp; Software (10)</span>
            </button>

            <button
              onClick={() => setActiveCategory("data-business")}
              onMouseEnter={() => setCursor("button")}
              onMouseLeave={resetCursor}
              className={`flex items-center gap-1.5 px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                activeCategory === "data-business"
                  ? "bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 text-slate-950 font-bold shadow-[0_4px_15px_rgba(245,158,11,0.35)]"
                  : "text-slate-200 hover:text-white"
              }`}
            >
              <Database className="w-3.5 h-3.5" />
              <span>Data &amp; Business (7)</span>
            </button>
          </div>
        </div>

        {/* Service Cards Grid */}
        {activeCategory === "web-software" ? (
          <div className="space-y-2 sm:space-y-2.5 md:space-y-3 xl:space-y-3.5">
            {/* Top Row: 5 Cards (Moves smoothly from Left to Right on scroll entrance) */}
            <div
              className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-2.5 md:gap-3 xl:gap-3.5 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isInView && !prefersReducedMotion
                  ? "lg:translate-x-0 opacity-100"
                  : "lg:-translate-x-4 opacity-90"
              }`}
            >
              {filteredServices.slice(0, 5).map((service) => {
                const cartItem = cart.find((item) => item.id === service.id);
                return (
                  <ServiceCard
                    key={service.id}
                    service={service}
                    quantity={cartItem ? cartItem.quantity : 0}
                    onOpenDetails={handleOpenDetails}
                    onAddToCart={addToCart}
                    onUpdateQuantity={updateQuantity}
                    retriggerKey={triggerCount}
                  />
                );
              })}
            </div>

            {/* Second Row: 5 Cards (Moves smoothly from Right to Left on scroll entrance) */}
            <div
              className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-2.5 md:gap-3 xl:gap-3.5 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isInView && !prefersReducedMotion
                  ? "lg:translate-x-0 opacity-100"
                  : "lg:translate-x-4 opacity-90"
              }`}
            >
              {filteredServices.slice(5, 10).map((service) => {
                const cartItem = cart.find((item) => item.id === service.id);
                return (
                  <ServiceCard
                    key={service.id}
                    service={service}
                    quantity={cartItem ? cartItem.quantity : 0}
                    onOpenDetails={handleOpenDetails}
                    onAddToCart={addToCart}
                    onUpdateQuantity={updateQuantity}
                    retriggerKey={triggerCount}
                  />
                );
              })}
            </div>
          </div>
        ) : (
          /* Data & BI (7 Cards - Perimeter-only synchronized border light, zero interior bleed) */
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-2.5 md:gap-3 xl:gap-3.5">
            {filteredServices.map((service) => {
              const cartItem = cart.find((item) => item.id === service.id);
              return (
                <ServiceCard
                  key={service.id}
                  service={service}
                  quantity={cartItem ? cartItem.quantity : 0}
                  onOpenDetails={handleOpenDetails}
                  onAddToCart={addToCart}
                  onUpdateQuantity={updateQuantity}
                  retriggerKey={triggerCount}
                />
              );
            })}
          </div>
        )}
      </div>

      {/* ============================================================ */}
      {/* ULTRA-COMPACT CART / SUMMARY BAR                            */}
      {/* Desktop: Exactly 1 line (~48-54px)                          */}
      {/* Mobile: Maximum 2 lines (~76-86px)                          */}
      {/* ============================================================ */}
      {cart.length > 0 && (
        <div className="fixed bottom-3 sm:bottom-5 left-1/2 -translate-x-1/2 w-[94%] max-w-4xl z-40 animate-in fade-in slide-in-from-bottom-3 duration-300">
          <div className="rounded-xl liquid-glass-panel !border-amber-400/50 shadow-[0_15px_35px_rgba(0,0,0,0.35),0_0_25px_rgba(245,158,11,0.2)] px-3 sm:px-4 py-2 sm:py-2.5">
            {/* --- DESKTOP VIEW: Exactly 1 Compact Horizontal Line (~48px) --- */}
            <div className="hidden md:flex items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2.5 min-w-0 flex-1">
                <div className="flex items-center gap-1.5 text-amber-300 font-mono font-bold uppercase tracking-wider text-[11px] shrink-0">
                  <ShoppingBag className="w-4 h-4 text-amber-400" />
                  <span>Selected ({getCartCount()}):</span>
                </div>

                <div className="flex items-center gap-1.5 overflow-hidden text-ellipsis whitespace-nowrap">
                  {cart.slice(0, 3).map((item) => (
                    <span
                      key={item.id}
                      className="px-2 py-0.5 rounded-full bg-white/[0.14] border border-white/25 text-[10.5px] font-mono text-slate-200 font-medium flex items-center gap-1"
                    >
                      <span className="truncate max-w-[120px]">{item.title}</span>
                      <span className="text-amber-300 font-bold">×{item.quantity}</span>
                    </span>
                  ))}
                  {cart.length > 3 && (
                    <span className="text-[10.5px] font-mono font-semibold text-slate-300">
                      +{cart.length - 3} more
                    </span>
                  )}
                </div>

                <div className="h-4 w-px bg-white/25 shrink-0" />

                <div className="flex items-baseline gap-1 shrink-0 font-mono">
                  <span className="text-[10.5px] text-slate-300 font-semibold">Total:</span>
                  <span className="text-sm font-extrabold text-amber-300">
                    ${getCartTotal().toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsCartModalOpen(true)}
                  className="px-2.5 py-1 rounded-lg bg-white/[0.14] hover:bg-white/[0.22] text-white border border-white/30 text-[11px] font-mono font-bold transition-colors cursor-pointer"
                >
                  VIEW CART
                </button>

                <button
                  type="button"
                  onClick={checkoutToBookCall}
                  className="px-3.5 py-1 rounded-lg bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 text-slate-950 font-mono font-bold text-[11px] hover:brightness-105 shadow-[0_4px_15px_rgba(245,158,11,0.3)] flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <span>CHECKOUT</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={clearCart}
                  className="p-1 rounded text-slate-300 hover:text-white hover:bg-white/[0.14]"
                  title="Clear Cart"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* --- MOBILE VIEW: Maximum 2 Compact Lines (~76px) --- */}
            <div className="flex md:hidden flex-col gap-1.5">
              {/* Line 1: Items summary & Total */}
              <div className="flex items-center justify-between text-[11px]">
                <div className="flex items-center gap-1 text-amber-300 font-mono font-bold truncate">
                  <ShoppingBag className="w-3.5 h-3.5 shrink-0" />
                  <span>Cart ({getCartCount()}):</span>
                  <span className="text-slate-200 font-medium truncate max-w-[150px]">
                    {cart.map((c) => `${c.title.split(" ")[0]}×${c.quantity}`).join(", ")}
                  </span>
                </div>
                <div className="flex items-baseline gap-1 font-mono shrink-0 pl-1">
                  <span className="text-[10px] text-slate-300 font-semibold">Total:</span>
                  <span className="text-xs font-bold text-amber-300">
                    ${getCartTotal().toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Line 2: Actions */}
              <div className="flex items-center justify-between gap-1.5 pt-1 border-t border-white/20">
                <button
                  type="button"
                  onClick={() => setIsCartModalOpen(true)}
                  className="flex-1 py-1 rounded-md bg-white/[0.14] text-white border border-white/25 text-[10px] font-mono font-bold text-center"
                >
                  VIEW CART
                </button>
                <button
                  type="button"
                  onClick={checkoutToBookCall}
                  className="flex-1 py-1 rounded-md bg-gradient-to-r from-amber-300 to-amber-500 text-slate-950 font-mono font-bold text-[10px] text-center flex items-center justify-center gap-1 shadow-sm"
                >
                  <span>CHECKOUT</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
                <button
                  type="button"
                  onClick={clearCart}
                  className="p-1 text-slate-300 hover:text-white"
                  title="Clear"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* VIEW CART DETAILS MODAL                                      */}
      {/* ============================================================ */}
      {isCartModalOpen && typeof document !== "undefined" && createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg rounded-2xl liquid-glass-panel !border-amber-400/50 shadow-2xl p-4 sm:p-5 flex flex-col max-h-[85vh]">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-white/20 mb-3">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-amber-400" />
                <h3 className="text-sm sm:text-base font-bold font-heading text-white">
                  Selected Services ({getCartCount()})
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsCartModalOpen(false)}
                className="p-1 rounded-lg bg-white/[0.14] text-slate-200 hover:text-white border border-white/25"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Items List */}
            <div className="flex-1 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="p-2.5 rounded-xl liquid-glass-subcard flex items-center justify-between gap-2"
                >
                  <div className="min-w-0 flex-1">
                    <span className="text-[9px] font-mono text-amber-300 font-bold uppercase block">
                      {item.category}
                    </span>
                    <h4 className="text-xs font-bold text-white truncate">
                      {item.title}
                    </h4>
                    <span className="text-[10px] font-mono text-slate-300 font-medium">
                      ${item.price} each • Subtotal: ${(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>

                  {/* Quantity and Delete */}
                  <div className="flex items-center gap-2 shrink-0">
                    <div className="flex items-center bg-white/[0.14] border border-white/25 rounded-lg p-0.5">
                      <button
                        type="button"
                        onClick={(e) => updateQuantity(item.id, -1, e)}
                        className="w-6 h-6 rounded flex items-center justify-center text-slate-200 hover:text-white hover:bg-white/[0.18] text-xs"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-6 text-center text-xs font-mono font-bold text-amber-300">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => updateQuantity(item.id, 1, e)}
                        className="w-6 h-6 rounded flex items-center justify-center text-slate-200 hover:text-white hover:bg-white/[0.18] text-xs"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => removeFromCart(item.id, e)}
                      className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-500/20 transition-colors"
                      title="Remove"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Modal Footer / Summary & Actions */}
            <div className="pt-3 border-t border-white/20 mt-3 space-y-2.5">
              <div className="flex items-baseline justify-between font-mono">
                <span className="text-xs text-slate-300 font-semibold">Estimated Total:</span>
                <span className="text-base sm:text-lg font-black text-transparent bg-gradient-to-r from-amber-300 via-yellow-300 to-amber-400 bg-clip-text">
                  ${getCartTotal().toLocaleString()}
                </span>
              </div>

              <p className="text-[9.5px] font-mono text-slate-300 font-normal leading-tight">
                *Prices are indicative starting estimates. Final scope and custom deliverables will be confirmed in your consultation.
              </p>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={clearCart}
                  className="px-3 py-2 rounded-xl bg-white/[0.14] hover:bg-white/[0.22] text-slate-200 hover:text-white border border-white/25 text-xs font-mono font-semibold transition-colors"
                >
                  Clear All
                </button>
                <button
                  type="button"
                  onClick={checkoutToBookCall}
                  className="flex-1 py-2 rounded-xl bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 text-slate-950 font-mono font-bold text-xs hover:brightness-105 shadow-md flex items-center justify-center gap-1.5 transition-all"
                >
                  <span>Proceed to Booking &amp; Call</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* Service Details Modal */}
      {selectedService && (
        <Suspense fallback={null}>
          <ServiceModal
            service={selectedService}
            isOpen={!!selectedService}
            onClose={() => setSelectedService(null)}
            onSelectServiceForBooking={(title) => {
              if (onSelectServiceForBooking) onSelectServiceForBooking(title);
            }}
          />
        </Suspense>
      )}
    </section>
  );
};
