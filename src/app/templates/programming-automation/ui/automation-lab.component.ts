import { Component, computed, inject, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { AutomationRuntimeService } from '../runtime/automation-runtime.service';
import { RobotReplayService } from '../runtime/robot-replay.service';
import { RobotCourseComponent } from './robot-course.component';
import { CommandEditorComponent } from './command-editor.component';
import { MathWorkbenchComponent } from './math-workbench.component';
import { AutomationEvidenceComponent } from './automation-evidence.component';
import { ChampionshipPanelComponent } from './championship-panel.component';
import type { RobotTrial } from '../domain/automation.models';
@Component({
  selector: 'app-automation-lab',
  imports: [
    DecimalPipe,
    RobotCourseComponent,
    CommandEditorComponent,
    MathWorkbenchComponent,
    AutomationEvidenceComponent,
    ChampionshipPanelComponent,
  ],
  providers: [RobotReplayService],
  templateUrl: './automation-lab.component.html',
  styleUrl: './automation-lab.component.css',
})
export class AutomationLabComponent {
  readonly runtime = inject(AutomationRuntimeService);
  readonly replay = inject(RobotReplayService);
  readonly panel = signal<'workspace' | 'evidence' | 'championship'>('workspace');
  readonly mobilePane = signal('course');
  readonly trace = signal(true);
  readonly replayMode = signal(false);
  readonly shownCourse = computed(() =>
    this.replayMode() && this.replay.trial()
      ? this.replay.trial()!.version.course
      : this.runtime.course(),
  );
  readonly shownTarget = computed(() =>
    this.replayMode() && this.replay.trial()
      ? this.replay.trial()!.version.targetIndex
      : this.runtime.draft().targetIndex,
  );
  readonly pose = computed(() => this.replay.current() ?? this.shownCourse().startPose);
  constructor() {
    if (this.runtime.sample) {
      const trial = this.runtime.currentTrials().at(-1);
      if (trial) {
        this.replay.load(trial);
        this.replayMode.set(true);
        this.replay.seek(this.replay.duration());
      }
    }
  }
  choose(id: string): void {
    this.edit();
    this.runtime.selectChallenge(id);
    if (this.runtime.sample) {
      const trial = this.runtime.currentTrials().at(-1);
      if (trial) {
        this.replay.load(trial);
        this.replayMode.set(true);
        this.replay.seek(this.replay.duration());
      }
    }
  }
  run(): void {
    const trial = this.runtime.runPractice();
    if (trial) this.showTrial(trial);
  }
  showTrial(trial: RobotTrial): void {
    if (this.runtime.challenge().id !== trial.challengeId)
      this.runtime.selectChallenge(trial.challengeId);
    this.replayMode.set(true);
    this.replay.load(
      trial,
      !(typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches),
    );
    this.panel.set('workspace');
    this.mobilePane.set('course');
  }
  edit(): void {
    this.replay.pause();
    this.replay.trial.set(undefined);
    this.replayMode.set(false);
  }
  changeTarget(index: string): void {
    this.edit();
    this.runtime.setTarget(Number(index));
  }
}
