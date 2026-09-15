import { requireGalleryMission } from '../gallery/domain/gallery.validation';
import { requireRestorations } from '../../../shared/restoration/restoration.validation';
import type { RestorationMission } from './restoration-collection.models';
import { requireRestorationPreview } from './weekly/restoration-preview.validation';
export function requireRestorationMission(value: unknown): RestorationMission {
  const fail = (message: string): never => { throw new Error(`INVALID_RESTORATION_COLLECTION: ${message}`); };
  if (!value || typeof value !== 'object' || Array.isArray(value)) fail('mission');
  const m = value as Record<string, unknown>, template = m['template'] as Record<string, unknown> | undefined;
  if (m['schemaVersion'] !== '1.0' || m['experience'] !== 'restoration' || template?.['id'] !== 'heist' || template?.['version'] !== '1.0') fail('schema/template');
  for (const k of ['projectId', 'projectVersion', 'title', 'subtitle', 'briefing', 'heistBriefing']) if (typeof m[k] !== 'string' || !m[k].trim() || m[k].length > 5000) fail(k);
  const gallery = requireGalleryMission(m['sourceGallery']);
  if (m['projectId'] !== gallery.projectId) fail('source collection identity');
  requireRestorations(m['works'], new Set(gallery.evidence.map(e => e.id)));
  const mission = value as RestorationMission, seen = new Set<string>();
  for (const work of mission.works) {
    const chamber = gallery.chambers.find(c => c.id === work.chamberId), painting = chamber?.paintings.find(p => p.id === work.paintingId && !p.authentic);
    if (!painting || seen.has(work.paintingId)) fail('commission painting reference'); seen.add(work.paintingId);
    if (work.encounterId && !gallery.encounters?.some(e => e.id === work.encounterId && e.chamberIds.includes(work.chamberId))) fail('encounter reference');
  }
  if (!Array.isArray(mission.finalLockIds) || !mission.finalLockIds.length || mission.finalLockIds.length > 10 || new Set(mission.finalLockIds).size !== mission.finalLockIds.length || mission.finalLockIds.some(id => !gallery.locks.some(l => l.id === id))) fail('final locks');
  if (mission.previewWeeks !== undefined) requireRestorationPreview(mission.previewWeeks, mission);
  return mission;
}
