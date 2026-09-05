import {
  historyLiveEvents,
  historyLiveCommands,
  type HistoryLiveEventType,
} from './history-live-capabilities';
import {
  stageIssues,
  sourceUsable,
  validateHistoryLiveContent,
} from '../core/history-live-quality';
import { computed, inject, Injectable, signal, OnDestroy } from '@angular/core';

import {
  createInitialHistoryLiveState,
  EMPTY_PITCH,
  interleaveBroadcastSegments,
  isPitchReady,
  validateHistoryLiveVisualConfig,
} from '../core/history-live-state';
import type {
  BroadcastSegment,
  HistoryLiveEvidenceLink,
  ClaimStatus,
  HistoryLivePitch,
  HistoryLiveRole,
  HistoryLiveRuntimeEvent,
  HistoryLiveRuntimeState,
  HistoryLiveSide,
  HistoryLiveStage,
  HistoryLiveStoryLead,
  ReportFormat,
  ScriptBlockType,
} from '../domain/history-live.models';
import { HISTORY_LIVE_PERSISTENCE } from '../persistence/history-live.persistence';
import {
  HISTORY_LIVE_CONFIG,
  HISTORY_LIVE_ENROLLMENT,
  HISTORY_LIVE_AUTHORITY,
  HISTORY_LIVE_MEDIA,
} from './history-live.tokens';

@Injectable()
export class HistoryLiveRuntimeService implements OnDestroy {
  readonly config = inject(HISTORY_LIVE_CONFIG);
  readonly viewer = inject(HISTORY_LIVE_ENROLLMENT);
  private readonly authority = inject(HISTORY_LIVE_AUTHORITY, { optional: true });
  readonly media = inject(HISTORY_LIVE_MEDIA, { optional: true });
  readonly busy = signal(false);
  private loadError?: string;
  private saveTimer?: ReturnType<typeof setTimeout>;
  private disposed = false;
  private recordingGeneration = 0;
  private readonly flushListener = () => this.flushDrafts();
  private readonly persistence = inject(HISTORY_LIVE_PERSISTENCE);
  private readonly initial = createInitialHistoryLiveState(this.config);

  readonly state = signal<HistoryLiveRuntimeState>(this.load());
  readonly notification = signal<string | undefined>(undefined);
  readonly error = signal<string | undefined>(this.loadError);
  readonly saveState = signal<'saved' | 'saving' | 'unsaved' | 'error'>(
    this.loadError ? 'error' : 'saved',
  );
  readonly recordingState = signal<'idle' | 'requesting' | 'recording' | 'ready'>('idle');
  readonly recordingUrl = signal<string | undefined>(undefined);

  readonly selectedNetwork = computed(() =>
    this.config.networks.find((network) => network.side === this.state().selectedSide),
  );
  readonly availableLeads = computed(() =>
    this.config.storyLeads.filter((lead) => lead.side === this.state().selectedSide),
  );
  readonly assignmentScene = computed(() =>
    this.config.assignmentScenes.find((scene) => scene.side === this.state().selectedSide),
  );
  readonly pitchReady = computed(() => isPitchReady(this.state().pitch));
  readonly savedSources = computed(() =>
    this.config.sources.filter((source) => this.state().savedSourceIds.includes(source.id)),
  );
  readonly selectedSource = computed(() =>
    this.config.sources.find((source) => source.id === this.state().selectedSourceId),
  );
  readonly activeSegment = computed(() => this.state().schedule[this.state().activeSegmentIndex]);
  readonly completion = computed(
    () =>
      [
        'assignment',
        'pitch',
        'sources',
        'script',
        'production',
        'broadcast',
        'schedule',
        'showcase',
      ].filter(
        (stage) => stageIssues(this.state(), stage as HistoryLiveStage, this.config).length === 0,
      ).length,
  );
  readonly configurationErrors = [
    ...validateHistoryLiveVisualConfig(this.config),
    ...validateHistoryLiveContent(this.config),
  ];
  readonly isDemo = this.viewer.mode === 'demo';
  readonly canProduce = computed(() =>
    this.isDemo
      ? this.state().role === 'producer'
      : this.viewer.role === 'producer' && this.viewer.permissions.includes('history-live.produce'),
  );
  readonly readiness = computed(() => stageIssues(this.state(), 'broadcast', this.config));
  readonly currentStudentSegmentId = `segment-${this.viewer.studentId}`;

  private eventSequence = 0;
  private mediaRecorder?: MediaRecorder;
  private mediaStream?: MediaStream;
  private mediaChunks: Blob[] = [];

  constructor() {
    if (this.configurationErrors.length) this.error.set(this.configurationErrors.join(' '));
    if (typeof window !== 'undefined') {
      window.addEventListener('pagehide', this.flushListener);
      window.addEventListener('beforeunload', this.flushListener);
    }
    if (this.state().recordingAssetId) void this.restoreRecording(this.state().recordingAssetId!);
  }

  ngOnDestroy(): void {
    this.flushDrafts();
    this.disposed = true;
    this.recordingGeneration++;
    this.stopMediaTracks();
    if (this.recordingUrl()?.startsWith('blob:')) URL.revokeObjectURL(this.recordingUrl()!);
    if (typeof window !== 'undefined') {
      window.removeEventListener('pagehide', this.flushListener);
      window.removeEventListener('beforeunload', this.flushListener);
    }
  }

  flushDrafts(): void {
    if (this.saveTimer) {
      clearTimeout(this.saveTimer);
      this.saveTimer = undefined;
    }
    if (this.saveState() === 'unsaved' || this.saveState() === 'error') this.save(this.state());
  }

  stageIssues(stage: HistoryLiveStage): readonly string[] {
    return stageIssues(this.state(), stage, this.config);
  }
  sourceUsable(sourceId: string): boolean {
    const source = this.config.sources.find((item) => item.id === sourceId);
    return !!source && sourceUsable(source, this.state());
  }

  setRole(role: HistoryLiveRole): void {
    if (!this.isDemo) {
      this.error.set('PERMISSION_DENIED: Your classroom role is assigned by your school.');
      return;
    }
    this.commit(
      'viewer.roleChanged',
      (state) => ({
        ...state,
        role,
        stage: role === 'producer' ? 'schedule' : state.pitch.beatId ? 'pitch' : 'side',
      }),
      role === 'producer' ? 'teacher' : 'student',
    );
    this.notification.set(
      role === 'producer'
        ? `Producer console opened for ${this.viewer.teacherDisplayName}.`
        : `Reporter workspace opened for ${this.viewer.studentDisplayName}.`,
    );
  }

  goTo(stage: HistoryLiveStage): void {
    if (!this.canOpen(stage)) {
      this.error.set(this.stageIssues(stage).join(' '));
      return;
    }
    this.commit('workflow.stageOpened', (current) => ({ ...current, stage }), 'student', {
      stage,
    });
    this.error.set(undefined);
  }

  canOpen(stage: HistoryLiveStage): boolean {
    return (
      !this.configurationErrors.length &&
      (this.canProduce() || this.stageIssues(stage).length === 0)
    );
  }

  chooseSide(side: HistoryLiveSide): void {
    if (this.state().sideLocked) {
      this.error.set('Your network is locked after pitch approval. Ask the producer to reopen it.');
      return;
    }
    this.commit('network.selected', (state) => ({
      ...state,
      ...createInitialHistoryLiveState(this.config),
      role: state.role,
      selectedSide: side,
      pitch: { ...EMPTY_PITCH },
      savedSourceIds: [],
      claims: [],
      stage: 'assignment',
    }));
    this.notification.set(`${this.networkName(side)} newsroom credentials activated.`);
  }

  claimStory(lead: HistoryLiveStoryLead): void {
    if (lead.side !== this.state().selectedSide || this.state().sideLocked) {
      this.error.set('Reopen your approved pitch before changing stories.');
      return;
    }
    const pitch: HistoryLivePitch = {
      leadId: lead.id,
      asOfDate: lead.asOfDate ?? '',
      reportingMode: 'contemporary',
      beatId: lead.beatId,
      headline: lead.headline,
      storyQuestion: lead.question,
      whyAirtime: lead.whyNow,
      reportFormat: lead.format,
      evidenceNeeded: 'At least two credible sources, including one primary source.',
      initialPrediction: '',
      opposingChallenge: '',
      status: 'draft',
    };
    this.commit('story.claimed', (state) => ({ ...state, pitch, stage: 'pitch' }), 'student', {
      leadId: lead.id,
    });
  }

  pitchOwnStory(beatId = this.config.beats[0]?.id ?? 'breaking'): void {
    if (this.state().sideLocked) {
      this.error.set('Reopen your approved pitch before changing stories.');
      return;
    }
    this.commit('story.customPitchStarted', (state) => ({
      ...state,
      pitch: { ...EMPTY_PITCH, beatId },
      stage: 'pitch',
    }));
  }

  updatePitch(
    field:
      | 'asOfDate'
      | 'reportingMode'
      | 'beatId'
      | 'headline'
      | 'storyQuestion'
      | 'whyAirtime'
      | 'evidenceNeeded'
      | 'initialPrediction'
      | 'opposingChallenge',
    value: string,
  ): void {
    this.commit(
      'pitch.draftChanged',
      (state) => ({
        ...state,
        pitch: { ...state.pitch, [field]: value, status: 'draft' },
      }),
      'student',
      undefined,
      false,
    );
  }

  setReportFormat(reportFormat: ReportFormat): void {
    this.commit(
      'pitch.formatChanged',
      (state) => ({
        ...state,
        pitch: { ...state.pitch, reportFormat, status: 'draft' },
      }),
      'student',
      undefined,
      false,
    );
  }

  async submitPitch(): Promise<void> {
    if (!this.pitchReady()) {
      this.error.set(
        'Complete the pitch, reporting date, initial prediction, and opposing challenge.',
      );
      return;
    }
    if (this.state().pitch.status === 'submitted' || this.state().pitch.status === 'approved')
      return;
    await this.authorized('pitch.submit', false, () =>
      this.commit('pitch.submitted', (state) => ({
        ...state,
        pitch: { ...state.pitch, status: 'submitted' },
        pitchHistory: [
          ...(state.pitchHistory ?? []),
          { pitch: structuredClone(state.pitch), timestamp: new Date().toISOString() },
        ],
      })),
    );
    if (!this.error())
      this.notification.set(
        this.isDemo
          ? 'Demo pitch submitted. Switch to Demo producer to review it.'
          : 'Pitch submitted for producer review.',
      );
  }

  async reviewPitch(decision: 'approved' | 'revise', feedback: string): Promise<void> {
    if (this.state().pitch.status !== 'submitted') return;
    if (decision === 'revise' && feedback.trim().length < 8) {
      this.error.set('Explain what the reporter should revise.');
      return;
    }
    await this.authorized(
      'pitch.review',
      true,
      () =>
        this.commit(
          'pitch.reviewed',
          (state) => ({
            ...state,
            sideLocked: decision === 'approved',
            pitch: { ...state.pitch, status: decision, feedback },
            reviewHistory: [
              ...(state.reviewHistory ?? []),
              { target: 'pitch', decision, feedback, timestamp: new Date().toISOString() },
            ],
          }),
          'teacher',
        ),
      { decision, feedback },
    );
  }

  async reopenPitch(): Promise<void> {
    await this.authorized('pitch.reopen', true, () =>
      this.commit(
        'pitch.reopened',
        (state) => ({
          ...state,
          sideLocked: false,
          pitch: { ...state.pitch, status: 'revise' },
          studentSegmentReady: false,
          packageStatus: 'draft',
        }),
        'teacher',
      ),
    );
  }

  selectSource(sourceId: string): void {
    this.commit(
      'source.opened',
      (state) => ({ ...state, selectedSourceId: sourceId }),
      'student',
      {
        sourceId,
      },
      false,
    );
  }

  closeSource(): void {
    this.commit(
      'source.closed',
      (state) => ({ ...state, selectedSourceId: undefined }),
      'student',
      undefined,
      false,
    );
  }

  toggleSource(sourceId: string): void {
    if (!this.config.sources.some((source) => source.id === sourceId)) return;
    const saved = this.state().savedSourceIds.includes(sourceId);
    this.commit(
      saved ? 'source.removed' : 'source.saved',
      (state) => ({
        ...state,
        savedSourceIds: saved
          ? state.savedSourceIds.filter((id) => id !== sourceId)
          : [...state.savedSourceIds, sourceId],
      }),
      'student',
      { sourceId },
    );
    this.notification.set(
      saved ? 'Source removed from your story.' : 'Source pinned to your story.',
    );
  }

  updateClaimDraft(draft: NonNullable<HistoryLiveRuntimeState['claimDraft']>): void {
    this.commit(
      'claim.draftChanged',
      (state) => ({ ...state, claimDraft: draft }),
      'student',
      undefined,
      false,
    );
  }

  addClaim(
    text: string,
    status: ClaimStatus,
    evidence: readonly HistoryLiveEvidenceLink[] = [],
    reasoning = '',
    uncertainty = '',
  ): void {
    if (
      text.trim().length < 12 ||
      reasoning.trim().length < 12 ||
      !evidence.some((link) => link.relationship === 'supports') ||
      evidence.some(
        (link) =>
          link.passage.trim().length < 8 || !this.state().savedSourceIds.includes(link.sourceId),
      )
    ) {
      this.error.set(
        'Write a complete claim, select a supporting passage, and explain your reasoning.',
      );
      return;
    }
    if (
      ['uncertain', 'disputed', 'partially-supported'].includes(status) &&
      uncertainty.trim().length < 12
    ) {
      this.error.set('Explain the limits or uncertainty viewers need to hear.');
      return;
    }
    const id = crypto.randomUUID();
    this.commit(
      'claim.created',
      (state) => ({
        ...state,
        claimDraft: undefined,
        claims: [
          ...state.claims,
          {
            id,
            text: text.trim(),
            status,
            evidence,
            reasoning,
            uncertainty,
            supportingSourceIds: evidence
              .filter((link) => link.relationship === 'supports')
              .map((link) => link.sourceId),
          },
        ],
      }),
      'student',
      { claimId: id },
    );
    this.error.set(undefined);
    this.notification.set('Claim and specific evidence added.');
  }

  removeClaim(claimId: string): void {
    this.commit(
      'claim.removed',
      (state) => ({
        ...state,
        claims: state.claims.filter((claim) => claim.id !== claimId),
      }),
      'student',
      { claimId },
    );
  }

  updateScriptBlock(blockId: string, text: string): void {
    this.commit(
      'script.draftChanged',
      (state) => ({
        ...state,
        scriptBlocks: state.scriptBlocks.map((block) =>
          block.id === blockId ? { ...block, text } : block,
        ),
      }),
      'student',
      undefined,
      false,
    );
  }

  setScriptBlockType(blockId: string, type: ScriptBlockType): void {
    this.commit(
      'script.blockTypeChanged',
      (state) => ({
        ...state,
        scriptBlocks: state.scriptBlocks.map((block) =>
          block.id === blockId ? { ...block, type } : block,
        ),
      }),
      'student',
      undefined,
      false,
    );
  }

  addScriptBlock(type: ScriptBlockType): void {
    this.commit(
      'script.blockAdded',
      (state) => ({
        ...state,
        scriptBlocks: [
          ...state.scriptBlocks,
          { id: `script-${state.revision + 1}`, type, text: '' },
        ],
      }),
      'student',
      { type },
    );
  }

  removeScriptBlock(blockId: string): void {
    if (this.state().scriptBlocks.length <= 1) return;
    this.commit(
      'script.blockRemoved',
      (state) => ({
        ...state,
        scriptBlocks: state.scriptBlocks.filter((block) => block.id !== blockId),
      }),
      'student',
      { blockId },
    );
  }

  updateScene(
    sceneId: string,
    field: 'camera' | 'mediaType' | 'sourceId' | 'caption',
    value: string,
  ): void {
    this.commit(
      'production.sceneChanged',
      (state) => ({
        ...state,
        visualSequence: state.visualSequence.map((scene) =>
          scene.id === sceneId ? { ...scene, [field]: value } : scene,
        ),
      }),
      'student',
      undefined,
      false,
    );
  }

  linkScriptClaim(blockId: string, claimId: string): void {
    this.commit('script.claimLinked', (state) => ({
      ...state,
      scriptBlocks: state.scriptBlocks.map((block) =>
        block.id === blockId ? { ...block, claimId: claimId || undefined } : block,
      ),
    }));
  }

  async markReadyToAir(): Promise<void> {
    const issues = this.readiness();
    if (issues.length) {
      this.error.set(issues.join(' '));
      return;
    }
    if (this.recordingState() === 'recording' || this.recordingState() === 'requesting') {
      this.error.set('Finish saving your recording before submitting.');
      return;
    }
    if (this.state().recordingAssetId && !this.recordingUrl()) {
      this.error.set('Restore the missing recording before submitting.');
      return;
    }
    if (this.state().recordingAssetId && (this.state().transcript?.trim().length ?? 0) < 20) {
      this.error.set('Add an accurate transcript for the recording.');
      return;
    }
    if (this.state().packageStatus === 'submitted' || this.state().packageStatus === 'approved')
      return;
    await this.authorized('package.submit', false, () =>
      this.commit('package.submitted', (state) => ({
        ...state,
        packageStatus: 'submitted',
        stage: 'broadcast',
      })),
    );
    if (!this.error())
      this.notification.set(
        this.isDemo
          ? 'Demo package submitted. Switch to Demo producer to review it.'
          : 'Package submitted for producer clearance.',
      );
  }

  async reviewPackage(decision: 'approved' | 'revise', feedback: string): Promise<void> {
    if (this.state().packageStatus !== 'submitted') return;
    if (decision === 'approved' && this.readiness().length) {
      this.error.set(this.readiness().join(' '));
      return;
    }
    if (decision === 'revise' && feedback.trim().length < 8) {
      this.error.set('Explain what needs revision.');
      return;
    }
    await this.authorized(
      'package.review',
      true,
      () =>
        this.commit(
          'package.reviewed',
          (state) => {
            const network = this.selectedNetwork()!;
            const script = structuredClone(state.scriptBlocks);
            const segment: BroadcastSegment = {
              id: this.currentStudentSegmentId,
              reporter: this.viewer.studentDisplayName,
              side: network.side,
              networkName: network.name,
              headline: state.pitch.headline,
              desk: this.beatLabel(state.pitch.beatId),
              durationSeconds: Math.max(
                1,
                Math.round(
                  (script
                    .map((block) => block.text)
                    .join(' ')
                    .split(/\s+/).length /
                    130) *
                    60,
                ),
              ),
              startLabel: '',
              ready: true,
              visualLabel: this.savedSources()[0]?.title ?? '',
              script,
              scenes: structuredClone(state.visualSequence),
              recordingAssetId: state.recordingAssetId,
              transcript: state.transcript || script.map((block) => block.text).join('\n'),
            };
            return {
              ...state,
              packageStatus: decision,
              packageFeedback: feedback,
              studentSegmentReady: decision === 'approved',
              schedule: this.timedSchedule(
                interleaveBroadcastSegments([
                  ...state.schedule.filter((item) => item.id !== segment.id),
                  ...(decision === 'approved' ? [segment] : []),
                ]),
              ),
              reviewHistory: [
                ...(state.reviewHistory ?? []),
                { target: 'package', decision, feedback, timestamp: new Date().toISOString() },
              ],
            };
          },
          'teacher',
        ),
      { decision, feedback },
    );
  }

  private timedSchedule(schedule: readonly BroadcastSegment[]): readonly BroadcastSegment[] {
    let seconds = (this.config.broadcastStartMinutes ?? 13 * 60 + 15) * 60;
    return schedule.map((segment) => {
      const hours = Math.floor(seconds / 3600) % 24;
      const minutes = Math.floor(seconds / 60) % 60;
      const result = {
        ...segment,
        startLabel: `${hours % 12 || 12}:${String(minutes).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')} ${hours >= 12 ? 'PM' : 'AM'}`,
      };
      seconds += segment.durationSeconds;
      return result;
    });
  }

  updateTranscript(text: string): void {
    this.commit(
      'transcript.draftChanged',
      (state) => ({ ...state, transcript: text }),
      'student',
      undefined,
      false,
    );
  }
  updateReflection(text: string): void {
    this.commit(
      'reflection.draftChanged',
      (state) => ({ ...state, reflection: text }),
      'student',
      undefined,
      false,
    );
  }
  saveReflection(): void {
    const text = this.state().reflection?.trim() ?? '';
    if (text.length < 30) {
      this.error.set('Explain which claim changed and identify the evidence that changed it.');
      return;
    }
    if (this.state().reflectionHistory?.at(-1)?.text === text) return;
    this.commit('reflection.revised', (state) => ({
      ...state,
      reflectionHistory: [
        ...(state.reflectionHistory ?? []),
        { text, timestamp: new Date().toISOString() },
      ],
    }));
    this.error.set(undefined);
    this.notification.set('Reflection revision saved.');
  }

  exportWork(): void {
    this.flushDrafts();
    const blob = new Blob(
      [
        JSON.stringify(
          {
            projectId: this.config.projectId,
            projectVersion: this.config.projectVersion,
            state: this.state(),
          },
          null,
          2,
        ),
      ],
      { type: 'application/json' },
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'history-live-work.json';
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  async moveSegment(index: number, direction: -1 | 1): Promise<void> {
    const target = index + direction;
    const schedule = [...this.state().schedule];
    if (
      !Number.isInteger(index) ||
      index < 0 ||
      index >= schedule.length ||
      target < 0 ||
      target >= schedule.length
    )
      return;
    [schedule[index], schedule[target]] = [schedule[target], schedule[index]];
    await this.authorized(
      'schedule.reorder',
      true,
      () =>
        this.commit(
          'schedule.reordered',
          (state) => ({ ...state, schedule: this.timedSchedule(schedule) }),
          'teacher',
          {
            index,
            target,
          },
        ),
      { index, target },
    );
  }

  async startShow(): Promise<void> {
    if (!this.state().schedule.length || this.state().schedule.some((item) => !item.ready)) {
      this.error.set('Clear every scheduled package before starting the show.');
      return;
    }
    await this.authorized('broadcast.start', true, () =>
      this.commit(
        'broadcast.started',
        (state) => ({
          ...state,
          showStatus: 'live',
          activeSegmentIndex: 0,
          stage: 'showcase',
        }),
        'teacher',
      ),
    );
  }

  async holdShow(): Promise<void> {
    await this.authorized('broadcast.hold', true, () =>
      this.commit(
        'broadcast.held',
        (state) => ({
          ...state,
          showStatus: state.showStatus === 'held' ? 'live' : 'held',
        }),
        'teacher',
      ),
    );
  }

  async nextSegment(): Promise<void> {
    if (!this.state().schedule.length) return;
    await this.authorized('broadcast.next', true, () =>
      this.commit(
        'broadcast.nextTaken',
        (state) => ({
          ...state,
          activeSegmentIndex: Math.min(state.activeSegmentIndex + 1, state.schedule.length - 1),
          showStatus: 'live',
        }),
        'teacher',
      ),
    );
  }

  async previousSegment(): Promise<void> {
    await this.authorized('broadcast.previous', true, () =>
      this.commit(
        'broadcast.previousTaken',
        (state) => ({
          ...state,
          activeSegmentIndex: Math.max(state.activeSegmentIndex - 1, 0),
          showStatus: 'live',
        }),
        'teacher',
      ),
    );
  }

  async endShow(): Promise<void> {
    await this.authorized('broadcast.end', true, () =>
      this.commit('broadcast.ended', (state) => ({ ...state, showStatus: 'ended' }), 'teacher'),
    );
  }

  react(reaction: string): void {
    reaction = `${this.activeSegment()?.id ?? 'preview'}:${reaction}`;
    this.commit(
      'audience.reacted',
      (state) => ({
        ...state,
        audienceReactions: {
          ...state.audienceReactions,
          [reaction]: (state.audienceReactions[reaction] ?? 0) + 1,
        },
      }),
      'student',
      { reaction },
    );
    this.notification.set(`${reaction} reaction sent.`);
  }

  async startRecording(): Promise<void> {
    if (this.recordingState() === 'recording' || this.recordingState() === 'requesting') return;
    if (
      !this.media ||
      typeof MediaRecorder === 'undefined' ||
      !navigator.mediaDevices?.getUserMedia
    ) {
      this.error.set('RECORDING_UNAVAILABLE: Use a script-based package or upload a recording.');
      return;
    }
    const generation = ++this.recordingGeneration;
    this.recordingState.set('requesting');
    this.error.set(undefined);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      if (this.disposed || generation !== this.recordingGeneration) {
        stream.getTracks().forEach((track) => track.stop());
        return;
      }
      this.mediaStream = stream;
      this.mediaChunks = [];
      const recorder = new MediaRecorder(stream);
      this.mediaRecorder = recorder;
      recorder.addEventListener('dataavailable', (event) => {
        if (event.data.size) this.mediaChunks.push(event.data);
      });
      recorder.addEventListener('error', () => {
        this.stopMediaTracks();
        this.recordingState.set('idle');
        this.error.set('RECORDING_FAILED: Try another recording or upload.');
      });
      recorder.addEventListener('stop', () => {
        const blob = new Blob(this.mediaChunks, {
          type: recorder.mimeType || this.mediaChunks[0]?.type || 'video/webm',
        });
        this.stopMediaTracks();
        if (this.disposed || generation !== this.recordingGeneration) return;
        void this.storeRecording(blob);
      });
      recorder.start(1000);
      this.recordingState.set('recording');
    } catch {
      this.stopMediaTracks();
      this.recordingState.set('idle');
      this.error.set(
        'Camera or microphone unavailable. Upload a recording or continue with a script-based package.',
      );
    }
  }

  stopRecording(): void {
    if (this.mediaRecorder?.state === 'recording') this.mediaRecorder.stop();
  }

  async storeRecording(blob: Blob): Promise<void> {
    if (!this.media) {
      this.error.set('CAPABILITY_NOT_INSTALLED: Media storage is unavailable.');
      return;
    }
    const generation = this.recordingGeneration;
    this.recordingState.set('requesting');
    try {
      const asset = await this.media.upload({
        file: blob,
        fileName: 'report-recording',
        contentType: blob.type,
        metadata: {
          tenantId: this.viewer.tenantId,
          classId: this.viewer.classId,
          studentId: this.viewer.studentId,
          projectId: this.config.projectId,
          projectVersion: this.config.projectVersion,
        },
      });
      if (this.disposed || generation !== this.recordingGeneration) return;
      this.commit('recording.saved', (state) => ({ ...state, recordingAssetId: asset.id }));
      await this.restoreRecording(asset.id);
      this.notification.set(
        this.isDemo
          ? 'Recording saved on this device. Download a backup before clearing browser data.'
          : 'Recording uploaded. Add an accurate transcript before submitting.',
      );
    } catch (error) {
      this.recordingState.set('idle');
      this.error.set(error instanceof Error ? error.message : 'MEDIA_SAVE_FAILED');
    }
  }

  private async restoreRecording(assetId: string): Promise<void> {
    if (!this.media) return;
    try {
      const asset = await this.media.getReference(assetId);
      if (this.disposed) {
        if (asset.reference.startsWith('blob:')) URL.revokeObjectURL(asset.reference);
        return;
      }
      const previous = this.recordingUrl();
      if (previous?.startsWith('blob:')) URL.revokeObjectURL(previous);
      this.recordingUrl.set(asset.reference);
      this.recordingState.set('ready');
    } catch {
      this.error.set(
        'ASSET_NOT_FOUND: The saved recording could not be loaded. Upload it again before submitting.',
      );
    }
  }

  clearNotice(): void {
    this.notification.set(undefined);
    this.error.set(undefined);
  }

  resetDemo(): void {
    if (!this.isDemo || !this.canProduce()) {
      this.error.set('PERMISSION_DENIED');
      return;
    }
    if (this.saveTimer) clearTimeout(this.saveTimer);
    this.recordingGeneration++;
    this.stopMediaTracks();
    const url = this.recordingUrl();
    if (url !== undefined) URL.revokeObjectURL(url);
    this.recordingUrl.set(undefined);
    this.recordingState.set('idle');
    this.persistence.clear(this.config.projectId, this.config.projectVersion);
    this.state.set(createInitialHistoryLiveState(this.config));
    this.loadError = undefined;
    this.saveState.set('saved');
    this.error.set(undefined);
    this.notification.set('History Live demo reset.');
  }

  networkName(side: HistoryLiveSide): string {
    return this.config.networks.find((network) => network.side === side)?.name ?? 'History Live';
  }

  beatLabel(beatId: string): string {
    return this.config.beats.find((beat) => beat.id === beatId)?.label ?? 'Assignment Desk';
  }

  private stopMediaTracks(): void {
    if (this.mediaRecorder?.state === 'recording') this.mediaRecorder.stop();
    this.mediaStream?.getTracks().forEach((track) => track.stop());
    this.mediaStream = undefined;
    this.mediaRecorder = undefined;
  }

  private commit(
    eventType: HistoryLiveEventType,
    reducer: (state: HistoryLiveRuntimeState) => HistoryLiveRuntimeState,
    actorType: 'student' | 'teacher' | 'system' = 'student',
    payload?: Readonly<Record<string, unknown>>,
    persist = true,
  ): void {
    if (!historyLiveEvents.has(eventType)) {
      this.error.set('EVENT_NOT_REGISTERED');
      return;
    }
    if (this.busy()) {
      this.error.set('Wait for the current submission or review to finish.');
      return;
    }
    const current = this.state();
    const reduced = reducer(current);
    const draft = !persist;
    const affectsPackage =
      /^(pitch\.(draft|format)|source\.(saved|removed)|claim\.(created|removed)|script\.|production\.|recording\.saved|transcript\.)/.test(
        eventType,
      );
    const invalidate =
      affectsPackage &&
      (current.packageStatus === 'approved' || current.packageStatus === 'submitted');
    const next: HistoryLiveRuntimeState = {
      ...reduced,
      ...(invalidate
        ? {
            packageStatus: 'draft' as const,
            studentSegmentReady: false,
            schedule: reduced.schedule.filter(
              (segment) => segment.id !== this.currentStudentSegmentId,
            ),
          }
        : {}),
      activeSegmentIndex: Math.min(
        reduced.activeSegmentIndex,
        Math.max(
          0,
          (invalidate
            ? reduced.schedule.filter((segment) => segment.id !== this.currentStudentSegmentId)
            : reduced.schedule
          ).length - 1,
        ),
      ),
      revision: current.revision + 1,
      eventHistory: draft
        ? current.eventHistory
        : [...current.eventHistory.slice(-99), this.event(eventType, actorType, payload)],
    };
    this.state.set(next);
    if (this.saveTimer) clearTimeout(this.saveTimer);
    if (persist) this.save(next);
    else {
      this.saveState.set('unsaved');
      this.saveTimer = setTimeout(() => this.flushDrafts(), 700);
    }
  }

  private async authorized(
    commandType: string,
    producer: boolean,
    apply: () => void,
    params: Record<string, unknown> = {},
  ): Promise<void> {
    if (this.busy()) return;
    const command = historyLiveCommands.get(commandType);
    if (!command || command.producerOnly !== producer) {
      this.error.set('COMMAND_NOT_REGISTERED');
      return;
    }
    if (command.producerOnly && !this.canProduce()) {
      this.error.set('PERMISSION_DENIED: Only the producer can perform this action.');
      return;
    }
    this.flushDrafts();
    if (this.saveState() === 'error') return;
    this.error.set(undefined);
    if (this.isDemo) {
      apply();
      return;
    }
    if (!this.authority) {
      this.error.set(
        'CAPABILITY_NOT_INSTALLED: Authenticated classroom review is not connected. No approval or submission was recorded.',
      );
      return;
    }
    this.busy.set(true);
    try {
      const state = this.state();
      const result = await this.authority.execute({
        attemptId: `${this.config.projectId}@${this.config.projectVersion}`,
        scope: {
          tenantId: this.viewer.tenantId,
          projectId: this.config.projectId,
          projectVersion: this.config.projectVersion,
          classId: this.viewer.classId,
          studentId: this.viewer.studentId,
          scopeType: 'student',
        },
        command: {
          commandType: `history-live.${commandType}`,
          params: { ...params, snapshot: state },
        },
        idempotencyKey: `history-live:${this.viewer.studentId}:${commandType}:${state.revision}`,
        expectedVersions: { workspace: state.revision },
      });
      if (result.status !== 'accepted') {
        this.error.set(
          `SUBMISSION_${result.status.toUpperCase()}: No change confirmed. Retry after reviewing the classroom connection.`,
        );
        return;
      }
      this.busy.set(false);
      apply();
    } catch {
      this.error.set(
        'AUTHORITY_UNAVAILABLE: Nothing was confirmed. Retry to reconcile this request.',
      );
    } finally {
      this.busy.set(false);
    }
  }

  private event(
    eventType: HistoryLiveEventType,
    actorType: 'student' | 'teacher' | 'system',
    payload?: Readonly<Record<string, unknown>>,
  ): HistoryLiveRuntimeEvent {
    this.eventSequence += 1;
    const clientEventId = `history-live-${Date.now()}-${this.eventSequence}`;
    return {
      id: clientEventId,
      clientEventId,
      eventType,
      timestamp: new Date().toISOString(),
      projectId: this.config.projectId,
      projectVersion: this.config.projectVersion,
      tenantId: this.viewer.tenantId,
      classId: this.viewer.classId,
      actor: {
        type: actorType,
        id: actorType === 'teacher' ? this.viewer.teacherDisplayName : this.viewer.studentId,
      },
      payload,
    };
  }

  private save(state: HistoryLiveRuntimeState): void {
    this.saveState.set('saving');
    try {
      if (this.loadError) throw new Error(this.loadError);
      this.persistence.save(this.config.projectId, this.config.projectVersion, state);
      this.saveState.set('saved');
    } catch (error) {
      this.saveState.set('error');
      this.error.set(
        error instanceof Error ? error.message : 'SAVE_FAILED: Export a backup of your draft.',
      );
    }
  }

  private load(): HistoryLiveRuntimeState {
    try {
      const loaded = this.persistence.load(this.config.projectId, this.config.projectVersion);
      if (!loaded) return this.initial;
      return {
        ...this.initial,
        ...loaded,
        role: this.viewer.mode === 'demo' ? loaded.role : this.viewer.role,
      };
    } catch (error) {
      this.loadError = error instanceof Error ? error.message : 'SAVE_UNAVAILABLE';
      return this.initial;
    }
  }
}
