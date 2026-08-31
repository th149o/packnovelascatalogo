import React from "react";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AUTH_COOKIE_NAME, isValidSession } from "@/lib/auth";
import { CatalogHeader } from "@/components/catalog/CatalogHeader";
import { CatalogHero } from "@/components/catalog/CatalogHero";
import { NovelGrid } from "@/components/catalog/NovelGrid";

export const metadata: Metadata = {
  title: "Catálogo de Novelas | Novelas Verticais",
  description: "Acesse e assista a todas as novelas verticais completas da sua coleção.",
};

export default function CatalogoPage() {
  // Verificação Server-Side de Segurança (Defense-in-Depth)
  const cookieStore = cookies();
  const sessionCookie = cookieStore.get(AUTH_COOKIE_NAME);
  const isAuthenticated = isValidSession(sessionCookie?.value);

  if (!isAuthenticated) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#09090B] text-slate-100 selection:bg-[#EE399E] selection:text-white relative overflow-x-hidden">
      {/* Luzes de fundo atmosféricas */}
      <div
        className="fixed -top-40 -left-40 w-96 h-96 bg-[#EE399E]/10 rounded-full blur-[140px] pointer-events-none -z-10"
        aria-hidden="true"
      />
      <div
        className="fixed top-1/2 -right-40 w-96 h-96 bg-[#FE2641]/10 rounded-full blur-[140px] pointer-events-none -z-10"
        aria-hidden="true"
      />
      <div
        className="fixed -bottom-40 left-1/3 w-96 h-96 bg-[#7C3AED]/10 rounded-full blur-[140px] pointer-events-none -z-10"
        aria-hidden="true"
      />

      {/* Header Sticky com Logout */}
      <CatalogHeader />

      {/* Hero da Área de Membros */}
      <CatalogHero />

      {/* Grid com as 10 Novelas */}
      <main className="flex-1">
        <NovelGrid />
      </main>

      {/* Footer Minimalista */}
      <footer className="w-full py-8 mt-12 border-t border-white/[0.06] bg-[#09090B]/60 text-center text-xs text-zinc-500">
        <div className="max-w-7xl mx-auto px-4">
          <p>© {new Date().getFullYear()} Novelas Verticais • Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
