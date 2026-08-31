"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut, Play, Loader2 } from "lucide-react";

export function CatalogHeader() {
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
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-[#EE399E] to-[#FE2641] flex items-center justify-center shadow-md shadow-[#EE399E]/30 flex-shrink-0">
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
        </div>

        {/* Botão SAIR */}
        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-zinc-300 hover:text-white bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 hover:border-white/20 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#EE399E] focus:ring-offset-2 focus:ring-offset-[#09090B] disabled:opacity-50 cursor-pointer"
          aria-label="Sair da conta"
        >
          {isLoggingOut ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-zinc-400" />
              <span className="hidden sm:inline">Saindo...</span>
            </>
          ) : (
            <>
              <LogOut className="w-4 h-4 text-zinc-400 group-hover:text-white" />
              <span>SAIR</span>
            </>
          )}
        </button>
      </div>
    </header>
  );
}

