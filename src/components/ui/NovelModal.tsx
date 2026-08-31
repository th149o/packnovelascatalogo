"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { X, Play, Star, CheckCircle, ShieldCheck, Film } from "lucide-react";
import { Novel } from "@/data/novels";
import { siteConfig } from "@/data/config";
import { Button } from "./Button";
import { Badge } from "./Badge";

interface NovelModalProps {
  novel: Novel | null;
  onClose: () => void;
}

export const NovelModal: React.FC<NovelModalProps> = ({ novel, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (novel) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [novel, onClose]);

  if (!novel) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto bg-black/80 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="relative w-full max-w-2xl overflow-hidden rounded-3xl bg-surface-card border border-white/15 shadow-2xl transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Fechar detalhes"
          className="absolute top-3.5 right-3.5 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-slate-300 backdrop-blur-md border border-white/10 hover:bg-brand-pink/20 hover:text-white transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-12 gap-0">
          {/* Cover Column */}
          <div className="relative sm:col-span-5 aspect-[9/14] sm:aspect-auto sm:min-h-[380px] w-full bg-surface-elevated overflow-hidden">
            <Image
              src={novel.cover}
              alt={novel.title}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 300px"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface-card via-transparent to-transparent sm:bg-gradient-to-r sm:from-transparent sm:to-surface-card" />
            
            {/* Top Floating Badge */}
            <div className="absolute top-3 left-3 z-10">
              <Badge variant="gradient" size="sm">
                {novel.badge || "Novela Completa"}
              </Badge>
            </div>
          </div>

          {/* Details Column */}
          <div className="sm:col-span-7 p-5 sm:p-6 flex flex-col justify-between">
            <div>
              {/* Genre and Rating */}
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span className="text-xs font-semibold text-brand-pink uppercase tracking-wider">
                  {novel.primaryGenre}
                </span>
                <span className="text-slate-500">•</span>
                <div className="flex items-center text-amber-400 text-xs font-bold gap-1">
                  <Star className="h-3.5 w-3.5 fill-current" />
                  <span>{novel.rating.toFixed(1)} / 5.0</span>
                </div>
              </div>

              {/* Title */}
              <h3
                id="modal-title"
                className="text-xl sm:text-2xl font-black text-white leading-tight mb-2"
              >
                {novel.title}
              </h3>

              {/* Hook text */}
              <p className="text-sm font-medium text-pink-300 italic mb-3">
                &ldquo;{novel.highlightHook}&rdquo;
              </p>

              {/* Stats Strip */}
              <div className="flex items-center gap-3 py-2.5 px-3 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-slate-300 mb-4 flex-wrap">
                <span className="flex items-center gap-1 font-semibold text-white">
                  <Film className="h-3.5 w-3.5 text-brand-pink" /> {novel.episodes} Episódios
                </span>
                <span>•</span>
                <span>Português (Dublado)</span>
                <span>•</span>
                <span>Formato Vertical 9:16</span>
              </div>

              {/* Synopsis */}
              <div className="space-y-1.5 mb-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Sinopse da História:
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-h-36 overflow-y-auto pr-1">
                  {novel.synopsis}
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-5">
                {novel.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] px-2.5 py-0.5 rounded-md bg-white/5 border border-white/10 text-slate-300 font-medium"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Action */}
            <div className="pt-3 border-t border-white/10 space-y-2.5">
              <Button
                href={siteConfig.checkoutUrl}
                fullWidth
                size="md"
                variant="primary"
                icon={<Play className="h-4 w-4 fill-current" />}
              >
                Assistir Essa e Mais 9 Novelas
              </Button>
              <div className="flex items-center justify-center gap-3 text-[11px] text-slate-400">
                <span className="flex items-center gap-1">
                  <CheckCircle className="h-3 w-3 text-emerald-400" /> Acesso Imediato
                </span>
                <span className="flex items-center gap-1">
                  <ShieldCheck className="h-3 w-3 text-emerald-400" /> 7 Dias de Garantia
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

