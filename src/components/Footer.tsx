import React from "react";
import { Tv, ShieldCheck, Lock } from "lucide-react";
import { siteConfig } from "@/data/config";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#060608] border-t border-white/10 py-10 sm:py-14 text-slate-400 text-xs sm:text-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-white/[0.06] text-center md:text-left">
          {/* Logo & Tagline */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-tr from-brand-pink to-brand-red text-white">
                <Tv className="h-4 w-4 fill-current" />
              </div>
              <span className="text-base font-black text-white tracking-wider uppercase">
                NOVELAS<span className="text-brand-pink">VERTICAIS</span>
              </span>
            </div>
            <p className="text-xs text-slate-500 max-w-sm">
              O catálogo premium de novelas verticais para maratonar direto no celular.
            </p>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-400">
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
              <Lock className="h-3.5 w-3.5 text-emerald-400" /> Checkout Criptografado
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" /> Garantia de 7 Dias
            </span>
          </div>
        </div>

        {/* Legal & Disclaimers */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 text-center sm:text-left">
          <p>
            © {currentYear} {siteConfig.name}. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-slate-300 transition-colors">Termos de Uso</a>
            <span>•</span>
            <a href="#" className="hover:text-slate-300 transition-colors">Privacidade</a>
            <span>•</span>
            <a href={`mailto:${siteConfig.supportEmail}`} className="hover:text-slate-300 transition-colors">
              Suporte ({siteConfig.supportEmail})
            </a>
          </div>
        </div>

        <div className="mt-4 text-center text-[10px] text-slate-600">
          Aviso: Os resultados e o aproveitamento do entretenimento podem variar. Este site não possui afiliação com plataformas de terceiros.
        </div>
      </div>
    </footer>
  );
};

