import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { useScrollLock } from "../../hooks/useScrollLock";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  maxWidth?: string;
  theme?: "dark" | "light";
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  title,
  maxWidth = "max-w-2xl",
  theme = "dark"
}) => {
  const isDark = theme === "dark";

  useScrollLock(isOpen);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const modalNode = (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-hidden"
      role="dialog"
      aria-modal="true"
      data-lenis-prevent="true"
    >
      {/* Backdrop with high blur and dark veil */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-md transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog Box */}
      <div
        className={`relative w-full ${maxWidth} rounded-2xl overflow-hidden z-10 transition-all flex flex-col shadow-[0_32px_80px_rgba(0,0,0,0.7)] ${
          isDark
            ? "bg-[#11100E] border border-[#D0A04B]/30 text-[#F8F5EF]"
            : "bg-[#FFFDF8] border border-[#E5D9C8] text-[#292720]"
        }`}
        style={{
          maxHeight: "calc(100dvh - 36px)",
          height: "auto",
        }}
        onClick={(e) => e.stopPropagation()}
        data-lenis-prevent="true"
      >
        {/* Header - Fixed & Never Scrolls */}
        <div
          className={`flex items-center justify-between px-5 py-3.5 sm:px-6 sm:py-4 border-b shrink-0 ${
            isDark
              ? "bg-[#161410] border-white/10"
              : "bg-[#F0E4D2]/40 border-[#E5D9C8]"
          }`}
        >
          {title ? (
            <h3
              className={`text-base sm:text-lg font-bold tracking-wide font-heading ${
                isDark ? "text-[#F8F5EF]" : "text-[#292720]"
              }`}
            >
              {title}
            </h3>
          ) : (
            <div />
          )}

          <button
            type="button"
            onClick={onClose}
            className={`p-1.5 rounded-full transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D0A04B] ${
              isDark
                ? "text-[#C9C1B5] hover:text-[#F8F5EF] hover:bg-white/10"
                : "text-[#756C60] hover:text-[#292720] hover:bg-[#E5D9C8]/50"
            }`}
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Body - Dedicated inner scroll container */}
        <div
          className="p-5 sm:p-6 overflow-y-auto flex-1 min-h-0 space-y-5"
          style={{
            overscrollBehavior: "contain",
            WebkitOverflowScrolling: "touch",
          }}
          data-lenis-prevent="true"
        >
          {children}
        </div>
      </div>
    </div>
  );

  return typeof document !== "undefined" ? createPortal(modalNode, document.body) : modalNode;
};

export default Modal;
