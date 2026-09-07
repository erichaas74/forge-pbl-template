import { computed, Injectable, OnDestroy, signal } from '@angular/core';
import type { RobotTrial } from '../domain/automation.models';
@Injectable()
export class RobotReplayService implements OnDestroy {
  readonly trial = signal<RobotTrial | undefined>(undefined);
  readonly timeMs = signal(0);
  readonly playing = signal(false);
  readonly speed = signal(1);
  private frame?: number;
  private last = 0;
  readonly current = computed(() => {
    const samples = this.trial()?.pathSamples;
    if (!samples?.length) return undefined;
    let low = 0,
      high = samples.length - 1;
    while (low < high) {
      const middle = Math.ceil((low + high) / 2);
      if (samples[middle].timeMs <= this.timeMs()) low = middle;
      else high = middle - 1;
    }
    return samples[low];
  });
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
    const current = this.current();
    const next = this.trial()?.pathSamples.find(
      (sample) =>
        sample.timeMs > this.timeMs() && sample.activeCommandId !== current?.activeCommandId,
    );
    this.timeMs.set(next?.timeMs ?? this.duration());
  }
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
