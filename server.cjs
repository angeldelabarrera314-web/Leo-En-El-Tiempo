var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// server.ts
var server_exports = {};
__export(server_exports, {
  PRESET_COLOMBIA_XX: () => PRESET_COLOMBIA_XX,
  default: () => server_default
});
module.exports = __toCommonJS(server_exports);
var import_express = __toESM(require("express"), 1);
var import_path = __toESM(require("path"), 1);
var import_fs = __toESM(require("fs"), 1);
var import_vite = require("vite");
var import_genai = require("@google/genai");
var import_dotenv = __toESM(require("dotenv"), 1);
import_dotenv.default.config();
var app = (0, import_express.default)();
var PORT = 3e3;
var CANDIDATE_GEMINI_MODELS = ["gemini-3.8-flash", "gemini-2.5-flash"];
async function generateWithGeminiFallback(ai, requestConfig) {
  let lastError = null;
  for (const model of CANDIDATE_GEMINI_MODELS) {
    try {
      const response = await ai.models.generateContent({
        ...requestConfig,
        model
      });
      return response;
    } catch (err) {
      lastError = err;
      const errStr = String(err?.message || "");
      if (errStr.includes("503") || errStr.includes("demand") || errStr.includes("UNAVAILABLE") || errStr.includes("429") || errStr.includes("RESOURCE_EXHAUSTED")) {
        continue;
      }
      throw err;
    }
  }
  throw lastError;
}
app.use(import_express.default.json());
var PRESET_COLOMBIA_XX = {
  "1903": {
    yearOrEra: "1903 - Separaci\xF3n de Panam\xE1 y Nuevas Fronteras",
    title: "1903: Separaci\xF3n de Panam\xE1 y Transformaci\xF3n del Territorio",
    shortSummary: "En noviembre de 1903, Panam\xE1 proclam\xF3 su separaci\xF3n de Colombia tras complejas negociaciones internacionales sobre el canal interoce\xE1nico y el desgaste de la Guerra de los Mil D\xEDas. Este hecho redefini\xF3 las fronteras nacionales e impuls\xF3 una profunda reflexi\xF3n sobre la necesidad de conectar y atender a todas las regiones del pa\xEDs.",
    curiousFacts: [
      "Hasta 1903, el mapa oficial de Colombia inclu\xEDa el istmo de Panam\xE1, conectando geogr\xE1ficamente a Am\xE9rica Central con Am\xE9rica del Sur.",
      "En esa \xE9poca las noticias tardaban semanas en llegar a Bogot\xE1; sin carreteras ni aviaci\xF3n, el correo depend\xEDa de vapores por el r\xEDo Magdalena y mulas por caminos de herradura.",
      "El caf\xE9 colombiano comenzaba a ganar renombre mundial como el principal producto de exportaci\xF3n que financiaba el desarrollo del pa\xEDs."
    ],
    howChildrenLived: "Los ni\xF1os jugaban en las plazas con trompos de madera tallados a mano, baleros y mu\xF1ecos de trapo. En los pueblos y veredas colaboraban en las labores familiares y asist\xEDan a escuelas con materiales muy sencillos.",
    soundOrSensation: "El golpeteo r\xEDtmico del tel\xE9grafo en la oficina postal y el paso de los caballos sobre las calles empedradas.",
    leoChallenge: "Observa un mapa de Colombia de 1900 y comp\xE1ralo con el actual: \xBFqu\xE9 departamentos y fronteras cambiaron en el siglo XX?",
    timeMachineCoordinates: {
      era: "Inicios del Siglo XX - 1903",
      temporalFlux: "98.7%",
      dangerLevel: "Historia Cr\xEDtica"
    },
    colombianContext: {
      decade: "D\xE9cada de 1900",
      region: "Istmo de Panam\xE1 y Fronteras Nacionales",
      socialTheme: "Geograf\xEDa, Soberan\xEDa y Transformaci\xF3n Territorial"
    }
  },
  "1920": {
    yearOrEra: "1920 - Ferrocarriles, Caf\xE9 y la Danza de los Millones",
    title: "1920: Auge Cafetero, Ferrocarriles Nacionales y Aviaci\xF3n SCADTA",
    shortSummary: "La d\xE9cada de 1920 trajo una veloz modernizaci\xF3n a Colombia conocida como 'la danza de los millones'. Las locomotoras a vapor transportaban miles de sacos de caf\xE9 desde las cordilleras hacia los puertos fluviales, mientras en Barranquilla despegaban los primeros hidroaviones de SCADTA (hoy Avianca), convirtiendo a Colombia en pionera de la aviaci\xF3n comercial en Am\xE9rica.",
    curiousFacts: [
      "El R\xEDo Magdalena era la gran arteria del pa\xEDs: barcos de vapor con grandes ruedas de paletas llevaban pasajeros y caf\xE9 hasta la costa Caribe.",
      "Los primeros autom\xF3viles causaban asombro en las calles de Medell\xEDn, Cali y Bogot\xE1; la gente se asomaba a los balcones al escuchar sus ruidosos motores.",
      "La indemnizaci\xF3n por el canal de Panam\xE1 permiti\xF3 al Estado financiar t\xFAneles ferroviarios, puentes met\xE1licos y v\xEDas de comunicaci\xF3n."
    ],
    howChildrenLived: "Los ni\xF1os se divert\xEDan con la golosa (rayuela), elevando cometas de ca\xF1a brava y fabricando carritos con tablas y ruedas de madera.",
    soundOrSensation: "El silbido potente de la locomotora de vapor mezclado con el aroma a caf\xE9 tostado en los pueblos de la cordillera.",
    leoChallenge: "\xBFC\xF3mo cambi\xF3 el transporte de alimentos en Colombia el paso de las mulas a los trenes de vapor?",
    timeMachineCoordinates: {
      era: "A\xF1os 20 - D\xE9cada de la Modernizaci\xF3n",
      temporalFlux: "99.2%",
      dangerLevel: "Tranquilo"
    },
    colombianContext: {
      decade: "D\xE9cada de 1920",
      region: "Eje Cafetero, Valle del Magdalena y Barranquilla",
      socialTheme: "Econom\xEDa Cafetera, V\xEDas F\xE9rreas e Innovaci\xF3n Tecnol\xF3gica"
    }
  },
  "1928": {
    yearOrEra: "1928 - La Huelga de las Bananeras en Ci\xE9naga",
    title: "1928: La Lucha Social por los Derechos Laborales en el Caribe",
    shortSummary: "En noviembre y diciembre de 1928, miles de campesinos y trabajadores de las plantaciones de banano en Ci\xE9naga, Magdalena, iniciaron una hist\xF3rica huelga pac\xEDfica. Exig\xEDan jornadas dignas de 8 horas, pago en dinero real en vez de vales de tienda y atenci\xF3n m\xE9dica. Este acontecimiento sent\xF3 las bases de la legislaci\xF3n laboral y la defensa de los derechos humanos en Colombia.",
    curiousFacts: [
      "Antes de esta huelga, muchos trabajadores recib\xEDan vales que \xFAnicamente pod\xEDan canjearse en las tiendas propiedad de la misma empresa extranjera.",
      "El escritor Gabriel Garc\xEDa M\xE1rquez inmortaliz\xF3 este hito en su obra cumbre 'Cien A\xF1os de Soledad', narrando la memoria de su tierra natal.",
      "Las demandas de los trabajadores inclu\xEDan contar con botiquines m\xE9dicos en los campamentos y un d\xEDa de descanso semanal obligatorio."
    ],
    howChildrenLived: "Los hijos de los recolectores crec\xEDan en contacto con la naturaleza del Caribe, aprendiendo la sabidur\xEDa de la tierra, jugando en los ca\xF1os y compartiendo cantos tradicionales.",
    soundOrSensation: "La brisa c\xE1lida de la Ci\xE9naga Grande y los discursos de los l\xEDderes campesinos en la plaza de la estaci\xF3n.",
    leoChallenge: "\xBFPor qu\xE9 es fundamental que la ley proteja los derechos y la salud de quienes trabajan en el campo cultivando nuestros alimentos?",
    timeMachineCoordinates: {
      era: "A\xF1os 20 - Diciembre de 1928",
      temporalFlux: "96.4%",
      dangerLevel: "Aventura Hist\xF3rica"
    },
    colombianContext: {
      decade: "D\xE9cada de 1920",
      region: "Ci\xE9naga, Magdalena (Caribe Colombiano)",
      socialTheme: "Derechos de los Trabajadores y Justicia Social"
    }
  },
  "1948": {
    yearOrEra: "1948 - El 9 de Abril y El Bogotazo",
    title: "1948: El Bogotazo y la Transformaci\xF3n Urbana del Pa\xEDs",
    shortSummary: "El 9 de abril de 1948 marc\xF3 un antes y un despu\xE9s en la historia contempor\xE1nea de Colombia. El asesinato del l\xEDder popular Jorge Eli\xE9cer Gait\xE1n desat\xF3 una revuelta masiva en Bogot\xE1 y varias capitales. Este suceso transform\xF3 la fisonom\xEDa de la ciudad, llev\xF3 al fin de los tranv\xEDas el\xE9ctricos y dej\xF3 la lecci\xF3n permanente del valor insustituible del di\xE1logo, la convivencia y la paz.",
    curiousFacts: [
      "En abril de 1948 Bogot\xE1 era la sede de la Conferencia Panamericana que dio origen a la OEA (Organizaci\xF3n de los Estados Americanos).",
      "Los tranv\xEDas el\xE9ctricos que recorr\xEDan la Carrera S\xE9ptima ten\xEDan timbres de campana caracter\xEDsticos y fueron reemplazados progresivamente por buses de gasolina.",
      "Gait\xE1n convocaba multitudes hist\xF3ricas con sus c\xE9lebres discursos transmitidos por la radiodifusora nacional."
    ],
    howChildrenLived: "Los estudiantes bogotanos vest\xEDan uniformes de pa\xF1o grueso para el fr\xEDo de la sabana, jugaban a las canicas en los andenes de ladrillo y le\xEDan las historietas dominicales en los peri\xF3dicos.",
    soundOrSensation: "El repique de las campanas del tranv\xEDa sobre el asfalto mojado y los pregones de los voceadores de prensa en la Plaza de Bol\xEDvar.",
    leoChallenge: "\xBFQu\xE9 diferencias encuentras entre el transporte p\xFAblico de 1948 (el tranv\xEDa) y los sistemas que usamos hoy en las ciudades colombianas?",
    timeMachineCoordinates: {
      era: "A\xF1os 40 - Abril de 1948",
      temporalFlux: "94.8%",
      dangerLevel: "Historia Clave"
    },
    colombianContext: {
      decade: "D\xE9cada de 1940",
      region: "Bogot\xE1 y Altiplano Cundiboyacense",
      socialTheme: "Historia Pol\xEDtica, Convivencia Ciudadana y Vida Urbana"
    }
  },
  "1950": {
    yearOrEra: "1950 - Radio Sutatenza y la Educaci\xF3n Campesina",
    title: "1950: Radio Sutatenza y la Gran Revoluci\xF3n de las Escuelas Rurales",
    shortSummary: "Desde Sutatenza, Boyac\xE1, una emisora radial comunitaria revolucion\xF3 la educaci\xF3n en Am\xE9rica Latina. A trav\xE9s de radios de transistores de pilas y cartillas ilustradas de Acci\xF3n Cultural Popular, cientos de miles de campesinos aprendieron a leer, escribir, cultivar y hacer cuentas desde sus veredas, demostrando el inmenso poder de la tecnolog\xEDa al servicio de la educaci\xF3n.",
    curiousFacts: [
      "Radio Sutatenza lleg\xF3 a ser la red de radio rural m\xE1s grande del mundo, distribuyendo millones de cartillas y miles de receptores de onda corta.",
      "En las aulas de clase de los a\xF1os 50, los estudiantes mojaban plumas de metal en tinteros de cer\xE1mica encajados en sus pupitres de madera.",
      "No exist\xEDan calculadoras ni computadores escolares; las operaciones matem\xE1ticas se resolv\xEDan con tiza sobre grandes tableros negros de pizarra."
    ],
    howChildrenLived: "En las escuelas rurales, los ni\xF1os caminaban senderos veredales con sus morrales de lona, escuchando las lecciones de la emisora junto a sus padres al caer la tarde.",
    soundOrSensation: "La sinton\xEDa inconfundible de Radio Sutatenza en 810 kHz y el olor a madera encerada y tiza fresca en el aula.",
    leoChallenge: "\xBFC\xF3mo imaginas aprender una materia escolar sintonizando una clase por radio sin ninguna pantalla?",
    timeMachineCoordinates: {
      era: "A\xF1os 50 - Educaci\xF3n Rural",
      temporalFlux: "99.4%",
      dangerLevel: "Tranquilo"
    },
    colombianContext: {
      decade: "D\xE9cada de 1950",
      region: "Sutatenza (Boyac\xE1) y Veredas de Colombia",
      socialTheme: "Educaci\xF3n Popular, Alfabetizaci\xF3n y Cultura Campesina"
    }
  },
  "1954": {
    yearOrEra: "1954 - Llegada de la Televisi\xF3n a Colombia",
    title: "1954: Primera Transmisi\xF3n de Televisi\xF3n en Blanco y Negro",
    shortSummary: "El 13 de junio de 1954 se encendi\xF3 por primera vez la se\xF1al de televisi\xF3n en Colombia. Emitida desde los s\xF3tanos de la Biblioteca Nacional de Bogot\xE1, la primera transmisi\xF3n conect\xF3 al pa\xEDs con una tecnolog\xEDa revolucionaria. Familias enteras se congregaban en las salas para contemplar asombradas las primeras im\xE1genes en blanco y negro.",
    curiousFacts: [
      "Los televisores eran tan novedosos y costosos que los primeros due\xF1os invitaban a vecinos y familiares a presenciar las emisiones nocturnas.",
      "Las c\xE1maras de televisi\xF3n de la \xE9poca generaban un calor sofocante, obligando a los t\xE9cnicos a utilizar ventiladores industriales en el estudio.",
      "Todos los programas se transmit\xEDan estrictamente en directo: actores, m\xFAsicos y locutores actuaban sin margen de error ante los televidentes."
    ],
    howChildrenLived: "Los ni\xF1os vivieron la fascinaci\xF3n de los primeros t\xEDteres y cuentos infantiles televisados, turn\xE1ndose con sus hermanos para observar la peque\xF1a pantalla de vidrio.",
    soundOrSensation: "El zumbido electroest\xE1tico del tubo de rayos cat\xF3dicos, la cuenta regresiva del director y la emoci\xF3n colectiva en los hogares.",
    leoChallenge: "\xBFQu\xE9 impacto tuvo la televisi\xF3n para unir a las distintas regiones de Colombia a trav\xE9s de las noticias y la m\xFAsica?",
    timeMachineCoordinates: {
      era: "A\xF1os 50 - Junio de 1954",
      temporalFlux: "98.9%",
      dangerLevel: "Tranquilo"
    },
    colombianContext: {
      decade: "D\xE9cada de 1950",
      region: "Bogot\xE1 y Red Nacional de Medios",
      socialTheme: "Ciencia, Telecomunicaciones y Cultura Audiovisual"
    }
  },
  "1957": {
    yearOrEra: "1957 - El Plebiscito y el Hist\xF3rico Voto Femenino",
    title: "1957: Conquista Hist\xF3rica del Voto Femenino en Colombia",
    shortSummary: "El 1 de diciembre de 1957, tras d\xE9cadas de valientes liderazgos de mujeres colombianas como Esmeralda Arboleda y Josefina Valencia, las mujeres ejercieron por primera vez su derecho al voto en el plebiscito nacional. Cerca de dos millones de ciudadanas acudieron a las urnas con su nueva c\xE9dula, consolidando un paso trascendental para la democracia y la equidad de g\xE9nero en el pa\xEDs.",
    curiousFacts: [
      "La C\xE9dula de Ciudadan\xEDa n\xFAmero 20.000.001 fue la primera c\xE9dula oficial expedida a una mujer en la historia colombiana.",
      "Hasta 1957 las leyes colombianas consideraban \xFAnicamente a los hombres aptos para elegir presidentes, senadores y concejales.",
      "La participaci\xF3n femenina super\xF3 ampliamente las expectativas de las autoridades, llenando las mesas de votaci\xF3n en un ambiente festivo y pac\xEDfico."
    ],
    howChildrenLived: "Las ni\xF1as acompa\xF1aron a sus madres y abuelas a los puestos de votaci\xF3n, siendo testigos de un cambio social que les abrir\xEDa el camino a la educaci\xF3n superior y cargos p\xFAblicos.",
    soundOrSensation: "El murmullo alegre de las filas ciudadanas, las marchas c\xEDvicas en la radio y el orgullo general en las calles.",
    leoChallenge: "\xBFPor qu\xE9 la igualdad de derechos pol\xEDticos entre mujeres y hombres es indispensable para el bienestar de toda la sociedad?",
    timeMachineCoordinates: {
      era: "A\xF1os 50 - Diciembre de 1957",
      temporalFlux: "99.5%",
      dangerLevel: "Tranquilo"
    },
    colombianContext: {
      decade: "D\xE9cada de 1950",
      region: "Territorio Nacional de Colombia",
      socialTheme: "Democracia, Derechos Civiles e Igualdad de G\xE9nero"
    }
  },
  "1970": {
    yearOrEra: "1970 - Juegos Populares de Barrio y Crecimiento Urbano",
    title: "1970: Tradici\xF3n de Juegos de Barrio, M\xFAsica Tropical y Vida Vecinal",
    shortSummary: "En la d\xE9cada de 1970, el crecimiento urbano convirti\xF3 a las calles de las ciudades colombianas en vibrantes espacios comunitarios. Ni\xF1as y ni\xF1os sal\xEDan al salir de la escuela a compartir juegos populares como el trompo de madera, la golosa, las canicas (piquis), el lazo y partidos de f\xFAtbol con piedras como arcos, fortaleciendo la amistad vecinal y la creatividad.",
    curiousFacts: [
      "El trompo de guayac\xE1n era el rey del recreo: los ni\xF1os practicaban habilidades complejas como 'hacerlo bailar en la palma' o 'el puente a\xE9reo'.",
      "La m\xFAsica se escuchaba en discos de vinilo de 33 y 45 RPM o en los primeros casetes grabados de las emisoras juveniles.",
      "Ciudades como Cali, Medell\xEDn y Barranquilla se expandieron con nuevos barrios donde los vecinos organizaban bazares y semanas culturales."
    ],
    howChildrenLived: "Sin tel\xE9fonos m\xF3viles ni consolas de videojuegos, la diversi\xF3n infantil transcurr\xEDa al aire libre: los amigos se llamaban de puerta a puerta y jugaban hasta la puesta de sol.",
    soundOrSensation: "El choque cristalino de las canicas sobre la tierra, los zumbidos de los trompos girando y la m\xFAsica de salsa y cumbia desde las casas vecinas.",
    leoChallenge: "Preg\xFAntale a una persona mayor de tu familia cu\xE1l era su juego de calle favorito en su infancia y ens\xE1yalo en tu colegio.",
    timeMachineCoordinates: {
      era: "A\xF1os 70 - Cultura Popular",
      temporalFlux: "99.1%",
      dangerLevel: "Tranquilo"
    },
    colombianContext: {
      decade: "D\xE9cada de 1970",
      region: "Barrios Populares de Colombia",
      socialTheme: "Juegos Tradicionales, Identidad Cultural y Urbanismo"
    }
  },
  "1982": {
    yearOrEra: "1982 - El Premio Nobel de Gabriel Garc\xEDa M\xE1rquez",
    title: "1982: Gabriel Garc\xEDa M\xE1rquez y el Premio Nobel de Literatura",
    shortSummary: "En diciembre de 1982, la literatura colombiana alcanz\xF3 la m\xE1xima cumbre universal cuando Gabriel Garc\xEDa M\xE1rquez recibi\xF3 el Premio Nobel en Estocolmo, Suecia. Fiel a su identidad caribe\xF1a, visti\xF3 un tradicional liquiliqui blanco de lino y estuvo acompa\xF1ado por una delegaci\xF3n de cumbiamberos y vallenateros, demostrando que la cultura de nuestra tierra dialoga con el mundo entero.",
    curiousFacts: [
      "Gabo eligi\xF3 el liquiliqui tradicional de la costa caribe\xF1a en vez del frac negro europeo como homenaje a sus ra\xEDces latinoamericanas.",
      "En el banquete real sueco sonaron la flauta de millo y el acorde\xF3n vallenato, contagiando de entusiasmo a personalidades de todo el planeta.",
      "'Cien A\xF1os de Soledad' se ha traducido a m\xE1s de 40 idiomas, inspirando a lectores y escritores de todos los continentes."
    ],
    howChildrenLived: "En las escuelas colombianas, los estudiantes celebraron montando obras de teatro con mariposas amarillas de papel y descubriendo en las bibliotecas escolares los relatos de Macondo.",
    soundOrSensation: "El comp\xE1s cadencioso de la cumbia colombiana en el fr\xEDo invernal de Estocolmo y los aplausos de pie en el gran auditorio.",
    leoChallenge: "\xBFPor qu\xE9 crees que las historias nacidas en un peque\xF1o pueblo como Aracataca lograron emocionar a lectores de Jap\xF3n, Francia o Egipto?",
    timeMachineCoordinates: {
      era: "A\xF1os 80 - Diciembre de 1982",
      temporalFlux: "99.0%",
      dangerLevel: "Tranquilo"
    },
    colombianContext: {
      decade: "D\xE9cada de 1980",
      region: "Caribe Colombiano y Escena Internacional",
      socialTheme: "Literatura Universal, Patrimonio Cultural y Expresi\xF3n Art\xEDstica"
    }
  },
  "1991": {
    yearOrEra: "1991 - La Constituci\xF3n Pol\xEDtica y los Derechos de la Ni\xF1ez",
    title: "1991: La Nueva Constituci\xF3n y la Primac\xEDa de los Derechos de los Ni\xF1os",
    shortSummary: "En julio de 1991, la Asamblea Nacional Constituyente promulg\xF3 la nueva Carta Magna de Colombia. Fue el fruto de un amplio acuerdo democr\xE1tico impulsado por el movimiento estudiantil de la 'S\xE9ptima Papeleta'. La Constituci\xF3n reconoci\xF3 a Colombia como un pa\xEDs pluri\xE9tnico y multicultural, cre\xF3 la Acci\xF3n de Tutela y consagr\xF3 en su Art\xEDculo 44 que los derechos de los ni\xF1os prevalecen sobre los de todos los dem\xE1s.",
    curiousFacts: [
      "La Constituci\xF3n de 1991 reconoci\xF3 formalmente la diversidad \xE9tnica del pa\xEDs, garantizando los derechos de pueblos ind\xEDgenas y afrocolombianos.",
      "La Acci\xF3n de Tutela se convirti\xF3 en el instrumento legal m\xE1s \xE1gil y eficaz para que cualquier ciudadano o menor de edad defienda su salud y educaci\xF3n.",
      "En las escuelas naci\xF3 la figura del personero estudiantil para que los alumnos practiquen la participaci\xF3n democr\xE1tica desde el aula."
    ],
    howChildrenLived: "Los estudiantes recibieron cartillas pedag\xF3gicas ilustradas de la Constituci\xF3n y debatieron en clase sus derechos y responsabilidades como j\xF3venes ciudadanos.",
    soundOrSensation: "Los discursos solemnes en el Centro de Convenciones de Bogot\xE1 y la lectura del pre\xE1mbulo constitucional en transmisi\xF3n nacional.",
    leoChallenge: "\xBFPor qu\xE9 el Art\xEDculo 44 de la Constituci\xF3n establece que los derechos fundamentales de los ni\xF1os van primero que cualquier otro inter\xE9s?",
    timeMachineCoordinates: {
      era: "A\xF1os 90 - Julio de 1991",
      temporalFlux: "99.8%",
      dangerLevel: "Tranquilo"
    },
    colombianContext: {
      decade: "D\xE9cada de 1990",
      region: "Territorio Nacional de Colombia",
      socialTheme: "Constituci\xF3n Pol\xEDtica, Derechos Fundamentales y Democracia Participativa"
    }
  }
};
function findPreset(query) {
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
  if (q.includes("190") || q.includes("mil dias")) return PRESET_COLOMBIA_XX["1903"];
  if (q.includes("192")) return PRESET_COLOMBIA_XX["1920"];
  if (q.includes("194")) return PRESET_COLOMBIA_XX["1948"];
  if (q.includes("195")) return PRESET_COLOMBIA_XX["1950"];
  if (q.includes("197")) return PRESET_COLOMBIA_XX["1970"];
  if (q.includes("198")) return PRESET_COLOMBIA_XX["1982"];
  if (q.includes("199")) return PRESET_COLOMBIA_XX["1991"];
  return null;
}
app.post("/api/time-travel", async (req, res) => {
  const { query } = req.body;
  if (!query || typeof query !== "string") {
    return res.status(400).json({ error: "Por favor proporciona un a\xF1o o pregunta de Colombia en el siglo XX." });
  }
  const cleanQuery = query.trim();
  if (process.env.GEMINI_API_KEY) {
    try {
      const ai = new import_genai.GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build"
          }
        }
      });
      const prompt = `Act\xFAa como el gu\xEDa educativo e historiador de la expedici\xF3n "Leo en el Tiempo".
Tu misi\xF3n es EXCLUSIVAMENTE ense\xF1ar sobre COLOMBIA EN EL SIGLO XX (1900 a 1999) para estudiantes escolares de Ciencias Sociales (primaria y secundaria).

CONSULTA O A\xD1O A INVESTIGAR: "${cleanQuery}".

DIRECTRICES DE REDACCI\xD3N (CR\xCDTICO):
1. NARRATIVA HIST\xD3RICA NATURAL Y CAUTIVADORA: NUNCA repitas mec\xE1nicamente frases en primera persona ("Yo vi...", "Yo descubr\xED...", "Yo sent\xED..."). Narra los acontecimientos hist\xF3ricos reales de Colombia de manera fluida, asombrosa y educativa ("En 1954...", "Las familias se congregaban...", "Los trenes a vapor cruzaban...", "Los estudiantes aprend\xEDan...").
2. ENFOQUE EXCLUSIVO EN COLOMBIA (1900 - 1999): Toda la informaci\xF3n debe tratar sobre la historia, geograf\xEDa, cultura, inventos y transformaciones sociales de Colombia en el siglo XX.
3. SI PIDEN UN A\xD1O FUERA DEL SIGLO XX: Explica en una sola frase pedag\xF3gica que la m\xE1quina se enfoca en Colombia entre 1900 y 1999 y con\xE9ctalo de inmediato con el hito colombiano m\xE1s af\xEDn.
4. RIGOR HIST\xD3RICO Y RESPETO PEDAG\xD3GICO: Enf\xF3cate en c\xF3mo viv\xEDan las personas, la vida cotidiana, la educaci\xF3n, los juegos infantiles, los medios de transporte y los derechos ciudadanos.

Devuelve estrictamente un JSON con esta estructura:
{
  "yearOrEra": "A\xF1o o \xE9poca colombiana (ej. '1948 - Bogot\xE1 y el 9 de Abril')",
  "title": "T\xEDtulo hist\xF3rico claro y llamativo (ej. '1948: El Bogotazo y la Transformaci\xF3n Urbana')",
  "shortSummary": "Resumen hist\xF3rico fluido y educativo de 2 o 3 oraciones sobre el acontecimiento en Colombia.",
  "curiousFacts": [
    "Dato hist\xF3rico curioso #1 narrado de forma directa y asombrosa.",
    "Dato hist\xF3rico curioso #2 sobre inventos, tecnolog\xEDa o costumbres.",
    "Dato hist\xF3rico curioso #3 sobre el impacto en las regiones colombianas."
  ],
  "howChildrenLived": "Explicaci\xF3n de 1 o 2 oraciones sobre c\xF3mo jugaban, estudiaban o viv\xEDan los ni\xF1os de esa \xE9poca en Colombia.",
  "soundOrSensation": "Paisaje sonoro y sensorial evocador de la Colombia de ese momento.",
  "leoChallenge": "Pregunta reflexiva o reto de aprendizaje para debatir en la clase de Ciencias Sociales.",
  "timeMachineCoordinates": {
    "era": "Periodo en Colombia (ej. 'A\xF1os 40 en Colombia')",
    "temporalFlux": "98.5%",
    "dangerLevel": "'Tranquilo', 'Aventura Hist\xF3rica' o 'Historia Clave'"
  },
  "colombianContext": {
    "decade": "D\xE9cada de 1940",
    "region": "Regi\xF3n Andina y Sabana de Bogot\xE1",
    "socialTheme": "Historia Pol\xEDtica, Convivencia y Vida Urbana"
  }
}`;
      const response = await generateWithGeminiFallback(ai, {
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: import_genai.Type.OBJECT,
            properties: {
              yearOrEra: { type: import_genai.Type.STRING },
              title: { type: import_genai.Type.STRING },
              shortSummary: { type: import_genai.Type.STRING },
              curiousFacts: {
                type: import_genai.Type.ARRAY,
                items: { type: import_genai.Type.STRING }
              },
              howChildrenLived: { type: import_genai.Type.STRING },
              soundOrSensation: { type: import_genai.Type.STRING },
              leoChallenge: { type: import_genai.Type.STRING },
              timeMachineCoordinates: {
                type: import_genai.Type.OBJECT,
                properties: {
                  era: { type: import_genai.Type.STRING },
                  temporalFlux: { type: import_genai.Type.STRING },
                  dangerLevel: { type: import_genai.Type.STRING }
                },
                required: ["era", "temporalFlux", "dangerLevel"]
              },
              colombianContext: {
                type: import_genai.Type.OBJECT,
                properties: {
                  decade: { type: import_genai.Type.STRING },
                  region: { type: import_genai.Type.STRING },
                  socialTheme: { type: import_genai.Type.STRING }
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
    } catch (_err) {
    }
  }
  const preset = findPreset(cleanQuery);
  if (preset) {
    return res.json({
      success: true,
      source: "preset",
      data: preset
    });
  }
  const numericYear = parseInt(cleanQuery.replace(/\D/g, ""), 10);
  let fallbackData;
  if (numericYear && numericYear >= 1900 && numericYear <= 1999) {
    const decade = Math.floor((numericYear - 1900) / 10) * 10;
    fallbackData = {
      yearOrEra: `${numericYear} - Colombia en el Siglo XX`,
      title: `${numericYear}: Acontecimientos e Historia de Colombia`,
      shortSummary: `En el a\xF1o ${numericYear}, Colombia transitaba por la d\xE9cada de 19${decade < 10 ? "0" + decade : decade}, una etapa de transformaciones en el campo y en las ciudades. Durante este periodo, las familias colombianas construyeron comunidades unidas a trav\xE9s del trabajo agr\xEDcola, la llegada de nuevos medios de transporte y una rica cultura popular.`,
      curiousFacts: [
        `En el a\xF1o ${numericYear}, el tel\xE9grafo, el correo postal y la radio de onda corta eran los medios primordiales para conectar las diversas regiones del territorio colombiano.`,
        `La producci\xF3n cafetera en las cordilleras continuaba siendo un pilar fundamental para financiar obras de infraestructura, escuelas y hospitales en todo el pa\xEDs.`,
        `En las plazas de mercado de pueblos y capitales se comerciaban productos agr\xEDcolas transportados a lomo de mula, en chivas tradicionales o en trenes de carga.`
      ],
      howChildrenLived: `Los estudiantes asist\xEDan a la escuela con cuadernos de dibujo y pizarras o tinteros, y compart\xEDan en las calles juegos como el trompo de madera, las canicas y la golosa.`,
      soundOrSensation: `El repique de las campanas de la iglesia en la plaza central, el bullicio de los mercados campesinos y las melod\xEDas tradicionales en las radios comunitarias.`,
      leoChallenge: `Investiga qu\xE9 personas de tu familia o comunidad viv\xEDan en Colombia en el a\xF1o ${numericYear} y qu\xE9 an\xE9cdota recuerdan de esa d\xE9cada.`,
      timeMachineCoordinates: {
        era: `Colombia - D\xE9cada de 19${decade < 10 ? "0" + decade : decade}`,
        temporalFlux: "98.9%",
        dangerLevel: "Tranquilo"
      },
      colombianContext: {
        decade: `A\xF1os ${decade}s`,
        region: "Regi\xF3n Andina y Zonas Cafeteras",
        socialTheme: "Vida Cotidiana e Historia Social"
      }
    };
  } else {
    fallbackData = {
      yearOrEra: "Colombia \u2022 Siglo XX (1900 - 1999)",
      title: `Archivo Hist\xF3rico de Colombia: "${cleanQuery}"`,
      shortSummary: `El archivo cu\xE1ntico de la expedici\xF3n se enfoca en el siglo XX de Colombia (1900 a 1999) para el \xE1rea de Ciencias Sociales. En estas diez d\xE9cadas, el pa\xEDs experiment\xF3 una profunda modernizaci\xF3n en sus medios de transporte, educaci\xF3n p\xFAblica, medios de comunicaci\xF3n y derechos ciudadanos.`,
      curiousFacts: [
        "A lo largo del siglo XX, Colombia transit\xF3 de caminos de herradura y navegaci\xF3n fluvial por el Magdalena a redes de carreteras, ferrocarriles nacionales y aviaci\xF3n comercial.",
        "La educaci\xF3n popular y rural avanz\xF3 con modelos pioneros como Radio Sutatenza, llevando alfabetizaci\xF3n a millones de hogares campesinos.",
        "La m\xFAsica tradicional \u2014la cumbia, el vallenato, el bambuco y el pasillo\u2014 se consolid\xF3 como patrimonio cultural transmitido por la radio y las grabaciones sonoras."
      ],
      howChildrenLived: "Las generaciones del siglo XX crecieron creando sus propios juegos con trompos, baleros, canicas y cometas de ca\xF1a, en constante interacci\xF3n con sus vecinos de barrio y comunidad.",
      soundOrSensation: "El aroma a caf\xE9 reci\xE9n colado en los fogones y las emisiones de radio de tubos al atardecer en las salas familiares.",
      leoChallenge: "Selecciona una de las d\xE9cadas del siglo XX colombiano en la m\xE1quina del tiempo para explorar sus hitos y transformaciones m\xE1s destacadas.",
      timeMachineCoordinates: {
        era: "Colombia - Siglo XX",
        temporalFlux: "99.5%",
        dangerLevel: "Tranquilo"
      },
      colombianContext: {
        decade: "Siglo XX (1900-1999)",
        region: "Colombia Pluri\xE9tnica y Multicultural",
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
app.post("/api/leo-chat", async (req, res) => {
  const { message, eraContext } = req.body || {};
  const userMsg = (message || "").toString().trim();
  if (!userMsg) {
    return res.status(400).json({ error: "Mensaje vac\xEDo" });
  }
  if (process.env.GEMINI_API_KEY) {
    try {
      const ai = new import_genai.GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const prompt = `Eres el gu\xEDa historiador y asistente de la m\xE1quina del tiempo de Colombia en el siglo XX (1900 a 1999).
Est\xE1s respondiendo las dudas de un estudiante de Ciencias Sociales.

DIRECTIVAS ESENCIALES:
1. NUNCA satures con frases repetitivas en primera persona ("Yo vi...", "Yo descubr\xED...").
2. Responde con hechos hist\xF3ricos reales, claros, concisos y pedag\xF3gicos sobre Colombia en el siglo XX.
3. M\xE1ximo 2 o 3 oraciones directas al grano, sin ch\xE1chara ni rodeos.
4. Si preguntan algo fuera de Colombia o del siglo XX, reorienta brevemente al siglo XX colombiano.
Contexto de navegaci\xF3n actual: ${eraContext || "Colombia en el Siglo XX"}.

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
    } catch (_err) {
    }
  }
  const lower = userMsg.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  let fallbackReply = "";
  if (lower.includes("hola") || lower.includes("quien eres") || lower.includes("como te llamas")) {
    fallbackReply = "\xA1Hola! Soy Leo, tu gu\xEDa en la m\xE1quina del tiempo. Preg\xFAntame sobre cualquier acontecimiento, invento o costumbre de Colombia en el siglo XX.";
  } else if (lower.includes("panama") || lower.includes("1903")) {
    fallbackReply = "En noviembre de 1903 Panam\xE1 proclam\xF3 su separaci\xF3n de Colombia con apoyo de Estados Unidos para la construcci\xF3n del canal, redefiniendo las fronteras de nuestro pa\xEDs.";
  } else if (lower.includes("tren") || lower.includes("locomotora") || lower.includes("ferrocarril")) {
    fallbackReply = "Las locomotoras a vapor de los Ferrocarriles Nacionales fueron el coraz\xF3n del comercio cafetero en los a\xF1os 20, bajando sacos de caf\xE9 desde las cordilleras hacia los puertos del R\xEDo Magdalena.";
  } else if (lower.includes("scadta") || lower.includes("avion") || lower.includes("avianca") || lower.includes("vuelo")) {
    fallbackReply = "En 1919 naci\xF3 en Barranquilla SCADTA (hoy Avianca), la primera aerol\xEDnea comercial de Am\xE9rica. Sus hidroaviones acortaron viajes de semanas en barco a pocas horas de vuelo.";
  } else if (lower.includes("bananera") || lower.includes("cienaga") || lower.includes("1928") || lower.includes("huelga")) {
    fallbackReply = "En 1928, los trabajadores de las plantaciones bananeras en Ci\xE9naga exigieron jornadas de 8 horas, atenci\xF3n m\xE9dica y salarios en dinero en vez de vales, un hito fundacional de los derechos laborales.";
  } else if (lower.includes("tranvia") || lower.includes("bogota") || lower.includes("gaitan") || lower.includes("1948") || lower.includes("bogotazo")) {
    fallbackReply = "Hasta abril de 1948, Bogot\xE1 contaba con una extensa red de tranv\xEDas el\xE9ctricos por la Carrera S\xE9ptima. Tras el 9 de abril, la ciudad moderniz\xF3 su trazado y los sustituy\xF3 por buses a gasolina.";
  } else if (lower.includes("sutatenza") || lower.includes("radio")) {
    fallbackReply = "Radio Sutatenza fue fundada en 1947 en Boyac\xE1. A trav\xE9s de radios de pilas y cartillas de Acci\xF3n Cultural Popular, ense\xF1\xF3 a leer y escribir a millones de familias campesinas colombianas.";
  } else if (lower.includes("escuela") || lower.includes("colegio") || lower.includes("estudiar") || lower.includes("tintero")) {
    fallbackReply = "A mediados del siglo XX las escuelas usaban pupitres de madera con orificios para tinteros de cer\xE1mica y plumas met\xE1licas. Las lecciones se escrib\xEDan con tiza en tableros de pizarra.";
  } else if (lower.includes("television") || lower.includes("tv") || lower.includes("1954")) {
    fallbackReply = "La televisi\xF3n lleg\xF3 a Colombia el 13 de junio de 1954. La primera transmisi\xF3n se emiti\xF3 en blanco y negro desde la Biblioteca Nacional de Bogot\xE1 para receptores de tubo al vac\xEDo.";
  } else if (lower.includes("voto") || lower.includes("mujer") || lower.includes("femenino") || lower.includes("1957")) {
    fallbackReply = "El 1 de diciembre de 1957 las mujeres colombianas votaron por primera vez en el plebiscito nacional, logrando la ciudadan\xEDa plena y el derecho a elegir y ser elegidas.";
  } else if (lower.includes("juego") || lower.includes("trompo") || lower.includes("golosa") || lower.includes("canica") || lower.includes("piqui")) {
    fallbackReply = "En los a\xF1os 70 los ni\xF1os se reun\xEDan en las calles a jugar al trompo de madera zumbador, la golosa con tiza, las canicas (piquis), el balero y partidos de f\xFAtbol con piedras como arcos.";
  } else if (lower.includes("gabo") || lower.includes("garcia marquez") || lower.includes("nobel") || lower.includes("1982") || lower.includes("aracataca")) {
    fallbackReply = "Gabriel Garc\xEDa M\xE1rquez recibi\xF3 el Premio Nobel de Literatura en 1982 en Estocolmo vistiendo un tradicional liquiliqui blanco caribe\xF1o al son de cumbias y vallenatos.";
  } else if (lower.includes("constitucion") || lower.includes("1991") || lower.includes("tutela") || lower.includes("septima papeleta")) {
    fallbackReply = "La Constituci\xF3n de 1991 reconoci\xF3 la diversidad \xE9tnica y cultural de Colombia, cre\xF3 la Acci\xF3n de Tutela y estableci\xF3 en su Art\xEDculo 44 que los derechos de los ni\xF1os prevalecen sobre todos los dem\xE1s.";
  } else if (lower.includes("cafe") || lower.includes("cafetero")) {
    fallbackReply = "El caf\xE9 colombiano fue el producto estrella del siglo XX; sus exportaciones financiaron v\xEDas f\xE9rreas, acueductos, escuelas y la fundaci\xF3n de numerosas ciudades en el Eje Cafetero.";
  } else if (lower.includes("comida") || lower.includes("plato") || lower.includes("arepa") || lower.includes("sancocho")) {
    fallbackReply = "La gastronom\xEDa del siglo XX destacaba por las arepas de ma\xEDz pelado al carb\xF3n, el sancocho de le\xF1a, el ajiaco santafere\xF1o y el chocolate caliente con queso servido en jarros de peltre.";
  } else if (lower.includes("musica") || lower.includes("cumbia") || lower.includes("vallenato") || lower.includes("bambuco")) {
    fallbackReply = "La m\xFAsica del siglo XX integr\xF3 el bambuco y pasillo en la zona Andina con la cumbia y el vallenato en el Caribe, difundi\xE9ndose masivamente a trav\xE9s de discos de acetato y la radiodifusi\xF3n.";
  } else {
    fallbackReply = `En el siglo XX de Colombia, ese aspecto form\xF3 parte de la gran transici\xF3n del pa\xEDs: de una naci\xF3n predominantemente rural con caminos de herradura hacia un pa\xEDs urbano, diverso y conectado por medios masivos.`;
  }
  return res.json({
    success: true,
    reply: fallbackReply,
    source: "colombia-local-engine"
  });
});
app.post("/api/homework-helper", async (req, res) => {
  const { query, mode = "summary", currentYear, eraContext } = req.body;
  if (!query || typeof query !== "string") {
    return res.status(400).json({ error: "Por favor escribe tu duda o tema de tarea escolar." });
  }
  const cleanQuery = query.trim();
  if (process.env.GEMINI_API_KEY) {
    try {
      const ai = new import_genai.GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const prompt = `Eres el Tutor de Tareas Escolares de Ciencias Sociales de Colombia en el Siglo XX (1900 a 1999).
Un estudiante de primaria o secundaria te pide ayuda con su tarea o estudio sobre: "${cleanQuery}".
Contexto temporal / a\xF1o de referencia: ${currentYear || eraContext || "Colombia Siglo XX"}.
Modalidad solicitada: "${mode}".

INSTRUCCIONES PEDAG\xD3GICAS ESCOLARES:
1. Responde de forma clara, did\xE1ctica, precisa y ver\xEDdica para el \xE1rea de Ciencias Sociales.
2. Adapta la respuesta a lenguaje escolar colombiano (amigable, estructurado, sin rodeos ni tecnicismos confusos).
3. Genera un JSON estrictamente estructurado seg\xFAn el esquema solicitado.`;
      const response = await generateWithGeminiFallback(ai, {
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: import_genai.Type.OBJECT,
            properties: {
              title: { type: import_genai.Type.STRING },
              content: { type: import_genai.Type.STRING },
              notebookDraft: { type: import_genai.Type.STRING },
              bulletPoints: {
                type: import_genai.Type.ARRAY,
                items: { type: import_genai.Type.STRING }
              },
              keyDates: {
                type: import_genai.Type.ARRAY,
                items: {
                  type: import_genai.Type.OBJECT,
                  properties: {
                    year: { type: import_genai.Type.STRING },
                    event: { type: import_genai.Type.STRING }
                  },
                  required: ["year", "event"]
                }
              },
              posterIdeas: {
                type: import_genai.Type.OBJECT,
                properties: {
                  title: { type: import_genai.Type.STRING },
                  slogan: { type: import_genai.Type.STRING },
                  drawRecommendation: { type: import_genai.Type.STRING }
                },
                required: ["title", "slogan", "drawRecommendation"]
              },
              studyQuiz: {
                type: import_genai.Type.ARRAY,
                items: {
                  type: import_genai.Type.OBJECT,
                  properties: {
                    question: { type: import_genai.Type.STRING },
                    answer: { type: import_genai.Type.STRING }
                  },
                  required: ["question", "answer"]
                }
              },
              funFactForClass: { type: import_genai.Type.STRING }
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
    } catch (_err) {
    }
  }
  const lower = cleanQuery.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  let topicTitle = "Tema de Ciencias Sociales: Colombia en el Siglo XX";
  let content = "Durante el siglo XX Colombia pas\xF3 de ser un pa\xEDs mayoritariamente rural y aislado entre cordilleras a una naci\xF3n urbana e integrada mediante trenes, radio, televisi\xF3n y nuevas leyes democr\xE1ticas.";
  let notebookDraft = `CUADERNO DE CIENCIAS SOCIALES
Tema: ${cleanQuery}

1. Resumen: En el siglo XX colombiano se produjeron grandes transformaciones que mejoraron los derechos ciudadanos, la educaci\xF3n y las comunicaciones.
2. Conclusi\xF3n: Conocer nuestra historia nos ense\xF1a a valorar la convivencia, el trabajo comunitario y la diversidad de Colombia.`;
  let bulletPoints = [
    "Las v\xEDas de transporte (trenes a vapor, carreteras y barcos por el R\xEDo Magdalena) conectaron los pueblos con las ciudades.",
    "El cultivo del caf\xE9 impuls\xF3 la econom\xEDa familiar y financi\xF3 obras p\xFAblicas vitales.",
    "Los medios de comunicaci\xF3n masivos como la radio comunitaria y la televisi\xF3n permitieron educar e informar a millones de familias."
  ];
  let keyDates = [
    { year: "1903", event: "Separaci\xF3n de Panam\xE1 tras la Guerra de los Mil D\xEDas." },
    { year: "1954", event: "Inauguraci\xF3n de la primera se\xF1al de televisi\xF3n nacional." },
    { year: "1957", event: "Las mujeres colombianas ejercen por primera vez el voto." },
    { year: "1991", event: "Promulgaci\xF3n de la nueva Constituci\xF3n Pol\xEDtica de Colombia." }
  ];
  let posterIdeas = {
    title: "\xA1Exploradores de Colombia en el Siglo XX!",
    slogan: "De los ferrocarriles a vapor a la era de las telecomunicaciones.",
    drawRecommendation: "Dibuja una l\xEDnea de tiempo con un tren cafetero, una radio de madera y un libro de la Constituci\xF3n."
  };
  let studyQuiz = [
    {
      question: "\xBFCu\xE1l fue el principal producto agr\xEDcola que impuls\xF3 la econom\xEDa de Colombia en el siglo XX?",
      answer: "El caf\xE9, cultivado en las monta\xF1as de las cordilleras y transportado por trenes y el R\xEDo Magdalena."
    },
    {
      question: "\xBFEn qu\xE9 a\xF1o votaron por primera vez las mujeres en Colombia?",
      answer: "En 1957, durante el plebiscito nacional del 1 de diciembre."
    }
  ];
  let funFactForClass = "Dato para tu profesor: En los a\xF1os 50 las escuelas rurales aprend\xEDan a leer por la radio gracias a Radio Sutatenza y sus cartillas ilustradas.";
  if (lower.includes("television") || lower.includes("tv") || lower.includes("1954")) {
    topicTitle = "La Llegada de la Televisi\xF3n a Colombia (1954)";
    content = "El 13 de junio de 1954 se inaugur\xF3 la primera transmisi\xF3n oficial de televisi\xF3n en Colombia. Como muy pocas familias ten\xEDan televisor en casa, la gente se reun\xEDa en las vitrinas de almacenes en el centro de Bogot\xE1 para contemplar este milagro tecnol\xF3gico.";
    notebookDraft = `CIENCIAS SOCIALES: LA TELEVISI\xD3N EN COLOMBIA (1954)
\u2022 Fecha clave: 13 de junio de 1954 (Gobierno de Gustavo Rojas Pinilla).
\u2022 \xBFC\xF3mo funcionaba?: Transmisiones en blanco y negro con tubos de rayos cat\xF3dicos.
\u2022 Impacto social: Transform\xF3 las reuniones familiares y la difusi\xF3n de noticias y cultura nacional.`;
    bulletPoints = [
      "La primera emisi\xF3n present\xF3 el Himno Nacional interpretado por la Orquesta Sinf\xF3nica de Colombia.",
      "Los equipos fueron importados de Alemania y Estados Unidos e instalados en el Palacio de San Carlos.",
      "Conect\xF3 la capital con antenas repetidoras en el cerro de Manjui para alcanzar varias regiones."
    ];
    keyDates = [
      { year: "13 Jun 1954", event: "Primera emisi\xF3n oficial de la televisi\xF3n colombiana." },
      { year: "1979", event: "Llegada de la televisi\xF3n a color a las pantallas colombianas." }
    ];
    posterIdeas = {
      title: "1954: \xA1Se Enciende la Pantalla en Colombia!",
      slogan: "La televisi\xF3n: una ventana al mundo para las familias colombianas.",
      drawRecommendation: "Dibuja un televisor de madera con antena de conejo y una familia asombrada frente a \xE9l."
    };
    funFactForClass = "Los primeros televisores eran tan pesados que ven\xEDan empotrados en elegantes muebles de caoba con puertas correderas.";
  } else if (lower.includes("tren") || lower.includes("ferrocarril") || lower.includes("vapor") || lower.includes("1920")) {
    topicTitle = "Los Ferrocarriles Nacionales y el Auge Cafetero (1920)";
    content = "En los a\xF1os 20 las locomotoras a vapor de carb\xF3n fueron el motor que integr\xF3 las regiones colombianas. Permitieron sacar millones de bultos de caf\xE9 desde las empinadas laderas de Caldas y Antioquia hacia los puertos fluviales del R\xEDo Magdalena.";
    notebookDraft = `CIENCIAS SOCIALES: FERROCARRILES EN COLOMBIA (A\xD1OS 20)
\u2022 Importancia: Redujeron semanas de viaje a lomo de mula a unas pocas horas de tren.
\u2022 Combustible: Carb\xF3n mineral y calderas de vapor de agua.
\u2022 Impacto: Crecimiento de pueblos estaci\xF3n y auge exportador del caf\xE9 colombiano.`;
    bulletPoints = [
      "Las locomotoras a vapor unieron el Eje Cafetero con el R\xEDo Magdalena y el Puerto de Buenaventura.",
      "El 'T\xFAnel de La Quiebra' en Antioquia fue una haza\xF1a de ingenier\xEDa mundial de la \xE9poca.",
      "Alrededor de cada estaci\xF3n ferroviaria nacieron fondas campesinas, hoteles y mercados populares."
    ];
    posterIdeas = {
      title: "\xA1Rieles de Progreso! Los Trenes de Colombia",
      slogan: "Conectando cordilleras y llevando el caf\xE9 al mundo entero.",
      drawRecommendation: "Una locomotora negra echando humo blanco por su chimenea con bultos de caf\xE9 al lado."
    };
    funFactForClass = "El silbato de la locomotora avisaba la hora exacta a los campesinos que trabajaban en los sembrados cercanos a las v\xEDas.";
  } else if (lower.includes("gaitan") || lower.includes("bogotazo") || lower.includes("1948") || lower.includes("tranvia")) {
    topicTitle = "El 9 de Abril de 1948 y El Bogotazo";
    content = "El 9 de abril de 1948 fue asesinado el l\xEDder popular Jorge Eli\xE9cer Gait\xE1n en el centro de Bogot\xE1. Este hecho desencaden\xF3 una rebeli\xF3n urbana masiva que alter\xF3 la arquitectura de la ciudad y aceler\xF3 el fin de los tranv\xEDas el\xE9ctricos de la Carrera S\xE9ptima.";
    notebookDraft = `CIENCIAS SOCIALES: EL 9 DE ABRIL DE 1948
\u2022 Personaje: Jorge Eli\xE9cer Gait\xE1n, abogado y orador del pueblo.
\u2022 Suceso: Su fallecimiento provoc\xF3 protestas en Bogot\xE1 y varias ciudades.
\u2022 Transformaci\xF3n urbana: La ciudad ampli\xF3 avenidas modernas y sustituy\xF3 tranv\xEDas por buses.`;
    bulletPoints = [
      "En Bogot\xE1 se celebraba al mismo tiempo la Conferencia Panamericana fundacional de la OEA.",
      "Los tranv\xEDas el\xE9ctricos fueron incendiados durante los disturbios y retirados en los a\xF1os siguientes.",
      "Este suceso dej\xF3 la ense\xF1anza permanente de buscar siempre la paz y la concertaci\xF3n pac\xEDfica."
    ];
    posterIdeas = {
      title: "1948: Historia, Memoria y Convivencia",
      slogan: "Comprender el pasado para construir un futuro de di\xE1logo y paz.",
      drawRecommendation: "Dibuja un tranv\xEDa cl\xE1sico rojo y amarillo de Bogot\xE1 con campana y v\xEDas empedradas."
    };
    funFactForClass = "Los tranv\xEDas de Bogot\xE1 contaban con dos clases: primera clase con asientos tapizados y segunda con bancas de madera.";
  } else if (lower.includes("voto") || lower.includes("mujer") || lower.includes("femenino") || lower.includes("1957")) {
    topicTitle = "El Voto Femenino en Colombia (1957)";
    content = "El 1 de diciembre de 1957 las mujeres colombianas acudieron por primera vez en la historia a las urnas electorales durante el plebiscito nacional, conquistando la ciudadan\xEDa plena tras d\xE9cadas de incansable liderazgo social.";
    notebookDraft = `CIENCIAS SOCIALES: EL VOTO DE LAS MUJERES (1957)
\u2022 Fecha de la primera votaci\xF3n: 1 de diciembre de 1957 (Plebiscito).
\u2022 Hito: Las mujeres obtuvieron c\xE9dula de ciudadan\xEDa propia y derecho a elegir.
\u2022 Relevancia: Paso fundamental para la equidad de g\xE9nero y la democracia en Colombia.`;
    bulletPoints = [
      "L\xEDderes como Esmeralda Arboleda y Josefina Valencia lideraron los debates en el Congreso.",
      "En 1956 se expidi\xF3 la primera c\xE9dula de ciudadan\xEDa femenina n\xFAmero 20.000.001 a Carola Correa.",
      "M\xE1s de un mill\xF3n de mujeres votaron el primer d\xEDa con alegr\xEDa en todo el territorio colombiano."
    ];
    posterIdeas = {
      title: "1957: \xA1Las Mujeres Votan en Colombia!",
      slogan: "Una democracia completa con la voz de todas las colombianas.",
      drawRecommendation: "Una urna electoral con la bandera tricolor y mujeres haciendo fila con su c\xE9dula."
    };
    funFactForClass = "Antes de 1957, las mujeres adultas en Colombia no pod\xEDan votar ni administrar sus propios bienes sin autorizaci\xF3n masculina.";
  } else if (lower.includes("constitucion") || lower.includes("1991") || lower.includes("tutela") || lower.includes("derecho")) {
    topicTitle = "La Constituci\xF3n Pol\xEDtica de Colombia de 1991";
    content = "En 1991 Colombia proclam\xF3 una nueva Constituci\xF3n redactada por una Asamblea Nacional Constituyente pluralista. Reconoci\xF3 al pa\xEDs como una naci\xF3n multi\xE9tnica y pluricultural y cre\xF3 la Acci\xF3n de Tutela para la defensa de los derechos fundamentales.";
    notebookDraft = `CIENCIAS SOCIALES: CONSTITUCI\xD3N DE 1991
\u2022 Origen: Movimiento de estudiantes de la S\xE9ptima Papeleta en 1990.
\u2022 Logro clave: Cre\xF3 la Acci\xF3n de Tutela para proteger la salud y la vida.
\u2022 Art\xEDculo 44: 'Los derechos de los ni\xF1os y ni\xF1as prevalecen sobre los derechos de los dem\xE1s'.`;
    bulletPoints = [
      "Reconoci\xF3 los derechos territoriales y culturales de los pueblos ind\xEDgenas y afrocolombianos.",
      "Cre\xF3 la Fiscal\xEDa General de la Naci\xF3n y la Corte Constitucional.",
      "Estableci\xF3 que la educaci\xF3n y la salud son derechos prioritarios de la ni\xF1ez."
    ];
    posterIdeas = {
      title: "Constituci\xF3n de 1991: Derechos para Todos",
      slogan: "Colombia: un pa\xEDs multi\xE9tnico, diverso y democr\xE1tico.",
      drawRecommendation: "Un libro abierto con la Constituci\xF3n y ni\xF1os con trajes tradicionales de distintas regiones."
    };
    funFactForClass = "El movimiento que inspir\xF3 la Constituci\xF3n de 1991 naci\xF3 de j\xF3venes universitarios que depositaron una 'S\xE9ptima Papeleta' simb\xF3lica en las elecciones de 1990.";
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
app.get(["/download-zip", "/leo-en-el-tiempo.zip"], (_req, res) => {
  const zipPath = import_path.default.join(process.cwd(), "public", "leo-en-el-tiempo.zip");
  if (import_fs.default.existsSync(zipPath)) {
    res.setHeader("Content-Type", "application/zip");
    res.setHeader("Content-Disposition", 'attachment; filename="leo-en-el-tiempo.zip"');
    return res.sendFile(zipPath);
  }
  return res.status(404).send("Zip a\xFAn no generado");
});
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await (0, import_vite.createServer)({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = import_path.default.join(process.cwd(), "dist");
    app.use(import_express.default.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(import_path.default.join(distPath, "index.html"));
    });
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`\u{1F1E8}\u{1F1F4} M\xE1quina del Tiempo de Leo (Colombia Siglo XX) lista en http://localhost:${PORT}`);
  });
}
startServer();
var server_default = app;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  PRESET_COLOMBIA_XX
});
//# sourceMappingURL=server.cjs.map
