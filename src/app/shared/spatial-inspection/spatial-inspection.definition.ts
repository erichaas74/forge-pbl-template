import { requireSpatialManifest, type SpatialAssetManifest } from './spatial-asset.contract';
export interface SpatialInspectionDefinition {
  readonly title?: string;
  readonly overviewLabel?: string;
  readonly environment?: { readonly background: string; readonly ground: string; readonly groundNode: string; readonly tileSize: number };
  readonly asset: SpatialAssetManifest;
  readonly targets: readonly { readonly name: string; readonly label: string; readonly focus: readonly [number,number,number]; readonly distance: number }[];
}
export function requireSpatialInspection(value: unknown): SpatialInspectionDefinition {
  const d = value as SpatialInspectionDefinition;
  if (!d || !Array.isArray(d.targets) || !d.targets.length || d.targets.length > 12) throw new Error('INVALID_SPATIAL_INSPECTION');
  for (const label of [d.title,d.overviewLabel]) if (label !== undefined && (typeof label !== 'string' || !label.trim() || label.length > 80)) throw new Error('INVALID_SPATIAL_INSPECTION');
  const asset = requireSpatialManifest(d.asset);
  if (d.environment !== undefined) {
    const e = d.environment, image = (v: unknown) => typeof v === 'string' && /^\/projects\/(?:[a-zA-Z0-9_-]+\/)+[a-zA-Z0-9_-]+\.(png|jpg|webp)$/.test(v);
    if (!e || !image(e.background) || !image(e.ground) || !asset.nodes.some(n => n.name === e.groundNode && n.kind === 'environment') || !Number.isFinite(e.tileSize) || e.tileSize < .25 || e.tileSize > 30) throw new Error('INVALID_SPATIAL_ENVIRONMENT');
  }
  const names = new Set<string>();
  for (const t of d.targets) {
    if (!t || typeof t.label !== 'string' || !t.label.trim() || t.label.length > 80 || !asset.nodes.some(n => n.name === t.name && n.kind === 'target') || names.has(t.name) || !Array.isArray(t.focus) || t.focus.length !== 3 || !t.focus.every((v: unknown) => typeof v === 'number' && Number.isFinite(v) && Math.abs(v) < 100) || !Number.isFinite(t.distance) || t.distance < 1 || t.distance > 20) throw new Error('INVALID_SPATIAL_INSPECTION');
    names.add(t.name);
  }
  return d;
}
