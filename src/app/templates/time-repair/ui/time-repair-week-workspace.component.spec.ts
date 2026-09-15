import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { signal } from '@angular/core';
import { vi } from 'vitest';
import raw from '../../../../../public/projects/exploration-time-repair/project.json';
import { createLocalPreviewSession } from '../../../core/context/project-session-context';
import { PROJECT_LESSON_FOCUS } from '../../../shared/project-lessons/project-lesson-focus';
import type { ProjectLesson } from '../../../shared/project-lessons/project-lesson.models';
import { requireTimeRepairConfig } from '../domain/time-repair.validation';
import {
  chronologyConflicts,
  createRepairPreviewDraft,
  moveRepairItem,
} from '../domain/time-repair-preview.models';
import { validRepairPreviewDraft } from '../domain/time-repair-preview.validation';
import { TIME_REPAIR_CONFIG, TIME_REPAIR_SESSION } from '../runtime/time-repair.runtime';
import {
  RepairPreviewRuntime,
  TIME_REPAIR_FINAL_EXAMPLE,
} from '../runtime/time-repair-preview.runtime';
import { BrowserRepairPreviewPersistence } from '../runtime/time-repair-preview.persistence';
import { BrowserTimeRepairPersistence } from '../runtime/time-repair.persistence';
import {
  applyTimeRepairAction,
  chargesRemaining,
  initialTimeRepairState,
} from '../domain/time-repair.engine';
import { TIME_REPAIR_EVENTS, type TimeRepairAction } from '../domain/time-repair.models';
import { TimeRepairWeekWorkspaceComponent } from './time-repair-week-workspace.component';

const config = requireTimeRepairConfig(raw);
const session = createLocalPreviewSession(config.projectId, config.projectVersion);
const lesson = signal<ProjectLesson | undefined>(undefined);
describe('Time Repair weekly authoring workspace', () => {
  beforeEach(async () => {
    localStorage.clear();
    lesson.set(undefined);
    Object.defineProperty(HTMLElement.prototype, 'scrollIntoView', {
      configurable: true,
      value: vi.fn(),
    });
    await TestBed.configureTestingModule({
      imports: [TimeRepairWeekWorkspaceComponent],
      providers: [
        provideRouter([]),
        { provide: TIME_REPAIR_CONFIG, useValue: config },
        { provide: TIME_REPAIR_SESSION, useValue: session },
        { provide: PROJECT_LESSON_FOCUS, useValue: lesson },
      ],
    }).compileComponents();
  });
  afterEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });
  function setup() {
    const fixture = TestBed.createComponent(TimeRepairWeekWorkspaceComponent);
    fixture.detectChanges();
    return {
      fixture,
      r: fixture.debugElement.injector.get(RepairPreviewRuntime),
      root: fixture.nativeElement as HTMLElement,
    };
  }
  it('binds all eight lessons to distinct session tools and matching planning, without assessment forms', async () => {
    const { fixture, r, root } = setup();
    const expected = [
      'scene',
      'scene',
      'timeline',
      'timeline',
      'ripple',
      'ripple',
      'exhibit',
      'exhibit',
    ];
    for (let number = 1; number <= 8; number++) {
      lesson.set({
        number,
        title: 'Test lesson',
        output: 'Product',
        workspace: 'Activity',
        checkpoint: 'Future discussion',
        criteria: ['Evidence'],
        focusTarget: 'week-workspace',
      });
      fixture.detectChanges();
      await fixture.whenStable();
      fixture.detectChanges();
      expect(r.lesson()).toBe(number);
      expect(root.querySelector(`app-repair-${expected[number - 1]}-workbench`)).not.toBeNull();
      expect(root.textContent).toContain(r.session().action);
      expect(root.textContent).toContain(r.week().questions[0]);
      expect(root.textContent).toContain('Not connected');
      expect(root.querySelector('form')).toBeNull();
    }
  });
  it('runs and replays repairs repeatedly without touching an exhausted assessed save', () => {
    let saved = initialTimeRepairState(config);
    const mission = config.missions[0];
    const reasoning =
      'The Andean crop history and later cultivation record contradict the premature European harbor cargo.';
    const dispatch = (action: TimeRepairAction) => {
      const id = crypto.randomUUID();
      saved = applyTimeRepairAction(config, saved, action, {
        id,
        clientEventId: id,
        eventType: TIME_REPAIR_EVENTS[action.type],
        timestamp: new Date().toISOString(),
        tenantId: session.tenantId,
        projectId: config.projectId,
        actor: { type: 'student', id: session.actorId },
      }).state;
    };
    for (const evidenceId of mission.evidenceRequired) {
      dispatch({ type: 'collect', evidenceId });
      dispatch({
        type: 'link',
        missionId: mission.id,
        link: { evidenceId, relationship: 'contradicts', note: reasoning, confidence: 'confident' },
      });
    }
    dispatch({
      type: 'defend',
      missionId: mission.id,
      defense: {
        category: mission.evaluation.category,
        answerId: mission.evaluation.defenseOptionId,
        claim: reasoning,
        consequence: reasoning,
        explanation: reasoning,
      },
    });
    dispatch({ type: 'jump', missionId: mission.id });
    dispatch({ type: 'inspect', missionId: mission.id, hotspotId: mission.repair.targetHotspotId });
    for (let attempt = 0; attempt < config.settings.repairCharges; attempt++)
      dispatch({ type: 'repair', missionId: mission.id, optionId: 'keep' });
    expect(chargesRemaining(config, saved)).toBe(0);
    const assessed = new BrowserTimeRepairPersistence(config, session, localStorage);
    assessed.save(saved, 0);
    const legacyConfig = requireTimeRepairConfig({ ...raw, previewWeeks: undefined });
    expect(new BrowserTimeRepairPersistence(legacyConfig, session, localStorage).load()).toEqual(
      saved,
    );
    const { r } = setup();
    r.open(6);
    r.run();
    expect(r.message()).toContain('Choose an intervention');
    r.selectOption('keep');
    r.run();
    expect(r.trial()?.supported).toBe(false);
    r.selectOption('');
    r.run();
    expect(r.draft().trials).toHaveLength(1);
    r.selectOption('quarantine');
    r.run();
    expect(r.trial()?.supported).toBe(true);
    r.replayId.set(1);
    expect(r.trial()?.optionId).toBe('keep');
    r.open(1);
    r.open(6);
    expect(r.draft().trials).toHaveLength(2);
    expect(assessed.load()).toEqual(saved);
  });
  it('opens the final directly and keeps edits, reordered panels, and intentionally empty captions through navigation and reload', () => {
    let current = setup();
    current.r.open(8);
    expect(current.r.draft().panels.length).toBe(4);
    current.r.editPanel({ title: 'Our exhibit', caption: '' });
    current.r.save();
    current.r.movePanel(1);
    current.r.open(7);
    expect(current.r.draft().panels[0].caption).not.toBe('');
    current.r.open(8);
    expect(current.r.draft().panels[1].caption).toBe('');
    current.fixture.destroy();
    current = setup();
    current.r.open(8);
    expect(current.r.draft().panels[1].title).toBe('Our exhibit');
    expect(current.r.draft().panels[1].caption).toBe('');
    current.r.open(3);
    current.r.moveNode(0, 1);
    const order = current.r.draft().nodeIds;
    current.r.open(4);
    current.r.link('andean-farming', 'andean-origin');
    current.r.open(3);
    expect(current.r.draft().nodeIds).toEqual(order);
    current.r.open(4);
    expect(current.r.draft().links['andean-farming']).toBe('andean-origin');
  });
  it('updates the actual exhibit from its labeled editor and opens a read-only tour', async () => {
    const { fixture, r, root } = setup();
    r.open(8);
    fixture.detectChanges();
    await fixture.whenStable();
    const input = root.querySelector<HTMLInputElement>('[aria-label="Exhibit title"]')!;
    input.value = 'A repaired record';
    input.dispatchEvent(new Event('input'));
    input.dispatchEvent(new Event('blur'));
    fixture.detectChanges();
    await fixture.whenStable();
    expect(root.querySelector('.exhibit-card h2')?.textContent).toBe('A repaired record');
    const tour = [...root.querySelectorAll('button')].find((b) =>
      b.textContent?.includes('Rehearse tour'),
    )!;
    tour.click();
    fixture.detectChanges();
    await fixture.whenStable();
    expect(root.querySelector('textarea')).toBeNull();
    expect(root.textContent).toContain('Next panel');
    expect(root.querySelector('.exhibit-card img')?.getAttribute('src')).toContain(
      'andean-terraces',
    );
  });
  it('keeps the final example read-only and separate from edited testing drafts', () => {
    TestBed.overrideProvider(TIME_REPAIR_FINAL_EXAMPLE, { useValue: true });
    const { fixture, r, root } = setup();
    expect(r.lesson()).toBe(8);
    expect(root.querySelector('textarea')).toBeNull();
    r.editPanel({ caption: 'Unauthorized edit' });
    expect(r.activePanel().caption).not.toBe('Unauthorized edit');
    expect(root.textContent).toContain('Read-only example');
    fixture.destroy();
  });
  it('retains assessed access boundaries for non-preview sessions', () => {
    TestBed.overrideProvider(TIME_REPAIR_SESSION, { useValue: { ...session, mode: 'student' } });
    expect(() => setup()).toThrow('local preview');
  });
  it('validates all configured references, session modes, and stored drafts', () => {
    const invalid = structuredClone(raw);
    invalid.previewWeeks.weeks[0].sessions[0].missionId = 'missing';
    expect(() => requireTimeRepairConfig(invalid)).toThrow('mission reference');
    const modes = structuredClone(raw);
    modes.previewWeeks.weeks[0].sessions[0].mode = 'uninstalled';
    expect(() => requireTimeRepairConfig(modes)).toThrow('CAPABILITY_NOT_INSTALLED');
    const first = config.previewWeeks!.weeks[0].sessions[0];
    const draft = createRepairPreviewDraft(config, first);
    expect(validRepairPreviewDraft(draft, config, first.id)).toBe(true);
    expect(validRepairPreviewDraft({ ...draft, panels: [{ id: 'fake' }] }, config, first.id)).toBe(
      false,
    );
    const adapter = new BrowserRepairPreviewPersistence(config, session, localStorage);
    adapter.save(first.id, draft);
    expect(adapter.load(first.id)).toEqual(draft);
    expect(
      new BrowserRepairPreviewPersistence(
        config,
        { ...session, actorId: 'another' },
        localStorage,
      ).load(first.id),
    ).toBeUndefined();
  });
  it('checks chronology and moves cards without losing identity', () => {
    const ids = ['potato-record', 'andean-farming', 'atlantic-contact'];
    expect(chronologyConflicts(config, ids)[0]).toContain('1565');
    expect(moveRepairItem(ids, 0, -1)).toBe(ids);
    expect(moveRepairItem(ids, 0, 1)).toEqual([
      'andean-farming',
      'potato-record',
      'atlantic-contact',
    ]);
    expect(
      chronologyConflicts(config, ['andean-farming', 'atlantic-contact', 'potato-record']),
    ).toEqual([]);
  });
});
