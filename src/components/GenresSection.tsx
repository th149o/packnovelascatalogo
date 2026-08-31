import React from "react";
import { Sparkles, Compass } from "lucide-react";
import { genresList } from "@/data/genres";
import { GlowBackground } from "./ui/GlowBackground";

export const GenresSection: React.FC = () => {
  return (
    <section className="relative py-16 sm:py-24 bg-surface/70 border-t border-white/[0.06] overflow-hidden">
      {/* Ambient Lighting */}
      <GlowBackground color="purple" intensity="low" position="center" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-pink-300 uppercase tracking-widest mb-3">
            <Compass className="h-3.5 w-3.5 text-brand-pink" />
            Variedade de Gêneros
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight mb-4">
            UMA NOVELA PARA CADA{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-pink to-brand-red">
              TIPO DE VÍCIO.
            </span>
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-slate-300">
            Seja você fã de romances arrebatadores com magnatas ou de histórias intensas de vingança onde o traidor é desmascarado, o catálogo tem a história perfeita para hoje à noite.
          </p>
        </div>

        {/* 8 Genre Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {genresList.map((genre) => (
            <div
              key={genre.id}
              className="group relative rounded-2xl p-5 sm:p-6 bg-surface-card/80 backdrop-blur-md border border-white/10 hover:border-brand-pink/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-card-elevation flex flex-col justify-between"
            >
              {/* Card top icon & count */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl sm:text-4xl select-none group-hover:scale-110 transition-transform duration-300">
                    {genre.emoji}
                  </span>
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-300">
                    {genre.count}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-white mb-2 group-hover:text-pink-300 transition-colors">
                  {genre.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {genre.tagline}
                </p>
              </div>

              {/* Bottom Decorative Glow Line */}
              <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between">
                <span className="text-[11px] font-semibold text-pink-400 uppercase tracking-wider flex items-center gap-1">
                  <Sparkles className="h-2.5 w-2.5" /> Episódios Completos
                </span>
                <span className="text-xs text-slate-500 font-mono">9:16 HD</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

