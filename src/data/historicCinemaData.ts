export interface DocumentaryQuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface HistoricalFilm {
  id: string;
  platform: 'youtube' | 'rtvcplay';
  title: string;
  subtitle: string;
  period: string;
  duration: string;
  genre: string;
  eraYear: number;
  badge: string;
  youtubeId: string;
  youtubeUrl: string;
  embedUrl: string;
  thumbnail: string;
  synopsis: string;
  keyPoints: string[];
  historicalContext: string;
  quiz: DocumentaryQuizQuestion;
  xpReward: number;
}

/**
 * Cartelera exclusiva de videos solicitados para la Sala de Cine Histórico
 * del Colegio Niño Jesús De Praga - Feria STEM:
 * 1. https://youtu.be/das2Pipwp2w?si=cHQNLtVKcmyF_1zH (No hubo tiempo para la tristeza - CNMH)
 * 2. https://youtu.be/DrJQWlcxvEY?si=jZMZKcDPR3hAF7zS (Colombia en el Siglo XX)
 * 3. https://rtvcplay.co/series-documentales/lo-se-de-memoria/industrializacion-colombia (Lo sé de memoria - Industrialización)
 */
export const HISTORIC_FILMS: HistoricalFilm[] = [
  {
    id: 'film-das2Pipwp2w',
    platform: 'youtube',
    title: 'No hubo tiempo para la tristeza',
    subtitle: 'Centro Nacional de Memoria Histórica (CNMH) • Guion de Patricia Nieto',
    period: 'Segunda mitad del Siglo XX - Contemporáneo',
    duration: 'Documental Completo Oficial • 36 min',
    genre: 'Memoria Histórica & Derechos Humanos',
    eraYear: 1985,
    badge: '🕊️ Memoria Histórica Oficial CNMH',
    youtubeId: 'das2Pipwp2w',
    youtubeUrl: 'https://youtu.be/das2Pipwp2w?si=cHQNLtVKcmyF_1zH',
    embedUrl: 'https://www.youtube.com/embed/das2Pipwp2w?autoplay=1&rel=0&modestbranding=1',
    thumbnail: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
    synopsis:
      'Producido por el Centro Nacional de Memoria Histórica (CNMH), este conmovedor documental recoge el testimonio de miles de familias colombianas que fueron víctimas del desplazamiento forzado y el conflicto armado. Demuestra cómo las comunidades rompieron el silencio para reconstruir la memoria de sus pueblos, exigir la no repetición y reconstruir sus vidas con dignidad y resiliencia.',
    keyPoints: [
      'Relato testimonial y colectivo de comunidades afectadas por el conflicto.',
      'El papel pedagógico de la memoria histórica en las escuelas colombianas.',
      'La dignidad, el duelo y los caminos de sanación comunitaria.',
      'Cátedra de Paz: comprender el pasado para consolidar la convivencia pacífica.'
    ],
    historicalContext:
      'El Centro Nacional de Memoria Histórica produjo esta obra como aporte fundamental a la verdad y reparación simbólica. Es una de las piezas audiovisuales más estudiadas en colegios y universidades de Colombia para sensibilizar sobre el valor innegociable de la vida y la empatía ciudadana.',
    quiz: {
      question: '¿Cuál es el propósito central de la memoria histórica según el documental "No hubo tiempo para la tristeza"?',
      options: [
        'Dignificar a las víctimas y recuperar la verdad para no repetir la violencia',
        'Incentivar la venganza entre regiones colombianas',
        'Borrar los archivos históricos de las bibliotecas',
        'Cambiar los nombres geográficos de los municipios'
      ],
      correctIndex: 0,
      explanation:
        'La memoria histórica busca escuchar a las comunidades, preservar la verdad con rigor y garantizar que las nuevas generaciones reconozcan los errores del pasado para construir un país en paz.'
    },
    xpReward: 120
  },
  {
    id: 'film-DrJQWlcxvEY',
    platform: 'youtube',
    title: 'Colombia en el Siglo XX: Hitos, Memoria y Transformación',
    subtitle: 'Crónica Audiovisual de las Grandes Etapas Sociales, Políticas y Culturales',
    period: '1900 - 1999',
    duration: 'Documental Histórico • Alta Definición',
    genre: 'Historia Contemporánea de Colombia',
    eraYear: 1950,
    badge: '🎞️ Crónica del Siglo XX',
    youtubeId: 'DrJQWlcxvEY',
    youtubeUrl: 'https://youtu.be/DrJQWlcxvEY?si=jZMZKcDPR3hAF7zS',
    embedUrl: 'https://www.youtube.com/embed/DrJQWlcxvEY?autoplay=1&rel=0&modestbranding=1',
    thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
    synopsis:
      'Un recorrido cronológico y analítico por los momentos más trascendentales que forjaron la Colombia moderna a lo largo de 100 años: la reconstrucción tras la Guerra de los Mil Días, el Bogotazo de 1948, la industrialización urbana, la llegada de la televisión en 1954 y el nacimiento del Estado Social de Derecho con la Constitución de 1991.',
    keyPoints: [
      '1900-1930: La expansión de la economía cafetera y la infraestructura ferroviaria.',
      '1948: El magnicidio de Jorge Eliécer Gaitán y la transformación urbana de Bogotá.',
      '1954-1980: El impacto masivo de la radio y la televisión en la cultura nacional.',
      '1991: La Asamblea Nacional Constituyente y la protección de los derechos fundamentales.'
    ],
    historicalContext:
      'Durante el siglo XX, Colombia transitó desde una sociedad rural y dispersa hacia un país urbano y cosmopolita. La tensión entre centralismo y regiones, y la lucha por derechos laborales y civiles, marcaron el desarrollo de la democracia colombiana.',
    quiz: {
      question: '¿Qué acontecimiento democrático de 1991 consagró a Colombia como un Estado Social de Derecho?',
      options: [
        'La promulgación de la nueva Constitución Política mediante la Asamblea Constituyente',
        'La firma del Tratado de Versalles',
        'La inauguración del primer ferrocarril a vapor',
        'La creación del Ministerio de Minas y Petróleos'
      ],
      correctIndex: 0,
      explanation:
        'La Constitución Política de 1991, impulsada por el movimiento estudiantil de la Séptima Papeleta, reconoció a Colombia como un Estado Social de Derecho pluriétnico y multicultural.'
    },
    xpReward: 100
  },
  {
    id: 'film-rtvc-industrializacion',
    platform: 'rtvcplay',
    title: 'Historia de la Industrialización en Colombia',
    subtitle: 'Serie "Lo sé de memoria" (Capítulo 10) • Archivos Históricos de RTVCPlay y Señal Colombia',
    period: '1920 - 1980',
    duration: 'Serie Documental RTVCPlay • Archivo Restaurado',
    genre: 'Historia Económica, Ciencia & Tecnología',
    eraYear: 1930,
    badge: '🇨🇴 Archivo Patrimonial RTVCPlay',
    youtubeId: 'rtvcplay-industrializacion',
    youtubeUrl: 'https://rtvcplay.co/series-documentales/lo-se-de-memoria/industrializacion-colombia',
    embedUrl: 'https://rtvcplay.co/series-documentales/lo-se-de-memoria/industrializacion-colombia',
    thumbnail: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
    synopsis:
      'Capítulo 10 de la serie "Lo sé de memoria" de RTVCPlay y Señal Colombia. Con imágenes y sonidos de archivo recuperados y digitalizados por Señal Memoria, este documental muestra cómo Colombia pasó de la manufactura artesanal a las grandes industrias textiles, metalúrgicas, cerveceras y de energía eléctrica que impulsaron el empleo y la ciencia aplicada en el siglo XX.',
    keyPoints: [
      'Cintas de video, audio radial y registros fotográficos originales restaurados en 4K.',
      'El impacto de las hidroeléctricas y el vapor en las fábricas de Medellín, Bogotá y Cali.',
      'El nacimiento del movimiento obrero y las primeras leyes laborales en Colombia.',
      'Enlace directo con la plataforma pública gratuita del Estado colombiano (RTVCPlay).'
    ],
    historicalContext:
      'La industrialización transformó la vida cotidiana de las familias colombianas. Gracias al archivo del Sistema de Medios Públicos (RTVC), las escuelas pueden revivir las voces, máquinas e industrias que consolidaron la economía moderna nacional.',
    quiz: {
      question: '¿Qué recurso tecnológico e infraestructura fue clave para alimentar las primeras grandes fábricas en Colombia a comienzos y mediados del siglo XX?',
      options: [
        'La energía hidroeléctrica y las redes de ferrocarril a vapor',
        'La energía nuclear de fusión',
        'Los paneles solares fotovoltaicos espaciales',
        'Las redes de fibra óptica submarinas'
      ],
      correctIndex: 0,
      explanation:
        'Los ríos colombianos proveyeron la fuerza hídrica para generar hidroelectricidad, mientras que los trenes transportaban la maquinaria pesada y la materia prima a las plantas fabriles.'
    },
    xpReward: 110
  }
];
