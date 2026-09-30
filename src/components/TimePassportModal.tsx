import React from 'react';
import { X, ArrowLeft, BookOpen, Sparkles, MapPin, Calendar, Award } from 'lucide-react';
import { TravelStamp } from '../types';

interface TimePassportModalProps {
  isOpen: boolean;
  onClose: () => void;
  stamps: TravelStamp[];
  onSelectYear: (year: number) => void;
}

export const TimePassportModal: React.FC<TimePassportModalProps> = ({
  isOpen,
  onClose,
  stamps,
  onSelectYear,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-gradient-to-b from-[#121f3d] to-[#0a1224] border-2 border-sky-400/40 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-3.5 sm:p-4 bg-[#17274c] border-b border-sky-500/30 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <button
              onClick={onClose}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-500/20 hover:bg-sky-500/30 text-sky-200 border border-sky-400/40 text-xs font-bold transition-all hover:scale-105"
              title="Volver al Laboratorio Cuántico"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Volver atrás</span>
            </button>

            <div className="p-2 rounded-2xl bg-sky-500/20 text-sky-300 border border-sky-400/30 hidden sm:flex">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                <span>Pasaporte Temporal de Colombia</span>
                <span className="text-xs bg-amber-500/20 text-amber-300 border border-amber-400/30 px-2 py-0.5 rounded-full">
                  {stamps.length} Sellos
                </span>
              </h3>
              <p className="text-xs text-sky-200">
                Tu registro oficial de saltos cuánticos por el Siglo XX (1900 - 1999)
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

        {/* Stamps Collection Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {stamps.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <span className="text-5xl">🧭</span>
              <h4 className="text-lg font-bold text-white">¡Tu pasaporte aún está nuevo!</h4>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Activa la máquina del tiempo y viaja a diferentes años de Colombia para conseguir sellos de viaje conmemorativos.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {stamps.map((stamp) => (
                <div
                  key={stamp.id}
                  onClick={() => {
                    onSelectYear(parseInt(stamp.year, 10));
                    onClose();
                  }}
                  className="bg-[#152345] hover:bg-[#1c305c] border-2 border-dashed border-sky-400/40 rounded-2xl p-4 cursor-pointer transition-all duration-200 shadow-md flex items-start gap-3 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#0d162d] border border-amber-400/50 flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-110 transition-transform">
                    {stamp.icon}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-digital text-amber-300 font-bold text-sm">
                        {stamp.year}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        {stamp.visitedAt}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-white truncate mt-0.5">
                      {stamp.title}
                    </h4>

                    <p className="text-xs text-slate-300 line-clamp-2 mt-1">
                      {stamp.description}
                    </p>

                    <div className="flex items-center gap-1 text-[10px] text-sky-400 font-semibold mt-2">
                      <MapPin className="w-3 h-3" />
                      <span>{stamp.region}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
