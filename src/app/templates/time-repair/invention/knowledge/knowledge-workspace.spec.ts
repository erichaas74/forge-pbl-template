import { TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import raw from '../../../../../../public/projects/exploration-time-repair/versions/2.1.0/project.json';
import reformation from '../../../../../../public/projects/exploration-time-repair/versions/2.2.0/project.json';
import { createLocalPreviewSession } from '../../../../core/context/project-session-context';
import { requireInventionProject } from '../invention.validation';
import {
  INVENTION_CONTEXT,
  INVENTION_EXAMPLE,
  INVENTION_PROJECT,
  InventionRuntime,
} from '../invention.runtime';
import { InventionWorkspaceComponent } from '../invention-workspace.component';
import { KnowledgeRuntime } from './knowledge.runtime';
import { KNOWLEDGE_TOWN_LOADER } from './distribution.component';

describe.each([requireInventionProject(raw), requireInventionProject(reformation)])(
  'knowledge workspaces in the activity-only shell ($projectVersion)',
  (project) => {
    beforeEach(async () => {
      localStorage.clear();
      await TestBed.configureTestingModule({
        imports: [InventionWorkspaceComponent],
        providers: [
          {
            provide: KNOWLEDGE_TOWN_LOADER,
            useValue: async () => ({
              mountKnowledgeTown: async () => ({ refresh: vi.fn(), destroy: vi.fn() }),
            }),
          },
          { provide: INVENTION_PROJECT, useValue: project },
          {
            provide: INVENTION_CONTEXT,
            useValue: createLocalPreviewSession(project.projectId, project.projectVersion),
          },
          { provide: INVENTION_EXAMPLE, useValue: false },
        ],
      }).compileComponents();
    });
    afterEach(() => localStorage.clear());
    function setup() {
      const f = TestBed.createComponent(InventionWorkspaceComponent);
      f.detectChanges();
      return {
        f,
        root: f.nativeElement as HTMLElement,
        r: f.debugElement.injector.get(InventionRuntime),
        k: f.debugElement.injector.get(KnowledgeRuntime),
      };
    }
    it('opens every lesson out of order without completion gates or added bands', async () => {
      const { f, root, r, k } = setup();
      for (const number of [7, 6, 5, 4, 2, 1, 8, 3]) {
        r.open(number);
        f.detectChanges();
        await f.whenStable();
        f.detectChanges();
        const session = project.inventionRescue.sessions[number - 1];
        expect(r.number()).toBe(number);
        expect(k.active()).toBe(!!session.knowledge);
        const main = root.querySelector('.activity-panel')!;
        expect(main.children).toHaveLength(1);
        expect(
          main.querySelector('header,footer,nav,textarea,input,select,form,h1,h2,h3'),
        ).toBeNull();
        expect(root.querySelector('.task-box + .tutor-box')).not.toBeNull();
        expect(root.querySelector('.task-box')?.textContent).toContain(session.task);
        expect(root.querySelector('.tutor-box')?.textContent).toContain('Not connected');
        if (session.knowledge)
          expect(main.querySelector('app-knowledge-' + session.knowledge.kind)).not.toBeNull();
      }
    });
    it('uses keyboard-operated objects and keeps their unfinished work across sessions and reload', () => {
      let current = setup();
      current.r.open(7);
      current.f.detectChanges();
      const select = current.root.querySelector('[aria-label="Arrange a shared book loan"]')!;
      select.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
      current.f.detectChanges();
      expect(current.k.state().selected).toBe('loan');
      const offer = current.root.querySelector(
        '[aria-label="Offer the selected resource to Learner with no purchase money"]',
      )!;
      offer.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }));
      current.f.detectChanges();
      expect(current.k.state().values['using-learner']).toBe(1);
      current.r.open(1);
      current.f.detectChanges();
      expect(current.k.state().placements['learner']).toBeUndefined();
      current.r.open(7);
      current.f.detectChanges();
      expect(current.k.state().values['using-learner']).toBe(1);
      current.f.destroy();
      current = setup();
      current.r.open(7);
      current.f.detectChanges();
      expect(current.k.state().values['using-learner']).toBe(1);
    });
    it('keeps printed evidence unchanged while a new assembly setting is tried', () => {
      const { f, root, r, k } = setup();
      r.open(2);
      f.detectChanges();
      for (const [part, count] of Object.entries({ frame: 1, mold: 4, ink: 2, screw: 2 })) {
        k.act({ type: 'select', item: part });
        k.act({ type: 'fit', target: part });
        for (let i = 0; i < count; i++) k.act({ type: 'operate', target: part });
      }
      k.act({ type: 'test' });
      f.detectChanges();
      const before = root.querySelector('app-knowledge-assembly')?.innerHTML;
      const evidence = k.state().trials[0].evidence;
      k.act({ type: 'operate', target: 'screw' });
      f.detectChanges();
      expect(k.state().trials[0].evidence).toBe(evidence);
      expect(root.querySelector('app-knowledge-assembly')?.innerHTML).not.toBe(before);
    });
  },
);
