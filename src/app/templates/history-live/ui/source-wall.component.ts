import { Component, computed, inject, signal, afterRenderEffect, ElementRef } from '@angular/core';

import type {
  ClaimStatus,
  SourcePerspective,
  HistoryLiveEvidenceLink,
} from '../domain/history-live.models';
import { HistoryLiveRuntimeService } from '../runtime/history-live-runtime.service';

@Component({
  selector: 'app-history-live-source-wall',
  templateUrl: './source-wall.component.html',
  styleUrl: './source-wall.component.scss',
})
export class SourceWallComponent {
  readonly runtime = inject(HistoryLiveRuntimeService);
  readonly filter = signal<SourcePerspective | 'all'>('all');
  readonly claimText = signal(this.runtime.state().claimDraft?.text ?? '');
  readonly reasoning = signal(this.runtime.state().claimDraft?.reasoning ?? '');
  readonly uncertainty = signal(this.runtime.state().claimDraft?.uncertainty ?? '');
  readonly evidence = signal<readonly HistoryLiveEvidenceLink[]>(
    this.runtime.state().claimDraft?.evidence ?? [],
  );
  readonly claimStatus = signal<ClaimStatus>(
    this.runtime.state().claimDraft?.status ?? 'strongly-supported',
  );
  readonly visibleSources = computed(() => {
    const filter = this.filter();
    return this.runtime.config.sources.filter(
      (source) => filter === 'all' || source.perspective === filter,
    );
  });

  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef);
  private priorSource?: string;
  constructor() {
    afterRenderEffect(() => {
      const id = this.runtime.state().selectedSourceId;
      if (id === this.priorSource) return;
      const previous = this.priorSource;
      this.priorSource = id;
      const target = id
        ? this.element.nativeElement.querySelector<HTMLElement>('.source-detail')
        : this.element.nativeElement.querySelector<HTMLElement>(`[data-source-id="${previous}"]`);
      if (target) {
        target.scrollIntoView({ block: 'nearest', behavior: 'instant' });
        target.focus({ preventScroll: true });
      }
    });
  }
  private saveDraft(): void {
    this.runtime.updateClaimDraft({
      text: this.claimText(),
      reasoning: this.reasoning(),
      uncertainty: this.uncertainty(),
      status: this.claimStatus(),
      evidence: this.evidence(),
    });
  }
  updateReasoning(event: Event): void {
    this.reasoning.set((event.target as HTMLTextAreaElement).value);
    this.saveDraft();
  }
  updateUncertainty(event: Event): void {
    this.uncertainty.set((event.target as HTMLTextAreaElement).value);
    this.saveDraft();
  }
  evidenceFor(id: string): HistoryLiveEvidenceLink | undefined {
    return this.evidence().find((link) => link.sourceId === id);
  }
  setEvidence(id: string, field: 'passage' | 'relationship', event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    const old = this.evidenceFor(id) ?? {
      sourceId: id,
      passage: '',
      relationship: 'supports' as const,
    };
    const updated =
      field === 'relationship'
        ? { ...old, relationship: value as 'supports' | 'challenges' }
        : { ...old, passage: value };
    this.evidence.set([...this.evidence().filter((link) => link.sourceId !== id), updated]);
    this.saveDraft();
  }
  recommended(id: string): boolean {
    return (
      this.runtime.config.storyLeads
        .find((lead) => lead.id === this.runtime.state().pitch.leadId)
        ?.sourceIds?.includes(id) ?? false
    );
  }

  setFilter(value: SourcePerspective | 'all'): void {
    this.filter.set(value);
  }

  updateClaim(event: Event): void {
    this.claimText.set((event.target as HTMLTextAreaElement).value);
    this.saveDraft();
  }

  updateStatus(event: Event): void {
    this.claimStatus.set((event.target as HTMLSelectElement).value as ClaimStatus);
    this.saveDraft();
  }

  addClaim(): void {
    this.runtime.addClaim(
      this.claimText(),
      this.claimStatus(),
      this.evidence().filter((link) => link.passage.trim().length > 0),
      this.reasoning(),
      this.uncertainty(),
    );
    if (this.runtime.error() === undefined) {
      this.claimText.set('');
      this.reasoning.set('');
      this.uncertainty.set('');
      this.evidence.set([]);
    }
  }
}
