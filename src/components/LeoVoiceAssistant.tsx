import React, { useState, useEffect, useRef } from 'react';
import { X, Mic, MicOff, Send, Volume2, VolumeX, Sparkles, MessageSquare, Bot, AlertCircle } from 'lucide-react';
import { LeoVoiceSettings } from '../types';

interface LeoVoiceAssistantProps {
  isOpen: boolean;
  onClose: () => void;
  currentEraText: string;
  onSpeakText: (text: string) => void;
  voiceSettings: LeoVoiceSettings;
}

interface ChatMessage {
  sender: 'leo' | 'student';
  text: string;
  timestamp: string;
}

export const LeoVoiceAssistant: React.FC<LeoVoiceAssistantProps> = ({
  isOpen,
  onClose,
  currentEraText,
  onSpeakText,
  voiceSettings,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: 'leo',
      text: '¡Hola! Soy Leo, tu guía en la máquina del tiempo. Pregúntame sobre cualquier acontecimiento, invento, escuela, juego o cambio social de Colombia en el siglo XX (1900 a 1999).',
      timestamp: 'Ahora',
    },
  ]);
  const [inputMsg, setInputMsg] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [loading, setLoading] = useState(false);
  const [micNotice, setMicNotice] = useState<string | null>(null);
  const [currentlySpeakingText, setCurrentlySpeakingText] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Speech Recognition setup (Web Speech API)
  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.lang = 'es-CO';
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputMsg(transcript);
        handleSend(transcript);
        setIsListening(false);
        setMicNotice(null);
      };

      recognition.onerror = (e: any) => {
        setIsListening(false);
        if (e.error === 'not-allowed') {
          setMicNotice('Permiso de micrófono denegado. Puedes escribir tu duda en el cuadro de texto.');
        } else {
          setMicNotice('No logramos escuchar con claridad. Intenta de nuevo o escribe tu duda.');
        }
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, []);

  const toggleMic = () => {
    if (!recognitionRef.current) {
      setMicNotice('El reconocimiento de voz no está habilitado en este navegador. ¡Escribe tu pregunta abajo!');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        setMicNotice(null);
        recognitionRef.current.start();
        setIsListening(true);
      } catch (e) {
        setIsListening(false);
        setMicNotice('No fue posible activar el micrófono. Puedes escribir tu duda.');
      }
    }
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setCurrentlySpeakingText(null);
    }
  };

  const handleSpeak = (text: string) => {
    if (currentlySpeakingText === text) {
      stopSpeaking();
      return;
    }
    setCurrentlySpeakingText(text);
    onSpeakText(text);
  };

  const handleSend = async (customText?: string) => {
    const textToSend = customText || inputMsg;
    if (!textToSend.trim() || loading) return;

    stopSpeaking();
    const userMessage: ChatMessage = {
      sender: 'student',
      text: textToSend.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMsg('');
    setLoading(true);

    try {
      const res = await fetch('/api/leo-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          eraContext: currentEraText,
        }),
      });

      const data = await res.json();
      const replyText =
        data.reply ||
        'Durante el siglo XX colombiano las familias compartieron profundas transformaciones sociales, avances en la educación y una notable riqueza cultural.';

      const leoMessage: ChatMessage = {
        sender: 'leo',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, leoMessage]);

      if (voiceSettings.enabled) {
        handleSpeak(replyText);
      }
    } catch (err) {
      const fallbackMsg: ChatMessage = {
        sender: 'leo',
        text: 'Durante el siglo XX colombiano, la radio comunitaria, el ferrocarril cafetero y la educación rural impulsaron la unión y el progreso de las regiones del país.',
        timestamp: 'Ahora',
      };
      setMessages((prev) => [...prev, fallbackMsg]);
      if (voiceSettings.enabled) {
        handleSpeak(fallbackMsg.text);
      }
    } finally {
      setLoading(false);
    }
  };

  const quickQuestions = [
    '¿Qué fue Radio Sutatenza?',
    '¿Cómo funcionaban los tranvías en 1948?',
    '¿Cuándo votaron las mujeres por primera vez?',
    '¿A qué jugaban los niños en 1970?',
    '¿Por qué fue importante el tren a vapor en 1920?',
    '¿Cómo llegó la televisión en 1954?',
    '¿Qué estableció la Constitución de 1991?',
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-xl bg-gradient-to-b from-[#111c38] via-[#0d162d] to-[#090f1f] border-2 border-sky-400/40 rounded-3xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-4 bg-[#142347] border-b border-sky-500/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-amber-400 shadow-md">
              <img
                src="/src/assets/images/leo_explorer_1789159849482.jpg"
                alt="Leo"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-1.5">
                <span>Asistente Histórico de Leo</span>
                <span className="text-[10px] bg-sky-500/20 text-sky-300 px-2 py-0.5 rounded-full border border-sky-400/30">
                  Colombia Siglo XX
                </span>
              </h3>
              <p className="text-xs text-sky-200">
                Consulta hechos, inventos, vida cotidiana y reformas de 1900 a 1999
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {currentlySpeakingText && (
              <button
                onClick={stopSpeaking}
                className="bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-400/40 px-2.5 py-1 rounded-xl text-xs font-bold flex items-center gap-1 transition-all"
                title="Detener voz"
              >
                <VolumeX className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Pausar Voz</span>
              </button>
            )}
            <button
              onClick={() => {
                stopSpeaking();
                onClose();
              }}
              className="p-1.5 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Notice Banner */}
        {micNotice && (
          <div className="bg-amber-500/15 border-b border-amber-500/30 px-4 py-2 text-xs text-amber-200 flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <span>{micNotice}</span>
            </div>
            <button
              onClick={() => setMicNotice(null)}
              className="text-amber-300 hover:text-white text-xs font-bold"
            >
              Entendido
            </button>
          </div>
        )}

        {/* Listening Indicator Banner */}
        {isListening && (
          <div className="bg-sky-500/20 border-b border-sky-400/40 px-4 py-2.5 flex items-center justify-between animate-pulse">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-4 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-1.5 h-6 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-1.5 h-5 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                <span className="w-1.5 h-3 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '450ms' }} />
              </div>
              <span className="text-xs font-bold text-sky-200">
                Escuchando tu pregunta por micrófono... Habla ahora.
              </span>
            </div>
            <button
              onClick={toggleMic}
              className="bg-rose-500 hover:bg-rose-600 text-white text-xs px-2.5 py-1 rounded-lg font-bold"
            >
              Detener
            </button>
          </div>
        )}

        {/* Quick Questions Pills */}
        <div className="px-4 py-2 bg-[#0d172e] border-b border-slate-800/80 overflow-x-auto no-scrollbar flex items-center gap-2">
          <span className="text-[11px] text-amber-400 font-bold whitespace-nowrap flex items-center gap-1">
            <Sparkles className="w-3 h-3" /> Preguntas rápidas:
          </span>
          {quickQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(q)}
              className="text-xs bg-[#16274e] hover:bg-[#1f376e] text-slate-200 border border-sky-500/20 px-3 py-1 rounded-full whitespace-nowrap transition-colors"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
          {messages.map((m, idx) => {
            const isLeo = m.sender === 'leo';
            const isThisSpeaking = currentlySpeakingText === m.text;
            return (
              <div
                key={idx}
                className={`flex gap-2.5 ${isLeo ? 'justify-start' : 'justify-end'}`}
              >
                {isLeo && (
                  <img
                    src="/src/assets/images/leo_explorer_1789159849482.jpg"
                    alt="Leo"
                    className="w-7 h-7 rounded-full object-cover border border-amber-400 flex-shrink-0 mt-1"
                  />
                )}
                <div
                  className={`max-w-[85%] rounded-2xl p-3 text-sm shadow-md ${
                    isLeo
                      ? 'bg-[#152549] text-slate-100 border border-sky-400/30'
                      : 'bg-gradient-to-r from-sky-600 to-indigo-600 text-white'
                  }`}
                >
                  <p className="leading-relaxed">{m.text}</p>
                  <div className="flex items-center justify-between gap-2 mt-2 pt-1.5 border-t border-white/10 text-[10px] text-slate-400">
                    <span className="font-semibold text-slate-300">
                      {isLeo ? 'Leo el Explorador' : 'Estudiante'}
                    </span>
                    {isLeo && (
                      <button
                        onClick={() => handleSpeak(m.text)}
                        className={`px-2 py-0.5 rounded-lg flex items-center gap-1 font-semibold transition-colors ${
                          isThisSpeaking
                            ? 'bg-amber-400 text-black animate-pulse'
                            : 'bg-sky-500/20 hover:bg-sky-500/30 text-sky-300'
                        }`}
                        title={isThisSpeaking ? 'Detener lectura' : 'Escuchar respuesta de Leo'}
                      >
                        {isThisSpeaking ? (
                          <>
                            <VolumeX className="w-3 h-3" />
                            <span>Detener</span>
                          </>
                        ) : (
                          <>
                            <Volume2 className="w-3 h-3" />
                            <span>Escuchar</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {loading && (
            <div className="flex gap-2.5 justify-start items-center text-xs text-sky-300 animate-pulse">
              <img
                src="/src/assets/images/leo_explorer_1789159849482.jpg"
                alt="Leo"
                className="w-7 h-7 rounded-full object-cover border border-amber-400"
              />
              <div className="bg-[#152549] border border-sky-400/30 px-3 py-2 rounded-2xl">
                Consultando el archivo histórico de Colombia en el siglo XX...
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-[#111e3f] border-t border-sky-500/20">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <button
              type="button"
              onClick={toggleMic}
              className={`p-2.5 rounded-2xl transition-all shadow-md ${
                isListening
                  ? 'bg-rose-500 text-white animate-pulse'
                  : 'bg-[#1a2d5c] text-sky-300 hover:text-white border border-sky-400/30'
              }`}
              title={isListening ? 'Detener micrófono' : 'Hablar por micrófono'}
            >
              {isListening ? <MicOff className="w-5 h-5 text-white" /> : <Mic className="w-5 h-5" />}
            </button>

            <input
              type="text"
              value={inputMsg}
              onChange={(e) => setInputMsg(e.target.value)}
              placeholder="Pregunta sobre trenes, escuelas, el voto de la mujer, juegos o 1948..."
              className="flex-1 bg-[#091224] border border-sky-500/30 rounded-2xl px-4 py-2.5 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-sky-400 transition-colors"
            />

            <button
              type="submit"
              disabled={!inputMsg.trim() || loading}
              className="p-2.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-black font-bold disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:scale-105 transition-all"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
