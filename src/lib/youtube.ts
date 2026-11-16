export function youtubeEmbedUrl(url: string | null): string | null {
  if (!url) return null;
  let u: URL;
  try {
    u = new URL(url);
  } catch {
    return null;
  }
  const host = u.hostname.replace(/^www\./, '');
  let id: string | null = null;
  if (host === 'youtu.be') id = u.pathname.slice(1);
  else if (host === 'youtube.com') {
    id = u.pathname.startsWith('/embed/') ? u.pathname.slice('/embed/'.length) : u.searchParams.get('v');
  }
  if (!id || !/^[\w-]+$/.test(id)) return null;
  const raw = u.searchParams.get('start') ?? u.searchParams.get('t');
  const start = raw && /^\d+s?$/.test(raw) ? parseInt(raw, 10) : null;
  return `https://www.youtube.com/embed/${id}${start ? `?start=${start}` : ''}`;
}
