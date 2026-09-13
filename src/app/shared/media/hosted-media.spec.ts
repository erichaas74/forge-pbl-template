import { hostedMediaUrl, isAllowedMediaSrc } from './hosted-media';

describe('hosted media URLs', () => {
  it('encodes the object path into the site-media prefix', () => {
    expect(hostedMediaUrl('project-intros/voyage/intro-launch-video.mp4')).toBe(
      'https://firebasestorage.googleapis.com/v0/b/livelessondemogames.firebasestorage.app/o/' +
        'site-media%2Fproject-intros%2Fvoyage%2Fintro-launch-video.mp4?alt=media',
    );
  });
  it('encodes spaces in a filename and tolerates a leading slash', () => {
    expect(hostedMediaUrl('/debate-studio/openings/opening-Senator Lucius.mp4')).toContain(
      'site-media%2Fdebate-studio%2Fopenings%2Fopening-Senator%20Lucius.mp4',
    );
    expect(() => hostedMediaUrl('/')).toThrow();
  });
  it('allows same-origin paths and hosted media, and nothing else', () => {
    expect(isAllowedMediaSrc('/history-live/final-presentations/presentation-reel.vtt')).toBe(true);
    expect(isAllowedMediaSrc(hostedMediaUrl('a/b.mp4'))).toBe(true);
    for (const rejected of [
      undefined,
      '',
      '//evil.example/video.mp4',
      'javascript:alert(1)',
      'https://firebasestorage.googleapis.com.evil.example/v0/b/x/o/site-media%2Fa.mp4',
      // Right host, wrong bucket, and right bucket but outside the public prefix.
      'https://firebasestorage.googleapis.com/v0/b/other.appspot.com/o/site-media%2Fa.mp4',
      'https://firebasestorage.googleapis.com/v0/b/livelessondemogames.firebasestorage.app/o/uploads%2Fa.mp4',
    ]) {
      expect(isAllowedMediaSrc(rejected)).toBe(false);
    }
  });
});
