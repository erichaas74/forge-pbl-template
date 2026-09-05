import { parsePresentationVideo } from './presentation-video';

describe('presentation video parser', () => {
  it('normalizes YouTube share and iframe links to privacy-enhanced embeds', () => {
    const expected = 'https://www.youtube-nocookie.com/embed/AbCdEf12345';
    expect(parsePresentationVideo('https://youtu.be/AbCdEf12345').normalizedUrl).toBe(expected);
    expect(
      parsePresentationVideo(
        '<iframe src="https://www.youtube.com/embed/AbCdEf12345?autoplay=1"></iframe>',
      ).normalizedUrl,
    ).toBe(expected);
  });

  it('normalizes Vimeo links and accepts direct HTTPS video files', () => {
    expect(parsePresentationVideo('https://vimeo.com/123456789')).toMatchObject({
      valid: true,
      kind: 'embedded',
      normalizedUrl: 'https://player.vimeo.com/video/123456789',
    });
    expect(
      parsePresentationVideo('https://media.example.edu/presentation.webm?token=ignored'),
    ).toEqual({
      valid: true,
      kind: 'direct',
      provider: 'direct',
      normalizedUrl: 'https://media.example.edu/presentation.webm',
    });
  });

  it('rejects insecure, arbitrary, and malformed video links', () => {
    expect(parsePresentationVideo('http://youtu.be/AbCdEf12345').valid).toBe(false);
    expect(parsePresentationVideo('https://example.com/watch?v=AbCdEf12345').valid).toBe(false);
    expect(parsePresentationVideo('not a URL').valid).toBe(false);
  });
});
