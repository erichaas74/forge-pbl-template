import {
  stationPositions,
  studioCamera
} from "./chunk-IIEET437.js";
import {
  ACESFilmicToneMapping,
  BoxGeometry,
  CanvasTexture,
  CapsuleGeometry,
  CircleGeometry,
  Color,
  ConeGeometry,
  CylinderGeometry,
  DirectionalLight,
  Fog,
  Group,
  HemisphereLight,
  MathUtils,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  PCFSoftShadowMap,
  PerspectiveCamera,
  PlaneGeometry,
  PointLight,
  RepeatWrapping,
  SRGBColorSpace,
  Scene,
  SphereGeometry,
  TextureLoader,
  TorusGeometry,
  Vector3,
  WebGLRenderer
} from "./chunk-E3MFW572.js";
import "./chunk-GOMI4DH3.js";

// src/app/templates/competition-show/broadcast/studio-screens.ts
var StudioScreen = class {
  canvas = document.createElement("canvas");
  context;
  texture;
  constructor(width, height) {
    this.canvas.width = width;
    this.canvas.height = height;
    this.context = this.canvas.getContext("2d");
    this.texture = new CanvasTexture(this.canvas);
    this.texture.colorSpace = SRGBColorSpace;
  }
  clear(background) {
    const ctx = this.context;
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    ctx.fillStyle = background;
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    return ctx;
  }
  done() {
    this.texture.needsUpdate = true;
  }
  dispose() {
    this.texture.dispose();
    this.canvas.width = 1;
    this.canvas.height = 1;
  }
};
function text(ctx, value, x, y, size, color, width) {
  ctx.fillStyle = color;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = `600 ${size}px Arial, sans-serif`;
  while (ctx.measureText(value).width > width && size > 12) ctx.font = `600 ${--size}px Arial, sans-serif`;
  ctx.fillText(value, x, y);
}
function wrap(ctx, value, width) {
  const lines = [];
  let current = "";
  for (const word of value.split(/\s+/)) {
    if (ctx.measureText((current ? current + " " : "") + word).width > width && current) {
      lines.push(current);
      current = word;
    } else current += (current ? " " : "") + word;
  }
  if (current) lines.push(current);
  return lines;
}
function drawQuestion(screen, view, theme, background) {
  const ctx = screen.clear(theme.palette.background);
  const { width, height } = screen.canvas;
  if (background) {
    ctx.globalAlpha = 0.35;
    ctx.drawImage(background, 0, 0, width, height);
    ctx.globalAlpha = 1;
  }
  ctx.fillStyle = theme.palette.accent;
  ctx.fillRect(100, 55, width - 200, 4);
  text(ctx, view.phase === "champion" ? "CHAMPIONSHIP WINNER" : view.prompt ? view.roundTitle.toUpperCase() : "THE CHAMPIONSHIP", width / 2, 105, 36, theme.palette.accent, width - 220);
  if (view.prompt) {
    let size = 70;
    let lines;
    do {
      ctx.font = `600 ${size}px Arial, sans-serif`;
      lines = wrap(ctx, view.prompt, width - 230);
      if (lines.length * size * 1.35 < height - 280) break;
      size -= 2;
    } while (size > 20);
    const lineHeight = size * 1.35;
    lines.forEach((line, i) => text(ctx, line, width / 2, height / 2 - lines.length * lineHeight / 2 + i * lineHeight + 50, size, theme.palette.text, width - 220));
    if (["open", "paused"].includes(view.phase)) text(ctx, `${view.seconds} SECONDS${view.phase === "paused" ? " \xB7 PAUSED" : ""}`, width / 2, height - 60, 28, theme.palette.accent, width - 200);
  } else {
    const winner = view.teams.find((t) => t.id === view.winnerId);
    text(ctx, winner?.name.toUpperCase() ?? view.title.toUpperCase(), width / 2, height / 2, 102, theme.palette.text, width - 220);
    text(ctx, winner ? "A PERFORMANCE TO REMEMBER" : "EVERY TEAM HAS A STORY", width / 2, height / 2 + 120, 30, theme.palette.accent, width - 200);
  }
  screen.done();
}
function drawPodium(screen, team, theme, emblem) {
  const ctx = screen.clear("#070e1b");
  const width = screen.canvas.width;
  const glow = ctx.createLinearGradient(0, 0, width, 0);
  glow.addColorStop(0, "#070e1b");
  glow.addColorStop(0.5, team.color);
  glow.addColorStop(1, "#070e1b");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, width, 10);
  if (emblem) ctx.drawImage(emblem, width / 2 - 100, 40, 200, 200);
  else {
    ctx.strokeStyle = team.color;
    ctx.lineWidth = 6;
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const angle = Math.PI / 3 * i - Math.PI / 2;
      const x = width / 2 + Math.cos(angle) * 82;
      const y = 140 + Math.sin(angle) * 82;
      if (!i) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.stroke();
    text(ctx, team.name.slice(0, 2).toUpperCase(), width / 2, 145, 65, team.color, 135);
  }
  text(ctx, team.name.toUpperCase(), width / 2, 280, 48, theme.palette.text, width - 50);
  text(ctx, String(team.score), width / 2, 390, 108, "#ffffff", width - 50);
  text(ctx, `SEED ${team.seed}`, width / 2, 475, 23, team.color, width - 50);
  screen.done();
}
function rays(ctx, cx, cy, color, spin) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(spin);
  ctx.globalAlpha = 0.16;
  ctx.fillStyle = color;
  for (let i = 0; i < 24; i++) {
    ctx.rotate(Math.PI / 12);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(2600, -110);
    ctx.lineTo(2600, 110);
    ctx.closePath();
    ctx.fill();
  }
  ctx.restore();
}
function stamp(ctx, label, x, y, color, scale) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(-0.06);
  ctx.scale(scale, scale);
  ctx.lineWidth = 9;
  ctx.strokeStyle = color;
  ctx.globalAlpha = 0.9;
  const w = 30 + label.length * 46;
  ctx.beginPath();
  ctx.roundRect(-w / 2, -62, w, 124, 14);
  ctx.stroke();
  text(ctx, label, 0, 2, 86, color, w - 30);
  ctx.restore();
}
function drawVerdict(screen, view, theme, spin, reveal) {
  const ctx = screen.clear(theme.palette.background);
  const { width, height } = screen.canvas;
  const scored = view.teams.filter((t) => t.verdict !== null);
  const hero = scored.length === 1 ? scored[0] : void 0;
  const winner = hero ?? scored.find((t) => t.verdict === "correct");
  const glowColor = hero ? hero.verdict === "correct" ? hero.color : "#e0736b" : theme.palette.accent;
  rays(ctx, width / 2, height / 2, glowColor, spin);
  const wash = ctx.createRadialGradient(width / 2, height / 2, 40, width / 2, height / 2, width * 0.62);
  wash.addColorStop(0, `${glowColor}2e`);
  wash.addColorStop(1, "#00000000");
  ctx.fillStyle = wash;
  ctx.fillRect(0, 0, width, height);
  ctx.fillStyle = theme.palette.accent;
  ctx.fillRect(100, 55, (width - 200) * reveal, 4);
  text(ctx, "THE SCORES ARE IN", width / 2, 105, 34, theme.palette.accent, width - 220);
  if (hero) {
    const correct = hero.verdict === "correct";
    stamp(ctx, correct ? "CORRECT" : "NOT THIS TIME", width / 2, 300, correct ? hero.color : "#e0736b", 0.8 + reveal * 0.35);
    text(ctx, hero.name.toUpperCase(), width / 2, 470, 84, theme.palette.text, width - 260);
    const delta = hero.award ?? 0;
    text(
      ctx,
      `${delta >= 0 ? "+" : "\u2212"}${Math.abs(delta)} POINTS`,
      width / 2,
      610,
      Math.round(96 * (0.7 + reveal * 0.3)),
      correct ? hero.color : "#e0736b",
      width - 260
    );
    text(ctx, `${hero.score} TOTAL`, width / 2, 730, 40, theme.palette.text, width - 260);
    screen.done();
    return;
  }
  const rows = scored.slice(0, 8);
  const top = 210;
  const rowHeight = Math.min(92, (height - top - 90) / Math.max(1, rows.length));
  rows.forEach((team, i) => {
    const y = top + i * rowHeight;
    const correct = team.verdict === "correct";
    const appeared = Math.max(0, Math.min(1, reveal * rows.length - i));
    if (appeared <= 0) return;
    ctx.save();
    ctx.globalAlpha = appeared;
    ctx.fillStyle = team.id === winner?.id ? `${team.color}26` : "#0c1526cc";
    ctx.fillRect(150, y, width - 300, rowHeight - 12);
    ctx.fillStyle = correct ? team.color : "#e0736b";
    ctx.fillRect(150, y, 8, rowHeight - 12);
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.font = `600 ${Math.round(rowHeight * 0.42)}px Arial, sans-serif`;
    ctx.fillStyle = theme.palette.text;
    ctx.fillText(team.name, 200, y + (rowHeight - 12) / 2);
    ctx.textAlign = "right";
    ctx.fillStyle = correct ? team.color : "#e0736b";
    ctx.fillText(correct ? "\u2713" : "\u2717", width - 620, y + (rowHeight - 12) / 2);
    const delta = team.award ?? 0;
    ctx.fillText(`${delta >= 0 ? "+" : "\u2212"}${Math.abs(delta)}`, width - 420, y + (rowHeight - 12) / 2);
    ctx.fillStyle = theme.palette.text;
    ctx.fillText(String(team.score), width - 200, y + (rowHeight - 12) / 2);
    ctx.restore();
  });
  screen.done();
}

// src/app/templates/competition-show/broadcast/studio-avatar.ts
var avatarInterests = [
  { id: "tennis", label: "Tennis" },
  { id: "skiing", label: "Skiing" },
  { id: "fencing", label: "Fencing" },
  { id: "basketball", label: "Basketball" },
  { id: "skateboarding", label: "Skateboarding" },
  { id: "chess", label: "Chess" },
  { id: "drumming", label: "Drumming" },
  { id: "astronomy", label: "Astronomy" }
];
function rosterRotation(teamIds) {
  let hash = 0;
  for (const character of teamIds.join("|")) hash = (hash * 31 + character.charCodeAt(0)) % 100003;
  return hash;
}
function interestAt(index, rotation) {
  return avatarInterests[(index + rotation) % avatarInterests.length].id;
}
var skinTones = ["#e8c49a", "#c98f62", "#8d5a3b", "#f0d3b4", "#a86f47", "#6f4429"];
function avatarSkin(index) {
  return skinTones[index % skinTones.length];
}
var hairTones = ["#2b2019", "#4a2f1c", "#6b4423", "#1d2433", "#8a6a3f", "#d9c9a8"];
var hairStyles = ["crop", "bun", "long", "curls"];
var GEAR = "#d8dee9";
var expressions = {
  idle: [0.3, 0],
  ready: [0.45, 0.15],
  thinking: [-0.1, -0.45],
  answered: [0.35, 0.1],
  buzzed: [0.7, 0.8],
  correct: [1, 0.7],
  champion: [1, 0.9],
  missed: [-0.8, -0.7]
};
var StudioAvatar = class {
  constructor(color, skin, seedOffset, interest) {
    this.interest = interest;
    this.phase = seedOffset * 1.37;
    const shirt = this.material(color, 0.18);
    const flesh = this.material(skin, 0.06);
    const torso = this.mesh(new CapsuleGeometry(0.34, 0.52, 4, 12), shirt);
    torso.position.y = 0.95;
    this.body.add(torso);
    const shoulders = this.mesh(new CapsuleGeometry(0.17, 0.44, 4, 10), shirt);
    shoulders.rotation.z = Math.PI / 2;
    shoulders.position.y = 1.28;
    this.body.add(shoulders);
    const collar = this.mesh(new TorusGeometry(0.15, 0.045, 8, 16), this.material(color, 0.34));
    collar.rotation.x = Math.PI / 2;
    collar.position.y = 1.4;
    this.body.add(collar);
    const neck = this.mesh(new CylinderGeometry(0.115, 0.13, 0.2, 12), flesh);
    neck.position.y = 1.45;
    this.body.add(neck);
    this.head.position.y = 1.62;
    this.body.add(this.head);
    const skull = this.mesh(new SphereGeometry(0.26, 24, 18), flesh);
    this.head.add(skull);
    this.buildFace(flesh);
    this.buildHair(seedOffset);
    for (const side of [-1, 1]) {
      const arm = new Group();
      arm.position.set(side * 0.38, 1.32, 0);
      const limb = this.mesh(new CapsuleGeometry(0.1, 0.46, 4, 8), shirt);
      limb.position.y = -0.3;
      arm.add(limb);
      const hand = this.mesh(new SphereGeometry(0.115, 12, 10), flesh);
      hand.position.y = -0.58;
      arm.add(hand);
      arm.rotation.z = side * 0.12;
      this.body.add(arm);
      this.arms.push(arm);
    }
    this.prop.position.set(0.5, 1.62, 0.16);
    this.body.add(this.prop);
    this.propRest = this.buildInterest(interest, color);
    this.prop.rotation.z = this.propRest;
    this.body.traverse((object) => {
      if (object instanceof Mesh) {
        object.castShadow = true;
        object.receiveShadow = true;
      }
    });
    this.root.add(this.body);
  }
  interest;
  root = new Group();
  body = new Group();
  head = new Group();
  arms = [];
  brows = [];
  pupils = [];
  mouth;
  /** Held equipment, kept high so the podium never hides it. */
  prop = new Group();
  geometries = [];
  materials = [];
  mood = "idle";
  phase;
  propRest;
  raise = 0;
  lean = 0;
  hop = 0;
  curve = 0.3;
  brow = 0;
  blink = 1;
  /** Eyes, brows, nose and mouth. At projector distance these carry most of the character. */
  buildFace(flesh) {
    const white = this.material("#f6f2ea", 0.04);
    const dark = this.material("#1b1712", 0.02);
    for (const side of [-1, 1]) {
      const eye = this.mesh(new SphereGeometry(0.052, 12, 10), white);
      eye.position.set(side * 0.105, 0.045, 0.205);
      eye.scale.z = 0.55;
      this.head.add(eye);
      const pupil = this.mesh(new SphereGeometry(0.026, 10, 8), dark);
      pupil.position.set(side * 0.105, 0.045, 0.243);
      pupil.scale.z = 0.5;
      this.head.add(pupil);
      this.pupils.push(pupil);
      const brow = this.mesh(new BoxGeometry(0.1, 0.024, 0.03), dark);
      brow.position.set(side * 0.107, 0.125, 0.222);
      this.head.add(brow);
      this.brows.push(brow);
    }
    const nose = this.mesh(new SphereGeometry(0.038, 10, 8), flesh);
    nose.position.set(0, -0.01, 0.245);
    nose.scale.set(0.8, 1, 0.9);
    this.head.add(nose);
    this.mouth = this.mesh(new TorusGeometry(0.075, 0.018, 8, 18, Math.PI), dark);
    this.mouth.position.set(0, -0.085, 0.205);
    this.head.add(this.mouth);
  }
  buildHair(seedOffset) {
    const hair = this.material(hairTones[seedOffset % hairTones.length], 0.04);
    const style = hairStyles[seedOffset % hairStyles.length];
    const cap = this.mesh(new SphereGeometry(0.272, 20, 12, 0, Math.PI * 2, 0, Math.PI * 0.58), hair);
    cap.position.y = 0.012;
    this.head.add(cap);
    if (style === "bun") {
      const bun = this.mesh(new SphereGeometry(0.11, 12, 10), hair);
      bun.position.set(0, 0.2, -0.17);
      this.head.add(bun);
    } else if (style === "long") {
      const fall = this.mesh(new CapsuleGeometry(0.16, 0.3, 4, 10), hair);
      fall.position.set(0, -0.16, -0.13);
      fall.scale.z = 0.7;
      this.head.add(fall);
    } else if (style === "curls") {
      for (const [x, y, z] of [[-0.19, 0.13, -0.1], [0.19, 0.13, -0.1], [0, 0.2, -0.19], [-0.13, 0.05, -0.22], [0.13, 0.05, -0.22]]) {
        const curl = this.mesh(new SphereGeometry(0.095, 10, 8), hair);
        curl.position.set(x, y, z);
        this.head.add(curl);
      }
    }
  }
  /** Builds the held prop and any headgear. Returns the prop's resting tilt. */
  buildInterest(interest, color) {
    const gear = this.material(GEAR, 0.1);
    const accent = this.material(color, 0.3);
    const add = (mesh, x, y, z = 0) => {
      mesh.position.set(x, y, z);
      this.prop.add(mesh);
      return mesh;
    };
    switch (interest) {
      case "tennis": {
        add(this.mesh(new CylinderGeometry(0.035, 0.035, 0.46, 8), gear), 0, 0.2);
        const head = add(this.mesh(new TorusGeometry(0.23, 0.032, 8, 22), accent), 0, 0.62);
        head.rotation.y = Math.PI / 2;
        const strings = add(this.mesh(new CircleGeometry(0.21, 20), this.material("#f4f0e6", 0.05)), 0, 0.62);
        strings.rotation.y = Math.PI / 2;
        return -0.26;
      }
      case "skiing": {
        for (const offset of [-0.13, 0.13]) add(this.mesh(new CylinderGeometry(0.022, 0.022, 0.92, 6), gear), offset, 0.34, offset * 0.4);
        for (const offset of [-0.13, 0.13]) add(this.mesh(new TorusGeometry(0.07, 0.016, 6, 14), accent), offset, 0.68, offset * 0.4);
        this.addGoggles(accent);
        return -0.12;
      }
      case "fencing": {
        add(this.mesh(new CylinderGeometry(0.018, 0.018, 1.15, 6), gear), 0, 0.55);
        add(this.mesh(new SphereGeometry(0.07, 10, 8), accent), 0, 0.02);
        add(this.mesh(new CylinderGeometry(0.045, 0.045, 0.16, 8), accent), 0, 0.12);
        this.addMask(gear);
        return -0.5;
      }
      case "basketball": {
        add(this.mesh(new SphereGeometry(0.27, 18, 14), accent), 0, 0.5);
        for (const angle of [0, Math.PI / 2]) {
          const seam = add(this.mesh(new TorusGeometry(0.272, 0.012, 6, 24), this.material("#2a1a0e", 0.05)), 0, 0.5);
          seam.rotation.y = angle;
        }
        return 0;
      }
      case "skateboarding": {
        const deck = add(this.mesh(new BoxGeometry(0.2, 0.92, 0.05), accent), 0, 0.46);
        deck.rotation.z = 0.08;
        for (const y of [0.14, 0.78]) for (const x of [-0.075, 0.075]) add(this.mesh(new CylinderGeometry(0.055, 0.055, 0.05, 10), gear), x, y, -0.06);
        return -0.2;
      }
      case "chess": {
        add(this.mesh(new CylinderGeometry(0.17, 0.23, 0.1, 14), gear), 0, 0.08);
        add(this.mesh(new CylinderGeometry(0.08, 0.15, 0.38, 14), gear), 0, 0.3);
        add(this.mesh(new SphereGeometry(0.12, 14, 10), accent), 0, 0.56);
        add(this.mesh(new ConeGeometry(0.05, 0.12, 10), accent), 0, 0.7);
        return 0;
      }
      case "drumming": {
        for (const [x, tilt] of [[-0.08, -0.3], [0.1, 0.12]]) {
          const stick = add(this.mesh(new CylinderGeometry(0.022, 0.03, 0.62, 6), gear), x, 0.34);
          stick.rotation.z = tilt;
        }
        return -0.15;
      }
      case "astronomy": {
        const tube = add(this.mesh(new CylinderGeometry(0.1, 0.13, 0.8, 12), gear), 0, 0.42);
        tube.rotation.z = -0.35;
        add(this.mesh(new CylinderGeometry(0.14, 0.14, 0.08, 12), accent), 0.16, 0.76);
        add(this.mesh(new CylinderGeometry(0.06, 0.06, 0.1, 10), accent), -0.14, 0.1);
        return -0.1;
      }
    }
  }
  addGoggles(accent) {
    const strap = this.mesh(new TorusGeometry(0.265, 0.035, 8, 20), accent);
    strap.position.set(0, 0.06, 0);
    strap.rotation.x = Math.PI / 2;
    this.head.add(strap);
    for (const x of [-0.11, 0.11]) {
      const lens = this.mesh(new SphereGeometry(0.085, 10, 8), this.material("#7fd6f0", 0.35));
      lens.position.set(x, 0.05, 0.21);
      this.head.add(lens);
    }
  }
  addMask(gear) {
    const mask = this.mesh(new SphereGeometry(0.3, 16, 14, 0, Math.PI * 2, 0, Math.PI * 0.62), gear);
    mask.position.y = 0.03;
    const material = mask.material;
    material.transparent = true;
    material.opacity = 0.55;
    this.head.add(mask);
  }
  setMood(mood) {
    this.mood = mood;
  }
  /** `motion` false holds the rest pose so reduced-motion users see a still contestant. */
  update(time, motion) {
    const mood = this.mood;
    const [curve, brow] = expressions[mood];
    const targetRaise = mood === "buzzed" ? 1 : mood === "champion" || mood === "correct" ? 0.85 : 0;
    const targetLean = mood === "thinking" ? 0.22 : mood === "answered" ? 0.08 : mood === "missed" ? 0.3 : 0;
    if (!motion) {
      this.raise = targetRaise;
      this.lean = targetLean;
      this.hop = 0;
      this.curve = curve;
      this.brow = brow;
      this.blink = 1;
      this.applyPose(0, 0, 0);
      this.applyFace();
      return;
    }
    this.raise += (targetRaise - this.raise) * 0.12;
    this.lean += (targetLean - this.lean) * 0.1;
    this.curve += (curve - this.curve) * 0.1;
    this.brow += (brow - this.brow) * 0.1;
    const t = time + this.phase;
    const lively = mood === "buzzed" || mood === "champion" || mood === "correct";
    const speed = lively ? 4.2 : mood === "thinking" ? 1.1 : 1.7;
    const bob = Math.sin(t * speed) * (mood === "champion" || mood === "correct" ? 0.07 : 0.022);
    this.hop = mood === "champion" ? Math.max(0, Math.sin(t * 3.1)) * 0.28 : mood === "correct" ? Math.max(0, Math.sin(t * 3.4)) * 0.18 : 0;
    const cycle = t * 0.55 % 1;
    this.blink = cycle > 0.96 ? 0.12 : 1;
    this.applyPose(bob, Math.sin(t * speed * 0.5) * 0.05, Math.sin(t * (lively ? 5.4 : 1.3)) * (lively ? 0.34 : 0.07));
    this.applyFace();
  }
  applyFace() {
    this.mouth.rotation.z = this.curve >= 0 ? Math.PI : 0;
    this.mouth.scale.set(1, Math.max(0.18, Math.abs(this.curve)), 1);
    this.brows.forEach((brow, i) => {
      const side = i ? 1 : -1;
      brow.position.y = 0.125 + this.brow * 0.035;
      brow.rotation.z = side * this.brow * -0.35;
    });
    for (const pupil of this.pupils) pupil.scale.y = this.blink;
  }
  applyPose(bob, sway, propSwing) {
    this.body.position.y = bob + this.hop;
    this.body.rotation.x = this.lean;
    this.body.rotation.y = sway * (1 - this.raise);
    this.head.rotation.x = -this.lean * 0.6;
    this.arms.forEach((arm, i) => {
      const side = i ? 1 : -1;
      const up = this.raise * (this.mood === "champion" || this.mood === "correct" || i === 1 ? 1 : 0.15);
      arm.rotation.x = -up * 2.5 - this.lean * 0.4;
      arm.rotation.z = side * (0.12 + up * 0.35) + (this.mood === "missed" ? side * 0.1 : 0);
    });
    this.prop.position.y = 1.62 + this.raise * 0.34;
    this.prop.rotation.z = this.propRest + propSwing - this.raise * 0.5;
    this.prop.rotation.x = -this.lean * 0.5;
  }
  mesh(geometry, material) {
    this.geometries.push(geometry);
    return new Mesh(geometry, material);
  }
  material(color, emissive) {
    const material = new MeshStandardMaterial({ color, emissive: color, emissiveIntensity: emissive, roughness: 0.62, metalness: 0.06 });
    this.materials.push(material);
    return material;
  }
  dispose() {
    this.geometries.forEach((geometry) => geometry.dispose());
    this.materials.forEach((material) => material.dispose());
  }
};
function avatarMood(phase, teamId, firstBuzzId, winnerId, answered, verdict = null) {
  if (phase === "champion") return winnerId === teamId ? "champion" : "missed";
  if (verdict) return verdict === "correct" ? "correct" : "missed";
  if (firstBuzzId === teamId && ["open", "paused", "locked"].includes(phase)) return "buzzed";
  if (answered) return "answered";
  if (["open", "paused"].includes(phase)) return "thinking";
  if (["ready", "bracket"].includes(phase)) return "ready";
  return "idle";
}

// src/app/templates/competition-show/broadcast/studio-scene.ts
var AVATAR_SCALE = 1.5;
var AVATAR_HEAD_Y = 2.96;
var StudioScene = class {
  constructor(host, theme, report) {
    this.host = host;
    this.theme = theme;
    this.report = report;
    this.renderer = new WebGLRenderer({ antialias: true, alpha: false, powerPreference: "high-performance" });
    this.renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 2));
    this.renderer.outputColorSpace = SRGBColorSpace;
    this.renderer.toneMapping = ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.08;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = PCFSoftShadowMap;
    this.renderer.domElement.setAttribute("aria-hidden", "true");
    this.host.appendChild(this.renderer.domElement);
    this.renderer.domElement.addEventListener("webglcontextlost", this.onContextLost);
    this.scene.background = new Color(theme.palette.background);
    this.scene.fog = new Fog(theme.palette.background, 45, 90);
    this.scene.add(new HemisphereLight("#d4e9ff", "#101526", 1.15));
    const key = new DirectionalLight("#fff3d8", 2.1);
    key.position.set(3, 11, 10);
    key.castShadow = true;
    key.shadow.mapSize.set(1024, 1024);
    Object.assign(key.shadow.camera, { left: -19, right: 19, top: 12, bottom: -12, far: 50 });
    key.shadow.bias = -1e-3;
    this.scene.add(key);
    const fill = new DirectionalLight(theme.palette.secondary, 0.85);
    fill.position.set(-12, 5, -1);
    this.scene.add(fill);
    this.rim = new DirectionalLight(theme.palette.accent, 1.5);
    this.rim.position.set(-2, 6, -12);
    this.scene.add(this.rim);
    const dark = new MeshStandardMaterial({ color: theme.palette.metal, metalness: 0.8, roughness: 0.26 });
    const stage = new MeshStandardMaterial({ color: "#0d1726", metalness: 0.82, roughness: theme.materials.floorRoughness });
    this.box(35, 0.18, 16, 0, -0.02, -0.5, stage).receiveShadow = true;
    if (theme.assets.floor) this.texture(theme.assets.floor, (texture) => {
      texture.wrapS = texture.wrapT = RepeatWrapping;
      texture.repeat.set(5, 3);
      stage.map = texture;
      stage.needsUpdate = true;
    });
    for (let i = 0; i < 3; i++) {
      const ring = new Mesh(new TorusGeometry(13.4 + i * 0.32, 0.035, 6, 140, Math.PI), this.glow(i === 1 ? theme.palette.secondary : theme.palette.accent, 3.4));
      ring.rotation.x = Math.PI / 2;
      ring.rotation.z = Math.PI;
      ring.position.set(0, 0.1, -0.8);
      this.scene.add(ring);
    }
    this.box(34, 12, 0.65, 0, 5.6, -8.4, dark);
    const mural = new MeshBasicMaterial({ color: theme.palette.secondary });
    const muralPlane = new Mesh(new PlaneGeometry(33.4, 11.5), mural);
    muralPlane.position.set(0, 5.6, -8.05);
    this.scene.add(muralPlane);
    if (theme.assets.backdrop) this.texture(theme.assets.backdrop, (texture) => {
      mural.map = texture;
      mural.color.set("#ffffff");
      mural.needsUpdate = true;
    });
    for (const side of [-1, 1]) {
      for (let i = 0; i < 7; i++) {
        const x = side * (9 + i * 0.82);
        this.box(0.42, 9.7, 0.42, x, 4.8, -7.3 + i * 0.28, dark);
        this.box(0.055, 9.3, 0.08, x + side * 0.22, 4.8, -7 + i * 0.28, this.glow(i % 2 ? theme.palette.secondary : theme.palette.accent, 3.8));
      }
      const light = new PointLight(theme.palette.secondary, 90, 25, 2);
      light.position.set(side * 10, 4, 0);
      this.scene.add(light);
      this.accentLights.push(light);
      this.box(0.18, 0.18, 17, side * 11, 11.2, 0, dark);
      for (let i = 0; i < 5; i++) {
        const fixture = this.box(0.65, 0.45, 0.7, side * 10, 10.8, -5 + i * 3, dark);
        fixture.rotation.z = side * -0.35;
        this.box(0.48, 0.025, 0.5, side * 10, 10.56, -5 + i * 3, this.glow("#d7edff", 3.6));
      }
    }
    for (const y of [10.8, 11.4]) this.box(24, 0.12, 0.12, 0, y, -3, dark);
    this.box(14.5, 6.8, 0.65, 0, 5.55, -6.9, dark);
    this.box(14.25, 6.55, 0.12, 0, 5.55, -6.5, this.glow(theme.palette.accent, 3.2));
    const display = new Mesh(new PlaneGeometry(13.85, 6.07), new MeshBasicMaterial({ map: this.screen.texture, toneMapped: false }));
    display.position.set(0, 5.55, -6.4);
    this.scene.add(display);
    for (const side of [-1, 1]) {
      const panel = this.box(6.94, 6.1, 0.08, side * 3.47, 5.55, -6.29, new MeshStandardMaterial({ color: theme.palette.background, metalness: 0.45, roughness: 0.26 }));
      const edge = this.box(0.028, 6.1, 0.1, -side * 3.44, 0, 0.07, this.glow(theme.palette.accent, 3.8));
      this.scene.remove(edge);
      panel.add(edge);
      this.curtains.push(panel);
    }
    this.scene.add(this.stationGroup);
    this.textures.add(this.screen.texture);
    this.goal = studioCamera("wide", 4, 0, theme.camera.fieldOfView);
    this.goalPosition.fromArray(this.goal.position);
    this.goalTarget.fromArray(this.goal.target);
    this.camera.position.copy(this.goalPosition);
    this.target.copy(this.goalTarget);
    this.camera.lookAt(this.target);
    this.resize = new ResizeObserver(() => this.resizeToHost());
    this.resize.observe(host);
    this.resizeToHost();
    this.visibility = new IntersectionObserver((entries) => {
      this.visible = entries[0].isIntersecting && !document.hidden;
      if (this.visible) this.start();
    });
    this.visibility.observe(host);
    document.addEventListener("visibilitychange", this.onVisibility);
    this.start();
  }
  host;
  theme;
  report;
  scene = new Scene();
  camera = new PerspectiveCamera(39, 16 / 9, 0.1, 160);
  renderer;
  resize;
  visibility;
  stationGroup = new Group();
  screens = [];
  avatars = [];
  screen = new StudioScreen(2048, 896);
  loaders = new TextureLoader();
  textures = /* @__PURE__ */ new Set();
  images = /* @__PURE__ */ new Map();
  failedAssets = /* @__PURE__ */ new Set();
  curtains = [];
  accentLights = [];
  rim;
  target = new Vector3();
  fromTarget = new Vector3();
  fromPosition = new Vector3();
  goalPosition = new Vector3();
  goalTarget = new Vector3();
  drift = new Vector3();
  goal;
  fromFov = 39;
  moveAt = 0;
  view;
  teamSignature = "";
  drawSignature = "";
  shotSignature = "";
  frame = 0;
  disposed = false;
  visible = true;
  shutter = 0;
  lastFrame = 0;
  motion = true;
  awardAt = 0;
  onVisibility = () => {
    this.visible = !document.hidden;
    if (this.visible) this.start();
  };
  onContextLost = (event) => {
    event.preventDefault();
    this.report("The studio lost its graphics context. Reload to restore it; show controls remain available.");
    this.visible = false;
  };
  update(view, reducedMotion) {
    this.view = view;
    this.motion = !reducedMotion;
    const teams = view.teams.map((t) => t.id).join("|");
    if (teams !== this.teamSignature) {
      this.teamSignature = teams;
      this.buildTeams(view);
    }
    const signature = JSON.stringify(view);
    if (signature !== this.drawSignature) {
      if (view.awarding && !this.drawSignature.includes('"awarding":true')) this.awardAt = performance.now();
      this.drawSignature = signature;
      this.draw(view);
    }
    const shot = `${view.shot}:${view.teamId}:${teams}`;
    if (shot !== this.shotSignature) {
      this.shotSignature = shot;
      this.fromPosition.copy(this.camera.position);
      this.fromTarget.copy(this.target);
      this.fromFov = this.camera.fov;
      this.goal = studioCamera(view.shot, view.teams.length, Math.max(0, view.teams.findIndex((t) => t.id === view.teamId)), this.theme.camera.fieldOfView);
      this.goalPosition.fromArray(this.goal.position);
      this.goalTarget.fromArray(this.goal.target);
      this.moveAt = performance.now();
    }
    if (reducedMotion) {
      this.camera.position.copy(this.goalPosition);
      this.target.copy(this.goalTarget);
      this.camera.fov = this.goal.fov;
      this.camera.updateProjectionMatrix();
    }
    this.start();
  }
  buildTeams(view) {
    this.disposeGroup(this.stationGroup);
    this.stationGroup.clear();
    this.screens.splice(0).forEach((s) => s.dispose());
    this.avatars.splice(0).forEach((a) => a.dispose());
    const positions = stationPositions(view.teams.length);
    const rotation = rosterRotation(view.teams.map((team) => team.id));
    view.teams.forEach((team, index) => {
      const p = positions[index];
      const group = new Group();
      group.position.set(p.x, p.y, p.z);
      this.stationGroup.add(group);
      const metal = new MeshStandardMaterial({ color: this.theme.palette.metal, metalness: this.theme.materials.podiumMetalness, roughness: 0.24 });
      const shape = (w, h, d, y, material) => {
        const mesh = new Mesh(new BoxGeometry(w, h, d), material);
        mesh.position.y = y;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        group.add(mesh);
        return mesh;
      };
      shape(2.7, 0.16, 1.95, 0.14, metal);
      shape(2.55, 0.055, 1.85, 0.25, this.glow(team.color, 3.4));
      const body = shape(2.25, 2.3, 1.3, 1.42, metal);
      if (this.theme.assets.podium) this.texture(this.theme.assets.podium, (texture) => {
        metal.map = texture;
        metal.needsUpdate = true;
      });
      shape(2.65, 0.22, 1.85, 2.65, metal);
      shape(2.6, 0.04, 1.8, 2.52, this.glow(team.color, 3.9));
      for (const side of [-1, 1]) {
        const edge = new Mesh(new BoxGeometry(0.045, 2.1, 0.05), this.glow(team.color, 3.4));
        edge.position.set(side * 1.09, 1.45, 0.67);
        group.add(edge);
      }
      const buzzer = new Mesh(new CylinderGeometry(0.19, 0.23, 0.1, 24), this.glow(team.color, 2.6));
      buzzer.position.set(0, 2.84, 0.3);
      group.add(buzzer);
      const avatar = new StudioAvatar(team.color, avatarSkin(index), index, interestAt(index, rotation));
      avatar.root.scale.setScalar(AVATAR_SCALE);
      avatar.root.position.set(0, AVATAR_HEAD_Y - 1.62 * AVATAR_SCALE, -0.92 - 0.22 * AVATAR_SCALE);
      group.add(avatar.root);
      this.avatars.push(avatar);
      const screen = new StudioScreen(512, 512);
      this.screens.push(screen);
      const face = new Mesh(new PlaneGeometry(1.97, 1.97), new MeshBasicMaterial({ map: screen.texture, toneMapped: false }));
      face.position.set(0, 1.45, 0.66);
      group.add(face);
      body.userData["teamId"] = team.id;
      if (team.emblem) this.image(team.emblem);
    });
  }
  draw(view) {
    const backdrop = view.phase === "champion" ? this.theme.assets.winnerBackdrop : this.theme.assets.questionScreen;
    if (backdrop) this.image(backdrop);
    const loaded = (url) => {
      const image = url ? this.images.get(url) : void 0;
      return image?.complete && image.naturalWidth ? image : void 0;
    };
    view.teams.forEach((team, i) => this.avatars[i]?.setMood(avatarMood(view.phase, team.id, view.firstBuzzId, view.winnerId, team.answered, team.verdict)));
    if (view.awarding) this.drawAward(0);
    else drawQuestion(this.screen, view, this.theme, loaded(backdrop));
    view.teams.forEach((team, i) => drawPodium(this.screens[i], team, this.theme, loaded(team.emblem)));
  }
  drawAward(elapsed) {
    if (!this.view) return;
    const reveal = Math.max(0, Math.min(1, elapsed / 1.1));
    drawVerdict(this.screen, this.view, this.theme, this.motion ? elapsed * 0.12 : 0, reveal * reveal * (3 - 2 * reveal));
  }
  image(url) {
    if (this.images.has(url) || this.failedAssets.has(url)) return;
    const img = new Image();
    this.images.set(url, img);
    img.onload = () => {
      if (!this.disposed && this.view) this.draw(this.view);
    };
    img.onerror = () => {
      this.images.delete(url);
      this.failedAssets.add(url);
      this.report(`Studio artwork could not load: ${url}`);
    };
    img.src = url;
  }
  texture(url, apply) {
    this.loaders.load(url, (texture) => {
      if (this.disposed) {
        texture.dispose();
        return;
      }
      texture.colorSpace = SRGBColorSpace;
      texture.anisotropy = Math.min(8, this.renderer.capabilities.getMaxAnisotropy());
      this.textures.add(texture);
      apply(texture);
    }, void 0, () => this.report(`Studio artwork could not load: ${url}`));
  }
  box(w, h, d, x, y, z, material) {
    const mesh = new Mesh(new BoxGeometry(w, h, d), material);
    mesh.position.set(x, y, z);
    this.scene.add(mesh);
    return mesh;
  }
  /** Emissive strips carry the glow that a bloom pass used to add. */
  glow(color, intensity) {
    return new MeshStandardMaterial({ color, emissive: color, emissiveIntensity: intensity * 0.3, roughness: 0.3, metalness: 0.3, toneMapped: false });
  }
  resizeToHost() {
    const width = Math.max(1, this.host.clientWidth);
    const height = Math.max(1, this.host.clientHeight);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height, false);
  }
  start() {
    if (!this.frame && this.visible && !this.disposed) this.frame = requestAnimationFrame(this.animate);
  }
  animate = (now) => {
    this.frame = 0;
    if (this.disposed || !this.visible) return;
    if (now - this.lastFrame > 30) {
      const elapsed = Math.min(100, now - (this.lastFrame || now));
      this.lastFrame = now;
      const t = this.motion ? Math.min(1, (now - this.moveAt) / Math.max(1, this.theme.camera.moveMs)) : 1;
      const ease = t * t * t * (t * (t * 6 - 15) + 10);
      this.camera.position.lerpVectors(this.fromPosition, this.goalPosition, ease);
      this.target.lerpVectors(this.fromTarget, this.goalTarget, ease);
      if (this.motion) {
        const sway = now / 1e3;
        this.drift.set(Math.sin(sway * 0.21) * 0.32, Math.sin(sway * 0.17) * 0.12, 0);
        this.camera.position.add(this.drift);
      }
      this.camera.fov = MathUtils.lerp(this.fromFov, this.goal.fov, ease);
      this.camera.updateProjectionMatrix();
      this.camera.lookAt(this.target);
      const covered = this.view?.cue === "question" && ["dim", "travel"].includes(this.view.step);
      const desired = covered ? 1 : 0;
      this.shutter = this.motion ? MathUtils.damp(this.shutter, desired, 6, elapsed / 1e3) : desired;
      this.curtains.forEach((panel, i) => {
        panel.position.x = (i ? 1 : -1) * (3.47 + (1 - this.shutter) * 7.3);
        panel.visible = this.shutter > 5e-3;
      });
      const dim = this.view?.cue === "question" && this.view.step !== "idle";
      this.accentLights.forEach((light) => {
        light.intensity = dim ? 10 : 35;
      });
      this.rim.intensity = this.view?.phase === "champion" ? 3.2 : dim ? 0.7 : 1.5;
      const seconds = now / 1e3;
      for (const avatar of this.avatars) avatar.update(seconds, this.motion);
      if (this.view?.awarding) this.drawAward(this.motion ? (now - this.awardAt) / 1e3 : 999);
      this.renderer.render(this.scene, this.camera);
    }
    this.start();
  };
  disposeGroup(root) {
    const materials = /* @__PURE__ */ new Set();
    const geometries = /* @__PURE__ */ new Set();
    root.traverse((object) => {
      if (object instanceof Mesh) {
        geometries.add(object.geometry);
        (Array.isArray(object.material) ? object.material : [object.material]).forEach((m) => materials.add(m));
      }
    });
    geometries.forEach((g) => g.dispose());
    materials.forEach((m) => m.dispose());
  }
  dispose() {
    this.disposed = true;
    cancelAnimationFrame(this.frame);
    this.resize.disconnect();
    this.visibility.disconnect();
    document.removeEventListener("visibilitychange", this.onVisibility);
    this.renderer.domElement.removeEventListener("webglcontextlost", this.onContextLost);
    this.screens.forEach((s) => s.dispose());
    this.avatars.forEach((a) => a.dispose());
    this.screen.dispose();
    this.disposeGroup(this.scene);
    this.textures.forEach((t) => t.dispose());
    this.renderer.dispose();
    this.renderer.domElement.remove();
  }
};
export {
  StudioScene
};
//# debugId=69c17c6e-8511-5b67-9b36-4ffda7ba3d3d
//# sourceMappingURL=chunk-HKV4UWY5.js.map
