import React, { useState, useRef, useEffect } from 'react';
import {
  ArrowLeft,
  X,
  BookOpen,
  Feather,
  Sparkles,
  Volume2,
  VolumeX,
  Award,
  HelpCircle,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  Search,
  Bookmark,
  Share2,
  Play,
  RotateCcw,
  Zap,
  Flame,
  ArrowRight,
  ArrowUp,
  ArrowDown,
  Clock,
  Shuffle,
  Lightbulb,
} from 'lucide-react';
import {
  COLOMBIAN_AUTHORS,
  COLOMBIANISMS_DICTIONARY,
  LENGUA_CHALLENGE_BANK,
  MICRO_RELATO_TEMPLATES,
  CHRONOLOGY_MASTERPIECES,
  LITERARY_ORACLE_QUOTES,
  ColombianAuthor,
  ColombianismItem,
  LenguaChallengeQuestion,
  MicroRelatoPromptSeed,
  MasterpieceChronologyItem,
  LiteraryOracleCard,
} from '../data/lenguaCastellanaData';
import { sounds } from '../utils/soundEffects';
import { triggerConfetti } from '../utils/confetti';
import { LeoVoiceSettings } from '../types';
import { AchievementBadge } from './AchievementBadgeCelebrationToast';
import { QuantumFireworksOverlay } from './QuantumFireworksOverlay';

interface LenguaCastellanaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSpeakText: (text: string) => void;
  onTravelToYear: (year: number) => void;
  onEarnCoins: (amount: number) => void;
  onEarnXp: (amount: number) => void;
  voiceSettings: LeoVoiceSettings;
  currentYear: number;
  onTriggerAchievement?: (badge: AchievementBadge) => void;
}

export const LenguaCastellanaModal: React.FC<LenguaCastellanaModalProps> = ({
  isOpen,
  onClose,
  onSpeakText,
  onTravelToYear,
  onEarnCoins,
  onEarnXp,
  voiceSettings,
  currentYear,
  onTriggerAchievement,
}) => {
  const [activeTab, setActiveTab] = useState<'authors' | 'chronology' | 'dictionary' | 'quiz' | 'workshop'>('authors');

  // Authors Tab & Automated TTS state
  const [selectedAuthor, setSelectedAuthor] = useState<ColombianAuthor>(COLOMBIAN_AUTHORS[0]);
  const [authorFilter, setAuthorFilter] = useState<string>('todos');
  const [autoTtsEnabled, setAutoTtsEnabled] = useState<boolean>(true);
  const [isCurrentlyNarrating, setIsCurrentlyNarrating] = useState<boolean>(false);
  const hoverTtsTimeoutRef = useRef<any>(null);

  // Chronology Minigame state
  const [chronologyDeck, setChronologyDeck] = useState<MasterpieceChronologyItem[]>(() =>
    [...CHRONOLOGY_MASTERPIECES].sort(() => Math.random() - 0.5)
  );
  const [chronologyChecked, setChronologyChecked] = useState(false);
  const [chronologyWon, setChronologyWon] = useState(false);
  const [chronologyScore, setChronologyScore] = useState({ correct: 0, total: CHRONOLOGY_MASTERPIECES.length });
  const [hintActiveId, setHintActiveId] = useState<string | null>(null);

  // Surprise Factor 1: Mariposas Amarillas de Macondo
  const [butterfliesBurst, setButterfliesBurst] = useState(false);

  // Surprise Factor 2: Oráculo Literario Secreto
  const [oracleActive, setOracleActive] = useState<LiteraryOracleCard | null>(null);

  // Surprise Factor 3: Logro Secreto "Políglota del Tiempo" (Unique Fireworks Celebration)
  const [showFireworks, setShowFireworks] = useState(false);
  const [consecutiveNoErrorCount, setConsecutiveNoErrorCount] = useState(0);
  const [studiedMasterpieces, setStudiedMasterpieces] = useState<Set<string>>(new Set());

  // Interactive Hover Tooltip State
  const [hoveredAuthorTooltip, setHoveredAuthorTooltip] = useState<ColombianAuthor | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(null);

  // Dictionary Tab state
  const [searchWord, setSearchWord] = useState('');
  const [selectedColombianism, setSelectedColombianism] = useState<ColombianismItem | null>(null);

  // Quiz Tab state
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  // Creative Workshop Tab state
  const [selectedTemplateIndex, setSelectedTemplateIndex] = useState(0);
  const [customStory, setCustomStory] = useState(MICRO_RELATO_TEMPLATES[0].storyStarter);
  const [storyCopied, setStoryCopied] = useState(false);

  // Trigger Surprise Factor 3: Políglota del Tiempo with fireworks animation
  const triggerPoliglotaCelebration = () => {
    setShowFireworks(true);
    sounds.playWheelJackpot();
    sounds.playFanfare();
    sounds.playInkQuill();
    triggerConfetti(0.85, 0.45);

    onEarnCoins(80);
    onEarnXp(150);

    if (onTriggerAchievement) {
      onTriggerAchievement({
        id: 'achieve-poliglota-del-tiempo',
        title: '¡Políglota del Tiempo!',
        category: 'Factor Sorpresa de Lengua',
        description: '¡Dominaste 3 obras literarias maestras de Colombia sin cometer un solo error!',
        icon: '🏆',
        xpReward: 150,
        coinReward: 80,
      });
    }

    onSpeakText(
      '¡Extraordinario! Has desbloqueado el logro secreto Políglota del Tiempo tras dominar tres obras maestras seguidas sin un solo error. ¡El cielo se ilumina con fuegos artificiales cuánticos!'
    );
  };

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (hoverTtsTimeoutRef.current) {
        clearTimeout(hoverTtsTimeoutRef.current);
      }
    };
  }, []);

  if (!isOpen) return null;

  // Filtered authors
  const filteredAuthors = COLOMBIAN_AUTHORS.filter((author) => {
    if (authorFilter === 'todos') return true;
    if (authorFilter === 'narrativa') return author.genre.toLowerCase().includes('novela') || author.genre.toLowerCase().includes('cuento');
    if (authorFilter === 'poesia') return author.genre.toLowerCase().includes('poesía');
    if (authorFilter === 'vanguardia') return author.movement.toLowerCase().includes('nadaísmo') || author.movement.toLowerCase().includes('boom');
    return true;
  });

  // Automated TTS narration helper on hover or click with realistic page turn sound
  const narrateAuthorSynopsis = (author: ColombianAuthor, isHover = false) => {
    setSelectedAuthor(author);
    sounds.playPageTurn();

    // Track studied masterpieces for consecutive error-free exploration
    setStudiedMasterpieces((prev) => {
      const next = new Set(prev);
      next.add(author.id);
      if (next.size === 3 && !prev.has(author.id)) {
        setTimeout(triggerPoliglotaCelebration, 500);
      }
      return next;
    });

    if (!autoTtsEnabled && isHover) return;

    if (hoverTtsTimeoutRef.current) {
      clearTimeout(hoverTtsTimeoutRef.current);
    }

    const delay = isHover ? 220 : 30;
    hoverTtsTimeoutRef.current = setTimeout(() => {
      setIsCurrentlyNarrating(true);
      sounds.playClick();
      const phrase = `Obra: ${author.keyWork}. ${author.synopsis}`;
      onSpeakText(phrase);
      setTimeout(() => setIsCurrentlyNarrating(false), 4000);
    }, delay);
  };

  // Trigger Surprise Factor 1: Mariposas de Macondo
  const handleTriggerButterflies = () => {
    sounds.playFanfare();
    sounds.playTimeWarp();
    triggerConfetti(0.7, 0.4);
    setButterfliesBurst(true);

    onEarnCoins(30);
    onEarnXp(25);

    onSpeakText('¡Flotan las mariposas amarillas de Mauricio Babilonia en Macondo! Un destello de realismo mágico para iluminar tu viaje en el tiempo.');

    if (onTriggerAchievement) {
      onTriggerAchievement({
        id: 'achieve-macondo-butterflies',
        title: 'El Encanto de las Mariposas Amarillas',
        category: 'Realismo Mágico',
        description: '¡Invocaste la lluvia mágica de mariposas doradas de Gabriel García Márquez y descubriste un tesoro de Macondo!',
        icon: '🦋',
        xpReward: 25,
        coinReward: 30,
      });
    }

    setTimeout(() => {
      setButterfliesBurst(false);
    }, 7000);
  };

  // Trigger Surprise Factor 2: Oráculo Literario
  const handleConsultOracle = () => {
    sounds.playCoin();
    sounds.playSuccess();
    triggerConfetti(0.5, 0.3);

    const randomCard = LITERARY_ORACLE_QUOTES[Math.floor(Math.random() * LITERARY_ORACLE_QUOTES.length)];
    setOracleActive(randomCard);

    onEarnCoins(randomCard.giftCoins);
    onEarnXp(30);

    onSpeakText(`Palabra del Oráculo de ${randomCard.author}: "${randomCard.quote}". ${randomCard.secretRevelation}`);

    if (onTriggerAchievement) {
      onTriggerAchievement({
        id: 'achieve-literary-oracle',
        title: 'Iniciado en el Oráculo Literario',
        category: 'Sabiduría Literaria',
        description: `Consultaste el archivo místico de ${randomCard.author} y ganaste +${randomCard.giftCoins} monedas cuánticas.`,
        icon: '🔮',
        xpReward: 30,
        coinReward: randomCard.giftCoins,
      });
    }
  };

  // Chronology Minigame Handlers
  const handleMoveChronologyItem = (index: number, direction: 'up' | 'down') => {
    if (chronologyChecked) setChronologyChecked(false);
    sounds.playClick();
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= chronologyDeck.length) return;

    const updated = [...chronologyDeck];
    const [moved] = updated.splice(index, 1);
    updated.splice(newIndex, 0, moved);
    setChronologyDeck(updated);
  };

  const handleCheckChronology = () => {
    let correctCount = 0;
    for (let i = 0; i < chronologyDeck.length; i++) {
      if (chronologyDeck[i].id === CHRONOLOGY_MASTERPIECES[i].id) {
        correctCount++;
      }
    }

    setChronologyScore({ correct: correctCount, total: chronologyDeck.length });
    setChronologyChecked(true);

    if (correctCount === chronologyDeck.length) {
      setChronologyWon(true);
      sounds.playInkQuill();
      sounds.playFanfare();
      sounds.playWheelJackpot();
      triggerConfetti(0.75, 0.5);

      onEarnCoins(60);
      onEarnXp(100);

      // Add to error-free streak
      const nextStreak = consecutiveNoErrorCount + 1;
      setConsecutiveNoErrorCount(nextStreak);
      if (nextStreak >= 3) {
        setTimeout(triggerPoliglotaCelebration, 1200);
      }

      if (onTriggerAchievement) {
        onTriggerAchievement({
          id: 'achieve-literary-chronology',
          title: 'Cronista Maestro de las Letras',
          category: 'Lengua Castellana',
          description: '¡Ordenaste con exactitud cronológica todas las obras cumbres del siglo XX colombiano!',
          icon: '📜',
          xpReward: 100,
          coinReward: 60,
        });
      }

      onSpeakText('¡Extraordinario! Has ordenado con exactitud cronológica todas las obras cumbres de la literatura colombiana del siglo veinte.');
    } else {
      setChronologyWon(false);
      sounds.playError();
      setConsecutiveNoErrorCount(0);
      onSpeakText(`Llevas ${correctCount} de ${chronologyDeck.length} obras en el orden correcto. Revisa las pistas de las décadas y vuelve a intentar.`);
    }
  };

  const handleShuffleChronology = () => {
    sounds.playClick();
    setChronologyDeck([...CHRONOLOGY_MASTERPIECES].sort(() => Math.random() - 0.5));
    setChronologyChecked(false);
    setChronologyWon(false);
    setHintActiveId(null);
  };

  // Filtered colombianisms
  const filteredColombianisms = COLOMBIANISMS_DICTIONARY.filter((c) =>
    c.expression.toLowerCase().includes(searchWord.toLowerCase()) ||
    c.meaning.toLowerCase().includes(searchWord.toLowerCase()) ||
    c.region.toLowerCase().includes(searchWord.toLowerCase())
  );

  // Handle Quiz selection
  const currentQuiz = LENGUA_CHALLENGE_BANK[quizIndex];

  const handleSelectOption = (index: number) => {
    if (isAnswerSubmitted) return;
    sounds.playClick();
    setSelectedOption(index);
  };

  const handleSubmitQuizAnswer = () => {
    if (selectedOption === null || isAnswerSubmitted) return;
    setIsAnswerSubmitted(true);

    const isCorrect = selectedOption === currentQuiz.correctIndex;
    if (isCorrect) {
      sounds.playSuccess();
      sounds.playInkQuill();
      triggerConfetti(0.5, 0.4);
      setScore((s) => s + 1);
      onEarnCoins(currentQuiz.coinReward);
      onEarnXp(currentQuiz.xpReward);

      const nextStreak = consecutiveNoErrorCount + 1;
      setConsecutiveNoErrorCount(nextStreak);
      if (nextStreak >= 3) {
        setTimeout(triggerPoliglotaCelebration, 700);
      }
    } else {
      sounds.playError();
      setConsecutiveNoErrorCount(0);
    }
  };

  const handleNextQuiz = () => {
    if (quizIndex + 1 < LENGUA_CHALLENGE_BANK.length) {
      setQuizIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
      sounds.playClick();
    } else {
      setQuizFinished(true);
      sounds.playFanfare();
      triggerConfetti(0.5, 0.5);

      if (onTriggerAchievement) {
        onTriggerAchievement({
          id: 'achieve-grammar-master',
          title: 'Maestro de Figuras & Ortografía',
          category: 'Lengua Castellana',
          description: `¡Completaste el reto escolar de lengua castellana con ${score + 1} aciertos!`,
          icon: '✍️',
          xpReward: 60,
          coinReward: 50,
        });
      }
    }
  };

  const handleRestartQuiz = () => {
    setQuizIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setQuizFinished(false);
    sounds.playClick();
  };

  // Workshop change template
  const handleSelectTemplate = (idx: number) => {
    setSelectedTemplateIndex(idx);
    setCustomStory(MICRO_RELATO_TEMPLATES[idx].storyStarter);
    setStoryCopied(false);
    sounds.playClick();
  };

  const handleCopyStory = () => {
    navigator.clipboard.writeText(
      `"${MICRO_RELATO_TEMPLATES[selectedTemplateIndex].seedTitle}"\nÉpoca: ${MICRO_RELATO_TEMPLATES[selectedTemplateIndex].year}\n\n${customStory}\n\n— Creado en el Salón de Lengua Castellana con Leo en el Tiempo`
    );
    setStoryCopied(true);
    sounds.playInkQuill();
    sounds.playSuccess();
    setTimeout(() => setStoryCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      {/* Surprise Factor 1 Animation: Floating Golden Butterflies of Macondo */}
      {butterfliesBurst && (
        <div className="fixed inset-0 pointer-events-none z-[60] overflow-hidden">
          {Array.from({ length: 18 }).map((_, i) => (
            <div
              key={i}
              className="absolute text-3xl sm:text-4xl animate-floatButterfly"
              style={{
                top: `${15 + Math.random() * 70}%`,
                left: `${(i * 5) % 95}%`,
                animationDelay: `${i * 0.18}s`,
                animationDuration: `${3.5 + Math.random() * 2}s`,
                filter: 'drop-shadow(0 0 12px rgba(245, 158, 11, 0.9))',
              }}
            >
              🦋
            </div>
          ))}
        </div>
      )}

      <div className="bg-gradient-to-b from-[#0e172e] via-[#091124] to-[#060b18] border-2 border-amber-400/50 rounded-3xl w-full max-w-5xl max-h-[92vh] flex flex-col shadow-[0_0_50px_rgba(245,158,11,0.25)] overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-3 sm:p-5 border-b border-amber-500/20 bg-gradient-to-r from-amber-500/10 via-sky-500/10 to-indigo-500/10 flex-wrap gap-2">
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Prominent Back Button */}
            <button
              onClick={() => {
                sounds.playClick();
                onClose();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border border-amber-400/40 text-xs font-bold transition-all hover:scale-105 active:scale-95 shadow-md"
              title="Volver al Viaje Temporal"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Volver atrás</span>
            </button>

            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg border border-amber-300/40 text-xl sm:text-2xl">
              📖
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-amber-400 bg-amber-500/20 px-2 py-0.5 rounded-full border border-amber-400/40">
                  Lengua Castellana & Literatura
                </span>
                <span className="text-[10px] text-sky-300 font-semibold hidden sm:inline">
                  🇨🇴 Colombia en las Letras del Siglo XX
                </span>
              </div>
              <h2 className="text-sm sm:text-xl font-black text-white flex items-center gap-2">
                Salón de Letras, Autores y Expresiones
              </h2>
            </div>
          </div>

          {/* Action buttons & Close */}
          <div className="flex items-center gap-2">
            {/* Surprise Factor Button: Mariposas de Macondo */}
            <button
              onClick={handleTriggerButterflies}
              className="bg-gradient-to-r from-amber-500/30 to-yellow-500/30 hover:from-amber-500/50 hover:to-yellow-500/50 border border-amber-400/60 text-amber-300 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 shadow-[0_0_15px_rgba(245,158,11,0.3)] transition-all hover:scale-105 active:scale-95 animate-pulse"
              title="Invocar el encanto de las Mariposas Amarillas de Gabo (+30 🪙)"
            >
              <span>🦋</span>
              <span className="hidden sm:inline">Mariposas de Gabo</span>
            </button>

            {/* Surprise Factor Button: Oráculo Literario */}
            <button
              onClick={handleConsultOracle}
              className="bg-gradient-to-r from-purple-500/30 to-indigo-500/30 hover:from-purple-500/50 hover:to-indigo-500/50 border border-purple-400/60 text-purple-200 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md transition-all hover:scale-105 active:scale-95"
              title="Consultar el Oráculo con secretos literarios del siglo XX"
            >
              <span>🔮</span>
              <span className="hidden md:inline">Oráculo</span>
            </button>

            {/* Surprise Factor Button: Políglota del Tiempo (Fuegos Artificiales) */}
            <button
              onClick={triggerPoliglotaCelebration}
              className="bg-gradient-to-r from-yellow-500/30 via-amber-500/30 to-orange-500/30 hover:from-yellow-500/50 hover:to-orange-500/50 border border-amber-400/80 text-amber-300 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 shadow-[0_0_18px_rgba(245,158,11,0.5)] transition-all hover:scale-105 active:scale-95 animate-pulse"
              title="Logro Secreto: Políglota del Tiempo (+150 XP, +80 🪙 y Fuegos Artificiales)"
            >
              <span>🏆</span>
              <span className="hidden lg:inline">Políglota del Tiempo</span>
            </button>

            <button
              onClick={() => {
                sounds.playClick();
                onClose();
              }}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center border border-slate-600 transition-all hover:scale-105 active:scale-95"
              title="Cerrar Salón"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Secret Oracle Card Display Popup Banner */}
        {oracleActive && (
          <div className="bg-gradient-to-r from-purple-950 via-indigo-950 to-[#0e172e] border-b-2 border-purple-400/60 p-3 sm:p-4 animate-fadeIn flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🔮</span>
              <div>
                <span className="text-[10px] uppercase font-bold text-amber-300 tracking-wider">
                  Revelación del Oráculo • {oracleActive.author} ({oracleActive.source})
                </span>
                <p className="text-xs sm:text-sm italic font-serif text-white">
                  "{oracleActive.quote}"
                </p>
                <p className="text-[11px] text-purple-300 mt-0.5">
                  💡 {oracleActive.secretRevelation}
                </p>
              </div>
            </div>
            <button
              onClick={() => setOracleActive(null)}
              className="bg-purple-500/30 hover:bg-purple-500/50 text-purple-200 text-xs px-3 py-1 rounded-xl border border-purple-400/40 font-bold whitespace-nowrap"
            >
              Cerrar Revelación
            </button>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-6 pt-3 pb-2 border-b border-slate-800 bg-[#091022] overflow-x-auto scrollbar-none">
          <button
            onClick={() => {
              sounds.playClick();
              setActiveTab('authors');
            }}
            className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
              activeTab === 'authors'
                ? 'bg-amber-500 text-black shadow-[0_0_15px_rgba(245,158,11,0.4)]'
                : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-700/60'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Autores y Sinopsis</span>
          </button>

          <button
            onClick={() => {
              sounds.playClick();
              setActiveTab('chronology');
            }}
            className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
              activeTab === 'chronology'
                ? 'bg-amber-500 text-black shadow-[0_0_15px_rgba(245,158,11,0.4)]'
                : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-700/60'
            }`}
          >
            <Clock className="w-4 h-4 text-cyan-400" />
            <span>Minijuego: Línea de Tiempo</span>
            <span className="text-[9px] uppercase px-1.5 py-0.2 bg-cyan-500/20 text-cyan-300 rounded-full font-black border border-cyan-400/40">
              Nuevo
            </span>
          </button>

          <button
            onClick={() => {
              sounds.playClick();
              setActiveTab('dictionary');
            }}
            className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
              activeTab === 'dictionary'
                ? 'bg-amber-500 text-black shadow-[0_0_15px_rgba(245,158,11,0.4)]'
                : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-700/60'
            }`}
          >
            <span>🇨🇴</span>
            <span>Colombianismos y Dichos</span>
          </button>

          <button
            onClick={() => {
              sounds.playClick();
              setActiveTab('quiz');
            }}
            className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
              activeTab === 'quiz'
                ? 'bg-amber-500 text-black shadow-[0_0_15px_rgba(245,158,11,0.4)]'
                : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-700/60'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Reto de Figuras & Ortografía</span>
          </button>

          <button
            onClick={() => {
              sounds.playClick();
              setActiveTab('workshop');
            }}
            className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
              activeTab === 'workshop'
                ? 'bg-amber-500 text-black shadow-[0_0_15px_rgba(245,158,11,0.4)]'
                : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-700/60'
            }`}
          >
            <Feather className="w-4 h-4" />
            <span>Taller de Micro-relatos</span>
          </button>
        </div>

        {/* Modal Body Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* TAB 1: AUTHORS AND MASTERPIECES WITH AUTOMATED TTS */}
          {activeTab === 'authors' && (
            <div className="space-y-5">
              {/* Filter pills & Automated TTS toggle */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-[#0d162e] p-3 rounded-2xl border border-sky-500/20">
                <div className="flex items-center gap-1.5 flex-wrap">
                  {[
                    { id: 'todos', label: 'Todos' },
                    { id: 'narrativa', label: 'Novela & Narrativa' },
                    { id: 'poesia', label: 'Poesía Lírica' },
                    { id: 'vanguardia', label: 'Vanguardias & Boom' },
                  ].map((filter) => (
                    <button
                      key={filter.id}
                      onClick={() => {
                        sounds.playClick();
                        setAuthorFilter(filter.id);
                      }}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                        authorFilter === filter.id
                          ? 'bg-sky-500 text-black font-bold'
                          : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      {filter.label}
                    </button>
                  ))}
                </div>

                {/* Automated TTS Switch */}
                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <button
                    onClick={() => {
                      sounds.playClick();
                      setAutoTtsEnabled(!autoTtsEnabled);
                    }}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all shadow-sm ${
                      autoTtsEnabled
                        ? 'bg-emerald-500/20 border-emerald-400/80 text-emerald-300'
                        : 'bg-slate-800 border-slate-700 text-slate-400'
                    }`}
                    title="Activar/desactivar narración automática por voz de la sinopsis al seleccionar o pasar el cursor"
                  >
                    {autoTtsEnabled ? (
                      <Volume2 className="w-4 h-4 text-emerald-400 animate-pulse" />
                    ) : (
                      <VolumeX className="w-4 h-4 text-slate-500" />
                    )}
                    <span>
                      {autoTtsEnabled ? 'Auto-Lectura TTS Activa (Hover & Clic)' : 'Auto-Lectura TTS Desactivada'}
                    </span>
                  </button>
                </div>
              </div>

              {/* Author Showcase: Left author list, Right author detail */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                {/* Author Selection List with Automated Hover/Click TTS */}
                <div className="lg:col-span-5 space-y-2 max-h-[520px] overflow-y-auto pr-1">
                  {filteredAuthors.map((author) => {
                    const isSelected = selectedAuthor.id === author.id;
                    return (
                      <div
                        key={author.id}
                        onMouseEnter={(e) => {
                          narrateAuthorSynopsis(author, true);
                          setHoveredAuthorTooltip(author);
                          setTooltipPos({ x: e.clientX, y: e.clientY });
                        }}
                        onMouseMove={(e) => {
                          setTooltipPos({ x: e.clientX, y: e.clientY });
                        }}
                        onMouseLeave={() => setHoveredAuthorTooltip(null)}
                        onClick={() => narrateAuthorSynopsis(author, false)}
                        className={`relative p-3 rounded-2xl border cursor-pointer transition-all flex items-center justify-between gap-3 group ${
                          isSelected
                            ? 'bg-gradient-to-r from-amber-500/25 via-sky-500/20 to-indigo-500/20 border-amber-400 shadow-md scale-[1.01]'
                            : 'bg-[#101b36] border-slate-700/60 hover:border-slate-500 hover:bg-[#152345]'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          {/* AI-Generated Author Portrait Thumbnail */}
                          <div className="relative w-11 h-11 rounded-xl overflow-hidden border border-amber-400/50 flex-shrink-0 bg-slate-900 shadow-xs">
                            <img
                              src={author.portraitBadge}
                              alt={author.name}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                              onError={(e) => {
                                (e.target as HTMLElement).style.display = 'none';
                              }}
                            />
                            <span className="absolute bottom-0 right-0 text-[10px] bg-black/70 px-0.5 rounded leading-none">
                              {author.icon}
                            </span>
                          </div>

                          <div className="truncate">
                            <div className="flex items-center gap-1.5">
                              <h4 className="text-xs sm:text-sm font-bold text-white truncate">
                                {author.name}
                              </h4>
                              {isSelected && isCurrentlyNarrating && (
                                <Volume2 className="w-3.5 h-3.5 text-amber-400 animate-bounce flex-shrink-0" />
                              )}
                            </div>
                            <p className="text-[11px] text-amber-300 font-semibold truncate">
                              {author.keyWork}
                            </p>
                            <span className="text-[10px] text-slate-400 truncate block">
                              🎂 {author.birthYear} • {author.movement}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 flex-shrink-0">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onSpeakText(`Obra cumbre: ${author.keyWork}. Sinopsis: ${author.synopsis}`);
                            }}
                            className="p-1 rounded-lg hover:bg-sky-500/30 text-sky-300 transition-colors"
                            title="Oír Sinopsis"
                          >
                            <Volume2 className="w-3.5 h-3.5 text-amber-300" />
                          </button>
                          <ArrowRight
                            className={`w-4 h-4 transition-transform ${
                              isSelected ? 'text-amber-400 translate-x-1' : 'text-slate-600'
                            }`}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Author Full Profile Card */}
                <div className="lg:col-span-7 bg-[#101c3b] border-2 border-sky-500/30 rounded-3xl p-4 sm:p-6 shadow-xl space-y-4 flex flex-col justify-between">
                  <div className="space-y-4">
                    {/* Author Banner */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-sky-500/20 pb-3">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl sm:text-4xl p-2 rounded-2xl bg-sky-500/20 border border-sky-400/30">
                          {selectedAuthor.icon}
                        </span>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] uppercase font-bold text-amber-400 bg-amber-500/20 px-2 py-0.5 rounded-full border border-amber-400/40">
                              {selectedAuthor.period}
                            </span>
                            <span className="text-[11px] text-slate-400">
                              {selectedAuthor.birthDeath}
                            </span>
                          </div>
                          <h3 className="text-lg sm:text-2xl font-black text-white">
                            {selectedAuthor.name}
                          </h3>
                          <p className="text-xs text-sky-300 font-semibold">
                            📍 {selectedAuthor.region} • {selectedAuthor.movement}
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() =>
                          onSpeakText(
                            `${selectedAuthor.name}. Obra: ${selectedAuthor.keyWork}. ${selectedAuthor.synopsis}. Cita: ${selectedAuthor.famousQuote}`
                          )
                        }
                        className="bg-sky-500/20 hover:bg-sky-500/30 text-sky-200 border border-sky-400/40 px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 self-start sm:self-auto transition-all hover:scale-105 active:scale-95"
                      >
                        <Volume2 className="w-4 h-4 text-amber-300" />
                        <span>Escuchar Perfil</span>
                      </button>
                    </div>

                    {/* Sinopsis Argumental Escolar */}
                    <div className="bg-gradient-to-r from-sky-950/80 via-[#0e1d3e] to-[#0c1834] border border-sky-400/40 rounded-2xl p-3.5 sm:p-4 space-y-2 shadow-md">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">📖</span>
                          <div>
                            <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider block">
                              Sinopsis Argumental Escolar:
                            </span>
                            <h4 className="text-xs sm:text-sm font-bold text-white">
                              {selectedAuthor.keyWork}
                            </h4>
                          </div>
                        </div>

                        <button
                          onClick={() =>
                            onSpeakText(
                              `Sinopsis de ${selectedAuthor.keyWork}: ${selectedAuthor.synopsis}`
                            )
                          }
                          className="text-xs text-sky-300 hover:text-white bg-sky-500/20 hover:bg-sky-500/30 border border-sky-400/40 px-2.5 py-1 rounded-xl flex items-center gap-1 font-semibold transition-all"
                          title="Escuchar sinopsis"
                        >
                          <Volume2 className="w-3.5 h-3.5 text-amber-300" />
                          <span>Oír Sinopsis</span>
                        </button>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-200 leading-relaxed bg-[#060e20]/70 p-3 rounded-xl border border-sky-500/20 shadow-inner">
                        {selectedAuthor.synopsis}
                      </p>
                    </div>

                    {/* Famous Quote Box */}
                    <div className="bg-gradient-to-r from-amber-500/15 via-orange-500/10 to-amber-500/15 border-l-4 border-amber-400 rounded-r-2xl p-3.5 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-amber-300 uppercase tracking-wide flex items-center gap-1">
                          <Feather className="w-3.5 h-3.5" />
                          <span>Fragmento Célebre: {selectedAuthor.quoteWork}</span>
                        </span>
                        <button
                          onClick={() => onSpeakText(`Cita de ${selectedAuthor.name}: ${selectedAuthor.famousQuote}`)}
                          className="text-xs text-amber-400 hover:text-amber-200 underline font-semibold flex items-center gap-1"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                          <span>Oír Cita</span>
                        </button>
                      </div>
                      <blockquote className="text-xs sm:text-sm font-serif italic text-white leading-relaxed">
                        "{selectedAuthor.famousQuote}"
                      </blockquote>
                    </div>

                    {/* Historical Connection & Fun Fact */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                      <div className="bg-[#0b1326] p-2.5 rounded-xl border border-sky-500/20">
                        <span className="font-bold text-sky-300 block mb-0.5">
                          🏛️ Vínculo Histórico Siglo XX:
                        </span>
                        <p className="text-slate-300 leading-relaxed">
                          {selectedAuthor.historicalConnection}
                        </p>
                      </div>

                      <div className="bg-[#0b1326] p-2.5 rounded-xl border border-amber-500/20">
                        <span className="font-bold text-amber-300 block mb-0.5">
                          💡 Dato Curioso:
                        </span>
                        <p className="text-slate-300 leading-relaxed">
                          {selectedAuthor.funFact}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Travel to author's era CTA */}
                  <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                    <span className="text-xs text-slate-400">
                      ¿Quieres viajar en la máquina al año de esta obra?
                    </span>
                    <button
                      onClick={() => {
                        sounds.playTimeWarp();
                        const yearMatch = selectedAuthor.keyWork.match(/\b(19\d{2})\b/);
                        const targetYear = yearMatch ? parseInt(yearMatch[1]) : 1928;
                        onTravelToYear(targetYear);
                        onClose();
                      }}
                      className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black font-bold text-xs px-3.5 py-1.5 rounded-xl shadow-md flex items-center gap-1.5 transition-all hover:scale-105 active:scale-95"
                    >
                      <Zap className="w-3.5 h-3.5 fill-black" />
                      <span>Viajar a esta Época</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: MINIJUEGO - ORDENAR CRONOLÓGICAMENTE LAS OBRAS */}
          {activeTab === 'chronology' && (
            <div className="max-w-4xl mx-auto space-y-5 animate-fadeIn">
              {/* Instructions banner */}
              <div className="bg-gradient-to-r from-sky-950/70 via-indigo-950/70 to-slate-900 border border-sky-400/40 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">⏳</span>
                    <h3 className="text-base sm:text-lg font-black text-white">
                      Desafío Cronológico: Obras Maestras de Colombia
                    </h3>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Ordena las obras desde la más antigua (años 20) hasta la más reciente (fines del siglo XX) usando los botones ⬆️ y ⬇️.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleShuffleChronology}
                    className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-600 px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all"
                  >
                    <Shuffle className="w-3.5 h-3.5 text-amber-400" />
                    <span>Barajar</span>
                  </button>

                  <button
                    onClick={handleCheckChronology}
                    className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black px-4 py-1.5 rounded-xl text-xs font-black shadow-md flex items-center gap-1.5 transition-all hover:scale-105 active:scale-95"
                  >
                    <CheckCircle2 className="w-4 h-4 fill-black text-amber-400" />
                    <span>Comprobar Orden</span>
                  </button>
                </div>
              </div>

              {/* Status score banner if checked */}
              {chronologyChecked && (
                <div
                  className={`p-3.5 rounded-2xl border-2 flex items-center justify-between gap-3 animate-fadeIn ${
                    chronologyWon
                      ? 'bg-emerald-950/80 border-emerald-400 text-emerald-200 shadow-[0_0_25px_rgba(16,185,129,0.3)]'
                      : 'bg-amber-950/70 border-amber-400/80 text-amber-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{chronologyWon ? '🎉' : '⚠️'}</span>
                    <div>
                      <h4 className="text-sm font-black">
                        {chronologyWon
                          ? '¡Perfecto! Todas las obras están en orden cronológico exacto (+100 XP, +60 🪙)'
                          : `Has ubicado ${chronologyScore.correct} de ${chronologyScore.total} obras correctamente.`}
                      </h4>
                      <p className="text-xs opacity-90">
                        {chronologyWon
                          ? 'Has demostrado ser un auténtico cronista literario de Colombia.'
                          : 'Usa las pistas históricas de cada tarjeta para ajustar las posiciones y vuelve a comprobar.'}
                      </p>
                    </div>
                  </div>

                  {chronologyWon && (
                    <span className="text-xs uppercase font-black bg-emerald-500 text-black px-3 py-1 rounded-xl shadow">
                      ¡Logro Obtenido!
                    </span>
                  )}
                </div>
              )}

              {/* Masterpiece Cards Deck to Order */}
              <div className="space-y-2.5">
                {chronologyDeck.map((item, index) => {
                  const isCorrectPos = chronologyChecked && item.id === CHRONOLOGY_MASTERPIECES[index].id;
                  const isWrongPos = chronologyChecked && !isCorrectPos;

                  return (
                    <div
                      key={item.id}
                      className={`p-3 sm:p-4 rounded-2xl border-2 transition-all flex items-center justify-between gap-3 shadow-md ${
                        chronologyChecked
                          ? isCorrectPos
                            ? 'bg-emerald-950/60 border-emerald-400/80'
                            : 'bg-rose-950/40 border-rose-500/60'
                          : 'bg-[#0f1b38] border-slate-700/70 hover:border-sky-400/50'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        {/* Position number pill */}
                        <span className="w-7 h-7 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-black text-amber-300 flex-shrink-0">
                          #{index + 1}
                        </span>

                        <span className="text-2xl flex-shrink-0">{item.icon}</span>

                        <div className="truncate">
                          <div className="flex items-center gap-2">
                            <h4 className="text-xs sm:text-sm font-black text-white truncate">
                              {item.title}
                            </h4>
                            {chronologyChecked && isCorrectPos && (
                              <span className="text-[10px] font-mono font-black text-emerald-400 bg-emerald-500/20 px-2 py-0.2 rounded-md border border-emerald-400/40">
                                {item.year} ✓
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-amber-300/90 font-medium truncate">
                            {item.author} • {item.genre}
                          </p>
                          <p className="text-[10px] text-slate-400 italic truncate">
                            {item.clueQuote}
                          </p>
                        </div>
                      </div>

                      {/* Right controls: Hint & Up/Down buttons */}
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {/* Hint Button */}
                        <button
                          onClick={() => setHintActiveId(hintActiveId === item.id ? null : item.id)}
                          className="p-1.5 rounded-lg bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 border border-sky-400/30 text-xs flex items-center gap-1"
                          title="Ver pista histórica"
                        >
                          <Lightbulb className="w-3.5 h-3.5 text-amber-300" />
                          <span className="hidden sm:inline">Pista</span>
                        </button>

                        {/* Move Up */}
                        <button
                          onClick={() => handleMoveChronologyItem(index, 'up')}
                          disabled={index === 0}
                          className={`w-8 h-8 rounded-xl flex items-center justify-center border transition-all ${
                            index === 0
                              ? 'bg-slate-800/40 text-slate-600 border-slate-800 cursor-not-allowed'
                              : 'bg-slate-800 hover:bg-slate-700 text-white border-slate-600 active:scale-95'
                          }`}
                          title="Subir hacia época anterior"
                        >
                          <ArrowUp className="w-4 h-4" />
                        </button>

                        {/* Move Down */}
                        <button
                          onClick={() => handleMoveChronologyItem(index, 'down')}
                          disabled={index === chronologyDeck.length - 1}
                          className={`w-8 h-8 rounded-xl flex items-center justify-center border transition-all ${
                            index === chronologyDeck.length - 1
                              ? 'bg-slate-800/40 text-slate-600 border-slate-800 cursor-not-allowed'
                              : 'bg-slate-800 hover:bg-slate-700 text-white border-slate-600 active:scale-95'
                          }`}
                          title="Bajar hacia época posterior"
                        >
                          <ArrowDown className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Clue popover inline */}
                      {hintActiveId === item.id && (
                        <div className="absolute left-10 right-10 z-10 bg-[#081226] border border-amber-400 p-3 rounded-2xl shadow-xl animate-fadeIn text-xs text-amber-200">
                          <span className="font-bold block text-white mb-0.5">💡 Pista de Leo:</span>
                          {item.historicalHint}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: COLOMBIANISMS & IDIOMS */}
          {activeTab === 'dictionary' && (
            <div className="space-y-6">
              {/* Search bar & info */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#101b38] p-4 rounded-2xl border border-amber-400/30">
                <div className="relative w-full sm:w-80">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={searchWord}
                    onChange={(e) => setSearchWord(e.target.value)}
                    placeholder="Buscar dicho o expresión popular..."
                    className="w-full bg-[#0b1328] border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="text-xs text-slate-300 text-center sm:text-right">
                  <span className="text-amber-400 font-bold">Tradición Oral & Léxico Nacional:</span>{' '}
                  Expresiones nacidas o arraigadas en Colombia durante el siglo XX.
                </div>
              </div>

              {/* Grid of expressions */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredColombianisms.map((item) => (
                  <div
                    key={item.id}
                    className="bg-[#0f1b38] border border-sky-500/20 hover:border-amber-400/50 rounded-2xl p-4 shadow-lg flex flex-col justify-between transition-all hover:scale-[1.01] group"
                  >
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="text-base sm:text-lg font-black text-amber-300 group-hover:text-amber-200">
                          "{item.expression}"
                        </span>
                        <span className="text-[10px] font-bold uppercase bg-sky-500/20 text-sky-300 px-2 py-0.5 rounded-full border border-sky-400/30">
                          {item.region}
                        </span>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-200 font-medium">
                        {item.meaning}
                      </p>

                      <div className="bg-[#0b1328] p-2.5 rounded-xl border border-slate-700/60 text-xs italic text-slate-300">
                        <span className="text-amber-400 font-bold not-italic">Ejemplo: </span>
                        "{item.exampleSentence}"
                      </div>
                    </div>

                    <div className="mt-3 pt-2.5 border-t border-slate-800 flex items-center justify-between text-[11px]">
                      <span className="text-slate-400 truncate max-w-[200px]" title={item.historicalContext}>
                        🕰️ {item.historicalContext}
                      </span>
                      <button
                        onClick={() =>
                          onSpeakText(
                            `La expresión "${item.expression}" significa: ${item.meaning}. Por ejemplo: ${item.exampleSentence}`
                          )
                        }
                        className="text-sky-300 hover:text-white p-1 rounded-lg hover:bg-sky-500/20"
                        title="Escuchar locución"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: QUIZ DE FIGURAS LITERARIAS & ORTOGRAFÍA */}
          {activeTab === 'quiz' && (
            <div className="max-w-3xl mx-auto space-y-6">
              {!quizFinished ? (
                <div className="bg-[#101b3a] border-2 border-amber-400/40 rounded-3xl p-5 sm:p-7 shadow-xl space-y-5">
                  {/* Progress Header */}
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-amber-400 uppercase tracking-wider bg-amber-500/20 px-2.5 py-1 rounded-full border border-amber-400/40">
                        Pregunta {quizIndex + 1} de {LENGUA_CHALLENGE_BANK.length}
                      </span>
                      <span className="text-xs text-slate-400 uppercase font-semibold">
                        {currentQuiz.type.replace('_', ' ')}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1 text-xs text-amber-300 font-bold">
                        <span>⭐ Puntos:</span>
                        <span>{score}</span>
                      </div>
                      <div className="text-xs text-emerald-400 font-bold">
                        +{currentQuiz.coinReward} 🪙
                      </div>
                    </div>
                  </div>

                  {/* Question Prompt */}
                  <div className="space-y-3">
                    <h3 className="text-base sm:text-xl font-bold text-white leading-snug">
                      {currentQuiz.prompt}
                    </h3>
                    {currentQuiz.authorReference && (
                      <span className="text-xs text-sky-300 font-semibold bg-sky-950/60 px-2.5 py-1 rounded-lg border border-sky-500/30 inline-block">
                        📖 Referencia: {currentQuiz.authorReference}
                      </span>
                    )}
                  </div>

                  {/* Options */}
                  <div className="space-y-2.5">
                    {currentQuiz.options.map((opt, idx) => {
                      const isSelected = selectedOption === idx;
                      let optionStyle = 'bg-[#0d162e] border-slate-700 hover:border-slate-500 text-slate-200';

                      if (isAnswerSubmitted) {
                        if (idx === currentQuiz.correctIndex) {
                          optionStyle = 'bg-emerald-950/80 border-emerald-400 text-emerald-200 font-bold';
                        } else if (isSelected && idx !== currentQuiz.correctIndex) {
                          optionStyle = 'bg-rose-950/80 border-rose-500 text-rose-200';
                        } else {
                          optionStyle = 'bg-[#0d162e] border-slate-800 text-slate-500 opacity-60';
                        }
                      } else if (isSelected) {
                        optionStyle = 'bg-amber-500/20 border-amber-400 text-white font-bold scale-[1.01]';
                      }

                      return (
                        <div
                          key={idx}
                          onClick={() => handleSelectOption(idx)}
                          className={`p-3.5 sm:p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between gap-3 ${optionStyle}`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="w-7 h-7 rounded-xl bg-slate-800/80 border border-slate-700 flex items-center justify-center text-xs font-bold text-amber-300">
                              {String.fromCharCode(65 + idx)}
                            </span>
                            <span className="text-xs sm:text-sm">{opt}</span>
                          </div>

                          {isAnswerSubmitted && idx === currentQuiz.correctIndex && (
                            <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                          )}
                          {isAnswerSubmitted && isSelected && idx !== currentQuiz.correctIndex && (
                            <AlertCircle className="w-5 h-5 text-rose-400 flex-shrink-0" />
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Feedback Explanation */}
                  {isAnswerSubmitted && (
                    <div className="bg-[#0b1429] p-4 rounded-2xl border border-sky-500/30 space-y-2 animate-fadeIn">
                      <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wide">
                        <Sparkles className="w-4 h-4 text-amber-300" />
                        <span>Explicación del Profe Leo:</span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                        {currentQuiz.explanation}
                      </p>
                    </div>
                  )}

                  {/* Quiz Action Buttons */}
                  <div className="pt-2 flex items-center justify-between">
                    <button
                      onClick={() => onSpeakText(`${currentQuiz.prompt}`)}
                      className="text-xs text-sky-300 hover:text-white flex items-center gap-1 font-semibold"
                    >
                      <Volume2 className="w-4 h-4" />
                      <span>Escuchar Pregunta</span>
                    </button>

                    {!isAnswerSubmitted ? (
                      <button
                        onClick={handleSubmitQuizAnswer}
                        disabled={selectedOption === null}
                        className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold shadow-md transition-all ${
                          selectedOption !== null
                            ? 'bg-amber-500 hover:bg-amber-400 text-black hover:scale-105 active:scale-95'
                            : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                        }`}
                      >
                        Comprobar Respuesta
                      </button>
                    ) : (
                      <button
                        onClick={handleNextQuiz}
                        className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-black px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold shadow-md flex items-center gap-2 hover:scale-105 active:scale-95 transition-all"
                      >
                        <span>Siguiente Pregunta</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                /* Quiz Completion Card */
                <div className="bg-[#101b3a] border-2 border-emerald-400/50 rounded-3xl p-6 sm:p-8 text-center space-y-5 shadow-2xl animate-scaleUp">
                  <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-amber-500 to-emerald-500 flex items-center justify-center text-4xl shadow-xl">
                    🏆
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-white">
                      ¡Completaste el Desafío de Lengua Castellana!
                    </h3>
                    <p className="text-sm text-slate-300 mt-1">
                      Has demostrado grandes conocimientos en literatura del siglo XX, ortografía y expresiones colombianas.
                    </p>
                  </div>

                  <div className="inline-block bg-[#0b1429] border border-amber-400/40 rounded-2xl px-6 py-4">
                    <span className="text-xs uppercase font-bold text-amber-400 block mb-1">
                      Puntaje Final Obtenido
                    </span>
                    <span className="text-3xl font-black text-white">
                      {score} / {LENGUA_CHALLENGE_BANK.length} Aciertos
                    </span>
                  </div>

                  <div className="flex items-center justify-center gap-3 pt-3">
                    <button
                      onClick={handleRestartQuiz}
                      className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2.5 rounded-xl text-xs font-bold border border-slate-600 flex items-center gap-1.5 transition-all"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>Volver a Intentar</span>
                    </button>
                    <button
                      onClick={() => setActiveTab('workshop')}
                      className="bg-amber-500 hover:bg-amber-400 text-black px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all"
                    >
                      <Feather className="w-4 h-4" />
                      <span>Ir al Taller de Cuentos</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 5: CREATIVE MICRO-STORY WORKSHOP */}
          {activeTab === 'workshop' && (
            <div className="space-y-6">
              <div className="bg-[#101b38] border border-amber-400/30 p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-amber-400 bg-amber-500/20 px-2 py-0.5 rounded-full border border-amber-400/40">
                    Taller de Escritura Creativa Escolar
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-white mt-1">
                    Crea tu Micro-relato del Siglo XX Colombiano
                  </h3>
                  <p className="text-xs text-slate-300">
                    Elige una época histórica, un personaje y escribe un cuento corto para la clase de español.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      onSpeakText(
                        `Micro-relato: ${MICRO_RELATO_TEMPLATES[selectedTemplateIndex].seedTitle}. ${customStory}`
                      )
                    }
                    className="bg-sky-500/20 hover:bg-sky-500/30 text-sky-200 border border-sky-400/40 px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all"
                  >
                    <Volume2 className="w-4 h-4 text-amber-300" />
                    <span>Escuchar Relato</span>
                  </button>
                  <button
                    onClick={handleCopyStory}
                    className="bg-amber-500 hover:bg-amber-400 text-black px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-md"
                  >
                    {storyCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    <span>{storyCopied ? '¡Copiado!' : 'Copiar Texto'}</span>
                  </button>
                </div>
              </div>

              {/* Template selector pills */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wide block">
                  Elige una Época e Inspiración Narrativa:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
                  {MICRO_RELATO_TEMPLATES.map((tmpl, idx) => {
                    const isSelected = selectedTemplateIndex === idx;
                    return (
                      <div
                        key={idx}
                        onClick={() => handleSelectTemplate(idx)}
                        className={`p-3 rounded-2xl border-2 cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-amber-500/20 border-amber-400 text-white font-bold shadow-md'
                            : 'bg-[#0f1b36] border-slate-700/60 hover:border-slate-500 text-slate-300'
                        }`}
                      >
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="font-mono text-amber-400 font-bold">{tmpl.year}</span>
                          <span className="text-[10px] text-sky-300">{tmpl.literaryStyle.split(' ')[0]}</span>
                        </div>
                        <h4 className="text-xs font-bold text-white line-clamp-1">{tmpl.seedTitle}</h4>
                        <p className="text-[11px] text-slate-400 line-clamp-2 mt-1">{tmpl.setting}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Active template details */}
              {MICRO_RELATO_TEMPLATES[selectedTemplateIndex] && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs bg-[#0b1328] p-3.5 rounded-2xl border border-slate-800">
                  <div>
                    <span className="font-bold text-amber-300 block">👤 Protagonista:</span>
                    <p className="text-slate-300">{MICRO_RELATO_TEMPLATES[selectedTemplateIndex].protagonist}</p>
                  </div>
                  <div>
                    <span className="font-bold text-sky-300 block">🕰️ Objeto de la Época:</span>
                    <p className="text-slate-300">{MICRO_RELATO_TEMPLATES[selectedTemplateIndex].historicalItem}</p>
                  </div>
                  <div>
                    <span className="font-bold text-emerald-300 block">🇨🇴 Dicho o Colombianismo:</span>
                    <p className="text-slate-300">"{MICRO_RELATO_TEMPLATES[selectedTemplateIndex].colombianExpression}"</p>
                  </div>
                </div>
              )}

              {/* Interactive Story Editor */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-300 uppercase tracking-wide">
                    Continúa o Edita tu Cuento:
                  </label>
                  <span className="text-[11px] text-slate-400">
                    {customStory.length} caracteres
                  </span>
                </div>
                <textarea
                  rows={6}
                  value={customStory}
                  onChange={(e) => setCustomStory(e.target.value)}
                  className="w-full bg-[#0b1428] border-2 border-slate-700 focus:border-amber-400 rounded-2xl p-4 text-sm text-slate-100 font-serif leading-relaxed focus:outline-none placeholder-slate-500 shadow-inner"
                  placeholder="Escribe tu micro-relato aquí..."
                />
              </div>

              {/* Footer encouragement */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400 bg-[#0f1b38] p-3 rounded-xl border border-slate-800">
                <div className="flex items-center gap-2">
                  <span>💡</span>
                  <span>
                    ¡Puedes imprimir o pegar este micro-relato en tu cuaderno de Lengua Castellana como tarea creativa!
                  </span>
                </div>
                <button
                  onClick={() => {
                    sounds.playCoin();
                    onEarnCoins(30);
                    onEarnXp(40);
                    triggerConfetti(0.5, 0.4);
                  }}
                  className="bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-400/40 px-3 py-1.5 rounded-xl font-bold transition-all whitespace-nowrap"
                >
                  ✨ Guardar Micro-relato (+30 🪙)
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Interactive Tooltip on Author / Work Hover */}
      {hoveredAuthorTooltip && (
        <div
          className="fixed z-[75] pointer-events-none w-72 sm:w-80 p-3.5 sm:p-4 rounded-2xl bg-[#091124]/95 border-2 border-amber-400 shadow-[0_0_35px_rgba(245,158,11,0.6)] backdrop-blur-md animate-fadeIn text-xs text-slate-200"
          style={{
            top: tooltipPos ? Math.min(window.innerHeight - 270, Math.max(15, tooltipPos.y - 110)) : '20%',
            left: tooltipPos ? Math.min(window.innerWidth - 330, Math.max(15, tooltipPos.x + 18)) : '20%',
          }}
        >
          <div className="flex items-start gap-3 border-b border-amber-400/30 pb-2.5 mb-2.5">
            <div className="relative w-14 h-14 rounded-xl overflow-hidden border-2 border-amber-400 flex-shrink-0 shadow-md bg-slate-900">
              <img
                src={hoveredAuthorTooltip.portraitBadge}
                alt={hoveredAuthorTooltip.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <span className="absolute bottom-0 right-0 text-xs bg-black/70 px-1 rounded">
                {hoveredAuthorTooltip.icon}
              </span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-black tracking-wider text-amber-400 block">
                Ficha Pedagógica IA
              </span>
              <h4 className="font-black text-white text-sm leading-tight">
                {hoveredAuthorTooltip.name}
              </h4>
              <span className="text-[11px] text-sky-300 font-bold block mt-0.5">
                🎂 Nacimiento: <strong>{hoveredAuthorTooltip.birthYear}</strong>
                {hoveredAuthorTooltip.deathYear ? ` • ✝️ ${hoveredAuthorTooltip.deathYear}` : ' (Presente)'}
              </span>
            </div>
          </div>

          <div className="space-y-1.5">
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold block">
                📍 Origen & Región:
              </span>
              <span className="text-slate-200 font-medium">
                {hoveredAuthorTooltip.region}
              </span>
            </div>

            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold block">
                📖 Obra Cumbre:
              </span>
              <span className="text-amber-300 font-bold">
                {hoveredAuthorTooltip.keyWork}
              </span>
            </div>

            <div className="bg-[#050b18] p-2 rounded-xl border border-sky-500/20 mt-1">
              <span className="text-[10px] text-emerald-400 font-bold block">
                💡 Valor Pedagógico STEAM+:
              </span>
              <p className="text-[11px] text-slate-300 leading-snug">
                {hoveredAuthorTooltip.pedagogicalKey}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Secret Achievement: Quantum Fireworks Overlay for "Políglota del Tiempo" */}
      <QuantumFireworksOverlay
        isActive={showFireworks}
        onClose={() => setShowFireworks(false)}
        title="¡LOGRO SECRETO: POLÍGLOTA DEL TIEMPO!"
        subtitle="¡Completaste con maestría 3 obras literarias maestras del siglo XX colombiano sin cometer un solo error!"
      />
    </div>
  );
};
