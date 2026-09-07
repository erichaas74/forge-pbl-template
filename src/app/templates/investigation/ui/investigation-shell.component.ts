import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { INVESTIGATION_RUNTIME_FACADE } from '../runtime/investigation-runtime.tokens';
import type { CaseBoardInputs } from '../case-board/case-board-contracts';
import type { InvestigationEvidenceItem } from './investigation-ui.models';
import { InvestigationCaseBoardComponent } from './case-board.component';
import {
  InvestigationFinalSectionHostComponent,
  type FinalSubmissionDraft,
} from './final-section-host.component';

@Component({
  selector: 'app-investigation-shell',
  imports: [RouterLink, InvestigationCaseBoardComponent, InvestigationFinalSectionHostComponent],
  templateUrl: './investigation-shell.component.html',
  styleUrl: './investigation-shell.component.scss',
})
export class InvestigationShellComponent {
  readonly runtime = inject(INVESTIGATION_RUNTIME_FACADE);
  readonly phases = computed(() =>
    [...(this.runtime.graph()?.investigation.phases ?? [])].sort(
      (left, right) => left.order - right.order,
    ),
  );
  readonly evidence = computed<readonly InvestigationEvidenceItem[]>(() => {
    const graph = this.runtime.graph();
    const snapshot = this.runtime.snapshot();
    if (graph === undefined || snapshot === undefined) return [];
    return [...graph.evidenceById.values()].map((definition) => ({
      id: definition.id,
      title: definition.title ?? definition.id,
      type: definition.evidenceType,
      summary: definition.description ?? definition.content.text ?? '',
      source: definition.content.source?.citation ?? definition.content.source?.name ?? '',
      status: snapshot.evidence[definition.id]?.status ?? definition.availability.initialState,
      classification: asClassification(snapshot.evidence[definition.id]?.classification),
      notes: snapshot.evidence[definition.id]?.notes ?? [],
      important: snapshot.evidence[definition.id]?.important ?? false,
      studentCreated: false,
    }));
  });
  readonly boardModel = computed<CaseBoardInputs | undefined>(() => {
    const graph = this.runtime.graph();
    const snapshot = this.runtime.snapshot();
    if (graph === undefined || snapshot === undefined) return undefined;
    return {
      config: graph.caseBoard,
      runtimeState: snapshot.board,
      evidence: [...graph.evidenceById.values()].map((definition) => ({
        definition,
        runtime: snapshot.evidence[definition.id]!,
      })),
      hypotheses: snapshot.hypotheses,
      permissions: {
        canMoveItems: graph.caseBoard.interactions.dragDrop,
        canReorderItems: graph.caseBoard.interactions.reorder,
        canCreateNotes: graph.caseBoard.interactions.annotate,
        canCreateQuestions: graph.caseBoard.interactions.createStudentEvidence,
      },
    };
  });

  constructor() {
    void this.runtime.initialize();
  }

  saveFinalDraft(draft: FinalSubmissionDraft): void {
    void this.runtime.dispatch('finalSubmission.draftUpdated', undefined, { draft });
  }

  async submitFinal(draft: FinalSubmissionDraft): Promise<void> {
    await this.runtime.dispatch('finalSubmission.draftUpdated', undefined, { draft });
    await this.runtime.dispatch('finalSubmission.submitted');
  }
}

function asClassification(
  value: string | undefined,
): InvestigationEvidenceItem['classification'] {
  return value === 'supports' || value === 'uncertain' || value === 'contradicts'
    ? value
    : undefined;
}
