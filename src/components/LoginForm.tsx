"use client";

import React, { useState } from "react";
import { Eye, EyeOff, Lock, User, AlertCircle, Loader2, Play } from "lucide-react";

export function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Redirecionamento imediato e definitivo no primeiro clique
        window.location.href = "/catalogo";
      } else {
        setErrorMessage(data.error || "Usuário ou senha incorretos.");
        setIsLoading(false);
      }
    } catch {
      setErrorMessage("Erro de conexão. Tente novamente.");
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Card Glassmorphism de Login */}
      <div className="relative rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-10 bg-[#121218]/80 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/80 overflow-hidden">
        {/* Efeito de iluminação sutil no topo do card */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-64 h-32 bg-gradient-to-b from-[#EE399E]/25 to-transparent blur-2xl pointer-events-none" />

        {/* Cabeçalho do Card */}
        <div className="text-center relative z-10 mb-8">
          {/* Logo / Marca */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 mb-6">
            <div className="w-6 h-6 rounded-md bg-gradient-to-tr from-[#EE399E] to-[#FE2641] flex items-center justify-center shadow-sm shadow-[#EE399E]/40">
              <Play className="w-3.5 h-3.5 text-white fill-white ml-0.5" />
            </div>
            <span className="text-xs sm:text-sm font-bold tracking-wider uppercase text-white">
              Novelas Verticais
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
            Bem-vinda de volta
          </h1>
          <p className="text-sm text-zinc-400 max-w-xs mx-auto">
            Acesse suas novelas e continue de onde parou.
          </p>
        </div>

        {/* Mensagem de Erro */}
        {errorMessage && (
          <div
            role="alert"
            aria-live="polite"
            className="mb-6 p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center gap-3 text-red-300 text-sm animate-fadeIn"
          >
            <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-400" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
          {/* Campo Usuário */}
          <div>
            <label
              htmlFor="username"
              className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2 ml-1"
            >
              Usuário
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-400 group-focus-within:text-[#EE399E] transition-colors">
                <User className="w-5 h-5" />
              </div>
              <input
                id="username"
                name="username"
                type="text"
                required
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Digite seu usuário"
                disabled={isLoading}
                className="w-full pl-11 pr-4 py-3.5 bg-black/40 border border-white/10 rounded-xl text-white placeholder-zinc-500 text-base focus:outline-none focus:border-[#EE399E] focus:ring-2 focus:ring-[#EE399E]/20 transition-all duration-200 disabled:opacity-50"
              />
            </div>
          </div>

          {/* Campo Senha */}
          <div>
            <label
              htmlFor="password"
              className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2 ml-1"
            >
              Senha
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-400 group-focus-within:text-[#EE399E] transition-colors">
                <Lock className="w-5 h-5" />
              </div>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Digite sua senha"
                disabled={isLoading}
                className="w-full pl-11 pr-12 py-3.5 bg-black/40 border border-white/10 rounded-xl text-white placeholder-zinc-500 text-base focus:outline-none focus:border-[#EE399E] focus:ring-2 focus:ring-[#EE399E]/20 transition-all duration-200 disabled:opacity-50"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={0}
                aria-label={showPassword ? "Ocultar senha" : "Ver senha"}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-zinc-400 hover:text-zinc-200 focus:outline-none focus:text-white transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Botão ENTRAR */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 px-6 rounded-xl font-bold text-white text-base tracking-wider uppercase bg-gradient-to-r from-[#EE399E] to-[#FE2641] hover:from-[#F458B0] hover:to-[#FF4056] active:scale-[0.99] transition-all duration-200 shadow-lg shadow-[#EE399E]/25 hover:shadow-xl hover:shadow-[#EE399E]/40 focus:outline-none focus:ring-2 focus:ring-[#EE399E] focus:ring-offset-2 focus:ring-offset-[#09090B] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Acessando...</span>
                </>
              ) : (
                <span>ENTRAR</span>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Nota de rodapé sutil */}
      <p className="text-center text-xs text-zinc-600 mt-6">
        Área exclusiva para clientes • Novelas Verticais
      </p>
    </div>
  );
}
