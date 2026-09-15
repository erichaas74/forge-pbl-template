import * as T from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import type { BalanceMetalwork } from '../../balance-lock/balance-lock.3d-materials';

/** Merge stationary pieces by material, in their parent's coordinates. Moving assemblies
 * are batched separately, so real doors, apertures and raycastable cranks remain intact. */
export function batchMetalwork(
  art: BalanceMetalwork,
  parent: T.Group,
  moving: ReadonlySet<T.Object3D> = new Set(),
): void {
  const batches = new Map<T.Material, T.Mesh[]>();
  for (const child of [...parent.children]) {
    if (!(child instanceof T.Mesh) || Array.isArray(child.material) || moving.has(child)) continue;
    const list = batches.get(child.material) ?? [];
    list.push(child);
    batches.set(child.material, list);
  }
  for (const [material, meshes] of batches) {
    if (meshes.length < 2) continue;
    const pieces = meshes.map((mesh) => {
      mesh.updateMatrix();
      const geometry = mesh.geometry.index ? mesh.geometry.toNonIndexed() : mesh.geometry.clone();
      return geometry.applyMatrix4(mesh.matrix);
    });
    const merged = mergeGeometries(pieces, false);
    pieces.forEach((g) => g.dispose());
    if (!merged) throw new Error('Incompatible timing scenery geometry');
    const mesh = art.mesh(merged, material, parent);
    mesh.name = 'batched-metalwork';
    mesh.castShadow = meshes.some((m) => m.castShadow);
    mesh.receiveShadow = meshes.some((m) => m.receiveShadow);
    meshes.forEach((m) => parent.remove(m));
  }
}
