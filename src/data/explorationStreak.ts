// Exploration Streak System for "Leo en el Tiempo"
// Daily Time Travel Streak for 5 consecutive days with expanding coin multipliers (x1.0 -> x2.0)

export interface StreakDayConfig {
  day: number; // 1 to 5
  label: string;
  multiplier: number;
  multiplierLabel: string;
  bonusCoins: number;
  title: string;
  subtitle: string;
  icon: string;
  badgeUnlock?: string;
  color: string;
  glowColor: string;
}

export const STREAK_DAYS_CONFIG: StreakDayConfig[] = [
  {
    day: 1,
    label: 'Día 1',
    multiplier: 1.0,
    multiplierLabel: 'x1.0',
    bonusCoins: 30,
    title: 'Comienzo de la Travesía',
    subtitle: '¡Primer salto del día! Multiplicador base x1.0 activo.',
    icon: '🌱',
    color: 'from-emerald-500 to-teal-600',
    glowColor: 'rgba(16, 185, 129, 0.4)',
  },
  {
    day: 2,
    label: 'Día 2',
    multiplier: 1.25,
    multiplierLabel: 'x1.25',
    bonusCoins: 50,
    title: 'Impulso Cronológico',
    subtitle: '¡2 días seguidos explorando! +25% de monedas en todos tus viajes y trivias.',
    icon: '⚡',
    color: 'from-cyan-500 to-blue-600',
    glowColor: 'rgba(6, 182, 212, 0.4)',
  },
  {
    day: 3,
    label: 'Día 3',
    multiplier: 1.5,
    multiplierLabel: 'x1.50',
    bonusCoins: 75,
    title: 'Sintonía Temporal',
    subtitle: '¡3 días consecutivos! +50% de monedas cuánticas multiplicadas.',
    icon: '🔥',
    color: 'from-amber-500 to-orange-600',
    glowColor: 'rgba(245, 158, 11, 0.4)',
  },
  {
    day: 4,
    label: 'Día 4',
    multiplier: 1.75,
    multiplierLabel: 'x1.75',
    bonusCoins: 100,
    title: 'Explorador Cuántico',
    subtitle: '¡4 días seguidos! +75% de monedas. ¡Estás a 1 día de la recompensa legendaria!',
    icon: '🚀',
    color: 'from-purple-500 to-indigo-600',
    glowColor: 'rgba(168, 85, 247, 0.4)',
  },
  {
    day: 5,
    label: 'Día 5+',
    multiplier: 2.0,
    multiplierLabel: 'x2.0 (DOBLE)',
    bonusCoins: 250,
    title: 'Crononauta Legendario',
    subtitle: '¡MÁXIMA RACHA DE 5 DÍAS! ¡DOBLE DE MONEDAS x2.0 en TODO + Emblema Legendario!',
    icon: '👑',
    badgeUnlock: 'badge-streak-5',
    color: 'from-amber-400 via-rose-500 to-yellow-400',
    glowColor: 'rgba(236, 72, 153, 0.6)',
  },
];

export interface ExplorationStreakData {
  currentStreak: number; // 0, 1, 2, 3, 4, 5+
  lastTravelDate: string | null; // Format "YYYY-MM-DD" in local time
  hasTraveledToday: boolean;
  totalDaysTraveled: number;
  totalStreaksAchieved: number; // times completed 5-day cycle
  history: string[]; // list of dates
}

export function getLocalTodayDateString(offsetDays: number = 0): string {
  const d = new Date();
  if (offsetDays !== 0) {
    d.setDate(d.getDate() + offsetDays);
  }
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function getMultiplierForStreak(streak: number): number {
  if (streak <= 0) return 1.0;
  if (streak === 1) return 1.0;
  if (streak === 2) return 1.25;
  if (streak === 3) return 1.5;
  if (streak === 4) return 1.75;
  return 2.0; // 5 or higher
}

export function getMultiplierLabelForStreak(streak: number): string {
  if (streak <= 0) return 'x1.0';
  if (streak === 1) return 'x1.0';
  if (streak === 2) return 'x1.25';
  if (streak === 3) return 'x1.50';
  if (streak === 4) return 'x1.75';
  return 'x2.0';
}

export function getStreakDayConfig(day: number): StreakDayConfig {
  const clampedDay = Math.max(1, Math.min(5, day));
  return STREAK_DAYS_CONFIG[clampedDay - 1];
}

const STORAGE_KEY = 'leo_exploration_streak_v2';

export function loadExplorationStreak(): ExplorationStreakData {
  const today = getLocalTodayDateString();
  const yesterday = getLocalTodayDateString(-1);

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      // First time player default: Day 1 ready
      return {
        currentStreak: 1,
        lastTravelDate: null,
        hasTraveledToday: false,
        totalDaysTraveled: 1,
        totalStreaksAchieved: 0,
        history: [],
      };
    }

    const data: ExplorationStreakData = JSON.parse(raw);

    if (data.lastTravelDate === today) {
      return {
        ...data,
        hasTraveledToday: true,
      };
    } else if (data.lastTravelDate === yesterday) {
      // Traveled yesterday, waiting for today's travel to continue streak
      return {
        ...data,
        hasTraveledToday: false,
      };
    } else if (!data.lastTravelDate) {
      return {
        ...data,
        hasTraveledToday: false,
        currentStreak: Math.max(1, data.currentStreak || 1),
      };
    } else {
      // Missed more than 1 day - streak resets to 0 (will become 1 on next travel)
      return {
        ...data,
        hasTraveledToday: false,
        currentStreak: 0,
      };
    }
  } catch (e) {
    return {
      currentStreak: 1,
      lastTravelDate: null,
      hasTraveledToday: false,
      totalDaysTraveled: 1,
      totalStreaksAchieved: 0,
      history: [],
    };
  }
}

export function saveExplorationStreak(data: ExplorationStreakData): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    // ignore
  }
}

export interface TravelStreakResult {
  advanced: boolean;
  alreadyTraveledToday: boolean;
  oldStreak: number;
  newStreak: number;
  multiplier: number;
  bonusCoinsWon: number;
  isMilestoneDay5: boolean;
  badgeUnlocked?: string;
  message: string;
}

// Called every time the player initiates a time jump in App.tsx
export function recordTravelForStreak(currentData: ExplorationStreakData): {
  updatedData: ExplorationStreakData;
  result: TravelStreakResult;
} {
  const today = getLocalTodayDateString();
  const yesterday = getLocalTodayDateString(-1);

  let newStreak = currentData.currentStreak;
  let advanced = false;
  let bonusCoinsWon = 0;
  let isMilestoneDay5 = false;
  let badgeUnlocked: string | undefined = undefined;
  let message = '';

  if (currentData.lastTravelDate === today && currentData.hasTraveledToday) {
    // Already traveled today - keep current streak and multiplier active
    const multiplier = getMultiplierForStreak(newStreak);
    return {
      updatedData: currentData,
      result: {
        advanced: false,
        alreadyTraveledToday: true,
        oldStreak: currentData.currentStreak,
        newStreak: currentData.currentStreak,
        multiplier,
        bonusCoinsWon: 0,
        isMilestoneDay5: false,
        message: `¡Ya registraste tu viaje de hoy! Multiplicador activo: x${multiplier.toFixed(2)}.`,
      },
    };
  }

  // Not traveled today yet!
  advanced = true;
  if (currentData.lastTravelDate === yesterday) {
    newStreak = currentData.currentStreak + 1;
  } else if (!currentData.lastTravelDate || currentData.currentStreak === 0) {
    newStreak = 1;
  } else {
    // Missed a day, restart streak at Day 1
    newStreak = 1;
  }

  const multiplier = getMultiplierForStreak(newStreak);
  const dayConfig = getStreakDayConfig(newStreak);
  bonusCoinsWon = dayConfig.bonusCoins;

  let totalStreaks = currentData.totalStreaksAchieved;
  if (newStreak === 5) {
    isMilestoneDay5 = true;
    badgeUnlocked = 'badge-streak-5';
    totalStreaks += 1;
    message = `👑 ¡INCREÍBLE! ¡Has completado la Racha de 5 Días! Multiplicador Doble x2.0 activo y Emblema Legendario desbloqueado.`;
  } else {
    message = `🔥 ¡Día ${newStreak} de Racha de Exploración alcanzado! Multiplicador x${multiplier.toFixed(2)} activado (+${bonusCoinsWon} monedas de bono diario).`;
  }

  const updatedData: ExplorationStreakData = {
    currentStreak: newStreak,
    lastTravelDate: today,
    hasTraveledToday: true,
    totalDaysTraveled: currentData.totalDaysTraveled + 1,
    totalStreaksAchieved: totalStreaks,
    history: Array.from(new Set([...currentData.history, today])),
  };

  saveExplorationStreak(updatedData);

  return {
    updatedData,
    result: {
      advanced,
      alreadyTraveledToday: false,
      oldStreak: currentData.currentStreak,
      newStreak,
      multiplier,
      bonusCoinsWon,
      isMilestoneDay5,
      badgeUnlocked,
      message,
    },
  };
}
