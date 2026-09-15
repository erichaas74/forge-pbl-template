import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  Injector,
  viewChild,
} from '@angular/core';
import { RepairPreviewRuntime } from '../runtime/time-repair-preview.runtime';
import { RepairWeekSourceComponent } from './time-repair-week-source.component';

@Component({
  selector: 'app-repair-scene-workbench',
  imports: [RepairWeekSourceComponent],
  templateUrl: './time-repair-week-scene.component.html',
  styleUrl: './time-repair-week-activity.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RepairSceneWorkbenchComponent {
  readonly r = inject(RepairPreviewRuntime);
  readonly hotspot = computed(() =>
    this.r.scene().hotspots.find((h) => h.id === this.r.activeHotspot()),
  );
  readonly appliedOption = computed(() =>
    this.r.mission().repair.options.find((o) => o.id === this.r.trial()?.optionId),
  );
  readonly selectedOption = computed(() =>
    this.r.mission().repair.options.find((o) => o.id === this.r.draft().optionId),
  );
  private readonly inspector = viewChild<ElementRef<HTMLElement>>('inspector');
  private readonly injector = inject(Injector);
  inspect(id: string): void {
    this.r.inspect(id);
    afterNextRender(
      () => {
        const el = this.inspector()?.nativeElement;
        el?.scrollIntoView({ block: 'nearest', behavior: 'instant' });
        el?.focus({ preventScroll: true });
      },
      { injector: this.injector },
    );
  }
}
