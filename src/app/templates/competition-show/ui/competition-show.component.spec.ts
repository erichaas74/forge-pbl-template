import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { afterEach, vi } from 'vitest';
import configData from '../../../../../public/projects/championship-show/project.json';
import { requireCompetitionConfig } from '../domain/competition.validation';
import { CompetitionShowComponent } from './competition-show.component';
import { COMPETITION_CONFIG, CompetitionRuntimeService } from '../runtime/competition-runtime.service';
import { BrowserCompetitionPersistence, COMPETITION_PERSISTENCE } from '../runtime/competition.persistence';
import { createLocalPreviewSession } from '../../../core/context/project-session-context';
import type { CompetitionRequest } from '../domain/competition.models';
import { competitionShowLauncher } from '../../../runtime/project-launch/template-launchers/competition-show.launcher';
import { projectCatalog } from '../../../projects/project-catalog';

const config = requireCompetitionConfig(configData);
afterEach(() => { TestBed.resetTestingModule(); vi.useRealTimers(); vi.restoreAllMocks(); });

it('runs a complete host interaction and hides unrevealed responses on the presentation view', async () => {
  const append = vi.fn();
  await TestBed.configureTestingModule({ imports: [CompetitionShowComponent], providers: [provideRouter([]),
    CompetitionRuntimeService, { provide: COMPETITION_CONFIG, useValue: { ...config, defaultMode: 'game-show', teams: config.teams.slice(0, 2), rounds: [config.rounds[0]] } },
    { provide: COMPETITION_PERSISTENCE, useValue: { load: () => [], append } },
  ] }).compileComponents();
  const fixture = TestBed.createComponent(CompetitionShowComponent);
  // Exercise the complete game using the user's reduced-motion/direct-cut setting.
  fixture.componentInstance.director.reducedMotion.set(true); fixture.detectChanges(); await fixture.whenStable();
  const root: HTMLElement = fixture.nativeElement;
  const click = async (label: string) => {
    const button = Array.from(root.querySelectorAll('button')).find(b => b.textContent?.includes(label));
    expect(button, label).toBeDefined(); expect(button!.disabled, label).toBe(false);
    button!.click(); fixture.detectChanges(); await fixture.whenStable();
  };
  expect(root.textContent).toContain('Local rehearsal');
  await click('Lock lineup'); await click('Bring on');
  expect(root.textContent).not.toContain(config.rounds[0].prompt);
  await click('Reveal prompt'); expect(root.textContent).toContain(config.rounds[0].prompt);
  const answer = root.querySelector('textarea')!; answer.value = 'The answer is 81.50 because four kits cost 75.';
  answer.dispatchEvent(new Event('input')); fixture.detectChanges(); await fixture.whenStable();
  await click('Lock answer'); expect(root.textContent).toContain('evidence saved');
  await click('Lock all answers'); expect(root.textContent).toContain('81.50');
  await click('Presentation view'); expect(root.textContent).not.toContain('81.50'); expect(root.textContent).not.toContain('Host controls');
  await click('Return to host');
  const score = root.querySelector<HTMLInputElement>('input[type=number]')!; score.value = '100'; score.dispatchEvent(new Event('input'));
  fixture.detectChanges(); await fixture.whenStable();
  await click('Save points'); await click('Reveal answers');
  expect(root.querySelector('.scoreboard')?.textContent).toContain('100');
  await click('Show contest results'); await click('Confirm Nova'); expect(root.querySelector('.champion')?.textContent).toContain('Nova');
  expect(append).toHaveBeenCalledTimes(10);
});

it('replays saved requests, closes an expired timer once, and preserves evidence', () => {
  vi.useFakeTimers(); vi.setSystemTime(200000);
  const events: CompetitionRequest[] = [
    { id: '1', at: 1000, command: { type: 'configure', mode: 'game-show', teams: config.teams } },
    { id: '2', at: 1000, command: { type: 'seed' } },
    { id: '3', at: 1000, command: { type: 'start' } },
    { id: '4', at: 1000, command: { type: 'open' } },
    { id: '5', at: 2000, command: { type: 'answer', teamId: 'nova', text: 'Saved reasoning' } },
  ];
  const append = vi.fn();
  TestBed.configureTestingModule({ providers: [CompetitionRuntimeService, { provide: COMPETITION_CONFIG, useValue: config },
    { provide: COMPETITION_PERSISTENCE, useValue: { load: () => events, append } }] });
  const runtime = TestBed.inject(CompetitionRuntimeService);
  vi.advanceTimersByTime(500); expect(runtime.state().phase).toBe('locked');
  expect(runtime.state().evidence[0].response).toBe('Saved reasoning');
  vi.advanceTimersByTime(5000); expect(append).toHaveBeenCalledTimes(1);
});

it('preserves confirmed state and stops writes after persistence failure', () => {
  const append = vi.fn(() => { throw new Error('Storage full'); });
  TestBed.configureTestingModule({ providers: [CompetitionRuntimeService, { provide: COMPETITION_CONFIG, useValue: config },
    { provide: COMPETITION_PERSISTENCE, useValue: { load: () => [], append } }] });
  const runtime = TestBed.inject(CompetitionRuntimeService); runtime.command({ type: 'seed' });
  expect(runtime.state().phase).toBe('setup'); expect(runtime.blocked()).toBe(true); expect(runtime.error()).toBe('Storage full');
  runtime.command({ type: 'seed' }); expect(append).toHaveBeenCalledTimes(1);
});

it('blocks corrupt saved commands instead of silently starting over', () => {
  TestBed.configureTestingModule({ providers: [CompetitionRuntimeService, { provide: COMPETITION_CONFIG, useValue: config },
    { provide: COMPETITION_PERSISTENCE, useValue: { load: () => [{ id: 'bad', at: 0, command: { type: 'finish', winnerId: 'nova' } }], append: vi.fn() } }] });
  const runtime = TestBed.inject(CompetitionRuntimeService); expect(runtime.blocked()).toBe(true); expect(runtime.error()).toContain('INVALID_COMPETITION');
});

it('isolates persistence by tenant, actor, and attempt and rejects stale/configuration writes', () => {
  const store = new Map<string, string>();
  vi.spyOn(Storage.prototype, 'getItem').mockImplementation(key => store.get(key) ?? null);
  vi.spyOn(Storage.prototype, 'setItem').mockImplementation((key, value) => { store.set(key, value); });
  const session = createLocalPreviewSession(config.projectId, config.projectVersion);
  const a = new BrowserCompetitionPersistence(session, 'config-v1');
  const request: CompetitionRequest = { id: '1', at: 1, command: { type: 'seed' } };
  a.append(request, 0); a.append(request, 0); expect(a.load()).toEqual([request]);
  for (const override of [{ tenantId: 'other' }, { actorId: 'other' }, { attemptId: 'other' }])
    expect(new BrowserCompetitionPersistence({ ...session, ...override }, 'config-v1').load()).toEqual([]);
  expect(() => a.append({ ...request, id: '2' }, 0)).toThrow('STATE_CONFLICT');
  expect(() => new BrowserCompetitionPersistence(session, 'config-v2').load()).toThrow('SAVED_COMPETITION_INVALID');
});

it('refuses to launch client-controlled finals for an authoritative classroom session', async () => {
  const project = projectCatalog.find(p => p.id === config.projectId)!;
  await expect(competitionShowLauncher.load({ project, projectDefinition: config,
    session: createLocalPreviewSession(config.projectId, config.projectVersion, { authorityMode: 'serverAuthoritative' }),
  })).rejects.toThrow('CAPABILITY_NOT_INSTALLED');
});
