import React, { useState } from 'react';
import { QuickEra } from '../types';
import { Calendar, ChevronRight, Sparkles, MapPin } from 'lucide-react';

interface ColombianTimelinePanelProps {
  presetEras: QuickEra[];
  currentYear: number;
  onSelectEra: (year: number) => void;
}

export const ColombianTimelinePanel: React.FC<ColombianTimelinePanelProps> = ({
  presetEras,
  currentYear,
  onSelectEra,
}) => {
  const [selectedDecade, setSelectedDecade] = useState<string>('TODAS');

  const decades = ['TODAS', '1900-1929', '1930-1959', '1960-1979', '1980-1999'];

  const filteredEras = presetEras.filter((era) => {
    if (selectedDecade === 'TODAS') return true;
    if (selectedDecade === '1900-1929') return era.year >= 1900 && era.year <= 1929;
    if (selectedDecade === '1930-1959') return era.year >= 1930 && era.year <= 1959;
    if (selectedDecade === '1960-1979') return era.year >= 1960 && era.year <= 1979;
    if (selectedDecade === '1980-1999') return era.year >= 1980 && era.year <= 1999;
    return true;
  });

  return (
    <div className="bg-[#0e1934] border border-sky-500/20 rounded-3xl p-4 sm:p-5 shadow-xl space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-sky-500/20 pb-3">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
            <span>🗺️</span>
            <span>Línea de Tiempo del Siglo XX en Colombia</span>
          </h3>
          <p className="text-xs text-sky-300">
            Explora los grandes momentos que transformaron nuestro país entre 1900 y 1999
          </p>
        </div>

        {/* Decade Filter Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
          {decades.map((dec) => (
            <button
              key={dec}
              onClick={() => setSelectedDecade(dec)}
              className={`px-2.5 py-1 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedDecade === dec
                  ? 'bg-sky-500 text-white shadow-sm'
                  : 'bg-[#152549] text-slate-300 hover:bg-[#1f376e]'
              }`}
            >
              {dec}
            </button>
          ))}
        </div>
      </div>

      {/* Eras Grid Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {filteredEras.map((era) => {
          const isCurrent = era.year === currentYear;

          return (
            <div
              key={era.id}
              onClick={() => onSelectEra(era.year)}
              className={`rounded-2xl p-3.5 border cursor-pointer transition-all duration-200 flex flex-col justify-between group ${
                isCurrent
                  ? 'bg-sky-500/20 border-sky-400 shadow-[0_0_15px_rgba(56,189,248,0.3)]'
                  : 'bg-[#122042] border-slate-700/60 hover:border-sky-400/60 hover:bg-[#182c5a]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl">{era.icon}</span>
                  <span className="font-digital text-amber-300 text-base font-black">
                    {era.year}
                  </span>
                </div>

                <h4 className="text-xs font-bold text-white group-hover:text-sky-300 transition-colors line-clamp-2">
                  {era.title}
                </h4>

                <span className="text-[10px] text-slate-400 block mt-1">
                  {era.theme}
                </span>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-700/50 flex items-center justify-between text-[11px] text-sky-400 font-bold">
                <span>Viajar</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
