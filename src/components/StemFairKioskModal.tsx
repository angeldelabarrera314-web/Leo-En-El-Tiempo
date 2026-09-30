import React, { useState } from 'react';
import {
  X,
  ArrowLeft,
  Award,
  Sparkles,
  Printer,
  CheckCircle2,
  Cpu,
  BookOpen,
  Volume2,
  Shield,
  Layers,
  Zap,
  Star,
  Download,
  Share2,
} from 'lucide-react';
import { sounds } from '../utils/soundEffects';
import { triggerConfetti } from '../utils/confetti';

interface StemFairKioskModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentYear: number;
  xp: number;
}

export const StemFairKioskModal: React.FC<StemFairKioskModalProps> = ({
  isOpen,
  onClose,
  currentYear,
  xp,
}) => {
  const [visitorName, setVisitorName] = useState('Jurado Calificador de la Feria STEM');
  const [visitorRole, setVisitorRole] = useState('Jurado Evaluador');
  const [activeTab, setActiveTab] = useState<'diploma' | 'rubric' | 'stand'>('diploma');
  const [copiedLink, setCopiedLink] = useState(false);

  if (!isOpen) return null;

  const handlePrint = () => {
    sounds.playFanfare();
    triggerConfetti(0.5, 0.5);
    window.print();
  };

  const handleCopyProjectLink = () => {
    sounds.playClick();
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/90 backdrop-blur-xl animate-fadeIn select-none">
      <div className="bg-gradient-to-b from-[#0e172e] via-[#091024] to-[#040817] border-2 border-amber-400 rounded-3xl w-full max-w-4xl max-h-[94vh] flex flex-col shadow-[0_0_80px_rgba(245,158,11,0.5)] overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-amber-500/25 bg-gradient-to-r from-amber-500/20 via-orange-500/15 to-purple-600/20 flex items-center justify-between flex-wrap gap-2 print:hidden">
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                sounds.playClick();
                onClose();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/90 text-amber-300 hover:text-white border border-slate-700 text-xs font-bold transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-md"
            >
              <ArrowLeft className="w-4 h-4 text-amber-400" />
              <span>Volver atrás</span>
            </button>

            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-400 via-orange-500 to-red-500 flex items-center justify-center shadow-lg text-2xl animate-pulse">
              🏆
            </div>

            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] uppercase font-black tracking-widest text-amber-300 bg-amber-500/25 px-2 py-0.5 rounded-full border border-amber-400/40">
                  Factor Sorpresa Feria STEM 2026
                </span>
                <span className="text-xs text-sky-200 font-bold bg-sky-500/20 px-2.5 py-0.5 rounded-full border border-sky-400/30">
                  🏫 Colegio Niño Jesús De Praga
                </span>
              </div>
              <h2 className="text-base sm:text-xl font-black text-white">
                Centro de Exposición para Jurados & Diplomador Souvenir
              </h2>
            </div>
          </div>

          <button
            onClick={() => {
              sounds.playClick();
              onClose();
            }}
            className="p-2 rounded-full bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors border border-slate-600 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Controls */}
        <div className="px-4 py-2 bg-[#0b1224] border-b border-slate-800 flex items-center justify-between text-xs print:hidden flex-wrap gap-2">
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => {
                sounds.playClick();
                setActiveTab('diploma');
              }}
              className={`px-3 py-1.5 rounded-xl font-black text-xs transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'diploma'
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-black shadow-md'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-750'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              <span>Generar Diploma Souvenir</span>
            </button>

            <button
              onClick={() => {
                sounds.playClick();
                setActiveTab('rubric');
              }}
              className={`px-3 py-1.5 rounded-xl font-black text-xs transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'rubric'
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-black shadow-md'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-750'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>Ficha Técnica para Jurados</span>
            </button>

            <button
              onClick={() => {
                sounds.playClick();
                setActiveTab('stand');
              }}
              className={`px-3 py-1.5 rounded-xl font-black text-xs transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'stand'
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-black shadow-md'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-750'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Kiosco de Demostración en Vivo</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyProjectLink}
              className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-sky-300 rounded-lg border border-slate-700 font-bold text-xs flex items-center gap-1"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copiedLink ? '¡Enlace Copiado!' : 'Compartir Stand'}</span>
            </button>
          </div>
        </div>

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* TAB 1: DIPLOMA / CERTIFICATE SOUVENIR */}
          {activeTab === 'diploma' && (
            <div className="space-y-4">
              <div className="bg-slate-900/80 p-3.5 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 print:hidden">
                <div className="flex-1 w-full sm:w-auto">
                  <label className="text-xs font-bold text-amber-300 block mb-1">
                    Personalizar Nombre del Jurado / Evaluador / Visitante:
                  </label>
                  <input
                    type="text"
                    value={visitorName}
                    onChange={(e) => setVisitorName(e.target.value)}
                    className="w-full bg-black/60 border border-slate-700 focus:border-amber-400 rounded-xl px-3 py-1.5 text-xs text-white outline-none"
                  />
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                  <button
                    onClick={handlePrint}
                    className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 hover:from-amber-300 hover:to-orange-400 text-black font-black text-xs flex items-center gap-2 shadow-lg transition-all hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Imprimir Diploma Oficial (PDF)</span>
                  </button>
                </div>
              </div>

              {/* Printable Certificate Canvas */}
              <div
                id="stem-diploma"
                className="bg-[#fcfbf7] text-[#1c1815] border-8 border-double border-[#8b6f47] p-6 sm:p-10 rounded-2xl shadow-2xl relative overflow-hidden font-serif text-center space-y-4"
              >
                {/* Vintage Watermark */}
                <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none text-9xl font-black">
                  🇨🇴
                </div>

                <div className="flex items-center justify-between border-b-2 border-[#8b6f47] pb-3 text-xs uppercase font-sans tracking-widest text-[#66543b]">
                  <span>Feria STEM 2026</span>
                  <span className="font-black text-[#8b2216]">Colegio Niño Jesús De Praga</span>
                  <span>República de Colombia</span>
                </div>

                <div className="space-y-1">
                  <span className="text-xs sm:text-sm font-sans uppercase tracking-widest text-[#7a6448] font-bold">
                    Certificado de Reconocimiento y Visita de Honor
                  </span>
                  <h1 className="text-2xl sm:text-4xl font-black text-[#261d15] tracking-wide uppercase">
                    EXPLORADOR HONORARIO DEL TIEMPO
                  </h1>
                  <p className="text-xs italic text-[#594936]">
                    Por su invaluable presencia, evaluación y aporte al proyecto interdisciplinar:
                  </p>
                  <p className="text-sm font-sans font-bold text-[#8b2216]">
                    "Leo en el Tiempo: Exploración Científica y Social del Siglo XX Colombiano"
                  </p>
                </div>

                <div className="py-4 border-t-2 border-b-2 border-[#d9cdb6] my-4">
                  <span className="text-xs font-sans text-[#7a6448] uppercase tracking-wider block mb-1">
                    Otorgado con distinción a:
                  </span>
                  <div className="text-2xl sm:text-3xl font-black text-[#1c140d] tracking-normal underline decoration-[#c99738]">
                    {visitorName || 'Jurado de Honor'}
                  </div>
                  <span className="text-xs font-sans font-bold text-[#5c4a35] mt-1 block">
                    {visitorRole}
                  </span>
                </div>

                <p className="text-xs text-[#4a3d2e] max-w-xl mx-auto leading-relaxed">
                  Habiendo verificado el funcionamiento del simulador cuántico, la síntesis de voz, los archivos restaurados de memoria histórica (1900 - 1999) y la integración del rigor STEM en Ciencias Sociales.
                </p>

                {/* Signatures and Seal */}
                <div className="pt-6 grid grid-cols-2 gap-6 items-end text-xs font-sans">
                  <div className="border-t border-[#8b6f47] pt-2 space-y-0.5">
                    <p className="font-black text-[#241c14]">Ángel David De La Barrera López</p>
                    <p className="text-[10px] text-[#69543d]">Director de Desarrollo de Software • Estudiante</p>
                    <p className="text-[9px] text-[#8b6f47]">Colegio Niño Jesús De Praga</p>
                  </div>

                  <div className="border-t border-[#8b6f47] pt-2 space-y-0.5">
                    <div className="inline-block px-3 py-1 bg-amber-500/20 border border-amber-600/50 rounded-full font-black text-amber-900 text-[10px] mb-1">
                      SELLO OFICIAL STEM 2026
                    </div>
                    <p className="font-black text-[#241c14]">Leo el Explorador</p>
                    <p className="text-[10px] text-[#69543d]">Copiloto Cuántico & Guía Histórico</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: TECHNICAL RUBRIC FOR JUDGES */}
          {activeTab === 'rubric' && (
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-sky-950/60 to-indigo-950/60 border border-sky-400/40 p-4 rounded-2xl">
                <h3 className="text-base font-black text-white flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-amber-400" />
                  <span>Ficha Técnica y Criterios de Evaluación STEM</span>
                </h3>
                <p className="text-xs text-sky-200 mt-1">
                  Guía estructurada para jurados evaluadores de ciencias, tecnología e ingeniería educativa.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 space-y-2">
                  <div className="flex items-center gap-2 text-cyan-400 font-bold">
                    <Zap className="w-4 h-4" />
                    <span className="text-sm">1. Innovación Tecnológica</span>
                  </div>
                  <p className="text-slate-300">
                    Síntesis y reconocimiento de voz bidireccional (Web Speech API neuronal), motor de túnel 3D con cálculos taquiónicos en Canvas y sistema de control de parada inmediata de voz en tiempo real.
                  </p>
                </div>

                <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 space-y-2">
                  <div className="flex items-center gap-2 text-amber-400 font-bold">
                    <BookOpen className="w-4 h-4" />
                    <span className="text-sm">2. Rigor Histórico & Cátedra de Paz</span>
                  </div>
                  <p className="text-slate-300">
                    Curaduría de fuentes primarias (Centro Nacional de Memoria Histórica, Señal Memoria, RTVCPlay y Constitución de 1991), abordando las raíces del conflicto social y el respeto innegociable a la vida.
                  </p>
                </div>

                <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 space-y-2">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold">
                    <Layers className="w-4 h-4" />
                    <span className="text-sm">3. Gamificación & Pedagogía Activa</span>
                  </div>
                  <p className="text-slate-300">
                    Sistema de progresión de 10 rangos de explorador temporal, misiones diarias por objetivos de aprendizaje, vestidor 2D, trivia con feedback explicativo y racha diaria con multiplicadores matemáticos.
                  </p>
                </div>

                <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 space-y-2">
                  <div className="flex items-center gap-2 text-rose-400 font-bold">
                    <Shield className="w-4 h-4" />
                    <span className="text-sm">4. Identidad Escolar & Trabajo en Equipo</span>
                  </div>
                  <p className="text-slate-300">
                    Desarrollado por estudiantes del Colegio Niño Jesús De Praga liderados por Ángel David De La Barrera López, demostrando autonomía, liderazgo digital y vocación por la educación pública y privada del país.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: STAND KIOSK MODE */}
          {activeTab === 'stand' && (
            <div className="text-center space-y-4 py-4">
              <div className="relative w-32 h-32 rounded-full border-4 border-amber-400 flex items-center justify-center mx-auto shadow-[0_0_50px_rgba(245,158,11,0.6)] animate-pulse">
                <span className="text-5xl animate-spin-slow">⏳</span>
              </div>

              <div>
                <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/40 text-xs font-black uppercase">
                  Stand Interactivo Activo
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white mt-2">
                  Colegio Niño Jesús De Praga • Stand Nº 1 Feria STEM
                </h3>
                <p className="text-xs text-slate-300 max-w-md mx-auto mt-1">
                  Invita al público a interactuar por voz con Leo: pregúntale sobre el Bogotazo, la llegada de la televisión o la Constitución de 1991.
                </p>
              </div>

              <div className="flex justify-center gap-3 pt-2">
                <button
                  onClick={() => {
                    sounds.playFanfare();
                    triggerConfetti(0.5, 0.4);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 text-black font-black text-xs shadow-lg transition-all hover:scale-105 active:scale-95 cursor-pointer"
                >
                  🎉 Lanzar Ovación y Confeti del Stand
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
