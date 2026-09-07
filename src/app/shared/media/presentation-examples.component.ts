import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  input,
  signal,
  viewChildren,
} from '@angular/core';
import type { SamplePresentationVideo } from '../project-intro/completed-sample-guide';

@Component({
  selector: 'app-presentation-examples',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section aria-labelledby="presentation-examples-title">
      <header>
        <p class="eyebrow">Watch the possibilities</p>
        <h2 id="presentation-examples-title">Final presentation examples</h2>
        <p>Short format demonstrations. Choose a clip to see how a finished report can look.</p>
      </header>
      <div class="example-grid">
        @for (clip of videos(); track clip.id) {
          <article>
            <video
              #player
              [src]="clip.src"
              controls
              playsinline
              preload="metadata"
              [attr.aria-label]="clip.title"
              [attr.aria-describedby]="clip.id + '-description'"
              (play)="pauseOthers($event)"
              (error)="failed.update(addFailure(clip.id))"
            >
              @if (clip.captions) {
                <track kind="captions" [src]="clip.captions" srclang="en" label="English" default />
              }
            </video>
            <div class="example-copy">
              <h3>{{ clip.title }}</h3>
              <p [id]="clip.id + '-description'">{{ clip.description }}</p>
              @if (failed().includes(clip.id)) {
                <p role="status">
                  This clip could not play here. Open the video directly to try again.
                </p>
              }
              <a [href]="clip.src" target="_blank" rel="noopener">Open {{ clip.title }} ↗</a>
            </div>
          </article>
        }
      </div>
    </section>
  `,
  styles: `
    :host {
      display: block;
      max-width: 1500px;
      margin: auto;
      padding: 0 4% 32px;
    }
    header {
      margin-bottom: 20px;
    }
    h2 {
      margin: 4px 0 10px;
      font-size: clamp(24px, 3vw, 32px);
    }
    p {
      line-height: 1.6;
    }
    .eyebrow {
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.12em;
      font-weight: 800;
    }
    .example-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 20px;
    }
    article {
      min-width: 0;
      overflow: hidden;
      border: 1px solid #c9d4ce;
      border-radius: 14px;
      background: #fff;
    }
    video {
      display: block;
      width: 100%;
      aspect-ratio: 16 / 9;
      background: #09121a;
      object-fit: contain;
    }
    .example-copy {
      padding: 18px;
    }
    h3 {
      margin: 0;
      font-size: 18px;
    }
    .example-copy p {
      margin: 8px 0 16px;
      font-size: 14px;
    }
    a {
      display: inline-block;
      min-height: 44px;
      color: #174d67;
      font-weight: 700;
      line-height: 1.5;
    }
    a:focus-visible,
    video:focus-visible {
      outline: 3px solid #237caa;
      outline-offset: 3px;
    }
    @media (max-width: 650px) {
      .example-grid {
        grid-template-columns: 1fr;
      }
    }
  `,
})
export class PresentationExamplesComponent {
  readonly videos = input.required<readonly SamplePresentationVideo[]>();
  readonly failed = signal<readonly string[]>([]);
  private readonly players = viewChildren<ElementRef<HTMLVideoElement>>('player');
  addFailure(id: string): (ids: readonly string[]) => readonly string[] {
    return (ids) => (ids.includes(id) ? ids : [...ids, id]);
  }
  pauseOthers(event: Event): void {
    for (const player of this.players()) {
      if (player.nativeElement !== event.target && !player.nativeElement.paused)
        player.nativeElement.pause();
    }
  }
}
