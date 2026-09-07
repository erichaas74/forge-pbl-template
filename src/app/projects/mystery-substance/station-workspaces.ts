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
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { persistWorkspaceDraft } from '../../shared/drafts/persist-workspace-draft';

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
      <article class="restoration-console">
        <div class="restoration-heading">
          <span class="station-kicker">Constrained shelf assignment</span>
          <h1>Build the case for Vial {{ activeCode() }}.</h1>
        </div>

        <div class="specimen-row specimen-row--compact" aria-label="Choose a vial case">
          @for (vial of vials; track vial.vialId) {
            <button
              type="button"
              [class.active]="activeVialId() === vial.vialId"
              [style.--vial-color]="vial.color"
              (click)="selectVial(vial.vialId)"
            >
              <img [src]="vial.image" alt="" /><strong>{{ vial.code }}</strong
              ><small>{{ assignments()[vial.vialId] ? 'Drafted' : 'Open' }}</small>
            </button>
          }
        </div>

        <div class="mode-tabs">
          <button type="button" [class.active]="mode() === 'label'" (click)="mode.set('label')">
            1 · Label
          </button>
          <button
            type="button"
            [class.active]="mode() === 'position'"
            (click)="mode.set('position')"
          >
            2 · Position
          </button>
          <button
            type="button"
            [class.active]="mode() === 'decision'"
            (click)="mode.set('decision')"
          >
            3 · Handling
          </button>
          <button type="button" [class.active]="mode() === 'explain'" (click)="mode.set('explain')">
            4 · Evidence
          </button>
        </div>

        @if (mode() === 'label') {
          <div class="decision-grid">
            @for (label of labels; track label.id) {
              <button
                type="button"
                [class.selected]="activeAssignment().labelId === label.id"
                [disabled]="usedByOther(label.id)"
                (click)="setField('labelId', label.id)"
              >
                <strong>{{ label.title }}</strong
                ><small>{{
                  usedByOther(label.id) ? 'Used in another draft' : label.handling
                }}</small>
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
            >Evidence reasoning
            <textarea
              rows="5"
              [ngModel]="activeAssignment().reasoning ?? ''"
              (ngModelChange)="setField('reasoning', $event)"
              placeholder="The measured pattern supports or limits this draft because…"
            ></textarea>
          </label>
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
        }

        <button type="button" class="station-primary" (click)="saveCase()">
          Capture Vial {{ activeCode() }} case draft
        </button>
      </article>
    </section>
  `,
  styleUrl: './station-workspaces.scss',
})
export class RestorationWorkspaceComponent {
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
    persistWorkspaceDraft(
      'shelf-restoration',
      () => ({ assignments: this.assignments(), mode: this.mode(), vialId: this.activeVialId() }),
      (saved) => {
        if (saved.assignments && typeof saved.assignments === 'object')
          this.assignments.set(saved.assignments);
        if (['label', 'position', 'decision', 'explain'].includes(saved.mode))
          this.mode.set(saved.mode);
        if (this.vials.some((v) => v.vialId === saved.vialId)) this.activeVialId.set(saved.vialId);
      },
    );
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
    this.vialChanged.emit(id);
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

  numberValue(event: Event): number {
    return Number((event.target as HTMLInputElement).value);
  }

  saveCase(): void {
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
