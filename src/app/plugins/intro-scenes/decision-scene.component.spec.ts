import { TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { frontierTeaser } from '../../projects/intro-scenes/frontier.teaser';
import { museumTeaser } from '../../projects/intro-scenes/museum.teaser';
import { senateTeaser } from '../../projects/intro-scenes/senate.teaser';
import { newsroomTeaser } from '../../projects/intro-scenes/newsroom.teaser';
import { voyageTeaser } from '../../projects/intro-scenes/voyage.teaser';
import { survivalIslandHistoryTeaser } from '../../projects/intro-scenes/survival-island-history.teaser';
import {
  validateDecisionScene,
  type DecisionSceneConfig,
} from '../../shared/project-intro/decision-scene.models';
import {
  isTeaserResult,
  type ProjectTeaserResult,
} from '../../shared/project-intro/project-teaser.models';
import { LOAD_OBJECT_MODEL_VIEWER } from '../../shared/media/object-model-viewer.component';
import { DecisionSceneComponent } from './decision-scene.component';

describe('student thinking in opening scenes', () => {
  beforeEach(() => {
    vi.spyOn(HTMLMediaElement.prototype, 'pause').mockImplementation(() => {});
    HTMLElement.prototype.scrollIntoView = vi.fn();
    TestBed.configureTestingModule({
      imports: [DecisionSceneComponent],
      providers: [{ provide: LOAD_OBJECT_MODEL_VIEWER, useValue: () => Promise.resolve() }],
    });
  });
  afterEach(() => vi.restoreAllMocks());
  function setup(config: DecisionSceneConfig = frontierTeaser) {
    const fixture = TestBed.createComponent(DecisionSceneComponent);
    fixture.componentRef.setInput('config', config);
    fixture.detectChanges();
    const records: ProjectTeaserResult[] = [];
    fixture.componentInstance.completed.subscribe((record) => records.push(record));
    return { fixture, scene: fixture.componentInstance, records };
  }
  it('shows the returning trader before cargo or math, then focuses the first choice on continue', () => {
    const { fixture, scene, records } = setup();
    expect(fixture.nativeElement.querySelector('h1').textContent).toBe(
      frontierTeaser.prologue!.title,
    );
    expect(fixture.nativeElement.querySelector('.story-dialogue').textContent).toContain(
      'courage and the smarts',
    );
    expect(fixture.nativeElement.querySelector('.scene-choice, .answer-form')).toBeNull();
    scene.choose('rope');
    scene.depart();
    scene.finish();
    expect(scene.cargoItems()).toEqual([]);
    expect(scene.attempts()).toEqual([]);
    expect(records).toEqual([]);
    fixture.nativeElement.querySelector('.story-copy .primary-action').click();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('h1').textContent.trim()).toBe(
      frontierTeaser.prompt,
    );
    expect(fixture.nativeElement.querySelectorAll('.scene-choice')).toHaveLength(3);
    expect(document.activeElement).toBe(fixture.nativeElement.querySelector('h1'));
    scene.reset();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.story-stage')).not.toBeNull();
    scene.finish(true);
    expect(records[0].observations).toEqual([]);
    expect(records[0].thinking).toBeUndefined();
    fixture.destroy();
  });
  it('plays narration only on request, stops it on continue, and preserves the readable tale on audio failure', async () => {
    const play = vi.spyOn(HTMLMediaElement.prototype, 'play').mockResolvedValue();
    const { fixture, scene } = setup();
    expect(play).not.toHaveBeenCalled();
    scene.listenToStory();
    expect(play).toHaveBeenCalledTimes(1);
    expect(scene.activeLine()).toBe(0);
    scene.continuePrologue();
    await Promise.resolve();
    expect(scene.activeLine()).toBe(-1);
    expect(play).toHaveBeenCalledTimes(1);
    scene.toggleVoice();
    scene.reset();
    play.mockRejectedValue(new Error('Audio unavailable'));
    scene.listenToStory();
    await vi.waitFor(() => expect(scene.voices()).toBe(false));
    fixture.detectChanges();
    expect(scene.audioNotice()).toContain('Audio could not play');
    expect(fixture.nativeElement.querySelectorAll('.story-dialogue blockquote')).toHaveLength(3);
    fixture.destroy();
  });
  it('makes one keyboard-operable choice central in all six decision openings', () => {
    for (const config of [
      frontierTeaser,
      museumTeaser,
      senateTeaser,
      newsroomTeaser,
      voyageTeaser,
      survivalIslandHistoryTeaser,
    ]) {
      const { fixture, scene, records } = setup(config);
      expect(() => validateDecisionScene(config)).not.toThrow();
      if (config.prologue) {
        scene.continuePrologue();
        fixture.detectChanges();
      }
      expect(fixture.nativeElement.querySelector('h1').textContent.trim()).toBe(
        config.interaction === 'dispatch' ? config.headline : config.prompt,
      );
      expect(fixture.nativeElement.querySelectorAll('button.scene-choice')).toHaveLength(
        config.choices.length,
      );
      expect(fixture.nativeElement.querySelector('video[autoplay]')).toBeNull();
      scene.finish();
      expect(records).toEqual([]);
      fixture.destroy();
    }
  });
  it('requires student arithmetic, keeps wrong attempts, and never reveals the next total early', () => {
    const { fixture, scene, records } = setup();
    scene.continuePrologue();
    scene.choose('rope');
    scene.choose('cloth');
    scene.depart();
    fixture.detectChanges();
    expect(scene.stage()).toBe('thinking');
    expect(scene.selected()).toBeUndefined();
    expect(fixture.nativeElement.querySelector('input').value).toBe('');
    expect(fixture.nativeElement.querySelector('.math-receipt')).toBeNull();
    scene.finish();
    expect(records).toEqual([]);
    scene.answer.set('24');
    scene.checkMath();
    expect(scene.mathStep()).toBe('cost');
    expect(scene.feedback()).toContain('Try adding');
    for (const [step, answer] of [
      ['cost', '23'],
      ['remaining', '7'],
      ['sale', '27'],
      ['profit', '4'],
    ]) {
      expect(scene.mathStep()).toBe(step);
      scene.answer.set(answer);
      scene.checkMath();
    }
    expect(scene.stage()).toBe('reveal');
    scene.finish();
    scene.finish();
    expect(records).toHaveLength(1);
    expect(records[0].thinking).toEqual([
      { step: 'cost', answer: '24', correct: false },
      { step: 'cost', answer: '23', correct: true },
      { step: 'remaining', answer: '7', correct: true },
      { step: 'sale', answer: '27', correct: true },
      { step: 'profit', answer: '4', correct: true },
    ]);
    expect(records[0].observations.map((item) => item.sampleId)).toEqual(['rope', 'cloth']);
    expect(isTeaserResult(records[0])).toBe(true);
    fixture.destroy();
  });
  it('checks all cargo combinations and rejects malformed, empty, or wrong numeric responses', () => {
    for (const ids of [
      ['rope', 'cloth'],
      ['rope', 'provisions'],
      ['cloth', 'provisions'],
    ]) {
      const { fixture, scene } = setup();
      scene.continuePrologue();
      ids.forEach((id) => scene.choose(id));
      scene.depart();
      for (const value of ['', 'NaN', '23oops', 'Infinity']) {
        scene.answer.set(value);
        scene.checkMath();
        expect(scene.mathStep()).toBe('cost');
      }
      const totals = scene.cargoBalance();
      for (const value of [totals.cost, totals.remaining, totals.sale, totals.profit]) {
        scene.answer.set(String(value));
        scene.checkMath();
      }
      expect(scene.stage()).toBe('reveal');
      fixture.destroy();
    }
  });
  it('enforces capacity and affordability without treating an unfinished trade as observed evidence', () => {
    const { fixture, scene, records } = setup({
      ...frontierTeaser,
      cargo: { ...frontierTeaser.cargo!, startingCoins: 18 },
    });
    scene.continuePrologue();
    scene.choose('cloth');
    scene.choose('rope');
    expect(scene.cargoItems()).toHaveLength(1);
    scene.choose('cloth');
    scene.choose('rope');
    scene.choose('provisions');
    expect(scene.choiceDisabled(frontierTeaser.choices[1])).toBe(true);
    scene.depart();
    scene.finish(true);
    expect(records[0].observations).toEqual([]);
    expect(records[0].choiceId).toBeUndefined();
    fixture.destroy();
  });
  it('waits for a student-selected clue and a student-authored prediction before showing the voyage outcome', () => {
    const { fixture, scene, records } = setup(voyageTeaser);
    scene.choose('harbor');
    fixture.detectChanges();
    expect(scene.stage()).toBe('thinking');
    expect(fixture.nativeElement.textContent).not.toContain(
      voyageTeaser.choices[1].result.evidence,
    );
    scene.saveThought();
    expect(scene.stage()).toBe('thinking');
    scene.answer.set('The recent report may help us avoid bad winds.');
    scene.saveThought();
    expect(scene.stage()).toBe('thinking');
    scene.evidenceId.set('clue-2');
    scene.saveThought();
    scene.finish();
    expect(records[0].thinking?.[0]).toEqual({
      step: 'harbor',
      answer: 'The recent report may help us avoid bad winds.',
      evidenceId: 'clue-2',
    });
    expect(records[0].thinking?.[0].correct).toBeUndefined();
    fixture.destroy();
  });
  it('requires a new thought on replay and never invents thinking on skip', () => {
    const { fixture, scene, records } = setup(museumTeaser);
    scene.finish(true);
    expect(records[0].thinking).toBeUndefined();
    scene.reset();
    scene.choose('coffin');
    scene.answer.set('I notice lines across the decorated surface.');
    scene.saveThought();
    scene.reset();
    expect(scene.answer()).toBe('');
    expect(scene.attempts()).toEqual([]);
    expect(scene.selected()).toBeUndefined();
    fixture.destroy();
  });
  it('keeps media optional, swaps to the chart, and pauses speeches when moving to thinking', () => {
    const { fixture, scene } = setup(voyageTeaser);
    fixture.nativeElement.querySelector('.chart-action').click();
    fixture.detectChanges();
    expect(scene.videoFinished()).toBe(true);
    expect(fixture.nativeElement.querySelector('video')).toBeNull();
    fixture.destroy();
    const senate = setup(senateTeaser);
    const videos = Array.from(
      senate.fixture.nativeElement.querySelectorAll('video'),
    ) as HTMLVideoElement[];
    expect(videos).toHaveLength(2);
    expect(videos.every((video) => !video.autoplay && video.controls)).toBe(true);
    senate.scene.choose('challenge-leader');
    senate.fixture.detectChanges();
    expect(senate.scene.stage()).toBe('thinking');
    expect(senate.fixture.nativeElement.querySelector('video')).toBeNull();
    senate.fixture.destroy();
  });
  it('validates new thinking fields and bounded receipts while accepting legacy receipts', () => {
    expect(() =>
      validateDecisionScene({
        ...museumTeaser,
        choices: museumTeaser.choices.map((choice) => ({
          ...choice,
          thinking: { prompt: '', starter: 'I see', guide: 'Look' },
        })),
      }),
    ).toThrow('CONFIG_INVALID');
    const legacy = {
      eventType: 'projectIntro.teaserSkipped',
      teaserId: 'old',
      teaserVersion: '1.0.0',
      timestamp: new Date().toISOString(),
      observations: [],
    };
    expect(isTeaserResult(legacy)).toBe(true);
    expect(isTeaserResult({ ...legacy, thinking: [{ step: 'x', answer: 3 }] })).toBe(false);
    expect(() =>
      validateDecisionScene({
        ...frontierTeaser,
        cargo: { ...frontierTeaser.cargo!, startingCoins: 10 },
      }),
    ).toThrow('CONFIG_INVALID');
  });
});
