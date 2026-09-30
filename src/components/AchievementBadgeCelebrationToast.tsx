import React, { useEffect } from 'react';
import { Award, Sparkles, CheckCircle, X, Zap } from 'lucide-react';
import { sounds } from '../utils/soundEffects';
import { triggerConfetti } from '../utils/confetti';

export interface AchievementBadge {
  id: string;
  title: string;
  category: string;
  description: string;
  icon: string;
  xpReward: number;
  coinReward: number;
}

interface AchievementBadgeCelebrationToastProps {
  achievement: AchievementBadge | null;
  onDismiss: () => void;
}

export const AchievementBadgeCelebrationToast: React.FC<AchievementBadgeCelebrationToastProps> = ({
  achievement,
  onDismiss,
}) => {
  useEffect(() => {
    if (achievement) {
      sounds.playFanfare();
      triggerConfetti(0.5, 0.35);

      const timer = setTimeout(() => {
        onDismiss();
      }, 7000);

      return () => clearTimeout(timer);
    }
  }, [achievement, onDismiss]);

  if (!achievement) return null;

  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 w-full max-w-md px-3 animate-bounceIn select-none">
      <div className="relative bg-gradient-to-r from-[#17274f] via-[#21163e] to-[#2e1d09] border-2 border-amber-400/90 rounded-3xl p-4 sm:p-5 shadow-[0_0_40px_rgba(245,158,11,0.5)] overflow-hidden">
        {/* Glowing backdrop aura */}
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-amber-400/20 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-sky-400/20 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-start gap-4">
          {/* Animated Sparkling Badge Medallion */}
          <div className="relative flex-shrink-0">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-tr from-amber-400 via-yellow-300 to-orange-500 border-2 border-white flex items-center justify-center text-3xl sm:text-4xl shadow-xl animate-pulse">
              {achievement.icon}
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 border border-white flex items-center justify-center text-white text-xs font-black shadow">
              ✓
            </div>
          </div>

          {/* Achievement Content Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-1">
              <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-amber-300 bg-amber-500/25 px-2 py-0.5 rounded-full border border-amber-400/40 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-300" />
                <span>¡Logro Desbloqueado!</span>
              </span>

              <button
                onClick={onDismiss}
                className="text-slate-400 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
                title="Cerrar notificación"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <h3 className="text-sm sm:text-base font-black text-white mt-1.5 leading-snug">
              {achievement.title}
            </h3>

            <p className="text-xs text-slate-300 leading-relaxed mt-0.5">
              {achievement.description}
            </p>

            {/* Rewards Won Badges */}
            <div className="flex items-center gap-2 mt-2.5">
              {achievement.xpReward > 0 && (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-sky-200 bg-sky-500/20 border border-sky-400/30 px-2 py-0.5 rounded-lg">
                  <Zap className="w-3 h-3 text-sky-400" />
                  <span>+{achievement.xpReward} XP</span>
                </span>
              )}
              {achievement.coinReward > 0 && (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-300 bg-amber-500/20 border border-amber-400/40 px-2 py-0.5 rounded-lg">
                  <span>🪙</span>
                  <span>+{achievement.coinReward} Monedas</span>
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
