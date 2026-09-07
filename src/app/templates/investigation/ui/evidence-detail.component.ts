import { Component, effect, input, output, signal, untracked } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { persistWorkspaceDraft } from '../../../shared/drafts/persist-workspace-draft';

import type { AnalysisClassification, InvestigationEvidenceItem } from './investigation-ui.models';
import type { WorkbenchEvidenceLink } from './workbench-evidence.models';

@Component({
  selector: 'app-investigation-evidence-detail',
  imports: [FormsModule],
  templateUrl: './evidence-detail.component.html',
  styleUrl: './evidence-detail.component.scss',
})
export class InvestigationEvidenceDetailComponent {
  readonly evidence = input.required<InvestigationEvidenceItem>();
  readonly referenceOnly = input(false);
  readonly claim = input<string>();
  readonly requireClaim = input(false);
  readonly sourceRecord = input<WorkbenchEvidenceLink['sourceRecord']>();
  readonly closed = output<void>();
  readonly classificationChanged = output<AnalysisClassification>();
  readonly noteSaved = output<string>();
  readonly importanceChanged = output<boolean>();
  readonly finalEvidenceSelected = output<void>();
  readonly questionCreated = output<string>();

  readonly note = signal('');
  readonly question = signal('');
  private currentId?: string;
  private readonly drafts = new Map<string, { note: string; question: string }>();

  constructor() {
    persistWorkspaceDraft(
      'evidence-notes',
      () => {
        const draft = { note: this.note(), question: this.question() };
        if (this.currentId) this.drafts.set(this.currentId, draft);
        return [...this.drafts.entries()];
      },
      (saved) => {
        if (Array.isArray(saved)) for (const [id, draft] of saved) this.drafts.set(id, draft);
      },
    );
    effect(() => {
      const item = this.evidence();
      untracked(() => {
        if (item.id === this.currentId) return;
        if (this.currentId)
          this.drafts.set(this.currentId, { note: this.note(), question: this.question() });
        this.currentId = item.id;
        const draft = this.drafts.get(item.id);
        this.note.set(draft?.note ?? item.notes.at(-1) ?? '');
        this.question.set(draft?.question ?? '');
      });
    });
  }

  saveNote(): void {
    const note = this.note().trim();
    if (note.length > 0 && note !== this.evidence().notes.at(-1)) {
      this.noteSaved.emit(note);
    }
  }

  addQuestion(): void {
    const question = this.question().trim();
    if (question.length === 0) {
      return;
    }
    this.questionCreated.emit(question);
    this.question.set('');
  }
}
