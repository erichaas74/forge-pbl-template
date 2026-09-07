import {
  afterNextRender,
  Component,
  ElementRef,
  inject,
  Injector,
  OnDestroy,
  computed,
  effect,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

import type { RuntimeStateSnapshot } from '../domain/runtime-state';
import { DraftAutosaveController } from '../../../shared/drafts';
import type { FinalCaseDraft, InvestigationEvidenceItem } from './investigation-ui.models';

@Component({
  selector: 'app-investigation-final-case',
  imports: [FormsModule],
  templateUrl: './final-investigation.component.html',
  styleUrl: './final-investigation.component.scss',
})
export class InvestigationFinalCaseComponent implements OnDestroy {
  readonly runtime = input.required<RuntimeStateSnapshot>();
  readonly evidence = input.required<readonly InvestigationEvidenceItem[]>();
  readonly ready = input(false);
  readonly readOnly = input(false);
  private readonly injector = inject(Injector);
  private readonly previewHeading = viewChild<ElementRef<HTMLElement>>('previewHeading');
  readonly missingReadiness = input<readonly string[]>([]);
  readonly saveState = input<'saved' | 'saving' | 'pending'>('saved');

  readonly caseBoardRequested = output<void>();
  readonly evidencePreviewRequested = output<string>();
  readonly draftSaved = output<FinalCaseDraft>();
  readonly submitRequested = output<void>();

  readonly identification = signal('');
  readonly selectedEvidenceIds = signal<string[]>([]);
  readonly reasoning = signal('');
  readonly counterevidence = signal('');
  readonly uncertainty = signal('');
  readonly recommendation = signal('');
  readonly confidence = signal(50);
  readonly reflection = signal('');
  readonly individualContribution = signal('');
  readonly previewEvidenceId = signal<string | undefined>(undefined);
  readonly confirmSubmit = signal(false);
  readonly evidenceFilter = signal<
    'all' | 'supports' | 'contradicts' | 'uncertain' | 'important' | 'studentCreated'
  >('all');

  private readonly autosave = new DraftAutosaveController<FinalCaseDraft>((draft) =>
    this.draftSaved.emit(draft),
  );

  readonly eligibleEvidence = computed(() =>
    this.evidence().filter(
      (item) =>
        item.status !== 'locked' && item.status !== 'available' && item.status !== 'unopened',
    ),
  );
  readonly filteredEvidence = computed(() => {
    const filter = this.evidenceFilter();
    return this.eligibleEvidence().filter((item) => {
      if (filter === 'all') {
        return true;
      }
      if (filter === 'important') {
        return item.important;
      }
      if (filter === 'studentCreated') {
        return item.studentCreated;
      }
      return item.classification === filter;
    });
  });
  readonly selectedEvidence = computed(() =>
    this.eligibleEvidence().filter((item) => this.selectedEvidenceIds().includes(item.id)),
  );
  readonly previewEvidence = computed(() =>
    this.evidence().find((item) => item.id === this.previewEvidenceId()),
  );
  readonly missingSections = computed(() => {
    const missing: string[] = [];
    if (this.identification().trim().length === 0) {
      missing.push('Final identification');
    }
    if (this.selectedEvidence().length < 4) {
      missing.push('At least 4 evidence items');
    }
    if (this.reasoning().trim().length === 0) {
      missing.push('Scientific reasoning');
    }
    if (this.counterevidence().trim().length === 0) {
      missing.push('Counterevidence');
    }
    if (this.recommendation().trim().length === 0) {
      missing.push('Shelf restoration recommendation');
    }
    return missing;
  });
  readonly completedSections = computed(() => 5 - this.missingSections().length);
  readonly currentTheory = computed(() => {
    const theories = this.runtime().hypotheses;
    return theories.find((theory) => theory.selected) ?? theories.at(-1);
  });
  readonly strongestSupport = computed(() =>
    this.eligibleEvidence()
      .filter((item) => item.classification === 'supports')
      .slice(0, 3),
  );
  readonly biggestChallenges = computed(() =>
    this.eligibleEvidence()
      .filter((item) => item.classification === 'contradicts')
      .slice(0, 3),
  );

  constructor() {
    effect(() => {
      const draft = this.runtime().finalSubmission.argumentDraft;
      this.identification.set(draft.identification ?? draft.claim ?? '');
      this.selectedEvidenceIds.set([...(draft.evidenceIds ?? [])]);
      this.reasoning.set(draft.reasoning ?? '');
      this.counterevidence.set(draft.counterevidence ?? '');
      this.uncertainty.set(draft.uncertainty ?? '');
      this.recommendation.set(draft.recommendation ?? '');
      this.confidence.set(draft.confidence ?? 50);
      this.reflection.set(draft.reflection ?? '');
      this.individualContribution.set(draft.individualContribution ?? '');
    });
  }

  ngOnDestroy(): void {
    void this.autosave.flush();
  }

  connectionAvailable(): boolean {
    return typeof navigator === 'undefined' || navigator.onLine;
  }

  updateText(
    field:
      | 'identification'
      | 'reasoning'
      | 'counterevidence'
      | 'uncertainty'
      | 'recommendation'
      | 'reflection'
      | 'individualContribution',
    value: string,
  ): void {
    if (this.readOnly()) return;
    this[field].set(value);
    this.queueSave();
  }

  updateConfidence(value: number): void {
    if (this.readOnly()) return;
    this.confidence.set(value);
    this.queueSave();
  }

  toggleEvidence(evidenceId: string, selected: boolean): void {
    if (this.readOnly()) return;
    this.selectedEvidenceIds.update((current) =>
      selected
        ? current.includes(evidenceId)
          ? current
          : [...current, evidenceId]
        : current.filter((id) => id !== evidenceId),
    );
    this.queueSave();
  }

  saveDraft(): void {
    if (this.readOnly()) return;
    this.autosave.cancel();
    this.draftSaved.emit(this.currentDraft());
  }

  requestSubmit(): void {
    if (this.readOnly()) return;
    this.saveDraft();
    if (this.missingSections().length === 0 && this.connectionAvailable()) {
      this.confirmSubmit.set(true);
    }
  }

  private queueSave(): void {
    this.autosave.schedule(this.currentDraft());
  }

  previewEvidenceRecord(id: string): void {
    this.previewEvidenceId.set(id);
    afterNextRender(
      () => {
        const element = this.previewHeading()?.nativeElement;
        element?.scrollIntoView({ block: 'nearest' });
        element?.focus({ preventScroll: true });
      },
      { injector: this.injector },
    );
  }

  private currentDraft(): FinalCaseDraft {
    return {
      identification: this.identification().trim(),
      evidenceIds: this.selectedEvidence().map((item) => item.id),
      reasoning: this.reasoning().trim(),
      counterevidence: this.counterevidence().trim(),
      uncertainty: this.uncertainty().trim(),
      recommendation: this.recommendation().trim(),
      confidence: this.confidence(),
      reflection: this.reflection().trim(),
      individualContribution: this.individualContribution().trim(),
    };
  }
}
