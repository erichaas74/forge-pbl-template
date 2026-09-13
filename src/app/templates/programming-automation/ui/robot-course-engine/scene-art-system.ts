import type * as Phaser from 'phaser';
import { GAME_ASSETS, SCENE_DEPTH as D } from './scene-assets';
import { courseProjection, type RobotCourseView } from './robot-course-view';
import { workshopStatus } from './workshop-presentation';
import { drawArenaWalls } from './arena-walls';

/** Art composition owns no hitboxes. The colored walls are decorative. */
export class SceneArtSystem {
  readonly world: Phaser.GameObjects.Container;
  readonly backdrop: Phaser.GameObjects.Image;
  readonly foreground: Phaser.GameObjects.Graphics;
  readonly robot: Phaser.GameObjects.Container;
  private readonly body: Phaser.GameObjects.Image;
  private readonly wheels: Phaser.GameObjects.Graphics;
  private readonly shadow: Phaser.GameObjects.Ellipse;
  private readonly surface: Phaser.GameObjects.Graphics;
  private readonly targetText: Phaser.GameObjects.Text;
  private readonly rangeText: Phaser.GameObjects.Text;

  constructor(scene: Phaser.Scene, view: RobotCourseView) {
    this.world = scene.add.container(0, 0);
    const p = courseProjection(view.course);
    const w = p.length(view.course.widthCm), h = p.length(view.course.heightCm);
    // Retain only the artwork's open floor; plain colored walls replace its machinery.
    // The background fills the viewport independently of the centimeter grid.
    this.backdrop = scene.add.image(0, 64, GAME_ASSETS.WORKSHOP.key).setOrigin(0).setDepth(D.background);
    const source = scene.textures.get(GAME_ASSETS.WORKSHOP.key).getSourceImage();
    this.backdrop.setCrop(source.width * 0.1, source.height * 0.23, source.width * 0.8, source.height * 0.6);
    this.foreground = scene.add.graphics().setDepth(D.foreground);
    const grid = scene.add.graphics().setDepth(D.surface);
    grid.lineStyle(1, 0xdbf2e6, 0.1);
    const step = p.length(view.course.gridSizeCm);
    for (let x = 0; x <= w; x += step) grid.lineBetween(x, 0, x, h);
    for (let y = 0; y <= h; y += step) grid.lineBetween(0, y, w, y);
    grid.lineStyle(2, 0xeed6a2, 0.5).strokeRect(0, 0, w, h);
    this.surface = scene.add.graphics().setDepth(D.objects);
    const text = (x: number, y: number, value: string, size: number, color = '#e4eadb') =>
      scene.add.text(x, y, value, { fontFamily: 'monospace', fontSize: `${size}px`, color,
        stroke: '#294743', strokeThickness: 3 }).setDepth(D.surface);
    const start = p.point(view.course.startPose);
    const rulerX = start.x + 72;
    grid.lineStyle(2, 0xe4e4c6, 0.55).lineBetween(rulerX, 35, rulerX, h - 40);
    this.world.add(grid);
    for (let cm = 0; cm <= view.course.heightCm; cm += 25) {
      const y = p.point({ xCm: 0, yCm: cm }).y;
      grid.lineBetween(rulerX, y, rulerX + (cm % 50 ? 7 : 14), y);
      this.world.add(text(rulerX + 22, y - 6, `${cm}`, 11));
    }
    this.world.add(text(rulerX + 16, 12, 'cm / N ↑', 10));
    this.world.add(text(start.x - 35, start.y + 39, 'START', 13));
    this.world.add(text(start.x + 150, start.y - 50, 'PRECISION\nTEST BAY', 30, '#c0cebd').setAlpha(0.65));
    this.world.add(text(start.x + 152, start.y + 24, 'CENTER ON THE CROSSHAIR', 10).setAlpha(0.7));
    this.targetText = text(0, 0, '', 14, '#fff0ba');
    this.rangeText = text(0, 0, '', 11, '#e5e9d0');
    this.shadow = scene.add.ellipse(0, 0, 47, 39, 0x102b29, 0.48).setDepth(D.shadow);
    this.body = scene.add.image(0, 0, GAME_ASSETS.ROBOT_PLAYER.key).setDisplaySize(65, 65);
    this.wheels = scene.add.graphics();
    this.robot = scene.add.container(0, 0, [this.body, this.wheels]).setDepth(D.player);
    this.world.add([this.surface, this.targetText, this.rangeText, this.shadow, this.robot]);
    this.world.sort('depth');
  }

  resize(width: number, height: number): void {
    const source = this.backdrop.texture.getSourceImage();
    const available = Math.max(1, height - 108);
    const floorWidth = source.width * 0.8, floorHeight = source.height * 0.6;
    const scale = Math.max(width / floorWidth, available / floorHeight);
    this.backdrop.setScale(scale).setPosition(
      (width - floorWidth * scale) / 2 - source.width * 0.1 * scale,
      64 + (available - floorHeight * scale) / 2 - source.height * 0.23 * scale,
    );
    drawArenaWalls(this.foreground.clear(), 0, 64, width, available, Math.min(28, Math.max(16, width * 0.035)));
  }

  update(view: RobotCourseView, success: boolean): void {
    const p = courseProjection(view.course);
    const pose = view.sample ?? view.course.startPose;
    const point = p.point(pose);
    // Position and heading are already interpolated by the replay engine, including exact endpoints.
    this.robot.setPosition(point.x, point.y).setAngle(pose.headingDeg);
    this.shadow.setPosition(point.x + 3, point.y + 8);
    const replayTime = view.sample?.timeMs ?? 0;
    const bob = view.reducedMotion ? 0 : Math.sin(replayTime / 90) * 0.35;
    this.body.setY(bob);
    const tread = view.reducedMotion ? 0 : (pose.xCm + pose.yCm + pose.headingDeg / 8) % 7;
    this.wheels.clear().lineStyle(1, 0xbdc7be, 0.5);
    for (let y = -9 + tread; y < 12; y += 7) {
      this.wheels.lineBetween(-27, y, -21, y).lineBetween(21, y, 27, y);
    }
    const target = view.course.targets[view.targetIndex] ?? view.course.targets[0];
    if (!target) return;
    const t = p.point(target), start = p.point(view.course.startPose);
    const g = this.surface.clear();
    // Lane paint and crosshair use the unchanged course coordinates.
    g.fillStyle(0xe9ddb0, 0.06).fillRect(start.x - 42, 15, 84, p.length(view.course.heightCm) - 30);
    g.lineStyle(2, 0xede3c5, 0.45);
    for (let y = 20; y < p.length(view.course.heightCm) - 20; y += 25) {
      g.lineBetween(start.x - 42, y, start.x - 42, y + 12);
      g.lineBetween(start.x + 42, y, start.x + 42, y + 12);
    }
    const color = success ? 0xb4ffc9 : 0xffd27f;
    g.lineStyle(3, color).strokeRect(t.x - 31, t.y - 32, 62, 64);
    g.fillStyle(color, 0.12).fillRect(t.x - 29, t.y - 30, 58, 60);
    g.lineStyle(1.5, color).strokeCircle(t.x, t.y, p.length(view.course.toleranceCm));
    g.lineBetween(t.x - 10, t.y, t.x + 10, t.y).lineBetween(t.x, t.y - 10, t.x, t.y + 10);
    g.lineStyle(2, 0xd8e5d2, 0.55).strokeCircle(start.x, start.y, 28);
    this.targetText.setText(success ? 'PARKED ✓' : `PARK / ${target.label}`).setPosition(t.x - 31, t.y - 55);
    this.rangeText.setText(`TOLERANCE ±${view.course.toleranceCm} cm`).setPosition(t.x + 105, t.y - 8);
    const status = workshopStatus(view);
    if (status.finished && !status.success) {
      this.rangeText.setText(`${view.result?.stoppingErrorCm.toFixed(1)} cm FROM TARGET`).setColor('#ffd0aa');
      g.lineStyle(2, 0xffbb91, 0.8).lineBetween(point.x + 12, point.y, t.x + 12, t.y);
    } else this.rangeText.setColor('#e5e9d0');
  }
}
