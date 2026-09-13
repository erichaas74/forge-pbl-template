import * as Phaser from 'phaser';
import type { Mission, Point } from '../domain/heist.models';
import type { MapSnapshot } from './presentation-state';

export class CameraDirector {
  private manual = false;
  private wasExecuting = false;
  private base = 1;
  constructor(private readonly scene: Phaser.Scene, private readonly mission: Mission) { this.overview(); }
  resize(): void { const manual = this.manual; this.base = Math.min(this.scene.scale.width / this.mission.map.width, this.scene.scale.height / this.mission.map.height); this.overview(); this.manual = manual; }
  overview(): void {
    this.manual = true;
    const c = this.scene.cameras.main;
    c.stopFollow(); c.panEffect.reset(); c.zoomEffect.reset();
    c.setZoom(this.base); c.centerOn(this.mission.map.width / 2, this.mission.map.height / 2);
  }
  focus(point: Point, reduced: boolean): void {
    this.manual = true;
    const c = this.scene.cameras.main; c.stopFollow(); c.panEffect.reset(); c.zoomEffect.reset();
    if (reduced) return;
    c.pan(point.x, point.y, 450, 'Sine.easeInOut'); c.zoomTo(this.base * 1.45, 450);
  }
  zoom(amount: number): void { this.manual = true; const c = this.scene.cameras.main; c.stopFollow(); c.panEffect.reset(); c.zoomEffect.reset(); c.setZoom(Phaser.Math.Clamp(c.zoom + amount * this.base, this.base, this.base * 2.6)); }
  pan(x: number, y: number): void { this.manual = true; const c = this.scene.cameras.main; c.stopFollow(); c.panEffect.reset(); c.zoomEffect.reset(); c.scrollX += x; c.scrollY += y; }
  update(s: MapSnapshot, target: Phaser.GameObjects.Container): void {
    if (s.executing && !this.wasExecuting) this.manual = false;
    this.wasExecuting = s.executing;
    const c = this.scene.cameras.main;
    if (s.cameraLocked || s.reducedMotion || this.manual || !s.executing) { c.stopFollow(); if (s.cameraLocked || s.reducedMotion) { c.panEffect.reset(); c.zoomEffect.reset(); } return; }
    c.setZoom(this.base * 1.35); c.startFollow(target, false, 0.045, 0.045);
  }
}
