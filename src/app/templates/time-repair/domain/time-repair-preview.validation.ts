import type { TimeRepairConfig } from './time-repair.models';
import type { RepairPreviewConfig, RepairPreviewDraft } from './time-repair-preview.models';

export function validateRepairPreview(
  value: unknown,
  config: TimeRepairConfig,
): asserts value is RepairPreviewConfig {
  const fail = (path: string): never => {
    throw new Error(`INVALID_TIME_REPAIR_PACKAGE: previewWeeks.${path}`);
  };
  const obj = (v: unknown): Record<string, unknown> =>
    v && typeof v === 'object' && !Array.isArray(v)
      ? (v as Record<string, unknown>)
      : fail('object');
  const list = (v: unknown): unknown[] =>
    Array.isArray(v) && v.length > 0 && v.length <= 30 ? v : fail('list');
  const text = (v: unknown): boolean =>
    typeof v === 'string' && v.trim().length > 0 && v.length <= 8000;
  const texts = (v: unknown): void => {
    if (!list(v).every(text)) fail('text');
  };
  const refs = (v: unknown, ids: readonly string[]): void => {
    const items = list(v);
    if (
      new Set(items).size !== items.length ||
      !items.every((id) => typeof id === 'string' && ids.includes(id))
    )
      fail('references');
  };
  const p = obj(value);
  if (p['version'] !== '1.0') fail('version');
  const images = list(p['illustrations']).map(obj);
  for (const i of images) {
    if (!['id', 'title', 'src', 'alt', 'caption'].every((key) => text(i[key])))
      fail('illustration');
    if (!/^\/(?!\/)[a-zA-Z0-9/_-]+\.(png|webp|jpg|svg)$/.test(String(i['src'])))
      fail('local image');
  }
  if (new Set(images.map((i) => i['id'])).size !== images.length) fail('duplicate image');
  const panels = list(p['sampleExhibit']).map(obj);
  for (const panel of panels) {
    if (!['id', 'title', 'caption'].every((key) => text(panel[key]))) fail('panel text');
    if (
      !images.some((i) => i['id'] === panel['imageId']) ||
      !config.evidence.some((e) => e.id === panel['evidenceId'])
    )
      fail('panel reference');
  }
  if (new Set(panels.map((panel) => panel['id'])).size !== panels.length) fail('duplicate panel');
  const weeks = list(p['weeks']).map(obj);
  if (weeks.length !== 4) fail('four weeks required');
  const ids = new Set<string>();
  weeks.forEach((w, index) => {
    if (w['week'] !== index + 1 || !text(w['title'])) fail('week');
    ['questions', 'evidence', 'controls'].forEach((key) => texts(w[key]));
    const sessions = list(w['sessions']).map(obj);
    if (sessions.length !== 2) fail('two sessions required');
    for (const s of sessions) {
      if (!['id', 'title', 'action', 'change', 'check', 'product'].every((key) => text(s[key])))
        fail('session text');
      if (ids.has(String(s['id']))) fail('duplicate session');
      ids.add(String(s['id']));
      if (
        ![
          'inspect',
          'repair',
          'sequence',
          'sources',
          'ripple',
          'compare',
          'exhibit',
          'tour',
        ].includes(String(s['mode']))
      )
        fail('CAPABILITY_NOT_INSTALLED: mode');
      if (!config.missions.some((m) => m.id === s['missionId'])) fail('mission reference');
      if (s['imageId'] !== undefined && !images.some((image) => image['id'] === s['imageId']))
        fail('session image reference');
      refs(
        s['nodeIds'],
        config.nodes.map((n) => n.id),
      );
      refs(
        s['evidenceIds'],
        config.evidence.map((e) => e.id),
      );
    }
  });
}

export function validRepairPreviewDraft(
  value: unknown,
  config: TimeRepairConfig,
  sessionId: string,
): value is RepairPreviewDraft {
  if (!value || typeof value !== 'object') return false;
  const d = value as RepairPreviewDraft;
  const s = config.previewWeeks?.weeks.flatMap((w) => w.sessions).find((s) => s.id === sessionId);
  const m = config.missions.find((m) => m.id === s?.missionId);
  const scene = config.scenes.find((scene) => scene.id === m?.sceneId);
  const unique = (items: unknown): items is string[] =>
    Array.isArray(items) &&
    items.every((i) => typeof i === 'string') &&
    new Set(items).size === items.length;
  const short = (v: unknown): v is string => typeof v === 'string' && v.length <= 8000;
  if (
    !s ||
    !m ||
    !scene ||
    !unique(d.inspectedIds) ||
    !d.inspectedIds.every((id) => scene.hotspots.some((h) => h.id === id))
  )
    return false;
  if (
    !unique(d.nodeIds) ||
    d.nodeIds.length !== s.nodeIds.length ||
    !d.nodeIds.every((id) => s.nodeIds.includes(id))
  )
    return false;
  if (
    !d.links ||
    typeof d.links !== 'object' ||
    Array.isArray(d.links) ||
    !Object.entries(d.links).every(
      ([id, source]) => s.nodeIds.includes(id) && (source === '' || s.evidenceIds.includes(source)),
    )
  )
    return false;
  if (d.optionId !== '' && !m.repair.options.some((o) => o.id === d.optionId)) return false;
  if (
    !Array.isArray(d.trials) ||
    d.trials.length > 30 ||
    !d.trials.every(
      (t) =>
        t &&
        Number.isInteger(t.id) &&
        t.id > 0 &&
        m.repair.options.some((o) => o.id === t.optionId) &&
        t.supported === (t.optionId === m.evaluation.repairOptionId),
    )
  )
    return false;
  const sample = config.previewWeeks!.sampleExhibit;
  return (
    Array.isArray(d.panels) &&
    d.panels.length === sample.length &&
    new Set(d.panels.map((p) => p?.id)).size === sample.length &&
    d.panels.every(
      (p) =>
        p &&
        sample.some((item) => item.id === p.id) &&
        short(p.title) &&
        short(p.caption) &&
        config.previewWeeks!.illustrations.some((i) => i.id === p.imageId) &&
        (p.evidenceId === '' || config.evidence.some((e) => e.id === p.evidenceId)),
    )
  );
}
