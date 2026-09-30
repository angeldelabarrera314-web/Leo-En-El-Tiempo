import React from 'react';
import {
  ArrowLeft,
  X,
  Flame,
  Zap,
  Sparkles,
  Trophy,
  CheckCircle2,
  Lock,
  Calendar,
  Gift,
  Coins,
  Rocket,
  ShieldCheck,
  RefreshCw,
  Compass,
} from 'lucide-react';
import {
  STREAK_DAYS_CONFIG,
  ExplorationStreakData,
  getMultiplierForStreak,
  getMultiplierLabelForStreak,
} from '../data/explorationStreak';
import { sounds } from '../utils/soundEffects';
import { triggerConfetti } from '../utils/confetti';

interface ExplorationStreakModalProps {
  isOpen: boolean;
  onClose: () => void;
  streakData: ExplorationStreakData;
  onSimulateNextDay: () => void;
  onSimulateDay5: () => void;
  onResetStreak: () => void;
  onJumpToTimeMachine: () => void;
}

export const ExplorationStreakModal: React.FC<ExplorationStreakModalProps> = ({
  isOpen,
  onClose,
  streakData,
  onSimulateNextDay,
  onSimulateDay5,
  onResetStreak,
  onJumpToTimeMachine,
}) => {
  if (!isOpen) return null;

  const currentStreak = streakData.currentStreak;
  const currentMultiplier = getMultiplierForStreak(currentStreak);
  const currentMultiplierLabel = getMultiplierLabelForStreak(currentStreak);

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn select-none"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl bg-gradient-to-b from-[#161f38] via-[#0e162b] to-[#070b16] border-2 border-amber-400/40 rounded-3xl shadow-[0_0_60px_rgba(245,158,11,0.25)] overflow-hidden flex flex-col max-h-[92vh]"
      >
        {/* Header */}
        <div className="p-3.5 sm:p-4 bg-[#19274e] border-b border-amber-500/30 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <button
              onClick={onClose}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border border-amber-400/40 text-xs font-bold transition-all hover:scale-105"
              title="Volver a la cabina principal"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Volver</span>
            </button>

            <div className="p-2 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 text-slate-950 font-black shadow-md hidden sm:flex">
              <Flame className="w-5 h-5 fill-current animate-pulse" />
            </div>

            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span>Racha de Exploración Diaria</span>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-300 border border-orange-400/40">
                  5 DÍAS • MULTIPLICADORES
                </span>
              </h3>
              <p className="text-xs text-sky-200">
                Viaja al menos una vez al día en la máquina del tiempo para desbloquear hasta x2.0 monedas
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* Main Status Hero Card */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-950/40 via-orange-950/30 to-purple-950/40 border-2 border-amber-400/40 p-5 sm:p-6 shadow-xl">
            <div className="flex flex-col md:flex-row items-center justify-between gap-5">
              {/* Left Column: Streak details */}
              <div className="flex items-center gap-4 text-center md:text-left">
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-tr from-amber-500 via-orange-500 to-rose-500 p-1 shadow-[0_0_30px_rgba(245,158,11,0.5)] flex items-center justify-center shrink-0">
                  <div className="w-full h-full bg-[#0d1428] rounded-[22px] flex flex-col items-center justify-center">
                    <span className="text-3xl sm:text-4xl animate-bounce">🔥</span>
                    <span className="text-[11px] font-black text-amber-300 uppercase tracking-wider mt-0.5">
                      DÍA {currentStreak}
                    </span>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30 text-xs font-bold">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Multiplicador Activo: {currentMultiplierLabel}</span>
                  </div>
                  <h4 className="text-lg sm:text-xl font-black text-white">
                    {currentStreak === 0
                      ? '¡Empieza tu Racha Hoy!'
                      : currentStreak >= 5
                      ? '👑 ¡Racha Legendaria de 5 Días Activa!'
                      : `¡Llevas ${currentStreak} ${currentStreak === 1 ? 'Día Consecutivo' : 'Días Consecutivos'}!`}
                  </h4>
                  <p className="text-xs text-slate-300 max-w-md">
                    {streakData.hasTraveledToday
                      ? '✅ ¡Has cumplido con tu viaje en el tiempo de hoy! Tu racha está asegurada. Regresa mañana para avanzar al siguiente escalón.'
                      : '⏳ ¡Aún no has viajado en el tiempo hoy! Haz al menos un salto temporal para registrar tu avance y multiplicar tus ganancias.'}
                  </p>
                </div>
              </div>

              {/* Right Column: CTA Button */}
              <div className="flex flex-col items-center sm:items-end gap-2 shrink-0">
                {!streakData.hasTraveledToday ? (
                  <button
                    onClick={() => {
                      sounds.playHyperDrive();
                      onJumpToTimeMachine();
                      onClose();
                    }}
                    className="px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-orange-500/30 transition-all hover:scale-105 flex items-center gap-2"
                  >
                    <Rocket className="w-4 h-4" />
                    <span>¡Viajar en el Tiempo Ahora!</span>
                  </button>
                ) : (
                  <div className="px-4 py-2.5 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-bold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Viaje de Hoy Registrado</span>
                  </div>
                )}
                <span className="text-[11px] text-slate-400">
                  Total de días explorados: <strong className="text-amber-300">{streakData.totalDaysTraveled}</strong>
                </span>
              </div>
            </div>
          </div>

          {/* 5-Day Progression Roadmap */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-sky-200 uppercase tracking-wider flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-amber-400" />
                <span>Camino de los 5 Días de Retención</span>
              </h4>
              <span className="text-xs text-amber-300 font-bold">
                Objetivo: Desbloquear x2.0 en el Día 5
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5">
              {STREAK_DAYS_CONFIG.map((dayConfig) => {
                const isPassed = currentStreak > dayConfig.day;
                const isCurrent = currentStreak === dayConfig.day;
                const isLocked = currentStreak < dayConfig.day;

                let cardBorder = 'border-slate-700 bg-[#0a1122]/70 opacity-60';
                if (isPassed) {
                  cardBorder = 'border-emerald-500/50 bg-gradient-to-b from-[#0c2420] to-[#071311]';
                } else if (isCurrent) {
                  cardBorder =
                    'border-amber-400 bg-gradient-to-b from-[#2a1d0f] to-[#14101e] shadow-[0_0_20px_rgba(245,158,11,0.3)] scale-[1.02]';
                }

                return (
                  <div
                    key={dayConfig.day}
                    className={`rounded-2xl border-2 p-3 flex flex-col justify-between transition-all relative overflow-hidden ${cardBorder}`}
                  >
                    {/* Top status indicator */}
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-lg">{dayConfig.icon}</span>
                      {isPassed ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      ) : isCurrent ? (
                        <span className="px-1.5 py-0.5 rounded-full bg-amber-500 text-slate-950 font-black text-[9px] uppercase">
                          ACTUAL
                        </span>
                      ) : (
                        <Lock className="w-3.5 h-3.5 text-slate-500" />
                      )}
                    </div>

                    {/* Day label and Multiplier pill */}
                    <div className="space-y-1 my-1">
                      <div className="text-[11px] font-bold text-slate-400 uppercase tracking-tight">
                        {dayConfig.label}
                      </div>
                      <div className="text-sm font-black text-amber-300 flex items-center gap-1">
                        <Zap className="w-3.5 h-3.5 text-amber-400" />
                        <span>{dayConfig.multiplierLabel}</span>
                      </div>
                      <div className="text-[11px] font-bold text-white line-clamp-1">
                        {dayConfig.title}
                      </div>
                      <div className="text-[10px] text-slate-300 line-clamp-2 leading-tight">
                        {dayConfig.subtitle}
                      </div>
                    </div>

                    {/* Daily coin reward footer */}
                    <div className="mt-2 pt-2 border-t border-slate-700/50 flex items-center justify-between text-[10px]">
                      <span className="text-slate-400">Bono diario:</span>
                      <span className="font-bold text-amber-300 flex items-center gap-0.5">
                        <Coins className="w-3 h-3" />
                        +{dayConfig.bonusCoins}
                      </span>
                    </div>

                    {dayConfig.day === 5 && (
                      <div className="mt-1 text-[9px] font-bold text-rose-300 bg-rose-950/60 rounded px-1.5 py-0.5 text-center border border-rose-500/30">
                        + Emblema de Fuego 🔥
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Educational Note & Multiplier Table */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#0c1529] p-4 rounded-2xl border border-sky-500/20 space-y-2">
              <h5 className="text-xs font-bold text-sky-200 flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-sky-400" />
                <span>¿Cómo funciona la Racha de Exploración?</span>
              </h5>
              <ul className="text-xs text-slate-300 space-y-1.5 list-disc pl-4 leading-relaxed">
                <li>
                  <strong className="text-amber-300">1 Viaje Diario:</strong> Solo necesitas activar la máquina del tiempo y saltar a cualquier año entre 1900 y 1999.
                </li>
                <li>
                  <strong className="text-amber-300">Multiplicador en Todo:</strong> Las monedas ganadas en viajes, trivias y desafíos se multiplican por tu racha activa ({currentMultiplierLabel}).
                </li>
                <li>
                  <strong className="text-amber-300">Día 5 Legendario:</strong> Al llegar al quinto día consecutivo, alcanzas el multiplicador máximo de <strong>x2.0 (Doble)</strong> y desbloqueas el <em>Emblema del Crononauta Legendario</em> para vestir a Leo.
                </li>
              </ul>
            </div>

            <div className="bg-[#0c1529] p-4 rounded-2xl border border-amber-500/20 space-y-2">
              <h5 className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Ejemplo de Ganancia con tu Racha Actual ({currentMultiplierLabel})</span>
              </h5>
              <div className="space-y-1.5 text-xs text-slate-300">
                <div className="flex justify-between p-2 rounded-xl bg-slate-900/60">
                  <span>Salto en el Tiempo Base:</span>
                  <span className="font-bold text-amber-300">
                    25 🪙 → {Math.round(25 * currentMultiplier)} 🪙
                  </span>
                </div>
                <div className="flex justify-between p-2 rounded-xl bg-slate-900/60">
                  <span>Pregunta de Trivia Correcta:</span>
                  <span className="font-bold text-amber-300">
                    50 🪙 → {Math.round(50 * currentMultiplier)} 🪙
                  </span>
                </div>
                <div className="flex justify-between p-2 rounded-xl bg-slate-900/60">
                  <span>Misión Escolar de Ciencias Sociales:</span>
                  <span className="font-bold text-amber-300">
                    200 🪙 → {Math.round(200 * currentMultiplier)} 🪙
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Testing / Simulation Toolbar for Reviewers & Teachers */}
          <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-700/60 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <RefreshCw className="w-3.5 h-3.5 text-sky-400" />
                <span>Herramientas de Demostración & Prueba de Racha</span>
              </span>
              <span className="text-[10px] text-slate-500">
                Permite verificar los 5 días sin esperar días calendario reales
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2 pt-1">
              <button
                onClick={() => {
                  sounds.playClick();
                  sounds.playStreak(currentStreak + 1);
                  onSimulateNextDay();
                  triggerConfetti(0.4, 0.4);
                }}
                className="px-3 py-1.5 rounded-xl bg-sky-600/30 hover:bg-sky-600/50 border border-sky-400/50 text-sky-200 text-xs font-bold transition-all hover:scale-105 flex items-center gap-1.5"
                title="Avanzar artificialmente un día en el tiempo"
              >
                <Zap className="w-3.5 h-3.5 text-sky-300" />
                <span>Simular Salto Mañana (+1 Día)</span>
              </button>

              <button
                onClick={() => {
                  sounds.playFanfare();
                  sounds.playWheelJackpot();
                  onSimulateDay5();
                  triggerConfetti(0.6, 0.5);
                }}
                className="px-3 py-1.5 rounded-xl bg-amber-500/30 hover:bg-amber-500/50 border border-amber-400/50 text-amber-200 text-xs font-bold transition-all hover:scale-105 flex items-center gap-1.5"
                title="Probar inmediatamente el estado de 5 días y multiplicador x2.0"
              >
                <Trophy className="w-3.5 h-3.5 text-amber-300" />
                <span>Probar Día 5 (Modo Máximo x2.0)</span>
              </button>

              <button
                onClick={() => {
                  sounds.playClick();
                  onResetStreak();
                }}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-600 text-slate-400 hover:text-white text-xs font-medium transition-all"
                title="Reiniciar racha para probar desde el Día 1"
              >
                <span>Reiniciar Racha</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
