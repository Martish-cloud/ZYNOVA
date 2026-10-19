import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  maxWidth?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  title,
  maxWidth = "max-w-3xl"
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = originalOverflow;
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const modalNode = (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-md transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Container */}
      <div 
        className={`relative w-full ${maxWidth} liquid-glass-panel !bg-[#FFFDF8]/98 !backdrop-blur-2xl !border-[#E5D9C8] rounded-2xl overflow-hidden z-10 transition-all my-8 max-h-[90vh] flex flex-col text-[#292720] shadow-[0_28px_72px_rgba(41,39,32,0.18)]`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 sm:px-6 sm:py-3.5 border-b border-[#E5D9C8] bg-[#F0E4D2]/40 shrink-0">
          {title ? (
            <h3 className="text-base sm:text-lg font-bold text-[#292720] tracking-wide font-heading">{title}</h3>
          ) : <div />}
          
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-[#756C60] hover:text-[#292720] rounded-full hover:bg-[#E5D9C8]/50 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
            aria-label="Close modal"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4.5 sm:p-6 overflow-y-auto space-y-4 sm:space-y-5">
          {children}
        </div>
      </div>
    </div>
  );

  return typeof document !== "undefined" ? createPortal(modalNode, document.body) : modalNode;
};
