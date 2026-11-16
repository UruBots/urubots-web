export interface Person {
  name: string;
  url?: string;
  email?: string;
}

export interface AtHomeConfig {
  /** Public YouTube URL of the 2027 qualification video. */
  videoUrl: string | null;
  /** Path/URL of the final TDP PDF (e.g. "/docs/tdp-2027.pdf"). */
  tdpPdfUrl: string | null;
  /** Files under public/images/athome/, e.g. { src: '/images/athome/full.jpg', alt: '...' }. */
  photos: { src: string; alt: string }[];
  roles: { pi: Person | null; leader: Person | null; contact: Person | null };
}

// Team-supplied qualification data (audit §4.5). Leave null/[] until confirmed:
// the page hides every block whose value is not set.
export const atHomeConfig: AtHomeConfig = {
  videoUrl: null,
  tdpPdfUrl: null,
  photos: [],
  roles: { pi: null, leader: null, contact: null },
};

export const OFFICIAL_LEAGUE_URL = 'https://athome.robocup.org/';
export const REPO_URL = 'https://github.com/ShiiSuii/base_athome';
export const ORG_URL = 'https://github.com/UruBots';
