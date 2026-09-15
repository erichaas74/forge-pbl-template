import {
  afterNextRender,
  Component,
  computed,
  ElementRef,
  inject,
  Injector,
  output,
  signal,
} from '@angular/core';
import { AutomationRuntimeService } from '../runtime/automation-runtime.service';
import { RobotCourseComponent } from './robot-course.component';
import type { RobotTrial } from '../domain/automation.models';
@Component({
  selector: 'app-championship-panel',
  imports: [RobotCourseComponent],
  templateUrl: './championship-panel.component.html',
  styleUrl: './automation-panels.css',
})
export class ChampionshipPanelComponent {
  readonly runtime = inject(AutomationRuntimeService);
  readonly replay = output<RobotTrial>();
  readonly selected = output<void>();
  readonly reason = signal('');
  readonly step = signal(0);
  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly injector = inject(Injector);
  readonly finalChallenge = computed(() =>
    this.runtime.config.challenges.find(
      (c) => c.id === this.runtime.config.championshipChallengeId,
    )!,
  );
  readonly finalTrial = computed(() =>
    this.runtime
      .currentTrials()
      .find(
        (t) =>
          t.mode === 'championship' &&
          t.version.id === this.runtime.draft().lockedVersionId &&
          !t.technicalInvalidReason,
      ),
  );
  readonly shownCourse = computed(
    () =>
      this.finalTrial()?.version.course ??
      (this.runtime.state().championship.revealed
        ? this.runtime.config.courses.find((c) => c.id === this.finalChallenge().courseId)!
        : this.runtime.course()),
  );
  readonly activeStep = computed(() =>
    this.runtime.draft().lockedVersionId || this.runtime.sample ? 5 : this.step(),
  );
  readonly canContinue = computed(() => {
    if (this.activeStep() === 0) return this.runtime.draft().prediction.route.trim().length >= 15;
    const field = this.predictionFields[this.activeStep() - 1];
    if (!field) return false;
    const value = this.runtime.draft().prediction[field.key];
    return !!value.trim() && Number.isFinite(Number(value)) && Number(value) >= 0;
  });
  constructor() {
    if (this.runtime.isChampionship()) this.step.set(this.nextUnanswered());
  }
  private nextUnanswered(): number {
    const prediction = this.runtime.draft().prediction;
    if (prediction.route.trim().length < 15) return 0;
    const missing = this.predictionFields.findIndex((field) => {
      const value = prediction[field.key];
      return !value.trim() || !Number.isFinite(Number(value)) || Number(value) < 0;
    });
    return missing < 0 ? 5 : missing + 1;
  }
  begin(): void {
    this.runtime.selectChallenge(this.runtime.config.championshipChallengeId);
    if (this.runtime.isChampionship()) this.go(this.nextUnanswered());
  }
  practice(): void {
    if (this.runtime.state().championship.revealed)
      this.runtime.selectChallenge(this.runtime.config.championshipChallengeId);
    this.selected.emit();
  }
  go(step: number): void {
    this.step.set(Math.max(0, Math.min(5, step)));
    afterNextRender(
      () => {
        const heading = this.element.nativeElement.querySelector<HTMLElement>('.question-card h2');
        heading?.scrollIntoView({ block: 'nearest' });
        heading?.focus({ preventScroll: true });
      },
      { injector: this.injector },
    );
  }
  confirmLock(dialog: HTMLDialogElement): void {
    this.runtime.lockProgram();
    dialog.close();
    this.go(5);
  }
  readonly predictionFields = [
    { key: 'distance', label: 'Distance (cm)', question: 'How far will your robot travel?' },
    { key: 'turns', label: 'Total turn (°)', question: 'How much will your robot turn?' },
    { key: 'seconds', label: 'Time (s)', question: 'How long will the run take?' },
    { key: 'battery', label: 'Battery used', question: 'How much battery will you use?' },
  ] as const;
  limit(value: string): void {
    const limit = Number(value);
    if (Number.isInteger(limit) && limit >= 0 && limit <= 100)
      this.runtime.control({ practiceLimit: limit });
  }
  launch(): void {
    const trial = this.runtime.launchNext();
    if (trial) this.replay.emit(trial);
  }
  owner(id: string): string {
    const version = this.runtime.state().versions.find((v) => v.id === id);
    return version
      ? `${version.ownerName} · program v${version.program.version}`
      : 'Version unavailable';
  }
  status(id: string): string {
    return this.runtime
      .state()
      .trials.some(
        (t) => t.version.id === id && t.mode === 'championship' && !t.technicalInvalidReason,
      )
      ? 'Run recorded'
      : 'Waiting to launch';
  }
}
