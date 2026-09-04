"use client";

import React from "react";
import Link from "next/link";
import { motion, HTMLMotionProps } from "framer-motion";
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
      "inline-flex items-center justify-center font-medium tracking-wide transition-all duration-300 rounded-sm select-none focus:outline-hidden focus:ring-2 focus:ring-brand-sand/50 disabled:opacity-50 disabled:pointer-events-none";

    const sizeStyles = {
      sm: "text-xs px-3.5 py-1.5 gap-1.5",
      md: "text-sm px-5 py-2.5 gap-2",
      lg: "text-base px-7 py-3.5 gap-2.5",
    }[size];

    const variantStyles = {
      primary:
        "bg-brand-deep text-brand-offwhite hover:bg-brand-espresso shadow-xs border border-brand-deep",
      secondary:
        "bg-brand-cream text-brand-deep hover:bg-brand-beige border border-brand-sand/40",
      outline:
        "bg-transparent text-brand-deep border border-brand-sand hover:border-brand-deep hover:bg-brand-cream/50",
      dark:
        "bg-brand-espresso text-brand-cream border border-brand-sand/30 hover:border-brand-sand hover:bg-brand-deep",
      ghost:
        "bg-transparent text-brand-warm hover:text-brand-deep hover:bg-brand-cream/40",
      whatsapp:
        "bg-[#25D366] text-white hover:bg-[#1EBE5D] shadow-xs border border-transparent",
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
        {...(props as HTMLMotionProps<"button">)}
      >
        {children}
        {icon && <span className="transition-transform duration-300">{icon}</span>}
      </motion.button>
    );
  }
);

Button.displayName = "Button";
