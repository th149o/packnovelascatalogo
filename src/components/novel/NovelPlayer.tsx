"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Hls from "hls.js";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  RotateCcw,
  Loader2,
  AlertTriangle,
} from "lucide-react";

interface NovelPlayerProps {
  videoUrl: string;
  episodeNumber: number;
  novelTitle: string;
  autoPlay?: boolean;
}

export function NovelPlayer({
  videoUrl,
  episodeNumber,
  novelTitle,
  autoPlay = false,
}: NovelPlayerProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const hlsRef = useRef<Hls | null>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const sessionIdRef = useRef<number>(0);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [buffered, setBuffered] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [showControls, setShowControls] = useState(true);

  // Inicialização e carregamento do stream HLS (.m3u8) com controle de autoplay e race conditions
  const loadSource = useCallback(() => {
    const video = videoRef.current;
    if (!video || !videoUrl) return;

    // Incrementa a versão da sessão para invalidar callbacks de episódios anteriores (evita race conditions)
    const currentSession = ++sessionIdRef.current;

    setIsLoading(true);
    setHasError(false);
    setCurrentTime(0);

    // Destrói com segurança qualquer instância HLS anterior antes de iniciar o novo stream
    if (hlsRef.current) {
      hlsRef.current.destroy();
      hlsRef.current = null;
    }

    // Função interna para iniciar a reprodução automaticamente após o stream estar pronto
    const attemptPlay = async () => {
      const vid = videoRef.current;
      if (!vid || sessionIdRef.current !== currentSession) return;

      if (autoPlay) {
        try {
          const playPromise = vid.play();
          if (playPromise !== undefined) {
            await playPromise;
            if (sessionIdRef.current === currentSession) {
              setIsPlaying(true);
            }
          }
        } catch (err: unknown) {
          // Se o navegador bloquear o autoplay por políticas de mídia, mantém pausado sem erro visível
          if (sessionIdRef.current === currentSession) {
            setIsPlaying(false);
          }
        }
      }
    };

    if (Hls.isSupported()) {
      const hls = new Hls({
        enableWorker: true,
        lowLatencyMode: false,
        backBufferLength: 90,
      });

      hlsRef.current = hls;
      hls.loadSource(videoUrl);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        if (sessionIdRef.current !== currentSession) return;
        setIsLoading(false);
        attemptPlay();
      });

      hls.on(Hls.Events.ERROR, (_, data) => {
        if (sessionIdRef.current !== currentSession) return;
        if (data.fatal) {
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              hls.startLoad();
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              hls.recoverMediaError();
              break;
            default:
              hls.destroy();
              setHasError(true);
              setIsLoading(false);
              break;
          }
        }
      });
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      // Suporte nativo ao HLS (Safari no iOS e macOS)
      video.src = videoUrl;

      const handleLoadedMetadata = () => {
        if (sessionIdRef.current !== currentSession) return;
        setIsLoading(false);
        attemptPlay();
        video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      };

      const handleError = () => {
        if (sessionIdRef.current !== currentSession) return;
        setHasError(true);
        setIsLoading(false);
        video.removeEventListener("error", handleError);
      };

      video.addEventListener("loadedmetadata", handleLoadedMetadata);
      video.addEventListener("error", handleError);
    } else {
      setHasError(true);
      setIsLoading(false);
    }
  }, [videoUrl, autoPlay]);

  useEffect(() => {
    loadSource();

    return () => {
      sessionIdRef.current++;
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, [loadSource]);

  // Controles de Play / Pause
  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  // Controles de Volume / Mudo
  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isMuted) {
      video.muted = false;
      setIsMuted(false);
      video.volume = volume || 0.5;
    } else {
      video.muted = true;
      setIsMuted(true);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVol = parseFloat(e.target.value);
    const video = videoRef.current;
    if (!video) return;

    video.volume = newVol;
    setVolume(newVol);
    setIsMuted(newVol === 0);
    video.muted = newVol === 0;
  };

  // Barra de progresso / Seek
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    const video = videoRef.current;
    if (!video) return;

    video.currentTime = newTime;
    setCurrentTime(newTime);
  };

  // Fullscreen
  const toggleFullscreen = () => {
    const container = containerRef.current;
    if (!container) return;

    if (!document.fullscreenElement) {
      container.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  // Ocultar controles automaticamente após inatividade
  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    if (isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    }
  };

  // Formatação de tempo (MM:SS)
  const formatTime = (seconds: number) => {
    if (isNaN(seconds) || seconds < 0) return "00:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="w-full">
      {/* Contêiner do Player */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => isPlaying && setShowControls(false)}
        className="relative w-full aspect-video bg-black rounded-xl sm:rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/90 group select-none"
      >
        {/* Elemento de Vídeo */}
        <video
          ref={videoRef}
          playsInline
          controlsList="nodownload"
          disablePictureInPicture
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onTimeUpdate={() => {
            if (videoRef.current) {
              setCurrentTime(videoRef.current.currentTime);
              // Cálculo de buffer
              const buf = videoRef.current.buffered;
              if (buf.length > 0 && videoRef.current.duration > 0) {
                setBuffered((buf.end(buf.length - 1) / videoRef.current.duration) * 100);
              }
            }
          }}
          onDurationChange={() => {
            if (videoRef.current) {
              setDuration(videoRef.current.duration);
            }
          }}
          onWaiting={() => setIsLoading(true)}
          onPlaying={() => {
            setIsLoading(false);
            setIsPlaying(true);
          }}
          onClick={togglePlay}
          className="w-full h-full object-contain cursor-pointer"
        />

        {/* Loading Spinner */}
        {isLoading && !hasError && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm pointer-events-none z-20">
            <div className="flex flex-col items-center gap-2.5">
              <Loader2 className="w-10 h-10 text-[#EE399E] animate-spin" />
              <span className="text-xs font-semibold tracking-wider uppercase text-zinc-300">
                Carregando vídeo...
              </span>
            </div>
          </div>
        )}

        {/* Mensagem de Erro com Botão de Tentar Novamente */}
        {hasError && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/85 backdrop-blur-md p-6 text-center z-30">
            <AlertTriangle className="w-12 h-12 text-[#FE2641] mb-3" />
            <h3 className="text-base sm:text-lg font-bold text-white mb-1">
              Não foi possível carregar este episódio
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-sm mb-5">
              Verifique sua conexão ou tente recarregar o vídeo.
            </p>
            <button
              onClick={loadSource}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-gradient-to-r from-[#EE399E] to-[#FE2641] hover:scale-105 transition-transform"
            >
              <RotateCcw className="w-4 h-4" />
              Tentar Novamente
            </button>
          </div>
        )}

        {/* Botão Central de Play (quando pausado) */}
        {!isPlaying && !isLoading && !hasError && (
          <button
            onClick={togglePlay}
            aria-label="Reproduzir vídeo"
            className="absolute inset-0 m-auto w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-[#EE399E] to-[#FE2641] flex items-center justify-center text-white shadow-xl shadow-black/80 hover:scale-110 active:scale-95 transition-all duration-200 z-20"
          >
            <Play className="w-8 h-8 sm:w-10 sm:h-10 fill-white ml-1 text-white" />
          </button>
        )}

        {/* Barra de Controles Inferior */}
        <div
          className={`absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent p-3 sm:p-4 z-20 transition-opacity duration-300 ${
            showControls || !isPlaying ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          {/* Timeline / Progress Scrubber */}
          <div className="relative w-full flex items-center mb-2 sm:mb-3 group/slider">
            {/* Barra de Buffer */}
            <div
              className="absolute h-1 bg-white/20 rounded-full pointer-events-none"
              style={{ width: `${buffered}%` }}
            />
            {/* Barra de Progresso Real */}
            <div
              className="absolute h-1 bg-gradient-to-r from-[#EE399E] to-[#FE2641] rounded-full pointer-events-none"
              style={{
                width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%`,
              }}
            />
            <input
              type="range"
              min={0}
              max={duration || 100}
              step={0.1}
              value={currentTime}
              onChange={handleSeek}
              aria-label="Progresso do vídeo"
              className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer focus:outline-none accent-[#EE399E]"
            />
          </div>

          {/* Botões e Informações de Reprodução */}
          <div className="flex items-center justify-between gap-2 text-white">
            {/* Esquerda: Play/Pause, Volume, Tempo */}
            <div className="flex items-center gap-2 sm:gap-4">
              <button
                onClick={togglePlay}
                aria-label={isPlaying ? "Pausar" : "Reproduzir"}
                className="p-1.5 sm:p-2 rounded-lg hover:bg-white/10 text-white transition-colors"
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5 fill-white" />
                ) : (
                  <Play className="w-5 h-5 fill-white ml-0.5" />
                )}
              </button>

              {/* Volume */}
              <div className="flex items-center gap-1.5 group/vol">
                <button
                  onClick={toggleMute}
                  aria-label={isMuted ? "Ativar som" : "Desativar som"}
                  className="p-1.5 rounded-lg hover:bg-white/10 text-white transition-colors"
                >
                  {isMuted || volume === 0 ? (
                    <VolumeX className="w-5 h-5 text-zinc-400" />
                  ) : (
                    <Volume2 className="w-5 h-5" />
                  )}
                </button>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.05}
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  aria-label="Controle de volume"
                  className="w-12 sm:w-16 h-1 bg-white/20 rounded-full appearance-none cursor-pointer accent-[#EE399E] hidden sm:block"
                />
              </div>

              {/* Indicador de Tempo */}
              <span className="text-[11px] sm:text-xs text-zinc-300 font-mono tracking-tight">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>

            {/* Centro: Título do Episódio */}
            <div className="hidden md:flex items-center">
              <span className="text-xs text-zinc-300 font-semibold truncate max-w-xs">
                {novelTitle} • Episódio {episodeNumber}
              </span>
            </div>

            {/* Direita: Fullscreen */}
            <div className="flex items-center gap-2">
              <button
                onClick={toggleFullscreen}
                aria-label={isFullscreen ? "Sair da tela cheia" : "Tela cheia"}
                className="p-1.5 sm:p-2 rounded-lg hover:bg-white/10 text-white transition-colors"
              >
                {isFullscreen ? (
                  <Minimize className="w-5 h-5" />
                ) : (
                  <Maximize className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
