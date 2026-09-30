import React, { useState } from 'react';
import {
  ArrowLeft,
  X,
  Sparkles,
  Volume2,
  VolumeX,
  Award,
  ChevronRight,
  BookOpen,
  Calendar,
  Share2,
  CheckCircle2,
  Shield,
  Lightbulb,
  Heart,
  RotateCcw,
} from 'lucide-react';
import { HISTORICAL_HEROES, HistoricalHero } from '../data/heroesGalleryData';
import { sounds } from '../utils/soundEffects';
import { triggerConfetti } from '../utils/confetti';
import { LeoVoiceSettings } from '../types';

interface HeroesGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEarnXp: (amount: number) => void;
  onEarnCoins: (amount: number) => void;
  voiceSettings: LeoVoiceSettings;
  speakText: (text: string) => void;
  onStopSpeech: () => void;
  speaking: boolean;
}

export const HeroesGalleryModal: React.FC<HeroesGalleryModalProps> = ({
  isOpen,
  onClose,
  onEarnXp,
  onEarnCoins,
  voiceSettings,
  speakText,
  onStopSpeech,
  speaking,
}) => {
  const [selectedHero, setSelectedHero] = useState<HistoricalHero>(HISTORICAL_HEROES[0]);
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [studiedHeroIds, setStudiedHeroIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('leo_heroes_studied');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  if (!isOpen) return null;

  const categories = [
    { id: 'all', label: 'Todos los Héroes (5)' },
    { id: 'Literatura & Artes', label: 'Literatura & Artes' },
    { id: 'Derechos & Democracia', label: 'Derechos & Democracia' },
    { id: 'Educación & Medios', label: 'Educación & Medios' },
    { id: 'Liderazgo Social', label: 'Liderazgo Social' },
  ];

  const filteredHeroes = HISTORICAL_HEROES.filter((h) => {
    if (categoryFilter === 'all') return true;
    return h.category === categoryFilter;
  });

  const isStudied = studiedHeroIds.includes(selectedHero.id);

  const handleStudyHero = () => {
    if (isStudied) return;
    sounds.playFanfare();
    triggerConfetti(0.5, 0.4);
    const updated = [...studiedHeroIds, selectedHero.id];
    setStudiedHeroIds(updated);
    localStorage.setItem('leo_heroes_studied', JSON.stringify(updated));
    onEarnXp(50);
    onEarnCoins(40);
  };

  const handleSpeakQuote = () => {
    if (speaking) {
      onStopSpeech();
    } else {
      speakText(`${selectedHero.name} dijo: "${selectedHero.quote}"`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="bg-gradient-to-b from-[#0b1328] via-[#070d1d] to-[#03060e] border-2 border-amber-400/60 rounded-3xl w-full max-w-5xl max-h-[92vh] flex flex-col shadow-[0_0_60px_rgba(245,158,11,0.35)] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-3.5 sm:p-5 border-b border-amber-500/20 bg-gradient-to-r from-amber-500/15 via-orange-500/10 to-red-500/15 flex-wrap gap-2">
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Prominent Back Button */}
            <button
              onClick={() => {
                sounds.playClick();
                if (speaking) onStopSpeech();
                onClose();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border border-amber-400/40 text-xs font-bold transition-all hover:scale-105 active:scale-95 shadow-md"
              title="Volver al Viaje Temporal"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Volver atrás</span>
            </button>

            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-amber-400 via-orange-500 to-amber-600 flex items-center justify-center shadow-lg border border-amber-300/50 text-xl sm:text-2xl">
              🏛️
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-amber-400 bg-amber-500/20 px-2 py-0.5 rounded-full border border-amber-400/40">
                  Panteón de la Historia de Colombia
                </span>
                <span className="text-[10px] text-sky-200 font-bold bg-sky-500/20 px-2 py-0.5 rounded-full border border-sky-400/30">
                  🏫 Col. Niño Jesús De Praga • Feria STEM
                </span>
                <span className="text-[10px] text-emerald-300 font-bold bg-emerald-500/20 px-2 py-0.5 rounded-full border border-emerald-400/40">
                  ✨ Retratos Históricos IA
                </span>
              </div>
              <h2 className="text-sm sm:text-xl font-black text-white flex items-center gap-2">
                Galería de Héroes & Figuras del Siglo XX
              </h2>
            </div>
          </div>

          <button
            onClick={() => {
              sounds.playClick();
              if (speaking) onStopSpeech();
              onClose();
            }}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center border border-slate-600 transition-all hover:scale-105 active:scale-95"
            title="Cerrar Galería"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Categories Strip */}
        <div className="px-4 py-2.5 bg-[#081022] border-b border-slate-800 flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">
            Filtrar:
          </span>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                sounds.playClick();
                setCategoryFilter(cat.id);
              }}
              className={`px-3 py-1 rounded-xl font-bold whitespace-nowrap transition-all ${
                categoryFilter === cat.id
                  ? 'bg-amber-400 text-black shadow-md scale-105'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
          <div className="ml-auto text-[11px] font-bold text-amber-300 whitespace-nowrap hidden sm:block">
            {studiedHeroIds.length} / {HISTORICAL_HEROES.length} Estudiados
          </div>
        </div>

        {/* Content Body: Left Column Selector, Right Column Inspector */}
        <div className="flex-1 overflow-y-auto grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-slate-800">
          {/* Left Column: Heroes Cards List */}
          <div className="md:col-span-4 p-3 sm:p-4 space-y-2.5 overflow-y-auto max-h-[350px] md:max-h-none">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-1 mb-2">
              Selecciona una Figura Histórica:
            </h4>

            {filteredHeroes.map((hero) => {
              const isSelected = selectedHero.id === hero.id;
              const hasStudied = studiedHeroIds.includes(hero.id);

              return (
                <div
                  key={hero.id}
                  onClick={() => {
                    sounds.playClick();
                    setSelectedHero(hero);
                  }}
                  className={`p-2.5 rounded-2xl border-2 cursor-pointer transition-all flex items-center gap-3 relative ${
                    isSelected
                      ? `bg-gradient-to-r ${hero.colorScheme.gradient} ${hero.colorScheme.border} ${hero.colorScheme.glow} scale-[1.02]`
                      : 'bg-[#0e172e] border-slate-800 hover:border-slate-700 hover:bg-[#121d3a]'
                  }`}
                >
                  {/* Thumbnail */}
                  <div className="w-14 h-16 rounded-xl overflow-hidden border border-slate-600 flex-shrink-0 relative">
                    <img
                      src={hero.imageSrc}
                      alt={hero.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-top"
                    />
                    <span className="absolute bottom-0 right-0 bg-black/80 text-xs px-1 rounded-tl">
                      {hero.badgeEmoji}
                    </span>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-bold text-white text-xs sm:text-sm truncate">
                        {hero.name}
                      </h4>
                      {hasStudied && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                      )}
                    </div>
                    <p className="text-[10px] text-amber-300 font-medium truncate">
                      {hero.title}
                    </p>
                    <p className="text-[10px] text-slate-400">
                      {hero.epoch}
                    </p>
                  </div>

                  <ChevronRight className={`w-4 h-4 text-slate-500 transition-transform ${isSelected ? 'translate-x-1 text-amber-400' : ''}`} />
                </div>
              );
            })}
          </div>

          {/* Right Column: Hero Inspector with AI Portrait & Timeline */}
          <div className="md:col-span-8 p-4 sm:p-6 space-y-5 overflow-y-auto">
            {/* Top Showcase: Portrait & Bio */}
            <div className="bg-gradient-to-r from-[#101b38] via-[#091226] to-[#0c1630] border-2 border-slate-700 rounded-3xl p-4 sm:p-6 shadow-xl flex flex-col sm:flex-row items-center sm:items-start gap-5">
              {/* AI Portrait Art Frame */}
              <div className="relative group flex-shrink-0">
                <div className="w-36 h-48 sm:w-44 sm:h-56 rounded-2xl overflow-hidden border-4 border-amber-400/80 shadow-[0_0_30px_rgba(245,158,11,0.4)] relative">
                  <img
                    src={selectedHero.imageSrc}
                    alt={selectedHero.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none"></div>
                  <span className="absolute bottom-2 left-2 text-[10px] font-black uppercase tracking-wider bg-amber-500 text-black px-2 py-0.5 rounded-full">
                    {selectedHero.badgeEmoji} {selectedHero.category}
                  </span>
                </div>
              </div>

              {/* Bio & Details */}
              <div className="flex-1 text-center sm:text-left space-y-2">
                <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
                  <span className="text-[10px] font-black uppercase tracking-widest text-amber-300 bg-amber-500/20 px-2.5 py-0.5 rounded-full border border-amber-400/40">
                    {selectedHero.epoch}
                  </span>
                  {isStudied && (
                    <span className="text-[10px] font-bold text-emerald-300 bg-emerald-500/20 px-2 py-0.5 rounded-full border border-emerald-400/40 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      Héroe Completado (+50 XP)
                    </span>
                  )}
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-white">
                  {selectedHero.name}
                </h3>

                <p className="text-xs text-amber-200 font-semibold leading-snug">
                  {selectedHero.title}
                </p>

                <p className="text-xs text-slate-300 leading-relaxed pt-1">
                  {selectedHero.summary}
                </p>

                {/* Famous Quote Box */}
                <div className="bg-[#060c1c] border border-amber-400/40 rounded-2xl p-3 relative space-y-1.5 mt-2">
                  <div className="flex items-center justify-between text-[11px] text-amber-400 font-bold uppercase tracking-wider">
                    <span>Cita Histórica Memorable:</span>
                    <button
                      onClick={handleSpeakQuote}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-bold flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer ${
                        speaking
                          ? 'bg-rose-600 hover:bg-rose-500 text-white border border-rose-400 animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.7)]'
                          : 'bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-400/30'
                      }`}
                      title={speaking ? 'Detener voz inmediatamente' : 'Escuchar cita con la voz de Leo'}
                    >
                      {speaking ? (
                        <>
                          <VolumeX className="w-3.5 h-3.5 text-white" />
                          <span>⏹️ Detener Voz</span>
                        </>
                      ) : (
                        <>
                          <Volume2 className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                          <span>Escuchar con Voz</span>
                        </>
                      )}
                    </button>
                  </div>
                  <blockquote className="text-xs italic text-slate-200 font-serif leading-relaxed">
                    "{selectedHero.quote}"
                  </blockquote>
                </div>
              </div>
            </div>

            {/* Detailed Interactive Timeline */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-black uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-amber-400" />
                  Línea de Tiempo & Contribuciones a Colombia:
                </h4>
                <span className="text-[10px] text-slate-400">
                  {selectedHero.timeline.length} Hitos Fundamentales
                </span>
              </div>

              <div className="relative pl-6 space-y-4 before:content-[''] before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-gradient-to-b before:from-amber-400 before:via-sky-400 before:to-indigo-500">
                {selectedHero.timeline.map((evt, idx) => (
                  <div key={idx} className="relative group">
                    {/* Timeline Node dot */}
                    <div className="absolute -left-6 top-1.5 w-4 h-4 rounded-full bg-amber-400 border-2 border-black shadow-[0_0_10px_rgba(245,158,11,0.6)] flex items-center justify-center text-[8px] font-black text-black">
                      •
                    </div>

                    <div className="bg-[#0b1428] border border-slate-700/80 rounded-2xl p-3 space-y-1 hover:border-amber-400/60 transition-all hover:bg-[#0f1b36]">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <span className="text-xs font-black text-amber-400 font-mono">
                          {evt.year}
                        </span>
                        <span className="text-[10px] font-bold text-sky-300 bg-sky-500/20 px-2 py-0.5 rounded-full border border-sky-400/30">
                          {evt.impactTag}
                        </span>
                      </div>
                      <h5 className="text-xs font-bold text-white">
                        {evt.title}
                      </h5>
                      <p className="text-[11px] text-slate-300 leading-snug">
                        {evt.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Did you know & Legacy Impact Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-400/40 rounded-2xl p-3.5 space-y-1">
                <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1">
                  <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                  ¿Sabías que...? (Dato Curioso)
                </span>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  {selectedHero.curiosityFact}
                </p>
              </div>

              <div className="bg-gradient-to-br from-sky-500/10 to-indigo-500/10 border border-sky-400/40 rounded-2xl p-3.5 space-y-1">
                <span className="text-[10px] font-bold text-sky-300 uppercase tracking-wider flex items-center gap-1">
                  <Shield className="w-3.5 h-3.5 text-sky-400" />
                  Legado Vivo para Colombia
                </span>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  {selectedHero.legacyImpact}
                </p>
              </div>
            </div>

            {/* Study & Earn XP Button and Bottom Return Button */}
            <div className="pt-3 border-t border-slate-800 flex items-center justify-between flex-wrap gap-3">
              <button
                onClick={() => {
                  sounds.playClick();
                  if (speaking) onStopSpeech();
                  onClose();
                }}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-xs font-bold transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Volver al Viaje Temporal</span>
              </button>

              <button
                onClick={handleStudyHero}
                disabled={isStudied}
                className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-black transition-all flex items-center gap-2 ${
                  isStudied
                    ? 'bg-slate-800 text-emerald-400 border border-emerald-500/40 cursor-default'
                    : 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black shadow-xl hover:scale-105 active:scale-95'
                }`}
              >
                {isStudied ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>¡Héroe Estudiado (+50 XP)!</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 fill-current" />
                    <span>¡Marcar como Estudiado (+50 XP y +40 🪙)!</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
