import React, { useEffect, useRef } from 'react';

interface QuantumStardustCanvasProps {
  isTraveling?: boolean;
  isPartyMode?: boolean;
}

interface Particle {
  x: number;
  y: number;
  size: number;
  baseSize: number;
  speedX: number;
  speedY: number;
  color: string;
  alpha: number;
  pulseSpeed: number;
  pulseAngle: number;
}

const COSMIC_COLORS = [
  'rgba(56, 189, 248, ',   // Sky Cyan
  'rgba(245, 158, 11, ',   // Amber Gold
  'rgba(168, 85, 247, ',   // Purple Neon
  'rgba(52, 211, 153, ',   // Emerald Mint
  'rgba(244, 63, 94, ',    // Rose Laser
];

export const QuantumStardustCanvas: React.FC<QuantumStardustCanvasProps> = ({
  isTraveling = false,
  isPartyMode = false,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({ x: -1000, y: -1000, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    };

    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY, active: true };
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    // Create particle fleet
    const PARTICLE_COUNT = Math.min(85, Math.floor((width * height) / 14000));
    let particles: Particle[] = [];

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const baseSize = Math.random() * 2.2 + 0.8;
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: baseSize,
          baseSize,
          speedX: (Math.random() - 0.5) * 0.45,
          speedY: (Math.random() - 0.5) * 0.45 - 0.15,
          color: COSMIC_COLORS[Math.floor(Math.random() * COSMIC_COLORS.length)],
          alpha: Math.random() * 0.6 + 0.25,
          pulseSpeed: Math.random() * 0.03 + 0.01,
          pulseAngle: Math.random() * Math.PI * 2,
        });
      }
    };

    initParticles();

    // Render loop
    let lastTime = performance.now();
    const render = (time: number) => {
      const delta = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      ctx.clearRect(0, 0, width, height);

      // Draw subtle nebulous background gradient overlay
      const radialGlow = ctx.createRadialGradient(
        width / 2,
        height / 3,
        10,
        width / 2,
        height / 3,
        Math.max(width, height) * 0.7
      );
      if (isPartyMode) {
        radialGlow.addColorStop(0, 'rgba(147, 51, 234, 0.12)');
        radialGlow.addColorStop(0.5, 'rgba(236, 72, 153, 0.08)');
        radialGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      } else {
        radialGlow.addColorStop(0, 'rgba(14, 165, 233, 0.06)');
        radialGlow.addColorStop(0.6, 'rgba(15, 23, 42, 0.02)');
        radialGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      }
      ctx.fillStyle = radialGlow;
      ctx.fillRect(0, 0, width, height);

      const speedMultiplier = isTraveling ? 14 : isPartyMode ? 3.5 : 1;
      const mouse = mouseRef.current;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Pulse size & alpha
        p.pulseAngle += p.pulseSpeed;
        const pulse = Math.sin(p.pulseAngle);
        const currentAlpha = Math.max(0.1, Math.min(1, p.alpha + pulse * 0.2));

        // Movement
        if (isTraveling) {
          // Warp trails moving towards center bottom or radiating out
          p.x += p.speedX * 3;
          p.y += (p.baseSize * 18 + 12);
        } else {
          p.x += p.speedX * speedMultiplier;
          p.y += p.speedY * speedMultiplier;
        }

        // Wrap around borders
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;

        // Subtle mouse repulsion
        if (mouse.active && !isTraveling) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 120;
          if (dist < maxDist && dist > 0) {
            const force = (1 - dist / maxDist) * 1.8;
            p.x += (dx / dist) * force;
            p.y += (dy / dist) * force;
          }
        }

        // Draw particle
        ctx.beginPath();
        if (isTraveling) {
          // Draw streak line for warp speed effect
          ctx.strokeStyle = `${p.color}${currentAlpha * 0.9})`;
          ctx.lineWidth = p.baseSize * 1.5;
          ctx.lineCap = 'round';
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x, p.y - p.baseSize * 28);
          ctx.stroke();
        } else {
          // Circular glowing particle
          ctx.arc(p.x, p.y, p.baseSize * (1 + pulse * 0.25), 0, Math.PI * 2);
          ctx.fillStyle = `${p.color}${currentAlpha})`;
          ctx.shadowColor = p.color + '0.8)';
          ctx.shadowBlur = isPartyMode ? 14 : 8;
          ctx.fill();
          ctx.shadowBlur = 0;
        }

        // Draw occasional quantum constellation connection lines between near particles
        if (!isTraveling && i % 3 === 0) {
          for (let j = i + 1; j < Math.min(i + 4, particles.length); j++) {
            const p2 = particles[j];
            const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
            if (dist < 85) {
              ctx.beginPath();
              ctx.strokeStyle = `rgba(56, 189, 248, ${(1 - dist / 85) * 0.15})`;
              ctx.lineWidth = 0.6;
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
            }
          }
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isTraveling, isPartyMode]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-700"
      style={{ opacity: 0.85 }}
    />
  );
};
