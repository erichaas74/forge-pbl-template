import { BufferAttribute, EquirectangularReflectionMapping, Mesh, MeshStandardMaterial, RepeatWrapping, SRGBColorSpace, TextureLoader, type Scene } from 'three';
import type { MountedSpatialAsset } from './spatial-asset';
import type { SpatialInspectionDefinition } from './spatial-inspection.definition';

/** Owns both image textures, restoring original material maps before GLB disposal. */
export async function installSpatialEnvironment(scene: Scene, mounted: MountedSpatialAsset, config: NonNullable<SpatialInspectionDefinition['environment']>, signal: AbortSignal): Promise<() => void> {
  const loader = new TextureLoader();
  const results = await Promise.allSettled([loader.loadAsync(config.background), loader.loadAsync(config.ground)]);
  if (signal.aborted || results.some(r => r.status === 'rejected')) {
    for (const result of results) if (result.status === 'fulfilled') result.value.dispose();
    throw new Error('SPATIAL_ENVIRONMENT_LOAD_FAILED');
  }
  const background = (results[0] as PromiseFulfilledResult<import('three').Texture>).value;
  const ground = (results[1] as PromiseFulfilledResult<import('three').Texture>).value;
  background.colorSpace = SRGBColorSpace; background.mapping = EquirectangularReflectionMapping;
  ground.colorSpace = SRGBColorSpace; ground.wrapS = ground.wrapT = RepeatWrapping; ground.anisotropy = 4;
  const root = mounted.nodes.get(config.groundNode);
  if (!root) { background.dispose(); ground.dispose(); throw new Error('SPATIAL_GROUND_MISSING'); }
  let assigned = false;
  const originals = new Map<MeshStandardMaterial, {map: MeshStandardMaterial['map']; color: import('three').Color}>();
  root.traverse(node => {
    if (!(node instanceof Mesh)) return;
    // Planar UVs retain metre-scale detail even when an exported ground mesh has no UVs.
    const positions = node.geometry.getAttribute('position'), uv = new Float32Array(positions.count * 2);
    for (let i=0;i<positions.count;i++) { uv[i*2]=positions.getX(i)/config.tileSize; uv[i*2+1]=positions.getZ(i)/config.tileSize; }
    node.geometry.setAttribute('uv',new BufferAttribute(uv,2));
    for (const material of Array.isArray(node.material) ? node.material : [node.material]) if (material instanceof MeshStandardMaterial) { if(!originals.has(material))originals.set(material,{map:material.map,color:material.color.clone()}); material.color.set(0xffffff); material.map=ground; material.needsUpdate=true; assigned=true; }
  });
  if (!assigned) { background.dispose(); ground.dispose(); throw new Error('SPATIAL_GROUND_MATERIAL_MISSING'); }
  scene.background=background; scene.fog=null;
  let disposed=false;
  return () => { if(disposed)return;disposed=true;scene.background=null;for(const [material,original]of originals){material.map=original.map;material.color.copy(original.color);material.needsUpdate=true;}background.dispose();ground.dispose(); };
}
