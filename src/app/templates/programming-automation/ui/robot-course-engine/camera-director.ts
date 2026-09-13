import type * as Phaser from 'phaser';
import { courseProjection, type RobotCourseView } from './robot-course-view';
import { workshopFrame } from './workshop-presentation';

/** Cosmetic framing. No camera coordinates are ever sent to the execution engine. */
export class CameraDirector {
  private initialized = false;
  private focus?: { x: number; y: number; until: number };
  private x = 0;
  private y = 0;
  private zoom = 1;

  constructor(private readonly camera: Phaser.Cameras.Scene2D.Camera) {}

  focusOnObject(point: { x: number; y: number }, until: number): void {
    this.focus = { ...point, until };
  }
  returnToGameplayView(): void { this.focus = undefined; }
  impact(reducedMotion: boolean): void {
    if (!reducedMotion) this.camera.shake(100, 0.002);
  }
  update(view: RobotCourseView, width: number, height: number, delta: number, now: number): void {
    const frame = workshopFrame(view);
    // Reserve fixed screen space for the HUD, which has its own camera.
    this.camera.setViewport(0, 64, width, Math.max(1, height - 108));
    const zoom = Math.min(width / frame.width, this.camera.height / frame.height) * view.zoom;
    const player = courseProjection(view.course).point(view.sample ?? view.course.startPose);
    if (this.focus && now >= this.focus.until) this.focus = undefined;
    const point = view.follow ? player : this.focus ?? {
      x: frame.x + frame.width / 2, y: frame.y + frame.height / 2,
    };
    const blend = !this.initialized || view.reducedMotion ? 1 : 1 - Math.exp(-delta / 150);
    this.x += (point.x - this.x) * blend;
    this.y += (point.y - this.y) * blend;
    this.zoom += (zoom - this.zoom) * blend;
    this.camera.setZoom(this.zoom).centerOn(this.x, this.y);
    this.initialized = true;
  }
}
