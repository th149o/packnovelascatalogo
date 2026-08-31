"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Play, Sparkles, CheckCircle2 } from "lucide-react";
import { CatalogNovel } from "@/data/catalog";

interface NovelCardProps {
  novel: CatalogNovel;
  priority?: boolean;
  onSelectNovel?: (novel: CatalogNovel) => void;
}

export function NovelCard({ novel, priority = false, onSelectNovel }: NovelCardProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleClick = () => {
    if (onSelectNovel) {
      onSelectNovel(novel);
    }
  };

  return (
    <div className="group relative flex flex-col focus-within:outline-none">
      {/* Botão/Card Interativo */}
      <button
        type="button"
        onClick={handleClick}
        aria-label={`Novela: ${novel.title}. Clique para saber mais.`}
        className="w-full text-left relative rounded-xl sm:rounded-2xl overflow-hidden bg-[#121218] border border-white/[0.08] group-hover:border-[#EE399E]/50 transition-all duration-300 group-hover:scale-[1.03] group-hover:shadow-xl group-hover:shadow-[#EE399E]/20 group-hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-[#EE399E] focus:ring-offset-2 focus:ring-offset-[#09090B] cursor-pointer"
      >
        {/* Contêiner da Capa Vertical (Proporção 9:16) */}
        <div className="relative w-full aspect-[9/16] overflow-hidden bg-zinc-900/60">
          {/* Shimmer Placeholder enquanto carrega */}
          {!isLoaded && (
            <div className="absolute inset-0 bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 animate-pulse" />
          )}

          <Image
            src={novel.coverUrl}
            alt={novel.title}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            priority={priority}
            onLoad={() => setIsLoaded(true)}
            className={`object-cover transition-all duration-500 group-hover:scale-105 ${
              isLoaded ? "opacity-100" : "opacity-0"
            }`}
          />

          {/* Gradiente sutil na base da capa para legibilidade */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-300" />

          {/* Badge superior "Novela Completa" */}
          <div className="absolute top-2.5 left-2.5 z-10">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] sm:text-xs font-semibold bg-black/60 backdrop-blur-md text-zinc-200 border border-white/10">
              <Sparkles className="w-2.5 h-2.5 text-[#EE399E]" />
              {novel.tag}
            </span>
          </div>

          {/* Ícone de Play centralizado sutil que aparece no hover */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-300 z-10 pointer-events-none">
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#EE399E] to-[#FE2641] flex items-center justify-center shadow-lg shadow-black/50 transform scale-90 group-hover:scale-100 transition-transform duration-300">
              <Play className="w-5 h-5 text-white fill-white ml-0.5" />
            </div>
          </div>
        </div>

        {/* Informações da Novela abaixo da capa */}
        <div className="p-3 sm:p-4 bg-[#121218]/90">
          <h2 className="text-xs sm:text-sm md:text-base font-bold text-white leading-tight line-clamp-2 group-hover:text-pink-300 transition-colors">
            {novel.title}
          </h2>
          <div className="mt-1.5 flex items-center gap-1.5 text-[11px] text-zinc-400">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
            <span className="truncate">Acesso Liberado</span>
          </div>
        </div>
      </button>
    </div>
  );
}

