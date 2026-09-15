import * as T from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { BalanceMetalwork } from '../balance-lock/balance-lock.3d-materials';

export interface DioramaFocus {
  center: readonly [number, number, number];
  width: number;
  height: number;
}
/** Reusable GPU/camera/modal boundary. Puzzle rules and input stay in their scene adapter. */
export class DioramaViewer {
  readonly art = new BalanceMetalwork();
  readonly scene = new T.Scene();
  readonly camera = new T.OrthographicCamera(-12, 12, 6, -6, 0.1, 90);
  readonly renderer: T.WebGLRenderer;
  readonly canvas: HTMLCanvasElement;
  readonly viewport: HTMLElement;
  focus: string;
  expanded = false;
  private readonly observer: ResizeObserver;
  private readonly environment: T.WebGLRenderTarget;
  private readonly sun = new T.DirectionalLight(0xffdfac, 3.1);
  private center = new T.Vector3(0, 4.5, 1.2);
  private width = 25;
  private gone = false;
  private oldOverflow = '';
  private oldFocus: HTMLElement | null = null;
  constructor(
    readonly root: HTMLElement,
    private readonly name: string,
    private readonly focuses: Readonly<Record<string, DioramaFocus>>,
    onLost: () => void,
  ) {
    this.viewport = root.querySelector<HTMLElement>('[data-viewport]')!;
    this.renderer = new T.WebGLRenderer({ antialias: true, powerPreference: 'low-power' });
    this.renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 1.35));
    this.renderer.setClearColor(0x1d303b);
    this.renderer.outputColorSpace = T.SRGBColorSpace;
    this.renderer.toneMapping = T.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.02;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = T.PCFSoftShadowMap;
    this.canvas = this.renderer.domElement;
    this.canvas.setAttribute('role', 'img');
    this.viewport.append(this.canvas);
    const room = new RoomEnvironment(),
      pmrem = new T.PMREMGenerator(this.renderer);
    this.environment = pmrem.fromScene(room, 0.025);
    room.dispose();
    pmrem.dispose();
    this.scene.environment = this.environment.texture;
    this.scene.environmentIntensity = 0.55;
    this.scene.add(new T.HemisphereLight(0xd4e9ee, 0x4b4c39, 1.65));
    this.sun.position.set(-7, 13, 11);
    this.sun.castShadow = true;
    this.sun.shadow.mapSize.set(2048, 2048);
    Object.assign(this.sun.shadow.camera, {
      left: -16,
      right: 16,
      top: 15,
      bottom: -11,
      near: 0.1,
      far: 45,
    });
    this.sun.shadow.bias = -0.0003;
    this.sun.shadow.normalBias = 0.025;
    this.scene.add(this.sun);
    const rim = new T.DirectionalLight(0x8ebeca, 1.7);
    rim.position.set(8, 10, -4);
    this.scene.add(rim);
    this.focus = this.viewport.clientWidth < 650 ? 'drive' : 'all';
    this.observer = new ResizeObserver(() => this.resize());
    this.observer.observe(this.viewport);
    document.addEventListener('keydown', this.key);
    this.contextLost = (event: Event) => {
      event.preventDefault();
      onLost();
    };
    this.canvas.addEventListener('webglcontextlost', this.contextLost);
    this.setFocus(this.focus);
    this.resize();
  }
  private contextLost: (event: Event) => void;
  setFocus(value: string): void {
    if (!this.focuses[value]) return;
    this.focus = value;
    this.root
      .querySelectorAll<HTMLButtonElement>('[data-focus]')
      .forEach((b) => b.setAttribute('aria-pressed', String(b.dataset['focus'] === value)));
  }
  expand(value: boolean): void {
    this.expanded = value;
    if (value) {
      this.oldOverflow = document.body.style.overflow;
      this.oldFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      document.body.style.overflow = 'hidden';
      this.root.setAttribute('role', 'dialog');
      this.root.setAttribute('aria-modal', 'true');
      this.root.setAttribute('aria-label', `Expanded ${this.name} workshop`);
    } else {
      document.body.style.overflow = this.oldOverflow;
      this.root.removeAttribute('role');
      this.root.removeAttribute('aria-modal');
      this.root.removeAttribute('aria-label');
    }
    this.root.classList.toggle('diorama-expanded', value);
    const button = this.root.querySelector<HTMLButtonElement>('[data-action=expand]')!;
    button.textContent = value ? 'Close' : 'Expand';
    button.setAttribute(
      'aria-label',
      `${value ? 'Close expanded' : 'Expand'} ${this.name} workshop`,
    );
    this.resize();
    if (value) button.focus();
    else this.oldFocus?.focus({ preventScroll: true });
  }
  closeOptions(): void {
    const options = this.root.querySelector<HTMLElement>('[data-options]')!;
    options.hidden = true;
    this.root.querySelector('[data-action=options]')!.setAttribute('aria-expanded', 'false');
  }
  private key = (event: KeyboardEvent) => {
    if (!this.expanded && !this.root.contains(document.activeElement)) return;
    if (event.key === 'Escape') {
      if (!this.root.querySelector<HTMLElement>('[data-options]')!.hidden) {
        this.closeOptions();
        this.root.querySelector<HTMLButtonElement>('[data-action=options]')!.focus();
      } else if (this.expanded) this.expand(false);
    }
    if (this.expanded && event.key === 'Tab') {
      const list = Array.from(
        this.root.querySelectorAll<HTMLElement>(
          'button:not(:disabled),input,select:not(:disabled),a',
        ),
      ).filter((e) => e.getClientRects().length);
      if (!this.root.contains(document.activeElement)) {
        event.preventDefault();
        (event.shiftKey ? list.at(-1) : list[0])?.focus();
      } else if (event.shiftKey && document.activeElement === list[0]) {
        event.preventDefault();
        list.at(-1)?.focus();
      } else if (!event.shiftKey && document.activeElement === list.at(-1)) {
        event.preventDefault();
        list[0]?.focus();
      }
    }
  };
  resize(): void {
    if (this.gone || !this.viewport.clientWidth || !this.viewport.clientHeight) return;
    this.renderer.setSize(this.viewport.clientWidth, this.viewport.clientHeight, false);
    this.cameraPose(1);
  }
  private cameraPose(blend: number): void {
    const target = this.focuses[this.focus],
      aspect = Math.max(0.3, this.viewport.clientWidth / Math.max(1, this.viewport.clientHeight));
    this.center.lerp(new T.Vector3(...target.center), blend);
    this.width += (target.width - this.width) * blend;
    const height = Math.max(target.height, this.width / aspect);
    this.camera.left = (-height * aspect) / 2;
    this.camera.right = (height * aspect) / 2;
    this.camera.top = height / 2;
    this.camera.bottom = -height / 2;
    this.camera.position.copy(this.center).add(new T.Vector3(0.8, 6.7, 27));
    this.camera.lookAt(this.center);
    this.camera.updateProjectionMatrix();
    this.camera.updateMatrixWorld();
  }
  render(dt: number, reduced: boolean): void {
    this.cameraPose(reduced ? 1 : dt === 0 ? 0 : 1 - Math.exp(-dt * 4));
    this.renderer.render(this.scene, this.camera);
  }
  label(element: HTMLElement, point: T.Vector3): void {
    point.project(this.camera);
    const w = this.viewport.clientWidth,
      h = this.viewport.clientHeight,
      x = ((point.x + 1) * w) / 2,
      y = ((1 - point.y) * h) / 2;
    element.hidden = x < 25 || x > w - 25 || y < 60 || y > h - 58;
    element.style.left = `${Math.max(65, Math.min(w - 65, x))}px`;
    element.style.top = `${y}px`;
  }
  destroy(): void {
    if (this.gone) return;
    if (this.expanded) this.expand(false);
    this.gone = true;
    this.observer.disconnect();
    document.removeEventListener('keydown', this.key);
    this.canvas.removeEventListener('webglcontextlost', this.contextLost);
    this.environment.dispose();
    this.sun.shadow.dispose();
    this.art.dispose();
    this.renderer.dispose();
  }
}
