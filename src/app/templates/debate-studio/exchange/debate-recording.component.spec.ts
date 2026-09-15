import { TestBed } from '@angular/core/testing';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { DebateRecordingComponent } from './debate-recording.component';
import { DEBATE_EXCHANGE_PORT } from './debate-exchange.persistence';

afterEach(() => { TestBed.resetTestingModule(); vi.restoreAllMocks(); });
describe('debate recording playback', () => {
  it('loads a saved blob once and requires playback plus an explicit review', async () => {
    const loadMedia = vi.fn().mockResolvedValue(new Blob(['recording fixture'], { type: 'audio/wav' }));
    const createUrl = vi.spyOn(URL, 'createObjectURL').mockReturnValue('blob:recording-fixture');
    const revokeUrl = vi.spyOn(URL, 'revokeObjectURL').mockImplementation(() => {});
    await TestBed.configureTestingModule({ imports: [DebateRecordingComponent], providers: [{ provide: DEBATE_EXCHANGE_PORT, useValue: { loadMedia } }] }).compileComponents();
    const fixture = TestBed.createComponent(DebateRecordingComponent);
    fixture.componentRef.setInput('mediaId', 'recording'); fixture.componentRef.setInput('editable', true);
    const changed = vi.fn(); fixture.componentInstance.changed.subscribe(changed);
    fixture.detectChanges(); await fixture.whenStable(); fixture.detectChanges();
    expect(loadMedia).toHaveBeenCalledTimes(1); expect(createUrl).toHaveBeenCalledTimes(1);
    const root: HTMLElement = fixture.nativeElement;
    const reviewButton = [...root.querySelectorAll('button')].find(button => button.textContent?.includes('I reviewed'))!;
    expect(reviewButton.disabled).toBe(true);
    root.querySelector('audio')!.dispatchEvent(new Event('ended')); fixture.detectChanges();
    expect(changed).not.toHaveBeenCalled(); expect(reviewButton.disabled).toBe(false);
    reviewButton.click(); expect(changed).toHaveBeenCalledWith({ mediaId: 'recording', mediaReviewed: true });
    fixture.destroy(); expect(revokeUrl).toHaveBeenCalledWith('blob:recording-fixture');
  });
  it('shows an unavailable recording honestly instead of a player', async () => {
    await TestBed.configureTestingModule({ imports: [DebateRecordingComponent], providers: [{ provide: DEBATE_EXCHANGE_PORT, useValue: { loadMedia: async () => undefined } }] }).compileComponents();
    const fixture = TestBed.createComponent(DebateRecordingComponent); fixture.componentRef.setInput('mediaId', 'another-browser');
    fixture.detectChanges(); await fixture.whenStable(); fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('audio,video')).toBeNull();
    expect(fixture.nativeElement.textContent).toContain('Use the transcript');
  });
});
