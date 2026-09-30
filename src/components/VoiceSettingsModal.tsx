import React, { useState, useEffect } from 'react';
import {
  X,
  ArrowLeft,
  Volume2,
  Sliders,
  Sparkles,
  Check,
  Info,
  Radio,
  UserCheck,
  Wind,
  Activity,
  Award,
} from 'lucide-react';
import { LeoVoiceSettings, ProsodyMode } from '../types';
import { leoVoice, AvailableVoiceOption, PROSODY_PROFILES } from '../utils/leoVoice';
import { sounds } from '../utils/soundEffects';

interface VoiceSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: LeoVoiceSettings;
  onUpdateSettings: (newSettings: Partial<LeoVoiceSettings>) => void;
  onTestVoice: () => void;
}

export const VoiceSettingsModal: React.FC<VoiceSettingsModalProps> = ({
  isOpen,
  onClose,
  settings,
  onUpdateSettings,
  onTestVoice,
}) => {
  const [voices, setVoices] = useState<AvailableVoiceOption[]>([]);
  const [selectedVoiceName, setSelectedVoiceName] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'prosodia' | 'calibracion' | 'voces'>('prosodia');

  useEffect(() => {
    if (isOpen) {
      const vList = leoVoice.getAvailableSpanishVoices();
      setVoices(vList);
      const current = leoVoice.getBestSpanishVoice();
      if (current) {
        setSelectedVoiceName(current.name);
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSelectVoice = (name: string) => {
    setSelectedVoiceName(name);
    leoVoice.setPreferredVoice(name);
    sounds.playClick();
  };

  const handleSelectProsodyMode = (mode: ProsodyMode) => {
    sounds.playClick();
    const profile = PROSODY_PROFILES.find((p) => p.id === mode);
    if (profile) {
      onUpdateSettings({
        prosodyMode: mode,
        pitch: profile.defaultPitch,
        rate: profile.defaultRate,
        prosodicPauses: true,
      });
    } else {
      onUpdateSettings({ prosodyMode: mode });
    }
  };

  const currentProsodyMode = settings.prosodyMode || 'humano';
  const prosodicInflection =
    typeof settings.prosodicInflection === 'number' ? settings.prosodicInflection : 0.12;
  const prosodicPauses = settings.prosodicPauses !== false;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-xl bg-gradient-to-b from-[#132247] via-[#0e1935] to-[#0a1224] border-2 border-sky-400/40 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
      >
        {/* Header */}
        <div className="p-3.5 sm:p-4 bg-[#182a57] border-b border-sky-500/30 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <button
              onClick={onClose}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-500/20 hover:bg-sky-500/30 text-sky-200 border border-sky-400/40 text-xs font-bold transition-all hover:scale-105"
              title="Volver a la máquina del tiempo"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Volver</span>
            </button>

            <div className="p-2 rounded-2xl bg-amber-500/20 text-amber-300 border border-amber-400/30 hidden sm:flex">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                Motor de Prosodia y Voz de Leo
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                  Prosodia Humana
                </span>
              </h3>
              <p className="text-[11px] text-sky-200">
                Ajustes de cadencia, entonación emocional y pausas de respiración
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="px-4 pt-3 pb-1 border-b border-sky-500/20 bg-[#0e1832] flex gap-2">
          <button
            onClick={() => {
              sounds.playClick();
              setActiveTab('prosodia');
            }}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'prosodia'
                ? 'bg-gradient-to-r from-sky-500 to-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>Prosodia & Entonación</span>
          </button>
          <button
            onClick={() => {
              sounds.playClick();
              setActiveTab('calibracion');
            }}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'calibracion'
                ? 'bg-gradient-to-r from-sky-500 to-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Tono & Velocidad</span>
          </button>
          <button
            onClick={() => {
              sounds.playClick();
              setActiveTab('voces');
            }}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'voces'
                ? 'bg-gradient-to-r from-sky-500 to-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Radio className="w-3.5 h-3.5" />
            <span>Voces ({voices.length})</span>
          </button>
        </div>

        {/* Body */}
        <div className="p-4 sm:p-5 space-y-4 overflow-y-auto">
          {activeTab === 'prosodia' && (
            <div className="space-y-4 animate-fadeIn">
              {/* Prosody Profiles Cards */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-sky-200 uppercase tracking-wider block">
                    Perfiles de Prosodia y Modulación
                  </span>
                  <span className="text-[10px] text-amber-300 font-medium">
                    Evita la lectura monótona robótica
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {PROSODY_PROFILES.map((profile) => {
                    const isSelected = currentProsodyMode === profile.id;
                    return (
                      <button
                        key={profile.id}
                        onClick={() => handleSelectProsodyMode(profile.id)}
                        className={`p-3 rounded-2xl border text-left transition-all relative overflow-hidden group ${
                          isSelected
                            ? 'bg-gradient-to-br from-indigo-950/80 via-[#14234b] to-[#0c1836] border-amber-400/90 shadow-[0_0_15px_rgba(251,191,36,0.25)] ring-1 ring-amber-400/50'
                            : 'bg-[#0b1429] hover:bg-sky-950/60 border-sky-500/30'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2 mb-1.5">
                          <div className="flex items-center gap-2">
                            <span className="text-xl">{profile.icon}</span>
                            <div>
                              <div className="text-xs font-bold text-white group-hover:text-amber-300 flex items-center gap-1.5">
                                {profile.title}
                                {isSelected && (
                                  <Check className="w-3.5 h-3.5 text-amber-400 stroke-[3]" />
                                )}
                              </div>
                              <div className="text-[10px] text-slate-400">{profile.subtitle}</div>
                            </div>
                          </div>
                          <span
                            className={`text-[9px] uppercase font-bold px-1.5 py-0.5 rounded-full ${
                              isSelected
                                ? 'bg-amber-400/20 text-amber-300 border border-amber-400/40'
                                : 'bg-slate-800 text-slate-400'
                            }`}
                          >
                            {profile.badge}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-300 leading-snug">
                          {profile.description}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Natural Breathing Pauses Toggle */}
              <div className="bg-[#0b1429] p-3.5 rounded-2xl border border-sky-500/25 space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-start gap-2.5">
                    <div className="p-1.5 rounded-xl bg-sky-500/20 text-sky-300 shrink-0 mt-0.5">
                      <Wind className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-white block">
                        Respiración Prosódica Orgánica
                      </span>
                      <span className="text-[11px] text-slate-300 leading-relaxed">
                        Introduce micro-pausas naturales (110ms a 240ms) en comas y oraciones, simulando la respiración humana.
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      sounds.playClick();
                      onUpdateSettings({ prosodicPauses: !prosodicPauses });
                    }}
                    className={`w-11 h-6 rounded-full transition-colors relative p-1 shrink-0 ${
                      prosodicPauses ? 'bg-emerald-500' : 'bg-slate-700'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full bg-white transition-transform ${
                        prosodicPauses ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                {/* Prosodic Inflection Intensity Slider */}
                <div className="pt-2 border-t border-slate-800/80 space-y-1.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-slate-200 flex items-center gap-1.5">
                      <Activity className="w-3.5 h-3.5 text-amber-400" />
                      Intensidad de Modulación Entonativa:
                    </span>
                    <span className="font-mono text-amber-300 font-bold text-xs">
                      {Math.round((prosodicInflection / 0.25) * 100)}% (±{(prosodicInflection * 100).toFixed(0)}%)
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0.0"
                    max="0.25"
                    step="0.01"
                    value={prosodicInflection}
                    onChange={(e) =>
                      onUpdateSettings({ prosodicInflection: parseFloat(e.target.value) })
                    }
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none accent-amber-400 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-medium">
                    <span>Sutil / Serena</span>
                    <span>Natural Equilibrada (12%)</span>
                    <span>Muy Expresiva</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'calibracion' && (
            <div className="space-y-4 animate-fadeIn">
              {/* Quick Preset Buttons */}
              <div>
                <span className="text-xs font-bold text-sky-200 uppercase tracking-wider block mb-2">
                  Preajustes de Entonación Base
                </span>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => {
                      sounds.playClick();
                      onUpdateSettings({ pitch: 1.02, rate: 0.96 });
                    }}
                    className="p-2.5 rounded-2xl bg-[#0b1429] hover:bg-sky-950/60 border border-sky-500/30 text-left transition-all group hover:scale-[1.02]"
                  >
                    <div className="text-base mb-1">👦</div>
                    <div className="text-xs font-bold text-white group-hover:text-amber-300">Explorador Natural</div>
                    <div className="text-[10px] text-slate-400">1.02x tono • 0.96x ritmo</div>
                  </button>

                  <button
                    onClick={() => {
                      sounds.playClick();
                      onUpdateSettings({ pitch: 1.00, rate: 0.92 });
                    }}
                    className="p-2.5 rounded-2xl bg-[#0b1429] hover:bg-sky-950/60 border border-sky-500/30 text-left transition-all group hover:scale-[1.02]"
                  >
                    <div className="text-base mb-1">📚</div>
                    <div className="text-xs font-bold text-white group-hover:text-emerald-300">Profe Amigable</div>
                    <div className="text-[10px] text-slate-400">1.00x tono • 0.92x ritmo</div>
                  </button>

                  <button
                    onClick={() => {
                      sounds.playClick();
                      onUpdateSettings({ pitch: 0.94, rate: 0.90 });
                    }}
                    className="p-2.5 rounded-2xl bg-[#0b1429] hover:bg-sky-950/60 border border-sky-500/30 text-left transition-all group hover:scale-[1.02]"
                  >
                    <div className="text-base mb-1">🎙️</div>
                    <div className="text-xs font-bold text-white group-hover:text-sky-300">Radio Histórica</div>
                    <div className="text-[10px] text-slate-400">0.94x tono • 0.90x ritmo</div>
                  </button>
                </div>
              </div>

              {/* Master Toggles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex items-center justify-between bg-[#0b1429] p-3 rounded-2xl border border-sky-500/20">
                  <span className="text-xs font-semibold text-white">Voz de Leo</span>
                  <button
                    onClick={() => onUpdateSettings({ enabled: !settings.enabled })}
                    className={`w-11 h-6 rounded-full transition-colors relative p-1 ${
                      settings.enabled ? 'bg-amber-500' : 'bg-slate-700'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full bg-white transition-transform ${
                        settings.enabled ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between bg-[#0b1429] p-3 rounded-2xl border border-sky-500/20">
                  <div>
                    <span className="text-xs font-semibold text-white block">Auto-Lectura al Viajar</span>
                    <span className="text-[10px] text-slate-400">Habla al llegar al año</span>
                  </div>
                  <button
                    onClick={() => onUpdateSettings({ autoSpeak: !settings.autoSpeak })}
                    className={`w-11 h-6 rounded-full transition-colors relative p-1 ${
                      settings.autoSpeak ? 'bg-sky-500' : 'bg-slate-700'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full bg-white transition-transform ${
                        settings.autoSpeak ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Pitch & Speed Sliders */}
              <div className="space-y-3 bg-[#0b1429] p-3.5 rounded-2xl border border-sky-500/20">
                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-slate-300">
                    <span className="font-semibold">Tono Base Natural (Pitch):</span>
                    <span className="font-mono text-amber-300 font-bold">{settings.pitch.toFixed(2)}x</span>
                  </div>
                  <input
                    type="range"
                    min="0.80"
                    max="1.30"
                    step="0.02"
                    value={settings.pitch}
                    onChange={(e) => onUpdateSettings({ pitch: parseFloat(e.target.value) })}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none accent-amber-400 cursor-pointer"
                  />
                  <p className="text-[10px] text-slate-400">
                    Valores entre 0.98x y 1.04x son ideales para evitar sonido de ardilla o robótico agudo.
                  </p>
                </div>

                <div className="space-y-1 pt-1 border-t border-slate-800/80">
                  <div className="flex justify-between text-xs text-slate-300">
                    <span className="font-semibold">Cadencia Natural (Velocidad de habla):</span>
                    <span className="font-mono text-sky-300 font-bold">{settings.rate.toFixed(2)}x</span>
                  </div>
                  <input
                    type="range"
                    min="0.80"
                    max="1.25"
                    step="0.02"
                    value={settings.rate}
                    onChange={(e) => onUpdateSettings({ rate: parseFloat(e.target.value) })}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none accent-sky-400 cursor-pointer"
                  />
                  <p className="text-[10px] text-slate-400">
                    Un ritmo de 0.94x - 0.98x permite asimilar mejor los acontecimientos históricos.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'voces' && (
            <div className="space-y-3 animate-fadeIn">
              {voices.length > 0 ? (
                <div className="space-y-2 bg-[#0b1429] p-3.5 rounded-2xl border border-sky-500/20">
                  <label className="text-xs font-semibold text-white flex items-center justify-between">
                    <span>Voces en Español Detectadas:</span>
                    <span className="text-[10px] text-sky-400">{voices.length} disponibles</span>
                  </label>
                  <select
                    value={selectedVoiceName}
                    onChange={(e) => handleSelectVoice(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-900 text-slate-200 border border-sky-500/40 text-xs font-medium focus:outline-none focus:border-amber-400"
                  >
                    {voices.map((v) => (
                      <option key={v.name} value={v.name}>
                        {v.isNatural ? '⭐ ' : ''}{v.name} ({v.lang})
                      </option>
                    ))}
                  </select>
                  <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
                    ⭐ Las voces identificadas como <strong className="text-amber-300">Naturales / Neurales</strong> (Google, Microsoft Online, Paulina Siri) tienen síntesis fonética avanzada que reproduce la entonación con máxima fidelidad.
                  </p>
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-400/30 text-xs text-amber-200">
                  Cargando catálogo de voces del navegador... Si tardan en aparecer, pulsa en Probar Voz.
                </div>
              )}

              {/* System info */}
              <div className="p-3 rounded-2xl bg-sky-900/30 border border-sky-500/30 flex gap-2.5 items-start">
                <Info className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div className="text-xs text-slate-300 leading-relaxed">
                  <strong className="text-amber-300">Normalización Fonética Colombiana Activa:</strong>
                  <p className="mt-0.5 text-slate-300 text-[11px]">
                    El motor traduce automáticamente abreviaturas como <em>s. XX</em> a "siglo veinte", <em>a.C./d.C.</em> y símbolos para que nunca se escuchen robóticos o deletreados.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Test Voice Button */}
          <button
            onClick={onTestVoice}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(251,191,36,0.35)] transition-all flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95"
          >
            <Volume2 className="w-4 h-4" />
            <span>Escuchar Demostración con Prosodia Humana</span>
          </button>
        </div>
      </div>
    </div>
  );
};
