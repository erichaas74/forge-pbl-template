const METASTEPS_EMBED_PATH =
  /^\/viewer\/embed\/[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/iu;
const ALLOWED_OPTIONS = new Set([
  'showSignIn',
  'showCommunications',
  'showOrbitButton',
  'showSettingsButton',
  'showSoundButton',
  'showLikeButton',
  'forceOrbitCamera',
]);

export interface MetaStepsEmbedParseResult {
  readonly valid: boolean;
  readonly normalizedUrl?: string;
  readonly message?: string;
}

/** Accepts either a public MetaSteps embed URL or the iframe code MetaSteps supplies. */
export function parseMetaStepsEmbed(value: string): MetaStepsEmbedParseResult {
  const candidate = extractUrl(value);
  if (candidate.length === 0) {
    return { valid: false, message: 'Paste the public MetaSteps embed URL or iframe code.' };
  }

  try {
    const url = new URL(candidate.replaceAll('\\&', '&'));
    if (
      url.protocol !== 'https:' ||
      url.hostname.toLowerCase() !== 'metasteps.com' ||
      !METASTEPS_EMBED_PATH.test(url.pathname)
    ) {
      return {
        valid: false,
        message: 'Use an HTTPS metasteps.com viewer embed link for a public gallery.',
      };
    }

    const normalized = new URL(`https://metasteps.com${url.pathname}`);
    for (const [key, option] of url.searchParams) {
      if (ALLOWED_OPTIONS.has(key) && (option === '0' || option === '1')) {
        normalized.searchParams.set(key, option);
      }
    }
    return { valid: true, normalizedUrl: normalized.toString() };
  } catch {
    return { valid: false, message: 'The MetaSteps embed link is not a valid URL.' };
  }
}

function extractUrl(value: string): string {
  const trimmed = value.trim().replace(/^\\</u, '<').replace(/\\>$/u, '>');
  const iframeSource = trimmed.match(/\bsrc\s*=\s*["']([^"']+)["']/iu)?.[1];
  return unwrapMarkdownLink(iframeSource ?? trimmed);
}

function unwrapMarkdownLink(value: string): string {
  const markdownTarget = value.match(/^\[[^\]]+\]\((https:\/\/[^)]+)\)$/iu)?.[1];
  return (markdownTarget ?? value).trim();
}
