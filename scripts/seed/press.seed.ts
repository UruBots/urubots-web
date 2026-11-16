// Press coverage of UruBots in 2026 (PDF "Presencia de Urubots en redes y prensa 2026", section PRENSA).
// Only the 8 items whose pages could be read. Summaries are our own words; titles are translated,
// the original headline is kept in `headline`. Video items are summarized from title + date only.
export const LOCALES = ['en-us', 'es-ar', 'pt-br'] as const;
export type PressLocale = (typeof LOCALES)[number];
type ByLocale = Record<PressLocale, string>;

export interface PressItem {
  id: string;
  date: string; // YYYY-MM-DD as shown by the piece itself
  outlet: string;
  kind: 'article' | 'video';
  headline: string; // original headline (Spanish)
  title: ByLocale;
  summary: ByLocale;
  sourceLabel: ByLocale;
  url: string;
  videoUrl: string | null;
  /** Cover image to upload to the Prismic media library (rights confirmed by the team). */
  image: { url: string; credit: string; alt: string } | null;
}

const readArticle = (outlet: string): ByLocale => ({
  'en-us': `Read the article on ${outlet}`,
  'es-ar': `Leer la nota en ${outlet}`,
  'pt-br': `Ler a matéria em ${outlet}`,
});
const watchVideo = (outlet: string): ByLocale => ({
  'en-us': `Watch on YouTube (${outlet})`,
  'es-ar': `Ver en YouTube (${outlet})`,
  'pt-br': `Assistir no YouTube (${outlet})`,
});

export const pressItems: PressItem[] = [
  {
    id: 'prensa-2026-06-08-canal-12',
    date: '2026-06-08',
    outlet: 'Desayunos Informales (Canal 12)',
    kind: 'video',
    headline: 'Estudiantes de UTEC desarrollan robots de alta tecnología',
    title: {
      'en-us': 'UTEC students develop high-tech robots',
      'es-ar': 'Estudiantes de UTEC desarrollan robots de alta tecnología',
      'pt-br': 'Estudantes da UTEC desenvolvem robôs de alta tecnologia',
    },
    summary: {
      'en-us': 'Video from the Canal 12 program Desayunos Informales about the high-tech robots developed by UTEC students, aired ahead of the team’s trip to the world competitions.',
      'es-ar': 'Video del programa Desayunos Informales de Canal 12 sobre los robots de alta tecnología que desarrollan estudiantes de UTEC, difundido antes del viaje del equipo a los mundiales.',
      'pt-br': 'Vídeo do programa Desayunos Informales, do Canal 12, sobre os robôs de alta tecnologia desenvolvidos por estudantes da UTEC, exibido antes da viagem da equipe aos mundiais.',
    },
    sourceLabel: watchVideo('Canal 12'),
    url: 'https://www.youtube.com/watch?v=W9ftt5onYDs',
    videoUrl: 'https://www.youtube.com/watch?v=W9ftt5onYDs',
    image: { url: 'https://i.ytimg.com/vi/W9ftt5onYDs/hqdefault.jpg', credit: 'Desayunos Informales (Canal 12)', alt: 'Video: Estudiantes de UTEC desarrollan robots de alta tecnología' },
  },
  {
    id: 'prensa-2026-06-08-fix-tv',
    date: '2026-06-08',
    outlet: 'FIX TV',
    kind: 'video',
    headline: 'BUENAS NOTICIAS | #URUGUAY AL MUNDIAL DE ROBÓTICA. El equipo Urubots va por la gloria',
    title: {
      'en-us': 'GOOD NEWS | #URUGUAY AT THE ROBOTICS WORLD CUP: the Urubots team goes for glory',
      'es-ar': 'BUENAS NOTICIAS | #URUGUAY AL MUNDIAL DE ROBÓTICA. El equipo Urubots va por la gloria',
      'pt-br': 'BOAS NOTÍCIAS | #URUGUAI NO MUNDIAL DE ROBÓTICA: a equipe Urubots vai em busca da glória',
    },
    summary: {
      'en-us': 'FIX TV featured the Urubots team on its way to the robotics world cup, in its “Good news” segment.',
      'es-ar': 'FIX TV presentó al equipo Urubots rumbo al mundial de robótica, en su espacio «Buenas noticias».',
      'pt-br': 'A FIX TV apresentou a equipe Urubots a caminho do mundial de robótica, em seu espaço «Boas notícias».',
    },
    sourceLabel: watchVideo('FIX TV'),
    url: 'https://www.youtube.com/watch?v=uHdOyfFDQwU',
    videoUrl: 'https://www.youtube.com/watch?v=uHdOyfFDQwU',
    image: { url: 'https://i.ytimg.com/vi/uHdOyfFDQwU/hqdefault.jpg', credit: 'FIX TV', alt: 'Video: el equipo Urubots va por la gloria en el mundial de robótica' },
  },
  {
    id: 'prensa-2026-07-21-la-diaria',
    date: '2026-07-21',
    outlet: 'la diaria',
    kind: 'article',
    headline: 'El “mini Tesla” uruguayo ganó un desafío en el mundial de robótica realizado en Canadá',
    title: {
      'en-us': 'The Uruguayan “mini Tesla” won a challenge at the robotics world cup held in Canada',
      'es-ar': 'El “mini Tesla” uruguayo ganó un desafío en el mundial de robótica realizado en Canadá',
      'pt-br': 'O “mini Tesla” uruguaio venceu um desafio no mundial de robótica realizado no Canadá',
    },
    summary: {
      'en-us': 'la diaria reports that the UTEC Rivera team won the “United” cooperation challenge of the Autonomous Car Pro category at the FIRA RoboWorld Cup 2026 in Canada and finished fourth overall.',
      'es-ar': 'la diaria informa que el equipo de UTEC Rivera ganó la prueba de cooperación «United» de la categoría Autonomous Car Pro en la FIRA RoboWorld Cup 2026, en Canadá, y quedó cuarto en la general.',
      'pt-br': 'O jornal la diaria informa que a equipe da UTEC Rivera venceu a prova de cooperação «United» da categoria Autonomous Car Pro na FIRA RoboWorld Cup 2026, no Canadá, e ficou em quarto lugar na classificação geral.',
    },
    sourceLabel: readArticle('la diaria'),
    url: 'https://ladiaria.com.uy/futuro/articulo/2026/7/el-mini-tesla-uruguayo-gano-un-desafio-en-el-mundial-de-robotica-realizado-en-canada/',
    videoUrl: null,
    image: { url: 'https://ladiaria.com.uy/media/photologue/photos/cache/urubots_700w.webp', credit: 'Urubots (publicada por la diaria)', alt: 'Equipo Urubots de UTEC Rivera' },
  },
  {
    id: 'prensa-2026-07-22-diario-norte',
    date: '2026-07-22',
    outlet: 'Diario NORTE',
    kind: 'article',
    headline: 'Estudiantes de UTEC ganan prueba de cooperación entre vehículos autónomos en Mundial de Robótica',
    title: {
      'en-us': 'UTEC students win autonomous-vehicle cooperation challenge at the Robotics World Cup',
      'es-ar': 'Estudiantes de UTEC ganan prueba de cooperación entre vehículos autónomos en Mundial de Robótica',
      'pt-br': 'Estudantes da UTEC vencem prova de cooperação entre veículos autônomos no Mundial de Robótica',
    },
    summary: {
      'en-us': 'Diario NORTE, from Rivera, covers the first place in the “United” challenge and the fourth place overall in autonomous cars, and names students Gabriel Da Silva and Santiago Fernández.',
      'es-ar': 'Diario NORTE, de Rivera, reseña el primer puesto en la prueba «United» y el cuarto lugar general en autos autónomos, y nombra a los estudiantes Gabriel Da Silva y Santiago Fernández.',
      'pt-br': 'O Diario NORTE, de Rivera, relata o primeiro lugar na prova «United» e o quarto lugar geral em carros autônomos, e cita os estudantes Gabriel Da Silva e Santiago Fernández.',
    },
    sourceLabel: readArticle('Diario NORTE'),
    url: 'https://diarionorte.com.uy/ensenanza/estudiantes-de-utec-ganan-prueba-de-cooperacion-entre-vehiculos-autonomos-en-mundial-de-robotica-77945.html',
    videoUrl: null,
    image: { url: 'https://images.prismic.io/urubots/aezYiMBOoF08xTIF_ed4e1aafbdf56b76e391798481341db44b4e3392.jpg', credit: 'UruBots / UTEC', alt: 'Equipo Urubots de UTEC Rivera' },
  },
  {
    id: 'prensa-2026-07-23-diario-norte',
    date: '2026-07-23',
    outlet: 'Diario NORTE',
    kind: 'article',
    headline: 'Urubots obtuvo un primer puesto en Canadá en la competencia mundial de robótica',
    title: {
      'en-us': 'Urubots took first place in Canada at the world robotics competition',
      'es-ar': 'Urubots obtuvo un primer puesto en Canadá en la competencia mundial de robótica',
      'pt-br': 'Urubots conquistou o primeiro lugar no Canadá na competição mundial de robótica',
    },
    summary: {
      'en-us': 'Follow-up piece in Diario NORTE on the same result, with details about the team, its preparation and the support it received.',
      'es-ar': 'Nota de seguimiento de Diario NORTE sobre el mismo resultado, con detalles del equipo, su preparación y los apoyos recibidos.',
      'pt-br': 'Matéria de acompanhamento do Diario NORTE sobre o mesmo resultado, com detalhes da equipe, de sua preparação e dos apoios recebidos.',
    },
    sourceLabel: readArticle('Diario NORTE'),
    url: 'https://diarionorte.com.uy/ensenanza/urubots-obtuvo-un-primer-puesto-en-canada-en-la-competencia-mundial-de-robotica-77979.html',
    videoUrl: null,
    image: { url: 'https://images.prismic.io/urubots/aezYiMBOoF08xTIF_ed4e1aafbdf56b76e391798481341db44b4e3392.jpg', credit: 'UruBots / UTEC', alt: 'Equipo Urubots de UTEC Rivera' },
  },
  {
    id: 'prensa-2026-07-25-telenoche',
    date: '2026-07-25',
    outlet: 'Telenoche (Canal 4)',
    kind: 'article',
    headline: 'El grupo Urubots de UTEC obtuvo el primer puesto en prueba de vehículos autónomos en Canadá',
    title: {
      'en-us': 'The UTEC Urubots group took first place in an autonomous-vehicle challenge in Canada',
      'es-ar': 'El grupo Urubots de UTEC obtuvo el primer puesto en prueba de vehículos autónomos en Canadá',
      'pt-br': 'O grupo Urubots da UTEC conquistou o primeiro lugar em prova de veículos autônomos no Canadá',
    },
    summary: {
      'en-us': 'Telenoche reports the team’s first place in the autonomous-vehicle challenge and its fourth place among 17 competitors.',
      'es-ar': 'Telenoche informa del primer puesto del equipo en la prueba de vehículos autónomos y de su cuarto lugar entre 17 competidores.',
      'pt-br': 'O Telenoche informa o primeiro lugar da equipe na prova de veículos autônomos e o quarto lugar entre 17 competidores.',
    },
    sourceLabel: readArticle('Telenoche'),
    url: 'https://www.telenoche.com.uy/ciencia-y-tecnologia/el-grupo-urubots-utec-obtuvo-el-primer-puesto-prueba-vehiculos-autonomos-canada-n5402584',
    videoUrl: null,
    image: { url: 'https://images.prismic.io/urubots/aezYiMBOoF08xTIF_ed4e1aafbdf56b76e391798481341db44b4e3392.jpg', credit: 'UruBots / UTEC', alt: 'Equipo Urubots de UTEC Rivera' },
  },
  {
    id: 'prensa-2026-08-04-la-diaria-radio',
    date: '2026-08-04',
    outlet: 'la diaria Radio',
    kind: 'video',
    headline: 'la diaria Radio | Martes 04 de agosto de 2026',
    title: {
      'en-us': 'Urubots on la diaria Radio (August 4, 2026)',
      'es-ar': 'Urubots en la diaria Radio (4 de agosto de 2026)',
      'pt-br': 'Urubots na la diaria Radio (4 de agosto de 2026)',
    },
    summary: {
      'en-us': 'The team appears in the August 4 edition of la diaria Radio; the segment starts around minute 6:41 of the broadcast.',
      'es-ar': 'El equipo aparece en la edición del 4 de agosto de la diaria Radio; el segmento comienza cerca del minuto 6:41 de la emisión.',
      'pt-br': 'A equipe aparece na edição de 4 de agosto da la diaria Radio; o segmento começa por volta do minuto 6:41 da transmissão.',
    },
    sourceLabel: watchVideo('la diaria Radio'),
    url: 'https://www.youtube.com/watch?v=qezef09y3WY&t=401s',
    videoUrl: 'https://www.youtube.com/watch?v=qezef09y3WY&t=401s',
    image: { url: 'https://i.ytimg.com/vi/qezef09y3WY/hqdefault.jpg', credit: 'la diaria Radio', alt: 'Video: la diaria Radio del martes 4 de agosto de 2026' },
  },
  {
    id: 'prensa-2026-08-13-montevideo-portal',
    date: '2026-08-13',
    outlet: 'Montevideo Portal',
    kind: 'article',
    headline: 'Los estudiantes de la UTEC de Rivera que fueron distinguidos con primer premio en Canadá',
    title: {
      'en-us': 'The UTEC Rivera students honored with first prize in Canada',
      'es-ar': 'Los estudiantes de la UTEC de Rivera que fueron distinguidos con primer premio en Canadá',
      'pt-br': 'Os estudantes da UTEC Rivera premiados com o primeiro lugar no Canadá',
    },
    summary: {
      'en-us': 'Montevideo Portal reports that the team won an international autonomous-car challenge after developing a communication system between two vehicles, and finished fourth overall; it also competed in humanoids and drones.',
      'es-ar': 'Montevideo Portal informa que el equipo ganó un desafío internacional de autos autónomos tras desarrollar un sistema de comunicación entre dos vehículos, y quedó cuarto en la general; también compitió en humanoides y drones.',
      'pt-br': 'O Montevideo Portal informa que a equipe venceu um desafio internacional de carros autônomos após desenvolver um sistema de comunicação entre dois veículos, e ficou em quarto lugar geral; também competiu em humanoides e drones.',
    },
    sourceLabel: readArticle('Montevideo Portal'),
    url: 'https://www.montevideo.com.uy/18-capitales/Los-estudiantes-de-la-UTEC-de-Rivera-que-fueron-distinguidos-con-primer-premio-en-Canada-uc971626',
    videoUrl: null,
    image: { url: 'https://imagenes.montevideo.com.uy/imgnoticias/202608/_W933_80/967356.jpg', credit: 'UTEC (publicada por Montevideo Portal)', alt: 'Santiago Fernández y Gabriel da Silva, estudiantes de UTEC Rivera' },
  },
];
