import React from "react";
import Image from "next/image";
import { Sparkles } from "lucide-react";
import { CATALOG_NOVELS } from "@/data/catalog";

export function CatalogHero() {
  // Capas selecionadas para o background desfocado atmosférico
  const backgroundCovers = CATALOG_NOVELS.slice(0, 4);

  return (
    <section className="relative pt-6 pb-8 sm:pt-10 sm:pb-12 overflow-hidden border-b border-white/[0.04]">
      {/* Background Decorativo com capas desfocadas para profundidade visual */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden flex items-center justify-center gap-6 select-none -z-10"
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#09090B] via-[#09090B]/85 to-[#09090B] z-10" />
        <div className="flex gap-4 sm:gap-8 blur-2xl scale-110 translate-y-4">
          {backgroundCovers.map((novel, index) => (
            <div
              key={index}
              className="relative w-28 sm:w-44 aspect-[9/16] rounded-xl overflow-hidden"
            >
              <Image
                src={novel.coverUrl}
                alt=""
                fill
                sizes="(max-width: 640px) 112px, 176px"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Luzes / Glows de fundo */}
      <div
        className="absolute -top-10 left-1/2 -translate-x-1/2 w-[500px] h-48 bg-gradient-to-r from-[#EE399E]/20 via-[#FE2641]/15 to-transparent rounded-full blur-3xl pointer-events-none -z-10"
        aria-hidden="true"
      />

      {/* Conteúdo Principal do Hero */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.05] border border-white/10 mb-4 backdrop-blur-sm">
          <Sparkles className="w-3.5 h-3.5 text-[#EE399E]" />
          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
            Catálogo Exclusivo
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-3">
          SUAS{" "}
          <span className="bg-gradient-to-r from-[#EE399E] to-[#FE2641] bg-clip-text text-transparent">
            NOVELAS
          </span>
        </h1>

        <p className="text-sm sm:text-base text-zinc-400 max-w-lg mx-auto">
          Escolha uma história e comece a assistir. Todas as 10 novelas completas disponíveis para você maratonar no celular.
        </p>
      </div>
    </section>
  );
}

