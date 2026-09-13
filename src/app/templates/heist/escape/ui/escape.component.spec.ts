import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { vi } from 'vitest';
import data from '../../testing/castle-escape-v2.fixture.json';
import { requireEscapeMission } from '../domain/escape.validation';
import { ESCAPE_MISSION, ESCAPE_PERSISTENCE, EscapeRuntime } from '../runtime/escape-runtime';
import { EscapeComponent } from './escape.component';

describe('Escape game controls', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [EscapeComponent],
      providers: [
        provideRouter([]),
        EscapeRuntime,
        { provide: ESCAPE_MISSION, useValue: requireEscapeMission(data) },
        { provide: ESCAPE_PERSISTENCE, useValue: { load: () => [], save: vi.fn() } },
      ],
    }),
  );
  it('operates dials, keeps failed locks closed and reviews solved clues without resetting progress', () => {
    const fixture = TestBed.createComponent(EscapeComponent),
      c = fixture.componentInstance;
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Enter the secret gate');
    c.start();
    c.submit();
    fixture.detectChanges();
    expect(c.feedback()).toContain('stays closed');
    expect(c.engine().index).toBe(0);
    c.mark('rabbits0');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.census button').getAttribute('aria-pressed')).toBe(
      'true',
    );
    for (const [i, digit] of [6, 4, 2].entries()) for (let n = 0; n < digit; n++) c.turn(i, 1);
    c.submit();
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Click! You are inside.');
    expect(fixture.nativeElement.querySelector('form')).toBeNull();
    c.next();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('#departure')).not.toBeNull();
    c.departure.set(26);
    c.submit();
    expect(c.feedback()).toContain('overlaps');
    c.departure.set(20);
    c.submit();
    expect(c.feedback()).toContain('leave later');
    c.departure.set(25);
    c.submit();
    c.next();
    c.answer = 12;
    c.submit();
    fixture.detectChanges();
    expect(c.engine().rescued).toBe(6);
    expect(fixture.nativeElement.querySelectorAll('.animal-card.free')).toHaveLength(1);
    c.next();
    c.inspect(0);
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('RESCUE JOURNAL');
    c.resume();
    expect(c.step().id).toBe('foxes');
    expect(c.engine().rescued).toBe(6);
    fixture.destroy();
  });
  it('finishes through all four control types and renders every animal home safely', () => {
    const fixture = TestBed.createComponent(EscapeComponent),
      c = fixture.componentInstance;
    c.start();
    c.digits.set([6, 4, 2]);
    c.submit();
    c.next();
    c.departure.set(25);
    c.submit();
    c.next();
    c.answer = 12;
    c.submit();
    c.next();
    c.digits.set([1, 6]);
    c.submit();
    c.next();
    c.toggleWeight(1);
    c.toggleWeight(2);
    expect(c.balanceTotal()).toBe(10);
    c.submit();
    c.next();
    for (let i = 0; i < 3; i++) {
      c.answer = 3;
      c.submit();
      c.next();
    }
    fixture.detectChanges();
    expect(c.engine().complete).toBe(true);
    expect(fixture.nativeElement.querySelectorAll('.home-animals img')).toHaveLength(12);
    c.inspect(4);
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('2 × 3');
    c.resume();
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Home before');
    c.requestRestart();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.puzzle-panel').textContent).toContain('Start a fresh rescue?');
    expect(fixture.nativeElement.querySelector('.home-animals')).toBeNull();
    c.dismissRestart();
    fixture.detectChanges();
    expect(c.engine().complete).toBe(true);
    expect(fixture.nativeElement.querySelectorAll('.home-animals img')).toHaveLength(12);
    c.restart();
    fixture.detectChanges();
    expect(c.engine().started).toBe(false);
    expect(c.engine().rescued).toBe(0);
    fixture.destroy();
  });
});
