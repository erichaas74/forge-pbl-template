import { TestBed } from '@angular/core/testing';
import { atlanticHistoricalFrame } from '../../../projects/age-of-exploration-journey/historical-voyage';
import { JourneyHistoryContextComponent } from './journey-history-context.component';
import { validateJourneyHistory } from '../package/journey-history.validation';

describe('Fixed historical context', () => {
  it('separates documented history from the character’s fictional experience and reserves later events for hindsight', async () => {
    await TestBed.configureTestingModule({
      imports: [JourneyHistoryContextComponent],
    }).compileComponents();
    const fixture = TestBed.createComponent(JourneyHistoryContextComponent);
    fixture.componentRef.setInput('history', atlanticHistoricalFrame);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;
    expect(element.textContent).toContain('historical events and their outcomes stay the same');
    expect(element.querySelectorAll('[data-history-event]')).toHaveLength(4);
    expect(element.textContent).toContain('1494');
    expect(element.textContent).not.toContain('1522');
    expect(element.querySelectorAll('a[href^="https://"]')).toHaveLength(4);
    fixture.componentRef.setInput('includeEpilogue', true);
    fixture.detectChanges();
    expect(element.querySelectorAll('[data-history-event]')).toHaveLength(5);
    expect(element.textContent).toContain('1522');
    expect(element.textContent).toContain('hindsight, not a witnessed scene');
    fixture.destroy();
  });

  it('accepts the sourced frame and older projects without a historical frame', () => {
    expect(validateJourneyHistory(atlanticHistoricalFrame)).toEqual([]);
    expect(validateJourneyHistory(undefined)).toEqual([]);
  });

  it('rejects invented periods, missing citations, unsafe links, and duplicate event identities', () => {
    const first = atlanticHistoricalFrame.events[0];
    for (const events of [
      [{ ...first, period: 'player-changed' }],
      [{ ...first, sourceLabel: '' }],
      [{ ...first, sourceUrl: 'javascript:alert(1)' }],
      [first, first],
    ]) {
      expect(validateJourneyHistory({ ...atlanticHistoricalFrame, events })).toEqual([
        expect.objectContaining({ code: 'JOURNEY_HISTORY_INVALID' }),
      ]);
    }
  });
});
