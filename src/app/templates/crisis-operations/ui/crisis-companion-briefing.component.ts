import {
  Component,
  computed,
  ElementRef,
  inject,
  input,
  OnDestroy,
  output,
  signal,
} from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { CrisisRuntimeService } from '../runtime/crisis-runtime.service';
import { companionPreview, companionSignals } from '../domain/crisis-companion';
import type { CrisisView } from '../domain/crisis.models';
import { CrisisIconComponent } from './crisis-icon.component';

type CompanionIntent = 'brief' | 'report' | 'analysis';
@Component({
  selector: 'app-crisis-companion-briefing',
  imports: [DecimalPipe, CrisisIconComponent],
  templateUrl: './crisis-companion-briefing.component.html',
  styleUrl: './crisis-companion-briefing.component.scss',
})
export class CrisisCompanionBriefingComponent implements OnDestroy {
  readonly runtime = inject(CrisisRuntimeService);
  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef);
  readonly active = input(false);
  readonly roaming = input(true);
  readonly selectedLocation = input('');
  readonly navigate = output<CrisisView>();
  readonly locate = output<string>();
  readonly reviewAction = output<string>();
  readonly roamingChanged = output<boolean>();
  readonly mode = signal<CompanionIntent>('brief');
  readonly reportId = signal('');
  readonly actionId = signal('');
  readonly signals = computed(() => companionSignals(this.runtime.config, this.runtime.state()));
  readonly report = computed(
    () =>
      this.signals().reports.find((item) => item.id === this.reportId()) ?? this.signals().latest,
  );
  readonly reportIndex = computed(() =>
    this.signals().reports.findIndex((item) => item.id === this.report()?.id),
  );
  readonly location = computed(() =>
    this.runtime.config.locations.find((item) => item.id === this.selectedLocation()),
  );
  readonly preview = computed(() =>
    companionPreview(
      this.runtime.config,
      this.runtime.state(),
      this.actionId() ||
        this.runtime.config.actions.find((action) => !this.runtime.blocked(action))?.id ||
        this.runtime.config.actions[0]?.id ||
        '',
    ),
  );
  readonly values = computed(() => [
    ...this.runtime.config.primaryMetric.initialTrend,
    ...this.runtime.config.bulletins
      .slice(1, this.runtime.state().stage + 1)
      .map((item) => item.metricValue),
  ]);
  readonly trend = computed(() => {
    const values = this.values(),
      min = Math.min(...values) * 0.92,
      max = Math.max(...values);
    return values
      .map(
        (v, i) =>
          `${i ? 'L' : 'M'}${(i * 400) / (values.length - 1)} ${112 - ((v - min) / (max - min || 1)) * 100}`,
      )
      .join(' ');
  });
  readonly change = computed(() => this.values().at(-1)! - this.values()[0]);
  readonly suggestion = computed(() =>
    this.signals().unverified
      ? 'There’s a claim worth checking.'
      : this.runtime.shared().length
        ? 'Your evidence is ready to use.'
        : 'Let’s get a source onto the table.',
  );
  private timer?: ReturnType<typeof setTimeout>;
  choose(mode: CompanionIntent): void {
    this.mode.set(mode);
    if (mode === 'report' && this.report()) this.runtime.read(this.report()!.id);
    this.focus();
  }
  showReport(id: string): void {
    this.reportId.set(id);
    this.choose('report');
  }
  cycleReport(delta: number): void {
    const reports = this.signals().reports;
    if (!reports.length) return;
    this.showReport(reports[(this.reportIndex() + delta + reports.length) % reports.length].id);
  }
  pin(): void {
    const report = this.report();
    if (report) {
      this.runtime.read(report.id);
      this.runtime.share(report.id);
    }
  }
  private focus(): void {
    clearTimeout(this.timer);
    this.timer = setTimeout(
      () =>
        this.element.nativeElement
          .querySelector<HTMLElement>('[data-intent-heading]')
          ?.focus({ preventScroll: true }),
      0,
    );
  }
  ngOnDestroy(): void {
    clearTimeout(this.timer);
  }
}
