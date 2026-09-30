import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowLeft,
  X,
  Gamepad2,
  Sparkles,
  RefreshCw,
  Trophy,
  Volume2,
  HelpCircle,
  CheckCircle,
  XCircle,
  Timer,
  Flame,
  Award,
  Coins,
  Compass,
  Gift,
  Search,
  KeyRound,
  RotateCw,
  Zap,
} from 'lucide-react';
import { TRIVIA_QUESTIONS } from '../data/triviaQuestionsBank';
import { HISTORIC_WORD_PUZZLES, WordPuzzle } from '../data/wordPuzzleBank';
import { sounds } from '../utils/soundEffects';
import { triggerConfetti } from '../utils/confetti';
import { leoVoice } from '../utils/leoVoice';

interface MinigamesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRewardCoins: (amount: number) => void;
  onUnlockItem?: (itemId: string) => void;
}

interface MythRealityItem {
  statement: string;
  isReality: boolean;
  explanation: string;
}

const MYTH_REALITY_ITEMS: MythRealityItem[] = [
  {
    statement: 'Los primeros televisores en 1954 transmitían programas a todo color en Colombia.',
    isReality: false,
    explanation: '¡Mito! Las transmisiones de 1954 eran estrictamente en blanco y negro. El color llegó oficialmente a Colombia el 1 de diciembre de 1979.',
  },
  {
    statement: 'A principios del siglo XX, las noticias de Bogotá a Barranquilla viajaban en barcos de vapor por el Río Magdalena.',
    isReality: true,
    explanation: '¡Realidad! Sin carreteras pavimentadas ni aviones comerciales, los vapores por el río Magdalena eran la autopista vital de Colombia.',
  },
  {
    statement: 'En 1996, más de 2.7 millones de niños colombianos votaron en las escuelas por el Mandato de los Niños por la Paz.',
    isReality: true,
    explanation: '¡Realidad! Fue una votación infantil histórica apadrinada por UNICEF que demostró el compromiso de la niñez con la no violencia.',
  },
  {
    statement: 'El tren de la Sabana de Bogotá en los años 1920 funcionaba con energía solar.',
    isReality: false,
    explanation: '¡Mito! Los trenes de esa época eran locomotoras a vapor que quemaban carbón mineral de las minas de Nemocón y Zipaquirá.',
  },
  {
    statement: 'En 1982, Gabriel García Márquez asistió a recibir el Nobel en Suecia vestido con un tradicional liquiliqui caribeño.',
    isReality: true,
    explanation: '¡Realidad! Gabo vistió de blanco de lino para honrar sus raíces del Caribe colombiano y de América Latina.',
  },
  {
    statement: 'Las mujeres en Colombia siempre tuvieron derecho al voto desde el año 1900.',
    isReality: false,
    explanation: '¡Mito! Las mujeres colombianas votaron por primera vez en las urnas el 1 de diciembre de 1957 en el plebiscito nacional.',
  },
];

const WHEEL_PRIZES = [
  { label: '50 Monedas', type: 'coins', amount: 50, color: '#0284c7', icon: '🪙' },
  { label: '100 Monedas', type: 'coins', amount: 100, color: '#f59e0b', icon: '💰' },
  { label: 'Cofre Misterioso', type: 'chest', amount: 80, color: '#8b5cf6', icon: '🎁' },
  { label: '250 JACKPOT', type: 'jackpot', amount: 250, color: '#ec4899', icon: '👑' },
  { label: '75 Monedas', type: 'coins', amount: 75, color: '#10b981', icon: '🪙' },
  { label: 'Racha x2 Monedas', type: 'multiplier', amount: 120, color: '#6366f1', icon: '⚡' },
  { label: '150 Monedas', type: 'coins', amount: 150, color: '#f97316', icon: '💎' },
  { label: 'Giro Doble Extra', type: 'coins', amount: 90, color: '#14b8a6', icon: '🌟' },
];

export const MinigamesModal: React.FC<MinigamesModalProps> = ({
  isOpen,
  onClose,
  onRewardCoins,
}) => {
  const [activeTab, setActiveTab] = useState<'quiz' | 'word' | 'wheel' | 'chest' | 'myth' | 'trompo'>('quiz');

  // ==================== DAILY STREAK ====================
  const [dailyStreak, setDailyStreak] = useState<number>(1);
  const [streakClaimedToday, setStreakClaimedToday] = useState<boolean>(false);

  useEffect(() => {
    if (!isOpen) return;
    try {
      const today = new Date().toISOString().slice(0, 10);
      const lastDate = localStorage.getItem('leo_last_streak_date');
      const savedStreak = parseInt(localStorage.getItem('leo_daily_streak') || '1', 10);

      if (lastDate === today) {
        setStreakClaimedToday(true);
        setDailyStreak(savedStreak);
      } else {
        const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
        if (lastDate === yesterday) {
          const newStreak = savedStreak + 1;
          setDailyStreak(newStreak);
          localStorage.setItem('leo_daily_streak', newStreak.toString());
        } else if (!lastDate) {
          setDailyStreak(1);
          localStorage.setItem('leo_daily_streak', '1');
        } else {
          // Reset streak if missed more than 1 day
          setDailyStreak(1);
          localStorage.setItem('leo_daily_streak', '1');
        }
        setStreakClaimedToday(false);
      }
    } catch (e) {
      // ignore
    }
  }, [isOpen]);

  const claimDailyReward = () => {
    const today = new Date().toISOString().slice(0, 10);
    localStorage.setItem('leo_last_streak_date', today);
    setStreakClaimedToday(true);
    const reward = Math.min(300, 50 * dailyStreak);
    onRewardCoins(reward);
    sounds.playFanfare();
    sounds.playWheelJackpot();
    triggerConfetti(0.5, 0.4);
  };

  // ==================== 1. CAZA-PREGUNTAS 100 ====================
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');
  const [filteredQuestions, setFilteredQuestions] = useState(TRIVIA_QUESTIONS);
  const [qIndex, setQIndex] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [quizStreak, setQuizStreak] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [quizTimer, setQuizTimer] = useState(25);
  const [totalCoinsEarnedInQuiz, setTotalCoinsEarnedInQuiz] = useState(0);

  useEffect(() => {
    if (selectedCategory === 'Todas') {
      setFilteredQuestions(TRIVIA_QUESTIONS);
    } else {
      setFilteredQuestions(TRIVIA_QUESTIONS.filter((q) => q.category === selectedCategory));
    }
    setQIndex(0);
    setSelectedOption(null);
    setIsRevealed(false);
    setQuizTimer(25);
  }, [selectedCategory]);

  // Quiz timer
  useEffect(() => {
    let interval: any;
    if (activeTab === 'quiz' && !isRevealed && isOpen && filteredQuestions.length > 0) {
      interval = setInterval(() => {
        setQuizTimer((t) => {
          if (t <= 1) {
            handleAnswerOption(-1);
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [activeTab, isRevealed, isOpen, filteredQuestions, qIndex]);

  const currentQ = filteredQuestions[qIndex % filteredQuestions.length];

  const handleAnswerOption = (optIdx: number) => {
    if (isRevealed || !currentQ) return;
    setSelectedOption(optIdx);
    setIsRevealed(true);

    const isCorrect = optIdx === currentQ.correctIndex;
    if (isCorrect) {
      const multiplier = Math.min(3, 1 + Math.floor(quizStreak / 2));
      const coins = currentQ.rewardCoins * multiplier;
      sounds.playCoin();
      sounds.playStreak(quizStreak + 1);
      triggerConfetti(0.4, 0.4);
      setQuizStreak((s) => s + 1);
      setQuizScore((score) => score + 100 * multiplier);
      setTotalCoinsEarnedInQuiz((c) => c + coins);
      onRewardCoins(coins);
    } else {
      sounds.playBuzzerError();
      setQuizStreak(0);
    }
  };

  const handleNextQ = () => {
    sounds.playClick();
    setSelectedOption(null);
    setIsRevealed(false);
    setQuizTimer(25);
    setQIndex((prev) => (prev + 1) % filteredQuestions.length);
  };

  // ==================== 2. PALABRA PERDIDA ====================
  const [wordPuzzleIdx, setWordPuzzleIdx] = useState(0);
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [wordMistakes, setWordMistakes] = useState(0);
  const [wordSolved, setWordSolved] = useState(false);
  const [wordCoinsWon, setWordCoinsWon] = useState(0);

  const currentPuzzle: WordPuzzle = HISTORIC_WORD_PUZZLES[wordPuzzleIdx % HISTORIC_WORD_PUZZLES.length];
  const targetWord = currentPuzzle ? currentPuzzle.word.toUpperCase() : '';

  useEffect(() => {
    setGuessedLetters([]);
    setWordMistakes(0);
    setWordSolved(false);
  }, [wordPuzzleIdx]);

  const handleGuessLetter = (letter: string) => {
    if (wordSolved || guessedLetters.includes(letter) || wordMistakes >= 6) return;

    sounds.playLetterFlip();
    const updated = [...guessedLetters, letter];
    setGuessedLetters(updated);

    if (!targetWord.includes(letter)) {
      sounds.playBuzzerError();
      setWordMistakes((m) => m + 1);
    } else {
      // Check if word is complete
      const allFound = targetWord.split('').every((char) => updated.includes(char) || char === ' ');
      if (allFound) {
        sounds.playWordWin();
        triggerConfetti(0.5, 0.4);
        setWordSolved(true);
        const reward = Math.max(30, currentPuzzle.coinsReward - wordMistakes * 5);
        setWordCoinsWon((w) => w + reward);
        onRewardCoins(reward);
      }
    }
  };

  const handleUseWordHint = () => {
    if (wordSolved) return;
    sounds.playClick();
    // Find first missing letter
    const missing = targetWord.split('').find((c) => !guessedLetters.includes(c) && c !== ' ');
    if (missing) {
      handleGuessLetter(missing);
    }
  };

  const handleNextWord = () => {
    sounds.playClick();
    setWordPuzzleIdx((idx) => idx + 1);
  };

  // ==================== 3. RULETA DE LA FORTUNA ====================
  const [wheelRotation, setWheelRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [wheelResult, setWheelResult] = useState<any | null>(null);
  const [freeSpinsLeft, setFreeSpinsLeft] = useState(3);

  const spinWheel = () => {
    if (isSpinning || freeSpinsLeft <= 0) return;
    setIsSpinning(true);
    setWheelResult(null);
    setFreeSpinsLeft((s) => s - 1);

    // Play tick sounds at intervals
    let tickCount = 0;
    const tickInterval = setInterval(() => {
      sounds.playWheelTick();
      tickCount++;
      if (tickCount > 25) clearInterval(tickInterval);
    }, 120);

    // Random landing wedge (0 to 7)
    const prizeIndex = Math.floor(Math.random() * WHEEL_PRIZES.length);
    const segmentDegrees = 360 / WHEEL_PRIZES.length;
    // Calculate final rotation with extra full spins
    const extraSpins = 5 + Math.floor(Math.random() * 3);
    const targetDeg = wheelRotation + extraSpins * 360 + prizeIndex * segmentDegrees + segmentDegrees / 2;

    setWheelRotation(targetDeg);

    setTimeout(() => {
      setIsSpinning(false);
      clearInterval(tickInterval);
      const prize = WHEEL_PRIZES[prizeIndex];
      setWheelResult(prize);
      sounds.playWheelJackpot();
      triggerConfetti(0.5, 0.5);
      onRewardCoins(prize.amount);
    }, 3500);
  };

  // ==================== 4. COFRE DEL TESORO ====================
  const [isOpeningChest, setIsOpeningChest] = useState(false);
  const [chestReward, setChestReward] = useState<string | null>(null);

  const openMysteryChest = () => {
    if (isOpeningChest) return;
    setIsOpeningChest(true);
    setChestReward(null);
    sounds.playChestOpen();

    const rewards = [
      '🪙 ¡120 Monedas de Oro!',
      '🎩 ¡Sombrero de Maquinista 1920!',
      '🪙 ¡200 Monedas Cuánticas!',
      '🕊️ ¡Insignia de la Paloma de la Paz!',
      '☕ ¡Grano de Café de Oro Supremo!',
      '🥋 ¡Liquiliqui de Gala de Gabo!',
      '🪙 ¡150 Monedas + Multiplicador x2!',
    ];

    setTimeout(() => {
      setIsOpeningChest(false);
      const picked = rewards[Math.floor(Math.random() * rewards.length)];
      setChestReward(picked);
      sounds.playFanfare();
      triggerConfetti(0.5, 0.4);
      onRewardCoins(100);
    }, 1800);
  };

  // ==================== 5. MITO O REALIDAD ====================
  const [mythIdx, setMythIdx] = useState(0);
  const [mythAnswered, setMythAnswered] = useState<boolean | null>(null);
  const [mythScore, setMythScore] = useState(0);

  const currentMyth = MYTH_REALITY_ITEMS[mythIdx % MYTH_REALITY_ITEMS.length];

  const handleMythChoice = (choice: boolean) => {
    if (mythAnswered !== null) return;
    setMythAnswered(choice);
    const isCorrect = choice === currentMyth.isReality;
    if (isCorrect) {
      sounds.playCoin();
      sounds.playFanfare();
      triggerConfetti(0.4, 0.4);
      setMythScore((s) => s + 80);
      onRewardCoins(40);
    } else {
      sounds.playBuzzerError();
    }
  };

  const handleNextMyth = () => {
    sounds.playClick();
    setMythAnswered(null);
    setMythIdx((i) => i + 1);
  };

  // ==================== 6. TROMPO 1970 ====================
  const [trompoRPM, setTrompoRPM] = useState(0);
  const [trompoScore, setTrompoScore] = useState(0);
  const [trompoPlaying, setTrompoPlaying] = useState(false);

  useEffect(() => {
    let interval: any;
    if (trompoPlaying && trompoRPM > 0) {
      interval = setInterval(() => {
        setTrompoRPM((prev) => {
          if (prev <= 5) {
            setTrompoPlaying(false);
            return 0;
          }
          return Math.max(0, prev - 4);
        });
        setTrompoScore((prev) => prev + 2);
      }, 100);
    }
    return () => clearInterval(interval);
  }, [trompoPlaying, trompoRPM]);

  const whipTrompo = () => {
    sounds.playPop();
    setTrompoPlaying(true);
    setTrompoRPM((prev) => Math.min(1000, prev + 90));
    if (trompoRPM > 600) {
      sounds.playCoin();
      onRewardCoins(10);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/90 backdrop-blur-md animate-fadeIn select-none"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl bg-gradient-to-b from-[#111e38] via-[#0d162a] to-[#070c18] border-2 border-amber-400/40 rounded-3xl shadow-[0_0_60px_rgba(245,158,11,0.25)] overflow-hidden flex flex-col max-h-[95vh]"
      >
        {/* Top Header */}
        <div className="p-3.5 sm:p-4 bg-[#18284d] border-b border-amber-500/30 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <button
              onClick={onClose}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border border-amber-400/40 text-xs font-bold transition-all hover:scale-105"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Volver atrás</span>
            </button>

            <div className="p-2 rounded-2xl bg-amber-500/20 text-amber-300 border border-amber-400/40 hidden sm:flex">
              <Gamepad2 className="w-5 h-5" />
            </div>

            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span>Minijuegos & Desafíos del Tiempo</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/40">
                  +100 PREGUNTAS
                </span>
              </h3>
              <p className="text-xs text-sky-200">
                ¡Gana monedas de oro para desbloquear ropa y atuendos históricos en el laboratorio!
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Daily Streak Badge */}
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-gradient-to-r from-orange-500/20 to-amber-500/20 border border-orange-400/40 text-xs text-amber-300 font-bold">
              <Flame className="w-4 h-4 text-orange-400 animate-bounce" />
              <span>Racha: {dailyStreak} {dailyStreak === 1 ? 'día' : 'días'}</span>
              {!streakClaimedToday && (
                <button
                  onClick={claimDailyReward}
                  className="ml-1.5 px-2 py-0.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-[10px] font-black uppercase transition-transform hover:scale-105"
                >
                  ¡Cobrar!
                </button>
              )}
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full bg-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1.5 px-3 sm:px-4 py-2 bg-[#0d162a] border-b border-sky-500/20 overflow-x-auto scrollbar-none">
          <button
            onClick={() => {
              sounds.playClick();
              setActiveTab('quiz');
            }}
            className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-1.5 transition-all ${
              activeTab === 'quiz'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/30'
                : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <Trophy className="w-3.5 h-3.5" />
            <span>Caza-Preguntas 100</span>
          </button>

          <button
            onClick={() => {
              sounds.playClick();
              setActiveTab('word');
            }}
            className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-1.5 transition-all ${
              activeTab === 'word'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/30'
                : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <KeyRound className="w-3.5 h-3.5" />
            <span>Descifra la Palabra</span>
          </button>

          <button
            onClick={() => {
              sounds.playClick();
              setActiveTab('wheel');
            }}
            className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-1.5 transition-all ${
              activeTab === 'wheel'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/30'
                : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <RotateCw className="w-3.5 h-3.5" />
            <span>Ruleta de la Fortuna</span>
          </button>

          <button
            onClick={() => {
              sounds.playClick();
              setActiveTab('chest');
            }}
            className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-1.5 transition-all ${
              activeTab === 'chest'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/30'
                : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <Gift className="w-3.5 h-3.5" />
            <span>Cofres del Tiempo</span>
          </button>

          <button
            onClick={() => {
              sounds.playClick();
              setActiveTab('myth');
            }}
            className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-1.5 transition-all ${
              activeTab === 'myth'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/30'
                : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>¿Mito o Realidad?</span>
          </button>

          <button
            onClick={() => {
              sounds.playClick();
              setActiveTab('trompo');
            }}
            className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-1.5 transition-all ${
              activeTab === 'trompo'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/30'
                : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Trompo 1970</span>
          </button>
        </div>

        {/* Tab Content Container */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {/* ==================== 1. CAZA-PREGUNTAS 100 ==================== */}
          {activeTab === 'quiz' && currentQ && (
            <div className="space-y-4 max-w-2xl mx-auto">
              {/* Category Filter & Score Stats */}
              <div className="flex flex-wrap items-center justify-between gap-2 bg-[#0a1122] p-3 rounded-2xl border border-sky-500/20">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400">Tema:</span>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-2.5 py-1 rounded-xl bg-slate-900 border border-sky-500/40 text-xs text-sky-200 font-bold focus:outline-none"
                  >
                    <option value="Todas">Todas (100 preguntas)</option>
                    <option value="Historia & Paz">Historia & Paz</option>
                    <option value="Ciencia & Transporte">Ciencia & Transporte</option>
                    <option value="Cultura & Deporte">Cultura & Deporte</option>
                    <option value="Vida Cotidiana & Escuela">Vida Cotidiana & Escuela</option>
                    <option value="Geografía & Regiones">Geografía & Regiones</option>
                  </select>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 text-xs text-amber-300 font-bold">
                    <Flame className="w-4 h-4 text-orange-400" />
                    <span>Racha: {quizStreak}x</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-emerald-300 font-bold">
                    <Coins className="w-4 h-4" />
                    <span>+{totalCoinsEarnedInQuiz}</span>
                  </div>
                  <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-slate-800 text-xs font-mono text-cyan-300">
                    <Timer className="w-3.5 h-3.5" />
                    <span>{quizTimer}s</span>
                  </div>
                </div>
              </div>

              {/* Question Card */}
              <div className="p-5 rounded-3xl bg-gradient-to-br from-[#132349] to-[#0c162e] border-2 border-sky-400/30 shadow-xl relative overflow-hidden">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-lg bg-sky-500/20 text-sky-300 border border-sky-400/30 font-bold">
                    Año {currentQ.year} • {currentQ.category || 'Historia'}
                  </span>
                  <span className="text-xs text-slate-400">
                    Pregunta {qIndex + 1} de {filteredQuestions.length}
                  </span>
                </div>

                <h4 className="text-base sm:text-lg font-bold text-white leading-snug mb-5">
                  {currentQ.question}
                </h4>

                {/* Options */}
                <div className="space-y-2.5">
                  {currentQ.options.map((option, idx) => {
                    let btnStyle = 'bg-[#091122] hover:bg-slate-800/80 border-slate-700 text-slate-200';
                    if (isRevealed) {
                      if (idx === currentQ.correctIndex) {
                        btnStyle = 'bg-emerald-600/30 border-emerald-400 text-emerald-200 font-bold';
                      } else if (idx === selectedOption) {
                        btnStyle = 'bg-rose-600/30 border-rose-400 text-rose-200';
                      } else {
                        btnStyle = 'bg-slate-900/40 border-slate-800 text-slate-500 opacity-60';
                      }
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => handleAnswerOption(idx)}
                        disabled={isRevealed}
                        className={`w-full p-3.5 rounded-2xl border text-left text-xs sm:text-sm transition-all flex items-center justify-between gap-3 ${btnStyle}`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="w-6 h-6 rounded-full bg-slate-800/80 text-sky-300 font-mono text-xs flex items-center justify-center font-bold">
                            {['A', 'B', 'C', 'D'][idx]}
                          </span>
                          <span>{option}</span>
                        </div>
                        {isRevealed && idx === currentQ.correctIndex && (
                          <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                        )}
                        {isRevealed && idx === selectedOption && idx !== currentQ.correctIndex && (
                          <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Explanation Card upon reveal */}
                {isRevealed && (
                  <div className="mt-4 p-3.5 rounded-2xl bg-sky-950/40 border border-sky-400/30 text-xs text-sky-200 animate-fadeIn">
                    <p className="font-bold text-amber-300 mb-1 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4" />
                      <span>Dato Histórico Explicado:</span>
                    </p>
                    <p className="leading-relaxed text-slate-300">{currentQ.explanation}</p>
                    <div className="mt-3 flex justify-end">
                      <button
                        onClick={handleNextQ}
                        className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all hover:scale-105 shadow-md flex items-center gap-1.5"
                      >
                        <span>Siguiente Pregunta</span>
                        <ArrowLeft className="w-3.5 h-3.5 rotate-180" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ==================== 2. DESCIFRA LA PALABRA PERDIDA ==================== */}
          {activeTab === 'word' && currentPuzzle && (
            <div className="space-y-4 max-w-2xl mx-auto">
              <div className="flex items-center justify-between bg-[#0a1122] p-3 rounded-2xl border border-sky-500/20">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono px-2 py-0.5 rounded-lg bg-sky-500/20 text-sky-300 font-bold">
                    Año {currentPuzzle.year}
                  </span>
                  <span className="text-xs text-slate-300 font-medium">{currentPuzzle.category}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-rose-400 font-bold">
                    Errores: {wordMistakes} / 6
                  </span>
                  <div className="flex items-center gap-1 text-xs text-amber-300 font-bold">
                    <Coins className="w-4 h-4" />
                    <span>+{wordCoinsWon}</span>
                  </div>
                </div>
              </div>

              {/* Clue and Sentence */}
              <div className="p-5 rounded-3xl bg-gradient-to-br from-[#14234c] to-[#0c162e] border-2 border-amber-400/30 shadow-xl space-y-4 text-center">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/40 text-xs font-bold">
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>Pista del Explorador: {currentPuzzle.clue}</span>
                </div>

                <p className="text-sm sm:text-base text-slate-200 italic leading-relaxed px-2">
                  "{currentPuzzle.sentenceWithBlank}"
                </p>

                {/* Word Tile Display */}
                <div className="flex flex-wrap items-center justify-center gap-2 py-3">
                  {targetWord.split('').map((letter, idx) => {
                    if (letter === ' ') {
                      return <span key={idx} className="w-4" />;
                    }
                    const isGuessed = guessedLetters.includes(letter) || wordSolved;
                    return (
                      <div
                        key={idx}
                        className={`w-9 h-11 sm:w-11 sm:h-13 rounded-xl border-2 flex items-center justify-center text-lg sm:text-xl font-black transition-all ${
                          isGuessed
                            ? 'bg-amber-400/20 border-amber-400 text-amber-300 shadow-md scale-105'
                            : 'bg-slate-900 border-slate-700 text-transparent'
                        }`}
                      >
                        {isGuessed ? letter : '?'}
                      </div>
                    );
                  })}
                </div>

                {/* Victory Banner */}
                {wordSolved && (
                  <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-400/40 text-center animate-fadeIn">
                    <h5 className="text-sm font-bold text-emerald-300 mb-1">
                      ¡Palabra Descifrada: {currentPuzzle.displayWord}!
                    </h5>
                    <p className="text-xs text-slate-300 mb-3">{currentPuzzle.historicalContext}</p>
                    <button
                      onClick={handleNextWord}
                      className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all hover:scale-105 shadow-md"
                    >
                      Siguiente Palabra Histórica
                    </button>
                  </div>
                )}

                {/* Alphabet Keypad */}
                {!wordSolved && wordMistakes < 6 && (
                  <div className="space-y-2 pt-2">
                    <div className="flex flex-wrap items-center justify-center gap-1.5 max-w-lg mx-auto">
                      {'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'.split('').map((letter) => {
                        const isUsed = guessedLetters.includes(letter);
                        return (
                          <button
                            key={letter}
                            onClick={() => handleGuessLetter(letter)}
                            disabled={isUsed}
                            className={`w-7 h-8 sm:w-8 sm:h-9 rounded-lg text-xs font-black transition-all ${
                              isUsed
                                ? 'bg-slate-800 text-slate-600 cursor-not-allowed'
                                : 'bg-slate-800/90 hover:bg-sky-500 text-white hover:scale-110 border border-slate-700'
                            }`}
                          >
                            {letter}
                          </button>
                        );
                      })}
                    </div>

                    <div className="flex justify-center gap-3 pt-2">
                      <button
                        onClick={handleUseWordHint}
                        className="px-3 py-1.5 rounded-xl bg-sky-500/20 hover:bg-sky-500/30 text-sky-200 border border-sky-400/40 text-xs font-bold transition-all hover:scale-105"
                      >
                        💡 Revelar una Letra
                      </button>
                    </div>
                  </div>
                )}

                {wordMistakes >= 6 && !wordSolved && (
                  <div className="p-3 rounded-2xl bg-rose-950/50 border border-rose-500/40 text-center animate-fadeIn">
                    <p className="text-xs text-rose-300 mb-2">¡Se acabaron los intentos! La palabra era: <strong>{currentPuzzle.displayWord}</strong></p>
                    <button
                      onClick={handleNextWord}
                      className="px-4 py-1.5 rounded-xl bg-slate-800 text-white text-xs font-bold"
                    >
                      Intentar Otra Palabra
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ==================== 3. RULETA DE LA FORTUNA ==================== */}
          {activeTab === 'wheel' && (
            <div className="space-y-4 max-w-md mx-auto text-center">
              <div className="p-3 rounded-2xl bg-[#0a1122] border border-amber-500/30 flex items-center justify-between text-xs">
                <span className="text-slate-300">Giros Gratis Disponibles:</span>
                <span className="font-mono text-amber-300 font-bold">{freeSpinsLeft} Giros</span>
              </div>

              {/* Wheel Graphic */}
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 mx-auto my-4 flex items-center justify-center">
                {/* Fixed Needle at Top */}
                <div className="absolute -top-3 z-20 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[20px] border-t-amber-400 drop-shadow-[0_2px_8px_rgba(245,158,11,0.8)]" />

                {/* Rotating Wheel Disc */}
                <div
                  style={{
                    transform: `rotate(${wheelRotation}deg)`,
                    transition: isSpinning ? 'transform 3.5s cubic-bezier(0.15, 0.9, 0.25, 1)' : 'none',
                  }}
                  className="w-full h-full rounded-full border-4 border-amber-400 shadow-[0_0_40px_rgba(245,158,11,0.4)] overflow-hidden relative bg-slate-900"
                >
                  {WHEEL_PRIZES.map((prize, idx) => {
                    const deg = (360 / WHEEL_PRIZES.length) * idx;
                    return (
                      <div
                        key={idx}
                        style={{
                          transform: `rotate(${deg}deg)`,
                          transformOrigin: 'bottom center',
                          backgroundColor: prize.color,
                        }}
                        className="absolute top-0 left-1/2 -ml-[32px] w-16 h-32 sm:h-36 flex flex-col items-center pt-2 text-white"
                      >
                        <span className="text-sm sm:text-base">{prize.icon}</span>
                        <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-tighter mt-1 text-center leading-tight">
                          {prize.amount}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Wheel Center Hub Button */}
                <button
                  onClick={spinWheel}
                  disabled={isSpinning || freeSpinsLeft <= 0}
                  className="absolute z-10 w-16 h-16 rounded-full bg-gradient-to-tr from-amber-500 to-amber-300 border-4 border-white text-slate-950 font-black text-xs uppercase shadow-xl hover:scale-105 active:scale-95 transition-transform flex items-center justify-center"
                >
                  {isSpinning ? '...' : 'GIRAR'}
                </button>
              </div>

              {/* Spin Result Display */}
              {wheelResult && (
                <div className="p-3.5 rounded-2xl bg-amber-500/20 border border-amber-400/40 animate-fadeIn">
                  <h5 className="text-sm font-bold text-amber-300 mb-0.5">
                    🎉 ¡Premio Obtenido: {wheelResult.label}!
                  </h5>
                  <p className="text-xs text-slate-200">
                    ¡Se han añadido +{wheelResult.amount} monedas a tu inventario temporal!
                  </p>
                </div>
              )}

              <button
                onClick={spinWheel}
                disabled={isSpinning || freeSpinsLeft <= 0}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-amber-500/25 transition-all hover:scale-[1.02] disabled:opacity-50"
              >
                {freeSpinsLeft > 0 ? '¡Girar la Ruleta Ahora!' : 'Vuelve mañana para más giros'}
              </button>
            </div>
          )}

          {/* ==================== 4. COFRES DEL TIEMPO ==================== */}
          {activeTab === 'chest' && (
            <div className="space-y-5 max-w-md mx-auto text-center">
              <div className="p-4 rounded-3xl bg-gradient-to-b from-[#182952] to-[#0c162e] border-2 border-sky-400/30 shadow-xl space-y-4">
                <div className="text-6xl animate-bounce">
                  {isOpeningChest ? '✨' : chestReward ? '🎁' : '🧰'}
                </div>

                <div>
                  <h4 className="text-base font-bold text-white">Cofre de Reliquias Históricas</h4>
                  <p className="text-xs text-sky-200 mt-1">
                    Ábrelo para desbloquear monedas de oro, trajes históricos o insignias raras de Colombia.
                  </p>
                </div>

                {chestReward && (
                  <div className="p-3.5 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 animate-fadeIn">
                    <div className="text-xs font-bold text-emerald-300">¡Premio Conseguido!</div>
                    <div className="text-sm font-black text-white mt-0.5">{chestReward}</div>
                  </div>
                )}

                <button
                  onClick={openMysteryChest}
                  disabled={isOpeningChest}
                  className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-emerald-500/25 transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{isOpeningChest ? 'Abriendo Reliquia...' : 'Abrir Cofre Misterioso'}</span>
                </button>
              </div>
            </div>
          )}

          {/* ==================== 5. ¿MITO O REALIDAD? ==================== */}
          {activeTab === 'myth' && currentMyth && (
            <div className="space-y-4 max-w-xl mx-auto">
              <div className="flex items-center justify-between bg-[#0a1122] p-3 rounded-2xl border border-sky-500/20">
                <span className="text-xs text-slate-400">
                  Curiosidad {mythIdx + 1} de {MYTH_REALITY_ITEMS.length}
                </span>
                <div className="flex items-center gap-1 text-xs text-amber-300 font-bold">
                  <Coins className="w-4 h-4" />
                  <span>Puntos: {mythScore}</span>
                </div>
              </div>

              <div className="p-5 rounded-3xl bg-gradient-to-br from-[#14234c] to-[#0c162e] border-2 border-sky-400/30 shadow-xl text-center space-y-4">
                <h4 className="text-base sm:text-lg font-bold text-white leading-relaxed">
                  "{currentMyth.statement}"
                </h4>

                {mythAnswered === null ? (
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <button
                      onClick={() => handleMythChoice(true)}
                      className="py-3.5 rounded-2xl bg-emerald-600/30 hover:bg-emerald-600/50 border border-emerald-400 text-emerald-200 font-bold text-sm transition-all hover:scale-105 flex items-center justify-center gap-2"
                    >
                      <CheckCircle className="w-5 h-5 text-emerald-400" />
                      <span>¡Es Realidad!</span>
                    </button>

                    <button
                      onClick={() => handleMythChoice(false)}
                      className="py-3.5 rounded-2xl bg-rose-600/30 hover:bg-rose-600/50 border border-rose-400 text-rose-200 font-bold text-sm transition-all hover:scale-105 flex items-center justify-center gap-2"
                    >
                      <XCircle className="w-5 h-5 text-rose-400" />
                      <span>¡Es un Mito!</span>
                    </button>
                  </div>
                ) : (
                  <div className="p-4 rounded-2xl bg-[#091122] border border-sky-500/30 space-y-3 animate-fadeIn">
                    <div
                      className={`text-sm font-black ${
                        mythAnswered === currentMyth.isReality ? 'text-emerald-400' : 'text-rose-400'
                      }`}
                    >
                      {mythAnswered === currentMyth.isReality ? '¡Correcto! 🌟' : '¡Incorrecto! ❌'}
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">{currentMyth.explanation}</p>
                    <button
                      onClick={handleNextMyth}
                      className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all hover:scale-105"
                    >
                      Siguiente Curiosidad
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ==================== 6. TROMPO 1970 ==================== */}
          {activeTab === 'trompo' && (
            <div className="space-y-4 max-w-md mx-auto text-center">
              <div className="p-5 rounded-3xl bg-gradient-to-br from-[#182952] to-[#0c162e] border-2 border-amber-400/30 shadow-xl space-y-4">
                <div
                  style={{
                    transform: `rotate(${trompoRPM * 5}deg)`,
                    transition: 'transform 0.1s linear',
                  }}
                  className="text-7xl select-none inline-block filter drop-shadow-[0_10px_20px_rgba(245,158,11,0.3)]"
                >
                  🌪️
                </div>

                <div>
                  <h4 className="text-base font-bold text-white">Baila el Trompo de Guayacán</h4>
                  <p className="text-xs text-sky-200">
                    ¡Toca repetidamente el botón para enrollar la piola y mantener el trompo girando sin caer!
                  </p>
                </div>

                <div className="flex justify-around bg-[#0a1122] p-3 rounded-2xl border border-sky-500/20">
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase">Velocidad</span>
                    <span className="font-mono text-base font-bold text-amber-300">{trompoRPM} RPM</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase">Puntaje</span>
                    <span className="font-mono text-base font-bold text-emerald-300">{trompoScore} pts</span>
                  </div>
                </div>

                <button
                  onClick={whipTrompo}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-sm uppercase tracking-wider shadow-xl shadow-amber-500/30 transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  <Zap className="w-5 h-5 fill-current" />
                  <span>¡Jalar la Piola del Trompo!</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
