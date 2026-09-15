/** A versioned teaching sequence, separate from activity state and assessed mastery. */
export interface ProjectLesson {
  readonly number: number;
  readonly title: string;
  readonly output: string;
  readonly workspace: string;
  readonly checkpoint: string;
  readonly criteria: readonly string[];
  /** Optional native workspace key, interpreted by the owning activity. */
  readonly focusTarget?: string;
}

export interface ProjectLessonPlan {
  /** Opt-in compact shared shell; curriculum status is explicit and versioned. */
  readonly presentation?: {
    readonly layout: 'activity-first';
    readonly title: string;
    readonly identifier: string;
    readonly grade: string;
    readonly alignmentStatus: 'pending';
    readonly alignmentNote: string;
  };
  readonly schemaVersion: '1.0';
  readonly planVersion: string;
  readonly projectId: string;
  readonly projectVersion: string;
  readonly finalProduct: string;
  readonly grouping: string;
  readonly availability: string;
  readonly workspaceView?: string;
  readonly evidenceCriteria: readonly string[];
  readonly lessons: readonly ProjectLesson[];
}

export const lessonStages = [
  {
    label: 'Launch',
    week: 1,
    format: 'Live + individual',
    task: 'Watch the teacher model the first skill, then make your own attempt.',
    evidence:
      'Keep your initial attempt and your independent response, including any support needed.',
    teacher:
      'Model the core skill and check the prerequisite before the dependent tool or challenge.',
    check: 'Identify the key information and explain one step without hints.',
  },
  {
    label: 'Plan',
    week: 1,
    format: 'Group work',
    task: 'Agree on a manageable plan and name a contribution for every person.',
    evidence: 'Keep the shared plan and a separate explanation from every member.',
    teacher:
      'Check roles and scope. Verify each student’s prerequisite before their dependent task.',
    check: 'Explain your own choice and the evidence behind it. Each member answers independently.',
  },
  {
    label: 'Evidence',
    week: 2,
    format: 'Live + individual',
    task: 'Practice the next method and create one contribution the project can use.',
    evidence: 'Keep your individual artifact and response to a fresh example.',
    teacher: 'Teach the next method and review accuracy before the next committed action.',
    check: 'Apply the method to a fresh example and explain how the evidence supports your answer.',
  },
  {
    label: 'First version',
    week: 2,
    format: 'Group work',
    task: 'Combine contributions and test the first version together.',
    evidence: 'Keep the first product or trial and each person’s separate checkpoint response.',
    teacher:
      'Verify the calculation, test plan, or source claim before committing the next action.',
    check: 'Explain a result or decision, then respond when one condition changes.',
  },
  {
    label: 'Revise',
    week: 3,
    format: 'Live + individual',
    task: 'Use feedback to revise one contribution and explain what changed.',
    evidence: 'Keep the earlier work, the revision, and an independent recheck.',
    teacher: 'Reteach the weak concept. Resolve critical evidence gaps with a fresh recheck.',
    check: 'Explain the correction, then apply the skill to a new question without hints.',
  },
  {
    label: 'Rehearse',
    week: 3,
    format: 'Group work',
    task: 'Rehearse or playtest, use feedback, and improve the near-final work.',
    evidence: 'Keep the near-final version, feedback, and each member’s defense of a change.',
    teacher:
      'Check that every member uses feedback and contributes. Recheck critical gaps before final rehearsal.',
    check: 'Defend a change using test or peer evidence. Consider a counterexample or limitation.',
  },
  {
    label: 'Defend',
    week: 4,
    format: 'Live + individual',
    task: 'Complete a short transfer task and select evidence for your final defense.',
    evidence:
      'Keep the individual transfer response, selected proof, and any remaining gap for teacher review.',
    teacher: 'Review open targets and final readiness against every required criterion.',
    check: 'Use a new case to show independent reasoning against the target criteria.',
  },
  {
    label: 'Final',
    week: 4,
    format: 'Group showcase',
    task: 'Present the final product or complete the final challenge, then reflect on your contribution.',
    evidence: 'Keep the final product, each person’s defense, and an individual reflection.',
    teacher: 'Review the product and every student’s defense before confirming standards.',
    check:
      'Answer a personal defense question about your work. Teacher review confirms the learning.',
  },
] as const;

export function lessonNumber(value: string | null): number {
  return value !== null && /^[1-8]$/.test(value) ? Number(value) : 1;
}

export function validateLessonPlan(value: unknown): ProjectLessonPlan {
  const fail = (): never => {
    throw new Error('LESSON_PLAN_INVALID: Expected a versioned plan with eight ordered lessons.');
  };
  const record = (item: unknown): item is Record<string, unknown> =>
    typeof item === 'object' && item !== null && !Array.isArray(item);
  const text = (item: unknown): item is string =>
    typeof item === 'string' && item.trim().length > 0;
  if (!record(value) || value['schemaVersion'] !== '1.0') return fail();
  for (const field of [
    'projectId',
    'projectVersion',
    'planVersion',
    'finalProduct',
    'grouping',
    'availability',
  ]) {
    if (!text(value[field])) return fail();
  }
  if (!/^[a-z0-9][a-z0-9-]*$/.test(String(value['projectId']))) return fail();
  for (const field of ['projectVersion', 'planVersion']) {
    if (!/^\d+\.\d+\.\d+$/.test(String(value[field]))) return fail();
  }
  if (
    value['workspaceView'] !== undefined &&
    !['experience', 'activity'].includes(String(value['workspaceView']))
  )
    return fail();
  if (value['presentation'] !== undefined) {
    const p = value['presentation'];
    if (!record(p) || p['layout'] !== 'activity-first' || p['alignmentStatus'] !== 'pending' ||
      !['title', 'identifier', 'grade', 'alignmentNote'].every(key => text(p[key]))) return fail();
  }
  if (
    !Array.isArray(value['evidenceCriteria']) ||
    value['evidenceCriteria'].length === 0 ||
    !value['evidenceCriteria'].every(text)
  )
    return fail();
  if (!Array.isArray(value['lessons']) || value['lessons'].length !== 8) return fail();
  for (const [index, item] of value['lessons'].entries()) {
    if (!record(item) || item['number'] !== index + 1) return fail();
    if (!['title', 'output', 'workspace', 'checkpoint'].every((field) => text(item[field])))
      return fail();
    if (
      item['focusTarget'] !== undefined &&
      (!text(item['focusTarget']) || !/^[a-z][a-z0-9-]*$/.test(item['focusTarget']))
    )
      return fail();
    if (
      !Array.isArray(item['criteria']) ||
      item['criteria'].length < 1 ||
      item['criteria'].length > 2 ||
      !item['criteria'].every(text)
    )
      return fail();
  }
  return value as unknown as ProjectLessonPlan;
}
