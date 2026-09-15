import {
  afterNextRender,
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  Injector,
  input,
  output,
  signal,
} from '@angular/core';
import { AutomationRuntimeService } from '../runtime/automation-runtime.service';
import type { RobotTrial } from '../domain/automation.models';
import { allCommands } from '../core/automation-compiler';
import { commandLabels } from './command-editor.component';
import { commandExpression } from '../core/move-math';
import { RobotCourseComponent } from './robot-course.component';
@Component({
  selector: 'app-automation-evidence',
  imports: [RobotCourseComponent],
  templateUrl: './automation-evidence.component.html',
  styleUrl: './automation-panels.css',
})
export class AutomationEvidenceComponent {
  readonly runtime = inject(AutomationRuntimeService);
  readonly replay = output<RobotTrial>();
  readonly view = input<'trials' | 'portfolio'>('trials');
  readonly step = signal<'explain' | 'review'>('explain');
  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly injector = inject(Injector);
  readonly shownTrial = computed(
    () => this.compared()[1] ?? this.compared()[0] ?? this.runtime.currentTrials().at(-1),
  );
  readonly shownCourse = computed(() => this.shownTrial()?.version.course ?? this.runtime.course());
  constructor() {
    effect(() => {
      this.runtime.challenge().id;
      this.view();
      this.step.set('explain');
      this.selected.set([]);
    });
  }
  go(step: 'explain' | 'review'): void {
    this.step.set(step);
    afterNextRender(
      () => {
        const heading = this.element.nativeElement.querySelector<HTMLElement>('.question-card h2');
        heading?.scrollIntoView({ block: 'nearest' });
        heading?.focus({ preventScroll: true });
      },
      { injector: this.injector },
    );
  }
  readonly selected = signal<string[]>([]);
  readonly labels = commandLabels;
  readonly expression = commandExpression;
  readonly flatProgram = computed(() => allCommands(this.runtime.draft().program.commands));
  readonly comparison = computed(() => {
    const all = this.runtime.currentTrials();
    const practice = all.filter((trial) => trial.mode === 'practice');
    const trials = practice.length >= 2 ? practice : all;
    return [
      this.selected()[0] ?? trials.at(-2)?.id ?? '',
      this.selected()[1] ?? trials.at(-1)?.id ?? '',
    ];
  });
  readonly compared = computed(() =>
    this.comparison().map((id) => this.runtime.currentTrials().find((trial) => trial.id === id)),
  );
  readonly metrics = [
    { key: 'elapsedSeconds', label: 'Time (s)' },
    { key: 'distanceCm', label: 'Distance (cm)' },
    { key: 'stoppingErrorCm', label: 'Parking error (cm)' },
    { key: 'collisions', label: 'Collisions' },
    { key: 'deliveriesCompleted', label: 'Deliveries' },
    { key: 'batteryUsed', label: 'Battery used' },
    { key: 'score', label: 'Performance / 100' },
  ] as const;
  selectComparison(side: number, id: string): void {
    const ids = [...this.comparison()];
    ids[side] = id;
    this.selected.set(ids);
  }
  metricValue(trial: RobotTrial | undefined, key: (typeof this.metrics)[number]['key']): string {
    return trial ? trial[key].toFixed(1) : '—';
  }
  download(): void {
    const payload = {
      title: this.runtime.config.title,
      student: this.runtime.session.actorDisplayName,
      exportedAt: new Date().toISOString(),
      mastery: this.runtime.mastery(),
      ...this.runtime.state(),
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${this.runtime.config.projectId}-portfolio.json`;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
}
