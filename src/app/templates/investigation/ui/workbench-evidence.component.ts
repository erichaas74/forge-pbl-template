import { Component, computed, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InvestigationEvidenceDetailComponent } from './evidence-detail.component';
import type {
  InvestigationEvidenceItem,
  EvidenceClassificationChange,
} from './investigation-ui.models';
import type { WorkbenchEvidenceLink } from './workbench-evidence.models';

@Component({
  selector: 'app-workbench-evidence',
  imports: [FormsModule, InvestigationEvidenceDetailComponent],
  templateUrl: './workbench-evidence.component.html',
  styleUrl: './workbench-evidence.component.scss',
})
export class WorkbenchEvidenceComponent {
  readonly evidence = input.required<readonly InvestigationEvidenceItem[]>();
  readonly links = input<readonly WorkbenchEvidenceLink[]>([]);
  readonly activityId = input<string>();
  readonly selectedId = input<string>();
  readonly claim = input<string>();
  readonly selected = output<string | undefined>();
  readonly useTool = output<NonNullable<WorkbenchEvidenceLink['action']>>();
  readonly useEvidence = output<string>();
  readonly classify = output<EvidenceClassificationChange>();
  readonly noteSaved = output<{ evidenceId: string; note: string }>();
  readonly questionCreated = output<{ evidenceId: string; text: string }>();
  readonly importanceChanged = output<{ evidenceId: string; important: boolean }>();
  readonly query = signal('');
  readonly scope = signal<'related' | 'all'>('related');
  readonly category = signal('all');
  readonly current = computed(() => this.evidence().find((item) => item.id === this.selectedId()));
  readonly currentLink = computed(() =>
    this.links().find((link) => link.evidenceId === this.selectedId()),
  );
  readonly items = computed(() => {
    const query = this.query().trim().toLowerCase();
    return this.evidence().filter((item) => {
      const link = this.links().find((link) => link.evidenceId === item.id);
      const related = !this.activityId() || link?.activityIds.includes(this.activityId()!);
      if (!query && this.scope() === 'related' && !related && item.id !== this.selectedId())
        return false;
      if (
        this.category() !== 'all' &&
        (link?.category ?? (item.studentCreated ? 'result' : 'clue')) !== this.category()
      )
        return false;
      // Locked records expose only their public title and configured tool aliases, never result content.
      const text = [item.title, link?.keywords, item.status === 'locked' ? '' : item.summary]
        .join(' ')
        .toLowerCase();
      return !query || text.includes(query);
    });
  });
}
