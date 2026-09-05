import type {
  AccessibleExhibit,
  ArtifactValidationResult,
  ExhibitActor,
  ExhibitCorridorPreview,
  ExhibitHallState,
  ExhibitMutationResult,
  ExhibitTemplateDefinition,
} from '../domain/exhibit-types';
import { ExhibitAccessPolicy } from './exhibit-access-policy';
import { cloneHallState, entityId, withRevision } from './exhibit-state';

export interface PublishArtifactRequest {
  readonly actor: ExhibitActor;
  readonly artifactId: string;
  readonly locationId: string;
  readonly rendererVersion: number;
  readonly visitorSafeData: unknown;
  readonly accessibleData: AccessibleExhibit;
  readonly corridorPreview?: ExhibitCorridorPreview;
  readonly validation: ArtifactValidationResult;
  readonly operationKey: string;
  readonly now: string;
}

export class SnapshotService {
  constructor(private readonly policy = new ExhibitAccessPolicy()) {}

  publish(
    state: ExhibitHallState,
    template: ExhibitTemplateDefinition,
    request: PublishArtifactRequest,
  ): ExhibitMutationResult {
    const completedEntityId = state.completedOperations[request.operationKey];
    if (completedEntityId !== undefined) {
      return { ok: true, state, entityId: completedEntityId, duplicate: true };
    }
    const artifact = state.artifacts.find((item) => item.id === request.artifactId);
    if (artifact === undefined) {
      return failure(state, 'That artifact is no longer available.');
    }
    if (!this.policy.canPublishArtifact(request.actor, state, artifact)) {
      return failure(state, 'You do not have permission to publish this artifact right now.');
    }
    if (!request.validation.valid) {
      return failure(state, request.validation.errors[0]?.message ?? 'The artifact is not ready.');
    }

    const currentHanging = state.hangings.find((item) => item.artifactId === artifact.id);
    const snapshotCount = state.snapshots.filter((item) => item.artifactId === artifact.id).length;
    const rehangCount = Math.max(0, snapshotCount - 1);
    if (currentHanging !== undefined && rehangCount >= template.publication.rehangLimit) {
      return failure(
        state,
        `This ${template.vocabulary.artifactSingular} has reached its rehang limit.`,
      );
    }
    if (
      currentHanging !== undefined &&
      template.publication.preventRehangAfterResponse &&
      state.peerResponses.some(
        (response) => response.hangingId === currentHanging.id && response.status === 'posted',
      )
    ) {
      return failure(
        state,
        `This ${template.vocabulary.artifactSingular} cannot be rehung after responses are posted.`,
      );
    }

    const next = cloneHallState(state);
    const snapshotId = entityId(next, 'snapshot');
    const snapshot = {
      id: snapshotId,
      artifactId: artifact.id,
      version: snapshotCount + 1,
      rendererType: artifact.rendererType,
      rendererVersion: request.rendererVersion,
      visitorSafeData: structuredClone(request.visitorSafeData),
      accessibleData: structuredClone(request.accessibleData),
      corridorPreview:
        request.corridorPreview === undefined
          ? undefined
          : structuredClone(request.corridorPreview),
      createdBy: request.actor.id,
      createdAt: request.now,
    } as const;
    const artifacts = next.artifacts.map((item) =>
      item.id === artifact.id
        ? {
            ...item,
            status: 'published' as const,
            currentSnapshotId: snapshotId,
            updatedAt: request.now,
          }
        : item,
    );
    const hangingId =
      currentHanging?.id ?? entityId({ ...next, sequence: next.sequence + 1 }, 'hanging');
    const hanging = {
      id: hangingId,
      hallId: state.hall.id,
      locationId: request.locationId,
      artifactId: artifact.id,
      currentSnapshotId: snapshotId,
      publishedBy: request.actor.id,
      publishedAt: request.now,
      lockedAt: currentHanging?.lockedAt,
    };
    const hangings =
      currentHanging === undefined
        ? [...next.hangings, hanging]
        : next.hangings.map((item) => (item.id === currentHanging.id ? hanging : item));
    const changed = withRevision({
      ...next,
      sequence: next.sequence + (currentHanging === undefined ? 2 : 1),
      artifacts,
      snapshots: [...next.snapshots, snapshot],
      hangings,
      completedOperations: {
        ...next.completedOperations,
        [request.operationKey]: snapshotId,
      },
    });
    return { ok: true, state: changed, entityId: snapshotId };
  }
}

function failure(state: ExhibitHallState, error: string): ExhibitMutationResult {
  return { ok: false, state, error };
}
