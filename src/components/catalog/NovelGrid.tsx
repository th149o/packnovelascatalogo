"use client";

import React, { useState } from "react";
import { CATALOG_NOVELS, CatalogNovel } from "@/data/catalog";
import { NovelCard } from "./NovelCard";
import { Film, X, Info } from "lucide-react";

export function NovelGrid() {
  const [toastNovel, setToastNovel] = useState<CatalogNovel | null>(null);

  const handleSelectNovel = (novel: CatalogNovel) => {
    setToastNovel(novel);
    // Auto-dismiss após 4 segundos
    setTimeout(() => {
      setToastNovel((current) => (current?.id === novel.id ? null : current));
    }, 4000);
  };

  return (
    <section className="relative max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 py-6 sm:py-10">
      {/* Título de Seção & Contador */}
      <div className="flex items-center justify-between mb-5 sm:mb-8 pb-3 border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <Film className="w-4 h-4 text-[#EE399E]" />
          <h2 className="text-base sm:text-lg font-bold text-white tracking-wide">
            Todas as Novelas ({CATALOG_NOVELS.length})
          </h2>
        </div>
        <span className="text-xs text-zinc-400 font-medium">
          Qualidade HD • 100% em Português
        </span>
      </div>

      {/* Grid Responsivo de Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3.5 sm:gap-5 lg:gap-6">
        {CATALOG_NOVELS.map((novel, index) => (
          <NovelCard
            key={novel.id}
            novel={novel}
            priority={index < 5}
            onSelectNovel={handleSelectNovel}
          />
        ))}
      </div>

      {/* Toast Notificação Discreta ao Clicar na Novela */}
      {toastNovel && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 max-w-md w-[92%] sm:w-auto px-5 py-3.5 rounded-2xl bg-[#181822]/95 backdrop-blur-xl border border-[#EE399E]/40 text-white shadow-2xl shadow-black/80 flex items-center justify-between gap-4 animate-fadeIn"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#EE399E] to-[#FE2641] flex items-center justify-center flex-shrink-0">
              <Info className="w-4 h-4 text-white" />
            </div>
            <div className="text-left">
              <p className="text-xs sm:text-sm font-semibold text-white">
                Player de Episódios em Breve
              </p>
              <p className="text-[11px] text-zinc-400 line-clamp-1">
                A reprodução de episódios de &ldquo;{toastNovel.title}&rdquo; será liberada nesta área em breve.
              </p>
            </div>
          </div>
          <button
            onClick={() => setToastNovel(null)}
            className="p-1 text-zinc-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Fechar aviso"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </section>
  );
}

