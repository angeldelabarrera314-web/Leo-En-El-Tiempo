// Humanized Speech Engine with Advanced Prosody & Dynamic Inflection for "Leo en el Tiempo"
// Eliminates robotic monotone pauses, modulates pitch by punctuation and sentence type,
// incorporates natural breathing gaps (respiración prosódica), and phonetic Spanish normalization.

import { LeoVoiceSettings, ProsodyMode } from '../types';
import { sounds } from './soundEffects';

export interface AvailableVoiceOption {
  name: string;
  lang: string;
  isNatural: boolean;
  voiceURI: string;
}

export interface ProsodicClause {
  text: string;
  clauseType: 'salutation' | 'exclamation' | 'question' | 'continuation' | 'conclusion' | 'neutral';
  pitchDelta: number;
  rateDelta: number;
  breathPauseMs: number;
}

export interface ProsodyProfileInfo {
  id: ProsodyMode;
  title: string;
  subtitle: string;
  badge: string;
  icon: string;
  description: string;
  defaultPitch: number;
  defaultRate: number;
}

export const PROSODY_PROFILES: ProsodyProfileInfo[] = [
  {
    id: 'humano',
    title: 'Natural Humana',
    subtitle: 'Prosodia Dinámica y Orgánica',
    badge: 'Recomendado',
    icon: '🌟',
    description:
      'Modula la entonación según signos de interrogación, exclamaciones y comas, con respiración prosódica natural.',
    defaultPitch: 1.02,
    defaultRate: 0.96,
  },
  {
    id: 'pedagogico',
    title: 'Guía Pedagógico',
    subtitle: 'Cálido y Articulado',
    badge: 'Escolar',
    icon: '🎓',
    description:
      'Ritmo reflexivo (0.93x) con pausas de comprensión claras, ideal para exposiciones escolares y tareas.',
    defaultPitch: 1.00,
    defaultRate: 0.92,
  },
  {
    id: 'expresivo',
    title: 'Aventura Expresiva',
    subtitle: 'Dinamismo Cuántico',
    badge: 'Aventura',
    icon: '🚀',
    description:
      'Mayor inflexión y energía en cada salto temporal, transmitiendo asombro y emoción histórica.',
    defaultPitch: 1.05,
    defaultRate: 0.98,
  },
  {
    id: 'lineal',
    title: 'Lineal Clásico',
    subtitle: 'Síntesis Constante',
    badge: 'Estándar',
    icon: '⚖️',
    description:
      'Tono y velocidad uniformes sin variación de inflexión (síntesis de voz tradicional por navegador).',
    defaultPitch: 1.00,
    defaultRate: 1.00,
  },
];

class LeoVoiceManager {
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private isSpeaking: boolean = false;
  private voiceList: SpeechSynthesisVoice[] = [];
  private voicesLoaded: boolean = false;
  private preferredVoiceName: string | null = null;
  private pauseTimeoutId: any = null;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.loadVoices();
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = () => this.loadVoices();
      }
    }
  }

  private loadVoices() {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    const voices = window.speechSynthesis.getVoices();
    if (voices && voices.length > 0) {
      this.voiceList = voices;
      this.voicesLoaded = true;
    }
  }

  public getAvailableSpanishVoices(): AvailableVoiceOption[] {
    this.loadVoices();
    return this.voiceList
      .filter((v) => v.lang.toLowerCase().startsWith('es'))
      .map((v) => {
        const isNatural =
          v.name.toLowerCase().includes('natural') ||
          v.name.toLowerCase().includes('google') ||
          v.name.toLowerCase().includes('online') ||
          v.name.toLowerCase().includes('neural') ||
          v.name.toLowerCase().includes('paulina') ||
          v.name.toLowerCase().includes('dalia');
        return {
          name: v.name,
          lang: v.lang,
          isNatural,
          voiceURI: v.voiceURI,
        };
      })
      .sort((a, b) => (b.isNatural ? 1 : 0) - (a.isNatural ? 1 : 0));
  }

  public setPreferredVoice(name: string | null) {
    this.preferredVoiceName = name;
  }

  public getBestSpanishVoice(): SpeechSynthesisVoice | null {
    this.loadVoices();
    if (this.voiceList.length === 0) return null;

    // 1. If user explicitly picked a voice
    if (this.preferredVoiceName) {
      const match = this.voiceList.find((v) => v.name === this.preferredVoiceName);
      if (match) return match;
    }

    const spanishVoices = this.voiceList.filter((v) => v.lang.toLowerCase().startsWith('es'));
    if (spanishVoices.length === 0) return null;

    // 2. High priority: Microsoft Natural / Online or Google Neural voices
    const neuralOnline = spanishVoices.find((v) => {
      const n = v.name.toLowerCase();
      return (
        n.includes('natural') ||
        n.includes('google') ||
        n.includes('neural') ||
        n.includes('dalia') ||
        n.includes('sabina') ||
        n.includes('jorge online') ||
        n.includes('gonzalo')
      );
    });
    if (neuralOnline) return neuralOnline;

    // 3. Apple Siri / macOS high quality voices
    const appleSiri = spanishVoices.find((v) => {
      const n = v.name.toLowerCase();
      return n.includes('paulina') || n.includes('mónica') || n.includes('monica');
    });
    if (appleSiri) return appleSiri;

    // 4. Colombian Spanish regional voice
    const colombianVoice = spanishVoices.find((v) => v.lang.toLowerCase().includes('es-co'));
    if (colombianVoice) return colombianVoice;

    // 5. Latin American Spanish (Mexico, US)
    const latamVoice = spanishVoices.find(
      (v) => v.lang.toLowerCase().includes('es-mx') || v.lang.toLowerCase().includes('es-us')
    );
    if (latamVoice) return latamVoice;

    // 6. Any other Spanish voice that is not robotic eSpeak
    const nonEspeak = spanishVoices.find((v) => !v.name.toLowerCase().includes('espeak'));
    if (nonEspeak) return nonEspeak;

    return spanishVoices[0];
  }

  /**
   * Normalizes abbreviations, numbers, and historical Colombian terms
   * so the browser voice synthesizes them with natural phonetics instead of spelling.
   */
  public preprocessColombianSpanish(rawText: string): string {
    let text = rawText
      // Replace Markdown and unwanted formatting
      .replace(/[*_#`~]/g, '')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      // Remove emojis safely
      .replace(/[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu, '')
      // Expand centuries
      .replace(/\bs\.\s*XX\b/gi, 'siglo veinte')
      .replace(/\bsiglo\s*XX\b/gi, 'siglo veinte')
      .replace(/\bs\.\s*XIX\b/gi, 'siglo diecinueve')
      .replace(/\bsiglo\s*XIX\b/gi, 'siglo diecinueve')
      .replace(/\bs\.\s*XXI\b/gi, 'siglo veintiuno')
      .replace(/\bsiglo\s*XXI\b/gi, 'siglo veintiuno')
      // Era abbreviations
      .replace(/\ba\.\s*C\./gi, 'antes de Cristo')
      .replace(/\bd\.\s*C\./gi, 'después de Cristo')
      // Common abbreviations
      .replace(/\bn[°º.]\s*/gi, 'número ')
      .replace(/\bart\.\s*/gi, 'artículo ')
      .replace(/\bpág\.\s*/gi, 'página ')
      .replace(/\bEE\.\s*UU\./gi, 'Estados Unidos')
      .replace(/\bTV\b/g, 'televisión')
      .replace(/\bkm\b/gi, 'kilómetros')
      // Smooth em-dashes and long hyphens into natural pauses
      .replace(/—|–/g, ', ')
      // Normalize multiple spaces and punctuation
      .replace(/\s+/g, ' ')
      .trim();

    return text;
  }

  /**
   * Divides the narrative into prosodic clauses, attributing pitch, rate, and breath pauses
   * according to syntactic emotion, interrogation, exclamation, and commas.
   */
  public segmentIntoProsodicClauses(text: string, settings: LeoVoiceSettings): ProsodicClause[] {
    const cleaned = this.preprocessColombianSpanish(text);
    if (!cleaned) return [];

    const mode = settings.prosodyMode || 'humano';
    const usePauses = settings.prosodicPauses !== false;
    const inflectionAmount =
      typeof settings.prosodicInflection === 'number' ? settings.prosodicInflection : 0.12;

    // Mode multipliers
    const modePitchMult = mode === 'lineal' ? 0 : mode === 'expresivo' ? 1.4 : mode === 'pedagogico' ? 0.75 : 1.0;
    const modeRateMult = mode === 'lineal' ? 0 : mode === 'expresivo' ? 1.2 : mode === 'pedagogico' ? 0.7 : 1.0;
    const pauseMult = !usePauses ? 0.3 : mode === 'pedagogico' ? 1.35 : mode === 'expresivo' ? 1.0 : 1.0;

    // Break by sentence terminals (. ! ?) while keeping the punctuation
    const sentenceTokens = cleaned.match(/[^.!?]+[.!?]+|[^.!?]+$/g) || [cleaned];
    const clauses: ProsodicClause[] = [];

    sentenceTokens.forEach((sent, sentIdx) => {
      const trimmedSent = sent.trim();
      if (!trimmedSent) return;

      const isLastSentence = sentIdx === sentenceTokens.length - 1;

      // Sub-segment long sentences by commas/semicolons if longer than 75 chars to avoid robotic monologue
      const subParts = trimmedSent.length > 75 ? trimmedSent.split(/(?<=[,;:])\s+/) : [trimmedSent];

      subParts.forEach((part, partIdx) => {
        const textPart = part.trim();
        if (!textPart) return;

        const isLastSubPart = partIdx === subParts.length - 1;
        let clauseType: ProsodicClause['clauseType'] = 'neutral';
        let pitchDelta = 0;
        let rateDelta = 0;
        let breathPauseMs = 130 * pauseMult;

        const lower = textPart.toLowerCase();

        // 1. Salutation (e.g. ¡Hola!, ¡Aterrizamos en...!, ¡Bienvenidos!)
        if (
          lower.startsWith('¡hola') ||
          lower.startsWith('hola') ||
          lower.startsWith('¡aterrizamos') ||
          lower.startsWith('aterrizamos') ||
          lower.startsWith('¡bienvenidos')
        ) {
          clauseType = 'salutation';
          pitchDelta = 0.08 * modePitchMult * (inflectionAmount / 0.12);
          rateDelta = 0.03 * modeRateMult;
          breathPauseMs = 170 * pauseMult;
        }
        // 2. Question clause (rising inquisitive inflection)
        else if (textPart.includes('?') || textPart.startsWith('¿')) {
          clauseType = 'question';
          pitchDelta = 0.07 * modePitchMult * (inflectionAmount / 0.12);
          rateDelta = -0.03 * modeRateMult; // slightly slower for inquisitive clarity
          breathPauseMs = 190 * pauseMult;
        }
        // 3. Exclamation clause (spark of wonder and excitement)
        else if (textPart.includes('!') || textPart.startsWith('¡')) {
          clauseType = 'exclamation';
          pitchDelta = 0.08 * modePitchMult * (inflectionAmount / 0.12);
          rateDelta = 0.04 * modeRateMult; // animated tempo
          breathPauseMs = 180 * pauseMult;
        }
        // 4. Continuation clause (ends with comma, semicolon, or colon)
        else if (textPart.endsWith(',') || textPart.endsWith(';') || textPart.endsWith(':')) {
          clauseType = 'continuation';
          pitchDelta = -0.02 * modePitchMult * (inflectionAmount / 0.12);
          rateDelta = 0;
          breathPauseMs = 115 * pauseMult; // Organic respiration breath pause
        }
        // 5. Conclusion clause (last sentence, cadence fall)
        else if (isLastSentence && isLastSubPart) {
          clauseType = 'conclusion';
          pitchDelta = -0.04 * modePitchMult * (inflectionAmount / 0.12);
          rateDelta = -0.03 * modeRateMult; // warm deceleration at ending
          breathPauseMs = 240 * pauseMult;
        }
        // 6. Neutral declarative clause
        else {
          clauseType = 'neutral';
          pitchDelta = 0;
          rateDelta = 0;
          breathPauseMs = 140 * pauseMult;
        }

        clauses.push({
          text: textPart,
          clauseType,
          pitchDelta,
          rateDelta,
          breathPauseMs: Math.round(breathPauseMs),
        });
      });
    });

    return clauses;
  }

  public speak(
    text: string,
    settings: LeoVoiceSettings,
    callbacks?: {
      onStart?: () => void;
      onEnd?: () => void;
      onError?: () => void;
    }
  ) {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    if (!settings.enabled) return;

    this.stop();

    // Ensure audio context is alive
    try {
      window.speechSynthesis.resume();
    } catch (e) {
      // ignore
    }

    const clauses = this.segmentIntoProsodicClauses(text, settings);
    if (clauses.length === 0) return;

    sounds.playBeacon();

    const selectedVoice = this.getBestSpanishVoice();
    let currentIdx = 0;

    const basePitch = Math.max(0.8, Math.min(1.4, settings.pitch || 1.02));
    const baseRate = Math.max(0.75, Math.min(1.35, settings.rate || 0.96));
    const baseVolume = Math.max(0.1, Math.min(1.0, settings.volume ?? 1.0));

    const speakNext = () => {
      if (currentIdx >= clauses.length) {
        this.isSpeaking = false;
        callbacks?.onEnd?.();
        return;
      }

      const clause = clauses[currentIdx];
      const utterance = new SpeechSynthesisUtterance(clause.text);

      // Compute prosodically modulated pitch and rate
      const effectivePitch = Math.max(0.75, Math.min(1.45, basePitch + clause.pitchDelta));
      const effectiveRate = Math.max(0.75, Math.min(1.35, baseRate + clause.rateDelta));

      utterance.pitch = effectivePitch;
      utterance.rate = effectiveRate;
      utterance.volume = baseVolume;

      if (selectedVoice) {
        utterance.voice = selectedVoice;
        utterance.lang = selectedVoice.lang;
      } else {
        utterance.lang = 'es-CO';
      }

      utterance.onstart = () => {
        if (currentIdx === 0) {
          this.isSpeaking = true;
          callbacks?.onStart?.();
        }
      };

      utterance.onend = () => {
        currentIdx++;
        // Apply prosodic respiration pause between clauses
        const pauseTime = clause.breathPauseMs || 100;
        this.pauseTimeoutId = setTimeout(speakNext, pauseTime);
      };

      utterance.onerror = () => {
        this.isSpeaking = false;
        callbacks?.onError?.();
      };

      this.currentUtterance = utterance;
      window.speechSynthesis.speak(utterance);
    };

    // Small tick after stop() to let browser engine clear safely
    this.pauseTimeoutId = setTimeout(speakNext, 50);
  }

  public stop() {
    if (this.pauseTimeoutId) {
      clearTimeout(this.pauseTimeoutId);
      this.pauseTimeoutId = null;
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch (e) {
        // ignore
      }
      this.isSpeaking = false;
    }
  }

  public getSpeakingState(): boolean {
    return (
      this.isSpeaking ||
      (typeof window !== 'undefined' && 'speechSynthesis' in window && window.speechSynthesis.speaking)
    );
  }
}

export const leoVoice = new LeoVoiceManager();
