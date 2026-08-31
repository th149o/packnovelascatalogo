import React from "react";
import Image from "next/image";
import {
  Play,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Lock,
  Sparkles,
  Smartphone,
  Film,
  Award,
} from "lucide-react";
import { siteConfig } from "@/data/config";
import { novelsList } from "@/data/novels";
import { Button } from "./ui/Button";
import { Badge } from "./ui/Badge";
import { GlowBackground } from "./ui/GlowBackground";

export const OfferSection: React.FC = () => {
  const features = [
    "10 Novelas Verticais Completas (Início ao Fim)",
    "+480 Episódios em Alta Resolução",
    "100% em Português (Dublado)",
    "Formato Vertical Nativo 9:16 para Celular",
    "Sem Compra de Moedas ou Bloqueios Diários",
    "Acesso Imediato Liberado Após Confirmação",
    "Assista no Celular, Tablet ou Computador",
    "Garantia Incondicional de 7 Dias",
  ];

  return (
    <section id="checkout" className="relative py-16 sm:py-24 lg:py-32 overflow-hidden">
      {/* Intense Ambient Glows for Offer */}
      <GlowBackground color="dual" intensity="high" position="center" />
      <GlowBackground color="red" intensity="medium" position="bottom-center" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <Badge variant="gradient" size="lg" className="mb-4">
            <Sparkles className="h-4 w-4" /> Oferta Especial de Lançamento
          </Badge>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight mb-4">
            TENHA ACESSO AO{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-pink to-brand-red">
              PACK COMPLETO HOJE.
            </span>
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-slate-300">
            Desbloqueie todo o catálogo com 10 novelas e centenas de episódios por um valor único e sem mensalidades.
          </p>
        </div>

        {/* Master Glassmorphism Offer Card */}
        <div className="relative rounded-3xl overflow-hidden bg-surface-card/95 backdrop-blur-xl border-2 border-brand-pink/60 shadow-glow-brand-lg p-6 sm:p-10 lg:p-12">
          {/* Top Banner Tag */}
          <div className="absolute top-0 right-0 left-0 h-2 bg-gradient-to-r from-brand-pink via-[#ff3b5c] to-brand-red" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left: What's Included */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-black tracking-widest text-brand-pink uppercase">
                  Tudo o que está incluído:
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white">
                  10 Novelas Verticais + Bônus
                </h3>
              </div>

              {/* Checklist */}
              <ul className="space-y-3">
                {features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-200">
                    <div className="flex-shrink-0 mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                    </div>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              {/* Small Covers Reel Preview inside Offer */}
              <div className="pt-4 border-t border-white/10">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">
                  Capas inclusas no pacote:
                </p>
                <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                  {novelsList.map((novel) => (
                    <div
                      key={novel.id}
                      className="relative w-12 aspect-[9/16] rounded-md overflow-hidden flex-shrink-0 border border-white/20 shadow-sm"
                    >
                      <Image
                        src={novel.cover}
                        alt={novel.title}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Pricing Box & CTA */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center text-center p-6 sm:p-8 rounded-2xl bg-surface-elevated/90 border border-white/15 shadow-2xl">
              {/* Discount Badge */}
              <span className="px-3 py-1 rounded-full bg-gradient-to-r from-brand-pink to-brand-red text-white text-xs font-black tracking-wider uppercase mb-4 shadow-sm">
                {siteConfig.pricing.discountBadge}
              </span>

              {/* Original Price */}
              <p className="text-xs sm:text-sm text-slate-400 font-medium">
                De <span className="line-through">R$ {siteConfig.pricing.originalPrice}</span> por apenas:
              </p>

              {/* Installments Big Price */}
              <div className="my-2 flex flex-col items-center">
                <span className="text-xs sm:text-sm text-slate-300 font-semibold">
                  Apenas
                </span>
                <span className="text-3xl sm:text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-pink-100 to-white tracking-tight">
                  {siteConfig.pricing.installments}
                </span>
                <span className="text-xs sm:text-sm text-pink-300 font-bold mt-1">
                  ou {siteConfig.pricing.cashDiscount}
                </span>
              </div>

              <p className="text-[11px] text-slate-400 mb-5">
                Pagamento único • Sem mensalidade • Acesso Imediato
              </p>

              {/* Master Primary CTA */}
              <Button
                href={siteConfig.checkoutUrl}
                size="lg"
                variant="primary"
                fullWidth={true}
                className="text-base sm:text-lg font-black shadow-glow-brand-lg"
                icon={<Play className="h-5 w-5 fill-current" />}
              >
                QUERO COMEÇAR A ASSISTIR
              </Button>

              {/* Security & Guarantees */}
              <div className="mt-5 pt-4 border-t border-white/10 w-full space-y-2 text-[11px] text-slate-400">
                <div className="flex items-center justify-center gap-2 text-emerald-400 font-semibold">
                  <Lock className="h-3.5 w-3.5" /> Compra 100% Segura e Criptografada
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Award className="h-3.5 w-3.5 text-amber-400" /> 7 Dias de Garantia Incondicional
                </div>
                <p className="text-[10px] text-slate-500">
                  Liberação instantânea por PIX ou Cartão de Crédito
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 7-Day Guarantee Banner */}
        <div className="mt-8 rounded-2xl p-4 sm:p-6 bg-white/[0.03] border border-white/10 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <div>
            <h4 className="text-sm sm:text-base font-bold text-white">
              Garantia Incondicional de 7 Dias
            </h4>
            <p className="text-xs text-slate-400 mt-0.5">
              Experimente todas as novelas do pacote. Se por qualquer razão você não amar as histórias, basta solicitar o cancelamento e devolvemos 100% do seu dinheiro sem burocracia.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

