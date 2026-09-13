import * as Phaser from 'phaser';
import type { GalleryMission, GallerySnapshot } from '../domain/gallery.models';

export interface GalleryView { readonly snapshot: GallerySnapshot; readonly interactive: boolean; readonly reducedMotion: boolean; readonly previewAngle: number; readonly previewLoad: number; readonly previewDistance: number }
export interface GallerySceneHandle { destroy(): void }
/** The scene consumes validated snapshots and routes intent back through the Angular adapter. */
export function mountGallery(parent: HTMLElement, mission: GalleryMission, view: () => GalleryView, inspect: (id: string) => void, ready: () => void, fail: (message: string) => void): GallerySceneHandle {
  let disposed = false;
  class GalleryScene extends Phaser.Scene {
    private images: Phaser.GameObjects.Image[] = [];
    private leaves: Phaser.GameObjects.Rectangle[] = [];
    private seals: Phaser.GameObjects.Text[] = [];
    private details: Phaser.GameObjects.Text[] = [];
    private labels: Phaser.GameObjects.Text[] = [];
    private pawn!: Phaser.GameObjects.Container;
    private arm!: Phaser.GameObjects.Container;
    private cargo!: Phaser.GameObjects.Container;
    private path!: Phaser.GameObjects.Graphics;
    private lastChamber = '';
    private lastState = '';
    private lastAngle = Number.NaN;
    private lastLoad = Number.NaN;
    private lastDistance = Number.NaN;
    constructor() { super('academic-gallery'); }
    preload(): void {
      this.load.image('gallery-room', mission.environment);
      for (const path of new Set(mission.chambers.flatMap(c => c.paintings.map(p => p.image)))) this.load.image(path, path);
      this.load.on('loaderror', () => fail('Some gallery artwork could not load. Reload the artwork to continue.'));
    }
    create(): void {
      if (disposed) return;
      if (!this.textures.exists('gallery-room') || mission.chambers.some(c => c.paintings.some(p => !this.textures.exists(p.image)))) return;
      this.add.image(768, 512, 'gallery-room').setDisplaySize(1536, 1024);
      this.add.rectangle(768, 512, 1536, 1024, 0x071c1a, 0.14);
      for (const path of new Set(mission.chambers.flatMap(c => c.paintings.map(p => p.image)))) {
        const texture = this.textures.get(path), source = texture.getSourceImage();
        const sizeX = source.width / 3, sizeY = source.height / 3;
        for (let frame = 0; frame < 9; frame++) texture.add(frame, 0, frame % 3 * sizeX, Math.floor(frame / 3) * sizeY, sizeX, sizeY);
      }
      const xs = [350, 769, 1188];
      for (let i = 0; i < 3; i++) {
        const x = xs[i];
        this.images.push(this.add.image(x, 258, mission.chambers[0].paintings[0].image, 0).setDisplaySize(245, 247).setInteractive({ useHandCursor: true }).on('pointerup', () => inspect(this.current().paintings[i].id)));
        this.add.rectangle(x, 340, 242, 80, 0x102c28, 0.86);
        this.details.push(this.add.text(x, 315, '', { fontFamily: 'Georgia', fontSize: '16px', align: 'center', color: '#f4e0ad', wordWrap: { width: 220 } }).setOrigin(.5, 0));
        this.labels.push(this.add.text(x, 394, '', { fontFamily: 'Arial', fontSize: '13px', color: '#efdfb5', backgroundColor: '#152c28', padding: { x: 12, y: 8 } }).setOrigin(.5));
        this.add.rectangle(x, 564, 151, 219, 0x081f1d, .92);
        const leaf = this.add.rectangle(x - 72, 454, 144, 218, 0x384638).setOrigin(0, 0).setStrokeStyle(4, 0x9e8250);
        this.leaves.push(leaf);
        for (let k = 0; k < 3; k++) this.add.rectangle(x, 482 + k * 69, 131, 4, 0xc0a166, .5);
        this.seals.push(this.add.text(x, 557, 'SEALED', { fontFamily: 'Arial', fontSize: '15px', color: '#e3c98e', backgroundColor: '#172e28', padding: { x: 8, y: 7 } }).setOrigin(.5));
      }
      this.path = this.add.graphics();
      this.arm = this.add.container(770, 848);
      this.add.circle(770, 848, 48, 0x172f29, .95).setStrokeStyle(3, 0xc4a769);
      this.arm.add(this.add.triangle(0, 0, 0, -41, 10, 10, -10, 10, 0xf3d491));
      this.add.circle(770, 848, 7, 0xe7cb8c);
      this.arm.setDepth(5);
      this.cargo = this.add.container(918, 848, [this.add.rectangle(0, 0, 52, 30, 0x8d7147).setStrokeStyle(2, 0xe0c789), this.add.circle(-17, 22, 6, 0x102b24), this.add.circle(17, 22, 6, 0x102b24)]);
      this.pawn = this.add.container(768, 765, [this.add.ellipse(0, 17, 33, 11, 0x071c19, .55), this.add.circle(0, 0, 12, 0x719589).setStrokeStyle(3, 0xe1c792), this.add.circle(0, -15, 8, 0xe5d3a8)]).setDepth(8);
      const resize = () => { const camera = this.cameras.main; camera.setZoom(Math.min(this.scale.width / 1536, this.scale.height / 1024)); camera.centerOn(768, 512); };
      this.scale.on('resize', resize); resize(); ready();
    }
    private current() { return mission.chambers.find(c => c.id === view().snapshot.chamberId)!; }
    override update(): void {
      if (!this.pawn || disposed) return;
      const v = view(), s = v.snapshot, chamber = this.current();
      this.input.enabled = v.interactive;
      const duration = v.reducedMotion ? 0 : 550;
      if (this.lastChamber !== s.chamberId) {
        this.lastChamber = s.chamberId;
        chamber.paintings.forEach((p, i) => {
          this.images[i].setTexture(p.image, p.artFrame);
          this.details[i].setText(p.hotspots[0].label);
          this.labels[i].setText(`PASSAGE ${['I', 'II', 'III'][i]}  ·  INSPECT`);
        });
        if (!v.reducedMotion) this.cameras.main.fadeIn(400, 8, 28, 24);
      }
      const state = JSON.stringify([s.chamberId, s.phase, s.paintingId, s.frauds, s.solved]);
      if (state !== this.lastState) {
        this.lastState = state;
        chamber.paintings.forEach((p, i) => {
          const chosen = p.id === s.paintingId, open = chosen && ['unlocked', 'extracted'].includes(s.phase), fraud = s.frauds.includes(p.id);
          this.tweens.killTweensOf(this.leaves[i]);
          this.tweens.add({ targets: this.leaves[i], scaleX: open ? .06 : chosen && ['fraud', 'recovery'].includes(s.phase) ? .72 : 1, duration, ease: 'Sine.easeInOut' });
          this.seals[i].setText(fraud ? 'FRAUD SEALED' : open ? 'PASSAGE OPEN' : chosen ? 'MECHANISM' : 'SEALED').setColor(fraud ? '#f3bda4' : open ? '#b8edc9' : '#e3c98e');
          this.images[i].setTint(fraud ? 0x889d92 : 0xffffff);
        });
        const index = chamber.paintings.findIndex(p => p.id === s.paintingId);
        this.tweens.killTweensOf(this.pawn);
        this.tweens.add({ targets: this.pawn, x: index < 0 ? 768 : [350, 769, 1188][index], y: s.phase === 'unlocked' ? 636 : index < 0 ? 765 : 707, duration: duration * 1.5, ease: 'Sine.easeInOut' });
      }
      if (v.previewAngle !== this.lastAngle) { this.lastAngle = v.previewAngle; this.arm.setAngle(v.previewAngle); }
      if (v.previewLoad !== this.lastLoad) { this.lastLoad = v.previewLoad; this.cargo.setScale(1 + Math.min(v.previewLoad, 300) / 650); this.cargo.setY(848 + Math.min(v.previewLoad, 300) / 14); }
      if (v.previewDistance !== this.lastDistance) { this.lastDistance = v.previewDistance; this.path.clear().lineStyle(5, 0xe4c686, .8); this.path.lineBetween(650, 932, 650 + Math.min(v.previewDistance, 60) * 6, 932); }
    }
  }
  const game = new Phaser.Game({ type: Phaser.AUTO, parent, width: Math.max(1, parent.clientWidth), height: Math.max(1, parent.clientHeight), backgroundColor: '#102723', scene: new GalleryScene(), banner: false, audio: { noAudio: true }, fps: { target: 30 }, scale: { mode: Phaser.Scale.RESIZE }, render: { antialias: true } });
  const observer = new ResizeObserver(() => { if (!disposed && game.isBooted && parent.clientWidth && parent.clientHeight) game.scale.setParentSize(parent.clientWidth, parent.clientHeight); });
  observer.observe(parent);
  return { destroy() { disposed = true; observer.disconnect(); game.destroy(true); } };
}
