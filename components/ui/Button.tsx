import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  href?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  fullWidth = false,
  href,
  icon,
  children,
  className,
  ...props
}) => {
  const baseClasses = cn(
    "inline-flex items-center justify-center gap-2 font-bold text-xs uppercase tracking-wider rounded-full transition-all duration-300 btn-premium",
    fullWidth && "w-full",
    {
      "cta-shimmer text-white shadow-sm": variant === "primary",
      "bg-brand-dark text-white hover:bg-brand-dark-light shadow-sm": variant === "secondary",
      "bg-white text-brand-dark border border-brand-turquoise/15 hover:border-brand-turquoise/30 hover:bg-brand-turquoise-50 shadow-soft": variant === "outline",
      "bg-transparent text-brand-turquoise hover:bg-brand-turquoise-50": variant === "ghost",
    },
    {
      "py-2 px-4 text-[11px]": size === "sm",
      "py-3 px-6 text-[12px]": size === "md",
      "py-4 px-8 text-[12px]": size === "lg",
    },
    className
  );

  if (href) {
    return (
      <Link href={href} className={baseClasses}>
        {icon && <span className="shrink-0">{icon}</span>}
        {children}
      </Link>
    );
  }

  return (
    <button className={baseClasses} {...props}>
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </button>
  );
};
