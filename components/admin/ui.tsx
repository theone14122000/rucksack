"use client";

import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { PublishStatus } from "@/lib/cms/types";

// ============ TOASTS ============
type ToastTone = "success" | "error" | "info";
interface ToastMsg {
  id: number;
  tone: ToastTone;
  message: string;
}

interface ToastContextValue {
  toast: (message: string, tone?: ToastTone) => void;
}

const ToastContext = createContext<ToastContextValue>({ toast: () => {} });

export function useToast(): ToastContextValue {
  return useContext(ToastContext);
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = useState<ToastMsg[]>([]);

  const toast = useCallback((message: string, tone: ToastTone = "success") => {
    const id = Date.now() + Math.random();
    setMessages((prev) => [...prev, { id, tone, message }]);
    setTimeout(() => {
      setMessages((prev) => prev.filter((m) => m.id !== id));
    }, 4200);
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2 max-w-sm" role="status" aria-live="polite">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`rounded-card-lg px-4 py-3 text-sm font-semibold shadow-luxury border text-white shadow-lg ${
              m.tone === "success"
                ? "bg-brand-turquoise border-brand-turquoise-bright"
                : m.tone === "error"
                ? "bg-red-600 border-red-500"
                : "bg-brand-dark border-brand-dark"
            }`}
          >
            {m.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

// ============ LAYOUT ============
export function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-white rounded-card-xl border border-brand-turquoise/10 shadow-soft p-5 sm:p-6 ${className}`}>
      {children}
    </div>
  );
}

export function CardTitle({ children }: { children: React.ReactNode }) {
  return <h3 className="font-editorial text-xl font-bold text-brand-dark mb-4">{children}</h3>;
}

export function PageHeader({
  title,
  subtitle,
  actions,
}: {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
      <div>
        <h1 className="font-editorial text-3xl font-bold text-brand-dark tracking-tight">{title}</h1>
        {subtitle && <p className="text-sm text-brand-taupe mt-1">{subtitle}</p>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </div>
  );
}

// ============ BUTTONS ============
type BtnVariant = "primary" | "secondary" | "danger" | "ghost";

export function AdminButton({
  variant = "primary",
  className = "",
  type = "button",
  children,
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: BtnVariant }) {
  const styles: Record<BtnVariant, string> = {
    primary: "bg-brand-turquoise text-white hover:bg-brand-turquoise-light border border-brand-turquoise",
    secondary: "bg-white text-brand-dark border border-brand-turquoise/20 hover:border-brand-turquoise/40 hover:bg-brand-turquoise/5",
    danger: "bg-red-50 text-red-700 border border-red-200 hover:bg-red-600 hover:text-white hover:border-red-600",
    ghost: "bg-transparent text-brand-dark/70 border border-transparent hover:text-brand-dark hover:bg-brand-dark/5",
  };
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-card text-xs font-bold uppercase tracking-wider transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none ${styles[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}

export function AdminLink({
  href,
  variant = "secondary",
  className = "",
  children,
  ...rest
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & { variant?: BtnVariant }) {
  const styles: Record<BtnVariant, string> = {
    primary: "bg-brand-turquoise text-white hover:bg-brand-turquoise-light border border-brand-turquoise",
    secondary: "bg-white text-brand-dark border border-brand-turquoise/20 hover:border-brand-turquoise/40 hover:bg-brand-turquoise/5",
    danger: "bg-red-50 text-red-700 border border-red-200 hover:bg-red-600 hover:text-white hover:border-red-600",
    ghost: "bg-transparent text-brand-dark/70 border border-transparent hover:text-brand-dark hover:bg-brand-dark/5",
  };
  return (
    <a
      href={href}
      className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-card text-xs font-bold uppercase tracking-wider transition-all duration-200 ${styles[variant]} ${className}`}
      {...rest}
    >
      {children}
    </a>
  );
}

// ============ FIELDS ============
export function Field({
  label,
  hint,
  error,
  required,
  children,
  className = "",
}: {
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="flex items-baseline gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-brand-dark/70 mb-1.5">
        {label}
        {required && <span className="text-brand-turquoise">*</span>}
      </span>
      {children}
      {hint && !error && <span className="block text-[11px] text-brand-taupe mt-1">{hint}</span>}
      {error && <span className="block text-[11px] font-semibold text-red-600 mt-1">{error}</span>}
    </label>
  );
}

const fieldBase =
  "w-full rounded-card border border-brand-turquoise/15 bg-white px-3.5 py-2.5 text-sm text-brand-dark placeholder:text-brand-taupe/70 focus:outline-none focus:border-brand-turquoise focus:ring-2 focus:ring-brand-turquoise/15 transition-all";

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`${fieldBase} ${props.className || ""}`} />;
}

export function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={`${fieldBase} min-h-[96px] leading-relaxed ${props.className || ""}`} />;
}

export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} className={`${fieldBase} pr-8 ${props.className || ""}`} />;
}

export function Checkbox({
  label,
  hint,
  ...rest
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string; hint?: string }) {
  return (
    <label className="flex items-start gap-3 p-3 rounded-card border border-brand-turquoise/10 bg-brand-cream/60 hover:border-brand-turquoise/25 transition-all cursor-pointer">
      <input
        type="checkbox"
        {...rest}
        className="mt-0.5 h-4 w-4 rounded border-brand-turquoise/40 text-brand-turquoise focus:ring-brand-turquoise/30"
      />
      <span>
        <span className="block text-sm font-semibold text-brand-dark">{label}</span>
        {hint && <span className="block text-[11px] text-brand-taupe mt-0.5">{hint}</span>}
      </span>
    </label>
  );
}

// ============ STATUS ============
export function StatusBadge({ status }: { status?: PublishStatus }) {
  const s = status || "published";
  const map: Record<string, { label: string; cls: string }> = {
    published: { label: "Published", cls: "bg-emerald-50 text-emerald-700 border-emerald-200" },
    draft: { label: "Draft", cls: "bg-amber-50 text-amber-700 border-amber-200" },
    archived: { label: "Archived", cls: "bg-brand-cream text-brand-taupe border-brand-taupe/25" },
  };
  const def = map[s];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-bold uppercase tracking-wider ${def.cls}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {def.label}
    </span>
  );
}

// ============ CONFIRM DIALOG ============
export function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = "Delete",
  onConfirm,
  onCancel,
}: {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onCancel]);

  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center p-4 bg-brand-dark/60 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      onClick={onCancel}
    >
      <div
        className="bg-white rounded-card-xl shadow-luxury w-full max-w-md p-6 border border-brand-turquoise/10"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="font-editorial text-xl font-bold text-brand-dark">{title}</h3>
        <p className="text-sm text-brand-dark/60 mt-2 leading-relaxed">{message}</p>
        <div className="flex justify-end gap-2 mt-6">
          <AdminButton variant="secondary" onClick={onCancel}>
            Cancel
          </AdminButton>
          <AdminButton variant="danger" onClick={onConfirm}>
            {confirmLabel}
          </AdminButton>
        </div>
      </div>
    </div>
  );
}

// ============ EMPTY STATE ============
export function EmptyState({ title, hint, action }: { title: string; hint?: string; action?: React.ReactNode }) {
  return (
    <div className="text-center py-14 px-6 bg-white rounded-card-xl border border-dashed border-brand-turquoise/20">
      <p className="font-editorial text-xl font-bold text-brand-dark">{title}</p>
      {hint && <p className="text-sm text-brand-taupe mt-1.5 max-w-md mx-auto">{hint}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
