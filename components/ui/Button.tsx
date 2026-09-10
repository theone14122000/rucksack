"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "dark" | "ghost" | "whatsapp";
  size?: "sm" | "md" | "lg";
  href?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  fullWidth?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      href,
      icon,
      children,
      className,
      fullWidth = false,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium tracking-wide transition-all duration-300 rounded-sm select-none focus:outline-hidden focus:ring-2 focus:ring-brand-brown/30 btn-premium disabled:opacity-50 disabled:pointer-events-none";

    const sizeStyles = {
      sm: "text-xs px-4 py-2 gap-1.5",
      md: "text-sm px-5 py-2.5 gap-2",
      lg: "text-sm px-7 py-3.5 gap-2.5",
    }[size];

    const variantStyles = {
      primary:
        "bg-brand-brown text-brand-cream hover:bg-brand-brown-dark shadow-sm border border-brand-brown-dark/20",
      secondary:
        "bg-brand-cream text-brand-black hover:bg-white border border-brand-brown/15",
      outline:
        "bg-transparent text-brand-black border border-brand-brown/25 hover:border-brand-brown hover:bg-brand-brown/5",
      dark:
        "bg-brand-black text-brand-cream border border-white/10 hover:border-white/20",
      ghost:
        "bg-transparent text-brand-brown hover:text-brand-brown-dark hover:bg-brand-brown/5",
      whatsapp:
        "bg-[#25D366] text-white hover:bg-[#1EBE5D] shadow-sm border border-transparent",
    }[variant];

    const combinedClasses = cn(
      baseStyles,
      sizeStyles,
      variantStyles,
      fullWidth && "w-full",
      className
    );

    if (href) {
      return (
        <Link href={href} className={combinedClasses}>
          {children}
          {icon && <span className="transition-transform duration-300 group-hover:translate-x-0.5">{icon}</span>}
        </Link>
      );
    }

    return (
      <motion.button
        ref={ref}
        whileHover={{ y: -1 }}
        whileTap={{ scale: 0.98 }}
        className={combinedClasses}
        disabled={disabled}
        {...(props as React.ComponentProps<typeof motion.button>)}
      >
        {children}
        {icon && <span className="transition-transform duration-300">{icon}</span>}
      </motion.button>
    );
  }
);

Button.displayName = "Button";
