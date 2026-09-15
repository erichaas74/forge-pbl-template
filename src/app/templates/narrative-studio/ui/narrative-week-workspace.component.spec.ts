import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { createLocalPreviewSession } from '../../../core/context/project-session-context';
import { survivalIslandStoryLabConfig as config } from '../../../projects/survival-island-story-lab/survival-island.config';
import { PROJECT_LESSON_FOCUS } from '../../../shared/project-lessons/project-lesson-focus';
import type { ProjectLesson } from '../../../shared/project-lessons/project-lesson.models';
import { usesNarrativeWeeklyPreview, validateNarrativePreview } from '../core/narrative-preview';
import { NARRATIVE_STUDIO_PERSISTENCE } from '../persistence/narrative-studio.persistence';
import { NARRATIVE_STUDIO_COACH, NARRATIVE_STUDIO_CONFIG, NARRATIVE_STUDIO_SESSION } from '../runtime/narrative-studio.tokens';
import { NarrativeWeekWorkspaceComponent } from './narrative-week-workspace.component';

const lesson = (number: number): ProjectLesson => ({ number, title: 'Test', output: '', workspace: '', checkpoint: '', criteria: [], focusTarget: 'write' });
async function setup(number = 1) {
  const focus = signal<ProjectLesson | undefined>(lesson(number));
  const storage = { load: vi.fn(() => { throw new Error('Student storage must not be read'); }), save: vi.fn(), clear: vi.fn() };
  const coach = { respond: vi.fn() };
  Object.defineProperty(HTMLElement.prototype, 'scrollTo', { configurable: true, writable: true, value: vi.fn() });
  await TestBed.configureTestingModule({ imports: [NarrativeWeekWorkspaceComponent], providers: [
    { provide: NARRATIVE_STUDIO_CONFIG, useValue: config },
    { provide: NARRATIVE_STUDIO_SESSION, useValue: createLocalPreviewSession(config.projectId, config.projectVersion) },
    { provide: PROJECT_LESSON_FOCUS, useValue: focus },
    { provide: NARRATIVE_STUDIO_PERSISTENCE, useValue: storage },
    { provide: NARRATIVE_STUDIO_COACH, useValue: coach },
  ] }).compileComponents();
  const fixture = TestBed.createComponent(NarrativeWeekWorkspaceComponent);
  fixture.detectChanges();
  return { fixture, focus, storage, coach, component: fixture.componentInstance, root: fixture.nativeElement as HTMLElement };
}

describe('Story writing weekly test workspace', () => {
  afterEach(() => { TestBed.resetTestingModule(); vi.restoreAllMocks(); });

  it('opens all eight intended tools/scenes with week-specific content and disconnected planning', async () => {
    const { fixture, focus, component, root } = await setup();
    for (let number = 1; number <= 8; number++) {
      focus.set(lesson(number)); fixture.detectChanges();
      const week = config.previewWeeks![Math.floor((number - 1) / 2)];
      const session = week.sessions[(number - 1) % 2];
      expect(component.tool()).toBe(session.tool);
      expect(component.runtime().state().selectedNodeId).toBe(session.nodeId);
      const sceneSelector = root.querySelector<HTMLSelectElement>('select[aria-label="Writing scene"]');
      if (sceneSelector) expect(sceneSelector.value).toBe(session.nodeId);
      expect(root.textContent).toContain(week.title);
      expect(root.textContent).toContain(week.questions[0]);
      expect(root.textContent).toContain(week.sessions[1].product);
      expect(root.textContent).toContain('Not connected');
      expect(root.querySelector('form, input[type="checkbox"], app-narrative-coach-panel')).toBeNull();
      expect(component.runtime().state().published).toBeUndefined();
    }
  });

  it.each([3, 5, 7, 8])('opens later session %s from scratch without reading old saved/publication state', async (number) => {
    const { component, fixture, storage, coach } = await setup(number);
    component.chooseTool('read');
    while (component.readerNode().choices.length) component.choosePath(component.readerNode().choices[0].nextNodeId);
    expect(component.currentReadings()).toHaveLength(1);
    expect(component.readerNode().kind).toBe('ending');
    fixture.destroy();
    expect(storage.load).not.toHaveBeenCalled();
    expect(storage.save).not.toHaveBeenCalled();
    expect(coach.respond).not.toHaveBeenCalled();
  });

  it('keeps edited and deliberately empty scenes across sessions and weeks, then resets on a fresh page', async () => {
    const { component, fixture, focus } = await setup();
    const textarea = fixture.nativeElement.querySelector('textarea') as HTMLTextAreaElement;
    textarea.value = ''; textarea.dispatchEvent(new Event('input')); fixture.detectChanges();
    expect(component.runtime().selectedScene().text).toBe('');
    focus.set(lesson(2)); fixture.detectChanges();
    component.runtime().updateSceneText('My own dialogue.');
    focus.set(lesson(8)); fixture.detectChanges();
    focus.set(lesson(1)); fixture.detectChanges();
    expect(component.runtime().selectedScene().text).toBe('');
    focus.set(lesson(2)); fixture.detectChanges();
    expect(component.runtime().selectedScene().text).toBe('My own dialogue.');
    fixture.destroy();
    const fresh = TestBed.createComponent(NarrativeWeekWorkspaceComponent); fresh.detectChanges();
    expect(fresh.componentInstance.runtime().selectedScene().text).toContain('We should stay');
    fresh.destroy();
  });

  it('preserves a temporary reader replay after prose and graph edits without recording assessment paths', async () => {
    const { component, fixture, focus } = await setup(8);
    component.choosePath('tower'); component.choosePath('climax'); component.choosePath('together-end');
    const reading = component.currentReadings()[0];
    component.selectScene('together-end');
    component.runtime().updateSceneText('A different ending.');
    component.changeBranch('branch');
    expect(component.runtime().selectedNode().choices).toHaveLength(2);
    focus.set(lesson(1)); fixture.detectChanges(); focus.set(lesson(8)); fixture.detectChanges();
    expect(component.currentReadings()).toHaveLength(1);
    component.replayPath(reading);
    component.choosePath('tower'); component.choosePath('climax'); component.choosePath('together-end');
    expect(component.readerScene().text).toContain('The cloth held');
    expect(component.readerNode().kind).toBe('ending');
    expect(component.runtime().state().playtests).toHaveLength(0);
    expect(component.runtime().state().published).toBeUndefined();
  });

  it('supports reversible graph edits and identifies extra tools', async () => {
    const { component, fixture, root } = await setup(3);
    component.selectScene('rope'); component.runtime().updateSceneText('A new crossing dilemma.');
    const children = component.runtime().selectedNode().choices;
    component.changeBranch('finish');
    expect(component.runtime().selectedNode().choices).toHaveLength(0);
    component.changeBranch('branch');
    expect(component.runtime().selectedNode().choices).toEqual(children);
    expect(component.runtime().selectedScene().text).toBe('A new crossing dilemma.');
    fixture.detectChanges(); expect(root.textContent).toContain('Extra tool open');
  });

  it('validates samples and rejects invalid targets, missing weeks, cycles, and use outside local preview', () => {
    expect(() => validateNarrativePreview(config)).not.toThrow();
    expect(() => validateNarrativePreview({ ...config, previewWeeks: config.previewWeeks!.slice(1) })).toThrow('NARRATIVE_PREVIEW_INVALID');
    const weeks = structuredClone(config.previewWeeks!);
    const invalid = { ...weeks[0], sessions: [{ ...weeks[0].sessions[0], nodeId: 'missing' }, weeks[0].sessions[1]] as const };
    expect(() => validateNarrativePreview({ ...config, previewWeeks: [invalid, ...weeks.slice(1)] })).toThrow('session targets');
    const cyclic = { ...weeks[0], scenes: weeks[0].scenes.map((scene, index) => index === 1 ? { ...scene, choices: scene.choices.map((choice) => ({ ...choice, nextNodeId: 'shore' })) } : scene) };
    expect(() => validateNarrativePreview({ ...config, previewWeeks: [cyclic, ...weeks.slice(1)] })).toThrow();
    const session = createLocalPreviewSession(config.projectId, config.projectVersion);
    expect(usesNarrativeWeeklyPreview(config, session)).toBe(true);
    expect(usesNarrativeWeeklyPreview(config, { ...session, mode: 'student' })).toBe(false);
    expect(usesNarrativeWeeklyPreview(config, { ...session, authorityMode: 'serverAuthoritative' })).toBe(false);
    expect(usesNarrativeWeeklyPreview({ ...config, previewWeeks: undefined }, session)).toBe(false);
  });
});
