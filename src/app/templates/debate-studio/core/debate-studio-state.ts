import type {
  DebateBroadcastSegment,
  DebateOpinionOption,
  DebateRoundDefinition,
  DebateSession,
  DebateSessionStatus,
  DebateStudioProjectConfig,
  DebateTurn,
  DebateTurnFiling,
  DebateVote,
  DebateWorkspaceState,
  ModeratorPrompt,
} from '../domain/debate-studio.models';

export function debateTurnId(roundId: string, factionId: string): string {
  return `${roundId}-${factionId}`;
}

export function createInitialDebateWorkspace(): DebateWorkspaceState {
  return {
    schemaVersion: '2.0',
    room: 'chamber',
    annotations: [],
    evidenceMarks: {},
    selectedEvidenceIds: [],
    draft: '',
    reasoningContribution: '',
    rehearsalSeconds: 0,
    rehearsed: false,
    recordingReady: false,
    recordingDurationSeconds: 0,
    reflection: '',
    categorySelections: {},
    activeSegmentIndex: 0,
    premierePlaying: false,
    verdictStep: 0,
  };
}

export function createInitialDebateSession(
  config: DebateStudioProjectConfig,
  now = new Date().toISOString(),
): DebateSession {
  const turns = createTurnPlan(config).map((turn) => {
    const seed = config.seedTurns.find((item) => item.turnId === turn.id);
    return seed === undefined
      ? turn
      : {
          ...turn,
          status: 'filed' as const,
          speakerId: seed.speakerId,
          speakerDisplayName: seed.speakerDisplayName,
          transcript: seed.transcript,
          evidenceIds: [...seed.evidenceIds],
          reasoningContribution: seed.reasoningContribution,
          durationSeconds: seed.durationSeconds,
          filedAt: seed.filedAt,
        };
  });
  const moderatorQueue: ModeratorPrompt[] = config.seedModeratorPrompts.map((prompt) => ({
    ...prompt,
    priority: config.moderator.promptPriorities[0] ?? 'point of clash',
    createdAt: now,
    generation: 1,
    approvedBy: 'teacher-seed',
    approvedAt: now,
    releasedAt: prompt.status === 'released' ? now : undefined,
  }));
  return advanceDebateSession(
    config,
    {
      schemaVersion: '2.0',
      id: config.sessionId,
      projectId: config.projectId,
      projectVersion: config.projectVersion,
      classId: config.viewer.classId,
      status: 'openings',
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
      updatedAt: now,
    },
    now,
  );
}

export function createTurnPlan(config: DebateStudioProjectConfig): readonly DebateTurn[] {
  const turns: DebateTurn[] = [];
  let priorRoundTurnIds: string[] = [];
  let order = 0;
  for (const round of config.rounds) {
    const factionOrder = [...(round.speakerOrder ?? config.factions.map((faction) => faction.id))];
    const thisRoundIds: string[] = [];
    let priorTurnId: string | undefined;
    for (const factionId of factionOrder) {
      order += 1;
      const id = debateTurnId(round.id, factionId);
      const faction = config.factions.find((item) => item.id === factionId);
      const role = faction?.roles.find((item) => item.roundTypes.includes(round.type));
      const dependencies =
        round.mode === 'parallel' || priorTurnId === undefined
          ? [...priorRoundTurnIds]
          : [priorTurnId];
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
        status: dependencies.length === 0 && !round.moderatorBeforeTurn ? 'available' : 'locked',
        evidenceIds: [],
        opponentAnnotations: [],
        argumentMasteryTags: [],
        historicalAccuracyTags: [],
      });
      thisRoundIds.push(id);
      priorTurnId = id;
    }
    priorRoundTurnIds = thisRoundIds;
  }
  return turns;
}

export function canFileTurn(
  round: DebateRoundDefinition,
  workspace: DebateWorkspaceState,
  hasPreviousOpponent: boolean,
): boolean {
  const heardOpponent = !hasPreviousOpponent || workspace.opponentHeardTurnId !== undefined;
  const heardModerator =
    !round.moderatorBeforeTurn || workspace.moderatorHeardPromptId !== undefined;
  return (
    heardOpponent &&
    heardModerator &&
    workspace.selectedEvidenceIds.length >= round.minimumEvidence &&
    workspace.annotations.length >= (hasPreviousOpponent ? 1 : 0) &&
    workspace.draft.trim().length >= 120 &&
    workspace.reasoningContribution.trim().length >= 30 &&
    workspace.rehearsed &&
    workspace.recordingReady
  );
}

export function fileDebateTurn(
  config: DebateStudioProjectConfig,
  session: DebateSession,
  turnId: string,
  filing: DebateTurnFiling,
): DebateSession {
  const target = session.turns.find((turn) => turn.id === turnId);
  if (target === undefined || !['available', 'drafting'].includes(target.status)) return session;
  const turns = session.turns.map((turn) =>
    turn.id === turnId
      ? {
          ...turn,
          ...filing,
          evidenceIds: [...filing.evidenceIds],
          opponentAnnotations: [...filing.opponentAnnotations],
          status: 'filed' as const,
        }
      : turn,
  );
  return advanceDebateSession(
    config,
    { ...session, turns, updatedAt: filing.filedAt },
    filing.filedAt,
  );
}

export function editModeratorPrompt(
  session: DebateSession,
  promptId: string,
  question: string,
  reason?: string,
): DebateSession {
  return {
    ...session,
    moderatorQueue: session.moderatorQueue.map((prompt) =>
      prompt.id === promptId && prompt.status !== 'released'
        ? {
            ...prompt,
            question: question.trim(),
            reason: reason?.trim() || prompt.reason,
            status: 'proposed',
          }
        : prompt,
    ),
  };
}

export function approveModeratorPrompt(
  session: DebateSession,
  promptId: string,
  teacherId: string,
  now: string,
): DebateSession {
  return {
    ...session,
    moderatorQueue: session.moderatorQueue.map((prompt) =>
      prompt.id === promptId && prompt.status === 'proposed'
        ? { ...prompt, status: 'approved', approvedBy: teacherId, approvedAt: now }
        : prompt,
    ),
    updatedAt: now,
  };
}

export function releaseModeratorPrompt(
  config: DebateStudioProjectConfig,
  session: DebateSession,
  promptId: string,
  teacherId: string,
  now: string,
): DebateSession {
  const moderatorQueue = session.moderatorQueue.map((prompt) =>
    prompt.id === promptId && ['proposed', 'approved'].includes(prompt.status)
      ? {
          ...prompt,
          status: 'released' as const,
          approvedBy: prompt.approvedBy ?? teacherId,
          approvedAt: prompt.approvedAt ?? now,
          releasedAt: now,
        }
      : prompt,
  );
  return advanceDebateSession(config, { ...session, moderatorQueue, updatedAt: now }, now);
}

export function regenerateModeratorPrompt(
  config: DebateStudioProjectConfig,
  session: DebateSession,
  promptId: string,
  now: string,
): DebateSession {
  const prior = session.moderatorQueue.find((prompt) => prompt.id === promptId);
  if (prior === undefined || prior.status === 'released') return session;
  const target = session.turns.find((turn) => turn.id === prior.targetTurnId);
  if (target === undefined) return session;
  const generation = prior.generation + 1;
  const replacement = draftModeratorPrompt(config, session.turns, target, now, generation);
  return {
    ...session,
    moderatorQueue: [
      ...session.moderatorQueue.map((prompt) =>
        prompt.id === promptId ? { ...prompt, status: 'superseded' as const } : prompt,
      ),
      replacement,
    ],
    updatedAt: now,
  };
}

export function castOpinionVote(
  session: DebateSession,
  phase: 'pre' | 'post',
  vote: DebateVote,
): DebateSession {
  if (phase === 'pre' && ['premiere', 'voting', 'complete'].includes(session.status))
    return session;
  if (phase === 'post' && !['voting', 'complete'].includes(session.status)) return session;
  return phase === 'pre'
    ? {
        ...session,
        preVotes: { ...session.preVotes, [vote.studentId]: vote },
        updatedAt: vote.castAt,
      }
    : {
        ...session,
        postVotes: { ...session.postVotes, [vote.studentId]: vote },
        updatedAt: vote.castAt,
      };
}

export function castCategoryVote(
  session: DebateSession,
  categoryId: string,
  vote: DebateVote,
): DebateSession {
  if (!['voting', 'complete'].includes(session.status)) return session;
  return {
    ...session,
    categoryVotes: {
      ...session.categoryVotes,
      [categoryId]: { ...(session.categoryVotes[categoryId] ?? {}), [vote.studentId]: vote },
    },
    updatedAt: vote.castAt,
  };
}

export function submitDebateReflection(
  session: DebateSession,
  studentId: string,
  text: string,
  now: string,
): DebateSession {
  if (!['voting', 'complete'].includes(session.status) || text.trim().length < 20) return session;
  return {
    ...session,
    reflections: {
      ...session.reflections,
      [studentId]: { studentId, text: text.trim(), submittedAt: now },
    },
    updatedAt: now,
  };
}

export function conveneDebatePremiere(session: DebateSession, now: string): DebateSession {
  return session.status === 'premiere-ready'
    ? { ...session, status: 'premiere', updatedAt: now }
    : session;
}

export function markPremiereComplete(session: DebateSession, now: string): DebateSession {
  if (session.status !== 'premiere') return session;
  return { ...session, status: 'voting', premiereCompletedAt: now, updatedAt: now };
}

export function debateVotingComplete(
  config: DebateStudioProjectConfig,
  session: DebateSession,
  studentId: string,
): boolean {
  return (
    session.postVotes[studentId] !== undefined &&
    config.voteCategories.every(
      (category) => session.categoryVotes[category.id]?.[studentId] !== undefined,
    ) &&
    session.reflections[studentId] !== undefined
  );
}

export function completeDebateVoting(
  config: DebateStudioProjectConfig,
  session: DebateSession,
  studentId: string,
  now: string,
): DebateSession {
  return debateVotingComplete(config, session, studentId)
    ? { ...session, status: 'complete', updatedAt: now }
    : session;
}

export function tallyVotes(
  votes: Readonly<Record<string, DebateVote>> | undefined,
): Readonly<Record<string, number>> {
  const tally: Record<string, number> = {};
  for (const vote of Object.values(votes ?? {}))
    tally[vote.choiceId] = (tally[vote.choiceId] ?? 0) + 1;
  return tally;
}

export function persuasionShift(
  session: DebateSession,
  options: readonly DebateOpinionOption[],
): readonly { option: DebateOpinionOption; before: number; after: number; change: number }[] {
  const before = tallyVotes(session.preVotes);
  const after = tallyVotes(session.postVotes);
  return options.map((option) => ({
    option,
    before: before[option.id] ?? 0,
    after: after[option.id] ?? 0,
    change: (after[option.id] ?? 0) - (before[option.id] ?? 0),
  }));
}

export function assembleBroadcastTimeline(
  config: DebateStudioProjectConfig,
  session: DebateSession,
): readonly DebateBroadcastSegment[] {
  const segments: DebateBroadcastSegment[] = [
    {
      id: 'ceremony-open',
      kind: 'ceremony',
      title: config.title,
      roundLabel: 'The Senate is called to order',
      transcript: `The presiding officer convenes the Senate to consider: ${config.centralQuestion}`,
      evidenceIds: [],
      durationSeconds: 10,
    },
  ];
  for (const round of config.rounds) {
    const roundTurns = session.turns.filter(
      (turn) => turn.roundId === round.id && turn.status === 'filed',
    );
    if (roundTurns.length === 0) continue;
    segments.push({
      id: `round-${round.id}`,
      kind: 'round-title',
      title: round.label,
      roundLabel: round.type === 'crossfire' ? 'Crossfire' : 'Proceedings',
      transcript: round.label,
      evidenceIds: [],
      durationSeconds: round.type === 'crossfire' ? 4 : 5,
    });
    for (const turn of roundTurns.sort((left, right) => left.order - right.order)) {
      const prompt = session.moderatorQueue.find(
        (item) => item.targetTurnId === turn.id && item.status === 'released',
      );
      if (prompt !== undefined) {
        segments.push({
          id: `broadcast-${prompt.id}`,
          kind: 'moderator',
          title: config.moderator.title,
          roundLabel: 'Question before the Senate',
          transcript: prompt.question,
          promptId: prompt.id,
          evidenceIds: [],
          durationSeconds: spokenDuration(prompt.question),
        });
      }
      segments.push({
        id: `broadcast-${turn.id}`,
        kind: 'student',
        title:
          config.factions.find((faction) => faction.id === turn.factionId)?.name ?? turn.factionId,
        roundLabel: turn.roundLabel,
        transcript: turn.transcript ?? '',
        factionId: turn.factionId,
        speakerDisplayName: turn.speakerDisplayName,
        turnId: turn.id,
        evidenceIds: [...turn.evidenceIds],
        recording: turn.recording,
        durationSeconds: turn.durationSeconds ?? spokenDuration(turn.transcript ?? ''),
      });
    }
  }
  if (session.turns.some((turn) => turn.roundType === 'closing' && turn.status === 'filed')) {
    segments.push({
      id: 'decision-of-class',
      kind: 'decision',
      title: 'The decision passes to the class',
      roundLabel: 'The record is sealed',
      transcript:
        'The Senate has heard both factions. The class will now judge the evidence and the arguments.',
      evidenceIds: [],
      durationSeconds: 8,
    });
  }
  return segments;
}

export function advanceDebateSession(
  config: DebateStudioProjectConfig,
  session: DebateSession,
  now: string,
): DebateSession {
  let moderatorQueue = [...session.moderatorQueue];
  let turns = session.turns.map((turn) => ({ ...turn }));
  for (const turn of turns) {
    if (turn.status !== 'locked') continue;
    const dependenciesFiled = turn.dependsOnTurnIds.every(
      (dependencyId) => turns.find((item) => item.id === dependencyId)?.status === 'filed',
    );
    if (!dependenciesFiled) continue;
    if (!turn.moderatorRequired) {
      turns = turns.map((item) =>
        item.id === turn.id ? { ...item, status: 'available' as const } : item,
      );
      continue;
    }
    const prompt = moderatorQueue.find(
      (item) => item.targetTurnId === turn.id && item.status !== 'superseded',
    );
    if (prompt?.status === 'released') {
      turns = turns.map((item) =>
        item.id === turn.id ? { ...item, status: 'available' as const } : item,
      );
    } else if (prompt === undefined) {
      moderatorQueue.push(draftModeratorPrompt(config, turns, turn, now, 1));
    }
  }
  const finalTurns = turns.filter((turn) => turn.roundType === 'closing');
  const complete = finalTurns.length > 0 && finalTurns.every((turn) => turn.status === 'filed');
  const currentTurn = turns
    .filter((turn) => turn.status === 'available' || turn.status === 'drafting')
    .sort((left, right) => left.order - right.order)[0];
  const nextTurn = currentTurn ?? turns.find((turn) => turn.status !== 'filed');
  const roundIndex = Math.max(
    0,
    config.rounds.findIndex((round) => round.id === nextTurn?.roundId),
  );
  const status = complete ? 'premiere-ready' : statusForRound(config.rounds[roundIndex]);
  const next = {
    ...session,
    status,
    currentTurnId: currentTurn?.id ?? null,
    currentRound: roundIndex,
    turns,
    moderatorQueue,
    updatedAt: now,
  };
  return { ...next, broadcastTimeline: assembleBroadcastTimeline(config, next) };
}

function draftModeratorPrompt(
  config: DebateStudioProjectConfig,
  turns: readonly DebateTurn[],
  target: DebateTurn,
  now: string,
  generation: number,
): ModeratorPrompt {
  const triggerTurns = target.dependsOnTurnIds
    .map((id) => turns.find((turn) => turn.id === id))
    .filter((turn): turn is DebateTurn => turn?.status === 'filed');
  const mostRecent = triggerTurns.at(-1);
  const opponent =
    mostRecent === undefined
      ? undefined
      : config.factions.find((faction) => faction.id === mostRecent.factionId);
  const targetFaction = config.factions.find((faction) => faction.id === target.factionId);
  const priority =
    config.moderator.promptPriorities[
      (generation - 1) % config.moderator.promptPriorities.length
    ] ?? 'unanswered claim';
  const excerpt = sentenceExcerpt(mostRecent?.transcript ?? config.centralQuestion);
  const question =
    triggerTurns.length > 1
      ? `Both factions have described the same crisis differently. ${targetFaction?.shortName ?? 'Senators'}, where should the line be drawn between necessary leadership and power that can no longer be restrained? Use the record to answer.`
      : `${opponent?.shortName ?? 'The opposing faction'} has argued, “${excerpt}” ${targetFaction?.shortName ?? 'Senators'}, which evidence most directly answers that claim, and what limit or tradeoff does it reveal?`;
  return {
    id: `moderator-${target.id}-${generation}`,
    targetTurnId: target.id,
    question,
    reason: `Selected because the record contains a ${priority} that the next faction must address directly.`,
    triggerTurnIds: triggerTurns.map((turn) => turn.id),
    priority,
    status: 'proposed',
    createdAt: now,
    generation,
  };
}

function statusForRound(round: DebateRoundDefinition | undefined): DebateSessionStatus {
  if (round === undefined) return 'premiere-ready';
  if (round.type === 'opening') return 'openings';
  if (round.type === 'crossfire') return 'crossfire';
  if (round.type === 'closing') return 'closings';
  return 'exchange';
}

function sentenceExcerpt(transcript: string): string {
  const sentence = transcript.trim().split(/(?<=[.!?])\s+/)[0] ?? transcript.trim();
  return sentence.length > 150 ? `${sentence.slice(0, 147).trim()}…` : sentence;
}

function spokenDuration(transcript: string): number {
  const words = transcript.trim().length === 0 ? 0 : transcript.trim().split(/\s+/).length;
  return Math.max(4, Math.ceil(words / 2.1) + 2);
}
