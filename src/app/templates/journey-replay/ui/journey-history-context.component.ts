import { Component, computed, input } from '@angular/core';
import type { JourneyHistoricalFrame } from '../domain/journey-replay.models';

@Component({
  selector: 'app-journey-history-context',
  template: `
    <section class="history-frame" aria-label="Fixed historical context">
      <span>{{ history().setting }}</span>
      <p>{{ history().agency }}</p>
      <details>
        <summary>History keeps its course · read the record</summary>
        <p>{{ history().witnessGuidance }}</p>
        <ol>
          @for (event of visibleEvents(); track event.id) {
            <li [attr.data-history-event]="event.id">
              <strong>{{ event.date }} · {{ event.title }}</strong>
              @if (event.period === 'epilogue') {
                <em>Later history · hindsight, not a witnessed scene</em>
              }
              <p>{{ event.summary }}</p>
              <a [href]="event.sourceUrl" target="_blank" rel="noopener noreferrer"
                >{{ event.sourceLabel }} ↗</a
              >
            </li>
          }
        </ol>
        @if (!includeEpilogue()) {
          <p class="epilogue-note">
            After your voyage, a hindsight epilogue shows how history continued. Your choices cannot
            change it.
          </p>
        }
      </details>
    </section>
  `,
  styles: `
    :host {
      display: block;
      min-width: 0;
    }
    .history-frame {
      border: 1px solid #a6ae96;
      border-radius: 5px;
      margin-bottom: 12px;
      padding: 11px;
      color: #30463b;
      background: #edf0dd;
      font:
        12px/1.55 system-ui,
        sans-serif;
      overflow-wrap: anywhere;
    }
    .history-frame > span {
      text-transform: uppercase;
      font-weight: 850;
      font-size: 10px;
      letter-spacing: 0.09em;
    }
    p {
      margin: 6px 0;
    }
    summary {
      padding: 9px 0;
      cursor: pointer;
      font-weight: 800;
    }
    ol {
      padding: 0 0 0 16px;
      margin: 8px 0;
    }
    li {
      padding: 9px 0;
      border-top: 1px solid #b6bda5;
    }
    strong,
    em {
      display: block;
    }
    em,
    .epilogue-note {
      color: #645338;
    }
    a {
      color: #20575b;
      text-decoration: underline;
    }
    a:focus-visible,
    summary:focus-visible {
      outline: 3px solid #247882;
      outline-offset: 2px;
    }
  `,
})
export class JourneyHistoryContextComponent {
  readonly history = input.required<JourneyHistoricalFrame>();
  readonly includeEpilogue = input(false);
  readonly visibleEvents = computed(() =>
    this.history().events.filter(
      (event) => event.period === 'before-voyage' || this.includeEpilogue(),
    ),
  );
}
