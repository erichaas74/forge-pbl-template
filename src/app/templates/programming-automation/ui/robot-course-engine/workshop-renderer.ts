import * as Phaser from 'phaser';
import { CameraDirector } from './camera-director';
import { GameFXSystem } from './game-fx-system';
import { GameHUD } from './game-hud';
import { SceneArtSystem } from './scene-art-system';
import { GAME_ASSETS, SCENE_DEPTH } from './scene-assets';
import { courseProjection, type RobotCourseRenderer, type RobotCourseView } from './robot-course-view';
import { workshopStatus } from './workshop-presentation';

/** Pure recorded-state presentation. Execution, collision detection, and scoring stay upstream. */
export function createWorkshopRenderer(
  host: HTMLElement, initial: RobotCourseView, onReady: () => void, onFailed: () => void,
): RobotCourseRenderer {
  let view = initial, disposed = false, failed = false, ready = false;
  let dirty = true;
  const fail = () => { if (!disposed && !failed) { failed = true; onFailed(); } };

  class WorkshopScene extends Phaser.Scene {
    private art!: SceneArtSystem;
    private fx!: GameFXSystem;
    private hud!: GameHUD;
    private director!: CameraDirector;
    private hudCamera!: Phaser.Cameras.Scene2D.Camera;
    private worldCamera!: Phaser.Cameras.Scene2D.Camera;
    private route!: Phaser.GameObjects.Graphics;
    private previous?: RobotCourseView;
    private completed = false;
    constructor() { super('workshop'); }
    preload(): void {
      this.load.on('loaderror', fail);
      for (const asset of Object.values(GAME_ASSETS)) this.load.image(asset.key, asset.url);
    }
    create(): void {
      if (failed) return;
      try {
        this.art = new SceneArtSystem(this, view);
        this.route = this.add.graphics().setDepth(SCENE_DEPTH.surface + 1);
        this.fx = new GameFXSystem(this);
        this.art.world.add([this.route, this.fx.layer]).sort('depth');
        this.hud = new GameHUD(this);
        this.previous = undefined;
        this.completed = false;
        this.cameras.main.ignore([this.hud.layer, this.art.world, this.art.foreground]);
        this.worldCamera = this.cameras.add(0, 64, this.scale.width, this.scale.height - 108);
        this.worldCamera.ignore([this.hud.layer, this.art.backdrop, this.art.foreground]);
        this.director = new CameraDirector(this.worldCamera);
        this.hudCamera = this.cameras.add(0, 0, this.scale.width, this.scale.height);
        this.hudCamera.ignore([this.art.world, this.art.backdrop]);
        ready = true;
        dirty = true;
        this.renderView(this.time.now);
        onReady();
      } catch { fail(); }
    }
    private renderView(now: number): void {
      const p = courseProjection(view.course);
      const status = workshopStatus(view);
      const time = view.sample?.timeMs ?? 0;
      const oldTime = this.previous?.sample?.timeMs ?? 0;
      const newRun = this.previous?.samples !== view.samples;
      const seek = time < oldTime || time - oldTime > 300;
      const targetChanged = this.previous?.targetIndex !== view.targetIndex;
      if (this.previous && (this.previous.follow !== view.follow || this.previous.overview !== view.overview || this.previous.zoom !== view.zoom)) {
        this.director.returnToGameplayView();
      }
      if (newRun || seek || targetChanged) {
        this.fx.clear(); this.director.returnToGameplayView(); this.completed = false;
      }
      const target = view.course.targets[view.targetIndex];
      if (targetChanged && target) this.fx.select(p.point(target), now);
      if (status.finished && !this.completed && !newRun && !seek) {
        const point = p.point(view.sample ?? view.course.startPose);
        if (status.success) {
          this.fx.success(point, now);
          if (!view.reducedMotion && !view.overview) this.director.focusOnObject(point, now + 1000);
        } else this.fx.failure(point, now);
      }
      this.completed = status.finished;
      if (!newRun && !seek && time > oldTime && view.events.some(event =>
        event.timeMs > oldTime && event.timeMs <= time && event.message.startsWith('Collision at '))) {
        this.fx.collision(p.point(view.sample ?? view.course.startPose), now);
        this.director.impact(view.reducedMotion);
      }
      this.route.clear();
      if (view.showTrace && view.sample) {
        this.route.lineStyle(2, 0xc7ffe7, 0.8).beginPath();
        let started = false;
        for (const sample of view.samples) {
          if (sample.timeMs > time) break;
          const point = p.point(sample);
          if (!started) { this.route.moveTo(point.x, point.y); started = true; }
          else this.route.lineTo(point.x, point.y);
        }
        if (started) { const point = p.point(view.sample); this.route.lineTo(point.x, point.y); }
        this.route.strokePath();
      }
      this.art.update(view, status.success);
      this.art.resize(this.scale.width, this.scale.height);
      this.hud.update(view, this.scale.width, this.scale.height);
      this.hudCamera.setSize(this.scale.width, this.scale.height);
      this.previous = view;
      dirty = false;
    }
    override update(now: number, delta: number): void {
      if (!ready || failed || disposed) return;
      try {
        if (dirty) this.renderView(now);
        // Camera interpolation and bounded feedback continue after the last replay sample.
        this.director.update(view, this.scale.width, this.scale.height, delta, now);
        this.fx.update(now, view.reducedMotion);
        if (!view.sample && !view.reducedMotion) this.art.update(view, false);
      } catch { fail(); }
    }
  }
  const contextLost = (event: Event) => { event.preventDefault(); fail(); };
  const game = new Phaser.Game({
    type: Phaser.AUTO, parent: host,
    width: Math.max(1, host.clientWidth), height: Math.max(1, host.clientHeight),
    backgroundColor: '#142d2c', banner: false, audio: { noAudio: true },
    fps: { target: 30 }, render: { antialias: true }, scale: { mode: Phaser.Scale.NONE },
    scene: [WorkshopScene], callbacks: { postBoot: booted => {
      if (!disposed) booted.canvas.addEventListener('webglcontextlost', contextLost);
    } },
  });
  const observer = new ResizeObserver(() => {
    if (disposed || !game.isBooted || !host.clientWidth || !host.clientHeight) return;
    game.scale.resize(host.clientWidth, host.clientHeight); dirty = true;
  });
  observer.observe(host);
  const timeout = window.setTimeout(() => { if (!ready) fail(); }, 15000);
  return {
    update(next): void {
      if (view.course !== next.course && ready) {
        view = next;
        ready = false;
        game.scene.getScene('workshop').scene.restart();
      } else view = next;
      dirty = true;
    },
    destroy(): void {
      if (disposed) return;
      disposed = true; window.clearTimeout(timeout); observer.disconnect();
      game.canvas?.removeEventListener('webglcontextlost', contextLost); game.destroy(true);
    },
  };
}
