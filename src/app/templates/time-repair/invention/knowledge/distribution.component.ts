import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  InjectionToken,
  ViewChild,
  effect,
  inject,
} from '@angular/core';
import { KnowledgeRuntime } from './knowledge.runtime';
import type { TownSceneHandle } from './distribution.scene';

export const KNOWLEDGE_TOWN_LOADER = new InjectionToken<
  () => Promise<typeof import('./distribution.scene')>
>('KNOWLEDGE_TOWN_LOADER', {
  providedIn: 'root',
  factory: () => () => import('./distribution.scene'),
});

@Component({
  selector: 'app-knowledge-distribution',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="town"
      role="group"
      aria-label="Carry printed copies through the town along its streets"
    >
      <div #stage class="canvas" aria-hidden="true"></div>
      <div class="keyboard-objects">
        @for (place of k.config()!.places!; track place.id) {
          <button (click)="k.act({ type: 'move', target: place.id })">
            Walk to {{ place.name }}
          </button>
        }
        <button (click)="k.act({ type: 'load' })">Load a copy at the workshop</button>
        <button (click)="k.act({ type: 'deliver' })">Hand over a carried copy</button>
      </div>
    </div>
  `,
  styles: `
    :host,
    .town {
      display: block;
      height: 100%;
      position: relative;
      background: #27483f;
    }
    .canvas {
      position: absolute;
      inset: 0;
    }
    .keyboard-objects {
      position: absolute;
      bottom: 12px;
      left: 12px;
      right: 12px;
      pointer-events: none;
    }
    button {
      position: absolute;
      width: 1px;
      height: 1px;
      overflow: hidden;
      clip-path: inset(50%);
      white-space: nowrap;
    }
    button:focus-visible {
      position: relative;
      width: auto;
      height: auto;
      clip-path: none;
      padding: 12px;
      background: #f2ddad;
      color: #183c35;
      border: 3px solid #8de7c6;
      border-radius: 5px;
      pointer-events: auto;
    }
  `,
})
export class DistributionComponent implements AfterViewInit {
  readonly k = inject(KnowledgeRuntime);
  private readonly loader = inject(KNOWLEDGE_TOWN_LOADER);
  private scene?: TownSceneHandle;
  private destroyed = false;
  @ViewChild('stage', { static: true }) private stage!: ElementRef<HTMLElement>;
  constructor() {
    effect(() => {
      const state = this.k.state();
      this.scene?.refresh(state);
    });
    inject(DestroyRef).onDestroy(() => {
      this.destroyed = true;
      this.scene?.destroy();
    });
  }
  async ngAfterViewInit(): Promise<void> {
    try {
      const { mountKnowledgeTown } = await this.loader();
      if (this.destroyed) return;
      const scene = await mountKnowledgeTown(
        this.stage.nativeElement,
        this.k.config()!,
        this.k.state(),
        (a) => this.k.act(a),
      );
      if (this.destroyed) scene.destroy();
      else {
        this.scene = scene;
        scene.refresh(this.k.state());
      }
    } catch {
      this.k.storageMessage.set('The town renderer could not load. Reload this page to try again.');
    }
  }
}
