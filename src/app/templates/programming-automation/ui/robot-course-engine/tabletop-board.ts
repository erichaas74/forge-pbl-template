import type * as Phaser from 'phaser';
import type { CourseDefinition } from '../../domain/automation.models';
import { courseProjection } from './robot-course-view';
import { drawSteelBlock } from './tabletop-props';

export const BOARD_RIM = 34;
export function boardText(
  scene: Phaser.Scene,
  x: number,
  y: number,
  text: string,
  size = 12,
  color = '#3c473f',
): Phaser.GameObjects.Text {
  return scene.add
    .text(x, y, text, {
      fontFamily: 'Arial, sans-serif',
      fontSize: `${size}px`,
      color,
      fontStyle: 'bold',
      align: 'center',
    })
    .setOrigin(0.5)
    .setDepth(2);
}
export function dashedLine(
  g: Phaser.GameObjects.Graphics,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  dash = 7,
): void {
  const length = Math.hypot(x2 - x1, y2 - y1);
  for (let d = 0; d < length; d += dash * 1.7) {
    const end = Math.min(length, d + dash);
    g.lineBetween(
      x1 + ((x2 - x1) * d) / length,
      y1 + ((y2 - y1) * d) / length,
      x1 + ((x2 - x1) * end) / length,
      y1 + ((y2 - y1) * end) / length,
    );
  }
}
export function markedZone(
  g: Phaser.GameObjects.Graphics,
  x: number,
  y: number,
  w: number,
  h: number,
  color: number,
): void {
  g.fillStyle(color, 0.24).fillRect(x, y, w, h);
  g.lineStyle(1, color, 0.45).strokeRect(x, y, w, h);
  g.lineStyle(2, color, 0.9);
  dashedLine(g, x + 3, y + 3, x + w - 3, y + 3, 5);
  dashedLine(g, x + 3, y + h - 3, x + w - 3, y + h - 3, 5);
  dashedLine(g, x + 3, y + 3, x + 3, y + h - 3, 5);
  dashedLine(g, x + w - 3, y + 3, x + w - 3, y + h - 3, 5);
}

/** Drawn once per course. Textures, coordinates, props, and markings are entirely code-generated. */
export function buildTabletopBoard(scene: Phaser.Scene, course: CourseDefinition): void {
  const p = courseProjection(course),
    w = p.length(course.widthCm),
    h = p.length(course.heightCm);
  const cell = p.length(course.gridSizeCm),
    rim = BOARD_RIM;
  let g = scene.add.graphics();
  g.fillStyle(0x34372f, 0.22).fillRoundedRect(-rim + 5, -rim + 8, w + rim * 2, h + rim * 2, 6);
  g.fillStyle(0xc7c5b7).fillRoundedRect(-rim, -rim, w + rim * 2, h + rim * 2, 5);
  g.fillStyle(0xe2dfd3).fillRect(0, 0, w, h);
  for (let row = 0; row < Math.ceil(h / cell); row++)
    for (let col = 0; col < Math.ceil(w / cell); col++) {
      const x = col * cell,
        y = row * cell,
        cw = Math.min(cell, w - x),
        ch = Math.min(cell, h - y);
      g.fillStyle((row + col) % 2 ? 0xd9d7cc : 0xe4e1d6, 0.55).fillRect(x, y, cw, ch);
    }
  // Seeded paint speckles give the board a tabletop finish without a bitmap or random gameplay.
  let seed = 419;
  for (let i = 0; i < 1900; i++) {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    const x = (seed / 4294967296) * (w + rim * 2) - rim;
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    const y = (seed / 4294967296) * (h + rim * 2) - rim;
    g.fillStyle(i % 2 ? 0x4c5145 : 0xffffff, 0.045).fillRect(x, y, 1, 1);
  }
  g.fillStyle(0x929d85).fillRect(0, -rim, w, rim);
  g.fillStyle(0x93a08c).fillRect(w, 0, rim, h);
  g.fillStyle(0x879eab).fillRect(-rim, 0, rim, h);
  g.fillStyle(0xbd8980).fillRect(0, h, w, rim);
  g.lineStyle(1.1, 0x50594e, 0.7);
  for (let x = 0; x <= w; x += cell) g.lineBetween(x, -rim, x, h + rim);
  for (let y = 0; y <= h; y += cell) g.lineBetween(-rim, y, w + rim, y);
  g.strokeRect(0, 0, w, h);
  for (let col = 0; col < Math.ceil(w / cell); col++) {
    const label = String.fromCharCode(65 + col),
      x = (col + 0.5) * cell;
    boardText(scene, x, -rim / 2, label, 19);
    boardText(scene, x, h + rim / 2, label, 19);
  }
  for (let row = 0; row < Math.ceil(h / cell); row++) {
    const label = String(Math.ceil(h / cell) - row),
      y = (row + 0.5) * cell;
    boardText(scene, -rim / 2, y, label, 17);
    boardText(scene, w + rim / 2, y, label, 17);
  }
  for (const x of [-rim, w])
    for (const y of [-rim, h]) {
      g.fillStyle(0x424943).fillRoundedRect(x, y, rim, rim, 3);
      g.lineStyle(2, 0x252e29).strokeRoundedRect(x, y, rim, rim, 3);
      g.lineStyle(5, 0x596058).lineBetween(x + 6, y + rim - 6, x + rim - 6, y + 6);
      for (const d of [5, rim - 5]) {
        g.fillStyle(0x798073).fillCircle(x + d, y + d, 2);
        g.lineStyle(1, 0x30372f).lineBetween(x + d - 1, y + d, x + d + 1, y + d);
      }
    }
  g = scene.add.graphics().setDepth(1);
  const start = p.point(course.startPose),
    zoneSize = Math.min(58, cell * 0.8);
  markedZone(g, start.x - zoneSize / 2, start.y - zoneSize / 2, zoneSize, zoneSize, 0x4d7183);
  boardText(scene, start.x, start.y + zoneSize / 2 + 11, 'START', 10, '#416071');
  for (const zone of course.deliveryZones) {
    const point = p.point({ xCm: zone.xCm, yCm: zone.yCm + zone.heightCm });
    markedZone(g, point.x, point.y, p.length(zone.widthCm), p.length(zone.heightCm), 0x537d8a);
    boardText(
      scene,
      point.x + p.length(zone.widthCm) / 2,
      point.y + p.length(zone.heightCm) / 2,
      `DELIVER\n${zone.label}`,
      11,
    );
  }
  course.checkpoints.forEach((checkpoint, i) => {
    const point = p.point(checkpoint),
      r = Math.max(14, p.length(checkpoint.radiusCm));
    g.fillStyle(i % 2 ? 0xd2ad4e : 0xc97d62, 0.8).fillCircle(point.x, point.y, r);
    g.lineStyle(2, 0xf1e4bd).strokeCircle(point.x, point.y, r * 0.62);
    boardText(scene, point.x, point.y, String(i + 1), 11);
  });
  for (const actor of course.actors ?? []) {
    g.lineStyle(2, actor.kind === 'robot' ? 0xad624b : 0x8d7b43, 0.6);
    const path = actor.patrol === 'loop' ? [...actor.path, actor.path[0]] : actor.path;
    for (let i = 1; i < path.length; i++) {
      const a = p.point(path[i - 1]),
        b = p.point(path[i]);
      dashedLine(g, a.x, a.y, b.x, b.y);
    }
    for (const point of actor.path) {
      const a = p.point(point);
      g.strokeCircle(a.x, a.y, 5);
    }
    const point = p.point(actor.path[0]);
    boardText(
      scene,
      point.x + 12,
      point.y - 25,
      `${actor.kind === 'robot' ? 'PATROL' : 'GATE'} · ${actor.speedCmPerSecond} cm/s`,
      11,
      '#805d3d',
    ).setOrigin(0, 0.5);
  }
  for (const obstacle of course.obstacles) {
    const point = p.point({ xCm: obstacle.xCm, yCm: obstacle.yCm + obstacle.heightCm });
    drawSteelBlock(g, point.x, point.y, p.length(obstacle.widthCm), p.length(obstacle.heightCm));
    boardText(
      scene,
      point.x + p.length(obstacle.widthCm) / 2,
      point.y + p.length(obstacle.heightCm) / 2,
      'KEEP\nCLEAR',
      11,
      '#e0decc',
    );
  }
}
