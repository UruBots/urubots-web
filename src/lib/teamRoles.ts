import type { AtHomeConfig, Person } from '@/config/athome';

export function visibleRoles(roles: AtHomeConfig['roles']): { label: string; person: Person }[] {
  const all: [string, Person | null][] = [
    ['Principal Investigator', roles.pi],
    ['Team Leader', roles.leader],
    ['Contact Person', roles.contact],
  ];
  return all.flatMap(([label, person]) => (person ? [{ label, person }] : []));
}
