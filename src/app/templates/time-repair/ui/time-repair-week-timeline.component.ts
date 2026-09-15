import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RepairPreviewRuntime } from '../runtime/time-repair-preview.runtime';
import { RepairWeekSourceComponent } from './time-repair-week-source.component';

@Component({
  selector: 'app-repair-timeline-workbench',
  imports: [RepairWeekSourceComponent],
  template: `<div class="timeline-workbench">
    <section aria-label="Editable event sequence">
      <div class="toolbar">
        <h3>
          {{ r.session().mode === 'sequence' ? 'Rebuild the sequence' : 'Attach the evidence' }}
        </h3>
        @if (r.session().mode === 'sequence') {
          <button class="primary" (click)="r.checkSequence()">Check date order</button>
        }
      </div>
      <p class="feedback" role="status">{{ r.message() }}</p>
      <ol class="event-list">
        @for (node of nodes(); track node.id; let i = $index) {
          <li>
            <span class="event-number">{{ i + 1 }}</span>
            <div class="event-copy">
              <span class="eyebrow">{{ node.dateLabel }}</span>
              <h3>{{ node.title }}</h3>
              <p>{{ node.summary }}</p>
              @if (r.session().mode === 'sequence') {
                <div class="button-row">
                  <button
                    [disabled]="i === 0"
                    [attr.aria-label]="'Move ' + node.title + ' earlier'"
                    (click)="r.moveNode(i, -1)"
                  >
                    ↑ Earlier</button
                  ><button
                    [disabled]="i === nodes().length - 1"
                    [attr.aria-label]="'Move ' + node.title + ' later'"
                    (click)="r.moveNode(i, 1)"
                  >
                    ↓ Later
                  </button>
                </div>
              } @else {
                <label
                  >Source for this event<select
                    [attr.aria-label]="'Source for ' + node.title"
                    [value]="r.draft().links[node.id] || ''"
                    (change)="r.link(node.id, $any($event.target).value)"
                  >
                    <option value="">No source attached</option>
                    @for (e of sources(); track e.id) {
                      <option [value]="e.id">{{ e.title }}</option>
                    }
                  </select></label
                >
              }
            </div>
          </li>
        }
      </ol>
    </section>
    <aside class="field-notes">
      <img class="archive-art" [src]="r.illustration().src" [alt]="r.illustration().alt" />
      <p class="art-note">{{ r.illustration().caption }}</p>
      <h3>Read before you connect</h3>
      <p>Choose a source to see what it supports and where it stops.</p>
      <div class="source-buttons">
        @for (e of sources(); track e.id) {
          <button [attr.aria-pressed]="r.sourceId() === e.id" (click)="r.sourceId.set(e.id)">
            {{ e.title }} ↗
          </button>
        }
      </div>
      <app-repair-week-source [source]="r.selectedSource()" />
    </aside>
  </div>`,
  styleUrl: './time-repair-week-activity.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RepairTimelineWorkbenchComponent {
  readonly r = inject(RepairPreviewRuntime);
  readonly nodes = computed(() =>
    this.r.draft().nodeIds.map((id) => this.r.config.nodes.find((n) => n.id === id)!),
  );
  readonly sources = computed(() =>
    this.r.config.evidence.filter((e) => this.r.session().evidenceIds.includes(e.id)),
  );
}
