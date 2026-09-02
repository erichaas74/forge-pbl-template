import { Component, computed, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import type {
  AnalysisClassification,
  InvestigationEvidenceItem,
  InvestigationQuestionItem,
} from './investigation-ui.models';

@Component({
  selector: 'app-investigation-analysis-panel',
  imports: [FormsModule],
  templateUrl: './analysis-panel.component.html',
  styleUrl: './analysis-panel.component.scss',
})
export class InvestigationAnalysisPanelComponent {
  readonly zones = [
    {
      id: 'supports',
      label: 'Supports',
      prompt: 'Fits the current explanation',
      symbol: '+',
    },
    {
      id: 'uncertain',
      label: 'Uncertain',
      prompt: 'Needs more context or testing',
      symbol: '?',
    },
    {
      id: 'contradicts',
      label: 'Contradicts',
      prompt: 'Challenges the current explanation',
      symbol: '−',
    },
  ] as const;
  readonly evidence = input.required<readonly InvestigationEvidenceItem[]>();
  readonly questions = input<readonly InvestigationQuestionItem[]>([]);
  readonly selectedEvidenceId = input<string | undefined>(undefined);

  readonly evidenceSelected = output<string>();
  readonly selectionCleared = output<void>();
  readonly classificationChanged = output<{
    evidenceId: string;
    classification: AnalysisClassification;
  }>();
  readonly questionCreated = output<string>();

  readonly newQuestion = signal('');
  readonly selectedEvidence = computed(() =>
    this.evidence().find((item) => item.id === this.selectedEvidenceId()),
  );

  inZone(classification: AnalysisClassification): readonly InvestigationEvidenceItem[] {
    return this.evidence().filter((item) => item.classification === classification);
  }

  hasSelectedInZone(classification: AnalysisClassification): boolean {
    return this.inZone(classification).some((item) => item.id === this.selectedEvidenceId());
  }

  addQuestion(): void {
    const text = this.newQuestion().trim();
    if (text.length === 0) {
      return;
    }
    this.questionCreated.emit(text);
    this.newQuestion.set('');
  }
}
