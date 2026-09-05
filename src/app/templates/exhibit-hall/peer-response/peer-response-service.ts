import { wordCount } from '../core/artifact-validator';
import { ExhibitAccessPolicy } from '../core/exhibit-access-policy';
import { cloneHallState, entityId, withRevision } from '../core/exhibit-state';
import type {
  ExhibitActor,
  ExhibitHallState,
  ExhibitMutationResult,
  ExhibitTemplateDefinition,
} from '../domain/exhibit-types';

export class PeerResponseService {
  constructor(private readonly policy = new ExhibitAccessPolicy()) {}

  saveDraft(
    state: ExhibitHallState,
    actor: ExhibitActor,
    authorDisplayName: string,
    hangingId: string,
    body: string,
    now: string,
  ): ExhibitMutationResult {
    const hanging = state.hangings.find((item) => item.id === hangingId);
    if (hanging === undefined || !this.policy.canRespond(actor, state, hanging)) {
      return failure(state, 'Question cards are not available for this exhibit.');
    }
    const next = cloneHallState(state);
    const existing = next.peerResponses.find(
      (item) =>
        item.hangingId === hangingId && item.authorId === actor.id && item.status === 'draft',
    );
    if (existing !== undefined) {
      return {
        ok: true,
        state: withRevision({
          ...next,
          peerResponses: next.peerResponses.map((item) =>
            item.id === existing.id
              ? { ...item, body, snapshotId: hanging.currentSnapshotId, updatedAt: now }
              : item,
          ),
        }),
        entityId: existing.id,
      };
    }
    const id = entityId(next, 'response');
    return {
      ok: true,
      state: withRevision({
        ...next,
        sequence: next.sequence + 1,
        peerResponses: [
          ...next.peerResponses,
          {
            id,
            hangingId,
            snapshotId: hanging.currentSnapshotId,
            authorId: actor.id,
            authorDisplayName,
            body,
            status: 'draft',
            createdAt: now,
            updatedAt: now,
          },
        ],
      }),
      entityId: id,
    };
  }

  post(
    state: ExhibitHallState,
    template: ExhibitTemplateDefinition,
    actor: ExhibitActor,
    authorDisplayName: string,
    hangingId: string,
    body: string,
    operationKey: string,
    now: string,
  ): ExhibitMutationResult {
    const prior = state.completedOperations[operationKey];
    if (prior !== undefined) return { ok: true, state, entityId: prior, duplicate: true };
    const hanging = state.hangings.find((item) => item.id === hangingId);
    if (hanging === undefined || !this.policy.canRespond(actor, state, hanging)) {
      return failure(state, 'Question cards are closed or unavailable for this exhibit.');
    }
    const trimmed = body.trim();
    if (trimmed.length === 0) return failure(state, 'Write a question before posting.');
    if (wordCount(trimmed) > template.peerResponse.maxWords) {
      return failure(
        state,
        `Question cards are limited to ${template.peerResponse.maxWords} words.`,
      );
    }
    const existingPosted = state.peerResponses.filter(
      (item) =>
        item.hangingId === hangingId &&
        item.authorId === actor.id &&
        (item.status === 'posted' || item.status === 'hidden'),
    );
    if (existingPosted.length >= template.peerResponse.maxPerArtifact) {
      return failure(state, 'You have already posted a question card at this exhibit.');
    }
    const next = cloneHallState(state);
    const draft = next.peerResponses.find(
      (item) =>
        item.hangingId === hangingId && item.authorId === actor.id && item.status === 'draft',
    );
    const id = draft?.id ?? entityId(next, 'response');
    const posted = {
      id,
      hangingId,
      snapshotId: hanging.currentSnapshotId,
      authorId: actor.id,
      authorDisplayName,
      body: trimmed,
      status: 'posted' as const,
      createdAt: draft?.createdAt ?? now,
      updatedAt: now,
    };
    const responses =
      draft === undefined
        ? [...next.peerResponses, posted]
        : next.peerResponses.map((item) => (item.id === draft.id ? posted : item));
    return {
      ok: true,
      state: withRevision({
        ...next,
        sequence: next.sequence + (draft === undefined ? 1 : 0),
        peerResponses: responses,
        completedOperations: { ...next.completedOperations, [operationKey]: id },
      }),
      entityId: id,
    };
  }

  moderate(
    state: ExhibitHallState,
    actor: ExhibitActor,
    responseId: string,
    action: 'hide' | 'restore',
    now: string,
  ): ExhibitMutationResult {
    if (!this.policy.canModerateResponses(actor, state)) {
      return failure(state, 'Only the teacher can moderate question cards.');
    }
    const response = state.peerResponses.find((item) => item.id === responseId);
    if (response === undefined) return failure(state, 'That question card was not found.');
    const status = action === 'hide' ? 'hidden' : 'posted';
    return {
      ok: true,
      state: withRevision({
        ...cloneHallState(state),
        peerResponses: state.peerResponses.map((item) =>
          item.id === responseId ? { ...item, status, updatedAt: now } : item,
        ),
      }),
      entityId: responseId,
    };
  }
}

function failure(state: ExhibitHallState, error: string): ExhibitMutationResult {
  return { ok: false, state, error };
}
