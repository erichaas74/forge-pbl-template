import * as T from 'three';
import type { BalanceMetalwork } from '../balance-lock/balance-lock.3d-materials';

/** Size the backing canvas to the world label's aspect ratio so digits are never stretched. */
export function dioramaLabel(
  art: BalanceMetalwork,
  parent: T.Object3D,
  text: string,
  x: number,
  y: number,
  z: number,
  width: number,
  height: number,
  color = '#f6e9c6',
): void {
  if (typeof document === 'undefined') return;
  const canvas = document.createElement('canvas');
  canvas.height = 128;
  canvas.width = Math.max(64, Math.ceil((128 * width) / height));
  const context = canvas.getContext('2d');
  if (!context) return;
  let size = 94;
  context.font = `600 ${size}px 'Trebuchet MS', sans-serif`;
  const measured = context.measureText(text).width;
  if (measured > canvas.width - 10) size *= (canvas.width - 10) / measured;
  context.font = `600 ${size}px 'Trebuchet MS', sans-serif`;
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.fillStyle = color;
  context.fillText(text, canvas.width / 2, 65);
  const texture = new T.CanvasTexture(canvas);
  texture.colorSpace = T.SRGBColorSpace;
  art.textures.add(texture);
  const material = new T.MeshBasicMaterial({
    map: texture,
    transparent: true,
    depthWrite: false,
    toneMapped: false,
  });
  art.materials.add(material);
  const mesh = art.mesh(new T.PlaneGeometry(width, height), material, parent, x, y, z);
  mesh.castShadow = false;
}
