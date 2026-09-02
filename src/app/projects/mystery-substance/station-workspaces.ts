import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { DeterministicSimulationAdapter } from '../../templates/investigation/simulation/deterministic-simulation.adapter';
import {
  conservationTrials,
  handlingRecommendations,
  physicalOutcomeTable,
  physicalTests,
  reactionOutcomeTable,
  reactionTests,
  recoveredLabels,
  shelfZones,
} from './mystery-science.config';
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
  selector: 'app-properties-workspace',
  imports: [CommonModule],
  template: `
    <section class="station-canvas lab-workspace">
      <div
        class="atlas atlas--week2"
        [style.background-position]="activeTest().scenePosition"
        role="img"
        [attr.aria-label]="activeTest().title + ' apparatus'"
      ></div>
      <div class="station-shade"></div>
      <div class="instrument-tabs" aria-label="Physical property instruments">
        @for (test of tests; track test.id) {
          <button
            type="button"
            [class.active]="activeTest().id === test.id"
            (click)="chooseTest(test.id)"
          >
            <small>{{ test.instrument }}</small
            ><strong>{{ test.title }}</strong>
          </button>
        }
      </div>

      <article class="lab-console">
        <span class="station-kicker">Controlled comparison · {{ activeTest().instrument }}</span>
        <h1>{{ activeTest().title }}</h1>
        <p>{{ activeTest().prompt }}</p>

        <div class="specimen-row" aria-label="Choose a mystery vial">
          @for (vial of vials; track vial.vialId) {
            <button
              type="button"
              [class.active]="selectedVialId() === vial.vialId"
              [style.--vial-color]="vial.color"
              (click)="selectedVialId.set(vial.vialId)"
            >
              <img [src]="vial.image" alt="" /><strong>{{ vial.code }}</strong
              ><small>{{ trialCount(vial.vialId) }} trials</small>
            </button>
          }
        </div>

        @if (result(); as output) {
          <div class="raw-readout" aria-live="polite">
            <span>Raw instrument record</span>
            @for (entry of entries(output); track entry[0]) {
              <div>
                <small>{{ label(entry[0]) }}</small
                ><strong>{{ entry[1] }}</strong>
              </div>
            }
          </div>
        } @else {
          <div class="empty-readout">
            <span></span><b>Load one vial under equal conditions.</b
            ><small
              >The instrument will display observations and measurements—not an identity.</small
            >
          </div>
        }

        <button type="button" class="station-primary" [disabled]="running()" (click)="runTrial()">
          {{ running() ? 'Instrument running…' : 'Run equal-condition test' }}
        </button>
      </article>
    </section>
  `,
  styleUrl: './station-workspaces.scss',
})
export class PropertiesWorkspaceComponent {
  @Output() readonly captured = new EventEmitter<StationCapture>();
  readonly vials = mysteryVials;
  readonly tests = physicalTests;
  readonly selectedVialId = signal('vial-a');
  readonly selectedTestId = signal<(typeof physicalTests)[number]['id']>('appearance');
  readonly result = signal<Record<string, unknown> | undefined>(undefined);
  readonly running = signal(false);
  readonly trials = signal<Array<{ vialId: string; testId: string }>>([]);
  private readonly simulation = new DeterministicSimulationAdapter();

  constructor() {
    this.simulation.initialize({
      id: 'physical-property-comparison',
      settings: {
        keyFields: ['specimen', 'test'],
        outcomeTable: physicalOutcomeTable,
      },
    });
  }

  activeTest() {
    return this.tests.find((test) => test.id === this.selectedTestId()) ?? this.tests[0];
  }

  chooseTest(id: (typeof physicalTests)[number]['id']): void {
    this.selectedTestId.set(id);
    this.result.set(undefined);
  }

  trialCount(vialId: string): number {
    return this.trials().filter((trial) => trial.vialId === vialId).length;
  }

  async runTrial(): Promise<void> {
    this.running.set(true);
    const inputs = {
      specimen: this.selectedVialId(),
      test: this.selectedTestId(),
    };
    this.simulation.setInputs(inputs);
    this.simulation.beginTrial();
    await delay(700);
    const trial = this.simulation.endTrial();
    this.result.set(trial.outputs);
    this.trials.update((current) => [
      ...current,
      { vialId: this.selectedVialId(), testId: this.selectedTestId() },
    ]);
    this.running.set(false);
    this.captured.emit({
      activityId: 'activity-property-comparison',
      evidenceId: 'evidence-property-trials',
      result: { ...trial, trialNumber: this.trials().length },
    });
  }

  entries(value: Record<string, unknown>): Array<[string, string]> {
    return Object.entries(value).map(([key, item]) => [key, String(item)]);
  }

  label(value: string): string {
    return value.replace(/([A-Z])/g, ' $1').replace(/^./, (character) => character.toUpperCase());
  }
}

@Component({
  selector: 'app-reaction-workspace',
  imports: [CommonModule],
  template: `
    <section class="station-canvas reaction-workspace">
      <div
        class="atlas atlas--week3"
        [style.background-position]="activeTest().scenePosition"
        role="img"
        [attr.aria-label]="activeTest().title + ' reaction rig'"
      ></div>
      <div class="station-shade"></div>

      <div class="reaction-selector">
        @for (test of tests; track test.id) {
          <button
            type="button"
            [class.active]="activeTest().id === test.id"
            (click)="selectTest(test.id)"
          >
            <small>Reagent</small><strong>{{ test.title }}</strong>
          </button>
        }
      </div>

      <article class="reaction-console">
        <span class="station-kicker">Synchronized closed vessels · equal sample mass</span>
        <h1>Compare two vials.</h1>
        <p>{{ activeTest().prompt }}</p>

        <div class="beaker-pair">
          <label
            >Vessel 1
            <select [value]="leftVialId()" (change)="leftVialId.set(valueOf($event))">
              @for (vial of vials; track vial.vialId) {
                <option [value]="vial.vialId">Vial {{ vial.code }}</option>
              }
            </select>
          </label>
          <span aria-hidden="true">⇄</span>
          <label
            >Vessel 2
            <select [value]="rightVialId()" (change)="rightVialId.set(valueOf($event))">
              @for (vial of vials; track vial.vialId) {
                <option [value]="vial.vialId">Vial {{ vial.code }}</option>
              }
            </select>
          </label>
        </div>

        @if (results(); as pair) {
          <div class="comparison-readout" aria-live="polite">
            @for (side of pair; track side.vialId) {
              <section>
                <span>Vial {{ vialCode(side.vialId) }}</span>
                @for (entry of entries(side.output); track entry[0]) {
                  <div>
                    <small>{{ label(entry[0]) }}</small
                    ><strong>{{ entry[1] }}</strong>
                  </div>
                }
              </section>
            }
          </div>
        } @else {
          <div class="empty-readout">
            <span></span><b>Both vessels are ready.</b
            ><small>Run the reagent under equal conditions and compare the raw changes.</small>
          </div>
        }

        <button
          type="button"
          class="station-primary"
          [disabled]="running() || leftVialId() === rightVialId()"
          (click)="runTrial()"
        >
          {{
            running()
              ? 'Reaction timer running…'
              : leftVialId() === rightVialId()
                ? 'Choose two different vials'
                : 'Run synchronized test'
          }}
        </button>
      </article>
    </section>
  `,
  styleUrl: './station-workspaces.scss',
})
export class ReactionWorkspaceComponent {
  @Output() readonly captured = new EventEmitter<StationCapture>();
  readonly vials = mysteryVials;
  readonly tests = reactionTests;
  readonly selectedTestId = signal<(typeof reactionTests)[number]['id']>('solution-a');
  readonly leftVialId = signal('vial-a');
  readonly rightVialId = signal('vial-b');
  readonly results = signal<Array<{ vialId: string; output: Record<string, unknown> }> | undefined>(
    undefined,
  );
  readonly running = signal(false);
  private readonly simulation = new DeterministicSimulationAdapter();

  constructor() {
    this.simulation.initialize({
      id: 'chemical-reaction-comparison',
      settings: {
        keyFields: ['specimen', 'test'],
        outcomeTable: reactionOutcomeTable,
      },
    });
  }

  activeTest() {
    return this.tests.find((test) => test.id === this.selectedTestId()) ?? this.tests[0];
  }

  selectTest(id: (typeof reactionTests)[number]['id']): void {
    this.selectedTestId.set(id);
    this.results.set(undefined);
  }

  async runTrial(): Promise<void> {
    this.running.set(true);
    const pair: Array<{ vialId: string; output: Record<string, unknown> }> = [];
    for (const vialId of [this.leftVialId(), this.rightVialId()]) {
      this.simulation.setInputs({
        specimen: vialId,
        test: this.selectedTestId(),
      });
      this.simulation.beginTrial();
      const trial = this.simulation.endTrial();
      pair.push({ vialId, output: trial.outputs });
    }
    await delay(900);
    this.results.set(pair);
    this.running.set(false);
    this.captured.emit({
      activityId: 'activity-reaction-comparison',
      evidenceId: 'evidence-reaction-trials',
      result: { reagent: this.selectedTestId(), comparisons: pair },
    });
  }

  valueOf(event: Event): string {
    return (event.target as HTMLSelectElement).value;
  }

  vialCode(id: string): string {
    return this.vials.find((vial) => vial.vialId === id)?.code ?? '?';
  }

  entries(value: Record<string, unknown>): Array<[string, string]> {
    return Object.entries(value).map(([key, item]) => [key, String(item)]);
  }

  label(value: string): string {
    return value.replace(/([A-Z])/g, ' $1').replace(/^./, (character) => character.toUpperCase());
  }
}

@Component({
  selector: 'app-conservation-workspace',
  imports: [CommonModule],
  template: `
    <section class="station-canvas conservation-workspace">
      <div
        class="atlas atlas--conservation"
        [style.background-position]="
          selectedTrialId() === 'closed' ? 'left center' : 'right center'
        "
        role="img"
        aria-label="Professional particle-tracking chamber on a laboratory balance"
      ></div>
      <div class="station-shade"></div>
      <article class="conservation-console">
        <span class="station-kicker">Matter tracker · particle and mass record</span>
        <h1>Measure the system boundary.</h1>
        <p>
          Compare what the balance and particle tracker show when the chamber is sealed or open.
        </p>

        <div class="trial-toggle">
          @for (trial of trials; track trial.id) {
            <button
              type="button"
              [class.active]="selectedTrialId() === trial.id"
              (click)="selectTrial(trial.id)"
            >
              <strong>{{ trial.title }}</strong
              ><small>{{ trial.system }} system</small>
            </button>
          }
        </div>

        @if (result(); as trial) {
          <div class="mass-display" aria-live="polite">
            <div>
              <small>Before</small><strong>{{ trial.beforeMass.toFixed(1) }} g</strong
              ><span>{{ trial.beforeParticles }} tracked particles</span>
            </div>
            <span aria-hidden="true">→</span>
            <div>
              <small>After</small><strong>{{ trial.afterMass.toFixed(1) }} g</strong
              ><span>{{ trial.afterParticles }} tracked particles</span>
            </div>
          </div>
          <p class="raw-observation">Observed: {{ trial.observation }}</p>
        } @else {
          <div class="empty-readout">
            <span></span><b>The balance is zeroed.</b
            ><small>Run one system and record both mass readings.</small>
          </div>
        }

        <button type="button" class="station-primary" [disabled]="running()" (click)="runTrial()">
          {{ running() ? 'Tracking matter…' : 'Run mass-and-particle trial' }}
        </button>
      </article>
    </section>
  `,
  styleUrl: './station-workspaces.scss',
})
export class ConservationWorkspaceComponent {
  @Output() readonly captured = new EventEmitter<StationCapture>();
  readonly trials = conservationTrials;
  readonly selectedTrialId = signal<(typeof conservationTrials)[number]['id']>('closed');
  readonly result = signal<(typeof conservationTrials)[number] | undefined>(undefined);
  readonly running = signal(false);

  selectTrial(id: (typeof conservationTrials)[number]['id']): void {
    this.selectedTrialId.set(id);
    this.result.set(undefined);
  }

  async runTrial(): Promise<void> {
    this.running.set(true);
    await delay(850);
    const trial = this.trials.find((item) => item.id === this.selectedTrialId()) ?? this.trials[0];
    this.result.set(trial);
    this.running.set(false);
    this.captured.emit({
      activityId: 'activity-conservation-model',
      evidenceId: 'evidence-conservation-trials',
      result: { ...trial },
    });
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
              (click)="activeVialId.set(vial.vialId)"
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
