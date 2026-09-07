import {
  Component,
  DestroyRef,
  ElementRef,
  effect,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core';
import { DESIGN_CAPTURE } from '../../../shared/engineering/design-simulation.registry';
import {
  isDesignCapture,
  type BlockDesign,
  type DesignCapture,
} from '../../../shared/engineering/block-design';

@Component({
  selector: 'app-solar-monument',
  template: `<div class="lab-toolbar">
      <div>
        <strong>Sun, Moon & shadow laboratory</strong>
        <p>Match the place, date, time, and dimensions of your physical model.</p>
      </div>
      <button (click)="capture()" [disabled]="!ready() || busy() || !design().blocks.length">
        {{ busy() ? 'Recording…' : 'Save trial to notebook' }}
      </button>
    </div>
    <p class="status" role="status">{{ status() }}</p>
    <iframe
      #frame
      title="Interactive globe, Sun and Moon paths, and monument shadows"
      src="/simulations/solar-monument/index.html"
      (load)="connect()"
    ></iframe>
    <p class="model-note">
      Model: level ground, true north, direct sunlight. Target readings test the centre of each
      ring. Trees, terrain, clouds, and block stability are not simulated. Very low Sun angles are
      less reliable; compare your design with a real outdoor shadow.
    </p>`,
  styles: [
    `
      :host {
        display: block;
      }
      .lab-toolbar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 16px;
        padding: 18px;
        background: #163e39;
        color: white;
        border-radius: 12px 12px 0 0;
      }
      .lab-toolbar p {
        font-size: 13px;
        margin: 5px 0 0;
      }
      button {
        min-height: 44px;
        padding: 10px 18px;
        background: #f4c363;
        color: #173c36;
        border: 0;
        border-radius: 8px;
        font: inherit;
        cursor: pointer;
      }
      button:disabled {
        opacity: 0.5;
        cursor: default;
      }
      button:focus-visible {
        outline: 3px solid white;
        outline-offset: 3px;
      }
      iframe {
        width: 100%;
        height: 780px;
        border: 1px solid #bccac0;
        box-sizing: border-box;
        background: #07131a;
      }
      .status,
      .model-note {
        font-size: 13px;
        line-height: 1.5;
      }
      .status {
        min-height: 20px;
      }
      .model-note {
        color: #52685e;
      }
      @media (max-width: 700px) {
        iframe {
          height: 1100px;
        }
        .lab-toolbar {
          display: block;
        }
        .lab-toolbar button {
          margin-top: 10px;
        }
      }
    `,
  ],
})
export class SolarMonumentComponent {
  readonly design = input.required<BlockDesign>();
  readonly restore = input<DesignCapture>();
  readonly active = input(true);
  private readonly onCapture = inject(DESIGN_CAPTURE);
  private readonly frame = viewChild<ElementRef<HTMLIFrameElement>>('frame');
  readonly ready = signal(false);
  readonly busy = signal(false);
  readonly status = signal('Loading the lab…');
  private pendingId = '';
  private timer?: ReturnType<typeof setTimeout>;
  constructor() {
    const listener = (event: MessageEvent<unknown>) => this.receive(event);
    window.addEventListener('message', listener);
    inject(DestroyRef).onDestroy(() => {
      window.removeEventListener('message', listener);
      clearTimeout(this.timer);
    });
    effect(() => {
      const design = this.design();
      if (this.ready()) this.send({ type: 'design', design });
    });
    effect(() => {
      const capture = this.restore();
      if (this.ready() && capture) this.send({ type: 'restore', capture });
    });
    effect(() => {
      const active = this.active();
      if (this.ready()) this.send({ type: 'visibility', active });
    });
  }
  connect(): void {
    this.send({ type: 'connect' });
  }
  capture(): void {
    if (this.busy() || !this.ready()) return;
    this.pendingId = crypto.randomUUID();
    this.busy.set(true);
    this.send({ type: 'capture', id: this.pendingId, design: this.design() });
    this.timer = setTimeout(() => {
      this.busy.set(false);
      this.status.set('The lab did not return a trial. Check that it loaded, then try again.');
      this.pendingId = '';
    }, 10000);
  }
  private send(payload: Record<string, unknown>): void {
    this.frame()?.nativeElement.contentWindow?.postMessage(
      { channel: 'forge.design-simulation.v1', ...payload },
      window.location.origin,
    );
  }
  private receive(event: MessageEvent<unknown>): void {
    if (
      event.origin !== window.location.origin ||
      event.source !== this.frame()?.nativeElement.contentWindow ||
      !event.data ||
      typeof event.data !== 'object'
    )
      return;
    const data = event.data as Record<string, unknown>;
    if (data['channel'] !== 'forge.design-simulation.v1') return;
    if (data['type'] === 'ready') {
      this.ready.set(true);
      this.status.set('Lab ready. Choose a seasonal date, then Solar Noon, and save your trial.');
      this.send({ type: 'design', design: this.design() });
    }
    if (
      data['type'] === 'capture' &&
      isDesignCapture(data['capture']) &&
      data['capture'].id === this.pendingId
    ) {
      clearTimeout(this.timer);
      this.busy.set(false);
      this.pendingId = '';
      try {
        this.onCapture(data['capture']);
        this.status.set('Trial saved. Open Evidence to compare your tests.');
      } catch (error) {
        this.status.set(error instanceof Error ? error.message : 'This trial could not be saved.');
      }
    }
  }
}
