import React, { useState } from 'react';
import {
  X,
  ArrowLeft,
  Sparkles,
  Volume2,
  Compass,
  Zap,
  BookOpen,
  ArrowRight,
  Layers,
  ChevronRight,
  CheckCircle2,
  Info,
} from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface MindMapNode {
  id: string;
  category: 'central' | 'economia' | 'conflicto' | 'sociedad' | 'medios' | 'cultura';
  title: string;
  badge: string;
  year: number;
  icon: string;
  summary: string;
  keyPoints: string[];
  connections: string[];
}

const MIND_MAP_NODES: MindMapNode[] = [
  {
    id: 'node-central',
    category: 'central',
    title: 'Colombia en el Siglo XX (1900 - 1999)',
    badge: 'Eje Central de Aprendizaje',
    year: 1950,
    icon: '⏳',
    summary:
      'Cien años de transformaciones vertiginosas: el paso de un país incomunicado y rural a una república moderna, urbana, democrática y multicultural conectada por medios masivos.',
    keyPoints: [
      'Articulación de 5 dimensiones: Economía, Paz, Sociedad, Medios y Cultura.',
      'Transición del café y vapor a la tecnología digital y los derechos ciudadanos.',
      'Resiliencia comunitaria y reconstrucción constante del tejido social.',
    ],
    connections: ['node-ferrocarriles', 'node-bananeras', 'node-bogotazo', 'node-voto-femenino', 'node-television', 'node-gabo-nobel', 'node-constitucion-1991'],
  },
  // Rama Economía & Vías
  {
    id: 'node-ferrocarriles',
    category: 'economia',
    title: 'Ferrocarriles & Río Magdalena',
    badge: 'Economía & Infraestructura',
    year: 1925,
    icon: '🚂',
    summary:
      'El café financió la red ferroviaria y la navegación a vapor que unieron las cordilleras con los puertos del Caribe y el Pacífico, quebrando el aislamiento geográfico.',
    keyPoints: [
      'Locomotoras a vapor transportaban sacos de café hacia el puerto de Barranquilla.',
      'El Túnel de La Quiebra (1929) consolidó la conectividad de Antioquia.',
      'Base para el nacimiento de las primeras industrias nacionales.',
    ],
    connections: ['node-central', 'node-bananeras'],
  },
  // Rama Conflicto & Paz
  {
    id: 'node-bananeras',
    category: 'conflicto',
    title: 'Masacre de las Bananeras (1928)',
    badge: 'Luchas Obreras & Cátedra de Paz',
    year: 1928,
    icon: '🍌',
    summary:
      'Hito de las reivindicaciones laborales en Colombia. Miles de trabajadores de la United Fruit Company reclamaron salario en efectivo y atención médica.',
    keyPoints: [
      'Inspiración fundamental para la literatura de Gabriel García Márquez.',
      'Impulso histórico a las primeras legislaciones laborales y sindicales en Colombia.',
      'Lección para no resolver tensiones laborales mediante la violencia militar.',
    ],
    connections: ['node-central', 'node-ferrocarriles', 'node-bogotazo'],
  },
  {
    id: 'node-bogotazo',
    category: 'conflicto',
    title: 'El Bogotazo & Jorge Eliécer Gaitán (1948)',
    badge: 'Fractura Política & Transformación Urbana',
    year: 1948,
    icon: '🔥',
    summary:
      'El asesinato del caudillo popular el 9 de abril de 1948 desató la rebelión que transformó para siempre la fisonomía de Bogotá y aceleró el periodo de La Violencia.',
    keyPoints: [
      'Destrucción del sistema de tranvías eléctricos de la capital.',
      'Desplazamiento forzado hacia las ciudades y cambio demográfico acelerado.',
      'Gaitán defendió la dignidad popular frente a la desigualdad social.',
    ],
    connections: ['node-central', 'node-bananeras', 'node-television', 'node-voto-femenino'],
  },
  // Rama Sociedad & Mujeres
  {
    id: 'node-voto-femenino',
    category: 'sociedad',
    title: 'Voto Femenino & Derechos Civiles (1957)',
    badge: 'Democracia & Equidad de Género',
    year: 1957,
    icon: '🗳️',
    summary:
      'El 1 de diciembre de 1957 las mujeres colombianas ejercieron su derecho al voto por primera vez en el plebiscito nacional, tras décadas de valiente lucha de pioneras como Esmeralda Arboleda y Josefina Valencia.',
    keyPoints: [
      'Reconocimiento definitivo de la ciudadanía plena a las mujeres colombianas.',
      'Apertura para el acceso masivo de mujeres a las universidades públicas y privadas.',
      'Consolidación del Frente Nacional como pacto político pacificador.',
    ],
    connections: ['node-central', 'node-bogotazo', 'node-constitucion-1991'],
  },
  // Rama Telecomunicaciones & Medios
  {
    id: 'node-television',
    category: 'medios',
    title: 'Inauguración de la Televisión (1954)',
    badge: 'Ciencia & Telecomunicaciones',
    year: 1954,
    icon: '📺',
    summary:
      'El 13 de junio de 1954 inició la televisión nacional desde el Palacio de San Carlos con equipos importados de Alemania y Estados Unidos, integrando la educación y cultura al hogar.',
    keyPoints: [
      'Transmisión inicial con receptores instalados en plazas públicas y vitrinas comerciales.',
      'Uso pedagógico de las teleclases para erradicar el analfabetismo en zonas rurales.',
      'Precursor del Sistema de Medios Públicos (Inravisión, hoy RTVCPlay).',
    ],
    connections: ['node-central', 'node-bogotazo', 'node-gabo-nobel'],
  },
  // Rama Cultura & Letras
  {
    id: 'node-gabo-nobel',
    category: 'cultura',
    title: 'Nobel de Literatura de Gabriel García Márquez (1982)',
    badge: 'Letras Universales & Realismo Mágico',
    year: 1982,
    icon: '📚',
    summary:
      'El 10 de diciembre de 1982 en Estocolmo, Gabo vistió su liqui-liqui blanco para recibir el primer Premio Nobel para Colombia con su discurso "La soledad de América Latina".',
    keyPoints: [
      'Exaltación mundial de la cultura caribeña, la biodiversidad y la memoria histórica.',
      'Demostró que la literatura colombiana narra con maestría las heridas y la poesía de su pueblo.',
      'Referente de orgullo e inspiración para los jóvenes creadores colombianos.',
    ],
    connections: ['node-central', 'node-television', 'node-constitucion-1991'],
  },
  // Nodo Cátedra de Paz & Constitución
  {
    id: 'node-constitucion-1991',
    category: 'conflicto',
    title: 'Constitución de 1991: Estado Social de Derecho',
    badge: 'Paz, Diversidad & Derechos Fundamentales',
    year: 1991,
    icon: '📜',
    summary:
      'Nacida del movimiento estudiantil de la Séptima Papeleta, la Carta Magna de 1991 consagró a Colombia como una nación pluriétnica, multicultural y participativa, creando la Acción de Tutela.',
    keyPoints: [
      'Acción de Tutela: herramienta judicial rápida para proteger la salud, educación y vida.',
      'Artículo 44: Los derechos de los niños y niñas prevalecen sobre todos los demás.',
      'Reconocimiento constitucional a las comunidades indígenas y afrocolombianas.',
    ],
    connections: ['node-central', 'node-voto-femenino', 'node-gabo-nobel'],
  },
];

interface QuantumMindMapModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTravelToYear: (year: number) => void;
  onSpeakText: (text: string) => void;
}

export const QuantumMindMapModal: React.FC<QuantumMindMapModalProps> = ({
  isOpen,
  onClose,
  onTravelToYear,
  onSpeakText,
}) => {
  const [selectedNode, setSelectedNode] = useState<MindMapNode>(MIND_MAP_NODES[0]);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('all');

  if (!isOpen) return null;

  const categories = [
    { id: 'all', label: 'Todos los Ejes (8)' },
    { id: 'conflicto', label: '🕊️ Cátedra de Paz' },
    { id: 'economia', label: '🚂 Infraestructura' },
    { id: 'sociedad', label: '🗳️ Derechos & Mujeres' },
    { id: 'medios', label: '📺 Telecomunicaciones' },
    { id: 'cultura', label: '📚 Literatura & Nobel' },
  ];

  const filteredNodes = MIND_MAP_NODES.filter(
    (n) => activeCategoryFilter === 'all' || n.category === activeCategoryFilter || n.category === 'central'
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn select-none">
      <div className="bg-gradient-to-b from-[#0b132b] via-[#070e22] to-[#040816] border-2 border-cyan-400/70 rounded-3xl w-full max-w-5xl max-h-[94vh] flex flex-col shadow-[0_0_70px_rgba(6,182,212,0.4)] overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-cyan-500/20 bg-gradient-to-r from-cyan-500/20 via-sky-500/15 to-indigo-600/20 flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                sounds.playClick();
                onClose();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/90 text-cyan-300 hover:text-white border border-slate-700 text-xs font-bold transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-md"
            >
              <ArrowLeft className="w-4 h-4 text-cyan-400" />
              <span>Volver atrás</span>
            </button>

            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-400 to-indigo-600 flex items-center justify-center shadow-lg text-2xl animate-pulse">
              🧠
            </div>

            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] uppercase font-black tracking-widest text-cyan-300 bg-cyan-500/25 px-2 py-0.5 rounded-full border border-cyan-400/40">
                  Feria STEM • Visualizador Conceptual
                </span>
                <span className="text-xs text-sky-200 font-bold bg-sky-500/20 px-2 py-0.5 rounded-full border border-sky-400/30">
                  🏫 Colegio Niño Jesús De Praga
                </span>
              </div>
              <h2 className="text-base sm:text-xl font-black text-white">
                Mapa Mental Cuántico: Colombia en el Siglo XX
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

        {/* Filter Bar */}
        <div className="px-4 py-2 bg-[#091224] border-b border-slate-800 flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-slate-400 font-bold uppercase text-[10px] whitespace-nowrap">Filtrar Ejes:</span>
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => {
                sounds.playClick();
                setActiveCategoryFilter(c.id);
              }}
              className={`px-3 py-1 rounded-xl font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeCategoryFilter === c.id
                  ? 'bg-cyan-500 text-slate-950 font-black shadow-md'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Content Body: Grid of Nodes (Left) + Detailed Inspector (Right) */}
        <div className="flex-1 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-800">
          {/* Left Column: Interactive Conceptual Grid of Nodes */}
          <div className="lg:col-span-7 p-4 sm:p-5 space-y-3 overflow-y-auto">
            <div className="text-xs text-slate-400 flex items-center gap-1.5 mb-1">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Haz clic sobre cualquier nodo conceptual para examinar sus conexiones y aprendizajes:</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {filteredNodes.map((node) => {
                const isSelected = selectedNode.id === node.id;
                const isCentral = node.category === 'central';

                return (
                  <div
                    key={node.id}
                    onClick={() => {
                      sounds.playClick();
                      setSelectedNode(node);
                    }}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer relative overflow-hidden group ${
                      isCentral ? 'sm:col-span-2' : ''
                    } ${
                      isSelected
                        ? 'bg-gradient-to-br from-cyan-950/70 to-indigo-950/70 border-cyan-400 shadow-[0_0_25px_rgba(6,182,212,0.4)] scale-[1.02]'
                        : 'bg-slate-900/70 hover:bg-slate-800/80 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-11 h-11 rounded-2xl flex items-center justify-center text-2xl shrink-0 shadow-md transition-transform group-hover:scale-110 ${
                          isSelected
                            ? 'bg-gradient-to-tr from-cyan-400 to-indigo-500 text-white'
                            : 'bg-slate-800 border border-slate-700'
                        }`}
                      >
                        {node.icon}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className="text-[10px] font-black uppercase text-cyan-300">
                            {node.badge}
                          </span>
                          <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-md bg-slate-800 text-amber-300 border border-slate-700">
                            {node.year}
                          </span>
                        </div>

                        <h4 className="text-xs sm:text-sm font-black text-white group-hover:text-cyan-200 transition-colors leading-snug">
                          {node.title}
                        </h4>

                        <p className="text-[11px] text-slate-300 mt-1 line-clamp-2">
                          {node.summary}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Deep-Dive Node Inspector */}
          <div className="lg:col-span-5 p-4 sm:p-5 space-y-4 bg-[#081024]/80 overflow-y-auto flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-cyan-400 bg-cyan-500/20 px-2 py-0.5 rounded-full border border-cyan-400/30">
                    {selectedNode.badge}
                  </span>
                  <h3 className="text-lg sm:text-xl font-black text-white mt-1.5 leading-snug">
                    {selectedNode.title}
                  </h3>
                  <span className="text-xs text-amber-300 font-bold">
                    Año Clave: {selectedNode.year}
                  </span>
                </div>

                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-400 to-indigo-600 flex items-center justify-center text-3xl shadow-lg shrink-0">
                  {selectedNode.icon}
                </div>
              </div>

              {/* Summary */}
              <div className="bg-[#0b1633] p-3.5 rounded-2xl border border-cyan-500/25">
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                  {selectedNode.summary}
                </p>
              </div>

              {/* Key takeaways */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-sky-300 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-sky-400" />
                  Ejes de Aprendizaje para la Feria STEM:
                </span>
                <div className="space-y-1.5">
                  {selectedNode.keyPoints.map((point, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2 bg-slate-900/70 p-2.5 rounded-xl border border-slate-800 text-xs text-slate-300"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-3 border-t border-slate-800 space-y-2">
              <button
                onClick={() => {
                  sounds.playHyperDrive();
                  onTravelToYear(selectedNode.year);
                  onClose();
                }}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-400 via-sky-500 to-indigo-600 hover:from-cyan-300 hover:to-indigo-500 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(6,182,212,0.6)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                <Zap className="w-4 h-4 text-amber-300 animate-bounce" />
                <span>🚀 Viajar al año {selectedNode.year} en la Máquina</span>
              </button>

              <button
                onClick={() => {
                  sounds.playClick();
                  onSpeakText(`${selectedNode.title}. ${selectedNode.summary}`);
                }}
                className="w-full py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-bold border border-slate-700 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Escuchar explicación de Leo</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
