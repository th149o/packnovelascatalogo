import React from "react";
import Image from "next/image";
import { Sparkles, Flame, Heart, Zap, Crown, EyeOff } from "lucide-react";
import { novelsList } from "@/data/novels";

export const TransitionSection: React.FC = () => {
  const marqueeItems = [
    { text: "ROMANCE PROIBIDO", icon: Heart },
    { text: "BILIONÁRIOS PODEROSOS", icon: Crown },
    { text: "VINGANÇA CALCULADA", icon: Flame },
    { text: "IDENTIDADES SECRETAS", icon: EyeOff },
    { text: "REVIRAVOLTAS ELETRIZANTES", icon: Zap },
    { text: "CASAMENTOS INESPERADOS", icon: Sparkles },
  ];

  return (
    <section className="relative py-12 sm:py-20 bg-surface/50 border-y border-white/[0.06] overflow-hidden">
      {/* Background Subtle Cover Strip with Dark Overlay */}
      <div className="absolute inset-0 opacity-[0.07] pointer-events-none overflow-hidden flex items-center justify-around gap-4 blur-[1px]">
        {novelsList.slice(0, 8).map((novel) => (
          <div
            key={novel.id}
            className="relative w-40 aspect-[9/16] flex-shrink-0 rounded-xl overflow-hidden grayscale"
          >
            <Image
              src={novel.cover}
              alt=""
              fill
              className="object-cover"
              sizes="160px"
            />
          </div>
        ))}
      </div>

      {/* Marquee Ticker */}
      <div className="relative w-full overflow-hidden mb-10 py-3 bg-gradient-to-r from-brand-pink/10 via-brand-red/10 to-brand-pink/10 border-y border-brand-pink/20">
        <div className="flex w-[200%] animate-marquee select-none whitespace-nowrap">
          {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="flex items-center gap-3 mx-4 sm:mx-6 text-xs sm:text-sm font-black tracking-widest text-slate-200 uppercase"
              >
                <Icon className="h-4 w-4 text-brand-pink fill-brand-pink/20" />
                <span>{item.text}</span>
                <span className="text-pink-500/50">✦</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl relative z-10 text-center">
        {/* Section Tag */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-pink-300 uppercase tracking-widest mb-4">
          <Sparkles className="h-3.5 w-3.5 text-brand-pink" />
          O Novo Jeito de Assistir
        </div>

        {/* Section Headline */}
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight mb-5">
          UMA HISTÓRIA PUXA A OUTRA.
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-pink to-brand-red">
            VOCÊ NÃO VAI CONSEGUIR PARAR.
          </span>
        </h2>

        {/* Descriptive Text */}
        <p className="max-w-3xl mx-auto text-sm sm:text-base md:text-lg text-slate-300 leading-relaxed">
          Cada novela foi escrita e produzida em episódios rápidos de 1 a 2 minutos, sem enrolação. 
          Quando um episódio termina, a reviravolta é tão chocante que é impossível não dar o play no próximo. 
          São tramas repletas de <strong className="text-white">romance</strong>, <strong className="text-white">segredos</strong>, <strong className="text-white">traições</strong>, <strong className="text-white">paixões</strong> e <strong className="text-white">revelações</strong> prontas para você maratonar.
        </p>

        {/* 4 Quick Stat Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-8 sm:mt-10 max-w-3xl mx-auto">
          <div className="p-3.5 rounded-2xl bg-surface-card/90 border border-white/10 backdrop-blur-md">
            <p className="text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-brand-pink to-brand-red">
              10
            </p>
            <p className="text-xs text-slate-400 font-medium">Novelas no Pack</p>
          </div>
          <div className="p-3.5 rounded-2xl bg-surface-card/90 border border-white/10 backdrop-blur-md">
            <p className="text-xl sm:text-2xl font-black text-white">
              +480
            </p>
            <p className="text-xs text-slate-400 font-medium">Episódios Totais</p>
          </div>
          <div className="p-3.5 rounded-2xl bg-surface-card/90 border border-white/10 backdrop-blur-md">
            <p className="text-xl sm:text-2xl font-black text-white">
              9:16
            </p>
            <p className="text-xs text-slate-400 font-medium">Formato Vertical</p>
          </div>
          <div className="p-3.5 rounded-2xl bg-surface-card/90 border border-white/10 backdrop-blur-md">
            <p className="text-xl sm:text-2xl font-black text-emerald-400">
              100%
            </p>
            <p className="text-xs text-slate-400 font-medium">Em Português</p>
          </div>
        </div>
      </div>
    </section>
  );
};

