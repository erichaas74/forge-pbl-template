import {
  Component,
  ElementRef,
  effect,
  input,
  output,
  OnDestroy,
  signal,
  untracked,
  viewChild,
} from '@angular/core';
import type { OpeningMedia } from '../../shared/project-intro/decision-scene.models';
import { ObjectModelViewerComponent } from '../../shared/media/object-model-viewer.component';

@Component({
  selector: 'app-opening-media',
  imports: [ObjectModelViewerComponent],
  template: `
    <div class="media-frame">
      @if (media().model; as model) {
        <app-object-model-viewer [model]="model" [autoLoad]="true" />
      } @else if (media().video && !failed()) {
        <video
          #video
          [src]="media().video"
          [poster]="media().image"
          preload="none"
          playsinline
          muted
          [muted]="true"
          [attr.aria-label]="media().alt"
          (ended)="onEnded()"
          (error)="onError()"
        >
          <track kind="captions" [src]="media().captions" srclang="en" label="English" default />
        </video>
        <div class="clip-controls">
          <button
            class="play-clip"
            type="button"
            (click)="toggle()"
            [attr.aria-pressed]="playing()"
          >
            {{ playing() ? 'Ⅱ Pause scene' : '▶ Play short scene' }}</button
          ><span>Silent scene · Captions on</span>
        </div>
      } @else {
        <img
          [src]="media().image"
          [alt]="media().alt"
          [style.object-fit]="media().fit ?? 'cover'"
        />
      }
      @if (failed()) {
        <p class="media-error" role="status">
          The clip is unavailable. Follow the illustration and scene description.
        </p>
      }
    </div>
  `,
  styles: `
    :host {
      display: block;
      height: 100%;
      min-height: 0;
    }
    .media-frame {
      display: flex;
      flex-direction: column;
      height: 100%;
      position: relative;
      background: #0d1c26;
      border-radius: 18px;
      overflow: hidden;
    }
    video,
    img {
      width: 100%;
      height: 100%;
      min-height: 0;
      max-height: var(--opening-media-height, 38dvh);
      object-fit: cover;
      display: block;
      flex: 1;
      min-height: 0;
    }
    video {
      object-fit: contain;
      background: #0d1c26;
    }
    video::cue {
      font-size: 16px;
    }
    .clip-controls {
      display: flex;
      align-items: center;
      gap: 12px;
      flex-wrap: wrap;
      padding: 12px 16px;
      flex-shrink: 0;
    }
    .clip-controls span {
      color: #d0dee3;
      font-size: 11px;
    }
    .play-clip {
      border: 1px solid #ffffff80;
      border-radius: 100px;
      background: #102531ed;
      color: white;
      padding: 12px 20px;
      font:
        700 15px 'Trebuchet MS',
        sans-serif;
      cursor: pointer;
      min-height: 44px;
    }
    .play-clip:focus-visible {
      outline: 3px solid #ffd388;
      outline-offset: 4px;
    }
    .media-error {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 14px;
      background: #102531ed;
      color: white;
      margin: 0;
      font-size: 14px;
    }
    @media (max-width: 700px) {
      video,
      img {
        max-height: 230px;
        min-height: 0;
      }
    }
  `,
})
export class OpeningMediaComponent implements OnDestroy {
  readonly media = input.required<OpeningMedia>();
  readonly playbackEnded = output<void>();
  readonly playing = signal(false);
  readonly failed = signal(false);
  private readonly video = viewChild<ElementRef<HTMLVideoElement>>('video');
  private generation = 0;

  constructor() {
    effect(() => {
      this.media();
      this.generation++;
      untracked(() => {
        const video = this.video()?.nativeElement;
        if (video && !video.paused) video.pause();
      });
      this.playing.set(false);
      this.failed.set(false);
    });
  }

  async toggle(): Promise<void> {
    const video = this.video()?.nativeElement;
    if (!video) return;
    const generation = ++this.generation;
    if (this.playing()) {
      video.pause();
      this.playing.set(false);
      return;
    }
    try {
      if (video.ended) video.currentTime = 0;
      await video.play();
      if (generation === this.generation) this.playing.set(true);
    } catch {
      if (generation === this.generation) this.onError();
    }
  }
  onError(): void {
    this.playing.set(false);
    this.failed.set(true);
  }
  onEnded(): void {
    this.playing.set(false);
    this.playbackEnded.emit();
  }
  ngOnDestroy(): void {
    this.generation++;
    const video = this.video()?.nativeElement;
    if (video && !video.paused) video.pause();
  }
}
