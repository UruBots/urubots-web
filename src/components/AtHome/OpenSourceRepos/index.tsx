import { ORG_URL, REPO_URL } from '@/config/athome';

const packages = [
  'hoverboard_base', 'base_athome_bringup', 'base_athome_perception', 'base_athome_moveit_config',
  'base_athome_skills', 'base_athome_sim', 'jetson_head', 'tools/urdf_editor', 'tools/gpsr_parser',
];

export function OpenSourceRepos() {
  return (
    <section id="open-source" className="py-10">
      <h2 className="mb-4 text-3xl font-bold text-black dark:text-white">Open-source software</h2>
      <ul className="mb-4 list-disc pl-6 text-body-color dark:text-body-color-dark">
        <li>
          <a className="text-primary underline" href={REPO_URL} target="_blank" rel="noopener noreferrer">
            ShiiSuii/base_athome
          </a>{' '}
          — Base@Home repository for RoboCup@Home OPL (Apache-2.0)
        </li>
        <li>
          <a className="text-primary underline" href={ORG_URL} target="_blank" rel="noopener noreferrer">
            github.com/UruBots
          </a>{' '}
          — team GitHub organization
        </li>
      </ul>
      <p className="mb-2 font-medium text-black dark:text-white">Packages contributed by the team:</p>
      <ul className="flex flex-wrap gap-2">
        {packages.map((p) => (
          <li key={p} className="rounded bg-primary/10 px-3 py-1 font-mono text-sm text-primary">{p}</li>
        ))}
      </ul>
    </section>
  );
}
