import {
  __webpack_exports__AUTO,
  __webpack_exports__BlendModes,
  __webpack_exports__Game,
  __webpack_exports__Math,
  __webpack_exports__Scale,
  __webpack_exports__Scene
} from "./chunk-DKBEUOCQ.js";
import {
  __spreadValues
} from "./chunk-GOMI4DH3.js";

// src/app/templates/heist/escape/game/expedition-actors.ts
var ExpeditionActors = class {
  constructor(scene, mission) {
    this.scene = scene;
    this.mission = mission;
    for (const group of mission.animals) {
      const step = mission.steps.find((s) => s.release.includes(group.id));
      const point = {
        x: step.x / 100 * mission.world.width,
        y: step.y / 100 * mission.world.height - 38
      };
      const base = scene.add.image(point.x, point.y, "escape-mechanisms", 2).setDisplaySize(180, 158).setOrigin(0.5, 0.68).setDepth(point.y - 20);
      const front = scene.add.image(point.x, point.y + 6, "escape-mechanisms", "cage-front").setDisplaySize(180, 158 * 0.42).setOrigin(0.5, 0).setDepth(point.y + 38);
      this.cages.set(group.id, { base, front });
      for (let n = 0; n < group.count; n++) {
        const x = point.x - 38 + n % 3 * 36, y = point.y - 20 + Math.floor(n / 3) * 18;
        const row = mission.world.animalRows[group.id];
        const shadow = scene.add.ellipse(x, y, 23, 9, 203553, 0.38).setDepth(point.y);
        const body = scene.add.image(x, y, "escape-animals", row * 4 + 2).setDisplaySize(row === 2 ? 43 : 42, 51).setOrigin(0.5, 0.82).setDepth(point.y + 12 + n);
        this.animals.push({
          id: group.id,
          row,
          order: this.animals.length,
          pen: { x, y },
          position: { x, y },
          body,
          shadow,
          freed: false
        });
      }
    }
  }
  scene;
  mission;
  players = /* @__PURE__ */ new Map();
  animals = [];
  cages = /* @__PURE__ */ new Map();
  trail = [];
  lastLocal;
  completeAt = 0;
  firstFrame = true;
  get localTarget() {
    return this.players.values().next().value?.root;
  }
  update(s, seconds, dt) {
    if (s.phase === "opening") {
      this.trail.length = 0;
      this.lastLocal = void 0;
      this.completeAt = 0;
    }
    for (const [id, art] of this.players)
      if (!s.players.some((p) => p.id === id)) {
        art.root.destroy(true);
        this.players.delete(id);
      }
    for (const player of s.players) {
      let art = this.players.get(player.id);
      if (!art) {
        const root = this.scene.add.container(player.position.x, player.position.y);
        const shadow = this.scene.add.ellipse(0, 1, 31, 12, 267804, 0.5);
        const ring = this.scene.add.ellipse(0, 3, 37, 15).setStrokeStyle(2, player.color, 0.75);
        const body = this.scene.add.image(0, 0, "escape-characters", 1).setDisplaySize(86, 86).setOrigin(0.5, 0.9);
        const label = this.scene.add.text(0, -78, player.name, {
          fontFamily: "Arial",
          fontSize: "12px",
          color: "#e8ffef",
          backgroundColor: "#092c31c0",
          padding: { x: 6, y: 3 }
        }).setOrigin(0.5);
        root.add([shadow, ring, body, label]);
        art = { root, body, label };
        this.players.set(player.id, art);
      }
      const direction = (Math.round(player.facing / (Math.PI / 2)) % 4 + 4) % 4;
      const stride = player.moving && !s.reducedMotion ? Math.floor(seconds * 7) % 2 : 0;
      art.body.setFrame(direction + stride * 4).setY(player.moving && !s.reducedMotion ? Math.sin(seconds * 14) * 1.8 : 0);
      art.root.setPosition(player.position.x, player.position.y).setDepth(player.position.y + 50);
      art.label.setVisible(s.phase === "explore");
      if (player.id === s.localPlayerId) {
        if (!this.lastLocal || __webpack_exports__Math.Distance.BetweenPoints(this.lastLocal, player.position) >= 5) {
          this.trail.unshift(__spreadValues({}, player.position));
          this.trail.length = Math.min(350, this.trail.length);
          this.lastLocal = __spreadValues({}, player.position);
        }
      }
    }
    if (!s.released.size) {
      this.completeAt = 0;
      for (const animal of this.animals) animal.freed = false;
    }
    if (s.phase === "complete" && !this.completeAt) this.completeAt = seconds;
    for (const animal of this.animals) {
      const freed = s.released.has(animal.id), cage = this.cages.get(animal.id);
      cage.base.setFrame(freed ? 3 : 2);
      cage.front.setVisible(!freed);
      let target = animal.pen;
      if (freed) {
        const order = this.animals.filter((a) => s.released.has(a.id)).indexOf(animal);
        target = this.trail[Math.min(this.trail.length - 1, (order + 1) * 7)] ?? s.players[0].position;
        target = {
          x: target.x + Math.sin(order * 2.4) * 14,
          y: target.y + Math.cos(order * 2.4) * 10
        };
      }
      if (s.phase === "complete") {
        const exit = this.mission.steps.at(-1);
        target = {
          x: exit.x / 100 * this.mission.world.width,
          y: exit.y / 100 * this.mission.world.height + 30
        };
      }
      if (this.firstFrame && freed) animal.position = __spreadValues({}, target);
      const dx = target.x - animal.position.x, dy = target.y - animal.position.y, moving = freed && Math.hypot(dx, dy) > 5;
      const ease = Math.min(1, dt * (animal.freed ? 7 : 3));
      const x = freed ? animal.position.x + dx * ease : animal.pen.x;
      const y = freed ? animal.position.y + dy * ease : animal.pen.y;
      animal.position = { x, y };
      const hop = s.reducedMotion ? 0 : moving ? Math.abs(Math.sin(seconds * (animal.row === 2 ? 9 : 12) + animal.order)) * (animal.row === 2 ? 12 : 7) : Math.sin(seconds * 2 + animal.order) * 0.7;
      const side = Math.abs(dx) > Math.abs(dy), frame = animal.row * 4 + (side && moving ? 0 : 2) + (moving && !s.reducedMotion ? Math.floor(seconds * 6 + animal.order) % 2 : 0);
      animal.body.setPosition(x, y - hop).setFrame(frame).setFlipX(side && dx < 0).setDepth(freed ? y + 32 : animal.pen.y + 20);
      animal.body.setScale(Math.min(43 / animal.body.frame.width, 51 / animal.body.frame.height));
      animal.shadow.setPosition(x, y + 2).setDepth(freed ? y + 1 : animal.pen.y).setScale(moving ? 0.8 : 1);
      const alpha = s.phase === "complete" ? __webpack_exports__Math.Clamp(1 - (seconds - this.completeAt - animal.order * 0.18) / 1.8, 0, 1) : 1;
      animal.body.setAlpha(alpha);
      animal.shadow.setAlpha(alpha * 0.4);
      animal.freed = freed;
    }
    this.firstFrame = false;
  }
};

// src/app/templates/heist/escape/game/expedition-mechanisms.ts
var ExpeditionMechanisms = class {
  constructor(scene, mission, input) {
    this.scene = scene;
    this.mission = mission;
    this.input = input;
    this.root = scene.add.container(0, 0).setScrollFactor(0).setDepth(5e3);
    this.live = scene.add.graphics().setScrollFactor(0).setDepth(5001);
  }
  scene;
  mission;
  input;
  root;
  live;
  labels = [];
  counters = [];
  index = -1;
  signature = "";
  update(s) {
    const visible = s.phase === "puzzle" && !["balance-lock", "gear-lock", "machine-lock"].includes(this.mission.steps[s.currentIndex].puzzle.type) && this.scene.scale.width >= 900;
    this.root.setVisible(visible);
    this.live.setVisible(visible);
    if (!visible) return;
    const x = (this.scene.scale.width - 450) / 2, y = this.scene.scale.height / 2 + 15;
    const zoom = this.scene.cameras.main.zoom, w = this.scene.scale.width, h = this.scene.scale.height;
    const px = (x - w / 2) / zoom + w / 2, py = (y - h / 2) / zoom + h / 2;
    this.root.setPosition(px, py).setScale(1 / zoom);
    this.live.setPosition(px, py).setScale(1 / zoom);
    if (this.index !== s.currentIndex) {
      this.index = s.currentIndex;
      this.build();
      this.signature = "";
    }
    const signature = JSON.stringify(s.draft);
    if (signature === this.signature) return;
    this.signature = signature;
    const p = this.mission.steps[this.index].puzzle, g = this.live;
    g.clear();
    if (p.type === "code") {
      this.labels.forEach((label, i) => label.setText(String(s.draft.digits[i])));
      this.counters.forEach((a) => a.ring.setVisible(s.draft.counted.includes(a.id)));
    }
    if (p.type === "timing") {
      const start = p.safeStart / p.cycle * Math.PI * 2 - Math.PI / 2, end = p.safeEnd / p.cycle * Math.PI * 2 - Math.PI / 2;
      g.fillStyle(3302996, 0.3);
      g.beginPath();
      g.moveTo(-8, -18);
      g.arc(-8, -18, 109, start, end);
      g.closePath();
      g.fillPath();
      const angle = s.draft.departure / p.cycle * Math.PI * 2 - Math.PI / 2;
      g.lineStyle(5, 3550491);
      g.lineBetween(-8, -18, -8 + Math.cos(angle) * 95, -18 + Math.sin(angle) * 95);
      g.fillStyle(15252061);
      g.fillCircle(-8, -18, 8);
      this.labels[0].setText(`${s.draft.departure} \u2192 ${s.draft.departure + p.crossing} seconds`);
    }
    if (p.type === "balance") {
      const sum = s.draft.weights.reduce((total, i) => total + p.weights[i], 0);
      const tilt = __webpack_exports__Math.Clamp((sum - p.target) * 4, -26, 26);
      g.lineStyle(9, 10385488);
      g.lineBetween(-145, tilt - 15, 145, -tilt - 15);
      g.lineStyle(2, 12166777);
      g.lineBetween(-125, tilt - 15, -125, tilt + 75);
      g.lineBetween(125, -tilt - 15, 125, -tilt + 75);
      for (const [x2, yy] of [
        [-125, tilt],
        [125, -tilt]
      ]) {
        g.fillStyle(7754033);
        g.fillRoundedRect(x2 - 55, yy + 70, 110, 18, 6);
        g.lineStyle(2, 13344602);
        g.strokeRoundedRect(x2 - 55, yy + 70, 110, 18, 6);
      }
      s.draft.weights.forEach((index, order) => {
        g.fillStyle(9278071);
        g.fillRoundedRect(
          92 + order % 2 * 34,
          -tilt + 36 - Math.floor(order / 2) * 27,
          29,
          33,
          4
        );
      });
      this.labels[0].setText(`${sum} kg on the counterweight`);
      this.labels[1].setText(
        s.draft.weights.map((i) => p.weights[i]).join(" + ") || "Select weights"
      );
    }
    if (p.type === "number") {
      this.labels[0].setText(`${s.draft.quantity ?? "?"} ${p.unit}`);
      const visual = p.visual;
      if (visual?.kind === "length") {
        for (let i = 0; i < visual.count; i++) {
          const x2 = -165 + i * 55;
          g.fillStyle(10253126);
          g.fillRoundedRect(x2, -65, 49, 126, 5);
          g.lineStyle(2, 14202999);
          g.strokeRoundedRect(x2, -65, 49, 126, 5);
          g.lineStyle(1, 5849133);
          g.lineBetween(x2 + 9, -52, x2 + 13, 46);
          g.lineBetween(x2 + 32, -35, x2 + 29, 51);
        }
        this.labels[1].setText(`${visual.count} marked sections \xB7 ${visual.amount} cm each`);
      } else if (visual?.kind === "capacity") {
        const trips = Math.min(6, Math.max(1, s.draft.quantity ?? 1));
        for (let i = 0; i < trips; i++) {
          const x2 = -175 + i % 3 * 125, yy = -85 + Math.floor(i / 3) * 110;
          g.fillStyle(9923134);
          g.fillEllipse(x2 + 50, yy + 35, 111, 75);
          g.fillStyle(3945771);
          g.fillEllipse(x2 + 50, yy + 30, 88, 51);
          for (let n = 0; n < Math.min(visual.amount, Math.max(0, visual.count - i * visual.amount)); n++) {
            g.fillStyle(14992265);
            g.fillCircle(x2 + 23 + n % 3 * 25, yy + 18 + Math.floor(n / 3) * 20, 8);
          }
        }
        this.labels[1].setText(`${visual.count} passengers \xB7 ${visual.amount} spaces per trip`);
      } else {
        const count = visual?.count ?? 12, amount = visual?.amount ?? 1;
        for (let i = 0; i < count; i++) {
          const x2 = -150 + i % 6 * 59, yy = -85 + Math.floor(i / 6) * 100;
          const selected = visual?.kind === "fraction" ? i < (s.draft.quantity ?? 0) : i * amount < (s.draft.quantity ?? 0);
          g.fillStyle(selected ? 7651248 : 6120791);
          g.fillEllipse(x2, yy + 22, 42, 23);
          g.lineStyle(2, 13284227);
          g.strokeEllipse(x2, yy + 22, 42, 23);
          if (visual?.kind === "groups")
            for (let j = 0; j < Math.min(amount, Math.max(0, (s.draft.quantity ?? 0) - i * amount)); j++) {
              g.fillStyle(15772244);
              g.fillTriangle(x2 - 10 + j * 13, yy - 7, x2 + j * 13, yy - 7, x2 - 4 + j * 13, yy + 17);
            }
        }
        this.labels[1].setText(
          visual?.kind === "fraction" ? `${count} animals \xB7 share into ${amount} equal groups` : `${count} trays \xB7 ${amount} for each animal`
        );
      }
    }
  }
  text(x, y, value, size = 18) {
    const label = this.scene.add.text(x, y, value, {
      fontFamily: "Georgia",
      fontSize: `${size}px`,
      color: "#f7e7ba",
      align: "center",
      stroke: "#1d2928",
      strokeThickness: 3
    }).setOrigin(0.5);
    this.root.add(label);
    return label;
  }
  build() {
    this.root.removeAll(true);
    this.labels = [];
    this.counters = [];
    const p = this.mission.steps[this.index].puzzle;
    const shadow = this.scene.add.ellipse(0, 55, 490, 330, 202783, 0.85);
    this.root.add(shadow);
    if (p.type === "code") {
      const art = this.scene.add.image(0, 0, "escape-mechanisms", 0).setDisplaySize(440, 375);
      this.root.add(art);
      p.labels.forEach((label, i) => {
        const x = p.labels.length === 3 ? -65 + i * 75 : -40 + i * 83;
        const text = this.text(x, 47, "0", 42);
        const hit = this.scene.add.rectangle(x, 47, 51, 101, 16777215, 1e-3).setInteractive({ useHandCursor: true });
        hit.on("pointerdown", () => this.input({ type: "dial", index: i, change: 1 }));
        this.root.add(hit);
        this.labels.push(text);
        this.text(x, 107, label, 10);
      });
      this.text(0, 175, "Click a dial to turn it", 13);
      if (p.countAnimals) {
        this.mission.animals.forEach((animal, row) => {
          const x0 = -190 + row * 140;
          for (let n = 0; n < animal.count; n++) {
            const x = x0 + n % 3 * 42, y = -213 + Math.floor(n / 3) * 47;
            const ring = this.scene.add.ellipse(x, y + 5, 42, 38).setStrokeStyle(3, 12315025).setVisible(false);
            const sprite = this.scene.add.image(x, y, "escape-animals", this.mission.world.animalRows[animal.id] * 4 + 2).setDisplaySize(42, 48).setInteractive({ useHandCursor: true });
            sprite.setScale(Math.min(42 / sprite.frame.width, 48 / sprite.frame.height));
            const id = `${animal.id}-${n}`;
            sprite.on("pointerdown", () => this.input({ type: "count", id }));
            this.root.add([ring, sprite]);
            this.counters.push({ id, sprite, ring });
          }
        });
      }
    }
    if (p.type === "timing") {
      this.root.add(this.scene.add.image(0, -20, "escape-mechanisms", 1).setDisplaySize(380, 380));
      this.labels.push(this.text(0, 196, "0 \u2192 10 seconds", 25));
      this.text(0, -234, "WATCH THE WINDOW", 14);
    }
    if (p.type === "balance") {
      const stand = this.scene.add.graphics().fillStyle(7951410).fillTriangle(0, -15, -52, 170, 52, 170).lineStyle(4, 13872237).lineBetween(0, -10, 0, 165);
      this.root.add(stand);
      this.root.add(this.scene.add.image(-125, 20, "escape-mechanisms", 2).setDisplaySize(100, 88));
      this.labels.push(this.text(0, 209, "0 kg on the counterweight", 23));
      this.labels.push(this.text(0, -123, "Select weights", 21));
      p.weights.forEach((weight, index) => {
        const x = -145 + index * 95;
        const button = this.scene.add.text(x, -191, `${weight} kg`, {
          fontFamily: "Georgia",
          fontSize: "22px",
          color: "#f9e3b4",
          backgroundColor: "#344b48",
          padding: { x: 14, y: 12 }
        }).setOrigin(0.5).setInteractive({ useHandCursor: true });
        button.on("pointerdown", () => this.input({ type: "weight", index }));
        this.root.add(button);
      });
    }
    if (p.type === "number") {
      this.labels.push(this.text(0, 178, "?", 35));
      this.labels.push(this.text(0, -162, "", 18));
      this.text(0, 227, "Your calculation operates the mechanism", 13);
    }
    this.root.setScrollFactor(0, 0, true);
  }
};

// src/app/templates/heist/escape/game/expedition-scene.ts
function mountExpeditionScene(parent, mission, snapshot, callbacks) {
  const world = mission.world;
  let destroyed = false;
  class RescueScene extends __webpack_exports__Scene {
    actors;
    fx;
    guide;
    lightCones;
    lookout;
    shade;
    dawn;
    keys = {};
    markers = [];
    seconds = 0;
    ready = false;
    failed = false;
    overviewMode = false;
    previousCelebration = 0;
    celebrationTime = -100;
    lastPhase = "";
    boat;
    preload() {
      this.load.image("escape-world", mission.environment);
      this.load.image("escape-characters", world.characters);
      this.load.image("escape-animals", world.animalAtlas);
      this.load.image("escape-mechanisms", world.mechanismAtlas);
      if (world.boat) this.load.image("escape-boat", world.boat);
      this.load.on("loaderror", () => {
        this.failed = true;
        callbacks.failed("Some castle artwork could not load. Reload the game to try again.");
      });
    }
    create() {
      if (this.failed) return;
      for (const [key, columns, rows] of [
        ["escape-characters", 4, 4],
        ["escape-animals", 4, 3],
        ["escape-mechanisms", 2, 2]
      ]) {
        const texture = this.textures.get(key), image = texture.getSourceImage();
        if (key === "escape-animals" && world.animalFrames) {
          world.animalFrames.forEach(
            ([x, y, w, h], index) => texture.add(
              index,
              0,
              Math.round(x * image.width),
              Math.round(y * image.height),
              Math.round(w * image.width),
              Math.round(h * image.height)
            )
          );
          continue;
        }
        for (let row = 0; row < rows; row++)
          for (let col = 0; col < columns; col++) {
            const x = Math.round(col * image.width / columns), y = Math.round(row * image.height / rows);
            texture.add(
              row * columns + col,
              0,
              x,
              y,
              Math.round((col + 1) * image.width / columns) - x,
              Math.round((row + 1) * image.height / rows) - y
            );
          }
      }
      const props = this.textures.get("escape-mechanisms"), source = props.getSourceImage();
      props.add(
        "cage-front",
        0,
        0,
        Math.round(source.height * 0.79),
        Math.round(source.width / 2),
        Math.floor(source.height * 0.21)
      );
      this.add.image(0, 0, "escape-world").setOrigin(0).setDisplaySize(world.width, world.height).setDepth(-100);
      this.makeLightTexture();
      for (const [i, point] of world.lanterns.entries()) {
        const light = this.add.image(point.x, point.y, "escape-lamp").setDisplaySize(120, 120).setBlendMode(__webpack_exports__BlendModes.ADD).setAlpha(0.42).setDepth(1500);
        if (!snapshot().reducedMotion)
          this.tweens.add({
            targets: light,
            alpha: { from: 0.3, to: 0.5 },
            duration: 650 + i * 37,
            yoyo: true,
            repeat: -1
          });
      }
      this.guide = this.add.graphics().setDepth(4);
      this.lightCones = this.add.graphics().setDepth(7);
      this.actors = new ExpeditionActors(this, mission);
      this.lookout = this.add.image(world.patrol[0].x, world.patrol[0].y, "escape-characters", 9).setOrigin(0.5, 0.9).setDisplaySize(75, 75);
      this.fx = this.add.graphics().setDepth(1700);
      this.markers = mission.steps.map((step, i) => {
        const x = step.x / 100 * world.width, y = step.y / 100 * world.height;
        const root = this.add.container(x, y - 88).setDepth(2e3);
        const ring = this.add.circle(0, 0, 18, 1588803, 0.94).setStrokeStyle(2, 12498561);
        const number = this.add.text(0, 0, String(i + 1), { fontFamily: "Georgia", fontSize: "18px", color: "#fff0c4" }).setOrigin(0.5);
        const label = this.add.text(0, -35, step.place.toUpperCase(), {
          fontFamily: "Arial",
          fontSize: "12px",
          color: "#ffebba",
          backgroundColor: "#102d35d9",
          padding: { x: 8, y: 6 }
        }).setOrigin(0.5);
        const hit = this.add.rectangle(0, 0, 105, 82, 16777215, 1e-3).setInteractive({ useHandCursor: true });
        hit.on("pointerdown", () => callbacks.input({ type: "interact", stepId: step.id }));
        root.add([ring, number, label, hit]);
        return { root, ring, label, number };
      });
      this.boat = this.makeBoat();
      this.shade = this.add.rectangle(0, 0, 1, 1, 399392, 0.25).setOrigin(0).setScrollFactor(0).setDepth(4e3).setVisible(false);
      this.dawn = this.add.rectangle(0, 0, 1, 1, 16299883, 0.1).setOrigin(0).setScrollFactor(0).setDepth(1800).setBlendMode(__webpack_exports__BlendModes.ADD).setVisible(false);
      this.keys = this.input.keyboard?.addKeys("W,A,S,D,UP,DOWN,LEFT,RIGHT", false) ?? {};
      this.input.keyboard?.on("keydown-E", () => {
        if (!this.typing()) callbacks.interact();
      });
      this.input.on(
        "pointerdown",
        (pointer, objects) => {
          if (objects.length || snapshot().phase !== "explore") return;
          const point = this.cameras.main.getWorldPoint(pointer.x, pointer.y);
          callbacks.input({ type: "walk", destination: { x: point.x, y: point.y } });
        }
      );
      this.cameras.main.setBounds(0, 0, world.width, world.height);
      this.scale.on("resize", () => this.resize());
      this.resize();
      this.ready = true;
      this.scene.launch("rescue-closeups");
      callbacks.ready();
    }
    update(_time, milliseconds) {
      if (!this.ready || destroyed) return;
      const dt = Math.min(milliseconds / 1e3, 0.05);
      const movingKeys = !this.typing();
      const down = (name) => movingKeys && this.keys[name]?.isDown ? 1 : 0;
      callbacks.frame(dt, {
        x: down("D") + down("RIGHT") - down("A") - down("LEFT"),
        y: down("S") + down("DOWN") - down("W") - down("UP")
      });
      const s = snapshot();
      if (!s.paused && !document.hidden) this.seconds += dt;
      this.actors?.update(s, this.seconds, s.paused || document.hidden ? 0 : dt);
      if (s.paused || s.reducedMotion || document.hidden) this.tweens.pauseAll();
      else this.tweens.resumeAll();
      this.updateLookout(s);
      this.updateMarkers(s);
      this.drawAtmosphere(s);
      this.shade.setVisible(s.phase === "puzzle" && this.scale.width >= 900);
      this.dawn.setVisible(s.phase === "complete");
      if (s.celebration !== this.previousCelebration) {
        this.previousCelebration = s.celebration;
        this.celebrationTime = this.seconds;
      }
      if (this.lastPhase !== s.phase) {
        if (s.phase === "explore") this.overviewMode = false;
        this.lastPhase = s.phase;
      }
      this.updateCamera(s);
      const end = mission.steps.at(-1);
      this.boat.setVisible(s.phase === "complete");
      if (s.phase === "complete") {
        this.boat.x = end.x / 100 * world.width - 14 - (s.reducedMotion ? 0 : Math.min(150, (this.seconds - this.celebrationTime) * 12));
        this.boat.y = end.y / 100 * world.height + 35;
      }
    }
    typing() {
      return document.hidden || ["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement?.tagName ?? "");
    }
    updateCamera(s) {
      const c = this.cameras.main, w = this.scale.width, h = this.scale.height;
      let zoom = Math.max(w / 1320, h / 810), target = s.players.find((p) => p.id === s.localPlayerId).position;
      if (s.phase === "opening") {
        zoom = Math.max(w / world.width, h / world.height);
        target = { x: world.width / 2, y: world.height * 0.53 };
      } else if (this.overviewMode || s.phase === "journal") {
        zoom = Math.min(w / world.width, h / world.height);
        target = { x: world.width / 2, y: world.height / 2 };
      } else if (s.phase === "puzzle" || s.phase === "celebrate" || s.phase === "complete") {
        zoom = Math.max(w / 1320, h / 810);
        target = {
          x: target.x + (w >= 900 ? 200 / zoom : 0),
          y: target.y + (w < 900 ? 160 / zoom : 0)
        };
      }
      const ease = s.reducedMotion ? 1 : 0.065;
      c.setZoom(__webpack_exports__Math.Linear(c.zoom, zoom, ease));
      const cx = c.midPoint.x, cy = c.midPoint.y;
      c.centerOn(__webpack_exports__Math.Linear(cx, target.x, ease), __webpack_exports__Math.Linear(cy, target.y, ease));
    }
    updateMarkers(s) {
      this.guide.clear();
      if (s.phase === "explore") {
        this.guide.lineStyle(3, 15125120, 0.45);
        const points = [s.players[0].position, ...s.route];
        for (let i = 1; i < points.length; i++)
          this.guide.lineBetween(points[i - 1].x, points[i - 1].y, points[i].x, points[i].y);
      }
      this.markers.forEach((marker, i) => {
        const done = s.solved.has(mission.steps[i].id), current = i === s.currentIndex && s.phase !== "opening";
        marker.root.setVisible(s.phase !== "puzzle" && s.phase !== "complete");
        marker.label.setVisible(current || this.overviewMode);
        marker.ring.setFillStyle(done ? 4614991 : current ? 12026680 : 1588803, 0.94).setStrokeStyle(current ? 3 : 1, current ? 16769698 : 9017735);
        marker.number.setText(done ? "\u2713" : String(i + 1));
        marker.root.setAlpha(i > s.currentIndex ? 0.6 : 1);
        marker.root.y = mission.steps[i].y / 100 * world.height - 88 + (current && !s.reducedMotion ? Math.sin(this.seconds * 2.5) * 4 : 0);
        if (current && s.phase === "explore") {
          const point = {
            x: mission.steps[i].x / 100 * world.width,
            y: mission.steps[i].y / 100 * world.height
          };
          const radius = 26 + (s.reducedMotion ? 0 : this.seconds * 14 % 20);
          this.guide.lineStyle(2, 16765306, 0.8);
          this.guide.strokeEllipse(point.x, point.y + 5, radius * 2, radius * 0.7);
        }
      });
    }
    updateLookout(s) {
      const route = world.patrol, t = this.seconds / 5, index = Math.floor(t) % route.length, a = route[index], b = route[(index + 1) % route.length], f = t % 1;
      const x = __webpack_exports__Math.Linear(a.x, b.x, f), y = __webpack_exports__Math.Linear(a.y, b.y, f), angle = Math.atan2(b.y - a.y, b.x - a.x);
      const direction = (Math.round(angle / (Math.PI / 2)) % 4 + 4) % 4;
      this.lookout.setPosition(x, y).setFrame(8 + direction + (s.reducedMotion ? 0 : Math.floor(this.seconds * 5) % 2) * 4).setDepth(y + 40);
      const g = this.lightCones;
      g.clear();
      g.fillStyle(16767904, 0.13);
      g.beginPath();
      g.moveTo(x, y - 5);
      for (let i = 0; i <= 16; i++) {
        const ray = angle - 0.4 + i / 16 * 0.8;
        g.lineTo(x + Math.cos(ray) * 150, y + Math.sin(ray) * 150);
      }
      g.closePath();
      g.fillPath();
    }
    drawAtmosphere(s) {
      const g = this.fx;
      g.clear();
      const t = s.reducedMotion ? 0 : this.seconds;
      for (let i = 0; i < 34; i++) {
        const x = 200 + i * 139 % 1070 + Math.sin(t * 0.18 + i) * 30, y = 230 + i * 83 % 630 + Math.cos(t * 0.25 + i * 0.9) * 14;
        g.fillStyle(15984038, 0.15 + Math.max(0, Math.sin(t * 1.4 + i)) * 0.55);
        g.fillCircle(x, y, i % 3 === 0 ? 2 : 1);
      }
      world.water.forEach((point, i) => {
        const phase = (t * 0.3 + i * 0.21) % 1;
        g.lineStyle(1.5, 13170921, (1 - phase) * 0.27);
        g.strokeEllipse(point.x, point.y, 14 + phase * 60, 5 + phase * 22);
      });
      const age = this.seconds - this.celebrationTime;
      if (age < 2.5 && !s.reducedMotion) {
        const step = mission.steps[Math.min(s.currentIndex, mission.steps.length - 1)], x = step.x / 100 * world.width, y = step.y / 100 * world.height;
        for (let i = 0; i < 25; i++) {
          const angle = i / 25 * Math.PI * 2, radius = age * (25 + i % 5 * 14);
          g.fillStyle(i % 2 ? 16767889 : 9232579, Math.max(0, 1 - age / 2.5));
          g.fillCircle(
            x + Math.cos(angle) * radius,
            y - 40 + Math.sin(angle) * radius * 0.6 - age * 13,
            2 + i % 2
          );
        }
      }
    }
    makeLightTexture() {
      const texture = this.textures.createCanvas("escape-lamp", 128, 128);
      const ctx = texture.getContext(), gradient = ctx.createRadialGradient(64, 64, 1, 64, 64, 64);
      gradient.addColorStop(0, "rgba(255,204,111,.8)");
      gradient.addColorStop(0.3, "rgba(254,174,76,.2)");
      gradient.addColorStop(1, "rgba(255,165,64,0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 128, 128);
      texture.refresh();
    }
    makeBoat() {
      const root = this.add.container(0, 0).setDepth(1600), g = this.add.graphics();
      g.fillStyle(1326662, 0.45);
      g.fillEllipse(6, 16, 131, 47);
      g.fillStyle(10186820);
      g.fillEllipse(0, 0, 125, 61);
      g.fillStyle(4799788);
      g.fillEllipse(0, -3, 101, 41);
      g.lineStyle(4, 12621923);
      g.strokeEllipse(0, 0, 122, 58);
      g.lineBetween(-23, -23, -23, 20);
      g.lineBetween(22, -22, 22, 20);
      root.add(g);
      if (world.boat) {
        g.clear().fillStyle(1326662, 0.3).fillEllipse(3, 13, 137, 45);
        root.add(this.add.image(0, 0, "escape-boat").setDisplaySize(158, 105));
      }
      mission.animals.forEach(
        (animal, i) => root.add(
          this.add.image(-28 + i * 28, -7, "escape-animals", world.animalRows[animal.id] * 4 + 2).setDisplaySize(31, 35)
        )
      );
      return root.setVisible(false);
    }
    resize() {
      this.shade?.setSize(this.scale.width, this.scale.height);
      this.dawn?.setSize(this.scale.width, this.scale.height);
    }
    overview() {
      this.overviewMode = true;
    }
    follow() {
      this.overviewMode = false;
    }
  }
  class MechanismScene extends __webpack_exports__Scene {
    mechanisms;
    create() {
      this.mechanisms = new ExpeditionMechanisms(this, mission, callbacks.input);
    }
    update() {
      this.mechanisms?.update(snapshot());
    }
  }
  const scene = new RescueScene("rescue-expedition");
  const game = new __webpack_exports__Game({
    type: __webpack_exports__AUTO,
    parent,
    width: Math.max(1, parent.clientWidth),
    height: Math.max(1, parent.clientHeight),
    backgroundColor: "#091c24",
    scene: [scene, new MechanismScene("rescue-closeups")],
    banner: false,
    audio: { noAudio: true },
    fps: { target: 60 },
    scale: { mode: __webpack_exports__Scale.RESIZE, autoCenter: __webpack_exports__Scale.CENTER_BOTH },
    render: { antialias: true },
    callbacks: {
      postBoot: (game2) => {
        game2.canvas.setAttribute("tabindex", "0");
        game2.canvas.setAttribute(
          "aria-label",
          "Castle rescue game. Use WASD or arrow keys to walk. Press E to inspect the gold objective. Accessible puzzle controls are beside the game."
        );
      }
    }
  });
  const resize = new ResizeObserver(() => {
    if (!destroyed && game.isBooted && parent.clientWidth && parent.clientHeight)
      game.scale.setParentSize(parent.clientWidth, parent.clientHeight);
  });
  resize.observe(parent);
  return {
    destroy: () => {
      destroyed = true;
      resize.disconnect();
      game.destroy(true);
    },
    overview: () => scene.overview(),
    follow: () => scene.follow(),
    focus: () => game.canvas?.focus()
  };
}
export {
  mountExpeditionScene
};
//# debugId=08f5ee38-82c1-53cf-93fc-b971cc9ef8a1
//# sourceMappingURL=chunk-XBB476QK.js.map
