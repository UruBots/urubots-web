import { atHomeConfig, OFFICIAL_LEAGUE_URL, ORG_URL, REPO_URL } from '@/config/athome';
import { youtubeEmbedUrl } from '@/lib/youtube';

const btn =
  'inline-block rounded bg-primary px-5 py-2 text-sm font-medium text-white hover:bg-opacity-90 transition';

export function QualificationMaterials() {
  const { tdpPdfUrl, videoUrl } = atHomeConfig;
  const embed = youtubeEmbedUrl(videoUrl);

  return (
    <section id="qualification" className="py-10">
      <h2 className="mb-4 text-3xl font-bold text-black dark:text-white">
        Qualification Materials (RoboCup@Home OPL 2027)
      </h2>
      <div className="flex flex-wrap gap-3">
        {tdpPdfUrl && (
          <a href={tdpPdfUrl} target="_blank" rel="noopener noreferrer" className={btn}>Team Description Paper (PDF)</a>
        )}
        {videoUrl && (
          <a href={videoUrl} target="_blank" rel="noopener noreferrer" className={btn}>Qualification video</a>
        )}
        <a href={REPO_URL} target="_blank" rel="noopener noreferrer" className={btn}>Open-source repository</a>
        <a href={ORG_URL} target="_blank" rel="noopener noreferrer" className={btn}>UruBots on GitHub</a>
        <a href={OFFICIAL_LEAGUE_URL} target="_blank" rel="noopener noreferrer" className={btn}>RoboCup@Home league</a>
      </div>
      {embed && (
        <div className="mt-6 aspect-video w-full max-w-3xl">
          <iframe
            className="h-full w-full rounded"
            src={embed}
            title="UruBots RoboCup@Home OPL 2027 qualification video"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      )}
    </section>
  );
}
