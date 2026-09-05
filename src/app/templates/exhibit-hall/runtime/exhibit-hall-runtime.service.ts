import { Injectable, OnDestroy, computed, inject, signal } from '@angular/core';

import { ArtifactValidator, wordCount } from '../core/artifact-validator';
import { ExhibitAccessPolicy } from '../core/exhibit-access-policy';
import { GalleryCollectionService } from '../core/gallery-collection-service';
import { SnapshotService } from '../core/snapshot-service';
import { DefenseService } from '../defense/defense-service';
import type {
  ExhibitActor,
  ExhibitHallState,
  ExhibitMutationResult,
  ExhibitUserRole,
  HallLocationView,
  HallPhase,
  MuseumBoardObject,
  MuseumBoardSnapshotData,
  MuseumBoardSource,
} from '../domain/exhibit-types';
import { ExhibitLmsBridge } from '../lms/exhibit-lms-bridge';
import { LiveFocusService } from '../live/live-focus-service';
import { PeerResponseService } from '../peer-response/peer-response-service';
import {
  ExhibitRendererRegistry,
  ExhibitTemplateRegistry,
} from '../core/exhibit-template-registry';
import { validateMuseumBoard } from '../renderers/museum-board/museum-board-adapter';
import { MuseumBoardRenderer } from '../renderers/museum-board/museum-board-renderer';
import { parseMetaStepsEmbed } from '../renderers/metasteps/metasteps-embed';
import { parsePresentationVideo } from '../renderers/video/presentation-video';
import { SciencePosterRenderer } from '../renderers/science-poster/science-poster-renderer';
import { EXHIBIT_HALL_CONFIG, EXHIBIT_HALL_PERSISTENCE } from './exhibit-hall.tokens';

@Injectable()
export class ExhibitHallRuntimeService implements OnDestroy {
  readonly config = inject(EXHIBIT_HALL_CONFIG);
  private readonly persistence = inject(EXHIBIT_HALL_PERSISTENCE);
  private readonly accessPolicy = new ExhibitAccessPolicy();
  private readonly validator = new ArtifactValidator();
  private readonly snapshots = new SnapshotService(this.accessPolicy);
  private readonly gallery = new GalleryCollectionService(this.accessPolicy);
  private readonly peerResponses = new PeerResponseService(this.accessPolicy);
  private readonly liveFocus = new LiveFocusService(this.accessPolicy);
  private readonly defenses = new DefenseService(this.accessPolicy);
  private readonly lms = new ExhibitLmsBridge();
  private readonly templateRegistry = new ExhibitTemplateRegistry();
  private readonly rendererRegistry = new ExhibitRendererRegistry();
  private persistTimer?: ReturnType<typeof setTimeout>;

  readonly role = signal<ExhibitUserRole>('student');
  readonly viewMode = signal<'corridor' | 'list'>('corridor');
  readonly walkUpOpen = signal(false);
  readonly composerOpen = signal(false);
  readonly teacherDeskOpen = signal(true);
  readonly defenseOpen = signal(false);
  readonly selectedHangingId = signal<string | undefined>(undefined);
  readonly liveAnnouncement = signal('The Class Exhibit Hall is ready.');
  readonly notification = signal<string | undefined>(undefined);
  readonly error = signal<string | undefined>(undefined);
  readonly saveState = signal<'saved' | 'saving' | 'offline_local' | 'save_failed'>('saved');
  readonly visitedHangingIds = signal<ReadonlySet<string>>(new Set());
  readonly connectedCount = signal(18);

  readonly state = signal(this.loadOrCreateState());
  readonly composerDraft = signal(this.initialComposerDraft());
  readonly draftVersion = signal(0);

  readonly actor = computed<ExhibitActor>(() => {
    if (this.role() === 'teacher') {
      return {
        id: this.config.viewer.teacherId,
        role: 'teacher',
        courseSectionIds: [this.config.courseSectionId],
        teamIds: [],
      };
    }
    if (this.role() === 'family') {
      return { id: 'family-visitor', role: 'family', courseSectionIds: [], teamIds: [] };
    }
    return {
      id: this.config.viewer.studentId,
      role: 'student',
      courseSectionIds: [this.config.courseSectionId],
      teamIds: [this.config.viewer.teamId],
    };
  });

  readonly locations = computed<readonly HallLocationView[]>(() =>
    this.gallery.build(this.state(), this.config.teams, this.actor()),
  );
  readonly publishedCount = computed(() => this.state().hangings.length);
  readonly unpublishedTeams = computed(() =>
    this.config.teams.filter(
      (team) => !this.state().hangings.some((hanging) => hanging.locationId === team.locationId),
    ),
  );
  readonly selectedLocation = computed(() =>
    this.locations().find((location) => location.hanging?.id === this.selectedHangingId()),
  );
  readonly focusedHangingId = computed(() => this.state().openingSession.currentHangingId);
  readonly selectedResponses = computed(() => {
    const hangingId = this.selectedHangingId();
    if (hangingId === undefined || this.role() === 'family') return [];
    return this.state().peerResponses.filter((response) => {
      if (
        response.hangingId !== hangingId ||
        response.status === 'draft' ||
        response.status === 'deleted'
      ) {
        return false;
      }
      return this.role() === 'teacher' || response.status === 'posted';
    });
  });
  readonly selectedDraft = computed(() => {
    const hangingId = this.selectedHangingId();
    if (hangingId === undefined) return '';
    return (
      this.state().peerResponses.find(
        (response) =>
          response.hangingId === hangingId &&
          response.authorId === this.actor().id &&
          response.status === 'draft',
      )?.body ?? ''
    );
  });
  readonly currentDefense = computed(() => {
    const hangingId = this.selectedHangingId();
    if (hangingId === undefined) return undefined;
    return this.state().defenses.find(
      (defense) => defense.hangingId === hangingId && defense.studentId === this.actor().id,
    );
  });
  readonly canRespondAtSelected = computed(() => {
    const hanging = this.selectedLocation()?.hanging;
    return (
      hanging !== undefined && this.accessPolicy.canRespond(this.actor(), this.state(), hanging)
    );
  });
  readonly availableWalkUpCount = computed(
    () =>
      this.locations().filter(
        (location) =>
          location.hanging !== undefined &&
          location.snapshot !== undefined &&
          location.snapshot.corridorPreview?.walkUpAvailable !== false,
      ).length,
  );
  readonly comingSoonCount = computed(() => this.locations().length - this.availableWalkUpCount());
  readonly responseWords = computed(() => wordCount(this.selectedDraft()));
  readonly visitProgress = computed(() => ({
    current: this.visitedHangingIds().size,
    target: Math.max(1, this.availableWalkUpCount()),
  }));
  readonly responseProgress = computed(() => ({
    current: this.state().peerResponses.filter(
      (response) => response.authorId === this.actor().id && response.status === 'posted',
    ).length,
    target: this.config.template.peerResponse.minimumResponses,
  }));
  readonly composerValidation = computed(() =>
    validateMuseumBoard(this.config.template, this.composerDraft(), this.validator),
  );
  readonly rehangsRemaining = computed(() => {
    const artifactId = `artifact-${this.config.viewer.teamId}`;
    const count = this.state().snapshots.filter(
      (snapshot) => snapshot.artifactId === artifactId,
    ).length;
    return Math.max(0, this.config.template.publication.rehangLimit - Math.max(0, count - 1));
  });

  constructor() {
    const templateResult = this.templateRegistry.register(this.config.template);
    const museumResult = this.rendererRegistry.register(new MuseumBoardRenderer());
    const scienceResult = this.rendererRegistry.register(new SciencePosterRenderer());
    const problem = [templateResult, museumResult, scienceResult].find((result) => !result.ok);
    if (problem !== undefined && !problem.ok) this.error.set(problem.message);
  }

  ngOnDestroy(): void {
    clearTimeout(this.persistTimer);
  }

  setRole(role: ExhibitUserRole): void {
    this.role.set(role);
    this.walkUpOpen.set(false);
    this.defenseOpen.set(false);
    this.error.set(undefined);
    this.notification.set(
      role === 'teacher'
        ? `Viewing teacher controls as ${this.config.viewer.teacherDisplayName}.`
        : role === 'family'
          ? 'Family view shows only approved snapshots.'
          : `Viewing the hall as ${this.config.viewer.studentDisplayName}.`,
    );
  }

  setViewMode(mode: 'corridor' | 'list'): void {
    this.viewMode.set(mode);
    this.liveAnnouncement.set(
      mode === 'list' ? 'Accessible gallery list opened.' : 'Immersive corridor opened.',
    );
  }

  openHanging(hangingId: string): void {
    const location = this.locations().find((item) => item.hanging?.id === hangingId);
    if (location?.hanging === undefined) {
      this.error.set('That exhibit is not available in this view.');
      return;
    }
    if (location.snapshot?.corridorPreview?.walkUpAvailable === false) {
      this.notification.set('Walk-up coming soon. This exhibit preview is not open yet.');
      this.liveAnnouncement.set('Walk-up coming soon.');
      return;
    }
    this.selectedHangingId.set(hangingId);
    this.visitedHangingIds.update((visited) => new Set([...visited, hangingId]));
    this.walkUpOpen.set(true);
    this.defenseOpen.set(false);
    this.error.set(undefined);
    this.liveAnnouncement.set(`${location.snapshot?.accessibleData.title ?? 'Exhibit'} opened.`);
  }

  closeWalkUp(): void {
    this.walkUpOpen.set(false);
    this.defenseOpen.set(false);
    this.liveAnnouncement.set('Returned to the exhibit corridor.');
  }

  openComposer(): void {
    this.composerOpen.set(true);
    this.error.set(undefined);
  }

  closeComposer(): void {
    this.composerOpen.set(false);
  }

  updateBoardTitle(title: string): void {
    this.updateComposer({ ...this.composerDraft(), title });
  }

  updateBoardClaim(centralClaim: string): void {
    this.updateComposer({ ...this.composerDraft(), centralClaim });
  }

  updateObject(
    objectId: string,
    field: 'title' | 'description' | 'evidenceConnection',
    value: string,
  ): void {
    this.updateComposer({
      ...this.composerDraft(),
      objects: this.composerDraft().objects.map((object) =>
        object.id === objectId ? { ...object, [field]: value } : object,
      ),
    });
  }

  updateSource(sourceId: string, citation: string): void {
    this.updateComposer({
      ...this.composerDraft(),
      sources: this.composerDraft().sources.map((source) =>
        source.id === sourceId ? { ...source, citation } : source,
      ),
    });
  }

  updateGalleryTitle(title: string): void {
    this.updateComposer({
      ...this.composerDraft(),
      immersiveGallery: {
        provider: 'metasteps',
        title,
        embedUrl: this.composerDraft().immersiveGallery?.embedUrl ?? '',
      },
    });
  }

  updateGalleryEmbed(embedUrl: string): void {
    this.updateComposer({
      ...this.composerDraft(),
      immersiveGallery: {
        provider: 'metasteps',
        title: this.composerDraft().immersiveGallery?.title ?? 'Immersive gallery',
        embedUrl,
      },
    });
  }

  updateVideoTitle(title: string): void {
    this.updateComposer({
      ...this.composerDraft(),
      videoPresentation: {
        title,
        videoUrl: this.composerDraft().videoPresentation?.videoUrl ?? '',
        prototype: this.composerDraft().videoPresentation?.prototype,
        presenterLabel: this.composerDraft().videoPresentation?.presenterLabel,
      },
    });
  }

  updateVideoUrl(videoUrl: string): void {
    this.updateComposer({
      ...this.composerDraft(),
      videoPresentation: {
        title: this.composerDraft().videoPresentation?.title ?? 'Curator video presentation',
        videoUrl,
        prototype: false,
      },
    });
  }

  publishBoard(): boolean {
    const renderer = this.rendererRegistry.resolve(this.config.template.rendererType);
    if (!renderer.ok) {
      this.error.set(renderer.message);
      return false;
    }
    const artifactId = `artifact-${this.config.viewer.teamId}`;
    const team = this.config.teams.find((item) => item.id === this.config.viewer.teamId);
    if (team === undefined) {
      this.error.set('Your team does not have an assigned hall location.');
      return false;
    }
    const now = this.now();
    const validation = this.composerValidation();
    const gallery = this.composerDraft().immersiveGallery;
    const parsedGallery = parseMetaStepsEmbed(gallery?.embedUrl ?? '');
    const video = this.composerDraft().videoPresentation;
    const parsedVideo = parsePresentationVideo(video?.videoUrl ?? '');
    const galleryData: MuseumBoardSnapshotData =
      gallery !== undefined && parsedGallery.normalizedUrl !== undefined
        ? {
            ...this.composerDraft(),
            immersiveGallery: { ...gallery, embedUrl: parsedGallery.normalizedUrl },
          }
        : this.composerDraft();
    const publicationData: MuseumBoardSnapshotData =
      video !== undefined && !video.prototype && parsedVideo.normalizedUrl !== undefined
        ? {
            ...galleryData,
            videoPresentation: { ...video, videoUrl: parsedVideo.normalizedUrl },
          }
        : galleryData;
    const result = this.snapshots.publish(this.state(), this.config.template, {
      actor: this.actor(),
      artifactId,
      locationId: team.locationId,
      rendererVersion: renderer.value.version,
      visitorSafeData: publicationData,
      accessibleData: renderer.value.renderAccessible(publicationData),
      corridorPreview:
        this.state().snapshots.find(
          (snapshot) =>
            snapshot.id ===
            this.state().artifacts.find((item) => item.id === artifactId)?.currentSnapshotId,
        )?.corridorPreview ??
        this.config.seedBoards.find((seed) => seed.teamId === team.id)?.corridorPreview,
      validation,
      operationKey: `publish:${artifactId}:${this.draftVersion()}`,
      now,
    });
    if (!this.applyResult(result, true)) return false;
    const snapshotId = result.entityId;
    if (snapshotId !== undefined) {
      const lmsResult = this.lms.record(this.state(), {
        type: 'team_artifact_submitted',
        idempotencyKey: `lms:publish:${snapshotId}`,
        projectInstanceId: this.config.projectInstanceId,
        teamId: this.config.viewer.teamId,
        snapshotId,
        occurredAt: now,
      });
      this.applyResult(lmsResult, true, false);
    }
    this.composerOpen.set(false);
    this.notification.set(
      result.duplicate
        ? 'This exhibit was already showcased. No duplicate was created.'
        : `Exhibit showcased as snapshot ${this.snapshotVersion(snapshotId)}. Studio changes will not alter it.`,
    );
    return true;
  }

  updatePeerDraft(body: string): void {
    const hangingId = this.selectedHangingId();
    if (hangingId === undefined) return;
    const result = this.peerResponses.saveDraft(
      this.state(),
      this.actor(),
      this.config.viewer.studentDisplayName,
      hangingId,
      body,
      this.now(),
    );
    this.applyResult(result, false, false);
    this.schedulePersist();
  }

  savePeerDraft(): void {
    this.persist(this.state());
  }

  postPeerResponse(body: string): boolean {
    const hangingId = this.selectedHangingId();
    if (hangingId === undefined) return false;
    const now = this.now();
    const result = this.peerResponses.post(
      this.state(),
      this.config.template,
      this.actor(),
      this.config.viewer.studentDisplayName,
      hangingId,
      body,
      `response:${this.actor().id}:${hangingId}`,
      now,
    );
    if (!this.applyResult(result, true)) return false;
    const hanging = this.state().hangings.find((item) => item.id === hangingId);
    if (hanging !== undefined) {
      this.applyResult(
        this.lms.record(this.state(), {
          type: 'peer_response_completed',
          idempotencyKey: `lms:response:${result.entityId}`,
          projectInstanceId: this.config.projectInstanceId,
          studentId: this.actor().id,
          snapshotId: hanging.currentSnapshotId,
          occurredAt: now,
        }),
        true,
        false,
      );
    }
    this.notification.set('Question card posted. You can continue the gallery walk.');
    return true;
  }

  moderateResponse(responseId: string, action: 'hide' | 'restore'): void {
    const result = this.peerResponses.moderate(
      this.state(),
      this.actor(),
      responseId,
      action,
      this.now(),
    );
    if (this.applyResult(result, true)) {
      this.notification.set(
        action === 'hide' ? 'Question card hidden.' : 'Question card restored.',
      );
    }
  }

  setHallPhase(phase: HallPhase): void {
    const result = this.liveFocus.setPhase(this.state(), this.actor(), phase, this.now());
    this.applyResult(result, true);
  }

  setNavigationMode(mode: 'independent' | 'teacher_follow'): void {
    this.applyResult(this.liveFocus.setNavigationMode(this.state(), this.actor(), mode), true);
  }

  toggleControl(control: 'submissionLocked' | 'peerResponsesEnabled' | 'familyViewEnabled'): void {
    this.applyResult(this.liveFocus.toggleControl(this.state(), this.actor(), control), true);
  }

  pointTo(hangingId: string): void {
    const result = this.liveFocus.point(
      this.state(),
      this.actor(),
      hangingId,
      this.state().openingSession.revision,
    );
    if (this.applyResult(result, true)) this.openHanging(hangingId);
  }

  selectDocents(teamId: string): void {
    const team = this.config.teams.find((item) => item.id === teamId);
    if (team === undefined || !this.accessPolicy.canControlHall(this.actor(), this.state())) {
      this.error.set('Only the teacher can select a presenting team.');
      return;
    }
    const next = structuredClone(this.state());
    this.state.set({
      ...next,
      revision: next.revision + 1,
      openingSession: {
        ...next.openingSession,
        docentStudentIds: [...team.memberIds],
        revision: next.openingSession.revision + 1,
      },
    });
    this.persist(this.state());
    this.liveAnnouncement.set(`${team.displayName} is now presenting.`);
  }

  openDefense(): void {
    if (this.role() !== 'student') return;
    this.defenseOpen.set(true);
  }

  saveDefenseDraft(answers: Readonly<Record<string, string>>, mode: 'live' | 'makeup'): void {
    const hangingId = this.selectedHangingId();
    if (hangingId === undefined) return;
    const result = this.defenses.saveDraft(this.state(), this.actor(), hangingId, answers, mode);
    this.applyResult(result, false, false);
    this.schedulePersist();
  }

  submitDefense(answers: Readonly<Record<string, string>>, mode: 'live' | 'makeup'): boolean {
    const hangingId = this.selectedHangingId();
    if (hangingId === undefined) return false;
    const now = this.now();
    const result = this.defenses.submit(
      this.state(),
      this.config.template,
      this.actor(),
      hangingId,
      answers,
      mode,
      `defense:${this.actor().id}:${hangingId}`,
      now,
    );
    if (!this.applyResult(result, true)) return false;
    const hanging = this.state().hangings.find((item) => item.id === hangingId);
    if (hanging !== undefined) {
      this.applyResult(
        this.lms.record(this.state(), {
          type: 'defense_completed',
          idempotencyKey: `lms:defense:${result.entityId}`,
          projectInstanceId: this.config.projectInstanceId,
          studentId: this.actor().id,
          snapshotId: hanging.currentSnapshotId,
          occurredAt: now,
        }),
        true,
        false,
      );
    }
    this.defenseOpen.set(false);
    this.notification.set('Defense submitted as your individual evidence.');
    return true;
  }

  printSelected(): void {
    if (typeof window !== 'undefined') window.print();
  }

  clearNotification(): void {
    this.notification.set(undefined);
  }

  clearError(): void {
    this.error.set(undefined);
  }

  resetDemo(): void {
    this.persistence.clear(this.config.projectId, this.config.projectVersion);
    const state = createInitialHallState(this.config, new MuseumBoardRenderer());
    this.state.set(state);
    this.composerDraft.set(this.initialComposerDraft());
    this.draftVersion.set(0);
    this.visitedHangingIds.set(new Set());
    this.walkUpOpen.set(false);
    this.composerOpen.set(false);
    this.persist(state);
    this.notification.set('The exhibit hall demo has been reset.');
  }

  private updateComposer(value: MuseumBoardSnapshotData): void {
    this.composerDraft.set(value);
    this.draftVersion.update((version) => version + 1);
  }

  private applyResult(result: ExhibitMutationResult, persist: boolean, announce = true): boolean {
    if (!result.ok) {
      this.error.set(result.error ?? 'The request could not be completed.');
      return false;
    }
    this.state.set(result.state);
    this.error.set(undefined);
    if (result.announcement !== undefined && announce) {
      this.liveAnnouncement.set(result.announcement);
      this.notification.set(result.announcement);
    }
    if (persist) this.persist(result.state);
    return true;
  }

  private schedulePersist(): void {
    clearTimeout(this.persistTimer);
    this.saveState.set('saving');
    this.persistTimer = setTimeout(() => this.persist(this.state()), 450);
  }

  private persist(state: ExhibitHallState): void {
    clearTimeout(this.persistTimer);
    this.saveState.set(
      typeof navigator !== 'undefined' && !navigator.onLine ? 'offline_local' : 'saving',
    );
    try {
      this.persistence.save(this.config.projectId, this.config.projectVersion, state);
      this.saveState.set(
        typeof navigator !== 'undefined' && !navigator.onLine ? 'offline_local' : 'saved',
      );
    } catch {
      this.saveState.set('save_failed');
      this.error.set('This device could not save the latest hall change.');
    }
  }

  private loadOrCreateState(): ExhibitHallState {
    return (
      this.persistence.load(this.config.projectId, this.config.projectVersion) ??
      createInitialHallState(this.config, new MuseumBoardRenderer())
    );
  }

  private initialComposerDraft(): MuseumBoardSnapshotData {
    const board = this.config.seedBoards.find((item) => item.teamId === this.config.viewer.teamId);
    if (board === undefined) {
      return {
        title: '',
        centralClaim: '',
        objects: [],
        sources: [],
        teamCredit: { displayName: 'My team' },
      };
    }
    return structuredClone(board.data);
  }

  private snapshotVersion(snapshotId: string | undefined): string {
    return String(
      this.state().snapshots.find((snapshot) => snapshot.id === snapshotId)?.version ?? 1,
    );
  }

  private now(): string {
    return new Date().toISOString();
  }
}

export function createInitialHallState(
  config: ExhibitHallRuntimeService['config'],
  renderer: MuseumBoardRenderer,
): ExhibitHallState {
  const createdAt = '2026-09-03T18:00:00.000Z';
  const artifacts = config.teams.map((team) => {
    const seed = config.seedBoards.find((item) => item.teamId === team.id);
    return {
      id: `artifact-${team.id}`,
      projectInstanceId: config.projectInstanceId,
      ownerType: 'team' as const,
      ownerId: team.id,
      templateId: config.template.templateId,
      rendererType: config.template.rendererType,
      sourceAdapterType: config.template.sourceAdapter.type,
      status: seed?.published ? ('published' as const) : ('ready' as const),
      currentSnapshotId: seed?.published ? `snapshot-${team.id}-v1` : undefined,
      createdAt,
      updatedAt: createdAt,
    };
  });
  const snapshots = config.seedBoards.flatMap((seed) =>
    seed.published
      ? [
          {
            id: `snapshot-${seed.teamId}-v1`,
            artifactId: `artifact-${seed.teamId}`,
            version: 1,
            rendererType: config.template.rendererType,
            rendererVersion: renderer.version,
            visitorSafeData: structuredClone(seed.data),
            accessibleData: renderer.renderAccessible(seed.data),
            corridorPreview:
              seed.corridorPreview === undefined
                ? undefined
                : structuredClone(seed.corridorPreview),
            createdBy: seed.teamId,
            createdAt,
          },
        ]
      : [],
  );
  const hangings = config.teams.flatMap((team) => {
    const seed = config.seedBoards.find((item) => item.teamId === team.id);
    return seed?.published
      ? [
          {
            id: `hanging-${team.id}`,
            hallId: 'hall-period-3',
            locationId: team.locationId,
            artifactId: `artifact-${team.id}`,
            currentSnapshotId: `snapshot-${team.id}-v1`,
            publishedBy: team.id,
            publishedAt: createdAt,
          },
        ]
      : [];
  });
  const marigold = hangings.find((item) => item.artifactId === 'artifact-team-marigold');
  const northstar = hangings.find((item) => item.artifactId === 'artifact-team-northstar');
  return {
    schemaVersion: '1.0',
    revision: 1,
    sequence: 100,
    hall: {
      id: 'hall-period-3',
      courseSectionId: config.courseSectionId,
      projectInstanceId: config.projectInstanceId,
      templateId: config.template.templateId,
      templateVersion: config.template.version,
      openingStartsAt: '2026-09-03T18:00:00.000Z',
      submissionLocksAt: '2026-09-04T02:00:00.000Z',
      peerResponsesCloseAt: '2026-09-05T02:00:00.000Z',
      familyViewExpiresAt: '2026-09-12T02:00:00.000Z',
      controls: {
        submissionLocked: false,
        peerResponsesEnabled: true,
        navigationMode: 'independent',
        familyViewEnabled: true,
      },
      locationOrder: config.teams.map((team) => team.locationId),
    },
    hallPhase: 'closed_readable',
    artifacts,
    snapshots,
    hangings,
    peerResponses: [
      ...(marigold === undefined
        ? []
        : [
            {
              id: 'response-seed-1',
              hangingId: marigold.id,
              snapshotId: marigold.currentSnapshotId,
              authorId: 'student-emery',
              authorDisplayName: 'Emery',
              body: 'How did scribes learn to use the palette, and who was allowed to become one?',
              status: 'posted' as const,
              createdAt,
              updatedAt: createdAt,
            },
          ]),
      ...(northstar === undefined
        ? []
        : [
            {
              id: 'response-seed-2',
              hangingId: northstar.id,
              snapshotId: northstar.currentSnapshotId,
              authorId: 'student-lina',
              authorDisplayName: 'Lina',
              body: 'How does the burial location change what researchers can conclude about these objects?',
              status: 'posted' as const,
              createdAt,
              updatedAt: createdAt,
            },
          ]),
    ],
    defenses: [],
    openingSession: {
      id: 'opening-period-3',
      hallId: 'hall-period-3',
      phase: 'closed',
      revision: 1,
      navigationMode: 'independent',
      peerResponsesEnabled: true,
      docentStudentIds: [],
      openedAt: createdAt,
      closedAt: '2026-09-04T02:00:00.000Z',
    },
    lmsEvents: [],
    completedOperations: {},
  };
}

export type EditableMuseumObject = MuseumBoardObject;
export type EditableMuseumSource = MuseumBoardSource;
