import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "gradient" | "glass" | "outline" | "gold" | "emerald";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = "glass",
  size = "md",
  className,
  children,
  ...props
}) => {
  const sizeClasses = {
    sm: "px-2.5 py-0.5 text-xs font-medium",
    md: "px-3.5 py-1 text-xs sm:text-sm font-semibold tracking-wide",
    lg: "px-4 py-1.5 text-sm sm:text-base font-bold tracking-wider uppercase",
  };

  const variantClasses = {
    gradient:
      "bg-gradient-to-r from-brand-pink to-brand-red text-white shadow-glow-sm border border-white/20",
    glass:
      "bg-white/[0.06] backdrop-blur-md border border-white/10 text-slate-200 shadow-sm",
    outline:
      "border border-brand-pink/40 text-brand-pink bg-brand-pink/5 backdrop-blur-sm",
    gold: "bg-amber-500/10 border border-amber-500/30 text-amber-400 backdrop-blur-sm",
    emerald:
      "bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 backdrop-blur-sm",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full transition-all duration-200 select-none",
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

