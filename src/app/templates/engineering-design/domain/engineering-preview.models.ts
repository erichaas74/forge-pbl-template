import {
  isBlockDesign,
  isDesignCapture,
  type BlockDesign,
  type DesignCapture,
} from '../../../shared/engineering/block-design';

/**
 * Level challenge data owned by the installed simulation. The template only bounds its identity
 * and size; the simulation validates its meaning before use.
 */
export interface EngineeringSessionQuest {
  readonly id: string;
  readonly title: string;
  readonly [key: string]: unknown;
}
export interface EngineeringQuestResult {
  readonly completedAt: string;
}
export interface EngineeringPreviewSession {
  readonly title: string;
  readonly instruction: string;
  readonly activity: string;
  readonly settings: Readonly<Record<string, string | number>>;
  readonly quest?: EngineeringSessionQuest;
}
export interface EngineeringPreviewWeek {
  readonly id: string;
  readonly title: string;
  readonly buildType: string;
  readonly starter: BlockDesign;
  readonly sessions: readonly [EngineeringPreviewSession, EngineeringPreviewSession];
  readonly products: readonly string[];
  readonly questions: readonly string[];
  readonly evidence: readonly string[];
  readonly controls: readonly string[];
}
export interface EngineeringPreviewDraft {
  readonly design: BlockDesign;
  readonly trials: readonly DesignCapture[];
  /** Completed level challenges keyed by quest id. */
  readonly quests?: Readonly<Record<string, EngineeringQuestResult>>;
}
const record = (v: unknown): v is Record<string, unknown> =>
  !!v && typeof v === 'object' && !Array.isArray(v);
const text = (v: unknown): v is string => typeof v === 'string' && !!v.trim() && v.length <= 2000;
const questId = (v: unknown): v is string => typeof v === 'string' && /^[a-z0-9-]{1,60}$/.test(v);

/** Bounds simulation-owned level data: plain JSON, a stable id and a short title. */
export function isEngineeringSessionQuest(v: unknown): v is EngineeringSessionQuest {
  if (!record(v) || !questId(v['id'])) return false;
  const title = v['title'];
  if (!text(title) || title.length > 80) return false;
  try {
    const json = JSON.stringify(v);
    return json.length <= 12000 && JSON.stringify(JSON.parse(json)) === json;
  } catch {
    return false;
  }
}
export function isEngineeringPreviewWeeks(v: unknown): v is readonly EngineeringPreviewWeek[] {
  return (
    Array.isArray(v) &&
    v.length === 4 &&
    v.every(
      (w) =>
        record(w) &&
        ['id', 'title', 'buildType'].every((k) => text(w[k])) &&
        isBlockDesign(w['starter']) &&
        ['products', 'questions', 'evidence', 'controls'].every(
          (k) => Array.isArray(w[k]) && w[k].length > 0 && w[k].length <= 12 && w[k].every(text),
        ) &&
        Array.isArray(w['sessions']) &&
        w['sessions'].length === 2 &&
        w['sessions'].every(
          (s) =>
            record(s) &&
            ['title', 'instruction', 'activity'].every((k) => text(s[k])) &&
            record(s['settings']) &&
            Object.keys(s['settings']).length <= 8 &&
            Object.values(s['settings']).every(
              (v) => text(v) || (typeof v === 'number' && Number.isFinite(v)),
            ) &&
            (s['quest'] === undefined || isEngineeringSessionQuest(s['quest'])),
        ),
    ) &&
    new Set(v.map((w) => w.id)).size === 4 &&
    new Set(v.map((w) => w.buildType)).size === 4 &&
    (() => {
      const ids = v.flatMap((w) =>
        w.sessions.flatMap((s: EngineeringPreviewSession) => (s.quest ? [s.quest.id] : [])),
      );
      return new Set(ids).size === ids.length;
    })()
  );
}
export function isEngineeringPreviewDrafts(
  v: unknown,
): v is Readonly<Record<string, EngineeringPreviewDraft>> {
  return (
    record(v) &&
    Object.keys(v).length <= 4 &&
    Object.entries(v).every(
      ([id, d]) =>
        text(id) &&
        record(d) &&
        isBlockDesign(d['design']) &&
        Array.isArray(d['trials']) &&
        d['trials'].length <= 40 &&
        d['trials'].every(isDesignCapture) &&
        (d['quests'] === undefined ||
          (record(d['quests']) &&
            Object.keys(d['quests']).length <= 16 &&
            Object.entries(d['quests']).every(
              ([key, result]) =>
                questId(key) &&
                record(result) &&
                Object.keys(result).length === 1 &&
                text(result['completedAt']),
            ))),
    )
  );
}
