import React, { useState, useEffect, useRef } from 'react';
import {
  Mic,
  MicOff,
  Sparkles,
  Volume2,
  Zap,
  Radio,
  HelpCircle,
  Flame,
  Globe,
  Newspaper,
  Compass,
  Smile,
  Send,
  ChevronRight,
  Headphones,
  Square,
  VolumeX
} from 'lucide-react';
import { sounds } from '../utils/soundEffects';
import { triggerConfetti } from '../utils/confetti';
import {
  parseVoiceCommand,
  executeVoiceCommandAsync,
  isWakeWordDetected,
  QUICK_VOICE_COMMANDS,
  CommandAction
} from '../utils/leoVoiceCommander';

interface QuantumVoiceHUDProps {
  onTravelToYear: (year: number) => void;
  onOpenConflictMap: () => void;
  onOpenTimeTunnel: () => void;
  onOpenNewspaper: () => void;
  onOpenMinigames: () => void;
  onOpenCustomizer: () => void;
  onOpenPassport: () => void;
  onOpenMissions: () => void;
  onOpenStreakModal: () => void;
  onOpenOyeLeoModal: () => void;
  onSpeakText: (text: string) => void;
  onStopSpeech: () => void;
  speaking: boolean;
  onTriggerPartyMode: () => void;
  isPartyMode: boolean;
  currentEraText?: string;
}

export const QuantumVoiceHUD: React.FC<QuantumVoiceHUDProps> = ({
  onTravelToYear,
  onOpenConflictMap,
  onOpenTimeTunnel,
  onOpenNewspaper,
  onOpenMinigames,
  onOpenCustomizer,
  onOpenPassport,
  onOpenMissions,
  onOpenStreakModal,
  onOpenOyeLeoModal,
  onSpeakText,
  onStopSpeech,
  speaking,
  onTriggerPartyMode,
  isPartyMode,
  currentEraText,
}) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [statusMessage, setStatusMessage] = useState<string>(
    'Di en voz alta: "¡Oye Leo!", "Viajar a 1948" o "Modo fiesta"'
  );
  const [micNotice, setMicNotice] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [handsFreeListening, setHandsFreeListening] = useState(false);

  const recognitionRef = useRef<any>(null);
  const handsFreeRef = useRef(false);
  handsFreeRef.current = handsFreeListening;

  // Function to setup speech recognition
  const initSpeechRecognition = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) return null;

    const recognition = new SpeechRecognition();
    recognition.lang = 'es-CO';
    recognition.continuous = false;
    recognition.interimResults = true;

    recognition.onstart = () => {
      setIsListening(true);
      setStatusMessage('⚡ Escuchando tu voz... ¡Di "Oye Leo", un año o haz una pregunta!');
      setMicNotice(null);
    };

    recognition.onresult = (event: any) => {
      let currentTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        currentTranscript += event.results[i][0].transcript;
      }
      setTranscript(currentTranscript);

      if (event.results[0].isFinal) {
        handleExecute(currentTranscript);
        setIsListening(false);
      }
    };

    recognition.onerror = (e: any) => {
      setIsListening(false);
      if (e.error === 'not-allowed') {
        setMicNotice('Permiso de micrófono bloqueado. Actívalo en la barra de direcciones de tu navegador.');
      } else if (e.error !== 'no-speech') {
        // restart silently if in hands-free mode
        if (handsFreeRef.current) {
          setTimeout(startRecognition, 800);
        }
      }
    };

    recognition.onend = () => {
      setIsListening(false);
      if (handsFreeRef.current) {
        setTimeout(startRecognition, 600);
      }
    };

    return recognition;
  };

  const startRecognition = () => {
    if (!recognitionRef.current) {
      recognitionRef.current = initSpeechRecognition();
    }
    if (recognitionRef.current) {
      try {
        setTranscript('');
        recognitionRef.current.start();
        setIsListening(true);
      } catch (e) {
        // already started
      }
    }
  };

  const stopRecognition = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {}
      setIsListening(false);
    }
  };

  const toggleMic = async () => {
    if (speaking) {
      sounds.playClick();
      onStopSpeech();
      setStatusMessage('Voz de Leo detenida.');
      return;
    }

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setMicNotice(
        'El reconocimiento por voz en vivo no está soportado en este navegador. ¡Toca el botón "¡Oye Leo!" para probarlo!'
      );
      onOpenOyeLeoModal();
      return;
    }

    if (isListening) {
      setHandsFreeListening(false);
      stopRecognition();
      setStatusMessage('Micrófono en pausa. Toca para reactivar.');
      return;
    }

    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        stream.getTracks().forEach((track) => track.stop());
      }
    } catch (err: any) {
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        setMicNotice('Permiso de micrófono bloqueado en tu navegador. Puedes pulsar el botón "¡Oye Leo!"');
        return;
      }
    }

    sounds.playSiriWake();
    setHandsFreeListening(true);
    startRecognition();
  };

  const handleExecute = async (text: string) => {
    if (!text.trim()) return;

    sounds.playWakeWordDetected();

    // Check if it's pure "Oye Leo" wake word or greeting
    if (isWakeWordDetected(text) && text.trim().split(/\s+/).length <= 3) {
      setStatusMessage('✨ ¡"Oye Leo" detectado! Abriendo centro de voz...');
      onSpeakText('¡Aquí estoy! Te escucho. ¿A qué año viajamos o qué quieres consultar?');
      onOpenOyeLeoModal();
      return;
    }

    // Process with async voice command dispatcher
    setStatusMessage(`🚀 Procesando: "${text}"...`);
    const action: CommandAction = await executeVoiceCommandAsync(text, currentEraText);

    setStatusMessage(`🚀 Leo respondió: "${action.leoResponse.slice(0, 80)}..."`);
    onSpeakText(action.leoResponse);

    if (action.type === 'WAKE_UP') {
      onOpenOyeLeoModal();
      return;
    }

    switch (action.type) {
      case 'TRAVEL_YEAR':
        onTravelToYear(action.payload);
        break;

      case 'TRIGGER_PARTY':
        sounds.playQuantumParty();
        triggerConfetti(0.5, 0.4);
        onTriggerPartyMode();
        break;

      case 'OPEN_MAP':
        onOpenConflictMap();
        break;

      case 'OPEN_TUNNEL':
        onOpenTimeTunnel();
        break;

      case 'OPEN_NEWSPAPER':
        onOpenNewspaper();
        break;

      case 'OPEN_MINIGAMES':
        onOpenMinigames();
        break;

      case 'OPEN_CUSTOMIZER':
        onOpenCustomizer();
        break;

      case 'OPEN_PASSPORT':
        onOpenPassport();
        break;

      case 'OPEN_MISSIONS':
        onOpenMissions();
        break;

      case 'OPEN_STREAK':
        onOpenStreakModal();
        break;

      case 'STOP_SPEECH':
        onStopSpeech();
        break;

      case 'TELL_SECRET':
        triggerConfetti(0.3, 0.5);
        break;

      case 'ASK_QUESTION':
        // If it's a deep question, open the Oye Leo modal to see the answer and continue dialogue
        break;

      default:
        break;
    }
  };

  return (
    <div
      className={`relative rounded-3xl p-3.5 sm:p-4.5 transition-all duration-500 select-none ${
        isPartyMode
          ? 'bg-gradient-to-r from-purple-950/85 via-pink-950/85 to-amber-950/85 border-2 border-pink-500/80 shadow-[0_0_40px_rgba(236,72,153,0.5)]'
          : isListening
          ? 'bg-gradient-to-r from-[#0c2049] via-[#132f6b] to-[#0c1f43] border-2 border-cyan-400 shadow-[0_0_35px_rgba(6,182,212,0.5)]'
          : 'bg-gradient-to-r from-[#0b1733]/95 via-[#0e2147]/95 to-[#091630]/95 border border-sky-400/40 shadow-xl'
      } backdrop-blur-md overflow-hidden`}
    >
      {/* Background ambient light */}
      <div className="absolute top-0 right-0 w-80 h-full bg-gradient-to-l from-cyan-400/10 via-amber-400/5 to-transparent pointer-events-none" />

      {/* Main Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left: Glowing Mic & Status */}
        <div className="flex items-center gap-3.5 w-full md:w-auto">
          {/* Main Pulsing Mic Button */}
          <button
            onClick={toggleMic}
            className={`relative flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-lg ${
              isListening
                ? 'bg-gradient-to-tr from-cyan-400 via-sky-500 to-indigo-600 text-white scale-105 shadow-[0_0_30px_rgba(6,182,212,0.9)] animate-pulse ring-4 ring-cyan-400/50'
                : speaking
                ? 'bg-gradient-to-tr from-amber-400 to-orange-500 text-slate-950 scale-105 shadow-[0_0_25px_rgba(245,158,11,0.8)]'
                : 'bg-[#132857] hover:bg-[#1a387b] text-cyan-300 border border-cyan-400/50 hover:scale-105'
            }`}
            title="Toca para activar el micrófono y hablar con Leo"
          >
            {isListening ? (
              <>
                <Mic className="w-6 h-6 animate-bounce" />
                <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-cyan-500" />
                </span>
              </>
            ) : speaking ? (
              <Volume2 className="w-6 h-6 animate-pulse" />
            ) : (
              <Mic className="w-6 h-6" />
            )}
          </button>

          {/* Status & Live Frequency Visualization */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1 text-xs font-black uppercase tracking-wider text-cyan-300">
                <Radio className="w-3.5 h-3.5 animate-pulse text-amber-400" />
                <span>Escucha Cuántica de Leo</span>
              </span>

              {/* Animated Waveform Bars */}
              <div className="flex items-center gap-0.5 h-3.5 px-2 py-0.5 bg-black/45 rounded-full border border-sky-400/30">
                <div
                  className={`w-1 rounded-full bg-cyan-400 transition-all ${
                    isListening || speaking ? 'h-3.5 animate-pulse' : 'h-1'
                  }`}
                />
                <div
                  className={`w-1 rounded-full bg-amber-400 transition-all ${
                    isListening || speaking ? 'h-4 animate-bounce' : 'h-1.5'
                  }`}
                />
                <div
                  className={`w-1 rounded-full bg-indigo-400 transition-all ${
                    isListening || speaking ? 'h-3 animate-pulse' : 'h-1'
                  }`}
                />
                <div
                  className={`w-1 rounded-full bg-emerald-400 transition-all ${
                    isListening || speaking ? 'h-4 animate-bounce' : 'h-1.5'
                  }`}
                />
                <div
                  className={`w-1 rounded-full bg-cyan-300 transition-all ${
                    isListening || speaking ? 'h-2.5 animate-pulse' : 'h-1'
                  }`}
                />
              </div>

              {handsFreeListening && (
                <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 hidden sm:inline">
                  🎙️ Manos Libres ON
                </span>
              )}
            </div>

            {/* Status text or live transcription */}
            <div className="text-xs sm:text-sm font-medium text-slate-200 truncate mt-0.5">
              {transcript ? (
                <span className="text-amber-300 font-bold italic">"{transcript}"</span>
              ) : (
                <span>{statusMessage}</span>
              )}
            </div>
          </div>
        </div>

        {/* Right: Big Dedicated "¡Oye Leo!" Button + Party Mode + Expand */}
        <div className="flex items-center gap-2 w-full md:w-auto justify-end flex-wrap">
          {/* STOP BUTTON WHEN LEO IS SPEAKING */}
          {speaking && (
            <button
              onClick={() => {
                sounds.playClick();
                onStopSpeech();
                setStatusMessage('Voz de Leo silenciada.');
              }}
              className="px-3.5 py-2 rounded-2xl text-xs font-black bg-gradient-to-r from-rose-600 via-red-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white flex items-center gap-1.5 transition-all shadow-[0_0_20px_rgba(239,68,68,0.7)] hover:scale-105 active:scale-95 animate-pulse cursor-pointer"
              title="Detener la voz de Leo de inmediato sin esperar a que termine"
            >
              <Square className="w-3.5 h-3.5 fill-current" />
              <span>⏹️ Silenciar a Leo</span>
            </button>
          )}

          {/* PRIMARY "¡OYE LEO!" BUTTON - Launches the fully elaborated voice experience */}
          <button
            onClick={() => {
              sounds.playWakeWordDetected();
              onOpenOyeLeoModal();
            }}
            className="px-3.5 py-2 rounded-2xl text-xs font-black bg-gradient-to-r from-cyan-500 via-sky-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white flex items-center gap-1.5 transition-all shadow-[0_0_20px_rgba(6,182,212,0.6)] hover:scale-105 active:scale-95"
            title="Abrir el asistente de voz de Leo para hablarle directamente"
          >
            <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
            <span>¡Oye Leo!</span>
          </button>

          {/* Party Mode Easter Egg */}
          <button
            onClick={() => {
              handleExecute('Modo fiesta');
            }}
            className={`px-3 py-2 rounded-2xl text-xs font-black flex items-center gap-1.5 transition-all shadow-md ${
              isPartyMode
                ? 'bg-gradient-to-r from-pink-500 via-purple-500 to-amber-400 text-white animate-pulse shadow-[0_0_20px_rgba(236,72,153,0.7)] scale-105'
                : 'bg-gradient-to-r from-purple-600/50 to-pink-600/50 hover:from-purple-500 hover:to-pink-500 text-pink-200 border border-pink-400/40 hover:scale-105'
            }`}
            title="Factor sorpresa: ¡Sobrecarga cósmica con luces y fuegos artificiales!"
          >
            <span>{isPartyMode ? '🎉 ¡Fiesta Activa!' : '⚡ Modo Fiesta'}</span>
          </button>

          {/* Expand Quick Commands */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="px-2.5 py-2 rounded-2xl text-xs font-bold bg-[#142857] hover:bg-[#1c387b] text-sky-200 border border-sky-400/30 flex items-center gap-1 transition-all"
            title="Ver atajos de voz"
          >
            <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mic permission warning notice if needed */}
      {micNotice && (
        <div className="mt-2.5 px-3 py-1.5 bg-amber-500/15 border border-amber-400/40 rounded-xl text-[11px] text-amber-200 flex items-center justify-between">
          <span>{micNotice}</span>
          <button
            onClick={() => setMicNotice(null)}
            className="text-amber-400 hover:text-white font-bold ml-2 underline cursor-pointer"
          >
            Entendido
          </button>
        </div>
      )}

      {/* Interactive Quick Voice Commands Chips */}
      <div className={`mt-3 pt-2.5 border-t border-sky-500/20 ${isExpanded ? 'block' : 'hidden sm:block'}`}>
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mr-1 flex-shrink-0">
            Comandos Rápidos:
          </span>
          {QUICK_VOICE_COMMANDS.map((cmd, idx) => (
            <button
              key={idx}
              onClick={() => {
                if (cmd.query === 'Oye Leo') {
                  sounds.playWakeWordDetected();
                  onOpenOyeLeoModal();
                } else {
                  handleExecute(cmd.query);
                }
              }}
              className="flex-shrink-0 px-2.5 py-1 rounded-xl bg-[#11234c] hover:bg-cyan-500/30 text-cyan-200 hover:text-white border border-cyan-400/30 hover:border-cyan-400 text-[11px] font-semibold transition-all hover:scale-105 active:scale-95 shadow-sm"
              title={cmd.hint}
            >
              {cmd.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
