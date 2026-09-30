import React, { useState } from 'react';
import { Sparkles, Volume2, VolumeX, Square, Mic, Zap, Shirt, Award, ChevronRight, Info, Compass, Shield, Flame } from 'lucide-react';
import { AvatarItem } from '../types';
import { Leo2DAvatar } from './Leo2DAvatar';
import { sounds } from '../utils/soundEffects';
import { getRankForPlayer, EXPLORER_RANKS } from '../data/explorerRanks';

interface LeoCharacterProps {
  currentEraText: string;
  isTraveling: boolean;
  speaking: boolean;
  lastSpokenPhrase: string;
  onOpenVoiceAssistant: () => void;
  onOpenCustomizer: () => void;
  onReplaySpeech: () => void;
  onStopSpeech: () => void;
  equippedItems: Record<string, AvatarItem>;
  travelCount: number;
  xp: number;
  isPartyMode?: boolean;
}

export const LeoCharacter: React.FC<LeoCharacterProps> = ({
  currentEraText,
  isTraveling,
  speaking,
  lastSpokenPhrase,
  onOpenVoiceAssistant,
  onOpenCustomizer,
  onReplaySpeech,
  onStopSpeech,
  equippedItems,
  travelCount,
  xp,
  isPartyMode = false,
}) => {
  const [bubbleExpanded, setBubbleExpanded] = useState(true);
  const [showRanksModal, setShowRanksModal] = useState(false);

  const { currentRank, nextRank, progressPercent, jumpsNeeded, xpNeeded, fluxIntensity } =
    getRankForPlayer(travelCount, xp);

  return (
    <div className="relative flex flex-col items-center select-none w-full">
      {/* Dynamic Speech Bubble from Leo */}
      {lastSpokenPhrase && bubbleExpanded && (
        <div className="relative mb-3 w-full bg-gradient-to-br from-[#122244] to-[#1a315e] border-2 border-sky-400/40 rounded-3xl p-3.5 shadow-[0_0_20px_rgba(56,189,248,0.3)] animate-fadeIn">
          {/* Triangular Tail */}
          <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#1a315e] rotate-45 border-r-2 border-b-2 border-sky-400/40" />

          <div className="flex items-center justify-between gap-2 mb-1.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-sky-300">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span>Bitácora de la Expedición:</span>
            </div>
            {speaking && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  sounds.playClick();
                  onStopSpeech();
                }}
                className="flex items-center gap-1 text-[11px] text-white font-black bg-rose-600 hover:bg-rose-500 px-2.5 py-0.5 rounded-full border border-rose-400 shadow-md animate-pulse active:scale-95 transition-all cursor-pointer"
                title="Detener voz de Leo de inmediato"
              >
                <Square className="w-2.5 h-2.5 fill-current text-white" />
                <span>⏹️ Callar a Leo</span>
              </button>
            )}
          </div>

          <p className="text-sm font-medium text-slate-100 leading-relaxed italic">
            "{lastSpokenPhrase}"
          </p>

          {/* Action Button: Stop speech if speaking, or replay if silent */}
          <div className="mt-2.5 pt-2 border-t border-sky-400/20 flex flex-col sm:flex-row items-center gap-2">
            {speaking ? (
              <button
                onClick={() => {
                  sounds.playClick();
                  onStopSpeech();
                }}
                className="w-full py-2.5 px-3 rounded-xl text-xs font-black flex items-center justify-center gap-2 transition-all shadow-lg bg-gradient-to-r from-rose-600 via-red-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white animate-pulse shadow-[0_0_15px_rgba(239,68,68,0.6)] cursor-pointer active:scale-95"
                title="Detener inmediatamente la voz de Leo sin esperar a que termine"
              >
                <VolumeX className="w-4 h-4 text-white" />
                <span>⏹️ Detener voz de Leo (Silenciar ahora)</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  sounds.playClick();
                  onReplaySpeech();
                }}
                className="w-full py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-md bg-gradient-to-r from-sky-600/40 to-indigo-600/40 hover:from-sky-500/60 hover:to-indigo-500/60 text-sky-100 border border-sky-400/50 hover:scale-[1.02] cursor-pointer"
                title="Haz clic para volver a escuchar la narración con la voz de Leo"
              >
                <Volume2 className="w-4 h-4 text-sky-300" />
                <span>🔁 Repetir voz de Leo</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Leo 2D Character Holographic Stage */}
      <div className="relative group flex flex-col items-center">
        {/* Hologram Stage Glow */}
        <div
          className={`absolute -inset-4 rounded-full blur-xl transition-all duration-500 ${
            isPartyMode
              ? 'bg-gradient-to-r from-pink-500/70 via-amber-400/60 to-purple-600/70 opacity-100 scale-125 animate-pulse'
              : speaking || isTraveling
              ? 'bg-gradient-to-r from-sky-500/50 via-amber-400/40 to-indigo-500/50 opacity-100 scale-115 animate-pulse'
              : 'bg-gradient-to-r from-sky-500/30 via-amber-400/20 to-indigo-500/30 opacity-60 group-hover:opacity-90'
          }`}
        />

        {/* 2D Leo Avatar */}
        <div
          className={`relative z-10 transition-transform duration-300 ${
            isTraveling ? 'scale-115 animate-bounce' : isPartyMode ? 'scale-110 animate-pulse' : 'group-hover:scale-105'
          }`}
        >
          <Leo2DAvatar
            equippedItems={equippedItems}
            size="lg"
            speaking={speaking}
            interactive={true}
            onTap={() => {
              sounds.playPop();
            }}
          />
        </div>

        {/* Holographic Pedestal Disc beneath Leo */}
        <div
          className={`relative -mt-6 w-36 h-8 rounded-full border shadow-lg flex items-center justify-center transition-all ${
            isPartyMode
              ? 'bg-gradient-to-r from-pink-500/30 via-amber-400/60 to-purple-500/30 border-pink-400 shadow-[0_0_25px_rgba(236,72,153,0.7)]'
              : 'bg-gradient-to-r from-sky-500/20 via-sky-400/50 to-indigo-500/20 border-sky-400/50 shadow-[0_0_15px_rgba(56,189,248,0.5)]'
          }`}
        >
          <div className="w-24 h-4 bg-sky-400/30 rounded-full blur-xs animate-pulse" />
        </div>

        {/* Interactive Floating Quick Action Badges */}
        <div className="flex items-center gap-2 mt-2 z-20">
          <button
            onClick={() => {
              sounds.playClick();
              onOpenCustomizer();
            }}
            className="bg-gradient-to-r from-amber-500 to-orange-500 text-black text-xs font-bold px-3 py-1 rounded-full shadow-lg border border-amber-300 hover:scale-105 transition-transform flex items-center gap-1.5"
          >
            <Shirt className="w-3.5 h-3.5" />
            <span>Vestidor 2D</span>
          </button>

          <button
            onClick={() => {
              sounds.playSiriWake();
              onOpenVoiceAssistant();
            }}
            className="bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-600 text-white text-xs font-bold px-3.5 py-1 rounded-full shadow-lg border border-sky-300 hover:scale-105 transition-transform flex items-center gap-1.5 shadow-[0_0_15px_rgba(56,189,248,0.4)] animate-pulse"
          >
            <Mic className="w-3.5 h-3.5 text-amber-300" />
            <span>Habla con Leo</span>
          </button>
        </div>
      </div>

      {/* Name and Current Coordinates */}
      <div className="mt-3 text-center w-full">
        <h2 className="text-base sm:text-lg font-bold text-white flex items-center justify-center gap-1.5">
          <span>Leo el Explorador</span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
        </h2>
        <p className="text-xs text-sky-300 font-digital tracking-wide">
          UBICACIÓN: {currentEraText}
        </p>
      </div>

      {/* EXPLORER RANK & QUANTUM INTENSITY BADGE (Requested by user) */}
      <div className="mt-4 w-full bg-gradient-to-b from-[#0c1630] to-[#080d1f] border-2 border-amber-400/40 rounded-2xl p-3.5 shadow-xl relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-full blur-xl pointer-events-none" />

        {/* Top Header of the Rank Card */}
        <div className="flex items-center justify-between gap-2 border-b border-sky-500/20 pb-2 mb-2.5">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-lg shadow-md border border-amber-300/40">
              {currentRank.badgeIcon}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-digital uppercase font-bold text-amber-400">
                  NIVEL {currentRank.level}
                </span>
                <span className="text-[9px] bg-sky-500/20 text-sky-300 border border-sky-400/30 px-1.5 py-0.2 rounded-full font-digital">
                  {travelCount} VIAJES
                </span>
              </div>
              <h3 className="text-xs sm:text-sm font-black text-white leading-tight">
                {currentRank.title}
              </h3>
            </div>
          </div>

          <button
            onClick={() => {
              sounds.playClick();
              setShowRanksModal(true);
            }}
            className="p-1 text-slate-400 hover:text-amber-300 transition-colors"
            title="Ver todos los rangos de explorador"
          >
            <Info className="w-4 h-4" />
          </button>
        </div>

        {/* Quantum Flight Intensity Meter (Gauge) */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-slate-300 flex items-center gap-1 font-medium">
              <Flame className="w-3.5 h-3.5 text-orange-400 animate-pulse" />
              Intensidad de Vuelo:
            </span>
            <span className="font-digital font-bold text-amber-400">
              ⚡ {fluxIntensity}% Flujo Cuántico
            </span>
          </div>

          {/* Segmented Intensity Bar */}
          <div className="w-full h-2.5 bg-[#060b17] rounded-full p-0.5 border border-sky-500/30 flex overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-amber-400 to-rose-500 transition-all duration-700 shadow-[0_0_10px_rgba(245,158,11,0.5)]"
              style={{ width: `${fluxIntensity}%` }}
            />
          </div>
        </div>

        {/* Progress to Next Rank */}
        <div className="mt-2.5 pt-2 border-t border-slate-800/80 text-[10px] text-slate-300">
          {nextRank ? (
            <div className="flex items-center justify-between">
              <span>
                Próximo: <strong className="text-amber-300">{nextRank.title}</strong>
              </span>
              <span className="text-sky-300 font-digital">
                Faltan {jumpsNeeded} viajes ({progressPercent}%)
              </span>
            </div>
          ) : (
            <div className="text-center font-bold text-amber-400 flex items-center justify-center gap-1">
              <span>👑 ¡Rango Máximo Alcanzado! Leyenda Histórica</span>
            </div>
          )}
        </div>
      </div>

      {/* Ranks Info Modal */}
      {showRanksModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#0b1429] border-2 border-amber-400/60 rounded-3xl p-5 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-sky-500/30 pb-3">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-bold text-white">
                  Rangos del Explorador Cuántico
                </h3>
              </div>
              <button
                onClick={() => setShowRanksModal(false)}
                className="text-slate-400 hover:text-white p-1"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-sky-200">
              Sube de rango realizando saltos temporales, respondiendo retos y consultando tareas de Ciencias Sociales:
            </p>

            <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-1">
              {EXPLORER_RANKS.map((rank) => {
                const isCurrent = rank.id === currentRank.id;
                return (
                  <div
                    key={rank.id}
                    className={`p-3 rounded-2xl border transition-all flex items-center gap-3 ${
                      isCurrent
                        ? 'bg-amber-500/20 border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.3)]'
                        : 'bg-[#101b38] border-slate-700/60 opacity-80'
                    }`}
                  >
                    <div className="text-2xl w-10 h-10 rounded-xl bg-[#060b17] border border-amber-400/40 flex items-center justify-center flex-shrink-0">
                      {rank.badgeIcon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-1.5">
                        <h4 className="text-xs font-bold text-white">{rank.title}</h4>
                        {isCurrent && (
                          <span className="text-[9px] bg-amber-400 text-black font-bold px-1.5 py-0.2 rounded-md">
                            ACTUAL
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-300">{rank.description}</p>
                      <div className="flex items-center gap-2 mt-1 text-[10px] text-amber-300 font-digital">
                        <span>Requisito: {rank.minJumps} viajes • {rank.minXP} XP</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              onClick={() => setShowRanksModal(false)}
              className="w-full py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs shadow-md transition-all"
            >
              ¡Entendido, a seguir explorando!
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
