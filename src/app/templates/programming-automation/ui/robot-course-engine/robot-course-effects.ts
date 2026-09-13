import * as Phaser from 'phaser';
import { sampleRobotReplay } from '../../core/robot-replay';
import type { RobotPose } from '../../domain/automation.models';
import { courseProjection, type RobotCourseView } from './robot-course-view';

/** Cosmetic light and particle layers. Animation never feeds back into the simulation. */
export class RobotCourseEffects {
  private readonly lights: Phaser.GameObjects.Graphics;
  private readonly particles: Phaser.GameObjects.Graphics;
  private samples?: RobotCourseView['samples'];
  private events?: RobotCourseView['events'];
  private transfers: { timeMs: number; pose: RobotPose; delivered: boolean }[] = [];

  constructor(scene: Phaser.Scene) {
    this.lights = scene.add.graphics().setDepth(0.5);
    this.particles = scene.add.graphics().setDepth(6);
  }

  draw(view: RobotCourseView, sceneTime: number): void {
    const p = courseProjection(view.course);
    const width = p.length(view.course.widthCm), height = p.length(view.course.heightCm);
    const time = view.reducedMotion ? 0 : (view.sample?.timeMs ?? sceneTime);
    const pulse = view.reducedMotion ? 0.6 : 0.5 + Math.sin(time / 650) * 0.25;
    const g = this.lights.clear();
    const fx = this.particles.clear();

    // Soft overhead pools and dock-edge LEDs give even small training courses a sense of scale.
    for (let i = 1; i <= 3; i++) {
      const x = width * i / 4;
      g.fillStyle(0x85e6fc, 0.025).fillEllipse(x, height * 0.34, width * 0.43, height * 0.6);
      g.fillStyle(0xc2edff, 0.035).fillTriangle(x - 18, 2, Math.max(0, x - width / 6), height * 0.7, Math.min(width, x + width / 6), height * 0.7);
    }
    for (let x = 16; x < width - 12; x += 42) {
      g.fillStyle(0x73eddb, pulse).fillRoundedRect(x, 4, 18, 3, 1);
      g.fillStyle(0x62bfee, 0.3).fillRoundedRect(x, height - 7, 18, 3, 1);
    }
    for (let y = 22; y < height - 20; y += 50) {
      g.fillStyle(0x95d4f9, 0.22).fillRect(4, y, 3, 16).fillRect(width - 7, y, 3, 16);
    }

    const target = view.course.targets[view.targetIndex] ?? view.course.targets[0];
    if (target) {
      const point = p.point(target);
      const angle = time / 1800;
      g.fillStyle(0xffb64b, 0.045 + pulse * 0.035).fillCircle(point.x, point.y, 48);
      for (let segment = 0; segment < 3; segment++) {
        const start = angle + segment * Math.PI * 2 / 3;
        g.lineStyle(2, 0xffcb71, 0.8).beginPath().arc(point.x, point.y, 39, start, start + 1.1).strokePath();
      }
      for (const dx of [-1, 1]) {
        g.lineStyle(2, 0xffd990, pulse).lineBetween(point.x + dx * 49, point.y - 9, point.x + dx * 43, point.y)
          .lineBetween(point.x + dx * 43, point.y, point.x + dx * 49, point.y + 9);
      }
    }

    for (const zone of view.course.deliveryZones) {
      const point = p.point({ xCm: zone.xCm, yCm: zone.yCm + zone.heightCm });
      const w = p.length(zone.widthCm), h = p.length(zone.heightCm);
      // The beacons stay on the zone boundary, so they cannot be mistaken for obstacles.
      for (const [x, y] of [[point.x, point.y], [point.x + w, point.y], [point.x, point.y + h], [point.x + w, point.y + h]]) {
        fx.fillStyle(0x68ffb9, 0.04 + pulse * 0.08).fillCircle(x, y, 13);
        fx.fillStyle(0xb2ffdc, 0.7).fillCircle(x, y, 3);
      }
    }

    for (const rack of view.course.obstacles) {
      const point = p.point({ xCm: rack.xCm + rack.widthCm, yCm: rack.yCm + rack.heightCm });
      fx.fillStyle(0xffba53, pulse * 0.12).fillCircle(point.x - 5, point.y + 5, 13);
      fx.fillStyle(0xffcd79, 0.5 + pulse / 2).fillCircle(point.x - 5, point.y + 5, 3);
    }
    for (const pkg of view.course.packages) {
      if (view.sample?.carryingPackageIds.includes(pkg.id) || view.sample?.deliveredPackageIds.includes(pkg.id)) continue;
      const point = p.point(pkg);
      const lift = view.reducedMotion ? 0 : Math.sin(time / 400) * 3;
      fx.lineStyle(2, 0xffd787, 0.8).lineBetween(point.x - 7, point.y - 39 + lift, point.x, point.y - 33 + lift)
        .lineBetween(point.x, point.y - 33 + lift, point.x + 7, point.y - 39 + lift);
    }

    // A bounded set of motes uses fixed seeds without creating new Phaser objects each frame.
    if (!view.reducedMotion) {
      for (let i = 0; i < 16; i++) {
        const x = ((i * 137.51 + time / 75) % width + width) % width;
        const y = ((i * 83.17 - time / 170) % height + height) % height;
        fx.fillStyle(0xb5e5ee, 0.09).fillCircle(x, y, i % 3 === 0 ? 2 : 1);
      }
    }

    if (this.samples !== view.samples || this.events !== view.events) {
      this.samples = view.samples;
      this.events = view.events;
      this.transfers = view.events.filter((event) => /^(Picked up |Delivered )/.test(event.message))
        .map((event) => ({ timeMs: event.timeMs,
          pose: sampleRobotReplay(view.samples, event.timeMs) ?? view.course.startPose,
          delivered: event.message.startsWith('Delivered '),
        }));
    }
    for (const event of this.transfers) {
      const age = (view.sample?.timeMs ?? 0) - event.timeMs;
      if (age < 0 || age > 1000) continue;
      const point = p.point(event.pose);
      const progress = view.reducedMotion ? 0.25 : age / 1000;
      const color = event.delivered ? 0x91ffd0 : 0xffd185;
      fx.lineStyle(2, color, 1 - progress).strokeCircle(point.x, point.y, 25 + progress * 42);
      if (view.reducedMotion) continue;
      for (let i = 0; i < 12; i++) {
        const angle = i * Math.PI / 6;
        const radius = 30 + progress * (i % 2 ? 50 : 36);
        fx.fillStyle(color, 1 - progress).fillRect(point.x + Math.cos(angle) * radius,
          point.y + Math.sin(angle) * radius - progress * 16, 3, 5);
      }
    }
  }
}
