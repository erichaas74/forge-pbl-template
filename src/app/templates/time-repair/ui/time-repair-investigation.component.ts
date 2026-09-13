import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  Injector,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import type { EvidenceLink, RepairDefense, TimeRepairMission } from '../domain/time-repair.models';
import { TimeRepairRuntime } from '../runtime/time-repair.runtime';

@Component({
  selector: 'app-time-repair-investigation',
  imports: [FormsModule],
  templateUrl: './time-repair-investigation.component.html',
  styleUrl: './time-repair-investigation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimeRepairInvestigationComponent {
  readonly runtime = inject(TimeRepairRuntime);
  readonly mission = input.required<TimeRepairMission>();
  readonly jumpRequested = output<void>();
  readonly mode = signal<'sources' | 'defense'>('sources');
  readonly evidenceId = signal(this.runtime.config.evidence[0].id);
  readonly source = computed(() =>
    this.runtime.config.evidence.find((e) => e.id === this.evidenceId())!,
  );
  readonly progress = computed(() => this.runtime.state().missions[this.mission().id]);
  readonly collected = computed(() =>
    this.runtime.state().collectedIds.includes(this.evidenceId()),
  );
  readonly sourceTitle = viewChild<ElementRef<HTMLElement>>('sourceTitle');
  readonly boardTitle = viewChild<ElementRef<HTMLElement>>('boardTitle');
  private readonly injector = inject(Injector);
  readonly drafts = new Map<string, EvidenceLink>();
  relationship: EvidenceLink['relationship'] = 'contradicts';
  confidence: EvidenceLink['confidence'] = 'developing';
  note = '';
  defense: RepairDefense = {
    category: '',
    claim: '',
    consequence: '',
    answerId: '',
    explanation: '',
  };
  private defenseLoaded = false;

  ngOnInit(): void {
    const saved = this.progress().links.find((link) => link.evidenceId === this.evidenceId());
    if (saved) {
      this.note = saved.note;
      this.relationship = saved.relationship;
      this.confidence = saved.confidence;
    }
  }

  selectSource(id: string): void {
    this.drafts.set(this.evidenceId(), {
      evidenceId: this.evidenceId(),
      relationship: this.relationship,
      note: this.note,
      confidence: this.confidence,
    });
    this.evidenceId.set(id);
    const saved = this.drafts.get(id) ?? this.progress().links.find((l) => l.evidenceId === id);
    this.note = saved?.note ?? '';
    this.relationship = saved?.relationship ?? 'contradicts';
    this.confidence = saved?.confidence ?? 'developing';
    this.focus('source');
  }
  collect(): void {
    this.runtime.dispatch({ type: 'collect', evidenceId: this.evidenceId() });
  }
  connect(): void {
    this.runtime.dispatch({
      type: 'link',
      missionId: this.mission().id,
      link: {
        evidenceId: this.evidenceId(),
        note: this.note,
        relationship: this.relationship,
        confidence: this.confidence,
      },
    });
  }
  openBoard(): void {
    if (!this.defenseLoaded) {
      this.defense = { ...(this.progress().defenses.at(-1) ?? this.defense) };
      this.defenseLoaded = true;
    }
    this.mode.set('defense');
    this.focus('board');
  }
  openSources(): void {
    this.mode.set('sources');
    this.focus('source');
  }
  defend(): void {
    this.runtime.dispatch({ type: 'defend', missionId: this.mission().id, defense: this.defense });
  }
  title(id: string): string {
    return this.runtime.config.evidence.find((e) => e.id === id)?.title ?? id;
  }
  private focus(target: 'source' | 'board'): void {
    afterNextRender(
      () => {
        const element = (target === 'source' ? this.sourceTitle() : this.boardTitle())
          ?.nativeElement;
        element?.scrollIntoView({ block: 'nearest', behavior: 'instant' });
        element?.focus({ preventScroll: true });
      },
      { injector: this.injector },
    );
  }
}
