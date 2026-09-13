import { computed, Injectable, OnDestroy, signal } from '@angular/core';
import type { RobotTrial } from '../domain/automation.models';
import { sampleRobotReplay } from '../core/robot-replay';
@Injectable()
export class RobotReplayService implements OnDestroy {
  readonly trial = signal<RobotTrial | undefined>(undefined);
  readonly timeMs = signal(0);
  readonly playing = signal(false);
  readonly speed = signal(1);
  private frame?: number;
  private last = 0;
  readonly current = computed(() => sampleRobotReplay(this.trial()?.pathSamples ?? [], this.timeMs()));
  readonly duration = computed(() => this.trial()?.pathSamples.at(-1)?.timeMs ?? 0);
  load(trial: RobotTrial, autoplay = false): void {
    this.pause();
    this.trial.set(trial);
    this.timeMs.set(0);
    if (autoplay) this.play();
  }
  play(): void {
    if (!this.trial() || this.playing()) return;
    if (this.timeMs() >= this.duration()) this.timeMs.set(0);
    this.playing.set(true);
    this.last = performance.now();
    this.frame = requestAnimationFrame((time) => this.tick(time));
  }
  pause(): void {
    this.playing.set(false);
    if (this.frame !== undefined) cancelAnimationFrame(this.frame);
  }
  reset(): void {
    this.pause();
    this.timeMs.set(0);
  }
  seek(value: number): void {
    this.pause();
    this.timeMs.set(Math.max(0, Math.min(value, this.duration())));
  }
  step(): void {
    this.pause();
    const next = this.commandBoundaries().find((time) => time > this.timeMs());
    this.timeMs.set(next ?? this.duration());
  }
  stepBack(): void {
    this.pause();
    const previous = [...this.commandBoundaries()].reverse().find((time) => time < this.timeMs());
    this.timeMs.set(previous ?? 0);
  }
  // Completion events preserve boundaries even when a loop repeats the same command ID.
  private readonly commandBoundaries = computed(() => {
    const trial = this.trial();
    const completions = trial?.events.filter((event) => event.message.includes(' complete · (')) ?? [];
    const samples = trial?.pathSamples ?? [];
    const times = completions.length ? completions.map((event) => event.timeMs)
      : samples.filter((sample, index) => index === 0 || sample.activeCommandId !== samples[index - 1].activeCommandId)
        .map((sample) => sample.timeMs);
    return [0, ...times];
  });
  ngOnDestroy(): void {
    this.pause();
  }
  private tick(time: number): void {
    if (!this.playing()) return;
    const next = Math.min(this.duration(), this.timeMs() + (time - this.last) * this.speed());
    this.last = time;
    this.timeMs.set(next);
    if (next >= this.duration()) this.pause();
    else this.frame = requestAnimationFrame((now) => this.tick(now));
  }
}
