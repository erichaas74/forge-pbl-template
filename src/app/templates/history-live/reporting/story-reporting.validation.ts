import { BOARD_FIELDS, PRESENTATION_FORMATS, REPORTING_STEPS, type StoryReportingState } from './story-reporting.models';
const record = (v: unknown): v is Record<string, unknown> => !!v && typeof v === 'object' && !Array.isArray(v);
const text = (v: unknown): v is string => typeof v === 'string' && v.length <= 6000;
const strings = (v: unknown, max = 100): v is string[] => Array.isArray(v) && v.length <= max && v.every(text);
const format = (v: unknown) => (PRESENTATION_FORMATS as readonly unknown[]).includes(v);
const formats = (v: unknown) => Array.isArray(v) && v.length > 0 && v.length <= 4 && v.every(format) && new Set(v).size === v.length;
/** No partially valid nested notebook is hydrated into the editor. */
export function isStoryReportingSnapshot(v: unknown): v is StoryReportingState {
  if (!record(v) || v['version'] !== '1.0' || !(REPORTING_STEPS as readonly unknown[]).includes(v['step']) ||
    (v['activeStoryId'] !== undefined && !text(v['activeStoryId'])) ||
    (v['allowedFormats'] !== undefined && !formats(v['allowedFormats'])) ||
    !Array.isArray(v['workspaces']) || v['workspaces'].length > 30) return false;
  const ids = new Set<string>();
  for (const w of v['workspaces']) {
    if (!record(w) || !text(w['storyId']) || ids.has(w['storyId']) || !strings(w['asked']) || !strings(w['checks'], 3) ||
      !record(w['noteDrafts']) || Object.keys(w['noteDrafts']).length > 60 || !Object.values(w['noteDrafts']).every(text) ||
      !Array.isArray(w['notes']) || w['notes'].length > 60 || !record(w['board']) || !record(w['presentations']) ||
      (w['format'] !== undefined && !format(w['format']))) return false;
    ids.add(w['storyId']);
    const noteIds = new Set<string>();
    for (const n of w['notes']) {
      if (!record(n) || !['id', 'originId', 'title', 'text', 'originalText'].every(key => text(n[key])) ||
        !['interview', 'scene', 'document'].includes(String(n['kind'])) || !strings(n['sourceIds']) || !strings(n['previous'], 5) || noteIds.has(String(n['id']))) return false;
      noteIds.add(String(n['id']));
    }
    for (const field of BOARD_FIELDS) {
      const b = w['board'][field];
      if (!record(b) || !text(b['text']) || !strings(b['noteIds'], 60) || b['noteIds'].some(id => !noteIds.has(id))) return false;
    }
    for (const [key, draft] of Object.entries(w['presentations'])) {
      if (!format(key) || !record(draft) || !text(draft['title']) || !strings(draft['parts'], 4) || draft['parts'].length !== 4 ||
        (draft['savedRevision'] !== undefined && (!Number.isSafeInteger(draft['savedRevision']) || Number(draft['savedRevision']) < 1))) return false;
    }
    if (w['format'] && !w['presentations'][String(w['format'])]) return false;
  }
  return v['activeStoryId'] === undefined ? v['step'] === 'story' : ids.has(String(v['activeStoryId']));
}
