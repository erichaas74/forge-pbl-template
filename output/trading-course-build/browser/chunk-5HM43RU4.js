import {
  BufferAttribute,
  EquirectangularReflectionMapping,
  Mesh,
  MeshStandardMaterial,
  RepeatWrapping,
  SRGBColorSpace,
  TextureLoader
} from "./chunk-E3MFW572.js";
import "./chunk-GOMI4DH3.js";

// src/app/shared/spatial-inspection/spatial-environment.ts
async function installSpatialEnvironment(scene, mounted, config, signal) {
  const loader = new TextureLoader();
  const results = await Promise.allSettled([loader.loadAsync(config.background), loader.loadAsync(config.ground)]);
  if (signal.aborted || results.some((r) => r.status === "rejected")) {
    for (const result of results) if (result.status === "fulfilled") result.value.dispose();
    throw new Error("SPATIAL_ENVIRONMENT_LOAD_FAILED");
  }
  const background = results[0].value;
  const ground = results[1].value;
  background.colorSpace = SRGBColorSpace;
  background.mapping = EquirectangularReflectionMapping;
  ground.colorSpace = SRGBColorSpace;
  ground.wrapS = ground.wrapT = RepeatWrapping;
  ground.anisotropy = 4;
  const root = mounted.nodes.get(config.groundNode);
  if (!root) {
    background.dispose();
    ground.dispose();
    throw new Error("SPATIAL_GROUND_MISSING");
  }
  let assigned = false;
  const originals = /* @__PURE__ */ new Map();
  root.traverse((node) => {
    if (!(node instanceof Mesh)) return;
    const positions = node.geometry.getAttribute("position"), uv = new Float32Array(positions.count * 2);
    for (let i = 0; i < positions.count; i++) {
      uv[i * 2] = positions.getX(i) / config.tileSize;
      uv[i * 2 + 1] = positions.getZ(i) / config.tileSize;
    }
    node.geometry.setAttribute("uv", new BufferAttribute(uv, 2));
    for (const material of Array.isArray(node.material) ? node.material : [node.material]) if (material instanceof MeshStandardMaterial) {
      if (!originals.has(material)) originals.set(material, { map: material.map, color: material.color.clone() });
      material.color.set(16777215);
      material.map = ground;
      material.needsUpdate = true;
      assigned = true;
    }
  });
  if (!assigned) {
    background.dispose();
    ground.dispose();
    throw new Error("SPATIAL_GROUND_MATERIAL_MISSING");
  }
  scene.background = background;
  scene.fog = null;
  let disposed = false;
  return () => {
    if (disposed) return;
    disposed = true;
    scene.background = null;
    for (const [material, original] of originals) {
      material.map = original.map;
      material.color.copy(original.color);
      material.needsUpdate = true;
    }
    background.dispose();
    ground.dispose();
  };
}
export {
  installSpatialEnvironment
};
//# debugId=66253b11-e5cd-50d3-972a-38835ce56da9
//# sourceMappingURL=chunk-5HM43RU4.js.map
