import * as T from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';

/** GPU resources are owned by one mounted workshop and disposed together. */
export class BalanceMetalwork {
  readonly geometries = new Set<T.BufferGeometry>();
  readonly materials = new Set<T.Material>();
  readonly textures = new Set<T.Texture>();
  readonly brass: T.MeshStandardMaterial;
  readonly steel: T.MeshStandardMaterial;
  readonly dark: T.MeshStandardMaterial;
  readonly rope: T.MeshStandardMaterial;
  readonly trim: T.MeshStandardMaterial;
  readonly glow: T.MeshStandardMaterial;
  constructor(private readonly labels = true) {
    const grain = new Uint8Array(128 * 64 * 4);
    for (let y = 0; y < 64; y++)
      for (let x = 0; x < 128; x++) {
        const v = 130 + Math.round(Math.sin(y * 17.71) * 33 + Math.sin(x * 2.1 + y) * 5);
        const n = (y * 128 + x) * 4;
        grain.set([v, v, v, 255], n);
      }
    const brushed = new T.DataTexture(grain, 128, 64);
    brushed.wrapS = brushed.wrapT = T.RepeatWrapping;
    brushed.repeat.set(1, 5);
    brushed.needsUpdate = true;
    this.textures.add(brushed);
    this.brass = this.material({
      color: 0xc7a352,
      metalness: 0.91,
      roughness: 0.28,
      bumpMap: brushed,
      bumpScale: 0.009,
    });
    this.steel = this.material({
      color: 0xa1b4bc,
      metalness: 0.92,
      roughness: 0.35,
      bumpMap: brushed,
      bumpScale: 0.012,
    });
    this.dark = this.material({ color: 0x17252c, metalness: 0.64, roughness: 0.56 });
    this.rope = this.material({ color: 0xb6a27a, roughness: 0.94 });
    this.trim = this.material({ color: 0x41504b, metalness: 0.72, roughness: 0.39 });
    this.glow = this.material({
      color: 0xbef6d4,
      emissive: 0x72e3a2,
      emissiveIntensity: 0.65,
      roughness: 0.45,
    });
  }
  material(settings: T.MeshStandardMaterialParameters): T.MeshStandardMaterial {
    const material = new T.MeshStandardMaterial(settings);
    this.materials.add(material);
    return material;
  }
  mesh(
    geometry: T.BufferGeometry,
    material: T.Material,
    parent: T.Object3D,
    x = 0,
    y = 0,
    z = 0,
  ): T.Mesh {
    this.geometries.add(geometry);
    const mesh = new T.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    mesh.castShadow = mesh.receiveShadow = true;
    parent.add(mesh);
    return mesh;
  }
  box(
    parent: T.Object3D,
    x: number,
    y: number,
    z: number,
    w: number,
    h: number,
    d: number,
    material = this.steel,
    radius = 0.04,
  ): T.Mesh {
    return this.mesh(
      new RoundedBoxGeometry(w, h, d, 2, Math.min(radius, w / 3, h / 3, d / 3)),
      material,
      parent,
      x,
      y,
      z,
    );
  }
  cylinder(
    parent: T.Object3D,
    x: number,
    y: number,
    z: number,
    r: number,
    h: number,
    material = this.brass,
  ): T.Mesh {
    return this.mesh(new T.CylinderGeometry(r, r, h, 40, 1), material, parent, x, y, z);
  }
  torus(
    parent: T.Object3D,
    x: number,
    y: number,
    z: number,
    r: number,
    tube: number,
    material = this.brass,
  ): T.Mesh {
    return this.mesh(new T.TorusGeometry(r, tube, 8, 36), material, parent, x, y, z);
  }
  rod(
    parent: T.Object3D,
    start: T.Vector3,
    end: T.Vector3,
    radius: number,
    material = this.rope,
  ): T.Mesh {
    const mesh = this.cylinder(parent, 0, 0, 0, radius, 1, material);
    this.positionRod(mesh, start, end);
    return mesh;
  }
  positionRod(mesh: T.Mesh, start: T.Vector3, end: T.Vector3): void {
    const delta = end.clone().sub(start);
    mesh.position.copy(start).add(end).multiplyScalar(0.5);
    mesh.scale.y = delta.length();
    mesh.quaternion.setFromUnitVectors(new T.Vector3(0, 1, 0), delta.normalize());
  }
  screw(parent: T.Object3D, x: number, y: number, z: number): void {
    const head = this.cylinder(parent, x, y, z, 0.068, 0.035, this.steel);
    head.rotation.x = Math.PI / 2;
    const slot = this.box(parent, x, y, z + 0.023, 0.079, 0.012, 0.01, this.dark, 0.002);
    slot.rotation.z = -0.45;
  }
  label(
    parent: T.Object3D,
    text: string,
    x: number,
    y: number,
    z: number,
    width: number,
    height: number,
    color = '#f6e9c6',
  ): void {
    if (!this.labels) return;
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 128;
    const context = canvas.getContext('2d');
    if (!context) return;
    context.fillStyle = color;
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.font = '600 92px Georgia';
    context.fillText(text, 128, 65, 238);
    const texture = new T.CanvasTexture(canvas);
    texture.colorSpace = T.SRGBColorSpace;
    this.textures.add(texture);
    const material = new T.MeshBasicMaterial({
      map: texture,
      transparent: true,
      depthWrite: false,
      toneMapped: false,
    });
    this.materials.add(material);
    this.mesh(new T.PlaneGeometry(width, height), material, parent, x, y, z).castShadow = false;
  }
  dispose(): void {
    this.geometries.forEach((g) => g.dispose());
    this.materials.forEach((m) => m.dispose());
    this.textures.forEach((t) => t.dispose());
    this.geometries.clear();
    this.materials.clear();
    this.textures.clear();
  }
}
