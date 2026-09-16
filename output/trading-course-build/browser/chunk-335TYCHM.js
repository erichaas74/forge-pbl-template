import {
  SpatialAssetError,
  requireSpatialManifest
} from "./chunk-7PDR3NVC.js";
import {
  Group,
  Mesh,
  SkinnedMesh,
  Texture
} from "./chunk-E3MFW572.js";
import "./chunk-GOMI4DH3.js";

// src/app/shared/spatial-inspection/spatial-asset.ts
function disposeSpatialScenes(scenes) {
  const geometries = /* @__PURE__ */ new Set(), materials = /* @__PURE__ */ new Set(), textures = /* @__PURE__ */ new Set(), skeletons = /* @__PURE__ */ new Set();
  for (const root of scenes) root.traverse((node) => {
    if (node instanceof Mesh) {
      geometries.add(node.geometry);
      for (const material of Array.isArray(node.material) ? node.material : [node.material]) materials.add(material);
    }
    if (node instanceof SkinnedMesh) skeletons.add(node.skeleton);
  });
  for (const material of materials) for (const value of Object.values(material)) if (value instanceof Texture) textures.add(value);
  for (const skeleton of skeletons) {
    if (skeleton.boneTexture) textures.delete(skeleton.boneTexture);
    skeleton.dispose();
  }
  const bitmaps = /* @__PURE__ */ new Set();
  for (const texture of textures) {
    const images = Array.isArray(texture.source.data) ? texture.source.data : [texture.source.data];
    for (const image of images) if (typeof ImageBitmap !== "undefined" && image instanceof ImageBitmap) bitmaps.add(image);
    texture.dispose();
  }
  for (const bitmap of bitmaps) bitmap.close();
  for (const material of materials) material.dispose();
  for (const geometry of geometries) geometry.dispose();
}
function mountSpatialAsset(asset, manifest) {
  const roots = [.../* @__PURE__ */ new Set([asset.scene, ...asset.scenes])];
  try {
    const byName = /* @__PURE__ */ new Map();
    asset.scene.traverse((node) => {
      const list = byName.get(node.name) ?? [];
      list.push(node);
      byName.set(node.name, list);
    });
    const nodes = /* @__PURE__ */ new Map();
    for (const binding of manifest.nodes) {
      const matches = byName.get(binding.name);
      if (matches?.length !== 1) throw new SpatialAssetError("INVALID_SPATIAL_ASSET", `Missing or ambiguous node: ${binding.name}`);
      const node = matches[0];
      let mesh = false;
      node.traverse((child) => {
        if (child instanceof Mesh && child.geometry.getAttribute("position")?.count) mesh = true;
      });
      if (binding.kind === "target" && !mesh) throw new SpatialAssetError("INVALID_SPATIAL_ASSET", `Target has no geometry: ${binding.name}`);
      if (binding.kind === "socket" && (node.children.length || node instanceof Mesh)) throw new SpatialAssetError("INVALID_SPATIAL_ASSET", `Socket is not empty: ${binding.name}`);
      nodes.set(binding.name, node);
    }
    const clips = /* @__PURE__ */ new Map();
    for (const name of manifest.clips) {
      const matches = asset.animations.filter((clip) => clip.name === name);
      if (matches.length !== 1 || !Number.isFinite(matches[0].duration) || matches[0].duration <= 0 || !matches[0].tracks.length) throw new SpatialAssetError("INVALID_SPATIAL_ASSET", `Missing or invalid clip: ${name}`);
      clips.set(name, matches[0]);
    }
    const pivot = new Group();
    pivot.name = "spatial-placement";
    pivot.add(asset.scene);
    let disposed = false;
    return { pivot, nodes, clips, dispose: () => {
      if (disposed) return;
      disposed = true;
      pivot.removeFromParent();
      pivot.clear();
      disposeSpatialScenes(roots);
    } };
  } catch (error) {
    disposeSpatialScenes(roots);
    throw error;
  }
}

// src/app/shared/spatial-inspection/spatial-asset.loader.ts
var gltfTransport = {
  async load(src) {
    const { GLTFLoader } = await import("./chunk-OJB4UQAG.js");
    return new GLTFLoader().loadAsync(src);
  }
};
async function loadSpatialAsset(value, signal, transport = gltfTransport) {
  const manifest = requireSpatialManifest(value);
  const aborted = () => new SpatialAssetError("SPATIAL_LOAD_ABORTED", "The requesting scene was closed.");
  if (signal?.aborted) throw aborted();
  let asset;
  try {
    asset = await transport.load(manifest.src);
  } catch {
    if (signal?.aborted) throw aborted();
    throw new SpatialAssetError("SPATIAL_LOAD_FAILED", manifest.src);
  }
  if (signal?.aborted) {
    disposeSpatialScenes([.../* @__PURE__ */ new Set([asset.scene, ...asset.scenes])]);
    throw aborted();
  }
  return mountSpatialAsset(asset, manifest);
}
export {
  loadSpatialAsset
};
//# debugId=b058fa0f-103e-5663-aa5d-31ac1249a2c8
//# sourceMappingURL=chunk-335TYCHM.js.map
