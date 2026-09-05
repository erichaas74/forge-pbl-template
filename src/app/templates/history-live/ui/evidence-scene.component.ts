import { Component, computed, inject, input } from '@angular/core';
import type { HistoryLiveVisualScene } from '../domain/history-live.models';
import { HISTORY_LIVE_CONFIG } from '../runtime/history-live.tokens';

@Component({
  selector: 'app-history-live-evidence-scene',
  template: `@if (source(); as source) {
      <article [class]="scene()?.camera || 'media-wall'">
        <small>{{ scene()?.camera }} · {{ scene()?.mediaType }}</small>
        <h2>{{ source.title }}</h2>
        @if (
          source.imageUrl &&
          (scene()?.mediaType === 'image' || scene()?.mediaType === 'historical-map')
        ) {
          <img [src]="source.imageUrl" [alt]="source.imageAlt || source.title" />
        } @else if (scene()?.mediaType === 'image' || scene()?.mediaType === 'historical-map') {
          <p>
            No embedded image is supplied for this source. Open the cited original or select an
            evidence caption.
          </p>
        } @else if (scene()?.mediaType === 'timeline') {
          <p class="date">{{ source.dateLabel }}</p>
          <p>{{ source.excerpt }}</p>
        } @else {
          <p>{{ scene()?.caption }}</p>
        }
        <p>{{ source.creator }} · {{ source.dateLabel }}</p>
        <a [href]="source.url" target="_blank" rel="noreferrer">View cited document ↗</a>
      </article>
    } @else {
      <p>Select a source for this scene.</p>
    }`,
  styles: `
    :host {
      display: block;
      color: #eef2ef;
    }
    article {
      padding: 1rem;
      background: #10232de8;
      max-width: 100%;
      overflow-wrap: anywhere;
    }
    h2 {
      font:
        600 1.2rem Georgia,
        serif;
      margin: 0.4rem 0;
    }
    p,
    small,
    a {
      font-size: 0.9rem;
      line-height: 1.5;
    }
    img {
      max-width: 100%;
      max-height: 18rem;
      object-fit: contain;
    }
    .date {
      font-size: 1.5rem;
    }
    a {
      color: #f3d591;
    }
    .reporter {
      border-left: 5px solid #d4b477;
    }
    .studio-wide {
      text-align: center;
    }
  `,
})
export class EvidenceSceneComponent {
  readonly scene = input<HistoryLiveVisualScene>();
  private readonly config = inject(HISTORY_LIVE_CONFIG);
  readonly source = computed(() =>
    this.config.sources.find((source) => source.id === this.scene()?.sourceId),
  );
}
