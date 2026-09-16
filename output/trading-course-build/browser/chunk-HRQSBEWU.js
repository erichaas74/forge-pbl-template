import {
  canvasCamera,
  clampProgress,
  confirmedTravelSegment,
  pointOnTrail,
  routeDrawingChanged
} from "./chunk-6T7GZV2W.js";
import {
  __webpack_exports__AUTO,
  __webpack_exports__Game,
  __webpack_exports__Scene
} from "./chunk-DKBEUOCQ.js";
import "./chunk-GOMI4DH3.js";

// src/app/templates/simulation-decision/ui/map/route-canvas-art.ts
function createTownArt(scene, kind) {
  const g = scene.add.graphics();
  g.fillStyle(1517591, 0.35).fillEllipse(0, 24, 116, 36);
  g.fillStyle(12954480).fillEllipse(0, 14, 105, 42);
  function house(x, y, width, height, roof = 7357744) {
    g.fillStyle(9789755).fillRect(x, y - height, width, height);
    g.fillStyle(13805929).fillRect(x, y - height, width - 9, height);
    g.lineStyle(1, 7951415, 0.6);
    for (let row = y - height + 6; row < y; row += 6) g.lineBetween(x, row, x + width - 9, row);
    g.fillStyle(roof).fillTriangle(
      x - 5,
      y - height,
      x + width / 2 - 3,
      y - height - 19,
      x + width + 4,
      y - height
    );
    g.lineStyle(3, 12753767).lineBetween(x - 5, y - height, x + width / 2 - 3, y - height - 19);
    g.fillStyle(4011302).fillRect(x + width / 2 - 6, y - 17, 10, 17);
    g.fillStyle(16177545).fillRect(x + 5, y - height + 9, 7, 8);
    g.lineStyle(1, 5849383).strokeRect(x + 5, y - height + 9, 7, 8);
  }
  if (kind === "fort") {
    house(-25, 5, 47, 30);
    g.fillStyle(9593149).fillRect(-48, 5, 96, 25);
    g.lineStyle(3, 13081696);
    for (let x = -48; x <= 48; x += 7) g.lineBetween(x, 3, x, 30);
    g.fillStyle(4010018).fillRoundedRect(-12, 11, 24, 20, 10);
    house(-51, 11, 22, 33, 4999734);
    house(29, 11, 22, 33, 4999734);
    g.lineStyle(2, 4993828).lineBetween(-33, -38, -33, -70);
    g.fillStyle(14005092).fillTriangle(-33, -69, -10, -64, -33, -58);
  } else if (kind === "crossing") {
    g.lineStyle(16, 7713204, 0.9).lineBetween(-52, 15, 52, 15);
    g.lineStyle(25, 11635539).lineBetween(-40, 6, 40, 6);
    g.lineStyle(2, 6638638);
    for (let x = -40; x <= 40; x += 7) g.lineBetween(x, -6, x, 18);
    g.lineStyle(3, 6834478).lineBetween(-44, -9, 44, -9).lineBetween(-44, 20, 44, 20);
    house(-12, -18, 30, 23);
  } else if (kind === "camp" || kind === "pass") {
    for (const [x, y, size] of [
      [-25, 16, 30],
      [16, 23, 24],
      [12, -14, 21]
    ]) {
      g.fillStyle(14931368).fillTriangle(x - size, y, x, y - size * 1.6, x + size, y);
      g.fillStyle(11313273).fillTriangle(x, y, x, y - size * 1.6, x + size, y);
      g.fillStyle(5064754).fillTriangle(x - 7, y, x, y - 20, x + 7, y);
      g.lineStyle(2, 6114866).lineBetween(x, y - size * 1.6 - 6, x, y - size * 1.6);
    }
    g.fillStyle(14984026).fillCircle(-4, 28, 5);
    g.lineStyle(3, 7424811).lineBetween(-12, 32, 5, 26).lineBetween(-10, 26, 5, 33);
  } else {
    house(-45, 14, 37, 27, 6573370);
    house(-5, 4, 43, 39);
    house(21, 26, 30, 24, 5727827);
    g.fillStyle(15850929).fillRect(0, -30, 26, 9);
    g.lineStyle(1, 7230521).strokeRect(0, -30, 26, 9);
    g.lineStyle(3, 10254149).lineBetween(-48, 31, 15, 31);
    for (let x = -48; x < 15; x += 12) g.lineBetween(x, 24, x, 36);
  }
  g.fillStyle(12091972).fillRect(-45, 26, 11, 10).fillRect(-31, 29, 10, 9);
  g.lineStyle(1, 6768681).strokeRect(-45, 26, 11, 10).lineBetween(-45, 26, -34, 36);
  return scene.add.container(0, 0, [g]);
}
function createWagonArt(scene, freight) {
  const g = scene.add.graphics();
  g.fillStyle(1516057, 0.3).fillEllipse(16, 25, 125, 21);
  g.fillStyle(7754037).fillRoundedRect(-32, 2, 65, 20, 3);
  g.lineStyle(2, 11897424);
  for (let y = 8; y < 22; y += 6) g.lineBetween(-31, y, 31, y);
  g.fillStyle(freight ? 8240563 : 15655096).fillRoundedRect(-27, -37, 54, 47, 18);
  g.fillStyle(freight ? 5214086 : 12891271).fillRoundedRect(12, -31, 15, 39, 10);
  g.lineStyle(2, 7628103, 0.75).strokeRoundedRect(-27, -37, 54, 47, 18);
  for (const x of [-15, 0, 15]) g.lineBetween(x, -30, x, 7);
  g.lineStyle(2, 5850673).lineBetween(-27, 7, 27, 7);
  g.fillStyle(freight ? 3235412 : 10637618).fillRect(-19, 10, 17, 7);
  g.lineStyle(3, 7624505).lineBetween(30, 14, 62, 8);
  for (const [x, y] of [
    [64, 8],
    [70, -5]
  ]) {
    g.fillStyle(6769974).fillEllipse(x, y, 27, 15).fillEllipse(x + 14, y - 5, 11, 14);
    g.fillStyle(4602408).fillRect(x + 14, y - 15, 3, 8);
    g.lineStyle(3, 4207652).lineBetween(x - 6, y + 5, x - 9, y + 16).lineBetween(x + 6, y + 5, x + 10, y + 16);
    g.lineStyle(2, 13219977).lineBetween(x - 12, y - 3, x + 8, y + 1);
  }
  const container = scene.add.container(0, 0, [g]);
  const wheels = [-22, 21].map((x) => {
    const wheel = scene.add.graphics().setPosition(x, 23);
    wheel.fillStyle(4535847).fillCircle(0, 0, 12);
    wheel.lineStyle(3, 12558700).strokeCircle(0, 0, 10);
    wheel.lineStyle(2, 13875589);
    for (let i = 0; i < 4; i++) {
      const angle = i * Math.PI / 4;
      wheel.lineBetween(
        -Math.cos(angle) * 9,
        -Math.sin(angle) * 9,
        Math.cos(angle) * 9,
        Math.sin(angle) * 9
      );
    }
    wheel.fillStyle(6902074).fillCircle(0, 0, 3);
    container.add(wheel);
    return wheel;
  });
  return { container, wheels };
}

// src/app/templates/simulation-decision/ui/map/phaser-route-renderer.ts
function createRouteCanvas(host, initial, initialViewport, callbacks) {
  let latest = initial;
  let viewport = initialViewport;
  let disposed = false;
  let ready = false;
  let failed = false;
  class RouteWorld extends __webpack_exports__Scene {
    ground;
    routes;
    atmosphere;
    weather;
    towns = /* @__PURE__ */ new Map();
    wheelSets = /* @__PURE__ */ new WeakMap();
    feedback;
    wagon;
    scout;
    background;
    previous;
    travelTween;
    previewTween;
    progress = { value: 0 };
    scouting = { value: 0 };
    movingRoute;
    previewRoute;
    previewId = "";
    appliedAsset;
    checkpointLabels = [];
    milestone;
    milestoneText;
    milestoneSign;
    cue;
    cuePoint = { x: 0, y: 0 };
    burstStarted;
    pendingCue;
    wheels = [];
    fleet = /* @__PURE__ */ new Map();
    clearBackgroundLoad;
    constructor() {
      super("route-world");
    }
    create() {
      this.cameras.main.setBackgroundColor("#302b22");
      this.ground = this.add.graphics().setDepth(0);
      this.ground.fillStyle(13811854).fillRect(0, 0, 1e3, 800);
      this.ground.lineStyle(1, 8351822, 0.18);
      for (let x = 0; x <= 1e3; x += 50) this.ground.lineBetween(x, 0, x, 800);
      for (let y = 0; y <= 800; y += 50) this.ground.lineBetween(0, y, 1e3, y);
      this.atmosphere = this.add.graphics().setDepth(2);
      this.weather = this.add.graphics().setDepth(5);
      this.routes = this.add.graphics().setDepth(3);
      this.feedback = this.add.graphics().setDepth(4);
      this.wagon = this.makeWagon(false).setDepth(6);
      this.scout = this.makeWagon(true).setDepth(7).setVisible(false);
      this.milestoneSign = this.add.graphics();
      this.milestoneText = this.add.text(0, -67, "", {
        fontFamily: "Arial",
        fontSize: "17px",
        fontStyle: "bold",
        color: "#fff1c8",
        backgroundColor: "#292016",
        padding: { x: 10, y: 7 }
      }).setOrigin(0.5);
      this.milestone = this.add.container(0, 0, [this.milestoneSign, this.milestoneText]).setDepth(8).setVisible(false);
      ready = true;
      this.scale.resize(Math.max(1, viewport.width), Math.max(1, viewport.height));
      this.applySnapshot();
      this.applyCamera();
      if (!latest.backgroundAsset) callbacks.ready();
    }
    applyCamera() {
      const camera = canvasCamera(viewport);
      this.cameras.main.setViewport(0, 0, camera.width, camera.height).setZoom(camera.zoomX, camera.zoomY).centerOn(camera.x, camera.y);
    }
    applySnapshot() {
      const segment = confirmedTravelSegment(this.previous, latest);
      const changedTravel = latest.travel?.routeId !== this.previous?.travel?.routeId || latest.travel?.progress !== this.previous?.travel?.progress || latest.cue?.journeyId !== this.previous?.cue?.journeyId || latest.currentLocationId !== this.previous?.currentLocationId;
      if (changedTravel || !latest.motion || !this.previous) {
        const displayedProgress = this.movingRoute?.id === segment?.routeId ? this.progress.value : void 0;
        this.travelTween?.stop();
        this.movingRoute = void 0;
        if (segment) {
          this.movingRoute = latest.trails.find((trail) => trail.id === segment.routeId);
          this.progress.value = displayedProgress ?? segment.from;
          this.travelTween = this.tweens.add({
            targets: this.progress,
            value: segment.to,
            duration: 1100,
            ease: "Sine.easeInOut",
            onComplete: () => {
              this.wagon.setPosition(latest.companyPosition.x * 10, latest.companyPosition.y * 10);
              this.movingRoute = void 0;
              if (this.pendingCue && this.pendingCue.id === latest.cue?.id)
                this.showCue(this.pendingCue, true);
              this.pendingCue = void 0;
            }
          });
        }
      }
      if (this.movingRoute) {
        this.movingRoute = latest.trails.find(
          (trail) => trail.id === this.movingRoute?.id && trail.points.length >= 2
        );
        if (!this.movingRoute) this.travelTween?.stop();
      }
      const position = this.movingRoute ? pointOnTrail(this.movingRoute.points, this.progress.value) : latest.companyPosition;
      this.wagon.setPosition(position.x * 10, position.y * 10);
      this.loadBackground();
      this.background?.setVisible(latest.scenery);
      if (routeDrawingChanged(this.previous, latest)) this.drawRoutes();
      this.applyCue();
      this.applyWorld();
      this.applyTowns();
      const canPreview = latest.motion && !latest.travel && latest.trails.some(
        (trail) => trail.id === latest.previewRouteId && trail.state === "available" && trail.points.length >= 2
      );
      const previewId = canPreview ? latest.previewRouteId : "";
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
            duration: Math.min(9e3, Math.max(3500, this.previewRoute.days * 1400)),
            ease: "Linear",
            onComplete: () => {
              this.scout.setVisible(false);
              this.previewRoute = void 0;
              callbacks.previewEnded();
            }
          });
        }
      }
      this.previous = latest;
    }
    applyTowns() {
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
        entry.art.setPosition(town.x * 10, town.y * 10).setAlpha(town.id === latest.currentLocationId ? 1 : 0.95);
      }
    }
    applyCue() {
      const cue = latest.cue;
      if (!latest.motion) {
        this.burstStarted = void 0;
        this.pendingCue = void 0;
      }
      if (!cue) {
        this.cue = void 0;
        this.pendingCue = void 0;
        this.milestone.setVisible(false);
        return;
      }
      const changed = cue.id !== this.previous?.cue?.id;
      const before = this.previous?.cue;
      const sameJourney = before?.journeyId === cue.journeyId;
      const confirmedMilestone = cue.kind === "departure" ? !this.previous?.travel && !!latest.travel && cue.progress === 0 : sameJourney && before?.kind !== "paused" && (cue.kind === "event" || cue.kind === "arrival" || cue.kind === "checkpoint" && cue.progress > (before?.progress ?? 0));
      const animate = !!this.previous && changed && latest.motion && confirmedMilestone;
      if (animate && this.movingRoute) {
        this.pendingCue = cue;
        this.milestone.setVisible(false);
        this.burstStarted = void 0;
      } else if (!this.movingRoute) {
        this.showCue(cue, animate);
      }
    }
    applyWorld() {
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
            label: this.add.text(0, 0, shipment.name, {
              fontFamily: "Arial",
              fontSize: "12px",
              color: "#d9fcf0",
              backgroundColor: "#203e38",
              padding: { x: 4, y: 2 }
            }).setOrigin(0.5, 0).setDepth(5),
            progress: { value: shipment.progress },
            target: shipment.progress,
            route: trail
          };
          this.fleet.set(shipment.id, vehicle);
        }
        vehicle.route = trail;
        if (vehicle.target !== shipment.progress || !latest.motion || !latest.world?.running) {
          vehicle.tween?.stop();
          const direction = shipment.progress < vehicle.progress.value ? -1 : 1;
          vehicle.wagon.setScale(direction * 0.58, 0.58);
          vehicle.target = shipment.progress;
          if (latest.motion && latest.world?.running && this.previous?.world && latest.world.tick > this.previous.world.tick) {
            vehicle.tween = this.tweens.add({
              targets: vehicle.progress,
              value: shipment.progress,
              duration: 2200,
              ease: "Sine.easeInOut"
            });
          } else vehicle.progress.value = shipment.progress;
        }
        const point = pointOnTrail(trail.points, vehicle.progress.value);
        vehicle.wagon.setPosition(point.x * 10, point.y * 10);
        vehicle.label.setPosition(point.x * 10, point.y * 10 + 25);
      }
    }
    drawWorld(time) {
      for (const vehicle of this.fleet.values()) {
        const point = pointOnTrail(vehicle.route.points, vehicle.progress.value);
        vehicle.wagon.setPosition(point.x * 10, point.y * 10);
        for (const wheel of this.wheelSets.get(vehicle.wagon) ?? [])
          wheel.setRotation(vehicle.progress.value * 70);
        vehicle.label.setPosition(point.x * 10, point.y * 10 + 25);
        if (latest.motion && latest.world?.running && Math.abs(vehicle.progress.value - vehicle.target) > 1e-3)
          this.drawDust(this.feedback, point, time, 10608860, vehicle.wagon.scaleX < 0 ? -1 : 1);
      }
      const air = this.weather;
      const clock = latest.motion && latest.world?.running ? time : 0;
      for (const condition of latest.world?.conditions ?? []) {
        for (const point of condition.locations) {
          const x = point.x * 10, y = point.y * 10;
          if (condition.kind === "winter-storm") {
            air.fillStyle(13624301, 0.25).fillEllipse(x, y - 15, 220, 140);
            for (let cloud = 0; cloud < 4; cloud++)
              air.fillStyle(cloud % 2 ? 11254978 : 13950427, 0.58).fillEllipse(
                x - 64 + cloud * 40 + Math.sin(clock / 2400) * 7,
                y - 62 - cloud % 2 * 15,
                95,
                40
              );
            for (let i = 0; i < 26; i++) {
              const dx = (i * 31 + clock / 110) % 190 - 95, dy = (clock / 45 + i * 13) % 150 - 65;
              air.fillStyle(16777215, 0.9).fillCircle(x + dx, y + dy, 2.4);
            }
          } else if (condition.kind === "flood") {
            air.fillStyle(3448010, 0.24).fillEllipse(x, y + 15, 165, 100);
            for (let i = 0; i < 3; i++)
              air.lineStyle(3, 10413048, 0.6).strokeEllipse(x, y + 15, 90 + i * 25 + Math.sin(clock / 550) * 6, 30 + i * 20);
          } else {
            air.fillStyle(12087609, 0.22).fillCircle(x, y, 68);
            air.lineStyle(4, 16765578, 0.85).strokeTriangle(x, y - 65, x - 17, y - 36, x + 17, y - 36);
          }
        }
      }
    }
    showCue(cue, animate) {
      this.cue = cue;
      const trail = latest.trails.find((item) => item.id === cue.routeId);
      this.cuePoint = trail?.points.length ? pointOnTrail(trail.points, cue.progress) : latest.companyPosition;
      const color = cue.kind === "event" ? 16757879 : cue.kind === "arrival" || cue.kind === "checkpoint" ? 9561794 : 16768899;
      const sign = this.milestoneSign.clear();
      sign.lineStyle(3, 3286555).lineBetween(0, -48, 0, -14);
      sign.fillStyle(color).fillTriangle(1, -48, 23, -39, 1, -30);
      this.milestoneText.setText(cue.label);
      this.milestone.setPosition(
        Math.max(100, Math.min(900, this.cuePoint.x * 10)),
        Math.max(95, this.cuePoint.y * 10)
      ).setVisible(true);
      if (animate) this.burstStarted = this.time.now;
    }
    loadBackground() {
      if (this.appliedAsset === latest.backgroundAsset) return;
      this.clearBackgroundLoad?.();
      this.appliedAsset = latest.backgroundAsset;
      this.background?.destroy();
      this.background = void 0;
      const asset = latest.backgroundAsset;
      if (!asset) {
        if (!failed) callbacks.ready();
        return;
      }
      const key = `landscape:${asset}`;
      const show = () => {
        if (disposed || asset !== latest.backgroundAsset) return;
        this.clearBackgroundLoad?.();
        this.background = this.add.image(500, 400, key).setDepth(1).setTint(14738639).setVisible(latest.scenery);
        this.background.setScale(
          Math.min(1e3 / this.background.width, 800 / this.background.height)
        );
        if (!failed) callbacks.ready();
      };
      if (this.textures.exists(key)) show();
      else {
        const onError = (file) => {
          if (disposed || file.key !== key || asset !== latest.backgroundAsset) return;
          this.clearBackgroundLoad?.();
          failed = true;
          callbacks.failed();
        };
        this.clearBackgroundLoad = () => {
          this.load.off(`filecomplete-image-${key}`, show);
          this.load.off("loaderror", onError);
          this.clearBackgroundLoad = void 0;
        };
        this.load.once(`filecomplete-image-${key}`, show);
        this.load.on("loaderror", onError);
        this.load.image(key, asset);
        this.load.start();
      }
    }
    drawRoutes() {
      const g = this.routes.clear();
      for (const label of this.checkpointLabels) label.destroy();
      this.checkpointLabels = [];
      for (const trail of latest.trails) {
        const selected = trail.id === latest.selectedRouteId;
        const active = trail.state === "traveling";
        const muted = trail.state === "inactive" || trail.state === "locked";
        const color = trail.state === "unavailable" ? 14258301 : trail.state === "completed" ? 11915676 : selected || active ? 16768899 : 15062179;
        if (selected || active || trail.compared) {
          this.strokeTrail(g, trail.points, 17, active ? 7527118 : 16763231, 0.12);
          this.strokeTrail(g, trail.points, 10, active ? 7527118 : 16763231, 0.2);
        }
        this.strokeTrail(g, trail.points, 6, 2235411, muted ? 0.16 : 0.72);
        g.lineStyle(selected || active ? 3 : 2.2, color, muted ? 0.25 : 0.95);
        const points = trail.points;
        for (let i = 1; i < points.length; i++) {
          if (!selected && !active && i % (muted ? 5 : 4) >= 2) continue;
          g.lineBetween(
            points[i - 1].x * 10,
            points[i - 1].y * 10,
            points[i].x * 10,
            points[i].y * 10
          );
        }
        if (active && latest.travel) {
          const progress = clampProgress(latest.travel.progress);
          const complete = points.slice(0, Math.floor(progress * (points.length - 1)) + 1);
          this.strokeTrail(g, [...complete, pointOnTrail(points, progress)], 4, 9365452, 1);
        }
        if (selected || active) {
          for (let day = 1; day < trail.days; day++) {
            const point = pointOnTrail(points, day / trail.days);
            const reached = trail.state === "completed" || active && day / trail.days <= (latest.travel?.progress ?? 0);
            g.fillStyle(reached ? 10347202 : 16773045).fillCircle(point.x * 10, point.y * 10, 16.5);
            g.lineStyle(4, 8212505).strokeCircle(point.x * 10, point.y * 10, 16.5);
            this.checkpointLabels.push(
              this.add.text(point.x * 10, point.y * 10, reached ? "\u2713" : String(day), {
                fontFamily: "Arial",
                fontSize: "18px",
                fontStyle: "bold",
                color: "#402b15"
              }).setOrigin(0.5).setDepth(5)
            );
          }
        }
      }
    }
    strokeTrail(g, points, width, color, alpha) {
      if (!points.length) return;
      g.lineStyle(width, color, alpha).beginPath().moveTo(points[0].x * 10, points[0].y * 10);
      for (const point of points.slice(1)) g.lineTo(point.x * 10, point.y * 10);
      g.strokePath();
    }
    makeWagon(preview) {
      const art = createWagonArt(this, preview);
      this.wheelSets.set(art.container, art.wheels);
      if (!preview) this.wheels = art.wheels;
      return art.container;
    }
    update(time) {
      if (disposed) return;
      const fx = this.feedback.clear();
      const air = this.atmosphere.clear();
      this.weather.clear();
      this.drawWorld(time);
      if (this.movingRoute) {
        const point = pointOnTrail(this.movingRoute.points, this.progress.value);
        const ahead = pointOnTrail(
          this.movingRoute.points,
          Math.min(1, this.progress.value + 0.01)
        );
        const direction = ahead.x < point.x ? -1 : 1;
        this.wagon.setScale(direction, 1).setPosition(point.x * 10, point.y * 10 + Math.sin(time / 75) * 1.8);
        for (const wheel of this.wheels) wheel.setRotation(this.progress.value * 60);
        this.drawDust(fx, point, time, 14995610, direction);
      }
      if (this.previewRoute) {
        const point = pointOnTrail(this.previewRoute.points, this.scouting.value);
        this.scout.setPosition(point.x * 10, point.y * 10);
        for (const wheel of this.wheelSets.get(this.scout) ?? [])
          wheel.setRotation(this.scouting.value * 70);
        this.drawDust(fx, point, time, 9891812);
      }
      if (!latest.motion) return;
      if (this.burstStarted !== void 0 && this.cue) {
        const age = (time - this.burstStarted) / 1100;
        if (age >= 1) this.burstStarted = void 0;
        else {
          const color = this.cue.kind === "event" ? 16757879 : 11530444;
          const x = this.cuePoint.x * 10;
          const y = this.cuePoint.y * 10;
          fx.lineStyle(4 * (1 - age), color, 1 - age).strokeCircle(x, y, 25 + age * 65);
          for (let i = 0; i < 10; i++) {
            const angle = i * Math.PI / 5;
            const radius = 28 + age * 75;
            fx.fillStyle(color, 1 - age).fillCircle(
              x + Math.cos(angle) * radius,
              y + Math.sin(angle) * radius,
              3.5
            );
          }
        }
      }
      const selected = latest.trails.find((trail) => trail.id === latest.selectedRouteId);
      if (selected && (selected.state === "available" || selected.state === "traveling")) {
        const destination = pointOnTrail(selected.points, 1);
        fx.lineStyle(2, 16768899, 0.5).strokeCircle(
          destination.x * 10,
          destination.y * 10,
          48 + Math.sin(time / 450) * 5
        );
        for (let i = 0; i < 4; i++) {
          const point = pointOnTrail(selected.points, (time / 8e3 + i / 4) % 1);
          fx.fillStyle(16772538, 0.8).fillCircle(point.x * 10, point.y * 10, 2.4);
        }
      }
      if (!latest.scenery) return;
      air.lineStyle(1.5, 16774352, 0.12);
      for (let i = 0; i < 12; i++) {
        const x = (time / 90 + i * 127) % 1120 - 60;
        const y = 70 + i * 137 % 650;
        air.lineBetween(x, y, x + 25, y - 4);
      }
    }
    drawDust(g, point, time, color, direction = 1) {
      for (let i = 0; i < 5; i++) {
        const age = (time / 750 + i / 5) % 1;
        g.fillStyle(color, (1 - age) * 0.3).fillCircle(
          point.x * 10 - direction * (26 + age * 40),
          point.y * 10 + 23 - age * 14,
          3 + age * 8
        );
      }
    }
  }
  const scene = new RouteWorld();
  const game = new __webpack_exports__Game({
    type: __webpack_exports__AUTO,
    parent: host,
    width: Math.max(1, viewport.width),
    height: Math.max(1, viewport.height),
    transparent: false,
    banner: false,
    audio: { noAudio: true },
    input: { keyboard: false, mouse: false, touch: false, gamepad: false },
    fps: { target: 30, limit: 30 },
    render: { antialias: true, roundPixels: false },
    scene: [scene]
  });
  const onContextLost = () => {
    if (!disposed) callbacks.failed();
  };
  game.canvas.addEventListener("webglcontextlost", onContextLost);
  return {
    update(snapshot, nextViewport) {
      if (disposed) return;
      const snapshotChanged = snapshot !== latest;
      const sizeChanged = game.scale.width !== Math.floor(nextViewport.width) || game.scale.height !== Math.floor(nextViewport.height);
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
      game.canvas.removeEventListener("webglcontextlost", onContextLost);
      game.destroy(true);
    }
  };
}
export {
  createRouteCanvas
};
//# debugId=dda61be4-7744-56e4-9c20-50c1fccf9537
//# sourceMappingURL=chunk-HRQSBEWU.js.map
