import { Component, computed, effect, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import type { HypothesisRuntimeState } from '../domain/runtime-state';
import type { InvestigationEvidenceItem, TheoryDraft } from './investigation-ui.models';

@Component({
  selector: 'app-investigation-working-theory',
  imports: [FormsModule],
  templateUrl: './working-theory.component.html',
  styleUrl: './working-theory.component.scss',
})
export class InvestigationWorkingTheoryComponent {
  readonly theory = input<HypothesisRuntimeState | undefined>(undefined);
  readonly theories = input<readonly HypothesisRuntimeState[]>([]);
  readonly evidence = input<readonly InvestigationEvidenceItem[]>([]);
  readonly compact = input(false);
  readonly saveState = input<'saved' | 'saving' | 'pending'>('saved');

  readonly theorySaved = output<TheoryDraft>();
  readonly theorySelected = output<string>();
  readonly evidenceSelected = output<string>();
  readonly investigateRequested = output<void>();
  readonly finalRequested = output<void>();

  readonly editing = signal(false);
  readonly creatingAlternative = signal(false);
  readonly statement = signal('');
  readonly confidence = signal(50);
  readonly reasoning = signal('');
  readonly remainingQuestion = signal('');
  readonly evidenceIds = signal<string[]>([]);
  readonly reasonForChange = signal('');

  readonly supportingEvidence = computed(() =>
    this.evidence().filter(
      (item) => item.classification === 'supports' && this.evidenceIds().includes(item.id),
    ),
  );
  readonly challengingEvidence = computed(() =>
    this.evidence().filter(
      (item) => item.classification === 'contradicts' && this.evidenceIds().includes(item.id),
    ),
  );
  readonly availableEvidence = computed(() =>
    this.evidence().filter((item) => item.status !== 'locked'),
  );

  constructor() {
    effect(() => {
      if (this.editing() || this.creatingAlternative()) {
        return;
      }
      const theory = this.theory();
      if (theory === undefined) {
        this.statement.set('');
        this.confidence.set(50);
        this.reasoning.set('');
        this.remainingQuestion.set('');
        this.evidenceIds.set([]);
        return;
      }
      this.statement.set(theory.statement);
      this.confidence.set(theory.confidence ?? 50);
      this.reasoning.set(theory.reasoning ?? '');
      this.remainingQuestion.set(theory.remainingQuestion ?? '');
      this.evidenceIds.set([...(theory.evidenceIds ?? [])]);
    });
  }

  beginEditing(): void {
    this.editing.set(true);
  }

  beginAlternative(): void {
    this.creatingAlternative.set(true);
    this.editing.set(false);
    this.statement.set('');
    this.confidence.set(50);
    this.reasoning.set('');
    this.remainingQuestion.set('');
    this.evidenceIds.set([]);
    this.reasonForChange.set('');
  }

  cancelEditing(): void {
    this.creatingAlternative.set(false);
    this.editing.set(false);
    const theory = this.theory();
    if (theory !== undefined) {
      this.statement.set(theory.statement);
      this.confidence.set(theory.confidence ?? 50);
      this.reasoning.set(theory.reasoning ?? '');
      this.remainingQuestion.set(theory.remainingQuestion ?? '');
      this.evidenceIds.set([...(theory.evidenceIds ?? [])]);
    }
  }

  toggleEvidence(evidenceId: string, selected: boolean): void {
    this.evidenceIds.update((current) =>
      selected
        ? current.includes(evidenceId)
          ? current
          : [...current, evidenceId]
        : current.filter((id) => id !== evidenceId),
    );
  }

  saveTheory(): void {
    const statement = this.statement().trim();
    if (statement.length === 0) {
      return;
    }
    this.theorySaved.emit({
      statement,
      confidence: this.confidence(),
      reasoning: this.reasoning().trim(),
      remainingQuestion: this.remainingQuestion().trim(),
      evidenceIds: this.evidenceIds(),
      reasonForChange: this.reasonForChange().trim() || undefined,
      createNew: this.creatingAlternative(),
    });
    this.reasonForChange.set('');
    this.creatingAlternative.set(false);
    this.editing.set(false);
  }
}
