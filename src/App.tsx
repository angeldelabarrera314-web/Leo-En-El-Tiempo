import React, { useState, useEffect, useRef } from 'react';
import { HeaderNavbar } from './components/HeaderNavbar';
import { TimeMachine } from './components/TimeMachine';
import { LeoCharacter } from './components/LeoCharacter';
import { EducationalResults } from './components/EducationalResults';
import { ColombianTimelinePanel } from './components/ColombianTimelinePanel';
import { LeoVoiceAssistant } from './components/LeoVoiceAssistant';
import { SiriAlexaLeoModal } from './components/SiriAlexaLeoModal';
import { OyeLeoWakeModal } from './components/OyeLeoWakeModal';
import { TimePassportModal } from './components/TimePassportModal';
import { EraChallengeModal } from './components/EraChallengeModal';
import { DailyMissionsModal } from './components/DailyMissionsModal';
import { CharacterCustomizerModal } from './components/CharacterCustomizerModal';
import { MinigamesModal } from './components/MinigamesModal';
import { SteamInfoModal } from './components/SteamInfoModal';
import { CompassModal } from './components/CompassModal';
import { VoiceSettingsModal } from './components/VoiceSettingsModal';
import { HomeworkHelperBar } from './components/HomeworkHelperBar';
import { QuantumTimeTunnelModal } from './components/QuantumTimeTunnelModal';
import { VintageNewspaperModal } from './components/VintageNewspaperModal';
import { MainMenuDrawer } from './components/MainMenuDrawer';
import { ConflictMapModal } from './components/ConflictMapModal';
import { ExplorationStreakModal } from './components/ExplorationStreakModal';
import { StreakCelebrationToast } from './components/StreakCelebrationToast';
import { ExperiencesHubModal } from './components/ExperiencesHubModal';
import { QuantumStardustCanvas } from './components/QuantumStardustCanvas';
import { QuantumVoiceHUD } from './components/QuantumVoiceHUD';
import { QuantumPartyOverlay } from './components/QuantumPartyOverlay';
import { LenguaCastellanaModal } from './components/LenguaCastellanaModal';
import { TravelerRankingModal } from './components/TravelerRankingModal';
import { HeroesGalleryModal } from './components/HeroesGalleryModal';
import { HistoricCinemaModal } from './components/HistoricCinemaModal';
import { SuggestionBoxModal } from './components/SuggestionBoxModal';
import { StemFairKioskModal } from './components/StemFairKioskModal';
import { QuantumMindMapModal } from './components/QuantumMindMapModal';
import { StudentRegistrationModal } from './components/StudentRegistrationModal';
import { CustomTravelerCharacter } from './services/travelerSyncService';
import { fetchTimeTravel } from './services/historyEngine';
import { AchievementBadgeCelebrationToast, AchievementBadge } from './components/AchievementBadgeCelebrationToast';

import { PRESET_ERAS } from './data/presetEras';
import { TRIVIA_QUESTIONS } from './data/triviaQuestionsBank';
import { INITIAL_AVATAR_ITEMS, INITIAL_MISSIONS } from './data/avatarAndShopData';
import { sounds } from './utils/soundEffects';
import { decadeAmbience } from './utils/decadeAmbience';
import { triggerConfetti } from './utils/confetti';
import { leoVoice } from './utils/leoVoice';
import { getRankForPlayer } from './data/explorerRanks';
import {
  loadExplorationStreak,
  recordTravelForStreak,
  saveExplorationStreak,
  getMultiplierForStreak,
  getMultiplierLabelForStreak,
  ExplorationStreakData,
  TravelStreakResult,
  STREAK_DAYS_CONFIG,
  getLocalTodayDateString,
} from './data/explorationStreak';
import {
  TimeTravelResult,
  TravelStamp,
  Mission,
  AvatarItem,
  LeoVoiceSettings,
  TriviaQuestion,
} from './types';
import { Mic, Shirt, Gamepad2, Sparkles, BookOpen, Zap, Newspaper, GraduationCap, ShieldAlert, Menu, Flame, Square, Volume2, VolumeX, Award, Mail } from 'lucide-react';

export function App() {
  // App State
  const [currentYear, setCurrentYear] = useState<number>(1954);
  const [isTraveling, setIsTraveling] = useState<boolean>(false);
  // Progress states:
  // Returning users keep all their saved progress; brand-new users start from ZERO!
  const [coins, setCoins] = useState<number>(() => {
    const saved = localStorage.getItem('leo_coins');
    return saved !== null ? parseInt(saved, 10) : 0;
  });

  // Exploration Streak State (5 Days with Expanding Multipliers)
  const [streakData, setStreakData] = useState<ExplorationStreakData>(() =>
    loadExplorationStreak()
  );
  const [isStreakModalOpen, setIsStreakModalOpen] = useState<boolean>(false);
  const [streakToastResult, setStreakToastResult] = useState<TravelStreakResult | null>(null);

  // Explorer Rank, Travel History Counter & Intensity XP
  const [travelCount, setTravelCount] = useState<number>(() => {
    const saved = localStorage.getItem('leo_travel_count');
    return saved !== null ? parseInt(saved, 10) : 0;
  });
  const [xp, setXp] = useState<number>(() => {
    const saved = localStorage.getItem('leo_xp');
    return saved !== null ? parseInt(saved, 10) : 0;
  });

  // Onboarding registration modal for new visitors
  const [isRegistrationOpen, setIsRegistrationOpen] = useState<boolean>(() => {
    return localStorage.getItem('leo_user_registered') !== 'true';
  });

  // Automatic state persistence
  useEffect(() => {
    localStorage.setItem('leo_coins', coins.toString());
  }, [coins]);

  useEffect(() => {
    localStorage.setItem('leo_travel_count', travelCount.toString());
  }, [travelCount]);

  useEffect(() => {
    localStorage.setItem('leo_xp', xp.toString());
  }, [xp]);

  const [missions, setMissions] = useState<Mission[]>(INITIAL_MISSIONS);
  const [stamps, setStamps] = useState<TravelStamp[]>([
    {
      id: 'stamp-1954',
      year: '1954',
      title: 'Primera TV en Colombia',
      era: 'Años 50',
      icon: '📺',
      region: 'Bogotá / Cundinamarca',
      visitedAt: 'Inicio',
      description: 'Llegada de la televisión en blanco y negro a Colombia.',
    },
  ]);

  const [allItems, setAllItems] = useState<AvatarItem[]>(INITIAL_AVATAR_ITEMS);
  const [equippedItems, setEquippedItems] = useState<Record<string, AvatarItem>>({
    hat: INITIAL_AVATAR_ITEMS[0],
    glasses: INITIAL_AVATAR_ITEMS[3],
    suit: INITIAL_AVATAR_ITEMS[5],
    badge: INITIAL_AVATAR_ITEMS[7],
  });

  const [voiceSettings, setVoiceSettings] = useState<LeoVoiceSettings>({
    enabled: true,
    autoSpeak: true,
    rate: 0.96,
    pitch: 1.02,
    volume: 1.0,
    prosodyMode: 'humano',
    prosodicPauses: true,
    prosodicInflection: 0.12,
  });

  const [isExperiencesHubOpen, setIsExperiencesHubOpen] = useState(false);

  const [speaking, setSpeaking] = useState<boolean>(false);
  const [lastSpokenPhrase, setLastSpokenPhrase] = useState<string>(
    '13 de junio de 1954: el general Gustavo Rojas Pinilla inauguró la primera transmisión oficial de televisión en blanco y negro en Colombia desde el Palacio de San Carlos.'
  );

  // Active Era result
  const [currentResult, setCurrentResult] = useState<TimeTravelResult>({
    yearOrEra: '1954 - La Llegada de la Televisión a Colombia',
    title: 'El Día en que la Magia de la Pantalla Entró a los Hogares Colombianos',
    shortSummary:
      'El 13 de junio de 1954 se realizó la primera transmisión oficial de televisión nacional, conectando los estudios del Palacio de San Carlos con transmisores en el cerro de Manjui. Las familias bogotanas se reunían en vitrinas comerciales para ver este avance tecnológico histórico.',
    curiousFacts: [
      'Los primeros televisores eran muebles grandes con tubos al vacío traídos por barcos a través de Barranquilla y Buenaventura.',
      'La primera imagen transmitida fue el Himno Nacional interpretado por la Orquesta Sinfónica de Colombia.',
      'Como muy pocas casas tenían aparato receptor, la gente se aglomeraba frente a las vitrinas de almacenes en el centro de Bogotá para ver la señal.',
    ],
    howChildrenLived:
      'Los niños escribían en cuadernos cosidos con pluma y tinta china. Jugaban al trompo zumbador, la golosa en andenes de piedra y las carreras de carritos de balineras.',
    soundOrSensation:
      'El zumbido agudo del tubo de rayos catódicos al encender el televisor, sintonías radiales y el rodar de los trolebuses.',
    leoChallenge:
      '¿De qué manera la llegada de la televisión transformó la comunicación y la unión de las familias colombianas en comparación con la radio?',
    timeMachineCoordinates: {
      era: 'Años 50',
      temporalFlux: 'Estable 98.4%',
      dangerLevel: 'Aventura',
    },
    colombianContext: {
      decade: 'Años 50',
      region: 'Bogotá / Cundinamarca',
      socialTheme: 'Ciencia, Telecomunicaciones y Cultura Audiovisual',
    },
  });

  // Modals state
  const [isVoiceAssistantOpen, setIsVoiceAssistantOpen] = useState(false);
  const [isSiriLeoOpen, setIsSiriLeoOpen] = useState(false);
  const [isPassportOpen, setIsPassportOpen] = useState(false);
  const [isMissionsOpen, setIsMissionsOpen] = useState(false);
  const [isChallengeOpen, setIsChallengeOpen] = useState(false);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [isMinigamesOpen, setIsMinigamesOpen] = useState(false);
  const [isSteamInfoOpen, setIsSteamInfoOpen] = useState(false);
  const [isCompassOpen, setIsCompassOpen] = useState(false);
  const [isVoiceSettingsOpen, setIsVoiceSettingsOpen] = useState(false);

  // New Impressive Modals
  const [isTimeTunnelOpen, setIsTimeTunnelOpen] = useState(false);
  const [isNewspaperOpen, setIsNewspaperOpen] = useState(false);
  const [isMainMenuOpen, setIsMainMenuOpen] = useState(false);
  const [isConflictMapOpen, setIsConflictMapOpen] = useState(false);
  const [isPartyMode, setIsPartyMode] = useState(false);
  const [isLenguaCastellanaOpen, setIsLenguaCastellanaOpen] = useState(false);
  const [isTravelerRankingOpen, setIsTravelerRankingOpen] = useState(false);
  const [isHeroesGalleryOpen, setIsHeroesGalleryOpen] = useState(false);
  const [isHistoricCinemaOpen, setIsHistoricCinemaOpen] = useState(false);
  const [isSuggestionBoxOpen, setIsSuggestionBoxOpen] = useState(false);
  const [isStemKioskOpen, setIsStemKioskOpen] = useState(false);
  const [isMindMapOpen, setIsMindMapOpen] = useState(false);
  const [currentAchievementBadge, setCurrentAchievementBadge] = useState<AchievementBadge | null>(null);

  // Track open/close state transitions of all modals to trigger custom metallic click micro-interactions
  const activeModalKey = [
    isExperiencesHubOpen && 'hub',
    isVoiceAssistantOpen && 'voice-assistant',
    isSiriLeoOpen && 'siri-leo',
    isPassportOpen && 'passport',
    isMissionsOpen && 'missions',
    isChallengeOpen && 'challenge',
    isCustomizerOpen && 'customizer',
    isMinigamesOpen && 'minigames',
    isSteamInfoOpen && 'steam-info',
    isCompassOpen && 'compass',
    isVoiceSettingsOpen && 'voice-settings',
    isTimeTunnelOpen && 'time-tunnel',
    isNewspaperOpen && 'newspaper',
    isMainMenuOpen && 'main-menu',
    isConflictMapOpen && 'conflict-map',
    isStreakModalOpen && 'streak-modal',
    isLenguaCastellanaOpen && 'lengua-castellana',
    isTravelerRankingOpen && 'traveler-ranking',
    isHeroesGalleryOpen && 'heroes-gallery',
    isHistoricCinemaOpen && 'historic-cinema',
    isSuggestionBoxOpen && 'suggestion-box',
    isStemKioskOpen && 'stem-kiosk',
    isMindMapOpen && 'mind-map',
    isRegistrationOpen && 'student-registration',
  ]
    .filter(Boolean)
    .join(',');

  const prevActiveModalKeyRef = useRef<string>('');
  const isInitialModalMountRef = useRef<boolean>(true);

  useEffect(() => {
    if (isInitialModalMountRef.current) {
      isInitialModalMountRef.current = false;
      prevActiveModalKeyRef.current = activeModalKey;
      return;
    }

    const prev = prevActiveModalKeyRef.current;
    const current = activeModalKey;

    if (!prev && current) {
      // Transition from NO modal open to a modal open
      sounds.playModalOpen();
    } else if (prev && !current) {
      // Transition from a modal open to ALL modals closed
      sounds.playModalClose();
    } else if (prev && current && prev !== current) {
      // Transition directly from one modal to another (e.g. from Hub to Minigames)
      sounds.playModalOpen();
    }

    prevActiveModalKeyRef.current = current;
  }, [activeModalKey]);

  // Ref to homework helper bar
  const homeworkSectionRef = useRef<HTMLDivElement | null>(null);

  // Active challenge question
  const currentQuestion: TriviaQuestion =
    TRIVIA_QUESTIONS.find((q) => q.year === currentYear) || TRIVIA_QUESTIONS[0];

  // Speech synthesis helper using humanized neural voice engine
  const speakText = (text: string) => {
    if (!voiceSettings.enabled) return;
    leoVoice.speak(text, voiceSettings, {
      onStart: () => setSpeaking(true),
      onEnd: () => setSpeaking(false),
      onError: () => setSpeaking(false),
    });
  };

  const handleStopSpeech = () => {
    leoVoice.stop();
    setSpeaking(false);
  };

  // Automatically duck ambient historical soundscape when Leo is speaking
  useEffect(() => {
    decadeAmbience.setDucking(speaking);
  }, [speaking]);

  // Synchronize ambient soundscape with the active chronological year
  useEffect(() => {
    decadeAmbience.setYear(currentYear);
  }, [currentYear]);

  // Helper to check for Rank upgrades
  const checkRankUpgrade = (newJumps: number, newXp: number) => {
    const oldRank = getRankForPlayer(travelCount, xp).currentRank;
    const nextRankInfo = getRankForPlayer(newJumps, newXp).currentRank;

    if (nextRankInfo.level > oldRank.level) {
      sounds.playRankUp();
      triggerConfetti(0.5, 0.4);
    }
  };

  // Perform time jump to a given year
  const handleTravelToYear = async (year: number) => {
    // Stop any ongoing speech to avoid overlap
    leoVoice.stop();
    setSpeaking(false);
    setIsTraveling(true);
    setCurrentYear(year);
    sounds.playTimeWarp();

    // Increment travel count and XP
    setTravelCount((prevJumps) => {
      const updated = prevJumps + 1;
      localStorage.setItem('leo_travel_count', updated.toString());
      setXp((prevXp) => {
        const updatedXp = prevXp + 35;
        localStorage.setItem('leo_xp', updatedXp.toString());
        checkRankUpgrade(updated, updatedXp);
        return updatedXp;
      });
      return updated;
    });

    try {
      const resData = await fetchTimeTravel(year);
      setCurrentResult(resData);
      sounds.playCoin();
      triggerConfetti(0.5, 0.3);

        // Exploration Streak calculation & rewards (Daily time travel retention)
        const { updatedData: newStreakData, result: streakResult } = recordTravelForStreak(streakData);
        setStreakData(newStreakData);

        // Base travel reward (25 coins) multiplied by the streak multiplier + streak day bonus
        const baseTravelCoins = 25;
        const multipliedTravelReward = Math.round(baseTravelCoins * streakResult.multiplier);
        const totalTravelCoins = multipliedTravelReward + streakResult.bonusCoinsWon;
        setCoins((c) => c + totalTravelCoins);

        // If Day 5 milestone reached or badge unlocked, unlock in avatar closet
        if (streakResult.badgeUnlocked) {
          setAllItems((prev) =>
            prev.map((item) =>
              item.id === streakResult.badgeUnlocked ? { ...item, unlocked: true } : item
            )
          );
        }

        // Trigger streak fanfare / celebratory toast
        if (streakResult.advanced || streakResult.isMilestoneDay5) {
          setStreakToastResult(streakResult);
          if (streakResult.isMilestoneDay5) {
            sounds.playFanfare();
            sounds.playWheelJackpot();
            triggerConfetti(0.6, 0.4);
          } else {
            sounds.playStreak(streakResult.newStreak);
          }
        }

        // Add stamp to passport if not already present
        const yearStr = year.toString();
        setStamps((prev) => {
          if (prev.some((s) => s.year === yearStr)) return prev;
          const newStamp: TravelStamp = {
            id: `stamp-${yearStr}`,
            year: yearStr,
            title: resData.yearOrEra.split('-')[1]?.trim() || resData.yearOrEra,
            era: resData.colombianContext?.decade || 'Siglo XX',
            icon: '🇨🇴',
            region: resData.colombianContext?.region || 'Colombia',
            visitedAt: 'Reciente',
            description: resData.shortSummary,
          };
          return [newStamp, ...prev];
        });

        // Check if a mission was completed
        setMissions((prev) =>
          prev.map((m) => {
            if (!m.completed && m.targetYear === year) {
              sounds.playFanfare();
              triggerConfetti(0.5, 0.5);
              setCoins((c) => c + m.xpReward);
              setCurrentAchievementBadge({
                id: `mission-${m.id}`,
                title: `¡Misión Cumplida: ${m.title}!`,
                category: 'Misión Histórica STEAM+',
                description: `Investigaste con éxito el año ${m.targetYear} en la máquina del tiempo.`,
                icon: '🎖️',
                xpReward: m.xpReward,
                coinReward: 50,
              });
              return { ...m, completed: true };
            }
            return m;
          })
        );

        // Auto speak summary with Leo's voice immediately upon arrival
        const spoken = `¡Aterrizamos en el año ${year}! ${resData.title}. ${resData.shortSummary}`;
        setLastSpokenPhrase(spoken);
        if (voiceSettings.enabled) {
          setTimeout(() => {
            speakText(spoken);
          }, 200);
        }
    } catch (err) {
      console.error('Time travel error:', err);
    } finally {
      setIsTraveling(false);
    }
  };

  const handleAnswerChallengeCorrect = (rewardCoins: number) => {
    sounds.playCoin();
    sounds.playFanfare();
    triggerConfetti(0.5, 0.4);
    // Multiply coin reward by active exploration streak multiplier
    const multiplier = getMultiplierForStreak(streakData.currentStreak);
    const multipliedCoins = Math.round(rewardCoins * multiplier);
    setCoins((prev) => prev + multipliedCoins);
    setXp((prev) => {
      const updated = prev + 50;
      localStorage.setItem('leo_xp', updated.toString());
      checkRankUpgrade(travelCount, updated);
      return updated;
    });

    setCurrentAchievementBadge({
      id: `challenge-${currentYear}`,
      title: `¡Reto de la Época Superado (${currentYear})!`,
      category: 'Feria STEAM+ Ciencias Sociales',
      description: `Respondiste correctamente la pregunta de indagación sobre ${currentResult.title}.`,
      icon: '🏆',
      xpReward: 50,
      coinReward: multipliedCoins,
    });
  };

  const handleRewardStudent = (coinsWon: number, xpWon: number) => {
    // Multiply coin reward by active exploration streak multiplier
    const multiplier = getMultiplierForStreak(streakData.currentStreak);
    const multipliedCoins = Math.round(coinsWon * multiplier);
    setCoins((prev) => prev + multipliedCoins);
    setXp((prev) => {
      const updated = prev + xpWon;
      localStorage.setItem('leo_xp', updated.toString());
      checkRankUpgrade(travelCount, updated);
      return updated;
    });
  };

  // Exploration Streak Simulation Tools (for demonstration, testing & educators)
  const handleSimulateNextDay = () => {
    const currentDay = streakData.currentStreak;
    const nextDay = Math.min(5, currentDay + 1);
    const simulatedDate = getLocalTodayDateString();
    const updated: ExplorationStreakData = {
      ...streakData,
      currentStreak: nextDay,
      lastTravelDate: simulatedDate,
      hasTraveledToday: true,
      totalDaysTraveled: streakData.totalDaysTraveled + 1,
      totalStreaksAchieved:
        nextDay === 5
          ? streakData.totalStreaksAchieved + 1
          : streakData.totalStreaksAchieved,
      history: Array.from(new Set([...streakData.history, simulatedDate])),
    };
    saveExplorationStreak(updated);
    setStreakData(updated);

    const multiplier = getMultiplierForStreak(nextDay);
    const bonusCoins = STREAK_DAYS_CONFIG[nextDay - 1].bonusCoins;
    setCoins((c) => c + bonusCoins);

    if (nextDay === 5) {
      setAllItems((prev) =>
        prev.map((item) =>
          item.id === 'badge-streak-5' ? { ...item, unlocked: true } : item
        )
      );
      sounds.playFanfare();
      sounds.playWheelJackpot();
      triggerConfetti(0.6, 0.5);
      setStreakToastResult({
        advanced: true,
        alreadyTraveledToday: false,
        oldStreak: currentDay,
        newStreak: 5,
        multiplier: 2.0,
        bonusCoinsWon: 250,
        isMilestoneDay5: true,
        badgeUnlocked: 'badge-streak-5',
        message:
          '👑 ¡Alcanzaste el Día 5 de tu Racha! Multiplicador Legendario x2.0 activado en TODO y Emblema de Fuego desbloqueado en tu vestidor.',
      });
    } else {
      sounds.playStreak(nextDay);
      setStreakToastResult({
        advanced: true,
        alreadyTraveledToday: false,
        oldStreak: currentDay,
        newStreak: nextDay,
        multiplier,
        bonusCoinsWon: bonusCoins,
        isMilestoneDay5: false,
        message: `🔥 ¡Día ${nextDay} de Racha de Exploración! Multiplicador x${multiplier.toFixed(
          2
        )} activado (+${bonusCoins} monedas de bono diario).`,
      });
    }
  };

  const handleSimulateDay5 = () => {
    const simulatedDate = getLocalTodayDateString();
    const updated: ExplorationStreakData = {
      ...streakData,
      currentStreak: 5,
      lastTravelDate: simulatedDate,
      hasTraveledToday: true,
      totalDaysTraveled: Math.max(5, streakData.totalDaysTraveled + 1),
      totalStreaksAchieved: streakData.totalStreaksAchieved + 1,
      history: Array.from(new Set([...streakData.history, simulatedDate])),
    };
    saveExplorationStreak(updated);
    setStreakData(updated);

    setCoins((c) => c + 250);
    setAllItems((prev) =>
      prev.map((item) =>
        item.id === 'badge-streak-5' ? { ...item, unlocked: true } : item
      )
    );
    sounds.playFanfare();
    sounds.playWheelJackpot();
    triggerConfetti(0.7, 0.4);
    setStreakToastResult({
      advanced: true,
      alreadyTraveledToday: false,
      oldStreak: streakData.currentStreak,
      newStreak: 5,
      multiplier: 2.0,
      bonusCoinsWon: 250,
      isMilestoneDay5: true,
      badgeUnlocked: 'badge-streak-5',
      message:
        '👑 ¡Modo Crononauta Legendario 5 Días Activado! Multiplicador Máximo x2.0 en TODOS los viajes, trivias y retos escolares.',
    });
  };

  const handleResetStreak = () => {
    const updated: ExplorationStreakData = {
      currentStreak: 1,
      lastTravelDate: null,
      hasTraveledToday: false,
      totalDaysTraveled: streakData.totalDaysTraveled,
      totalStreaksAchieved: streakData.totalStreaksAchieved,
      history: streakData.history,
    };
    saveExplorationStreak(updated);
    setStreakData(updated);
  };

  const handleEquipItem = (item: AvatarItem) => {
    sounds.playPop();
    setEquippedItems((prev) => ({
      ...prev,
      [item.category]: item,
    }));
  };

  const handleUnlockItem = (item: AvatarItem) => {
    if (coins >= item.cost) {
      sounds.playCoin();
      sounds.playFanfare();
      triggerConfetti(0.5, 0.4);
      setCoins((c) => c - item.cost);
      setAllItems((prev) =>
        prev.map((i) => (i.id === item.id ? { ...i, unlocked: true } : i))
      );
      handleEquipItem({ ...item, unlocked: true });
    }
  };

  const scrollToHomework = () => {
    if (homeworkSectionRef.current) {
      homeworkSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleMainMenuNavigate = (destination: string) => {
    switch (destination) {
      case 'exploration-streak':
        setIsStreakModalOpen(true);
        break;
      case 'time-machine':
        window.scrollTo({ top: 120, behavior: 'smooth' });
        break;
      case 'conflict-map':
        setIsConflictMapOpen(true);
        break;
      case 'homework-helper':
        scrollToHomework();
        break;
      case 'vintage-newspaper':
        setIsNewspaperOpen(true);
        break;
      case 'customizer':
        setIsCustomizerOpen(true);
        break;
      case 'siri-leo':
        setIsSiriLeoOpen(true);
        break;
      case 'time-tunnel':
        setIsTimeTunnelOpen(true);
        break;
      case 'minigames':
        setIsMinigamesOpen(true);
        break;
      case 'passport':
        setIsPassportOpen(true);
        break;
      case 'missions':
        setIsMissionsOpen(true);
        break;
      case 'compass':
        setIsCompassOpen(true);
        break;
      case 'voice-settings':
        setIsVoiceSettingsOpen(true);
        break;
      case 'lengua-castellana':
        setIsLenguaCastellanaOpen(true);
        break;
      case 'traveler-ranking':
        setIsTravelerRankingOpen(true);
        break;
      case 'heroes-gallery':
        setIsHeroesGalleryOpen(true);
        break;
      case 'historic-cinema':
        setIsHistoricCinemaOpen(true);
        break;
      case 'suggestion-box':
        setIsSuggestionBoxOpen(true);
        break;
      case 'stem-kiosk':
        setIsStemKioskOpen(true);
        break;
      case 'mind-map':
        setIsMindMapOpen(true);
        break;
      case 'student-registration':
        setIsRegistrationOpen(true);
        break;
      default:
        break;
    }
  };

  const handleUserRegistered = (profile: CustomTravelerCharacter) => {
    sounds.playFanfare();
    sounds.playCoin();
    triggerConfetti(0.5, 0.4);

    // Starter bonus coins and XP for registering
    setCoins((c) => c + 50);
    setXp((x) => x + 25);

    // Welcome achievement celebration
    setCurrentAchievementBadge({
      id: 'welcome-stem-fair',
      title: '¡Registro Exitoso en la Máquina del Tiempo!',
      subtitle: `Bienvenido crononauta ${profile.name} (${profile.school}). ¡Tus datos ya están sincronizados en todo el sistema!`,
      icon: profile.avatarIcon || '🚀',
      xpReward: 25,
      category: 'STEM',
    });
  };

  return (
    <div className="min-h-screen bg-[#070d1c] text-slate-100 flex flex-col selection:bg-sky-500 selection:text-white relative overflow-x-hidden">
      {/* Interactive Background Quantum Particles & Warp Speed Stardust Canvas */}
      <QuantumStardustCanvas isTraveling={isTraveling} isPartyMode={isPartyMode} />

      {/* Secret Easter Egg Surprise: Quantum Supernova Party Overlay */}
      <QuantumPartyOverlay
        isActive={isPartyMode}
        onClose={() => setIsPartyMode(false)}
      />

      {/* Top Navigation */}
      <HeaderNavbar
        coins={coins}
        completedMissionsCount={missions.filter((m) => m.completed).length}
        totalMissionsCount={missions.length}
        stampsCount={stamps.length}
        voiceSettings={voiceSettings}
        travelCount={travelCount}
        xp={xp}
        streakData={streakData}
        onOpenStreakModal={() => setIsStreakModalOpen(true)}
        onToggleVoice={() =>
          setVoiceSettings((v) => ({ ...v, enabled: !v.enabled }))
        }
        onOpenMainMenu={() => setIsMainMenuOpen(true)}
        onOpenConflictMap={() => setIsConflictMapOpen(true)}
        onOpenPassport={() => setIsPassportOpen(true)}
        onOpenMissions={() => setIsMissionsOpen(true)}
        onOpenSteamInfo={() => setIsSteamInfoOpen(true)}
        onOpenCustomizer={() => setIsCustomizerOpen(true)}
        onOpenCompass={() => setIsCompassOpen(true)}
        onOpenMinigames={() => setIsMinigamesOpen(true)}
        onOpenVoiceSettings={() => setIsVoiceSettingsOpen(true)}
        onOpenSiriLeo={() => setIsSiriLeoOpen(true)}
        onOpenNewspaper={() => setIsNewspaperOpen(true)}
        onOpenTimeTunnel={() => setIsTimeTunnelOpen(true)}
        onScrollToHomework={scrollToHomework}
        onOpenLenguaCastellana={() => setIsLenguaCastellanaOpen(true)}
        onOpenTravelerRanking={() => setIsTravelerRankingOpen(true)}
        onOpenHeroesGallery={() => setIsHeroesGalleryOpen(true)}
        onOpenHistoricCinema={() => setIsHistoricCinemaOpen(true)}
        onOpenSuggestionBox={() => setIsSuggestionBoxOpen(true)}
        onOpenMindMap={() => setIsMindMapOpen(true)}
        onOpenStemKiosk={() => setIsStemKioskOpen(true)}
        onOpenRegistration={() => setIsRegistrationOpen(true)}
      />

      {/* Main Interactive Stage */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 py-4 sm:py-6 space-y-6">
        {/* LEO LIVE QUANTUM VOICE COMMAND HUD */}
        <QuantumVoiceHUD
          onTravelToYear={handleTravelToYear}
          onOpenConflictMap={() => setIsConflictMapOpen(true)}
          onOpenTimeTunnel={() => setIsTimeTunnelOpen(true)}
          onOpenNewspaper={() => setIsNewspaperOpen(true)}
          onOpenMinigames={() => setIsMinigamesOpen(true)}
          onOpenCustomizer={() => setIsCustomizerOpen(true)}
          onOpenPassport={() => setIsPassportOpen(true)}
          onOpenMissions={() => setIsMissionsOpen(true)}
          onOpenStreakModal={() => setIsStreakModalOpen(true)}
          onOpenOyeLeoModal={() => setIsSiriLeoOpen(true)}
          onSpeakText={speakText}
          onStopSpeech={handleStopSpeech}
          speaking={speaking}
          onTriggerPartyMode={() => setIsPartyMode(true)}
          isPartyMode={isPartyMode}
          currentEraText={currentResult.yearOrEra}
        />

        {/* Child-friendly Quick Access Hero Banner with High-Tech Actions */}
        <div className="bg-gradient-to-r from-sky-900/40 via-purple-900/40 to-amber-900/40 border border-sky-400/30 rounded-3xl p-3.5 sm:p-4 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-400 to-amber-400 flex items-center justify-center text-xl shadow-md">
              ✨
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-white flex items-center gap-1.5">
                <span>Laboratorio Interactivo STEAM+ de Colombia</span>
                <span className="text-[10px] bg-sky-500/25 text-sky-300 border border-sky-400/40 px-2 py-0.5 rounded-full uppercase">
                  Siglo XX
                </span>
              </h2>
              <p className="text-xs text-slate-300">
                ¡Viste a Leo en 2D, despega en el Túnel Cuántico 3D, imprime el periódico histórico o consúltale tus tareas!
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            {/* Exploration Streak Button */}
            <button
              onClick={() => {
                sounds.playClick();
                setIsStreakModalOpen(true);
              }}
              className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-400 text-slate-950 text-xs font-black px-3.5 py-2 rounded-2xl shadow-lg hover:scale-105 transition-all flex items-center justify-center gap-1.5 shadow-[0_0_15px_rgba(245,158,11,0.35)]"
              title="Ver tu Racha de Exploración de 5 Días y Multiplicadores de Monedas"
            >
              <Flame className="w-4 h-4 text-slate-950 fill-slate-950 animate-pulse" />
              <span>Racha: Día {streakData.currentStreak}/5 ({getMultiplierLabelForStreak(streakData.currentStreak)})</span>
            </button>

            {/* Conflict & Peace Map Button */}
            <button
              onClick={() => {
                sounds.playClick();
                setIsConflictMapOpen(true);
              }}
              className="bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white text-xs font-bold px-3 py-2 rounded-2xl shadow-lg hover:scale-105 transition-all flex items-center justify-center gap-1.5 shadow-[0_0_15px_rgba(244,63,94,0.3)]"
              title="Explorar el Mapa Histórico del Conflicto y Cátedra de Paz"
            >
              <ShieldAlert className="w-4 h-4 text-rose-200 animate-pulse" />
              <span>Mapa Conflicto & Paz</span>
            </button>

            {/* 3D Quantum Tunnel Button */}
            <button
              onClick={() => {
                sounds.playHyperDrive();
                setIsTimeTunnelOpen(true);
              }}
              className="bg-gradient-to-r from-cyan-500 to-sky-600 hover:from-cyan-400 hover:to-sky-500 text-white text-xs font-bold px-3 py-2 rounded-2xl shadow-lg hover:scale-105 transition-all flex items-center justify-center gap-1.5 shadow-[0_0_15px_rgba(6,182,212,0.3)]"
              title="Despegar en el simulador de Túnel Cuántico 3D"
            >
              <Zap className="w-4 h-4 text-cyan-200 animate-pulse" />
              <span>Túnel 3D</span>
            </button>

            {/* Historic Newspaper Generator Button */}
            <button
              onClick={() => {
                sounds.playTypewriter();
                setIsNewspaperOpen(true);
              }}
              className="bg-[#2d241c] hover:bg-[#43362a] border border-[#a89578] text-[#f7f3ea] text-xs font-bold px-3 py-2 rounded-2xl shadow-lg hover:scale-105 transition-all flex items-center justify-center gap-1.5"
              title="Generar e imprimir el periódico histórico de la época"
            >
              <Newspaper className="w-4 h-4 text-amber-300" />
              <span>Periódico</span>
            </button>

            {/* Character Customizer Button */}
            <button
              onClick={() => {
                sounds.playClick();
                setIsCustomizerOpen(true);
              }}
              className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black text-xs font-bold px-3 py-2 rounded-2xl shadow-lg hover:scale-105 transition-all flex items-center justify-center gap-1.5"
            >
              <Shirt className="w-4 h-4" />
              <span>Vestidor 2D</span>
            </button>

            {/* Factor Sorpresa STEM Kiosk Button */}
            <button
              onClick={() => {
                sounds.playFanfare();
                setIsStemKioskOpen(true);
              }}
              className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 hover:from-amber-400 hover:to-orange-400 text-black text-xs font-black px-3.5 py-2 rounded-2xl shadow-lg hover:scale-105 transition-all flex items-center justify-center gap-1.5 shadow-[0_0_15px_rgba(245,158,11,0.4)] animate-pulse cursor-pointer"
              title="Factor Sorpresa: Generador de Diploma Souvenir para Jurados y Ficha Técnica STEM"
            >
              <Award className="w-4 h-4 fill-black" />
              <span>🏆 Modo Jurados</span>
            </button>

            {/* Buzón de Sugerencias Button */}
            <button
              onClick={() => {
                sounds.playClick();
                setIsSuggestionBoxOpen(true);
              }}
              className="bg-gradient-to-r from-amber-600/30 to-yellow-600/30 hover:from-amber-600/50 hover:to-yellow-600/50 border border-amber-400/50 text-amber-200 text-xs font-bold px-3 py-2 rounded-2xl shadow-lg hover:scale-105 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              title="Buzón de Sugerencias y Votaciones de la Feria"
            >
              <Mail className="w-4 h-4 text-amber-400" />
              <span>Buzón STEM</span>
            </button>

            {/* Mapa Mental Cuántico Button */}
            <button
              onClick={() => {
                sounds.playClick();
                setIsMindMapOpen(true);
              }}
              className="bg-gradient-to-r from-cyan-600/30 to-blue-600/30 hover:from-cyan-600/50 hover:to-blue-600/50 border border-cyan-400/50 text-cyan-200 text-xs font-bold px-3 py-2 rounded-2xl shadow-lg hover:scale-105 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              title="Ver el Mapa Mental Cuántico del Siglo XX"
            >
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>Mapa Mental</span>
            </button>

            {/* Siri / Alexa Voice Assistant Button */}
            <button
              onClick={() => {
                sounds.playSiriWake();
                setIsSiriLeoOpen(true);
              }}
              className="bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white text-xs font-bold px-3.5 py-2 rounded-2xl shadow-lg hover:scale-105 transition-all flex items-center justify-center gap-1.5 shadow-[0_0_15px_rgba(6,182,212,0.3)] animate-pulse"
            >
              <Mic className="w-4 h-4 text-cyan-300" />
              <span>Alexa/Siri Leo</span>
            </button>
          </div>
        </div>

        {/* Institutional School STEM Banner */}
        <div className="bg-gradient-to-r from-amber-500/15 via-sky-600/20 to-indigo-600/20 border-2 border-amber-400/40 rounded-3xl p-3.5 sm:p-4 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-400 to-sky-400 p-0.5 shrink-0 flex items-center justify-center text-xl shadow-md">
              🏫
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] uppercase font-black tracking-widest text-amber-300 bg-amber-500/20 px-2 py-0.5 rounded-full border border-amber-400/40">
                  Proyecto Oficial Feria STEM
                </span>
                <span className="text-xs font-black text-white">
                  Colegio Niño Jesús De Praga
                </span>
              </div>
              <p className="text-xs text-sky-200">
                "Leo en el Tiempo: Exploración Científica y Social del Siglo XX Colombiano" • Ciencias Sociales, Tecnología & Cátedra de Paz
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              sounds.playClick();
              setIsSteamInfoOpen(true);
            }}
            className="px-3.5 py-1.5 rounded-xl bg-amber-400/20 hover:bg-amber-400/30 text-amber-300 border border-amber-400/40 text-xs font-black transition-all hover:scale-105 active:scale-95 shrink-0 cursor-pointer"
          >
            Ver Ejes STEM
          </button>
        </div>

        {/* Upper Hero Grid: Leo the Explorer (with Rank & Intensity) + Time Machine Console */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Leo 2D Character Avatar, Rank Badge & Intensity Gauge */}
          <div className="lg:col-span-4 bg-[#0e1934] border border-sky-500/30 rounded-3xl p-5 shadow-2xl flex flex-col items-center">
            <LeoCharacter
              currentEraText={currentResult.yearOrEra}
              isTraveling={isTraveling}
              speaking={speaking}
              lastSpokenPhrase={lastSpokenPhrase}
              onOpenVoiceAssistant={() => setIsSiriLeoOpen(true)}
              onOpenCustomizer={() => setIsCustomizerOpen(true)}
              onReplaySpeech={() => speakText(lastSpokenPhrase)}
              onStopSpeech={handleStopSpeech}
              equippedItems={equippedItems}
              travelCount={travelCount}
              xp={xp}
              isPartyMode={isPartyMode}
            />
          </div>

          {/* Right Column: Interactive Time Machine */}
          <div className="lg:col-span-8">
            <TimeMachine
              currentYear={currentYear}
              isTraveling={isTraveling}
              onTravelToYear={handleTravelToYear}
              presetEras={PRESET_ERAS}
              streakDay={streakData.currentStreak}
              streakMultiplierLabel={getMultiplierLabelForStreak(streakData.currentStreak)}
              onOpenStreakModal={() => setIsStreakModalOpen(true)}
              onOpenTimeTunnel={() => setIsTimeTunnelOpen(true)}
              onOpenNewspaper={() => setIsNewspaperOpen(true)}
            />
          </div>
        </div>

        {/* DEDICATED SCHOOL HOMEWORK HELPER BAR (Requested by user) */}
        <section ref={homeworkSectionRef}>
          <HomeworkHelperBar
            currentYear={currentYear}
            eraContext={currentResult.yearOrEra}
            onSpeakText={speakText}
            onRewardStudent={handleRewardStudent}
          />
        </section>

        {/* Middle Section: Educational Results */}
        <section>
          <EducationalResults
            result={currentResult}
            onSpeakText={speakText}
            onOpenChallenge={() => setIsChallengeOpen(true)}
            onOpenMindMap={() => setIsMindMapOpen(true)}
          />
        </section>

        {/* Bottom Section: Colombian 20th Century Interactive Timeline */}
        <section>
          <ColombianTimelinePanel
            presetEras={PRESET_ERAS}
            currentYear={currentYear}
            onSelectEra={handleTravelToYear}
          />
        </section>
      </main>

      {/* Floating Bottom-Right Master HUB Trigger Button (Requested by User) */}
      <div className="fixed bottom-5 right-5 z-40 flex items-center">
        <button
          onClick={() => {
            sounds.playClick();
            sounds.playFanfare();
            setIsExperiencesHubOpen(true);
          }}
          className="relative group p-3 sm:px-5 sm:py-3.5 rounded-2xl sm:rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 hover:from-purple-500 hover:to-amber-400 text-white font-extrabold text-sm shadow-[0_0_30px_rgba(236,72,153,0.55)] border-2 border-amber-300 transition-all hover:scale-110 active:scale-95 flex items-center gap-2.5"
          title="Abrir Centro de Juegos, Minijuegos y Todas las Experiencias"
        >
          <div className="relative">
            <Gamepad2 className="w-6 h-6 text-white group-hover:rotate-12 transition-transform" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-300 animate-ping" />
          </div>
          <div className="flex flex-col text-left">
            <span className="hidden sm:inline font-black tracking-wide text-xs sm:text-sm text-yellow-100 uppercase">
              Juegos & Funciones
            </span>
            <span className="hidden sm:inline text-[10px] text-amber-200 font-normal">
              Arcade • 3D • Mapa • Vestidor
            </span>
          </div>
          <span className="flex sm:hidden font-bold text-xs">Juegos</span>
        </button>
      </div>

      {/* Experiences & Games Hub Modal */}
      <ExperiencesHubModal
        isOpen={isExperiencesHubOpen}
        onClose={() => setIsExperiencesHubOpen(false)}
        onNavigate={handleMainMenuNavigate}
        coins={coins}
        streakDay={streakData.currentStreak}
        multiplierLabel={getMultiplierLabelForStreak(streakData.currentStreak)}
      />

      {/* Modals */}
      <OyeLeoWakeModal
        isOpen={isSiriLeoOpen}
        onClose={() => setIsSiriLeoOpen(false)}
        onTravelToYear={handleTravelToYear}
        onOpenConflictMap={() => setIsConflictMapOpen(true)}
        onOpenTimeTunnel={() => setIsTimeTunnelOpen(true)}
        onOpenNewspaper={() => setIsNewspaperOpen(true)}
        onOpenMinigames={() => setIsMinigamesOpen(true)}
        onOpenCustomizer={() => setIsCustomizerOpen(true)}
        onOpenPassport={() => setIsPassportOpen(true)}
        onOpenMissions={() => setIsMissionsOpen(true)}
        onOpenStreakModal={() => setIsStreakModalOpen(true)}
        onTriggerPartyMode={() => setIsPartyMode(true)}
        voiceSettings={voiceSettings}
        currentYear={currentYear}
        currentEraText={currentResult.yearOrEra}
        equippedItems={equippedItems}
      />

      <LeoVoiceAssistant
        isOpen={isVoiceAssistantOpen}
        onClose={() => setIsVoiceAssistantOpen(false)}
        currentEraText={currentResult.yearOrEra}
        onSpeakText={speakText}
        voiceSettings={voiceSettings}
      />

      <CharacterCustomizerModal
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
        coins={coins}
        allItems={allItems}
        equippedItems={equippedItems}
        onEquipItem={handleEquipItem}
        onUnlockItem={handleUnlockItem}
        travelCount={travelCount}
        xp={xp}
      />

      <TimePassportModal
        isOpen={isPassportOpen}
        onClose={() => setIsPassportOpen(false)}
        stamps={stamps}
        onSelectYear={handleTravelToYear}
      />

      <EraChallengeModal
        isOpen={isChallengeOpen}
        onClose={() => setIsChallengeOpen(false)}
        question={currentQuestion}
        onAnswerCorrect={handleAnswerChallengeCorrect}
      />

      <DailyMissionsModal
        isOpen={isMissionsOpen}
        onClose={() => setIsMissionsOpen(false)}
        missions={missions}
        onSelectMissionTarget={handleTravelToYear}
      />

      <MinigamesModal
        isOpen={isMinigamesOpen}
        onClose={() => setIsMinigamesOpen(false)}
        onRewardCoins={(amount) => {
          const multiplier = getMultiplierForStreak(streakData.currentStreak);
          const multiplied = Math.round(amount * multiplier);
          setCoins((c) => c + multiplied);
        }}
      />

      <SteamInfoModal
        isOpen={isSteamInfoOpen}
        onClose={() => setIsSteamInfoOpen(false)}
      />

      <CompassModal
        isOpen={isCompassOpen}
        onClose={() => setIsCompassOpen(false)}
        onSelectRegionEra={handleTravelToYear}
      />

      <VoiceSettingsModal
        isOpen={isVoiceSettingsOpen}
        onClose={() => setIsVoiceSettingsOpen(false)}
        settings={voiceSettings}
        onUpdateSettings={(newSettings) =>
          setVoiceSettings((s) => ({ ...s, ...newSettings }))
        }
        onTestVoice={() =>
          speakText(
            '¡Hola explorador! Soy Leo, tu copiloto en la máquina del tiempo. ¿Sabías que en el siglo veinte Colombia transformó su historia para siempre? Con la llegada de la televisión, las familias se reunían maravilladas en las calles.'
          )
        }
      />

      {/* Exploration Streak 5-Day Modal (Retention & Multipliers) */}
      <ExplorationStreakModal
        isOpen={isStreakModalOpen}
        onClose={() => setIsStreakModalOpen(false)}
        streakData={streakData}
        onSimulateNextDay={handleSimulateNextDay}
        onSimulateDay5={handleSimulateDay5}
        onResetStreak={handleResetStreak}
        onJumpToTimeMachine={() => {
          window.scrollTo({ top: 140, behavior: 'smooth' });
        }}
      />

      {/* Celebration Toast upon Day completion or Day 5 Milestone */}
      <StreakCelebrationToast
        streakResult={streakToastResult}
        onDismiss={() => setStreakToastResult(null)}
      />

      {/* Impressive Feature A: 3D Quantum Time Tunnel Simulator */}
      <QuantumTimeTunnelModal
        isOpen={isTimeTunnelOpen}
        onClose={() => setIsTimeTunnelOpen(false)}
        targetYear={currentYear}
        targetEraTitle={currentResult.title}
        onArrivalComplete={(year) => handleTravelToYear(year)}
      />

      {/* Impressive Feature B: Printable Vintage Colombian Newspaper Generator */}
      <VintageNewspaperModal
        isOpen={isNewspaperOpen}
        onClose={() => setIsNewspaperOpen(false)}
        result={currentResult}
        equippedItems={equippedItems}
        currentYear={currentYear}
      />

      {/* Main Navigation Drawer (Voz, Sonido & Configuraciones) */}
      <MainMenuDrawer
        isOpen={isMainMenuOpen}
        onClose={() => setIsMainMenuOpen(false)}
        travelCount={travelCount}
        xp={xp}
        coins={coins}
        voiceSettings={voiceSettings}
        onUpdateVoiceSettings={(newSettings) =>
          setVoiceSettings((s) => ({ ...s, ...newSettings }))
        }
        onNavigateTo={handleMainMenuNavigate}
        onOpenHub={() => setIsExperiencesHubOpen(true)}
      />

      {/* Historical Colombian Conflict & Peace Map */}
      <ConflictMapModal
        isOpen={isConflictMapOpen}
        onClose={() => setIsConflictMapOpen(false)}
        onSpeakText={speakText}
        onTravelToYear={handleTravelToYear}
      />

      {/* Salón de Lengua Castellana & Literatura Colombiana del Siglo XX */}
      <LenguaCastellanaModal
        isOpen={isLenguaCastellanaOpen}
        onClose={() => setIsLenguaCastellanaOpen(false)}
        onSpeakText={speakText}
        onTravelToYear={handleTravelToYear}
        onEarnCoins={(amount) => {
          const multiplier = getMultiplierForStreak(streakData.currentStreak);
          const multiplied = Math.round(amount * multiplier);
          setCoins((c) => c + multiplied);
        }}
        onEarnXp={(amount) => {
          setXp((prev) => {
            const updated = prev + amount;
            localStorage.setItem('leo_xp', updated.toString());
            checkRankUpgrade(travelCount, updated);
            return updated;
          });
        }}
        voiceSettings={voiceSettings}
        currentYear={currentYear}
        onTriggerAchievement={(badge) => setCurrentAchievementBadge(badge)}
      />

      {/* Real-Time Traveler Ranking Modal */}
      <TravelerRankingModal
        isOpen={isTravelerRankingOpen}
        onClose={() => setIsTravelerRankingOpen(false)}
        currentUserJumps={travelCount}
        currentUserXp={xp}
        currentUserStreak={streakData.currentStreak}
        currentEraText={currentResult.yearOrEra}
        onEarnCoins={(amount) => {
          const multiplier = getMultiplierForStreak(streakData.currentStreak);
          const multiplied = Math.round(amount * multiplier);
          setCoins((c) => c + multiplied);
        }}
        onEarnXp={(amount) => {
          setXp((prev) => {
            const updated = prev + amount;
            localStorage.setItem('leo_xp', updated.toString());
            checkRankUpgrade(travelCount, updated);
            return updated;
          });
        }}
      />

      {/* Galería de Héroes del Siglo XX (Retratos IA & Líneas de Tiempo) */}
      <HeroesGalleryModal
        isOpen={isHeroesGalleryOpen}
        onClose={() => setIsHeroesGalleryOpen(false)}
        onEarnXp={(amount) => {
          setXp((prev) => {
            const updated = prev + amount;
            localStorage.setItem('leo_xp', updated.toString());
            checkRankUpgrade(travelCount, updated);
            return updated;
          });
        }}
        onEarnCoins={(amount) => {
          const multiplier = getMultiplierForStreak(streakData.currentStreak);
          const multiplied = Math.round(amount * multiplier);
          setCoins((c) => c + multiplied);
        }}
        voiceSettings={voiceSettings}
        speakText={speakText}
        onStopSpeech={handleStopSpeech}
        speaking={speaking}
      />

      {/* Sala de Cine Histórico (Documentales & Videos del Siglo XX) */}
      <HistoricCinemaModal
        isOpen={isHistoricCinemaOpen}
        onClose={() => setIsHistoricCinemaOpen(false)}
        onEarnXp={(amount) => {
          setXp((prev) => {
            const updated = prev + amount;
            localStorage.setItem('leo_xp', updated.toString());
            checkRankUpgrade(travelCount, updated);
            return updated;
          });
        }}
        onEarnCoins={(amount) => {
          const multiplier = getMultiplierForStreak(streakData.currentStreak);
          const multiplied = Math.round(amount * multiplier);
          setCoins((c) => c + multiplied);
        }}
      />

      {/* Buzón de Sugerencias para la Feria STEM del Colegio Niño Jesús De Praga */}
      <SuggestionBoxModal
        isOpen={isSuggestionBoxOpen}
        onClose={() => setIsSuggestionBoxOpen(false)}
        onEarnXp={(amount) => {
          setXp((prev) => {
            const updated = prev + amount;
            localStorage.setItem('leo_xp', updated.toString());
            checkRankUpgrade(travelCount, updated);
            return updated;
          });
        }}
        onEarnCoins={(amount) => {
          const multiplier = getMultiplierForStreak(streakData.currentStreak);
          const multiplied = Math.round(amount * multiplier);
          setCoins((c) => c + multiplied);
        }}
      />

      {/* Factor Sorpresa: Modo Stand de Exposición STEM & Diploma para Jurados */}
      <StemFairKioskModal
        isOpen={isStemKioskOpen}
        onClose={() => setIsStemKioskOpen(false)}
        currentYear={currentYear}
        xp={xp}
      />

      {/* Mapa Mental Cuántico de Colombia en el Siglo XX */}
      <QuantumMindMapModal
        isOpen={isMindMapOpen}
        onClose={() => setIsMindMapOpen(false)}
        onTravelToYear={handleTravelToYear}
        onSpeakText={speakText}
      />

      {/* Visual Achievement Badge Celebration Toast (Confetti, Fanfare & Badge Popup) */}
      <AchievementBadgeCelebrationToast
        achievement={currentAchievementBadge}
        onDismiss={() => setCurrentAchievementBadge(null)}
      />

      {/* Student & Visitor Onboarding Registration Modal */}
      <StudentRegistrationModal
        isOpen={isRegistrationOpen}
        onClose={() => setIsRegistrationOpen(false)}
        onRegistered={handleUserRegistered}
        currentTravelCount={travelCount}
        currentXp={xp}
        currentStreak={streakData.currentStreak}
        currentEraText={currentResult.yearOrEra}
      />

      {/* Footer & Developers Recognition */}
      <footer className="border-t border-sky-500/20 bg-[#070d1a] py-6 px-4 text-center text-xs text-slate-400 space-y-3">
        <p className="font-semibold text-slate-300">
          🇨🇴 <strong>Leo en el Tiempo</strong> • Proyecto Oficial para la <strong>Feria STEM del Colegio Niño Jesús De Praga</strong> (Colombia Siglo XX: 1900 - 1999 • Ciencias Sociales & STEM)
        </p>

        {/* Quick Footer Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
          <button
            onClick={() => {
              sounds.playClick();
              setIsSuggestionBoxOpen(true);
            }}
            className="px-3 py-1.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-400/30 text-xs font-bold transition-all hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-1.5"
          >
            <span>📬 Buzón de Sugerencias de la Feria</span>
          </button>

          <button
            onClick={() => {
              sounds.playFanfare();
              setIsStemKioskOpen(true);
            }}
            className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500/20 to-orange-500/20 hover:from-amber-500/35 hover:to-orange-500/35 text-amber-200 border border-amber-400/40 text-xs font-bold transition-all hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-1.5"
          >
            <span>🏆 Ficha Técnica para Jurados & Diploma Souvenir</span>
          </button>

          <button
            onClick={() => {
              sounds.playClick();
              setIsMindMapOpen(true);
            }}
            className="px-3 py-1.5 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-300 border border-cyan-400/30 text-xs font-bold transition-all hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-1.5"
          >
            <span>🧠 Mapa Mental Cuántico</span>
          </button>
        </div>

        <div className="max-w-4xl mx-auto pt-2 border-t border-slate-800/80">
          <span className="text-[11px] uppercase tracking-wider font-bold text-amber-400 block mb-2">
            Desarrolladores & Creadores del Proyecto:
          </span>
          <div className="flex flex-wrap justify-center items-center gap-2 text-xs">
            <span className="bg-gradient-to-r from-amber-500/30 to-orange-500/20 border-2 border-amber-400 text-amber-200 px-3.5 py-1.5 rounded-full font-black shadow-md flex items-center gap-1.5">
              <span>👑 ANGEL DAVID DE LA BARRERA LÓPEZ</span>
              <span className="text-[10px] uppercase font-bold bg-amber-400 text-black px-1.5 py-0.2 rounded-md">Director de Desarrollo</span>
            </span>
            <span className="bg-[#0f1b36] border border-sky-400/40 text-sky-200 px-3 py-1 rounded-full font-bold shadow-xs">
              👨‍💻 JUAN CAMILO MANGONES MIRANDA (Desarrollador)
            </span>
            <span className="bg-[#0f1b36] border border-indigo-400/40 text-indigo-200 px-3 py-1 rounded-full font-bold shadow-xs">
              👨‍💻 GABRIEL DAVID DÍAS BALLESTEROS (Desarrollador)
            </span>
            <span className="bg-[#0f1b36] border border-emerald-400/40 text-emerald-200 px-3 py-1 rounded-full font-bold shadow-xs">
              👨‍💻 JESSY ALDAIR LUGO SOTO (Desarrollador)
            </span>
            <span className="bg-[#0f1b36] border border-purple-400/40 text-purple-200 px-3 py-1 rounded-full font-bold shadow-xs">
              👨‍💻 JULIAN JAVIER RODRÍGUEZ VARGAS (Desarrollador)
            </span>
          </div>
        </div>
      </footer>

      {/* Global Floating Immediate Leo Speech Stop Controller */}
      {speaking && (
        <aside
          aria-label="Control de voz activa de Leo"
          className="fixed bottom-6 sm:bottom-8 right-4 sm:right-8 z-50 animate-bounce flex items-center gap-3 bg-gradient-to-r from-rose-600 via-red-600 to-amber-600 text-white px-4 py-2.5 rounded-full shadow-[0_0_35px_rgba(239,68,68,0.9)] border-2 border-amber-300 font-bold text-xs sm:text-sm select-none"
        >
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping" />
            <Volume2 className="w-4 h-4 animate-spin-slow text-amber-200" />
            <span className="font-extrabold tracking-wide hidden sm:inline">Leo está hablando...</span>
          </div>
          <button
            onClick={() => {
              sounds.playClick();
              handleStopSpeech();
            }}
            className="bg-black/75 hover:bg-black text-amber-300 hover:text-white px-3.5 py-1.5 rounded-full text-xs font-black flex items-center gap-1.5 border border-amber-400/70 transition-all cursor-pointer shadow-md hover:scale-105 active:scale-95"
            title="Detener inmediatamente la voz de Leo sin esperar a que termine"
          >
            <Square className="w-3.5 h-3.5 fill-current text-rose-400" />
            <span>⏹️ Silenciar a Leo</span>
          </button>
        </aside>
      )}
    </div>
  );
}

export default App;
