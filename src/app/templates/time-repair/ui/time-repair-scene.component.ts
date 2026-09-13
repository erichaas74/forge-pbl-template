import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  Injector,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import type { TimeRepairMission } from '../domain/time-repair.models';
import { TimeRepairRuntime } from '../runtime/time-repair.runtime';

@Component({
  selector: 'app-time-repair-scene',
  imports: [FormsModule],
  templateUrl: './time-repair-scene.component.html',
  styleUrl: './time-repair-scene.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimeRepairSceneComponent {
  readonly runtime = inject(TimeRepairRuntime);
  readonly mission = input.required<TimeRepairMission>();
  readonly rippleRequested = output<void>();
  readonly scene = computed(() =>
    this.runtime.config.scenes.find((s) => s.id === this.mission().sceneId)!,
  );
  readonly progress = computed(() => this.runtime.state().missions[this.mission().id]);
  readonly selected = signal('');
  readonly viewIndex = signal(0);
  readonly view = computed(() => this.scene().views[this.viewIndex()] ?? this.scene().views[0]);
  readonly inspected = computed(() => this.scene().hotspots.find((h) => h.id === this.selected()));
  readonly inspectorTitle = viewChild<ElementRef<HTMLElement>>('inspectorTitle');
  private readonly injector = inject(Injector);
  optionId = '';
  inspect(id: string): void {
    if (this.runtime.dispatch({ type: 'inspect', missionId: this.mission().id, hotspotId: id })) {
      this.selected.set(id);
      afterNextRender(
        () => {
          const element = this.inspectorTitle()?.nativeElement;
          element?.scrollIntoView({ block: 'nearest', behavior: 'instant' });
          element?.focus({ preventScroll: true });
        },
        {
          injector: this.injector,
        },
      );
    }
  }
  repair(): void {
    this.runtime.dispatch({
      type: 'repair',
      missionId: this.mission().id,
      optionId: this.optionId,
    });
  }
  objectLabel(): string {
    const last = this.progress().attempts.at(-1);
    return (
      this.mission().repair.options.find((o) => o.id === last?.optionId)?.objectLabel ??
      'Scene awaiting inspection'
    );
  }
}
