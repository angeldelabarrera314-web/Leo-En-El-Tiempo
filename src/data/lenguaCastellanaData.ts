export interface ColombianAuthor {
  id: string;
  name: string;
  period: string;
  birthDeath: string;
  birthYear: number;
  deathYear: number | null;
  portraitBadge: string;
  pedagogicalKey: string;
  region: string;
  keyWork: string;
  genre: string;
  movement: string;
  icon: string;
  synopsis: string;
  summary: string;
  famousQuote: string;
  quoteWork: string;
  historicalConnection: string;
  funFact: string;
}

export interface ColombianismItem {
  id: string;
  expression: string;
  region: string;
  meaning: string;
  exampleSentence: string;
  historicalContext: string;
  category: 'cotidiano' | 'amistad' | 'celebracion' | 'asombro';
}

export interface LenguaChallengeQuestion {
  id: string;
  type: 'figura_literaria' | 'comprension' | 'ortografia' | 'colombianismo';
  prompt: string;
  passageSnippet?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  authorReference?: string;
  xpReward: number;
  coinReward: number;
}

export const COLOMBIAN_AUTHORS: ColombianAuthor[] = [
  {
    id: 'gabo',
    name: 'Gabriel García Márquez (Gabo)',
    period: 'Años 60 - 80',
    birthDeath: '1927 - 2014',
    birthYear: 1927,
    deathYear: 2014,
    portraitBadge: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=400&q=80',
    pedagogicalKey: 'Premio Nobel 1982 e inventor de Macondo y el Realismo Mágico.',
    region: 'Aracataca (Magdalena) / Caribe',
    keyWork: 'Cien Años de Soledad (1967)',
    genre: 'Novela y Periodismo',
    movement: 'Realismo Mágico / Boom Latinoamericano',
    icon: '🦋',
    synopsis:
      'La novela cumbre del realismo mágico sigue la saga de siete generaciones de la familia Buendía en el pueblo mítico y caribeño de Macondo, fundado por José Arcadio Buendía y Úrsula Iguarán. A través de la llegada de inventos gitanos (el imán, el telescopio y el hielo), guerras civiles interminables encabezadas por el coronel Aureliano Buendía, el auge y la trágica huelga bananera de 1928, y diluvios que duran cuatro años, la obra retrata la soledad, el destino, los mitos orales y la memoria histórica de Colombia y América Latina.',
    summary:
      'Máximo exponente de la literatura colombiana y Premio Nobel de Literatura en 1982. En Macondo inmortalizó la memoria colectiva, los mitos familiares, las huelgas bananeras y la exuberancia mágica de la cultura caribeña y colombiana.',
    famousQuote:
      'Muchos años después, frente al pelotón de fusilamiento, el coronel Aureliano Buendía había de recordar aquella tarde remota en que su padre lo llevó a conocer el hielo.',
    quoteWork: 'Cien Años de Soledad',
    historicalConnection:
      'Narró episodios trascendentales del siglo XX colombiano, como la Huelga de las Bananeras de 1928 y las guerras civiles que marcaron la historia republicana.',
    funFact:
      'Recibió el Premio Nobel en Estocolmo vestido con un liquiliqui blanco tradicional de los llanos y el Caribe, rindiendo homenaje a las raíces populares de Colombia.',
  },
  {
    id: 'rivera',
    name: 'José Eustasio Rivera',
    period: 'Años 20',
    birthDeath: '1888 - 1928',
    birthYear: 1888,
    deathYear: 1928,
    portraitBadge: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    pedagogicalKey: 'Denunció el genocidio y la explotación laboral de las caucheras amazónicas.',
    region: 'Neiva (Huila) / Amazonía y Orinoquía',
    keyWork: 'La Vorágine (1924)',
    genre: 'Novela Social y de la Selva',
    movement: 'Modernismo y Realismo Crítico',
    icon: '🌿',
    synopsis:
      'Narra la odisea del poeta Arturo Cova y Alicia, quienes escapan de las convenciones sociales de Bogotá hacia los inmensos llanos del Casanare y posteriormente se adentran en la profundidad de la selva amazónica. Allí se enfrentan a la violencia despiadada de las casas caucheras extranjeras, donde miles de indígenas y trabajadores son sometidos a regímenes de esclavitud y deudas forzadas. La selva deja de ser un simple paisaje para convertirse en una fuerza titánica y devoradora, en un desgarrador testimonio de denuncia social.',
    summary:
      'Poeta y abogado que recorrió las fronteras selváticas de Colombia como inspector de límites. Su obra cumbre "La Vorágine" denunció con valentía la explotación inhumana de los caucheros indígenas y colonos en la selva amazónica.',
    famousQuote:
      '¡Jugué mi corazón al azar y me lo ganó la violencia! Nada supe de los delirios del amor ordinario.',
    quoteWork: 'La Vorágine (Frase inicial)',
    historicalConnection:
      'Publicada en 1924, "La Vorágine" es considerada el grito de denuncia que reveló al país las injusticias laborales y el aislamiento de las fronteras durante la bonanza del caucho.',
    funFact:
      'Escribió la novela tras enfermarse en expediciones por el río Vaupés y la selva amazónica, basándose en testimonios reales de caucheros explotados.',
  },
  {
    id: 'carrasquilla',
    name: 'Tomás Carrasquilla',
    period: 'Años 1900 - 1930',
    birthDeath: '1858 - 1940',
    birthYear: 1858,
    deathYear: 1940,
    portraitBadge: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
    pedagogicalKey: 'Pionero de la oralidad y las tradiciones populares antioqueñas.',
    region: 'Santo Domingo (Antioquia) / Región Andina',
    keyWork: 'La Marquesa de Yolombó (1928)',
    genre: 'Novela Costumbrista y Cuentos',
    movement: 'Costumbrismo y Realismo Psicológico',
    icon: '⛰️',
    synopsis:
      'Ambientada en el pueblo minero de Yolombó durante la transición hacia la República, la obra recrea la vida de doña Bárbara Caballero y Alzate, una mujer de gran temple que rompe los moldes de su época aprendiendo a leer, administrando minas de oro y protegiendo a su comunidad. Con un prodigioso oído para la tradición oral, la novela describe las fiestas populares, los ritos religiosos, la vida de los esclavizados y campesinos, y la riqueza idiomática de las montañas antioqueñas.',
    summary:
      'Maestro incomparable de la oralidad y el habla popular antioqueña. Con personajes como Peralta en "En la diestra de Dios Padre", retrató con agudo humor e ingenio la vida minera, campesina y colonial de la cordillera.',
    famousQuote:
      'Aquí no hay más ley que la que trajo Dios y la que manda el rey... pero sobre todo, la que dicte la bondad del corazón.',
    quoteWork: 'La Marquesa de Yolombó',
    historicalConnection:
      'Sus escritos documentaron la transformación de los pueblos mineros y cafeteros durante los albores de la industrialización y los ferrocarriles a comienzos del siglo XX.',
    funFact:
      'Escribía descalzo en una humilde mecedora de mimbre en Medellín y afirmaba que prefería escuchar el habla de una lavandera que los discursos de los académicos estirados.',
  },
  {
    id: 'gonzalo-arango',
    name: 'Gonzalo Arango y el Nadaísmo',
    period: 'Años 50 - 60',
    birthDeath: '1931 - 1976',
    birthYear: 1931,
    deathYear: 1976,
    portraitBadge: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
    pedagogicalKey: 'Líder del Nadaísmo: vanguardia poética rebelde de los años 50 en Medellín.',
    region: 'Andes (Antioquia) / Medellín y Cali',
    keyWork: 'Manifiesto Nadaísta (1958)',
    genre: 'Poesía de Vanguardia y Manifiestos',
    movement: 'El Nadaísmo',
    icon: '⚡',
    synopsis:
      'Proclama poética e ideológica que dio nacimiento al movimiento de vanguardia más radical de Colombia. En medio de la asfixia social de la Violencia política y los pactos cerrados del Frente Nacional, Gonzalo Arango y un grupo de jóvenes desafiaron la solemnidad académica mediante el humor negro, la irreverencia, la reivindicación de la calle y la búsqueda de una verdad artística genuina lejos de la hipocresía social.',
    summary:
      'Fundador del movimiento literario más irreverente y contestatario de Colombia. Junto a Jaime Jaramillo Escobar (X-504) y Jotamario Arbeláez, rompió con la solemnidad poética tradicional con versos urbanos, jóvenes y rebeldes.',
    famousQuote:
      'No dejar una fe intacta ni un ídolo en su sitio. Todo lo que esté consagrado como verdad oficial merece ser sospechoso.',
    quoteWork: 'Primer Manifiesto Nadaísta',
    historicalConnection:
      'Nació en 1958 al finalizar la dictadura de Gustavo Rojas Pinilla e inicio del Frente Nacional, expresando el descontento de la juventud frente a la violencia política bipartidista.',
    funFact:
      'Se reunían en el Parque de Bolívar de Medellín y en cafés bohemios. En una famosa protesta simbólica quemaron libros en la plazuela de San Ignacio proclamando el nacimiento de una poesía libre.',
  },
  {
    id: 'marvel-moreno',
    name: 'Marvel Moreno',
    period: 'Años 70 - 80',
    birthDeath: '1939 - 1995',
    birthYear: 1939,
    deathYear: 1995,
    portraitBadge: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    pedagogicalKey: 'Voz cumbre de la emancipación femenina y la narrativa caribeña barranquillera.',
    region: 'Barranquilla (Atlántico) / París',
    keyWork: 'En diciembre llegaban las brisas (1987)',
    genre: 'Novela Psicológica y Cuento',
    movement: 'Narrativa Femenina Contemporánea',
    icon: '🌺',
    synopsis:
      'Con el rumor de los vientos alisios que bajan sobre Barranquilla a finales de año como música de fondo, la novela explora las vivencias de tres mujeres: Dora, Catalina y Beatriz, a través de la memoria retrospectiva de su amiga Lina. Desnuda con agudeza las ataduras del patriarcado caribeño, la hipocresía de los salones de alta sociedad y la tenaz lucha de las mujeres por adueñarse de su propio destino y sexualidad.',
    summary:
      'Una de las voces más lúcidas e hipnóticas de la literatura colombiana. En su prosa describe las brisas de diciembre en Barranquilla, desentrañando con maestría el universo femenino y las contradicciones de la sociedad caribeña.',
    famousQuote:
      'A finales de noviembre, cuando empezaban a soplar los vientos alisios, la ciudad parecía despertar de un largo letargo con olor a salitre y jazmines.',
    quoteWork: 'En diciembre llegaban las brisas',
    historicalConnection:
      'Representa la eclosión de la literatura escrita por mujeres en Colombia durante la segunda mitad del siglo XX, reivindicando la libertad creadora y la mirada íntima.',
    funFact:
      'Fue coronada reina del Carnaval de Barranquilla en su juventud antes de dedicarse por entero a la escritura y mudarse a París.',
  },
  {
    id: 'alvaro-mutis',
    name: 'Álvaro Mutis',
    period: 'Años 70 - 90',
    birthDeath: '1923 - 2013',
    birthYear: 1923,
    deathYear: 2013,
    portraitBadge: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    pedagogicalKey: 'Creador de Maqroll el Gaviero y maestro de la poesía metafísica y la novela lírica.',
    region: 'Bogotá / Coello (Tolima)',
    keyWork: 'Empresas y Tribulaciones de Maqroll el Gaviero (1986)',
    genre: 'Poesía y Novela de Aventuras',
    movement: 'Poesía Metafísica y Novela Lírica',
    icon: '⛵',
    synopsis:
      'Saga de relatos y novelas que siguen a Maqroll, un marinero apátrida y filósofo de la derrota que surca mares remotos, puertos decadentes y ríos tropicales de la cuenca colombiana. A través de empresas comerciales condenadas al fracaso, amores fugaces y conversaciones íntimas, Maqroll encarna la dignidad frente a la fatalidad, la lealtad incondicional entre amigos y la contemplación poética del mundo.',
    summary:
      'Gran amigo de Gabriel García Márquez y creador del mítico personaje Maqroll el Gaviero, un marinero errante que viaja por ríos calientes, puertos olvidados y cordilleras cafeteras reflexionando sobre el destino humano.',
    famousQuote:
      'No hay puerto seguro sino aquel que inventamos en la memoria tras haber navegado todas las tormentas.',
    quoteWork: 'La Nieve del Almirante',
    historicalConnection:
      'Galardonado con el Premio Cervantes (2001) y el Premio Príncipe de Asturias. Evocó en su obra la nostalgia de las fincas cafeteras del Tolima en las décadas de 1930 y 1940.',
    funFact:
      'Pasó varios meses recluido en la cárcel de Lecumberri en México, experiencia de la que nació su memorable libro "Diario de Lecumberri".',
  },
  {
    id: 'eduardo-carranza',
    name: 'Eduardo Carranza (Los Piedracielistas)',
    period: 'Años 30 - 40',
    birthDeath: '1913 - 1985',
    birthYear: 1913,
    deathYear: 1985,
    portraitBadge: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
    pedagogicalKey: 'Renovador lírico del grupo Piedra y Cielo durante la República Liberal.',
    region: 'Apiay (Meta) / Villavicencio y Bogotá',
    keyWork: 'Canciones para Iniciar una Fiesta (1936)',
    genre: 'Poesía Lírica',
    movement: 'Piedracielismo',
    icon: '🌤️',
    synopsis:
      'Colección de sonetos y poemas líricos que inauguró el movimiento Piedra y Cielo, iluminando las letras colombianas tras la pesadez del centenarismo. Sus versos celebran la belleza de la juventud, el fulgor del paisaje de la sabana bogotana y los llanos orientales, y el asombro del amor primero con un ritmo sonoro, etéreo y deslumbrante que devolvió la frescura al idioma castellano.',
    summary:
      'Líder del grupo de poetas "Piedra y Cielo", llamado así por un libro de Juan Ramón Jiménez. Llenó la poesía colombiana de cielos luminosos, lluvia bogotana, horizontes llaneros y un lenguaje musical lleno de frescura y color.',
    famousQuote:
      'Todo está bien: el verde en la pradera, el aire con su música de seda, y en la tarde que muere suavemente, una campana que a la paz nos llama.',
    quoteWork: 'Soneto con una campana',
    historicalConnection:
      'Su poesía transformó el panorama cultural durante la República Liberal en los años 30, fundando los célebres cuadernos literarios de Piedra y Cielo.',
    funFact:
      'Fue director de la Biblioteca Nacional de Colombia e influyó en la educación estética de generaciones enteras de estudiantes colombianos.',
  },
  {
    id: 'barba-jacob',
    name: 'Porfirio Barba Jacob',
    period: 'Años 1910 - 1930',
    birthDeath: '1883 - 1942',
    birthYear: 1883,
    deathYear: 1942,
    portraitBadge: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=400&q=80',
    pedagogicalKey: 'Maestro de la musicalidad lírica y el modernismo errante en Hispanoamérica.',
    region: 'Santa Rosa de Osos (Antioquia)',
    keyWork: 'Canción de la Vida Profunda (1937)',
    genre: 'Poesía Lírica y Musical',
    movement: 'Modernismo Tardío / Simbolismo',
    icon: '🎻',
    synopsis:
      'Poema fundamental de la lírica hispanoamericana que examina la condición mudable del ser humano. En estrofas de altísima musicalidad, el poeta confiesa cómo el alma oscila permanentemente entre el júbilo radiante y la desolación sombría, cantando al dolor de la transitoriedad y a la búsqueda incesante de un anhelo espiritual inalcanzable.',
    summary:
      'Poeta viajero, errante y apasionado cuyo nombre real era Miguel Ángel Osorio. Escribió versos con una musicalidad deslumbrante que los colombianos del siglo XX declamaban de memoria en escuelas y tertulias.',
    famousQuote:
      'El hombre es un animal melancólico que canta en la niebla y busca en el horizonte la chispa de su propio sueño.',
    quoteWork: 'Canción de la Vida Profunda',
    historicalConnection:
      'Vivió de primera mano las migraciones de periodistas e intelectuales latinoamericanos a inicios del siglo XX, fundando periódicos en varios países del continente.',
    funFact:
      'Utilizó más de diez seudónimos diferentes a lo largo de su vida bohemia, siendo "Porfirio Barba Jacob" el que lo inmortalizó en las letras hispanas.',
  },
  {
    id: 'albalucia-angel',
    name: 'Albalucía Ángel',
    period: 'Años 70',
    birthDeath: '1939 - Presente',
    birthYear: 1939,
    deathYear: null,
    portraitBadge: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    pedagogicalKey: 'Pionera en narrar La Violencia y el Bogotazo desde los ojos de la infancia.',
    region: 'Pereira (Risaralda) / Eje Cafetero',
    keyWork: 'Estaba la pájara pinta sentada en el verde limón (1975)',
    genre: 'Novela Histórica y de la Memoria',
    movement: 'Narrativa Experimental y Memoria de la Violencia',
    icon: '🕊️',
    synopsis:
      'A través de la mirada fragmentada y sensible de Ana, una niña que transita su infancia y juventud en el Eje Cafetero, la novela reconstruye los ecos cotidianos del asesinato de Jorge Eliécer Gaitán en 1948 y la sangrienta época de La Violencia bipartidista. Intercalando rondas infantiles tradicionales con testimonios de persecución, la obra constituye una de las cumbres narrativas sobre cómo los niños y las mujeres vivieron el conflicto armado en Colombia.',
    summary:
      'Pionera fundamental de la novela sobre el conflicto y la violencia política desde la óptica de la niñez y las mujeres en Colombia.',
    famousQuote:
      'En las tardes de lluvia jugábamos a la pájara pinta mientras los mayores hablaban en susurros del Bogotazo y de los pueblos que ardían en la cordillera.',
    quoteWork: 'Estaba la pájara pinta sentada en el verde limón',
    historicalConnection:
      'Conecta directamente con los acontecimientos del 9 de abril de 1948 y la memoria viva del conflicto social en el siglo XX.',
    funFact:
      'Vivió en Europa durante el auge del Boom y fue amiga cercana de Gabriel García Márquez y Julio Cortázar, abriendo caminos para las escritoras colombianas.',
  },
];

export const COLOMBIANISMS_DICTIONARY: ColombianismItem[] = [
  {
    id: 'chicanear',
    expression: 'Chicanear',
    region: 'Nacional (Andina, Caribe, Pacífica)',
    meaning: 'Alardear, presumir o lucir algo con orgullo ante los demás.',
    exampleSentence: 'Mateo llegó a la escuela chicaneando su nuevo trompo de madera traído de Medellín.',
    historicalContext: 'Popularizado en los años 30 cuando las familias de las ciudades empezaban a adquirir radios y relojes de pulso.',
    category: 'cotidiano',
  },
  {
    id: 'hacer-una-vaca',
    expression: 'Hacer una vaca',
    region: 'Nacional',
    meaning: 'Reunir dinero entre varios amigos para comprar algo en común o pagar un gasto compartido.',
    exampleSentence: 'Hagamos una vaca entre los del barrio para comprar una pelota de caucho y jugar en la calle.',
    historicalContext: 'Proviene de la solidaridad campesina en los mercados ganaderos del siglo XX para ayudar a un vecino.',
    category: 'amistad',
  },
  {
    id: 'achicopalarse',
    expression: 'Achicopalarse',
    region: 'Cundiboyacense y Andina',
    meaning: 'Sentirse triste, desanimado o decaído ante una dificultad.',
    exampleSentence: '¡No te me vayas a achicopalar por una nota bajita, con Leo repasaremos para el examen!',
    historicalContext: 'Voz de raíz indígena adaptada al habla popular urbana de Bogotá y los Santanderes en los años 40.',
    category: 'cotidiano',
  },
  {
    id: 'dar-papaya',
    expression: 'Dar papaya',
    region: 'Nacional',
    meaning: 'Exponerse innecesariamente al descuido o dar la oportunidad de que algo malo suceda.',
    exampleSentence: 'Guarda bien tu reloj de bolsillo en la plaza de mercado, ¡recuerda que en el tranvía no se da papaya!',
    historicalContext: 'Regla callejera tradicional colombiana que enseña la prudencia y el autocuidado en las grandes ciudades.',
    category: 'cotidiano',
  },
  {
    id: 'coroto',
    expression: 'Los corotos',
    region: 'Nacional (originada en el siglo XIX-XX)',
    meaning: 'Objetos personales, muebles, enseres o trastos de la casa.',
    exampleSentence: 'Empaquemos los corotos en el baúl que el camión de la mudanza sale al amanecer hacia Cali.',
    historicalContext: 'Nació de la anécdota del general Corot y sus cuadros, arraigándose como sinónimo de todo trasteo colombiano.',
    category: 'cotidiano',
  },
  {
    id: 'estar-en-la-juega',
    expression: 'Estar en la juega',
    region: 'Nacional',
    meaning: 'Estar atento, alerta y concentrado en lo que está ocurriendo.',
    exampleSentence: 'En el examen de Ciencias Sociales hay que estar en la juega con las fechas del siglo XX.',
    historicalContext: 'Originada en los partidos callejeros de fútbol y tejo de los años 50 en los barrios obreros.',
    category: 'cotidiano',
  },
  {
    id: 'chiripazo',
    expression: 'Un chiripazo',
    region: 'Andina y Caribe',
    meaning: 'Un golpe de suerte repentino o un acierto inesperado por casualidad.',
    exampleSentence: 'Anotar ese gol desde mitad de la cancha fue un auténtico chiripazo de domingo.',
    historicalContext: 'Expresión usada ampliamente en las transmisiones deportivas radiales de los años 60 y 70.',
    category: 'asombro',
  },
  {
    id: 'pisco',
    expression: 'El pisco / La pisca',
    region: 'Boyacá, Santander y Cundinamarca',
    meaning: 'Palabra afectuosa o coloquial para referirse a una persona, muchacho o individuo.',
    exampleSentence: 'Ese pisco que maneja el tractor en la sabana sabe historias increíbles de trenes antiguos.',
    historicalContext: 'Tradición oral andina que refleja la familiaridad y el trato cálido entre vecinos campesinos.',
    category: 'amistad',
  },
  {
    id: 'morrocotudo',
    expression: 'Morrocotudo',
    region: 'Nacional (mediados del siglo XX)',
    meaning: 'Algo grandioso, formidable, enorme o digno de gran admiración.',
    exampleSentence: 'La llegada del primer vuelo comercial de SCADTA fue un acontecimiento morrocotudo para el país.',
    historicalContext: 'Hacía referencia a los antiguos doblones o morrocotas de oro que tenían un peso e impacto colosal.',
    category: 'asombro',
  },
  {
    id: 'hacer-cuarto',
    expression: 'Hacer el cuarto',
    region: 'Nacional',
    meaning: 'Hacerle un favor o alcahuetería a un amigo para ayudarle en un plan.',
    exampleSentence: 'Hazme el cuarto con el profesor para decirle que ya casi termino el dibujo del mapa de 1903.',
    historicalContext: 'Usada por los estudiantes de colegios y universidades colombianas desde los años 60.',
    category: 'amistad',
  },
];

export const LENGUA_CHALLENGE_BANK: LenguaChallengeQuestion[] = [
  {
    id: 'lq-1',
    type: 'figura_literaria',
    prompt: '¿Qué figura literaria se destaca en la famosa frase de Gabo: "El coronel Aureliano Buendía promovió treinta y dos levantamientos armados y los perdió todos"?',
    options: [
      'Una hipérbole que enfatiza la persistencia trágica y colosal del personaje',
      'Una onomatopeya que imita el sonido de los cañonazos',
      'Un pleonasmo que repite palabras innecesarias',
      'Un calambur que juega con las sílabas'
    ],
    correctIndex: 0,
    explanation: 'Gabriel García Márquez emplea magistralmente la hipérbole (exageración literaria) para dotar de proporciones épicas y míticas las guerras de Aureliano Buendía en Macondo.',
    authorReference: 'Gabriel García Márquez - Cien Años de Soledad',
    xpReward: 40,
    coinReward: 25,
  },
  {
    id: 'lq-2',
    type: 'figura_literaria',
    prompt: 'En "La Vorágine", Rivera escribe: "La selva se tragó a los hombres y calló para siempre". ¿Qué figura literaria predomina?',
    options: [
      'Personificación o Prosopopeya (atribuir acciones humanas a la selva)',
      'Símil o comparación con el conector "como"',
      'Antítesis de colores primarios',
      'Aliteración exclusiva de vocales'
    ],
    correctIndex: 0,
    explanation: 'La selva es personificada como una entidad devoradora y viva que engulle a los caucheros y guarda silencio, convirtiéndose en el gran personaje de la novela.',
    authorReference: 'José Eustasio Rivera - La Vorágine',
    xpReward: 45,
    coinReward: 30,
  },
  {
    id: 'lq-3',
    type: 'comprension',
    prompt: '¿Cuál fue el principal aporte social y ético de la novela "La Vorágine" (1924) para la historia colombiana?',
    options: [
      'Denunciar ante el país y el mundo la inhumana explotación y esclavitud en las caucheras del Amazonas',
      'Enseñar recetas tradicionales de cocina llanera',
      'Promover la construcción de autopistas de cemento en el siglo XIX',
      'Diseñar el primer escudo oficial de la República'
    ],
    correctIndex: 0,
    explanation: 'José Eustasio Rivera utilizó la literatura como un vehículo de investigación y denuncia social que alertó a la sociedad colombiana sobre los abusos cometidos por casas caucheras en territorios aislados.',
    authorReference: 'José Eustasio Rivera',
    xpReward: 50,
    coinReward: 35,
  },
  {
    id: 'lq-4',
    type: 'figura_literaria',
    prompt: 'Eduardo Carranza escribe: "Tu mirada es como una laguna de aguas transparentes en el páramo". ¿Qué figura es?',
    options: [
      'Símil o comparación explícita (usa el nexo comparativo "como")',
      'Metáfora pura sin nexo',
      'Hipérbaton por inversión de verbos',
      'Oxímoron'
    ],
    correctIndex: 0,
    explanation: 'El símil establece una comparación explícita y directa entre dos elementos valiéndose del nexo comparativo "como".',
    authorReference: 'Eduardo Carranza - Piedra y Cielo',
    xpReward: 35,
    coinReward: 20,
  },
  {
    id: 'lq-5',
    type: 'colombianismo',
    prompt: 'Cuando un colombiano de los años 50 decía "Hagamos una vaca para el piquete del domingo", ¿a qué se refería?',
    options: [
      'A cooperar con dinero entre todos para comprar la comida del paseo',
      'A comprar una vaca lechera en la plaza de mercado',
      'A dibujar un bovino en la cartelera de la escuela',
      'A ordeñar ganado en la madrugada'
    ],
    correctIndex: 0,
    explanation: '"Hacer una vaca" es una de las expresiones más tradicionales de solidaridad colectiva en Colombia para reunir fondos comunes entre amigos.',
    xpReward: 30,
    coinReward: 20,
  },
  {
    id: 'lq-6',
    type: 'ortografia',
    prompt: '¿Cuál de las siguientes oraciones sobre la historia del siglo XX está correctamente acentuada?',
    options: [
      'En 1954 llegó la televisión al país y causó una gran conmoción.',
      'En 1954 llego la television al pais y causo una gran conmocion.',
      'En 1954 llégo la televisión al país y cáuso una gran conmocion.',
      'En 1954 llegó la television ál pais y causó una gran conmociòn.'
    ],
    correctIndex: 0,
    explanation: '"Llegó" y "causó" son verbos agudos terminados en vocal; "televisión" y "conmoción" son agudas terminadas en -n; "país" lleva tilde dierética para romper el diptongo.',
    xpReward: 40,
    coinReward: 25,
  },
  {
    id: 'lq-7',
    type: 'comprension',
    prompt: '¿Qué caracterizó al movimiento literario del Nadaísmo fundado por Gonzalo Arango en 1958 en Medellín?',
    options: [
      'Una juventud rebelde que rompió con la solemnidad tradicional con humor, ironía y crítica a la violencia',
      'Escribir únicamente en latín clásico medieval',
      'Prohibir la poesía y solo permitir obras de teatro mudas',
      'Promover poesías dedicadas a las máquinas a vapor inglesas'
    ],
    correctIndex: 0,
    explanation: 'El Nadaísmo fue la vanguardia literaria más audaz de Colombia: poetas jóvenes que con humor cáustico y libertad desafiaron los dogmas de la época de la Violencia.',
    authorReference: 'Gonzalo Arango y los Nadaístas',
    xpReward: 45,
    coinReward: 30,
  },
  {
    id: 'lq-8',
    type: 'figura_literaria',
    prompt: 'En la frase: "Las campanas de la iglesia lloraban la partida del último tren a vapor", ¿qué recurso literario encontramos?',
    options: [
      'Personificación (las campanas no lloran, se les atribuye un sentimiento humano)',
      'Asíndeton por falta de conjunciones',
      'Retruécano',
      'Polisíndeton'
    ],
    correctIndex: 0,
    explanation: 'La personificación o prosopopeya atribuye cualidades y emociones humanas (llorar la partida) a objetos inanimados como las campanas.',
    xpReward: 40,
    coinReward: 25,
  }
];

export interface MicroRelatoPromptSeed {
  year: number;
  setting: string;
  protagonist: string;
  historicalItem: string;
  literaryStyle: string;
  seedTitle: string;
  storyStarter: string;
  colombianExpression: string;
}

export const MICRO_RELATO_TEMPLATES: MicroRelatoPromptSeed[] = [
  {
    year: 1928,
    setting: 'La estación del tren de Ciénaga bajo el sol caribeño',
    protagonist: 'Una joven telegrafista de dedos veloces',
    historicalItem: 'El telégrafo de bronce y un racimo de guineo verde',
    literaryStyle: 'Realismo Mágico (Estilo Gabo)',
    seedTitle: 'Los telegramas que olían a banano',
    storyStarter: 'A las tres de la tarde, cuando el calor convertía las rieles en espejos de sal, los telegramas empezaron a llegar sin remitente...',
    colombianExpression: 'Estar en la juega',
  },
  {
    year: 1948,
    setting: 'La carrera Séptima de Bogotá entre la neblina y los tranvías',
    protagonist: 'Un joven repartidor de periódicos con ruana de lana virgen',
    historicalItem: 'La bocina del tranvía municipal y una edición extra de El Espectador',
    literaryStyle: 'Crónica Urbana y Costumbrismo',
    seedTitle: 'El silbido del último tranvía',
    storyStarter: 'La neblina bogotana bajaba de Monserrate tan espesa que los postes de luz parecían faros de barco en un mar de adoquines...',
    colombianExpression: 'Los corotos',
  },
  {
    year: 1954,
    setting: 'Una sala familiar con cortinas de terciopelo frente a una caja de luz',
    protagonist: 'Un abuelo caficultor que jamás había visto una pantalla',
    historicalItem: 'El primer televisor de bulbos en blanco y negro',
    literaryStyle: 'Narrativa Emotiva y Sorpresa',
    seedTitle: 'Fantasmas de luz en la sala',
    storyStarter: 'Nadie en la cuadra se atrevía a respirar fuerte: la pequeña caja gris encendió un ojo verde fluorescente y, de pronto, apareció una orquesta en movimiento...',
    colombianExpression: 'Morrocotudo',
  },
  {
    year: 1970,
    setting: 'El patio empedrado de una escuela pública en el barrio San Antonio de Cali',
    protagonist: 'Dos campeones de trompo y rayuela con rodillas raspadas',
    historicalItem: 'Un trompo de guayacán con punta de clavo acerado',
    literaryStyle: 'Relato de Infancia y Nostalgia',
    seedTitle: 'El duelo del trompo dormilón',
    storyStarter: 'El trompo bailaba sobre la uña del pulgar de Mateo con tal quietud que parecía dormido en el aire, desafiando la gravedad del mediodía...',
    colombianExpression: 'Chiripazo',
  },
  {
    year: 1982,
    setting: 'El Gran Salón de Conciertos de Estocolmo nevado y distante',
    protagonist: 'Un escritor de Aracataca con liquiliqui de lino blanco',
    historicalItem: 'Una mariposa amarilla bordada en el bolsillo del pecho',
    literaryStyle: 'Épico y Lírico',
    seedTitle: 'El día en que la nieve conoció a Macondo',
    storyStarter: 'Mientras afuera caía la nieve sueca en copos silenciosos, adentro sonaba la cumbia y un hombre de bigote sonriente recordaba los almendros de su pueblo...',
    colombianExpression: 'Chicanear con orgullo patrio',
  },
];

export interface MasterpieceChronologyItem {
  id: string;
  title: string;
  year: number;
  author: string;
  genre: string;
  icon: string;
  historicalHint: string;
  clueQuote: string;
}

export const CHRONOLOGY_MASTERPIECES: MasterpieceChronologyItem[] = [
  {
    id: 'chron-1',
    title: 'La Vorágine',
    year: 1924,
    author: 'José Eustasio Rivera',
    genre: 'Novela de la Selva & Denuncia Social',
    icon: '🌿',
    historicalHint: 'Publicada a comienzos de los años 20 durante la bonanza del caucho amazónico.',
    clueQuote: '"¡Jugué mi corazón al azar y me lo ganó la violencia!"',
  },
  {
    id: 'chron-2',
    title: 'La Marquesa de Yolombó',
    year: 1928,
    author: 'Tomás Carrasquilla',
    genre: 'Novela Costumbrista',
    icon: '⛰️',
    historicalHint: 'Apareció en 1928, el mismo año de las huelgas obreras de Ciénaga.',
    clueQuote: 'Retrata el temple de doña Bárbara Caballero y las minas de oro antioqueñas.',
  },
  {
    id: 'chron-3',
    title: 'Canciones para iniciar una fiesta',
    year: 1936,
    author: 'Eduardo Carranza (Piedra y Cielo)',
    genre: 'Poesía Lírica',
    icon: '🌤️',
    historicalHint: 'Obra emblemática de la República Liberal y el grupo Piedracielista en los años 30.',
    clueQuote: '"Todo está bien: el verde en la pradera, el aire con su música de seda..."',
  },
  {
    id: 'chron-4',
    title: 'Primer Manifiesto Nadaísta',
    year: 1958,
    author: 'Gonzalo Arango',
    genre: 'Vanguardia & Manifiesto Rebelde',
    icon: '⚡',
    historicalHint: 'Surgió en 1958 en Medellín al comenzar el Frente Nacional tras la dictadura.',
    clueQuote: '"No dejar una fe intacta ni un ídolo en su sitio."',
  },
  {
    id: 'chron-5',
    title: 'Cien Años de Soledad',
    year: 1967,
    author: 'Gabriel García Márquez',
    genre: 'Realismo Mágico',
    icon: '🦋',
    historicalHint: 'La cumbre del Boom Latinoamericano publicada en Buenos Aires en 1967.',
    clueQuote: '"...había de recordar aquella tarde remota en que su padre lo llevó a conocer el hielo."',
  },
  {
    id: 'chron-6',
    title: 'Estaba la pájara pinta sentada en el verde limón',
    year: 1975,
    author: 'Albalucía Ángel',
    genre: 'Memoria de la Violencia',
    icon: '🕊️',
    historicalHint: 'Publicada a mediados de los años 70 evocando el 9 de abril de 1948.',
    clueQuote: 'Rondas infantiles entrelazadas con la memoria del Bogotazo y la violencia bipartidista.',
  },
  {
    id: 'chron-7',
    title: 'Empresas y tribulaciones de Maqroll el Gaviero',
    year: 1986,
    author: 'Álvaro Mutis',
    genre: 'Novela Lírica & Aventuras',
    icon: '⛵',
    historicalHint: 'Apareció en los años 80 reuniendo las navegaciones míticas del marinero errante.',
    clueQuote: '"No hay puerto seguro sino aquel que inventamos en la memoria..."',
  },
  {
    id: 'chron-8',
    title: 'En diciembre llegaban las brisas',
    year: 1987,
    author: 'Marvel Moreno',
    genre: 'Narrativa Caribeña & Femenina',
    icon: '🌺',
    historicalHint: 'Consagración literaria a fines de los años 80 en París sobre Barranquilla.',
    clueQuote: '"...cuando empezaban a soplar los vientos alisios, la ciudad parecía despertar."',
  },
];

export interface LiteraryOracleCard {
  id: string;
  source: string;
  author: string;
  quote: string;
  secretRevelation: string;
  giftCoins: number;
}

export const LITERARY_ORACLE_QUOTES: LiteraryOracleCard[] = [
  {
    id: 'oracle-1',
    source: 'Cien Años de Soledad',
    author: 'Gabriel García Márquez',
    quote: 'La sabiduría nos llega cuando ya no nos sirve de nada, salvo para recordar lo felices que fuimos sin saberlo.',
    secretRevelation: '¡Misterio Revelado! Gabo escribió los primeros borradores de Macondo en servilletas del Café El Molino en Bogotá.',
    giftCoins: 35,
  },
  {
    id: 'oracle-2',
    source: 'La Vorágine',
    author: 'José Eustasio Rivera',
    quote: 'Hay en el rumor de la manigua una voz secreta que solo comprenden quienes no le temen a su propio destino.',
    secretRevelation: '¡Archivo Histórico! Rivera financió la primera edición de su novela de su propio bolsillo para evitar la censura cauchera.',
    giftCoins: 40,
  },
  {
    id: 'oracle-3',
    source: 'Prosas Rebeldes',
    author: 'Gonzalo Arango',
    quote: 'La belleza no es un adorno para los museos, es un relámpago que despierta la libertad dormida.',
    secretRevelation: '¡Anécdota Nadaísta! Los nadaístas enviaban sus poemas mecanografiados con sellos de correo falsos dibujados a mano.',
    giftCoins: 30,
  },
  {
    id: 'oracle-4',
    source: 'La Nieve del Almirante',
    author: 'Álvaro Mutis',
    quote: 'Todo viaje es un regreso a nosotros mismos a través de los ríos del tiempo.',
    secretRevelation: '¡Dato Inédito! Gabriel García Márquez y Álvaro Mutis se leían mutuamente sus capítulos antes de enviarlos a la imprenta.',
    giftCoins: 45,
  },
];
