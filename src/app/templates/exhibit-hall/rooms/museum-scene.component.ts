import {
  afterNextRender,
  Component,
  effect,
  ElementRef,
  inject,
  InjectionToken,
  input,
  OnDestroy,
  output,
  signal,
  viewChild,
} from '@angular/core';
import type {
  MuseumSceneContent,
  MuseumSceneFactory,
  MuseumScenePort,
} from './museum-scene-contracts';

export const LOAD_MUSEUM_SCENE = new InjectionToken<() => Promise<MuseumSceneFactory>>(
  'LOAD_MUSEUM_SCENE',
  {
    providedIn: 'root',
    factory: () => async () => {
      const module = await import('./museum-scene');
      return (host, callbacks) => new module.MuseumScene(host, callbacks);
    },
  },
);

@Component({
  selector: 'app-museum-scene',
  template: `
    <div
      class="scene-shell"
      role="group"
      [attr.aria-label]="
        content().kind === 'room' ? 'Assigned museum room in 3D' : 'Class museum entrance in 3D'
      "
    >
      <div #canvasHost class="canvas-host"></div>
      <div class="room-badge">
        <span aria-hidden="true">◇</span>
        {{ content().kind === 'room' ? 'YOUR VIEW INSIDE THE ROOM' : 'THE MUSEUM ENTRANCE' }}
      </div>
      @if (starting()) {
        <div class="loading-cover" role="status">
          <span class="loading-mark">◇</span> Opening the museum…
        </div>
      }
      @if (loading() > 0) {
        <div class="asset-status" role="status">
          Placing {{ loading() }} {{ loading() === 1 ? 'artifact' : 'artifacts' }}…
        </div>
      }
      @if (error() || assetErrors().length) {
        <div class="scene-error" role="status">
          <p>
            {{
              error() ||
                'Some artifacts could not load: ' +
                  assetErrors().join(', ') +
                  '. Your labels are still available.'
            }}
          </p>
          <button type="button" (click)="retry()">Reload 3D view</button>
        </div>
      }
      <div class="scene-hint">Drag to look around · Select a display or use the buttons below</div>
    </div>
  `,
  styles: `
    :host {
      display: block;
      min-width: 0;
    }
    .scene-shell {
      height: var(--museum-scene-height, clamp(370px, 48vw, 620px));
      position: relative;
      overflow: hidden;
      background: #d9bd8c;
      border: 1px solid #d1c6b0;
      border-radius: 4px;
    }
    .canvas-host {
      width: 100%;
      height: 100%;
    }
    .room-badge,
    .scene-hint,
    .asset-status {
      position: absolute;
      pointer-events: none;
      font:
        600 10px/1.5 Arial,
        sans-serif;
      letter-spacing: 0.13em;
      color: #243f50;
      background: #fffaf0e8;
      border: 1px solid #d9cfbd;
      padding: 8px 12px;
      border-radius: 3px;
    }
    .room-badge {
      left: 16px;
      top: 16px;
    }
    .room-badge span {
      color: #986f34;
      margin-right: 6px;
    }
    .scene-hint {
      bottom: 14px;
      left: 50%;
      transform: translateX(-50%);
      letter-spacing: 0.02em;
      font-weight: 400;
      width: max-content;
      max-width: 90%;
      text-align: center;
    }
    .asset-status {
      right: 16px;
      top: 16px;
      letter-spacing: 0.02em;
    }
    .loading-cover {
      position: absolute;
      inset: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: #f0e8d7;
      color: #243f50;
      font:
        15px Georgia,
        serif;
      gap: 14px;
    }
    .loading-mark {
      font-size: 48px;
      color: #a17e40;
    }
    .scene-error {
      position: absolute;
      bottom: 55px;
      left: 15px;
      right: 15px;
      background: #fff5e2;
      border: 1px solid #b99058;
      border-radius: 4px;
      padding: 12px 16px;
      color: #553e24;
      font:
        13px/1.5 Arial,
        sans-serif;
      display: flex;
      align-items: center;
      gap: 16px;
      justify-content: space-between;
    }
    .scene-error p {
      margin: 0;
    }
    .scene-error button {
      flex: none;
      border: 1px solid #9d804e;
      background: #fffaf0;
      padding: 10px;
      color: #473d29;
      border-radius: 3px;
      cursor: pointer;
    }
    .scene-error button:focus-visible {
      outline: 3px solid #345c74;
      outline-offset: 3px;
    }
    @media (max-width: 650px) {
      .scene-shell {
        height: 360px;
      }
      .room-badge {
        font-size: 8px;
        left: 8px;
        top: 8px;
      }
      .scene-hint {
        font-size: 9px;
      }
      .asset-status {
        top: 45px;
        right: 8px;
      }
      .scene-error {
        display: block;
      }
      .scene-error button {
        margin-top: 8px;
      }
    }
  `,
})
export class MuseumSceneComponent implements OnDestroy {
  readonly content = input.required<MuseumSceneContent>();
  readonly activeDisplay = input<string | undefined>(undefined);
  readonly selected = output<string>();
  readonly starting = signal(true);
  readonly loading = signal(0);
  readonly assetErrors = signal<readonly string[]>([]);
  readonly error = signal<string | undefined>(undefined);
  private readonly host = viewChild.required<ElementRef<HTMLElement>>('canvasHost');
  private readonly load = inject(LOAD_MUSEUM_SCENE);
  private scene?: MuseumScenePort;
  private generation = 0;
  private destroyed = false;
  constructor() {
    afterNextRender(() => void this.start());
    effect(() => {
      const content = this.content();
      this.scene?.update(content);
    });
    effect(() => {
      const id = this.activeDisplay();
      this.scene?.focusDisplay(id);
    });
  }
  retry(): void {
    this.scene?.dispose();
    this.scene = undefined;
    void this.start();
  }
  ngOnDestroy(): void {
    this.destroyed = true;
    this.generation++;
    this.scene?.dispose();
  }
  private async start(): Promise<void> {
    const generation = ++this.generation;
    this.starting.set(true);
    this.error.set(undefined);
    this.assetErrors.set([]);
    this.loading.set(0);
    try {
      const create = await this.load();
      if (this.destroyed || generation !== this.generation) return;
      this.scene = create(this.host().nativeElement, {
        selected: (id) => this.selected.emit(id),
        status: (loading, errors) => {
          this.loading.set(loading);
          this.assetErrors.set(errors);
        },
        failed: (message) => this.error.set(message),
      });
      this.scene.update(this.content());
      this.scene.focusDisplay(this.activeDisplay());
    } catch {
      if (!this.destroyed && generation === this.generation)
        this.error.set(
          'The 3D room could not open on this device. You can still add artifacts and read every label.',
        );
    } finally {
      if (!this.destroyed && generation === this.generation) this.starting.set(false);
    }
  }
}
