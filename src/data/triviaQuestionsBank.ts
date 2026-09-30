import { TriviaQuestion } from '../types';

export const TRIVIA_QUESTIONS: TriviaQuestion[] = [
  // ==================== DÉCADA 1900 - 1909 ====================
  {
    id: 't-001',
    year: 1902,
    question: '¿Qué tratado naval puso fin formal a la Guerra de los Mil Días a bordo de un barco?',
    options: ['Tratado del acorazado Wisconsin', 'Pacto de Neerlandia', 'Tratado de Versalles', 'Tratado de Bogotá'],
    correctIndex: 0,
    explanation: 'El 21 de noviembre de 1902 se firmó la paz a bordo del acorazado estadounidense USS Wisconsin en la bahía de Panamá.',
    rewardCoins: 50,
    category: 'Historia & Paz'
  },
  {
    id: 't-002',
    year: 1903,
    question: '¿Qué territorio se separó de Colombia en noviembre de 1903?',
    options: ['Ecuador', 'Panamá', 'Venezuela', 'Costa Rica'],
    correctIndex: 1,
    explanation: 'En noviembre de 1903, Panamá proclamó su separación tras el desgaste de la guerra y los acuerdos del canal interoceánico.',
    rewardCoins: 50,
    category: 'Geografía & Regiones'
  },
  {
    id: 't-003',
    year: 1904,
    question: '¿Qué presidente colombiano gobernó durante el periodo conocido como "El Quinquenio"?',
    options: ['Rafael Reyes', 'Marco Fidel Suárez', 'José Manuel Marroquín', 'Carlos E. Restrepo'],
    correctIndex: 0,
    explanation: 'El general Rafael Reyes gobernó entre 1904 y 1909 impulsando la modernización vial, el Banco Central y la reconciliación nacional.',
    rewardCoins: 50,
    category: 'Historia & Paz'
  },
  {
    id: 't-004',
    year: 1905,
    question: '¿Cómo se comunicaban las noticias urgentes en Colombia a principios del siglo XX antes de la radio?',
    options: ['Por palomas mensajeras', 'A través del telégrafo de cable eléctrico', 'Por señales de humo', 'Por teléfonos móviles'],
    correctIndex: 1,
    explanation: 'El telégrafo eléctrico en código Morse conectaba las oficinas postales de las principales capitales colombianas.',
    rewardCoins: 50,
    category: 'Ciencia & Transporte'
  },
  {
    id: 't-005',
    year: 1906,
    question: '¿Qué producto agrícola colombiano comenzó a ser el motor económico del país a inicios del siglo XX?',
    options: ['El trigo', 'El café suave arábico', 'El algodón', 'La uva'],
    correctIndex: 1,
    explanation: 'El café cultivado en pequeñas fincas familiares de las laderas andinas se convirtió en el principal sostén económico del país.',
    rewardCoins: 50,
    category: 'Vida Cotidiana & Escuela'
  },

  // ==================== DÉCADA 1910 - 1919 ====================
  {
    id: 't-006',
    year: 1910,
    question: '¿Qué efeméride patria celebró Colombia en 1910 con monumentos y exposiciones nacionales?',
    options: ['El centenario del grito de Independencia del 20 de Julio de 1810', 'El bicentenario de Cartagena', 'La llegada de Colón', 'La fundación de Medellín'],
    correctIndex: 0,
    explanation: 'En 1910 se festejaron los 100 años del grito de Independencia con el Parque de la Independencia en Bogotá y globos aerostáticos.',
    rewardCoins: 50,
    category: 'Cultura & Deporte'
  },
  {
    id: 't-007',
    year: 1910,
    question: '¿Qué importante reforma política se aprobó en la Reforma Constitucional de 1910 en Colombia?',
    options: ['Voto directo para elegir presidente', 'Voto para niños', 'Eliminación del ejército', 'Poder vitalicio presidencial'],
    correctIndex: 0,
    explanation: 'La reforma de 1910 redujo el periodo presidencial a 4 años e instauró la elección popular directa del Presidente.',
    rewardCoins: 50,
    category: 'Historia & Paz'
  },
  {
    id: 't-008',
    year: 1915,
    question: '¿Cómo funcionaban los primeros tranvías urbanos en Bogotá antes de ser totalmente eléctricos?',
    options: ['Eran impulsados por turbinas de viento', 'Eran tirados por mulas o caballos sobre rieles', 'Usaban cohetes', 'Eran jalados por personas'],
    correctIndex: 1,
    explanation: 'El primer tranvía de Bogotá era de tracción animal ("tranvía de mulas") antes de que se inaugurara la electrificación.',
    rewardCoins: 50,
    category: 'Ciencia & Transporte'
  },
  {
    id: 't-009',
    year: 1919,
    question: '¿Qué histórica aerolínea, la primera de América comercial, fue fundada en Barranquilla en 1919?',
    options: ['SCADTA (hoy Avianca)', 'Pan Am', 'Aerolíneas Argentinas', 'Iberia'],
    correctIndex: 0,
    explanation: 'El 5 de diciembre de 1919 nació en Barranquilla SCADTA, operando hidroaviones Junkers sobre el Río Magdalena.',
    rewardCoins: 50,
    category: 'Ciencia & Transporte'
  },
  {
    id: 't-010',
    year: 1919,
    question: '¿Qué famosa batalla conmemoró su centenario en agosto de 1919, recibiendo tributo en el Puente de Boyacá?',
    options: ['La Batalla de Boyacá de 1819', 'La Batalla de Palonegro', 'El Pantano de Vargas', 'La Batalla de Carabobo'],
    correctIndex: 0,
    explanation: 'En agosto de 1919 el presidente Marco Fidel Suárez lideró la conmemoración del primer siglo de la Batalla de Boyacá.',
    rewardCoins: 50,
    category: 'Cultura & Deporte'
  },

  // ==================== DÉCADA 1920 - 1929 ====================
  {
    id: 't-011',
    year: 1920,
    question: '¿Cuál era el medio de transporte vital para conectar el interior montañoso de Colombia con el mar Caribe en los años 20?',
    options: ['Trenes de alta velocidad', 'Barcos de vapor con rueda de paletas por el Río Magdalena', 'Autopistas de ocho carriles', 'Túneles submarinos'],
    correctIndex: 1,
    explanation: 'Los barcos de vapor que navegaban el Río Magdalena transportaban miles de toneladas de café y pasajeros durante días enteros.',
    rewardCoins: 50,
    category: 'Ciencia & Transporte'
  },
  {
    id: 't-012',
    year: 1922,
    question: '¿Qué líder indígena del Cauca luchó tenazmente por los resguardos y los derechos de los pueblos originarios en los años 20?',
    options: ['Manuel Quintín Lame', 'Policarpa Salavarrieta', 'Antonio Nariño', 'Camilo Torres'],
    correctIndex: 0,
    explanation: 'Manuel Quintín Lame organizó la resistencia pacífica y legal para defender la autonomía y los territorios ancestrales indígenas.',
    rewardCoins: 50,
    category: 'Historia & Paz'
  },
  {
    id: 't-013',
    year: 1923,
    question: '¿Qué entidad bancaria nacional fue creada en 1923 gracias a las recomendaciones de la Misión Kemmerer?',
    options: ['El Banco de la República', 'El Banco Agrario', 'La Casa de la Moneda Colonial', 'El Fondo Monetario'],
    correctIndex: 0,
    explanation: 'La Misión del profesor Edwin Kemmerer modernizó las finanzas colombianas, fundando el Banco de la República y la Contraloría.',
    rewardCoins: 50,
    category: 'Historia & Paz'
  },
  {
    id: 't-014',
    year: 1924,
    question: '¿Qué novela cumbre sobre la selva amazónica y la explotación del caucho fue publicada por José Eustasio Rivera en 1924?',
    options: ['La Vorágine', 'María', 'Cien Años de Soledad', 'El Carnero'],
    correctIndex: 0,
    explanation: '"La Vorágine" denunció las penurias y abusos contra los trabajadores indígenas en las caucheras del Amazonas y los Llanos.',
    rewardCoins: 50,
    category: 'Cultura & Deporte'
  },
  {
    id: 't-015',
    year: 1926,
    question: '¿Cómo se le llamó popularmente al periodo de abundancia económica en Colombia financiado por préstamos y la indemnización de Panamá?',
    options: ['La Danza de los Millones', 'El Milagro Andino', 'La Fiebre del Oro', 'La Gran Bonanza'],
    correctIndex: 0,
    explanation: 'Se llamó "La Danza de los Millones" debido al flujo récord de dinero que financió vías férreas, túneles y edificios de gobierno.',
    rewardCoins: 50,
    category: 'Historia & Paz'
  },
  {
    id: 't-016',
    year: 1928,
    question: '¿En qué municipio del departamento del Magdalena ocurrió la histórica huelga de trabajadores conocida como la Masacre de las Bananeras?',
    options: ['Ciénaga', 'Santa Marta', 'Fundación', 'Aracataca'],
    correctIndex: 0,
    explanation: 'En diciembre de 1928, miles de huelguistas campesinos fueron reprimidos en la plaza de la estación de trenes de Ciénaga.',
    rewardCoins: 50,
    category: 'Historia & Paz'
  },
  {
    id: 't-017',
    year: 1928,
    question: '¿Qué exigían los trabajadores en la huelga bananera de 1928 a la United Fruit Company?',
    options: ['Televisores gratis', 'Jornada de 8 horas, pago en dinero real y asistencia médica', 'Carros último modelo', 'Viajes en avión'],
    correctIndex: 1,
    explanation: 'Pedían contratos laborales directos, descanso dominical, atención en hospitales y fin de los vales de tienda obligatorios.',
    rewardCoins: 50,
    category: 'Historia & Paz'
  },
  {
    id: 't-018',
    year: 1929,
    question: '¿Qué pionera mujer colombiana lideró huelgas obreras textiles en Bello (Antioquia) exigiendo derechos para las trabajadoras?',
    options: ['Betsabé Espinal', 'Débora Arango', 'María Cano', 'Manuela Beltrán'],
    correctIndex: 0,
    explanation: 'Betsabé Espinal, a sus 24 años en 1920, encabezó la primera huelga de mujeres obreras en Colombia con enorme dignidad y valentía.',
    rewardCoins: 50,
    category: 'Historia & Paz'
  },
  {
    id: 't-019',
    year: 1929,
    question: '¿Cómo se llamó a la líder política y escritora conocida como "La Flor del Trabajo" que recorrió Colombia en los años 20?',
    options: ['María Cano', 'Soledad Acosta de Samper', 'Esmeralda Arboleda', 'Policarpa'],
    correctIndex: 0,
    explanation: 'María Cano recorrió minas, campos y fábricas abogando por la justicia social, los derechos de las mujeres y la jornada laboral.',
    rewardCoins: 50,
    category: 'Historia & Paz'
  },
  {
    id: 't-020',
    year: 1929,
    question: '¿En qué año nació la primera emisora de radio en Colombia (HKD, luego HJN) en Bogotá?',
    options: ['1929', '1905', '1960', '1985'],
    correctIndex: 0,
    explanation: 'En 1929 el presidente Miguel Abadía Méndez inauguró la primera estación estatal de radio en Colombia.',
    rewardCoins: 50,
    category: 'Ciencia & Transporte'
  },

  // ==================== DÉCADA 1930 - 1939 ====================
  {
    id: 't-021',
    year: 1930,
    question: '¿Qué presidente liberal asumió el poder en 1930 poniendo fin a casi medio siglo de gobiernos conservadores?',
    options: ['Enrique Olaya Herrera', 'Alfonso López Pumarejo', 'Eduardo Santos', 'Alberto Lleras'],
    correctIndex: 0,
    explanation: 'Enrique Olaya Herrera ganó las elecciones de 1930, iniciando el periodo histórico de la República Liberal.',
    rewardCoins: 50,
    category: 'Historia & Paz'
  },
  {
    id: 't-022',
    year: 1932,
    question: '¿Con qué país vecino se enfrentó Colombia en el conflicto fronterizo del puerto amazónico de Leticia (1932-1933)?',
    options: ['Perú', 'Brasil', 'Ecuador', 'Venezuela'],
    correctIndex: 0,
    explanation: 'El conflicto colombo-peruano se resolvió ratificando la soberanía colombiana sobre el Trapecio Amazónico y Leticia.',
    rewardCoins: 50,
    category: 'Geografía & Regiones'
  },
  {
    id: 't-023',
    year: 1934,
    question: '¿Cómo se denominó el ambicioso programa de reformas sociales y educativas de Alfonso López Pumarejo?',
    options: ['Revolución en Marcha', 'Alianza para el Progreso', 'Frente Nacional', 'Paz Total'],
    correctIndex: 0,
    explanation: 'La "Revolución en Marcha" (1934-1938) reformó la educación universitaria, los impuestos y los derechos de los campesinos.',
    rewardCoins: 50,
    category: 'Historia & Paz'
  },
  {
    id: 't-024',
    year: 1935,
    question: '¿Qué famoso cantante internacional de tango falleció trágicamente en un accidente aéreo en el aeropuerto de Medellín en 1935?',
    options: ['Carlos Gardel', 'Julio Jaramillo', 'Agustín Lara', 'Lucho Bermúdez'],
    correctIndex: 0,
    explanation: 'El 24 de junio de 1935 murió Carlos Gardel en el aeropuerto Olaya Herrera de Medellín, marcando la historia del tango.',
    rewardCoins: 50,
    category: 'Cultura & Deporte'
  },
  {
    id: 't-025',
    year: 1936,
    question: '¿Qué consagró la histórica Ley 200 de 1936 aprobada por el Congreso colombiano?',
    options: ['Que la propiedad de la tierra debe cumplir una función social y favorecer al que la trabaja', 'Que no se puede cultivar café', 'Que los ríos son privados', 'La abolición del peso'],
    correctIndex: 0,
    explanation: 'La Ley 200 de 1936 reconoció derechos a los colonos campesinos que hacían producir tierras baldías abandonadas.',
    rewardCoins: 50,
    category: 'Historia & Paz'
  },
  {
    id: 't-026',
    year: 1936,
    question: '¿Qué campus universitario emblemático comenzó a construirse en Bogotá durante los años 30?',
    options: ['La Ciudad Universitaria de la Universidad Nacional de Colombia', 'La Sorbona', 'Oxford Colombia', 'Universidad de Antioquia'],
    correctIndex: 0,
    explanation: 'La "Ciudad Blanca" de la Universidad Nacional fue concebida como un campus moderno integrado para democratizar la educación.',
    rewardCoins: 50,
    category: 'Vida Cotidiana & Escuela'
  },
  {
    id: 't-027',
    year: 1938,
    question: '¿Cuántos años de fundación cumplió la ciudad de Bogotá en 1938, celebrados con los Juegos Bolivarianos?',
    options: ['400 años (IV Centenario)', '100 años', '200 años', '500 años'],
    correctIndex: 0,
    explanation: 'En agosto de 1938 Bogotá festejó sus 400 años inaugurando el Estadio Nemesio Camacho El Campín y los I Juegos Bolivarianos.',
    rewardCoins: 50,
    category: 'Cultura & Deporte'
  },
  {
    id: 't-028',
    year: 1938,
    question: '¿Qué estadio de fútbol legendario de Bogotá fue construido con motivo de los Juegos Bolivarianos de 1938?',
    options: ['Estadio El Campín', 'Estadio Metropolitano', 'Atanasio Girardot', 'Pascual Guerrero'],
    correctIndex: 0,
    explanation: 'El estadio Nemesio Camacho El Campín fue inaugurado en 1938 en los terrenos donados por don Nemesio Camacho.',
    rewardCoins: 50,
    category: 'Cultura & Deporte'
  },
  {
    id: 't-029',
    year: 1939,
    question: '¿Qué famosa pintora antioqueña desafió las normas de su época con obras de crítica social y figuras humanas en los años 30 y 40?',
    options: ['Débora Arango', 'Beatriz González', 'Doris Salcedo', 'Emma Reyes'],
    correctIndex: 0,
    explanation: 'Débora Arango retrató con maestría y valentía a los obreros, la pobreza, la maternidad y las controversias políticas de Colombia.',
    rewardCoins: 50,
    category: 'Cultura & Deporte'
  },
  {
    id: 't-030',
    year: 1939,
    question: '¿Cómo era la iluminación de muchas casas en veredas y pueblos colombianos en los años 30 antes de la luz eléctrica?',
    options: ['Con velas de sebo y lámparas de queroseno (petróleo)', 'Con lámparas LED', 'Con bombillos solares', 'Con linternas láser'],
    correctIndex: 0,
    explanation: 'Las lámparas "Capuchinas" o de queroseno y velas de cera iluminaban las noches campesinas colombianas.',
    rewardCoins: 50,
    category: 'Vida Cotidiana & Escuela'
  },

  // ==================== DÉCADA 1940 - 1949 ====================
  {
    id: 't-031',
    year: 1940,
    question: '¿Qué radio estatal oficial se inauguró en 1940 para emitir conciertos sinfónicos y contenidos culturales?',
    options: ['Radiodifusora Nacional de Colombia', 'Radio Caracol', 'RCN Radio', 'Todelar'],
    correctIndex: 0,
    explanation: 'La Radiodifusora Nacional de Colombia se fundó para difundir la cultura, la música clásica y el patrimonio sonoro del país.',
    rewardCoins: 50,
    category: 'Cultura & Deporte'
  },
  {
    id: 't-032',
    year: 1945,
    question: '¿Qué famosa canción del maestro Lucho Bermúdez se convirtió en un himno de la alegría y la música tropical colombiana en los 40?',
    options: ['Carmen de Bolívar', 'La Pollera Colorá', 'El Aventurero', 'Cali Pachanguero'],
    correctIndex: 0,
    explanation: '"Carmen de Bolívar", "Salsipuedes" y "Caprichito" de Lucho Bermúdez llevaron los ritmos caribeños a los salones de todo el país.',
    rewardCoins: 50,
    category: 'Cultura & Deporte'
  },
  {
    id: 't-033',
    year: 1946,
    question: '¿Qué organismo de salud infantil y seguridad social se creó en Colombia a mediados de los años 40?',
    options: ['El Instituto Colombiano de Seguros Sociales (ICSS)', 'El Sena', 'El Icbf', 'La Cruz Roja'],
    correctIndex: 0,
    explanation: 'En diciembre de 1946 se creó el Instituto de Seguros Sociales para brindar cobertura de salud y pensión a los trabajadores.',
    rewardCoins: 50,
    category: 'Historia & Paz'
  },
  {
    id: 't-034',
    year: 1947,
    question: '¿En qué departamento nació Radio Sutatenza, la emisora campesina que educó a millones por radio?',
    options: ['Boyacá', 'Antioquia', 'Valle del Cauca', 'Nariño'],
    correctIndex: 0,
    explanation: 'El sacerdote José Joaquín Salcedo fundó Radio Sutatenza en el valle de Tenza (Boyacá), repartiendo radios de pilas y cartillas.',
    rewardCoins: 50,
    category: 'Ciencia & Transporte'
  },
  {
    id: 't-035',
    year: 1948,
    question: '¿Qué acontecimiento trágico ocurrió en Bogotá el viernes 9 de abril de 1948?',
    options: ['El asesinato de Jorge Eliécer Gaitán y el Bogotazo', 'La caída de un meteorito', 'Un terremoto de grado 9', 'La erupción del volcán Galeras'],
    correctIndex: 0,
    explanation: 'El asesinato de Gaitán desató una gigantesca revuelta popular en el centro de Bogotá y en varias regiones del país.',
    rewardCoins: 50,
    category: 'Historia & Paz'
  },
  {
    id: 't-036',
    year: 1948,
    question: '¿Qué famosa organización internacional se fundó en Bogotá en abril de 1948 durante la IX Conferencia Panamericana?',
    options: ['La OEA (Organización de los Estados Americanos)', 'La ONU', 'La Unión Europea', 'La FIFA'],
    correctIndex: 0,
    explanation: 'En el Capitolio Nacional de Bogotá se firmó la Carta que dio nacimiento a la OEA el 30 de abril de 1948.',
    rewardCoins: 50,
    category: 'Historia & Paz'
  },
  {
    id: 't-037',
    year: 1948,
    question: '¿Qué medio de transporte público de Bogotá sufrió graves daños durante el Bogotazo y comenzó a desaparecer?',
    options: ['El tranvía eléctrico', 'El metro subterráneo', 'Los monorrieles', 'Los teleféricos'],
    correctIndex: 0,
    explanation: 'Muchos tranvías fueron volcados e incendiados; con los años fueron reemplazados definitivamente por autobuses de gasolina.',
    rewardCoins: 50,
    category: 'Ciencia & Transporte'
  },
  {
    id: 't-038',
    year: 1948,
    question: '¿Cómo se le llamó a la época de confrontación armada bipartidista que se agudizó tras 1948?',
    options: ['La Violencia', 'La Guerra Fría', 'La Restauración', 'El Renacimiento'],
    correctIndex: 0,
    explanation: 'Se conoce históricamente como "La Violencia" al periodo de fuerte conflicto armado entre partidarios liberales y conservadores.',
    rewardCoins: 50,
    category: 'Historia & Paz'
  },
  {
    id: 't-039',
    year: 1949,
    question: '¿Cómo se llamó la era dorada del fútbol profesional colombiano entre 1949 y 1954 que atrajo estrellas mundiales?',
    options: ['El Dorado del Fútbol', 'La Liga Galáctica', 'La Copa de Oro', 'El Torneo Andino'],
    correctIndex: 0,
    explanation: 'En "El Dorado" jugaron en clubes colombianos leyendas internacionales como Alfredo Di Stéfano, Pedernera y Pipo Rossi.',
    rewardCoins: 50,
    category: 'Cultura & Deporte'
  },
  {
    id: 't-040',
    year: 1949,
    question: '¿Con qué escribían sus tareas los niños en las escuelas colombianas de los años 40?',
    options: ['Plumas metálicas mojadas en tinteros de tinta china', 'Lápices táctiles en tablets', 'Marcadores fluorescentes', 'Máquinas de escribir portátiles'],
    correctIndex: 0,
    explanation: 'Los pupitres de madera tenían un hoyo circular donde se encajaba el tintero de loza para mojar la pluma o canutillero.',
    rewardCoins: 50,
    category: 'Vida Cotidiana & Escuela'
  },

  // ==================== DÉCADA 1950 - 1959 ====================
  {
    id: 't-041',
    year: 1951,
    question: '¿A qué conflicto internacional asiático fue enviado el Batallón Colombia en 1951 como parte de las fuerzas de la ONU?',
    options: ['La Guerra de Corea', 'La Guerra de Vietnam', 'La Guerra del Golfo', 'La Primera Guerra Mundial'],
    correctIndex: 0,
    explanation: 'Colombia fue el único país latinoamericano que envió tropas y fragatas de combate a la Guerra de Corea bajo mandato de la ONU.',
    rewardCoins: 50,
    category: 'Historia & Paz'
  },
  {
    id: 't-042',
    year: 1953,
    question: '¿Qué general asumió el poder en Colombia en junio de 1953 mediante un golpe pacífico que prometió "Paz, Justicia y Libertad"?',
    options: ['Gustavo Rojas Pinilla', 'Gabriel París', 'Mariano Ospina Pérez', 'Laureano Gómez'],
    correctIndex: 0,
    explanation: 'El general Gustavo Rojas Pinilla asumió la presidencia el 13 de junio de 1953 con el apoyo de diversos sectores políticos.',
    rewardCoins: 50,
    category: 'Historia & Paz'
  },
  {
    id: 't-043',
    year: 1954,
    question: '¿En qué fecha exacta se realizó la primera transmisión oficial de televisión en Colombia?',
    options: ['13 de junio de 1954', '20 de julio de 1950', '1 de enero de 1960', '7 de agosto de 1957'],
    correctIndex: 0,
    explanation: 'El 13 de junio de 1954, celebrando un año de gobierno, Rojas Pinilla inauguró la televisión pública en blanco y negro.',
    rewardCoins: 50,
    category: 'Ciencia & Transporte'
  },
  {
    id: 't-044',
    year: 1954,
    question: '¿Desde qué edificio histórico de Bogotá se emitió la primera señal de televisión colombiana?',
    options: ['Los sótanos de la Biblioteca Nacional de Colombia', 'El Palacio de Nariño', 'El cerro de Monserrate', 'La Torre Colpatria'],
    correctIndex: 0,
    explanation: 'Los primeros estudios y equipos alemanes y estadounidenses se instalaron en los sótanos de la Biblioteca Nacional.',
    rewardCoins: 50,
    category: 'Ciencia & Transporte'
  },
  {
    id: 't-045',
    year: 1954,
    question: '¿Cuál fue la primera emisión emitida al aire por la televisión colombiana en 1954?',
    options: ['El Himno Nacional interpretado por la Orquesta Sinfónica', 'Un partido de fútbol', 'Una telenovela extranjera', 'Un dibujo animado'],
    correctIndex: 0,
    explanation: 'La transmisión abrió solemnemente con las notas del Himno Nacional y las palabras oficiales de inauguración.',
    rewardCoins: 50,
    category: 'Cultura & Deporte'
  },
  {
    id: 't-046',
    year: 1954,
    question: '¿Qué gran obra de ingeniería vial urbana se construyó en Bogotá durante el gobierno de Rojas Pinilla conectando el centro con el occidente?',
    options: ['La Avenida El Dorado y la Autopista Norte', 'La Avenida Circunvalar', 'La Vía al Llano', 'El Túnel de La Línea'],
    correctIndex: 0,
    explanation: 'La Avenida El Dorado (Calle 26) fue trazada con amplias calzadas para unir el centro de la ciudad con el nuevo aeropuerto.',
    rewardCoins: 50,
    category: 'Ciencia & Transporte'
  },
  {
    id: 't-047',
    year: 1956,
    question: '¿Qué lamentable tragedia sacudió a la ciudad de Cali el 7 de agosto de 1956?',
    options: ['La explosión de varios camiones del ejército cargados con dinamita militar', 'Un desbordamiento del río Cauca', 'Un incendio forestal', 'Un ciclón tropical'],
    correctIndex: 0,
    explanation: 'La explosión de siete camiones de dinamita en la estación de trenes destruyó varias manzanas del centro de Cali.',
    rewardCoins: 50,
    category: 'Historia & Paz'
  },
  {
    id: 't-048',
    year: 1957,
    question: '¿Qué derecho ciudadano fundamental ejercieron las mujeres colombianas por primera vez el 1 de diciembre de 1957?',
    options: ['Votar en las urnas electorales en el Plebiscito Nacional', 'Poder conducir trenes', 'Tener cuenta de ahorros en el exterior', 'Comprar televisores'],
    correctIndex: 0,
    explanation: 'El 1 de diciembre de 1957 millones de mujeres votaron masivamente en el plebiscito que aprobó el Frente Nacional.',
    rewardCoins: 50,
    category: 'Historia & Paz'
  },
  {
    id: 't-049',
    year: 1957,
    question: '¿Qué institución de formación técnica y laboral para jóvenes y trabajadores fue creada en 1957?',
    options: ['El SENA (Servicio Nacional de Aprendizaje)', 'El Icetex', 'El Icfes', 'Colciencias'],
    correctIndex: 0,
    explanation: 'Rodolfo Martínez Tono fundó el SENA en 1957 para capacitar técnicamente a millones de colombianos en artes y oficios.',
    rewardCoins: 50,
    category: 'Vida Cotidiana & Escuela'
  },
  {
    id: 't-050',
    year: 1958,
    question: '¿Cómo se llamó el pacto político bipartidista de 16 años (1958-1974) en el que liberales y conservadores se alternaron la presidencia?',
    options: ['El Frente Nacional', 'La Gran Coalición', 'El Pacto de Benidorm', 'La Alianza Andina'],
    correctIndex: 0,
    explanation: 'El Frente Nacional alternó cuatro periodos presidenciales para frenar la violencia interpartidista entre rojos y azules.',
    rewardCoins: 50,
    category: 'Historia & Paz'
  },
  {
    id: 't-051',
    year: 1958,
    question: '¿Quién fue el primer presidente de Colombia electo bajo el Frente Nacional en 1958?',
    options: ['Alberto Lleras Camargo', 'Guillermo León Valencia', 'Carlos Lleras Restrepo', 'Misael Pastrana'],
    correctIndex: 0,
    explanation: 'El ilustre diplomático y periodista Alberto Lleras Camargo asumió la primera presidencia del Frente Nacional en 1958.',
    rewardCoins: 50,
    category: 'Historia & Paz'
  },
  {
    id: 't-052',
    year: 1958,
    question: '¿Qué hermosa corona internacional ganó Luz Marina Zuluaga en 1958 para Colombia?',
    options: ['Miss Universo', 'Miss Mundo', 'Reina del Café', 'Miss Internacional'],
    correctIndex: 0,
    explanation: 'Luz Marina Zuluaga, nacida en Pereira y criada en Manizales, fue la primera colombiana en coronarse Miss Universo en Long Beach.',
    rewardCoins: 50,
    category: 'Cultura & Deporte'
  },
  {
    id: 't-053',
    year: 1959,
    question: '¿Qué moderno aeropuerto internacional fue inaugurado en Bogotá en diciembre de 1959 reemplazando al antiguo aeródromo de Techo?',
    options: ['Aeropuerto Internacional El Dorado', 'Aeropuerto Olaya Herrera', 'Aeropuerto Alfonso Bonilla Aragón', 'Aeropuerto de Guaymaral'],
    correctIndex: 0,
    explanation: 'El Dorado se convirtió en una de las terminales aéreas más modernas y amplias de América del Sur en 1959.',
    rewardCoins: 50,
    category: 'Ciencia & Transporte'
  },
  {
    id: 't-054',
    year: 1959,
    question: '¿A qué jugaban principalmente los niños colombianos en los barrios en los años 50 al salir de la escuela?',
    options: ['A las canicas (piquis), el trompo de madera y la golosa', 'A los videojuegos portátiles', 'A la realidad virtual', 'Con drones'],
    correctIndex: 0,
    explanation: 'Los juegos de calle fomentaban la amistad vecinal: trompos bailando en la uña, canicas de cristal y rayuelas pintadas con tiza.',
    rewardCoins: 50,
    category: 'Vida Cotidiana & Escuela'
  },
  {
    id: 't-055',
    year: 1959,
    question: '¿Cómo conservaban la carne y la leche las familias en pueblos que aún no tenían refrigeradores eléctricos?',
    options: ['Salando y secando la carne al sol, y hirviendo la leche fresca a diario', 'En congeladores solares', 'Con hielo químico', 'Con microondas'],
    correctIndex: 0,
    explanation: 'La carne cecina o curada con sal y el consumo diario de leche recién ordeñada eran la costumbre cotidiana campesina.',
    rewardCoins: 50,
    category: 'Vida Cotidiana & Escuela'
  },

  // ==================== DÉCADA 1960 - 1969 ====================
  {
    id: 't-056',
    year: 1961,
    question: '¿Qué presidente de los Estados Unidos visitó Bogotá en diciembre de 1961 para inaugurar el barrio Ciudad Kennedy?',
    options: ['John F. Kennedy', 'Dwight Eisenhower', 'Richard Nixon', 'Lyndon Johnson'],
    correctIndex: 0,
    explanation: 'John F. Kennedy y su esposa Jacqueline visitaron Bogotá en el marco de la "Alianza para el Progreso" e inauguraron Ciudad Techo (hoy Kennedy).',
    rewardCoins: 50,
    category: 'Historia & Paz'
  },
  {
    id: 't-057',
    year: 1961,
    question: '¿Qué entidad del Estado se creó en 1961 mediante la Ley 135 sobre Reforma Social Agraria?',
    options: ['El INCORA (Instituto Colombiano de la Reforma Agraria)', 'El IGAC', 'El Inderena', 'El DANE'],
    correctIndex: 0,
    explanation: 'El INCORA fue fundado durante la presidencia de Alberto Lleras Camargo para titular tierras a familias campesinas.',
    rewardCoins: 50,
    category: 'Historia & Paz'
  },
  {
    id: 't-058',
    year: 1962,
    question: '¿Qué histórico logro deportivo alcanzó la Selección Colombia de fútbol en el Mundial de Chile 1962 contra la Unión Soviética?',
    options: ['Empató 4-4 y Marcos Coll anotó el único gol olímpico en la historia de los mundiales', 'Ganó 10 a cero', 'Fue campeona del mundo', 'Anotó con la mano'],
    correctIndex: 0,
    explanation: 'Marcos Coll le anotó un gol olímpico de tiro de esquina al legendario arquero Lev Yashin ("La Araña Negra").',
    rewardCoins: 50,
    category: 'Cultura & Deporte'
  },
  {
    id: 't-059',
    year: 1964,
    question: '¿Qué guerrilla colombiana de origen campesino tuvo su antecedente fundacional tras la operación militar en Marquetalia en 1964?',
    options: ['Las FARC', 'El M-19', 'El Quintín Lame', 'El EPL'],
    correctIndex: 0,
    explanation: 'Tras el cerco a Marquetalia (Tolima), Manuel Marulanda Vélez y un grupo de campesinos organizaron el Bloque Sur que dio origen a las FARC.',
    rewardCoins: 50,
    category: 'Historia & Paz'
  },
  {
    id: 't-060',
    year: 1964,
    question: '¿En qué departamento colombiano surgió la guerrilla del ELN (Ejército de Liberación Nacional) en 1964 con la toma de Simacota?',
    options: ['Santander', 'Amazonas', 'Chocó', 'San Andrés'],
    correctIndex: 0,
    explanation: 'El ELN realizó su primera acción militar en enero de 1965 en Simacota, Santander, influenciado por la Revolución Cubana.',
    rewardCoins: 50,
    category: 'Historia & Paz'
  },
  {
    id: 't-061',
    year: 1966,
    question: '¿Qué célebre sacerdote y sociólogo colombiano de la Universidad Nacional promovió el movimiento Frente Unido antes de fallecer en combate?',
    options: ['Camilo Torres Restrepo', 'José Joaquín Salcedo', 'Fray Angélico', 'Jaime Garzón'],
    correctIndex: 0,
    explanation: 'Camilo Torres, pionero de la sociología en Colombia, impulsó el compromiso social de la Iglesia con los más necesitados.',
    rewardCoins: 50,
    category: 'Historia & Paz'
  },
  {
    id: 't-062',
    year: 1967,
    question: '¿En qué año se publicó en Buenos Aires la novela "Cien Años de Soledad" de Gabriel García Márquez?',
    options: ['1967', '1950', '1982', '1999'],
    correctIndex: 0,
    explanation: 'En mayo de 1967 la editorial Sudamericana publicó la primera edición de Cien Años de Soledad, agotándose en pocos días.',
    rewardCoins: 50,
    category: 'Cultura & Deporte'
  },
  {
    id: 't-063',
    year: 1968,
    question: '¿Qué Sumo Pontífice se convirtió en agosto de 1968 en el primer Papa en la historia en visitar Colombia y América Latina?',
    options: ['El Papa Pablo VI', 'El Papa Juan Pablo II', 'El Papa Francisco', 'El Papa Pío XII'],
    correctIndex: 0,
    explanation: 'Pablo VI visitó Bogotá para el Congreso Eucarístico Internacional y ordenó una gran misa campal para los campesinos en el Templete del Parque Simón Bolívar.',
    rewardCoins: 50,
    category: 'Cultura & Deporte'
  },
  {
    id: 't-064',
    year: 1968,
    question: '¿Qué entidad para la protección integral de la familia y los niños de Colombia fue creada en 1968?',
    options: ['El ICBF (Instituto Colombiano de Bienestar Familiar)', 'El DNP', 'El Sena', 'La Unicef'],
    correctIndex: 0,
    explanation: 'El ICBF fue fundado en 1968 bajo el liderazgo de la primera dama Cecilia de la Fuente de Lleras para nutrir y proteger a la infancia.',
    rewardCoins: 50,
    category: 'Vida Cotidiana & Escuela'
  },
  {
    id: 't-065',
    year: 1969,
    question: '¿Qué acontecimiento científico mundial vieron los colombianos por televisión en directo en julio de 1969?',
    options: ['El alunizaje del Apolo 11 y la primera caminata humana en la Luna', 'El descubrimiento de Marte', 'La invención del internet', 'El lanzamiento del telescopio Hubble'],
    correctIndex: 0,
    explanation: 'El 20 de julio de 1969 miles de familias colombianas se pegaron a sus televisores para ver a Neil Armstrong pisar la Luna.',
    rewardCoins: 50,
    category: 'Ciencia & Transporte'
  },

  // ==================== DÉCADA 1970 - 1979 ====================
  {
    id: 't-066',
    year: 1970,
    question: '¿Qué movimiento guerrillero urbano tomó su nombre de las controvertidas elecciones presidenciales del 19 de abril de 1970?',
    options: ['El M-19 (Movimiento 19 de Abril)', 'El EPL', 'Las FARC', 'El PRT'],
    correctIndex: 0,
    explanation: 'El M-19 surgió tras las elecciones en las que Misael Pastrana Borrero derrotó al general Gustavo Rojas Pinilla (ANAPO).',
    rewardCoins: 50,
    category: 'Historia & Paz'
  },
  {
    id: 't-067',
    year: 1971,
    question: '¿En qué ciudad colombiana se celebraron los VI Juegos Panamericanos de 1971 con gran modernización deportiva?',
    options: ['Cali', 'Bogotá', 'Medellín', 'Barranquilla'],
    correctIndex: 0,
    explanation: 'Cali se consagró como la "Capital Deportiva de América" construyendo piscinas panamericanas, coliseos y la Unidad Deportiva Panamericana.',
    rewardCoins: 50,
    category: 'Cultura & Deporte'
  },
  {
    id: 't-068',
    year: 1971,
    question: '¿Qué organización indígena histórica fue fundada en Toribío (Cauca) en 1971 para defender la tierra ancestral?',
    options: ['El CRIC (Consejo Regional Indígena del Cauca)', 'La ONIC', 'La OPIAC', 'El Cabildo Mayor'],
    correctIndex: 0,
    explanation: 'El CRIC nació con el lema "Unidad, Tierra, Cultura y Autonomía", liderando la recuperación de tierras comunitarias.',
    rewardCoins: 50,
    category: 'Historia & Paz'
  },
  {
    id: 't-069',
    year: 1972,
    question: '¿Qué boxeador de San Basilio de Palenque se convirtió en 1972 en el primer campeón mundial de boxeo de Colombia?',
    options: ['Antonio Cervantes "Kid Pambelé"', 'Rodrigo Valdés', 'Miguel "Happy" Lora', 'Bernardo Caraballo'],
    correctIndex: 0,
    explanation: 'Pambelé noqueó al panameño Peppermint Frazer en Panamá el 28 de octubre de 1972, alcanzando la gloria del boxeo mundial.',
    rewardCoins: 50,
    category: 'Cultura & Deporte'
  },
  {
    id: 't-070',
    year: 1974,
    question: '¿Qué famosa espada de un héroe patrio fue sustraída por el M-19 de la Quinta de Bolívar en Bogotá en 1974?',
    options: ['La espada del Libertador Simón Bolívar', 'La espada de Santander', 'El sable de Sucre', 'La espada de Nariño'],
    correctIndex: 0,
    explanation: 'El M-19 se dio a conocer sustrayendo la espada de Bolívar, la cual fue devuelta al Estado en 1991 durante la firma de la paz.',
    rewardCoins: 50,
    category: 'Historia & Paz'
  },
  {
    id: 't-071',
    year: 1974,
    question: '¿Qué presidente liberal asumió en 1974 terminando formalmente la alternancia del Frente Nacional?',
    options: ['Alfonso López Michelsen', 'Julio César Turbay Ayala', 'Belisario Betancur', 'Carlos Lleras'],
    correctIndex: 0,
    explanation: 'Alfonso López Michelsen ganó las elecciones con su "Mandato Claro", abriendo una nueva etapa de competencia entre partidos.',
    rewardCoins: 50,
    category: 'Historia & Paz'
  },
  {
    id: 't-072',
    year: 1975,
    question: '¿Cómo se denominó el auge económico de finales de los 70 impulsado por heladas en Brasil que dispararon el precio internacional del café?',
    options: ['La Bonanza Cafetera', 'La Bonanza Petrolera', 'El Milagro de Oro', 'La Ola Esmeraldera'],
    correctIndex: 0,
    explanation: 'Los precios del café alcanzaron niveles récord en las bolsas de Nueva York y Londres, enriqueciendo a los municipios cafeteros.',
    rewardCoins: 50,
    category: 'Vida Cotidiana & Escuela'
  },
  {
    id: 't-073',
    year: 1977,
    question: '¿Qué gran protesta ciudadana y de sindicatos paralizó a Bogotá y otras capitales el 14 de septiembre de 1977?',
    options: ['El Paro Cívico Nacional de 1977', 'La Marcha del Silencio', 'El Grito del Café', 'La Huelga Bananera'],
    correctIndex: 0,
    explanation: 'El Paro Cívico Nacional de 1977 movilizó a miles de trabajadores y familias protestando contra la inflación y por mejores salarios.',
    rewardCoins: 50,
    category: 'Historia & Paz'
  },
  {
    id: 't-074',
    year: 1979,
    question: '¿En qué año se autorizó e inauguró formalmente la televisión a color en Colombia?',
    options: ['En diciembre de 1979', 'En 1954', 'En 1991', 'En 1969'],
    correctIndex: 0,
    explanation: 'El 1 de diciembre de 1979 el presidente Julio César Turbay inauguró oficialmente la señal pública a color bajo la norma NTSC.',
    rewardCoins: 50,
    category: 'Ciencia & Transporte'
  },
  {
    id: 't-075',
    year: 1979,
    question: '¿Qué emblemático rascacielos de Bogotá, con 50 pisos y 196 metros de altura, se terminó de construir en 1979?',
    options: ['La Torre Colpatria', 'El Edificio Bacatá', 'La Torre de Cali', 'El Edificio Coltejer'],
    correctIndex: 0,
    explanation: 'La Torre Colpatria fue el edificio más alto de Colombia durante décadas y un ícono del centro financiero de Bogotá.',
    rewardCoins: 50,
    category: 'Ciencia & Transporte'
  },

  // ==================== DÉCADA 1980 - 1989 ====================
  {
    id: 't-076',
    year: 1980,
    question: '¿Qué embajada en Bogotá fue tomada por un comando del M-19 durante 61 días a inicios de 1980?',
    options: ['La Embajada de la República Dominicana', 'La Embajada de Francia', 'La Embajada de España', 'La Embajada de Estados Unidos'],
    correctIndex: 0,
    explanation: 'La toma de la embajada dominicana con diplomáticos de varios países terminó pacíficamente tras semanas de negociaciones.',
    rewardCoins: 50,
    category: 'Historia & Paz'
  },
  {
    id: 't-077',
    year: 1982,
    question: '¿Qué galardón universal recibió Gabriel García Márquez en Estocolmo en diciembre de 1982?',
    options: ['El Premio Nobel de Literatura', 'El Premio Cervantes', 'El Premio Pulitzer', 'El Premio Príncipe de Asturias'],
    correctIndex: 0,
    explanation: 'La Academia Sueca le otorgó el Nobel por sus novelas e historias cortas en las que lo fantástico y lo real se combinan ricamente.',
    rewardCoins: 50,
    category: 'Cultura & Deporte'
  },
  {
    id: 't-078',
    year: 1982,
    question: '¿Qué traje tradicional caribeño vistió Gabo en la ceremonia de entrega del Nobel en Suecia?',
    options: ['Un liquiliqui blanco de lino', 'Un frac negro con corbatín', 'Una ruana boyacense', 'Un traje militar'],
    correctIndex: 0,
    explanation: 'Gabo honró las raíces de la Costa Caribe colombiana vistiendo un liquiliqui blanco en vez del protocolario frac de gala.',
    rewardCoins: 50,
    category: 'Cultura & Deporte'
  },
  {
    id: 't-079',
    year: 1984,
    question: '¿Qué ministro de Justicia colombiano fue asesinado por el narcotráfico en abril de 1984 por denunciar a los carteles?',
    options: ['Rodrigo Lara Bonilla', 'Luis Carlos Galán', 'Guillermo Cano', 'Carlos Pizarro'],
    correctIndex: 0,
    explanation: 'El asesinato del ministro Lara Bonilla desató la respuesta frontal del Estado contra el Cartel de Medellín y los extraditables.',
    rewardCoins: 50,
    category: 'Historia & Paz'
  },
  {
    id: 't-080',
    year: 1985,
    question: '¿Qué trágicos acontecimientos ocurrieron en Bogotá los días 6 y 7 de noviembre de 1985?',
    options: ['La toma y retoma del Palacio de Justicia', 'La caída de las Torres Gemelas', 'El terremoto de Cúcuta', 'El Bogotazo'],
    correctIndex: 0,
    explanation: 'El comando del M-19 tomó el Palacio de Justicia y la posterior retoma militar dejó decenas de magistrados y civiles fallecidos.',
    rewardCoins: 50,
    category: 'Historia & Paz'
  },
  {
    id: 't-081',
    year: 1985,
    question: '¿Qué municipio del Tolima fue borrado del mapa el 13 de noviembre de 1985 por la erupción del Nevado del Ruiz?',
    options: ['Armero', 'Mariquita', 'Honda', 'Líbano'],
    correctIndex: 0,
    explanation: 'El deshielo del volcán Nevado del Ruiz provocó un lahar de lodo que sepultó a la próspera población de Armero.',
    rewardCoins: 50,
    category: 'Geografía & Regiones'
  },
  {
    id: 't-082',
    year: 1986,
    question: '¿Qué Papa visitó Colombia en 1986 orando por las víctimas en Armero y visitando Tumaco, Popayán y Chiquinquirá?',
    options: ['Juan Pablo II', 'Benedicto XVI', 'Pablo VI', 'Juan XXIII'],
    correctIndex: 0,
    explanation: 'El Papa peregrino Juan Pablo II permaneció una semana en Colombia proclamando mensajes de reconciliación y consuelo.',
    rewardCoins: 50,
    category: 'Cultura & Deporte'
  },
  {
    id: 't-083',
    year: 1987,
    question: '¿Qué ciclista colombiano apodado "El Jardinerito de Fusagasugá" se coronó campeón de la Vuelta a España en 1987?',
    options: ['Luis Alberto "Lucho" Herrera', 'Fabio Parra', 'Martín Emilio "Cochise" Rodríguez', 'Nairo Quintana'],
    correctIndex: 0,
    explanation: 'Lucho Herrera fue el primer latinoamericano en ganar una de las tres grandes vueltas del ciclismo mundial.',
    rewardCoins: 50,
    category: 'Cultura & Deporte'
  },
  {
    id: 't-084',
    year: 1988,
    question: '¿Qué derecho democrático ejercieron por primera vez los colombianos en 1988 a nivel local?',
    options: ['La elección popular de alcaldes municipales', 'La reelección indefinida', 'El voto por internet', 'La elección de ministros'],
    correctIndex: 0,
    explanation: 'Hasta 1988 los gobernadores nombraban a dedo a los alcaldes; desde ese año el pueblo elige libremente a sus mandatarios locales.',
    rewardCoins: 50,
    category: 'Historia & Paz'
  },
  {
    id: 't-085',
    year: 1989,
    question: '¿Qué líder político y candidato presidencial del Nuevo Liberalismo fue asesinado en Soacha en agosto de 1989?',
    options: ['Luis Carlos Galán Sarmiento', 'Bernardo Jaramillo Ossa', 'Carlos Pizarro', 'Álvaro Gómez'],
    correctIndex: 0,
    explanation: 'Luis Carlos Galán defendió la moral pública, la educación y la lucha implacable contra las mafias del narcotráfico.',
    rewardCoins: 50,
    category: 'Historia & Paz'
  },
  {
    id: 't-086',
    year: 1989,
    question: '¿Qué club de fútbol colombiano se coronó por primera vez en la historia como campeón de la Copa Libertadores de América en 1989?',
    options: ['Atlético Nacional', 'América de Cali', 'Millonarios', 'Deportivo Cali'],
    correctIndex: 0,
    explanation: 'Atlético Nacional, dirigido por Francisco Maturana y con René Higuita como figura, venció en penales a Olimpia de Paraguay.',
    rewardCoins: 50,
    category: 'Cultura & Deporte'
  },
  {
    id: 't-087',
    year: 1989,
    question: '¿Qué artefacto explosivo detonó el cartel de Medellín contra un avión comercial en pleno vuelo sobre Soacha en noviembre de 1989?',
    options: ['El atentado contra el vuelo 203 de Avianca', 'El ataque a un helicóptero de carga', 'Un misil antiaéreo', 'Un artefacto en el aeropuerto'],
    correctIndex: 0,
    explanation: 'Fue uno de los atentados terroristas más oscuros de la época del narcotráfico, cobrando la vida de 107 ocupantes inocentes.',
    rewardCoins: 50,
    category: 'Historia & Paz'
  },

  // ==================== DÉCADA 1990 - 1999 ====================
  {
    id: 't-088',
    year: 1990,
    question: '¿Cómo se llamó la iniciativa pacífica de los estudiantes universitarios que impulsó la Asamblea Nacional Constituyente en 1990?',
    options: ['El movimiento de la Séptima Papeleta', 'La Marcha de las Banderas', 'El Manifiesto de Mayo', 'El Pacto Joven'],
    correctIndex: 0,
    explanation: 'Estudiantes de diversas universidades depositaron una séptima papeleta en las elecciones de marzo de 1990 pidiendo una nueva constitución.',
    rewardCoins: 50,
    category: 'Historia & Paz'
  },
  {
    id: 't-089',
    year: 1990,
    question: '¿Qué grupo guerrillero firmó la paz con el gobierno en marzo de 1990, entregando sus armas para hacer política democrática?',
    options: ['El M-19', 'El ELN', 'Las FARC', 'El Cartel de Cali'],
    correctIndex: 0,
    explanation: 'El M-19 se desmovilizó en Santo Domingo (Cauca) bajo el liderazgo de Carlos Pizarro Leongómez y fundó la Alianza Democrática M-19.',
    rewardCoins: 50,
    category: 'Historia & Paz'
  },
  {
    id: 't-090',
    year: 1991,
    question: '¿En qué fecha exacta fue proclamada la nueva Constitución Política de Colombia?',
    options: ['4 de julio de 1991', '20 de julio de 1990', '1 de enero de 1995', '7 de agosto de 1991'],
    correctIndex: 0,
    explanation: 'El 4 de julio de 1991 la Asamblea Nacional Constituyente, presidida por Horacio Serpa, Antonio Navarro y Álvaro Gómez, proclamó la Carta Magna.',
    rewardCoins: 50,
    category: 'Historia & Paz'
  },
  {
    id: 't-091',
    year: 1991,
    question: '¿Qué mecanismo judicial ágil y preferente creó la Constitución de 1991 para que cualquier ciudadano defienda sus derechos fundamentales?',
    options: ['La Acción de Tutela', 'El Recurso de Casación', 'El Juicio de Residencia', 'La Ley Marcial'],
    correctIndex: 0,
    explanation: 'La Acción de Tutela permite a niños y adultos solicitar protección inmediata ante jueces cuando se vulnera su salud, vida o educación.',
    rewardCoins: 50,
    category: 'Historia & Paz'
  },
  {
    id: 't-092',
    year: 1991,
    question: '¿Qué consagra el trascendental Artículo 44 de la Constitución colombiana de 1991?',
    options: ['Que los derechos de los niños prevalecen sobre los derechos de los demás', 'Que los menores de edad no pueden opinar', 'Que sólo se estudia hasta quinto grado', 'Que los colegios son opcionales'],
    correctIndex: 0,
    explanation: 'El Artículo 44 establece que la vida, la integridad, la salud, la educación y el amor de la niñez son la máxima prioridad del Estado y la sociedad.',
    rewardCoins: 50,
    category: 'Vida Cotidiana & Escuela'
  },
  {
    id: 't-093',
    year: 1991,
    question: '¿Cómo define el Artículo 1 de la Constitución a la nación colombiana respecto a su cultura y etnias?',
    options: ['Como un Estado social de derecho, participativo y pluriétnico y multicultural', 'Como un imperio monolingüe', 'Como un territorio sin diferencias', 'Como una confederación europea'],
    correctIndex: 0,
    explanation: 'Reconoció formalmente por primera vez los derechos ancestrales de pueblos indígenas, afrocolombianos, raizales y palenqueros.',
    rewardCoins: 50,
    category: 'Historia & Paz'
  },
  {
    id: 't-094',
    year: 1992,
    question: '¿Cómo se le conoció popularmente a la medida de adelantar una hora los relojes en 1992 para mitigar el racionamiento de energía eléctrica?',
    options: ['La Hora Gaviria', 'El Minuto de Oro', 'La Hora Solar', 'El Tiempo Rápido'],
    correctIndex: 0,
    explanation: 'Debido a la sequía del fenómeno de El Niño que secó los embalses hidroeléctricos, el gobierno del presidente César Gaviria adelantó los relojes.',
    rewardCoins: 50,
    category: 'Ciencia & Transporte'
  },
  {
    id: 't-095',
    year: 1993,
    question: '¿Qué histórico e inolvidable resultado consiguió la Selección Colombia de fútbol en el estadio Monumental de Buenos Aires en septiembre de 1993?',
    options: ['Ganó 5-0 contra Argentina en las eliminatorias al Mundial de 1994', 'Empató 0-0', 'Perdió 2-1', 'Ganó 1-0 en el último minuto'],
    correctIndex: 0,
    explanation: 'Con goles de Freddy Rincón (2), Faustino Asprilla (2) y Adolfo "El Tren" Valencia, Colombia clasificó directamente al Mundial de EE.UU. 1994.',
    rewardCoins: 50,
    category: 'Cultura & Deporte'
  },
  {
    id: 't-096',
    year: 1995,
    question: '¿En qué ciudad colombiana se inauguró el primer sistema de tren metropolitano (Metro) en 1995?',
    options: ['Medellín', 'Bogotá', 'Barranquilla', 'Bucaramanga'],
    correctIndex: 0,
    explanation: 'El Metro de Medellín inició operaciones comerciales en noviembre de 1995, convirtiéndose en orgullo cívico y modelo de movilidad limpia.',
    rewardCoins: 50,
    category: 'Ciencia & Transporte'
  },
  {
    id: 't-097',
    year: 1996,
    question: '¿Qué gran votación escolar infantil organizada por UNICEF movilizó a más de 2.7 millones de niños en octubre de 1996?',
    options: ['El Mandato de los Niños por la Paz y los Derechos Humanos', 'El Concurso del Mejor Dibujo', 'La Elección del Personero', 'La Olimpiada de Matemáticas'],
    correctIndex: 0,
    explanation: 'Los niños depositaron votos en urnas escolares pidiendo el fin del secuestro, el respeto a la vida y el derecho a jugar sin miedo.',
    rewardCoins: 50,
    category: 'Historia & Paz'
  },
  {
    id: 't-098',
    year: 1997,
    question: '¿Qué cantante de Barranquilla saltó a la fama internacional a mediados de los 90 con sus discos "Pies Descalzos" y "¿Dónde Están los Ladrones?"?',
    options: ['Shakira', 'Fanny Lu', 'Marbelle', 'Totó la Momposina'],
    correctIndex: 0,
    explanation: 'Shakira Mebarak conquistó América Latina y el mundo con sus letras poéticas, fusiones pop-rock y ritmos tradicionales árabes y costeños.',
    rewardCoins: 50,
    category: 'Cultura & Deporte'
  },
  {
    id: 't-099',
    year: 1999,
    question: '¿Qué lamentable catástrofe natural afectó a las ciudades de Armenia, Pereira y pueblos vecinos en enero de 1999?',
    options: ['El terremoto del Eje Cafetero', 'Un huracán categoría 5', 'Una avalancha marina', 'La erupción del volcán Puracé'],
    correctIndex: 0,
    explanation: 'El terremoto del 25 de enero de 1999 causó graves daños, pero dio pie a una ejemplar reconstrucción solidaria del Eje Cafetero.',
    rewardCoins: 50,
    category: 'Geografía & Regiones'
  },
  {
    id: 't-100',
    year: 1999,
    question: '¿Qué recordado humorista, periodista y mediador de paz colombiano fue asesinado en Bogotá en agosto de 1999?',
    options: ['Jaime Garzón', 'Humberto Martínez Salcedo', 'Montecristo', 'El Loco Quintero'],
    correctIndex: 0,
    explanation: 'Jaime Garzón utilizó el humor político inteligente a través de personajes como Heriberto de la Calle para promover la paz y la conciencia ciudadana.',
    rewardCoins: 50,
    category: 'Historia & Paz'
  }
];
