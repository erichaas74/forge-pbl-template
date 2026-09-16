import {
  emptyInquiryState,
  inquiryGateReady
} from "./chunk-H7BIYLRY.js";
import {
  DEBATE_STUDIO_CONFIG,
  DEBATE_STUDIO_TENANT_ID
} from "./chunk-GNKRFT3D.js";
import {
  ScopedBrowserStore,
  safeBrowserStorage
} from "./chunk-OXVZ3VYX.js";
import {
  DestroyRef,
  Injectable,
  InjectionToken,
  computed,
  inject,
  setClassMetadata,
  signal,
  ɵɵdefineInjectable
} from "./chunk-E2VJWGUE.js";
import {
  __spreadProps,
  __spreadValues
} from "./chunk-GOMI4DH3.js";

// src/app/templates/debate-studio/persistence/debate-studio.persistence.ts
var BrowserDebateWorkspacePersistenceAdapter = class {
  constructor(storage = safeBrowserStorage(), context) {
    this.storage = storage;
    this.context = context;
    this.store = new ScopedBrowserStore(
      "debate-workspace",
      storage,
      (value) => typeof value === "object" && value !== null && "schemaVersion" in value && value.schemaVersion === "2.0"
    );
  }
  storage;
  context;
  store;
  load(projectId, projectVersion, sessionId, studentId) {
    return this.store.load(this.scope(projectId, projectVersion, sessionId, studentId));
  }
  save(projectId, projectVersion, sessionId, studentId, state) {
    if (!this.storage) throw new Error("DRAFT_STORAGE_UNAVAILABLE");
    this.store.save(this.scope(projectId, projectVersion, sessionId, studentId), state);
  }
  clear(projectId, projectVersion, sessionId, studentId) {
    this.store.clear(this.scope(projectId, projectVersion, sessionId, studentId));
  }
  scope(projectId, projectVersion, sessionId, studentId) {
    return {
      tenantId: this.context?.tenantId ?? "local-preview",
      projectId,
      projectVersion,
      classId: this.context?.classId,
      actorId: studentId,
      teamId: this.context?.teamId,
      attemptId: this.context?.attemptId,
      sessionId
    };
  }
};
var MemoryDebateSessionAdapter = class {
  session;
  listeners = /* @__PURE__ */ new Set();
  async initialize(_locator, seed, member) {
    const actorId = `memory-${member.displayName.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
    this.session ??= structuredClone(seed);
    this.session = __spreadProps(__spreadValues({}, this.session), {
      members: __spreadProps(__spreadValues({}, this.session.members), { [actorId]: __spreadProps(__spreadValues({}, member), { id: actorId }) })
    });
    return { actorId, session: structuredClone(this.session) };
  }
  subscribe(_locator, listener, _onError) {
    this.listeners.add(listener);
    if (this.session !== void 0) listener(structuredClone(this.session));
    return () => this.listeners.delete(listener);
  }
  async mutate(_locator, seed, clientEventId, reducer) {
    const current = this.session ?? structuredClone(seed);
    if (current.processedEventIds.includes(clientEventId)) return structuredClone(current);
    const reduced = reducer(structuredClone(current));
    this.session = __spreadProps(__spreadValues({}, reduced), {
      revision: current.revision + 1,
      processedEventIds: [...current.processedEventIds.slice(-99), clientEventId]
    });
    for (const listener of this.listeners) listener(structuredClone(this.session));
    return structuredClone(this.session);
  }
};
var MemoryDebateMediaAdapter = class {
  async uploadRecording(input) {
    input.onProgress?.(100);
    return {
      assetId: `memory-${input.turnId}-${input.actorId}`,
      storagePath: `memory/${input.turnId}`,
      downloadUrl: typeof URL === "undefined" ? "" : URL.createObjectURL(input.blob),
      kind: input.kind,
      contentType: input.blob.type,
      durationSeconds: input.durationSeconds,
      uploadedAt: (/* @__PURE__ */ new Date()).toISOString()
    };
  }
};
var DEBATE_STUDIO_SESSION = new InjectionToken(
  "DEBATE_STUDIO_SESSION"
);
var DEBATE_STUDIO_MEDIA = new InjectionToken("DEBATE_STUDIO_MEDIA");
var DEBATE_STUDIO_PERSISTENCE = new InjectionToken(
  "DEBATE_STUDIO_PERSISTENCE"
);

// src/app/templates/debate-studio/core/debate-studio-state.ts
function debateTurnId(roundId, factionId) {
  return `${roundId}-${factionId}`;
}
function createInitialDebateWorkspace() {
  return {
    schemaVersion: "2.0",
    room: "chamber",
    annotations: [],
    evidenceMarks: {},
    selectedEvidenceIds: [],
    draft: "",
    reasoningContribution: "",
    rehearsalSeconds: 0,
    rehearsed: false,
    recordingReady: false,
    recordingDurationSeconds: 0,
    reflection: "",
    categorySelections: {},
    activeSegmentIndex: 0,
    premierePlaying: false,
    verdictStep: 0
  };
}
function createInitialDebateSession(config, now = (/* @__PURE__ */ new Date()).toISOString(), tenantId = "local-preview") {
  const turns = createTurnPlan(config).map((turn) => {
    const seed = config.seedTurns.find((item) => item.turnId === turn.id);
    return seed === void 0 ? turn : __spreadProps(__spreadValues({}, turn), {
      status: "filed",
      speakerId: seed.speakerId,
      speakerDisplayName: seed.speakerDisplayName,
      transcript: seed.transcript,
      evidenceIds: [...seed.evidenceIds],
      reasoningContribution: seed.reasoningContribution,
      durationSeconds: seed.durationSeconds,
      filedAt: seed.filedAt
    });
  });
  const moderatorQueue = config.seedModeratorPrompts.map((prompt) => __spreadProps(__spreadValues({}, prompt), {
    priority: config.moderator.promptPriorities[0] ?? "point of clash",
    createdAt: now,
    generation: 1,
    approvedBy: "teacher-seed",
    approvedAt: now,
    releasedAt: prompt.status === "released" ? now : void 0
  }));
  return advanceDebateSession(
    config,
    {
      schemaVersion: "2.0",
      id: config.sessionId,
      tenantId,
      projectId: config.projectId,
      projectVersion: config.projectVersion,
      classId: config.viewer.classId,
      status: "openings",
      revision: 1,
      currentTurnId: null,
      currentRound: 0,
      members: {},
      turns,
      moderatorQueue,
      broadcastTimeline: [],
      preVotes: {},
      postVotes: {},
      categoryVotes: {},
      reflections: {},
      eventHistory: [],
      processedEventIds: [],
      updatedAt: now
    },
    now
  );
}
function createTurnPlan(config) {
  const turns = [];
  let priorRoundTurnIds = [];
  let order = 0;
  for (const round of config.rounds) {
    const factionOrder = [...round.speakerOrder ?? config.factions.map((faction) => faction.id)];
    const thisRoundIds = [];
    let priorTurnId;
    for (const factionId of factionOrder) {
      order += 1;
      const id = debateTurnId(round.id, factionId);
      const faction = config.factions.find((item) => item.id === factionId);
      const role = faction?.roles.find((item) => item.roundTypes.includes(round.type));
      const dependencies = round.mode === "parallel" || priorTurnId === void 0 ? [...priorRoundTurnIds] : [priorTurnId];
      turns.push({
        id,
        roundId: round.id,
        roundType: round.type,
        roundLabel: round.label,
        order,
        factionId,
        assignedRoleId: role?.id ?? `${round.type}-senator`,
        dependsOnTurnIds: dependencies,
        moderatorRequired: round.moderatorBeforeTurn,
        status: dependencies.length === 0 && !round.moderatorBeforeTurn ? "available" : "locked",
        evidenceIds: [],
        opponentAnnotations: [],
        argumentMasteryTags: [],
        historicalAccuracyTags: []
      });
      thisRoundIds.push(id);
      priorTurnId = id;
    }
    priorRoundTurnIds = thisRoundIds;
  }
  return turns;
}
function canFileTurn(round, workspace, hasPreviousOpponent) {
  const heardOpponent = !hasPreviousOpponent || workspace.opponentHeardTurnId !== void 0;
  const heardModerator = !round.moderatorBeforeTurn || workspace.moderatorHeardPromptId !== void 0;
  return heardOpponent && heardModerator && workspace.selectedEvidenceIds.length >= round.minimumEvidence && workspace.annotations.length >= (hasPreviousOpponent ? 1 : 0) && workspace.draft.trim().length >= 120 && workspace.reasoningContribution.trim().length >= 30 && workspace.rehearsed && workspace.recordingReady;
}
function fileDebateTurn(config, session, turnId, filing) {
  const target = session.turns.find((turn) => turn.id === turnId);
  if (target === void 0 || !["available", "drafting"].includes(target.status)) return session;
  const turns = session.turns.map(
    (turn) => turn.id === turnId ? __spreadProps(__spreadValues(__spreadValues({}, turn), filing), {
      evidenceIds: [...filing.evidenceIds],
      opponentAnnotations: [...filing.opponentAnnotations],
      status: "filed"
    }) : turn
  );
  return advanceDebateSession(
    config,
    __spreadProps(__spreadValues({}, session), { turns, updatedAt: filing.filedAt }),
    filing.filedAt
  );
}
function editModeratorPrompt(session, promptId, question, reason) {
  return __spreadProps(__spreadValues({}, session), {
    moderatorQueue: session.moderatorQueue.map(
      (prompt) => prompt.id === promptId && prompt.status !== "released" ? __spreadProps(__spreadValues({}, prompt), {
        question: question.trim(),
        reason: reason?.trim() || prompt.reason,
        status: "proposed"
      }) : prompt
    )
  });
}
function approveModeratorPrompt(session, promptId, teacherId, now) {
  return __spreadProps(__spreadValues({}, session), {
    moderatorQueue: session.moderatorQueue.map(
      (prompt) => prompt.id === promptId && prompt.status === "proposed" ? __spreadProps(__spreadValues({}, prompt), { status: "approved", approvedBy: teacherId, approvedAt: now }) : prompt
    ),
    updatedAt: now
  });
}
function releaseModeratorPrompt(config, session, promptId, teacherId, now) {
  const moderatorQueue = session.moderatorQueue.map(
    (prompt) => prompt.id === promptId && ["proposed", "approved"].includes(prompt.status) ? __spreadProps(__spreadValues({}, prompt), {
      status: "released",
      approvedBy: prompt.approvedBy ?? teacherId,
      approvedAt: prompt.approvedAt ?? now,
      releasedAt: now
    }) : prompt
  );
  return advanceDebateSession(config, __spreadProps(__spreadValues({}, session), { moderatorQueue, updatedAt: now }), now);
}
function regenerateModeratorPrompt(config, session, promptId, now) {
  const prior = session.moderatorQueue.find((prompt) => prompt.id === promptId);
  if (prior === void 0 || prior.status === "released") return session;
  const target = session.turns.find((turn) => turn.id === prior.targetTurnId);
  if (target === void 0) return session;
  const generation = prior.generation + 1;
  const replacement = draftModeratorPrompt(config, session.turns, target, now, generation);
  return __spreadProps(__spreadValues({}, session), {
    moderatorQueue: [
      ...session.moderatorQueue.map(
        (prompt) => prompt.id === promptId ? __spreadProps(__spreadValues({}, prompt), { status: "superseded" }) : prompt
      ),
      replacement
    ],
    updatedAt: now
  });
}
function castOpinionVote(session, phase, vote) {
  if (phase === "pre" && ["premiere", "voting", "complete"].includes(session.status))
    return session;
  if (phase === "post" && !["voting", "complete"].includes(session.status)) return session;
  return phase === "pre" ? __spreadProps(__spreadValues({}, session), {
    preVotes: __spreadProps(__spreadValues({}, session.preVotes), { [vote.studentId]: vote }),
    updatedAt: vote.castAt
  }) : __spreadProps(__spreadValues({}, session), {
    postVotes: __spreadProps(__spreadValues({}, session.postVotes), { [vote.studentId]: vote }),
    updatedAt: vote.castAt
  });
}
function castCategoryVote(session, categoryId, vote) {
  if (!["voting", "complete"].includes(session.status)) return session;
  return __spreadProps(__spreadValues({}, session), {
    categoryVotes: __spreadProps(__spreadValues({}, session.categoryVotes), {
      [categoryId]: __spreadProps(__spreadValues({}, session.categoryVotes[categoryId] ?? {}), { [vote.studentId]: vote })
    }),
    updatedAt: vote.castAt
  });
}
function submitDebateReflection(session, studentId, text, now) {
  if (!["voting", "complete"].includes(session.status) || text.trim().length < 20) return session;
  return __spreadProps(__spreadValues({}, session), {
    reflections: __spreadProps(__spreadValues({}, session.reflections), {
      [studentId]: { studentId, text: text.trim(), submittedAt: now }
    }),
    updatedAt: now
  });
}
function conveneDebatePremiere(session, now) {
  return session.status === "premiere-ready" ? __spreadProps(__spreadValues({}, session), { status: "premiere", updatedAt: now }) : session;
}
function markPremiereComplete(session, now) {
  if (session.status !== "premiere") return session;
  return __spreadProps(__spreadValues({}, session), { status: "voting", premiereCompletedAt: now, updatedAt: now });
}
function debateVotingComplete(config, session, studentId) {
  return session.postVotes[studentId] !== void 0 && config.voteCategories.every(
    (category) => session.categoryVotes[category.id]?.[studentId] !== void 0
  ) && session.reflections[studentId] !== void 0;
}
function completeDebateVoting(config, session, studentId, now) {
  return debateVotingComplete(config, session, studentId) ? __spreadProps(__spreadValues({}, session), { status: "complete", updatedAt: now }) : session;
}
function tallyVotes(votes) {
  const tally = {};
  for (const vote of Object.values(votes ?? {}))
    tally[vote.choiceId] = (tally[vote.choiceId] ?? 0) + 1;
  return tally;
}
function persuasionShift(session, options) {
  const before = tallyVotes(session.preVotes);
  const after = tallyVotes(session.postVotes);
  return options.map((option) => ({
    option,
    before: before[option.id] ?? 0,
    after: after[option.id] ?? 0,
    change: (after[option.id] ?? 0) - (before[option.id] ?? 0)
  }));
}
function assembleBroadcastTimeline(config, session) {
  const segments = [
    {
      id: "ceremony-open",
      kind: "ceremony",
      title: config.title,
      roundLabel: `The ${config.presentation?.assembly ?? "Senate"} is called to order`,
      transcript: `The presiding officer opens the ${config.presentation?.assembly ?? "Senate"} to consider: ${config.centralQuestion}`,
      evidenceIds: [],
      durationSeconds: 10
    }
  ];
  for (const round of config.rounds) {
    const roundTurns = session.turns.filter(
      (turn) => turn.roundId === round.id && turn.status === "filed"
    );
    if (roundTurns.length === 0) continue;
    segments.push({
      id: `round-${round.id}`,
      kind: "round-title",
      title: round.label,
      roundLabel: round.type === "crossfire" ? "Crossfire" : "Proceedings",
      transcript: round.label,
      evidenceIds: [],
      durationSeconds: round.type === "crossfire" ? 4 : 5
    });
    for (const turn of roundTurns.sort((left, right) => left.order - right.order)) {
      const prompt = session.moderatorQueue.find(
        (item) => item.targetTurnId === turn.id && item.status === "released"
      );
      if (prompt !== void 0) {
        segments.push({
          id: `broadcast-${prompt.id}`,
          kind: "moderator",
          title: config.moderator.title,
          roundLabel: `Question before the ${config.presentation?.assembly ?? "Senate"}`,
          transcript: prompt.question,
          promptId: prompt.id,
          evidenceIds: [],
          durationSeconds: spokenDuration(prompt.question)
        });
      }
      segments.push({
        id: `broadcast-${turn.id}`,
        kind: "student",
        title: config.factions.find((faction) => faction.id === turn.factionId)?.name ?? turn.factionId,
        roundLabel: turn.roundLabel,
        transcript: turn.transcript ?? "",
        factionId: turn.factionId,
        speakerDisplayName: turn.speakerDisplayName,
        turnId: turn.id,
        evidenceIds: [...turn.evidenceIds],
        recording: turn.recording,
        durationSeconds: turn.durationSeconds ?? spokenDuration(turn.transcript ?? "")
      });
    }
  }
  if (session.turns.some((turn) => turn.roundType === "closing" && turn.status === "filed")) {
    segments.push({
      id: "decision-of-class",
      kind: "decision",
      title: "The decision passes to the class",
      roundLabel: "The record is sealed",
      transcript: `The ${config.presentation?.assembly ?? "Senate"} has heard both factions. The class will now judge the evidence and the arguments.`,
      evidenceIds: [],
      durationSeconds: 8
    });
  }
  return segments;
}
function advanceDebateSession(config, session, now) {
  let moderatorQueue = [...session.moderatorQueue];
  let turns = session.turns.map((turn) => __spreadValues({}, turn));
  for (const turn of turns) {
    if (turn.status !== "locked") continue;
    const dependenciesFiled = turn.dependsOnTurnIds.every(
      (dependencyId) => turns.find((item) => item.id === dependencyId)?.status === "filed"
    );
    if (!dependenciesFiled) continue;
    if (!turn.moderatorRequired) {
      turns = turns.map(
        (item) => item.id === turn.id ? __spreadProps(__spreadValues({}, item), { status: "available" }) : item
      );
      continue;
    }
    const prompt = moderatorQueue.find(
      (item) => item.targetTurnId === turn.id && item.status !== "superseded"
    );
    if (prompt?.status === "released") {
      turns = turns.map(
        (item) => item.id === turn.id ? __spreadProps(__spreadValues({}, item), { status: "available" }) : item
      );
    } else if (prompt === void 0) {
      moderatorQueue.push(draftModeratorPrompt(config, turns, turn, now, 1));
    }
  }
  const finalTurns = turns.filter((turn) => turn.roundType === "closing");
  const complete = finalTurns.length > 0 && finalTurns.every((turn) => turn.status === "filed");
  const currentTurn = turns.filter((turn) => turn.status === "available" || turn.status === "drafting").sort((left, right) => left.order - right.order)[0];
  const nextTurn = currentTurn ?? turns.find((turn) => turn.status !== "filed");
  const roundIndex = Math.max(
    0,
    config.rounds.findIndex((round) => round.id === nextTurn?.roundId)
  );
  const status = complete ? "premiere-ready" : statusForRound(config.rounds[roundIndex]);
  const next = __spreadProps(__spreadValues({}, session), {
    status,
    currentTurnId: currentTurn?.id ?? null,
    currentRound: roundIndex,
    turns,
    moderatorQueue,
    updatedAt: now
  });
  return __spreadProps(__spreadValues({}, next), { broadcastTimeline: assembleBroadcastTimeline(config, next) });
}
function draftModeratorPrompt(config, turns, target, now, generation) {
  const triggerTurns = target.dependsOnTurnIds.map((id) => turns.find((turn) => turn.id === id)).filter((turn) => turn?.status === "filed");
  const mostRecent = triggerTurns.at(-1);
  const opponent = mostRecent === void 0 ? void 0 : config.factions.find((faction) => faction.id === mostRecent.factionId);
  const targetFaction = config.factions.find((faction) => faction.id === target.factionId);
  const priority = config.moderator.promptPriorities[(generation - 1) % config.moderator.promptPriorities.length] ?? "unanswered claim";
  const excerpt2 = sentenceExcerpt(mostRecent?.transcript ?? config.centralQuestion);
  const question = triggerTurns.length > 1 ? `The two cases interpret the record differently. ${targetFaction?.shortName ?? "Speakers"}, which claim best answers \u201C${config.centralQuestion}\u201D? Compare the sources and acknowledge a limitation.` : `${opponent?.shortName ?? "The opposing faction"} has argued, \u201C${excerpt2}\u201D ${targetFaction?.shortName ?? "Speakers"}, which evidence most directly answers that claim, and what limit or tradeoff does it reveal?`;
  return {
    id: `moderator-${target.id}-${generation}`,
    targetTurnId: target.id,
    question,
    reason: `Selected because the record contains a ${priority} that the next faction must address directly.`,
    triggerTurnIds: triggerTurns.map((turn) => turn.id),
    priority,
    status: "proposed",
    createdAt: now,
    generation
  };
}
function statusForRound(round) {
  if (round === void 0) return "premiere-ready";
  if (round.type === "opening") return "openings";
  if (round.type === "crossfire") return "crossfire";
  if (round.type === "closing") return "closings";
  return "exchange";
}
function sentenceExcerpt(transcript) {
  const sentence = transcript.trim().split(/(?<=[.!?])\s+/)[0] ?? transcript.trim();
  return sentence.length > 150 ? `${sentence.slice(0, 147).trim()}\u2026` : sentence;
}
function spokenDuration(transcript) {
  const words = transcript.trim().length === 0 ? 0 : transcript.trim().split(/\s+/).length;
  return Math.max(4, Math.ceil(words / 2.1) + 2);
}

// src/app/templates/debate-studio/runtime/debate-studio-runtime.service.ts
var DebateStudioRuntimeService = class _DebateStudioRuntimeService {
  config = inject(DEBATE_STUDIO_CONFIG);
  assembly = this.config.presentation?.assembly ?? "Senate";
  seal = this.config.presentation?.seal ?? "SPQR";
  speakerLabel = this.config.presentation?.speaker ?? "Student Senator";
  tenantId = inject(DEBATE_STUDIO_TENANT_ID, { optional: true }) ?? "local-preview";
  sessionAdapter = inject(DEBATE_STUDIO_SESSION);
  mediaAdapter = inject(DEBATE_STUDIO_MEDIA);
  workspacePersistence = inject(DEBATE_STUDIO_PERSISTENCE);
  destroyRef = inject(DestroyRef);
  seedSession = createInitialDebateSession(this.config, (/* @__PURE__ */ new Date()).toISOString(), this.tenantId);
  locator = {
    tenantId: this.tenantId,
    projectId: this.config.projectId,
    projectVersion: this.config.projectVersion,
    classId: this.config.viewer.classId,
    sessionId: this.config.sessionId
  };
  session = signal(
    this.seedSession,
    ...ngDevMode ? [{ debugName: "session" }] : (
      /* istanbul ignore next */
      []
    )
  );
  state = signal(
    this.loadWorkspace(),
    ...ngDevMode ? [{ debugName: "state" }] : (
      /* istanbul ignore next */
      []
    )
  );
  actorId = signal(
    this.config.viewer.studentId,
    ...ngDevMode ? [{ debugName: "actorId" }] : (
      /* istanbul ignore next */
      []
    )
  );
  activeFactionId = signal(
    this.previewFactionId(),
    ...ngDevMode ? [{ debugName: "activeFactionId" }] : (
      /* istanbul ignore next */
      []
    )
  );
  connectionState = signal(
    "connecting",
    ...ngDevMode ? [{ debugName: "connectionState" }] : (
      /* istanbul ignore next */
      []
    )
  );
  notice = signal(
    void 0,
    ...ngDevMode ? [{ debugName: "notice" }] : (
      /* istanbul ignore next */
      []
    )
  );
  error = signal(
    void 0,
    ...ngDevMode ? [{ debugName: "error" }] : (
      /* istanbul ignore next */
      []
    )
  );
  saveState = signal(
    "saved",
    ...ngDevMode ? [{ debugName: "saveState" }] : (
      /* istanbul ignore next */
      []
    )
  );
  teacherPreview = signal(
    this.previewTeacherMode(),
    ...ngDevMode ? [{ debugName: "teacherPreview" }] : (
      /* istanbul ignore next */
      []
    )
  );
  moderatorDraft = signal(
    "",
    ...ngDevMode ? [{ debugName: "moderatorDraft" }] : (
      /* istanbul ignore next */
      []
    )
  );
  recordingState = signal(
    "idle",
    ...ngDevMode ? [{ debugName: "recordingState" }] : (
      /* istanbul ignore next */
      []
    )
  );
  recordingPreviewUrl = signal(
    void 0,
    ...ngDevMode ? [{ debugName: "recordingPreviewUrl" }] : (
      /* istanbul ignore next */
      []
    )
  );
  uploadProgress = signal(
    0,
    ...ngDevMode ? [{ debugName: "uploadProgress" }] : (
      /* istanbul ignore next */
      []
    )
  );
  filingAnimation = signal(
    false,
    ...ngDevMode ? [{ debugName: "filingAnimation" }] : (
      /* istanbul ignore next */
      []
    )
  );
  rehearsalRunning = signal(
    false,
    ...ngDevMode ? [{ debugName: "rehearsalRunning" }] : (
      /* istanbul ignore next */
      []
    )
  );
  sessionPlaying = signal(
    false,
    ...ngDevMode ? [{ debugName: "sessionPlaying" }] : (
      /* istanbul ignore next */
      []
    )
  );
  segmentSecondsRemaining = signal(
    0,
    ...ngDevMode ? [{ debugName: "segmentSecondsRemaining" }] : (
      /* istanbul ignore next */
      []
    )
  );
  viewerFaction = computed(
    () => this.config.factions.find((faction) => faction.id === this.activeFactionId()),
    ...ngDevMode ? [{ debugName: "viewerFaction" }] : (
      /* istanbul ignore next */
      []
    )
  );
  opponentFaction = computed(
    () => this.config.factions.find((faction) => faction.id !== this.activeFactionId()),
    ...ngDevMode ? [{ debugName: "opponentFaction" }] : (
      /* istanbul ignore next */
      []
    )
  );
  currentTurn = computed(
    () => this.turnForFaction(this.activeFactionId()),
    ...ngDevMode ? [{ debugName: "currentTurn" }] : (
      /* istanbul ignore next */
      []
    )
  );
  currentRound = computed(
    () => {
      const turn = this.currentTurn();
      return this.config.rounds.find((round) => round.id === turn?.roundId) ?? this.config.rounds[this.session().currentRound];
    },
    ...ngDevMode ? [{ debugName: "currentRound" }] : (
      /* istanbul ignore next */
      []
    )
  );
  previousOpponentTurn = computed(
    () => {
      const current = this.currentTurn();
      const ceiling = current?.order ?? Number.POSITIVE_INFINITY;
      return [...this.session().turns].filter((turn) => turn.status === "filed" && turn.factionId !== this.activeFactionId() && turn.order < ceiling).sort((left, right) => right.order - left.order)[0];
    },
    ...ngDevMode ? [{ debugName: "previousOpponentTurn" }] : (
      /* istanbul ignore next */
      []
    )
  );
  currentModeratorPrompt = computed(
    () => {
      const current = this.currentTurn();
      if (current === void 0)
        return void 0;
      return this.session().moderatorQueue.find((prompt) => prompt.targetTurnId === current.id && prompt.status === "released");
    },
    ...ngDevMode ? [{ debugName: "currentModeratorPrompt" }] : (
      /* istanbul ignore next */
      []
    )
  );
  pendingModeratorPrompt = computed(
    () => [...this.session().moderatorQueue].reverse().find((prompt) => prompt.status === "proposed" || prompt.status === "approved"),
    ...ngDevMode ? [{ debugName: "pendingModeratorPrompt" }] : (
      /* istanbul ignore next */
      []
    )
  );
  opponentPassages = computed(
    () => {
      const transcript = this.previousOpponentTurn()?.transcript ?? "";
      return transcript.split(/(?<=[.!?])\s+/).map((sentence) => sentence.trim()).filter((sentence) => sentence.length > 12);
    },
    ...ngDevMode ? [{ debugName: "opponentPassages" }] : (
      /* istanbul ignore next */
      []
    )
  );
  selectedEvidence = computed(
    () => this.config.evidence.filter((item) => this.state().selectedEvidenceIds.includes(item.id)),
    ...ngDevMode ? [{ debugName: "selectedEvidence" }] : (
      /* istanbul ignore next */
      []
    )
  );
  filedTurnCount = computed(
    () => this.session().turns.filter((turn) => turn.status === "filed").length,
    ...ngDevMode ? [{ debugName: "filedTurnCount" }] : (
      /* istanbul ignore next */
      []
    )
  );
  canFile = computed(
    () => {
      const round = this.currentRound();
      return round !== void 0 && (!this.config.inquiry || this.inquiryGate(this.config.inquiry.hearingGateId)) && canFileTurn(round, this.state(), this.previousOpponentTurn() !== void 0);
    },
    ...ngDevMode ? [{ debugName: "canFile" }] : (
      /* istanbul ignore next */
      []
    )
  );
  program = computed(
    () => assembleBroadcastTimeline(this.config, this.session()),
    ...ngDevMode ? [{ debugName: "program" }] : (
      /* istanbul ignore next */
      []
    )
  );
  activeSegment = computed(
    () => this.program()[this.state().activeSegmentIndex],
    ...ngDevMode ? [{ debugName: "activeSegment" }] : (
      /* istanbul ignore next */
      []
    )
  );
  persuasionResults = computed(
    () => persuasionShift(this.session(), this.config.opinionOptions),
    ...ngDevMode ? [{ debugName: "persuasionResults" }] : (
      /* istanbul ignore next */
      []
    )
  );
  preOpinion = computed(
    () => this.session().preVotes[this.actorId()]?.choiceId,
    ...ngDevMode ? [{ debugName: "preOpinion" }] : (
      /* istanbul ignore next */
      []
    )
  );
  postOpinion = computed(
    () => this.session().postVotes[this.actorId()]?.choiceId,
    ...ngDevMode ? [{ debugName: "postOpinion" }] : (
      /* istanbul ignore next */
      []
    )
  );
  ballotComplete = computed(
    () => debateVotingComplete(this.config, this.session(), this.actorId()),
    ...ngDevMode ? [{ debugName: "ballotComplete" }] : (
      /* istanbul ignore next */
      []
    )
  );
  canManageModerator = computed(
    () => this.config.viewer.mode === "teacher" || this.config.viewer.allowTeacherPreview && this.teacherPreview(),
    ...ngDevMode ? [{ debugName: "canManageModerator" }] : (
      /* istanbul ignore next */
      []
    )
  );
  premiereCanPlay = computed(
    () => ["premiere", "voting", "complete"].includes(this.session().status),
    ...ngDevMode ? [{ debugName: "premiereCanPlay" }] : (
      /* istanbul ignore next */
      []
    )
  );
  chamberStage = computed(
    () => {
      if (this.session().status === "premiere-ready")
        return "premiere-ready";
      const turn = this.currentTurn();
      if (turn === void 0)
        return "waiting";
      const opponent = this.previousOpponentTurn();
      if (opponent !== void 0 && this.state().opponentHeardTurnId !== opponent.id)
        return "opponent";
      const prompt = this.currentModeratorPrompt();
      if (prompt !== void 0 && this.state().moderatorHeardPromptId !== prompt.id)
        return "moderator";
      return "your-turn";
    },
    ...ngDevMode ? [{ debugName: "chamberStage" }] : (
      /* istanbul ignore next */
      []
    )
  );
  chamberHeadline = computed(
    () => {
      switch (this.chamberStage()) {
        case "opponent":
          return `${this.opponentFaction()?.shortName ?? "The opposing faction"} has answered`;
        case "moderator":
          return `${this.config.moderator.displayName} calls the next question`;
        case "your-turn":
          return "The floor passes to your faction";
        case "premiere-ready":
          return `${this.assembly} session ready`;
        default:
          return `The ${this.assembly.toLowerCase()} awaits the opposing faction`;
      }
    },
    ...ngDevMode ? [{ debugName: "chamberHeadline" }] : (
      /* istanbul ignore next */
      []
    )
  );
  chamberDetail = computed(
    () => {
      const current = this.currentTurn();
      switch (this.chamberStage()) {
        case "opponent":
          return `Hear ${this.previousOpponentTurn()?.speakerDisplayName ?? this.speakerLabel} at the opposing lectern.`;
        case "moderator":
          return "The presiding dais is illuminated. Hear the question before taking the floor.";
        case "your-turn":
          return `${current?.roundLabel ?? "Your round"} \xB7 ${this.roleLabel(current)}`;
        case "premiere-ready":
          return `The doors are closed. The teacher may now convene the complete ${this.assembly} broadcast.`;
        default:
          return this.pendingModeratorPrompt() !== void 0 ? "A moderator question is awaiting teacher approval." : "Your team will be notified when the next turn is released.";
      }
    },
    ...ngDevMode ? [{ debugName: "chamberDetail" }] : (
      /* istanbul ignore next */
      []
    )
  );
  unsubscribeSession;
  eventSequence = 0;
  mediaRecorder;
  mediaStream;
  mediaChunks = [];
  pendingRecordingBlob;
  activeRecordingKind;
  recordingStartedAt = 0;
  rehearsalTimer;
  recordingTimer;
  sessionTimer;
  draftSaveTimer;
  filingAnimationTimer;
  constructor() {
    this.destroyRef.onDestroy(() => this.dispose());
    void this.connectSharedSession();
  }
  openStation(station) {
    if (station === "moderator" && this.previousOpponentTurn() !== void 0 && this.state().opponentHeardTurnId !== this.previousOpponentTurn()?.id) {
      this.error.set("Hear the previous argument before approaching the presiding dais.");
      return;
    }
    if (station === "lectern" && this.chamberStage() !== "your-turn") {
      this.error.set("The floor has not yet passed to your faction.");
      return;
    }
    if (station === "premiere") {
      this.beginPremiere();
      return;
    }
    this.state.update((state) => __spreadProps(__spreadValues({}, state), { activeStation: station }));
    if (station === "moderator")
      this.moderatorDraft.set(this.pendingModeratorPrompt()?.question ?? "");
  }
  closeStation() {
    this.state.update((state) => __spreadProps(__spreadValues({}, state), { activeStation: void 0 }));
    this.saveWorkspace(this.state());
  }
  enterRoom(room) {
    this.stopSessionTimer();
    this.state.update((state) => __spreadProps(__spreadValues({}, state), { room, activeStation: void 0 }));
    this.saveWorkspace(this.state());
  }
  toggleTeacherPreview() {
    if (!this.config.viewer.allowTeacherPreview)
      return;
    this.teacherPreview.update((value) => !value);
    this.state.update((state) => __spreadProps(__spreadValues({}, state), { activeStation: "moderator" }));
    this.moderatorDraft.set(this.pendingModeratorPrompt()?.question ?? "");
  }
  markOpponentHeard() {
    const opponent = this.previousOpponentTurn();
    if (opponent === void 0)
      return;
    if (this.state().opponentPlaybackCompleteTurnId !== opponent.id) {
      this.error.set("Finish the opposing contribution before carrying its claim into your record.");
      return;
    }
    this.updateWorkspace({ opponentHeardTurnId: opponent.id });
    this.notice.set(`The previous argument is now part of your listening record. The ${this.config.moderator.displayName} calls the next question.`);
    this.state.update((state) => __spreadProps(__spreadValues({}, state), { activeStation: void 0 }));
  }
  markOpponentPlaybackComplete() {
    const opponent = this.previousOpponentTurn();
    if (opponent === void 0)
      return;
    this.updateWorkspace({ opponentPlaybackCompleteTurnId: opponent.id });
    this.notice.set("The full opposing contribution has been heard. Mark a claim before proceeding.");
  }
  markModeratorHeard() {
    const prompt = this.currentModeratorPrompt();
    if (prompt === void 0)
      return;
    this.updateWorkspace({ moderatorHeardPromptId: prompt.id });
    this.notice.set("The question is entered into your docket. Your lectern is now illuminated.");
    this.state.update((state) => __spreadProps(__spreadValues({}, state), { activeStation: "lectern" }));
  }
  markOpponentPassage(excerpt2, marker) {
    const source = this.previousOpponentTurn();
    if (source === void 0)
      return;
    const annotation = {
      id: `annotation-${this.actorId()}-${source.id}-${Math.abs(hash(excerpt2))}`,
      studentId: this.actorId(),
      sourceTurnId: source.id,
      excerpt: excerpt2,
      marker,
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    this.updateWorkspace({
      annotations: [
        ...this.state().annotations.filter((item) => item.excerpt !== excerpt2),
        annotation
      ]
    });
    this.notice.set("That exact claim has been carried to your lectern.");
  }
  annotationFor(excerpt2) {
    return this.state().annotations.find((annotation) => annotation.excerpt === excerpt2);
  }
  speak(text) {
    if (typeof speechSynthesis === "undefined") {
      this.error.set("Read-aloud playback is unavailable. The complete transcript remains open.");
      return;
    }
    speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.92;
    utterance.pitch = 0.86;
    speechSynthesis.speak(utterance);
  }
  stopSpeaking() {
    if (typeof speechSynthesis !== "undefined")
      speechSynthesis.cancel();
  }
  markEvidence(item, mark) {
    this.updateWorkspace({ evidenceMarks: __spreadProps(__spreadValues({}, this.state().evidenceMarks), { [item.id]: mark }) });
  }
  toggleEvidence(item) {
    const selected = this.state().selectedEvidenceIds.includes(item.id);
    this.updateWorkspace({
      selectedEvidenceIds: selected ? this.state().selectedEvidenceIds.filter((id) => id !== item.id) : [...this.state().selectedEvidenceIds, item.id]
    });
  }
  updateDraft(draft) {
    this.state.update((state) => __spreadProps(__spreadValues({}, state), { draft }));
    this.scheduleWorkspaceSave();
  }
  updateReasoningContribution(reasoningContribution) {
    this.state.update((state) => __spreadProps(__spreadValues({}, state), { reasoningContribution }));
    this.scheduleWorkspaceSave();
  }
  updateReflection(reflection) {
    this.state.update((state) => __spreadProps(__spreadValues({}, state), { reflection }));
    this.scheduleWorkspaceSave();
  }
  startRehearsal() {
    if (this.rehearsalRunning())
      return;
    this.rehearsalRunning.set(true);
    this.rehearsalTimer = setInterval(() => {
      const seconds = this.state().rehearsalSeconds + 1;
      this.state.update((state) => __spreadProps(__spreadValues({}, state), { rehearsalSeconds: seconds }));
      if (seconds >= (this.currentRound()?.timeLimitSeconds ?? 60))
        this.stopRehearsal();
    }, 1e3);
  }
  stopRehearsal() {
    if (this.rehearsalTimer !== void 0)
      clearInterval(this.rehearsalTimer);
    this.rehearsalTimer = void 0;
    this.rehearsalRunning.set(false);
    const minimum = Math.min(5, this.currentRound()?.minimumSeconds ?? 5);
    this.updateWorkspace({ rehearsed: this.state().rehearsalSeconds >= minimum });
    this.notice.set(this.state().rehearsed ? "Rehearsal complete. The recording lamp is ready." : `Continue rehearsing for at least ${minimum} seconds in this preview.`);
  }
  async startRecording(preferVideo = true) {
    if (typeof navigator === "undefined" || navigator.mediaDevices?.getUserMedia === void 0) {
      this.error.set("Camera and microphone recording are unavailable. Use the transcript accessibility option.");
      return;
    }
    this.recordingState.set("requesting");
    this.error.set(void 0);
    let stream;
    let kind = preferVideo ? "video" : "audio";
    try {
      stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: preferVideo });
    } catch {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        kind = "audio";
      } catch {
        this.recordingState.set("idle");
        this.error.set("Recording permission was not granted. Your draft remains safe.");
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
      this.recordingState.set("idle");
      this.error.set("This browser cannot create a compatible recording. Use transcript-only access.");
      return;
    }
    this.mediaRecorder.addEventListener("dataavailable", (event) => {
      if (event.data.size > 0)
        this.mediaChunks.push(event.data);
    });
    this.mediaRecorder.addEventListener("stop", () => this.finishRecording());
    this.recordingStartedAt = Date.now();
    this.mediaRecorder.start();
    this.recordingState.set("recording");
    this.recordingTimer = setInterval(() => {
      this.state.update((state) => __spreadProps(__spreadValues({}, state), {
        recordingDurationSeconds: Math.max(1, Math.round((Date.now() - this.recordingStartedAt) / 1e3))
      }));
    }, 1e3);
  }
  stopRecording() {
    if (this.mediaRecorder?.state === "recording")
      this.mediaRecorder.stop();
  }
  useTranscriptFallback() {
    this.clearRecording();
    this.recordingState.set("ready");
    this.updateWorkspace({
      recordingReady: true,
      recordingKind: "transcript",
      recordingDurationSeconds: this.state().rehearsalSeconds
    });
    this.notice.set("Transcript-only accessibility contribution selected.");
  }
  retakeRecording() {
    this.clearRecording();
    this.updateWorkspace({
      recordingReady: false,
      recordingKind: void 0,
      recordingDurationSeconds: 0
    });
    this.recordingState.set("idle");
  }
  async fileSpeech() {
    const turn = this.currentTurn();
    const round = this.currentRound();
    if (turn === void 0 || round === void 0 || !this.canFile()) {
      this.error.set("The scribe still needs your listening mark, evidence, reasoning, rehearsal, and reviewed recording.");
      return;
    }
    this.flushWorkspaceSave();
    this.error.set(void 0);
    let recording;
    const selectedRecordingKind = this.state().recordingKind;
    if (selectedRecordingKind !== void 0 && selectedRecordingKind !== "transcript" && this.pendingRecordingBlob !== void 0) {
      this.recordingState.set("uploading");
      this.uploadProgress.set(0);
      try {
        recording = await this.mediaAdapter.uploadRecording({
          locator: this.locator,
          turnId: turn.id,
          actorId: this.actorId(),
          blob: this.pendingRecordingBlob,
          kind: selectedRecordingKind,
          durationSeconds: this.state().recordingDurationSeconds,
          onProgress: (progress) => this.uploadProgress.set(progress)
        });
      } catch {
        this.recordingState.set("ready");
        this.error.set("The recording could not be secured in Firebase Storage. Nothing was filed; try again.");
        return;
      }
    }
    const now = (/* @__PURE__ */ new Date()).toISOString();
    const event = this.event("debate.turnFiled", "student", { turnId: turn.id });
    try {
      await this.mutateSession(event, (session) => fileDebateTurn(this.config, session, turn.id, {
        speakerId: this.actorId(),
        speakerDisplayName: this.config.viewer.studentDisplayName,
        transcript: this.state().draft.trim(),
        evidenceIds: [...this.state().selectedEvidenceIds],
        opponentAnnotations: [...this.state().annotations],
        reasoningContribution: this.state().reasoningContribution.trim(),
        recording,
        durationSeconds: this.state().recordingDurationSeconds,
        filedAt: now
      }));
      this.filingAnimation.set(true);
      if (this.filingAnimationTimer !== void 0)
        clearTimeout(this.filingAnimationTimer);
      this.filingAnimationTimer = setTimeout(() => this.filingAnimation.set(false), 1600);
      this.notice.set("The seal is set. The opposing faction and moderator have received your official argument.");
      this.resetTurnWorkspace();
      this.recordingState.set("idle");
    } catch {
      this.recordingState.set("ready");
      this.error.set(`The shared ${this.assembly} record did not accept the filing. Your draft and recording remain available.`);
    }
  }
  async approvePrompt(prompt) {
    if (!this.canManageModerator())
      return;
    const now = (/* @__PURE__ */ new Date()).toISOString();
    await this.mutateSession(this.event("debate.moderatorPromptApproved", "teacher", { promptId: prompt.id }), (session) => approveModeratorPrompt(session, prompt.id, this.config.viewer.teacherDisplayName, now));
  }
  async saveModeratorEdit(prompt) {
    if (!this.canManageModerator() || this.moderatorDraft().trim().length < 20)
      return;
    await this.mutateSession(this.event("debate.moderatorPromptEdited", "teacher", { promptId: prompt.id }), (session) => editModeratorPrompt(session, prompt.id, this.moderatorDraft()));
    this.notice.set("The revised question is ready for approval.");
  }
  async regeneratePrompt(prompt) {
    if (!this.canManageModerator())
      return;
    const now = (/* @__PURE__ */ new Date()).toISOString();
    await this.mutateSession(this.event("debate.moderatorPromptRegenerated", "teacher", { promptId: prompt.id }), (session) => regenerateModeratorPrompt(this.config, session, prompt.id, now));
    this.moderatorDraft.set("");
  }
  async releasePrompt(prompt) {
    if (!this.canManageModerator())
      return;
    const now = (/* @__PURE__ */ new Date()).toISOString();
    await this.mutateSession(this.event("debate.moderatorPromptReleased", "teacher", { promptId: prompt.id }), (session) => releaseModeratorPrompt(this.config, session, prompt.id, this.config.viewer.teacherDisplayName, now));
    this.notice.set(`The ${this.config.moderator.displayName}\u2019s question has been released. The next faction has the floor.`);
  }
  castPreOpinion(choiceId) {
    const now = (/* @__PURE__ */ new Date()).toISOString();
    void this.mutateSession(this.event("debate.preOpinionCast", "student", { choiceId }), (session) => castOpinionVote(session, "pre", { studentId: this.actorId(), choiceId, castAt: now })).catch(() => this.error.set(`Your initial opinion could not reach the shared ${this.assembly}. Please try again.`));
  }
  castPostOpinion(choiceId) {
    const now = (/* @__PURE__ */ new Date()).toISOString();
    void this.mutateSession(this.event("debate.postOpinionCast", "student", { choiceId }), (session) => castOpinionVote(session, "post", { studentId: this.actorId(), choiceId, castAt: now })).catch(() => this.error.set(`Your post-debate opinion could not reach the shared ${this.assembly}. Please try again.`));
  }
  castCategory(categoryId, choiceId) {
    const now = (/* @__PURE__ */ new Date()).toISOString();
    this.state.update((state) => __spreadProps(__spreadValues({}, state), {
      categorySelections: __spreadProps(__spreadValues({}, state.categorySelections), { [categoryId]: choiceId })
    }));
    void this.mutateSession(this.event("debate.categoryVoteCast", "student", { categoryId, choiceId }), (session) => castCategoryVote(session, categoryId, { studentId: this.actorId(), choiceId, castAt: now })).catch(() => this.error.set("That clay token could not reach the shared voting urn. Please try again."));
  }
  async submitReflection() {
    const now = (/* @__PURE__ */ new Date()).toISOString();
    await this.mutateSession(this.event("debate.reflectionSubmitted", "student"), (session) => submitDebateReflection(session, this.actorId(), this.state().reflection, now));
  }
  async sealBallot() {
    if (!this.ballotComplete()) {
      this.error.set("Complete the post-debate opinion, every judgment, and your reflection before sealing the urn.");
      return;
    }
    const now = (/* @__PURE__ */ new Date()).toISOString();
    await this.mutateSession(this.event("debate.ballotSealed", "student"), (session) => completeDebateVoting(this.config, session, this.actorId(), now));
    this.enterRoom("verdict");
  }
  beginPremiere() {
    this.stopSpeaking();
    this.stopSessionTimer();
    this.state.update((state) => __spreadProps(__spreadValues({}, state), {
      room: "premiere",
      activeStation: void 0,
      activeSegmentIndex: 0
    }));
    this.segmentSecondsRemaining.set(this.segmentDuration(this.program()[0]));
    if (this.session().status === "premiere-ready" && this.canManageModerator()) {
      const now = (/* @__PURE__ */ new Date()).toISOString();
      void this.mutateSession(this.event("debate.premiereConvened", "teacher"), (session) => conveneDebatePremiere(session, now)).catch(() => this.error.set(`The shared ${this.assembly} could not be convened. The sealed record is unchanged.`));
    } else if (this.session().status === "premiere-ready") {
      this.notice.set("The complete record is sealed. The teacher will convene the class premiere.");
    }
  }
  playSession() {
    if (!this.premiereCanPlay()) {
      this.error.set(`Continuous playback begins when the teacher convenes the completed ${this.assembly} session.`);
      return;
    }
    const segment = this.activeSegment();
    if (segment === void 0)
      return;
    this.stopSessionTimer();
    this.sessionPlaying.set(true);
    this.state.update((state) => __spreadProps(__spreadValues({}, state), { premierePlaying: true }));
    if (segment.recording !== void 0)
      return;
    this.speak(segment.transcript);
    if (this.segmentSecondsRemaining() <= 0)
      this.segmentSecondsRemaining.set(this.segmentDuration(segment));
    this.sessionTimer = setInterval(() => {
      const next = this.segmentSecondsRemaining() - 1;
      this.segmentSecondsRemaining.set(Math.max(0, next));
      if (next <= 0)
        this.nextSegment(true);
    }, 1e3);
  }
  pauseSession() {
    this.stopSessionTimer();
    this.stopSpeaking();
    this.state.update((state) => __spreadProps(__spreadValues({}, state), { premierePlaying: false }));
  }
  nextSegment(continuePlaying = false) {
    const current = this.state().activeSegmentIndex;
    if (current >= this.program().length - 1) {
      this.stopSessionTimer();
      this.stopSpeaking();
      if (this.session().status === "premiere" && this.canManageModerator()) {
        const now = (/* @__PURE__ */ new Date()).toISOString();
        void this.mutateSession(this.event("debate.premiereCompleted", "teacher"), (session) => markPremiereComplete(session, now)).then(() => this.enterRoom("ballot")).catch(() => this.error.set("The voting urns could not be opened. The premiere remains available."));
      } else if (["voting", "complete"].includes(this.session().status)) {
        this.enterRoom("ballot");
      } else if (this.session().status === "premiere") {
        this.notice.set("The teacher will open the voting urns after the class premiere.");
      } else {
        this.notice.set("This is a preview of the record so far. Voting unlocks after both final addresses are filed.");
      }
      return;
    }
    this.stopSessionTimer();
    this.stopSpeaking();
    const nextIndex = current + 1;
    this.state.update((state) => __spreadProps(__spreadValues({}, state), {
      activeSegmentIndex: nextIndex,
      premierePlaying: continuePlaying
    }));
    this.segmentSecondsRemaining.set(this.segmentDuration(this.program()[nextIndex]));
    if (continuePlaying)
      setTimeout(() => this.playSession());
  }
  previousSegment() {
    this.stopSessionTimer();
    this.stopSpeaking();
    const nextIndex = Math.max(0, this.state().activeSegmentIndex - 1);
    this.state.update((state) => __spreadProps(__spreadValues({}, state), {
      activeSegmentIndex: nextIndex,
      premierePlaying: false
    }));
    this.segmentSecondsRemaining.set(this.segmentDuration(this.program()[nextIndex]));
  }
  recordedSegmentEnded() {
    if (this.sessionPlaying())
      this.nextSegment(true);
  }
  openBallot() {
    if (!["voting", "complete"].includes(this.session().status)) {
      this.error.set(`The voting urns remain sealed until the complete ${this.assembly} premiere has ended.`);
      return;
    }
    this.enterRoom("ballot");
  }
  revealNext() {
    const max = this.config.voteCategories.length + 1;
    this.state.update((state) => __spreadProps(__spreadValues({}, state), { verdictStep: Math.min(max, state.verdictStep + 1) }));
  }
  voteOptions(category) {
    if (category.optionSource === "factions") {
      return this.config.factions.map((faction) => ({
        id: faction.id,
        label: faction.name,
        detail: faction.position,
        emblem: faction.emblem,
        accent: faction.accent
      }));
    }
    const turns = this.session().turns.filter((turn) => turn.status === "filed");
    if (category.optionSource === "speakers") {
      return [
        ...new Map(turns.filter((turn) => turn.speakerId !== void 0).map((turn) => [
          turn.speakerId,
          {
            id: turn.speakerId,
            label: turn.speakerDisplayName ?? this.speakerLabel,
            detail: this.faction(turn.factionId)?.shortName
          }
        ])).values()
      ];
    }
    return turns.map((turn) => ({
      id: turn.id,
      label: `${turn.speakerDisplayName ?? this.speakerLabel} \xB7 ${turn.roundLabel}`,
      detail: excerpt(turn.transcript ?? "", 90)
    }));
  }
  categoryTally(categoryId) {
    return tallyVotes(this.session().categoryVotes[categoryId]);
  }
  winningChoice(categoryId) {
    return Object.entries(this.categoryTally(categoryId)).sort((left, right) => right[1] - left[1])[0]?.[0];
  }
  faction(factionId) {
    return this.config.factions.find((faction) => faction.id === factionId);
  }
  roleLabel(turn) {
    const faction = this.faction(turn?.factionId);
    return faction?.roles.find((role) => role.id === turn?.assignedRoleId)?.label ?? this.speakerLabel;
  }
  evidenceTitle(evidenceId) {
    return this.config.evidence.find((item) => item.id === evidenceId)?.title ?? evidenceId;
  }
  markerLabel(marker) {
    return {
      "answer-this": "Answer This",
      "challenge-this": "Challenge This",
      "strong-evidence": "Strong Evidence",
      "weak-evidence": "Weak Evidence",
      "needs-context": "Needs Context",
      "save-for-closing": "Save for Closing"
    }[marker];
  }
  clearNotice() {
    this.notice.set(void 0);
    this.error.set(void 0);
  }
  clearLocalDraft() {
    this.resetTurnWorkspace();
    this.notice.set(`Only your unfiled local preparation was cleared. The shared ${this.assembly} record was not changed.`);
  }
  formatTime(totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  }
  segmentDuration(segment) {
    if (segment === void 0)
      return 0;
    return Math.max(segment.durationSeconds, Math.ceil(segment.transcript.trim().split(/\s+/).length / 2.1) + 2);
  }
  async connectSharedSession() {
    try {
      const preferredFactionId = this.previewFactionId();
      const connection = await this.sessionAdapter.initialize(this.locator, this.seedSession, {
        displayName: this.config.viewer.studentDisplayName,
        factionId: preferredFactionId,
        role: this.config.viewer.mode === "teacher" ? "teacher" : "student",
        joinedAt: (/* @__PURE__ */ new Date()).toISOString()
      });
      this.actorId.set(connection.actorId);
      this.activeFactionId.set(connection.session.members[connection.actorId]?.factionId ?? preferredFactionId);
      this.acceptSession(connection.session);
      this.connectionState.set("shared");
      this.unsubscribeSession = this.sessionAdapter.subscribe(this.locator, (session) => this.acceptSession(session), () => {
        this.connectionState.set("error");
        this.error.set(`The shared ${this.assembly} connection was interrupted. Official actions are paused.`);
      });
    } catch {
      this.connectionState.set("error");
      this.error.set(`Firebase could not open the shared ${this.assembly}. Check Anonymous Authentication and database rules.`);
    }
  }
  acceptSession(session) {
    const priorTurnId = this.state().activeTurnId;
    const priorOpponentTurnId = this.previousOpponentTurn()?.id;
    this.session.set(session);
    const nextTurnId = this.turnForFaction(this.activeFactionId())?.id;
    if (priorTurnId !== void 0 && nextTurnId !== priorTurnId)
      this.resetTurnWorkspace();
    else if (priorTurnId === void 0 && nextTurnId !== void 0) {
      this.state.update((state) => __spreadProps(__spreadValues({}, state), { activeTurnId: nextTurnId }));
    }
    const incomingTurn = this.previousOpponentTurn();
    if (incomingTurn !== void 0 && incomingTurn.id !== priorOpponentTurnId && this.state().opponentHeardTurnId !== incomingTurn.id) {
      this.state.update((state) => __spreadProps(__spreadValues({}, state), { activeStation: "opponent" }));
      this.notice.set("A new opposing argument has crossed the chamber. Hear it before replying.");
    }
  }
  turnForFaction(factionId) {
    const activeId = this.state().activeTurnId;
    const eligible = this.session().turns.filter((turn) => turn.factionId === factionId && ["available", "drafting"].includes(turn.status)).sort((left, right) => left.order - right.order);
    return eligible.find((turn) => turn.id === activeId) ?? eligible[0];
  }
  async mutateSession(event, reducer) {
    if (this.connectionState() === "error")
      throw new Error("DEBATE_SESSION_UNAVAILABLE");
    const result = await this.sessionAdapter.mutate(this.locator, this.seedSession, event.clientEventId, (session) => {
      const reduced = reducer(session);
      return __spreadProps(__spreadValues({}, reduced), {
        eventHistory: [...reduced.eventHistory.slice(-99), event]
      });
    });
    this.acceptSession(result);
    return result;
  }
  event(eventType, actorType, payload) {
    this.eventSequence += 1;
    const clientEventId = `debate-${Date.now()}-${this.eventSequence}`;
    return {
      id: clientEventId,
      clientEventId,
      eventType,
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      projectId: this.config.projectId,
      actor: {
        type: actorType,
        id: actorType === "teacher" ? this.config.viewer.teacherDisplayName : this.actorId()
      },
      payload
    };
  }
  finishRecording() {
    if (this.recordingTimer !== void 0)
      clearInterval(this.recordingTimer);
    this.recordingTimer = void 0;
    const kind = this.activeRecordingKind ?? "audio";
    const contentType = this.mediaRecorder?.mimeType || (kind === "video" ? "video/webm" : "audio/webm");
    this.pendingRecordingBlob = new Blob(this.mediaChunks, { type: contentType });
    const priorUrl = this.recordingPreviewUrl();
    if (priorUrl !== void 0)
      URL.revokeObjectURL(priorUrl);
    this.recordingPreviewUrl.set(URL.createObjectURL(this.pendingRecordingBlob));
    this.stopMediaTracks();
    this.recordingState.set("ready");
    this.updateWorkspace({
      recordingReady: true,
      recordingKind: kind,
      recordingDurationSeconds: Math.max(1, Math.round((Date.now() - this.recordingStartedAt) / 1e3))
    });
    this.notice.set("Watch or listen to the full recording. You may record again before filing.");
  }
  updateWorkspace(patch) {
    this.state.update((state) => __spreadValues(__spreadValues({}, state), patch));
    this.saveWorkspace(this.state());
  }
  scheduleWorkspaceSave() {
    if (this.draftSaveTimer !== void 0)
      clearTimeout(this.draftSaveTimer);
    this.saveState.set("saving");
    this.draftSaveTimer = setTimeout(() => this.flushWorkspaceSave(), 500);
  }
  flushWorkspaceSave() {
    if (this.draftSaveTimer !== void 0)
      clearTimeout(this.draftSaveTimer);
    this.draftSaveTimer = void 0;
    this.saveWorkspace(this.state());
  }
  saveWorkspace(state) {
    try {
      this.workspacePersistence.save(this.config.projectId, this.config.projectVersion, this.config.sessionId, this.config.viewer.studentId, state);
      this.saveState.set("saved");
    } catch {
      this.saveState.set("local");
    }
  }
  loadWorkspace() {
    const initial = createInitialDebateWorkspace();
    const loaded = this.workspacePersistence.load(this.config.projectId, this.config.projectVersion, this.config.sessionId, this.config.viewer.studentId);
    if (loaded === void 0)
      return initial;
    return __spreadProps(__spreadValues(__spreadValues({}, initial), loaded), {
      annotations: [...loaded.annotations],
      selectedEvidenceIds: [...loaded.selectedEvidenceIds],
      evidenceMarks: __spreadValues({}, loaded.evidenceMarks),
      categorySelections: __spreadValues({}, loaded.categorySelections),
      room: "chamber",
      activeStation: void 0,
      premierePlaying: false
    });
  }
  inquiryState = computed(
    () => this.state().inquiry ?? emptyInquiryState(),
    ...ngDevMode ? [{ debugName: "inquiryState" }] : (
      /* istanbul ignore next */
      []
    )
  );
  inquiryGate(id) {
    return !!this.config.inquiry && inquiryGateReady(this.config.inquiry, this.inquiryState(), id);
  }
  updateInquiryDraft(key, value) {
    const inquiry = this.inquiryState();
    this.state.update((state) => __spreadProps(__spreadValues({}, state), { inquiry: __spreadProps(__spreadValues({}, inquiry), { drafts: __spreadProps(__spreadValues({}, inquiry.drafts), { [key]: value }) }) }));
    this.scheduleWorkspaceSave();
  }
  saveInquiryDrafts() {
    this.flushWorkspaceSave();
  }
  submitInquiryAttempt(lesson, prompt, response, targetId) {
    const definition = this.config.inquiry?.lessons.find((l) => l.number === lesson);
    if (!definition || !response.trim() || definition.requiresGate && !this.inquiryGate(definition.requiresGate))
      return false;
    if (targetId && !this.config.inquiry?.targets.some((t) => t.id === targetId))
      return false;
    const inquiry = this.inquiryState();
    const attempt = { id: crypto.randomUUID(), lesson, prompt, response: response.trim(), targetId, mode: "independent", createdAt: (/* @__PURE__ */ new Date()).toISOString() };
    this.updateWorkspace({ inquiry: __spreadProps(__spreadValues({}, inquiry), { attempts: [...inquiry.attempts, attempt] }) });
    return true;
  }
  reviewInquiryAttempt(attemptId, decision, feedback) {
    if (!this.canManageModerator() || !this.config.viewer.allowTeacherPreview || !feedback.trim())
      return;
    const inquiry = this.inquiryState();
    if (!inquiry.attempts.some((a) => a.id === attemptId))
      return;
    const review = {
      attemptId,
      decision,
      feedback: feedback.trim(),
      reviewerId: this.actorId(),
      createdAt: (/* @__PURE__ */ new Date()).toISOString(),
      authority: "demo"
    };
    const next = __spreadProps(__spreadValues({}, inquiry), { reviews: __spreadProps(__spreadValues({}, inquiry.reviews), { [attemptId]: review }), reviewHistory: [...inquiry.reviewHistory ?? [], review] });
    this.updateWorkspace({ inquiry: next });
  }
  resetTurnWorkspace(activeStation) {
    this.clearRecording();
    const room = this.state().room;
    const next = __spreadProps(__spreadValues({}, createInitialDebateWorkspace()), { room, activeStation, inquiry: this.state().inquiry });
    this.state.set(next);
    this.saveWorkspace(next);
  }
  clearRecording() {
    if (this.recordingTimer !== void 0)
      clearInterval(this.recordingTimer);
    this.recordingTimer = void 0;
    this.stopMediaTracks();
    this.pendingRecordingBlob = void 0;
    const url = this.recordingPreviewUrl();
    if (url !== void 0)
      URL.revokeObjectURL(url);
    this.recordingPreviewUrl.set(void 0);
  }
  stopMediaTracks() {
    this.mediaStream?.getTracks().forEach((track) => track.stop());
    this.mediaStream = void 0;
    this.mediaRecorder = void 0;
  }
  stopSessionTimer() {
    if (this.sessionTimer !== void 0)
      clearInterval(this.sessionTimer);
    this.sessionTimer = void 0;
    this.sessionPlaying.set(false);
  }
  dispose() {
    if (this.rehearsalTimer !== void 0)
      clearInterval(this.rehearsalTimer);
    if (this.draftSaveTimer !== void 0)
      clearTimeout(this.draftSaveTimer);
    if (this.filingAnimationTimer !== void 0)
      clearTimeout(this.filingAnimationTimer);
    this.stopSessionTimer();
    this.stopSpeaking();
    this.clearRecording();
    this.unsubscribeSession?.();
  }
  previewFactionId() {
    if (typeof location === "undefined" || this.config.viewer.mode !== "preview")
      return this.config.viewer.factionId;
    const requested = new URLSearchParams(location.search).get("faction");
    return this.config.factions.some((faction) => faction.id === requested) ? requested : this.config.viewer.factionId;
  }
  previewTeacherMode() {
    return this.config.viewer.allowTeacherPreview && typeof location !== "undefined" && new URLSearchParams(location.search).get("view") === "teacher";
  }
  static \u0275fac = function DebateStudioRuntimeService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DebateStudioRuntimeService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _DebateStudioRuntimeService, factory: _DebateStudioRuntimeService.\u0275fac });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DebateStudioRuntimeService, [{
    type: Injectable
  }], () => [], null);
})();
function hash(value) {
  let result = 0;
  for (const character of value)
    result = result * 31 + character.charCodeAt(0) | 0;
  return result;
}
function excerpt(value, length) {
  return value.length > length ? `${value.slice(0, length - 1).trim()}\u2026` : value;
}

export {
  BrowserDebateWorkspacePersistenceAdapter,
  MemoryDebateSessionAdapter,
  MemoryDebateMediaAdapter,
  DEBATE_STUDIO_SESSION,
  DEBATE_STUDIO_MEDIA,
  DEBATE_STUDIO_PERSISTENCE,
  createInitialDebateWorkspace,
  createInitialDebateSession,
  assembleBroadcastTimeline,
  DebateStudioRuntimeService
};
//# debugId=f8dc6e44-8753-5bef-a536-92f4a3c03003
//# sourceMappingURL=chunk-VCUNTQ4R.js.map
