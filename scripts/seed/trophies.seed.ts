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

const first: ByLocale = { 'en-us': '1st place', 'es-ar': '1.er puesto', 'pt-br': '1º lugar' };
const third: ByLocale = { 'en-us': '3rd place', 'es-ar': '3.er puesto', 'pt-br': '3º lugar' };
const canada: ByLocale = { 'en-us': 'Canada', 'es-ar': 'Canadá', 'pt-br': 'Canadá' };
const korea: ByLocale = { 'en-us': 'South Korea', 'es-ar': 'Corea del Sur', 'pt-br': 'Coreia do Sul' };
const brazil: ByLocale = { 'en-us': 'Brazil', 'es-ar': 'Brasil', 'pt-br': 'Brasil' };
const germany: ByLocale = { 'en-us': 'Germany', 'es-ar': 'Alemania', 'pt-br': 'Alemanha' };

export const trophyItems: TrophyItem[] = [
  {
    year: '2026',
    event: 'FIRA RoboWorld Cup',
    medal: 'gold',
    location: canada,
    place: first,
    category: {
      'en-us': '“United” technical challenge · Autonomous Cars',
      'es-ar': 'Desafío técnico «United» · Autos Autónomos',
      'pt-br': 'Desafio técnico «United» · Carros Autônomos',
    },
    description: {
      'en-us': 'Won through an international real-time programming alliance.',
      'es-ar': 'Lograron el primer puesto mediante una alianza internacional de programación en tiempo real.',
      'pt-br': 'Conquistado por meio de uma aliança internacional de programação em tempo real.',
    },
  },
  {
    year: '2026',
    event: 'FIRA RoboWorld Cup',
    medal: 'laurel',
    location: canada,
    place: { 'en-us': '4th place', 'es-ar': '4.º lugar', 'pt-br': '4º lugar' },
    category: { 'en-us': 'Overall ranking of the competition', 'es-ar': 'Clasificación general de la competencia', 'pt-br': 'Classificação geral da competição' },
    description: null,
  },
  {
    year: '2025',
    event: 'FIRA RoboWorld Cup',
    medal: 'gold',
    location: korea,
    place: first,
    category: { 'en-us': 'Drones', 'es-ar': 'Drones', 'pt-br': 'Drones' },
    description: null,
  },
  {
    year: '2025',
    event: 'FIRA RoboWorld Cup',
    medal: 'laurel',
    location: korea,
    place: { 'en-us': 'Top 5', 'es-ar': 'Top 5', 'pt-br': 'Top 5' },
    category: { 'en-us': 'Rescue', 'es-ar': 'Rescue', 'pt-br': 'Rescue' },
    description: null,
  },
  {
    year: '2025',
    event: 'RoboCup',
    medal: 'gold',
    location: brazil,
    place: first,
    category: { 'en-us': 'Mobility subcategory · Rescue', 'es-ar': 'Subcategoría Movilidad · Rescue', 'pt-br': 'Subcategoria Mobilidade · Rescue' },
    description: {
      'en-us': 'Highest score in the Mobility subcategory of the Rescue category.',
      'es-ar': 'Obtuvieron el mayor puntaje de la subcategoría Movilidad, en la categoría Rescue.',
      'pt-br': 'Obtiveram a maior pontuação da subcategoria Mobilidade, na categoria Rescue.',
    },
  },
  {
    year: '2025',
    event: 'RoboCup',
    medal: 'laurel',
    location: brazil,
    place: { 'en-us': '5th place', 'es-ar': '5.º puesto', 'pt-br': '5º lugar' },
    category: { 'en-us': 'Rescue · overall ranking', 'es-ar': 'Rescue · clasificación general', 'pt-br': 'Rescue · classificação geral' },
    description: null,
  },
  {
    year: '2024',
    event: 'FIRA RoboWorld Cup',
    medal: 'bronze',
    location: brazil,
    place: third,
    category: { 'en-us': 'Humanoids', 'es-ar': 'Humanoides', 'pt-br': 'Humanoides' },
    description: { 'en-us': 'World podium.', 'es-ar': 'Podio mundial.', 'pt-br': 'Pódio mundial.' },
  },
  {
    year: '2024',
    event: 'FIRA RoboWorld Cup',
    medal: 'bronze',
    location: brazil,
    place: third,
    category: { 'en-us': 'Autonomous Cars', 'es-ar': 'Autos Autónomos', 'pt-br': 'Carros Autônomos' },
    description: { 'en-us': 'World podium.', 'es-ar': 'Podio mundial.', 'pt-br': 'Pódio mundial.' },
  },
  {
    year: '2023',
    event: 'FIRA RoboWorld Cup',
    medal: 'gold',
    location: germany,
    place: first,
    category: { 'en-us': '“Mission Impossible” subcategory', 'es-ar': 'Subcategoría «Misión Imposible»', 'pt-br': 'Subcategoria «Missão Impossível»' },
    description: {
      'en-us': 'First place in the team’s international debut.',
      'es-ar': 'Primer puesto en su debut internacional.',
      'pt-br': 'Primeiro lugar na estreia internacional da equipe.',
    },
  },
];
