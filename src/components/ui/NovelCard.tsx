import React from "react";
import Image from "next/image";
import { Play, Sparkles, Star } from "lucide-react";
import { Novel } from "@/data/novels";
import { cn } from "@/lib/utils";

interface NovelCardProps {
  novel: Novel;
  onSelect?: (novel: Novel) => void;
  priority?: boolean;
  featured?: boolean;
}

export const NovelCard: React.FC<NovelCardProps> = ({
  novel,
  onSelect,
  priority = false,
  featured = false,
}) => {
  return (
    <div
      onClick={() => onSelect?.(novel)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect?.(novel);
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`Ver detalhes da novela ${novel.title}`}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl bg-surface-card border border-white/10 transition-all duration-300 cursor-pointer select-none",
        "hover:border-brand-pink/60 hover:shadow-glow-brand hover:-translate-y-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-pink",
        featured ? "md:scale-105 border-brand-pink/40 shadow-glow-sm" : ""
      )}
    >
      {/* Aspect Ratio Container 9:16 */}
      <div className="relative aspect-[9/16] w-full overflow-hidden bg-surface-elevated">
        <Image
          src={novel.cover}
          alt={`Capa oficial da novela ${novel.title}`}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          priority={priority}
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between gap-1.5 z-10">
          {novel.badge && (
            <span className="inline-flex items-center gap-1 rounded-full bg-black/60 px-2.5 py-1 text-[11px] font-bold text-white backdrop-blur-md border border-white/15 shadow-sm">
              {novel.badge}
            </span>
          )}
          <span className="inline-flex items-center gap-1 rounded-full bg-brand-pink/90 px-2 py-0.5 text-[10px] font-extrabold text-white backdrop-blur-md shadow-sm">
            {novel.episodes} EPS
          </span>
        </div>

        {/* Play Button Overlay (Hover/Focus) */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px] opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
          <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-gradient-to-tr from-brand-pink to-brand-red text-white shadow-glow-brand transition-transform duration-300 group-hover:scale-110">
            <Play className="h-5 w-5 sm:h-6 sm:w-6 fill-current translate-x-0.5" />
          </div>
        </div>

        {/* Bottom Gradient Fade */}
        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#09090B] via-[#09090B]/85 to-transparent pointer-events-none" />

        {/* Floating Content at bottom */}
        <div className="absolute inset-x-0 bottom-0 p-3.5 sm:p-4 flex flex-col justify-end z-10">
          <div className="flex items-center gap-1.5 mb-1.5">
            <div className="flex items-center text-amber-400 text-xs font-semibold gap-0.5">
              <Star className="h-3 w-3 fill-current" />
              <span>{novel.rating.toFixed(1)}</span>
            </div>
            <span className="text-[11px] text-slate-400">•</span>
            <span className="text-[11px] font-medium text-slate-300 truncate max-w-[140px]">
              {novel.primaryGenre}
            </span>
          </div>

          <h3 className="text-sm sm:text-base font-bold text-white leading-snug line-clamp-2 drop-shadow-md group-hover:text-pink-200 transition-colors">
            {novel.title}
          </h3>

          <p className="text-[11px] text-slate-400 line-clamp-2 mt-1 hidden sm:block">
            {novel.highlightHook}
          </p>

          <div className="mt-2.5 flex items-center justify-between pt-2 border-t border-white/10">
            <span className="text-[10px] font-semibold tracking-wider text-pink-400 uppercase flex items-center gap-1">
              <Sparkles className="h-2.5 w-2.5" /> Ver Detalhes
            </span>
            <span className="text-[10px] text-slate-400 font-mono">
              Dublado / PT-BR
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

