// Enhanced Voice Command Recognition, Wake Word Detection & Dispatcher for "Leo en el Tiempo"
import { sounds } from './soundEffects';
import { triggerConfetti } from './confetti';

export interface CommandAction {
  type:
    | 'WAKE_UP'
    | 'TRAVEL_YEAR'
    | 'TRIGGER_PARTY'
    | 'OPEN_MAP'
    | 'OPEN_TUNNEL'
    | 'OPEN_NEWSPAPER'
    | 'OPEN_MINIGAMES'
    | 'OPEN_CUSTOMIZER'
    | 'OPEN_PASSPORT'
    | 'OPEN_MISSIONS'
    | 'OPEN_STREAK'
    | 'TELL_SECRET'
    | 'ASK_QUESTION'
    | 'STOP_SPEECH'
    | 'UNKNOWN';
  payload?: any;
  userQuery: string;
  leoResponse: string;
  suggestedYear?: number;
}

export const HISTORICAL_SECRETS = [
  '¡Te cuento un enigma temporal! En 1928, en la zona bananera del Magdalena, la compañía extranjera no pagaba con pesos colombianos, sino con pagarés y vales que solo servían en sus propios almacenes.',
  '¡Dato cuántico insólito! El 13 de junio de 1954, cuando se inauguró la televisión en Colombia, solo existían 400 televisores en todo el país, traídos expresamente para el palacio y plazas públicas.',
  '¡Secreto de las ondas! En 1929, la primera estación de radio estatal transmitía con tanta potencia que campesinos de la Sabana juraban que el alambre de sus cercas vibraba con la música.',
  '¡Hazaña de ingeniería! El Túnel de La Quiebra, inaugurado en 1929 para el Ferrocarril de Antioquia, medía más de 3.7 kilómetros y fue en su momento el séptimo túnel más largo del planeta Tierra.',
  '¡Curiosidad olímpica! En 1972, Helmut Bellingrodt ganó la primera medalla olímpica en la historia de Colombia: plata en tiro al jabalí en Múnich. ¡Todo el país se paralizó frente a radios y televisores!',
  '¡Revolución constitucional! En 1991, la nueva Constitución colombiana fue redactada por primera vez con participación de líderes indígenas, estudiantes universitarios y diversos sectores sociales en la Séptima Papeleta.',
];

export const QUICK_VOICE_COMMANDS = [
  { label: '🎙️ "¡Oye Leo!"', query: 'Oye Leo', hint: 'Despierta a Leo' },
  { label: '❓ "¿Qué fue el Bogotazo?"', query: 'Oye Leo ¿qué pasó en el Bogotazo de 1948?', hint: 'Pregunta histórica' },
  { label: '🚀 "Viajar a 1948"', query: 'Viajar al año 1948', hint: 'El Bogotazo' },
  { label: '🚂 "Viajar a 1928"', query: 'Viajar a 1928', hint: 'Bananeras y Tren' },
  { label: '📺 "Viajar a 1954"', query: 'Ir a 1954', hint: 'Llegada de la TV' },
  { label: '📜 "Abre el periódico"', query: 'Abre el periódico', hint: 'Noticias de época' },
  { label: '🕊️ "Abre el mapa"', query: 'Abre el mapa de paz', hint: 'Cátedra de paz' },
  { label: '⚡ "Modo Fiesta"', query: 'Modo fiesta', hint: 'Sobrecarga visual' },
  { label: '🌌 "Túnel 3D"', query: 'Abre el túnel cuántico', hint: 'Vuelo espacial' },
  { label: '🔮 "Cuéntame un secreto"', query: 'Cuéntame un secreto histórico', hint: 'Dato insólito' },
];

/**
 * Check if the raw text contains wake-words for Leo:
 * "oye leo", "hola leo", "hey leo", "ok leo", "despierta leo", "leo", "oye león"
 */
export function isWakeWordDetected(rawText: string): boolean {
  const clean = rawText
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

  return (
    clean === 'oye leo' ||
    clean === 'hola leo' ||
    clean === 'hey leo' ||
    clean === 'ok leo' ||
    clean === 'leo' ||
    clean.startsWith('oye leo') ||
    clean.startsWith('hola leo') ||
    clean.startsWith('hey leo') ||
    clean.startsWith('ok leo') ||
    clean.includes('despierta leo') ||
    clean.includes('oye leon') ||
    clean.includes('ayudame leo')
  );
}

/**
 * Strips the wake prefix ("oye leo", "hola leo", etc.) so the core command or question can be evaluated.
 */
export function stripWakePrefix(rawText: string): string {
  let clean = rawText
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

  clean = clean
    .replace(/^oye\s+leo[,\s]*/, '')
    .replace(/^hola\s+leo[,\s]*/, '')
    .replace(/^hey\s+leo[,\s]*/, '')
    .replace(/^ok\s+leo[,\s]*/, '')
    .replace(/^leo[,\s]*/, '')
    .replace(/^despierta\s+leo[,\s]*/, '')
    .replace(/^ayudame\s+leo[,\s]*/, '')
    .trim();

  return clean;
}

/**
 * Synchronously parses voice commands and intents.
 */
export function parseVoiceCommand(text: string): CommandAction {
  const rawClean = text
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

  const clean = stripWakePrefix(rawClean);

  // If the user ONLY said the wake-word ("Oye Leo", "Hola Leo", "Leo")
  if (!clean || clean === 'oye' || clean === 'hola' || clean === 'despierta') {
    return {
      type: 'WAKE_UP',
      userQuery: text,
      leoResponse:
        '¡Aquí estoy a tus órdenes! Dime un año entre 1900 y 1999 para viajar, pídeme abrir el periódico o el mapa, o pregúntame lo que quieras de historia.',
    };
  }

  // 1. Secret / Curious fact
  if (
    clean.includes('secreto') ||
    clean.includes('dato curioso') ||
    clean.includes('curiosidad') ||
    clean.includes('cuentame algo') ||
    clean.includes('cuentame un dato')
  ) {
    const randomSecret = HISTORICAL_SECRETS[Math.floor(Math.random() * HISTORICAL_SECRETS.length)];
    return {
      type: 'TELL_SECRET',
      userQuery: text,
      leoResponse: randomSecret,
    };
  }

  // 2. Party mode / Quantum overload (Easter egg)
  if (
    clean.includes('fiesta') ||
    clean.includes('supernova') ||
    clean.includes('party') ||
    clean.includes('celebrar') ||
    clean.includes('baile') ||
    clean.includes('luces') ||
    clean.includes('sobrecarga')
  ) {
    return {
      type: 'TRIGGER_PARTY',
      userQuery: text,
      leoResponse: '¡Activando sobrecarga de fusión y modo fiesta cuántica! ¡Prepárate para la aurora temporal!',
    };
  }

  // 3. Stop speech
  if (
    clean.includes('detener') ||
    clean.includes('silencio') ||
    clean.includes('callate') ||
    clean.includes('para') ||
    clean.includes('pausar')
  ) {
    return {
      type: 'STOP_SPEECH',
      userQuery: text,
      leoResponse: '¡Entendido! Silenciando audio.',
    };
  }

  // 4. Map of Peace & Conflict
  if (
    clean.includes('mapa') ||
    clean.includes('paz') ||
    clean.includes('conflicto') ||
    clean.includes('catedra')
  ) {
    return {
      type: 'OPEN_MAP',
      userQuery: text,
      leoResponse: '¡Abriendo el Mapa Histórico del Conflicto y Cátedra de Paz de Colombia!',
    };
  }

  // 5. 3D Quantum Tunnel
  if (
    clean.includes('tunel') ||
    clean.includes('3d') ||
    clean.includes('hiperespacio') ||
    clean.includes('volar')
  ) {
    return {
      type: 'OPEN_TUNNEL',
      userQuery: text,
      leoResponse: '¡Iniciando motores del simulador de Túnel Cuántico 3D!',
    };
  }

  // 6. Vintage Newspaper
  if (
    clean.includes('periodico') ||
    clean.includes('prensa') ||
    clean.includes('noticias') ||
    clean.includes('diario')
  ) {
    return {
      type: 'OPEN_NEWSPAPER',
      userQuery: text,
      leoResponse: '¡Imprimiendo la portada del periódico vintage con los titulares de la época!',
    };
  }

  // 7. Minigames & Arcade
  if (
    clean.includes('juego') ||
    clean.includes('minijuego') ||
    clean.includes('arcade') ||
    clean.includes('trivia') ||
    clean.includes('jugar')
  ) {
    return {
      type: 'OPEN_MINIGAMES',
      userQuery: text,
      leoResponse: '¡Cargando el Centro de Minijuegos y Arcade Histórico!',
    };
  }

  // 8. Customizer / Wardrobe
  if (
    clean.includes('vestidor') ||
    clean.includes('ropa') ||
    clean.includes('traje') ||
    clean.includes('cambiar') ||
    clean.includes('vestir') ||
    clean.includes('custom')
  ) {
    return {
      type: 'OPEN_CUSTOMIZER',
      userQuery: text,
      leoResponse: '¡Abriendo el Taller y Vestidor 2D para personalizar a Leo!',
    };
  }

  // 9. Passport & Stamps
  if (clean.includes('pasaporte') || clean.includes('sello') || clean.includes('estampilla')) {
    return {
      type: 'OPEN_PASSPORT',
      userQuery: text,
      leoResponse: '¡Abriendo tu Pasaporte Cuántico con todos tus sellos históricos!',
    };
  }

  // 10. Missions & Challenges
  if (clean.includes('mision') || clean.includes('reto') || clean.includes('tarea')) {
    return {
      type: 'OPEN_MISSIONS',
      userQuery: text,
      leoResponse: '¡Desplegando la bitácora de misiones y retos cronológicos!',
    };
  }

  // 11. Streak
  if (clean.includes('racha') || clean.includes('multiplicador') || clean.includes('dias')) {
    return {
      type: 'OPEN_STREAK',
      userQuery: text,
      leoResponse: '¡Consultando tu Racha de Exploración Cuántica de 5 Días!',
    };
  }

  // 12. Year jump (direct digit e.g. "viajar a 1948", "1954", "ir a 1928")
  const yearMatch = clean.match(/\b(19\d{2})\b/);
  if (yearMatch) {
    const year = parseInt(yearMatch[1], 10);
    // If it's a question like "¿qué pasó en 1948?", treat it as question with suggestedYear
    if (
      clean.includes('que paso') ||
      clean.includes('que ocurrio') ||
      clean.includes('quien') ||
      clean.includes('por que') ||
      clean.includes('como era') ||
      clean.includes('explicame')
    ) {
      return {
        type: 'ASK_QUESTION',
        payload: text,
        suggestedYear: year,
        userQuery: text,
        leoResponse: 'Consultando los registros cuánticos de la historia de Colombia...',
      };
    }

    return {
      type: 'TRAVEL_YEAR',
      payload: year,
      userQuery: text,
      leoResponse: `¡Entendido! Calibrando el cronotopo. ¡Nos teletransportamos al año ${year}!`,
    };
  }

  // Support years spoken in full Spanish words (e.g. "mil novecientos ochenta y cinco")
  if (clean.includes('mil novecientos') || clean.includes('ano')) {
    const decadeWords: Record<string, number> = {
      cero: 0, uno: 1, dos: 2, tres: 3, cuatro: 4, cinco: 5, seis: 6, siete: 7, ocho: 8, nueve: 9,
      diez: 10, once: 11, doce: 12, trece: 13, catorce: 14, quince: 15, dieciseis: 16, diecisiete: 17, dieciocho: 18, diecinueve: 19,
      veinte: 20, veintiuno: 21, veintidos: 22, veintitres: 23, veinticuatro: 24, veinticinco: 25, veintiseis: 26, veintisiete: 27, veintiocho: 28, veintinueve: 29,
      treinta: 30, cuarenta: 40, cincuenta: 50, sesenta: 60, setenta: 70, ochenta: 80, noventa: 90
    };

    let calculatedDecade = 0;
    let foundDecade = false;

    for (const [word, val] of Object.entries(decadeWords)) {
      if (clean.includes(word)) {
        calculatedDecade = Math.max(calculatedDecade, val);
        foundDecade = true;
      }
    }

    const unitWords: Record<string, number> = {
      'y uno': 1, 'y dos': 2, 'y tres': 3, 'y cuatro': 4, 'y cinco': 5, 'y seis': 6, 'y siete': 7, 'y ocho': 8, 'y nueve': 9,
    };
    for (const [uWord, uVal] of Object.entries(unitWords)) {
      if (clean.includes(uWord)) {
        calculatedDecade += uVal;
        break;
      }
    }

    if (foundDecade && calculatedDecade >= 0 && calculatedDecade <= 99) {
      const year = 1900 + calculatedDecade;
      return {
        type: 'TRAVEL_YEAR',
        payload: year,
        userQuery: text,
        leoResponse: `¡Entendido! Calibrando el cronotopo cuántico. ¡Viajamos al año ${year}!`,
      };
    }
  }

  // 13. Questions to Leo (e.g. "¿Quién fue Gaitán?", "¿Por qué se dio el Bogotazo?", etc.)
  if (
    clean.includes('quien') ||
    clean.includes('que') ||
    clean.includes('por que') ||
    clean.includes('porque') ||
    clean.includes('como') ||
    clean.includes('cuando') ||
    clean.includes('donde') ||
    clean.includes('cual') ||
    clean.includes('explicame') ||
    clean.includes('cuenta') ||
    clean.includes('dime')
  ) {
    return {
      type: 'ASK_QUESTION',
      payload: text,
      userQuery: text,
      leoResponse: 'Buscando en la bitácora histórica de Colombia...',
    };
  }

  // 14. Fallback unknown intent
  return {
    type: 'ASK_QUESTION',
    payload: text,
    userQuery: text,
    leoResponse: `Consultando los archivos temporales para "${text}"...`,
  };
}

/**
 * Asynchronously processes voice queries: if it's a question, it queries /api/leo-chat
 * and resolves with a real educational answer about 20th century Colombia.
 */
export async function executeVoiceCommandAsync(
  text: string,
  eraContext?: string
): Promise<CommandAction> {
  const action = parseVoiceCommand(text);

  if (action.type !== 'ASK_QUESTION') {
    return action;
  }

  // Query /api/leo-chat for intelligent educational response
  try {
    const res = await fetch('/api/leo-chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: text,
        eraContext: eraContext || 'Colombia en el Siglo XX',
      }),
    });

    if (res.ok) {
      const data = await res.json();
      if (data.reply) {
        action.leoResponse = data.reply;
      }
    }
  } catch (err) {
    // If offline or network issue, fallback answer is already provided in parseVoiceCommand
  }

  return action;
}
