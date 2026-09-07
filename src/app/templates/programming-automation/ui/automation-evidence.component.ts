import { Component, computed, inject, output, signal } from '@angular/core';
import { AutomationRuntimeService } from '../runtime/automation-runtime.service';
import type { RobotTrial } from '../domain/automation.models';
import { allCommands } from '../core/automation-compiler';
import { commandLabels } from './command-editor.component';
@Component({
  selector: 'app-automation-evidence',
  template: `
    <div class="tabs">
      <button [class.active]="view() === 'trials'" (click)="view.set('trials')">
        Trial history</button
      ><button [class.active]="view() === 'portfolio'" (click)="view.set('portfolio')">
        Engineering portfolio
      </button>
    </div>
    @if (view() === 'trials') {
      <div class="evidence-grid">
        <section>
          <h2>Test. Compare. Improve.</h2>
          <p>
            Every run keeps its own program and replay. Compare two trials to find what changed.
          </p>
          <div class="trial-list">
            @for (trial of runtime.currentTrials(); track trial.id; let i = $index) {
              <article>
                <div>
                  <strong
                    >Trial {{ i + 1 }} ·
                    {{ trial.completedMission ? 'Mission complete' : 'Keep testing' }}</strong
                  ><small
                    >v{{ trial.version.program.version }} · {{ trial.mode }} ·
                    {{ trial.elapsedSeconds.toFixed(1) }} s ·
                    {{ trial.stoppingErrorCm.toFixed(1) }} cm error</small
                  >
                </div>
                <button (click)="replay.emit(trial)">Replay trial {{ i + 1 }}</button>
              </article>
            } @empty {
              <p class="empty">Run your first program to start collecting evidence.</p>
            }
          </div>
          @if (runtime.currentTrials().length >= 2) {
            <h3>Compare two trials</h3>
            <div class="compare-select">
              @for (side of [0, 1]; track side) {
                <label
                  >Trial {{ side === 0 ? 'A' : 'B'
                  }}<select
                    [value]="comparison()[side]"
                    (change)="selectComparison(side, $any($event.target).value)"
                  >
                    @for (trial of runtime.currentTrials(); track trial.id; let i = $index) {
                      <option [value]="trial.id" [selected]="trial.id === comparison()[side]">
                        Trial {{ i + 1 }} · v{{ trial.version.program.version }}
                      </option>
                    }
                  </select></label
                >
              }
            </div>
            <table>
              <thead>
                <tr>
                  <th>Measure</th>
                  <th>Trial A</th>
                  <th>Trial B</th>
                </tr>
              </thead>
              <tbody>
                @for (metric of metrics; track metric.key) {
                  <tr>
                    <th>{{ metric.label }}</th>
                    <td>{{ metricValue(compared()[0], metric.key) }}</td>
                    <td>{{ metricValue(compared()[1], metric.key) }}</td>
                  </tr>
                }
              </tbody>
            </table>
          }
        </section>
        <section>
          <h3>Debugging notebook</h3>
          <label
            >What happened? What will you change?<textarea
              rows="4"
              [value]="runtime.draft().diagnosis"
              (input)="runtime.updateDraft({ diagnosis: $any($event.target).value })"
              [disabled]="!runtime.canEdit()"
              placeholder="My robot stopped short because… Next I will…"
            ></textarea></label
          ><label
            >Use two trials to explain your improvement<textarea
              rows="4"
              [value]="runtime.draft().reflection"
              (input)="runtime.updateDraft({ reflection: $any($event.target).value })"
              [disabled]="!runtime.canEdit()"
              placeholder="In trial 1… In trial 2… The evidence shows…"
            ></textarea>
          </label>
          <details>
            <summary>Evidence needed to finish this mission</summary>
            <ul>
              @for (problem of runtime.readiness(); track problem) {
                <li>{{ problem }}</li>
              } @empty {
                <li>All evidence is ready.</li>
              }
            </ul>
          </details>
          <button
            class="primary"
            [disabled]="runtime.readiness().length > 0 || !runtime.canEdit()"
            (click)="runtime.completeChallenge()"
          >
            Save completed mission
          </button>
        </section>
      </div>
    } @else {
      <section class="portfolio">
        <div class="portfolio-heading">
          <div>
            <small>ENGINEERING PORTFOLIO</small>
            <h2>{{ runtime.session.actorDisplayName }} · {{ runtime.config.title }}</h2>
            <p>Collected from your calculations, programs, tests, and explanations.</p>
          </div>
          <button (click)="download()">Download portfolio</button>
        </div>
        <div class="evidence-grid">
          <section>
            <h3>Individual math evidence</h3>
            <ul class="mastery">
              @for (skill of runtime.mastery(); track skill.title) {
                <li>
                  {{ skill.achieved ? '✓' : '○' }} {{ skill.title }}
                  <small>{{ skill.achieved ? 'Evidence recorded' : 'Evidence needed' }}</small>
                </li>
              }
            </ul>
            <p>
              Competition scores describe robot performance. Your explanations and mathematical
              reasoning are assessed separately.
            </p>
            <h3>Calibration</h3>
            <p>
              Distance per rotation:
              {{ runtime.state().measuredDistancePerRotation || 'Not recorded' }} cm. Turn rate:
              {{ runtime.state().measuredTurnRate || 'Not recorded' }} °/s.
            </p>
            <p>
              {{
                runtime.state().measurementExplanation ||
                  'Add a comparison of your calculated and measured values in the calibration notebook.'
              }}
            </p>
          </section>
          <section>
            <h3>Current program · v{{ runtime.draft().program.version }}</h3>
            <ol>
              @for (command of flatProgram(); track command.id) {
                <li>
                  {{ labels[command.type] }} {{ command.value }} {{ command.packageId ?? '' }}
                  {{ command.disabled ? '(disabled)' : '' }}
                </li>
              }
            </ol>
            <h3>Testing evidence</h3>
            <p>
              {{ runtime.state().trials.length }} saved trials ·
              {{ runtime.state().math.length }} calculations ·
              {{ runtime.state().versions.length }} locked versions.
            </p>
            <p>
              {{ runtime.draft().reflection || 'Add your debugging reflection in Trial history.' }}
            </p>
            <h3>Engineering defense</h3>
            <label
              >How does your evidence support your final design?<textarea
                rows="5"
                [value]="runtime.state().defense"
                (input)="runtime.updateCalibration('defense', $any($event.target).value)"
                [disabled]="runtime.sample"
                placeholder="Explain your measurements, code decisions, improvements, and remaining uncertainty."
              ></textarea>
            </label>
          </section>
        </div>
        <details>
          <summary>Calculation evidence</summary>
          @for (evidence of runtime.state().math; track evidence.id) {
            <p>
              <strong>{{ evidence.tool }}: {{ evidence.answer }} {{ evidence.unit }}</strong> ·
              {{ evidence.status }}<br />{{ evidence.explanation }}
            </p>
          }
        </details>
      </section>
    }
  `,
  styleUrl: './automation-panels.css',
})
export class AutomationEvidenceComponent {
  readonly runtime = inject(AutomationRuntimeService);
  readonly replay = output<RobotTrial>();
  readonly view = signal<'trials' | 'portfolio'>('trials');
  readonly selected = signal<string[]>([]);
  readonly labels = commandLabels;
  readonly flatProgram = computed(() => allCommands(this.runtime.draft().program.commands));
  readonly comparison = computed(() => {
    const all = this.runtime.currentTrials();
    const practice = all.filter((trial) => trial.mode === 'practice');
    const trials = practice.length >= 2 ? practice : all;
    return [
      this.selected()[0] ?? trials.at(-2)?.id ?? '',
      this.selected()[1] ?? trials.at(-1)?.id ?? '',
    ];
  });
  readonly compared = computed(() =>
    this.comparison().map((id) => this.runtime.currentTrials().find((trial) => trial.id === id)),
  );
  readonly metrics = [
    { key: 'elapsedSeconds', label: 'Time (s)' },
    { key: 'distanceCm', label: 'Distance (cm)' },
    { key: 'stoppingErrorCm', label: 'Parking error (cm)' },
    { key: 'collisions', label: 'Collisions' },
    { key: 'deliveriesCompleted', label: 'Deliveries' },
    { key: 'batteryUsed', label: 'Battery used' },
    { key: 'score', label: 'Performance / 100' },
  ] as const;
  selectComparison(side: number, id: string): void {
    const ids = [...this.comparison()];
    ids[side] = id;
    this.selected.set(ids);
  }
  metricValue(trial: RobotTrial | undefined, key: (typeof this.metrics)[number]['key']): string {
    return trial ? trial[key].toFixed(1) : '—';
  }
  download(): void {
    const payload = {
      title: this.runtime.config.title,
      student: this.runtime.session.actorDisplayName,
      exportedAt: new Date().toISOString(),
      mastery: this.runtime.mastery(),
      ...this.runtime.state(),
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${this.runtime.config.projectId}-portfolio.json`;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
}
