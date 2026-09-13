/**
 * Large media (video) is served from Firebase Storage rather than the App
 * Hosting source bundle: a bundled video is re-uploaded on every deploy and
 * counts against the bundle size limit. Files live under the `site-media/`
 * prefix, which Storage rules expose as world-readable and write-protected.
 *
 * The returned URL is a plain unauthenticated download URL, so `<video src>`
 * needs no `crossorigin` attribute and no bucket CORS configuration.
 */
const MEDIA_BUCKET = 'livelessondemogames.firebasestorage.app';
const MEDIA_PREFIX = 'site-media';

/**
 * Builds the download URL for a hosted media file.
 *
 * @param path Bucket path relative to the `site-media/` prefix, without a
 *   leading slash — for example `project-intros/voyage/intro-launch-video.mp4`.
 *   Each segment is URL-encoded, so spaces and other literal characters in a
 *   filename must be passed raw rather than pre-encoded.
 */
export function hostedMediaUrl(path: string): string {
  const clean = path.replace(/^\/+/, '');
  if (!clean) throw new Error('hostedMediaUrl requires a non-empty path');
  const object = [MEDIA_PREFIX, ...clean.split('/')].map(encodeURIComponent).join('%2F');
  return `https://firebasestorage.googleapis.com/v0/b/${MEDIA_BUCKET}/o/${object}?alt=media`;
}

/** The fixed URL prefix every hosted media file shares. */
const HOSTED_MEDIA_PREFIX = `https://firebasestorage.googleapis.com/v0/b/${MEDIA_BUCKET}/o/${MEDIA_PREFIX}%2F`;

/**
 * True for a same-origin asset path (`/foo`, never `//host`) or a file in the
 * hosted media prefix. Media sources stay restricted to these two origins so a
 * malformed or injected config cannot point the player at an arbitrary host.
 */
export function isAllowedMediaSrc(value: string | undefined): boolean {
  if (typeof value !== 'string') return false;
  return /^\/(?!\/)/.test(value) || value.startsWith(HOSTED_MEDIA_PREFIX);
}
