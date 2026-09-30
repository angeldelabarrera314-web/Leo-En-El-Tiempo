import React, { useState, useRef } from 'react';
import {
  ArrowLeft,
  X,
  Play,
  Film,
  Sparkles,
  CheckCircle2,
  Tv,
  HelpCircle,
  Award,
  ChevronRight,
  Maximize2,
  Lightbulb,
  Clock,
  BookOpen,
  Calendar,
  Layers,
  ExternalLink,
  Search,
  PlusCircle,
  Radio,
  Share2,
} from 'lucide-react';
import { HISTORIC_FILMS, HistoricalFilm } from '../data/historicCinemaData';
import { sounds } from '../utils/soundEffects';
import { triggerConfetti } from '../utils/confetti';

interface HistoricCinemaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEarnXp: (amount: number) => void;
  onEarnCoins: (amount: number) => void;
}

export const HistoricCinemaModal: React.FC<HistoricCinemaModalProps> = ({
  isOpen,
  onClose,
  onEarnXp,
  onEarnCoins,
}) => {
  const [selectedFilm, setSelectedFilm] = useState<HistoricalFilm>(HISTORIC_FILMS[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [lightsOff, setLightsOff] = useState<boolean>(false);
  const [customYoutubeUrl, setCustomYoutubeUrl] = useState<string>('');
  const [isCustomVideoActive, setIsCustomVideoActive] = useState<boolean>(false);
  const [customEmbedUrl, setCustomEmbedUrl] = useState<string>('');

  const [watchedFilmIds, setWatchedFilmIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('leo_cinema_watched');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Quiz state
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasAnsweredQuiz, setHasAnsweredQuiz] = useState<boolean>(false);
  const [isCorrectQuiz, setIsCorrectQuiz] = useState<boolean>(false);

  const screenContainerRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const isWatched = watchedFilmIds.includes(selectedFilm.id);

  const handleSelectFilm = (film: HistoricalFilm) => {
    sounds.playClick();
    setSelectedFilm(film);
    setIsCustomVideoActive(false);
    setIsPlaying(true);
    setSelectedOption(null);
    setHasAnsweredQuiz(false);

    if (!watchedFilmIds.includes(film.id)) {
      const updated = [...watchedFilmIds, film.id];
      setWatchedFilmIds(updated);
      localStorage.setItem('leo_cinema_watched', JSON.stringify(updated));
    }
  };

  const handleFullscreenProject = () => {
    sounds.playProjectorClick();
    if (screenContainerRef.current) {
      if (!document.fullscreenElement) {
        screenContainerRef.current.requestFullscreen?.().catch((err) => {
          console.warn('Fullscreen request failed:', err);
        });
      } else {
        document.exitFullscreen?.().catch(() => {});
      }
    }
  };

  const handleApplyCustomVideo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customYoutubeUrl.trim()) return;

    let videoId = '';
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = customYoutubeUrl.match(regExp);

    if (match && match[2].length === 11) {
      videoId = match[2];
    } else {
      videoId = customYoutubeUrl.trim();
    }

    if (videoId) {
      sounds.playSuccess();
      setCustomEmbedUrl(`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`);
      setIsCustomVideoActive(true);
      setIsPlaying(true);
    }
  };

  const handleQuizAnswer = (optionIdx: number) => {
    if (hasAnsweredQuiz) return;
    setSelectedOption(optionIdx);
    setHasAnsweredQuiz(true);

    if (optionIdx === selectedFilm.quiz.correctIndex) {
      setIsCorrectQuiz(true);
      sounds.playSuccess();
      sounds.playFanfare();
      triggerConfetti(0.5, 0.4);
      onEarnXp(selectedFilm.xpReward);
      onEarnCoins(50);
    } else {
      setIsCorrectQuiz(false);
      sounds.playError();
    }
  };

  const currentEmbedSource = isCustomVideoActive
    ? customEmbedUrl
    : selectedFilm.embedUrl;

  const currentWatchUrl = isCustomVideoActive
    ? customYoutubeUrl
    : selectedFilm.youtubeUrl;

  const isRtvc = !isCustomVideoActive && selectedFilm.platform === 'rtvcplay';

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 transition-colors duration-500 ${
        lightsOff ? 'bg-black/95 backdrop-blur-xl' : 'bg-black/85 backdrop-blur-md'
      } animate-fadeIn select-none`}
    >
      <div className="bg-gradient-to-b from-[#110e20] via-[#0b0818] to-[#05040d] border-2 border-amber-400/60 rounded-3xl w-full max-w-5xl max-h-[94vh] flex flex-col shadow-[0_0_60px_rgba(245,158,11,0.35)] overflow-hidden relative">
        {/* Cinema Projector Beam effect on top */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-12 bg-gradient-to-b from-amber-400/15 to-transparent blur-xl pointer-events-none"></div>

        {/* Header Marquee */}
        <div className="flex items-center justify-between p-3.5 sm:p-5 border-b border-amber-500/20 bg-gradient-to-r from-red-950/40 via-amber-950/40 to-purple-950/40 relative z-10 flex-wrap gap-3">
          <div className="flex items-center gap-3">
            {/* Primary Back Button */}
            <button
              onClick={() => {
                sounds.playClick();
                onClose();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-amber-300 hover:text-white border border-slate-600 transition-all font-bold text-xs hover:scale-105 active:scale-95 shadow-md"
              title="Regresar a la máquina del tiempo"
            >
              <ArrowLeft className="w-4 h-4 text-amber-400" />
              <span>Volver atrás</span>
            </button>

            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-amber-400 via-orange-500 to-red-600 flex items-center justify-center shadow-lg border border-amber-300/50 text-xl sm:text-2xl animate-pulse">
              🎬
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-amber-300 bg-amber-500/20 px-2 py-0.5 rounded-full border border-amber-400/40">
                  Colegio Niño Jesús De Praga • Feria STEM 2026
                </span>
                <span className="text-[10px] text-red-300 font-bold bg-red-500/20 px-2 py-0.5 rounded-full border border-red-400/40 flex items-center gap-1">
                  <Film className="w-3 h-3 text-red-400" />
                  Videoteca Histórica Curada (3 Documentales)
                </span>
              </div>
              <h2 className="text-base sm:text-xl font-black text-white flex items-center gap-2">
                Sala de Cine Histórico del Siglo XX
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Lights toggle */}
            <button
              onClick={() => {
                sounds.playClick();
                setLightsOff(!lightsOff);
              }}
              className="px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-amber-300 text-xs font-bold border border-slate-700 flex items-center gap-1.5 transition-all"
              title="Apagar / Encender luces de la sala"
            >
              <span>{lightsOff ? '💡 Encender Luces' : '🕶️ Modo Cine'}</span>
            </button>

            {/* Close cross */}
            <button
              onClick={() => {
                sounds.playClick();
                onClose();
              }}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center border border-slate-600 transition-all hover:scale-105 active:scale-95"
              title="Cerrar Cine"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Cartelera Progress strip */}
        <div className="px-4 py-2 bg-[#0d0a1c] border-b border-slate-800 flex items-center justify-between text-xs text-slate-300 flex-wrap gap-2">
          <div className="flex items-center gap-2 overflow-x-auto">
            <span className="font-bold text-amber-400 uppercase text-[10px] whitespace-nowrap">
              Cartelera Oficial Feria STEM:
            </span>
            <span className="text-slate-300 text-[11px] truncate font-medium">
              3 Documentales Verificados (CNMH, Siglo XX e Industrialización RTVCPlay)
            </span>
          </div>

          <div className="flex items-center gap-3 font-bold text-amber-300 text-[11px]">
            <span>Vistos: {watchedFilmIds.length}/{HISTORIC_FILMS.length}</span>
            <div className="w-20 bg-slate-800 h-2 rounded-full overflow-hidden border border-slate-700">
              <div
                className="bg-amber-400 h-full transition-all duration-500"
                style={{ width: `${(watchedFilmIds.length / HISTORIC_FILMS.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-800">
          {/* Main Cinema Screen & Video Player */}
          <div className="lg:col-span-8 p-3 sm:p-5 space-y-4 overflow-y-auto">
            {/* The Cinema Canvas Container */}
            <div
              ref={screenContainerRef}
              className="relative rounded-3xl overflow-hidden border-4 border-amber-400/60 shadow-[0_0_50px_rgba(245,158,11,0.35)] bg-black aspect-video flex flex-col justify-center items-center group"
            >
              {isRtvc ? (
                /* RTVCPlay Dedicated Interactive Portal Screen */
                <div className="relative w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#0c1328] via-[#101c3d] to-[#0a0f20] overflow-hidden">
                  <div className="absolute inset-0 opacity-25 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-400 via-sky-600 to-transparent"></div>
                  
                  {/* Background thumbnail */}
                  <img
                    src={selectedFilm.thumbnail}
                    alt={selectedFilm.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-20 filter blur-xs"
                  />

                  <div className="relative z-10 max-w-lg space-y-3.5 flex flex-col items-center">
                    <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/40 text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-md">
                      <Tv className="w-3.5 h-3.5 text-amber-400" />
                      RTVCPlay • Señal Memoria (Plataforma Oficial)
                    </span>

                    <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">
                      {selectedFilm.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-sky-200 line-clamp-2">
                      {selectedFilm.subtitle}
                    </p>

                    <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                      <a
                        href={selectedFilm.youtubeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 hover:from-amber-300 hover:to-red-400 text-slate-950 font-black text-sm flex items-center gap-2 shadow-[0_0_25px_rgba(245,158,11,0.7)] transition-all hover:scale-105 active:scale-95"
                      >
                        <Play className="w-5 h-5 fill-current text-slate-950" />
                        <span>🎬 Reproducir en RTVCPlay Oficial</span>
                        <ExternalLink className="w-4 h-4 ml-1" />
                      </a>
                    </div>

                    <p className="text-[11px] text-slate-400">
                      Capítulo completo gratuito y de acceso público sin anuncios educativos.
                    </p>
                  </div>
                </div>
              ) : (
                /* YouTube IFrame Embed */
                <iframe
                  src={currentEmbedSource}
                  title={selectedFilm.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  className="w-full h-full border-0 rounded-2xl"
                />
              )}
            </div>

            {/* Projection Action Controls */}
            <div className="flex items-center justify-between flex-wrap gap-2 bg-[#0d091d] p-3 rounded-2xl border border-slate-800">
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={handleFullscreenProject}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black font-black text-xs flex items-center gap-2 shadow-lg transition-all hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <Maximize2 className="w-4 h-4 text-black" />
                  <span>📽️ Proyectar en Pantalla Completa</span>
                </button>

                <a
                  href={currentWatchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all hover:scale-105 ${
                    isRtvc
                      ? 'bg-amber-500/20 hover:bg-amber-500/35 text-amber-200 border border-amber-400/50'
                      : 'bg-red-600/30 hover:bg-red-600/50 text-red-200 border border-red-500/50'
                  }`}
                  title="Abrir directamente en la plataforma oficial del video"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
                  <span>{isRtvc ? 'Abrir en RTVCPlay' : 'Abrir en YouTube Oficial'}</span>
                </a>
              </div>

              <div className="text-[11px] text-slate-400">
                <span>Año histórico clave: </span>
                <span className="text-amber-400 font-bold">{selectedFilm.eraYear}</span>
              </div>
            </div>

            {/* Synopsis & Key Learning Points */}
            <div className="bg-[#0f0b24] border border-amber-500/20 rounded-2xl p-4 sm:p-5 space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
                    {selectedFilm.badge} • {selectedFilm.genre}
                  </span>
                  <h3 className="text-lg sm:text-xl font-black text-white mt-0.5">
                    {selectedFilm.title}
                  </h3>
                  <p className="text-xs text-slate-400 italic">
                    {selectedFilm.subtitle}
                  </p>
                </div>

                <span className="px-2.5 py-1 rounded-full bg-slate-800 text-amber-300 text-xs font-bold border border-slate-700 whitespace-nowrap">
                  {selectedFilm.duration}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                {selectedFilm.synopsis}
              </p>

              {/* Key takeaways */}
              <div className="pt-2 border-t border-slate-800 space-y-2">
                <span className="text-xs font-bold text-sky-300 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-sky-400" />
                  Ejes pedagógicos para la Feria STEM:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                  {selectedFilm.keyPoints.map((point, idx) => (
                    <div key={idx} className="flex items-start gap-1.5 bg-slate-900/60 p-2 rounded-xl border border-slate-800/80">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Interactive Reflection Quiz */}
            <div className="bg-gradient-to-br from-[#121633] to-[#0c0f24] border-2 border-indigo-500/30 rounded-2xl p-4 sm:p-5 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
                    <HelpCircle className="w-4 h-4 text-indigo-400" />
                  </div>
                  <span className="text-xs font-black uppercase text-indigo-300 tracking-wider">
                    Trivia de Comprensión del Documental (+{selectedFilm.xpReward} XP)
                  </span>
                </div>
                {hasAnsweredQuiz && (
                  <span
                    className={`text-xs font-black px-2.5 py-0.5 rounded-full ${
                      isCorrectQuiz
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/40'
                        : 'bg-rose-500/20 text-rose-300 border border-rose-400/40'
                    }`}
                  >
                    {isCorrectQuiz ? '¡Respuesta Correcta! 🎉' : 'Intenta reflexionar de nuevo ✍️'}
                  </span>
                )}
              </div>

              <p className="text-sm font-bold text-white">
                {selectedFilm.quiz.question}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                {selectedFilm.quiz.options.map((option, idx) => {
                  const isSelected = selectedOption === idx;
                  const isCorrect = idx === selectedFilm.quiz.correctIndex;

                  let btnStyle = 'bg-slate-800/80 hover:bg-slate-750 text-slate-200 border-slate-700';
                  if (hasAnsweredQuiz) {
                    if (isCorrect) {
                      btnStyle = 'bg-emerald-600/40 border-emerald-400 text-emerald-100 font-bold';
                    } else if (isSelected) {
                      btnStyle = 'bg-rose-600/40 border-rose-400 text-rose-100';
                    } else {
                      btnStyle = 'bg-slate-900/40 border-slate-800 text-slate-400 opacity-60';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleQuizAnswer(idx)}
                      disabled={hasAnsweredQuiz}
                      className={`text-left p-3 rounded-xl border text-xs transition-all ${btnStyle} flex items-center justify-between gap-2`}
                    >
                      <span>{option}</span>
                      {hasAnsweredQuiz && isCorrect && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {hasAnsweredQuiz && (
                <p className="text-xs text-slate-300 bg-slate-900/80 p-2.5 rounded-xl border border-slate-800 mt-2">
                  <span className="font-bold text-amber-300">Explicación Histórica: </span>
                  {selectedFilm.quiz.explanation}
                </p>
              )}
            </div>

            {/* Bottom Back Button */}
            <div className="pt-2 flex justify-start">
              <button
                onClick={() => {
                  sounds.playClick();
                  onClose();
                }}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 flex items-center gap-1.5 transition-all hover:scale-105 active:scale-95"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Volver al Viaje Temporal</span>
              </button>
            </div>
          </div>

          {/* Right Column: Films List */}
          <div className="lg:col-span-4 p-3 sm:p-5 space-y-4 bg-[#0a0717]/60 overflow-y-auto">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <Film className="w-4 h-4" />
                Videos Exclusivos ({HISTORIC_FILMS.length})
              </span>
              <span className="text-[10px] text-slate-400 font-bold bg-slate-800 px-2 py-0.5 rounded-full">
                Feria STEM 2026
              </span>
            </div>

            {/* Curated list */}
            <div className="space-y-3">
              {HISTORIC_FILMS.map((film, index) => {
                const isSelected = selectedFilm.id === film.id && !isCustomVideoActive;
                const watched = watchedFilmIds.includes(film.id);

                return (
                  <div
                    key={film.id}
                    onClick={() => handleSelectFilm(film)}
                    className={`p-3 rounded-2xl border transition-all cursor-pointer relative overflow-hidden group ${
                      isSelected
                        ? 'bg-gradient-to-r from-amber-950/60 to-orange-950/60 border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.3)] scale-[1.02]'
                        : 'bg-slate-900/60 hover:bg-slate-800/80 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex gap-3">
                      {/* Video Thumbnail */}
                      <div className="relative w-24 h-16 rounded-xl overflow-hidden bg-black shrink-0 border border-slate-700 group-hover:border-amber-400/60 transition-colors">
                        <img
                          src={film.thumbnail}
                          alt={film.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <Play className="w-5 h-5 text-amber-400 fill-amber-400/60" />
                        </div>
                        <span className="absolute bottom-1 right-1 text-[9px] font-black bg-black/80 text-white px-1 py-0.2 rounded">
                          {film.platform === 'rtvcplay' ? 'RTVC' : 'YT'}
                        </span>
                      </div>

                      {/* Film info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 mb-1">
                          <span className="text-[10px] font-black uppercase text-amber-400 truncate">
                            {film.platform === 'rtvcplay' ? '🇨🇴 RTVCPlay' : '🔴 YouTube'}
                          </span>
                          {watched && (
                            <span className="text-[9px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.2 rounded-full border border-emerald-400/40 font-bold shrink-0">
                              ✓ Visto
                            </span>
                          )}
                        </div>

                        <h4 className="text-xs font-black text-white group-hover:text-amber-300 transition-colors line-clamp-2 leading-tight">
                          {index + 1}. {film.title}
                        </h4>

                        <p className="text-[10px] text-slate-400 mt-1 line-clamp-1">
                          {film.subtitle}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Custom Link Projector for Teachers / Students */}
            <div className="mt-6 pt-4 border-t border-slate-800 space-y-2.5">
              <span className="text-xs font-bold text-sky-300 flex items-center gap-1.5">
                <PlusCircle className="w-4 h-4 text-sky-400" />
                Proyector Libre para Docentes:
              </span>
              <p className="text-[11px] text-slate-400 leading-tight">
                Pega cualquier enlace de YouTube para proyectarlo con la estética de cine en la feria escolar.
              </p>

              <form onSubmit={handleApplyCustomVideo} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Ej: https://youtu.be/..."
                  value={customYoutubeUrl}
                  onChange={(e) => setCustomYoutubeUrl(e.target.value)}
                  className="flex-1 bg-slate-900 border border-slate-700 focus:border-amber-400 rounded-xl px-2.5 py-1.5 text-xs text-white placeholder-slate-500 outline-hidden"
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-black text-xs transition-all shadow-md active:scale-95"
                >
                  Cargar
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
