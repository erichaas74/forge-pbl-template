import { ExhibitAccessPolicy } from '../core/exhibit-access-policy';
import { cloneHallState, entityId, withRevision } from '../core/exhibit-state';
import type {
  ExhibitActor,
  ExhibitHallState,
  ExhibitMutationResult,
  ExhibitTemplateDefinition,
} from '../domain/exhibit-types';

export class DefenseService {
  constructor(private readonly policy = new ExhibitAccessPolicy()) {}

  saveDraft(
    state: ExhibitHallState,
    actor: ExhibitActor,
    hangingId: string,
    answers: Readonly<Record<string, string>>,
    completionMode: 'live' | 'makeup',
  ): ExhibitMutationResult {
    const hanging = state.hangings.find((item) => item.id === hangingId);
    if (hanging === undefined || !this.policy.canSubmitDefense(actor, state)) {
      return failure(state, 'The defense form is not available.');
    }
    const next = cloneHallState(state);
    const existing = next.defenses.find(
      (item) => item.hangingId === hangingId && item.studentId === actor.id,
    );
    const id = existing?.id ?? entityId(next, 'defense');
    const defense = {
      id,
      hangingId,
      snapshotId: hanging.currentSnapshotId,
      studentId: actor.id,
      completionMode,
      answers: structuredClone(answers),
      status: 'draft' as const,
    };
    return {
      ok: true,
      state: withRevision({
        ...next,
        sequence: next.sequence + (existing === undefined ? 1 : 0),
        defenses:
          existing === undefined
            ? [...next.defenses, defense]
            : next.defenses.map((item) => (item.id === existing.id ? defense : item)),
      }),
      entityId: id,
    };
  }

  submit(
    state: ExhibitHallState,
    template: ExhibitTemplateDefinition,
    actor: ExhibitActor,
    hangingId: string,
    answers: Readonly<Record<string, string>>,
    completionMode: 'live' | 'makeup',
    operationKey: string,
    now: string,
  ): ExhibitMutationResult {
    const prior = state.completedOperations[operationKey];
    if (prior !== undefined) return { ok: true, state, entityId: prior, duplicate: true };
    const hanging = state.hangings.find((item) => item.id === hangingId);
    if (hanging === undefined || !this.policy.canSubmitDefense(actor, state)) {
      return failure(state, 'The defense form is not available.');
    }
    const requiredPromptIds = template.defense.prompts.map((prompt) => prompt.id);
    const missing = requiredPromptIds.filter((id) => (answers[id] ?? '').trim().length < 8);
    if (missing.length > 0) {
      return failure(state, 'Complete every defense response with a specific explanation.');
    }
    const next = cloneHallState(state);
    const existing = next.defenses.find(
      (item) => item.hangingId === hangingId && item.studentId === actor.id,
    );
    const id = existing?.id ?? entityId(next, 'defense');
    const defense = {
      id,
      hangingId,
      snapshotId: hanging.currentSnapshotId,
      studentId: actor.id,
      completionMode,
      answers: structuredClone(answers),
      status: 'submitted' as const,
      submittedAt: now,
    };
    return {
      ok: true,
      state: withRevision({
        ...next,
        sequence: next.sequence + (existing === undefined ? 1 : 0),
        defenses:
          existing === undefined
            ? [...next.defenses, defense]
            : next.defenses.map((item) => (item.id === existing.id ? defense : item)),
        completedOperations: { ...next.completedOperations, [operationKey]: id },
      }),
      entityId: id,
    };
  }
}

function failure(state: ExhibitHallState, error: string): ExhibitMutationResult {
  return { ok: false, state, error };
}
