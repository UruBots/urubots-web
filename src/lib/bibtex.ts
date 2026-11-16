import type { Publication } from '@/lib/publications';

const ACCENTS: Record<string, string> = {
  á: "{\\'a}", é: "{\\'e}", í: "{\\'i}", ó: "{\\'o}", ú: "{\\'u}",
  Á: "{\\'A}", É: "{\\'E}", Í: "{\\'I}", Ó: "{\\'O}", Ú: "{\\'U}",
  ñ: '{\\~n}', Ñ: '{\\~N}', ã: '{\\~a}', õ: '{\\~o}', ç: '{\\c{c}}',
  ê: '{\\^e}', ô: '{\\^o}', â: '{\\^a}', ö: '{\\"o}', Ö: '{\\"O}', ü: '{\\"u}',
};

const escape = (s: string): string =>
  s.replace(/[^\x00-\x7f]/g, (c) => ACCENTS[c] ?? c);

const INPROCEEDINGS = /URUCON|LARS|INDIN|ICCAS|DATA 20|SBR|ICSR|FEBITEC/;

export function toBibtex(p: Publication): string {
  const type =
    p.kind === 'tdp' ? 'techreport' : p.venue && INPROCEEDINGS.test(p.venue) ? 'inproceedings' : 'article';
  const fields: [string, string][] = [
    ['author', p.authors.join(' and ')],
    ['title', p.title],
  ];
  if (type === 'techreport') {
    fields.push(['institution', 'Universidad Tecnológica del Uruguay (UTEC)'], ['type', 'Team Description Paper']);
  } else if (type === 'inproceedings' && p.venue) {
    fields.push(['booktitle', p.venue]);
  } else if (p.venue) {
    fields.push(['journal', p.venue]);
  } else if (p.arxiv) {
    fields.push(['journal', `arXiv preprint arXiv:${p.arxiv}`]);
  }
  fields.push(['year', String(p.year)]);
  if (p.arxiv) fields.push(['eprint', p.arxiv], ['archivePrefix', 'arXiv']);
  if (p.doi) fields.push(['doi', p.doi.replace(/^https?:\/\/doi\.org\//, '')]);
  const url = p.doi ?? (p.arxiv ? `https://arxiv.org/abs/${p.arxiv}` : null);
  if (url) fields.push(['url', url]);

  const body = fields.map(([k, v]) => `  ${k} = {${escape(v)}}`).join(',\n');
  return `@${type}{${p.bibtexKey ?? p.id},\n${body}\n}`;
}
