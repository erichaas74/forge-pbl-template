import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { afterEach, vi } from 'vitest';
import projectData from '../../../../../public/projects/championship-show/project.json';
import demoData from '../../../../../public/projects/championship-show/final-demo.json';
import { requireCompetitionConfig } from '../domain/competition.validation';
import { COMPETITION_CONFIG } from '../runtime/competition-runtime.service';
import { FINAL_SHOWCASE, requireFinalShowcase } from './final-showcase.models';
import { buildFinalShowcase } from './final-showcase.engine';
import { FinalShowcaseComponent } from './final-showcase.component';
import { QuizBreakComponent } from './quiz-break.component';
import { CompetitionBracketComponent } from '../ui/competition-bracket.component';

const project = requireCompetitionConfig(projectData);
const demo = requireFinalShowcase(demoData, project);
afterEach(() => { TestBed.resetTestingModule(); vi.useRealTimers(); vi.restoreAllMocks(); });

it('uses the recap events for seeding and carries a fictional comeback through the real rules', () => {
  const before = JSON.stringify({ project, demo });
  const model = buildFinalShowcase(project, demo);
  expect(model.seeded.teams.map(t => t.qualificationPoints)).toEqual([124, 116, 109, 101, 96, 92, 88, 82]);
  expect(model.qualified.matches.every(m => m.status === 'complete')).toBe(true);
  expect(model.ready.participants).toEqual(['nova', 'falcons', 'atlas', 'comets']);
  expect(model.rounds[1].after.scores['atlas']).toBe(200);
  expect(model.champion.championId).toBe('nova');
  expect(model.champion.scores).toEqual({ nova: 200, falcons: 140, atlas: 0, comets: 180 });
  expect(model.champion.evidence).toHaveLength(29);
  for (const evidence of model.champion.evidence) {
    expect(evidence).not.toHaveProperty('points');
    expect(evidence).not.toHaveProperty('mastery');
  }
  expect(JSON.stringify({ project, demo })).toBe(before);
});

it('rejects a non-fictional package, malformed rounds, and unsafe media before playback', () => {
  expect(() => requireFinalShowcase({ ...demo, fictional: false }, project)).toThrow();
  expect(() => requireFinalShowcase({ ...demo, recapVideo: '//external.test/video.mp4' }, project)).toThrow();
  expect(() => requireFinalShowcase({ ...demo, rounds: [null, demo.rounds[1], demo.rounds[2]] }, project)).toThrow();
  expect(() => requireFinalShowcase({ ...demo, rounds: demo.rounds.map(r => ({ ...r, seconds: -1 })) }, project)).toThrow();
});

it('connects each quarterfinal to an unrevealed final-stage place, then fills it with the winner', () => {
  const model = buildFinalShowcase(project, demo);
  const fixture = TestBed.createComponent(CompetitionBracketComponent);
  fixture.componentRef.setInput('matches', model.seeded.matches);
  fixture.componentRef.setInput('teams', model.seeded.teams);
  fixture.componentRef.setInput('hybrid', true); fixture.detectChanges();
  expect(fixture.nativeElement.querySelector('.final-stage').textContent).toContain('Winner of match 1');
  expect(fixture.nativeElement.querySelectorAll('svg path')).toHaveLength(4);
  fixture.componentRef.setInput('matches', model.qualified.matches); fixture.detectChanges();
  const final = fixture.nativeElement.querySelector('.final-stage').textContent;
  for (const name of ['Nova', 'Falcons', 'Atlas', 'Comets']) expect(final).toContain(name);
  expect(final).not.toContain('Winner of match'); fixture.destroy();
});

function showcase(config = demo) {
  vi.useFakeTimers();
  // No runtime or persistence providers: the fictional final must be independently playable.
  TestBed.configureTestingModule({ providers: [provideRouter([]),
    { provide: COMPETITION_CONFIG, useValue: project }, { provide: FINAL_SHOWCASE, useValue: config }] });
  const fixture = TestBed.createComponent(FinalShowcaseComponent);
  fixture.componentInstance.director.reducedMotion.set(true);
  return fixture;
}

it('plays the entire fictional final without reading or writing a rehearsal', () => {
  const read = vi.spyOn(Storage.prototype, 'getItem'); const write = vi.spyOn(Storage.prototype, 'setItem');
  const fixture = showcase(); const c = fixture.componentInstance;
  c.play(); vi.advanceTimersByTime(118000);
  expect(c.chapter()).toBe(8); expect(c.playing()).toBe(false);
  expect(c.currentState().championId).toBe('nova');
  expect(read).not.toHaveBeenCalled(); expect(write).not.toHaveBeenCalled();
  fixture.destroy();
});

it('cancels chapter timers and hidden question reveals when the viewer navigates or pauses', () => {
  const fixture = showcase(); const c = fixture.componentInstance;
  c.director.reducedMotion.set(false); c.selectChapter(3); c.openQuestion();
  c.selectChapter(4); vi.advanceTimersByTime(20000);
  expect(c.chapter()).toBe(4); expect(c.questionOpen()).toBe(false);
  c.play(); c.pause(); vi.advanceTimersByTime(40000); expect(c.chapter()).toBe(4);
  fixture.destroy();
});

it('waits for an uploaded recap to end and recovers to the storyboard when media fails', () => {
  const fixture = showcase({ ...demo, recapVideo: '/projects/championship-show/media/mock-recap.mp4' });
  const c = fixture.componentInstance; c.play(); vi.advanceTimersByTime(76000);
  expect(c.chapter()).toBe(1);
  c.videoEnded(); expect(c.chapter()).toBe(2);
  c.go(1); c.videoError(); vi.advanceTimersByTime(33000); expect(c.chapter()).toBe(2);
  fixture.destroy();
});

it('lets the audience play all three silly breaks independently of the competition', () => {
  const fixture = TestBed.createComponent(QuizBreakComponent); fixture.componentRef.setInput('image', demo.mysteryImage); fixture.detectChanges();
  const c = fixture.componentInstance; c.guess('A tiny submarine'); fixture.detectChanges();
  expect(fixture.nativeElement.textContent).toContain('rubber duck in sunglasses');
  c.choose('wrong'); fixture.detectChanges(); expect(fixture.nativeElement.textContent).toContain('calculator join the band');
  c.choose('pose'); fixture.detectChanges(); expect(fixture.nativeElement.textContent).toContain('Play seated or standing');
  expect(fixture.nativeElement.textContent).toContain('No points. No grades.');
  fixture.destroy();
});
