import { TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { By } from '@angular/platform-browser';
import { vi } from 'vitest';
vi.mock('phaser', () => ({}));
import data from '../../../../../../public/projects/castle-archive-rescue/project.json';
import { requireEscapeMission } from '../domain/escape.validation';
import { createLocalPreviewSession } from '../../../../core/context/project-session-context';
import { PROJECT_LESSON_FOCUS } from '../../../../shared/project-lessons/project-lesson-focus';
import type { ProjectLesson } from '../../../../shared/project-lessons/project-lesson.models';
import { projectLessonRegistry } from '../../../../runtime/project-launch/project-lesson.registry';
import { projectCatalog } from '../../../../projects/project-catalog';
import { heistLauncher } from '../../../../runtime/project-launch/template-launchers/heist.launcher';
import { ExpeditionComponent } from '../expedition/expedition.component';
import { ExpeditionExampleComponent } from '../expedition/expedition-example.component';
import { ESCAPE_MISSION, LocalEscapeAdapter } from '../runtime/escape-runtime';
import {
  MACHINE_SCENE_LOADER,
  MachineWorkshopComponent,
} from '../locks/machine-workshop.component';
import { GEAR_SCENE_LOADER, GearLockComponent } from '../gear-lock/gear-lock.component';
import { BALANCE_SCENE_LOADER, BalanceLockComponent } from '../balance-lock/balance-lock.component';
import { initialMachine } from '../locks/machine.rules';
import { machineWitness } from '../locks/machine.validation';
import { evaluateGearLock } from '../gear-lock/gear-lock.domain';
import { ExpeditionWeekWorkspaceComponent } from './expedition-week-workspace.component';
import { ExpeditionPreviewRuntime } from './expedition-preview.runtime';
import {
  EXPEDITION_PREVIEW_PERSISTENCE,
  EXPEDITION_PREVIEW_SESSION,
  LocalExpeditionPreviewAdapter,
} from './expedition-preview.persistence';
import type { ExpeditionPreviewSnapshot } from './expedition-preview.models';

const mission = requireEscapeMission(data);
const plan = projectLessonRegistry.find(mission.projectId, mission.projectVersion)!;
const session = createLocalPreviewSession(mission.projectId, mission.projectVersion, {
  actorId: 'castle-week-tests',
});
const locationIds = ['census', 'lookout', 'rabbits', 'foxes', 'owls', 'bridge', 'water', 'boat'];

describe('Expedition authoring weeks', () => {
  const focus = signal<ProjectLesson | undefined>(undefined);
  let saved: unknown;
  const save = vi.fn((snapshot: ExpeditionPreviewSnapshot) => {
    saved = structuredClone(snapshot);
  });
  beforeEach(() => {
    saved = undefined;
    focus.set(plan.lessons[0]);
    save.mockClear();
    TestBed.configureTestingModule({
      imports: [ExpeditionWeekWorkspaceComponent],
      providers: [
        ExpeditionPreviewRuntime,
        { provide: ESCAPE_MISSION, useValue: mission },
        { provide: EXPEDITION_PREVIEW_SESSION, useValue: session },
        { provide: EXPEDITION_PREVIEW_PERSISTENCE, useValue: { load: () => saved, save } },
        { provide: PROJECT_LESSON_FOCUS, useValue: focus },
        // Keep real math and keyboard controls. Only the asynchronous canvas host is replaced.
        {
          provide: MACHINE_SCENE_LOADER,
          useValue: async () => {
            throw new Error('Test canvas fallback');
          },
        },
        {
          provide: BALANCE_SCENE_LOADER,
          useValue: async () => {
            throw new Error('Test canvas fallback');
          },
        },
        {
          provide: GEAR_SCENE_LOADER,
          useValue: async () => {
            throw new Error('Test canvas fallback');
          },
        },
      ],
    });
  });
  async function create(number = 1) {
    focus.set(plan.lessons[number - 1]);
    const f = TestBed.createComponent(ExpeditionWeekWorkspaceComponent);
    f.detectChanges();
    await f.whenStable();
    f.detectChanges();
    return f;
  }
  it('binds all eight lessons to distinct workshops and their own planning panels', async () => {
    const f = await create();
    for (let number = 1; number <= 8; number++) {
      focus.set(plan.lessons[number - 1]);
      f.detectChanges();
      await f.whenStable();
      f.detectChanges();
      expect(f.componentInstance.runtime.selected()).toBe(locationIds[number - 1]);
      expect(f.nativeElement.querySelector('select').value).toBe(locationIds[number - 1]);
      expect(plan.lessons[number - 1].focusTarget).toBe(locationIds[number - 1]);
      const text = f.nativeElement.textContent;
      const week = mission.previewWeeks![Math.floor((number - 1) / 2)];
      expect(text).toContain(week.title);
      expect(text).toContain(week.sessions[0].product);
      expect(text).toContain(week.sessions[1].product);
      expect(text).toContain(week.questions[0]);
      expect(text).toContain('Disconnected');
      expect(f.nativeElement.querySelectorAll('form, textarea').length).toBe(0);
      expect(f.nativeElement.querySelectorAll('.planning details')).toHaveLength(2);
    }
    expect(save).not.toHaveBeenCalled(); // Opening sessions never fabricates work or results.
  });
  for (const number of [3, 5, 7, 8]) {
    it(`opens session ${number} directly with no prior work`, async () => {
      const f = await create(number);
      expect(f.componentInstance.runtime.selected()).toBe(locationIds[number - 1]);
      expect(f.nativeElement.querySelector('select').value).toBe(locationIds[number - 1]);
      expect(f.componentInstance.runtime.draft().trials).toEqual([]);
      expect(f.nativeElement.textContent).toContain('Sample setup');
      expect(f.nativeElement.querySelector('app-machine-workshop')).not.toBeNull();
    });
  }
  it('retains edits, intentionally empty settings, grade-specific drafts, and trial history across navigation and reload', async () => {
    const f = await create(8),
      c = f.componentInstance,
      r = c.runtime;
    const p = r.step().puzzle;
    if (p.type !== 'machine-lock') throw new Error('Expected final mixer');
    const answer = { ...initialMachine(p.lock), stages: p.lock.stages.map(machineWitness) };
    r.change(answer);
    r.trial();
    const firstTrial = r.draft().trials[0];
    expect(firstTrial.success).toBe(true);
    r.setGrade(6);
    expect(r.draft().trials).toHaveLength(0);
    r.setGrade(5);
    expect(r.draft().answer).toEqual(answer);
    r.reset();
    const empty = structuredClone(r.draft().answer);
    c.openLesson(1);
    c.openLesson(8);
    expect(r.draft().answer).toEqual(empty);
    expect(r.draft().trials).toHaveLength(1);
    f.destroy();
    const reloaded = TestBed.runInInjectionContext(() => new ExpeditionPreviewRuntime());
    reloaded.choose('boat');
    expect(reloaded.draft().answer).toEqual(empty);
    reloaded.restoreTrial(firstTrial.id);
    expect(reloaded.draft().answer).toEqual(answer);
    expect(reloaded.draft().trials).toHaveLength(1);
  });
  it('tests and re-edits successful final mixer settings without sealing or awarding completion', async () => {
    const f = await create(8),
      r = f.componentInstance.runtime;
    const child = f.debugElement.query(By.directive(MachineWorkshopComponent))
      .componentInstance as MachineWorkshopComponent;
    const award = vi.fn();
    child.solved.subscribe(award);
    const p = r.step().puzzle;
    if (p.type !== 'machine-lock') throw new Error('Expected mixer');
    r.change({ ...initialMachine(p.lock), stages: p.lock.stages.map(machineWitness) });
    f.detectChanges();
    child.test();
    f.detectChanges();
    expect(r.draft().trials[0].success).toBe(true);
    expect(child.state().seals).toEqual([]);
    expect(child.locked()).toBe(false);
    child.reset();
    f.detectChanges();
    child.test();
    expect(r.draft().trials.map((t) => t.success)).toEqual([true, false]);
    expect(award).not.toHaveBeenCalled();
  });
  it('opens the cable stage before the coordinate stage and captures stage-specific tests', async () => {
    const f = await create(6),
      r = f.componentInstance.runtime;
    const child = f.debugElement.query(By.directive(MachineWorkshopComponent))
      .componentInstance as MachineWorkshopComponent;
    child.selectStage(1);
    f.detectChanges();
    expect(child.stage().kind).toBe('cable');
    child.test();
    expect(r.draft().trials[0].stage).toBe(1);
    expect(child.state().seals).toHaveLength(0);
    child.controls.set(true);
    f.detectChanges();
    expect(f.nativeElement.textContent).toContain('Attach 6 m cable');
    f.componentInstance.restoreTrial(r.draft().trials[0].id);
    f.detectChanges();
    await f.whenStable();
    f.detectChanges();
    const restored = f.debugElement.query(By.directive(MachineWorkshopComponent)).componentInstance as MachineWorkshopComponent;
    expect(restored.active()).toBe(1);
  });
  it('keeps weight and gear controls operational and retains incorrect trials', async () => {
    const f = await create(1),
      r = f.componentInstance.runtime;
    const balance = f.debugElement.query(By.directive(BalanceLockComponent))
      .componentInstance as BalanceLockComponent;
    balance.place(0, 1);
    f.detectChanges();
    expect((r.draft().answer as readonly number[])[0]).toBe(0);
    balance.place(0, 2);
    f.detectChanges();
    expect((r.draft().answer as readonly number[])[0]).toBe(2);
    balance.engage();
    expect(r.draft().trials).toHaveLength(1);
    f.componentInstance.openLesson(4);
    f.detectChanges();
    await f.whenStable();
    f.detectChanges();
    const gear = f.debugElement.query(By.directive(GearLockComponent))
      .componentInstance as GearLockComponent;
    gear.test();
    expect(r.draft().trials[0].success).toBe(false);
    const p = r.step().puzzle;
    if (p.type !== 'gear-lock') throw new Error('Expected gears');
    let solution: number[] | undefined;
    for (let a = 0; a < p.lock.gears.length; a++)
      for (let b = 0; b < p.lock.gears.length; b++)
        for (let crank = 1; crank <= p.lock.maxCrank; crank++)
          if (evaluateGearLock(p.lock, [a, b, crank])) solution = [a, b, crank];
    expect(solution).toBeDefined();
    r.change(solution!);
    f.detectChanges();
    gear.test();
    f.detectChanges();
    expect(r.draft().trials.at(-1)?.success).toBe(true);
    expect(gear.locked()).toBe(false);
    gear.reset();
    f.detectChanges();
    expect(r.draft().answer).toEqual([-1, -1, 1]);
  });
  it('identifies an extra workshop while retaining the selected week plan', async () => {
    const f = await create(1);
    f.componentInstance.choose('boat');
    f.detectChanges();
    await f.whenStable();
    f.detectChanges();
    expect(f.componentInstance.extra()).toBe(true);
    expect(f.nativeElement.querySelector('.extra-note').textContent).toContain(
      'planning panels still describe Week 1',
    );
    expect(f.nativeElement.querySelector('.products').textContent).toContain(
      mission.previewWeeks![0].sessions[0].product,
    );
  });
  it('rejects invalid input, bounds trial history, and reports storage errors without losing drafts', () => {
    const r = TestBed.inject(ExpeditionPreviewRuntime);
    r.choose('boat');
    const before = r.draft().answer;
    r.change([999]);
    expect(r.draft().answer).toEqual(before);
    expect(r.warning()).toContain('INVALID_COMMAND');
    for (let i = 0; i < 35; i++) r.trial();
    expect(r.draft().trials).toHaveLength(30);
    save.mockImplementationOnce(() => {
      throw new Error('Quota');
    });
    r.reset();
    expect(r.warning()).toContain('could not save');
    expect(r.draft().trials).toHaveLength(30);
    r.retrySave();
    expect(r.warning()).toBe('');
  });
  it('keeps malformed saved data intact while allowing independent workshop testing', () => {
    saved = { version: 1, grade: 5, drafts: { '5:boat': { answer: [999], trials: [] } } };
    const r = TestBed.inject(ExpeditionPreviewRuntime);
    r.choose('boat');
    r.reset();
    r.trial();
    expect(r.draft().trials).toHaveLength(1);
    expect(r.warning()).toContain('saved copy is retained');
    expect(save).not.toHaveBeenCalled();
  });
  it('leaves an exhausted or locked rescue history untouched while testing the final', () => {
    const original = new LocalEscapeAdapter(session, mission);
    // Simulate an unusable legacy save. The preview does not load/reset this history.
    const exhausted = Array.from({ length: 1600 }, (_, i) => ({
      id: `legacy-${i}`,
      command: { type: 'start' as const },
    }));
    original.save(exhausted);
    const adapter = new LocalExpeditionPreviewAdapter(session, mission);
    TestBed.overrideProvider(EXPEDITION_PREVIEW_PERSISTENCE, { useValue: adapter });
    const r = TestBed.inject(ExpeditionPreviewRuntime);
    r.choose('boat');
    r.trial();
    r.reset();
    expect(r.draft().trials).toHaveLength(1);
    expect(original.load()).toEqual(exhausted);
  });
  it('keeps existing assessed rescue saves readable after adding preview-only content', () => {
    const legacy = new LocalEscapeAdapter(session, { ...mission, previewWeeks: undefined });
    const history = [{ id: 'existing-rescue', command: { type: 'start' as const } }];
    legacy.save(history);
    expect(new LocalEscapeAdapter(session, mission).load()).toEqual(history);
  });
  it('loads the previous balance preview through the targeted piston migration', () => {
    const oldMission = requireEscapeMission(JSON.parse(JSON.stringify(data).replaceAll('"mechanism":"piston-counterweight",', '')));
    const answer = Array(15).fill(0);
    answer[0] = 2;
    answer[1] = 1;
    const snapshot = { version: 1 as const, grade: 5 as const, drafts: { '5:census': { answer, trials: [] } } };
    new LocalExpeditionPreviewAdapter(session, oldMission).save(snapshot);
    const adapter = new LocalExpeditionPreviewAdapter(session, mission);
    expect(adapter.load()).toEqual(snapshot);
    TestBed.overrideProvider(EXPEDITION_PREVIEW_PERSISTENCE, { useValue: adapter });
    const runtime = TestBed.inject(ExpeditionPreviewRuntime);
    runtime.moveWeight(1, 2);
    expect((runtime.draft().answer as readonly number[]).slice(0, 2)).toEqual([2, 2]);
    expect(runtime.warning()).toBe('');
    expect(new LocalExpeditionPreviewAdapter(session, mission).load()).toEqual({ ...snapshot,
      drafts: { '5:census': { answer: [2, 2, ...Array(13).fill(0)], trials: [] } },
    });
  });
  it('preserves prior workshop answers and trials through the presentation-only fox upgrade', () => {
    const oldMission = requireEscapeMission(JSON.parse(JSON.stringify(data, (key, value) =>
      key === 'presentation' && value?.kind === 'gear-cage' ? undefined : value)));
    const snapshot: ExpeditionPreviewSnapshot = { version: 1, grade: 5, drafts: {
      '5:census': { answer: [1,2,...Array(13).fill(0)], trials: [] },
      '5:foxes': { answer: [2,1,2], trials: [{id:'old-fox-trial',stage:0,answer:[2,1,2],success:false,equation:'Drive 2 turns',feedback:'The drum stops short.'}] },
    } };
    new LocalExpeditionPreviewAdapter(session, oldMission).save(snapshot);
    const upgraded = new LocalExpeditionPreviewAdapter(session, mission);
    expect(upgraded.load()).toEqual(snapshot);
    upgraded.save(snapshot);
    expect(new LocalExpeditionPreviewAdapter(session, mission).load()).toEqual(snapshot);
    const history = [{ id: 'prior-rescue', command: { type: 'start' as const } }];
    new LocalEscapeAdapter(session, oldMission).save(history);
    expect(new LocalEscapeAdapter(session, mission).load()).toEqual(history);
  });
  it('preserves earlier workshop drafts and assessed history when the optics scene is added', () => {
    const oldMission = requireEscapeMission(JSON.parse(JSON.stringify(data, (key, value) =>
      key === 'presentation' && value?.kind === 'optics-cage' ? undefined : value)));
    const answer = { type: 'machine-lock' as const, stages: [{ kind: 'reflection' as const, angles: [45, 90] }], seals: [] };
    const snapshot: ExpeditionPreviewSnapshot = { version: 1, grade: 5, drafts: {
      '5:foxes': { answer: [2, 1, 3], trials: [] },
      '5:owls': { answer, trials: [{id:'old-ray',stage:0,answer,success:false,equation:'Mirror 1: 45°',feedback:'Receiver dark.'}] },
    } };
    new LocalExpeditionPreviewAdapter(session, oldMission).save(snapshot);
    expect(new LocalExpeditionPreviewAdapter(session, mission).load()).toEqual(snapshot);
    const history = [{ id: 'prior-optics', command: { type: 'start' as const } }];
    new LocalEscapeAdapter(session, oldMission).save(history);
    expect(new LocalEscapeAdapter(session, mission).load()).toEqual(history);
  });
  it('retains both bridge drafts, prior trials, and assessed history through the bridge presentation upgrade', () => {
    const oldMission = requireEscapeMission(JSON.parse(JSON.stringify(data, (key,value) =>
      key === 'presentation' && value?.kind === 'bridge-cage' ? undefined : value)));
    const answer = {type:'machine-lock' as const,stages:[{kind:'coordinate' as const,x:4,y:3},{kind:'cable' as const,cable:1}],seals:[]};
    const snapshot: ExpeditionPreviewSnapshot = {version:1,grade:5,drafts:{
      '5:bridge':{answer,trials:[{id:'prior-bridge',stage:1,answer,success:false,equation:'5 m attached',feedback:'Short cable.'}]},
      '5:foxes':{answer:[2,1,3],trials:[]},
    }};
    new LocalExpeditionPreviewAdapter(session,oldMission).save(snapshot);
    expect(new LocalExpeditionPreviewAdapter(session,mission).load()).toEqual(snapshot);
    const history=[{id:'prior-bridge-history',command:{type:'start' as const}}];
    new LocalEscapeAdapter(session,oldMission).save(history);
    expect(new LocalEscapeAdapter(session,mission).load()).toEqual(history);
  });
});

describe('Expedition preview configuration and launch boundary', () => {
  it('validates the eight references and rejects missing planning or duplicate sessions', () => {
    for (const change of ['reference', 'duplicate', 'questions']) {
      const copy = structuredClone(data);
      if (change === 'reference') copy.previewWeeks[3].sessions[1].stepId = 'missing';
      if (change === 'duplicate') copy.previewWeeks[3].sessions[1].stepId = 'census';
      if (change === 'questions') copy.previewWeeks[0].questions = [];
      expect(() => requireEscapeMission(copy)).toThrow('previewWeeks');
    }
  });
  it('selects only configured local previews and preserves assessed and final-example routes', async () => {
    const project = projectCatalog.find((p) => p.id === mission.projectId)!;
    const request = { project, projectDefinition: mission, session };
    expect((await heistLauncher.load(request)).component).toBe(ExpeditionWeekWorkspaceComponent);
    expect(
      (await heistLauncher.load({ ...request, session: { ...session, mode: 'student' } })).component,
    ).toBe(ExpeditionComponent);
    expect(
      (
        await heistLauncher.load({
          ...request,
          projectDefinition: { ...mission, previewWeeks: undefined },
        })
      ).component,
    ).toBe(ExpeditionComponent);
    expect((await heistLauncher.load({ ...request, view: 'final-demo' })).component).toBe(ExpeditionExampleComponent);
    expect(
      () => new LocalExpeditionPreviewAdapter({ ...session, mode: 'student' }, mission),
    ).toThrow('PERMISSION_DENIED');
  });
});
