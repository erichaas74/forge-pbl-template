import { Component, computed, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { InvestigationEvidenceDetailComponent } from './evidence-detail.component';
import type {
  AnalysisClassification,
  EvidenceClassificationChange,
  InvestigationEvidenceItem,
  StudentEvidenceDraft,
} from './investigation-ui.models';

@Component({
  selector: 'app-investigation-evidence-locker',
  imports: [FormsModule, InvestigationEvidenceDetailComponent],
  templateUrl: './evidence-locker.component.html',
  styleUrl: './evidence-locker.component.scss',
})
export class InvestigationEvidenceLockerComponent {
  readonly evidence = input.required<readonly InvestigationEvidenceItem[]>();
  readonly selectedEvidenceId = input<string | undefined>(undefined);

  readonly evidenceSelected = output<string | undefined>();
  readonly classificationChanged = output<EvidenceClassificationChange>();
  readonly noteSaved = output<{ evidenceId: string; note: string }>();
  readonly importanceChanged = output<{ evidenceId: string; important: boolean }>();
  readonly finalEvidenceSelected = output<string>();
  readonly questionCreated = output<{ evidenceId: string; text: string }>();
  readonly studentEvidenceCreated = output<StudentEvidenceDraft>();

  readonly creatingEvidence = signal(false);
  readonly studentEvidenceTitle = signal('');
  readonly studentEvidenceObservation = signal('');

  readonly selectedEvidence = computed(() =>
    this.evidence().find((item) => item.id === this.selectedEvidenceId()),
  );

  visibleStatus(item: InvestigationEvidenceItem): string {
    if (item.status === 'available' || item.status === 'unopened') {
      return 'New';
    }
    if (item.status === 'usedInClaim') {
      return 'Used in final case';
    }
    if (item.status === 'studentCreated') {
      return 'My evidence';
    }
    if (item.status === 'locked') {
      return 'Locked';
    }
    return item.classification === undefined ? 'Reviewed' : 'Classified';
  }

  classify(evidenceId: string, classification: AnalysisClassification | ''): void {
    if (classification !== '') {
      this.classificationChanged.emit({ evidenceId, classification });
    }
  }

  createStudentEvidence(): void {
    const title = this.studentEvidenceTitle().trim();
    const observation = this.studentEvidenceObservation().trim();
    if (title.length === 0 || observation.length === 0) {
      return;
    }
    this.studentEvidenceCreated.emit({ title, observation });
    this.studentEvidenceTitle.set('');
    this.studentEvidenceObservation.set('');
    this.creatingEvidence.set(false);
  }
}
