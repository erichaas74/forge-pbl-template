import {
  blockedSight,
  location,
  patrolPosition,
  position,
  routeChallenges,
  verified
} from "./chunk-MCTIEJ4Y.js";
import {
  __webpack_exports__AUTO,
  __webpack_exports__CANVAS,
  __webpack_exports__Game,
  __webpack_exports__GameObjects,
  __webpack_exports__Math,
  __webpack_exports__Scale,
  __webpack_exports__Scene
} from "./chunk-DKBEUOCQ.js";
import {
  __spreadProps,
  __spreadValues
} from "./chunk-GOMI4DH3.js";

// src/app/templates/heist/game/scene-art.ts
var SceneArt = class {
  constructor(scene, mission) {
    this.scene = scene;
    this.mission = mission;
  }
  scene;
  mission;
  available = false;
  preload() {
    this.scene.load.svg("mission-map", this.mission.map.image, { width: this.mission.map.width, height: this.mission.map.height });
    const art = this.mission.presentation;
    if (art) for (const key of ["ground", "buildings", "characters", "props"]) this.scene.load.image(key, art[key]);
  }
  create() {
    const s = this.scene, m = this.mission, art = m.presentation;
    this.available = !!art && ["ground", "buildings", "characters", "props"].every((k) => s.textures.exists(k));
    if (!art || !this.available) {
      s.add.image(0, 0, "mission-map").setOrigin(0).setDepth(-100);
      return;
    }
    art.groundSlices.forEach((slice, i) => {
      s.textures.get("ground").add(`slice-${i}`, 0, ...slice.source);
      const [x, y, w, h] = slice.destination;
      s.add.image(x, y, "ground", `slice-${i}`).setOrigin(0).setDisplaySize(w, h).setTint(14015439).setDepth(-100);
    });
    art.buildingFrames.forEach((r, i) => s.textures.get("buildings").add(i, 0, r.x, r.y, r.width, r.height));
    for (const [key, columns] of [["characters", 4], ["props", 2]]) {
      const texture = s.textures.get(key), source = texture.getSourceImage();
      for (let row = 0; row < columns; row++) for (let col = 0; col < columns; col++) {
        const x = Math.round(col * source.width / columns), y = Math.round(row * source.height / columns);
        texture.add(row * columns + col, 0, x, y, Math.round((col + 1) * source.width / columns) - x, Math.round((row + 1) * source.height / columns) - y);
      }
    }
    m.walls.forEach((wall, i) => {
      s.add.image(wall.x + wall.width / 2, wall.y + wall.height / 2, "buildings", art.wallFrames[i] ?? 0).setDisplaySize(wall.width, wall.height).setDepth(wall.y + wall.height);
    });
    art.landmarks?.forEach((r) => s.add.image(r.x + r.width / 2, r.y + r.height / 2, "buildings", r.frame).setDisplaySize(r.width, r.height).setDepth(r.y + r.height));
  }
};

// src/app/templates/heist/game/presentation-state.ts
function teamPresentation(mission, s) {
  const active = s.actions.find((a2) => a2.start <= s.time && s.time < a2.end);
  const previous = s.actions.filter((a2) => a2.type === "MOVE" && a2.start <= s.time).at(-1);
  const move = active?.type === "MOVE" ? active : previous;
  const a = location(mission, move?.from ?? mission.entry), b = location(mission, move?.to ?? mission.entry);
  const occurred = (type) => s.events.some((e) => e.type === type && e.time <= s.time);
  const pickup = s.actions.find((a2) => a2.type === "PICKUP");
  const loaded = occurred("TARGET_SECURED") || pickup !== void 0 && s.time >= pickup.end;
  const response = occurred("CRISIS_RESOLVED") ? mission.presentation?.responseStyles[s.response ?? ""] : void 0;
  let pose = active?.type === "PICKUP" ? "pickup" : loaded ? "loaded" : "empty";
  if (occurred("CRISIS") && !occurred("CRISIS_RESOLVED")) pose = "broken";
  if (loaded && response === "carry") pose = "carry";
  if (loaded && response === "repair" && active?.type === "WAIT") pose = "repair";
  if (occurred("EXTRACTED")) pose = "extracted";
  return { point: position(mission, s.actions, s.time), facing: Math.atan2(b.y - a.y, b.x - a.x), moving: active?.type === "MOVE", pose };
}
function spriteFrame(facing, moving, time, guard = false) {
  const direction = (Math.round(facing / (Math.PI / 2)) % 4 + 4) % 4;
  return (guard ? 8 : 0) + direction + (moving && Math.floor(time * 5) % 2 ? 4 : 0);
}
var PresentationEvents = class {
  time;
  identities = /* @__PURE__ */ new Set();
  consume(time, events) {
    const keys = events.map((e, index) => `${index}:${e.time}:${e.type}:${e.actionId ?? ""}:${e.message}`);
    const seeking = this.time === void 0 || time < this.time || time - this.time > 1.1;
    const fresh = seeking ? [] : events.filter((e, i) => e.time <= time && e.time >= this.time && !this.identities.has(keys[i]));
    this.identities = new Set(keys.filter((_, i) => events[i].time <= time));
    this.time = time;
    return fresh;
  }
};

// src/app/templates/heist/game/character-presenter.ts
var CharacterPresenter = class {
  constructor(scene, mission, art) {
    this.scene = scene;
    this.mission = mission;
    this.root = scene.add.container(0, 0);
    this.root.add(scene.add.ellipse(0, 2, 28, 12, 1056032, 0.4));
    if (art) {
      this.cart = scene.add.image(-27, -4, "props", 0).setDisplaySize(43, 43);
      this.companion = scene.add.image(-21, 0, "characters", 0).setDisplaySize(41, 41).setOrigin(0.5, 0.92);
      this.body = scene.add.image(0, 0, "characters", 0).setDisplaySize(43, 43).setOrigin(0.5, 0.92);
      this.crate = scene.add.image(-10, -12, "props", 3).setDisplaySize(23, 23);
      this.root.add([this.cart, this.companion, this.body, this.crate]);
      const target = location(mission, mission.target.location);
      this.target = scene.add.image(target.x + 22, target.y - 5, "props", 3).setDisplaySize(32, 32).setDepth(target.y);
    } else this.root.add(scene.add.circle(0, -7, 11, 15979141).setStrokeStyle(3, 2439215));
    this.caption = scene.add.text(0, 13, "", { fontFamily: "Arial", fontSize: "10px", color: "#fff1ca", backgroundColor: "#172e2de6", padding: { x: 5, y: 3 } }).setOrigin(0.5, 0);
    this.root.add(this.caption);
    this.guards = mission.guards.map(() => {
      const root = scene.add.container(0, 0);
      root.add(scene.add.ellipse(0, 2, 22, 9, 1056032, 0.3));
      root.add(art ? scene.add.image(0, 0, "characters", 8).setDisplaySize(39, 39).setOrigin(0.5, 0.92) : scene.add.circle(0, -7, 8, 14720390));
      return root;
    });
  }
  scene;
  mission;
  root;
  body;
  companion;
  cart;
  crate;
  target;
  guards;
  caption;
  update(s) {
    const team = teamPresentation(this.mission, s);
    this.root.setPosition(team.point.x, team.point.y).setDepth(team.point.y + 1);
    const walking = team.moving && !s.reducedMotion;
    this.body?.setFrame(spriteFrame(team.facing, walking, s.time));
    this.companion?.setFrame(spriteFrame(team.facing, walking, s.time + 0.2)).setVisible(team.pose === "carry");
    this.crate?.setVisible(team.pose === "carry");
    this.cart?.setVisible(team.pose !== "carry" && team.pose !== "extracted").setFrame(team.pose === "empty" || team.pose === "pickup" ? 0 : team.pose === "broken" || team.pose === "repair" ? 2 : 1).setFlipX(Math.cos(team.facing) < 0).setPosition(Math.cos(team.facing) < 0 ? 28 : -28, -3);
    this.target?.setVisible(team.pose === "empty" || team.pose === "pickup");
    const poseLabels = this.mission.guidance ? { empty: "YOUR TEAM", pickup: "PICKING UP BOOKS", loaded: "BOOKS ON BOARD", broken: "WHEEL BROKEN", carry: "CARRYING TOGETHER", repair: "FIXING THE WHEEL", extracted: "BOOKS SAFE" } : { empty: "RECOVERY TEAM", pickup: "SECURING ARCHIVE", loaded: `${this.mission.target.mass} kg \xB7 LOADED`, broken: "AXLE DAMAGED", carry: "TEAM CARRY", repair: "REPAIRING CART", extracted: "ARCHIVE SAFE" };
    this.caption.setText(poseLabels[team.pose]);
    this.mission.guards.forEach((guard, i) => {
      const p = patrolPosition(guard, s.time), root = this.guards[i];
      root.setPosition(p.x, p.y).setDepth(p.y);
      const body = root.list[1];
      if (body instanceof __webpack_exports__GameObjects.Image) body.setFrame(spriteFrame(p.facing, !p.waiting && !s.reducedMotion, s.time, true));
    });
  }
};

// src/app/templates/heist/game/camera-director.ts
var CameraDirector = class {
  constructor(scene, mission) {
    this.scene = scene;
    this.mission = mission;
    this.overview();
  }
  scene;
  mission;
  manual = false;
  wasExecuting = false;
  base = 1;
  resize() {
    const manual = this.manual;
    this.base = Math.min(this.scene.scale.width / this.mission.map.width, this.scene.scale.height / this.mission.map.height);
    this.overview();
    this.manual = manual;
  }
  overview() {
    this.manual = true;
    const c = this.scene.cameras.main;
    c.stopFollow();
    c.panEffect.reset();
    c.zoomEffect.reset();
    c.setZoom(this.base);
    c.centerOn(this.mission.map.width / 2, this.mission.map.height / 2);
  }
  focus(point, reduced) {
    this.manual = true;
    const c = this.scene.cameras.main;
    c.stopFollow();
    c.panEffect.reset();
    c.zoomEffect.reset();
    if (reduced) return;
    c.pan(point.x, point.y, 450, "Sine.easeInOut");
    c.zoomTo(this.base * 1.45, 450);
  }
  zoom(amount) {
    this.manual = true;
    const c = this.scene.cameras.main;
    c.stopFollow();
    c.panEffect.reset();
    c.zoomEffect.reset();
    c.setZoom(__webpack_exports__Math.Clamp(c.zoom + amount * this.base, this.base, this.base * 2.6));
  }
  pan(x, y) {
    this.manual = true;
    const c = this.scene.cameras.main;
    c.stopFollow();
    c.panEffect.reset();
    c.zoomEffect.reset();
    c.scrollX += x;
    c.scrollY += y;
  }
  update(s, target) {
    if (s.executing && !this.wasExecuting) this.manual = false;
    this.wasExecuting = s.executing;
    const c = this.scene.cameras.main;
    if (s.cameraLocked || s.reducedMotion || this.manual || !s.executing) {
      c.stopFollow();
      if (s.cameraLocked || s.reducedMotion) {
        c.panEffect.reset();
        c.zoomEffect.reset();
      }
      return;
    }
    c.setZoom(this.base * 1.35);
    c.startFollow(target, false, 0.045, 0.045);
  }
};

// src/app/templates/heist/game/game-fx.ts
var GameFX = class {
  constructor(scene, mission) {
    this.mission = mission;
    this.ink = scene.add.graphics().setDepth(1800);
  }
  mission;
  events = new PresentationEvents();
  ink;
  pulse;
  lastTime = 0;
  update(s) {
    if (s.time < this.lastTime || s.time - this.lastTime > 1.1) this.pulse = void 0;
    this.lastTime = s.time;
    for (const event of this.events.consume(s.time, s.events)) {
      if (["TARGET_SECURED", "CRISIS", "CRISIS_RESOLVED", "NEAR_MISS", "DETECTED", "FAILED", "EXTRACTED", "MATH_CHECK"].includes(event.type)) {
        const p = position(this.mission, s.actions, s.time);
        this.pulse = __spreadProps(__spreadValues({ time: s.time }, p), { color: ["CRISIS", "DETECTED", "FAILED", "NEAR_MISS"].includes(event.type) ? 15637112 : 10479050 });
      }
    }
    const g = this.ink;
    g.clear();
    if (this.pulse && !s.reducedMotion) {
      const age = s.time - this.pulse.time;
      if (age >= 0 && age < 2) {
        g.lineStyle(3, this.pulse.color, 1 - age / 2);
        g.strokeCircle(this.pulse.x, this.pulse.y, 16 + age * 25);
      }
    }
    const selected = location(this.mission, s.selected);
    g.lineStyle(2, 16771234, 0.85);
    g.strokeCircle(selected.x, selected.y, 19);
    if (s.measureStart) {
      g.lineStyle(2, 10026976);
      g.strokeCircle(s.measureStart.x, s.measureStart.y, 8);
    }
  }
};

// src/app/templates/heist/game/heist-map.ts
function mountHeistMap(parent, mission, snapshot, select, ready, failed, compatibility = false) {
  let destroyed = false;
  class MissionScene extends __webpack_exports__Scene {
    ink;
    art = new SceneArt(this, mission);
    characters;
    director;
    fx;
    gateLabel;
    measureLabel;
    down;
    previousFrame = "";
    constructor() {
      super("heist-mission");
    }
    preload() {
      this.art.preload();
    }
    create() {
      if (destroyed) return;
      if (!this.textures.exists("mission-map")) {
        failed("The mission map could not load. Reload the project to retry.");
        return;
      }
      this.art.create();
      this.ink = this.add.graphics().setDepth(1200);
      for (const n of mission.locations) {
        this.add.text(n.x, n.y + 27, n.name.toUpperCase(), { fontFamily: "Arial", fontSize: "11px", color: "#fff2ce", backgroundColor: "#152c2bdd", padding: { x: 6, y: 4 } }).setOrigin(0.5, 0).setDepth(1600);
      }
      this.characters = new CharacterPresenter(this, mission, this.art.available);
      this.fx = new GameFX(this, mission);
      this.director = new CameraDirector(this, mission);
      this.director.resize();
      const gate = location(mission, mission.gate.location);
      this.gateLabel = this.add.text(gate.x, gate.y - 34, "", { fontSize: "10px", color: "#e8f3d0", backgroundColor: "#172c2bee", padding: { x: 5, y: 4 } }).setOrigin(0.5).setDepth(1600);
      this.measureLabel = this.add.text(0, 0, "", { fontSize: "12px", color: "#b8ffe8", backgroundColor: "#142d2cf0", padding: { x: 7, y: 5 } }).setOrigin(0.5).setDepth(1800);
      this.scale.on("resize", () => this.director?.resize());
      this.input.mouse?.disableContextMenu();
      this.input.on("pointerdown", (p) => {
        this.down = { x: p.x, y: p.y };
      });
      this.input.on("pointermove", (p) => {
        if (p.isDown && this.down && snapshot().tool === "Pan") {
          this.director?.pan(-(p.x - p.prevPosition.x) / this.cameras.main.zoom, -(p.y - p.prevPosition.y) / this.cameras.main.zoom);
        }
      });
      this.input.on("pointerup", (p) => {
        if (this.down && Math.hypot(p.x - this.down.x, p.y - this.down.y) < 8 && snapshot().tool !== "Pan") {
          const world = this.cameras.main.getWorldPoint(p.x, p.y);
          select({ x: world.x, y: world.y });
        }
        this.down = void 0;
      });
      this.input.on("wheel", (_p, _objects, _dx, dy) => this.zoom(dy > 0 ? -0.1 : 0.1));
      ready(mission.presentation && !this.art.available ? "Some artwork could not load. The accessible field map is available; reload to retry the artwork." : void 0);
    }
    zoom(amount) {
      this.director?.zoom(amount);
    }
    update() {
      if (!this.ink || destroyed) return;
      const s = snapshot(), g = this.ink;
      this.director?.update(s, this.characters.root);
      const frame = `${s.time}:${s.revision}:${s.security}:${s.tool}:${s.selected}:${s.reducedMotion}:${s.events.length}:${s.measureStart?.x}:${s.measureStart?.y}`;
      if (frame === this.previousFrame) return;
      this.previousFrame = frame;
      this.characters.update(s);
      this.fx.update(s);
      g.clear();
      for (const route of mission.routes) {
        const a = location(mission, route.from), b = location(mission, route.to);
        g.lineStyle(2, route.blocked ? 11824473 : 16770984, route.blocked ? 0.2 : 0.4);
        g.lineBetween(a.x, a.y, b.x, b.y);
      }
      const checks = routeChallenges(mission, s.plan);
      s.actions.filter((a) => a.type === "MOVE").forEach((a) => {
        const from = location(mission, a.from), to = location(mission, a.to);
        const valid = checks.filter((c) => c.id.endsWith(`-${a.segment}`)).every((c) => verified(c, s.plan));
        const active = s.executing && s.time >= a.start && s.time < a.end;
        g.lineStyle(active ? 7 : 4, valid ? 15846265 : 12041648, 0.95);
        if (valid) g.lineBetween(from.x, from.y, to.x, to.y);
        else for (let t = 0; t < 1; t += 0.08) g.lineBetween(from.x + (to.x - from.x) * t, from.y + (to.y - from.y) * t, from.x + (to.x - from.x) * Math.min(1, t + 0.045), from.y + (to.y - from.y) * Math.min(1, t + 0.045));
        const angle = Math.atan2(to.y - from.y, to.x - from.x), x = (from.x + to.x) / 2, y = (from.y + to.y) / 2;
        g.lineBetween(x, y, x - 10 * Math.cos(angle - 0.5), y - 10 * Math.sin(angle - 0.5));
        g.lineBetween(x, y, x - 10 * Math.cos(angle + 0.5), y - 10 * Math.sin(angle + 0.5));
      });
      mission.locations.forEach((n) => {
        g.lineStyle(2, s.plan.nodes.includes(n.id) ? 16771232 : 14212560, 0.8);
        g.strokeCircle(n.x, n.y, 11);
      });
      for (const guard of mission.guards) {
        const p = patrolPosition(guard, s.time);
        if (s.security) {
          g.lineStyle(1, 15311242, 0.6);
          guard.points.forEach((a, i) => {
            const b = guard.points[(i + 1) % guard.points.length];
            g.lineBetween(a.x, a.y, b.x, b.y);
          });
          const spread = guard.angle * Math.PI / 360;
          g.fillStyle(15635571, 0.24);
          g.beginPath();
          g.moveTo(p.x, p.y);
          for (let ray = 0; ray <= 16; ray++) {
            const angle = p.facing - spread + 2 * spread * ray / 16;
            let low = 0, high = guard.range;
            for (let step = 0; step < 7; step++) {
              const r = (low + high) / 2;
              if (blockedSight(p, { x: p.x + Math.cos(angle) * r, y: p.y + Math.sin(angle) * r }, mission.walls)) high = r;
              else low = r;
            }
            g.lineTo(p.x + Math.cos(angle) * low, p.y + Math.sin(angle) * low);
          }
          g.closePath();
          g.fillPath();
        }
      }
      if (s.measurement) {
        const { from, to } = s.measurement;
        g.lineStyle(3, 10937302);
        g.lineBetween(from.x, from.y, to.x, to.y);
        g.strokeCircle(from.x, from.y, 6);
        g.strokeCircle(to.x, to.y, 6);
        this.measureLabel.setPosition((from.x + to.x) / 2, (from.y + to.y) / 2 - 18).setText(`${s.measurement.cm.toFixed(2)} cm \xB7 1 cm = ${mission.map.metersPerCm} m`);
      }
      this.measureLabel.setVisible(!!s.measurement);
      const gate = location(mission, mission.gate.location);
      const open = s.time % mission.gate.cycle < mission.gate.openSeconds;
      if (!open) {
        g.lineStyle(6, 15376521);
        g.lineBetween(gate.x - 16, gate.y - 12, gate.x + 16, gate.y + 12);
        g.lineBetween(gate.x - 16, gate.y + 12, gate.x + 16, gate.y - 12);
      }
      const phase = s.time % mission.gate.cycle;
      this.gateLabel.setText(mission.gate.openSeconds === mission.gate.cycle ? "GATE OPEN" : `${open ? "GATE OPEN" : "GATE CLOSED"} \xB7 ${Math.ceil((open ? mission.gate.openSeconds : mission.gate.cycle) - phase)} s`);
    }
  }
  const scene = new MissionScene();
  const game = new __webpack_exports__Game({ type: compatibility ? __webpack_exports__CANVAS : __webpack_exports__AUTO, parent, width: parent.clientWidth, height: parent.clientHeight, backgroundColor: "#102421", scene, banner: false, audio: { noAudio: true }, fps: { target: 30 }, scale: { mode: __webpack_exports__Scale.RESIZE, autoCenter: __webpack_exports__Scale.CENTER_BOTH }, render: { antialias: true } });
  const observer = new ResizeObserver(() => {
    const width = parent.clientWidth, height = parent.clientHeight;
    if (!destroyed && game.isBooted && width > 0 && height > 0 && (game.scale.width !== width || game.scale.height !== height)) game.scale.setParentSize(width, height);
  });
  observer.observe(parent);
  return {
    destroy: () => {
      destroyed = true;
      observer.disconnect();
      game.destroy(true);
    },
    zoom: (amount) => scene.zoom(amount),
    pan: (x, y) => scene.director?.pan(x, y),
    home: () => scene.director?.overview(),
    focus: (point) => scene.director?.focus(point, snapshot().reducedMotion)
  };
}
export {
  mountHeistMap
};
//# debugId=507cb559-6344-5ec8-baa3-83f88c95bb94
//# sourceMappingURL=chunk-2EZ7FWIF.js.map
