import { Component, inject, output, signal } from '@angular/core';
import { AutomationRuntimeService } from '../runtime/automation-runtime.service';
import type { RobotTrial } from '../domain/automation.models';
@Component({
  selector: 'app-championship-panel',
  template: `
    <h2>Robot Command Championship</h2>
    <p class="note">
      Local classroom rehearsal · practice the lock, launch, and review process on this device.
      Results here are practice results, separate from a shared classroom competition.
    </p>
    @if (runtime.canControl()) {
      <details open>
        <summary>Teacher rehearsal controls</summary>
        <div class="settings">
          <label
            ><input
              type="checkbox"
              [checked]="runtime.state().championship.revealed"
              (change)="runtime.control({ revealed: $any($event.target).checked })"
              [disabled]="runtime.state().championship.finalized"
            />Reveal course</label
          ><label
            ><input
              type="checkbox"
              [checked]="runtime.state().championship.practiceOpen"
              (change)="runtime.control({ practiceOpen: $any($event.target).checked })"
              [disabled]="runtime.state().championship.finalized"
            />Practice open</label
          ><label
            >Practice limit (0 = unlimited)<input
              type="number"
              min="0"
              max="100"
              [value]="runtime.state().championship.practiceLimit"
              (change)="limit($any($event.target).value)"
              [disabled]="runtime.state().championship.finalized" /></label
          ><label
            ><input
              type="checkbox"
              [checked]="runtime.state().championship.showStandings"
              (change)="runtime.control({ showStandings: $any($event.target).checked })"
            />Show standings</label
          >
        </div>
        <div class="actions">
          <button
            (click)="runtime.control({ paused: !runtime.state().championship.paused })"
            [disabled]="runtime.state().championship.finalized"
          >
            {{ runtime.state().championship.paused ? 'Resume queue' : 'Pause queue' }}</button
          ><button
            (click)="launch()"
            [disabled]="
              runtime.state().championship.paused || runtime.state().championship.finalized
            "
          >
            Launch next locked program</button
          ><button
            (click)="finalizeDialog.showModal()"
            [disabled]="runtime.state().championship.finalized || !runtime.standings().length"
          >
            Finalize rehearsal
          </button>
        </div>
      </details>
    }
    @if (runtime.state().championship.revealed) {
      <button
        class="primary"
        (click)="runtime.selectChallenge(runtime.config.championshipChallengeId); selected.emit()"
      >
        Open championship course
      </button>
    } @else {
      <p>The championship course is hidden until reveal.</p>
    }
    @if (runtime.isChampionship()) {
      <div class="evidence-grid">
        <section>
          <h3>Your predictions</h3>
          <label
            >Planned route<textarea
              rows="3"
              [value]="runtime.draft().prediction.route"
              (input)="runtime.updatePrediction('route', $any($event.target).value)"
              [disabled]="!runtime.canEdit()"
            ></textarea>
          </label>
          <div class="settings">
            @for (field of predictionFields; track field.key) {
              <label
                >{{ field.label
                }}<input
                  type="number"
                  min="0"
                  [value]="runtime.draft().prediction[field.key]"
                  (input)="runtime.updatePrediction(field.key, $any($event.target).value)"
                  [disabled]="!runtime.canEdit()"
              /></label>
            }
          </div>
        </section>
        <section>
          <h3>Lock your final program</h3>
          <p>
            Locking saves the exact code, calculations, predictions, and course for your
            championship run.
          </p>
          @if (runtime.draft().lockedVersionId) {
            <p><strong>✓ Version locked and queued.</strong></p>
          } @else {
            <ul>
              @for (problem of runtime.readiness(); track problem) {
                <li>{{ problem }}</li>
              } @empty {
                <li>Your evidence is ready to lock.</li>
              }
            </ul>
            <button
              class="primary"
              [disabled]="
                runtime.sample ||
                runtime.readiness().length > 0 ||
                runtime.state().championship.finalized
              "
              (click)="lockDialog.showModal()"
            >
              Review & lock program
            </button>
          }
        </section>
      </div>
    }
    <h3>
      Launch queue ·
      {{
        runtime.state().championship.finalized
          ? 'Finalized'
          : runtime.state().championship.paused
            ? 'Paused'
            : 'Ready'
      }}
    </h3>
    <ol>
      @for (id of runtime.state().championship.queue; track id) {
        <li>{{ owner(id) }} · {{ status(id) }}</li>
      } @empty {
        <li>No programs locked yet.</li>
      }
    </ol>
    @if (runtime.state().championship.showStandings) {
      <h3>Rehearsal standings</h3>
      <table>
        <thead>
          <tr>
            <th>Place</th>
            <th>Engineer</th>
            <th>Performance</th>
            <th>Time</th>
            <th>Review</th>
          </tr>
        </thead>
        <tbody>
          @for (trial of runtime.standings(); track trial.id; let i = $index) {
            <tr>
              <td>{{ i + 1 }}</td>
              <td>{{ trial.version.ownerName }}</td>
              <td>{{ trial.score.toFixed(1) }} / 100</td>
              <td>{{ trial.elapsedSeconds.toFixed(1) }} s</td>
              <td><button (click)="replay.emit(trial)">Replay</button></td>
            </tr>
          } @empty {
            <tr>
              <td colspan="5">Launch a locked program to record a result.</td>
            </tr>
          }
        </tbody>
      </table>
      <p>
        Performance: delivery 35 · navigation 20 · efficiency 20 · reliability 15 · prediction 10.
        Academic assessment uses the portfolio.
      </p>
    }
    @if (runtime.canControl()) {
      <details>
        <summary>Unlock or record a technical rerun</summary>
        <p>
          Original versions and results stay in the history. A technical rerun excludes the original
          result from standings and queues that same program again.
        </p>
        <label
          >Reason<input
            placeholder="Describe what happened (at least 8 characters)"
            [value]="reason()"
            (input)="reason.set($any($event.target).value)"
        /></label>
        <div class="actions">
          @if (runtime.draft().lockedVersionId; as versionId) {
            <button
              [disabled]="reason().trim().length < 8 || runtime.state().championship.finalized"
              (click)="runtime.unlock(versionId, reason()); reason.set('')"
            >
              Unlock current version
            </button>
          }
          @for (trial of runtime.standings(); track trial.id) {
            <button
              [disabled]="reason().trim().length < 8 || runtime.state().championship.finalized"
              (click)="runtime.technicalRerun(trial.id, reason()); reason.set('')"
            >
              Technical rerun · {{ trial.version.ownerName }}
            </button>
          }
        </div>
      </details>
      <details>
        <summary>Rehearsal audit history ({{ runtime.state().audit.length }})</summary>
        @for (event of runtime.state().audit; track event.id) {
          <p>
            <strong>{{ event.action }}</strong> · {{ event.reason }}
          </p>
        }
      </details>
    }
    <dialog #lockDialog>
      <h2>Lock version {{ runtime.draft().program.version }}?</h2>
      <p>
        Your code and evidence will become read-only. Your teacher can unlock the program with a
        recorded reason.
      </p>
      <p>
        {{ runtime.draft().program.commands.length }} top-level commands ·
        {{ runtime.state().math.length }} calculations.
      </p>
      <div class="actions">
        <button (click)="lockDialog.close()">Keep editing</button
        ><button (click)="runtime.lockProgram(); lockDialog.close()">Confirm lock</button>
      </div>
    </dialog>
    <dialog #finalizeDialog>
      <h2>Finalize these rehearsal results?</h2>
      <p>This closes launches, practice, and unlocks for this rehearsal.</p>
      <div class="actions">
        <button (click)="finalizeDialog.close()">Keep rehearsal open</button
        ><button
          (click)="
            runtime.control({ finalized: true, practiceOpen: false, paused: true });
            finalizeDialog.close()
          "
        >
          Confirm final results
        </button>
      </div>
    </dialog>
  `,
  styleUrl: './automation-panels.css',
})
export class ChampionshipPanelComponent {
  readonly runtime = inject(AutomationRuntimeService);
  readonly replay = output<RobotTrial>();
  readonly selected = output<void>();
  readonly reason = signal('');
  readonly predictionFields = [
    { key: 'distance', label: 'Distance (cm)' },
    { key: 'turns', label: 'Total turn (°)' },
    { key: 'seconds', label: 'Time (s)' },
    { key: 'battery', label: 'Battery used' },
  ] as const;
  limit(value: string): void {
    const limit = Number(value);
    if (Number.isInteger(limit) && limit >= 0 && limit <= 100)
      this.runtime.control({ practiceLimit: limit });
  }
  launch(): void {
    const trial = this.runtime.launchNext();
    if (trial) this.replay.emit(trial);
  }
  owner(id: string): string {
    const version = this.runtime.state().versions.find((v) => v.id === id);
    return version
      ? `${version.ownerName} · program v${version.program.version}`
      : 'Version unavailable';
  }
  status(id: string): string {
    return this.runtime
      .state()
      .trials.some(
        (t) => t.version.id === id && t.mode === 'championship' && !t.technicalInvalidReason,
      )
      ? 'Run recorded'
      : 'Waiting to launch';
  }
}
