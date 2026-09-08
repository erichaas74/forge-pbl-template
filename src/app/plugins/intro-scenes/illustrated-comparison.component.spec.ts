import { TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { unlabeledShelfTeaser } from '../../projects/intro-scenes/unlabeled-shelf.teaser';
import type { ProjectTeaserResult } from '../../shared/project-intro/project-teaser.models';
import { IllustratedComparisonComponent } from './illustrated-comparison.component';

describe('illustrated comparison opening', () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  function setup(storyMode = false) {
    TestBed.configureTestingModule({ imports: [IllustratedComparisonComponent] });
    const fixture = TestBed.createComponent(IllustratedComparisonComponent);
    fixture.componentRef.setInput('config', unlabeledShelfTeaser);
    fixture.componentRef.setInput('storyMode', storyMode);
    fixture.detectChanges();
    return fixture;
  }

  it('starts with captions and clear samples, with no autoplay or completion', () => {
    const fixture = setup();
    const component = fixture.componentInstance;
    const records: ProjectTeaserResult[] = [];
    component.completed.subscribe((result) => records.push(result));
    expect(component.voices()).toBe(false);
    expect(component.firstColor()).toBe(false);
    expect(fixture.nativeElement.textContent).toContain('Will both samples react the same way?');
    component.finish();
    expect(records).toEqual([]);
    fixture.destroy();
  });

  it('plays the launch story without practice questions, navigation, or fabricated responses', async () => {
    const fixture = setup(true);
    const component = fixture.componentInstance;
    const completed = vi.fn();
    component.completed.subscribe(completed);
    expect(fixture.nativeElement.querySelector('h1')).toBeNull();
    expect(fixture.nativeElement.querySelector('.story-dialogue').textContent).toContain(
      'Professor Pip',
    );
    expect(fixture.nativeElement.querySelector('.prediction-choices')).toBeNull();
    expect(component.voices()).toBe(false);
    const run = component.runTest();
    await vi.advanceTimersByTimeAsync(3350);
    await run;
    expect(component.stage()).toBe('reveal');
    expect(component.firstColor()).toBe(true);
    expect(component.secondColor()).toBe(true);
    component.showCase();
    fixture.detectChanges();
    expect(component.stage()).toBe('handoff');
    expect(fixture.nativeElement.querySelectorAll('.case-vials > g')).toHaveLength(4);
    expect(component.thinking()).toEqual([]);
    component.finish();
    component.finish(true);
    expect(completed).not.toHaveBeenCalled();
    component.reset();
    expect(component.stage()).toBe('welcome');
    expect(component.firstColor()).toBe(false);
    fixture.destroy();
  });

  it('reveals colors in order, keeps the clue after the puff, then hands over a recorded practice result', async () => {
    const fixture = setup();
    const component = fixture.componentInstance;
    const records: ProjectTeaserResult[] = [];
    component.completed.subscribe((result) => records.push(result));
    component.prediction.set('Same reaction');
    const test = component.runTest();
    await vi.advanceTimersByTimeAsync(850);
    expect(component.firstColor()).toBe(true);
    expect(component.secondColor()).toBe(false);
    await vi.advanceTimersByTimeAsync(1550);
    expect(component.stage()).toBe('poof');
    expect(component.secondColor()).toBe(true);
    await vi.advanceTimersByTimeAsync(950);
    await test;
    expect(component.stage()).toBe('reveal');
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('I need a hat');
    expect(fixture.nativeElement.textContent).toContain('Turned blue');
    expect(fixture.nativeElement.textContent).toContain('Turned pink');
    component.conclusion.set('same');
    component.showCase();
    expect(component.stage()).toBe('reveal');
    component.conclusion.set('different');
    component.showCase();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('.case-vials > g')).toHaveLength(4);
    component.finish();
    component.finish();
    expect(records).toHaveLength(1);
    expect(records[0]).toMatchObject({
      eventType: 'projectIntro.teaserCompleted',
      observations: [
        { sampleId: 'practice-a', result: 'Turned blue' },
        { sampleId: 'practice-b', result: 'Turned pink' },
      ],
    });
    fixture.destroy();
  });

  it('marks a skipped scene without inventing observed evidence', () => {
    const fixture = setup();
    const records: ProjectTeaserResult[] = [];
    fixture.componentInstance.completed.subscribe((result) => records.push(result));
    fixture.componentInstance.finish(true);
    expect(records[0].eventType).toBe('projectIntro.teaserSkipped');
    expect(records[0].observations).toEqual([]);
    fixture.destroy();
  });

  it('cancels pending animation on replay and destruction', async () => {
    const fixture = setup();
    const component = fixture.componentInstance;
    component.prediction.set('Same reaction');
    const firstRun = component.runTest();
    await vi.advanceTimersByTimeAsync(900);
    component.reset();
    await firstRun;
    await vi.advanceTimersByTimeAsync(3500);
    expect(component.stage()).toBe('welcome');
    expect(component.firstColor()).toBe(false);
    component.prediction.set('Not sure yet');
    const nextRun = component.runTest();
    fixture.destroy();
    await nextRun;
    await vi.advanceTimersByTimeAsync(3500);
    expect(component.secondColor()).toBe(false);
  });

  it('preserves only the observation already shown when a learner skips mid-test', async () => {
    const fixture = setup();
    const component = fixture.componentInstance;
    const records: ProjectTeaserResult[] = [];
    component.completed.subscribe((result) => records.push(result));
    component.prediction.set('Different reactions');
    const run = component.runTest();
    await vi.advanceTimersByTimeAsync(900);
    component.finish(true);
    await run;
    expect(records[0].observations).toEqual([{ sampleId: 'practice-a', result: 'Turned blue' }]);
    expect(records[0].eventType).toBe('projectIntro.teaserSkipped');
    fixture.destroy();
  });
});
