import type { RuntimeCommand } from '../../../core/commands/runtime-command';
import { runtimeError } from '../../../core/errors/runtime-error-factory';
import type { EventCommandProducer } from '../../../core/events/event-command-contracts';
import type { RuntimeEvent } from '../../../core/events/runtime-event';
import type {
  EventCommandRegistry,
  EventRegistry,
} from '../../../core/registries/specialized-registries';
import type { RuntimeStateSnapshot } from '../domain/runtime-state';
import type { ProjectDefinitionGraph } from '../package/project-definition-graph';

export const investigationEventTypes = [
  'activity.started',
  'activity.completed',
  'activity.resultSubmitted',
  'evidence.viewed',
  'evidence.collected',
  'evidence.classified',
  'evidence.annotationAdded',
  'evidence.connected',
  'evidence.disconnected',
  'evidence.studentCreated',
  'evidence.usedInClaim',
  'evidence.importanceChanged',
  'board.questionCreated',
  'hypothesis.created',
  'hypothesis.revised',
  'hypothesis.selected',
  'hypothesis.rankChanged',
  'hypothesis.eliminated',
  'hypothesis.evidenceAttached',
  'confidence.changed',
  'resource.spendRequested',
  'resource.addRequested',
  'npc.questionAsked',
  'npc.dialogueCompleted',
  'phase.openRequested',
  'phase.completed',
  'teacher.commandRequested',
  'teacher.releaseTriggered',
  'finalSubmission.openRequested',
  'finalSubmission.draftUpdated',
  'finalSubmission.submitted',
  'artifact.versionSaved',
] as const;

export const futureEventTypes = [
  'mastery.met',
  'reasoningCheck.requested',
  'reasoningCheck.passed',
  'reasoningCheck.needsRevision',
  'defense.passed',
] as const;

export function registerInvestigationEventPack(
  events: EventRegistry,
  producers: EventCommandRegistry<RuntimeStateSnapshot, ProjectDefinitionGraph>,
): void {
  for (const id of investigationEventTypes) {
    events.register({ id, version: '1.0.0', status: 'core' });
  }
  for (const id of futureEventTypes) {
    events.register({ id, version: '1.0.0', status: 'future' });
  }

  const mappings: Array<readonly [string, (event: RuntimeEvent) => RuntimeCommand | undefined]> = [
    ['activity.started', (event) => targetCommand(event, 'activity.start')],
    ['activity.completed', (event) => targetCommand(event, 'activity.complete')],
    [
      'activity.resultSubmitted',
      (event) => targetCommand(event, 'activity.submitResult', event.payload?.['result']),
    ],
    ['evidence.viewed', (event) => targetCommand(event, 'evidence.view')],
    ['evidence.collected', (event) => targetCommand(event, 'evidence.collect')],
    [
      'evidence.classified',
      (event) => targetCommand(event, 'evidence.classify', event.payload?.['classification']),
    ],
    [
      'evidence.annotationAdded',
      (event) => targetCommand(event, 'evidence.annotate', event.payload?.['note']),
    ],
    [
      'evidence.connected',
      (event) =>
        targetCommand(event, 'evidence.connect', undefined, {
          targetId: event.payload?.['targetId'],
          relationshipType: event.payload?.['relationshipType'],
          relationshipId: event.payload?.['relationshipId'],
        }),
    ],
    [
      'evidence.disconnected',
      (event) => targetCommand(event, 'evidence.disconnect', event.payload?.['relationshipId']),
    ],
    [
      'evidence.studentCreated',
      (event) => targetCommand(event, 'evidence.studentCreate', event.payload),
    ],
    ['evidence.usedInClaim', (event) => targetCommand(event, 'evidence.useInClaim')],
    [
      'evidence.importanceChanged',
      (event) => targetCommand(event, 'evidence.setImportance', event.payload?.['important']),
    ],
    [
      'board.questionCreated',
      (event) =>
        targetCommand(event, 'board.createQuestion', event.payload?.['text'], event.payload),
    ],
    [
      'hypothesis.created',
      (event) =>
        targetCommand(event, 'hypothesis.create', event.payload?.['statement'], event.payload),
    ],
    [
      'hypothesis.revised',
      (event) =>
        targetCommand(event, 'hypothesis.revise', event.payload?.['statement'], event.payload),
    ],
    ['hypothesis.selected', (event) => targetCommand(event, 'hypothesis.select')],
    [
      'hypothesis.rankChanged',
      (event) => targetCommand(event, 'hypothesis.rank', event.payload?.['ranking']),
    ],
    [
      'hypothesis.eliminated',
      (event) =>
        targetCommand(event, 'hypothesis.eliminate', event.payload?.['eliminated'] ?? true),
    ],
    [
      'hypothesis.evidenceAttached',
      (event) => targetCommand(event, 'hypothesis.attachEvidence', event.payload?.['evidenceId']),
    ],
    [
      'confidence.changed',
      (event) => targetCommand(event, 'confidence.set', event.payload?.['value']),
    ],
    [
      'resource.spendRequested',
      (event) => targetCommand(event, 'resource.spend', event.payload?.['amount']),
    ],
    [
      'resource.addRequested',
      (event) => targetCommand(event, 'resource.add', event.payload?.['amount']),
    ],
    [
      'npc.dialogueCompleted',
      (event) => targetCommand(event, 'npc.completeDialogue', event.payload?.['dialogueId']),
    ],
    ['phase.completed', (event) => targetCommand(event, 'phase.complete')],
    ['phase.openRequested', (event) => targetCommand(event, 'phase.unlock')],
    ['teacher.releaseTriggered', (event) => targetCommand(event, 'teacher.release')],
    ['finalSubmission.openRequested', () => ({ commandType: 'finalSubmission.open' })],
    [
      'finalSubmission.draftUpdated',
      (event) => ({ commandType: 'finalSubmission.updateDraft', value: event.payload?.['draft'] }),
    ],
    ['finalSubmission.submitted', (event) => ({ commandType: 'finalSubmission.submit' })],
    [
      'artifact.versionSaved',
      (event) => targetCommand(event, 'artifact.saveVersion', event.payload),
    ],
  ];

  for (const [eventType, map] of mappings) {
    producers.register({
      id: eventType,
      version: '1.0.0',
      status: 'core',
      producer: mappingProducer(eventType, map),
    });
  }

  producers.register({
    id: 'teacher.commandRequested',
    version: '1.0.0',
    status: 'core',
    producer: teacherCommandProducer(),
  });
}

function mappingProducer(
  eventType: string,
  map: (event: RuntimeEvent) => RuntimeCommand | undefined,
): EventCommandProducer<RuntimeStateSnapshot, ProjectDefinitionGraph> {
  return {
    eventType,
    createCommands: (event) => {
      const command = map(event);
      return command === undefined
        ? {
            commands: [],
            errors: [
              runtimeError(
                'INVALID_EVENT_PAYLOAD',
                `Event "${eventType}" is missing its required sourceId.`,
                { sourceId: event.id },
              ),
            ],
          }
        : { commands: [command] };
    },
  };
}

function teacherCommandProducer(): EventCommandProducer<
  RuntimeStateSnapshot,
  ProjectDefinitionGraph
> {
  return {
    eventType: 'teacher.commandRequested',
    createCommands: (event) => {
      if (event.actor.type !== 'teacher') {
        return {
          commands: [],
          errors: [
            runtimeError(
              'PERMISSION_DENIED',
              'Only a teacher actor can request a teacher command.',
              { sourceId: event.id },
            ),
          ],
        };
      }
      const command = event.payload?.['command'];
      if (!isRuntimeCommand(command)) {
        return {
          commands: [],
          errors: [
            runtimeError(
              'INVALID_EVENT_PAYLOAD',
              'teacher.commandRequested requires a RuntimeCommand payload.',
              { sourceId: event.id },
            ),
          ],
        };
      }
      return { commands: [structuredClone(command)] };
    },
  };
}

function targetCommand(
  event: RuntimeEvent,
  commandType: string,
  value?: unknown,
  params?: Record<string, unknown>,
): RuntimeCommand | undefined {
  return event.sourceId === undefined
    ? undefined
    : {
        commandType,
        targetId: event.sourceId,
        value,
        params,
      };
}

function isRuntimeCommand(value: unknown): value is RuntimeCommand {
  return (
    typeof value === 'object' &&
    value !== null &&
    'commandType' in value &&
    typeof value.commandType === 'string'
  );
}
