import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  InjectionToken,
  Input,
  OnChanges,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { isExhibitObjectModel, type ExhibitObjectModel } from './object-model';

export const LOAD_OBJECT_MODEL_VIEWER = new InjectionToken<() => Promise<unknown>>(
  'LOAD_OBJECT_MODEL_VIEWER',
  {
    providedIn: 'root',
    factory: () => () => import('@google/model-viewer'),
  },
);

@Component({
  selector: 'app-object-model-viewer',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <div class="viewer">
      @if (active() && !failed()) {
        <model-viewer
          #viewer
          [attr.src]="model.src"
          [attr.alt]="model.alt"
          camera-controls
          touch-action="pan-y"
          interaction-prompt="none"
          shadow-intensity="0.8"
          [attr.camera-orbit]="initialOrbit()"
          (load)="loaded()"
          (error)="failed.set(true)"
        />
      }
      @if (!active() && !loading() && !failed()) {
        <button class="load" type="button" (click)="load()">
          <span aria-hidden="true">360°</span>Load 3D object
          @if (model.sizeBytes) {
            <small>{{ (model.sizeBytes / 1000000).toFixed(1) }} MB</small>
          }
        </button>
      }
      @if (loading() && !failed()) {
        <p class="status" role="status">Loading 3D object…</p>
      }
      @if (failed()) {
        <div class="error" role="status">
          <p>The 3D object could not load. Its description is available below.</p>
          <button type="button" (click)="load()">Try again</button>
        </div>
      }
    </div>
    @if (active() && !loading() && !failed()) {
      <nav aria-label="3D object controls">
        <button type="button" (click)="rotate(-30)" aria-label="Rotate object left">↶ Left</button>
        <button type="button" (click)="rotate(30)" aria-label="Rotate object right">Right ↷</button>
        <button type="button" (click)="reset()">Reset view</button>
      </nav>
      <p class="help">Drag or use arrow keys to rotate. Pinch or scroll to zoom.</p>
    }
    <p class="credit">
      <a [href]="model.sourceUrl" target="_blank" rel="noreferrer">{{ model.credit }}</a> ·
      {{ model.license }}
    </p>
  `,
  styles: `
    :host {
      display: block;
      width: 100%;
      color: inherit;
    }
    .viewer {
      color: #f5ecdd;
      position: relative;
      display: grid;
      place-items: center;
      min-height: 260px;
      background: radial-gradient(ellipse at 50% 35%, #65736a, #243632 75%);
    }
    model-viewer {
      width: 100%;
      height: var(--model-height, clamp(260px, 42vw, 460px));
    }
    button {
      cursor: pointer;
      font: inherit;
      color: #223b36;
      background: #f4e9d3;
      border: 1px solid #baa57a;
      border-radius: 5px;
      min-height: 44px;
      padding: 9px 13px;
    }
    .load {
      display: grid;
      justify-items: center;
      gap: 10px;
      padding: 20px 28px;
    }
    .load span {
      font-size: 2rem;
      font-family: Georgia, serif;
    }
    small {
      font-size: 0.75rem;
    }
    .status {
      position: absolute;
      bottom: 12px;
      padding: 10px;
      background: #243632;
    }
    .error {
      text-align: center;
      padding: 20px;
      line-height: 1.6;
    }
    nav {
      display: flex;
      justify-content: center;
      gap: 8px;
      flex-wrap: wrap;
      padding: 12px 8px 4px;
    }
    .help,
    .credit {
      font: 12px/1.5 system-ui;
      text-align: center;
      margin: 8px;
    }
    a {
      color: inherit;
      text-decoration: underline;
    }
    button:focus-visible,
    a:focus-visible {
      outline: 3px solid #f0c675;
      outline-offset: 3px;
    }
  `,
})
export class ObjectModelViewerComponent implements OnChanges {
  @Input() autoLoad = false;
  @Input({ required: true }) model!: ExhibitObjectModel;
  readonly active = signal(false);
  readonly loading = signal(false);
  readonly failed = signal(false);
  private readonly loadViewer = inject(LOAD_OBJECT_MODEL_VIEWER);
  private readonly viewer = viewChild<
    ElementRef<
      HTMLElement & {
        cameraOrbit: string;
        getCameraOrbit(): { theta: number; phi: number; radius: number };
      }
    >
  >('viewer');
  private generation = 0;
  ngOnChanges(): void {
    this.generation++;
    this.active.set(false);
    this.loading.set(false);
    this.failed.set(false);
    if (this.autoLoad) void this.load();
  }
  async load(): Promise<void> {
    const generation = ++this.generation;
    this.active.set(false);
    this.failed.set(false);
    this.loading.set(true);
    try {
      if (!isExhibitObjectModel(this.model)) throw new Error('Invalid model');
      await this.loadViewer();
      if (generation === this.generation) this.active.set(true);
    } catch {
      if (generation === this.generation) {
        this.failed.set(true);
        this.loading.set(false);
      }
    }
  }
  loaded(): void {
    this.loading.set(false);
    if (!this.autoLoad) this.viewer()?.nativeElement.focus({ preventScroll: true });
  }
  rotate(degrees: number): void {
    const viewer = this.viewer()?.nativeElement;
    if (!viewer) return;
    const orbit = viewer.getCameraOrbit();
    viewer.cameraOrbit = `${orbit.theta + (degrees * Math.PI) / 180}rad ${orbit.phi}rad ${orbit.radius}m`;
  }
  initialOrbit(): string {
    const view = this.model.initialView;
    return view
      ? `${view.azimuthDegrees}deg ${view.elevationDegrees}deg ${view.distancePercent}%`
      : '0deg 75deg 105%';
  }
  reset(): void {
    const viewer = this.viewer()?.nativeElement;
    if (viewer) viewer.cameraOrbit = this.initialOrbit();
  }
}
