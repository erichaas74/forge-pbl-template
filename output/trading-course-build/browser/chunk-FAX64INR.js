import {
  sampleRobotReplay
} from "./chunk-4K7YHKFF.js";
import {
  sampleCourseActor
} from "./chunk-3ZI5RM4E.js";
import {
  __webpack_exports__AUTO,
  __webpack_exports__Game,
  __webpack_exports__Math,
  __webpack_exports__Scale,
  __webpack_exports__Scene
} from "./chunk-DKBEUOCQ.js";
import {
  __spreadProps,
  __spreadValues
} from "./chunk-GOMI4DH3.js";

// src/app/templates/programming-automation/ui/robot-course-engine/robot-course-view.ts
function courseProjection(course, pixelsPerCm = 2) {
  return {
    length: (cm) => cm * pixelsPerCm,
    point: (pose) => ({
      x: pose.xCm * pixelsPerCm,
      y: (course.heightCm - pose.yCm) * pixelsPerCm
    })
  };
}

// src/app/templates/programming-automation/ui/robot-course-engine/robot-course-effects.ts
var RobotCourseEffects = class {
  lights;
  particles;
  samples;
  events;
  transfers = [];
  constructor(scene) {
    this.lights = scene.add.graphics().setDepth(0.5);
    this.particles = scene.add.graphics().setDepth(6);
  }
  draw(view, sceneTime) {
    const p = courseProjection(view.course);
    const width = p.length(view.course.widthCm), height = p.length(view.course.heightCm);
    const time = view.reducedMotion ? 0 : view.sample?.timeMs ?? sceneTime;
    const pulse = view.reducedMotion ? 0.6 : 0.5 + Math.sin(time / 650) * 0.25;
    const g = this.lights.clear();
    const fx = this.particles.clear();
    for (let i = 1; i <= 3; i++) {
      const x = width * i / 4;
      g.fillStyle(8775420, 0.025).fillEllipse(x, height * 0.34, width * 0.43, height * 0.6);
      g.fillStyle(12774911, 0.035).fillTriangle(x - 18, 2, Math.max(0, x - width / 6), height * 0.7, Math.min(width, x + width / 6), height * 0.7);
    }
    for (let x = 16; x < width - 12; x += 42) {
      g.fillStyle(7597531, pulse).fillRoundedRect(x, 4, 18, 3, 1);
      g.fillStyle(6471662, 0.3).fillRoundedRect(x, height - 7, 18, 3, 1);
    }
    for (let y = 22; y < height - 20; y += 50) {
      g.fillStyle(9819385, 0.22).fillRect(4, y, 3, 16).fillRect(width - 7, y, 3, 16);
    }
    const target = view.course.targets[view.targetIndex] ?? view.course.targets[0];
    if (target) {
      const point = p.point(target);
      const angle = time / 1800;
      g.fillStyle(16758347, 0.045 + pulse * 0.035).fillCircle(point.x, point.y, 48);
      for (let segment = 0; segment < 3; segment++) {
        const start = angle + segment * Math.PI * 2 / 3;
        g.lineStyle(2, 16763761, 0.8).beginPath().arc(point.x, point.y, 39, start, start + 1.1).strokePath();
      }
      for (const dx of [-1, 1]) {
        g.lineStyle(2, 16767376, pulse).lineBetween(point.x + dx * 49, point.y - 9, point.x + dx * 43, point.y).lineBetween(point.x + dx * 43, point.y, point.x + dx * 49, point.y + 9);
      }
    }
    for (const zone of view.course.deliveryZones) {
      const point = p.point({ xCm: zone.xCm, yCm: zone.yCm + zone.heightCm });
      const w = p.length(zone.widthCm), h = p.length(zone.heightCm);
      for (const [x, y] of [[point.x, point.y], [point.x + w, point.y], [point.x, point.y + h], [point.x + w, point.y + h]]) {
        fx.fillStyle(6881209, 0.04 + pulse * 0.08).fillCircle(x, y, 13);
        fx.fillStyle(11730908, 0.7).fillCircle(x, y, 3);
      }
    }
    for (const rack of view.course.obstacles) {
      const point = p.point({ xCm: rack.xCm + rack.widthCm, yCm: rack.yCm + rack.heightCm });
      fx.fillStyle(16759379, pulse * 0.12).fillCircle(point.x - 5, point.y + 5, 13);
      fx.fillStyle(16764281, 0.5 + pulse / 2).fillCircle(point.x - 5, point.y + 5, 3);
    }
    for (const pkg of view.course.packages) {
      if (view.sample?.carryingPackageIds.includes(pkg.id) || view.sample?.deliveredPackageIds.includes(pkg.id)) continue;
      const point = p.point(pkg);
      const lift = view.reducedMotion ? 0 : Math.sin(time / 400) * 3;
      fx.lineStyle(2, 16766855, 0.8).lineBetween(point.x - 7, point.y - 39 + lift, point.x, point.y - 33 + lift).lineBetween(point.x, point.y - 33 + lift, point.x + 7, point.y - 39 + lift);
    }
    if (!view.reducedMotion) {
      for (let i = 0; i < 16; i++) {
        const x = ((i * 137.51 + time / 75) % width + width) % width;
        const y = ((i * 83.17 - time / 170) % height + height) % height;
        fx.fillStyle(11920878, 0.09).fillCircle(x, y, i % 3 === 0 ? 2 : 1);
      }
    }
    if (this.samples !== view.samples || this.events !== view.events) {
      this.samples = view.samples;
      this.events = view.events;
      this.transfers = view.events.filter((event) => /^(Picked up |Delivered )/.test(event.message)).map((event) => ({
        timeMs: event.timeMs,
        pose: sampleRobotReplay(view.samples, event.timeMs) ?? view.course.startPose,
        delivered: event.message.startsWith("Delivered ")
      }));
    }
    for (const event of this.transfers) {
      const age = (view.sample?.timeMs ?? 0) - event.timeMs;
      if (age < 0 || age > 1e3) continue;
      const point = p.point(event.pose);
      const progress = view.reducedMotion ? 0.25 : age / 1e3;
      const color = event.delivered ? 9568208 : 16765317;
      fx.lineStyle(2, color, 1 - progress).strokeCircle(point.x, point.y, 25 + progress * 42);
      if (view.reducedMotion) continue;
      for (let i = 0; i < 12; i++) {
        const angle = i * Math.PI / 6;
        const radius = 30 + progress * (i % 2 ? 50 : 36);
        fx.fillStyle(color, 1 - progress).fillRect(
          point.x + Math.cos(angle) * radius,
          point.y + Math.sin(angle) * radius - progress * 16,
          3,
          5
        );
      }
    }
  }
};

// src/app/templates/programming-automation/ui/robot-course-engine/workshop-presentation.ts
function workshopStatus(view) {
  const pose = view.sample ?? view.course.startPose;
  const target = view.course.targets[view.targetIndex] ?? view.course.targets[0];
  const finished = !!view.result && !!view.sample && view.sample.timeMs >= (view.samples.at(-1)?.timeMs ?? view.result.elapsedSeconds * 1e3);
  return {
    finished,
    success: finished && !!view.result?.completedMission,
    distance: target ? Math.hypot(pose.xCm - target.xCm, pose.yCm - target.yCm) : 0,
    score: finished ? view.result?.score : void 0,
    label: finished ? view.result?.completedMission ? "PARKING COMPLETE" : "ADJUST YOUR PROGRAM" : view.sample ? "RECORDED RUN" : "READY TO RUN"
  };
}
function workshopFrame(view) {
  const p = courseProjection(view.course);
  const start = p.point(view.course.startPose);
  const target = p.point(view.course.targets[view.targetIndex] ?? view.course.startPose);
  if (view.overview) return {
    x: -110,
    y: -130,
    width: p.length(view.course.widthCm) + 220,
    height: p.length(view.course.heightCm) + 270
  };
  return {
    x: Math.min(start.x, target.x) - 175,
    y: Math.min(start.y, target.y) - 135,
    width: Math.max(490, Math.abs(start.x - target.x) + 350),
    height: Math.max(460, Math.abs(start.y - target.y) + 260)
  };
}

// src/app/templates/programming-automation/ui/robot-course-engine/camera-director.ts
var CameraDirector = class {
  constructor(camera) {
    this.camera = camera;
  }
  camera;
  initialized = false;
  focus;
  x = 0;
  y = 0;
  zoom = 1;
  focusOnObject(point, until) {
    this.focus = __spreadProps(__spreadValues({}, point), { until });
  }
  returnToGameplayView() {
    this.focus = void 0;
  }
  impact(reducedMotion) {
    if (!reducedMotion) this.camera.shake(100, 2e-3);
  }
  update(view, width, height, delta, now) {
    const frame = workshopFrame(view);
    this.camera.setViewport(0, 64, width, Math.max(1, height - 108));
    const zoom = Math.min(width / frame.width, this.camera.height / frame.height) * view.zoom;
    const player = courseProjection(view.course).point(view.sample ?? view.course.startPose);
    if (this.focus && now >= this.focus.until) this.focus = void 0;
    const point = view.follow ? player : this.focus ?? {
      x: frame.x + frame.width / 2,
      y: frame.y + frame.height / 2
    };
    const blend = !this.initialized || view.reducedMotion ? 1 : 1 - Math.exp(-delta / 150);
    this.x += (point.x - this.x) * blend;
    this.y += (point.y - this.y) * blend;
    this.zoom += (zoom - this.zoom) * blend;
    this.camera.setZoom(this.zoom).centerOn(this.x, this.y);
    this.initialized = true;
  }
};

// src/app/templates/programming-automation/ui/robot-course-engine/scene-assets.ts
var GAME_ASSETS = {
  WORKSHOP: { key: "workshop-environment", url: "assets/game/environment/workshop-panorama-v1.webp" },
  ROBOT_PLAYER: { key: "courier-player", url: "assets/game/robot/courier-v1.webp" }
};
var SCENE_DEPTH = {
  background: 0,
  environment: 10,
  surface: 20,
  objects: 30,
  shadow: 39,
  player: 40,
  foreground: 50,
  effects: 60,
  hud: 100
};

// src/app/templates/programming-automation/ui/robot-course-engine/game-fx-system.ts
var GameFXSystem = class {
  layer;
  event;
  constructor(scene) {
    this.layer = scene.add.graphics().setDepth(SCENE_DEPTH.effects);
  }
  success(point, now) {
    this.emit("success", point, now);
  }
  failure(point, now) {
    this.emit("failure", point, now);
  }
  select(point, now) {
    this.emit("selection", point, now);
  }
  collision(point, now) {
    this.emit("collision", point, now);
  }
  clear() {
    this.event = void 0;
    this.layer.clear();
  }
  emit(kind, point, now) {
    this.event = __spreadProps(__spreadValues({ kind }, point), { at: now });
  }
  update(now, reducedMotion) {
    const g = this.layer.clear(), event = this.event;
    if (!event) return;
    const progress = Math.min(1, Math.max(0, (now - event.at) / 850));
    if (progress === 1) {
      this.event = void 0;
      return;
    }
    const color = event.kind === "success" ? 12386253 : event.kind === "selection" ? 16768924 : 16755339;
    const radius = reducedMotion ? 37 : 32 + progress * 28;
    g.lineStyle(2, color, 1 - progress).strokeCircle(event.x, event.y, radius);
    if (reducedMotion || event.kind === "selection") return;
    for (let i = 0; i < 8; i++) {
      const angle = i * Math.PI / 4;
      const x = event.x + Math.cos(angle) * (radius + 9);
      const y = event.y + Math.sin(angle) * (radius + 9);
      g.lineStyle(2, color, 1 - progress).lineBetween(x, y, x + Math.cos(angle) * 6, y + Math.sin(angle) * 6);
    }
  }
};

// src/app/templates/programming-automation/ui/robot-course-engine/game-hud.ts
var GameHUD = class {
  layer;
  bar;
  title;
  objective;
  status;
  telemetry;
  result;
  constructor(scene) {
    const text = (size, color) => scene.add.text(0, 0, "", {
      fontFamily: "monospace",
      fontSize: `${size}px`,
      color
    });
    this.bar = scene.add.graphics();
    this.title = text(14, "#fff0cc");
    this.objective = text(11, "#bed3cb");
    this.status = text(10, "#b8ead0").setOrigin(1, 0);
    this.telemetry = text(11, "#e3e9d9");
    this.result = text(11, "#ffe0a4").setOrigin(1, 0);
    this.layer = scene.add.container(0, 0, [this.bar, this.title, this.objective, this.status, this.telemetry, this.result]).setDepth(SCENE_DEPTH.hud);
  }
  update(view, width, height) {
    const status = workshopStatus(view), pose = view.sample ?? view.course.startPose;
    const compact = width < 580;
    this.bar.clear().fillStyle(1387307).fillRect(0, 0, width, 64).fillRect(0, height - 44, width, 44);
    this.bar.lineStyle(1, 7505272, 0.5).lineBetween(0, 63, width, 63).lineBetween(0, height - 44, width, height - 44);
    this.title.setText("PRECISION / TEST BAY").setPosition(16, 12);
    this.objective.setText(`Park the robot center on the amber crosshair.`).setPosition(16, 36).setFontSize(compact ? 10 : 11);
    this.status.setText(status.label).setPosition(width - 16, 14).setVisible(!compact);
    this.telemetry.setText(compact ? `${(view.sample?.timeMs ?? 0) / 1e3}s   TO TARGET ${status.distance.toFixed(1)} cm` : `X ${pose.xCm.toFixed(1)}  Y ${pose.yCm.toFixed(1)} cm   /   ${pose.headingDeg.toFixed(0)}\xB0   /   ${((view.sample?.timeMs ?? 0) / 1e3).toFixed(1)}s`).setPosition(16, height - 28);
    this.result.setText(status.finished ? `${status.success ? "\u2713 PARKED" : "REVISE"}  /  ${status.score ?? 0} PTS` : `TO TARGET  ${status.distance.toFixed(1)} cm`).setPosition(width - 16, height - 28).setVisible(!compact);
    if (compact && status.finished) this.objective.setText(`${status.label} / ${status.score ?? 0} PTS`);
  }
};

// src/app/templates/programming-automation/ui/robot-course-engine/arena-walls.ts
function drawArenaWalls(graphics, x, y, width, height, thickness) {
  const innerHeight = Math.max(0, height - thickness * 2);
  graphics.fillStyle(5540824).fillRect(x, y, width, thickness);
  graphics.fillStyle(14989647).fillRect(x, y + height - thickness, width, thickness);
  graphics.fillStyle(9728205).fillRect(x, y + thickness, thickness, innerHeight);
  graphics.fillStyle(14645355).fillRect(x + width - thickness, y + thickness, thickness, innerHeight);
  graphics.lineStyle(3, 1256757, 0.3).strokeRect(x + thickness, y + thickness, width - thickness * 2, innerHeight);
}

// src/app/templates/programming-automation/ui/robot-course-engine/scene-art-system.ts
var SceneArtSystem = class {
  world;
  backdrop;
  foreground;
  robot;
  body;
  wheels;
  shadow;
  surface;
  targetText;
  rangeText;
  constructor(scene, view) {
    this.world = scene.add.container(0, 0);
    const p = courseProjection(view.course);
    const w = p.length(view.course.widthCm), h = p.length(view.course.heightCm);
    this.backdrop = scene.add.image(0, 64, GAME_ASSETS.WORKSHOP.key).setOrigin(0).setDepth(SCENE_DEPTH.background);
    const source = scene.textures.get(GAME_ASSETS.WORKSHOP.key).getSourceImage();
    this.backdrop.setCrop(source.width * 0.1, source.height * 0.23, source.width * 0.8, source.height * 0.6);
    this.foreground = scene.add.graphics().setDepth(SCENE_DEPTH.foreground);
    const grid = scene.add.graphics().setDepth(SCENE_DEPTH.surface);
    grid.lineStyle(1, 14414566, 0.1);
    const step = p.length(view.course.gridSizeCm);
    for (let x = 0; x <= w; x += step) grid.lineBetween(x, 0, x, h);
    for (let y = 0; y <= h; y += step) grid.lineBetween(0, y, w, y);
    grid.lineStyle(2, 15652514, 0.5).strokeRect(0, 0, w, h);
    this.surface = scene.add.graphics().setDepth(SCENE_DEPTH.objects);
    const text = (x, y, value, size, color = "#e4eadb") => scene.add.text(x, y, value, {
      fontFamily: "monospace",
      fontSize: `${size}px`,
      color,
      stroke: "#294743",
      strokeThickness: 3
    }).setDepth(SCENE_DEPTH.surface);
    const start = p.point(view.course.startPose);
    const rulerX = start.x + 72;
    grid.lineStyle(2, 15000774, 0.55).lineBetween(rulerX, 35, rulerX, h - 40);
    this.world.add(grid);
    for (let cm = 0; cm <= view.course.heightCm; cm += 25) {
      const y = p.point({ xCm: 0, yCm: cm }).y;
      grid.lineBetween(rulerX, y, rulerX + (cm % 50 ? 7 : 14), y);
      this.world.add(text(rulerX + 22, y - 6, `${cm}`, 11));
    }
    this.world.add(text(rulerX + 16, 12, "cm / N \u2191", 10));
    this.world.add(text(start.x - 35, start.y + 39, "START", 13));
    this.world.add(text(start.x + 150, start.y - 50, "PRECISION\nTEST BAY", 30, "#c0cebd").setAlpha(0.65));
    this.world.add(text(start.x + 152, start.y + 24, "CENTER ON THE CROSSHAIR", 10).setAlpha(0.7));
    this.targetText = text(0, 0, "", 14, "#fff0ba");
    this.rangeText = text(0, 0, "", 11, "#e5e9d0");
    this.shadow = scene.add.ellipse(0, 0, 47, 39, 1059625, 0.48).setDepth(SCENE_DEPTH.shadow);
    this.body = scene.add.image(0, 0, GAME_ASSETS.ROBOT_PLAYER.key).setDisplaySize(65, 65);
    this.wheels = scene.add.graphics();
    this.robot = scene.add.container(0, 0, [this.body, this.wheels]).setDepth(SCENE_DEPTH.player);
    this.world.add([this.surface, this.targetText, this.rangeText, this.shadow, this.robot]);
    this.world.sort("depth");
  }
  resize(width, height) {
    const source = this.backdrop.texture.getSourceImage();
    const available = Math.max(1, height - 108);
    const floorWidth = source.width * 0.8, floorHeight = source.height * 0.6;
    const scale = Math.max(width / floorWidth, available / floorHeight);
    this.backdrop.setScale(scale).setPosition(
      (width - floorWidth * scale) / 2 - source.width * 0.1 * scale,
      64 + (available - floorHeight * scale) / 2 - source.height * 0.23 * scale
    );
    drawArenaWalls(this.foreground.clear(), 0, 64, width, available, Math.min(28, Math.max(16, width * 0.035)));
  }
  update(view, success) {
    const p = courseProjection(view.course);
    const pose = view.sample ?? view.course.startPose;
    const point = p.point(pose);
    this.robot.setPosition(point.x, point.y).setAngle(pose.headingDeg);
    this.shadow.setPosition(point.x + 3, point.y + 8);
    const replayTime = view.sample?.timeMs ?? 0;
    const bob = view.reducedMotion ? 0 : Math.sin(replayTime / 90) * 0.35;
    this.body.setY(bob);
    const tread = view.reducedMotion ? 0 : (pose.xCm + pose.yCm + pose.headingDeg / 8) % 7;
    this.wheels.clear().lineStyle(1, 12437438, 0.5);
    for (let y = -9 + tread; y < 12; y += 7) {
      this.wheels.lineBetween(-27, y, -21, y).lineBetween(21, y, 27, y);
    }
    const target = view.course.targets[view.targetIndex] ?? view.course.targets[0];
    if (!target) return;
    const t = p.point(target), start = p.point(view.course.startPose);
    const g = this.surface.clear();
    g.fillStyle(15326640, 0.06).fillRect(start.x - 42, 15, 84, p.length(view.course.heightCm) - 30);
    g.lineStyle(2, 15590341, 0.45);
    for (let y = 20; y < p.length(view.course.heightCm) - 20; y += 25) {
      g.lineBetween(start.x - 42, y, start.x - 42, y + 12);
      g.lineBetween(start.x + 42, y, start.x + 42, y + 12);
    }
    const color = success ? 11861961 : 16765567;
    g.lineStyle(3, color).strokeRect(t.x - 31, t.y - 32, 62, 64);
    g.fillStyle(color, 0.12).fillRect(t.x - 29, t.y - 30, 58, 60);
    g.lineStyle(1.5, color).strokeCircle(t.x, t.y, p.length(view.course.toleranceCm));
    g.lineBetween(t.x - 10, t.y, t.x + 10, t.y).lineBetween(t.x, t.y - 10, t.x, t.y + 10);
    g.lineStyle(2, 14214610, 0.55).strokeCircle(start.x, start.y, 28);
    this.targetText.setText(success ? "PARKED \u2713" : `PARK / ${target.label}`).setPosition(t.x - 31, t.y - 55);
    this.rangeText.setText(`TOLERANCE \xB1${view.course.toleranceCm} cm`).setPosition(t.x + 105, t.y - 8);
    const status = workshopStatus(view);
    if (status.finished && !status.success) {
      this.rangeText.setText(`${view.result?.stoppingErrorCm.toFixed(1)} cm FROM TARGET`).setColor("#ffd0aa");
      g.lineStyle(2, 16759697, 0.8).lineBetween(point.x + 12, point.y, t.x + 12, t.y);
    } else this.rangeText.setColor("#e5e9d0");
  }
};

// src/app/templates/programming-automation/ui/robot-course-engine/workshop-renderer.ts
function createWorkshopRenderer(host, initial, onReady, onFailed) {
  let view = initial, disposed = false, failed = false, ready = false;
  let dirty = true;
  const fail = () => {
    if (!disposed && !failed) {
      failed = true;
      onFailed();
    }
  };
  class WorkshopScene extends __webpack_exports__Scene {
    art;
    fx;
    hud;
    director;
    hudCamera;
    worldCamera;
    route;
    previous;
    completed = false;
    constructor() {
      super("workshop");
    }
    preload() {
      this.load.on("loaderror", fail);
      for (const asset of Object.values(GAME_ASSETS)) this.load.image(asset.key, asset.url);
    }
    create() {
      if (failed) return;
      try {
        this.art = new SceneArtSystem(this, view);
        this.route = this.add.graphics().setDepth(SCENE_DEPTH.surface + 1);
        this.fx = new GameFXSystem(this);
        this.art.world.add([this.route, this.fx.layer]).sort("depth");
        this.hud = new GameHUD(this);
        this.previous = void 0;
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
      } catch {
        fail();
      }
    }
    renderView(now) {
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
        this.fx.clear();
        this.director.returnToGameplayView();
        this.completed = false;
      }
      const target = view.course.targets[view.targetIndex];
      if (targetChanged && target) this.fx.select(p.point(target), now);
      if (status.finished && !this.completed && !newRun && !seek) {
        const point = p.point(view.sample ?? view.course.startPose);
        if (status.success) {
          this.fx.success(point, now);
          if (!view.reducedMotion && !view.overview) this.director.focusOnObject(point, now + 1e3);
        } else this.fx.failure(point, now);
      }
      this.completed = status.finished;
      if (!newRun && !seek && time > oldTime && view.events.some((event) => event.timeMs > oldTime && event.timeMs <= time && event.message.startsWith("Collision at "))) {
        this.fx.collision(p.point(view.sample ?? view.course.startPose), now);
        this.director.impact(view.reducedMotion);
      }
      this.route.clear();
      if (view.showTrace && view.sample) {
        this.route.lineStyle(2, 13107175, 0.8).beginPath();
        let started = false;
        for (const sample of view.samples) {
          if (sample.timeMs > time) break;
          const point = p.point(sample);
          if (!started) {
            this.route.moveTo(point.x, point.y);
            started = true;
          } else this.route.lineTo(point.x, point.y);
        }
        if (started) {
          const point = p.point(view.sample);
          this.route.lineTo(point.x, point.y);
        }
        this.route.strokePath();
      }
      this.art.update(view, status.success);
      this.art.resize(this.scale.width, this.scale.height);
      this.hud.update(view, this.scale.width, this.scale.height);
      this.hudCamera.setSize(this.scale.width, this.scale.height);
      this.previous = view;
      dirty = false;
    }
    update(now, delta) {
      if (!ready || failed || disposed) return;
      try {
        if (dirty) this.renderView(now);
        this.director.update(view, this.scale.width, this.scale.height, delta, now);
        this.fx.update(now, view.reducedMotion);
        if (!view.sample && !view.reducedMotion) this.art.update(view, false);
      } catch {
        fail();
      }
    }
  }
  const contextLost = (event) => {
    event.preventDefault();
    fail();
  };
  const game = new __webpack_exports__Game({
    type: __webpack_exports__AUTO,
    parent: host,
    width: Math.max(1, host.clientWidth),
    height: Math.max(1, host.clientHeight),
    backgroundColor: "#142d2c",
    banner: false,
    audio: { noAudio: true },
    fps: { target: 30 },
    render: { antialias: true },
    scale: { mode: __webpack_exports__Scale.NONE },
    scene: [WorkshopScene],
    callbacks: { postBoot: (booted) => {
      if (!disposed) booted.canvas.addEventListener("webglcontextlost", contextLost);
    } }
  });
  const observer = new ResizeObserver(() => {
    if (disposed || !game.isBooted || !host.clientWidth || !host.clientHeight) return;
    game.scale.resize(host.clientWidth, host.clientHeight);
    dirty = true;
  });
  observer.observe(host);
  const timeout = window.setTimeout(() => {
    if (!ready) fail();
  }, 15e3);
  return {
    update(next) {
      if (view.course !== next.course && ready) {
        view = next;
        ready = false;
        game.scene.getScene("workshop").scene.restart();
      } else view = next;
      dirty = true;
    },
    destroy() {
      if (disposed) return;
      disposed = true;
      window.clearTimeout(timeout);
      observer.disconnect();
      game.canvas?.removeEventListener("webglcontextlost", contextLost);
      game.destroy(true);
    }
  };
}

// src/app/templates/programming-automation/ui/robot-course-engine/tabletop-props.ts
function drawCrate(g, x, y, size) {
  g.fillStyle(2630943, 0.22).fillRect(x + 4, y + 6, size, size);
  g.fillStyle(8872251).fillRect(x, y, size, size);
  g.lineStyle(1.5, 4602670).strokeRect(x, y, size, size);
  for (let i = 1; i < 4; i++) {
    g.lineStyle(1, 4667173, 0.6).lineBetween(
      x + size * i / 4,
      y + 3,
      x + size * i / 4,
      y + size - 3
    );
  }
  g.lineStyle(4, 11700821).strokeRect(x + 3, y + 3, size - 6, size - 6);
  g.lineStyle(4, 11700821).lineBetween(x + 5, y + size - 5, x + size - 5, y + 5);
  for (const dx of [3, size - 3])
    for (const dy of [3, size - 3]) g.fillStyle(4735800).fillCircle(x + dx, y + dy, 1);
}
function drawSteelBlock(g, x, y, width, height, moving = false) {
  g.fillStyle(2105630, 0.24).fillRoundedRect(x + 4, y + 6, width, height, 3);
  g.fillStyle(4803654).fillRoundedRect(x, y, width, height, 3);
  g.lineStyle(2, 3422258).strokeRoundedRect(x, y, width, height, 3);
  g.fillStyle(6514527).fillRect(x + 5, y + 5, width - 10, height - 10);
  g.lineStyle(1, 8948604).strokeRect(x + 5, y + 5, width - 10, height - 10);
  if (moving) {
    g.fillStyle(13675605).fillRect(x + 3, y + height - 9, width - 6, 6);
    for (let i = 5; i < width - 7; i += 10)
      g.fillStyle(3554358).fillTriangle(
        x + i,
        y + height - 9,
        x + i + 5,
        y + height - 9,
        x + i,
        y + height - 3
      );
  }
  for (const dx of [3, width - 3])
    for (const dy of [3, height - 3]) {
      g.fillStyle(3157800).fillCircle(x + dx, y + dy, 2);
      g.lineStyle(1, 10852984).strokeCircle(x + dx, y + dy, 2);
    }
}
function drawTabletopRobot(g, radius, phase, patrol = false, carrying = false) {
  g.clear();
  const r = radius;
  g.fillStyle(2633002, 0.24).fillEllipse(2, 4, r * 2.3, r * 2.1);
  for (const side of [-1, 1]) {
    const x = side * r * 0.78 - r * 0.18;
    g.fillStyle(2962481).fillRoundedRect(x, -r * 0.68, r * 0.36, r * 1.4, 3);
    g.lineStyle(0.8, 7567473).strokeRoundedRect(x, -r * 0.68, r * 0.36, r * 1.4, 3);
    for (let i = 0; i < 6; i++) {
      const y = -r * 0.58 + (i + phase % 1) / 6 * r * 1.16;
      g.lineStyle(1.2, 5397589).lineBetween(x + 1, y, x + r * 0.36 - 1, y);
    }
  }
  g.fillStyle(2699051).fillRoundedRect(-r * 0.7, -r * 0.84, r * 1.4, r * 1.7, 4);
  g.fillStyle(patrol ? 13269344 : 14475479).fillRoundedRect(
    -r * 0.6,
    -r * 0.8,
    r * 1.2,
    r * 1.52,
    3
  );
  g.lineStyle(1, 10333604).strokeRoundedRect(-r * 0.6, -r * 0.8, r * 1.2, r * 1.52, 3);
  g.fillStyle(6451047).fillRoundedRect(-r * 0.4, -r * 0.4, r * 0.8, r * 0.86, 2);
  g.lineStyle(1, 3819073).strokeRoundedRect(-r * 0.4, -r * 0.4, r * 0.8, r * 0.86, 2);
  g.fillStyle(2702657).fillCircle(0, 0, r * 0.22);
  g.fillStyle(patrol ? 16307076 : 6471645).fillCircle(0, 0, r * 0.13);
  g.fillStyle(3423800).fillRoundedRect(-r * 0.23, -r, r * 0.46, r * 0.28, 2);
  g.fillStyle(patrol ? 16765560 : 10214879).fillRect(-r * 0.13, -r * 0.94, r * 0.26, r * 0.08);
  for (const x of [-0.47, 0.47])
    for (const y of [-0.65, 0.55]) {
      g.fillStyle(4609613).fillCircle(r * x, r * y, 1.1);
    }
  if (carrying) drawCrate(g, -r * 0.3, r * 0.1, r * 0.6);
}

// src/app/templates/programming-automation/ui/robot-course-engine/tabletop-board.ts
var BOARD_RIM = 34;
function boardText(scene, x, y, text, size = 12, color = "#3c473f") {
  return scene.add.text(x, y, text, {
    fontFamily: "Arial, sans-serif",
    fontSize: `${size}px`,
    color,
    fontStyle: "bold",
    align: "center"
  }).setOrigin(0.5).setDepth(2);
}
function dashedLine(g, x1, y1, x2, y2, dash = 7) {
  const length = Math.hypot(x2 - x1, y2 - y1);
  for (let d = 0; d < length; d += dash * 1.7) {
    const end = Math.min(length, d + dash);
    g.lineBetween(
      x1 + (x2 - x1) * d / length,
      y1 + (y2 - y1) * d / length,
      x1 + (x2 - x1) * end / length,
      y1 + (y2 - y1) * end / length
    );
  }
}
function markedZone(g, x, y, w, h, color) {
  g.fillStyle(color, 0.24).fillRect(x, y, w, h);
  g.lineStyle(1, color, 0.45).strokeRect(x, y, w, h);
  g.lineStyle(2, color, 0.9);
  dashedLine(g, x + 3, y + 3, x + w - 3, y + 3, 5);
  dashedLine(g, x + 3, y + h - 3, x + w - 3, y + h - 3, 5);
  dashedLine(g, x + 3, y + 3, x + 3, y + h - 3, 5);
  dashedLine(g, x + w - 3, y + 3, x + w - 3, y + h - 3, 5);
}
function buildTabletopBoard(scene, course) {
  const p = courseProjection(course), w = p.length(course.widthCm), h = p.length(course.heightCm);
  const cell = p.length(course.gridSizeCm), rim = BOARD_RIM;
  let g = scene.add.graphics();
  g.fillStyle(3421999, 0.22).fillRoundedRect(-rim + 5, -rim + 8, w + rim * 2, h + rim * 2, 6);
  g.fillStyle(13092279).fillRoundedRect(-rim, -rim, w + rim * 2, h + rim * 2, 5);
  g.fillStyle(14868435).fillRect(0, 0, w, h);
  for (let row = 0; row < Math.ceil(h / cell); row++)
    for (let col = 0; col < Math.ceil(w / cell); col++) {
      const x = col * cell, y = row * cell, cw = Math.min(cell, w - x), ch = Math.min(cell, h - y);
      g.fillStyle((row + col) % 2 ? 14276556 : 15000022, 0.55).fillRect(x, y, cw, ch);
    }
  let seed = 419;
  for (let i = 0; i < 1900; i++) {
    seed = Math.imul(seed, 1664525) + 1013904223 >>> 0;
    const x = seed / 4294967296 * (w + rim * 2) - rim;
    seed = Math.imul(seed, 1664525) + 1013904223 >>> 0;
    const y = seed / 4294967296 * (h + rim * 2) - rim;
    g.fillStyle(i % 2 ? 5001541 : 16777215, 0.045).fillRect(x, y, 1, 1);
  }
  g.fillStyle(9608581).fillRect(0, -rim, w, rim);
  g.fillStyle(9674892).fillRect(w, 0, rim, h);
  g.fillStyle(8887979).fillRect(-rim, 0, rim, h);
  g.fillStyle(12421504).fillRect(0, h, w, rim);
  g.lineStyle(1.1, 5265742, 0.7);
  for (let x = 0; x <= w; x += cell) g.lineBetween(x, -rim, x, h + rim);
  for (let y = 0; y <= h; y += cell) g.lineBetween(-rim, y, w + rim, y);
  g.strokeRect(0, 0, w, h);
  for (let col = 0; col < Math.ceil(w / cell); col++) {
    const label = String.fromCharCode(65 + col), x = (col + 0.5) * cell;
    boardText(scene, x, -rim / 2, label, 19);
    boardText(scene, x, h + rim / 2, label, 19);
  }
  for (let row = 0; row < Math.ceil(h / cell); row++) {
    const label = String(Math.ceil(h / cell) - row), y = (row + 0.5) * cell;
    boardText(scene, -rim / 2, y, label, 17);
    boardText(scene, w + rim / 2, y, label, 17);
  }
  for (const x of [-rim, w])
    for (const y of [-rim, h]) {
      g.fillStyle(4344131).fillRoundedRect(x, y, rim, rim, 3);
      g.lineStyle(2, 2436649).strokeRoundedRect(x, y, rim, rim, 3);
      g.lineStyle(5, 5857368).lineBetween(x + 6, y + rim - 6, x + rim - 6, y + 6);
      for (const d of [5, rim - 5]) {
        g.fillStyle(7962739).fillCircle(x + d, y + d, 2);
        g.lineStyle(1, 3159855).lineBetween(x + d - 1, y + d, x + d + 1, y + d);
      }
    }
  g = scene.add.graphics().setDepth(1);
  const start = p.point(course.startPose), zoneSize = Math.min(58, cell * 0.8);
  markedZone(g, start.x - zoneSize / 2, start.y - zoneSize / 2, zoneSize, zoneSize, 5075331);
  boardText(scene, start.x, start.y + zoneSize / 2 + 11, "START", 10, "#416071");
  for (const zone of course.deliveryZones) {
    const point = p.point({ xCm: zone.xCm, yCm: zone.yCm + zone.heightCm });
    markedZone(g, point.x, point.y, p.length(zone.widthCm), p.length(zone.heightCm), 5471626);
    boardText(
      scene,
      point.x + p.length(zone.widthCm) / 2,
      point.y + p.length(zone.heightCm) / 2,
      `DELIVER
${zone.label}`,
      11
    );
  }
  course.checkpoints.forEach((checkpoint, i) => {
    const point = p.point(checkpoint), r = Math.max(14, p.length(checkpoint.radiusCm));
    g.fillStyle(i % 2 ? 13806926 : 13204834, 0.8).fillCircle(point.x, point.y, r);
    g.lineStyle(2, 15852733).strokeCircle(point.x, point.y, r * 0.62);
    boardText(scene, point.x, point.y, String(i + 1), 11);
  });
  for (const actor of course.actors ?? []) {
    g.lineStyle(2, actor.kind === "robot" ? 11362891 : 9272131, 0.6);
    const path = actor.patrol === "loop" ? [...actor.path, actor.path[0]] : actor.path;
    for (let i = 1; i < path.length; i++) {
      const a = p.point(path[i - 1]), b = p.point(path[i]);
      dashedLine(g, a.x, a.y, b.x, b.y);
    }
    for (const point2 of actor.path) {
      const a = p.point(point2);
      g.strokeCircle(a.x, a.y, 5);
    }
    const point = p.point(actor.path[0]);
    boardText(
      scene,
      point.x + 12,
      point.y - 25,
      `${actor.kind === "robot" ? "PATROL" : "GATE"} \xB7 ${actor.speedCmPerSecond} cm/s`,
      11,
      "#805d3d"
    ).setOrigin(0, 0.5);
  }
  for (const obstacle of course.obstacles) {
    const point = p.point({ xCm: obstacle.xCm, yCm: obstacle.yCm + obstacle.heightCm });
    drawSteelBlock(g, point.x, point.y, p.length(obstacle.widthCm), p.length(obstacle.heightCm));
    boardText(
      scene,
      point.x + p.length(obstacle.widthCm) / 2,
      point.y + p.length(obstacle.heightCm) / 2,
      "KEEP\nCLEAR",
      11,
      "#e0decc"
    );
  }
}

// src/app/templates/programming-automation/ui/robot-course-engine/tabletop-renderer.ts
function createTabletopRenderer(host, initial, onReady, onFailed) {
  let view = initial, disposed = false, failed = false, ready = false, dirty = true;
  const fail = () => {
    if (!disposed && !failed) {
      failed = true;
      onFailed();
    }
  };
  class TabletopScene extends __webpack_exports__Scene {
    objects;
    route;
    robot;
    goal;
    goalLabel;
    actors = [];
    previewOrigin = 0;
    constructor() {
      super("tabletop");
    }
    create() {
      try {
        buildTabletopBoard(this, view.course);
        this.goal = this.add.graphics().setDepth(2);
        this.goalLabel = boardText(this, 0, 0, "GOAL", 12).setDepth(3);
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
    renderView(now) {
      const course = view.course, p = courseProjection(course);
      const w = p.length(course.widthCm), h = p.length(course.heightCm);
      const time = view.sample?.timeMs ?? (view.reducedMotion ? 0 : now - this.previewOrigin);
      const pose = view.sample ?? course.startPose, position = p.point(pose);
      const target = p.point(course.targets[view.targetIndex] ?? course.targets[0]);
      const size = Math.min(58, p.length(course.gridSizeCm) * 0.8);
      const finished = !!view.sample && !!view.result && view.sample.timeMs >= (view.samples.at(-1)?.timeMs ?? Infinity);
      const success = finished && view.result.completedMission;
      this.goal.clear();
      markedZone(
        this.goal,
        target.x - size / 2,
        target.y - size / 2,
        size,
        size,
        success ? 3964253 : 7045200
      );
      this.goal.fillStyle(4940352).fillTriangle(target.x, target.y - 12, target.x - 7, target.y, target.x + 7, target.y);
      this.goalLabel.setPosition(target.x, target.y + 11).setText(success ? "DONE" : "GOAL");
      this.goal.lineStyle(1.5, 4878683, 0.6).strokeCircle(target.x, target.y, p.length(course.toleranceCm));
      if (!view.reducedMotion && !finished) {
        this.goal.lineStyle(1, 6193234, 0.16 + Math.sin(time / 700) * 0.08).strokeRect(target.x - size / 2 - 4, target.y - size / 2 - 4, size + 8, size + 8);
      }
      this.route.clear();
      let distance = 0, previous = course.startPose;
      if (view.showTrace && view.sample)
        this.route.lineStyle(3, 3767441, 0.75).beginPath().moveTo(p.point(previous).x, p.point(previous).y);
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
        if (view.sample?.carryingPackageIds.includes(pkg.id) || view.sample?.deliveredPackageIds.includes(pkg.id))
          continue;
        const point = p.point(pkg);
        drawCrate(this.objects, point.x - 15, point.y - 15, 30);
      }
      for (const zone of course.deliveryZones) {
        const packages = course.packages.filter((pkg) => pkg.deliveryZoneId === zone.id);
        if (packages.length && packages.every((pkg) => view.sample?.deliveredPackageIds.includes(pkg.id))) {
          const point = p.point({
            xCm: zone.xCm + zone.widthCm / 2,
            yCm: zone.yCm + zone.heightCm / 2
          });
          this.objects.lineStyle(3, 3045458).lineBetween(point.x - 6, point.y, point.x - 1, point.y + 5).lineBetween(point.x - 1, point.y + 5, point.x + 8, point.y - 7);
        }
      }
      (course.actors ?? []).forEach((actor, index) => {
        const state = sampleCourseActor(actor, time), point = p.point(state), g = this.actors[index];
        g.clear().setPosition(point.x, point.y);
        if (actor.kind === "robot") {
          drawTabletopRobot(
            g,
            p.length(actor.radiusCm),
            view.reducedMotion || !state.moving ? 0 : time / 100,
            true
          );
          g.setAngle(state.headingDeg);
        } else
          drawSteelBlock(
            g,
            -p.length(actor.widthCm) / 2,
            -p.length(actor.heightCm) / 2,
            p.length(actor.widthCm),
            p.length(actor.heightCm),
            true
          );
      });
      drawTabletopRobot(
        this.robot,
        p.length(view.robotRadiusCm ?? 8),
        view.reducedMotion ? 0 : distance / 2,
        false,
        !!view.sample?.carryingPackageIds.length
      );
      this.robot.setPosition(position.x, position.y).setAngle(pose.headingDeg);
      if (finished)
        this.objects.lineStyle(3, success ? 5016674 : 11950917, 0.9).strokeCircle(position.x, position.y, 24);
      const fit = Math.min(
        this.scale.width / (w + (BOARD_RIM + 12) * 2),
        this.scale.height / (h + (BOARD_RIM + 12) * 2)
      );
      this.cameras.main.setZoom(fit * view.zoom).centerOn(view.follow ? position.x : w / 2, view.follow ? position.y : h / 2);
      dirty = false;
    }
    update(now) {
      if (!ready || failed || disposed) return;
      try {
        if (dirty || !view.sample && !view.reducedMotion) this.renderView(now);
      } catch {
        fail();
      }
    }
  }
  const lost = (event) => {
    event.preventDefault();
    fail();
  };
  const game = new __webpack_exports__Game({
    type: __webpack_exports__AUTO,
    parent: host,
    width: Math.max(1, host.clientWidth),
    height: Math.max(1, host.clientHeight),
    backgroundColor: "#bebeb0",
    banner: false,
    audio: { noAudio: true },
    fps: { target: 30 },
    render: { antialias: true },
    scale: { mode: __webpack_exports__Scale.NONE },
    scene: [TabletopScene],
    callbacks: {
      postBoot: (booted) => {
        if (!disposed) booted.canvas.addEventListener("webglcontextlost", lost);
      }
    }
  });
  const observer = new ResizeObserver(() => {
    if (disposed || !game.isBooted || !host.clientWidth || !host.clientHeight) return;
    game.scale.resize(host.clientWidth, host.clientHeight);
    dirty = true;
  });
  observer.observe(host);
  const timeout = window.setTimeout(() => {
    if (!ready) fail();
  }, 15e3);
  return {
    update(next) {
      const changed = view.course !== next.course;
      view = next;
      if (changed && ready) {
        ready = false;
        game.scene.getScene("tabletop").scene.restart();
      }
      dirty = true;
    },
    destroy() {
      if (disposed) return;
      disposed = true;
      window.clearTimeout(timeout);
      observer.disconnect();
      game.canvas?.removeEventListener("webglcontextlost", lost);
      game.destroy(true);
    }
  };
}

// src/app/templates/programming-automation/ui/robot-course-engine/phaser-robot-course-renderer.ts
function createRobotCourseRenderer(host, initial, onReady, onFailed) {
  let theme = initial.course.visualTheme;
  const create = (view) => (view.course.visualTheme === "tabletop" ? createTabletopRenderer : view.course.visualTheme === "workshop" ? createWorkshopRenderer : createLegacyRobotCourseRenderer)(host, view, onReady, onFailed);
  let renderer = create(initial);
  return {
    update(view) {
      if (theme !== view.course.visualTheme) {
        renderer.destroy();
        theme = view.course.visualTheme;
        renderer = create(view);
      } else renderer.update(view);
    },
    destroy() {
      renderer.destroy();
    }
  };
}
function createLegacyRobotCourseRenderer(host, initial, onReady, onFailed) {
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
  class BootScene extends __webpack_exports__Scene {
    constructor() {
      super("robot-boot");
    }
    create() {
      this.scene.start("robot-course");
    }
  }
  class CourseScene extends __webpack_exports__Scene {
    floor;
    route;
    objects;
    feedback;
    robot;
    wheels;
    scanner;
    cargo;
    effects;
    targetLabel;
    lastEffectsTime = -Infinity;
    packageLabels = /* @__PURE__ */ new Map();
    labels = [];
    course;
    previousTime = 0;
    previousSamples;
    previousEvents;
    collisions = [];
    constructor() {
      super("robot-course");
    }
    create() {
      try {
        this.cameras.main.setBackgroundColor("#0b1927");
        this.floor = this.add.graphics().setDepth(0);
        this.route = this.add.graphics().setDepth(1);
        this.objects = this.add.graphics().setDepth(2);
        this.feedback = this.add.graphics().setDepth(3);
        this.effects = new RobotCourseEffects(this);
        this.targetLabel = this.add.text(0, 0, "PARK", {
          fontFamily: "monospace",
          fontSize: "11px",
          color: "#ffda91",
          backgroundColor: "#2b302f",
          padding: { x: 6, y: 3 }
        }).setOrigin(0.5).setDepth(4);
        this.createRobot();
        ready = true;
        this.draw();
        onReady();
      } catch {
        fail();
      }
    }
    label(x, y, text, color = "#a5bfcc", size = 12) {
      this.labels.push(this.add.text(x, y, text, {
        fontFamily: "monospace",
        fontSize: `${size}px`,
        color,
        stroke: "#102331",
        strokeThickness: 3
      }).setOrigin(0.5).setDepth(4));
    }
    buildCourse() {
      const course = view.course;
      this.course = course;
      this.labels.forEach((label) => label.destroy());
      this.labels = [];
      this.packageLabels.clear();
      const p = courseProjection(course);
      const width = p.length(course.widthCm);
      const height = p.length(course.heightCm);
      const g = this.floor.clear();
      g.fillStyle(397340).fillRoundedRect(-12, -12, width + 24, height + 24, 10);
      g.fillStyle(1651266).fillRect(0, 0, width, height);
      const grid = p.length(Math.max(1, course.gridSizeCm));
      for (let y = 0, row = 0; y < height; y += grid, row++) {
        for (let x = 0, col = 0; x < width; x += grid, col++) {
          if ((row + col) % 2 === 0) g.fillStyle(2178637, 0.45).fillRect(x, y, Math.min(grid, width - x), Math.min(grid, height - y));
        }
      }
      g.lineStyle(1, 7706538, 0.18);
      for (let x = 0; x <= width; x += grid) g.lineBetween(x, 0, x, height);
      for (let y = 0; y <= height; y += grid) g.lineBetween(0, y, width, y);
      g.lineStyle(2, 6789542).strokeRect(0, 0, width, height);
      drawArenaWalls(g, -12, -12, width + 24, height + 24, 12);
      for (let x = 0; x <= course.widthCm; x += 50) this.label(p.length(x), height + 23, `${x}`);
      for (let y = 0; y <= course.heightCm; y += 50) this.label(-28, p.point({ xCm: 0, yCm: y }).y, `${y}`);
      this.label(width / 2, -25, "N \u2191  \xB7  CENTIMETERS", "#9dbfce", 11);
      const start = p.point(course.startPose);
      g.fillStyle(2576726, 0.7).fillCircle(start.x, start.y, 26);
      g.lineStyle(2, 7713205).strokeCircle(start.x, start.y, 26);
      this.label(start.x, start.y + 40, "START", "#b6d8db", 10);
      for (const checkpoint of course.checkpoints) {
        const point = p.point(checkpoint);
        g.lineStyle(2, 14726248, 0.8).strokeCircle(point.x, point.y, p.length(checkpoint.radiusCm));
        g.lineBetween(point.x - 6, point.y, point.x + 6, point.y);
        g.lineBetween(point.x, point.y - 6, point.x, point.y + 6);
      }
      for (const rack of course.obstacles) {
        const point = p.point({ xCm: rack.xCm, yCm: rack.yCm + rack.heightCm });
        const w = p.length(rack.widthCm), h = p.length(rack.heightCm);
        g.fillStyle(265494, 0.7).fillRoundedRect(point.x + 5, point.y + 8, w, h, 4);
        g.fillStyle(5401979).fillRoundedRect(point.x, point.y, w, h, 3);
        g.lineStyle(2, 9810621).strokeRect(point.x, point.y, w, h);
        g.fillStyle(2242630).fillRect(point.x + 4, point.y + 4, Math.max(0, w - 8), Math.max(0, h - 15));
        for (let x = 5; x + 27 < w; x += 34) {
          for (let y = 6; y + 29 < h - 20; y += 36) this.crate(g, point.x + x + 13, point.y + y + 13, 1);
        }
        for (let x = 0; x < w; x += 12) g.fillStyle(Math.floor(x / 12) % 2 ? 1845812 : 15051857).fillRect(point.x + x, point.y + h - 7, Math.min(12, w - x), 7);
        this.label(point.x + w / 2, point.y + h - 20, rack.label, "#ecf4f6", 10);
      }
      for (const zone of course.deliveryZones) {
        const point = p.point({ xCm: zone.xCm + zone.widthCm / 2, yCm: zone.yCm + zone.heightCm });
        this.label(point.x, point.y - 14, zone.label, "#a4f7d2", 12);
      }
      for (const pkg of course.packages) {
        const point = p.point(pkg);
        this.label(point.x, point.y - 29, pkg.label, "#ffd68c", 11);
        this.packageLabels.set(pkg.id, this.labels[this.labels.length - 1]);
      }
    }
    crate(g, x, y, scale) {
      g.fillStyle(7422753).fillRoundedRect(x - 13 * scale, y - 10 * scale, 26 * scale, 27 * scale, 2);
      g.fillStyle(14394457).fillRoundedRect(x - 13 * scale, y - 14 * scale, 26 * scale, 26 * scale, 2);
      g.lineStyle(scale, 16768667).strokeRect(x - 12 * scale, y - 13 * scale, 24 * scale, 24 * scale);
      g.fillStyle(9658679).fillRect(x - 3 * scale, y - 13 * scale, 6 * scale, 24 * scale);
      g.fillStyle(16772299).fillRect(x + 4 * scale, y - 5 * scale, 6 * scale, 6 * scale);
    }
    createRobot() {
      this.robot = this.add.container(0, 0).setDepth(5);
      const body = this.add.graphics();
      body.fillStyle(199187, 0.5).fillEllipse(3, 8, 53, 53);
      body.fillStyle(464417).fillRoundedRect(-24, -17, 12, 38, 4).fillRoundedRect(12, -17, 12, 38, 4);
      body.lineStyle(1, 7049629).strokeRoundedRect(-24, -17, 12, 38, 4).strokeRoundedRect(12, -17, 12, 38, 4);
      body.fillStyle(1343356).fillRoundedRect(-17, -22, 34, 46, 10);
      body.fillStyle(3853747).fillRoundedRect(-15, -20, 7, 40, 5);
      body.fillStyle(614503).fillRoundedRect(10, -19, 5, 39, 3);
      body.lineStyle(2, 8648926).strokeRoundedRect(-17, -22, 34, 46, 10);
      body.fillStyle(12902363).fillRoundedRect(-14, -21, 28, 22, 8);
      body.fillStyle(665653).fillRoundedRect(-11, -17, 22, 11, 4);
      body.fillStyle(8126437).fillRoundedRect(-8, -14, 5, 4, 1).fillRoundedRect(3, -14, 5, 4, 1);
      body.fillStyle(1391945).fillRoundedRect(-10, 5, 20, 12, 2);
      body.lineStyle(1, 9890013, 0.65).lineBetween(-9, 6, 8, 6);
      body.fillStyle(9437153).fillCircle(0, 1, 2);
      body.lineStyle(2, 6548430).lineBetween(-10, 20, 10, 20);
      body.fillStyle(16770469).fillRect(-15, -20, 4, 3).fillRect(11, -20, 4, 3);
      this.wheels = this.add.graphics();
      this.scanner = this.add.graphics();
      this.cargo = this.add.graphics();
      this.robot.add([this.scanner, body, this.wheels, this.cargo]);
    }
    drawObjects() {
      const p = courseProjection(view.course);
      const g = this.objects.clear();
      for (const zone of view.course.deliveryZones) {
        const point = p.point({ xCm: zone.xCm, yCm: zone.yCm + zone.heightCm });
        const packages = view.course.packages.filter((pkg) => pkg.deliveryZoneId === zone.id);
        const complete = packages.length > 0 && packages.every((pkg) => view.sample?.deliveredPackageIds.includes(pkg.id));
        const w = p.length(zone.widthCm), h = p.length(zone.heightCm);
        g.fillStyle(complete ? 2391393 : 1592392, 0.8).fillRoundedRect(point.x, point.y, w, h, 5);
        g.lineStyle(2, complete ? 11665355 : 5756585).strokeRoundedRect(point.x, point.y, w, h, 5);
        g.lineStyle(1, 9433537, 0.4).strokeRect(point.x + 7, point.y + 7, Math.max(0, w - 14), Math.max(0, h - 14));
        if (complete) {
          const cx = point.x + w / 2, cy = point.y + h / 2;
          g.lineStyle(4, 13565919).lineBetween(cx - 10, cy, cx - 2, cy + 8).lineBetween(cx - 2, cy + 8, cx + 14, cy - 10);
        }
      }
      const target = view.course.targets[view.targetIndex] ?? view.course.targets[0];
      if (target) {
        const point = p.point(target);
        this.targetLabel.setVisible(true).setText(`PARK \xB7 ${target.label}`).setPosition(point.x, point.y - 58);
        g.fillStyle(16234064, 0.09).fillCircle(point.x, point.y, 44);
        g.lineStyle(2, 16763502).strokeCircle(point.x, point.y, p.length(view.course.toleranceCm));
        g.lineStyle(1, 16763502, 0.4).strokeCircle(point.x, point.y, 28);
        g.lineStyle(2, 16769959).lineBetween(point.x - 9, point.y, point.x + 9, point.y).lineBetween(point.x, point.y - 9, point.x, point.y + 9);
        const angle = __webpack_exports__Math.DegToRad(target.headingDeg);
        g.lineBetween(point.x, point.y, point.x + Math.sin(angle) * 26, point.y - Math.cos(angle) * 26);
      } else this.targetLabel.setVisible(false);
      for (const pkg of view.course.packages) {
        const available = !view.sample?.carryingPackageIds.includes(pkg.id) && !view.sample?.deliveredPackageIds.includes(pkg.id);
        this.packageLabels.get(pkg.id)?.setVisible(available);
        if (!available) continue;
        const point = p.point(pkg);
        g.fillStyle(199703, 0.55).fillEllipse(point.x + 2, point.y + 12, 36, 20);
        this.crate(g, point.x, point.y, 1);
      }
    }
    drawRoute() {
      const g = this.route.clear();
      if (!view.showTrace) return;
      const p = courseProjection(view.course);
      const time = view.sample?.timeMs ?? 0;
      for (const [width, alpha] of [[9, 0.12], [2.5, 0.95]]) {
        g.lineStyle(width, 7402719, alpha).beginPath();
        let started = false;
        for (const sample of view.samples) {
          if (sample.timeMs > time) break;
          const point = p.point(sample);
          if (!started) {
            g.moveTo(point.x, point.y);
            started = true;
          } else g.lineTo(point.x, point.y);
        }
        if (started && view.sample) {
          const point = p.point(view.sample);
          g.lineTo(point.x, point.y);
        }
        g.strokePath();
      }
    }
    drawFeedback() {
      const time = view.sample?.timeMs ?? 0;
      const g = this.feedback.clear();
      const p = courseProjection(view.course);
      if (this.previousSamples !== view.samples || this.previousEvents !== view.events) {
        this.previousSamples = view.samples;
        this.previousEvents = view.events;
        this.previousTime = time;
        this.collisions = view.events.filter((event) => event.message.startsWith("Collision at ")).map((event) => ({ timeMs: event.timeMs, pose: sampleRobotReplay(view.samples, event.timeMs) ?? view.course.startPose }));
      }
      for (const collision of this.collisions) {
        if (collision.timeMs > time) continue;
        const point = p.point(collision.pose);
        g.lineStyle(3, 16743798).strokeCircle(point.x, point.y, 20);
        g.lineBetween(point.x - 5, point.y - 5, point.x + 5, point.y + 5).lineBetween(point.x + 5, point.y - 5, point.x - 5, point.y + 5);
        if (!view.reducedMotion && collision.timeMs > this.previousTime && time - this.previousTime < 250) {
          this.cameras.main.shake(100, 3e-3);
        }
        const age = time - collision.timeMs;
        if (!view.reducedMotion && age < 600) {
          g.lineStyle(2, 16760693, 1 - age / 600);
          for (let i = 0; i < 8; i++) {
            const angle = i * Math.PI / 4, radius = 22 + age / 20;
            g.lineBetween(
              point.x + Math.cos(angle) * radius,
              point.y + Math.sin(angle) * radius,
              point.x + Math.cos(angle) * (radius + 7),
              point.y + Math.sin(angle) * (radius + 7)
            );
          }
        }
      }
      this.previousTime = time;
    }
    applyCamera() {
      const camera = this.cameras.main;
      const p = courseProjection(view.course);
      const w = p.length(view.course.widthCm), h = p.length(view.course.heightCm);
      const zoom = Math.min(this.scale.width / (w + 100), this.scale.height / (h + 90)) * view.zoom;
      camera.setZoom(zoom);
      const position = view.follow ? p.point(view.sample ?? view.course.startPose) : { x: w / 2, y: h / 2 };
      const halfW = this.scale.width / zoom / 2, halfH = this.scale.height / zoom / 2;
      camera.centerOn(
        halfW * 2 >= w + 100 ? w / 2 : __webpack_exports__Math.Clamp(position.x, halfW - 50, w + 50 - halfW),
        halfH * 2 >= h + 90 ? h / 2 : __webpack_exports__Math.Clamp(position.y, halfH - 45, h + 45 - halfH)
      );
    }
    draw() {
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
      this.wheels.clear().lineStyle(1.5, 6652813);
      for (let y = -14 + tread; y < 18; y += 6) {
        this.wheels.lineBetween(-22, y, -15, y).lineBetween(15, y, 22, y);
      }
      this.scanner.clear().fillStyle(7862495, 0.055).fillTriangle(-12, -18, -37, -85, 37, -85);
      const sweep = view.reducedMotion ? 0 : Math.sin(time / 450) * 25;
      this.scanner.lineStyle(1, 8122072, 0.4).lineBetween(0, -20, sweep, -75);
      this.cargo.clear();
      if (view.sample?.carryingPackageIds.length) this.crate(this.cargo, 0, 10, 0.5);
      this.applyCamera();
      this.effects.draw(view, this.time.now);
      dirty = false;
    }
    update(time) {
      if (disposed || failed) return;
      try {
        if (dirty) this.draw();
        if (!view.reducedMotion && !view.sample && time - this.lastEffectsTime >= 33) {
          this.effects.draw(view, time);
          this.lastEffectsTime = time;
        }
      } catch {
        fail();
      }
    }
  }
  const contextLost = (event) => {
    event.preventDefault();
    fail();
  };
  const game = new __webpack_exports__Game({
    type: __webpack_exports__AUTO,
    parent: host,
    width: Math.max(1, host.clientWidth),
    height: Math.max(1, host.clientHeight),
    backgroundColor: "#0b1927",
    banner: false,
    audio: { noAudio: true },
    render: { antialias: true, roundPixels: false },
    scale: { mode: __webpack_exports__Scale.NONE },
    scene: [BootScene, CourseScene],
    callbacks: {
      postBoot: (bootedGame) => {
        if (!disposed) bootedGame.canvas.addEventListener("webglcontextlost", contextLost);
      }
    }
  });
  const observer = new ResizeObserver(() => {
    if (disposed || !game.isBooted || !host.clientWidth || !host.clientHeight) return;
    game.scale.resize(host.clientWidth, host.clientHeight);
    dirty = true;
  });
  observer.observe(host);
  const timeout = window.setTimeout(() => {
    if (!ready) fail();
  }, 1e4);
  return {
    update(next) {
      view = next;
      dirty = true;
    },
    destroy() {
      if (disposed) return;
      disposed = true;
      window.clearTimeout(timeout);
      observer.disconnect();
      game.canvas?.removeEventListener("webglcontextlost", contextLost);
      game.destroy(true);
    }
  };
}
export {
  createRobotCourseRenderer
};
//# debugId=978bfa36-84e0-55ab-a78c-e7f9a33864d5
//# sourceMappingURL=chunk-FAX64INR.js.map
