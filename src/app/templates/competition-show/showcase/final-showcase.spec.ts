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

it('autostarts and advances every four seconds, revealing results before leaving each round without accessing a rehearsal', () => {
  const read = vi.spyOn(Storage.prototype, 'getItem'); const write = vi.spyOn(Storage.prototype, 'setItem');
  const fixture = showcase(); const c = fixture.componentInstance;
  c.director.reducedMotion.set(false);
  expect(c.playing()).toBe(true);
  for (let chapter = 0; chapter < 8; chapter++) {
    vi.advanceTimersByTime(3999); expect(c.chapter()).toBe(chapter);
    if ([3, 5, 7].includes(chapter)) expect(c.resultShown()).toBe(true);
    vi.advanceTimersByTime(1); expect(c.chapter()).toBe(chapter + 1);
  }
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

it('keeps the four-second cadence for a recap video and its failed-media storyboard fallback', () => {
  const fixture = showcase({ ...demo, recapVideo: '/projects/championship-show/media/mock-recap.mp4' });
  const c = fixture.componentInstance; c.play(); vi.advanceTimersByTime(3999);
  expect(c.chapter()).toBe(1);
  vi.advanceTimersByTime(1); expect(c.chapter()).toBe(2);
  c.go(1); c.videoError(); vi.advanceTimersByTime(3999); expect(c.chapter()).toBe(1);
  vi.advanceTimersByTime(1); expect(c.chapter()).toBe(2);
  fixture.destroy();
});

it('lets the audience play all three silly breaks independently of the competition', () => {
  const fixture = TestBed.createComponent(QuizBreakComponent); fixture.detectChanges();
  const c = fixture.componentInstance; c.guess('Loose pizza'); fixture.detectChanges();
  expect(fixture.nativeElement.textContent).toContain('Excellent at fractions');
  expect(fixture.nativeElement.querySelector('.odd-reveal').textContent).toContain('Loose pizza');
  c.nextOddRound(); fixture.detectChanges(); expect(c.revealed()).toBe(false);
  expect(fixture.nativeElement.textContent).toContain('T. rex');
  c.choose('wrong'); fixture.detectChanges(); expect(fixture.nativeElement.textContent).toContain('Homework-Eating Backpack');
  c.nextPitch(); fixture.detectChanges(); expect(fixture.nativeElement.textContent).toContain('Remote-Control Recess Button');
  c.choose('pose'); fixture.detectChanges(); expect(fixture.nativeElement.textContent).toContain('Play seated or standing');
  expect(fixture.nativeElement.textContent).toContain('No points. No grades.');
  fixture.destroy();
});

it('supports optional project recap artwork and rejects unsafe paths or missing descriptions', () => {
  expect(demo.highlights[0].image?.src).toContain('week-1-budget-surprise');
  expect(demo.highlights[1].image?.src).toContain('week-2-graph-showdown');
  const withImage = (image: unknown) => ({ ...demo, highlights: [{ ...demo.highlights[0], image }, ...demo.highlights.slice(1)] });
  expect(() => requireFinalShowcase(withImage(undefined), project)).not.toThrow();
  expect(() => requireFinalShowcase(withImage({ src: '//outside.example/image.png', alt: 'Recap' }), project)).toThrow();
  expect(() => requireFinalShowcase(withImage({ src: '/art/recap.png', alt: '' }), project)).toThrow();
});

it('reveals the refreshed quiz-break jokes during autoplay and cancels them when paused', () => {
  vi.useFakeTimers();
  const fixture = TestBed.createComponent(QuizBreakComponent); const c = fixture.componentInstance;
  fixture.componentRef.setInput('autoplay', true); fixture.detectChanges();
  vi.advanceTimersByTime(1599); expect(c.revealed()).toBe(false);
  vi.advanceTimersByTime(1); expect(c.revealed()).toBe(true);
  c.choose('wrong'); fixture.detectChanges(); vi.advanceTimersByTime(1600);
  expect(c.response()).toBe(c.pitches[0].tagline);
  c.nextPitch(); fixture.detectChanges(); fixture.componentRef.setInput('autoplay', false); fixture.detectChanges();
  vi.advanceTimersByTime(4000); expect(c.response()).toBe('');
  c.choose('pose'); fixture.componentRef.setInput('autoplay', true); fixture.detectChanges();
  vi.advanceTimersByTime(1600); expect(c.frozen()).toBe(true);
  fixture.destroy();
});

it('keeps navigation in the header and teacher controls behind an explicitly opened dialog', () => {
  const fixture = showcase(); const c = fixture.componentInstance; c.pause(); fixture.detectChanges();
  const root: HTMLElement = fixture.nativeElement;
  expect(root.querySelector('header nav[aria-label="Fictional final chapters"]')).not.toBeNull();
  expect(root.querySelector('main nav')).toBeNull(); expect(root.querySelector('footer')).toBeNull();
  expect(root.querySelectorAll('h1')).toHaveLength(1);
  expect(root.textContent).not.toContain('Open championship setup');
  c.play(); c.openTeacher(); fixture.detectChanges();
  expect(c.playing()).toBe(false); expect(c.teacherOpen()).toBe(true);
  expect(root.querySelector('dialog')?.textContent).toContain('Open championship setup');
  const chapter = c.chapter(); vi.advanceTimersByTime(5000); expect(c.chapter()).toBe(chapter);
  c.closeTeacher(); fixture.detectChanges(); expect(root.textContent).not.toContain('Open championship setup');
  expect(document.activeElement).toBe(c.teacherButton()?.nativeElement);
  fixture.destroy();
});

it('keeps the director off the audience stage and places game selection only in the header', () => {
  const fixture = showcase(); const c = fixture.componentInstance; c.selectChapter(3); fixture.detectChanges();
  const root: HTMLElement = fixture.nativeElement;
  expect(root.querySelector('[aria-label="Camera and show direction"]')).toBeNull();
  expect(root.textContent).not.toContain('Reveal scripted result');
  c.selectChapter(4); fixture.detectChanges();
  expect(root.querySelector('header [aria-label="Quiz break games"]')).not.toBeNull();
  expect(root.querySelector('main nav')).toBeNull();
  c.selectGame('wrong'); fixture.detectChanges(); expect(root.querySelector('main')?.textContent).toContain('Homework-Eating Backpack');
  fixture.destroy();
});
