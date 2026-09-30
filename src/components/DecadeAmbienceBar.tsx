import React, { useEffect, useState } from 'react';
import { Volume2, VolumeX, Radio, Sparkles, Music, Sliders, ChevronDown, ChevronUp } from 'lucide-react';
import { decadeAmbience, DECADE_SOUNDSCAPES, DecadeSoundscapeInfo } from '../utils/decadeAmbience';
import { sounds } from '../utils/soundEffects';

interface DecadeAmbienceBarProps {
  currentYear: number;
  className?: string;
}

export const DecadeAmbienceBar: React.FC<DecadeAmbienceBarProps> = ({ currentYear, className = '' }) => {
  const [ambienceState, setAmbienceState] = useState(() => decadeAmbience.getState());
  const [showDetails, setShowDetails] = useState<boolean>(false);

  useEffect(() => {
    // Sync year with ambience engine
    decadeAmbience.setYear(currentYear);
  }, [currentYear]);

  useEffect(() => {
    const unsubscribe = decadeAmbience.subscribe((state) => {
      setAmbienceState(state);
    });
    return () => unsubscribe();
  }, []);

  const handleToggle = () => {
    sounds.playClick();
    decadeAmbience.togglePlay();
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    decadeAmbience.setVolume(val);
  };

  const info: DecadeSoundscapeInfo = ambienceState.info;

  return (
    <div
      className={`relative bg-gradient-to-r from-[#0b152d]/95 via-[#101f42]/95 to-[#0b152d]/95 border border-sky-400/35 rounded-2xl p-3 sm:p-3.5 shadow-xl transition-all ${className}`}
    >
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Left Side: Decade Soundscape Info & Status */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          {/* Play / Pause Button with Pulsing Wave Indicator */}
          <button
            type="button"
            onClick={handleToggle}
            className={`relative flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center transition-all cursor-pointer shadow-md ${
              ambienceState.isPlaying
                ? 'bg-gradient-to-tr from-amber-500 to-amber-400 text-black shadow-[0_0_16px_rgba(245,158,11,0.5)] scale-105'
                : 'bg-[#152549] hover:bg-[#1e3466] text-slate-300 border border-slate-600/60'
            }`}
            title={
              ambienceState.isPlaying
                ? 'Pausar ambientación sonora histórica'
                : 'Activar ambientación sonora de la década'
            }
          >
            {ambienceState.isPlaying ? (
              <Radio className="w-5 h-5 animate-pulse" />
            ) : (
              <VolumeX className="w-5 h-5 text-slate-400" />
            )}

            {/* Glowing ring when active */}
            {ambienceState.isPlaying && (
              <span className="absolute -inset-1 rounded-xl border border-amber-400/40 animate-ping pointer-events-none" />
            )}
          </button>

          {/* Soundscape Title, Era & Animated Bars */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs uppercase font-black tracking-wider text-amber-300 flex items-center gap-1">
                <span>{info.icon}</span>
                <span>MÚSICA DE LA ÉPOCA:</span>
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-sky-500/20 text-sky-200 border border-sky-400/40">
                {info.decade}
              </span>
              {ambienceState.isDucked && (
                <span className="text-[9px] px-1.5 py-0.2 rounded-full font-mono bg-purple-500/30 text-purple-200 border border-purple-400/40 animate-pulse">
                  🎙️ Atenuado por voz de Leo
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 mt-0.5">
              <h4 className="text-sm font-bold text-white truncate drop-shadow-xs">
                {info.name}
              </h4>

              {/* Animated Equalizer Waveform Bars when active */}
              {ambienceState.isPlaying && (
                <div className="flex items-end gap-0.5 h-3.5 px-1.5 py-0.5 rounded bg-amber-500/10 border border-amber-400/30">
                  <span className="w-1 bg-amber-400 rounded-full animate-[bounce_0.6s_ease-in-out_infinite] h-3" />
                  <span className="w-1 bg-amber-400 rounded-full animate-[bounce_0.9s_ease-in-out_infinite] h-2" />
                  <span className="w-1 bg-amber-400 rounded-full animate-[bounce_0.75s_ease-in-out_infinite] h-3.5" />
                  <span className="w-1 bg-amber-400 rounded-full animate-[bounce_0.5s_ease-in-out_infinite] h-1.5" />
                </div>
              )}
            </div>

            {!ambienceState.isPlaying ? (
              <div className="flex items-center gap-2 mt-1.5">
                <button
                  type="button"
                  onClick={handleToggle}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-400 text-black font-black text-xs shadow-[0_0_15px_rgba(245,158,11,0.6)] hover:scale-105 active:scale-95 transition-all cursor-pointer animate-pulse"
                >
                  <span>▶️ Activar Música de esta Década</span>
                </button>
                <span className="text-[10px] text-amber-300/80 font-medium hidden sm:inline">
                  (Haz clic para iniciar el audio en el navegador)
                </span>
              </div>
            ) : (
              <p className="text-[11px] text-sky-200/90 truncate hidden md:block">
                {info.description}
              </p>
            )}
          </div>
        </div>

        {/* Right Side: Volume & Quick Controls */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 border-sky-500/20 pt-2 sm:pt-0">
          {/* Quick Sound Test Ping */}
          <button
            type="button"
            onClick={() => {
              sounds.playCoin();
              if (!ambienceState.isPlaying) {
                decadeAmbience.play();
              }
            }}
            className="px-2 py-1 rounded-xl bg-[#132247] hover:bg-[#1d3368] border border-amber-400/30 text-amber-200 text-xs font-bold flex items-center gap-1 transition-all cursor-pointer"
            title="Probar sonido del sintetizador y altavoces"
          >
            <span>🔊 Probar</span>
          </button>

          {/* Subtle Volume Slider */}
          <div className="flex items-center gap-2 bg-[#091124] px-2.5 py-1 rounded-xl border border-sky-500/25">
            <Volume2 className="w-3.5 h-3.5 text-sky-300" />
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={ambienceState.volume}
              onChange={handleVolumeChange}
              className="w-20 sm:w-24 h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-400"
              title={`Volumen de ambiente: ${Math.round(ambienceState.volume * 100)}%`}
            />
            <span className="text-[10px] font-mono text-slate-300 w-7 text-right">
              {Math.round(ambienceState.volume * 100)}%
            </span>
          </div>

          {/* Details toggle */}
          <button
            type="button"
            onClick={() => setShowDetails(!showDetails)}
            className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-[#14234b] hover:bg-[#1b3168] border border-sky-400/30 text-sky-200 text-xs font-semibold transition-all cursor-pointer"
            title="Ver instrumentos y detalles acústicos de la década"
          >
            <Sliders className="w-3 h-3 text-amber-400" />
            <span className="hidden sm:inline">Acústica</span>
            {showDetails ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>
        </div>
      </div>

      {/* Expandable Acoustic Details & Instrument Badges */}
      {showDetails && (
        <div className="mt-3 pt-3 border-t border-sky-500/20 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs animate-fadeIn">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
              Atmósfera Acústica Recreada:
            </span>
            <p className="text-slate-300 text-xs leading-relaxed bg-[#070e1f] p-2 rounded-xl border border-slate-700/50">
              {info.description}
            </p>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
              Texturas e Instrumentos del Paisaje Sonoro:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {info.instruments.map((inst, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 rounded-lg bg-sky-950/70 border border-sky-400/40 text-sky-200 font-semibold text-[11px] flex items-center gap-1"
                >
                  <Music className="w-2.5 h-2.5 text-amber-400" />
                  {inst}
                </span>
              ))}
            </div>
            <p className="text-[10px] text-emerald-400/90 mt-2 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-emerald-400" />
              Sintetizado 100% en tiempo real con Web Audio API (cero consumo de datos).
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
