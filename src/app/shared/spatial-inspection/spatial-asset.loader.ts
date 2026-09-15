import type { ImportedSpatialAsset, MountedSpatialAsset } from './spatial-asset';
import { disposeSpatialScenes, mountSpatialAsset } from './spatial-asset';
import { requireSpatialManifest, SpatialAssetError } from './spatial-asset.contract';

export interface SpatialAssetTransport { load(src: string): Promise<ImportedSpatialAsset> }
/** Lazy import keeps GLTFLoader out of unrelated activity bundles. Uncompressed GLB v1. */
const gltfTransport: SpatialAssetTransport = {
  async load(src) { const { GLTFLoader } = await import('three/addons/loaders/GLTFLoader.js'); return new GLTFLoader().loadAsync(src); },
};
export async function loadSpatialAsset(value: unknown, signal?: AbortSignal, transport: SpatialAssetTransport = gltfTransport): Promise<MountedSpatialAsset> {
  const manifest = requireSpatialManifest(value);
  const aborted = () => new SpatialAssetError('SPATIAL_LOAD_ABORTED', 'The requesting scene was closed.');
  if (signal?.aborted) throw aborted();
  let asset: ImportedSpatialAsset;
  try { asset = await transport.load(manifest.src); }
  catch { if (signal?.aborted) throw aborted(); throw new SpatialAssetError('SPATIAL_LOAD_FAILED', manifest.src); }
  if (signal?.aborted) { disposeSpatialScenes([...new Set([asset.scene, ...asset.scenes])]); throw aborted(); }
  return mountSpatialAsset(asset, manifest);
}
