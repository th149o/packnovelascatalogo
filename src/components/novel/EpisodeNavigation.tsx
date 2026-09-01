"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface EpisodeNavigationProps {
  currentEpisode: number;
  totalEpisodes: number;
  onSelectEpisode: (episodeNum: number) => void;
}

export function EpisodeNavigation({
  currentEpisode,
  totalEpisodes,
  onSelectEpisode,
}: EpisodeNavigationProps) {
  const hasPrevious = currentEpisode > 1;
  const hasNext = currentEpisode < totalEpisodes;

  return (
    <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 py-4 sm:py-5 border-y border-white/[0.08]">
      {/* Botão Episódio Anterior */}
      <button
        type="button"
        onClick={() => hasPrevious && onSelectEpisode(currentEpisode - 1)}
        disabled={!hasPrevious}
        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 sm:py-3.5 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wider text-white bg-[#121218] border border-white/10 hover:border-white/25 hover:bg-[#181822] active:scale-95 disabled:opacity-30 disabled:pointer-events-none transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#EE399E] cursor-pointer"
        aria-label={`Ir para o episódio anterior: ${currentEpisode - 1}`}
      >
        <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-[#EE399E]" />
        <span>Episódio Anterior</span>
        {hasPrevious && (
          <span className="text-[11px] text-zinc-400 font-normal ml-0.5">
            ({currentEpisode - 1})
          </span>
        )}
      </button>

      {/* Indicador Central do Episódio Atual */}
      <div className="flex items-center gap-2 text-center py-1 sm:py-0">
        <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-zinc-300">
          Episódio <span className="text-[#EE399E]">{currentEpisode}</span> de {totalEpisodes}
        </span>
      </div>

      {/* Botão Episódio Seguinte */}
      <button
        type="button"
        onClick={() => hasNext && onSelectEpisode(currentEpisode + 1)}
        disabled={!hasNext}
        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 sm:py-3.5 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wider text-white bg-gradient-to-r from-[#EE399E] to-[#FE2641] hover:from-[#F458B0] hover:to-[#FF4056] shadow-lg shadow-[#EE399E]/20 hover:shadow-[#EE399E]/35 active:scale-95 disabled:opacity-30 disabled:pointer-events-none transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#EE399E] cursor-pointer"
        aria-label={`Ir para o próximo episódio: ${currentEpisode + 1}`}
      >
        <span>Episódio Seguinte</span>
        {hasNext && (
          <span className="text-[11px] text-white/80 font-normal ml-0.5">
            ({currentEpisode + 1})
          </span>
        )}
        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
      </button>
    </div>
  );
}

