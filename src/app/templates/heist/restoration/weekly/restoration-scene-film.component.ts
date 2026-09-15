import { ChangeDetectionStrategy, Component, ElementRef, computed, input, output, signal, viewChild } from '@angular/core';
import type { RestorationPreviewSession } from './restoration-preview.models';

@Component({
  selector: 'app-restoration-scene-film',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="film">
      <video #player controls playsinline preload="metadata" [src]="film().src" aria-label="Animated scene inspection film"
        (loadedmetadata)="restore()" (timeupdate)="time.set(player.currentTime)" (pause)="position.emit(player.currentTime)" (error)="failed.set(true)">
        <track kind="captions" [src]="film().captions" srclang="en" label="Scene description" default>
      </video>
      @if (failed()) { <p role="alert">The film could not load. Use the picture and the scene transcript below to inspect the same details.</p> }
      <button class="inspect" (click)="inspect()">⌕ Inspect {{ cue().label }} in the picture →</button>
    </div>
    <div class="cue-buttons" aria-label="Film inspection points">
      @for (item of film().cues; track item.at) {
        <button [attr.aria-pressed]="cue().at === item.at" (click)="seek(item.at)">{{ item.at }}s · {{ item.label }}</button>
      }
    </div>
    <p class="caption" aria-live="polite">{{ cue().transcript }}</p>
    <details><summary>Film transcript & media note</summary><p>Animated classroom reconstruction, with silent camera movement and descriptive captions. This is an illustration to investigate, not historical footage or independent evidence.</p>
      @for (item of film().cues; track item.at) { <p>{{ item.at }}s — {{ item.transcript }}</p> }
    </details>
  `,
  styles: `:host{display:block;min-width:0}.film{position:relative;background:#091812;border-radius:8px;overflow:hidden}video{display:block;width:100%;aspect-ratio:1}video::cue{font-size:14px;background-color:#10251fee;color:#fff9e9}.inspect{width:100%;background:#f0d499;color:#172d24;font-weight:700;border:0}.cue-buttons{display:flex;flex-wrap:wrap;gap:6px;margin-top:10px}button{font:inherit;font-size:13px;min-height:44px;padding:10px 12px;cursor:pointer;border:1px solid #889784;border-radius:5px;background:#213f32;color:#fff2d8}button[aria-pressed=true]{border-color:#f0d499;background:#3a5640}button:focus-visible,summary:focus-visible{outline:3px solid #f5cf75;outline-offset:3px}.caption,details{font-size:13px;line-height:1.6;color:#d2dfd2}summary{cursor:pointer;padding:8px 0}details p{padding:0 8px}`,
})
export class RestorationSceneFilmComponent {
  readonly film = input.required<RestorationPreviewSession['film']>();
  readonly startTime = input(0);
  readonly region = output<string>();
  readonly position = output<number>();
  readonly time = signal(0);
  readonly failed = signal(false);
  readonly cue = computed(() => [...this.film().cues].reverse().find(c => c.at <= this.time()) ?? this.film().cues[0]);
  readonly player = viewChild<ElementRef<HTMLVideoElement>>('player');
  restore(): void { const player = this.player()?.nativeElement; if (player) { player.currentTime = Math.min(this.startTime(), player.duration || 0); this.time.set(player.currentTime); } }
  seek(time: number): void { const player = this.player()?.nativeElement; if (player) { player.pause(); player.currentTime = time; } this.time.set(time); this.position.emit(time); }
  inspect(): void { this.player()?.nativeElement.pause(); this.position.emit(this.time()); this.region.emit(this.cue().regionId); }
}
