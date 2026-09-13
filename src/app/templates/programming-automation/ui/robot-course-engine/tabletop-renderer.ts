import * as Phaser from 'phaser';
import { sampleCourseActor } from '../../core/course-actors';
import { BOARD_RIM, boardText, buildTabletopBoard, markedZone } from './tabletop-board';
import { drawCrate, drawSteelBlock, drawTabletopRobot } from './tabletop-props';
import {
  courseProjection,
  type RobotCourseRenderer,
  type RobotCourseView,
} from './robot-course-view';

/** Phaser owns the canvas and drawing. The shared simulation owns movement and collisions. */
export function createTabletopRenderer(
  host: HTMLElement,
  initial: RobotCourseView,
  onReady: () => void,
  onFailed: () => void,
): RobotCourseRenderer {
  let view = initial,
    disposed = false,
    failed = false,
    ready = false,
    dirty = true;
  const fail = () => {
    if (!disposed && !failed) {
      failed = true;
      onFailed();
    }
  };
  class TabletopScene extends Phaser.Scene {
    private objects!: Phaser.GameObjects.Graphics;
    private route!: Phaser.GameObjects.Graphics;
    private robot!: Phaser.GameObjects.Graphics;
    private goal!: Phaser.GameObjects.Graphics;
    private goalLabel!: Phaser.GameObjects.Text;
    private actors: Phaser.GameObjects.Graphics[] = [];
    private previewOrigin = 0;
    constructor() {
      super('tabletop');
    }
    create(): void {
      try {
        buildTabletopBoard(this, view.course);
        this.goal = this.add.graphics().setDepth(2);
        this.goalLabel = boardText(this, 0, 0, 'GOAL', 12).setDepth(3);
        this.route = this.add.graphics().setDepth(3);
        this.objects = this.add.graphics().setDepth(4);
        this.actors = (view.course.actors ?? []).map(() => this.add.graphics().setDepth(5));
        this.robot = this.add.graphics().setDepth(6);
        this.previewOrigin = this.time.now;
        ready = true;
        dirty = true;
        this.renderView(this.time.now);
        onReady();
      } catch {
        fail();
      }
    }
    private renderView(now: number): void {
      const course = view.course,
        p = courseProjection(course);
      const w = p.length(course.widthCm),
        h = p.length(course.heightCm);
      const time = view.sample?.timeMs ?? (view.reducedMotion ? 0 : now - this.previewOrigin);
      const pose = view.sample ?? course.startPose,
        position = p.point(pose);
      const target = p.point(course.targets[view.targetIndex] ?? course.targets[0]);
      const size = Math.min(58, p.length(course.gridSizeCm) * 0.8);
      const finished =
        !!view.sample &&
        !!view.result &&
        view.sample.timeMs >= (view.samples.at(-1)?.timeMs ?? Infinity);
      const success = finished && view.result!.completedMission;
      this.goal.clear();
      markedZone(
        this.goal,
        target.x - size / 2,
        target.y - size / 2,
        size,
        size,
        success ? 0x3c7d5d : 0x6b8050,
      );
      this.goal
        .fillStyle(0x4b6240)
        .fillTriangle(target.x, target.y - 12, target.x - 7, target.y, target.x + 7, target.y);
      this.goalLabel.setPosition(target.x, target.y + 11).setText(success ? 'DONE' : 'GOAL');
      this.goal
        .lineStyle(1.5, 0x4a715b, 0.6)
        .strokeCircle(target.x, target.y, p.length(course.toleranceCm));
      if (!view.reducedMotion && !finished) {
        this.goal
          .lineStyle(1, 0x5e8052, 0.16 + Math.sin(time / 700) * 0.08)
          .strokeRect(target.x - size / 2 - 4, target.y - size / 2 - 4, size + 8, size + 8);
      }
      this.route.clear();
      let distance = 0,
        previous = course.startPose;
      if (view.showTrace && view.sample)
        this.route
          .lineStyle(3, 0x397c91, 0.75)
          .beginPath()
          .moveTo(p.point(previous).x, p.point(previous).y);
      for (const sample of view.samples) {
        if (!view.sample || sample.timeMs > view.sample.timeMs) break;
        distance += Math.hypot(sample.xCm - previous.xCm, sample.yCm - previous.yCm);
        previous = sample;
        if (view.showTrace) {
          const point = p.point(sample);
          this.route.lineTo(point.x, point.y);
        }
      }
      distance += Math.hypot(pose.xCm - previous.xCm, pose.yCm - previous.yCm);
      if (view.showTrace && view.sample) this.route.lineTo(position.x, position.y).strokePath();
      this.objects.clear();
      for (const pkg of course.packages) {
        if (
          view.sample?.carryingPackageIds.includes(pkg.id) ||
          view.sample?.deliveredPackageIds.includes(pkg.id)
        )
          continue;
        const point = p.point(pkg);
        drawCrate(this.objects, point.x - 15, point.y - 15, 30);
      }
      for (const zone of course.deliveryZones) {
        const packages = course.packages.filter((pkg) => pkg.deliveryZoneId === zone.id);
        if (
          packages.length &&
          packages.every((pkg) => view.sample?.deliveredPackageIds.includes(pkg.id))
        ) {
          const point = p.point({
            xCm: zone.xCm + zone.widthCm / 2,
            yCm: zone.yCm + zone.heightCm / 2,
          });
          this.objects
            .lineStyle(3, 0x2e7852)
            .lineBetween(point.x - 6, point.y, point.x - 1, point.y + 5)
            .lineBetween(point.x - 1, point.y + 5, point.x + 8, point.y - 7);
        }
      }
      (course.actors ?? []).forEach((actor, index) => {
        const state = sampleCourseActor(actor, time),
          point = p.point(state),
          g = this.actors[index];
        g.clear().setPosition(point.x, point.y);
        if (actor.kind === 'robot') {
          drawTabletopRobot(
            g,
            p.length(actor.radiusCm),
            view.reducedMotion || !state.moving ? 0 : time / 100,
            true,
          );
          g.setAngle(state.headingDeg);
        } else
          drawSteelBlock(
            g,
            -p.length(actor.widthCm) / 2,
            -p.length(actor.heightCm) / 2,
            p.length(actor.widthCm),
            p.length(actor.heightCm),
            true,
          );
      });
      drawTabletopRobot(
        this.robot,
        p.length(view.robotRadiusCm ?? 8),
        view.reducedMotion ? 0 : distance / 2,
        false,
        !!view.sample?.carryingPackageIds.length,
      );
      this.robot.setPosition(position.x, position.y).setAngle(pose.headingDeg);
      if (finished)
        this.objects
          .lineStyle(3, success ? 0x4c8c62 : 0xb65b45, 0.9)
          .strokeCircle(position.x, position.y, 24);
      const fit = Math.min(
        this.scale.width / (w + (BOARD_RIM + 12) * 2),
        this.scale.height / (h + (BOARD_RIM + 12) * 2),
      );
      this.cameras.main
        .setZoom(fit * view.zoom)
        .centerOn(view.follow ? position.x : w / 2, view.follow ? position.y : h / 2);
      dirty = false;
    }
    override update(now: number): void {
      if (!ready || failed || disposed) return;
      try {
        if (dirty || (!view.sample && !view.reducedMotion)) this.renderView(now);
      } catch {
        fail();
      }
    }
  }
  const lost = (event: Event) => {
    event.preventDefault();
    fail();
  };
  const game = new Phaser.Game({
    type: Phaser.AUTO,
    parent: host,
    width: Math.max(1, host.clientWidth),
    height: Math.max(1, host.clientHeight),
    backgroundColor: '#bebeb0',
    banner: false,
    audio: { noAudio: true },
    fps: { target: 30 },
    render: { antialias: true },
    scale: { mode: Phaser.Scale.NONE },
    scene: [TabletopScene],
    callbacks: {
      postBoot: (booted) => {
        if (!disposed) booted.canvas.addEventListener('webglcontextlost', lost);
      },
    },
  });
  const observer = new ResizeObserver(() => {
    if (disposed || !game.isBooted || !host.clientWidth || !host.clientHeight) return;
    game.scale.resize(host.clientWidth, host.clientHeight);
    dirty = true;
  });
  observer.observe(host);
  const timeout = window.setTimeout(() => {
    if (!ready) fail();
  }, 15000);
  return {
    update(next): void {
      const changed = view.course !== next.course;
      view = next;
      if (changed && ready) {
        ready = false;
        game.scene.getScene('tabletop').scene.restart();
      }
      dirty = true;
    },
    destroy(): void {
      if (disposed) return;
      disposed = true;
      window.clearTimeout(timeout);
      observer.disconnect();
      game.canvas?.removeEventListener('webglcontextlost', lost);
      game.destroy(true);
    },
  };
}
