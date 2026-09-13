import {
  afterNextRender, Component, DestroyRef, effect, ElementRef, inject,
  InjectionToken, input, NgZone, output, viewChild,
} from '@angular/core';
import type { RobotCourseRenderer, RobotCourseView } from './robot-course-view';

type RendererFactory = (
  host: HTMLElement, view: RobotCourseView, ready: () => void, failed: () => void,
) => Promise<RobotCourseRenderer>;

export const ROBOT_COURSE_RENDERER = new InjectionToken<RendererFactory>('ROBOT_COURSE_RENDERER', {
  providedIn: 'root',
  factory: () => async (host, view, ready, failed) => {
    if (typeof CanvasRenderingContext2D === 'undefined' || typeof ResizeObserver === 'undefined') {
      throw new Error('ROBOT_GRAPHICS_UNAVAILABLE');
    }
    const { createRobotCourseRenderer } = await import('./phaser-robot-course-renderer');
    return createRobotCourseRenderer(host, view, ready, failed);
  },
});

@Component({
  selector: 'app-phaser-robot-course',
  template: '<div #host class="game-host" aria-hidden="true"></div>',
  styles: `
    :host { display: block; width: 100%; height: clamp(300px, 48vw, 570px); }
    :host.workshop { height: clamp(400px, 62vh, 680px); }
    :host.tabletop { height: auto; aspect-ratio: 1 / 1; max-height: 740px; min-height: 300px; }
    .game-host { width: 100%; height: 100%; overflow: hidden; border-radius: 8px; }
  `,
  host: {
    '[class.workshop]': "view().course.visualTheme === 'workshop'",
    '[class.tabletop]': "view().course.visualTheme === 'tabletop'",
    '[style.aspect-ratio]': "view().course.visualTheme === 'tabletop' ? (view().course.widthCm + 46) / (view().course.heightCm + 46) : null",
  },
})
export class PhaserRobotCourseComponent {
  readonly view = input.required<RobotCourseView>();
  readonly status = output<'loading' | 'ready' | 'failed'>();
  private readonly host = viewChild.required<ElementRef<HTMLElement>>('host');
  private readonly factory = inject(ROBOT_COURSE_RENDERER);
  private readonly zone = inject(NgZone);
  private renderer?: RobotCourseRenderer;
  private disposed = false;

  constructor() {
    const publish = (status: 'loading' | 'ready' | 'failed') => {
      if (!this.disposed) this.zone.run(() => this.status.emit(status));
    };
    afterNextRender(() => {
      publish('loading');
      this.zone.runOutsideAngular(() => {
        void this.factory(this.host().nativeElement, this.view(),
          () => publish('ready'), () => publish('failed'),
        ).then((renderer) => {
          if (this.disposed) renderer.destroy();
          else {
            this.renderer = renderer;
            renderer.update(this.view());
          }
        }).catch(() => publish('failed'));
      });
    });
    effect(() => {
      const view = this.view();
      this.zone.runOutsideAngular(() => this.renderer?.update(view));
    });
    inject(DestroyRef).onDestroy(() => {
      this.disposed = true;
      this.zone.runOutsideAngular(() => this.renderer?.destroy());
    });
  }
}
