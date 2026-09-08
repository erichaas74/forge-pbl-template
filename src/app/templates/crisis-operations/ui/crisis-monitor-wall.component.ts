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
import type { CrisisEvidence, CrisisView } from '../domain/crisis.models';
import { CrisisIconComponent } from './crisis-icon.component';

export type CrisisMonitor = 'telemetry' | 'camera' | 'wire' | 'resources';

/** These four screen instances remain mounted while the room camera moves. */
@Component({
  selector: 'app-crisis-monitor-wall',
  imports: [DecimalPipe, CrisisIconComponent],
  templateUrl: './crisis-monitor-wall.component.html',
  styleUrl: './crisis-monitor-wall.component.scss',
})
export class CrisisMonitorWallComponent implements OnDestroy {
  readonly runtime = inject(CrisisRuntimeService);
  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef);
  readonly active = input(false);
  readonly available = input(true);
  readonly open = output<void>();
  readonly navigate = output<CrisisView>();
  readonly locate = output<string>();
  readonly selectedScreen = signal<CrisisMonitor>('camera');
  readonly cameraZoom = signal(false);
  readonly history = signal(false);
  readonly selectedReportId = signal('');
  readonly reports = computed(() =>
    this.runtime
      .reports()
      .filter(
        (r) =>
          !r.roleIds.length ||
          this.runtime.state().sharedEvidenceIds.includes(r.id) ||
          r.confidence === 'Unverified',
      ),
  );
  readonly report = computed(() => this.reports().find((r) => r.id === this.selectedReportId()));
  readonly values = computed(() => [
    ...this.runtime.config.primaryMetric.initialTrend,
    ...this.runtime.config.bulletins
      .slice(1, this.runtime.state().stage + 1)
      .map((b) => b.metricValue),
  ]);
  readonly points = computed(() => {
    const values = this.values(),
      min = Math.min(...values) * 0.9,
      max = Math.max(...values);
    return values
      .map(
        (n, i) =>
          `${i ? 'L' : 'M'}${(i * 200) / (values.length - 1)} ${85 - ((n - min) / (max - min || 1)) * 76}`,
      )
      .join(' ');
  });
  readonly crewSlots = Array.from({ length: this.runtime.config.crews }, (_, i) => i + 1);
  private focusTimer?: ReturnType<typeof setTimeout>;

  activate(screen: CrisisMonitor): void {
    this.selectedScreen.set(screen);
    if (!this.active()) this.open.emit();
  }
  read(report: CrisisEvidence): void {
    this.activate('wire');
    this.runtime.read(report.id);
    this.selectedReportId.set(report.id);
    clearTimeout(this.focusTimer);
    this.focusTimer = setTimeout(
      () =>
        this.element.nativeElement
          .querySelector<HTMLElement>('.wire-detail')
          ?.focus({ preventScroll: true }),
      0,
    );
  }
  pin(report: CrisisEvidence): void {
    this.runtime.share(report.id);
  }
  closeReport(): void {
    const id = this.selectedReportId();
    this.selectedReportId.set('');
    clearTimeout(this.focusTimer);
    this.focusTimer = setTimeout(() => {
      const buttons =
        this.element.nativeElement.querySelectorAll<HTMLButtonElement>('[data-report-id]');
      [...buttons].find((b) => b.dataset['reportId'] === id)?.focus({ preventScroll: true });
    }, 0);
  }
  ngOnDestroy(): void {
    clearTimeout(this.focusTimer);
  }
}
