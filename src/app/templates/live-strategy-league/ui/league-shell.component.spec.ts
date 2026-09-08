import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { afterEach, expect, it, vi } from 'vitest';
import configData from '../../../../../public/projects/live-strategy-league/project.json';
import { requireLeagueConfig, createLeague } from '../domain/league-engine';
import { LeagueShellComponent } from './league-shell.component';
import { LEAGUE_CONFIG, LeagueRuntimeService } from '../runtime/league-runtime.service';
import { LEAGUE_PERSISTENCE, BrowserLeaguePersistence } from '../runtime/league.persistence';
import { createLocalPreviewSession } from '../../../core/context/project-session-context';

const config = requireLeagueConfig(configData);
afterEach(() => { TestBed.resetTestingModule(); vi.useRealTimers(); });

it('renders the practice boundary and completes a decision-to-reveal interaction', async () => {
  const save = vi.fn();
  await TestBed.configureTestingModule({ imports: [LeagueShellComponent], providers: [provideRouter([]),
    LeagueRuntimeService, { provide: LEAGUE_CONFIG, useValue: config },
    { provide: LEAGUE_PERSISTENCE, useValue: { load: () => null, save } },
  ] }).compileComponents();
  const fixture = TestBed.createComponent(LeagueShellComponent);
  fixture.detectChanges();
  await fixture.whenStable();
  const root: HTMLElement = fixture.nativeElement;
  const button = (label: string) => Array.from(root.querySelectorAll('button')).find(b => b.textContent?.includes(label))!;
  expect(root.textContent).toContain('LOCAL PRACTICE');
  expect(root.querySelectorAll('nav')).toHaveLength(1);
  expect(root.querySelectorAll('header')).toHaveLength(1);
  expect(root.querySelectorAll('tbody tr')).toHaveLength(5);
  expect(root.querySelector('.recap')?.textContent).toContain('Your first result goes here');
  expect(root.querySelector('fieldset')?.disabled).toBe(true);
  button('Open round').click(); fixture.detectChanges();
  await fixture.whenStable();
  expect(root.querySelector('fieldset')?.disabled).toBe(false);
  const price = root.querySelector<HTMLInputElement>('#price')!;
  price.value = '25'; price.dispatchEvent(new Event('input')); fixture.detectChanges();
  await fixture.whenStable();
  const lock = button('Lock team decision');
  expect(lock.closest('header')).not.toBeNull();
  expect(lock.form?.id).toBe('team-decision');
  lock.click(); fixture.detectChanges();
  expect(root.textContent).toContain('Decision locked');
  expect(root.querySelector('fieldset')?.disabled).toBe(true);
  button('Calculate results').click(); fixture.detectChanges();
  expect(root.querySelector('.your-team .score')?.textContent?.trim()).toBe('0');
  button('Reveal standings').click(); fixture.detectChanges();
  expect(root.querySelector('.your-team .score')?.textContent?.trim()).toBe('8,000');
  expect(root.querySelector('.recap')?.textContent).toContain('+8,000');
  expect(save).toHaveBeenCalledTimes(4);
  button('Next round').click(); fixture.detectChanges();
  expect(root.querySelector('.recap')?.textContent).toContain('+8,000');
  expect(root.querySelector('.recap')?.textContent).toContain('Round 1');
  expect(root.querySelector('.next-round')?.textContent).toContain(config.rounds[2].title);
});

it('restores an expired timer, closes once and retains history through persistence', () => {
  vi.useFakeTimers(); vi.setSystemTime(5000);
  const saved = createLeague(config); saved.phase = 'decision-open'; saved.deadline = 4000;
  const save = vi.fn();
  TestBed.configureTestingModule({ providers: [LeagueRuntimeService, { provide: LEAGUE_CONFIG, useValue: config },
    { provide: LEAGUE_PERSISTENCE, useValue: { load: () => saved, save } }] });
  const runtime = TestBed.inject(LeagueRuntimeService);
  vi.advanceTimersByTime(500);
  expect(runtime.state().phase).toBe('decision-locked');
  vi.advanceTimersByTime(5000);
  expect(save).toHaveBeenCalledTimes(1);
});

it('leaves confirmed state unchanged when saving fails', () => {
  TestBed.configureTestingModule({ providers: [LeagueRuntimeService, { provide: LEAGUE_CONFIG, useValue: config },
    { provide: LEAGUE_PERSISTENCE, useValue: { load: () => null, save: () => { throw new Error('Storage full'); } } }] });
  const runtime = TestBed.inject(LeagueRuntimeService);
  runtime.command({ type: 'start' });
  expect(runtime.state().phase).toBe('preview');
  expect(runtime.error()).toBe('Storage full');
});

it('isolates saved practice by tenant and rejects a stale revision', () => {
  const store = new Map<string, string>();
  vi.spyOn(Storage.prototype, 'getItem').mockImplementation(key => store.get(key) ?? null);
  vi.spyOn(Storage.prototype, 'setItem').mockImplementation((key, value) => { store.set(key, value); });
  try {
    const session = createLocalPreviewSession(config.projectId, config.projectVersion);
    const a = new BrowserLeaguePersistence(session);
    const b = new BrowserLeaguePersistence({ ...session, tenantId: 'different-tenant' });
    const s = createLeague(config); s.revision = 1;
    a.save(s, 0);
    expect(a.load()).toEqual(s);
    expect(b.load()).toBeNull();
    expect(() => a.save({ ...s, revision: 2 }, 0)).toThrow('another tab');
    expect(a.load()?.revision).toBe(1);
  } finally { vi.restoreAllMocks(); }
});
