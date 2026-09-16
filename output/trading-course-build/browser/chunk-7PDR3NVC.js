// src/app/shared/spatial-inspection/spatial-asset.contract.ts
var SpatialAssetError = class extends Error {
  constructor(code, detail) {
    super(`${code}: ${detail}`);
    this.code = code;
  }
  code;
};
var prefixes = { environment: "ENV_", target: "INT_", rig: "RIG_", socket: "SOCKET_" };
function requireSpatialManifest(value) {
  const invalid = () => {
    throw new SpatialAssetError("INVALID_SPATIAL_MANIFEST", "Expected a local GLB and unique semantic bindings.");
  };
  if (!value || typeof value !== "object") return invalid();
  const m = value;
  if (m.version !== 1 || typeof m.src !== "string" || !/^\/projects\/(?:[a-zA-Z0-9_-]+\/)+[a-zA-Z0-9_-]+\.glb$/.test(m.src)) return invalid();
  if (!Array.isArray(m.nodes) || !m.nodes.length || m.nodes.length > 128 || !Array.isArray(m.clips) || m.clips.length > 32) return invalid();
  const names = /* @__PURE__ */ new Set();
  for (const node of m.nodes) {
    if (!node || !Object.hasOwn(prefixes, node.kind) || typeof node.name !== "string" || !/^[A-Z]+_[a-zA-Z0-9_]{1,80}$/.test(node.name) || !node.name.startsWith(prefixes[node.kind]) || names.has(node.name)) return invalid();
    names.add(node.name);
  }
  if (m.clips.some((c) => typeof c !== "string" || !/^[a-zA-Z0-9_-]{1,80}$/.test(c)) || new Set(m.clips).size !== m.clips.length) return invalid();
  return { version: 1, src: m.src, nodes: m.nodes.map((n) => ({ name: n.name, kind: n.kind })), clips: [...m.clips] };
}

export {
  SpatialAssetError,
  requireSpatialManifest
};
//# debugId=b475d970-231c-5d40-8fa3-061fc82cbe5f
//# sourceMappingURL=chunk-7PDR3NVC.js.map
