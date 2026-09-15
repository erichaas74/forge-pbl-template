import { validateInquiryExamples, type InquiryExample } from './inquiry-example.models';
/** Shared inquiry-portfolio capability. Curriculum never contains learner state. */
export interface InquiryTarget {
  readonly id: string;
  readonly standardId: string;
  readonly requiresPerformanceEvidence?: boolean;
  readonly label: string;
  readonly prompt: string;
  readonly sourceIds: readonly string[];
}

export interface InquiryLesson {
  readonly number: number;
  readonly title: string;
  readonly task: string;
  readonly sourceIds: readonly string[];
  readonly targetIds: readonly string[];
  readonly fields: readonly { id: string; label: string; prompt: string }[];
  readonly check: string;
  readonly retry: string;
  readonly help: string;
  readonly sideQuest: string;
  readonly teacher: string;
  readonly tutor: string;
  readonly workload: string;
  readonly requiresGate?: string;
}

export interface InquiryConfig {
  readonly examples?: readonly InquiryExample[];
  readonly capabilityId: 'debate.inquiry-portfolio' | 'learning.inquiry-portfolio';
  readonly version: '1.0';
  readonly introduction: string;
  readonly artworkCaption: string;
  readonly recordSummary?: string;
  readonly finalActionLabel?: string;
  readonly finalActionNote?: string;
  readonly studioFromLesson?: number;
  readonly hearingGateId: string;
  readonly targets: readonly InquiryTarget[];
  readonly lessons: readonly InquiryLesson[];
  readonly gates: readonly {
    id: string;
    label: string;
    afterLesson: number;
    criteria: string;
  }[];
}

export interface InquiryAttempt {
  readonly evidenceDrafts?: Readonly<Record<string, string>>;
  readonly id: string;
  readonly lesson: number;
  readonly prompt: string;
  readonly response: string;
  readonly mode: 'independent';
  readonly createdAt: string;
  readonly targetId?: string;
}

export interface InquiryReview {
  readonly attemptId: string;
  readonly decision: 'ready' | 'revise';
  readonly feedback: string;
  readonly reviewerId: string;
  readonly createdAt: string;
  /** Local demonstration reviews cannot become official mastery. */
  readonly authority: 'demo';
  readonly performanceEvidence?: string;
}

export interface InquiryState {
  readonly drafts: Readonly<Record<string, string>>;
  readonly attempts: readonly InquiryAttempt[];
  readonly reviews: Readonly<Record<string, InquiryReview>>;
  readonly reviewHistory?: readonly InquiryReview[];
}

export const emptyInquiryState = (): InquiryState => ({
  drafts: {},
  attempts: [],
  reviews: {},
});

export function latestInquiryAttempt(
  state: InquiryState,
  lesson: number,
  targetId?: string,
): InquiryAttempt | undefined {
  return [...state.attempts].reverse().find((a) => a.lesson === lesson && a.targetId === targetId);
}

export function inquiryGateReady(
  config: InquiryConfig,
  state: InquiryState,
  gateId: string,
): boolean {
  const gate = config.gates.find((g) => g.id === gateId);
  if (!gate) return false;
  const lesson = config.lessons.find((l) => l.number === gate.afterLesson);
  if (lesson?.requiresGate && !inquiryGateReady(config, state, lesson.requiresGate)) return false;
  const attempt = latestInquiryAttempt(state, gate.afterLesson);
  if (
    attempt?.evidenceDrafts &&
    lesson?.fields.some((field) => {
      const key = `lesson-${lesson.number}-${field.id}`;
      return (state.drafts[key] ?? '') !== (attempt.evidenceDrafts![key] ?? '');
    })
  )
    return false;
  return !!attempt && state.reviews[attempt.id]?.decision === 'ready';
}

export function inquiryTargetReady(state: InquiryState, targetId: string): boolean {
  const attempt = [...state.attempts].reverse().find((a) => a.targetId === targetId);
  return !!attempt && state.reviews[attempt.id]?.decision === 'ready';
}

export function validateInquiry(config: InquiryConfig, evidenceIds: readonly string[]): void {
  if (config.examples) validateInquiryExamples(config.examples, evidenceIds);
  const fail = (message: string): never => {
    throw new Error(`DEBATE_INQUIRY_INVALID: ${message}`);
  };
  if (
    !['debate.inquiry-portfolio', 'learning.inquiry-portfolio'].includes(config.capabilityId) ||
    config.version !== '1.0'
  )
    fail('Unsupported capability version.');
  if (config.lessons.length !== 8 || !config.targets.length)
    fail('Eight lessons and learning targets are required.');
  if (
    config.studioFromLesson !== undefined &&
    (!Number.isInteger(config.studioFromLesson) ||
      config.studioFromLesson < 1 ||
      config.studioFromLesson > 8)
  )
    fail('Invalid final workspace entry lesson.');
  const unique = (ids: readonly string[]) =>
    new Set(ids).size === ids.length && ids.every((id) => /^[a-z0-9][a-z0-9-]*$/.test(id));
  if (!unique(config.targets.map((t) => t.id)) || !unique(config.gates.map((g) => g.id)))
    fail('Duplicate or invalid IDs.');
  if (!config.gates.some((g) => g.id === config.hearingGateId)) fail('Unknown hearing gate.');
  for (const target of config.targets) {
    if (!target.label.trim() || !target.prompt.trim() || !target.standardId.trim())
      fail('Incomplete target.');
    if (!target.sourceIds.length || target.sourceIds.some((id) => !evidenceIds.includes(id)))
      fail('Unknown target source.');
  }
  for (const [i, lesson] of config.lessons.entries()) {
    if (lesson.number !== i + 1 || !lesson.fields.length || !unique(lesson.fields.map((f) => f.id)))
      fail('Invalid lesson sequence or fields.');
    if (
      lesson.sourceIds.some((id) => !evidenceIds.includes(id)) ||
      lesson.targetIds.some((id) => !config.targets.some((t) => t.id === id))
    )
      fail('Unknown lesson reference.');
    if (lesson.requiresGate) {
      const gate = config.gates.find((g) => g.id === lesson.requiresGate);
      if (!gate || gate.afterLesson >= lesson.number)
        fail('Gate must reference an earlier lesson.');
    }
    if (
      [
        lesson.title,
        lesson.task,
        lesson.check,
        lesson.retry,
        lesson.help,
        lesson.sideQuest,
        lesson.teacher,
        lesson.tutor,
        lesson.workload,
        ...lesson.fields.flatMap((f) => [f.label, f.prompt]),
      ].some((v) => !v?.trim())
    )
      fail('Empty lesson content.');
  }
  for (const gate of config.gates) {
    if (
      !Number.isInteger(gate.afterLesson) ||
      gate.afterLesson < 1 ||
      gate.afterLesson > 7 ||
      !gate.criteria.trim()
    )
      fail('Invalid gate.');
  }
}

/** Validate private saved work before any renderer or checkpoint consumes it. */
export function isInquiryState(value: unknown): value is InquiryState {
  const obj = (v: unknown): v is Record<string, unknown> =>
    !!v && typeof v === 'object' && !Array.isArray(v);
  const texts = (v: Record<string, unknown>, keys: string[]) =>
    keys.every((k) => typeof v[k] === 'string');
  if (
    !obj(value) ||
    !obj(value['drafts']) ||
    !Object.values(value['drafts']).every((v) => typeof v === 'string') ||
    !Array.isArray(value['attempts']) ||
    !obj(value['reviews'])
  )
    return false;
  const ids = new Set<string>();
  for (const a of value['attempts']) {
    if (
      !obj(a) ||
      !texts(a, ['id', 'prompt', 'response', 'createdAt']) ||
      a['mode'] !== 'independent' ||
      !Number.isInteger(a['lesson']) ||
      Number(a['lesson']) < 1 ||
      Number(a['lesson']) > 8 ||
      (a['targetId'] !== undefined && typeof a['targetId'] !== 'string') ||
      ids.has(String(a['id']))
    )
      return false;
    if (
      a['evidenceDrafts'] !== undefined &&
      (!obj(a['evidenceDrafts']) ||
        !Object.values(a['evidenceDrafts']).every((v) => typeof v === 'string'))
    )
      return false;
    ids.add(String(a['id']));
  }
  const review = (r: unknown) =>
    obj(r) &&
    texts(r, ['attemptId', 'feedback', 'reviewerId', 'createdAt']) &&
    ids.has(String(r['attemptId'])) &&
    ['ready', 'revise'].includes(String(r['decision'])) &&
    r['authority'] === 'demo' &&
    (r['performanceEvidence'] === undefined || typeof r['performanceEvidence'] === 'string');
  return (
    Object.entries(value['reviews']).every(
      ([id, r]) => review(r) && (r as Record<string, unknown>)['attemptId'] === id,
    ) &&
    (value['reviewHistory'] === undefined ||
      (Array.isArray(value['reviewHistory']) && value['reviewHistory'].every(review)))
  );
}
