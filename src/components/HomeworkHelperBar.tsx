import React, { useState } from 'react';
import { BookOpen, Sparkles, Send, Copy, Check, Volume2, Download, HelpCircle, FileText, Calendar, Palette, GraduationCap, Lightbulb } from 'lucide-react';
import { HomeworkHelperResult, HomeworkMode } from '../types';
import { sounds } from '../utils/soundEffects';
import { triggerConfetti } from '../utils/confetti';

interface HomeworkHelperBarProps {
  currentYear: number;
  eraContext: string;
  onSpeakText: (text: string) => void;
  onRewardStudent: (coins: number, xp: number) => void;
}

export const HomeworkHelperBar: React.FC<HomeworkHelperBarProps> = ({
  currentYear,
  eraContext,
  onSpeakText,
  onRewardStudent,
}) => {
  const [query, setQuery] = useState('');
  const [activeMode, setActiveMode] = useState<HomeworkMode>('summary');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<HomeworkHelperResult | null>(null);
  const [copied, setCopied] = useState(false);

  const modeButtons: { mode: HomeworkMode; label: string; icon: React.ReactNode; tooltip: string }[] = [
    { mode: 'summary', label: 'Resumen para Cuaderno', icon: <FileText className="w-3.5 h-3.5" />, tooltip: 'Párrafo claro y directo listo para transcribir al cuaderno' },
    { mode: 'key_dates', label: 'Fechas & Personajes', icon: <Calendar className="w-3.5 h-3.5" />, tooltip: 'Lista cronológica de hitos para estudiar' },
    { mode: 'poster_ideas', label: 'Ideas para Cartelera', icon: <Palette className="w-3.5 h-3.5" />, tooltip: 'Títulos, lemas y sugerencias de dibujos escolares' },
    { mode: 'quiz_prep', label: 'Cuestionario de Estudio', icon: <HelpCircle className="w-3.5 h-3.5" />, tooltip: 'Preguntas y respuestas clave para evaluaciones' },
    { mode: 'easy_explain', label: 'Explicación Fácil', icon: <Lightbulb className="w-3.5 h-3.5" />, tooltip: 'Explicación sencilla con ejemplos cotidianos' },
  ];

  const quickPrompts = [
    `Hazme un resumen para mi cuaderno sobre el año ${currentYear}`,
    '¿Cuáles fueron las causas del Bogotazo de 1948?',
    'Dame 3 ideas para mi cartelera escolar sobre Radio Sutatenza',
    '¿Por qué fue importante el voto de las mujeres en 1957?',
    'Explícame la Constitución de 1991 como para un niño de primaria',
    '¿Cómo transportaban el café en trenes a vapor en 1920?',
  ];

  const handleSubmit = async (searchQuery: string, searchMode: HomeworkMode = activeMode) => {
    const textToSearch = searchQuery.trim() || query.trim();
    if (!textToSearch || loading) return;

    setLoading(true);
    setCopied(false);
    sounds.playTypewriter();

    try {
      const res = await fetch('/api/homework-helper', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: textToSearch,
          mode: searchMode,
          currentYear,
          eraContext,
        }),
      });

      const json = await res.json();
      if (json.success && json.data) {
        setResult(json.data);
        sounds.playCoin();
        triggerConfetti(0.4, 0.3);
        // Reward student for studying!
        onRewardStudent(25, 40);
      }
    } catch (e) {
      console.error('Homework helper error:', e);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (textToCopy: string) => {
    navigator.clipboard.writeText(textToCopy);
    sounds.playPop();
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadNote = () => {
    if (!result) return;
    sounds.playClick();
    const noteText = `=== FICHA DE CIENCIAS SOCIALES - LEO EN EL TIEMPO ===\n\nTema: ${result.title}\nPregunta: ${result.query}\nModo: ${result.mode}\n\n--- CONTENIDO PRINCIPAL ---\n${result.content}\n\n--- BORRADOR PARA EL CUADERNO ---\n${result.notebookDraft || ''}\n\n--- PUNTOS CLAVE ---\n${(result.bulletPoints || []).map((b) => '• ' + b).join('\n')}\n\n--- DATO PARA LA CLASE ---\n${result.funFactForClass}\n\nGenerado con el Laboratorio Cuántico de Ciencias Sociales • Colombia Siglo XX`;

    const blob = new Blob([noteText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Tarea_Sociales_${result.title.replace(/\s+/g, '_').substring(0, 30)}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-gradient-to-b from-[#111e3f] via-[#0d1733] to-[#0a1226] border-2 border-indigo-400/40 rounded-3xl p-4 sm:p-6 shadow-[0_0_30px_rgba(99,102,241,0.2)]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-indigo-500/30 pb-4 mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-indigo-500 to-sky-400 text-white shadow-md">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-bold text-white">
                Asistente de Tareas Escolares de Leo
              </h2>
              <span className="text-[10px] bg-indigo-500/25 text-indigo-300 border border-indigo-400/40 px-2 py-0.5 rounded-full font-bold uppercase">
                Ciencias Sociales
              </span>
            </div>
            <p className="text-xs text-sky-200">
              Escribe cualquier duda o tarea escolar sobre Colombia en el siglo XX: resúmenes para tu cuaderno, fechas y carteleras.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-amber-300 bg-amber-500/10 border border-amber-400/30 px-3 py-1 rounded-xl font-digital">
            ⭐ +40 XP al consultar tareas
          </span>
        </div>
      </div>

      {/* Mode Selector Tabs */}
      <div className="flex flex-wrap gap-1.5 mb-3.5">
        {modeButtons.map((btn) => (
          <button
            key={btn.mode}
            onClick={() => {
              sounds.playClick();
              setActiveMode(btn.mode);
              if (result && query) {
                handleSubmit(query, btn.mode);
              }
            }}
            title={btn.tooltip}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeMode === btn.mode
                ? 'bg-indigo-600 text-white shadow-md border border-indigo-400 scale-102'
                : 'bg-[#152347] text-slate-300 hover:bg-[#1d3060] border border-slate-700/60'
            }`}
          >
            {btn.icon}
            <span>{btn.label}</span>
          </button>
        ))}
      </div>

      {/* Homework Input Bar Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(query);
        }}
        className="relative flex items-center gap-2"
      >
        <div className="relative flex-1">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`Escribe tu tarea: ej. "Resumen sobre ${currentYear}", "Causas del Bogotazo", "Voto femenino"...`}
            className="w-full bg-[#070e20] border-2 border-indigo-500/40 focus:border-cyan-400 rounded-2xl px-4 py-3 text-sm text-white placeholder-slate-400 shadow-inner focus:outline-none transition-all pl-10"
          />
          <BookOpen className="w-4 h-4 text-indigo-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        <button
          type="submit"
          disabled={!query.trim() || loading}
          className="bg-gradient-to-r from-indigo-500 via-sky-500 to-cyan-500 hover:from-indigo-400 hover:to-cyan-400 text-white font-bold px-4 sm:px-6 py-3 rounded-2xl shadow-lg hover:scale-105 transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2 flex-shrink-0"
        >
          {loading ? (
            <>
              <Sparkles className="w-4 h-4 animate-spin text-amber-300" />
              <span className="hidden sm:inline text-xs">Consultando a Leo...</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span className="text-xs sm:text-sm">Ayudarme con mi Tarea</span>
            </>
          )}
        </button>
      </form>

      {/* Quick Prompts Chips */}
      <div className="mt-2.5 flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        <span className="text-slate-400 text-[11px] whitespace-nowrap flex items-center gap-1">
          <Lightbulb className="w-3 h-3 text-amber-400" />
          Ejemplos rápidos:
        </span>
        {quickPrompts.map((prompt, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => {
              setQuery(prompt);
              handleSubmit(prompt);
            }}
            className="whitespace-nowrap bg-[#132145] hover:bg-[#1b2d5a] text-sky-200 hover:text-white px-2.5 py-1 rounded-lg border border-indigo-500/20 text-[11px] transition-all hover:scale-102"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Result Card */}
      {result && (
        <div className="mt-5 bg-[#091124] border-2 border-indigo-400/50 rounded-2xl p-4 sm:p-5 shadow-2xl animate-fadeIn space-y-4">
          {/* Card Title & Action Toolbar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-indigo-500/30 pb-3">
            <div>
              <span className="text-[11px] font-digital uppercase text-amber-400 tracking-wider">
                RESPUESTA PEDAGÓGICA PARA CIENCIAS SOCIALES
              </span>
              <h3 className="text-base sm:text-lg font-bold text-white">
                {result.title}
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onSpeakText(`${result.title}. ${result.content}`)}
                className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-sky-500/20 hover:bg-sky-500/30 text-sky-200 border border-sky-400/40 text-xs font-semibold flex items-center gap-1.5 transition-all"
                title="Escuchar la respuesta explicada por Leo"
              >
                <Volume2 className="w-4 h-4 text-cyan-300" />
                <span className="hidden sm:inline">Escuchar</span>
              </button>

              <button
                onClick={() => handleCopy(result.notebookDraft || result.content)}
                className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-400/40 text-xs font-semibold flex items-center gap-1.5 transition-all"
                title="Copiar texto listo para tu cuaderno escolar"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? '¡Copiado!' : 'Copiar para Tarea'}</span>
              </button>

              <button
                onClick={handleDownloadNote}
                className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-200 border border-indigo-400/40 text-xs font-semibold flex items-center gap-1.5 transition-all"
                title="Descargar ficha de estudio en formato texto"
              >
                <Download className="w-4 h-4 text-indigo-300" />
                <span className="hidden sm:inline">Descargar Ficha</span>
              </button>
            </div>
          </div>

          {/* Main Content Body */}
          <div className="text-sm text-slate-200 leading-relaxed font-normal bg-[#0e1935] p-3.5 rounded-xl border border-indigo-500/20">
            {result.content}
          </div>

          {/* Notebook Ready Box */}
          {result.notebookDraft && (
            <div className="bg-[#121c38] border-l-4 border-amber-400 rounded-r-xl p-3.5 text-xs sm:text-sm text-amber-100 font-mono shadow-inner">
              <span className="text-[11px] font-bold text-amber-400 uppercase tracking-widest block mb-1">
                📝 Para transcribir a tu cuaderno:
              </span>
              <pre className="whitespace-pre-wrap font-sans text-xs sm:text-sm leading-relaxed text-slate-200">
                {result.notebookDraft}
              </pre>
            </div>
          )}

          {/* Key Dates or Bullet Points */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* Key Bullet Points */}
            {result.bulletPoints && result.bulletPoints.length > 0 && (
              <div className="bg-[#0b1429] p-3 rounded-xl border border-sky-500/20">
                <span className="text-xs font-bold text-sky-300 block mb-2 flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-sky-400" /> Puntos clave a recordar:
                </span>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {result.bulletPoints.map((bp, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-sky-400 font-bold">•</span>
                      <span>{bp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Poster ideas or study quiz */}
            {result.posterIdeas ? (
              <div className="bg-[#0b1429] p-3 rounded-xl border border-purple-500/20">
                <span className="text-xs font-bold text-purple-300 block mb-1.5 flex items-center gap-1.5">
                  <Palette className="w-3.5 h-3.5 text-purple-400" /> Ideas para Cartelera Escolar:
                </span>
                <p className="text-xs text-amber-300 font-semibold mb-1">
                  Título: "{result.posterIdeas.title}"
                </p>
                <p className="text-xs text-slate-300 italic mb-1.5">
                  Lema: "{result.posterIdeas.slogan}"
                </p>
                <p className="text-[11px] text-slate-400">
                  🎨 Sugerencia de dibujo: {result.posterIdeas.drawRecommendation}
                </p>
              </div>
            ) : result.studyQuiz && result.studyQuiz.length > 0 ? (
              <div className="bg-[#0b1429] p-3 rounded-xl border border-emerald-500/20">
                <span className="text-xs font-bold text-emerald-300 block mb-1.5 flex items-center gap-1.5">
                  <HelpCircle className="w-3.5 h-3.5 text-emerald-400" /> Pregunta de Estudio:
                </span>
                {result.studyQuiz.slice(0, 1).map((q, i) => (
                  <div key={i} className="text-xs">
                    <p className="font-semibold text-white mb-1">❓ {q.question}</p>
                    <p className="text-emerald-300">💡 Respuesta: {q.answer}</p>
                  </div>
                ))}
              </div>
            ) : null}
          </div>

          {/* Fun Fact for Class */}
          {result.funFactForClass && (
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-2.5 text-xs text-amber-200 flex items-center gap-2">
              <span className="text-lg">💡</span>
              <div>
                <span className="font-bold text-amber-300">Dato curioso para ganar puntos con tu profesor: </span>
                <span>{result.funFactForClass}</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
