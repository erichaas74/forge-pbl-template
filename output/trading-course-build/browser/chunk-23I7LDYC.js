import {
  OrbitControls
} from "./chunk-QHHG4YQZ.js";
import {
  GLTFLoader
} from "./chunk-BWIMRADB.js";
import "./chunk-4GBFXHP3.js";
import {
  ACESFilmicToneMapping,
  Box3,
  BoxGeometry,
  BufferGeometry,
  CanvasTexture,
  Color,
  CylinderGeometry,
  DirectionalLight,
  DoubleSide,
  Float32BufferAttribute,
  Group,
  HemisphereLight,
  Light,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  PCFSoftShadowMap,
  PerspectiveCamera,
  PlaneGeometry,
  Raycaster,
  RepeatWrapping,
  SRGBColorSpace,
  Scene,
  Texture,
  Vector2,
  Vector3,
  WebGLRenderer
} from "./chunk-E3MFW572.js";
import {
  DEFAULT_MUSEUM_ROOM_LAYOUT,
  museumRoomLayout
} from "./chunk-SUG7Z2TW.js";
import "./chunk-GOMI4DH3.js";

// src/app/templates/exhibit-hall/rooms/temple-museum-architecture.ts
var TEMPLE_PALETTE = {
  sandstone: "#d5b57b",
  paleStone: "#e9cfa0",
  lapis: "#204456",
  gold: "#bc8b39",
  red: "#a65337",
  turquoise: "#467b76"
};
function buildTempleMuseum(group, width, depth, height) {
  const stone = material(TEMPLE_PALETTE.sandstone);
  stone.map = stoneTexture(false);
  const pale = material(TEMPLE_PALETTE.paleStone);
  const blue = material(TEMPLE_PALETTE.lapis);
  const gold = material(TEMPLE_PALETTE.gold, 0.3);
  const red = material(TEMPLE_PALETTE.red);
  const teal = material(TEMPLE_PALETTE.turquoise);
  const floor = material("#f0d6a2");
  floor.map = stoneTexture(true);
  const relief = new MeshStandardMaterial({ map: reliefTexture(), roughness: 0.95 });
  const frieze = new MeshStandardMaterial({ map: friezeTexture(), roughness: 0.9 });
  const ceiling = new MeshBasicMaterial({ color: "#c5d3db", map: starTexture() });
  box(group, [width, 0.16, depth], [0, -0.09, 0], floor).receiveShadow = true;
  for (const x of [-1.42, 1.42]) {
    box(group, [0.07, 0.012, depth - 0.3], [x, 6e-3, 0], gold);
    box(group, [0.13, 0.01, depth - 0.3], [x + Math.sign(x) * 0.13, 5e-3, 0], blue);
  }
  box(group, [width, height, 0.24], [0, height / 2, -depth / 2], stone);
  for (const side of [-1, 1]) {
    box(group, [0.24, height, depth], [side * width / 2, height / 2, 0], stone);
    box(group, [0.18, 0.38, depth], [side * (width / 2 - 0.16), 0.19, 0], pale);
    box(group, [0.08, 0.16, depth], [side * (width / 2 - 0.22), 0.48, 0], blue);
    box(group, [0.1, 0.06, depth], [side * (width / 2 - 0.23), 0.61, 0], gold);
    const band = panel(group, depth, 0.52, [side * (width / 2 - 0.14), height - 0.72, 0], frieze);
    band.rotation.y = -side * Math.PI / 2;
    box(group, [0.5, 0.22, depth], [side * (width / 2 - 0.12), height - 0.2, 0], pale);
    for (const z of [-depth / 2 + 1.1, 0, depth / 2 - 1.1]) {
      column(group, side * (width / 2 - 1), z, height, stone, pale, blue, gold, red, teal);
    }
  }
  box(group, [width, 0.38, 0.18], [0, 0.19, -depth / 2 + 0.16], pale);
  box(group, [width, 0.16, 0.08], [0, 0.48, -depth / 2 + 0.22], blue);
  box(group, [width, 0.06, 0.1], [0, 0.61, -depth / 2 + 0.23], gold);
  panel(group, width, 0.52, [0, height - 0.72, -depth / 2 + 0.14], frieze);
  for (const side of [-1, 1]) {
    box(group, [1.6, height, 0.8], [side * (width / 2 - 0.7), height / 2, depth / 2], stone);
    box(group, [1.76, 0.32, 1], [side * (width / 2 - 0.7), 0.16, depth / 2], pale);
  }
  box(group, [width, 0.52, 0.85], [0, height - 0.26, depth / 2], pale);
  box(group, [width, 0.13, 0.94], [0, height - 0.59, depth / 2], blue);
  box(group, [width, 0.07, 1], [0, height - 0.69, depth / 2], gold);
  box(group, [width, 0.14, depth], [0, height + 0.04, 0], ceiling);
  for (const z of [-depth / 2 + 0.3, 0, depth / 2 - 0.3]) {
    box(group, [width, 0.23, 0.32], [0, height - 0.12, z], pale);
    box(group, [width, 0.04, 0.34], [0, height - 0.255, z], gold);
  }
  const glow = new MeshBasicMaterial({ color: "#fff1ca" });
  for (const z of [-2.8, 2.8]) {
    box(group, [2.2, 0.035, 1.7], [0, height - 0.06, z], glow);
  }
  for (const x of [-width / 2 + 1.95, width / 2 - 1.95]) {
    box(group, [1.48, 2.78, 0.1], [x, 2.65, -depth / 2 + 0.17], gold);
    panel(group, 1.35, 2.65, [x, 2.65, -depth / 2 + 0.23], relief);
  }
  const emblem = new MeshBasicMaterial({ map: sunTexture(), transparent: true });
  panel(group, 4.4, 0.74, [0, height - 0.76, -depth / 2 + 0.2], emblem);
}
function column(parent, x, z, height, stone, pale, blue, gold, red, teal) {
  const group = new Group();
  group.position.set(x, 0, z);
  parent.add(group);
  cylinder(group, 0.65, 0.7, 0.2, 0.1, pale);
  cylinder(group, 0.5, 0.6, 0.18, 0.29, gold);
  cylinder(group, 0.37, 0.47, height - 1.5, (height - 1.5) / 2 + 0.38, stone);
  cylinder(group, 0.49, 0.49, 0.36, 0.62, teal);
  cylinder(group, 0.49, 0.49, 0.06, 0.84, gold);
  const capitalY = height - 0.85;
  cylinder(group, 0.72, 0.37, 0.66, capitalY, teal);
  cylinder(group, 0.75, 0.75, 0.13, height - 0.47, blue);
  cylinder(group, 0.76, 0.76, 0.07, height - 0.37, gold);
  cylinder(group, 0.4, 0.4, 0.12, height - 1.25, red);
  cylinder(group, 0.41, 0.41, 0.05, height - 1.34, gold);
  box(group, [1.53, 0.23, 1.53], [0, height - 0.2, 0], pale);
  const petals = new BufferGeometry();
  const points = [];
  for (let index = 0; index < 12; index++) {
    const angle = index * Math.PI / 6;
    for (const [theta, radius, y] of [
      [angle + 0.15, 0.725, capitalY + 0.32],
      [angle - 0.15, 0.725, capitalY + 0.32],
      [angle, 0.395, capitalY - 0.29]
    ])
      points.push(Math.sin(theta) * radius, y, Math.cos(theta) * radius);
  }
  petals.setAttribute("position", new Float32BufferAttribute(points, 3));
  petals.computeVertexNormals();
  group.add(new Mesh(petals, gold));
}
function material(color, metalness = 0) {
  return new MeshStandardMaterial({ color, roughness: 0.85, metalness });
}
function box(group, size, position, material2) {
  const mesh = new Mesh(new BoxGeometry(size[0], size[1], size[2]), material2);
  mesh.position.set(position[0], position[1], position[2]);
  group.add(mesh);
  return mesh;
}
function cylinder(group, top, bottom, height, y, material2) {
  const mesh = new Mesh(new CylinderGeometry(top, bottom, height, 24), material2);
  mesh.position.y = y;
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  group.add(mesh);
}
function panel(group, width, height, position, material2) {
  const mesh = new Mesh(new PlaneGeometry(width, height), material2);
  mesh.position.set(position[0], position[1], position[2]);
  group.add(mesh);
  return mesh;
}
function texture(width, height, draw) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d");
  draw(context);
  const result = new CanvasTexture(canvas);
  result.colorSpace = SRGBColorSpace;
  return result;
}
function stoneTexture(floor) {
  const result = texture(512, 512, (ctx) => {
    ctx.fillStyle = "#e4cfab";
    ctx.fillRect(0, 0, 512, 512);
    let seed = 37;
    const random = () => (seed = seed * 1664525 + 1013904223 >>> 0) / 4294967296;
    for (let i = 0; i < 4500; i++) {
      ctx.fillStyle = i % 2 ? "#ab845918" : "#fff3d32b";
      ctx.fillRect(random() * 512, random() * 512, random() * 6 + 1, random() * 2 + 1);
    }
    ctx.strokeStyle = "#96734755";
    ctx.lineWidth = 2;
    for (let row = 0; row < 4; row++) {
      ctx.beginPath();
      ctx.moveTo(0, row * 128);
      ctx.lineTo(512, row * 128);
      for (let x = row % 2 * 128; x <= 512; x += 256) {
        ctx.moveTo(x, row * 128);
        ctx.lineTo(x, (row + 1) * 128);
      }
      ctx.stroke();
    }
  });
  result.wrapS = result.wrapT = RepeatWrapping;
  result.repeat.set(floor ? 4 : 3, floor ? 4 : 1.5);
  return result;
}
function lotus(ctx, x, y, size) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(size, size);
  for (const rotation of [-0.65, 0, 0.65]) {
    ctx.save();
    ctx.rotate(rotation);
    ctx.beginPath();
    ctx.moveTo(0, 18);
    ctx.quadraticCurveTo(-22, -8, 0, -38);
    ctx.quadraticCurveTo(22, -8, 0, 18);
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }
  ctx.beginPath();
  ctx.moveTo(-27, 18);
  ctx.quadraticCurveTo(0, 43, 27, 18);
  ctx.stroke();
  ctx.restore();
}
function reliefTexture() {
  return texture(256, 512, (ctx) => {
    ctx.fillStyle = "#cead76";
    ctx.fillRect(0, 0, 256, 512);
    ctx.strokeStyle = "#846039";
    ctx.lineWidth = 3;
    ctx.strokeRect(14, 14, 228, 484);
    ctx.strokeRect(23, 23, 210, 466);
    ctx.fillStyle = "#b78a4b";
    ctx.beginPath();
    ctx.arc(128, 96, 34, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.lineWidth = 9;
    ctx.beginPath();
    ctx.ellipse(128, 200, 27, 38, 0, 0, Math.PI * 2);
    ctx.moveTo(128, 238);
    ctx.lineTo(128, 335);
    ctx.moveTo(84, 256);
    ctx.lineTo(172, 256);
    ctx.stroke();
    ctx.lineWidth = 2;
    ctx.fillStyle = "#b5915c";
    lotus(ctx, 128, 412, 1.3);
    for (const x of [43, 213])
      for (let y = 150; y < 370; y += 38) {
        ctx.strokeRect(x - 4, y, 8, 15);
      }
  });
}
function friezeTexture() {
  return texture(1024, 64, (ctx) => {
    ctx.fillStyle = TEMPLE_PALETTE.lapis;
    ctx.fillRect(0, 0, 1024, 64);
    ctx.fillStyle = TEMPLE_PALETTE.gold;
    ctx.fillRect(0, 0, 1024, 5);
    ctx.fillRect(0, 59, 1024, 5);
    ctx.fillStyle = "#b7ad74";
    ctx.strokeStyle = "#d9b967";
    ctx.lineWidth = 1;
    for (let x = 32; x < 1024; x += 64) lotus(ctx, x, 35, 0.6);
  });
}
function starTexture() {
  const result = texture(256, 256, (ctx) => {
    ctx.fillStyle = "#597483";
    ctx.fillRect(0, 0, 256, 256);
    ctx.strokeStyle = "#e4cb89";
    ctx.lineWidth = 2;
    for (let y = 32; y < 256; y += 64)
      for (let x = 32; x < 256; x += 64) {
        ctx.beginPath();
        for (let ray = 0; ray < 5; ray++) {
          const a = ray * Math.PI * 2 / 5 - Math.PI / 2;
          ctx.moveTo(x, y);
          ctx.lineTo(x + Math.cos(a) * 7, y + Math.sin(a) * 7);
        }
        ctx.stroke();
      }
  });
  result.wrapS = result.wrapT = RepeatWrapping;
  result.repeat.set(4, 4);
  return result;
}
function sunTexture() {
  return texture(1024, 180, (ctx) => {
    ctx.fillStyle = "#b2863b";
    for (const side of [-1, 1]) {
      ctx.save();
      ctx.translate(512, 75);
      ctx.scale(side, 1);
      for (let feather = 0; feather < 15; feather++) {
        const x = 58 + feather * 25;
        ctx.beginPath();
        ctx.moveTo(x, -12 - feather * 1.4);
        ctx.lineTo(x + 36, -21 - feather * 1.4);
        ctx.lineTo(x + 9, 73 - feather * 4.5);
        ctx.lineTo(x - 9, 71 - feather * 4.5);
        ctx.closePath();
        ctx.fill();
      }
      ctx.restore();
    }
    ctx.beginPath();
    ctx.arc(512, 74, 46, 0, Math.PI * 2);
    ctx.fillStyle = "#b76338";
    ctx.fill();
    ctx.strokeStyle = "#e0b455";
    ctx.lineWidth = 7;
    ctx.stroke();
  });
}

// src/app/templates/exhibit-hall/rooms/museum-scene.ts
var MuseumScene = class {
  constructor(host, callbacks) {
    this.host = host;
    this.callbacks = callbacks;
    this.renderer = new WebGLRenderer({ antialias: true, powerPreference: "low-power" });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    this.renderer.outputColorSpace = SRGBColorSpace;
    this.renderer.toneMapping = ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.05;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = PCFSoftShadowMap;
    this.renderer.domElement.setAttribute("aria-hidden", "true");
    this.renderer.domElement.style.cssText = "display:block;width:100%;height:100%;touch-action:pan-y;";
    host.appendChild(this.renderer.domElement);
    this.scene.background = new Color("#d4b681");
    this.scene.add(this.architecture, this.signage, this.exhibits);
    this.scene.add(new HemisphereLight("#fff0cf", "#806344", 2.1));
    const sun = new DirectionalLight("#ffdda1", 3.4);
    sun.position.set(-4, 9, 5);
    sun.castShadow = true;
    sun.shadow.mapSize.set(1024, 1024);
    Object.assign(sun.shadow.camera, { left: -9, right: 9, top: 9, bottom: -9, near: 1, far: 28 });
    sun.shadow.bias = -5e-4;
    sun.shadow.normalBias = 0.04;
    this.scene.add(sun);
    const bounce = new DirectionalLight("#dceaf1", 1.25);
    bounce.position.set(5, 4, -2);
    this.scene.add(bounce);
    this.camera.position.set(0, 3.1, 8.8);
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.target.set(0, 1.65, -1.6);
    this.controls.enablePan = false;
    this.controls.enableZoom = false;
    this.controls.minAzimuthAngle = -0.5;
    this.controls.maxAzimuthAngle = 0.5;
    this.controls.minPolarAngle = 0.95;
    this.controls.maxPolarAngle = 1.58;
    this.controls.rotateSpeed = 0.4;
    this.controls.addEventListener("change", this.invalidate);
    this.controls.addEventListener("start", this.cancelTransition);
    this.controls.update();
    this.renderer.domElement.addEventListener("pointerdown", this.onPointerDown);
    this.renderer.domElement.addEventListener("pointerup", this.onPointerUp);
    this.renderer.domElement.addEventListener("webglcontextlost", this.onContextLost);
    this.observer = new ResizeObserver(this.resize);
    this.observer.observe(host);
    document.addEventListener("visibilitychange", this.invalidate);
    this.resize();
  }
  host;
  callbacks;
  scene = new Scene();
  camera = new PerspectiveCamera(54, 1, 0.1, 70);
  renderer;
  controls;
  observer;
  architecture = new Group();
  signage = new Group();
  exhibits = new Group();
  assets = /* @__PURE__ */ new Map();
  loader = new GLTFLoader();
  raycaster = new Raycaster();
  pointer = new Vector2();
  content;
  roomKey = "";
  signKey = "";
  frame = 0;
  disposed = false;
  lost = false;
  pointerStart = { x: 0, y: 0 };
  transition;
  reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  update(content) {
    if (this.disposed || this.lost) return;
    this.content = content;
    const room = content.kind === "room" ? content.board.museumRoom : void 0;
    const key = content.kind === "room" ? `room:${room?.roomId}:${room?.layoutId}` : "lobby";
    const layout = museumRoomLayout(room?.layoutId ?? DEFAULT_MUSEUM_ROOM_LAYOUT);
    if (!layout) {
      this.callbacks.failed(
        "This room design is unavailable. Your exhibit text is still readable."
      );
      return;
    }
    if (key !== this.roomKey) {
      this.clearAssets();
      this.clearGroup(this.architecture);
      this.clearGroup(this.signage);
      this.roomKey = key;
      this.signKey = "";
      this.buildArchitecture(layout.width, layout.depth, layout.height);
      if (content.kind === "room") for (const slot of layout.slots) this.buildDisplay(slot);
      this.focusDisplay();
    }
    const signKey = JSON.stringify(
      content.kind === "lobby" ? content.doors : [
        content.label,
        content.board.title,
        content.board.centralClaim,
        content.board.objects.map((object) => [object.id, object.title]),
        room?.placements
      ]
    );
    if (signKey !== this.signKey) {
      this.signKey = signKey;
      this.clearGroup(this.signage);
      if (content.kind === "lobby") this.buildLobby(content);
      else {
        this.sign(
          this.signage,
          [
            content.label.toUpperCase(),
            content.board.title || "Your story starts here",
            "A COLLECTION BY " + content.board.teamCredit.displayName.toUpperCase()
          ],
          5.3,
          1.45,
          [0, 3.8, -5.86],
          TEMPLE_PALETTE.lapis,
          "#fff5df"
        );
        for (const slot of layout.slots) {
          const objectId = room?.placements.find(
            (placement) => placement.slotId === slot.id
          )?.objectId;
          const object = content.board.objects.find((item) => item.id === objectId);
          const [x, , z] = slot.position;
          const plaque = this.sign(
            this.signage,
            [slot.label.toUpperCase(), object?.title ?? "Add an artifact"],
            1.8,
            0.43,
            [x, 0.61, z + 1.03],
            TEMPLE_PALETTE.lapis,
            "#fff5df"
          );
          plaque.userData["selectionId"] = slot.id;
        }
      }
    }
    if (content.kind === "room") {
      for (const slot of layout.slots) {
        const objectId = room?.placements.find(
          (placement) => placement.slotId === slot.id
        )?.objectId;
        const object = content.board.objects.find((item) => item.id === objectId);
        this.syncAsset(slot, object);
      }
    }
    this.reportAssets();
    this.invalidate();
  }
  focusDisplay(id) {
    const layout = museumRoomLayout(
      this.content?.kind === "room" ? this.content.board.museumRoom?.layoutId ?? "" : DEFAULT_MUSEUM_ROOM_LAYOUT
    );
    const slot = layout?.slots.find((item) => item.id === id);
    const position = slot ? new Vector3(slot.position[0] * 0.85, 2.05, slot.position[2] + 4.2) : new Vector3(0, 3.1, 8.8);
    const target = slot ? new Vector3(slot.position[0], 1.65, slot.position[2]) : new Vector3(0, 1.65, -1.6);
    if (this.reducedMotion.matches) {
      this.camera.position.copy(position);
      this.controls.target.copy(target);
      this.controls.update();
      this.invalidate();
      return;
    }
    this.transition = {
      start: performance.now(),
      from: this.camera.position.clone(),
      targetFrom: this.controls.target.clone(),
      to: position,
      targetTo: target
    };
    this.invalidate();
  }
  dispose() {
    if (this.disposed) return;
    this.disposed = true;
    cancelAnimationFrame(this.frame);
    this.observer.disconnect();
    this.controls.dispose();
    document.removeEventListener("visibilitychange", this.invalidate);
    this.renderer.domElement.removeEventListener("pointerdown", this.onPointerDown);
    this.renderer.domElement.removeEventListener("pointerup", this.onPointerUp);
    this.renderer.domElement.removeEventListener("webglcontextlost", this.onContextLost);
    this.clearAssets();
    this.clearGroup(this.architecture);
    this.clearGroup(this.signage);
    this.scene.traverse((object) => {
      if (object instanceof Light) object.dispose();
    });
    this.renderer.dispose();
    this.renderer.forceContextLoss();
    this.renderer.domElement.remove();
  }
  buildArchitecture(width, depth, height) {
    buildTempleMuseum(this.architecture, width, depth, height);
  }
  buildDisplay(slot) {
    const [x, , z] = slot.position;
    const group = new Group();
    group.userData["selectionId"] = slot.id;
    this.architecture.add(group);
    const stone = this.material(TEMPLE_PALETTE.sandstone), trim = this.material(TEMPLE_PALETTE.gold, 0.35), top = this.material(TEMPLE_PALETTE.paleStone);
    this.box(group, [2.14, 0.12, 2.05], [x, 0.08, z], trim);
    this.box(group, [1.96, 0.85, 1.87], [x, 0.54, z], stone).castShadow = true;
    this.box(group, [2.1, 0.12, 2.02], [x, 1.03, z], top).receiveShadow = true;
    this.box(group, [2.01, 0.04, 1.93], [x, 0.98, z], trim);
    this.box(group, [2, 0.13, 1.91], [x, 0.23, z], this.material(TEMPLE_PALETTE.lapis));
    const marker = this.sign(
      group,
      [slot.label.slice(-1)],
      0.42,
      0.42,
      [x, 1.13, z + 0.6],
      TEMPLE_PALETTE.lapis,
      "#f8edcd"
    );
    marker.rotation.x = -Math.PI / 2;
  }
  buildLobby(content) {
    this.sign(
      this.signage,
      ["FORGE \xB7 CLASS MUSEUM", "Small objects. Big stories.", "STEP INSIDE A STUDENT COLLECTION"],
      6.7,
      1.65,
      [0, 3.55, -5.83],
      TEMPLE_PALETTE.lapis,
      "#fff2d5"
    );
    const lapis = this.material(TEMPLE_PALETTE.lapis), brass = this.material(TEMPLE_PALETTE.gold, 0.35), sandstone = this.material(TEMPLE_PALETTE.paleStone);
    content.doors.forEach((door, index) => {
      const side = index % 2 === 0 ? -1 : 1;
      const row = Math.floor(index / 2);
      if (row > 1) return;
      const doorway = new Group();
      doorway.position.set(side * 5.8, 0, -3.1 + row * 4.7);
      doorway.rotation.y = side === -1 ? Math.PI / 2 : -Math.PI / 2;
      doorway.userData["selectionId"] = door.id;
      this.signage.add(doorway);
      this.box(doorway, [2.55, 3.65, 0.15], [0, 1.82, 0], brass);
      this.box(doorway, [2.33, 3.5, 0.17], [0, 1.75, 0.06], lapis);
      for (const x of [-1.36, 1.36])
        this.box(doorway, [0.25, 3.75, 0.32], [x, 1.87, 0.09], sandstone);
      this.box(doorway, [3.05, 0.28, 0.4], [0, 3.85, 0.1], sandstone);
      this.box(doorway, [3.12, 0.07, 0.44], [0, 3.65, 0.11], brass);
      this.sign(
        doorway,
        ["ROOM " + door.number, door.title, door.curator],
        2.06,
        1.5,
        [0, 2.3, 0.16],
        "#e7ddc6",
        TEMPLE_PALETTE.lapis
      );
      this.box(doorway, [0.07, 0.55, 0.12], [0.82, 1, 0.2], brass);
    });
    const bench = this.material(TEMPLE_PALETTE.sandstone);
    this.box(this.signage, [3.2, 0.2, 0.9], [0, 0.65, -1.3], bench).castShadow = true;
    for (const x of [-1.15, 1.15]) this.box(this.signage, [0.15, 0.55, 0.7], [x, 0.3, -1.3], brass);
    this.sign(
      this.signage,
      [
        content.doors.length ? `${content.doors.length} COLLECTIONS TO EXPLORE` : "THE MUSEUM IS GETTING READY",
        "Choose a room to begin"
      ],
      3.4,
      0.7,
      [0, 1.45, -3.9],
      "#e7ddc6",
      TEMPLE_PALETTE.lapis
    );
  }
  syncAsset(slot, object) {
    const source = object?.model?.src ?? object?.imageAssetId ?? "";
    const existing = this.assets.get(slot.id);
    if (existing?.source === source) return;
    if (existing) {
      existing.controller.abort();
      this.clearGroup(existing.group);
      existing.group.removeFromParent();
      this.assets.delete(slot.id);
    }
    if (!object || !source) return;
    const group = new Group();
    group.position.set(slot.position[0], 1.11, slot.position[2]);
    group.userData["selectionId"] = slot.id;
    this.exhibits.add(group);
    const asset = { source, group, controller: new AbortController(), loading: true };
    this.assets.set(slot.id, asset);
    if (!object.model) {
      asset.loading = false;
      this.sign(
        group,
        [object.title, object.imageAlt ?? "Artifact image"],
        1.75,
        1.3,
        [0, 0.8, 0],
        "#eee5d0",
        TEMPLE_PALETTE.lapis
      );
      return;
    }
    void this.loadModel(object, asset).then(() => {
      this.reportAssets();
      this.invalidate();
    });
  }
  async loadModel(object, asset) {
    try {
      const response = await fetch(asset.source, { signal: asset.controller.signal });
      if (!response.ok) throw new Error("Model unavailable");
      const bytes = await response.arrayBuffer();
      if (asset.controller.signal.aborted || this.disposed) return;
      const model = await this.loader.parseAsync(
        bytes,
        new URL(".", new URL(asset.source, document.baseURI)).href
      );
      if (asset.controller.signal.aborted || this.disposed) {
        disposeTree(model.scene);
        return;
      }
      const bounds = new Box3().setFromObject(model.scene);
      const size = bounds.getSize(new Vector3());
      const center = bounds.getCenter(new Vector3());
      const scale = Math.min(
        1.8 / Math.max(size.x, 1e-3),
        2.15 / Math.max(size.y, 1e-3),
        1.65 / Math.max(size.z, 1e-3)
      );
      model.scene.scale.multiplyScalar(scale);
      model.scene.position.set(-center.x * scale, -bounds.min.y * scale, -center.z * scale);
      model.scene.traverse((child) => {
        if (child instanceof Mesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
      asset.group.add(model.scene);
      asset.loading = false;
    } catch {
      if (asset.controller.signal.aborted || this.disposed) return;
      asset.loading = false;
      asset.error = object.title;
      this.sign(
        asset.group,
        [object.title, "Model unavailable"],
        1.6,
        0.8,
        [0, 0.65, 0],
        "#f3e9d5",
        "#493d32"
      );
    }
  }
  reportAssets() {
    if (this.disposed) return;
    this.callbacks.status(
      [...this.assets.values()].filter((asset) => asset.loading).length,
      [...this.assets.values()].flatMap((asset) => asset.error ? [asset.error] : [])
    );
  }
  clearAssets() {
    for (const asset of this.assets.values()) {
      asset.controller.abort();
      this.clearGroup(asset.group);
      asset.group.removeFromParent();
    }
    this.assets.clear();
  }
  clearGroup(group) {
    disposeTree(group);
    group.clear();
  }
  material(color, metalness = 0) {
    return new MeshStandardMaterial({ color, roughness: 0.72, metalness });
  }
  box(group, size, position, material2) {
    const mesh = new Mesh(new BoxGeometry(size[0], size[1], size[2]), material2);
    mesh.position.set(position[0], position[1], position[2]);
    group.add(mesh);
    return mesh;
  }
  sign(group, lines, width, height, position, background, color) {
    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = Math.max(180, Math.round(1024 * height / width));
    const context = canvas.getContext("2d");
    context.fillStyle = background;
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.strokeStyle = color;
    context.globalAlpha = 0.3;
    context.lineWidth = 2;
    context.strokeRect(13, 13, canvas.width - 26, canvas.height - 26);
    context.globalAlpha = 1;
    context.fillStyle = color;
    context.textAlign = "center";
    context.textBaseline = "middle";
    lines.forEach((line, index) => {
      let fontSize = index === 1 ? Math.min(66, canvas.height * 0.26) : Math.min(32, canvas.height / (lines.length * 1.9));
      const family = index === 1 ? "Georgia, serif" : "Arial, sans-serif";
      context.font = `${fontSize}px ${family}`;
      while (context.measureText(line).width > 935 && fontSize > 16) {
        fontSize -= 1;
        context.font = `${fontSize}px ${family}`;
      }
      context.fillText(line, 512, canvas.height * ((index + 0.65) / (lines.length + 0.3)), 950);
    });
    const texture2 = new CanvasTexture(canvas);
    texture2.colorSpace = SRGBColorSpace;
    texture2.anisotropy = Math.min(4, this.renderer.capabilities.getMaxAnisotropy());
    const mesh = new Mesh(
      new PlaneGeometry(width, height),
      new MeshBasicMaterial({ map: texture2, side: DoubleSide })
    );
    mesh.position.set(position[0], position[1], position[2]);
    group.add(mesh);
    return mesh;
  }
  cancelTransition = () => {
    this.transition = void 0;
  };
  resize = () => {
    if (this.disposed) return;
    const width = Math.max(1, this.host.clientWidth), height = Math.max(1, this.host.clientHeight);
    this.renderer.setSize(width, height, false);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.invalidate();
  };
  invalidate = () => {
    if (!this.frame && !this.disposed && !this.lost)
      this.frame = requestAnimationFrame(this.render);
  };
  render = (now) => {
    this.frame = 0;
    if (this.disposed || this.lost || document.hidden) return;
    if (this.transition) {
      const t = Math.min(1, (now - this.transition.start) / 550), eased = t * t * (3 - 2 * t);
      this.camera.position.lerpVectors(this.transition.from, this.transition.to, eased);
      this.controls.target.lerpVectors(this.transition.targetFrom, this.transition.targetTo, eased);
      this.controls.update();
      if (t === 1) this.transition = void 0;
      else this.invalidate();
    }
    this.renderer.render(this.scene, this.camera);
  };
  onPointerDown = (event) => {
    this.pointerStart = { x: event.clientX, y: event.clientY };
  };
  onPointerUp = (event) => {
    if (Math.hypot(event.clientX - this.pointerStart.x, event.clientY - this.pointerStart.y) > 7)
      return;
    const bounds = this.renderer.domElement.getBoundingClientRect();
    this.pointer.set(
      (event.clientX - bounds.left) / bounds.width * 2 - 1,
      -(event.clientY - bounds.top) / bounds.height * 2 + 1
    );
    this.raycaster.setFromCamera(this.pointer, this.camera);
    const hit = this.raycaster.intersectObjects(
      [this.architecture, this.signage, this.exhibits],
      true
    )[0];
    for (let object = hit?.object ?? null; object; object = object.parent) {
      const id = object.userData["selectionId"];
      if (typeof id === "string") {
        this.callbacks.selected(id);
        return;
      }
    }
  };
  onContextLost = (event) => {
    event.preventDefault();
    this.lost = true;
    this.callbacks.failed(
      "The 3D view was interrupted. Reload the room to restore it. Your labels and draft are safe."
    );
  };
};
function disposeTree(root) {
  const geometries = /* @__PURE__ */ new Set(), materials = /* @__PURE__ */ new Set(), textures = /* @__PURE__ */ new Set();
  root.traverse((object) => {
    if (!(object instanceof Mesh)) return;
    geometries.add(object.geometry);
    for (const material2 of Array.isArray(object.material) ? object.material : [object.material]) {
      materials.add(material2);
      for (const value of Object.values(material2))
        if (value instanceof Texture) textures.add(value);
    }
  });
  textures.forEach((texture2) => {
    const image = texture2.source.data;
    if (typeof ImageBitmap !== "undefined" && image instanceof ImageBitmap) image.close();
    texture2.dispose();
  });
  materials.forEach((material2) => material2.dispose());
  geometries.forEach((geometry) => geometry.dispose());
}
export {
  MuseumScene
};
//# debugId=bec37a8f-844a-51fa-b3ba-eaf922ac8f8c
//# sourceMappingURL=chunk-23I7LDYC.js.map
