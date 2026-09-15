import * as T from 'three';
import type { BalanceMetalwork } from '../balance-lock/balance-lock.3d-materials';

/** Small, deterministic material maps owned by the mounted viewer; no runtime asset requests. */
export class DioramaSurfaces {
  private readonly stoneMap: T.DataTexture;
  private readonly woodMap: T.DataTexture;
  constructor(private readonly art: BalanceMetalwork) {
    this.stoneMap = this.texture(false);
    this.woodMap = this.texture(true);
  }
  private texture(wood: boolean): T.DataTexture {
    const data = new Uint8Array(128 * 128 * 4);
    const hash = (x: number, y: number) => {
      const v = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
      return v - Math.floor(v);
    };
    const noise = (x: number, y: number) => {
      const ix = Math.floor(x),
        iy = Math.floor(y),
        fx = x - ix,
        fy = y - iy;
      const u = fx * fx * (3 - 2 * fx),
        v = fy * fy * (3 - 2 * fy);
      return T.MathUtils.lerp(
        T.MathUtils.lerp(hash(ix, iy), hash(ix + 1, iy), u),
        T.MathUtils.lerp(hash(ix, iy + 1), hash(ix + 1, iy + 1), u),
        v,
      );
    };
    for (let y = 0; y < 128; y++)
      for (let x = 0; x < 128; x++) {
        const cloud = noise(x / 19, y / 19) * 0.5 + noise(x / 5, y / 5) * 0.32 + hash(x, y) * 0.18;
        const value = wood
          ? 190 + cloud * 25 + Math.sin(x * 0.4 + noise(x / 12, y / 45) * 8) * 26
          : 174 + cloud * 75;
        const n = (y * 128 + x) * 4;
        data.set([value, value, value, 255], n);
      }
    const map = new T.DataTexture(data, 128, 128);
    map.wrapS = map.wrapT = T.RepeatWrapping;
    map.magFilter = T.LinearFilter;
    map.minFilter = T.LinearMipmapLinearFilter;
    map.generateMipmaps = true;
    map.needsUpdate = true;
    this.art.textures.add(map);
    return map;
  }
  stone(color: number): T.MeshStandardMaterial {
    return this.art.material({
      color,
      map: this.stoneMap,
      bumpMap: this.stoneMap,
      bumpScale: 0.06,
      roughness: 0.93,
    });
  }
  wood(color: number): T.MeshStandardMaterial {
    return this.art.material({
      color,
      map: this.woodMap,
      bumpMap: this.woodMap,
      bumpScale: 0.025,
      roughness: 0.76,
    });
  }
}

/** Voussoirs frame a recessed opening while keeping the mechanism's foreground clear. */
export function stoneArch(
  art: BalanceMetalwork,
  parent: T.Group,
  x: number,
  y: number,
  radius: number,
  z: number,
  stone: T.MeshStandardMaterial,
): void {
  for (let i = 0; i < 11; i++) {
    const a = (i * Math.PI) / 11 + 0.015,
      b = ((i + 1) * Math.PI) / 11 - 0.015;
    const shape = new T.Shape();
    shape.absarc(0, 0, radius, a, b, false);
    shape.absarc(0, 0, radius + 0.3, b, a, true);
    shape.closePath();
    art.mesh(
      new T.ExtrudeGeometry(shape, {
        depth: 0.34,
        bevelEnabled: true,
        bevelSize: 0.025,
        bevelThickness: 0.025,
        bevelSegments: 2,
        steps: 1,
        curveSegments: 6,
      }),
      stone,
      parent,
      x,
      y,
      z,
    );
  }
}
