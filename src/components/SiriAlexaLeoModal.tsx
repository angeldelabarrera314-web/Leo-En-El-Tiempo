import React, { useState, useEffect, useRef } from 'react';
import { X, ArrowLeft, Mic, MicOff, Volume2, VolumeX, Square, Sparkles, Send, Compass, RotateCcw, Zap } from 'lucide-react';
import { LeoVoiceSettings } from '../types';
import { sounds } from '../utils/soundEffects';
import { triggerConfetti } from '../utils/confetti';
import { leoVoice } from '../utils/leoVoice';

interface SiriAlexaLeoModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentEraText: string;
  onSpeakText: (text: string) => void;
  voiceSettings: LeoVoiceSettings;
  onTravelToYear: (year: number) => void;
}

export const SiriAlexaLeoModal: React.FC<SiriAlexaLeoModalProps> = ({
  isOpen,
  onClose,
  currentEraText,
  onSpeakText,
  voiceSettings,
  onTravelToYear,
}) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [leoReply, setLeoReply] = useState<string>(
    '¡Hola! Soy Leo en tu asistente inteligente. Di "Oye Leo" o toca el orbe para preguntarme cualquier duda sobre la historia de Colombia en el siglo XX.'
  );
  const [suggestedYear, setSuggestedYear] = useState<number | null>(null);
  const [isThinking, setIsThinking] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [micNotice, setMicNotice] = useState<string | null>(null);
  const [manualText, setManualText] = useState('');

  const recognitionRef = useRef<any>(null);

  // Web Speech API
  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.lang = 'es-CO';
      recognition.continuous = false;
      recognition.interimResults = true;

      recognition.onresult = (event: any) => {
        let currentTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          currentTranscript += event.results[i][0].transcript;
        }
        setTranscript(currentTranscript);

        // If final result
        if (event.results[0].isFinal) {
          handleAskLeo(currentTranscript);
          setIsListening(false);
        }
      };

      recognition.onerror = (e: any) => {
        setIsListening(false);
        if (e.error === 'not-allowed') {
          setMicNotice('Permiso de micrófono bloqueado. Puedes escribir tu pregunta en el campo de texto.');
        }
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {}
      }
      leoVoice.stop();
      setIsSpeaking(false);
      setIsListening(false);
    };
  }, []);

  useEffect(() => {
    if (!isOpen) {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {}
      }
      leoVoice.stop();
      setIsSpeaking(false);
      setIsListening(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const toggleMic = () => {
    if (isSpeaking) {
      stopVoice();
      sounds.playClick();
      return;
    }

    if (!recognitionRef.current) {
      setMicNotice('Tu navegador no tiene activado el reconocimiento por voz. ¡Escribe tu pregunta abajo!');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        setMicNotice(null);
        setTranscript('');
        sounds.playSiriWake();
        recognitionRef.current.start();
        setIsListening(true);
      } catch (e) {
        setIsListening(false);
      }
    }
  };

  const handleAskLeo = async (queryText: string) => {
    if (!queryText.trim() || isThinking) return;

    setIsThinking(true);
    setTranscript(queryText);
    setSuggestedYear(null);

    // Detect if student asked for a specific year to suggest teleport
    const matchedYear = queryText.match(/\b(19\d{2})\b/);
    let detectedYear: number | null = null;
    if (matchedYear && matchedYear[1]) {
      detectedYear = parseInt(matchedYear[1]);
    } else if (queryText.toLowerCase().includes('bogotazo') || queryText.toLowerCase().includes('tranvía')) {
      detectedYear = 1948;
    } else if (queryText.toLowerCase().includes('televisión') || queryText.toLowerCase().includes('tv')) {
      detectedYear = 1954;
    } else if (queryText.toLowerCase().includes('gabo') || queryText.toLowerCase().includes('nobel')) {
      detectedYear = 1982;
    } else if (queryText.toLowerCase().includes('tren') || queryText.toLowerCase().includes('vapor')) {
      detectedYear = 1920;
    } else if (queryText.toLowerCase().includes('constitución') || queryText.toLowerCase().includes('niñez')) {
      detectedYear = 1991;
    }

    try {
      const res = await fetch('/api/leo-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: queryText,
          eraContext: currentEraText,
        }),
      });

      const data = await res.json();
      const reply =
        data.reply ||
        'Durante el siglo XX en Colombia vivimos inventos asombrosos, desde los trenes cafeteros hasta la primera señal de televisión nacional.';

      setLeoReply(reply);
      if (detectedYear) {
        setSuggestedYear(detectedYear);
      }

      sounds.playSiriDone();
      setIsSpeaking(true);
      leoVoice.speak(reply, voiceSettings, {
        onStart: () => setIsSpeaking(true),
        onEnd: () => setIsSpeaking(false),
        onError: () => setIsSpeaking(false),
      });
    } catch (err) {
      const fallback = 'En el siglo XX colombiano las familias descubrieron grandes adelantos en radio comunitaria, transporte y derechos sociales.';
      setLeoReply(fallback);
      leoVoice.speak(fallback, voiceSettings, {
        onStart: () => setIsSpeaking(true),
        onEnd: () => setIsSpeaking(false),
        onError: () => setIsSpeaking(false),
      });
    } finally {
      setIsThinking(false);
      setManualText('');
    }
  };

  const stopVoice = () => {
    leoVoice.stop();
    setIsSpeaking(false);
  };

  const sampleVoicePrompts = [
    '🎙️ ¿A qué jugaban los niños en 1970?',
    '🎙️ ¿Cómo funcionaban los trenes a vapor en 1920?',
    '🎙️ ¿Qué pasó con los tranvías en el Bogotazo de 1948?',
    '🎙️ ¿Cuándo llegó la televisión a Colombia?',
    '🎙️ ¿Por qué Gabo vistió de blanco en su Nobel de 1982?',
    '🎙️ ¿Qué dice la Constitución de 1991 sobre los niños?',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/90 backdrop-blur-xl animate-fadeIn select-none">
      <div className="relative w-full max-w-2xl bg-gradient-to-b from-[#091124] via-[#0d162f] to-[#060a16] border-2 border-sky-400/50 rounded-3xl shadow-[0_0_50px_rgba(56,189,248,0.3)] overflow-hidden flex flex-col max-h-[92vh]">
        {/* Top Header */}
        <div className="p-3.5 sm:p-4 bg-[#111e3d] border-b border-sky-500/30 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => {
                sounds.playClick();
                onClose();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-200 border border-cyan-400/40 text-xs font-bold transition-all hover:scale-105"
              title="Volver al Laboratorio Cuántico"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Volver atrás</span>
            </button>

            <div className="relative w-9 h-9 rounded-2xl bg-gradient-to-tr from-cyan-400 via-indigo-500 to-fuchsia-500 p-0.5 shadow-[0_0_15px_rgba(56,189,248,0.5)] hidden sm:flex">
              <div className="w-full h-full bg-[#0a1122] rounded-[14px] flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-cyan-300 animate-pulse" />
              </div>
            </div>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span>Modo Asistente Cuántico de Leo</span>
                <span className="text-[10px] font-digital bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 px-2 py-0.5 rounded-full">
                  ALEXA / SIRI STEAM+
                </span>
              </h3>
              <p className="text-xs text-sky-200">
                Habla con Leo o escribe tu duda sobre el siglo XX de Colombia
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isSpeaking && (
              <button
                onClick={() => {
                  sounds.playClick();
                  stopVoice();
                }}
                className="bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white border border-rose-400 px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all shadow-[0_0_12px_rgba(239,68,68,0.6)] animate-pulse cursor-pointer active:scale-95"
                title="Detener voz de Leo de inmediato"
              >
                <Square className="w-3 h-3 fill-current" />
                <span>⏹️ Silenciar voz</span>
              </button>
            )}
            <button
              onClick={() => {
                stopVoice();
                sounds.playClick();
                onClose();
              }}
              className="p-1.5 rounded-full bg-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Notice Banner */}
        {micNotice && (
          <div className="bg-amber-500/15 border-b border-amber-500/30 px-4 py-2 text-xs text-amber-200 flex items-center justify-between">
            <span>{micNotice}</span>
            <button onClick={() => setMicNotice(null)} className="font-bold text-amber-300">
              Entendido
            </button>
          </div>
        )}

        {/* Central Siri/Alexa Interactive Orb Section */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 flex flex-col items-center justify-center relative">
          {/* Animated Glow Halo */}
          <div
            className={`absolute w-64 h-64 rounded-full blur-3xl pointer-events-none transition-all duration-700 ${
              isListening
                ? 'bg-gradient-to-tr from-cyan-500 via-fuchsia-500 to-amber-400 opacity-60 scale-125 animate-spin-slow'
                : isThinking
                ? 'bg-gradient-to-tr from-indigo-500 via-purple-500 to-sky-400 opacity-70 scale-110 animate-pulse'
                : isSpeaking
                ? 'bg-gradient-to-tr from-amber-400 via-emerald-400 to-cyan-400 opacity-60 scale-115'
                : 'bg-sky-500/20 opacity-40'
            }`}
          />

          {/* Siri / Alexa Holographic Interactive Orb */}
          <button
            onClick={toggleMic}
            className={`relative group w-36 h-36 sm:w-44 sm:h-44 rounded-full p-2 transition-all duration-500 shadow-2xl flex items-center justify-center ${
              isListening
                ? 'scale-110 ring-4 ring-cyan-400 ring-offset-4 ring-offset-[#091124] animate-pulse'
                : 'hover:scale-105'
            }`}
            title={isListening ? 'Toca para detener' : 'Toca para hablar'}
          >
            {/* Liquid Gradient Orb */}
            <div className="w-full h-full rounded-full bg-gradient-to-tr from-cyan-500 via-indigo-600 to-fuchsia-600 p-1 flex items-center justify-center relative overflow-hidden shadow-[inset_0_0_30px_rgba(255,255,255,0.4)]">
              {/* Inner Swirl Wave */}
              <div
                className={`absolute inset-0 bg-gradient-to-br from-amber-300/40 via-sky-400/50 to-purple-600/50 rounded-full blur-sm transition-transform duration-1000 ${
                  isListening || isSpeaking ? 'animate-spin-slow' : ''
                }`}
              />

              {/* Center Icon */}
              <div className="relative z-10 w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-[#080e1e]/90 flex flex-col items-center justify-center border border-white/20 backdrop-blur-md">
                {isListening ? (
                  <>
                    <Mic className="w-8 h-8 text-cyan-300 animate-bounce" />
                    <span className="text-[10px] font-bold text-cyan-300 uppercase tracking-widest mt-1">
                      Escuchando
                    </span>
                  </>
                ) : isThinking ? (
                  <>
                    <Sparkles className="w-8 h-8 text-amber-400 animate-spin" />
                    <span className="text-[10px] font-bold text-amber-300 uppercase tracking-widest mt-1">
                      Pensando
                    </span>
                  </>
                ) : isSpeaking ? (
                  <>
                    <Volume2 className="w-8 h-8 text-emerald-400 animate-pulse" />
                    <span className="text-[10px] font-bold text-emerald-300 uppercase tracking-widest mt-1">
                      Hablando
                    </span>
                  </>
                ) : (
                  <>
                    <Mic className="w-8 h-8 text-white group-hover:text-cyan-300 transition-colors" />
                    <span className="text-[10px] font-bold text-slate-300 group-hover:text-white uppercase tracking-widest mt-1">
                      Toca para hablar
                    </span>
                  </>
                )}
              </div>
            </div>
          </button>

          {/* Live Soundwave Bars while listening or speaking */}
          {(isListening || isSpeaking) && (
            <div className="flex items-center gap-1.5 mt-4">
              <span className="w-1.5 h-6 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-1.5 h-10 bg-fuchsia-400 rounded-full animate-bounce" style={{ animationDelay: '100ms' }} />
              <span className="w-1.5 h-8 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '200ms' }} />
              <span className="w-1.5 h-12 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-1.5 h-7 bg-sky-400 rounded-full animate-bounce" style={{ animationDelay: '250ms' }} />
            </div>
          )}

          {/* Live Transcript / Response Card */}
          <div className="w-full mt-5 bg-[#0e1934]/90 border border-sky-400/30 rounded-2xl p-4 shadow-xl text-center">
            {transcript && (
              <p className="text-xs text-cyan-300 font-semibold mb-2">
                " {transcript} "
              </p>
            )}

            <p className="text-sm sm:text-base text-slate-100 font-medium leading-relaxed">
              {leoReply}
            </p>

            {/* Stop Speaking Button inside response card */}
            {isSpeaking && (
              <button
                onClick={() => {
                  sounds.playClick();
                  stopVoice();
                }}
                className="mt-3 w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-rose-600 via-red-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(239,68,68,0.7)] animate-pulse transition-all hover:scale-[1.02] active:scale-95 cursor-pointer"
                title="Detener la voz de Leo de inmediato sin esperar a que termine"
              >
                <Square className="w-3.5 h-3.5 fill-current" />
                <span>⏹️ Detener voz de Leo (Silenciar ahora)</span>
              </button>
            )}

            {/* Teleport Button to Suggested Year */}
            {suggestedYear && (
              <div className="mt-3 pt-3 border-t border-sky-500/20 flex items-center justify-center">
                <button
                  onClick={() => {
                    sounds.playTimeWarp();
                    triggerConfetti(0.5, 0.5);
                    onTravelToYear(suggestedYear);
                    onClose();
                  }}
                  className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 hover:from-amber-400 hover:to-rose-400 text-black font-bold text-xs sm:text-sm px-4 py-2 rounded-xl shadow-lg flex items-center gap-2 hover:scale-105 transition-all"
                >
                  <Zap className="w-4 h-4 text-black animate-bounce" />
                  <span>🚀 ¡Saltar en la Máquina del Tiempo a {suggestedYear}!</span>
                </button>
              </div>
            )}
          </div>

          {/* Quick Siri Voice Prompts */}
          <div className="w-full mt-4">
            <span className="text-xs text-amber-300 font-bold block mb-2 flex items-center gap-1 justify-center">
              <Sparkles className="w-3.5 h-3.5" /> Preguntas rápidas para probar con Leo:
            </span>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {sampleVoicePrompts.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAskLeo(p.replace('🎙️ ', ''))}
                  className="text-xs bg-[#132347] hover:bg-[#1a3163] text-slate-200 border border-sky-400/20 hover:border-sky-400/50 px-3 py-1.5 rounded-full transition-all hover:scale-102"
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Text Input Bar */}
        <div className="p-3 bg-[#0a1224] border-t border-sky-500/30">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAskLeo(manualText);
            }}
            className="flex items-center gap-2"
          >
            <button
              type="button"
              onClick={toggleMic}
              className={`p-2.5 rounded-2xl transition-all shadow-md ${
                isListening
                  ? 'bg-rose-500 text-white animate-pulse'
                  : 'bg-[#152549] text-cyan-300 hover:text-white border border-cyan-400/40'
              }`}
              title={isListening ? 'Detener micrófono' : 'Hablar por voz'}
            >
              {isListening ? <MicOff className="w-5 h-5 text-white" /> : <Mic className="w-5 h-5" />}
            </button>

            <input
              type="text"
              value={manualText}
              onChange={(e) => setManualText(e.target.value)}
              placeholder="Escribe o pregunta: '¿Qué pasó con los trenes en 1920?'..."
              className="flex-1 bg-[#060b17] border border-sky-500/30 rounded-2xl px-4 py-2.5 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 transition-colors"
            />

            <button
              type="submit"
              disabled={!manualText.trim() || isThinking}
              className="p-2.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold disabled:opacity-40 disabled:cursor-not-allowed shadow-md hover:scale-105 transition-all"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
