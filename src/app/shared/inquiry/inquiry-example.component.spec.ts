import { TestBed } from '@angular/core/testing';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { expeditionExamples } from '../../projects/expedition-news-network/expedition-examples';
import { InquiryExampleComponent } from './inquiry-example.component';

function setup() {
  const fixture = TestBed.createComponent(InquiryExampleComponent);
  fixture.componentRef.setInput('example', expeditionExamples[1]);
  fixture.componentRef.setInput('sources', []);
  fixture.detectChanges();
  return fixture;
}
afterEach(() => TestBed.resetTestingModule());
describe('Read-only example player', () => {
  it('offers controls and captions without autoplay, and seeks only after media loads', () => {
    const fixture = setup();
    const video: HTMLVideoElement = fixture.nativeElement.querySelector('video');
    const pause = vi.spyOn(video, 'pause').mockImplementation(() => undefined);
    expect(video.controls).toBe(true);
    expect(video.autoplay).toBe(false);
    expect(video.querySelector('track')?.getAttribute('srclang')).toBe('en');
    fixture.componentInstance.jump(3);
    expect(pause).not.toHaveBeenCalled();
    video.dispatchEvent(new Event('loadedmetadata'));
    fixture.detectChanges();
    fixture.nativeElement.querySelectorAll('.transcript-section button')[3].click();
    expect(video.currentTime).toBe(expeditionExamples[1].chapters[3].startSeconds);
    expect(pause).toHaveBeenCalledOnce();
  });
  it('retains the complete transcript and download when video loading fails', () => {
    const fixture = setup();
    fixture.nativeElement.querySelector('video').dispatchEvent(new Event('error'));
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('[role="alert"]').textContent).toContain(
      'could not load',
    );
    for (const chapter of expeditionExamples[1].chapters)
      expect(fixture.nativeElement.textContent).toContain(chapter.text);
    expect(fixture.nativeElement.querySelector('a[download]').getAttribute('href')).toBe(
      expeditionExamples[1].videoUrl,
    );
    const buttons: NodeListOf<HTMLButtonElement> = fixture.nativeElement.querySelectorAll(
      '.transcript-section button',
    );
    expect([...buttons].every((b) => b.disabled)).toBe(true);
  });
});
