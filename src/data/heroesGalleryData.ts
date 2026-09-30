export interface HeroTimelineEvent {
  year: number;
  title: string;
  description: string;
  impactTag: string;
}

export interface HistoricalHero {
  id: string;
  name: string;
  title: string;
  epoch: string;
  category: 'Literatura & Artes' | 'Derechos & Democracia' | 'Educación & Medios' | 'Liderazgo Social';
  quote: string;
  imageSrc: string;
  badgeEmoji: string;
  colorScheme: {
    border: string;
    glow: string;
    gradient: string;
    text: string;
  };
  summary: string;
  timeline: HeroTimelineEvent[];
  legacyImpact: string;
  curiosityFact: string;
}

export const HISTORICAL_HEROES: HistoricalHero[] = [
  {
    id: 'gabo',
    name: 'Gabriel García Márquez',
    title: 'Premio Nobel de Literatura & Maestro del Realismo Mágico',
    epoch: '1927 - 2014 (Hito cumbre: 1982)',
    category: 'Literatura & Artes',
    quote: 'La vida no es la que uno vivió, sino la que uno recuerda y cómo la recuerda para contarla.',
    imageSrc: '/src/assets/images/portrait_gabo_1790539917144.jpg',
    badgeEmoji: '🦋',
    colorScheme: {
      border: 'border-amber-400',
      glow: 'shadow-[0_0_35px_rgba(245,158,11,0.4)]',
      gradient: 'from-amber-500/20 via-yellow-500/10 to-orange-500/20',
      text: 'text-amber-300',
    },
    summary:
      'Nacido en Aracataca (Magdalena), inmortalizó el Caribe colombiano, la historia y la memoria de nuestro país a través de obras cumbre como Cien Años de Soledad, El Coronel no tiene quien le escriba y El Amor en los tiempos del cólera.',
    timeline: [
      {
        year: 1927,
        title: 'Nacimiento en Aracataca',
        description: 'Crece junto a sus abuelos, el coronel Nicolás Márquez y Tranquilina Iguarán, absorbiendo relatos de guerra y leyendas populares.',
        impactTag: 'Raíces Mágicas',
      },
      {
        year: 1947,
        title: 'Llegada a Bogotá y primeros cuentos',
        description: 'Estudia Derecho en la Universidad Nacional y publica su primer cuento "La tercera resignación" en El Espectador.',
        impactTag: 'Periodismo & Letras',
      },
      {
        year: 1955,
        title: 'Publicación de La Hojarasca',
        description: 'Presenta por primera vez al mítico pueblo de Macondo, sentando las bases de una nueva literatura universal.',
        impactTag: 'Nace Macondo',
      },
      {
        year: 1967,
        title: 'Publicación de Cien Años de Soledad',
        description: 'Editada en Buenos Aires, la novela se convierte en un fenómeno literario planetario traducido a más de 40 idiomas.',
        impactTag: 'Boom Latinoamericano',
      },
      {
        year: 1982,
        title: 'Premio Nobel de Literatura',
        description: 'Viste una guayabera blanca (likiliki caribeño) en Estocolmo y pronuncia su célebre discurso "La soledad de América Latina".',
        impactTag: 'Hito Histórico de Colombia',
      },
      {
        year: 1994,
        title: 'Creación de la Fundación Gabo (FNPI)',
        description: 'Funda en Cartagena la institución para formar a las nuevas generaciones de periodistas éticos de Iberoamérica.',
        impactTag: 'Legado Educativo',
      },
    ],
    legacyImpact:
      'Gabo colocó la identidad, la biodiversidad y el espíritu poético de Colombia en el centro del mapa cultural mundial, demostrando que la fantasía y la realidad histórica son inseparables.',
    curiosityFact:
      'Cuando ganó el Premio Nobel en 1982, decidió no usar el tradicional frac negro sueco de etiqueta, sino una clásica guayabera caribeña blanca de lino en honor a sus raíces colombianas.',
  },
  {
    id: 'rivera',
    name: 'José Eustasio Rivera',
    title: 'Poeta de la Selva & Denunciante de la Fiebre del Caucho',
    epoch: '1888 - 1928 (Hito cumbre: 1924)',
    category: 'Literatura & Artes',
    quote: '¡Jugué mi corazón al azar y me lo ganó la violencia! (...) Antes de que me hubiera apasionado por mujer alguna, jugué mi corazón al azar...',
    imageSrc: '/src/assets/images/portrait_rivera_1790539929144.jpg',
    badgeEmoji: '🌿',
    colorScheme: {
      border: 'border-emerald-400',
      glow: 'shadow-[0_0_35px_rgba(16,185,129,0.4)]',
      gradient: 'from-emerald-500/20 via-teal-500/10 to-green-500/20',
      text: 'text-emerald-300',
    },
    summary:
      'Nacido en San Mateo (hoy Rivera, Huila), fue abogado, diplomático y el creador de la máxima novela de la selva suramericana: La Vorágine. Con valentía denunció la explotación inhumana de los caucheros y pueblos originarios en la Amazonía.',
    timeline: [
      {
        year: 1888,
        title: 'Nacimiento en el Huila',
        description: 'Crece entre los ríos Magdalena y Neiva, desarrollando una temprana sensibilidad por los paisajes andinos y la lírica.',
        impactTag: 'Orígenes Huilenses',
      },
      {
        year: 1921,
        title: 'Publicación de Tierra de Promisión',
        description: 'Publica su célebre libro de 55 sonetos dedicados a las cumbres, las selvas y los ríos de Colombia.',
        impactTag: 'Poesía Colombiana',
      },
      {
        year: 1922,
        title: 'Comisión Limítrofe en la Amazonía',
        description: 'Designado para demarcar la frontera con Venezuela, viaja a las profundidades de los ríos Orinoco, Meta y Amazonas, presenciando el holocausto cauchero.',
        impactTag: 'Misión Diplomática',
      },
      {
        year: 1924,
        title: 'Publicación de La Vorágine',
        description: 'Lanza la novela en Bogotá denunciando a la Casa Arana por los abusos a campesinos e indígenas, cambiando para siempre la novela social.',
        impactTag: 'Novela Cumbre del Siglo XX',
      },
      {
        year: 1928,
        title: 'Defensa de las fronteras en Nueva York',
        description: 'Viaja a Estados Unidos para promover la traducción de su obra y defender los intereses petroleros y territoriales de Colombia antes de su repentina muerte.',
        impactTag: 'Patriota Intelectual',
      },
    ],
    legacyImpact:
      'Su obra sentó las bases del ecologismo, la literatura de denuncia y los derechos humanos en las selvas de Colombia, convirtiéndose en el gran faro de la Amazonía.',
    curiosityFact:
      'Para escribir La Vorágine, Rivera enfermó de fiebres y paludismo en la selva, pero redactó capítulos enteros sobre el lomo de su caballo y en cuadernos de campaña.',
  },
  {
    id: 'gaitan',
    name: 'Jorge Eliécer Gaitán',
    title: 'Tribuno del Pueblo & Defensor de la Justicia Social',
    epoch: '1903 - 1948 (Hito cumbre: 1948)',
    category: 'Liderazgo Social',
    quote: '¡Yo no soy un hombre, soy un pueblo! El pueblo es superior a sus dirigentes.',
    imageSrc: '/src/assets/images/portrait_gaitan_1790539940287.jpg',
    badgeEmoji: '🚊',
    colorScheme: {
      border: 'border-red-400',
      glow: 'shadow-[0_0_35px_rgba(239,68,68,0.4)]',
      gradient: 'from-red-500/20 via-orange-500/10 to-amber-500/20',
      text: 'text-red-300',
    },
    summary:
      'Jurista sobresaliente y el orador popular más influyente del siglo XX en Colombia. Como congresista denunció la Masacre de las Bananeras en 1928, fue alcalde de Bogotá y lideró un movimiento cívico masivo por la dignidad y equidad de las clases trabajadoras.',
    timeline: [
      {
        year: 1903,
        title: 'Nacimiento en Bogotá',
        description: 'Hijo de una maestra de escuela y un librero, se forma en la Universidad Nacional y luego obtiene el doctorado en Derecho Penal en Roma con honores Magna Cum Laude.',
        impactTag: 'Formación Jurídica',
      },
      {
        year: 1929,
        title: 'El Debate de las Bananeras',
        description: 'Viaja al Magdalena e investiga los hechos de Ciénaga de 1928, pronunciando en el Congreso discursos históricos que exigieron justicia para los obreros.',
        impactTag: 'Defensa de los Trabajadores',
      },
      {
        year: 1936,
        title: 'Alcaldía de Bogotá',
        description: 'Promueve la educación pública gratuita, la modernización de los barrios populares, comedores escolares y la higiene urbana.',
        impactTag: 'Gestión Social',
      },
      {
        year: 1948,
        title: 'La Marcha del Silencio',
        description: 'El 7 de febrero reúne a más de 100.000 colombianos con antorchas en la Plaza de Bolívar en una protesta pacífica que no emitió ni una sola palabra, pidiendo paz.',
        impactTag: 'Clamor de Paz',
      },
      {
        year: 1948,
        title: '9 de Abril: El Bogotazo',
        description: 'Es asesinado en el centro de Bogotá, desencadenando una profunda conmoción social que transformó para siempre la historia política del país.',
        impactTag: 'Quiebre Histórico',
      },
    ],
    legacyImpact:
      'Gaitán representó la voz de los sectores populares y el anhelo de una Colombia sin oligarquías ni exclusión, inspirando el debate sobre la justicia distributiva y la participación democrática.',
    curiosityFact:
      'Su discurso en la "Marcha del Silencio" fue una de las oraciones más poéticas de la política colombiana: "Os pedimos paz y piedad para la patria. Impedid la violencia, señores del gobierno".',
  },
  {
    id: 'arboleda',
    name: 'Esmeralda Arboleda',
    title: 'Pionera del Voto Femenino & Primera Senadora de Colombia',
    epoch: '1921 - 1997 (Hito cumbre: 1954 - 1957)',
    category: 'Derechos & Democracia',
    quote: 'Las mujeres no pedimos privilegios ni concesiones especiales: exigimos la plenitud de nuestros derechos como ciudadanas iguales de la patria.',
    imageSrc: '/src/assets/images/portrait_arboleda_1790539950446.jpg',
    badgeEmoji: '🗳️',
    colorScheme: {
      border: 'border-purple-400',
      glow: 'shadow-[0_0_35px_rgba(168,85,247,0.4)]',
      gradient: 'from-purple-500/20 via-pink-500/10 to-indigo-500/20',
      text: 'text-purple-300',
    },
    summary:
      'Nacida en Palmira (Valle del Cauca), fue la primera mujer en graduarse como abogada en la Universidad del Cauca y una de las principales artífices del derecho de las mujeres colombianas a elegir y ser elegidas en 1954 y el plebiscito de 1957.',
    timeline: [
      {
        year: 1921,
        title: 'Nacimiento en Palmira',
        description: 'Crece en el Valle del Cauca y se destaca por su excelencia académica en una época donde pocas mujeres accedían a la educación superior.',
        impactTag: 'Pionera Académica',
      },
      {
        year: 1944,
        title: 'Primera Abogada de la Universidad del Cauca',
        description: 'Rompe barreras de género al graduarse con una tesis laureada en derecho constitucional y derechos civiles.',
        impactTag: 'Apertura Universitaria',
      },
      {
        year: 1954,
        title: 'Conquista del Sufragio Femenino',
        description: 'Junto a Josefina Valencia y líderes sufragistas, logra la aprobación del Acto Legislativo No. 3 en la Asamblea Nacional Constituyente, reconociendo el voto a la mujer.',
        impactTag: 'Derecho al Voto',
      },
      {
        year: 1957,
        title: 'Primer voto en las urnas',
        description: 'El 1 de diciembre de 1957 millones de colombianas ejercen por primera vez su derecho al voto en el plebiscito nacional.',
        impactTag: 'Democracia Plena',
      },
      {
        year: 1958,
        title: 'Primera Senadora de la República',
        description: 'Elegida al Congreso Nacional, promueve leyes de protección a la niñez, equidad salarial y educación femenina.',
        impactTag: 'Liderazgo en el Senado',
      },
      {
        year: 1961,
        title: 'Primera Ministra de Comunicaciones',
        description: 'Lidera la expansión de la radiodifusión, las telecomunicaciones y el servicio postal nacional.',
        impactTag: 'Poder Ejecutivo',
      },
    ],
    legacyImpact:
      'Abrió las puertas de las universidades, las urnas y los altos cargos de Estado para todas las generaciones de mujeres de Colombia.',
    curiosityFact:
      'Cuando votó por primera vez en 1957, portaba la cédula de ciudadanía femenina número 20.000.001, símbolo del inicio de la ciudadanía plena de la mujer en Colombia.',
  },
  {
    id: 'salcedo',
    name: 'Monseñor José Joaquín Salcedo',
    title: 'Pionero de Radio Sutatenza & Revolución Educativa Rural',
    epoch: '1921 - 1994 (Hito cumbre: 1947 - 1970)',
    category: 'Educación & Medios',
    quote: 'La ignorancia es la mayor de las servidumbres; la educación por radio lleva la luz del saber hasta la choza más lejana de la cordillera.',
    imageSrc: '/src/assets/images/portrait_salcedo_1790539969224.jpg',
    badgeEmoji: '📻',
    colorScheme: {
      border: 'border-sky-400',
      glow: 'shadow-[0_0_35px_rgba(56,189,248,0.4)]',
      gradient: 'from-sky-500/20 via-blue-500/10 to-cyan-500/20',
      text: 'text-sky-300',
    },
    summary:
      'Sacerdote boyacense y visionario que en 1947 instaló un transmisor de radio artesanal de 80 vatios en el valle de Tenza (Boyacá) para fundar Radio Sutatenza y Acción Cultural Popular (ACPO), enseñando a leer, escribir, cultivar y hacer cuentas a más de 8 millones de campesinos en toda Colombia.',
    timeline: [
      {
        year: 1921,
        title: 'Nacimiento en Corrales (Boyacá)',
        description: 'Nace en las montañas boyacenses fascinado por la mecánica, la electricidad y la telegrafía.',
        impactTag: 'Curiosidad Técnica',
      },
      {
        year: 1947,
        title: 'Primera transmisión en Sutatenza',
        description: 'Con un transmisor de aficionado y tres radios a batería en chozas campesinas, inicia las primeras clases radiales de alfabetización.',
        impactTag: 'Nace la Radio Educativa',
      },
      {
        year: 1953,
        title: 'Expansión de Acción Cultural Popular (ACPO)',
        description: 'Importa con apoyo internacional radios campesinos de baquelita sintonizados exclusivamente a la frecuencia de Sutatenza.',
        impactTag: 'Tecnología Social',
      },
      {
        year: 1958,
        title: 'Creación del Semanario El Campesino',
        description: 'Publica el periódico más leído de la ruralidad colombiana con consejos de agricultura, salud, literatura y deberes cívicos.',
        impactTag: 'Prensa Rural Masiva',
      },
      {
        year: 1968,
        title: 'Inauguración de la potente planta de San Cayetano',
        description: 'El papa Pablo VI inaugura en persona los gigantescos transmisores de 250 kW, convirtiendo a Sutatenza en una de las radios más potentes del planeta.',
        impactTag: 'Reconocimiento Mundial',
      },
    ],
    legacyImpact:
      'Pionero del aprendizaje a distancia décadas antes de internet, demostró cómo la tecnología y la ciencia aplicada pueden erradicar el analfabetismo y dignificar el campo.',
    curiosityFact:
      'La UNESCO y la ONU catalogaron a Radio Sutatenza como el modelo de educación a distancia más exitoso e innovador del siglo XX en el tercer mundo.',
  },
];
