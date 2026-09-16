import {
  clone
} from "./chunk-64YYTSR5.js";
import {
  DioramaViewer,
  TimingCageSound
} from "./chunk-WB6JVIDO.js";
import {
  DioramaSurfaces,
  batchMetalwork
} from "./chunk-KI3SHDPD.js";
import {
  GLTFLoader
} from "./chunk-BWIMRADB.js";
import "./chunk-4GBFXHP3.js";
import {
  evaluateGearLock,
  gearFeedback,
  gearMotion,
  releaseFrame
} from "./chunk-RAYONVPN.js";
import {
  AnimationMixer,
  Box3,
  ExtrudeGeometry,
  Group,
  Mesh,
  Path,
  Shape,
  SkinnedMesh,
  SphereGeometry,
  Texture,
  Vector3
} from "./chunk-E3MFW572.js";
import {
  __webpack_exports__AUTO,
  __webpack_exports__Game,
  __webpack_exports__Scale,
  __webpack_exports__Scene
} from "./chunk-DKBEUOCQ.js";
import {
  __spreadProps,
  __spreadValues
} from "./chunk-GOMI4DH3.js";

// src/app/templates/heist/escape/gear-lock/gear-lock.art.ts
var gearRadius = (teeth) => teeth * 2.7;
function createGearTexture(scene, teeth, silver = false) {
  const key = `cog-${teeth}-${silver}`;
  if (scene.textures.exists(key)) return key;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = 400;
  const c = canvas.getContext("2d");
  c.translate(200, 200);
  const pitch = 174, depth = pitch * Math.PI / teeth * 0.48;
  const path = () => {
    c.beginPath();
    for (let i = 0; i < teeth * 4; i++) {
      const angle = i / (teeth * 4) * Math.PI * 2;
      const r = pitch + (i % 4 === 1 || i % 4 === 2 ? depth : -depth);
      const x = Math.cos(angle) * r, y = Math.sin(angle) * r;
      if (i === 0) c.moveTo(x, y);
      else c.lineTo(x, y);
    }
    c.closePath();
  };
  c.save();
  c.translate(0, 9);
  path();
  c.fillStyle = "#1b1611";
  c.shadowColor = "#000";
  c.shadowBlur = 15;
  c.fill();
  c.restore();
  const metal = c.createLinearGradient(-150, -180, 160, 190);
  const colors = silver ? ["#c9eae4", "#508e90", "#d1f3db", "#225259"] : ["#fff0bc", "#b38440", "#f5d28a", "#684521"];
  colors.forEach((color, i) => metal.addColorStop(i / 3, color));
  path();
  c.fillStyle = metal;
  c.fill();
  c.strokeStyle = silver ? "#9dcac7" : "#f4d8a0";
  c.lineWidth = 2;
  c.stroke();
  for (const [r, color, width] of [
    [145, "#33291e", 4],
    [140, colors[0], 2],
    [66, "#291f18", 4],
    [62, colors[0], 2]
  ]) {
    c.beginPath();
    c.arc(0, 0, r, 0, Math.PI * 2);
    c.strokeStyle = color;
    c.lineWidth = width;
    c.stroke();
  }
  for (let i = 0; i < 6; i++) {
    c.save();
    c.rotate(i * Math.PI / 3);
    c.beginPath();
    c.roundRect(77, -23, 49, 46, 15);
    c.fillStyle = "#10282b";
    c.fill();
    c.strokeStyle = "#655136";
    c.lineWidth = 3;
    c.stroke();
    c.restore();
  }
  const hub = c.createRadialGradient(-15, -20, 3, 0, 0, 60);
  hub.addColorStop(0, colors[1]);
  hub.addColorStop(1, "#253439");
  c.beginPath();
  c.arc(0, 0, 57, 0, Math.PI * 2);
  c.fillStyle = hub;
  c.fill();
  c.fillStyle = "#fff3cc";
  c.beginPath();
  c.moveTo(0, -164);
  c.lineTo(-8, -149);
  c.lineTo(8, -149);
  c.closePath();
  c.fill();
  for (let i = 0; i < 90; i++) {
    const a = i * 2.399, r = 70 + i * 29 % 65;
    c.fillStyle = "#fff2cd20";
    c.fillRect(Math.cos(a) * r, Math.sin(a) * r, 2, 1);
  }
  scene.textures.addCanvas(key, canvas);
  return key;
}
function plate(scene, x, y, text, width = 180) {
  const root = scene.add.container(x, y);
  const shadow = scene.add.rectangle(3, 5, width, 40, 0, 0.5);
  const board = scene.add.rectangle(0, 0, width, 40, 1125166).setStrokeStyle(1, 9532489);
  const label = scene.add.text(0, 0, text, {
    fontFamily: "Trebuchet MS",
    fontSize: "15px",
    color: "#f3dfaf",
    align: "center"
  }).setOrigin(0.5);
  root.add([shadow, board, label]);
  for (const side of [-1, 1]) root.add(scene.add.circle(side * (width / 2 - 8), 0, 2, 12688216));
  return root;
}

// src/app/templates/heist/escape/gear-lock/gear-release.scene.ts
var GearReleaseRig = class {
  constructor(scene, modules) {
    this.scene = scene;
    this.modules = modules;
    this.g = scene.add.graphics().setDepth(8);
  }
  scene;
  modules;
  g;
  draw(elapsed, outputX, outputY, drumTurns) {
    const p = releaseFrame(this.modules, elapsed).progress, g = this.g;
    g.clear();
    const line = (x1, y1, x2, y2, width = 5, color = 11768153) => {
      g.lineStyle(width + 3, 463639, 0.8).lineBetween(x1 + 2, y1 + 3, x2 + 2, y2 + 3);
      g.lineStyle(width, color).lineBetween(x1, y1, x2, y2);
      g.lineStyle(1, 16573088, 0.55).lineBetween(x1 - 1, y1 - 1, x2 - 1, y2 - 1);
    };
    line(outputX, outputY - 28, 780, 190, 5, 7627082);
    line(outputX, outputY + 28, 780, 250, 5, 7627082);
    g.fillStyle(3155998).fillCircle(780, 220, 34);
    g.lineStyle(5, 13017189).strokeCircle(780, 220, 31);
    const a = drumTurns * Math.PI * 2;
    line(780, 220, 780 + 24 * Math.sin(a), 220 - 24 * Math.cos(a), 4);
    g.fillStyle(16372878).fillCircle(780, 220, 6);
    line(811, 225 - p.drive * 28, 825, 225 - p.drive * 28, 5, 7519414);
    line(811, 240, 928, 288, 6);
    line(928, 288, 885, 321, 6);
    line(885, 321, 991, 354, 6);
    line(811, 252, 928, 300, 3);
    line(928, 300, 885, 333, 3);
    line(885, 333, 991, 366, 3);
    const route = [
      [817, 231],
      [925, 279],
      [884, 312],
      [990, 345]
    ];
    const along = Math.min(2.999, p.ball * 3), i = Math.floor(along), u = along - i;
    const bx = route[i][0] + (route[i + 1][0] - route[i][0]) * u, by = route[i][1] + (route[i + 1][1] - route[i][1]) * u;
    g.fillStyle(0, 0.4).fillEllipse(bx + 3, by + 8, 23, 8);
    g.fillStyle(7439494).fillCircle(bx, by, 10);
    g.fillStyle(13493211).fillCircle(bx - 2, by - 3, 7);
    g.fillStyle(16777215).fillCircle(bx - 4, by - 5, 2);
    const hammerAngle = -0.85 + Math.sin(p.hammer * Math.PI / 2) * 1.6;
    const hx = 1002 + Math.sin(hammerAngle) * 60, hy = 294 + Math.cos(hammerAngle) * 60;
    line(1002, 294, hx, hy, 9, 8675908);
    g.fillStyle(12688996).fillCircle(1002, 294, 8);
    g.fillStyle(1518897).fillRoundedRect(hx - 15, hy - 7, 38, 24, 4);
    g.fillStyle(6322814).fillRoundedRect(hx - 19, hy - 12, 38, 24, 4);
    g.lineStyle(2, 12308677).strokeRoundedRect(hx - 19, hy - 12, 38, 24, 4);
    g.fillStyle(12636614, 0.65).fillRect(hx - 15, hy - 9, 30, 3);
    line(1040 + p.hammer * 30, 351, 1060 + p.hammer * 30, 351, 7, 15056245);
    const wy = 272 + p.weight * 124;
    line(1062, 156, 1062, wy, 2, 12694414);
    line(1062, wy, 1080, wy, 2, 12694414);
    g.lineStyle(4, 12952946).strokeCircle(1080, 156, 18);
    line(1098, 156, 1110, 410, 2, 12694414);
    g.fillStyle(857883, 0.5).fillRoundedRect(1059, wy + 6, 45, 56, 5);
    g.fillStyle(8413754).fillRoundedRect(1055, wy, 45, 56, 5);
    g.lineStyle(2, 14137462).strokeRoundedRect(1055, wy, 45, 56, 5);
    g.fillStyle(14729085, 0.45).fillRect(1058, wy + 4, 38, 5);
    g.fillStyle(4142117).fillRect(1094, wy + 9, 4, 43);
    for (const x of [1062, 1093])
      for (const y of [wy + 7, wy + 48]) g.fillStyle(14336653).fillCircle(x, y, 2);
    line(1063, wy + 12, 1091, wy + 12, 2, 14795915);
    line(1110, 418, 1275, 418, 7);
    for (let n = 0; n < 6; n++) {
      const fall = Math.max(0, Math.min(1, p.domino * 7 - n)), angle = fall * 1.35, x = 1113 + n * 26;
      line(
        x,
        414,
        x + Math.sin(angle) * 39,
        414 - Math.cos(angle) * 39,
        9,
        n % 2 ? 9088688 : 14003303
      );
    }
    const gateY = 455 - p.gate * 165;
    line(1276, 405, 1294 + p.domino * 20, 405, 5, 12690284);
    if (gateY > 299)
      for (let n = 0; n < 7; n++) line(1161 + n * 25, 299, 1161 + n * 25, gateY, 8, 7307905);
    for (const y of [gateY - 125, gateY - 25]) if (y > 299) line(1156, y, 1317, y, 10, 11967339);
    g.fillStyle(1254180).fillRoundedRect(1143, 264, 186, 35, 7);
    g.lineStyle(2, 9140563).strokeRoundedRect(1143, 264, 186, 35, 7);
    if (p.gate > 0) {
      g.fillStyle(16766854, p.gate * 0.13).fillTriangle(1190, 345, 1120, 470, 1340, 470);
      for (let n = 0; n < 18; n++) {
        const k = (p.gate + n * 0.061) % 1;
        g.fillStyle(16770730, (1 - k) * 0.8).fillCircle(
          1150 + n * 47 % 170,
          470 - k * 150,
          1.5
        );
      }
    }
  }
};

// src/app/templates/heist/escape/gear-lock/gear-cage/gear-cage.motion.ts
var FOX_TRAVEL_SECONDS = 5.2;
var FOX_DELAY_SECONDS = 0.65;
var clamp = (v) => Math.max(0, Math.min(1, v));
var smooth = (v) => {
  const t = clamp(v);
  return t * t * (3 - 2 * t);
};
var releaseDuration = (d) => releaseFrame(d.release, 0).total;
var escapeDuration = (d) => releaseDuration(d) + FOX_TRAVEL_SECONDS + ((d.presentation?.foxes ?? 4) - 1) * FOX_DELAY_SECONDS;
var cogRadius = (teeth) => teeth * 0.043;
function compoundLayout(d, answer) {
  const driveRadius = cogRadius(d.driverTeeth), pinionRadius = cogRadius(d.pinionTeeth);
  const aRadius = answer[0] >= 0 ? cogRadius(d.gears[answer[0]].teeth) : 1.45;
  const bRadius = answer[1] >= 0 ? cogRadius(d.gears[answer[1]].teeth) : 1.18;
  const driveX = -10.55 + driveRadius, aX = driveX + driveRadius + aRadius, bX = aX + pinionRadius + bRadius;
  return { driveX, aX, bX, driveRadius, pinionRadius, aRadius, bRadius, y: 3.65 };
}
function foxRoute(index, seconds) {
  const progress = clamp((seconds - index * FOX_DELAY_SECONDS) / FOX_TRAVEL_SECONDS);
  const startX = [5.2, 7.9, 6.1, 9][index], startZ = index < 2 ? 0.15 : -1.1;
  const forward = clamp(progress / 0.65), spread = smooth((progress - 0.35) / 0.65);
  const destination = [4.9, 7.2, 6.1, 9.1][index];
  return {
    x: startX + (destination - startX) * spread,
    z: startZ + (4.8 - startZ) * forward + smooth((progress - 0.65) / 0.35) * (index < 2 ? 0.8 : 2.1),
    progress,
    escaped: progress === 1
  };
}
var GearCageSequence = class {
  constructor(d, v) {
    this.d = d;
    this.key = JSON.stringify(v.answer);
    if (evaluateGearLock(d, v.answer)) {
      this.time = escapeDuration(d);
      this.tested = true;
    }
  }
  d;
  time = 0;
  run = -1;
  key;
  finished = false;
  wasRunning = false;
  tested = false;
  update(v, dt) {
    const key = JSON.stringify(v.answer);
    if (key !== this.key && !v.running) {
      this.key = key;
      this.time = 0;
      this.tested = false;
    }
    if (v.running && v.runId !== this.run) {
      this.run = v.runId;
      this.time = 0;
      this.finished = false;
      this.tested = true;
    }
    let finish = false;
    if (v.running && !v.paused && dt > 0) {
      const duration = v.passed ? escapeDuration(this.d) : 3.8;
      this.time = v.reducedMotion ? duration : Math.min(duration, this.time + dt);
      if (this.time === duration && !this.finished) {
        this.finished = true;
        finish = true;
      }
    } else if (!v.running && this.wasRunning) this.time = v.passed ? escapeDuration(this.d) : 3.8;
    this.wasRunning = v.running;
    const allowed = this.tested && evaluateGearLock(this.d, v.answer);
    const frame = releaseFrame(this.d.release, allowed ? this.time : Math.min(this.time, 3.2));
    if (!allowed)
      for (const module of ["ball", "hammer", "weight", "domino", "gate"])
        frame.progress[module] = 0;
    const crank = this.tested ? v.answer[2] * Math.min(1, this.time / 3.2) : 0;
    return {
      finish,
      frame,
      crank,
      motion: gearMotion(this.d, v.answer, crank),
      escape: allowed ? Math.max(0, this.time - releaseDuration(this.d)) : 0,
      allowed
    };
  }
};

// src/app/templates/heist/escape/gear-lock/gear-cage/gear-cage.foxes.ts
async function loadFoxPack(parent, p) {
  const asset = await new GLTFLoader().loadAsync(p.animal.model);
  const geometries = /* @__PURE__ */ new Set(), materials = /* @__PURE__ */ new Set(), textures = /* @__PURE__ */ new Set();
  asset.scene.traverse((o) => {
    if (!(o instanceof Mesh)) return;
    geometries.add(o.geometry);
    for (const material of Array.isArray(o.material) ? o.material : [o.material]) {
      materials.add(material);
      for (const value of Object.values(material))
        if (value instanceof Texture) textures.add(value);
    }
  });
  const free = () => {
    geometries.forEach((g) => g.dispose());
    materials.forEach((m) => m.dispose());
    textures.forEach((t) => {
      const image = t.source.data;
      if (typeof ImageBitmap !== "undefined" && image instanceof ImageBitmap) image.close();
      t.dispose();
    });
    asset.scene.traverse((o) => {
      if (o instanceof SkinnedMesh) o.skeleton.dispose();
    });
  };
  const clips = [p.animal.idle, p.animal.walk, p.animal.run].map(
    (name) => asset.animations.find((clip) => clip.name === name)
  );
  if (clips.some((clip) => !clip)) {
    free();
    throw new Error("Fox animation clip missing");
  }
  asset.scene.updateMatrixWorld(true);
  const box = new Box3().setFromObject(asset.scene), size = box.getSize(new Vector3());
  const foxes = Array.from({ length: p.foxes }, (_, i) => {
    const root = new Group(), model = clone(asset.scene), scale = (1.35 + i % 2 * 0.09) / size.y;
    model.scale.setScalar(scale);
    model.position.set(
      -(box.min.x + box.max.x) * scale / 2,
      -box.min.y * scale,
      -(box.min.z + box.max.z) * scale / 2
    );
    model.traverse((o) => {
      if (o instanceof Mesh) o.castShadow = o.receiveShadow = true;
    });
    root.add(model);
    parent.add(root);
    const mixer = new AnimationMixer(model), actions = clips.map((c) => mixer.clipAction(c));
    actions[0].play();
    actions[0].time = i * 0.47;
    return { root, model, mixer, actions, active: 0 };
  });
  let destroyed = false;
  return {
    update(seconds, dt, reduced) {
      let escaped = 0;
      foxes.forEach((fox, i) => {
        const route = foxRoute(i, seconds), moving = route.progress > 0 && route.progress < 1, next = moving ? route.progress < 0.55 ? 1 : 2 : 0;
        if (next !== fox.active) {
          fox.actions[fox.active].fadeOut(reduced ? 0 : 0.2);
          fox.actions[next].reset().setEffectiveWeight(1).fadeIn(reduced ? 0 : 0.2).play();
          fox.active = next;
        }
        fox.root.position.set(route.x, 0.18, route.z);
        fox.root.rotation.y = route.escaped ? 0.12 * (i - 1.5) : 0;
        fox.actions[1].setEffectiveTimeScale(0.83);
        fox.actions[2].setEffectiveTimeScale(0.65);
        if (reduced) {
          fox.actions[next].time = 0;
          fox.mixer.update(0);
        } else if (dt > 0) fox.mixer.update(dt);
        if (route.escaped) escaped++;
      });
      return escaped;
    },
    destroy() {
      if (destroyed) return;
      destroyed = true;
      foxes.forEach((fox) => {
        fox.mixer.stopAllAction();
        fox.mixer.uncacheRoot(fox.model);
        parent.remove(fox.root);
        fox.model.traverse((o) => {
          if (o instanceof SkinnedMesh) o.skeleton.dispose();
        });
      });
      free();
    }
  };
}

// src/app/templates/heist/escape/gear-lock/gear-cage/gear-cage.layout.ts
function gearCageLayout(d) {
  const tray = d.gears.map((g, i) => {
    const points = Array.from({ length: g.teeth * 4 }, (_, n) => {
      const radius = n % 4 === 1 || n % 4 === 2 ? 24 : 20.5, a = n * Math.PI * 2 / (g.teeth * 4);
      return `${30 + Math.cos(a) * radius},${29 + Math.sin(a) * radius}`;
    }).join(" ");
    return `<button type="button" data-cog="${i}" aria-label="${g.teeth}-tooth cog" aria-pressed="false"><svg viewBox="0 0 60 58" aria-hidden="true"><polygon points="${points}" fill="${i % 2 ? "#cda963" : "#a0b3b9"}" stroke="#eedbb0" stroke-width=".7"/><circle cx="30" cy="29" r="12" fill="none" stroke="#324b51"/><circle cx="30" cy="29" r="4" fill="#203942"/></svg><b>${g.teeth}</b><small data-location="${i}">IN TRAY</small></button>`;
  }).join("");
  return `<style>
[data-gear-cage]{position:relative;isolation:isolate;box-sizing:border-box;width:100%;height:100%;overflow:hidden;background:#182b35;color:#f1e6cc;font:13px/1.35 'Trebuchet MS',sans-serif}
[data-gear-cage] *{box-sizing:border-box}
[data-gear-cage] [hidden]{display:none!important}
[data-gear-cage] button,[data-gear-cage] select{font:inherit;min-height:42px;padding:6px 10px;color:#f1e6cc;background:#223c47;border:1px solid #778b85;border-radius:6px;cursor:pointer}
[data-gear-cage] button:hover{background:#38535a;border-color:#e9cb87}
[data-gear-cage] button:disabled{opacity:.4;cursor:default}
[data-gear-cage] :focus-visible{outline:3px solid #ffdd91;outline-offset:2px}
[data-gear-cage] button[aria-pressed=true]{background:#485d57;border-color:#edd294}
[data-gear-cage] [data-viewport]{position:absolute;inset:0 0 236px;overflow:hidden}
[data-gear-cage] canvas{width:100%;height:100%;display:block;touch-action:none}
[data-gear-cage] .gc-top{position:absolute;inset:12px 12px auto;display:flex;justify-content:space-between;align-items:start;gap:8px;pointer-events:none}
[data-gear-cage] .gc-top>*{pointer-events:auto}
[data-gear-cage] .gc-title{font-size:11px;letter-spacing:.12em;color:#f0cd87;margin:0;text-shadow:0 2px 5px #000}
[data-gear-cage] .gc-title span{display:block;font-size:12px;letter-spacing:0;color:#d4ddd9;margin-top:3px}
[data-gear-cage] .gc-top button{font-size:11px;padding:5px 8px}
[data-gear-cage] .gc-focus{position:absolute;left:12px;bottom:248px;display:flex;gap:5px}
[data-gear-cage] .gc-focus button{font-size:11px;background:#1c323deb}
[data-gear-cage] .gc-label{position:absolute;pointer-events:none;transform:translate(-50%,-50%);white-space:nowrap;font-size:12px;color:#f0d496;background:#172e39ef;padding:5px 8px;border:1px solid #859188;border-radius:4px}
[data-gear-cage] .gc-drag{position:absolute;z-index:9;pointer-events:none;transform:translate(-50%,-50%);display:grid;place-items:center;width:64px;height:64px;border:6px dashed #f7dca4;border-radius:50%;background:#566564ee;box-shadow:0 8px 18px #0008;color:#fff3d1;font:26px Georgia,serif}
[data-gear-cage] .gc-bottom{position:absolute;inset:auto 0 0;height:236px;padding:10px 12px;display:flex;flex-direction:column;gap:8px;border-top:1px solid #897f60;background:linear-gradient(115deg,#152d39,#294047)}
[data-gear-cage] .gc-tray{display:flex;justify-content:center;gap:6px;height:76px}
[data-gear-cage] .gc-tray button{display:grid;grid-template-columns:minmax(26px,1fr) auto;gap:0 3px;align-items:center;max-width:130px;min-width:0;flex:1;padding:3px 6px;touch-action:none}
[data-gear-cage] .gc-tray svg{width:100%;height:51px;grid-row:1/3}
[data-gear-cage] .gc-tray b{font:24px Georgia,serif}
[data-gear-cage] .gc-tray small{font-size:8px;letter-spacing:.08em;color:#c4d3ce}
[data-gear-cage] .gc-clues{display:grid;grid-template-columns:1fr 1fr 1.15fr;gap:6px}
[data-gear-cage] .gc-clues button{text-align:left;padding:6px 9px;min-height:45px}
[data-gear-cage] .gc-clues button:disabled{opacity:1;border-color:#536d73;cursor:default}
[data-gear-cage] .gc-clues b{font-size:14px;color:#f1d59c}
[data-gear-cage] .gc-clues span{display:block;font-size:10px;color:#c7d7d7}
[data-gear-cage] .gc-clues [data-calibrated=true]{border-color:#92d1b5}
[data-gear-cage] .gc-drum{border-left:2px solid #c5a464;padding:3px 8px}
[data-gear-cage] .gc-drum b{display:block;font:18px Georgia,serif}
[data-gear-cage] .gc-actions{display:flex;align-items:center;gap:6px;justify-content:space-between}
[data-gear-cage] .gc-actions label{display:flex;align-items:center;gap:5px;font-size:11px}
[data-gear-cage] .gc-actions button{font-size:12px;padding:6px 9px}
[data-gear-cage] [data-action=crank]{background:#d8b878;border-color:#f4d99a;color:#18303b;font-weight:bold}
[data-gear-cage] .gc-feedback{min-height:18px;font-size:12px;color:#d1dfda}
[data-gear-cage] .gc-feedback[data-wrong=true]{color:#f6bb9c}
[data-gear-cage] [data-options]{position:absolute;right:12px;top:66px;width:min(330px,calc(100% - 24px));max-height:calc(100% - 310px);overflow:auto;background:#1a3541;border:1px solid #8c988d;border-radius:8px;box-shadow:0 14px 30px #0008;padding:15px;z-index:7}
[data-gear-cage] [data-options] p{font-size:13px;margin:7px 0 14px;color:#c7d9d8}
[data-gear-cage] [data-options] label{display:flex;gap:8px;align-items:center;margin:12px 0}
[data-gear-cage] [data-options] input{width:20px;height:20px;accent-color:#dfc080}
[data-gear-cage] [data-options] a{color:#edcf93;font-size:12px}
[data-gear-cage].diorama-expanded{position:fixed;inset:12px;z-index:2000;width:auto;height:auto;border:1px solid #9e9c83;border-radius:12px;box-shadow:0 0 0 30px #061823ed}
@media(max-width:680px){
 [data-gear-cage] .gc-label{font-size:10px;padding:3px 5px}
 [data-gear-cage] [data-viewport]{bottom:300px}
 [data-gear-cage] .gc-bottom{height:300px;padding:8px;gap:7px}
 [data-gear-cage] .gc-focus{bottom:311px;gap:4px}
 [data-gear-cage] .gc-focus button{padding:6px 8px}
 [data-gear-cage] .gc-tray{gap:4px;min-height:75px}
 [data-gear-cage] .gc-tray button{display:flex;flex-direction:column;padding:1px;gap:0}
 [data-gear-cage] .gc-tray svg{height:36px}
 [data-gear-cage] .gc-tray b{font-size:19px}
 [data-gear-cage] .gc-tray small{font-size:7px}
 [data-gear-cage] .gc-clues b{font-size:12px}
 [data-gear-cage] .gc-clues span{font-size:9px}
 [data-gear-cage] .gc-clues button{padding:6px}
 [data-gear-cage] .gc-actions{flex-wrap:wrap;justify-content:center;gap:5px}
 [data-gear-cage] .gc-title{font-size:9px;letter-spacing:.06em}
 [data-gear-cage] .gc-title span{font-size:10px;max-width:140px}
 [data-gear-cage].diorama-expanded{inset:5px}
}

[data-gear-cage] .gc-feedback{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}
[data-gear-cage] [data-viewport]{bottom:212px}
[data-gear-cage] .gc-bottom{height:212px;min-height:212px}
[data-gear-cage] output{display:inline-block;min-width:28px;text-align:center;font-variant-numeric:tabular-nums}
@media(max-width:680px){[data-gear-cage] [data-viewport]{bottom:252px}[data-gear-cage] .gc-bottom{height:252px;min-height:252px}}
</style>
<div data-viewport></div>
<div class="gc-top"><p class="gc-title">CLOCKWORK FOX RESCUE</p><div><button type="button" data-action="expand" aria-label="Expand fox workshop">Expand</button> <button type="button" data-action="reset" aria-label="Reset mechanism">\u21BA</button></div></div>
<div class="gc-bottom"><div class="gc-tray" role="group" aria-label="Cog tray">${tray}</div>
<div class="gc-clues"><button type="button" data-socket="0" aria-label="Place selected cog on axle A"><b>Axle A</b><span data-a>Choose a cog</span></button><button type="button" data-socket="1" aria-label="Place selected cog on axle B"><b>Axle B</b><span data-b>Choose a cog</span></button><div class="gc-drum"><span>OUTPUT</span><b data-output>0 turns</b></div></div>
<div class="gc-actions"><label>Input turns <select data-turns aria-label="Input crank turns">${Array.from({ length: d.maxCrank }, (_, i) => `<option value="${i + 1}">${i + 1}</option>`).join("")}</select></label><button type="button" data-action="crank">Turn crank</button><button type="button" data-action="return">Return cog</button><button type="button" data-action="replay" hidden>Replay escape</button><button type="button" data-action="pause">Pause</button></div>
<div class="gc-feedback" aria-live="polite">Choose a cog, then tap A or B.</div></div>
`;
}

// src/app/templates/heist/escape/gear-lock/gear-cage/gear-cage.release.ts
function createGearRelease(art, root) {
  const wood = art.material({ color: 7755325, roughness: 0.87 });
  const blue = art.material({ color: 6460047, metalness: 0.52, roughness: 0.4 });
  const drum = new Group();
  drum.position.set(1.12, 7.8, 0.65);
  root.add(drum);
  const face = art.cylinder(drum, 0, 0, 0, 0.53, 0.3, art.brass);
  face.rotation.x = Math.PI / 2;
  art.torus(drum, 0, 0, 0.19, 0.47, 0.035, art.dark);
  art.box(drum, 0, 0.24, 0.23, 0.05, 0.42, 0.05, art.steel);
  art.screw(drum, 0, 0, 0.25);
  const catchArm = new Group();
  catchArm.position.set(1.92, 7.57, 0.8);
  root.add(catchArm);
  art.box(catchArm, 0, 0.12, 0, 0.12, 0.52, 0.16, blue);
  art.rod(root, new Vector3(1.42, 7.89, 0.8), new Vector3(1.92, 7.9, 0.8), 0.034, art.steel);
  const ballPath = [
    new Vector3(1.98, 7.66, 0.69),
    new Vector3(3.58, 7.28, 0.69),
    new Vector3(2.96, 6.7, 0.69),
    new Vector3(4.58, 6.18, 0.69)
  ];
  for (let i = 0; i < ballPath.length - 1; i++)
    for (const z of [0.52, 0.86]) {
      const a = ballPath[i].clone().add(new Vector3(0, -0.14, z - 0.69));
      const b = ballPath[i + 1].clone().add(new Vector3(0, -0.14, z - 0.69));
      art.rod(root, a, b, 0.038, art.brass);
    }
  for (const p of ballPath)
    art.rod(
      root,
      new Vector3(p.x, p.y - 0.14, 0.53),
      new Vector3(p.x, p.y - 0.14, 0.86),
      0.025,
      art.steel
    );
  const ball = art.mesh(new SphereGeometry(0.15, 20, 12), art.steel, root);
  ball.position.copy(ballPath[0]);
  const hammer = new Group();
  hammer.position.set(5.02, 7, 0.7);
  root.add(hammer);
  art.box(hammer, 0, -0.49, 0, 0.13, 0.98, 0.15, wood);
  art.box(hammer, 0, -1, 0, 0.46, 0.3, 0.36, art.steel);
  art.screw(root, 5.02, 7, 0.93);
  const peg = new Group();
  peg.position.set(5.85, 6.17, 0.75);
  root.add(peg);
  art.box(peg, 0.15, 0, 0, 0.65, 0.13, 0.17, art.brass);
  art.box(root, 6.17, 6.17, 0.6, 0.17, 0.4, 0.36, art.dark);
  const weight = new Group();
  weight.position.set(6.23, 6.65, 0.65);
  root.add(weight);
  art.box(weight, 0, 0, 0, 0.72, 0.81, 0.57, wood, 0.07);
  for (const y of [-0.25, 0.25]) art.box(weight, 0, y, 0.31, 0.79, 0.1, 0.08, art.brass, 0.02);
  for (const x of [-0.27, 0.27]) for (const y of [-0.25, 0.25]) art.screw(weight, x, y, 0.37);
  art.torus(root, 6.48, 8.43, 0.65, 0.25, 0.046, art.brass);
  art.torus(root, 10.8, 8.43, 0.65, 0.25, 0.046, art.brass);
  art.torus(root, 10.8, 6.3, 0.65, 0.25, 0.046, art.brass);
  art.rod(root, new Vector3(6.48, 8.68, 0.65), new Vector3(10.8, 8.68, 0.65), 0.024);
  art.rod(root, new Vector3(11.05, 8.43, 0.65), new Vector3(11.05, 6.3, 0.65), 0.024);
  const weightCord = art.rod(
    root,
    new Vector3(6.23, 8.43, 0.65),
    new Vector3(6.23, 7.08, 0.65),
    0.024
  );
  const dominoes = [];
  art.box(root, 8.62, 5.13, 0.72, 3.9, 0.17, 0.85, wood, 0.05);
  for (let i = 0; i < 6; i++) {
    const domino = new Group();
    domino.position.set(7.15 + i * 0.52, 5.23, 0.7);
    root.add(domino);
    art.box(domino, 0, 0.46, 0, 0.15, 0.91, 0.35, i % 2 ? blue : art.brass, 0.025);
    art.screw(domino, 0, 0.6, 0.2);
    dominoes.push(domino);
  }
  const dominoCord = art.rod(
    root,
    new Vector3(10.8, 6.05, 0.65),
    new Vector3(7.15, 6.05, 0.7),
    0.024
  );
  for (const x of [6.8, 10.6])
    art.rod(root, new Vector3(x, 5.1, 0.65), new Vector3(x, 4.52, -1), 0.09, art.trim);
  art.rod(root, new Vector3(10.3, 5.6, 0.7), new Vector3(10.62, 5.6, 0.7), 0.055, art.brass);
  art.torus(root, 10.62, 5.4, 0.7, 0.2, 0.035, art.brass);
  const left = 4.03, right = 10.08, front = 2, back = -2.25, top = 4.43;
  art.box(root, 7.05, 0.25, -0.1, 6.4, 0.21, 4.62, wood, 0.065);
  for (const x of [left, right])
    for (const z of [front, back]) {
      art.box(root, x, 2.36, z, 0.2, 4.28, 0.2, art.dark, 0.03);
      art.mesh(new SphereGeometry(0.15, 12, 8), art.brass, root, x, 4.56, z);
    }
  for (const y of [0.42, top]) {
    for (const z of [back, front]) art.box(root, 7.05, y, z, 6.23, 0.15, 0.16, art.steel, 0.025);
    for (const x of [left, right]) art.box(root, x, y, -0.12, 0.15, 0.15, 4.4, art.steel, 0.025);
  }
  for (let i = 1; i < 11; i++)
    art.rod(
      root,
      new Vector3(left + i * 0.55, 0.43, back),
      new Vector3(left + i * 0.55, top, back),
      0.032,
      art.steel
    );
  for (const x of [left, right])
    for (let i = 1; i < 8; i++)
      art.rod(
        root,
        new Vector3(x, 0.43, back + i * 0.53),
        new Vector3(x, top, back + i * 0.53),
        0.032,
        art.steel
      );
  const door = new Group();
  door.name = "fox-cage-door";
  door.position.set(4.14, 0.46, front);
  root.add(door);
  for (const y of [0, 3.78]) art.box(door, 2.9, y, 0, 5.8, 0.16, 0.17, art.brass, 0.025);
  for (let i = 0; i < 12; i++)
    art.rod(
      door,
      new Vector3(i * 0.526, 0, 0),
      new Vector3(i * 0.526, 3.78, 0),
      0.039,
      art.steel
    );
  for (const y of [1.12, 3.4]) art.cylinder(root, 4.14, y, front, 0.14, 0.36, art.brass);
  const latch = new Group();
  latch.position.set(9.82, 2.51, 2.16);
  root.add(latch);
  art.box(latch, 0, 0, 0, 1.03, 0.15, 0.18, art.brass, 0.03);
  art.box(root, 10.13, 2.51, 2.13, 0.24, 0.38, 0.31, art.dark);
  const cageCord = art.rod(
    root,
    new Vector3(10.82, 5.4, 0.7),
    new Vector3(10.32, 2.51, 2.16),
    0.025
  );
  const tripCord = art.rod(
    root,
    new Vector3(9.75, 6.05, 0.7),
    new Vector3(10.62, 5.6, 0.7),
    0.024
  );
  for (let i = 0; i < 9; i++) {
    const turn = art.torus(root, 10.47 + i * 0.075, 2.51, 2.16, 0.115, 0.013, art.steel);
    turn.rotation.y = Math.PI / 2;
  }
  const animals = new Group();
  root.add(animals);
  for (const group of [drum, catchArm, hammer, peg, weight, ...dominoes, door, latch])
    batchMetalwork(art, group);
  return {
    drum,
    ball,
    catch: catchArm,
    hammer,
    peg,
    weight,
    dominoes,
    door,
    latch,
    weightCord,
    dominoCord,
    cageCord,
    tripCord,
    animals,
    ballPath
  };
}
function positionGearRelease(art, r, p, output, allowed) {
  r.drum.rotation.z = -output * Math.PI * 2;
  r.catch.position.y = 7.57 + (allowed ? smooth((p.drive - 0.88) / 0.12) * 0.43 : 0);
  const along = Math.min(2.999999, p.ball * 3), i = Math.floor(along);
  r.ball.position.lerpVectors(r.ballPath[i], r.ballPath[i + 1], along - i);
  r.hammer.rotation.z = -0.65 + smooth(p.hammer) * 1.4;
  r.peg.position.x = 5.85 + smooth(p.hammer) * 0.65;
  r.weight.position.y = 6.65 - smooth(p.weight) * 1.72;
  r.dominoes.forEach((domino, i2) => {
    domino.rotation.z = -smooth(p.domino * 6 - i2) * 1.25;
  });
  r.latch.position.x = 9.82 + smooth(p.gate * 3) * 0.88;
  r.door.rotation.y = -smooth((p.gate - 0.28) / 0.72) * Math.PI * 0.56;
  art.positionRod(
    r.weightCord,
    new Vector3(6.23, 8.43, 0.65),
    new Vector3(6.23, r.weight.position.y + 0.43, 0.65)
  );
  const angle = r.dominoes[0].rotation.z;
  art.positionRod(
    r.dominoCord,
    new Vector3(10.8, 6.05, 0.65),
    new Vector3(7.15 - Math.sin(angle) * 0.82, 5.23 + Math.cos(angle) * 0.82, 0.7)
  );
  art.positionRod(
    r.cageCord,
    new Vector3(10.82, 5.4, 0.7),
    new Vector3(r.latch.position.x + 0.5, 2.51, 2.16)
  );
  const finalAngle = r.dominoes[5].rotation.z;
  art.positionRod(
    r.tripCord,
    new Vector3(9.75 - Math.sin(finalAngle) * 0.82, 5.23 + Math.cos(finalAngle) * 0.82, 0.7),
    new Vector3(10.62, 5.6, 0.7)
  );
}

// src/app/templates/heist/escape/gear-lock/gear-cage/gear-cage.model.ts
function gearShape(teeth) {
  const radius = cogRadius(teeth), shape = new Shape();
  for (let tooth = 0; tooth < teeth; tooth++)
    for (let corner = 0; corner < 4; corner++) {
      const a = (tooth + (corner + 0.1) / 4) * Math.PI * 2 / teeth, r = radius + (corner === 1 || corner === 2 ? 0.055 : -0.055);
      const x = Math.cos(a) * r, y = Math.sin(a) * r;
      if (tooth === 0 && corner === 0) shape.moveTo(x, y);
      else shape.lineTo(x, y);
    }
  shape.closePath();
  const axle = new Path();
  axle.absarc(0, 0, 0.12, 0, Math.PI * 2, true);
  shape.holes.push(axle);
  return new ExtrudeGeometry(shape, {
    depth: 0.16,
    bevelEnabled: true,
    bevelSize: 9e-3,
    bevelThickness: 0.018,
    bevelSegments: 2,
    steps: 1
  });
}
function cog(art, root, teeth, material) {
  const group = new Group();
  root.add(group);
  art.mesh(gearShape(teeth), material, group);
  const radius = cogRadius(teeth);
  art.torus(group, 0, 0, 0.19, radius * 0.67, 0.028, art.dark);
  art.torus(group, 0, 0, 0.182, radius * 0.86, 0.012, art.brass);
  art.torus(group, 0, 0, 0.185, radius * 0.38, 0.018, art.dark);
  for (let n = 0; n < 4; n++)
    art.screw(
      group,
      Math.cos(n * Math.PI / 2) * radius * 0.62,
      Math.sin(n * Math.PI / 2) * radius * 0.62,
      0.21
    );
  art.box(group, 0, radius * 0.8, 0.205, 0.04, radius * 0.22, 0.025, art.steel, 3e-3);
  batchMetalwork(art, group);
  return group;
}
function createGearDiorama(art, d) {
  const root = new Group();
  root.name = "compound-gear-cage";
  const surfaces = new DioramaSurfaces(art);
  const stone = surfaces.stone(6912905), edge = surfaces.stone(4084577);
  const tile = surfaces.stone(9936014), wood = surfaces.wood(8938304);
  const blue = art.material({ color: 6789534, metalness: 0.73, roughness: 0.32 });
  art.box(root, 0, -0.2, 2.2, 24.3, 0.6, 12, edge, 0.13);
  for (let row = 0; row < 6; row++)
    for (let col = 0; col < 14; col++)
      art.box(
        root,
        -11.25 + col * 1.72,
        0.12,
        -2.7 + row * 1.93,
        1.66,
        0.18,
        1.87,
        (row + col) % 7 ? tile : stone,
        0.04
      );
  for (let row = 0; row < 10; row++)
    for (let col = 0; col < 14; col++)
      art.box(
        root,
        -11.24 + col * 1.72 + row % 2 * 0.08,
        0.55 + row * 0.92,
        -2.93,
        1.65,
        0.87,
        0.48,
        (row + col) % 5 ? stone : edge,
        0.04
      );
  for (const x of [-11.6, 0.1, 11.6]) {
    art.box(root, x, 4.6, -2.5, 0.45, 9.3, 0.62, edge, 0.06);
    art.box(root, x, 9.1, -2.45, 0.8, 0.3, 0.9, art.trim, 0.04);
  }
  art.box(root, -5.55, 3.65, -0.5, 11.8, 6.55, 0.5, art.dark, 0.16);
  art.box(root, -5.55, 0.45, 0.1, 12.1, 0.25, 1.4, wood, 0.06);
  art.box(root, -5.55, 6.9, -0.16, 12.1, 0.22, 0.85, art.brass, 0.035);
  for (const y of [2.55, 4.73]) {
    art.box(root, -5.45, y, 0.15, 10.9, 0.13, 0.2, art.steel, 0.025);
    for (const x of [-10.72, -0.22]) art.screw(root, x, y, 0.28);
  }
  const driver = cog(art, root, d.driverTeeth, art.brass), pinion = cog(art, root, d.pinionTeeth, blue);
  const inventory = d.gears.map((g, i) => cog(art, root, g.teeth, i % 2 ? art.brass : art.steel));
  inventory.forEach((g, i) => {
    g.name = `cog-${d.gears[i].teeth}-${i}`;
    g.userData["index"] = i;
  });
  const mounts = [new Group(), new Group()];
  mounts.forEach((mount, i) => {
    root.add(mount);
    art.box(mount, 0, 0, -0.15, 0.47, 2.42, 0.27, art.trim, 0.045);
    const shaft = art.cylinder(mount, 0, 0, 0.57, 0.13, 1.72, art.steel);
    shaft.rotation.x = Math.PI / 2;
    art.torus(mount, 0, 0, 1.51, 0.23, 0.037, i ? blue : art.brass);
    batchMetalwork(art, mount);
  });
  const crank = new Group();
  root.add(crank);
  art.torus(crank, 0, 0, 0, 0.49, 0.056, art.brass);
  art.box(crank, 0, 0, 0, 0.98, 0.07, 0.1, art.steel);
  art.box(crank, 0, 0, 0, 0.07, 0.98, 0.1, art.steel);
  const handle = art.cylinder(crank, 0.46, 0, 0.2, 0.088, 0.44, wood);
  handle.rotation.x = Math.PI / 2;
  batchMetalwork(art, crank);
  const outputPulley = new Group();
  root.add(outputPulley);
  art.torus(outputPulley, 0, 0, 0, 0.38, 0.045, art.dark);
  art.box(outputPulley, 0, 0, 0.04, 0.75, 0.04, 0.05, art.brass);
  batchMetalwork(art, outputPulley);
  const belt = [
    art.rod(root, new Vector3(), new Vector3(1, 1, 1), 0.042, art.rope),
    art.rod(root, new Vector3(), new Vector3(1, 1, 1), 0.042, art.rope)
  ];
  const release = createGearRelease(art, root);
  for (const x of [-11.2, 11.2]) {
    art.box(root, x, 5.7, -1.5, 0.13, 0.8, 0.13, wood);
    const flame = art.mesh(
      new SphereGeometry(0.15, 12, 8),
      art.material({ color: 16766347, emissive: 16757330, emissiveIntensity: 1.4 }),
      root,
      x,
      6.2,
      -1.5
    );
    flame.scale.y = 1.8;
  }
  const moving = /* @__PURE__ */ new Set([
    ...belt,
    release.ball,
    release.weightCord,
    release.dominoCord,
    release.cageCord,
    release.tripCord
  ]);
  batchMetalwork(art, root, moving);
  return { root, driver, pinion, inventory, mounts, crank, outputPulley, belt, release };
}
function positionCompound(art, stage, d, answer, motion) {
  const layout = compoundLayout(d, answer), tau = Math.PI * 2;
  stage.driver.position.set(layout.driveX, layout.y, 0.5);
  stage.driver.rotation.z = -motion.drive * tau;
  stage.pinion.position.set(layout.aX, layout.y, 1.27);
  stage.pinion.rotation.z = -motion.axle * tau;
  stage.mounts[0].position.set(layout.aX, layout.y, 0);
  stage.mounts[1].position.set(layout.bX, layout.y, 0);
  stage.inventory.forEach((cog2, i) => {
    const socket = answer[0] === i ? 0 : answer[1] === i ? 1 : -1;
    cog2.visible = socket >= 0;
    if (socket < 0) return;
    cog2.position.set(socket === 0 ? layout.aX : layout.bX, layout.y, socket === 0 ? 0.5 : 1.27);
    cog2.rotation.z = -(socket === 0 ? motion.axle : motion.output) * tau + Math.PI / d.gears[i].teeth;
  });
  stage.crank.position.set(layout.driveX, layout.y, 1.52);
  stage.crank.rotation.z = -motion.drive * tau;
  stage.outputPulley.position.set(layout.bX, layout.y, 1.62);
  stage.outputPulley.rotation.z = -motion.output * tau;
  for (let i = 0; i < 2; i++)
    art.positionRod(
      stage.belt[i],
      new Vector3(layout.bX, layout.y + (i ? -0.38 : 0.38), 1.62),
      new Vector3(1.12, 7.8 + (i ? -0.53 : 0.53), 0.65)
    );
  return layout;
}

// src/app/templates/heist/escape/gear-lock/gear-cage/gear-cage.scene.ts
var captions = {
  drive: "Follow the markers: drive \u2192 shared axle A \u2192 output B.",
  ball: "The output drum lifts the catch. The ball rolls down the rail.",
  hammer: "The ball swings the hammer and knocks the retaining peg free.",
  weight: "The counterweight drops and pulls the domino cord.",
  domino: "One falling domino tips the next. Watch the final release cord.",
  gate: "The bolt slides clear. The cage door swings open."
};
function mountGearCage(parent, d, snapshot, cb) {
  const root = document.createElement("div");
  root.dataset["gearCage"] = "";
  root.innerHTML = gearCageLayout(d);
  parent.append(root);
  const sound = new TimingCageSound();
  let gone = false, frameId = 0, pack, viewer;
  const fail = () => {
    destroy();
    cb.failed();
  };
  try {
    viewer = new DioramaViewer(
      root,
      "fox",
      {
        all: { center: [0, 4.5, 1.5], width: 25, height: 12 },
        drive: { center: [-7, 3.6, 0.8], width: 10, height: 5.7 },
        relay: { center: [5.6, 6.8, 0.7], width: 12.4, height: 6.6 },
        cage: { center: [7, 2.3, 3.6], width: 10.5, height: 7.8 }
      },
      fail
    );
  } catch {
    root.remove();
    sound.destroy();
    cb.failed();
    return { destroy() {
    } };
  }
  const stage = createGearDiorama(viewer.art, d);
  viewer.scene.add(stage.root);
  const sequence = new GearCageSequence(d, snapshot());
  const q = (s) => root.querySelector(s);
  const action = (name) => q(`[data-action=${name}]`);
  const feedback = q(".gc-feedback"), output = q("[data-output]"), turns = q("[data-turns]");
  const labels = ["drive", "a", "b", "pinion"].map((name) => {
    const element = document.createElement("span");
    element.className = "gc-label";
    element.dataset["part"] = name;
    viewer.viewport.append(element);
    return element;
  });
  const ghost = document.createElement("span");
  ghost.className = "gc-drag";
  ghost.hidden = true;
  ghost.setAttribute("aria-hidden", "true");
  root.append(ghost);
  const glow = viewer.art.torus(
    stage.root,
    0,
    0,
    1.8,
    0.38,
    0.035,
    viewer.art.material({ color: 16765837, emissive: 11169314, emissiveIntensity: 0.5 })
  );
  glow.visible = false;
  let drag;
  let crankDrag;
  let suppressClick = false, previous = performance.now(), lastRun = -1, lastPhase = "", lastUi = "", lastFeedback = "";
  let suspended = false, lastEscaped = 0;
  const locked = () => {
    const v = snapshot();
    return !pack || v.running || v.completed || v.paused;
  };
  const screenPoint = (x, y, z) => {
    const p = new Vector3(x, y, z).project(viewer.camera), rect = viewer.canvas.getBoundingClientRect();
    return {
      x: rect.left + (p.x + 1) * rect.width / 2,
      y: rect.top + (1 - p.y) * rect.height / 2
    };
  };
  const socketAt = (x, y) => {
    const layout = compoundLayout(d, snapshot().answer), a = screenPoint(layout.aX, layout.y, 1.5), b = screenPoint(layout.bX, layout.y, 1.5);
    const da = Math.hypot(x - a.x, y - a.y), db = Math.hypot(x - b.x, y - b.y);
    const radius = Math.max(28, Math.min(68, Math.abs(a.x - b.x) * 0.48));
    return Math.min(da, db) < radius ? da < db ? 0 : 1 : null;
  };
  const overCrank = (x, y) => {
    const l = compoundLayout(d, snapshot().answer), p = screenPoint(l.driveX, l.y, 1.52);
    return Math.hypot(x - p.x, y - p.y) < 34;
  };
  const place = (index, socket) => {
    if (locked()) return;
    sound.unlock();
    cb.place(index, socket);
    sound.play("tick");
  };
  const start = () => {
    const v = snapshot();
    if (locked() || v.answer[0] < 0 || v.answer[1] < 0) return;
    sound.unlock();
    cb.test?.();
    action("pause").focus({ preventScroll: true });
  };
  const cancelPointer = () => {
    const id = drag?.id ?? crankDrag?.id;
    drag = void 0;
    crankDrag = void 0;
    ghost.hidden = true;
    glow.visible = false;
    if (id !== void 0 && root.hasPointerCapture(id)) root.releasePointerCapture(id);
  };
  const pointerDown = (event) => {
    suppressClick = false;
    if (locked() || event.button !== 0) return;
    const target = event.target, cog2 = target.closest("[data-cog]");
    let index = cog2 ? Number(cog2.dataset["cog"]) : null;
    if (target === viewer.canvas) {
      if (overCrank(event.clientX, event.clientY)) {
        crankDrag = { x: event.clientX, y: event.clientY, id: event.pointerId, turned: false };
        root.setPointerCapture(event.pointerId);
        event.preventDefault();
        return;
      }
      const socket = socketAt(event.clientX, event.clientY), selected = snapshot().selected;
      if (socket !== null && selected !== null) {
        place(selected, socket);
        return;
      }
      if (socket !== null && snapshot().answer[socket] >= 0) index = snapshot().answer[socket];
    }
    if (index === null) return;
    cb.select(index);
    sound.unlock();
    drag = { index, x: event.clientX, y: event.clientY, id: event.pointerId, moved: false };
    root.setPointerCapture(event.pointerId);
  };
  const pointerMove = (event) => {
    if (locked()) {
      cancelPointer();
      return;
    }
    if (crankDrag && Math.hypot(event.clientX - crankDrag.x, event.clientY - crankDrag.y) > 14 && !crankDrag.turned) {
      crankDrag.turned = true;
      suppressClick = true;
      start();
      return;
    }
    if (!drag) return;
    drag.moved ||= Math.hypot(event.clientX - drag.x, event.clientY - drag.y) > 8;
    if (!drag.moved) return;
    event.preventDefault();
    ghost.hidden = false;
    ghost.textContent = `${d.gears[drag.index].teeth}`;
    const rect = root.getBoundingClientRect();
    ghost.style.left = `${event.clientX - rect.left}px`;
    ghost.style.top = `${event.clientY - rect.top}px`;
    const socket = socketAt(event.clientX, event.clientY), layout = compoundLayout(d, snapshot().answer);
    glow.visible = socket !== null;
    if (socket !== null) glow.position.set(socket === 0 ? layout.aX : layout.bX, layout.y, 1.83);
  };
  const pointerUp = (event) => {
    if (crankDrag) {
      const turned = crankDrag.turned;
      cancelPointer();
      suppressClick = true;
      if (!turned) start();
      return;
    }
    if (drag?.moved && !locked()) {
      const target = document.elementFromPoint(event.clientX, event.clientY)?.closest("[data-socket]");
      const socket = target ? Number(target.dataset["socket"]) : socketAt(event.clientX, event.clientY);
      if (socket !== null) place(drag.index, socket);
      else if (document.elementFromPoint(event.clientX, event.clientY)?.closest(".gc-tray"))
        place(drag.index, -1);
      suppressClick = true;
    }
    cancelPointer();
  };
  const click = (event) => {
    if (suppressClick) {
      suppressClick = false;
      if (event.detail !== 0) return;
    }
    const button = event.target.closest("button");
    if (!button || button.disabled) return;
    sound.unlock();
    if (button.dataset["focus"]) {
      viewer.setFocus(button.dataset["focus"]);
      return;
    }
    if (button.dataset["cog"] !== void 0) {
      if (!locked()) cb.select(Number(button.dataset["cog"]));
      return;
    }
    if (button.dataset["socket"] !== void 0) {
      const index = snapshot().selected;
      if (index !== null) place(index, Number(button.dataset["socket"]));
      return;
    }
    switch (button.dataset["action"]) {
      case "crank":
        start();
        break;
      case "return": {
        const index = snapshot().selected;
        if (index !== null) place(index, -1);
        break;
      }
      case "replay":
        cb.replay?.();
        action("pause").focus({ preventScroll: true });
        break;
      case "reset":
        cb.reset?.();
        break;
      case "pause":
        cancelPointer();
        cb.pause?.();
        break;
      case "expand":
        viewer.expand(!viewer.expanded);
        break;
    }
  };
  const change = (event) => {
    if (event.target === turns && !locked()) cb.crank?.(Number(turns.value) - snapshot().answer[2]);
  };
  const key = (event) => {
    if (event.key === "Escape") cancelPointer();
  };
  root.addEventListener("click", click);
  root.addEventListener("change", change);
  root.addEventListener("keydown", key);
  root.addEventListener("pointerdown", pointerDown);
  root.addEventListener("pointermove", pointerMove);
  root.addEventListener("pointerup", pointerUp);
  root.addEventListener("pointercancel", cancelPointer);
  function tick(now) {
    if (gone) return;
    const v = snapshot(), reduced = v.reducedMotion;
    const paused = v.paused || document.hidden, dt = paused ? 0 : Math.min(0.1, Math.max(0, (now - previous) / 1e3));
    previous = now;
    if (paused !== suspended) {
      suspended = paused;
      if (paused) {
        sound.suspend();
        cancelPointer();
      } else sound.resume();
    }
    const state = sequence.update(__spreadProps(__spreadValues({}, v), { reducedMotion: reduced }), pack ? dt : 0);
    const layout = positionCompound(viewer.art, stage, d, v.answer, state.motion);
    positionGearRelease(
      viewer.art,
      stage.release,
      state.frame.progress,
      state.motion.output,
      state.allowed
    );
    const escaped = pack?.update(state.escape, dt, reduced) ?? 0;
    if (v.running) {
      if (lastRun !== v.runId) {
        lastRun = v.runId;
        lastPhase = "";
        viewer.setFocus("drive");
      }
      const phase = !v.passed ? "drive" : state.escape > 0 ? "foxes" : state.frame.active;
      if (phase !== lastPhase) {
        lastPhase = phase;
        if (phase === "ball") viewer.setFocus("relay");
        if (phase === "gate" || phase === "foxes") viewer.setFocus("cage");
        if (phase !== "foxes") cb.beat(phase);
        if (!paused)
          sound.play(
            phase === "gate" ? "door" : phase === "foxes" ? "free" : phase === "drive" ? "tick" : "latch"
          );
      }
    }
    if (escaped > lastEscaped && !paused && v.running) sound.play("step");
    lastEscaped = escaped;
    output.textContent = `${state.motion.output.toFixed(2)} turns`;
    const solved = evaluateGearLock(d, v.answer), disabled = locked();
    const uiKey = JSON.stringify([
      v.answer,
      v.selected,
      v.running,
      v.paused,
      v.completed,
      !!pack,
      solved
    ]);
    if (uiKey !== lastUi) {
      lastUi = uiKey;
      root.querySelectorAll("[data-cog]").forEach((b, i) => {
        b.disabled = disabled;
        b.setAttribute("aria-pressed", String(v.selected === i));
        q(`[data-location="${i}"]`).textContent = v.answer[0] === i ? "ON A" : v.answer[1] === i ? "ON B" : "IN TRAY";
      });
      for (const socket of [0, 1]) {
        const gear = d.gears[v.answer[socket]];
        q(`[data-${socket === 0 ? "a" : "b"}]`).textContent = gear ? `${gear.teeth} teeth fitted \xB7 tap to replace` : "Empty";
        q(`[data-socket="${socket}"]`).disabled = disabled || v.selected === null;
      }
      turns.disabled = disabled;
      turns.value = String(v.answer[2]);
      action("crank").disabled = disabled || v.answer[0] < 0 || v.answer[1] < 0;
      action("return").disabled = disabled || v.selected === null;
      action("reset").disabled = disabled;
      action("replay").hidden = !solved || !state.allowed;
      action("replay").disabled = !pack || v.running || v.paused;
      action("pause").textContent = v.paused ? "Resume" : "Pause";
    }
    const message = !pack ? `Preparing the workshop and its ${d.presentation.foxes} foxes\u2026` : v.paused ? "Workshop paused." : v.running ? state.escape > 0 ? `The way is clear! ${escaped} / ${d.presentation.foxes} foxes outside.` : captions[v.passed ? state.frame.active : "drive"] : escaped === d.presentation.foxes ? `All ${d.presentation.foxes} foxes are free! Replay their escape or try another gear train.` : sequence.time > 0 ? gearFeedback(d, v.answer) : v.selected !== null ? `${d.gears[v.selected].teeth}-tooth cog selected. Tap A or B, or drag it onto an axle.` : "Match both tooth-count clues, then set the turns and turn the crank.";
    if (message !== lastFeedback) {
      feedback.textContent = message;
      lastFeedback = message;
      feedback.dataset["wrong"] = String(!v.running && sequence.time > 0 && !solved);
    }
    root.dataset["answer"] = JSON.stringify(v.answer);
    root.dataset["release"] = String(state.frame.progress.gate);
    root.dataset["escaped"] = String(escaped);
    root.dataset["elapsed"] = sequence.time.toFixed(2);
    viewer.canvas.setAttribute(
      "aria-label",
      `Compound gear workshop. Input ${state.motion.drive.toFixed(1)} turns; axle A ${Math.abs(state.motion.axle).toFixed(2)}; output ${state.motion.output.toFixed(2)}. Cage ${state.frame.progress.gate === 1 ? "open" : "closed"}. ${escaped} foxes outside. Use the cog tray and crank controls below.`
    );
    viewer.render(dt, reduced);
    const text = viewer.viewport.clientWidth < 600 ? [`${d.driverTeeth} \xB7 DRIVE`, "A", "B", `${d.pinionTeeth} \xB7 PINION ON A`] : [
      `${d.driverTeeth} \xB7 FIXED DRIVE`,
      `A \xB7 ${d.gears[v.answer[0]]?.teeth ?? "EMPTY"}`,
      `B \xB7 ${d.gears[v.answer[1]]?.teeth ?? "EMPTY"}`,
      `${d.pinionTeeth} \xB7 SHARES AXLE A`
    ];
    const points = [
      [layout.driveX, layout.y - layout.driveRadius - 0.58, 1.5],
      [layout.aX, layout.y - layout.aRadius - 0.58, 1.5],
      [layout.bX, layout.y - layout.bRadius - 0.58, 1.5],
      [layout.aX, layout.y + layout.aRadius + 0.55, 1.5]
    ];
    labels.forEach((label, i) => {
      label.textContent = text[i];
      viewer.label(label, new Vector3(...points[i]));
      label.hidden ||= viewer.focus !== "drive";
    });
    root.dataset["drawCalls"] = String(viewer.renderer.info.render.calls);
    if (state.finish) cb.finished();
    frameId = requestAnimationFrame(tick);
  }
  void loadFoxPack(stage.release.animals, d.presentation).then((result) => {
    if (gone) result.destroy();
    else {
      pack = result;
      cb.ready();
    }
  }).catch(() => {
    if (!gone) fail();
  });
  frameId = requestAnimationFrame(tick);
  function destroy() {
    if (gone) return;
    gone = true;
    cancelAnimationFrame(frameId);
    cancelPointer();
    root.removeEventListener("click", click);
    root.removeEventListener("change", change);
    root.removeEventListener("keydown", key);
    root.removeEventListener("pointerdown", pointerDown);
    root.removeEventListener("pointermove", pointerMove);
    root.removeEventListener("pointerup", pointerUp);
    root.removeEventListener("pointercancel", cancelPointer);
    sound.destroy();
    pack?.destroy();
    viewer?.destroy();
    root.remove();
  }
  return { destroy };
}

// src/app/templates/heist/escape/gear-lock/gear-lock.scene.ts
function mountGearScene(parent, lock, snapshot, callbacks) {
  if (lock.presentation?.kind === "gear-cage") return mountGearCage(parent, lock, snapshot, callbacks);
  class Workshop extends __webpack_exports__Scene {
    rig;
    lines;
    glow;
    driver;
    pinion;
    cogs = [];
    labels = [];
    aLabel;
    bLabel;
    readout;
    run = -1;
    elapsed = 0;
    active = null;
    done = false;
    dragging = null;
    axleA = 430;
    axleB = 590;
    failed = false;
    preload() {
      this.load.image("gear-workshop", lock.backdrop);
      this.load.on("loaderror", () => {
        this.failed = true;
        callbacks.failed();
      });
    }
    create() {
      if (this.failed) return;
      this.add.image(720, 340, "gear-workshop").setDisplaySize(1440, 680);
      this.add.rectangle(720, 340, 1440, 680, 268061, 0.12);
      this.lines = this.add.graphics().setDepth(2);
      this.glow = this.add.graphics().setDepth(20);
      this.rig = new GearReleaseRig(this, lock.release);
      plate(this, 398, 98, "COMPOUND DRIVE TRAIN", 410);
      plate(this, 898, 98, "THE RELEASE RUN", 260);
      plate(this, 1235, 478, "PEN RELEASE", 180);
      plate(this, 710, 649, "COG TRAY  /  DRAG TO AN AXLE", 400);
      this.driver = this.gear(250, 270, lock.driverTeeth, false).setDepth(5);
      this.add.text(250, 270, `${lock.driverTeeth}`, {
        fontFamily: "Georgia",
        fontSize: "27px",
        color: "#fff1c9"
      }).setOrigin(0.5).setDepth(7);
      plate(this, 245, 385, "FIXED DRIVE", 160);
      this.pinion = this.gear(430, 270, lock.pinionTeeth, true).setDepth(12);
      this.aLabel = this.add.text(400, 410, "A  /  EMPTY", {
        fontFamily: "Trebuchet MS",
        fontSize: "19px",
        color: "#f6d58d"
      }).setOrigin(0.5).setDepth(16);
      this.bLabel = this.add.text(622, 360, "B  /  EMPTY", {
        fontFamily: "Trebuchet MS",
        fontSize: "19px",
        color: "#a4e5de"
      }).setOrigin(0.5).setDepth(16);
      this.add.text(437, 158, `${lock.pinionTeeth}-TOOTH PINION
Shares axle A`, {
        fontFamily: "Trebuchet MS",
        fontSize: "16px",
        align: "center",
        color: "#9dd9d4",
        stroke: "#10292a",
        strokeThickness: 4
      }).setOrigin(0.5).setDepth(16);
      this.readout = this.add.text(470, 461, "Fit both cogs to connect the drive.", {
        fontFamily: "Trebuchet MS",
        fontSize: "17px",
        align: "center",
        color: "#d3e7df"
      }).setOrigin(0.5).setDepth(16);
      lock.gears.forEach((gear, index) => {
        const wheel = this.gear(0, 0, gear.teeth, false);
        const label = this.add.text(0, 0, `${gear.teeth}`, {
          fontFamily: "Georgia",
          fontSize: "32px",
          color: "#fff4d5",
          stroke: "#223133",
          strokeThickness: 3
        }).setOrigin(0.5);
        const root = this.add.container(0, 0, [wheel, label]).setDepth(10).setSize(gearRadius(gear.teeth) * 2.3, gearRadius(gear.teeth) * 2.3);
        root.setInteractive({ useHandCursor: true });
        this.input.setDraggable(root);
        root.on("pointerdown", () => {
          const s = snapshot();
          if (!s.running && !s.completed && !s.paused) callbacks.select(index);
        });
        this.cogs.push({ root, wheel, label, index });
        this.labels.push(
          this.add.text(200 + index * 185, 620, "", {
            fontFamily: "Trebuchet MS",
            fontSize: "14px",
            color: "#d2c4a5"
          }).setOrigin(0.5).setDepth(15)
        );
      });
      for (const socket of [0, 1]) {
        const zone = this.add.zone(socket === 0 ? 430 : 590, 270, 140, 170).setDepth(3).setInteractive({ useHandCursor: true });
        zone.on("pointerdown", () => {
          const s = snapshot();
          if (s.selected !== null && !s.running && !s.completed && !s.paused)
            callbacks.place(s.selected, socket);
        });
      }
      this.input.on("dragstart", (_p, root) => {
        const s = snapshot(), cog2 = this.cogs.find((c) => c.root === root);
        if (!cog2 || s.running || s.completed || s.paused) return;
        this.dragging = cog2.index;
        root.setDepth(30).setScale(0.85);
        callbacks.select(cog2.index);
      });
      this.input.on("drag", (p, root) => {
        if (this.dragging === null || snapshot().paused) return;
        const point = p.positionToCamera(this.cameras.main);
        root.setPosition(point.x, point.y);
      });
      this.input.on("dragend", (p, root) => {
        const index = this.dragging;
        this.dragging = null;
        root.setDepth(10);
        if (index === null || snapshot().paused || snapshot().running || snapshot().completed)
          return;
        const point = p.positionToCamera(this.cameras.main);
        const da = Math.hypot(point.x - this.axleA, point.y - 270), db = Math.hypot(point.x - this.axleB, point.y - 270);
        callbacks.place(index, Math.min(da, db) < 145 ? da < db ? 0 : 1 : -1);
      });
      callbacks.ready();
    }
    gear(x, y, teeth, silver) {
      const size = gearRadius(teeth) * 400 / 174;
      return this.add.image(x, y, createGearTexture(this, teeth, silver)).setDisplaySize(size, size);
    }
    update(_time, delta) {
      if (this.failed || !this.lines) return;
      const s = snapshot();
      if (s.runId !== this.run) {
        this.run = s.runId;
        this.elapsed = 0;
        this.done = false;
        this.active = null;
      }
      if (s.running && !s.paused && !document.hidden) this.elapsed += Math.min(delta, 50) / 1e3;
      if (s.running && s.reducedMotion && !s.paused) this.elapsed = 100;
      const frame = releaseFrame(lock.release, this.elapsed);
      if (s.running && s.passed && frame.active !== this.active) {
        this.active = frame.active;
        callbacks.beat(frame.active);
      }
      if (s.running && !s.paused && !this.done && (s.passed ? frame.complete : this.elapsed >= 3.2)) {
        this.done = true;
        callbacks.finished();
      }
      const trial = s.running ? Math.min(1, this.elapsed / 3.2) : this.run > 0 ? 1 : 0;
      const motion = gearMotion(lock, s.answer, trial * s.answer[2]);
      const ar = lock.gears[s.answer[0]], br = lock.gears[s.answer[1]];
      this.axleA = ar ? 250 + gearRadius(lock.driverTeeth) + gearRadius(ar.teeth) : 430;
      this.axleB = ar && br ? this.axleA + gearRadius(lock.pinionTeeth) + gearRadius(br.teeth) : this.axleA + 160;
      this.driver.setRotation(motion.drive * Math.PI * 2);
      this.pinion.setPosition(this.axleA, 270).setRotation(motion.axle * Math.PI * 2 + 0.1).setVisible(!!ar);
      this.aLabel.setText(`A  /  ${ar ? ar.teeth + " TEETH" : "EMPTY"}`);
      this.bLabel.setText(`B  /  ${br ? br.teeth + " TEETH" : "EMPTY"}`).setX(Math.max(605, this.axleB));
      this.readout.setText(
        s.running || this.run > 0 || s.completed ? `Drive ${motion.drive.toFixed(1)} turns  /  A ${Math.abs(motion.axle).toFixed(2)}  /  B ${motion.output.toFixed(2)}` : "Fit both cogs. Calculate the crank turns."
      );
      const g = this.lines;
      g.clear();
      g.lineStyle(17, 530715, 0.8).lineBetween(333, 280, 730, 280);
      g.lineStyle(3, 7825227).lineBetween(333, 271, 730, 271).lineBetween(333, 286, 730, 286);
      for (const [x, n] of [
        [this.axleA, 0],
        [this.axleB, 1]
      ]) {
        g.lineStyle(2, n === 0 ? 12690277 : 7057838, 0.65).strokeCircle(x, 270, 58);
        g.lineStyle(1, 12768192, 0.6).lineBetween(x - 72, 270, x + 72, 270).lineBetween(x, 198, x, 342);
        g.fillStyle(9479844).fillCircle(x, 270, 7);
      }
      g.lineStyle(2, 7253418, 0.7).lineBetween(437, 180, this.axleA, 234);
      this.cogs.forEach((c) => {
        const actualSlot = s.answer[0] === c.index ? 0 : s.answer[1] === c.index ? 1 : -1;
        if (this.dragging !== c.index) {
          c.root.setPosition(
            actualSlot === 0 ? this.axleA : actualSlot === 1 ? this.axleB : 200 + c.index * 185,
            actualSlot >= 0 ? 270 : 560
          );
          c.root.setScale(actualSlot >= 0 ? 1 : 0.55).setDepth(actualSlot === 0 ? 6 : 10);
          c.wheel.setRotation(
            actualSlot === 0 ? motion.axle * Math.PI * 2 + 0.08 : actualSlot === 1 ? motion.output * Math.PI * 2 + 0.08 : 0
          );
          c.label.setVisible(actualSlot !== 0);
        }
        this.labels[c.index].setText(
          actualSlot === 0 ? "ON AXLE A" : actualSlot === 1 ? "ON AXLE B" : `${lock.gears[c.index].teeth} TEETH`
        );
        this.labels[c.index].setAlpha(actualSlot >= 0 ? 0.55 : 1);
      });
      this.glow.clear();
      if (s.selected !== null && !s.running && !s.completed) {
        const root = this.cogs[s.selected].root;
        this.glow.lineStyle(3, 16768139, 0.9).strokeCircle(root.x, root.y, gearRadius(lock.gears[s.selected].teeth) * root.scaleX + 9);
      }
      const releaseElapsed = s.running && s.passed ? this.elapsed : s.completed ? 100 : 0;
      this.rig.draw(releaseElapsed, this.axleB, 270, motion.output);
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
          "Clockwork gear puzzle and release machine. Use cog controls for keyboard operation."
        );
      }
    }
  });
  const resize = new ResizeObserver(() => {
    game.scale.setParentSize(parent.clientWidth, parent.clientHeight);
  });
  resize.observe(parent);
  return {
    destroy: () => {
      resize.disconnect();
      game.destroy(true);
    }
  };
}
export {
  mountGearScene
};
//# debugId=3c136ac7-9cd7-5118-a276-26d463bec121
//# sourceMappingURL=chunk-BEV7MLPV.js.map
