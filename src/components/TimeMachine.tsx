import React, { useState } from 'react';
import { Play, Sparkles, Navigation, Gauge, RefreshCw, Zap, Flame } from 'lucide-react';
import { QuickEra } from '../types';
import { sounds } from '../utils/soundEffects';
import { decadeAmbience } from '../utils/decadeAmbience';
import { DecadeAmbienceBar } from './DecadeAmbienceBar';

interface TimeMachineProps {
  currentYear: number;
  isTraveling: boolean;
  onTravelToYear: (year: number) => void;
  presetEras: QuickEra[];
  streakDay?: number;
  streakMultiplierLabel?: string;
  onOpenStreakModal?: () => void;
  onOpenTimeTunnel?: () => void;
  onOpenNewspaper?: () => void;
}

export const TimeMachine: React.FC<TimeMachineProps> = ({
  currentYear,
  isTraveling,
  onTravelToYear,
  presetEras,
  streakDay = 1,
  streakMultiplierLabel = 'x1.0',
  onOpenStreakModal,
  onOpenTimeTunnel,
  onOpenNewspaper,
}) => {
  const [inputYear, setInputYear] = useState<number>(currentYear);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputYear(parseInt(e.target.value, 10));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputYear >= 1900 && inputYear <= 1999) {
      sounds.playTimeWarp();
      decadeAmbience.setYear(inputYear);
      decadeAmbience.play();
      onTravelToYear(inputYear);
    }
  };

  return (
    <div className="relative bg-gradient-to-b from-[#111c3a] via-[#0c152b] to-[#070d1c] border-2 border-sky-400/30 rounded-3xl p-4 sm:p-6 shadow-2xl overflow-hidden">
      {/* Background ambient portal effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Panel */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-b border-sky-500/20 pb-4 mb-5">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <span>⚙️</span>
            <span>Consola Cuántica Temporal</span>
          </h2>
          <p className="text-xs sm:text-sm text-sky-300">
            Calibrador de Cronotopo • Colombia Siglo XX (1900 - 1999)
          </p>
        </div>

        {/* Temporal Flux Display */}
        <div className="flex items-center gap-2 bg-[#091124] border border-sky-400/30 px-3 py-1.5 rounded-2xl shadow-inner">
          <Gauge className="w-4 h-4 text-emerald-400 animate-pulse" />
          <div className="text-right">
            <span className="text-[10px] text-slate-400 block uppercase font-bold">Flujo Temporal</span>
            <span className="font-digital text-emerald-400 text-sm font-bold">99.8% ESTABLE</span>
          </div>
        </div>
      </div>

      {/* Main Controls Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left: Swirling Portal Core Visual */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
          {/* Cybernetic outer rotating energy ring */}
          <div
            className={`absolute w-52 h-52 sm:w-68 sm:h-68 rounded-full border-2 border-dashed border-cyan-400/40 pointer-events-none transition-all duration-700 ${
              isTraveling ? 'animate-spin-fast scale-110 border-amber-400' : 'animate-spin-slow opacity-60'
            }`}
          />
          {/* Counter-rotating subtle orbital ring */}
          <div
            className={`absolute w-48 h-48 sm:w-60 sm:h-60 rounded-full border border-sky-400/25 pointer-events-none ${
              isTraveling ? 'animate-pulse scale-105' : 'animate-pulse opacity-40'
            }`}
          />

          <div className="relative w-44 h-44 sm:w-56 sm:h-56 rounded-full p-2 bg-gradient-to-r from-sky-400 via-amber-400 to-indigo-600 shadow-[0_0_45px_rgba(56,189,248,0.5)]">
            {/* Spinning background image of portal core */}
            <div className="w-full h-full rounded-full overflow-hidden relative">
              <img
                src="/src/assets/images/time_portal_core_1789159873859.jpg"
                alt="Núcleo Temporal"
                className={`w-full h-full object-cover rounded-full ${
                  isTraveling ? 'animate-spin-fast scale-110' : 'animate-spin-slow'
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b1329]/65 via-transparent to-[#0b1329]/40" />
            </div>

            {/* Center Digital Display of Selected Year */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center select-none pointer-events-none">
              <span className="text-[11px] font-bold text-amber-300 tracking-wider uppercase drop-shadow flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-300 animate-spin" />
                <span>AÑO OBJETIVO</span>
              </span>
              <span className="font-digital text-4xl sm:text-5xl font-black text-white drop-shadow-[0_0_15px_rgba(56,189,248,0.9)]">
                {inputYear}
              </span>
              <span className="text-[10px] bg-sky-500/50 text-sky-200 px-2.5 py-0.5 rounded-full border border-sky-300/50 mt-1 shadow-sm font-semibold">
                {inputYear < 1910 ? 'Década de 1900' : `Años ${Math.floor((inputYear - 1900) / 10) * 10}s`}
              </span>
            </div>
          </div>
        </div>

        {/* Right: Year Slider, Dial Inputs & Jump Lever */}
        <div className="lg:col-span-7 space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Slider Control */}
            <div className="bg-[#0c162e] border border-sky-500/30 rounded-2xl p-4 shadow-inner">
              <div className="flex items-center justify-between text-xs font-bold text-slate-300 mb-2">
                <span className="text-amber-400">1900 (Separación Panamá)</span>
                <span className="text-sky-300">Selector de Años</span>
                <span className="text-emerald-400">1999 (Fin de Siglo)</span>
              </div>

              <input
                type="range"
                min="1900"
                max="1999"
                value={inputYear}
                onChange={handleSliderChange}
                disabled={isTraveling}
                className="w-full h-3 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-400 hover:accent-amber-400 transition-all"
              />

              {/* Quick Decade Steppers */}
              <div className="grid grid-cols-5 gap-1.5 mt-3 pt-2 border-t border-slate-800 text-center">
                {[1903, 1920, 1948, 1970, 1991].map((yr) => (
                  <button
                    key={yr}
                    type="button"
                    onClick={() => {
                      setInputYear(yr);
                      decadeAmbience.setYear(yr);
                      decadeAmbience.play();
                    }}
                    className={`py-1 px-1 rounded-lg text-xs font-digital font-bold transition-all ${
                      inputYear === yr
                        ? 'bg-sky-500 text-white shadow-[0_0_10px_rgba(56,189,248,0.5)]'
                        : 'bg-[#152347] text-slate-300 hover:bg-[#1f346b]'
                    }`}
                  >
                    {yr}
                  </button>
                ))}
              </div>
            </div>

            {/* Travel Lever / Button */}
            <button
              type="submit"
              disabled={isTraveling}
              className={`w-full py-3.5 px-6 rounded-2xl font-bold text-base sm:text-lg shadow-xl transition-all flex items-center justify-center gap-2 select-none ${
                isTraveling
                  ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-amber-500 via-orange-500 to-amber-400 hover:from-amber-400 hover:to-orange-400 text-black shadow-[0_0_25px_rgba(245,158,11,0.5)] active:scale-98'
              }`}
            >
              {isTraveling ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  <span>¡SALTANDO EN EL TIEMPO A {inputYear}...</span>
                </>
              ) : (
                <>
                  <Zap className="w-5 h-5 fill-black" />
                  <span>ACTIVAR MÁQUINA DEL TIEMPO ➔ {inputYear}</span>
                </>
              )}
            </button>

            {/* Streak Multiplier Motivational Banner */}
            <div
              onClick={() => {
                if (onOpenStreakModal) {
                  sounds.playClick();
                  onOpenStreakModal();
                }
              }}
              className="flex items-center justify-between px-3 py-1.5 rounded-xl bg-amber-950/40 hover:bg-amber-900/50 border border-amber-500/40 text-xs text-amber-200 cursor-pointer transition-all shadow-xs"
              title="Haz clic para ver tu Racha de Exploración de 5 días"
            >
              <div className="flex items-center gap-1.5 font-bold">
                <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400 animate-pulse" />
                <span>Racha de Exploración: <strong>Día {streakDay} de 5</strong></span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-[10px] uppercase text-slate-400">Multiplicador:</span>
                <span className="font-mono font-bold text-amber-300 bg-amber-500/20 px-1.5 py-0.5 rounded border border-amber-400/30">
                  {streakMultiplierLabel}
                </span>
              </div>
            </div>

            {/* Secondary High-Tech Warp & Newspaper Action Buttons */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                type="button"
                onClick={() => {
                  if (onOpenTimeTunnel) onOpenTimeTunnel();
                }}
                className="py-2 px-3 rounded-xl bg-gradient-to-r from-cyan-600/30 via-sky-600/30 to-indigo-600/30 hover:from-cyan-600/50 hover:to-indigo-600/50 border border-cyan-400/50 text-cyan-200 text-xs font-bold transition-all shadow-[0_0_12px_rgba(6,182,212,0.2)] flex items-center justify-center gap-1.5 hover:scale-102"
              >
                <Zap className="w-3.5 h-3.5 text-cyan-300 animate-pulse" />
                <span>🌀 Túnel Cuántico 3D</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  if (onOpenNewspaper) onOpenNewspaper();
                }}
                className="py-2 px-3 rounded-xl bg-[#2e261f] hover:bg-[#43372c] border border-[#a89578] text-[#f7f3ea] text-xs font-bold transition-all shadow-[0_0_12px_rgba(168,149,120,0.2)] flex items-center justify-center gap-1.5 hover:scale-102"
              >
                <span>📰 Periódico de la Época</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Interactive Decade Ambient Soundscape Synthesizer */}
      <div className="mt-5">
        <DecadeAmbienceBar currentYear={inputYear} />
      </div>

      {/* Preset Colombian Historic Eras (Interactive Pills) */}
      <div className="mt-6 pt-4 border-t border-sky-500/20">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Hitos Históricos de Colombia en el Siglo XX:</span>
        </h3>

        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {presetEras.map((era) => {
            const isCurrent = currentYear === era.year;

            return (
              <button
                key={era.id}
                onClick={() => {
                  sounds.playTimeWarp();
                  decadeAmbience.setYear(era.year);
                  decadeAmbience.play();
                  setInputYear(era.year);
                  onTravelToYear(era.year);
                }}
                disabled={isTraveling}
                className={`flex-shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all ${
                  isCurrent
                    ? 'bg-sky-500/20 border-sky-400 text-white shadow-[0_0_12px_rgba(56,189,248,0.4)]'
                    : 'bg-[#101c38] border-slate-700/80 text-slate-300 hover:border-slate-500 hover:bg-[#16274e]'
                }`}
              >
                <span>{era.icon}</span>
                <span className="font-digital text-amber-300">{era.year}</span>
                <span className="text-slate-300 font-normal">{era.title}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
