import * as Phaser from 'phaser';
import { createTownArt, createWagonArt } from './route-canvas-art';
import {
  canvasCamera,
  clampProgress,
  confirmedTravelSegment,
  pointOnTrail,
  routeDrawingChanged,
  type CanvasTrail,
  type RouteCanvasCallbacks,
  type RouteCanvasController,
  type RouteCanvasSnapshot,
  type RouteCanvasViewport,
  type RoutePoint,
  type RouteCanvasCue,
} from './route-canvas.models';

/** Loaded only when an atlas is mounted. All coordinates derive from the atlas paths. */
export function createRouteCanvas(
  host: HTMLElement,
  initial: RouteCanvasSnapshot,
  initialViewport: RouteCanvasViewport,
  callbacks: RouteCanvasCallbacks,
): RouteCanvasController {
  let latest = initial;
  let viewport = initialViewport;
  let disposed = false;
  let ready = false;
  let failed = false;

  class RouteWorld extends Phaser.Scene {
    private ground!: Phaser.GameObjects.Graphics;
    private routes!: Phaser.GameObjects.Graphics;
    private atmosphere!: Phaser.GameObjects.Graphics;
    private weather!: Phaser.GameObjects.Graphics;
    private towns = new Map<string, { kind: string; art: Phaser.GameObjects.Container }>();
    private wheelSets = new WeakMap<
      Phaser.GameObjects.Container,
      readonly Phaser.GameObjects.Graphics[]
    >();
    private feedback!: Phaser.GameObjects.Graphics;
    private wagon!: Phaser.GameObjects.Container;
    private scout!: Phaser.GameObjects.Container;
    private background?: Phaser.GameObjects.Image;
    private previous?: RouteCanvasSnapshot;
    private travelTween?: Phaser.Tweens.Tween;
    private previewTween?: Phaser.Tweens.Tween;
    private progress = { value: 0 };
    private scouting = { value: 0 };
    private movingRoute?: CanvasTrail;
    private previewRoute?: CanvasTrail;
    private previewId = '';
    private appliedAsset?: string;
    private checkpointLabels: Phaser.GameObjects.Text[] = [];
    private milestone!: Phaser.GameObjects.Container;
    private milestoneText!: Phaser.GameObjects.Text;
    private milestoneSign!: Phaser.GameObjects.Graphics;
    private cue?: RouteCanvasCue;
    private cuePoint: RoutePoint = { x: 0, y: 0 };
    private burstStarted?: number;
    private pendingCue?: RouteCanvasCue;
    private wheels: Phaser.GameObjects.Graphics[] = [];
    private fleet = new Map<
      string,
      {
        wagon: Phaser.GameObjects.Container;
        label: Phaser.GameObjects.Text;
        progress: { value: number };
        target: number;
        route: CanvasTrail;
        tween?: Phaser.Tweens.Tween;
      }
    >();
    private clearBackgroundLoad?: () => void;

    constructor() {
      super('route-world');
    }

    create(): void {
      this.cameras.main.setBackgroundColor('#302b22');
      this.ground = this.add.graphics().setDepth(0);
      this.ground.fillStyle(0xd2c08e).fillRect(0, 0, 1000, 800);
      this.ground.lineStyle(1, 0x7f704e, 0.18);
      for (let x = 0; x <= 1000; x += 50) this.ground.lineBetween(x, 0, x, 800);
      for (let y = 0; y <= 800; y += 50) this.ground.lineBetween(0, y, 1000, y);
      this.atmosphere = this.add.graphics().setDepth(2);
      this.weather = this.add.graphics().setDepth(5);
      this.routes = this.add.graphics().setDepth(3);
      this.feedback = this.add.graphics().setDepth(4);
      this.wagon = this.makeWagon(false).setDepth(6);
      this.scout = this.makeWagon(true).setDepth(7).setVisible(false);
      this.milestoneSign = this.add.graphics();
      this.milestoneText = this.add
        .text(0, -67, '', {
          fontFamily: 'Arial',
          fontSize: '17px',
          fontStyle: 'bold',
          color: '#fff1c8',
          backgroundColor: '#292016',
          padding: { x: 10, y: 7 },
        })
        .setOrigin(0.5);
      this.milestone = this.add
        .container(0, 0, [this.milestoneSign, this.milestoneText])
        .setDepth(8)
        .setVisible(false);
      ready = true;
      this.scale.resize(Math.max(1, viewport.width), Math.max(1, viewport.height));
      this.applySnapshot();
      this.applyCamera();
      if (!latest.backgroundAsset) callbacks.ready();
    }

    applyCamera(): void {
      const camera = canvasCamera(viewport);
      this.cameras.main
        .setViewport(0, 0, camera.width, camera.height)
        .setZoom(camera.zoomX, camera.zoomY)
        .centerOn(camera.x, camera.y);
    }

    applySnapshot(): void {
      const segment = confirmedTravelSegment(this.previous, latest);
      const changedTravel =
        latest.travel?.routeId !== this.previous?.travel?.routeId ||
        latest.travel?.progress !== this.previous?.travel?.progress ||
        latest.cue?.journeyId !== this.previous?.cue?.journeyId ||
        latest.currentLocationId !== this.previous?.currentLocationId;
      if (changedTravel || !latest.motion || !this.previous) {
        const displayedProgress =
          this.movingRoute?.id === segment?.routeId ? this.progress.value : undefined;
        this.travelTween?.stop();
        this.movingRoute = undefined;
        if (segment) {
          this.movingRoute = latest.trails.find((trail) => trail.id === segment.routeId);
          // A newer confirmed day can arrive before the last visual transition finishes.
          this.progress.value = displayedProgress ?? segment.from;
          this.travelTween = this.tweens.add({
            targets: this.progress,
            value: segment.to,
            duration: 1100,
            ease: 'Sine.easeInOut',
            onComplete: () => {
              this.wagon.setPosition(latest.companyPosition.x * 10, latest.companyPosition.y * 10);
              this.movingRoute = undefined;
              if (this.pendingCue && this.pendingCue.id === latest.cue?.id)
                this.showCue(this.pendingCue, true);
              this.pendingCue = undefined;
            },
          });
        }
      }
      if (this.movingRoute) {
        this.movingRoute = latest.trails.find(
          (trail) => trail.id === this.movingRoute?.id && trail.points.length >= 2,
        );
        if (!this.movingRoute) this.travelTween?.stop();
      }
      const position = this.movingRoute
        ? pointOnTrail(this.movingRoute.points, this.progress.value)
        : latest.companyPosition;
      this.wagon.setPosition(position.x * 10, position.y * 10);
      this.loadBackground();
      this.background?.setVisible(latest.scenery);
      if (routeDrawingChanged(this.previous, latest)) this.drawRoutes();
      this.applyCue();
      this.applyWorld();
      this.applyTowns();
      const canPreview =
        latest.motion &&
        !latest.travel &&
        latest.trails.some(
          (trail) =>
            trail.id === latest.previewRouteId &&
            trail.state === 'available' &&
            trail.points.length >= 2,
        );
      const previewId = canPreview ? latest.previewRouteId : '';
      if (previewId !== this.previewId) {
        this.previewId = previewId;
        this.previewTween?.stop();
        this.previewRoute = latest.trails.find((trail) => trail.id === previewId);
        this.scout.setVisible(!!this.previewRoute);
        if (this.previewRoute) {
          this.scouting.value = 0;
          this.previewTween = this.tweens.add({
            targets: this.scouting,
            value: 1,
            duration: Math.min(9000, Math.max(3500, this.previewRoute.days * 1400)),
            ease: 'Linear',
            onComplete: () => {
              this.scout.setVisible(false);
              this.previewRoute = undefined;
              callbacks.previewEnded();
            },
          });
        }
      }
      this.previous = latest;
    }

    private applyTowns(): void {
      const towns = latest.towns ?? [];
      for (const [id, town] of this.towns) {
        if (!towns.some((item) => item.id === id && item.kind === town.kind)) {
          town.art.destroy();
          this.towns.delete(id);
        }
      }
      for (const town of towns) {
        let entry = this.towns.get(town.id);
        if (!entry) {
          entry = { kind: town.kind, art: createTownArt(this, town.kind).setDepth(4.5) };
          this.towns.set(town.id, entry);
        }
        entry.art
          .setPosition(town.x * 10, town.y * 10)
          .setAlpha(town.id === latest.currentLocationId ? 1 : 0.95);
      }
    }

    private applyCue(): void {
      const cue = latest.cue;
      if (!latest.motion) {
        this.burstStarted = undefined;
        this.pendingCue = undefined;
      }
      if (!cue) {
        this.cue = undefined;
        this.pendingCue = undefined;
        this.milestone.setVisible(false);
        return;
      }
      const changed = cue.id !== this.previous?.cue?.id;
      // Mounts/restores explain the saved state without replaying celebrations.
      const before = this.previous?.cue;
      const sameJourney = before?.journeyId === cue.journeyId;
      const confirmedMilestone =
        cue.kind === 'departure'
          ? !this.previous?.travel && !!latest.travel && cue.progress === 0
          : sameJourney &&
            before?.kind !== 'paused' &&
            (cue.kind === 'event' ||
              cue.kind === 'arrival' ||
              (cue.kind === 'checkpoint' && cue.progress > (before?.progress ?? 0)));
      const animate = !!this.previous && changed && latest.motion && confirmedMilestone;
      if (animate && this.movingRoute) {
        this.pendingCue = cue;
        this.milestone.setVisible(false);
        this.burstStarted = undefined;
      } else if (!this.movingRoute) {
        this.showCue(cue, animate);
      }
    }

    private applyWorld(): void {
      const freight = latest.world?.freight ?? [];
      for (const [id, vehicle] of this.fleet) {
        if (!freight.some((item) => item.id === id)) {
          vehicle.tween?.stop();
          vehicle.wagon.destroy();
          vehicle.label.destroy();
          this.fleet.delete(id);
        }
      }
      for (const shipment of freight) {
        const trail = latest.trails.find((item) => item.id === shipment.routeId);
        if (!trail?.points.length) continue;
        let vehicle = this.fleet.get(shipment.id);
        if (!vehicle) {
          vehicle = {
            wagon: this.makeWagon(true).setDepth(5).setScale(0.58).setAlpha(1),
            label: this.add
              .text(0, 0, shipment.name, {
                fontFamily: 'Arial',
                fontSize: '12px',
                color: '#d9fcf0',
                backgroundColor: '#203e38',
                padding: { x: 4, y: 2 },
              })
              .setOrigin(0.5, 0)
              .setDepth(5),
            progress: { value: shipment.progress },
            target: shipment.progress,
            route: trail,
          };
          this.fleet.set(shipment.id, vehicle);
        }
        vehicle.route = trail;
        if (vehicle.target !== shipment.progress || !latest.motion || !latest.world?.running) {
          vehicle.tween?.stop();
          const direction = shipment.progress < vehicle.progress.value ? -1 : 1;
          vehicle.wagon.setScale(direction * 0.58, 0.58);
          vehicle.target = shipment.progress;
          if (
            latest.motion &&
            latest.world?.running &&
            this.previous?.world &&
            latest.world.tick > this.previous.world.tick
          ) {
            vehicle.tween = this.tweens.add({
              targets: vehicle.progress,
              value: shipment.progress,
              duration: 2200,
              ease: 'Sine.easeInOut',
            });
          } else vehicle.progress.value = shipment.progress;
        }
        const point = pointOnTrail(trail.points, vehicle.progress.value);
        vehicle.wagon.setPosition(point.x * 10, point.y * 10);
        vehicle.label.setPosition(point.x * 10, point.y * 10 + 25);
      }
    }

    private drawWorld(time: number): void {
      for (const vehicle of this.fleet.values()) {
        const point = pointOnTrail(vehicle.route.points, vehicle.progress.value);
        vehicle.wagon.setPosition(point.x * 10, point.y * 10);
        for (const wheel of this.wheelSets.get(vehicle.wagon) ?? [])
          wheel.setRotation(vehicle.progress.value * 70);
        vehicle.label.setPosition(point.x * 10, point.y * 10 + 25);
        if (
          latest.motion &&
          latest.world?.running &&
          Math.abs(vehicle.progress.value - vehicle.target) > 0.001
        )
          this.drawDust(this.feedback, point, time, 0xa1e0dc, vehicle.wagon.scaleX < 0 ? -1 : 1);
      }
      const air = this.weather;
      const clock = latest.motion && latest.world?.running ? time : 0;
      for (const condition of latest.world?.conditions ?? []) {
        for (const point of condition.locations) {
          const x = point.x * 10,
            y = point.y * 10;
          if (condition.kind === 'winter-storm') {
            air.fillStyle(0xcfe3ed, 0.25).fillEllipse(x, y - 15, 220, 140);
            for (let cloud = 0; cloud < 4; cloud++)
              air
                .fillStyle(cloud % 2 ? 0xabbcc2 : 0xd4dddb, 0.58)
                .fillEllipse(
                  x - 64 + cloud * 40 + Math.sin(clock / 2400) * 7,
                  y - 62 - (cloud % 2) * 15,
                  95,
                  40,
                );
            for (let i = 0; i < 26; i++) {
              const dx = ((i * 31 + clock / 110) % 190) - 95,
                dy = ((clock / 45 + i * 13) % 150) - 65;
              air.fillStyle(0xffffff, 0.9).fillCircle(x + dx, y + dy, 2.4);
            }
          } else if (condition.kind === 'flood') {
            air.fillStyle(0x349cca, 0.24).fillEllipse(x, y + 15, 165, 100);
            for (let i = 0; i < 3; i++)
              air
                .lineStyle(3, 0x9ee3f8, 0.6)
                .strokeEllipse(x, y + 15, 90 + i * 25 + Math.sin(clock / 550) * 6, 30 + i * 20);
          } else {
            air.fillStyle(0xb87139, 0.22).fillCircle(x, y, 68);
            air
              .lineStyle(4, 0xffd28a, 0.85)
              .strokeTriangle(x, y - 65, x - 17, y - 36, x + 17, y - 36);
          }
        }
      }
    }

    private showCue(cue: RouteCanvasCue, animate: boolean): void {
      this.cue = cue;
      const trail = latest.trails.find((item) => item.id === cue.routeId);
      this.cuePoint = trail?.points.length
        ? pointOnTrail(trail.points, cue.progress)
        : latest.companyPosition;
      const color =
        cue.kind === 'event'
          ? 0xffb477
          : cue.kind === 'arrival' || cue.kind === 'checkpoint'
            ? 0x91e6c2
            : 0xffdf83;
      const sign = this.milestoneSign.clear();
      sign.lineStyle(3, 0x32261b).lineBetween(0, -48, 0, -14);
      sign.fillStyle(color).fillTriangle(1, -48, 23, -39, 1, -30);
      this.milestoneText.setText(cue.label);
      this.milestone
        .setPosition(
          Math.max(100, Math.min(900, this.cuePoint.x * 10)),
          Math.max(95, this.cuePoint.y * 10),
        )
        .setVisible(true);
      if (animate) this.burstStarted = this.time.now;
    }

    private loadBackground(): void {
      if (this.appliedAsset === latest.backgroundAsset) return;
      this.clearBackgroundLoad?.();
      this.appliedAsset = latest.backgroundAsset;
      this.background?.destroy();
      this.background = undefined;
      const asset = latest.backgroundAsset;
      if (!asset) {
        if (!failed) callbacks.ready();
        return;
      }
      const key = `landscape:${asset}`;
      const show = () => {
        if (disposed || asset !== latest.backgroundAsset) return;
        this.clearBackgroundLoad?.();
        this.background = this.add
          .image(500, 400, key)
          .setDepth(1)
          .setTint(0xe0e4cf)
          .setVisible(latest.scenery);
        this.background.setScale(
          Math.min(1000 / this.background.width, 800 / this.background.height),
        );
        if (!failed) callbacks.ready();
      };
      if (this.textures.exists(key)) show();
      else {
        const onError = (file: Phaser.Loader.File) => {
          if (disposed || file.key !== key || asset !== latest.backgroundAsset) return;
          this.clearBackgroundLoad?.();
          failed = true;
          callbacks.failed();
        };
        this.clearBackgroundLoad = () => {
          this.load.off(`filecomplete-image-${key}`, show);
          this.load.off('loaderror', onError);
          this.clearBackgroundLoad = undefined;
        };
        this.load.once(`filecomplete-image-${key}`, show);
        this.load.on('loaderror', onError);
        this.load.image(key, asset);
        this.load.start();
      }
    }

    private drawRoutes(): void {
      const g = this.routes.clear();
      for (const label of this.checkpointLabels) label.destroy();
      this.checkpointLabels = [];
      for (const trail of latest.trails) {
        const selected = trail.id === latest.selectedRouteId;
        const active = trail.state === 'traveling';
        const muted = trail.state === 'inactive' || trail.state === 'locked';
        const color =
          trail.state === 'unavailable'
            ? 0xd9907d
            : trail.state === 'completed'
              ? 0xb5d19c
              : selected || active
                ? 0xffdf83
                : 0xe5d4a3;
        if (selected || active || trail.compared) {
          this.strokeTrail(g, trail.points, 17, active ? 0x72dace : 0xffc95f, 0.12);
          this.strokeTrail(g, trail.points, 10, active ? 0x72dace : 0xffc95f, 0.2);
        }
        this.strokeTrail(g, trail.points, 6, 0x221c13, muted ? 0.16 : 0.72);
        g.lineStyle(selected || active ? 3 : 2.2, color, muted ? 0.25 : 0.95);
        const points = trail.points;
        for (let i = 1; i < points.length; i++) {
          if (!selected && !active && i % (muted ? 5 : 4) >= 2) continue;
          g.lineBetween(
            points[i - 1]!.x * 10,
            points[i - 1]!.y * 10,
            points[i]!.x * 10,
            points[i]!.y * 10,
          );
        }
        if (active && latest.travel) {
          const progress = clampProgress(latest.travel.progress);
          const complete = points.slice(0, Math.floor(progress * (points.length - 1)) + 1);
          this.strokeTrail(g, [...complete, pointOnTrail(points, progress)], 4, 0x8ee7cc, 1);
        }
        if (selected || active) {
          for (let day = 1; day < trail.days; day++) {
            const point = pointOnTrail(points, day / trail.days);
            const reached =
              trail.state === 'completed' ||
              (active && day / trail.days <= (latest.travel?.progress ?? 0));
            g.fillStyle(reached ? 0x9de2c2 : 0xffefb5).fillCircle(point.x * 10, point.y * 10, 16.5);
            g.lineStyle(4, 0x7d5019).strokeCircle(point.x * 10, point.y * 10, 16.5);
            this.checkpointLabels.push(
              this.add
                .text(point.x * 10, point.y * 10, reached ? '✓' : String(day), {
                  fontFamily: 'Arial',
                  fontSize: '18px',
                  fontStyle: 'bold',
                  color: '#402b15',
                })
                .setOrigin(0.5)
                .setDepth(5),
            );
          }
        }
      }
    }

    private strokeTrail(
      g: Phaser.GameObjects.Graphics,
      points: readonly RoutePoint[],
      width: number,
      color: number,
      alpha: number,
    ): void {
      if (!points.length) return;
      g.lineStyle(width, color, alpha)
        .beginPath()
        .moveTo(points[0]!.x * 10, points[0]!.y * 10);
      for (const point of points.slice(1)) g.lineTo(point.x * 10, point.y * 10);
      g.strokePath();
    }

    private makeWagon(preview: boolean): Phaser.GameObjects.Container {
      const art = createWagonArt(this, preview);
      this.wheelSets.set(art.container, art.wheels);
      if (!preview) this.wheels = art.wheels;
      return art.container;
    }
    override update(time: number): void {
      if (disposed) return;
      const fx = this.feedback.clear();
      const air = this.atmosphere.clear();
      this.weather.clear();
      this.drawWorld(time);
      if (this.movingRoute) {
        const point = pointOnTrail(this.movingRoute.points, this.progress.value);
        const ahead = pointOnTrail(
          this.movingRoute.points,
          Math.min(1, this.progress.value + 0.01),
        );
        const direction = ahead.x < point.x ? -1 : 1;
        this.wagon
          .setScale(direction, 1)
          .setPosition(point.x * 10, point.y * 10 + Math.sin(time / 75) * 1.8);
        for (const wheel of this.wheels) wheel.setRotation(this.progress.value * 60);
        this.drawDust(fx, point, time, 0xe4d09a, direction);
      }
      if (this.previewRoute) {
        const point = pointOnTrail(this.previewRoute.points, this.scouting.value);
        this.scout.setPosition(point.x * 10, point.y * 10);
        for (const wheel of this.wheelSets.get(this.scout) ?? [])
          wheel.setRotation(this.scouting.value * 70);
        this.drawDust(fx, point, time, 0x96efe4);
      }
      if (!latest.motion) return;
      if (this.burstStarted !== undefined && this.cue) {
        const age = (time - this.burstStarted) / 1100;
        if (age >= 1) this.burstStarted = undefined;
        else {
          const color = this.cue.kind === 'event' ? 0xffb477 : 0xaff0cc;
          const x = this.cuePoint.x * 10;
          const y = this.cuePoint.y * 10;
          fx.lineStyle(4 * (1 - age), color, 1 - age).strokeCircle(x, y, 25 + age * 65);
          for (let i = 0; i < 10; i++) {
            const angle = (i * Math.PI) / 5;
            const radius = 28 + age * 75;
            fx.fillStyle(color, 1 - age).fillCircle(
              x + Math.cos(angle) * radius,
              y + Math.sin(angle) * radius,
              3.5,
            );
          }
        }
      }
      const selected = latest.trails.find((trail) => trail.id === latest.selectedRouteId);
      if (selected && (selected.state === 'available' || selected.state === 'traveling')) {
        const destination = pointOnTrail(selected.points, 1);
        fx.lineStyle(2, 0xffdf83, 0.5).strokeCircle(
          destination.x * 10,
          destination.y * 10,
          48 + Math.sin(time / 450) * 5,
        );
        // Direction pulses describe the chosen trail; they never stand in for company progress.
        for (let i = 0; i < 4; i++) {
          const point = pointOnTrail(selected.points, (time / 8000 + i / 4) % 1);
          fx.fillStyle(0xffedba, 0.8).fillCircle(point.x * 10, point.y * 10, 2.4);
        }
      }
      if (!latest.scenery) return;
      // Quiet wind streaks keep the illustrated world alive without implying weather outcomes.
      air.lineStyle(1.5, 0xfff4d0, 0.12);
      for (let i = 0; i < 12; i++) {
        const x = ((time / 90 + i * 127) % 1120) - 60;
        const y = 70 + ((i * 137) % 650);
        air.lineBetween(x, y, x + 25, y - 4);
      }
    }

    private drawDust(
      g: Phaser.GameObjects.Graphics,
      point: RoutePoint,
      time: number,
      color: number,
      direction = 1,
    ): void {
      for (let i = 0; i < 5; i++) {
        const age = (time / 750 + i / 5) % 1;
        g.fillStyle(color, (1 - age) * 0.3).fillCircle(
          point.x * 10 - direction * (26 + age * 40),
          point.y * 10 + 23 - age * 14,
          3 + age * 8,
        );
      }
    }
  }

  const scene = new RouteWorld();
  const game = new Phaser.Game({
    type: Phaser.AUTO,
    parent: host,
    width: Math.max(1, viewport.width),
    height: Math.max(1, viewport.height),
    transparent: false,
    banner: false,
    audio: { noAudio: true },
    input: { keyboard: false, mouse: false, touch: false, gamepad: false },
    fps: { target: 30, limit: 30 },
    render: { antialias: true, roundPixels: false },
    scene: [scene],
  });
  const onContextLost = () => {
    if (!disposed) callbacks.failed();
  };
  game.canvas.addEventListener('webglcontextlost', onContextLost);
  return {
    update(snapshot, nextViewport) {
      if (disposed) return;
      const snapshotChanged = snapshot !== latest;
      const sizeChanged =
        game.scale.width !== Math.floor(nextViewport.width) ||
        game.scale.height !== Math.floor(nextViewport.height);
      latest = snapshot;
      viewport = nextViewport;
      if (!ready) return;
      if (sizeChanged) game.scale.resize(Math.max(1, viewport.width), Math.max(1, viewport.height));
      scene.applyCamera();
      if (snapshotChanged) scene.applySnapshot();
    },
    destroy() {
      if (disposed) return;
      disposed = true;
      game.canvas.removeEventListener('webglcontextlost', onContextLost);
      game.destroy(true);
    },
  };
}
