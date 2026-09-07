import { vi } from 'vitest';
import { TeaserAudioPlayer } from './teaser-audio-player';

describe('captioned teaser audio', () => {
  function setup() {
    const clips: HTMLAudioElement[] = [];
    const player = new TeaserAudioPlayer(() => {
      const clip = document.createElement('audio');
      vi.spyOn(clip, 'play').mockResolvedValue();
      vi.spyOn(clip, 'pause').mockImplementation(() => undefined);
      clips.push(clip);
      return clip;
    });
    return { clips, player };
  }

  it('does not create audio until requested and resolves successful playback', async () => {
    const { player, clips } = setup();
    expect(clips).toEqual([]);
    const played = player.play('/voice.wav');
    expect(clips[0].getAttribute('src')).toBe('/voice.wav');
    clips[0].dispatchEvent(new Event('ended'));
    expect(await played).toBe(true);
  });

  it('stops the old clip on a new line and resolves cancelled playback', async () => {
    const { player, clips } = setup();
    const previous = player.play('/one.wav');
    const current = player.play('/two.wav');
    expect(await previous).toBe(false);
    expect(clips[0].pause).toHaveBeenCalled();
    player.stop();
    expect(await current).toBe(false);
  });

  it('reports an unavailable audio asset so captions can continue', async () => {
    const { player, clips } = setup();
    const played = player.play('/missing.wav');
    clips[0].dispatchEvent(new Event('error'));
    expect(await played).toBe(false);
  });
});
