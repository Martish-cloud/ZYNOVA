import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import confetti from "canvas-confetti";
import { Heart, X, Mail, Sparkles } from "lucide-react";
import { donationConfig } from "../../config/donationConfig";
import { useScrollLock } from "../../hooks/useScrollLock";

interface PaymentCelebrationModalProps {
  isOpen: boolean;
  amount?: number;
  donorName?: string;
  onClose: () => void;
}

export const PaymentCelebrationModal: React.FC<PaymentCelebrationModalProps> = ({
  isOpen,
  amount,
  donorName,
  onClose
}) => {
  useScrollLock(isOpen);

  useEffect(() => {
    if (!isOpen) return;

    // Trigger subtle luxury gold/amber confetti burst
    try {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.65 },
        colors: ["#D4AF37", "#F4E4BC", "#F59E0B", "#FBBF24", "#FFFFFF"],
        ticks: 200,
        gravity: 0.9,
        scalar: 0.85
      });
    } catch {
      // Safe fallback
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const modalContent = (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Thank You Confirmation"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200 overflow-hidden"
      onClick={onClose}
      data-lenis-prevent="true"
    >
      {/* Ambient background golden radiance */}
      <div className="absolute w-80 h-80 bg-gradient-to-tr from-amber-500/20 via-yellow-500/20 to-transparent rounded-full blur-[100px] pointer-events-none" />

      {/* Card Container */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-md w-full p-6 sm:p-7 rounded-3xl liquid-glass-card border border-amber-400/50 shadow-[0_24px_60px_rgba(0,0,0,0.5),0_0_40px_rgba(212,175,55,0.25)] text-center space-y-4 animate-in zoom-in-95 duration-200"
        data-lenis-prevent="true"
      >
        {/* Dismiss button */}
        <button
          onClick={onClose}
          aria-label="Close message"
          className="absolute top-4 right-4 p-1.5 rounded-full bg-white/[0.14] hover:bg-white/[0.24] text-slate-300 hover:text-white border border-white/25 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Floating Top Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/15 border border-amber-400/50 text-[10.5px] font-mono font-semibold tracking-wider text-amber-300 uppercase shadow-xs">
          <Sparkles className="w-3 h-3 text-amber-400" />
          <span>GIVE BACK INITIATIVE</span>
        </div>

        {/* Central Icon with Golden Halo */}
        <div className="relative mx-auto w-14 h-14 rounded-full bg-gradient-to-tr from-amber-500/25 via-yellow-400/20 to-amber-600/25 border border-amber-400/60 flex items-center justify-center shadow-[0_4px_20px_rgba(212,175,55,0.35)]">
          <Heart className="w-7 h-7 text-amber-400 fill-amber-400/40 animate-pulse" />
        </div>

        {/* Wishing & Thank-You Headline */}
        <div className="space-y-1">
          <h3 className="text-2xl sm:text-3xl font-black font-heading tracking-tight text-white">
            Thank You! ❤️
          </h3>
          {donorName && donorName.trim() && donorName.toLowerCase() !== "anonymous" && (
            <p className="text-xs font-mono text-amber-300 font-semibold">
              Dear {donorName}
            </p>
          )}
        </div>

        {/* Core Thank-You Message */}
        <p className="text-xs sm:text-sm text-slate-200 leading-relaxed max-w-sm mx-auto">
          Thank you for supporting our Give Back initiative. Your generosity helps us continue creating a positive impact.
        </p>

        {/* Amount Display (if specified) */}
        {amount && amount > 0 ? (
          <div className="py-2.5 px-4 rounded-xl liquid-glass-subcard border-amber-400/50 max-w-xs mx-auto shadow-sm">
            <span className="block text-[10px] font-mono uppercase tracking-widest text-slate-300 font-semibold">
              Selected Contribution
            </span>
            <span className="text-xl sm:text-2xl font-black font-heading text-amber-300 tracking-tight block mt-0.5">
              ₹{amount.toLocaleString("en-IN")}
            </span>
          </div>
        ) : null}

        {/* Email / Questions Card */}
        <div className="p-3 rounded-xl liquid-glass-subcard border-white/20 text-xs space-y-1.5 text-center">
          <span className="text-[11px] text-slate-300 block font-mono">
            For contribution-related questions:
          </span>
          <a
            href={`mailto:${donationConfig.contactEmail}`}
            className="inline-flex items-center gap-1.5 text-amber-300 hover:text-amber-200 font-mono font-semibold hover:underline transition-colors"
          >
            <Mail className="w-3.5 h-3.5 text-amber-400" />
            <span>{donationConfig.contactEmail}</span>
          </a>
        </div>

        {/* Actions */}
        <div className="pt-2 flex flex-col sm:flex-row gap-2 justify-center">
          <a
            href={`mailto:${donationConfig.contactEmail}`}
            className="py-2 px-4 rounded-xl liquid-glass-subcard hover:bg-white/[0.22] text-slate-200 hover:text-white border-white/25 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <Mail className="w-3.5 h-3.5 text-slate-300" />
            <span>Need Help? Contact Us</span>
          </a>

          <button
            type="button"
            onClick={onClose}
            className="py-2 px-5 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-slate-950 font-heading font-bold text-xs transition-all cursor-pointer shadow-md"
          >
            Close &amp; Return
          </button>
        </div>
      </div>
    </div>
  );

  return typeof document !== "undefined" ? createPortal(modalContent, document.body) : modalContent;
};
