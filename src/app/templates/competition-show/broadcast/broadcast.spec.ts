import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { afterEach, vi } from 'vitest';
import { BroadcastDirectorService } from './broadcast-director.service';
import { midnightBroadcast, polarBroadcast, stationPositions, studioCamera, validateBroadcast } from './broadcast.models';
import { studioProjection } from './studio-projection';
import { createCompetition } from '../domain/competition-engine';
import { requireCompetitionConfig } from '../domain/competition.validation';
import configData from '../../../../../public/projects/championship-show/project.json';
import { COMPETITION_CONFIG, CompetitionRuntimeService } from '../runtime/competition-runtime.service';
import { COMPETITION_PERSISTENCE } from '../runtime/competition.persistence';
import { CompetitionShowComponent } from '../ui/competition-show.component';

const config = requireCompetitionConfig(configData);
afterEach(() => { TestBed.resetTestingModule(); vi.useRealTimers(); vi.restoreAllMocks(); });
function director() {
  vi.useFakeTimers(); TestBed.configureTestingModule({ providers: [BroadcastDirectorService] });
  const d = TestBed.inject(BroadcastDirectorService); d.reducedMotion.set(false); return d;
}
it('finishes camera travel and question reveal before firing the open command exactly once', () => {
  const d = director(); const open = vi.fn(); d.run('question', midnightBroadcast, open);
  expect(d.step()).toBe('dim'); expect(open).not.toHaveBeenCalled();
  vi.advanceTimersByTime(250); expect(d.shot()).toBe('question'); expect(d.step()).toBe('travel');
  vi.advanceTimersByTime(1500); expect(d.step()).toBe('reveal'); expect(open).not.toHaveBeenCalled();
  vi.advanceTimersByTime(850); expect(d.step()).toBe('hold'); expect(open).not.toHaveBeenCalled();
  vi.advanceTimersByTime(150); expect(open).toHaveBeenCalledTimes(1); expect(d.cue()).toBeNull();
  d.finish(); vi.runOnlyPendingTimers(); expect(open).toHaveBeenCalledTimes(1);
});
it('cancels pending question openings when a manual camera shot interrupts', () => {
  const d = director(); const open = vi.fn(); d.run('question', midnightBroadcast, open); vi.advanceTimersByTime(300);
  d.select('team', 'nova'); vi.runOnlyPendingTimers(); expect(open).not.toHaveBeenCalled(); expect(d.teamId()).toBe('nova'); expect(d.cue()).toBeNull();
});
it('supports an immediate skip, reduced-motion cuts, and manual direction without changing rules', () => {
  const d = director(); const complete = vi.fn(); d.run('score', midnightBroadcast, complete); d.finish(); vi.runOnlyPendingTimers(); expect(complete).toHaveBeenCalledTimes(1);
  d.reducedMotion.set(true); d.run('question', midnightBroadcast, complete); expect(complete).toHaveBeenCalledTimes(2);
  d.reducedMotion.set(false); d.automatic.set(false); d.select('team', 'atlas'); d.run('question', midnightBroadcast, complete);
  vi.runOnlyPendingTimers(); expect(d.shot()).toBe('team'); expect(complete).toHaveBeenCalledTimes(3);
});
it('does not open a question when the director is destroyed mid-reveal', () => {
  const d = director(); const complete = vi.fn(); d.run('question', midnightBroadcast, complete); d.ngOnDestroy();
  vi.runOnlyPendingTimers(); expect(complete).not.toHaveBeenCalled();
});
it('projects only readable question text and confirmed competition scores', () => {
  const s = createCompetition(config); s.phase = 'ready'; s.participants = ['nova', 'atlas']; s.scores = { nova: 20, atlas: 10 };
  s.responses = [{ teamId: 'nova', text: 'private answer', points: 100 }];
  const project = (step: 'dim' | 'travel' | 'reveal' | 'hold') => studioProjection(config, s, midnightBroadcast, 'question', null, 'question', step, 90);
  expect(project('dim').prompt).toBe(''); expect(project('travel').prompt).toBe(''); expect(project('reveal').prompt).toBe(config.rounds[0].prompt);
  expect(project('hold').teams[0].score).toBe(20); expect(JSON.stringify(project('hold'))).not.toContain('private answer');
});
it('derives safe camera close-ups for every team in layouts of 2–16 teams', () => {
  for (let count = 2; count <= 16; count++) {
    const stations = stationPositions(count); expect(stations).toHaveLength(count);
    expect(new Set(stations.map(p => JSON.stringify(p))).size).toBe(count);
    stations.forEach((station, i) => {
      const pose = studioCamera('team', count, i); expect(pose.target[0]).toBe(station.x);
      expect(pose.position[2]).toBeGreaterThan(station.z); expect([...pose.position, ...pose.target, pose.fov].every(Number.isFinite)).toBe(true);
    });
  }
});
it('validates replaceable theme assets and rejects malformed settings', () => {
  expect(() => validateBroadcast(midnightBroadcast)).not.toThrow(); expect(() => validateBroadcast(polarBroadcast)).not.toThrow();
  for (const bad of [
    { ...midnightBroadcast, assets: { backdrop: 'javascript:alert(1)' } },
    { ...midnightBroadcast, assets: { backdrop: '//external.example/file.png' } },
    { ...midnightBroadcast, camera: { ...midnightBroadcast.camera, moveMs: -1 } },
    { ...midnightBroadcast, palette: { ...midnightBroadcast.palette, accent: 'red; background: black' } },
  ]) expect(() => validateBroadcast(bad)).toThrow('INVALID_BROADCAST');
});
it('keeps the game in ready state until the reveal completes, and preserves answer time on skip/cancel', async () => {
  vi.useFakeTimers(); vi.setSystemTime(1000);
  await TestBed.configureTestingModule({ imports: [CompetitionShowComponent], providers: [provideRouter([]), CompetitionRuntimeService,
    { provide: COMPETITION_CONFIG, useValue: { ...config, defaultMode: 'game-show' } },
    { provide: COMPETITION_PERSISTENCE, useValue: { load: () => [], append: vi.fn() } },
  ] }).compileComponents();
  const fixture = TestBed.createComponent(CompetitionShowComponent); const c = fixture.componentInstance;
  c.director.reducedMotion.set(true); c.seed(); c.command({ type: 'start' }); c.director.reducedMotion.set(false);
  c.command({ type: 'open' }); vi.advanceTimersByTime(1800);
  expect(c.show.state().phase).toBe('ready'); expect(c.show.state().deadline).toBeNull();
  c.director.cancel(); vi.advanceTimersByTime(5000); expect(c.show.state().phase).toBe('ready');
  c.command({ type: 'open' }); c.director.finish();
  expect(c.show.state().phase).toBe('open'); expect(c.show.state().deadline).toBe(Date.now() + 90000);
  c.director.finish(); expect(c.show.state().deadline).toBe(Date.now() + 90000);
});
