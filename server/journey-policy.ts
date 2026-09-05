export interface JourneyRecordShape {
  readonly studentId: string;
  readonly voyageId: string;
  readonly projectId: string;
  readonly projectVersion: string;
  readonly completedSteps: readonly {
    readonly stepId: string;
    readonly choiceId: string;
    readonly masteryResults?: readonly { readonly masteryTag?: string }[];
    readonly studentResponse?: { readonly text?: string; readonly transcript?: string };
    readonly consequence?: string;
  }[];
  readonly route: readonly {
    readonly latitude: number;
    readonly longitude: number;
    readonly locationId?: string;
    readonly eventId?: string;
  }[];
  readonly completionStatus: 'in-progress' | 'complete';
  readonly revision: number;
}

export interface JourneyProjectPolicy {
  readonly steps: readonly {
    readonly id: string;
    readonly choiceIds: readonly string[];
    readonly masteryTags: readonly string[];
  }[];
}

export function isJourneyRecord(value: unknown): value is JourneyRecordShape {
  if (typeof value !== 'object' || value === null) return false;
  const record = value as Partial<JourneyRecordShape>;
  return (
    typeof record.studentId === 'string' &&
    typeof record.voyageId === 'string' &&
    typeof record.projectId === 'string' &&
    typeof record.projectVersion === 'string' &&
    Array.isArray(record.completedSteps) &&
    Array.isArray(record.route) &&
    (record.completionStatus === 'in-progress' || record.completionStatus === 'complete') &&
    Number.isInteger(record.revision)
  );
}

export function assertJourneyMatchesPolicy(record: JourneyRecordShape, policy: JourneyProjectPolicy): void {
  if (record.completedSteps.length > policy.steps.length) throw new Error('JOURNEY_POLICY_MISMATCH');
  for (const [index, completed] of record.completedSteps.entries()) {
    const expected = policy.steps[index];
    if (completed.stepId !== expected.id || !expected.choiceIds.includes(completed.choiceId)) {
      throw new Error('JOURNEY_POLICY_MISMATCH');
    }
    const actualTags = new Set(
      (completed.masteryResults ?? []).map((result) => result.masteryTag).filter((tag): tag is string => typeof tag === 'string'),
    );
    if (expected.masteryTags.some((tag) => !actualTags.has(tag))) throw new Error('JOURNEY_POLICY_MISMATCH');
  }
}

export function assertSubmittableJourney(record: JourneyRecordShape, policy: JourneyProjectPolicy): void {
  assertJourneyMatchesPolicy(record, policy);
  if (
    record.completionStatus !== 'complete' ||
    record.completedSteps.length !== policy.steps.length
  ) throw new Error('JOURNEY_NOT_COMPLETE');
}

export function masteryTagsFromRecord(record: JourneyRecordShape): ReadonlySet<string> {
  return new Set(
    record.completedSteps.flatMap((step) =>
      (step.masteryResults ?? [])
        .map((result) => result.masteryTag)
        .filter((tag): tag is string => typeof tag === 'string' && tag.length > 0),
    ),
  );
}

export function responsePreview(record: JourneyRecordShape): string | undefined {
  const latest = record.completedSteps.at(-1)?.studentResponse;
  const text = latest?.text?.trim() || latest?.transcript?.trim();
  return text === undefined || text.length === 0 ? undefined : text.slice(0, 240);
}

export function teamIdentity(actorUserId: string, displayName: string) {
  const palettes = ['#4e88a2', '#b66b45', '#6d8e52', '#8b6fa8', '#b3943f'] as const;
  const patterns = ['solid', 'long-dash', 'short-dash', 'dot-dash', 'double'] as const;
  let hash = 0;
  for (const character of actorUserId) hash = ((hash << 5) - hash + character.charCodeAt(0)) | 0;
  const index = Math.abs(hash) % palettes.length;
  return {
    name: `${displayName}'s voyage`,
    emblem: ['✦', '⚓', '◈', '✺', '◆'][index],
    color: palettes[index],
    linePattern: patterns[index],
  };
}
