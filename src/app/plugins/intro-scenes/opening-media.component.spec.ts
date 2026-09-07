import { TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { voyageTeaser } from '../../projects/intro-scenes/voyage.teaser';
import { OpeningMediaComponent } from './opening-media.component';

describe('opening clip playback', () => {
  function setup() {
    TestBed.configureTestingModule({ imports: [OpeningMediaComponent] });
    const fixture = TestBed.createComponent(OpeningMediaComponent);
    fixture.componentRef.setInput('media', voyageTeaser.media);
    fixture.detectChanges();
    return fixture;
  }
  it('loads clips only on request, keeps captions, and pauses playback', async () => {
    const play = vi.spyOn(HTMLMediaElement.prototype, 'play').mockResolvedValue(undefined);
    const pause = vi.spyOn(HTMLMediaElement.prototype, 'pause').mockImplementation(() => {});
    const fixture = setup();
    const video = fixture.nativeElement.querySelector('video') as HTMLVideoElement;
    expect(video.preload).toBe('none');
    expect(video.autoplay).toBe(false);
    expect(video.muted).toBe(true);
    expect(video.querySelector('track')?.getAttribute('src')).toContain('departure.vtt');
    expect(play).not.toHaveBeenCalled();
    await fixture.componentInstance.toggle();
    expect(fixture.componentInstance.playing()).toBe(true);
    await fixture.componentInstance.toggle();
    expect(pause).toHaveBeenCalled();
    expect(fixture.componentInstance.playing()).toBe(false);
    fixture.destroy();
  });

  it('shows a stable illustration fallback after failure and resets for a different clip', async () => {
    vi.spyOn(HTMLMediaElement.prototype, 'play').mockRejectedValue(new Error('offline'));
    const fixture = setup();
    await fixture.componentInstance.toggle();
    fixture.detectChanges();
    await fixture.whenStable();
    expect(fixture.componentInstance.failed()).toBe(true);
    expect(fixture.nativeElement.textContent).toContain('clip is unavailable');
    expect(fixture.nativeElement.querySelector('img')?.getAttribute('src')).toBe(
      voyageTeaser.media.image,
    );
    fixture.componentRef.setInput('media', voyageTeaser.choices[0].result.media);
    fixture.detectChanges();
    expect(fixture.componentInstance.failed()).toBe(false);
    expect(fixture.nativeElement.querySelector('video')).not.toBeNull();
    fixture.destroy();
  });
});
