// FIRA RoboWorld Cup and RoboCup achievements, as provided by the team. Loaded into the `award` page of Prismic.
export const LOCALES = ['en-us', 'es-ar', 'pt-br'] as const;
export type TrophyLocale = (typeof LOCALES)[number];
type ByLocale = Record<TrophyLocale, string>;

export interface TrophyItem {
  year: string;
  event: 'FIRA RoboWorld Cup' | 'RoboCup';
  medal: 'gold' | 'silver' | 'bronze' | 'laurel';
  location: ByLocale;
  place: ByLocale;
  category: ByLocale;
  description: ByLocale | null;
}

export const trophiesIntro = {
  title: {
    'en-us': 'Achievements in international competitions',
    'es-ar': 'Historial de logros en competencias internacionales',
    'pt-br': 'Histórico de conquistas em competições internacionais',
  } as ByLocale,
  subtitle: {
    'en-us': 'FIRA RoboWorld Cup and RoboCup, year by year',
    'es-ar': 'FIRA RoboWorld Cup y RoboCup, año a año',
    'pt-br': 'FIRA RoboWorld Cup e RoboCup, ano a ano',
  } as ByLocale,
};

const L = (en: string, es: string, pt: string): ByLocale => ({ 'en-us': en, 'es-ar': es, 'pt-br': pt });

const first = L('1st place', '1.er puesto', '1º lugar');
const third = L('3rd place', '3.er puesto', '3º lugar');
const fifth = L('5th place', '5.º puesto', '5º lugar');

const canada = L('Canada', 'Canadá', 'Canadá');
const daegu = L('Daegu, South Korea', 'Daegu, Corea del Sur', 'Daegu, Coreia do Sul');
const maranhao = L('São Luís do Maranhão, Brazil', 'São Luís do Maranhão, Brasil', 'São Luís do Maranhão, Brasil');
const wolfenbuettel = L('Wolfenbüttel, Germany', 'Wolfenbüttel, Alemania', 'Wolfenbüttel, Alemanha');
const korea = L('South Korea', 'Corea del Sur', 'Coreia do Sul');
const salvador = L('Salvador de Bahía, Brazil', 'Salvador de Bahía, Brasil', 'Salvador da Bahia, Brasil');

export const trophyItems: TrophyItem[] = [
  // ---- 2026 ----
  {
    year: '2026',
    event: 'FIRA RoboWorld Cup',
    medal: 'gold',
    location: canada,
    place: first,
    category: L(
      'International “United” technical challenge · Autonomous Cars',
      'Desafío técnico internacional «United» · Autos Autónomos',
      'Desafio técnico internacional «United» · Carros Autônomos',
    ),
    description: L(
      'Won together with students from Canada and Malaysia.',
      'Lo lograron junto a estudiantes de Canadá y Malasia.',
      'Conquistado junto a estudantes do Canadá e da Malásia.',
    ),
  },
  {
    year: '2026',
    event: 'FIRA RoboWorld Cup',
    medal: 'laurel',
    location: canada,
    place: L('4th place', '4.º puesto', '4º lugar'),
    category: L(
      'Autonomous Cars overall ranking, among 17 delegations',
      'Clasificación general de Autos Autónomos, entre 17 delegaciones',
      'Classificação geral de Carros Autônomos, entre 17 delegações',
    ),
    description: null,
  },
  {
    year: '2026',
    event: 'RoboCup',
    medal: 'laurel',
    location: korea,
    place: L('Participation', 'Participación', 'Participação'),
    category: L(
      'Qualified and represented Uruguay in multiple categories',
      'Clasificaron y representaron a Uruguay en múltiples categorías',
      'Classificaram-se e representaram o Uruguai em múltiplas categorias',
    ),
    description: L('Competed in June/July.', 'Compitieron en junio y julio.', 'Competiram em junho e julho.'),
  },
  // ---- 2025 ----
  {
    year: '2025',
    event: 'FIRA RoboWorld Cup',
    medal: 'gold',
    location: daegu,
    place: first,
    category: L('Autonomous Drones technical challenge', 'Desafío técnico de Drones Autónomos', 'Desafio técnico de Drones Autônomos'),
    description: null,
  },
  {
    year: '2025',
    event: 'RoboCup',
    medal: 'gold',
    location: salvador,
    place: first,
    category: L('Mobility subcategory', 'Subcategoría Movilidad', 'Subcategoria Mobilidade'),
    description: L(
      'Highest score of the Mobility subcategory, in the team’s historic debut at the event.',
      'Obtuvieron el mayor puntaje de la subcategoría Movilidad, en su debut histórico en el certamen.',
      'Obtiveram a maior pontuação da subcategoria Mobilidade, na sua estreia histórica no evento.',
    ),
  },
  {
    year: '2025',
    event: 'RoboCup',
    medal: 'laurel',
    location: salvador,
    place: fifth,
    category: L('Rescue overall category', 'Categoría general Rescue', 'Categoria geral Rescue'),
    description: null,
  },
  // ---- 2024 ----
  {
    year: '2024',
    event: 'FIRA RoboWorld Cup',
    medal: 'bronze',
    location: maranhao,
    place: third,
    category: L('Autonomous Cars', 'Autos Autónomos', 'Carros Autônomos'),
    description: L('Overall category.', 'Categoría general.', 'Categoria geral.'),
  },
  {
    year: '2024',
    event: 'FIRA RoboWorld Cup',
    medal: 'bronze',
    location: maranhao,
    place: third,
    category: L('Humanoids', 'Humanoides', 'Humanoides'),
    description: L('Overall category.', 'Categoría general.', 'Categoria geral.'),
  },
  // ---- 2023 ----
  {
    year: '2023',
    event: 'FIRA RoboWorld Cup',
    medal: 'gold',
    location: wolfenbuettel,
    place: first,
    category: L('“Mission Impossible United” subcategory', 'Subcategoría «Mission Impossible United»', 'Subcategoria «Mission Impossible United»'),
    description: L('In the team’s world-cup debut.', 'En su debut mundialista.', 'Na sua estreia em um mundial.'),
  },
];
