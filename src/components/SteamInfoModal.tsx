import React, { useState } from 'react';
import {
  X,
  ArrowLeft,
  Sparkles,
  BookOpen,
  Cpu,
  Palette,
  HeartHandshake,
  Atom,
  Binary,
  Wrench,
  Calculator,
  Compass,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  Award,
} from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface SteamInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SteamInfoModal: React.FC<SteamInfoModalProps> = ({ isOpen, onClose }) => {
  const [selectedPillar, setSelectedPillar] = useState<string>('all');

  if (!isOpen) return null;

  const steamPillars = [
    {
      id: 'science',
      letter: 'S',
      title: 'Science (Ciencias Naturales & Físicas)',
      color: 'from-amber-500 to-yellow-500',
      borderColor: 'border-amber-400/50',
      badgeBg: 'bg-amber-500/20 text-amber-300 border-amber-400/40',
      icon: '🔬',
      why: 'Fundamenta las leyes físicas del viaje en el tiempo (relatividad de Einstein, agujeros de gusano de Einstein-Rosen), el espectro electromagnético de las telecomunicaciones y la ecología botánica del siglo XX.',
      where: 'En el Motor Cuántico de Viajes Temporales, el Simulador de Partículas Relativistas en Canvas, el radar de épocas y el análisis ecológico amazónico en La Vorágine.',
      how: 'Ejecutamos un modelo físico de aceleración cinemática y estelar en Canvas 2D/WebGL que simula dilatación temporal relativista según el año seleccionado (1900-1999), integrando datos verídicos de salubridad pública y botánica cauchera (Hevea brasiliensis).',
    },
    {
      id: 'technology',
      letter: 'T',
      title: 'Technology (Tecnología & Telecomunicaciones)',
      color: 'from-sky-500 to-cyan-500',
      borderColor: 'border-sky-400/50',
      badgeBg: 'bg-sky-500/20 text-sky-300 border-sky-400/40',
      icon: '⚡',
      why: 'Democratiza el acceso a la historia mediante tecnologías web de última generación, al mismo tiempo que enseña la evolución de las telecomunicaciones en Colombia (radio, telégrafo, TV analógica y computación).',
      where: 'En el Asistente de Voz Inteligente "¡Oye Leo!", el sintetizador sonoro analógico por Web Audio API y el sistema de comandos de voz manos libres.',
      how: 'Implementamos la Web Speech API nativa (SpeechRecognition con dialecto es-CO) sincronizada con síntesis de voz neuronal (TTS), un sintetizador Web Audio API puro con osciladores y filtros en tiempo real sin latencia ni archivos externos, y almacenamiento reactivo con LocalStorage.',
    },
    {
      id: 'engineering',
      letter: 'E',
      title: 'Engineering (Ingeniería de Software & Civil)',
      color: 'from-emerald-500 to-teal-500',
      borderColor: 'border-emerald-400/50',
      badgeBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40',
      icon: '⚙️',
      why: 'Aplica ingeniería de software moderna de alto rendimiento y rinde homenaje a las colosales obras de ingeniería colombiana del siglo XX (el Túnel de La Quiebra de 1929, ferrocarriles nacionales y presas hidroeléctricas).',
      where: 'En el Túnel Cuántico 3D hiper-lumínico, el Generador Procedimental de Periódicos Históricos Imprimibles y la arquitectura modular del código.',
      how: 'Diseñamos una arquitectura modular y desacoplada en TypeScript + React bajo Vite, filtros biquad de segundo orden en procesamiento de audio digital, y cálculo cinemático de matrices vectoriales para el efecto tridimensional de túnel espacio-temporal.',
    },
    {
      id: 'arts',
      letter: 'A',
      title: 'Arts (Artes, Literatura & Humanidades)',
      color: 'from-purple-500 to-pink-500',
      borderColor: 'border-purple-400/50',
      badgeBg: 'bg-purple-500/20 text-purple-300 border-purple-400/40',
      icon: '🎨',
      why: 'Estimula la creatividad, la apreciación estética, el valor de la lengua materna y el patrimonio literario, musical y plástico de Colombia en el siglo XX.',
      where: 'En el Salón de Lengua Castellana, el Taller de Micro-relatos de Época, las tipografías vintage del periódico y la curaduría de autores cumbres.',
      how: 'Integramos obras maestras de Gabriel García Márquez (Realismo Mágico), José Eustasio Rivera, Tomás Carrasquilla, Gonzalo Arango (Nadaísmo), Marvel Moreno y Albalucía Ángel; lectura automatizada de sinopsis; diccionarios de tradición oral y estética retro-futurista con micro-interacciones.',
    },
    {
      id: 'math',
      letter: 'M',
      title: 'Mathematics (Matemáticas & Algoritmos)',
      color: 'from-amber-500 to-orange-500',
      borderColor: 'border-amber-400/50',
      badgeBg: 'bg-amber-500/20 text-amber-300 border-amber-400/40',
      icon: '📐',
      why: 'Fomenta el razonamiento cuantitativo, el análisis cronológico secuencial, la lógica combinatoria y el modelado probabilístico.',
      where: 'En el Minijuego de Ordenación Cronológica de Obras, la Ruleta de Premios Cuánticos, los multiplicadores exponenciales de racha y el sistema de XP.',
      how: 'Implementamos algoritmos de validación de series cronológicas, cálculo trigonométrico continuo (seno y coseno) para órbitas de partículas en el canvas, fórmulas de ponderación exponencial de experiencia según rachas de 5 días, y balance probabilístico de monedas.',
    },
    {
      id: 'plus',
      letter: '+',
      title: '+ Plus (Ciencias Sociales, Ciudadanía & Cátedra de Paz)',
      color: 'from-rose-500 to-red-600',
      borderColor: 'border-rose-400/50',
      badgeBg: 'bg-rose-500/20 text-rose-300 border-rose-400/40',
      icon: '🕊️',
      why: 'Constituye el corazón pedagógico de la experiencia: reconstruir la memoria histórica, comprender las raíces del conflicto social y empoderar a los niños como constructores de paz.',
      where: 'En el Mapa Histórico de Conflicto y Paz de Colombia, los retos de indagación escolar, el Voto Femenino de 1957 y la Constitución de 1991.',
      how: 'Diseñamos una Cátedra de Paz interactiva por regiones geográficas que profundiza en la Masacre de las Bananeras (1928), el Bogotazo (1948), el Frente Nacional, la Séptima Papeleta y el Artículo 44 de la Constitución de 1991 sobre los derechos prevalentes de la infancia.',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-gradient-to-b from-[#111e3f] via-[#0b1428] to-[#070d18] border-2 border-sky-400/40 rounded-3xl shadow-[0_0_60px_rgba(14,165,233,0.3)] overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-[#172a5a] via-[#1c2e64] to-[#12234c] border-b border-sky-500/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                sounds.playClick();
                onClose();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-500/20 hover:bg-sky-500/30 text-sky-200 border border-sky-400/40 text-xs font-bold transition-all hover:scale-105 active:scale-95"
              title="Volver al Laboratorio"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Volver atrás</span>
            </button>

            <span className="text-2xl sm:text-3xl p-1.5 rounded-2xl bg-sky-500/20 border border-sky-400/30">
              🔬
            </span>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] uppercase font-black tracking-widest text-amber-300 bg-amber-500/25 px-2 py-0.5 rounded-full border border-amber-400/40">
                  Feria STEM 2026
                </span>
                <span className="text-xs text-sky-200 font-bold bg-sky-500/20 px-2.5 py-0.5 rounded-full border border-sky-400/30 flex items-center gap-1">
                  🏫 Colegio Niño Jesús De Praga
                </span>
              </div>
              <h3 className="text-base sm:text-xl font-black text-white">
                Proyecto Oficial para la Feria STEM • Colegio Niño Jesús De Praga
              </h3>
            </div>
          </div>

          <button
            onClick={() => {
              sounds.playClick();
              onClose();
            }}
            className="p-2 rounded-full bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors border border-slate-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="p-4 sm:p-6 space-y-6 overflow-y-auto text-xs sm:text-sm text-slate-200 leading-relaxed">
          {/* Institutional School STEM Banner */}
          <div className="bg-gradient-to-r from-amber-500/15 via-sky-500/15 to-indigo-500/15 border-2 border-amber-400/50 p-4 sm:p-5 rounded-3xl shadow-xl flex flex-col sm:flex-row items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-400 to-sky-500 p-0.5 shrink-0 shadow-lg flex items-center justify-center text-3xl">
              🏫
            </div>
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-[11px] font-black uppercase tracking-widest text-amber-300">
                Colegio Niño Jesús De Praga • Exposición Interdisciplinar
              </span>
              <h4 className="text-base sm:text-lg font-black text-white">
                "Leo en el Tiempo": Ciencia, Tecnología y Sociedad en el Siglo XX Colombiano
              </h4>
              <p className="text-xs text-slate-300">
                Desarrollado como proyecto central para la <strong>Feria STEM</strong> de nuestra institución educativa, articulando el pensamiento crítico, la memoria histórica, la síntesis de voz neuronal y la experimentación digital interactiva.
              </p>
            </div>
          </div>

          {/* Executive Educational Manifesto Box */}
          <div className="bg-gradient-to-r from-sky-950/70 via-indigo-950/60 to-purple-950/70 p-4 sm:p-5 rounded-3xl border-2 border-sky-400/30 shadow-lg space-y-2">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <h4 className="font-black text-white text-sm sm:text-base">
                ¿Por qué "Leo en el Tiempo" es un proyecto integral STEM+?
              </h4>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              La enseñanza tradicional de las Ciencias Sociales solía reducirse a memorizar fechas y batallas. En <strong>"Leo en el Tiempo"</strong>, rompemos ese paradigma integrando la ciencia experimental, las telecomunicaciones, la ingeniería de software, la literatura y el rigor matemático para que los estudiantes del <strong>Colegio Niño Jesús De Praga</strong> <em>vivan y experimenten</em> los acontecimientos cruciales del siglo XX de manera significativa, lúdica e interactiva.
            </p>
          </div>

          {/* Filter Pills for STEAM Pillars */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <button
              onClick={() => {
                sounds.playClick();
                setSelectedPillar('all');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedPillar === 'all'
                  ? 'bg-amber-400 text-black shadow-md'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
              }`}
            >
              Ver Todos los 6 Pilares
            </button>
            {steamPillars.map((p) => (
              <button
                key={p.id}
                onClick={() => {
                  sounds.playClick();
                  setSelectedPillar(p.id);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  selectedPillar === p.id
                    ? 'bg-sky-500 text-white shadow-md'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 border border-slate-700'
                }`}
              >
                <span>{p.icon}</span>
                <span>{p.letter}</span>
              </button>
            ))}
          </div>

          {/* Detailed Pillars Showcase */}
          <div className="space-y-4">
            {steamPillars
              .filter((p) => selectedPillar === 'all' || selectedPillar === p.id)
              .map((p) => (
                <div
                  key={p.id}
                  className={`bg-[#0c1630] border-2 ${p.borderColor} rounded-3xl p-4 sm:p-5 shadow-lg space-y-3 transition-all`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-2.5">
                    <div className="flex items-center gap-3">
                      <span className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-slate-900 to-slate-800 border border-sky-400/40 flex items-center justify-center text-2xl shadow-inner">
                        {p.icon}
                      </span>
                      <div>
                        <span className={`text-[10px] uppercase font-black px-2 py-0.5 rounded-full border ${p.badgeBg} inline-block mb-0.5`}>
                          Pilar Oficial {p.letter}
                        </span>
                        <h4 className="text-sm sm:text-base font-black text-white">
                          {p.title}
                        </h4>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                    {/* Why */}
                    <div className="bg-[#070e20] p-3 rounded-2xl border border-sky-500/20 space-y-1">
                      <span className="font-bold text-amber-300 flex items-center gap-1 text-[11px] uppercase tracking-wide">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                        <span>1. ¿Por qué lo utilizamos?</span>
                      </span>
                      <p className="text-slate-300 leading-relaxed">
                        {p.why}
                      </p>
                    </div>

                    {/* Where */}
                    <div className="bg-[#070e20] p-3 rounded-2xl border border-sky-500/20 space-y-1">
                      <span className="font-bold text-sky-300 flex items-center gap-1 text-[11px] uppercase tracking-wide">
                        <Compass className="w-3.5 h-3.5 text-sky-400" />
                        <span>2. ¿En dónde se utiliza?</span>
                      </span>
                      <p className="text-slate-300 leading-relaxed">
                        {p.where}
                      </p>
                    </div>

                    {/* How executed */}
                    <div className="bg-[#070e20] p-3 rounded-2xl border border-sky-500/20 space-y-1">
                      <span className="font-bold text-emerald-300 flex items-center gap-1 text-[11px] uppercase tracking-wide">
                        <Wrench className="w-3.5 h-3.5 text-emerald-400" />
                        <span>3. ¿De qué manera lo ejecutamos?</span>
                      </span>
                      <p className="text-slate-300 leading-relaxed">
                        {p.how}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
          </div>

          {/* Official Developers & Engineering Team Card */}
          <div className="bg-gradient-to-r from-amber-500/15 via-sky-500/15 to-indigo-500/15 p-4 sm:p-5 rounded-3xl border-2 border-amber-400/60 shadow-xl space-y-3.5">
            <div className="flex items-center gap-3">
              <span className="text-2xl p-2 rounded-2xl bg-amber-500/20 border border-amber-400/40">
                👨‍💻
              </span>
              <div>
                <span className="text-[10px] uppercase font-black text-amber-400 tracking-wider block">
                  Feria Escolar STEAM+ • Colombia
                </span>
                <h4 className="text-sm sm:text-base font-black text-white">
                  Equipo Oficial de Creación & Desarrollo:
                </h4>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Esta plataforma interactiva fue diseñada, investigada y programada con altos estándares de calidad educativa por el equipo:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              {[
                { name: 'ANGEL DAVID DE LA BARRERA LÓPEZ', role: 'Director de Desarrollo', isLead: true },
                { name: 'JUAN CAMILO MANGONES MIRANDA', role: 'Desarrollador', isLead: false },
                { name: 'JUAN JAVIER SIERRA BARRIOS', role: 'Desarrollador', isLead: false },
                { name: 'JESSY ALDAIR LUGO SOTO', role: 'Desarrollador', isLead: false },
                { name: 'JULIAN JAVIER RODRÍGUEZ VARGAS', role: 'Desarrollador', isLead: false },
              ].map((dev, idx) => (
                <div
                  key={idx}
                  className={`rounded-2xl p-3 flex items-center gap-3 border transition-all ${
                    dev.isLead
                      ? 'bg-gradient-to-r from-amber-500/30 via-orange-500/20 to-amber-500/20 border-amber-400 sm:col-span-2 shadow-md'
                      : 'bg-[#081226] border-sky-500/30'
                  }`}
                >
                  <span
                    className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-black shadow ${
                      dev.isLead ? 'bg-amber-400 text-black' : 'bg-slate-800 text-amber-300 border border-slate-700'
                    }`}
                  >
                    {dev.isLead ? '👑' : idx + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <span className="text-xs font-bold text-white block truncate">
                      {dev.name}
                    </span>
                    <span
                      className={`text-[10px] font-semibold block ${
                        dev.isLead ? 'text-amber-300 font-bold uppercase' : 'text-sky-300'
                      }`}
                    >
                      {dev.role}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center pt-2">
            <button
              onClick={() => {
                sounds.playClick();
                onClose();
              }}
              className="px-8 py-2.5 rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-black text-xs sm:text-sm shadow-xl transition-all hover:scale-105 active:scale-95 border border-sky-300/40"
            >
              ¡Entendido, Explorador Cuántico!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
