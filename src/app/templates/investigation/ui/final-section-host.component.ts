import { Component, computed, effect, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgTemplateOutlet } from '@angular/common';

import type { FinalSubmissionDefinition } from '../final-investigation/final-submission-contracts';
import type { StructuredArgumentPackage } from '../domain/runtime-state';
import type { InvestigationEvidenceItem } from './investigation-ui.models';

export type FinalSubmissionDraft =
  | Readonly<Record<string, unknown>>
  | Readonly<StructuredArgumentPackage>;

@Component({
  selector: 'app-investigation-final-section-host',
  imports: [FormsModule, NgTemplateOutlet],
  templateUrl: './final-section-host.component.html',
  styleUrl: './final-section-host.component.scss',
})
export class InvestigationFinalSectionHostComponent {
  readonly definition = input.required<FinalSubmissionDefinition>();
  readonly draft = input<FinalSubmissionDraft>({});
  readonly evidence = input<readonly InvestigationEvidenceItem[]>([]);
  readonly draftChanged = output<FinalSubmissionDraft>();
  readonly submitRequested = output<FinalSubmissionDraft>();

  readonly values = signal<Record<string, unknown>>({});
  readonly orderedSections = computed(() => [...this.definition().sections]);
  readonly missingSectionIds = computed(() =>
    this.orderedSections()
      .filter((section) => section.required)
      .filter((section) => !this.sectionComplete(section.id, section.type, section.minEvidenceCount))
      .map((section) => section.id),
  );

  constructor() {
    effect(() => this.values.set(structuredClone(this.draft()) as Record<string, unknown>));
  }

  textValue(sectionId: string): string {
    const value = this.values()[sectionId];
    return typeof value === 'string' ? value : '';
  }

  numberValue(sectionId: string): number {
    const value = this.values()[sectionId];
    return typeof value === 'number' ? value : 50;
  }

  evidenceIds(sectionId: string): readonly string[] {
    const value = this.values()[sectionId];
    return Array.isArray(value) ? value.filter((item): item is string => typeof item === 'string') : [];
  }

  update(sectionId: string, value: unknown): void {
    this.values.update((current) => ({ ...current, [sectionId]: value }));
    this.draftChanged.emit(Object.freeze({ ...this.values() }));
  }

  toggleEvidence(sectionId: string, evidenceId: string, selected: boolean): void {
    const current = this.evidenceIds(sectionId);
    this.update(
      sectionId,
      selected ? [...new Set([...current, evidenceId])] : current.filter((id) => id !== evidenceId),
    );
  }

  submit(): void {
    if (this.missingSectionIds().length === 0) {
      this.submitRequested.emit(Object.freeze({ ...this.values() }));
    }
  }

  private sectionComplete(sectionId: string, type: string, minimum = 1): boolean {
    const value = this.values()[sectionId];
    if (type === 'evidence' || type === 'evidence-selection') {
      return Array.isArray(value) && value.length >= minimum;
    }
    if (typeof value === 'string') return value.trim().length > 0;
    if (typeof value === 'number') return Number.isFinite(value);
    return value !== undefined && value !== null;
  }
}
