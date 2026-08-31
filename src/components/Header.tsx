"use client";

import React, { useState, useEffect } from "react";
import { Play, Sparkles, Tv } from "lucide-react";
import { siteConfig } from "@/data/config";
import { Button } from "./ui/Button";
import { cn } from "@/lib/utils";

export const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition-all duration-300",
        scrolled
          ? "bg-[#09090B]/85 backdrop-blur-lg border-b border-white/10 shadow-lg shadow-black/40 py-3"
          : "bg-transparent py-4 sm:py-5"
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex items-center justify-between gap-4">
          {/* Logo / Brand Name */}
          <a
            href="#"
            className="flex items-center gap-2.5 group select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-pink rounded-xl p-1"
          >
            <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-brand-pink to-brand-red text-white shadow-glow-sm transition-transform duration-300 group-hover:scale-105">
              <Tv className="h-5 w-5 fill-current" />
            </div>
            <div className="flex flex-col">
              <span className="text-base sm:text-lg font-black tracking-wider text-white uppercase leading-tight flex items-center gap-1">
                NOVELAS<span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-pink to-brand-red">VERTICAIS</span>
              </span>
              <span className="text-[10px] text-slate-400 font-semibold tracking-widest uppercase">
                Pack Completo 10 em 1
              </span>
            </div>
          </a>

          {/* Center Badge (Desktop only) */}
          <div className="hidden md:flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-medium text-slate-300">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>Acesso Imediato ao Catálogo</span>
            <span className="text-slate-500">•</span>
            <span className="text-pink-400 font-semibold">10 Novelas Completas</span>
          </div>

          {/* Quick CTA */}
          <div className="flex items-center gap-3">
            <Button
              href={siteConfig.checkoutUrl}
              size="sm"
              variant="primary"
              className="text-xs sm:text-sm font-extrabold px-4 sm:px-5 py-2"
              icon={<Play className="h-3.5 w-3.5 fill-current" />}
            >
              Quero Assistir
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

