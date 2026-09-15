import { TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { By } from '@angular/platform-browser';
import { afterEach, describe, expect, it, vi } from 'vitest';
import fixtureData from '../../../../../../public/projects/shadow-gallery/versions/2.0.0/project.json';
import { createLocalPreviewSession } from '../../../../core/context/project-session-context';
import { PROJECT_LESSON_FOCUS } from '../../../../shared/project-lessons/project-lesson-focus';
import type { ProjectLesson } from '../../../../shared/project-lessons/project-lesson.models';
import { PaintingCanvasComponent } from '../../../../shared/restoration/painting-canvas.component';
import { RESTORATION_MISSION, LocalRestorationAdapter } from '../restoration-collection.runtime';
import { requireRestorationMission } from '../restoration-collection.validation';
import { RestorationWeekWorkspaceComponent } from './restoration-week-workspace.component';
import { RestorationPreviewRuntime } from './restoration-preview.runtime';
import { LocalRestorationPreviewAdapter, RESTORATION_PREVIEW_PERSISTENCE, RESTORATION_PREVIEW_SESSION } from './restoration-preview.persistence';
import { RestorationSceneFilmComponent } from './restoration-scene-film.component';
const mission = requireRestorationMission(fixtureData);
const session = createLocalPreviewSession(mission.projectId, mission.projectVersion);
const lesson = (number: number): ProjectLesson => ({ number, title: 'Session', output: 'Picture', workspace: 'Studio', checkpoint: 'Future tutor', criteria: [], focusTarget: 'studio' });
async function setup(number = 1) {
  const focus = signal<ProjectLesson | undefined>(lesson(number));
  await TestBed.configureTestingModule({ imports: [RestorationWeekWorkspaceComponent], providers: [
    RestorationPreviewRuntime, { provide: RESTORATION_MISSION, useValue: mission },
    { provide: RESTORATION_PREVIEW_SESSION, useValue: session },
    { provide: RESTORATION_PREVIEW_PERSISTENCE, useValue: new LocalRestorationPreviewAdapter(session, mission) },
    { provide: PROJECT_LESSON_FOCUS, useValue: focus },
  ] }).compileComponents();
  const fixture = TestBed.createComponent(RestorationWeekWorkspaceComponent); fixture.detectChanges();
  return { fixture, focus, component: fixture.componentInstance, runtime: TestBed.inject(RestorationPreviewRuntime), root: fixture.nativeElement as HTMLElement };
}
describe('Restoration weekly preview', () => {
  afterEach(() => { TestBed.resetTestingModule(); localStorage.clear(); vi.restoreAllMocks(); });
  it('persists panorama interviews and three repairs independently of legacy drafts', async () => {
    const { fixture, runtime, focus } = await setup(1);
    const scene = mission.previewWeeks!.scenes![0];
    runtime.sceneAction(scene.id, { type: 'view', heading: 78 });
    runtime.sceneAction(scene.id, { type: 'visit', personId: scene.people[0].id });
    runtime.sceneAction(scene.id, { type: 'conversation', personId: scene.people[0].id, question: 'How did you make it?', answer: { role: 'character', text: 'From a tree trunk.', sourceIds: [scene.sources[0].id] } });
    for (const r of scene.repairs) runtime.sceneAction(scene.id, { type: 'repair', repairId: r.id, applied: true });
    const oldImage = runtime.image(scene.workId);
    focus.set(lesson(8)); fixture.detectChanges(); focus.set(lesson(1)); fixture.detectChanges();
    expect(runtime.sceneState(scene.id).heading).toBe(78);
    expect(runtime.sceneState(scene.id).conversations[scene.people[0].id]).toHaveLength(2);
    expect(oldImage.verified).toBe(false);
    fixture.destroy(); TestBed.resetTestingModule();
    const reloaded = await setup(1);
    expect(Object.values(reloaded.runtime.sceneState(scene.id).repairs)).toEqual([true, true, true]);
    expect(reloaded.runtime.sceneState(scene.id).conversations[scene.people[0].id]).toHaveLength(2);
  });
  it('binds all eight lessons to their actual scene and weekly planning', async () => {
    const { fixture, focus, component, root } = await setup();
    for (let n = 1; n <= 8; n++) {
      focus.set(lesson(n)); fixture.detectChanges();
      const expected = mission.previewWeeks!.weeks[Math.floor((n - 1) / 2)].sessions[(n - 1) % 2];
      expect(component.work().id).toBe(expected.workId);
      expect(root.querySelector('h1')?.textContent).toBe(expected.title);
      expect(component.mode()).toBe(n === 8 ? 'exhibit' : 'picture');
      expect(root.querySelectorAll('.directions li')).toHaveLength(3);
      expect(root.querySelector('.planning')?.textContent).toContain(expected.product);
      expect(root.querySelector('.tutor')?.textContent).toContain('Disconnected');
      expect(root.querySelector('form')).toBeNull();
    }
  });
  it('changes visible layers, preserves picture versions and undo across sessions', async () => {
    const { fixture, focus, component, runtime, root } = await setup(3);
    const workId = component.work().id;
    const canvas = fixture.debugElement.query(By.directive(PaintingCanvasComponent)).componentInstance as PaintingCanvasComponent;
    canvas.select.emit('detail'); fixture.detectChanges();
    component.edit('compass'); fixture.detectChanges();
    expect(root.querySelector('[data-region="detail"]')?.getAttribute('data-option')).toBe('compass');
    runtime.saveTrial(workId); component.edit('remove'); fixture.detectChanges();
    const trial = runtime.state().trials[workId][0];
    component.replayId.set(trial.id); fixture.detectChanges();
    expect(root.querySelector('[data-region="detail"]')?.getAttribute('data-option')).toBe('compass');
    expect(runtime.image(workId).choices['detail']).toBe('remove');
    focus.set(lesson(5)); fixture.detectChanges(); focus.set(lesson(3)); fixture.detectChanges();
    expect(component.state().choices['detail']).toBe('remove'); expect(component.trials()).toHaveLength(1);
    runtime.repair(workId, { type: 'undo' }); expect(component.state().choices['detail']).toBe('compass');
    expect(component.state().verified).toBe(false); expect(component.state().submissions).toBe(0);
  });
  it('opens the final directly despite a locked/exhausted old save and retains empty drafts on reload', async () => {
    const legacy = new LocalRestorationAdapter(session, mission);
    localStorage.setItem(legacy.key, JSON.stringify({ heistStarted: true, extracted: true, history: new Array(2400).fill({}) }));
    const savedLegacy = localStorage.getItem(legacy.key);
    const { component, runtime, fixture, focus } = await setup(8);
    expect(component.exhibit()).toHaveLength(2);
    const first = component.exhibit()[0].id;
    component.draftCaption(first, ''); component.saveCaptions();
    for (const work of [...component.exhibit()]) runtime.toggleExhibit(work.id);
    focus.set(lesson(1)); fixture.detectChanges(); focus.set(lesson(8)); fixture.detectChanges();
    expect(component.exhibit()).toEqual([]); expect(component.caption(first)).toBe('');
    expect(localStorage.getItem(legacy.key)).toBe(savedLegacy);
    fixture.destroy(); TestBed.resetTestingModule();
    const reloaded = await setup(8);
    expect(reloaded.component.exhibit()).toEqual([]); expect(reloaded.component.caption(first)).toBe('');
  });
  it('never overwrites a prior repair with final sample content', async () => {
    const { fixture, component, runtime, focus } = await setup(1);
    component.inspect('detail'); component.edit('remove'); runtime.repair(component.work().id, { type: 'undo' });
    focus.set(lesson(8)); fixture.detectChanges();
    expect(runtime.image(mission.works[0].id).choices['detail']).toBe('original');
    expect(runtime.state().sampleWorkIds).not.toContain(mission.works[0].id);
    expect(component.caption(mission.works[0].id)).toBe('');
  });
  it('opens film inspection points in the matching editable picture and saves the film position', async () => {
    const { fixture, component, runtime } = await setup(4);
    component.showFilm(); fixture.detectChanges();
    const film = fixture.debugElement.query(By.directive(RestorationSceneFilmComponent)).componentInstance as RestorationSceneFilmComponent;
    const player = film.player()!.nativeElement; vi.spyOn(player, 'pause').mockImplementation(() => {});
    film.seek(6); film.inspect(); fixture.detectChanges();
    expect(component.mode()).toBe('picture'); expect(component.region()?.id).toBe('context');
    expect(runtime.state().filmTimes[4]).toBe(6);
    expect(film.film().src).toContain('scene-4.mp4');
    component.showFilm(); fixture.detectChanges(); component.edit('unknown'); fixture.detectChanges();
    expect(component.mode()).toBe('picture'); expect(component.state().choices['context']).toBe('unknown');
  });
  it('preserves an extra painting choice and shows which planning context applies', async () => {
    const { fixture, component, focus, root } = await setup(2);
    component.choose(mission.works[10].id); fixture.detectChanges();
    expect(root.querySelector('.extra')?.textContent).toContain('Extra commission');
    focus.set(lesson(6)); fixture.detectChanges(); focus.set(lesson(2)); fixture.detectChanges();
    expect(component.work().id).toBe(mission.works[10].id);
  });
  it('pins references, reorders the exhibition and saves only authored captions', async () => {
    const { component, runtime } = await setup(8);
    const first = component.exhibit()[0].id, second = component.exhibit()[1].id;
    runtime.move(second, -1); expect(component.exhibit()[0].id).toBe(second);
    runtime.pinSource(first, 'exchange-origins'); expect(runtime.state().sources[first]).toEqual(['exchange-origins']);
    runtime.pinSource(first, 'missing-source'); expect(runtime.state().sources[first]).toHaveLength(1);
    component.draftCaption(first, 'Visitor-facing caption'); expect(runtime.state().captions[first]).not.toBe('Visitor-facing caption');
    component.saveCaptions(); expect(runtime.state().captions[first]).toBe('Visitor-facing caption');
    expect(runtime.repair(first, { type: 'submit' })).toBe(false);
  });
});
