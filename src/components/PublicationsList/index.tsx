'use client';

import { useState } from 'react';
import { publications, type Publication } from '@/data/publications';
import { toBibtex } from '@/lib/bibtex';
import { groupPublications, type PublicationFilter } from '@/lib/groupPublications';

const labels: Record<string, { all: string; paper: string; tdp: string; copy: string; copied: string; accepted: string; preprint: string }> = {
  'en-us': { all: 'All', paper: 'Scientific papers', tdp: 'TDPs', copy: 'Copy BibTeX', copied: 'Copied!', accepted: 'Accepted', preprint: 'Preprint' },
  'es-ar': { all: 'Todos', paper: 'Artículos científicos', tdp: 'TDPs', copy: 'Copiar BibTeX', copied: '¡Copiado!', accepted: 'Aceptado', preprint: 'Preprint' },
  'pt-br': { all: 'Todos', paper: 'Artigos científicos', tdp: 'TDPs', copy: 'Copiar BibTeX', copied: 'Copiado!', accepted: 'Aceito', preprint: 'Preprint' },
};

const linkClass =
  'rounded border border-primary/30 px-3 py-1 text-sm text-primary hover:bg-primary hover:text-white transition-colors';

function Card({ pub, t }: { pub: Publication; t: (typeof labels)['en-us'] }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(toBibtex(pub));
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard unavailable */
    }
  };
  const badge = pub.status === 'accepted' ? t.accepted : pub.status === 'preprint' ? t.preprint : null;

  return (
    <li className="rounded-lg border border-gray-200 dark:border-gray-700 p-4">
      <h4 className="text-lg font-medium text-black dark:text-white leading-relaxed">{pub.title}</h4>
      <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{pub.authors.join(', ')}</p>
      {(pub.venue || badge) && (
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {pub.venue}
          {badge && (
            <span className="ml-2 rounded bg-primary/10 px-2 py-0.5 text-xs text-primary">{badge}</span>
          )}
        </p>
      )}
      <p className="mt-2 text-sm text-body-color dark:text-body-color-dark">{pub.summary}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {pub.pdf && (
          <a href={pub.pdf} target="_blank" rel="noopener noreferrer" className={linkClass}>PDF</a>
        )}
        {pub.arxiv && (
          <a href={`https://arxiv.org/abs/${pub.arxiv}`} target="_blank" rel="noopener noreferrer" className={linkClass}>arXiv</a>
        )}
        {pub.doi && (
          <a href={pub.doi} target="_blank" rel="noopener noreferrer" className={linkClass}>DOI</a>
        )}
        <button type="button" onClick={copy} className={linkClass}>
          {copied ? t.copied : t.copy}
        </button>
      </div>
    </li>
  );
}

export function PublicationsList({ lang }: { lang: string }) {
  const t = labels[lang] ?? labels['en-us'];
  const [filter, setFilter] = useState<PublicationFilter>('all');
  const groups = groupPublications(publications, filter);
  const tabs: PublicationFilter[] = ['all', 'paper', 'tdp'];

  return (
    <section className="pb-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8 flex flex-wrap gap-2" role="tablist">
          {tabs.map((key) => (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={filter === key}
              onClick={() => setFilter(key)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                filter === key
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
              }`}
            >
              {t[key]}
            </button>
          ))}
        </div>
        {groups.map((g) => (
          <div key={g.year} className="mb-12 last:mb-0">
            <h3 className="mb-6 border-b border-gray-200 dark:border-gray-500 pb-2 text-2xl font-bold text-black dark:text-white">
              {g.year}
            </h3>
            <ul className="space-y-4">
              {g.items.map((p) => (
                <Card key={p.id} pub={p} t={t} />
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
