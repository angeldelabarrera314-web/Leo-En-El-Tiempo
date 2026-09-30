import React, { useState } from 'react';
import { X, ArrowLeft, Award, CheckCircle, AlertCircle, Sparkles, RefreshCw } from 'lucide-react';
import { TriviaQuestion } from '../types';

interface EraChallengeModalProps {
  isOpen: boolean;
  onClose: () => void;
  question: TriviaQuestion;
  onAnswerCorrect: (rewardCoins: number) => void;
}

export const EraChallengeModal: React.FC<EraChallengeModalProps> = ({
  isOpen,
  onClose,
  question,
  onAnswerCorrect,
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSelect = (index: number) => {
    if (submitted) return;
    setSelectedIndex(index);
  };

  const handleConfirm = () => {
    if (selectedIndex === null) return;
    const correct = selectedIndex === question.correctIndex;
    setIsCorrect(correct);
    setSubmitted(true);
    if (correct) {
      onAnswerCorrect(question.rewardCoins);
    }
  };

  const handleReset = () => {
    setSelectedIndex(null);
    setSubmitted(false);
    setIsCorrect(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg bg-gradient-to-b from-[#132247] to-[#0a1224] border-2 border-amber-400/40 rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-3.5 sm:p-4 bg-[#182954] border-b border-amber-500/30 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <button
              onClick={onClose}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border border-amber-400/40 text-xs font-bold transition-all hover:scale-105"
              title="Volver al Laboratorio Cuántico"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Volver atrás</span>
            </button>

            <div className="p-2 rounded-2xl bg-amber-500/20 text-amber-300 border border-amber-400/40 hidden sm:flex">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-1.5">
                <span>Reto del Tiempo • Año {question.year}</span>
              </h3>
              <p className="text-xs text-amber-300">
                Gana +{question.rewardCoins} Monedas Cuánticas ⚡
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

        {/* Question Body */}
        <div className="p-5 sm:p-6 space-y-4">
          <div className="bg-[#0b1429] border border-sky-400/30 p-4 rounded-2xl">
            <h4 className="text-sm sm:text-base font-bold text-white leading-snug">
              {question.question}
            </h4>
          </div>

          {/* Options */}
          <div className="space-y-2.5">
            {question.options.map((opt, idx) => {
              const isSelected = selectedIndex === idx;
              let btnClass = 'bg-[#152549] text-slate-200 border-slate-700 hover:bg-[#1f376e]';

              if (isSelected) {
                btnClass = 'bg-sky-500/20 border-sky-400 text-white shadow-sm';
              }

              if (submitted) {
                if (idx === question.correctIndex) {
                  btnClass = 'bg-emerald-500/20 border-emerald-400 text-emerald-300 font-bold';
                } else if (isSelected && !isCorrect) {
                  btnClass = 'bg-rose-500/20 border-rose-400 text-rose-300';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  disabled={submitted}
                  className={`w-full text-left p-3 rounded-2xl border text-xs sm:text-sm transition-all flex items-center justify-between ${btnClass}`}
                >
                  <span>{opt}</span>
                  {submitted && idx === question.correctIndex && (
                    <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  )}
                  {submitted && isSelected && !isCorrect && (
                    <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Feedback Explanation */}
          {submitted && (
            <div
              className={`p-3.5 rounded-2xl border text-xs sm:text-sm leading-relaxed ${
                isCorrect
                  ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
                  : 'bg-rose-950/40 border-rose-500/40 text-rose-200'
              }`}
            >
              <div className="flex items-center gap-1.5 font-bold mb-1">
                {isCorrect ? (
                  <>
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <span>¡Respuesta Correcta! +{question.rewardCoins} Monedas</span>
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-4 h-4 text-rose-400" />
                    <span>¡Casi lo logras! Revisa la explicación:</span>
                  </>
                )}
              </div>
              <p>{question.explanation}</p>
            </div>
          )}

          {/* Action Button */}
          <div>
            {!submitted ? (
              <button
                onClick={handleConfirm}
                disabled={selectedIndex === null}
                className="w-full py-3 rounded-2xl font-bold text-sm bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black disabled:opacity-50 disabled:cursor-not-allowed shadow-md transition-all"
              >
                Comprobar Respuesta
              </button>
            ) : (
              <button
                onClick={onClose}
                className="w-full py-3 rounded-2xl font-bold text-sm bg-sky-500 hover:bg-sky-400 text-white shadow-md transition-all"
              >
                Continuar Explorando
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
