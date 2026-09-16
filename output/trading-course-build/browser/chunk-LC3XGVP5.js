import {
  DioramaViewer,
  TimingCageSound
} from "./chunk-WB6JVIDO.js";
import {
  BalanceMetalwork,
  DioramaSurfaces,
  RoomEnvironment,
  batchMetalwork,
  stoneArch
} from "./chunk-KI3SHDPD.js";
import {
  GLTFLoader
} from "./chunk-BWIMRADB.js";
import "./chunk-4GBFXHP3.js";
import {
  cableLength,
  firstAlignment,
  machineReading,
  machineRules,
  mirrorSegment,
  traceBeam
} from "./chunk-NRR2X4JL.js";
import {
  ACESFilmicToneMapping,
  AdditiveBlending,
  AnimationMixer,
  Box3,
  CanvasTexture,
  CatmullRomCurve3,
  ConeGeometry,
  DirectionalLight,
  ExtrudeGeometry,
  Fog,
  Group,
  HemisphereLight,
  Mesh,
  MeshBasicMaterial,
  OrthographicCamera,
  PCFSoftShadowMap,
  PMREMGenerator,
  Path,
  Plane,
  PlaneGeometry,
  PointLight,
  Raycaster,
  SRGBColorSpace,
  Scene,
  Shape,
  ShapeGeometry,
  SkinnedMesh,
  SphereGeometry,
  Texture,
  TorusGeometry,
  Vector2,
  Vector3,
  WebGLRenderer
} from "./chunk-E3MFW572.js";
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

// src/app/templates/heist/escape/locks/machine-surface.ts
var MachineSurface = class {
  constructor(scene, d, snapshot, cb) {
    this.scene = scene;
    this.d = d;
    this.snapshot = snapshot;
    this.cb = cb;
    this.g = scene.add.graphics().setDepth(3);
    this.ghost = scene.add.graphics().setDepth(30);
  }
  scene;
  d;
  snapshot;
  cb;
  g;
  labels = /* @__PURE__ */ new Map();
  zones = /* @__PURE__ */ new Map();
  actions = /* @__PURE__ */ new Map();
  ghost;
  dragging = null;
  text(key, x, y, value, size = 18, color = "#f0dfb7") {
    let t = this.labels.get(key);
    if (!t) {
      t = this.scene.add.text(x, y, value, {
        fontFamily: "Trebuchet MS",
        fontSize: `${size}px`,
        color,
        align: "center",
        stroke: "#102b30",
        strokeThickness: 3
      }).setOrigin(0.5).setDepth(12);
      this.labels.set(key, t);
    }
    t.setPosition(x, y).setText(value).setColor(color).setFontSize(size);
  }
  zone(key, x, y, w, h, click, drag) {
    this.actions.set(key, { click, drag });
    let zone = this.zones.get(key);
    if (!zone) {
      zone = this.scene.add.zone(x, y, w, h).setDepth(15).setInteractive({ useHandCursor: true });
      let moved = false;
      zone.on("pointerdown", () => {
        moved = false;
      });
      zone.on("pointerup", () => {
        const s = this.snapshot();
        if (!moved && !s.paused && !s.testing && !s.completed) this.actions.get(key)?.click();
      });
      if (drag) {
        this.scene.input.setDraggable(zone);
        zone.on("dragstart", () => {
          moved = true;
        });
        zone.on("drag", (_p, px, py) => {
          const s = this.snapshot();
          if (!s.paused && !s.testing && !s.completed) {
            zone.setPosition(px, py);
            this.dragging = { key, x: px, y: py };
            this.ghost.clear().lineStyle(3, 16768147).strokeCircle(px, py, 32);
            this.ghost.fillStyle(16767889, 0.16).fillCircle(px, py, 30);
          }
        });
        zone.on("dragend", (p) => {
          this.ghost.clear();
          this.dragging = null;
          const s = this.snapshot();
          if (!s.paused && !s.testing && !s.completed) {
            const q = p.positionToCamera(this.scene.cameras.main);
            this.actions.get(key)?.drag?.(q.x, q.y);
          }
        });
      }
      this.zones.set(key, zone);
    }
    zone.setPosition(x, y).setSize(w, h);
    if (zone.input) zone.input.hitArea.setTo(0, 0, w, h);
  }
  bar(x1, y1, x2, y2, width = 7, color = 12227928) {
    const g = this.g;
    g.lineStyle(width + 5, 332565, 0.65).lineBetween(x1 + 3, y1 + 4, x2 + 3, y2 + 4);
    g.lineStyle(width, color).lineBetween(x1, y1, x2, y2);
    g.lineStyle(Math.max(1, width * 0.2), 16113580, 0.65).lineBetween(
      x1 - 1,
      y1 - 1,
      x2 - 1,
      y2 - 1
    );
  }
  bolt(x, y, r = 8) {
    this.g.fillStyle(2636606).fillCircle(x + 2, y + 3, r);
    this.g.fillStyle(12889204).fillCircle(x, y, r);
    this.g.lineStyle(2, 5198655).lineBetween(x - r * 0.45, y, x + r * 0.45, y);
  }
  plate(key, x, y, text, width = 220) {
    this.g.fillStyle(399389, 0.9).fillRoundedRect(x - width / 2, y - 22, width, 44, 6);
    this.g.lineStyle(1, 11045461).strokeRoundedRect(x - width / 2, y - 22, width, 44, 6);
    this.text(key, x, y, text, 16);
  }
  destroy() {
    this.ghost.destroy();
    this.g.destroy();
    this.labels.forEach((t) => t.destroy());
    this.zones.forEach((z) => z.destroy());
  }
};
var round = (v) => Number(v.toFixed(3)).toString();

// src/app/templates/heist/escape/locks/render-fraction-timing.ts
function fractionRenderer(s, d) {
  return {
    settled: () => true,
    destroy: () => s.destroy(),
    draw: (v, _dt, time) => {
      if (v.answer.kind !== "fraction-gear") return;
      const a = v.answer, g = s.g;
      g.clear();
      const cx = 530, cy = 300, r = 170;
      g.fillStyle(200211, 0.6).fillCircle(cx + 6, cy + 10, r + 13);
      g.fillStyle(1193788).fillCircle(cx, cy, r + 7);
      g.lineStyle(5, 10982243).strokeCircle(cx, cy, r + 8);
      for (let i = 0; i < d.slots; i++) {
        const angle = i / d.slots * Math.PI * 2 - Math.PI / 2;
        s.bar(
          cx + Math.cos(angle) * (r + 12),
          cy + Math.sin(angle) * (r + 12),
          cx + Math.cos(angle) * (r + 20),
          cy + Math.sin(angle) * (r + 20),
          2,
          6917257
        );
      }
      const solved = machineReading(d, a).solved, spin = solved && v.testing && !v.reducedMotion ? time * 0.4 : 0;
      d.pieces.forEach((piece, i) => {
        const dragging = s.dragging?.key === `sector-${i}` ? s.dragging : null;
        const placed = a.offsets[i] >= 0, pr = dragging ? 105 : placed ? r : 61;
        const start = placed ? a.offsets[i] / d.slots * Math.PI * 2 - Math.PI / 2 + spin : -Math.PI / 2, arc = piece.numerator / piece.denominator * Math.PI * 2;
        const px = dragging ? dragging.x - Math.cos(start + arc / 2) * pr * 0.65 : placed ? cx : 200 + i * 132;
        const py = dragging ? dragging.y - Math.sin(start + arc / 2) * pr * 0.65 : placed ? cy : 580;
        g.fillStyle(331539, 0.5).slice(px + 4, py + 5, pr, start, start + arc, false).fillPath();
        g.fillStyle([12753494, 7448225, 12030309, 8297904][i % 4], 0.96).slice(px, py, pr, start, start + arc, false).fillPath();
        g.lineStyle(v.selected === i ? 4 : 2, v.selected === i ? 16772537 : 15915933, 0.9).slice(px, py, pr, start, start + arc, false).strokePath();
        const toothCount = d.teeth * piece.numerator / piece.denominator;
        for (let n = 0; n < toothCount; n++) {
          const angle = start + (n + 0.5) / d.teeth * Math.PI * 2;
          s.bar(
            px + Math.cos(angle) * (pr - 5),
            py + Math.sin(angle) * (pr - 5),
            px + Math.cos(angle) * (pr + 5),
            py + Math.sin(angle) * (pr + 5),
            placed ? 5 : 2,
            15123069
          );
        }
        const mid = start + arc / 2, lx = px + Math.cos(mid) * pr * 0.65, ly = py + Math.sin(mid) * pr * 0.65;
        s.text(
          `fraction-${i}`,
          lx,
          ly,
          `${piece.numerator}/${piece.denominator}`,
          placed ? 24 : 19,
          "#fff2d1"
        );
        s.zone(
          `sector-${i}`,
          placed ? lx : px + 15,
          placed ? ly : py - 15,
          placed ? 80 : 105,
          85,
          () => s.cb.select(i),
          (x, y) => {
            const distance = Math.hypot(x - cx, y - cy);
            if (distance > r + 100) {
              s.cb.input({ type: "piece", index: i, offset: -1 });
              return;
            }
            const angle = (Math.atan2(y - cy, x - cx) - arc / 2 + Math.PI / 2 + Math.PI * 2) % (Math.PI * 2);
            s.cb.input({
              type: "piece",
              index: i,
              offset: Math.round(angle / (Math.PI * 2) * d.slots) % d.slots
            });
          }
        );
      });
      const coverage = Array.from({ length: d.slots }, () => 0);
      d.pieces.forEach((p, i) => {
        if (a.offsets[i] >= 0)
          for (let j = 0; j < d.slots * p.numerator / p.denominator; j++)
            coverage[(a.offsets[i] + j) % d.slots]++;
      });
      coverage.forEach((count, i) => {
        if (count > 1) {
          const angle = (i + 0.5) / d.slots * Math.PI * 2 - Math.PI / 2;
          g.fillStyle(16026480).fillCircle(
            cx + Math.cos(angle) * (r + 16),
            cy + Math.sin(angle) * (r + 16),
            5
          );
        }
      });
      s.bolt(cx, cy, 25);
      s.plate("ring-label", cx, 91, `${d.slots} RIM MARKS \xB7 BUILD ONE WHOLE`, 400);
      s.plate("tray-label", 550, 654, "SECTOR TRAY \xB7 DRAG / ROTATE / SEAT", 440);
      s.text(
        "help",
        875,
        265,
        "A complete rim\ntransfers the motion.\n\nGaps stop the drive.",
        18,
        "#b9ded1"
      );
      if (solved) {
        g.lineStyle(4, 10021056).strokeCircle(cx, cy, r + 9);
        s.bar(710, 300, 1085, 300, 7, 11980708);
      }
    }
  };
}
function timingRenderer(s, d) {
  let shown = 0;
  return {
    settled: () => true,
    destroy: () => s.destroy(),
    draw: (v, dt) => {
      if (v.answer.kind !== "timing-wheels") return;
      const a = v.answer, g = s.g;
      g.clear();
      shown = v.reducedMotion ? a.steps : shown + (a.steps - shown) * Math.min(1, dt * 8);
      const spacing = 720 / d.periods.length, r = Math.min(130, spacing * 0.4), start = 210 + spacing / 2;
      d.periods.forEach((period, i) => {
        const x = start + i * spacing, y = 295, phase = (shown + d.phases[i]) / period * Math.PI * 2;
        g.fillStyle(332054, 0.7).fillCircle(x + 8, y + 10, r + 8);
        g.fillGradientStyle(14993543, 8019e3, 6179890, 13018731).fillCircle(x, y, r);
        g.lineStyle(4, 13941632).strokeCircle(x, y, r);
        g.lineStyle(2, 16773053, 0.8).strokeCircle(x + r * 0.48, y, 25);
        for (let n = 0; n < period; n++) {
          const angle = n / period * Math.PI * 2 + phase;
          s.bar(x, y, x + Math.cos(angle) * (r - 9), y + Math.sin(angle) * (r - 9), 2, 8155468);
          s.text(
            `wheel-${i}-${n}`,
            x + Math.cos(angle) * (r * 0.74),
            y + Math.sin(angle) * (r * 0.74),
            String(n),
            16
          );
        }
        const hx = x + Math.cos(phase) * r * 0.48, hy = y + Math.sin(phase) * r * 0.48;
        g.fillStyle(465181).fillCircle(hx, hy, 19);
        g.lineStyle(3, 12643808).strokeCircle(hx, hy, 20);
        s.bolt(x, y, 12);
        s.plate(`period-${i}`, x, 465, `WHEEL ${i + 1} \xB7 ${period} STEPS`, 210);
        s.text(`phase-${i}`, x, 502, `Starting offset ${d.phases[i]}`, 15, "#b7d8cf");
        s.zone(
          `wheel-zone-${i}`,
          x,
          y,
          r * 2,
          r * 2,
          () => s.cb.input({ type: "steps", value: Math.min(d.maxSteps, a.steps + 1) })
        );
      });
      const reading = machineReading(d, a), rod = reading.solved ? 1 : v.testing ? 0.3 : 0;
      s.bar(175, 295, 175 + rod * 805, 295, 11, reading.solved ? 12054475 : 9479585);
      s.plate("steps", 590, 100, `${a.steps} SHARED CRANK STEPS`, 420);
      s.text(
        "timing-help",
        590,
        560,
        d.firstAlignment ? "Catch the first positive shared opening." : "Line up every opening at the same step.",
        21
      );
      s.zone(
        "rewind",
        300,
        615,
        160,
        50,
        () => s.cb.input({ type: "steps", value: Math.max(0, a.steps - 1) })
      );
      s.plate("rewind-label", 300, 615, "\u2212 REWIND", 160);
      s.zone(
        "forward",
        890,
        615,
        160,
        50,
        () => s.cb.input({ type: "steps", value: Math.min(d.maxSteps, a.steps + 1) })
      );
      s.plate("forward-label", 890, 615, "ADVANCE +", 160);
    }
  };
}

// src/app/templates/heist/escape/locks/render-liquids.ts
function tank(s, x, y, width, height, level, color, time, target) {
  const g = s.g, bottom = y + height, fill = Math.max(0, Math.min(1, level)) * height;
  g.fillStyle(134162, 0.6).fillRoundedRect(x + 8, y + 9, width, height, 22);
  g.fillGradientStyle(1856872, 665141, 1326153, 530723, 0.7).fillRoundedRect(
    x,
    y,
    width,
    height,
    22
  );
  if (fill > 1) {
    g.fillStyle(color, 0.75).fillRoundedRect(
      x + 6,
      bottom - fill,
      width - 12,
      Math.max(10, fill - 5),
      10
    );
    g.lineStyle(3, 13236460, 0.6);
    g.beginPath();
    for (let i = 0; i <= 30; i++) {
      const px = x + 8 + (width - 16) * i / 30, py = bottom - fill + Math.sin(time * 2 + i * 0.7) * 3;
      i ? g.lineTo(px, py) : g.moveTo(px, py);
    }
    g.strokePath();
    for (let i = 0; i < 12; i++) {
      const bx = x + 17 + i * 47 % (width - 34), by = bottom - (time * 21 + i * 27) % Math.max(1, fill);
      g.lineStyle(1, 13236455, 0.35).strokeCircle(bx, by, 2 + i % 3);
    }
  }
  g.lineStyle(5, 10272698, 0.9).strokeRoundedRect(x, y, width, height, 22);
  g.lineStyle(10, 15728639, 0.12).lineBetween(x + 16, y + 27, x + 16, bottom - 24);
  for (let i = 0; i <= 10; i++) {
    const ty = bottom - height * i / 10;
    g.lineStyle(i % 5 === 0 ? 3 : 1, 15462112, 0.65).lineBetween(
      x + width - 20,
      ty,
      x + width - 5,
      ty
    );
  }
  const targetY = bottom - target * height;
  s.bar(x - 14, targetY, x + width + 14, targetY, 2, 15255164);
  s.bar(x + width / 2, bottom - fill - 15, x + width / 2, y - 35, 5, 11184268);
  g.fillStyle(13741924).fillEllipse(x + width / 2, bottom - fill - 7, width * 0.62, 18);
  g.lineStyle(2, 16770730).strokeEllipse(x + width / 2, bottom - fill - 7, width * 0.62, 18);
  s.bar(x - 5, bottom + 6, x + width + 5, bottom + 6, 12, 11110737);
}
function volumeRenderer(s, d) {
  let shown = 0, target = 0;
  return {
    settled: () => Math.abs(shown - target) < 5e-4,
    destroy: () => s.destroy(),
    draw: (v, dt, time) => {
      if (v.answer.kind !== "volume") return;
      const a = v.answer, g = s.g;
      g.clear();
      const total = a.pours.reduce((sum, n, i) => sum + n * d.vessels[i].amount, 0);
      target = total / d.capacity;
      shown = v.reducedMotion ? target : shown + (target - shown) * Math.min(1, dt * 4);
      tank(s, 470, 175, 235, 320, shown, 3650229, time, d.target / d.capacity);
      s.plate(
        "target",
        585,
        95,
        `RELEASE AT ${d.targetLabel ?? `${round(d.target / d.unitTicks)} ${d.unit}`}`,
        350
      );
      s.text(
        "capacity",
        827,
        233,
        `CAPACITY
${round(d.capacity / d.unitTicks)} ${d.unit}`,
        20,
        "#b7d7ce"
      );
      s.text(
        "fill",
        585,
        360,
        `${round(Math.min(shown, 1) * d.capacity / d.unitTicks)} ${d.unit}`,
        30,
        "#f6fff3"
      );
      s.bar(710, 430, 1040, 430, 15, 6000519);
      s.bar(1040, 430, 1040, 320, 15, 6000519);
      s.bolt(885, 430, 20);
      if (total > d.capacity) {
        g.fillStyle(4242116, 0.5).fillRect(714, 480, 190, 26);
        s.text(
          "overflow",
          820,
          527,
          `OVERFLOW ${round((total - d.capacity) / d.unitTicks)} ${d.unit}`,
          17,
          "#f7c37e"
        );
      }
      d.vessels.forEach((vessel, i) => {
        const x = 205 + i * 157, y = 584, remaining = vessel.uses - a.pours[i], fill = 0.6 * vessel.amount / Math.max(...d.vessels.map((b) => b.amount));
        g.fillStyle(1456198).fillRoundedRect(x - 35, y - 54, 70, 88, 10);
        g.fillStyle(4038312, remaining ? 0.7 : 0.12).fillRoundedRect(
          x - 29,
          y + 28 - fill * 85,
          58,
          Math.max(4, fill * 85),
          6
        );
        g.lineStyle(3, 11851984).strokeRoundedRect(x - 35, y - 54, 70, 88, 10);
        s.bar(x - 20, y - 55, x + 20, y - 55, 7, 11836779);
        s.text(`vessel-${i}`, x, y - 8, vessel.label, 19);
        s.text(`uses-${i}`, x, y + 52, `${remaining} pours`, 14, "#c1d8ca");
        s.zone(
          `pour-${i}`,
          x,
          y - 10,
          90,
          110,
          () => s.cb.input({ type: "pour", index: i, delta: 1 }),
          (px, py) => {
            if (px > 410 && px < 760 && py > 110 && py < 500)
              s.cb.input({ type: "pour", index: i, delta: 1 });
          }
        );
      });
      if (Math.abs(shown - target) > 1e-3) {
        g.lineStyle(6, 9168349, 0.75).lineBetween(583, 136, 583, 495 - Math.min(shown, 1) * 320);
        s.text("pouring", 827, 318, "TRANSFERRING", 17);
      } else s.text("pouring", 827, 318, "", 17);
    }
  };
}
function mixingRenderer(s, d) {
  let shown = 0, target = 0;
  return {
    settled: () => Math.abs(shown - target) < 5e-4,
    destroy: () => s.destroy(),
    draw: (v, dt, time) => {
      if (v.answer.kind !== "mixing") return;
      const a = v.answer, g = s.g;
      g.clear();
      const amounts = a.measures.map((n, i) => n * d.ingredients[i].measure), total = amounts.reduce((sum, n) => sum + n, 0);
      target = total / d.capacity;
      shown = v.reducedMotion ? target : shown + (target - shown) * Math.min(1, dt * 4);
      const rgb = [0, 0, 0];
      d.ingredients.forEach((ingredient, i) => {
        const color2 = parseInt(ingredient.color.slice(1), 16), share = total ? amounts[i] / total : 1 / d.ingredients.length;
        rgb[0] += (color2 >> 16 & 255) * share;
        rgb[1] += (color2 >> 8 & 255) * share;
        rgb[2] += (color2 & 255) * share;
      });
      const color = (Math.round(rgb[0]) << 16) + (Math.round(rgb[1]) << 8) + Math.round(rgb[2]);
      tank(s, 505, 195, 235, 310, shown, color, time, d.total ? d.total / d.capacity : 0.5);
      s.plate(
        "recipe",
        595,
        95,
        `TARGET PARTS ${d.ingredients.map((i) => i.parts).join(" : ")}`,
        360
      );
      d.ingredients.forEach((ingredient, i) => {
        const x = 265, y = 180 + i * 135, c = parseInt(ingredient.color.slice(1), 16), remaining = ingredient.supply - amounts[i];
        g.fillStyle(1125687).fillRoundedRect(x - 50, y - 40, 100, 85, 12);
        g.fillStyle(c, 0.7).fillRoundedRect(
          x - 44,
          y + 35 - remaining / ingredient.supply * 67,
          88,
          Math.max(3, remaining / ingredient.supply * 67),
          8
        );
        g.lineStyle(3, 10733758).strokeRoundedRect(x - 50, y - 40, 100, 85, 12);
        s.bar(x + 52, y, 485, y, 9, 8494477);
        s.bar(485, y, 485, 210, 9, 8494477);
        s.bolt(390, y, 17);
        s.text(`ingredient-${i}`, x, y - 64, `${i + 1}. ${ingredient.label}`, 18);
        s.text(`amount-${i}`, x, y + 64, `${round(amounts[i] / d.unitTicks)} ${d.unit} added`, 16);
        s.zone(
          `pump-${i}`,
          390,
          y,
          60,
          60,
          () => s.cb.input({ type: "measure", index: i, delta: 1 })
        );
      });
      s.bar(745, 433, 935, 433, 13, 6589322);
      g.fillStyle(color, 0.8).fillRoundedRect(893, 297, 74, 124, 12);
      g.lineStyle(4, 11719618).strokeRoundedRect(893, 297, 74, 124, 12);
      const parts = d.ingredients.reduce((n, i) => n + i.parts, 0), actual = total ? amounts[0] / total : 0, desired = d.ingredients[0].parts / parts;
      g.fillStyle(663593).fillRoundedRect(827, 178, 210, 83, 12);
      g.lineStyle(2, 11440477).strokeRoundedRect(827, 178, 210, 83, 12);
      s.bar(846, 239, 1018, 239, 4, 4353906);
      s.bar(846 + desired * 172, 218, 846 + desired * 172, 245, 4, 15913367);
      s.bar(846 + actual * 172, 230, 846 + actual * 172, 251, 5, 9691859);
      s.text("sensor", 932, 204, "COMPOSITION SENSOR", 15);
      s.text("mixture-total", 622, 366, `${round(total / d.unitTicks)} ${d.unit}`, 29, "#efffea");
      s.text(
        "mix-help",
        935,
        491,
        "",
        16
      );
      const angle = v.reducedMotion ? 0 : time * 1.5;
      s.bar(622, 147, 622, 390, 7, 10200730);
      s.bar(622 - Math.cos(angle) * 75, 405, 622 + Math.cos(angle) * 75, 405, 8, 14991488);
    }
  };
}

// src/app/templates/heist/escape/locks/render-spatial.ts
function coordinateRenderer(s, d) {
  return {
    settled: () => true,
    destroy: () => s.destroy(),
    draw: (v) => {
      if (v.answer.kind !== "coordinate") return;
      const a = v.answer, g = s.g;
      g.clear();
      const unit = 410 / (d.max - d.min), left = 355, top = 139;
      const px = (x2) => left + (x2 - d.min) * unit, py = (y2) => top + (d.max - y2) * unit;
      g.fillStyle(1060407, 0.94).fillRoundedRect(left - 38, top - 30, 488, 475, 12);
      g.lineStyle(3, 10850658).strokeRoundedRect(left - 38, top - 30, 488, 475, 12);
      for (let n = d.min; n <= d.max; n++) {
        const x2 = px(n), y2 = py(n);
        g.lineStyle(n === 0 ? 3 : 1, n === 0 ? 12701632 : 4286059, 0.9).lineBetween(x2, top, x2, top + 410).lineBetween(left, y2, left + 410, y2);
        s.text(`x-${n}`, x2, top + 436, String(n), 14);
        s.text(`y-${n}`, left - 23, y2, String(n), 14);
      }
      s.text("x-title", left + 440, top + 427, "x", 22);
      s.text("y-title", left - 22, top - 51, "y", 22);
      if (d.goal.mode === "intersection")
        d.goal.lines.forEach((line, i) => {
          const points = [];
          for (const x2 of [d.min, d.max])
            if (line.b !== 0) {
              const y2 = (line.c - line.a * x2) / line.b;
              if (y2 >= d.min && y2 <= d.max) points.push({ x: px(x2), y: py(y2) });
            }
          for (const y2 of [d.min, d.max])
            if (line.a !== 0) {
              const x2 = (line.c - line.b * y2) / line.a;
              if (x2 >= d.min && x2 <= d.max) points.push({ x: px(x2), y: py(y2) });
            }
          if (points.length >= 2)
            s.bar(points[0].x, points[0].y, points[1].x, points[1].y, 5, i ? 8568243 : 12164707);
          s.text(
            `line-${i}`,
            944,
            210 + i * 60,
            `${line.a}x + ${line.b}y = ${line.c}`,
            19,
            i ? "#a8e3d5" : "#edd18d"
          );
        });
      const x = px(a.x), y = py(a.y);
      s.bar(x, top - 16, x, top + 423, 9, 11904124);
      s.bar(left - 13, y, left + 425, y, 9, 7577502);
      for (let nx = d.min; nx <= d.max; nx++)
        for (let ny = d.min; ny <= d.max; ny++) {
          g.fillStyle(333855, 0.8).fillCircle(px(nx), py(ny), 3);
        }
      s.bolt(x, y, 14);
      g.lineStyle(3, 15136221).strokeCircle(x, y, 24);
      s.zone(
        "head",
        x,
        y,
        64,
        64,
        () => {
        },
        (mx, my) => s.cb.input({
          type: "point",
          x: Math.max(d.min, Math.min(d.max, Math.round((mx - left) / unit + d.min))),
          y: Math.max(d.min, Math.min(d.max, Math.round(d.max - (my - top) / unit)))
        })
      );
      s.plate("point", 563, 88, `PIN POSITION (${a.x}, ${a.y})`, 360);
      s.text("axis-help", 214, 293, "HORIZONTAL\nx first\n\nVERTICAL\ny second", 20, "#b8d9cf");
      s.text("drag-help", 948, 407, "Drag the crosshair.\nRails click into grid units.", 18);
      s.bar(left, 604, left + 410, 604, 9, 7442310);
      s.bolt(x, 604, 21);
      s.zone(
        "x-crank",
        x,
        604,
        60,
        50,
        () => s.cb.input({ type: "point", x: a.x < d.max ? a.x + 1 : d.min, y: a.y })
      );
    }
  };
}
function reflectionRenderer(s, d) {
  return {
    settled: () => true,
    destroy: () => s.destroy(),
    draw: (v, _dt, time) => {
      if (v.answer.kind !== "reflection") return;
      const a = v.answer, g = s.g;
      g.clear();
      const unit = 55, ox = 283, oy = 135, px = (x) => ox + x * unit, py = (y) => oy + y * unit;
      g.fillStyle(465702, 0.75).fillRoundedRect(ox - 12, oy - 12, 574, 464, 12);
      g.lineStyle(2, 7506308).strokeRoundedRect(ox - 12, oy - 12, 574, 464, 12);
      for (let x = 0; x <= 10; x++)
        for (let y = 0; y <= 8; y++) {
          g.fillStyle(7706776, 0.2).fillCircle(px(x), py(y), 1.5);
        }
      const beam = traceBeam(d, a.angles);
      for (let i = 1; i < beam.points.length; i++) {
        const p = beam.points[i - 1], q = beam.points[i];
        for (const [width, alpha] of [
          [15, 0.07],
          [8, 0.18],
          [3, 0.9]
        ])
          g.lineStyle(width, 9306096, alpha).lineBetween(px(p.x), py(p.y), px(q.x), py(q.y));
        g.fillStyle(14811122, 0.9).fillCircle(px(q.x), py(q.y), 4);
      }
      d.obstacles.forEach((obstacle, i) => {
        s.bar(px(obstacle.a.x), py(obstacle.a.y), px(obstacle.b.x), py(obstacle.b.y), 18, 6781306);
        s.text(
          `obstacle-${i}`,
          px((obstacle.a.x + obstacle.b.x) / 2),
          py((obstacle.a.y + obstacle.b.y) / 2) + 26,
          "BLOCKER",
          12
        );
      });
      d.mirrors.forEach((mirror, i) => {
        const x = px(mirror.center.x), y = py(mirror.center.y), segment = mirrorSegment(d, i, a.angles[i]);
        g.fillStyle(1190449, 0.9).fillCircle(x, y, 47);
        g.lineStyle(3, 10718046).strokeCircle(x, y, 47);
        for (let n = 0; n < 12; n++) {
          const angle = n * Math.PI / 6;
          s.bar(
            x + Math.cos(angle) * 40,
            y + Math.sin(angle) * 40,
            x + Math.cos(angle) * 46,
            y + Math.sin(angle) * 46,
            2,
            11707248
          );
        }
        s.bar(px(segment.a.x), py(segment.a.y), px(segment.b.x), py(segment.b.y), 10, 8897746);
        s.bolt(x, y, 7);
        const normal = (a.angles[i] + 90) * Math.PI / 180;
        for (let n = -3; n <= 3; n++) {
          const distance = n * 12;
          g.lineStyle(1, 16771495, 0.65).lineBetween(
            x + Math.cos(normal) * distance,
            y + Math.sin(normal) * distance,
            x + Math.cos(normal) * (distance + 6),
            y + Math.sin(normal) * (distance + 6)
          );
        }
        s.text(`mirror-${i}`, x, y + 67, `${i + 1} \xB7 ${a.angles[i]}\xB0`, 18, "#dff8ed");
        s.zone(
          `mirror-${i}`,
          x,
          y,
          96,
          96,
          () => s.cb.input({ type: "mirror", index: i, angle: (a.angles[i] + mirror.step) % 180 }),
          (mx, my) => {
            const angle = (Math.atan2(my - y, mx - x) * 180 / Math.PI + 360) % 180;
            s.cb.input({
              type: "mirror",
              index: i,
              angle: Math.round(angle / mirror.step) * mirror.step % 180
            });
          }
        );
      });
      s.bolt(px(d.emitter.x), py(d.emitter.y), 18);
      g.fillStyle(11927537).fillCircle(px(d.emitter.x), py(d.emitter.y), 7);
      g.fillStyle(beam.hit ? 8185523 : 3230547).fillCircle(
        px(d.receiver.x),
        py(d.receiver.y),
        20
      );
      g.lineStyle(4, 13939831).strokeCircle(px(d.receiver.x), py(d.receiver.y), 24);
      if (beam.hit && !v.reducedMotion)
        g.lineStyle(2, 11597765, 0.3 + 0.2 * Math.sin(time * 3)).strokeCircle(
          px(d.receiver.x),
          py(d.receiver.y),
          32
        );
      s.plate("optics", 573, 84, "REFLECT LIGHT INTO THE RECEIVER", 440);
      s.text(
        "optics-help",
        976,
        270,
        "Drag a mirror rim\nto rotate its surface.\n\nOr tap to turn one step.",
        18
      );
      s.text(
        "optics-law",
        580,
        635,
        "Reflection angle is measured from the normal to the mirror.",
        17,
        "#bfdbcf"
      );
      const contact = beam.points[1], start = beam.points[0];
      const firstMirror = d.mirrors.findIndex(
        (m) => Math.hypot(m.center.x - contact.x, m.center.y - contact.y) < m.length / 2 + 1e-3
      );
      let measurement = "Dashed lines show\nthe mirror normals.";
      if (firstMirror >= 0) {
        const ray = Math.atan2(contact.y - start.y, contact.x - start.x), normal = (a.angles[firstMirror] + 90) * Math.PI / 180;
        const incidence = Math.acos(Math.min(1, Math.abs(Math.cos(ray - normal)))) * 180 / Math.PI;
        measurement = `FIRST BOUNCE
Incidence ${round(incidence)} degrees
Reflection ${round(incidence)} degrees`;
      }
      s.text("measured-angle", 972, 425, measurement, 17, "#bcddd2");
    }
  };
}
function cableRenderer(s, d) {
  return {
    settled: () => true,
    destroy: () => s.destroy(),
    draw: (v, _dt, time) => {
      if (v.answer.kind !== "cable") return;
      const a = v.answer, g = s.g;
      g.clear();
      const maxX = Math.max(...d.route.map((p) => p.x), 1), maxY = Math.max(...d.route.map((p) => p.y), 1), unit = Math.min(600 / (maxX + 1), 340 / (maxY + 1)), ox = 270, oy = maxY <= 1 ? 310 : 495;
      const pts = d.route.map((p) => ({ x: ox + p.x * unit, y: oy - p.y * unit })), first = pts[0], last = pts[pts.length - 1], required = cableLength(d), chosen = d.cables[a.cable], solved = machineReading(d, a).solved;
      s.bar(first.x, first.y, last.x, first.y, 2, 7440262);
      s.bar(last.x, first.y, last.x, last.y, 2, 7440262);
      if (d.mode === "diagonal") {
        s.text(
          "horizontal",
          (first.x + last.x) / 2,
          first.y + 29,
          `${round(Math.abs(d.route[1].x - d.route[0].x) * d.scale)} ${d.unit}`,
          20
        );
        s.text(
          "vertical",
          last.x + 45,
          (first.y + last.y) / 2,
          `${round(Math.abs(d.route[1].y - d.route[0].y) * d.scale)} ${d.unit}`,
          20
        );
      } else
        d.route.slice(1).forEach(
          (p, i) => s.text(
            `span-${i}`,
            (pts[i].x + pts[i + 1].x) / 2 + 25,
            (pts[i].y + pts[i + 1].y) / 2 - 26,
            `${round(Math.hypot(p.x - d.route[i].x, p.y - d.route[i].y))} ${d.scale === 1 ? d.unit : "drawing units"}`,
            21
          )
        );
      if (chosen) {
        let remaining = chosen.length / d.scale;
        g.lineStyle(6, solved ? 13883569 : 11768928);
        g.beginPath();
        g.moveTo(first.x, first.y);
        for (let i = 1; i < pts.length; i++) {
          const length = Math.hypot(
            d.route[i].x - d.route[i - 1].x,
            d.route[i].y - d.route[i - 1].y
          ), portion = Math.max(0, Math.min(1, remaining / length));
          const start = pts[i - 1], end = {
            x: start.x + (pts[i].x - start.x) * portion,
            y: start.y + (pts[i].y - start.y) * portion
          };
          let sag = 0;
          if (chosen.length > required) {
            const targetPixels = Math.hypot(pts[i].x - start.x, pts[i].y - start.y) * chosen.length / required;
            let lo = 0, hi = 700;
            for (let n = 0; n < 18; n++) {
              const h = (lo + hi) / 2;
              let sum = 0, prior = start;
              for (let j = 1; j <= 32; j++) {
                const t = j / 32, q = {
                  x: start.x + (end.x - start.x) * t,
                  y: start.y + (end.y - start.y) * t + 4 * h * t * (1 - t)
                };
                sum += Math.hypot(q.x - prior.x, q.y - prior.y);
                prior = q;
              }
              if (sum < targetPixels) lo = h;
              else hi = h;
            }
            sag = (lo + hi) / 2;
          }
          for (let j = 1; j <= 36; j++) {
            const t = j / 36;
            g.lineTo(
              start.x + (end.x - start.x) * t,
              start.y + (end.y - start.y) * t + 4 * sag * t * (1 - t)
            );
          }
          remaining -= length;
          if (portion < 1) break;
        }
        g.strokePath();
      }
      pts.forEach((p, i) => {
        g.fillStyle(2112579).fillRoundedRect(p.x - 23, p.y - 25, 46, 50, 7);
        s.bolt(p.x, p.y, 16);
        s.text(
          `anchor-${i}`,
          p.x,
          p.y - 47,
          i === 0 ? "SPRING ANCHOR" : i === pts.length - 1 ? "LATCH ANCHOR" : "PULLEY",
          15
        );
      });
      s.plate(
        "cable-title",
        588,
        91,
        d.mode === "diagonal" ? "MEASURE THE DIAGONAL SPAN" : "MEASURE THE MARKED CABLE ROUTE",
        460
      );
      s.text(
        "map-scale",
        960,
        390,
        d.scale === 1 ? "Measures in " + d.unit : `SCALE
1 drawing unit
= ${d.scale} ${d.unit}`,
        18
      );
      d.cables.forEach((c, i) => {
        const x = 218 + i * 156, y = 590, r = 18 + c.length / Math.max(...d.cables.map((c2) => c2.length)) * 20;
        g.lineStyle(a.cable === i ? 5 : 3, a.cable === i ? 16111766 : 11113570);
        for (let n = 0; n < 4; n++) g.strokeCircle(x, y, r - n * 5);
        s.text(`cable-${i}`, x, y + 53, c.label, 18);
        s.zone(
          `reel-${i}`,
          x,
          y,
          115,
          100,
          () => s.cb.input({ type: "cable", index: i }),
          (mx, my) => {
            if (mx > 200 && mx < 1050 && my > 110 && my < 530)
              s.cb.input({ type: "cable", index: i });
          }
        );
      });
      s.text(
        "tension",
        968,
        245,
        solved ? "SPRING LOADED\nLatch tension aligned" : chosen && chosen.length > required ? "SLACK CABLE" : chosen ? "HOOK CANNOT REACH" : "CHOOSE A CABLE",
        20,
        solved ? "#c0f2c4" : "#d2c29b"
      );
    }
  };
}

// src/app/templates/heist/escape/locks/timing-cage/timing-cage.motion.ts
var ESCAPE_DURATION = 8.4;
var ease = (v) => {
  const t = Math.max(0, Math.min(1, v));
  return t * t * (3 - 2 * t);
};
function nextCrankStep(d, current, delta) {
  const requested = Math.max(0, Math.min(d.maxSteps, current + delta));
  const first = firstAlignment(d.periods, d.phases, d.maxSteps);
  return delta > 0 && d.firstAlignment && current < first ? Math.min(requested, first) : requested;
}
function cagePose(time) {
  return {
    pin: ease(time / 0.8),
    latch: ease((time - 0.55) / 0.6),
    door: ease((time - 1.15) / 1.1),
    animal: Math.max(0, Math.min(1, (time - 2.65) / 4.7))
  };
}
var TimingCageSequence = class {
  constructor(d, view) {
    this.d = d;
    this.steps = view.answer.kind === "timing-wheels" ? view.answer.steps : 0;
    if (machineReading(d, view.answer).solved) this.time = ESCAPE_DURATION;
  }
  d;
  time = 0;
  steps;
  pending = false;
  trial = -1;
  testing = false;
  delivered = false;
  update(view, dt, settled) {
    const steps = view.answer.kind === "timing-wheels" ? view.answer.steps : 0;
    const solved = machineReading(this.d, view.answer).solved;
    let engage = false, finished = false;
    if (steps !== this.steps) {
      this.steps = steps;
      this.pending = true;
      this.time = 0;
    }
    if (view.testing && view.trial !== this.trial) {
      this.trial = view.trial;
      this.time = 0;
      this.delivered = false;
      this.pending = false;
    }
    if (view.testing && !view.paused && dt > 0) {
      this.time = view.reducedMotion ? ESCAPE_DURATION : Math.min(ESCAPE_DURATION, this.time + dt);
      if (this.time >= ESCAPE_DURATION && !this.delivered) {
        this.delivered = true;
        finished = true;
      }
    } else if (!view.testing && this.testing) {
      this.time = view.passed ? ESCAPE_DURATION : 0;
    }
    if (!view.testing && this.pending && solved && settled && !view.paused && dt > 0) {
      this.pending = false;
      engage = true;
    }
    if (!solved && !view.testing) this.time = 0;
    this.testing = view.testing;
    return { engage, finished };
  }
};

// src/app/templates/heist/escape/locks/timing-cage/timing-cage.model.ts
function disc(art, parent, radius, holeAngle, holeDistance, material) {
  const shape = new Shape();
  shape.absarc(0, 0, radius, 0, Math.PI * 2, false);
  const hole = new Path();
  hole.absarc(
    Math.cos(holeAngle) * holeDistance,
    Math.sin(holeAngle) * holeDistance,
    0.27,
    0,
    Math.PI * 2,
    true
  );
  shape.holes.push(hole);
  const axle = new Path();
  axle.absarc(0, 0, 0.16, 0, Math.PI * 2, true);
  shape.holes.push(axle);
  art.mesh(
    new ExtrudeGeometry(shape, {
      depth: 0.12,
      bevelEnabled: true,
      bevelSegments: 2,
      steps: 1,
      bevelSize: 0.025,
      bevelThickness: 0.025,
      curveSegments: 48
    }),
    material,
    parent
  );
  art.torus(parent, 0, 0, 0.13, radius - 0.045, 0.045, art.brass);
  art.torus(
    parent,
    Math.cos(holeAngle) * holeDistance,
    Math.sin(holeAngle) * holeDistance,
    0.14,
    0.27,
    0.035,
    art.steel
  );
  for (let i = 0; i < 40; i++) {
    const a = i * Math.PI / 20;
    const tooth = art.box(
      parent,
      Math.cos(a) * (radius + 0.035),
      Math.sin(a) * (radius + 0.035),
      0.065,
      0.14,
      0.12,
      0.16,
      material,
      0.018
    );
    tooth.rotation.z = a;
  }
}
function createTimingDiorama(art, d) {
  const root = new Group();
  root.name = "timing-cage-diorama";
  const surfaces = new DioramaSurfaces(art);
  const stone = surfaces.stone(6715270);
  const edge = surfaces.stone(3426645);
  const floor = surfaces.stone(8094589);
  const wood = surfaces.wood(9003065);
  const blue = art.material({ color: 5473169, metalness: 0.7, roughness: 0.35 });
  const bronze = art.material({ color: 9597525, metalness: 0.8, roughness: 0.38 });
  const leaves = art.material({ color: 4680011, roughness: 0.96 });
  art.box(root, 0, -0.22, 1.15, 17.6, 0.6, 8.3, edge, 0.12);
  for (let row = 0; row < 5; row++)
    for (let col = 0; col < 11; col++) {
      const tile = art.box(
        root,
        -7.9 + col * 1.57 + row % 2 * 0.06,
        0.09,
        -1.5 + row * 1.53,
        1.51,
        0.17,
        1.45,
        floor,
        0.055
      );
      tile.rotation.y = Math.sin(row * 23 + col * 7) * 7e-3;
    }
  for (let row = 0; row < 6; row++)
    for (let col = 0; col < 11; col++) {
      const x = -8 + col * 1.6 + row % 2 * 0.25;
      if (x > 1.8 && x < 5.6 && row > 1 && row < 5) continue;
      art.box(
        root,
        x,
        0.58 + row * 1,
        -1.55,
        1.52,
        0.94,
        0.46,
        (row + col) % 5 === 0 ? edge : stone,
        0.065
      );
    }
  const night = art.material({ color: 795961, roughness: 1 });
  art.box(root, 3.6, 3.3, -1.83, 4, 4.6, 0.18, night);
  stoneArch(art, root, 3.6, 3.28, 2.03, -1.28, stone);
  const moon = art.material({ color: 14411483, emissive: 11062746, emissiveIntensity: 0.65 });
  art.mesh(new SphereGeometry(0.5, 24, 12), moon, root, 4.2, 4.5, -1.6);
  for (let i = 0; i < 17; i++)
    art.mesh(new SphereGeometry(0.016, 6, 4), moon, root, 2.02 + i * 0.773 % 3.2, 3.8 + i * 0.317 % 1.15, -1.67);
  for (const x of [-8.25, 0.15, 7.5]) {
    art.box(root, x, 3, -1, 0.52, 6.1, 0.65, edge, 0.08);
    art.box(root, x, 0.4, -0.95, 0.8, 0.5, 0.85, stone, 0.05);
    art.box(root, x, 5.7, -0.95, 0.8, 0.4, 0.85, stone, 0.05);
  }
  for (let i = 0; i < 17; i++) {
    const x = 6.65 + Math.sin(i * 2) * 0.5, y = 1.6 + i * 0.23;
    const leaf = art.mesh(new SphereGeometry(0.13, 6, 4), leaves, root, x, y, -0.98);
    leaf.scale.set(1, 1.8, 0.4);
    leaf.rotation.z = Math.sin(i) * 0.7;
  }
  const frameTop = d.periods.length > 2 ? 6.5 : 5.72;
  art.box(root, -4.25, (frameTop + 0.35) / 2, -0.44, 7, frameTop - 0.35, 0.65, art.dark, 0.17);
  art.box(root, -4.25, 0.4, 0.05, 7.45, 0.35, 1.9, art.trim, 0.06);
  art.box(root, -4.25, frameTop, 0, 7.25, 0.24, 1.1, art.brass, 0.035);
  for (const x of [-7.5, -1]) for (const y of [0.72, 5.36]) art.screw(root, x, y, -0.05);
  const releasePoint = new Vector3(-4.25, 3.45, 0);
  const wheelCenters = [], holeAngles = [], wheels = [];
  d.periods.forEach((period, i) => {
    const angle = d.periods.length === 2 ? Math.PI * (1 - i) : Math.PI / 2 + i * Math.PI * 2 / d.periods.length;
    const center = new Vector3(
      releasePoint.x + Math.cos(angle) * 1.15,
      releasePoint.y + Math.sin(angle) * 1.15,
      0.35 + i * 0.24
    );
    const wheel = new Group();
    wheel.name = `timing-disc-${i + 1}`;
    wheel.position.copy(center);
    root.add(wheel);
    const holeAngle = angle + Math.PI;
    disc(
      art,
      wheel,
      d.periods.length === 2 ? 1.77 : 1.5,
      holeAngle,
      1.15,
      [art.brass, blue, bronze, art.steel][i]
    );
    const rim = d.periods.length === 2 ? 1.49 : 1.29;
    art.torus(wheel, 0, 0, 0.146, 0.65, 0.012, art.dark);
    art.torus(wheel, 0, 0, 0.146, 0.72, 9e-3, art.brass);
    for (let tick = 0; tick < period; tick++) {
      const a = holeAngle - tick * Math.PI * 2 / period;
      const mark = art.box(
        wheel,
        Math.cos(a) * rim,
        Math.sin(a) * rim,
        0.155,
        0.022,
        0.13,
        0.015,
        art.dark,
        4e-3
      );
      mark.rotation.z = a - Math.PI / 2;
      if (period <= 12 || tick % 2 === 0)
        art.label(
          wheel,
          String(tick),
          Math.cos(a) * (rim + 0.12),
          Math.sin(a) * (rim + 0.12),
          0.18,
          0.25,
          0.22,
          "#182a32"
        );
    }
    art.torus(root, center.x, center.y, center.z + 0.23, 0.23, 0.08, art.steel);
    art.screw(root, center.x, center.y, center.z + 0.26);
    wheelCenters.push(center);
    holeAngles.push(holeAngle);
    wheels.push(wheel);
  });
  const pin = new Group();
  pin.name = "shared-alignment-pin";
  pin.position.set(-4.25, 3.45, 1.95);
  root.add(pin);
  const shaft = art.cylinder(pin, 0, 0, -0.42, 0.135, 1.2, art.steel);
  shaft.rotation.x = Math.PI / 2;
  art.torus(pin, 0, 0, 0.2, 0.29, 0.055, art.brass);
  for (let i = 0; i < 7; i++) art.torus(root, -4.25, 3.45, 1.48 + i * 0.065, 0.2, 0.018, art.steel);
  const drawbar = art.rod(
    root,
    new Vector3(-4.25, 3.8, 1.95),
    new Vector3(-4.25, 5.8, 1.65),
    0.047,
    art.steel
  );
  const lever = new Group();
  lever.position.set(-4.25, 5.8, 1.65);
  root.add(lever);
  art.box(lever, 0.35, 0, 0, 0.85, 0.14, 0.16, art.brass);
  art.screw(lever, 0, 0, 0.11);
  art.rod(root, new Vector3(-3.48, 5.8, 1.65), new Vector3(5.65, 5.8, 1.65), 0.026, art.rope);
  art.torus(root, 5.65, 5.57, 1.65, 0.24, 0.05, art.brass);
  const cageCable = art.rod(
    root,
    new Vector3(5.89, 5.57, 1.65),
    new Vector3(5.78, 2.05, 2.47),
    0.026,
    art.rope
  );
  const crank = new Group();
  crank.name = "crank-handle";
  crank.position.set(-4.25, 1.12, 1.25);
  root.add(crank);
  art.torus(crank, 0, 0, 0, 0.53, 0.065, art.brass);
  art.box(crank, 0, 0, 0, 1.02, 0.085, 0.11, art.steel);
  art.box(crank, 0, 0, 0, 0.085, 1.02, 0.11, art.steel);
  const handle = art.cylinder(crank, 0.5, 0, 0.22, 0.105, 0.5, wood);
  handle.rotation.x = Math.PI / 2;
  const indicators = [];
  for (let i = 0; i < d.periods.length; i++) {
    const lamp = art.mesh(
      new SphereGeometry(0.08, 12, 8),
      art.material({ color: 2440258, emissive: 2112058 }),
      root,
      -5.05 + i * 0.53,
      5.35,
      0.3
    );
    indicators.push(lamp);
  }
  art.box(root, 3.55, 0.31, 0.65, 4.25, 0.24, 3.55, wood, 0.05);
  for (const x of [1.48, 5.62])
    for (const z of [-1, 2.32]) {
      art.box(root, x, 2.2, z, 0.2, 3.9, 0.2, art.dark, 0.04);
      art.mesh(new SphereGeometry(0.17, 12, 8), art.brass, root, x, 4.2, z);
    }
  for (const y of [0.55, 4]) {
    for (const z of [-1, 2.32]) art.box(root, 3.55, y, z, 4.25, 0.14, 0.16, art.steel, 0.02);
    for (const x of [1.48, 5.62]) art.box(root, x, y, 0.65, 0.14, 0.14, 3.4, art.steel, 0.02);
  }
  for (let i = 1; i < 9; i++)
    art.rod(
      root,
      new Vector3(1.48 + i * 0.46, 0.55, -1),
      new Vector3(1.48 + i * 0.46, 4, -1),
      0.035,
      art.steel
    );
  for (let i = 1; i < 6; i++)
    for (const x of [1.48, 5.62])
      art.rod(
        root,
        new Vector3(x, 0.55, -1 + i * 0.55),
        new Vector3(x, 4, -1 + i * 0.55),
        0.035,
        art.steel
      );
  const door = new Group();
  door.name = "animal-cage-door";
  door.position.set(1.58, 0.48, 2.32);
  root.add(door);
  for (const y of [0, 3.44]) art.box(door, 1.97, y, 0, 3.94, 0.14, 0.16, art.brass, 0.02);
  for (const x of [0, 3.94]) art.box(door, x, 1.72, 0, 0.14, 3.44, 0.16, art.steel, 0.02);
  for (let i = 1; i < 9; i++)
    art.rod(
      door,
      new Vector3(i * 0.438, 0, 0),
      new Vector3(i * 0.438, 3.44, 0),
      0.043,
      art.steel
    );
  for (const y of [1.1, 2.8]) art.cylinder(root, 1.58, y, 2.32, 0.12, 0.35, art.brass);
  const latch = new Group();
  latch.name = "cage-latch";
  latch.position.set(5.28, 2.05, 2.47);
  root.add(latch);
  art.box(latch, 0, 0, 0, 1, 0.14, 0.16, art.brass, 0.035);
  art.box(root, 5.66, 2.05, 2.48, 0.26, 0.42, 0.27, art.dark);
  const shutter = new Group();
  shutter.position.set(-7.15, 4.7, -0.05);
  root.add(shutter);
  art.box(shutter, 0, 0, 0, 0.52, 0.85, 0.07, wood);
  const animal = new Group();
  animal.name = "escaping-animal";
  root.add(animal);
  const flames = [];
  for (const x of [-8, 6.75]) {
    art.box(root, x, 3.5, -0.3, 0.13, 0.9, 0.15, wood);
    art.cylinder(root, x, 3.97, -0.3, 0.18, 0.19, art.dark);
    const flame = art.mesh(
      new SphereGeometry(0.18, 12, 8),
      art.material({ color: 16763507, emissive: 16745260, emissiveIntensity: 2 }),
      root,
      x,
      4.28,
      -0.3
    );
    flame.scale.y = 1.85;
    flames.push(flame);
    const light = new PointLight(16753743, 8, 7, 2);
    light.position.set(x, 4.4, 0.1);
    root.add(light);
  }
  for (const group of [...wheels, door, crank, lever, pin]) batchMetalwork(art, group);
  batchMetalwork(art, root, /* @__PURE__ */ new Set([drawbar, cageCable, ...flames, ...indicators]));
  return {
    root,
    wheels,
    wheelCenters,
    holeAngles,
    pin,
    latch,
    door,
    crank,
    lever,
    shutter,
    animal,
    flames,
    indicators,
    drawbar,
    cageCable
  };
}
function positionTimingDiorama(stage, d, tick, release) {
  stage.wheels.forEach((wheel, i) => {
    wheel.rotation.z = (tick + d.phases[i]) * Math.PI * 2 / d.periods[i];
  });
  stage.crank.rotation.z = -tick * Math.PI / 2;
  const pose = cagePose(release);
  stage.pin.position.z = 1.95 - pose.pin * 1;
  stage.lever.rotation.y = pose.latch * 0.4;
  stage.latch.position.x = 5.28 + pose.latch * 0.78;
  stage.door.rotation.y = -pose.door * Math.PI * 0.56;
  stage.shutter.position.y = 4.7 - pose.latch * 0.7;
  const connect = (mesh, from, to) => {
    const delta = to.clone().sub(from);
    mesh.position.copy(from).add(to).multiplyScalar(0.5);
    mesh.scale.y = delta.length();
    mesh.quaternion.setFromUnitVectors(new Vector3(0, 1, 0), delta.normalize());
  };
  connect(
    stage.drawbar,
    new Vector3(-4.25, 3.73, stage.pin.position.z + 0.2),
    new Vector3(-4.25, 5.8, 1.65)
  );
  connect(
    stage.cageCable,
    new Vector3(5.89, 5.57, 1.65),
    new Vector3(stage.latch.position.x + 0.5, 2.05, 2.47)
  );
  stage.indicators.forEach((lamp, i) => {
    const aligned = Math.abs(
      (tick + d.phases[i]) / d.periods[i] - Math.round((tick + d.phases[i]) / d.periods[i])
    ) < 3e-3;
    const material = lamp.material;
    material.color.setHex(aligned && tick > 0 ? 10020029 : 8153147);
    material.emissive.setHex(aligned && tick > 0 ? 3907177 : 3155475);
  });
}

// src/app/templates/heist/escape/locks/timing-cage/timing-cage.animal.ts
async function loadCageAnimal(parent, definition) {
  const gltf = await new GLTFLoader().loadAsync(definition.model);
  const model = gltf.scene;
  const mixer = new AnimationMixer(model);
  const clips = [definition.idle, definition.walk, definition.run].map((name) => {
    const clip = gltf.animations.find((a) => a.name === name);
    if (!clip) throw new Error(`Animal animation missing: ${name}`);
    return mixer.clipAction(clip);
  });
  model.updateMatrixWorld(true);
  const box = new Box3().setFromObject(model), size = box.getSize(new Vector3());
  const scale = 1.65 / Math.max(size.y, 1e-3);
  const pivot = new Group();
  pivot.add(model);
  parent.add(pivot);
  model.scale.setScalar(scale);
  model.position.set(
    -(box.min.x + box.max.x) * scale / 2,
    -box.min.y * scale,
    -(box.min.z + box.max.z) * scale / 2
  );
  model.traverse((o) => {
    if (o instanceof Mesh) {
      o.castShadow = true;
      o.receiveShadow = true;
    }
  });
  const path = new CatmullRomCurve3(
    [
      new Vector3(3.65, 0.44, 0.2),
      new Vector3(3.65, 0.44, 1.9),
      new Vector3(4, 0.18, 3.6),
      new Vector3(5.1, 0.18, 4.55),
      new Vector3(6.7, 0.18, 4.55)
    ],
    false,
    "centripetal"
  );
  let active = 0;
  clips[0].play();
  const change = (next, reduced) => {
    if (active === next) return;
    if (reduced) clips[active].stop();
    else clips[active].fadeOut(0.22);
    clips[next].reset().setEffectiveTimeScale(1).setEffectiveWeight(1).fadeIn(reduced ? 0 : 0.22).play();
    active = next;
  };
  let destroyed = false;
  return {
    update(release, dt, reduced) {
      const progress = cagePose(release).animal;
      const traveling = progress > 0 && progress < 1;
      change(traveling ? progress < 0.4 ? 1 : 2 : 0, reduced);
      parent.position.copy(path.getPointAt(progress));
      const tangent = path.getTangentAt(Math.max(1e-3, Math.min(0.999, progress)));
      parent.rotation.y = traveling ? Math.atan2(tangent.x, tangent.z) : progress === 1 ? 0.55 : 0.18;
      clips[1].setEffectiveTimeScale(0.7);
      clips[2].setEffectiveTimeScale(0.6);
      if (!reduced && dt > 0) mixer.update(dt);
      else if (reduced) {
        clips[active].time = 0;
        mixer.update(0);
      }
    },
    destroy() {
      if (destroyed) return;
      destroyed = true;
      mixer.stopAllAction();
      mixer.uncacheRoot(model);
      parent.remove(pivot);
      const textures = /* @__PURE__ */ new Set(), materials = /* @__PURE__ */ new Set(), geometries = /* @__PURE__ */ new Set();
      model.traverse((object) => {
        if (!(object instanceof Mesh)) return;
        geometries.add(object.geometry);
        for (const material of Array.isArray(object.material) ? object.material : [object.material]) {
          materials.add(material);
          for (const value of Object.values(material))
            if (value instanceof Texture) textures.add(value);
        }
        if (object instanceof SkinnedMesh) object.skeleton.dispose();
      });
      geometries.forEach((g) => g.dispose());
      materials.forEach((m) => m.dispose());
      textures.forEach((t) => {
        const image = t.source.data;
        if (typeof ImageBitmap !== "undefined" && image instanceof ImageBitmap) image.close();
        t.dispose();
      });
    }
  };
}

// src/app/templates/heist/escape/locks/timing-cage/timing-cage.layout.ts
var timingCageLayout = `
<style>
[data-timing-cage]{position:relative;width:100%;height:100%;overflow:hidden;background:#101d28;color:#f4ecd8;font:14px/1.35 'Trebuchet MS',sans-serif;isolation:isolate;box-sizing:border-box}
[data-timing-cage] *{box-sizing:border-box}
[data-timing-cage] button,[data-timing-cage] a{font:inherit}
[data-timing-cage] button{cursor:pointer;min-height:44px;padding:9px 13px;border:1px solid #66756e;border-radius:7px;background:#1b303b;color:#f4ecd8}
[data-timing-cage] button:hover{background:#314b53;border-color:#d9bb7b}
[data-timing-cage] button:disabled{cursor:default;opacity:.4}
[data-timing-cage] button:focus-visible,[data-timing-cage] input:focus-visible,[data-timing-cage] summary:focus-visible,[data-timing-cage] a:focus-visible{outline:3px solid #ffe19c;outline-offset:3px}
[data-timing-cage] [hidden]{display:none!important}
[data-timing-cage] .tc-viewport{position:absolute;inset:0 0 126px;overflow:hidden;background:radial-gradient(ellipse at 60% 30%,#365360,#0c1924 85%)}
[data-timing-cage] canvas{width:100%;height:100%;display:block;touch-action:pan-y}
[data-timing-cage] .tc-corners{position:absolute;inset:14px 14px auto;display:flex;align-items:start;justify-content:space-between;gap:10px;pointer-events:none}
[data-timing-cage] .tc-corners>*{pointer-events:auto}
[data-timing-cage] .tc-title{margin:0;color:#f5d897;text-shadow:0 2px 6px #000;font:600 12px/1.6 'Trebuchet MS',sans-serif;letter-spacing:.18em}
[data-timing-cage] .tc-subtitle{display:block;letter-spacing:0;color:#c6d5d9;font-weight:400;font-size:12px}
[data-timing-cage] .tc-view-buttons{display:flex;gap:6px}
[data-timing-cage] .tc-view-buttons button{font-size:12px;background:#152632eb;padding:7px 10px}
[data-timing-cage] .tc-focus{position:absolute;left:12px;bottom:140px;display:flex;gap:5px}
[data-timing-cage] .tc-focus button{font-size:12px;background:#142632e8}
[data-timing-cage] button[aria-pressed=true]{background:#425d59;border-color:#edcf90}
[data-timing-cage] .tc-controls{position:absolute;inset:auto 0 0;padding:12px 15px;min-height:126px;background:linear-gradient(110deg,#142630,#1e353d);border-top:1px solid #727361;display:grid;grid-template-columns:1fr auto;gap:8px 12px}
[data-timing-cage] .tc-ticks{display:flex;align-items:center;gap:13px}
[data-timing-cage] .tc-count{font:38px/.95 Georgia,serif;min-width:48px;color:#f5d590;font-variant-numeric:tabular-nums}
[data-timing-cage] .tc-count small{display:block;font:10px/1.8 'Trebuchet MS',sans-serif;letter-spacing:.2em;color:#c5d0cb}
[data-timing-cage] .tc-readings{display:flex;gap:8px;flex-wrap:wrap}
[data-timing-cage] .tc-wheel{padding:4px 9px;border-left:2px solid #b99e6c;font-size:12px;color:#dbe4dd}
[data-timing-cage] .tc-wheel[data-aligned=true]{border-color:#9fe1c1;color:#b7f0d3}
[data-timing-cage] .tc-wheel b{font-size:13px;font-weight:600;display:block;color:#f1dfb9}
[data-timing-cage] .tc-actions{display:flex;align-items:center;justify-content:flex-end;gap:6px}
[data-timing-cage] [data-action=advance]{background:#e1be7c;border-color:#f8d99a;color:#14232d;font-weight:bold;min-width:118px;box-shadow:inset 0 1px #fff4c9}
[data-timing-cage] .tc-feedback{grid-column:1/-1;font-size:12px;color:#d3dfd9;min-height:17px}
[data-timing-cage] .tc-feedback[data-open=true]{color:#b2edcb}
[data-timing-cage] .tc-settings{position:absolute;right:14px;top:70px;width:min(340px,calc(100% - 28px));max-height:calc(100% - 225px);overflow:auto;z-index:5;border:1px solid #788783;border-radius:9px;padding:15px;background:#172a35;box-shadow:0 16px 35px #0008}
[data-timing-cage] .tc-settings label{display:flex;gap:9px;align-items:center;margin:12px 0;font-size:13px}
[data-timing-cage] .tc-settings input{width:20px;height:20px;accent-color:#e4c184}
[data-timing-cage] .tc-settings a{color:#dec994;font-size:12px}
[data-timing-cage] .tc-settings p{font-size:13px;margin:7px 0 13px;color:#c6d5d8}
[data-timing-cage] .tc-settings strong{font-size:14px;color:#f0d497}
[data-timing-cage] .tc-settings button{width:100%;margin-bottom:10px}
[data-timing-cage] .tc-label{position:absolute;pointer-events:none;text-align:center;background:#142633e8;border:1px solid #81918a75;padding:5px 9px;border-radius:5px;font-size:12px;color:#f3dab0;white-space:nowrap;box-shadow:0 4px 12px #0003}
[data-timing-cage] .tc-label small{display:block;font-size:11px;color:#d1dfda}
[data-timing-cage] .tc-label[data-highlight=true]{border-color:#c4e2ca;color:#c4f1d3}
[data-timing-cage] .tc-caption{position:absolute;left:50%;bottom:143px;transform:translateX(-50%);padding:8px 15px;text-align:center;max-width:68%;background:#172d36e8;border:1px solid #b99b6c;border-radius:7px;font-size:14px;color:#f6dba5;pointer-events:none}
[data-timing-cage].tc-expanded{position:fixed;inset:14px;z-index:2000;width:auto;height:auto;border:1px solid #9a987b;border-radius:12px;box-shadow:0 0 0 30px #05121cec}
@media(max-width:650px){
 [data-timing-cage] .tc-viewport{bottom:192px}
 [data-timing-cage] .tc-controls{min-height:192px;grid-template-columns:1fr;padding:11px}
 [data-timing-cage] .tc-actions{justify-content:stretch}
 [data-timing-cage] .tc-actions button{flex:1}
 [data-timing-cage] .tc-focus{bottom:205px}
 [data-timing-cage] .tc-caption{bottom:258px;font-size:12px;max-width:94%;width:max-content}
 [data-timing-cage] .tc-view-buttons button{font-size:11px;padding:6px 8px}
 [data-timing-cage] .tc-title{font-size:10px;letter-spacing:.1em}
 [data-timing-cage] .tc-subtitle{font-size:11px;max-width:145px}
 [data-timing-cage].tc-expanded{inset:5px}
}

[data-timing-cage] .tc-caption,[data-timing-cage] .tc-feedback{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}
[data-timing-cage] .tc-viewport{bottom:86px}
[data-timing-cage] .tc-controls{height:86px;min-height:86px}
[data-timing-cage] output{display:inline-block;min-width:28px;text-align:center;font-variant-numeric:tabular-nums}
@media(max-width:680px){[data-timing-cage] .tc-viewport{bottom:135px}[data-timing-cage] .tc-controls{height:135px;min-height:135px}}
</style>
<div class="tc-viewport"></div>
<div class="tc-corners"><p class="tc-title">PATROL SYNCHRONIZER</p><div class="tc-view-buttons"><button type="button" data-action="expand" aria-label="Expand patrol workshop">Expand</button> <button type="button" data-action="reset" aria-label="Reset mechanism">\u21BA</button></div></div>
<div class="tc-caption" role="status" hidden></div>
<div class="tc-controls">
 <div class="tc-ticks"><div class="tc-count"><span data-count>0</span><small>TICKS</small></div><div class="tc-readings" aria-label="Wheel timing"></div></div>
 <div class="tc-actions"><button type="button" data-action="rewind" aria-label="Rewind one tick">\u21B6 1</button><button type="button" data-action="advance">Crank +1</button><button type="button" data-action="replay" hidden>Replay escape</button><button type="button" data-action="pause">Pause</button></div>
 <div class="tc-feedback" aria-live="polite">The first turn arms the latch.</div>
</div>

`;

// src/app/templates/heist/escape/locks/timing-cage/timing-cage.scene.ts
function mountTimingCage(parent, d, snapshot, cb) {
  const presentation = d.presentation;
  if (!presentation) throw new Error("Timing cage presentation required");
  const animalLabel = presentation.animal.label, animalName = animalLabel.toLowerCase();
  const root = document.createElement("div");
  root.setAttribute("data-timing-cage", "");
  root.innerHTML = timingCageLayout;
  parent.append(root);
  const q = (selector) => root.querySelector(selector);
  const viewport = q(".tc-viewport");
  const sound = new TimingCageSound();
  let renderer;
  try {
    renderer = new WebGLRenderer({
      antialias: true,
      alpha: false,
      powerPreference: "low-power"
    });
  } catch (error) {
    root.remove();
    sound.destroy();
    throw error;
  }
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 1.35));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = PCFSoftShadowMap;
  renderer.outputColorSpace = SRGBColorSpace;
  renderer.toneMapping = ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.98;
  renderer.setClearColor(1387321);
  const canvas = renderer.domElement;
  viewport.append(canvas);
  canvas.setAttribute("role", "img");
  canvas.setAttribute(
    "aria-label",
    "Overlapping timing discs linked to a cage with an animated fox. Use Crank +1 or drag the crank."
  );
  const scene = new Scene();
  scene.fog = new Fog(1387321, 28, 53);
  const camera = new OrthographicCamera(-9, 9, 5, -5, 0.1, 80);
  const environment = new RoomEnvironment(), pmrem = new PMREMGenerator(renderer), env = pmrem.fromScene(environment, 0.025);
  scene.environment = env.texture;
  scene.environmentIntensity = 0.6;
  environment.dispose();
  pmrem.dispose();
  scene.add(new HemisphereLight(13165812, 4800045, 1.15));
  const key = new DirectionalLight(16768939, 2.6);
  key.position.set(-6, 10, 8);
  key.castShadow = true;
  key.shadow.mapSize.set(2048, 2048);
  key.shadow.camera.left = -12;
  key.shadow.camera.right = 12;
  key.shadow.camera.top = 10;
  key.shadow.camera.bottom = -7;
  key.shadow.camera.near = 0.1;
  key.shadow.camera.far = 35;
  key.shadow.bias = -3e-4;
  key.shadow.normalBias = 0.027;
  scene.add(key);
  const moonlight = new DirectionalLight(9223645, 2.3);
  moonlight.position.set(6, 7, -4);
  scene.add(moonlight);
  const art = new BalanceMetalwork(), stage = createTimingDiorama(art, d);
  scene.add(stage.root);
  const sequence = new TimingCageSequence(d, snapshot());
  let animal, loaded = false, disposed = false, failed = false;
  let frame = 0, last = performance.now(), age = 0, previousRelease = 0;
  let currentTick = snapshot().answer.kind === "timing-wheels" ? snapshot().answer.steps : 0;
  let expanded = false, previousOverflow = "", previousFocus = null;
  let focus = viewport.clientWidth < 600 ? "lock" : "all";
  let center = new Vector3(0, 2.75, 0.6), worldWidth = 18.2;
  const readout = q(".tc-readings");
  const wheelRows = d.periods.map((period, i) => {
    const element = document.createElement("div");
    element.className = "tc-wheel";
    const title = document.createElement("b");
    title.textContent = `${String.fromCharCode(65 + i)} \xB7 ${period} ticks / turn`;
    const remainder = document.createElement("span");
    element.append(title, remainder);
    readout.append(element);
    return { element, remainder };
  });
  const labels = d.periods.map((period, i) => {
    const element = document.createElement("div");
    element.className = "tc-label";
    element.textContent = `${String.fromCharCode(65 + i)} \xB7 ${period} ticks`;
    const sub = document.createElement("small");
    sub.textContent = d.phases[i] ? `starts +${d.phases[i]}` : "starts at zero";
    element.append(sub);
    viewport.append(element);
    return element;
  });
  const cageLabel = document.createElement("div");
  cageLabel.className = "tc-label";
  cageLabel.textContent = `${presentation.animal.label.toUpperCase()} \xB7 HOLDING CAGE`;
  viewport.append(cageLabel);
  const pinLabel = document.createElement("div");
  pinLabel.className = "tc-label";
  pinLabel.textContent = "SHARED RELEASE PIN";
  viewport.append(pinLabel);
  const action = (name) => q(`[data-action=${name}]`);
  const raycaster = new Raycaster();
  const point = new Vector2();
  let dragging;
  const view = () => __spreadProps(__spreadValues({}, snapshot()), {
    reducedMotion: snapshot().reducedMotion
  });
  function canOperate() {
    const v = view();
    return loaded && !failed && !v.paused && !v.testing && !v.completed;
  }
  function operate(delta) {
    if (!canOperate()) return;
    const v = view();
    if (v.answer.kind !== "timing-wheels") return;
    if (delta > 0 && machineReading(d, v.answer).solved) return;
    sound.unlock();
    const steps = nextCrankStep(d, v.answer.steps, delta);
    if (steps !== v.answer.steps) {
      sound.play("tick");
      cb.input({ type: "steps", value: steps });
    }
  }
  function resize() {
    if (disposed) return;
    const w = viewport.clientWidth, h = viewport.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    updateCamera(1);
  }
  function updateCamera(blend) {
    const aspect = Math.max(0.3, viewport.clientWidth / Math.max(1, viewport.clientHeight));
    const target = focus === "lock" ? new Vector3(-4.2, 3, 0.8) : focus === "cage" ? new Vector3(4.1, 2.3, 1.8) : new Vector3(0, 2.8, 0.7);
    const width = focus === "lock" ? 8.2 : focus === "cage" ? 8.8 : 18.2;
    center.lerp(target, blend);
    worldWidth += (width - worldWidth) * blend;
    const height = Math.max(focus === "all" ? 8.8 : 7.2, worldWidth / aspect);
    camera.left = -height * aspect / 2;
    camera.right = height * aspect / 2;
    camera.top = height / 2;
    camera.bottom = -height / 2;
    camera.position.copy(center).add(new Vector3(0.6, 6.8, 23));
    camera.lookAt(center);
    camera.updateProjectionMatrix();
    camera.updateMatrixWorld();
  }
  function setFocus(next) {
    focus = next;
    root.querySelectorAll("[data-focus]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset["focus"] === focus)));
  }
  function setExpanded(value) {
    expanded = value;
    if (value) {
      previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      previousOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      root.setAttribute("role", "dialog");
      root.setAttribute("aria-modal", "true");
      root.setAttribute("aria-label", "Expanded patrol workshop");
    } else {
      document.body.style.overflow = previousOverflow;
      root.removeAttribute("role");
      root.removeAttribute("aria-modal");
      root.removeAttribute("aria-label");
    }
    root.classList.toggle("tc-expanded", value);
    action("expand").textContent = value ? "Close" : "Expand";
    action("expand").setAttribute(
      "aria-label",
      value ? "Close expanded patrol workshop" : "Expand patrol workshop"
    );
    resize();
    if (!value) previousFocus?.focus({ preventScroll: true });
    else action("expand").focus();
  }
  function onClick(event) {
    const target = event.target.closest("button");
    if (!target || !root.contains(target)) return;
    const name = target.dataset["action"];
    sound.unlock();
    if (name === "advance") operate(1);
    if (name === "rewind") operate(-1);
    if (name === "reset" && canOperate()) {
      cb.input({ type: "reset" });
    }
    if (name === "replay" && !view().paused && !view().testing) cb.replay?.();
    if (name === "pause") cb.pause?.();
    if (name === "expand") setExpanded(!expanded);
    const next = target.dataset["focus"];
    if (next === "all" || next === "lock" || next === "cage") setFocus(next);
  }
  function onKey(event) {
    if (event.key === "Escape") {
      if (expanded) setExpanded(false);
      return;
    }
    if (expanded && event.key === "Tab") {
      const list = Array.from(
        root.querySelectorAll("button:not(:disabled),input,a")
      ).filter((e) => e.getClientRects().length);
      const first = list[0], final = list[list.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        final?.focus();
      } else if (!event.shiftKey && document.activeElement === final) {
        event.preventDefault();
        first?.focus();
      }
    }
  }
  function crankScreen() {
    return stage.crank.getWorldPosition(new Vector3()).project(camera);
  }
  function crankAngle(e) {
    const rect = canvas.getBoundingClientRect(), p = crankScreen();
    return Math.atan2(
      e.clientY - rect.top - (1 - p.y) * rect.height / 2,
      e.clientX - rect.left - (p.x + 1) * rect.width / 2
    );
  }
  function pointerDown(e) {
    if (!canOperate()) return;
    const rect = canvas.getBoundingClientRect();
    point.set(
      (e.clientX - rect.left) / rect.width * 2 - 1,
      1 - (e.clientY - rect.top) / rect.height * 2
    );
    raycaster.setFromCamera(point, camera);
    const p = crankScreen(), distance = Math.hypot(
      (point.x - p.x) * rect.width / 2,
      (point.y - p.y) * rect.height / 2
    );
    if (!raycaster.intersectObject(stage.crank, true).length && distance > 34) return;
    e.preventDefault();
    canvas.setPointerCapture(e.pointerId);
    sound.unlock();
    dragging = {
      id: e.pointerId,
      x: e.clientX,
      y: e.clientY,
      angle: crankAngle(e),
      accumulated: 0,
      moved: false
    };
  }
  function pointerMove(e) {
    if (!dragging || e.pointerId !== dragging.id || !canOperate()) return;
    const angle = crankAngle(e), delta = Math.atan2(Math.sin(angle - dragging.angle), Math.cos(angle - dragging.angle));
    dragging.angle = angle;
    dragging.accumulated += delta;
    if (Math.hypot(e.clientX - dragging.x, e.clientY - dragging.y) > 7) dragging.moved = true;
    if (Math.abs(dragging.accumulated) > Math.PI / 3) {
      operate(dragging.accumulated > 0 ? 1 : -1);
      dragging.accumulated = 0;
    }
  }
  function pointerUp(e) {
    if (!dragging || dragging.id !== e.pointerId) return;
    const moved = dragging.moved;
    dragging = void 0;
    if (canvas.hasPointerCapture(e.pointerId)) canvas.releasePointerCapture(e.pointerId);
    if (e.type !== "pointercancel" && !moved) operate(1);
  }
  function placeLabel(element, point2) {
    const projected = point2.project(camera), w = viewport.clientWidth, h = viewport.clientHeight;
    const x = (projected.x + 1) * w / 2, y = (1 - projected.y) * h / 2;
    element.hidden = x < 15 || x > w - 15 || y < 45 || y > h - 35;
    element.style.left = `${Math.max(element.offsetWidth / 2 + 5, Math.min(w - element.offsetWidth / 2 - 5, x))}px`;
    element.style.top = `${y}px`;
    element.style.transform = "translate(-50%,-50%)";
  }
  function text(element, value) {
    if (element.textContent !== value) element.textContent = value;
  }
  function render(now) {
    if (disposed || failed) return;
    frame = requestAnimationFrame(render);
    const v = view(), dt = v.paused || document.hidden ? 0 : Math.min(0.25, (now - last) / 1e3);
    last = now;
    if (v.paused || document.hidden) sound.suspend();
    else sound.resume();
    if (document.hidden) return;
    age += dt;
    const steps = v.answer.kind === "timing-wheels" ? v.answer.steps : 0;
    if (!v.paused && dt > 0) {
      const delta = steps - currentTick;
      currentTick = v.reducedMotion || Math.abs(delta) < 8e-3 ? steps : currentTick + delta * (1 - Math.exp(-dt * 12));
    }
    const settled = Math.abs(steps - currentTick) < 9e-3;
    const result = sequence.update(v, loaded ? dt : 0, settled);
    if (result.engage) cb.engage?.();
    if (result.finished) cb.finished();
    const release = v.passed || machineReading(d, v.answer).solved ? sequence.time : 0;
    root.dataset["release"] = String(Math.round(release * 100) / 100);
    root.dataset["tick"] = String(steps);
    root.dataset["settled"] = String(settled);
    positionTimingDiorama(stage, d, currentTick, release);
    if (!v.reducedMotion && dt > 0)
      stage.flames.forEach((flame, i) => {
        flame.scale.y = 1.7 + Math.sin(age * 7 + i) * 0.13;
      });
    if (release > 1.4 && previousRelease <= 1.4 && focus === "lock")
      setFocus(viewport.clientWidth < 650 ? "cage" : "all");
    updateCamera(v.reducedMotion ? 1 : dt === 0 ? 0 : 1 - Math.exp(-dt * 4));
    animal?.update(release, dt, v.reducedMotion);
    if (dt > 0 && !v.reducedMotion) {
      for (const [time, cue] of [
        [0.15, "latch"],
        [1.2, "door"],
        [7.6, "free"]
      ])
        if (release >= time && previousRelease < time) sound.play(cue);
      if (release > 2.65 && release < 7.35 && Math.floor(release * 3.2) !== Math.floor(previousRelease * 3.2))
        sound.play("step");
    }
    previousRelease = release;
    labels.forEach((label, i) => {
      const center2 = stage.wheelCenters[i].clone();
      center2.y += d.periods.length === 2 ? 1.95 : 1.68;
      placeLabel(label, center2);
      label.dataset["highlight"] = String(steps > 0 && (steps + d.phases[i]) % d.periods[i] === 0);
    });
    placeLabel(cageLabel, new Vector3(3.7, 4.7, 2.35));
    placeLabel(pinLabel, new Vector3(-4.25, 2.45, 2.5));
    const solved = machineReading(d, v.answer).solved, pose = cagePose(release);
    text(q("[data-count]"), String(steps).padStart(2, "0"));
    wheelRows.forEach(({ element, remainder }, i) => {
      const n = (steps + d.phases[i]) % d.periods[i];
      element.dataset["aligned"] = String(n === 0 && steps > 0);
      text(
        remainder,
        n === 0 ? steps ? "Hole aligned" : d.phases[i] ? `Offset +${d.phases[i]}` : "At start" : `${d.periods[i] - n} to the opening`
      );
    });
    action("advance").hidden = solved;
    action("replay").hidden = !solved;
    action("advance").disabled = !canOperate() || steps >= d.maxSteps;
    action("rewind").disabled = !canOperate() || steps === 0;
    action("reset").disabled = !canOperate();
    action("replay").disabled = !loaded || v.testing || v.paused;
    action("pause").textContent = v.paused ? "Resume" : "Pause";
    action("pause").setAttribute("aria-pressed", String(v.paused));
    const status = q(".tc-feedback");
    status.dataset["open"] = String(pose.animal === 1);
    text(
      status,
      v.paused ? "Paused." : !loaded ? "Preparing the animated animal\u2026" : release >= 7.35 ? `Cage open. The ${animalName} is safely through.` : solved ? "The shared pin fits. Watch the cage." : steps === 0 ? "The first turn arms the latch. Click or turn the crank clockwise." : `${wheelRows.filter((_, i) => (steps + d.phases[i]) % d.periods[i] === 0).length} of ${d.periods.length} holes aligned. Keep turning.`
    );
    const caption = q(".tc-caption");
    caption.hidden = release <= 0 || release >= ESCAPE_DURATION && focus === "lock";
    text(
      caption,
      release >= 7.35 ? `A clear path. A free ${animalName}.` : pose.animal > 0 ? `The ${animalName} makes its escape\u2026` : pose.door > 0 ? "The cage door swings open\u2026" : "The pin slips through. The latch releases."
    );
    canvas.setAttribute(
      "aria-label",
      `Timing lock at tick ${steps}. ${pose.animal === 1 ? `Cage open; ${animalName} outside.` : pose.door > 0 ? "Cage opening." : `${animalLabel} waiting in closed cage.`}`
    );
    renderer.render(scene, camera);
    root.dataset["drawCalls"] = String(renderer.info.render.calls);
  }
  function contextLost(event) {
    event.preventDefault();
    fail();
  }
  function fail() {
    if (disposed || failed) return;
    failed = true;
    cancelAnimationFrame(frame);
    sound.suspend();
    if (expanded) setExpanded(false);
    root.hidden = true;
    cb.failed();
  }
  root.addEventListener("click", onClick);
  root.addEventListener("keydown", onKey);
  canvas.addEventListener("pointerdown", pointerDown);
  canvas.addEventListener("pointermove", pointerMove);
  canvas.addEventListener("pointerup", pointerUp);
  canvas.addEventListener("pointercancel", pointerUp);
  canvas.addEventListener("webglcontextlost", contextLost);
  const observer = new ResizeObserver(resize);
  observer.observe(viewport);
  setFocus(focus);
  resize();
  frame = requestAnimationFrame(render);
  void loadCageAnimal(stage.animal, presentation.animal).then((loadedAnimal) => {
    if (disposed || failed) {
      loadedAnimal.destroy();
      return;
    }
    animal = loadedAnimal;
    loaded = true;
    cb.ready();
  }).catch(fail);
  return {
    destroy() {
      if (disposed) return;
      if (expanded) setExpanded(false);
      disposed = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      sound.destroy();
      animal?.destroy();
      root.removeEventListener("click", onClick);
      root.removeEventListener("keydown", onKey);
      canvas.removeEventListener("pointerdown", pointerDown);
      canvas.removeEventListener("pointermove", pointerMove);
      canvas.removeEventListener("pointerup", pointerUp);
      canvas.removeEventListener("pointercancel", pointerUp);
      canvas.removeEventListener("webglcontextlost", contextLost);
      art.dispose();
      env.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      root.remove();
    }
  };
}

// src/app/templates/heist/escape/locks/fraction-cage/fraction-cage.motion.ts
var RABBIT_ESCAPE_DURATION = 11.2;
var clamp = (v) => Math.max(0, Math.min(1, v));
var ease2 = (v) => {
  const t = clamp(v);
  return t * t * (3 - 2 * t);
};
var sectorSize = (d, i) => d.slots * d.pieces[i].numerator / d.pieces[i].denominator;
function sectorFits(d, offsets, index, offset) {
  if (!Number.isInteger(index) || index < 0 || index >= d.pieces.length || !Number.isInteger(offset) || offset < 0 || offset >= d.slots)
    return false;
  const occupied = /* @__PURE__ */ new Set();
  offsets.forEach((start, i) => {
    if (start < 0 || i === index) return;
    for (let j = 0; j < sectorSize(d, i); j++) occupied.add((start + j) % d.slots);
  });
  for (let j = 0; j < sectorSize(d, index); j++)
    if (occupied.has((offset + j) % d.slots)) return false;
  return true;
}
function fractionCagePose(time) {
  return {
    clutch: ease2(time / 0.65),
    lift: ease2((time - 0.65) / 2),
    turn: ease2((time - 0.65) / 2) * Math.PI * 2
  };
}
function rabbitMotion(index, time, idle) {
  const elapsed = time - 3.05 - index * 0.58;
  const progress = clamp(elapsed / 4.25);
  const cycle = progress >= 1 || elapsed < 0 ? 0 : elapsed / 0.68 % 1;
  const flight = clamp((cycle - 0.16) / 0.64);
  const airborne = cycle >= 0.16 && cycle <= 0.8 && progress < 1;
  const jump = airborne ? Math.sin(flight * Math.PI) * 0.4 : 0;
  const crouch = progress < 1 && elapsed >= 0 && (cycle < 0.16 || cycle > 0.8) ? 0.1 * Math.sin((cycle < 0.16 ? cycle / 0.16 : (1 - cycle) / 0.2) * Math.PI / 2) : 0;
  const lane = index % 3;
  const startX = 3.15 + lane * 1.16, startZ = index < 3 ? 0.25 : -1;
  const forward = clamp(progress / 0.57), spread = ease2((progress - 0.57) / 0.43);
  return {
    x: startX + ([-0.6, 0.05, 0.6][lane] + (index < 3 ? 0 : 0.95)) * (index < 3 ? spread : ease2((progress - 0.35) / 0.35)),
    z: startZ + (3.8 - startZ) * forward + spread * (index < 3 ? 1.15 : 2.15),
    y: 0.19 + jump - crouch,
    yaw: spread * (lane - 1) * 0.25,
    pitch: airborne ? Math.cos(flight * Math.PI) * -0.16 : 0,
    leg: airborne ? Math.sin(flight * Math.PI * 2) * 0.6 : -0.15 * crouch,
    ear: elapsed < 0 ? Math.sin(idle * 1.6 + index * 1.7) * 0.075 : -0.12 + Math.sin(cycle * Math.PI * 2) * 0.16 * (progress < 1 ? 1 : 0),
    progress,
    escaped: progress === 1
  };
}
var FractionCageSequence = class {
  constructor(d, view) {
    this.d = d;
    this.key = JSON.stringify(view.answer);
    if (machineReading(d, view.answer).solved) this.time = RABBIT_ESCAPE_DURATION;
  }
  d;
  time = 0;
  key;
  pending = false;
  trial = -1;
  testing = false;
  delivered = false;
  update(view, dt, settled) {
    const key = JSON.stringify(view.answer), solved = machineReading(this.d, view.answer).solved;
    let engage = false, finished = false;
    if (key !== this.key) {
      this.key = key;
      this.pending = true;
      this.time = 0;
    }
    if (view.testing && view.trial !== this.trial) {
      this.trial = view.trial;
      this.time = 0;
      this.delivered = false;
      this.pending = false;
    }
    if (view.testing && !view.paused && dt > 0) {
      this.time = view.reducedMotion ? RABBIT_ESCAPE_DURATION : Math.min(RABBIT_ESCAPE_DURATION, this.time + dt);
      if (this.time === RABBIT_ESCAPE_DURATION && !this.delivered) {
        this.delivered = true;
        finished = true;
      }
    } else if (!view.testing && this.testing) this.time = view.passed ? RABBIT_ESCAPE_DURATION : 0;
    if (!view.testing && !view.completed && this.pending && solved && settled && !view.paused && dt > 0) {
      this.pending = false;
      engage = true;
    }
    if (!solved && !view.testing) this.time = 0;
    this.testing = view.testing;
    return { engage, finished };
  }
};

// src/app/templates/heist/escape/locks/fraction-cage/fraction-cage.rabbit.ts
function createRabbit(art, fur, index) {
  const root = new Group(), body = new Group(), head = new Group();
  root.name = `rabbit-${index + 1}`;
  root.add(body);
  body.add(head);
  head.position.set(0, 0.86, 0.32);
  const cream = art.material({ color: 16182746, roughness: 0.96 });
  const pink = art.material({ color: 14261657, roughness: 0.9 });
  const eyes = art.material({ color: 1515044, roughness: 0.12 });
  const glint = art.material({ color: 16777215, emissive: 9149338, emissiveIntensity: 0.4 });
  const ellipsoid = (p, x, y, z, a, b, c, m = fur) => {
    const mesh = art.mesh(new SphereGeometry(1, 18, 12), m, p, x, y, z);
    mesh.scale.set(a, b, c);
    return mesh;
  };
  ellipsoid(body, 0, 0.55, -0.07, 0.35, 0.45, 0.49);
  ellipsoid(body, 0, 0.4, -0.35, 0.4, 0.38, 0.31);
  ellipsoid(body, 0, 0.59, -0.62, 0.17, 0.18, 0.17, cream);
  ellipsoid(body, 0, 0.5, 0.34, 0.25, 0.31, 0.15, cream);
  ellipsoid(head, 0, 0, 0, 0.29, 0.3, 0.29);
  for (const side of [-1, 1]) {
    ellipsoid(head, side * 0.104, -0.09, 0.236, 0.132, 0.103, 0.112, cream);
    ellipsoid(head, side * 0.225, 0.052, 0.19, 0.054, 0.068, 0.046, eyes);
    ellipsoid(head, side * 0.224, 0.077, 0.232, 0.019, 0.022, 0.013, glint);
  }
  ellipsoid(head, 0, -0.046, 0.342, 0.046, 0.034, 0.029, pink);
  const ears = [];
  for (const side of [-1, 1]) {
    const ear = new Group();
    ear.position.set(side * 0.135, 0.205, -0.045);
    ear.rotation.z = side * -0.13;
    head.add(ear);
    ellipsoid(ear, 0, 0.285, 0, 0.098, 0.36, 0.084);
    ellipsoid(ear, 0, 0.3, 0.057, 0.055, 0.268, 0.03, pink);
    ears.push(ear);
    batchMetalwork(art, ear);
  }
  const legs = [];
  for (let i = 0; i < 4; i++) {
    const leg = new Group(), back = i > 1, side = i % 2 ? 1 : -1;
    leg.position.set(side * (back ? 0.28 : 0.2), back ? 0.26 : 0.31, back ? -0.31 : 0.25);
    body.add(leg);
    ellipsoid(leg, 0, -0.05, 0, back ? 0.17 : 0.085, back ? 0.2 : 0.19, 0.13);
    ellipsoid(leg, 0, -0.19, 0.095, back ? 0.13 : 0.082, 0.08, back ? 0.24 : 0.16, cream);
    legs.push(leg);
    batchMetalwork(art, leg);
  }
  batchMetalwork(art, head);
  batchMetalwork(art, body);
  const scale = [1, 0.91, 0.97, 0.92, 1.04, 0.95][index % 6];
  root.scale.setScalar(scale);
  return { root, body, head, ears, legs };
}
function poseRabbit(rig, index, time, idle, reduced) {
  const pose = rabbitMotion(index, time, reduced ? 0 : idle);
  rig.root.position.set(pose.x, pose.y, pose.z);
  rig.root.rotation.y = pose.yaw;
  rig.body.rotation.x = pose.pitch;
  rig.body.scale.y = time === 0 && !reduced ? 1 + Math.sin(idle * 2 + index) * 0.018 : 1;
  rig.head.rotation.y = time === 0 && !reduced ? Math.sin(idle * 0.65 + index * 1.8) * 0.18 : 0;
  rig.ears.forEach((ear, i) => {
    ear.rotation.x = pose.ear * (i ? 0.8 : 1);
  });
  rig.legs.forEach((leg, i) => {
    leg.rotation.x = pose.leg * (i < 2 ? -1 : 1);
  });
  return pose.escaped;
}

// src/app/templates/heist/escape/locks/fraction-cage/fraction-cage.model.ts
var COG_CENTER = new Vector3(-4.75, 3.35, 0.65);
var COG_RADIUS = 2.24;
var SECTOR_COLORS = [
  13477974,
  7575947,
  11109990,
  9149104,
  12159366,
  11052141,
  9602475,
  7056547
];
function sectorGeometry(fraction) {
  const shape = new Shape(), start = Math.PI / 2, end = start - Math.PI * 2 * fraction;
  shape.moveTo(0.4 * Math.cos(start), 0.4 * Math.sin(start));
  shape.lineTo(COG_RADIUS * Math.cos(start), COG_RADIUS * Math.sin(start));
  shape.absarc(0, 0, COG_RADIUS, start, end, true);
  shape.lineTo(0.4 * Math.cos(end), 0.4 * Math.sin(end));
  shape.absarc(0, 0, 0.4, end, start, false);
  shape.closePath();
  return new ExtrudeGeometry(shape, {
    depth: 0.22,
    bevelEnabled: true,
    bevelSize: 0.012,
    bevelThickness: 0.025,
    bevelSegments: 2,
    curveSegments: 48,
    steps: 1
  });
}
function createFractionDiorama(art, d) {
  const root = new Group();
  root.name = "fraction-cage-diorama";
  const surfaces = new DioramaSurfaces(art);
  const stone = surfaces.stone(7507074);
  const tile = surfaces.stone(10528142);
  const edge = surfaces.stone(4348759);
  const wood = surfaces.wood(8937540);
  const leaf = art.material({ color: 5733204, roughness: 0.93 });
  art.box(root, 0, -0.17, 1.8, 18, 0.55, 10.6, edge, 0.12);
  for (let r = 0; r < 6; r++)
    for (let c = 0; c < 12; c++)
      art.box(
        root,
        -8.15 + c * 1.49,
        0.09,
        -2.65 + r * 1.78,
        1.43,
        0.17,
        1.72,
        (r + c) % 7 ? tile : stone,
        0.045
      );
  for (let r = 0; r < 7; r++)
    for (let c = 0; c < 12; c++) {
      if (c > 6 && c < 10 && r > 2) continue;
      art.box(
        root,
        -8.18 + c * 1.51 + r % 2 * 0.11,
        0.5 + r * 0.87,
        -2.66,
        1.46,
        0.82,
        0.5,
        (r + c) % 4 ? stone : edge,
        0.05
      );
    }
  const sky = art.material({ color: 2378060, roughness: 1 });
  art.box(root, 4.5, 4.6, -3, 5, 3.1, 0.15, sky);
  stoneArch(art, root, 4.5, 3.58, 2.25, -2.46, stone);
  const flower = art.material({ color: 15255177, roughness: 0.92 });
  for (const x of [-8, 7.2]) for (let i = 0; i < 5; i++) {
    const px = x + Math.sin(i * 2.4) * 0.25, pz = 3.3 + Math.cos(i * 2.4) * 0.18;
    art.cylinder(root, px, 0.85, pz, 0.015, 0.6, leaf);
    for (let p = 0; p < 5; p++) {
      const petal = art.mesh(new SphereGeometry(0.07, 8, 6), flower, root, px + Math.cos(p * Math.PI * 0.4) * 0.065, 1.16, pz + Math.sin(p * Math.PI * 0.4) * 0.065);
      petal.scale.y = 0.4;
    }
  }
  for (const x of [-8.4, 0.25, 7.9]) {
    art.box(root, x, 3.2, -2.25, 0.5, 6.4, 0.6, edge, 0.07);
    art.box(root, x, 6.1, -2.2, 0.8, 0.24, 0.83, art.trim, 0.04);
  }
  for (let i = 0; i < 24; i++) {
    const mesh = art.mesh(
      new SphereGeometry(0.13, 8, 6),
      leaf,
      root,
      7.35 + Math.sin(i * 2.3) * 0.39,
      0.75 + i * 0.215,
      -2.12
    );
    mesh.scale.set(1, 1.7, 0.4);
    mesh.rotation.z = Math.sin(i) * 0.9;
  }
  for (const x of [-8, 7.2]) {
    art.cylinder(root, x, 0.45, 3.3, 0.42, 0.6, wood);
    for (let i = 0; i < 6; i++) {
      const stem = art.mesh(
        new SphereGeometry(0.12, 8, 6),
        leaf,
        root,
        x + Math.sin(i * 2) * 0.25,
        0.85,
        3.3 + Math.cos(i * 2) * 0.2
      );
      stem.scale.set(1, 3.1, 0.5);
      stem.rotation.z = Math.sin(i) * 0.4;
    }
  }
  art.box(root, -4.75, 3.23, -0.3, 6.9, 5.85, 0.55, art.dark, 0.15);
  art.box(root, -4.75, 6.17, -0.02, 7.14, 0.19, 0.88, art.brass, 0.03);
  art.box(root, -4.75, 0.35, 0.05, 7.2, 0.25, 1.5, art.trim, 0.06);
  const ring = art.torus(root, COG_CENTER.x, COG_CENTER.y, 0.47, 2.58, 0.055, art.brass);
  ring.name = "notch-ring";
  for (let n = 0; n < d.slots; n++) {
    const a = Math.PI / 2 - n * Math.PI * 2 / d.slots;
    const mark = art.box(
      root,
      COG_CENTER.x + Math.cos(a) * 2.57,
      COG_CENTER.y + Math.sin(a) * 2.57,
      0.54,
      0.022,
      n % 3 ? 0.105 : 0.2,
      0.015,
      n % 3 ? art.steel : art.brass,
      3e-3
    );
    mark.rotation.z = a - Math.PI / 2;
    if (n % Math.max(1, Math.round(d.slots / 8)) === 0)
      art.label(
        root,
        String(n),
        COG_CENTER.x + Math.cos(a) * 2.85,
        COG_CENTER.y + Math.sin(a) * 2.85,
        0.55,
        0.32,
        0.23
      );
  }
  const cog = new Group();
  cog.position.copy(COG_CENTER);
  root.add(cog);
  const sectors = [], ghosts = [];
  d.pieces.forEach((p, i) => {
    const sector = new Group(), fraction = p.numerator / p.denominator;
    sector.name = `fraction-sector-${i + 1}`;
    sector.userData["piece"] = i;
    cog.add(sector);
    const m = art.material({ color: SECTOR_COLORS[i], metalness: 0.73, roughness: 0.34 });
    art.mesh(sectorGeometry(fraction), m, sector);
    const count = d.teeth * fraction;
    for (let n = 0; n < count; n++) {
      const a = Math.PI / 2 - (n + 0.5) * Math.PI * 2 / d.teeth;
      const tooth = art.box(
        sector,
        Math.cos(a) * (COG_RADIUS + 0.055),
        Math.sin(a) * (COG_RADIUS + 0.055),
        0.11,
        0.17,
        0.14,
        0.22,
        m,
        0.018
      );
      tooth.rotation.z = a;
    }
    const mid = Math.PI / 2 - Math.PI * fraction;
    for (const r of [0.65, 2]) art.screw(sector, Math.cos(mid) * r, Math.sin(mid) * r, 0.25);
    const value = new Group();
    value.name = "fraction-value";
    value.position.set(Math.cos(mid) * 1.4, Math.sin(mid) * 1.4, 0.29);
    sector.add(value);
    art.label(value, `${p.numerator}/${p.denominator}`, 0, 0, 0, 0.74, 0.35, "#152b2b");
    batchMetalwork(art, sector);
    sectors.push(sector);
    const ghostMaterial = art.material({
      color: 9953727,
      transparent: true,
      opacity: 0.43,
      depthWrite: false,
      metalness: 0.1,
      roughness: 0.6
    });
    const ghost = art.mesh(
      sectorGeometry(fraction),
      ghostMaterial,
      root,
      COG_CENTER.x,
      COG_CENTER.y,
      COG_CENTER.z + 0.38
    );
    ghost.name = `sector-preview-${i + 1}`;
    ghost.castShadow = false;
    ghost.visible = false;
    ghosts.push(ghost);
  });
  const cap = art.cylinder(root, COG_CENTER.x, COG_CENTER.y, 1.01, 0.36, 0.48, art.steel);
  cap.rotation.x = Math.PI / 2;
  art.torus(root, COG_CENTER.x, COG_CENTER.y, 1.29, 0.23, 0.035, art.brass);
  art.screw(root, COG_CENTER.x, COG_CENTER.y, 1.31);
  const drive = new Group();
  drive.position.set(-1.68, 3.35, 0.65);
  root.add(drive);
  const disc2 = art.cylinder(drive, 0, 0, 0.1, 0.68, 0.22, art.brass);
  disc2.rotation.x = Math.PI / 2;
  for (let n = 0; n < 16; n++) {
    const a = n * Math.PI / 8;
    const tooth = art.box(
      drive,
      Math.cos(a) * 0.73,
      Math.sin(a) * 0.73,
      0.1,
      0.16,
      0.16,
      0.22,
      art.brass,
      0.015
    );
    tooth.rotation.z = a;
  }
  art.torus(drive, 0, 0, 0.24, 0.42, 0.035, art.dark);
  for (let n = 0; n < 4; n++)
    art.screw(drive, Math.cos(n * Math.PI / 2) * 0.4, Math.sin(n * Math.PI / 2) * 0.4, 0.29);
  const winch = new Group();
  winch.position.set(-1.68, 3.35, 1.18);
  root.add(winch);
  const drum = art.cylinder(winch, 0, 0, 0.1, 0.35, 0.5, wood);
  drum.rotation.x = Math.PI / 2;
  for (const z of [-0.17, 0.37]) art.torus(winch, 0, 0, z, 0.39, 0.045, art.steel);
  for (let n = 0; n < 7; n++) art.torus(winch, 0, 0, -0.12 + n * 0.07, 0.355, 0.021, art.rope);
  art.box(winch, 0, 0, 0.4, 0.75, 0.08, 0.1, art.brass);
  const pawl = new Group();
  pawl.position.set(-0.95, 3.93, 0.85);
  root.add(pawl);
  art.box(pawl, -0.1, -0.12, 0, 0.14, 0.43, 0.14, art.steel);
  art.screw(pawl, 0, 0, 0.1);
  art.rod(root, new Vector3(-2.04, 3.35, 1.25), new Vector3(-2.04, 6.35, 1.25), 0.028);
  art.torus(root, -1.83, 6.35, 1.25, 0.21, 0.045, art.brass);
  art.rod(root, new Vector3(-1.83, 6.56, 1.25), new Vector3(4.35, 6.56, 1.25), 0.028);
  art.torus(root, 4.35, 6.35, 1.25, 0.21, 0.045, art.brass);
  const left = 2.25, right = 6.75, front = 1.52, back = -2.1;
  for (const x of [left, right]) {
    art.box(root, x, 3.2, front, 0.22, 6.05, 0.24, art.dark, 0.04);
    art.box(root, x, 1.66, back, 0.18, 2.98, 0.18, art.dark, 0.04);
    art.box(root, x, 3.22, -0.29, 0.16, 0.14, 3.75, art.steel, 0.02);
    for (let i = 0; i < 7; i++)
      art.rod(
        root,
        new Vector3(x, 0.22, back + i * 0.56),
        new Vector3(x, 3.2, back + i * 0.56),
        0.035,
        art.steel
      );
  }
  for (const y of [0.24, 3.22]) art.box(root, 4.5, y, back, 4.55, 0.15, 0.16, art.steel, 0.02);
  for (let i = 1; i < 9; i++)
    art.rod(
      root,
      new Vector3(left + i * 0.5, 0.24, back),
      new Vector3(left + i * 0.5, 3.2, back),
      0.035,
      art.steel
    );
  art.box(root, 4.5, 6.22, front, 4.78, 0.2, 0.45, art.brass, 0.03);
  const door = new Group();
  door.position.set(4.5, 0.26, front);
  door.name = "lifting-cage-grille";
  root.add(door);
  for (const y of [0, 2.8]) art.box(door, 0, y, 0, 4.25, 0.16, 0.16, art.brass, 0.025);
  for (let i = 0; i < 10; i++)
    art.rod(
      door,
      new Vector3(-2.11 + i * 0.47, 0, 0),
      new Vector3(-2.11 + i * 0.47, 2.8, 0),
      0.043,
      art.steel
    );
  art.torus(door, 0.06, 2.97, -0.27, 0.14, 0.04, art.brass);
  const rope = art.rod(
    root,
    new Vector3(4.56, 6.35, 1.25),
    new Vector3(4.56, 3.23, 1.25),
    0.03
  );
  const palette = [15261646, 11315353, 13614241];
  const fur = palette.map((color) => art.material({ color, roughness: 0.99 }));
  const rabbits = Array.from(
    { length: d.presentation?.rabbits ?? 6 },
    (_, i) => createRabbit(art, fur[i % 3], i)
  );
  rabbits.forEach((r) => root.add(r.root));
  for (const group of [drive, winch, pawl, door]) batchMetalwork(art, group);
  batchMetalwork(art, root, /* @__PURE__ */ new Set([rope, ...ghosts]));
  return { root, cog, sectors, ghosts, drive, winch, door, rope, pawl, rabbits };
}
function positionFractionDiorama(art, stage, d, offsets, release, age, reduced) {
  const pose = fractionCagePose(release);
  stage.cog.rotation.z = -pose.turn;
  stage.sectors.forEach((sector, i) => {
    sector.visible = offsets[i] >= 0;
    sector.rotation.z = -Math.max(0, offsets[i]) * Math.PI * 2 / d.slots;
    const label = sector.getObjectByName("fraction-value");
    if (label) label.rotation.z = -sector.rotation.z - stage.cog.rotation.z;
  });
  stage.drive.rotation.z = pose.turn * d.teeth / 16 + Math.PI / 16;
  stage.winch.rotation.z = stage.drive.rotation.z;
  stage.pawl.rotation.z = pose.clutch * -0.65;
  stage.door.position.y = 0.26 + pose.lift * 2.8;
  art.positionRod(
    stage.rope,
    new Vector3(4.56, 6.35, 1.25),
    new Vector3(4.56, stage.door.position.y + 2.97, 1.25)
  );
  return stage.rabbits.reduce(
    (count, rabbit, i) => count + Number(poseRabbit(rabbit, i, release, age, reduced)),
    0
  );
}

// src/app/templates/heist/escape/locks/fraction-cage/fraction-cage.layout.ts
function fractionCageLayout(d) {
  const tray = d.pieces.map((p, i) => {
    const a = Math.PI * 2 * p.numerator / p.denominator;
    const x = 30 + Math.sin(a) * 24, y = 29 - Math.cos(a) * 24;
    return `<button type="button" data-piece="${i}" aria-pressed="false" aria-label="Sector ${i + 1}: ${p.numerator}/${p.denominator}">
      <svg viewBox="0 0 60 58" aria-hidden="true"><circle cx="30" cy="29" r="25" fill="none" stroke="#78908b" stroke-dasharray="2 3"/>
      <path d="M30 29L30 5A24 24 0 ${a > Math.PI ? 1 : 0} 1 ${x} ${y}Z" fill="#${SECTOR_COLORS[i].toString(16)}" stroke="#eee1b6" stroke-width="1"/>
      <circle cx="30" cy="29" r="3" fill="#172c2e"/></svg>
      <b>${p.numerator}/${p.denominator}</b><small data-piece-state="${i}">IN TRAY</small></button>`;
  }).join("");
  return `<style>
[data-fraction-cage]{position:relative;isolation:isolate;width:100%;height:100%;overflow:hidden;background:#112d30;color:#eee8d3;font:13px/1.35 'Trebuchet MS',sans-serif;box-sizing:border-box}
[data-fraction-cage] *{box-sizing:border-box}
[data-fraction-cage] [hidden]{display:none!important}
[data-fraction-cage] button,[data-fraction-cage] select{font:inherit;min-height:42px;color:#eee8d3;background:#203c3e;border:1px solid #68847b;border-radius:6px;cursor:pointer;padding:7px 11px}
[data-fraction-cage] button:hover{background:#365750;border-color:#edcd90}
[data-fraction-cage] button:disabled{opacity:.4;cursor:default}
[data-fraction-cage] :focus-visible{outline:3px solid #ffe49e;outline-offset:2px}
[data-fraction-cage] button[aria-pressed=true]{background:#405c4e;border-color:#f8dd9c}
[data-fraction-cage] .fc-viewport{position:absolute;inset:0 0 230px;overflow:hidden}
[data-fraction-cage] canvas{display:block;width:100%;height:100%;touch-action:none}
[data-fraction-cage] .fc-top{position:absolute;inset:12px 12px auto;display:flex;justify-content:space-between;align-items:start;gap:6px;pointer-events:none}
[data-fraction-cage] .fc-top>*{pointer-events:auto}
[data-fraction-cage] .fc-title{margin:0;color:#f3d38e;letter-spacing:.15em;font-size:11px;text-shadow:0 2px 5px #000}
[data-fraction-cage] .fc-title span{display:block;color:#d1ddd0;letter-spacing:0;font-size:12px;margin-top:3px}
[data-fraction-cage] .fc-top button{font-size:11px;padding:5px 8px}
[data-fraction-cage] .fc-focus{position:absolute;bottom:241px;left:12px;display:flex;gap:5px}
[data-fraction-cage] .fc-focus button{font-size:11px;background:#163235ed}
[data-fraction-cage] .fc-label{position:absolute;pointer-events:none;white-space:nowrap;padding:5px 9px;background:#162d31ed;border:1px solid #819183;border-radius:4px;font-size:11px;color:#f2dba3;transform:translate(-50%,-50%)}
[data-fraction-cage] .fc-bottom{position:absolute;inset:auto 0 0;height:230px;padding:10px 12px;background:linear-gradient(115deg,#142e31,#29443d);border-top:1px solid #798369;display:flex;flex-direction:column;gap:8px}
[data-fraction-cage] .fc-tray{display:flex;gap:7px;justify-content:center;min-height:80px}
[data-fraction-cage] .fc-tray button{position:relative;flex:1;max-width:130px;min-width:0;padding:3px 4px 4px;touch-action:none;display:grid;grid-template-columns:minmax(30px,1fr) auto;align-items:center;gap:0 2px}
[data-fraction-cage] .fc-tray svg{width:100%;height:49px;grid-row:1/3}
[data-fraction-cage] .fc-tray b{font:21px Georgia,serif;padding-right:4px}
[data-fraction-cage] .fc-tray small{font-size:8px;color:#bfcec1;letter-spacing:.05em;padding-right:4px}
[data-fraction-cage] .fc-assembly{display:flex;gap:10px;align-items:center;justify-content:space-between;flex-wrap:wrap}
[data-fraction-cage] .fc-total{font:19px Georgia,serif;color:#f1d8a4}
[data-fraction-cage] .fc-state{font-size:11px;color:#c8d9cd;margin-left:7px;white-space:nowrap}
[data-fraction-cage] .fc-buttons{display:flex;align-items:center;gap:5px;flex-wrap:wrap}
[data-fraction-cage] .fc-buttons label{display:flex;align-items:center;gap:4px;font-size:11px}
[data-fraction-cage] .fc-buttons button{font-size:12px;padding:6px 9px}
[data-fraction-cage] [data-action=seat]{background:#dfc18a;color:#203128;border-color:#f6dba3;font-weight:bold}
[data-fraction-cage] .fc-feedback{font-size:12px;min-height:17px;color:#d3dfd1}
[data-fraction-cage] .fc-feedback[data-blocked=true]{color:#ffc1a8}
[data-fraction-cage] .fc-settings{position:absolute;right:12px;top:65px;width:min(320px,calc(100% - 24px));max-height:calc(100% - 300px);overflow:auto;z-index:6;padding:15px;border:1px solid #7e9385;background:#173435;border-radius:8px;box-shadow:0 15px 30px #0007}
[data-fraction-cage] .fc-settings p{font-size:13px;margin:5px 0 12px}
[data-fraction-cage] .fc-settings label{display:flex;align-items:center;gap:8px;margin:10px 0}
[data-fraction-cage] .fc-settings input{width:20px;height:20px;accent-color:#e3c58f}
[data-fraction-cage] .fc-settings small{color:#bfd2c6}
[data-fraction-cage].fc-expanded{position:fixed;inset:12px;z-index:2000;width:auto;height:auto;border:1px solid #a69b7c;border-radius:12px;box-shadow:0 0 0 30px #071c22ed}
@media(max-width:680px){
 [data-fraction-cage] .fc-viewport{bottom:260px}
 [data-fraction-cage] .fc-bottom{height:260px;padding:8px;gap:7px}
 [data-fraction-cage] .fc-focus{bottom:270px}
 [data-fraction-cage] .fc-tray{gap:4px;min-height:82px}
 [data-fraction-cage] .fc-tray button{display:flex;flex-direction:column;padding:2px;gap:0}
 [data-fraction-cage] .fc-tray svg{height:36px}
 [data-fraction-cage] .fc-tray b{font-size:18px;padding:0}
 [data-fraction-cage] .fc-tray small{font-size:7px;padding:0}
 [data-fraction-cage] .fc-assembly{gap:4px}
 [data-fraction-cage] .fc-buttons{gap:4px;justify-content:center}
 [data-fraction-cage] .fc-buttons button{padding:5px 8px;min-height:42px}
 [data-fraction-cage] .fc-total{font-size:17px}
 [data-fraction-cage] .fc-title{font-size:9px;letter-spacing:.08em}
 [data-fraction-cage] .fc-title span{font-size:10px;max-width:155px}
 [data-fraction-cage].fc-expanded{inset:5px}
}

[data-fraction-cage] .fc-feedback{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}
[data-fraction-cage] .fc-viewport{bottom:210px}
[data-fraction-cage] .fc-bottom{height:210px;min-height:210px}
[data-fraction-cage] output{display:inline-block;min-width:28px;text-align:center;font-variant-numeric:tabular-nums}
@media(max-width:680px){[data-fraction-cage] .fc-viewport{bottom:238px}[data-fraction-cage] .fc-bottom{height:238px;min-height:238px}}
</style>
<div class="fc-viewport"></div>
<div class="fc-top"><p class="fc-title">RABBIT COURTYARD</p><div><button type="button" data-action="expand" aria-label="Expand rabbit workshop">Expand</button> <button type="button" data-action="reset" aria-label="Reset mechanism">\u21BA</button></div></div>
<div class="fc-bottom">
 <div class="fc-tray" aria-label="Fraction sector tray" role="group">${tray}</div>
 <div class="fc-assembly"><span><span class="fc-total" data-total>0 = 0</span><span class="fc-state" data-state></span></span><button type="button" data-action="pause">Pause</button></div>
 <div class="fc-buttons"><button type="button" data-action="left" aria-label="Rotate sector counterclockwise">\u21B6</button><label>Start <output data-notch aria-label="Sector start notch"></output></label><button type="button" data-action="right" aria-label="Rotate sector clockwise">\u21B7</button><button type="button" data-action="seat">Place</button><button type="button" data-action="lift">Lift</button><button type="button" data-action="replay" hidden>Replay escape</button></div>
 <div class="fc-feedback" aria-live="polite">Select a fraction sector, then place it on the cog.</div>
</div>
`;
}

// src/app/templates/heist/escape/locks/fraction-cage/fraction-cage.scene.ts
function mountFractionCage(parent, d, snapshot, cb) {
  const root = document.createElement("div");
  root.setAttribute("data-fraction-cage", "");
  root.innerHTML = fractionCageLayout(d);
  parent.append(root);
  const q = (selector) => root.querySelector(selector);
  const action = (name) => q(`[data-action=${name}]`);
  const viewport = q(".fc-viewport");
  const art = new BalanceMetalwork(), sound = new TimingCageSound();
  let renderer;
  try {
    renderer = new WebGLRenderer({ antialias: true, powerPreference: "low-power" });
  } catch (error) {
    root.remove();
    art.dispose();
    sound.destroy();
    throw error;
  }
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 1.35));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = PCFSoftShadowMap;
  renderer.outputColorSpace = SRGBColorSpace;
  renderer.toneMapping = ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.04;
  renderer.setClearColor(1980731);
  const canvas = renderer.domElement;
  canvas.setAttribute("role", "img");
  viewport.append(canvas);
  const scene = new Scene(), camera = new OrthographicCamera(-9, 9, 5, -5, 0.1, 80);
  const room = new RoomEnvironment(), pmrem = new PMREMGenerator(renderer), environment = pmrem.fromScene(room, 0.025);
  scene.environment = environment.texture;
  scene.environmentIntensity = 0.65;
  room.dispose();
  pmrem.dispose();
  scene.add(new HemisphereLight(15070188, 3689532, 1.35));
  const sun = new DirectionalLight(16768932, 3.1);
  sun.position.set(-5, 11, 9);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  Object.assign(sun.shadow.camera, {
    left: -10,
    right: 10,
    top: 9,
    bottom: -7,
    near: 0.1,
    far: 40
  });
  sun.shadow.bias = -3e-4;
  sun.shadow.normalBias = 0.025;
  scene.add(sun);
  const fill = new DirectionalLight(10473422, 1.5);
  fill.position.set(7, 6, -2);
  scene.add(fill);
  const stage = createFractionDiorama(art, d);
  scene.add(stage.root);
  const sequence = new FractionCageSequence(d, snapshot());
  const ray = new Raycaster(), plane = new Plane(new Vector3(0, 0, 1), -COG_CENTER.z);
  const labels = ["COMPLETE THE COG", "LIFTING WINCH", `${stage.rabbits.length} RABBITS`].map(
    (text) => {
      const label2 = document.createElement("div");
      label2.className = "fc-label";
      label2.textContent = text;
      viewport.append(label2);
      return label2;
    }
  );
  let gone = false, frame = 0, last = performance.now(), age = 0, changedAt = -1;
  let selected = null, candidate = 0, lastAnswer = "", message = "", messageUntil = 0;
  let expanded = false, oldOverflow = "", oldFocus = null;
  let focus = viewport.clientWidth < 620 ? "cog" : "all";
  let center = new Vector3(0, 3.1, 1), worldWidth = 19, previousRelease = 0;
  let drag;
  const view = () => __spreadProps(__spreadValues({}, snapshot()), {
    reducedMotion: snapshot().reducedMotion
  });
  const offsets = () => {
    const a = view().answer;
    return a.kind === "fraction-gear" ? a.offsets : d.pieces.map(() => -1);
  };
  const operable = () => !gone && !view().paused && !view().testing && !view().completed;
  const notify = (text) => {
    message = text;
    messageUntil = age + 3;
  };
  const putText = (element, text) => {
    if (element.textContent !== text) element.textContent = text;
  };
  function select(index) {
    if (!operable()) return;
    selected = index;
    cb.select(index);
    candidate = Math.max(0, offsets()[index]);
    if (viewport.clientWidth < 620) setFocus("cog");
  }
  function seat() {
    if (!operable() || selected === null) return;
    if (!sectorFits(d, offsets(), selected, candidate)) {
      notify("That sector overlaps. Rotate it to a clear space.");
      sound.play("latch");
      return;
    }
    cb.input({ type: "piece", index: selected, offset: candidate });
    sound.play("tick");
    notify("Seated. Choose another sector or adjust this one.");
  }
  function setFocus(next) {
    focus = next;
    root.querySelectorAll("[data-focus]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset["focus"] === focus)));
  }
  function cameraPose(blend) {
    const aspect = Math.max(0.3, viewport.clientWidth / Math.max(1, viewport.clientHeight));
    const target = focus === "cog" ? new Vector3(-4.4, 3.4, 0.5) : focus === "cage" ? new Vector3(4.4, 2.9, 2.1) : new Vector3(0, 3.1, 1.1);
    const width = focus === "all" ? 19 : focus === "cog" ? 8.1 : 8.5;
    center.lerp(target, blend);
    worldWidth += (width - worldWidth) * blend;
    const height = Math.max(focus === "all" ? 9.3 : 8, worldWidth / aspect);
    camera.left = -height * aspect / 2;
    camera.right = height * aspect / 2;
    camera.top = height / 2;
    camera.bottom = -height / 2;
    camera.position.copy(center).add(new Vector3(0.35, 6, 23));
    camera.lookAt(center);
    camera.updateProjectionMatrix();
    camera.updateMatrixWorld();
  }
  function resize() {
    if (gone || !viewport.clientWidth || !viewport.clientHeight) return;
    renderer.setSize(viewport.clientWidth, viewport.clientHeight, false);
    cameraPose(1);
  }
  function expand(value) {
    expanded = value;
    if (value) {
      oldOverflow = document.body.style.overflow;
      oldFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      document.body.style.overflow = "hidden";
      root.setAttribute("role", "dialog");
      root.setAttribute("aria-modal", "true");
      root.setAttribute("aria-label", "Expanded rabbit workshop");
    } else {
      document.body.style.overflow = oldOverflow;
      root.removeAttribute("role");
      root.removeAttribute("aria-modal");
      root.removeAttribute("aria-label");
    }
    root.classList.toggle("fc-expanded", value);
    action("expand").textContent = value ? "Close" : "Expand";
    action("expand").setAttribute(
      "aria-label",
      value ? "Close expanded rabbit workshop" : "Expand rabbit workshop"
    );
    resize();
    if (value) action("expand").focus();
    else oldFocus?.focus({ preventScroll: true });
  }
  function onClick(event) {
    const b = event.target.closest("button");
    if (!b || !root.contains(b)) return;
    sound.unlock();
    const name = b.dataset["action"], next = b.dataset["focus"];
    if (b.dataset["piece"] !== void 0) select(Number(b.dataset["piece"]));
    if (name === "expand") expand(!expanded);
    if (next === "all" || next === "cog" || next === "cage") setFocus(next);
    if (name === "pause") cb.pause?.();
    if (name === "replay" && !view().paused && !view().testing) cb.replay?.();
    if (!operable()) return;
    if (name === "left" || name === "right")
      candidate = (candidate + (name === "right" ? 1 : -1) + d.slots) % d.slots;
    if (name === "seat") seat();
    if (name === "lift" && selected !== null) {
      cb.input({ type: "piece", index: selected, offset: -1 });
      sound.play("tick");
      notify("Lifted back into the tray.");
    }
    if (name === "reset") {
      cb.input({ type: "reset" });
      selected = null;
      notify("Empty cog. Try a new combination.");
    }
  }
  function onKey(e) {
    if (e.key === "Escape") {
      if (drag) {
        if (root.hasPointerCapture(drag.id)) root.releasePointerCapture(drag.id);
        drag = void 0;
        return;
      }
      if (expanded) expand(false);
    }
    if (expanded && e.key === "Tab") {
      const list = Array.from(
        root.querySelectorAll("button:not(:disabled),select:not(:disabled),input")
      ).filter((el) => el.getClientRects().length);
      const first = list[0], end = list[list.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        end?.focus();
      } else if (!e.shiftKey && document.activeElement === end) {
        e.preventDefault();
        first?.focus();
      }
    }
  }
  function point(e) {
    const rect = canvas.getBoundingClientRect();
    if (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom)
      return;
    ray.setFromCamera(
      new Vector2(
        (e.clientX - rect.left) / rect.width * 2 - 1,
        1 - (e.clientY - rect.top) / rect.height * 2
      ),
      camera
    );
    const result = ray.ray.intersectPlane(plane, new Vector3());
    return result ?? void 0;
  }
  function notch(p) {
    const angle = Math.PI / 2 - Math.atan2(p.y - COG_CENTER.y, p.x - COG_CENTER.x);
    return (Math.round(angle * d.slots / (Math.PI * 2)) + d.slots) % d.slots;
  }
  function onDown(e) {
    if (!operable() || e.button !== 0) return;
    const b = e.target.closest("[data-piece]");
    let index = b ? Number(b.dataset["piece"]) : null;
    if (!b && e.target === canvas) {
      const p = point(e);
      if (!p || p.distanceTo(COG_CENTER) > COG_RADIUS + 0.2) return;
      const n = notch(p);
      index = offsets().findIndex(
        (start, i) => start >= 0 && (n - start + d.slots) % d.slots < sectorSize(d, i)
      );
      if (index < 0) {
        if (selected !== null) {
          candidate = n;
          seat();
        }
        return;
      }
    }
    if (index === null) return;
    e.preventDefault();
    sound.unlock();
    select(index);
    root.setPointerCapture(e.pointerId);
    drag = {
      id: e.pointerId,
      index,
      startX: e.clientX,
      startY: e.clientY,
      moved: false,
      over: false
    };
  }
  function onMove(e) {
    if (!drag || drag.id !== e.pointerId || !operable()) return;
    if (Math.hypot(e.clientX - drag.startX, e.clientY - drag.startY) > 7) drag.moved = true;
    const p = point(e);
    drag.over = !!p && p.distanceTo(COG_CENTER) < COG_RADIUS + 0.5;
    if (p && drag.over) candidate = notch(p);
  }
  function onUp(e) {
    if (!drag || drag.id !== e.pointerId) return;
    const drop = drag.moved && drag.over && e.type !== "pointercancel";
    drag = void 0;
    if (root.hasPointerCapture(e.pointerId)) root.releasePointerCapture(e.pointerId);
    if (drop) seat();
  }
  function label(el, p) {
    p.project(camera);
    const w = viewport.clientWidth, h = viewport.clientHeight, x = (p.x + 1) * w / 2, y = (1 - p.y) * h / 2;
    el.hidden = x < 20 || x > w - 20 || y < 65 || y > h - 56;
    el.style.left = `${Math.max(70, Math.min(w - 70, x))}px`;
    el.style.top = `${y}px`;
  }
  function render(now) {
    if (gone) return;
    frame = requestAnimationFrame(render);
    const v = view(), dt = v.paused || document.hidden ? 0 : Math.min(0.25, (now - last) / 1e3);
    last = now;
    if (v.paused || document.hidden || !sound.enabled) sound.suspend();
    else sound.resume();
    if (document.hidden) return;
    age += dt;
    const a = offsets(), key = JSON.stringify(a), reading = machineReading(d, v.answer);
    if (key !== lastAnswer) {
      lastAnswer = key;
      changedAt = age;
    }
    const settled = age - changedAt > 0.3 || v.reducedMotion;
    const result = sequence.update(v, dt, settled);
    if (result.engage) cb.engage?.();
    if (result.finished) cb.finished();
    const release = reading.solved ? sequence.time : 0;
    const escaped = positionFractionDiorama(
      art,
      stage,
      d,
      a,
      release,
      v.reducedMotion ? 0 : age,
      v.reducedMotion
    );
    if (release > 0.9 && previousRelease <= 0.9 && focus === "cog")
      setFocus(viewport.clientWidth < 620 ? "cage" : "all");
    if (release === 0 && previousRelease > 0 && viewport.clientWidth < 620) setFocus("cog");
    if (dt > 0 && !v.reducedMotion) {
      for (const [time, cue] of [
        [0.12, "latch"],
        [0.7, "door"],
        [10.8, "free"]
      ])
        if (release >= time && previousRelease < time) sound.play(cue);
    }
    previousRelease = release;
    cameraPose(v.reducedMotion ? 1 : dt === 0 ? 0 : 1 - Math.exp(-dt * 5));
    const can = operable(), fits = selected !== null && sectorFits(d, a, selected, candidate);
    stage.ghosts.forEach((ghost, i) => {
      ghost.visible = selected === i && can && !reading.solved && (a[i] !== candidate || !!drag?.moved);
      ghost.rotation.z = -candidate * Math.PI * 2 / d.slots;
      ghost.material.color.setHex(fits ? 10153922 : 16746353);
    });
    root.querySelectorAll("[data-piece]").forEach((b, i) => {
      b.disabled = !can;
      b.setAttribute("aria-pressed", String(selected === i));
      putText(q(`[data-piece-state="${i}"]`), a[i] >= 0 ? "ON COG" : "IN TRAY");
    });
    for (const name of ["left", "right", "seat"])
      action(name).disabled = !can || selected === null || reading.solved;
    action("lift").disabled = !can || selected === null || a[selected] < 0;
    q("[data-notch]").value = String(candidate);
    action("reset").disabled = !can;
    action("replay").hidden = !reading.solved;
    action("replay").disabled = v.paused || v.testing;
    putText(action("pause"), v.paused ? "Resume" : "Pause");
    action("pause").setAttribute("aria-pressed", String(v.paused));
    const total = a.reduce((n, offset, i) => n + (offset >= 0 ? sectorSize(d, i) : 0), 0);
    putText(q("[data-total]"), `${total}/${d.slots} of a whole`);
    putText(
      q("[data-state]"),
      release > 0 ? `${escaped}/${stage.rabbits.length} safely out` : `${d.slots}-notch cog`
    );
    let feedback = selected === null ? "Select a fraction sector, then place it on the cog." : `${d.pieces[selected].numerator}/${d.pieces[selected].denominator} \xB7 start notch ${candidate}. ${fits ? "Clear fit. Seat it here." : "Overlap \u2014 rotate to a clear space."}`;
    if (age < messageUntil) feedback = message;
    if (reading.solved)
      feedback = release >= RABBIT_ESCAPE_DURATION ? "All rabbits are safely through. Replay or try another whole." : release < 0.65 ? "One whole. The drive engages." : release < 2.7 ? "The winch is lifting the grille." : "A clear doorway. Here come the rabbits!";
    if (v.paused) feedback = "Paused. Resume to continue.";
    putText(q(".fc-feedback"), feedback);
    q(".fc-feedback").dataset["blocked"] = String(selected !== null && !fits && !reading.solved);
    label(labels[0], new Vector3(-4.75, 6.08, 1.1));
    label(labels[1], new Vector3(-1.55, 2.3, 1.8));
    label(labels[2], new Vector3(4.5, 6.45, 1.6));
    canvas.setAttribute(
      "aria-label",
      `Fraction cog: ${reading.equation}. ${escaped} of ${stage.rabbits.length} rabbits outside. ${release >= 2.7 ? "Cage grille raised." : "Cage closed."}`
    );
    root.dataset["release"] = String(Math.round(release * 100) / 100);
    root.dataset["escaped"] = String(escaped);
    root.dataset["offsets"] = a.join(",");
    renderer.render(scene, camera);
    root.dataset["drawCalls"] = String(renderer.info.render.calls);
  }
  root.addEventListener("click", onClick);
  root.addEventListener("keydown", onKey);
  root.addEventListener("pointerdown", onDown);
  root.addEventListener("pointermove", onMove);
  root.addEventListener("pointerup", onUp);
  root.addEventListener("pointercancel", onUp);
  canvas.addEventListener("webglcontextlost", onLost);
  function onLost(event) {
    event.preventDefault();
    dispose();
    cb.failed();
  }
  const observer = new ResizeObserver(resize);
  observer.observe(viewport);
  setFocus(focus);
  resize();
  cb.ready();
  frame = requestAnimationFrame(render);
  function dispose() {
    if (gone) return;
    if (expanded) expand(false);
    gone = true;
    cancelAnimationFrame(frame);
    observer.disconnect();
    root.removeEventListener("click", onClick);
    root.removeEventListener("keydown", onKey);
    root.removeEventListener("pointerdown", onDown);
    root.removeEventListener("pointermove", onMove);
    root.removeEventListener("pointerup", onUp);
    root.removeEventListener("pointercancel", onUp);
    canvas.removeEventListener("webglcontextlost", onLost);
    sound.destroy();
    environment.dispose();
    sun.shadow.dispose();
    art.dispose();
    renderer.dispose();
    root.remove();
  }
  return { destroy: dispose };
}

// src/app/templates/heist/escape/locks/optics-cage/optics-cage.layout.ts
function opticsCageLayout(d) {
  return `<style>
[data-optics-cage]{position:relative;isolation:isolate;box-sizing:border-box;width:100%;height:100%;overflow:hidden;background:#122238;color:#e3eaf1;font:13px/1.35 'Trebuchet MS',sans-serif}
[data-optics-cage] *{box-sizing:border-box}
[data-optics-cage] [hidden]{display:none!important}
[data-optics-cage] button,[data-optics-cage] select{font:inherit;min-height:42px;padding:6px 11px;color:#e7edf5;background:#233b52;border:1px solid #738b9b;border-radius:6px;cursor:pointer}
[data-optics-cage] button:hover{background:#36536a;border-color:#e6cd91}
[data-optics-cage] button:disabled{opacity:.4;cursor:default}
[data-optics-cage] :focus-visible{outline:3px solid #ffe1a4;outline-offset:2px}
[data-optics-cage] button[aria-pressed=true]{background:#365771;border-color:#93e3f3}
[data-optics-cage] [data-viewport]{position:absolute;inset:0 0 174px;overflow:hidden}
[data-optics-cage] canvas{width:100%;height:100%;display:block;touch-action:none;cursor:grab}
[data-optics-cage] canvas:active{cursor:grabbing}
[data-optics-cage] .oc-top{position:absolute;inset:12px 12px auto;display:flex;justify-content:space-between;align-items:start;gap:8px;pointer-events:none}
[data-optics-cage] .oc-top>*{pointer-events:auto}
[data-optics-cage] .oc-title{font-size:11px;letter-spacing:.15em;color:#c1e9ff;margin:0;text-shadow:0 2px 6px #07121e}
[data-optics-cage] .oc-title span{display:block;font-size:12px;letter-spacing:0;color:#d6e0e8;margin-top:4px}
[data-optics-cage] .oc-top button{font-size:11px;padding:5px 8px}
[data-optics-cage] .oc-focus{position:absolute;left:12px;bottom:185px;display:flex;gap:5px}
[data-optics-cage] .oc-focus button{font-size:11px;background:#192f45ef}
[data-optics-cage] .oc-bottom{position:absolute;inset:auto 0 0;height:174px;padding:11px 14px;border-top:1px solid #748694;background:linear-gradient(115deg,#12293e,#29465b);display:flex;flex-direction:column;gap:9px}
[data-optics-cage] .oc-mirrors{display:flex;gap:8px;align-items:stretch}
[data-optics-cage] .oc-mirrors button{flex:1;text-align:left;display:flex;align-items:center;gap:10px;min-height:51px}
[data-optics-cage] .oc-mirrors b{font:23px Georgia,serif;color:#f1d69f}
[data-optics-cage] .oc-mirrors span{display:block;font-size:10px;letter-spacing:.08em;color:#d0e0ec}
[data-optics-cage] .oc-mirrors strong{display:block;font-size:15px;letter-spacing:0;color:#f2f6fa}
[data-optics-cage] .oc-mirrors svg{width:30px;height:30px;flex-shrink:0}
[data-optics-cage] .oc-controls{display:flex;align-items:center;gap:7px;justify-content:space-between}
[data-optics-cage] .oc-controls label{display:flex;align-items:center;gap:6px;font-size:11px}
[data-optics-cage] .oc-turn{display:flex;align-items:center;gap:5px}
[data-optics-cage] .oc-turn button{font-size:21px;min-width:42px;padding:4px}
[data-optics-cage] .oc-controls button{white-space:nowrap}
[data-optics-cage] .oc-feedback{font-size:12px;color:#d0e4ef;min-height:18px}
[data-optics-cage] .oc-feedback[data-blocked=true]{color:#f2c4a5}
[data-optics-cage] [data-options]{position:absolute;right:12px;top:65px;width:min(325px,calc(100% - 24px));max-height:calc(100% - 255px);overflow:auto;background:#19344b;border:1px solid #7e9aaa;border-radius:8px;box-shadow:0 14px 30px #0008;padding:15px;z-index:7}
[data-optics-cage] [data-options] p{margin:8px 0 15px;color:#cedeea}
[data-optics-cage] [data-options] label{display:flex;gap:8px;align-items:center;margin:12px 0}
[data-optics-cage] [data-options] input{width:20px;height:20px;accent-color:#98daef}
[data-optics-cage].diorama-expanded{position:fixed;inset:12px;z-index:2000;width:auto;height:auto;border:1px solid #8b9eaf;border-radius:12px;box-shadow:0 0 0 30px #07121eed}
@media(max-width:680px){
 [data-optics-cage] [data-viewport]{bottom:222px}
 [data-optics-cage] .oc-bottom{height:222px;padding:10px;gap:9px}
 [data-optics-cage] .oc-focus{bottom:233px}
 [data-optics-cage] .oc-mirrors{gap:5px}
 [data-optics-cage] .oc-mirrors button{padding:7px;gap:6px}
 [data-optics-cage] .oc-mirrors svg{display:none}
 [data-optics-cage] .oc-controls{justify-content:center;flex-wrap:wrap;gap:7px}
 [data-optics-cage] .oc-turn{flex-basis:100%;justify-content:center}
 [data-optics-cage] .oc-title{font-size:9px;letter-spacing:.08em}
 [data-optics-cage] .oc-title span{font-size:10px;max-width:156px}
 [data-optics-cage] .oc-feedback{font-size:11px}
 [data-optics-cage].diorama-expanded{inset:5px}
}

[data-optics-cage] .oc-feedback{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}
[data-optics-cage] [data-viewport]{bottom:132px}
[data-optics-cage] .oc-bottom{height:132px;min-height:132px}
[data-optics-cage] output{display:inline-block;min-width:28px;text-align:center;font-variant-numeric:tabular-nums}
@media(max-width:680px){[data-optics-cage] [data-viewport]{bottom:180px}[data-optics-cage] .oc-bottom{height:180px;min-height:180px}}
</style>
<div data-viewport></div>
<div class="oc-top"><p class="oc-title">MOON-TOWER OWL RESCUE</p><div><button type="button" data-action="expand" aria-label="Expand owl workshop">Expand</button> <button type="button" data-action="reset" aria-label="Reset mechanism">\u21BA</button></div></div>
<div class="oc-bottom">
 <div class="oc-mirrors" role="group" aria-label="Select a mirror">${d.mirrors.map((_, i) => `<button type="button" data-mirror="${i}" aria-label="Select mirror ${i + 1}" aria-pressed="${i === 0}"><svg viewBox="0 0 40 40" aria-hidden="true"><circle cx="20" cy="20" r="18" fill="#152c42" stroke="#d5b87e"/><path d="M8 32L32 8" stroke="#c1eff8" stroke-width="4"/><circle cx="20" cy="20" r="3" fill="#e0c38b"/></svg><b>${i + 1}</b><span>MIRROR<strong data-angle="${i}">${d.mirrors[i].start}\xB0</strong></span></button>`).join("")}</div>
 <div class="oc-controls"><div class="oc-turn"><button type="button" data-action="left" aria-label="Rotate selected mirror counterclockwise">\u21B6</button><label><span data-selected>Mirror 1</span><output data-angle-control aria-label="Selected mirror angle"></output></label><button type="button" data-action="right" aria-label="Rotate selected mirror clockwise">\u21B7</button></div><button type="button" data-action="test">Test beam</button><button type="button" data-action="replay" hidden>Replay flight</button><button type="button" data-action="pause" aria-pressed="false">Pause</button></div>
 <div class="oc-feedback" aria-live="polite">Drag a brass mirror handle, or select a mirror and turn it below.</div>
</div>
`;
}

// src/app/templates/heist/escape/locks/optics-cage/optics-cage.motion.ts
var OPTICS_SCALE = 1.1;
var OWL_ESCAPE_DURATION = 9;
var clamp2 = (n) => Math.max(0, Math.min(1, n));
var ease3 = (n) => {
  const t = clamp2(n);
  return t * t * (3 - 2 * t);
};
function opticsPoint(p) {
  return [-10.5 + p.x * OPTICS_SCALE, 9.8 - p.y * OPTICS_SCALE, 0.72];
}
function snapMirror(angle, step) {
  return (Math.round(angle / step) * step % 180 + 180) % 180;
}
function opticsRelease(time) {
  return {
    charge: ease3(time / 0.65),
    bolt: ease3((time - 0.65) / 0.5),
    lift: ease3((time - 1.15) / 1.5)
  };
}
function owlMotion(index, time, idle) {
  const elapsed = time - 3.05 - index * 0.8;
  const p = clamp2(elapsed / 4.9), forward = ease3(p / 0.42), spread = ease3((p - 0.42) / 0.58);
  const flying = p > 0 && p < 1;
  const unfold = ease3(p / 0.08) * (1 - ease3((p - 0.88) / 0.12));
  const flap = flying ? Math.sin(elapsed * 10) * 0.43 * (1 - ease3((p - 0.6) / 0.22)) : 0;
  return {
    x: (index === 0 ? 5.4 : 8.4) + (index === 0 ? -1.3 : 1.15) * spread,
    y: 1.3 + 0.9 * ease3(p / 0.3) + Math.sin(p * Math.PI) * 0.35,
    z: 0.2 + 3.25 * forward + 2.25 * spread,
    yaw: (index === 0 ? -1 : 1) * Math.sin(p * Math.PI) * 0.28,
    pitch: flying ? -Math.sin(p * Math.PI) * 0.16 : 0,
    wing: 1.18 * (1 - unfold) + flap * unfold,
    tuck: unfold,
    head: flying ? 0 : Math.sin(idle * 0.55 + index * 2.1) * 0.13,
    blink: flying ? 1 : Math.sin(idle * 0.75 + index * 2.5) > 0.995 ? 0.12 : 1,
    progress: p,
    escaped: p === 1
  };
}
var OpticsCageSequence = class {
  constructor(definition, view) {
    this.definition = definition;
    this.key = JSON.stringify(view.answer);
    if (machineReading(definition, view.answer).solved) this.time = OWL_ESCAPE_DURATION;
  }
  definition;
  time = 0;
  key;
  pending = false;
  dwell = 0;
  trial = -1;
  delivered = false;
  update(view, dt, settled) {
    const key = JSON.stringify(view.answer), solved = machineReading(this.definition, view.answer).solved;
    let engage = false, finished = false;
    if (key !== this.key) {
      this.key = key;
      this.pending = true;
      this.dwell = 0;
      this.time = 0;
    }
    if (view.testing && view.trial !== this.trial) {
      this.trial = view.trial;
      this.time = 0;
      this.delivered = false;
      this.pending = false;
    }
    if (!settled || !solved) this.dwell = 0;
    if (view.testing && !view.paused && dt > 0) {
      const duration = view.passed ? OWL_ESCAPE_DURATION : 0.65;
      this.time = view.reducedMotion ? duration : Math.min(duration, this.time + dt);
      if (this.time === duration && !this.delivered) {
        this.delivered = true;
        finished = true;
      }
    }
    if (!view.testing && !view.completed && this.pending && solved && settled && !view.paused && dt > 0) {
      this.dwell += dt;
      if (this.dwell >= 0.35) {
        this.pending = false;
        engage = true;
      }
    }
    return { engage, finished };
  }
};

// src/app/templates/heist/escape/locks/optics-cage/optics-cage.owls.ts
function createTowerOwl(art, index) {
  const root = new Group(), head = new Group(), feet = new Group();
  const feather = art.material({ color: index ? 9070932 : 5464688, roughness: 0.92 });
  const dark = art.material({ color: index ? 5324596 : 3161936, roughness: 0.86 });
  const cream = art.material({ color: index ? 15193262 : 15001564, roughness: 0.95 });
  const amber = art.material({ color: 15316828, roughness: 0.36 });
  const pupil = art.material({ color: 1055784, roughness: 0.08 });
  const ellipsoid = (parent, material, x, y, z, sx, sy, sz) => {
    const mesh = art.mesh(new SphereGeometry(1, 20, 14), material, parent, x, y, z);
    mesh.scale.set(sx, sy, sz);
    return mesh;
  };
  ellipsoid(root, feather, 0, 0.8, 0, 0.49, 0.63, 0.36);
  ellipsoid(root, cream, 0, 0.76, 0.22, 0.37, 0.48, 0.2);
  for (let row = 0; row < 4; row++)
    for (let col = 0; col < 3; col++) {
      const x = (col - 1) * 0.18 + (row % 2 ? 0.025 : -0.025);
      const f = ellipsoid(
        root,
        feather,
        x,
        0.45 + row * 0.16,
        0.393 - Math.abs(x) * 0.12,
        0.035,
        0.072,
        0.015
      );
      f.rotation.z = x * 0.6;
    }
  ellipsoid(root, dark, 0, 0.35, -0.28, 0.24, 0.42, 0.1).rotation.x = -0.45;
  head.position.set(0, 1.39, 0.02);
  root.add(head);
  ellipsoid(head, feather, 0, 0, 0, 0.57, 0.46, 0.39);
  const eyes = [];
  for (const side of [-1, 1]) {
    const disc2 = ellipsoid(head, dark, side * 0.235, 0, 0.28, 0.294, 0.315, 0.13);
    disc2.rotation.z = side * 0.14;
    ellipsoid(head, cream, side * 0.235, 0, 0.34, 0.258, 0.273, 0.09);
    const eye = new Group();
    eye.position.set(side * 0.235, 0.025, 0.422);
    head.add(eye);
    ellipsoid(eye, amber, 0, 0, 0, 0.135, 0.15, 0.055);
    ellipsoid(eye, pupil, 0, 0, 0.043, 0.075, 0.103, 0.034);
    ellipsoid(eye, cream, -0.026, 0.043, 0.072, 0.025, 0.026, 0.014);
    eyes.push(eye);
    const tuft = art.mesh(
      new ConeGeometry(0.13, 0.42, 12),
      feather,
      head,
      side * 0.4,
      0.37,
      -0.035
    );
    tuft.rotation.z = side * -0.31;
    const brow = ellipsoid(head, feather, side * 0.23, 0.24, 0.395, 0.25, 0.06, 0.07);
    brow.rotation.z = side * 0.12;
  }
  const beak = art.mesh(new ConeGeometry(0.105, 0.27, 12), amber, head, 0, -0.16, 0.435);
  beak.rotation.z = Math.PI;
  beak.rotation.x = 0.2;
  root.add(feet);
  for (const side of [-1, 1]) {
    art.cylinder(feet, side * 0.19, 0.19, 0.1, 0.055, 0.29, amber);
    for (let toe = -1; toe <= 1; toe++) {
      art.rod(
        feet,
        new Vector3(side * 0.19, 0.08, 0.07),
        new Vector3(side * 0.19 + toe * 0.075, 0.035, 0.31),
        0.022,
        amber
      );
      const claw = art.mesh(
        new ConeGeometry(0.026, 0.1, 8),
        pupil,
        feet,
        side * 0.19 + toe * 0.075,
        0.019,
        0.32
      );
      claw.rotation.x = 0.9;
    }
  }
  const wings = [-1, 1].map((side) => {
    const wing = new Group();
    wing.position.set(side * 0.34, 1.04, -0.035);
    root.add(wing);
    const shape = new Group();
    shape.scale.x = side;
    wing.add(shape);
    ellipsoid(shape, feather, 0.42, -0.04, 0, 0.58, 0.24, 0.115).rotation.z = -0.14;
    for (let i = 0; i < 7; i++) {
      const f = ellipsoid(
        shape,
        i % 2 ? feather : dark,
        0.51 + i * 0.115,
        -0.11 - i * 0.021,
        -0.01,
        0.44 - i * 0.019,
        0.094,
        0.046
      );
      f.rotation.z = -0.42 - i * 0.105;
      const tip = ellipsoid(
        shape,
        cream,
        0.74 + i * 0.095,
        -0.28 - i * 0.04,
        0.035,
        0.055,
        0.04,
        0.015
      );
      tip.rotation.z = -0.55;
    }
    batchMetalwork(art, shape);
    return wing;
  });
  batchMetalwork(art, root);
  batchMetalwork(art, head);
  batchMetalwork(art, feet);
  eyes.forEach((eye) => batchMetalwork(art, eye));
  return { root, head, wings, eyes, feet };
}
function poseTowerOwl(owl, index, time, idle) {
  const pose = owlMotion(index, time, idle);
  owl.root.position.set(pose.x, pose.y, pose.z);
  owl.root.rotation.set(pose.pitch, pose.yaw, 0);
  owl.head.rotation.y = pose.head;
  owl.wings[0].rotation.z = pose.wing;
  owl.wings[1].rotation.z = -pose.wing;
  owl.feet.position.y = pose.tuck * 0.16;
  owl.feet.rotation.x = -pose.tuck * 0.8;
  owl.eyes.forEach((eye) => {
    eye.scale.y = pose.blink;
  });
  return pose.escaped;
}

// src/app/templates/heist/escape/locks/optics-cage/optics-cage.model.ts
function createOpticsDiorama(art, d) {
  const root = new Group(), fixed = new Group();
  root.add(fixed);
  const surfaces = new DioramaSurfaces(art);
  const slate = surfaces.stone(3165288);
  const stone = surfaces.stone(6321804);
  const deep = art.material({ color: 1189176, roughness: 0.84 });
  const engraved = art.material({ color: 3692395, roughness: 0.75, metalness: 0.25 });
  const silver = art.material({
    color: 12446193,
    metalness: 0.88,
    roughness: 0.14,
    emissive: 3697273,
    emissiveIntensity: 0.18
  });
  const moon = art.material({
    color: 14808575,
    emissive: 10995695,
    emissiveIntensity: 1.15,
    roughness: 0.9
  });
  const light = art.material({
    color: 14745599,
    emissive: 11138303,
    emissiveIntensity: 3,
    toneMapped: false
  });
  const halo = art.material({
    color: 8509167,
    emissive: 7720169,
    emissiveIntensity: 1,
    transparent: true,
    opacity: 0.14,
    depthWrite: false,
    blending: AdditiveBlending
  });
  art.box(fixed, -0.15, 0.13, 1.5, 24.3, 0.45, 10.8, slate, 0.12);
  art.box(fixed, -0.15, -0.12, 1.5, 24.65, 0.16, 11.1, art.brass);
  for (let x = -11; x <= 11; x += 1.5)
    for (let z = -2.7; z < 6; z += 1.5)
      art.box(fixed, x, 0.38, z, 1.47, 0.08, 1.47, Math.round(x + z) % 3 ? stone : slate, 0.015);
  art.box(fixed, -5, 5.44, -0.08, 12.15, 9.8, 0.7, deep, 0.15);
  art.box(fixed, -5, 5.44, 0.29, 11.68, 9.32, 0.09, slate);
  for (const x of [-11.08, 1.08]) art.box(fixed, x, 5.44, 0.12, 0.22, 10, 0.6, art.brass);
  for (const y of [0.45, 10.42]) art.box(fixed, -5, y, 0.12, 12.38, 0.2, 0.6, art.brass);
  for (let x = 0; x <= 10; x++)
    art.box(fixed, -10.5 + x * OPTICS_SCALE, 5.4, 0.355, 0.015, 8.8, 0.012, engraved, 2e-3);
  for (let y = 0; y <= 8; y++)
    art.box(fixed, -5, 9.8 - y * OPTICS_SCALE, 0.355, 11, 0.015, 0.012, engraved, 2e-3);
  for (const x of [-10.83, 0.83]) for (const y of [0.72, 10.12]) art.screw(fixed, x, y, 0.49);
  art.label(fixed, "L U N A R   O B S E R V A T O R Y", -5, 10.04, 0.43, 7, 0.25);
  art.box(fixed, 6.8, 5.4, -2.4, 10.9, 10.7, 0.42, deep);
  for (const x of [2.05, 11.35])
    for (let y = 0.85; y < 11; y += 0.8) {
      art.box(fixed, x, y, -1.66, 0.88, 0.76, 1.25, y % 1.6 < 0.8 ? stone : slate, 0.055);
    }
  for (let i = 0; i < 36; i++) {
    const x = 2.9 + i * 1.731 % 7.75, y = 5.5 + i * 0.893 % 4.8;
    art.mesh(new SphereGeometry(i % 5 ? 0.019 : 0.035, 6, 4), moon, fixed, x, y, -2.08);
  }
  const moonDisc = art.mesh(new SphereGeometry(0.85, 40, 24), moon, fixed, 8.9, 8.5, -1.85);
  moonDisc.scale.z = 0.3;
  const crater = art.material({
    color: 11455449,
    emissive: 6459308,
    emissiveIntensity: 0.65,
    roughness: 1
  });
  for (const [x, y, r] of [
    [-0.3, 0.2, 0.15],
    [0.3, 0.36, 0.13],
    [0.2, -0.38, 0.19],
    [-0.37, -0.3, 0.09]
  ]) {
    const mark = art.mesh(new SphereGeometry(r, 14, 10), crater, fixed, 8.9 + x, 8.5 + y, -1.61);
    mark.scale.z = 0.12;
  }
  const mirrors = d.mirrors.map((mirror, i) => {
    const [x, y, z] = opticsPoint(mirror.center);
    const mount = art.cylinder(fixed, x, y, 0.47, 1.06, 0.2, art.dark);
    mount.rotation.x = Math.PI / 2;
    art.torus(fixed, x, y, 0.59, 1.08, 0.045, art.brass);
    art.torus(fixed, x, y, 0.6, 0.93, 0.015, art.steel);
    for (let degree = 0; degree < 360; degree += 15) {
      const a = -degree * Math.PI / 180, major = degree % 45 === 0;
      const tick = art.box(
        fixed,
        x + Math.cos(a),
        y + Math.sin(a),
        0.625,
        major ? 0.14 : 0.075,
        0.025,
        0.025,
        major ? art.brass : art.steel,
        3e-3
      );
      tick.rotation.z = a;
    }
    const pivot = new Group();
    pivot.position.set(x, y, z);
    root.add(pivot);
    art.box(pivot, 0, 0, 0, mirror.length * OPTICS_SCALE + 0.09, 0.23, 0.26, art.brass);
    art.box(pivot, 0, 0, 0.15, mirror.length * OPTICS_SCALE, 0.12, 0.05, silver, 0.015);
    art.box(pivot, 0.92, 0, 0.14, 0.28, 0.17, 0.3, art.brass);
    art.torus(pivot, 1.02, 0, 0.33, 0.1, 0.03, art.dark);
    const hub = art.cylinder(pivot, 0, 0, 0.2, 0.11, 0.13, art.brass);
    hub.rotation.x = Math.PI / 2;
    art.screw(pivot, 0, 0, 0.31);
    art.label(fixed, String(i + 1), x, y - 1.33, 0.63, 0.37, 0.35);
    batchMetalwork(art, pivot);
    return pivot;
  });
  d.obstacles.forEach((obstacle) => {
    const a = new Vector3(...opticsPoint(obstacle.a)), b = new Vector3(...opticsPoint(obstacle.b));
    const body = art.box(fixed, 0, 0, 0, 0.25, 1, 0.66, stone);
    art.positionRod(body, a, b);
    body.scale.y = a.distanceTo(b);
    const ridge = art.rod(fixed, a.clone().setZ(1.08), b.clone().setZ(1.08), 0.045, art.brass);
    ridge.castShadow = true;
  });
  const emitter = new Vector3(...opticsPoint(d.emitter));
  const source = new Group();
  source.position.copy(emitter);
  source.rotation.z = -d.direction * Math.PI / 180;
  fixed.add(source);
  const lamp = art.cylinder(source, -0.4, 0, 0, 0.28, 0.55, art.brass);
  lamp.rotation.z = Math.PI / 2;
  const lens = art.cylinder(source, -0.1, 0, 0, 0.2, 0.045, light);
  lens.rotation.z = Math.PI / 2;
  art.box(source, -0.45, -0.28, -0.05, 0.55, 0.16, 0.6, art.dark);
  const receiver = new Vector3(...opticsPoint(d.receiver));
  const receiverMaterial = art.material({
    color: 4809331,
    emissive: 9564159,
    emissiveIntensity: 0,
    metalness: 0.35,
    roughness: 0.25
  });
  const detector = art.cylinder(
    fixed,
    receiver.x,
    receiver.y,
    0.56,
    d.radius * OPTICS_SCALE,
    0.17,
    receiverMaterial
  );
  detector.rotation.x = Math.PI / 2;
  art.torus(fixed, receiver.x, receiver.y, 0.68, d.radius * OPTICS_SCALE + 0.09, 0.055, art.brass);
  art.label(fixed, "RECEIVER", receiver.x - 0.5, receiver.y - 0.63, 0.62, 1.48, 0.25);
  const cablePoints2 = [
    receiver.clone().setZ(0.45),
    new Vector3(1.65, receiver.y, 0.45),
    new Vector3(1.65, 6.15, 0.45),
    new Vector3(3.65, 6.15, 0.45),
    new Vector3(3.65, 4.8, 1.8)
  ];
  for (let i = 1; i < cablePoints2.length; i++)
    art.rod(fixed, cablePoints2[i - 1], cablePoints2[i], 0.038, art.brass);
  const bolt = new Group();
  bolt.position.set(3.85, 4.82, 1.84);
  root.add(bolt);
  art.box(bolt, 0, 0, 0, 1.18, 0.17, 0.25, art.steel);
  art.box(bolt, -0.55, 0, 0.08, 0.15, 0.38, 0.34, art.brass);
  batchMetalwork(art, bolt);
  for (const x of [3.72, 10.15]) {
    art.box(fixed, x, 4.9, 1.95, 0.32, 9.1, 0.48, stone);
    art.box(fixed, x, 4.9, 2.22, 0.11, 8.95, 0.09, art.brass);
    art.box(fixed, x, 0.8, 0.1, 0.65, 0.8, 4.4, stone);
  }
  art.box(fixed, 6.94, 4.91, 0.05, 6.85, 0.3, 4.42, slate);
  art.box(fixed, 6.94, 0.62, 0.05, 6.85, 0.25, 4.42, stone);
  for (const x of [3.78, 10.09])
    for (let z = -1.5; z < 1.8; z += 0.65) art.cylinder(fixed, x, 2.7, z, 0.045, 4.1, art.steel);
  const grille = new Group();
  grille.position.set(6.94, 0.8, 2.19);
  root.add(grille);
  for (const y of [0, 3.85]) art.box(grille, 0, y, 0, 6.2, 0.2, 0.2, art.brass);
  for (let x = -2.95; x <= 3; x += 0.59) art.cylinder(grille, x, 1.92, 0, 0.047, 3.85, art.steel);
  art.box(grille, -2.9, 3.7, 0.05, 0.4, 0.36, 0.18, art.brass);
  batchMetalwork(art, grille);
  const pulley = new Group();
  pulley.position.set(6.94, 9.5, 2.05);
  root.add(pulley);
  art.torus(pulley, 0, 0, 0, 0.4, 0.075, art.brass);
  art.torus(pulley, 0, 0, 0.04, 0.32, 0.025, art.dark);
  for (let i = 0; i < 6; i++) {
    const a = i * Math.PI / 3;
    art.rod(
      pulley,
      new Vector3(),
      new Vector3(Math.cos(a) * 0.35, Math.sin(a) * 0.35, 0),
      0.027,
      art.steel
    );
  }
  batchMetalwork(art, pulley);
  const weight = art.box(root, 7.38, 8.9, 1.9, 0.46, 0.72, 0.44, art.dark);
  const cageRope = art.rod(
    root,
    new Vector3(6.51, 9.5, 2.05),
    new Vector3(6.51, 4.65, 2.19),
    0.035
  );
  const weightRope = art.rod(
    root,
    new Vector3(7.37, 9.5, 2.05),
    new Vector3(7.38, 9.25, 1.9),
    0.035
  );
  for (const [x, y, z] of [
    [5.4, 1.3, 0.2],
    [8.4, 1.3, 0.2],
    [4.1, 2.2, 5.7],
    [9.55, 2.2, 5.7]
  ]) {
    art.cylinder(fixed, x, y / 2, z, 0.105, y, art.dark);
    art.rod(
      fixed,
      new Vector3(x - 0.6, y - 0.06, z + 0.14),
      new Vector3(x + 0.6, y - 0.06, z + 0.14),
      0.08,
      art.rope
    );
    art.cylinder(fixed, x, 0.48, z, 0.36, 0.12, art.brass);
  }
  const owls = Array.from({ length: d.presentation?.owls ?? 2 }, (_, i) => {
    const owl = createTowerOwl(art, i);
    root.add(owl.root);
    return owl;
  });
  const beam = Array.from({ length: d.bounceLimit + 2 }, () => ({
    core: art.rod(root, new Vector3(), new Vector3(1, 0, 0), 0.018, light),
    glow: art.rod(root, new Vector3(), new Vector3(1, 0, 0), 0.085, halo)
  }));
  beam.forEach((segment) => {
    segment.core.castShadow = false;
    segment.glow.castShadow = false;
    segment.core.receiveShadow = false;
    segment.glow.receiveShadow = false;
  });
  const selected = art.torus(root, 0, 0, 0.66, 1.13, 0.023, light);
  selected.castShadow = false;
  batchMetalwork(art, fixed);
  batchMetalwork(art, source);
  return {
    root,
    mirrors,
    beam,
    receiverMaterial,
    grille,
    bolt,
    pulley,
    weight,
    cageRope,
    weightRope,
    owls,
    selected
  };
}
function positionOpticsDiorama(art, stage, d, angles, selection, time, idle) {
  stage.mirrors.forEach((mirror, i) => {
    mirror.rotation.z = -angles[i] * Math.PI / 180;
  });
  const trace = traceBeam(d, angles), release = opticsRelease(time);
  stage.beam.forEach((segment, i) => {
    const a = trace.points[i], b = trace.points[i + 1];
    segment.core.visible = segment.glow.visible = !!a && !!b;
    if (a && b) {
      const start = new Vector3(...opticsPoint(a)), end = new Vector3(...opticsPoint(b));
      art.positionRod(segment.core, start, end);
      art.positionRod(segment.glow, start, end);
    }
  });
  stage.receiverMaterial.emissiveIntensity = trace.hit ? 1.5 + release.charge : 0;
  stage.grille.position.y = 0.8 + release.lift * 4.55;
  stage.bolt.position.x = 3.85 - release.bolt * 0.8;
  stage.pulley.rotation.z = -release.lift * 4.55 / 0.4;
  stage.weight.position.y = 8.9 - release.lift * 4.55;
  art.positionRod(
    stage.cageRope,
    new Vector3(6.51, 9.5, 2.05),
    new Vector3(6.51, 4.65 + release.lift * 4.55, 2.19)
  );
  art.positionRod(
    stage.weightRope,
    new Vector3(7.37, 9.5, 2.05),
    new Vector3(7.38, stage.weight.position.y + 0.36, 1.9)
  );
  stage.selected.visible = !!d.mirrors[selection];
  if (d.mirrors[selection])
    stage.selected.position.set(...opticsPoint(d.mirrors[selection].center)).setZ(0.66);
  const escaped = stage.owls.reduce(
    (total, owl, i) => total + (poseTowerOwl(owl, i, time, idle) ? 1 : 0),
    0
  );
  return { trace, release, escaped };
}

// src/app/templates/heist/escape/locks/optics-cage/optics-cage.scene.ts
function mountOpticsCage(parent, d, snapshot, cb) {
  const root = document.createElement("div");
  root.dataset["opticsCage"] = "";
  root.innerHTML = opticsCageLayout(d);
  parent.append(root);
  const q = (selector) => root.querySelector(selector);
  const action = (name) => q(`[data-action=${name}]`);
  const sound = new TimingCageSound();
  let viewer, gone = false, frame = 0;
  const fail = () => {
    destroy();
    cb.failed();
  };
  const focuses = {
    all: { center: [0, 5.1, 1.4], width: 26.3, height: 12.5 },
    drive: { center: [-5, 5.45, 0.6], width: 13.3, height: 11.7 },
    cage: { center: [6.7, 3.6, 3], width: 10.8, height: 8.2 }
  };
  d.mirrors.forEach((mirror, i) => {
    focuses[`mirror-${i}`] = { center: opticsPoint(mirror.center), width: 6, height: 6 };
  });
  try {
    viewer = new DioramaViewer(root, "owl", focuses, fail);
  } catch {
    root.remove();
    sound.destroy();
    cb.failed();
    return { destroy() {
    } };
  }
  viewer.renderer.setClearColor(1188408);
  const stage = createOpticsDiorama(viewer.art, d);
  viewer.scene.add(stage.root);
  const sequence = new OpticsCageSequence(d, snapshot());
  const control = q("[data-angle-control]");
  const ray = new Raycaster(), plane = new Plane(new Vector3(0, 0, 1), -0.72);
  let selected = 0, previous = performance.now(), age = 0, previousRelease = 0, ui = "", lastFeedback = "";
  let drag;
  let lastAnswer = JSON.stringify(snapshot().answer), changedAt = -1, suspended = false;
  const view = () => __spreadProps(__spreadValues({}, snapshot()), {
    reducedMotion: snapshot().reducedMotion
  });
  const angles = () => {
    const a = snapshot().answer;
    return a.kind === "reflection" ? a.angles : d.mirrors.map((m) => m.start);
  };
  const operable = () => !gone && !snapshot().paused && !snapshot().testing && !snapshot().completed;
  const select = (index) => {
    if (!operable() || !d.mirrors[index]) return;
    selected = index;
    cb.select(index);
    if (viewer.viewport.clientWidth < 650) viewer.setFocus(`mirror-${index}`);
  };
  const commit = (angle) => {
    if (!operable()) return;
    cb.input({
      type: "mirror",
      index: selected,
      angle: snapMirror(angle, d.mirrors[selected].step)
    });
    sound.play("tick");
  };
  const cancelPointer = () => {
    const id = drag?.id;
    drag = void 0;
    if (id !== void 0 && root.hasPointerCapture(id)) root.releasePointerCapture(id);
  };
  const point = (event) => {
    const rect = viewer.canvas.getBoundingClientRect();
    ray.setFromCamera(
      new Vector2(
        (event.clientX - rect.left) / rect.width * 2 - 1,
        1 - (event.clientY - rect.top) / rect.height * 2
      ),
      viewer.camera
    );
    return ray.ray.intersectPlane(plane, new Vector3());
  };
  const down = (event) => {
    if (!operable() || event.button !== 0 || event.target !== viewer.canvas) return;
    const p = point(event);
    if (!p) return;
    const distances = d.mirrors.map((m) => p.distanceTo(new Vector3(...opticsPoint(m.center))));
    const index = distances.indexOf(Math.min(...distances));
    if (distances[index] > 1.25) return;
    event.preventDefault();
    sound.unlock();
    selected = index;
    cb.select(index);
    drag = {
      id: event.pointerId,
      index,
      angle: angles()[index],
      moved: false,
      startX: event.clientX,
      startY: event.clientY
    };
    root.setPointerCapture(event.pointerId);
  };
  const move = (event) => {
    if (!drag || drag.id !== event.pointerId) return;
    if (!operable()) {
      cancelPointer();
      return;
    }
    const p = point(event);
    if (!p) return;
    drag.moved ||= Math.hypot(event.clientX - drag.startX, event.clientY - drag.startY) > 5;
    const center = opticsPoint(d.mirrors[drag.index].center);
    if (drag.moved && Math.hypot(p.x - center[0], p.y - center[1]) > 0.15)
      drag.angle = snapMirror(
        Math.atan2(center[1] - p.y, p.x - center[0]) * 180 / Math.PI,
        d.mirrors[drag.index].step
      );
  };
  const up = (event) => {
    if (!drag || drag.id !== event.pointerId) return;
    const current = drag;
    cancelPointer();
    if (current.moved) commit(current.angle);
  };
  const start = () => {
    if (!operable() || drag) return;
    cb.engage?.();
    action("pause").focus({ preventScroll: true });
  };
  const click = (event) => {
    const button = event.target.closest("button");
    if (!button || button.disabled) return;
    sound.unlock();
    if (button.dataset["mirror"] !== void 0) {
      select(Number(button.dataset["mirror"]));
      return;
    }
    if (button.dataset["focus"]) {
      cancelPointer();
      viewer.setFocus(button.dataset["focus"]);
      return;
    }
    switch (button.dataset["action"]) {
      case "left":
        commit(angles()[selected] - d.mirrors[selected].step);
        break;
      case "right":
        commit(angles()[selected] + d.mirrors[selected].step);
        break;
      case "test":
        start();
        break;
      case "replay":
        if (!snapshot().paused && !snapshot().testing) {
          cb.replay?.();
          action("pause").focus({ preventScroll: true });
        }
        break;
      case "pause":
        cancelPointer();
        cb.pause?.();
        break;
      case "reset":
        if (operable()) {
          cancelPointer();
          cb.input({ type: "reset" });
          viewer.setFocus("drive");
        }
        break;
      case "expand":
        cancelPointer();
        viewer.expand(!viewer.expanded);
        break;
    }
  };
  const key = (event) => {
    if (event.key === "Escape") cancelPointer();
  };
  root.addEventListener("click", click);
  root.addEventListener("keydown", key);
  root.addEventListener("pointerdown", down);
  root.addEventListener("pointermove", move);
  root.addEventListener("pointerup", up);
  root.addEventListener("pointercancel", cancelPointer);
  function tick(now) {
    if (gone) return;
    const v = view(), paused = v.paused || document.hidden, dt = paused ? 0 : Math.min(0.1, Math.max(0, (now - previous) / 1e3));
    previous = now;
    if (paused !== suspended) {
      suspended = paused;
      if (paused) {
        sound.suspend();
        cancelPointer();
      } else sound.resume();
    }
    age += dt;
    const key2 = JSON.stringify(v.answer);
    if (key2 !== lastAnswer) {
      lastAnswer = key2;
      changedAt = age;
    }
    const settled = !drag && age - changedAt > 0.18, result = sequence.update(v, dt, settled);
    cb.settled(settled);
    if (result.engage) start();
    const reading = machineReading(d, v.answer), shown = [...angles()];
    if (drag) shown[drag.index] = drag.angle;
    const release = reading.solved ? sequence.time : 0;
    const state = positionOpticsDiorama(
      viewer.art,
      stage,
      d,
      shown,
      selected,
      release,
      v.reducedMotion ? 0 : age
    );
    if (v.testing && release > 0.7 && previousRelease <= 0.7) viewer.setFocus("all");
    if (v.testing && release > 3 && previousRelease <= 3) viewer.setFocus("cage");
    if (release === 0 && previousRelease > 0) viewer.setFocus("drive");
    if (dt > 0 && !v.reducedMotion) {
      for (const [time, cue] of [
        [0.7, "latch"],
        [1.2, "door"],
        [8.8, "free"]
      ])
        if (release >= time && previousRelease < time) sound.play(cue);
    }
    previousRelease = release;
    const can = operable(), uiKey = JSON.stringify([shown, selected, can, v.testing, v.paused, reading.solved]);
    if (uiKey !== ui) {
      ui = uiKey;
      root.querySelectorAll("button[data-mirror]").forEach((button, i) => {
        button.disabled = !can;
        button.setAttribute("aria-pressed", String(i === selected));
        q(`[data-angle="${i}"]`).textContent = `${shown[i]}\xB0`;
      });
      control.value = `${shown[selected]}\xB0`;
      q("[data-selected]").textContent = `Mirror ${selected + 1}`;
      for (const name of ["left", "right", "reset"]) action(name).disabled = !can;
      action("test").disabled = !can || reading.solved;
      action("replay").hidden = !reading.solved;
      action("replay").disabled = v.testing || v.paused;
      action("pause").textContent = v.paused ? "Resume" : "Pause";
      action("pause").setAttribute("aria-pressed", String(v.paused));
    }
    const message = v.paused ? "Workshop paused." : reading.solved ? release >= OWL_ESCAPE_DURATION ? `${stage.owls.length} owls safely outside. Replay their flight or try another beam path.` : release < 0.7 ? "Receiver lit. The light holds steady\u2026" : release < 2.7 ? "The catch slides free. The counterweight lifts the grille." : `${state.escaped} / ${stage.owls.length} owls outside. Watch their wings unfold!` : state.trace.reason === "blocked" ? "The stone baffle stops the beam. Find a path around it." : `Mirror ${selected + 1} \xB7 ${shown[selected]}\xB0. ${state.trace.points.length > 2 ? "Follow the reflected beam to the next mirror." : "Turn the brass handle to redirect the moonbeam."}`;
    if (message !== lastFeedback) {
      lastFeedback = message;
      q(".oc-feedback").textContent = message;
      q(".oc-feedback").dataset["blocked"] = String(state.trace.reason === "blocked");
    }
    root.dataset["angles"] = angles().join(",");
    root.dataset["previewAngles"] = shown.join(",");
    root.dataset["release"] = release.toFixed(2);
    root.dataset["escaped"] = String(state.escaped);
    root.dataset["beam"] = state.trace.reason;
    viewer.canvas.setAttribute(
      "aria-label",
      `Moonbeam workshop. ${shown.map((a, i) => `Mirror ${i + 1}: ${a} degrees`).join("; ")}. Beam ${state.trace.hit ? "at receiver" : state.trace.reason}. Cage ${state.release.lift === 1 ? "open" : "closed"}. ${state.escaped} owls outside. Use the mirror and angle controls below.`
    );
    if (!document.hidden) viewer.render(dt, v.reducedMotion);
    root.dataset["drawCalls"] = String(viewer.renderer.info.render.calls);
    if (result.finished) cb.finished();
    frame = requestAnimationFrame(tick);
  }
  cb.ready();
  frame = requestAnimationFrame(tick);
  function destroy() {
    if (gone) return;
    gone = true;
    cancelAnimationFrame(frame);
    cancelPointer();
    root.removeEventListener("click", click);
    root.removeEventListener("keydown", key);
    root.removeEventListener("pointerdown", down);
    root.removeEventListener("pointermove", move);
    root.removeEventListener("pointerup", up);
    root.removeEventListener("pointercancel", cancelPointer);
    sound.destroy();
    viewer?.destroy();
    root.remove();
  }
  return { destroy };
}

// src/app/templates/heist/escape/locks/bridge-cage/bridge-cage.layout.ts
var bridgeCageLayout = `<style>
[data-bridge-cage]{position:relative;isolation:isolate;width:100%;height:100%;overflow:hidden;background:#173b40;color:#ecf2e5;font:13px/1.35 'Trebuchet MS',sans-serif}
[data-bridge-cage] *{box-sizing:border-box}[data-bridge-cage] [hidden]{display:none!important}
[data-bridge-cage] button,[data-bridge-cage] select{font:inherit;min-height:42px;padding:6px 10px;color:#edf1e4;background:#284d50;border:1px solid #84a6a3;border-radius:6px;cursor:pointer}
[data-bridge-cage] button:hover{background:#426465;border-color:#e9c77d}[data-bridge-cage] button:disabled{opacity:.42;cursor:default}
[data-bridge-cage] :focus-visible{outline:3px solid #ffda85;outline-offset:2px}[data-bridge-cage] button[aria-pressed=true]{background:#446965;border-color:#e0c38b}
[data-bridge-cage] [data-viewport]{position:absolute;inset:0 0 220px;overflow:hidden}
[data-bridge-cage] canvas{width:100%;height:100%;display:block;touch-action:none;cursor:grab}
[data-bridge-cage] .bc-top{position:absolute;inset:12px 12px auto;display:flex;justify-content:space-between;gap:8px;pointer-events:none}
[data-bridge-cage] .bc-top>*{pointer-events:auto}[data-bridge-cage] .bc-title{margin:0;color:#e4dfbb;font-size:11px;letter-spacing:.13em;text-shadow:0 2px 5px #09282d}
[data-bridge-cage] .bc-title span{display:block;font-size:12px;letter-spacing:0;margin-top:4px}
[data-bridge-cage] .bc-top button{font-size:11px;padding:5px 8px}
[data-bridge-cage] .bc-focus{position:absolute;left:12px;bottom:230px;display:flex;gap:5px}
[data-bridge-cage] .bc-focus button{font-size:11px;background:#173f43ed}
[data-bridge-cage] .bc-bottom{position:absolute;inset:auto 0 0;height:220px;padding:10px 14px;background:linear-gradient(115deg,#16383e,#30564f);border-top:1px solid #8da294;display:flex;flex-direction:column;gap:8px}
[data-bridge-cage] .bc-stages{display:flex;gap:7px}[data-bridge-cage] .bc-stages button{flex:1;display:flex;align-items:center;gap:9px;text-align:left}
[data-bridge-cage] .bc-stages b{font:24px Georgia;color:#f3d294}[data-bridge-cage] .bc-stages small{display:block;color:#c2d9d4;font-size:10px}
[data-bridge-cage] .bc-clue{font-size:12px;min-height:32px;color:#f0dfb2}
[data-bridge-cage] .bc-rails,[data-bridge-cage] .bc-actions,[data-bridge-cage] .bc-cables{display:flex;gap:7px;align-items:center;justify-content:space-between}
[data-bridge-cage] .bc-rails{justify-content:center;gap:32px}
[data-bridge-cage] .bc-rails label{display:flex;align-items:center;gap:5px}[data-bridge-cage] .bc-axis{display:flex;align-items:center;gap:5px}
[data-bridge-cage] .bc-axis button{font-size:19px;min-width:42px;padding:4px}
[data-bridge-cage] .bc-cables button{flex:1;padding:5px 7px;display:flex;align-items:center;justify-content:center;gap:6px}
[data-bridge-cage] .bc-cables svg{width:28px;height:28px;flex-shrink:0}
[data-bridge-cage] .bc-feedback{font-size:12px;color:#d3e5dc;min-height:16px;flex:1}
[data-bridge-cage] .bc-actions{gap:8px}[data-bridge-cage] .bc-actions button{min-height:36px;font-size:11px}
[data-bridge-cage] [data-options]{position:absolute;right:12px;top:65px;max-height:calc(100% - 300px);overflow:auto;width:min(325px,calc(100% - 24px));background:#244b4b;border:1px solid #95ada3;box-shadow:0 14px 30px #0008;border-radius:8px;padding:15px;z-index:7}
[data-bridge-cage] [data-options] label{display:flex;gap:8px;align-items:center;margin:12px 0}[data-bridge-cage] [data-options] input{width:20px;height:20px;accent-color:#d7b871}
[data-bridge-cage].diorama-expanded{position:fixed;inset:12px;z-index:2000;width:auto;height:auto;border:1px solid #8ba59e;border-radius:12px;box-shadow:0 0 0 30px #102b30ed}
@media(max-width:680px){
 [data-bridge-cage] [data-viewport]{bottom:280px}[data-bridge-cage] .bc-bottom{height:280px;padding:10px;gap:8px}
 [data-bridge-cage] .bc-focus{bottom:290px}[data-bridge-cage] .bc-clue{font-size:11px;min-height:46px}
 [data-bridge-cage] .bc-title{font-size:9px;max-width:175px}[data-bridge-cage] .bc-title span{font-size:10px}
 [data-bridge-cage] .bc-rails{justify-content:center;gap:10px;flex-wrap:wrap}[data-bridge-cage] .bc-axis{gap:4px}
 [data-bridge-cage] .bc-axis button{min-width:35px}[data-bridge-cage] .bc-axis select{max-width:58px;padding:5px}
 [data-bridge-cage] .bc-cables{gap:4px}[data-bridge-cage] .bc-cables button{flex-direction:column;gap:2px;font-size:11px;padding:4px}
 [data-bridge-cage] .bc-cables svg{width:23px;height:23px}[data-bridge-cage] .bc-actions{flex-wrap:wrap;justify-content:center}
 [data-bridge-cage] .bc-feedback{flex-basis:100%;font-size:11px;min-height:30px}
 [data-bridge-cage].diorama-expanded{inset:5px}
}

[data-bridge-cage] .bc-feedback{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}
[data-bridge-cage] [data-viewport]{bottom:180px}
[data-bridge-cage] .bc-bottom{height:180px;min-height:180px}
[data-bridge-cage] output{display:inline-block;min-width:28px;text-align:center;font-variant-numeric:tabular-nums}
@media(max-width:680px){[data-bridge-cage] [data-viewport]{bottom:184px}[data-bridge-cage] .bc-bottom{height:184px;min-height:184px}}
</style>
<div data-viewport></div>
<div class="bc-top"><p class="bc-title">RIVER CROSSING</p><div><button type="button" data-action="expand" aria-label="Expand bridge workshop">Expand</button> <button type="button" data-action="reset" aria-label="Reset mechanism">\u21BA</button></div></div>
<div class="bc-bottom">
 <div class="bc-stages" role="group" aria-label="Bridge mechanisms"><button type="button" data-stage="0" aria-pressed="true"><b>1</b><span>Anchor rails<small data-status="0"></small></span></button><button type="button" data-stage="1" aria-pressed="false"><b>2</b><span>Cable rig<small data-status="1"></small></span></button></div>

 <div class="bc-rails" data-rails>
  <div class="bc-axis"><button type="button" data-action="xminus" aria-label="Move anchor left">\u2212</button><label>X <output data-axis="x" aria-label="Anchor X coordinate"></output></label><button type="button" data-action="xplus" aria-label="Move anchor right">+</button></div>
  <div class="bc-axis"><button type="button" data-action="yminus" aria-label="Move anchor down">\u2212</button><label>Y <output data-axis="y" aria-label="Anchor Y coordinate"></output></label><button type="button" data-action="yplus" aria-label="Move anchor up">+</button></div>
 </div>
 <div class="bc-cables" data-cables role="group" aria-label="Cable reels" hidden></div>
 <div class="bc-actions"><div class="bc-feedback" aria-live="polite"></div><button type="button" data-action="test">Test setup</button><button type="button" data-action="replay" hidden>Replay crossing</button><button type="button" data-action="pause" aria-pressed="false">Pause</button></div>
</div>
`;

// src/app/templates/heist/escape/locks/diorama-label.ts
function dioramaLabel(art, parent, text, x, y, z, width, height, color = "#f6e9c6") {
  if (typeof document === "undefined") return;
  const canvas = document.createElement("canvas");
  canvas.height = 128;
  canvas.width = Math.max(64, Math.ceil(128 * width / height));
  const context = canvas.getContext("2d");
  if (!context) return;
  let size = 94;
  context.font = `600 ${size}px 'Trebuchet MS', sans-serif`;
  const measured = context.measureText(text).width;
  if (measured > canvas.width - 10) size *= (canvas.width - 10) / measured;
  context.font = `600 ${size}px 'Trebuchet MS', sans-serif`;
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillStyle = color;
  context.fillText(text, canvas.width / 2, 65);
  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  art.textures.add(texture);
  const material = new MeshBasicMaterial({
    map: texture,
    transparent: true,
    depthWrite: false,
    toneMapped: false
  });
  art.materials.add(material);
  const mesh = art.mesh(new PlaneGeometry(width, height), material, parent, x, y, z);
  mesh.castShadow = false;
}

// src/app/templates/heist/escape/locks/bridge-cage/bridge-cage.motion.ts
var BRIDGE_DURATION = 14;
var clamp3 = (n) => Math.max(0, Math.min(1, n));
var ease4 = (n) => {
  const t = clamp3(n);
  return t * t * (3 - 2 * t);
};
function bridgeParts(d) {
  const [coordinate, cable] = d.stages;
  if (coordinate.kind !== "coordinate" || cable.kind !== "cable")
    throw Error("Bridge requires coordinate and cable stages");
  return [coordinate, cable];
}
function bridgeAnswers(d, v) {
  return d.stages.map(
    (s, i) => i === v.active ? v.answer : v.stages?.[i] ?? machineRules[s.kind].initial(s)
  );
}
function bridgeSolved(d, answers) {
  return d.stages.every((s, i) => !!answers[i] && machineReading(s, answers[i]).solved);
}
function carriagePoint(d, p) {
  const scale = 7.5 / (d.max - d.min);
  return [-11 + (p.x - d.min) * scale, 3.1 + (p.y - d.min) * scale, 0.8];
}
function carriageInput(d, x, y) {
  const scale = 7.5 / (d.max - d.min);
  const bound = (n) => Math.max(d.min, Math.min(d.max, Math.round(n))) || 0;
  return { x: bound(d.min + (x + 11) / scale), y: bound(d.min + (y - 3.1) / scale) };
}
function cablePoints(d) {
  const xs = d.route.map((p) => p.x), ys = d.route.map((p) => p.y);
  const dx = Math.max(...xs) - Math.min(...xs), dy = Math.max(...ys) - Math.min(...ys);
  const scale = 6.7 / Math.max(dx, dy, 1);
  return d.route.map((p) => [
    -7.25 + (p.x - (Math.min(...xs) + dx / 2)) * scale,
    6.7 + (p.y - (Math.min(...ys) + dy / 2)) * scale,
    0.85
  ]);
}
function fittedCable(d, index) {
  const chosen = d.cables[index];
  if (!chosen) return { points: [], state: "empty" };
  const required = cableLength(d), ratio = chosen.length / required, anchors = cablePoints(d);
  const state = Math.abs(chosen.length ** 2 - required ** 2) < 1e-8 ? "taut" : ratio < 1 ? "short" : "slack";
  const lengths = anchors.slice(1).map((p, i) => Math.hypot(p[0] - anchors[i][0], p[1] - anchors[i][1]));
  let remaining = lengths.reduce((s, n) => s + n, 0) * Math.min(1, ratio);
  const points = [anchors[0]];
  anchors.slice(1).forEach((end, i) => {
    if (remaining <= 0) return;
    const start = anchors[i], length = lengths[i], endAt = Math.min(1, remaining / Math.max(length, 1e-9));
    for (let j = 1; j <= 20; j++) {
      const t = endAt * j / 20;
      points.push([
        start[0] + (end[0] - start[0]) * t,
        start[1] + (end[1] - start[1]) * t - (state === "slack" ? Math.sin(t * Math.PI) * Math.min(1.5, (ratio - 1) * 3) : 0),
        0.98
      ]);
    }
    remaining -= length;
  });
  return { points, state };
}
function bridgeRelease(time) {
  return {
    pin: ease4(time / 0.65),
    deck: ease4((time - 0.75) / 2.15),
    gate: ease4((time - 3.1) / 1.1),
    bolt: ease4((time - 2.9) / 0.3)
  };
}
function crossingRabbit(index, time, idle) {
  const elapsed = time - 4.5 - index * 0.48, p = clamp3(elapsed / 6.6);
  const hop = p > 0 && p < 1 ? Math.max(0, Math.sin(p * Math.PI * 18)) : 0;
  const lane = 2.7 + index % 3 * 0.95, landing = 2.7 + Math.floor(index / 3) * 1.75;
  return {
    x: -1.05 + (11.45 + index % 3 * 1.3 + Math.floor(index / 3) * 0.4) * p,
    y: 0.93 + hop * 0.23,
    z: lane + (landing - lane) * ease4((p - 0.87) / 0.13),
    yaw: p > 0 && p < 1 ? Math.PI / 2 : p === 1 ? -0.2 : 0.25,
    pitch: hop * -0.13,
    leg: p > 0 && p < 1 ? Math.sin(p * Math.PI * 18) * 0.65 : 0,
    ear: p > 0 && p < 1 ? hop * -0.25 : Math.sin(idle * 1.5 + index) * 0.06,
    escaped: p === 1,
    progress: p
  };
}
var BridgeSequence = class {
  constructor(d, view) {
    this.d = d;
    const answers = bridgeAnswers(d, view);
    this.keys = answers.map((a) => JSON.stringify(a));
    this.active = view.active;
    if (bridgeSolved(d, answers)) this.time = BRIDGE_DURATION;
  }
  d;
  time = 0;
  keys;
  pending = false;
  dwell = 0;
  trial = -1;
  delivered = false;
  active;
  update(v, dt, settled) {
    const answers = bridgeAnswers(this.d, v), keys = answers.map((a) => JSON.stringify(a));
    const changed = keys.some((key, i) => key !== this.keys[i]);
    if (changed) {
      this.pending = keys[v.active] !== this.keys[v.active];
      this.keys = keys;
      this.dwell = 0;
      this.time = 0;
    }
    if (v.active !== this.active) {
      this.active = v.active;
      this.pending = false;
      this.dwell = 0;
    }
    const all = bridgeSolved(this.d, answers), solved = machineReading(this.d.stages[v.active], v.answer).solved;
    let engage = false, finished = false;
    if (v.testing && v.trial !== this.trial) {
      this.trial = v.trial;
      this.time = 0;
      this.delivered = false;
      this.pending = false;
    }
    if (v.testing && !v.paused && dt > 0) {
      const duration = v.passed && all ? BRIDGE_DURATION : 0.85;
      this.time = v.reducedMotion ? duration : Math.min(duration, this.time + dt);
      if (this.time === duration && !this.delivered) {
        this.delivered = true;
        finished = true;
      }
    }
    if (!settled || !solved) this.dwell = 0;
    if (!v.testing && !v.completed && this.pending && solved && settled && !v.paused && dt > 0) {
      this.dwell += dt;
      if (this.dwell >= 0.32) {
        this.pending = false;
        engage = true;
      }
    }
    return { engage, finished, all };
  }
};

// src/app/templates/heist/escape/locks/bridge-cage/bridge-cage.model.ts
var vector = (p) => new Vector3(p[0], p[1], p[2]);
function createBridgeDiorama(art, d, labels = true) {
  const label = (...args) => {
    if (labels) dioramaLabel(art, ...args);
  };
  const [coordinateDefinition, cableDefinition] = bridgeParts(d);
  const root = new Group(), scenery = new Group(), coordinate = new Group(), cable = new Group();
  root.add(scenery, coordinate, cable);
  const surfaces = new DioramaSurfaces(art), stone = surfaces.stone(7834764), edge = surfaces.stone(4480608), wood = surfaces.wood(9729092), grass = art.material({ color: 6453829, roughness: 0.95 }), water = art.material({ color: 3441803, metalness: 0.35, roughness: 0.24 }), blue = art.material({ color: 7445925, emissive: 2312532, emissiveIntensity: 0.3 }), gridInk = art.material({ color: 5733243, roughness: 1 });
  art.box(scenery, -5.8, -0.3, 2.2, 15.6, 1.6, 9, edge);
  art.box(scenery, 12, -0.3, 2.2, 6, 1.6, 9, edge);
  art.box(scenery, 5.5, -0.8, 1.6, 7, 0.22, 12.5, water);
  for (const [center, width] of [
    [-5.8, 15.6],
    [12, 6]
  ]) {
    art.box(scenery, center, 0.58, 2.1, width, 0.24, 8.6, grass);
    art.box(scenery, center, 0.73, 3.4, width, 0.23, 3.85, stone);
    for (let x = center - width / 2 + 0.7; x < center + width / 2; x += 1.45)
      for (const z of [2.6, 4.15]) art.box(scenery, x, 0.87, z, 1.39, 0.05, 1.47, stone, 0.02);
  }
  for (const x of [1.75, 9.25]) {
    for (let z = -1; z <= 6; z += 1.2) art.box(scenery, x, 0.06, z, 0.42, 1.5, 1.14, stone);
    for (const z of [1.3, 5.7]) {
      art.box(scenery, x, 1.02, z, 0.65, 0.45, 0.68, stone);
      art.box(scenery, x, 2.06, z, 0.32, 1.7, 0.35, art.dark);
      art.cylinder(scenery, x, 2.99, z, 0.3, 0.18, art.brass);
    }
  }
  const ripple = new Group();
  root.add(ripple);
  for (let i = 0; i < 18; i++) {
    const line = art.box(
      ripple,
      2.5 + i % 4 * 1.65,
      -0.65,
      -3.9 + Math.floor(i / 4) * 2.3,
      0.75 + i % 3 * 0.15,
      0.014,
      0.065,
      blue,
      5e-3
    );
    line.castShadow = false;
  }
  for (let layer = 0; layer < 3; layer++) {
    const shape = new Shape();
    shape.moveTo(-18, -1);
    for (let x = -18; x <= 18; x += 0.8)
      shape.lineTo(
        x,
        3.5 + layer * 1.2 + Math.sin(x * 0.29 + layer) * 1.4 + Math.sin(x * 0.71 + layer) * 0.35
      );
    shape.lineTo(18, -1);
    shape.closePath();
    const ridge = art.mesh(
      new ShapeGeometry(shape),
      art.material({ color: [4154978, 5470071, 7508116][layer], roughness: 1 }),
      scenery,
      0,
      0,
      -4 - layer * 2
    );
    ridge.castShadow = false;
  }
  for (let i = 0; i < 14; i++) {
    const x = -14 + i * 2.15, y = 2.5 + Math.sin(x * 0.29) * 1.35;
    art.cylinder(scenery, x, y - 0.1, -3.7, 0.055, 1.4, wood);
    for (let j = 0; j < 3; j++) {
      const tree = art.mesh(
        new ConeGeometry(0.48 - j * 0.1, 0.85, 7),
        art.material({ color: i % 2 ? 2378306 : 3497292, roughness: 1 }),
        scenery,
        x,
        y + j * 0.4,
        -3.7
      );
      tree.castShadow = false;
    }
  }
  for (const x of [-12.6, -2.1, 13.8]) {
    for (let row = 0; row < 5; row++)
      art.box(scenery, x, 0.7 + row * 0.65, -2.2, 1.15, 0.61, 1.2, stone);
    art.box(scenery, x, 3.9, -2.2, 1.35, 0.35, 1.4, edge);
    for (const dx of [-0.4, 0.4]) art.box(scenery, x + dx, 4.25, -2.2, 0.4, 0.4, 1.4, stone);
  }
  art.box(scenery, -7.25, 6.6, -0.08, 10.2, 9.7, 0.5, art.dark);
  art.box(
    scenery,
    -7.25,
    6.6,
    0.23,
    9.7,
    9.2,
    0.15,
    art.material({ color: 1587520, roughness: 0.96 })
  );
  for (const x of [-12.25, -2.25]) art.box(scenery, x, 6.6, 0.3, 0.13, 9.7, 0.22, art.brass);
  for (const y of [1.8, 11.4]) art.box(scenery, -7.25, y, 0.3, 10.2, 0.14, 0.22, art.brass);
  for (const x of [-12, -2.5]) for (const y of [2.05, 11.12]) art.screw(scenery, x, y, 0.44);
  art.rod(scenery, new Vector3(-2.2, 2, 0.4), new Vector3(1.25, 2, 0.4), 0.09, art.steel);
  art.rod(scenery, new Vector3(1.25, 2, 0.4), new Vector3(1.25, 1.1, 1.3), 0.09, art.steel);
  const lamps = [0, 1].map((i) => {
    art.torus(scenery, -8.4 + i * 2.25, 2.24, 0.51, 0.13, 0.04);
    return art.mesh(new SphereGeometry(0.1, 12, 8), art.dark, root, -8.4 + i * 2.25, 2.24, 0.54);
  });
  label(scenery, "ANCHOR", -9.35, 2.25, 0.54, 1, 0.42);
  label(scenery, "CABLE", -7.1, 2.25, 0.54, 0.85, 0.42);
  for (let n = coordinateDefinition.min; n <= coordinateDefinition.max; n++) {
    const p = carriagePoint(coordinateDefinition, { x: n, y: n });
    art.box(
      coordinate,
      p[0],
      6.85,
      0.43,
      n === 0 ? 0.032 : 0.018,
      7.5,
      0.018,
      n === 0 ? art.brass : gridInk,
      4e-3
    ).castShadow = false;
    art.box(
      coordinate,
      -7.25,
      p[1],
      0.43,
      7.5,
      n === 0 ? 0.032 : 0.018,
      0.018,
      n === 0 ? art.brass : gridInk,
      4e-3
    ).castShadow = false;
    label(coordinate, String(n), p[0], 2.75, 0.51, 0.39, 0.53, "#ffffff");
    label(coordinate, String(n), -11.43, p[1], 0.51, 0.42, 0.53, "#ffffff");
  }
  label(coordinate, "X", -3.05, 2.8, 0.51, 0.35, 0.53);
  label(coordinate, "Y", -11.4, 10.98, 0.51, 0.35, 0.53);
  const xRail = art.box(coordinate, -11, 6.85, 0.65, 0.11, 7.65, 0.12, art.steel);
  const yRail = art.box(coordinate, -7.25, 3.1, 0.73, 7.65, 0.11, 0.12, art.steel);
  const carriage = new Group();
  coordinate.add(carriage);
  art.box(carriage, 0, 0, 0, 0.55, 0.55, 0.18, art.brass);
  art.torus(carriage, 0, 0, 0.13, 0.22, 0.055, art.steel);
  art.box(carriage, 0, 0, 0.14, 0.45, 0.023, 0.03, art.dark);
  art.box(carriage, 0, 0, 0.14, 0.023, 0.45, 0.03, art.dark);
  const wheel = (x, y) => {
    const group = new Group();
    group.position.set(x, y, 0.66);
    coordinate.add(group);
    art.torus(group, 0, 0, 0, 0.29, 0.05);
    for (const a of [0, Math.PI / 3, 2 * Math.PI / 3]) {
      const bar = art.box(group, 0, 0, 0, 0.58, 0.04, 0.055, art.steel);
      bar.rotation.z = a;
    }
    art.rod(group, new Vector3(0.25, 0, 0), new Vector3(0.25, 0, 0.17), 0.07, art.dark);
    batchMetalwork(art, group);
    return group;
  };
  const xWheel = wheel(-11, 2.36), yWheel = wheel(-11.92, 3.1);
  const anchors = cablePoints(cableDefinition);
  anchors.forEach((p, i) => {
    art.torus(cable, ...p, i === 0 || i === anchors.length - 1 ? 0.19 : 0.25, 0.05);
    label(cable, String.fromCharCode(65 + i), p[0], p[1] + 0.46, 0.91, 0.4, 0.62);
  });
  const routeLine = (a, b) => {
    for (let j = 0; j < 12; j++) {
      const start = vector(a).lerp(vector(b), j / 12), end = vector(a).lerp(vector(b), (j + 0.55) / 12);
      art.rod(cable, start, end, 0.018, blue);
    }
  };
  anchors.slice(1).forEach((p, i) => {
    routeLine(anchors[i], p);
    if (cableDefinition.mode === "route") {
      const a = cableDefinition.route[i], b = cableDefinition.route[i + 1];
      label(
        cable,
        `${Math.hypot(a.x - b.x, a.y - b.y)} u`,
        (p[0] + anchors[i][0]) / 2 + (a.x === b.x ? 0.68 : 0),
        (p[1] + anchors[i][1]) / 2 + (a.y === b.y ? 0.55 : 0),
        0.92,
        1.15,
        0.68
      );
    }
  });
  if (cableDefinition.mode === "diagonal") {
    const [a, b] = anchors, corner = [b[0], a[1], a[2]];
    routeLine(a, corner);
    routeLine(corner, b);
    const [p, q] = cableDefinition.route;
    label(cable, `${Math.abs(q.x - p.x)} u`, (a[0] + b[0]) / 2, a[1] - 0.48, 0.92, 1, 0.65);
    label(cable, `${Math.abs(q.y - p.y)} u`, b[0] + 0.55, (a[1] + b[1]) / 2, 0.92, 0.85, 0.65);
  }
  label(
    cable,
    `1 u = ${cableDefinition.scale} ${cableDefinition.unit}`,
    -7.25,
    10.72,
    0.65,
    3.3,
    0.7
  );
  const cableSegments = Array.from(
    { length: 60 },
    () => art.cylinder(cable, 0, 0, 0, 0.045, 1, art.rope)
  );
  const hook = new Group();
  cable.add(hook);
  art.mesh(new TorusGeometry(0.13, 0.043, 8, 20, Math.PI * 1.6), art.steel, hook);
  const deck = new Group();
  deck.position.set(2, 0.8, 3.4);
  root.add(deck);
  for (let i = 0; i < 14; i++) art.box(deck, 0.25 + i * 0.5, 0, 0, 0.47, 0.24, 4, wood);
  for (const z of [-1.7, 1.7]) {
    art.box(deck, 3.5, -0.2, z, 7, 0.23, 0.2, art.dark);
    art.box(deck, 3.5, 0.95, z, 7, 0.12, 0.13, wood);
    for (let x = 0.15; x <= 7; x += 1.12) {
      art.box(deck, x, 0.45, z, 0.13, 1, 0.13, art.dark);
      art.screw(deck, x, 0.03, z + 0.09);
    }
  }
  const drum = new Group();
  drum.position.set(1.35, 1.36, 1.35);
  root.add(drum);
  for (const z of [-0.28, 0.28]) art.torus(drum, 0, 0, z, 0.36, 0.07);
  for (let i = 0; i < 7; i++) art.torus(drum, 0, 0, -0.23 + i * 0.076, 0.27, 0.038, art.rope);
  art.box(scenery, 1.35, 1.04, 1.35, 0.95, 0.24, 1, art.dark);
  const pin = art.box(root, 1.35, 1.76, 1.35, 0.12, 0.65, 0.12, art.steel);
  const hoists = [1.7, 5.1].map(
    (z) => art.rod(root, new Vector3(1.75, 3, z), new Vector3(9, 0.85, z), 0.045, art.rope)
  );
  const gate = new Group();
  gate.position.set(1.1, 0.92, 3.55);
  root.add(gate);
  for (const x of [-2, 1.1])
    for (const z of [1.85, 5.3]) art.box(scenery, x, 2.38, z, 0.15, 3.1, 0.15, art.dark);
  for (const z of [1.85, 5.3]) {
    art.box(scenery, -0.45, 3.93, z, 3.4, 0.18, 0.2, wood);
    for (let x = -1.8; x < 1; x += 0.42) {
      if (z === 1.85) art.box(scenery, x, 2.37, z, 0.042, 2.95, 0.042, art.steel);
      else art.box(gate, x - 1.1, 1.46, 1.75, 0.045, 2.8, 0.045, art.steel);
    }
  }
  for (const y of [0.07, 2.82]) art.box(gate, -1.55, y, 1.75, 3.1, 0.13, 0.15, art.brass);
  art.box(scenery, -2, 4.15, 5.3, 0.13, 6.6, 0.13, art.dark);
  art.box(scenery, -0.45, 7.3, 5.3, 3.3, 0.16, 0.18, art.dark);
  for (const y of [0.07, 2.82]) art.box(gate, 0, y, 0, 0.15, 0.13, 3.5, art.brass);
  for (let z = -1.5; z <= 1.5; z += 0.38) art.box(gate, 0, 1.46, z, 0.055, 2.8, 0.055, art.steel);
  for (const z of [1.8, 5.3]) art.box(scenery, 1.1, 4.15, z, 0.13, 6.6, 0.13, art.dark);
  const bolt = art.box(root, 1.12, 1.75, 5.46, 0.13, 0.13, 0.8, art.brass);
  const trip = art.rod(
    root,
    new Vector3(1.9, 0.8, 5.6),
    new Vector3(1.12, 1.75, 5.6),
    0.055,
    art.steel
  );
  art.box(scenery, 1.1, 7.3, 3.55, 0.18, 0.16, 4, art.dark);
  const pulley = art.torus(scenery, 1.1, 7.3, 3.55, 0.28, 0.055);
  pulley.rotation.y = Math.PI / 2;
  const counterweight = new Group();
  root.add(counterweight);
  art.box(counterweight, 0, 0, 0, 0.48, 0.85, 0.52, art.dark);
  for (const y of [-0.3, 0, 0.3]) art.box(counterweight, 0, y, 0, 0.52, 0.07, 0.56, art.brass);
  const gateRopes = [
    art.rod(root, new Vector3(1.1, 6.05, 3.4), new Vector3(1.1, 3.74, 3.4), 0.038),
    art.rod(root, new Vector3(1.1, 6.05, 3.7), new Vector3(1.1, 4.9, 3.7), 0.038)
  ];
  const rabbits = Array.from({ length: d.presentation?.rabbits ?? 6 }, (_, i) => {
    const rabbit = createRabbit(
      art,
      art.material({ color: [13219994, 14865852, 9209727][i % 3], roughness: 0.95 }),
      i
    );
    rabbit.root.scale.multiplyScalar(0.68);
    root.add(rabbit.root);
    return rabbit;
  });
  for (const x of [-11.7, 10.5, 14.1])
    for (let i = 0; i < 6; i++) {
      const stem = art.box(
        scenery,
        x + i % 2 * 0.28,
        0.94,
        -0.9 + Math.floor(i / 2) * 0.24,
        0.035,
        0.5,
        0.035,
        grass
      );
      stem.rotation.z = (i - 2) * 0.1;
      art.mesh(
        new SphereGeometry(0.065, 8, 6),
        i % 2 ? art.glow : art.brass,
        scenery,
        stem.position.x,
        1.2,
        stem.position.z
      );
    }
  batchMetalwork(art, scenery);
  batchMetalwork(art, deck);
  batchMetalwork(art, gate);
  batchMetalwork(art, drum);
  batchMetalwork(art, carriage);
  batchMetalwork(art, counterweight);
  return {
    root,
    coordinate,
    cable,
    carriage,
    xRail,
    yRail,
    xWheel,
    yWheel,
    deck,
    gate,
    bolt,
    pin,
    drum,
    hoists,
    trip,
    cableSegments,
    hook,
    rabbits,
    lamps,
    ripple,
    gateRopes,
    counterweight
  };
}
function positionBridgeDiorama(art, model, d, answers, active, time, age, preview) {
  const [coordinate, cable] = bridgeParts(d), a = answers[0], b = answers[1];
  const position = preview ?? (a.kind === "coordinate" ? a : { x: 0, y: 0 }), p = carriagePoint(coordinate, position);
  model.coordinate.visible = active === 0;
  model.cable.visible = active === 1;
  model.carriage.position.set(...p);
  model.xRail.position.x = p[0];
  model.yRail.position.y = p[1];
  model.xWheel.position.x = p[0];
  model.yWheel.position.y = p[1];
  model.xWheel.rotation.z = -position.x * Math.PI / 2;
  model.yWheel.rotation.z = position.y * Math.PI / 2;
  const fitted = fittedCable(cable, b.kind === "cable" ? b.cable : -1);
  model.cableSegments.forEach((segment, i) => {
    segment.visible = i + 1 < fitted.points.length;
    if (segment.visible)
      art.positionRod(segment, vector(fitted.points[i]), vector(fitted.points[i + 1]));
    segment.material = fitted.state === "taut" ? art.glow : art.rope;
  });
  model.hook.visible = fitted.points.length > 0;
  if (model.hook.visible) model.hook.position.copy(vector(fitted.points.at(-1)));
  model.lamps.forEach(
    (lamp, i) => lamp.material = machineReading(d.stages[i], answers[i]).solved ? art.glow : art.dark
  );
  const release = bridgeRelease(time);
  model.deck.rotation.z = (1 - release.deck) * 1.24;
  model.deck.updateMatrixWorld(true);
  model.hoists.forEach((rope, i) => {
    const end = model.deck.localToWorld(new Vector3(6.8, 0.28, i ? 1.7 : -1.7));
    art.positionRod(rope, new Vector3(1.75, 3, i ? 5.1 : 1.7), end);
  });
  model.gate.position.y = 0.92 + release.gate * 3.15;
  model.counterweight.position.set(1.1, 6.8 - release.gate * 3.15, 3.7);
  art.positionRod(
    model.gateRopes[0],
    new Vector3(1.1, 7.3, 3.4),
    new Vector3(1.1, model.gate.position.y + 2.82, 3.4)
  );
  art.positionRod(
    model.gateRopes[1],
    new Vector3(1.1, 7.3, 3.7),
    new Vector3(1.1, model.counterweight.position.y + 0.43, 3.7)
  );
  model.bolt.position.z = 5.46 + release.bolt * 0.72;
  model.pin.position.y = 1.76 + release.pin * 0.65;
  model.drum.rotation.z = -release.deck * Math.PI * 3;
  model.trip.rotation.z = -release.bolt * 0.4;
  model.ripple.position.z = Math.sin(age * 0.45) * 0.18;
  let escaped = 0;
  model.rabbits.forEach((rig, i) => {
    const pose = crossingRabbit(i, time, age);
    rig.root.position.set(pose.x - (pose.progress === 0 && i >= 3 ? 0.5 : 0), pose.y, pose.z);
    rig.root.rotation.y = pose.yaw;
    rig.body.rotation.x = pose.pitch;
    rig.head.rotation.y = pose.progress === 0 ? Math.sin(age * 0.7 + i) * 0.12 : 0;
    rig.ears.forEach((ear) => ear.rotation.x = pose.ear);
    rig.legs.forEach((leg, j) => leg.rotation.x = pose.leg * (j < 2 ? -1 : 1));
    if (pose.escaped) escaped++;
  });
  return { fitted, release, escaped };
}

// src/app/templates/heist/escape/locks/bridge-cage/bridge-cage.scene.ts
function mountBridgeCage(parent, d, snapshot, cb) {
  const root = document.createElement("div");
  root.dataset["bridgeCage"] = "";
  root.innerHTML = bridgeCageLayout;
  parent.append(root);
  const q = (selector) => root.querySelector(selector);
  const action = (name) => q(`[data-action=${name}]`);
  const [coordinate, cable] = bridgeParts(d), sound = new TimingCageSound();
  let viewer, gone = false, frame = 0;
  const focuses = {
    all: { center: [0.5, 5, 1.9], width: 29, height: 13.4 },
    drive: { center: [-7.25, 6.5, 0.6], width: 10.8, height: 10.6 },
    cage: { center: [5.7, 3.5, 3.6], width: 19.5, height: 10.1 },
    following: { center: [0, 2.3, 3.5], width: 8.2, height: 7.1 },
    rabbits: { center: [11.8, 1.9, 3.6], width: 5.8, height: 5 }
  };
  try {
    viewer = new DioramaViewer(root, "bridge", focuses, () => {
      destroy();
      cb.failed();
    });
  } catch {
    root.remove();
    sound.destroy();
    cb.failed();
    return { destroy() {
    } };
  }
  viewer.renderer.setClearColor(2378063);
  viewer.scene.environmentIntensity = 0.62;
  viewer.canvas.tabIndex = 0;
  const model = createBridgeDiorama(viewer.art, d);
  viewer.scene.add(model.root);
  const sequence = new BridgeSequence(d, snapshot());
  const axes = {
    x: q("[data-axis=x]"),
    y: q("[data-axis=y]")
  };
  cable.cables.forEach((item, i) => {
    const button = document.createElement("button");
    button.type = "button";
    button.dataset["cable"] = String(i);
    button.setAttribute("aria-label", `Fit ${item.label} cable`);
    button.setAttribute("aria-pressed", "false");
    button.innerHTML = '<svg viewBox="0 0 40 40" aria-hidden="true"><circle cx="20" cy="20" r="17" fill="#203f43" stroke="#dfc285" stroke-width="3"/><circle cx="20" cy="20" r="11" fill="none" stroke="#ba9868" stroke-width="5"/><circle cx="20" cy="20" r="4" fill="#92a8a6"/></svg>';
    const label = document.createElement("span");
    label.textContent = item.label;
    button.append(label);
    q("[data-cables]").append(button);
  });
  let previous = performance.now(), age = 0, lastRelease = 0, ui = "", feedback = "", changedAt = -1, lastKey = JSON.stringify(bridgeAnswers(d, snapshot())), oldStage = snapshot().active, suspended = false;
  let drag;
  const view = () => __spreadProps(__spreadValues({}, snapshot()), {
    reducedMotion: snapshot().reducedMotion
  });
  const operable = () => !gone && !snapshot().paused && !snapshot().testing && !snapshot().completed;
  const position = () => {
    const a = bridgeAnswers(d, snapshot())[0];
    return a.kind === "coordinate" ? a : { x: 0, y: 0 };
  };
  const commit = (p) => {
    if (!operable() || snapshot().active !== 0) return;
    cb.input({ type: "point", x: p.x, y: p.y });
    sound.play("tick");
  };
  const step = (axis, delta) => {
    const p = position();
    commit(__spreadProps(__spreadValues({}, p), { [axis]: Math.max(coordinate.min, Math.min(coordinate.max, p[axis] + delta)) }));
  };
  const cancel = () => {
    const id = drag?.id;
    drag = void 0;
    if (id !== void 0 && root.hasPointerCapture(id)) root.releasePointerCapture(id);
  };
  const ray = new Raycaster(), plane = new Plane(new Vector3(0, 0, 1), -0.8);
  const pointer = (event) => {
    const rect = viewer.canvas.getBoundingClientRect();
    ray.setFromCamera(
      new Vector2(
        (event.clientX - rect.left) / rect.width * 2 - 1,
        1 - (event.clientY - rect.top) / rect.height * 2
      ),
      viewer.camera
    );
    return ray.ray.intersectPlane(plane, new Vector3());
  };
  const down = (event) => {
    if (!operable() || snapshot().active !== 0 || event.button !== 0 || event.target !== viewer.canvas)
      return;
    const p = pointer(event), current = carriagePoint(coordinate, position());
    if (!p || p.distanceTo(new Vector3(...current)) > 0.8) return;
    event.preventDefault();
    sound.unlock();
    viewer.canvas.focus({ preventScroll: true });
    drag = {
      id: event.pointerId,
      point: position(),
      moved: false,
      x: event.clientX,
      y: event.clientY
    };
    root.setPointerCapture(event.pointerId);
  };
  const move = (event) => {
    if (!drag || drag.id !== event.pointerId) return;
    if (!operable()) {
      cancel();
      return;
    }
    const p = pointer(event);
    if (!p) return;
    drag.moved ||= Math.hypot(event.clientX - drag.x, event.clientY - drag.y) > 5;
    if (drag.moved) drag.point = carriageInput(coordinate, p.x, p.y);
  };
  const up = (event) => {
    if (!drag || drag.id !== event.pointerId) return;
    const current = drag;
    cancel();
    if (current.moved) commit(current.point);
  };
  const start = () => {
    if (operable() && !drag) {
      cb.engage?.();
      action("pause").focus({ preventScroll: true });
    }
  };
  const click = (event) => {
    const button = event.target.closest("button");
    if (!button || button.disabled) return;
    sound.unlock();
    if (button.dataset["stage"] !== void 0) {
      cancel();
      cb.stage?.(Number(button.dataset["stage"]));
      return;
    }
    if (button.dataset["cable"] !== void 0) {
      if (operable() && snapshot().active === 1) {
        cb.input({ type: "cable", index: Number(button.dataset["cable"]) });
        sound.play("tick");
      }
      return;
    }
    if (button.dataset["focus"]) {
      cancel();
      viewer.setFocus(button.dataset["focus"]);
      return;
    }
    switch (button.dataset["action"]) {
      case "xminus":
        step("x", -1);
        break;
      case "xplus":
        step("x", 1);
        break;
      case "yminus":
        step("y", -1);
        break;
      case "yplus":
        step("y", 1);
        break;
      case "test":
        start();
        break;
      case "replay":
        if (!snapshot().paused && !snapshot().testing) {
          cb.replay?.();
          action("pause").focus({ preventScroll: true });
        }
        break;
      case "pause":
        cancel();
        cb.pause?.();
        break;
      case "expand":
        cancel();
        viewer.expand(!viewer.expanded);
        break;
      case "reset":
        if (operable()) {
          cancel();
          cb.input({ type: "reset" });
          viewer.setFocus("drive");
        }
        break;
    }
  };
  const key = (event) => {
    if (event.key === "Escape") cancel();
    if (event.target !== viewer.canvas || snapshot().active !== 0) return;
    const arrows = {
      ArrowLeft: ["x", -1],
      ArrowRight: ["x", 1],
      ArrowUp: ["y", 1],
      ArrowDown: ["y", -1]
    };
    if (arrows[event.key]) {
      event.preventDefault();
      step(...arrows[event.key]);
    }
  };
  root.addEventListener("click", click);
  root.addEventListener("keydown", key);
  root.addEventListener("pointerdown", down);
  root.addEventListener("pointermove", move);
  root.addEventListener("pointerup", up);
  root.addEventListener("pointercancel", cancel);
  function tick(now) {
    if (gone) return;
    const v = view(), paused = v.paused || document.hidden, dt = paused ? 0 : Math.min(0.1, Math.max(0, (now - previous) / 1e3));
    previous = now;
    age += dt;
    if (paused !== suspended) {
      suspended = paused;
      if (paused) {
        cancel();
        sound.suspend();
      } else sound.resume();
    }
    if (v.active !== oldStage) {
      oldStage = v.active;
      cancel();
      viewer.setFocus("drive");
    }
    const answers = bridgeAnswers(d, v), answerKey = JSON.stringify(answers);
    if (answerKey !== lastKey) {
      lastKey = answerKey;
      changedAt = age;
    }
    const settled = !drag && age - changedAt > 0.18, result = sequence.update(v, dt, settled);
    cb.settled(settled);
    if (result.engage) start();
    const release = result.all ? sequence.time : 0, shown = drag?.point ?? position();
    const state = positionBridgeDiorama(
      viewer.art,
      model,
      d,
      answers,
      v.active,
      release,
      v.reducedMotion ? 0 : age,
      drag?.point
    );
    const rabbitXs = model.rabbits.map((rabbit) => rabbit.root.position.x);
    focuses["following"] = {
      center: [(Math.min(...rabbitXs) + Math.max(...rabbitXs)) / 2, 2.3, 3.5],
      width: 8.2,
      height: 7.1
    };
    if (v.testing && release > 0.65 && lastRelease <= 0.65) viewer.setFocus("cage");
    if (v.testing && release > 4.3 && lastRelease <= 4.3 && viewer.viewport.clientWidth < 650)
      viewer.setFocus("following");
    if (v.testing && release >= BRIDGE_DURATION && lastRelease < BRIDGE_DURATION && viewer.viewport.clientWidth < 650)
      viewer.setFocus("rabbits");
    if (release === 0 && lastRelease > 0) viewer.setFocus("drive");
    if (dt > 0 && !v.reducedMotion) {
      for (const [time, cue] of [
        [0.6, "latch"],
        [3.1, "door"],
        [13.7, "free"]
      ])
        if (release >= time && lastRelease < time) sound.play(cue);
    }
    lastRelease = release;
    const can = operable(), reading = machineReading(d.stages[v.active], v.answer);
    const uiKey = JSON.stringify([v.active, shown, answers, can, v.testing, v.paused, v.completed]);
    if (ui !== uiKey) {
      ui = uiKey;
      root.querySelectorAll("[data-stage]").forEach((button, i) => {
        button.setAttribute("aria-pressed", String(i === v.active));
        button.disabled = v.testing || v.paused || !v.freelySelectStages && i !== v.active && !(i === v.active + 1 && v.completed);
        q(`[data-status="${i}"]`).textContent = machineReading(d.stages[i], answers[i]).solved ? "\u2713" : "";
      });
      q("[data-rails]").hidden = v.active !== 0;
      q("[data-cables]").hidden = v.active !== 1;
      for (const axis of ["x", "y"]) {
        axes[axis].value = String(shown[axis]);
      }
      for (const name of ["xminus", "xplus", "yminus", "yplus", "reset"])
        action(name).disabled = !can;
      action("xminus").disabled ||= shown.x <= coordinate.min;
      action("xplus").disabled ||= shown.x >= coordinate.max;
      action("yminus").disabled ||= shown.y <= coordinate.min;
      action("yplus").disabled ||= shown.y >= coordinate.max;
      root.querySelectorAll("[data-cable]").forEach((button, i) => {
        button.disabled = !can;
        button.setAttribute(
          "aria-pressed",
          String(answers[1].kind === "cable" && answers[1].cable === i)
        );
      });
      action("test").disabled = !can || reading.solved;
      action("test").hidden = reading.solved;
      action("replay").hidden = !result.all;
      action("replay").disabled = v.testing || v.paused;
      action("pause").textContent = v.paused ? "Resume" : "Pause";
      action("pause").setAttribute("aria-pressed", String(v.paused));
    }
    const message = v.paused ? "Workshop paused." : result.all ? release >= BRIDGE_DURATION ? `${state.escaped} rabbits across. The bridge and holding gate stay open.` : release < 0.75 ? "Both interlocks align. The bridge pin withdraws\u2026" : release < 2.9 ? "The drum unwinds. Watch the bridge settle onto its far support." : release < 4.3 ? "Bridge secured. Its linkage lifts the holding gate." : `${state.escaped} / ${model.rabbits.length} rabbits across. Watch their staggered hops.` : reading.solved ? v.active === 0 ? "Anchor docked. Select Cable rig to finish the crossing." : "Cable taut. Align the Anchor rails to release the bridge." : v.active === 0 ? `Carriage (${shown.x}, ${shown.y}). Drag the brass handle or turn the X/Y controls.` : state.fitted.state === "short" ? "Too short: the hook cannot reach the final anchor." : state.fitted.state === "slack" ? "Too long: the sag leaves the spring loose." : "Select a reel to fit its cable around the marked route.";
    if (message !== feedback) {
      feedback = message;
      q(".bc-feedback").textContent = message;
    }
    root.dataset["position"] = `${position().x},${position().y}`;
    root.dataset["previewPosition"] = `${shown.x},${shown.y}`;
    root.dataset["release"] = release.toFixed(2);
    root.dataset["escaped"] = String(state.escaped);
    root.dataset["cableFit"] = state.fitted.state;
    viewer.canvas.setAttribute(
      "aria-label",
      `Bridge workshop. Anchor (${shown.x}, ${shown.y}). Cable ${state.fitted.state}. Bridge ${state.release.deck === 1 ? "down" : "raised"}. Holding gate ${state.release.gate === 1 ? "open" : "closed"}. ${state.escaped} rabbits across. Arrow keys move the selected anchor; matching controls below.`
    );
    if (!document.hidden) viewer.render(dt, v.reducedMotion);
    root.dataset["drawCalls"] = String(viewer.renderer.info.render.calls);
    if (result.finished) cb.finished();
    frame = requestAnimationFrame(tick);
  }
  cb.ready();
  frame = requestAnimationFrame(tick);
  function destroy() {
    if (gone) return;
    gone = true;
    cancelAnimationFrame(frame);
    cancel();
    root.removeEventListener("click", click);
    root.removeEventListener("keydown", key);
    root.removeEventListener("pointerdown", down);
    root.removeEventListener("pointermove", move);
    root.removeEventListener("pointerup", up);
    root.removeEventListener("pointercancel", cancel);
    sound.destroy();
    viewer?.destroy();
    root.remove();
  }
  return { destroy };
}

// src/app/templates/heist/escape/locks/machine.scene.ts
var renderers = {
  "fraction-gear": (s) => fractionRenderer(s, s.d),
  "timing-wheels": (s) => timingRenderer(s, s.d),
  volume: (s) => volumeRenderer(s, s.d),
  mixing: (s) => mixingRenderer(s, s.d),
  coordinate: (s) => coordinateRenderer(s, s.d),
  reflection: (s) => reflectionRenderer(s, s.d),
  cable: (s) => cableRenderer(s, s.d)
};
function mountMachineScene(parent, definition, snapshot, callbacks) {
  if (definition.presentation?.kind === "bridge-cage")
    return mountBridgeCage(parent, definition, snapshot, callbacks);
  const timing = definition.stages[0];
  if (definition.stages.length === 1 && timing.kind === "reflection" && timing.presentation?.kind === "optics-cage")
    return mountOpticsCage(parent, timing, snapshot, callbacks);
  if (definition.stages.length === 1 && timing.kind === "fraction-gear" && timing.presentation?.kind === "fraction-cage")
    return mountFractionCage(parent, timing, snapshot, callbacks);
  if (definition.stages.length === 1 && timing.kind === "timing-wheels" && timing.presentation?.kind === "timing-cage")
    return mountTimingCage(parent, timing, snapshot, callbacks);
  class Workshop extends __webpack_exports__Scene {
    surface;
    mechanism;
    active = -1;
    trial = -1;
    elapsed = 0;
    clock = 0;
    settled = true;
    done = false;
    rig;
    label;
    preload() {
      this.load.image("workshop", definition.backdrop);
      this.load.on("loaderror", () => callbacks.failed());
    }
    create() {
      if (this.textures.exists("workshop"))
        this.add.image(720, 340, "workshop").setDisplaySize(1440, 680);
      this.add.rectangle(720, 340, 1440, 680, 202268, 0.44);
      const panel = this.add.graphics();
      panel.fillStyle(466725, 0.78).fillRoundedRect(120, 85, 955, 570, 24);
      panel.lineStyle(2, 10389337, 0.6).strokeRoundedRect(120, 85, 955, 570, 24);
      this.add.text(155, 106, "PRECISION WORKSHOP  /  CASTLE ENGINEERING", {
        fontFamily: "Trebuchet MS",
        fontSize: "15px",
        color: "#c6b38d",
        letterSpacing: 3
      });
      this.rig = this.add.graphics().setDepth(5);
      this.label = this.add.text(1248, 596, "RELEASE LOCKED", {
        fontFamily: "Trebuchet MS",
        fontSize: "17px",
        color: "#e9d2a1"
      }).setOrigin(0.5).setDepth(12);
      this.input.dragDistanceThreshold = 7;
      this.events.once("shutdown", () => {
        this.mechanism?.destroy();
      });
      callbacks.ready();
    }
    update(_time, milliseconds) {
      const v = snapshot();
      const dt = v.paused || document.hidden ? 0 : Math.min(milliseconds / 1e3, 0.05);
      this.clock += dt;
      if (v.active !== this.active) {
        this.mechanism?.destroy();
        this.active = v.active;
        this.surface = new MachineSurface(this, definition.stages[v.active], snapshot, callbacks);
        this.mechanism = renderers[this.surface.d.kind](this.surface);
        this.trial = -1;
        this.elapsed = 0;
      }
      if (v.trial !== this.trial) {
        this.trial = v.trial;
        this.elapsed = 0;
        this.done = false;
      }
      if (v.testing) this.elapsed += dt * (v.reducedMotion ? 8 : 1);
      this.mechanism.draw(v, dt, this.clock);
      const settled = this.mechanism.settled();
      if (settled !== this.settled) {
        this.settled = settled;
        callbacks.settled(settled);
      }
      const release = v.testing ? v.passed ? this.elapsed : 0 : v.completed ? 5 : 0;
      this.drawRelease(release, v.testing && !v.passed ? Math.sin(this.elapsed * 35) * 3 : 0);
      if (v.testing && !v.paused && !document.hidden && !this.done && this.elapsed >= (v.passed ? 4.6 : 1.3)) {
        this.done = true;
        callbacks.finished();
      }
    }
    drawRelease(t, shake) {
      const g = this.rig;
      g.clear();
      const clamp4 = __webpack_exports__Math.Clamp;
      const pin = clamp4(t / 0.8, 0, 1), weight = clamp4((t - 1) / 1.3, 0, 1), gate = clamp4((t - 2.4) / 1.7, 0, 1);
      g.fillStyle(201495, 0.94).fillRoundedRect(1120, 155, 260, 390, 22);
      g.lineStyle(9, 9270605).strokeRoundedRect(1120, 155, 260, 390, 22);
      g.fillStyle(5692084, 0.05 + gate * 0.2).fillRect(1137, 178, 226, 348);
      g.lineStyle(13, 14793842).lineBetween(1080, 280 + shake, 1150 - pin * 65, 280 + shake);
      g.lineStyle(3, 12428909).lineBetween(1150, 205, 1350, 205);
      g.lineBetween(1350, 205, 1350, 320 + weight * 145);
      g.fillStyle(11637333).fillRoundedRect(1330, 315 + weight * 145, 40, 54, 6);
      g.lineStyle(6, 12755563).strokeCircle(1350, 205, 19);
      g.lineStyle(3, 5596007).strokeCircle(1350, 205, 9);
      const bottom = 524 - gate * 332;
      g.lineStyle(13, 1321776);
      for (let x = 1152; x <= 1312; x += 32) g.lineBetween(x + 3, 188, x + 3, bottom);
      g.lineStyle(8, 10331792);
      for (let x = 1152; x <= 1312; x += 32) g.lineBetween(x, 188, x, bottom);
      g.lineStyle(11, 11836777).lineBetween(1140, bottom, 1326, bottom);
      for (let i = 0; i < 3; i++) {
        g.fillStyle(t > i * 1.2 + 0.3 ? 7137464 : 2703168).fillCircle(1200 + i * 40, 565, 8);
      }
      this.label.setText(
        gate === 1 ? "PASSAGE RELEASED" : t > 0 ? "MECHANISM ENGAGING" : "RELEASE LOCKED"
      );
    }
  }
  const game = new __webpack_exports__Game({
    type: __webpack_exports__AUTO,
    parent,
    width: 1440,
    height: 680,
    backgroundColor: "#06151b",
    scene: [Workshop],
    banner: false,
    audio: { noAudio: true },
    scale: { mode: __webpack_exports__Scale.FIT, autoCenter: __webpack_exports__Scale.CENTER_BOTH },
    render: { antialias: true },
    callbacks: {
      postBoot: (g) => {
        g.canvas.setAttribute("role", "img");
        g.canvas.setAttribute(
          "aria-label",
          "Interactive mechanical math workshop. Matching keyboard controls are available below."
        );
      }
    }
  });
  const resize = new ResizeObserver(
    () => game.scale.setParentSize(parent.clientWidth, parent.clientHeight)
  );
  resize.observe(parent);
  return {
    destroy: () => {
      resize.disconnect();
      game.destroy(true);
    }
  };
}
export {
  mountMachineScene
};
//# debugId=384175db-25de-5020-8e6d-e3f441e6152c
//# sourceMappingURL=chunk-LC3XGVP5.js.map
