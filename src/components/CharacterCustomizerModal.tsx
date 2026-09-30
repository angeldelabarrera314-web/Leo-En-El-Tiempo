import React, { useState } from 'react';
import { X, ArrowLeft, Sparkles, Check, Lock, Palette, Camera, Music, Smile, Shirt } from 'lucide-react';
import { AvatarItem } from '../types';
import { Leo2DAvatar } from './Leo2DAvatar';
import { sounds } from '../utils/soundEffects';
import { triggerConfetti } from '../utils/confetti';
import { getRankForPlayer } from '../data/explorerRanks';

interface CharacterCustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  coins: number;
  allItems: AvatarItem[];
  equippedItems: Record<string, AvatarItem>;
  onEquipItem: (item: AvatarItem) => void;
  onUnlockItem: (item: AvatarItem) => void;
  travelCount?: number;
  xp?: number;
}

export const CharacterCustomizerModal: React.FC<CharacterCustomizerModalProps> = ({
  isOpen,
  onClose,
  coins,
  allItems,
  equippedItems = {},
  onEquipItem,
  onUnlockItem,
  travelCount = 1,
  xp = 50,
}) => {
  const [activeTab, setActiveTab] = useState<'hat' | 'glasses' | 'suit' | 'badge'>('hat');
  const [avatarPose, setAvatarPose] = useState<'idle' | 'wave' | 'celebrate'>('idle');
  const [funQuote, setFunQuote] = useState<string>('¡Elige un atuendo histórico para viajar en el tiempo!');

  const { currentRank, fluxIntensity } = getRankForPlayer(travelCount, xp);

  if (!isOpen) return null;

  const filteredItems = allItems.filter((item) => item.category === activeTab);

  const handleDance = () => {
    sounds.playFanfare();
    triggerConfetti(0.3, 0.4);
    setAvatarPose('celebrate');
    setFunQuote('¡Wuuu! ¡Con este estilo estoy listo para explorar cualquier rincón de Colombia!');
    setTimeout(() => setAvatarPose('idle'), 1500);
  };

  const handleWave = () => {
    sounds.playPop();
    setAvatarPose('wave');
    setFunQuote('¡Hola! Soy Leo el explorador. ¿Qué año del siglo XX visitaremos hoy?');
    setTimeout(() => setAvatarPose('idle'), 1200);
  };

  const handlePhoto = () => {
    sounds.playSiriDone();
    triggerConfetti(0.5, 0.5);
    setFunQuote('📸 ¡Foto instantánea guardada en el diario de viaje escolar!');
  };

  const handleEquip = (item: AvatarItem) => {
    sounds.playPop();
    onEquipItem(item);
    setFunQuote(`¡Te pusiste: ${item.name}! Luce increíble.`);
  };

  const handleUnlock = (item: AvatarItem) => {
    if (coins >= item.cost) {
      sounds.playCoin();
      sounds.playFanfare();
      triggerConfetti(0.7, 0.5);
      onUnlockItem(item);
      setFunQuote(`¡Desbloqueaste ${item.name}! Ya es tuyo para siempre.`);
    }
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl bg-gradient-to-b from-[#101b38] via-[#0d162d] to-[#070d1c] border-2 border-amber-400/50 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
      >
        {/* Header */}
        <div className="p-3.5 sm:p-4 bg-[#142347] border-b border-amber-500/30 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <button
              onClick={onClose}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border border-amber-400/40 text-xs font-bold transition-all hover:scale-105"
              title="Volver al Laboratorio Cuántico"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Volver atrás</span>
            </button>

            <div className="p-2 rounded-2xl bg-amber-500/20 text-amber-300 border border-amber-400/30 hidden sm:flex">
              <Shirt className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <span>Taller & Vestidor 2D de Leo</span>
                <span className="text-xs bg-amber-500/20 text-amber-300 border border-amber-400/30 px-2.5 py-0.5 rounded-full flex items-center gap-1 font-digital">
                  ⚡ {coins} Monedas
                </span>
              </h3>
              <div className="flex flex-wrap items-center gap-2 mt-1">
                <span className="text-[11px] bg-gradient-to-r from-amber-500/30 to-orange-500/30 text-amber-300 border border-amber-400/50 px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                  <span>{currentRank.badgeIcon}</span>
                  <span>Rango: {currentRank.title} (Nivel {currentRank.level})</span>
                </span>
                <span className="text-[11px] text-sky-300 font-digital">
                  🚀 {travelCount} viajes • ⚡ {fluxIntensity}% Flujo Cuántico
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content: Two-column layout on medium+ screens */}
        <div className="flex-1 overflow-y-auto grid grid-cols-1 md:grid-cols-12 gap-4 p-3 sm:p-5">
          {/* Left Column: Live 2D Stage */}
          <div className="md:col-span-5 flex flex-col items-center justify-between bg-gradient-to-b from-[#14244a] to-[#0b1329] border border-sky-400/30 rounded-3xl p-4 shadow-inner relative overflow-hidden">
            {/* Background Studio Lights */}
            <div className="absolute top-0 inset-x-0 h-32 bg-radial from-amber-400/20 via-sky-400/10 to-transparent pointer-events-none" />

            {/* Speech bubble above Leo */}
            <div className="relative mb-2 w-full bg-[#182c59] border border-sky-400/40 rounded-2xl p-2.5 text-center text-xs text-sky-100 font-medium shadow-md">
              <span className="text-amber-400 font-bold block mb-0.5">💬 Leo dice:</span>
              "{funQuote}"
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#182c59] rotate-45 border-r border-b border-sky-400/40" />
            </div>

            {/* The 2D Avatar */}
            <div className="my-2 relative flex items-center justify-center">
              <Leo2DAvatar
                equippedItems={equippedItems}
                size="hero"
                interactive={true}
                pose={avatarPose}
                onTap={() => {
                  handleWave();
                }}
              />
            </div>

            {/* Stage Pedestal */}
            <div className="w-48 h-6 bg-gradient-to-r from-sky-500/20 via-sky-400/50 to-indigo-500/20 rounded-full border border-sky-400/50 shadow-[0_0_20px_rgba(56,189,248,0.5)] flex items-center justify-center -mt-4 mb-3">
              <div className="w-32 h-2 bg-sky-300/40 rounded-full blur-xs" />
            </div>

            {/* Interactive Actions for Kids */}
            <div className="w-full flex items-center justify-center gap-2 pt-2 border-t border-slate-700/50">
              <button
                onClick={handleDance}
                className="py-1.5 px-3 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-black text-xs font-bold shadow-md hover:scale-105 transition-transform flex items-center gap-1"
                title="Hacer bailar a Leo"
              >
                <Music className="w-3.5 h-3.5" />
                <span>¡Bailar!</span>
              </button>

              <button
                onClick={handleWave}
                className="py-1.5 px-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-white text-xs font-bold shadow-md hover:scale-105 transition-transform flex items-center gap-1"
                title="Saludar"
              >
                <Smile className="w-3.5 h-3.5" />
                <span>Saludar</span>
              </button>

              <button
                onClick={handlePhoto}
                className="py-1.5 px-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow-md hover:scale-105 transition-transform flex items-center gap-1"
                title="Tomar foto con estilo"
              >
                <Camera className="w-3.5 h-3.5" />
                <span>Foto</span>
              </button>
            </div>
          </div>

          {/* Right Column: Wardrobe Racks & Categories */}
          <div className="md:col-span-7 flex flex-col">
            {/* Category Tabs */}
            <div className="grid grid-cols-4 p-1.5 bg-[#0e1934] border border-slate-800 rounded-2xl gap-1 text-center mb-3">
              {(['hat', 'glasses', 'suit', 'badge'] as const).map((cat) => {
                const labels = {
                  hat: 'Sombreros',
                  glasses: 'Gafas',
                  suit: 'Trajes',
                  badge: 'Insignias',
                };
                const icons = {
                  hat: '🤠',
                  glasses: '🥽',
                  suit: '🦺',
                  badge: '🇨🇴',
                };

                return (
                  <button
                    key={cat}
                    onClick={() => {
                      sounds.playClick();
                      setActiveTab(cat);
                    }}
                    className={`py-2 px-1 rounded-xl text-xs font-bold transition-all flex flex-col sm:flex-row items-center justify-center gap-1 ${
                      activeTab === cat
                        ? 'bg-amber-500 text-black shadow-md scale-102'
                        : 'bg-[#152549] text-slate-300 hover:bg-[#1c3263]'
                    }`}
                  >
                    <span>{icons[cat]}</span>
                    <span>{labels[cat]}</span>
                  </button>
                );
              })}
            </div>

            {/* Items Grid */}
            <div className="flex-1 overflow-y-auto space-y-2.5 pr-1 max-h-[50vh] md:max-h-[55vh]">
              {filteredItems.map((item) => {
                const isEquipped = equippedItems[item.category]?.id === item.id;

                return (
                  <div
                    key={item.id}
                    className={`p-3 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                      isEquipped
                        ? 'bg-amber-500/20 border-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.3)]'
                        : 'bg-[#142345] hover:bg-[#182b54] border-slate-700/60'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-[#0a1122] border border-amber-400/40 flex items-center justify-center text-2xl flex-shrink-0 shadow-inner">
                        {item.icon}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-white">
                            {item.name}
                          </h4>
                          {isEquipped && (
                            <span className="text-[10px] font-bold bg-amber-400 text-black px-1.5 py-0.2 rounded-md">
                              PUESTO
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-300 mt-0.5 leading-snug">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex-shrink-0">
                      {!item.unlocked ? (
                        <button
                          onClick={() => handleUnlock(item)}
                          disabled={coins < item.cost}
                          className="py-1.5 px-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black text-xs font-bold disabled:opacity-40 disabled:cursor-not-allowed shadow-md hover:scale-105 transition-transform flex items-center gap-1 whitespace-nowrap"
                        >
                          <Lock className="w-3.5 h-3.5" />
                          <span>{item.cost} ⚡</span>
                        </button>
                      ) : isEquipped ? (
                        <span className="text-xs font-bold text-amber-400 flex items-center gap-1 px-3 py-1 bg-amber-500/10 rounded-xl border border-amber-400/40">
                          <Check className="w-3.5 h-3.5" /> Equipado
                        </span>
                      ) : (
                        <button
                          onClick={() => handleEquip(item)}
                          className="py-1.5 px-3.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white text-xs font-bold shadow-md hover:scale-105 transition-transform"
                        >
                          Equipar
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
