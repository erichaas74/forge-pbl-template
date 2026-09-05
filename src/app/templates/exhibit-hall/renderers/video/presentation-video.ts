export type PresentationVideoKind = 'embedded' | 'direct';
export type PresentationVideoProvider = 'youtube' | 'vimeo' | 'direct';

export interface PresentationVideoParseResult {
  readonly valid: boolean;
  readonly kind?: PresentationVideoKind;
  readonly provider?: PresentationVideoProvider;
  readonly normalizedUrl?: string;
  readonly message?: string;
}

const YOUTUBE_ID = /^[a-zA-Z0-9_-]{6,20}$/u;
const VIMEO_ID = /^\d{5,15}$/u;
const DIRECT_VIDEO_PATH = /\.(?:mp4|webm|ogg)$/iu;

/** Converts supported public video links or iframe code into a visitor-safe playback URL. */
export function parsePresentationVideo(value: string): PresentationVideoParseResult {
  const candidate = extractUrl(value);
  if (candidate.length === 0) {
    return {
      valid: false,
      message: 'Paste a public YouTube, Vimeo, MP4, WebM, or Ogg video link.',
    };
  }

  try {
    const url = new URL(candidate.replaceAll('&amp;', '&').replaceAll('\\&', '&'));
    if (url.protocol !== 'https:') {
      return { valid: false, message: 'The presentation video must use a public HTTPS link.' };
    }

    const youtubeId = youtubeVideoId(url);
    if (youtubeId !== undefined) {
      return {
        valid: true,
        kind: 'embedded',
        provider: 'youtube',
        normalizedUrl: `https://www.youtube-nocookie.com/embed/${youtubeId}`,
      };
    }

    const vimeoId = vimeoVideoId(url);
    if (vimeoId !== undefined) {
      return {
        valid: true,
        kind: 'embedded',
        provider: 'vimeo',
        normalizedUrl: `https://player.vimeo.com/video/${vimeoId}`,
      };
    }

    if (DIRECT_VIDEO_PATH.test(url.pathname)) {
      const direct = new URL(url.pathname, url.origin);
      return {
        valid: true,
        kind: 'direct',
        provider: 'direct',
        normalizedUrl: direct.toString(),
      };
    }

    return {
      valid: false,
      message: 'Use a public YouTube or Vimeo link, or a direct MP4, WebM, or Ogg URL.',
    };
  } catch {
    return { valid: false, message: 'The presentation video link is not a valid URL.' };
  }
}

function youtubeVideoId(url: URL): string | undefined {
  const host = url.hostname.toLowerCase();
  let id: string | null | undefined;
  if (host === 'youtu.be') id = url.pathname.split('/').filter(Boolean)[0];
  if (host === 'youtube.com' || host === 'www.youtube.com' || host === 'm.youtube.com') {
    id =
      url.pathname === '/watch'
        ? url.searchParams.get('v')
        : url.pathname.match(/^\/embed\/([^/]+)$/u)?.[1];
  }
  if (host === 'youtube-nocookie.com' || host === 'www.youtube-nocookie.com') {
    id = url.pathname.match(/^\/embed\/([^/]+)$/u)?.[1];
  }
  return id !== undefined && id !== null && YOUTUBE_ID.test(id) ? id : undefined;
}

function vimeoVideoId(url: URL): string | undefined {
  const host = url.hostname.toLowerCase();
  const id =
    host === 'vimeo.com' || host === 'www.vimeo.com'
      ? url.pathname.split('/').filter(Boolean)[0]
      : host === 'player.vimeo.com'
        ? url.pathname.match(/^\/video\/(\d+)$/u)?.[1]
        : undefined;
  return id !== undefined && VIMEO_ID.test(id) ? id : undefined;
}

function extractUrl(value: string): string {
  const trimmed = value.trim().replace(/^\\</u, '<').replace(/\\>$/u, '>');
  return (trimmed.match(/\bsrc\s*=\s*["']([^"']+)["']/iu)?.[1] ?? trimmed).trim();
}
