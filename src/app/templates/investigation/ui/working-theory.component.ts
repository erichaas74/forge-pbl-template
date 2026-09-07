import { Component, computed, effect, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { persistWorkspaceDraft } from '../../../shared/drafts/persist-workspace-draft';

import type { HypothesisRuntimeState } from '../domain/runtime-state';
import type { InvestigationEvidenceItem, TheoryDraft } from './investigation-ui.models';

/** One question in the revision pass. */
type TheoryStep = 'statement' | 'reasoning' | 'question' | 'change' | 'evidence';

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
  readonly singlePage = input(false);

  readonly theorySaved = output<TheoryDraft>();
  readonly theorySelected = output<string>();
  readonly evidenceSelected = output<string>();
  readonly investigateRequested = output<void>();
  readonly finalRequested = output<void>();

  /**
   * Revision is dealt one slip at a time rather than as a five-field form. The
   * questions are the same; asking them one at a time is what stops the panel
   * reading like a web form and starts it reading like thinking.
   */
  readonly step = signal(0);

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

  /** Which slips this pass asks for — a revision asks one the others do not. */
  readonly steps = computed<readonly TheoryStep[]>(() => {
    const revising = this.theory() !== undefined && !this.creatingAlternative();
    return [
      'statement',
      'reasoning',
      'question',
      ...(revising ? (['change'] as const) : []),
      ...(this.compact() ? [] : (['evidence'] as const)),
    ];
  });

  readonly currentStep = computed<TheoryStep>(
    () => this.steps()[Math.min(this.step(), this.steps().length - 1)],
  );

  readonly onLastStep = computed(() => this.step() >= this.steps().length - 1);

  /** A theory needs a statement; everything after it may be left for later. */
  readonly canAdvance = computed(
    () => this.currentStep() !== 'statement' || this.statement().trim().length > 0,
  );

  next(): void {
    if (!this.canAdvance()) {
      return;
    }
    if (this.onLastStep()) {
      this.saveTheory();
      return;
    }
    this.step.update((value) => value + 1);
  }

  back(): void {
    this.step.update((value) => Math.max(value - 1, 0));
  }

  constructor() {
    persistWorkspaceDraft(
      'working-theory',
      () => ({
        statement: this.statement(),
        reasoning: this.reasoning(),
        confidence: this.confidence(),
        remainingQuestion: this.remainingQuestion(),
        evidenceIds: this.evidenceIds(),
        reasonForChange: this.reasonForChange(),
        editing: this.editing() || this.theory() === undefined,
        creatingAlternative: this.creatingAlternative(),
        step: this.step(),
      }),
      (saved) => {
        if (typeof saved.statement !== 'string') return;
        this.statement.set(saved.statement);
        this.reasoning.set(typeof saved.reasoning === 'string' ? saved.reasoning : '');
        this.remainingQuestion.set(
          typeof saved.remainingQuestion === 'string' ? saved.remainingQuestion : '',
        );
        this.confidence.set(typeof saved.confidence === 'number' ? saved.confidence : 50);
        this.evidenceIds.set(Array.isArray(saved.evidenceIds) ? saved.evidenceIds : []);
        this.reasonForChange.set(saved.reasonForChange ?? '');
        this.editing.set(saved.editing ?? true);
        this.creatingAlternative.set(saved.creatingAlternative ?? false);
        this.step.set(saved.step ?? 0);
      },
    );
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

  includeEvidence(evidenceId: string): void {
    this.editing.set(true);
    this.evidenceIds.update((ids) => [...new Set([...ids, evidenceId])]);
  }

  beginEditing(): void {
    this.step.set(0);
    this.editing.set(true);
  }

  beginAlternative(): void {
    this.step.set(0);
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
    this.step.set(0);
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
    this.step.set(0);
  }
}
