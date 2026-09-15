import { NgComponentOutlet } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, Injector, computed, effect, inject, signal, untracked, viewChildren, type Type } from '@angular/core';
import { PROJECT_LESSON_FOCUS } from '../../shared/project-lessons/project-lesson-focus';
import { WORKSPACE_DRAFTS, type WorkspaceDraftStore } from '../../shared/drafts/workspace-drafts';
import { LAB_PREVIEW_WEEKS, validateLabWeeks, type LabActivity, type LabSession } from '../../projects/mystery-substance/lab-week.models';
import { PropertiesLabComponent } from '../../projects/mystery-substance/properties-lab.component';
import { ReactionBenchComponent } from '../../projects/mystery-substance/reaction-bench.component';
import { ConservationChamberComponent } from '../../projects/mystery-substance/conservation-chamber.component';
import { EmergencyResponseComponent } from '../../projects/mystery-substance/emergency-response.component';
import { RestorationWorkspaceComponent } from '../../projects/mystery-substance/station-workspaces';

const renderers: Record<LabActivity['station'], Type<unknown>> = {
  properties: PropertiesLabComponent,
  reaction: ReactionBenchComponent,
  conservation: ConservationChamberComponent,
  emergency: EmergencyResponseComponent,
  restoration: RestorationWorkspaceComponent,
};

@Component({
  selector: 'app-lab-week-workspace',
  imports: [NgComponentOutlet],
  templateUrl: './lab-week-workspace.component.html',
  styleUrl: './lab-week-workspace.component.scss',
})
export class LabWeekWorkspaceComponent {
  readonly weeks = inject(LAB_PREVIEW_WEEKS);
  readonly errors = validateLabWeeks(this.weeks);
  private readonly lesson = inject(PROJECT_LESSON_FOCUS, { optional: true });
  private readonly router = inject(Router, { optional: true });
  private readonly route = inject(ActivatedRoute, { optional: true });
  private readonly parent = inject(Injector);
  private readonly drafts = inject(WORKSPACE_DRAFTS);
  readonly selectedLesson = signal(1);
  readonly week = computed(() => this.weeks[Math.floor((this.selectedLesson() - 1) / 2)]);
  readonly sessionIndex = computed(() => (this.selectedLesson() - 1) % 2);
  readonly session = computed(() => this.week().sessions[this.sessionIndex()]);
  // Keep each visited session mounted so unfinished measurements and animation checkpoints survive.
  readonly opened = signal<readonly { number: number; session: LabSession; component: Type<unknown>; injector: Injector; inputs: Record<string, unknown> }[]>([]);
  private readonly outlets = viewChildren(NgComponentOutlet);
  extraFocus(): string | undefined {
    const index = this.opened().findIndex(entry => entry.number === this.selectedLesson());
    const component = this.outlets()[index]?.componentInstance;
    const activity = this.session().activity;
    if (component instanceof PropertiesLabComponent && activity.station === 'properties' && component.testId() !== activity.test)
      return component.activeTest().title;
    if (component instanceof ConservationChamberComponent && activity.station === 'conservation' && component.trialId() !== activity.chamber)
      return component.trial().title;
    return undefined;
  }

  inputsFor(entry: (ReturnType<typeof this.opened>)[number]): Record<string, unknown> {
    return entry.session.activity.station === 'reaction' ? { active: entry.number === this.selectedLesson() } : entry.inputs;
  }

  constructor() {
    effect(() => {
      const number = this.lesson?.()?.number ?? 1;
      untracked(() => this.openLesson(number));
    });
  }

  chooseLesson(number: number): void {
    this.openLesson(number);
    if (this.router && this.lesson?.())
      void this.router.navigate([], { relativeTo: this.route, queryParams: { lesson: number }, queryParamsHandling: 'merge' });
  }

  openLesson(number: number): void {
    if (this.errors.length || !Number.isInteger(number) || number < 1 || number > 8) return;
    this.selectedLesson.set(number);
    if (this.opened().some(entry => entry.number === number)) return;
    const session = this.session();
    const prefix = `lab-week-preview.v1:session-${number}:`;
    const store: WorkspaceDraftStore = {
      read: <T>(key: string) => this.drafts.read<T>(prefix + key),
      write: <T>(key: string, value: T) => this.drafts.write(prefix + key, value),
    };
    const activity = session.activity;
    const inputs: Record<string, unknown> = activity.station === 'properties'
      ? { initialTestId: activity.test }
      : activity.station === 'conservation' ? { initialChamberId: activity.chamber } : {};
    this.opened.update(entries => [...entries, {
      number, session, component: renderers[activity.station], inputs,
      injector: Injector.create({ parent: this.parent, providers: [{ provide: WORKSPACE_DRAFTS, useValue: store }] }),
    }]);
  }
}
