import { atHomeConfig } from '@/config/athome';

export function RobotGallery() {
  const { photos } = atHomeConfig;
  if (photos.length === 0) return null;
  return (
    <section id="gallery" className="py-10">
      <h2 className="mb-4 text-3xl font-bold text-black dark:text-white">The robot</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {photos.map((p) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={p.src} src={p.src} alt={p.alt} className="w-full rounded object-cover" />
        ))}
      </div>
    </section>
  );
}
