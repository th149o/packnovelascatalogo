import React from "react";
import type { Metadata } from "next";
import { LoginForm } from "@/components/LoginForm";

export const metadata: Metadata = {
  title: "Login | Novelas Verticais",
  description: "Acesse sua conta para assistir ao catálogo completo de novelas verticais.",
};

export default function LoginPage() {
  return (
    <main className="min-h-screen relative flex items-center justify-center px-4 py-12 bg-[#09090B] overflow-hidden">
      {/* Luzes de fundo atmosféricas (Glow & Ambience) */}
      <div
        className="absolute top-1/4 -left-32 w-96 h-96 bg-[#EE399E]/15 rounded-full blur-[120px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/4 -right-32 w-96 h-96 bg-[#FE2641]/15 rounded-full blur-[120px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -top-20 right-1/3 w-72 h-72 bg-[#7C3AED]/10 rounded-full blur-[100px] pointer-events-none"
        aria-hidden="true"
      />

      {/* Conteúdo Central */}
      <div className="relative z-10 w-full">
        <LoginForm />
      </div>
    </main>
  );
}

