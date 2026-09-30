export interface RankedTraveler {
  id: string;
  rankPosition?: number;
  name: string;
  avatarIcon: string;
  city: string;
  department?: string;
  municipality?: string;
  school: string;
  level: number;
  travelJumps: number;
  xp: number;
  streakDays: number;
  lastEraVisited: string;
  badgeTitle: string;
  isCurrentUser?: boolean;
}

export interface LiveActivityFeedItem {
  id: string;
  timeAgo: string;
  userName: string;
  city: string;
  action: string;
  icon: string;
  xpGained?: number;
}

export const INITIAL_RANKED_TRAVELERS: RankedTraveler[] = [
  {
    id: 'trav-1',
    name: 'Valentina Restrepo',
    avatarIcon: '👑',
    city: 'Medellín, Antioquia',
    department: 'Antioquia',
    municipality: 'Medellín',
    school: 'INEM José Félix de Restrepo',
    level: 10,
    travelJumps: 42,
    xp: 2850,
    streakDays: 5,
    lastEraVisited: '1982 - Nobel de Gabo',
    badgeTitle: 'Gran Crononauta de Oro',
  },
  {
    id: 'trav-2',
    name: 'Sebastián Caicedo',
    avatarIcon: '🚀',
    city: 'Bogotá D.C.',
    department: 'Bogotá D.C.',
    municipality: 'Bogotá D.C. (Distrito Capital)',
    school: 'Colegio Mayor de San Bartolomé',
    level: 9,
    travelJumps: 38,
    xp: 2420,
    streakDays: 5,
    lastEraVisited: '1948 - El Bogotazo',
    badgeTitle: 'Maestro del Tiempo',
  },
  {
    id: 'trav-3',
    name: 'Camila Villamizar',
    avatarIcon: '⭐',
    city: 'Bucaramanga, Santander',
    department: 'Santander',
    municipality: 'Bucaramanga',
    school: 'Colegio Santander',
    level: 8,
    travelJumps: 31,
    xp: 1980,
    streakDays: 4,
    lastEraVisited: '1954 - Primera TV',
    badgeTitle: 'Exploradora Élite',
  },
  {
    id: 'trav-4',
    name: 'Mateo Obregón',
    avatarIcon: '🪀',
    city: 'Cali, Valle del Cauca',
    department: 'Valle del Cauca',
    municipality: 'Cali',
    school: 'Liceo Benalcázar',
    level: 7,
    travelJumps: 26,
    xp: 1650,
    streakDays: 4,
    lastEraVisited: '1970 - Juegos de Barrio',
    badgeTitle: 'Historiador Cuántico',
  },
  {
    id: 'trav-5',
    name: 'Sofía Char',
    avatarIcon: '🦋',
    city: 'Barranquilla, Atlántico',
    department: 'Atlántico',
    municipality: 'Barranquilla',
    school: 'Colegio Alemán del Caribe',
    level: 6,
    travelJumps: 22,
    xp: 1390,
    streakDays: 3,
    lastEraVisited: '1928 - Bananeras de Ciénaga',
    badgeTitle: 'Crononauta Avanzada',
  },
  {
    id: 'trav-6',
    name: 'Daniel Montaño',
    avatarIcon: '🚂',
    city: 'Pasto, Nariño',
    department: 'Nariño',
    municipality: 'Pasto',
    school: 'Colegio San Francisco Javier',
    level: 5,
    travelJumps: 18,
    xp: 1120,
    streakDays: 3,
    lastEraVisited: '1920 - Ferrocarriles y Café',
    badgeTitle: 'Pionero de Épocas',
  },
  {
    id: 'trav-7',
    name: 'Mariana Henao',
    avatarIcon: '☕',
    city: 'Pereira, Risaralda',
    department: 'Risaralda',
    municipality: 'Pereira',
    school: 'Colegio Deogracias Cardona',
    level: 4,
    travelJumps: 14,
    xp: 880,
    streakDays: 2,
    lastEraVisited: '1903 - Separación de Panamá',
    badgeTitle: 'Viajera Audaz',
  },
  {
    id: 'trav-8',
    name: 'Nicolás Daza',
    avatarIcon: '📻',
    city: 'Tunja, Boyacá',
    department: 'Boyacá',
    municipality: 'Tunja',
    school: 'Colegio de Boyacá (Colboy)',
    level: 3,
    travelJumps: 10,
    xp: 610,
    streakDays: 2,
    lastEraVisited: '1950 - Radio Sutatenza',
    badgeTitle: 'Explorador Novato',
  },
  {
    id: 'trav-9',
    name: 'Carlos Correa',
    avatarIcon: '🐊',
    city: 'Montería, Córdoba',
    department: 'Córdoba',
    municipality: 'Montería',
    school: 'Colegio Comfacor',
    level: 3,
    travelJumps: 9,
    xp: 550,
    streakDays: 2,
    lastEraVisited: '1924 - Publicación de La Vorágine',
    badgeTitle: 'Explorador del Sinú',
  },
  {
    id: 'trav-10',
    name: 'Luciana Gómez',
    avatarIcon: '🗳️',
    city: 'Cartagena, Bolívar',
    department: 'Bolívar',
    municipality: 'Cartagena de Indias',
    school: 'Liceo de Bolívar',
    level: 3,
    travelJumps: 8,
    xp: 490,
    streakDays: 1,
    lastEraVisited: '1957 - Voto Femenino',
    badgeTitle: 'Exploradora Joven',
  },
  {
    id: 'trav-11',
    name: 'Samuel Rojas',
    avatarIcon: '📜',
    city: 'Cúcuta, Norte de Santander',
    department: 'Norte de Santander',
    municipality: 'Cúcuta',
    school: 'Colegio Provincial San José',
    level: 2,
    travelJumps: 6,
    xp: 380,
    streakDays: 1,
    lastEraVisited: '1991 - Constitución Política',
    badgeTitle: 'Viajero Curioso',
  },
  {
    id: 'trav-12',
    name: 'Laura Manrique',
    avatarIcon: '🌿',
    city: 'Villavicencio, Meta',
    department: 'Meta',
    municipality: 'Villavicencio',
    school: 'Colegio Departamental de la Esperanza',
    level: 2,
    travelJumps: 5,
    xp: 320,
    streakDays: 1,
    lastEraVisited: '1960 - Colonización de los Llanos',
    badgeTitle: 'Viajera Llanera',
  },
];

export const MOCK_LIVE_ACTIVITIES: LiveActivityFeedItem[] = [
  {
    id: 'feed-1',
    timeAgo: 'Hace 4s',
    userName: 'Valentina R.',
    city: 'Medellín',
    action: 'descubrió el manuscrito de La Vorágine en 1924',
    icon: '🌿',
    xpGained: 50,
  },
  {
    id: 'feed-2',
    timeAgo: 'Hace 12s',
    userName: 'Sebastián C.',
    city: 'Bogotá',
    action: 'completó el Desafío del Bogotazo de 1948',
    icon: '🚊',
    xpGained: 45,
  },
  {
    id: 'feed-3',
    timeAgo: 'Hace 24s',
    userName: 'Sofía C.',
    city: 'Barranquilla',
    action: 'ganó 100 monedas en el Quiz de Lengua Castellana',
    icon: '📚',
    xpGained: 60,
  },
  {
    id: 'feed-4',
    timeAgo: 'Hace 45s',
    userName: 'Mateo O.',
    city: 'Cali',
    action: 'alcanzó racha de 4 días seguidos en la máquina',
    icon: '🔥',
    xpGained: 70,
  },
  {
    id: 'feed-5',
    timeAgo: 'Hace 1m',
    userName: 'Daniel M.',
    city: 'Pasto',
    action: 'equipó la Ruana Boyacense en el Vestidor 2D',
    icon: '🧥',
    xpGained: 25,
  },
];

export function getStoredPlayerProfile(): {
  name: string;
  school: string;
  department: string;
  municipality: string;
  city: string;
  avatarIcon: string;
} {
  const savedName = localStorage.getItem('leo_ranking_name') || 'Tú (Crononauta)';
  const savedSchool = localStorage.getItem('leo_ranking_school') || 'Colegio Niño Jesús De Praga';
  const savedDepartment = localStorage.getItem('leo_ranking_department') || 'Córdoba';
  const savedMunicipality = localStorage.getItem('leo_ranking_municipality') || 'Montería';
  const savedCity = localStorage.getItem('leo_ranking_city') || `${savedMunicipality}, ${savedDepartment}`;
  const savedAvatar = localStorage.getItem('leo_ranking_avatar') || '🚀';

  return {
    name: savedName,
    school: savedSchool,
    department: savedDepartment,
    municipality: savedMunicipality,
    city: savedCity,
    avatarIcon: savedAvatar,
  };
}

export function savePlayerProfile(data: {
  name: string;
  school: string;
  city: string;
  avatarIcon: string;
  department?: string;
  municipality?: string;
}): void {
  localStorage.setItem('leo_ranking_name', data.name);
  localStorage.setItem('leo_ranking_school', data.school);
  if (data.department) localStorage.setItem('leo_ranking_department', data.department);
  if (data.municipality) localStorage.setItem('leo_ranking_municipality', data.municipality);
  localStorage.setItem('leo_ranking_city', data.city);
  localStorage.setItem('leo_ranking_avatar', data.avatarIcon);
}

export function generateFullLeaderboard(
  currentUserJumps: number,
  currentUserXp: number,
  currentUserStreak: number,
  currentEraText: string
): RankedTraveler[] {
  const profile = getStoredPlayerProfile();

  const currentUserItem: RankedTraveler = {
    id: 'current-user-player',
    name: profile.name,
    avatarIcon: profile.avatarIcon,
    city: profile.city,
    department: profile.department,
    municipality: profile.municipality,
    school: profile.school,
    level: Math.max(1, Math.floor(currentUserXp / 250) + 1),
    travelJumps: currentUserJumps,
    xp: currentUserXp,
    streakDays: currentUserStreak,
    lastEraVisited: currentEraText || '1954 - Primera TV',
    badgeTitle:
      currentUserXp > 2000
        ? 'Maestro del Tiempo'
        : currentUserXp > 800
        ? 'Explorador Élite'
        : 'Crononauta Escolar',
    isCurrentUser: true,
  };

  const all = [...INITIAL_RANKED_TRAVELERS, currentUserItem];
  // Sort descending by XP
  all.sort((a, b) => b.xp - a.xp);

  // Assign 1-indexed rank position
  return all.map((traveler, index) => ({
    ...traveler,
    rankPosition: index + 1,
  }));
}
