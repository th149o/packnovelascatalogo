"use client";

import React, { useState } from "react";
import { Sparkles, Play, Filter, Flame, Film } from "lucide-react";
import { novelsList, Novel } from "@/data/novels";
import { siteConfig } from "@/data/config";
import { NovelCard } from "./ui/NovelCard";
import { NovelModal } from "./ui/NovelModal";
import { Button } from "./ui/Button";
import { GlowBackground } from "./ui/GlowBackground";

export const CatalogSection: React.FC = () => {
  const [selectedNovel, setSelectedNovel] = useState<Novel | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const categories = [
    { id: "all", label: "Todas as Novelas (10)" },
    { id: "Bilionários", label: "Bilionários" },
    { id: "Vingança", label: "Vingança" },
    { id: "Romance", label: "Romance" },
    { id: "Herdeiras", label: "Herdeiras" },
    { id: "Identidades Secretas", label: "Identidades Secretas" },
  ];

  const filteredNovels = activeFilter === "all"
    ? novelsList
    : novelsList.filter((novel) => novel.tags.includes(activeFilter));

  return (
    <section id="catalogo" className="relative py-16 sm:py-24 lg:py-32 overflow-hidden">
      {/* Ambient Lighting */}
      <GlowBackground color="pink" intensity="low" position="top-left" />
      <GlowBackground color="red" intensity="low" position="top-right" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-pink/10 border border-brand-pink/30 text-xs font-bold text-brand-pink uppercase tracking-widest mb-3">
            <Film className="h-3.5 w-3.5" />
            Catálogo Completo
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight mb-4">
            ESCOLHA A SUA{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-pink to-brand-red">
              PRÓXIMA OBSESSÃO.
            </span>
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-slate-300">
            Todas as 10 produções abaixo já estão gravadas, dubladas e disponíveis completas para você começar a assistir hoje. Clique em qualquer card para ver a sinopse detalhada.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-8 sm:mb-12 scrollbar-none px-1">
          {categories.map((cat) => {
            const isActive = activeFilter === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveFilter(cat.id)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-pink ${
                  isActive
                    ? "bg-gradient-to-r from-brand-pink to-brand-red text-white shadow-glow-sm border border-white/20 scale-105"
                    : "bg-surface-card hover:bg-surface-elevated text-slate-400 hover:text-white border border-white/10"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* 10 Novels Grid (Responsive: 2 cols on mobile, 3 on tablet, 5 on large screen) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-5 lg:gap-6 mb-12 sm:mb-16">
          {filteredNovels.map((novel, index) => (
            <NovelCard
              key={novel.id}
              novel={novel}
              priority={index < 4}
              featured={index === 0}
              onSelect={(n) => setSelectedNovel(n)}
            />
          ))}
        </div>

        {/* Bottom Catalog Callout Card */}
        <div className="relative rounded-3xl overflow-hidden p-6 sm:p-8 lg:p-10 bg-gradient-to-r from-surface-card via-surface-elevated to-surface-card border border-brand-pink/30 shadow-card-elevation text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 uppercase tracking-wider">
              <Sparkles className="h-3.5 w-3.5" /> Acesso Sem Bloqueios
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Gostou das histórias? Desbloqueie todas as 10 de uma só vez.
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Sem precisar comprar moedas ou esperar dias para desbloquear o próximo episódio. O pacote completo é liberado imediatamente.
            </p>
          </div>

          <div className="flex-shrink-0 w-full sm:w-auto">
            <Button
              href={siteConfig.checkoutUrl}
              size="lg"
              variant="primary"
              fullWidth={true}
              className="sm:w-auto sm:min-w-[260px]"
              icon={<Play className="h-4 w-4 fill-current" />}
            >
              Quero o Pack Completo
            </Button>
          </div>
        </div>
      </div>

      {/* Modal for Novel Details */}
      <NovelModal
        novel={selectedNovel}
        onClose={() => setSelectedNovel(null)}
      />
    </section>
  );
};

