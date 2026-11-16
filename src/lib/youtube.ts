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
  return id && /^[\w-]+$/.test(id) ? `https://www.youtube.com/embed/${id}` : null;
}
