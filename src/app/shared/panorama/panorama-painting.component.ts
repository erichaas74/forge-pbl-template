import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import type { PanoramaDefinition, PanoramaState, SceneRect } from './panorama.models';
export function clipRect(r: SceneRect): string { return `inset(${r.y}% ${100 - r.x - r.width}% ${100 - r.y - r.height}% ${r.x}%)`; }
@Component({
  selector: 'app-panorama-painting', changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<div class="painting" role="img" [attr.aria-label]="original() ? 'Painting under investigation: ' + scene().imageAlt : 'Your restoration: ' + scene().imageAlt">
    <img [src]="scene().panorama" alt="">
    @for (repair of scene().repairs; track repair.id) { @if (original() || !state().repairs[repair.id]) {
      <img class="layer" [src]="scene().forgery" [style.clip-path]="clip(repair.rect)" [attr.data-forgery]="repair.id" alt="">
    } }
  </div>`,
  styles: `:host{display:block}.painting{position:relative;aspect-ratio:3;overflow:hidden;background:#243b30}.painting img{display:block;width:100%;height:100%;object-fit:fill}.layer{position:absolute;inset:0}`,
})
export class PanoramaPaintingComponent {
  readonly scene = input.required<PanoramaDefinition>(); readonly state = input.required<PanoramaState>(); readonly original = input(false); readonly clip = clipRect;
}
