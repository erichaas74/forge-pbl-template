import {
  Component,
  computed,
  effect,
  inject,
  input,
  OnDestroy,
  output,
  signal,
} from '@angular/core';
import type { CrisisWeather } from '../domain/crisis.models';
import { CrisisRuntimeService } from '../runtime/crisis-runtime.service';
import { CrisisIconComponent } from './crisis-icon.component';

let weatherSurfaceId = 0;
@Component({
  selector: 'app-crisis-weather-screen',
  imports: [CrisisIconComponent],
  templateUrl: './crisis-weather-screen.component.html',
  styleUrl: './crisis-weather-screen.component.scss',
  host: { '[class.miniature]': 'miniature()' },
})
export class CrisisWeatherScreenComponent implements OnDestroy {
  readonly runtime = inject(CrisisRuntimeService);
  readonly weather = input.required<CrisisWeather>();
  readonly miniature = input(false);
  readonly active = input(true);
  readonly leave = output<void>();
  readonly reports = output<void>();
  readonly locate = output<string>();
  readonly uid = `weather-${++weatherSurfaceId}`;
  readonly mode = signal<'radar' | 'satellite'>('radar');
  readonly playing = signal(!window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  readonly frameIndex = signal(0);
  readonly zoom = signal(false);
  readonly selectedLocation = signal(this.runtime.config.locations[0].id);
  readonly location = computed(() =>
    this.runtime.config.locations.find((location) => location.id === this.selectedLocation())!,
  );
  readonly frames = computed(() =>
    this.weather().frames.filter(
      (frame) =>
        frame.stage === this.runtime.state().stage &&
        frame.minute <= this.runtime.bulletin().minute,
    ),
  );
  readonly frame = computed(
    () => this.frames()[Math.min(this.frameIndex(), this.frames().length - 1)],
  );
  readonly stormTransform = computed(
    () =>
      `translate(${this.frame().x - 500}px, ${this.frame().y - 270}px) scale(${0.78 + this.frame().intensity * 0.35})`,
  );
  readonly mapTransform = computed(() =>
    this.zoom()
      ? `translate(${500 - this.location().x * 1.45} ${300 - this.location().y * 1.45}) scale(1.45)`
      : 'translate(0 0)',
  );
  private readonly motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  private readonly motionChanged = (event: MediaQueryListEvent) => {
    if (event.matches) this.playing.set(false);
  };
  private readonly timer: ReturnType<typeof setInterval>;
  constructor() {
    effect(() => {
      this.runtime.state().stage;
      this.frameIndex.set(0);
    });
    this.motionQuery.addEventListener?.('change', this.motionChanged);
    this.timer = setInterval(() => {
      if (this.active() && this.playing() && !document.hidden)
        this.frameIndex.update((index) => (index + 1) % this.frames().length);
    }, 1400);
  }
  scrub(value: string): void {
    this.playing.set(false);
    this.frameIndex.set(Math.max(0, Math.min(this.frames().length - 1, Number(value) || 0)));
  }
  ngOnDestroy(): void {
    clearInterval(this.timer);
    this.motionQuery.removeEventListener?.('change', this.motionChanged);
  }
}
