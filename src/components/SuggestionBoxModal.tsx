import React, { useState } from 'react';
import {
  X,
  ArrowLeft,
  Mail,
  Send,
  Sparkles,
  Star,
  Award,
  Heart,
  MessageSquare,
  ThumbsUp,
  CheckCircle2,
  School,
  UserCheck,
} from 'lucide-react';
import { sounds } from '../utils/soundEffects';
import { triggerConfetti } from '../utils/confetti';

interface Suggestion {
  id: string;
  authorName: string;
  role: 'Jurado Evaluador' | 'Docente' | 'Estudiante' | 'Padre de Familia' | 'Visitante';
  rating: number;
  badgeAwarded: string;
  message: string;
  timestamp: string;
  likes: number;
}

interface SuggestionBoxModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEarnXp: (amount: number) => void;
  onEarnCoins: (amount: number) => void;
}

const INITIAL_SUGGESTIONS: Suggestion[] = [
  {
    id: 'sug-1',
    authorName: 'Comité Evaluador STEM',
    role: 'Jurado Evaluador',
    rating: 5,
    badgeAwarded: '🚀 Gran Campeón de la Feria STEM',
    message:
      '¡Impresionante nivel técnico! La integración de la síntesis de voz interactiva, la máquina del tiempo y el rescate del archivo de RTVCPlay y el CNMH hacen de este proyecto un modelo pedagógico de alto impacto.',
    timestamp: 'Hoy, 10:15 AM',
    likes: 12,
  },
  {
    id: 'sug-2',
    authorName: 'Área de Ciencias Sociales',
    role: 'Docente',
    rating: 5,
    badgeAwarded: '🕊️ Premio Cátedra de Paz & Memoria',
    message:
      'Los estudiantes del Colegio Niño Jesús De Praga lograron conectar la memoria histórica del conflicto con la Constitución de 1991 de forma respetuosa, profunda y lúdica. ¡Felicitaciones a todo el equipo!',
    timestamp: 'Hoy, 11:30 AM',
    likes: 9,
  },
  {
    id: 'sug-3',
    authorName: 'Mariana P. (Grado 9°)',
    role: 'Estudiante',
    rating: 5,
    badgeAwarded: '💡 Premio Innovación Tecnológica',
    message:
      'El simulador del túnel cuántico 3D y el periódico antiguo que puedes imprimir son increíbles. ¡Ojalá todas las clases de historia fueran así de divertidas!',
    timestamp: 'Hoy, 01:20 PM',
    likes: 7,
  },
];

export const SuggestionBoxModal: React.FC<SuggestionBoxModalProps> = ({
  isOpen,
  onClose,
  onEarnXp,
  onEarnCoins,
}) => {
  const [suggestions, setSuggestions] = useState<Suggestion[]>(() => {
    try {
      const saved = localStorage.getItem('leo_stem_suggestions');
      return saved ? JSON.parse(saved) : INITIAL_SUGGESTIONS;
    } catch {
      return INITIAL_SUGGESTIONS;
    }
  });

  const [authorName, setAuthorName] = useState(() => localStorage.getItem('leo_ranking_name') || '');
  const [role, setRole] = useState<Suggestion['role']>(() => {
    const savedGrade = localStorage.getItem('leo_ranking_grade');
    if (savedGrade && ['Jurado Evaluador', 'Docente', 'Padre de Familia', 'Visitante'].includes(savedGrade)) {
      return savedGrade as Suggestion['role'];
    }
    return 'Estudiante';
  });
  const [rating, setRating] = useState(5);
  const [badgeAwarded, setBadgeAwarded] = useState('💡 Premio Innovación Tecnológica');
  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState<'form' | 'list'>('form');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    sounds.playFanfare();
    sounds.playCoin();
    triggerConfetti(0.5, 0.4);

    const newSuggestion: Suggestion = {
      id: `sug-${Date.now()}`,
      authorName: authorName.trim() || 'Visitante Anónimo',
      role,
      rating,
      badgeAwarded,
      message: message.trim(),
      timestamp: 'Hace un momento',
      likes: 1,
    };

    const updated = [newSuggestion, ...suggestions];
    setSuggestions(updated);
    try {
      localStorage.setItem('leo_stem_suggestions', JSON.stringify(updated));
    } catch (e) {}

    onEarnXp(60);
    onEarnCoins(50);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setMessage('');
      setAuthorName('');
      setActiveTab('list');
    }, 1200);
  };

  const handleLike = (id: string) => {
    sounds.playClick();
    const updated = suggestions.map((s) => (s.id === id ? { ...s, likes: s.likes + 1 } : s));
    setSuggestions(updated);
    try {
      localStorage.setItem('leo_stem_suggestions', JSON.stringify(updated));
    } catch (e) {}
  };

  const badgesList = [
    '💡 Premio Innovación Tecnológica',
    '🕊️ Premio Cátedra de Paz & Memoria',
    '🎨 Premio Experiencia & Narrativa',
    '🔬 Premio Rigor Histórico & STEM',
    '🚀 Gran Campeón de la Feria STEM',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn select-none">
      <div className="bg-gradient-to-b from-[#0f172a] via-[#091124] to-[#040814] border-2 border-amber-400/70 rounded-3xl w-full max-w-3xl max-h-[92vh] flex flex-col shadow-[0_0_60px_rgba(245,158,11,0.35)] overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-amber-500/20 bg-gradient-to-r from-amber-500/20 via-sky-500/15 to-indigo-500/20 flex items-center justify-between flex-wrap gap-2">
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

            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-400 to-orange-500 flex items-center justify-center shadow-lg text-2xl">
              📬
            </div>

            <div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[10px] uppercase font-black tracking-widest text-amber-300 bg-amber-500/25 px-2 py-0.5 rounded-full border border-amber-400/40">
                  Feria STEM 2026
                </span>
                <span className="text-xs text-sky-200 font-bold bg-sky-500/20 px-2 py-0.5 rounded-full border border-sky-400/30">
                  🏫 Colegio Niño Jesús De Praga
                </span>
              </div>
              <h2 className="text-base sm:text-xl font-black text-white">
                Buzón de Sugerencias & Votaciones de la Feria
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

        {/* Tab Toggle */}
        <div className="px-4 py-2 bg-[#0c1427] border-b border-slate-800 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                sounds.playClick();
                setActiveTab('form');
              }}
              className={`px-3.5 py-1.5 rounded-xl font-black text-xs transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'form'
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-black shadow-md'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-750'
              }`}
            >
              <Send className="w-3.5 h-3.5" />
              <span>Dejar Sugerencia o Calificación</span>
            </button>

            <button
              onClick={() => {
                sounds.playClick();
                setActiveTab('list');
              }}
              className={`px-3.5 py-1.5 rounded-xl font-black text-xs transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'list'
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-black shadow-md'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-750'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Ver Mensajes del Stand ({suggestions.length})</span>
            </button>
          </div>

          <span className="text-[11px] text-amber-300 font-bold hidden sm:inline">
            ⭐ Promedio: 5.0 / 5.0
          </span>
        </div>

        {/* Modal Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {activeTab === 'form' ? (
            <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto">
              <div className="text-center space-y-1">
                <h3 className="text-lg font-black text-white">
                  ¡Tu opinión impulsa nuestro proyecto escolar!
                </h3>
                <p className="text-xs text-slate-300">
                  Jurados, profesores, compañeros y familias pueden calificar y dejar sus recomendaciones para el equipo de desarrollo.
                </p>
              </div>

              {/* Author name & role */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-sky-300 block mb-1">Tu Nombre o Apodo:</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej: Lic. Carlos Pérez / Sofia (Grado 7°)"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 focus:border-amber-400 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-sky-300 block mb-1">Tu Rol en la Feria:</label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value as any)}
                    className="w-full bg-slate-900 border border-slate-700 focus:border-amber-400 rounded-xl px-3 py-2 text-xs text-white outline-none cursor-pointer"
                  >
                    <option value="Jurado Evaluador">⭐ Jurado Evaluador</option>
                    <option value="Docente">👨‍🏫 Docente / Profesor</option>
                    <option value="Estudiante">🎒 Estudiante</option>
                    <option value="Padre de Familia">👨‍👩‍👧 Padre de Familia</option>
                    <option value="Visitante">👋 Visitante Invitado</option>
                  </select>
                </div>
              </div>

              {/* Star Rating */}
              <div className="bg-slate-900/70 p-3.5 rounded-2xl border border-slate-800 text-center space-y-1.5">
                <span className="text-xs font-bold text-amber-300 block">
                  ¿Cómo calificas la experiencia de "Leo en el Tiempo"?
                </span>
                <div className="flex items-center justify-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => {
                        sounds.playClick();
                        setRating(star);
                      }}
                      className="p-1 hover:scale-125 transition-transform cursor-pointer"
                    >
                      <Star
                        className={`w-7 h-7 ${
                          star <= rating
                            ? 'text-amber-400 fill-amber-400 drop-shadow-[0_0_8px_rgba(245,158,11,0.8)]'
                            : 'text-slate-600'
                        }`}
                      />
                    </button>
                  ))}
                </div>
                <span className="text-[11px] text-slate-400 font-medium">
                  {rating === 5 ? '¡Excelente e Impecable! (5/5)' : `${rating} de 5 estrellas`}
                </span>
              </div>

              {/* Merit Badge Selection */}
              <div>
                <label className="text-xs font-bold text-sky-300 block mb-1.5">
                  Elige la Medalla de Mérito que deseas otorgar:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {badgesList.map((badge) => (
                    <button
                      key={badge}
                      type="button"
                      onClick={() => {
                        sounds.playClick();
                        setBadgeAwarded(badge);
                      }}
                      className={`text-left p-2.5 rounded-xl border text-xs transition-all cursor-pointer ${
                        badgeAwarded === badge
                          ? 'bg-amber-500/25 border-amber-400 text-amber-200 font-bold shadow-md'
                          : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      {badge}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message / Suggestion text */}
              <div>
                <label className="text-xs font-bold text-sky-300 block mb-1">
                  Tu Mensaje, Sugerencia o Felicitación:
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Escribe aquí tu opinión sobre el software, la interactividad de la historia o ideas para seguir mejorándolo..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 focus:border-amber-400 rounded-xl p-3 text-xs text-white placeholder-slate-500 outline-none leading-relaxed"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={submitted}
                className="w-full py-3 px-6 rounded-2xl bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 hover:from-amber-300 hover:to-orange-400 text-slate-950 font-black text-sm flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(245,158,11,0.6)] hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
              >
                {submitted ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-slate-950 animate-bounce" />
                    <span>¡Sugerencia Enviada con Éxito (+60 XP)!</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 text-slate-950" />
                    <span>Depositar en el Buzón de la Feria STEM</span>
                  </>
                )}
              </button>
            </form>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-300">
                  Comentarios y Reconocimientos Recibidos en el Stand:
                </span>
                <span className="text-[11px] text-amber-400 font-bold bg-amber-500/20 px-2 py-0.5 rounded-full border border-amber-400/30">
                  {suggestions.length} aportes
                </span>
              </div>

              <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
                {suggestions.map((s) => (
                  <div
                    key={s.id}
                    className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-amber-400/40 transition-all space-y-2 shadow-md"
                  >
                    <div className="flex items-start justify-between gap-2 flex-wrap">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-black text-white">{s.authorName}</h4>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-400/30">
                            {s.role}
                          </span>
                        </div>
                        <span className="text-[10px] text-slate-400">{s.timestamp}</span>
                      </div>

                      <div className="flex items-center gap-1 bg-amber-500/15 px-2 py-1 rounded-xl border border-amber-400/30 text-amber-300 text-xs font-bold">
                        <Award className="w-3.5 h-3.5 text-amber-400" />
                        <span>{s.badgeAwarded}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((st) => (
                        <Star
                          key={st}
                          className={`w-3.5 h-3.5 ${
                            st <= s.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-700'
                          }`}
                        />
                      ))}
                    </div>

                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed italic">
                      "{s.message}"
                    </p>

                    <div className="pt-2 border-t border-slate-800/80 flex items-center justify-end">
                      <button
                        onClick={() => handleLike(s.id)}
                        className="flex items-center gap-1.5 text-xs text-rose-300 hover:text-rose-200 bg-rose-500/10 hover:bg-rose-500/20 px-2.5 py-1 rounded-lg border border-rose-400/30 transition-all cursor-pointer"
                      >
                        <Heart className="w-3.5 h-3.5 fill-rose-500/60 text-rose-400" />
                        <span>{s.likes} me gusta</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
