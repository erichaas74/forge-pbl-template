import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  computed,
  inject,
  signal,
} from '@angular/core';
import { ESCAPE_MISSION } from '../runtime/escape-runtime';
import { expeditionTour, traceTourLeg } from '../domain/expedition-tour';
import type { WorldPoint } from '../domain/expedition.models';

@Component({
  selector: 'app-expedition-example',
  templateUrl: './expedition-example.component.html',
  styleUrl: './expedition-example.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpeditionExampleComponent {
  readonly mission = inject(ESCAPE_MISSION);
  readonly world = this.mission.world!;
  readonly legs = expeditionTour(this.mission);
  readonly index = signal(0);
  readonly elapsed = signal(0);
  readonly reducedMotion = signal(
    globalThis.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false,
  );
  readonly playing = signal(!this.reducedMotion());
  readonly finished = signal(false);
  readonly step = computed(() => this.mission.steps[this.index()]);
  readonly trace = computed(() => traceTourLeg(this.legs[this.index()], this.elapsed() / 3));
  readonly position = computed(() => this.trace().at(-1)!);
  readonly arrived = computed(() => this.elapsed() >= 3);
  readonly route = computed(() => this.points(this.trace()));
  constructor() {
    let frame = 0,
      previous = 0;
    const animate = (time: number) => {
      if (previous && !document.hidden) this.advance(Math.min((time - previous) / 1000, 0.1));
      previous = time;
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    inject(DestroyRef).onDestroy(() => cancelAnimationFrame(frame));
  }
  points(points: readonly WorldPoint[]): string {
    return points.map((point) => `${point.x},${point.y}`).join(' ');
  }
  advance(seconds: number): void {
    if (!this.playing() || !Number.isFinite(seconds) || seconds <= 0) return;
    this.elapsed.update((time) => time + seconds);
    if (this.elapsed() < 4.5) return;
    if (this.index() === this.legs.length - 1) {
      this.finished.set(true);
      this.playing.set(false);
    } else {
      this.index.update((index) => index + 1);
      this.elapsed.set(0);
    }
  }
  select(index: number): void {
    if (!Number.isInteger(index) || index < 0 || index >= this.legs.length) return;
    this.playing.set(false);
    this.finished.set(false);
    this.index.set(index);
    this.elapsed.set(3);
  }
  replay(): void {
    this.index.set(0);
    this.elapsed.set(this.reducedMotion() ? 3 : 0);
    this.finished.set(false);
    this.playing.set(!this.reducedMotion());
  }
}
