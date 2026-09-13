import type * as Phaser from 'phaser';
import { SCENE_DEPTH } from './scene-assets';

type EffectKind = 'success' | 'failure' | 'selection' | 'collision';
/** One bounded effect layer; no physics or unbounded particle emitters. */
export class GameFXSystem {
  readonly layer: Phaser.GameObjects.Graphics;
  private event?: { kind: EffectKind; x: number; y: number; at: number };
  constructor(scene: Phaser.Scene) { this.layer = scene.add.graphics().setDepth(SCENE_DEPTH.effects); }
  success(point: { x: number; y: number }, now: number): void { this.emit('success', point, now); }
  failure(point: { x: number; y: number }, now: number): void { this.emit('failure', point, now); }
  select(point: { x: number; y: number }, now: number): void { this.emit('selection', point, now); }
  collision(point: { x: number; y: number }, now: number): void { this.emit('collision', point, now); }
  clear(): void { this.event = undefined; this.layer.clear(); }
  private emit(kind: EffectKind, point: { x: number; y: number }, now: number): void {
    this.event = { kind, ...point, at: now };
  }
  update(now: number, reducedMotion: boolean): void {
    const g = this.layer.clear(), event = this.event;
    if (!event) return;
    const progress = Math.min(1, Math.max(0, (now - event.at) / 850));
    if (progress === 1) { this.event = undefined; return; }
    const color = event.kind === 'success' ? 0xbcffcd : event.kind === 'selection' ? 0xffdf9c : 0xffaa8b;
    const radius = reducedMotion ? 37 : 32 + progress * 28;
    g.lineStyle(2, color, 1 - progress).strokeCircle(event.x, event.y, radius);
    if (reducedMotion || event.kind === 'selection') return;
    for (let i = 0; i < 8; i++) {
      const angle = i * Math.PI / 4;
      const x = event.x + Math.cos(angle) * (radius + 9);
      const y = event.y + Math.sin(angle) * (radius + 9);
      g.lineStyle(2, color, 1 - progress).lineBetween(x, y, x + Math.cos(angle) * 6, y + Math.sin(angle) * 6);
    }
  }
}
