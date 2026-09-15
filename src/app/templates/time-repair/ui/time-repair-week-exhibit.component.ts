import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  Injector,
  signal,
  viewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RepairPreviewRuntime } from '../runtime/time-repair-preview.runtime';

@Component({
  selector: 'app-repair-exhibit-workbench',
  imports: [FormsModule],
  templateUrl: './time-repair-week-exhibit.component.html',
  styleUrl: './time-repair-week-activity.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RepairExhibitWorkbenchComponent {
  readonly r = inject(RepairPreviewRuntime);
  readonly touring = signal(this.r.example);
  readonly illustration = computed(() =>
    this.r.config.previewWeeks!.illustrations.find((i) => i.id === this.r.activePanel().imageId)!,
  );
  readonly source = computed(() =>
    this.r.config.evidence.find((e) => e.id === this.r.activePanel().evidenceId),
  );
  private readonly card = viewChild<ElementRef<HTMLElement>>('card');
  private readonly injector = inject(Injector);
  select(index: number): void {
    this.r.save();
    this.r.panelIndex.set(index);
    if (this.touring()) this.focus();
  }
  rehearse(): void {
    this.r.save();
    this.touring.set(true);
    this.r.panelIndex.set(0);
    this.focus();
  }
  private focus(): void {
    afterNextRender(
      () => {
        const el = this.card()?.nativeElement;
        el?.scrollIntoView({ block: 'nearest', behavior: 'instant' });
        el?.focus({ preventScroll: true });
      },
      { injector: this.injector },
    );
  }
}
