import React, { useEffect } from 'react';
import { Flame, Sparkles, Trophy, X } from 'lucide-react';
import { TravelStreakResult } from '../data/explorationStreak';

interface StreakCelebrationToastProps {
  streakResult: TravelStreakResult | null;
  onDismiss: () => void;
}

export const StreakCelebrationToast: React.FC<StreakCelebrationToastProps> = ({
  streakResult,
  onDismiss,
}) => {
  useEffect(() => {
    if (streakResult) {
      const timer = setTimeout(() => {
        onDismiss();
      }, 7000);
      return () => clearTimeout(timer);
    }
  }, [streakResult, onDismiss]);

  if (!streakResult) return null;

  const isDay5 = streakResult.isMilestoneDay5;

  return (
    <div className="fixed top-16 sm:top-20 left-1/2 -translate-x-1/2 z-50 w-11/12 max-w-lg animate-bounce-short select-none">
      <div
        className={`p-4 rounded-2xl border-2 shadow-2xl flex items-start gap-3 relative overflow-hidden backdrop-blur-md ${
          isDay5
            ? 'bg-gradient-to-r from-amber-900/95 via-purple-900/95 to-rose-900/95 border-amber-400 text-white shadow-amber-500/40'
            : 'bg-gradient-to-r from-[#111f3d]/95 via-[#1a2b54]/95 to-[#16274e]/95 border-amber-400/60 text-amber-100 shadow-orange-500/30'
        }`}
      >
        <div
          className={`p-2.5 rounded-2xl shrink-0 flex items-center justify-center ${
            isDay5
              ? 'bg-gradient-to-tr from-amber-400 to-yellow-300 text-slate-950 animate-spin-slow'
              : 'bg-amber-500/20 text-amber-300 border border-amber-400/40'
          }`}
        >
          {isDay5 ? (
            <Trophy className="w-6 h-6 text-slate-950" />
          ) : (
            <Flame className="w-6 h-6 text-amber-400 fill-amber-400 animate-pulse" />
          )}
        </div>

        <div className="flex-1 space-y-1">
          <div className="flex items-center gap-2">
            <span
              className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                isDay5
                  ? 'bg-amber-400 text-slate-950'
                  : 'bg-orange-500/30 text-orange-200 border border-orange-400/40'
              }`}
            >
              {isDay5 ? '¡HITO SUPREMO!' : `RACHA DE EXPLORACIÓN • DÍA ${streakResult.newStreak}`}
            </span>
            <span className="text-xs font-mono font-bold text-amber-300">
              Multiplicador: x{streakResult.multiplier.toFixed(2)}
            </span>
          </div>

          <h4 className="text-sm sm:text-base font-black text-white leading-tight">
            {isDay5
              ? '👑 ¡5 Días Consecutivos de Viajes en el Tiempo!'
              : `¡Avanzaste al Día ${streakResult.newStreak} de tu Racha!`}
          </h4>

          <p className="text-xs text-slate-200 leading-relaxed">
            {streakResult.message}
          </p>

          {streakResult.bonusCoinsWon > 0 && (
            <div className="inline-flex items-center gap-1.5 pt-1 text-xs font-bold text-amber-300">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>+{streakResult.bonusCoinsWon} Monedas añadidas a tu saldo</span>
            </div>
          )}
        </div>

        <button
          onClick={onDismiss}
          className="p-1 rounded-lg bg-black/30 hover:bg-black/50 text-slate-400 hover:text-white transition-colors shrink-0"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
