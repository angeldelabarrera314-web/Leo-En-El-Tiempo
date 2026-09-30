import React, { useState } from 'react';
import {
  X,
  Settings,
  Mic,
  Volume2,
  VolumeX,
  Sparkles,
  Award,
  GraduationCap,
  Gamepad2,
  Sliders,
  CheckCircle,
  HelpCircle,
  ShieldAlert,
  ChevronRight,
  Zap,
  Download,
} from 'lucide-react';
import { LeoVoiceSettings } from '../types';
import { sounds } from '../utils/soundEffects';
import { decadeAmbience } from '../utils/decadeAmbience';
import { getRankForPlayer } from '../data/explorerRanks';
import { getStoredCharacter, CustomTravelerCharacter } from '../services/travelerSyncService';

interface MainMenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  travelCount: number;
  xp: number;
  coins: number;
  voiceSettings: LeoVoiceSettings;
  onUpdateVoiceSettings: (settings: Partial<LeoVoiceSettings>) => void;
  onNavigateTo: (destination: string) => void;
  onOpenHub: () => void;
}

export const MainMenuDrawer: React.FC<MainMenuDrawerProps> = ({
  isOpen,
  onClose,
  travelCount,
  xp,
  coins,
  voiceSettings,
  onUpdateVoiceSettings,
  onNavigateTo,
  onOpenHub,
}) => {
  const [ambienceState, setAmbienceState] = useState(() => decadeAmbience.getState());
  const [character, setCharacter] = useState<CustomTravelerCharacter>(() => getStoredCharacter());

  React.useEffect(() => {
    const unsub = decadeAmbience.subscribe((state) => {
      setAmbienceState(state);
    });
    return () => unsub();
  }, []);

  // Sync profile when opened or updated
  React.useEffect(() => {
    if (!isOpen) return;
    setCharacter(getStoredCharacter());
  }, [isOpen]);

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

  if (!isOpen) return null;

  const { currentRank, fluxIntensity } = getRankForPlayer(travelCount, xp);

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex justify-start bg-black/80 backdrop-blur-sm animate-fadeIn select-none"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md bg-gradient-to-b from-[#0f1b38] via-[#0b1328] to-[#070c1b] border-r-2 border-sky-400/40 shadow-2xl h-full flex flex-col overflow-hidden"
      >
        {/* Top Header */}
        <div className="p-4 sm:p-5 bg-[#14234a] border-b border-sky-500/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-sky-400 to-indigo-600 text-white font-black shadow-lg">
              <Settings className="w-5 h-5 animate-spin-slow" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <span>Ajustes, Voz & Control</span>
              </h2>
              <p className="text-xs text-sky-200">
                Configuración del copiloto temporal Leo y audio
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-5">
          {/* Promotion Card to open Experiences Hub */}
          <div
            onClick={() => {
              sounds.playClick();
              onClose();
              onOpenHub();
            }}
            className="p-3.5 rounded-2xl bg-gradient-to-r from-purple-900/60 via-indigo-900/60 to-purple-950/70 border-2 border-purple-400/50 hover:border-purple-300 transition-all cursor-pointer shadow-lg group hover:scale-[1.02]"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-purple-500/30 border border-purple-400/40 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                  🎮
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white group-hover:text-purple-200">
                    ¿Buscas los Minijuegos y Actividades?
                  </h4>
                  <p className="text-xs text-purple-300">
                    Toca aquí o usa el botón flotante inferior derecho
                  </p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-purple-300 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Section 1: Voice Controls & Intelligent Assistant */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-sky-400 flex items-center gap-1.5">
              <Mic className="w-3.5 h-3.5" />
              <span>Voz Inteligente & Asistente</span>
            </h3>

            {/* Siri / Alexa Voice Assistant Card */}
            <div
              onClick={() => {
                sounds.playSiriWake();
                onClose();
                onNavigateTo('siri-leo');
              }}
              className="p-3.5 rounded-2xl bg-gradient-to-r from-cyan-950/60 to-blue-950/60 border border-cyan-400/40 hover:border-cyan-300 transition-all cursor-pointer shadow-md group hover:scale-[1.01]"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                    🎙️
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white group-hover:text-cyan-200">
                      Modo Alexa / Siri de Leo
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Habla con tu micrófono y pregúntale sobre cualquier año o tarea escolar.
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-cyan-400 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Salón de Lengua Castellana Shortcut */}
            <div
              onClick={() => {
                sounds.playClick();
                onClose();
                onNavigateTo('lengua-castellana');
              }}
              className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-950/70 via-orange-950/60 to-[#121f3d] border border-amber-400/50 hover:border-amber-300 transition-all cursor-pointer shadow-md group hover:scale-[1.01]"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/25 border border-amber-400/40 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                    📖
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white group-hover:text-amber-200 flex items-center gap-1.5">
                      <span>Salón de Lengua Castellana</span>
                      <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30">
                        Nuevo
                      </span>
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Gabo, Rivera, Nadaísmo, diccionario de colombianismos y taller de cuentos del siglo XX.
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-amber-400 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Ranking en Tiempo Real Shortcut */}
            <div
              onClick={() => {
                sounds.playFanfare();
                onClose();
                onNavigateTo('traveler-ranking');
              }}
              className="p-3.5 rounded-2xl bg-gradient-to-r from-yellow-950/60 via-amber-950/60 to-[#121f3d] border border-yellow-400/50 hover:border-yellow-300 transition-all cursor-pointer shadow-md group hover:scale-[1.01]"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-yellow-500/25 border border-yellow-400/40 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                    🏆
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white group-hover:text-yellow-200 flex items-center gap-1.5">
                      <span>Ranking de Viajeros en Vivo</span>
                      <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                        En Directo
                      </span>
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Compara tus saltos temporales y racha con los mejores estudiantes de Colombia.
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-yellow-400 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Perfil del Crononauta Registrado */}
            <div
              onClick={() => {
                sounds.playClick();
                onClose();
                onNavigateTo('student-registration');
              }}
              className="p-3.5 rounded-2xl bg-gradient-to-r from-sky-950/70 via-indigo-950/70 to-[#121f3d] border border-sky-400/50 hover:border-sky-300 transition-all cursor-pointer shadow-md group hover:scale-[1.01]"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-sky-500/25 border border-sky-400/50 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                    {character.avatarIcon || '🚀'}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <h4 className="text-sm font-bold text-white group-hover:text-sky-200">
                        {character.name || 'Crononauta'}
                      </h4>
                      <span className="text-[10px] font-bold text-emerald-300 bg-emerald-500/20 border border-emerald-400/40 px-1.5 py-0.2 rounded-full">
                        ✓ Registrado
                      </span>
                    </div>
                    <p className="text-xs text-sky-200/90 font-medium">
                      {character.school} • {character.grade}
                    </p>
                    <p className="text-[11px] text-slate-400">
                      Toca si deseas actualizar tu nombre o colegio.
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-sky-400 group-hover:translate-x-1 transition-transform flex-shrink-0 mt-1" />
              </div>
            </div>

            {/* Factor Sorpresa: Modo Jurados & Diploma Souvenir */}
            <div
              onClick={() => {
                sounds.playFanfare();
                onClose();
                onNavigateTo('stem-kiosk');
              }}
              className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-950/70 via-orange-950/60 to-[#121f3d] border border-amber-400/60 hover:border-amber-300 transition-all cursor-pointer shadow-md group hover:scale-[1.01]"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/25 border border-amber-400/40 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                    🎖️
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white group-hover:text-amber-200 flex items-center gap-1.5">
                      <span>Modo Jurados & Diploma Souvenir</span>
                      <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30">
                        Feria STEM
                      </span>
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Imprime el diploma oficial para jurados y consulta la ficha técnica de evaluación.
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-amber-400 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Buzón de Sugerencias Shortcut */}
            <div
              onClick={() => {
                sounds.playClick();
                onClose();
                onNavigateTo('suggestion-box');
              }}
              className="p-3.5 rounded-2xl bg-gradient-to-r from-slate-900/80 to-[#14203e] border border-amber-400/40 hover:border-amber-300 transition-all cursor-pointer shadow-md group hover:scale-[1.01]"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                    📬
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white group-hover:text-amber-200 flex items-center gap-1.5">
                      <span>Buzón de Sugerencias & Votos</span>
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Deja tu calificación de 1 a 5 estrellas y recomendaciones para la feria escolar.
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-amber-400 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Mapa Mental Cuántico Shortcut */}
            <div
              onClick={() => {
                sounds.playClick();
                onClose();
                onNavigateTo('mind-map');
              }}
              className="p-3.5 rounded-2xl bg-gradient-to-r from-slate-900/80 to-[#0e2448] border border-cyan-400/40 hover:border-cyan-300 transition-all cursor-pointer shadow-md group hover:scale-[1.01]"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                    🧠
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white group-hover:text-cyan-200 flex items-center gap-1.5">
                      <span>Mapa Mental Cuántico</span>
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Navega por los nodos interconectados de Economía, Paz, Sociedad, Medios y Cultura.
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-cyan-400 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Voice Calibration Modal Shortcut */}
            <div
              onClick={() => {
                sounds.playClick();
                onClose();
                onNavigateTo('voice-settings');
              }}
              className="p-3.5 rounded-2xl bg-gradient-to-r from-slate-900/80 to-[#121f3d] border border-sky-400/30 hover:border-sky-300 transition-all cursor-pointer shadow-md group hover:scale-[1.01]"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-sky-500/20 border border-sky-400/40 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                    ⚙️
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white group-hover:text-sky-200 flex items-center gap-2">
                      <span>Calibrador de Prosodia & Voz</span>
                      <span className="text-[9px] font-mono font-bold uppercase px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                        {voiceSettings.prosodyMode === 'pedagogico'
                          ? 'Pedagógico'
                          : voiceSettings.prosodyMode === 'expresivo'
                          ? 'Expresivo'
                          : voiceSettings.prosodyMode === 'lineal'
                          ? 'Lineal'
                          : 'Humano'}
                      </span>
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Modula entonación según signos gramaticales, pausas de respiración y voces neurales.
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-sky-400 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>

          {/* Section 2: Quick Audio Toggles */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
              <Volume2 className="w-3.5 h-3.5" />
              <span>Interruptores Rápidos de Audio</span>
            </h3>

            <div className="p-3.5 rounded-2xl bg-[#091124] border border-slate-700/70 space-y-3">
              {/* Auto Speak Toggle */}
              <div className="flex items-center justify-between gap-3">
                <div>
                  <span className="text-xs font-bold text-white block">Narración Automática al Viajar</span>
                  <span className="text-[11px] text-slate-400">Leo hablará al instante al llegar a un año</span>
                </div>
                <button
                  onClick={() => {
                    sounds.playClick();
                    onUpdateVoiceSettings({ autoSpeak: !voiceSettings.autoSpeak });
                  }}
                  className={`w-12 h-6 rounded-full p-1 transition-colors duration-200 ease-in-out ${
                    voiceSettings.autoSpeak ? 'bg-emerald-500' : 'bg-slate-700'
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white transition-transform duration-200 ease-in-out ${
                      voiceSettings.autoSpeak ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              <div className="h-px bg-slate-800" />

              {/* Master Voice Enabled */}
              <div className="flex items-center justify-between gap-3">
                <div>
                  <span className="text-xs font-bold text-white block">Voz Narradora de Leo</span>
                  <span className="text-[11px] text-slate-400">Activar o silenciar síntesis de voz</span>
                </div>
                <button
                  onClick={() => {
                    sounds.playClick();
                    onUpdateVoiceSettings({ enabled: !voiceSettings.enabled });
                  }}
                  className={`w-12 h-6 rounded-full p-1 transition-colors duration-200 ease-in-out ${
                    voiceSettings.enabled ? 'bg-sky-500' : 'bg-slate-700'
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white transition-transform duration-200 ease-in-out ${
                      voiceSettings.enabled ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              <div className="h-px bg-slate-800" />

              {/* Master Ambient Soundscape Toggle */}
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-white block">Ambientación Sonora de Décadas</span>
                      <span className="text-[10px] px-1.5 py-0.2 rounded-full font-bold bg-amber-500/20 text-amber-300 border border-amber-400/30">
                        {ambienceState.info.icon} {ambienceState.info.decade}
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-400 block truncate">
                      {ambienceState.info.name}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      sounds.playClick();
                      decadeAmbience.togglePlay();
                    }}
                    className={`w-12 h-6 rounded-full p-1 transition-colors duration-200 ease-in-out ${
                      ambienceState.isPlaying ? 'bg-amber-500' : 'bg-slate-700'
                    }`}
                    title={ambienceState.isPlaying ? 'Pausar ambientación' : 'Activar ambientación'}
                  >
                    <div
                      className={`w-4 h-4 rounded-full bg-white transition-transform duration-200 ease-in-out ${
                        ambienceState.isPlaying ? 'translate-x-6' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                {/* Volume slider for ambient sound */}
                {ambienceState.isPlaying && (
                  <div className="flex items-center justify-between gap-2 pt-1 bg-[#0e1832] px-2.5 py-1.5 rounded-xl border border-slate-700/50">
                    <span className="text-[10px] text-slate-400 uppercase font-bold">Volumen:</span>
                    <div className="flex items-center gap-2">
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.05"
                        value={ambienceState.volume}
                        onChange={(e) => decadeAmbience.setVolume(parseFloat(e.target.value))}
                        className="w-24 h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-400"
                      />
                      <span className="text-[10px] font-mono text-amber-300 w-7 text-right">
                        {Math.round(ambienceState.volume * 100)}%
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Section 3: Student Status & Explorer Rank */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5" />
              <span>Perfil & Progreso del Alumno</span>
            </h3>

            {/* Registered Student Info Card */}
            <div className="p-3.5 rounded-2xl bg-gradient-to-r from-[#0c1830] to-[#122346] border border-sky-400/40 space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-sky-500/20 border border-sky-400/50 flex items-center justify-center text-2xl shadow-inner">
                    {character.avatarIcon || '🚀'}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-black text-white">{character.name || 'Crononauta'}</span>
                      <span className="text-[9px] font-bold text-emerald-300 bg-emerald-500/20 px-1.5 py-0.2 rounded-full border border-emerald-400/40">
                        ✓ Activo
                      </span>
                    </div>
                    <span className="text-xs text-sky-200 block truncate max-w-[200px]">
                      {character.school}
                    </span>
                    <span className="text-[10px] text-slate-400 block">
                      {character.grade} • {character.municipality || 'Montería'}, {character.department || 'Córdoba'}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    sounds.playClick();
                    onClose();
                    onNavigateTo('student-registration');
                  }}
                  className="px-2.5 py-1.5 rounded-xl bg-sky-600/30 hover:bg-sky-600/50 border border-sky-400/50 text-[11px] font-bold text-sky-200 transition-all hover:scale-105 active:scale-95"
                  title="Modificar datos registrados"
                >
                  ✏️ Editar
                </button>
              </div>

              <div className="bg-emerald-500/10 border border-emerald-400/30 rounded-xl px-2.5 py-1.5 flex items-center gap-2 text-[10px] text-emerald-300">
                <span>🛡️</span>
                <span>Tus datos están registrados y listos para los certificados y el ranking.</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-gradient-to-r from-[#0c1830] to-[#122346] border border-emerald-400/40 space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{currentRank.badgeIcon}</span>
                  <div>
                    <span className="text-xs text-slate-400 block font-bold uppercase">Rango Actual</span>
                    <span className="text-sm font-black text-emerald-300">{currentRank.title}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono font-bold text-amber-400">{coins} ⚡</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs pt-1 border-t border-slate-700/60">
                <div className="p-2 rounded-xl bg-black/30">
                  <span className="text-slate-400 block text-[10px]">Viajes Realizados</span>
                  <span className="font-bold text-white">{travelCount} saltos</span>
                </div>
                <div className="p-2 rounded-xl bg-black/30">
                  <span className="text-slate-400 block text-[10px]">Experiencia XP</span>
                  <span className="font-bold text-white">{xp} pts</span>
                </div>
              </div>
            </div>
          </div>

          {/* Section: Export to GitHub & Vercel */}
          <div className="space-y-2.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
              <Download className="w-3.5 h-3.5" />
              <span>Subir a GitHub y Vercel (Sitio Propio)</span>
            </h3>

            <a
              href="/download-zip"
              download="leo-en-el-tiempo.zip"
              onClick={() => sounds.playCoin()}
              className="block p-3.5 rounded-2xl bg-gradient-to-r from-amber-950/40 via-[#131c36] to-sky-950/40 border border-amber-400/50 hover:border-amber-400 transition-all group shadow-lg cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300 group-hover:scale-105 transition-transform flex-shrink-0">
                    <Download className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white group-hover:text-amber-300 flex items-center gap-1.5 flex-wrap">
                      <span>Descargar Código Completo (.ZIP)</span>
                      <span className="text-[9px] px-1.5 py-0.2 rounded font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">Para GitHub</span>
                    </h4>
                    <p className="text-[11px] text-slate-300 mt-0.5">
                      Incluye <span className="text-amber-300 font-mono">vercel.json</span>, <span className="text-amber-300 font-mono">firebase.json</span> y la guía paso a paso.
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-amber-400 flex-shrink-0" />
              </div>
            </a>
          </div>

          {/* Section 4: Pedagogical Project Info */}
          <div className="space-y-2.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Proyecto STEAM+ & Cátedra de Paz</span>
            </h3>

            <div
              onClick={() => {
                sounds.playClick();
                onClose();
                onNavigateTo('steam-info');
              }}
              className="p-3.5 rounded-2xl bg-[#091122] hover:bg-[#0f1b34] border border-indigo-400/30 transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-white group-hover:text-indigo-300">
                    Feria de la Ciencia y Ciencias Sociales
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    Estándares MEN, Cátedra de Paz y Colombia Siglo XX (1900-1999).
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-indigo-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3.5 bg-[#080d1a] border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>🇨🇴 Leo en el Tiempo v2.5</span>
          <button
            onClick={() => {
              sounds.playClick();
              onClose();
            }}
            className="text-sky-400 font-bold hover:underline"
          >
            Cerrar Menú
          </button>
        </div>
      </div>
    </div>
  );
};
