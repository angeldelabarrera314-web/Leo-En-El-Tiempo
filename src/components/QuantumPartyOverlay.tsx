import React, { useEffect } from 'react';
import { Sparkles, Zap, Flame, X } from 'lucide-react';
import { triggerConfetti } from '../utils/confetti';
import { sounds } from '../utils/soundEffects';

interface QuantumPartyOverlayProps {
  isActive: boolean;
  onClose: () => void;
}

export const QuantumPartyOverlay: React.FC<QuantumPartyOverlayProps> = ({
  isActive,
  onClose,
}) => {
  useEffect(() => {
    if (!isActive) return;

    // Trigger celebratory confetti bursts at intervals
    triggerConfetti(0.5, 0.4);
    const interval = setInterval(() => {
      triggerConfetti(0.2 + Math.random() * 0.6, 0.3 + Math.random() * 0.4);
    }, 1800);

    // Auto close after 12 seconds
    const timeout = setTimeout(() => {
      onClose();
    }, 12000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [isActive, onClose]);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden select-none animate-fadeIn">
      {/* Top Banner with Close Button */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 pointer-events-auto bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 text-white font-black px-6 py-2.5 rounded-full shadow-[0_0_40px_rgba(236,72,153,0.8)] border-2 border-white/60 flex items-center gap-3 animate-bounce">
        <Sparkles className="w-5 h-5 text-yellow-200 animate-spin" />
        <span className="text-sm sm:text-base tracking-wider uppercase drop-shadow-md">
          🎉 ¡Sobrecarga Cuántica & Fiesta Temporal de Leo!
        </span>
        <button
          onClick={() => {
            sounds.playClick();
            onClose();
          }}
          className="ml-2 p-1 rounded-full bg-black/40 hover:bg-black/60 text-white transition-colors"
          title="Cerrar fiesta"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Sweeping Laser Light Beams */}
      <div className="absolute -top-40 left-1/4 w-96 h-[120vh] bg-gradient-to-b from-cyan-400/20 via-pink-500/10 to-transparent rotate-12 blur-2xl animate-pulse pointer-events-none" />
      <div className="absolute -top-40 right-1/4 w-96 h-[120vh] bg-gradient-to-b from-amber-400/20 via-purple-500/10 to-transparent -rotate-12 blur-2xl animate-pulse pointer-events-none" />

      {/* Pulsing Edge Border Aura */}
      <div className="absolute inset-0 border-4 border-pink-500/40 rounded-none shadow-[inset_0_0_60px_rgba(236,72,153,0.3)] animate-pulse" />
    </div>
  );
};
