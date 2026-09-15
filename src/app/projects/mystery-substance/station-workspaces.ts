import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  signal,
  input,
  effect,
  untracked,
  inject,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { persistWorkspaceDraft } from '../../shared/drafts/persist-workspace-draft';
import { LAB_AUTHORING_PREVIEW } from './lab-week.models';

import { handlingRecommendations, recoveredLabels, shelfZones } from './mystery-science.config';
import { mysteryEvidenceFiles, mysteryVials } from './mystery-substance.package';

export interface StationCapture {
  activityId: string;
  evidenceId: string;
  result: Record<string, unknown>;
  note?: string;
}

@Component({
  selector: 'app-evidence-workspace',
  imports: [CommonModule],
  template: `
    <section class="station-canvas evidence-workspace">
      <div
        class="atlas atlas--evidence"
        role="img"
        aria-label="Chain-of-evidence laboratory board"
      ></div>
      <div class="station-shade"></div>
      @if (activeId(); as id) {
        @if (evidence(id); as item) {
          <article class="evidence-inspector">
            <button type="button" class="back-button" (click)="activeId.set(undefined)">
              ← Case files
            </button>
            <figure><img [src]="item.asset" [alt]="item.title" /></figure>
            <span class="station-kicker">{{ item.type }} · recovered record</span>
            <h1>{{ item.title }}</h1>
            <p>{{ item.text }}</p>
            <div class="inspector-actions">
              <a [href]="item.file" target="_blank" rel="noopener">Open raw file ↗</a>
              <button type="button" class="station-primary" (click)="save(item.id)">
                Capture this record
              </button>
            </div>
          </article>
        }
      } @else {
        <div class="station-intro">
          <span class="station-kicker">Evidence Locker · ten recovered records</span>
          <h1>Choose one case file to inspect.</h1>
          <p>
            Compare direct observations, measurements, references, and recollections without
            deciding the answer yet.
          </p>
        </div>
        <div class="evidence-filmstrip" aria-label="Recovered case files">
          @for (item of evidenceFiles; track item.id) {
            <button type="button" (click)="activeId.set(item.id)">
              <img [src]="item.asset" alt="" />
              <span
                ><small>{{ item.type }}</small
                ><strong>{{ item.title }}</strong></span
              >
            </button>
          }
        </div>
      }
    </section>
  `,
  styleUrl: './station-workspaces.scss',
})
export class EvidenceWorkspaceComponent {
  @Output() readonly captured = new EventEmitter<string>();
  readonly evidenceFiles = mysteryEvidenceFiles;
  readonly activeId = signal<string | undefined>(undefined);

  evidence(id: string) {
    return this.evidenceFiles.find((item) => item.id === id);
  }

  save(id: string): void {
    this.captured.emit(id);
  }
}

@Component({
  selector: 'app-restoration-workspace',
  host: { '[class.lab-preview]': 'preview' },
  imports: [CommonModule, FormsModule],
  template: `
    <section class="station-canvas restoration-workspace">
      <div
        class="atlas atlas--week4"
        [style.background-position]="
          mode() === 'label' ? 'left top' : mode() === 'position' ? 'right top' : 'left bottom'
        "
        role="img"
        aria-label="Professional shelf restoration investigation bench"
      ></div>
      <div class="station-shade"></div>
      <div class="restoration-stage">
        <figure class="focus-specimen">
          <img [src]="activeVial().image" [alt]="'Vial ' + activeCode() + ' for identification'" />
          <figcaption>
            <select
              aria-label="Choose a vial case"
              [value]="activeVialId()"
              (change)="selectVial($any($event.target).value)"
            >
              @for (vial of vials; track vial.vialId) {
                <option [value]="vial.vialId" [selected]="activeVialId() === vial.vialId">Vial {{ vial.code }}</option>
              }
            </select>
          </figcaption>
        </figure>
        <article class="restoration-console">
          @if (preview) {
            <h1>Build the shelf plan</h1>
            <p>Editable local product · no submission or assessment</p>
            <label>Label
              <select aria-label="Shelf label" [value]="activeAssignment().labelId ?? ''" (change)="setField('labelId', $any($event.target).value)">
                <option value="" [selected]="!activeAssignment().labelId">Unlabelled</option>
                @for (label of labels; track label.id) { <option [value]="label.id" [selected]="activeAssignment().labelId === label.id" [disabled]="usedByOther(label.id)">{{ label.title }}</option> }
              </select>
            </label>
            <label>Shelf position
              <select aria-label="Shelf position" [value]="activeAssignment().zoneId ?? ''" (change)="setField('zoneId', $any($event.target).value)">
                <option value="" [selected]="!activeAssignment().zoneId">Unassigned</option>
                @for (zone of zones; track zone.id) { <option [value]="zone.id" [selected]="activeAssignment().zoneId === zone.id">{{ zone.title }}</option> }
              </select>
            </label>
            <label>Handling plan
              <select aria-label="Handling plan" [value]="activeAssignment().recommendationId ?? ''" (change)="setField('recommendationId', $any($event.target).value)">
                <option value="" [selected]="!activeAssignment().recommendationId">Undecided</option>
                @for (item of recommendations; track item.id) { <option [value]="item.id" [selected]="activeAssignment().recommendationId === item.id">{{ item.title }}</option> }
              </select>
            </label>
            <button type="button" class="back-button" (click)="clearAssignment()">Clear this vial's plan</button>
            <div class="shelf-plan" aria-label="Current shelf plan">
              @for (vial of vials; track vial.vialId) {
                <button type="button" [attr.aria-pressed]="activeVialId() === vial.vialId" (click)="selectVial(vial.vialId)">
                  <strong>Vial {{ vial.code }}</strong>
                  <span>{{ assignmentTitle(vial.vialId, 'labelId') }}</span>
                  <small>{{ assignmentTitle(vial.vialId, 'zoneId') }} · {{ assignmentTitle(vial.vialId, 'recommendationId') }}</small>
                </button>
              }
            </div>
          } @else {
          <h1 tabindex="-1" #question>{{ questionText() }}</h1>
          @if (mode() === 'label') {
            <div class="decision-grid">
              @for (label of labels; track label.id) {
                <button
                  type="button"
                  [class.selected]="activeAssignment().labelId === label.id"
                  [disabled]="usedByOther(label.id)"
                  (click)="setField('labelId', label.id)"
                >
                  <strong>{{ label.title }}</strong>
                  @if (usedByOther(label.id)) {
                    <small>Already assigned</small>
                  }
                </button>
              }
            </div>
          } @else if (mode() === 'position') {
            <div class="decision-grid">
              @for (zone of zones; track zone.id) {
                <button
                  type="button"
                  [class.selected]="activeAssignment().zoneId === zone.id"
                  (click)="setField('zoneId', zone.id)"
                >
                  <strong>{{ zone.title }}</strong
                  ><small>{{ zone.note }}</small>
                </button>
              }
            </div>
          } @else if (mode() === 'decision') {
            <div class="decision-grid">
              @for (recommendation of recommendations; track recommendation.id) {
                <button
                  type="button"
                  [class.selected]="activeAssignment().recommendationId === recommendation.id"
                  (click)="setField('recommendationId', recommendation.id)"
                >
                  <strong>{{ recommendation.title }}</strong
                  ><small>{{ recommendation.note }}</small>
                </button>
              }
            </div>
          } @else {
            <label class="reasoning-field"
              >Which test supports your choice?
              <textarea
                rows="5"
                [ngModel]="activeAssignment().reasoning ?? ''"
                (ngModelChange)="setField('reasoning', $event)"
                placeholder="The measured pattern supports or limits this draft because…"
              ></textarea>
            </label>
            <details class="confidence-details">
              <summary>How sure are you?</summary>
              <label class="confidence-field"
                >Evidence confidence
                <strong>{{ activeAssignment().confidence ?? 50 }}%</strong>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="10"
                  [value]="activeAssignment().confidence ?? 50"
                  (input)="setField('confidence', numberValue($event))"
                />
              </label>
            </details>
          }
          <div class="decision-actions">
            @if (mode() !== 'label') {
              <button type="button" class="back-button" (click)="previous(); question.focus()">
                ← Back
              </button>
            }
            @if (mode() === 'explain') {
              <button
                type="button"
                class="station-primary"
                [disabled]="!canContinue()"
                (click)="saveCase()"
              >
                Save case draft
              </button>
            } @else {
              <button
                type="button"
                class="station-primary"
                [disabled]="!canContinue()"
                (click)="next(); question.focus()"
              >
                Continue →
              </button>
            }
          </div>
          }
        </article>
      </div>
    </section>
  `,
  styleUrl: './station-workspaces.scss',
})
export class RestorationWorkspaceComponent {
  readonly preview = inject(LAB_AUTHORING_PREVIEW);
  @Output() readonly captured = new EventEmitter<StationCapture>();
  @Output() readonly vialChanged = new EventEmitter<string>();
  readonly selectedVialId = input<string>();
  readonly vials = mysteryVials;
  readonly labels = recoveredLabels;
  readonly zones = shelfZones;
  readonly recommendations = handlingRecommendations;
  readonly activeVialId = signal('vial-a');
  readonly mode = signal<'label' | 'position' | 'decision' | 'explain'>('label');
  readonly assignments = signal<
    Record<
      string,
      {
        labelId?: string;
        zoneId?: string;
        recommendationId?: string;
        reasoning?: string;
        confidence?: number;
      }
    >
  >({});

  constructor() {
    let restored = false;
    persistWorkspaceDraft(
      'shelf-restoration',
      () => ({ assignments: this.assignments(), mode: this.mode(), vialId: this.activeVialId() }),
      (saved) => {
        restored = true;
        if (saved.assignments && typeof saved.assignments === 'object')
          this.assignments.set(saved.assignments);
        if (['label', 'position', 'decision', 'explain'].includes(saved.mode))
          this.mode.set(saved.mode);
        if (this.vials.some((v) => v.vialId === saved.vialId)) this.activeVialId.set(saved.vialId);
      },
    );
    if (this.preview && !restored) {
      this.assignments.set({ 'vial-a': { zoneId: this.zones[0].id } });
    }
    effect(() => {
      const id = this.selectedVialId();
      untracked(() => {
        if (id && id !== this.activeVialId()) this.selectVial(id);
      });
    });
  }

  selectVial(id: string): void {
    if (!this.vials.some((v) => v.vialId === id)) return;
    this.activeVialId.set(id);
    this.mode.set('label');
    this.vialChanged.emit(id);
  }

  readonly steps = ['label', 'position', 'decision', 'explain'] as const;

  activeVial() {
    return this.vials.find((vial) => vial.vialId === this.activeVialId()) ?? this.vials[0];
  }
  questionText(): string {
    switch (this.mode()) {
      case 'label':
        return `Which label fits Vial ${this.activeCode()}?`;
      case 'position':
        return 'Where does it belong?';
      case 'decision':
        return 'How should it be handled?';
      case 'explain':
        return 'What is your evidence?';
    }
  }
  canContinue(): boolean {
    const assignment = this.activeAssignment();
    switch (this.mode()) {
      case 'label':
        return !!assignment.labelId;
      case 'position':
        return !!assignment.zoneId;
      case 'decision':
        return !!assignment.recommendationId;
      case 'explain':
        return !!(
          assignment.labelId &&
          assignment.zoneId &&
          assignment.recommendationId &&
          assignment.reasoning?.trim()
        );
    }
  }
  next(): void {
    if (this.canContinue())
      this.mode.set(this.steps[Math.min(3, this.steps.indexOf(this.mode()) + 1)]);
  }
  previous(): void {
    this.mode.set(this.steps[Math.max(0, this.steps.indexOf(this.mode()) - 1)]);
  }

  activeCode(): string {
    return this.vials.find((vial) => vial.vialId === this.activeVialId())?.code ?? '?';
  }

  activeAssignment() {
    return this.assignments()[this.activeVialId()] ?? { confidence: 50 };
  }

  usedByOther(labelId: string): boolean {
    return Object.entries(this.assignments()).some(
      ([vialId, assignment]) => vialId !== this.activeVialId() && assignment.labelId === labelId,
    );
  }

  setField(field: string, value: unknown): void {
    const vialId = this.activeVialId();
    this.assignments.update((current) => ({
      ...current,
      [vialId]: { ...(current[vialId] ?? { confidence: 50 }), [field]: value },
    }));
  }

  clearAssignment(): void {
    this.assignments.update(current => ({ ...current, [this.activeVialId()]: {} }));
  }

  assignmentTitle(vialId: string, field: 'labelId' | 'zoneId' | 'recommendationId'): string {
    const id = this.assignments()[vialId]?.[field];
    const options = field === 'labelId' ? this.labels : field === 'zoneId' ? this.zones : this.recommendations;
    return options.find(option => option.id === id)?.title ?? 'Unassigned';
  }

  numberValue(event: Event): number {
    return Number((event.target as HTMLInputElement).value);
  }

  saveCase(): void {
    if (!this.canContinue() || this.mode() !== 'explain') return;
    const assignment = this.activeAssignment() ?? { confidence: 50 };
    this.captured.emit({
      activityId: 'activity-shelf-restoration',
      evidenceId: 'evidence-shelf-case',
      result: { vialId: this.activeVialId(), ...assignment },
      note: assignment.reasoning,
    });
  }
}

@Component({
  selector: 'app-showcase-workspace',
  imports: [CommonModule, FormsModule],
  template: `
    <section class="station-canvas showcase-workspace">
      <div
        class="atlas atlas--showcase"
        role="img"
        aria-label="Professional chain-of-evidence presentation board"
      ></div>
      <div class="station-shade"></div>
      <article class="showcase-console">
        <span class="station-kicker">Versioned performance artifact · case-file showcase</span>
        <h1>Defend the restored shelf.</h1>
        <p>Choose the evidence your audience should inspect, then connect it to the claim.</p>

        <div class="showcase-evidence" aria-label="Evidence picker">
          @for (item of evidenceFiles; track item.id) {
            <button
              type="button"
              [class.selected]="selectedEvidence().includes(item.id)"
              (click)="toggleEvidence(item.id)"
            >
              {{ item.title }}
            </button>
          }
        </div>

        <label
          >Claim
          <textarea
            rows="2"
            [(ngModel)]="claim"
            placeholder="Our shelf restoration identifies…"
          ></textarea>
        </label>
        <label
          >Scientific reasoning
          <textarea
            rows="4"
            [(ngModel)]="reasoning"
            placeholder="The evidence pattern supports the claim because…"
          ></textarea>
        </label>

        <div class="showcase-footer">
          <span
            >Draft version {{ version() }} · {{ selectedEvidence().length }} evidence records
            selected</span
          ><button type="button" class="station-primary" (click)="saveVersion()">
            Save case-file version
          </button>
        </div>
      </article>
    </section>
  `,
  styleUrl: './station-workspaces.scss',
})
export class ShowcaseWorkspaceComponent implements OnInit {
  @Output() readonly captured = new EventEmitter<StationCapture>();
  @Input() initialVersion = 1;
  readonly evidenceFiles = mysteryEvidenceFiles;
  readonly selectedEvidence = signal<string[]>([]);
  readonly version = signal(1);
  claim = '';
  reasoning = '';

  ngOnInit(): void {
    this.version.set(this.initialVersion);
  }

  toggleEvidence(id: string): void {
    this.selectedEvidence.update((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
  }

  saveVersion(): void {
    this.captured.emit({
      activityId: 'activity-case-showcase',
      evidenceId: 'evidence-final-case-file',
      result: {
        version: this.version(),
        claim: this.claim,
        reasoning: this.reasoning,
        evidenceIds: this.selectedEvidence(),
      },
      note: this.reasoning,
    });
    this.version.update((value) => value + 1);
  }
}

function delay(milliseconds: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}
