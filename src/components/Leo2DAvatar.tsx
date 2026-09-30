import React, { useState, useEffect } from 'react';
import { AvatarItem } from '../types';
import { sounds } from '../utils/soundEffects';

interface Leo2DAvatarProps {
  equippedItems?: Record<string, AvatarItem>;
  size?: 'sm' | 'md' | 'lg' | 'hero' | number;
  speaking?: boolean;
  interactive?: boolean;
  onTap?: () => void;
  pose?: 'idle' | 'wave' | 'celebrate' | 'think';
  className?: string;
  emotion?: string;
}

export const Leo2DAvatar: React.FC<Leo2DAvatarProps> = ({
  equippedItems = {},
  size = 'md',
  speaking = false,
  interactive = true,
  onTap,
  pose = 'idle',
  className = '',
  emotion,
}) => {
  const [isBlinking, setIsBlinking] = useState(false);
  const [mouthOpen, setMouthOpen] = useState(false);
  const [isJumping, setIsJumping] = useState(false);
  const [currentPose, setCurrentPose] = useState(pose);

  // Periodic blinking effect
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 160);
    }, 3500 + Math.random() * 2000);

    return () => clearInterval(blinkInterval);
  }, []);

  // Mouth movement while speaking
  useEffect(() => {
    let mouthInterval: any;
    if (speaking || emotion === 'talking') {
      mouthInterval = setInterval(() => {
        setMouthOpen((prev) => !prev);
      }, 140);
    } else {
      setMouthOpen(false);
    }
    return () => clearInterval(mouthInterval);
  }, [speaking, emotion]);

  const handleCharacterClick = () => {
    if (!interactive) return;
    sounds.playPop();
    setIsJumping(true);
    setCurrentPose('celebrate');
    setTimeout(() => {
      setIsJumping(false);
      setCurrentPose('idle');
    }, 700);

    if (onTap) {
      onTap();
    }
  };

  // Dimensions based on size preset
  const containerDimensions: Record<string, string> = {
    sm: 'w-16 h-20',
    md: 'w-32 h-40',
    lg: 'w-48 h-60',
    hero: 'w-64 h-80 sm:w-72 sm:h-96',
  };

  const dimClass = typeof size === 'string' ? containerDimensions[size] || containerDimensions.md : 'w-24 h-28';
  const customInlineStyle = typeof size === 'number' ? { width: size, height: size } : undefined;

  const safeEquipped: Record<string, AvatarItem | undefined> = equippedItems || {};
  const hatId = safeEquipped['hat']?.id;
  const glassesId = safeEquipped['glasses']?.id;
  const suitId = safeEquipped['suit']?.id;
  const badgeId = safeEquipped['badge']?.id;

  return (
    <div
      onClick={handleCharacterClick}
      style={customInlineStyle}
      className={`relative inline-flex items-center justify-center select-none ${dimClass} ${
        interactive ? 'cursor-pointer group' : ''
      } ${isJumping ? 'animate-bounce' : ''} ${className}`}
      title={interactive ? '¡Toca a Leo para interactuar con él!' : undefined}
    >
      {/* 2D SVG Character Renderer */}
      <svg
        viewBox="0 0 200 250"
        className="w-full h-full drop-shadow-[0_10px_20px_rgba(0,0,0,0.4)] transition-transform duration-300 group-hover:scale-105"
      >
        <defs>
          {/* Skin & Hair Gradients */}
          <linearGradient id="skinGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffd8b3" />
            <stop offset="100%" stopColor="#f5be94" />
          </linearGradient>

          <linearGradient id="hairGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#5c3317" />
            <stop offset="100%" stopColor="#3d1f0a" />
          </linearGradient>

          {/* Vest Gradients */}
          <linearGradient id="explorerVest" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#d4a359" />
            <stop offset="100%" stopColor="#b38237" />
          </linearGradient>

          <linearGradient id="liquiliquiGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#e2e8f0" />
          </linearGradient>

          <linearGradient id="ruanaGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#854d0e" />
            <stop offset="50%" stopColor="#b45309" />
            <stop offset="100%" stopColor="#78350f" />
          </linearGradient>

          {/* Steampunk Glasses Glow */}
          <radialGradient id="goggleGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#0284c7" stopOpacity="0.7" />
          </radialGradient>

          {/* Shadow beneath Leo */}
          <ellipse id="groundShadow" cx="100" cy="242" rx="45" ry="7" fill="#000000" opacity="0.25" />
        </defs>

        {/* Dynamic Shadow */}
        <use href="#groundShadow" />

        {/* Legs & Boots */}
        <g id="legs">
          {/* Left Leg & Explorer Cargo Pants */}
          <path d="M 82 170 L 78 220 L 92 220 L 95 170 Z" fill="#2d3748" />
          {/* Left Boot */}
          <path d="M 74 218 L 74 235 Q 74 240 85 240 L 96 240 L 96 218 Z" fill="#78350f" />
          <line x1="78" y1="225" x2="90" y2="225" stroke="#f59e0b" strokeWidth="1.5" />
          <line x1="78" y1="229" x2="90" y2="229" stroke="#f59e0b" strokeWidth="1.5" />

          {/* Right Leg & Explorer Cargo Pants */}
          <path d="M 105 170 L 108 220 L 122 220 L 118 170 Z" fill="#2d3748" />
          {/* Right Boot */}
          <path d="M 104 218 L 104 240 L 115 240 Q 126 240 126 235 L 126 218 Z" fill="#78350f" />
          <line x1="108" y1="225" x2="120" y2="225" stroke="#f59e0b" strokeWidth="1.5" />
          <line x1="108" y1="229" x2="120" y2="229" stroke="#f59e0b" strokeWidth="1.5" />
        </g>

        {/* Arms */}
        <g id="arms">
          {/* Left Arm: Posed or waving */}
          {currentPose === 'celebrate' || currentPose === 'wave' ? (
            <g className="origin-[65px_120px] -rotate-45 transition-transform">
              <path d="M 68 120 L 40 85 L 50 78 L 74 115 Z" fill="#38bdf8" />
              {/* Hand */}
              <circle cx="38" cy="80" r="9" fill="url(#skinGrad)" />
            </g>
          ) : (
            <g>
              <path d="M 68 120 L 52 165 L 64 168 L 78 125 Z" fill="#38bdf8" />
              {/* Left Hand resting on hip */}
              <circle cx="54" cy="170" r="8" fill="url(#skinGrad)" />
            </g>
          )}

          {/* Right Arm: Thumbs up / friendly wave */}
          {currentPose === 'celebrate' ? (
            <g className="origin-[135px_120px] rotate-45 transition-transform">
              <path d="M 132 120 L 160 85 L 150 78 L 126 115 Z" fill="#38bdf8" />
              <circle cx="162" cy="80" r="9" fill="url(#skinGrad)" />
            </g>
          ) : (
            <g>
              <path d="M 132 120 L 148 165 L 136 168 L 122 125 Z" fill="#38bdf8" />
              <circle cx="146" cy="170" r="8" fill="url(#skinGrad)" />
            </g>
          )}
        </g>

        {/* Body Torso */}
        <g id="torso">
          {/* Inner Shirt: Sky blue kid explorer shirt */}
          <path d="M 72 110 L 128 110 L 122 175 L 78 175 Z" fill="#0284c7" />
          <polygon points="100,122 93,110 107,110" fill="#ffffff" />

          {/* SUIT 2D LAYERS */}
          {suitId === 'suit-liquiliqui' ? (
            /* Gabriel García Márquez Nobel 1982 Liquiliqui */
            <g id="liquiliqui-suit">
              <path d="M 68 110 L 132 110 L 126 182 L 74 182 Z" fill="url(#liquiliquiGrad)" stroke="#cbd5e1" strokeWidth="1.5" />
              {/* Mandarin Collar */}
              <rect x="88" y="105" width="24" height="8" rx="3" fill="#ffffff" stroke="#94a3b8" strokeWidth="1" />
              {/* Buttons */}
              <circle cx="100" cy="120" r="2.5" fill="#94a3b8" />
              <circle cx="100" cy="132" r="2.5" fill="#94a3b8" />
              <circle cx="100" cy="144" r="2.5" fill="#94a3b8" />
              <circle cx="100" cy="156" r="2.5" fill="#94a3b8" />
              <circle cx="100" cy="168" r="2.5" fill="#94a3b8" />
              {/* Pockets */}
              <rect x="78" y="148" width="16" height="18" rx="2" fill="#f8fafc" stroke="#cbd5e1" />
              <rect x="106" y="148" width="16" height="18" rx="2" fill="#f8fafc" stroke="#cbd5e1" />
            </g>
          ) : suitId === 'suit-ruana' ? (
            /* Traditional Colombian Ruana */
            <g id="ruana-suit">
              <polygon points="100,105 142,145 132,185 68,185 58,145" fill="url(#ruanaGrad)" stroke="#451a03" strokeWidth="1.5" />
              <line x1="75" y1="120" x2="125" y2="120" stroke="#fef08a" strokeWidth="3" />
              <line x1="70" y1="145" x2="130" y2="145" stroke="#fef08a" strokeWidth="3" />
              <line x1="68" y1="170" x2="132" y2="170" stroke="#fef08a" strokeWidth="3" />
              {/* Fringes */}
              <line x1="70" y1="185" x2="70" y2="190" stroke="#78350f" strokeWidth="2" />
              <line x1="85" y1="185" x2="85" y2="190" stroke="#78350f" strokeWidth="2" />
              <line x1="100" y1="185" x2="100" y2="190" stroke="#78350f" strokeWidth="2" />
              <line x1="115" y1="185" x2="115" y2="190" stroke="#78350f" strokeWidth="2" />
              <line x1="130" y1="185" x2="130" y2="190" stroke="#78350f" strokeWidth="2" />
            </g>
          ) : (
            /* Classic Explorer STEAM+ Tactical Vest */
            <g id="explorer-vest">
              {/* Left & Right vest panels */}
              <path d="M 70 110 L 92 110 L 90 174 L 74 174 Z" fill="url(#explorerVest)" stroke="#78350f" strokeWidth="1" />
              <path d="M 108 110 L 130 110 L 126 174 L 110 174 Z" fill="url(#explorerVest)" stroke="#78350f" strokeWidth="1" />
              {/* Pockets */}
              <rect x="73" y="132" width="14" height="15" rx="2" fill="#92400e" />
              <rect x="113" y="132" width="14" height="15" rx="2" fill="#92400e" />
              <rect x="74" y="152" width="13" height="14" rx="2" fill="#92400e" />
              <rect x="113" y="152" width="13" height="14" rx="2" fill="#92400e" />
              {/* Center Zipper / Clips */}
              <line x1="94" y1="120" x2="106" y2="120" stroke="#f59e0b" strokeWidth="2" />
              <line x1="94" y1="140" x2="106" y2="140" stroke="#f59e0b" strokeWidth="2" />
              <line x1="94" y1="160" x2="106" y2="160" stroke="#f59e0b" strokeWidth="2" />
            </g>
          )}

          {/* BADGE 2D OVERLAYS */}
          {badgeId === 'badge-colombia' && (
            <g transform="translate(112, 118)">
              {/* Shield */}
              <polygon points="0,0 16,0 16,14 8,20 0,14" fill="#fbbf24" stroke="#d97706" strokeWidth="1" />
              {/* Colombia Tricolor: Yellow 50%, Blue 25%, Red 25% */}
              <rect x="2" y="2" width="12" height="7" fill="#facc15" />
              <rect x="2" y="9" width="12" height="3" fill="#2563eb" />
              <rect x="2" y="12" width="12" height="3" fill="#dc2626" />
            </g>
          )}

          {badgeId === 'badge-steam' && (
            <g transform="translate(112, 118)">
              <circle cx="8" cy="8" r="8" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
              <ellipse cx="8" cy="8" rx="7" ry="2.5" fill="none" stroke="#38bdf8" strokeWidth="1" transform="rotate(30 8 8)" />
              <ellipse cx="8" cy="8" rx="7" ry="2.5" fill="none" stroke="#f59e0b" strokeWidth="1" transform="rotate(-30 8 8)" />
              <circle cx="8" cy="8" r="2.5" fill="#38bdf8" className="animate-ping" />
            </g>
          )}

          {badgeId === 'badge-streak-5' && (
            <g transform="translate(110, 116)">
              <circle cx="9" cy="9" r="9" fill="#7c2d12" stroke="#f59e0b" strokeWidth="1.5" />
              <circle cx="9" cy="9" r="7" fill="#ea580c" />
              <text x="9" y="13" fontSize="9" textAnchor="middle">🔥</text>
            </g>
          )}

          {badgeId === 'badge-peace-dove' && (
            <g transform="translate(110, 116)">
              <circle cx="9" cy="9" r="9" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
              <text x="9" y="13" fontSize="9" textAnchor="middle">🕊️</text>
            </g>
          )}

          {badgeId === 'badge-coffee-bean' && (
            <g transform="translate(110, 116)">
              <circle cx="9" cy="9" r="9" fill="#451a03" stroke="#f59e0b" strokeWidth="1.5" />
              <text x="9" y="13" fontSize="9" textAnchor="middle">☕</text>
            </g>
          )}
        </g>

        {/* Neck */}
        <rect x="91" y="96" width="18" height="16" fill="url(#skinGrad)" rx="3" />

        {/* Head, Hair & Face */}
        <g id="head">
          {/* Ears */}
          <circle cx="68" cy="72" r="9" fill="url(#skinGrad)" />
          <circle cx="68" cy="72" r="5" fill="#f5be94" />
          <circle cx="132" cy="72" r="9" fill="url(#skinGrad)" />
          <circle cx="132" cy="72" r="5" fill="#f5be94" />

          {/* Head Base */}
          <ellipse cx="100" cy="70" rx="34" ry="38" fill="url(#skinGrad)" />

          {/* Cheeks / Blush */}
          <circle cx="78" cy="80" r="7" fill="#fca5a5" opacity="0.45" />
          <circle cx="122" cy="80" r="7" fill="#fca5a5" opacity="0.45" />

          {/* Freckles on Cheeks */}
          <circle cx="76" cy="79" r="1" fill="#b45309" />
          <circle cx="79" cy="81" r="1.2" fill="#b45309" />
          <circle cx="82" cy="78" r="1" fill="#b45309" />
          <circle cx="118" cy="78" r="1" fill="#b45309" />
          <circle cx="121" cy="81" r="1.2" fill="#b45309" />
          <circle cx="124" cy="79" r="1" fill="#b45309" />

          {/* Hair Base */}
          <path
            d="M 68 62 C 65 30, 85 24, 100 24 C 115 24, 135 30, 132 62 C 128 45, 118 42, 108 44 C 98 40, 88 42, 78 48 C 72 52, 70 58, 68 62 Z"
            fill="url(#hairGrad)"
          />
          {/* Hair Tufts */}
          <path d="M 85 36 Q 92 18 102 26 Q 96 32 85 36 Z" fill="url(#hairGrad)" />
          <path d="M 100 32 Q 108 14 116 26 Q 110 32 100 32 Z" fill="url(#hairGrad)" />

          {/* Eyebrows */}
          <path d="M 76 56 Q 84 52 90 56" stroke="#451a03" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <path d="M 110 56 Q 116 52 124 56" stroke="#451a03" strokeWidth="2.5" strokeLinecap="round" fill="none" />

          {/* Big Expressive Cartoon Eyes */}
          {isBlinking ? (
            <g id="blinking-eyes">
              <path d="M 75 69 Q 83 74 91 69" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" fill="none" />
              <path d="M 109 69 Q 117 74 125 69" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" fill="none" />
            </g>
          ) : (
            <g id="open-eyes">
              {/* Sclera */}
              <ellipse cx="83" cy="68" rx="8" ry="10" fill="#ffffff" stroke="#cbd5e1" strokeWidth="0.8" />
              <ellipse cx="117" cy="68" rx="8" ry="10" fill="#ffffff" stroke="#cbd5e1" strokeWidth="0.8" />
              {/* Iris: Bright warm amber/brown */}
              <circle cx="84" cy="68" r="6" fill="#854d0e" />
              <circle cx="116" cy="68" r="6" fill="#854d0e" />
              {/* Pupil */}
              <circle cx="84" cy="68" r="3.5" fill="#0f172a" />
              <circle cx="116" cy="68" r="3.5" fill="#0f172a" />
              {/* Catchlight sparkle */}
              <circle cx="82" cy="65" r="2.2" fill="#ffffff" />
              <circle cx="85" cy="70" r="1.1" fill="#ffffff" />
              <circle cx="114" cy="65" r="2.2" fill="#ffffff" />
              <circle cx="117" cy="70" r="1.1" fill="#ffffff" />
            </g>
          )}

          {/* Nose */}
          <path d="M 98 73 Q 100 78 104 77" stroke="#b45309" strokeWidth="2" strokeLinecap="round" fill="none" />

          {/* Mouth: Talking or Friendly Smile */}
          {speaking && mouthOpen ? (
            <path d="M 90 85 Q 100 102 110 85 Z" fill="#881337" stroke="#4c0519" strokeWidth="1.5" />
          ) : (
            <path d="M 91 85 Q 100 95 109 85" stroke="#991b1b" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          )}
        </g>

        {/* GLASSES 2D OVERLAYS */}
        {glassesId === 'glasses-steampunk' && (
          <g id="steampunk-glasses" transform="translate(0, -2)">
            {/* Golden Brass frame */}
            <circle cx="83" cy="68" r="11" fill="url(#goggleGlow)" stroke="#f59e0b" strokeWidth="2.5" />
            <circle cx="117" cy="68" r="11" fill="url(#goggleGlow)" stroke="#f59e0b" strokeWidth="2.5" />
            {/* Bridge */}
            <path d="M 94 68 Q 100 64 106 68" stroke="#f59e0b" strokeWidth="2.5" fill="none" />
            {/* Crosshairs & Sci-Fi markings */}
            <line x1="83" y1="60" x2="83" y2="76" stroke="#ffffff" strokeWidth="0.8" opacity="0.6" />
            <line x1="75" y1="68" x2="91" y2="68" stroke="#ffffff" strokeWidth="0.8" opacity="0.6" />
            <line x1="117" y1="60" x2="117" y2="76" stroke="#ffffff" strokeWidth="0.8" opacity="0.6" />
            <line x1="109" y1="68" x2="125" y2="68" stroke="#ffffff" strokeWidth="0.8" opacity="0.6" />
          </g>
        )}

        {glassesId === 'glasses-retro' && (
          <g id="retro-glasses">
            <rect x="70" y="58" width="24" height="20" rx="6" fill="none" stroke="#0f172a" strokeWidth="3" />
            <rect x="106" y="58" width="24" height="20" rx="6" fill="none" stroke="#0f172a" strokeWidth="3" />
            <path d="M 94 64 L 106 64" stroke="#0f172a" strokeWidth="3" />
            {/* Glass reflection */}
            <line x1="74" y1="62" x2="88" y2="74" stroke="#ffffff" strokeWidth="1.5" opacity="0.5" />
            <line x1="110" y1="62" x2="124" y2="74" stroke="#ffffff" strokeWidth="1.5" opacity="0.5" />
          </g>
        )}

        {/* HATS 2D OVERLAYS */}
        {hatId === 'hat-safari' && (
          <g id="safari-hat">
            {/* Brim */}
            <ellipse cx="100" cy="40" rx="55" ry="12" fill="#d4a359" stroke="#78350f" strokeWidth="1.5" />
            {/* Crown */}
            <path d="M 68 38 C 68 12, 132 12, 132 38 Z" fill="#eab308" stroke="#78350f" strokeWidth="1.5" />
            {/* Leather Hatband */}
            <path d="M 69 35 Q 100 42 131 35 L 131 40 Q 100 47 69 40 Z" fill="#78350f" />
            {/* Buckle */}
            <rect x="96" y="37" width="8" height="6" fill="#fef08a" stroke="#ca8a04" strokeWidth="1" />
          </g>
        )}

        {hatId === 'hat-railroad' && (
          <g id="railroad-cap">
            {/* 1920s Train Conductor/Machinist cap */}
            {/* Visor / Peak */}
            <path d="M 62 44 Q 100 58 138 44 L 134 40 Q 100 48 66 40 Z" fill="#0f172a" stroke="#475569" strokeWidth="1" />
            {/* Cap Crown */}
            <path d="M 66 40 C 64 16, 136 16, 134 40 Z" fill="#1e3a8a" stroke="#172554" strokeWidth="1.5" />
            {/* Gold braid */}
            <path d="M 68 38 Q 100 45 132 38" stroke="#f59e0b" strokeWidth="2.5" fill="none" />
            {/* Steam Train Emblem */}
            <circle cx="100" cy="28" r="6" fill="#fbbf24" stroke="#b45309" strokeWidth="1" />
            <text x="100" y="31" fontSize="7" textAnchor="middle" fill="#78350f" fontWeight="bold">🚂</text>
          </g>
        )}

        {hatId === 'hat-vueltiao' && (
          <g id="vueltiao-hat">
            {/* Colombian Sombrero Vueltiao */}
            {/* Wide Brim */}
            <ellipse cx="100" cy="40" rx="60" ry="14" fill="#fef3c7" stroke="#000000" strokeWidth="2" />
            {/* Characteristic black geometric braiding patterns */}
            <ellipse cx="100" cy="40" rx="52" ry="11" fill="none" stroke="#000000" strokeWidth="2.5" strokeDasharray="4 4" />
            <ellipse cx="100" cy="40" rx="44" ry="9" fill="none" stroke="#000000" strokeWidth="2" strokeDasharray="3 3" />
            {/* Crown */}
            <path d="M 72 38 C 72 15, 128 15, 128 38 Z" fill="#fef3c7" stroke="#000000" strokeWidth="2" />
            {/* Crown braided ribbon */}
            <path d="M 74 34 Q 100 40 126 34 L 126 38 Q 100 44 74 38 Z" fill="#000000" />
            <path d="M 80 24 Q 100 28 120 24" stroke="#000000" strokeWidth="2" strokeDasharray="3 3" fill="none" />
          </g>
        )}

        {hatId === 'hat-space' && (
          <g id="space-helmet">
            {/* Retro Sci-fi Bubble Helmet */}
            <circle cx="100" cy="65" r="48" fill="#38bdf8" fillOpacity="0.3" stroke="#38bdf8" strokeWidth="3" />
            {/* Antenna */}
            <line x1="100" y1="17" x2="100" y2="4" stroke="#f59e0b" strokeWidth="3" />
            <circle cx="100" cy="4" r="5" fill="#f59e0b" className="animate-ping" />
            {/* Helmet base collar */}
            <path d="M 70 106 Q 100 114 130 106" stroke="#94a3b8" strokeWidth="5" fill="none" strokeLinecap="round" />
          </g>
        )}
      </svg>
    </div>
  );
};
