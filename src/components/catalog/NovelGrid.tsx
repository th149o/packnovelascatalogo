"use client";

import React from "react";
import { CATALOG_NOVELS } from "@/data/catalog";
import { NovelCard } from "./NovelCard";
import { Film } from "lucide-react";

export function NovelGrid() {
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

      {/* Grid Responsivo de Cards com Links para as Novelas */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3.5 sm:gap-5 lg:gap-6">
        {CATALOG_NOVELS.map((novel, index) => (
          <NovelCard
            key={novel.id}
            novel={novel}
            priority={index < 5}
          />
        ))}
      </div>
    </section>
  );
}
