"use client";

import React from "react";
import Image from "next/image";
import {
  Play,
  Sparkles,
  Smartphone,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Film,
  Star,
} from "lucide-react";
import { siteConfig } from "@/data/config";
import { novelsList } from "@/data/novels";
import { Button } from "./ui/Button";
import { Badge } from "./ui/Badge";
import { GlowBackground } from "./ui/GlowBackground";

export const HeroSection: React.FC = () => {
  // Hero covers selection: 1 (center hero), 2 (left flank), 3 (right flank), 7 & 5 (background depth)
  const heroNovelCenter = novelsList[0]; // Capa 1
  const heroNovelLeft = novelsList[1]; // Capa 2
  const heroNovelRight = novelsList[2]; // Capa 3
  const heroNovelBackLeft = novelsList[6]; // Capa 7
  const heroNovelBackRight = novelsList[4]; // Capa 5

  return (
    <section className="relative pt-4 pb-16 sm:pb-24 lg:pb-32 overflow-hidden">
      {/* Ambient Glows */}
      <GlowBackground color="dual" intensity="high" position="top-center" />
      <GlowBackground color="purple" intensity="low" position="top-right" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        <div className="flex flex-col items-center text-center">
          {/* Top Pill Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mb-5 sm:mb-6 animate-fadeIn">
            <Badge variant="gradient" size="md">
              <Sparkles className="h-3.5 w-3.5" /> Pack Exclusivo 10 em 1
            </Badge>
            <Badge variant="glass" size="md">
              <Smartphone className="h-3.5 w-3.5 text-brand-pink" /> 100% Formato Vertical
            </Badge>
            <Badge variant="glass" size="md">
              <Zap className="h-3.5 w-3.5 text-amber-400" /> Acesso Imediato
            </Badge>
          </div>

          {/* Main Headline */}
          <h1 className="max-w-4xl text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.08] sm:leading-[1.1] mb-5 sm:mb-6">
            NOVELAS QUE VÃO TE PRENDER DO{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-pink via-[#ff3b5c] to-brand-red drop-shadow-sm">
              PRIMEIRO EPISÓDIO.
            </span>
          </h1>

          {/* Subheadline */}
          <p className="max-w-2xl text-base sm:text-lg md:text-xl text-slate-300 font-normal leading-relaxed mb-7 sm:mb-9">
            Tenha acesso instantâneo a um pacote com{" "}
            <strong className="text-white font-semibold">10 novelas verticais completas</strong> e{" "}
            <strong className="text-pink-300 font-semibold">+480 episódios viciantes</strong> de romance, bilionários, traições e reviravoltas para maratonar direto no seu celular.
          </p>

          {/* Main CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto mb-5">
            <Button
              href={siteConfig.checkoutUrl}
              size="xl"
              variant="primary"
              fullWidth={true}
              className="sm:w-auto sm:min-w-[320px]"
              icon={<Play className="h-5 w-5 fill-current" />}
            >
              QUERO ASSISTIR AGORA
            </Button>
          </div>

          {/* Micro Trust Indicators */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-slate-400 font-medium mb-12 sm:mb-16">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Em Português (Dublado)
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Sem Mensalidade / Pagamento Único
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-emerald-400" /> 7 Dias de Garantia
            </span>
          </div>

          {/* Layered Visual Cover Composition (Cinematic Multi-depth) */}
          <div className="relative w-full max-w-5xl mx-auto mt-2">
            {/* Background Halo */}
            <div className="absolute inset-0 bg-gradient-to-t from-transparent via-brand-pink/20 to-transparent blur-3xl rounded-full -z-10" />

            {/* Desktop Composition */}
            <div className="hidden md:flex items-center justify-center relative min-h-[460px] lg:min-h-[520px] select-none perspective-[1200px]">
              {/* Deep Back Left (Novel 7) */}
              <div className="absolute left-[8%] lg:left-[12%] w-[160px] lg:w-[190px] aspect-[9/16] rounded-2xl overflow-hidden shadow-2xl border border-white/10 opacity-40 blur-[1px] transform -rotate-12 -translate-y-4 scale-90 transition-transform duration-500 hover:opacity-80 hover:blur-0 hover:scale-100 z-0">
                <Image
                  src={heroNovelBackLeft.cover}
                  alt={heroNovelBackLeft.title}
                  fill
                  className="object-cover"
                  sizes="200px"
                />
                <div className="absolute inset-0 bg-black/30" />
              </div>

              {/* Mid Left (Novel 2) */}
              <div className="absolute left-[20%] lg:left-[23%] w-[190px] lg:w-[230px] aspect-[9/16] rounded-2xl overflow-hidden shadow-2xl border border-white/20 transform -rotate-6 translate-y-2 scale-95 transition-all duration-300 hover:scale-105 hover:-rotate-3 hover:border-brand-pink z-10">
                <Image
                  src={heroNovelLeft.cover}
                  alt={heroNovelLeft.title}
                  fill
                  className="object-cover"
                  sizes="250px"
                />
                <div className="absolute top-2 left-2">
                  <span className="px-2 py-0.5 rounded-full bg-black/70 text-[10px] font-bold text-white backdrop-blur-md">
                    {heroNovelLeft.episodes} EPS
                  </span>
                </div>
                <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/90 to-transparent">
                  <p className="text-xs font-bold text-white truncate">{heroNovelLeft.title}</p>
                </div>
              </div>

              {/* Deep Back Right (Novel 5) */}
              <div className="absolute right-[8%] lg:right-[12%] w-[160px] lg:w-[190px] aspect-[9/16] rounded-2xl overflow-hidden shadow-2xl border border-white/10 opacity-40 blur-[1px] transform rotate-12 -translate-y-4 scale-90 transition-transform duration-500 hover:opacity-80 hover:blur-0 hover:scale-100 z-0">
                <Image
                  src={heroNovelBackRight.cover}
                  alt={heroNovelBackRight.title}
                  fill
                  className="object-cover"
                  sizes="200px"
                />
                <div className="absolute inset-0 bg-black/30" />
              </div>

              {/* Mid Right (Novel 3) */}
              <div className="absolute right-[20%] lg:right-[23%] w-[190px] lg:w-[230px] aspect-[9/16] rounded-2xl overflow-hidden shadow-2xl border border-white/20 transform rotate-6 translate-y-2 scale-95 transition-all duration-300 hover:scale-105 hover:rotate-3 hover:border-brand-pink z-10">
                <Image
                  src={heroNovelRight.cover}
                  alt={heroNovelRight.title}
                  fill
                  className="object-cover"
                  sizes="250px"
                />
                <div className="absolute top-2 left-2">
                  <span className="px-2 py-0.5 rounded-full bg-black/70 text-[10px] font-bold text-white backdrop-blur-md">
                    {heroNovelRight.episodes} EPS
                  </span>
                </div>
                <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/90 to-transparent">
                  <p className="text-xs font-bold text-white truncate">{heroNovelRight.title}</p>
                </div>
              </div>

              {/* Center Hero Spotlight (Novel 1) */}
              <div className="relative w-[230px] lg:w-[275px] aspect-[9/16] rounded-3xl overflow-hidden shadow-glow-brand-lg border-2 border-brand-pink/70 transform scale-105 hover:scale-110 transition-all duration-300 z-20 group">
                <Image
                  src={heroNovelCenter.cover}
                  alt={heroNovelCenter.title}
                  fill
                  priority
                  className="object-cover"
                  sizes="300px"
                />
                <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between z-10">
                  <span className="px-2.5 py-1 rounded-full bg-gradient-to-r from-brand-pink to-brand-red text-white text-[11px] font-extrabold shadow-sm">
                    TOP 1 DO CATÁLOGO
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-black/70 text-white text-[10px] font-bold backdrop-blur-md">
                    54 EPS
                  </span>
                </div>

                <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-tr from-brand-pink to-brand-red text-white shadow-glow-brand">
                    <Play className="h-6 w-6 fill-current translate-x-0.5" />
                  </div>
                </div>

                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-[#09090B] via-[#09090B]/80 to-transparent">
                  <div className="flex items-center gap-1 text-amber-400 text-xs font-bold mb-1">
                    <Star className="h-3.5 w-3.5 fill-current" />
                    <span>4.9 (Mais Avaliada)</span>
                  </div>
                  <h3 className="text-sm lg:text-base font-black text-white leading-tight">
                    {heroNovelCenter.title}
                  </h3>
                </div>
              </div>
            </div>

            {/* Mobile Stacked Composition (Ultra Responsive) */}
            <div className="md:hidden flex flex-col items-center">
              <div className="relative w-full max-w-[280px] aspect-[9/16] rounded-2xl overflow-hidden shadow-glow-brand border-2 border-brand-pink/60">
                <Image
                  src={heroNovelCenter.cover}
                  alt={heroNovelCenter.title}
                  fill
                  priority
                  className="object-cover"
                  sizes="280px"
                />
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full bg-gradient-to-r from-brand-pink to-brand-red text-white text-[10px] font-extrabold">
                    🔥 TOP 1
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-black/70 text-white text-[10px] font-bold">
                    {heroNovelCenter.episodes} EPS
                  </span>
                </div>
                <div className="absolute inset-x-0 bottom-0 p-3.5 bg-gradient-to-t from-black via-black/80 to-transparent">
                  <p className="text-xs font-bold text-white leading-snug">
                    {heroNovelCenter.title}
                  </p>
                  <p className="text-[10px] text-pink-300 mt-0.5">
                    Dublado em Português • Vertical
                  </p>
                </div>
              </div>

              {/* Mini thumbnails strip of remaining novels */}
              <div className="w-full mt-4 flex items-center justify-center gap-2 overflow-x-auto py-2 px-1 scrollbar-none">
                {[novelsList[1], novelsList[2], novelsList[3], novelsList[4]].map((item) => (
                  <div
                    key={item.id}
                    className="relative w-16 aspect-[9/16] rounded-lg overflow-hidden border border-white/20 flex-shrink-0 shadow-md"
                  >
                    <Image
                      src={item.cover}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>
                ))}
                <div className="flex-shrink-0 flex items-center justify-center w-16 aspect-[9/16] rounded-lg bg-surface-card border border-white/20 text-center p-1">
                  <span className="text-[10px] font-bold text-brand-pink leading-tight">
                    +6 Novelas
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

