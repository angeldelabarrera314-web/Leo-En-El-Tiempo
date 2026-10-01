import { TimeTravelResult } from '../types';

export interface HomeworkHelperResult {
  title: string;
  query: string;
  mode: string;
  content: string;
  bulletPoints: string[];
  notebookDraft: string;
  funFactForClass: string;
  recommendedEraYear: number;
}

// Curated 20th century historical facts of Colombia (1900 - 1999)
export const PRESETS_COLOMBIA_XX: Record<string, TimeTravelResult> = {
  "1903": {
    yearOrEra: "1903 - Separación de Panamá y Nuevas Fronteras",
    title: "1903: Separación de Panamá y Transformación del Territorio",
    shortSummary:
      "En noviembre de 1903, Panamá proclamó su separación de Colombia tras complejas negociaciones internacionales sobre el canal interoceánico y el desgaste de la Guerra de los Mil Días. Este hecho redefinió las fronteras nacionales e impulsó una profunda reflexión sobre la necesidad de conectar y atender a todas las regiones del país.",
    curiousFacts: [
      "Hasta 1903, el mapa oficial de Colombia incluía el istmo de Panamá, conectando geográficamente a América Central con América del Sur.",
      "En esa época las noticias tardaban semanas en llegar a Bogotá; sin carreteras ni aviación, el correo dependía de vapores por el río Magdalena y mulas por caminos de herradura.",
      "El café colombiano comenzaba a ganar renombre mundial como el principal producto de exportación que financiaba el desarrollo del país.",
    ],
    howChildrenLived:
      "Los niños jugaban en las plazas con trompos de madera tallados a mano, baleros y muñecos de trapo. En los pueblos y veredas colaboraban en las labores familiares y asistían a escuelas con materiales muy sencillos.",
    soundOrSensation:
      "El golpeteo rítmico del telégrafo en la oficina postal y el paso de los caballos sobre las calles empedradas.",
    leoChallenge:
      "Observa un mapa de Colombia de 1900 y compáralo con el actual: ¿qué departamentos y fronteras cambiaron en el siglo XX?",
    timeMachineCoordinates: {
      era: "Inicios del Siglo XX - 1903",
      temporalFlux: "98.7%",
      dangerLevel: "Épico",
    },
    colombianContext: {
      decade: "Década de 1900",
      region: "Istmo de Panamá y Fronteras Nacionales",
      socialTheme: "Geografía, Soberanía y Transformación Territorial",
    },
  },
  "1920": {
    yearOrEra: "1920 - Ferrocarriles, Café y la Danza de los Millones",
    title: "1920: Auge Cafetero, Ferrocarriles Nacionales y Aviación SCADTA",
    shortSummary:
      "La década de 1920 trajo una veloz modernización a Colombia conocida como 'la danza de los millones'. Las locomotoras a vapor transportaban miles de sacos de café desde las cordilleras hacia los puertos fluviales, mientras en Barranquilla despegaban los primeros hidroaviones de SCADTA (hoy Avianca), convirtiendo a Colombia en pionera de la aviación comercial en América.",
    curiousFacts: [
      "El Río Magdalena era la gran arteria del país: barcos de vapor con grandes ruedas de paletas llevaban pasajeros y café hasta la costa Caribe.",
      "Los primeros automóviles causaban asombro en las calles de Medellín, Cali y Bogotá; la gente se asomaba a los balcones al escuchar sus ruidosos motores.",
      "La indemnización por el canal de Panamá permitió al Estado financiar túneles ferroviarios, puentes metálicos y vías de comunicación.",
    ],
    howChildrenLived:
      "Los niños se divertían con la golosa (rayuela), elevando cometas de caña brava y fabricando carritos con tablas y ruedas de madera.",
    soundOrSensation:
      "El silbido potente de la locomotora de vapor mezclado con el aroma a café tostado en los pueblos de la cordillera.",
    leoChallenge:
      "¿Cómo cambió el transporte de alimentos en Colombia el paso de las mulas a los trenes de vapor?",
    timeMachineCoordinates: {
      era: "Años 20 - Década de la Modernización",
      temporalFlux: "99.2%",
      dangerLevel: "Tranquilo",
    },
    colombianContext: {
      decade: "Década de 1920",
      region: "Eje Cafetero, Valle del Magdalena y Barranquilla",
      socialTheme: "Economía Cafetera, Vías Férreas e Innovación Tecnológica",
    },
  },
  "1928": {
    yearOrEra: "1928 - La Huelga de las Bananeras en Ciénaga",
    title: "1928: La Lucha Social por los Derechos Laborales en el Caribe",
    shortSummary:
      "En noviembre y diciembre de 1928, miles de campesinos y trabajadores de las plantaciones de banano en Ciénaga, Magdalena, iniciaron una histórica huelga pacífica. Exigían jornadas dignas de 8 horas, pago en dinero real en vez de vales de tienda y atención médica. Este acontecimiento sentó las bases de la legislación laboral y la defensa de los derechos humanos en Colombia.",
    curiousFacts: [
      "Antes de esta huelga, muchos trabajadores recibían vales que únicamente podían canjearse en las tiendas propiedad de la misma empresa extranjera.",
      "El escritor Gabriel García Márquez inmortalizó este hito en su obra cumbre 'Cien Años de Soledad', narrando la memoria de su tierra natal.",
      "Las demandas de los trabajadores incluían contar con botiquines médicos en los campamentos y un día de descanso semanal obligatorio.",
    ],
    howChildrenLived:
      "Los hijos de los recolectores crecían en contacto con la naturaleza del Caribe, aprendiendo la sabiduría de la tierra, jugando en los caños y compartiendo cantos tradicionales.",
    soundOrSensation:
      "La brisa cálida de la Ciénaga Grande y los discursos de los líderes campesinos en la plaza de la estación.",
    leoChallenge:
      "¿Por qué es fundamental que la ley proteja los derechos y la salud de quienes trabajan en el campo cultivando nuestros alimentos?",
    timeMachineCoordinates: {
      era: "Años 20 - Diciembre de 1928",
      temporalFlux: "96.4%",
      dangerLevel: "Aventura",
    },
    colombianContext: {
      decade: "Década de 1920",
      region: "Ciénaga, Magdalena (Caribe Colombiano)",
      socialTheme: "Derechos de los Trabajadores y Justicia Social",
    },
  },
  "1948": {
    yearOrEra: "1948 - El 9 de Abril y El Bogotazo",
    title: "1948: El Bogotazo y la Transformación Urbana del País",
    shortSummary:
      "El 9 de abril de 1948 marcó un antes y un después en la historia contemporánea de Colombia. El asesinato del líder popular Jorge Eliécer Gaitán desató una revuelta masiva en Bogotá y varias capitales. Este suceso transformó la fisonomía de la ciudad, llevó al fin de los tranvías eléctricos y dejó la lección permanente del valor insustituible del diálogo, la convivencia y la paz.",
    curiousFacts: [
      "En abril de 1948 Bogotá era la sede de la Conferencia Panamericana que dio origen a la OEA (Organización de los Estados Americanos).",
      "Los tranvías eléctricos que recorrían la Carrera Séptima tenían timbres de campana característicos y fueron reemplazados progresivamente por buses de gasolina.",
      "Gaitán convocaba multitudes históricas con sus célebres discursos transmitidos por la radiodifusora nacional.",
    ],
    howChildrenLived:
      "Los estudiantes bogotanos vestían uniformes de paño grueso para el frío de la sabana, jugaban a las canicas en los andenes de ladrillo y leían las historietas dominicales en los periódicos.",
    soundOrSensation:
      "El repique de las campanas del tranvía sobre el asfalto mojado y los pregones de los voceadores de prensa en la Plaza de Bolívar.",
    leoChallenge:
      "¿Qué diferencias encuentras entre el transporte público de 1948 (el tranvía) y los sistemas que usamos hoy en las ciudades colombianas?",
    timeMachineCoordinates: {
      era: "Años 40 - Abril de 1948",
      temporalFlux: "94.8%",
      dangerLevel: "Aventura",
    },
    colombianContext: {
      decade: "Década de 1940",
      region: "Bogotá y Altiplano Cundiboyacense",
      socialTheme: "Historia Política, Convivencia Ciudadana y Vida Urbana",
    },
  },
  "1950": {
    yearOrEra: "1950 - Radio Sutatenza y la Educación Campesina",
    title: "1950: Radio Sutatenza y la Gran Revolución de las Escuelas Rurales",
    shortSummary:
      "Desde Sutatenza, Boyacá, una emisora radial comunitaria revolucionó la educación en América Latina. A través de radios de transistores de pilas y cartillas ilustradas de Acción Cultural Popular, cientos de miles de campesinos aprendieron a leer, escribir, cultivar y hacer cuentas desde sus veredas, demostrando el inmenso poder de la tecnología al servicio de la educación.",
    curiousFacts: [
      "Radio Sutatenza llegó a ser la red de radio rural más grande del mundo, distribuyendo millones de cartillas y miles de receptores de onda corta.",
      "En las aulas de clase de los años 50, los estudiantes mojaban plumas de metal en tinteros de cerámica encajados en sus pupitres de madera.",
      "No existían calculadoras ni computadores escolares; las operaciones matemáticas se resolvían con tiza sobre grandes tableros negros de pizarra.",
    ],
    howChildrenLived:
      "En las escuelas rurales, los niños caminaban senderos veredales con sus morrales de lona, escuchando las lecciones de la emisora junto a sus padres al caer la tarde.",
    soundOrSensation:
      "La sintonía inconfundible de Radio Sutatenza en 810 kHz y el olor a madera encerada y tiza fresca en el aula.",
    leoChallenge:
      "¿Cómo imaginas aprender una materia escolar sintonizando una clase por radio sin ninguna pantalla?",
    timeMachineCoordinates: {
      era: "Años 50 - Educación Rural",
      temporalFlux: "99.4%",
      dangerLevel: "Tranquilo",
    },
    colombianContext: {
      decade: "Década de 1950",
      region: "Sutatenza (Boyacá) y Veredas de Colombia",
      socialTheme: "Educación Popular, Alfabetización y Cultura Campesina",
    },
  },
  "1954": {
    yearOrEra: "1954 - La Llegada de la Televisión a Colombia",
    title: "1954: Primera Transmisión de Televisión en Blanco y Negro",
    shortSummary:
      "El 13 de junio de 1954 se encendió por primera vez la señal oficial de televisión en Colombia. Emitida desde los estudios del Palacio de San Carlos y la Biblioteca Nacional, conectó al país con una tecnología revolucionaria. Familias enteras se congregaban en las vitrinas de los almacenes para contemplar asombradas las primeras imágenes en blanco y negro.",
    curiousFacts: [
      "Los primeros televisores eran muebles grandes con tubos al vacío traídos por barco a través de Barranquilla y Buenaventura.",
      "La primera imagen transmitida fue el Himno Nacional interpretado por la Orquesta Sinfónica de Colombia.",
      "Como muy pocas casas tenían aparato receptor, la gente se aglomeraba frente a las vitrinas comerciales en el centro de Bogotá.",
    ],
    howChildrenLived:
      "Los niños escribían en cuadernos cosidos con pluma y tinta china. Jugaban al trompo zumbador, la golosa en andenes de piedra y las carreras de carritos de balineras.",
    soundOrSensation:
      "El zumbido agudo del tubo de rayos catódicos al encender el televisor, sintonías radiales y el rodar de los trolebuses.",
    leoChallenge:
      "¿De qué manera la llegada de la televisión transformó la comunicación y la unión de las familias colombianas en comparación con la radio?",
    timeMachineCoordinates: {
      era: "Años 50 - Junio de 1954",
      temporalFlux: "98.9%",
      dangerLevel: "Tranquilo",
    },
    colombianContext: {
      decade: "Década de 1950",
      region: "Bogotá y Red Nacional de Medios",
      socialTheme: "Ciencia, Telecomunicaciones y Cultura Audiovisual",
    },
  },
  "1957": {
    yearOrEra: "1957 - El Plebiscito y el Histórico Voto Femenino",
    title: "1957: Conquista Histórica del Voto Femenino en Colombia",
    shortSummary:
      "El 1 de diciembre de 1957, tras décadas de valientes liderazgos de mujeres colombianas como Esmeralda Arboleda y Josefina Valencia, las mujeres ejercieron por primera vez su derecho al voto en el plebiscito nacional. Cerca de dos millones de ciudadanas acudieron a las urnas con su nueva cédula, consolidando un paso trascendental para la democracia y la equidad de género en el país.",
    curiousFacts: [
      "La Cédula de Ciudadanía número 20.000.001 fue la primera cédula oficial expedida a una mujer en la historia colombiana.",
      "Hasta 1957 las leyes colombianas consideraban únicamente a los hombres aptos para elegir en las urnas.",
      "La participación femenina superó ampliamente las expectativas de las autoridades, llenando las mesas de votación en un ambiente festivo y pacífico.",
    ],
    howChildrenLived:
      "Las niñas acompañaron a sus madres y abuelas a los puestos de votación, siendo testigos de un cambio social que les abriría el camino a la educación superior y cargos públicos.",
    soundOrSensation:
      "El murmullo alegre de las filas ciudadanas, las marchas cívicas en la radio y el orgullo general en las calles.",
    leoChallenge:
      "¿Por qué la igualdad de derechos políticos entre mujeres y hombres es indispensable para el bienestar de toda la sociedad?",
    timeMachineCoordinates: {
      era: "Años 50 - Diciembre de 1957",
      temporalFlux: "99.5%",
      dangerLevel: "Tranquilo",
    },
    colombianContext: {
      decade: "Década de 1950",
      region: "Territorio Nacional de Colombia",
      socialTheme: "Democracia, Derechos Civiles e Igualdad de Género",
    },
  },
  "1970": {
    yearOrEra: "1970 - Juegos Populares de Barrio y Crecimiento Urbano",
    title: "1970: Tradición de Juegos de Barrio, Música Tropical y Vida Vecinal",
    shortSummary:
      "En la década de 1970, el crecimiento urbano convirtió a las calles de las ciudades colombianas en vibrantes espacios comunitarios. Niñas y niños salían al salir de la escuela a compartir juegos populares como el trompo de madera, la golosa, las canicas (piquis), el lazo y partidos de fútbol con piedras como arcos, fortaleciendo la amistad vecinal y la creatividad.",
    curiousFacts: [
      "El trompo de guayacán era el rey del recreo: los niños practicaban habilidades complejas como 'hacerlo bailar en la palma' o 'el puente aéreo'.",
      "La música se escuchaba en discos de vinilo de 33 y 45 RPM o en los primeros casetes grabados de las emisoras juveniles.",
      "Ciudades como Cali, Medellín, Barranquilla y Bogotá se expandieron con nuevos barrios donde los vecinos organizaban bazares y semanas culturales.",
    ],
    howChildrenLived:
      "Sin teléfonos móviles ni consolas de videojuegos, la diversión infantil transcurría al aire libre: los amigos se llamaban de puerta a puerta y jugaban hasta la puesta de sol.",
    soundOrSensation:
      "El choque cristalino de las canicas sobre la tierra, los zumbidos de los trompos girando y la música de salsa y cumbia desde las casas vecinas.",
    leoChallenge:
      "Pregúntale a una persona mayor de tu familia cuál era su juego de calle favorito en su infancia y ensáyalo en tu colegio.",
    timeMachineCoordinates: {
      era: "Años 70 - Cultura Popular",
      temporalFlux: "99.1%",
      dangerLevel: "Tranquilo",
    },
    colombianContext: {
      decade: "Década de 1970",
      region: "Barrios Populares de Colombia",
      socialTheme: "Juegos Tradicionales, Identidad Cultural y Urbanismo",
    },
  },
  "1982": {
    yearOrEra: "1982 - El Premio Nobel de Gabriel García Márquez",
    title: "1982: Gabriel García Márquez y el Premio Nobel de Literatura",
    shortSummary:
      "En diciembre de 1982, la literatura colombiana alcanzó la máxima cumbre universal cuando Gabriel García Márquez recibió el Premio Nobel en Estocolmo, Suecia. Fiel a su identidad caribeña, vistió un tradicional liquiliqui blanco de lino y estuvo acompañado por una delegación de cumbiamberos y vallenateros, demostrando que la cultura de nuestra tierra dialoga con el mundo entero.",
    curiousFacts: [
      "Gabo eligió el liquiliqui tradicional de la costa caribeña en vez del frac negro europeo como homenaje a sus raíces latinoamericanas.",
      "En el banquete real sueco sonaron la flauta de millo y el acordeón vallenato, contagiando de entusiasmo a personalidades de todo el planeta.",
      "'Cien Años de Soledad' se ha traducido a más de 40 idiomas, inspirando a lectores y escritores de todos los continentes.",
    ],
    howChildrenLived:
      "En las escuelas colombianas, los estudiantes celebraron montando obras de teatro con mariposas amarillas de papel y descubriendo en las bibliotecas escolares los relatos de Macondo.",
    soundOrSensation:
      "El compás cadencioso de la cumbia colombiana en el frío invernal de Estocolmo y los aplausos de pie en el gran auditorio.",
    leoChallenge:
      "¿Por qué crees que las historias nacidas en un pequeño pueblo como Aracataca lograron emocionar a lectores de Japón, Francia o Egipto?",
    timeMachineCoordinates: {
      era: "Años 80 - Diciembre de 1982",
      temporalFlux: "99.0%",
      dangerLevel: "Tranquilo",
    },
    colombianContext: {
      decade: "Década de 1980",
      region: "Caribe Colombiano y Escena Internacional",
      socialTheme: "Literatura Universal, Patrimonio Cultural y Expresión Artística",
    },
  },
  "1991": {
    yearOrEra: "1991 - La Constitución Política y los Derechos de la Niñez",
    title: "1991: La Nueva Constitución y la Primacía de los Derechos de los Niños",
    shortSummary:
      "En julio de 1991, la Asamblea Nacional Constituyente promulgó la nueva Carta Magna de Colombia. Fue el fruto de un amplio acuerdo democrático impulsado por el movimiento estudiantil de la 'Séptima Papeleta'. La Constitución reconoció a Colombia como un país pluriétnico y multicultural, creó la Acción de Tutela y consagró en su Artículo 44 que los derechos de los niños prevalecen sobre los de todos los demás.",
    curiousFacts: [
      "La Constitución de 1991 reconoció formalmente la diversidad étnica del país, garantizando los derechos de pueblos indígenas y afrocolombianos.",
      "La Acción de Tutela se convirtió en el instrumento legal más ágil y eficaz para que cualquier ciudadano o menor de edad defienda su salud y educación.",
      "En las escuelas nació la figura del personero estudiantil para que los alumnos practiquen la participación democrática desde el aula.",
    ],
    howChildrenLived:
      "Los estudiantes recibieron cartillas pedagógicas ilustradas de la Constitución y debatieron en clase sus derechos y responsabilidades como jóvenes ciudadanos.",
    soundOrSensation:
      "Los discursos solemnes en el Centro de Convenciones de Bogotá y la lectura del preámbulo constitucional en transmisión nacional.",
    leoChallenge:
      "¿Por qué el Artículo 44 de la Constitución establece que los derechos fundamentales de los niños van primero que cualquier otro interés?",
    timeMachineCoordinates: {
      era: "Años 90 - Julio de 1991",
      temporalFlux: "99.8%",
      dangerLevel: "Tranquilo",
    },
    colombianContext: {
      decade: "Década de 1990",
      region: "Territorio Nacional de Colombia",
      socialTheme: "Constitución Política, Derechos Fundamentales y Democracia Participativa",
    },
  },
};

// Generates dynamic, pedagogically rich data for ANY year between 1900 and 1999
export function getLocalTimeTravelData(queryOrYear: string | number): TimeTravelResult {
  const queryStr = String(queryOrYear).trim();
  const qClean = queryStr.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  // 1. Direct match in curated presets
  for (const [key, preset] of Object.entries(PRESETS_COLOMBIA_XX)) {
    if (qClean.includes(key)) {
      return preset;
    }
  }

  // 2. Keyword matching
  if (qClean.includes("panama") || qClean.includes("separacion") || qClean.includes("mil dias")) {
    return PRESETS_COLOMBIA_XX["1903"];
  }
  if (qClean.includes("tren") || qClean.includes("ferrocarril") || qClean.includes("scadta") || qClean.includes("avianca")) {
    return PRESETS_COLOMBIA_XX["1920"];
  }
  if (qClean.includes("bananera") || qClean.includes("cienaga") || qClean.includes("huelga")) {
    return PRESETS_COLOMBIA_XX["1928"];
  }
  if (qClean.includes("bogotazo") || qClean.includes("gaitan") || qClean.includes("tranvia")) {
    return PRESETS_COLOMBIA_XX["1948"];
  }
  if (qClean.includes("sutatenza") || qClean.includes("radio") || qClean.includes("escuela") || qClean.includes("alfabetizacion")) {
    return PRESETS_COLOMBIA_XX["1950"];
  }
  if (qClean.includes("television") || qClean.includes("tv") || qClean.includes("rojas pinilla")) {
    return PRESETS_COLOMBIA_XX["1954"];
  }
  if (qClean.includes("voto") || qClean.includes("mujer") || qClean.includes("plebiscito") || qClean.includes("femenino")) {
    return PRESETS_COLOMBIA_XX["1957"];
  }
  if (qClean.includes("juego") || qClean.includes("trompo") || qClean.includes("golosa") || qClean.includes("canica") || qClean.includes("barrio")) {
    return PRESETS_COLOMBIA_XX["1970"];
  }
  if (qClean.includes("gabo") || qClean.includes("nobel") || qClean.includes("soledad") || qClean.includes("garcia marquez")) {
    return PRESETS_COLOMBIA_XX["1982"];
  }
  if (qClean.includes("constitucion") || qClean.includes("tutela") || qClean.includes("septima papeleta")) {
    return PRESETS_COLOMBIA_XX["1991"];
  }

  // 3. Procedural decade generator for ANY year between 1900 and 1999
  const numericMatch = queryStr.match(/\b(19\d{2})\b/) || queryStr.match(/\b(\d{4})\b/);
  const rawNum = numericMatch ? parseInt(numericMatch[1], 10) : 1954;
  const clampedYear = Math.max(1900, Math.min(1999, rawNum));
  const decadeYear = Math.floor((clampedYear - 1900) / 10) * 10;
  const decadeText = decadeYear === 0 ? "Años 1900s" : `Años ${decadeYear}s`;

  const DECADE_THEMES: Record<number, { title: string; theme: string; summary: string; facts: string[]; challenge: string; region: string }> = {
    0: {
      title: `${clampedYear}: Amanecer del Siglo XX y Reorganización Nacional`,
      theme: "Paz, Fronteras y Reconstrucción",
      summary: `En el año ${clampedYear}, Colombia dejaba atrás las secuelas de la Guerra de los Mil Días. En todo el territorio, las familias trabajaban en el campo sembrando café, tabaco y caña de azúcar, mientras se tendían los primeros hilos de telégrafo que conectaron los pueblos más apartados.`,
      facts: [
        `En ${clampedYear}, viajar de Medellín o Cali a Bogotá tomaba entre 10 y 15 días a lomo de mula y en balsas fluviales.`,
        "El telégrafo de clave Morse era el medio más veloz para recibir noticias desde la capital.",
        "Los primeros colegios públicos del siglo XX utilizaban pizarras de piedra y tizas hechas con cal.",
      ],
      challenge: `¿Cómo te comunicarías con tus amigos si una carta tardara tres semanas en llegar a su destino?`,
      region: "Región Andina y Llanos Orientales",
    },
    10: {
      title: `${clampedYear}: El Centenario de la Independencia y la Industria`,
      theme: "Celebración Patria e Industria Naciente",
      summary: `Hacia ${clampedYear}, Colombia celebraba con orgullo el Centenario de su Independencia con grandes exposiciones agrícolas e industriales. Surgían las primeras fábricas textiles en Antioquia y se modernizaban los puertos caribeños como Barranquilla y Cartagena.`,
      facts: [
        "Se inauguró el primer parque de la Independencia en Bogotá con quioscos de hierro y luz eléctrica.",
        "El café superó al tabaco y la quina como el gran motor de la economía que construyó caminos y hospitales.",
        "Los periódicos se imprimían en linotipos de plomo y los voceadores recorrían las plazas al amanecer.",
      ],
      challenge: `¿Por qué fue tan importante el café para construir las primeras escuelas y carreteras en Colombia?`,
      region: "Antioquia, Bogotá y Costa Caribe",
    },
    20: {
      title: `${clampedYear}: Ferrocarriles a Vapor y Despegue de la Aviación`,
      theme: "Modernización y Nuevas Vías de Comunicación",
      summary: `En ${clampedYear}, Colombia experimentó un auge económico vertiginoso. Las locomotoras a vapor silbaban en las montañas atravesando túneles y viaductos, mientras sobre el Río Magdalena navegaban majestuosos hidroaviones comerciales, uniendo al país en cuestión de horas.`,
      facts: [
        "Colombia fue el segundo país del mundo en fundar una aerolínea comercial continua (SCADTA en 1919).",
        "El tren cafetero llevaba sacos de café hasta Puerto Berrío para embarcarlos hacia los mercados mundiales.",
        "Aparecieron los primeros bombillos eléctricos en las plazas de mercado de las capitales.",
      ],
      challenge: `¿Qué diferencias encuentras entre viajar en una locomotora a vapor de 1920 y viajar en un bus moderno hoy?`,
      region: "Eje Cafetero, Valle del Magdalena y Barranquilla",
    },
    30: {
      title: `${clampedYear}: Reformas Sociales, Educación y Derechos`,
      theme: "Revolución en Marcha y Educación Pública",
      summary: `Durante ${clampedYear}, Colombia vivió una etapa de reformas progresistas impulsadas por la 'Revolución en Marcha'. Se fundó la moderna Ciudad Universitaria de la Universidad Nacional y se reconoció el derecho a la huelga y la educación básica obligatoria.`,
      facts: [
        "Por primera vez se construyeron escuelas normales superiores para formar maestras en todo el territorio.",
        "La radio comenzó a entrar a las casas con radionovelas, programas de poesía y serenatas en vivo.",
        "El fútbol y el ciclismo empezaron a reunir multitudes apasionadas en canchas de barrio y carreteras.",
      ],
      challenge: `¿Por qué la educación gratuita y de calidad es el derecho más valioso para los niños de un país?`,
      region: "Bogotá, Tolima y Valle del Cauca",
    },
    40: {
      title: `${clampedYear}: Transformación Urbana y Convivencia Democrática`,
      theme: "Crecimiento de las Ciudades y Diálogo Social",
      summary: `En ${clampedYear}, las ciudades colombianas crecían a un ritmo acelerado. Los tranvías eléctricos recorrían las avenidas, los barrios obreros se expandían y el país debatía intensamente el futuro de sus instituciones democráticas y el valor de la paz comunitaria.`,
      facts: [
        "Los tranvías bogotanos tenían campanas en el piso que el conductor pisaba para alertar a los peatones.",
        "Las radionovelas colombianas paralizaban las tardes familiares mientras se tomaba el chocolate con queso.",
        "En 1948 se fundó en Bogotá la OEA (Organización de Estados Americanos) con representantes de todo el continente.",
      ],
      challenge: `¿Qué valores de diálogo y respeto son esenciales para resolver diferencias sin recurrir a la violencia?`,
      region: "Bogotá, Medellín y Cali",
    },
    50: {
      title: `${clampedYear}: Televisión, Radio Rural y el Voto Femenino`,
      theme: "Tecnología de la Información y Equidad de Género",
      summary: `La década de 1950 en Colombia fue una era dorada para la comunicación y la democracia: en 1954 nació la televisión nacional, Radio Sutatenza alfabetizó a millones en los campos y en 1957 las mujeres conquistaron el voto por primera vez en la historia.`,
      facts: [
        "La televisión llegó a Colombia gracias a equipos importados de Alemania y Estados Unidos en 1954.",
        "En 1957 votaron cerca de dos millones de mujeres colombianas con su primera cédula de ciudadanía.",
        "Radio Sutatenza enviaba cartillas de lectura hasta las veredas más lejanas de la cordillera.",
      ],
      challenge: `¿Cómo crees que cambió la vida de las familias cuando la televisión y la radio llegaron a sus salas?`,
      region: "Boyacá, Cundinamarca y Red Nacional",
    },
    60: {
      title: `${clampedYear}: Veredas Cafeteras, Música y Juventud`,
      theme: "Cultura Joven, Deporte y Tradición",
      summary: `En ${clampedYear}, Colombia vibraba con la Vuelta a Colombia en bicicleta transmitida por radio, el surgimiento de grupos juveniles de rock y música tropical, y la consolidación de la Federación Nacional de Cafeteros en miles de municipios escolares.`,
      facts: [
        "La Vuelta a Colombia paralizaba al país: familias enteras salían a las carreteras a aplaudir a los ciclistas 'escarabajos'.",
        "Apareció el icónico personaje de Juan Valdez para representar la dedicación de las familias cafeteras.",
        "Nació el movimiento literario del Nadaísmo en Medellín, cuestionando las viejas formas de escribir.",
      ],
      challenge: `¿Por qué el ciclismo se convirtió en uno de los deportes más amados y representativos de Colombia?`,
      region: "Eje Cafetero, Boyacá y Antioquia",
    },
    70: {
      title: `${clampedYear}: Juegos Tradicionales y Éxodo Urbano`,
      theme: "Juegos de Barrio y Riqueza Musical",
      summary: `Durante ${clampedYear}, los niños colombianos llenaban las calles de juegos comunitarios: trompos de madera, canicas y golosa. La música de salsa florecía en Cali y Barranquilla, y la producción artesanal y campesina enriquecía las ferias de cada departamento.`,
      facts: [
        "Los trompos de guayacán eran torneados a mano y se afinaban con cordeles de fique trenzado.",
        "Cali celebró los VI Juegos Panamericanos en 1971, transformando su infraestructura deportiva y cultural.",
        "Los discos de vinilo de 45 RPM eran el tesoro de los jóvenes en las fiestas y tertulias vecinales.",
      ],
      challenge: `¿Qué juego tradicional de tu departamento te gustaría rescatar y enseñar a tus compañeros de clase?`,
      region: "Valle del Cauca, Caribe y Huila",
    },
    80: {
      title: `${clampedYear}: Literatura Universal y Solidaridad Ciudadana`,
      theme: "Letras, Identidad y Resiliencia Nacional",
      summary: `En ${clampedYear}, Colombia demostró al planeta su inmensa riqueza artística y el coraje de su gente. En 1982 Gabriel García Márquez recibió el Premio Nobel de Literatura vestido de liquiliqui caribeño, exaltando la memoria mágica de nuestro pueblo ante el mundo entero.`,
      facts: [
        "Gabriel García Márquez celebró su Nobel en Suecia rodeado de cumbiamberos y vallenateros colombianos.",
        "Aparecieron los primeros computadores en universidades e institutos de educación técnica.",
        "La música vallenata y la cumbia fueron declaradas patrimonio sonoro de la nación.",
      ],
      challenge: `¿Qué cuento o historia de Gabriel García Márquez te inspira más sobre las costumbres de Colombia?`,
      region: "Caribe Colombiano y Escena Internacional",
    },
    90: {
      title: `${clampedYear}: La Constitución de 1991 y la Diversidad Pluriétnica`,
      theme: "Derechos Humanos, Niñez y Paz",
      summary: `En ${clampedYear}, Colombia consolidó su nueva Constitución Política democrática. Se reconoció la diversidad étnica de los pueblos indígenas y afrocolombianos, se fortaleció la defensa de la niñez mediante el Artículo 44 y nació la Acción de Tutela para proteger la salud y la educación.`,
      facts: [
        "El Artículo 44 de la Constitución de 1991 ordenó que los derechos de los niños prevalecen sobre todos los demás.",
        "La Selección Colombia de fútbol ilusionó al país en los Mundiales de Italia 90 y USA 94 con su juego de toque.",
        "Las primeras salas de informática con internet llegaron a los colegios a finales de los años 90.",
      ],
      challenge: `¿Por qué es fundamental que la Constitución reconozca que Colombia es un país pluriétnico y multicultural?`,
      region: "Territorio Nacional de Colombia",
    },
  };

  const info = DECADE_THEMES[decadeYear] || DECADE_THEMES[50];

  return {
    yearOrEra: `${clampedYear} - Colombia en el Siglo XX`,
    title: info.title,
    shortSummary: info.summary,
    curiousFacts: info.facts,
    howChildrenLived: `Los estudiantes asistían a la escuela con cuadernos cosidos, uniformes escolares de gala y compartían juegos al aire libre como el trompo, las canicas, el lazo y rondas tradicionales.`,
    soundOrSensation: `El sonar de las campanas en la plaza del pueblo, las transmisiones de radio familiar y el saludo cálido de los vecinos.`,
    leoChallenge: info.challenge,
    timeMachineCoordinates: {
      era: `Colombia • ${decadeText} (${clampedYear})`,
      temporalFlux: "99.4%",
      dangerLevel: "Tranquilo",
    },
    colombianContext: {
      decade: decadeText,
      region: info.region,
      socialTheme: info.theme,
    },
  };
}

// Client-side helper that guarantees Time Machine travel will NEVER fail
export async function fetchTimeTravel(queryOrYear: string | number): Promise<TimeTravelResult> {
  const queryStr = String(queryOrYear).trim();

  // Try calling the backend API with a short 3.5s timeout
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500);

    const res = await fetch('/api/time-travel', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: queryStr }),
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const json = await res.json();
      if (json && json.success && json.data && json.data.title) {
        return json.data as TimeTravelResult;
      }
    }
  } catch (_err) {
    // Graceful silent fallback to instant local Colombian 20th century knowledge engine
  }

  // Instant zero-failure local fallback
  return getLocalTimeTravelData(queryStr);
}

// Client-side helper that guarantees Leo Chat will NEVER freeze or go silent
export async function askLeoChat(message: string, eraContext?: string): Promise<string> {
  const text = message.trim();
  if (!text) return '¡Hola viajero! Pregúntame sobre cualquier año o acontecimiento del siglo XX colombiano.';

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500);

    const res = await fetch('/api/leo-chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: text, eraContext }),
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      if (data && data.reply && typeof data.reply === 'string') {
        return data.reply.trim();
      }
    }
  } catch (_err) {
    // Fallback to local intelligent responder
  }

  // Intelligent local responder for Colombian 20th century history
  const q = text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  if (q.includes("bogotazo") || q.includes("1948") || q.includes("gaitan")) {
    return "El 9 de abril de 1948 fue un momento decisivo: tras el asesinato de Jorge Eliécer Gaitán, el pueblo bogotano protestó y la ciudad cambió para siempre, marcando el fin de los tranvías eléctricos y enseñándonos el inmenso valor de la convivencia ciudadana.";
  }
  if (q.includes("tv") || q.includes("television") || q.includes("1954")) {
    return "¡La televisión llegó a Colombia el 13 de junio de 1954! La primera transmisión se hizo desde la Biblioteca Nacional y el Palacio de San Carlos en blanco y negro, reuniendo a multitudes frente a las vitrinas de los almacenes para ver este asombroso invento.";
  }
  if (q.includes("gabo") || q.includes("nobel") || q.includes("1982") || q.includes("soledad")) {
    return "En diciembre de 1982, Gabriel García Márquez recibió el Premio Nobel de Literatura en Estocolmo vistiendo un liquiliqui blanco de lino y acompañado por música de cumbia y vallenato, llevando el alma mágica de Colombia a todo el planeta.";
  }
  if (q.includes("voto") || q.includes("mujer") || q.includes("1957")) {
    return "El 1 de diciembre de 1957 fue un día de fiesta democrática: las mujeres colombianas votaron por primera vez en el plebiscito nacional, logrando tras décadas de lucha un derecho fundamental que transformó para bien a nuestro país.";
  }
  if (q.includes("sutatenza") || q.includes("radio") || q.includes("1950")) {
    return "Radio Sutatenza, nacida en Boyacá en los años 50, fue la red de educación rural más grande del mundo. A través de radios de pilas y cartillas ilustradas, enseñó a leer, escribir y cultivar a millones de familias campesinas.";
  }
  if (q.includes("constitucion") || q.includes("1991") || q.includes("tutela")) {
    return "La Constitución de 1991 fue redactada tras el impulso de los estudiantes de la Séptima Papeleta. Creó la Acción de Tutela para defender los derechos de todos y consagró en su Artículo 44 que los derechos de los niños prevalecen sobre cualquier otro.";
  }
  if (q.includes("tren") || q.includes("ferrocarril") || q.includes("1920")) {
    return "En los años 20 los ferrocarriles nacionales a vapor eran la gran maravilla de Colombia. Transportaban los sacos de café desde las empinadas cordilleras hasta los barcos del río Magdalena, impulsando la construcción de escuelas y puentes.";
  }
  if (q.includes("juego") || q.includes("nino") || q.includes("trompo") || q.includes("1970")) {
    return "En los años 70 las calles eran el patio de recreo más divertido: jugábamos al trompo de madera zumbador, la golosa con tiza, las canicas de vidrio y los carritos de balineras con amigos de todo el barrio.";
  }
  if (q.includes("panama") || q.includes("1903")) {
    return "En 1903 se separó Panamá de Colombia, lo que redefinió nuestras fronteras nacionales y motivó al país a buscar mejores carreteras, ferrocarriles y telégrafos para conectar a todas las regiones.";
  }

  return `Durante el siglo XX colombiano (1900-1999), nuestro país vivió transformaciones admirables en transporte, educación rural, derechos humanos y cultura popular. ¿Qué década o año específico te gustaría que exploremos juntos?`;
}

// Client-side helper for Homework Helper
export async function generateHomeworkHelper(
  query: string,
  mode: string,
  currentYear: number = 1954,
  eraContext?: string
): Promise<HomeworkHelperResult> {
  const text = query.trim();

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500);

    const res = await fetch('/api/homework-helper', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: text, mode, currentYear, eraContext }),
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const json = await res.json();
      if (json && json.success && json.data) {
        return json.data as HomeworkHelperResult;
      }
    }
  } catch (_err) {
    // Fallback to local homework generator
  }

  // Generate complete, structured homework assistance locally
  const dossier = getLocalTimeTravelData(text || currentYear);
  const title = `Ficha Escolar: ${dossier.title}`;

  let contentText = "";
  if (mode === "summary") {
    contentText = `${dossier.shortSummary} Este acontecimiento representa un hito clave en las Ciencias Sociales de Colombia, evidenciando cómo las comunidades superaron desafíos históricos mediante la educación, el trabajo solidario y el desarrollo de nuevas tecnologías de comunicación.`;
  } else if (mode === "bullets") {
    contentText = `A continuación se presentan los conceptos fundamentales organizados para el estudio y repaso de la lección escolar sobre ${dossier.yearOrEra}.`;
  } else if (mode === "workshop") {
    contentText = `Taller Guiado de Indagación Histórica:\n1. Pregunta reflexiva: ${dossier.leoChallenge}\n2. Contexto geográfico: ${dossier.colombianContext.region}.\n3. Tema social articulador: ${dossier.colombianContext.socialTheme}.`;
  } else {
    contentText = `Investigación Escolar sobre ${dossier.yearOrEra}: ${dossier.shortSummary}`;
  }

  const notebookDraft = `--- BORRADOR SUGERIDO PARA EL CUADERNO ---\nFecha: Colombia Siglo XX (${dossier.colombianContext.decade})\nTema: ${dossier.title}\n\nIdea Principal: ${dossier.shortSummary}\n\nPuntos Notables:\n${dossier.curiousFacts.map((f, i) => `${i + 1}. ${f}`).join("\n")}\n\nConclusión Pedagógica: Comprender estos sucesos nos permite valorar la identidad, la paz y los derechos en nuestra comunidad escolar.`;

  return {
    title,
    query: text || `Año ${currentYear}`,
    mode,
    content: contentText,
    bulletPoints: dossier.curiousFacts,
    notebookDraft,
    funFactForClass: dossier.soundOrSensation,
    recommendedEraYear: parseInt(dossier.yearOrEra.match(/\b(19\d{2})\b/)?.[1] || "1954", 10),
  };
}
