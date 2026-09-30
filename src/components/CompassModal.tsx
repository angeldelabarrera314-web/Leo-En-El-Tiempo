import React from 'react';
import { X, ArrowLeft, Compass, MapPin } from 'lucide-react';

interface CompassModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectRegionEra: (year: number) => void;
}

export const CompassModal: React.FC<CompassModalProps> = ({
  isOpen,
  onClose,
  onSelectRegionEra,
}) => {
  if (!isOpen) return null;

  const regions = [
    {
      name: 'Región Caribe',
      year: 1928,
      title: 'Ciénaga y el Magdalena',
      theme: 'Huelga bananera y literatura de Gabo en Aracataca',
      icon: '🌴',
    },
    {
      name: 'Región Andina (Bogotá)',
      year: 1948,
      title: 'El Bogotazo y Tranvías',
      theme: 'Carrera Séptima, Plaza de Bolívar y vida urbana',
      icon: '🏔️',
    },
    {
      name: 'Región Cafetera (Antioquia / Caldas)',
      year: 1920,
      title: 'Ferrocarriles y Montañas',
      theme: 'Locomotoras a vapor transportando café',
      icon: '☕',
    },
    {
      name: 'Altiplano Cundiboyacense (Boyacá)',
      year: 1950,
      title: 'Radio Sutatenza y la Escuela',
      theme: 'Campesinos aprendiendo a leer con radio de tubos',
      icon: '📻',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg bg-gradient-to-b from-[#132247] to-[#0a1224] border-2 border-cyan-400/40 rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-3.5 sm:p-4 bg-[#182a57] border-b border-cyan-500/30 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <button
              onClick={onClose}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-200 border border-cyan-400/40 text-xs font-bold transition-all hover:scale-105"
              title="Volver al Laboratorio Cuántico"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Volver atrás</span>
            </button>

            <div className="p-2 rounded-2xl bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 hidden sm:flex">
              <Compass className="w-5 h-5 animate-spin-slow" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white">
                Brújula Regional de Colombia
              </h3>
              <p className="text-xs text-cyan-200">
                Viaja en el tiempo según las regiones de nuestra geografía
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

        {/* Regions Grid */}
        <div className="p-4 sm:p-5 space-y-3">
          {regions.map((reg) => (
            <div
              key={reg.name}
              onClick={() => {
                onSelectRegionEra(reg.year);
                onClose();
              }}
              className="bg-[#152345] hover:bg-[#1c3263] border border-cyan-500/30 rounded-2xl p-3.5 cursor-pointer transition-all flex items-center justify-between gap-3 group"
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl">{reg.icon}</span>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {reg.name}
                    </h4>
                    <span className="text-[10px] font-digital text-amber-400 font-bold bg-amber-400/10 px-1.5 py-0.2 rounded">
                      {reg.year}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300">{reg.theme}</p>
                </div>
              </div>

              <span className="text-xs font-bold text-cyan-400 group-hover:translate-x-1 transition-transform">
                ➔
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
