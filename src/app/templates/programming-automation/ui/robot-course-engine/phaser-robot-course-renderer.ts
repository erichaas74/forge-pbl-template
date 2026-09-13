import * as Phaser from 'phaser';
import { sampleRobotReplay } from '../../core/robot-replay';
import type { CourseDefinition, RobotPose } from '../../domain/automation.models';
import { courseProjection, type RobotCourseRenderer, type RobotCourseView } from './robot-course-view';
import { RobotCourseEffects } from './robot-course-effects';
import { createWorkshopRenderer } from './workshop-renderer';
import { createTabletopRenderer } from './tabletop-renderer';
import { drawArenaWalls } from './arena-walls';

/** Theme selection stays cosmetic and can change while the course host remains mounted. */
export function createRobotCourseRenderer(
  host: HTMLElement, initial: RobotCourseView, onReady: () => void, onFailed: () => void,
): RobotCourseRenderer {
  let theme = initial.course.visualTheme;
  const create = (view: RobotCourseView) => (view.course.visualTheme === 'tabletop' ? createTabletopRenderer
    : view.course.visualTheme === 'workshop' ? createWorkshopRenderer : createLegacyRobotCourseRenderer)(host, view, onReady, onFailed);
  let renderer = create(initial);
  return {
    update(view): void {
      if (theme !== view.course.visualTheme) {
        renderer.destroy(); theme = view.course.visualTheme; renderer = create(view);
      } else renderer.update(view);
    },
    destroy(): void { renderer.destroy(); },
  };
}

/** Phaser only displays recorded state. It never executes student commands or resolves collisions. */
function createLegacyRobotCourseRenderer(
  host: HTMLElement,
  initial: RobotCourseView,
  onReady: () => void,
  onFailed: () => void,
): RobotCourseRenderer {
  let view = initial;
  let disposed = false;
  let ready = false;
  let failed = false;
  let dirty = true;
  const fail = () => {
    if (!disposed && !failed) {
      failed = true;
      onFailed();
    }
  };

  class BootScene extends Phaser.Scene {
    constructor() { super('robot-boot'); }
    create(): void { this.scene.start('robot-course'); }
  }

  class CourseScene extends Phaser.Scene {
    private floor!: Phaser.GameObjects.Graphics;
    private route!: Phaser.GameObjects.Graphics;
    private objects!: Phaser.GameObjects.Graphics;
    private feedback!: Phaser.GameObjects.Graphics;
    private robot!: Phaser.GameObjects.Container;
    private wheels!: Phaser.GameObjects.Graphics;
    private scanner!: Phaser.GameObjects.Graphics;
    private cargo!: Phaser.GameObjects.Graphics;
    private effects!: RobotCourseEffects;
    private targetLabel!: Phaser.GameObjects.Text;
    private lastEffectsTime = -Infinity;
    private readonly packageLabels = new Map<string, Phaser.GameObjects.Text>();
    private labels: Phaser.GameObjects.Text[] = [];
    private course?: CourseDefinition;
    private previousTime = 0;
    private previousSamples?: RobotCourseView['samples'];
    private previousEvents?: RobotCourseView['events'];
    private collisions: { timeMs: number; pose: RobotPose }[] = [];

    constructor() { super('robot-course'); }

    create(): void {
      try {
        this.cameras.main.setBackgroundColor('#0b1927');
        this.floor = this.add.graphics().setDepth(0);
        this.route = this.add.graphics().setDepth(1);
        this.objects = this.add.graphics().setDepth(2);
        this.feedback = this.add.graphics().setDepth(3);
        this.effects = new RobotCourseEffects(this);
        this.targetLabel = this.add.text(0, 0, 'PARK', {
          fontFamily: 'monospace', fontSize: '11px', color: '#ffda91',
          backgroundColor: '#2b302f', padding: { x: 6, y: 3 },
        }).setOrigin(0.5).setDepth(4);
        this.createRobot();
        ready = true;
        this.draw();
        onReady();
      } catch { fail(); }
    }

    private label(x: number, y: number, text: string, color = '#a5bfcc', size = 12): void {
      this.labels.push(this.add.text(x, y, text, {
        fontFamily: 'monospace', fontSize: `${size}px`, color,
        stroke: '#102331', strokeThickness: 3,
      }).setOrigin(0.5).setDepth(4));
    }

    private buildCourse(): void {
      const course = view.course;
      this.course = course;
      this.labels.forEach((label) => label.destroy());
      this.labels = [];
      this.packageLabels.clear();
      const p = courseProjection(course);
      const width = p.length(course.widthCm);
      const height = p.length(course.heightCm);
      const g = this.floor.clear();
      g.fillStyle(0x06101c).fillRoundedRect(-12, -12, width + 24, height + 24, 10);
      g.fillStyle(0x193242).fillRect(0, 0, width, height);
      // Uniform centimeter grid. Decorative floor seams do not change course geometry.
      const grid = p.length(Math.max(1, course.gridSizeCm));
      for (let y = 0, row = 0; y < height; y += grid, row++) {
        for (let x = 0, col = 0; x < width; x += grid, col++) {
          if ((row + col) % 2 === 0) g.fillStyle(0x213e4d, 0.45)
            .fillRect(x, y, Math.min(grid, width - x), Math.min(grid, height - y));
        }
      }
      g.lineStyle(1, 0x7597aa, 0.18);
      for (let x = 0; x <= width; x += grid) g.lineBetween(x, 0, x, height);
      for (let y = 0; y <= height; y += grid) g.lineBetween(0, y, width, y);
      g.lineStyle(2, 0x6799a6).strokeRect(0, 0, width, height);
      // Keep the decorative walls outside the playable centimeter grid.
      drawArenaWalls(g, -12, -12, width + 24, height + 24, 12);
      for (let x = 0; x <= course.widthCm; x += 50) this.label(p.length(x), height + 23, `${x}`);
      for (let y = 0; y <= course.heightCm; y += 50) this.label(-28, p.point({ xCm: 0, yCm: y }).y, `${y}`);
      this.label(width / 2, -25, 'N ↑  ·  CENTIMETERS', '#9dbfce', 11);
      const start = p.point(course.startPose);
      g.fillStyle(0x275156, 0.7).fillCircle(start.x, start.y, 26);
      g.lineStyle(2, 0x75b1b5).strokeCircle(start.x, start.y, 26);
      this.label(start.x, start.y + 40, 'START', '#b6d8db', 10);
      for (const checkpoint of course.checkpoints) {
        const point = p.point(checkpoint);
        g.lineStyle(2, 0xe0b468, 0.8).strokeCircle(point.x, point.y, p.length(checkpoint.radiusCm));
        g.lineBetween(point.x - 6, point.y, point.x + 6, point.y);
        g.lineBetween(point.x, point.y - 6, point.x, point.y + 6);
      }
      for (const rack of course.obstacles) {
        const point = p.point({ xCm: rack.xCm, yCm: rack.yCm + rack.heightCm });
        const w = p.length(rack.widthCm), h = p.length(rack.heightCm);
        g.fillStyle(0x040d16, 0.7).fillRoundedRect(point.x + 5, point.y + 8, w, h, 4);
        g.fillStyle(0x526d7b).fillRoundedRect(point.x, point.y, w, h, 3);
        g.lineStyle(2, 0x95b2bd).strokeRect(point.x, point.y, w, h);
        g.fillStyle(0x223846).fillRect(point.x + 4, point.y + 4, Math.max(0, w - 8), Math.max(0, h - 15));
        for (let x = 5; x + 27 < w; x += 34) {
          for (let y = 6; y + 29 < h - 20; y += 36) this.crate(g, point.x + x + 13, point.y + y + 13, 1);
        }
        for (let x = 0; x < w; x += 12) g.fillStyle(Math.floor(x / 12) % 2 ? 0x1c2a34 : 0xe5ac51)
          .fillRect(point.x + x, point.y + h - 7, Math.min(12, w - x), 7);
        this.label(point.x + w / 2, point.y + h - 20, rack.label, '#ecf4f6', 10);
      }
      for (const zone of course.deliveryZones) {
        const point = p.point({ xCm: zone.xCm + zone.widthCm / 2, yCm: zone.yCm + zone.heightCm });
        this.label(point.x, point.y - 14, zone.label, '#a4f7d2', 12);
      }
      for (const pkg of course.packages) {
        const point = p.point(pkg);
        this.label(point.x, point.y - 29, pkg.label, '#ffd68c', 11);
        this.packageLabels.set(pkg.id, this.labels[this.labels.length - 1]);
      }
    }

    private crate(g: Phaser.GameObjects.Graphics, x: number, y: number, scale: number): void {
      g.fillStyle(0x714321).fillRoundedRect(x - 13 * scale, y - 10 * scale, 26 * scale, 27 * scale, 2);
      g.fillStyle(0xdba459).fillRoundedRect(x - 13 * scale, y - 14 * scale, 26 * scale, 26 * scale, 2);
      g.lineStyle(scale, 0xffde9b).strokeRect(x - 12 * scale, y - 13 * scale, 24 * scale, 24 * scale);
      g.fillStyle(0x936137).fillRect(x - 3 * scale, y - 13 * scale, 6 * scale, 24 * scale);
      g.fillStyle(0xffeccb).fillRect(x + 4 * scale, y - 5 * scale, 6 * scale, 6 * scale);
    }

    private createRobot(): void {
      this.robot = this.add.container(0, 0).setDepth(5);
      const body = this.add.graphics();
      body.fillStyle(0x030a13, 0.5).fillEllipse(3, 8, 53, 53);
      body.fillStyle(0x071621).fillRoundedRect(-24, -17, 12, 38, 4).fillRoundedRect(12, -17, 12, 38, 4);
      body.lineStyle(1, 0x6b919d).strokeRoundedRect(-24, -17, 12, 38, 4).strokeRoundedRect(12, -17, 12, 38, 4);
      body.fillStyle(0x147f7c).fillRoundedRect(-17, -22, 34, 46, 10);
      body.fillStyle(0x3acdb3).fillRoundedRect(-15, -20, 7, 40, 5);
      body.fillStyle(0x096067).fillRoundedRect(10, -19, 5, 39, 3);
      body.lineStyle(2, 0x83f8de).strokeRoundedRect(-17, -22, 34, 46, 10);
      body.fillStyle(0xc4dfdb).fillRoundedRect(-14, -21, 28, 22, 8);
      body.fillStyle(0x0a2835).fillRoundedRect(-11, -17, 22, 11, 4);
      body.fillStyle(0x7bffe5).fillRoundedRect(-8, -14, 5, 4, 1).fillRoundedRect(3, -14, 5, 4, 1);
      body.fillStyle(0x153d49).fillRoundedRect(-10, 5, 20, 12, 2);
      body.lineStyle(1, 0x96e8dd, 0.65).lineBetween(-9, 6, 8, 6);
      body.fillStyle(0x8fffe1).fillCircle(0, 1, 2);
      body.lineStyle(2, 0x63ebce).lineBetween(-10, 20, 10, 20);
      body.fillStyle(0xffe5a5).fillRect(-15, -20, 4, 3).fillRect(11, -20, 4, 3);
      this.wheels = this.add.graphics();
      this.scanner = this.add.graphics();
      this.cargo = this.add.graphics();
      this.robot.add([this.scanner, body, this.wheels, this.cargo]);
    }

    private drawObjects(): void {
      const p = courseProjection(view.course);
      const g = this.objects.clear();
      for (const zone of view.course.deliveryZones) {
        const point = p.point({ xCm: zone.xCm, yCm: zone.yCm + zone.heightCm });
        const packages = view.course.packages.filter((pkg) => pkg.deliveryZoneId === zone.id);
        const complete = packages.length > 0 && packages.every((pkg) => view.sample?.deliveredPackageIds.includes(pkg.id));
        const w = p.length(zone.widthCm), h = p.length(zone.heightCm);
        g.fillStyle(complete ? 0x247d61 : 0x184c48, 0.8).fillRoundedRect(point.x, point.y, w, h, 5);
        g.lineStyle(2, complete ? 0xb1ffcb : 0x57d6a9).strokeRoundedRect(point.x, point.y, w, h, 5);
        g.lineStyle(1, 0x8ff1c1, 0.4).strokeRect(point.x + 7, point.y + 7, Math.max(0, w - 14), Math.max(0, h - 14));
        if (complete) {
          const cx = point.x + w / 2, cy = point.y + h / 2;
          g.lineStyle(4, 0xceffdf).lineBetween(cx - 10, cy, cx - 2, cy + 8).lineBetween(cx - 2, cy + 8, cx + 14, cy - 10);
        }
      }
      const target = view.course.targets[view.targetIndex] ?? view.course.targets[0];
      if (target) {
        const point = p.point(target);
        this.targetLabel.setVisible(true).setText(`PARK · ${target.label}`).setPosition(point.x, point.y - 58);
        g.fillStyle(0xf7b650, 0.09).fillCircle(point.x, point.y, 44);
        g.lineStyle(2, 0xffca6e).strokeCircle(point.x, point.y, p.length(view.course.toleranceCm));
        g.lineStyle(1, 0xffca6e, 0.4).strokeCircle(point.x, point.y, 28);
        g.lineStyle(2, 0xffe3a7).lineBetween(point.x - 9, point.y, point.x + 9, point.y)
          .lineBetween(point.x, point.y - 9, point.x, point.y + 9);
        const angle = Phaser.Math.DegToRad(target.headingDeg);
        g.lineBetween(point.x, point.y, point.x + Math.sin(angle) * 26, point.y - Math.cos(angle) * 26);
      } else this.targetLabel.setVisible(false);
      for (const pkg of view.course.packages) {
        const available = !view.sample?.carryingPackageIds.includes(pkg.id) && !view.sample?.deliveredPackageIds.includes(pkg.id);
        this.packageLabels.get(pkg.id)?.setVisible(available);
        if (!available) continue;
        const point = p.point(pkg);
        g.fillStyle(0x030c17, 0.55).fillEllipse(point.x + 2, point.y + 12, 36, 20);
        this.crate(g, point.x, point.y, 1);
      }
    }

    private drawRoute(): void {
      const g = this.route.clear();
      if (!view.showTrace) return;
      const p = courseProjection(view.course);
      const time = view.sample?.timeMs ?? 0;
      for (const [width, alpha] of [[9, 0.12], [2.5, 0.95]]) {
        g.lineStyle(width, 0x70f4df, alpha).beginPath();
        let started = false;
        for (const sample of view.samples) {
          if (sample.timeMs > time) break;
          const point = p.point(sample);
          if (!started) { g.moveTo(point.x, point.y); started = true; }
          else g.lineTo(point.x, point.y);
        }
        if (started && view.sample) {
          const point = p.point(view.sample);
          g.lineTo(point.x, point.y);
        }
        g.strokePath();
      }
    }

    private drawFeedback(): void {
      const time = view.sample?.timeMs ?? 0;
      const g = this.feedback.clear();
      const p = courseProjection(view.course);
      if (this.previousSamples !== view.samples || this.previousEvents !== view.events) {
        this.previousSamples = view.samples;
        this.previousEvents = view.events;
        this.previousTime = time;
        this.collisions = view.events.filter((event) => event.message.startsWith('Collision at '))
          .map((event) => ({ timeMs: event.timeMs, pose: sampleRobotReplay(view.samples, event.timeMs) ?? view.course.startPose }));
      }
      for (const collision of this.collisions) {
        if (collision.timeMs > time) continue;
        const point = p.point(collision.pose);
        g.lineStyle(3, 0xff7d76).strokeCircle(point.x, point.y, 20);
        g.lineBetween(point.x - 5, point.y - 5, point.x + 5, point.y + 5)
          .lineBetween(point.x + 5, point.y - 5, point.x - 5, point.y + 5);
        if (!view.reducedMotion && collision.timeMs > this.previousTime && time - this.previousTime < 250) {
          this.cameras.main.shake(100, 0.003);
        }
        const age = time - collision.timeMs;
        if (!view.reducedMotion && age < 600) {
          g.lineStyle(2, 0xffbf75, 1 - age / 600);
          for (let i = 0; i < 8; i++) {
            const angle = i * Math.PI / 4, radius = 22 + age / 20;
            g.lineBetween(point.x + Math.cos(angle) * radius, point.y + Math.sin(angle) * radius,
              point.x + Math.cos(angle) * (radius + 7), point.y + Math.sin(angle) * (radius + 7));
          }
        }
      }
      this.previousTime = time;
    }

    private applyCamera(): void {
      const camera = this.cameras.main;
      const p = courseProjection(view.course);
      const w = p.length(view.course.widthCm), h = p.length(view.course.heightCm);
      const zoom = Math.min(this.scale.width / (w + 100), this.scale.height / (h + 90)) * view.zoom;
      camera.setZoom(zoom);
      const position = view.follow ? p.point(view.sample ?? view.course.startPose) : { x: w / 2, y: h / 2 };
      // Clamp following to the world, retaining measurement margins at the edges.
      const halfW = this.scale.width / zoom / 2, halfH = this.scale.height / zoom / 2;
      camera.centerOn(
        halfW * 2 >= w + 100 ? w / 2 : Phaser.Math.Clamp(position.x, halfW - 50, w + 50 - halfW),
        halfH * 2 >= h + 90 ? h / 2 : Phaser.Math.Clamp(position.y, halfH - 45, h + 45 - halfH),
      );
    }

    private draw(): void {
      if (this.course !== view.course) this.buildCourse();
      this.drawObjects();
      this.drawRoute();
      this.drawFeedback();
      const p = courseProjection(view.course);
      const pose = view.sample ?? view.course.startPose;
      const position = p.point(pose);
      this.robot.setPosition(position.x, position.y).setAngle(pose.headingDeg);
      const time = view.sample?.timeMs ?? 0;
      const tread = view.reducedMotion ? 0 : (pose.xCm + pose.yCm + pose.headingDeg / 4) % 6;
      this.wheels.clear().lineStyle(1.5, 0x65838d);
      for (let y = -14 + tread; y < 18; y += 6) {
        this.wheels.lineBetween(-22, y, -15, y).lineBetween(15, y, 22, y);
      }
      this.scanner.clear().fillStyle(0x77f8df, 0.055).fillTriangle(-12, -18, -37, -85, 37, -85);
      const sweep = view.reducedMotion ? 0 : Math.sin(time / 450) * 25;
      this.scanner.lineStyle(1, 0x7beed8, 0.4).lineBetween(0, -20, sweep, -75);
      this.cargo.clear();
      if (view.sample?.carryingPackageIds.length) this.crate(this.cargo, 0, 10, 0.5);
      this.applyCamera();
      this.effects.draw(view, this.time.now);
      dirty = false;
    }

    override update(time: number): void {
      if (disposed || failed) return;
      try {
        if (dirty) this.draw();
        // Only the lightweight light layer ticks while idle; paused recorded runs stay still.
        if (!view.reducedMotion && !view.sample && time - this.lastEffectsTime >= 33) {
          this.effects.draw(view, time);
          this.lastEffectsTime = time;
        }
      } catch { fail(); }
    }
  }

  const contextLost = (event: Event) => { event.preventDefault(); fail(); };
  const game = new Phaser.Game({
    type: Phaser.AUTO,
    parent: host,
    width: Math.max(1, host.clientWidth),
    height: Math.max(1, host.clientHeight),
    backgroundColor: '#0b1927',
    banner: false,
    audio: { noAudio: true },
    render: { antialias: true, roundPixels: false },
    scale: { mode: Phaser.Scale.NONE },
    scene: [BootScene, CourseScene],
    callbacks: {
      postBoot: (bootedGame) => {
        if (!disposed) bootedGame.canvas.addEventListener('webglcontextlost', contextLost);
      },
    },
  });
  // The host can initially be hidden in the mobile workspace. Resize when its pane opens.
  const observer = new ResizeObserver(() => {
    if (disposed || !game.isBooted || !host.clientWidth || !host.clientHeight) return;
    game.scale.resize(host.clientWidth, host.clientHeight);
    dirty = true;
  });
  observer.observe(host);
  const timeout = window.setTimeout(() => { if (!ready) fail(); }, 10000);

  return {
    update(next): void { view = next; dirty = true; },
    destroy(): void {
      if (disposed) return;
      disposed = true;
      window.clearTimeout(timeout);
      observer.disconnect();
      game.canvas?.removeEventListener('webglcontextlost', contextLost);
      game.destroy(true);
    },
  };
}
