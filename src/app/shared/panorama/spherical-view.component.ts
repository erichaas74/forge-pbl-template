import { ChangeDetectionStrategy, Component, DestroyRef, ElementRef, afterNextRender, computed, effect, inject, input, output, signal, viewChild } from '@angular/core';
import type { PanoramaViewpoint, SphericalView } from './panorama.models';
import { clampPitch, viewDirection, wrapYaw } from './spherical-view.math';
import { SpatialInspectionComponent } from '../spatial-inspection/spatial-inspection.component';

/** Spherical texture viewing using Three.js's inward-facing sphere technique.
 * Reference: https://threejs.org/examples/webgl_panorama_equirectangular.html
 * Render on demand; no continuous loop, global pointer handlers or auto-rotation.
 */
@Component({
  selector: 'app-spherical-view', imports: [SpatialInspectionComponent], templateUrl: './spherical-view.component.html', styleUrl: './spherical-view.component.scss', changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SphericalViewComponent {
  readonly viewpoints = input.required<readonly PanoramaViewpoint[]>(); readonly saved = input<SphericalView>();
  readonly position = output<SphericalView>(); readonly person = output<string>();
  readonly activeId = signal(''); readonly active = computed(() => this.viewpoints().find(v => v.id === this.activeId()) ?? this.viewpoints()[0]);
  readonly yaw = signal(0); readonly pitch = signal(0); readonly fov = signal(75); readonly loading = signal(true); readonly error = signal('');
  readonly surface = viewChild<ElementRef<HTMLElement>>('surface'); readonly canvas = viewChild<ElementRef<HTMLCanvasElement>>('canvas');
  readonly fullscreenNotice = signal('');
  readonly placeMarkers = signal<readonly { targetId: string; label: string; x: number; y: number }[]>([]);
  private api?: typeof import('three'); private renderer?: import('three').WebGLRenderer; private camera?: import('three').PerspectiveCamera;
  private world?: import('three').Scene; private sphere?: import('three').Mesh<import('three').SphereGeometry, import('three').MeshBasicMaterial>;
  private texture?: import('three').Texture; private observer?: ResizeObserver; private generation = 0; private destroyed = false;
  private drag?: { id: number; x: number; y: number; yaw: number; pitch: number }; private moved = false;
  constructor() {
    effect(() => { const active = this.active(); if (this.renderer) void this.load(active); });
    afterNextRender(() => void this.setup());
    inject(DestroyRef).onDestroy(() => { this.destroyed = true; this.generation++; this.observer?.disconnect(); this.texture?.dispose(); this.sphere?.geometry.dispose(); this.sphere?.material.dispose(); this.renderer?.dispose(); });
  }
  private async setup(): Promise<void> {
    const saved = this.saved(), initial = this.viewpoints().find(v => v.id === saved?.viewpointId) ?? this.active();
    this.activeId.set(initial.id); this.yaw.set(saved?.yaw ?? initial.yaw); this.pitch.set(saved?.pitch ?? initial.pitch); this.fov.set(saved?.fov ?? 75);
    try {
      const T = await import('three'); if (this.destroyed) return; this.api = T;
      this.renderer = new T.WebGLRenderer({ canvas: this.canvas()!.nativeElement, antialias: true }); this.renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
      this.camera = new T.PerspectiveCamera(this.fov(), 1, .1, 20); this.world = new T.Scene();
      const geometry = new T.SphereGeometry(10, 96, 64); geometry.scale(-1, 1, 1);
      this.sphere = new T.Mesh(geometry, new T.MeshBasicMaterial({ color: 0xffffff })); this.world.add(this.sphere);
      this.observer = new ResizeObserver(() => this.resize()); this.observer.observe(this.surface()!.nativeElement);
      this.resize(); await this.load(initial);
    } catch { if (!this.destroyed) { this.error.set('360° viewing is unavailable in this browser. The full image is shown below; try a browser with WebGL enabled.'); this.loading.set(false); } }
  }
  private async load(view: PanoramaViewpoint): Promise<void> {
    const generation = ++this.generation; this.loading.set(true); this.error.set('');
    try {
      const texture = await new this.api!.TextureLoader().loadAsync(view.image);
      if (this.destroyed || generation !== this.generation) { texture.dispose(); return; }
      const image = texture.image as HTMLImageElement;
      if (Math.abs(image.width / image.height - 2) > .02) { texture.dispose(); throw new Error('Spherical image must have 2:1 ratio'); }
      texture.colorSpace = this.api!.SRGBColorSpace; this.texture?.dispose(); this.texture = texture;
      this.sphere!.material.map = texture; this.sphere!.material.needsUpdate = true; this.loading.set(false); this.draw();
    } catch { if (!this.destroyed && generation === this.generation) { this.loading.set(false); this.error.set('This 360° image could not load. Choose another viewpoint or retry.'); } }
  }
  retry(): void { if (this.renderer) void this.load(this.active()); }
  private resize(): void {
    const element = this.surface()?.nativeElement; if (!element || !this.renderer || !this.camera) return;
    this.renderer.setSize(element.clientWidth, element.clientHeight, false); this.camera.aspect = element.clientWidth / Math.max(1, element.clientHeight); this.draw();
  }
  private draw(): void {
    if (!this.renderer || !this.world || !this.camera || !this.api) return;
    this.camera.fov = this.fov(); this.camera.updateProjectionMatrix(); this.camera.lookAt(...viewDirection(this.yaw(), this.pitch())); this.camera.updateMatrixWorld(); this.renderer.render(this.world, this.camera);
    const forward = this.camera.getWorldDirection(new this.api.Vector3());
    this.placeMarkers.set((this.active().places ?? []).flatMap(place => {
      const point = new this.api!.Vector3(...viewDirection(place.yaw, place.pitch));
      if (point.dot(forward) <= 0) return [];
      point.project(this.camera!);
      if (Math.abs(point.x) > .88 || Math.abs(point.y) > .85) return [];
      return [{ targetId: place.targetId, label: place.label, x: (point.x + 1) * 50, y: (1 - point.y) * 50 }];
    }));
  }
  save(): void { this.position.emit({ viewpointId: this.active().id, yaw: this.yaw(), pitch: this.pitch(), fov: this.fov() }); }
  choose(id: string): void { const v = this.viewpoints().find(v => v.id === id); if (!v) return; this.activeId.set(id); this.yaw.set(v.yaw); this.pitch.set(v.pitch); this.fov.set(75); this.draw(); this.save(); }
  look(horizontal: number, vertical = 0): void { this.yaw.update(y => wrapYaw(y + horizontal)); this.pitch.update(p => clampPitch(p + vertical)); this.draw(); this.save(); }
  zoom(delta: number): void { this.fov.update(v => Math.max(35, Math.min(100, v + delta))); this.draw(); this.save(); }
  down(e: PointerEvent): void { if (!e.isPrimary || e.button !== 0 || this.loading() || this.error()) return; e.preventDefault(); this.surface()?.nativeElement.focus({ preventScroll: true }); this.drag = { id: e.pointerId, x: e.clientX, y: e.clientY, yaw: this.yaw(), pitch: this.pitch() }; this.moved = false; this.surface()?.nativeElement.setPointerCapture(e.pointerId); }
  move(e: PointerEvent): void {
    if (!this.drag) return; const dx = e.clientX - this.drag.x, dy = e.clientY - this.drag.y;
    this.moved ||= Math.hypot(dx, dy) > 5; this.yaw.set(wrapYaw(this.drag.yaw - dx * .16)); this.pitch.set(clampPitch(this.drag.pitch + dy * .16)); this.draw();
  }
  up(e: PointerEvent): void {
    if (!this.drag || e.pointerId !== this.drag.id) return;
    this.surface()?.nativeElement.releasePointerCapture(e.pointerId); this.drag = undefined; this.save();
    if (!this.moved) this.pick(e);
  }
  cancel(): void { this.drag = undefined; this.save(); }
  private pick(e: PointerEvent): void {
    if (!this.api || !this.camera || !this.sphere) return;
    const box = this.surface()!.nativeElement.getBoundingClientRect(), ray = new this.api.Raycaster();
    ray.setFromCamera(new this.api.Vector2((e.clientX - box.left) / box.width * 2 - 1, 1 - (e.clientY - box.top) / box.height * 2), this.camera);
    const uv = ray.intersectObject(this.sphere)[0]?.uv; if (!uv) return;
    const x = uv.x * 100, y = (1 - uv.y) * 100;
    const match = this.active().people.find(p => x >= p.rect.x && x <= p.rect.x + p.rect.width && y >= p.rect.y && y <= p.rect.y + p.rect.height);
    if (match) this.person.emit(match.personId);
  }
  key(e: KeyboardEvent): void {
    const changes: Record<string, [number, number]> = { ArrowLeft: [-15, 0], ArrowRight: [15, 0], ArrowUp: [0, 15], ArrowDown: [0, -15] };
    if (changes[e.key]) { e.preventDefault(); e.stopPropagation(); this.look(...changes[e.key]); }
    else if (e.key === '+' || e.key === '=' || e.key === '-') { e.preventDefault(); this.zoom(e.key === '-' ? 10 : -10); }
  }
  async fullscreen(): Promise<void> { this.fullscreenNotice.set(''); try { if (document.fullscreenElement) await document.exitFullscreen(); else await this.surface()?.nativeElement.requestFullscreen(); } catch { this.fullscreenNotice.set('Fullscreen is unavailable. You can continue exploring in this window.'); } }
}
