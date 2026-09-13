import {
  Component,
  ElementRef,
  InjectionToken,
  afterNextRender,
  effect,
  inject,
  input,
  output,
  viewChild,
  DestroyRef,
} from '@angular/core';
import type {
  RouteCanvasCallbacks,
  RouteCanvasController,
  RouteCanvasSnapshot,
  RouteCanvasViewport,
} from './route-canvas.models';

export type RouteCanvasFactory = (
  host: HTMLElement,
  snapshot: RouteCanvasSnapshot,
  viewport: RouteCanvasViewport,
  callbacks: RouteCanvasCallbacks,
) => Promise<RouteCanvasController>;

export const ROUTE_CANVAS_FACTORY = new InjectionToken<RouteCanvasFactory>('ROUTE_CANVAS_FACTORY', {
  providedIn: 'root',
  factory: () => async (host, snapshot, viewport, callbacks) => {
    if (typeof CanvasRenderingContext2D === 'undefined') throw new Error('CANVAS_UNAVAILABLE');
    const { createRouteCanvas } = await import('./phaser-route-renderer');
    return createRouteCanvas(host, snapshot, viewport, callbacks);
  },
});

@Component({
  selector: 'app-phaser-route-canvas',
  template: '<div #canvasHost class="canvas-host" aria-hidden="true"></div>',
  styles: `
    :host {
      position: absolute;
      inset: 0;
      display: block;
      pointer-events: none;
    }
    .canvas-host {
      width: 100%;
      height: 100%;
      overflow: hidden;
    }
  `,
})
export class PhaserRouteCanvasComponent {
  readonly snapshot = input.required<RouteCanvasSnapshot>();
  readonly viewport = input.required<RouteCanvasViewport>();
  readonly statusChanged = output<'loading' | 'ready' | 'failed'>();
  readonly previewEnded = output<void>();
  private readonly host = viewChild.required<ElementRef<HTMLElement>>('canvasHost');
  private readonly factory = inject(ROUTE_CANVAS_FACTORY);
  private controller?: RouteCanvasController;
  private disposed = false;
  private failed = false;
  private loadingTimer?: ReturnType<typeof setTimeout>;

  constructor() {
    afterNextRender(() => {
      this.statusChanged.emit('loading');
      this.loadingTimer = setTimeout(() => this.showFailure(), 15_000);
      void this.factory(this.host().nativeElement, this.snapshot(), this.viewport(), {
        ready: () => {
          clearTimeout(this.loadingTimer);
          if (!this.disposed && !this.failed) this.statusChanged.emit('ready');
        },
        failed: () => this.showFailure(),
        previewEnded: () => {
          if (!this.disposed) this.previewEnded.emit();
        },
      })
        .then((controller) => {
          if (this.disposed || this.failed) controller.destroy();
          else {
            this.controller = controller;
            controller.update(this.snapshot(), this.viewport());
          }
        })
        .catch(() => this.showFailure());
    });
    effect(() => {
      const snapshot = this.snapshot();
      const viewport = this.viewport();
      this.controller?.update(snapshot, viewport);
    });
    inject(DestroyRef).onDestroy(() => {
      this.disposed = true;
      clearTimeout(this.loadingTimer);
      this.controller?.destroy();
    });
  }

  private showFailure(): void {
    if (this.disposed || this.failed) return;
    this.failed = true;
    clearTimeout(this.loadingTimer);
    this.controller?.destroy();
    this.controller = undefined;
    this.statusChanged.emit('failed');
  }
}
