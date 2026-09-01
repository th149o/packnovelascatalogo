import React from "react";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { AUTH_COOKIE_NAME, isValidSession } from "@/lib/auth";
import { getNovelDataBySlug, getAllNovelsWithSlugs } from "@/lib/episodes";
import { NovelHeader } from "@/components/novel/NovelHeader";
import { NovelViewer } from "@/components/novel/NovelViewer";
import { Film, AlertTriangle, ArrowLeft } from "lucide-react";

interface NovelPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({
  params,
}: NovelPageProps): Promise<Metadata> {
  const data = getNovelDataBySlug(params.slug);

  if (!data) {
    return {
      title: "Novela Não Encontrada | Novelas Verticais",
    };
  }

  return {
    title: `${data.novela.title} | Novelas Verticais`,
    description: `Assista a todos os episódios completos de ${data.novela.title} em HD.`,
  };
}

export function generateStaticParams() {
  const allNovels = getAllNovelsWithSlugs();
  return allNovels.map((novel) => ({
    slug: novel.slug,
  }));
}

export default function NovelPage({ params }: NovelPageProps) {
  // 1. Verificação Server-Side de Segurança (Defense-in-Depth)
  const cookieStore = cookies();
  const sessionCookie = cookieStore.get(AUTH_COOKIE_NAME);
  const isAuthenticated = isValidSession(sessionCookie?.value);

  if (!isAuthenticated) {
    redirect("/login");
  }

  // 2. Busca os dados da novela e seus episódios interpretados do disco
  const novelData = getNovelDataBySlug(params.slug);

  // 3. Tratamento para Slug/Novela Inexistente
  if (!novelData) {
    return (
      <div className="min-h-screen flex flex-col bg-[#09090B] text-slate-100 selection:bg-[#EE399E] selection:text-white">
        <NovelHeader />
        <main className="flex-1 flex items-center justify-center p-4 sm:p-6">
          <div className="max-w-md w-full p-8 rounded-2xl bg-[#121218]/80 backdrop-blur-xl border border-white/10 text-center animate-fadeIn">
            <div className="w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-7 h-7 text-red-400" />
            </div>
            <h1 className="text-xl font-bold text-white mb-2">
              Novela não encontrada
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400 mb-6">
              A novela que você tentou acessar não foi localizada no catálogo.
            </p>
            <Link
              href="/catalogo"
              className="inline-flex items-center justify-center gap-2 w-full py-3.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-gradient-to-r from-[#EE399E] to-[#FE2641] hover:from-[#F458B0] hover:to-[#FF4056] shadow-lg shadow-[#EE399E]/25 transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Voltar ao Catálogo</span>
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#09090B] text-slate-100 selection:bg-[#EE399E] selection:text-white relative overflow-x-hidden">
      {/* Luzes de fundo atmosféricas */}
      <div
        className="fixed -top-40 -left-40 w-96 h-96 bg-[#EE399E]/10 rounded-full blur-[140px] pointer-events-none -z-10"
        aria-hidden="true"
      />
      <div
        className="fixed top-1/3 -right-40 w-96 h-96 bg-[#FE2641]/10 rounded-full blur-[140px] pointer-events-none -z-10"
        aria-hidden="true"
      />
      <div
        className="fixed -bottom-40 left-1/3 w-96 h-96 bg-[#7C3AED]/10 rounded-full blur-[140px] pointer-events-none -z-10"
        aria-hidden="true"
      />

      {/* Header Sticky com Acesso ao Catálogo e Logout */}
      <NovelHeader />

      {/* Visualizador da Novela e Player */}
      <main className="flex-1">
        <NovelViewer novelData={novelData} />
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

