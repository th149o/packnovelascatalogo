import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "glass" | "outline" | "ghost";
  size?: "sm" | "md" | "lg" | "xl";
  href?: string;
  glow?: boolean;
  fullWidth?: boolean;
  children: React.ReactNode;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "lg",
  href,
  glow = true,
  fullWidth = false,
  className,
  children,
  icon,
  iconPosition = "right",
  ...props
}) => {
  const sizeClasses = {
    sm: "px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg min-h-[40px]",
    md: "px-5 py-2.5 text-sm sm:text-base font-bold rounded-xl min-h-[46px]",
    lg: "px-7 py-3.5 text-base sm:text-lg font-extrabold rounded-2xl min-h-[52px]",
    xl: "px-8 py-4 sm:py-5 text-lg sm:text-xl font-extrabold rounded-2xl min-h-[60px]",
  };

  const variantClasses = {
    primary:
      "bg-gradient-to-r from-brand-pink to-brand-red text-white hover:from-[#f452ab] hover:to-[#ff3850] active:scale-[0.98] border border-white/20 transition-all duration-300",
    secondary:
      "bg-white/10 hover:bg-white/15 text-white border border-white/15 active:scale-[0.98] transition-all duration-200",
    glass:
      "bg-surface-card/80 backdrop-blur-md hover:bg-surface-elevated/90 text-slate-100 border border-white/10 hover:border-brand-pink/40 active:scale-[0.98] transition-all duration-200",
    outline:
      "border-2 border-brand-pink/60 hover:border-brand-pink text-brand-pink hover:text-white hover:bg-brand-pink/10 active:scale-[0.98] transition-all duration-200",
    ghost:
      "text-slate-300 hover:text-white hover:bg-white/5 active:scale-[0.98] transition-all duration-200",
  };

  const glowClass =
    glow && variant === "primary"
      ? "shadow-glow-brand hover:shadow-glow-brand-lg"
      : "";

  const widthClass = fullWidth ? "w-full" : "w-auto";

  const content = (
    <>
      {icon && iconPosition === "left" && (
        <span className="inline-flex transition-transform duration-200 group-hover:-translate-x-0.5">
          {icon}
        </span>
      )}
      <span className="tracking-wide uppercase font-bold text-center">
        {children}
      </span>
      {icon && iconPosition === "right" && (
        <span className="inline-flex transition-transform duration-200 group-hover:translate-x-1">
          {icon}
        </span>
      )}
    </>
  );

  const baseStyles = cn(
    "group inline-flex items-center justify-center gap-2.5 font-bold cursor-pointer select-none text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-pink focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090B]",
    sizeClasses[size],
    variantClasses[variant],
    glowClass,
    widthClass,
    className
  );

  if (href) {
    return (
      <a href={href} className={baseStyles} role="button">
        {content}
      </a>
    );
  }

  return (
    <button className={baseStyles} {...props}>
      {content}
    </button>
  );
};

