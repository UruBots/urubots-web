import { describe, it, expect } from 'vitest';
import { seedPublications as publications } from '../../scripts/seed/publications.seed';
import { toBibtex } from './bibtex';

const byArxiv = (id: string) => publications.find((p) => p.arxiv === id)!;

describe('toBibtex', () => {
  it('emits an @inproceedings entry with title and and-joined authors', () => {
    const out = toBibtex(byArxiv('2410.07209'));
    expect(out).toContain('@inproceedings{moraes2024behaviorcloning,');
    expect(out).toContain('title = {Behavior Cloning for Mini Autonomous Car Path Following}');
    expect(out).toContain('Sebastian Barcelona and Juan Deniz');
    expect(out).toContain('doi = {10.1109/URUCON63440.2024.10850290}');
  });

  it('omits the doi line when doi is null', () => {
    const out = toBibtex(byArxiv('2610.23878'));
    expect(out).not.toContain('doi =');
    expect(out).toContain('eprint = {2610.23878}');
  });

  it('escapes accents such as ö', () => {
    const out = toBibtex(byArxiv('2410.17450'));
    expect(out).toContain('D{\\"o}rnbach');
    expect(out).not.toContain('ö');
  });

  it('emits @techreport for TDPs', () => {
    expect(toBibtex(byArxiv('2406.08745'))).toMatch(/^@techreport\{/);
  });

  it('never prints null or undefined', () => {
    for (const p of publications) {
      const out = toBibtex(p);
      expect(out, p.id).not.toMatch(/null|undefined/);
    }
  });
});
