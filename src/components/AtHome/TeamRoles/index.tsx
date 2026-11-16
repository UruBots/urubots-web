import { atHomeConfig } from '@/config/athome';
import { visibleRoles } from '@/lib/teamRoles';

export function TeamRoles() {
  const roles = visibleRoles(atHomeConfig.roles);
  if (roles.length === 0) return null;
  return (
    <section id="team-roles" className="py-10">
      <h2 className="mb-4 text-3xl font-bold text-black dark:text-white">Team</h2>
      <dl className="grid gap-4 sm:grid-cols-3">
        {roles.map(({ label, person }) => (
          <div key={label} className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
            <dt className="text-sm text-gray-500 dark:text-gray-400">{label}</dt>
            <dd className="mt-1 text-lg font-medium text-black dark:text-white">
              {person.url ? (
                <a className="text-primary underline" href={person.url} target="_blank" rel="noopener noreferrer">
                  {person.name}
                </a>
              ) : (
                person.name
              )}
              {person.email && (
                <a className="mt-1 block text-sm text-primary" href={`mailto:${person.email}`}>
                  {person.email}
                </a>
              )}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
