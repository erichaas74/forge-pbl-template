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

// src/app/templates/journey-replay/ui/game/journey-ship.art.ts
function makeSailTexture(scene, key, damaged, patched) {
  if (scene.textures.exists(key)) return;
  const texture = scene.textures.createCanvas(key, 520, 450);
  const c = texture.context;
  const cloth = new Path2D("M23 18 Q250 42 495 19 Q473 135 508 404 Q266 447 5 407 Q50 199 23 18Z");
  c.save();
  c.clip(cloth);
  const gradient = c.createLinearGradient(0, 0, 520, 100);
  gradient.addColorStop(0, "#a28a60");
  gradient.addColorStop(0.18, "#f0dda8");
  gradient.addColorStop(0.5, "#d7b87c");
  gradient.addColorStop(0.72, "#f5e5b5");
  gradient.addColorStop(1, "#8c744f");
  c.fillStyle = gradient;
  c.fillRect(0, 0, 520, 450);
  const shade = c.createLinearGradient(0, 0, 0, 450);
  shade.addColorStop(0, "#fff5c122");
  shade.addColorStop(0.55, "#60442100");
  shade.addColorStop(1, "#59411c55");
  c.fillStyle = shade;
  c.fillRect(0, 0, 520, 450);
  for (let x = 44; x < 520; x += 48) {
    c.strokeStyle = "#69502d50";
    c.lineWidth = 2;
    c.beginPath();
    c.moveTo(x, 15);
    c.bezierCurveTo(x + 20, 140, x - 25, 280, x + 10, 450);
    c.stroke();
  }
  for (let y = 0; y < 450; y += 3) {
    c.strokeStyle = y % 9 === 0 ? "#fff6ce19" : "#62492813";
    c.lineWidth = 0.6;
    c.beginPath();
    c.moveTo(0, y);
    c.lineTo(520, y + 2);
    c.stroke();
  }
  c.restore();
  c.strokeStyle = "#745534";
  c.lineWidth = 5;
  c.stroke(cloth);
  if (damaged) {
    c.save();
    c.globalCompositeOperation = "destination-out";
    c.fill(new Path2D("M307 107L266 172 310 183 254 299 338 213 303 184 348 133Z"));
    c.restore();
    c.strokeStyle = "#553e2d";
    c.lineWidth = 2;
    c.stroke(new Path2D("M307 107L266 172 310 183 254 299 338 213 303 184 348 133"));
  }
  if (patched) {
    c.fillStyle = "#e4c994";
    c.strokeStyle = "#6b5437";
    c.lineWidth = 2;
    c.save();
    c.translate(300, 200);
    c.rotate(-0.09);
    c.fillRect(-72, -92, 145, 188);
    c.setLineDash([4, 6]);
    c.strokeRect(-66, -86, 133, 176);
    c.restore();
  }
  texture.refresh();
}
function makeBarrelTexture(scene) {
  if (scene.textures.exists("journey-barrel")) return;
  const t = scene.textures.createCanvas("journey-barrel", 76, 92);
  const c = t.context;
  const path = new Path2D("M13 13Q1 48 13 79Q37 95 63 79Q75 48 63 13Z");
  const g = c.createLinearGradient(0, 0, 76, 0);
  g.addColorStop(0, "#33291f");
  g.addColorStop(0.25, "#c59554");
  g.addColorStop(0.55, "#8c633d");
  g.addColorStop(1, "#2f3229");
  c.fillStyle = g;
  c.fill(path);
  c.save();
  c.clip(path);
  for (let x = 15; x < 76; x += 11) {
    c.strokeStyle = "#382d2599";
    c.lineWidth = 2;
    c.beginPath();
    c.moveTo(x, 0);
    c.quadraticCurveTo(x - 9, 50, x, 90);
    c.stroke();
  }
  c.fillStyle = "#394749";
  c.fillRect(0, 23, 76, 7);
  c.fillRect(0, 65, 76, 7);
  c.restore();
  c.fillStyle = "#c7a26b";
  c.beginPath();
  c.ellipse(38, 13, 25, 10, 0, 0, Math.PI * 2);
  c.fill();
  c.strokeStyle = "#413c2d";
  c.lineWidth = 3;
  c.stroke();
  t.refresh();
}

// src/app/templates/journey-replay/ui/game/journey-location.world.ts
function mountJourneyLocationWorld(parent, node, view, callbacks) {
  let disposed = false;
  const rough = node.scene === "storm" || node.scene === "cape";
  const damaged = node.events.some((event) => event.object.icon === "sail");
  class Anchorage extends __webpack_exports__Scene {
    backdrop;
    ship;
    frontSail;
    rearSail;
    water;
    atmosphere;
    survey;
    cargo = [];
    tender;
    timber;
    shade;
    effectKey = "";
    elapsed = 0;
    shipBase = { x: 0, y: 0 };
    lastPointer = { x: 0, y: 0 };
    sceneReady = false;
    constructor() {
      super("journey-anchorage");
    }
    preload() {
      this.load.image("coast", node.sceneArt.backdrop);
      this.load.image("vessel", node.sceneArt.ship);
      this.load.on("loaderror", () => callbacks.failed());
    }
    create() {
      if (disposed || !this.textures.exists("coast") || !this.textures.exists("vessel")) return;
      this.backdrop = this.add.image(0, 0, "coast").setOrigin(0.5);
      this.shade = this.add.ellipse(0, 0, 600, 48, 203556, 0.48);
      this.water = this.add.graphics();
      makeSailTexture(this, "canvas-full", false, false);
      makeSailTexture(this, "canvas-torn", true, false);
      makeSailTexture(this, "canvas-patched", false, true);
      makeBarrelTexture(this);
      this.ship = this.add.container(0, 0);
      this.frontSail = this.add.image(-126, -754, damaged ? "canvas-torn" : "canvas-full").setOrigin(0.5, 0).setDisplaySize(490, 400);
      this.rearSail = this.add.image(328, -722, "canvas-full").setOrigin(0.5, 0).setDisplaySize(402, 288);
      this.ship.add([
        this.frontSail,
        this.rearSail,
        this.add.image(0, 0, "vessel").setOrigin(0.5, 1)
      ]);
      this.timber = this.add.graphics().setVisible(false);
      for (let i = 0; i < 3; i++) {
        this.timber.fillStyle(10319177).fillRoundedRect(-140, -259 + i * 13, 220, 12, 2).lineStyle(2, 14004080, 0.6).lineBetween(-130, -255 + i * 13, 72, -255 + i * 13);
      }
      this.ship.add(this.timber);
      for (let i = 0; i < 4; i++) {
        const barrel = this.add.image(-225 + i * 74, -276, "journey-barrel").setDisplaySize(59, 72).setAlpha(i === 0 ? 1 : 0);
        this.ship.add(barrel);
        this.cargo.push(barrel);
      }
      const paper = this.add.graphics().fillStyle(15323546, 1).fillPoints(
        [
          { x: 190, y: -306 },
          { x: 287, y: -331 },
          { x: 320, y: -283 },
          { x: 209, y: -265 }
        ].map((p) => new __webpack_exports__Math.Vector2(p.x, p.y)),
        true
      );
      paper.lineStyle(2, 4944231, 0.9).lineBetween(210, -289, 252, -315).lineBetween(252, -315, 294, -292);
      this.ship.add(paper);
      this.tender = this.add.container(0, 0);
      const boat = this.add.graphics();
      boat.fillStyle(1124147, 0.5).fillEllipse(0, 15, 137, 22);
      boat.fillStyle(5586215, 1).fillPoints(
        [
          { x: -74, y: -12 },
          { x: -42, y: 18 },
          { x: 47, y: 15 },
          { x: 78, y: -19 },
          { x: 33, y: -5 },
          { x: -33, y: -3 }
        ].map((p) => new __webpack_exports__Math.Vector2(p.x, p.y)),
        true
      );
      boat.lineStyle(3, 12951916, 1).lineBetween(-73, -13, -32, -4).lineBetween(-32, -4, 33, -6).lineBetween(33, -6, 77, -19);
      boat.lineStyle(5, 9203011, 1).lineBetween(-11, -10, 43, 44);
      this.tender.add(boat);
      this.tender.add(this.add.image(12, -10, "journey-barrel").setDisplaySize(21, 28));
      this.survey = this.add.graphics();
      this.atmosphere = this.add.graphics();
      this.input.on("pointermove", (p) => {
        this.lastPointer = { x: p.x / this.scale.width - 0.5, y: p.y / this.scale.height - 0.5 };
      });
      const resize = () => this.layout();
      this.scale.on("resize", resize);
      this.layout();
      this.sceneReady = true;
      callbacks.ready();
      if (!view().reducedMotion) this.cameras.main.fadeIn(450, 7, 27, 34);
    }
    layout() {
      if (!this.backdrop) return;
      const w = this.scale.width, h = this.scale.height;
      const cover = Math.max(w / 1536, h / 1024) * 1.03;
      this.backdrop.setDisplaySize(1536 * cover, 1024 * cover).setPosition(w * 0.5, h * 0.5);
      this.shipBase = { x: w * (w < 650 ? 0.46 : 0.4), y: h * 0.83 };
      const shipWidth = w * (w < 650 ? 0.98 : 0.7);
      this.ship.setPosition(this.shipBase.x, this.shipBase.y).setScale(Math.min(shipWidth / 1536, h * 0.7 / 1024));
      this.shade.setPosition(this.shipBase.x, this.shipBase.y - 6).setDisplaySize(shipWidth * 0.7, Math.max(15, shipWidth * 0.045));
      this.tender.setPosition(w * 0.76, h * 0.63).setScale(Math.max(0.45, Math.min(0.85, w / 1100)));
      this.effectKey = "";
    }
    update(_time, delta) {
      if (!this.sceneReady || disposed) return;
      const v = view(), w = this.scale.width, h = this.scale.height;
      const moving = !v.paused && !v.reducedMotion;
      this.tweens.timeScale = moving ? 1 : 0;
      if (moving) this.elapsed += Math.min(delta, 60);
      const t = this.elapsed / 1e3;
      const sheltered = v.effects.has("rest");
      const strength = rough && !sheltered ? 1.5 : 0.45;
      this.ship.setAngle(moving ? Math.sin(t * 0.75) * strength : 0).setY(this.shipBase.y + (moving ? Math.sin(t * 1.05) * 3.5 : 0));
      this.backdrop.setPosition(
        w * 0.5 + (moving ? this.lastPointer.x * 5 : 0),
        h * 0.5 + (moving ? this.lastPointer.y * 3 : 0)
      );
      const key = [...v.effects].sort().join("|");
      if (key !== this.effectKey) {
        this.effectKey = key;
        this.frontSail.setTexture(
          v.effects.has("repair") && damaged ? "canvas-patched" : damaged ? "canvas-torn" : "canvas-full"
        );
        this.timber.setVisible(v.effects.has("repair") && !damaged);
        const sailHeight = sheltered ? 95 : 400;
        if (moving) {
          this.tweens.killTweensOf([this.frontSail, this.rearSail]);
          this.tweens.add({
            targets: this.frontSail,
            displayHeight: sailHeight,
            duration: 700,
            ease: "Sine.easeInOut"
          });
          this.tweens.add({
            targets: this.rearSail,
            displayHeight: sheltered ? 70 : 288,
            duration: 700,
            ease: "Sine.easeInOut"
          });
        } else {
          this.frontSail.displayHeight = sailHeight;
          this.rearSail.displayHeight = sheltered ? 70 : 288;
        }
        const supplied = v.effects.has("water") || v.effects.has("exchange");
        this.cargo.forEach((barrel, i) => {
          this.tweens.killTweensOf(barrel);
          if (moving)
            this.tweens.add({
              targets: barrel,
              alpha: supplied || i === 0 ? 1 : 0,
              duration: 550,
              delay: i * 100
            });
          else barrel.setAlpha(supplied || i === 0 ? 1 : 0);
        });
        const target = { x: w * (supplied ? 0.63 : 0.76), y: h * (supplied ? 0.78 : 0.63) };
        this.tweens.killTweensOf(this.tender);
        if (moving)
          this.tweens.add(__spreadProps(__spreadValues({
            targets: this.tender
          }, target), {
            duration: 1600,
            ease: "Sine.easeInOut"
          }));
        else this.tender.setPosition(target.x, target.y);
      }
      this.drawWater(t, w, h, strength);
      this.drawSurvey(w, h, v.effects.has("charts"));
      this.drawAtmosphere(t, w, h, moving, rough && !sheltered);
    }
    drawWater(t, w, h, strength) {
      const g = this.water;
      g.clear();
      for (let i = 0; i < 48; i++) {
        const depth = i * 37 % 100 / 100;
        const y2 = h * (0.48 + depth * 0.5);
        const x2 = (i * 163 + t * (8 + depth * 15)) % (w + 80) - 40;
        const width = 8 + depth * 35;
        g.lineStyle(
          0.5 + depth,
          rough ? 12904934 : 16772540,
          (0.08 + Math.sin(t * 0.6 + i) * 0.04) * depth
        );
        g.beginPath();
        g.moveTo(x2, y2);
        g.lineTo(x2 + width * 0.4, y2 - 1.5 * strength);
        g.lineTo(x2 + width, y2);
        g.strokePath();
      }
      const x = this.shipBase.x, y = this.ship.y - 8, sw = this.ship.scaleX * 1536;
      for (let i = 0; i < 3; i++)
        g.lineStyle(1.4, 14415852, 0.14 - i * 0.025).strokeEllipse(
          x + sw * 0.02,
          y + i * 5,
          sw * (0.68 + i * 0.05),
          10 + i * 9
        );
    }
    drawSurvey(w, h, visible) {
      const g = this.survey;
      g.clear();
      if (!visible) return;
      const start = {
        x: this.shipBase.x + this.ship.scaleX * 247,
        y: this.ship.y - this.ship.scaleX * 291
      };
      for (const end of [
        { x: w * 0.68, y: h * 0.32 },
        { x: w * 0.85, y: h * 0.43 }
      ]) {
        const distance = Math.hypot(end.x - start.x, end.y - start.y), steps = Math.ceil(distance / 15);
        g.lineStyle(1.4, 16766856, 0.72);
        for (let i = 0; i < steps; i += 2) {
          const a = i / steps, b = Math.min(1, (i + 1) / steps);
          g.lineBetween(
            start.x + (end.x - start.x) * a,
            start.y + (end.y - start.y) * a,
            start.x + (end.x - start.x) * b,
            start.y + (end.y - start.y) * b
          );
        }
        g.strokeCircle(end.x, end.y, 13).strokeCircle(end.x, end.y, 4);
      }
      g.lineStyle(1.5, 16772026, 0.85).strokeCircle(start.x, start.y, 12);
    }
    drawAtmosphere(t, w, h, moving, rain) {
      const g = this.atmosphere;
      g.clear();
      if (rain) {
        g.lineStyle(1, 13494510, 0.22);
        for (let i = 0; i < 65; i++) {
          const x = ((i * 193 - t * 65) % (w + 120) + w + 120) % (w + 120) - 60, y = (i * 89 + t * 240) % (h + 80) - 40;
          g.lineBetween(x, y, x - 12, y + 29);
        }
      }
      for (let i = 0; i < 2; i++) {
        const x = w * (0.2 + i * 0.14) + (moving ? Math.sin(t * 0.13 + i) * 24 : 0), y = h * (0.18 + i * 0.045);
        g.lineStyle(1.7, 1387317, 0.55).beginPath().moveTo(x - 9, y + 1).lineTo(x - 4, y - 3).lineTo(x, y).lineTo(x + 4, y - 3).lineTo(x + 9, y + 1).strokePath();
      }
    }
  }
  const game = new __webpack_exports__Game({
    type: __webpack_exports__AUTO,
    parent,
    width: Math.max(1, parent.clientWidth),
    height: Math.max(1, parent.clientHeight),
    backgroundColor: "#082934",
    scene: new Anchorage(),
    banner: false,
    audio: { noAudio: true },
    fps: { target: 30 },
    scale: { mode: __webpack_exports__Scale.RESIZE },
    render: { antialias: true }
  });
  const observer = new ResizeObserver(() => {
    if (!disposed && game.isBooted && parent.clientWidth && parent.clientHeight)
      game.scale.setParentSize(parent.clientWidth, parent.clientHeight);
  });
  observer.observe(parent);
  return {
    destroy() {
      disposed = true;
      observer.disconnect();
      game.destroy(true);
    }
  };
}
export {
  mountJourneyLocationWorld
};
//# debugId=39984996-aaf7-563c-848f-5a01e8661c35
//# sourceMappingURL=chunk-ACWGFNTC.js.map
