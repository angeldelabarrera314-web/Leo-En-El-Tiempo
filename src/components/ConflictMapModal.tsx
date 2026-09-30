import React, { useState } from 'react';
import { ArrowLeft, X, ShieldAlert, Sparkles, Volume2, Info, Compass, Flame, HeartHandshake, BookOpen, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface ConflictMapModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSpeakText: (text: string) => void;
  onTravelToYear: (year: number) => void;
}

interface ConflictEpoch {
  id: string;
  yearRange: string;
  eraTitle: string;
  representativeYear: number;
  badge: string;
  summary: string;
  highIntensityRegions: string[];
  mediumIntensityRegions: string[];
  peaceInitiatives: string;
  regionsDetail: {
    name: string;
    department: string;
    intensity: 'high' | 'medium' | 'low';
    events: string;
    impactOnCivilians: string;
    peaceEffort: string;
    schoolQuestion: string;
  }[];
}

const CONFLICT_EPOCHS: ConflictEpoch[] = [
  {
    id: 'mil-dias',
    yearRange: '1899 - 1903',
    eraTitle: 'Guerra de los Mil Días y Separación de Panamá',
    representativeYear: 1903,
    badge: 'Conflicto Bipartidista Inicial',
    summary: 'La mayor guerra civil del siglo XIX y albores del XX en Colombia entre facciones liberales y conservadoras. Dejó una economía devastada, más de 100.000 muertos y la posterior separación del istmo de Panamá en noviembre de 1903.',
    highIntensityRegions: ['Santanderes', 'Tolima Grande', 'Panamá (Istmo)', 'Cundinamarca'],
    mediumIntensityRegions: ['Costa Caribe', 'Boyacá', 'Cauca'],
    peaceInitiatives: 'Tratado de Paz de Neerlandia y Tratado de Paz del buque Wisconsin (1902).',
    regionsDetail: [
      {
        name: 'Santander y Norte de Santander',
        department: 'Bucaramanga, Cúcuta, Lebrija',
        intensity: 'high',
        events: 'Escenario de las batallas campales más sangrientas como Palonegro (1900) y Peralonso (1899). Se cavaron trincheras durante semanas y se destruyeron fincas cafeteras.',
        impactOnCivilians: 'Familias campesinas sufrieron el reclutamiento forzado de jóvenes y escasez crítica de alimentos. La moneda perdió casi todo su valor por la hiperinflación.',
        peaceEffort: 'Líderes de ambos bandos impulsaron el cese al fuego ante la ruina absoluta del oriente colombiano.',
        schoolQuestion: '¿Por qué la Guerra de los Mil Días debilitó tanto a Colombia que facilitó la separación de Panamá en 1903?'
      },
      {
        name: 'Departamento de Panamá (hasta 1903)',
        department: 'Ciudad de Panamá, Colón, Istmo',
        intensity: 'high',
        events: 'Guerra de guerrillas liberales encabezadas por Victoriano Lorenzo. Las tropas combatieron a lo largo de la línea del ferrocarril interoceánico.',
        impactOnCivilians: 'Aislamiento de la población local respecto al gobierno central en Bogotá, falta de escuelas y servicios básicos.',
        peaceEffort: 'Firma del Tratado del Wisconsin a bordo del acorazado estadounidense en la bahía de Panamá en noviembre de 1902.',
        schoolQuestion: '¿Cuánto tardaban las noticias en llegar desde Panamá hasta Bogotá en esa época y cómo influyó la distancia?'
      },
      {
        name: 'Tolima y Valle del Alto Magdalena',
        department: 'Ibagué, Honda, Espinal',
        intensity: 'high',
        events: 'Combates constantes para controlar el Río Magdalena, que era la única arteria de navegación a vapor para entrar y salir del país.',
        impactOnCivilians: 'Los barcos a vapor fueron confiscados para la guerra, paralizando el comercio de café y tabaco.',
        peaceEffort: 'Acuerdos locales entre hacendados y trabajadores para reanudar el transporte de cosechas.',
        schoolQuestion: '¿Por qué controlar los barcos del Río Magdalena era vital para ambos bandos en la guerra?'
      }
    ]
  },
  {
    id: 'agrarias-bananeras',
    yearRange: '1920 - 1947',
    eraTitle: 'Tensiones Agrarias y Masacre de las Bananeras (1928)',
    representativeYear: 1928,
    badge: 'Luchas Laborales y por la Tierra',
    summary: 'Auge de las huelgas de trabajadores por condiciones dignas en enclaves extranjeros de banano y petróleo, y demandas campesinas por títulos de tierra en Cundinamarca y Tolima.',
    highIntensityRegions: ['Magdalena (Zona Bananera)', 'Santander (Barrancabermeja)', 'Sumapaz y Tequendama'],
    mediumIntensityRegions: ['Valle del Cauca', 'Córdoba', 'Antioquia'],
    peaceInitiatives: 'Creación de las primeras leyes laborales colombianas y Ley de Tierras (Ley 200 de 1936).',
    regionsDetail: [
      {
        name: 'Zona Bananera del Magdalena',
        department: 'Ciénaga, Aracataca, Santa Marta',
        intensity: 'high',
        events: 'En diciembre de 1928, más de 25.000 trabajadores de la United Fruit Company entraron en huelga exigiendo pago en dinero y atención médica. En la estación del tren de Ciénaga el ejército abrió fuego contra los manifestantes.',
        impactOnCivilians: 'Decenas de familias obreras enlutadas, persecución de líderes sindicales y conmoción nacional que inspiró la obra Cien Años de Soledad de Gabriel García Márquez.',
        peaceEffort: 'Debates históricos en el Congreso de la República liderados por el joven abogado Jorge Eliécer Gaitán para denunciar los hechos.',
        schoolQuestion: '¿Qué pedían los trabajadores del banano en su pliego de peticiones y por qué era de justicia laboral?'
      },
      {
        name: 'Región de Sumapaz y Tequendama',
        department: 'Cundinamarca y Tolima',
        intensity: 'high',
        events: 'Campesinos colonos exigían no ser tratados como siervos en las grandes haciendas cafeteras y reclamaban la propiedad de las parcelas que desmontaron.',
        impactOnCivilians: 'Desalojos violentos por parte de hacendados y resistencia campesina pacífica organizada por Erasmo Valencia.',
        peaceEffort: 'La Ley 200 de 1936 ("La tierra es de quien la trabaja") promulgada durante el gobierno de Alfonso López Pumarejo.',
        schoolQuestion: '¿Cómo cambió la vida de los campesinos cuando el Estado les reconoció el derecho a sus parcelas?'
      }
    ]
  },
  {
    id: 'la-violencia',
    yearRange: '1948 - 1957',
    eraTitle: '"La Violencia" Bipartidista & El Bogotazo',
    representativeYear: 1948,
    badge: 'Período Crítico de La Violencia',
    summary: 'Tras el asesinato de Jorge Eliécer Gaitán el 9 de abril de 1948, el país se sumergió en una feroz violencia bipartidista que desplazó a más de 2 millones de campesinos a las ciudades.',
    highIntensityRegions: ['Bogotá D.C.', 'Tolima Grande', 'Llanos Orientales (Meta y Casanare)', 'Santander', 'Valle del Cauca'],
    mediumIntensityRegions: ['Antioquia', 'Boyacá', 'Caldas (Eje Cafetero)'],
    peaceInitiatives: 'Desmovilización de las Guerrillas Liberales de los Llanos (1953) y Plebiscito del Frente Nacional (1957).',
    regionsDetail: [
      {
        name: 'Bogotá D.C. y Sabana',
        department: 'Centro Histórico, Carrera Séptima',
        intensity: 'high',
        events: 'El 9 de abril de 1948 el centro de Bogotá fue destruido tras el magnicidio de Gaitán. Incendio del tranvía, saqueos y enfrentamientos armados en las calles.',
        impactOnCivilians: 'Cientos de edificios coloniales reducidos a cenizas, suspensión del servicio de tranvías y éxodo de familias hacia barrios periféricos.',
        peaceEffort: 'La Cruz Roja Colombiana y comités cívicos atendieron a los heridos y reconstruyeron la convivencia barrial.',
        schoolQuestion: '¿Cómo transformó el 9 de abril la arquitectura y el transporte de Bogotá?'
      },
      {
        name: 'Llanos Orientales (Meta, Casanare y Arauca)',
        department: 'Villavicencio, Yopal, Monterrey',
        intensity: 'high',
        events: 'Nacimiento de las Guerrillas Liberales del Llano comandadas por Guadalupe Salcedo para defender a los campesinos frente a los ataques gubernamentales.',
        impactOnCivilians: 'Quema de hatos ganaderos, bombardeos aéreos y migración de comunidades llaneras a la selva.',
        peaceEffort: 'En 1953, Guadalupe Salcedo firmó la entrega pacífica de armas ante el general Gustavo Rojas Pinilla, logrando una amnistía histórica.',
        schoolQuestion: '¿Qué lección de diálogo nos dejó el acuerdo de paz de los Llanos Orientales de 1953?'
      },
      {
        name: 'Tolima Grande y Eje Cafetero',
        department: 'Líbano, Chaparral, Armero, Armenia',
        intensity: 'high',
        events: 'Acciones de grupos armados irregulares ("pájaros" y "chulavitas") contra campesinos para despojarlos de sus fincas cafeteras en producción.',
        impactOnCivilians: 'Desplazamiento masivo forzado hacia las ciudades intermedias y nacimiento de los primeros barrios de invasión.',
        peaceEffort: 'Creación de cooperativas cafeteras comunitarias para proteger la venta del grano y reconstruir escuelas rurales.',
        schoolQuestion: '¿Por qué el café continuó siendo el soporte de Colombia a pesar del conflicto de los años 50?'
      }
    ]
  },
  {
    id: 'frente-nacional-guerrillas',
    yearRange: '1958 - 1974',
    eraTitle: 'Frente Nacional y Origen de las Guerrillas Modernas',
    representativeYear: 1964,
    badge: 'Operación Marquetalia y Nuevos Actores',
    summary: 'El pacto del Frente Nacional cerró la violencia entre liberales y conservadores pero excluyó a otras fuerzas políticas. En 1964, tras el ataque militar a la zona campesina de Marquetalia en el Tolima, nacieron las FARC, y paralelamente surgieron el ELN y el EPL.',
    highIntensityRegions: ['Sur del Tolima (Marquetalia)', 'Huila', 'Santander (Simacota)', 'Cauca'],
    mediumIntensityRegions: ['Antioquia', 'Cesar', 'Nariño'],
    peaceInitiatives: 'Acción Comunal (Juntas de Acción Comunal) y Radio Sutatenza alfabetizando al campo.',
    regionsDetail: [
      {
        name: 'Sur del Tolima y Huila',
        department: 'Planadas, Gaitania, Marquetalia',
        intensity: 'high',
        events: 'En mayo de 1964 el ejército lanzó la Operación Marquetalia contra comunidades campesinas autónomas. Los sobrevivientes se internaron en la cordillera y fundaron las FARC.',
        impactOnCivilians: 'Familias enteras debieron huir hacia las selvas del Guaviare y Caquetá para recomenzar su vida como colonos.',
        peaceEffort: 'Comités de paz interparroquiales y pactos de convivencia entre colonos e indígenas Nasa.',
        schoolQuestion: '¿Por qué la Cátedra de Paz enseña que el diálogo debe incluir a todas las comunidades para evitar el conflicto?'
      },
      {
        name: 'Serranía de San Lucas y Santander',
        department: 'Simacota, San Vicente de Chucurí',
        intensity: 'high',
        events: 'Toma de Simacota en 1965 por el naciente Ejército de Liberación Nacional (ELN), inspirado en la Revolución Cubana y la Teología de la Liberación de Camilo Torres.',
        impactOnCivilians: 'Tensión permanente entre autoridades locales y campamentos guerrilleros en zonas mineras y petroleras.',
        peaceEffort: 'Sacerdotes comunitarios y educadores de Acción Cultural Popular promovieron escuelas campesinas.',
        schoolQuestion: '¿Cómo ayudó Radio Sutatenza a que los campesinos se educaran en medio de las dificultades de la época?'
      }
    ]
  },
  {
    id: 'narcotrafico-anos-80',
    yearRange: '1975 - 1989',
    eraTitle: 'Auge del Narcotráfico, Carteles y Guerra Sucia',
    representativeYear: 1985,
    badge: 'La Década Más Difícil de los Años 80',
    summary: 'La irrupción de los carteles del narcotráfico (Medellín y Cali), el paramilitarismo y el narcoterrorismo con bombas urbanas, magnicidios y la trágica toma del Palacio de Justicia en noviembre de 1985.',
    highIntensityRegions: ['Medellín y Valle de Aburrá', 'Bogotá D.C.', 'Magdalena Medio', 'Urabá antioqueño', 'Cali'],
    mediumIntensityRegions: ['Caquetá', 'Meta', 'Córdoba'],
    peaceInitiatives: 'Diálogos de Paz de La Uribe (1984) y Marchas Blancas de la sociedad civil contra el terrorismo.',
    regionsDetail: [
      {
        name: 'Medellín y Antioquia',
        department: 'Comunas de Medellín, Envigado, Urabá',
        intensity: 'high',
        events: 'Violencia desatada por el Cartel de Medellín, reclutamiento de jóvenes en comunas, carros bomba contra la policía y magnicidio de jueces y periodistas.',
        impactOnCivilians: 'Toques de queda nocturnos, temor constante en las calles y estigmatización injusta de la juventud antioqueña.',
        peaceEffort: 'Movimientos barriales juveniles de música, hip hop, teatro y bibliotecas populares que rescataron a miles de jóvenes.',
        schoolQuestion: '¿Cómo las bibliotecas comunitarias y la cultura ayudaron a sanar a los barrios de Medellín?'
      },
      {
        name: 'Bogotá D.C. (Palacio de Justicia y Bombas)',
        department: 'Plaza de Bolívar, Centro de Bogotá',
        intensity: 'high',
        events: 'El 6 y 7 de noviembre de 1985 el M-19 se tomó el Palacio de Justicia, resultando en un holocausto con más de 100 muertos y la desaparición de magistrados. En 1989 bombas del cartel destruyeron el avión de Avianca y el edificio del DAS.',
        impactOnCivilians: 'Luto nacional colectivo y pérdida de confianza en las instituciones democráticas.',
        peaceEffort: 'Movimiento estudiantil de la "Séptima Papeleta" en 1989 promovido por universitarios para exigir una nueva Constitución de paz.',
        schoolQuestion: '¿Cómo los estudiantes universitarios lograron convocar a la Asamblea Constituyente de 1991 mediante votos pacíficos?'
      },
      {
        name: 'Magdalena Medio',
        department: 'Puerto Boyacá, Barrancabermeja',
        intensity: 'high',
        events: 'Surgimiento de grupos paramilitares financiados por narcotraficantes y terratenientes que persiguieron a líderes sociales y miembros de la Unión Patriótica.',
        impactOnCivilians: 'Masacres en veredas campesinas y desplazamiento de miles de pescadores del Río Magdalena.',
        peaceEffort: 'Asociación de Trabajadores Campesinos del Carare (ATCC), que en 1987 se declaró neutral y desarmada, ganando el Premio Nobel Alternativo de Paz.',
        schoolQuestion: '¿Por qué la experiencia de los campesinos del Carare en Santander es un ejemplo mundial de resistencia no violenta?'
      }
    ]
  },
  {
    id: 'anos-90-paz-constitucion',
    yearRange: '1990 - 1999',
    eraTitle: 'Constitución del 91, Mandato por la Paz y Fin de Siglo',
    representativeYear: 1991,
    badge: 'Nueva Carta Magna y Clamor por la Paz',
    summary: 'La desmovilización del M-19 y EPL dio paso a la Constitución Política de 1991 como gran pacto de convivencia nacional. No obstante, en la segunda mitad de los 90 se agudizó la confrontación entre FARC y AUC en regiones periféricas, detonando el Mandato por la Paz de 1997 donde más de 10 millones de colombianos votaron por la no violencia.',
    highIntensityRegions: ['Urabá (Antioquia y Chocó)', 'Montes de María (Bolívar y Sucre)', 'Catatumbo', 'Cauca y Nariño'],
    mediumIntensityRegions: ['Meta', 'Putumayo', 'Arauca', 'Valle del Cauca'],
    peaceInitiatives: 'Constitución Política de 1991, Acción de Tutela, Comunidades de Paz de Apartadó y Mandato de los Niños por la Paz (1996) con 2.7 millones de votos infantiles.',
    regionsDetail: [
      {
        name: 'Montes de María y Urabá',
        department: 'Apartadó, San José, Carmen de Bolívar',
        intensity: 'high',
        events: 'Disputas territoriales cruentas entre guerrilla y bloques paramilitares de las AUC por corredores estratégicos hacia el mar Caribe.',
        impactOnCivilians: 'Masacres en pueblos como El Salado y Bojayá en años posteriores, pérdida de cosechas de aguacate y plátano, y desarraigo familiar.',
        peaceEffort: 'Creación de la "Comunidad de Paz de San José de Apartadó" en 1997, donde campesinos decidieron vivir desarmados y prohibir el ingreso de cualquier actor violento a sus aldeas.',
        schoolQuestion: '¿Qué significa declararse como "Comunidad de Paz" y cómo enseña a respetar la vida civil?'
      },
      {
        name: 'Cauca y Territorios Indígenas',
        department: 'Toribío, Caldono, Santander de Quilichao',
        intensity: 'high',
        events: 'Ataques a puestos de policía en cascos urbanos indígenas y hostigamientos armados recurrentes.',
        impactOnCivilians: 'Afectación a escuelas rurales, reclutamiento ilícito y daño a la soberanía comunitaria ancestral.',
        peaceEffort: 'La Guardia Indígena (Kiwe Thegnas) armada únicamente con sus bastones de mando de madera de chonta para proteger los resguardos y liberar secuestrados pacíficamente.',
        schoolQuestion: '¿Cómo la Guardia Indígena del Cauca demuestra el poder del bastón de la paz frente a las armas?'
      },
      {
        name: 'Movimiento Ciudadano Nacional (Toda Colombia)',
        department: 'Colegios, Plazas Públicas y Ciudades',
        intensity: 'medium',
        events: 'Reacción masiva de la sociedad civil frente al secuestro y los enfrentamientos armados al cierre del siglo XX.',
        impactOnCivilians: 'La niñez colombiana lideró el "Movimiento de los Niños por la Paz" en 1996 apadrinado por UNICEF.',
        peaceEffort: 'El "Mandato Ciudadano por la Paz, la Vida y la Libertad" en octubre de 1997: más de 10 millones de votos de colombianos exigiendo el fin de la guerra.',
        schoolQuestion: '¿Cómo el voto de los niños en 1996 demostró que la niñez tiene voz para transformar el país?'
      }
    ]
  }
];

export const ConflictMapModal: React.FC<ConflictMapModalProps> = ({
  isOpen,
  onClose,
  onSpeakText,
  onTravelToYear,
}) => {
  const [selectedEpochIndex, setSelectedEpochIndex] = useState<number>(2); // Default: La Violencia (1948)
  const [selectedRegionIndex, setSelectedRegionIndex] = useState<number>(0);

  if (!isOpen) return null;

  const currentEpoch = CONFLICT_EPOCHS[selectedEpochIndex];
  const activeRegion = currentEpoch.regionsDetail[selectedRegionIndex] || currentEpoch.regionsDetail[0];

  const handleSpeakRegion = () => {
    sounds.playClick();
    onSpeakText(
      `${activeRegion.name} durante ${currentEpoch.eraTitle}. ${activeRegion.events} En cuanto a la convivencia y paz: ${activeRegion.peaceEffort}`
    );
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-fadeIn select-none"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-5xl bg-gradient-to-b from-[#141018] via-[#101424] to-[#0a0d18] text-slate-100 border-2 border-rose-500/40 rounded-3xl shadow-[0_0_50px_rgba(244,63,94,0.25)] flex flex-col max-h-[94vh] overflow-hidden"
      >
        {/* Top Header with Prominent Back Button */}
        <div className="p-3 sm:p-4 bg-[#1b1420] border-b border-rose-500/30 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            {/* Prominent Back Button */}
            <button
              onClick={onClose}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-400/40 text-xs font-bold transition-all hover:scale-105"
              title="Volver al Laboratorio Cuántico"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Volver atrás</span>
            </button>

            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/30">
                <Compass className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
                    Mapa de Memoria Histórica, Conflicto y Paz
                  </h2>
                  <span className="text-[10px] bg-rose-500/25 text-rose-300 border border-rose-400/40 px-2 py-0.5 rounded-full font-digital uppercase">
                    Cátedra de Paz
                  </span>
                  <span className="text-[10px] bg-sky-500/20 text-sky-200 border border-sky-400/40 px-2 py-0.5 rounded-full font-bold">
                    🏫 Col. Niño Jesús De Praga
                  </span>
                </div>
                <p className="text-xs text-slate-300 hidden sm:block">
                  Comprende los focos del conflicto armado en el siglo XX y exalta las iniciativas comunitarias de reconciliación
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Epoch Selector Slider / Pills */}
        <div className="p-3 bg-[#0d101c] border-b border-slate-800 flex items-center gap-2 overflow-x-auto no-scrollbar">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1 flex-shrink-0">
            <Flame className="w-3.5 h-3.5 text-rose-400" /> Época Histórica:
          </span>
          {CONFLICT_EPOCHS.map((epoch, idx) => {
            const isSelected = selectedEpochIndex === idx;
            return (
              <button
                key={epoch.id}
                onClick={() => {
                  sounds.playClick();
                  setSelectedEpochIndex(idx);
                  setSelectedRegionIndex(0);
                }}
                className={`flex-shrink-0 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                  isSelected
                    ? 'bg-rose-600 text-white border-rose-400 shadow-[0_0_15px_rgba(244,63,94,0.4)] scale-102'
                    : 'bg-[#151a2d] text-slate-300 border-slate-700/60 hover:bg-[#1e2540]'
                }`}
              >
                <span>{epoch.yearRange}</span>
                <span className="ml-1.5 text-[10px] opacity-80 hidden md:inline">({epoch.badge})</span>
              </button>
            );
          })}
        </div>

        {/* Main Content: Split Map & Region Detail */}
        <div className="flex-1 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 gap-4 p-3 sm:p-5">
          {/* Left Column: Interactive Map Vector Stage */}
          <div className="lg:col-span-6 bg-[#0a0d18] border border-rose-500/20 rounded-3xl p-4 flex flex-col justify-between relative overflow-hidden">
            {/* Background Map Grid & Coordinates */}
            <div className="absolute top-2 left-3 text-[10px] font-digital text-slate-500 uppercase tracking-widest pointer-events-none">
              COORDENADAS: 4°N 73°W • CARTOGRAFÍA HISTÓRICA COLOMBIANA
            </div>

            {/* Epoch Banner */}
            <div className="mt-4 mb-2 p-3 bg-gradient-to-r from-rose-950/40 to-slate-900 border border-rose-500/30 rounded-2xl">
              <span className="text-[10px] font-digital uppercase text-rose-400 block mb-0.5">
                {currentEpoch.yearRange} • {currentEpoch.badge}
              </span>
              <h3 className="text-sm sm:text-base font-bold text-white">
                {currentEpoch.eraTitle}
              </h3>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                {currentEpoch.summary}
              </p>
            </div>

            {/* Stylized SVG Map of Colombia with Regions and Hotspots */}
            <div className="relative my-2 w-full h-72 sm:h-80 bg-[#0d1326] rounded-2xl border border-sky-500/20 p-2 flex items-center justify-center overflow-hidden">
              <svg
                viewBox="0 0 400 480"
                className="w-full h-full max-h-full drop-shadow-[0_0_20px_rgba(56,189,248,0.2)]"
              >
                {/* Caribbean Sea & Pacific outlines */}
                <rect x="0" y="0" width="400" height="480" fill="#080e22" rx="16" />

                {/* Grid lines */}
                <line x1="100" y1="0" x2="100" y2="480" stroke="#142142" strokeDasharray="3 3" />
                <line x1="200" y1="0" x2="200" y2="480" stroke="#142142" strokeDasharray="3 3" />
                <line x1="300" y1="0" x2="300" y2="480" stroke="#142142" strokeDasharray="3 3" />
                <line x1="0" y1="120" x2="400" y2="120" stroke="#142142" strokeDasharray="3 3" />
                <line x1="0" y1="240" x2="400" y2="240" stroke="#142142" strokeDasharray="3 3" />
                <line x1="0" y1="360" x2="400" y2="360" stroke="#142142" strokeDasharray="3 3" />

                {/* Stylized Colombia Silhouette path */}
                <path
                  d="M185,45 L220,50 L250,90 L260,130 L280,160 L330,190 L380,240 L340,300 L300,380 L250,450 L210,470 L180,440 L160,370 L110,310 L70,300 L50,250 L60,200 L90,160 L120,130 L160,110 Z"
                  fill="#112044"
                  stroke="#38bdf8"
                  strokeWidth="2"
                  strokeOpacity="0.6"
                />

                {/* Regions overlay accents */}
                {/* Caribe */}
                <path d="M160,110 L250,90 L220,50 L185,45 Z" fill="#0284c7" fillOpacity="0.25" />
                {/* Andina */}
                <path d="M120,130 L260,130 L230,280 L140,310 Z" fill="#f59e0b" fillOpacity="0.2" />
                {/* Pacífica */}
                <path d="M60,200 L120,200 L120,310 L70,300 Z" fill="#10b981" fillOpacity="0.2" />
                {/* Orinoquía */}
                <path d="M260,130 L380,240 L280,280 L230,200 Z" fill="#ef4444" fillOpacity="0.2" />
                {/* Amazonía */}
                <path d="M230,280 L380,240 L300,380 L250,450 L180,370 Z" fill="#059669" fillOpacity="0.2" />

                {/* Geographic labels */}
                <text x="190" y="80" fill="#94a3b8" fontSize="10" fontWeight="bold">CARIBE</text>
                <text x="165" y="210" fill="#fde047" fontSize="11" fontWeight="bold">ANDINA</text>
                <text x="65" y="240" fill="#6ee7b7" fontSize="9" fontWeight="bold">PACÍFICA</text>
                <text x="270" y="210" fill="#fca5a5" fontSize="10" fontWeight="bold">ORINOQUÍA</text>
                <text x="230" y="360" fill="#6ee7b7" fontSize="10" fontWeight="bold">AMAZONÍA</text>

                {/* Hotspot Pins representing regions in this epoch */}
                {/* Pin 1: Santanderes / Norte */}
                <g
                  className="cursor-pointer transition-transform hover:scale-110"
                  onClick={() => {
                    sounds.playPop();
                    setSelectedRegionIndex(0);
                  }}
                >
                  <circle cx="210" cy="140" r="14" fill="#f43f5e" fillOpacity="0.3" className="animate-ping" />
                  <circle cx="210" cy="140" r="9" fill={selectedRegionIndex === 0 ? '#f43f5e' : '#fb7185'} stroke="#fff" strokeWidth="2" />
                  <text x="225" y="145" fill="#fff" fontSize="10" fontWeight="bold">Oriente / Santander</text>
                </g>

                {/* Pin 2: Bogotá / Cundinamarca */}
                <g
                  className="cursor-pointer transition-transform hover:scale-110"
                  onClick={() => {
                    sounds.playPop();
                    setSelectedRegionIndex(1 % currentEpoch.regionsDetail.length);
                  }}
                >
                  <circle cx="190" cy="220" r="14" fill="#f59e0b" fillOpacity="0.3" className="animate-ping" />
                  <circle cx="190" cy="220" r="9" fill={selectedRegionIndex === 1 ? '#f59e0b' : '#fcd34d'} stroke="#fff" strokeWidth="2" />
                  <text x="120" y="235" fill="#fde047" fontSize="10" fontWeight="bold">Bogotá / Cundinamarca</text>
                </g>

                {/* Pin 3: Tolima / Llanos / Occidente */}
                {currentEpoch.regionsDetail.length > 2 && (
                  <g
                    className="cursor-pointer transition-transform hover:scale-110"
                    onClick={() => {
                      sounds.playPop();
                      setSelectedRegionIndex(2);
                    }}
                  >
                    <circle cx="160" cy="245" r="12" fill="#38bdf8" fillOpacity="0.3" className="animate-ping" />
                    <circle cx="160" cy="245" r="8" fill={selectedRegionIndex === 2 ? '#38bdf8' : '#7dd3fc'} stroke="#fff" strokeWidth="2" />
                    <text x="90" y="260" fill="#bae6fd" fontSize="9" fontWeight="bold">Tolima / Llanos</text>
                  </g>
                )}
              </svg>

              {/* Map Legend */}
              <div className="absolute bottom-2 left-2 right-2 bg-[#090e1f]/90 border border-slate-700/60 rounded-xl p-2 flex flex-wrap items-center justify-between text-[10px] text-slate-300">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
                  <span>Zona de Máxima Tensión</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <span>Disputa & Desplazamiento</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  <span>Resistencia & Paz Civil</span>
                </div>
              </div>
            </div>

            {/* Travel to this year button */}
            <button
              onClick={() => {
                sounds.playCoin();
                onTravelToYear(currentEpoch.representativeYear);
                onClose();
              }}
              className="mt-2 w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-sky-600 via-indigo-600 to-purple-600 hover:from-sky-500 hover:to-purple-500 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
            >
              <span>🚀 Viajar en la Máquina del Tiempo al Año {currentEpoch.representativeYear}</span>
            </button>
          </div>

          {/* Right Column: Detailed Historical Investigation */}
          <div className="lg:col-span-6 flex flex-col space-y-3">
            {/* Region selection tabs */}
            <div className="flex flex-wrap gap-1.5">
              {currentEpoch.regionsDetail.map((r, i) => (
                <button
                  key={i}
                  onClick={() => {
                    sounds.playClick();
                    setSelectedRegionIndex(i);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    selectedRegionIndex === i
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-400 shadow-md'
                      : 'bg-[#12192e] text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  📍 {r.name.split('(')[0].trim()}
                </button>
              ))}
            </div>

            {/* Region Historical Card */}
            <div className="bg-[#0e1428] border-2 border-rose-500/30 rounded-2xl p-4 sm:p-5 shadow-xl space-y-3.5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <div>
                  <span className="text-[10px] font-digital uppercase text-rose-400 tracking-wider">
                    DEPARTAMENTOS Y MUNICIPIOS AFECTADOS
                  </span>
                  <h4 className="text-base sm:text-lg font-bold text-white">
                    {activeRegion.name}
                  </h4>
                  <p className="text-xs text-sky-300">
                    {activeRegion.department}
                  </p>
                </div>

                <button
                  onClick={handleSpeakRegion}
                  className="self-start sm:self-auto p-2 sm:px-3 sm:py-1.5 rounded-xl bg-sky-500/20 hover:bg-sky-500/30 text-sky-200 border border-sky-400/30 text-xs font-bold flex items-center gap-1.5 transition-all"
                  title="Escuchar narración con voz de Leo"
                >
                  <Volume2 className="w-4 h-4 text-sky-400" />
                  <span>Escuchar con Leo</span>
                </button>
              </div>

              {/* What happened here */}
              <div className="space-y-1">
                <span className="text-xs font-bold text-rose-400 flex items-center gap-1">
                  <ShieldAlert className="w-3.5 h-3.5" /> ¿Qué aconteció en esta época?
                </span>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed bg-[#0a0f20] p-3 rounded-xl border border-slate-800">
                  {activeRegion.events}
                </p>
              </div>

              {/* Impact on civilians and childhood */}
              <div className="space-y-1">
                <span className="text-xs font-bold text-amber-400 flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" /> Impacto en familias y niñez escolar:
                </span>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-[#0a0f20] p-3 rounded-xl border border-slate-800">
                  {activeRegion.impactOnCivilians}
                </p>
              </div>

              {/* Peace and Community Resistance */}
              <div className="space-y-1">
                <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                  <HeartHandshake className="w-3.5 h-3.5" /> Esfuerzos de Paz y Convivencia Ciudadana:
                </span>
                <div className="text-xs sm:text-sm text-emerald-100 leading-relaxed bg-emerald-950/20 p-3 rounded-xl border border-emerald-500/30">
                  {activeRegion.peaceEffort}
                </div>
              </div>

              {/* Reflection question for Social Sciences */}
              <div className="p-3 bg-amber-500/10 border border-amber-400/30 rounded-xl space-y-1">
                <span className="text-[11px] font-bold text-amber-300 flex items-center gap-1 uppercase tracking-wide">
                  <BookOpen className="w-3.5 h-3.5" /> Pregunta de Reflexión para tu Clase:
                </span>
                <p className="text-xs text-amber-100 italic">
                  "{activeRegion.schoolQuestion}"
                </p>
              </div>
            </div>

            {/* Bottom Back Button */}
            <button
              onClick={() => {
                sounds.playClick();
                onClose();
              }}
              className="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-bold transition-all flex items-center justify-center gap-2 border border-slate-700"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Volver a la Máquina del Tiempo</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
