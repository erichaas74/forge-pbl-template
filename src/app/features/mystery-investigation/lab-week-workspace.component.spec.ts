import { TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { By } from '@angular/platform-browser';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { PROJECT_LESSON_FOCUS } from '../../shared/project-lessons/project-lesson-focus';
import type { ProjectLesson } from '../../shared/project-lessons/project-lesson.models';
import { WORKSPACE_DRAFTS, type WorkspaceDraftStore } from '../../shared/drafts/workspace-drafts';
import { createLocalPreviewSession } from '../../core/context/project-session-context';
import { projectCatalog } from '../../projects/project-catalog';
import { investigationLauncher } from '../../runtime/project-launch/template-launchers/investigation.launcher';
import { LabWeekWorkspaceComponent } from './lab-week-workspace.component';
import { LAB_AUTHORING_PREVIEW, LAB_PREVIEW_WEEKS, validateLabWeeks } from '../../projects/mystery-substance/lab-week.models';
import { mysterySubstanceWeeks } from '../../projects/mystery-substance/mystery-substance-weeks';
import { PropertiesLabComponent } from '../../projects/mystery-substance/properties-lab.component';
import { ReactionBenchComponent } from '../../projects/mystery-substance/reaction-bench.component';
import { ConservationChamberComponent } from '../../projects/mystery-substance/conservation-chamber.component';
import { EmergencyResponseComponent } from '../../projects/mystery-substance/emergency-response.component';
import { RestorationWorkspaceComponent } from '../../projects/mystery-substance/station-workspaces';

function lesson(number: number): ProjectLesson {
  return { number, title: 'Session', workspace: 'Lab', output: 'Product', checkpoint: 'Planning', criteria: [], focusTarget: 'lab' };
}
function memoryStore() {
  const values = new Map<string, unknown>();
  const store: WorkspaceDraftStore = {
    read: <T>(key: string) => structuredClone(values.get(key)) as T | undefined,
    write: <T>(key: string, value: T) => { values.set(key, structuredClone(value)); },
  };
  return { store, values };
}
async function setup(number = 1, store = memoryStore().store) {
  const focus = signal<ProjectLesson | undefined>(lesson(number));
  await TestBed.configureTestingModule({
    imports: [LabWeekWorkspaceComponent], providers: [
      { provide: LAB_AUTHORING_PREVIEW, useValue: true },
      { provide: LAB_PREVIEW_WEEKS, useValue: mysterySubstanceWeeks },
      { provide: WORKSPACE_DRAFTS, useValue: store },
      { provide: PROJECT_LESSON_FOCUS, useValue: focus },
    ],
  }).compileComponents();
  const fixture = TestBed.createComponent(LabWeekWorkspaceComponent);
  fixture.detectChanges();
  return { fixture, focus, workspace: fixture.componentInstance, root: fixture.nativeElement as HTMLElement };
}
async function finish(run: () => Promise<void>, milliseconds = 8000) {
  vi.useFakeTimers();
  try { const running = run(); await vi.advanceTimersByTimeAsync(milliseconds); await running; }
  finally { vi.useRealTimers(); }
}

describe('science lab weekly authoring preview', () => {
  afterEach(() => { TestBed.resetTestingModule(); vi.useRealTimers(); });

  it('opens all eight intended activities immediately from lesson context with week-specific planning', async () => {
    const { fixture, focus, workspace, root } = await setup();
    const expected = ['properties', 'properties', 'properties', 'reaction', 'conservation', 'conservation', 'emergency', 'restoration'];
    for (let number = 1; number <= 8; number++) {
      focus.set(lesson(number)); fixture.detectChanges();
      expect(workspace.session().activity.station).toBe(expected[number - 1]);
      const slot = root.querySelector('.lab-slot:not([hidden])')!;
      expect(slot.children[0].tagName.toLowerCase()).toBe(`app-${['properties-lab', 'properties-lab', 'properties-lab', 'reaction-bench', 'conservation-chamber', 'conservation-chamber', 'emergency-response', 'restoration-workspace'][number - 1]}`);
      expect(root.querySelector('.planning')?.textContent).toContain(workspace.week().questions[0]);
      expect(root.querySelectorAll('textarea')).toHaveLength(0);
      expect(slot.textContent).not.toMatch(/Save observation|File this screening|File the incident record|Save case draft/);
    }
    const labs = fixture.debugElement.queryAll(By.directive(PropertiesLabComponent)).map(item => item.componentInstance as PropertiesLabComponent);
    expect(labs.map(lab => lab.testId())).toEqual(['appearance', 'solubility', 'conductivity']);
    const chambers = fixture.debugElement.queryAll(By.directive(ConservationChamberComponent)).map(item => item.componentInstance as ConservationChamberComponent);
    expect(chambers.map(chamber => chamber.trialId())).toEqual(['closed', 'open']);
    expect(root.textContent).toContain('Not connected');
  });

  it.each([3, 4, 5, 6, 7, 8])('opens later session %i with no earlier work or completion state', async number => {
    const { workspace, root } = await setup(number);
    expect(workspace.opened().map(entry => entry.number)).toEqual([number]);
    expect(root.querySelector('.lab-slot:not([hidden])')).not.toBeNull();
    expect(root.querySelector('textarea')).toBeNull();
  });

  it('retains trial history, optics and deliberately empty drafts across navigation and reload', async () => {
    const { store } = memoryStore();
    const { fixture, workspace } = await setup(3, store);
    const lab = fixture.debugElement.query(By.directive(PropertiesLabComponent)).componentInstance as PropertiesLabComponent;
    const capture = vi.fn(); lab.captured.subscribe(capture);
    lab.selectVial('vial-b'); lab.setZoom(9);
    await finish(() => lab.run());
    lab.observation.set('');
    workspace.openLesson(8); fixture.detectChanges();
    workspace.openLesson(3); fixture.detectChanges();
    expect(lab.result()?.['millisiemens']).toBeDefined();
    expect(lab.trials()).toHaveLength(1);
    expect(capture).not.toHaveBeenCalled();
    fixture.destroy(); TestBed.resetTestingModule();
    const reopened = await setup(3, store);
    const restored = reopened.fixture.debugElement.query(By.directive(PropertiesLabComponent)).componentInstance as PropertiesLabComponent;
    expect(restored.vialId()).toBe('vial-b');
    expect(restored.testId()).toBe('conductivity');
    expect(restored.zoom()).toBe(9);
    expect(restored.observation()).toBe('');
    expect(restored.trials()).toHaveLength(1);
    expect(restored.phase()).toBe('settled');
  });

  it('shows extra exploration context and preserves the chosen tool on return', async () => {
    const { fixture, workspace, root } = await setup(1);
    const lab = fixture.debugElement.query(By.directive(PropertiesLabComponent)).componentInstance as PropertiesLabComponent;
    lab.selectTest('texture'); fixture.detectChanges();
    expect(workspace.extraFocus()).toBe(lab.activeTest().title);
    expect(root.querySelector('.tutor')?.textContent).toContain('Extra tool open:');
    workspace.openLesson(5); fixture.detectChanges();
    workspace.openLesson(1); fixture.detectChanges();
    expect(lab.testId()).toBe('texture');
  });

  it('keeps partial reaction measurements and stops the tap when leaving the session', async () => {
    const { fixture, workspace } = await setup(4);
    const bench = fixture.debugElement.query(By.directive(ReactionBenchComponent)).componentInstance as ReactionBenchComponent;
    bench.selectVial('vial-c'); bench.volumeMl.set(2.4); bench.toggleTap();
    workspace.openLesson(8); fixture.detectChanges();
    expect(bench.tapOpen()).toBe(false);
    workspace.openLesson(4); fixture.detectChanges();
    expect(bench.volumeMl()).toBe(2.4);
    expect(bench.vialId()).toBe('vial-c');
  });

  it('places a selected reaction vial using a keyboard-focusable button without dragging', async () => {
    const { fixture, root } = await setup(4);
    (root.querySelector('.vial-chip') as HTMLButtonElement).click();
    fixture.detectChanges();
    const place = [...root.querySelectorAll('button')].find(button => button.textContent?.includes('Place Vial A on bench'))!;
    expect(place).toBeDefined();
    expect(place.type).toBe('button');
    expect(place.disabled).toBe(false);
    place.click(); fixture.detectChanges();
    const bench = fixture.debugElement.query(By.directive(ReactionBenchComponent)).componentInstance as ReactionBenchComponent;
    expect(bench.vialId()).toBe('vial-a');
    expect(bench.step()).toBe('fill');
    expect(root.querySelector('[aria-label="Open the solution valve. Currently closed."]')?.hasAttribute('disabled')).toBe(false);
  });

  it('runs open and sealed chamber models without capturing assessed work', async () => {
    const { fixture, root } = await setup(6);
    const chamber = fixture.debugElement.query(By.directive(ConservationChamberComponent)).componentInstance as ConservationChamberComponent;
    const capture = vi.fn(); chamber.captured.subscribe(capture);
    await finish(() => chamber.run());
    expect(chamber.massDelta()).toBeLessThan(0);
    chamber.selectTrial('closed'); await finish(() => chamber.run());
    expect(chamber.massDelta()).toBe(0);
    expect(chamber.log()).toHaveLength(2);
    fixture.detectChanges();
    expect(root.querySelector('textarea')).toBeNull();
    expect(capture).not.toHaveBeenCalled();
  });

  it('retains exhausted incident history and allows a fresh budget without a reasoning form', async () => {
    const { store } = memoryStore();
    const first = await setup(7, store);
    const emergency = first.fixture.debugElement.query(By.directive(EmergencyResponseComponent)).componentInstance as EmergencyResponseComponent;
    await finish(() => emergency.runTest(emergency.tests[0]), 2000);
    emergency.minutesLeft.set(0); emergency.chooseCall('contain'); emergency.fileCall();
    first.fixture.destroy(); TestBed.resetTestingModule();
    const next = await setup(7, store);
    const restored = next.fixture.debugElement.query(By.directive(EmergencyResponseComponent)).componentInstance as EmergencyResponseComponent;
    expect(restored.minutesLeft()).toBe(0); expect(restored.verdict()).toBeDefined();
    restored.restartPreview();
    expect(restored.attemptHistory()[0].tests).toHaveLength(1);
    expect(restored.minutesLeft()).toBe(25); expect(restored.verdict()).toBeUndefined();
    expect(restored.blockedReason(restored.tests[0])).toBeUndefined();
    expect(restored.blockedReason(restored.tests.find(test => test.id === 'conductivity')!)).toContain('first');
    await finish(() => restored.runTest(restored.tests[0]), 2000);
    expect(restored.minutesLeft()).toBe(23);
    expect(restored.ran()).toHaveLength(1);
  });

  it('edits the final shelf and never reseeds a deliberately cleared sample after reload', async () => {
    const { store } = memoryStore();
    const first = await setup(8, store);
    const shelf = first.fixture.debugElement.query(By.directive(RestorationWorkspaceComponent)).componentInstance as RestorationWorkspaceComponent;
    expect(shelf.activeAssignment().zoneId).toBeDefined();
    expect((first.root.querySelector('[aria-label="Shelf position"]') as HTMLSelectElement).value).toBe(shelf.zones[0].id);
    shelf.setField('labelId', shelf.labels[0].id);
    shelf.selectVial('vial-b'); expect(shelf.usedByOther(shelf.labels[0].id)).toBe(true);
    shelf.selectVial('vial-a'); shelf.clearAssignment();
    first.fixture.destroy(); TestBed.resetTestingModule();
    const second = await setup(8, store);
    const restored = second.fixture.debugElement.query(By.directive(RestorationWorkspaceComponent)).componentInstance as RestorationWorkspaceComponent;
    expect(restored.assignments()['vial-a']).toEqual({});
    expect(second.root.querySelector('textarea')).toBeNull();
  });

  it('limits the launcher to local preview and preserves assessed and final-example paths', async () => {
    const project = projectCatalog.find(project => project.id === 'mystery-substance')!;
    const session = createLocalPreviewSession(project.id, project.projectVersion);
    const request = { project, session, projectDefinition: {} };
    expect((await investigationLauncher.load(request)).component).toBe(LabWeekWorkspaceComponent);
    expect((await investigationLauncher.load({ ...request, session: { ...session, authorityMode: 'serverAuthoritative' } })).component).not.toBe(LabWeekWorkspaceComponent);
    expect((await investigationLauncher.load({ ...request, session: { ...session, mode: 'student' } })).component).not.toBe(LabWeekWorkspaceComponent);
    expect((await investigationLauncher.load({ ...request, view: 'final-demo' })).component).not.toBe(LabWeekWorkspaceComponent);
  });

  it('validates week, session and station references before opening a workspace', () => {
    expect(validateLabWeeks(mysterySubstanceWeeks)).toEqual([]);
    expect(validateLabWeeks(mysterySubstanceWeeks.slice(1))).not.toEqual([]);
    const invalid = structuredClone(mysterySubstanceWeeks);
    Object.assign(invalid[0].sessions[0].activity, { test: 'missing' });
    expect(validateLabWeeks(invalid).join()).toContain('LAB_ACTIVITY_UNAVAILABLE');
  });
});
