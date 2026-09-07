import { classExhibitHallConfig } from '../../../projects/class-exhibit-hall/class-exhibit-hall.config';
import { DefenseService } from '../defense/defense-service';
import type { ExhibitActor, MuseumBoardSnapshotData } from '../domain/exhibit-types';
import { ExhibitLmsBridge } from '../lms/exhibit-lms-bridge';
import { LiveFocusService } from '../live/live-focus-service';
import { PeerResponseService } from '../peer-response/peer-response-service';
import {
  MuseumBoardAdapter,
  museumBoardFieldValue,
} from '../renderers/museum-board/museum-board-adapter';
import { MuseumBoardRenderer } from '../renderers/museum-board/museum-board-renderer';
import { museumBoardTemplate } from '../renderers/museum-board/museum-board-template';
import { SciencePosterRenderer } from '../renderers/science-poster/science-poster-renderer';
import { createInitialHallState } from '../runtime/exhibit-hall-runtime.service';
import { ArtifactValidator } from './artifact-validator';
import { ExhibitAccessPolicy } from './exhibit-access-policy';
import { GalleryCollectionService } from './gallery-collection-service';
import { SnapshotService } from './snapshot-service';
import { ExhibitRendererRegistry, ExhibitTemplateRegistry } from './exhibit-template-registry';

const now = '2026-09-04T01:00:00.000Z';
const student: ExhibitActor = {
  id: classExhibitHallConfig.viewer.studentId,
  role: 'student',
  courseSectionIds: [classExhibitHallConfig.courseSectionId],
  teamIds: [classExhibitHallConfig.viewer.teamId],
};
const teacher: ExhibitActor = {
  id: classExhibitHallConfig.viewer.teacherId,
  role: 'teacher',
  courseSectionIds: [classExhibitHallConfig.courseSectionId],
  teamIds: [],
};

describe('reusable exhibit system', () => {
  it('registers multiple renderer types without changing the hall collection', () => {
    const templates = new ExhibitTemplateRegistry();
    const renderers = new ExhibitRendererRegistry();

    expect(templates.register(museumBoardTemplate).ok).toBe(true);
    expect(renderers.register(new MuseumBoardRenderer()).ok).toBe(true);
    expect(renderers.register(new SciencePosterRenderer()).ok).toBe(true);
    expect(renderers.resolve('museum-board-v1').ok).toBe(true);
    expect(renderers.resolve('science-poster-demo').ok).toBe(true);
    expect(renderers.resolve('missing-renderer')).toMatchObject({
      ok: false,
      code: 'CAPABILITY_NOT_INSTALLED',
    });
  });

  it('copies only approved notebook slots and reports private fields as omitted', () => {
    const sourceBoard = classExhibitHallConfig.seedBoards[0]!.data;
    const adapter = new MuseumBoardAdapter();
    const result = adapter.compose({
      projectInstanceId: classExhibitHallConfig.projectInstanceId,
      teamId: classExhibitHallConfig.viewer.teamId,
      slots: {
        'exhibit-title': sourceBoard.title,
        'central-claim': sourceBoard.centralClaim,
        'selected-objects': sourceBoard.objects,
        'object-captions': Object.fromEntries(
          sourceBoard.objects.map((object) => [object.id, object.description]),
        ),
        'source-list': sourceBoard.sources,
        'team-credit': sourceBoard.teamCredit,
        'immersive-gallery': sourceBoard.immersiveGallery,
        'video-presentation': sourceBoard.videoPresentation,
        'private-working-notes': 'Do not publish this unfinished thought.',
        'teacher-rubric-score': 4,
      },
    });

    expect(result.validation.valid).toBe(true);
    expect(result.omittedSlotIds).toEqual(['private-working-notes', 'teacher-rubric-score']);
    expect(JSON.stringify(result.data)).not.toContain('unfinished thought');
    expect(JSON.stringify(result.data)).not.toContain('rubric');
  });

  it('blocks incomplete artifacts with field-specific validation', () => {
    const incomplete: MuseumBoardSnapshotData = {
      title: '',
      centralClaim: 'A claim that is present.',
      objects: [],
      sources: [],
      teamCredit: { displayName: 'Test team' },
    };

    const result = new ArtifactValidator().validate(
      museumBoardTemplate,
      incomplete,
      museumBoardFieldValue,
    );

    expect(result.valid).toBe(false);
    expect(result.errors.map((error) => error.fieldId)).toEqual([
      'exhibit-title',
      'selected-objects',
      'object-captions',
      'source-list',
      'immersive-gallery',
      'video-presentation',
    ]);
    expect(result.errors.every((error) => error.focusTarget !== undefined)).toBe(true);
  });

  it('publishes an immutable copy and deduplicates retries by operation key', () => {
    const state = createInitialHallState(classExhibitHallConfig, new MuseumBoardRenderer());
    const source = {
      ...structuredClone(
        classExhibitHallConfig.seedBoards.find((seed) => seed.teamId === 'team-ember')!.data,
      ),
      immersiveGallery: structuredClone(
        classExhibitHallConfig.seedBoards[0]!.data.immersiveGallery,
      ),
    };
    const validation = new ArtifactValidator().validate(
      museumBoardTemplate,
      source,
      museumBoardFieldValue,
    );
    const renderer = new MuseumBoardRenderer();
    const service = new SnapshotService();
    const request = {
      actor: teacher,
      artifactId: 'artifact-team-ember',
      locationId: 'alcove-04',
      rendererVersion: renderer.version,
      visitorSafeData: source,
      accessibleData: renderer.renderAccessible(source),
      validation,
      operationKey: 'publish-ember-1',
      now,
    };

    const published = service.publish(state, museumBoardTemplate, request);
    expect(published.ok).toBe(true);
    expect(published.state.hangings).toHaveLength(4);
    expect(published.state.snapshots).toHaveLength(5);
    (source as unknown as { centralClaim: string }).centralClaim = 'Changed after publish';
    const snapshot = published.state.snapshots.find((item) => item.id === published.entityId)!;
    expect((snapshot.visitorSafeData as MuseumBoardSnapshotData).centralClaim).not.toBe(
      'Changed after publish',
    );

    const retry = service.publish(published.state, museumBoardTemplate, request);
    expect(retry).toMatchObject({ ok: true, duplicate: true, entityId: published.entityId });
    expect(retry.state.snapshots).toHaveLength(5);
  });

  it('isolates sections and filters family collection data', () => {
    const state = createInitialHallState(classExhibitHallConfig, new MuseumBoardRenderer());
    expect(state.snapshots.map((snapshot) => snapshot.corridorPreview?.walkUpAvailable)).toEqual([
      undefined,
      undefined,
      undefined,
      undefined,
    ]);
    const policy = new ExhibitAccessPolicy();
    const outsider: ExhibitActor = {
      id: 'student-other-period',
      role: 'student',
      courseSectionIds: ['history-5-period-4'],
      teamIds: ['team-atlas'],
    };
    const hanging = state.hangings[0]!;
    expect(policy.canReadHanging(outsider, state, hanging)).toBe(false);
    expect(policy.canReadPrivateNotebook(outsider, state, 'team-atlas')).toBe(false);

    const family: ExhibitActor = {
      id: 'family',
      role: 'family',
      courseSectionIds: [],
      teamIds: [],
    };
    const openFamilyState = {
      ...state,
      hallPhase: 'closed_readable' as const,
      hall: {
        ...state.hall,
        controls: { ...state.hall.controls, familyViewEnabled: true },
      },
    };
    const familyLocations = new GalleryCollectionService().build(
      openFamilyState,
      classExhibitHallConfig.teams,
      family,
    );
    expect(familyLocations).toHaveLength(4);
    expect(familyLocations.every((location) => location.hanging !== undefined)).toBe(true);
  });

  it('limits responses, preserves their snapshot association, and lets teachers moderate', () => {
    const state = createInitialHallState(classExhibitHallConfig, new MuseumBoardRenderer());
    const hanging = state.hangings.find((item) => item.artifactId === 'artifact-team-marigold')!;
    const service = new PeerResponseService();
    const first = service.post(
      state,
      museumBoardTemplate,
      student,
      'Avery',
      hanging.id,
      'What evidence shows that listening together changed family decisions?',
      'response-attempt-1',
      now,
    );

    expect(first.ok).toBe(true);
    const response = first.state.peerResponses.find((item) => item.id === first.entityId)!;
    expect(response.snapshotId).toBe(hanging.currentSnapshotId);
    const second = service.post(
      first.state,
      museumBoardTemplate,
      student,
      'Avery',
      hanging.id,
      'Could another source change the claim?',
      'response-attempt-2',
      now,
    );
    expect(second).toMatchObject({ ok: false });

    const hidden = service.moderate(first.state, teacher, response.id, 'hide', now);
    expect(hidden.state.peerResponses.find((item) => item.id === response.id)?.status).toBe(
      'hidden',
    );
    const restored = service.moderate(hidden.state, teacher, response.id, 'restore', now);
    expect(restored.state.peerResponses.find((item) => item.id === response.id)?.status).toBe(
      'posted',
    );
  });

  it('increments live focus revisions and keeps hall controls independent', () => {
    const state = createInitialHallState(classExhibitHallConfig, new MuseumBoardRenderer());
    const service = new LiveFocusService();
    const first = service.point(
      state,
      teacher,
      state.hangings[0]!.id,
      state.openingSession.revision,
    );
    expect(first.ok).toBe(true);
    expect(first.state.openingSession.revision).toBe(state.openingSession.revision + 1);
    const stale = service.point(
      first.state,
      teacher,
      state.hangings[1]!.id,
      state.openingSession.revision,
    );
    expect(stale).toMatchObject({ ok: false });

    const cardsOff = service.toggleControl(first.state, teacher, 'peerResponsesEnabled');
    expect(cardsOff.state.hall.controls.peerResponsesEnabled).toBe(false);
    expect(cardsOff.state.hall.controls.submissionLocked).toBe(false);
    expect(cardsOff.state.hallPhase).toBe('live_opening');
    const locked = service.toggleControl(cardsOff.state, teacher, 'submissionLocked');
    expect(locked.state.hall.controls.submissionLocked).toBe(true);
    expect(locked.state.hall.controls.peerResponsesEnabled).toBe(false);
  });

  it('records individual defenses and LMS evidence idempotently', () => {
    const state = createInitialHallState(classExhibitHallConfig, new MuseumBoardRenderer());
    const hanging = state.hangings.find((item) => item.artifactId === 'artifact-team-marigold')!;
    const answers = Object.fromEntries(
      museumBoardTemplate.defense.prompts.map((prompt) => [
        prompt.id,
        `A specific explanation for ${prompt.id} using the displayed evidence.`,
      ]),
    );
    const submitted = new DefenseService().submit(
      state,
      museumBoardTemplate,
      student,
      hanging.id,
      answers,
      'makeup',
      'defense-attempt-1',
      now,
    );
    expect(submitted.ok).toBe(true);
    expect(submitted.state.defenses[0]).toMatchObject({
      studentId: student.id,
      completionMode: 'makeup',
      status: 'submitted',
    });

    const bridge = new ExhibitLmsBridge();
    const input = {
      type: 'defense_completed' as const,
      idempotencyKey: 'lms-defense-1',
      projectInstanceId: classExhibitHallConfig.projectInstanceId,
      studentId: student.id,
      snapshotId: hanging.currentSnapshotId,
      occurredAt: now,
    };
    const recorded = bridge.record(submitted.state, input);
    const retry = bridge.record(recorded.state, input);
    expect(recorded.state.lmsEvents).toHaveLength(1);
    expect(retry).toMatchObject({ ok: true, duplicate: true });
    expect(retry.state.lmsEvents).toHaveLength(1);
  });
});
