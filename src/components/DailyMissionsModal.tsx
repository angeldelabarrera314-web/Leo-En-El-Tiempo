import React from 'react';
import { X, ArrowLeft, Award, CheckCircle2, Circle, Sparkles, Trophy } from 'lucide-react';
import { Mission } from '../types';

interface DailyMissionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  missions: Mission[];
  onSelectMissionYear: (year: number) => void;
}

export const DailyMissionsModal: React.FC<DailyMissionsModalProps> = ({
  isOpen,
  onClose,
  missions,
  onSelectMissionYear,
}) => {
  if (!isOpen) return null;

  const completedCount = missions.filter((m) => m.completed).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-xl bg-gradient-to-b from-[#121f3d] to-[#0a1224] border-2 border-emerald-400/40 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-3.5 sm:p-4 bg-[#172b52] border-b border-emerald-500/30 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <button
              onClick={onClose}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-200 border border-emerald-400/40 text-xs font-bold transition-all hover:scale-105"
              title="Volver al Laboratorio Cuántico"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Volver atrás</span>
            </button>

            <div className="p-2 rounded-2xl bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 hidden sm:flex">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                <span>Misiones Escolares STEAM+</span>
                <span className="text-xs bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-2 py-0.5 rounded-full">
                  {completedCount}/{missions.length} Listas
                </span>
              </h3>
              <p className="text-xs text-emerald-200">
                Desafíos pedagógicos de Ciencias Sociales en el Siglo XX
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

        {/* Missions List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3">
          {missions.map((m) => (
            <div
              key={m.id}
              className={`p-4 rounded-2xl border transition-all flex items-start justify-between gap-3 ${
                m.completed
                  ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-100'
                  : 'bg-[#152345] border-slate-700/60 hover:border-sky-400/50'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="text-2xl mt-0.5">{m.icon}</div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase font-bold bg-sky-500/20 text-sky-300 px-2 py-0.5 rounded-full border border-sky-400/30">
                      {m.category}
                    </span>
                    {m.completed && (
                      <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> ¡Completada!
                      </span>
                    )}
                  </div>

                  <h4 className="text-sm font-bold text-white mt-1">
                    {m.title}
                  </h4>

                  <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                    {m.description}
                  </p>

                  <div className="flex items-center gap-2 mt-2 text-xs">
                    <span className="text-amber-300 font-bold flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-amber-400" />
                      +{m.xpReward} XP
                    </span>
                  </div>
                </div>
              </div>

              {!m.completed && (
                <button
                  onClick={() => {
                    onSelectMissionYear(m.targetYear);
                    onClose();
                  }}
                  className="whitespace-nowrap px-3 py-1.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white text-xs font-bold transition-all shadow-sm flex-shrink-0"
                >
                  Ir al {m.targetYear}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
