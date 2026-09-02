import { Component, OnDestroy, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import type {
  EvidenceReference,
  ReportSectionDefinition,
} from '../../domain/simulation-decision.models';
import { SimulationDecisionRuntimeService } from '../../runtime/simulation-decision-runtime.service';

@Component({
  selector: 'app-simulation-strategy-report',
  imports: [FormsModule],
  templateUrl: './strategy-report.component.html',
  styleUrl: './strategy-report.component.scss',
})
export class SimulationStrategyReportComponent implements OnDestroy {
  readonly runtime = inject(SimulationDecisionRuntimeService);
  readonly selectedSectionId = signal(this.runtime.config.reportSections[0]?.id ?? '');
  readonly response = signal('');
  readonly calculation = signal('');
  readonly evidenceIds = signal<string[]>([]);
  readonly evidenceFilter = signal<'all' | EvidenceReference['sourceType']>('all');
  readonly autosaveLabel = signal('Saved');
  readonly confirmSubmit = signal(false);
  readonly selectedDefinition = computed(() =>
    this.runtime.config.reportSections.find((section) => section.id === this.selectedSectionId()),
  );
  readonly selectedState = computed(
    () => this.runtime.state().report.sections[this.selectedSectionId()],
  );
  readonly filteredEvidence = computed(() =>
    this.runtime
      .state()
      .evidence.filter(
        (evidence) =>
          this.evidenceFilter() === 'all' || evidence.sourceType === this.evidenceFilter(),
      ),
  );
  readonly completedSections = computed(
    () =>
      this.runtime.config.reportSections.filter((section) => this.sectionComplete(section)).length,
  );
  private saveTimer?: ReturnType<typeof setTimeout>;

  constructor() {
    this.loadSection(this.selectedSectionId());
  }

  ngOnDestroy(): void {
    if (this.saveTimer !== undefined) {
      clearTimeout(this.saveTimer);
    }
    this.saveNow();
  }

  selectSection(sectionId: string): void {
    this.saveNow();
    this.selectedSectionId.set(sectionId);
    this.loadSection(sectionId);
  }

  updateResponse(value: string): void {
    this.response.set(value);
    this.scheduleSave();
  }

  updateCalculation(value: string): void {
    this.calculation.set(value);
    this.scheduleSave();
  }

  toggleEvidence(evidenceId: string): void {
    this.evidenceIds.update((current) =>
      current.includes(evidenceId)
        ? current.filter((id) => id !== evidenceId)
        : [...current, evidenceId],
    );
    this.scheduleSave();
  }

  sectionComplete(definition: ReportSectionDefinition): boolean {
    const state = this.runtime.state().report.sections[definition.id];
    return (
      (state?.response.trim().length ?? 0) >= 12 &&
      (state?.evidenceIds.length ?? 0) >= definition.evidenceMinimum &&
      (!definition.calculationRequired || (state?.calculation.trim().length ?? 0) > 0)
    );
  }

  attached(evidenceId: string): boolean {
    return this.evidenceIds().includes(evidenceId);
  }

  evidenceTitle(evidenceId: string): string {
    return (
      this.runtime.state().evidence.find((evidence) => evidence.id === evidenceId)?.title ??
      evidenceId
    );
  }

  submit(): void {
    this.saveNow();
    if (this.runtime.submitReport()) {
      this.confirmSubmit.set(false);
    }
  }

  private loadSection(sectionId: string): void {
    const state = this.runtime.state().report.sections[sectionId];
    this.response.set(state?.response ?? '');
    this.calculation.set(state?.calculation ?? '');
    this.evidenceIds.set([...(state?.evidenceIds ?? [])]);
  }

  private scheduleSave(): void {
    this.autosaveLabel.set('Saving…');
    if (this.saveTimer !== undefined) {
      clearTimeout(this.saveTimer);
    }
    this.saveTimer = setTimeout(() => this.saveNow(), 700);
  }

  private saveNow(): void {
    const sectionId = this.selectedSectionId();
    if (sectionId.length === 0 || this.runtime.state().status === 'submitted') {
      return;
    }
    this.runtime.updateReportSection(
      sectionId,
      this.response(),
      this.evidenceIds(),
      this.calculation(),
    );
    this.autosaveLabel.set('Saved');
  }
}
