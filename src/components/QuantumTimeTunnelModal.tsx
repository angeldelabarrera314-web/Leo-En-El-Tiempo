import React, { useEffect, useRef, useState } from 'react';
import { X, ArrowLeft, Zap, Sparkles, Compass, Gauge, Volume2, ArrowRight, Calendar, Sliders, Play, RotateCcw } from 'lucide-react';
import { sounds } from '../utils/soundEffects';
import { triggerConfetti } from '../utils/confetti';

interface QuantumTimeTunnelModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetYear: number;
  targetEraTitle: string;
  onArrivalComplete: (year: number) => void;
}

const HISTORIC_WARP_PORTALS = [
  { year: 1903, label: '1903 • Separación de Panamá & Fin Guerra Mil Días', icon: '🕊️' },
  { year: 1928, label: '1928 • Huelga y Masacre de las Bananeras', icon: '🍌' },
  { year: 1948, label: '1948 • El Bogotazo & Jorge Eliécer Gaitán', icon: '🔥' },
  { year: 1954, label: '1954 • Inauguración de la Televisión Nacional', icon: '📺' },
  { year: 1957, label: '1957 • Plebiscito & Primer Voto Femenino', icon: '🗳️' },
  { year: 1970, label: '1970 • Frente Nacional & Despegue Urbano', icon: '🏙️' },
  { year: 1982, label: '1982 • Gabriel García Márquez gana el Nobel', icon: '📚' },
  { year: 1991, label: '1991 • Nueva Constitución de Derechos', icon: '📜' },
];

export const QuantumTimeTunnelModal: React.FC<QuantumTimeTunnelModalProps> = ({
  isOpen,
  onClose,
  targetYear,
  targetEraTitle,
  onArrivalComplete,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [selectedWarpYear, setSelectedWarpYear] = useState<number>(targetYear || 1954);
  const [phase, setPhase] = useState<'calibrating' | 'charging' | 'warping' | 'arrival'>('calibrating');
  const [countdownYear, setCountdownYear] = useState<number>(1999);
  const [warpSpeed, setWarpSpeed] = useState<number>(0);

  // Sync targetYear when opened
  useEffect(() => {
    if (isOpen) {
      setSelectedWarpYear(targetYear || 1954);
      setPhase('calibrating');
      setCountdownYear(1999);
      setWarpSpeed(0);
    }
  }, [isOpen, targetYear]);

  // Starfield hyper-space warp canvas effect
  useEffect(() => {
    if (!isOpen) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const numStars = 450;
    const stars: { x: number; y: number; z: number; color: string }[] = [];
    const colors = ['#38bdf8', '#f59e0b', '#a855f7', '#34d399', '#ffffff', '#ec4899', '#38bdf8'];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: (Math.random() - 0.5) * canvas.width * 2,
        y: (Math.random() - 0.5) * canvas.height * 2,
        z: Math.random() * canvas.width,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    const render = () => {
      let speedFactor = 2;
      if (phase === 'charging') speedFactor = 12;
      else if (phase === 'warping') speedFactor = 42;
      else if (phase === 'arrival') speedFactor = 3;

      setWarpSpeed(Math.round(speedFactor * 26));

      ctx.fillStyle = 'rgba(6, 11, 26, 0.32)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        star.z -= speedFactor;

        if (star.z <= 0) {
          star.z = canvas.width;
          star.x = (Math.random() - 0.5) * canvas.width * 2;
          star.y = (Math.random() - 0.5) * canvas.height * 2;
        }

        const k = 260 / star.z;
        const px = star.x * k + cx;
        const py = star.y * k + cy;

        const prevK = 260 / (star.z + speedFactor * 2.8);
        const prevPx = star.x * prevK + cx;
        const prevPy = star.y * prevK + cy;

        if (px >= 0 && px <= canvas.width && py >= 0 && py <= canvas.height) {
          const size = Math.max(1, (1 - star.z / canvas.width) * 4);
          ctx.strokeStyle = star.color;
          ctx.lineWidth = size;
          ctx.beginPath();
          ctx.moveTo(prevPx, prevPy);
          ctx.lineTo(px, py);
          ctx.stroke();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isOpen, phase]);

  // Launch the warp sequence towards selectedWarpYear
  const handleStartWarp = (customYear?: number) => {
    const finalYear = customYear ?? selectedWarpYear;
    setSelectedWarpYear(finalYear);
    sounds.playHyperDrive();
    setPhase('charging');
    setCountdownYear(1999);

    setTimeout(() => {
      setPhase('warping');
      sounds.playTimeWarp();
    }, 1100);

    // Dynamic numeric countdown to the chosen year
    const startCount = 1999;
    let currentCount = startCount;
    const step = finalYear < startCount ? -2 : 2;

    const interval = setInterval(() => {
      currentCount += step;
      if ((step < 0 && currentCount <= finalYear) || (step > 0 && currentCount >= finalYear)) {
        currentCount = finalYear;
        clearInterval(interval);
      }
      setCountdownYear(currentCount);
    }, 55);

    setTimeout(() => {
      clearInterval(interval);
      setCountdownYear(finalYear);
      setPhase('arrival');
      sounds.playFanfare();
      triggerConfetti(0.5, 0.5);
    }, 3800);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 select-none overflow-hidden animate-fadeIn">
      {/* 3D Warp Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      {/* Holographic HUD Overlays */}
      <div className="absolute inset-0 border-8 border-sky-500/20 pointer-events-none flex flex-col justify-between p-4 sm:p-6">
        {/* Top HUD */}
        <div className="flex items-center justify-between text-[11px] sm:text-xs font-digital text-sky-400">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span>SISTEMA CUÁNTICO • COL. NIÑO JESÚS DE PRAGA</span>
          </div>
          <div>VELOCIDAD: {warpSpeed} AÑOS-LUZ/MIN</div>
        </div>

        {/* Bottom HUD */}
        <div className="flex items-center justify-between text-[11px] sm:text-xs font-digital text-sky-400">
          <div>DESTINO SELECCIONADO: AÑO {selectedWarpYear}</div>
          <div>BARRERA TEMPORAL: 1900 - 1999</div>
        </div>
      </div>

      {/* Top Left Back Button */}
      <button
        onClick={() => {
          sounds.playClick();
          onClose();
        }}
        className="absolute top-4 left-4 z-20 flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900/90 text-sky-200 hover:text-white border border-sky-400/40 text-xs font-bold font-sans transition-all hover:scale-105 shadow-lg backdrop-blur-md cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Volver atrás</span>
      </button>

      {/* Close button in corner */}
      <button
        onClick={() => {
          sounds.playClick();
          onClose();
        }}
        className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-slate-900/90 text-slate-300 hover:text-white border border-sky-400/40 transition-all hover:scale-110 cursor-pointer"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Central Interactive Console */}
      <div className="relative z-10 max-w-xl w-full mx-4 text-center flex flex-col items-center">
        {/* Phase 1: Calibrating Barrier (Choose ANY year 1900-1999) */}
        {phase === 'calibrating' && (
          <div className="bg-gradient-to-b from-[#0b1633]/95 via-[#0e214d]/90 to-[#070e22]/95 border-2 border-cyan-400/80 rounded-3xl p-5 sm:p-7 backdrop-blur-xl shadow-[0_0_60px_rgba(6,182,212,0.5)] w-full max-h-[85vh] overflow-y-auto space-y-4">
            <div className="flex items-center justify-center gap-2">
              <span className="text-2xl animate-spin-slow">⏳</span>
              <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 text-[11px] font-black uppercase tracking-wider">
                Consola de Calibración de la Barrera Temporal
              </span>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                ¿A qué año deseas saltar en el Túnel 3D?
              </h2>
              <p className="text-xs text-slate-300 mt-1">
                Escribe o selecciona cualquier coordenada temporal de Colombia en el siglo XX (1900 a 1999).
              </p>
            </div>

            {/* Direct Year Input & Slider */}
            <div className="bg-slate-900/80 p-4 rounded-2xl border border-cyan-500/30 space-y-3">
              <div className="flex items-center justify-center gap-3">
                <label className="text-xs font-bold text-amber-300">Año de Destino:</label>
                <input
                  type="number"
                  min={1900}
                  max={1999}
                  value={selectedWarpYear}
                  onChange={(e) => {
                    const val = parseInt(e.target.value);
                    if (!isNaN(val)) {
                      setSelectedWarpYear(Math.min(1999, Math.max(1900, val)));
                    }
                  }}
                  className="w-28 text-center text-2xl font-black text-cyan-300 bg-black/60 border-2 border-cyan-400 rounded-xl px-2 py-1 outline-none shadow-inner"
                />
              </div>

              {/* Slider */}
              <div className="px-2">
                <input
                  type="range"
                  min={1900}
                  max={1999}
                  value={selectedWarpYear}
                  onChange={(e) => setSelectedWarpYear(parseInt(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-digital">
                  <span>1900</span>
                  <span>1925</span>
                  <span>1950</span>
                  <span>1975</span>
                  <span>1999</span>
                </div>
              </div>
            </div>

            {/* Quick Historic Warp Portals */}
            <div className="space-y-1.5 text-left">
              <span className="text-[11px] font-bold text-sky-300 uppercase tracking-wider">
                O salta a una Puerta Temporal Clave:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 max-h-40 overflow-y-auto pr-1">
                {HISTORIC_WARP_PORTALS.map((portal) => (
                  <button
                    key={portal.year}
                    type="button"
                    onClick={() => {
                      sounds.playClick();
                      setSelectedWarpYear(portal.year);
                    }}
                    className={`text-left p-2 rounded-xl border text-xs font-medium transition-all flex items-center gap-2 ${
                      selectedWarpYear === portal.year
                        ? 'bg-gradient-to-r from-amber-500/30 to-orange-500/30 border-amber-400 text-amber-200 font-bold shadow-md'
                        : 'bg-slate-900/60 hover:bg-slate-800/80 border-slate-700 text-slate-300'
                    }`}
                  >
                    <span>{portal.icon}</span>
                    <span className="truncate">{portal.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Launch Warp Action Button */}
            <button
              onClick={() => handleStartWarp(selectedWarpYear)}
              className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-cyan-400 via-sky-500 to-indigo-600 hover:from-cyan-300 hover:to-indigo-500 text-white font-black text-sm sm:text-base shadow-[0_0_30px_rgba(6,182,212,0.8)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Zap className="w-5 h-5 text-amber-300 animate-bounce" />
              <span>⚡ ¡ACTIVAR PROPULSIÓN CUÁNTICA AL AÑO {selectedWarpYear}!</span>
            </button>
          </div>
        )}

        {/* Phase 2: Charging Engines */}
        {phase === 'charging' && (
          <div className="space-y-4 animate-pulse">
            <div className="w-24 h-24 rounded-full border-4 border-amber-400/80 border-t-cyan-400 animate-spin flex items-center justify-center mx-auto shadow-[0_0_40px_rgba(245,158,11,0.6)]">
              <Zap className="w-10 h-10 text-amber-300 animate-bounce" />
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-widest uppercase">
              Iniciando Salto Temporal
            </h2>
            <p className="text-sm text-sky-200">
              Calibrando vórtice cuántico hacia el año {selectedWarpYear}...
            </p>
          </div>
        )}

        {/* Phase 3: Warping Through Starfield */}
        {phase === 'warping' && (
          <div className="space-y-4">
            <div className="relative w-36 h-36 rounded-full border-4 border-dashed border-cyan-400 animate-spin-slow flex items-center justify-center mx-auto shadow-[0_0_60px_rgba(56,189,248,0.8)]">
              <span className="text-4xl animate-bounce">⏳</span>
            </div>

            <div className="bg-[#0b1429]/80 border-2 border-sky-400/60 rounded-3xl p-6 backdrop-blur-md shadow-2xl">
              <span className="text-xs uppercase font-digital text-amber-400 tracking-widest block mb-1">
                TRANSITANDO LA LÍNEA TEMPORAL
              </span>
              <div className="text-5xl sm:text-7xl font-digital font-black text-cyan-300 tracking-wider my-2">
                {countdownYear}
              </div>
              <p className="text-xs text-slate-300 animate-pulse">
                Desplazando engranes cuánticos hacia el año {selectedWarpYear}...
              </p>
            </div>
          </div>
        )}

        {/* Phase 4: Arrival Confirmed */}
        {phase === 'arrival' && (
          <div className="bg-gradient-to-b from-[#101e42]/95 to-[#070e20]/95 border-2 border-amber-400 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-[0_0_60px_rgba(245,158,11,0.6)] animate-fadeIn space-y-4 max-w-md w-full">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border-2 border-amber-400 flex items-center justify-center mx-auto text-3xl shadow-lg">
              🇨🇴
            </div>

            <div>
              <span className="text-xs font-digital uppercase bg-amber-500/20 text-amber-300 border border-amber-400/40 px-3 py-1 rounded-full">
                ¡ATERRIZAJE EXITOSO!
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-white mt-3 font-digital">
                AÑO {selectedWarpYear}
              </h2>
              <p className="text-sm font-semibold text-amber-300 mt-1">
                {selectedWarpYear === targetYear ? targetEraTitle : `Llegada confirmada a ${selectedWarpYear}`}
              </p>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              La cabina cuántica ha sincronizado el paisaje sonoro, los archivos de época y la vida social colombiana del año {selectedWarpYear}.
            </p>

            <div className="space-y-2 pt-2">
              <button
                onClick={() => {
                  sounds.playCoin();
                  onArrivalComplete(selectedWarpYear);
                  onClose();
                }}
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 hover:from-amber-400 hover:to-rose-400 text-black font-black text-sm sm:text-base shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>¡Explorar el Año {selectedWarpYear} con Leo!</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={() => setPhase('calibrating')}
                className="w-full py-2 px-4 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-all flex items-center justify-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Elegir otra coordenada temporal</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
