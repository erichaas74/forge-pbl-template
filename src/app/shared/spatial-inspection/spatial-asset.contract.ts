/** Versioned asset boundary. No project content or student state belongs here. */
export interface SpatialAssetManifest {
  readonly version: 1;
  readonly src: string;
  readonly nodes: readonly { readonly name: string; readonly kind: 'environment' | 'target' | 'rig' | 'socket' }[];
  readonly clips: readonly string[];
}
export class SpatialAssetError extends Error {
  constructor(readonly code: 'INVALID_SPATIAL_MANIFEST' | 'INVALID_SPATIAL_ASSET' | 'SPATIAL_LOAD_FAILED' | 'SPATIAL_LOAD_ABORTED', detail: string) { super(`${code}: ${detail}`); }
}
const prefixes = { environment: 'ENV_', target: 'INT_', rig: 'RIG_', socket: 'SOCKET_' } as const;
export function requireSpatialManifest(value: unknown): SpatialAssetManifest {
  const invalid = (): never => { throw new SpatialAssetError('INVALID_SPATIAL_MANIFEST', 'Expected a local GLB and unique semantic bindings.'); };
  if (!value || typeof value !== 'object') return invalid();
  const m = value as SpatialAssetManifest;
  // No traversal, external requests, encoded separators, query strings or decoder URLs.
  if (m.version !== 1 || typeof m.src !== 'string' || !/^\/projects\/(?:[a-zA-Z0-9_-]+\/)+[a-zA-Z0-9_-]+\.glb$/.test(m.src)) return invalid();
  if (!Array.isArray(m.nodes) || !m.nodes.length || m.nodes.length > 128 || !Array.isArray(m.clips) || m.clips.length > 32) return invalid();
  const names = new Set<string>();
  for (const node of m.nodes) {
    if (!node || !Object.hasOwn(prefixes, node.kind) || typeof node.name !== 'string' || !/^[A-Z]+_[a-zA-Z0-9_]{1,80}$/.test(node.name) || !node.name.startsWith(prefixes[node.kind as keyof typeof prefixes]) || names.has(node.name)) return invalid();
    names.add(node.name);
  }
  if (m.clips.some(c => typeof c !== 'string' || !/^[a-zA-Z0-9_-]{1,80}$/.test(c)) || new Set(m.clips).size !== m.clips.length) return invalid();
  return { version: 1, src: m.src, nodes: m.nodes.map(n => ({ name: n.name, kind: n.kind })), clips: [...m.clips] };
}
