import { Component, ElementRef, input, OnDestroy, signal, viewChildren } from '@angular/core';
import type { OpeningSpeech } from '../../shared/project-intro/decision-scene.models';

@Component({
  selector: 'app-opening-speeches',
  template: `
    <div class="speeches">
      @for (speech of speeches(); track speech.id) {
        <article>
          <header>
            <p>{{ speech.speaker }}</p>
            <h2>{{ speech.title }}</h2>
          </header>
          <video
            #player
            controls
            playsinline
            preload="metadata"
            [src]="speech.video"
            [attr.aria-label]="speech.speaker + ': ' + speech.title"
            (play)="pauseOthers(player)"
            (error)="markFailed(speech.id)"
          >
            @if (speech.captions) {
              <track kind="captions" [src]="speech.captions" srclang="en" label="English" default />
            }
          </video>
          <details class="speech-copy">
            <summary>Argument summary</summary>
            <p>{{ speech.summary }}</p>
            @if (failed().includes(speech.id)) {
              <p role="status">
                This video could not play. You can still explore the question below.
              </p>
              <a [href]="speech.video" target="_blank" rel="noopener"
                >Open {{ speech.speaker }}’s video ↗</a
              >
            }
          </details>
        </article>
      }
    </div>
    <p class="playback-note">
      Press play to hear each opening argument. You control the sound and pace.
    </p>
  `,
  styles: `
    :host {
      display: block;
      min-width: 0;
    }
    .speeches {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 22px;
      max-width: 820px;
      margin: 0 auto;
    }
    article {
      overflow: hidden;
      min-width: 0;
      border: 1px solid #d6b57950;
      border-radius: 16px;
      background: #100e1c;
    }
    header {
      padding: 10px 14px;
      border-top: 3px solid #ce786b;
      min-height: 0;
      box-sizing: border-box;
    }
    article:nth-child(even) header {
      border-color: #aa94d4;
    }
    header p {
      margin: 0 0 7px;
      color: #e9c184;
      font-size: 11px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 1.8px;
    }
    h2 {
      margin: 0;
      font-size: 19px;
      color: #fff6e8;
    }
    video {
      display: block;
      width: 100%;
      height: auto;
      height: min(24dvh, 220px);
      max-height: 220px;
      background: #08070c;
      object-fit: contain;
    }
    .speech-copy {
      padding: 14px 22px 18px;
      color: #e0e4df;
      font-size: 14px;
      line-height: 1.6;
    }
    .speech-copy p {
      margin: 0;
    }
    a {
      color: #e9c184;
    }
    .playback-note {
      margin: 15px 0 0;
      color: #e0e4df;
      font-size: 12px;
    }
    @media (max-width: 700px) {
      .speeches {
        grid-template-columns: 1fr;
      }
    }
  `,
})
export class OpeningSpeechesComponent implements OnDestroy {
  readonly speeches = input.required<readonly OpeningSpeech[]>();
  readonly failed = signal<readonly string[]>([]);
  private readonly players = viewChildren<ElementRef<HTMLVideoElement>>('player');

  pauseOthers(active: HTMLVideoElement): void {
    for (const player of this.players()) {
      if (player.nativeElement !== active) player.nativeElement.pause();
    }
  }

  pauseAll(): void {
    for (const player of this.players()) player.nativeElement.pause();
  }

  markFailed(id: string): void {
    this.failed.update((ids) => (ids.includes(id) ? ids : [...ids, id]));
  }

  ngOnDestroy(): void {
    this.pauseAll();
  }
}
