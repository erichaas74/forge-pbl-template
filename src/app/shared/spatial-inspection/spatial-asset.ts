import { AnimationClip, BufferGeometry, Group, Material, Mesh, Object3D, Skeleton, SkinnedMesh, Texture } from 'three';
import { SpatialAssetError, type SpatialAssetManifest } from './spatial-asset.contract';

export interface ImportedSpatialAsset { readonly scene: Group; readonly scenes: readonly Group[]; readonly animations: readonly AnimationClip[] }
export interface MountedSpatialAsset {
  readonly pivot: Group;
  readonly nodes: ReadonlyMap<string, Object3D>;
  readonly clips: ReadonlyMap<string, AnimationClip>;
  dispose(): void;
}

/** Exclusive ownership only. A future shared cache must supply reference counting. */
export function disposeSpatialScenes(scenes: readonly Object3D[]): void {
  const geometries = new Set<BufferGeometry>(), materials = new Set<Material>(), textures = new Set<Texture>(), skeletons = new Set<Skeleton>();
  for (const root of scenes) root.traverse(node => {
    if (node instanceof Mesh) {
      geometries.add(node.geometry);
      for (const material of Array.isArray(node.material) ? node.material : [node.material]) materials.add(material);
    }
    if (node instanceof SkinnedMesh) skeletons.add(node.skeleton);
  });
  for (const material of materials) for (const value of Object.values(material)) if (value instanceof Texture) textures.add(value);
  // Skeleton.dispose owns its bone texture; avoid a second release if also referenced elsewhere.
  for (const skeleton of skeletons) { if (skeleton.boneTexture) textures.delete(skeleton.boneTexture); skeleton.dispose(); }
  const bitmaps = new Set<ImageBitmap>();
  for (const texture of textures) {
    const images: unknown[] = Array.isArray(texture.source.data) ? texture.source.data : [texture.source.data];
    for (const image of images) if (typeof ImageBitmap !== 'undefined' && image instanceof ImageBitmap) bitmaps.add(image);
    texture.dispose();
  }
  for (const bitmap of bitmaps) bitmap.close();
  for (const material of materials) material.dispose();
  for (const geometry of geometries) geometry.dispose();
}

/** Takes ownership on success AND failure. Does not modify imported transforms. */
export function mountSpatialAsset(asset: ImportedSpatialAsset, manifest: SpatialAssetManifest): MountedSpatialAsset {
  const roots = [...new Set([asset.scene, ...asset.scenes])];
  try {
    const byName = new Map<string, Object3D[]>();
    asset.scene.traverse(node => { const list = byName.get(node.name) ?? []; list.push(node); byName.set(node.name, list); });
    const nodes = new Map<string, Object3D>();
    for (const binding of manifest.nodes) {
      const matches = byName.get(binding.name);
      if (matches?.length !== 1) throw new SpatialAssetError('INVALID_SPATIAL_ASSET', `Missing or ambiguous node: ${binding.name}`);
      const node = matches[0];
      let mesh = false;
      node.traverse(child => { if (child instanceof Mesh && child.geometry.getAttribute('position')?.count) mesh = true; });
      if (binding.kind === 'target' && !mesh) throw new SpatialAssetError('INVALID_SPATIAL_ASSET', `Target has no geometry: ${binding.name}`);
      if (binding.kind === 'socket' && (node.children.length || node instanceof Mesh)) throw new SpatialAssetError('INVALID_SPATIAL_ASSET', `Socket is not empty: ${binding.name}`);
      nodes.set(binding.name, node);
    }
    const clips = new Map<string, AnimationClip>();
    for (const name of manifest.clips) {
      const matches = asset.animations.filter(clip => clip.name === name);
      if (matches.length !== 1 || !Number.isFinite(matches[0].duration) || matches[0].duration <= 0 || !matches[0].tracks.length) throw new SpatialAssetError('INVALID_SPATIAL_ASSET', `Missing or invalid clip: ${name}`);
      clips.set(name, matches[0]);
    }
    const pivot = new Group(); pivot.name = 'spatial-placement'; pivot.add(asset.scene);
    let disposed = false;
    return { pivot, nodes, clips, dispose: () => { if (disposed) return; disposed = true; pivot.removeFromParent(); pivot.clear(); disposeSpatialScenes(roots); } };
  } catch (error) { disposeSpatialScenes(roots); throw error; }
}
