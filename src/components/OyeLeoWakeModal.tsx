import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Sparkles,
  Send,
  Zap,
  Radio,
  Compass,
  RotateCcw,
  ArrowRight,
  Flame,
  HelpCircle,
  Clock,
  Square
} from 'lucide-react';
import { sounds } from '../utils/soundEffects';
import { triggerConfetti } from '../utils/confetti';
import { leoVoice } from '../utils/leoVoice';
import { LeoVoiceSettings } from '../types';
import { Leo2DAvatar } from './Leo2DAvatar';
import {
  parseVoiceCommand,
  executeVoiceCommandAsync,
  isWakeWordDetected,
  CommandAction
} from '../utils/leoVoiceCommander';

interface OyeLeoWakeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTravelToYear: (year: number) => void;
  onOpenConflictMap: () => void;
  onOpenTimeTunnel: () => void;
  onOpenNewspaper: () => void;
  onOpenMinigames: () => void;
  onOpenCustomizer: () => void;
  onOpenPassport: () => void;
  onOpenMissions: () => void;
  onOpenStreakModal: () => void;
  onTriggerPartyMode: () => void;
  voiceSettings: LeoVoiceSettings;
  currentYear: number;
  currentEraText: string;
  equippedItems?: Record<string, any>;
}

export const OyeLeoWakeModal: React.FC<OyeLeoWakeModalProps> = ({
  isOpen,
  onClose,
  onTravelToYear,
  onOpenConflictMap,
  onOpenTimeTunnel,
  onOpenNewspaper,
  onOpenMinigames,
  onOpenCustomizer,
  onOpenPassport,
  onOpenMissions,
  onOpenStreakModal,
  onTriggerPartyMode,
  voiceSettings,
  currentYear,
  currentEraText,
  equippedItems = {},
}) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [leoSpeech, setLeoSpeech] = useState<string>(
    '¡Hola! Soy Leo, tu guía en la máquina del tiempo. Di "Oye Leo", pídeme un año como 1948 o hazme cualquier pregunta sobre el siglo XX de Colombia.'
  );
  const [isThinking, setIsThinking] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [suggestedYear, setSuggestedYear] = useState<number | null>(null);
  const [micNotice, setMicNotice] = useState<string | null>(null);
  const [manualText, setManualText] = useState('');

  const recognitionRef = useRef<any>(null);
  const isSpeakingRef = useRef(false);
  const isThinkingRef = useRef(false);

  isSpeakingRef.current = isSpeaking;
  isThinkingRef.current = isThinking;

  // Initialize SpeechRecognition once on mount or when modal opens
  useEffect(() => {
    if (!isOpen) {
      stopListening();
      leoVoice.stop();
      setIsSpeaking(false);
      return;
    }

    sounds.playWakeWordDetected();

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      try {
        const recognition = new SpeechRecognition();
        recognition.lang = 'es-CO';
        recognition.continuous = false;
        recognition.interimResults = true;

        recognition.onstart = () => {
          setIsListening(true);
          setMicNotice(null);
        };

        recognition.onresult = (event: any) => {
          let currentTranscript = '';
          for (let i = event.resultIndex; i < event.results.length; i++) {
            currentTranscript += event.results[i][0].transcript;
          }
          setTranscript(currentTranscript);

          if (event.results[0].isFinal) {
            handleProcessVoiceInput(currentTranscript);
            stopListening();
          }
        };

        recognition.onerror = (e: any) => {
          setIsListening(false);
          if (e.error === 'not-allowed') {
            setMicNotice('Permiso de micrófono no concedido. Puedes escribir tu duda en la barra de abajo.');
          }
        };

        recognition.onend = () => {
          setIsListening(false);
          // Zero automatic restarts - microphone will NEVER turn on/off by itself!
        };

        recognitionRef.current = recognition;
      } catch (e) {
        setMicNotice('No se pudo inicializar el micrófono en este navegador.');
      }
    } else {
      setMicNotice('Reconocimiento de voz no soportado por este navegador. ¡Usa el teclado o los botones sugeridos!');
    }

    return () => {
      stopListening();
    };
  }, [isOpen]);

  const startListening = () => {
    if (isSpeakingRef.current) {
      leoVoice.stop();
      setIsSpeaking(false);
      isSpeakingRef.current = false;
    }

    if (recognitionRef.current && !isListening) {
      try {
        setTranscript('');
        recognitionRef.current.start();
        setIsListening(true);
      } catch (err) {
        // already started
      }
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (err) {}
      setIsListening(false);
    }
  };

  const toggleMic = () => {
    if (isSpeaking) {
      sounds.playClick();
      leoVoice.stop();
      setIsSpeaking(false);
      return;
    }
    if (isListening) {
      stopListening();
      sounds.playClick();
    } else {
      sounds.playSiriWake();
      startListening();
    }
  };

  // Speaks text with Leo's humanized voice engine
  const speakReply = (text: string) => {
    if (!voiceSettings.enabled) return;
    stopListening();
    leoVoice.speak(text, voiceSettings, {
      onStart: () => {
        setIsSpeaking(true);
        isSpeakingRef.current = true;
      },
      onEnd: () => {
        setIsSpeaking(false);
        isSpeakingRef.current = false;
      },
      onError: () => {
        setIsSpeaking(false);
        isSpeakingRef.current = false;
      },
    });
  };

  // Main voice input processor
  const handleProcessVoiceInput = async (rawText: string) => {
    if (!rawText.trim() || isThinking) return;

    sounds.playWakeWordDetected();
    setIsThinking(true);
    setTranscript(rawText);
    setSuggestedYear(null);

    // Stop speaking previous answer
    leoVoice.stop();
    setIsSpeaking(false);

    try {
      // 1. Process with async dispatcher (supports AI chat + local engine + commands)
      const action: CommandAction = await executeVoiceCommandAsync(rawText, currentEraText);

      setLeoSpeech(action.leoResponse);
      speakReply(action.leoResponse);

      // Handle Year jump
      if (action.type === 'TRAVEL_YEAR' && action.payload) {
        setSuggestedYear(action.payload);
        setTimeout(() => {
          onTravelToYear(action.payload);
          onClose();
        }, 1800);
      } else if (action.suggestedYear) {
        setSuggestedYear(action.suggestedYear);
      }

      // Handle other commands
      switch (action.type) {
        case 'TRIGGER_PARTY':
          sounds.playQuantumParty();
          triggerConfetti(0.5, 0.4);
          onTriggerPartyMode();
          break;

        case 'OPEN_MAP':
          setTimeout(() => {
            onOpenConflictMap();
            onClose();
          }, 1200);
          break;

        case 'OPEN_TUNNEL':
          setTimeout(() => {
            onOpenTimeTunnel();
            onClose();
          }, 1200);
          break;

        case 'OPEN_NEWSPAPER':
          setTimeout(() => {
            onOpenNewspaper();
            onClose();
          }, 1200);
          break;

        case 'OPEN_MINIGAMES':
          setTimeout(() => {
            onOpenMinigames();
            onClose();
          }, 1200);
          break;

        case 'OPEN_CUSTOMIZER':
          setTimeout(() => {
            onOpenCustomizer();
            onClose();
          }, 1200);
          break;

        case 'OPEN_PASSPORT':
          setTimeout(() => {
            onOpenPassport();
            onClose();
          }, 1200);
          break;

        case 'OPEN_MISSIONS':
          setTimeout(() => {
            onOpenMissions();
            onClose();
          }, 1200);
          break;

        case 'OPEN_STREAK':
          setTimeout(() => {
            onOpenStreakModal();
            onClose();
          }, 1200);
          break;

        case 'STOP_SPEECH':
          leoVoice.stop();
          setIsSpeaking(false);
          break;

        case 'TELL_SECRET':
          triggerConfetti(0.4, 0.4);
          break;

        default:
          break;
      }
    } catch (err) {
      const fallback =
        'Durante el siglo XX en Colombia vivimos grandes transformaciones en transporte, derechos sociales y medios de comunicación.';
      setLeoSpeech(fallback);
      speakReply(fallback);
    } finally {
      setIsThinking(false);
      setManualText('');
    }
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (manualText.trim()) {
      handleProcessVoiceInput(manualText);
    }
  };

  if (!isOpen) return null;

  const quickPrompts = [
    { label: '🎙️ "¿Qué fue el Bogotazo?"', text: '¿Qué pasó en el Bogotazo de 1948?' },
    { label: '🚀 "Viajar a 1948"', text: 'Viajar al año 1948' },
    { label: '📺 "¿Cuándo llegó la TV?"', text: '¿Cuándo llegó la televisión a Colombia?' },
    { label: '🚂 "¿Cómo eran los trenes?"', text: '¿Cómo eran las locomotoras a vapor en los años 20?' },
    { label: '📜 "Abre el periódico"', text: 'Abre el periódico vintage' },
    { label: '🕊️ "Abre el mapa de paz"', text: 'Abre el mapa de cátedra de paz' },
    { label: '⚡ "Modo fiesta"', text: 'Modo fiesta cuántica' },
    { label: '🔮 "Cuéntame un secreto"', text: 'Cuéntame un secreto histórico' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-xl animate-fadeIn select-none">
      <div className="relative w-full max-w-2xl bg-gradient-to-b from-[#091530] via-[#0d1c42] to-[#060c1d] border-2 border-cyan-400/60 rounded-3xl shadow-[0_0_60px_rgba(6,182,212,0.4)] overflow-hidden flex flex-col max-h-[92vh]">
        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-28 bg-cyan-400/20 blur-3xl pointer-events-none" />

        {/* Top Header */}
        <div className="p-3.5 sm:p-4 bg-[#0d204a]/90 border-b border-cyan-500/30 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-400 via-sky-500 to-indigo-600 p-0.5 shadow-[0_0_20px_rgba(6,182,212,0.6)] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-amber-300 animate-spin" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-black tracking-wide text-white">
                  ¡Oye Leo! • <span className="text-cyan-300">Centro de Voz</span>
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 flex items-center gap-1">
                  <Radio className="w-3 h-3 text-amber-400 animate-pulse" />
                  <span>{isListening ? 'ESCUCHANDO' : isSpeaking ? 'HABLANDO' : 'LISTO'}</span>
                </span>
              </div>
              <p className="text-[11px] text-sky-200">
                Pregúntale cualquier hecho histórico o pídele teletransportarte en el tiempo
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isSpeaking && (
              <button
                onClick={() => {
                  sounds.playClick();
                  leoVoice.stop();
                  setIsSpeaking(false);
                }}
                className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white border border-rose-400 text-xs font-black flex items-center gap-1.5 transition-all shadow-[0_0_12px_rgba(239,68,68,0.6)] animate-pulse cursor-pointer active:scale-95"
                title="Detener voz de Leo de inmediato"
              >
                <Square className="w-3 h-3 fill-current" />
                <span>⏹️ Silenciar voz</span>
              </button>
            )}

            <button
              onClick={() => {
                leoVoice.stop();
                sounds.playModalClose();
                onClose();
              }}
              className="p-1.5 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
              title="Cerrar asistente"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Notice Banner */}
        {micNotice && (
          <div className="bg-amber-500/20 border-b border-amber-400/30 px-4 py-2 text-xs text-amber-200 flex items-center justify-between z-10">
            <span>{micNotice}</span>
            <button
              onClick={() => setMicNotice(null)}
              className="font-bold text-amber-300 underline cursor-pointer"
            >
              Cerrar
            </button>
          </div>
        )}

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
          {/* Holographic Leo Avatar & Speech Orb */}
          <div className="flex flex-col sm:flex-row items-center gap-5 bg-gradient-to-r from-[#0b1b3d]/70 to-[#0e2454]/70 border border-cyan-400/30 rounded-3xl p-4 sm:p-5 shadow-inner relative overflow-hidden">
            {/* Ambient Pulse Ring */}
            <div
              className={`absolute -left-10 top-1/2 -translate-y-1/2 w-48 h-48 rounded-full blur-2xl transition-all ${
                isListening
                  ? 'bg-cyan-400/25 animate-pulse'
                  : isSpeaking
                  ? 'bg-amber-400/25 animate-pulse'
                  : 'bg-sky-500/10'
              }`}
            />

            {/* Leo 2D Avatar Hologram */}
            <div className="relative flex-shrink-0 flex flex-col items-center">
              <div
                className={`relative w-28 h-28 rounded-full p-1 transition-all duration-500 ${
                  isListening
                    ? 'ring-4 ring-cyan-400 shadow-[0_0_30px_rgba(6,182,212,0.8)] scale-105'
                    : isSpeaking
                    ? 'ring-4 ring-amber-400 shadow-[0_0_30px_rgba(245,158,11,0.7)] scale-105'
                    : 'border-2 border-cyan-400/50'
                }`}
              >
                <Leo2DAvatar
                  equippedItems={equippedItems}
                  emotion={isSpeaking ? 'talking' : isListening ? 'curious' : 'happy'}
                  size={104}
                  className="rounded-full"
                />
              </div>

              {/* Pulsing Frequency Bars */}
              <div className="flex items-center gap-1 mt-2.5 h-4 px-3 py-1 bg-black/50 rounded-full border border-cyan-400/30">
                <div
                  className={`w-1 rounded-full bg-cyan-400 transition-all ${
                    isListening || isSpeaking ? 'h-4 animate-bounce' : 'h-1.5'
                  }`}
                />
                <div
                  className={`w-1 rounded-full bg-amber-400 transition-all ${
                    isListening || isSpeaking ? 'h-3 animate-pulse' : 'h-1'
                  }`}
                />
                <div
                  className={`w-1 rounded-full bg-indigo-400 transition-all ${
                    isListening || isSpeaking ? 'h-4 animate-bounce' : 'h-2'
                  }`}
                />
                <div
                  className={`w-1 rounded-full bg-emerald-400 transition-all ${
                    isListening || isSpeaking ? 'h-2.5 animate-pulse' : 'h-1'
                  }`}
                />
                <div
                  className={`w-1 rounded-full bg-cyan-300 transition-all ${
                    isListening || isSpeaking ? 'h-3.5 animate-bounce' : 'h-1.5'
                  }`}
                />
              </div>
            </div>

            {/* Speech Bubble & Dynamic Text */}
            <div className="flex-1 w-full text-center sm:text-left">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-black uppercase tracking-wider text-cyan-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Respuesta de Leo</span>
                </span>
                {isSpeaking && (
                  <span className="text-[10px] text-amber-300 font-bold animate-pulse">
                    🔊 Narrando en voz alta...
                  </span>
                )}
              </div>

              <div className="text-sm sm:text-base font-medium text-slate-100 leading-relaxed bg-[#07132b]/80 border border-sky-400/20 rounded-2xl p-3.5 shadow-inner min-h-[75px] flex items-center">
                {isThinking ? (
                  <div className="flex items-center gap-2 text-cyan-300 animate-pulse text-sm">
                    <Sparkles className="w-4 h-4 animate-spin" />
                    <span>Consultando los anales del tiempo de Colombia...</span>
                  </div>
                ) : (
                  <span>{leoSpeech}</span>
                )}
              </div>

              {/* Stop Speaking Button inside response card */}
              {isSpeaking && (
                <button
                  onClick={() => {
                    sounds.playClick();
                    leoVoice.stop();
                    setIsSpeaking(false);
                  }}
                  className="mt-3 w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-rose-600 via-red-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(239,68,68,0.7)] animate-pulse transition-all cursor-pointer active:scale-95"
                  title="Detener la voz de Leo de inmediato sin esperar a que termine"
                >
                  <Square className="w-3.5 h-3.5 fill-current" />
                  <span>⏹️ Detener voz de Leo (Silenciar ahora)</span>
                </button>
              )}

              {/* Action Button if a Year was detected */}
              {suggestedYear && (
                <div className="mt-3 flex items-center gap-2">
                  <button
                    onClick={() => {
                      sounds.playHyperDrive();
                      onTravelToYear(suggestedYear);
                      onClose();
                    }}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white text-xs font-black flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(6,182,212,0.6)] hover:scale-105"
                  >
                    <span>🚀 Teletransportarse al año {suggestedYear}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Central Pulsing Mic Control Button */}
          {/* Central Mic Control Button & Clear Status */}
          <div className="flex flex-col items-center justify-center py-2 space-y-3">
            <button
              onClick={toggleMic}
              className={`relative px-6 py-3.5 rounded-2xl flex items-center justify-center gap-3 transition-all duration-300 shadow-2xl ${
                isListening
                  ? 'bg-gradient-to-r from-red-500 via-rose-500 to-red-600 text-white scale-105 shadow-[0_0_35px_rgba(244,63,94,0.9)] animate-pulse ring-4 ring-rose-300/60'
                  : isSpeaking
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-[0_0_30px_rgba(245,158,11,0.8)]'
                  : 'bg-gradient-to-r from-cyan-600 via-sky-600 to-indigo-600 text-white hover:scale-105 hover:from-cyan-500 hover:to-indigo-500 border border-cyan-300/50 shadow-[0_0_20px_rgba(6,182,212,0.4)]'
              }`}
              title="Toca para activar o pausar el micrófono"
            >
              {isListening ? (
                <>
                  <Mic className="w-6 h-6 animate-bounce text-white" />
                  <span className="font-black text-xs sm:text-sm tracking-wide">
                    🔴 Escuchando... (Toca para enviar)
                  </span>
                  <span className="flex h-3 w-3 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-white" />
                  </span>
                </>
              ) : isSpeaking ? (
                <>
                  <Volume2 className="w-6 h-6 animate-pulse" />
                  <span className="font-black text-xs sm:text-sm tracking-wide">
                    🔊 Leo Respondiendo... (Toca para silenciar)
                  </span>
                </>
              ) : (
                <>
                  <Mic className="w-6 h-6 text-amber-300" />
                  <span className="font-black text-xs sm:text-sm tracking-wide">
                    🎙️ Presiona para Hablar con Leo
                  </span>
                </>
              )}
            </button>

            {/* Current Speech Live Transcription & Guidance */}
            <div className="text-center max-w-md">
              <div className="text-[11px] text-slate-400 font-medium">
                {isListening
                  ? 'Di tu pregunta (ej: "¿Qué fue el Bogotazo?", "Viajar a 1928")'
                  : 'Control seguro: se activa únicamente al presionar el botón'}
              </div>
              {transcript && (
                <div className="mt-1 text-sm font-black text-amber-300 italic animate-fadeIn bg-black/50 px-3 py-1.5 rounded-xl border border-amber-400/40 shadow-inner">
                  "{transcript}"
                </div>
              )}
            </div>
          </div>

          {/* Quick Voice Command Suggestion Chips */}
          <div>
            <div className="text-[11px] font-black uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-cyan-400" />
              <span>Pruébalo diciendo en voz alta o tocando aquí:</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {quickPrompts.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => handleProcessVoiceInput(p.text)}
                  className="px-2.5 py-2 rounded-xl bg-[#112247] hover:bg-cyan-500/30 text-cyan-200 hover:text-white border border-cyan-400/30 hover:border-cyan-300 text-xs font-semibold text-left transition-all hover:scale-[1.02] active:scale-95 shadow-sm truncate"
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Fallback Manual Text Input for Silent / Non-Mic Environments */}
          <form onSubmit={handleManualSubmit} className="pt-2 border-t border-sky-500/20">
            <div className="text-[11px] text-slate-400 font-bold mb-1.5">
              ¿No puedes usar micrófono? Escribe tu pregunta para probar "¡Oye Leo!":
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={manualText}
                onChange={(e) => setManualText(e.target.value)}
                placeholder="Escribe: ¿Quién fue Gaitán?, Viajar a 1948, Modo fiesta..."
                className="flex-1 bg-[#09142d] border border-cyan-400/40 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-300 focus:ring-1 focus:ring-cyan-300"
              />
              <button
                type="submit"
                disabled={!manualText.trim() || isThinking}
                className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-slate-950 font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-all shadow-md"
              >
                <span>Preguntar</span>
                <Send className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
