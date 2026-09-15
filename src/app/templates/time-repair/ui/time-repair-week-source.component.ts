import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  Injector,
  input,
  OnChanges,
  viewChild,
} from '@angular/core';
import type { TimeRepairEvidence } from '../domain/time-repair.models';

@Component({
  selector: 'app-repair-week-source',
  template: `@if (source(); as s) {
    <article class="source-card" #card tabindex="-1" aria-label="Selected source">
      <p class="eyebrow">SOURCE CARD · {{ s.kind }}</p>
      <h3>{{ s.title }}</h3>
      <p>{{ s.content }}</p>
      <h4>What to keep in mind</h4>
      <p>{{ s.perspective }}</p>
      <small>{{ s.citation }}</small>
      @if (s.url) {
        <a [href]="s.url" target="_blank" rel="noopener noreferrer">Open original source ↗</a>
      }
    </article>
  }`,
  styleUrl: './time-repair-week-activity.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RepairWeekSourceComponent implements OnChanges {
  readonly source = input<TimeRepairEvidence>();
  readonly card = viewChild<ElementRef<HTMLElement>>('card');
  private readonly injector = inject(Injector);
  ngOnChanges(): void {
    if (!this.source()) return;
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
