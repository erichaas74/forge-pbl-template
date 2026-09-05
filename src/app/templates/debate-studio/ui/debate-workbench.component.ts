import { DatePipe } from '@angular/common';
import { Component, computed, inject } from '@angular/core';

import type { ArgumentMarker, DebateEvidence, EvidenceMark } from '../domain/debate-studio.models';
import { DebateStudioRuntimeService } from '../runtime/debate-studio-runtime.service';

@Component({
  selector: 'app-debate-workbench',
  imports: [DatePipe],
  templateUrl: './debate-workbench.component.html',
  styleUrl: './debate-workbench.component.scss',
})
export class DebateWorkbenchComponent {
  readonly runtime = inject(DebateStudioRuntimeService);
  readonly argumentMarks: readonly { value: ArgumentMarker; label: string }[] = [
    { value: 'answer-this', label: 'Answer This' },
    { value: 'challenge-this', label: 'Challenge This' },
    { value: 'strong-evidence', label: 'Strong Evidence' },
    { value: 'weak-evidence', label: 'Weak Evidence' },
    { value: 'needs-context', label: 'Needs Context' },
    { value: 'save-for-closing', label: 'Save for Closing' },
  ];
  readonly evidenceMarks: readonly { value: EvidenceMark; label: string }[] = [
    { value: 'support', label: 'Supports our case' },
    { value: 'challenge', label: 'Challenges opponent' },
    { value: 'context', label: 'Adds context' },
    { value: 'closing', label: 'Save for closing' },
    { value: 'fact-check', label: 'Needs fact check' },
  ];
  readonly draftWords = computed(() => {
    const draft = this.runtime.state().draft.trim();
    return draft.length === 0 ? 0 : draft.split(/\s+/).length;
  });

  updateDraft(event: Event): void {
    this.runtime.updateDraft((event.target as HTMLTextAreaElement).value);
  }

  updateReasoning(event: Event): void {
    this.runtime.updateReasoningContribution((event.target as HTMLTextAreaElement).value);
  }

  updateModerator(event: Event): void {
    this.runtime.moderatorDraft.set((event.target as HTMLTextAreaElement).value);
  }

  markEvidence(item: DebateEvidence, event: Event): void {
    this.runtime.markEvidence(item, (event.target as HTMLSelectElement).value as EvidenceMark);
  }

  evidenceMarkLabel(mark: EvidenceMark | undefined): string {
    return this.evidenceMarks.find((option) => option.value === mark)?.label ?? 'Unsorted';
  }
}
