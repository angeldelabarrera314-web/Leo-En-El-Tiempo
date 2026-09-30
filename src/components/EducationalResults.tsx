import React from 'react';
import { TimeTravelResult } from '../types';
import { Volume2, Sparkles, Compass, HelpCircle, Radio, Smile, CheckCircle, Award } from 'lucide-react';

interface EducationalResultsProps {
  result: TimeTravelResult;
  onSpeakText: (text: string) => void;
  onOpenChallenge: () => void;
  onOpenMindMap?: () => void;
}

export const EducationalResults: React.FC<EducationalResultsProps> = ({
  result,
  onSpeakText,
  onOpenChallenge,
  onOpenMindMap,
}) => {
  return (
    <div className="space-y-4 animate-fadeIn">
      {/* Title Banner */}
      <div className="bg-gradient-to-r from-[#122248] via-[#172d5e] to-[#0e1a38] border-2 border-sky-400/40 rounded-3xl p-5 sm:p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-sky-500/20 pb-4 mb-4">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl">🇨🇴</span>
            <div>
              <span className="text-xs uppercase font-bold text-amber-300 tracking-wider">
                {result.yearOrEra}
              </span>
              <h2 className="text-lg sm:text-2xl font-black text-white leading-snug">
                {result.title}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto flex-wrap">
            <button
              onClick={() => onSpeakText(`${result.title}. ${result.shortSummary}`)}
              className="bg-sky-500/20 hover:bg-sky-500/30 text-sky-200 border border-sky-400/40 px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Volume2 className="w-4 h-4 text-amber-300" />
              <span>Escuchar Narración</span>
            </button>

            {onOpenMindMap && (
              <button
                onClick={onOpenMindMap}
                className="bg-cyan-500/20 hover:bg-cyan-500/35 text-cyan-200 border border-cyan-400/50 px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all hover:scale-105 cursor-pointer shadow-md"
                title="Abrir el Mapa Mental Cuántico del siglo XX"
              >
                <span>🧠 Mapa Mental</span>
              </button>
            )}

            <button
              onClick={onOpenChallenge}
              className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md hover:scale-105 transition-all cursor-pointer"
            >
              <Award className="w-4 h-4 fill-black" />
              <span>Reto de la Época</span>
            </button>
          </div>
        </div>

        {/* Short Summary */}
        <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-medium bg-[#0b1429]/60 p-3.5 rounded-2xl border border-sky-500/20">
          {result.shortSummary}
        </p>
      </div>

      {/* 3 Grid Cards: Datos Curiosos, Niñez y Juegos, Experiencia Sensorial */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1: Curiosidades y Hechos Clave */}
        <div className="bg-[#0f1b38] border border-sky-500/20 rounded-2xl p-4 shadow-lg flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-amber-300 font-bold text-sm mb-3">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <h3>Hechos Clave y Curiosidades:</h3>
            </div>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300">
              {result.curiousFacts.map((fact, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-sky-400 font-bold text-xs mt-0.5">✦</span>
                  <span className="leading-relaxed">{fact}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Card 2: Niñez y Juegos de la época */}
        <div className="bg-[#0f1b38] border border-sky-500/20 rounded-2xl p-4 shadow-lg flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-emerald-300 font-bold text-sm mb-3">
              <Smile className="w-4 h-4 text-emerald-400" />
              <h3>Infancia, Juegos y Escuela:</h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {result.howChildrenLived}
            </p>
          </div>
          <div className="mt-3 pt-2 border-t border-slate-800 text-[11px] text-slate-400 flex items-center gap-1">
            <span>🪀</span>
            <span>Juegos tradicionales y vida escolar colombiana</span>
          </div>
        </div>

        {/* Card 3: Sonidos y Sensaciones */}
        <div className="bg-[#0f1b38] border border-sky-500/20 rounded-2xl p-4 shadow-lg flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-purple-300 font-bold text-sm mb-3">
              <Radio className="w-4 h-4 text-purple-400" />
              <h3>Paisaje Sonoro y Sensaciones:</h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic">
              "{result.soundOrSensation}"
            </p>
          </div>
          <div className="mt-3 pt-2 border-t border-slate-800 text-[11px] text-slate-400 flex items-center gap-1">
            <span>👂</span>
            <span>Paisaje sonoro de Colombia en el siglo XX</span>
          </div>
        </div>
      </div>

      {/* Leo Challenge Card */}
      <div className="bg-gradient-to-r from-amber-500/15 via-sky-500/10 to-indigo-500/15 border-2 border-amber-400/40 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-xl flex-shrink-0">
            🎯
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase text-amber-400 tracking-wide block">
              Misión de Indagación para Ciencias Sociales:
            </span>
            <p className="text-sm font-semibold text-white">
              {result.leoChallenge}
            </p>
          </div>
        </div>

        <button
          onClick={onOpenChallenge}
          className="whitespace-nowrap bg-amber-500 hover:bg-amber-400 text-black font-bold px-4 py-2 rounded-xl text-xs shadow-md transition-all flex items-center gap-1.5"
        >
          <CheckCircle className="w-4 h-4" />
          <span>¡Responder Pregunta!</span>
        </button>
      </div>
    </div>
  );
};
