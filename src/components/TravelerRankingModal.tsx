import React, { useState, useEffect, useMemo } from 'react';
import {
  ArrowLeft,
  X,
  Trophy,
  Zap,
  Users,
  Award,
  Sparkles,
  School,
  MapPin,
  Check,
  Edit2,
  Gift,
  Cloud,
  ShieldCheck,
  RefreshCw,
  UserCheck,
  Compass,
  Search,
  Filter,
  Copy,
  CheckCheck,
  Flame,
  Globe,
} from 'lucide-react';
import {
  RankedTraveler,
  LiveActivityFeedItem,
  MOCK_LIVE_ACTIVITIES,
} from '../data/travelerRankingData';
import {
  COLOMBIA_DEPARTMENTS,
  getMunicipalitiesForDepartment,
} from '../data/colombiaDepartmentsData';
import {
  getStoredCharacter,
  syncCharacterProfileToCloud,
  subscribeToRealtimeLeaderboard,
  broadcastLiveActivity,
  CHARACTER_SUITS,
  AVATAR_OPTIONS,
  CustomTravelerCharacter,
} from '../services/travelerSyncService';
import { sounds } from '../utils/soundEffects';
import { triggerConfetti } from '../utils/confetti';

interface TravelerRankingModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUserJumps: number;
  currentUserXp: number;
  currentUserStreak: number;
  currentEraText: string;
  onEarnCoins: (amount: number) => void;
  onEarnXp: (amount: number) => void;
}

export const TravelerRankingModal: React.FC<TravelerRankingModalProps> = ({
  isOpen,
  onClose,
  currentUserJumps,
  currentUserXp,
  currentUserStreak,
  currentEraText,
  onEarnCoins,
  onEarnXp,
}) => {
  // Navigation tabs: 'podium' (leaderboard), 'character' (avatar & suit builder), 'card' (ID badge pass)
  const [activeTab, setActiveTab] = useState<'podium' | 'character' | 'card'>('podium');

  // Real-time character profile
  const [character, setCharacter] = useState<CustomTravelerCharacter>(() => getStoredCharacter());

  // Form edit state
  const [editName, setEditName] = useState(character.name);
  const [editSchool, setEditSchool] = useState(character.school);
  const [editDepartment, setEditDepartment] = useState(character.department || 'Bogotá D.C.');
  const [editMunicipality, setEditMunicipality] = useState(
    character.municipality || 'Bogotá D.C. (Distrito Capital)'
  );
  const [isCustomMunicipality, setIsCustomMunicipality] = useState(false);
  const [customMunicipalityText, setCustomMunicipalityText] = useState('');
  const [editGrade, setEditGrade] = useState(character.grade || 'Grado 9°');
  const [editAvatar, setEditAvatar] = useState(character.avatarIcon);
  const [editSuit, setEditSuit] = useState(character.characterSuit || 'traje-cuantico');

  // Filter & Search state for Leaderboard
  const [selectedDeptFilter, setSelectedDeptFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'xp' | 'jumps' | 'streak'>('xp');

  // Real-time Cloud Leaderboard
  const [leaderboard, setLeaderboard] = useState<RankedTraveler[]>([]);
  const [isLiveConnected, setIsLiveConnected] = useState<boolean>(false);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [copiedCode, setCopiedCode] = useState(false);

  // Live activities
  const [liveActivities, setLiveActivities] = useState<LiveActivityFeedItem[]>(MOCK_LIVE_ACTIVITIES);

  // Claim league reward state
  const [claimedRewardToday, setClaimedRewardToday] = useState<boolean>(() => {
    const lastClaim = localStorage.getItem('leo_ranking_last_claim');
    const today = new Date().toISOString().split('T')[0];
    return lastClaim === today;
  });

  // Municipalities for currently selected department in editor
  const availableMunicipalities = useMemo(() => {
    return getMunicipalitiesForDepartment(editDepartment);
  }, [editDepartment]);

  // Re-sync character and edit form inputs with stored registration whenever modal opens
  useEffect(() => {
    if (!isOpen) return;
    const latest = getStoredCharacter();
    setCharacter(latest);
    setEditName(latest.name);
    setEditSchool(latest.school);
    setEditDepartment(latest.department || 'Córdoba');
    setEditMunicipality(latest.municipality || 'Montería');
    setEditGrade(latest.grade || 'Grado 8°');
    setEditAvatar(latest.avatarIcon || '🚀');
    setEditSuit(latest.characterSuit || 'traje-cuantico');
  }, [isOpen]);

  // Listen for global profile updates from the onboarding registration modal
  useEffect(() => {
    const handleProfileEvent = (e: Event) => {
      const customEvt = e as CustomEvent<CustomTravelerCharacter>;
      if (customEvt.detail) {
        const p = customEvt.detail;
        setCharacter(p);
        setEditName(p.name);
        setEditSchool(p.school);
        setEditDepartment(p.department || 'Córdoba');
        setEditMunicipality(p.municipality || 'Montería');
        setEditGrade(p.grade || 'Grado 8°');
        setEditAvatar(p.avatarIcon || '🚀');
        setEditSuit(p.characterSuit || 'traje-cuantico');
      }
    };
    window.addEventListener('leo_profile_updated', handleProfileEvent);
    return () => window.removeEventListener('leo_profile_updated', handleProfileEvent);
  }, []);

  // Handle department change: reset municipality to default of that department
  const handleDepartmentChange = (newDept: string) => {
    setEditDepartment(newDept);
    setIsCustomMunicipality(false);
    const munis = getMunicipalitiesForDepartment(newDept);
    if (munis.length > 0) {
      setEditMunicipality(munis[0]);
    }
  };

  // Subscribe to real-time Firestore changes when modal opens
  useEffect(() => {
    if (!isOpen) return;

    // Automatic background sync of current user's profile to Firestore
    syncCharacterProfileToCloud(
      character,
      currentUserJumps,
      currentUserXp,
      currentUserStreak,
      currentEraText
    ).catch(() => {
      // offline fallback
    });

    const unsubscribe = subscribeToRealtimeLeaderboard(
      character,
      currentUserJumps,
      currentUserXp,
      currentUserStreak,
      currentEraText,
      (updatedList, connected) => {
        setLeaderboard(updatedList);
        setIsLiveConnected(connected);
      }
    );

    return () => {
      unsubscribe();
    };
  }, [isOpen, character, currentUserJumps, currentUserXp, currentUserStreak, currentEraText]);

  // Periodic simulated activities to keep the ticker energetic
  useEffect(() => {
    if (!isOpen) return;

    const interval = setInterval(() => {
      const places = [
        { city: 'Montería', dept: 'Córdoba' },
        { city: 'Medellín', dept: 'Antioquia' },
        { city: 'Bogotá', dept: 'Cundinamarca' },
        { city: 'Cali', dept: 'Valle' },
        { city: 'Barranquilla', dept: 'Atlántico' },
        { city: 'Bucaramanga', dept: 'Santander' },
        { city: 'Pasto', dept: 'Nariño' },
        { city: 'Tunja', dept: 'Boyacá' },
        { city: 'Santa Marta', dept: 'Magdalena' },
        { city: 'Sincelejo', dept: 'Sucre' },
      ];
      const names = ['Andrés P.', 'Laura M.', 'Felipe S.', 'Mariana T.', 'Esteban R.', 'Juliana C.', 'Santiago B.', 'Carlos C.'];
      const actions = [
        'viajó al año 1954 para presenciar la primera TV',
        'completó el desafío de Cien Años de Soledad (+50 XP)',
        'equipó el Traje Cuántico Relativista',
        'alcanzó racha de 5 días seguidos en la máquina',
        'descubrió el ferrocarril cafetero de 1920',
        'respondió la trivia del Bogotazo de 1948',
        'superó la misión de La Vorágine en la Amazonía',
      ];
      const icons = ['📺', '🦋', '⚡', '🔥', '🚂', '🚊', '📻', '🌿'];

      const randomPlace = places[Math.floor(Math.random() * places.length)];
      const randomName = names[Math.floor(Math.random() * names.length)];
      const randomAction = actions[Math.floor(Math.random() * actions.length)];
      const randomIcon = icons[Math.floor(Math.random() * icons.length)];

      const newActivity: LiveActivityFeedItem = {
        id: `act-${Date.now()}`,
        timeAgo: 'Justo ahora',
        userName: randomName,
        city: `${randomPlace.city}, ${randomPlace.dept}`,
        action: randomAction,
        icon: randomIcon,
        xpGained: 35 + Math.floor(Math.random() * 30),
      };

      setLiveActivities((prev) => [newActivity, ...prev.slice(0, 5)]);
    }, 9000);

    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  const currentUserItem = leaderboard.find((t) => t.isCurrentUser);
  const selectedSuitObj = CHARACTER_SUITS.find((s) => s.id === editSuit) || CHARACTER_SUITS[0];

  // Filtered & Sorted Leaderboard
  const filteredLeaderboard = leaderboard
    .filter((traveler) => {
      // Department filter
      if (selectedDeptFilter !== 'all') {
        const matchesDept =
          traveler.department?.toLowerCase() === selectedDeptFilter.toLowerCase() ||
          traveler.city.toLowerCase().includes(selectedDeptFilter.toLowerCase());
        if (!matchesDept) return false;
      }

      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matches =
          traveler.name.toLowerCase().includes(q) ||
          traveler.school.toLowerCase().includes(q) ||
          traveler.city.toLowerCase().includes(q) ||
          (traveler.department && traveler.department.toLowerCase().includes(q)) ||
          (traveler.municipality && traveler.municipality.toLowerCase().includes(q));
        if (!matches) return false;
      }

      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'jumps') return b.travelJumps - a.travelJumps;
      if (sortBy === 'streak') return b.streakDays - a.streakDays;
      return b.xp - a.xp;
    });

  const handleSaveProfile = async () => {
    setIsSyncing(true);
    sounds.playClick();

    const finalMuni = isCustomMunicipality
      ? customMunicipalityText.trim() || 'Municipio Escolar'
      : editMunicipality;
    const finalCity = `${finalMuni}, ${editDepartment}`;

    const updated: CustomTravelerCharacter = {
      ...character,
      name: editName.trim() || 'Crononauta de Colombia',
      school: editSchool.trim() || 'Colegio Niño Jesús De Praga',
      department: editDepartment,
      municipality: finalMuni,
      city: finalCity,
      grade: editGrade,
      avatarIcon: editAvatar,
      characterSuit: editSuit,
    };

    setCharacter(updated);

    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('leo_profile_updated', { detail: updated }));
    }

    try {
      await syncCharacterProfileToCloud(
        updated,
        currentUserJumps,
        currentUserXp,
        currentUserStreak,
        currentEraText
      );

      // Broadcast event so other players see it in live feed!
      broadcastLiveActivity(
        updated,
        `actualizó su personaje de ${finalMuni} (${editDepartment}) a ${selectedSuitObj.name}`,
        updated.avatarIcon,
        25
      );

      sounds.playSuccess();
      triggerConfetti(0.5, 0.4);
      setActiveTab('podium');
    } catch (err) {
      console.warn('Failed cloud sync:', err);
    } finally {
      setIsSyncing(false);
    }
  };

  const handleClaimLeagueBonus = () => {
    if (claimedRewardToday) return;

    sounds.playFanfare();
    sounds.playCoin();
    triggerConfetti(0.6, 0.4);

    const today = new Date().toISOString().split('T')[0];
    localStorage.setItem('leo_ranking_last_claim', today);
    setClaimedRewardToday(true);

    onEarnCoins(80);
    onEarnXp(60);
  };

  const handleCopyCode = () => {
    sounds.playClick();
    const code = `LEO-CRONO-${character.id.slice(-6).toUpperCase()}-${character.xp}XP`;
    navigator.clipboard?.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  const top3 = filteredLeaderboard.slice(0, 3);
  const remaining = filteredLeaderboard.slice(3);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="bg-gradient-to-b from-[#0b1428] via-[#080d1b] to-[#040810] border-2 border-amber-400/60 rounded-3xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-[0_0_50px_rgba(245,158,11,0.3)] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-3.5 sm:p-5 border-b border-amber-500/20 bg-gradient-to-r from-amber-500/15 via-sky-500/10 to-indigo-500/15 flex-wrap gap-2">
          <div className="flex items-center gap-2.5 sm:gap-3">
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

            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-amber-400 via-orange-500 to-amber-600 flex items-center justify-center shadow-lg border border-amber-300/50 text-xl sm:text-2xl">
              🏆
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-amber-400 bg-amber-500/20 px-2 py-0.5 rounded-full border border-amber-400/40">
                  Ranking Nacional • 32 Departamentos
                </span>

                {/* Cloud live status pill */}
                <span className="inline-flex items-center gap-1.5 text-[10px] text-emerald-300 font-bold bg-emerald-500/20 px-2.5 py-0.5 rounded-full border border-emerald-400/40 shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  <Cloud className="w-3 h-3 text-emerald-300" />
                  <span>Firestore en Vivo</span>
                </span>
              </div>

              <h2 className="text-sm sm:text-xl font-black text-white flex items-center gap-2">
                Liga Escolar de Viajeros de Colombia
              </h2>
            </div>
          </div>

          <button
            onClick={() => {
              sounds.playClick();
              onClose();
            }}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center border border-slate-600 transition-all hover:scale-105 active:scale-95"
            title="Cerrar Ranking"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Live Ticker Banner */}
        <div className="bg-[#0e1933] border-b border-sky-500/20 px-4 py-2 flex items-center gap-2 overflow-hidden text-xs text-slate-300">
          <span className="text-amber-400 font-bold uppercase tracking-wider text-[10px] whitespace-nowrap flex items-center gap-1">
            <Zap className="w-3.5 h-3.5 text-amber-400 animate-bounce" />
            <span>Actividad en Vivo:</span>
          </span>
          <div className="flex items-center gap-2 truncate">
            {liveActivities.length > 0 && (
              <span className="text-sky-200 truncate">
                {liveActivities[0].icon} <strong>{liveActivities[0].userName}</strong> ({liveActivities[0].city}) {liveActivities[0].action}
              </span>
            )}
          </div>
        </div>

        {/* Sub-navigation Tabs */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-[#091124] border-b border-slate-800 flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                sounds.playClick();
                setActiveTab('podium');
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'podium'
                  ? 'bg-amber-400 text-black shadow-md scale-105'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
              }`}
            >
              <Trophy className="w-3.5 h-3.5" />
              <span>Podio Nacional ({filteredLeaderboard.length})</span>
            </button>

            <button
              onClick={() => {
                sounds.playClick();
                setActiveTab('character');
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'character'
                  ? 'bg-sky-500 text-white shadow-md scale-105'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Mi Personaje & Territorio</span>
            </button>

            <button
              onClick={() => {
                sounds.playClick();
                setActiveTab('card');
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'card'
                  ? 'bg-indigo-500 text-white shadow-md scale-105'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              <span>Mi Carnet STEAM+</span>
            </button>
          </div>

          {/* Quick status preview */}
          <div className="flex items-center gap-2 text-xs">
            <div className="w-7 h-7 rounded-lg bg-amber-500/20 border border-amber-400/50 flex items-center justify-center text-sm">
              {character.avatarIcon}
            </div>
            <div className="text-right hidden sm:block">
              <span className="text-slate-200 font-bold block truncate max-w-[140px]">
                {character.name}
              </span>
              <span className="text-[10px] text-sky-400">
                {character.department || 'Colombia'}
              </span>
            </div>
            <span className="text-amber-400 font-black px-2 py-0.5 bg-amber-500/20 rounded-lg border border-amber-400/40">
              #{currentUserItem?.rankPosition || 1}
            </span>
          </div>
        </div>

        {/* TAB 1: PODIUM & LEADERBOARD WITH REGIONAL FILTERS */}
        {activeTab === 'podium' && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
            {/* Filter & Search Bar */}
            <div className="bg-[#0e172e] p-3 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-3">
              {/* Search box */}
              <div className="relative w-full md:w-72">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar estudiante, colegio o ciudad..."
                  className="w-full bg-[#080f1e] border border-slate-700 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs"
                  >
                    ×
                  </button>
                )}
              </div>

              {/* Department selector filter */}
              <div className="flex items-center gap-2 w-full md:w-auto">
                <div className="flex items-center gap-1.5 text-xs text-slate-300 flex-shrink-0">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  <span className="hidden sm:inline">Filtrar por:</span>
                </div>
                <select
                  value={selectedDeptFilter}
                  onChange={(e) => setSelectedDeptFilter(e.target.value)}
                  className="flex-1 md:w-56 bg-[#080f1e] border border-slate-700 rounded-xl px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-amber-400"
                >
                  <option value="all">🇨🇴 Todos los Departamentos (Nacional)</option>
                  {COLOMBIA_DEPARTMENTS.map((dept) => (
                    <option key={dept.id} value={dept.name}>
                      {dept.name} ({dept.region})
                    </option>
                  ))}
                </select>

                {/* Sort selector */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-[#080f1e] border border-slate-700 rounded-xl px-2.5 py-1.5 text-xs text-amber-300 font-bold focus:outline-none focus:border-amber-400"
                >
                  <option value="xp">Por Puntos XP</option>
                  <option value="jumps">Por Saltos ⏳</option>
                  <option value="streak">Por Racha 🔥</option>
                </select>
              </div>
            </div>

            {/* Top 3 Podium Cards (if enough travelers match) */}
            {top3.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 items-end">
                {/* 2nd Place */}
                {top3[1] && (
                  <div
                    className={`bg-[#0f1b36] border-2 rounded-2xl p-4 text-center space-y-2 order-2 sm:order-1 ${
                      top3[1].isCurrentUser ? 'border-amber-400 bg-amber-500/10 shadow-lg' : 'border-slate-500/40'
                    }`}
                  >
                    <div className="relative inline-block">
                      <div className="w-14 h-14 mx-auto rounded-2xl bg-slate-700/80 border-2 border-slate-400 flex items-center justify-center text-3xl shadow-md">
                        {top3[1].avatarIcon}
                      </div>
                      <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-slate-300 text-slate-900 font-black text-xs flex items-center justify-center border-2 border-white shadow">
                        2
                      </span>
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm truncate">{top3[1].name}</h4>
                      <p className="text-[11px] text-slate-400 truncate">{top3[1].school}</p>
                      <p className="text-[10px] text-sky-400 font-semibold">{top3[1].city}</p>
                    </div>
                    <div className="bg-[#0b1328] py-1 px-2 rounded-xl text-xs font-bold text-slate-300 border border-slate-700">
                      {top3[1].xp} XP • {top3[1].travelJumps} Saltos
                    </div>
                  </div>
                )}

                {/* 1st Place Champion */}
                {top3[0] && (
                  <div
                    className={`bg-gradient-to-b from-amber-500/20 via-orange-500/15 to-[#0f1b36] border-2 rounded-2xl p-5 text-center space-y-2.5 order-1 sm:order-2 shadow-xl scale-105 ${
                      top3[0].isCurrentUser ? 'border-amber-300 shadow-[0_0_25px_rgba(245,158,11,0.4)]' : 'border-amber-400/80'
                    }`}
                  >
                    <div className="relative inline-block">
                      <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-tr from-amber-400 to-amber-600 border-2 border-amber-300 flex items-center justify-center text-4xl shadow-xl">
                        {top3[0].avatarIcon}
                      </div>
                      <span className="absolute -top-2.5 -right-2.5 w-7 h-7 rounded-full bg-amber-400 text-black font-black text-sm flex items-center justify-center border-2 border-white shadow animate-bounce">
                        👑
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] font-black uppercase text-amber-300 tracking-wider">
                        {top3[0].badgeTitle}
                      </span>
                      <h4 className="font-black text-white text-base truncate">{top3[0].name}</h4>
                      <p className="text-xs text-amber-200/90 font-medium truncate">{top3[0].school}</p>
                      <p className="text-[11px] text-sky-300 font-semibold">{top3[0].city}</p>
                    </div>
                    <div className="bg-amber-500/25 py-1.5 px-3 rounded-xl text-xs font-black text-amber-300 border border-amber-400/40">
                      {top3[0].xp} XP • {top3[0].travelJumps} Saltos
                    </div>
                  </div>
                )}

                {/* 3rd Place */}
                {top3[2] && (
                  <div
                    className={`bg-[#0f1b36] border-2 rounded-2xl p-4 text-center space-y-2 order-3 ${
                      top3[2].isCurrentUser ? 'border-amber-400 bg-amber-500/10 shadow-lg' : 'border-amber-700/40'
                    }`}
                  >
                    <div className="relative inline-block">
                      <div className="w-14 h-14 mx-auto rounded-2xl bg-amber-900/60 border-2 border-amber-600 flex items-center justify-center text-3xl shadow-md">
                        {top3[2].avatarIcon}
                      </div>
                      <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-amber-700 text-white font-black text-xs flex items-center justify-center border-2 border-white shadow">
                        3
                      </span>
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm truncate">{top3[2].name}</h4>
                      <p className="text-[11px] text-slate-400 truncate">{top3[2].school}</p>
                      <p className="text-[10px] text-sky-400 font-semibold">{top3[2].city}</p>
                    </div>
                    <div className="bg-[#0b1328] py-1 px-2 rounded-xl text-xs font-bold text-slate-300 border border-slate-700">
                      {top3[2].xp} XP • {top3[2].travelJumps} Saltos
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Leaderboard Table List (Ranks 4+) */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  {selectedDeptFilter === 'all'
                    ? 'Posiciones a Nivel Nacional (Colombia):'
                    : `Líderes de ${selectedDeptFilter}:`}
                </h4>
                <span className="text-[10px] text-sky-400 flex items-center gap-1">
                  <RefreshCw className="w-3 h-3 animate-spin" />
                  Sincronizado en Vivo
                </span>
              </div>

              {filteredLeaderboard.length === 0 ? (
                <div className="bg-[#0c1630] border border-slate-800 rounded-2xl p-6 text-center text-slate-400 text-xs">
                  No se encontraron viajeros con ese filtro. ¡Sé el primero de tu departamento en registrar tu personaje!
                </div>
              ) : (
                remaining.map((traveler) => (
                  <div
                    key={traveler.id}
                    className={`p-3 sm:p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                      traveler.isCurrentUser
                        ? 'bg-gradient-to-r from-amber-500/25 via-sky-500/20 to-indigo-500/20 border-amber-400 shadow-md scale-[1.01]'
                        : 'bg-[#0e172e] border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-7 text-center font-black text-xs sm:text-sm text-slate-400">
                        #{traveler.rankPosition}
                      </span>
                      <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-xl flex-shrink-0">
                        {traveler.avatarIcon}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white text-xs sm:text-sm">
                            {traveler.name}
                          </span>
                          {traveler.isCurrentUser && (
                            <span className="text-[9px] bg-amber-500 text-black px-1.5 py-0.2 rounded font-black uppercase">
                              TÚ
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-400 truncate max-w-[200px] sm:max-w-none">
                          {traveler.school} • {traveler.city}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 sm:gap-6 text-right">
                      <div className="hidden sm:block">
                        <span className="text-[10px] text-slate-400 uppercase font-bold block">
                          Última Época
                        </span>
                        <span className="text-xs text-sky-300 font-medium">
                          {traveler.lastEraVisited}
                        </span>
                      </div>

                      <div>
                        <span className="text-[10px] text-amber-400 uppercase font-bold block">
                          {traveler.streakDays}d Racha
                        </span>
                        <span className="text-xs sm:text-sm font-black text-white">
                          {traveler.xp} XP
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Creators & Engineering Team Hall of Honor */}
            <div className="bg-gradient-to-r from-amber-500/10 via-sky-500/10 to-purple-500/10 border border-amber-400/30 rounded-2xl p-4 space-y-2.5">
              <div className="flex items-center gap-2">
                <span className="text-base">⭐</span>
                <h4 className="text-xs font-black uppercase tracking-wider text-amber-300">
                  Creadores & Desarrolladores del Proyecto STEAM+:
                </h4>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 text-xs">
                <div className="bg-[#0b1326] p-2 rounded-xl border border-amber-400/50 font-bold text-amber-200 sm:col-span-2 md:col-span-3 flex items-center justify-between">
                  <span>👑 ANGEL DAVID DE LA BARRERA LÓPEZ</span>
                  <span className="text-[10px] uppercase bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full border border-amber-400/40">Director de Desarrollo</span>
                </div>
                <div className="bg-[#0b1326] p-2 rounded-xl border border-sky-400/20 font-bold text-slate-200 flex items-center justify-between">
                  <span>👨‍💻 JUAN CAMILO MANGONES MIRANDA</span>
                  <span className="text-[9px] text-slate-400">Desarrollador</span>
                </div>
                <div className="bg-[#0b1326] p-2 rounded-xl border border-sky-400/20 font-bold text-slate-200 flex items-center justify-between">
                  <span>👨‍💻 GABRIEL DAVID DÍAS BALLESTEROS</span>
                  <span className="text-[9px] text-slate-400">Desarrollador</span>
                </div>
                <div className="bg-[#0b1326] p-2 rounded-xl border border-sky-400/20 font-bold text-slate-200 flex items-center justify-between">
                  <span>👨‍💻 JESSY ALDAIR LUGO SOTO</span>
                  <span className="text-[9px] text-slate-400">Desarrollador</span>
                </div>
                <div className="bg-[#0b1326] p-2 rounded-xl border border-sky-400/20 font-bold text-slate-200 flex items-center justify-between">
                  <span>👨‍💻 JULIAN JAVIER RODRÍGUEZ VARGAS</span>
                  <span className="text-[9px] text-slate-400">Desarrollador</span>
                </div>
                <div className="bg-[#0b1326] p-2 rounded-xl border border-sky-400/20 font-bold text-slate-200 sm:col-span-2 md:col-span-2 flex items-center justify-between">
                  <span>👨‍💻 MAURO ANDRE GONZÁLEZ PALACIOS</span>
                  <span className="text-[9px] text-slate-400">Desarrollador</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: CHARACTER BUILDER & SUIT CUSTOMIZER (32 DEPARTMENTS & MUNICIPALITIES) */}
        {activeTab === 'character' && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 animate-fadeIn">
            {/* Live Character ID Card Preview */}
            <div className="bg-gradient-to-r from-sky-950/70 via-indigo-950/70 to-purple-950/70 p-4 sm:p-5 rounded-3xl border-2 border-sky-400/50 shadow-xl flex flex-col sm:flex-row items-center gap-4">
              <div className="relative">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-tr from-amber-400 via-orange-500 to-amber-600 border-4 border-white flex items-center justify-center text-4xl sm:text-5xl shadow-[0_0_30px_rgba(245,158,11,0.6)]">
                  {editAvatar}
                </div>
                <span className="absolute -bottom-1 -right-1 text-sm bg-black/80 px-2 py-0.5 rounded-full border border-amber-400 font-black">
                  Nvl {Math.max(1, Math.floor(currentUserXp / 250) + 1)}
                </span>
              </div>

              <div className="flex-1 text-center sm:text-left space-y-1">
                <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
                  <span className="text-[10px] font-black uppercase tracking-wider text-amber-300 bg-amber-500/25 px-2.5 py-0.5 rounded-full border border-amber-400/40">
                    Carnet Oficial de Crononauta
                  </span>
                  <span className="text-[10px] font-bold text-sky-300 bg-sky-500/20 px-2 py-0.5 rounded-full border border-sky-400/30">
                    {editGrade}
                  </span>
                  <span className="text-[10px] font-bold text-emerald-300 bg-emerald-500/20 px-2 py-0.5 rounded-full border border-emerald-400/30">
                    📍 {isCustomMunicipality ? (customMunicipalityText || 'Tu Municipio') : editMunicipality} ({editDepartment})
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-white">
                  {editName || 'Tu Apodo de Viajero'}
                </h3>

                <p className="text-xs text-slate-300">
                  🏫 <strong>{editSchool}</strong>
                </p>

                <div className="pt-1 flex items-center justify-center sm:justify-start gap-2">
                  <span className="text-xs font-bold text-amber-300 bg-[#091124] px-2.5 py-1 rounded-xl border border-slate-700">
                    {selectedSuitObj.icon} {selectedSuitObj.name}
                  </span>
                  <span className="text-xs font-black text-white bg-slate-800 px-2.5 py-1 rounded-xl border border-slate-700">
                    ⚡ {currentUserXp} XP
                  </span>
                </div>
              </div>
            </div>

            {/* Sincronización Automática con Registro Inicial */}
            <div className="bg-emerald-500/15 border border-emerald-400/40 rounded-2xl p-3 flex items-center gap-3">
              <span className="text-xl flex-shrink-0">✅</span>
              <div>
                <span className="text-xs font-bold text-emerald-300 block">
                  ¡Datos sincronizados automáticamente!
                </span>
                <span className="text-[11px] text-slate-300 leading-snug block">
                  Tu nombre, colegio y grado fueron tomados de tu registro de entrada. No tienes que volver a escribirlos a menos que desees cambiarlos.
                </span>
              </div>
            </div>

            {/* Customizer Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Name */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-200 block">
                  1. Nombre o Apodo de Crononauta:
                </label>
                <input
                  type="text"
                  maxLength={60}
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  placeholder="Ej: Daniel el Viajero..."
                  className="w-full bg-[#0c1630] border border-slate-700 rounded-2xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              {/* School */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-200 block">
                  2. Colegio o Institución Educativa:
                </label>
                <input
                  type="text"
                  maxLength={100}
                  value={editSchool}
                  onChange={(e) => setEditSchool(e.target.value)}
                  placeholder="Nombre de tu colegio..."
                  className="w-full bg-[#0c1630] border border-slate-700 rounded-2xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              {/* Department (32 Departamentos de Colombia) */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-200 block">
                    3. Departamento de Colombia:
                  </label>
                  <span className="text-[10px] text-amber-400 font-semibold">32 Departamentos</span>
                </div>
                <select
                  value={editDepartment}
                  onChange={(e) => handleDepartmentChange(e.target.value)}
                  className="w-full bg-[#0c1630] border border-slate-700 rounded-2xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400 font-medium"
                >
                  {COLOMBIA_DEPARTMENTS.map((dept) => (
                    <option key={dept.id} value={dept.name}>
                      {dept.name} • Región {dept.region}
                    </option>
                  ))}
                </select>
              </div>

              {/* Municipality */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-200 block">
                    4. Municipio o Ciudad ({editDepartment}):
                  </label>
                  <button
                    type="button"
                    onClick={() => setIsCustomMunicipality(!isCustomMunicipality)}
                    className="text-[10px] text-sky-400 hover:text-sky-300 underline font-semibold"
                  >
                    {isCustomMunicipality ? 'Ver lista estándar' : 'Escribir otro municipio'}
                  </button>
                </div>

                {isCustomMunicipality ? (
                  <input
                    type="text"
                    maxLength={60}
                    value={customMunicipalityText}
                    onChange={(e) => setCustomMunicipalityText(e.target.value)}
                    placeholder="Escribe el nombre de tu municipio, vereda o corregimiento..."
                    className="w-full bg-[#0c1630] border border-amber-400/60 rounded-2xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                ) : (
                  <select
                    value={editMunicipality}
                    onChange={(e) => setEditMunicipality(e.target.value)}
                    className="w-full bg-[#0c1630] border border-slate-700 rounded-2xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400 font-medium"
                  >
                    {availableMunicipalities.map((muni, idx) => (
                      <option key={idx} value={muni}>
                        {muni}
                      </option>
                    ))}
                  </select>
                )}
              </div>

              {/* Grade */}
              <div className="space-y-1 sm:col-span-2">
                <label className="text-xs font-bold text-slate-200 block">
                  5. Grado Escolar o Rol en el Proyecto:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
                  {['Grado 6°', 'Grado 7°', 'Grado 8°', 'Grado 9°', 'Grado 10°', 'Grado 11°', 'Docente / Guía'].map(
                    (g) => (
                      <button
                        key={g}
                        type="button"
                        onClick={() => {
                          sounds.playPop();
                          setEditGrade(g);
                        }}
                        className={`py-2 px-1 text-xs rounded-xl border font-bold transition-all text-center ${
                          editGrade === g
                            ? 'bg-amber-400 text-black border-amber-300 shadow-md scale-105'
                            : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-700'
                        }`}
                      >
                        {g}
                      </button>
                    )
                  )}
                </div>
              </div>
            </div>

            {/* Suit Selection */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-200 block">
                6. Escoge tu Traje Temporal de Época:
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                {CHARACTER_SUITS.map((suit) => {
                  const isSelected = editSuit === suit.id;
                  return (
                    <div
                      key={suit.id}
                      onClick={() => {
                        sounds.playClick();
                        setEditSuit(suit.id);
                      }}
                      className={`p-3 rounded-2xl border-2 cursor-pointer transition-all ${
                        isSelected
                          ? `bg-[#14234b] ${suit.borderColor} shadow-lg scale-102`
                          : 'bg-[#0a1226] border-slate-800 hover:border-slate-600'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 mb-1.5">
                        <span className="text-2xl">{suit.icon}</span>
                        <div>
                          <span className="text-[10px] uppercase font-bold text-amber-300 block">
                            {suit.badge}
                          </span>
                          <h4 className="text-xs font-bold text-white leading-tight">
                            {suit.name}
                          </h4>
                        </div>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-snug">
                        {suit.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Avatar Emoji Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-200 block">
                7. Escoge el Emoji o Icono de tu Avatar:
              </label>

              <div className="flex items-center gap-2 flex-wrap bg-[#0c1630] p-3 rounded-2xl border border-slate-700">
                {AVATAR_OPTIONS.map((emoji) => (
                  <button
                    key={emoji}
                    onClick={() => {
                      sounds.playPop();
                      setEditAvatar(emoji);
                    }}
                    className={`w-11 h-11 text-2xl rounded-xl border transition-all flex items-center justify-center ${
                      editAvatar === emoji
                        ? 'bg-amber-400 text-black border-amber-300 scale-110 shadow-lg'
                        : 'border-slate-700 bg-slate-800/80 hover:bg-slate-700'
                    }`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>

            {/* Action buttons */}
            <div className="pt-2 flex items-center justify-between flex-wrap gap-3">
              <span className="text-xs text-slate-400 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Tu personaje y departamento se sincronizarán en la nube de Firebase.
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab('podium')}
                  className="px-4 py-2.5 rounded-2xl bg-slate-800 text-slate-300 hover:text-white text-xs font-bold border border-slate-700"
                >
                  Volver al Podio
                </button>

                <button
                  onClick={handleSaveProfile}
                  disabled={isSyncing}
                  className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black font-black text-xs sm:text-sm shadow-xl transition-all hover:scale-105 active:scale-95 border border-amber-300 flex items-center gap-2"
                >
                  {isSyncing ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Sincronizando con Firebase...</span>
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4" />
                      <span>¡Guardar mi Personaje en la Nube!</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: CARNET OFICIAL STEAM+ EXPORTABLE */}
        {activeTab === 'card' && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 flex flex-col items-center justify-center animate-fadeIn">
            {/* The Badge Card */}
            <div className="w-full max-w-md bg-gradient-to-b from-[#101b3b] via-[#091329] to-[#040915] border-2 border-amber-400/80 rounded-3xl p-6 shadow-[0_0_40px_rgba(245,158,11,0.35)] relative overflow-hidden space-y-4">
              {/* Badge watermarks */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none"></div>

              <div className="flex items-center justify-between border-b border-amber-500/30 pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xl">🇨🇴</span>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-amber-400 block">
                      República de Colombia
                    </span>
                    <h3 className="text-xs font-black text-white">
                      Pasaporte del Crononauta Escolar
                    </h3>
                  </div>
                </div>
                <span className="text-[10px] font-black uppercase bg-amber-400 text-black px-2 py-0.5 rounded-full">
                  STEAM+ 2026
                </span>
              </div>

              {/* Photo & Main Details */}
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-amber-400 via-orange-500 to-amber-600 border-2 border-white flex items-center justify-center text-4xl shadow-xl flex-shrink-0">
                  {character.avatarIcon}
                </div>
                <div className="space-y-1">
                  <h4 className="text-base font-black text-white">{character.name}</h4>
                  <p className="text-xs text-amber-200 font-semibold">{character.school}</p>
                  <p className="text-[11px] text-sky-300">
                    📍 {character.municipality || 'Municipio'}, {character.department || 'Colombia'}
                  </p>
                  <span className="inline-block text-[10px] bg-sky-500/20 text-sky-300 border border-sky-400/30 px-2 py-0.5 rounded-full font-bold">
                    {character.grade || 'Grado 9°'}
                  </span>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-2 bg-[#060c1c] p-3 rounded-2xl border border-slate-800 text-center">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Puesto</span>
                  <span className="text-base font-black text-amber-400">
                    #{currentUserItem?.rankPosition || 1}
                  </span>
                </div>
                <div className="border-x border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">XP Total</span>
                  <span className="text-base font-black text-white">{currentUserXp}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Saltos</span>
                  <span className="text-base font-black text-sky-300">{currentUserJumps}</span>
                </div>
              </div>

              {/* Unique Traveler Hash code */}
              <div className="bg-[#050a17] border border-slate-700/80 rounded-xl p-2.5 flex items-center justify-between text-xs">
                <div>
                  <span className="text-[9px] text-slate-400 block uppercase font-bold">Código de Crononauta:</span>
                  <span className="font-mono text-amber-300 font-bold tracking-wider">
                    LEO-CRONO-{character.id.slice(-6).toUpperCase()}-{currentUserXp}XP
                  </span>
                </div>

                <button
                  onClick={handleCopyCode}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-600 transition-all flex items-center gap-1 text-[11px]"
                  title="Copiar código para compartir"
                >
                  {copiedCode ? (
                    <>
                      <CheckCheck className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-300 font-bold">¡Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-amber-400" />
                      <span>Copiar</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="text-center space-y-2">
              <p className="text-xs text-slate-400 max-w-sm">
                Comparte este código con tus docentes o compañeros de la feria STEAM+ para validar tus logros históricos.
              </p>
              <button
                onClick={() => setActiveTab('podium')}
                className="px-5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-black text-xs font-black transition-all shadow-md"
              >
                Volver a la Tabla de Posiciones
              </button>
            </div>
          </div>
        )}

        {/* Modal Footer: Daily League Reward Claim */}
        <div className="p-4 border-t border-slate-800 bg-[#091124] flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-300">
            <Gift className="w-4 h-4 text-amber-400" />
            <span>
              <strong>Bono Diario de Liga:</strong> Reclama monedas cada 24 horas por tu participación en el ranking.
            </span>
          </div>

          <button
            onClick={handleClaimLeagueBonus}
            disabled={claimedRewardToday}
            className={`px-4 py-2 rounded-xl text-xs font-bold shadow-md transition-all flex items-center gap-2 ${
              claimedRewardToday
                ? 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed'
                : 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black hover:scale-105 active:scale-95'
            }`}
          >
            <Sparkles className="w-4 h-4 fill-current" />
            <span>{claimedRewardToday ? 'Bono Reclamado Hoy ✓' : '¡Reclamar Bono (+80 🪙 y +60 XP)!'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
