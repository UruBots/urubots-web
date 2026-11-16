import { describe, it, expect } from 'vitest';
import { visibleRoles } from './teamRoles';

const p = (name: string) => ({ name });

describe('visibleRoles', () => {
  it('returns nothing when every role is null', () => {
    expect(visibleRoles({ pi: null, leader: null, contact: null })).toEqual([]);
  });

  it('returns only set roles, in PI, Team Leader, Contact Person order', () => {
    const out = visibleRoles({ pi: p('A'), leader: null, contact: p('C') });
    expect(out.map((r) => r.label)).toEqual(['Principal Investigator', 'Contact Person']);
    expect(out[1].person.name).toBe('C');
  });
});
