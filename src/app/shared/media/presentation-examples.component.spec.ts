import { TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { PresentationExamplesComponent } from './presentation-examples.component';
import { broadcastSampleGuide } from '../../projects/completed-samples/broadcast.sample-data';

describe('presentation example videos', () => {
  it('uses the relocated clips, preserves captions, and pauses other players', () => {
    const fixture = TestBed.createComponent(PresentationExamplesComponent);
    fixture.componentRef.setInput('videos', broadcastSampleGuide.videos);
    fixture.detectChanges();
    const videos = [...fixture.nativeElement.querySelectorAll('video')] as HTMLVideoElement[];
    expect(videos).toHaveLength(4);
    expect(
      videos.every((video) =>
        video.getAttribute('src')?.startsWith('/history-live/final-presentations/'),
      ),
    ).toBe(true);
    expect(videos.every((video) => !video.autoplay && video.controls)).toBe(true);
    expect(videos[3].querySelector('track')?.getAttribute('src')).toContain(
      'presentation-reel.vtt',
    );
    const pause = vi.spyOn(videos[0], 'pause').mockImplementation(() => {});
    Object.defineProperty(videos[0], 'paused', { value: false });
    videos[1].dispatchEvent(new Event('play'));
    expect(pause).toHaveBeenCalledOnce();
    videos[1].dispatchEvent(new Event('error'));
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('[role=status]')?.textContent).toContain(
      'Open the video directly',
    );
    fixture.destroy();
  });
});
