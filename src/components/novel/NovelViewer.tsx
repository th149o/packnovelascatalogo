"use client";

import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, Sparkles, AlertCircle, RotateCcw } from "lucide-react";
import { NovelWithEpisodes } from "@/lib/episodes";
import { NovelPlayer } from "./NovelPlayer";
import { EpisodeNavigation } from "./EpisodeNavigation";
import { EpisodeGrid } from "./EpisodeGrid";

interface NovelViewerProps {
  novelData: NovelWithEpisodes;
}

export function NovelViewer({ novelData }: NovelViewerProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Flag para identificar se a troca de episódio veio de uma interação do usuário (clique)
  const [shouldAutoPlay, setShouldAutoPlay] = useState(false);

  // Lê o episódio a partir da URL como fonte primária de verdade
  const rawParam = searchParams.get("episodio");
  const parsedEpisode = rawParam ? parseInt(rawParam, 10) : 1;
  const currentEpisodeNum = isNaN(parsedEpisode) || parsedEpisode < 1 ? 1 : parsedEpisode;

  // Atualiza a URL sem recarregar a página caso não exista query param inicialmente
  useEffect(() => {
    if (!rawParam && novelData.episodes.length > 0) {
      router.replace(`/novela/${novelData.slug}?episodio=1`, { scroll: false });
    }
  }, [rawParam, novelData.slug, novelData.episodes.length, router]);

  // Função para mudar de episódio disparada exclusivamente por interação do usuário (clique)
  const handleSelectEpisode = useCallback(
    (episodeNum: number) => {
      // Registra a intenção de iniciar a reprodução automaticamente após o clique do usuário
      setShouldAutoPlay(true);
      router.push(`/novela/${novelData.slug}?episodio=${episodeNum}`, {
        scroll: false,
      });
    },
    [router, novelData.slug]
  );

  // Busca o episódio atual na lista
  const currentEpisode = novelData.episodes.find(
    (ep) => ep.episode === currentEpisodeNum
  );

  return (
    <div className="w-full max-w-5xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8">
      {/* Botão Voltar para o Catálogo */}
      <div className="mb-4 sm:mb-6">
        <Link
          href="/catalogo"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold text-zinc-400 hover:text-white hover:bg-white/[0.06] transition-colors group focus:outline-none focus:ring-2 focus:ring-[#EE399E]"
        >
          <ChevronLeft className="w-4 h-4 text-[#EE399E] group-hover:-translate-x-0.5 transition-transform" />
          <span>Voltar para o catálogo</span>
        </Link>
      </div>

      {/* Informações da Novela (Capa + Nome) */}
      <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6 p-3 sm:p-4 rounded-2xl bg-[#121218]/60 backdrop-blur-md border border-white/[0.08]">
        <div className="relative w-12 sm:w-16 aspect-[9/16] rounded-lg overflow-hidden flex-shrink-0 bg-zinc-900 border border-white/10 shadow-md">
          <Image
            src={novelData.novela.coverUrl}
            alt={novelData.novela.title}
            fill
            sizes="64px"
            className="object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] sm:text-xs font-semibold bg-[#EE399E]/10 text-pink-300 border border-[#EE399E]/20 mb-1">
            <Sparkles className="w-2.5 h-2.5 text-[#EE399E]" />
            <span>Novela Completa</span>
          </div>
          <h1 className="text-base sm:text-xl md:text-2xl font-extrabold text-white leading-tight truncate">
            {novelData.novela.title}
          </h1>
          <p className="text-[11px] sm:text-xs text-zinc-400 mt-0.5">
            {novelData.totalEpisodes} episódios • Qualidade HD
          </p>
        </div>
      </div>

      {/* Player de Vídeo ou Tratamento de Episódio Não Encontrado */}
      {currentEpisode ? (
        <div className="space-y-3 sm:space-y-4">
          <NovelPlayer
            videoUrl={currentEpisode.url}
            episodeNumber={currentEpisode.episode}
            novelTitle={novelData.novela.title}
            autoPlay={shouldAutoPlay}
          />

          {/* Título do Episódio Atual */}
          <div className="flex items-center justify-between px-1">
            <div>
              <h2 className="text-lg sm:text-2xl font-extrabold text-white">
                Episódio {currentEpisode.episode}
              </h2>
              <p className="text-xs text-zinc-400">
                {novelData.novela.title}
              </p>
            </div>
          </div>

          {/* Navegação Anterior / Próximo */}
          <EpisodeNavigation
            currentEpisode={currentEpisode.episode}
            totalEpisodes={novelData.totalEpisodes}
            onSelectEpisode={handleSelectEpisode}
          />

          {/* Grade de Seleção de Episódios */}
          <EpisodeGrid
            episodes={novelData.episodes}
            currentEpisode={currentEpisode.episode}
            onSelectEpisode={handleSelectEpisode}
          />
        </div>
      ) : (
        /* Caso o usuário digite um episódio inexistente (ex: ?episodio=999) */
        <div className="p-8 sm:p-12 rounded-2xl bg-[#121218]/80 backdrop-blur-md border border-white/10 text-center flex flex-col items-center justify-center my-8 animate-fadeIn">
          <AlertCircle className="w-12 h-12 text-[#EE399E] mb-3" />
          <h2 className="text-lg sm:text-xl font-bold text-white mb-2">
            Episódio {currentEpisodeNum} não encontrado
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-md mb-6">
            Esta novela possui {novelData.totalEpisodes} episódios disponíveis. Selecione um episódio válido para começar a assistir.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => handleSelectEpisode(1)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-gradient-to-r from-[#EE399E] to-[#FE2641] hover:scale-105 transition-transform"
            >
              <RotateCcw className="w-4 h-4" />
              Ir para o Episódio 1
            </button>
            <Link
              href="/catalogo"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider text-zinc-300 bg-white/10 hover:bg-white/15 transition-colors"
            >
              Voltar ao Catálogo
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
