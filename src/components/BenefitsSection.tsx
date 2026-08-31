import React from "react";
import { Zap, Smartphone, Layers, Flame, CheckCircle } from "lucide-react";
import { GlowBackground } from "./ui/GlowBackground";

export const BenefitsSection: React.FC = () => {
  const benefits = [
    {
      icon: Zap,
      number: "01",
      title: "ACESSO IMEDIATO",
      description:
        "Assim que seu pedido for confirmado, você recebe instantaneamente por e-mail os dados de acesso para começar a maratonar no mesmo minuto, sem esperas.",
      highlight: "Liberação 24/7",
    },
    {
      icon: Smartphone,
      number: "02",
      title: "ASSISTA PELO CELULAR",
      description:
        "Produzidas no formato nativo 9:16 para smartphones. Sem cortes, sem barras pretas e na melhor qualidade visual para assistir no sofá, na cama ou no trânsito.",
      highlight: "Formato Vertical 9:16",
    },
    {
      icon: Layers,
      number: "03",
      title: "TUDO ORGANIZADO",
      description:
        "Todas as 10 novelas e seus +480 episódios estão catalogados em ordem sequencial. Pause e continue exatamente de onde parou de forma fluida e sem perder o fio da meada.",
      highlight: "Navegação Sem Atrito",
    },
    {
      icon: Flame,
      number: "04",
      title: "HISTÓRIAS PARA MARATONAR",
      description:
        "Sem necessidade de comprar moedinhas para ver o próximo capítulo ou esperar 24h para desbloquear cenas. O catálogo completo está 100% liberado.",
      highlight: "Sem Bloqueios de Moedas",
    },
  ];

  return (
    <section className="relative py-16 sm:py-24 lg:py-32 overflow-hidden">
      {/* Ambient Glow */}
      <GlowBackground color="dual" intensity="low" position="top-center" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-pink/10 border border-brand-pink/30 text-xs font-bold text-brand-pink uppercase tracking-widest mb-3">
            <Smartphone className="h-3.5 w-3.5" />
            Vantagens do Pacote
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight mb-4">
            A MELHOR EXPERIÊNCIA DE{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-pink to-brand-red">
              STREAMING NO CELULAR.
            </span>
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-slate-300">
            Esqueça aplicativos cheios de anúncios invasivos ou que cobram fortunas para liberar um único capítulo. Veja por que este pack é a melhor escolha.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 lg:gap-8">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <div
                key={benefit.title}
                className="group relative rounded-3xl p-6 sm:p-8 bg-surface-card/90 backdrop-blur-md border border-white/10 hover:border-brand-pink/50 transition-all duration-300 hover:shadow-card-elevation flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-brand-pink/20 to-brand-red/20 border border-brand-pink/30 text-brand-pink group-hover:scale-105 transition-transform duration-300">
                      <Icon className="h-7 w-7" />
                    </div>
                    <span className="text-2xl sm:text-3xl font-black text-slate-700 select-none group-hover:text-pink-500/30 transition-colors">
                      {benefit.number}
                    </span>
                  </div>

                  <span className="inline-block text-xs font-bold text-pink-400 uppercase tracking-wider mb-2">
                    {benefit.highlight}
                  </span>

                  <h3 className="text-xl sm:text-2xl font-black text-white mb-3">
                    {benefit.title}
                  </h3>

                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center gap-2 text-xs font-semibold text-emerald-400">
                  <CheckCircle className="h-4 w-4" /> 100% Garantido no seu acesso
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

