import { parseMetaStepsEmbed } from './metasteps-embed';

const embedUrl =
  'https://metasteps.com/viewer/embed/baac88b7-b37f-49c0-90d6-83caf06218a6?showSignIn=0&showCommunications=0&forceOrbitCamera=0';

describe('MetaSteps embed parser', () => {
  it('accepts and normalizes a public MetaSteps embed URL', () => {
    expect(parseMetaStepsEmbed(embedUrl)).toEqual({ valid: true, normalizedUrl: embedUrl });
  });

  it('extracts the URL from iframe code and Markdown-escaped iframe code', () => {
    const iframe = `<iframe src="[${embedUrl}](${embedUrl.replaceAll('&', '\\&')})"></iframe>`;
    expect(parseMetaStepsEmbed(iframe)).toEqual({ valid: true, normalizedUrl: embedUrl });
  });

  it('rejects non-MetaSteps hosts and non-viewer paths', () => {
    expect(
      parseMetaStepsEmbed('https://example.com/viewer/embed/baac88b7-b37f-49c0-90d6-83caf06218a6')
        .valid,
    ).toBe(false);
    expect(parseMetaStepsEmbed('https://metasteps.com/account').valid).toBe(false);
  });

  it('drops unsupported query parameters instead of publishing them', () => {
    expect(parseMetaStepsEmbed(`${embedUrl}&token=private`).normalizedUrl).toBe(embedUrl);
  });
});
