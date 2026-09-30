import React from 'react';
import { Menu, Compass, BookOpen, Sparkles, Award, Volume2, VolumeX, ShieldCheck, Gamepad2, Settings, Shirt, Mic, Newspaper, Zap, GraduationCap, ShieldAlert, Flame, Trophy, Feather, Film, Landmark, Mail, Radio } from 'lucide-react';
import { LeoVoiceSettings } from '../types';
import { sounds } from '../utils/soundEffects';
import { decadeAmbience } from '../utils/decadeAmbience';
import { getRankForPlayer } from '../data/explorerRanks';
import { ExplorationStreakData, getMultiplierLabelForStreak } from '../data/explorationStreak';
import { getStoredCharacter, CustomTravelerCharacter } from '../services/travelerSyncService';

interface HeaderNavbarProps {
  coins: number;
  completedMissionsCount: number;
  totalMissionsCount: number;
  stampsCount: number;
  voiceSettings: LeoVoiceSettings;
  travelCount: number;
  xp: number;
  streakData: ExplorationStreakData;
  onOpenStreakModal: () => void;
  onToggleVoice: () => void;
  onOpenMainMenu: () => void;
  onOpenConflictMap: () => void;
  onOpenPassport: () => void;
  onOpenMissions: () => void;
  onOpenSteamInfo: () => void;
  onOpenCustomizer: () => void;
  onOpenCompass: () => void;
  onOpenMinigames: () => void;
  onOpenVoiceSettings: () => void;
  onOpenSiriLeo: () => void;
  onOpenNewspaper: () => void;
  onOpenTimeTunnel: () => void;
  onScrollToHomework: () => void;
  onOpenLenguaCastellana: () => void;
  onOpenTravelerRanking: () => void;
  onOpenHeroesGallery: () => void;
  onOpenHistoricCinema: () => void;
  onOpenSuggestionBox: () => void;
  onOpenMindMap: () => void;
  onOpenStemKiosk: () => void;
  onOpenRegistration?: () => void;
}

export const HeaderNavbar: React.FC<HeaderNavbarProps> = ({
  coins,
  completedMissionsCount,
  totalMissionsCount,
  stampsCount,
  voiceSettings,
  travelCount,
  xp,
  streakData,
  onOpenStreakModal,
  onToggleVoice,
  onOpenMainMenu,
  onOpenConflictMap,
  onOpenPassport,
  onOpenMissions,
  onOpenSteamInfo,
  onOpenCustomizer,
  onOpenCompass,
  onOpenMinigames,
  onOpenVoiceSettings,
  onOpenSiriLeo,
  onOpenNewspaper,
  onOpenTimeTunnel,
  onScrollToHomework,
  onOpenLenguaCastellana,
  onOpenTravelerRanking,
  onOpenHeroesGallery,
  onOpenHistoricCinema,
  onOpenSuggestionBox,
  onOpenMindMap,
  onOpenStemKiosk,
  onOpenRegistration,
}) => {
  const { currentRank } = getRankForPlayer(travelCount, xp);
  const [ambienceState, setAmbienceState] = React.useState(() => decadeAmbience.getState());
  const [character, setCharacter] = React.useState<CustomTravelerCharacter>(() => getStoredCharacter());

  React.useEffect(() => {
    const unsub = decadeAmbience.subscribe((state) => {
      setAmbienceState(state);
    });
    return () => unsub();
  }, []);

  React.useEffect(() => {
    const handleProfile = (e: Event) => {
      const customEvt = e as CustomEvent<CustomTravelerCharacter>;
      if (customEvt.detail) {
        setCharacter(customEvt.detail);
      }
    };
    window.addEventListener('leo_profile_updated', handleProfile);
    return () => window.removeEventListener('leo_profile_updated', handleProfile);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-[#070e20]/95 backdrop-blur-md border-b border-sky-500/30 px-3 sm:px-6 py-2.5 shadow-xl">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        {/* Left Side: Menu Trigger & Logo */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Settings & Voice Menu Trigger Button */}
          <button
            onClick={() => {
              sounds.playClick();
              onOpenMainMenu();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-sky-600/40 via-indigo-600/40 to-purple-600/40 hover:from-sky-500/60 hover:to-indigo-500/60 text-sky-200 border border-sky-400/50 font-bold text-xs sm:text-sm shadow-md transition-all hover:scale-105 active:scale-95 group"
            title="Abrir Menú de Ajustes, Control de Voz y Sonido"
          >
            <Settings className="w-4 h-4 text-amber-400 group-hover:rotate-90 transition-transform" />
            <span className="tracking-wide text-white">AJUSTES & VOZ</span>
          </button>

          {/* Logo & Title */}
          <div
            className="flex items-center gap-2.5 cursor-pointer group"
            onClick={() => {
              sounds.playClick();
              onOpenSteamInfo();
            }}
          >
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-tr from-amber-400 via-sky-400 to-indigo-600 p-0.5 shadow-[0_0_15px_rgba(56,189,248,0.5)] group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#0b1329] rounded-[14px] flex items-center justify-center">
                <span className="text-xl animate-spin-slow">⏳</span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <h1 className="text-base sm:text-xl font-bold tracking-wide text-white flex items-center gap-1">
                  Leo <span className="text-sky-400">en el Tiempo</span>
                </h1>
                <span className="text-[10px] uppercase font-black bg-amber-500/30 text-amber-300 border border-amber-400/50 px-2 py-0.5 rounded-full shadow-xs">
                  FERIA STEM
                </span>
                <span className="text-[10px] font-black bg-sky-500/25 text-sky-200 border border-sky-400/40 px-2 py-0.5 rounded-full hidden md:inline-flex items-center gap-1">
                  🏫 Col. Niño Jesús De Praga
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-sky-300/90 font-semibold hidden sm:block">
                Colegio Niño Jesús De Praga • Siglo XX de Colombia • Ciencias Sociales & STEM
              </p>
            </div>
          </div>
        </div>

        {/* Action Controls & Navigation Modules */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Colombian Conflict & Peace Map Button */}
          <button
            onClick={() => {
              sounds.playClick();
              onOpenConflictMap();
            }}
            className="flex items-center gap-1.5 bg-gradient-to-r from-rose-600/30 to-red-600/30 hover:from-rose-600/50 hover:to-red-600/50 border border-rose-400/50 text-rose-200 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-[0_0_12px_rgba(244,63,94,0.25)] hover:scale-105"
            title="Mapa Histórico del Conflicto y Cátedra de Paz"
          >
            <ShieldAlert className="w-4 h-4 text-rose-400 animate-pulse" />
            <span className="hidden sm:inline">Mapa Conflicto</span>
          </button>
          {/* Explorer Rank Badge Pill */}
          <div
            onClick={() => {
              sounds.playClick();
              onOpenCustomizer();
            }}
            className="hidden lg:flex items-center gap-1.5 bg-[#101b38] hover:bg-[#182954] border border-amber-400/50 px-2.5 py-1.5 rounded-full cursor-pointer transition-all shadow-sm"
            title={`Rango: ${currentRank.title} (Nivel ${currentRank.level})`}
          >
            <span className="text-sm">{currentRank.badgeIcon}</span>
            <span className="text-xs font-bold text-amber-300">
              {currentRank.title}
            </span>
          </div>

          {/* Traveler Registration / Profile Status Pill */}
          {onOpenRegistration && (
            <button
              onClick={() => {
                sounds.playClick();
                onOpenRegistration();
              }}
              className="flex items-center gap-1.5 bg-gradient-to-r from-sky-900/60 to-indigo-900/60 hover:from-sky-800/80 hover:to-indigo-800/80 border border-sky-400/50 text-sky-100 px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all hover:scale-105 cursor-pointer shadow-sm"
              title={`Perfil registrado: ${character.name} (${character.school}). Toca para ver o modificar.`}
            >
              <span className="text-sm">{character.avatarIcon || '🚀'}</span>
              <span className="truncate max-w-[100px] sm:max-w-[140px] text-white">
                {character.name || 'Mi Perfil'}
              </span>
              <span className="hidden md:inline-flex items-center text-[10px] text-emerald-300 font-bold bg-emerald-500/20 px-1 py-0.2 rounded-md">
                ✓
              </span>
            </button>
          )}

          {/* Factor Sorpresa: Modo Jurados STEM & Diploma Souvenir */}
          <button
            onClick={() => {
              sounds.playFanfare();
              onOpenStemKiosk();
            }}
            className="flex items-center gap-1.5 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 hover:from-amber-400 hover:to-orange-400 text-black px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-black transition-all shadow-[0_0_15px_rgba(245,158,11,0.5)] hover:scale-105 active:scale-95 cursor-pointer animate-pulse"
            title="Factor Sorpresa: Generador de Diploma Souvenir para Jurados y Ficha Técnica STEM"
          >
            <Award className="w-4 h-4 fill-black" />
            <span>🏆 Modo Jurados</span>
          </button>

          {/* Buzón de Sugerencias y Votaciones */}
          <button
            onClick={() => {
              sounds.playClick();
              onOpenSuggestionBox();
            }}
            className="flex items-center gap-1.5 bg-gradient-to-r from-amber-600/30 to-yellow-600/30 hover:from-amber-600/50 hover:to-yellow-600/50 border border-amber-400/60 text-amber-200 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-[0_0_12px_rgba(245,158,11,0.25)] hover:scale-105 cursor-pointer"
            title="Buzón de Sugerencias y Calificación de la Feria STEM"
          >
            <Mail className="w-4 h-4 text-amber-400" />
            <span className="hidden sm:inline">Buzón STEM</span>
          </button>

          {/* Mapa Mental Cuántico */}
          <button
            onClick={() => {
              sounds.playClick();
              onOpenMindMap();
            }}
            className="flex items-center gap-1.5 bg-gradient-to-r from-cyan-600/30 to-blue-600/30 hover:from-cyan-600/50 hover:to-blue-600/50 border border-cyan-400/60 text-cyan-200 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-[0_0_12px_rgba(6,182,212,0.25)] hover:scale-105 cursor-pointer"
            title="Mapa Mental Cuántico: Ejes de Economía, Paz, Sociedad, Medios y Cultura"
          >
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="hidden sm:inline">Mapa Mental</span>
          </button>

          {/* Galería de Héroes del Siglo XX Button */}
          <button
            onClick={() => {
              sounds.playClick();
              onOpenHeroesGallery();
            }}
            className="flex items-center gap-1.5 bg-gradient-to-r from-yellow-600/30 via-amber-600/30 to-orange-600/30 hover:from-yellow-600/50 hover:to-orange-600/50 border border-amber-400/60 text-amber-200 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-[0_0_12px_rgba(245,158,11,0.25)] hover:scale-105"
            title="Galería de Héroes: Retratos generados con IA y líneas de tiempo de los grandes personajes de Colombia"
          >
            <Landmark className="w-4 h-4 text-amber-300" />
            <span className="hidden sm:inline">Galería de Héroes</span>
          </button>

          {/* Sala de Cine Histórico Button */}
          <button
            onClick={() => {
              sounds.playModalOpen();
              onOpenHistoricCinema();
            }}
            className="flex items-center gap-1.5 bg-gradient-to-r from-red-600/30 via-pink-600/30 to-purple-600/30 hover:from-red-600/50 hover:to-purple-600/50 border border-red-400/60 text-red-200 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-[0_0_12px_rgba(239,68,68,0.25)] hover:scale-105"
            title="Sala de Cine Histórico: Documentales y videos de Colombia en el siglo XX con trivia"
          >
            <Film className="w-4 h-4 text-red-400 animate-pulse" />
            <span className="hidden sm:inline">Cine Siglo XX</span>
          </button>

          {/* Lengua Castellana y Literatura Button */}
          <button
            onClick={() => {
              sounds.playClick();
              onOpenLenguaCastellana();
            }}
            className="flex items-center gap-1.5 bg-gradient-to-r from-amber-600/30 via-orange-600/30 to-amber-600/30 hover:from-amber-600/50 hover:to-orange-600/50 border border-amber-400/60 text-amber-200 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-[0_0_12px_rgba(245,158,11,0.25)] hover:scale-105"
            title="Salón de Lengua Castellana: Autores Cumbres, Colombianismos y Taller de Relatos"
          >
            <BookOpen className="w-4 h-4 text-amber-400" />
            <span className="hidden sm:inline">Lengua Castellana</span>
          </button>

          {/* Real-time Traveler Ranking Button */}
          <button
            onClick={() => {
              sounds.playFanfare();
              onOpenTravelerRanking();
            }}
            className="flex items-center gap-1.5 bg-gradient-to-r from-yellow-500/20 via-amber-500/20 to-orange-500/20 hover:from-yellow-500/40 hover:to-orange-500/40 border border-amber-400/50 text-amber-300 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-[0_0_12px_rgba(234,179,8,0.25)] hover:scale-105"
            title="Ranking en Tiempo Real de los Mejores Viajeros de Colombia"
          >
            <Trophy className="w-4 h-4 text-amber-400 animate-bounce" />
            <span className="hidden md:inline">Ranking en Vivo</span>
          </button>

          {/* Quick School Homework Bar Trigger */}
          <button
            onClick={() => {
              sounds.playClick();
              onScrollToHomework();
            }}
            className="flex items-center gap-1.5 bg-gradient-to-r from-indigo-600/30 to-blue-600/30 hover:from-indigo-600/50 hover:to-blue-600/50 border border-indigo-400/50 text-indigo-200 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-[0_0_12px_rgba(99,102,241,0.2)] hover:scale-105"
            title="Asistente de Tareas Escolares de Ciencias Sociales"
          >
            <GraduationCap className="w-4 h-4 text-indigo-400" />
            <span className="hidden sm:inline">Tareas</span>
          </button>

          {/* 3D Quantum Time Tunnel Simulator Button */}
          <button
            onClick={() => {
              sounds.playHyperDrive();
              onOpenTimeTunnel();
            }}
            className="flex items-center gap-1.5 bg-gradient-to-r from-cyan-600/30 to-sky-600/30 hover:from-cyan-600/50 hover:to-sky-600/50 border border-cyan-400/50 text-cyan-200 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-[0_0_12px_rgba(6,182,212,0.3)] hover:scale-105"
            title="Túnel Cuántico 3D: ¡Simulador de Salto Temporal Hiperespacial!"
          >
            <Zap className="w-4 h-4 text-cyan-300 animate-pulse" />
            <span className="hidden md:inline">Túnel 3D</span>
          </button>

          {/* Printable Vintage Newspaper Generator */}
          <button
            onClick={() => {
              sounds.playTypewriter();
              onOpenNewspaper();
            }}
            className="flex items-center gap-1.5 bg-[#2d251d] hover:bg-[#45372b] border border-[#a89578] text-[#f7f3ea] px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-[0_0_12px_rgba(168,149,120,0.2)] hover:scale-105"
            title="Periódico Histórico Escolar: ¡Genera e imprime el diario de la época para tu cartelera!"
          >
            <Newspaper className="w-4 h-4 text-amber-300" />
            <span className="hidden md:inline">Periódico</span>
          </button>

          {/* Dedicated Vestidor 2D Tab */}
          <button
            onClick={() => {
              sounds.playClick();
              onOpenCustomizer();
            }}
            className="flex items-center gap-1.5 bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-amber-500/20 hover:from-amber-500/30 hover:to-orange-500/30 border border-amber-400/50 text-amber-300 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-[0_0_12px_rgba(245,158,11,0.2)] hover:scale-105"
            title="Vestidor 2D de Leo: ¡Pruébale sombreros, gafas y trajes!"
          >
            <Shirt className="w-4 h-4 text-amber-400" />
            <span className="hidden sm:inline">Vestidor 2D</span>
          </button>

          {/* Dedicated Oye Leo Voice Assistant Button */}
          <button
            onClick={() => {
              sounds.playWakeWordDetected();
              onOpenSiriLeo();
            }}
            className="flex items-center gap-1.5 bg-gradient-to-r from-cyan-500/30 via-indigo-500/30 to-purple-500/30 hover:from-cyan-500/40 hover:to-purple-500/40 border border-cyan-400/60 text-cyan-300 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-black transition-all shadow-[0_0_15px_rgba(6,182,212,0.4)] animate-pulse hover:scale-105"
            title="¡Oye Leo! - Centro de Reconocimiento y Preguntas por Voz"
          >
            <Mic className="w-4 h-4 text-cyan-300 animate-bounce" />
            <span className="hidden sm:inline font-black">¡Oye Leo!</span>
          </button>

          {/* Racha de Exploración Pill (Retention Streak) */}
          <button
            onClick={() => {
              sounds.playClick();
              onOpenStreakModal();
            }}
            className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full border transition-all hover:scale-105 shadow-sm group ${
              streakData.currentStreak >= 5
                ? 'bg-gradient-to-r from-amber-600/30 to-rose-600/30 border-amber-400/80 text-amber-200 shadow-[0_0_12px_rgba(245,158,11,0.3)]'
                : streakData.hasTraveledToday
                ? 'bg-[#0f242e] border-emerald-400/60 text-emerald-200'
                : 'bg-[#29170a] border-amber-500/70 text-amber-300 animate-pulse'
            }`}
            title={`Racha de Exploración: Día ${streakData.currentStreak} de 5 (${getMultiplierLabelForStreak(
              streakData.currentStreak
            )}). Clic para ver el camino de recompensas.`}
          >
            <Flame
              className={`w-3.5 h-3.5 ${
                streakData.currentStreak >= 5
                  ? 'text-amber-300 fill-amber-300 animate-bounce'
                  : streakData.hasTraveledToday
                  ? 'text-emerald-400 fill-emerald-400'
                  : 'text-amber-400 fill-amber-400 animate-pulse'
              }`}
            />
            <span className="font-black text-xs">
              <span className="hidden sm:inline">Racha: </span>
              {streakData.currentStreak}/5 d
            </span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-md bg-amber-500/25 text-amber-300 border border-amber-400/30 font-bold">
              {getMultiplierLabelForStreak(streakData.currentStreak)}
            </span>
          </button>

          {/* Energy Coins Pill */}
          <div
            onClick={() => {
              sounds.playCoin();
              onOpenCustomizer();
            }}
            className="flex items-center gap-1.5 bg-[#122042] hover:bg-[#1a2d5c] border border-amber-400/40 px-2.5 py-1.5 rounded-full cursor-pointer transition-all shadow-sm group"
            title="Monedas Cuánticas - ¡Desbloquea atuendos en el Vestidor 2D!"
          >
            <span className="text-sm">⚡</span>
            <span className="font-digital font-bold text-xs sm:text-sm text-amber-400">
              {coins}
            </span>
          </div>

          {/* Mini-games */}
          <button
            onClick={() => {
              sounds.playClick();
              onOpenMinigames();
            }}
            className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl bg-[#122042] hover:bg-[#1a2d5c] border border-purple-400/40 text-purple-300 text-xs font-semibold transition-all flex items-center gap-1"
            title="Minijuegos Históricos: Trompo, Radio Sutatenza y Trenes a Vapor"
          >
            <Gamepad2 className="w-4 h-4 text-purple-400" />
            <span className="hidden md:inline">Juegos</span>
          </button>

          {/* Passport Stamps */}
          <button
            onClick={() => {
              sounds.playClick();
              onOpenPassport();
            }}
            className="flex items-center gap-1 bg-[#122042] hover:bg-[#1a2d5c] border border-sky-400/40 text-sky-200 px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-all shadow-sm"
            title="Pasaporte Temporal: Sellos de Épocas"
          >
            <BookOpen className="w-3.5 h-3.5 text-sky-400" />
            <span className="hidden sm:inline">Pasaporte</span>
            <span className="bg-sky-500/30 text-sky-300 px-1.5 py-0.2 rounded-full text-[10px]">
              {stampsCount}
            </span>
          </button>

          {/* Missions */}
          <button
            onClick={() => {
              sounds.playClick();
              onOpenMissions();
            }}
            className="flex items-center gap-1 bg-[#122042] hover:bg-[#1a2d5c] border border-emerald-400/40 text-emerald-200 px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-all shadow-sm"
            title="Misiones Escolares STEAM+"
          >
            <Award className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">Misiones</span>
            <span className="bg-emerald-500/30 text-emerald-300 px-1.5 py-0.2 rounded-full text-[10px]">
              {completedMissionsCount}/{totalMissionsCount}
            </span>
          </button>

          {/* Compass Modal */}
          <button
            onClick={() => {
              sounds.playClick();
              onOpenCompass();
            }}
            className="p-1.5 rounded-xl bg-[#122042] hover:bg-[#1a2d5c] border border-cyan-400/40 text-cyan-300 transition-all"
            title="Brújula de Regiones de Colombia"
          >
            <Compass className="w-4 h-4" />
          </button>

          {/* Ambient Historical Soundscape Toggle */}
          <button
            onClick={() => {
              sounds.playClick();
              decadeAmbience.togglePlay();
            }}
            className={`p-1.5 sm:px-2 sm:py-1.5 rounded-xl border transition-all flex items-center gap-1.5 ${
              ambienceState.isPlaying
                ? 'bg-amber-500/25 border-amber-400/60 text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.35)]'
                : 'bg-[#122042] border-slate-700 text-slate-400 hover:text-slate-200'
            }`}
            title={
              ambienceState.isPlaying
                ? `Ambiente sonoro activo: ${ambienceState.info.name} (clic para silenciar)`
                : `Activar ambientación sonora histórica de la década (${ambienceState.info.decade})`
            }
          >
            <Radio className={`w-4 h-4 ${ambienceState.isPlaying ? 'text-amber-400 animate-pulse' : 'text-slate-400'}`} />
            <span className="hidden xl:inline text-xs font-bold">
              {ambienceState.isPlaying ? ambienceState.info.decade : 'Ambiente'}
            </span>
            {ambienceState.isPlaying && (
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
            )}
          </button>

          {/* Voice Mute / Speak Toggle */}
          <button
            onClick={() => {
              sounds.playClick();
              onToggleVoice();
            }}
            className={`p-1.5 rounded-xl border transition-all ${
              voiceSettings.enabled
                ? 'bg-amber-500/20 border-amber-400/40 text-amber-300'
                : 'bg-slate-800 border-slate-700 text-slate-500'
            }`}
            title={voiceSettings.enabled ? "Voz activa (clic para silenciar)" : "Voz silenciada"}
          >
            {voiceSettings.enabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Voice Settings */}
          <button
            onClick={() => {
              sounds.playClick();
              onOpenVoiceSettings();
            }}
            className="p-1.5 rounded-xl bg-[#122042] hover:bg-[#1a2d5c] border border-slate-700 text-slate-400 hover:text-white transition-all"
            title="Ajustes de Tono y Velocidad de Voz"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
