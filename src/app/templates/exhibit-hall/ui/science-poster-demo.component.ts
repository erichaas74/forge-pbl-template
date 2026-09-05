import { Component, Input } from '@angular/core';

import type { ExhibitRendererComponentInputs } from '../runtime/exhibit-hall.tokens';
import type { SciencePosterSnapshotData } from '../renderers/science-poster/science-poster-renderer';

@Component({
  selector: 'app-science-poster-demo',
  template: `
    @if (poster; as poster) {
      <article class="poster">
        <h2>{{ poster.title }}</h2>
        <dl>
          <div>
            <dt>Question</dt>
            <dd>{{ poster.question }}</dd>
          </div>
          <div>
            <dt>Method</dt>
            <dd>{{ poster.method }}</dd>
          </div>
          <div>
            <dt>Finding</dt>
            <dd>{{ poster.finding }}</dd>
          </div>
          <div>
            <dt>Limitation</dt>
            <dd>{{ poster.limitation }}</dd>
          </div>
        </dl>
      </article>
    }
  `,
  styles: `
    .poster {
      border: 0.4rem solid #315e71;
      padding: 1rem;
      background: #f4fbfd;
      color: #173743;
    }
    h2 {
      margin: 0 0 0.7rem;
      font-family: Georgia, serif;
    }
    dl {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 0.6rem;
      margin: 0;
    }
    div {
      padding: 0.5rem;
      background: white;
    }
    dt {
      color: #2d7182;
      font-weight: 800;
    }
    dd {
      margin: 0.2rem 0 0;
    }
  `,
})
export class SciencePosterDemoComponent implements ExhibitRendererComponentInputs {
  @Input({ required: true }) data: unknown;
  @Input() mode: 'thumbnail' | 'walkup' | 'preview' = 'thumbnail';

  get poster(): SciencePosterSnapshotData | undefined {
    if (typeof this.data !== 'object' || this.data === null || !('title' in this.data))
      return undefined;
    return this.data as SciencePosterSnapshotData;
  }
}
