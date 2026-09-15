import { TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { vi } from 'vitest';
import raw from '../../../../../public/projects/exploration-time-repair/versions/2.0.0/project.json';
import { createLocalPreviewSession } from '../../../core/context/project-session-context';
import { PROJECT_LESSON_FOCUS } from '../../../shared/project-lessons/project-lesson-focus';
import type { ProjectLesson } from '../../../shared/project-lessons/project-lesson.models';
import { requireInventionProject } from './invention.validation';
import {
  INVENTION_CONTEXT,
  INVENTION_EXAMPLE,
  INVENTION_PROJECT,
  InventionRuntime,
} from './invention.runtime';
import { InventionWorkspaceComponent } from './invention-workspace.component';

const project = requireInventionProject(raw);
const context = createLocalPreviewSession(project.projectId, project.projectVersion);
const lesson = signal<ProjectLesson | undefined>(undefined);
describe('invention activity audit', () => {
  beforeEach(async () => {
    localStorage.clear();
    lesson.set(undefined);
    Object.defineProperty(HTMLDialogElement.prototype, 'showModal', {
      configurable: true,
      value: vi.fn(function (this: HTMLDialogElement) {
        this.open = true;
      }),
    });
    await TestBed.configureTestingModule({
      imports: [InventionWorkspaceComponent],
      providers: [
        { provide: INVENTION_PROJECT, useValue: project },
        { provide: INVENTION_CONTEXT, useValue: context },
        { provide: PROJECT_LESSON_FOCUS, useValue: lesson },
        { provide: INVENTION_EXAMPLE, useValue: false },
      ],
    }).compileComponents();
  });
  afterEach(() => {
    vi.restoreAllMocks();
    localStorage.clear();
  });
  function setup() {
    const fixture = TestBed.createComponent(InventionWorkspaceComponent);
    fixture.detectChanges();
    return {
      fixture,
      root: fixture.nativeElement as HTMLElement,
      r: fixture.debugElement.injector.get(InventionRuntime),
    };
  }
  it('opens all eight sessions with the activity alone in the main panel and task directly above tutor', async () => {
    const { fixture, root, r } = setup();
    for (const session of project.inventionRescue.sessions) {
      lesson.set({
        number: session.number,
        title: session.title,
        output: session.product,
        workspace: session.task,
        checkpoint: session.question,
        criteria: [session.goal],
      });
      fixture.detectChanges();
      await fixture.whenStable();
      fixture.detectChanges();
      expect(r.number()).toBe(session.number);
      const main = root.querySelector('.activity-panel')!;
      expect(
        main.querySelector('header,footer,nav,textarea,input,select,form,h1,h2,h3'),
      ).toBeNull();
      expect(main.children).toHaveLength(1);
      expect(root.querySelector('.task-box + .tutor-box')).not.toBeNull();
      expect(root.querySelector('.task-box')?.textContent).toContain(session.task);
      expect(root.querySelector('.tutor-box')?.textContent).toContain('Not connected');
      expect(root.querySelector('.tutor-box')?.textContent).toContain(session.question);
      expect(
        root.querySelector(session.number === 1 ? 'app-courtyard-scene' : 'app-press-workbench'),
      ).not.toBeNull();
    }
  });
  it('operates the real type buttons, pull handle, and proof magnifier without a text form', () => {
    const { fixture, root, r } = setup();
    r.open(3);
    fixture.detectChanges();
    const blocks = [...root.querySelectorAll<HTMLButtonElement>('.type-block')];
    const initial = [...r.settings().type];
    blocks[0].click();
    blocks[1].click();
    fixture.detectChanges();
    expect(r.settings().type[0]).toBe(initial[1]);
    root.querySelector<HTMLButtonElement>('.press-handle')!.click();
    fixture.detectChanges();
    expect(r.state().trials).toHaveLength(1);
    expect(root.querySelector('.fresh-proof')?.textContent).toContain(r.proof()!.text[0]);
    root.querySelector<HTMLButtonElement>('.fresh-proof')!.click();
    expect(root.querySelector('dialog')?.open).toBe(true);
  });
  it('preserves trial evidence and unfinished settings through navigation and reload', () => {
    let current = setup();
    current.r.open(5);
    current.r.configure({ ink: 'loose' });
    current.r.sample();
    current.r.pull();
    current.r.configure({ pressure: 2 });
    current.r.open(6);
    current.r.open(5);
    expect(current.r.settings().pressure).toBe(2);
    expect(current.r.proof()?.settings.pressure).toBe(1);
    current.fixture.destroy();
    current = setup();
    current.r.open(5);
    expect(current.r.state().samples).toHaveLength(1);
    expect(current.r.state().trials).toHaveLength(1);
    expect(current.r.settings().ink).toBe('loose');
  });
  it('allows testing both futures before repair while keeping printed supply tied to actual output', () => {
    const { fixture, root, r } = setup();
    r.open(8);
    fixture.detectChanges();
    expect(root.querySelector<HTMLButtonElement>('.time-jump')!.disabled).toBe(false);
    root.querySelector<HTMLButtonElement>('.time-jump')!.click();
    fixture.detectChanges();
    expect(r.scene()).toBe('courtyard');
    root.querySelector<HTMLButtonElement>('.binder')!.click();
    expect(r.state().flow.finished).toBe(0);
    expect(r.state().trials).toHaveLength(0);
    root.querySelector<HTMLButtonElement>('.time-jump')!.click();
    expect(r.scene()).toBe('press');
    r.configure({ ink: 'press' });
    r.pull();
    r.pull();
    r.pull();
    fixture.detectChanges();
    root.querySelector<HTMLButtonElement>('.time-jump')!.click();
    fixture.detectChanges();
    expect(r.scene()).toBe('courtyard');
    root.querySelector<HTMLButtonElement>('.binder')!.click();
    root.querySelector<HTMLButtonElement>('.courier')!.click();
    fixture.detectChanges();
    expect(r.state().flow.delivered).toBe(1);
    expect(root.querySelector('.courtyard.restored')).not.toBeNull();
  });
  it('keeps the explorable example separate from a learner’s notebook', () => {
    TestBed.overrideProvider(INVENTION_EXAMPLE, { useValue: true });
    const { r } = setup();
    expect(r.number()).toBe(8);
    expect(r.repaired()).toBe(true);
    expect(r.scene()).toBe('courtyard');
    const before = localStorage.length;
    r.flow('binder');
    r.flow('courier');
    r.save();
    expect(localStorage.length).toBe(before);
  });
});
