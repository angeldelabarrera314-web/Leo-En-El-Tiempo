import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

// Gemini Model configuration (using standard models with seamless multi-model fallback)
const CANDIDATE_GEMINI_MODELS = ["gemini-3.8-flash", "gemini-2.5-flash"];

async function generateWithGeminiFallback(ai: GoogleGenAI, requestConfig: any) {
  let lastError: any = null;
  for (const model of CANDIDATE_GEMINI_MODELS) {
    try {
      const response = await ai.models.generateContent({
        ...requestConfig,
        model,
      });
      return response;
    } catch (err: any) {
      lastError = err;
      const errStr = String(err?.message || "");
      if (
        errStr.includes("503") ||
        errStr.includes("demand") ||
        errStr.includes("UNAVAILABLE") ||
        errStr.includes("429") ||
        errStr.includes("RESOURCE_EXHAUSTED")
      ) {
        // Current model experiencing temporary demand spikes; try fallback model
        continue;
      }
      throw err;
    }
  }
  throw lastError;
}

app.use(express.json());

// Preset curated facts database for instant responses and offline reliability in Colombian 20th century history
export const PRESET_COLOMBIA_XX: Record<string, any> = {
  "1903": {
    yearOrEra: "1903 - Separación de Panamá y Nuevas Fronteras",
    title: "1903: Separación de Panamá y Transformación del Territorio",
    shortSummary: "En noviembre de 1903, Panamá proclamó su separación de Colombia tras complejas negociaciones internacionales sobre el canal interoceánico y el desgaste de la Guerra de los Mil Días. Este hecho redefinió las fronteras nacionales e impulsó una profunda reflexión sobre la necesidad de conectar y atender a todas las regiones del país.",
    curiousFacts: [
      "Hasta 1903, el mapa oficial de Colombia incluía el istmo de Panamá, conectando geográficamente a América Central con América del Sur.",
      "En esa época las noticias tardaban semanas en llegar a Bogotá; sin carreteras ni aviación, el correo dependía de vapores por el río Magdalena y mulas por caminos de herradura.",
      "El café colombiano comenzaba a ganar renombre mundial como el principal producto de exportación que financiaba el desarrollo del país."
    ],
    howChildrenLived: "Los niños jugaban en las plazas con trompos de madera tallados a mano, baleros y muñecos de trapo. En los pueblos y veredas colaboraban en las labores familiares y asistían a escuelas con materiales muy sencillos.",
    soundOrSensation: "El golpeteo rítmico del telégrafo en la oficina postal y el paso de los caballos sobre las calles empedradas.",
    leoChallenge: "Observa un mapa de Colombia de 1900 y compáralo con el actual: ¿qué departamentos y fronteras cambiaron en el siglo XX?",
    timeMachineCoordinates: {
      era: "Inicios del Siglo XX - 1903",
      temporalFlux: "98.7%",
      dangerLevel: "Historia Crítica"
    },
    colombianContext: {
      decade: "Década de 1900",
      region: "Istmo de Panamá y Fronteras Nacionales",
      socialTheme: "Geografía, Soberanía y Transformación Territorial"
    }
  },
  "1920": {
    yearOrEra: "1920 - Ferrocarriles, Café y la Danza de los Millones",
    title: "1920: Auge Cafetero, Ferrocarriles Nacionales y Aviación SCADTA",
    shortSummary: "La década de 1920 trajo una veloz modernización a Colombia conocida como 'la danza de los millones'. Las locomotoras a vapor transportaban miles de sacos de café desde las cordilleras hacia los puertos fluviales, mientras en Barranquilla despegaban los primeros hidroaviones de SCADTA (hoy Avianca), convirtiendo a Colombia en pionera de la aviación comercial en América.",
    curiousFacts: [
      "El Río Magdalena era la gran arteria del país: barcos de vapor con grandes ruedas de paletas llevaban pasajeros y café hasta la costa Caribe.",
      "Los primeros automóviles causaban asombro en las calles de Medellín, Cali y Bogotá; la gente se asomaba a los balcones al escuchar sus ruidosos motores.",
      "La indemnización por el canal de Panamá permitió al Estado financiar túneles ferroviarios, puentes metálicos y vías de comunicación."
    ],
    howChildrenLived: "Los niños se divertían con la golosa (rayuela), elevando cometas de caña brava y fabricando carritos con tablas y ruedas de madera.",
    soundOrSensation: "El silbido potente de la locomotora de vapor mezclado con el aroma a café tostado en los pueblos de la cordillera.",
    leoChallenge: "¿Cómo cambió el transporte de alimentos en Colombia el paso de las mulas a los trenes de vapor?",
    timeMachineCoordinates: {
      era: "Años 20 - Década de la Modernización",
      temporalFlux: "99.2%",
      dangerLevel: "Tranquilo"
    },
    colombianContext: {
      decade: "Década de 1920",
      region: "Eje Cafetero, Valle del Magdalena y Barranquilla",
      socialTheme: "Economía Cafetera, Vías Férreas e Innovación Tecnológica"
    }
  },
  "1928": {
    yearOrEra: "1928 - La Huelga de las Bananeras en Ciénaga",
    title: "1928: La Lucha Social por los Derechos Laborales en el Caribe",
    shortSummary: "En noviembre y diciembre de 1928, miles de campesinos y trabajadores de las plantaciones de banano en Ciénaga, Magdalena, iniciaron una histórica huelga pacífica. Exigían jornadas dignas de 8 horas, pago en dinero real en vez de vales de tienda y atención médica. Este acontecimiento sentó las bases de la legislación laboral y la defensa de los derechos humanos en Colombia.",
    curiousFacts: [
      "Antes de esta huelga, muchos trabajadores recibían vales que únicamente podían canjearse en las tiendas propiedad de la misma empresa extranjera.",
      "El escritor Gabriel García Márquez inmortalizó este hito en su obra cumbre 'Cien Años de Soledad', narrando la memoria de su tierra natal.",
      "Las demandas de los trabajadores incluían contar con botiquines médicos en los campamentos y un día de descanso semanal obligatorio."
    ],
    howChildrenLived: "Los hijos de los recolectores crecían en contacto con la naturaleza del Caribe, aprendiendo la sabiduría de la tierra, jugando en los caños y compartiendo cantos tradicionales.",
    soundOrSensation: "La brisa cálida de la Ciénaga Grande y los discursos de los líderes campesinos en la plaza de la estación.",
    leoChallenge: "¿Por qué es fundamental que la ley proteja los derechos y la salud de quienes trabajan en el campo cultivando nuestros alimentos?",
    timeMachineCoordinates: {
      era: "Años 20 - Diciembre de 1928",
      temporalFlux: "96.4%",
      dangerLevel: "Aventura Histórica"
    },
    colombianContext: {
      decade: "Década de 1920",
      region: "Ciénaga, Magdalena (Caribe Colombiano)",
      socialTheme: "Derechos de los Trabajadores y Justicia Social"
    }
  },
  "1948": {
    yearOrEra: "1948 - El 9 de Abril y El Bogotazo",
    title: "1948: El Bogotazo y la Transformación Urbana del País",
    shortSummary: "El 9 de abril de 1948 marcó un antes y un después en la historia contemporánea de Colombia. El asesinato del líder popular Jorge Eliécer Gaitán desató una revuelta masiva en Bogotá y varias capitales. Este suceso transformó la fisonomía de la ciudad, llevó al fin de los tranvías eléctricos y dejó la lección permanente del valor insustituible del diálogo, la convivencia y la paz.",
    curiousFacts: [
      "En abril de 1948 Bogotá era la sede de la Conferencia Panamericana que dio origen a la OEA (Organización de los Estados Americanos).",
      "Los tranvías eléctricos que recorrían la Carrera Séptima tenían timbres de campana característicos y fueron reemplazados progresivamente por buses de gasolina.",
      "Gaitán convocaba multitudes históricas con sus célebres discursos transmitidos por la radiodifusora nacional."
    ],
    howChildrenLived: "Los estudiantes bogotanos vestían uniformes de paño grueso para el frío de la sabana, jugaban a las canicas en los andenes de ladrillo y leían las historietas dominicales en los periódicos.",
    soundOrSensation: "El repique de las campanas del tranvía sobre el asfalto mojado y los pregones de los voceadores de prensa en la Plaza de Bolívar.",
    leoChallenge: "¿Qué diferencias encuentras entre el transporte público de 1948 (el tranvía) y los sistemas que usamos hoy en las ciudades colombianas?",
    timeMachineCoordinates: {
      era: "Años 40 - Abril de 1948",
      temporalFlux: "94.8%",
      dangerLevel: "Historia Clave"
    },
    colombianContext: {
      decade: "Década de 1940",
      region: "Bogotá y Altiplano Cundiboyacense",
      socialTheme: "Historia Política, Convivencia Ciudadana y Vida Urbana"
    }
  },
  "1950": {
    yearOrEra: "1950 - Radio Sutatenza y la Educación Campesina",
    title: "1950: Radio Sutatenza y la Gran Revolución de las Escuelas Rurales",
    shortSummary: "Desde Sutatenza, Boyacá, una emisora radial comunitaria revolucionó la educación en América Latina. A través de radios de transistores de pilas y cartillas ilustradas de Acción Cultural Popular, cientos de miles de campesinos aprendieron a leer, escribir, cultivar y hacer cuentas desde sus veredas, demostrando el inmenso poder de la tecnología al servicio de la educación.",
    curiousFacts: [
      "Radio Sutatenza llegó a ser la red de radio rural más grande del mundo, distribuyendo millones de cartillas y miles de receptores de onda corta.",
      "En las aulas de clase de los años 50, los estudiantes mojaban plumas de metal en tinteros de cerámica encajados en sus pupitres de madera.",
      "No existían calculadoras ni computadores escolares; las operaciones matemáticas se resolvían con tiza sobre grandes tableros negros de pizarra."
    ],
    howChildrenLived: "En las escuelas rurales, los niños caminaban senderos veredales con sus morrales de lona, escuchando las lecciones de la emisora junto a sus padres al caer la tarde.",
    soundOrSensation: "La sintonía inconfundible de Radio Sutatenza en 810 kHz y el olor a madera encerada y tiza fresca en el aula.",
    leoChallenge: "¿Cómo imaginas aprender una materia escolar sintonizando una clase por radio sin ninguna pantalla?",
    timeMachineCoordinates: {
      era: "Años 50 - Educación Rural",
      temporalFlux: "99.4%",
      dangerLevel: "Tranquilo"
    },
    colombianContext: {
      decade: "Década de 1950",
      region: "Sutatenza (Boyacá) y Veredas de Colombia",
      socialTheme: "Educación Popular, Alfabetización y Cultura Campesina"
    }
  },
  "1954": {
    yearOrEra: "1954 - Llegada de la Televisión a Colombia",
    title: "1954: Primera Transmisión de Televisión en Blanco y Negro",
    shortSummary: "El 13 de junio de 1954 se encendió por primera vez la señal de televisión en Colombia. Emitida desde los sótanos de la Biblioteca Nacional de Bogotá, la primera transmisión conectó al país con una tecnología revolucionaria. Familias enteras se congregaban en las salas para contemplar asombradas las primeras imágenes en blanco y negro.",
    curiousFacts: [
      "Los televisores eran tan novedosos y costosos que los primeros dueños invitaban a vecinos y familiares a presenciar las emisiones nocturnas.",
      "Las cámaras de televisión de la época generaban un calor sofocante, obligando a los técnicos a utilizar ventiladores industriales en el estudio.",
      "Todos los programas se transmitían estrictamente en directo: actores, músicos y locutores actuaban sin margen de error ante los televidentes."
    ],
    howChildrenLived: "Los niños vivieron la fascinación de los primeros títeres y cuentos infantiles televisados, turnándose con sus hermanos para observar la pequeña pantalla de vidrio.",
    soundOrSensation: "El zumbido electroestático del tubo de rayos catódicos, la cuenta regresiva del director y la emoción colectiva en los hogares.",
    leoChallenge: "¿Qué impacto tuvo la televisión para unir a las distintas regiones de Colombia a través de las noticias y la música?",
    timeMachineCoordinates: {
      era: "Años 50 - Junio de 1954",
      temporalFlux: "98.9%",
      dangerLevel: "Tranquilo"
    },
    colombianContext: {
      decade: "Década de 1950",
      region: "Bogotá y Red Nacional de Medios",
      socialTheme: "Ciencia, Telecomunicaciones y Cultura Audiovisual"
    }
  },
  "1957": {
    yearOrEra: "1957 - El Plebiscito y el Histórico Voto Femenino",
    title: "1957: Conquista Histórica del Voto Femenino en Colombia",
    shortSummary: "El 1 de diciembre de 1957, tras décadas de valientes liderazgos de mujeres colombianas como Esmeralda Arboleda y Josefina Valencia, las mujeres ejercieron por primera vez su derecho al voto en el plebiscito nacional. Cerca de dos millones de ciudadanas acudieron a las urnas con su nueva cédula, consolidando un paso trascendental para la democracia y la equidad de género en el país.",
    curiousFacts: [
      "La Cédula de Ciudadanía número 20.000.001 fue la primera cédula oficial expedida a una mujer en la historia colombiana.",
      "Hasta 1957 las leyes colombianas consideraban únicamente a los hombres aptos para elegir presidentes, senadores y concejales.",
      "La participación femenina superó ampliamente las expectativas de las autoridades, llenando las mesas de votación en un ambiente festivo y pacífico."
    ],
    howChildrenLived: "Las niñas acompañaron a sus madres y abuelas a los puestos de votación, siendo testigos de un cambio social que les abriría el camino a la educación superior y cargos públicos.",
    soundOrSensation: "El murmullo alegre de las filas ciudadanas, las marchas cívicas en la radio y el orgullo general en las calles.",
    leoChallenge: "¿Por qué la igualdad de derechos políticos entre mujeres y hombres es indispensable para el bienestar de toda la sociedad?",
    timeMachineCoordinates: {
      era: "Años 50 - Diciembre de 1957",
      temporalFlux: "99.5%",
      dangerLevel: "Tranquilo"
    },
    colombianContext: {
      decade: "Década de 1950",
      region: "Territorio Nacional de Colombia",
      socialTheme: "Democracia, Derechos Civiles e Igualdad de Género"
    }
  },
  "1970": {
    yearOrEra: "1970 - Juegos Populares de Barrio y Crecimiento Urbano",
    title: "1970: Tradición de Juegos de Barrio, Música Tropical y Vida Vecinal",
    shortSummary: "En la década de 1970, el crecimiento urbano convirtió a las calles de las ciudades colombianas en vibrantes espacios comunitarios. Niñas y niños salían al salir de la escuela a compartir juegos populares como el trompo de madera, la golosa, las canicas (piquis), el lazo y partidos de fútbol con piedras como arcos, fortaleciendo la amistad vecinal y la creatividad.",
    curiousFacts: [
      "El trompo de guayacán era el rey del recreo: los niños practicaban habilidades complejas como 'hacerlo bailar en la palma' o 'el puente aéreo'.",
      "La música se escuchaba en discos de vinilo de 33 y 45 RPM o en los primeros casetes grabados de las emisoras juveniles.",
      "Ciudades como Cali, Medellín y Barranquilla se expandieron con nuevos barrios donde los vecinos organizaban bazares y semanas culturales."
    ],
    howChildrenLived: "Sin teléfonos móviles ni consolas de videojuegos, la diversión infantil transcurría al aire libre: los amigos se llamaban de puerta a puerta y jugaban hasta la puesta de sol.",
    soundOrSensation: "El choque cristalino de las canicas sobre la tierra, los zumbidos de los trompos girando y la música de salsa y cumbia desde las casas vecinas.",
    leoChallenge: "Pregúntale a una persona mayor de tu familia cuál era su juego de calle favorito en su infancia y ensáyalo en tu colegio.",
    timeMachineCoordinates: {
      era: "Años 70 - Cultura Popular",
      temporalFlux: "99.1%",
      dangerLevel: "Tranquilo"
    },
    colombianContext: {
      decade: "Década de 1970",
      region: "Barrios Populares de Colombia",
      socialTheme: "Juegos Tradicionales, Identidad Cultural y Urbanismo"
    }
  },
  "1982": {
    yearOrEra: "1982 - El Premio Nobel de Gabriel García Márquez",
    title: "1982: Gabriel García Márquez y el Premio Nobel de Literatura",
    shortSummary: "En diciembre de 1982, la literatura colombiana alcanzó la máxima cumbre universal cuando Gabriel García Márquez recibió el Premio Nobel en Estocolmo, Suecia. Fiel a su identidad caribeña, vistió un tradicional liquiliqui blanco de lino y estuvo acompañado por una delegación de cumbiamberos y vallenateros, demostrando que la cultura de nuestra tierra dialoga con el mundo entero.",
    curiousFacts: [
      "Gabo eligió el liquiliqui tradicional de la costa caribeña en vez del frac negro europeo como homenaje a sus raíces latinoamericanas.",
      "En el banquete real sueco sonaron la flauta de millo y el acordeón vallenato, contagiando de entusiasmo a personalidades de todo el planeta.",
      "'Cien Años de Soledad' se ha traducido a más de 40 idiomas, inspirando a lectores y escritores de todos los continentes."
    ],
    howChildrenLived: "En las escuelas colombianas, los estudiantes celebraron montando obras de teatro con mariposas amarillas de papel y descubriendo en las bibliotecas escolares los relatos de Macondo.",
    soundOrSensation: "El compás cadencioso de la cumbia colombiana en el frío invernal de Estocolmo y los aplausos de pie en el gran auditorio.",
    leoChallenge: "¿Por qué crees que las historias nacidas en un pequeño pueblo como Aracataca lograron emocionar a lectores de Japón, Francia o Egipto?",
    timeMachineCoordinates: {
      era: "Años 80 - Diciembre de 1982",
      temporalFlux: "99.0%",
      dangerLevel: "Tranquilo"
    },
    colombianContext: {
      decade: "Década de 1980",
      region: "Caribe Colombiano y Escena Internacional",
      socialTheme: "Literatura Universal, Patrimonio Cultural y Expresión Artística"
    }
  },
  "1991": {
    yearOrEra: "1991 - La Constitución Política y los Derechos de la Niñez",
    title: "1991: La Nueva Constitución y la Primacía de los Derechos de los Niños",
    shortSummary: "En julio de 1991, la Asamblea Nacional Constituyente promulgó la nueva Carta Magna de Colombia. Fue el fruto de un amplio acuerdo democrático impulsado por el movimiento estudiantil de la 'Séptima Papeleta'. La Constitución reconoció a Colombia como un país pluriétnico y multicultural, creó la Acción de Tutela y consagró en su Artículo 44 que los derechos de los niños prevalecen sobre los de todos los demás.",
    curiousFacts: [
      "La Constitución de 1991 reconoció formalmente la diversidad étnica del país, garantizando los derechos de pueblos indígenas y afrocolombianos.",
      "La Acción de Tutela se convirtió en el instrumento legal más ágil y eficaz para que cualquier ciudadano o menor de edad defienda su salud y educación.",
      "En las escuelas nació la figura del personero estudiantil para que los alumnos practiquen la participación democrática desde el aula."
    ],
    howChildrenLived: "Los estudiantes recibieron cartillas pedagógicas ilustradas de la Constitución y debatieron en clase sus derechos y responsabilidades como jóvenes ciudadanos.",
    soundOrSensation: "Los discursos solemnes en el Centro de Convenciones de Bogotá y la lectura del preámbulo constitucional en transmisión nacional.",
    leoChallenge: "¿Por qué el Artículo 44 de la Constitución establece que los derechos fundamentales de los niños van primero que cualquier otro interés?",
    timeMachineCoordinates: {
      era: "Años 90 - Julio de 1991",
      temporalFlux: "99.8%",
      dangerLevel: "Tranquilo"
    },
    colombianContext: {
      decade: "Década de 1990",
      region: "Territorio Nacional de Colombia",
      socialTheme: "Constitución Política, Derechos Fundamentales y Democracia Participativa"
    }
  }
};

// Search fallback helper for Colombia 20th century
function findPreset(query: string) {
  const q = query.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  if (q.includes("1903") || q.includes("panama") || q.includes("separacion")) {
    return PRESET_COLOMBIA_XX["1903"];
  }
  if (q.includes("1920") || q.includes("tren") || q.includes("ferrocarril") || q.includes("cafe") || q.includes("locomotora") || q.includes("scadta") || q.includes("avianca")) {
    return PRESET_COLOMBIA_XX["1920"];
  }
  if (q.includes("1928") || q.includes("bananera") || q.includes("cienaga") || q.includes("trabajador") || q.includes("campesino") || q.includes("huelga")) {
    return PRESET_COLOMBIA_XX["1928"];
  }
  if (q.includes("1948") || q.includes("bogotazo") || q.includes("gaitan") || q.includes("tranvia") || q.includes("abril")) {
    return PRESET_COLOMBIA_XX["1948"];
  }
  if (q.includes("1950") || q.includes("sutatenza") || q.includes("escuela") || q.includes("educacion") || q.includes("tintero") || q.includes("tiza") || q.includes("colegio")) {
    return PRESET_COLOMBIA_XX["1950"];
  }
  if (q.includes("1954") || q.includes("television") || q.includes("rojas") || q.includes("tv")) {
    return PRESET_COLOMBIA_XX["1954"];
  }
  if (q.includes("1957") || q.includes("voto") || q.includes("mujer") || q.includes("femenino") || q.includes("plebiscito")) {
    return PRESET_COLOMBIA_XX["1957"];
  }
  if (q.includes("1970") || q.includes("juego") || q.includes("trompo") || q.includes("golosa") || q.includes("piqui") || q.includes("canica") || q.includes("barrio")) {
    return PRESET_COLOMBIA_XX["1970"];
  }
  if (q.includes("1982") || q.includes("gabo") || q.includes("garcia marquez") || q.includes("nobel") || q.includes("soledad") || q.includes("aracataca")) {
    return PRESET_COLOMBIA_XX["1982"];
  }
  if (q.includes("1991") || q.includes("constitucion") || q.includes("tutela") || q.includes("derecho") || q.includes("indigena") || q.includes("septima papeleta")) {
    return PRESET_COLOMBIA_XX["1991"];
  }

  // Check generic decade match
  if (q.includes("190") || q.includes("mil dias")) return PRESET_COLOMBIA_XX["1903"];
  if (q.includes("192")) return PRESET_COLOMBIA_XX["1920"];
  if (q.includes("194")) return PRESET_COLOMBIA_XX["1948"];
  if (q.includes("195")) return PRESET_COLOMBIA_XX["1950"];
  if (q.includes("197")) return PRESET_COLOMBIA_XX["1970"];
  if (q.includes("198")) return PRESET_COLOMBIA_XX["1982"];
  if (q.includes("199")) return PRESET_COLOMBIA_XX["1991"];

  return null;
}

// Gemini API handler tailored exclusively for Colombia Siglo XX (1900-1999) and 1st Person Leo
app.post("/api/time-travel", async (req, res) => {
  const { query } = req.body;
  if (!query || typeof query !== "string") {
    return res.status(400).json({ error: "Por favor proporciona un año o pregunta de Colombia en el siglo XX." });
  }

  const cleanQuery = query.trim();

  // Try Gemini if API key is present
  if (process.env.GEMINI_API_KEY) {
    try {
      const ai = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build"
          }
        }
      });

      const prompt = `Actúa como el guía educativo e historiador de la expedición "Leo en el Tiempo".
Tu misión es EXCLUSIVAMENTE enseñar sobre COLOMBIA EN EL SIGLO XX (1900 a 1999) para estudiantes escolares de Ciencias Sociales (primaria y secundaria).

CONSULTA O AÑO A INVESTIGAR: "${cleanQuery}".

DIRECTRICES DE REDACCIÓN (CRÍTICO):
1. NARRATIVA HISTÓRICA NATURAL Y CAUTIVADORA: NUNCA repitas mecánicamente frases en primera persona ("Yo vi...", "Yo descubrí...", "Yo sentí..."). Narra los acontecimientos históricos reales de Colombia de manera fluida, asombrosa y educativa ("En 1954...", "Las familias se congregaban...", "Los trenes a vapor cruzaban...", "Los estudiantes aprendían...").
2. ENFOQUE EXCLUSIVO EN COLOMBIA (1900 - 1999): Toda la información debe tratar sobre la historia, geografía, cultura, inventos y transformaciones sociales de Colombia en el siglo XX.
3. SI PIDEN UN AÑO FUERA DEL SIGLO XX: Explica en una sola frase pedagógica que la máquina se enfoca en Colombia entre 1900 y 1999 y conéctalo de inmediato con el hito colombiano más afín.
4. RIGOR HISTÓRICO Y RESPETO PEDAGÓGICO: Enfócate en cómo vivían las personas, la vida cotidiana, la educación, los juegos infantiles, los medios de transporte y los derechos ciudadanos.

Devuelve estrictamente un JSON con esta estructura:
{
  "yearOrEra": "Año o época colombiana (ej. '1948 - Bogotá y el 9 de Abril')",
  "title": "Título histórico claro y llamativo (ej. '1948: El Bogotazo y la Transformación Urbana')",
  "shortSummary": "Resumen histórico fluido y educativo de 2 o 3 oraciones sobre el acontecimiento en Colombia.",
  "curiousFacts": [
    "Dato histórico curioso #1 narrado de forma directa y asombrosa.",
    "Dato histórico curioso #2 sobre inventos, tecnología o costumbres.",
    "Dato histórico curioso #3 sobre el impacto en las regiones colombianas."
  ],
  "howChildrenLived": "Explicación de 1 o 2 oraciones sobre cómo jugaban, estudiaban o vivían los niños de esa época en Colombia.",
  "soundOrSensation": "Paisaje sonoro y sensorial evocador de la Colombia de ese momento.",
  "leoChallenge": "Pregunta reflexiva o reto de aprendizaje para debatir en la clase de Ciencias Sociales.",
  "timeMachineCoordinates": {
    "era": "Periodo en Colombia (ej. 'Años 40 en Colombia')",
    "temporalFlux": "98.5%",
    "dangerLevel": "'Tranquilo', 'Aventura Histórica' o 'Historia Clave'"
  },
  "colombianContext": {
    "decade": "Década de 1940",
    "region": "Región Andina y Sabana de Bogotá",
    "socialTheme": "Historia Política, Convivencia y Vida Urbana"
  }
}`;

      const response = await generateWithGeminiFallback(ai, {
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              yearOrEra: { type: Type.STRING },
              title: { type: Type.STRING },
              shortSummary: { type: Type.STRING },
              curiousFacts: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              howChildrenLived: { type: Type.STRING },
              soundOrSensation: { type: Type.STRING },
              leoChallenge: { type: Type.STRING },
              timeMachineCoordinates: {
                type: Type.OBJECT,
                properties: {
                  era: { type: Type.STRING },
                  temporalFlux: { type: Type.STRING },
                  dangerLevel: { type: Type.STRING }
                },
                required: ["era", "temporalFlux", "dangerLevel"]
              },
              colombianContext: {
                type: Type.OBJECT,
                properties: {
                  decade: { type: Type.STRING },
                  region: { type: Type.STRING },
                  socialTheme: { type: Type.STRING }
                },
                required: ["decade", "region", "socialTheme"]
              }
            },
            required: ["yearOrEra", "title", "shortSummary", "curiousFacts", "howChildrenLived", "soundOrSensation", "leoChallenge", "timeMachineCoordinates"]
          }
        }
      });

      const parsed = JSON.parse(response.text || "{}");
      return res.json({
        success: true,
        source: "gemini",
        data: parsed
      });
    } catch (_err: any) {
      // Gracefully fall through to the curated offline Colombian 20th century repository
    }
  }

  // Fallback to curated preset or smart Colombian 20th century fallback
  const preset = findPreset(cleanQuery);
  if (preset) {
    return res.json({
      success: true,
      source: "preset",
      data: preset
    });
  }

  // Parse numeric year and keep strictly inside Colombia Siglo XX (1900-1999)
  const numericYear = parseInt(cleanQuery.replace(/\D/g, ""), 10);
  let fallbackData;

  if (numericYear && numericYear >= 1900 && numericYear <= 1999) {
    const decade = Math.floor((numericYear - 1900) / 10) * 10;
    fallbackData = {
      yearOrEra: `${numericYear} - Colombia en el Siglo XX`,
      title: `${numericYear}: Acontecimientos e Historia de Colombia`,
      shortSummary: `En el año ${numericYear}, Colombia transitaba por la década de 19${decade < 10 ? "0" + decade : decade}, una etapa de transformaciones en el campo y en las ciudades. Durante este periodo, las familias colombianas construyeron comunidades unidas a través del trabajo agrícola, la llegada de nuevos medios de transporte y una rica cultura popular.`,
      curiousFacts: [
        `En el año ${numericYear}, el telégrafo, el correo postal y la radio de onda corta eran los medios primordiales para conectar las diversas regiones del territorio colombiano.`,
        `La producción cafetera en las cordilleras continuaba siendo un pilar fundamental para financiar obras de infraestructura, escuelas y hospitales en todo el país.`,
        `En las plazas de mercado de pueblos y capitales se comerciaban productos agrícolas transportados a lomo de mula, en chivas tradicionales o en trenes de carga.`
      ],
      howChildrenLived: `Los estudiantes asistían a la escuela con cuadernos de dibujo y pizarras o tinteros, y compartían en las calles juegos como el trompo de madera, las canicas y la golosa.`,
      soundOrSensation: `El repique de las campanas de la iglesia en la plaza central, el bullicio de los mercados campesinos y las melodías tradicionales en las radios comunitarias.`,
      leoChallenge: `Investiga qué personas de tu familia o comunidad vivían en Colombia en el año ${numericYear} y qué anécdota recuerdan de esa década.`,
      timeMachineCoordinates: {
        era: `Colombia - Década de 19${decade < 10 ? "0" + decade : decade}`,
        temporalFlux: "98.9%",
        dangerLevel: "Tranquilo"
      },
      colombianContext: {
        decade: `Años ${decade}s`,
        region: "Región Andina y Zonas Cafeteras",
        socialTheme: "Vida Cotidiana e Historia Social"
      }
    };
  } else {
    // Clamped back to Colombian 20th century
    fallbackData = {
      yearOrEra: "Colombia • Siglo XX (1900 - 1999)",
      title: `Archivo Histórico de Colombia: "${cleanQuery}"`,
      shortSummary: `El archivo cuántico de la expedición se enfoca en el siglo XX de Colombia (1900 a 1999) para el área de Ciencias Sociales. En estas diez décadas, el país experimentó una profunda modernización en sus medios de transporte, educación pública, medios de comunicación y derechos ciudadanos.`,
      curiousFacts: [
        "A lo largo del siglo XX, Colombia transitó de caminos de herradura y navegación fluvial por el Magdalena a redes de carreteras, ferrocarriles nacionales y aviación comercial.",
        "La educación popular y rural avanzó con modelos pioneros como Radio Sutatenza, llevando alfabetización a millones de hogares campesinos.",
        "La música tradicional —la cumbia, el vallenato, el bambuco y el pasillo— se consolidó como patrimonio cultural transmitido por la radio y las grabaciones sonoras."
      ],
      howChildrenLived: "Las generaciones del siglo XX crecieron creando sus propios juegos con trompos, baleros, canicas y cometas de caña, en constante interacción con sus vecinos de barrio y comunidad.",
      soundOrSensation: "El aroma a café recién colado en los fogones y las emisiones de radio de tubos al atardecer en las salas familiares.",
      leoChallenge: "Selecciona una de las décadas del siglo XX colombiano en la máquina del tiempo para explorar sus hitos y transformaciones más destacadas.",
      timeMachineCoordinates: {
        era: "Colombia - Siglo XX",
        temporalFlux: "99.5%",
        dangerLevel: "Tranquilo"
      },
      colombianContext: {
        decade: "Siglo XX (1900-1999)",
        region: "Colombia Pluriétnica y Multicultural",
        socialTheme: "Ciencias Sociales e Identidad Nacional"
      }
    };
  }

  return res.json({
    success: true,
    source: "colombia-xx-engine",
    data: fallbackData
  });
});

// Interactive chat endpoint: allows children to talk directly with Leo in real-time!
app.post("/api/leo-chat", async (req, res) => {
  const { message, eraContext } = req.body || {};
  const userMsg = (message || "").toString().trim();

  if (!userMsg) {
    return res.status(400).json({ error: "Mensaje vacío" });
  }

  // 1. If GEMINI_API_KEY is available, try Gemini
  if (process.env.GEMINI_API_KEY) {
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const prompt = `Eres el guía historiador y asistente de la máquina del tiempo de Colombia en el siglo XX (1900 a 1999).
Estás respondiendo las dudas de un estudiante de Ciencias Sociales.

DIRECTIVAS ESENCIALES:
1. NUNCA satures con frases repetitivas en primera persona ("Yo vi...", "Yo descubrí...").
2. Responde con hechos históricos reales, claros, concisos y pedagógicos sobre Colombia en el siglo XX.
3. Máximo 2 o 3 oraciones directas al grano, sin cháchara ni rodeos.
4. Si preguntan algo fuera de Colombia o del siglo XX, reorienta brevemente al siglo XX colombiano.
Contexto de navegación actual: ${eraContext || "Colombia en el Siglo XX"}.

Pregunta del estudiante: "${userMsg}"`;

      const response = await generateWithGeminiFallback(ai, {
        contents: prompt
      });

      const reply = response.text?.trim();
      if (reply) {
        return res.json({
          success: true,
          reply,
          source: "gemini-live"
        });
      }
    } catch (_err: any) {
      // Gracefully fall through to the local Colombian educational assistant
    }
  }

  // 2. Direct, informative local fallback engine for 20th century Colombia
  const lower = userMsg.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  let fallbackReply = "";

  if (lower.includes("hola") || lower.includes("quien eres") || lower.includes("como te llamas")) {
    fallbackReply = "¡Hola! Soy Leo, tu guía en la máquina del tiempo. Pregúntame sobre cualquier acontecimiento, invento o costumbre de Colombia en el siglo XX.";
  } else if (lower.includes("panama") || lower.includes("1903")) {
    fallbackReply = "En noviembre de 1903 Panamá proclamó su separación de Colombia con apoyo de Estados Unidos para la construcción del canal, redefiniendo las fronteras de nuestro país.";
  } else if (lower.includes("tren") || lower.includes("locomotora") || lower.includes("ferrocarril")) {
    fallbackReply = "Las locomotoras a vapor de los Ferrocarriles Nacionales fueron el corazón del comercio cafetero en los años 20, bajando sacos de café desde las cordilleras hacia los puertos del Río Magdalena.";
  } else if (lower.includes("scadta") || lower.includes("avion") || lower.includes("avianca") || lower.includes("vuelo")) {
    fallbackReply = "En 1919 nació en Barranquilla SCADTA (hoy Avianca), la primera aerolínea comercial de América. Sus hidroaviones acortaron viajes de semanas en barco a pocas horas de vuelo.";
  } else if (lower.includes("bananera") || lower.includes("cienaga") || lower.includes("1928") || lower.includes("huelga")) {
    fallbackReply = "En 1928, los trabajadores de las plantaciones bananeras en Ciénaga exigieron jornadas de 8 horas, atención médica y salarios en dinero en vez de vales, un hito fundacional de los derechos laborales.";
  } else if (lower.includes("tranvia") || lower.includes("bogota") || lower.includes("gaitan") || lower.includes("1948") || lower.includes("bogotazo")) {
    fallbackReply = "Hasta abril de 1948, Bogotá contaba con una extensa red de tranvías eléctricos por la Carrera Séptima. Tras el 9 de abril, la ciudad modernizó su trazado y los sustituyó por buses a gasolina.";
  } else if (lower.includes("sutatenza") || lower.includes("radio")) {
    fallbackReply = "Radio Sutatenza fue fundada en 1947 en Boyacá. A través de radios de pilas y cartillas de Acción Cultural Popular, enseñó a leer y escribir a millones de familias campesinas colombianas.";
  } else if (lower.includes("escuela") || lower.includes("colegio") || lower.includes("estudiar") || lower.includes("tintero")) {
    fallbackReply = "A mediados del siglo XX las escuelas usaban pupitres de madera con orificios para tinteros de cerámica y plumas metálicas. Las lecciones se escribían con tiza en tableros de pizarra.";
  } else if (lower.includes("television") || lower.includes("tv") || lower.includes("1954")) {
    fallbackReply = "La televisión llegó a Colombia el 13 de junio de 1954. La primera transmisión se emitió en blanco y negro desde la Biblioteca Nacional de Bogotá para receptores de tubo al vacío.";
  } else if (lower.includes("voto") || lower.includes("mujer") || lower.includes("femenino") || lower.includes("1957")) {
    fallbackReply = "El 1 de diciembre de 1957 las mujeres colombianas votaron por primera vez en el plebiscito nacional, logrando la ciudadanía plena y el derecho a elegir y ser elegidas.";
  } else if (lower.includes("juego") || lower.includes("trompo") || lower.includes("golosa") || lower.includes("canica") || lower.includes("piqui")) {
    fallbackReply = "En los años 70 los niños se reunían en las calles a jugar al trompo de madera zumbador, la golosa con tiza, las canicas (piquis), el balero y partidos de fútbol con piedras como arcos.";
  } else if (lower.includes("gabo") || lower.includes("garcia marquez") || lower.includes("nobel") || lower.includes("1982") || lower.includes("aracataca")) {
    fallbackReply = "Gabriel García Márquez recibió el Premio Nobel de Literatura en 1982 en Estocolmo vistiendo un tradicional liquiliqui blanco caribeño al son de cumbias y vallenatos.";
  } else if (lower.includes("constitucion") || lower.includes("1991") || lower.includes("tutela") || lower.includes("septima papeleta")) {
    fallbackReply = "La Constitución de 1991 reconoció la diversidad étnica y cultural de Colombia, creó la Acción de Tutela y estableció en su Artículo 44 que los derechos de los niños prevalecen sobre todos los demás.";
  } else if (lower.includes("cafe") || lower.includes("cafetero")) {
    fallbackReply = "El café colombiano fue el producto estrella del siglo XX; sus exportaciones financiaron vías férreas, acueductos, escuelas y la fundación de numerosas ciudades en el Eje Cafetero.";
  } else if (lower.includes("comida") || lower.includes("plato") || lower.includes("arepa") || lower.includes("sancocho")) {
    fallbackReply = "La gastronomía del siglo XX destacaba por las arepas de maíz pelado al carbón, el sancocho de leña, el ajiaco santafereño y el chocolate caliente con queso servido en jarros de peltre.";
  } else if (lower.includes("musica") || lower.includes("cumbia") || lower.includes("vallenato") || lower.includes("bambuco")) {
    fallbackReply = "La música del siglo XX integró el bambuco y pasillo en la zona Andina con la cumbia y el vallenato en el Caribe, difundiéndose masivamente a través de discos de acetato y la radiodifusión.";
  } else {
    fallbackReply = `En el siglo XX de Colombia, ese aspecto formó parte de la gran transición del país: de una nación predominantemente rural con caminos de herradura hacia un país urbano, diverso y conectado por medios masivos.`;
  }

  return res.json({
    success: true,
    reply: fallbackReply,
    source: "colombia-local-engine"
  });
});

// Dedicated School Homework & Study Helper for Colombia Siglo XX (Ciencias Sociales)
app.post("/api/homework-helper", async (req, res) => {
  const { query, mode = "summary", currentYear, eraContext } = req.body;
  if (!query || typeof query !== "string") {
    return res.status(400).json({ error: "Por favor escribe tu duda o tema de tarea escolar." });
  }

  const cleanQuery = query.trim();

  // 1. Try Gemini 2.5 Flash for high-precision educational assistance
  if (process.env.GEMINI_API_KEY) {
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const prompt = `Eres el Tutor de Tareas Escolares de Ciencias Sociales de Colombia en el Siglo XX (1900 a 1999).
Un estudiante de primaria o secundaria te pide ayuda con su tarea o estudio sobre: "${cleanQuery}".
Contexto temporal / año de referencia: ${currentYear || eraContext || "Colombia Siglo XX"}.
Modalidad solicitada: "${mode}".

INSTRUCCIONES PEDAGÓGICAS ESCOLARES:
1. Responde de forma clara, didáctica, precisa y verídica para el área de Ciencias Sociales.
2. Adapta la respuesta a lenguaje escolar colombiano (amigable, estructurado, sin rodeos ni tecnicismos confusos).
3. Genera un JSON estrictamente estructurado según el esquema solicitado.`;

      const response = await generateWithGeminiFallback(ai, {
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              content: { type: Type.STRING },
              notebookDraft: { type: Type.STRING },
              bulletPoints: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              keyDates: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    year: { type: Type.STRING },
                    event: { type: Type.STRING }
                  },
                  required: ["year", "event"]
                }
              },
              posterIdeas: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  slogan: { type: Type.STRING },
                  drawRecommendation: { type: Type.STRING }
                },
                required: ["title", "slogan", "drawRecommendation"]
              },
              studyQuiz: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    question: { type: Type.STRING },
                    answer: { type: Type.STRING }
                  },
                  required: ["question", "answer"]
                }
              },
              funFactForClass: { type: Type.STRING }
            },
            required: ["title", "content", "notebookDraft", "bulletPoints", "funFactForClass"]
          }
        }
      });

      const parsed = JSON.parse(response.text || "{}");
      return res.json({
        success: true,
        source: "gemini-tutor",
        data: {
          mode,
          query: cleanQuery,
          ...parsed
        }
      });
    } catch (_err: any) {
      // Gracefully fall through to the local Colombian homework engine
    }
  }

  // 2. Intelligent local fallback tutor for 20th century Colombian homework
  const lower = cleanQuery.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  let topicTitle = "Tema de Ciencias Sociales: Colombia en el Siglo XX";
  let content = "Durante el siglo XX Colombia pasó de ser un país mayoritariamente rural y aislado entre cordilleras a una nación urbana e integrada mediante trenes, radio, televisión y nuevas leyes democráticas.";
  let notebookDraft = `CUADERNO DE CIENCIAS SOCIALES\nTema: ${cleanQuery}\n\n1. Resumen: En el siglo XX colombiano se produjeron grandes transformaciones que mejoraron los derechos ciudadanos, la educación y las comunicaciones.\n2. Conclusión: Conocer nuestra historia nos enseña a valorar la convivencia, el trabajo comunitario y la diversidad de Colombia.`;
  let bulletPoints = [
    "Las vías de transporte (trenes a vapor, carreteras y barcos por el Río Magdalena) conectaron los pueblos con las ciudades.",
    "El cultivo del café impulsó la economía familiar y financió obras públicas vitales.",
    "Los medios de comunicación masivos como la radio comunitaria y la televisión permitieron educar e informar a millones de familias."
  ];
  let keyDates = [
    { year: "1903", event: "Separación de Panamá tras la Guerra de los Mil Días." },
    { year: "1954", event: "Inauguración de la primera señal de televisión nacional." },
    { year: "1957", event: "Las mujeres colombianas ejercen por primera vez el voto." },
    { year: "1991", event: "Promulgación de la nueva Constitución Política de Colombia." }
  ];
  let posterIdeas = {
    title: "¡Exploradores de Colombia en el Siglo XX!",
    slogan: "De los ferrocarriles a vapor a la era de las telecomunicaciones.",
    drawRecommendation: "Dibuja una línea de tiempo con un tren cafetero, una radio de madera y un libro de la Constitución."
  };
  let studyQuiz = [
    {
      question: "¿Cuál fue el principal producto agrícola que impulsó la economía de Colombia en el siglo XX?",
      answer: "El café, cultivado en las montañas de las cordilleras y transportado por trenes y el Río Magdalena."
    },
    {
      question: "¿En qué año votaron por primera vez las mujeres en Colombia?",
      answer: "En 1957, durante el plebiscito nacional del 1 de diciembre."
    }
  ];
  let funFactForClass = "Dato para tu profesor: En los años 50 las escuelas rurales aprendían a leer por la radio gracias a Radio Sutatenza y sus cartillas ilustradas.";

  if (lower.includes("television") || lower.includes("tv") || lower.includes("1954")) {
    topicTitle = "La Llegada de la Televisión a Colombia (1954)";
    content = "El 13 de junio de 1954 se inauguró la primera transmisión oficial de televisión en Colombia. Como muy pocas familias tenían televisor en casa, la gente se reunía en las vitrinas de almacenes en el centro de Bogotá para contemplar este milagro tecnológico.";
    notebookDraft = `CIENCIAS SOCIALES: LA TELEVISIÓN EN COLOMBIA (1954)\n• Fecha clave: 13 de junio de 1954 (Gobierno de Gustavo Rojas Pinilla).\n• ¿Cómo funcionaba?: Transmisiones en blanco y negro con tubos de rayos catódicos.\n• Impacto social: Transformó las reuniones familiares y la difusión de noticias y cultura nacional.`;
    bulletPoints = [
      "La primera emisión presentó el Himno Nacional interpretado por la Orquesta Sinfónica de Colombia.",
      "Los equipos fueron importados de Alemania y Estados Unidos e instalados en el Palacio de San Carlos.",
      "Conectó la capital con antenas repetidoras en el cerro de Manjui para alcanzar varias regiones."
    ];
    keyDates = [
      { year: "13 Jun 1954", event: "Primera emisión oficial de la televisión colombiana." },
      { year: "1979", event: "Llegada de la televisión a color a las pantallas colombianas." }
    ];
    posterIdeas = {
      title: "1954: ¡Se Enciende la Pantalla en Colombia!",
      slogan: "La televisión: una ventana al mundo para las familias colombianas.",
      drawRecommendation: "Dibuja un televisor de madera con antena de conejo y una familia asombrada frente a él."
    };
    funFactForClass = "Los primeros televisores eran tan pesados que venían empotrados en elegantes muebles de caoba con puertas correderas.";
  } else if (lower.includes("tren") || lower.includes("ferrocarril") || lower.includes("vapor") || lower.includes("1920")) {
    topicTitle = "Los Ferrocarriles Nacionales y el Auge Cafetero (1920)";
    content = "En los años 20 las locomotoras a vapor de carbón fueron el motor que integró las regiones colombianas. Permitieron sacar millones de bultos de café desde las empinadas laderas de Caldas y Antioquia hacia los puertos fluviales del Río Magdalena.";
    notebookDraft = `CIENCIAS SOCIALES: FERROCARRILES EN COLOMBIA (AÑOS 20)\n• Importancia: Redujeron semanas de viaje a lomo de mula a unas pocas horas de tren.\n• Combustible: Carbón mineral y calderas de vapor de agua.\n• Impacto: Crecimiento de pueblos estación y auge exportador del café colombiano.`;
    bulletPoints = [
      "Las locomotoras a vapor unieron el Eje Cafetero con el Río Magdalena y el Puerto de Buenaventura.",
      "El 'Túnel de La Quiebra' en Antioquia fue una hazaña de ingeniería mundial de la época.",
      "Alrededor de cada estación ferroviaria nacieron fondas campesinas, hoteles y mercados populares."
    ];
    posterIdeas = {
      title: "¡Rieles de Progreso! Los Trenes de Colombia",
      slogan: "Conectando cordilleras y llevando el café al mundo entero.",
      drawRecommendation: "Una locomotora negra echando humo blanco por su chimenea con bultos de café al lado."
    };
    funFactForClass = "El silbato de la locomotora avisaba la hora exacta a los campesinos que trabajaban en los sembrados cercanos a las vías.";
  } else if (lower.includes("gaitan") || lower.includes("bogotazo") || lower.includes("1948") || lower.includes("tranvia")) {
    topicTitle = "El 9 de Abril de 1948 y El Bogotazo";
    content = "El 9 de abril de 1948 fue asesinado el líder popular Jorge Eliécer Gaitán en el centro de Bogotá. Este hecho desencadenó una rebelión urbana masiva que alteró la arquitectura de la ciudad y aceleró el fin de los tranvías eléctricos de la Carrera Séptima.";
    notebookDraft = `CIENCIAS SOCIALES: EL 9 DE ABRIL DE 1948\n• Personaje: Jorge Eliécer Gaitán, abogado y orador del pueblo.\n• Suceso: Su fallecimiento provocó protestas en Bogotá y varias ciudades.\n• Transformación urbana: La ciudad amplió avenidas modernas y sustituyó tranvías por buses.`;
    bulletPoints = [
      "En Bogotá se celebraba al mismo tiempo la Conferencia Panamericana fundacional de la OEA.",
      "Los tranvías eléctricos fueron incendiados durante los disturbios y retirados en los años siguientes.",
      "Este suceso dejó la enseñanza permanente de buscar siempre la paz y la concertación pacífica."
    ];
    posterIdeas = {
      title: "1948: Historia, Memoria y Convivencia",
      slogan: "Comprender el pasado para construir un futuro de diálogo y paz.",
      drawRecommendation: "Dibuja un tranvía clásico rojo y amarillo de Bogotá con campana y vías empedradas."
    };
    funFactForClass = "Los tranvías de Bogotá contaban con dos clases: primera clase con asientos tapizados y segunda con bancas de madera.";
  } else if (lower.includes("voto") || lower.includes("mujer") || lower.includes("femenino") || lower.includes("1957")) {
    topicTitle = "El Voto Femenino en Colombia (1957)";
    content = "El 1 de diciembre de 1957 las mujeres colombianas acudieron por primera vez en la historia a las urnas electorales durante el plebiscito nacional, conquistando la ciudadanía plena tras décadas de incansable liderazgo social.";
    notebookDraft = `CIENCIAS SOCIALES: EL VOTO DE LAS MUJERES (1957)\n• Fecha de la primera votación: 1 de diciembre de 1957 (Plebiscito).\n• Hito: Las mujeres obtuvieron cédula de ciudadanía propia y derecho a elegir.\n• Relevancia: Paso fundamental para la equidad de género y la democracia en Colombia.`;
    bulletPoints = [
      "Líderes como Esmeralda Arboleda y Josefina Valencia lideraron los debates en el Congreso.",
      "En 1956 se expidió la primera cédula de ciudadanía femenina número 20.000.001 a Carola Correa.",
      "Más de un millón de mujeres votaron el primer día con alegría en todo el territorio colombiano."
    ];
    posterIdeas = {
      title: "1957: ¡Las Mujeres Votan en Colombia!",
      slogan: "Una democracia completa con la voz de todas las colombianas.",
      drawRecommendation: "Una urna electoral con la bandera tricolor y mujeres haciendo fila con su cédula."
    };
    funFactForClass = "Antes de 1957, las mujeres adultas en Colombia no podían votar ni administrar sus propios bienes sin autorización masculina.";
  } else if (lower.includes("constitucion") || lower.includes("1991") || lower.includes("tutela") || lower.includes("derecho")) {
    topicTitle = "La Constitución Política de Colombia de 1991";
    content = "En 1991 Colombia proclamó una nueva Constitución redactada por una Asamblea Nacional Constituyente pluralista. Reconoció al país como una nación multiétnica y pluricultural y creó la Acción de Tutela para la defensa de los derechos fundamentales.";
    notebookDraft = `CIENCIAS SOCIALES: CONSTITUCIÓN DE 1991\n• Origen: Movimiento de estudiantes de la Séptima Papeleta en 1990.\n• Logro clave: Creó la Acción de Tutela para proteger la salud y la vida.\n• Artículo 44: 'Los derechos de los niños y niñas prevalecen sobre los derechos de los demás'.`;
    bulletPoints = [
      "Reconoció los derechos territoriales y culturales de los pueblos indígenas y afrocolombianos.",
      "Creó la Fiscalía General de la Nación y la Corte Constitucional.",
      "Estableció que la educación y la salud son derechos prioritarios de la niñez."
    ];
    posterIdeas = {
      title: "Constitución de 1991: Derechos para Todos",
      slogan: "Colombia: un país multiétnico, diverso y democrático.",
      drawRecommendation: "Un libro abierto con la Constitución y niños con trajes tradicionales de distintas regiones."
    };
    funFactForClass = "El movimiento que inspiró la Constitución de 1991 nació de jóvenes universitarios que depositaron una 'Séptima Papeleta' simbólica en las elecciones de 1990.";
  }

  return res.json({
    success: true,
    source: "colombia-local-tutor",
    data: {
      mode,
      query: cleanQuery,
      title: topicTitle,
      content,
      notebookDraft,
      bulletPoints,
      keyDates,
      posterIdeas,
      studyQuiz,
      funFactForClass
    }
  });
});

// Direct zip download endpoint for easy GitHub/Vercel exporting
app.get(["/download-zip", "/leo-en-el-tiempo.zip"], (_req, res) => {
  const zipPath = path.join(process.cwd(), "public", "leo-en-el-tiempo.zip");
  if (fs.existsSync(zipPath)) {
    res.setHeader("Content-Type", "application/zip");
    res.setHeader("Content-Disposition", 'attachment; filename="leo-en-el-tiempo.zip"');
    return res.sendFile(zipPath);
  }
  return res.status(404).send("Zip aún no generado");
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`🇨🇴 Máquina del Tiempo de Leo (Colombia Siglo XX) lista en http://localhost:${PORT}`);
  });
}

startServer();

export default app;
