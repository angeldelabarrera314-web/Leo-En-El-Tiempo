import React, { useEffect, useRef } from 'react';
import { Sparkles, Trophy, Star } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface QuantumFireworksOverlayProps {
  isActive: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  color: string;
  size: number;
  decay: number;
  gravity: number;
}

interface Rocket {
  x: number;
  y: number;
  targetY: number;
  vy: number;
  color: string;
}

export const QuantumFireworksOverlay: React.FC<QuantumFireworksOverlayProps> = ({
  isActive,
  onClose,
  title = '¡LOGRO SECRETO DESBLOQUEADO: POLÍGLOTA DEL TIEMPO!',
  subtitle = '¡Completaste 3 obras literarias maestras sin cometer un solo error!',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!isActive) return;

    sounds.playFanfare();
    sounds.playWheelJackpot();

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const handleResize = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };
    window.addEventListener('resize', handleResize);

    const colors = [
      '#f59e0b', // Amber / Gold
      '#06b6d4', // Cyan
      '#ec4899', // Pink
      '#8b5cf6', // Purple
      '#10b981', // Emerald
      '#ef4444', // Red
      '#38bdf8', // Sky
      '#fbbf24', // Yellow
    ];

    let particles: Particle[] = [];
    let rockets: Rocket[] = [];
    let animationId: number;

    const createExplosion = (x: number, y: number, color: string) => {
      sounds.playPop();
      const count = 75 + Math.floor(Math.random() * 40);
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 2 + Math.random() * 6;
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1,
          color,
          size: 2.5 + Math.random() * 3.5,
          decay: 0.012 + Math.random() * 0.015,
          gravity: 0.09,
        });
      }
    };

    const launchRocket = () => {
      const x = Math.random() * canvas.width * 0.8 + canvas.width * 0.1;
      const targetY = Math.random() * canvas.height * 0.45 + canvas.height * 0.1;
      const color = colors[Math.floor(Math.random() * colors.length)];
      rockets.push({
        x,
        y: canvas.height,
        targetY,
        vy: -(11 + Math.random() * 5),
        color,
      });
    };

    // Initial volley of rockets
    for (let i = 0; i < 5; i++) {
      setTimeout(launchRocket, i * 280);
    }

    // Ongoing launches
    const rocketInterval = setInterval(() => {
      launchRocket();
      if (Math.random() > 0.4) {
        setTimeout(launchRocket, 180);
      }
    }, 450);

    const render = () => {
      ctx.fillStyle = 'rgba(4, 9, 23, 0.22)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw rockets
      for (let i = rockets.length - 1; i >= 0; i--) {
        const r = rockets[i];
        r.y += r.vy;

        ctx.beginPath();
        ctx.arc(r.x, r.y, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = r.color;
        ctx.shadowColor = r.color;
        ctx.shadowBlur = 12;
        ctx.fill();

        // Trail
        ctx.beginPath();
        ctx.moveTo(r.x, r.y);
        ctx.lineTo(r.x, r.y + 16);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.lineWidth = 2;
        ctx.stroke();

        if (r.y <= r.targetY) {
          createExplosion(r.x, r.y, r.color);
          rockets.splice(i, 1);
        }
      }

      // Update and draw explosion particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;
        p.vx *= 0.985;
        p.vy *= 0.985;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.restore();
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    const autoCloseTimer = setTimeout(() => {
      onClose();
    }, 8500);

    return () => {
      clearInterval(rocketInterval);
      clearTimeout(autoCloseTimer);
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, [isActive, onClose]);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center pointer-events-auto bg-black/60 backdrop-blur-xs select-none animate-fadeIn">
      {/* Dynamic Canvas with fireworks rockets & sparkles */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      {/* Floating Glorious Celebration Banner */}
      <div className="relative z-10 max-w-xl mx-4 p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#1b1542]/95 via-[#0e1736]/95 to-[#090e24]/95 border-2 border-amber-400 shadow-[0_0_60px_rgba(245,158,11,0.8)] text-center space-y-4 animate-bounceIn">
        {/* Glow halo */}
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-48 h-48 bg-amber-400/25 rounded-full blur-3xl pointer-events-none" />

        {/* Trophy icon */}
        <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto rounded-3xl bg-gradient-to-tr from-amber-400 via-yellow-300 to-orange-500 border-4 border-white flex items-center justify-center text-4xl sm:text-5xl shadow-[0_0_35px_rgba(245,158,11,0.9)] animate-pulse">
          🏆
        </div>

        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/60 text-amber-300 text-xs font-black uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Factor Sorpresa Épico</span>
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          </div>

          <h2 className="text-xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-amber-300 to-orange-400 drop-shadow-md">
            {title}
          </h2>

          <p className="text-sm sm:text-base text-slate-200 font-medium max-w-md mx-auto leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Rewards badge */}
        <div className="flex items-center justify-center gap-3 pt-2">
          <div className="bg-sky-500/20 border border-sky-400/40 px-4 py-2 rounded-2xl flex items-center gap-2 text-sky-200 font-bold text-sm">
            <span>⚡</span>
            <span>+150 XP de Lengua</span>
          </div>

          <div className="bg-amber-500/20 border border-amber-400/40 px-4 py-2 rounded-2xl flex items-center gap-2 text-amber-300 font-bold text-sm">
            <span>🪙</span>
            <span>+80 Monedas Cuánticas</span>
          </div>
        </div>

        <div className="pt-3">
          <button
            onClick={() => {
              sounds.playClick();
              onClose();
            }}
            className="px-8 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black font-black text-sm tracking-wide shadow-xl transition-all hover:scale-105 active:scale-95 border border-amber-300"
          >
            ¡Continuar Explorando con Honor!
          </button>
        </div>
      </div>
    </div>
  );
};
