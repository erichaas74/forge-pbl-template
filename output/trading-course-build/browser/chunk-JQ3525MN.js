import {
  BalanceMetalwork,
  DioramaSurfaces,
  RoomEnvironment,
  batchMetalwork
} from "./chunk-KI3SHDPD.js";
import "./chunk-4GBFXHP3.js";
import {
  balancePlacements,
  balanceReading,
  canPlaceBalanceWeight,
  formatPiece,
  pistonMassLabel,
  scaleOffset,
  usesPiston
} from "./chunk-YQ5R4IZP.js";
import {
  ACESFilmicToneMapping,
  CatmullRomCurve3,
  CylinderGeometry,
  DirectionalLight,
  Group,
  HemisphereLight,
  MathUtils,
  OrthographicCamera,
  PCFSoftShadowMap,
  PMREMGenerator,
  Plane,
  Raycaster,
  SRGBColorSpace,
  Scene,
  TubeGeometry,
  Vector2,
  Vector3,
  WebGLRenderer
} from "./chunk-E3MFW572.js";
import {
  __spreadProps,
  __spreadValues
} from "./chunk-GOMI4DH3.js";

// src/app/templates/heist/escape/balance-lock/balance-lock.3d-layout.ts
var balanceStageLayout = `<style>
 [data-balance-3d]{display:block;position:relative;background:#0b151b;color:#e8e4d7;font-family:system-ui,sans-serif;isolation:isolate}
 [data-balance-3d] *{box-sizing:border-box}
 [data-balance-3d] .b3d-toolbar{display:flex;justify-content:space-between;align-items:center;gap:12px;padding:15px 20px;border-bottom:1px solid #ffffff12}
 [data-balance-3d] .b3d-focus{font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#d9c49b}
 [data-balance-3d] .b3d-mechanism{font-size:10px;letter-spacing:1.7px;color:#9cb3b5}
 [data-balance-3d] .b3d-scene-container{position:relative}
 [data-balance-3d] .b3d-scroll-hint{display:none;margin:0;padding:8px 12px;font-size:10px;color:#a5b8be}
 @media(max-width:760px){[data-balance-3d] .b3d-scroll-hint{display:block}}
 [data-balance-3d] .b3d-scene-scroll:focus-visible{outline:2px solid #aee6d0;outline-offset:-2px}
 [data-balance-3d] button{font:inherit;cursor:pointer}
 [data-balance-3d] .b3d-scene-scroll{overflow-x:auto;overscroll-behavior-x:contain}[data-balance-3d] .b3d-viewport{min-width:var(--balance-min-width);position:relative;height:var(--balance-3d-height,clamp(410px,44vw,570px));min-height:360px;background:radial-gradient(ellipse at 45% 40%,#23363d,#0b151b 78%)}
 [data-balance-3d] canvas{display:block;width:100%;height:100%;touch-action:none}
 [data-balance-3d] .b3d-reading{position:absolute;left:22px;top:20px;pointer-events:none;font-size:12px;line-height:1.65;color:#a5b8be;max-width:46%;text-shadow:0 1px 4px #000}
 [data-balance-3d] .b3d-reading strong{display:block;color:#f0e5c6;font-size:17px;letter-spacing:.2px;font-weight:500}
 [data-balance-3d] .b3d-state{position:absolute;right:20px;bottom:20px;font-size:10px;letter-spacing:1.7px;color:#c4cbc7;padding:10px 13px;background:#0c1921cb;border:1px solid #b1c5bc33;border-radius:6px;pointer-events:none}
 [data-balance-3d][data-released=true] .b3d-state{color:#b6f4cf;border-color:#74c79577}
 [data-balance-3d] .b3d-tray{padding:17px 20px 20px;border-top:1px solid #a7b7b523;background:linear-gradient(125deg,#213034,#16262c)}
 [data-balance-3d] .b3d-tray-title{display:flex;align-items:center;justify-content:space-between;margin-bottom:13px;gap:12px;font-size:11px;letter-spacing:1.7px;color:#d2bf95}
 [data-balance-3d] .b3d-tray-title small{font-size:11px;letter-spacing:0;color:#b1c1c4;line-height:1.5;text-align:right}
 [data-balance-3d] .b3d-weights{display:grid;grid-template-columns:repeat(auto-fit,minmax(95px,1fr));gap:10px}
 [data-balance-3d] .b3d-weight{display:flex;align-items:center;justify-content:center;flex-direction:column;position:relative;min-height:80px;padding:11px 8px 8px;border:1px solid #a692584c;border-radius:9px;background:linear-gradient(150deg,#455055,#1f3035 75%);color:#f1e4c3;box-shadow:0 5px 10px #0003;touch-action:none;transition:background .18s,box-shadow .18s}
 [data-balance-3d] .b3d-weight::before{content:'';display:block;width:25px;height:5px;background:linear-gradient(90deg,#6d5431,#e0c580,#857049);border-radius:4px;margin-bottom:6px}
 [data-balance-3d] .b3d-weight strong{font:500 24px Georgia,serif}
 [data-balance-3d] .b3d-weight small{font-size:9px;letter-spacing:1px;color:#b4c0ba;margin-top:5px}
 [data-balance-3d] .b3d-weight[aria-pressed=true]{border-color:#b8edcc;background:#36544c;box-shadow:0 0 0 2px #a0ddbc33}
 [data-balance-3d] button:focus-visible{outline:3px solid #aee6d0;outline-offset:3px}
 [data-balance-3d] button:disabled{opacity:.45;cursor:default}
 [data-balance-3d] .b3d-placement{display:flex;gap:8px;flex-wrap:wrap;margin-top:12px}
 [data-balance-3d] .b3d-placement[hidden]{display:none}
 [data-balance-3d] .b3d-placement button{min-height:40px;border:1px solid #718d83;border-radius:6px;background:#263e3d;color:#e5e7d3;padding:7px 14px;font-size:12px;flex:1}
 [data-balance-3d] .b3d-drag{position:absolute;pointer-events:none;z-index:3;transform:translate(-50%,-50%);background:#d2b471;color:#26332d;border:1px solid #f6e4a5;border-radius:8px;padding:14px;font:700 24px Georgia;box-shadow:0 9px 25px #0008}
 @media(max-width:600px){[data-balance-3d] .b3d-toolbar{padding:10px 12px;gap:7px}[data-balance-3d] .b3d-focus{font-size:9px;letter-spacing:1px}[data-balance-3d] .b3d-mechanism{font-size:9px;letter-spacing:.7px}[data-balance-3d] .b3d-viewport{height:400px}[data-balance-3d] .b3d-reading{left:14px;top:12px;font-size:10px}[data-balance-3d] .b3d-reading strong{font-size:14px}[data-balance-3d] .b3d-state{right:12px;bottom:12px;padding:8px;font-size:8px}[data-balance-3d] .b3d-tray{padding:14px 12px}[data-balance-3d] .b3d-weights{grid-template-columns:repeat(3,minmax(0,1fr));gap:8px}[data-balance-3d] .b3d-weight{min-height:76px}[data-balance-3d] .b3d-weight strong{font-size:21px}}
 [data-balance-3d] .b3d-toolbar{padding:8px 14px}
 [data-balance-3d] .b3d-tray{padding:10px 14px 12px}
 [data-balance-3d] .b3d-tray-title{margin-bottom:8px;font-size:10px}
 [data-balance-3d] .b3d-weight{min-height:62px;padding:7px}
 [data-balance-3d] .b3d-weight strong{font-size:21px}
 @media(max-width:600px){[data-balance-3d] .b3d-viewport{height:var(--balance-3d-height,360px);min-height:300px}[data-balance-3d] .b3d-reading{max-width:70%;padding:3px 6px;background:#12252ddb;border-radius:4px}[data-balance-3d] .b3d-tray-title{font-size:9px;gap:6px}[data-balance-3d] .b3d-tray-title small{font-size:9px}}
 </style>
 <div class="b3d-toolbar" aria-hidden="true" style="display:none"><span class="b3d-focus" data-focus-label></span><span class="b3d-mechanism" data-mechanism-label></span></div>
 <div class="b3d-scene-container"><div class="b3d-scene-scroll" tabindex="0" role="region" aria-label="Complete lock mechanism. Scroll sideways on a narrow screen."><div class="b3d-viewport"></div></div><div class="b3d-reading"><strong data-equation></strong><span data-reading style="display:none"></span></div><div class="b3d-state" role="status" data-lock-state></div></div>

 <div class="b3d-tray"><div class="b3d-tray-title"><span data-tray-label></span></div><div class="b3d-weights" role="group" aria-label="3D workshop weight tray"></div><div class="b3d-placement" role="group" aria-label="Place selected weight" hidden><button data-place="1">Left pan</button><button data-place="2">Right pan</button><button data-place="0">Return to tray</button></div></div>`;

// src/app/templates/heist/escape/balance-lock/balance-lock.3d-model.ts
var STATION = {
  center: -0.94,
  half: 0.94,
  beam: 2.8,
  pan: 1.72,
  axis: -0.68,
  pin: 0,
  left: -1.88,
  right: 0,
  spacing: 2.75,
  panRadius: 0.42
};
function suspendedPin(art, parent, x, number, counterweight) {
  const root = new Group();
  root.position.x = x;
  parent.add(root);
  art.box(root, 0, STATION.axis, -0.16, 1.03, 2.5, 0.2, art.dark, 0.09);
  art.box(root, -0.61, STATION.axis, 0.02, 0.2, 2.63, 0.37, art.steel);
  art.box(root, 0.61, STATION.axis, 0.02, 0.2, 2.63, 0.37, art.steel);
  if (number) art.label(root, String(number), 0, -1.74, 0.04, 0.3, 0.14, "#9babb1");
  const indicator = art.box(root, 0.63, 0.79, 0.12, 0.07, 0.07, 0.06, art.dark);
  const pin = new Group();
  pin.name = `hanging-piston-${number}`;
  root.add(pin);
  for (const sign of [-1, 1]) {
    art.cylinder(pin, 0, sign * 0.548, 0.12, counterweight ? 0.31 : 0.26, 0.8);
    const rim = art.torus(pin, 0, sign * 0.158, 0.12, counterweight ? 0.294 : 0.244, 0.019);
    rim.rotation.x = Math.PI / 2;
  }
  art.box(pin, 0, 0, -0.1, 0.24, 0.32, 0.055, art.brass, 0.01);
  art.torus(pin, 0, 1.035, 0.12, 0.079, 0.026);
  if (counterweight) {
    art.box(pin, 0, 0.61, 0.415, 0.54, 0.4, 0.04, art.dark, 0.025);
    art.label(pin, "MASS", 0, 0.745, 0.439, 0.28, 0.065, "#b2c8c5");
    art.label(pin, counterweight, 0, 0.575, 0.444, 0.49, 0.2, "#ffe1a1");
  }
  const rope = new Group();
  root.add(rope);
  const length = (counterweight ? STATION.beam : STATION.pan - 0.04) - (STATION.axis + 1.14);
  art.cylinder(rope, 0, length / 2, 0.12, 0.021, length, art.rope);
  for (const phase of [0, Math.PI]) {
    const points = [];
    for (let i = 0; i <= 96; i++) {
      const angle = i / 96 * Math.PI * 26 + phase;
      points.push(
        new Vector3(Math.cos(angle) * 0.022, i / 96 * length, 0.12 + Math.sin(angle) * 0.022)
      );
    }
    art.mesh(
      new TubeGeometry(new CatmullRomCurve3(points), 96, 6e-3, 4, false),
      art.rope,
      rope
    );
  }
  return { root, pin, rope, indicator, ropeLength: length };
}
function lockFrame(art, parent, xs) {
  const left = xs[0] + STATION.left - 0.6, right = xs[xs.length - 1] + 0.78, width = right - left;
  const housing = new Group();
  housing.name = "shared-lock-housing";
  parent.add(housing);
  art.box(
    housing,
    (left + right) / 2,
    STATION.axis,
    -0.35,
    width + 0.12,
    2.93,
    0.4,
    art.trim,
    0.12
  );
  for (const y of [0.72, -2.08]) {
    art.box(housing, (left + right) / 2, y, 0, width, 0.18, 0.4, art.steel);
    for (const x of [left + 0.16, right - 0.16]) art.screw(housing, x, y, 0.23);
  }
  const latchX = right + 0.33;
  art.box(parent, latchX, STATION.axis, -0.12, 0.4, 0.8, 0.58, art.steel);
  art.box(parent, latchX - 0.04, STATION.axis, 0.184, 0.3, 0.26, 0.05, art.dark, 0.01);
  for (const y of [STATION.axis + 0.31, STATION.axis - 0.31]) art.screw(parent, latchX, y, 0.19);
  const bolt = new Group();
  bolt.name = "shared-sliding-bolt";
  parent.add(bolt);
  const boltLeft = left - 0.3, boltRight = latchX + 0.06;
  art.box(
    bolt,
    (boltLeft + boltRight) / 2,
    STATION.axis,
    0.24,
    boltRight - boltLeft,
    0.18,
    0.16,
    art.steel,
    0.035
  );
  art.box(bolt, boltLeft + 0.07, STATION.axis, 0.24, 0.1, 0.3, 0.24, art.trim);
  return { bolt, housing, left, right: latchX + 0.25 };
}
function pan(art, parent, side) {
  const group = new Group();
  group.userData["side"] = side;
  parent.add(group);
  const dish = art.mesh(
    new CylinderGeometry(STATION.panRadius, 0.34, 0.09, 48),
    art.brass,
    group
  );
  dish.userData["side"] = side;
  const rim = art.torus(group, 0, 0.045, 0, 0.407, 0.02);
  rim.rotation.x = Math.PI / 2;
  const inner = art.cylinder(group, 0, 0.05, 0, 0.365, 0.017, art.trim);
  inner.userData["side"] = side;
  return group;
}
function createBalanceStage(art, lock) {
  const piston = usesPiston(lock);
  const root = new Group();
  root.name = "integrated-balance-lock";
  const pinXs = lock.scales.map((_, i) => (i - (lock.scales.length - 1) / 2) * STATION.spacing);
  const frame = lockFrame(art, root, pinXs);
  const scales = pinXs.map((x, index) => {
    const group = new Group();
    group.name = `scale-${index + 1}`;
    group.userData["scale"] = index;
    group.position.x = x;
    root.add(group);
    const beam = new Group();
    beam.position.set(STATION.center, STATION.beam, 0);
    group.add(beam);
    art.box(beam, 0, 0, 0, STATION.half * 2 + 0.12, 0.12, 0.18, art.brass, 0.035);
    for (const dx of [-0.72, -0.37, 0.37, 0.72]) art.screw(beam, dx, 0, 0.105);
    art.box(group, STATION.center, 1.77, -0.13, 0.14, 2.05, 0.25, art.brass);
    art.box(group, STATION.center, 0.85, -0.1, 0.48, 0.15, 0.5, art.brass);
    for (const dx of [-0.17, 0.17]) art.screw(group, STATION.center + dx, 0.84, 0.17);
    const hub = art.cylinder(group, STATION.center, STATION.beam, 0.1, 0.16, 0.23);
    hub.rotation.x = Math.PI / 2;
    const focusRing = art.torus(group, STATION.center, STATION.beam, 0.23, 0.105, 0.026, art.steel);
    art.label(group, String(index + 1), STATION.center, 3.22, 0.1, 0.26, 0.2, "#e8d5ad");
    const pans = piston ? [pan(art, group, 2)] : [pan(art, group, 1), pan(art, group, 2)];
    const chains = pans.map(
      () => [-1, 1].map(() => art.rod(group, new Vector3(), new Vector3(0, 1, 0), 0.012))
    );
    const connector = piston ? art.rod(group, new Vector3(), new Vector3(0, 0.1, 0), 0.035, art.steel) : void 0;
    const suspension = piston ? art.torus(group, 0, STATION.beam, 0.12, 0.048, 0.015, art.steel) : void 0;
    art.box(group, STATION.center - 0.1, -1.45, -0.09, 0.84, 0.56, 0.08, art.dark);
    art.label(
      group,
      `SCALE ${index + 1}`,
      STATION.center - 0.1,
      -1.45,
      -0.035,
      0.64,
      0.16,
      "#c5bd9d"
    );
    for (const y of [-0.31, -1.04]) {
      art.box(group, STATION.center - 0.16, y, -0.06, 0.72, 0.045, 0.035, art.brass, 0.01);
    }
    return { root: group, beam, pans, chains, focusRing, connector, suspension };
  });
  const pins = pinXs.map((x, i) => {
    const pin = suspendedPin(art, root, x, i + 1, piston ? pistonMassLabel(lock, i) : void 0);
    pin.root.userData["scale"] = i;
    return pin;
  });
  const center = (frame.left + frame.right) / 2;
  const width = frame.right - frame.left + 0.7;
  const floor = art.box(root, center, -2.28, -0.18, width, 0.14, 2.1, art.dark, 0.04);
  floor.receiveShadow = true;
  return { root, scales, pins, masterBolt: frame.bolt, housing: frame.housing, center, width };
}
function positionBalanceStage(stage, art, offsets, active, release) {
  stage.scales.forEach((scale, index) => {
    const shift = -offsets[index] / 65;
    scale.beam.rotation.z = Math.asin(shift / STATION.half);
    scale.focusRing.material = index === active ? art.glow : art.steel;
    for (const [i, pan2] of scale.pans.entries()) {
      const side = i === 0 ? -1 : 1;
      pan2.position.set(i === 0 ? STATION.left : STATION.right, STATION.pan + side * shift, 0);
      const start = new Vector3(
        STATION.center + side * Math.cos(scale.beam.rotation.z) * STATION.half,
        STATION.beam + side * shift,
        0
      );
      for (const [j, chain] of scale.chains[i].entries())
        art.positionRod(
          chain,
          start,
          new Vector3(pan2.position.x + (j === 0 ? -0.35 : 0.35), pan2.position.y + 0.05, 0.04)
        );
    }
    if (scale.connector && scale.suspension) {
      const endY = STATION.beam + shift;
      art.positionRod(
        scale.connector,
        new Vector3(
          STATION.center + Math.cos(scale.beam.rotation.z) * STATION.half - 0.035,
          endY,
          0.12
        ),
        new Vector3(0.025, endY, 0.12)
      );
      scale.suspension.position.y = endY;
    }
    const pin = stage.pins[index];
    pin.pin.position.y = STATION.axis + shift;
    pin.rope.position.y = STATION.axis + 1.14 + shift;
    pin.indicator.material = Math.abs(shift) < 2e-3 ? art.glow : art.dark;
  });
  stage.masterBolt.position.x = -release * 0.65;
}
function createBalanceWeights(art, lock, active, parent) {
  const scale = lock.scales[active], offset = scaleOffset(lock, active);
  return [
    ...usesPiston(lock) ? [] : scale.left.map((piece) => ({ piece, index: -1, fixed: 1 })),
    ...usesPiston(lock) ? [] : scale.right.map((piece) => ({ piece, index: -1, fixed: 2 })),
    ...scale.pieces.map((piece, i) => ({ piece, index: offset + i, fixed: 0 }))
  ].map((definition) => {
    const root = new Group();
    parent.add(root);
    root.userData["weight"] = definition.fixed ? void 0 : definition.index;
    art.mesh(new CylinderGeometry(0.205, 0.26, 0.39, 32), art.brass, root, 0, 0.24, 0);
    art.cylinder(root, 0, 0.055, 0, 0.27, 0.07);
    art.torus(root, 0, 0.48, 0, 0.083, 0.022);
    art.box(root, 0, 0.235, 0.238, 0.42, 0.25, 0.04, art.dark, 0.035);
    art.label(root, formatPiece(definition.piece), 0, 0.26, 0.266, 0.4, 0.18);
    if (definition.fixed) art.label(root, "FIXED", 0, 0.12, 0.266, 0.22, 0.06, "#afd2cc");
    return __spreadProps(__spreadValues({}, definition), { root });
  });
}

// src/app/templates/heist/escape/balance-lock/balance-lock.motion.ts
function balancePinTargets(lock, placements) {
  return lock.scales.map((_, i) => {
    const reading = balanceReading(lock, i, placements);
    const ratio = reading.difference / Math.max(reading.left + reading.right, 1e-3);
    return {
      aligned: reading.balanced,
      // A near miss must remain visibly outside the bolt's clearance band.
      offset: reading.balanced ? 0 : Math.sign(ratio) * Math.max(19, Math.min(32, Math.abs(ratio) * 48)),
      reading
    };
  });
}

// src/app/templates/heist/escape/balance-lock/balance-lock.environment.ts
function createBalanceEnvironment(art, center, width) {
  const root = new Group(), surfaces = new DioramaSurfaces(art);
  const stone = surfaces.stone(5399402), edge = surfaces.stone(3557199), wood = surfaces.wood(7492667);
  const left = center - width / 2 - 0.32, right = center + width / 2 + 0.32;
  art.box(root, center, 0.6, -1.02, width + 1.35, 6.55, 0.42, edge, 0.08);
  for (let row = 0; row < 7; row++)
    for (let col = 0; col < Math.ceil((width + 1.1) / 0.92); col++) {
      const x = left + col * 0.94;
      art.box(
        root,
        x,
        -2.15 + row * 0.91,
        -0.76,
        0.9,
        0.86,
        0.2,
        (row + col) % 5 ? stone : edge,
        0.04
      );
    }
  for (const x of [left - 0.35, right + 0.35]) {
    art.box(root, x, 0.54, -0.36, 0.26, 6.5, 0.55, edge);
    for (const y of [-2.35, 3.54]) art.box(root, x, y, -0.29, 0.55, 0.22, 0.7, stone);
  }
  art.box(root, center, -2.37, 0.05, width + 1.5, 0.18, 2.7, wood);
  art.box(root, center, -2.52, 0.6, width + 1.62, 0.12, 3.9, edge);
  art.box(root, center, 3.53, -0.66, width + 1.12, 0.11, 0.45, art.brass);
  for (const x of [left + 0.2, right - 0.2])
    for (let y = -1.8; y < 3.2; y += 0.8) art.screw(root, x, y, -0.54);
  batchMetalwork(art, root);
  return root;
}

// src/app/templates/heist/escape/balance-lock/balance-lock.3d-scene.ts
function mountBalanceScene(parent, lock, snapshot, callbacks) {
  const root = document.createElement("div");
  root.setAttribute("data-balance-3d", "");
  root.style.setProperty("--balance-min-width", `${Math.max(340, lock.scales.length * 245)}px`);
  root.innerHTML = balanceStageLayout;
  const piston = usesPiston(lock);
  if (piston) {
    root.querySelector('[data-place="1"]').remove();
    root.querySelector('[data-place="2"]').textContent = "Place on weight pan";
  }
  parent.append(root);
  const viewport = root.querySelector(".b3d-viewport"), scroller = root.querySelector(".b3d-scene-scroll"), tray = root.querySelector(".b3d-weights");
  let renderer;
  try {
    renderer = new WebGLRenderer({ antialias: true, alpha: true, powerPreference: "low-power" });
  } catch (error) {
    root.remove();
    throw error;
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = PCFSoftShadowMap;
  renderer.toneMapping = ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.08;
  renderer.outputColorSpace = SRGBColorSpace;
  renderer.setClearColor(726299, 0);
  const canvas = renderer.domElement;
  canvas.setAttribute("role", "img");
  canvas.setAttribute("aria-label", "Interactive 3D scales connected to one hanging-pin lock");
  viewport.prepend(canvas);
  const scene = new Scene(), camera = new OrthographicCamera(-4, 4, 3, -3, 0.1, 80);
  const environment = new RoomEnvironment(), pmrem = new PMREMGenerator(renderer), env = pmrem.fromScene(environment, 0.055);
  scene.environment = env.texture;
  scene.environmentIntensity = 1.05;
  environment.dispose();
  pmrem.dispose();
  scene.add(new HemisphereLight(14150124, 2307132, 0.8));
  const key = new DirectionalLight(16770237, 2.6);
  key.position.set(-3.5, 7, 6);
  key.castShadow = true;
  key.shadow.mapSize.set(2048, 2048);
  Object.assign(key.shadow.camera, { left: -8, right: 8, top: 6, bottom: -6, near: 0.5, far: 25 });
  key.shadow.bias = -5e-4;
  key.shadow.normalBias = 0.025;
  scene.add(key);
  const rim = new DirectionalLight(12707567, 1.8);
  rim.position.set(4, 3, -1);
  scene.add(rim);
  const art = new BalanceMetalwork(), stage = createBalanceStage(art, lock);
  scene.add(stage.root);
  scene.add(createBalanceEnvironment(art, stage.center, stage.width));
  const weights = stage.scales.map((scale, i) => createBalanceWeights(art, lock, i, scale.root));
  let active = -1, placements, selected;
  let targets = balancePinTargets(lock, snapshot().placements), offsets = targets.map((t) => t.offset), release = 0, frame = 0, lastTime = performance.now(), disposed = false, dirty = true, previousPaused = false, previousCompleted = false, contextUnavailable = false;
  const raycaster = new Raycaster(), pointer = new Vector2();
  const dragLabel = document.createElement("div");
  dragLabel.className = "b3d-drag";
  dragLabel.hidden = true;
  root.append(dragLabel);
  let drag;
  let ignoreCanvasClick = false;
  const text = (selector, value) => {
    const element = root.querySelector(selector);
    if (element.textContent !== value) element.textContent = value;
  };
  function revealActiveScale() {
    if (active < 0) return;
    scroller.scrollLeft = (scroller.scrollWidth - scroller.clientWidth) * active / Math.max(1, lock.scales.length - 1);
  }
  function resize() {
    const width = Math.max(200, viewport.clientWidth), height = Math.max(280, viewport.clientHeight), aspect = width / height;
    const worldHeight = Math.max(7.4, (stage.width + 2) / aspect);
    camera.left = -worldHeight * aspect / 2;
    camera.right = worldHeight * aspect / 2;
    camera.top = worldHeight / 2;
    camera.bottom = -worldHeight / 2;
    camera.position.set(stage.center + 0.6, 3.3, 20);
    camera.lookAt(stage.center, 0.45, 0);
    camera.updateProjectionMatrix();
    renderer.setSize(width, height, false);
    revealActiveScale();
    dirty = true;
  }
  function focus(s) {
    active = s.active;
    drag = void 0;
    dragLabel.hidden = true;
    tray.replaceChildren();
    const offset = scaleOffset(lock, active);
    lock.scales[active].pieces.forEach((piece, i) => {
      const button = document.createElement("button");
      button.className = "b3d-weight";
      button.dataset["weight"] = String(offset + i);
      button.setAttribute("aria-label", `Weight ${formatPiece(piece)}, piece ${i + 1}`);
      const name = document.createElement("strong");
      name.textContent = formatPiece(piece);
      const location = document.createElement("small");
      button.append(name, location);
      tray.append(button);
    });
    text("[data-focus-label]", `WORKING ON SCALE ${active + 1} / ${lock.scales.length}`);
    text("[data-mechanism-label]", `ONE LOCK \xB7 ${lock.scales.length} SCALES`);
    text("[data-tray-label]", `SCALE ${active + 1} \xB7 WEIGHT TRAY`);
    root.dataset["activeScale"] = String(active);
    revealActiveScale();
    placements = void 0;
    selected = void 0;
    dirty = true;
  }
  function update(s) {
    targets = balancePinTargets(lock, s.placements);
    placements = s.placements;
    selected = s.selected;
    const target = targets[active];
    text("[data-equation]", target.reading.equation);
    const positions = balancePlacements(lock, s.placements);
    text(
      "[data-reading]",
      target.aligned ? piston ? "Pan and piston match. Cutout aligned." : "This pin is aligned." : piston ? target.offset > 0 ? `Piston mass ${pistonMassLabel(lock, active)}. Add weight to lift it.` : `Piston mass ${pistonMassLabel(lock, active)}. Remove weight to lower it.` : target.offset < 0 ? "Add mass to lower this pin." : "Remove mass to raise this pin."
    );
    canvas.setAttribute(
      "aria-label",
      `One lock with ${targets.length} scales and ${piston ? "piston counterweights" : "hanging pins"}. Active scale ${active + 1}: ${target.reading.equation}. ${targets.filter((t) => t.aligned).length} of ${targets.length} pins aligned.`
    );
    root.querySelectorAll(".b3d-weight").forEach((button) => {
      const index = Number(button.dataset["weight"]);
      button.setAttribute("aria-pressed", String(s.selected === index));
      button.disabled = s.paused || s.completed;
      button.querySelector("small").textContent = positions[index] === 1 ? "LEFT PAN" : positions[index] === 2 ? piston ? "WEIGHT PAN" : "RIGHT PAN" : "IN TRAY";
    });
    root.querySelector(".b3d-placement").hidden = s.selected === null;
    root.querySelectorAll("[data-place]").forEach((button) => button.disabled = s.paused || s.completed);
    dirty = true;
  }
  function positionWeights(s) {
    const positions = balancePlacements(lock, s.placements);
    weights.forEach((scaleWeights, scaleIndex) => {
      const bySide = [1, 2].map(
        (side) => scaleWeights.filter((weight) => (weight.fixed || positions[weight.index]) === side)
      );
      scaleWeights.forEach((weight) => {
        const side = weight.fixed || positions[weight.index] || 0;
        weight.root.visible = side !== 0;
        if (!side) return;
        const list = bySide[side - 1], index = list.indexOf(weight), count = Math.min(3, list.length), pan2 = stage.scales[scaleIndex].pans.find((pan3) => pan3.userData["side"] === side);
        const size = list.length > 2 ? 0.48 : 0.67;
        weight.root.scale.setScalar(size);
        weight.root.position.set(
          pan2.position.x + (index % 3 - (count - 1) / 2) * (list.length === 2 ? 0.37 : 0.27),
          pan2.position.y + 0.065 + Math.floor(index / 3) * 0.26,
          0.12
        );
      });
    });
  }
  function tick(now) {
    if (disposed || contextUnavailable) return;
    const s = snapshot(), dt = Math.max(0, Math.min(1, (now - lastTime) / 1e3));
    lastTime = now;
    if (s.active !== active) focus(s);
    if (placements !== s.placements || selected !== s.selected || previousPaused !== s.paused || previousCompleted !== s.completed)
      update(s);
    if (s.paused) cancel();
    previousPaused = s.paused;
    previousCompleted = s.completed;
    if (!s.paused) {
      const nextOffsets = offsets.map(
        (value, i) => s.reducedMotion ? targets[i].offset : value + (targets[i].offset - value) * (1 - Math.exp(-dt * 8))
      );
      const settled = targets.every((target) => target.aligned) && nextOffsets.every((value) => Math.abs(value) < 0.2);
      const nextRelease = s.reducedMotion ? Number(settled) : MathUtils.clamp(release + (settled ? 1 : -1) * dt / 0.8, 0, 1);
      dirty ||= Math.abs(release - nextRelease) > 1e-4 || offsets.some((value, i) => Math.abs(value - nextOffsets[i]) > 1e-4);
      offsets = nextOffsets;
      release = nextRelease;
    }
    if (dirty) {
      positionBalanceStage(stage, art, offsets, active, release);
      positionWeights(s);
      text(
        "[data-lock-state]",
        release > 0.98 ? "MASTER BOLT OPEN" : `${targets.filter((t) => t.aligned).length} / ${targets.length} PINS ALIGNED \xB7 ${targets.every((t) => t.aligned) ? "RELEASING" : "LOCKED"}`
      );
      root.dataset["released"] = String(release > 0.98);
      root.dataset["pinOffsets"] = offsets.map((v) => v.toFixed(2)).join(",");
      renderer.render(scene, camera);
      dirty = false;
    }
    frame = requestAnimationFrame(tick);
  }
  function hit(event) {
    const bounds = canvas.getBoundingClientRect();
    pointer.set(
      (event.clientX - bounds.left) / bounds.width * 2 - 1,
      -(event.clientY - bounds.top) / bounds.height * 2 + 1
    );
    raycaster.setFromCamera(pointer, camera);
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)
      return void 0;
    return raycaster.intersectObjects(stage.root.children, true).find((entry) => entry.object.visible && visibleParent(entry.object));
  }
  function visibleParent(object) {
    return !object.parent || object.parent.visible && visibleParent(object.parent);
  }
  function owner(object, key2) {
    while (object) {
      if (typeof object.userData[key2] === "number") return object.userData[key2];
      object = object.parent ?? void 0;
    }
    return void 0;
  }
  function panAt(event) {
    const trayBounds = tray.getBoundingClientRect();
    if (event.clientX >= trayBounds.left && event.clientX <= trayBounds.right && event.clientY >= trayBounds.top && event.clientY <= trayBounds.bottom)
      return 0;
    const intersect = hit(event), side = owner(intersect?.object, "side");
    if (owner(intersect?.object, "scale") !== void 0 && owner(intersect?.object, "scale") !== active)
      return void 0;
    if (side) return side;
    const point = new Vector3();
    if (raycaster.ray.intersectPlane(new Plane(new Vector3(0, 0, 1), -0.1), point)) {
      const scale = stage.scales[active];
      for (const [index, pan2] of scale.pans.entries())
        if (Math.abs(point.x - scale.root.position.x - pan2.position.x) < 0.5 && Math.abs(point.y - pan2.position.y) < 0.55)
          return pan2.userData["side"];
    }
    return void 0;
  }
  function down(event) {
    ignoreCanvasClick = false;
    const s = snapshot();
    if (s.paused || s.completed || !(event.target instanceof Element)) return;
    const button = event.target.closest("[data-weight]");
    const object = event.target === canvas ? hit(event)?.object : void 0;
    const index = button ? Number(button.dataset["weight"]) : owner(object, "scale") === active ? owner(object, "weight") : void 0;
    if (index !== void 0) {
      drag = {
        pointer: event.pointerId,
        index,
        startX: event.clientX,
        startY: event.clientY,
        moved: false
      };
      dragLabel.textContent = formatPiece(
        lock.scales[active].pieces[index - scaleOffset(lock, active)]
      );
      root.setPointerCapture(event.pointerId);
      event.preventDefault();
    }
  }
  function move(event) {
    if (!drag || drag.pointer !== event.pointerId || snapshot().paused) return;
    drag.moved ||= Math.hypot(event.clientX - drag.startX, event.clientY - drag.startY) > 6;
    if (!drag.moved) return;
    event.preventDefault();
    const bounds = root.getBoundingClientRect();
    dragLabel.hidden = false;
    dragLabel.style.left = `${event.clientX - bounds.left}px`;
    dragLabel.style.top = `${event.clientY - bounds.top}px`;
  }
  function up(event) {
    if (!drag || drag.pointer !== event.pointerId) return;
    const held = drag;
    ignoreCanvasClick = true;
    drag = void 0;
    dragLabel.hidden = true;
    if (!snapshot().paused && !snapshot().completed) {
      if (held.moved) {
        const side = panAt(event);
        if (side !== void 0) callbacks.place(held.index, side);
      } else callbacks.select(held.index);
    }
    if (root.hasPointerCapture(event.pointerId)) root.releasePointerCapture(event.pointerId);
  }
  function cancel() {
    drag = void 0;
    dragLabel.hidden = true;
  }
  function click(event) {
    if (!(event.target instanceof Element)) return;
    if (event.target === canvas && ignoreCanvasClick) {
      ignoreCanvasClick = false;
      return;
    }
    const placeButton = event.target.closest("[data-place]");
    const s = snapshot();
    if (placeButton && s.selected !== null && !s.paused && !s.completed && canPlaceBalanceWeight(lock, Number(placeButton.dataset["place"]))) {
      callbacks.place(s.selected, Number(placeButton.dataset["place"]));
      root.querySelector(`[data-weight="${s.selected}"]`)?.focus({ preventScroll: true });
    }
    const weight = event.target.closest("[data-weight]");
    if (event.detail === 0 && weight && !s.paused && !s.completed) {
      cancel();
      callbacks.select(Number(weight.dataset["weight"]));
    }
    if (event.target === canvas && !s.paused && !s.completed) {
      const scale = owner(hit(event)?.object, "scale");
      if (scale !== void 0 && scale !== active) {
        cancel();
        callbacks.focus?.(scale);
        return;
      }
      const side = panAt(event);
      if (side && s.selected !== null) callbacks.place(s.selected, side);
    }
  }
  function contextLost(event) {
    event.preventDefault();
    cancel();
    contextUnavailable = true;
    cancelAnimationFrame(frame);
    callbacks.failed();
  }
  root.addEventListener("pointerdown", down);
  root.addEventListener("pointermove", move);
  root.addEventListener("pointerup", up);
  root.addEventListener("pointercancel", cancel);
  root.addEventListener("click", click);
  canvas.addEventListener("webglcontextlost", contextLost);
  const observer = new ResizeObserver(resize);
  observer.observe(viewport);
  resize();
  focus(snapshot());
  update(snapshot());
  positionBalanceStage(stage, art, offsets, active, release);
  positionWeights(snapshot());
  renderer.render(scene, camera);
  callbacks.ready();
  frame = requestAnimationFrame(tick);
  return {
    destroy() {
      disposed = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      root.removeEventListener("pointerdown", down);
      root.removeEventListener("pointermove", move);
      root.removeEventListener("pointerup", up);
      root.removeEventListener("pointercancel", cancel);
      root.removeEventListener("click", click);
      canvas.removeEventListener("webglcontextlost", contextLost);
      art.dispose();
      env.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      root.remove();
    }
  };
}
export {
  mountBalanceScene
};
//# debugId=69f0e336-51aa-5495-a760-481e7ff76bdc
//# sourceMappingURL=chunk-JQ3525MN.js.map
