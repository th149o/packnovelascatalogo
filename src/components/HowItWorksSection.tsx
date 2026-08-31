import React from "react";
import { ShoppingCart, ShieldCheck, PlayCircle, ArrowRight } from "lucide-react";

export const HowItWorksSection: React.FC = () => {
  const steps = [
    {
      number: "01",
      icon: ShoppingCart,
      title: "FAÇA SEU PEDIDO",
      description: "Clique no botão de inscrição nesta página e seja redirecionado para a página de checkout oficial.",
      badge: "Passo 1",
    },
    {
      number: "02",
      icon: ShieldCheck,
      title: "FINALIZE A COMPRA",
      description: "Realize o pagamento com segurança máxima via PIX ou Cartão de Crédito com desconto especial.",
      badge: "Passo 2",
    },
    {
      number: "03",
      icon: PlayCircle,
      title: "COMECE A ASSISTIR",
      description: "Receba seus dados de acesso imediatamente no seu e-mail e comece a maratonar no mesmo minuto.",
      badge: "Passo 3",
    },
  ];

  return (
    <section className="relative py-16 sm:py-24 bg-surface/40 border-y border-white/[0.06] overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-pink-300 uppercase tracking-widest mb-3">
            Simples e Rápido
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight mb-4">
            3 PASSOS PARA COMEÇAR A{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-pink to-brand-red">
              MARATONAR HOJE.
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300">
            Processo 100% digital, automatizado e com entrega imediata dos seus acessos.
          </p>
        </div>

        {/* 3 Step Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 relative">
          {/* Connecting Line for Desktop */}
          <div className="hidden md:block absolute top-1/2 left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-brand-pink/30 via-brand-red/40 to-brand-pink/30 -translate-y-12 -z-0" />

          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="relative rounded-3xl p-6 sm:p-8 bg-surface-card border border-white/10 hover:border-brand-pink/40 transition-all duration-300 hover:-translate-y-1 flex flex-col items-center text-center z-10"
              >
                {/* Number & Icon Container */}
                <div className="relative mb-6">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-brand-pink to-brand-red text-white shadow-glow-brand">
                    <Icon className="h-8 w-8" />
                  </div>
                  <span className="absolute -top-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full bg-surface-elevated border border-brand-pink text-xs font-black text-white shadow-md">
                    {step.number}
                  </span>
                </div>

                <span className="text-[11px] font-bold tracking-widest text-pink-400 uppercase mb-2">
                  {step.badge}
                </span>

                <h3 className="text-lg sm:text-xl font-black text-white mb-3">
                  {step.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

