import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  signal,
  untracked,
} from '@angular/core';
import { PROJECT_LESSON_FOCUS } from '../../../../shared/project-lessons/project-lesson-focus';
import { BalanceLockComponent } from '../balance-lock/balance-lock.component';
import { GearLockComponent } from '../gear-lock/gear-lock.component';
import { MachineWorkshopComponent } from '../locks/machine-workshop.component';
import { validMachineAnswer } from '../locks/machine.rules';
import { isBridgeDiorama, isCageDiorama } from '../locks/machine-presentation';
import { usesPiston } from '../balance-lock/balance-lock.domain';
import { ExpeditionPreviewRuntime } from './expedition-preview.runtime';

@Component({
  selector: 'app-expedition-week-workspace',
  imports: [BalanceLockComponent, GearLockComponent, MachineWorkshopComponent],
  templateUrl: './expedition-week-workspace.component.html',
  styleUrl: './expedition-week-workspace.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpeditionWeekWorkspaceComponent {
  readonly runtime = inject(ExpeditionPreviewRuntime);
  private readonly lesson = inject(PROJECT_LESSON_FOCUS, { optional: true });
  readonly selectedLesson = signal(1);
  readonly weeks = this.runtime.mission.previewWeeks!;
  readonly week = computed(() => this.weeks[Math.floor((this.selectedLesson() - 1) / 2)]);
  readonly sessionIndex = computed(() => (this.selectedLesson() - 1) % 2);
  readonly session = computed(() => this.week().sessions[this.sessionIndex()]);
  readonly extra = computed(() => this.runtime.selected() !== this.session().stepId);
  readonly sample = computed(
    () =>
      this.weeks.flatMap((w) => w.sessions).find((s) => s.stepId === this.runtime.selected())
        ?.sample,
  );
  readonly paused = signal(false);
  readonly sceneTools = signal(false);
  readonly timingScene = computed(() => {
    const p = this.runtime.step().puzzle;
    return (p.type === 'machine-lock' && (isBridgeDiorama(p.lock) || p.lock.stages.some(isCageDiorama))) ||
      (p.type === 'gear-lock' && p.lock.presentation?.kind === 'gear-cage') ||
      (p.type === 'balance-lock' && usesPiston(p.lock));
  });
  readonly reducedMotion = signal(
    globalThis.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false,
  );
  readonly revision = signal(0);
  readonly restoredStage = signal(0);
  readonly mountKey = computed(() => `${this.runtime.key()}:${this.revision()}`);
  readonly placements = computed<readonly number[]>(() => {
    const value = this.runtime.draft().answer;
    return Array.isArray(value) ? value : [];
  });
  readonly machineAnswer = computed(() => {
    const p = this.runtime.step().puzzle,
      answer = this.runtime.draft().answer;
    return p.type === 'machine-lock' && validMachineAnswer(p.lock, answer) ? answer : null;
  });
  constructor() {
    effect(() => {
      const number = this.lesson?.()?.number ?? 1;
      untracked(() => this.openLesson(number));
    });
  }
  openLesson(number: number): void {
    if (!Number.isInteger(number) || number < 1 || number > 8) return;
    this.selectedLesson.set(number);
    this.choose(this.session().stepId);
  }
  choose(id: string): void {
    this.sceneTools.set(false);
    this.paused.set(false);
    this.restoredStage.set(0);
    this.runtime.choose(id);
  }
  reset(): void {
    this.runtime.reset();
    this.restoredStage.set(0);
    this.paused.set(false);
    this.revision.update((n) => n + 1);
  }
  restoreTrial(id: string): void {
    this.restoredStage.set(this.runtime.draft().trials.find((t) => t.id === id)?.stage ?? 0);
    this.runtime.restoreTrial(id);
    this.paused.set(false);
    this.revision.update((n) => n + 1);
  }
}
