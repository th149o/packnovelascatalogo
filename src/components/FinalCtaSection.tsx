import React from "react";
import Image from "next/image";
import { Play, Sparkles, ShieldCheck, CheckCircle2 } from "lucide-react";
import { siteConfig } from "@/data/config";
import { novelsList } from "@/data/novels";
import { Button } from "./ui/Button";
import { GlowBackground } from "./ui/GlowBackground";

export const FinalCtaSection: React.FC = () => {
  return (
    <section className="relative py-20 sm:py-28 lg:py-36 overflow-hidden">
      {/* Background Poster Wall with Cinematic Vignette */}
      <div className="absolute inset-0 select-none pointer-events-none opacity-20 -z-10 flex items-center justify-center overflow-hidden blur-[1px]">
        <div className="grid grid-cols-5 sm:grid-cols-10 gap-2 w-[120%] -rotate-6 scale-110">
          {[...novelsList, ...novelsList].map((novel, idx) => (
            <div
              key={idx}
              className="relative aspect-[9/16] rounded-lg overflow-hidden border border-white/10"
            >
              <Image
                src={novel.cover}
                alt=""
                fill
                className="object-cover"
                sizes="120px"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Dark Vignette Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#09090B] via-[#09090B]/90 to-[#09090B] -z-10" />

      {/* Ambient Lighting */}
      <GlowBackground color="dual" intensity="high" position="center" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-pink/20 border border-brand-pink/40 text-xs font-bold text-pink-300 uppercase tracking-widest mb-6">
          <Sparkles className="h-3.5 w-3.5 text-brand-pink" />
          Maratone Onde e Quando Quiser
        </div>

        <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.1] mb-6">
          SUA PRÓXIMA HISTÓRIA{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-pink to-brand-red">
            COMEÇA AGORA.
          </span>
        </h2>

        <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-300 leading-relaxed mb-8 sm:mb-10">
          Não perca mais tempo procurando o que assistir ou pagando moedas caras em aplicativos. 
          Garanta agora o seu pack com <strong className="text-white">10 novelas verticais completas</strong> e tenha centenas de episódios gravados na ponta dos seus dedos.
        </p>

        {/* Master CTA Button */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-8">
          <Button
            href={siteConfig.checkoutUrl}
            size="xl"
            variant="primary"
            fullWidth={true}
            className="sm:w-auto sm:min-w-[340px] shadow-glow-brand-lg"
            icon={<Play className="h-5 w-5 fill-current" />}
          >
            QUERO ASSISTIR AGORA
          </Button>
        </div>

        {/* Reassurance Badges */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-slate-400 font-medium">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Acesso Imediato
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Pagamento 100% Seguro
          </span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-emerald-400" /> 7 Dias de Garantia
          </span>
        </div>
      </div>
    </section>
  );
};

