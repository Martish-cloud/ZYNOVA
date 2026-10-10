import React, { useEffect } from "react";
import { CheckCircle2, AlertCircle, X } from "lucide-react";

export interface ToastMessage {
  id: string;
  type: "success" | "error" | "info";
  title: string;
  description: string;
}

interface ToastProps {
  toast: ToastMessage | null;
  onDismiss: () => void;
}

export const Toast: React.FC<ToastProps> = ({ toast, onDismiss }) => {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      onDismiss();
    }, 5000);
    return () => clearTimeout(timer);
  }, [toast, onDismiss]);

  if (!toast) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md w-full px-4 animate-in slide-in-from-bottom-5 fade-in duration-300 pointer-events-auto">
      <div className={`p-4 rounded-xl border liquid-glass-card shadow-2xl flex items-start gap-3 ${
        toast.type === "success" 
          ? "border-emerald-400/50 shadow-[0_12px_35px_rgba(16,185,129,0.25)]" 
          : "border-rose-400/50 shadow-[0_12px_35px_rgba(244,63,94,0.25)]"
      }`}>
        {toast.type === "success" ? (
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
        ) : (
          <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
        )}

        <div className="flex-1">
          <h4 className="text-sm font-semibold text-white">{toast.title}</h4>
          <p className="text-xs text-slate-200 mt-0.5">{toast.description}</p>
        </div>

        <button 
          onClick={onDismiss}
          className="text-slate-400 hover:text-white p-1 rounded-md transition-colors cursor-pointer"
          aria-label="Dismiss toast"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
