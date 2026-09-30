import React, { useState } from 'react';
import { X, ArrowLeft, Printer, Download, Sparkles, Copy, Check, Newspaper, Edit3 } from 'lucide-react';
import { TimeTravelResult, AvatarItem } from '../types';
import { Leo2DAvatar } from './Leo2DAvatar';
import { sounds } from '../utils/soundEffects';
import { triggerConfetti } from '../utils/confetti';

interface VintageNewspaperModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: TimeTravelResult;
  equippedItems: Record<string, AvatarItem>;
  currentYear: number;
}

export const VintageNewspaperModal: React.FC<VintageNewspaperModalProps> = ({
  isOpen,
  onClose,
  result,
  equippedItems,
  currentYear,
}) => {
  const [studentName, setStudentName] = useState<string>('Estudiante de Ciencias Sociales');
  const [isEditingName, setIsEditingName] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  if (!isOpen) return null;

  const handlePrint = () => {
    sounds.playTypewriter();
    window.print();
  };

  const handleCopy = () => {
    const text = `📰 ${result.title.toUpperCase()}\nEdición Histórica de Colombia (${currentYear})\nReportero Escolar: ${studentName}\n\n${result.shortSummary}\n\nHECHOS NOTICIOSOS:\n${result.curiousFacts.map((f) => '• ' + f).join('\n')}\n\nVIDA COTIDIANA:\n${result.howChildrenLived}\n\n--- Publicado en el Periódico Histórico Escolar de Leo en el Tiempo ---`;
    navigator.clipboard.writeText(text);
    sounds.playPop();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Determine realistic price tag based on decade
  const getHistoricPrice = (year: number) => {
    if (year <= 1920) return '3 Centavos de Oro';
    if (year <= 1940) return '5 Centavos';
    if (year <= 1960) return '10 Centavos';
    if (year <= 1980) return '5 Pesos';
    return '50 Pesos';
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-fadeIn select-none"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl bg-[#fdfbf7] text-[#1c1815] border-4 border-[#8c7b64] rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[95vh] flex flex-col font-serif"
      >
        {/* Top Control Bar (Hidden when printing) */}
        <div className="p-3 bg-[#2d251d] text-[#f7f3ea] flex items-center justify-between border-b border-[#5c4a38] print:hidden">
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#45372b] hover:bg-[#5a4839] text-xs font-sans text-amber-200 border border-amber-500/30 transition-all hover:scale-105"
              title="Volver al Laboratorio Cuántico"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Volver atrás</span>
            </button>

            <div className="hidden sm:flex items-center gap-2 ml-1">
              <Newspaper className="w-5 h-5 text-amber-400" />
              <span className="text-sm font-bold tracking-wide font-sans">
                Periódico Histórico de la Época • Año {currentYear}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 rounded-lg bg-[#45372b] hover:bg-[#5a4839] text-xs font-sans text-amber-200 border border-amber-500/30 flex items-center gap-1 transition-all"
              title="Copiar texto de la noticia"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? '¡Copiado!' : 'Copiar'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs font-sans flex items-center gap-1.5 shadow-md hover:scale-105 transition-all"
              title="Imprimir periódico para pegar en tu cartelera escolar"
            >
              <Printer className="w-4 h-4" />
              <span>🖨️ Imprimir para la Feria</span>
            </button>

            <button
              onClick={onClose}
              className="p-1 rounded-full bg-[#1e1813] text-stone-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Newspaper Sheet */}
        <div className="p-5 sm:p-8 overflow-y-auto flex-1 bg-[#fcf9f2] selection:bg-amber-300 selection:text-black">
          {/* Masthead Header */}
          <div className="border-b-4 border-double border-[#221c17] pb-3 text-center">
            <div className="flex items-center justify-between text-[11px] uppercase tracking-widest text-[#5c4f42] border-b border-[#8c7b64] pb-1 mb-2 font-sans flex-wrap gap-1">
              <span>Edición Especial Feria STEM</span>
              <span className="font-bold text-[#8a2216]">Colegio Niño Jesús De Praga</span>
              <span>Año de la Patria: {currentYear}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-[#1c1611] uppercase font-serif py-1">
              EL ECO DE COLOMBIA
            </h1>

            <p className="text-xs italic text-[#4a3f35] tracking-wide mt-0.5">
              "Voz independiente al servicio de la cultura, la educación y la historia nacional"
            </p>

            <div className="flex flex-wrap items-center justify-between text-[11px] font-sans text-[#4a3f35] border-t border-b border-[#221c17] py-1 mt-2 font-semibold">
              <span>BOGOTÁ, D.C. • REPÚBLICA DE COLOMBIA</span>
              <span>AÑO {currentYear} • NÚMERO 1.954</span>
              <span>PRECIO: {getHistoricPrice(currentYear)}</span>
            </div>
          </div>

          {/* Student Reporter Byline Bar */}
          <div className="my-3 py-1.5 px-3 bg-[#f2ecdf] border border-[#cfc4b0] rounded flex flex-wrap items-center justify-between gap-2 text-xs font-sans">
            <div className="flex items-center gap-2">
              <span className="font-bold text-[#2e261f]">🖊️ Crónica Especial por:</span>
              {isEditingName ? (
                <input
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  onBlur={() => setIsEditingName(false)}
                  onKeyDown={(e) => e.key === 'Enter' && setIsEditingName(false)}
                  autoFocus
                  className="bg-white border border-amber-600 px-2 py-0.5 rounded text-xs text-black font-bold outline-none"
                />
              ) : (
                <span
                  onClick={() => setIsEditingName(true)}
                  className="font-bold text-[#802f1a] underline cursor-pointer hover:text-black flex items-center gap-1"
                  title="Clic para cambiar por tu nombre de estudiante"
                >
                  {studentName} <Edit3 className="w-3 h-3 inline opacity-60" />
                </span>
              )}
            </div>

            <span className="text-[11px] text-[#6b5c4d] italic">
              Corresponsal Escolar en el Tiempo • Feria STEAM+
            </span>
          </div>

          {/* Main Headline */}
          <div className="text-center my-4 border-b-2 border-[#221c17] pb-3">
            <h2 className="text-xl sm:text-3xl font-black text-[#1c1611] uppercase leading-tight font-serif">
              {result.title}
            </h2>
            <p className="text-sm sm:text-base italic text-[#4a3f35] mt-1 font-serif">
              {result.shortSummary.substring(0, 140)}...
            </p>
          </div>

          {/* Newspaper 3-Column Historic Layout */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 mt-4">
            {/* Left 4 Cols: Vintage Portrait of Leo the Explorer */}
            <div className="md:col-span-4 flex flex-col items-center bg-[#f4eee2] border border-[#d6cbba] p-3 rounded text-center">
              <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-[#6b5c4d] mb-1">
                FOTOGRAFÍA TELEGRÁFICA EXCLUSIVA
              </span>

              {/* 2D Leo Avatar framed inside vintage engraved border */}
              <div className="p-2 border-2 border-[#5c4e40] bg-[#eae2d3] rounded-xl shadow-inner w-full flex items-center justify-center">
                <Leo2DAvatar
                  equippedItems={equippedItems}
                  size="md"
                  interactive={false}
                />
              </div>

              <p className="text-[11px] italic text-[#4a3f35] mt-2 font-serif leading-tight">
                "Nuestro crononauta escolar Leo en vestimenta de época, transmitiendo desde las coordenadas del año {currentYear}."
              </p>

              {/* Vintage Advertising Box */}
              <div className="mt-4 pt-3 border-t border-[#baa893] w-full text-left font-sans text-xs space-y-1.5">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#802f1a] block text-center">
                  AVISOS DE LA ÉPOCA
                </span>
                <div className="p-2 bg-white/70 border border-[#cfc4b0] rounded">
                  <p className="font-bold text-[11px] text-[#2e261f]">☕ CAFÉ COLOMBIANO SUPREMO</p>
                  <p className="text-[10px] text-[#5c4f42]">El aroma de las montañas andinas que conquista el comercio mundial.</p>
                </div>
                <div className="p-2 bg-white/70 border border-[#cfc4b0] rounded">
                  <p className="font-bold text-[11px] text-[#2e261f]">📻 RECEPTOR DE RADIO A BULBOS</p>
                  <p className="text-[10px] text-[#5c4f42]">Sintonice hoy las últimas melodías y boletines escolares.</p>
                </div>
              </div>
            </div>

            {/* Right 8 Cols: Newspaper Lead Article & Columns */}
            <div className="md:col-span-8 flex flex-col justify-between">
              <div className="text-justify text-xs sm:text-sm text-[#241e19] leading-relaxed font-serif space-y-3">
                <p className="first-letter:text-4xl first-letter:font-black first-letter:float-left first-letter:mr-2 first-letter:text-[#1c1611]">
                  {result.shortSummary}
                </p>

                <p>
                  <strong>VIDA COTIDIANA Y COSTUMBRES:</strong> {result.howChildrenLived}
                </p>

                {/* Curious Facts Box */}
                <div className="bg-[#ede4d3] border-l-4 border-[#802f1a] p-3 my-3 rounded-r font-sans text-xs">
                  <span className="font-bold uppercase text-[#802f1a] block mb-1">
                    HECHOS CLAVE PARA EL CUADERNO ESCOLAR:
                  </span>
                  <ul className="space-y-1 text-[#332b24]">
                    {result.curiousFacts.map((fact, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-[#802f1a] font-bold">✓</span>
                        <span>{fact}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <p className="italic text-[#4a3f35] border-t border-[#baa893] pt-2">
                  "El paisaje de Colombia en este año resuena con fuerza: {result.soundOrSensation}"
                </p>
              </div>

              {/* Bottom Newspaper Footer Stamp */}
              <div className="mt-4 pt-2 border-t-2 border-[#221c17] flex items-center justify-between text-[11px] font-sans text-[#5c4f42]">
                <span>TALLERES GRÁFICOS DE LA EXPEDICIÓN TEMPORAL</span>
                <span className="font-bold text-[#802f1a]">🇨🇴 CIENCIAS SOCIALES - FERIA STEAM+</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
