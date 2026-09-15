import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { RepairPreviewRuntime } from '../runtime/time-repair-preview.runtime';
import { RepairWeekSourceComponent } from './time-repair-week-source.component';

@Component({
  selector: 'app-repair-ripple-workbench',
  imports: [RepairWeekSourceComponent],
  templateUrl: './time-repair-week-ripple.component.html',
  styleUrl: './time-repair-week-activity.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RepairRippleWorkbenchComponent {
  readonly r = inject(RepairPreviewRuntime);
  readonly repaired = signal(false);
  readonly ripple = computed(() => this.r.mission().ripples[this.r.rippleIndex()]);
  readonly node = computed(() => this.r.config.nodes.find((n) => n.id === this.ripple().nodeId)!);
  readonly option = computed(() =>
    this.r.mission().repair.options.find((o) => o.id === this.r.trial()?.optionId),
  );
  readonly previous = (index: number): number => Math.max(0, index - 1);
  readonly next = (index: number): number =>
    Math.min(this.r.mission().ripples.length - 1, index + 1);
  date(id: string): string {
    return this.r.config.nodes.find((n) => n.id === id)!.dateLabel;
  }
}
