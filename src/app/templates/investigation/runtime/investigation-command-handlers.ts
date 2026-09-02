import type {
  CommandHandler,
  CommandHandlingResult,
} from '../../../core/commands/command-handler-contracts';
import type {
  CommandExecutionContext,
  RuntimeCommand,
} from '../../../core/commands/runtime-command';
import { runtimeError } from '../../../core/errors/runtime-error-factory';
import { pointer } from '../../../core/state/state-mutation-applier';
import type {
  HypothesisRuntimeState,
  RuntimeEvidenceRelationship,
  RuntimeStateSnapshot,
  StudentEvidenceRuntimeRecord,
} from '../domain/runtime-state';
import type { ProjectDefinitionGraph } from '../package/project-definition-graph';

export function investigationCommandHandler(
  commandType: string,
): CommandHandler<RuntimeStateSnapshot, ProjectDefinitionGraph> {
  return {
    commandType,
    execute: (command, state, context) => execute(command, state, context),
  };
}

function execute(
  command: RuntimeCommand,
  state: Readonly<RuntimeStateSnapshot>,
  context: CommandExecutionContext<ProjectDefinitionGraph>,
): CommandHandlingResult {
  const graph = context.definitions;
  if (graph === undefined) {
    return failure('PROJECT_DEFINITION_REQUIRED', 'Investigation command requires definitions.');
  }

  switch (command.commandType) {
    case 'evidence.unlock':
    case 'evidence.reveal':
      return setEvidenceStatus(command, state, graph, 'available');
    case 'evidence.lock':
      return setEvidenceStatus(command, state, graph, 'locked');
    case 'evidence.hide':
      return setEvidenceStatus(command, state, graph, 'hidden');
    case 'evidence.view':
      return setEvidenceStatus(command, state, graph, 'viewed', ['available', 'unopened']);
    case 'evidence.collect':
      return setEvidenceStatus(command, state, graph, 'collected', [
        'available',
        'unopened',
        'viewed',
      ]);
    case 'evidence.useInClaim':
      return useEvidenceInFinal(command, state, graph);
    case 'evidence.setImportance':
      return setEvidenceImportance(command, state, graph);
    case 'evidence.classify':
      return classifyEvidence(command, state, graph);
    case 'evidence.annotate':
      return annotateEvidence(command, state, graph);
    case 'evidence.connect':
      return connectEvidence(command, state, graph, context);
    case 'evidence.disconnect':
      return disconnectEvidence(command, state);
    case 'evidence.create':
    case 'evidence.studentCreate':
      return createEvidence(command, state, graph, context);
    case 'board.createQuestion':
      return createQuestion(command, state, context);
    case 'activity.unlock':
      return setActivityStatus(command, state, graph, 'notStarted');
    case 'activity.lock':
      return setActivityStatus(command, state, graph, 'locked');
    case 'activity.start':
      return setActivityStatus(command, state, graph, 'inProgress');
    case 'activity.complete':
      return setActivityStatus(command, state, graph, 'complete');
    case 'activity.submitResult':
      return submitActivityResult(command, state, graph);
    case 'lesson.unlock':
      return setLessonStatus(command, state, graph);
    case 'phase.unlock':
      return setPhaseStatus(command, state, graph, 'available');
    case 'phase.complete':
      return setPhaseStatus(command, state, graph, 'complete');
    case 'resource.add':
    case 'resource.spend':
      return changeResource(command, state, graph);
    case 'message.show':
      return appendMessage(command, state, context, false);
    case 'teacher.notify':
      return appendMessage(command, state, context, true);
    case 'hypothesis.require':
      return setRequirement('hypothesisRequired', command.value ?? true);
    case 'revision.require':
      return setRequirement('revisionRequired', command.value ?? true);
    case 'finalSubmission.open':
      return setFinalStatus('open');
    case 'finalSubmission.close':
      return setFinalStatus('closed');
    case 'finalSubmission.submit':
      return submitFinal(state, context);
    case 'finalSubmission.updateDraft':
      return updateFinalDraft(command, state);
    case 'solution.reveal':
      return { mutations: [{ operation: 'set', path: '/solutionRevealed', value: true }] };
    case 'npc.unlockDialogue':
      return unlockDialogue(command, state, graph);
    case 'npc.completeDialogue':
      return completeDialogue(command, state, graph);
    case 'hypothesis.create':
      return createHypothesis(command, state, context);
    case 'hypothesis.revise':
      return reviseHypothesis(command, state, context);
    case 'hypothesis.select':
      return selectHypothesis(command, state);
    case 'hypothesis.rank':
      return setHypothesisField(command, state, 'ranking', 'number');
    case 'hypothesis.eliminate':
      return setHypothesisField(command, state, 'eliminated', 'boolean', true);
    case 'hypothesis.attachEvidence':
      return attachEvidence(command, state, graph);
    case 'confidence.set':
      return setConfidence(command, state);
    case 'teacher.release':
      return command.targetId === undefined
        ? failure('INVALID_COMMAND', 'teacher.release requires targetId.')
        : {
            mutations: [
              {
                operation: 'set',
                path: pointer('teacherReleases', command.targetId),
                value: true,
              },
            ],
          };
    case 'artifact.saveVersion':
      return saveArtifactVersion(command, state, context);
    default:
      return failure('INVALID_COMMAND', `Unsupported command "${command.commandType}".`);
  }
}

function saveArtifactVersion(
  command: RuntimeCommand,
  state: Readonly<RuntimeStateSnapshot>,
  context: CommandExecutionContext<ProjectDefinitionGraph>,
): CommandHandlingResult {
  const artifactId = command.targetId;
  if (artifactId === undefined || !isRecord(command.value)) {
    return failure(
      'INVALID_COMMAND_VALUE',
      'artifact.saveVersion requires an artifact ID and content payload.',
      artifactId,
    );
  }

  const current = state.artifacts[artifactId];
  const version = (current?.latestVersion ?? 0) + 1;
  const evidenceIds = stringArray(command.value['evidenceIds']);
  const sourceActivityId = command.value['sourceActivityId'];

  return {
    mutations: [
      {
        operation: 'set',
        path: pointer('artifacts', artifactId),
        value: {
          artifactId,
          latestVersion: version,
          versions: [
            ...(current?.versions ?? []),
            {
              version,
              savedAt: context.eventTimestamp ?? state.lastUpdated,
              actor: context.actor ?? { type: 'system' as const },
              content: structuredClone(command.value['content'] ?? command.value),
              evidenceIds,
              sourceActivityId: typeof sourceActivityId === 'string' ? sourceActivityId : undefined,
            },
          ],
        },
      },
    ],
  };
}

function setEvidenceStatus(
  command: RuntimeCommand,
  state: Readonly<RuntimeStateSnapshot>,
  graph: ProjectDefinitionGraph,
  status: RuntimeStateSnapshot['evidence'][string]['status'],
  allowedCurrent?: RuntimeStateSnapshot['evidence'][string]['status'][],
): CommandHandlingResult {
  const id = command.targetId;
  if (id === undefined || !graph.evidenceById.has(id) || state.evidence[id] === undefined) {
    return missing('evidence', id);
  }
  if (allowedCurrent !== undefined && !allowedCurrent.includes(state.evidence[id].status)) {
    return failure(
      'INVALID_EVIDENCE_TRANSITION',
      `Evidence "${id}" cannot transition from ${state.evidence[id].status} to ${status}.`,
      id,
    );
  }
  return {
    mutations: [{ operation: 'set', path: pointer('evidence', id, 'status'), value: status }],
  };
}

function classifyEvidence(
  command: RuntimeCommand,
  state: Readonly<RuntimeStateSnapshot>,
  graph: ProjectDefinitionGraph,
): CommandHandlingResult {
  const id = command.targetId;
  if (
    id === undefined ||
    (!graph.evidenceById.has(id) && state.studentEvidence[id] === undefined)
  ) {
    return missing('evidence', id);
  }
  if (typeof command.value !== 'string' || command.value.length === 0) {
    return failure('INVALID_COMMAND_VALUE', 'evidence.classify requires a classification.', id);
  }
  return state.studentEvidence[id] === undefined
    ? {
        mutations: [
          {
            operation: 'set',
            path: pointer('evidence', id, 'classification'),
            value: command.value,
          },
          { operation: 'set', path: pointer('evidence', id, 'status'), value: 'classified' },
        ],
      }
    : {
        mutations: [
          {
            operation: 'set',
            path: pointer('studentEvidence', id, 'classification'),
            value: command.value,
          },
        ],
      };
}

function annotateEvidence(
  command: RuntimeCommand,
  state: Readonly<RuntimeStateSnapshot>,
  graph: ProjectDefinitionGraph,
): CommandHandlingResult {
  const id = command.targetId;
  if (
    id === undefined ||
    (!graph.evidenceById.has(id) && state.studentEvidence[id] === undefined)
  ) {
    return missing('evidence', id);
  }
  if (typeof command.value !== 'string' || command.value.length === 0) {
    return failure('INVALID_COMMAND_VALUE', 'evidence.annotate requires note text.', id);
  }
  return state.studentEvidence[id] === undefined
    ? {
        mutations: [
          { operation: 'append', path: pointer('evidence', id, 'notes'), value: command.value },
          { operation: 'set', path: pointer('evidence', id, 'status'), value: 'annotated' },
        ],
      }
    : {
        mutations: [
          {
            operation: 'append',
            path: pointer('studentEvidence', id, 'notes'),
            value: command.value,
          },
        ],
      };
}

function useEvidenceInFinal(
  command: RuntimeCommand,
  state: Readonly<RuntimeStateSnapshot>,
  graph: ProjectDefinitionGraph,
): CommandHandlingResult {
  const id = command.targetId;
  if (
    id === undefined ||
    (!graph.evidenceById.has(id) && state.studentEvidence[id] === undefined)
  ) {
    return missing('evidence', id);
  }
  return state.studentEvidence[id] === undefined
    ? setEvidenceStatus(command, state, graph, 'usedInClaim')
    : {
        mutations: [
          {
            operation: 'set',
            path: pointer('studentEvidence', id, 'usedInFinalClaim'),
            value: true,
          },
        ],
      };
}

function setEvidenceImportance(
  command: RuntimeCommand,
  state: Readonly<RuntimeStateSnapshot>,
  graph: ProjectDefinitionGraph,
): CommandHandlingResult {
  const id = command.targetId;
  if (
    id === undefined ||
    typeof command.value !== 'boolean' ||
    (!graph.evidenceById.has(id) && state.studentEvidence[id] === undefined)
  ) {
    return failure(
      'INVALID_COMMAND_VALUE',
      'evidence.setImportance requires an evidence ID and boolean value.',
      id,
    );
  }
  const collection = state.studentEvidence[id] === undefined ? 'evidence' : 'studentEvidence';
  return {
    mutations: [
      {
        operation: 'set',
        path: pointer(collection, id, 'important'),
        value: command.value,
      },
    ],
  };
}

function createQuestion(
  command: RuntimeCommand,
  state: Readonly<RuntimeStateSnapshot>,
  context: CommandExecutionContext<ProjectDefinitionGraph>,
): CommandHandlingResult {
  if (
    command.targetId === undefined ||
    typeof command.value !== 'string' ||
    command.value.trim().length === 0
  ) {
    return failure(
      'INVALID_COMMAND_VALUE',
      'board.createQuestion requires a question ID and text.',
      command.targetId,
    );
  }
  if (state.board.questions?.some((question) => question.id === command.targetId)) {
    return failure('DUPLICATE_QUESTION', `Question "${command.targetId}" already exists.`);
  }
  return {
    mutations: [
      {
        operation: 'append',
        path: '/board/questions',
        value: {
          id: command.targetId,
          text: command.value.trim(),
          status: 'open',
          sourceEvidenceId:
            typeof command.params?.['sourceEvidenceId'] === 'string'
              ? command.params['sourceEvidenceId']
              : undefined,
          createdAt: context.eventTimestamp ?? state.lastUpdated,
          authorId: context.actor?.id,
        },
      },
    ],
  };
}

function connectEvidence(
  command: RuntimeCommand,
  state: Readonly<RuntimeStateSnapshot>,
  graph: ProjectDefinitionGraph,
  context: CommandExecutionContext<ProjectDefinitionGraph>,
): CommandHandlingResult {
  const sourceId = command.targetId;
  const targetId = command.params?.['targetId'];
  const relationshipType = command.params?.['relationshipType'];
  if (
    sourceId === undefined ||
    !graph.evidenceById.has(sourceId) ||
    typeof targetId !== 'string' ||
    typeof relationshipType !== 'string'
  ) {
    return failure(
      'INVALID_COMMAND_VALUE',
      'evidence.connect requires valid source, targetId, and relationshipType.',
      sourceId,
    );
  }
  const id =
    typeof command.params?.['relationshipId'] === 'string'
      ? command.params['relationshipId']
      : `${sourceId}:${relationshipType}:${targetId}`;
  if (state.evidenceRelationships.some((relationship) => relationship.id === id)) {
    return { mutations: [] };
  }
  const relationship: RuntimeEvidenceRelationship = {
    id,
    sourceId,
    targetId,
    relationshipType,
    actor: context.actor ?? { type: 'system' },
    createdAt: context.eventTimestamp ?? state.lastUpdated,
  };
  return {
    mutations: [{ operation: 'append', path: '/evidenceRelationships', value: relationship }],
  };
}

function disconnectEvidence(
  command: RuntimeCommand,
  state: Readonly<RuntimeStateSnapshot>,
): CommandHandlingResult {
  const relationshipId =
    typeof command.value === 'string' ? command.value : command.params?.['relationshipId'];
  if (typeof relationshipId !== 'string') {
    return failure(
      'INVALID_COMMAND_VALUE',
      'evidence.disconnect requires a relationship ID.',
      command.targetId,
    );
  }
  return {
    mutations: [
      {
        operation: 'set',
        path: '/evidenceRelationships',
        value: state.evidenceRelationships.filter(
          (relationship) => relationship.id !== relationshipId,
        ),
      },
    ],
  };
}

function createEvidence(
  command: RuntimeCommand,
  state: Readonly<RuntimeStateSnapshot>,
  graph: ProjectDefinitionGraph,
  context: CommandExecutionContext<ProjectDefinitionGraph>,
): CommandHandlingResult {
  const id = command.targetId;
  if (id !== undefined && graph.evidenceById.has(id)) {
    return setEvidenceStatus(command, state, graph, 'available');
  }
  if (id === undefined || !isRecord(command.value)) {
    return failure(
      'INVALID_COMMAND_VALUE',
      'Evidence creation requires targetId and a value object.',
      id,
    );
  }
  if (state.studentEvidence[id] !== undefined || state.evidence[id] !== undefined) {
    return failure('DUPLICATE_EVIDENCE', `Evidence "${id}" already exists.`, id);
  }
  const evidenceType = command.value['evidenceType'];
  const title = command.value['title'];
  if (typeof evidenceType !== 'string' || typeof title !== 'string') {
    return failure(
      'INVALID_COMMAND_VALUE',
      'Student evidence requires evidenceType and title.',
      id,
    );
  }
  const record: StudentEvidenceRuntimeRecord = {
    id,
    evidenceType,
    title,
    content: structuredClone(command.value['content']),
    createdAt: context.eventTimestamp ?? state.lastUpdated,
    actor: context.actor ?? { type: 'system' },
    sourceActivityId:
      typeof command.value['sourceActivityId'] === 'string'
        ? command.value['sourceActivityId']
        : undefined,
    metadata: isRecord(command.value['metadata'])
      ? structuredClone(command.value['metadata'])
      : undefined,
    notes: [],
    important: false,
    usedInFinalClaim: false,
  };
  return {
    mutations: [{ operation: 'set', path: pointer('studentEvidence', id), value: record }],
  };
}

function setActivityStatus(
  command: RuntimeCommand,
  state: Readonly<RuntimeStateSnapshot>,
  graph: ProjectDefinitionGraph,
  status: RuntimeStateSnapshot['activities'][string]['status'],
): CommandHandlingResult {
  const id = command.targetId;
  if (id === undefined || !graph.activitiesById.has(id) || state.activities[id] === undefined) {
    return missing('activity', id);
  }
  const mutations: CommandHandlingResult['mutations'] = [
    { operation: 'set', path: pointer('activities', id, 'status'), value: status },
  ];
  if (status === 'notStarted' || status === 'inProgress' || status === 'complete') {
    mutations.push({
      operation: 'set',
      path: pointer('activities', id, 'completionStatus'),
      value:
        status === 'notStarted'
          ? 'notStarted'
          : status === 'inProgress'
            ? 'inProgress'
            : 'complete',
    });
  }
  if (status === 'submitted') {
    mutations.push({
      operation: 'set',
      path: pointer('activities', id, 'submissionStatus'),
      value: 'submitted',
    });
  }
  return {
    mutations,
  };
}

function submitActivityResult(
  command: RuntimeCommand,
  state: Readonly<RuntimeStateSnapshot>,
  graph: ProjectDefinitionGraph,
): CommandHandlingResult {
  const status = setActivityStatus(command, state, graph, 'submitted');
  if (status.errors !== undefined) {
    return status;
  }
  return {
    mutations: [
      ...status.mutations,
      {
        operation: 'set',
        path: pointer('activities', command.targetId ?? '', 'lastResult'),
        value: command.value,
      },
    ],
  };
}

function setLessonStatus(
  command: RuntimeCommand,
  state: Readonly<RuntimeStateSnapshot>,
  graph: ProjectDefinitionGraph,
): CommandHandlingResult {
  const id = command.targetId;
  if (id === undefined || !graph.lessonsById.has(id) || state.lessons[id] === undefined) {
    return missing('lesson', id);
  }
  return {
    mutations: [{ operation: 'set', path: pointer('lessons', id, 'status'), value: 'available' }],
  };
}

function setPhaseStatus(
  command: RuntimeCommand,
  state: Readonly<RuntimeStateSnapshot>,
  graph: ProjectDefinitionGraph,
  status: RuntimeStateSnapshot['phases'][string]['status'],
): CommandHandlingResult {
  const id = command.targetId;
  const exists = graph.investigation.phases.some((phase) => phase.id === id);
  if (id === undefined || !exists || state.phases[id] === undefined) {
    return missing('phase', id);
  }
  return {
    mutations: [{ operation: 'set', path: pointer('phases', id, 'status'), value: status }],
  };
}

function changeResource(
  command: RuntimeCommand,
  state: Readonly<RuntimeStateSnapshot>,
  graph: ProjectDefinitionGraph,
): CommandHandlingResult {
  const id = command.targetId;
  const definition = id === undefined ? undefined : graph.resourcesById.get(id);
  const current = id === undefined ? undefined : state.resources[id];
  if (id === undefined || definition === undefined || current === undefined) {
    return missing('resource', id);
  }
  if (typeof command.value !== 'number' || !Number.isFinite(command.value) || command.value < 0) {
    return failure('INVALID_RESOURCE_AMOUNT', 'Resource amount must be non-negative.', id);
  }
  const next =
    command.commandType === 'resource.spend' ? current - command.value : current + command.value;
  if (definition.min !== undefined && next < definition.min) {
    return failure('INSUFFICIENT_RESOURCE', `Resource "${id}" is below its minimum.`, id);
  }
  if (definition.max !== undefined && next > definition.max) {
    return failure('RESOURCE_MAX_EXCEEDED', `Resource "${id}" exceeds its maximum.`, id);
  }
  return {
    mutations: [{ operation: 'set', path: pointer('resources', id), value: next }],
  };
}

function appendMessage(
  command: RuntimeCommand,
  state: Readonly<RuntimeStateSnapshot>,
  context: CommandExecutionContext<ProjectDefinitionGraph>,
  teacher: boolean,
): CommandHandlingResult {
  if (typeof command.value !== 'string' || command.value.length === 0) {
    return failure('INVALID_COMMAND_VALUE', `${command.commandType} requires message text.`);
  }
  const level = command.params?.['level'] === 'warning' ? 'warning' : 'info';
  return {
    mutations: [
      {
        operation: 'append',
        path: teacher ? '/teacherNotifications' : '/messages',
        value: {
          id: `${teacher ? 'teacher' : 'message'}-${context.requestId ?? state.version}`,
          message: command.value,
          level,
          createdAt: context.eventTimestamp ?? state.lastUpdated,
        },
      },
    ],
  };
}

function setRequirement(
  key: 'hypothesisRequired' | 'revisionRequired',
  value: unknown,
): CommandHandlingResult {
  if (typeof value !== 'boolean') {
    return failure('INVALID_COMMAND_VALUE', `${key} requires a boolean value.`);
  }
  return {
    mutations: [{ operation: 'set', path: pointer('requirements', key), value }],
  };
}

function setFinalStatus(
  status: RuntimeStateSnapshot['finalSubmission']['status'],
): CommandHandlingResult {
  const availabilityStatus = status === 'open' ? 'open' : 'closed';
  return {
    mutations: [
      { operation: 'set', path: '/finalSubmission/status', value: status },
      {
        operation: 'set',
        path: '/finalSubmission/availabilityStatus',
        value: availabilityStatus,
      },
    ],
  };
}

function submitFinal(
  state: Readonly<RuntimeStateSnapshot>,
  context: CommandExecutionContext<ProjectDefinitionGraph>,
): CommandHandlingResult {
  if (state.finalSubmission.status !== 'open') {
    return failure('FINAL_SUBMISSION_CLOSED', 'Final submission is not open.');
  }
  return {
    mutations: [
      { operation: 'set', path: '/finalSubmission/status', value: 'submitted' },
      {
        operation: 'set',
        path: '/finalSubmission/submissionStatus',
        value: 'submitted',
      },
      {
        operation: 'set',
        path: '/finalSubmission/submittedAt',
        value: context.eventTimestamp ?? state.lastUpdated,
      },
    ],
  };
}

function updateFinalDraft(
  command: RuntimeCommand,
  state: Readonly<RuntimeStateSnapshot>,
): CommandHandlingResult {
  if (!isRecord(command.value)) {
    return failure('INVALID_COMMAND_VALUE', 'finalSubmission.updateDraft requires a draft object.');
  }

  const next = structuredClone(state.finalSubmission.argumentDraft);
  const stringFields = [
    'claim',
    'identification',
    'diagnosis',
    'cause',
    'recommendation',
    'reasoning',
    'counterevidence',
    'alternativeExplanation',
    'uncertainty',
    'nextTest',
    'safetyRecommendation',
    'reflection',
    'individualContribution',
  ] as const;
  for (const field of stringFields) {
    const value = command.value[field];
    if (typeof value === 'string') {
      next[field] = value;
    }
  }
  const evidenceIds = stringArray(command.value['evidenceIds']);
  if (evidenceIds !== undefined) {
    next.evidenceIds = evidenceIds;
  }
  const confidence = command.value['confidence'];
  if (typeof confidence === 'number' && Number.isFinite(confidence)) {
    next.confidence = Math.max(0, Math.min(100, confidence));
  }
  return {
    mutations: [
      {
        operation: 'set',
        path: '/finalSubmission/argumentDraft',
        value: next,
      },
    ],
  };
}

function unlockDialogue(
  command: RuntimeCommand,
  state: Readonly<RuntimeStateSnapshot>,
  graph: ProjectDefinitionGraph,
): CommandHandlingResult {
  const npcId = command.targetId;
  const dialogueId =
    typeof command.value === 'string' ? command.value : command.params?.['dialogueId'];
  if (
    npcId === undefined ||
    !graph.npcsById.has(npcId) ||
    state.npc?.[npcId] === undefined ||
    typeof dialogueId !== 'string'
  ) {
    return failure(
      'INVALID_COMMAND_VALUE',
      'npc.unlockDialogue requires valid NPC and dialogue IDs.',
      npcId,
    );
  }
  return {
    mutations: [
      {
        operation: 'add',
        path: pointer('npc', npcId, 'unlockedDialogueIds'),
        value: dialogueId,
      },
    ],
  };
}

function completeDialogue(
  command: RuntimeCommand,
  state: Readonly<RuntimeStateSnapshot>,
  graph: ProjectDefinitionGraph,
): CommandHandlingResult {
  const npcId = command.targetId;
  const dialogueId = command.value;
  if (
    npcId === undefined ||
    !graph.npcsById.has(npcId) ||
    state.npc?.[npcId] === undefined ||
    typeof dialogueId !== 'string'
  ) {
    return failure(
      'INVALID_COMMAND_VALUE',
      'npc.completeDialogue requires valid NPC and dialogue IDs.',
      npcId,
    );
  }
  return {
    mutations: [
      {
        operation: 'add',
        path: pointer('npc', npcId, 'dialogueCompletedIds'),
        value: dialogueId,
      },
    ],
  };
}

function createHypothesis(
  command: RuntimeCommand,
  state: Readonly<RuntimeStateSnapshot>,
  context: CommandExecutionContext<ProjectDefinitionGraph>,
): CommandHandlingResult {
  const id = command.targetId;
  if (id === undefined || typeof command.value !== 'string' || command.value.length === 0) {
    return failure(
      'INVALID_COMMAND_VALUE',
      'hypothesis.create requires targetId and statement.',
      id,
    );
  }
  if (state.hypotheses.some((hypothesis) => hypothesis.id === id)) {
    return failure('DUPLICATE_HYPOTHESIS', `Hypothesis "${id}" already exists.`, id);
  }
  const hypothesis: HypothesisRuntimeState = {
    id,
    statement: command.value,
    revisions: [
      {
        revisionId: `${id}-initial`,
        hypothesisId: id,
        timestamp: context.eventTimestamp ?? state.lastUpdated,
        statement: command.value,
        confidence:
          typeof command.params?.['confidence'] === 'number'
            ? command.params['confidence']
            : undefined,
        evidenceIds: stringArray(command.params?.['evidenceIds']),
        reasoning:
          typeof command.params?.['reasoning'] === 'string'
            ? command.params['reasoning']
            : undefined,
        remainingQuestion:
          typeof command.params?.['remainingQuestion'] === 'string'
            ? command.params['remainingQuestion']
            : undefined,
      },
    ],
    confidence:
      typeof command.params?.['confidence'] === 'number' ? command.params['confidence'] : undefined,
    evidenceIds: stringArray(command.params?.['evidenceIds']) ?? [],
    reasoning:
      typeof command.params?.['reasoning'] === 'string' ? command.params['reasoning'] : undefined,
    remainingQuestion:
      typeof command.params?.['remainingQuestion'] === 'string'
        ? command.params['remainingQuestion']
        : undefined,
    selected:
      context.definitions?.investigation.hypotheses?.allowMultiple === false ||
      !state.hypotheses.some((hypothesis) => hypothesis.selected),
  };
  return { mutations: [{ operation: 'append', path: '/hypotheses', value: hypothesis }] };
}

function reviseHypothesis(
  command: RuntimeCommand,
  state: Readonly<RuntimeStateSnapshot>,
  context: CommandExecutionContext<ProjectDefinitionGraph>,
): CommandHandlingResult {
  const id = command.targetId;
  const index = state.hypotheses.findIndex((hypothesis) => hypothesis.id === id);
  if (id === undefined || index < 0) {
    return missing('hypothesis', id);
  }
  if (typeof command.value !== 'string' || command.value.length === 0) {
    return failure('INVALID_COMMAND_VALUE', 'hypothesis.revise requires statement.', id);
  }
  const revisionId =
    typeof command.params?.['revisionId'] === 'string'
      ? command.params['revisionId']
      : `${id}-revision-${state.hypotheses[index]?.revisions.length ?? 0}`;
  return {
    mutations: [
      {
        operation: 'append',
        path: pointer('hypotheses', String(index), 'revisions'),
        value: {
          revisionId,
          hypothesisId: id,
          timestamp: context.eventTimestamp ?? state.lastUpdated,
          statement: command.value,
          confidence:
            typeof command.params?.['confidence'] === 'number'
              ? command.params['confidence']
              : undefined,
          evidenceIds: stringArray(command.params?.['evidenceIds']),
          reasonForChange:
            typeof command.params?.['reasonForChange'] === 'string'
              ? command.params['reasonForChange']
              : undefined,
          reasoning:
            typeof command.params?.['reasoning'] === 'string'
              ? command.params['reasoning']
              : undefined,
          remainingQuestion:
            typeof command.params?.['remainingQuestion'] === 'string'
              ? command.params['remainingQuestion']
              : undefined,
        },
      },
      {
        operation: 'set',
        path: pointer('hypotheses', String(index), 'statement'),
        value: command.value,
      },
      {
        operation: 'set',
        path: pointer('hypotheses', String(index), 'confidence'),
        value:
          typeof command.params?.['confidence'] === 'number'
            ? command.params['confidence']
            : state.hypotheses[index]?.confidence,
      },
      {
        operation: 'set',
        path: pointer('hypotheses', String(index), 'reasoning'),
        value:
          typeof command.params?.['reasoning'] === 'string'
            ? command.params['reasoning']
            : state.hypotheses[index]?.reasoning,
      },
      {
        operation: 'set',
        path: pointer('hypotheses', String(index), 'remainingQuestion'),
        value:
          typeof command.params?.['remainingQuestion'] === 'string'
            ? command.params['remainingQuestion']
            : state.hypotheses[index]?.remainingQuestion,
      },
      {
        operation: 'set',
        path: pointer('hypotheses', String(index), 'evidenceIds'),
        value: stringArray(command.params?.['evidenceIds']) ?? state.hypotheses[index]?.evidenceIds,
      },
    ],
  };
}

function selectHypothesis(
  command: RuntimeCommand,
  state: Readonly<RuntimeStateSnapshot>,
): CommandHandlingResult {
  const id = command.targetId;
  if (id === undefined || !state.hypotheses.some((hypothesis) => hypothesis.id === id)) {
    return missing('hypothesis', id);
  }
  return {
    mutations: [
      {
        operation: 'set',
        path: '/hypotheses',
        value: state.hypotheses.map((hypothesis) => ({
          ...hypothesis,
          selected: hypothesis.id === id,
        })),
      },
    ],
  };
}

function setHypothesisField(
  command: RuntimeCommand,
  state: Readonly<RuntimeStateSnapshot>,
  field: 'ranking' | 'eliminated',
  expectedType: 'number' | 'boolean',
  defaultValue?: unknown,
): CommandHandlingResult {
  const id = command.targetId;
  const index = state.hypotheses.findIndex((hypothesis) => hypothesis.id === id);
  if (id === undefined || index < 0) {
    return missing('hypothesis', id);
  }
  const value = command.value ?? defaultValue;
  if (typeof value !== expectedType) {
    return failure('INVALID_COMMAND_VALUE', `${command.commandType} has invalid value.`, id);
  }
  return {
    mutations: [
      {
        operation: 'set',
        path: pointer('hypotheses', String(index), field),
        value,
      },
    ],
  };
}

function attachEvidence(
  command: RuntimeCommand,
  state: Readonly<RuntimeStateSnapshot>,
  graph: ProjectDefinitionGraph,
): CommandHandlingResult {
  const id = command.targetId;
  const evidenceId = command.value;
  const index = state.hypotheses.findIndex((hypothesis) => hypothesis.id === id);
  if (id === undefined || index < 0) {
    return missing('hypothesis', id);
  }
  if (
    typeof evidenceId !== 'string' ||
    (!graph.evidenceById.has(evidenceId) && state.studentEvidence[evidenceId] === undefined)
  ) {
    return missing('evidence', typeof evidenceId === 'string' ? evidenceId : undefined);
  }
  return {
    mutations: [
      {
        operation: 'add',
        path: pointer('hypotheses', String(index), 'evidenceIds'),
        value: evidenceId,
      },
    ],
  };
}

function setConfidence(
  command: RuntimeCommand,
  state: Readonly<RuntimeStateSnapshot>,
): CommandHandlingResult {
  const id = command.targetId;
  if (typeof command.value !== 'number' || !Number.isFinite(command.value)) {
    return failure('INVALID_COMMAND_VALUE', 'confidence.set requires numeric value.', id);
  }
  const index = state.hypotheses.findIndex((hypothesis) => hypothesis.id === id);
  if (id === undefined || index < 0) {
    return missing('hypothesis', id);
  }
  return {
    mutations: [
      {
        operation: 'set',
        path: pointer('hypotheses', String(index), 'confidence'),
        value: command.value,
      },
    ],
  };
}

function missing(entity: string, id?: string): CommandHandlingResult {
  return failure(
    `${entity.toUpperCase()}_NOT_FOUND`,
    `${entity} "${id ?? '(missing)'}" was not found.`,
    id,
  );
}

function failure(code: string, message: string, sourceId?: string): CommandHandlingResult {
  return { mutations: [], errors: [runtimeError(code, message, { sourceId })] };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function stringArray(value: unknown): string[] | undefined {
  return Array.isArray(value) && value.every((item) => typeof item === 'string')
    ? [...value]
    : undefined;
}
