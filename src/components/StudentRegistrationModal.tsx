import React, { useState } from 'react';
import {
  X,
  Sparkles,
  Award,
  Zap,
  CheckCircle2,
  School,
  MapPin,
  User,
  GraduationCap,
  Shirt,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import {
  COLOMBIA_DEPARTMENTS,
  getMunicipalitiesForDepartment,
} from '../data/colombiaDepartmentsData';
import {
  CHARACTER_SUITS,
  AVATAR_OPTIONS,
  CustomTravelerCharacter,
  syncCharacterProfileToCloud,
  broadcastLiveActivity,
  getOrCreateDeviceTravelerId,
} from '../services/travelerSyncService';
import { sounds } from '../utils/soundEffects';
import { triggerConfetti } from '../utils/confetti';

interface StudentRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRegistered: (newProfile: CustomTravelerCharacter) => void;
  currentTravelCount: number;
  currentXp: number;
  currentStreak: number;
  currentEraText: string;
}

export const StudentRegistrationModal: React.FC<StudentRegistrationModalProps> = ({
  isOpen,
  onClose,
  onRegistered,
  currentTravelCount,
  currentXp,
  currentStreak,
  currentEraText,
}) => {
  const [name, setName] = useState('');
  const [role, setRole] = useState<'Estudiante' | 'Docente' | 'Jurado Evaluador' | 'Padre de Familia' | 'Visitante'>('Estudiante');
  const [grade, setGrade] = useState('Grado 8°');
  const [schoolChoice, setSchoolChoice] = useState<'praga' | 'other'>('praga');
  const [customSchool, setCustomSchool] = useState('');
  const [department, setDepartment] = useState('Córdoba');
  const [municipality, setMunicipality] = useState('Montería');
  const [avatarIcon, setAvatarIcon] = useState('🚀');
  const [characterSuit, setCharacterSuit] = useState('traje-cuantico');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const municipalities = getMunicipalitiesForDepartment(department);

  // Pre-load from saved profile whenever modal is opened
  React.useEffect(() => {
    if (!isOpen) return;
    const savedName = localStorage.getItem('leo_ranking_name');
    if (savedName) setName(savedName);
    const savedSchool = localStorage.getItem('leo_ranking_school');
    if (savedSchool) {
      if (savedSchool === 'Colegio Niño Jesús De Praga') {
        setSchoolChoice('praga');
      } else {
        setSchoolChoice('other');
        setCustomSchool(savedSchool);
      }
    }
    const savedGrade = localStorage.getItem('leo_ranking_grade');
    if (savedGrade) setGrade(savedGrade);
    const savedDept = localStorage.getItem('leo_ranking_department');
    if (savedDept) setDepartment(savedDept);
    const savedMuni = localStorage.getItem('leo_ranking_municipality');
    if (savedMuni) setMunicipality(savedMuni);
    const savedAvatar = localStorage.getItem('leo_ranking_avatar');
    if (savedAvatar) setAvatarIcon(savedAvatar);
    const savedSuit = localStorage.getItem('leo_ranking_suit');
    if (savedSuit) setCharacterSuit(savedSuit);
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsSubmitting(true);
    sounds.playFanfare();
    sounds.playCoin();
    triggerConfetti(0.5, 0.4);

    const chosenSchool =
      schoolChoice === 'praga'
        ? 'Colegio Niño Jesús De Praga'
        : customSchool.trim() || 'Colegio de Colombia';

    const city = `${municipality}, ${department}`;
    const deviceId = getOrCreateDeviceTravelerId();

    const profile: CustomTravelerCharacter = {
      id: deviceId,
      name: name.trim(),
      avatarIcon,
      characterSuit,
      department,
      municipality,
      city,
      school: chosenSchool,
      grade: role === 'Estudiante' ? grade : role,
      badgeTitle: role === 'Jurado Evaluador' ? 'Jurado de Honor' : 'Crononauta Escolar',
      level: Math.max(1, Math.floor(currentXp / 250) + 1),
      travelJumps: currentTravelCount,
      xp: currentXp,
      streakDays: currentStreak,
      lastEraVisited: currentEraText || '1954 - Primera TV',
      isCurrentUser: true,
    };

    // Save to local storage
    localStorage.setItem('leo_user_registered', 'true');
    localStorage.setItem('leo_ranking_name', profile.name);
    localStorage.setItem('leo_ranking_school', profile.school);
    localStorage.setItem('leo_ranking_grade', profile.grade);
    localStorage.setItem('leo_ranking_department', profile.department || department);
    localStorage.setItem('leo_ranking_municipality', profile.municipality || municipality);
    localStorage.setItem('leo_ranking_city', profile.city);
    localStorage.setItem('leo_ranking_avatar', profile.avatarIcon);
    localStorage.setItem('leo_ranking_suit', profile.characterSuit);

    // Notify all app components of profile update
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('leo_profile_updated', { detail: profile }));
    }

    // Close modal and notify app immediately so the screen never freezes or stays blue
    setIsSubmitting(false);
    onRegistered(profile);
    onClose();

    // Sync to Cloud Firestore Leaderboard in background without blocking the UI
    syncCharacterProfileToCloud(
      profile,
      currentTravelCount,
      currentXp,
      currentStreak,
      currentEraText
    )
      .then(() => {
        broadcastLiveActivity(
          profile,
          `¡Se unió a la Máquina del Tiempo de la Feria STEM!`,
          avatarIcon,
          25
        ).catch(() => {});
      })
      .catch(() => {
        // offline fallback
      });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/90 backdrop-blur-xl animate-fadeIn select-none overflow-y-auto">
      <div className="bg-gradient-to-b from-[#0b1633] via-[#081026] to-[#040816] border-2 border-amber-400 rounded-3xl w-full max-w-2xl max-h-[95vh] flex flex-col shadow-[0_0_80px_rgba(245,158,11,0.5)] overflow-hidden my-auto">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-amber-500/30 bg-gradient-to-r from-amber-500/25 via-sky-500/20 to-indigo-600/25 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 to-sky-400 flex items-center justify-center text-3xl shadow-lg border-2 border-amber-300">
              🇨🇴
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
                Registro Oficial de Viajero Temporal
              </h2>
            </div>
          </div>

          <button
            onClick={() => {
              sounds.playClick();
              onClose();
            }}
            className="p-2 rounded-full bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors border border-slate-600 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Motivational Banner */}
        <div className="p-3 bg-amber-500/15 border-b border-amber-400/30 text-center text-xs text-amber-200 font-medium">
          ✨ Regístrate para ingresar al <strong>Ranking en Vivo de la Feria</strong> y comenzar tu expedición histórica por el siglo XX.
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 overflow-y-auto space-y-4">
          {/* Full Name */}
          <div>
            <label className="text-xs font-bold text-amber-300 flex items-center gap-1.5 mb-1">
              <User className="w-4 h-4 text-amber-400" />
              <span>Nombre Completo del Estudiante o Visitante:</span>
            </label>
            <input
              type="text"
              required
              placeholder="Ej: Ángel David De La Barrera / Sofía Ramírez"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-slate-900 border-2 border-slate-700 focus:border-amber-400 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 outline-none transition-colors"
            />
          </div>

          {/* Role and Grade */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-sky-300 flex items-center gap-1.5 mb-1">
                <GraduationCap className="w-4 h-4 text-sky-400" />
                <span>Tu Rol:</span>
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as any)}
                className="w-full bg-slate-900 border border-slate-700 focus:border-amber-400 rounded-xl px-3 py-2 text-xs text-white outline-none cursor-pointer"
              >
                <option value="Estudiante">🎒 Estudiante</option>
                <option value="Docente">👨‍🏫 Docente / Profesor</option>
                <option value="Jurado Evaluador">⭐ Jurado Calificador STEM</option>
                <option value="Padre de Familia">👨‍👩‍👧 Padre de Familia</option>
                <option value="Visitante">👋 Visitante Invitado</option>
              </select>
            </div>

            {role === 'Estudiante' && (
              <div>
                <label className="text-xs font-bold text-sky-300 block mb-1">Grado Escolar:</label>
                <select
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 focus:border-amber-400 rounded-xl px-3 py-2 text-xs text-white outline-none cursor-pointer"
                >
                  <option value="Grado 6°">Grado 6°</option>
                  <option value="Grado 7°">Grado 7°</option>
                  <option value="Grado 8°">Grado 8°</option>
                  <option value="Grado 9°">Grado 9°</option>
                  <option value="Grado 10°">Grado 10°</option>
                  <option value="Grado 11°">Grado 11° (Promoción)</option>
                </select>
              </div>
            )}
          </div>

          {/* School Selection */}
          <div className="bg-slate-900/80 p-3.5 rounded-2xl border border-slate-800 space-y-2.5">
            <label className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
              <School className="w-4 h-4 text-amber-400" />
              <span>Institución Educativa / Colegio:</span>
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => {
                  sounds.playClick();
                  setSchoolChoice('praga');
                }}
                className={`p-2.5 rounded-xl border text-left text-xs transition-all cursor-pointer flex items-center gap-2 ${
                  schoolChoice === 'praga'
                    ? 'bg-amber-500/25 border-amber-400 text-amber-200 font-bold shadow-md'
                    : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <span className="text-base">🏫</span>
                <div className="min-w-0">
                  <div className="truncate font-black">Col. Niño Jesús De Praga</div>
                  <span className="text-[10px] text-amber-400">Colegio Anfitrión Feria STEM</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => {
                  sounds.playClick();
                  setSchoolChoice('other');
                }}
                className={`p-2.5 rounded-xl border text-left text-xs transition-all cursor-pointer flex items-center gap-2 ${
                  schoolChoice === 'other'
                    ? 'bg-sky-500/25 border-sky-400 text-sky-200 font-bold shadow-md'
                    : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <span className="text-base">🏛️</span>
                <div className="min-w-0">
                  <div className="font-bold">Otro Colegio / Institución</div>
                  <span className="text-[10px] text-slate-400">Visitante o Jurado Externo</span>
                </div>
              </button>
            </div>

            {schoolChoice === 'other' && (
              <input
                type="text"
                required
                placeholder="Escribe el nombre de tu colegio o universidad..."
                value={customSchool}
                onChange={(e) => setCustomSchool(e.target.value)}
                className="w-full bg-black/60 border border-slate-700 focus:border-amber-400 rounded-xl px-3 py-2 text-xs text-white outline-none"
              />
            )}
          </div>

          {/* Department & Municipality */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-sky-300 flex items-center gap-1 mb-1">
                <MapPin className="w-3.5 h-3.5 text-sky-400" />
                <span>Departamento:</span>
              </label>
              <select
                value={department}
                onChange={(e) => {
                  const newDept = e.target.value;
                  setDepartment(newDept);
                  const mList = getMunicipalitiesForDepartment(newDept);
                  if (mList.length > 0) setMunicipality(mList[0]);
                }}
                className="w-full bg-slate-900 border border-slate-700 focus:border-amber-400 rounded-xl px-3 py-2 text-xs text-white outline-none cursor-pointer"
              >
                {COLOMBIA_DEPARTMENTS.map((dept) => (
                  <option key={dept.name} value={dept.name}>
                    {dept.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-sky-300 block mb-1">Municipio / Ciudad:</label>
              <select
                value={municipality}
                onChange={(e) => setMunicipality(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 focus:border-amber-400 rounded-xl px-3 py-2 text-xs text-white outline-none cursor-pointer"
              >
                {municipalities.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Avatar Icon */}
          <div>
            <label className="text-xs font-bold text-amber-300 block mb-1.5">
              Elige tu Avatar de Viajero Temporal:
            </label>
            <div className="flex flex-wrap gap-2">
              {AVATAR_OPTIONS.map((icon) => (
                <button
                  key={icon}
                  type="button"
                  onClick={() => {
                    sounds.playClick();
                    setAvatarIcon(icon);
                  }}
                  className={`w-10 h-10 rounded-xl text-xl flex items-center justify-center transition-all cursor-pointer ${
                    avatarIcon === icon
                      ? 'bg-amber-400 text-black scale-110 shadow-lg ring-2 ring-amber-300'
                      : 'bg-slate-900 hover:bg-slate-800 text-white border border-slate-700'
                  }`}
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          {/* Suit Selection */}
          <div>
            <label className="text-xs font-bold text-sky-300 flex items-center gap-1.5 mb-1.5">
              <Shirt className="w-3.5 h-3.5 text-sky-400" />
              <span>Elige tu Especialidad / Traje Cuántico STEM:</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {CHARACTER_SUITS.slice(0, 4).map((suit) => (
                <button
                  key={suit.id}
                  type="button"
                  onClick={() => {
                    sounds.playClick();
                    setCharacterSuit(suit.id);
                  }}
                  className={`p-2.5 rounded-xl border text-left text-xs transition-all cursor-pointer flex items-center gap-2.5 ${
                    characterSuit === suit.id
                      ? 'bg-cyan-500/25 border-cyan-400 text-cyan-200 font-bold shadow-md'
                      : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <span className="text-2xl">{suit.icon}</span>
                  <div className="min-w-0">
                    <div className="font-bold truncate">{suit.name}</div>
                    <span className="text-[10px] text-amber-400">{suit.badge}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 hover:from-amber-300 hover:to-orange-400 text-slate-950 font-black text-sm sm:text-base flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(245,158,11,0.7)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <Zap className="w-5 h-5 fill-slate-950" />
              <span>🚀 ¡REGISTRARME EN EL RANKING NACIONAL Y EMPEZAR!</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
