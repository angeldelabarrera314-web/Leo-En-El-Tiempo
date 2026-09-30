import {
  collection,
  doc,
  setDoc,
  onSnapshot,
  query,
  limit,
  serverTimestamp,
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';
import {
  RankedTraveler,
  LiveActivityFeedItem,
  INITIAL_RANKED_TRAVELERS,
  generateFullLeaderboard,
} from '../data/travelerRankingData';

const TRAVELERS_COLLECTION = 'travelers';
const ACTIVITIES_COLLECTION = 'live_activities';

export interface CustomTravelerCharacter {
  id: string;
  name: string;
  avatarIcon: string;
  characterSuit: string;
  department?: string;
  municipality?: string;
  city: string;
  school: string;
  grade: string;
  badgeTitle: string;
  level: number;
  travelJumps: number;
  xp: number;
  streakDays: number;
  lastEraVisited: string;
  updatedAt?: string;
  isCurrentUser?: boolean;
}

export const CHARACTER_SUITS = [
  {
    id: 'traje-cuantico',
    name: 'Traje Cuántico Relativista',
    icon: '⚡',
    badge: 'Física y Espacio',
    desc: 'Equipado con propulsores taquiónicos para saltos de época instantáneos.',
    color: 'from-amber-500 to-yellow-400',
    borderColor: 'border-amber-400',
  },
  {
    id: 'traje-gabo',
    name: 'Cronista de Macondo',
    icon: '🦋',
    badge: 'Realismo Mágico',
    desc: 'Guayabera blanca caribeña con pluma de oro y mariposas amarillas.',
    color: 'from-yellow-500 to-amber-600',
    borderColor: 'border-yellow-400',
  },
  {
    id: 'traje-selva',
    name: 'Explorador de La Vorágine',
    icon: '🌿',
    badge: 'Amazonía y Botánica',
    desc: 'Sombrero de ala ancha, botas de campo y cuaderno de botánica cauchera.',
    color: 'from-emerald-500 to-teal-600',
    borderColor: 'border-emerald-400',
  },
  {
    id: 'traje-quiebra',
    name: 'Ingeniero del Túnel de La Quiebra',
    icon: '⚙️',
    badge: 'Ingeniería 1929',
    desc: 'Casco de minería a carbón, overol industrial y planos ferroviarios.',
    color: 'from-sky-500 to-indigo-600',
    borderColor: 'border-sky-400',
  },
  {
    id: 'traje-nadaista',
    name: 'Poeta Rebelde Nadaísta',
    icon: '📜',
    badge: 'Vanguardia Años 50',
    desc: 'Saco de pana negra, boina parisina y manifiestos de libertad literaria.',
    color: 'from-purple-500 to-pink-600',
    borderColor: 'border-purple-400',
  },
  {
    id: 'traje-telecom',
    name: 'Pionero de Radio y TV Analógica',
    icon: '📻',
    badge: 'Telecomunicaciones 1954',
    desc: 'Audífonos de baquelita de Radio Sutatenza y antena de televisión portátil.',
    color: 'from-cyan-500 to-blue-600',
    borderColor: 'border-cyan-400',
  },
];

export const AVATAR_OPTIONS = [
  '🚀', '👑', '⚡', '🎒', '🎩', '🧭', '🔬', '🎨', '🕊️', '🤖', '📚', '🌟', '🐆', '☕', '🌺', '👓', '🚂', '🦋'
];

// Helper to get or generate persistent device traveler ID
export function getOrCreateDeviceTravelerId(): string {
  let id = localStorage.getItem('leo_device_traveler_id');
  if (!id) {
    id = 'traveler-' + Date.now().toString(36) + '-' + Math.random().toString(36).substring(2, 7);
    localStorage.setItem('leo_device_traveler_id', id);
  }
  return id;
}

// Get stored character profile from localStorage
export function getStoredCharacter(): CustomTravelerCharacter {
  const deviceId = getOrCreateDeviceTravelerId();
  const name = localStorage.getItem('leo_ranking_name') || 'Crononauta de Colombia';
  const school = localStorage.getItem('leo_ranking_school') || 'Colegio Niño Jesús De Praga';
  const department = localStorage.getItem('leo_ranking_department') || 'Córdoba';
  const municipality = localStorage.getItem('leo_ranking_municipality') || 'Montería';
  const city = localStorage.getItem('leo_ranking_city') || `${municipality}, ${department}`;
  const avatarIcon = localStorage.getItem('leo_ranking_avatar') || '🚀';
  const characterSuit = localStorage.getItem('leo_ranking_suit') || 'traje-cuantico';
  const grade = localStorage.getItem('leo_ranking_grade') || 'Grado 8°';

  return {
    id: deviceId,
    name,
    avatarIcon,
    characterSuit,
    department,
    municipality,
    city,
    school,
    grade,
    badgeTitle: 'Crononauta Escolar',
    level: 1,
    travelJumps: 0,
    xp: 0,
    streakDays: 1,
    lastEraVisited: '1954 - Primera TV',
    isCurrentUser: true,
  };
}

// Save character profile to localStorage & sync to Firestore
export async function syncCharacterProfileToCloud(
  character: CustomTravelerCharacter,
  currentJumps: number,
  currentXp: number,
  currentStreak: number,
  currentEraText: string
): Promise<void> {
  // 1. Update localStorage
  localStorage.setItem('leo_ranking_name', character.name);
  localStorage.setItem('leo_ranking_school', character.school);
  if (character.department) localStorage.setItem('leo_ranking_department', character.department);
  if (character.municipality) localStorage.setItem('leo_ranking_municipality', character.municipality);
  localStorage.setItem('leo_ranking_city', character.city);
  localStorage.setItem('leo_ranking_avatar', character.avatarIcon);
  localStorage.setItem('leo_ranking_suit', character.characterSuit);
  localStorage.setItem('leo_ranking_grade', character.grade);

  // 2. Prepare payload conforming strictly to firebase-blueprint.json
  const calculatedLevel = Math.max(1, Math.floor(currentXp / 250) + 1);
  const badgeTitle =
    currentXp >= 2000
      ? 'Gran Crononauta de Oro'
      : currentXp >= 1000
      ? 'Maestro del Tiempo'
      : currentXp >= 500
      ? 'Explorador Élite'
      : 'Crononauta Escolar';

  const docPayload = {
    id: character.id,
    name: character.name.trim().substring(0, 60),
    avatarIcon: character.avatarIcon.substring(0, 10),
    characterSuit: character.characterSuit.substring(0, 50),
    city: character.city.substring(0, 80),
    school: character.school.substring(0, 100),
    grade: character.grade.substring(0, 30),
    badgeTitle: badgeTitle.substring(0, 60),
    level: calculatedLevel,
    travelJumps: currentJumps,
    xp: currentXp,
    streakDays: currentStreak,
    lastEraVisited: (currentEraText || '1954 - Primera TV').substring(0, 100),
    updatedAt: new Date().toISOString(),
  };

  try {
    const docRef = doc(db, TRAVELERS_COLLECTION, character.id);
    await setDoc(docRef, docPayload, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `${TRAVELERS_COLLECTION}/${character.id}`);
  }
}

// Broadcast an action to real-time live activity feed
export async function broadcastLiveActivity(
  character: CustomTravelerCharacter,
  actionText: string,
  icon: string,
  xpGained: number
): Promise<void> {
  const activityId = 'act-' + Date.now().toString(36) + '-' + Math.random().toString(36).substring(2, 6);
  const payload = {
    id: activityId,
    travelerId: character.id,
    userName: character.name.substring(0, 60),
    city: character.city.substring(0, 80),
    action: actionText.substring(0, 160),
    icon: icon.substring(0, 10),
    xpGained,
    createdAt: new Date().toISOString(),
  };

  try {
    const docRef = doc(db, ACTIVITIES_COLLECTION, activityId);
    await setDoc(docRef, payload);
  } catch (error) {
    // Non-fatal if fails
    console.warn('Could not broadcast live activity to cloud:', error);
  }
}

// Real-time listener for the collective leaderboard of all real students!
export function subscribeToRealtimeLeaderboard(
  currentUserCharacter: CustomTravelerCharacter,
  currentJumps: number,
  currentXp: number,
  currentStreak: number,
  currentEraText: string,
  onUpdate: (travelers: RankedTraveler[], isLiveConnected: boolean) => void
): () => void {
  const travelersCollectionRef = collection(db, TRAVELERS_COLLECTION);
  const q = query(travelersCollectionRef, limit(40));

  const unsubscribe = onSnapshot(
    q,
    (snapshot) => {
      const cloudTravelers: RankedTraveler[] = [];
      let foundCurrentUser = false;

      snapshot.forEach((docSnap) => {
        const data = docSnap.data();
        if (data && data.id) {
          const isMe = data.id === currentUserCharacter.id;
          if (isMe) foundCurrentUser = true;

          cloudTravelers.push({
            id: data.id,
            name: data.name || 'Crononauta Anónimo',
            avatarIcon: data.avatarIcon || '🚀',
            city: data.city || 'Colombia',
            school: data.school || 'Colegio de Colombia',
            level: Number(data.level) || 1,
            travelJumps: Number(data.travelJumps) || 0,
            xp: Number(data.xp) || 0,
            streakDays: Number(data.streakDays) || 1,
            lastEraVisited: data.lastEraVisited || '1954 - Primera TV',
            badgeTitle: data.badgeTitle || 'Crononauta',
            isCurrentUser: isMe,
          });
        }
      });

      // If current user is not in the snapshot yet, inject local state
      if (!foundCurrentUser) {
        cloudTravelers.push({
          id: currentUserCharacter.id,
          name: currentUserCharacter.name,
          avatarIcon: currentUserCharacter.avatarIcon,
          city: currentUserCharacter.city,
          school: currentUserCharacter.school,
          level: Math.max(1, Math.floor(currentXp / 250) + 1),
          travelJumps: currentJumps,
          xp: currentXp,
          streakDays: currentStreak,
          lastEraVisited: currentEraText || '1954 - Primera TV',
          badgeTitle: currentXp >= 1000 ? 'Maestro del Tiempo' : 'Crononauta Escolar',
          isCurrentUser: true,
        });
      }

      // Merge with initial historical simulated travelers to guarantee a lively board even if only a few real players
      const existingIds = new Set(cloudTravelers.map((t) => t.id));
      INITIAL_RANKED_TRAVELERS.forEach((seed) => {
        if (!existingIds.has(seed.id)) {
          cloudTravelers.push(seed);
        }
      });

      // Sort descending by XP
      cloudTravelers.sort((a, b) => b.xp - a.xp);

      // Add 1-indexed rank position
      const ranked = cloudTravelers.map((traveler, index) => ({
        ...traveler,
        rankPosition: index + 1,
      }));

      onUpdate(ranked, true);
    },
    (error) => {
      console.warn('Realtime ranking listener error (using fallback):', error);
      const fallbackList = generateFullLeaderboard(
        currentJumps,
        currentXp,
        currentStreak,
        currentEraText
      );
      onUpdate(fallbackList, false);
    }
  );

  return unsubscribe;
}
