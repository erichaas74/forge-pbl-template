import {
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  input,
  OnDestroy,
  output,
  signal,
} from '@angular/core';
import { CrisisRuntimeService } from '../runtime/crisis-runtime.service';
import type { CrisisEvidence, CrisisView, CrisisWorkstation } from '../domain/crisis.models';
import { CrisisIconComponent } from './crisis-icon.component';
import { CrisisCommandPanelComponent } from './crisis-command-panel.component';

@Component({
  selector: 'app-crisis-console',
  imports: [CrisisIconComponent, CrisisCommandPanelComponent],
  templateUrl: './crisis-console.component.html',
  styleUrl: './crisis-console.component.scss',
})
export class CrisisConsoleComponent implements OnDestroy {
  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef);
  private focusTimer?: ReturnType<typeof setTimeout>;
  readonly runtime = inject(CrisisRuntimeService);
  readonly view = input.required<CrisisView>();
  readonly suggestedActionId = input('');
  readonly workstation = input<CrisisWorkstation>();
  readonly stationRoles = computed(() => {
    const station = this.workstation();
    return station
      ? this.runtime.config.roles.filter((role) => station.roleIds.includes(role.id))
      : this.runtime.config.roles;
  });
  readonly navigate = output<CrisisView>();
  readonly inspectLocation = output<string>();
  readonly selectedEvidenceId = signal('');
  readonly confirmation = signal('');
  readonly selectedEvidence = computed(() =>
    this.runtime.reports().find((report) => report.id === this.selectedEvidenceId()),
  );

  constructor() {
    effect(() => {
      this.workstation();
      this.selectedEvidenceId.set('');
      this.confirmation.set('');
    });
  }

  openReport(report: CrisisEvidence): void {
    this.selectedEvidenceId.set(report.id);
    this.confirmation.set('');
    this.runtime.read(report.id);
    this.reveal('.evidence-reader');
  }
  closeReport(): void {
    this.selectedEvidenceId.set('');
    this.confirmation.set('');
    this.reveal('.wire');
  }
  pin(report: CrisisEvidence): void {
    this.runtime.read(report.id);
    if (this.runtime.share(report.id))
      this.confirmation.set('Report pinned to the situation table.');
  }
  private reveal(selector: string): void {
    clearTimeout(this.focusTimer);
    this.focusTimer = setTimeout(() => {
      const target = this.element.nativeElement.querySelector<HTMLElement>(selector);
      target?.scrollIntoView({ block: 'nearest', behavior: 'instant' });
      target?.focus({ preventScroll: true });
    }, 0);
  }
  trendPath(trend: readonly number[]): string {
    const min = Math.min(...trend) * 0.9,
      max = Math.max(...trend);
    return trend
      .map(
        (value, index) =>
          `${index === 0 ? 'M' : 'L'}${(index * 360) / (trend.length - 1)} ${86 - ((value - min) / (max - min || 1)) * 70}`,
      )
      .join(' ');
  }
  ngOnDestroy(): void {
    clearTimeout(this.focusTimer);
  }
}
