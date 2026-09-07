import { Component, computed, inject, signal } from '@angular/core';

import type { ArgumentMarker, DebateEvidence, EvidenceMark } from '../domain/debate-studio.models';
import { DebateStudioRuntimeService } from '../runtime/debate-studio-runtime.service';

type ComposerTab = 'plan' | 'opponent' | 'evidence' | 'write' | 'feedback' | 'file' | 'moderator';

@Component({
  selector: 'app-debate-composer-dock',
  templateUrl: './debate-composer-dock.component.html',
  styleUrl: './debate-composer-dock.component.scss',
  host: {
    '[class.composer-expanded]': 'expanded()',
  },
})
export class DebateComposerDockComponent {
  readonly runtime = inject(DebateStudioRuntimeService);
  readonly expanded = signal(false);
  readonly activeTab = signal<ComposerTab>('plan');
  readonly tabs: readonly { id: ComposerTab; label: string }[] = [
    { id: 'plan', label: 'Plan' },
    { id: 'opponent', label: 'Opponent' },
    { id: 'evidence', label: 'Evidence' },
    { id: 'write', label: 'Write' },
    { id: 'feedback', label: 'Feedback' },
    { id: 'file', label: 'Record & file' },
  ];
  readonly argumentMarks: readonly { value: ArgumentMarker; label: string }[] = [
    { value: 'answer-this', label: 'Answer this' },
    { value: 'challenge-this', label: 'Challenge this' },
    { value: 'strong-evidence', label: 'Strong evidence' },
    { value: 'weak-evidence', label: 'Weak evidence' },
    { value: 'needs-context', label: 'Needs context' },
    { value: 'save-for-closing', label: 'Save for closing' },
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
  readonly reasoningReady = computed(
    () => this.runtime.state().reasoningContribution.trim().length >= 30,
  );
  readonly listeningReady = computed(() => {
    const opponent = this.runtime.previousOpponentTurn();
    return opponent === undefined || this.runtime.state().opponentHeardTurnId === opponent.id;
  });
  readonly moderatorReady = computed(() => {
    const prompt = this.runtime.currentModeratorPrompt();
    return prompt === undefined || this.runtime.state().moderatorHeardPromptId === prompt.id;
  });
  readonly evidenceReady = computed(
    () =>
      this.runtime.state().selectedEvidenceIds.length >=
      (this.runtime.currentRound()?.minimumEvidence ?? 0),
  );

  setTab(tab: ComposerTab): void {
    this.activeTab.set(tab);
  }

  toggleExpanded(): void {
    this.expanded.update((expanded) => !expanded);
  }

  open(tab: ComposerTab = 'plan'): void {
    this.activeTab.set(tab);
    this.expanded.set(true);
  }

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

  markPassage(excerpt: string, event: Event): void {
    this.runtime.markOpponentPassage(
      excerpt,
      (event.target as HTMLSelectElement).value as ArgumentMarker,
    );
  }
}
