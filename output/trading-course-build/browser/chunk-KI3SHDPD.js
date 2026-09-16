import {
  mergeGeometries
} from "./chunk-4GBFXHP3.js";
import {
  BackSide,
  BoxGeometry,
  CanvasTexture,
  CylinderGeometry,
  DataTexture,
  ExtrudeGeometry,
  InstancedMesh,
  LinearFilter,
  LinearMipmapLinearFilter,
  MathUtils,
  Mesh,
  MeshBasicMaterial,
  MeshLambertMaterial,
  MeshStandardMaterial,
  Object3D,
  PlaneGeometry,
  PointLight,
  RepeatWrapping,
  SRGBColorSpace,
  Scene,
  Shape,
  TorusGeometry,
  Vector3
} from "./chunk-E3MFW572.js";

// node_modules/three/examples/jsm/environments/RoomEnvironment.js
var RoomEnvironment = class extends Scene {
  constructor() {
    super();
    this.name = "RoomEnvironment";
    const geometry = new BoxGeometry();
    geometry.deleteAttribute("uv");
    const roomMaterial = new MeshStandardMaterial({ side: BackSide });
    const boxMaterial = new MeshStandardMaterial();
    const mainLight = new PointLight(16777215, 900, 28, 2);
    mainLight.position.set(0.418, 16.199, 0.3);
    this.add(mainLight);
    const room = new Mesh(geometry, roomMaterial);
    room.position.set(-0.757, 13.219, 0.717);
    room.scale.set(31.713, 28.305, 28.591);
    this.add(room);
    const boxes = new InstancedMesh(geometry, boxMaterial, 6);
    const transform = new Object3D();
    transform.position.set(-10.906, 2.009, 1.846);
    transform.rotation.set(0, -0.195, 0);
    transform.scale.set(2.328, 7.905, 4.651);
    transform.updateMatrix();
    boxes.setMatrixAt(0, transform.matrix);
    transform.position.set(-5.607, -0.754, -0.758);
    transform.rotation.set(0, 0.994, 0);
    transform.scale.set(1.97, 1.534, 3.955);
    transform.updateMatrix();
    boxes.setMatrixAt(1, transform.matrix);
    transform.position.set(6.167, 0.857, 7.803);
    transform.rotation.set(0, 0.561, 0);
    transform.scale.set(3.927, 6.285, 3.687);
    transform.updateMatrix();
    boxes.setMatrixAt(2, transform.matrix);
    transform.position.set(-2.017, 0.018, 6.124);
    transform.rotation.set(0, 0.333, 0);
    transform.scale.set(2.002, 4.566, 2.064);
    transform.updateMatrix();
    boxes.setMatrixAt(3, transform.matrix);
    transform.position.set(2.291, -0.756, -2.621);
    transform.rotation.set(0, -0.286, 0);
    transform.scale.set(1.546, 1.552, 1.496);
    transform.updateMatrix();
    boxes.setMatrixAt(4, transform.matrix);
    transform.position.set(-2.193, -0.369, -5.547);
    transform.rotation.set(0, 0.516, 0);
    transform.scale.set(3.875, 3.487, 2.986);
    transform.updateMatrix();
    boxes.setMatrixAt(5, transform.matrix);
    this.add(boxes);
    const light1 = new Mesh(geometry, createAreaLightMaterial(50));
    light1.position.set(-16.116, 14.37, 8.208);
    light1.scale.set(0.1, 2.428, 2.739);
    this.add(light1);
    const light2 = new Mesh(geometry, createAreaLightMaterial(50));
    light2.position.set(-16.109, 18.021, -8.207);
    light2.scale.set(0.1, 2.425, 2.751);
    this.add(light2);
    const light3 = new Mesh(geometry, createAreaLightMaterial(17));
    light3.position.set(14.904, 12.198, -1.832);
    light3.scale.set(0.15, 4.265, 6.331);
    this.add(light3);
    const light4 = new Mesh(geometry, createAreaLightMaterial(43));
    light4.position.set(-0.462, 8.89, 14.52);
    light4.scale.set(4.38, 5.441, 0.088);
    this.add(light4);
    const light5 = new Mesh(geometry, createAreaLightMaterial(20));
    light5.position.set(3.235, 11.486, -12.541);
    light5.scale.set(2.5, 2, 0.1);
    this.add(light5);
    const light6 = new Mesh(geometry, createAreaLightMaterial(100));
    light6.position.set(0, 20, 0);
    light6.scale.set(1, 0.1, 1);
    this.add(light6);
  }
  /**
   * Frees internal resources. This method should be called
   * when the environment is no longer required.
   */
  dispose() {
    const resources = /* @__PURE__ */ new Set();
    this.traverse((object) => {
      if (object.isMesh) {
        resources.add(object.geometry);
        resources.add(object.material);
      }
    });
    for (const resource of resources) {
      resource.dispose();
    }
  }
};
function createAreaLightMaterial(intensity) {
  const material = new MeshLambertMaterial({
    color: 0,
    emissive: 16777215,
    emissiveIntensity: intensity
  });
  return material;
}

// node_modules/three/examples/jsm/geometries/RoundedBoxGeometry.js
var _tempNormal = new Vector3();
function getUv(faceDirVector, normal, uvAxis, projectionAxis, radius, sideLength) {
  const totArcLength = 2 * Math.PI * radius / 4;
  const centerLength = Math.max(sideLength - 2 * radius, 0);
  const halfArc = Math.PI / 4;
  _tempNormal.copy(normal);
  _tempNormal[projectionAxis] = 0;
  _tempNormal.normalize();
  const arcUvRatio = 0.5 * totArcLength / (totArcLength + centerLength);
  const arcAngleRatio = 1 - _tempNormal.angleTo(faceDirVector) / halfArc;
  if (Math.sign(_tempNormal[uvAxis]) === 1) {
    return arcAngleRatio * arcUvRatio;
  } else {
    const lenUv = centerLength / (totArcLength + centerLength);
    return lenUv + arcUvRatio + arcUvRatio * (1 - arcAngleRatio);
  }
}
var RoundedBoxGeometry = class _RoundedBoxGeometry extends BoxGeometry {
  /**
   * Constructs a new rounded box geometry.
   *
   * @param {number} [width=1] - The width. That is, the length of the edges parallel to the X axis.
   * @param {number} [height=1] - The height. That is, the length of the edges parallel to the Y axis.
   * @param {number} [depth=1] - The depth. That is, the length of the edges parallel to the Z axis.
   * @param {number} [segments=2] - Number of segments that form the rounded corners.
   * @param {number} [radius=0.1] - The radius of the rounded corners.
   */
  constructor(width = 1, height = 1, depth = 1, segments = 2, radius = 0.1) {
    const totalSegments = segments * 2 + 1;
    radius = Math.min(width / 2, height / 2, depth / 2, radius);
    super(1, 1, 1, totalSegments, totalSegments, totalSegments);
    this.type = "RoundedBoxGeometry";
    this.parameters = {
      width,
      height,
      depth,
      segments,
      radius
    };
    if (totalSegments === 1) return;
    const geometry2 = this.toNonIndexed();
    this.index = null;
    this.attributes.position = geometry2.attributes.position;
    this.attributes.normal = geometry2.attributes.normal;
    this.attributes.uv = geometry2.attributes.uv;
    const position = new Vector3();
    const normal = new Vector3();
    const box = new Vector3(width, height, depth).divideScalar(2).subScalar(radius);
    const positions = this.attributes.position.array;
    const normals = this.attributes.normal.array;
    const uvs = this.attributes.uv.array;
    const faceTris = positions.length / 6;
    const faceDirVector = new Vector3();
    const halfSegmentSize = 0.5 / totalSegments;
    for (let i = 0, j = 0; i < positions.length; i += 3, j += 2) {
      position.fromArray(positions, i);
      normal.copy(position);
      normal.x -= Math.sign(normal.x) * halfSegmentSize;
      normal.y -= Math.sign(normal.y) * halfSegmentSize;
      normal.z -= Math.sign(normal.z) * halfSegmentSize;
      normal.normalize();
      positions[i + 0] = box.x * Math.sign(position.x) + normal.x * radius;
      positions[i + 1] = box.y * Math.sign(position.y) + normal.y * radius;
      positions[i + 2] = box.z * Math.sign(position.z) + normal.z * radius;
      normals[i + 0] = normal.x;
      normals[i + 1] = normal.y;
      normals[i + 2] = normal.z;
      const side = Math.floor(i / faceTris);
      switch (side) {
        case 0:
          faceDirVector.set(1, 0, 0);
          uvs[j + 0] = getUv(faceDirVector, normal, "z", "y", radius, depth);
          uvs[j + 1] = 1 - getUv(faceDirVector, normal, "y", "z", radius, height);
          break;
        case 1:
          faceDirVector.set(-1, 0, 0);
          uvs[j + 0] = 1 - getUv(faceDirVector, normal, "z", "y", radius, depth);
          uvs[j + 1] = 1 - getUv(faceDirVector, normal, "y", "z", radius, height);
          break;
        case 2:
          faceDirVector.set(0, 1, 0);
          uvs[j + 0] = 1 - getUv(faceDirVector, normal, "x", "z", radius, width);
          uvs[j + 1] = getUv(faceDirVector, normal, "z", "x", radius, depth);
          break;
        case 3:
          faceDirVector.set(0, -1, 0);
          uvs[j + 0] = 1 - getUv(faceDirVector, normal, "x", "z", radius, width);
          uvs[j + 1] = 1 - getUv(faceDirVector, normal, "z", "x", radius, depth);
          break;
        case 4:
          faceDirVector.set(0, 0, 1);
          uvs[j + 0] = 1 - getUv(faceDirVector, normal, "x", "y", radius, width);
          uvs[j + 1] = 1 - getUv(faceDirVector, normal, "y", "x", radius, height);
          break;
        case 5:
          faceDirVector.set(0, 0, -1);
          uvs[j + 0] = getUv(faceDirVector, normal, "x", "y", radius, width);
          uvs[j + 1] = 1 - getUv(faceDirVector, normal, "y", "x", radius, height);
          break;
      }
    }
  }
  /**
   * Factory method for creating an instance of this class from the given
   * JSON object.
   *
   * @param {Object} data - A JSON object representing the serialized geometry.
   * @returns {RoundedBoxGeometry} A new instance.
   */
  static fromJSON(data) {
    return new _RoundedBoxGeometry(
      data.width,
      data.height,
      data.depth,
      data.segments,
      data.radius
    );
  }
};

// src/app/templates/heist/escape/balance-lock/balance-lock.3d-materials.ts
var BalanceMetalwork = class {
  constructor(labels = true) {
    this.labels = labels;
    const grain = new Uint8Array(128 * 64 * 4);
    for (let y = 0; y < 64; y++)
      for (let x = 0; x < 128; x++) {
        const v = 130 + Math.round(Math.sin(y * 17.71) * 33 + Math.sin(x * 2.1 + y) * 5);
        const n = (y * 128 + x) * 4;
        grain.set([v, v, v, 255], n);
      }
    const brushed = new DataTexture(grain, 128, 64);
    brushed.wrapS = brushed.wrapT = RepeatWrapping;
    brushed.repeat.set(1, 5);
    brushed.needsUpdate = true;
    this.textures.add(brushed);
    this.brass = this.material({
      color: 13083474,
      metalness: 0.91,
      roughness: 0.28,
      bumpMap: brushed,
      bumpScale: 9e-3
    });
    this.steel = this.material({
      color: 10597564,
      metalness: 0.92,
      roughness: 0.35,
      bumpMap: brushed,
      bumpScale: 0.012
    });
    this.dark = this.material({ color: 1516844, metalness: 0.64, roughness: 0.56 });
    this.rope = this.material({ color: 11969146, roughness: 0.94 });
    this.trim = this.material({ color: 4280395, metalness: 0.72, roughness: 0.39 });
    this.glow = this.material({
      color: 12515028,
      emissive: 7529378,
      emissiveIntensity: 0.65,
      roughness: 0.45
    });
  }
  labels;
  geometries = /* @__PURE__ */ new Set();
  materials = /* @__PURE__ */ new Set();
  textures = /* @__PURE__ */ new Set();
  brass;
  steel;
  dark;
  rope;
  trim;
  glow;
  material(settings) {
    const material = new MeshStandardMaterial(settings);
    this.materials.add(material);
    return material;
  }
  mesh(geometry, material, parent, x = 0, y = 0, z = 0) {
    this.geometries.add(geometry);
    const mesh = new Mesh(geometry, material);
    mesh.position.set(x, y, z);
    mesh.castShadow = mesh.receiveShadow = true;
    parent.add(mesh);
    return mesh;
  }
  box(parent, x, y, z, w, h, d, material = this.steel, radius = 0.04) {
    return this.mesh(
      new RoundedBoxGeometry(w, h, d, 2, Math.min(radius, w / 3, h / 3, d / 3)),
      material,
      parent,
      x,
      y,
      z
    );
  }
  cylinder(parent, x, y, z, r, h, material = this.brass) {
    return this.mesh(new CylinderGeometry(r, r, h, 40, 1), material, parent, x, y, z);
  }
  torus(parent, x, y, z, r, tube, material = this.brass) {
    return this.mesh(new TorusGeometry(r, tube, 8, 36), material, parent, x, y, z);
  }
  rod(parent, start, end, radius, material = this.rope) {
    const mesh = this.cylinder(parent, 0, 0, 0, radius, 1, material);
    this.positionRod(mesh, start, end);
    return mesh;
  }
  positionRod(mesh, start, end) {
    const delta = end.clone().sub(start);
    mesh.position.copy(start).add(end).multiplyScalar(0.5);
    mesh.scale.y = delta.length();
    mesh.quaternion.setFromUnitVectors(new Vector3(0, 1, 0), delta.normalize());
  }
  screw(parent, x, y, z) {
    const head = this.cylinder(parent, x, y, z, 0.068, 0.035, this.steel);
    head.rotation.x = Math.PI / 2;
    const slot = this.box(parent, x, y, z + 0.023, 0.079, 0.012, 0.01, this.dark, 2e-3);
    slot.rotation.z = -0.45;
  }
  label(parent, text, x, y, z, width, height, color = "#f6e9c6") {
    if (!this.labels) return;
    const canvas = document.createElement("canvas");
    canvas.width = 256;
    canvas.height = 128;
    const context = canvas.getContext("2d");
    if (!context) return;
    context.fillStyle = color;
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.font = "600 92px Georgia";
    context.fillText(text, 128, 65, 238);
    const texture = new CanvasTexture(canvas);
    texture.colorSpace = SRGBColorSpace;
    this.textures.add(texture);
    const material = new MeshBasicMaterial({
      map: texture,
      transparent: true,
      depthWrite: false,
      toneMapped: false
    });
    this.materials.add(material);
    this.mesh(new PlaneGeometry(width, height), material, parent, x, y, z).castShadow = false;
  }
  dispose() {
    this.geometries.forEach((g) => g.dispose());
    this.materials.forEach((m) => m.dispose());
    this.textures.forEach((t) => t.dispose());
    this.geometries.clear();
    this.materials.clear();
    this.textures.clear();
  }
};

// src/app/templates/heist/escape/locks/diorama-surfaces.ts
var DioramaSurfaces = class {
  constructor(art) {
    this.art = art;
    this.stoneMap = this.texture(false);
    this.woodMap = this.texture(true);
  }
  art;
  stoneMap;
  woodMap;
  texture(wood) {
    const data = new Uint8Array(128 * 128 * 4);
    const hash = (x, y) => {
      const v = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
      return v - Math.floor(v);
    };
    const noise = (x, y) => {
      const ix = Math.floor(x), iy = Math.floor(y), fx = x - ix, fy = y - iy;
      const u = fx * fx * (3 - 2 * fx), v = fy * fy * (3 - 2 * fy);
      return MathUtils.lerp(
        MathUtils.lerp(hash(ix, iy), hash(ix + 1, iy), u),
        MathUtils.lerp(hash(ix, iy + 1), hash(ix + 1, iy + 1), u),
        v
      );
    };
    for (let y = 0; y < 128; y++)
      for (let x = 0; x < 128; x++) {
        const cloud = noise(x / 19, y / 19) * 0.5 + noise(x / 5, y / 5) * 0.32 + hash(x, y) * 0.18;
        const value = wood ? 190 + cloud * 25 + Math.sin(x * 0.4 + noise(x / 12, y / 45) * 8) * 26 : 174 + cloud * 75;
        const n = (y * 128 + x) * 4;
        data.set([value, value, value, 255], n);
      }
    const map = new DataTexture(data, 128, 128);
    map.wrapS = map.wrapT = RepeatWrapping;
    map.magFilter = LinearFilter;
    map.minFilter = LinearMipmapLinearFilter;
    map.generateMipmaps = true;
    map.needsUpdate = true;
    this.art.textures.add(map);
    return map;
  }
  stone(color) {
    return this.art.material({
      color,
      map: this.stoneMap,
      bumpMap: this.stoneMap,
      bumpScale: 0.06,
      roughness: 0.93
    });
  }
  wood(color) {
    return this.art.material({
      color,
      map: this.woodMap,
      bumpMap: this.woodMap,
      bumpScale: 0.025,
      roughness: 0.76
    });
  }
};
function stoneArch(art, parent, x, y, radius, z, stone) {
  for (let i = 0; i < 11; i++) {
    const a = i * Math.PI / 11 + 0.015, b = (i + 1) * Math.PI / 11 - 0.015;
    const shape = new Shape();
    shape.absarc(0, 0, radius, a, b, false);
    shape.absarc(0, 0, radius + 0.3, b, a, true);
    shape.closePath();
    art.mesh(
      new ExtrudeGeometry(shape, {
        depth: 0.34,
        bevelEnabled: true,
        bevelSize: 0.025,
        bevelThickness: 0.025,
        bevelSegments: 2,
        steps: 1,
        curveSegments: 6
      }),
      stone,
      parent,
      x,
      y,
      z
    );
  }
}

// src/app/templates/heist/escape/locks/timing-cage/timing-cage.batch.ts
function batchMetalwork(art, parent, moving = /* @__PURE__ */ new Set()) {
  const batches = /* @__PURE__ */ new Map();
  for (const child of [...parent.children]) {
    if (!(child instanceof Mesh) || Array.isArray(child.material) || moving.has(child)) continue;
    const list = batches.get(child.material) ?? [];
    list.push(child);
    batches.set(child.material, list);
  }
  for (const [material, meshes] of batches) {
    if (meshes.length < 2) continue;
    const pieces = meshes.map((mesh2) => {
      mesh2.updateMatrix();
      const geometry = mesh2.geometry.index ? mesh2.geometry.toNonIndexed() : mesh2.geometry.clone();
      return geometry.applyMatrix4(mesh2.matrix);
    });
    const merged = mergeGeometries(pieces, false);
    pieces.forEach((g) => g.dispose());
    if (!merged) throw new Error("Incompatible timing scenery geometry");
    const mesh = art.mesh(merged, material, parent);
    mesh.name = "batched-metalwork";
    mesh.castShadow = meshes.some((m) => m.castShadow);
    mesh.receiveShadow = meshes.some((m) => m.receiveShadow);
    meshes.forEach((m) => parent.remove(m));
  }
}

export {
  RoomEnvironment,
  BalanceMetalwork,
  DioramaSurfaces,
  stoneArch,
  batchMetalwork
};
//# debugId=bc641d24-012d-5363-809f-c3e9e372ac63
//# sourceMappingURL=chunk-KI3SHDPD.js.map
