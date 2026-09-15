import { TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { calendarMonumentConfig } from '../../../projects/calendar-monument/calendar-monument.config';
import { createLocalPreviewSession } from '../../../core/context/project-session-context';
import { PROJECT_LESSON_FOCUS } from '../../../shared/project-lessons/project-lesson-focus';
import type { ProjectLesson } from '../../../shared/project-lessons/project-lesson.models';
import {
  DESIGN_SIMULATIONS,
  DesignSimulationRegistry,
  DESIGN_QUEST_PROGRESS,
} from '../../../shared/engineering/design-simulation.registry';
import { SolarMonumentComponent } from '../../../plugins/simulations/solar-monument/solar-monument.component';
import {
  ENGINEERING_CONFIG,
  ENGINEERING_SESSION,
  ENGINEERING_PERSISTENCE,
  EngineeringDesignRuntime,
} from '../runtime/engineering-design.runtime';
import {
  requireEngineeringConfig,
  isEngineeringSnapshot,
  type EngineeringSnapshot,
} from '../domain/engineering-design.models';
import { EngineeringWeekWorkspaceComponent } from './engineering-week-workspace.component';
import type { DesignCapture } from '../../../shared/engineering/block-design';

describe('engineering weekly authoring preview', () => {
  let saved: EngineeringSnapshot | undefined;
  const lesson = signal<ProjectLesson | undefined>(undefined);
  beforeEach(() => {
    saved = undefined;
    lesson.set(undefined);
    const registry = new DesignSimulationRegistry();
    registry.register('simulation.solar-monument', SolarMonumentComponent);
    TestBed.configureTestingModule({
      providers: [
        EngineeringDesignRuntime,
        { provide: ENGINEERING_CONFIG, useValue: calendarMonumentConfig },
        {
          provide: ENGINEERING_SESSION,
          useValue: createLocalPreviewSession('calendar-monument', '1.0.0'),
        },
        {
          provide: ENGINEERING_PERSISTENCE,
          useValue: {
            location: 'Test memory',
            load: () => saved,
            save: (s: EngineeringSnapshot) => {
              saved = structuredClone(s);
            },
          },
        },
        { provide: PROJECT_LESSON_FOCUS, useValue: lesson },
        { provide: DESIGN_SIMULATIONS, useValue: registry },
      ],
    });
  });
  const capture = (runtime: EngineeringDesignRuntime, id: string): DesignCapture => ({
    id,
    pluginId: 'simulation.solar-monument',
    capturedAt: new Date().toISOString(),
    design: runtime.snapshot().previewDrafts!['stone-calendar'].design,
    settings: {
      localDate: '2026-06-21',
      minutes: 780,
      latitude: 38.83,
      longitude: -104.82,
      zone: 'America/Denver',
    },
    measurements: [{ label: 'Sun altitude', value: '74 degrees' }],
  });
  it('maps all eight host lessons to four substantive builds, matching planning and immediate controls', () => {
    const fixture = TestBed.createComponent(EngineeringWeekWorkspaceComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;
    const geometries = new Set<string>();
    for (let number = 1; number <= 8; number++) {
      lesson.set({ number } as ProjectLesson);
      fixture.detectChanges();
      const week = calendarMonumentConfig.previewWeeks![Math.floor((number - 1) / 2)];
      expect(component.selectedLesson()).toBe(number);
      expect(component.design()).toEqual(week.starter);
      expect(component.session()).toEqual(week.sessions[(number - 1) % 2]);
      expect(fixture.nativeElement.textContent).toContain(week.products[0]);
      expect(fixture.nativeElement.textContent).toContain(week.questions[0]);
      expect(fixture.nativeElement.textContent).toContain('Disconnected');
      expect(fixture.nativeElement.querySelector('textarea')).toBeNull();
      geometries.add(JSON.stringify(component.design()));
    }
    expect(geometries.size).toBe(4);
    expect(component.runtime.snapshot().trials).toEqual([]);
    expect(
      component.runtime.snapshot().events.some((e) => e.eventType === 'activity.completed'),
    ).toBe(false);
  });
  it('keeps edited and deliberately empty drafts through sessions and persistence reload', () => {
    const fixture = TestBed.createComponent(EngineeringWeekWorkspaceComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;
    component.saveDesign({ blocks: [], targets: [] });
    component.openLesson(8);
    component.openLesson(2);
    fixture.detectChanges();
    expect(component.design()).toEqual({ blocks: [], targets: [] });
    const reloaded = TestBed.runInInjectionContext(() => new EngineeringDesignRuntime());
    reloaded.openPreviewWeek('daily-sundial');
    expect(reloaded.snapshot().previewDrafts!['daily-sundial'].design.blocks).toEqual([]);
    expect(reloaded.snapshot().design).toEqual(calendarMonumentConfig.starterDesign);
  });
  it('directly enters the final and replays immutable trials despite an exhausted assessed notebook', () => {
    const runtime = TestBed.inject(EngineeringDesignRuntime);
    runtime.openPreviewWeek('stone-calendar');
    const trial = capture(runtime, 'first');
    runtime.snapshot.update((s) => ({
      ...s,
      trials: Array.from({ length: 40 }, (_, i) => ({
        ...trial,
        id: 'assessed-' + i,
        prediction: '',
      })),
    }));
    const fixture = TestBed.createComponent(EngineeringWeekWorkspaceComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;
    component.openLesson(8);
    runtime.capturePreview('stone-calendar', trial);
    runtime.capturePreview('stone-calendar', trial);
    expect(component.draft()?.trials.length).toBe(1);
    component.saveDesign({ blocks: [], targets: [] });
    component.replay(trial);
    fixture.detectChanges();
    expect(component.design()).toEqual(trial.design);
    expect(component.restore()?.settings).toEqual(trial.settings);
    for (let i = 0; i < 42; i++)
      runtime.capturePreview('stone-calendar', { ...trial, id: 'preview-' + i });
    expect(runtime.snapshot().trials.length).toBe(40);
    expect(component.draft()?.trials.length).toBe(40);
    expect(isEngineeringSnapshot(saved)).toBe(true);
    expect(runtime.snapshot().events.some((e) => e.eventType === 'activity.completed')).toBe(false);
  });
  it('saves a level win reported by the simulation once and shows it in the header', () => {
    const fixture = TestBed.createComponent(EngineeringWeekWorkspaceComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;
    expect(fixture.nativeElement.querySelector('app-engineering-sun-checks')).toBeNull();
    expect(fixture.nativeElement.querySelector('.predict-first')).toBeNull();
    const quest = component.session().quest!;
    expect(quest.id).toBe('animal-clock');
    expect(component.simulationInputs().quest).toEqual(quest);
    expect(component.simulationInputs().questCompleted).toBe(false);
    const report = component.simulationInjector.get(DESIGN_QUEST_PROGRESS);
    report({
      questId: quest.id,
      complete: false,
      progress: [
        { id: 'a', label: 'A', done: true },
        { id: 'b', label: 'B', done: false },
      ],
    });
    expect(component.questProgress()?.progress.filter((p) => p.done).length).toBe(1);
    report({ questId: 'summer-beam', complete: true, progress: [] });
    expect(component.draft()?.quests).toBeUndefined();
    report({ questId: quest.id, complete: true, progress: [{ id: 'a', label: 'A', done: true }] });
    const completedAt = component.draft()!.quests![quest.id].completedAt;
    report({ questId: quest.id, complete: true, progress: [{ id: 'a', label: 'A', done: true }] });
    expect(component.draft()!.quests![quest.id].completedAt).toBe(completedAt);
    fixture.detectChanges();
    expect(component.simulationInputs().questCompleted).toBe(true);
    expect(fixture.nativeElement.querySelector('.brief')).toBeNull();
    const reloaded = TestBed.runInInjectionContext(() => new EngineeringDesignRuntime());
    expect(reloaded.snapshot().previewDrafts!['daily-sundial'].quests![quest.id]).toBeTruthy();
    expect(isEngineeringSnapshot(saved)).toBe(true);
    expect(() => component.runtime.completeQuest('daily-sundial', 'summer-beam')).toThrow(
      'STATE_INVALID',
    );
    component.openLesson(3);
    fixture.detectChanges();
    expect(component.session().quest!.id).toBe('summer-beam');
    expect(component.levelComplete()).toBe(false);
    const ids = calendarMonumentConfig.previewWeeks!.flatMap((w) =>
      w.sessions.map((s) => s.quest!.id),
    );
    expect(new Set(ids).size).toBe(8);
    const weeks = structuredClone(calendarMonumentConfig.previewWeeks!);
    (weeks[1].sessions[0] as { quest?: unknown }).quest = { ...weeks[0].sessions[0].quest };
    expect(() =>
      requireEngineeringConfig(
        { ...calendarMonumentConfig, previewWeeks: weeks },
        'calendar-monument',
      ),
    ).toThrow('CONFIG_INVALID');
    expect(
      component.runtime.snapshot().events.some((e) => e.eventType === 'activity.completed'),
    ).toBe(false);
  });
  it('rejects invalid weekly configuration and disallows preview writes in assessed sessions', () => {
    expect(() =>
      requireEngineeringConfig(
        { ...calendarMonumentConfig, previewWeeks: calendarMonumentConfig.previewWeeks!.slice(1) },
        'calendar-monument',
      ),
    ).toThrow('CONFIG_INVALID');
    const weeks = structuredClone(calendarMonumentConfig.previewWeeks!);
    expect(() =>
      requireEngineeringConfig(
        { ...calendarMonumentConfig, previewWeeks: [weeks[0], weeks[0], weeks[2], weeks[3]] },
        'calendar-monument',
      ),
    ).toThrow('CONFIG_INVALID');
    TestBed.overrideProvider(ENGINEERING_SESSION, {
      useValue: createLocalPreviewSession('calendar-monument', '1.0.0', {
        mode: 'student',
        authorityMode: 'serverAuthoritative',
      }),
    });
    expect(() =>
      TestBed.inject(EngineeringDesignRuntime).openPreviewWeek('stone-calendar'),
    ).toThrow('STATE_INVALID');
  });
});
