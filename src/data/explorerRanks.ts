import { ExplorerRank } from '../types';

export const EXPLORER_RANKS: ExplorerRank[] = [
  {
    id: 'rank-novato',
    level: 1,
    title: 'Novato Temporal',
    badgeIcon: '🥉',
    minJumps: 0,
    minXP: 0,
    color: 'from-amber-700 to-amber-900',
    borderColor: 'border-amber-600/50',
    bgColor: 'bg-amber-950/40',
    description: 'Primeros pasos por la línea temporal de Colombia.',
    perk: 'Acceso a la cabina básica de mando.',
  },
  {
    id: 'rank-cadete',
    level: 2,
    title: 'Cadete del Siglo XX',
    badgeIcon: '🥈',
    minJumps: 3,
    minXP: 150,
    color: 'from-slate-400 to-slate-600',
    borderColor: 'border-slate-400/50',
    bgColor: 'bg-slate-900/60',
    description: 'Explorador activo de los años 20 y el transporte cafetero.',
    perk: '+10% bonificación de monedas cuánticas.',
  },
  {
    id: 'rank-crononauta',
    level: 3,
    title: 'Crononauta Colombiano',
    badgeIcon: '🥇',
    minJumps: 7,
    minXP: 350,
    color: 'from-amber-400 to-yellow-600',
    borderColor: 'border-amber-400/60',
    bgColor: 'bg-amber-950/60',
    description: 'Navegante de hitos clave: 1948, 1954 y el voto femenino de 1957.',
    perk: 'Descuentos en vestidor y trajes históricos.',
  },
  {
    id: 'rank-maestro',
    level: 4,
    title: 'Maestro del Tiempo Andino',
    badgeIcon: '💎',
    minJumps: 13,
    minXP: 650,
    color: 'from-emerald-400 to-teal-600',
    borderColor: 'border-emerald-400/60',
    bgColor: 'bg-emerald-950/60',
    description: 'Dominio de las 10 décadas del siglo XX y la Constitución de 1991.',
    perk: 'Salto temporal hiperacelerado con túnel 3D.',
  },
  {
    id: 'rank-leyenda',
    level: 5,
    title: 'Leyenda Cuántica STEAM+',
    badgeIcon: '👑',
    minJumps: 20,
    minXP: 1000,
    color: 'from-fuchsia-500 via-purple-500 to-amber-400',
    borderColor: 'border-fuchsia-400/80',
    bgColor: 'bg-purple-950/70',
    description: 'Máximo rango honorífico del Colegio y la Feria STEAM+.',
    perk: 'Aura dorada de expedicionario supremo.',
  },
];

export function getRankForPlayer(jumps: number, xp: number): {
  currentRank: ExplorerRank;
  nextRank: ExplorerRank | null;
  progressPercent: number;
  jumpsNeeded: number;
  xpNeeded: number;
  fluxIntensity: number; // 0 to 100%
} {
  let currentRank = EXPLORER_RANKS[0];
  let nextRank: ExplorerRank | null = EXPLORER_RANKS[1];

  for (let i = EXPLORER_RANKS.length - 1; i >= 0; i--) {
    const r = EXPLORER_RANKS[i];
    if (jumps >= r.minJumps && xp >= r.minXP) {
      currentRank = r;
      nextRank = i < EXPLORER_RANKS.length - 1 ? EXPLORER_RANKS[i + 1] : null;
      break;
    }
  }

  // Calculate flux intensity based on jumps and XP
  // 1 jump adds ~4% intensity, 50 XP adds ~3%
  const fluxIntensity = Math.min(100, Math.max(15, Math.round(20 + jumps * 4.2 + (xp / 1000) * 40)));

  if (!nextRank) {
    return {
      currentRank,
      nextRank: null,
      progressPercent: 100,
      jumpsNeeded: 0,
      xpNeeded: 0,
      fluxIntensity,
    };
  }

  // Calculate progress toward next rank
  const jumpsDiff = nextRank.minJumps - currentRank.minJumps;
  const xpDiff = nextRank.minXP - currentRank.minXP;

  const jumpsProgress = jumpsDiff > 0 ? (jumps - currentRank.minJumps) / jumpsDiff : 1;
  const xpProgress = xpDiff > 0 ? (xp - currentRank.minXP) / xpDiff : 1;

  // Average progress clamped between 0 and 100
  const progressPercent = Math.min(100, Math.max(0, Math.round(((jumpsProgress + xpProgress) / 2) * 100)));

  return {
    currentRank,
    nextRank,
    progressPercent,
    jumpsNeeded: Math.max(0, nextRank.minJumps - jumps),
    xpNeeded: Math.max(0, nextRank.minXP - xp),
    fluxIntensity,
  };
}
