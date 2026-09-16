import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
vi.mock('phaser', () => ({}));
import { frontierTradingConfig as config } from '../../../../projects/frontier-trading/frontier-trading.config';
import { projectLessonRegistry } from '../../../../runtime/project-launch/project-lesson.registry';
import { PROJECT_LESSON_FOCUS } from '../../../../shared/project-lessons/project-lesson-focus';
import { SimulationDecisionRuntimeService } from '../../runtime/simulation-decision-runtime.service';
import { MemorySimulationDecisionPersistenceAdapter } from '../../runtime/simulation-decision.persistence';
import {
  SIMULATION_DECISION_CONFIG,
  SIMULATION_DECISION_PERSISTENCE,
} from '../../runtime/simulation-decision.tokens';
import { ExpeditionWorkspaceComponent } from './expedition-workspace.component';
import { SimulationDecisionShellComponent } from '../simulation-decision-shell.component';
import { By } from '@angular/platform-browser';

describe('weekly expedition workspace', () => {
  const plan = projectLessonRegistry.find(config.projectId, config.projectVersion)!;
  const focus = signal(plan.lessons[0]);
  beforeEach(() => {
    focus.set(plan.lessons[0]);
    TestBed.configureTestingModule({
      providers: [
        SimulationDecisionRuntimeService,
        { provide: SIMULATION_DECISION_CONFIG, useValue: config },
        {
          provide: SIMULATION_DECISION_PERSISTENCE,
          useFactory: () => new MemorySimulationDecisionPersistenceAdapter(),
        },
        { provide: PROJECT_LESSON_FOCUS, useValue: focus },
      ],
    });
  });
  it('opens directly into the map and keeps writing beside the activity in every week', () => {
    const fixture = TestBed.createComponent(SimulationDecisionShellComponent);
    fixture.detectChanges();
    const workspace = fixture.debugElement.query(By.directive(ExpeditionWorkspaceComponent))
      .componentInstance as ExpeditionWorkspaceComponent;
    const root = fixture.nativeElement as HTMLElement;
    expect(root.querySelector('app-simulation-company-setup')).toBeNull();
    for (const lesson of plan.lessons) {
      focus.set(lesson);
      fixture.detectChanges();
      expect(workspace.surface()).toBe(lesson.number % 2 ? 'map' : 'ledger');
      expect(root.querySelector('.activity textarea')).toBeNull();
      expect(root.querySelector('.tutor textarea')).not.toBeNull();
      expect(
        root.querySelector('.tasks')!.compareDocumentPosition(root.querySelector('.tutor')!) &
          Node.DOCUMENT_POSITION_FOLLOWING,
      ).toBeTruthy();
      expect(root.querySelector('.tasks')?.textContent).toContain(lesson.title);
    }
  });
  it('shares actual work across a pair, isolates later journeys and never saves practice receipts as real work', () => {
    const fixture = TestBed.createComponent(ExpeditionWorkspaceComponent);
    fixture.detectChanges();
    const w = fixture.componentInstance;
    w.act({ type: 'trade', goodId: 'flour', direction: 'buy', quantity: 2 });
    focus.set(plan.lessons[1]);
    fixture.detectChanges();
    expect(w.state().receipts).toHaveLength(1);
    w.loadPractice();
    fixture.detectChanges();
    expect(w.state().returned).toBe(true);
    const r = w.state().receipts[0]!;
    w.act({ type: 'file', receiptId: r.id, bin: 'expense' });
    expect(w.ownState().bins).toEqual({});
    focus.set(plan.lessons[2]);
    fixture.detectChanges();
    expect(w.state().receipts).toHaveLength(0);
    expect(w.state().cashCents).toBe(30000);
    focus.set(plan.lessons[1]);
    fixture.detectChanges();
    expect(w.state().receipts).toHaveLength(1);
  });
});
