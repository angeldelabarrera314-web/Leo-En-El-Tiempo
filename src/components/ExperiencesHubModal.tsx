import React, { useState } from 'react';
import {
  ArrowLeft,
  X,
  Gamepad2,
  Sparkles,
  Shirt,
  Flame,
  Newspaper,
  Zap,
  MapPin,
  ShieldAlert,
  Compass,
  BookOpen,
  Award,
  Calendar,
  Rocket,
  Search,
  ChevronRight,
  HelpCircle,
} from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface ExperiencesHubModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (destination: string) => void;
  coins: number;
  streakDay: number;
  multiplierLabel: string;
}

interface HubItem {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  badgeColor: string;
  icon: string;
  gradient: string;
  borderGlow: string;
}

export const ExperiencesHubModal: React.FC<ExperiencesHubModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
  coins,
  streakDay,
  multiplierLabel,
}) => {
  const [filter, setFilter] = useState<'all' | 'games' | 'explore' | 'school'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const items: (HubItem & { category: 'games' | 'explore' | 'school' })[] = [
    {
      id: 'heroes-gallery',
      category: 'explore',
      title: 'Galería de Héroes & Figuras del Siglo XX',
      subtitle: 'Retratos artísticos generados por IA, líneas de tiempo detalladas y citas históricas.',
      badge: 'Retratos IA',
      badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-400/40',
      icon: '🏛️',
      gradient: 'from-amber-950/70 via-yellow-950/60 to-[#0c142b]',
      borderGlow: 'border-amber-400/50 hover:border-amber-400',
    },
    {
      id: 'historic-cinema',
      category: 'explore',
      title: 'Sala de Cine Histórico (Documentales)',
      subtitle: '6 películas y crónicas en video del siglo XX con sala oscura, sonido y trivia con XP.',
      badge: 'Cine & Video',
      badgeColor: 'bg-red-500/20 text-red-300 border-red-400/40',
      icon: '🎬',
      gradient: 'from-red-950/70 via-purple-950/60 to-[#0c142b]',
      borderGlow: 'border-red-400/50 hover:border-red-400',
    },
    {
      id: 'lengua-castellana',
      category: 'school',
      title: 'Salón de Lengua Castellana & Literatura',
      subtitle: 'Obras de Gabo, La Vorágine, Nadaísmo, diccionario de colombianismos y taller de relatos.',
      badge: 'Nuevo',
      badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-400/40',
      icon: '📖',
      gradient: 'from-amber-950/70 via-orange-950/60 to-[#0c142b]',
      borderGlow: 'border-amber-400/50 hover:border-amber-400',
    },
    {
      id: 'traveler-ranking',
      category: 'games',
      title: 'Ranking Nacional de Viajeros del Tiempo',
      subtitle: 'Tabla de clasificación en tiempo real de los mejores exploradores de Colombia.',
      badge: 'En Vivo',
      badgeColor: 'bg-yellow-500/20 text-yellow-300 border-yellow-400/40',
      icon: '🏆',
      gradient: 'from-yellow-950/60 via-amber-950/60 to-[#0c142b]',
      borderGlow: 'border-yellow-400/50 hover:border-yellow-400',
    },
    {
      id: 'minigames',
      category: 'games',
      title: 'Minijuegos & Arcade Histórico',
      subtitle: 'Quiz show de 100 preguntas, ruleta de oro, trompo criollo y descifrar la palabra.',
      badge: 'Popular',
      badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-400/40',
      icon: '🎮',
      gradient: 'from-purple-900/60 via-indigo-950/70 to-[#0c142b]',
      borderGlow: 'border-purple-400/50 hover:border-purple-400',
    },
    {
      id: 'conflict-map',
      category: 'explore',
      title: 'Mapa Histórico del Conflicto & Paz',
      subtitle: 'Focos del conflicto por décadas, acuerdos y Cátedra de Paz de Colombia.',
      badge: 'Cátedra de Paz',
      badgeColor: 'bg-red-500/20 text-red-300 border-red-400/40',
      icon: '🗺️',
      gradient: 'from-rose-950/60 via-red-950/60 to-[#0c142b]',
      borderGlow: 'border-rose-400/50 hover:border-rose-400',
    },
    {
      id: 'time-tunnel',
      category: 'games',
      title: 'Túnel Cuántico 3D',
      subtitle: 'Simulador visual de despegue temporal a través del hiperespacio.',
      badge: '3D FX',
      badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-400/40',
      icon: '🌀',
      gradient: 'from-cyan-950/60 via-sky-950/60 to-[#0c142b]',
      borderGlow: 'border-cyan-400/50 hover:border-cyan-400',
    },
    {
      id: 'customizer',
      category: 'games',
      title: 'Vestidor 2D de Leo',
      subtitle: 'Cambia sombreros, ruanas, gafas y viste a Leo con trajes del siglo XX.',
      badge: 'Avatar 2D',
      badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-400/40',
      icon: '👕',
      gradient: 'from-amber-950/60 via-yellow-950/60 to-[#0c142b]',
      borderGlow: 'border-amber-400/50 hover:border-amber-400',
    },
    {
      id: 'exploration-streak',
      category: 'games',
      title: 'Racha de Exploración (5 Días)',
      subtitle: `Multiplica tus monedas ganadas (actual: ${multiplierLabel}) viajando a diario.`,
      badge: `Día ${streakDay}/5 • ${multiplierLabel}`,
      badgeColor: 'bg-orange-500/20 text-orange-300 border-orange-400/40',
      icon: '🔥',
      gradient: 'from-orange-950/60 via-amber-950/60 to-[#0c142b]',
      borderGlow: 'border-orange-400/50 hover:border-orange-400',
    },
    {
      id: 'vintage-newspaper',
      category: 'school',
      title: 'Periódico Histórico Escolar',
      subtitle: 'Genera e imprime la portada auténtica del año actual para tu cartelera escolar.',
      badge: 'Imprimible',
      badgeColor: 'bg-yellow-500/20 text-yellow-300 border-yellow-400/40',
      icon: '📰',
      gradient: 'from-[#2e261f]/80 via-[#1f1a15]/80 to-[#0c142b]',
      borderGlow: 'border-[#a89578]/50 hover:border-[#a89578]',
    },
    {
      id: 'homework-helper',
      category: 'school',
      title: 'Ayudante de Tareas Escolares',
      subtitle: 'Resúmenes para cuaderno, ideas de maquetas y cuestionarios para exámenes.',
      badge: 'Ciencias Sociales',
      badgeColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-400/40',
      icon: '📝',
      gradient: 'from-indigo-950/60 via-blue-950/60 to-[#0c142b]',
      borderGlow: 'border-indigo-400/50 hover:border-indigo-400',
    },
    {
      id: 'passport',
      category: 'explore',
      title: 'Pasaporte Temporal Colombiano',
      subtitle: 'Colecciona los sellos de cada época histórica que has visitado.',
      badge: 'Coleccionable',
      badgeColor: 'bg-teal-500/20 text-teal-300 border-teal-400/40',
      icon: '🛂',
      gradient: 'from-teal-950/60 via-emerald-950/60 to-[#0c142b]',
      borderGlow: 'border-teal-400/50 hover:border-teal-400',
    },
    {
      id: 'missions',
      category: 'school',
      title: 'Misiones Escolares STEAM+',
      subtitle: 'Retos de investigación histórica por décadas que otorgan monedas cuánticas.',
      badge: 'Retos',
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40',
      icon: '🏆',
      gradient: 'from-emerald-950/60 via-green-950/60 to-[#0c142b]',
      borderGlow: 'border-emerald-400/50 hover:border-emerald-400',
    },
    {
      id: 'compass',
      category: 'explore',
      title: 'Brújula de Regiones de Colombia',
      subtitle: 'Acontecimientos clave en Caribe, Andina, Pacífica, Orinoquía y Amazonía.',
      badge: 'Geografía',
      badgeColor: 'bg-sky-500/20 text-sky-300 border-sky-400/40',
      icon: '🧭',
      gradient: 'from-sky-950/60 via-cyan-950/60 to-[#0c142b]',
      borderGlow: 'border-sky-400/50 hover:border-sky-400',
    },
    {
      id: 'time-machine',
      category: 'explore',
      title: 'Consola Cuántica Temporal',
      subtitle: 'Calibra el año exacto (1900-1999) y salta en el tiempo.',
      badge: 'Base',
      badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-400/40',
      icon: '⏳',
      gradient: 'from-blue-950/60 via-slate-900/60 to-[#0c142b]',
      borderGlow: 'border-blue-400/50 hover:border-blue-400',
    },
  ];

  const filtered = items.filter((item) => {
    const matchesFilter = filter === 'all' || item.category === filter;
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.subtitle.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn select-none"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-5xl bg-gradient-to-b from-[#151f38] via-[#0d1629] to-[#070b16] border-2 border-amber-400/40 rounded-3xl shadow-[0_0_60px_rgba(245,158,11,0.25)] overflow-hidden flex flex-col max-h-[92vh]"
      >
        {/* Header */}
        <div className="p-3.5 sm:p-4 bg-[#19274e] border-b border-sky-500/30 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <button
              onClick={onClose}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-500/20 hover:bg-sky-500/30 text-sky-200 border border-sky-400/40 text-xs font-bold transition-all hover:scale-105"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Volver al Viaje</span>
            </button>

            <div className="p-2 rounded-2xl bg-gradient-to-tr from-purple-500 to-indigo-600 text-white font-black shadow-md hidden sm:flex">
              <Gamepad2 className="w-5 h-5" />
            </div>

            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span>Centro de Juegos & Experiencias Cuánticas</span>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-400/40">
                  HUB PRINCIPAL
                </span>
              </h3>
              <p className="text-xs text-sky-200">
                Selecciona cualquier actividad interactiva, minijuegos arcade o herramientas escolares
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-bold font-digital">
              <span>⚡</span>
              <span>{coins} Monedas</span>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full bg-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="p-3 sm:px-6 bg-[#0c142b]/90 border-b border-slate-700/60 flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            <button
              onClick={() => {
                sounds.playClick();
                setFilter('all');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                filter === 'all'
                  ? 'bg-sky-500 text-white shadow-md'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Todo ({items.length})
            </button>

            <button
              onClick={() => {
                sounds.playClick();
                setFilter('games');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
                filter === 'games'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <span>🎮</span>
              <span>Juegos & Arcade</span>
            </button>

            <button
              onClick={() => {
                sounds.playClick();
                setFilter('explore');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
                filter === 'explore'
                  ? 'bg-rose-600 text-white shadow-md'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <span>🗺️</span>
              <span>Exploración & Paz</span>
            </button>

            <button
              onClick={() => {
                sounds.playClick();
                setFilter('school');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
                filter === 'school'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <span>📚</span>
              <span>Escuela & Tareas</span>
            </button>
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar actividad o juego..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-sky-400"
            />
          </div>
        </div>

        {/* Hub Items Grid */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
            {filtered.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  sounds.playClick();
                  onNavigate(item.id);
                  onClose();
                }}
                className={`relative group p-4 rounded-2xl bg-gradient-to-br ${item.gradient} border-2 ${item.borderGlow} cursor-pointer transition-all hover:scale-[1.02] shadow-lg flex flex-col justify-between overflow-hidden`}
              >
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="w-12 h-12 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <span
                    className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border ${item.badgeColor}`}
                  >
                    {item.badge}
                  </span>
                </div>

                <div className="space-y-1">
                  <h4 className="text-sm sm:text-base font-bold text-white group-hover:text-sky-200 transition-colors flex items-center justify-between">
                    <span>{item.title}</span>
                    <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
                  </h4>
                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                    {item.subtitle}
                  </p>
                </div>

                <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between text-[11px] text-sky-300 font-bold">
                  <span>Abrir experiencia</span>
                  <span className="text-amber-400">➔</span>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="py-12 text-center text-slate-400 space-y-2">
              <HelpCircle className="w-10 h-10 mx-auto text-slate-500" />
              <p className="text-sm font-bold text-slate-300">No se encontraron experiencias con esa búsqueda</p>
              <p className="text-xs">Prueba con otra palabra o selecciona "Todo" en las categorías superiores.</p>
            </div>
          )}
        </div>

        {/* Footer info note */}
        <div className="p-3 bg-[#0a1020] border-t border-slate-800 text-center text-xs text-slate-400">
          💡 Puedes abrir este centro en cualquier momento tocando el botón flotante <strong className="text-purple-300">"🎮 Juegos & Experiencias"</strong> en la parte inferior derecha.
        </div>
      </div>
    </div>
  );
};
