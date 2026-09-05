import { computed, DestroyRef, inject, Injectable, signal } from '@angular/core';

import {
  approveModeratorPrompt,
  assembleBroadcastTimeline,
  canFileTurn,
  castCategoryVote,
  castOpinionVote,
  completeDebateVoting,
  conveneDebatePremiere,
  createInitialDebateSession,
  createInitialDebateWorkspace,
  debateVotingComplete,
  editModeratorPrompt,
  fileDebateTurn,
  markPremiereComplete,
  persuasionShift,
  regenerateModeratorPrompt,
  releaseModeratorPrompt,
  submitDebateReflection,
  tallyVotes,
} from '../core/debate-studio-state';
import type {
  ArgumentMarker,
  DebateArgumentAnnotation,
  DebateBroadcastSegment,
  DebateConnectionState,
  DebateEvidence,
  DebateRecording,
  DebateRecordingKind,
  DebateRoom,
  DebateRuntimeEvent,
  DebateSession,
  DebateStation,
  DebateTurn,
  DebateVoteCategory,
  DebateWorkspaceState,
  EvidenceMark,
  ModeratorPrompt,
} from '../domain/debate-studio.models';
import {
  DEBATE_STUDIO_MEDIA,
  DEBATE_STUDIO_PERSISTENCE,
  DEBATE_STUDIO_SESSION,
  type DebateSessionLocator,
} from '../persistence/debate-studio.persistence';
import { DEBATE_STUDIO_CONFIG } from './debate-studio.tokens';

export interface DebateChoiceView {
  readonly id: string;
  readonly label: string;
  readonly detail?: string;
  readonly emblem?: string;
  readonly accent?: string;
}

@Injectable()
export class DebateStudioRuntimeService {
  readonly config = inject(DEBATE_STUDIO_CONFIG);
  private readonly sessionAdapter = inject(DEBATE_STUDIO_SESSION);
  private readonly mediaAdapter = inject(DEBATE_STUDIO_MEDIA);
  private readonly workspacePersistence = inject(DEBATE_STUDIO_PERSISTENCE);
  private readonly destroyRef = inject(DestroyRef);
  private readonly seedSession = createInitialDebateSession(this.config);
  private readonly locator: DebateSessionLocator = {
    projectId: this.config.projectId,
    projectVersion: this.config.projectVersion,
    classId: this.config.viewer.classId,
    sessionId: this.config.sessionId,
  };

  readonly session = signal<DebateSession>(this.seedSession);
  readonly state = signal<DebateWorkspaceState>(this.loadWorkspace());
  readonly actorId = signal(this.config.viewer.studentId);
  readonly activeFactionId = signal(this.previewFactionId());
  readonly connectionState = signal<DebateConnectionState>('connecting');
  readonly notice = signal<string | undefined>(undefined);
  readonly error = signal<string | undefined>(undefined);
  readonly saveState = signal<'saved' | 'saving' | 'local'>('saved');
  readonly teacherPreview = signal(this.previewTeacherMode());
  readonly moderatorDraft = signal('');
  readonly recordingState = signal<'idle' | 'requesting' | 'recording' | 'ready' | 'uploading'>(
    'idle',
  );
  readonly recordingPreviewUrl = signal<string | undefined>(undefined);
  readonly uploadProgress = signal(0);
  readonly filingAnimation = signal(false);
  readonly rehearsalRunning = signal(false);
  readonly sessionPlaying = signal(false);
  readonly segmentSecondsRemaining = signal(0);

  readonly viewerFaction = computed(() =>
    this.config.factions.find((faction) => faction.id === this.activeFactionId()),
  );
  readonly opponentFaction = computed(() =>
    this.config.factions.find((faction) => faction.id !== this.activeFactionId()),
  );
  readonly currentTurn = computed(() => this.turnForFaction(this.activeFactionId()));
  readonly currentRound = computed(() => {
    const turn = this.currentTurn();
    return (
      this.config.rounds.find((round) => round.id === turn?.roundId) ??
      this.config.rounds[this.session().currentRound]
    );
  });
  readonly previousOpponentTurn = computed(() => {
    const current = this.currentTurn();
    const ceiling = current?.order ?? Number.POSITIVE_INFINITY;
    return [...this.session().turns]
      .filter(
        (turn) =>
          turn.status === 'filed' &&
          turn.factionId !== this.activeFactionId() &&
          turn.order < ceiling,
      )
      .sort((left, right) => right.order - left.order)[0];
  });
  readonly currentModeratorPrompt = computed(() => {
    const current = this.currentTurn();
    if (current === undefined) return undefined;
    return this.session().moderatorQueue.find(
      (prompt) => prompt.targetTurnId === current.id && prompt.status === 'released',
    );
  });
  readonly pendingModeratorPrompt = computed(() =>
    [...this.session().moderatorQueue]
      .reverse()
      .find((prompt) => prompt.status === 'proposed' || prompt.status === 'approved'),
  );
  readonly opponentPassages = computed(() => {
    const transcript = this.previousOpponentTurn()?.transcript ?? '';
    return transcript
      .split(/(?<=[.!?])\s+/)
      .map((sentence) => sentence.trim())
      .filter((sentence) => sentence.length > 12);
  });
  readonly selectedEvidence = computed(() =>
    this.config.evidence.filter((item) => this.state().selectedEvidenceIds.includes(item.id)),
  );
  readonly filedTurnCount = computed(
    () => this.session().turns.filter((turn) => turn.status === 'filed').length,
  );
  readonly canFile = computed(() => {
    const round = this.currentRound();
    return (
      round !== undefined &&
      canFileTurn(round, this.state(), this.previousOpponentTurn() !== undefined)
    );
  });
  readonly program = computed(() => assembleBroadcastTimeline(this.config, this.session()));
  readonly activeSegment = computed(() => this.program()[this.state().activeSegmentIndex]);
  readonly persuasionResults = computed(() =>
    persuasionShift(this.session(), this.config.opinionOptions),
  );
  readonly preOpinion = computed(() => this.session().preVotes[this.actorId()]?.choiceId);
  readonly postOpinion = computed(() => this.session().postVotes[this.actorId()]?.choiceId);
  readonly ballotComplete = computed(() =>
    debateVotingComplete(this.config, this.session(), this.actorId()),
  );
  readonly canManageModerator = computed(
    () =>
      this.config.viewer.mode === 'teacher' ||
      (this.config.viewer.allowTeacherPreview && this.teacherPreview()),
  );
  readonly premiereCanPlay = computed(() =>
    ['premiere', 'voting', 'complete'].includes(this.session().status),
  );
  readonly chamberStage = computed<
    'opponent' | 'moderator' | 'your-turn' | 'waiting' | 'premiere-ready'
  >(() => {
    if (this.session().status === 'premiere-ready') return 'premiere-ready';
    const turn = this.currentTurn();
    if (turn === undefined) return 'waiting';
    const opponent = this.previousOpponentTurn();
    if (opponent !== undefined && this.state().opponentHeardTurnId !== opponent.id)
      return 'opponent';
    const prompt = this.currentModeratorPrompt();
    if (prompt !== undefined && this.state().moderatorHeardPromptId !== prompt.id)
      return 'moderator';
    return 'your-turn';
  });
  readonly chamberHeadline = computed(() => {
    switch (this.chamberStage()) {
      case 'opponent':
        return `${this.opponentFaction()?.shortName ?? 'The opposing faction'} has answered`;
      case 'moderator':
        return 'The Consul calls the next question';
      case 'your-turn':
        return 'The floor passes to your faction';
      case 'premiere-ready':
        return 'Senate session ready';
      default:
        return 'The Senate awaits the opposing faction';
    }
  });
  readonly chamberDetail = computed(() => {
    const current = this.currentTurn();
    switch (this.chamberStage()) {
      case 'opponent':
        return `Hear ${this.previousOpponentTurn()?.speakerDisplayName ?? 'the previous senator'} at the opposing lectern.`;
      case 'moderator':
        return 'The presiding dais is illuminated. Hear the question before taking the floor.';
      case 'your-turn':
        return `${current?.roundLabel ?? 'Your round'} · ${this.roleLabel(current)}`;
      case 'premiere-ready':
        return 'The doors are closed. The teacher may now convene the complete Senate broadcast.';
      default:
        return this.pendingModeratorPrompt() !== undefined
          ? 'A moderator question is awaiting teacher approval.'
          : 'Your team will be notified when the next turn is released.';
    }
  });

  private unsubscribeSession?: () => void;
  private eventSequence = 0;
  private mediaRecorder?: MediaRecorder;
  private mediaStream?: MediaStream;
  private mediaChunks: Blob[] = [];
  private pendingRecordingBlob?: Blob;
  private activeRecordingKind?: Exclude<DebateRecordingKind, 'transcript'>;
  private recordingStartedAt = 0;
  private rehearsalTimer?: ReturnType<typeof setInterval>;
  private recordingTimer?: ReturnType<typeof setInterval>;
  private sessionTimer?: ReturnType<typeof setInterval>;
  private draftSaveTimer?: ReturnType<typeof setTimeout>;
  private filingAnimationTimer?: ReturnType<typeof setTimeout>;

  constructor() {
    this.destroyRef.onDestroy(() => this.dispose());
    void this.connectSharedSession();
  }

  openStation(station: DebateStation): void {
    if (
      station === 'moderator' &&
      this.previousOpponentTurn() !== undefined &&
      this.state().opponentHeardTurnId !== this.previousOpponentTurn()?.id
    ) {
      this.error.set('Hear the previous argument before approaching the presiding dais.');
      return;
    }
    if (station === 'lectern' && this.chamberStage() !== 'your-turn') {
      this.error.set('The floor has not yet passed to your faction.');
      return;
    }
    if (station === 'premiere') {
      this.beginPremiere();
      return;
    }
    this.state.update((state) => ({ ...state, activeStation: station }));
    if (station === 'moderator')
      this.moderatorDraft.set(this.pendingModeratorPrompt()?.question ?? '');
  }

  closeStation(): void {
    this.state.update((state) => ({ ...state, activeStation: undefined }));
    this.saveWorkspace(this.state());
  }

  enterRoom(room: DebateRoom): void {
    this.stopSessionTimer();
    this.state.update((state) => ({ ...state, room, activeStation: undefined }));
    this.saveWorkspace(this.state());
  }

  toggleTeacherPreview(): void {
    if (!this.config.viewer.allowTeacherPreview) return;
    this.teacherPreview.update((value) => !value);
    this.state.update((state) => ({ ...state, activeStation: 'moderator' }));
    this.moderatorDraft.set(this.pendingModeratorPrompt()?.question ?? '');
  }

  markOpponentHeard(): void {
    const opponent = this.previousOpponentTurn();
    if (opponent === undefined) return;
    if (this.state().opponentPlaybackCompleteTurnId !== opponent.id) {
      this.error.set(
        'Finish the opposing contribution before carrying its claim into your record.',
      );
      return;
    }
    this.updateWorkspace({ opponentHeardTurnId: opponent.id });
    this.notice.set(
      'The previous argument is now part of your listening record. The Consul calls the next question.',
    );
    this.state.update((state) => ({ ...state, activeStation: undefined }));
  }

  markOpponentPlaybackComplete(): void {
    const opponent = this.previousOpponentTurn();
    if (opponent === undefined) return;
    this.updateWorkspace({ opponentPlaybackCompleteTurnId: opponent.id });
    this.notice.set(
      'The full opposing contribution has been heard. Mark a claim before proceeding.',
    );
  }

  markModeratorHeard(): void {
    const prompt = this.currentModeratorPrompt();
    if (prompt === undefined) return;
    this.updateWorkspace({ moderatorHeardPromptId: prompt.id });
    this.notice.set('The question is entered into your docket. Your lectern is now illuminated.');
    this.state.update((state) => ({ ...state, activeStation: 'lectern' }));
  }

  markOpponentPassage(excerpt: string, marker: ArgumentMarker): void {
    const source = this.previousOpponentTurn();
    if (source === undefined) return;
    const annotation: DebateArgumentAnnotation = {
      id: `annotation-${this.actorId()}-${source.id}-${Math.abs(hash(excerpt))}`,
      studentId: this.actorId(),
      sourceTurnId: source.id,
      excerpt,
      marker,
      createdAt: new Date().toISOString(),
    };
    this.updateWorkspace({
      annotations: [
        ...this.state().annotations.filter((item) => item.excerpt !== excerpt),
        annotation,
      ],
    });
    this.notice.set('That exact claim has been carried to your lectern.');
  }

  annotationFor(excerpt: string): DebateArgumentAnnotation | undefined {
    return this.state().annotations.find((annotation) => annotation.excerpt === excerpt);
  }

  speak(text: string): void {
    if (typeof speechSynthesis === 'undefined') {
      this.error.set('Read-aloud playback is unavailable. The complete transcript remains open.');
      return;
    }
    speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.92;
    utterance.pitch = 0.86;
    speechSynthesis.speak(utterance);
  }

  stopSpeaking(): void {
    if (typeof speechSynthesis !== 'undefined') speechSynthesis.cancel();
  }

  markEvidence(item: DebateEvidence, mark: EvidenceMark): void {
    this.updateWorkspace({ evidenceMarks: { ...this.state().evidenceMarks, [item.id]: mark } });
  }

  toggleEvidence(item: DebateEvidence): void {
    const selected = this.state().selectedEvidenceIds.includes(item.id);
    this.updateWorkspace({
      selectedEvidenceIds: selected
        ? this.state().selectedEvidenceIds.filter((id) => id !== item.id)
        : [...this.state().selectedEvidenceIds, item.id],
    });
  }

  updateDraft(draft: string): void {
    this.state.update((state) => ({ ...state, draft }));
    this.scheduleWorkspaceSave();
  }

  updateReasoningContribution(reasoningContribution: string): void {
    this.state.update((state) => ({ ...state, reasoningContribution }));
    this.scheduleWorkspaceSave();
  }

  updateReflection(reflection: string): void {
    this.state.update((state) => ({ ...state, reflection }));
    this.scheduleWorkspaceSave();
  }

  startRehearsal(): void {
    if (this.rehearsalRunning()) return;
    this.rehearsalRunning.set(true);
    this.rehearsalTimer = setInterval(() => {
      const seconds = this.state().rehearsalSeconds + 1;
      this.state.update((state) => ({ ...state, rehearsalSeconds: seconds }));
      if (seconds >= (this.currentRound()?.timeLimitSeconds ?? 60)) this.stopRehearsal();
    }, 1000);
  }

  stopRehearsal(): void {
    if (this.rehearsalTimer !== undefined) clearInterval(this.rehearsalTimer);
    this.rehearsalTimer = undefined;
    this.rehearsalRunning.set(false);
    const minimum = Math.min(5, this.currentRound()?.minimumSeconds ?? 5);
    this.updateWorkspace({ rehearsed: this.state().rehearsalSeconds >= minimum });
    this.notice.set(
      this.state().rehearsed
        ? 'Rehearsal complete. The recording lamp is ready.'
        : `Continue rehearsing for at least ${minimum} seconds in this preview.`,
    );
  }

  async startRecording(preferVideo = true): Promise<void> {
    if (typeof navigator === 'undefined' || navigator.mediaDevices?.getUserMedia === undefined) {
      this.error.set(
        'Camera and microphone recording are unavailable. Use the transcript accessibility option.',
      );
      return;
    }
    this.recordingState.set('requesting');
    this.error.set(undefined);
    let stream: MediaStream;
    let kind: Exclude<DebateRecordingKind, 'transcript'> = preferVideo ? 'video' : 'audio';
    try {
      stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: preferVideo });
    } catch {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        kind = 'audio';
      } catch {
        this.recordingState.set('idle');
        this.error.set('Recording permission was not granted. Your draft remains safe.');
        return;
      }
    }
    this.mediaStream = stream;
    this.activeRecordingKind = kind;
    this.mediaChunks = [];
    try {
      this.mediaRecorder = new MediaRecorder(stream);
    } catch {
      this.stopMediaTracks();
      this.recordingState.set('idle');
      this.error.set(
        'This browser cannot create a compatible recording. Use transcript-only access.',
      );
      return;
    }
    this.mediaRecorder.addEventListener('dataavailable', (event) => {
      if (event.data.size > 0) this.mediaChunks.push(event.data);
    });
    this.mediaRecorder.addEventListener('stop', () => this.finishRecording());
    this.recordingStartedAt = Date.now();
    this.mediaRecorder.start();
    this.recordingState.set('recording');
    this.recordingTimer = setInterval(() => {
      this.state.update((state) => ({
        ...state,
        recordingDurationSeconds: Math.max(
          1,
          Math.round((Date.now() - this.recordingStartedAt) / 1000),
        ),
      }));
    }, 1000);
  }

  stopRecording(): void {
    if (this.mediaRecorder?.state === 'recording') this.mediaRecorder.stop();
  }

  useTranscriptFallback(): void {
    this.clearRecording();
    this.recordingState.set('ready');
    this.updateWorkspace({
      recordingReady: true,
      recordingKind: 'transcript',
      recordingDurationSeconds: this.state().rehearsalSeconds,
    });
    this.notice.set('Transcript-only accessibility contribution selected.');
  }

  retakeRecording(): void {
    this.clearRecording();
    this.updateWorkspace({
      recordingReady: false,
      recordingKind: undefined,
      recordingDurationSeconds: 0,
    });
    this.recordingState.set('idle');
  }

  async fileSpeech(): Promise<void> {
    const turn = this.currentTurn();
    const round = this.currentRound();
    if (turn === undefined || round === undefined || !this.canFile()) {
      this.error.set(
        'The scribe still needs your listening mark, evidence, reasoning, rehearsal, and reviewed recording.',
      );
      return;
    }
    this.flushWorkspaceSave();
    this.error.set(undefined);
    let recording: DebateRecording | undefined;
    const selectedRecordingKind = this.state().recordingKind;
    if (
      selectedRecordingKind !== undefined &&
      selectedRecordingKind !== 'transcript' &&
      this.pendingRecordingBlob !== undefined
    ) {
      this.recordingState.set('uploading');
      this.uploadProgress.set(0);
      try {
        recording = await this.mediaAdapter.uploadRecording({
          locator: this.locator,
          turnId: turn.id,
          actorId: this.actorId(),
          blob: this.pendingRecordingBlob,
          kind: selectedRecordingKind,
          durationSeconds: this.state().recordingDurationSeconds,
          onProgress: (progress) => this.uploadProgress.set(progress),
        });
      } catch {
        this.recordingState.set('ready');
        this.error.set(
          'The recording could not be secured in Firebase Storage. Nothing was filed; try again.',
        );
        return;
      }
    }
    const now = new Date().toISOString();
    const event = this.event('debate.turnFiled', 'student', { turnId: turn.id });
    try {
      await this.mutateSession(event, (session) =>
        fileDebateTurn(this.config, session, turn.id, {
          speakerId: this.actorId(),
          speakerDisplayName: this.config.viewer.studentDisplayName,
          transcript: this.state().draft.trim(),
          evidenceIds: [...this.state().selectedEvidenceIds],
          opponentAnnotations: [...this.state().annotations],
          reasoningContribution: this.state().reasoningContribution.trim(),
          recording,
          durationSeconds: this.state().recordingDurationSeconds,
          filedAt: now,
        }),
      );
      this.filingAnimation.set(true);
      if (this.filingAnimationTimer !== undefined) clearTimeout(this.filingAnimationTimer);
      this.filingAnimationTimer = setTimeout(() => this.filingAnimation.set(false), 1600);
      this.notice.set(
        'The seal is set. The opposing faction and moderator have received your official argument.',
      );
      this.resetTurnWorkspace();
      this.recordingState.set('idle');
    } catch {
      this.recordingState.set('ready');
      this.error.set(
        'The shared Senate record did not accept the filing. Your draft and recording remain available.',
      );
    }
  }

  async approvePrompt(prompt: ModeratorPrompt): Promise<void> {
    if (!this.canManageModerator()) return;
    const now = new Date().toISOString();
    await this.mutateSession(
      this.event('debate.moderatorPromptApproved', 'teacher', { promptId: prompt.id }),
      (session) =>
        approveModeratorPrompt(session, prompt.id, this.config.viewer.teacherDisplayName, now),
    );
  }

  async saveModeratorEdit(prompt: ModeratorPrompt): Promise<void> {
    if (!this.canManageModerator() || this.moderatorDraft().trim().length < 20) return;
    await this.mutateSession(
      this.event('debate.moderatorPromptEdited', 'teacher', { promptId: prompt.id }),
      (session) => editModeratorPrompt(session, prompt.id, this.moderatorDraft()),
    );
    this.notice.set('The revised question is ready for approval.');
  }

  async regeneratePrompt(prompt: ModeratorPrompt): Promise<void> {
    if (!this.canManageModerator()) return;
    const now = new Date().toISOString();
    await this.mutateSession(
      this.event('debate.moderatorPromptRegenerated', 'teacher', { promptId: prompt.id }),
      (session) => regenerateModeratorPrompt(this.config, session, prompt.id, now),
    );
    this.moderatorDraft.set('');
  }

  async releasePrompt(prompt: ModeratorPrompt): Promise<void> {
    if (!this.canManageModerator()) return;
    const now = new Date().toISOString();
    await this.mutateSession(
      this.event('debate.moderatorPromptReleased', 'teacher', { promptId: prompt.id }),
      (session) =>
        releaseModeratorPrompt(
          this.config,
          session,
          prompt.id,
          this.config.viewer.teacherDisplayName,
          now,
        ),
    );
    this.notice.set('The Consul’s question has been released. The next faction has the floor.');
  }

  castPreOpinion(choiceId: string): void {
    const now = new Date().toISOString();
    void this.mutateSession(
      this.event('debate.preOpinionCast', 'student', { choiceId }),
      (session) =>
        castOpinionVote(session, 'pre', { studentId: this.actorId(), choiceId, castAt: now }),
    ).catch(() =>
      this.error.set('Your initial opinion could not reach the shared Senate. Please try again.'),
    );
  }

  castPostOpinion(choiceId: string): void {
    const now = new Date().toISOString();
    void this.mutateSession(
      this.event('debate.postOpinionCast', 'student', { choiceId }),
      (session) =>
        castOpinionVote(session, 'post', { studentId: this.actorId(), choiceId, castAt: now }),
    ).catch(() =>
      this.error.set(
        'Your post-debate opinion could not reach the shared Senate. Please try again.',
      ),
    );
  }

  castCategory(categoryId: string, choiceId: string): void {
    const now = new Date().toISOString();
    this.state.update((state) => ({
      ...state,
      categorySelections: { ...state.categorySelections, [categoryId]: choiceId },
    }));
    void this.mutateSession(
      this.event('debate.categoryVoteCast', 'student', { categoryId, choiceId }),
      (session) =>
        castCategoryVote(session, categoryId, { studentId: this.actorId(), choiceId, castAt: now }),
    ).catch(() =>
      this.error.set('That clay token could not reach the shared voting urn. Please try again.'),
    );
  }

  async submitReflection(): Promise<void> {
    const now = new Date().toISOString();
    await this.mutateSession(this.event('debate.reflectionSubmitted', 'student'), (session) =>
      submitDebateReflection(session, this.actorId(), this.state().reflection, now),
    );
  }

  async sealBallot(): Promise<void> {
    if (!this.ballotComplete()) {
      this.error.set(
        'Complete the post-debate opinion, every judgment, and your reflection before sealing the urn.',
      );
      return;
    }
    const now = new Date().toISOString();
    await this.mutateSession(this.event('debate.ballotSealed', 'student'), (session) =>
      completeDebateVoting(this.config, session, this.actorId(), now),
    );
    this.enterRoom('verdict');
  }

  beginPremiere(): void {
    this.stopSpeaking();
    this.stopSessionTimer();
    this.state.update((state) => ({
      ...state,
      room: 'premiere',
      activeStation: undefined,
      activeSegmentIndex: 0,
    }));
    this.segmentSecondsRemaining.set(this.segmentDuration(this.program()[0]));
    if (this.session().status === 'premiere-ready' && this.canManageModerator()) {
      const now = new Date().toISOString();
      void this.mutateSession(this.event('debate.premiereConvened', 'teacher'), (session) =>
        conveneDebatePremiere(session, now),
      ).catch(() =>
        this.error.set('The shared Senate could not be convened. The sealed record is unchanged.'),
      );
    } else if (this.session().status === 'premiere-ready') {
      this.notice.set(
        'The complete record is sealed. The teacher will convene the class premiere.',
      );
    }
  }

  playSession(): void {
    if (!this.premiereCanPlay()) {
      this.error.set(
        'Continuous playback begins when the teacher convenes the completed Senate session.',
      );
      return;
    }
    const segment = this.activeSegment();
    if (segment === undefined) return;
    this.stopSessionTimer();
    this.sessionPlaying.set(true);
    this.state.update((state) => ({ ...state, premierePlaying: true }));
    if (segment.recording !== undefined) return;
    this.speak(segment.transcript);
    if (this.segmentSecondsRemaining() <= 0)
      this.segmentSecondsRemaining.set(this.segmentDuration(segment));
    this.sessionTimer = setInterval(() => {
      const next = this.segmentSecondsRemaining() - 1;
      this.segmentSecondsRemaining.set(Math.max(0, next));
      if (next <= 0) this.nextSegment(true);
    }, 1000);
  }

  pauseSession(): void {
    this.stopSessionTimer();
    this.stopSpeaking();
    this.state.update((state) => ({ ...state, premierePlaying: false }));
  }

  nextSegment(continuePlaying = false): void {
    const current = this.state().activeSegmentIndex;
    if (current >= this.program().length - 1) {
      this.stopSessionTimer();
      this.stopSpeaking();
      if (this.session().status === 'premiere' && this.canManageModerator()) {
        const now = new Date().toISOString();
        void this.mutateSession(this.event('debate.premiereCompleted', 'teacher'), (session) =>
          markPremiereComplete(session, now),
        )
          .then(() => this.enterRoom('ballot'))
          .catch(() =>
            this.error.set('The voting urns could not be opened. The premiere remains available.'),
          );
      } else if (['voting', 'complete'].includes(this.session().status)) {
        this.enterRoom('ballot');
      } else if (this.session().status === 'premiere') {
        this.notice.set('The teacher will open the voting urns after the class premiere.');
      } else {
        this.notice.set(
          'This is a preview of the record so far. Voting unlocks after both final addresses are filed.',
        );
      }
      return;
    }
    this.stopSessionTimer();
    this.stopSpeaking();
    const nextIndex = current + 1;
    this.state.update((state) => ({
      ...state,
      activeSegmentIndex: nextIndex,
      premierePlaying: continuePlaying,
    }));
    this.segmentSecondsRemaining.set(this.segmentDuration(this.program()[nextIndex]));
    if (continuePlaying) setTimeout(() => this.playSession());
  }

  previousSegment(): void {
    this.stopSessionTimer();
    this.stopSpeaking();
    const nextIndex = Math.max(0, this.state().activeSegmentIndex - 1);
    this.state.update((state) => ({
      ...state,
      activeSegmentIndex: nextIndex,
      premierePlaying: false,
    }));
    this.segmentSecondsRemaining.set(this.segmentDuration(this.program()[nextIndex]));
  }

  recordedSegmentEnded(): void {
    if (this.sessionPlaying()) this.nextSegment(true);
  }

  openBallot(): void {
    if (!['voting', 'complete'].includes(this.session().status)) {
      this.error.set('The voting urns remain sealed until the complete Senate premiere has ended.');
      return;
    }
    this.enterRoom('ballot');
  }

  revealNext(): void {
    const max = this.config.voteCategories.length + 1;
    this.state.update((state) => ({ ...state, verdictStep: Math.min(max, state.verdictStep + 1) }));
  }

  voteOptions(category: DebateVoteCategory): readonly DebateChoiceView[] {
    if (category.optionSource === 'factions') {
      return this.config.factions.map((faction) => ({
        id: faction.id,
        label: faction.name,
        detail: faction.position,
        emblem: faction.emblem,
        accent: faction.accent,
      }));
    }
    const turns = this.session().turns.filter((turn) => turn.status === 'filed');
    if (category.optionSource === 'speakers') {
      return [
        ...new Map(
          turns
            .filter((turn) => turn.speakerId !== undefined)
            .map((turn) => [
              turn.speakerId as string,
              {
                id: turn.speakerId as string,
                label: turn.speakerDisplayName ?? 'Student senator',
                detail: this.faction(turn.factionId)?.shortName,
              },
            ]),
        ).values(),
      ];
    }
    return turns.map((turn) => ({
      id: turn.id,
      label: `${turn.speakerDisplayName ?? 'Student senator'} · ${turn.roundLabel}`,
      detail: excerpt(turn.transcript ?? '', 90),
    }));
  }

  categoryTally(categoryId: string): Readonly<Record<string, number>> {
    return tallyVotes(this.session().categoryVotes[categoryId]);
  }

  winningChoice(categoryId: string): string | undefined {
    return Object.entries(this.categoryTally(categoryId)).sort(
      (left, right) => right[1] - left[1],
    )[0]?.[0];
  }

  faction(factionId: string | undefined) {
    return this.config.factions.find((faction) => faction.id === factionId);
  }

  roleLabel(turn: DebateTurn | undefined): string {
    const faction = this.faction(turn?.factionId);
    return (
      faction?.roles.find((role) => role.id === turn?.assignedRoleId)?.label ?? 'Student Senator'
    );
  }

  evidenceTitle(evidenceId: string): string {
    return this.config.evidence.find((item) => item.id === evidenceId)?.title ?? evidenceId;
  }

  markerLabel(marker: ArgumentMarker): string {
    return {
      'answer-this': 'Answer This',
      'challenge-this': 'Challenge This',
      'strong-evidence': 'Strong Evidence',
      'weak-evidence': 'Weak Evidence',
      'needs-context': 'Needs Context',
      'save-for-closing': 'Save for Closing',
    }[marker];
  }

  clearNotice(): void {
    this.notice.set(undefined);
    this.error.set(undefined);
  }

  clearLocalDraft(): void {
    this.resetTurnWorkspace();
    this.notice.set(
      'Only your unfiled local preparation was cleared. The shared Senate record was not changed.',
    );
  }

  formatTime(totalSeconds: number): string {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }

  segmentDuration(segment: DebateBroadcastSegment | undefined): number {
    if (segment === undefined) return 0;
    return Math.max(
      segment.durationSeconds,
      Math.ceil(segment.transcript.trim().split(/\s+/).length / 2.1) + 2,
    );
  }

  private async connectSharedSession(): Promise<void> {
    try {
      const preferredFactionId = this.previewFactionId();
      const connection = await this.sessionAdapter.initialize(this.locator, this.seedSession, {
        displayName: this.config.viewer.studentDisplayName,
        factionId: preferredFactionId,
        role: this.config.viewer.mode === 'teacher' ? 'teacher' : 'student',
        joinedAt: new Date().toISOString(),
      });
      this.actorId.set(connection.actorId);
      this.activeFactionId.set(
        connection.session.members[connection.actorId]?.factionId ?? preferredFactionId,
      );
      this.acceptSession(connection.session);
      this.connectionState.set('shared');
      this.unsubscribeSession = this.sessionAdapter.subscribe(
        this.locator,
        (session) => this.acceptSession(session),
        () => {
          this.connectionState.set('error');
          this.error.set(
            'The shared Senate connection was interrupted. Official actions are paused.',
          );
        },
      );
    } catch {
      this.connectionState.set('error');
      this.error.set(
        'Firebase could not open the shared Senate. Check Anonymous Authentication and database rules.',
      );
    }
  }

  private acceptSession(session: DebateSession): void {
    const priorTurnId = this.state().activeTurnId;
    const priorOpponentTurnId = this.previousOpponentTurn()?.id;
    this.session.set(session);
    const nextTurnId = this.turnForFaction(this.activeFactionId())?.id;
    if (priorTurnId !== undefined && nextTurnId !== priorTurnId) this.resetTurnWorkspace();
    else if (priorTurnId === undefined && nextTurnId !== undefined) {
      this.state.update((state) => ({ ...state, activeTurnId: nextTurnId }));
    }

    const incomingTurn = this.previousOpponentTurn();
    if (
      incomingTurn !== undefined &&
      incomingTurn.id !== priorOpponentTurnId &&
      this.state().opponentHeardTurnId !== incomingTurn.id
    ) {
      this.state.update((state) => ({ ...state, activeStation: 'opponent' }));
      this.notice.set('A new opposing argument has crossed the chamber. Hear it before replying.');
    }
  }

  private turnForFaction(factionId: string): DebateTurn | undefined {
    const activeId = this.state().activeTurnId;
    const eligible = this.session()
      .turns.filter(
        (turn) => turn.factionId === factionId && ['available', 'drafting'].includes(turn.status),
      )
      .sort((left, right) => left.order - right.order);
    return eligible.find((turn) => turn.id === activeId) ?? eligible[0];
  }

  private async mutateSession(
    event: DebateRuntimeEvent,
    reducer: (session: DebateSession) => DebateSession,
  ): Promise<DebateSession> {
    if (this.connectionState() === 'error') throw new Error('DEBATE_SESSION_UNAVAILABLE');
    const result = await this.sessionAdapter.mutate(
      this.locator,
      this.seedSession,
      event.clientEventId,
      (session) => {
        const reduced = reducer(session);
        return {
          ...reduced,
          eventHistory: [...reduced.eventHistory.slice(-99), event],
        };
      },
    );
    this.acceptSession(result);
    return result;
  }

  private event(
    eventType: string,
    actorType: 'student' | 'teacher' | 'system',
    payload?: Readonly<Record<string, unknown>>,
  ): DebateRuntimeEvent {
    this.eventSequence += 1;
    const clientEventId = `debate-${Date.now()}-${this.eventSequence}`;
    return {
      id: clientEventId,
      clientEventId,
      eventType,
      timestamp: new Date().toISOString(),
      projectId: this.config.projectId,
      actor: {
        type: actorType,
        id: actorType === 'teacher' ? this.config.viewer.teacherDisplayName : this.actorId(),
      },
      payload,
    };
  }

  private finishRecording(): void {
    if (this.recordingTimer !== undefined) clearInterval(this.recordingTimer);
    this.recordingTimer = undefined;
    const kind = this.activeRecordingKind ?? 'audio';
    const contentType =
      this.mediaRecorder?.mimeType || (kind === 'video' ? 'video/webm' : 'audio/webm');
    this.pendingRecordingBlob = new Blob(this.mediaChunks, { type: contentType });
    const priorUrl = this.recordingPreviewUrl();
    if (priorUrl !== undefined) URL.revokeObjectURL(priorUrl);
    this.recordingPreviewUrl.set(URL.createObjectURL(this.pendingRecordingBlob));
    this.stopMediaTracks();
    this.recordingState.set('ready');
    this.updateWorkspace({
      recordingReady: true,
      recordingKind: kind,
      recordingDurationSeconds: Math.max(
        1,
        Math.round((Date.now() - this.recordingStartedAt) / 1000),
      ),
    });
    this.notice.set('Watch or listen to the full recording. You may record again before filing.');
  }

  private updateWorkspace(patch: Partial<DebateWorkspaceState>): void {
    this.state.update((state) => ({ ...state, ...patch }));
    this.saveWorkspace(this.state());
  }

  private scheduleWorkspaceSave(): void {
    if (this.draftSaveTimer !== undefined) clearTimeout(this.draftSaveTimer);
    this.saveState.set('saving');
    this.draftSaveTimer = setTimeout(() => this.flushWorkspaceSave(), 500);
  }

  private flushWorkspaceSave(): void {
    if (this.draftSaveTimer !== undefined) clearTimeout(this.draftSaveTimer);
    this.draftSaveTimer = undefined;
    this.saveWorkspace(this.state());
  }

  private saveWorkspace(state: DebateWorkspaceState): void {
    try {
      this.workspacePersistence.save(
        this.config.projectId,
        this.config.projectVersion,
        this.config.sessionId,
        this.config.viewer.studentId,
        state,
      );
      this.saveState.set('saved');
    } catch {
      this.saveState.set('local');
    }
  }

  private loadWorkspace(): DebateWorkspaceState {
    const initial = createInitialDebateWorkspace();
    const loaded = this.workspacePersistence.load(
      this.config.projectId,
      this.config.projectVersion,
      this.config.sessionId,
      this.config.viewer.studentId,
    );
    if (loaded === undefined) return initial;
    return {
      ...initial,
      ...loaded,
      annotations: [...loaded.annotations],
      selectedEvidenceIds: [...loaded.selectedEvidenceIds],
      evidenceMarks: { ...loaded.evidenceMarks },
      categorySelections: { ...loaded.categorySelections },
      room: 'chamber',
      activeStation: undefined,
      premierePlaying: false,
    };
  }

  private resetTurnWorkspace(activeStation?: DebateStation): void {
    this.clearRecording();
    const room = this.state().room;
    const next = { ...createInitialDebateWorkspace(), room, activeStation };
    this.state.set(next);
    this.workspacePersistence.clear(
      this.config.projectId,
      this.config.projectVersion,
      this.config.sessionId,
      this.config.viewer.studentId,
    );
  }

  private clearRecording(): void {
    if (this.recordingTimer !== undefined) clearInterval(this.recordingTimer);
    this.recordingTimer = undefined;
    this.stopMediaTracks();
    this.pendingRecordingBlob = undefined;
    const url = this.recordingPreviewUrl();
    if (url !== undefined) URL.revokeObjectURL(url);
    this.recordingPreviewUrl.set(undefined);
  }

  private stopMediaTracks(): void {
    this.mediaStream?.getTracks().forEach((track) => track.stop());
    this.mediaStream = undefined;
    this.mediaRecorder = undefined;
  }

  private stopSessionTimer(): void {
    if (this.sessionTimer !== undefined) clearInterval(this.sessionTimer);
    this.sessionTimer = undefined;
    this.sessionPlaying.set(false);
  }

  private dispose(): void {
    if (this.rehearsalTimer !== undefined) clearInterval(this.rehearsalTimer);
    if (this.draftSaveTimer !== undefined) clearTimeout(this.draftSaveTimer);
    if (this.filingAnimationTimer !== undefined) clearTimeout(this.filingAnimationTimer);
    this.stopSessionTimer();
    this.stopSpeaking();
    this.clearRecording();
    this.unsubscribeSession?.();
  }

  private previewFactionId(): string {
    if (typeof location === 'undefined' || this.config.viewer.mode !== 'preview')
      return this.config.viewer.factionId;
    const requested = new URLSearchParams(location.search).get('faction');
    return this.config.factions.some((faction) => faction.id === requested)
      ? (requested as string)
      : this.config.viewer.factionId;
  }

  private previewTeacherMode(): boolean {
    return (
      this.config.viewer.allowTeacherPreview &&
      typeof location !== 'undefined' &&
      new URLSearchParams(location.search).get('view') === 'teacher'
    );
  }
}

function hash(value: string): number {
  let result = 0;
  for (const character of value) result = (result * 31 + character.charCodeAt(0)) | 0;
  return result;
}

function excerpt(value: string, length: number): string {
  return value.length > length ? `${value.slice(0, length - 1).trim()}…` : value;
}
