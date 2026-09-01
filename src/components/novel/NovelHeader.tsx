"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut, Play, Grid, Loader2 } from "lucide-react";

export function NovelHeader() {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
      });
      router.push("/login");
      router.refresh();
    } catch {
      window.location.href = "/login";
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#09090B]/85 backdrop-blur-md border-b border-white/[0.08] transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        {/* Logo / Marca */}
        <Link
          href="/catalogo"
          className="flex items-center gap-2.5 sm:gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EE399E] rounded-xl p-1 -m-1"
          aria-label="Voltar para a página de catálogo"
        >
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-[#EE399E] to-[#FE2641] flex items-center justify-center shadow-md shadow-[#EE399E]/30 flex-shrink-0 group-hover:scale-105 transition-transform duration-200">
            <Play className="w-4 h-4 text-white fill-white ml-0.5" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm sm:text-base font-extrabold tracking-wider text-white uppercase leading-none">
              Novelas Verticais
            </span>
            <span className="text-[10px] text-zinc-400 font-medium tracking-wide">
              Área do Assinante
            </span>
          </div>
        </Link>

        {/* Ações do Header */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Link para o Catálogo */}
          <Link
            href="/catalogo"
            className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-zinc-300 hover:text-white bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 hover:border-white/20 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#EE399E]"
          >
            <Grid className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#EE399E]" />
            <span>CATÁLOGO</span>
          </Link>

          {/* Botão SAIR */}
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-zinc-300 hover:text-white bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 hover:border-white/20 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#EE399E] disabled:opacity-50 cursor-pointer"
            aria-label="Sair da conta"
          >
            {isLoggingOut ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin text-zinc-400" />
                <span className="hidden sm:inline">Saindo...</span>
              </>
            ) : (
              <>
                <LogOut className="w-3.5 h-3.5 text-zinc-400" />
                <span>SAIR</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}

