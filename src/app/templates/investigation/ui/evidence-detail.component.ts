import { Component, effect, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import type { AnalysisClassification, InvestigationEvidenceItem } from './investigation-ui.models';

@Component({
  selector: 'app-investigation-evidence-detail',
  imports: [FormsModule],
  templateUrl: './evidence-detail.component.html',
  styleUrl: './evidence-detail.component.scss',
})
export class InvestigationEvidenceDetailComponent {
  readonly evidence = input.required<InvestigationEvidenceItem>();
  readonly closed = output<void>();
  readonly classificationChanged = output<AnalysisClassification>();
  readonly noteSaved = output<string>();
  readonly importanceChanged = output<boolean>();
  readonly finalEvidenceSelected = output<void>();
  readonly questionCreated = output<string>();

  readonly note = signal('');
  readonly question = signal('');

  constructor() {
    effect(() => {
      const notes = this.evidence().notes;
      this.note.set(notes.at(-1) ?? '');
      this.question.set('');
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
