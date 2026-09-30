// Procedural Web Audio API Instrumental Synthesizer for "Leo en el Tiempo"
// Generates 100% clean, harmonic instrumental melodies and chords for each decade of 20th-century Colombia.
// ZERO noise buffers, ZERO static crackle, ZERO harsh frequencies or electrical hums. Pure acoustic & melodic warmth.

export interface DecadeSoundscapeInfo {
  id: string;
  name: string;
  decade: string;
  description: string;
  instruments: string[];
  icon: string;
  color: string;
}

export const DECADE_SOUNDSCAPES: Record<string, DecadeSoundscapeInfo> = {
  '1900': {
    id: '1900',
    name: 'Vals Apacible de Piano Acústico',
    decade: 'Años 1900-1910',
    description: 'Sereno vals del cambio de siglo con notas de piano y arpegios cristalinos en compás de 3/4.',
    instruments: ['Piano Acústico', 'Arpegios Suaves', 'Armonía Clásica'],
    icon: '🎹',
    color: '#d97706',
  },
  '1920': {
    id: '1920',
    name: 'Guitarra Andina y Melodía de Bambuco',
    decade: 'Años 20 y 30',
    description: 'Armonía tradicional andina colombiana con acordes limpios de guitarra acústica y flauta dulce.',
    instruments: ['Guitarra Andina', 'Flauta Melódica', 'Bajo Acústico'],
    icon: '🎸',
    color: '#059669',
  },
  '1940': {
    id: '1940',
    name: 'Bolero Romántico y Guitarra Española',
    decade: 'Años 40',
    description: 'Cálida cadencia de bolero con arpegios punteados de cuerdas de nylon y acordes armoniosos.',
    instruments: ['Guitarra Española', 'Acordes de Bolero', 'Bajo Cálido'],
    icon: '🎼',
    color: '#dc2626',
  },
  '1950': {
    id: '1950',
    name: 'Campanillas Escolares y Armonía Juvenil',
    decade: 'Años 50',
    description: 'Luminosos acordes pedagógicos de campanillas y guitarra suave evocando la escuela y la primera TV.',
    instruments: ['Campanillas Musicales', 'Acordes Corales', 'Melodía Escolar'],
    icon: '🔔',
    color: '#7c3aed',
  },
  '1960': {
    id: '1960',
    name: 'Balada Sesentera y Órgano Cálido',
    decade: 'Años 60',
    description: 'Nostálgica balada instrumental con acordes aterciopelados y una melodía serena sin estridencias.',
    instruments: ['Órgano Melódico', 'Balada Instrumental', 'Armonías Dulces'],
    icon: '🎶',
    color: '#0284c7',
  },
  '1970': {
    id: '1970',
    name: 'Piano Eléctrico Rhodes y Jazz Latino',
    decade: 'Años 70',
    description: 'Elegantes acordes mayores séptima de piano eléctrico clásico con una atmósfera relajante y luminosa.',
    instruments: ['Piano Rhodes', 'Acordes Maj7', 'Vibrafono'],
    icon: '✨',
    color: '#2563eb',
  },
  '1980': {
    id: '1980',
    name: 'Marimba Mágica de Macondo (Gabo Nobel)',
    decade: 'Años 80',
    description: 'Alegres arpegios cristalinos de marimba colombiana celebrando el Nobel de 1982 con suaves capas armónicas.',
    instruments: ['Marimba Colombiana', 'Cuerdas Melódicas', 'Arpegio Macondiano'],
    icon: '🌴',
    color: '#ea580c',
  },
  '1990': {
    id: '1990',
    name: 'Campanas Digitales y Acordes de Esperanza',
    decade: 'Años 90',
    description: 'Optimistas arpegios armónicos y campanas afinadas inspiradas en la Constitución de 1991.',
    instruments: ['Campana Afinada', 'Acordes de Esperanza', 'Arpegio Armónico'],
    icon: '📜',
    color: '#0d9488',
  },
};

export function getDecadeKeyForYear(year: number): string {
  if (year < 1920) return '1900';
  if (year < 1940) return '1920';
  if (year < 1950) return '1940';
  if (year < 1960) return '1950';
  if (year < 1970) return '1960';
  if (year < 1980) return '1970';
  if (year < 1990) return '1980';
  return '1990';
}

export type AmbienceStateListener = (state: {
  isPlaying: boolean;
  decadeKey: string;
  info: DecadeSoundscapeInfo;
  volume: number;
  isDucked: boolean;
}) => void;

class DecadeAmbienceSynthesizer {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private duckGain: GainNode | null = null;

  // Active audio nodes to stop during crossfade
  private activeGenerators: { stop: () => void }[] = [];

  private isPlaying: boolean = false;
  private userEnabled: boolean = true;
  private currentYear: number = 1954;
  private currentDecadeKey: string = '1950';
  // Pleasant, clean default volume
  private userVolume: number = 0.7;
  private isDucked: boolean = false;

  private listeners: Set<AmbienceStateListener> = new Set();

  constructor() {
    if (typeof window !== 'undefined') {
      try {
        const savedEnabled = localStorage.getItem('leo_ambience_enabled');
        if (savedEnabled !== null) {
          this.userEnabled = savedEnabled === 'true';
        }
        const savedVolume = localStorage.getItem('leo_ambience_volume');
        if (savedVolume !== null) {
          const parsed = parseFloat(savedVolume);
          if (!isNaN(parsed) && parsed >= 0 && parsed <= 1) {
            this.userVolume = parsed;
          }
        }
      } catch (e) {
        // ignore
      }

      // Auto-unlock audio context on first click/interaction
      const autoUnlock = () => {
        if (this.ctx && this.ctx.state === 'suspended') {
          this.ctx.resume();
        }
        if (this.userEnabled && !this.isPlaying) {
          this.play();
        }
        window.removeEventListener('click', autoUnlock);
        window.removeEventListener('pointerdown', autoUnlock);
        window.removeEventListener('touchstart', autoUnlock);
        window.removeEventListener('keydown', autoUnlock);
      };

      window.addEventListener('click', autoUnlock, { once: true });
      window.addEventListener('pointerdown', autoUnlock, { once: true });
      window.addEventListener('touchstart', autoUnlock, { once: true });
      window.addEventListener('keydown', autoUnlock, { once: true });
    }
  }

  public subscribe(listener: AmbienceStateListener): () => void {
    this.listeners.add(listener);
    listener(this.getState());
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    const state = this.getState();
    this.listeners.forEach((cb) => {
      try {
        cb(state);
      } catch (e) {}
    });
  }

  public getState() {
    return {
      isPlaying: this.isPlaying && this.userEnabled,
      decadeKey: this.currentDecadeKey,
      info: DECADE_SOUNDSCAPES[this.currentDecadeKey] || DECADE_SOUNDSCAPES['1950'],
      volume: this.userVolume,
      isDucked: this.isDucked,
    };
  }

  private getAudioContext(): AudioContext | null {
    try {
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        if (!AudioCtx) return null;
        this.ctx = new AudioCtx();
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      return this.ctx;
    } catch (e) {
      return null;
    }
  }

  private initGraph() {
    const ctx = this.getAudioContext();
    if (!ctx) return;

    if (!this.masterGain) {
      this.masterGain = ctx.createGain();
      // Master ceiling of 0.28 ensures warm clarity without clipping or distortion
      this.masterGain.gain.setValueAtTime(this.userVolume * 0.28, ctx.currentTime);

      this.duckGain = ctx.createGain();
      this.duckGain.gain.setValueAtTime(1.0, ctx.currentTime);

      this.duckGain.connect(this.masterGain);
      this.masterGain.connect(ctx.destination);
    }
  }

  public togglePlay(): boolean {
    if (this.isPlaying) {
      this.pause();
      return false;
    } else {
      this.play();
      return true;
    }
  }

  public play() {
    this.userEnabled = true;
    try {
      localStorage.setItem('leo_ambience_enabled', 'true');
    } catch (e) {}

    const ctx = this.getAudioContext();
    if (!ctx) return;

    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    this.initGraph();
    this.stopCurrentGenerators(0.2);
    this.isPlaying = true;
    this.spawnDecadeSoundscape(this.currentDecadeKey);
    this.notify();
  }

  public pause() {
    this.userEnabled = false;
    try {
      localStorage.setItem('leo_ambience_enabled', 'false');
    } catch (e) {}

    this.stopCurrentGenerators(0.4);
    this.isPlaying = false;
    this.notify();
  }

  public setVolume(vol: number) {
    const clamped = Math.max(0, Math.min(1, vol));
    this.userVolume = clamped;
    try {
      localStorage.setItem('leo_ambience_volume', clamped.toString());
    } catch (e) {}

    if (this.masterGain && this.ctx) {
      const now = this.ctx.currentTime;
      this.masterGain.gain.cancelScheduledValues(now);
      this.masterGain.gain.linearRampToValueAtTime(clamped * 0.28, now + 0.1);
    }
    this.notify();
  }

  // Smooth ducking while Leo speaks
  public setDucking(duck: boolean) {
    this.isDucked = duck;
    if (!this.duckGain || !this.ctx) return;
    const now = this.ctx.currentTime;
    this.duckGain.gain.cancelScheduledValues(now);
    if (duck) {
      this.duckGain.gain.linearRampToValueAtTime(0.15, now + 0.15);
    } else {
      this.duckGain.gain.linearRampToValueAtTime(1.0, now + 0.6);
    }
    this.notify();
  }

  public setYear(year: number) {
    this.currentYear = year;
    const newDecadeKey = getDecadeKeyForYear(year);

    if (newDecadeKey !== this.currentDecadeKey) {
      this.currentDecadeKey = newDecadeKey;
      if (this.isPlaying && this.userEnabled) {
        this.crossfadeToDecade(newDecadeKey);
      }
      this.notify();
    }
  }

  private crossfadeToDecade(decadeKey: string) {
    this.stopCurrentGenerators(0.8);
    this.spawnDecadeSoundscape(decadeKey, 0.8);
  }

  private stopCurrentGenerators(fadeDuration: number = 0.4) {
    const list = [...this.activeGenerators];
    this.activeGenerators = [];
    list.forEach((gen) => {
      try {
        gen.stop();
      } catch (e) {}
    });
  }

  private spawnDecadeSoundscape(decadeKey: string, fadeInDuration: number = 0.6) {
    const ctx = this.getAudioContext();
    if (!ctx || !this.duckGain) return;

    // Local gain node for this decade's mix
    const mixGain = ctx.createGain();
    const now = ctx.currentTime;
    mixGain.gain.setValueAtTime(0.0001, now);
    mixGain.gain.exponentialRampToValueAtTime(1.0, now + fadeInDuration);
    mixGain.connect(this.duckGain);

    const generatorsToStop: Array<() => void> = [];

    // Synthesize based on decade (100% clean melodic instruments)
    switch (decadeKey) {
      case '1900':
        this.build1900sMelody(ctx, mixGain, generatorsToStop);
        break;
      case '1920':
        this.build1920sMelody(ctx, mixGain, generatorsToStop);
        break;
      case '1940':
        this.build1940sMelody(ctx, mixGain, generatorsToStop);
        break;
      case '1950':
        this.build1950sMelody(ctx, mixGain, generatorsToStop);
        break;
      case '1960':
        this.build1960sMelody(ctx, mixGain, generatorsToStop);
        break;
      case '1970':
        this.build1970sMelody(ctx, mixGain, generatorsToStop);
        break;
      case '1980':
        this.build1980sMelody(ctx, mixGain, generatorsToStop);
        break;
      case '1990':
      default:
        this.build1990sMelody(ctx, mixGain, generatorsToStop);
        break;
    }

    this.activeGenerators.push({
      stop: () => {
        try {
          const t = ctx.currentTime;
          mixGain.gain.cancelScheduledValues(t);
          mixGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.4);
          setTimeout(() => {
            generatorsToStop.forEach((stopFn) => {
              try {
                stopFn();
              } catch (e) {}
            });
            try {
              mixGain.disconnect();
            } catch (e) {}
          }, 450);
        } catch (e) {}
      },
    });
  }

  // =========================================================================
  // HELPER FOR CLEAN, ANTI-CLICK INSTRUMENT NOTES
  // =========================================================================
  private playCleanNote(
    ctx: AudioContext,
    destination: GainNode,
    freq: number,
    startTime: number,
    duration: number,
    volume: number,
    type: OscillatorType = 'triangle',
    cutoff: number = 1400
  ) {
    try {
      const osc = ctx.createOscillator();
      const filter = ctx.createBiquadFilter();
      const gain = ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, startTime);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(cutoff, startTime);

      // Smooth anti-click ADSR envelope
      gain.gain.setValueAtTime(0.0001, startTime);
      gain.gain.linearRampToValueAtTime(volume, startTime + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(destination);

      osc.start(startTime);
      osc.stop(startTime + duration + 0.05);
    } catch (e) {}
  }

  // =========================================================================
  // CLEAN INSTRUMENTAL COMPOSITIONS BY DECADE (ZERO NOISE / ZERO STATIC)
  // =========================================================================

  // --- 1900s: Vals Apacible de Piano Acústico (Do mayor / Sol mayor en 3/4) ---
  private build1900sMelody(ctx: AudioContext, destination: GainNode, cleanups: Array<() => void>) {
    let isRunning = true;
    const waltzSequence = [
      // Measure 1: C major
      { bass: 261.63, chord: [523.25, 659.25], melody: 783.99 }, // C4, C5+E5, G5
      { bass: 261.63, chord: [523.25, 659.25], melody: 659.25 }, // C4, C5+E5, E5
      // Measure 2: G major
      { bass: 196.0, chord: [493.88, 587.33], melody: 783.99 }, // G3, B4+D5, G5
      { bass: 196.0, chord: [493.88, 587.33], melody: 587.33 }, // G3, B4+D5, D5
      // Measure 3: A minor
      { bass: 220.0, chord: [440.0, 523.25], melody: 659.25 }, // A3, A4+C5, E5
      { bass: 220.0, chord: [440.0, 523.25], melody: 523.25 }, // A3, A4+C5, C5
      // Measure 4: F major
      { bass: 174.61, chord: [440.0, 523.25], melody: 587.33 }, // F3, A4+C5, D5
      { bass: 196.0, chord: [493.88, 587.33], melody: 523.25 }, // G3, B4+D5, C5
    ];

    let step = 0;
    const interval = setInterval(() => {
      if (!isRunning || ctx.state !== 'running') return;
      try {
        const t = ctx.currentTime;
        const current = waltzSequence[step % waltzSequence.length];
        step++;

        // 1. Bass note (Beat 1 of 3/4)
        this.playCleanNote(ctx, destination, current.bass, t, 0.9, 0.22, 'triangle', 800);

        // 2. Chords on beats 2 & 3
        current.chord.forEach((freq) => {
          this.playCleanNote(ctx, destination, freq, t + 0.32, 0.4, 0.12, 'triangle', 1200);
          this.playCleanNote(ctx, destination, freq, t + 0.64, 0.4, 0.12, 'triangle', 1200);
        });

        // 3. Delicate melody note
        this.playCleanNote(ctx, destination, current.melody, t, 0.8, 0.18, 'sine', 1600);
      } catch (e) {}
    }, 980);

    cleanups.push(() => {
      isRunning = false;
      clearInterval(interval);
    });
  }

  // --- 1920s: Guitarra Andina y Melodía de Bambuco (Tiple y Guitarra limpia) ---
  private build1920sMelody(ctx: AudioContext, destination: GainNode, cleanups: Array<() => void>) {
    let isRunning = true;
    const bambucoArpeggios = [
      [261.63, 329.63, 392.0, 523.25], // C major arpeggio
      [293.66, 349.23, 440.0, 587.33], // D minor arpeggio
      [329.63, 392.0, 493.88, 659.25], // E minor arpeggio
      [349.23, 440.0, 523.25, 698.46], // F major arpeggio
      [392.0, 493.88, 587.33, 783.99], // G major arpeggio
      [261.63, 329.63, 392.0, 523.25], // C major
    ];

    let patternIdx = 0;
    const interval = setInterval(() => {
      if (!isRunning || ctx.state !== 'running') return;
      try {
        const t = ctx.currentTime;
        const notes = bambucoArpeggios[patternIdx % bambucoArpeggios.length];
        patternIdx++;

        // Staggered acoustic guitar fingerpicking (pure tones)
        notes.forEach((freq, idx) => {
          this.playCleanNote(ctx, destination, freq, t + idx * 0.18, 0.6, 0.16, 'triangle', 1500);
        });

        // Warm soft bass tone
        this.playCleanNote(ctx, destination, notes[0] / 2, t, 1.2, 0.22, 'sine', 600);
      } catch (e) {}
    }, 850);

    cleanups.push(() => {
      isRunning = false;
      clearInterval(interval);
    });
  }

  // --- 1940s: Bolero Romántico y Guitarra Española (Dm -> G7 -> Cmaj7 -> Am) ---
  private build1940sMelody(ctx: AudioContext, destination: GainNode, cleanups: Array<() => void>) {
    let isRunning = true;
    const boleroProgressions = [
      { bass: 146.83, chord: [293.66, 349.23, 440.0], melody: 587.33 }, // Dm (D3, D4+F4+A4, D5)
      { bass: 196.0, chord: [246.94, 392.0, 493.88], melody: 659.25 }, // G7 (G3, B3+G4+B4, E5)
      { bass: 130.81, chord: [261.63, 329.63, 493.88], melody: 523.25 }, // Cmaj7 (C3, C4+E4+B4, C5)
      { bass: 220.0, chord: [261.63, 329.63, 440.0], melody: 440.0 }, // Am (A3, C4+E4+A4, A4)
    ];

    let step = 0;
    const interval = setInterval(() => {
      if (!isRunning || ctx.state !== 'running') return;
      try {
        const t = ctx.currentTime;
        const current = boleroProgressions[step % boleroProgressions.length];
        step++;

        // Deep warm nylon guitar bass
        this.playCleanNote(ctx, destination, current.bass, t, 1.8, 0.25, 'sine', 700);

        // Strummed romantic chord (gentle nylon guitar delay)
        current.chord.forEach((freq, idx) => {
          this.playCleanNote(ctx, destination, freq, t + idx * 0.05, 1.4, 0.14, 'triangle', 1300);
        });

        // Romantic melody note
        this.playCleanNote(ctx, destination, current.melody, t + 0.35, 1.2, 0.18, 'sine', 1600);
      } catch (e) {}
    }, 1800);

    cleanups.push(() => {
      isRunning = false;
      clearInterval(interval);
    });
  }

  // --- 1950s: Campanillas Escolares y Armonía Juvenil (Radio Sutatenza & TV 1954) ---
  private build1950sMelody(ctx: AudioContext, destination: GainNode, cleanups: Array<() => void>) {
    let isRunning = true;
    // Pure, joyful broadcast bell melody (C5, G4, A4, F4, G4, E4, C4)
    const bellMelody = [
      { bell: 523.25, chord: [261.63, 329.63] }, // C5 + C4/E4
      { bell: 392.0, chord: [196.0, 246.94] }, // G4 + G3/B3
      { bell: 440.0, chord: [220.0, 261.63] }, // A4 + A3/C4
      { bell: 349.23, chord: [174.61, 261.63] }, // F4 + F3/C4
      { bell: 392.0, chord: [196.0, 293.66] }, // G4 + G3/D4
      { bell: 329.63, chord: [164.81, 246.94] }, // E4 + E3/B3
      { bell: 261.63, chord: [130.81, 196.0] }, // C4 + C3/G3
      { bell: 523.25, chord: [261.63, 392.0] }, // C5 + C4/G4
    ];

    let noteIdx = 0;
    const interval = setInterval(() => {
      if (!isRunning || ctx.state !== 'running') return;
      try {
        const t = ctx.currentTime;
        const current = bellMelody[noteIdx % bellMelody.length];
        noteIdx++;

        // Crystal clean bell tone (sine with fast decay)
        this.playCleanNote(ctx, destination, current.bell, t, 1.2, 0.22, 'sine', 2000);

        // Warm supportive acoustic backing chord
        current.chord.forEach((f) => {
          this.playCleanNote(ctx, destination, f, t, 1.4, 0.12, 'triangle', 1100);
        });
      } catch (e) {}
    }, 1100);

    cleanups.push(() => {
      isRunning = false;
      clearInterval(interval);
    });
  }

  // --- 1960s: Balada Sesentera y Órgano Cálido (Aterciopelado y suave) ---
  private build1960sMelody(ctx: AudioContext, destination: GainNode, cleanups: Array<() => void>) {
    let isRunning = true;
    const chords60s = [
      [261.63, 329.63, 392.0, 523.25], // C
      [220.0, 261.63, 329.63, 440.0], // Am
      [174.61, 220.0, 261.63, 349.23], // F
      [196.0, 246.94, 293.66, 392.0], // G
    ];

    let chordIdx = 0;
    const interval = setInterval(() => {
      if (!isRunning || ctx.state !== 'running') return;
      try {
        const t = ctx.currentTime;
        const current = chords60s[chordIdx % chords60s.length];
        chordIdx++;

        // Smooth mellow organ chords with soft attack
        current.forEach((freq) => {
          this.playCleanNote(ctx, destination, freq, t, 2.2, 0.12, 'triangle', 1000);
        });

        // Round melodic note floating on top
        const topNote = current[3] * 1.5;
        this.playCleanNote(ctx, destination, topNote, t + 0.4, 1.6, 0.14, 'sine', 1400);
      } catch (e) {}
    }, 2400);

    cleanups.push(() => {
      isRunning = false;
      clearInterval(interval);
    });
  }

  // --- 1970s: Piano Eléctrico Rhodes y Jazz Latino (Maj7 limpios) ---
  private build1970sMelody(ctx: AudioContext, destination: GainNode, cleanups: Array<() => void>) {
    let isRunning = true;
    const chords70s = [
      [261.63, 329.63, 392.0, 493.88], // Cmaj7 (C4, E4, G4, B4)
      [349.23, 440.0, 523.25, 659.25], // Fmaj7 (F4, A4, C5, E5)
      [329.63, 392.0, 493.88, 587.33], // Em7 (E4, G4, B4, D5)
      [220.0, 277.18, 392.0, 440.0], // A7 (A3, C#4, G4, A4)
    ];

    let step = 0;
    const interval = setInterval(() => {
      if (!isRunning || ctx.state !== 'running') return;
      try {
        const t = ctx.currentTime;
        const current = chords70s[step % chords70s.length];
        step++;

        // Velvet warm electric piano chords
        current.forEach((freq, idx) => {
          this.playCleanNote(ctx, destination, freq, t + idx * 0.03, 2.4, 0.14, 'sine', 1500);
        });

        // Bass root note
        this.playCleanNote(ctx, destination, current[0] / 2, t, 2.2, 0.22, 'sine', 500);
      } catch (e) {}
    }, 2200);

    cleanups.push(() => {
      isRunning = false;
      clearInterval(interval);
    });
  }

  // --- 1980s: Marimba Mágica de Macondo (Gabo Nobel 1982 - Cumbia suave) ---
  private build1980sMelody(ctx: AudioContext, destination: GainNode, cleanups: Array<() => void>) {
    let isRunning = true;
    // Pentatonic marimba motif (C5, E5, G5, A5, C6)
    const marimbaPattern = [
      { note: 523.25, bass: 130.81 }, // C5, Bass C3
      { note: 659.25, bass: null }, // E5
      { note: 783.99, bass: null }, // G5
      { note: 880.0, bass: 174.61 }, // A5, Bass F3
      { note: 1046.5, bass: null }, // C6
      { note: 880.0, bass: null }, // A5
      { note: 783.99, bass: 196.0 }, // G5, Bass G3
      { note: 659.25, bass: null }, // E5
    ];

    let step = 0;
    const interval = setInterval(() => {
      if (!isRunning || ctx.state !== 'running') return;
      try {
        const t = ctx.currentTime;
        const current = marimbaPattern[step % marimbaPattern.length];
        step++;

        // Clean wooden marimba strike (triangle wave with fast decay)
        this.playCleanNote(ctx, destination, current.note, t, 0.5, 0.22, 'triangle', 1800);

        // Acoustic bass note when present
        if (current.bass) {
          this.playCleanNote(ctx, destination, current.bass, t, 1.2, 0.24, 'sine', 650);
        }
      } catch (e) {}
    }, 380); // Pleasant tropical Colombian tempo

    cleanups.push(() => {
      isRunning = false;
      clearInterval(interval);
    });
  }

  // --- 1990s: Campanas Digitales y Acordes de Esperanza (Constitución 1991) ---
  private build1990sMelody(ctx: AudioContext, destination: GainNode, cleanups: Array<() => void>) {
    let isRunning = true;
    // Civic optimistic arpeggios (D major & A major)
    const notes90s = [
      { bell: 587.33, root: 146.83 }, // D5 + D3
      { bell: 739.99, root: null }, // F#5
      { bell: 880.0, root: 220.0 }, // A5 + A3
      { bell: 1174.66, root: null }, // D6
      { bell: 880.0, root: null }, // A5
      { bell: 739.99, root: 196.0 }, // F#5 + G3
      { bell: 659.25, root: null }, // E5
      { bell: 587.33, root: 146.83 }, // D5 + D3
    ];

    let step = 0;
    const interval = setInterval(() => {
      if (!isRunning || ctx.state !== 'running') return;
      try {
        const t = ctx.currentTime;
        const current = notes90s[step % notes90s.length];
        step++;

        // Crystal bell tone (100% clean sine wave, zero FM screech)
        this.playCleanNote(ctx, destination, current.bell, t, 0.65, 0.18, 'sine', 2200);

        if (current.root) {
          this.playCleanNote(ctx, destination, current.root, t, 1.2, 0.22, 'sine', 600);
        }
      } catch (e) {}
    }, 420);

    cleanups.push(() => {
      isRunning = false;
      clearInterval(interval);
    });
  }
}

export const decadeAmbience = new DecadeAmbienceSynthesizer();
