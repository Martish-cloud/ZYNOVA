import React, { useState, useMemo, useCallback, Suspense, useRef, useEffect } from "react";
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
  const props = { className: "w-4 h-4 text-[#B58A45] group-hover:text-[#9E7432] transition-colors" };
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
      className="group relative rounded-xl overflow-hidden bg-white border border-[#E5D9C8] hover:border-[#B58A45]/60 shadow-[0_4px_16px_rgba(41,39,32,0.04)] hover:shadow-[0_12px_32px_rgba(181,138,69,0.14)] transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col justify-between focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B58A45]/80"
    >
      {/* Perimeter Border Light */}
      <CardBorderLight retriggerKey={retriggerKey} />

      {/* Inner Card Content */}
      <div className="relative z-10 p-2 sm:p-2.5 md:p-3 rounded-xl bg-white h-full flex flex-col justify-between overflow-hidden transition-colors duration-300">
        <div>
          {/* Header with Number and Icon */}
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-1">
              <span className="font-mono text-[9px] sm:text-[10px] font-bold text-[#756C60] group-hover:text-[#B58A45] transition-colors">
                // {service.number}
              </span>
              {service.pricing && (
                <span className="px-1 py-0.5 rounded text-[7.5px] sm:text-[8px] font-mono font-bold bg-[#B58A45]/12 text-[#9E7432] border border-[#B58A45]/30">
                  {service.pricing}
                </span>
              )}
            </div>
            <div className="p-1 sm:p-1.5 rounded-lg bg-[#B58A45]/12 border border-[#B58A45]/30 group-hover:scale-105 transition-transform">
              {renderServiceIcon(service.icon)}
            </div>
          </div>

          {/* Title */}
          <h3 className="text-xs sm:text-sm font-bold font-heading text-[#292720] group-hover:text-[#B58A45] transition-colors mb-1 leading-snug line-clamp-2">
            {service.title}
          </h3>

          {/* Short Description */}
          <p className="text-[10px] sm:text-[11px] text-[#574F44] font-normal leading-relaxed mb-2 line-clamp-2 sm:line-clamp-3">
            {service.shortDesc}
          </p>

          {/* Pricing Box */}
          {service.pricing && (
            <div className="mb-1.5 px-1.5 py-1 rounded-md bg-[#FAF7F0] border border-[#E5D9C8]">
              <div className="flex items-baseline justify-between gap-1">
                <span className="text-[7.5px] sm:text-[8px] font-mono uppercase tracking-wider text-[#9E7432] font-bold truncate">
                  From {service.pricing.split(" ")[0]}
                </span>
                <span className="text-[10px] sm:text-[11px] font-mono font-extrabold text-[#292720] shrink-0">
                  {service.pricing}
                </span>
              </div>
              {service.pricingNote && (
                <span className="text-[7.5px] sm:text-[8px] text-[#756C60] font-normal italic block truncate mt-0.5">
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
                className="px-1 py-0.5 rounded text-[7.5px] sm:text-[8px] font-mono font-medium bg-[#FAF7F0] text-[#574F44] border border-[#E5D9C8]"
              >
                {tech}
              </span>
            ))}
            {service.technologies.length > 2 && (
              <span className="px-1 py-0.5 rounded text-[7.5px] sm:text-[8px] font-mono font-semibold bg-[#F0E4D2]/40 text-[#756C60] border border-[#E5D9C8]">
                +{service.technologies.length - 2}
              </span>
            )}
          </div>

          {/* Bottom Action Line: Deliverables + Quick Cart Action */}
          <div className="pt-1.5 border-t border-[#E5D9C8] flex items-center justify-between gap-1">
            <span className="text-[9px] sm:text-[10px] font-bold text-[#574F44] group-hover:text-[#B58A45] transition-colors flex items-center gap-0.5">
              <span>Details</span>
              <ArrowUpRight className="w-2.5 h-2.5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </span>

            {/* Add to Cart / Quantity controls on card */}
            {quantity > 0 ? (
              <div
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-0.5 bg-[#B58A45]/15 border border-[#B58A45]/40 rounded-md px-1 py-0.5"
              >
                <button
                  type="button"
                  onClick={(e) => onUpdateQuantity(service.id, -1, e)}
                  className="w-3.5 h-3.5 rounded flex items-center justify-center text-[#9E7432] hover:bg-[#B58A45]/20 text-[9px]"
                  title="Decrease"
                >
                  <Minus className="w-2 h-2" />
                </button>
                <span className="text-[9px] font-mono font-bold text-[#292720] px-0.5">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={(e) => onUpdateQuantity(service.id, 1, e)}
                  className="w-3.5 h-3.5 rounded flex items-center justify-center text-[#9E7432] hover:bg-[#B58A45]/20 text-[9px]"
                  title="Increase"
                >
                  <Plus className="w-2 h-2" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={(e) => onAddToCart(service, e)}
                className="px-1.5 py-0.5 rounded-md bg-[#B58A45]/15 hover:bg-[#B58A45] text-[#9E7432] hover:text-white border border-[#B58A45]/35 text-[9px] font-mono font-bold flex items-center gap-0.5 transition-all cursor-pointer"
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

  // Two-Row Alternating Vertical Slide-Up Animation State
  const [row0Phase, setRow0Phase] = useState<"visible" | "exiting" | "staged">("visible");
  const [row1Phase, setRow1Phase] = useState<"visible" | "exiting" | "staged">("staged");
  const [isServicesHovered, setIsServicesHovered] = useState(false);
  const animationTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const activeRow = row0Phase === "visible" ? 0 : 1;

  // Upward alternating transition handler
  const triggerRowTransition = useCallback((targetRow: 0 | 1) => {
    if (animationTimerRef.current) clearTimeout(animationTimerRef.current);

    if (targetRow === 1) {
      // Row 0 slides upward and fades out; Row 1 slides upward from below and fades in
      setRow0Phase("exiting");
      setRow1Phase("visible");
      animationTimerRef.current = setTimeout(() => {
        // Once completely exited, reset Row 0 to staged-below with no transition
        setRow0Phase("staged");
      }, 700);
    } else {
      // Row 1 slides upward and fades out; Row 0 slides upward from below and fades in
      setRow1Phase("exiting");
      setRow0Phase("visible");
      animationTimerRef.current = setTimeout(() => {
        // Once completely exited, reset Row 1 to staged-below with no transition
        setRow1Phase("staged");
      }, 700);
    }
  }, []);

  const { ref: sectionRef, isInView, triggerCount, prefersReducedMotion } = useInViewAnimation<HTMLElement>({
    threshold: 0.1,
    rootMargin: "0px 0px -5% 0px"
  });

  // Seamless 2-second alternating timer loop
  useEffect(() => {
    if (prefersReducedMotion || isServicesHovered || activeCategory !== "web-software" || !isInView) {
      if (animationTimerRef.current) clearTimeout(animationTimerRef.current);
      return;
    }

    const intervalTimer = setInterval(() => {
      setRow0Phase((currRow0) => {
        if (currRow0 === "visible") {
          triggerRowTransition(1);
        } else {
          triggerRowTransition(0);
        }
        return currRow0;
      });
    }, 2800); // 2100ms visible hold + 700ms smooth transition

    return () => {
      clearInterval(intervalTimer);
      if (animationTimerRef.current) clearTimeout(animationTimerRef.current);
    };
  }, [prefersReducedMotion, isServicesHovered, activeCategory, isInView, triggerRowTransition]);

  const getRowStyle = (phase: "visible" | "exiting" | "staged"): React.CSSProperties => {
    if (phase === "visible") {
      return {
        transform: "translateY(0px)",
        opacity: 1,
        pointerEvents: "auto",
        transition: "transform 650ms cubic-bezier(0.16, 1, 0.3, 1), opacity 650ms cubic-bezier(0.16, 1, 0.3, 1)"
      };
    }
    if (phase === "exiting") {
      return {
        transform: "translateY(-30px)",
        opacity: 0,
        pointerEvents: "none",
        transition: "transform 650ms cubic-bezier(0.16, 1, 0.3, 1), opacity 650ms cubic-bezier(0.16, 1, 0.3, 1)"
      };
    }
    return {
      transform: "translateY(30px)",
      opacity: 0,
      pointerEvents: "none",
      transition: "none"
    };
  };

  const filteredServices = useMemo(
    () => servicesData.filter((s) => s.category === activeCategory),
    [activeCategory]
  );

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
  }, []);

  const getCartTotal = useCallback(() => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [cart]);

  const getCartCount = useCallback(() => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  }, [cart]);

  const handleOpenDetails = useCallback((service: ServiceItem) => {
    setSelectedService(service);
  }, []);

  const checkoutToBookCall = () => {
    if (cart.length === 0) return;
    const summary = cart
      .map((item) => `${item.title} (${item.category}) × ${item.quantity}`)
      .join(", ");
    if (onSelectServiceForBooking) {
      onSelectServiceForBooking(summary);
    }
    const bookSection = document.getElementById("book-call");
    if (bookSection) {
      bookSection.scrollIntoView({ behavior: "smooth" });
    }
    setIsCartModalOpen(false);
  };

  return (
    <section
      id="services"
      ref={sectionRef}
      className="py-14 sm:py-18 md:py-20 relative z-10 bg-[#FAF7F0] border-t border-[#E5D9C8]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="OUR CAPABILITIES"
          title="Build Your Engineered Solution"
          highlightedTitle="Around Your Business."
          subtitle="From bespoke digital experiences to production-grade mobile applications and data modeling pipelines."
          subtitleVariant="typewriter"
        />

        {/* Category Switcher Pill */}
        <div className="flex justify-center mb-8 sm:mb-10">
          <div className="inline-flex p-1 rounded-full bg-[#F0E4D2]/60 border border-[#E5D9C8] backdrop-blur-md shadow-xs">
            <button
              onClick={() => setActiveCategory("web-software")}
              onMouseEnter={() => setCursor("button")}
              onMouseLeave={resetCursor}
              className={`flex items-center gap-1.5 px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                activeCategory === "web-software"
                  ? "bg-gradient-to-r from-[#C99E56] via-[#B58A45] to-[#9E7432] text-white font-bold shadow-sm"
                  : "text-[#574F44] hover:text-[#292720]"
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
                  ? "bg-gradient-to-r from-[#C99E56] via-[#B58A45] to-[#9E7432] text-white font-bold shadow-sm"
                  : "text-[#574F44] hover:text-[#292720]"
              }`}
            >
              <Database className="w-3.5 h-3.5" />
              <span>Data &amp; Business (7)</span>
            </button>
          </div>
        </div>

        {/* Service Cards Grid */}
        {activeCategory === "web-software" ? (
          <div>
            {prefersReducedMotion ? (
              <div className="space-y-3">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-2.5 md:gap-3 xl:gap-3.5">
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
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-2.5 md:gap-3 xl:gap-3.5">
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
              <div
                className="relative"
                onMouseEnter={() => setIsServicesHovered(true)}
                onMouseLeave={() => setIsServicesHovered(false)}
              >
                {/* Single-Cell Overlapping CSS Grid Stack for Zero Layout Shift */}
                <div className="grid grid-cols-1 grid-rows-1 overflow-hidden py-1">
                  {/* Row 1: Services 1 to 5 */}
                  <div
                    className="col-start-1 row-start-1 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-2.5 md:gap-3 xl:gap-3.5 will-change-[transform,opacity]"
                    style={getRowStyle(row0Phase)}
                    aria-hidden={row0Phase !== "visible"}
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

                  {/* Row 2: Services 6 to 10 */}
                  <div
                    className="col-start-1 row-start-1 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-2.5 md:gap-3 xl:gap-3.5 will-change-[transform,opacity]"
                    style={getRowStyle(row1Phase)}
                    aria-hidden={row1Phase !== "visible"}
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

                {/* Alternating Row Cycle Controls & Indicators */}
                <div className="flex items-center justify-center gap-3 mt-6 sm:mt-7">
                  <button
                    type="button"
                    onClick={() => triggerRowTransition(0)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-2 ${
                      activeRow === 0
                        ? "bg-[#B58A45] text-white shadow-sm"
                        : "bg-white text-[#756C60] hover:text-[#292720] border border-[#E5D9C8]"
                    }`}
                  >
                    <span className={`w-2 h-2 rounded-full ${activeRow === 0 ? "bg-white animate-pulse" : "bg-[#B58A45]"}`} />
                    <span>Row 1 (Services 1–5)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => triggerRowTransition(1)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-2 ${
                      activeRow === 1
                        ? "bg-[#B58A45] text-white shadow-sm"
                        : "bg-white text-[#756C60] hover:text-[#292720] border border-[#E5D9C8]"
                    }`}
                  >
                    <span className={`w-2 h-2 rounded-full ${activeRow === 1 ? "bg-white animate-pulse" : "bg-[#B58A45]"}`} />
                    <span>Row 2 (Services 6–10)</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
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

      {/* Cart Summary Bar */}
      {cart.length > 0 && (
        <div className="fixed bottom-3 sm:bottom-5 left-1/2 -translate-x-1/2 w-[94%] max-w-4xl z-40 animate-in fade-in slide-in-from-bottom-3 duration-300">
          <div className="rounded-xl bg-white border border-[#B58A45]/40 shadow-xl px-3 sm:px-4 py-2 sm:py-2.5">
            <div className="hidden md:flex items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-[#9E7432] font-mono font-bold">
                <ShoppingBag className="w-4 h-4 text-[#B58A45]" />
                <span>Selected Services ({getCartCount()}):</span>
                <span className="text-[#574F44] font-medium truncate max-w-sm">
                  {cart.map((c) => `${c.title} × ${c.quantity}`).join(", ")}
                </span>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <span className="font-mono text-[#292720] font-bold text-sm">
                  Est. Total: ${getCartTotal().toLocaleString()}
                </span>
                <button
                  type="button"
                  onClick={() => setIsCartModalOpen(true)}
                  className="px-3 py-1.5 rounded-lg bg-[#FAF7F0] hover:bg-white text-[#292720] border border-[#E5D9C8] font-mono text-[11px] font-bold"
                >
                  View Details
                </button>
                <button
                  type="button"
                  onClick={checkoutToBookCall}
                  className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-[#C99E56] via-[#B58A45] to-[#9E7432] text-white font-mono text-[11px] font-bold shadow-sm hover:brightness-105"
                >
                  Checkout ({getCartCount()})
                </button>
                <button
                  type="button"
                  onClick={clearCart}
                  className="p-1 rounded text-[#756C60] hover:text-[#292720]"
                  title="Clear Cart"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Mobile View */}
            <div className="flex md:hidden flex-col gap-1.5">
              <div className="flex items-center justify-between text-[11px]">
                <div className="flex items-center gap-1 text-[#9E7432] font-mono font-bold truncate">
                  <ShoppingBag className="w-3.5 h-3.5 shrink-0" />
                  <span>Cart ({getCartCount()}):</span>
                  <span className="text-[#574F44] font-medium truncate max-w-[150px]">
                    {cart.map((c) => `${c.title.split(" ")[0]}×${c.quantity}`).join(", ")}
                  </span>
                </div>
                <div className="flex items-baseline gap-1 font-mono shrink-0 pl-1">
                  <span className="text-[10px] text-[#756C60]">Total:</span>
                  <span className="text-xs font-bold text-[#B58A45]">
                    ${getCartTotal().toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between gap-1.5 pt-1 border-t border-[#E5D9C8]">
                <button
                  type="button"
                  onClick={() => setIsCartModalOpen(true)}
                  className="flex-1 py-1 rounded-md bg-[#FAF7F0] text-[#292720] border border-[#E5D9C8] text-[10px] font-mono font-bold text-center"
                >
                  VIEW CART
                </button>
                <button
                  type="button"
                  onClick={checkoutToBookCall}
                  className="flex-1 py-1 rounded-md bg-[#B58A45] text-white font-mono font-bold text-[10px] text-center flex items-center justify-center gap-1 shadow-sm"
                >
                  <span>CHECKOUT</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
                <button
                  type="button"
                  onClick={clearCart}
                  className="p-1 text-[#756C60]"
                  title="Clear"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cart Modal */}
      {isCartModalOpen && typeof document !== "undefined" && createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg rounded-2xl bg-white border border-[#E5D9C8] shadow-2xl p-4 sm:p-5 flex flex-col max-h-[85vh]">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5D9C8] mb-3">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-[#B58A45]" />
                <h3 className="text-sm sm:text-base font-bold font-heading text-[#292720]">
                  Selected Services ({getCartCount()})
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsCartModalOpen(false)}
                className="p-1 rounded-lg bg-[#FAF7F0] text-[#574F44] hover:text-[#292720] border border-[#E5D9C8]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="p-2.5 rounded-xl bg-[#FAF7F0] border border-[#E5D9C8] flex items-center justify-between gap-2"
                >
                  <div className="min-w-0 flex-1">
                    <span className="text-[9px] font-mono text-[#9E7432] font-bold uppercase block">
                      {item.category}
                    </span>
                    <h4 className="text-xs font-bold text-[#292720] truncate">
                      {item.title}
                    </h4>
                    <span className="text-[10px] font-mono text-[#756C60] font-medium">
                      ${item.price} each • Subtotal: ${(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <div className="flex items-center bg-white border border-[#E5D9C8] rounded-lg p-0.5">
                      <button
                        type="button"
                        onClick={(e) => updateQuantity(item.id, -1, e)}
                        className="w-6 h-6 rounded flex items-center justify-center text-[#574F44] hover:text-[#292720] text-xs"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-6 text-center text-xs font-mono font-bold text-[#B58A45]">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => updateQuantity(item.id, 1, e)}
                        className="w-6 h-6 rounded flex items-center justify-center text-[#574F44] hover:text-[#292720] text-xs"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => removeFromCart(item.id, e)}
                      className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 transition-colors"
                      title="Remove"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-[#E5D9C8] mt-3 space-y-2.5">
              <div className="flex items-baseline justify-between font-mono">
                <span className="text-xs text-[#756C60] font-semibold">Estimated Total:</span>
                <span className="text-base sm:text-lg font-black text-[#B58A45]">
                  ${getCartTotal().toLocaleString()}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={clearCart}
                  className="px-3 py-2 rounded-xl bg-[#FAF7F0] hover:bg-white text-[#574F44] border border-[#E5D9C8] text-xs font-mono font-semibold transition-colors"
                >
                  Clear All
                </button>
                <button
                  type="button"
                  onClick={checkoutToBookCall}
                  className="flex-1 py-2 rounded-xl bg-gradient-to-r from-[#C99E56] via-[#B58A45] to-[#9E7432] text-white font-mono font-bold text-xs shadow-md flex items-center justify-center gap-1.5 transition-all"
                >
                  <span>Proceed to Booking</span>
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
