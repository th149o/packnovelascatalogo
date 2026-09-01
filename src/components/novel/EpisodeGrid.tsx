"use client";

import React, { useEffect, useRef } from "react";
import { Episode } from "@/lib/episodes";
import { Film, Play } from "lucide-react";

interface EpisodeGridProps {
  episodes: Episode[];
  currentEpisode: number;
  onSelectEpisode: (episodeNum: number) => void;
}

export function EpisodeGrid({
  episodes,
  currentEpisode,
  onSelectEpisode,
}: EpisodeGridProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const selectedButtonRef = useRef<HTMLButtonElement | null>(null);

  // Auto-scroll interno da lista para o episódio selecionado (sem rolar a janela principal)
  useEffect(() => {
    if (selectedButtonRef.current && containerRef.current) {
      selectedButtonRef.current.scrollIntoView({
        block: "nearest",
        inline: "nearest",
        behavior: "smooth",
      });
    }
  }, [currentEpisode]);

  return (
    <section className="w-full mt-6 sm:mt-8">
      {/* Cabeçalho da Seção de Episódios */}
      <div className="flex items-center justify-between mb-4 pb-2.5 border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <Film className="w-4 h-4 text-[#EE399E]" />
          <h3 className="text-sm sm:text-base font-bold text-white tracking-wide uppercase">
            Episódios
          </h3>
        </div>
        <span className="text-xs text-zinc-400 font-medium">
          {episodes.length} episódios disponíveis
        </span>
      </div>

      {/* Grade com altura limitada e scroll vertical interno no Mobile e Desktop */}
      <div className="relative rounded-2xl bg-[#121218]/80 backdrop-blur-md border border-white/10 p-3.5 sm:p-5 shadow-inner">
        <div
          ref={containerRef}
          className="max-h-64 sm:max-h-80 overflow-y-auto pr-1.5 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent overscroll-contain"
        >
          <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2 sm:gap-2.5">
            {episodes.map((ep) => {
              const isSelected = ep.episode === currentEpisode;
              const formattedNum = ep.episode.toString().padStart(2, "0");

              return (
                <button
                  key={ep.episode}
                  ref={isSelected ? selectedButtonRef : null}
                  type="button"
                  onClick={() => onSelectEpisode(ep.episode)}
                  aria-label={`Episódio ${ep.episode}${isSelected ? " (Selecionado)" : ""}`}
                  aria-current={isSelected ? "true" : undefined}
                  className={`relative min-h-[44px] sm:min-h-[48px] rounded-xl font-bold text-xs sm:text-sm flex flex-col items-center justify-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#EE399E] cursor-pointer ${
                    isSelected
                      ? "bg-gradient-to-tr from-[#EE399E] to-[#FE2641] text-white shadow-lg shadow-[#EE399E]/35 scale-105 z-10"
                      : "bg-white/[0.04] text-zinc-300 border border-white/[0.06] hover:border-white/25 hover:bg-white/[0.08] hover:text-white"
                  }`}
                >
                  <span className="font-mono">{formattedNum}</span>
                  {isSelected && (
                    <Play className="w-2.5 h-2.5 fill-white text-white mt-0.5" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

