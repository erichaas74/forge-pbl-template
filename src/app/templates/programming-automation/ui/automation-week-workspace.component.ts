import { Component, computed, effect, inject, signal, untracked } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { PROJECT_LESSON_FOCUS } from '../../../shared/project-lessons/project-lesson-focus';
import { AutomationRuntimeService } from '../runtime/automation-runtime.service';
import { RobotReplayService } from '../runtime/robot-replay.service';
import { RobotCourseComponent } from './robot-course.component';
import { CommandEditorComponent } from './command-editor.component';
import type { RobotTrial } from '../domain/automation.models';

@Component({
  selector: 'app-automation-week-workspace',
  imports: [DecimalPipe, RobotCourseComponent, CommandEditorComponent],
  providers: [RobotReplayService],
  templateUrl: './automation-week-workspace.component.html',
  styleUrl: './automation-week-workspace.component.css',
})
export class AutomationWeekWorkspaceComponent {
  readonly runtime = inject(AutomationRuntimeService);
  readonly replay = inject(RobotReplayService);
  private readonly lesson = inject(PROJECT_LESSON_FOCUS, { optional: true });
  readonly selectedLesson = signal(1);
  readonly weeks = this.runtime.config.previewWeeks!;
  readonly week = computed(() => this.weeks[Math.floor((this.selectedLesson() - 1) / 2)]);
  readonly sessionIndex = computed(() => (this.selectedLesson() - 1) % 2);
  readonly trace = signal(true);
  readonly finished = computed(
    () => !!this.replay.trial() && this.replay.timeMs() >= this.replay.duration(),
  );
  readonly course = computed(() => this.replay.trial()?.version.course ?? this.runtime.course());
  readonly target = computed(
    () => this.replay.trial()?.version.targetIndex ?? this.runtime.draft().targetIndex,
  );
  readonly extraChallenge = computed(
    () =>
      !this.week().sessions.some((session) => session.challengeId === this.runtime.challenge().id),
  );

  constructor() {
    effect(() => {
      const number = this.lesson?.()?.number ?? 1;
      untracked(() => this.openLesson(number));
    });
  }
  openLesson(number: number): void {
    if (!Number.isInteger(number) || number < 1 || number > 8) return;
    this.selectedLesson.set(number);
    this.choose(this.week().sessions[this.sessionIndex()].challengeId);
  }
  choose(id: string): void {
    this.edit();
    this.runtime.selectChallenge(id);
    const starter = this.weeks
      .flatMap((week) => week.sessions)
      .find((session) => session.challengeId === id);
    // Only seed untouched drafts. Returning to a session restores the tester's own code.
    if (
      starter?.starterCommands &&
      !this.runtime.draft().program.commands.length &&
      this.runtime.draft().program.version === 0 &&
      !this.runtime.currentTrials().length
    ) {
      this.runtime.setCommands(structuredClone(starter.starterCommands));
      if (starter.starterVariables)
        this.runtime.updateVariables(structuredClone(starter.starterVariables));
    }
  }
  run(): void {
    const trial = this.runtime.runPractice();
    if (trial) this.watch(trial);
  }
  watch(trial: RobotTrial): void {
    const reduced =
      typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.replay.load(trial, !reduced);
  }
  edit(): void {
    this.replay.pause();
    this.replay.trial.set(undefined);
    this.replay.timeMs.set(0);
  }
  setTarget(value: string): void {
    this.edit();
    this.runtime.setTarget(Number(value));
  }
}
